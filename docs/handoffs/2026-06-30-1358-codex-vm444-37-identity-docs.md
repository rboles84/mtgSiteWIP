# Codex Handoff - VM-444 Canonical 37-Identity Documentation Reconciliation

## Agent Name

Codex

## Task Requested

Proceed with the VM-429 Section 11/12/14 execution plan by implementing the first open readiness ticket after VM-440 through VM-443 were already completed: reconcile active 30/36 identity-count documentation to the current 37-identity runtime and Home Identity Signal truth.

## Files Reviewed

- `C:\Users\obake\.codex\attachments\8f9dd8ab-db18-4428-90e7-26d3911a5407\pasted-text-1.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-1351-codex-vm440-443-voice-copy-repair.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `docs/handoffs/2026-06-29-0143-codex-vm427-main-promotion-sweep.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/placement-domains.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/colorless-source-readiness-matrix.md`
- `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md`
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `docs/architecture/colors/esper/identity.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/`

## Files Changed

- `docs/architecture/project-atlas.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/placement-domains.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/colorless-source-readiness-matrix.md`
- `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md`
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `docs/architecture/colors/esper/identity.md`
- `docs/kanban/done/VM-444-canonical-37-identity-docs-reconciliation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-1358-codex-vm444-37-identity-docs.md`

## What Changed

- Created and closed VM-444 as a docs-only readiness ticket.
- Updated active architecture/reference docs to describe the current live placement set as 37 identities.
- Updated manual QA placement sanity and mono rollout checks to expect 37 factions/golden paths.
- Updated Colorless decision/source-readiness docs with VM-444 notes explaining that VM-334/VM-362/VM-372 did not approve Home preview at their time, while VM-389 later approved Home Identity Signal preview membership only.
- Updated the old WUBRG plan to label its matrix as a historical 2026-06-10 capture, not current runtime truth.
- Updated the Esper identity evidence floor so it no longer claims Home preview is disabled.

## Why It Changed

VM-429 and VM-430 identified stale 30/36 identity-count documentation as a trust and release-readiness issue. Current source/generated/runtime evidence shows 37 live placement identities and 37 Home Identity Signal preview identities, so active docs needed one canonical story while preserving older decision records as historical context.

## Decisions Made

- Treated VM-440 through VM-443 as already complete and started the remaining execution queue at VM-444.
- Kept VM-444 docs-only.
- Preserved historical cards, handoffs, and decision records instead of rewriting them as if later VM-389 decisions had already happened.
- Used `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, VM-389, and VM-427 validation evidence as current count authority.
- Did not edit runtime behavior, generated JSON, placement logic, Home signal behavior, route structure, visual baselines, Supabase, localStorage keys, or VM-422 account/deck-link behavior.

## Risks / Uncertainties

- Historical docs still contain older phrases such as `preview_eligible: false` or WUBRG absence inside explicitly superseded sections. This is intentional history preservation, not current authority.
- Existing unrelated dirty-tree changes from VM-428 through VM-443 remain present and were not staged, committed, or reverted.
- The source/generated validator still reports existing warning-only JESKAI/MARDU model-owned inhibitor notes.

## Tests Run

- `rg "30-expression|36-expression|active 36|live 30|30 factions|30 golden|Current counts remain at 36|Home preview remains disabled" docs\architecture docs\reference` - no matches.
- `rg "37 live placement|37 Home Identity|37-identity|37 identities|37 v1|37 factions|37 golden" docs\architecture docs\reference docs\kanban\done\VM-389-v1-home-identity-signal-promotion.md docs\handoffs\2026-06-29-0143-codex-vm427-main-promotion-sweep.md` - confirmed current 37-identity references.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run validate:source-generated` - passed with 2 existing warning-only inhibitor notes.

## Not Touched

- Runtime code, generated data, source packets, Archscry/Maze behavior, Home signal implementation, visual baselines, Supabase SQL/RLS, VM-422 account/deck-link implementation, external Obsidian vault files, git staging, committing, pushing, or branch changes.

## Follow-Up Recommendations

- Continue the execution queue with VM-445: restore or document the canonical profile Supabase RLS source artifact.
- Keep VM-446 live deck-link RLS proof gated on real Supabase env vars and credentials.
- Add VM-447 CI only after deciding the minimal no-secret validation set.

## Next Suggested Agent

Documentation Steward or security-focused Codex pass for VM-445 profile SQL/RLS source restoration.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-444-canonical-37-identity-docs-reconciliation.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `docs/handoffs/2026-06-29-0143-codex-vm427-main-promotion-sweep.md`
- `docs/handoffs/2026-06-30-1351-codex-vm440-443-voice-copy-repair.md`
