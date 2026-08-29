# Loom Identity Lens v0 — Accepted Research Package Handoff

## Agent Name

Codex

## Task Requested

Conduct a research-first, evidence-led inquiry into whether five guild/college pairs can differently and usefully order one fixed Commander-legal pool per pair; do not implement product behavior.

## Repository State

- Branch: `loom-identity-lens-v0`
- Parent / starting HEAD: `08fc97aa1d2c1ceec33b527fa9253b6a977340f2` (`feat: complete Loom v0 usability alignment`)
- Divergence from `main` at pre-flight: 0 ahead / 0 behind.
- No commit, push, merge, branch, or worktree operation was performed.
- Protected unrelated directory: `docs/research/maze-player-language/corpus/`, including `vm578.zip`, remains unmodified and unstaged.

## Files Reviewed

- `AGENTS.md`
- repo-local RobDev/RobQA skills and their guides
- `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, `docs/reference/workflow.md`, and `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-590, VM-591, and VM-592 cards and closeout/relevant handoffs
- `docs/reports/2026-08-27-implicit-maze-loom-red-team.md`
- `docs/contracts/maze-semantic-state-contract.md`
- `data/maze/maze-semantic-state-v1.schema.json`
- `docs/architecture/data-flow-map.md`, `docs/architecture/scryfall-data-pipeline.md`, `docs/reference/source-generated-guardrails.md`, and `docs/reference/data-contracts.md`
- current Loom builder/init owners; Boros and Lorehold raw source packets; Scryfall manifests/indexes; relevant player-language research location
- official Wizards sources listed in the new source ledger

## Files Changed

- `docs/kanban/in-progress/VM-593-loom-identity-lens-v0-research.md`
- `docs/kanban/board.md`
- `docs/research/loom-identity-lens-v0/README.md`
- `docs/research/loom-identity-lens-v0/source-ledger.md`
- `docs/research/loom-identity-lens-v0/{proving-set,five-pair-proving-corpus,identity-signal-matrix,internal-authority-map,ecosystem-evidence-map,pair-contracts}.json`
- `docs/research/loom-identity-lens-v0/recommendation-evidence-contract.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Registered VM-593 as a research work item and completed the owner-accepted five-pair package.
- Added the source ledger, the preserved W/R seed, a 120-card fixed-snapshot corpus, 60 structured development/holdout pairwise assertions, an all-ten-identity signal matrix, pair contracts, and an evidence contract.
- Recorded a conservative recommendation: query-neutral, function-first, explicit user-selected identity expression may only order relevance-equivalent candidates using recorded card-fact contributions and qualitative explanations. Its accepted disposition is GO WITH CONDITIONS.
- Mapped the future concept to VM-591’s existing `lenses` and `recommendation_handoff` seams without editing the frozen contract.
- Parked the proposed adapter-only next story and stopped before implementation.

## Why It Changed

VM-592 explicitly left the next clean branch for Loom Identity Lens scope establishment. The owner’s requested proof must separate Commander legality, identity/worldview evidence, exact card facts, behavioral evidence, and player-facing inference before a ranker or selector exists.

## Decisions Made

- **Disposition: GO WITH CONDITIONS.** Same-pool ordering is credible only when it preserves functional relevance and includes source/card-fact explanations.
- Colors remain eligibility (`id<=wr f:commander`); named expression remains query-neutral.
- Boros supports bounded team-action/protection cues, not generic aggression; Lorehold supports bounded recovery/history-role cues, not generic graveyard/artifact/Spirit matching.
- Direct affiliation is small and separately disclosed; it cannot override a functional mismatch.
- Worldview and flavor texture are explanation/context evidence, not deterministic rank fuel.
- Use qualitative levels, preserve overlap, and allow insufficient evidence. Do not show percentage fit.
- Explicit selection is required. Dossier/Placement context stays unapplied unless an owner later authorizes a confirmed opt-in flow.

## RobDev Compact Transfer

- **Product/repository outcome:** an owner-accepted evidence contract and reproducible five-pair proof set, not a feature.
- **Owning authorities:** current VM-592 Commander-first decision; VM-591 frozen semantic distinction; Scryfall snapshot for card facts; official Wizards sources for canon/design; raw faction packets only within their stated evidence limits.
- **Current behavior:** W/R visual-builder state produces `id<=wr f:commander`; Loom has no identity-expression selection or ranking.
- **Changed behavior:** documentation/JSON research and Kanban/handoff records only.
- **Protected behavior:** Loom/Maze runtime, query ownership, parser, VM-591 schema, raw faction data, generated artifacts, Placement, recommendation runtime, player-language corpus, branches/worktrees, and all production UI.
- **Existing machinery reused:** current Scryfall bulk/manifest, builder query owner, VM-591 representation boundary, raw source packet metadata, and existing research/ledger convention.
- **Consumers inspected:** Loom builder, Maze semantic contract, Scryfall data pipeline, faction raw/generated distinction, existing player-language repository shape.
- **Non-goals / stop condition:** close research after owner acceptance; no ranker, selector, runtime adapter, query mutation, source-authority promotion, production data, or next implementation card.

## Risks / Uncertainties

- The corpus establishes architectural falsifiability, not calibrated player benefit or preference magnitude.
- Existing faction raw records have different remediation/staleness histories; any production profile needs a separately governed source/claim mapping rather than copying dossier prose.
- 2026 Lorehold reinforcement is current evidence but cannot eternalize Flashback or “leaving graveyard” as a universal identity rule.
- Population/Commander behavior is intentionally absent from this v0 proof. A later calibration study must capture a bounded snapshot and distinguish commander-specific effects before it may tune affinity.
- A future feature could become misleading if it presents direct affiliation, flavor, or a heuristic as objective card identity.

## Tests Run

- Fixed-corpus validator — PASS: JSON parses; 120 cards resolve by Oracle ID in the captured local bulk data; every card is Commander legal within its pair; 80/40 development/holdout split; 60 assertions (12 per pair); eight function families; nine colorless examples; and identical None/guild/college membership claims.
- `node -e` current Loom query witness — PASS: W/R + Commander builds `id<=wr f:commander`.
- `git diff --check` — PASS; only expected LF-to-CRLF warnings on existing Windows checkout behavior.
- Source ledger review — PASS: nine earlier official Wizards pages remain pre-correction provenance only; post-correction external escalations are zero.
- Runtime/UI suites — intentionally not run: QA-0 documentation/research/JSON only; no runtime or visual owner changed.

## RobQA Readiness

- **QA tier:** QA-0.
- **Changed behavior:** research documentation, one static JSON proving set, Kanban, and handoff indexes.
- **Protected behavior intentionally untouched:** all runtime query, selector, ranker, card result, semantic-contract, faction-source, generated-data, and UI behavior.
- **Selected validation:** JSON/card snapshot integrity, live current-query witness from existing builder, source-ledger/path review, whitespace diff check, and changed-file inspection.
- **CPU-heavy validation:** NOT REQUIRED. Full engine, journey, mutation, placement, and browser suites cannot protect a documentation-only package and would not test its research claims better than the fixed fact checks.
- **Rendered self-QA:** not applicable; no public visual surface changed.
- **Owner acceptance:** recorded. The package does not authorize an implementation-proof card; the adapter remains parked.

## Not Touched

- `docs/research/maze-player-language/corpus/vm578.zip` and its directory
- `assets/js/maze/`, Maze HTML/CSS, tests, parser, Operator, query core, VM-591 schema/fixtures
- raw Boros/Lorehold packets and all generated faction/runtime artifacts
- Placement, dossier/Archscry behavior, Commander Compass source data, Scryfall raw data/index regeneration
- actual product ranking, ML/LLM use, identity selector UI, query syntax/mutation, persistence, hydration, or recommendation API

## Follow-Up Recommendations

1. Return to Archscry Redesign Phase 3 — Experienced / Returning Player Path deep-dive.
2. Preserve this package for a separately authorized future adapter decision.

## Next Suggested Agent

Planning Architect, only when the owner opens Archscry Phase 3.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-593-loom-identity-lens-v0-research.md`
- `docs/research/loom-identity-lens-v0/`
- `docs/contracts/maze-semantic-state-contract.md`
- `docs/kanban/done/VM-590-implicit-maze-loom-red-team.md`
- `docs/kanban/done/VM-591-freeze-plain-reading-shared-semantic-state-contract.md`
- `docs/kanban/done/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
