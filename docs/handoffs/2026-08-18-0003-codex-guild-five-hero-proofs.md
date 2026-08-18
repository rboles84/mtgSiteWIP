# 2026-08-18 00:03 — Codex — Five Guild Official-Art Hero Proofs

## Agent name

Codex

## Task requested

Continue the official-art hero proof by adding the next five approved identities for owner visual review. Keep execution efficient, with basic unit/code/static testing only and visual testing left to the owner.

## Files reviewed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/scryfall/raw/oracle-cards.json`
- Approved local JPG/PNG pairs for Azorius/WU, Dimir/UB, Rakdos/BR, Gruul/RG, and Selesnya/WG under `C:\WIP\VoxManaHeroArt\approved`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/guild-five-official-art-hero-proof.md`
- `assets/img/identity-hero/official/azorius-hallowed-fountain.jpg`
- `assets/img/identity-hero/official/dimir-haunter-nightveil.jpg`
- `assets/img/identity-hero/official/rakdos-rix-maadi-dungeon-palace.jpg`
- `assets/img/identity-hero/official/gruul-zhur-taa-ancient.jpg`
- `assets/img/identity-hero/official/selesnya-temple-garden.jpg`
- `docs/handoffs/2026-08-18-0003-codex-guild-five-hero-proofs.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added rollback-safe official-art assets for Azorius/WU, Dimir/UB, Rakdos/BR, Gruul/RG, and Selesnya/WG.
- Extended the proof override map for those five identities only.
- Set initial focal positions:
  - `WU`: `50% 50%`
  - `UB`: `50% 45%`
  - `BR`: `50% 50%`
  - `RG`: `50% 46%`
  - `WG`: `50% 50%`
- Reused the proof-only hero credit mechanism.
- Updated focused helper assertions for the five new proofs.

## Why it changed

The owner approved the previous batch and requested the next five. This batch covers five guild identities while preserving the existing proof pattern.

## Decisions made

- Selected JPGs because they are the art crops; PNGs are full card frames.
- Used local Oracle/Scryfall metadata when it clearly matched the proof source; otherwise kept proof attribution in a clean card-title form instead of over-claiming exact printing artist metadata.
- Combined Kanban/handoff closeout for efficiency while preserving the required implementation record.
- Did not perform browser/visual automation because the owner reserved visual testing.

## RobDevPass compact implementation packet

- Changed behavior: only the five selected guild identities join the existing proof-only official-art hero override path.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `assets/css/archscry.css` controls scoped credit style; `data/factions.json` remains untouched.
- Existing machinery reused: Archscry `.guild-banner`, background shorthand, `IDENTITY_HERO_OVERLAY`, identity banner fallback, and conditional proof credit.
- Protected behavior: previous proofs remain intact; non-proof identities remain on existing local `.webp` mapping; scoring, routing, questionnaire, generated data, dossier copy, shared layout, typography, and deployment are untouched.
- Smallest complete implementation: five new assets, five proof map entries, scoped credit selector extension, focused assertion updates, combined Kanban/handoff closeout.
- Non-goals: no visual approval by Codex, no production deploy, no commit.

## Risks / uncertainties

- Focal positions are authored starting points and await owner visual approval.
- Exact printing artist metadata for some land cards was not fully represented by local Oracle data; proof attribution stays minimal where needed.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for all current proof identities, new guild proof paths, rollback assets, non-proof Prismari preservation, and `INK` exclusion — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest` for all five new official assets — PASS, HTTP 200

## Not touched

- Existing rollback assets for Azorius, Dimir, Rakdos, Gruul, and Selesnya
- Existing proof rollback assets
- `data/factions.json`
- Placement, scoring, routing, questionnaire, generated JSON, dossier copy, layout, typography, deployment, and all non-proof identity mappings

## Follow-up recommendations

- Owner should review all five visually and adjust only the second background layer focal coordinates in DevTools if needed.

## Next suggested agent

Owner visual QA for Azorius, Dimir, Rakdos, Gruul, and Selesnya.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/guild-five-official-art-hero-proof.md`
- Existing proof handoffs/cards
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
