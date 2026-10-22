import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { logs } from "@/data/logs";

export const metadata: Metadata = { title: "Engineering Log", description: "설계와 문제 해결 과정을 기록합니다." };

export default function LogsPage() {
  return <div className="interior-page"><div className="shell page-content"><PageHeading eyebrow="ENGINEERING LOG / JOURNAL" title="문제를 해결하며 배운 내용을 기록합니다." description="설계 판단과 문제 해결 과정을 글로 남깁니다." />{logs.length ? <div className="log-list">{logs.map((log) => <article key={log.slug}><span>{log.date} · {log.category}</span><h2>{log.title}</h2><p>{log.summary}</p></article>)}</div> : <div className="rpg-panel waiting-panel log-waiting"><BookOpen size={42} /><h2>첫 번째 기록을 준비하고 있습니다.</h2><p>검증된 프로젝트 경험과 기술 기록을 정리해 공개하겠습니다.</p></div>}</div></div>;
}
