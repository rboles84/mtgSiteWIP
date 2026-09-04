# VM-625 - Public Identity Atlas Explorer

ID: VM-625

Title: Public Identity Atlas Explorer

Status: Owner Review Ready

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
- One registered worktree; no VM-625 predecessor branch or card existed at intake.
- The current local `main` is ahead of `origin/main`; VM-625 development does not change or conceal that publication state.

## Implemented Result

- Added `?explore=atlas`, valid identity deep links, and invalid-slug Atlas recovery with explicit exploration precedence over saved-reading restoration.
- Added one registry/faction-derived public directory adapter. It filters active expressions, preserves VM-579's accepted family and within-family ordering, and emits the 37 links without copying identity records into UI code.
- Added public `identity-explore` rendering through the accepted dossier composer. Placement, confidence, alternatives, refinement, personalized observations, Reading Finds, account deck controls, result caching, and persistent handoff writes remain absent in this mode.
- Added a transient URL-only Maze exploration context. Explicit Jund/Boros/Lorehold context outranks stale stored handoff data, populates the existing dossier-query area, returns to the browsed dossier, and carries no reading association into new Finds.
- No telemetry event was added. The repository's telemetry adapter was not expanded because isolated Atlas instrumentation was not needed for the product contract; Placement telemetry remains untouched.

## Visual Reference Reconciliation

- Inspected `C:/dev/color-wheel-interactive/vox-color/color-wheel.html` before coding. The current file contains the relevant compact glass tile vocabulary in `tile(o)` with `.tile`, `.tile-ring`, `.tile-name`, `.tile-code`, and `.tile-pips`; it does not currently contain the literal `.idcard`, `.atlas-sigil`, or `.sigil-core` implementation shown in the owner's supplied snippet.
- Treated the supplied `.idcard` example as the controlling card anatomy and the current file as corroborating style authority. The Atlas reuses the five-position medallion, active-color nodes, center sigil, identity name, color code, mana pips, glass surface, hover depth, and responsive density.
- The renderer derives every card from authoritative active registry/faction records and maps only each record's color set to one reusable five-point medallion geometry. No static 37-entry list or bespoke identity illustration set was copied from the prototype.
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

Disposition: **READY for Owner Review**, not self-accepted. Automated objective requirements pass. Owner visual judgment remains for CTA hierarchy, Atlas density and medallion polish, mobile scanning, browse-versus-placement feel, saved-reading distinction, and the naturalness of the Jund Maze handoff/return language.
