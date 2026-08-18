# 2026-08-18 06:57 — Codex — Frontier/Endpoint Hero Proofs

## Agent name

Codex

## Task requested

Implement the next five official-art hero proofs after the monocolor batch, leaving visual testing to the owner.

## Files reviewed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `C:\WIP\VoxManaHeroArt\approved\yore_gpt-140-yore-tiller-nephilim.jpg`
- `C:\WIP\VoxManaHeroArt\approved\yore_gpt-140-yore-tiller-nephilim.png`
- `C:\WIP\VoxManaHeroArt\approved\glint_gpt-115-glint-eye-nephilim.jpg`
- `C:\WIP\VoxManaHeroArt\approved\glint_gpt-115-glint-eye-nephilim.png`
- `C:\WIP\VoxManaHeroArt\approved\dune_gpt-110-dune-brood-nephilim.jpg`
- `C:\WIP\VoxManaHeroArt\approved\dune_gpt-110-dune-brood-nephilim.png`
- `C:\WIP\VoxManaHeroArt\approved\witch_gpt-138-witch-maw-nephilim.jpg`
- `C:\WIP\VoxManaHeroArt\approved\witch_gpt-138-witch-maw-nephilim.png`
- `C:\WIP\VoxManaHeroArt\approved\colorless_sld-1160-emrakul-the-promised-end.jpg`
- `C:\WIP\VoxManaHeroArt\approved\colorless_sld-1160-emrakul-the-promised-end.png`
- `data/scryfall/raw/oracle-cards.json`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `assets/img/identity-hero/official/yore-yore-tiller-nephilim.jpg`
- `assets/img/identity-hero/official/glint-glint-eye-nephilim.jpg`
- `assets/img/identity-hero/official/dune-dune-brood-nephilim.jpg`
- `assets/img/identity-hero/official/witch-witch-maw-nephilim.jpg`
- `assets/img/identity-hero/official/colorless-emrakul-promised-end.jpg`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/frontier-five-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0657-codex-frontier-five-hero-proofs.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added five rollback-safe official art crop assets for `YORE`, `GLINT`, `DUNE`, `WITCH`, and `COLORLESS`.
- Mapped only those five identities to the new proof asset paths with initial authored `cover` focal positions.
- Added proof-only art credits for the five selected identities.
- Extended focused hero mapping/credit tests.
- Added the five selected keys to the existing proof credit CSS selector.
- Owner remediation added `INK` and `WUBRG` proof mappings.
- WUBRG remains `cover` to avoid side borders; focal was re-centered to `50% 50%`.
- Owner remediation later switched `WUBRG` from Conflux to the owner-provided Channel the Suns crop while preserving the Conflux proof asset for rollback.

## Why it changed

Owner accepted the monocolor batch and requested the next five. The initial five were selected because they had approved local art crops and existing asset-backed hero rollback files. Owner then confirmed `INK` should use `ink_gpt-117-ink-treader-nephilim.jpg` and `WUBRG` should use `wubrg_con-102-conflux.jpg`; both were added through proof-only override paths.

## Decisions made

- Used JPG files because each is the horizontal art crop, while the PNG companion is portrait/full-card.
- Preserved all original `yore.webp`, `glint.webp`, `dune.webp`, `witch.webp`, `colorless.webp`, and `wubrg.webp` rollback assets.
- Preserved all prior proof mappings and Dimir's approved `80% auto` size override.
- Kept `INK` out of the slug fallback map because there is no existing `ink.webp`; it resolves through the proof override only.
- Preserved `assets/img/identity-hero/official/wubrg-conflux.jpg` after switching WUBRG to Channel the Suns.

## RobDevPass compact implementation packet

- Changed behavior: only frontier/endpoint proof artwork path/focal/credit mappings and credit selector coverage.
- Owning authority / producer: `assets/js/index.js` controls hero proof artwork mapping; `assets/css/archscry.css` controls proof credit visibility; `research/archscry-dossier-followup-tests.js` guards helper behavior.
- Existing machinery reused: existing proof override map, background shorthand, and proof attribution.
- Protected behavior: other proof identities, non-proof identity mappings, dossier copy, scoring, routing, questionnaire logic, generated data, layout, typography, gradients, and deployment remain untouched.
- Smallest complete implementation: add proof assets, update proof records, update focused assertions and docs.
- Non-goals: no art generation/editing, no browser visual automation, no commit, no deploy.

## RobQAPass readiness notes

- QA tier: focused lightweight code/static proof for an owner visual review batch.
- Changed contracts: `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`, `COLORLESS`, and `WUBRG` must resolve to official proof assets/credits; old rollback `.webp` assets remain present where they already existed; `INK` remains proof-override-only without an invented `ink.webp`.
- Owner acceptance: visual approval remains with the owner in the browser.

## Risks / uncertainties

- Initial focals are best-effort and may need owner tuning.
- The Colorless proof credit uses the readily available card name because exact SLD artist metadata was not present in the local oracle record.
- The saved `YORE` live-placement witness row currently carries an insufficient `UB` result, so the owner review snippet must force a visual-only Yore result state.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for frontier/endpoint proof mappings, credits, rollback asset presence, Dimir size preservation, proof-before-slug fallback behavior, and Ink proof-without-rollback-slug behavior — PASS
- Local HTTP asset checks for the seven new/selected proof assets — PASS
- `git diff --check` — PASS, with CRLF warnings only

## Not touched

- Existing rollback `.webp` assets
- Other identity hero mappings
- Dossier copy
- Scoring, routing, questionnaire logic
- Generated JSON/data
- Shared layout, typography, gradients
- Deployment, commits, pushes, merges

## Follow-up recommendations

- Owner should review `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`, `COLORLESS`, and `WUBRG` visually using the placement focus route.

## Next suggested agent

Owner visual QA for the frontier/endpoint batch.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/frontier-five-official-art-hero-proof.md`
