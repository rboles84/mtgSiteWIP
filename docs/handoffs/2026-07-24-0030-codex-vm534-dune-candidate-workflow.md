# VM-534 Dune Candidate Workflow

Agent name: Codex

Task requested: Begin official VM-534 Dune semantic recovery and record the exact candidate workflow for independent review.

Files reviewed: AGENTS.md; docs/handoffs/HANDOFF_INDEX.md; docs/kanban/board.md; docs/kanban/in-progress/VM-534-dune-semantic-recovery.md; docs/incidents/CRIT-001-drift-control-template.md; docs/incidents/CRIT-001-drift-register.md; docs/incidents/CRIT-001-identity-recovery-ledger.json; docs/incidents/CRIT-001-identity-recovery-ledger.md; DUNE raw packet, generated faction/placement/provenance surfaces, semantic readiness validators, guardrails, parser and placement tests.

Files changed: data/factions.json; data/placement-model.json; data/raw-factions/dune/dune.claims.json; data/raw-factions/dune/dune.profile.json; data/raw-factions/dune/dune.placement.json; data/raw-factions/dune/dune.changelog.json; data/semantic-readiness-provenance.json; research/fixtures/semantic-readiness/dune.semantic-fixtures.json; this handoff; HANDOFF_INDEX.md; VM-534 card; board; CRIT ledger JSON/Markdown; drift register; recovery summary.

What changed: Created exact DUNE semantic candidate e6f776d4e047aaa8f22358d4ff09486ff6100cf5 as a direct child of Gate 1+2 governance c05b7c752748e9432a9321b6bd8f2e1b65c29ee0. The candidate classifies all 5 DUNE claims as substantive, adds bounded evidence locators, preserves DUNE-only aliasing, repairs DUNE-owned collision evidence, updates generated DUNE placement/faction/provenance output, and adds 30 DUNE semantic fixtures.

Why it changed: Gate 1+2 found DUNE blocked by unclassified claims, no semantic fixture, stale provenance, null canonical IDs, and GLINT/INK claim contamination in collision guidance. The candidate performs only bounded DUNE semantic recovery so a separate independent exact-SHA review can decide the candidate.

Decisions made: DUNE remains canonical; display name remains Dune / Aggression; display color order remains BRGW; DUNE remains the only accepted alias. BRGW and all same-color permutations remain metadata/query-only and failed closed as candidate identities.

Validation commands and results:
- git rev-parse codex/crit001-program-base: ab3ece2155d52c0f4283a0c0244c601a0991f970
- Candidate parent proof: e6f776d4e047aaa8f22358d4ff09486ff6100cf5^ = c05b7c752748e9432a9321b6bd8f2e1b65c29ee0
- node research\\validate-semantic-candidate-scope.mjs --base=c05b7c752748e9432a9321b6bd8f2e1b65c29ee0 --target=e6f776d4e047aaa8f22358d4ff09486ff6100cf5 --identity=DUNE: PASS
- BRGW/BRWG/BGRW/BGWR/BWRG/BWGR/RBGW/RBWG/RGBW/RGWB/RWBG/RWGB/GBRW/GBWR/GRBW/GRWB/GWBR/GWRB/WBRG/WBGR/WRBG/WRGB/WGBR/WGRB/UNKNOWN candidate-scope probes: all rejected with exit 1
- GLINT, INK, WITCH, JESKAI candidate-scope probes against the DUNE range: all rejected with exit 1
- node research\\semantic-candidate-scope-tests.js: PASS
- node research\\validate-semantic-readiness.mjs --fixtures --targets=DUNE: PASS
- node research\\build-semantic-readiness-provenance.mjs --check: PASS, 2059 entries verified
- node research\\validate-source-generated-guardrails.mjs --targets=DUNE: PASS, 0 warnings
- node research\\faction-context-isolation-tests.js: PASS
- npm.cmd run test:parser: PASS, 226 parser cases
- npm.cmd run test:placement: PASS, 37 factions / 37 golden paths
- npm.cmd ci: PASS, with npm audit reporting 17 moderate and 2 high vulnerabilities; no fix or dependency staging performed
- npm.cmd test: PASS after adding the ignored local Scryfall corpus hardlink required by repository tests

Risks / uncertainties: npm audit still reports 19 vulnerabilities outside VM-534 scope. Validation touched CRLF/stat-only generated report files with no content diff; they were not staged. The Scryfall oracle corpus is ignored and remains untracked.

Not touched: No independent review, certification, semantically_ready transition, program-base advancement, Excel update, VM-535 Ink, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

Follow-up recommendations: Perform a fresh independent exact-SHA review of e6f776d4e047aaa8f22358d4ff09486ff6100cf5 from a dedicated review branch/worktree.

Next suggested agent: Independent reviewer.

Related Kanban card, docs, or plans: docs/kanban/in-progress/VM-534-dune-semantic-recovery.md; docs/incidents/CRIT-001-identity-recovery-ledger.json; docs/incidents/CRIT-001-drift-register.md.

Final disposition: READY FOR INDEPENDENT REVIEW EXACT SHA e6f776d4e047aaa8f22358d4ff09486ff6100cf5
