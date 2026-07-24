# VM-534 Dune Independent Exact-SHA Review

Agent name: Codex

Task requested: Independent review-only pass for VM-534 Dune exact semantic candidate.

Ticket: VM-534

Identity: DUNE / Dune / Aggression

Exact base SHA: ab3ece2155d52c0f4283a0c0244c601a0991f970

Gate 1+2 governance SHA: c05b7c752748e9432a9321b6bd8f2e1b65c29ee0

Exact candidate SHA: e6f776d4e047aaa8f22358d4ff09486ff6100cf5

Candidate-workflow SHA: 98269eca73ca59e4356a91b63e14f168df264434

Review branch: codex/vm-534-dune-independent-review

Review worktree: C:\\dev\\mtgSiteWIP-crit001-vm534-dune-independent-review

Parent proofs:
- e6f776d4e047aaa8f22358d4ff09486ff6100cf5^ = c05b7c752748e9432a9321b6bd8f2e1b65c29ee0
- 98269eca73ca59e4356a91b63e14f168df264434^ = e6f776d4e047aaa8f22358d4ff09486ff6100cf5
- Review commit parent target = 98269eca73ca59e4356a91b63e14f168df264434

Candidate file list reviewed:
- data/factions.json
- data/placement-model.json
- data/raw-factions/dune/dune.changelog.json
- data/raw-factions/dune/dune.claims.json
- data/raw-factions/dune/dune.placement.json
- data/raw-factions/dune/dune.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/dune.semantic-fixtures.json

Candidate/workflow separation: PASS. The exact candidate commit changes only the eight expected DUNE semantic files. The candidate-workflow commit changes governance only. No remediation occurred after e6f776d4e047aaa8f22358d4ff09486ff6100cf5.

Semantic review: PASS. DUNE remains canonical, display name remains Dune / Aggression, display color order remains BRGW, and DUNE remains the only accepted alias. BRGW and all same-color permutations remain metadata/query-only and failed closed. The candidate records 5 substantive claims, 14 sources, 30 fixtures, 13 DUNE provenance rows, zero null canonical IDs, zero missing hashes, DUNE-owned GLINT/INK collision evidence, raw preview disabled, and generated identity-layer preview retained.

Validation commands and results:
- npm.cmd ci: PASS; audit reported 17 moderate and 2 high vulnerabilities, no fix run
- npm.cmd test: PASS after ignored Scryfall corpus hardlink
- node research\\validate-semantic-readiness.mjs --fixtures --targets=DUNE: PASS
- node research\\build-semantic-readiness-provenance.mjs --check: CRLF byte-check warning in review worktree
- Normalized provenance parity check: PASS; rendered and existing manifests match after CRLF normalization, 2059 entries
- node research\\validate-source-generated-guardrails.mjs --targets=DUNE: PASS, 0 warnings
- node research\\faction-context-isolation-tests.js: PASS
- npm.cmd run test:parser: PASS, 226 parser cases
- npm.cmd run test:placement: PASS, 37 factions / 37 golden paths
- node research\\semantic-candidate-scope-tests.js: PASS
- node research\\validate-semantic-candidate-scope.mjs --base=c05b7c752748e9432a9321b6bd8f2e1b65c29ee0 --target=e6f776d4e047aaa8f22358d4ff09486ff6100cf5 --identity=DUNE: PASS
- BRGW, BRWG, BGRW, BGWR, BWRG, BWGR, RBGW, RBWG, RGBW, RGWB, RWBG, RWGB, GBRW, GBWR, GRBW, GRWB, GWBR, GWRB, WBRG, WBGR, WRBG, WRGB, WGBR, WGRB: all rejected with exit 1
- UNKNOWN, GLINT, INK, WITCH, JESKAI: all rejected with exit 1

Approval rationale: The exact candidate scope is DUNE-only, all semantic and boundary validations pass, generated/source parity is preserved, workflow changes are governance-only, and no approval-blocking semantic or scope finding remains. The provenance checker warning is line-ending-only and not a manifest mismatch.

No remediation performed: confirmed.

No certification performed: confirmed.

Program base unchanged: ab3ece2155d52c0f4283a0c0244c601a0991f970

VM-535 through VM-538 untouched: confirmed backlog/not started; no files or worktree changes made for Ink, Witch, Colorless, or WUBRG.

Excel not updated by Codex: confirmed.

Warnings: npm audit reports 19 vulnerabilities outside VM-534 scope. Full test touched gate-bias audit files as CRLF/stat-only with no content diff; they were not staged. The Scryfall corpus hardlink is ignored and untracked.

Next suggested agent: Certification-only agent for VM-534 Dune after this review commit is accepted.

APPROVE EXACT SHA e6f776d4e047aaa8f22358d4ff09486ff6100cf5
