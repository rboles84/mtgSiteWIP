# VM-535 Ink Semantic Recovery

Status: Ready for independent exact-SHA review

Identity: INK / Ink / Altruism

Exact program base: 8a4f273e75842f97debbcdbc70009da7845e41d4

Gate 1+2 governance: 4305482967f21be4a5c58c2f97fda2a848fc60c2

Exact semantic candidate: 9cefe57611552e563ab7601f2f32fc2c9eeac566

Candidate parent proof: 9cefe57611552e563ab7601f2f32fc2c9eeac566^ = 4305482967f21be4a5c58c2f97fda2a848fc60c2

Candidate branch/worktree: codex/vm-535-ink-semantic-recovery / C:\dev\mtgSiteWIP-crit001-vm535-ink

Candidate files changed: data/factions.json; data/placement-model.json; data/raw-factions/ink/ink.changelog.json; data/raw-factions/ink/ink.claims.json; data/raw-factions/ink/ink.placement.json; data/raw-factions/ink/ink.profile.json; data/semantic-readiness-provenance.json; research/fixtures/semantic-readiness/ink.semantic-fixtures.json.

Summary: The exact candidate remediates INK only, preserving INK as the canonical key, Ink / Altruism display, RGWU display metadata, and INK-only accepted aliasing. It records 5 substantive claims, 13 INK provenance rows with zero null canonical IDs, generated Ink parity, and 30 semantic fixtures.

Baseline: before candidate, Ink had 5 claims, 0 substantive / 5 unclassified, 9 INK provenance rows, 4 null canonical IDs, and no fixture. After candidate, Ink has 5 claims, 5 substantive / 0 unclassified, 13 INK provenance rows, 0 null canonical IDs, and 30 fixtures.

Alias and neighbor behavior: identity-layer aliases remain exactly ["INK"]; all 24 RGWU permutations remain metadata/query-only; RGWU, WURG, and color-order-as-canonical-key reject-alias probes passed. Neighbor rejection probes passed for DUNE, WITCH, BANT, JESKAI, NAYA, TEMUR, GENERIC_RGWU, GENERIC_FOUR_COLOR_COMMANDER, GENERIC_GROUP_HUG, GENERIC_SHARED_RESOURCES, KYNAIOS_ONLY, STALWART_UNITY_ONLY, INK_TREADER_ONLY, COMMANDER_LEGALITY, OFFICIAL_NAME, and BLACK_PRESENT_COLLAPSE.

Preview invariant: raw preview_eligible remains false; generated identity-layer preview is retained; generated preview matches embedded data/factions.json preview.

Validation: npm.cmd ci passed; full npm.cmd test passed after adding ignored Scryfall corpus hardlink; INK semantic readiness passed; provenance check passed with 2063 entries; source/generated guardrails passed for INK; faction-context isolation passed; parser passed; placement passed; semantic-readiness regression bundle passed; audit target passed.

Unstaged byproducts: data/placement-model.schema.json, docs/audits/gate-compression/live-gate-bias.json, docs/audits/gate-compression/live-gate-bias.md, supabase/functions/guild-recruiter/faction-context.ts, ignored data/scryfall/raw/oracle-cards.json, and ignored node_modules/ were not staged.

Warnings: Git reported permission denial for C:\Users\obake/.config/git/ignore, Windows checkout emitted LF/CRLF warnings, and npm.cmd ci reported inherited package audit advisories. No dependency fix or package staging occurred.

Non-goals: No independent review, certification, program-base advancement, Excel update, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, force operation, semantic candidate edit, or replacement candidate occurred.

READY FOR INDEPENDENT REVIEW EXACT SHA 9cefe57611552e563ab7601f2f32fc2c9eeac566
