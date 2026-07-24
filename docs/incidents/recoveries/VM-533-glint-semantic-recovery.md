# VM-533 Glint Semantic Recovery

Status: Certified semantically ready under CRIT-001 Contract v1.1.

## Certification Authority

- Ticket: VM-533
- Identity: GLINT / Glint / Chaos
- Exact prior program base: `8145b8697ed1d1500c0faecf080b55404ab8ec4e`
- Gate 1+2 governance: `65772b612cff924b683c0c1bf9e13e30f4951d5a`
- Exact approved candidate: `ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`
- Candidate-workflow commit: `bc7252431149a862970d7c93ad82df8782ceb6cd`
- Independent review commit: `e8710dffe4324aeaa3a0a0713e9596349382b592`
- Review decision: `APPROVE EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`
- Certification branch: `codex/vm-533-glint-certification`
- Certification worktree: `C:\dev\mtgSiteWIP-crit001-vm533-glint-certification`
- Certification commit placeholder in tracked governance: `PENDING_VM533_CERTIFICATION_COMMIT_SHA`

## Certified Semantic State

Glint remains canonical key `GLINT`, display name `Glint / Chaos`, display color order `UBRG`, and accepted alias `GLINT` only. UBRG and all same-color permutations are metadata/query-only and fail closed as candidate identities.

Certified reviewed truth: 5 substantive claims, 15 sources with 3 claim-bearing / 3 discovery-only / 5 shaping-only / 4 support-only roles, 13 GLINT provenance rows, zero null canonical IDs, zero missing hashes, and 30 semantic fixtures. Raw preview remains disabled; generated identity-layer preview remains enabled and source/embedded generated preview objects remain equal.

## Validation

- npm.cmd ci: PASS, exit 0; installed declared dependencies from lockfile; npm audit reported 19 inherited vulnerabilities (17 moderate, 2 high).
- Created ignored hardlink data/scryfall/raw/oracle-cards.json to the local authority corpus at C:\dev\mtgSiteWIP\data\scryfall\raw\oracle-cards.json; no corpus artifact was staged.
- npm.cmd test: PASS, exit 0.
- node research\validate-semantic-candidate-scope.mjs --base=8145b8697ed1d1500c0faecf080b55404ab8ec4e --target=ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6 --identity=GLINT: PASS, exit 0.
- node research\validate-semantic-readiness.mjs --fixtures --targets=GLINT: PASS, exit 0.
- node research\validate-source-generated-guardrails.mjs --targets=GLINT: PASS, exit 0.
- npm.cmd run test:faction-context-isolation: PASS, exit 0.
- npm.cmd run test:parser: PASS, exit 0; 226 parser cases passed.
- npm.cmd run test:placement: PASS, exit 0; 37 factions and 37 golden paths passed.
- node research\semantic-candidate-scope-tests.js: PASS, exit 0.
- node research\semantic-readiness-tests.js: PASS, exit 0.
- node research\audit-semantic-readiness.mjs --targets=GLINT: PASS, exit 0; GLINT has 5 substantive claims, 15 sources, 13 reference sites, and no missing references.
- node research\build-semantic-readiness-provenance.mjs --check: byte-for-byte FAIL, exit 1, due CRLF normalization only; LF-normalized builder comparison passed with 2055 entries.
- UBRG and all 23 same-color permutations, WUBR, YORE, DUNE, WITCH, and JESKAI candidate-scope probes: PASS by fail-closed rejection, each negative identity exited 1.
- Preview invariant probe: PASS; raw preview disabled, generated identity-layer preview enabled, embedded/source generated preview equal, aliases exactly GLINT, color order UBRG.

## Scope

Certification changed governance only. It did not edit GLINT candidate files, generated semantic data, fixtures, provenance source data, recruiter context, identity layers, preview sources, package files, validators, tests, VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, Excel, GitHub remote state, push, PR, merge, rebase, cherry-pick, reset, clean, stash, amend, or force operations.
