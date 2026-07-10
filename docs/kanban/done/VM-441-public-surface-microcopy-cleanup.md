# VM-441 - Public Surface Microcopy Cleanup

Status: Done
Owner: Codex
Created: 2026-06-30
Completed: 2026-06-30
Source audit: VM-439

## Summary

Clean smaller user-facing copy issues from Maze, Apocrypha, and Strategium without changing behavior.

## Scope

- Replace Maze's ornamental empty state with actionable search guidance.
- Rename "Best counterspells" to "Counterspell examples".
- Replace Apocrypha "deep dives" category copy with "overviews" language.
- Replace Apocrypha "deck-start framing" with Commander browsing/playstyle boundary language.
- Replace time-sensitive Strategium "current Game Changers" assertions with safer pod-disclosure wording.

## Acceptance Criteria

- Maze empty states tell the user how to begin.
- Apocrypha source group copy avoids generic "deep dive" phrasing.
- Strategium does not assert current Commander policy or current Game Changer status.
- No search behavior, storage behavior, source links, or Strategium data structure changes.

## Validation

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:maze-finds` - passed.
- `npm.cmd run test:syntax` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Related

- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/kanban/done/VM-426-reading-finds-dossier-reflection.md`
- `docs/kanban/done/VM-416-strategium-content-pass.md`
