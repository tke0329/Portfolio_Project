import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

const noStore = { "Cache-Control": "no-store" };

function koreaDate() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json({ available: false }, { status: 503, headers: noStore });
  }

  const body = await request.json().catch(() => null);
  const visitorId = body?.visitorId;
  if (typeof visitorId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(visitorId)) {
    return Response.json({ error: "Invalid visitor ID" }, { status: 400, headers: noStore });
  }

  const date = koreaDate();
  const key = `helpful-npc:visitors:${date}`;
  const anonymousId = createHash("sha256").update(`${date}:${visitorId}`).digest("hex");

  try {
    const redis = Redis.fromEnv();
    await redis.sadd(key, anonymousId);
    await redis.expire(key, 60 * 60 * 48);
    const count = await redis.scard(key);
    return Response.json({ available: true, count, date }, { headers: noStore });
  } catch {
    return Response.json({ available: false }, { status: 503, headers: noStore });
  }
}
