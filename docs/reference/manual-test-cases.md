# Manual Test Cases

## Setup

1. Deploy the updated static files.
2. If you are testing the optional terminal path, deploy the updated `guild-recruiter` edge function.
3. Run the SQL in `docs/supabase-profile-update.sql`.
4. Confirm `data/factions.json` is present at the site root under `/data/factions.json`.
5. Confirm `data/placement-model.json` is present at the site root under `/data/placement-model.json`.
6. Confirm `data/precons/vox-mana-precon-catalog.json` is present at the site root under `/data/precons/vox-mana-precon-catalog.json`.
7. Confirm `data/taxonomy/vox-mana-precon-themes.json` is present at the site root under `/data/taxonomy/vox-mana-precon-themes.json`.
8. Confirm `data/identity-layers.json` is present at the site root under `/data/identity-layers.json`.

## Home visual regression harness

1. Before changing `index.html` or its route-local Home assets, run `npm.cmd run test:visual:home:baseline`.
2. Confirm baseline screenshots exist under `artifacts/visual-regression/home/baseline/` for `mobile.png`, `tablet.png`, and `desktop.png`.
3. After the extraction or route-local refactor, run `npm.cmd run test:visual:home`.
4. Confirm the compare run writes current and diff artifacts under `artifacts/visual-regression/home/current/` and `artifacts/visual-regression/home/diff/`.
5. Confirm each viewport stays within the mismatch budget and the run reports no new console or page errors beyond `console-baseline.json`.
6. Confirm the Home identity signal initializes from `data/identity-layers.json`, shows all 37 v1 preview identities, and the forced `boros` visual hook resolves through the registry alias list.
7. Confirm the Home Mana Lens reports `Still` under reduced motion, uses the tuned 9000ms cycle outside reduced motion, and still pauses on hover/focus before resuming.
8. If the harness fails, review the generated diff PNGs before accepting any visual change.

## VM-415 cross-route readability polish

1. Open `/`, `/maze/`, `/apocrypha/`, and `/strategium/` at desktop, tablet, and mobile widths.
2. Confirm Home's hero title and supporting copy fit comfortably in the first viewport without horizontal overflow or clipped text.
3. Confirm Home, Maze, and Strategium running body copy uses the text font, while headings, labels, and nav keep their display or mono treatments.
4. Confirm route h1/h2/h3 headings read as cream/parchment rather than route-by-route white or gold drift.
5. Confirm muted lede/body copy remains readable over dark art, especially Maze command copy, Apocrypha section heads, and Strategium hero/intro panels.
6. Hover and keyboard-focus the shared desktop nav links; confirm the visible label stays unchanged and the short orientation hint appears without changing hrefs or adding persistent popovers.
7. Open the mobile utility menu; confirm desktop nav links are hidden, cloned menu links stay readable, and hidden nav hint spans do not display inside the menu.
8. Run visual compares for Home, Apocrypha, Strategium, and Archscry when topbar changes are involved; classify expected readability diffs without refreshing baselines.

## VM-147A Home route manual QA

1. Open `/` and `/index.html`; confirm both load the canonical Home route with no broken asset requests.
2. Confirm `index.html` still loads `assets/js/graph.js`, `assets/css/home.css`, and `assets/js/home.js`.
3. Confirm the shared topbar marks Home as active, opens and closes the utility menu, and keeps Archscry, Maze, Apocrypha, and Strategium links working.
4. Confirm the hero copy, WUBRG glyph row, route cards, and footer/back-to-top behavior render correctly.
5. Confirm the identity signal radar renders through Chart.js, initializes from `data/identity-layers.json`, and shows the expected overlay pills and held-signal details.
6. Confirm normal animation still runs: star atmosphere moves, reveal sections become visible, and the Mana Lens cycles unless hovered, focused, hidden, or latched.
7. Enable reduced motion and confirm the hero signal reports `Still`, reveal sections are visible without scroll animation, and glyph/canvas motion is materially reduced.
8. Check mobile, tablet, and desktop widths for no horizontal overflow, clipped chart content, or topbar/menu overlap.
9. Confirm the initial load has no console errors beyond known environment-only font or favicon noise already filtered by the visual harness.
10. If any stale-code candidate cannot be proven unused, leave it in place and record it as follow-up rather than removing it during VM-147A.

## `archscry/index.html` visual regression harness

1. Before changing `archscry/index.html` or `assets/css/archscry.css`, run `npm.cmd run test:visual:archscry:baseline`.
2. Confirm baseline screenshots exist under `artifacts/visual-regression/archscry/baseline/` for:
   - `landing-mobile.png`
   - `landing-desktop.png`
   - `dossier-placement-mobile.png`
   - `dossier-placement-desktop.png`
   - `dossier-why-mobile.png`
   - `dossier-why-desktop.png`
   - `dossier-start-mobile.png`
   - `dossier-start-desktop.png`
   - `dossier-commander-deck-starts-mobile.png`
   - `dossier-commander-deck-starts-desktop.png`
   - `dossier-starter-cards-mobile.png`
   - `dossier-starter-cards-desktop.png`
   - `dossier-mana-base-mobile.png`
   - `dossier-mana-base-desktop.png`
   - `dossier-view-all-mobile.png`
   - `dossier-view-all-desktop.png`
3. After the extraction or route-local refactor, run `npm.cmd run test:visual:archscry`.
4. Confirm the compare run writes current and diff artifacts under `artifacts/visual-regression/archscry/current/` and `artifacts/visual-regression/archscry/diff/`.
5. Confirm each capture stays within the mismatch budget and the run reports no new Archscry console or page errors beyond `console-baseline.json`.
6. If the harness fails, review the generated diff PNGs before accepting any visual change.

## VM-147B Archscry route manual QA

1. Open `/archscry/`; confirm `archscry/index.html` preserves the current CSS stack ending in `../assets/css/archscry.css` and the current JS stack through Supabase UMD, `site-flags.js`, `shared.js`, `graph.js`, module `index.js`, `reduce-motion.js`, `vm-rich-atmosphere.js`, and `vm-topbar.js`.
2. Confirm the topbar marks Archscry as active, opens and closes the utility menu, preserves route links, and still toggles reduced motion.
3. Complete the quick reading flow from landing through Gate, Hall, Crucible, result reveal, and full dossier without console errors or broken asset requests.
4. Confirm the dossier directory, focus mode, View All mode, and keyboard tab navigation still switch panels without changing URL, panel id, or focus behavior unexpectedly.
5. In the Identity Matrix, confirm the radar/glow/starfield areas render visually in browser, noting that the visual regression harness intentionally masks unstable animated or canvas surfaces.
6. Switch into an adjacent fit, return to the primary reading, and confirm the radar, axis bars, panel copy, and precon preview recompute for the active view without duplicating chart instances.
7. In the result summary strip, confirm exactly three cards render in this order: `Adjacent fit`, `Where this leads`, `Play pattern`. Confirm the strip does not show mana pips, compact identity strings, `Current fit`, `First stop`, or CTA buttons/links.
8. On desktop, confirm the middle summary card is visibly wider than the other two. On mobile, confirm the same three cards stack in the same order and the tag row hides cleanly when no tags exist.
9. Open Maze Discovery paths from the primary dossier and one adjacent dossier; confirm Maze receives the active dossier handoff and its return link still routes back to Archscry.
10. In Commander Deck Starts, confirm Recommended Precon Decks, Commander Deck Starts, Commander Lanes, starter cards, mana base sections, card-art loading, and desktop card previews still behave as before.
11. Check mobile, tablet, and desktop widths for readable panels, no obvious horizontal overflow, no clipped card art, and no topbar or dossier rail overlap.
12. Enable reduced motion and confirm Archscry keeps a static atmosphere/radar presentation without continuous animation.
13. Confirm any ambiguous stale CSS or JS ownership found during VM-147B remains in place and is recorded as follow-up rather than removed during the slice.

## VM-147C Maze route manual QA

1. Open `/maze/`; confirm `maze/index.html` preserves the current CSS stack ending in `../assets/css/maze.css` and the current JS stack through Supabase UMD, `shared.js`, module `research-init.js`, `vm-rich-atmosphere.js`, `reduce-motion.js`, and `vm-topbar.js`.
2. Confirm the shared topbar marks The Implicit Maze as active, opens and closes the utility menu, preserves route links, and still toggles reduced motion.
3. Confirm Maze boots with Discovery Paths, Helper Searches, By Color, type chips, rarity chips, default Commander format controls, and Plain Reading mode available on first load.
4. In Plain Reading, search `red vampires that sacrifice creatures`; confirm Query Inspector shows the original phrase, translated syntax, confidence/diagnostic details when present, Copy, and Open in Scryfall.
5. In Operator's Hand, search `ci<=br t:creature o:sacrifice f:commander`; confirm raw syntax, sorting, Copy, and Open in Scryfall preserve the normalized Scryfall query behavior.
6. In The Loom, select colors, type, Commander format, rarity, mana value, and a keyword; confirm generated syntax, builder summary, reset behavior, and the submitted query still match the existing builder contract.
7. Click a Query Inspector alternative when one is present; confirm it reruns through the existing quick-search path with order, unique, and direction metadata intact.
8. Open `/maze/?q=ci%3C%3Dur%20t%3Alegendary%20t%3Acreature%20f%3Acommander`; confirm the route lands with query context intact and the search actions point at the same query.
9. Open `/maze/?from=archscry&readingId=test&guild=izzet&fit=UR&readingTitle=Test%20Reading&returnUrl=/archscry/`; confirm the Archscry return banner appears, dismisses, and links back without changing the handoff payload.
10. From an Archscry primary dossier and one adjacent-fit dossier, open Maze Discovery paths; confirm From Your Dossier reflects the active fit and Plain Reading / Operator's Hand mode switching preserves authored path text.
11. Add a card to the Deck Scratchpad from the grid, open a modal, add a card to Commander Ideas from the modal, remove a stashed card, copy the export, and clear the stash while preserving `Commander` and `Deck` headings.
12. Open and close a card modal by close button, outside click, and Escape; confirm background targets become inert while open, Tab stays inside the modal, and focus returns to the opener.
13. Search enough results to enable Load More; confirm client pagination and remote `next_page` loading still update counts and recover button state after failure.
14. Check mobile, tablet, and desktop widths for readable command deck, sidebar, results, stash drawer, modal, and return banner with no obvious horizontal overflow.
15. Enable reduced motion and confirm Maze keeps a static or materially reduced atmosphere while mode cards, Query Inspector, stash drawer, and modal remain usable.
16. Confirm any duplicate Maze CSS candidate that is not byte-identical and cascade-safe remains in place and is recorded as follow-up rather than removed during VM-147C.

## VM-136 / VM-137 / VM-139 / VM-140 / VM-141 precon dossier layer

1. Run `node research/import-precon-mechanics-validation.mjs` twice. The first run may report source updates; the second run should report 155 matched rows, 0 unmatched rows, 0 skipped rows, 0 mechanics count failures, and 0 records updated.
2. Confirm the import report uses `Mechanics Normalization Review` for the completed workbook and that the protected-field scope guard passes.
3. Run `npm.cmd run build:precons`.
4. Confirm `data/precons/vox-mana-precon-catalog.json` and `data/precons/vox-mana-precon-catalog.schema.json` are rewritten without errors.
5. Run `npm.cmd test` and confirm `PASS precon artifact tests` appears in the output.
6. Confirm all 155 precons still have 3-6 mechanics, no `Typal synergy` mechanic tag, and nullable `creatureTypeFocus` values do not render or search as `null`.
7. Open an Archscry result with a known dense two-color identity, such as Orzhov or Simic.
8. In the `Commander Deck Starts` focus panel, confirm the in-panel order is `Recommended Precon Decks`, then `Commander Deck Starts`, then `Commander Lanes`.
9. Confirm `Recommended Precon Decks` renders at most four visible cards by default, even when the full recommendation pool contains more exact-color decks.
10. Confirm cards are selected from the existing grouped pool in this order: `nativeExact`, then `otherExact`, then `stretch`.
11. Confirm card badges read `Native fit`, `Exact-color fit`, or `Stretch fit`.
12. Confirm each compact precon card shows deck name, main commander, product/source, no more than three mechanics/theme chips, one short fit sentence, optional `Best for:` copy, and actions for `Research commander` plus `Find decklists`.
13. Confirm no `Skip if` block, purchase/price/availability copy, second-commander copy, or Apocrypha precon link appears in this section.
14. Confirm a `Display other [N]` button appears only when more than four total grouped recommendations are available.
15. Click `Display other [N]` and confirm the section swaps to the remaining recommendations using the same compact card design without scrolling to the top.
16. Click `Show first 4 precons` and confirm the section swaps back to the first four cards without scrolling to the top.
17. Confirm exact-color decks remain uncapped internally through automated tests, even though Archscry starts with only four cards.
18. Switch into an adjacent-fit dossier view and confirm the precon preview recomputes from that active view and returns to collapsed state.
19. Confirm the empty state says `No validated precon recommendations are available for this dossier yet.` when no recommendations are available.
20. Re-run `npm.cmd run test:visual:archscry` and confirm the compact `dossier-commander-deck-starts-*` captures pass.
21. Open a dossier that surfaces `Blood Rites` and confirm `Clavileño, First of the Blessed` renders with the `ñ` intact in the card body, the Scryfall link query, and the MTGDecks commander slug.

## `strategium/index.html` visual regression harness

1. Before changing `strategium/index.html`, `assets/css/strategium.css`, or `assets/js/strategium.js`, run `npm.cmd run test:visual:strategium:baseline`.
2. Confirm baseline screenshots exist under `artifacts/visual-regression/strategium/baseline/` for:
   - `landing-desktop.png`
   - `landing-mobile.png`
   - `console-pod-readiness.png`
   - `library-search.png`
3. After the extraction or route-local refactor, run `npm.cmd run test:visual:strategium`.
4. Confirm the compare run writes current and diff artifacts under `artifacts/visual-regression/strategium/current/` and `artifacts/visual-regression/strategium/diff/`.
5. Confirm each capture stays within the mismatch budget and the run reports no new Strategium console or page errors beyond `console-baseline.json`.
6. In a browser, verify `.vm-checklist-button` remains readable in default, hover, `:focus-visible`, and `aria-pressed="true"` states after any Strategium panel-contrast change.
7. If the harness fails, review the generated diff PNGs before accepting any visual change.

## VM-416 Strategium content pass manual QA

1. Open `/strategium/`; confirm the console has six tabs and `Heat Management` appears between `Threat Reading` and `Beyond WUBRG`.
2. Switch through every Strategium console tab and confirm the active-state behavior still follows the existing tab pattern without dead buttons or console errors.
3. In `Archetype Signal`, confirm the default Common scope reports 23 archetypes, includes `Politics / Deals`, and does not include `Stax / Resource Denial`.
4. Search/filter for `Politics` and confirm it returns the unique `Politics / Deals` entry; switch to All and search/filter for Stax or Salt Risk/Control and confirm `Stax / Resource Denial` is discoverable.
5. Confirm no duplicate old `Politics` or `Stax / Lockout` card remains visible.
6. Confirm persona `Start with:` lines name real targets, including `Precon Pilot` to `Archetype Signal + Command Zone + Beyond WUBRG` and Heat Management routes from `Brewer / Upgrader` and `Competitive-Curious`.
7. Confirm the Commander Readiness Checklist has one sharp-edge disclosure line using `mass land denial/destruction` and `current Game Changers`.
8. Confirm bracket copy names all five brackets, frames brackets as conversation support, does not imply `precon = Bracket 2`, and states Game Changers as excluded for Brackets 1-2, up to three for Bracket 3, and unrestricted for Brackets 4-5.
9. Confirm the compact Opening Hand Check sits near new-player/pregame content and the Closing Window Check sits near Threat Reading.

## `apocrypha/index.html` visual regression harness

1. Before changing `apocrypha/index.html`, `assets/css/apocrypha.css`, or `assets/js/apocrypha.js`, run `npm.cmd run test:visual:apocrypha:baseline`.
2. Confirm baseline screenshots exist under `artifacts/visual-regression/apocrypha/baseline/` for:
   - `hero-desktop.png`
   - `hero-mobile.png`
   - `references-desktop.png`
3. After the hero or route-local refactor, run `npm.cmd run test:visual:apocrypha`.
4. Confirm the compare run writes current and diff artifacts under `artifacts/visual-regression/apocrypha/current/` and `artifacts/visual-regression/apocrypha/diff/`.
5. Confirm each capture stays within the mismatch budget and the run reports no new Apocrypha console or page errors beyond `console-baseline.json`.
6. Confirm `/library/` still forwards into `/apocrypha/` after any Apocrypha visual pass.
7. Confirm lower Apocrypha sections preserve rounded glass major panels and nested reference surfaces at desktop, tablet-ish, and mobile widths, with no square panel drift, clipped focus rings, unreadable transparent text, or stretched internal gaps; reference cards and the How Used note should keep their content top-pinned, the page rail should not include Not Published, and no private-system disclosure section should appear after How These References Are Used.
8. Confirm the Source Compass rail appears above `Public links grouped by type` with five tome links, visible source-count chips, deck-tone spines, horizontal scroll-snap/peek behavior, and no dots, arrows, search box, or source-link carousel.
9. Confirm each tome is a real anchor to a stable library group id; clicking a tome opens the matching top-level group, closes sibling top-level groups only, updates `aria-current`, and lands with the group title visible below the sticky topbar.
10. Confirm the top-level library groups are native `<details name="apoc-library">` panels with clear summaries, visible focus rings, CSS-drawn chevrons, and Enter/Space toggle behavior.
11. Confirm the `Official Wizards / Mark Rosewater` library group appears first as four native disclosure shelves: the first shelf is open, the other three are collapsed, the group shows `39 sources`, shelf count chips read `10 / 10 / 12 / 7`, and the existing non-MaRo public links stay unchanged.
12. With reduced motion enabled, confirm keyboard Tab reaches group and shelf summaries, Enter and Space toggle them, the gold focus outline remains visible, chevrons are visible in both states, all 49 public links are reachable after opening groups/shelves, no raw URLs are exposed, and no desktop or mobile horizontal overflow appears.
13. With JavaScript disabled, confirm the tome anchors still jump to group ids, the `<noscript>` reveal fallback keeps the library visible, summaries still toggle natively, and source links remain reachable after opening the target group.
14. In print view, confirm closed top-level groups and nested MaRo shelf bodies are forced visible.
15. If the harness fails, review the generated diff PNGs before accepting any visual change.

## VM-147D Static public route manual QA

1. Open `/strategium/`, `/apocrypha/`, `/privacy/`, `/terms/`, and `/library/`; confirm each route loads with its current asset stack and no broken route-owned asset requests.
2. Confirm `/library/` keeps its current compatibility behavior for Apocrypha exactly as implemented, including the alias shell text, meta refresh, inline JavaScript redirect, and noscript fallback, without changing the mechanism.
3. On `/strategium/`, confirm the shared topbar marks Strategium as active, the mobile menu opens and closes, reduced motion toggles shared state, and all tabs, checklist controls, and archetype search behavior remain unchanged.
4. On `/apocrypha/`, confirm the shared topbar marks Apocrypha as active, the route preserves public reference framing, all visible public source links remain reachable, the official Wizards / Mark Rosewater shelves appear before the existing groups without duplicating canonical URLs, versioned CSS/JS query strings stay intact, and no private-source framing leaks into public copy.
5. On `/privacy/` and `/terms/`, confirm the shared topbar marks the current legal route as active, legal copy and service wording are unchanged, `../assets/css/legal.css` remains the final stylesheet, and the VM-153 glass opacity/no-blur treatment remains readable.
6. At mobile, tablet, and desktop widths, confirm Strategium panels, Apocrypha reference cards, legal sections, topbars, footers, and the `/library/` compatibility shell have no obvious horizontal overflow, clipped text, or unreadable overlap.
7. Confirm no new console or page errors appear beyond known environment-only font, favicon, or visual-harness noise.
8. If a visual test fails before any VM-147D runtime edit, document it as a pre-existing condition and do not regenerate visual baselines under VM-147D.

## The Implicit Maze VM-129 console pass

1. Open `/maze/` and confirm the shared floating topbar marks `The Implicit Maze` as the active route.
2. Confirm the command deck shows the `The Implicit Maze` eyebrow, `Search Magic by instinct, syntax, or shape.` headline, three mode cards, and a single usable search input.
3. Search Plain Reading for `red vampires that sacrifice creatures`; confirm the query inspector shows the plain input, translated syntax, and reason text, while Copy and Open in Scryfall are available from the search row.
4. Switch to Operator's Hand and search `ci<=br t:creature o:sacrifice f:commander`; confirm raw syntax remains visible and the Scryfall link points at the same normalized query.
5. Switch to The Loom, select two colors, creature type, Commander format, and a keyword; confirm the generated syntax remains visible when switching back to Operator's Hand.
6. Click one item each from Helper Searches, Discovery Paths, By Color, Format, and Recent Searches; confirm Helper Searches remain present and separate from Recent Searches.
7. Open `/maze/?from=archscry&readingId=test&guild=izzet&fit=UR&readingTitle=Test%20Reading&returnUrl=/archscry/` and confirm the Archscry return banner appears with a working return link.
8. Open `/maze/?q=ci%3C%3Dur%20t%3Alegendary%20t%3Acreature%20f%3Acommander` and confirm the page lands with the query context intact.
9. Add a card to the stash from the result grid, open a modal, add a card to Commander Ideas from the modal, then confirm remove actions update the count.
10. Copy the stash export and confirm the text preserves `Commander` and `Deck` headings, then clear the stash.
11. Paginate with Load More, open and close a card modal by button, outside click, and Escape, and confirm focus returns to the opener.
12. At mobile width, confirm the stash does not cover search/results and the mode/search/path panels do not introduce horizontal overflow.
13. Enable reduced motion and confirm animated Maze atmosphere/effects are disabled or materially reduced.

## VM-129D Maze mode separation and console usability

1. Open `/maze/` and confirm Plain Reading, Operator's Hand, and The Loom each change the command-deck context copy and visual framing.
2. Confirm the headline no longer collides and the search input has enough room for long raw syntax.
3. In Plain Reading, search `red vampires that sacrifice creatures`; confirm the Query Inspector shows the original phrase, translated syntax, and reason/assumptions when available.
4. In Operator's Hand, search `ci<=br t:creature o:sacrifice f:commander`; confirm redundant inspector chrome stays hidden when normalization did not change the query.
5. Click the `?` help button in each mode and confirm visible, mode-specific help opens on click and updates `aria-expanded`.
6. In The Loom, confirm the command deck becomes builder-first, reset board keeps Builder active, restores Commander format, and produces `f:commander`.
7. Confirm Clear preserves the active mode: Plain Reading stays Plain Reading, Operator's Hand stays Operator's Hand, and Builder keeps its current filters.
8. Confirm the sidebar order is From Your Dossier, Discovery Paths, Recent Searches, Helper Searches, By Color, and Format; Helper Searches should be collapsed by default.
9. On a fresh Maze load, confirm the sidebar format and builder format default to Commander, but explicit `f:` tokens in URLs, raw syntax, helper paths, or dossier handoff queries are not overwritten.
10. Search enough results to enable `Load More`; confirm local pages append immediately and remote `next_page` pagination recovers the button state if a fetch fails.
11. Open and close the deck scratchpad drawer; confirm `stash-panel` remains mounted, writes to `stash-count` and `stash-body`, and does not cover the command deck while closed.
12. Add a card from the grid, add a card to Commander Ideas from the modal, copy the stash export, and clear the stash.
13. Open `/maze/?from=archscry&readingId=test&guild=izzet&fit=UR&readingTitle=Test%20Reading&returnUrl=/archscry/` and confirm the return banner/link still works.
14. Open `/maze/?q=ci%3C%3Dur%20t%3Alegendary%20t%3Acreature%20f%3Acommander` and confirm it lands in Operator's Hand with the exact query preserved.
15. At mobile/devtools-width desktop, confirm the drawer and command deck remain usable without horizontal overflow.
16. Enable reduced motion and confirm Maze transitions and atmosphere effects are disabled or materially reduced.

## VM-150 Dossier-to-Maze path differentiation

1. Complete or restore one mono-color Archscry dossier and one two-color dossier.
2. In `Maze Discovery Paths`, confirm the four links are commander candidates, support cards, flavor/story echoes, and outside-color commander stretch rather than four near-identical oracle searches.
3. Open each path in Maze and confirm Operator's Hand shows a distinct query shape: `is:commander`, `-is:commander -t:land`, `ft:`, and `-id<=... is:commander`.
4. Switch each opened path back to Plain Reading and confirm the visible text remains authored and human-readable rather than raw `id:`, `ci:`, `o:`, `ft:`, or `t:` syntax.
5. Confirm the return banner still routes back to the originating dossier and no stash or modal behavior changed.

## VM-151 Adjacent Dossier Maze handoff refresh

1. Complete a Red primary placement and open Maze Discovery.
2. Open each of the four Maze paths, switch between Plain Reading and Operator's Hand, and confirm the English and syntax are Red.
3. Use the Maze return link to return to the Red dossier, then open Adjacent Fits.
4. Open the second adjacent fit, such as Witherbloom, and open Maze Discovery from that adjacent dossier.
5. Confirm the four Maze paths now use the active adjacent dossier. For Witherbloom, Plain Reading should name Witherbloom and Operator's Hand should use BG identity syntax such as `id<=bg`.
6. In Maze's left rail, click From Your Dossier and confirm it also follows the active adjacent dossier instead of reverting to Red.
7. Repeat with one other adjacent fit to confirm the sidebar follows the active dossier view, not the original primary placement.

## VM-129E Maze glass and sidebar disclosures

1. Open `/maze/` and confirm the major panels are more transparent than VM-129D while the text remains readable.
2. Confirm the rich background art, stars, and glowing orbs read through the command deck, sidebar, results panel, and scratchpad drawer.
3. Confirm Helper Searches, Recent Searches, and By Color all use the same plus/minus disclosure affordance.
4. Confirm Recent Searches is hidden when empty, appears in the third sidebar position after a search, and opens automatically once populated.
5. Confirm By Color defaults collapsed and reveals the existing color shortcut buttons when opened.
6. Confirm Plain Reading, Operator's Hand, The Loom, stash drawer, and Load More still work after the polish pass.

## VM-142 Maze Strategium glass unification

1. Open `/maze/` beside `/strategium/` and confirm Maze now uses the same sharper translucent-glass feel rather than a heavier frosted blur.
2. Confirm the command deck is slightly darker than the sidebar and results panel because it carries the primary search information.
3. Confirm the command deck, mode cards, search input, sidebar, results panel, and empty-state panel keep the background art visible while preserving readable text contrast.
4. Confirm the search textarea placeholder remains readable over the bright center of the background image.
5. Inspect the command deck, sidebar, and results panel and confirm their major surfaces do not use `backdrop-filter` blur.
6. At mobile width around `390px`, confirm the mode-card examples wrap, search actions stack vertically without horizontal overflow, and the compact scratchpad toggle does not cover mode-card text.
7. Confirm Plain Reading, Operator's Hand, The Loom, stash drawer, Archscry return banner, and Load More still work after the glass tuning.

## VM-129F Maze textarea and inspector space pass

1. Open `/maze/` and confirm `#search-input` is a true multi-line textarea with two visible rows and vertical resize.
2. Type a long raw query, confirm it wraps across lines without horizontal clipping, then press Enter to search.
3. Type another query with Shift+Enter line breaks and confirm the submitted Scryfall query normalizes the newlines to spaces.
4. Search Plain Reading for `red vampires that sacrifice creatures` and confirm Query Inspector remains visible as a translation bridge.
5. Search unchanged raw syntax and confirm Copy/Open in Scryfall are available in the search row while the redundant inspector stays hidden.
6. Search raw syntax that receives an added format/default normalization and confirm the inspector appears with the normalized syntax and reason.
7. Switch to The Loom and confirm the title and supporting copy align as a balanced desktop header, with the builder board full-width below.
8. Confirm compact labels and action buttons, including Copy/Open and inspector pills, size to their text without clipping at normal zoom.
9. Confirm no `?` search-help button remains in the command deck.
10. In The Loom, click Clear and confirm it resets the visual board exactly like Reset board, leaving the generated field at the Commander default.

## VM-129C Maze / Archscry atmosphere convergence

1. Open `/maze/` beside `/` and `/strategium/`; confirm Maze uses the same rich painted-background family with visible stars, glowing orbs, translucent black-glass panels, gold accents, and no teal-forward console wash.
2. Inspect the Maze `.vm-bg__stars` canvas and confirm it is attached to `body`, sized to the current viewport, and marked by the rich runtime instead of staying at the default `300x150` canvas size.
3. Narrow the desktop viewport or open devtools and confirm the deck scratchpad drawer remains mounted/off-canvas while closed and does not overlap the command deck, return banner, search input, or results panel.
4. Open `/archscry/`; confirm stars/orbs are visible again while the route remains darker and more dossier-focused than Home, Strategium, or Maze.
5. Confirm Archscry no longer has `data-bg-clean="true"` and does have `data-vm-atmosphere="rich"`.
6. Enable reduced motion and confirm Maze and Archscry render a static atmosphere frame without continuous animation.
7. Confirm Strategium is unchanged and still uses its existing local atmosphere runtime rather than loading an additional renderer.

## Happy path - quick reading

1. Open the site in a fresh browser session.
2. Confirm the landing page appears without any login prompt.
3. Change format, budget, and experience chips on the landing page.
4. Start the quick reading and confirm the page visibly lands on the first quiz question instead of appearing to stay on the landing hero.
5. Complete the adaptive Gate -> Hall -> Crucible reading.
6. Confirm the result page renders:
   - primary guild or college
   - decree text
   - `Mana Alignment Matrix`
   - working radar chart on the dossier page
   - selected synthesis card and philosophical axis bars
   - archetypes
   - staple cards
   - land base
   - starter planning section
   - deck-start links
7. Confirm two adjacent fits are shown.
8. In `Mana Base Starting Map`, confirm `Basics` shows guidance copy only, empty non-Basics tiers are not offered as tabs, and Premium/Midrange/Budget/Utility never display a placeholder card for `basics`, `basic land`, or `basic lands`.
9. Confirm the result page includes an evidence trail when the adaptive quick path produced one.
10. Confirm a multicolor result shows component and synthesis datasets, and a mono result shows only a single synthesis dataset without component toggle UI.

## Adaptive placement sanity

1. Run `node assets/js/quick-reading-tests.js`.
2. Confirm all 30 golden paths pass.
3. Run `node assets/js/quick-reading-bias.js --all`.
4. Confirm no faction is listed under `Never selected`.
5. Run `node assets/js/quick-reading-bias.js --runs=100`.
6. Confirm no faction is listed under `Never selected` and no single faction dominates the report.

## Presentation snapshot harness

1. Run `npm.cmd run presentation:snapshots`.
2. Confirm `artifacts/presentation-snapshots/presentation-snapshots.json` exists and includes `schema_version: "presentation-snapshot-v1"`.
3. Confirm `artifacts/presentation-snapshots/presentation-snapshots.csv` has one row per fixed case.
4. Confirm `artifacts/presentation-snapshots/presentation-snapshots.md` includes at least one mono case and one pair case with primary result, adjacent fits, Commander recommendations, external links, and Maze plain/operator paths.
5. Run `npm.cmd run test:presentation-snapshots`.
6. Confirm raw adjacent labels are preserved while any pair-family grouping appears only as debug metadata.

## Mono rollout acceptance sweep

1. Run `npm run test:placement`.
2. Confirm the suite reports `30 factions, 30 golden paths`.
3. Confirm mono routing checks still pass for `mono-white`, `mono-blue`, `mono-black`, `mono-red`, and `mono-green`.
4. Confirm mono adjacent-fit boundary checks stay inside the expected pair shells:
   - `W` vs `WU`-family / `WB`-family / `WG`-family / `WR`-family
   - `U` vs `WU`-family / `UB`-family / `UR`-family / `UG`-family
   - `B` vs `UB`-family / `WB`-family / `BG`-family / `BR`-family
   - `R` vs `WR`-family / `UR`-family / `BR`-family / `RG`-family
   - `G` vs `WG`-family / `UG`-family / `BG`-family / `RG`-family
5. Confirm valid guild, college, shard, and wedge analogs are accepted inside those families. For example, mono White may accept `LOREHOLD`, `BANT`, or `JESKAI` as valid white-adjacent fits without collapsing the displayed identity label, as long as the adjacent fit still resolves inside White's `WU` / `WB` / `WG` / `WR` shells.
6. Confirm mono dossiers still report authored mono recommendation ownership/guidance, not just generic Commander Compass presence.
7. Run `npm run dossier:audit`.
8. Confirm the audit has `failures: 0`.
9. Record the sweep outcome as one of:
   - `PASS with triage notes`
   - `FAIL with follow-up cards`

## Archived terminal path

1. Confirm `SCRYING_TERMINAL_ENABLED` is set to `false`.
2. Open the site in a fresh browser session.
3. Confirm the landing page and Archscry result view do not show any terminal CTA.
4. Confirm direct navigation or inline calls to the terminal route do not open a chat flow.

## Optional terminal path

1. Set `SCRYING_TERMINAL_ENABLED` to `true`.
2. Return to the landing page.
3. Start the Scrying Terminal path.
4. Confirm the terminal opens with the recruiter prompt.
5. Provide 3-5 answers.
6. Confirm the terminal reaches a decision.
7. Confirm `Open Full Dossier` shows the same style of result page used by the quick path.

## Save with Google

1. From a quick reading or terminal result, click the save action.
2. If not already signed in, confirm Google OAuth begins.
3. Finish the Google login flow.
4. Confirm the site returns to the exact same saved result.
5. Confirm the topbar shows the signed-in name.
6. Confirm the result no longer asks you to recover a lost reading.
7. Confirm the restored dossier immediately shows the `Mana Alignment Matrix` radar without requiring another render action.

## Returning user

1. Close the browser tab after saving a result.
2. Reopen the site while still signed in.
3. Confirm the saved result appears first instead of the landing page.
4. Confirm the adjacent fits are still present.
5. Switch into each adjacent fit and confirm the dossier updates cleanly.
6. Confirm the `Mana Alignment Matrix` title/text, pills, axis bars, caption, and radar shape switch to the adjacent faction instead of staying on the original primary placement.
7. Confirm `Back to Primary Reading` returns the Identity Matrix to the original saved result.
8. Confirm adjacent-fit switching does not duplicate or break the radar chart.

## Retake flow

1. While signed in with a saved result, click `Begin Again`.
2. Confirm the app returns to the landing page.
3. Confirm the old saved result is no longer shown automatically.
4. Run a new quick reading and save it.
5. Confirm the new result replaces the old one on the next visit.
6. Confirm the previous dossier radar instance is replaced cleanly by the new result.

## Sign-out flow

1. Sign out from the topbar while a saved result exists.
2. Confirm the site returns to the landing page.
3. Refresh the page.
4. Confirm no signed-in state remains visible.

## Legacy fallback

1. Use a profile row that has `guild` and `scores` but no `placement_result`.
2. Open the site while signed in as that user.
3. Confirm the site still renders a result page.
4. Confirm the result page clearly nudges the user to retake for the richer experience.

## Failure handling

### Missing faction data
1. Break or remove `data/factions.json`.
2. Open the site.
3. Confirm the page fails with a clear data-loading message.

### Missing placement model
1. Break or remove `data/placement-model.json`.
2. Open the site.
3. Confirm the page fails with a clear placement-data message.

### Chart runtime unavailable
1. Block, rename, or remove `/assets/js/graph.js`.
2. Complete a quick reading.
3. Confirm the left-side Identity Matrix card and axis bars still render.
4. Confirm the right-side radar panel shows a non-breaking fallback message instead of crashing the dossier.

### Failed save
1. Break the Supabase profile schema by omitting the new columns.
2. Attempt to save a result.
3. Confirm the user receives a clear message pointing to the schema update.

### Archived terminal response
1. With `SCRYING_TERMINAL_ENABLED` set to `false`, confirm the terminal remains hidden.
2. With the flag enabled, break the edge function or Anthropic configuration.
3. Start the Scrying Terminal.
4. Confirm the terminal shows a graceful error and does not crash the page.

### Rate limiting
1. With the terminal enabled, rapidly submit interview requests until the limit is hit.
2. Confirm the endpoint returns a throttling message instead of continuing indefinitely.

## Mobile sanity pass

1. Open the site on a narrow viewport.
2. Complete the quick reading.
3. Confirm answer cards, result sections, and adjacent-fit cards remain readable.
4. Repeat the Google save flow.
5. Confirm the return-to-saved-result path still works on mobile.
6. Confirm the `Mana Alignment Matrix` collapses to one column and the radar area remains readable.

## Shell continuity pass

1. Open `/archscry/`.
2. Confirm the route uses `background-vox-gateway-clean-09.webp` with the current Home `vm-bg` atmosphere stack, star canvas, and painted overlay treatment instead of the older chamber image.
3. Confirm the landing hero, quick-reading card, interview shell, decree state, and dossier sections feel like one continuous Archscry surface system.
4. Complete a quick reading and confirm the `Mana Alignment Matrix`, adjacent fits, and lower dossier sections still render inside the refreshed shell without changing their behavior.
5. Restore a saved result and confirm the refreshed shell is still present without changing result behavior.

## Archived Archscry atlas preview note

`/archscry/index2.html` is no longer a live route. VM-144 archived the remaining atlas-preview assets under `docs/research/archive/vm144-stale-preview-assets/`; use the regular `/archscry/` shell continuity and Maze return checks for current route behavior.

## Shared topbar smoke pass

## VM-153 Legal glass opacity match

1. Open `/privacy/` and `/terms/` beside `/maze/`.
2. Confirm the legal hero uses the same darker primary glass balance as the Maze command deck, with the gateway background visible through the surface.
3. Confirm the legal summary card and section cards use the lighter Maze sidebar/results glass balance rather than the darker hero treatment.
4. Inspect the legal hero, summary card, and section card surfaces and confirm their major panels do not use `backdrop-filter` blur.
5. At desktop and mobile widths, confirm legal text, meta pills, footer links, glossary spans, topbar, and current-page highlighting remain readable and unchanged.

## Shared topbar smoke pass

1. Open each public page:
   - `index.html`
   - `/archscry/`
   - `/maze/`
   - `/apocrypha/`
   - `/strategium/`
   - `/privacy/`
   - `/terms/`
2. Confirm the header uses the shared Vox Mana topbar shell with the committed `vox-mana-header-logo.svg` mark rather than a CSS-only placeholder.
3. Confirm the current page link is highlighted in the desktop nav.
4. Reduce the viewport to the mobile breakpoint and open the menu.
5. Confirm the mobile panel mirrors the real route links for that page instead of showing a partial or hard-coded subset.
6. Confirm the mobile menu updates `aria-expanded`, closes on outside click, closes on `Escape`, and returns focus to the menu trigger after close.
7. Confirm the desktop nav exposes `Main Navigation`, and the mirrored mobile links expose `Mobile Navigation` rather than application `menu` / `menuitem` roles.
8. If the page exposes `Reduce motion`, confirm the mobile menu reflects the same on/off state and toggles the same shared state rather than a second independent control.
9. Confirm the header does not clip, wrap awkwardly, or introduce horizontal overflow at desktop or mobile widths.
10. Confirm `Strategium` is now the live label and `/strategium/` is the live route.
11. Confirm Home-link semantics remain unchanged:
   - `index.html` brand and Home link stay self-targeted
   - non-home routes return to `index.html`
   - `index.html` brand and Home links self-target `./index.html`

## Semantic HTML / ARIA audit pass

1. Open `index.html`, `/archscry/`, and `/maze/` in a browser with the accessibility tree or inspector open.
2. Confirm each page exposes one `banner`, one `main`, and one `contentinfo` / footer landmark.
3. Confirm the major page sections are named from visible headings through `aria-labelledby`.
4. On `/archscry/`, confirm the landing, quick reading, Scrying Terminal, and result regions are inside the main landmark and have meaningful names.
5. On `/maze/`, open a card detail modal and confirm the page background targets have `inert` while the modal is open.
6. While the Maze modal is open, confirm Tab stays inside the modal, `Escape` closes it, outside click closes it, and focus returns to the opener.
7. Close the Maze modal and confirm the background targets no longer have `inert`.
8. Tab through the shared topbar, mobile panel, Maze controls, and any touched shared components; confirm every focused control has a visible gold or teal focus indicator.
9. NVDA pass is optional for this card, but if available, confirm the three named routes announce their landmarks and section names clearly.

## Container query / subgrid responsive pass

1. Open `index.html`, `/strategium/`, `/archscry/`, and `/apocrypha/`.
2. On the homepage, confirm the `Archscry` and `Apocrypha` doorway cards stay split when their card width is generous and stack scene plus body based on card width when narrowed, even after the overall page shell has already collapsed to one column.
3. On `/strategium/`, confirm the `Commander Focused` cards, entry-point rows, and `Choose your next move` cards reflow cleanly from desktop to mobile without clipped text, broken spacing, or horizontal overflow.
4. On `/strategium/`, switch through every Strategium Console tab and confirm the Commander-specific content swaps cleanly with no dead buttons or console errors.
5. On `/strategium/`, toggle several `Commander Readiness Checklist` items by mouse and keyboard; confirm the summary text updates and every touched control keeps a visible focus state.
6. On `/archscry/`, complete a reading, then narrow the dossier area; confirm `lands-tiers`, `commander-preview-grid`, and `flavor-echo-card` layouts respond to their wrapper width without text overlap, clipped art, or broken card spacing.
7. On `/apocrypha/`, confirm the archive cards and footer show no visual regression after the shared responsive pass.

## Strategium targeted portal lift

1. Open `/strategium/` and switch to the `Pod Readiness` tab; confirm `Recommended Pre-Game Script` appears only in that panel with three script cards and bracket language framed as an estimated social shortcut rather than an official rating.
2. Switch to `Threat Reading` and confirm `The cognitive checklist` renders five numbered prompts with no dead controls, clipped text, or browser console errors.
3. Switch to `Archetype Signal` and confirm the searchable archetype library appears inside the console panel instead of becoming a separate page section.
4. Confirm `Common` is the default starting point, then search `lands` and confirm `Ramp`, `Lands Matter`, and `Landfall` surface as separate matches.
5. Search `go wide` and confirm alias matching surfaces `Tokens` and related matching themes.
6. Search `prison` with `Core` active and confirm the empty state suggests widening the scope; switch to `All` or `Advanced` and confirm `Stax / Lockout`, `Hatebears`, or `Pillow Fort` can surface.
7. Filter by `Spells` and confirm `Spellslinger` and `Storm` behave as separate themes.
8. Filter by `Salt Risk` and confirm socially polarizing themes narrow correctly without introducing power or bracket labels.
9. Switch away from `Archetype Signal` and back; confirm the search and chip state persists until page reload.
10. Toggle multiple `Commander Readiness Checklist` items by mouse and keyboard; confirm the percent label, progress bar, overall summary, `Conversation status`, and `Table kit status` all update together.
11. Narrow `/strategium/` to tablet and mobile widths; confirm the new script cards, archetype search controls, archetype cards, and readiness status cards stack cleanly with no horizontal overflow or broken spacing.

## Local file route smoke pass

1. Open `index.html` directly via `file://`.
2. Confirm the shared header logo loads correctly under `file://` and still reads cleanly as the committed Vox Mana sigil in the topbar brand pill.
3. Open the mobile menu and confirm the mirrored route links appear and the menu still opens and closes correctly without a dev server.
4. Click `Start Archscry` and confirm `archscry/index.html` opens instead of a file-not-found page.
5. Use the top navigation on the preview home and confirm `Archscry`, `The Implicit Maze`, `Apocrypha`, and `Strategium` all open successfully under `file://`.
6. From `/archscry/`, confirm the topbar `Home`, `The Implicit Maze`, `Apocrypha`, and `Strategium` links all resolve correctly.
7. Confirm `/archscry/` does not fall back to the `Placement data missing.` error state when opened directly under `file://`.
8. Click `Start the Quick Reading` and confirm the Archscry view opens Gate 1 instead of appearing stuck on the landing state.
9. Complete a quick Archscry reading and confirm the dossier still renders, including the `Mana Alignment Matrix`.
10. From the dossier, open one of the Maze discovery links and confirm the Maze page opens with query context intact.
11. Confirm the Maze route topbar can return to `Home`, `Archscry`, `Apocrypha`, and `Strategium` without file-not-found errors.
12. Click the Strategium nav, card, and footer links from `index.html` and confirm they resolve to the renamed local route.
13. Confirm no live local-file path still points to `basics/index.html`.
14. Open the footer `Privacy` and `Terms` links from `index.html` and confirm those pages load their styling and topbar correctly under `file://`.
