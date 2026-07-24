# VM-533 Glint Independent Exact-SHA Review

Agent name: Codex
Task requested: Independent exact-SHA review of VM-533 Glint semantic candidate.
Related Kanban card: VM-533 - Glint Semantic Recovery
Review branch: codex/vm-533-glint-independent-review
Review worktree: C:\dev\mtgSiteWIP-crit001-vm533-glint-independent-review
Starting HEAD: bc7252431149a862970d7c93ad82df8782ceb6cd

## Decision

APPROVE EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6

## Object Ledger

- Program base / VM-532 certification: 8145b8697ed1d1500c0faecf080b55404ab8ec4e
- VM-533 Gate 1+2 governance: 65772b612cff924b683c0c1bf9e13e30f4951d5a
- Exact GLINT semantic candidate reviewed: ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6
- Candidate-workflow governance: bc7252431149a862970d7c93ad82df8782ceb6cd
- Independent-review governance: PENDING_VM533_INDEPENDENT_REVIEW_SHA
- Certification: not authorized / not performed
- New program base: not authorized / not advanced

## Files Reviewed

- AGENTS.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-533-glint-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/incidents/CRIT-001-drift-control-template.md
- docs/reference/semantic-readiness-contract.md and related CRIT-001 contract/governance material available in-tree
- VM-533 Gate 1+2 and candidate-workflow handoffs
- Exact candidate files: data/factions.json, data/placement-model.json, data/raw-factions/glint/glint.claims.json, data/raw-factions/glint/glint.profile.json, data/raw-factions/glint/glint.placement.json, data/raw-factions/glint/glint.changelog.json, data/semantic-readiness-provenance.json, research/fixtures/semantic-readiness/glint.semantic-fixtures.json
- Neighbor and consumer surfaces for YORE, DUNE, WITCH, JESKAI, identity-layer preview, recruiter, candidate-scope validator, semantic-readiness validator, provenance builder/checker, source/generated guardrails, parser, placement, faction-context isolation, and full test suite

## Files Changed

- docs/handoffs/2026-07-23-2157-codex-vm533-glint-independent-review.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-533-glint-semantic-recovery.md

## What Changed

Recorded independent review governance only. VM-533 was moved from awaiting independent review to exact candidate approved / awaiting certification in governance records. The approved candidate SHA is exactly ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6. Candidate/workflow/review/certification/program-base objects remain distinct.

## Review Evidence

Preflight proved the local program-base branch resolves to 8145b8697ed1d1500c0faecf080b55404ab8ec4e. Required objects exist. Exact ancestry is linear: 8145b8697ed1d1500c0faecf080b55404ab8ec4e -> 65772b612cff924b683c0c1bf9e13e30f4951d5a -> ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 -> bc7252431149a862970d7c93ad82df8782ceb6cd. The review branch/worktree did not collide and started clean from bc7252431149a862970d7c93ad82df8782ceb6cd.

Exact candidate commit changed only eight authorized GLINT candidate paths: data/factions.json, data/placement-model.json, four data/raw-factions/glint files, data/semantic-readiness-provenance.json, and research/fixtures/semantic-readiness/glint.semantic-fixtures.json. Candidate stats were 8 files changed, 846 insertions, 71 deletions. Candidate-workflow changes after ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 were governance-only.

Independent semantic review verified 5 substantive GLINT claims, 15 sources with 3 claim-bearing / 3 discovery-only / 5 shaping-only / 4 support-only inventory, bounded evidence locations, source/evidence parity, and isolation of non-claim-bearing sources from substantive proof. GLINT provenance has 13 rows, 0 null canonical IDs, and 0 missing hashes. The fixture has 30 fixtures and covers core inclusion, mature/pressure behavior, nearest-collision ambiguity, provenance, required neighbor exclusions, alias rejection, and generic false-positive exclusions.

Boundary review found no unresolved collapse into Yore, Dune, Witch, Jeskai, Grixis, Jund, Temur, Sultai, guild-pair overlap, generic UBRG, generic four-color Commander, generic chaos, generic cascade, generic high variance, Yidris-only, Glint-Eye-only, Commander legality, or official-name interpretations. Collision provenance for Yore and Dune uses GLINT-owned chains only.

Frozen fields are preserved: canonical key GLINT, display name Glint / Chaos, color order UBRG, and accepted identity alias GLINT only. UBRG and all same-color permutations fail closed as candidate identities. Raw preview remains disabled; generated identity-layer preview remains enabled and unchanged. No identity-layer, recruiter, package, validator, test, VM-534 through VM-538, or unrelated infrastructure change occurred in the exact candidate.

## Validation Results

- npm.cmd ci: PASS, exit 0. Existing npm audit result reported 19 vulnerabilities (17 moderate, 2 high); no dependency files were staged or committed.
- npm.cmd test: PASS, exit 0, after using an ignored hardlink to the local Scryfall oracle corpus in data/scryfall/raw/oracle-cards.json.
- node research\validate-semantic-candidate-scope.mjs --base=8145b8697ed1d1500c0faecf080b55404ab8ec4e --target=ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 --identity=GLINT: PASS, exit 0.
- node research\validate-semantic-readiness.mjs --fixtures --targets=GLINT: PASS, exit 0.
- node research\audit-semantic-readiness.mjs --targets=GLINT: PASS, exit 0.
- node research\validate-source-generated-guardrails.mjs --targets=GLINT: PASS, exit 0.
- npm.cmd run test:faction-context-isolation: PASS, exit 0.
- npm.cmd run test:parser: PASS, exit 0.
- npm.cmd run test:placement: PASS, exit 0.
- node research\semantic-candidate-scope-tests.js: PASS, exit 0.
- node research\semantic-readiness-tests.js: PASS, exit 0.
- UBRG and all 23 same-color permutations, WUBR, YORE, DUNE, WITCH, and JESKAI candidate-scope probes: PASS by rejection, exit 1 for each negative identity.
- node research\build-semantic-readiness-provenance.mjs --check: FAIL byte-for-byte, exit 1, with stale-file message. A normalization-aware check comparing LF-normalized existing and rendered manifests passed with 2055 entries, confirming the failure is CRLF-only and not a semantic/provenance content mismatch.

## Review Matrix

| Area | Result | Severity | Notes |
| --- | --- | --- | --- |
| Exact objects and ancestry | PASS | INFORMATIONAL | Linear ancestry and direct parents verified. |
| Candidate/workflow separation | PASS | INFORMATIONAL | Post-candidate diff is governance-only. |
| Candidate path scope | PASS | INFORMATIONAL | Exact candidate commit touched only authorized GLINT files. |
| Claims, roles, evidence, locators | PASS | INFORMATIONAL | Five substantive claims with bounded evidence/source parity. |
| Source-role inventory | PASS | INFORMATIONAL | 3 claim-bearing, 3 discovery-only, 5 shaping-only, 4 support-only. |
| Boundary controls | PASS | INFORMATIONAL | No unresolved Yore/Dune/Witch/Jeskai/generic collapse. |
| Frozen fields and aliases | PASS | INFORMATIONAL | GLINT only; UBRG/permutations fail closed. |
| Preview disposition | PASS | INFORMATIONAL | Raw disabled, generated identity-layer preview retained. |
| Fixtures and provenance | PASS | INFORMATIONAL | 30 fixtures; 13 GLINT provenance rows; no null IDs/hashes. |
| Candidate scope and probes | PASS | INFORMATIONAL | Positive and negative candidate-scope probes behaved correctly. |
| Full validation | PASS | INFORMATIONAL | Full npm test and focused suites passed. |
| Provenance byte check | PASS | MINOR | Raw builder check fails only on CRLF byte normalization; normalized manifest matches. |
| Certification/program base | N/A | INFORMATIONAL | Not authorized and not performed. |

Severity totals: CRITICAL 0, MAJOR 0, MINOR 1, INFORMATIONAL 12. Approval-blocking findings: none.

## Decisions Made

The exact GLINT semantic candidate is approved for later separate certification. The raw/generated preview difference is authorized: raw profile preview is intentionally disabled, and the generated identity-layer/Home preview remains enabled through existing registry authority. The CRLF-only provenance byte warning is recorded as non-blocking because normalized generated content matches the committed manifest.

## Risks / Uncertainties

The npm audit advisory count remains pre-existing local dependency risk, not VM-533 candidate content. The ignored Scryfall hardlink and node_modules are local validation artifacts only and were not staged. Gate-bias audit reports showed validation byproduct status with no content diff; they were not staged.

## Tests Run

See Validation Results. No disposable exact-tree was required in this review because npm.cmd ci and npm.cmd test passed in the dedicated review worktree.

## Not Touched

No remediation, replacement candidate, certification, program-base advancement, VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, Excel, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

## Follow-up Recommendations

Proceed only with a separate VM-533 certification-only window if authorized, certifying exactly ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 and preserving candidate/workflow/review/certification object separation.

## Next Suggested Agent

Certification agent, only after explicit VM-533 certification authorization.

APPROVE EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6
