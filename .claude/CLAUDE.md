# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server at localhost:3000
bun run build    # prisma generate + next build
bun run lint     # ESLint via next lint
bun run seed     # Seed the database via prisma/seed.ts
```

Use `rtk` prefix for all commands (e.g. `rtk next build`, `rtk lint`).

## Architecture

This is a Next.js 14 portfolio site with two distinct data layers that coexist:

**Static data** — `src/lib/project.ts` exports a hardcoded `Projects` array with static images imported directly. This powers the landing page project section.

**Dynamic data (Prisma + PostgreSQL)** — `Project` and `Experience` models defined in `prisma/schema.prisma`. The API routes under `src/app/api/` serve this data. Prisma is configured with `@prisma/extension-accelerate`, and `DATABASE_URL` must point to a Prisma Accelerate connection string.

**Route groups:**
- `src/app/(landing)/` — single-page sections (hero, about, project-show, footer) assembled in `(landing)/page.tsx` (the home page)
- `src/app/(main)/` — multi-page routes: `/about`, `/contact`, `/experience`, `/project/[id]`, each with their own `page.tsx`
- `src/app/cms/` — password-protected admin UI for managing projects and experiences. Protected by middleware (`src/middleware.ts`) via a `cms-auth` cookie. Disabled in production unless `ENABLE_CMS=true` is set.
- `src/app/api/` — REST endpoints for `projects` (CRUD + reorder) and `experience`

**Key component patterns:**
- Page transitions use `TransitionProvider` + `TransitionLink` — use `TransitionLink` instead of Next.js `Link` for internal navigation to keep animations consistent.
- Smooth scrolling via Lenis, wrapped in `SmoothScroll`.
- Fonts: Sora (body, `className`) and Bricolage Grotesque (headings, CSS var `--font-bricolage`).
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge).

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma Accelerate connection string |
| `CMS_PASSWORD` | Password for `/cms/login` |
| `ENABLE_CMS` | Set to `"true"` to enable CMS in production |
