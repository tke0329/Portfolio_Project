import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { logs } from "@/data/logs";

export function generateStaticParams() { return logs.filter((log) => log.status === "published" && !log.sourceUrl).map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const log = logs.find((item) => item.slug === slug);
  return { title: log?.title ?? "Engineering Log", description: log?.summary };
}

export default async function LogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const log = logs.find((item) => item.slug === slug);
  if (!log || log.status !== "published" || log.sourceUrl) notFound();
  const { default: Article } = await import(`@/content/logs/${slug}.mdx`);
  return <div className="interior-page"><article className="shell page-content log-article"><span className="eyebrow">{log.category} / {log.date}</span><h1>{log.title}</h1><p className="log-summary">{log.summary}</p><div className="log-body"><Article /></div></article></div>;
}
