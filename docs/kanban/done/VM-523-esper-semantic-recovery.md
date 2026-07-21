# VM-523 - Esper Semantic Recovery

ID: VM-523
Status: Done - Certified Semantically Ready
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: ESPER
Raw packet: `data/raw-factions/esper/`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Esper end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight complete: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`.
- [x] Gate 1 - Packet audit and bounded disposition complete: `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`.
- [x] Gate 2 - Sufficient evidence completion complete: `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`.
- [x] Gate 3 - Canonical remediation complete: `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`; implementation commits `0365560e41914df51938a1d903b28d21be978173` and `6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- [x] Gate 4 - Generation and validation complete: exact candidate-scope capability passed for `a7ea41cbf57cc87f1948fdd254f0295816c5919d..6467f70fa4de13173172e20277e0fd56ebaf0b80`; exact-tree `npm.cmd test` passed from exported implementation tree.
- [x] Gate 5 - Exact candidate workflow recorded: `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`.
- [x] Independent exact-SHA review: `docs/handoffs/2026-07-20-1914-codex-vm523-esper-independent-review.md`; `APPROVE EXACT SHA 6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- [x] Certification: `docs/handoffs/2026-07-20-2123-codex-vm523-esper-certification.md`; tracked governance uses `PENDING_VM523_CERTIFICATION_COMMIT_SHA` for the self-referential certification commit.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Preflight handoff: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`
- Gate 1+2 audit report: `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`
- Gate 3+4 remediation report: `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`
- Candidate workflow record: `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`
- Candidate recovery SHA: `6467f70fa4de13173172e20277e0fd56ebaf0b80`
- Independent reviewer: approved exact candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80` in `docs/handoffs/2026-07-20-1914-codex-vm523-esper-independent-review.md`
- Certification commit: `PENDING_VM523_CERTIFICATION_COMMIT_SHA` in tracked governance; actual SHA reported after commit creation.

## Preflight Decision

PASS - ESPER GATE 1+2 AUTHORIZED

The preflight created branch `codex/vm-523-esper-semantic-recovery` and dedicated worktree `C:\dev\mtgSiteWIP-crit001-vm523-esper` from exact program base `a7ea41cbf57cc87f1948fdd254f0295816c5919d`. It inventoried the current Esper packet read-only and found no genuine preflight blockers. All semantic-readiness defects remained unresolved obligations for later gates. No remediation, candidate, review, certification, source acquisition, Excel update, program-base advancement, or VM-524 work was authorized by preflight.

## Gate 1+2 Decision

PASS - ESPER GATE 3+4 REMEDIATION AUTHORIZED

The Gate 1+2 audit completed read-only at `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`. It adjudicated all 9 current claims, setting the intended final role counts to 7 substantive claims and 2 support records; defined exact evidence-locator and evidence-scope contracts; established the evidence-backed Esper thesis as Blue-centered WUB perfectibility through designed control; completed required-neighbor, generic-language, mechanical/aesthetic, provenance, fixture, collision, preview, active-consumer, DRIFT-015/016/017, frozen-field, and Gate 3+4 remediation contracts; and converted all current readiness failures into exact later remediation obligations.

No Esper semantic or implementation data changed. No candidate existed. No review or certification occurred. Program base remained `a7ea41cbf57cc87f1948fdd254f0295816c5919d`. Excel and VM-524 remained untouched.

## Gate 3+4 Decision

PASS - ESPER GATE 5 CANDIDATE CREATION AUTHORIZED

Gate 3+4 remediation completed in implementation commits `0365560e41914df51938a1d903b28d21be978173` and `6467f70fa4de13173172e20277e0fd56ebaf0b80`, then governance recorded at `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`. The final implementation preserves 9 claims with role counts 7 substantive, 2 support, 0 discovery, 0 unclassified; removes support records from generated semantic proof chains; repairs all Esper provenance null IDs; creates the Esper fixture; expands required-neighbor/generic collision controls; keeps preview owner and embedded preview equal; preserves frozen placement/calibration/native-ID/lateral fields; passes exact candidate-scope for `a7ea41cbf57cc87f1948fdd254f0295816c5919d..6467f70fa4de13173172e20277e0fd56ebaf0b80`; and passes exact-tree `npm.cmd test` from `C:\Users\obake\.codex\visualizations\2026\07\20\019f8007-b187-7610-b572-effbe389229d\vm523-exact-6467f70-1219` with non-repository `node_modules` and Scryfall raw corpus inputs supplied.

No Gate 5 candidate workflow record, independent review, certification, certified-count increment, program-base advancement, Excel edit, VM-524 work, original-main edit, protected-worktree edit, DRIFT-017 edit, historical/debug/archive cleanup, or Table Talk change occurred.

## Gate 5 Candidate Workflow Decision

PASS - ESPER CANDIDATE WORKFLOW RECORDED FOR EXACT SHA `6467f70fa4de13173172e20277e0fd56ebaf0b80`

The Gate 5 qualification window designated exact semantic candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80` after read-only exact-SHA controls passed. This candidate workflow record persists that exact SHA in repository governance and moves VM-523 to the repository-authoritative state awaiting fresh independent exact-SHA review.

The workflow record is governance-only and must not be reviewed, approved, or certified as the candidate. Approval of current governance HEAD, the workflow-record commit, the branch name, or "latest changes" is invalid. Independent review must use exact candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80` against exact program base `a7ea41cbf57cc87f1948fdd254f0295816c5919d`.

Required future review decision is exactly one of:

- `APPROVE EXACT SHA 6467f70fa4de13173172e20277e0fd56ebaf0b80`
- `REJECT EXACT SHA 6467f70fa4de13173172e20277e0fd56ebaf0b80`

No independent review, approval, rejection, certification, semantically-ready transition, certified-count increment, Wave 4 count change, program-base advancement, Excel edit, VM-524 work, original-main edit, VM-522 edit, DRIFT-017 edit, historical/debug/archive cleanup, or Table Talk change occurred.

## Independent Review Decision

APPROVE EXACT SHA `6467f70fa4de13173172e20277e0fd56ebaf0b80`

The independent exact-SHA review completed in branch `codex/vm-523-esper-independent-review` and worktree `C:\dev\mtgSiteWIP-crit001-vm523-independent-review`, starting from workflow commit `841154f80a786ae41fa59c5835ec9370e40cb05e`. It reviewed only exact candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80` against exact program base `a7ea41cbf57cc87f1948fdd254f0295816c5919d`.

The review independently passed source authority, all 7 substantive claims, both support records, support proof-chain isolation, evidence locators/scopes, canonical IDs, 56 Esper provenance entries, 23 fixtures, required-neighbor/generic/mechanical/aesthetic boundaries, collision ordering, lateral targets, native IDs, preview parity, active consumed surfaces, DRIFT-015, DRIFT-016, DRIFT-017, frozen fields, non-Esper integrity, exact candidate-scope, invalid `WUB` guard, parser/placement/recruiter/source-generated validations, and exact-candidate export `npm.cmd test`.

Certification-only window is required next. Esper is not `semantically_ready`; certified count remains 21 of 37; Wave 4 remains 1 of 10; program base remains `a7ea41cbf57cc87f1948fdd254f0295816c5919d`. No certification, certified-count increment, program-base advancement, Excel edit, VM-524 work, candidate change, source/evidence/provenance/fixture/collision/preview/generated/recruiter/runtime/test/validator/generator/schema/package/CI change, original-main edit, VM-522 edit, DRIFT-017 edit, historical/debug/archive cleanup, or Table Talk change occurred.

## Certification Decision

PASS - ESPER CERTIFIED SEMANTICALLY_READY

Esper / WUB is certified `semantically_ready` from exact approved candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80`. Certification records candidate workflow `841154f80a786ae41fa59c5835ec9370e40cb05e`, approval review `995e4c018af1097d92ffe61b710eb069ec82e6d8`, and exact approval line `APPROVE EXACT SHA 6467f70fa4de13173172e20277e0fd56ebaf0b80`. The certification commit is self-referential, so tracked governance uses `PENDING_VM523_CERTIFICATION_COMMIT_SHA`; the actual certification SHA is reported after commit creation and becomes the new program base.

Certification preserves 9 claims with 7 substantive and 2 support records; 21 evidence locators with 0 missing; 56 Esper provenance entries with 0 null canonical IDs, 0 null hashes, 0 duplicate keys, and 0 support records in authoritative chains; 23 fixtures; generated collision order `WU`, `UB`, `WB`, `BANT`, `GRIXIS`, `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`, `NAYA`, `TEMUR`, `JUND`, `W`, `U`, `B`, `WUBRG`; recruiter lateral targets `WU`, `UB`, `WB`, `BANT`, `GRIXIS`; and source/embedded preview equality.

Certified count is now 22 of 37 and Wave 4 shards are 2 of 10 certified. VM-524 / Grixis remains not started and untouched. No source/evidence/provenance/fixture/collision/preview/generated/recruiter/runtime/test/validator/generator/schema/package/CI file, Excel tracker, original main, VM-522 worktree, DRIFT-017 prototype, historical/debug/archive debt, or Table Talk file was changed by certification.
