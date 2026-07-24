# VM-533 - Glint Semantic Recovery

ID: VM-533
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GLINT
Display name: Glint / Chaos
Display color order: UBRG
Accepted identity alias: GLINT only
Raw packet: `data/raw-factions/glint/`
Cohort: four-color
Contract: v1.1 certified from exact approved candidate

## Objective

Recover Glint end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Certified State

VM-533 is certified `semantically_ready` from exact approved candidate `ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`. Certification governance starts from independent review commit `e8710dffe4324aeaa3a0a0713e9596349382b592`, whose exact decision is `APPROVE EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`.

The certification commit placeholder inside tracked governance is `PENDING_VM533_CERTIFICATION_COMMIT_SHA`; the actual certification SHA is reported in the final task output and is intended to become the next local `codex/crit001-program-base`.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Independent certification.

## Certified Objects

- Prior program base: `8145b8697ed1d1500c0faecf080b55404ab8ec4e`
- Gate 1+2 governance: `65772b612cff924b683c0c1bf9e13e30f4951d5a`
- Exact approved candidate: `ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`
- Candidate workflow: `bc7252431149a862970d7c93ad82df8782ceb6cd`
- Independent review: `e8710dffe4324aeaa3a0a0713e9596349382b592`
- Certification branch: `codex/vm-533-glint-certification`
- Certification worktree: `C:\dev\mtgSiteWIP-crit001-vm533-glint-certification`
- Certification governance placeholder: `PENDING_VM533_CERTIFICATION_COMMIT_SHA`

## Validation Summary

- Exact approval line matched the candidate SHA.
- Candidate scope remained limited to the eight authorized GLINT paths.
- No recruiter, identity-layer, preview, package, validator, test, VM-534, VM-535, VM-536, VM-537, VM-538, or unrelated infrastructure candidate path was present.
- GLINT semantic readiness with fixtures passed.
- Provenance check passed after CRLF-only normalization; no content diff under LF-normalized comparison.
- Source/generated guardrails passed for GLINT with zero warnings.
- Parser, placement, faction-context isolation, candidate-scope regression, and full `npm.cmd test` passed.
- UBRG and all same-color permutations failed closed as identities.
- YORE, DUNE, WITCH, and JESKAI rejected the Glint candidate range.
- Raw preview remains disabled; generated identity-layer preview remains enabled and source/embedded generated preview objects remain equal.

## Not Touched

No semantic remediation, independent review, replacement candidate, candidate file edit, generated semantic data edit, fixture edit, provenance source edit, recruiter edit, identity-layer edit, package/lockfile edit, VM-534 Dune work, VM-535 Ink work, VM-536 Witch work, VM-537 Colorless work, VM-538 WUBRG work, Excel update, push, PR, merge, rebase, cherry-pick, reset, clean, stash, amend, or force operation occurred.
