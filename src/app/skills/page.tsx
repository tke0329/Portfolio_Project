import type { Metadata } from "next";
import Image from "next/image";
import { languages, skillDomains, skillGemImages } from "@/data/skills";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "정연수가 사용해 온 언어와 분야별 기술을 마법석 보관함에서 살펴봅니다.",
};

const fieldNotes = {
  backend: "서버의 흐름과 보안",
  frontend: "화면과 모바일 경험",
  database: "데이터를 다루는 도구",
  infra: "배포와 운영 환경",
} as const;

function GemList({ technologies }: { technologies: readonly (keyof typeof skillGemImages)[] }) {
  return (
    <ul className="gem-list">
      {technologies.map((technology) => (
        <li className="gem-item" key={technology}>
          <span className="gem-stone" aria-hidden="true">
            <Image src={skillGemImages[technology]} alt="" width={320} height={320} sizes="(max-width: 700px) 96px, 124px" />
          </span>
          <span className="gem-name">{technology}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SkillsPage() {
  return (
    <div className="interior-page gem-page">
      <div className="shell page-content gem-page-content">
        <header className="gem-hero">
          <div className="gem-hero-copy">
            <span className="eyebrow">TECH STACK / THE GEM COLLECTION</span>
            <h1>Tech <em>Stack</em>을<br />모았습니다.</h1>
            <p>프로젝트와 학습에서 사용해 온 기술을 분야별 보관함에 담았습니다.</p>
            <span className="gem-hero-caption"><span aria-hidden="true">✦</span> 문제를 풀며 만난 도구들의 기록</span>
          </div>
          <div className="gem-hero-art" aria-hidden="true">
            <span className="gem-hero-ring" />
            <Image className="gem-hero-stone gem-hero-stone-main" src={skillGemImages["Spring Boot"]} alt="" width={320} height={320} priority />
            <Image className="gem-hero-stone gem-hero-stone-left" src={skillGemImages.React} alt="" width={320} height={320} priority />
            <Image className="gem-hero-stone gem-hero-stone-right" src={skillGemImages.Terraform} alt="" width={320} height={320} priority />
          </div>
        </header>

        <section className="gem-collection gem-collection-language" aria-labelledby="gem-language-title">
          <div className="gem-collection-heading">
            <div><span className="gem-collection-index">사용 언어</span><h2 id="gem-language-title">LANGUAGE</h2></div>
            <p>생각을 코드로 옮기는 네 가지 언어</p>
          </div>
          <GemList technologies={languages} />
        </section>

        <div className="gem-fields-heading"><span className="eyebrow">FIELD COLLECTIONS</span><h2>분야별 마법석</h2></div>
        <div className="gem-domain-grid">
          {skillDomains.map((domain, index) => (
            <section className={`gem-collection gem-domain gem-domain-${domain.id}`} key={domain.id} aria-labelledby={`gem-${domain.id}-title`}>
              <div className="gem-collection-heading">
                <div><span className="gem-collection-index">{domain.description}</span><h3 id={`gem-${domain.id}-title`}>{domain.name}</h3></div>
                <p>{fieldNotes[domain.id]}</p>
              </div>
              <GemList technologies={domain.technologies} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
