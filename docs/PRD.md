# The Helpful NPC — Product Requirements Document

**Version:** 1.0  
**Status:** Ready for Planning  
**Project Type:** Interactive Developer Portfolio  
**Primary Platform:** Responsive Web (Desktop / Mobile)  
**Development Approach:** MVP First, AI-Ready Architecture

---

## 1. 프로젝트 개요

### 1.1 프로젝트 정의

The Helpful NPC는 픽셀 아트와 판타지 RPG 세계관을 활용한 인터랙티브 개발자 포트폴리오 웹사이트다.

개발자는 방문자를 안내하고 문제 해결 경험을 제공하는 NPC(Non-Player Character)로 표현된다.

방문자는 자신의 목적에 맞게 NPC와 상호작용하며 개발자의 프로젝트, 기술 역량, 기술적 의사결정 및 경험을 탐색한다.

게임 요소는 사용자 경험을 강화하기 위한 시각적 장치이며, 사이트의 본질은 전문적인 개발자 포트폴리오다.

### 1.2 핵심 메시지

**Main Headline**

> 기술보다 문제를 먼저 생각합니다.

**Sub Headline**

> 사용자의 불편을 발견하고, 문제를 정의하며, 적절한 기술을 통해 해결책을 설계하고 구현합니다.

**Developer Identity**

Backend Engineering / AI / Infrastructure

단, AI는 현재 학습과 확장 중인 기술 분야로 표현한다. 검증되지 않은 전문성과 경력을 주장하지 않는다.

### 1.3 핵심 설계 철학

1. **Problem First:** 기술 자체보다 해결하려는 문제를 우선한다.
2. **Professional Content:** 시각적 요소가 게임이더라도 문구와 콘텐츠는 전문적으로 작성한다.
3. **User-Centered Navigation:** 방문자가 찾고자 하는 정보를 빠르게 제공한다.
4. **Progressive Enhancement:** 기본 포트폴리오가 완성된 뒤 게임적 인터랙션과 AI를 확장한다.
5. **Maintainability:** 콘텐츠, UI, 비즈니스 로직, AI API 호출 영역을 분리한다.

---

## 2. 디자인 레퍼런스 및 구현 원칙

### 2.1 디자인 기준

사용자가 별도로 제공하는 다음 두 이미지를 공식 디자인 레퍼런스로 사용한다.

- Desktop Portfolio Mockup
- Mobile Portfolio Mockup

**두 목업을 최우선 UI 기준으로 삼는다.**

다음 사항을 최대한 유지한다.

- 전체 레이아웃과 섹션 배치
- 어두운 네이비 계열의 배경
- 골드 및 아이보리 색상 포인트
- 픽셀 아트 캐릭터와 배경
- 판타지 RPG 스타일의 UI 패널
- NPC 대화창의 디자인
- 프로젝트 카드의 구성과 분위기
- 모바일 전용 레이아웃
- 타이포그래피의 시각적 위계

이미지에 없는 UI를 임의로 대량 추가하거나 디자인 콘셉트를 변경하지 않는다.

구현에 필요한 세부 디자인 정보가 없는 경우에는 전체적인 디자인 일관성을 우선한다.

목업은 시각적 기준이다. 이미지 속 예시 문구, 기술명, 수치, 가상의 이력은 실제 데이터로 간주하지 않는다.

### 2.2 UX 원칙

- RPG를 플레이하지 않아도 모든 정보를 확인할 수 있어야 한다.
- 모든 주요 섹션은 일반 내비게이션으로 접근 가능해야 한다.
- NPC 대화 기능은 정보 탐색을 지원하는 보조 수단이다.
- 애니메이션은 콘텐츠 가독성과 탐색을 방해하지 않아야 한다.
- 데스크톱과 모바일은 각각 제공된 목업을 기준으로 구현한다.
- 접근성 및 반응형 요구사항을 충족해야 한다.

### 2.3 디자인 토큰 초기값

| Token | Value |
|---|---|
| Background | `#141C2A` |
| Surface | `#25324A` |
| Primary Accent | `#DCC28A` |
| Primary Text | `#F7F4EC` |
| Secondary Text | `#C9D1DD` |

색상은 초기 기준값이며 실제 목업과 차이가 있을 경우 목업의 시각적 일관성을 우선한다.

일반 본문에는 가독성 높은 폰트를 사용하고, 픽셀 폰트는 제한적인 장식 및 강조 영역에만 사용한다.

---

## 3. 목표 사용자

### 3.1 Recruiter

채용 담당자는 개발자의 역량과 주요 경험을 빠르게 확인할 수 있어야 한다.

핵심 정보:
- 개발자 소개
- 기술 스택
- 프로젝트 경험
- 담당 역할
- 이력서 및 연락 방법

### 3.2 Technical Reviewer

기술 면접관 및 개발자는 실제 구현과 문제 해결 경험을 검토할 수 있어야 한다.

핵심 정보:
- 프로젝트 아키텍처
- 기술 선택 이유
- 핵심 구현 내용
- 장애 해결 경험
- GitHub 및 기술 기록

### 3.3 Collaborator

협업이나 개발 의뢰를 고려하는 방문자는 개발 가능 영역과 관련 사례를 파악할 수 있어야 한다.

핵심 정보:
- 개발 분야
- 대표 프로젝트
- 기술 경험
- 협업 및 연락 방법

---

## 4. 사이트 구조

### 4.1 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | 메인 비주얼, NPC 소개, 대표 프로젝트 |
| `/about` | About | 개발자 소개 및 개발 철학 |
| `/projects` | Projects | 프로젝트 목록 |
| `/projects/[slug]` | Project Detail | 프로젝트 상세 사례 |
| `/skills` | Tech Stack | 기술 스택 및 사용 경험 |
| `/logs` | Engineering Log | 기술 및 문제 해결 기록 |
| `/logs/[slug]` | Log Detail | 개별 기술 기록 |
| `/contact` | Contact | 연락처 및 외부 링크 |

### 4.2 Global Navigation

Desktop:
- Home
- About
- Projects
- Tech Stack
- Engineering Log
- Contact

Mobile:
- 모바일 목업 기반 내비게이션
- 모든 주요 페이지 접근 가능
- NPC 대화 버튼 노출

모든 페이지에 공통 Header 및 Footer를 제공한다.

---

# 5. 상세 기능 요구사항

## FR-01. Home

**Priority: P0**

### 목적

개발자의 정체성을 전달하고 주요 정보로 빠르게 안내한다.

### 필수 구성

- 메인 픽셀 아트 배경
- NPC 개발자 캐릭터
- 메인 헤드라인
- 서브 헤드라인
- 대표 프로젝트 미리보기
- 주요 기술 분야
- NPC 대화 시작 버튼
- 프로젝트 이동 CTA

### 인터랙션

- 최초 진입 시 절제된 등장 애니메이션
- NPC 클릭 시 대화창 열림
- CTA 클릭 시 관련 페이지 이동
- 반응형 레이아웃 적용

### Acceptance Criteria

- 메인 메시지를 NPC 조작 없이 읽을 수 있다.
- 모든 CTA가 올바르게 동작한다.
- 모바일에서 가로 스크롤이나 콘텐츠 잘림이 없다.
- 애니메이션을 비활성화해도 정상적으로 사용할 수 있다.

---

## FR-02. About

**Priority: P0**

### 목적

개발자의 배경과 문제 해결 중심의 개발 철학을 전달한다.

### 구성

- 개발자 프로필
- 한 줄 소개
- 주요 기술 분야
- 경력 및 학습 배경
- 개발 철학
- 현재 집중하는 기술
- GitHub 및 이력서 링크

### 디자인

RPG 캐릭터 정보창을 시각적으로 참고한다.

단, 공격력·레벨·마력 같은 가상 능력치 대신 실제 개발 경험과 기술 분야를 표기한다.

### Acceptance Criteria

- 모든 경력 및 학습 이력은 검증된 정보만 사용한다.
- 과장된 전문성 및 임의의 수치를 사용하지 않는다.
- 이력서와 GitHub 링크를 쉽게 찾을 수 있다.

---

## FR-03. Projects

**Priority: P0**

### 목적

개발자의 문제 해결 역량을 실제 프로젝트 중심으로 설명한다.

### 프로젝트 카드 필드

- 프로젝트명
- 한 줄 설명
- 해결하려는 문제
- 기술 스택
- 담당 역할
- 프로젝트 상태
- 상세 페이지 링크

### 프로젝트 상세 구성

**1. Overview**
- 프로젝트 개요
- 개발 목표
- 담당 역할

**2. Problem**
- 해결해야 했던 문제
- 제약사항 및 배경

**3. Approach**
- 기술 선택 이유
- 설계 방향
- 고려한 대안

**4. Architecture**
- 시스템 구성
- 주요 컴포넌트
- 데이터 흐름

**5. Implementation**
- 핵심 기능
- 구현 방식

**6. Troubleshooting**
- 발생한 문제
- 원인 분석
- 해결 방법

**7. Results**
- 구현 및 검증 결과
- 개선 사항
- 학습한 내용

### 초기 콘텐츠 후보

- Catcheat Infrastructure
- Spring Security / JWT Authentication
- MadeDex Comment & Like
- WebSocket Communication

프로젝트별 공개 권한, 구현 사실 및 개인 기여도를 검증한 뒤 콘텐츠를 확정한다.

### Acceptance Criteria

- 프로젝트 목록에서 상세 페이지로 이동할 수 있다.
- 프로젝트별 고유 URL이 존재한다.
- 직접 URL에 접속해도 정상적으로 렌더링된다.
- 실제 구현하지 않은 기능이나 성과를 기재하지 않는다.

---

## FR-04. Tech Stack

**Priority: P0**

### 목적

실제 사용 경험을 기준으로 개발 기술을 소개한다.

### 분류

- Backend
- Database
- AI / Data
- Infrastructure
- Frontend

### 기능

- 카테고리별 기술 표시
- 기술별 상세 설명
- 관련 프로젝트 연결
- 기술 사용 사례 표시

### 데이터 표현 원칙

기술 숙련도를 객관적 기준 없는 퍼센트로 표시하지 않는다.

기술 경험은 다음과 같이 구분할 수 있다.

- Project Experience
- Currently Learning
- Familiar With

상태는 실제 경험에 따라 개별적으로 지정한다.

### Acceptance Criteria

- 기술 데이터가 UI 컴포넌트와 분리되어 있다.
- 기술을 클릭하면 관련 경험을 확인할 수 있다.
- 실제 프로젝트와 연결할 수 있다.

---

## FR-05. Engineering Log

**Priority: P1**

### 목적

학습, 설계, 장애 해결 경험을 기술 문서 형태로 공유한다.

### 기능

- 글 목록
- 상세 페이지
- 카테고리
- 작성일
- 기술 태그
- 외부 링크

### 콘텐츠 관리

초기에는 MDX를 이용한다.

관리자 페이지 및 데이터베이스는 구현하지 않는다.

### Acceptance Criteria

- MDX 콘텐츠를 추가하면 정적 페이지로 반영된다.
- 글마다 고유 URL이 존재한다.
- SEO 메타데이터가 제공된다.

---

## FR-06. NPC Guided Dialogue

**Priority: P0**

### 목적

사용자가 자신의 목적에 맞는 정보를 쉽게 찾도록 돕는다.

### 시작 메시지

"안녕하세요. 어떤 정보를 찾고 계신가요?"

### 기본 선택지

1. 어떤 문제를 해결해 왔나요?
2. 어떤 기술을 사용하나요?
3. 어떤 개발자인가요?
4. 협업을 제안하고 싶습니다.

### 동작 방식

- NPC 클릭 시 대화창 열기
- 선택지 선택 시 미리 정의된 응답 출력
- 관련 페이지 또는 콘텐츠로 이동
- 대화 종료 및 초기화
- 모바일 및 키보드 조작 지원

### 구현 원칙

대화 데이터와 화면을 분리한다.

NPC 응답은 하드코딩된 컴포넌트 조건문에 의존하지 않도록 별도 데이터 파일로 관리한다.

### Acceptance Criteria

- 기본 선택지가 모두 동작한다.
- NPC 대화 없이도 전체 사이트를 탐색할 수 있다.
- 대화창을 키보드로 열고 닫을 수 있다.
- 화면 크기에 따라 대화창이 올바르게 배치된다.

---

## FR-07. AI NPC

**Priority: P2 — MVP 범위 제외**

### 목적

사용자의 자유로운 질문에 실제 포트폴리오 콘텐츠를 바탕으로 답한다.

### 주요 요구사항

- 자연어 질문 입력
- 서버 측 LLM API 요청
- 포트폴리오 문서 검색
- 검색된 내용 기반 응답
- 관련 프로젝트 링크 제공
- 응답 스트리밍
- 요청 실패 및 사용량 제한 처리

### AI 응답 원칙

1. 공개된 포트폴리오 정보만 근거로 답변한다.
2. 확인되지 않은 경력, 자격, 기술 경험을 생성하지 않는다.
3. 근거가 부족하면 확인할 수 없다고 답한다.
4. 질문과 관련된 프로젝트 페이지를 연결한다.
5. 외부 AI API 키는 절대 브라우저에 노출하지 않는다.

### 보안 및 비용

- 서버 환경변수로 API 키 관리
- 입력 길이 제한
- 요청 횟수 제한
- 토큰 사용량 제한
- 사용량 및 오류 모니터링
- 공개 전 악용 가능성 테스트

### 아키텍처

Next.js Route Handler를 통한 서버 측 통신을 기본으로 한다.

초기에는 별도 Spring Boot, FastAPI, 벡터 DB를 사용하지 않는다.

지식 검색은 정적 포트폴리오 콘텐츠를 활용하는 단순한 방식으로 시작한다.

데이터 규모 및 기능 복잡성이 증가할 경우 RAG 확장을 검토한다.

---

## FR-08. Contact

**Priority: P0**

### 목적

방문자가 개발자에게 쉽게 연락하도록 지원한다.

### 필수 기능

- 이메일 링크
- 이메일 복사
- GitHub 링크
- 기술 블로그 링크
- 이력서 링크(제공된 경우)

### 구현 원칙

초기 버전에서는 데이터베이스 기반 문의 저장 기능을 구현하지 않는다.

실제 연락처가 제공되지 않았다면 임의의 실주소나 계정을 사용하지 않는다.

---

# 6. 기술 스택

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Motion / CSS |
| Content | MDX / TypeScript Data |
| AI API | Next.js Route Handler (P2) |
| Deployment | Vercel |
| Version Control | Git / GitHub |

초기 버전에서 다음 기술은 제외한다.

- 별도 Spring Boot 서버
- 별도 FastAPI 서버
- PostgreSQL 및 기타 DB
- 인증 시스템
- 관리자 CMS
- Phaser 등 게임 엔진

새로운 기술을 도입할 때는 명확한 기능적 필요성과 유지보수 비용을 고려한다.

---

# 7. 프로젝트 구조

권장 초기 디렉터리 구성:

```text
the-helpful-npc/
├── public/
│   ├── images/
│   ├── sprites/
│   └── backgrounds/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   ├── skills/
│   │   ├── logs/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── npc/
│   │   └── projects/
│   │
│   ├── features/
│   │   └── chat/
│   │
│   ├── content/
│   │   ├── projects/
│   │   └── logs/
│   │
│   ├── data/
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   └── npc-dialogues.ts
│   │
│   ├── lib/
│   └── server/
│       ├── ai/
│       └── knowledge/
│
├── docs/
│   ├── PRD.md
│   └── DESIGN_REFERENCE.md
│
├── AGENTS.md
└── package.json
```

해당 구조는 설계 가이드이며, 실제 프로젝트에 맞춰 불필요한 디렉터리는 생성하지 않아도 된다.

AI 관련 서버 디렉터리와 Route Handler는 P2 구현 시 생성한다.

---

# 8. 데이터 모델

## 8.1 Project

```ts
interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  role: string;
  technologies: string[];
  status: "completed" | "in-progress";
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
}
```

프로젝트 상세 본문은 MDX로 관리한다.

## 8.2 Skill

```ts
interface Skill {
  id: string;
  name: string;
  category:
    | "backend"
    | "database"
    | "ai"
    | "infrastructure"
    | "frontend";
  experience:
    | "project"
    | "learning"
    | "familiar";
  description: string;
  relatedProjects: string[];
}
```

## 8.3 NPC Dialogue

```ts
interface DialogueOption {
  id: string;
  label: string;
  nextNodeId?: string;
  href?: string;
}

interface DialogueNode {
  id: string;
  message: string;
  options: DialogueOption[];
}
```

NPC 대화는 ID 기반 노드 구조를 사용한다.

컴포넌트는 현재 대화 노드 ID를 상태로 관리하고 해당 노드의 메시지와 선택지를 렌더링한다.

---

# 9. 비기능 요구사항

## 9.1 Performance

- 이미지 크기와 포맷 최적화
- 필요한 애니메이션만 실행
- 무거운 인터랙션의 지연 로딩
- 정적 페이지 생성 우선
- Core Web Vitals 측정 및 개선

## 9.2 Accessibility

- 키보드 기반 탐색 지원
- 의미 있는 HTML 요소 사용
- 적절한 텍스트 대비
- 이미지 대체 텍스트
- `prefers-reduced-motion` 지원
- NPC 대화창의 포커스 및 닫기 동작 지원

## 9.3 SEO

- 페이지별 Metadata
- Open Graph 이미지
- Sitemap
- robots 설정
- 프로젝트별 고유 URL
- 검색 가능한 텍스트 콘텐츠

## 9.4 Maintainability

- UI 및 콘텐츠 분리
- 공유 가능한 컴포넌트
- 기능 단위 디렉터리 구성
- TypeScript 타입 정의
- 불필요한 라이브러리 최소화
- 핵심 기능 테스트 가능 구조

---

# 10. 개발 단계 및 완료 조건

## Phase 0 — 프로젝트 초기화 및 설계

**목표:** 기획서와 목업을 기준으로 개발 준비를 완료한다.

작업:
- 요구사항 검토
- 목업 분석
- 디자인 토큰 정의
- 페이지 구조 정의
- 기술 및 라이브러리 선정
- Next.js 프로젝트 초기화
- 공통 디렉터리 설계

완료 조건:
- 개발 환경 정상 실행
- 페이지 구조 확정
- 공통 디자인 기준 정의

## Phase 1 — 공통 UI 및 Home

작업:
- Header / Footer
- 공통 UI 컴포넌트
- 메인 배경
- NPC 캐릭터
- Hero Section
- 기본 반응형 레이아웃

완료 조건:
- 데스크톱과 모바일에서 메인 화면 동작
- 목업과 레이아웃 및 분위기 일치
- 기본 내비게이션 정상 작동

## Phase 2 — Portfolio Content

작업:
- About
- Projects 목록
- Project Detail
- Tech Stack
- Contact
- 정적 데이터 연동

완료 조건:
- 주요 포트폴리오 콘텐츠 표시
- 프로젝트 상세 라우팅 동작
- 정적 콘텐츠 수정 가능

## Phase 3 — NPC Interaction

작업:
- NPC 대화창
- 선택지 기반 상태 관리
- 대화 흐름 데이터
- 페이지 이동
- 등장 및 종료 애니메이션

완료 조건:
- NPC 기본 대화 기능 정상 동작
- 모바일 사용 가능
- 키보드 및 포커스 처리 검증

## Phase 4 — Engineering Log 및 품질 개선

작업:
- MDX 기반 기술 기록
- UI 애니메이션 개선
- 이미지 최적화
- SEO
- 접근성 검증
- 주요 기능 테스트
- Vercel 배포

완료 조건:
- 전체 MVP 기능 완료
- 배포 URL 정상 동작
- 주요 화면의 모바일 및 데스크톱 검증 완료

## Phase 5 — AI NPC (향후 확장)

작업:
- AI API 제공자 선정
- AI 요청 및 응답 타입 정의
- Next.js Route Handler 구현
- 포트폴리오 콘텐츠 검색
- 스트리밍 응답
- 요청 제한 및 비용 통제
- 응답 정확성 검증

완료 조건:
- 실제 콘텐츠를 근거로 질문 응답
- API 키 서버 측 보관
- AI 오류 시 기본 NPC 안내 사용 가능
- 운영 비용 제한 및 모니터링 적용

---

# 11. 범위 제외 사항

MVP에서는 다음 기능을 구현하지 않는다.

- 회원가입 및 로그인
- 관리자 페이지
- 데이터베이스
- 실시간 멀티플레이어 기능
- 2D 게임 엔진 기반 맵 탐험
- 대규모 3D 그래픽
- AI 챗봇 실시간 응답
- 결제
- 방문자 데이터 저장
- 불필요한 마이크로서비스 구성

추후 기능 확장이 가능하도록 구조는 고려하되, 초기 구현 범위를 넘어서지 않는다.

---

# 12. 테스트 및 검증

## 필수 테스트 항목

### Navigation
- 모든 페이지 링크 정상 작동
- 직접 URL 접근 가능
- 없는 프로젝트 slug 처리

### NPC Dialogue
- 열기/닫기
- 선택지 이동
- 초기화
- 대화 종료
- 키보드 조작

### Responsive
- 모바일 뷰포트
- 태블릿
- 데스크톱
- 긴 텍스트 및 좁은 화면

### Content
- 프로젝트 데이터 렌더링
- 기술 및 프로젝트 연결
- MDX 상세 페이지 출력
- 외부 링크 검증

### Quality
- TypeScript 검사
- ESLint 검사
- 프로덕션 빌드
- 핵심 인터랙션 테스트
- 기본 접근성 점검

실패한 테스트를 무시하지 않고 원인을 파악해 수정한다.

---

# 13. Codex 작업 지침

본 프로젝트는 AI 코딩 에이전트와 협업해 개발한다.

다음 규칙을 준수한다.

1. **PRD와 제공된 Desktop/Mobile 목업을 기준으로 작업한다.**
2. 구현 전 기존 코드와 프로젝트 구조를 확인한다.
3. 불명확한 핵심 설계 결정은 구현 전에 확인한다.
4. 전체 프로젝트를 한 번에 구현하지 않는다.
5. 기능을 작은 작업 단위로 분할한다.
6. 각 작업의 완료 조건을 먼저 정의한다.
7. 한 작업을 완료한 뒤 관련 테스트를 수행한다.
8. 명시적으로 요청하지 않은 기능을 추가하지 않는다.
9. 새로운 의존성은 필요성을 검토한 뒤 도입한다.
10. 실제 개발 이력이나 프로젝트 성과를 임의로 만들어내지 않는다.
11. 목업과 구현이 다를 경우 차이를 확인하고 조정한다.
12. MVP 범위를 완료하기 전 P2 기능을 구현하지 않는다.

## 개발 진행 방식

**Step 1.** PRD 분석 및 누락된 요구사항 검토

**Step 2.** Desktop / Mobile 목업 분석

**Step 3.** 구현 이슈 및 의존성 정의

**Step 4.** MVP 우선순위에 따른 구현

**Step 5.** 작업별 테스트 및 리뷰

**Step 6.** 전체 화면 검증 및 배포

---

# 14. 최종 완료 기준 (Definition of Done)

The Helpful NPC MVP는 다음 조건이 충족되면 완료된 것으로 판단한다.

- 주요 화면이 PC·모바일 목업을 기준으로 구현되었다.
- Home, About, Projects, Tech Stack, Engineering Log, Contact를 탐색할 수 있다.
- NPC 선택지 기반 안내 기능이 작동한다.
- 주요 프로젝트의 문제와 해결 과정이 전달된다.
- 공개된 경력과 기술 정보가 검증된 사실에 기반한다.
- 모바일 및 데스크톱 레이아웃에 문제가 없다.
- 키보드 접근 및 기본 접근성을 지원한다.
- TypeScript, 린트, 빌드 및 핵심 테스트를 통과한다.
- Vercel에 정상 배포된다.
- 추후 AI NPC를 추가하기 위한 UI 및 API 경계가 분리되어 있다.

---

# 15. 프로젝트의 최종 목표

The Helpful NPC는 단순한 게임형 포트폴리오가 아니다.

방문자의 목적을 이해하고 필요한 정보를 제공하는 사용자 중심의 웹 인터페이스이자, 실제 개발 경험과 문제 해결 역량을 전달하는 전문적인 포트폴리오다.

**핵심 원칙:**

> 게임적 경험은 흥미를 만들고, 명확한 정보와 검증된 기술 경험은 신뢰를 만든다.

디자인의 개성과 개발자로서의 전문성이 동시에 전달되는 웹사이트를 완성하는 것을 목표로 한다.
