# Codex Handoff: VM-292 Dossier Warning Content Repair

## Agent Name

Codex

## Task Requested

Use the MTG research information already provided in `docs/research/vox_mana_dossier_research_packet.md` to fix the covered Commander dossier audit warnings, then validate and close the work.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1437-codex-vm289-dossier-audit-contract-repair-and-hardening.md`
- `docs/handoffs/2026-06-04-1633-codex-vm290-dossier-warning-fix-inventory.md`
- `docs/handoffs/2026-06-04-2141-codex-vm291-dossier-research-packet-warning-alignment.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/done/VM-290-dossier-warning-fix-inventory.md`
- `docs/kanban/done/VM-291-dossier-research-packet-warning-alignment.md`
- `docs/research/vox_mana_dossier_research_packet.md`
- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
- `artifacts/dossier-snapshots/dossier-audit-report.md`
- `data/factions.json`
- `assets/js/commander-dossier.js`
- `research/audit-dossiers.mjs`
- `research/dossier-runner.mjs`
- `research/archscry-dossier-followup-tests.js`
- `data/scryfall/raw/oracle-cards.json`
- `data/scryfall/indexes/commander-index.json`

## Files Changed

- `data/factions.json`
- `assets/js/commander-dossier.js`
- `research/archscry-dossier-followup-tests.js`
- `artifacts/dossier-snapshots/dossier-audit-report.md`
- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-292-dossier-warning-content-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-2246-codex-vm292-dossier-warning-content-repair.md`

## What Changed

- Added packet-backed starter-card staples to the top-level `data.factions` records used by the dossier runner for `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`, `YORE`, `GLINT`, `DUNE`, and `INK`.
- Added locally validated commander faces to `CURATED_LEGENDARY_CREATURE_STAPLES` and gave those faces specific `commanderStapleDescription()` copy so they no longer trip the generic commander fallback audit.
- Covered primary commander recommendation expectations for `BANT`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`, `YORE`, `GLINT`, `DUNE`, and `INK`.
- Kept four-color recommendations conservative: `YORE` uses Breya, `GLINT` uses Yidris, `DUNE` uses Saskia, and `INK` uses Kynaios and Tiro as support-only single-face fallbacks.
- Updated focused dossier follow-up assertions so authored Yore/Abzan starter-card coverage is expected instead of the old advisory warning state.
- Regenerated the dossier audit report and warning inventory from the current audit output.
- Moved VM-292 from In Progress to Done on the Kanban board.

## Why It Changed

VM-291 aligned the research packet with the warning inventory, but it intentionally stopped before source-data/runtime edits. The user then confirmed the packet information was intended to fix the warnings, so VM-292 authored the researched starter-card and commander recommendation coverage into the dossier source path.

## Decisions Made

- Used existing `staples` plus curated legendary whitelist behavior instead of adding a new commander data model.
- Targeted the top-level `data.factions` records because the dossier runner reads those records for starter-card and commander preview coverage.
- Did not invent additional four-color commander candidates beyond locally validated single-face support fallbacks.
- Left the remaining land-warning surface untouched because it is a separate dedupe/source-normalization track, not an MTG research content task.
- Treated the unchanged `warnings: 104` audit headline as a generated-file warning count; the refreshed report and inventory confirm the remaining warning content is land-only.

## Risks / Uncertainties

- `data/factions.json` has been used as the active dossier source for this repair, but future builder regeneration could overwrite these authored staples if equivalent source inputs are not propagated upstream.
- The repo was already in a broad dirty state from prior VM work. Several touched files contain pre-existing drift mixed with VM-292 edits in raw `git diff` output.
- The remaining 327 unique exact warning entries are still real land-source cleanup work and should be handled by a separate mechanical cleanup card.

## Tests Run

- Local Scryfall starter-card validation: 85 proposed names checked, 0 missing.
- Local Scryfall commander-face validation: all added commander faces found in `data/scryfall/indexes/commander-index.json`.
- Commander preview diagnostic:
  - Bant 3
  - Abzan 3
  - Temur 3
  - Sultai 3
  - Mardu 3
  - Jeskai 2
  - Yore 1
  - Glint 1
  - Dune 1
  - Ink 1
- `npm.cmd run dossier:audit`
  - Passed: `Pass: 0; warnings: 104; failures: 0`
  - Optional content gaps: none
  - Commander recommendation warnings: none
  - Commander path identity warnings: none
  - Remaining warnings: land-source cleanup only
- `node research/archscry-dossier-followup-tests.js`
  - Passed: `PASS archscry dossier follow-up tests`
- `npm.cmd test`
  - Passed full suite.
- Warning inventory validation:
  - 327 exact warning entries
  - 327 unique entries
  - 0 duplicates
  - no stale starter/commander warning phrases
- `git diff --check -- data/factions.json assets/js/commander-dossier.js research/archscry-dossier-followup-tests.js docs/kanban/board.md artifacts/dossier-snapshots/dossier-warning-fix-inventory.md artifacts/dossier-snapshots/dossier-audit-report.md`
  - Passed with line-ending normalization warnings only.

## Not Touched

- Remaining duplicate/source land warning cleanup.
- Generated dossier markdown manual edits.
- Audit-policy loosening.
- Home naming, visual regression, or Lighthouse harness work.
- Local Scryfall source files.
- Unrelated dirty-worktree cleanup.

## Follow-Up Recommendations

- Create a separate land-source normalization card to remove the remaining duplicate land warnings from canonical land recommendation inputs.
- If the team expects `data/factions.json` to be regenerated from raw/build artifacts, propagate the VM-292 starter-card additions into the true upstream source before running a broad rebuild.
- Keep the refreshed warning inventory as the source of truth for the next land cleanup slice.

## Next Suggested Agent

JSON Cartographer for the land-source dedupe/normalization follow-up.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-292-dossier-warning-content-repair.md`
- `docs/kanban/done/VM-291-dossier-research-packet-warning-alignment.md`
- `docs/kanban/done/VM-290-dossier-warning-fix-inventory.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/research/vox_mana_dossier_research_packet.md`
- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
