# VM-396 - Apocrypha Reference Shelf Progressive Disclosure

Status: Done
Owner: Codex
Type: UX / Front-End Enhancement
Area: Apocrypha route (`apocrypha/index.html`, `assets/css/apocrypha.css`)
Priority: Medium
Created: 2026-06-14
Closed: 2026-06-14
Depends On: VM-395 (Apocrypha Official MaRo Source Links) — must land first

## Summary

Convert the Apocrypha Public Reference Library's large `Official Wizards / Mark Rosewater`
group from an always-open wall of ~39 links into collapsible "shelves" using native
`<details>`/`<summary>` progressive disclosure. At rest the group reads as a short, scannable
index (one row per sub-shelf with a title, a one-line "Used for" scent line, and a source
count); links appear only when a shelf is expanded. Nothing is removed or hidden from the
page source — every link remains one click away — so the Apocrypha transparency contract is
preserved. This fulfils the Quick Guide's "start with the shelf that matches your question"
promise that the current flat layout breaks.

## Source

User request (2026-06-14): the `Start with the shelf that matches your question` experience
and specifically the `Official Lore` reference group is "a long scroll, makes it kind of hard
to read. Most people don't want to see all that info on the screen." Senior-design review in
the same session confirmed the MaRo group holds ~39 links across 4 sub-cards while sibling
groups hold 1-3, producing a lopsided, scroll-heavy library. This card is the follow-up
content/UX pass anticipated by the VM-388 note.

## Current State

- `apocrypha/index.html` `#ledger` section, first `.apoc-library-group`
  (`Official Wizards / Mark Rosewater`) contains 4 `.apoc-reference-card` blocks, each an
  always-open `<ul class="apoc-reference-links">`:
  - Foundational color philosophy — 10 links
  - Current color voice and governance — 10 links
  - Ravnica guild design — 12 links
  - Alara shard and three-color design — 7 links
- The other five groups are short single-link `.apoc-reference-card`s and are NOT in scope.
- `.apoc-library-grid` is content-height (VM-388); the tall MaRo card dominates the row.
- Route CSS is unlayered; reduced-motion handled in `@media (prefers-reduced-motion: reduce)`
  at `assets/css/apocrypha.css` plus the global token reset.

## Design Spec (the approved approach)

Pattern: native `<details class="apoc-shelf">` per sub-group. No JS framework, no ARIA
authoring required (native semantics), keyboard + screen-reader correct out of the box.

Component anatomy (replaces the 4 `.apoc-reference-card` blocks in the MaRo group only):

```
.apoc-library-group  (unchanged outer glass panel)
  .apoc-library-group__head  + NEW count chip ("39 sources")
  .apoc-shelf-list
    <details class="apoc-shelf">          x4
      <summary class="apoc-shelf__bar">
        chevron (rotate on [open]) · <h4> title + "used for" subline · count chip ("10")
      .apoc-shelf__body
        <ul class="apoc-reference-links"> ... existing links, reused verbatim ...
```

Behaviour / states:
- Default: first shelf `open`, remaining three collapsed.
- Hover: summary border brightens to `--apoc-line-strong`.
- Focus: `summary:focus-visible` -> 2px gold ring (`--gold-l`), offset 2px; hide the native
  marker (`summary{list-style:none}` + `::-webkit-details-marker{display:none}`).
- Open: chevron rotates 180deg (`transform`, 180ms ease).
- The `Used for:` text moves UP into the summary subline (information scent before expand).

Motion: chevron transition only; body reveal defaults to instant. Optional polish:
`grid-template-rows: 0fr -> 1fr` animated open (no max-height hacks). Reduced motion: add
`.apoc-shelf .chev` and `.apoc-shelf__body` to the existing reduced-motion block so all
shelf transitions are `none`.

Responsive:
- >=980px: when a shelf is open, flow its `<ul>` into 2 columns
  (`columns: 2; column-gap: var(--s-5)`) for lists of >=6 items, to halve open height.
- <980px / <=720px: single column (existing breakpoints).
- Summary tap target min-height 44px.

Styling tokens (reuse, do not invent colors): body bg `--apoc-nested-glass`; border
`--apoc-nested-line`; radius `--apoc-radius-nested`; open/hover border `--apoc-line-strong`;
count chip restyles the existing `.apoc-pill` gold recipe. New classes only:
`.apoc-shelf`, `.apoc-shelf__bar`, `.apoc-shelf__body`, `.apoc-shelf__count`,
`.apoc-shelf-list`. The now-redundant `.apoc-reference-card` rules for the MaRo sub-cards may
remain (still used by single-link groups) — do not delete shared classes other groups use.

Accessibility:
- Keep sub-shelf titles at `<h4>` level inside the summary to preserve the document outline.
- Chevron icon `aria-hidden="true"`; summary text carries the accessible name.
- Count chips get visually-hidden "sources" text or `aria-label` so "10" reads as "10 sources".
- `@media print { .apoc-shelf__body { display:block !important } }` so everything prints open
  (transparency intact for print/no-JS).

## Acceptance Criteria

1. At rest, the `Official Wizards / Mark Rosewater` group occupies roughly one viewport
   instead of ~3-4; only the first sub-shelf is expanded.
2. All ~39 MaRo links remain in the page source and reachable on the same page; none removed,
   none converted to raw URLs.
3. Keyboard: Tab reaches each `<summary>`, Enter/Space toggles, visible gold focus ring.
4. Screen reader announces each shelf as a collapsible group with its source count.
5. Reduced motion: no chevron or body animation.
6. No new JS file required (optional <=a few lines only if animated-open is added).
7. Visual identity unchanged — same glass surfaces, gold accents, Cinzel/Crimson type;
   existing five non-MaRo groups untouched.
8. No horizontal overflow at desktop, tablet, and mobile widths.
9. The five short single-link groups are left as plain `.apoc-reference-card`s (not in scope).

## Files Likely Impacted

- `apocrypha/index.html` — MaRo group markup in `#ledger` only.
- `assets/css/apocrypha.css` — add `.apoc-shelf*` rules; add reduced-motion + print entries.
- `scripts/visual-regression-apocrypha.mjs` baselines — `references-desktop` (and any mobile
  references snapshot) will need review + refresh.
- `docs/reference/manual-test-cases.md` — add the disclosure QA case.

## Risks / Guardrails

- Visual-regression baseline churn on `references-desktop` is EXPECTED, not a bug: review the
  diff as targeted, then refresh the baseline (per VM-388 workflow).
- Do not alter `.vm-bg`, atmosphere, topbar, or token files.
- Do not reword link copy or `Used for` text beyond relocating it.
- Do not expose raw URLs; do not remove or reorder any links.
- Do not touch the hero, Quick Guide, How Used, Phase 2 vault, or Not Published sections.
- Sequence AFTER VM-395 lands, or rebase onto its MaRo markup to avoid a collision.

## Verification

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git diff --check`
- `npm.cmd run test:visual:apocrypha` (expect FAIL on `references-desktop` before baseline)
- review diff is targeted -> `npm.cmd run test:visual:apocrypha:baseline`
- `npm.cmd run test:visual:apocrypha` (PASS after refresh)
- Manual `/apocrypha/` QA at desktop + mobile: keyboard toggle, focus ring, reduced-motion,
  no horizontal overflow, all links reachable.

## Boundaries

- Do not touch placement logic, generated data, raw faction packets, commander facts, source
  claim ledgers, route aliases, or non-Apocrypha pages.
- Do not add, remove, or reword sources; this is a presentation-only restructure.

## Closeout

- Implemented native `<details class="apoc-shelf">` shelves for only the first `Official Wizards / Mark Rosewater` library group.
- Preserved the surrounding MaRo group copy, all 39 MaRo links, all link text/hrefs/order/attributes, and the existing non-MaRo reference cards.
- Added a `39 sources` group chip and `10 / 10 / 12 / 7` shelf count chips with accessible source labels.
- Added CSS-drawn chevrons, native-marker suppression, gold outline focus, reduced-motion transition suppression, print-open shelf bodies, and container-safe link columns.
- Used the existing Apocrypha nested glass tokens and `.apoc-pill` chip recipe; no JS or new data source was added.
- Refreshed the Apocrypha visual baseline after reviewing the expected `references-desktop` diff as targeted.

## Closeout Verification

- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS, with existing CRLF warnings only.
- `npm.cmd run test:visual:apocrypha` before baseline - expected FAIL: `references-desktop` exceeded budget; hero captures remained under budget with page-height/scrollbar-only drift.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` after baseline - PASS with `0 / 0 / 0` mismatched pixels.
- Manual-style browser QA at 1366x900 and 390x844 - PASS: Tab reached all four summaries, Enter/Space toggled shelves, reduced-motion transitions were suppressed, gold focus outline remained visible, chevrons rendered in both states, all 39 MaRo links were reachable after expansion, and no horizontal overflow appeared.

## Implementation Prompt (for Codex)

> Pre-flight first: read `AGENTS.md`, `docs/handoffs/HANDOFF_INDEX.md`, this card
> (`docs/kanban/ready/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`),
> VM-395, and the VM-387 / VM-388 handoffs. Confirm VM-395's `Official Wizards / Mark
> Rosewater` markup is present in `apocrypha/index.html`; if VM-395 is not yet merged,
> stop and report rather than guessing the markup.
>
> Task: In the Apocrypha `#ledger` section, restructure ONLY the first library group
> (`Official Wizards / Mark Rosewater`) so its four sub-groups become collapsible shelves
> using native `<details class="apoc-shelf">` / `<summary class="apoc-shelf__bar">`.
> Each summary shows a chevron, the sub-group `<h4>` title, the existing `Used for:` line
> moved up as a dim subline, and a source-count chip. Reuse the existing
> `<ul class="apoc-reference-links">` link lists verbatim inside `.apoc-shelf__body` — do not
> add, remove, reorder, or reword any links, and do not expose raw URLs. Add a total source
> count chip ("39 sources") to the group head.
>
> Defaults: first shelf `open`, the other three collapsed. Hide the native marker, add a
> gold `summary:focus-visible` ring, rotate the chevron on `[open]` (180ms). On >=980px flow
> open lists with >=6 items into 2 columns. Add `.apoc-shelf .chev` and `.apoc-shelf__body`
> to the existing `@media (prefers-reduced-motion: reduce)` block, and a print rule forcing
> bodies open. Reuse `--apoc-nested-glass` / `--apoc-nested-line` / `--apoc-radius-nested` /
> `--apoc-line-strong` and the `.apoc-pill` gold chip recipe — introduce no new color values.
> Keep sub-shelf titles at `<h4>`; chevron `aria-hidden`; count chips get an accessible
> "sources" label. New CSS classes only: `.apoc-shelf`, `.apoc-shelf-list`,
> `.apoc-shelf__bar`, `.apoc-shelf__body`, `.apoc-shelf__count`. Do not delete shared classes
> still used by the five single-link groups, and leave those five groups unchanged.
>
> Then verify in order: `npm.cmd run lint:html`, `npm.cmd run lint:js`,
> `npm.cmd run test:frontend-smoke`, `npm.cmd test`, `git diff --check`,
> `npm.cmd run test:visual:apocrypha` (expect `references-desktop` to fail), review the diff
> is the targeted shelf change only, then `npm.cmd run test:visual:apocrypha:baseline` and
> re-run `npm.cmd run test:visual:apocrypha` to PASS. Do manual `/apocrypha/` desktop +
> mobile QA: keyboard Tab/Enter/Space toggle, visible focus ring, reduced-motion off-state,
> no horizontal overflow, every link still reachable. Update
> `docs/reference/manual-test-cases.md`, write a handoff in `docs/handoffs/`, update
> `docs/handoffs/HANDOFF_INDEX.md`, move this card to `done/`, and update
> `docs/kanban/board.md`. Report files changed and tests run. Do not touch placement logic,
> generated data, raw packets, commander facts, claim ledgers, route aliases, or any
> non-Apocrypha page.

## Notes

- Recommended scope is the MaRo group only; if other groups grow multi-item later, roll the
  same `.apoc-shelf` pattern to them under a new card.
- Two design defaults chosen for the user: (a) first shelf open rather than all-collapsed, to
  avoid an empty-looking panel; (b) MaRo group only. Either can be revisited.
