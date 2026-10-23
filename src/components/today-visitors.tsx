"use client";

import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "helpful-npc:visitor-id";

export function TodayVisitors() {
  const [count, setCount] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    let visitorId: string;
    try {
      visitorId = localStorage.getItem(storageKey) ?? crypto.randomUUID();
      localStorage.setItem(storageKey, visitorId);
    } catch {
      visitorId = crypto.randomUUID();
    }

    fetch("/api/visitors/today", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((result) => {
        if (active && result.available && typeof result.count === "number") setCount(result.count);
        else if (active) setUnavailable(true);
      })
      .catch(() => { if (active) setUnavailable(true); });
    return () => { active = false; };
  }, []);

  return <div className="visitor-badge" title="한국 시간 기준, 오늘 방문한 브라우저 수"><UsersRound size={16} aria-hidden="true" /><span className="visitor-label-full">오늘의 방문자</span><span className="visitor-label-short">오늘</span><strong aria-live="polite">{unavailable ? "연결 전" : count === null ? "···" : count.toLocaleString("ko-KR")}</strong></div>;
}
