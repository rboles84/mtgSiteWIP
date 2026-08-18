# 2026-08-18 06:42 — Codex — Monocolor Hero Proofs

## Agent name

Codex

## Task requested

After the owner confirmed the approved art folder, implement the next five official-art hero proofs for White, Blue, Black, Red, and Green, leaving visual testing to the owner.

## Files reviewed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `C:\WIP\VoxManaHeroArt\approved\white_avr-8-builder-s-blessing.jpg`
- `C:\WIP\VoxManaHeroArt\approved\white_avr-8-builder-s-blessing.png`
- `C:\WIP\VoxManaHeroArt\approved\blue_2xm-369-academy-ruins.jpg`
- `C:\WIP\VoxManaHeroArt\approved\blue_2xm-369-academy-ruins.png`
- `C:\WIP\VoxManaHeroArt\approved\black_isd-86-altar-s-reap.jpg`
- `C:\WIP\VoxManaHeroArt\approved\black_isd-86-altar-s-reap.png`
- `C:\WIP\VoxManaHeroArt\approved\red_pd2-16-chain-lightning.jpg`
- `C:\WIP\VoxManaHeroArt\approved\red_pd2-16-chain-lightning.png`
- `C:\WIP\VoxManaHeroArt\approved\green_m12-189-primordial-hydra.jpg`
- `C:\WIP\VoxManaHeroArt\approved\green_m12-189-primordial-hydra.png`
- `data/scryfall/raw/oracle-cards.json`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `assets/img/identity-hero/official/white-builder-s-blessing.jpg`
- `assets/img/identity-hero/official/blue-academy-ruins.jpg`
- `assets/img/identity-hero/official/black-altars-reap.jpg`
- `assets/img/identity-hero/official/red-chain-lightning.jpg`
- `assets/img/identity-hero/official/green-primordial-hydra.jpg`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/monocolor-five-official-art-hero-proof.md`
- `docs/handoffs/2026-08-18-0642-codex-monocolor-hero-proofs.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added five rollback-safe official art crop assets for `W`, `U`, `B`, `R`, and `G`.
- Mapped only those five identities to the new proof asset paths with initial authored `cover` focal positions.
- Added proof-only art credits for the five monocolors.
- Extended focused hero mapping/credit tests.
- Added the five monocolor keys to the existing proof credit CSS selector.

## Why it changed

Owner accepted the previous Quandrix swap and requested the next five. Owner clarified the approved art source folder as `C:\WIP\VoxManaHeroArt\approved`.

## Decisions made

- Used JPG files because each is the horizontal art crop, while the PNG companion is portrait/full-card.
- Preserved all original `white.webp`, `blue.webp`, `black.webp`, `red.webp`, and `green.webp` rollback assets.
- Preserved all prior proof mappings and Dimir's approved `80% auto` size override.

## RobDevPass compact implementation packet

- Changed behavior: only monocolor proof artwork path/focal/credit mappings and credit selector coverage.
- Owning authority / producer: `assets/js/index.js` controls hero proof artwork mapping; `assets/css/archscry.css` controls proof credit visibility; `research/archscry-dossier-followup-tests.js` guards helper behavior.
- Existing machinery reused: existing proof override map, background shorthand, and proof attribution.
- Protected behavior: other proof identities, non-proof identity mappings, dossier copy, scoring, routing, questionnaire logic, generated data, layout, typography, gradients, and deployment remain untouched.
- Smallest complete implementation: add five assets, update five proof records, update focused assertions and docs.
- Non-goals: no art generation/editing, no browser visual automation, no commit, no deploy.

## RobQAPass readiness notes

- QA tier: focused lightweight code/static proof for an owner visual review batch.
- Changed contracts: `W`, `U`, `B`, `R`, and `G` must resolve to official proof assets/credits; old rollback `.webp` assets remain present.
- Owner acceptance: visual approval remains with the owner in the browser.

## Risks / uncertainties

- Initial focals are best-effort and may need owner tuning.
- Some local Scryfall oracle records normalize set/collector variants differently than the curated filename, but card names and artist metadata were available locally.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- `node research\archscry-dossier-followup-tests.js` — FAILS before the hero assertions on an unrelated existing card-rationale surface assertion: `expected the approved card-rationale surface`
- Focused in-memory Node helper assertions for monocolor proof mappings, credits, rollback asset presence, Dimir size preservation, and Quandrix Tanazir preservation — PASS
- Local HTTP asset checks for the five new proof assets — PASS
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

- Owner should review `W`, `U`, `B`, `R`, and `G` visually using the placement focus route.

## Next suggested agent

Owner visual QA for the monocolor batch.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/monocolor-five-official-art-hero-proof.md`
