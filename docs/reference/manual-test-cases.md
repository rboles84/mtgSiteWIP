# Manual Test Cases

## Setup

1. Deploy the updated static files.
2. If you are testing the optional terminal path, deploy the updated `guild-recruiter` edge function.
3. Run the SQL in `docs/supabase-profile-update.sql`.
4. Confirm `data/factions.json` is present at the site root under `/data/factions.json`.
5. Confirm `data/placement-model.json` is present at the site root under `/data/placement-model.json`.

## `newIndex2.html` visual regression harness

1. Before changing `newIndex2.html`, run `npm.cmd run test:visual:newindex2:baseline`.
2. Confirm baseline screenshots exist under `artifacts/visual-regression/newindex2/baseline/` for `mobile.png`, `tablet.png`, and `desktop.png`.
3. After the extraction or route-local refactor, run `npm.cmd run test:visual:newindex2`.
4. Confirm the compare run writes current and diff artifacts under `artifacts/visual-regression/newindex2/current/` and `artifacts/visual-regression/newindex2/diff/`.
5. Confirm each viewport stays within the mismatch budget and the run reports no new console or page errors beyond `console-baseline.json`.
6. If the harness fails, review the generated diff PNGs before accepting any visual change.

## `archscry/index.html` visual regression harness

1. Before changing `archscry/index.html` or `assets/css/archscry.css`, run `npm.cmd run test:visual:archscry:baseline`.
2. Confirm baseline screenshots exist under `artifacts/visual-regression/archscry/baseline/` for:
   - `landing-mobile.png`
   - `landing-desktop.png`
   - `dossier-mobile.png`
   - `dossier-tablet.png`
   - `dossier-desktop.png`
3. After the extraction or route-local refactor, run `npm.cmd run test:visual:archscry`.
4. Confirm the compare run writes current and diff artifacts under `artifacts/visual-regression/archscry/current/` and `artifacts/visual-regression/archscry/diff/`.
5. Confirm each capture stays within the mismatch budget and the run reports no new Archscry console or page errors beyond `console-baseline.json`.
6. If the harness fails, review the generated diff PNGs before accepting any visual change.

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
6. If the harness fails, review the generated diff PNGs before accepting any visual change.

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
8. Confirm the result page includes an evidence trail when the adaptive quick path produced one.
9. Confirm a multicolor result shows component and synthesis datasets, and a mono result shows only a single synthesis dataset without component toggle UI.

## Adaptive placement sanity

1. Run `node assets/js/quick-reading-tests.js`.
2. Confirm all 20 golden paths pass.
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
2. Confirm the suite reports `20 factions, 20 golden paths`.
3. Confirm mono routing checks still pass for `mono-white`, `mono-blue`, `mono-black`, `mono-red`, and `mono-green`.
4. Confirm mono adjacent-fit boundary checks stay inside the expected pair shells:
   - `W` vs `WU`-family / `WB`-family / `WG`-family / `WR`-family
   - `U` vs `WU`-family / `UB`-family / `UR`-family / `UG`-family
   - `B` vs `UB`-family / `WB`-family / `BG`-family / `BR`-family
   - `R` vs `WR`-family / `UR`-family / `BR`-family / `RG`-family
   - `G` vs `WG`-family / `UG`-family / `BG`-family / `RG`-family
5. Confirm valid guild/college analogs are accepted inside those pair families, for example mono White accepting `LOREHOLD` as a valid `WR`-family adjacent without collapsing the displayed identity label.
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
2. Confirm the route uses `background-vox-gateway-clean-09.webp` with the `newIndex2`-style `vm-bg` atmosphere stack, star canvas, and painted overlay treatment instead of the older chamber image.
3. Confirm the landing hero, quick-reading card, interview shell, decree state, and dossier sections feel like one continuous Archscry surface system.
4. Complete a quick reading and confirm the `Mana Alignment Matrix`, adjacent fits, and lower dossier sections still render inside the refreshed shell without changing their behavior.
5. Restore a saved result and confirm the refreshed shell is still present without changing result behavior.

## Atlas preview smoke pass

1. Open `/archscry/index2.html`.
2. Complete a quick reading and confirm the quiz flow still reaches a working dossier result.
3. Confirm the result reuses the real dossier content but rearranges it into the alternate atlas composition instead of the live `archscry/index.html` order.
4. Confirm the `Mana Alignment Matrix` radar still renders inside the preview layout.
5. Confirm the preview shares the same `background-vox-gateway-clean-09.webp` atmosphere and refreshed Archscry shell language as the live route.
6. Switch into adjacent fits and confirm the atlas composition reapplies cleanly after each rerender.
7. Click `Back to Primary Reading` and confirm the primary dossier returns without duplicate panels.
8. Click `Begin Again`, complete a new reading, and confirm the preview still rebuilds the atlas layout around the fresh result.

## Shared topbar smoke pass

1. Open each public page:
   - `newIndex2.html`
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
   - non-home routes return to `newIndex2.html`
   - `newIndex2.html` still self-targets the page top

## Semantic HTML / ARIA audit pass

1. Open `newIndex2.html`, `/archscry/`, and `/maze/` in a browser with the accessibility tree or inspector open.
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

1. Open `newIndex2.html` directly via `file://`.
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
12. Click the Strategium nav, card, and footer links from `newIndex2.html` and confirm they resolve to the renamed local route.
13. Confirm no live local-file path still points to `basics/index.html`.
14. Open the footer `Privacy` and `Terms` links from `newIndex2.html` and confirm those pages load their styling and topbar correctly under `file://`.
