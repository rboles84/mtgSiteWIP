# VM-551 Packet 1 Voice Relationship Hardening

## Agent name

Codex

## Task requested

Harden all 111 Packet 1 card-voice candidates so no row reaches owner review without an explicit certified-identity relationship bridge. Preserve all 25 rationale proposals unchanged, keep runtime unchanged, commit the hardening separately, and stop for owner decisions.

## Files reviewed

- `data/dossier/card-content-review-proposals.source.json`
- `data/dossier/card-rationale-candidate-adjudication.source.json`
- `data/scryfall/indexes/card-flavor-index.json`
- Certified identity claim ledgers referenced by each Packet 1 identity
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md`
- `docs/plans/vm551-gate-b1-product-fit/approval-packet-1-card-content.md`
- Relevant Packet 1 handoffs, Kanban record, and program plan

## Files changed

- `data/dossier/card-content-review-proposals.source.json`
- `data/dossier/vm551-card-content-review-proposals.source.schema.json`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-card-content.tsv`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-voice-adjudication.tsv`
- `docs/plans/vm551-gate-b1-product-fit/approval-packet-1-card-content.md`
- `docs/plans/vm551-gate-b1-product-fit/all-37-dossier-closeout-program.md`
- `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- `research/build-vm551-card-content-approval-packet.mjs`
- `scripts/vm551-card-content-packet-tests.mjs`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What changed

- Adjudicated all 111 original exact-excerpt voice candidates against certified identity claims.
- Added seven exact-card-text replacement candidates where the original heuristic set lacked a defensible relationship bridge.
- Retained 37 source-complete `REVIEW_REQUIRED` proposals, exactly one per identity.
- Terminally rejected 81 weak candidates while preserving them in a dedicated audit artifact.
- Added relationship class, exact certified claim IDs and statements, relationship explanation, explicit bridge, false-positive analysis, adjacent-identity risk, and agent recommendation fields.
- Removed every `GENERIC_THEMATIC_ANALOGY` row from the owner decision workload.
- Regenerated the owner view in the required review table shape.
- Preserved the 25 rationale proposal objects byte-semantically unchanged; their canonical SHA-256 remains `7a7ecf15598289406a2e47e911b8afca62f2469551d174f96063ac603535b967`.

## Why it changed

Exact flavor text alone establishes only the excerpt. The previous packet still asked the owner to intuit the missing relationship to certified identity meaning. This hardening makes that relationship explicit and auditable before owner review.

## Decisions made

- Owner review receives quality-filtered, source-complete proposals rather than three heuristic candidates per identity.
- Three candidates per identity is not a product or review requirement.
- `GENERIC_THEMATIC_ANALOGY` is insufficient for owner review or public promotion.
- Replacement research may use only exact committed card text with a complete certified-claim bridge.
- Yore's voice proposal remains dossier-content review only and cannot establish behavioral nameability.

## Risks / uncertainties

- All 37 selected relationships remain `REVIEW_REQUIRED`; none is public until the owner approves the exact proposal.
- Several selected records retain explicit adjacent-identity risk for owner judgment rather than hiding ambiguity.
- Rejected candidates remain useful audit history but are not presented as owner decision work.

## Tests run

- `node --check research\\build-vm551-card-content-approval-packet.mjs`
- `node --check scripts\\vm551-card-content-packet-tests.mjs`
- `node research\\build-vm551-card-content-approval-packet.mjs`
- `npm.cmd run test:vm551-card-content-packet`
- `npm.cmd run test:card-rationales`
- `npm.cmd run test:vm551-dossier-integrity`
- `git diff --check`
- Explicit changed-path and protected-runtime audits

All passed. Packet validation reports 111 original candidates, seven replacements, 37 owner-review proposals, 81 rejected rows, 37/37 identity coverage, 24 unchanged runtime-approved records, and zero review rows in runtime.

## Not touched

- The 25 Packet 1 rationale proposals
- Approved public card-rationale runtime catalog
- Archscry runtime, presentation, placement engine, questions, answers, mappings, scoring, routing, stopping, refinement, result states, persistence, Matrix, or Maze
- Packet 2 or Packet 3 proposal meaning or promotion state
- Production, deployment, merge, or remote branches

## Follow-up recommendations

Owner reviews the 37 source-complete voice rows and 25 unchanged rationale proposals in the generated owner view. Apply no public promotion until exact `APPROVE`, `REVISE`, or `REJECT` decisions are returned.

## Next suggested agent

Owner review; then Codex may apply Packet 1 decisions in a separately authorized scoped commit.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- `docs/plans/vm551-gate-b1-product-fit/all-37-dossier-closeout-program.md`
- `docs/plans/vm551-gate-b1-product-fit/approval-packet-1-card-content.md`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-voice-adjudication.tsv`
