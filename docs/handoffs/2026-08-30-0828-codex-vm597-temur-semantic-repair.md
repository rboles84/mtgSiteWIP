# VM-597 — Temur Semantic Repair

- Agent: Codex
- Task requested: Implement the approved Temur semantic-audit findings end to end, then stop at Owner Review without committing or pushing.
- Related Kanban card: `docs/kanban/in-progress/VM-597-temur-semantic-repair.md`
- Status: Owner Review Ready

## Files reviewed

- `AGENTS.md`, the RobDev/RobQA skills and frozen governing passes, current handoffs, Kanban board, the approved Temur repair brief, Temur raw profile/claims/sources, research ledgers, dossier source/catalog builder, foundation, presentation, runtime composer, identity layer, and focused dossier tests.

## Files changed

- Temur raw source and research ledgers; the dossier source/catalog builder and regenerated catalog; live Temur identity layer and generated faction/provenance artifacts; Commander foundation and presentation; Temur architecture docs; focused Temur regression test; VM-597 Kanban and this handoff/index.

## What changed and why

- Added the official Khans mechanics source and certified Ferocious claim, then anchored the raw semantic model to it.
- Split official design/lore, Commander exploration, and Vox Mana interpretation. Survival Through Attunement is now explicitly optional; Blue-to-whisperer mapping is bounded as interpretation.
- Replaced the single listen → ramp → strike public path with distinct large-creature/Ferocious, ramp/big-mana, spells/copying, and optional-attunement directions.
- Bound Formidable to later Atarka material and removed unsupported missing-color universals from repaired public surfaces. The erroneous discovery seed remains untouched.
- Pointed Temur dossier locators at raw authored fields, added deterministic builder invariants, regenerated outputs, and added targeted regression coverage.

## Decisions made

- The mechanical claim states only Ferocious's Khans-era Temur association and power-four condition; it does not claim a timeless philosophy or Commander mandate.
- Qal Sisma, formal roles, whisperers, and modern Endless Song remain era-labeled lore. Their mapping into a Commander play lens is clearly Vox Mana synthesis.
- No placement/scoring, aliases, routes, or other identity's authored semantics were changed.

## RobDev compact packet

- Owning authority/producer: raw Temur profile/claims/sources and dossier source are authored authorities; catalog/factions/placement/provenance are builder outputs; foundation/presentation are live composition owners.
- Changed behavior: visible Temur Start Here, Test the Fit, and How This Plays now distinguish source levels and offer multiple Commander expressions.
- Protected contracts: source hash projection, semantic-readiness provenance, placement keys/scores, routes, certified Temur fact floor, and the discovery-only seed.
- Risks/stop condition: do not elevate optional synthesis into canonical doctrine; stop at Owner Review with no commit/push.

## RobQA readiness

- Risk class: QA-2 visible semantic/provenance repair with generated artifacts.
- Deterministic checks passed: `npm run test:semantic-readiness`; `node tests/archscry/temur-semantic-repair-tests.js`; `node scripts/build/build-identity-dossier-content-catalog.mjs --check`; `node --check` for the two changed live JS modules; `git diff --check`; targeted TEMUR/RG/UG/UR/SULTAI desktop replays.
- Rendered self-QA: launched local static app, loaded Archscry successfully, and replayed TEMUR plus RG, UG, UR, and SULTAI through the normal rendering harness with PASS results.
- Known unrelated failures: `tests/archscry/archscry-dossier-followup-tests.js` stops at its existing all-atlas result-directory copy expectation; `scripts/vm551-dossier-content-integrity-tests.mjs` stops at its existing glossary-allocation expectation. Neither failure is Temur-specific and both point to concurrently modified runtime surfaces.

## Not touched

- Temur discovery-only seed artifacts, placement/scoring behavior, aliases, routes, external publication, commits, pushes, and unrelated WUBRG/VM-595 authored work.

## Follow-up recommendations

- Owner review should inspect a Temur result's Start Here, Test the Fit, and How This Plays text, confirming explicit optionality and the Ferocious/Formidable boundary.
- Reconcile the two broad runtime-suite expectation failures in their owning concurrent work before requesting all-atlas certification.

## Next suggested agent

- Owner reviewer, then the owning runtime/all-atlas suite maintainer if the unrelated expectation drift remains.
