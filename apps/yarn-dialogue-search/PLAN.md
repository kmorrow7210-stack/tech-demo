# Yarn-inspired dialogue → clip search demo

## Goal

Search a sample movie/TV dialogue corpus by typing a line and see matching clip-result cards (Yarn-inspired).

## Single-user MVP

- Search input for a dialogue phrase
- Client-side search over a small embedded sample corpus (10–30 famous lines with show/movie title, character, year, mock thumbnail/poster URL or placeholder, and a fake clip timestamp)
- Result cards showing match, title, character, and mock media
- Empty and no-results states
- Works locally via `bun run dev`

## Explicitly out of scope

- Real Yarn API / scraping Yarn
- Auth, accounts, multi-user
- Real video playback of copyrighted clips (use placeholders / mock posters / generated placeholder media only)
- Deploy config, Cloudflare, CI beyond what the scaffold needs
- Backend database

## Outcome-oriented tasks

1. Scaffold Vite + React + TypeScript under `apps/yarn-dialogue-search` via `bunx create-vite` (skip initial install), add `bunfig.toml`, then `bun install`
2. Init shadcn/ui minimalist preset; add only Input, Button, Card (and any tiny bits needed)
3. Add sample dialogue corpus JSON/TS data
4. Build search UI: type phrase → filtered matching cards
5. Polish empty/no-results; make it look like a tiny clip-search toy
6. Capture screenshot + short video of searching a phrase and seeing results; attach both to the PR

## Stack (rationale)

- **Bun** — repo default runtime/PM
- **Vite + React + TS** — one-screen utility; lighter than Next for a single page
- **shadcn/ui** — minimal UI without custom CSS sprawl
- **Local sample corpus** — no external API for MVP

## Deferred

- Real media APIs, fuzzy ranking, share links, Cloudflare Pages path deploy
