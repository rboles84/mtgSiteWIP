# VM-535 Ink Gate 1+2 Preflight

Agent name: Codex

Task requested: Start official VM-535 Ink semantic recovery from exact VM-534 certification/program base and record Gate 1+2 preflight before semantic edits.

Files reviewed: AGENTS.md; docs/handoffs/HANDOFF_INDEX.md; docs/kanban/board.md; docs/kanban/backlog/VM-535-ink-semantic-recovery.md; docs/incidents/CRIT-001-drift-register.md; docs/incidents/CRIT-001-identity-recovery-ledger.json; docs/incidents/CRIT-001-identity-recovery-ledger.md; data/factions.json; data/placement-model.json; data/raw-factions/ink/*; data/semantic-readiness-provenance.json; semantic readiness validators.

Files changed: this handoff; HANDOFF_INDEX.md; board; VM-535 card move to in-progress; CRIT drift register; CRIT ledger JSON/Markdown.

What changed: Created official branch/worktree `codex/vm-535-ink-semantic-recovery` / `C:\\dev\\mtgSiteWIP-crit001-vm535-ink` from exact program base `8a4f273e75842f97debbcdbc70009da7845e41d4` and recorded read-only Gate 1+2 baseline for INK before semantic remediation.

Why it changed: CRIT-001 requires each identity to have a committed drift/Gate 1+2 record before Gate 3+4 semantic edits. VM-534 Dune is certified; VM-535 Ink is next in Wave 5.

Decisions made: INK is the canonical key. Display name is Ink / Altruism. Display color order is RGWU. Accepted alias remains INK only. RGWU, WURG, and all same-color permutations remain metadata/query-only and must fail closed unless repository rules later prove otherwise.

Current Ink baseline:
- 5 claims, all unclassified.
- 13 sources: 3 claim-bearing, 1 discovery-only, 4 shaping-only, 5 support-only.
- No semantic fixture file.
- Semantic provenance baseline has 3 INK rows, 0 null canonical IDs, 0 missing hashes.
- Raw preview is disabled; generated identity-layer preview is present/retained by generated data.
- Baseline readiness validation fails for missing semantic_role on all claims, missing recruiter guidance evidence mappings, profile/discriminator/collision references without substantive claims, Dune/Witch missing neighbor claim references, and missing fixtures.
- Baseline audit reports DUNE and WITCH as collision neighbors and identifies low-volume/support-heavy/invalid-reference fingerprint.
- Baseline provenance byte check reports stale; this is a pre-remediation diagnostic to be reconciled during candidate validation.

Expected candidate-scope files:
- data/factions.json
- data/placement-model.json
- data/raw-factions/ink/ink.changelog.json
- data/raw-factions/ink/ink.claims.json
- data/raw-factions/ink/ink.placement.json
- data/raw-factions/ink/ink.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/ink.semantic-fixtures.json

Known defects or gaps: unclassified claims; missing fixture; stale/generated provenance parity diagnostic; DUNE/WITCH neighbor claim contamination in collision guidance; missing evidence mappings for mismatch guidance; profile and placement authoritative rows lack substantive claim owners.

Risks / uncertainties: The board in the VM-534 certification base still had a stale VM-534 In Progress row despite VM-534 certification; this governance update removes that stale row while moving VM-535 into progress. CRLF/stat-only validation byproducts from prior tasks are not candidate files.

Tests run: Program-base proof PASS; commit existence PASS; branch/path collision checks PASS; worktree creation PASS; baseline audit PASS exit 0; baseline semantic readiness validation expected FAIL; baseline provenance check expected FAIL/stale.

Not touched: No semantic remediation, candidate commit, independent review, certification, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, Excel update, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

Follow-up recommendations: Proceed to INK-only Gate 3+4 remediation in this branch after this Gate governance commit.

Next suggested agent: Codex VM-535 INK candidate workflow.

Related Kanban card: docs/kanban/in-progress/VM-535-ink-semantic-recovery.md

READY FOR GATE 3 REMEDIATION
