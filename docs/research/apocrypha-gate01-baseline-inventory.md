# Apocrypha Gate 0 And Gate 1 Baseline Inventory

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Base main: `606ef686e2d18dd98c60407e15ba91ef3639e1a6`

Scope: Gate 0 baseline inspection and Gate 1 current rendered-source inventory only.

## Repository And Worktree Status

- Original worktree checked first: `C:\dev\voxmana.io`.
- Original `main` and `origin/main` both resolved to `606ef686e2d18dd98c60407e15ba91ef3639e1a6`.
- Original worktree status was clean on `main...origin/main`.
- Original worktree list initially contained only `C:/dev/voxmana.io`.
- No existing `codex/apocrypha-gate01-source-inventory` branch was found before worktree creation.
- New worktree was created with:
  - `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io worktree add -b codex/apocrypha-gate01-source-inventory C:\dev\voxmana.io-apocrypha-gate01 main`
- New worktree HEAD after creation: `606ef686e2d18dd98c60407e15ba91ef3639e1a6`.
- Current status before documentation edits: clean on `codex/apocrypha-gate01-source-inventory`.
- Git warning observed during status checks: unable to access `C:\Users\obake/.config/git/ignore`: permission denied.

## Pre-Flight Review Summary

Recent related work:

- VM-011 rebuilt Apocrypha into a visitor-first public reference library and preserved the 10 original public source links and `/library/` compatibility alias.
- VM-395 audited and closed the official Wizards / Mark Rosewater shelf, preserving 39 official `magic.wizards.com` links and the 10 existing non-MaRo links.
- VM-396 converted the long MaRo group into native disclosure shelves without removing any links.
- VM-397 added the five-tome Source Compass and top-level native `<details>` library groups, preserving all 49 public source links.
- VM-398 preserved future Research Vault publication as backlog-only and forbade exposing raw working material without a separate plan.
- VM-399 removed the public "Not Published" section and kept one short source-boundary note in How Used.
- VM-414 retuned Apocrypha CSS to align visually with Strategium while preserving markup, links, JS behavior, and route aliases.
- CRIT-001 is complete, but semantic data and CRIT files remain frozen unless explicitly reopened. This pass does not reopen CRIT-001.

Current known risks:

- The current Apocrypha page presents official Wizards design and lore links beside supplemental community, social, fan, video, and archive links without a registry-level authority model.
- Visible group names do not distinguish official design, official lore, rules, card-record, official archives, and supplemental references at the level required by the controlling kickoff.
- All rendered source records are hardcoded in HTML, so current counts, labels, URLs, and use notes can drift without a data audit.
- The retained local candidate file `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` is not rendered and differs from the current 39-link MaRo shelf, as VM-395 already documented.
- Link resolution was not checked in this pass. Network-dependent resolution is recorded as `not checked - network unavailable`.

Relevant decisions already made:

- `/apocrypha/` is canonical.
- `/library/` is a compatibility alias that forwards to `/apocrypha/`.
- Source Compass is navigation only; source links remain in normal document flow.
- Official Wizards / Mark Rosewater appears first and is open by default.
- The public route must not expose internal Research Vault working material, raw prompts, unpublished captures, generated notes, or private systems.
- Apocrypha should remain a public reference/source page, not a hidden-system briefing.

Files recently changed by related prior work:

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `library/index.html`
- `scripts/visual-regression-apocrypha.mjs`
- `docs/reference/manual-test-cases.md`
- Apocrypha-related Kanban cards and handoffs.

What should not be touched in this pass:

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- data files
- source registry files
- generated files
- Strategium
- Archscry placement logic
- CRIT-001 files
- semantic data
- package files
- test files
- original main worktree

Full Apocrypha repair plan status:

- No full Apocrypha Repair Plan file was found in the repository during targeted review. This kickoff prompt is treated as the controlling instruction. The full plan appears supplied outside the repo.

## Files Inspected

Governance and workflow:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/reference/workflow.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`

Apocrypha implementation:

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `library/index.html`
- `scripts/visual-regression-apocrypha.mjs`
- `docs/reference/manual-test-cases.md`

Related cards and handoffs:

- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/done/VM-134-apocrypha-hero-unification-pass.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `docs/kanban/backlog/VM-398-apocrypha-research-vault-backlog-preservation.md`
- `docs/kanban/done/VM-399-apocrypha-not-published-section-removal.md`
- `docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-06-14-2213-codex-vm395-apocrypha-maro-source-links.md`
- `docs/handoffs/2026-06-15-0208-codex-vm397-apocrypha-source-compass.md`
- `docs/handoffs/2026-06-15-0904-codex-vm399-apocrypha-not-published-removal.md`
- `docs/handoffs/2026-06-20-2131-codex-vm414-apocrypha-visual-alignment.md`

Related source/audit material:

- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`

## Gate 0 Baseline

Exact Apocrypha HTML files:

- `apocrypha/index.html`
- `library/index.html` as a compatibility alias forwarding to `/apocrypha/`

Exact Apocrypha CSS files:

- `assets/css/apocrypha.css`
- Shared CSS loaded by the route:
  - `assets/css/tokens.css`
  - `assets/css/fonts.css`
  - `assets/css/layout.css`
  - `assets/css/topbar.css`
  - `assets/css/atmosphere.css`
  - `assets/css/components.css`
- `library/index.html` also contains inline alias-shell CSS.

Exact Apocrypha JavaScript files:

- `assets/js/apocrypha.js`
- Shared JavaScript loaded by Apocrypha:
  - `assets/js/reduce-motion.js`
  - `assets/js/vm-feedback.js`
  - `assets/js/vm-topbar.js`
- `library/index.html` contains an inline `window.location.replace` redirect and loads shared `reduce-motion.js`, `vm-feedback.js`, and `vm-topbar.js`.

Exact source/data files:

- No rendered Apocrypha source registry or JSON source data file is currently consumed by `apocrypha/index.html` or `assets/js/apocrypha.js`.
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` is a retained local candidate/audit support file, not rendered and not imported.
- Data files under `data/raw-factions/**.sources.json` exist for faction source registries, but they are not currently used by the Apocrypha page.

Implementation model:

- Source cards and source links are hardcoded in `apocrypha/index.html`.
- Visible group counts and shelf counts are hardcoded in `apocrypha/index.html`.
- `assets/js/apocrypha.js` does not fetch source data or build source cards.
- No source registry exists for the rendered Apocrypha public library in this pass.

Current internal anchors:

- Page rail sections: `#top`, `#decks`, `#ledger`, `#method`.
- Source Compass groups: `#apoc-library-official-wizards`, `#apoc-library-official-lore`, `#apoc-library-story-archives`, `#apoc-library-community`, `#apoc-library-video-lore`.
- Return dock anchors: `#ledger`, `#top`.

Current accordion behavior:

- Five top-level source library groups are native `<details class="vm-panel apoc-library-group" name="apoc-library">`.
- Four nested official Wizards / MaRo shelves are native `<details class="apoc-shelf">`; the first shelf is open by default.
- JavaScript closes sibling top-level library groups when one opens and syncs Source Compass `aria-current`.
- Nested MaRo shelves are independent of top-level group exclusivity.
- With no JavaScript, native `<details>` remains usable, and the `<noscript>` reveal fallback keeps `[data-reveal]` content visible.

Current rail navigation behavior:

- The left Library Rail has static anchors to `#top`, `#decks`, `#ledger`, and `#method`.
- `assets/js/apocrypha.js` updates rail `aria-current` from scroll position, hash changes, and clicks.
- CSS makes the rail sticky above 1240px and static below 1240px.
- Rail links become a compact grid below 1240px and one column below 720px.

Current Source Compass behavior:

- Five tome anchors jump to source group IDs without JavaScript.
- With JavaScript, activating a tome opens the target group, closes sibling top-level groups, pushes the hash, scrolls to the group, and syncs tome `aria-current`.
- CSS renders the tome rail as a horizontal overflow rail with scroll-snap/peek behavior.

Current external-link behavior and attributes:

- Rendered external source links: 49.
- All 49 rendered external source anchors have `target="_blank"` and `rel="noopener"`.
- Canonicalized duplicate scan found 49 unique URLs among 49 rendered external source links.
- Link resolution was not checked due network-unavailable constraint.

Current desktop behavior:

- Main page width is `min(1180px, calc(100% - 2rem))`.
- Above 1240px, layout is a two-column grid with sticky side rail and main content.
- Source Compass is horizontal and scrollable.
- Official Wizards shelves flow open link lists into columns using `columns: 220px 2`.
- Visual regression harness captures `hero-desktop` and `references-desktop`.

Current narrow-screen/mobile behavior:

- At max-width 1240px, the Apocrypha layout becomes one column and the rail becomes static.
- At max-width 980px, hero/support grids and guide/library/use grids collapse to one column.
- At max-width 720px, rail links and deck/grid remnants become one column; footer and return dock stack vertically.
- At max-width 520px, hero H1 and nested card radii are tuned for mobile.
- Visual regression harness captures `hero-mobile`.

No-JavaScript fallback:

- `apocrypha/index.html` includes a `<noscript>` rule making `[data-reveal]` content visible.
- Native anchors and `<details>` still work without JavaScript.
- `library/index.html` includes meta refresh, inline JavaScript redirect, and a `<noscript>` link to `../apocrypha/`.

Screenshot/baseline capture workflow:

- Existing command: `npm.cmd run test:visual:apocrypha`
- Existing baseline command: `npm.cmd run test:visual:apocrypha:baseline`
- Harness route: `/apocrypha/index.html`
- Capture families referenced in docs/harness: `hero-desktop`, `hero-mobile`, `references-desktop`.
- Manual browser sizes documented by prior cards include desktop `1366x900` and mobile `390x844`.
- This Gate 0/1 pass did not refresh screenshots because no Apocrypha UI files were edited.

## Gate 1 Current Source Inventory

Link resolution status for every row: `not checked - network unavailable`.

| # | Visible title | URL | Current group/shelf | Current label/type | Current use text | Domain | Official? | Link behavior | Duplicate? | Resolution | Recommendation | Proposed official replacement | Notes |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | The Great White Way | https://magic.wizards.com/en/news/making-magic/great-white-way-2003-02-03 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color philosophy. |
| 2 | True Blue | https://magic.wizards.com/en/news/making-magic/true-blue-2003-08-11 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color philosophy. |
| 3 | In the Black | https://magic.wizards.com/en/news/making-magic/black-2004-02-02 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row. |
| 4 | Seeing Red | https://magic.wizards.com/en/news/making-magic/seeing-red-2004-07-19-0 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row. |
| 5 | It's Not Easy Being Green | https://magic.wizards.com/en/news/making-magic/its-not-easy-being-green-2002-10-21-0 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color philosophy. |
| 6 | The Great White Way Revisited | https://magic.wizards.com/en/news/making-magic/great-white-way-revisited-2015-07-13 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row. |
| 7 | True Blue Revisited | https://magic.wizards.com/en/news/making-magic/true-blue-revisited-2015-07-20 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row. |
| 8 | In the Black Revisited | https://magic.wizards.com/en/news/making-magic/black-revisited-2015-07-27 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row title only. |
| 9 | Seeing Red Revisited | https://magic.wizards.com/en/news/making-magic/seeing-red-revisited-2015-08-03 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row title only. |
| 10 | It's Not Easy Being Green Revisited | https://magic.wizards.com/en/news/making-magic/its-not-easy-being-green-revisited-2015-08-10 | Official Wizards / Mark Rosewater / Foundational color philosophy | Official Wizards / Mark Rosewater | Mono-color philosophy and the color-pie backbone. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row title only. |
| 11 | My Words: White | https://magic.wizards.com/en/news/making-magic/my-words-white | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color voice. |
| 12 | My Words: Blue | https://magic.wizards.com/en/news/making-magic/my-words-blue | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color voice. |
| 13 | My Words: Black | https://magic.wizards.com/en/news/making-magic/my-words-black | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color voice. |
| 14 | My Words: Red | https://magic.wizards.com/en/news/making-magic/my-words-red | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color voice. |
| 15 | My Words: Green | https://magic.wizards.com/en/news/making-magic/my-words-green | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/color voice. |
| 16 | The Council of Colors, Revisited | https://magic.wizards.com/en/news/making-magic/the-council-of-colors-revisited | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/governance. |
| 17 | Pie Fights | https://magic.wizards.com/en/news/making-magic/pie-fights-2016-11-14 | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | URL differs from retained candidate file row. |
| 18 | The Mechanical Color Pie 2017 | https://magic.wizards.com/en/news/making-magic/mechanical-color-pie-2017-2017-06-05 | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/mechanical color pie. |
| 19 | The Mechanical Color Pie 2021 | https://magic.wizards.com/en/news/making-magic/mechanical-color-pie-2021 | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/mechanical color pie. |
| 20 | Mechanical Color Pie 2021 Changes | https://magic.wizards.com/en/news/making-magic/mechanical-color-pie-2021-changes | Official Wizards / Mark Rosewater / Current color voice and governance | Official Wizards / Mark Rosewater | Color voice, color-pie maintenance, and mechanical-pie authority. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official design/mechanical color pie. |
| 21 | Group Think (Selesnya) | https://magic.wizards.com/en/news/making-magic/group-think-2005-10-03-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 22 | Life and Death (Golgari) | https://magic.wizards.com/en/news/making-magic/life-and-death-2005-10-24-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 23 | Pretty Sneaky, Sis (Dimir) | https://magic.wizards.com/en/news/making-magic/pretty-sneaky-sis-2005-11-07-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 24 | Disorderly Conduct (Boros) | https://magic.wizards.com/en/news/making-magic/disorderly-conduct-2005-12-05 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 25 | Aaaargh! (Gruul) | https://magic.wizards.com/en/news/making-magic/aaaargh-2006-01-30-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 26 | Creative Differences (Izzet) | https://magic.wizards.com/en/news/making-magic/creative-differences-2006-02-27-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 27 | Playing by Their Own Rules (Orzhov) | https://magic.wizards.com/en/news/making-magic/playing-their-own-rules-2006-03-27-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 28 | Slow and Steady (Azorius) | https://magic.wizards.com/en/news/making-magic/slow-and-steady-2006-05-01 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 29 | Hedonism with Attitude (Rakdos) | https://magic.wizards.com/en/news/making-magic/hedonism-attitude-2006-08-14-0 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 30 | Improving Upon Nature (Simic) | https://magic.wizards.com/en/news/making-magic/improving-upon-nature-2006-05-29 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design. |
| 31 | Guild to Order, Part 2 | https://magic.wizards.com/en/news/making-magic/guild-order-part-2-2018-09-17 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official guild design context. |
| 32 | Guilds of Ravnica Mechanics | https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04 | Official Wizards / Mark Rosewater / Ravnica guild design | Official Wizards / Mark Rosewater | Two-color faction philosophy and guild mechanics context. | magic.wizards.com | Official-looking Wizards feature/mechanics source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official mechanics context; should become official design/rules-adjacent, not MaRo-only. |
| 33 | Peace, Love and Understanding (Bant) | https://magic.wizards.com/en/news/making-magic/peace-love-and-understanding-2008-10-06 | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official shard design. |
| 34 | Striving for Perfection (Esper) | https://magic.wizards.com/en/news/making-magic/striving-for-perfection | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official shard design. |
| 35 | Looking Out For Number One (Grixis) | https://magic.wizards.com/en/news/making-magic/looking-out-number-one-2008-10-17 | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official shard design. |
| 36 | Following Your Heart (Jund) | https://magic.wizards.com/en/news/making-magic/following-your-heart-2008-12-01 | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official shard design. |
| 37 | Searching Within (Naya) | https://magic.wizards.com/en/news/making-magic/searching-within-2008-11-01 | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official shard design. |
| 38 | Khan Do Attitude, Part 1 | https://magic.wizards.com/en/news/making-magic/khan-do-attitude-part-1-2014-09-01 | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official wedge/Tarkir design. |
| 39 | Khan Do Attitude, Part 2 | https://magic.wizards.com/en/news/making-magic/khan-do-attitude-part-2-2014-09-08 | Official Wizards / Mark Rosewater / Alara shard and three-color design | Official Wizards / Mark Rosewater | Three-color philosophy and shard/wedge comparison context. | magic.wizards.com | Official-looking Wizards design source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official wedge/Tarkir design. |
| 40 | A Flavorful Guide to the Guilds of Ravnica | https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03 | Official Lore And Story | Official Lore And Story | Guild identity descriptions. | magic.wizards.com | Official-looking Wizards lore/feature source | new tab, noopener | No | not checked - network unavailable | Keep | N/A | Official lore/identity source. |
| 41 | MTG Stories - polarkac GitHub Archive | https://github.com/polarkac/MTG-Stories/tree/master/stories | Story Archives And Indexes | Story Archives And Indexes | Story beats and faction voice. | github.com | Non-official based on current evidence | new tab, noopener | No | not checked - network unavailable | Move | Official Magic Story archive or original Wizards story URLs | Unofficial GitHub mirror/archive; should not carry official claims by itself. |
| 42 | MTG Stories PDF Archive - r/mtgvorthos | https://www.reddit.com/r/mtgvorthos/comments/14zerhh/pdf_archive_of_mtg_stories_from_magic_origins_to/ | Story Archives And Indexes | Story Archives And Indexes | Story navigation support. | reddit.com | Non-official social/fan source | new tab, noopener | No | not checked - network unavailable | Move | Official Magic Story archive or original Wizards story URLs | Reddit link and fan PDF archive. |
| 43 | MTGLore.com - Chronological Story Index | https://mtglore.com/chronological/ | Story Archives And Indexes | Story Archives And Indexes | Set chronology and timeline checks. | mtglore.com | Non-official supplemental reference | new tab, noopener | No | not checked - network unavailable | Move | Official Magic Story archive or original publisher story pages | Supplemental chronology/navigation only. |
| 44 | MTG Fandom Wiki - Ravnican Guilds | https://mtg.fandom.com/wiki/Ravnican_guild | Wiki And Community References | Wiki And Community References | History and guild structure support. | mtg.fandom.com | Non-official wiki source | new tab, noopener | No | not checked - network unavailable | Move | Official Ravnica lore articles, official world guides, or Wizards articles | Wiki source; should be supplemental only. |
| 45 | Guild Identities - Lore-Wise (r/magicTCG) | https://www.reddit.com/r/magicTCG/comments/ack2ij/ravnica_guild_identities_lore_wise/ | Wiki And Community References | Wiki And Community References | Lore-vs-perception disambiguation. | reddit.com | Non-official social/fan source | new tab, noopener | No | not checked - network unavailable | Move | Official Ravnica lore/design articles | Reddit discussion; supplemental only. |
| 46 | MTG Guilds - Draftsim | https://draftsim.com/mtg-guilds/ | Wiki And Community References | Wiki And Community References | Commander browsing and playstyle context; not deckbuilding authority. | draftsim.com | Non-official supplemental/general deckbuilding site | new tab, noopener | No | not checked - network unavailable | Move | Official Wizards guild articles for claims; keep only as supplemental browsing context if needed | General deckbuilding/reference site, not official. |
| 47 | The Guilds of Ravnica - Lore Overview | https://www.youtube.com/watch?v=a56_7ht2hCI | Video Lore And Overviews | Video Lore And Overviews | Narrative gap checking. | youtube.com | Non-official unless channel is separately verified | new tab, noopener | No | not checked - network unavailable | Move | Official Wizards story/lore pages for claims | Fan/video lore overview; supplemental review surface only. |
| 48 | Ravnica Guild Deep Dive - Part I | https://www.youtube.com/watch?v=ln91iHDBTao | Video Lore And Overviews | Video Lore And Overviews | Character and event support. | youtube.com | Non-official unless channel is separately verified | new tab, noopener | No | not checked - network unavailable | Move | Official Wizards story/lore pages for claims | Fan/video lore overview; supplemental review surface only. |
| 49 | Ravnica Guild Deep Dive - Part II | https://www.youtube.com/watch?v=BTWalpU7Sws | Video Lore And Overviews | Video Lore And Overviews | Tension and lore support. | youtube.com | Non-official unless channel is separately verified | new tab, noopener | No | not checked - network unavailable | Move | Official Wizards story/lore pages for claims | Fan/video lore overview; supplemental review surface only. |

## Keep / Move / Replace / Remove Summary

| Recommendation | Count | Sources |
|---|---:|---|
| Keep | 40 | All rendered `magic.wizards.com` sources: 39 official Wizards / Mark Rosewater design/mechanics links plus `A Flavorful Guide to the Guilds of Ravnica`. |
| Move | 9 | GitHub archive, Reddit PDF archive, MTGLore chronology, Fandom wiki, Reddit guild discussion, Draftsim guild article, and 3 YouTube lore videos. |
| Replace | 0 | No current rendered source should be replaced without Gate 2 registry and source-by-source owner review. Proposed official replacements are noted where known. |
| Remove | 0 | No source should disappear without an audit record; no removals in this pass. |

## Duplicate-Link Report

- Rendered external source links: 49.
- Unique canonicalized rendered external source links: 49.
- Duplicate rendered source URLs found: 0.
- VM-395 previously recorded no overlaps between the 39 MaRo links and the existing 10 public links.
- The retained candidate file `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` contains candidate URLs that differ from some rendered URLs. That is candidate-file drift, not a rendered duplicate.

## Dead / Redirected / Not-Checked Link Report

| Status | Count | Notes |
|---|---:|---|
| Resolves | 0 | Not checked in this pass. |
| Redirects | 0 | Not checked in this pass. |
| Fails | 0 | Not checked in this pass. |
| Not checked - network unavailable | 49 | Every rendered external source link. |

## Official-Looking Sources

Official-looking rendered sources:

- 40 total `magic.wizards.com` links.
- 39 current official Wizards / Mark Rosewater design, color philosophy, color voice, mechanical color pie, guild design, shard design, and wedge design links.
- 1 official Wizards feature/lore link: `A Flavorful Guide to the Guilds of Ravnica`.

Currently missing from rendered categories:

- No dedicated rules-source shelf.
- No dedicated card-record source shelf.
- No dedicated official archive shelf distinct from unofficial archives and supplemental indexes.

## Non-Official / Supplemental / Social / Fan Sources

Rendered Reddit links:

- `MTG Stories PDF Archive - r/mtgvorthos`
- `Guild Identities - Lore-Wise (r/magicTCG)`

Rendered Twitter/X links:

- None found.

Rendered Facebook links:

- None found.

Rendered Tumblr links:

- None found.

Rendered Discord links:

- None found.

Rendered personal blogs:

- None conclusively identified from rendered links. `MTGLore.com` is non-official supplemental lore/navigation unless separately verified.

Rendered fan lore videos:

- `The Guilds of Ravnica - Lore Overview`
- `Ravnica Guild Deep Dive - Part I`
- `Ravnica Guild Deep Dive - Part II`

Rendered reaction videos:

- None explicitly identified from visible titles.

Rendered general deckbuilding sites:

- `MTG Guilds - Draftsim`

Rendered unofficial GitHub mirrors:

- `MTG Stories - polarkac GitHub Archive`

Rendered fan PDF archives:

- `MTG Stories PDF Archive - r/mtgvorthos`

Rendered wiki sources:

- `MTG Fandom Wiki - Ravnican Guilds`

Rendered search-result snippets:

- None found.

Rendered AI summaries:

- None found.

Rendered copied article text hosted away from the original publisher:

- None directly rendered as article text. The GitHub archive and Reddit PDF archive may point to copied/archived story material and should be treated as non-official until Gate 2 resolves authority.

## Known Risks

- Current group labels imply source type but not source authority. Supplemental sources could be mistaken as claim-bearing if readers scan only group names.
- Current "Official Wizards / Mark Rosewater" shelf mixes pure design/philosophy, mechanics context, and one non-MaRo Wizards mechanics feature inside a MaRo-labeled group.
- Current "Official Lore And Story" has only one official lore/story source, while story/archive support is mostly non-official.
- Rules sources and card-record sources are absent from the rendered Apocrypha source set.
- All visible counts are hardcoded; a future source edit can desync count chips and actual links.
- No rendered source registry exists to encode official/supplemental status, source role, claim-bearing eligibility, or replacement recommendations.
- The retained MaRo candidate/audit file differs from the rendered shelf and should not be treated as a source of truth without reconciliation.
- Link health is unknown because links were not network-checked in this pass.

## Proposed Gate 2 Source-Registry File Location

Recommended location:

- `data/apocrypha-source-registry.json`

Rationale:

- Apocrypha is a public route, and a route-specific registry under `data/` would make rendered source cards/counts data-driven without mixing them into faction semantic source registries.
- Gate 2 should define a schema before writing the registry, including fields for source ID, visible title, URL, domain, official/supplemental status, source category, source role, claim-bearing eligibility, replacement target, link-check status, and rendered shelf/order.

Alternative if the project prefers route-owned data:

- `apocrypha/source-registry.json`

Do not use faction `data/raw-factions/**.sources.json` files for the public Apocrypha shelf unless a later architecture decision explicitly bridges them.

## Confirmations

- No Apocrypha page files were edited.
- No Apocrypha CSS files were edited.
- No Apocrypha JavaScript files were edited.
- No data files were edited.
- No generated files were edited.
- No source registry was built.
- No UI, copy, source, or source-removal changes were applied.
- Strategium was not touched.
- Archscry placement logic was not touched.
- CRIT-001 was not reopened.
- CRIT semantic data was not modified.
- Package files were not modified.
- Original main worktree was not edited.

## Exact Next Recommended Task

Gate 2 should create a route-specific Apocrypha source registry schema and initial registry from this audit, without changing public copy or UI first. The registry should preserve all 49 current rendered source records, classify each source into the controlling categories, mark supplemental sources as non-claim-bearing by default, and reconcile hardcoded counts against data-driven counts before any source removal, replacement, or copy rewrite.
