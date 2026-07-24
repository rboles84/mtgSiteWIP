# VM-533 Glint Candidate Workflow Record

Agent name: Codex

Task requested: Begin official VM-533 Glint semantic recovery from the VM-532 certification program base, complete Gate 3+4 GLINT-only remediation, create one exact semantic candidate, validate it, and record governance for independent review. Independent review and certification were not authorized.

## Program State

- Program: CRIT-001
- Identity: VM-533 - Glint
- Canonical identity: GLINT
- Display name: Glint / Chaos
- Display color order: UBRG
- Accepted alias: GLINT only
- Metadata/query-only forms: UBRG and all UBRG color-order permutations
- Branch: codex/vm-533-glint-semantic-recovery
- Worktree: C:\dev\mtgSiteWIP-crit001-vm533-glint
- Fixed candidate-scope program base: 8145b8697ed1d1500c0faecf080b55404ab8ec4e
- Gate 1+2 governance: 65772b612cff924b683c0c1bf9e13e30f4951d5a
- Exact Glint semantic candidate: ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6
- Candidate-workflow governance commit: PENDING_VM533_CANDIDATE_WORKFLOW_COMMIT_SHA
- Program-base branch: codex/crit001-program-base at 8145b8697ed1d1500c0faecf080b55404ab8ec4e
- Previous identity: VM-532 Yore
- VM-532 certification/program base: 8145b8697ed1d1500c0faecf080b55404ab8ec4e
- Certified count: 31 of 37
- Wave 5 state: VM-532 certified; VM-533 awaiting independent exact-SHA review; VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started

## Files Reviewed

- AGENTS.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-533-glint-semantic-recovery.md
- docs/incidents/CRIT-001-operating-playbook.md
- docs/incidents/CRIT-001-contract-v1.1-amendment.md
- docs/reference/semantic-readiness-contract.md
- docs/incidents/CRIT-001-drift-control-template.md
- docs/incidents/CRIT-001-drift-register.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/handoffs/2026-07-23-2108-codex-vm533-glint-gate1-gate2.md
- data/raw-factions/glint/glint.claims.json
- data/raw-factions/glint/glint.sources.json
- data/raw-factions/glint/glint.profile.json
- data/raw-factions/glint/glint.placement.json
- data/raw-factions/glint/glint.changelog.json
- data/factions.json
- data/identity-layers.json
- data/placement-model.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/glint.semantic-fixtures.json

## Files Changed In Semantic Candidate

- data/factions.json
- data/placement-model.json
- data/raw-factions/glint/glint.changelog.json
- data/raw-factions/glint/glint.claims.json
- data/raw-factions/glint/glint.placement.json
- data/raw-factions/glint/glint.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/glint.semantic-fixtures.json

## Files Changed In This Governance Commit

- docs/handoffs/2026-07-23-2138-codex-vm533-glint-candidate-workflow.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-533-glint-semantic-recovery.md

## What Changed

Gate 1+2 completed with disposition READY FOR GATE 3 REMEDIATION. The semantic candidate then classified all five Glint claims as substantive_claim, added bounded evidence locations with exact source-id parity, added stable profile provenance IDs, replaced imported Yore/Dune claim chains in Glint collision rows with Glint-owned evidence plus neighbor boundary notes, added recruiter guidance evidence mappings, added a 30-case Glint semantic readiness fixture, regenerated generated faction/placement/provenance artifacts, and preserved UBRG/permutations as metadata-query-only.

This governance commit records that exact candidate ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 passed qualification and is awaiting independent exact-SHA review. It is intentionally separate from the semantic candidate.

## Why It Changed

Gate 1+2 established that Glint had sufficient bounded evidence for official remediation, but the packet lacked Contract v1.1 semantic roles, bounded evidence localization, fixture coverage, complete recruiter evidence mappings, and null-free provenance IDs. The candidate closes those readiness blockers without broadening aliases, adding non-GLINT work, importing Dune authority, or changing program-base state.

## Decisions Made

- GLINT remains the only canonical and accepted identity alias.
- UBRG and all UBRG permutations remain metadata/query-only and fail as candidate identities.
- All five Glint claims are substantive_claim because each is directly used by profile, placement, discriminator, guidance, collision, or fixture authority.
- Yore and Dune remain neighbor boundaries; their claim IDs were removed from Glint-owned provenance chains and not imported into official Glint authority.
- Raw preview_eligible remains false; generated identity-layer preview remains enabled and was not modified.
- VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched.

## Candidate Counts

- Claims: 5 substantive, 0 discovery, 0 support, 0 unclassified.
- Sources: 15 total; 3 claim-bearing, 3 discovery-only, 5 shaping-only, 4 support-only.
- Provenance: 13 GLINT rows, 0 null canonical IDs, 0 missing hashes.
- Fixtures: 30, runtime assertions disabled.
- Candidate changed files: 8.
- Candidate parent: 65772b612cff924b683c0c1bf9e13e30f4951d5a.

## Validation Run

- npm.cmd ci: PASS in official VM-533 worktree; existing npm audit advisories reported 19 vulnerabilities (17 moderate, 2 high), no dependency files changed.
- node research/validate-semantic-candidate-scope.mjs --base=8145b8697ed1d1500c0faecf080b55404ab8ec4e --target=ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 --identity=GLINT: PASS.
- node research/validate-semantic-readiness.mjs --fixtures --targets=GLINT: PASS.
- node research/validate-semantic-readiness.mjs --fixtures --target=GLINT: PASS.
- node research/build-semantic-readiness-provenance.mjs --check: PASS, 2055 entries.
- node research/validate-source-generated-guardrails.mjs --targets=GLINT: PASS, 0 warnings.
- npm.cmd run test:semantic-readiness: PASS.
- npm.cmd run test:faction-context-isolation: PASS.
- npm.cmd run test:parser: PASS, 226 parser cases.
- npm.cmd run test:placement: PASS, 37 factions and 37 golden paths.
- npm.cmd test: initial official-worktree run stopped on missing ignored Scryfall corpus; after hardlinking local ignored C:\dev\mtgSiteWIP\data\scryfall\raw\oracle-cards.json to the VM-533 worktree, PASS.
- npm.cmd run build:factions plus git diff --exit-code --stat: PASS content idempotence; only CRLF warnings from Windows checkout.
- UBRG plus all 23 same-color permutations and WUBR candidate-identity probes: all rejected exit 1.
- YORE, DUNE, WITCH, and JESKAI candidate-scope probes against the Glint range: all rejected exit 1.
- Disposable exact-candidate worktree C:\tmp\vm533-glint-exact-ed11a91-20260723: npm.cmd ci PASS; npm.cmd test PASS after hardlinking the existing local ignored Scryfall oracle corpus; exact GLINT candidate-scope PASS; GLINT semantic readiness PASS; source/generated guardrails PASS; parser PASS; placement PASS; faction-context isolation PASS; provenance --check PASS after disposable-tree CRLF-only provenance normalization with empty --ignore-cr-at-eol diff; disposable worktree removed and pruned.

## Risks / Uncertainties

- Dependency audit during npm.cmd ci reported existing package advisories; no audit fix was run and no dependency files were changed.
- The Scryfall oracle corpus is ignored local test authority and was hardlinked for validation only; it was not staged or committed.
- Glint remains evidence-limited by design: Commander/Yidris, Entropic Uprising, Scryfall/local card data, generic chaos, generic cascade, generic high-variance play, and Glint-Eye-only interpretations remain support-only or excluded as substantive identity proof.
- Independent exact-SHA review is still required before certification.

## Not Touched

- No independent review.
- No certification.
- No program-base advancement.
- No VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, or VM-538 WUBRG work.
- No Excel update.
- No push, merge, pull request, rebase, cherry-pick, reset, clean, stash, amend, or force operation.
- No semantic changes after exact candidate ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6.

## Follow-Up Recommendations

Resume with an independent reviewer on exact candidate SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6. Certification may only occur after exact-SHA approval of that candidate.

## Next Suggested Agent

Independent Reviewer for VM-533 exact candidate ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6.

## Related Kanban Card, Docs, Or Plans

- docs/kanban/in-progress/VM-533-glint-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/handoffs/2026-07-23-2108-codex-vm533-glint-gate1-gate2.md

READY FOR INDEPENDENT REVIEW EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6
