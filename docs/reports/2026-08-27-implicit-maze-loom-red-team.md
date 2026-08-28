# Implicit Maze / The Loom V0 Red-Team Review

Date: 2026-08-27
Related card: VM-590
Review scope: current shipped `/maze/` route, with emphasis on The Loom mode card and Loom v0 visual builder
Runtime changes: none

## Verdict

The Loom works as a deterministic Scryfall query builder, but its current presentation overpromises a distinct visual tool and underdelivers the “loom” metaphor. The mode is identified by its name and gold outline rather than by a coherent icon, thread model, or composition. On desktop it reads as a wide conventional filter form. On mobile the user encounters the query field and five action controls before reaching the controls that create the query.

The safest improvement is a bounded Loom v0 presentation and interaction pass. It should reuse the existing builder, query contract, Mana Font, mode state, and search execution. It should not begin Loom v1 graph work.

## Pre-Flight Summary

### Recent related work

- VM-129 through VM-129G established the current Maze console, separated the three modes, balanced the Loom header, added the two-row query field, and made Reset Board return Loom to its default state.
- VM-449 locked the public language around “Visual query,” “Shape,” and “Set constraints” to avoid deckbuilder and recommendation-engine drift.
- VM-457 synthesized the Loom foundation and separated the shipped filter builder from the future graph-aware product.
- VM-466 approved the naming split: current Visual Builder is Loom v0; graph-aware concept work is Loom v1; the public tab may remain “The Loom.”
- VM-485 added the locally vendored Mana Font to Maze modal costs and Oracle text.
- VM-570 moved Maze runtime ownership from `research/` to `assets/js/maze/` without changing behavior.
- VM-583 corrected the mobile search-control grid and is owner-accepted; its max-content mobile stack is protected.

### Current known risks

- A presentation repair can accidentally become unapproved Loom v1 concept-graph work.
- Color controls encode real Scryfall semantics; changing the default operator is a product/query decision, not styling.
- The protected mode IDs, action hooks, `#search-input`, builder state, `MazeQueryResult.query`, Scryfall execution, Reading Finds, and Archscry handoff must remain stable.
- The current browser session contained a Jund dossier-return context. That exposed a useful context problem but does not authorize automatic placement-aware filtering.

### Files recently changed or controlling this surface

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `assets/js/maze/maze-query-core.js`
- `tests/maze/research-builder-tests.js`
- `tests/maze/research-mode-tests.js`
- `docs/contracts/maze-query-contract.md`

### Do not touch in a follow-up without expanded scope

- Loom v1 concept registry, graph canvas, threads, card interpreter, or placement bridge
- parser grammar or executable-query ownership
- Scryfall response semantics, result rendering, modal behavior, or Mana Font vendor assets
- Reading Finds persistence, Archscry return state, generated data, placement scoring, or identity semantics
- the unrelated untracked `docs/research/maze-player-language/corpus/` work

## Rendered Evidence

The route was exercised through the real browser at 1440 × 1000 and 390 × 844.

- The builder generated `c=wu t:creature f:commander kw:flying` from White + Blue, Creature, Commander, and Flying.
- Desktop containment passed with no observed horizontal overflow.
- Mobile containment passed: document width was 375 CSS pixels and scroll width was also 375.
- Each mana-color control measured 32 × 32 pixels at mobile width.
- At 390 × 844, the Loom builder began around document Y 1122 after the three mode cards, context panel, query field, Search, Clear, Copy, Open in Scryfall, and Reading Finds controls.
- With a valid generated default query (`f:commander`), the main Copy and Open in Scryfall actions remained disabled until a search was run.
- In the Jund return context, the Loom did not show whether Jund was applied, intentionally ignored, or merely available as context.

## Findings

### RT-01 — High: the name promises a visual reasoning tool; the surface is a conventional filter form

The mode card says “Visual query” and “The Loom,” but the active surface has no loom/thread icon, no connected selection summary, no progressive thread, and no visual distinction beyond the same gold treatment used by the other modes. “Query loom” repeats the name without explaining the mental model.

Why it matters: a user selecting The Loom expects an alternative way to see and shape relationships. What appears is a familiar form with filters, selects, and a generated query box. This weakens both discoverability and trust in the name.

Smallest correction: give Loom v0 a specific thread/connection sigil and a visibly connected constraint-to-query composition. Do not add a graph.

### RT-02 — High: mobile presents execution before construction

In Loom mode, the query field and every action appear before the builder. On mobile this becomes a long sequence: default query, Search, Clear, disabled Copy, disabled Open in Scryfall, Reading Finds, then the controls that shape the query.

Why it matters: the page teaches the wrong order. The primary action is available before the user reaches the defining interaction, and the builder is more than one viewport below the selected Loom card.

Smallest correction: in builder mode, render the Loom controls before the execution footer. Keep the protected `#search-input` and existing action hooks, but compose them as the board’s live-query footer. Desktop can use a two-column builder + live-query panel; mobile should follow `mode -> context -> constraints -> generated query -> Search/Copy/Open`.

### RT-03 — High: Commander-first color intent is ambiguous and can produce an unexpectedly narrow query

White + Blue with the default “exactly” operator emits `c=wu`, while “commander identity” is a separate option. A Commander user may reasonably read the pips as “cards I can use in a White-Blue deck,” but the current default asks for cards whose colors are exactly White and Blue. Mono-White and mono-Blue cards are therefore outside that query.

Why it matters: this is not cosmetic. It changes result meaning and is easy to miss because the operator sits below the pips and the route defaults to Commander.

Required decision before implementation: decide whether Loom v0’s Commander-first default means exact card colors, colors included, colors at most, or Commander color identity. The UI should then name that choice in player language and show the emitted operator beside it. Do not silently change the query default as part of a visual pass.

### RT-04 — Medium: the color controls contradict Vox Mana’s established mana-pip system

The Maze already loads `assets/vendor/mana/css/mana.min.css` and already maps W/U/B/R/G/C to `ms-w`, `ms-u`, `ms-b`, `ms-r`, `ms-g`, and `ms-c`. The Loom instead draws colored circles containing text letters. Black is presented as purple, and the controls do not look like the pips used in Maze modal and Archscry surfaces.

Why it matters: color identity is a core product language. A bespoke substitute makes the most MTG-native control look less authentic than surrounding content.

Smallest correction: render the existing Mana Font glyphs inside buttons, retain canonical WUBRGC order and accessible names, and make the entire control at least 44 × 44 pixels. Use a visible selected ring/check treatment that does not depend on color alone. Do not recolor the whole Loom card; pips should carry the chromatic signal.

### RT-05 — Medium: generated-query capability and actions disagree

The builder exposes a valid generated query immediately, including the default `f:commander`, yet Copy and Open in Scryfall remain disabled until after Search. The same syntax is displayed in both the main query field and the Generated Syntax panel.

Why it matters: the interface says the query exists while its obvious actions say it does not. Duplicate syntax also consumes substantial vertical space without adding interpretation.

Smallest correction: use one authoritative live-query presentation in Loom mode and enable Copy/Open whenever the generated query is valid. Preserve `#search-input` as the state/contract owner even if its builder-mode presentation changes.

### RT-06 — Medium: dossier context is present but its effect on Loom is unknowable

The reviewed session said “Following Jund from Jund dossier,” while all Loom pips remained unselected and the builder defaulted only to Commander. That may be correct under the approved rule that placement-aware Loom behavior is future work, but the interface does not explain it.

Why it matters: users can assume Jund is already constraining results or assume the handoff was lost.

Smallest correction: show a compact context chip near the Loom heading, such as `Dossier context: Jund · not applied to filters`. Do not auto-select or weight anything until the planned placement bridge is separately approved.

### RT-07 — Medium: the builder lacks semantic and optical grouping

Colors, types, format, rarity, mana value, and keywords are visually presented as repeated rows, but the controls are not grouped as named form groups in the accessibility tree. The full-width Format select dominates the board; the tiny mana pips—the most important visual choice—are subordinate. “Exactly” sits on a new grid row and looks detached from Colors.

Why it matters: the form is scannable only after the user learns its structure. Keyboard and assistive-technology users receive individual control names without a strong group model.

Smallest correction: group controls under three visible and semantic regions:

1. Color identity — pips plus a clearly labeled matching rule.
2. Card shape — type, rarity, and mana value.
3. Search scope — format and keywords.

Use `fieldset`/`legend` or equivalent labelled groups. Keep focus order identical to the visual order.

### RT-08 — Low: mode-icon and color naming are internally incoherent

The supplied active card can receive `teal-mode`, but `.mode-card.on.teal-mode` currently resolves to the same gold treatment as `.mode-card.on`. Maze variables named `--maze-teal` and `--maze-teal-line` also contain gold values.

Why it matters: this does not break the user experience, but it invites future styling mistakes and suggests that Loom once depended on a color distinction that no longer exists.

Smallest correction: in a later scoped cleanup, rename only route-local presentation aliases after proving no consumer depends on them. This is not required for the first Loom improvement.

## Recommended Visual Direction For Loom V0

### Icons

- Give all three mode cards a consistent 18–22 pixel engraved line-sigil slot so Loom is not the only decorated mode.
- Plain Reading: an open folio or speech/rune mark.
- Operator’s Hand: an operator/bracket sigil, not a generic terminal app icon.
- The Loom: two curved strands crossing through three small nodes. It should imply weaving constraints into one query without resembling a future graph canvas.
- Mark these icons decorative when the adjacent title already names the mode.
- Use mana pips only for mana-color state, not as the Loom mode icon.

### Color

- Keep gold as the route-wide active/focus accent.
- Use the canonical Mana Font W/U/B/R/G/C pips for color selection and the live summary.
- Avoid a teal wash or a rainbow card background. Color should be localized to pips and selected thread nodes so the result remains legible and Vox Mana-native.
- Give every selected pip a non-color cue: outer gold ring, inset mark, and `aria-pressed=true`.

### Layout

Desktop:

```text
[ Plain Reading ] [ Operator's Hand ] [ The Loom + thread sigil ]

[ Loom context: Visual query | Commander default | Jund context not applied ]

┌ Shape the query ────────────────────┬ Live thread ─────────────────────┐
│ Color identity                     │ W U  · Creature · Flying         │
│  (W)(U)(B)(R)(G)(C)                │ c=wu t:creature f:commander ...  │
│  Match: [player-language choice]    │                                 │
│                                    │ [Search] [Copy] [Open]           │
│ Card shape                         │                                 │
│  Type / rarity / mana value        │                                 │
│                                    │                                 │
│ Search scope                       │                                 │
│  Commander / keywords              │                                 │
└────────────────────────────────────┴─────────────────────────────────┘
```

Mobile:

```text
The Loom + context
Color identity
Card shape
Search scope
Live generated query
Search / Copy / Open
Reading Finds
```

### Context and usage

- State the Commander default where the user begins, not only in the emitted syntax.
- Make Reset Board honest: it resets optional filters while restoring the visible Commander default.
- If a dossier context exists, label whether it is informative or applied.
- Keep “The Loom” as the approved mode name, but replace the redundant heading “Query loom” with an action heading such as “Shape the query.”
- Preserve the anti-fit boundary: Loom finds cards and explains the query; it does not build a deck, rank the best cards, or claim placement-aware relevance.

## Smallest Safe Implementation Slice

1. Recompose Loom v0 without new semantics: builder controls before the action footer, one live-query surface, explicit Commander default, grouped controls, and a Loom sigil.
2. Replace letter discs with existing local Mana Font pips and 44-pixel accessible toggle targets.
3. Enable generated-query actions when a valid builder query exists.
4. Add an explicit non-applied dossier-context label when a handoff is present.
5. Stop for owner judgment on the default color/operator meaning before changing query output.

This slice reuses the existing mode, builder state, query core, Mana Font, and action handlers. Loom v1 Explorer Mode remains in VM-010 and should not be pulled into this repair.

## RobQA Classification For A Future Implementation

- Baseline: QA-2 because the change would alter component composition and action availability.
- Escalate to QA-3 if DOM reordering changes focus, mode-switch, or search transitions.
- Escalate to QA-4 if the color-operator default or emitted query meaning changes.
- Required rendered cases: 1440 × 1000, 820-pixel intermediate width, 390 × 844, and 320-pixel narrow width.
- Required interaction cases: first entry, mode switch in both directions, W/U/C pip toggling, color-rule selection, type/rarity/CMC/keyword composition, Copy/Open before Search, Reset Board, dossier context, keyboard focus order, repeat use, and no overflow.
- Full placement, semantic, mutation, or exhaustive engine suites are not justified unless query meaning changes.

## Owner Decisions Needed Before Runtime Work

1. In Commander mode, should selected pips mean exact card colors, included colors, at-most colors, or Commander identity?
2. Should the live-query panel be a right-side desktop rail and bottom mobile footer, or remain full width beneath grouped constraints?
3. Is `Dossier context: Jund · not applied` the right explicit boundary until Loom v1 placement bridging exists?
4. Does the proposed crossed-strands sigil fit Vox Mana’s visual language, or should it be developed from an existing route sigil?
