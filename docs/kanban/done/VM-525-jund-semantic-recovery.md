# VM-525 - Jund Semantic Recovery

ID: VM-525
Status: Done - certified semantically_ready from exact approved candidate
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: JUND
Raw packet: `data/raw-factions/jund/`
Cohort: shard
Contract: CRIT-001 Contract v1.1
Program base for candidate: `665d2b128f3aab8daf5d48d4fdab244a9fb33c2e`
Prior program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`
Branch: `codex/vm-525-jund-semantic-recovery`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm525-jund`
Certification branch: `codex/vm-525-jund-semantic-recovery-certification`
Certification worktree: `C:\dev\mtgSiteWIP-crit001-vm525-jund-certification`
Candidate continuation branch: `codex/vm-525-jund-semantic-recovery-post-drift020-candidate2`
Candidate continuation worktree: `C:\dev\mtgSiteWIP-crit001-vm525-jund-post-drift020`
Preflight decision: `PASS - JUND GATE 1+2 AUTHORIZED`
Preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
Gate 1+2 decision: `PASS - JUND GATE 3+4 REMEDIATION AUTHORIZED`
Gate 1+2 handoff: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
Gate 3+4 decision: `STOP - JUND GATE 5 CANDIDATE CREATION NOT AUTHORIZED`
Gate 3+4 handoff: `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
DRIFT-020 certification: `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
DRIFT-020 certified candidate: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`
Gate 3+4 / Gate 5 candidate workflow: `docs/handoffs/2026-07-21-2213-codex-vm525-jund-candidate-workflow.md`
Candidate recovery SHA: `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`
Superseded candidate attempts: `ba606b702832ce84baf45055562808f9b971e897`, `4a2c6462c4967f661bfa5357805fc155d2d5a746`

Archival refs for those unapproved superseded tips: `archive/superseded-vm525-jund-ba606b7` at `ba606b702832ce84baf45055562808f9b971e897`; `archive/superseded-vm525-jund-candidate-4a2c646` at `4a2c6462c4967f661bfa5357805fc155d2d5a746`.
Independent review SHA: `dee26b0246713a9b7d687c9fd2dfb96db2cfd9d2`
Certification commit: `PENDING_VM525_CERTIFICATION_COMMIT_SHA`
Certification handoff: `docs/handoffs/2026-07-21-2300-codex-vm525-jund-certification.md`

## Objective

Recover Jund end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence completion complete; Gate 3+4 remediation authorized.
- [x] Gate 3 - Canonical remediation complete from DRIFT-020 certification base.
- [x] Gate 4 - Generation, validation, fixture/provenance checks, and exact candidate-scope complete for exact candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`.
- [x] Gate 5 - Independent exact-SHA review approved exact candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`.
- [x] Certification - exact approved candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` certified `semantically_ready`; certified count advanced to 24 of 37 and Wave 4 advanced to 4 of 10.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- No remediation, source acquisition, candidate creation, independent review, certification, program-base advancement, VM-526 work, Excel edit, or original-main edit occurred during preflight or Gate 1+2.
- Gate 3+4 remediation is authorized only by the completed Gate 1+2 audit handoff and a future separate continuation window starting from the DRIFT-020 certification/program-base SHA; candidate creation, independent review, certification, VM-526 work, Excel edit, and original-main edit remain unauthorized until later gates explicitly allow them.
- Gate 3+4 stopped at `460dd7186dc76658797beac74a4330cc699a52d6` because the required authoritative preview edit at `data/identity-layers.json#/expressions/JUND/preview_text` was not candidate-scope-allowed. DRIFT-020 certified exact infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, clearing that shared-infrastructure blocker without performing Jund semantic remediation.
- This candidate workflow created exact Jund semantic candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` from DRIFT-020 certification base `665d2b128f3aab8daf5d48d4fdab244a9fb33c2e`; no independent review, approval, certification, semantically_ready transition, certified-count change, VM-526 work, Excel edit, push, PR, merge, or original-main edit occurred.
- Independent review approved exact candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` from dedicated review branch/worktree at workflow SHA `461ff5c389a93c6c5e5fc7317bbc5413d214a960`; no remediation, replacement candidate, certification, semantically_ready transition, certified-count change, VM-526 work, Excel edit, push, PR, merge, or original-main edit occurred.
- Certification is governance-only from independent review SHA `dee26b0246713a9b7d687c9fd2dfb96db2cfd9d2`; no remediation, replacement candidate, semantic/generated/runtime/test/validator/schema/package/CI change, VM-526 work, Excel edit, push, PR, merge, or original-main edit occurred.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- Audit/recovery report: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- Gate 3+4 stop handoff: `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- DRIFT-020 certification handoff: `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
- Candidate recovery SHA: `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`
- Superseded candidates: `ba606b702832ce84baf45055562808f9b971e897` failed exact candidate-scope due frozen collision confidence removal; `4a2c6462c4967f661bfa5357805fc155d2d5a746` failed exact candidate-scope due forbidden added collision confidence fields.
- Independent reviewer: Codex independent exact-SHA review approved exact candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` in `docs/handoffs/2026-07-21-2233-codex-vm525-jund-independent-review.md`
- Certification: `docs/handoffs/2026-07-21-2300-codex-vm525-jund-certification.md`
- Certification commit: `PENDING_VM525_CERTIFICATION_COMMIT_SHA`
