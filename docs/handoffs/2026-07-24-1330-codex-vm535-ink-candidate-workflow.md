# VM-535 Ink Candidate Workflow Record

Agent name: Codex

Task requested: Record candidate-workflow governance for the exact VM-535 Ink semantic candidate after candidate creation. This task was governance only; independent review and certification were not authorized.

## Program State

- Ticket: VM-535
- Identity: INK
- Display name: Ink / Altruism
- Display color order: RGWU
- Accepted alias: INK only
- Metadata/query-only forms: RGWU, WURG, and all RGWU same-color permutations
- Branch: codex/vm-535-ink-semantic-recovery
- Worktree: C:\dev\mtgSiteWIP-crit001-vm535-ink
- Program base: 8a4f273e75842f97debbcdbc70009da7845e41d4
- Gate 1+2 commit: 4305482967f21be4a5c58c2f97fda2a848fc60c2
- Exact semantic candidate: 9cefe57611552e563ab7601f2f32fc2c9eeac566
- Candidate parent proof: 9cefe57611552e563ab7601f2f32fc2c9eeac566^ = 4305482967f21be4a5c58c2f97fda2a848fc60c2
- Candidate-workflow governance commit: PENDING_VM535_CANDIDATE_WORKFLOW_SHA
- Current program-base branch: codex/crit001-program-base remains 8a4f273e75842f97debbcdbc70009da7845e41d4

## Files Reviewed

- AGENTS.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-535-ink-semantic-recovery.md
- docs/incidents/CRIT-001-drift-control-template.md
- docs/incidents/CRIT-001-operating-playbook.md
- docs/incidents/CRIT-001-drift-register.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/handoffs/2026-07-24-0813-codex-vm535-ink-gate1-gate2.md
- docs/handoffs/2026-07-24-0030-codex-vm534-dune-candidate-workflow.md
- docs/handoffs/2026-07-23-2138-codex-vm533-glint-candidate-workflow.md

## Candidate Files Changed

- data/factions.json
- data/placement-model.json
- data/raw-factions/ink/ink.changelog.json
- data/raw-factions/ink/ink.claims.json
- data/raw-factions/ink/ink.placement.json
- data/raw-factions/ink/ink.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/ink.semantic-fixtures.json

## Governance Files Changed

- docs/handoffs/2026-07-24-1330-codex-vm535-ink-candidate-workflow.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/incidents/CRIT-001-drift-register.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/incidents/recoveries/VM-535-ink-semantic-recovery.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-535-ink-semantic-recovery.md

## What Changed

This governance record documents that exact semantic candidate 9cefe57611552e563ab7601f2f32fc2c9eeac566 was created for VM-535 Ink as a direct child of Gate 1+2 commit 4305482967f21be4a5c58c2f97fda2a848fc60c2. The candidate remains the only semantic object ready for independent exact-SHA review.

No semantic candidate file was edited during this workflow-governance task.

## Why It Changed

CRIT-001 requires the semantic candidate and the workflow governance record to remain separate. This commit records the Ink candidate's chain, scope, validation, baseline movement, alias boundaries, neighbor probes, preview invariant, warnings, and non-goals so an independent reviewer can evaluate the exact candidate SHA rather than a workflow commit.

## Baseline Before And After

Before candidate:

- 5 claims
- 0 substantive / 5 unclassified
- 9 INK provenance rows
- 4 null canonical IDs
- no fixture

After candidate:

- 5 claims
- 5 substantive / 0 unclassified
- 13 INK provenance rows
- 0 null canonical IDs
- 30 fixtures

## Alias And Permutation Behavior

- Identity-layer aliases remain exactly ["INK"].
- All 24 RGWU permutations remain metadata/query-only.
- Reject-alias probes passed for RGWU, WURG, and color-order-as-canonical-key.

## Neighbor Rejection Probes

Passed for DUNE, WITCH, BANT, JESKAI, NAYA, TEMUR, GENERIC_RGWU, GENERIC_FOUR_COLOR_COMMANDER, GENERIC_GROUP_HUG, GENERIC_SHARED_RESOURCES, KYNAIOS_ONLY, STALWART_UNITY_ONLY, INK_TREADER_ONLY, COMMANDER_LEGALITY, OFFICIAL_NAME, and BLACK_PRESENT_COLLAPSE.

## Preview Invariant

- Raw preview_eligible remains false.
- Generated identity-layer preview retained.
- Generated preview matches embedded data/factions.json preview.

## Validation Summary

- npm.cmd ci passed.
- Full npm.cmd test passed after adding ignored Scryfall corpus hardlink.
- INK semantic readiness passed.
- Provenance check passed with 2063 entries.
- Source/generated guardrails passed for INK.
- Faction-context isolation passed.
- Parser passed.
- Placement passed.
- Semantic-readiness regression bundle passed.
- Audit target passed.

## Unstaged Byproducts

Known unstaged byproducts were left unstaged:

- data/placement-model.schema.json
- docs/audits/gate-compression/live-gate-bias.json
- docs/audits/gate-compression/live-gate-bias.md
- supabase/functions/guild-recruiter/faction-context.ts
- ignored data/scryfall/raw/oracle-cards.json
- ignored node_modules/

## Warnings

- Git repeatedly warned that C:\Users\obake/.config/git/ignore could not be accessed due permission denial.
- Windows checkout emitted LF/CRLF warnings.
- npm.cmd ci reported inherited package audit advisories; no dependency fix or package staging occurred.

## Decisions Made

- INK remains canonical.
- Ink / Altruism remains the display name.
- RGWU remains display metadata only.
- INK remains the only accepted alias.
- RGWU, WURG, and same-color permutations remain metadata/query-only and fail closed.
- Program base remains 8a4f273e75842f97debbcdbc70009da7845e41d4.
- Candidate is ready for independent exact-SHA review only.

## Risks / Uncertainties

Independent review has not yet occurred. Certification has not occurred. The workflow commit is not a semantic candidate and must not be reviewed or certified as the recovery SHA.

## Not Touched

No independent review, certification, program-base advancement, Excel update, VM-536 Witch work, VM-537 Colorless work, VM-538 WUBRG work, GitHub remote authority, semantic candidate edits, replacement candidate creation, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

## Follow-Up Recommendations

Perform independent exact-SHA review of 9cefe57611552e563ab7601f2f32fc2c9eeac566 from a separate review window.

## Next Suggested Agent

Independent Reviewer for VM-535 exact candidate 9cefe57611552e563ab7601f2f32fc2c9eeac566.

## Related Kanban Card, Docs, Or Plans

- docs/kanban/in-progress/VM-535-ink-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-drift-register.md
- docs/handoffs/2026-07-24-0813-codex-vm535-ink-gate1-gate2.md

READY FOR INDEPENDENT REVIEW EXACT SHA 9cefe57611552e563ab7601f2f32fc2c9eeac566
