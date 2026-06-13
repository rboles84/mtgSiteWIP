ID: VM-291
Title: Dossier Research Packet Warning Alignment
Status: Done
Type: Documentation Alignment
Area: Commander Dossier, Research, Audit
Priority: medium

## Summary

Aligned the Commander dossier research packet with the deduped warning inventory so the packet is a reliable implementation input for `W001` through `W004` and clearly separates `W005` through `W461` as mechanical land-cleanup work.

## Scope

- Corrected stale or overstated warning-mapping language in `docs/research/vox_mana_dossier_research_packet.md`.
- Clarified four-color commander coverage as one conservative face plus local Scryfall validation before expansion.
- Corrected the land-warning cross-reference to the actual land-warning note.
- Added a short implementation-readiness section.

## Out Of Scope

- Canonical faction data edits.
- Runtime code edits.
- Generated dossier snapshot edits.
- Audit policy changes.
- MTG card fact expansion beyond clarifying existing packet wording.

## Acceptance Criteria

- The packet explicitly maps `W001` through `W004` to the inventory repair classes.
- The packet marks `W005` through `W461` as out-of-scope mechanical land cleanup and points to the correct section.
- No blanket claim remains that all priority identities have `3-6` commander candidates.
- Priority four-color commander coverage is not overstated beyond the listed single-face fallbacks.
- Validation searches confirm the stale `§14`, blanket `3-6 commander candidates`, and misleading four-color `3-4` claims are removed or clarified.

## Validation Results

- Passed: stale-pattern search found no hits for the old land-warning `§14` reference, the blanket `3-6 commander candidates` wording, the misleading priority four-color `3-4` commander claim, or `Banlist baseline (verified)`.
- Passed: warning-map readback confirms `W001` through `W004` are explicitly mapped and `W005` through `W461` points to `§21`.
- Passed: follow-up search found the only remaining `3-4` style wording is about starter-card category size, not commander counts.
- Passed: touched-file trailing-whitespace scan returned no hits.
- Passed: `git diff --check -- docs/kanban/board.md docs/research/vox_mana_dossier_research_packet.md` exited cleanly, with only Git's existing LF-to-CRLF warning for `docs/kanban/board.md`.

## Not Touched

- Canonical faction data.
- Runtime code.
- Generated dossier snapshots.
- Audit policy.
- Local Scryfall data.
- Broad land-warning cleanup.
