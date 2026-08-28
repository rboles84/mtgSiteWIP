# VM-590 - Implicit Maze / The Loom V0 Red-Team Review

ID: VM-590
Title: Implicit Maze / The Loom V0 Red-Team Review
Status: Done
Type: Product UX review
Area: Implicit Maze / Loom v0
Priority: High
Created: 2026-08-27

## Source

Owner requested an adversarial review of the Implicit Maze, especially The Loom mode card, with attention to icons, layout, context, usage, and replacing ad hoc color circles with Vox Mana’s established mana pips.

## Verdict

Proceed with a review-only, no-runtime-change pass. The smallest safe version is a prioritized rendered UX report that distinguishes a bounded Loom v0 presentation repair from unapproved Loom v1 graph work.

Review level: QA-0 for the documentation artifact, supported by real desktop/mobile product inspection.
Stop condition: stop before runtime, query-semantic, parser, placement, generated-data, or Loom v1 work.

## Scope

- Inspect current Loom decisions, handoffs, route ownership, HTML, CSS, runtime state, and focused tests.
- Exercise the real `/maze/` route at desktop and mobile widths.
- Evaluate the mode card, icon language, mana colors/pips, composition, context handoff, action order, accessibility, and likely usage.
- Produce a bounded improvement direction and identify decisions required before implementation.

## Protected Behavior

- The approved Loom v0/v1 naming split and public `The Loom` label.
- Existing builder state, mode IDs/actions, `#search-input`, and `MazeQueryResult.query` ownership.
- Parser/query semantics, Scryfall execution, results, modal, Reading Finds, and Archscry return contracts.
- VM-583 owner-accepted mobile grid behavior.
- Placement, identity semantics, generated data, and unrelated untracked research.

## Outcome

- [x] Mandatory pre-flight completed with RobDev and RobQA authorities.
- [x] Recent Loom/Maze handoffs, cards, decisions, owning files, tests, and protected contracts reviewed.
- [x] Desktop 1440 × 1000 and mobile 390 × 844 rendered paths inspected.
- [x] Real W/U + Creature + Commander + Flying builder interaction exercised.
- [x] Prioritized findings and a bounded Loom v0 layout/icon/pip direction recorded.
- [x] No runtime, data, parser, placement, source, generated, branch, or worktree changes made.

## Deliverable

- `docs/reports/2026-08-27-implicit-maze-loom-red-team.md`

## Follow-Up Boundary

Create a separate implementation card only after the owner resolves the default Commander color/operator meaning and accepts the bounded Loom v0 direction. Keep VM-010 Loom v1 work separate.
