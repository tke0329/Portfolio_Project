import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { chatInstructions } from "@/server/chat/knowledge";

export const runtime = "nodejs";
export const maxDuration = 30;

const noStore = { "Cache-Control": "no-store" };
type ChatMessage = { role: "user" | "assistant"; content: string };

function isConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const source = new URL(origin);
    const target = new URL(request.url);
    if (source.origin === target.origin) return true;

    const loopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
    return process.env.NODE_ENV === "development" &&
      loopbackHosts.has(source.hostname) && loopbackHosts.has(target.hostname) &&
      source.protocol === target.protocol && source.port === target.port;
  } catch {
    return false;
  }
}

function validateMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 9) return null;
  if (!value.every((item) => item && typeof item === "object" &&
    (item.role === "user" || item.role === "assistant") &&
    typeof item.content === "string" && item.content.trim().length > 0 &&
    item.content.length <= (item.role === "user" ? 500 : 1500))) return null;
  if (value[value.length - 1].role !== "user") return null;
  return value.map((item) => ({ role: item.role, content: item.content.trim() }));
}

export function GET() {
  return Response.json({ available: isConfigured() }, { headers: noStore });
}

export async function POST(request: Request) {
  if (!isConfigured()) return Response.json({ error: "Chat is not configured" }, { status: 503, headers: noStore });

  if (!isAllowedOrigin(request)) {
    return Response.json({ error: "Invalid origin" }, { status: 403, headers: noStore });
  }

  const raw = await request.text();
  if (raw.length > 15000) return Response.json({ error: "Message too long" }, { status: 413, headers: noStore });
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400, headers: noStore }); }
  const messages = validateMessages((parsed as { messages?: unknown })?.messages);
  if (!messages) return Response.json({ error: "Invalid messages" }, { status: 400, headers: noStore });

  try {
    const redis = Redis.fromEnv();
    const date = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const ip = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "local";
    const identity = createHash("sha256").update(`${date}:${ip}:${process.env.OPENAI_API_KEY}`).digest("hex");
    const key = `helpful-npc:chat:${date}:${identity}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 60 * 60 * 48);
    if (count > 60) return Response.json({ error: "Daily limit reached" }, { status: 429, headers: noStore });
  } catch {
    return Response.json({ error: "Chat limit unavailable" }, { status: 503, headers: noStore });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-luna",
        instructions: chatInstructions(),
        input: messages,
        reasoning: { effort: "none" },
        max_output_tokens: 400,
        store: false,
        stream: true,
      }),
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(25000)]),
    });
  } catch {
    return Response.json({ error: "AI service unavailable" }, { status: 503, headers: noStore });
  }

  if (!upstream.ok || !upstream.body) {
    return Response.json({ error: "AI service unavailable" }, { status: upstream.status === 429 ? 429 : 503, headers: noStore });
  }

  const upstreamReader = upstream.body.getReader();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
      let delivered = false;
      try {
        while (true) {
          const { done, value } = await upstreamReader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          buffer = buffer.replace(/\r\n/g, "\n");
          let boundary = buffer.indexOf("\n\n");
          while (boundary !== -1) {
            const event = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);
            const data = event.split("\n").filter((line) => line.startsWith("data: ")).map((line) => line.slice(6)).join("\n");
            if (data && data !== "[DONE]") {
              const item = JSON.parse(data) as { type?: string; delta?: string };
              if (item.type === "response.output_text.delta" && typeof item.delta === "string") {
                controller.enqueue(encoder.encode(item.delta));
                delivered = true;
              }
            }
            boundary = buffer.indexOf("\n\n");
          }
        }
        if (!delivered) controller.enqueue(encoder.encode("답변을 가져오지 못했어요. 잠시 후 다시 질문해 주세요."));
      } catch {
        controller.enqueue(encoder.encode("\n답변 연결이 끊겼어요. 잠시 후 다시 시도해 주세요."));
      } finally {
        controller.close();
        upstreamReader.releaseLock();
      }
    },
    cancel() { void upstreamReader.cancel(); },
  });

  return new Response(stream, { headers: { ...noStore, "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" } });
}
