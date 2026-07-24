# VM-536 Witch Gate 1+2 Preflight

Agent name: Codex

Task requested: Start official VM-536 Witch semantic recovery from exact VM-535 certification/program base and record Gate 1+2 preflight before semantic edits.

Files reviewed: AGENTS.md; docs/handoffs/HANDOFF_INDEX.md; docs/kanban/board.md; docs/kanban/backlog/VM-536-witch-semantic-recovery.md; docs/incidents/CRIT-001-drift-control-template.md; docs/incidents/CRIT-001-drift-register.md; docs/incidents/CRIT-001-operating-playbook.md; docs/incidents/CRIT-001-identity-recovery-ledger.json; data/factions.json; data/placement-model.json; data/raw-factions/witch/*; data/semantic-readiness-provenance.json; recent VM-534 and VM-535 handoffs; Witch historical VM-264 through VM-269 and VM-298 handoff index entries; semantic readiness validators.

Files changed: this handoff; HANDOFF_INDEX.md; board; VM-536 card move to in-progress; CRIT drift register; CRIT ledger JSON/Markdown.

What changed: Created official branch/worktree `codex/vm-536-witch-semantic-recovery` / `C:\\dev\\mtgSiteWIP-crit001-vm536-witch` from exact program base `fa88363b7a09ed326a0f15484388e7f2b8fce9ef` after the specified worktree was absent, then recorded read-only Gate 1+2 baseline for WITCH before semantic remediation.

Why it changed: CRIT-001 requires each identity to have a committed drift/Gate 1+2 record before Gate 3+4 semantic edits. VM-535 Ink is certified; VM-536 Witch is next in Wave 5.

Decisions made: WITCH is the canonical key. Display name is Witch / Growth. Display color order is GWUB. Accepted alias remains WITCH only. GWUB, WUBG, and all same-color permutations remain metadata/query-only and must fail closed unless repository rules later prove otherwise. Growth remains support/display framing only, not a public alias or official universal name.

Current Witch baseline:
- 5 claims, all unclassified.
- 13 sources: 3 claim-bearing, 1 discovery-only, 4 shaping-only, 5 support-only.
- No semantic fixture file.
- Semantic provenance baseline has 9 WITCH rows, 4 null canonical IDs, and 0 missing hashes.
- Raw preview is disabled; generated identity-layer preview is present/retained by generated data.
- Baseline readiness validation fails for missing semantic_role on all claims, missing recruiter guidance evidence mappings, profile/discriminator/collision references without substantive claims, Ink/Yore missing neighbor claim references, and missing fixtures.
- Baseline candidate-scope validation reports generated/provenance proof-chain contamination from unclassified Witch claims and foreign Ink/Yore claim IDs.
- Baseline source/generated guardrails pass for WITCH.
- Baseline audit reports INK and YORE as collision neighbors and identifies low-volume/support-heavy/invalid-reference fingerprint.

Expected candidate-scope files:
- data/factions.json
- data/placement-model.json
- data/raw-factions/witch/witch.changelog.json
- data/raw-factions/witch/witch.claims.json
- data/raw-factions/witch/witch.placement.json
- data/raw-factions/witch/witch.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/witch.semantic-fixtures.json

Known defects or gaps: unclassified claims; missing fixture; stale/generated provenance parity diagnostic; INK/YORE neighbor claim contamination in collision guidance; missing evidence mappings for mismatch guidance; profile and placement authoritative rows lack substantive claim owners; raw provenance IDs are null on profile/search/site/profile rows.

Risks / uncertainties: Prior Witch notes are advisory only. Support-only Commander, Atraxa, Breed Lethality, Growth, precon rows, architecture prose, and quarantined drafts must not become substantive proof. Witch-Maw remains a bounded card anchor, not a faction, institution, doctrine, naming authority, or placement proof. Colorless and WUBRG are next identities and remain untouched.

Tests run: Program-base proof PASS; worktree HEAD proof PASS; branch/worktree creation PASS after user authorization; worktree status clean except Git global ignore permission warning; baseline audit PASS exit 0; baseline source/generated guardrail PASS; faction-context isolation PASS; baseline semantic readiness validation expected FAIL; baseline candidate-scope validation expected FAIL with WITCH-owned remediation blockers.

Not touched: No semantic remediation, candidate commit, independent review, certification, VM-537 Colorless, VM-538 WUBRG, Excel update, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

Follow-up recommendations: Proceed to WITCH-only Gate 3+4 remediation in this branch after this Gate governance commit.

Next suggested agent: Codex VM-536 WITCH candidate workflow.

Related Kanban card: docs/kanban/in-progress/VM-536-witch-semantic-recovery.md

READY FOR GATE 3 REMEDIATION
