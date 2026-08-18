# 2026-08-18 00:14 — Codex — Second Five Guild Official-Art Hero Proofs

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
- Approved local JPG/PNG pairs for Orzhov/WB, Golgari/BG, Simic/UG, Izzet/UR, and Boros/WR under `C:\WIP\VoxManaHeroArt\approved`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`
- `assets/img/identity-hero/official/orzhov-ghost-council-orzhova.jpg`
- `assets/img/identity-hero/official/golgari-dark-heart-wood.jpg`
- `assets/img/identity-hero/official/simic-guildgate.jpg`
- `assets/img/identity-hero/official/izzet-steam-vents.jpg`
- `assets/img/identity-hero/official/boros-solar-blaze.jpg`
- `docs/handoffs/2026-08-18-0014-codex-guild-five-two-hero-proofs.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added rollback-safe official-art assets for Orzhov/WB, Golgari/BG, Simic/UG, Izzet/UR, and Boros/WR.
- Extended the proof override map for those five identities only.
- Set initial focal positions:
  - `WB`: `50% 44%`
  - `BG`: `50% 48%`
  - `UG`: `50% 50%`
  - `UR`: `50% 50%`
  - `WR`: `50% 48%`
- Reused the proof-only hero credit mechanism.
- Updated focused helper assertions for the five new proofs.

## Why it changed

The owner approved the prior Dimir tune and requested the next five identities. This batch completes the remaining two-color guild proof set.

## Decisions made

- Selected JPGs because they are the art crops; PNGs are full card frames.
- Used local metadata when it clearly matched the proof source; otherwise kept attribution minimal/card-title safe.
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
- Exact printing artist metadata for some land/guild-source cards was not fully represented by local Oracle data; proof attribution stays minimal where needed.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for all current proof identities, new guild proof paths, rollback assets, non-proof Prismari preservation, and `INK` exclusion — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest` for all five new official assets — PASS, HTTP 200

## Not touched

- Existing rollback assets for Orzhov, Golgari, Simic, Izzet, and Boros
- Existing proof rollback assets
- `data/factions.json`
- Placement, scoring, routing, questionnaire, generated JSON, dossier copy, layout, typography, deployment, and all non-proof identity mappings

## Follow-up recommendations

- Owner should review all five visually and adjust only the second background layer focal coordinates in DevTools if needed.

## Next suggested agent

Owner visual QA for Orzhov, Golgari, Simic, Izzet, and Boros.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/guild-five-two-official-art-hero-proof.md`
- Existing proof handoffs/cards
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
