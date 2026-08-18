# 2026-08-18 00:09 — Codex — Dimir Proof Zoom Tune

## Agent name

Codex

## Task requested

Zoom the Dimir hero art out by roughly 20% because the proof looked too zoomed in.

## Files reviewed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/guild-five-official-art-hero-proof.md`

## Files changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/guild-five-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0009-codex-dimir-zoom-proof-tune.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added optional per-proof `size` support in `heroBannerBackgroundForFaction()`.
- Set only `UB` / Dimir to `size: "80% auto"`.
- Updated focused helper assertions to protect the Dimir zoom-out behavior.

## Why it changed

Owner visual review found Dimir too zoomed in.

## Decisions made

- Used an optional `size` field rather than changing global `cover` behavior.
- Preserved all other proof and non-proof identities at `cover`.
- Did not run browser/visual automation because owner is doing visual testing.

## RobDevPass compact implementation packet

- Changed behavior: Dimir hero image sizing only.
- Owning authority / producer: `assets/js/index.js` controls hero background shorthand.
- Existing machinery reused: proof override map and existing background stack.
- Protected behavior: all other identities remain unchanged; placement/scoring/routing/questionnaire/generated data/dossier copy/layout/deployment remain untouched.
- Smallest complete implementation: one optional field, one Dimir value, focused test updates.
- Non-goals: no global crop system redesign, no commit, no deploy.

## Risks / uncertainties

- `80% auto` may expose more of the fallback banner layer at the edges depending on viewport; this is intentional for owner visual review and can be tuned.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Dimir size override, WU/default `cover` preservation, and non-proof Prismari preservation — PASS
- `git diff --check` — PASS, with CRLF warnings only

## Not touched

- Dimir asset file
- Other proof mappings/assets
- Non-proof identities
- Data/dossier copy, scoring, routing, questionnaire, generated JSON, layout, deployment

## Follow-up recommendations

- Owner should re-review Dimir and tune only the `/ 80% auto` size value if needed.

## Next suggested agent

Owner visual QA for Dimir.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/guild-five-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0003-codex-guild-five-hero-proofs.md`
