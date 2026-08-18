# 2026-08-17 23:59 — Codex — Temur Dragonback Proof Swap

## Agent name

Codex

## Task requested

Try the owner-provided `Dragonback Assault` art for Temur because the prior Temur replacement was hard to see.

## Files reviewed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `C:\Users\obake\Downloads\temur_atdm-22-dragonback-assault.jpg`
- `C:\Users\obake\Downloads\temur_atdm-22-dragonback-assault.png`
- `data/scryfall/raw/oracle-cards.json`

## Files changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `assets/img/identity-hero/official/temur-dragonback-assault.png`
- `docs/handoffs/2026-08-17-2359-codex-temur-dragonback-proof-swap.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Changed Temur's active proof mapping to `assets/img/identity-hero/official/temur-dragonback-assault.png`.
- Set Temur focal position to `50% 48%`.
- Updated Temur credit to `Art: Ryan Pancoast - Dragonback Assault`.
- Updated focused helper assertions to protect the new active mapping and preservation of both prior Temur proof assets.

## Why it changed

Owner review found the previous Temur image hard to see and supplied a Dragonback Assault replacement pair.

## Decisions made

- Used the PNG because both supplied files are art crops and the PNG is higher resolution/larger (`1040x745`, `1353974` bytes) than the JPG (`972x677`, `124091` bytes).
- Preserved the prior Temur proof assets `temur-ureni-song-unending.jpg` and `temur-ureni-unwritten.jpg` rather than replacing them in place.
- Used local Scryfall metadata for the artist credit: Ryan Pancoast.
- Did not perform browser/visual automation; owner remains visual reviewer.

## RobDevPass compact implementation packet

- Changed behavior: Temur active proof image/focal/credit only.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `data/factions.json` remains untouched.
- Existing machinery reused: proof override map and existing hero background stack.
- Protected behavior: all other proof mappings remain intact; non-proof identities remain on `.webp`; placement/scoring/routing/questionnaire/generated data/dossier copy/layout/deployment remain untouched.
- Smallest complete implementation: one new asset path, one Temur map update, focused test updates.
- Non-goals: no global visual change, no commit, no deploy.

## Risks / uncertainties

- Temur focal `50% 48%` awaits owner visual approval.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Temur Dragonback mapping, previous Temur proof preservation, original rollback preservation, and non-proof Prismari preservation — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest` for `temur-dragonback-assault.png` — PASS, HTTP 200

## Not touched

- `assets/img/identity-hero/official/temur-ureni-song-unending.jpg`
- `assets/img/identity-hero/official/temur-ureni-unwritten.jpg`
- `assets/img/identity-hero/temur.webp`
- Sultai readability treatment
- Data/dossier copy, scoring, routing, questionnaire, generated JSON, layout, deployment, and unrelated identities

## Follow-up recommendations

- Owner should review Temur visually and adjust only the second background layer focal coordinates in DevTools if needed.

## Next suggested agent

Owner visual QA for Temur.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `docs/handoffs/2026-08-17-2352-codex-sultai-temur-proof-remediation.md`
