# VM-004 - Archscry Result Narrative + UX Polish

ID: VM-004
Title: Archscry Result Narrative + UX Polish
Status: done
Type: feature
Area: Archscry, Maze, Commander discovery
Priority: high
Created: 2026-05-15

## Summary

Upgrade Archscry result pages from diagnostic output into Vox Mana dossier copy: faction-native result narrative, beginner-friendly explanations, richer Commander next steps, simplified mana-base guidance, hidden Apocrypha links until ready, and preserved return paths between Archscry and Maze.

## Source

User-provided "VM-004 - Archscry Result Narrative + UX Polish" prompt in Codex thread.

## Acceptance Criteria

- No raw internal phrases like `specific grievance` appear in user-facing result copy.
- No unexplained `CI WR` notation appears.
- Placement summary is reframed in Vox Mana voice.
- Flavor Echoes explain why each card was selected.
- Land section does not repeat the same cards in a visual grid and redundant text table.
- Deck-start links include EDHREC, Moxfield, MTGGoldfish, Archidekt, MTGDecks, Scryfall, and Maze where practical.
- `Read In Apocrypha` and source shelf links are hidden until destinations are ready.
- Maze pages opened from Archscry show a visible return path to the originating dossier.
- Adjacent fit pages show a clear return path to the primary dossier.
- Save with Google prompt appears only near the bottom action area.
- Each result connects faction lore role, mechanical expression, and table experience.
- Close adjacent fits explain the faction-level fork instead of only score proximity.
- Existing tests pass or blockers are documented.

## Files Likely Impacted

- `assets/js/index.js`
- `archscry/index.html`
- `maze.html`
- `research/research-init.js`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/*.md`

## Risks

- Result rendering is broad and user-facing; keep logic changes inside presenter/render helpers.
- Current working tree already contains VM-003 changes; do not revert or overwrite unrelated edits.
- Scryfall and Maze deep-link patterns vary by site; prefer conservative search URLs over fragile guessed routes.
- The narrative layer must stay skimmable and not become long lore exposition.

## Implementation Prompt

Preserve Archscry placement data and Commander recommendations while adding a narrative presentation layer, clearer tag and faction interpretation, richer deck-start links, simplified mana-base lanes, hidden Apocrypha links, and durable Archscry-to-Maze return context.

## Notes

- Use `data/taxonomy/vox-mana-tags.json` for tag explanations.
- Preserve Scryfall index loading and Maze search behavior.
- Do not touch generated faction artifacts or raw faction lore.
- Completed with a presenter-layer approach: placement/model logic remains unchanged.
- Browser verification used a local static server and system Edge, with external Scryfall requests stubbed.
