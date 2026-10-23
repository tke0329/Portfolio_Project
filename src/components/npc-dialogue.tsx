"use client";

import Image from "next/image";
import Link from "next/link";
import { RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { dialogues } from "@/data/dialogues";


type NpcDialogueProps = { label?: string; className?: string };

export function NpcDialogue({ label = "NPC와 대화하기", className = "" }: NpcDialogueProps) {
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState("start");
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const node = dialogues[nodeId];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setNodeId("start");
        requestAnimationFrame(() => trigger.current?.focus());
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>("button, a[href]"));
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

  function close() {
    setOpen(false);
    setNodeId("start");
    requestAnimationFrame(() => trigger.current?.focus());
  }

  return (
    <>
      <button ref={trigger} type="button" className={`gold-button ${className}`} onClick={() => setOpen(true)}>
        <span aria-hidden="true">✦</span>{label}<span aria-hidden="true"></span>
      </button>
      {open && createPortal((
        <div className="dialogue-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div ref={panel} className="dialogue-panel" role="dialog" aria-modal="true" aria-labelledby="dialogue-title">
            <div className="dialogue-topline">
              <span className="brand"><span className="brand-mark" aria-hidden="true">✦</span> The Helpful NPC</span>
              <button ref={closeButton} type="button" className="icon-button" aria-label="대화 닫기" onClick={close}><X size={20} /></button>
            </div>
            <div className="dialogue-intro">
              <Image src="/images/npc-developer.webp" width={118} height={108} alt="마법사 모습의 안내 NPC" className="dialogue-avatar" />
              <div className="speech-box" id="dialogue-title" aria-live="polite">{node.message}</div>
            </div>
            <div className="dialogue-options">
              {node.options.map((option) => option.href ? (
                <Link key={option.id} className="dialogue-option" href={option.href} onClick={close}>
                  <span aria-hidden="true">◆</span> {option.label} <span aria-hidden="true"></span>
                </Link>
              ) : (
                <button key={option.id} className="dialogue-option" type="button" onClick={() => setNodeId(option.nextNodeId ?? "start")}>
                  <span aria-hidden="true">◆</span> {option.label} <span aria-hidden="true">›</span>
                </button>
              ))}
            </div>
            <div className="dialogue-actions">
              <button type="button" onClick={() => setNodeId("start")}><RotateCcw size={15} /> 처음으로</button>
              <button type="button" onClick={close}>대화 종료</button>
            </div>
          </div>
        </div>
      ), document.body)}
    </>
  );
}
