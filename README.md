# The Helpful NPC

Pixel art RPG style developer portfolio for 정연수. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Content status

The confirmed name, email, GitHub, and blog are in `src/data/profile.ts`. The four projects in `src/data/projects.ts` are **candidates from the PRD**, marked as drafts. Their roles, architecture, implementation, and results must be verified before publishing case studies. Technology experience and engineering log entries are intentionally empty until source material is provided. The resume link is also pending.

The NPC's guided choices are defined separately in `src/data/dialogues.ts`. AI chat is outside the MVP.

Set `NEXT_PUBLIC_SITE_URL` to the production URL when deploying so the sitemap and social metadata use the correct domain. The site falls back to the Vercel deployment URL when available.

See `docs/PRD.md` and `docs/DESIGN_REFERENCE.md` for requirements and visual references.
