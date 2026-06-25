# 2026-06-20 21:31 - Codex - VM-414 Apocrypha Visual Alignment

## Agent Name

Codex

## Task Requested

Fix Apocrypha so it no longer looks visually separate from the same Vox Mana public-site
family, after the owner flagged color and page-grammar differences against the Strategium
screenshot.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-19-2339-codex-vm413-typography-implementation.md`
- `docs/handoffs/2026-06-15-0940-codex-vm400-apocrypha-release-train-publish.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-06-14-1724-codex-vm391-archscry-strategium-visual-waiver.md`
- `docs/handoffs/2026-05-26-2308-codex-vm142-maze-strategium-glass.md`
- `docs/handoffs/2026-05-25-2322-codex-vm133-strategium-glass-readability-polish.md`
- `docs/handoffs/2026-05-25-2340-codex-vm134-apocrypha-hero-unification.md`
- `apocrypha/index.html`
- `strategium/index.html`
- `assets/css/apocrypha.css`
- `assets/css/strategium.css`
- `assets/css/tokens.css`
- `assets/css/components.css`
- `assets/css/atmosphere.css`
- `assets/css/layout.css`

## Files Changed

- `assets/css/apocrypha.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-20-2131-codex-vm414-apocrypha-visual-alignment.md`

## What Changed

- Retuned Apocrypha's route-local variables to the Strategium public-route palette:
  white display text, clearer muted copy, cooler atmospheric glow, flatter glass, and
  white panel lines.
- Removed the Apocrypha-only sepia/dim overlay stack that made the shared gateway
  background read warmer and darker than Strategium.
- Changed the first viewport from split hero cards to a full-width hero panel plus a
  second full-width At A Glance panel.
- Converted the At A Glance commitments into nested glass cards and centered later section
  headings to better match the Strategium route rhythm.
- Retuned lower Reference Library surfaces and dividers away from the old warm archive
  palette.

## Why It Changed

The owner confirmed that Apocrypha could not remain visually separate from the rest of the
site. Prior VM-387/VM-134 decisions intentionally preserved a more ornate archive look, but
that difference became too strong after VM-413 typography unification removed the old Google
font stack and made route-level color differences more visible.

## Decisions Made

- Used Strategium as the visual target because it is the screenshot comparison and has the
  established VM-133/VM-142 public-route glass recipe.
- Kept the work CSS-only and Apocrypha-local.
- Preserved source-library content, ids, anchors, source links, route JS, disclosure behavior,
  library alias behavior, and all data/source contracts.
- Refreshed only the ignored Apocrypha visual baseline after inspecting the intentional
  desktop, mobile, and reference-library diffs.

## Risks / Uncertainties

- This is a stronger visual alignment than the previous Apocrypha-specific archive identity;
  owner visual taste remains the final acceptance layer.
- The route still has a Library Rail and reference-specific content structure, so it is not a
  clone of Strategium, but it now shares the same first-viewport color and glass grammar.
- The working tree already contains VM-413 changes and regenerated audit outputs; this task
  did not normalize unrelated dirty files.

## Tests Run

- PASS `node --check assets/js/apocrypha.js`
- PASS `git diff --check -- assets/css/apocrypha.css docs/kanban/board.md docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-20-2131-codex-vm414-apocrypha-visual-alignment.md`
- PASS scoped legacy-font `rg` check over Apocrypha route files returned no hits.
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run test:frontend-smoke`
- EXPECTED FAIL `npm.cmd run test:visual:apocrypha` before baseline refresh: large intentional diffs against the old Apocrypha look.
- PASS `npm.cmd run test:visual:apocrypha:baseline`
- PASS `npm.cmd run test:visual:apocrypha` after baseline refresh with `0` mismatched pixels.
- PASS `npm.cmd test`

## Not Touched

- `apocrypha/index.html`
- `assets/js/apocrypha.js`
- `strategium/index.html`
- `assets/css/strategium.css`
- Placement logic, generated placement data, source packets, claim ledgers, Scryfall,
  Supabase, Commander facts, route aliases, and route behavior.

## Follow-Up Recommendations

- Owner should visually compare `/apocrypha/` and `/strategium/` together after VM-414.
- If the route still needs more convergence, the next pass should decide whether the
  Apocrypha side rail remains as a route-specific affordance or moves to a Strategium-like
  section stack.

## Next Suggested Agent

Owner visual QA, then Codex for any final CSS polish.

## Related Kanban Card, Docs, Or Plans

- VM-414
- VM-413
- VM-387
- VM-133
- VM-142
