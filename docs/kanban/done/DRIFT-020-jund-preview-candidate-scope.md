# DRIFT-020 - Jund Preview Candidate-Scope Resolution

ID: DRIFT-020
Status: Done - exact shared-infrastructure candidate certified
Type: CRIT-001 Shared Infrastructure Candidate
Priority: CRIT-001
Identity context: JUND / VM-525
Branch: `codex/drift-020-jund-preview-candidate-scope`
Worktree: `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope`
Program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`
Jund STOP base: `460dd7186dc76658797beac74a4330cc699a52d6`
Implementation candidate: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`
Qualification governance handoff: `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
Workflow handoff: `docs/handoffs/2026-07-21-1920-codex-drift020-preview-candidate-workflow.md`
Independent review handoff: `docs/handoffs/2026-07-21-2004-codex-drift020-independent-review.md`
Independent review decision: `APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`
Certification handoff: `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
Certification commit: `PENDING_DRIFT020_CERTIFICATION_COMMIT_SHA`

## Objective

Resolve the shared validator scope blocker from VM-525 without touching Jund semantic data. The candidate authorizes identity-local authoritative preview source edits only when object-level validation proves the change is limited to `data/identity-layers.json#/expressions/<IDENTITY>/preview_text`, and it preserves generated `data/factions.json` isolation for all non-target and non-preview content.

## Scope Rules

- No Jund semantic remediation, Jund candidate creation, or VM-526 work is part of this card.
- No identity semantic data, preview text content, generated data, recruiter context, schemas, generators, package metadata, CI, Excel, original main, VM-526, protected worktrees, or DRIFT-017 prototype changes are allowed here.
- The exact implementation candidate SHA is the only object eligible for independent infrastructure review: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.

## Current Status

PASS - DRIFT-020 implementation candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` is independently approved and certified by exact SHA after workflow recording from Jund STOP commit `460dd7186dc76658797beac74a4330cc699a52d6`.

The certification commit is the new CRIT-001 program base. DRIFT-020 is complete. VM-525 may resume Gate 3+4 semantic remediation only in a separate future window that starts from the DRIFT-020 certification/program-base SHA. No Jund semantic remediation or Jund candidate was created during this certification.

## Validation Summary

- `node research\semantic-candidate-scope-tests.js` - pass.
- `npm.cmd test` in worktree with ignored dependency/corpus inputs - pass, `EXIT_CODE=0`.
- Exact-tree export from `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, `npm.cmd test` - pass, `EXIT_CODE=0`.
- Historical display-source preview candidates for `UG`, `B`, `G`, and `R` - pass under the new rule.
- Historical no-preview candidates for `ESPER` and `GRIXIS` - pass.
- Jund governance range `16528f3a24a7f3d7f4475bdde56fbfee09becd98..460dd7186dc76658797beac74a4330cc699a52d6` - still rejected for unclassified proof-chain contamination.
- Invalid alias `BRG` - still rejected as `Unknown identity BRG`.
- `npm.cmd run test:semantic-readiness` - readiness subtests pass, then inherited stale `semantic-readiness-provenance.json` check exits 1; no provenance file was modified in DRIFT-020.

## Required Records

- VM-525 preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- VM-525 Gate 1+2 handoff: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- VM-525 Gate 3+4 STOP handoff: `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- DRIFT-020 governance handoff: `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
- DRIFT-020 workflow handoff: `docs/handoffs/2026-07-21-1920-codex-drift020-preview-candidate-workflow.md`
- DRIFT-020 independent review handoff: `docs/handoffs/2026-07-21-2004-codex-drift020-independent-review.md`
- DRIFT-020 certification handoff: `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
- Drift register: `docs/incidents/CRIT-001-drift-register.md`
