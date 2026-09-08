# Agent instructions

For Cursor cloud agents working in this repo:

- Only add/update files under `apps/<kebab-slug>/` for a given demo (plus `tracking/seen-bookmarks.json` when recording proposals).
- Never create a new GitHub repository.
- Each app must be self-contained: `bun install && bun run dev` from that app folder.
- Use Bun; include `bunfig.toml` with `[install] minimumReleaseAge = 259200` before installs.
- Follow `skills/project-planning/SKILL.md` before building.
- Every PR must attach BOTH at least one screenshot AND at least one video of the running app.
- Prefer one Cloudflare Pages project with a path per `apps/<slug>/` (repo secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`) — do not invent deploy config unless asked.
