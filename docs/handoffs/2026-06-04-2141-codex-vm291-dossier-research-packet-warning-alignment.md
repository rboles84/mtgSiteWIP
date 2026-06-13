## Agent

Codex

## Task Requested

Implement the Research Packet Alignment Plan by aligning `docs/research/vox_mana_dossier_research_packet.md` with the deduped dossier warning inventory, correcting overstated four-color commander coverage, fixing the stale land-warning cross-reference, and keeping the work documentation-only.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1437-codex-vm289-dossier-audit-contract-repair-and-hardening.md`
- `docs/handoffs/2026-06-04-1633-codex-vm290-dossier-warning-fix-inventory.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/done/VM-290-dossier-warning-fix-inventory.md`
- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
- `docs/research/vox_mana_dossier_research_packet.md`

## Files Changed

- `docs/research/vox_mana_dossier_research_packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-291-dossier-research-packet-warning-alignment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-2141-codex-vm291-dossier-research-packet-warning-alignment.md`

## What Changed

- Corrected the warning mapping so `W004` describes commander candidate guidance rather than fully validated candidates.
- Corrected the `W005-W461` land-warning pointer from `§14` to `§21`.
- Replaced the blanket claim that each identity has `3-6` commander candidates with a coverage-specific summary.
- Clarified that Yore, Glint, Dune, and Ink currently provide one conservative canonical/precon-derived face commander each, and require a local Scryfall query before any additional four-color commander expansion.
- Added an implementation-readiness section separating ready-to-author content, conservative four-color fallback use, local-validation requirements, and out-of-scope land warnings.
- Softened the banlist wording from a verified baseline to implementation verification required, because this slice did not externally fact-check date-sensitive legality claims.
- Removed two trailing spaces found in the touched research packet during closeout validation.

## Why It Changed

The warning inventory is the implementation source of truth. The research packet was useful for `W001` through `W004`, but it overstated four-color commander coverage and pointed land warnings to the wrong section. The packet now tells the next implementer exactly which warning groups it can support and which groups remain separate mechanical cleanup.

## Decisions Made

- Keep the packet documentation-only and do not convert it into canonical source data.
- Treat four-color commander additions conservatively: one listed face is usable as a fallback after validation; additional recommendations require local Scryfall query evidence.
- Keep `W005-W461` land warnings out of MTG information research and route them to source-data dedupe/normalization.
- Avoid claiming external banlist facts are verified in this packet unless a later implementation pass checks them.

## Risks / Uncertainties

- The repo had substantial pre-existing drift before this slice, including many unrelated tracked changes and untracked files. This work intentionally touched only the packet and VM-291 coordination docs.
- The research packet still contains candidate MTG facts that need local Scryfall validation before authoring.
- The packet does not reduce land warnings by itself; those remain a separate mechanical cleanup track.

## Tests Run

- Stale-pattern search for `§14`, blanket `3-6 commander candidates`, misleading priority four-color `3-4` commander claims, and `Banlist baseline (verified)` - passed with no hits.
- Warning-map and final-summary readback - passed.
- Search for `3-4` / `3-6` style count language - passed; only remaining `3-4` wording is starter-card category size.
- Touched-file trailing-whitespace scan - passed with no hits after cleanup.
- `git diff --check -- docs/kanban/board.md docs/research/vox_mana_dossier_research_packet.md` - passed, with Git's LF-to-CRLF warning for `docs/kanban/board.md`.

## Not Touched

- `assets/js/commander-dossier.js`
- `data/factions.json`
- `research/dossier-runner.mjs`
- Generated dossier snapshots
- Audit semantics
- Local Scryfall data
- Land-warning cleanup

## Follow-Up Recommendations

- Use the packet to author `W001` through `W004` fixes only after local Scryfall validation.
- Open a separate mechanical cleanup card for `W005-W461` land dedupe and normalization.
- If the team wants richer four-color commander recommendations, run local Scryfall queries first and record the evidence before authoring.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-291-dossier-research-packet-warning-alignment.md`
- `docs/kanban/done/VM-290-dossier-warning-fix-inventory.md`
- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
- `docs/research/vox_mana_dossier_research_packet.md`
