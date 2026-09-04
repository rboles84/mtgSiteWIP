# VM-625 - Public Identity Atlas Explorer

ID: VM-625

Title: Public Identity Atlas Explorer

Status: Owner Review Ready - Findings Remediated, Uncommitted

Type: Archscry public navigation / identity-only dossier / Maze context

Area: Archscry and Maze

Priority: High

Created: 2026-09-03

## Summary

Add a public, non-placement browsing path through Archscry:

`Archscry -> Identity Atlas -> identity dossier -> Maze -> same identity dossier`

Anyone may browse every supported Vox Mana identity without taking or corrupting a reading. The Atlas is a directory into the existing accepted dossier renderer, not a second placement system.

## Source

- Owner request supplied 2026-09-03: `VM-625 — Public Identity Atlas Explorer`.
- Accepted identity-only renderer, taxonomy ordering, and transient Maze precedent: VM-579.
- Device-local saved-reading contract: VM-016.
- Result-language boundary: VM-615.
- Governing implementation and QA gates: `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`.

## Repository Reconciliation

- VM-624 is Owner Accepted and integrated into the local `main` baseline at `cf83883`; its Loom printing behavior is no longer an active collision and remains protected.
- VM-579 already owns the nearest implementation: the existing production dossier renderer accepts an identity-only mode, the accepted registry order is mono colors, guilds, colleges, shards, wedges, four-color identities, Colorless, then WUBRG, and Maze already accepts a transient non-placement dossier-review context.
- The prompt's illustrative high-level family list is therefore not the ordering authority. VM-625 will preserve VM-579's accepted ordering and document its group counts.
- `data/identity-layers.json` owns active registry membership, routing metadata, expression kind, and color metadata. Current faction records supply accepted player-facing labels and existing dossier content. The standalone color-wheel HTML is visual reference only and supplies no identity records.
- VM-595 remains research-only. VM-625 must not alter authored or generated dossier prose, certified identity meaning, or Placement language.

## Locked Product Decisions

- Primary Archscry path remains **Start the Reading**.
- Secondary CTA is exactly **Explore the Identity Atlas**; never frame exploration as skipping, choosing, or receiving a placement.
- Public URLs use `?explore=atlas` and `?explore=<canonical-lowercase-slug>`.
- Explicit valid or invalid `explore` intent wins over passive saved-reading restoration. Invalid/inactive slugs recover to the Atlas with a concise inline message.
- Atlas hero copy identifies **32 Commander color identities plus five Strixhaven expressions** and offers **Return to your saved reading** only when one exists.
- The Atlas is a grouped native-link card directory with only medallion/pips, name, color code, and mana pips. No search, filters, dropdown-primary UI, comparison, expandable cards, or Atlas-only identity prose.
- Browse mode reuses accepted identity-only dossier content and excludes all assessment, Placement, confidence, answer, alternative, refinement, saved-result replacement, and personalized Reading Finds claims.
- Browsed dossiers expose **All identities** plus **Take the reading** or **Return to your saved reading** as appropriate.
- Maze receives an explicit transient `identity-explore` context for the browsed identity, ignores stale saved-placement handoffs while it is active, derives normal dossier queries for that identity, and returns to that browsed dossier. It never writes or mutates reading state.
- Telemetry may reuse only an existing anonymous low-risk adapter if it stays isolated and bounded. Otherwise it is deferred; Placement telemetry must not be reused.

## RobDevPass Contract

- **Product outcome:** a fresh visitor can open the Atlas, browse any of 37 destinations, enter Maze with that identity's dossier context, return to the same dossier, and later take the reading without exploration becoming a placement.
- **Current behavior:** public Archscry restores a saved reading or shows the reading landing. Identity-only access exists only in the local VM-579 review seam; Maze recognizes its transient review context but no public exploration context.
- **Owning layers:** Archscry route boot owns `explore` precedence; registry/faction adapters own Atlas entries; the existing dossier renderer owns browse presentation; existing Archscry/Maze context adapters own transient handoff and return navigation.
- **Existing machinery:** reuse VM-579 identity-only rendering, taxonomy sorter shape, `withArchscryMazeContext`, Maze launch resolution, identity-derived dossier paths, saved-reading normalization, and existing mana-font/pip helpers.
- **Changed behavior:** public route state, Atlas presentation, identity-only public dossier controls/language, and a transient public exploration Maze context.
- **Protected behavior:** scoring, mapping, qualification, confidence, quiz questions, certified identity meaning, dossier prose/data, saved-reading schema and bytes, Placement telemetry, normal result restore, normal Maze handoff, Reading Finds semantics, VM-579 local review, and VM-624 Loom.
- **Consumers/blast radius:** Archscry landing/boot/history, shared dossier renderer, Maze launch resolution/banner/return, registry consumers, saved reading, and focused route tests.
- **Relevant states:** fresh/saved visitors, all 37 links, Guild/College same-color pairs, direct load, refresh, Back/Forward, open-in-new-tab, invalid/inactive slug, stale saved handoff, mobile containment, focus, reduced motion, and Maze return.
- **Smallest complete implementation:** one registry-derived Atlas presenter, one public identity-explore branch through the existing renderer, route precedence/history handling, and one transient Maze context parallel to `dossier-review`.
- **Non-goals:** no new identity database, prose, self-placement, quiz/scoring change, search/filter/compare UI, bespoke illustration set, persistent exploration state, new analytics framework, or Maze redesign.
- **Stop conditions:** stop if implementation requires modifying certified identity/source records, stored reading schema, Placement decision logic, Reading Finds ownership, or a parallel dossier/query engine.

## Acceptance Criteria

- [x] Archscry exposes a primary **Start the Reading** CTA and secondary **Explore the Identity Atlas** CTA.
- [x] `?explore=atlas` renders exactly 37 unique authoritative native links: 32 Commander color identities and five Strixhaven expressions, in VM-579's accepted family/order contract.
- [x] Jund, Boros, Lorehold, Colorless, and WUBRG show authoritative names, colors, pips, families, URLs, and dossiers. Boros and Lorehold remain distinct RW destinations and semantic dossiers.
- [x] `?explore=<valid slug>` directly renders the existing identity-only dossier without reading/placement claims or placement-only controls.
- [x] `?explore=<invalid-or-inactive>` renders Atlas recovery and never restores a saved result over explicit exploration intent.
- [x] Atlas/dossier navigation, copied links, direct load, refresh, Back, Forward, and open-in-new-tab preserve the URL contract.
- [x] Exploration never creates, changes, removes, overwrites, or masquerades as saved reading state; clean `/archscry/` retains existing restore behavior.
- [x] Browsed dossiers launch Maze with the browsed identity as transient dossier context, populate **From Your Dossier**, return to that identity dossier, and ignore stale saved-placement handoff context.
- [x] Saved Azorius -> Atlas -> Jund -> Maze keeps Maze/Jund active while saved Azorius remains semantically equivalent and separately restorable.
- [x] Boros and Lorehold Maze contexts remain distinct despite their shared RW color basis.
- [x] Native links, accessible names, focus, DOM order, responsive containment, touch targets, reduced motion, and non-hover comprehension pass focused QA.

## Files Changed

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/identity-directory.js`
- `assets/js/archscry/runtime/identity-atlas.js`
- `assets/js/archscry/runtime/boot.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/archscry-presentation.js`
- `assets/js/maze/maze-handoff.js`
- `assets/js/maze/research-init.js`
- Focused Archscry/Maze tests, cache-version checks, and route documentation

## Risks

- Explicit exploration can be overwritten by passive saved-reading restore if route precedence is late or incomplete.
- Reusing the result renderer can leak Placement language or side effects unless identity-only mode is consistently separated.
- A stale persistent Maze handoff can replace the browsed identity unless explicit transient context wins.
- Guild/College pairs can collapse if keyed only by colors rather than identity slug.
- Registry counts/order can drift if Atlas records are copied or handwritten.
- Route-level history handling can strand a dossier panel or restore the wrong context.

## RobQA Classification

- QA tier: **QA-3**.
- Reason: public routing, URL precedence, saved-state restoration, identity-only rendering access, browser history, and cross-route Maze context change. Placement decision logic remains protected and unchanged.
- CPU-heavy validation: **NOT REQUIRED** unless implementation evidence shows protected Placement logic changed. Use the focused matrix in the owner request plus current VM-579, VM-615, saved-reading, Maze handoff, lint, and frontend-smoke contracts.

## Implementation Prompt

Extend the accepted VM-579 identity-only dossier and transient Maze context seams into a public, explicitly routed exploration mode. Generate the Atlas from current authoritative registry/faction data, preserve the saved-reading and Placement boundaries, and implement only the bounded directory/dossier/Maze loop.

## Notes

- Branch: `codex/vm-625-public-identity-atlas` from integrated local `main` at `cf83883`.
- Initial exact Owner Review candidate: `6fa574baca09ab68460ec02a270932a0d89cd4b8` (`feat(vm-625): add public identity atlas explorer`). It remains preserved but is superseded for acceptance by the Owner findings recorded below.
- Binding commit `0ade00a7a1fc692bc33919efc7e8f44780562fbe` changed lifecycle documentation only. The current findings remediation is an uncommitted working-tree candidate on top of that commit and requires a new exact-SHA binding only after the Owner asks to freeze it.
- At intake there was one registered worktree and no VM-625 predecessor branch or card. A separate VM-626 worktree appeared before candidate binding, was clean at the collision check, and did not overlap this candidate.
- The current local `main` is ahead of `origin/main`; VM-625 development does not change or conceal that publication state.

## Implemented Result

- Added `?explore=atlas`, valid identity deep links, and invalid-slug Atlas recovery with explicit exploration precedence over saved-reading restoration.
- Added one registry/faction-derived public directory adapter. It filters active expressions, preserves VM-579's accepted family and within-family ordering, and emits the 37 links without copying identity records into UI code.
- Added public `identity-explore` rendering through the accepted dossier composer. Placement, confidence, alternatives, refinement, personalized observations, Reading Finds, account deck controls, result caching, and persistent handoff writes remain absent in this mode.
- Added a transient URL-only Maze exploration context. Explicit Jund/Boros/Lorehold context outranks stale stored handoff data, populates the existing dossier-query area, returns to the browsed dossier, and carries no reading association into new Finds.
- No telemetry event was added. The repository's telemetry adapter was not expanded because isolated Atlas instrumentation was not needed for the product contract; Placement telemetry remains untouched.

## Visual Reference Reconciliation

- Inspected `C:/dev/color-wheel-interactive/vox-color/color-wheel.html` before coding. The current file contains the relevant compact glass tile vocabulary in `tile(o)` with `.tile`, `.tile-ring`, `.tile-name`, `.tile-code`, and `.tile-pips`; it does not currently contain the literal `.idcard`, `.atlas-sigil`, or `.sigil-core` implementation shown in the owner's supplied snippet.
- Treated the supplied `.idcard` example as the controlling card anatomy and the current file as corroborating style authority. The Atlas retains its identity name, aligned color code and mana pips, glass surface, hover depth, responsive density, and compact clickable-card layout.
- After Owner review, the circular node treatment was replaced with one reusable equal-point pentagon. All five color positions remain structurally present as simple circles, active colors illuminate, inactive colors recede, and active relationships use direct edges or chords. Colorless occupies the center as the deliberate outside-WUBRG case.
- The renderer derives every card from authoritative active registry/faction records and maps only each record's color set into that reusable geometry. No static 37-entry list or bespoke identity illustration set was copied from the prototype.
- Cards are native links, not pressed-state buttons, so keyboard activation, copied URLs, browser history, and open-in-new-tab remain browser-native.

## Focused Validation

Passed:

- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:identity-atlas`
- `npm.cmd run test:dev-review`
- `npm.cmd run test:reading-guide`
- `npm.cmd run test:maze-onboarding`
- `npm.cmd run test:maze-finds`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:maze-onboarding-browser`
- `npm.cmd run test:reading-guide-browser`
- `git diff --check`

The focused Atlas browser contract covers desktop and mobile containment, accessible native links and focus, all 37 destinations, direct links, invalid recovery, history/refresh, Jund Maze queries and return copy, Boros/Lorehold separation, stale-handoff precedence, exact saved-reading storage preservation, and clean-route Azorius restoration.

Known inherited broad-suite discrepancy: direct `node tests/maze/maze-search-tests.js` reaches its pre-existing raw-query assertion expecting `c:r f:commander`, while production raw mode returns `c:r` by design. VM-616 previously recorded this same inherited mismatch. VM-625 does not alter raw search formatting; its new launch-state assertions run before that unchanged failure and the focused Maze/Atlas contracts pass.

## RobQA Owner Review Gate

Disposition: **READY for Owner Review** as an uncommitted findings-remediation candidate on top of `0ade00a`; not self-accepted. Automated objective requirements pass. Owner visual judgment remains for the revised connector treatment, seven-block paging feel, control placement, mobile scanning, and the previously listed product judgments.

## Owner Findings And Remediation - 2026-09-03

Owner findings against initial candidate `6fa574b`:

- enemy-color pairs and some three-color medallions appeared to have missing or incomplete gold connector lines;
- mono-color cards redundantly repeated the single color letter;
- multi-color code letters and mana pips were visibly offset;
- showing every family at once created too much vertical scrolling;
- requested a one-family-at-a-time board advanced by mouse wheel or explicit up/down controls, with Colorless and WUBRG combined at the end.

First-pass remediation, subsequently refined by the second Owner review below:

- replaced adjacent-active-only arcs with the smallest continuous perimeter path that reaches every active color while retaining the accepted circular medallion language;
- omitted the visible code row for the five mono-color cards while retaining meaningful link names;
- projected code tokens and pips onto identical fixed grid columns so every letter center aligns with its corresponding mana symbol;
- grouped the unchanged 37 native links into seven visible blocks: Mono Colors, Guilds, Strixhaven Colleges, Shards, Wedges, Four-Color, and Colorless & Five-Color;
- added native previous/next buttons, a live group name/position, 44px targets, desktop wheel advancement with debounce, boundary release for normal page scrolling, mobile click controls, and reduced-motion styling;
- kept exactly one block visible at a time without changing registry data, identity URLs, dossier rendering, saved-reading state, or Maze behavior;
- advanced the Archscry CSS/root/Atlas module cache chain to `vm625b`.

Finding-to-invariant coverage now proves connector reach for every multi-color entry, enemy-pair and wedge path cases, no mono code rows, exact Boros code/pip center alignment, seven blocks with only one visible, click and wheel movement in both directions, combined final endpoints, 44px controls, keyboard focus, and mobile containment.

## Owner Findings And Remediation - Second Review - 2026-09-03

Owner findings against the first-pass uncommitted remediation:

- the bordered pager rail, duplicated family label, `1 of 7`, and instruction copy were too prominent;
- the controls should read as only a subtle glowing up arrow and down arrow;
- circular perimeter connectors still appeared to skip colors when the identity did not contain an intervening color;
- requested the equal-weight five-point pentagon/star logic, using mana symbols at the vertices and direct relationship lines.

Current remediation:

- removed the pager rail, visible status, count, and instruction copy; only two transparent 44px arrow buttons remain, with a restrained gold glow and clear focus treatment;
- retained a visually hidden live announcement plus destination-aware button labels so the quieter visual treatment does not remove assistive context;
- replaced circular arcs and plain color dots with five fixed mana-symbol vertices on a subtle pentagon frame;
- render all five positions at equal size, illuminating active colors and receding inactive colors, so the medallion consistently reads as one system;
- connect two active colors with one direct edge, three through five active colors with closed polygons, and mono identities with no artificial relationship line;
- render Colorless as a centered colorless mana symbol within the five-point frame;
- preserved the seven-block wheel/button interaction, native links, registry data, identity ordering, URLs, dossiers, saved-reading state, and Maze handoff;
- advanced the Archscry CSS/root/Atlas module cache chain to `vm625c`.

The focused invariant now proves five equal positions per colored medallion, direct enemy-pair edges, closed wedge and WUBRG polygons, a centered Colorless node, no visible pager status/instruction nodes, accessible live context, 44px controls, wheel/button progression, mobile containment, and all previously protected VM-625 state/routing behavior.

## Owner Findings And Remediation - Third Review - 2026-09-03

Owner findings against the second-pass uncommitted remediation:

- mana glyphs inside the pentagon nodes duplicated the card's existing mana-pip row;
- keep the colored circle glow and relationship lines, but remove MTG glyphs from the pentagon;
- replace the single arrow glyph in each direction with three stacked chevrons;
- increase separation between the up/down controls and diffuse the glow so it appears to come from beneath the chevrons.

Current remediation:

- removed every `<text>` mana glyph from the pentagon SVG; the five fixed vertices are now clean colored circles with active glow and subdued inactive treatment;
- retained direct two-color lines and closed three-to-five-color polygons;
- changed Colorless from a centered glyph to a centered neutral glowing circle;
- replaced each arrow glyph with three CSS-drawn chevrons inside the existing native button;
- increased desktop and mobile separation between direction controls;
- moved the light effect to a blurred radial pseudo-element beneath each chevron stack, with restrained resting opacity and stronger hover/focus response;
- preserved native semantics, 44px minimum targets, destination-aware accessible labels, hidden live announcements, reduced motion, wheel behavior, registry data, routes, saved state, and Maze behavior;
- advanced the Archscry CSS/root/Atlas module cache chain to `vm625d`.

Finding-to-invariant coverage proves six decorative chevrons across two native controls, meaningful accessible names, minimum target size, a material control gap, zero text glyphs in identity pentagrams, five equal color positions, direct connectors, and the complete existing VM-625 interaction/state matrix.

## Owner Findings And Remediation - Fourth Review - 2026-09-03

Owner findings against the third-pass uncommitted remediation:

- keep the exact compact five-node geometry, active/inactive state, connector logic, and card balance;
- make the faint pentagon feel deliberately etched rather than like unfinished wireframe geometry;
- give the active relationship more depth through a dark foundation, narrow gold stroke, and very soft gold glow;
- make active color circles read as tiny illuminated orbs, inactive positions read as intentionally dormant, and line endpoints assemble cleanly beneath the nodes;
- preserve distinct one-, two-, three-, four-, five-color, and Colorless readings without changing identity semantics.

Current remediation:

- retained the five canonical WUBRG coordinates and the existing registry-driven connector resolver unchanged;
- split the dormant scaffold into a soft recessed line and a finer etched line, both with rounded joins and non-scaling strokes;
- split each logical active connector into dark base, diffuse gold glow, and crisp narrow gold layers;
- replaced each flat node circle with a reusable SVG group containing halo, opaque body, edge ring, and tiny highlight; node groups render after connectors so the orb body cleanly caps each line;
- kept inactive positions dark, low-contrast, and complete, while Colorless retains the accepted centered neutral orb inside the fully dormant five-position structure;
- limited hover/focus response to small contrast increases, retained the compact `4.9rem` footprint, and explicitly disabled the sigil transition under reduced motion;
- changed no card layout, identity records, ordering, routes, dossier behavior, saved-reading state, or Maze handoff;
- advanced the Archscry CSS/root/Atlas module cache chain to `vm625e`.

Finding-to-invariant coverage for this rejected pass proved two scaffold layers, three visual layers for every logical connector, four orb layers at every mana position, node-over-path SVG order, a complete Colorless dormant scaffold plus neutral center, unchanged logical edge counts for all cardinalities, no duplicated mana glyphs, and the existing VM-625 interaction/state matrix. Actual in-place before/after captures covered White, Azorius, Jund, Ink, Five-Color, and Colorless, but Owner optical review rejected the result as insufficiently distinct and directionally too cool/concentric.

## Owner Findings And Remediation - Fifth Review - 2026-09-03

Owner rejected the fourth-pass visual result while explicitly accepting the feature behavior and Atlas layout for this iteration. The rejection was narrow:

- the added blue-gray scaffold/path outlines and increased glow moved away from Vox Mana's warm material language;
- concentric node rings made the mana lights feel like technical dashboard targets;
- the active path remained fundamentally a thicker outlined SVG line rather than a crafted object;
- the dormant geometry became too prominent, so the active identity no longer dominated;
- the next comparison must show original, rejected, and new treatments at actual card size for White, Azorius, Jund, Ink, Five-Color, and Colorless.

Current remediation:

- kept the five canonical positions, logical edge resolver, node state, compact footprint, card layout, metadata, paging, routes, dossiers, saved state, and Maze behavior unchanged;
- selected one authored material idea: an engraved gold filament built from a warm dark channel, muted-gold body, and hairline pale-gold core;
- removed the diffuse connector glow layer and all cool blue-gray connection treatment;
- returned the dormant pentagon to one thin neutral warm-charcoal etch with a near-black recessed shadow, so the complete system resolves after the active identity;
- simplified each mana stone to one colored body with its rim supplied by the body's stroke, one tiny specular point, and one restrained bloom; removed the visible concentric ring entirely;
- retained node-after-path paint order so every filament ends beneath an opaque stone rather than touching it awkwardly;
- preserved the intentional centered neutral Colorless stone within the same dormant five-position system;
- advanced the Archscry CSS/root/Atlas module cache chain to `vm625f`.

Finding-to-invariant coverage proves one quiet dormant scaffold, three warm material layers for every logical connection, no node-ring element, simplified bloom/body/specular stones, node-over-path paint order, unchanged logical connectors across all cardinalities, and explicit reduced-motion handling. The review artifact now presents actual Atlas-card captures in three columns—original, rejected revision, and new revision—for all six required identities.
