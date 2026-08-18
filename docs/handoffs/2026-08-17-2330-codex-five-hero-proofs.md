# 2026-08-17 23:30 — Codex — Five Official-Art Hero Proofs

## Agent name

Codex

## Task requested

Continue the official-art hero proof by adding exactly five more approved identities for owner visual review. Keep execution efficient, with basic unit/code testing only and visual testing left to the owner.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/scryfall/raw/oracle-cards.json`
- Approved local JPG/PNG pairs for Jund, Sultai, Temur, Mardu, and Jeskai under `C:\WIP\VoxManaHeroArt\approved`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `assets/img/identity-hero/official/jund-plane-alara.jpg`
- `assets/img/identity-hero/official/sultai-teval-balanced-scale.jpg`
- `assets/img/identity-hero/official/temur-ureni-unwritten.jpg`
- `assets/img/identity-hero/official/mardu-neriv-heart-storm.jpg`
- `assets/img/identity-hero/official/jeskai-shiko-paragon-way.jpg`
- `docs/handoffs/2026-08-17-2330-codex-five-hero-proofs.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added rollback-safe official-art assets for Jund, Sultai, Temur, Mardu, and Jeskai.
- Extended the proof override map so the current proof identities are Abzan, Bant, Esper, Grixis, Naya, Jund, Sultai, Temur, Mardu, and Jeskai.
- Set initial focal positions for owner review:
  - `JUND`: `50% 48%`
  - `SULTAI`: `50% 42%`
  - `TEMUR`: `50% 43%`
  - `MARDU`: `50% 42%`
  - `JESKAI`: `50% 42%`
- Reused the proof-only hero credit mechanism with local Scryfall artist metadata.
- Updated focused helper assertions for the five new proofs.

## Why it changed

The owner approved the previous two-proof batch and requested a five-identity batch to review in the same manner. The selected identities complete the remaining shard/wedge cluster while keeping each change inside the existing proof mechanism.

## Decisions made

- Selected JPGs because they are the art crops; PNGs are full card frames.
- Chose `jund_opc2-20-jund.jpg` from the two curated Jund pairs to preserve the plane-style shard pattern already used for Bant, Grixis, Naya, and Esper. The Karrthus Jund pair remains unused and untouched.
- Used local Scryfall metadata where readily available:
  - Jund: Aleksi Briclot
  - Sultai / Teval: Chris Rahn
  - Temur / Ureni: Valera Lutfullina
  - Mardu / Neriv: Victor Adame Minguez
  - Jeskai / Shiko: Victor Adame Minguez
- Combined Kanban/handoff closeout for efficiency while preserving the required implementation record.
- Did not perform browser/visual automation because the owner reserved visual testing.

## RobDevPass compact implementation packet

- Changed behavior: only the five selected identities join the existing proof-only official-art hero override path.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `assets/css/archscry.css` controls scoped credit style; `data/factions.json` remains the identity content authority and was not edited.
- Existing machinery reused: the existing Archscry `.guild-banner`, background shorthand, `IDENTITY_HERO_OVERLAY`, identity banner fallback, and conditional proof credit.
- Protected behavior: previous proofs remain intact; non-proof identities remain on existing local `.webp` mapping; scoring, routing, questionnaire, generated data, dossier copy, shared layout, typography, and deployment are untouched.
- Consumers inspected: hero mapping helper, background helper, attribution helper, focused dossier test helper, static asset server path.
- Smallest complete implementation: five new assets, five proof map entries, scoped credit selector extension, focused assertion updates, combined Kanban/handoff closeout.
- Non-goals: no visual approval by Codex, no production deploy, no commit.

## Risks / uncertainties

- Focal positions are authored starting points and await owner visual approval.
- The full broad dossier follow-up test is known to fail earlier on an unrelated approved-rationale assertion, so validation used targeted helper invariants instead.
- Visual review was intentionally not performed by Codex at owner direction.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for all ten current proof identities, all existing mapped non-proof hero paths, rollback assets, proof attribution, and `INK` exclusion — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest` for all five new official assets — PASS, HTTP 200

## Not touched

- Existing rollback assets for Jund, Sultai, Temur, Mardu, and Jeskai
- Existing proof rollback assets
- `data/factions.json`
- Placement, scoring, routing, questionnaire, generated JSON, dossier copy, layout, typography, deployment, and all non-proof identity mappings

## Follow-up recommendations

- Owner should review all five visually and adjust only the second background layer focal coordinates in DevTools if needed.
- Continue in small batches only after owner approval of the crop/focal pattern.

## Next suggested agent

Owner visual QA for Jund, Sultai, Temur, Mardu, and Jeskai.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- Existing proof handoffs/cards
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
