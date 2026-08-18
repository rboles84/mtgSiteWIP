# 2026-08-18 00:28 — Codex — Last-Five Cover Restore and Golgari Text

## Agent name

Codex

## Task requested

Put the latest five guild proofs back to full-fill behavior because borders remained, and fix Golgari text color/readability.

## Files reviewed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0028-codex-last-five-cover-golgari-text.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Removed custom `size` overrides from `WB`, `BG`, `UG`, and `UR`; `WR` was already restored.
- The full latest five guild batch now uses default `cover`.
- Added Golgari-only hero text readability treatment:
  - lighter title color;
  - title text outline;
  - stronger title/body/tagline/lore-summary shadows.

## Why it changed

Owner visual review found borders still present and preferred full fill over zooming out. Owner also reported Golgari text color needed improvement.

## Decisions made

- Interpreted "all" as the latest five guild proofs: `WB`, `BG`, `UG`, `UR`, and `WR`.
- Preserved Dimir's earlier `80% auto` tune because it was separately approved.
- Used a Golgari-only CSS treatment rather than changing shared typography or global overlay.

## RobDevPass compact implementation packet

- Changed behavior: background-size for latest five guild proofs; Golgari hero text readability only.
- Owning authority / producer: `assets/js/index.js` controls hero background shorthand; `assets/css/archscry.css` controls scoped presentation.
- Existing machinery reused: default `cover` fallback and scoped hero CSS pattern used for Sultai readability.
- Protected behavior: all other identities remain unchanged; placement/scoring/routing/questionnaire/generated data/dossier copy/layout/deployment remain untouched.
- Smallest complete implementation: remove four `size` values, add one BG-only CSS block, update focused tests.
- Non-goals: no asset replacement, no visual automation, no commit, no deploy.

## Risks / uncertainties

- Restoring `cover` may make the latest five more zoomed in; this matches owner preference for no side borders.
- Golgari color remains owner-judgment pending visual review.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for `WB`/`BG`/`UG`/`UR`/`WR` cover restore, Golgari CSS guard, and Dimir prior tune preservation — PASS
- `git diff --check` — PASS, with CRLF warnings only

## Not touched

- Asset files
- Dimir `80% auto`
- Other proof mappings
- Non-proof identities
- Data/dossier copy, scoring, routing, questionnaire, generated JSON, layout, deployment

## Follow-up recommendations

- Owner should re-review the latest five guild proofs and Golgari text.

## Next suggested agent

Owner visual QA for the latest guild batch and Golgari text.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0026-codex-boros-cover-restore.md`
