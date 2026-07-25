# VM-536 Witch Semantic Recovery

Status: Certified semantically ready

Identity: WITCH / Witch / Growth

Exact program base: fa88363b7a09ed326a0f15484388e7f2b8fce9ef

Gate 1+2 governance: b16e8f60c73e868fee628f3510cdd1aa670cdfc0

Superseded candidate: 96f8ee3259a5010e96ba92aea35ae271eb692ac8

Exact semantic candidate: acaf51a4f7e11d73b59fcc61397dcab2cb39e490

Candidate parent proof: acaf51a4f7e11d73b59fcc61397dcab2cb39e490^ = 96f8ee3259a5010e96ba92aea35ae271eb692ac8

Candidate branch/worktree: codex/vm-536-witch-semantic-recovery / C:\dev\mtgSiteWIP-crit001-vm536-witch

Candidate files changed: data/factions.json; data/placement-model.json; data/raw-factions/witch/witch.changelog.json; data/raw-factions/witch/witch.claims.json; data/raw-factions/witch/witch.placement.json; data/raw-factions/witch/witch.profile.json; data/semantic-readiness-provenance.json; research/fixtures/semantic-readiness/witch.semantic-fixtures.json.

Summary: The exact final candidate remediates WITCH only, preserving WITCH as the canonical key, Witch / Growth display, GWUB display metadata, and WITCH-only accepted aliasing. It records 5 substantive claims, 12 WITCH provenance rows with zero null canonical IDs/hashes, generated Witch parity, and 37 semantic fixtures.

Baseline: before candidate, Witch had 5 claims, 0 substantive / 5 unclassified, 9 WITCH provenance rows, 4 null canonical IDs, and no fixture. After candidate, Witch has 5 claims, 5 substantive / 0 unclassified, 12 WITCH provenance rows, 0 null canonical IDs, and 37 fixtures.

Alias and neighbor behavior: identity-layer aliases remain exactly ["WITCH"]; all 24 GWUB permutations remain metadata/query-only; GWUB, WUBG, and color-order-as-canonical-key probes passed as metadata-only/non-canonical. Neighbor rejection probes passed for INK, YORE, GLINT, DUNE, BANT, ESPER, SULTAI, ABZAN, WG, UG, BG, WU, WB, UB, GENERIC_GWUB, GENERIC_FOUR_COLOR_COMMANDER, GENERIC_COUNTERS, GENERIC_PROLIFERATE, GENERIC_ATRAXA, INFECT_ONLY, SUPERFRIENDS_ONLY, PHYREXIA_ONLY, WITCH_MAW_ONLY, BREED_LETHALITY_ONLY, GROWTH_ONLY, COMMANDER_LEGALITY, OFFICIAL_NAME, and RED_PRESENT_COLLAPSE.

Preview invariant: raw preview_eligible remains false; generated identity-layer preview is retained; generated preview matches embedded data/factions.json preview; no data/identity-layers.json preview-source edit occurred.

Validation: npm.cmd ci passed; full npm.cmd test passed after adding ignored Scryfall corpus hardlink; WITCH semantic readiness passed; source/generated guardrails passed for WITCH; faction-context isolation passed; parser passed; placement passed; semantic candidate scope passed; audit target passed. The provenance byte check reported stale because of line endings, and normalized provenance parity passed with 2066 entries.

Unstaged byproducts: docs/audits/gate-compression/live-gate-bias.json, docs/audits/gate-compression/live-gate-bias.md, ignored data/scryfall/raw/oracle-cards.json, and ignored node_modules/ were not staged.

Warnings: Git reported permission denial for C:\Users\obake/.config/git/ignore, and Windows checkout emitted LF/CRLF warnings. No dependency fix or package staging occurred.

Independent review: APPROVE EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490 in docs/handoffs/2026-07-24-1820-codex-vm536-witch-independent-review.md. Review verified exact ancestry, WITCH-only eight-file candidate scope, governance-only workflow separation, 5 substantive claims, 13-source audit surface, 37 fixtures, 12 WITCH provenance rows with zero null IDs/hashes, WITCH-owned INK/YORE collision chains, WITCH-only accepted alias, GWUB/WUBG/all permutations metadata-only behavior, raw preview disabled with no data/identity-layers.json edit, full validation after ignored Scryfall corpus hardlink, and CRLF-only provenance byte normalization. Review commit: 5a5291f50fc90cfc3f3592e53cb7ae9907b57309.

Certification: CERTIFIED EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490 in docs/handoffs/2026-07-24-1841-codex-vm536-witch-certification.md. Certification commit placeholder: PENDING_VM536_CERTIFICATION_COMMIT_SHA. Prior program base: fa88363b7a09ed326a0f15484388e7f2b8fce9ef. Candidate workflow commit: f654abd2ad52ae41571e6b476bc26a87e90de514. Independent review commit: 5a5291f50fc90cfc3f3592e53cb7ae9907b57309.

Certification validation: npm.cmd ci passed. npm.cmd test initially failed only because ignored data/scryfall/raw/oracle-cards.json was missing; after adding the ignored hardlink to the local control corpus, full npm.cmd test passed. WITCH semantic readiness with fixtures passed; source/generated guardrails passed; faction-context isolation passed; parser passed; placement passed; semantic candidate scope passed; exact WITCH candidate scope passed; all 24 GWUB permutations stayed metadata-only/non-canonical; required neighbor/generic rejection probes passed; preview invariant passed. Byte-strict provenance check and the final provenance step of npm.cmd run test:semantic-readiness reported the known CRLF-only stale warning, and normalized provenance parity passed with 2066 entries.

Counts: certified identity count is 35 of 37. Wave 5 is 5 of 5 certified and complete.

Non-goals: No remediation, Excel update, VM-537 Colorless, VM-538 WUBRG, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, force operation, semantic candidate edit, or replacement candidate occurred.

APPROVE EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490
