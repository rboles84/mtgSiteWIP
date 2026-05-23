ID: VM-106
Title: Frontend Hardening Phase 1 Security Accessibility
Status: done
Type: Frontend / Security / Accessibility / Runtime Hardening
Area: Maze, Archscry, Route Compatibility
Priority: high
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Harden the active Vox Mana runtime surfaces in Maze and Archscry by removing unsafe DOM injection patterns, replacing inline handlers with delegated listeners, improving modal and keyboard accessibility, and adding lightweight local checks without redesigning the site.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/done/VM-005-archscry-maze-ux-continuity-link-reliability.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/reference/manual-test-cases.md`
- User-provided implementation plan in Codex thread

## What Changed

- Removed inline event attributes from `maze/index.html` and `archscry/index.html` in favor of delegated `data-action` hooks.
- Reworked `research/research-init.js` so keyword suggestions, chips, recent searches, card results, stash rows, modal contents, and Archscry return copy render through safe DOM creation instead of user/API-driven `innerHTML`.
- Added Maze modal semantics and behavior for `role="dialog"`, `aria-modal`, Escape close, focus trap, and focus return to the opener.
- Replaced Archscry runtime inline handler emission in `assets/js/index.js` with delegated action attributes while keeping the dossier templating system intact.
- Replaced unsafe avatar and initialization error rendering in Archscry with safe node creation / `textContent`.
- Made the `/library/` compatibility alias use relative-safe redirect, assets, and noscript fallback paths.
- Added page-local `:focus-visible` and reduced-motion refinements for Maze and Archscry without changing the dark-gold Vox Mana identity.
- Added local validation scripts wired through `package.json`: `lint:js`, `lint:html`, and `test:frontend-smoke`.

## Scope Completed

- Remove unsafe user/API-driven DOM rendering in the Maze runtime.
- Remove inline handlers from active Maze and Archscry runtime surfaces and replace them with `addEventListener` / delegated actions.
- Improve the Maze modal's semantics and keyboard behavior without replacing it with `<dialog>`.
- Preserve touched-route static compatibility for Maze, the library alias, and legal/home navigation under served local routes.
- Add visible keyboard focus and Maze/Archscry reduced-motion refinements that match the existing Vox Mana aesthetic.
- Add lightweight local lint / HTML validation / smoke checks wired through `package.json`.

## Non-Goals Kept Intact

- No redesign of layouts, typography direction, or surface hierarchy.
- No broad refactor of unrelated pages.
- No rewrite of the full Archscry dossier rendering system.
- No changes to placement logic, generated faction/model data, Supabase schema, or legal-page copy.
- No expansion into VM-014 shell cleanup or terminal strategy work.

## Verification

- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser verification against `http://127.0.0.1:4173/`:
  - home route loads and exposes working Home / Archscry / Maze / Apocrypha navigation
  - Maze route loads, executes a search, opens the modal, closes on Escape, and returns focus to the opener
  - Archscry quick-reading start action renders the first question
  - Privacy and Terms routes load
  - `/library/` resolves to `/apocrypha/`

## Risks / Follow-Up

- Save / sign-out flows were not manually exercised in-browser because no authenticated test session was available.
- The manual browser pass used a local HTTP server because the in-app browser blocks direct `file://` navigation; route compatibility was therefore validated through relative-path behavior rather than raw in-app `file://` browsing.
- Archscry's full dossier reading flow under pure `file://` remains outside this branch's scope because its data loading still depends on served `/data/...` paths, matching the branch assumptions.

## Not Touched

- `newIndex2.html` and its existing unrelated local modifications
- placement model logic and canonical JSON data
- Supabase/auth/session plumbing in `shared.js`
- legal-page copy text
- broader shell redesign / VM-014 work

## Related Handoff

- `docs/handoffs/2026-05-22-2146-codex-vm106-frontend-hardening-phase-1-security-accessibility.md`
