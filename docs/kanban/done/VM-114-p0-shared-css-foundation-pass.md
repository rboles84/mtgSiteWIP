# VM-114 - P0 Shared CSS Foundation Pass

ID: VM-114
Title: P0 Shared CSS Foundation Pass
Status: done
Type: Frontend / Shared CSS / Architecture
Area: Shared Visual System
Priority: medium
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Implement the approved additive shared-CSS pass: move the site to shared `font-display: swap`, add top-level CSS layer/import scaffolding in `tokens.css`, extract one shared animation stub, and apply footer `content-visibility` only where `components.css` is already live.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1333-codex-vm112a-floating-topbar-redesign.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- User-approved revised P0 shared-CSS plan in this thread

## Scope

- Update `assets/css/fonts.css` to use shared `font-display: swap` and remove the old mobile-only override.
- Add CSS layer-order and imported shared-animation scaffolding to `assets/css/tokens.css`.
- Create `assets/css/animations.css` with the extracted `vm-bg-burns` keyframe and remove the local duplicate from `assets/css/atmosphere.css`.
- Add footer `content-visibility` rules only for `footer.apoc-footer` and `footer.vm-home__status` in `assets/css/components.css`.
- Update living architecture docs to reflect the new shared CSS file.

## Non-Goals

- Do not edit HTML files or page-local inline CSS/script blocks.
- Do not apply shared footer optimization to `newIndex2.html` or `strategium/index.html`, which do not load `components.css`.
- Do not move additional animations or re-layer the rest of the CSS stack yet.
- Do not touch route wiring, JS runtime behavior, or legal-page content.

## Acceptance Criteria

- `vm-bg-burns` lives only in `assets/css/animations.css`, with `assets/css/atmosphere.css` still using it unchanged.
- `assets/css/tokens.css` declares layer order and imports the shared animation stub before normal rules.
- Shared fluid spacing tokens exist alongside the fixed `--s-*` scale.
- Footer `content-visibility` rules only target pages already on `components.css`.
- No HTML files are changed by this pass.

## Outcome

- Shifted all shared self-hosted fonts to `font-display: swap` and removed the obsolete mobile-only override block.
- Added top-level CSS layer-order scaffolding and a temporary imported animation bridge in `tokens.css`.
- Extracted the shared background burn keyframe into the new `assets/css/animations.css`.
- Added footer `content-visibility` and intrinsic size hints only for the Apocrypha footer and home gateway status footer.
- Updated the Project Atlas shared visual system inventory to include the new shared animation file.

## Verification

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run lint:html` - fails on existing legal-page navigation assertion: `legal pages should keep their Maze navigation links`
- Static checks:
  - `rg -n "vm-bg-burns" assets/css`
  - `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only -- '*.html'`

## Handoff

- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
