# VM-592 Final Bounded Owner Polish, Neutral-Color Correction, and Format Alignment Handoff

## Handoff Summary

- **Agent:** Codex
- **Task requested:** Apply the final bounded VM-592 Owner polish findings, correct the centralized Current Weave mapping so raw colors remain semantically neutral, then surgically align the native Format dropdown with the existing More Abilities visual control while preserving all accepted Loom and protected Maze behavior and stopping uncommitted at final Owner Re-Review.
- **Related card:** [VM-592 — The Loom v0 Usability, Intent, and Product-Alignment Pass](../kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md)
- **Baseline SHA:** `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b`
- **Branch / divergence:** `main`, `0/0` against `origin/main`
- **Current disposition:** **READY FOR FINAL OWNER RE-REVIEW.** VM-592 remains In Progress and uncommitted.
- **Governance applied:** repo-local `robdev` and `robqa`, with `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md` as frozen gates.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md` and all prior VM-592 handoffs
- `docs/kanban/board.md` and the active VM-592 card
- VM-590 findings/handoff and VM-591 contract/schema `1.0.0`
- current Maze route-ownership and query-contract documentation
- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-builder.js`
- `assets/js/maze/research-init.js`
- focused Maze tests
- `assets/vendor/mana/css/mana.min.css`
- existing Maze card-like hover, focus, selected, and reduced-motion treatments

## Files Changed From the VM-592 Baseline

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-builder.js`
- `assets/js/maze/research-init.js`
- `tests/maze/research-builder-tests.js`
- `tests/maze/research-mode-tests.js`
- `tests/maze/maze-search-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-28-1659-codex-vm592-story-registration.md`
- `docs/handoffs/2026-08-28-1821-codex-vm592-loom-v0-owner-review.md`
- `docs/handoffs/2026-08-28-2313-codex-vm592-owner-review-remediation.md`
- `docs/handoffs/2026-08-28-2345-codex-vm592-second-owner-rereview-remediation.md`
- `docs/handoffs/2026-08-29-0755-codex-vm592-final-visual-accessibility-remediation.md`
- `docs/handoffs/2026-08-29-0937-codex-vm592-final-owner-polish.md`

The final-polish delta itself changes only `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, the two focused Loom/layout test files, the VM-592 card/board, and this handoff/index. The other listed files are cumulative uncommitted VM-592 changes from prior accepted passes.

The surgical Format-alignment delta changes only `assets/css/maze.css`, `tests/maze/maze-results-layout-tests.js`, the active VM-592 card/board, and this handoff/index. It does not change HTML or JavaScript.

The untracked `docs/research/maze-player-language/corpus/` tree is unrelated concurrent work and was not touched. Its protected `vm578.zip` remains present at 87,977 bytes with timestamp `2026-08-22 08:35:12`.

## RobDev Compact Transfer Packet

- **Owning authority:** the registered VM-592 card and final bounded Owner polish disposition. VM-590, VM-591 `1.0.0`, VM-583 mobile treatment, current Maze query contract, and route ownership remain constraints.
- **Owning producers:** `research-builder.js` remains the builder query producer; `research-init.js` remains route state/action/presentation ownership; `MazeQueryResult.query` remains the sole executable query; HTML/CSS remain route-local presentation owners.
- **Changed behavior:** small builder rhythm; catalog-wide exact local ability icons; centralized presentation-only neutral color labels; player-facing choice count; final static Current Weave treatment; growing live-query reflection; intentional width-only Current Weave policy; restrained clickable-specimen hover.
- **Protected consumers/contracts:** Plain Reading, Operator Hand, Loom/Operator continuity, query projection/execution, result cards, Reading Finds, modal, Archscry handoff, dossier disclosure, accepted Commander/colorless semantics, mobile causal order, and VM-591 dormancy.
- **Reuse-first decision:** reused existing builder state and count, checked-in Mana v1.18.0, Current Weave presenter, route tokens, query textarea, responsive grid, external specimen link, and reduced-motion conventions. No new authority, state model, asset, dependency, or framework was introduced.
- **Primary risks:** decorative icons changing accessible names or keyboard options; identity labels mutating query state; count overclaiming semantics; a query scrollbar hiding text; responsive display depending on viewport height; hover implying false action.
- **Mitigation:** icons are exact-class and `aria-hidden`; all 220 catalog entries are table-tested; identity/count presenters are tested query-neutral; long query is compared through Copy/Open; media policy is width-only; the specimen remains an existing safe external link; five viewports were rendered.
- **Non-goals maintained:** no Plain/Operator parser work, cross-face hydration, VM-591 runtime, Loom v1, generalized mechanics/type taxonomy, result redesign, recommendation, graph, ranking, placement, or external asset work.
- **Stop condition:** final Owner Re-Review. No commit, push, Done transition, follow-up card, or subsequent implementation.

## Final Polish Implementation

### Spacing and visual rhythm

The existing `builder-control-stack` now uses a `0.3rem` gap (4.8px at the route root), and each major group gains a small padding/gap increment. Colors, Card Type, Abilities, and Refine retain their accepted structure and order; mobile gains no oversized blank blocks.

### Ability icon coverage

The governed `keywordAbilities` catalog contains 220 entries. An exact, centralized allowlist covers all 87 matching local Mana v1.18.0 `ms-ability-*` classes. Those icons now appear consistently in common controls, More Abilities search/options, and removable selected chips. Examples include Flying, First strike, Double strike, Afflict, Menace, Toxic, Ward, and the other exact matches.

The remaining 133 entries intentionally stay text-only because no exact checked-in Mana class was verified. Representative examples are Absorb, Affinity, Amplify, Assist, Aura Swap, Banding, Bestow, Buyback, Cascade, Commander ninjutsu, Equip, Flashback, Horsemanship, Partner, Persist, Phasing, Storm, Suspend, and Wither. The deterministic test derives expected presentation across the entire governed catalog from exact local CSS classes. Icon presence never affects keyword commitment or query output.

Autocomplete typing, active-descendant exposure, ArrowUp/ArrowDown, Enter, direct valid Enter, comma, Add, Escape, pointer/touch, multiword terms, and duplicate prevention remain unchanged and green. Decorative icons are `aria-hidden`, so option names remain the governed visible text.

### Neutral Current Weave color labels

One presentation-only mapping covers every supported color state, independent of selection order:

- Mono/colorless: W White, U Blue, B Black, R Red, G Green, C Colorless.
- Two color: WU White–Blue, UB Blue–Black, BR Black–Red, RG Red–Green, GW Green–White, WB White–Black, UR Blue–Red, BG Black–Green, RW Red–White, GU Green–Blue.
- Three color: GWU Green–White–Blue, WUB White–Blue–Black, UBR Blue–Black–Red, BRG Black–Red–Green, RGW Red–Green–White, WBG White–Black–Green, URW Blue–Red–White, BGU Black–Green–Blue, RWB Red–White–Black, GUR Green–Blue–Red.
- Four color: UBRG Blue–Black–Red–Green, BRGW Black–Red–Green–White, RGWU Red–Green–White–Blue, GWUB Green–White–Blue–Black, WUBR White–Blue–Black–Red.
- Five color: WUBRG Five-color.
- No selection: neutral state with no color label.

Default Commander-fit titles now read, for example, **Black–Red–Green fit** and **Blue–Black–Red–Green fit**. Alternate color relations retain their distinct player-facing relation text. Labels do not change selected colors, the generated/executable query, dossier context, or placement.

This mapping deliberately does not use Boros, Lorehold, Izzet, Prismari, Golgari, Witherbloom, Jund, or any other identity/faction/institution name as an alias for raw colors. The controlling boundary is **Colors determine eligibility. Named identities describe expression.** A future identity-lens feature may own the second part; VM-592 does not.

The correction is isolated to `WEAVE_COLOR_LABELS`, `weaveColorLabel`, their Current Weave consumer, and the directly affected table-driven test seam. It does not touch `bFilters`, `buildQueryFromBuilder`, `MazeQueryResult.query`, relation selection, dossier state, or execution.

### Choice count and Current Weave treatment

The existing derived count now says `0 choices woven`, `1 choice woven`, or `N choices woven`. No new count/state model was introduced. An identity-only state no longer displays the contradictory “No choices woven yet” quality line while also reporting one choice.

Current Weave retains the accepted reading order: identity/fit, selected qualities, format/refinement, choices, readiness/results. Its final treatment uses static low-opacity circular/arc geometry, crossed thread lines, restrained metallic details, identity-colored accents, gentle radial depth, and existing atmosphere. It remains passive/read-only and subordinate to controls/actions; no animation, graph, node, asset, recommendation, or card preview was added.

### Long query and responsive policy

Builder-mode live query text wraps with `overflow-wrap:anywhere`, has no max height or inner scrollbar, and is sized to its content. Plain Reading and Operator textarea behavior was not changed. A 283-character test query used five-plus card types, nine abilities, three rarities, a color relation, and format; its client/scroll heights matched at 136px, page width did not overflow, and Copy/Open retained the complete query.

Current Weave now uses width only:

- above 1050px: full side panel;
- 641–1050px: compact, full-width panel beneath the controls;
- 640px and below: intentionally omitted for the accepted phone flow.

No height-based breakpoint remains.

### No-result random specimen

The existing random specimen is an actual safe external link (`target="_blank"`, `rel="noopener"`). It now receives the Maze's restrained lift, border/glow, and slight image response without layout shift. Keyboard focus gets the corresponding restrained treatment, and reduced motion removes transitions. Content and recommendation semantics are unchanged.

### Surgical Format dropdown alignment

`#bld-format` remains the same native `<select>` with the same options, values, default Commander selection, and existing change handler. Its sole presentation class, `.bld-select`, now participates directly in the canonical `.more-abilities > summary` CSS groups for geometry/surface, hover, and focus-visible treatment.

At desktop, computed properties match on 44px minimum height, 1px soft border, 14px radius, background, text color, Spectral 18px typography, 8px × 12px padding, and pointer cursor; rendered heights differ by only 0.2px from native control rounding. The select retains its native dropdown indicator. At the existing `max-width: 560px` phone breakpoint, both controls reuse the same full-width alignment rule. No new selector abstraction, breakpoint, or style dependency was introduced.

Rendered behavior remained exact: cold/default is Commander with `f:commander`; selecting Modern yields `f:modern`; restoring Commander yields `f:commander`. Keyboard focus exposes the same 3px gold ring/3px offset and hover exposes the same teal-line/gold-wash surface. More Abilities behavior was not modified.

The first surgical pass verified only the closed control and therefore missed the Owner-visible open native menu, which still inherited a light Windows/Chromium option surface. The bounded fallback correction adds `color-scheme: dark` to `.bld-select` so browser-owned popup chrome and its scrollbar request the dark scheme, plus opaque `rgb(8, 11, 18)` option backgrounds and the existing `var(--maze-text)` foreground.

Owner follow-up correctly identified that the native Windows border and gray/white active row still differed from More Abilities. In Chromium builds that support native customizable selects, `.bld-select::picker(select)` and its options now copy the actual `.kw-suggestions` / `.kw-sug` values: 180px maximum scroll surface, `var(--maze-line)` border, route radius, `rgba(0, 0, 0, 0.84)` wash, the same shadow, 44px option rows, identical padding/radius/muted text, and the same restrained `rgba(247, 215, 132, 0.1)` hover/focus/selected state. Unsupported browsers retain the dark native fallback. The element remains a native `<select>`; no custom listbox, JavaScript, option, state, event, query, breakpoint, or More Abilities behavior was added or changed.

## RobQA Disposition

- **Risk class:** QA-2 interaction/presentation plus QA-1 styling; protected query/result/runtime behavior was held fixed.
- **Automation posture:** focused changed-owner and adjacent-contract coverage; no unrelated exhaustive suite was justified.
- **Disposition:** **READY FOR FINAL OWNER RE-REVIEW** with only final visual/product judgment remaining.

### Deterministic tests run

- `node tests/maze/research-builder-tests.js` — PASS, 11 cases
- `node tests/maze/maze-search-tests.js --vm592-focused` — PASS
- `node tests/maze/research-mode-tests.js` — PASS, 14 mode + 12 leakage cases
- `node tests/maze/maze-results-layout-tests.js` — PASS
- `node tests/maze/maze-query-contract-tests.js` — PASS
- `npm.cmd run lint:js` — PASS, 31 files
- `npm.cmd run lint:html` — PASS
- `node --check assets/js/maze/research-init.js` — PASS
- `git diff --check` — PASS; only repository line-ending conversion warnings were emitted

After the open-menu Owner findings, the layout, VM-592 focused search, and 11-case builder suites were rerun and passed. At `390 × 844`, the select remained 291.8px × 44px with `scrollWidth === clientWidth === 375`; Modern projected `f:modern` and restoring Commander projected `f:commander`. `git diff --check` also passed.

### Shared Plain Reading / Operator mobile cold-state containment

Owner evidence showed the shared **Start with a search thread** state reading too close to—and appearing clipped by—the phone edges in Plain Reading and Operator's Hand. The correction is CSS-only at the existing `.state-panel` owner: explicit zero-minimum/full-width containment, slightly larger responsive inline padding, a readable `38ch` copy measure, reduced mobile title tracking, safe wrapping, and a shared-width unbreakable inline `c:r kw:shroud` example.

At `390 × 844`, both Plain Reading and Operator render the title from approximately x=41px to x=334px and the widened body copy from x=36px to x=340px; `scrollWidth === clientWidth === 375`. The example produces one client rectangle at both 390px and a separately verified 768px viewport outside the phone media query. Operator remains `data-maze-mode="raw"`. No empty-state copy, parser, translation, query, event, results, Loom, or mode-switch behavior changed.

### Inherited Operator exception

The broad unfiltered `node tests/maze/maze-search-tests.js` command retains the documented inherited assertion mismatch: protected current output is `c:r`, while the stale assertion expects `c:r f:commander`. This pass did not edit Plain Reading, Operator runtime, or the inherited assertion, and did not weaken it to obtain a pass. The VM-592 focused path is green.

## Rendered QA

### `1440 × 1000`

PASS: deliberate group rhythm; full Current Weave; neutral two-, three-, four-, five-color, and Colorless labels; Common/Rare/Mythic materials; exact type/ability icons; icon-bearing More Abilities options; keyboard/accessible option state; 283-character query wrapping with no inner scrollbar/overlap/overflow; exact Copy/Open query; clickable no-result specimen hover; no runtime errors.

### `1024 × 900`, `820 × 900`, and `768 × 900`

PASS: compact Current Weave is full-width beneath controls at all three widths, with measured heights around 211–214px, no flash based on height, overlap, giant blank region, or horizontal overflow.

### `390 × 844`

PASS: Current Weave intentionally omitted; no horizontal overflow; actual DOM/focus construction order preserved; WUBRG targets remain 44 × 44; controls and the accepted single-column action stack remain usable.

Evidence:

- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-format-more-abilities-alignment-viewport.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-format-more-abilities-alignment-normal.png`

- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-neutral-colors-desktop-brg.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-neutral-colors-tablet-wubr.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-neutral-colors-mobile-390.png`

- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-desktop-empty.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-jund-weave.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-glint-weave.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-dune-weave.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-five-color-weave.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-ability-suggestions.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-long-query.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-1024x900.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-820x900.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-768x900.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-390x844.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-owner-polish-no-result-hover.png`

## Not Touched

- Plain Reading parser, grammar, translation, or runtime
- Operator Hand translation/runtime and inherited assertion
- cross-face query persistence or Loom hydration
- `MazeQueryResult.query` ownership or builder projection semantics
- result cards, Reading Finds, modal, Scryfall execution, or Archscry handoff
- dossier application, placement, recommendations, ranking, or generated data
- VM-591 contract/schema/runtime boundary
- Loom v1, graphs, previews, analytics, deckbuilding, or external assets
- unrelated player-language corpus or protected `vm578.zip`

## Risks / Uncertainties

No known bounded VM-592 correctness, responsive, or accessibility blocker remains. Owner judgment remains for the final visual tone and spacing only. The inherited Operator assertion remains a separate protected baseline issue.

## Follow-up Recommendations

No follow-up cards were created.

1. A future translation-quality story should test **Plain Reading ↔ semantic state ↔ Operator Hand** systematically with generated/regression combinations, without requiring hundreds of manual Scryfall searches.
2. A separate future three-face persistence story should hydrate only clauses Loom can represent, preserve the entire query/state, never silently drop unsupported clauses, and disclose that some search parts are not represented visually.

Neither boundary should begin inside VM-592.

## Local Owner Re-Review Steps

1. From the repository root, run `python -m http.server 4173` and open `http://localhost:4173/maze/`.
2. At `1440 × 1000`, inspect spacing and the empty Current Weave. Select RW, UR, BG, BRG, UBRG, WUBR, and WUBRG in separate reset passes; confirm Red–White fit, Blue–Red fit, Black–Green fit, Black–Red–Green fit, Blue–Black–Red–Green fit, White–Blue–Black–Red fit, and Five-color fit without query changes beyond the selected colors.
3. Select Common, Rare, Mythic, multiple types, common abilities, and More Abilities entries. Type `strike`; confirm exact icons, keyboard highlight/active descendant, Enter commit, and visible accessible text. Add Banding and confirm intentional text-only presentation.
4. Build a deliberately long query with multiple types, abilities, rarities, color relation, and format. Confirm natural wrapping, no nested scrollbar/label overlap, and complete Copy/Open behavior.
5. Search a zero-result query such as `id:c t:battle f:commander kw:banding`; hover/focus the random specimen and confirm the restrained safe-link treatment.
6. Check `1024 × 900`, `820 × 900`, and `768 × 900`; Current Weave should remain compact and full-width beneath controls. At `390 × 844`, it should be intentionally omitted with no overflow and the accepted causal/action order preserved.
7. Confirm result count/readiness, invalid mana-value behavior, reset, dossier disclosure, and Loom → Operator → Loom continuity remain unchanged.

## Next Suggested Agent

Owner Reviewer for final VM-592 acceptance. Stop here until the owner provides disposition.
