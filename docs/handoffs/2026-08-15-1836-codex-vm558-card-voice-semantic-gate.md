# VM-558 Complementary Card-Voice Semantic Gate

Agent: Codex

Task requested: Implement the approved VM-558 proposal-stage plan under Goal Mode, record the owner's semantic decisions, resolve the requested bounded revisions, preserve all accepted slot-1 authority and Colorless's one-voice contract, keep placement untouched, and stop before promoting any slot-2 record.

Related work: `VM-558`, `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, the accepted VM-551 card-content authority, and `docs/reports/VM-558-card-voice-semantic-owner-review.md`.

## Files reviewed

- Current `main`/origin state, registered worktrees and relevant branches.
- Governing handoff index, recent VM-551/VM-556/VM-557 handoffs, Kanban board/card history, and the owner-supplied historical prompt.
- Active card-voice relationship, exact-printing, generated catalog, schemas, producer, runtime selector/renderer/modal, card-use planner, and VM-551 authority/integrity checks.
- Certified identity/faction authority, current CECOS-supported evidence in its allowed role, reviewed/adjudicated candidate history, committed Scryfall indexes/raw records, rationale catalog, precon catalog, dossier/Packet material, and non-overriding profile enrichment.

## Files changed

- Active source/generated chain: `data/dossier/card-voice-relationships.source.json`, its schema, `data/dossier/card-voice-printings.source.json`, its schema, `data/dossier/card-voice-catalog.json`, and its schema.
- Producer/validation: `research/apply-vm551-card-content-automatic-approval.mjs`, `research/build-vm558-card-voice-owner-review.mjs`, `scripts/vm551-card-content-authority-tests.mjs`, `scripts/vm551-dossier-content-integrity-tests.mjs`, and `package.json`.
- Shared product surface: `assets/js/index.js`.
- Owner/documentation surfaces: `docs/reports/VM-558-card-voice-semantic-owner-review.md`, the VM-558 Kanban card, board, `docs/reference/data-contracts.md`, `docs/reference/source-generated-guardrails.md`, the approved-record locator refresh in the generated VM-551 owner-review audit, this handoff, and `HANDOFF_INDEX.md`.

No historical rejected/superseded adjudication record was backfilled or rewritten. The historical exact-printing helper was not changed.

## What changed

- Preserved the 37 accepted VM-551 relationships as slot `1` / `ANCHOR` and added relationship-keyed printing locators required by a multi-slot identity chain.
- Added 36 slot `2` / `COMPLEMENT` records as `REVIEW_REQUIRED`, `public_eligible: false`, with exact-printing facts, certified claim/source chains, teaching facets, pair rationales, proposed modal explanations, boundaries, and overlap findings. Colorless has no proposal.
- Kept the approved printing source and runtime catalog at exactly 37 slot-1 records. The producer preserves review-required source rows but filters them from runtime.
- Added a deterministic builder/checker that validates the full proposal/public split and generates one owner-readable semantic matrix.
- Made runtime display order slot-first, changed the introduction to work for one or two voices, and replaced silent disappearance caused by missing/malformed approved voice authority with an intentional unavailable state.
- Recorded `APPROVE` on 34 proposals while leaving every slot-2 row non-public and outside approved printings/runtime.
- The owner approved Golden Ratio for Quandrix and Child of Alara for WUBRG. Dune-Brood Nephilim and Inexorable Tide were superseded by Scour from Existence and Amphin Cutthroat after stricter exact-flavor and neighbor-confusion review.
- Preserved superseded/revised decisions in inline proposal history and reduced the generated owner artifact to the two pending rows: Dune and Witch.

## Why it changed

The owner goal requires a complementary second teaching voice for every normal identity while retaining accepted VM-551 first voices and public curation. The active chain therefore needed explicit pair/slot metadata and a proposal state that could be machine-validated without entering approved printings or runtime.

## RobDevPass compact implementation packet

- Product outcome: prepare excellent complementary slot-2 decisions for owner judgment; do not promote them.
- Owning authority: `card-voice-relationships.source.json`; approved exact-printing authority remains `card-voice-printings.source.json`.
- Producer/runtime chain: active relationship source -> VM-551 approval producer -> approved exact-printing source plus generated public catalog -> Archscry selector/renderer/shared modal.
- Existing machinery reused: VM-551 evidence validator and generator, reviewed candidate history, committed card/evidence records, current schemas/catalogs, card cache/modal, overlap data, and focused tests.
- Changed behavior: slot/pair metadata, proposal preservation/public filtering, slot-first ordering, plural-safe introduction, explicit unavailable state, owner matrix.
- Protected behavior: all slot-1 semantics and exact printings, Colorless cardinality, Sound/Play separation, placement/scoring/qualification/identity semantics, shared modal meaning, and unrelated card surfaces.
- Consumers/blast radius: the six active source/schema/generated artifacts, one producer, Archscry card-voice selection/presentation, focused authority/integrity validation, and documentation.
- Failure/recovery: unresolved or rejected proposals remain non-public; invalid approved catalog resolution produces a visible bounded fallback while the identity reading remains usable.
- Smallest complete implementation: the changes above; no parallel audit/research framework was created.
- Non-goals/stop conditions: no placement or scoring changes, no first-slot replacement, no Colorless slot 2, no global rerank/bulk regeneration, no historic-rejection backfill, no promotion before owner approval. No scope-drift stop condition was triggered.

## Decisions made

- Existing local evidence was sufficient to prepare all 36 normal-identity proposals; no broad external research was needed.
- Sound/Play duplication remains a hard semantic collision; current proposal collisions are zero.
- Other-surface reuse is informational, not automatically disqualifying. Four proposals carry non-blocking findings: Judith (Card Signal), Ayara (Card Signal), Nekusar (Precon and Card Signal), and Atarka (Precon).
- Proposal exact printings remain inline until approval; the approved printing source is not pre-populated with unapproved records.
- Golden Ratio is the narrower Quandrix answer because it explicitly voices mathematical pattern discovered in nature while preserving nature's capacity to defy the model.
- Scour from Existence is the narrower Dune answer because its exact line—not the modal—joins people, land, existential cost, and immediate common-front resistance while explicitly rejecting glory as the purpose of battle.
- Amphin Cutthroat is the narrower Witch answer because its exact line—not the modal—joins long concealment, organized society, deliberate building, patient expansion, and eventual ambition without using artifice, perfection, experimentation, or optimization as the center.
- Child of Alara remains supportable from WUBRG claims `0002`, `0003`, and `0007`; the revised row no longer depends on the certified naming-preference claim that conflicts with the owner's proposal-local public-label direction.

## Risks / uncertainties

- Thirty-four proposal semantics now have recorded owner approval but remain held pending a complete packet authorization. Structural checks still do not substitute for owner judgment on the two revised rows.
- The owner may revise or reject Dune or Witch, producing explicit unresolved slots; quality remains more important than two-card completeness.
- Two-card public layout is not yet active because promotion was deliberately prohibited. It must receive proportionate rendered QA in the later approved-promotion pass.

## Tests run

- `node --check assets/js/index.js` — PASS.
- `npm.cmd run test:vm558-card-voice-owner-review` — PASS: 37 anchors, 36 proposals, 37 runtime records, zero Sound/Play collisions.
- `npm.cmd run test:vm551-card-content-authority` — PASS: generator freshness, 37 approved slot 1, 36 review-required slot 2, 37 runtime.
- `npm.cmd run test:vm551-dossier-integrity` — PASS.
- `npm.cmd run validate:source-generated` — PASS for its default JESKAI/MARDU targets with the two pre-existing model-owned inhibitor warnings.
- `npm.cmd run lint:js` — PASS.
- `npm.cmd run test:frontend-smoke` — PASS.
- `git diff --check` — PASS.
- Rendered browser QA — PASS: shared Esper voice at desktop and 390px, zero document/section overflow; real missing-catalog unavailable state at 320px, visible status message, zero overflow. The temporary local catalog move was restored immediately and left no test artifact.

Four-row revision rerun:

- `npm.cmd run test:vm558-card-voice-owner-review` — PASS with 32 recorded approvals, four pending rows, 37 runtime records, and zero Sound/Play collisions.
- `npm.cmd run test:vm551-card-content-authority` — PASS after refreshing generated source parity through the existing producer; 37 approved slot-1 records, 36 non-public slot-2 records, and 37 runtime records.
- `npm.cmd run test:vm551-dossier-integrity` and `git diff --check` — PASS.
- Rendered QA was not repeated for this semantic revision because no approved printing, runtime record, or UI behavior changed.

Two-row second-revision rerun:

- `npm.cmd run build:vm558-card-voice-owner-review` — PASS with 34 recorded approvals, two pending rows, 37 runtime records, and zero Sound/Play collisions.
- Exact local card review confirmed the selected BFZ Scour from Existence and M12 Amphin Cutthroat printings, complete flavor text, type lines, Scryfall locators, and image locators.
- `npm.cmd run test:vm551-card-content-authority` — PASS after refreshing the generated source digest through the existing producer; 37 approved slot-1 records, 36 non-public slot-2 records, and 37 runtime records.
- `npm.cmd run test:vm551-dossier-integrity`, an explicit 37-printing/37-runtime/no-slot-2-leak assertion, and `git diff --check` — PASS.
- Rendered QA was not repeated because approved printings, runtime records, and UI behavior remain unchanged.

Not run: placement-engine certification, 5,000 journeys, synthetic runs, mutation, recovery, exhaustive all-identity/all-viewport replay, or visual-baseline suites. RobQAPass classified them outside the changed risk.

## Owner-QA readiness

- Readiness level: semantic owner gate only; not promotion, release, or deployment ready.
- Deterministic facts removed from owner burden: identity/card/printing/flavor parity, pair metadata, type exceptions, provenance presence, catalog completeness, Sound/Play isolation, proposal/public isolation, and reported other-surface overlaps.
- Owner review artifact: `docs/reports/VM-558-card-voice-semantic-owner-review.md`.
- Bounded owner burden: two semantic decisions only: Dune and Witch. All 34 approvals are recorded and held.
- Promotion remains prohibited until those decisions are recorded and a separate pass is authorized.

## Not touched

- Placement model, engine, scoring, qualification, questionnaire, identity semantics, CECOS authority, raw faction claims/sources, precon selection, Card Signal selection, shared card-detail meaning, deployment, and production.
- Accepted slot-1 semantic choices and Colorless's one-voice behavior.

## Follow-up recommendations

1. Owner reviews only the two-row revision matrix and records decisions for Dune and Witch.
2. A later authorized promotion pass adds exact-printing rows and runtime records only for approved proposals, leaves rejected/unresolved slots absent, regenerates the catalog, and performs two-card rendered QA at representative widths plus genuine 320px stress cases.
3. Do not reopen VM-551 slot-1 decisions unless a separate current defect is demonstrated.

Next suggested agent: Codex or a planning/implementation agent after the owner records semantic decisions.
