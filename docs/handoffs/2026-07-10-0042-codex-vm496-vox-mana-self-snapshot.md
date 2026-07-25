# Codex Handoff - VM-496 Vox Mana Self-Snapshot

## Agent Name

Codex

## Task Requested

Create a deep, evidence-first self-snapshot of Vox Mana covering project identity, philosophy, active themes, technical implementation, source authority, first-visit UX, voice, readiness, open loops, audiences, strategic options, anti-fits, comparison hooks, ten recommended tickets, and a blunt executive summary. Work from current `main`, not the former docs-cleanup branch.

## Pre-Flight Summary

- `main` and `codex/docs-cleanup` both pointed to `307e794`; the review was performed on `main` as the user directed.
- VM-495 had completed the most recent release sweep: current local visual comparisons, Home Lighthouse threshold, browser/full deterministic tests, and disabled private deck links pending VM-446.
- VM-494 had recovered and promoted the accumulated work to `main`.
- VM-459 and VM-474 were historical baselines only; their older visual/readiness scores were not copied forward without current verification.
- VM-469 remains blocked on external reviewers. VM-422/VM-446 remain deferred and live RLS is not proven.
- Current authority decisions remain: 37 active identities; raw/source data precedes generated artifacts; no deckbuilder, legality checker, rules authority, generic wiki, or account-backed deck storage in the current product.
- Runtime, source/generated data, Supabase state, accepted visual baselines, and deployment were explicitly out of scope for mutation.

## Files Reviewed

Representative high-value files and records reviewed include:

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent handoffs for VM-495, VM-494, VM-493, VM-490, VM-474, VM-465, VM-459, VM-458, and VM-452
- `docs/kanban/board.md` and related VM-495, VM-494, VM-493, VM-490, VM-474, VM-469, VM-459, VM-446, and VM-422 cards
- `docs/audits/2026-06-30-vox-mana-self-snapshot.md`
- `docs/audits/2026-07-04-vox-mana-delta-reevaluation.md`
- `docs/project-atlas.md`
- `docs/architecture/data-contracts.md`
- `docs/architecture/source-generated-guardrails.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/placement-domains.md`
- `docs/product/vox-mana-product-definition.md`
- `docs/research/identity-layer1-coverage-and-wubrg-plan.md`
- `docs/research/maze-plain-reading-deep-dive.md`
- `docs/reference/commander-faction-guidance.md`
- `docs/qa/visual-baseline-waivers.md`
- `docs/portfolio/public-demo-case-study.md`
- `README.md`, `package.json`, `.github/workflows/validation.yml`, and browser-smoke workflow state
- Public Home, Archscry, Maze, Strategium, and Apocrypha HTML/CSS/JS and rendered live routes
- `assets/js/index.js`
- `assets/js/quick-reading.js`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/shared.js`
- `research/research-init.js`
- `data/identity-layers.json`, `data/factions.json`, and placement artifacts
- Per-identity raw faction bundles, with targeted review of White, Colorless, WUBRG, and four-color examples
- `data/precons/vox-mana-precons.source.json` and `data/precons/vox-mana-precon-catalog.json`
- Scryfall semantic registry/grounding inputs and current parser outputs
- Current dossier and presentation snapshot/audit artifacts

## Files Changed

- `docs/audits/2026-07-10-vox-mana-self-snapshot.md`
- `docs/kanban/done/VM-496-vox-mana-self-snapshot-2026-07-10.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-10-0042-codex-vm496-vox-mana-self-snapshot.md`
- `docs/handoffs/HANDOFF_INDEX.md`

The temporary in-progress VM-496 card was moved to `done/`. No runtime, source JSON, generated runtime data, visual baseline, backend, workflow, or deployment file was intentionally changed.

## What Changed

- Added a 15-section, 620-line current-state snapshot with explicit Evidence/Inference/Judgment distinctions.
- Mapped current product identity, operating philosophy, 14 active product themes, technical strengths/risks, source authority, route UX, narrative voice, readiness, open loops, audiences, strategy, anti-fits, comparison questions, and ten recommended tickets.
- Added a 16-category 1–5 readiness scorecard and a 16-row source-confidence table.
- Recorded current rendered and release evidence rather than relying only on prior handoffs.
- Closed VM-496 and updated board/index traceability.

## Why It Changed

The existing full snapshot predated the current visual release state and the latest Maze/compiler/precon/content work. A fresh report was needed to distinguish what is now genuinely ready from what is merely deterministic, well documented, or still unproven with users.

## Decisions Made

1. Vox Mana is currently best described as a source-conscious Commander taste assessment and discovery companion, not a deck tool.
2. The absolute “not a recommendation engine” claim is inconsistent with `buildPreconRecommendations()`, recommendation-shaped data, ranking, and comparative precon copy. This is the highest-priority boundary decision.
3. Current `main` is ready for public beta/portfolio demonstration, but not for monetization or claims of validated player-fit accuracy.
4. The most differentiated asset is the placement→dossier→Maze journey with adjacent-fit explanation and source governance, not generic card search.
5. Deterministic validation proves execution and regression behavior; it does not prove construct validity, user usefulness, repeat use, or market demand.
6. The ten next-ticket entries remain recommendations with `VM-XXX` placeholders. No speculative backlog was created.
7. Accounts, deck storage, community, Loom v1, broad lore expansion, and billing remain deferred or anti-fit pending evidence.

## Risks / Uncertainties

- The fresh dossier audit still reports 113 warnings and zero failures; warnings require classification rather than being treated as release-clean output.
- The default source/generated validation covers JESKAI and MARDU only and reports two model-owned warnings.
- The placement taxonomy has no external construct-validity or user-agreement evidence.
- Current precon source data contains unsupported strength/popularity superlatives that can propagate into runtime support copy.
- Colorless raw lifecycle evidence is stale relative to the canonical registry.
- Current GitHub validation and Pages deployment were observed green, but the hosted Browser Smoke Pilot has zero recorded runs.
- Home Lighthouse passed at 91 Performance / 100 Accessibility, but the harness emitted an Edge process-cleanup access-denied warning after writing the report.
- Home Lighthouse evidence should not be generalized to every interactive route; Maze nested-control semantics and Archscry cognitive density remain manual concerns.
- External audience, repeat-use, and monetization evidence remain absent.

## Tests Run

- `npm.cmd run test:copy-boundaries` - passed across 14 live-copy files.
- `npm.cmd run test:route-metadata` - passed for eight public route heads.
- `npm.cmd run dossier:audit` - 37 primary, 76 adjacent, 113 warnings, 0 failures.
- `npm.cmd run test:parser` - 226 cases passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run validate:source-generated` - passed for JESKAI/MARDU with two warnings.
- `npm.cmd test` - passed; includes 37 golden paths, 625 gate-bias paths, Maze/query/store/mode tests, precon artifacts, dossier follow-ups, and presentation snapshots.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - desktop/mobile Home, Archscry, Maze, Reading Finds, and return handoff passed.
- `npm.cmd run test:lighthouse:home` - 91 Performance, 100 Accessibility; post-report cleanup warning noted above.
- Live rendered desktop/mobile review of Home, Archscry, Maze, Strategium, and Apocrypha; no route overflow or console errors observed in the tested flow.
- Structural audit checks for 15 numbered sections and the exact six final labels - passed.
- `git diff --check` - passed at completion.

## Not Touched

- Runtime HTML, CSS, JavaScript, or query/placement behavior
- Canonical or generated identity/precon/Scryfall data
- MTG lore, card, commander, rules, or legality claims
- Supabase schema, policies, credentials, or live RLS state
- Account/deck-link feature flags
- Visual baselines or waiver decisions
- GitHub workflow definitions, deployment, commit, or push

## Follow-Up Recommendations

1. Resolve the recommendation-boundary contract and remove/qualify unsupported precon superlatives.
2. Reconcile the Colorless lifecycle claim and stale/incomplete identity guidance.
3. Rewrite the first Archscry prompt in recognizable table language while preserving scoring.
4. Reduce dossier template repetition and establish a warning budget/core result hierarchy.
5. Repair Maze result-card interactive semantics.
6. Publish one public claim-to-source walkthrough.
7. Repair README/current-authority routing and document ticket-ID collisions.
8. Execute VM-469 with unaffiliated reviewers and dispatch the hosted Browser Smoke Pilot before sessions.

## Next Suggested Agent

Product strategist plus QA lead for the recommendation-boundary decision, followed by a source/data steward for precon comparative-claim cleanup. External user research should begin before another feature expansion.

## Related Kanban Card, Docs, Or Plans

- VM-496 - Vox Mana Self-Snapshot 2026-07-10
- VM-495 - Release Test Loose Ends
- VM-474 - Vox Mana Delta Reevaluation
- VM-469 - External Reviewer Two-Week Test
- VM-459 - Self-Snapshot Refresh
- VM-458 - Deck Saving Deferral
- VM-422 / VM-446 - deferred deck links and live RLS proof
- `docs/audits/2026-07-10-vox-mana-self-snapshot.md`

