# VM-523 - Esper Semantic Recovery

ID: VM-523
Status: Active - Gate 3+4 Remediation Complete; Gate 5 Candidate Creation Authorized For Separate Window
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
- [x] Gate 3 - Canonical remediation complete: `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`; implementation commits `0365560` and `6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- [x] Gate 4 - Generation and validation complete: exact candidate-scope capability passed for `a7ea41cbf57cc87f1948fdd254f0295816c5919d..${implementationSha}`; no candidate created.
- [ ] Gate 5 - Independent certification.

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
- Candidate recovery SHA: pending; latest Gate 3+4 implementation SHA `6467f70fa4de13173172e20277e0fd56ebaf0b80` is candidate-scope capable but not designated as a candidate.
- Independent reviewer: pending
- Certification commit: pending

## Preflight Decision

PASS - ESPER GATE 1+2 AUTHORIZED

The preflight created branch `codex/vm-523-esper-semantic-recovery` and dedicated worktree `C:\dev\mtgSiteWIP-crit001-vm523-esper` from exact program base `a7ea41cbf57cc87f1948fdd254f0295816c5919d`. It inventoried the current Esper packet read-only and found no genuine preflight blockers. All semantic-readiness defects remained unresolved obligations for later gates. No remediation, candidate, review, certification, source acquisition, Excel update, program-base advancement, or VM-524 work was authorized by preflight.

## Gate 1+2 Decision

PASS - ESPER GATE 3+4 REMEDIATION AUTHORIZED

The Gate 1+2 audit completed read-only at `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`. It adjudicated all 9 current claims, setting the intended final role counts to 7 substantive claims and 2 support records; defined exact evidence-locator and evidence-scope contracts; established the evidence-backed Esper thesis as Blue-centered WUB perfectibility through designed control; completed required-neighbor, generic-language, mechanical/aesthetic, provenance, fixture, collision, preview, active-consumer, DRIFT-015/016/017, frozen-field, and Gate 3+4 remediation contracts; and converted all current readiness failures into exact later remediation obligations.

No Esper semantic or implementation data changed. No candidate exists. No review or certification occurred. Program base remains `a7ea41cbf57cc87f1948fdd254f0295816c5919d`. Excel and VM-524 remain untouched.


## Gate 3+4 Decision

PASS - ESPER GATE 5 CANDIDATE CREATION AUTHORIZED

Gate 3+4 remediation completed in implementation commits `0365560` and `6467f70fa4de13173172e20277e0fd56ebaf0b80`, then governance recorded at `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`. The final implementation preserves 9 claims with role counts 7 substantive, 2 support, 0 discovery, 0 unclassified; removes support records from generated semantic proof chains; repairs all Esper provenance null IDs; creates the Esper fixture; expands required-neighbor/generic collision controls; keeps preview owner and embedded preview equal; preserves frozen placement/calibration/native-ID/lateral fields; and passes exact candidate-scope for `a7ea41cbf57cc87f1948fdd254f0295816c5919d..${implementationSha}`.

No Gate 5 candidate workflow record, independent review, certification, certified-count increment, program-base advancement, Excel edit, VM-524 work, original-main edit, protected-worktree edit, DRIFT-017 edit, historical/debug/archive cleanup, or Table Talk change occurred.
