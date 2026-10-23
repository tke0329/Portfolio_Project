import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { languages, skillDomains } from "@/data/skills";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "정연수의 언어와 분야별 기술 스택을 소개합니다.",
};

export default function SkillsPage() {
  return (
    <div className="interior-page">
      <div className="shell page-content">
        <PageHeading
          eyebrow="TECH STACK / FIELD NOTES"
          title="분야를 넘나들며 쌓은 기술"
          description="사용해 온 언어와 기술을 분야별로 정리했습니다."
        />
        <section className="tech-languages" aria-labelledby="languages-title">
          <div><span className="eyebrow">FOUNDATION</span><h2 id="languages-title">Language</h2></div>
          <div className="tech-language-list">{languages.map((language) => <span key={language}>{language}</span>)}</div>
        </section>
        <div className="domain-heading"><div><span className="eyebrow">SKILL AREAS</span><h2>분야별 기술</h2></div></div>
        <div className="skill-domain-grid">
          {skillDomains.map((domain, index) => (
            <section className={`skill-domain-card domain-${domain.id}`} key={domain.id} aria-labelledby={`domain-${domain.id}`}>
              <div className="domain-card-heading"><span className="domain-index">0{index + 1} / FIELD</span></div>
              <h3 id={`domain-${domain.id}`}>{domain.name}</h3>
              <ul>{domain.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
