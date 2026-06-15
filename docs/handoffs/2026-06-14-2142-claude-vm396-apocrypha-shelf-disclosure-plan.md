# Handoff - VM-396 Apocrypha Reference Shelf Progressive Disclosure (Plan)

- Date: 2026-06-14 21:42
- Agent: Claude (Planning Architect role)
- Task requested: Produce a full deep plan to fix the long-scroll `Official Lore` /
  `Official Wizards / Mark Rosewater` reference group on Apocrypha, inject it as a Kanban
  card, and provide a ready-to-run Codex implementation prompt. Planning only — no runtime,
  markup, or style files changed.

## Files Reviewed

- `apocrypha/index.html` (hero, Quick Guide `#decks`, Reference Library `#ledger`, How Used,
  Phase 2, Not Published)
- `assets/css/apocrypha.css` (full, 1310 lines) and `assets/css/tokens.css`
- `assets/js/apocrypha.js`
- `AGENTS.md`, `CLAUDE.md`, `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`
- VM-395 (in progress), VM-388 and VM-387 cards (done)

## Files Changed

- `docs/kanban/ready/VM-396-apocrypha-reference-shelf-progressive-disclosure.md` (new card)
- `docs/kanban/board.md` (added VM-396 to Ready)
- `docs/handoffs/HANDOFF_INDEX.md` (new top row)
- `docs/handoffs/2026-06-14-2142-claude-vm396-apocrypha-shelf-disclosure-plan.md` (this file)

No runtime, markup, CSS, JS, data, or generated files were modified.

## What Changed

Created a follow-up UX card (VM-396) specifying a native `<details>`/`<summary>` collapsible
"shelf" redesign for the Apocrypha `Official Wizards / Mark Rosewater` reference group only.
Default state shows one expanded shelf plus three collapsed summaries (title + relocated
`Used for` scent line + source-count chip), turning ~39 always-visible links into a short
scannable index. Card includes design spec, acceptance criteria, responsive + a11y +
reduced-motion + print specs, verification commands, boundaries, and an embedded Codex
implementation prompt.

## Why It Changed

User reported the section is a long scroll that is hard to read and shows too much at once.
The flat all-open layout also breaks the Quick Guide's "start with the shelf that matches your
question" promise. Progressive disclosure compresses the default view while keeping every link
in the page source, preserving Apocrypha's public-transparency contract.

## Decisions Made

- Pattern: native `<details>` (no JS framework, accessible by default) over tabs or a separate
  page — best fit for the transparency contract and the shelf metaphor.
- Scope: MaRo group only; the five single-link groups stay as plain cards.
- Defaults: first shelf open (not all-collapsed) to avoid an empty-looking panel.
- Reuse existing `--apoc-*` glass/nested tokens and the `.apoc-pill` chip; no new colors.
- Card placed in `ready/` with an explicit dependency on VM-395, which owns the MaRo markup.

## Risks / Uncertainties

- Sequencing: VM-395 (in progress) creates the MaRo markup VM-396 restructures. If VM-396 is
  picked up before VM-395 merges, the implementer must stop or rebase onto VM-395's markup.
- Visual-regression baseline churn on `references-desktop` is expected and must be reviewed
  before refresh.
- The optional animated-open (`grid-template-rows` technique) must not violate the
  reduced-motion contract; instant reveal is the safe default.

## Tests Run

None (planning only). Verification commands for the implementation are enumerated in the card.

## Not Touched

`apocrypha/index.html`, `assets/css/apocrypha.css`, `assets/js/apocrypha.js`, tokens,
atmosphere, topbar, placement logic, generated data, raw packets, commander facts, claim
ledgers, route aliases, and all non-Apocrypha pages.

## Follow-Up Recommendations

1. Land VM-395 first.
2. Assign VM-396 to Codex using the embedded Implementation Prompt.
3. If other library groups later grow multi-item, extend the `.apoc-shelf` pattern under a new
   card rather than widening VM-396.

## Next Suggested Agent

Codex (implementation), after VM-395 completes.

## Related Kanban Card, Docs, Or Plans

- Card: `docs/kanban/ready/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- Depends on: VM-395 (in progress)
- Precedent: VM-388 (card spacing; the "content follow-up" note), VM-387 (glass contract)
