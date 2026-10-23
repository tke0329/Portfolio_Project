"use client";

import Image from "next/image";
import Link from "next/link";
import { Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ChatStatus = "checking" | "ready" | "unavailable";

const suggestions = ["정연수는 어떤 개발자인가요?", "Keyoff Lab은 어떤 프로젝트인가요?", "어떤 개발 분야에 관심이 있나요?"];

export function HeroNpcChat() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ChatStatus>("checking");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const characterTrigger = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController>(null);

  function openFrom(button: HTMLButtonElement) {
    returnFocus.current = button;
    setOpen(true);
  }

  function close() {
    request.current?.abort();
    setOpen(false);
    setSending(false);
    requestAnimationFrame(() => returnFocus.current?.focus());
  }

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch("/api/chat", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setStatus(data.available ? "ready" : "unavailable"))
      .catch(() => { if (!controller.signal.aborted) setStatus("unavailable"); });
    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>("button:not(:disabled), textarea:not(:disabled), a[href]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  async function sendMessage(value: string) {
    const question = value.trim().slice(0, 500);
    if (!question || sending || status !== "ready") return;
    setDraft("");
    setError("");
    setSending(true);
    const conversation: ChatMessage[] = [...messages.filter((message) => message.content), { role: "user" as const, content: question }].slice(-9);
    setMessages([...conversation, { role: "assistant", content: "" }]);
    const controller = new AbortController();
    request.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        if (response.status === 429) throw new Error("오늘의 대화 횟수를 모두 사용했어요. 내일 다시 이야기해 주세요.");
        if (response.status === 503) throw new Error("지금은 AI 대화를 연결할 수 없어요. 아래 포트폴리오 링크를 이용해 주세요.");
        throw new Error("답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        answer += decoder.decode(chunk, { stream: true });
        setMessages([...conversation, { role: "assistant", content: answer }]);
      }
      answer += decoder.decode();
      if (!answer.trim()) throw new Error("답변이 비어 있어요. 잠시 후 다시 시도해 주세요.");
      setMessages([...conversation, { role: "assistant", content: answer }]);
    } catch (cause) {
      if (controller.signal.aborted) return;
      setMessages(messages);
      setDraft(question);
      setError(cause instanceof Error ? cause.message : "대화를 이어가지 못했어요.");
    } finally {
      if (!controller.signal.aborted) setSending(false);
      request.current = null;
      input.current?.focus();
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  return (
    <>
      <div className="hero-character-spot">
        <span className="hero-chat-cue" aria-hidden="true"><span>AI NPC</span>캐릭터를 눌러 대화해요</span>
        <button ref={characterTrigger} type="button" className="hero-npc" aria-label="캐릭터를 눌러 AI NPC와 대화하기" onClick={() => openFrom(characterTrigger.current!)}>
          <span className="hero-npc-frame" aria-hidden="true" />
        </button>
      </div>
      {open && createPortal(
        <div className="dialogue-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div ref={panel} className="dialogue-panel ai-dialogue-panel" role="dialog" aria-modal="true" aria-labelledby="ai-dialogue-title">
            <div className="dialogue-topline">
              <span className="brand"><span className="brand-mark" aria-hidden="true">✦</span> The Helpful NPC</span>
              <button ref={closeButton} type="button" className="icon-button" aria-label="대화 닫기" onClick={close}><X size={20} /></button>
            </div>
            <div className="ai-dialogue-intro">
              <Image src="/images/npc-developer.webp" width={85} height={90} alt="" className="dialogue-avatar" />
              <div>
                <span className="ai-dialogue-eyebrow"><Sparkles size={13} /> AI NPC</span>
                <h2 id="ai-dialogue-title">무엇이 궁금하신가요?</h2>
                <p>연수님의 공개된 작업과 개발 이야기를 나눌 수 있어요.</p>
              </div>
            </div>
            <div className="ai-chat-messages" role="log" aria-label="대화 내용" aria-live="polite">
              <div className="ai-message npc">안녕하세요! 정연수님의 프로젝트나 개발에 관해 편하게 물어보세요.</div>
              {messages.map((message, index) => (
                <div key={index} className={`ai-message ${message.role === "user" ? "visitor" : "npc"}`}>
                  {message.content || <span className="ai-typing" aria-label="답변 작성 중">···</span>}
                </div>
              ))}
              {status === "unavailable" && <div className="ai-message notice">AI 연결을 기다리고 있어요. 아래 페이지에서 확인된 정보를 먼저 살펴볼 수 있습니다.</div>}
              {error && <div className="ai-message notice" role="alert">{error}</div>}
              <div ref={messageEnd} />
            </div>
            {messages.length === 0 && status === "ready" && (
              <div className="ai-suggestions" aria-label="추천 질문">
                {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>)}
              </div>
            )}
            
            <form className="ai-chat-form" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="npc-chat-input">NPC에게 질문하기</label>
              <textarea ref={input} id="npc-chat-input" rows={2} maxLength={500} placeholder={status === "unavailable" ? "AI 연결 후 질문할 수 있어요" : "프로젝트나 개발에 대해 물어보세요"} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void sendMessage(draft); } }} disabled={status !== "ready" || sending} />
              <button type="submit" aria-label="질문 보내기" disabled={status !== "ready" || sending || !draft.trim()}><Send size={19} /></button>
            </form>
            <p className="ai-chat-footnote">입력한 질문은 AI 서비스로 전송됩니다. 공개 정보에 없는 개인 경력은 확인할 수 없어요.</p>
          </div>
        </div>, document.body)}
    </>
  );
}
