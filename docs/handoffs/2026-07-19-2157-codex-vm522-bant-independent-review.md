# VM-522 Bant Independent Exact-SHA Review

Agent name: Codex independent reviewer
Task requested: Fresh CRIT-001 Contract v1.1 exact-SHA review of Bant / BANT candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`, with a separate governance-only review record.
Files reviewed: root `AGENTS.md`; CRIT-001 operating playbook; drift-control template/register; semantic-readiness contract; VM-522 preflight, stage-ownership, Gate 1+2, Gate 3+4, and workflow handoffs; VM-522 card and board; Bant raw claims/profile/placement/sources; generated `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`; recruiter context; Bant fixtures; candidate-scope validator/tests; prior review precedents.
Files changed: this handoff; VM-522 Kanban card moved to `docs/kanban/blocked/`; `docs/kanban/board.md`; `docs/handoffs/HANDOFF_INDEX.md`.

## Object Separation

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Ticket: VM-522
- Identity: Bant / WUG
- Internal key: BANT
- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Exact semantic candidate reviewed: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Candidate workflow-record commit: `224d05d9aad242406e076b0e1f5b6d9b288a5977`
- Independent review branch: `codex/vm-522-bant-independent-review`
- Independent review worktree: `C:\dev\mtgSiteWIP-crit001-vm522-independent-review`
- Review starting HEAD: `224d05d9aad242406e076b0e1f5b6d9b288a5977`
- Independent review-record commit: `PENDING_VM522_INDEPENDENT_REVIEW_RECORD_COMMIT_SHA`
- Certification: not authorized and not performed.
- Program base advancement: not authorized and not performed.

## Independence And Preflight

The review ran in a separate review worktree created from the workflow-record SHA. Prior VM-522 implementation, Gate 1+2, Gate 3+4, Gate 5, workflow, and validation summaries were treated as claims requiring independent verification.

Preflight passed: required objects exist; base is ancestor of candidate; candidate is ancestor of workflow/review starting HEAD; candidate-to-workflow diff is governance-only. Candidate branch worktree `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview` was inspected read-only and left clean. Original main `C:\dev\mtgSiteWIP` was inspected read-only; the known docs/workflow dirty baseline allowance applied, and no raw/generated/data/runtime/semantic/test/schema/validator/builder/scoring changes were observed. DRIFT-017 prototype was inspected only from outside and not altered. The long-running Table Talk baseline was preserved and not migrated into this worktree.

## Candidate Diff Inventory

Commit list from base to candidate: `6273268`, `ffba9fd`, `16a3a33`, `d135a7b`, `765f0a9`, `799627e`, `b466cdd`.

Changed files in `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e..b466cddb4618b1e2d7c897c15f7513a6d2db08b0`: `data/raw-factions/bant/bant.claims.json`, `data/raw-factions/bant/bant.profile.json`, `data/raw-factions/bant/bant.placement.json`, `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, `supabase/functions/guild-recruiter/faction-context.ts`, `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`, four VM-522 governance handoffs, handoff index, board, and the VM-522 card move from backlog to ready.

Path classification: Bant raw/generated/provenance/fixture/recruiter paths are expected candidate semantic/generated surfaces. Governance paths are process history in the base-to-candidate range, not semantic evidence. No shared validator, schema, package, CI, Hall, Crucible, scoring, scheduler, calibration, historical/debug/archive, or non-Bant raw packet changed. Candidate-to-workflow diff added only two VM-522 workflow handoffs and updated handoff index, board, and VM-522 card.

## Source Authority And Claims

Source-role reconstruction found 21 Bant source records: 3 claim-bearing, 7 shaping-only, 10 support-only, and 1 discovery-only. Substantive proof chains do not use support/discovery claim IDs as authoritative generated proof.

Final claim counts independently verified: 21 total; 16 `substantive_claim`; 5 `support_record`; 0 `discovery_record`; 0 unclassified. Substantive IDs: `bant_claim_0001`, `0002`, `0003`, `0004`, `0005`, `0006`, `0007`, `0008`, `0009`, `0010`, `0011`, `0013`, `0014`, `0015`, `0016`, `0019`. Support IDs: `bant_claim_0012`, `0017`, `0018`, `0020`, `0021`. Evidence-scope field presence passed for every substantive claim.

Approval-blocking source/evidence finding: 22 load-bearing substantive evidence locator paths do not exist in the candidate tree. Affected locators include `docs/research/bant/peace-love-understanding-archive.md`, `docs/research/bant/bant-identity.md`, `docs/research/bant/bant-metaphysics.md`, `docs/research/bant/source-extracts/*`, `docs/research/bant/A_Man_of_Parts_archive.md`, `docs/research/bant/source-material/lore-reference.docx`, and `docs/research/canon-inventory-three-color-audit.md`. Exact claim-file lines include `data/raw-factions/bant/bant.claims.json:28`, `:63`, `:71`, `:105`, `:140`, `:148`, `:217`, `:225`, `:328`, `:370`, `:474`, `:510`, `:518`, `:526`, `:587`, `:595`, `:603`, `:671`, `:679`, `:695`, and `:703`. This blocks independent reconstruction of load-bearing claim evidence.

Additional source-path observation: `data/raw-factions/bant/bant.sources.json:158`, `:206`, and `:218` use `Referenced by ...` pseudo-path values; one is claim-bearing. Remediation should make claim-bearing source artifacts directly reproducible.

Claim-by-claim result totals: all 21 claims have acceptable role assignment; all 16 substantive claims have evidence-scope fields; all 5 support records remain auxiliary; 11 substantive claims are approval-blocked by at least one missing evidence locator, affecting `bant_claim_0001`, `0002`, `0003`, `0004`, `0006`, `0009`, `0010`, `0013`, `0014`, `0016`, and `0019`.

## Derived Bant Model

The independently derived model is coherent where evidence can be inspected: Bant is a White-centered WUG/GWU Alara shard identity where excellence is honorable only when publicly answerable to a living community. White contributes public order and trust; Blue contributes refinement, planning, and shaped potential; Green contributes living community and belonging. All three colors are necessary because two-color subsets lose either public order, refinement, or communal-living grounding.

Operational definition: classify Bant when public honor, supported-champion/excellence, refined discipline, sigil/order structure, and living community appear as a cluster. Falsify Bant when the prompt is only generic WUG good-stuff, generic harmony/balance, peace/order/protection alone, creature/angel/knight/exalted aesthetics alone, Azorius procedure, Selesnya belonging, Simic improvement, Naya creature force, Esper control, Temur instinct, Abzan hierarchy, Jeskai discipline, Grixis extraction, Jund predation, Sultai exploitation, WUBRG breadth, or generic overfit.

Semantic review result: PASS for model coherence, generic-language rejection, mechanical/aesthetic-substitution rejection, and required-neighbor boundary quality, but source-locator and provenance defects block exact-SHA approval.

## Neighbor, Preview, And Consumers

Required-neighbor review passed for semantic quality. Boundaries are testable for Selesnya/WG, Simic/UG, Azorius/WU, Green/G, White/W, Blue/U, Naya, Esper, Temur, Abzan, Jeskai, Grixis, Jund, Sultai, Five-color/WUBRG, generic good-stuff, generic balance, and generic overfit. Fixture coverage contains one ambiguity case and 17 neighbor/generic exclusions.

Preview owner: `data/identity-layers.json#/expressions/BANT/preview_text`. Embedded consumer: `data/factions.json#/identity_layers/expressions/BANT/preview_text`. Exact text on both surfaces: `Bant treats excellence as honorable when it remains answerable to the whole. Its order is not merely procedure; it is public trust, refined discipline, and a living community choosing which champion can carry its hope.` Source/embedded equality passed; semantic alignment passed; DRIFT-015, DRIFT-016, DRIFT-017, and DRIFT-019 active-consumer checks passed.

Active surfaces reviewed: Home through `index.html -> assets/js/home.js -> data/factions.json`; Archscry through `archscry/index.html -> assets/js/index.js -> data/placement-model.json`; recruiter through `supabase/functions/guild-recruiter/index.ts -> FACTION_CONTEXT`; validator/test/CI paths. Historical JS and debug NDJSON artifacts retained their DRIFT-019 exclusions.

## Provenance And Fixtures

BANT provenance scan: 87 entries, 0 null content hashes, 0 non-substantive authoritative claim references, 0 duplicate canonical keys, but 28 `canonical_id: null` rows. Approval-blocking examples include `data/semantic-readiness-provenance.json#/entries/89` for `/moral_and_psychological_profile`, `#/entries/109` for `/core_identity`, `#/entries/121` for `/site_surface`, `#/entries/122` for `/structure`, and `#/entries/123` through `#/entries/140` for `/views_on_other_factions/*`. These are required/generated-consumed rows and fail the prompt's non-null canonical-ID requirement.

Fixture file `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` exists and contains 21 fixtures: 1 core inclusion, 1 mature/pressure behavior, 1 nearest-collision ambiguity, 17 required-neighbor exclusions, and 1 provenance fixture. Fixture structure and quality passed, subject to the source-locator blocker inherited from affected claims.

Exact chain parity passed for `data/raw-factions/bant/bant.profile.json#/core_identity`: raw profile, generated provenance, and fixture each list 7 unique IDs in the same order: `bant_claim_0001`, `bant_claim_0002`, `bant_claim_0003`, `bant_claim_0004`, `bant_claim_0006`, `bant_claim_0015`, `bant_claim_0019`. Raw `/site_surface` has 11 unique IDs; raw `/moral_and_psychological_profile` has 6 unique IDs.

## Collision And Frozen-Field Review

Raw collision count is 17. Raw Naya/Jund appear twice because older draft IDs are retained as dormant native-ID records while active generated rows use the Gate 3 IDs. Generated collision order is exactly `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `NAYA`, `JUND`, `ABZAN`, `TEMUR`, `SULTAI`, `JESKAI`, `W`, `U`, `G`, `WUBRG`. Generated lateral targets are `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `ABZAN`, `TEMUR`, `SULTAI`. Collision and ordering review passed.

Frozen-field/non-Bant integrity passed by exact candidate-scope validation and manual path review. No unauthorized non-Bant semantic drift or shared infrastructure change was found.

## Validation Results

- `git status --short --branch`: exit 0; clean before governance edits.
- `git merge-base --is-ancestor b466cddb4618b1e2d7c897c15f7513a6d2db08b0 HEAD`: exit 0.
- JSON parse check for Bant raw/generated/provenance/fixture JSON files: exit 0.
- Explicit claim-role/evidence-scope check: exit 0 script; 21/16/5/0/0 counts, no missing substantive evidence scopes.
- Explicit evidence-locator existence check: exit 0 script with review-control FAIL; 22 missing local locator files.
- Explicit BANT provenance scan: exit 0 script with review-control FAIL; 28 null canonical IDs.
- Exact fixture/provenance chain comparison: exit 0; `/core_identity` exact ordered equality true.
- Preview equality and consumed-surface scan: exit 0; active preview equal and stale/generic phrases only in negative guardrails.
- `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=b466cddb4618b1e2d7c897c15f7513a6d2db08b0`: exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=b466cddb4618b1e2d7c897c15f7513a6d2db08b0`: exit 1 as expected, `Error: Unknown identity WUG`.
- `node research\semantic-candidate-scope-tests.js`: exit 0.
- `node research\audit-semantic-readiness.mjs --targets=BANT`: exit 0.
- `node research\validate-semantic-readiness.mjs --targets=BANT`: exit 0.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=BANT`: exit 0.
- `npm.cmd run build:factions`: sandbox attempt exit 1 with EPERM writing generated files; rerun with escalation exit 0. Second escalated run also exit 0. Both runs created line-ending-only working-tree modifications; they were compared and restored.
- `node research\build-semantic-readiness-provenance.mjs --check`: exit 1 because the script exact-compares LF output against CRLF working-tree content. Normalized comparison passed (`normalized_equal true`, 1890 entries). Classified as environmental line-ending limitation, not the semantic rejection basis.
- `npm.cmd run test:semantic-readiness`: exit 1 only at the same provenance exact line-ending check; semantic readiness contract tests, candidate-scope tests, and fixture validation passed first.
- `npm.cmd run test:parser`: exit 0; 226 parser cases passed.
- `npm.cmd run test:placement`: exit 0; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: exit 0.
- `npm.cmd run test:source-generated`: exit 0 with known unrelated JESKAI/MARDU model-owned inhibitor warnings; candidate diff changed no Jeskai or Mardu files.
- `npm.cmd test`: first run exit 1 under sandbox due EPERM writing Gate bias audit JSON; escalated rerun progressed through many suites and then failed with `ERR_MODULE_NOT_FOUND: Cannot find package 'xlsx'` from `research\import-precon-mechanics-validation.mjs`. `node_modules` is absent in the isolated worktree. Classified as environmental dependency limitation, not the semantic rejection basis.
- `git diff --check`: exit 0.

## Review Matrix Totals

- Total controls: 20
- PASS: 16
- FAIL: 2
- UNKNOWN: 1
- N/A: 1
- CRITICAL: 0
- MAJOR: 2
- MINOR: 2
- INFORMATIONAL: 16
- Approval-blocking findings: 2

Approval-blocking findings:

1. MAJOR - Missing bounded evidence locator files in `data/raw-factions/bant/bant.claims.json`. Expected: every load-bearing substantive evidence locator resolves to a candidate-tree artifact and bounded section. Actual: 22 local locator files are missing. Required remediation: correct locators/source records or add governed source extracts without broadening evidence.
2. MAJOR - Null required canonical IDs in `data/semantic-readiness-provenance.json`. Expected: required/generated-consumed BANT provenance rows have non-null canonical IDs and hashes. Actual: 28 BANT rows have `canonical_id: null`. Required remediation: populate canonical IDs using established certified-identity conventions while preserving hashes, pointers, and substantive-only proof chains.

No other blocker/high/medium/low semantic findings were identified. The broader Bant semantic thesis, generic-overfit controls, fixtures, collision guidance, preview, active consumers, and non-Bant integrity were not the rejection basis.

## Governance State

What changed: recorded exact independent review rejection, moved VM-522 to blocked governance state, and recorded required bounded remediation.
Why it changed: the exact candidate fails source/evidence locator reproducibility and required provenance canonical-ID controls.
Decision made: `REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
Risks / uncertainties: full `npm.cmd test` could not complete from this isolated tree because `xlsx` is missing; provenance `--check` exact comparison is line-ending sensitive. Neither environmental limitation is the basis for rejection.
Tests run: listed above.
Not touched: candidate semantic files; generated data; raw Bant files; fixtures; provenance; recruiter/runtime; validators; schemas; package/CI; original main; candidate branch worktree; DRIFT-017 prototype; Table Talk baseline; VM-542/DRIFT-019 residuals; Excel; VM-523.
Follow-up recommendations: remediate only the two blockers, preserve rejected candidate history, create a later replacement candidate SHA, then request a fresh independent exact-SHA review.
Next suggested agent: VM-522 remediation agent.

REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0
