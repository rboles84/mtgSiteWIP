# VM-485 - Maze Modal Mana Pips

## Status

Done

## Summary

Render Scryfall mana notation in the Maze card-detail modal with locally vendored Mana Font pips while preserving Oracle text, accessibility, modal behavior, and Reading Finds boundaries.

## Scope

- Vendor the runtime Mana Font assets from pinned `mana-font@1.18.0` with source and license notes.
- Link the local Mana stylesheet from `maze/index.html`.
- Render supported Scryfall symbols in modal mana costs and Oracle text with `ms`, verified symbol classes, and `ms-cost`.
- Keep visible modal text brace-free for rendered and fallback symbols.
- Preserve Oracle punctuation, spacing, and line breaks.
- Extend deterministic browser smoke coverage for required basic, generic, special, hybrid, Phyrexian, half, and unsupported symbols.
- Update manual QA and record the implementation handoff.

## Acceptance Criteria

- `{7}{R}` and `{4}{R}` render as actual Mana Font pips in the modal.
- `{T}`, `{C}`, `{X}`, `{S}`, `{E}`, a supported hybrid symbol, a supported Phyrexian symbol, and a supported half-mana symbol use classes present in the vendored CSS.
- Unsupported brace tokens remain readable without braces and do not throw.
- Symbol elements expose useful accessible labels/titles while visible cost and Oracle text contain no raw notation for the covered fixtures.
- Oracle punctuation, spacing, and line breaks are unchanged around symbols.
- Browser smoke validates vendored classes statically and verifies modal rendering on desktop and mobile.

## Not In Scope

- Maze parser, compiler, query, or generated Scryfall grounding behavior.
- Live Scryfall data or network behavior.
- Reading Finds storage or Archscry handoff contracts.
- Modal focus/close architecture or broader Maze layout.
- Unrelated chips and badges.

## Related Work

- VM-483 / VM-484 Maze and Scryfall query semantics.
- VM-448 deterministic browser smoke.
- VM-405 / VM-426 modal and Reading Finds boundaries.
- VM-456 term-preserving player language.

## Completion Notes

- Vendored and documented the exact `mana-font@1.18.0` runtime subset with no CDN dependency.
- Replaced modal-only text chips/raw Oracle notation with verified Mana Font classes and accessible labels.
- Added readable unsupported-symbol fallback behavior and preserved Oracle punctuation, spacing, and line breaks.
- Extended VM-448 browser smoke with static class/font validation and desktop/mobile modal assertions.
- Completed live browser QA against `Abomination, World Ravager` at desktop and `390px` mobile width.
- Follow-up screenshot review corrected pip optical centering by matching line height to pip height, keeping the casting-cost row neutral, and applying a gentler baseline offset only inside Oracle text.
