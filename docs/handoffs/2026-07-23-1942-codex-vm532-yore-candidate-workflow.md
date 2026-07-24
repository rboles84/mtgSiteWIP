# VM-532 Yore Candidate Workflow Record

Agent name: Codex

Task requested: Continue VM-532 Yore beyond drift preflight through authorized Gate 1+2, Gate 3+4 remediation, exact semantic candidate creation, exact-candidate qualification, disposable exact-candidate testing, and governance-only candidate-workflow recording. Independent review and certification were not authorized.

## Program State

- Program: CRIT-001
- Identity: VM-532 - Yore
- Canonical identity: YORE
- Display name: Yore / Artifice
- Display color order: WUBR
- Accepted alias: YORE only
- Metadata/query-only forms: WUBR and all WUBR color-order permutations
- Branch: codex/vm-532-yore-semantic-recovery
- Worktree: C:\dev\mtgSiteWIP-crit001-vm532-yore
- Fixed candidate-scope program base: 4529f8615785743d074e3060e13f990941c1a458
- Drift preflight: b9c2a40f473cc9f5c05ba32a5fa7a4027b0afd42
- Gate 1+2 governance: 0c073a4db20a75ad00d548aa68d6f6dbf387501a
- Exact Yore semantic candidate: f83b8b90b49a7afe3236f3e7f7ab52a254625d1f
- Candidate-workflow governance commit: PENDING_VM532_CANDIDATE_WORKFLOW_COMMIT_SHA
- Program-base branch: codex/crit001-program-base at 4529f8615785743d074e3060e13f990941c1a458
- Previous identity: VM-531 Jeskai
- VM-531 certification/program base: 4529f8615785743d074e3060e13f990941c1a458
- Certified count: 30 of 37
- Wave 5 state: VM-532 awaiting independent exact-SHA review; VM-533 Glint remains backlog/not started

## Files Reviewed

- docs/handoffs/2026-07-23-1646-codex-vm532-yore-drift-preflight.md
- docs/handoffs/2026-07-23-1818-codex-vm532-yore-gate1-gate2.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-532-yore-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- data/raw-factions/yore/yore.claims.json
- data/raw-factions/yore/yore.sources.json
- data/raw-factions/yore/yore.profile.json
- data/raw-factions/yore/yore.placement.json
- data/raw-factions/yore/yore.changelog.json
- data/factions.json
- data/placement-model.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/yore.semantic-fixtures.json

## Files Changed In Semantic Candidate

- data/factions.json
- data/placement-model.json
- data/raw-factions/yore/yore.changelog.json
- data/raw-factions/yore/yore.claims.json
- data/raw-factions/yore/yore.placement.json
- data/raw-factions/yore/yore.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/yore.semantic-fixtures.json

## Files Changed In This Governance Commit

- docs/handoffs/2026-07-23-1942-codex-vm532-yore-candidate-workflow.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-532-yore-semantic-recovery.md

## What Changed

Gate 1+2 completed with disposition READY FOR GATE 3 REMEDIATION. The semantic candidate then assigned all five Yore claims to substantive_claim, added bounded evidence locations with exact source chains, added stable profile provenance IDs, replaced imported Glint/Witch claim chains in Yore collision rows with Yore-owned evidence plus neighbor boundary notes, added recruiter guidance evidence mappings, added Yore semantic readiness fixtures for required neighbors/exclusions, regenerated generated faction/placement/provenance artifacts, and preserved WUBR/permutations as metadata/query-only.

This governance commit records that exact candidate f83b8b90b49a7afe3236f3e7f7ab52a254625d1f passed qualification and is awaiting independent exact-SHA review. It is intentionally separate from the semantic candidate.

## Why It Changed

Gate 1+2 established that Yore had sufficient bounded evidence for official remediation, but the packet lacked Contract v1.1 semantic roles, bounded evidence localization, fixture coverage, complete recruiter evidence mappings, and null-free provenance IDs. The candidate closes those readiness blockers without broadening aliases, adding claims, importing VM-533/Glint authority, or changing program-base state.

## Decisions Made

- YORE remains the only canonical and accepted identity alias.
- WUBR and all WUBR permutations remain metadata/query-only and fail as candidate identities.
- All five Yore claims are substantive_claim because each is directly used by profile, placement, discriminator, guidance, collision, or fixture authority.
- Glint and Witch remain neighbor boundaries; their claim IDs were removed from Yore-owned provenance chains and not imported into official Yore authority.
- Raw preview_eligible remains false; generated identity-layer preview was not modified.
- VM-533 Glint remains backlog/not started and officially untouched.

## Validation Run

- node research/audit-semantic-readiness.mjs --targets=YORE: PASS diagnostics; 5 substantive claims, 13 sources, 13 reference sites, no missing references.
- node research/validate-semantic-readiness.mjs --fixtures --targets=YORE: PASS.
- node research/build-semantic-readiness-provenance.mjs --check: PASS, 2051 entries.
- node research/validate-source-generated-guardrails.mjs --targets=YORE: PASS, 0 warnings.
- npm.cmd run test:faction-context-isolation: PASS.
- npm.cmd run test:parser: PASS, 226 parser cases.
- npm.cmd run test:placement: PASS, 37 factions and 37 golden paths.
- node research/semantic-candidate-scope-tests.js: PASS.
- node research/validate-semantic-candidate-scope.mjs --base=4529f8615785743d074e3060e13f990941c1a458 --target=HEAD --identity=YORE: PASS for 4529f8615785743d074e3060e13f990941c1a458..HEAD at candidate commit.
- WUBR plus all 23 same-color permutations candidate-identity probes: all rejected as unknown identities.
- Disposable exact-candidate worktree C:\tmp\vm532-yore-exact-f83b8b9-20260723: npm.cmd ci PASS; npm.cmd test PASS after linking the existing local Scryfall oracle corpus; disposable worktree removed after test.

## Risks / Uncertainties

- Dependency audit during disposable npm.cmd ci reported existing package advisories; no dependency files were changed and no audit-fix was run.
- Yore remains evidence-limited by design: exact Yore-Tiller card facts, Cult of Yore narrative, Commander legality, Breya-only lore, Thran/Phyrexia claims, generic artifact/recursion claims, and public WUBR naming remain excluded or deferred.
- Independent exact-SHA review is still required before certification.

## Not Touched

- No independent review.
- No certification.
- No program-base advancement.
- No VM-533 Glint official work.
- No Excel update.
- No push, merge, or pull request.
- No protected-worktree cleanup.
- No semantic changes after exact candidate f83b8b90b49a7afe3236f3e7f7ab52a254625d1f.

## Follow-Up Recommendations

Resume with an independent reviewer on exact candidate SHA f83b8b90b49a7afe3236f3e7f7ab52a254625d1f. Certification may only occur after exact-SHA approval of that candidate.

## Next Suggested Agent

Independent Reviewer for VM-532 exact candidate f83b8b90b49a7afe3236f3e7f7ab52a254625d1f.

## Related Kanban Card, Docs, Or Plans

- docs/kanban/in-progress/VM-532-yore-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/handoffs/2026-07-23-1818-codex-vm532-yore-gate1-gate2.md

READY FOR INDEPENDENT REVIEW OF EXACT SHA f83b8b90b49a7afe3236f3e7f7ab52a254625d1f
