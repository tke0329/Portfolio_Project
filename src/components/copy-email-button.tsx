"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 3000);
  }
  return <span className="copy-control"><button className="copy-button" type="button" onClick={copy} aria-label={status === "copied" ? "이메일 주소 복사됨" : "이메일 주소 복사"} title={status === "copied" ? "복사됨" : "이메일 주소 복사"}>{status === "copied" ? <Check size={19} /> : <Copy size={19} />}</button><span className="copy-status" role="status">{status === "copied" ? "복사됨" : status === "error" ? "복사 불가" : ""}</span></span>;
}
