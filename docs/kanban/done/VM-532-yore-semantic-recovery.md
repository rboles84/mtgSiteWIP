# VM-532 - Yore Semantic Recovery

ID: VM-532
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: YORE
Display name: Yore / Artifice
Display color order: WUBR
Accepted identity alias: YORE only
Raw packet: `data/raw-factions/yore/`
Cohort: four-color
Contract: v1.1 certified from exact approved candidate

## Objective

Recover Yore end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Certified State

VM-532 is certified `semantically_ready` from exact approved candidate `f83b8b90b49a7afe3236f3e7f7ab52a254625d1f`. Certification governance starts from independent review commit `3f012fa254816f27f2958c93fc5df742b445bb52`, whose exact decision is `APPROVE EXACT SHA f83b8b90b49a7afe3236f3e7f7ab52a254625d1f`.

The certification commit placeholder inside tracked governance is `PENDING_VM532_CERTIFICATION_COMMIT_SHA`; the actual certification SHA is reported in the final task output and is intended to become the next local `codex/crit001-program-base`.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Independent certification.

## Certified Objects

- Prior program base: `4529f8615785743d074e3060e13f990941c1a458`
- Drift preflight: `b9c2a40f473cc9f5c05ba32a5fa7a4027b0afd42`
- Gate 1+2 governance: `0c073a4db20a75ad00d548aa68d6f6dbf387501a`
- Exact approved candidate: `f83b8b90b49a7afe3236f3e7f7ab52a254625d1f`
- Candidate workflow: `80b83039aca88d66baf47486861e38caeb46b229`
- Independent review: `3f012fa254816f27f2958c93fc5df742b445bb52`
- Certification branch: `codex/vm-532-yore-certification`
- Certification worktree: `C:\dev\mtgSiteWIP-crit001-vm532-yore-certification`
- Certification governance placeholder: `PENDING_VM532_CERTIFICATION_COMMIT_SHA`

## Validation Summary

- Exact approval line matched the candidate SHA.
- Candidate scope remained limited to the eight authorized YORE paths.
- No recruiter, identity-layer, preview, package, validator, test, VM-533, or unrelated infrastructure candidate path was present.
- YORE semantic readiness with fixtures passed.
- Provenance check passed after CRLF-only normalization; no content diff under `--ignore-cr-at-eol`.
- Source/generated guardrails passed for YORE with zero warnings.
- Parser, placement, faction-context isolation, candidate-scope regression, and full `npm.cmd test` passed.
- WUBR and all same-color permutations failed closed as identities.
- GLINT, WITCH, and JESKAI rejected the Yore candidate range.
- Raw preview remains disabled; generated identity-layer preview remains enabled and source/embedded generated preview objects remain equal.

## Not Touched

No semantic remediation, independent review, replacement candidate, candidate file edit, generated semantic data edit, fixture edit, provenance source edit, recruiter edit, identity-layer edit, package/lockfile edit, VM-533 Glint work, Glint shadow-audit incorporation, Excel update, push, PR, merge, rebase, cherry-pick, reset, clean, stash, amend, or force operation occurred.
