# VM-558 Owner-Approved Card-Voice Promotion

Agent: Codex

Task requested: Record final owner approval for Dune / Scour from Existence and Witch / Amphin Cutthroat, complete the VM-558 semantic owner gate at 36/36, promote exactly those 36 complementary slot-2 records through the active curated relationship / exact-printing / runtime chain, preserve Colorless at one voice, and perform the proportionate RobQAPass validation without reopening semantics or placement.

Related work: `VM-558`, `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, and `docs/handoffs/2026-08-15-1836-codex-vm558-card-voice-semantic-gate.md`.

## Files reviewed

- Active branch/worktree state and the complete dirty VM-558 initiative.
- Card-voice relationship, printing, and runtime catalogs plus schemas.
- VM-551 card-content producer, authority checks, dossier integrity checks, runtime selector/cache/modal, and Archscry responsive CSS.
- VM-558 owner-review builder/report, card, board, data contracts, source/generated guardrails, and prior semantic-gate handoff.

## Files changed

- Curated/generated chain: `data/dossier/card-voice-relationships.source.json`, `card-voice-printings.source.json`, `card-voice-catalog.json`, and their schemas.
- Producer/validation: `research/apply-vm551-card-content-automatic-approval.mjs`, `research/build-vm558-card-voice-owner-review.mjs`, `scripts/vm551-card-content-authority-tests.mjs`, and `scripts/vm551-dossier-content-integrity-tests.mjs`.
- Product surface: `assets/js/index.js` and `assets/css/archscry.css`.
- Generated VM-551 audit views refreshed by the existing producer: `card-content-review-proposals.source.json`, rationale authority/catalog, Packet 1 TSV, and owner-review audit.
- Governance/docs: VM-558 completion report, Kanban card/board, data contracts, source/generated guardrails, this handoff, and `HANDOFF_INDEX.md`.

## What changed

- Recorded the two final owner approvals and promoted all 36 approved slot-2 complements to `APPROVED_PUBLIC` with `OWNER_SEMANTIC_APPROVAL`, `public_eligible: true`, retained structural validation, and a promotion validation receipt.
- Extended the existing producer idempotently: only slot-2 records with explicit owner `APPROVE` cross the boundary; unresolved rows remain non-public; already-public complements remain stable.
- Deterministically projected the approved complements into the exact-printing source and runtime catalog. Final cardinality is 73 relationships, 73 printings, and 73 runtime records.
- Preserved one slot-1 anchor for all 37 identities and one slot-2 complement for every normal identity except Colorless. Colorless remains one voice.
- Runtime slot-2 modal copy comes directly from the approved proposal explanation. Exact-printing cache projection now retains face-level DFC records.
- Rendered QA found that the more-specific two-card grid rule defeated the mobile one-column rule. The mobile rule now explicitly covers `data-item-count="2"` and removes card-content overflow at 390px and 320px.
- Replaced the pending semantic-review report with a completion record listing all 36 approved public pairs; it does not request semantic re-review.

## Why it changed

The owner completed the semantic gate and explicitly authorized one bounded promotion pass. The smallest complete implementation was therefore a state transition through the existing owning source/producer chain, exact-printing projection, generated runtime rebuild, and focused two-card presentation validation.

## RobDevPass compact implementation packet

- Product outcome: each of 36 normal identities has two ordered, complementary public voices; Colorless remains the intentional one-voice exception.
- Owning authority: `data/dossier/card-voice-relationships.source.json`; exact printing authority: `data/dossier/card-voice-printings.source.json`; generated consumer: `data/dossier/card-voice-catalog.json`.
- Producer/runtime chain: curated relationships -> VM-551 card-content producer -> approved printings + generated catalog -> Archscry local card cache -> slot-first selector -> shared dossier/modal.
- Existing machinery reused: current producer, committed Scryfall records, slot-aware schemas, selector/renderer, local card cache, shared modal, owner-review checker, and focused authority/integrity tests.
- Changed behavior: slot-2 publication state, exact-printing/runtime cardinality, two-card public rendering, and face-level DFC cache projection.
- Protected behavior: all slot-1 card/relationship fields, Colorless cardinality, 36 owner decisions and copy, Sound/Play separation, placement/scoring/qualification/identity authority, and unrelated card surfaces.
- Consumers/blast radius: the active six-file card-voice chain, one producer, focused validation, shared card-voice renderer/modal, and the two-card mobile layout rule.
- Failure/recovery: unresolved proposals remain excluded; malformed public authority still renders the intentional unavailable state; deterministic `--check` detects drift.
- Smallest complete implementation: promote only explicit approvals, project only approved exact printings, rebuild, validate all records, and repair the observed mobile two-card cascade.
- Non-goals/stop conditions: no semantic reconsideration, slot-1 replacement, Colorless slot 2, placement/scoring/qualification changes, global rerank, broad card research, historical adjudication backfill, exhaustive placement certification, or deployment. No scope-drift stop condition triggered.

## Decisions made

- `OWNER_SEMANTIC_APPROVAL` is distinct from VM-551 automatic approval and remains visible in source/runtime provenance.
- The active producer, not the historical printing helper, owns current multi-slot exact-printing projection.
- Proposal-local modal explanations are authoritative for promoted slot 2; no new semantic copy is synthesized.
- A local card image is valid when supplied directly or on a DFC face. All 73 public voices resolve one through committed local data.
- The rendered 390px overflow was a real two-card presentation defect and was fixed within the authorized blast radius.

## Risks / uncertainties

- No semantic decision remains unresolved. Future edits must not reinterpret these 36 approvals without a new owner gate.
- External Scryfall network availability can still affect non-local, dynamically fetched page art outside the card-voice chain; this pass proves deterministic local image resolution for all 73 public card voices.
- The branch remains uncommitted/unpushed pending normal owner review or integration direction.

## Tests run

- `npm.cmd run test:vm558-card-voice-owner-review` — PASS: 37 anchors, 36 owner-approved complements, 0 review-required, 73 printings, 73 runtime records, 0 Sound/Play collisions, and local image resolution for every public voice.
- `npm.cmd run test:vm551-card-content-authority` — PASS including deterministic producer freshness and 73/73 public parity.
- `npm.cmd run test:vm551-dossier-integrity` — PASS after adding the mobile two-card cascade invariant.
- `npm.cmd run validate:source-generated` — PASS for its scoped JESKAI/MARDU targets with the two pre-existing model-owned warnings.
- `npm.cmd run lint:js`, `npm.cmd run lint:html`, `npm.cmd run test:frontend-smoke`, and `node --check assets/js/index.js` — PASS.
- Protected slot-1 comparison against `main` — PASS: 37/37 records and zero drift across relationship ID, identity, card IDs/names, exact excerpt, printing identity, relationship class, claims, bridge, and boundary fields.
- `git diff --check` — PASS (line-ending warnings only).
- Rendered browser QA — PASS after one narrow repair: desktop WU and Dune pairs; 390px WUBRG, Witherbloom, and Colorless; 320px Witch longest pair/modal. All expected cards and images rendered, Colorless stayed at one, slot-2 modals used approved copy, and final document/section/card/modal horizontal-overflow checks were false. Browser console errors: zero.

Not run: placement certification, 5,000 journeys, synthetic runs, mutation, recovery, exhaustive all-identity/all-viewport replay, or visual-baseline suites. RobQAPass classified them outside the changed risk.

## Owner-QA readiness

- QA tier: QA-2 shared data/component promotion; QA-1 semantic judgment already completed at 36/36.
- Deterministic facts removed from owner burden: public cardinality, slot order, exact printing/flavor/card IDs, provenance, pair linkage, Sound/Play isolation, source/generated parity, local image coverage, Colorless cardinality, modal copy parity, and responsive overflow.
- Remaining owner burden: none for VM-558 semantics. Optional normal branch review may sample the finished product; it is not another semantic gate.

## Not touched

- Placement model/engine, scoring, qualification, questionnaire, identity/metaphysical authority, CECOS, candidate research, precon/Card Signal choices, historical rejected/superseded adjudication rows, deployment, or production.

## Follow-up recommendations

1. Review/integrate the existing `codex/vm558-card-voice-pairs` branch as one VM-558 unit.
2. Keep future card-voice changes on the same explicit owner-approval boundary and preserve Colorless's one-voice exception unless separately authorized.

Next suggested agent: Codex for normal branch integration or owner-requested release work.
