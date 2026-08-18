# 2026-08-18 00:19 — Codex — Second Guild Batch Zoom Tune

## Agent name

Codex

## Task requested

Zoom out all five identities from the latest guild batch by roughly 20% because they looked too zoomed in.

## Files reviewed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`

## Files changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0019-codex-guild-five-two-zoom-tune.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Set `size: "80% auto"` for `WB`, `BG`, `UG`, `UR`, and `WR`.
- Updated focused helper assertions to protect that zoom-out behavior.

## Why it changed

Owner visual review found the latest five guild proofs a bit too zoomed in.

## Decisions made

- Interpreted "all of them" as the five identities from the immediately preceding batch.
- Used the existing optional `size` field introduced for Dimir rather than changing shared layout, focal defaults, or global `cover` behavior.
- Preserved all other proof and non-proof identities.

## RobDevPass compact implementation packet

- Changed behavior: background-size only for `WB`, `BG`, `UG`, `UR`, and `WR`.
- Owning authority / producer: `assets/js/index.js` controls hero background shorthand.
- Existing machinery reused: proof override map and optional per-proof `size` field.
- Protected behavior: other identities remain unchanged; placement/scoring/routing/questionnaire/generated data/dossier copy/layout/deployment remain untouched.
- Smallest complete implementation: five `size` values plus focused test updates.
- Non-goals: no asset replacement, no visual automation, no commit, no deploy.

## Risks / uncertainties

- `80% auto` may expose fallback/banner edges on some viewports; owner can tune the size value in DevTools if needed.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for last-five `80% auto` sizing and selected prior proof/default `cover` preservation — PASS
- `git diff --check` — PASS, with CRLF warnings only

## Not touched

- Asset files
- Other proof mappings
- Non-proof identities
- Data/dossier copy, scoring, routing, questionnaire, generated JSON, layout, deployment

## Follow-up recommendations

- Owner should re-review `WB`, `BG`, `UG`, `UR`, and `WR`; tune only the `/ 80% auto` size value if needed.

## Next suggested agent

Owner visual QA for the second guild batch.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0014-codex-guild-five-two-hero-proofs.md`
