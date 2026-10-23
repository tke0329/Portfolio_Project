import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { logGroups, logs } from "@/data/logs";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Engineering Log", description: "정연수의 Velog 글을 주제별로 모았습니다." };

export default function LogsPage() {
  return (
    <div className="interior-page">
      <div className="shell page-content">
        <PageHeading
          eyebrow="ENGINEERING LOG / FIELD JOURNAL"
          title="만들면서 남긴 기록"
          description={`Velog에 공개한 글 ${logs.length}편을 주제별로 모았습니다. 각 글의 전체 내용은 원문에서 읽을 수 있습니다.`}
        />
        <nav className="log-jump-links" aria-label="기록 주제 바로가기">
          {logGroups.map((group) => <a href={`#log-group-${group.id}`} key={group.id}>{group.title}<span>{logs.filter((log) => log.group === group.id).length}</span></a>)}
        </nav>
        <div className="log-collections">
          {logGroups.map((group) => {
            const entries = logs.filter((log) => log.group === group.id);
            return (
              <section className="log-collection" key={group.id} aria-labelledby={`log-group-${group.id}`}>
                <div className={`log-collection-head accent-${group.accent}`}>
                  <div className="project-art" aria-hidden="true" />
                  <div><span className="eyebrow">{String(entries.length).padStart(2, "0")} STORIES / {group.id.toUpperCase()}</span><h2 id={`log-group-${group.id}`}>{group.title}</h2><p>{group.description}</p></div>
                </div>
                <div className="log-entry-grid">
                  {entries.map((log) => (
                    <a className="log-entry" href={log.sourceUrl ?? `/logs/${log.slug}`} key={log.slug} target={log.sourceUrl ? "_blank" : undefined} rel={log.sourceUrl ? "noopener noreferrer" : undefined}>
                      <span className="log-entry-meta"><time dateTime={log.date}>{log.date.replaceAll("-", ".")}</time><span>{log.category}</span></span>
                      <h3>{log.title}</h3>
                      <p>{log.summary}</p>
                      <span className="log-entry-action">{log.sourceUrl ? "Velog에서 읽기" : "글 읽기"} <ArrowUpRight size={15} /></span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <a className="log-all-link" href={profile.blogUrl} target="_blank" rel="noopener noreferrer">Velog에서 전체 글 보기 <ArrowUpRight size={17} /></a>
      </div>
    </div>
  );
}
