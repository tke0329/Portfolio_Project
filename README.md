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

The confirmed name, email, GitHub, blog, Full-stack Engineer presentation, and owner-written slogan are in `src/data/profile.ts`. Keyoff Lab is the published web project, using the owner's description and a screenshot of its public site. The Tech Stack page groups the owner's language, framework, database, and infrastructure list by field. Previous owner-confirmed Next.js remains included. The 17 published Velog posts are curated by topic in `src/data/logs.ts`; the original illustrated thumbnails remain as collection art, and each entry links to the full original post. The resume link is pending.

To add a Velog post, add its title, original URL, date, and concise summary to `src/data/logs.ts`. To publish a local MDX article, copy `src/content/logs/_template.mdx` to `<slug>.mdx` and add a matching entry without `sourceUrl`; the detail route and sitemap then include it. Velog posts link to their original source and are not duplicated as local articles.

The opening hero keeps the workshop scene and animated NPC. Its guide button uses the navigation choices in `src/data/dialogues.ts`; only clicking the character opens the AI NPC chat. Scrolling below the hero reveals the wooden noticeboard with profile, project, technology, and log links.

Set `NEXT_PUBLIC_SITE_URL` to the production URL when deploying so the sitemap and social metadata use the correct domain. The site falls back to the Vercel deployment URL when available.

## Today's visitor count

The header counts approximate unique browsers per day in Korea time. It saves one random ID in the browser and stores only a date-specific hash in Redis; it does not use IP addresses. To enable the count on Vercel, connect an Upstash Redis database and provide `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` as server environment variables. Until then, the badge says `연결 전` and never shows an invented count. The key expires after 48 hours.

This is a light, browser-based count. Private browsing, cleared storage, and multiple browsers can each count separately.

## AI NPC chat

Clicking the home character opens the chat panel. The guide button opens page navigation instead. The server route uses the OpenAI Responses API with `gpt-6-luna` by default and streams text to the browser. Only verified public profile data and published projects are supplied as portfolio facts; general development questions are answered without claiming personal experience. Conversations are sent with `store: false` and only the latest nine messages are included in each request.

Set `OPENAI_API_KEY` on the server and connect Upstash Redis (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`) before enabling chat. The same Redis connection supports the visitor count and limits AI chat to 60 requests per IP address per Korea-time day. Without both services, the chat panel shows its setup state and links to the public portfolio pages. `OPENAI_MODEL` can override the default model. Never prefix the API key with `NEXT_PUBLIC_` or commit it.

See `docs/PRD.md` and `docs/DESIGN_REFERENCE.md` for requirements and visual references.
