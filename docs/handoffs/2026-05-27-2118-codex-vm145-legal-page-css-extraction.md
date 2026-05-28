# 2026-05-27 21:18 - Codex - VM-145 Legal Page CSS Extraction

## Agent name

Codex

## Task requested

Implement VM-145 by extracting the duplicated inline CSS from `privacy/index.html` and `terms/index.html` into one route-local stylesheet, preserving legal copy, shell behavior, script order, local-file-safe links, and visual layout.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Relevant legal-page and route-ownership handoffs, especially VM-100, VM-111, VM-113, VM-116, VM-117, and VM-143
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-145-legal-page-css-extraction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `privacy/index.html`
- `terms/index.html`
- `scripts/validate-frontend-html.mjs`
- `package.json`

## Files changed

- `assets/css/legal.css`
- `privacy/index.html`
- `terms/index.html`
- `scripts/validate-frontend-html.mjs`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-145-legal-page-css-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2118-codex-vm145-legal-page-css-extraction.md`

Generated but ignored QA artifacts:

- `artifacts/vm145-legal-qa/privacy-desktop.png`
- `artifacts/vm145-legal-qa/privacy-mobile.png`
- `artifacts/vm145-legal-qa/terms-desktop.png`
- `artifacts/vm145-legal-qa/terms-mobile.png`

## What changed

- Compared the inline `<style>` blocks in `privacy/index.html` and `terms/index.html` before implementation; they matched.
- Lifted the legal-page CSS verbatim into `assets/css/legal.css`.
- Removed the inline `<style>` blocks from both legal pages.
- Added `<link rel="stylesheet" href="../assets/css/legal.css">` after `components.css` on both legal pages.
- Added validator checks scoped only to `privacy/index.html` and `terms/index.html` requiring `../assets/css/legal.css` as the final stylesheet and rejecting inline `<style>` blocks.
- Updated route ownership docs and moved VM-145 to done.

## Why it changed

VM-145 was a contained cleanup to remove duplicated inline legal-page CSS while keeping the pages visually stable and keeping future inline-style regressions out of the two legal pages.

## Decisions made

- Used one shared `assets/css/legal.css` file because the existing legal-page inline blocks were identical.
- Kept the extracted CSS verbatim rather than cleaning, regrouping, renaming, or migrating selectors into shared CSS.
- Scoped validation to only `privacy/index.html` and `terms/index.html`.
- Left CDN/font dependency review for VM-146.
- Preserved concurrent VM-022 work already present in the worktree and board.

## Risks / uncertainties

- The in-app Browser plugin could not initialize in this Windows sandbox (`node_repl` setup failed), so visual QA used the repo's local Puppeteer stack instead.
- The first headless run succeeded but Chrome Launcher's temp cleanup raised an `EPERM` after screenshots and metrics were already produced; the same QA was rerun with Puppeteer's direct launcher and exited cleanly.
- Legal copy remains sensitive and should still be human-reviewed for content changes in any future legal-page work.

## Tests run

- Inline CSS pre-flight comparison between `privacy/index.html` and `terms/index.html` - matched
- `assets/css/legal.css` compared against the original `HEAD:privacy/index.html` inline style block - matched
- `npm.cmd run lint:html` - passed
- `npm.cmd run test:frontend-smoke` - passed
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed
- Headless browser QA at desktop `1365x1000` and mobile `390x900` for both legal pages - passed:
  - confirmed `../assets/css/legal.css` loads last
  - confirmed inline `<style>` count is zero
  - confirmed topbar, footer links, glossary spans, background image, and star canvas are present
  - confirmed desktop summary card remains sticky in the side column
  - confirmed mobile layout collapses into a single readable column

## Not touched

- Legal copy and service disclosure wording
- Glossary text
- Page body structure
- Shared topbar/component CSS
- Script tags and script order
- Navigation route targets
- Generated data, Supabase behavior, Maze behavior, Archscry placement behavior, and VM-022 code/contracts

## Follow-up recommendations

- Keep future legal-page styling in `assets/css/legal.css` unless a separate shared-shell refactor is explicitly scoped.
- Let VM-146 handle CDN/font dependency review separately.
- If the in-app Browser sandbox issue persists, continue using the repo's Puppeteer visual stack for local responsive route QA and note the limitation in handoffs.

## Next suggested agent

Documentation Steward for any release-note polish, otherwise no specialist follow-up needed.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-145-legal-page-css-extraction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/handoffs/2026-05-26-2312-codex-vm143-route-ownership-matrix.md`
- `docs/handoffs/2026-05-22-0751-codex-vm100-privacy-terms-archive-document-refresh.md`
