# VM-614 - Build the Vox Mana Field Guide Foundation and Global Discoverability

ID: VM-614
Title: Build the Vox Mana Field Guide Foundation and Global Discoverability
Status: Done - Owner Accepted
Type: Product UI / Navigation / Documentation
Area: Guide, global navigation, Home discoverability
Priority: high
Created: 2026-08-31

## Summary

Create the first public Vox Mana Field Guide at `/guide/` as a concise front door and wayfinding surface.
Add literal **Guide** to the canonical public navigation, preserve Home's four functional paths, and add
one bounded Home orientation link for visitors who are unsure where to begin.

## Source

- Owner start prompt for VM-614, supplied 2026-08-31.
- Owner-accepted VM-613 authority at `8b124bc33368f8c7fd00a820858531419a060b76`.
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/design/2026-08-30-vm613-onboarding-maps.md`
- `docs/reports/2026-08-30-vm613-current-state-recon.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`

## RobDev Pre-Edit Contract

- **Product outcome:** visitors can answer where to begin and how Vox Mana's useful surfaces connect.
- **Current behavior:** Home exposes four functional paths, but no Guide route or global Guide link exists.
- **Owning layer:** `/guide/` owns whole-product orientation; the shared public nav owns discoverability;
  Home owns one low-competition orientation link.
- **Authoritative producer:** authored static HTML/CSS and focused validation scripts; no generated product
  artifact is involved.
- **Existing machinery:** shared tokens, fonts, route shell, topbar/mobile cloning, active-state bridge,
  footer, feedback, reduced-motion behavior, and static route validators.
- **Changed behavior:** one new static Guide route, one Guide nav link on canonical public shells, nav order,
  and one Home discovery treatment.
- **Protected behavior:** Placement, Archscry reading/state/save behavior, dossiers, Maze semantics/state,
  Strategium lessons, Apocrypha sources, telemetry, `/library/` compatibility, and all later Guide routes.
- **Consumers/blast radius:** visitors on every public shell consume the shared nav markup; Guide and Home
  receive bounded presentation changes; existing functional route behavior is otherwise unchanged.
- **Relevant states:** desktop/mobile navigation, Guide active state, in-page map anchor, keyboard focus,
  reduced motion, 200% zoom, and local/deep relative paths.
- **Smallest complete implementation:** `/guide/index.html`, route-local Guide CSS, consistent canonical nav
  insertion, one Home text link, route ownership metadata, and focused deterministic validation.
- **Non-goals:** no later Guide routes, product-tour framework, new art/fonts/framework, functional-route
  onboarding, specialist-content duplication, telemetry, or semantic/state changes.
- **Stop conditions:** specialist-authority conflict, protected runtime change, a need for invented deep-link
  state, or a subjective product decision requiring Owner Review.

## Acceptance Criteria

### AC1 - Guide front door

`/guide/` exists and presents a concise, understandable first-visit experience using the accepted flavor
hierarchy and a small primary decision set that routes players toward real Vox Mana actions.

### AC2 - Global discoverability

Literal **Guide** appears in the accepted global desktop/mobile navigation order with correct active-state
behavior, without changing the functional four-path Home architecture.

### AC3 - Product map and secondary routing

The Guide includes a concise whole-product map plus secondary routes for existing-reading, Strategium,
and Apocrypha intents without duplicating specialist content or turning the page into documentation
inventory.

### AC4 - Responsive/accessibility quality

The Guide and updated navigation pass focused desktop, mobile, 200% zoom, keyboard, focus, deep-link, and
reduced-motion validation with no horizontal overflow or essential hover/motion dependency.

### AC5 - Protected behavior and scope

Archscry, Placement, dossiers, Maze semantics/state/persistence, Strategium, Apocrypha, telemetry,
`/library/`, and all later Guide routes remain unchanged except for the authorized shared Guide navigation
insertion and bounded Home discovery treatment.

## Risks

- Six desktop nav destinations may expose wrapping or spacing regressions at intermediate widths.
- A product map can imply a mandatory linear route unless optional entry points are explicit.
- Codex flavor can obscure the functional Guide identity if hierarchy is not restrained.
- Nested-route relative links and mobile nav cloning must remain local-file safe.

## Validation / RobQA

- QA classification: QA-3 shared navigation/routing plus visible UI.
- Run focused HTML, static smoke, metadata, route/nav/link, and diff checks.
- Perform rendered desktop, mobile, 200% zoom, keyboard, anchor, focus, and reduced-motion review.
- Do not run unrelated Placement, dossier-generation, all-identity, mutation, or recovery suites.
- Stop at **RobQA READY - Owner Review required**; do not self-accept, merge, push, or open a PR.

## Notes

The known fresh-session Archscry browser-smoke timeout belongs to VM-615 evidence work and does not block
this card unless VM-614 introduces a new regression.

## First Owner Finding Remediation - 2026-08-31 - Rejected

- **Finding:** the initial Guide looked like ancient UI: it reused the soap-bubble/radar gateway backdrop
  and presented the decisions as a generic three-square-card layout.
- **Classification:** objective route-local visual-authority mismatch, not intended polish and not a
  request to change the accepted content or product hierarchy.
- **RobDev repair contract:** keep copy, links, order, accessibility, shared navigation, Home treatment,
  and protected specialist behavior unchanged; repair only `guide/index.html`, `assets/css/guide.css`,
  the narrow Guide regression checks, and owner-review records.
- **Attempt:** switched to an Apocrypha-derived codex background and an asymmetric editorial layout.
- **Owner disposition:** rejected. The Guide still did not match Archscry or the Maze; background, CSS
  composition, and atmosphere behavior remained outside the actual product family.
- **Superseded invariant:** the attempt's ban on the gateway asset and its required asymmetric lead card
  were based on the wrong reference. They are removed rather than preserved as false regression rules.

## Second Owner Finding Remediation - 2026-08-31 - Rejected

- **Finding:** the first remediation used Apocrypha as visual authority without inspecting the live
  Archscry and Maze products named by the owner.
- **Live authority:** both reference routes use `background-vox-gateway-clean-13.webp`, the shared dark
  blue-black route base, a canvas-backed `vm-rich-atmosphere.js` runtime, dense rounded glass command
  surfaces, compact internal controls, and product-first vertical rhythm.
- **Smallest complete repair:** make the Guide one integrated command deck with its introduction and three
  choices inside the same surface; restore the shared gateway/rich-atmosphere contract; use compact
  Maze/Archscry-style controls; remove the duplicate topbar offset; retain the map and continuations in
  the same product shell language.
- **Regression invariant:** `/guide/` must carry the same gateway image, route class, rich-atmosphere data
  contract, canvas, and atmosphere runtime as Archscry/Maze. At desktop, its three compact decisions must
  remain inside a two-column command deck close to the topbar rather than becoming detached editorial
  cards. The invariant is Guide-only.
- **Protected behavior:** all copy, targets, ordering, optional-flow meaning, keyboard/mobile navigation,
  Home treatment, and specialist runtime contracts remain unchanged.
- **Rendered result:** current desktop and 390px witnesses show the integrated command deck, shared
  background/runtime, compact choices, product map, and continuations with no horizontal overflow. The
  primary action was clicked in the in-app browser and reached Archscry with its active nav state.
- **Owner disposition:** rejected. The page still carried a parallel Guide-only presentation system and
  only approximated the Maze/Archscry product family.

## Third Owner Finding Remediation - 2026-08-31 - Superseded Candidate

- **Finding:** the second repair copied selected values and visual ingredients while retaining 672 lines
  of Guide-only shell, command-deck, decision-card, map, and continuation CSS. The same gateway source was
  rendered with a different filter/vignette, causing the blurred multicolor background, and the primary
  intents remained static cards rather than established product controls.
- **Evidence reviewed:** complete linked stylesheet/script inventories for Guide, Maze, and Archscry;
  recursive first-party JavaScript import graphs; the owning shared atmosphere, motion, topbar, token,
  layout, component, Maze, and Archscry sources; and matched live CSSOM/screenshot comparisons.
- **Owning authority:** the accepted VM-613 content contract remains authoritative for Guide meaning;
  the current Maze route CSS/DOM contract and shared rich-atmosphere controller are the implementation
  authorities for this visual repair.
- **Smallest complete repair:** load and reuse the actual Maze route stylesheet and surface classes,
  restructure Guide into the Maze command-deck plus sidebar/main shell, make the three primary intents
  whole-control direct links, and reduce Guide CSS to route-content adapters only.
- **Protected behavior:** do not import Maze/Archscry domain JavaScript, change specialist semantics or
  persistence, alter accepted Guide copy/targets/order, reopen Home/navigation scope, or begin VM-615+.
- **Stop condition:** do not claim RobQA readiness until matched desktop/mobile rendered comparison proves
  the background, primary shell, surface geometry, type roles, direct interactions, focus, and overflow.
- **Implemented result:** Guide now loads `maze.css`, carries the Maze shell class, and uses the exact Maze
  command-deck, command-copy, console, mode-card, body, sidebar, main, and footer primitives. Guide CSS is
  reduced from 672 lines of parallel styling to route-content adapters; its lower map is a connected
  sequence rather than another equal-card grid.
- **JavaScript boundary:** complete recursive route-stack review confirmed that Guide needs the existing
  shared atmosphere/motion/feedback/topbar runtime but not Maze search/query/state/persistence or Archscry
  reading/Placement/dossier/service modules. No specialist domain JavaScript was imported.
- **Rendered result:** 1440 x 1000 and 390 x 844 witnesses pass visual self-QA. A browser regression opens
  both Guide and Maze and directly compares their computed background, filter, page, command, mode-card,
  body-grid, sidebar, and main-surface contracts.

## Fourth Owner Finding Remediation - 2026-08-31 - Superseded Candidate

- **Findings:** the third Guide control only scrolled farther down the same short page; the separate
  Archscry advice repeated the first control; and the Strategium/Apocrypha map note was too faint.
- **Clarified visual boundary:** the owner's earlier "soap bubble" finding referred to the rejected
  Guide-only presentation and is not authorization to remove atmosphere already used by other pages.
  Existing orb, mote, star, nebula, painted-background, and route-local atmosphere behavior is protected.
- **Correction after clarification:** an attempted cross-route atmosphere cleanup was reverted in full
  before handoff. Home, Archscry, Maze, Strategium, Apocrypha, legal routes, and shared atmosphere owners
  retain their prior visual implementation.
- **Guide interaction correction:** the third whole-control action now exits to Strategium; the product
  map remains visible content rather than a fake primary destination. The low-emphasis unsure advice is
  now one note inside the Archscry control, and the duplicate Strategium sidebar link is removed.
- **Readability correction:** the Strategium/Apocrypha note now uses the standard readable Maze body-copy
  color instead of the faint token.
- **Regression invariant:** Guide must not recreate the rejected old soap-bubble shell and must continue
  to inherit the exact Maze shell. Its primary targets are Archscry, Maze, and Strategium, with no
  `#how-vox-connects` primary self-link. Existing atmosphere on every other route remains untouched.
- **Rendered result:** current 1440 x 1000 and 390 x 844 witnesses show the inline unsure note, three real
  exits, readable bottom note, preserved chamber/star atmosphere, and no horizontal overflow.

## Fifth Owner Finding Remediation - 2026-08-31 - Superseded Candidate

- **Finding:** the fourth candidate made Strategium the third primary choice, contradicting the accepted
  VM-613 hierarchy; it also rendered section III before II, over-labeled the hero, repeated optionality,
  and explained rather than visually showed the two parallel specialist destinations.
- **Controlling hierarchy:** the three approximately equal primary choices are **Find my Commander
  direction**, **Find cards**, and **Understand Vox Mana**. Strategium and Apocrypha remain concise,
  subordinate specialist continuations.
- **Smallest complete correction:** restore the third primary choice as an accessible in-page link to the
  existing product map; order the DOM and visual flow I -> II -> III; simplify the hero and reassurance;
  retain the four-step main sequence; add an unnumbered parallel Strategium/Apocrypha treatment; and keep
  the final continuation section compact.
- **Protected behavior:** preserve the exact Maze shell, existing atmosphere, shared navigation/Home Guide
  treatment, first two primary controls, all specialist runtime/content/state, and every later Guide route
  as absent.
- **Finding-to-invariant rule:** focused static and rendered checks must prove the three accepted dominant
  choices, the accessible `#how-vox-connects` landing, I -> II -> III DOM/visual order, concise hero,
  single optionality statement, unnumbered parallel destinations, compact continuations, and Home's four
  functional-path contract.
- **Stop condition:** after focused QA and rendered desktop/mobile review, return to Owner Review without
  commit, push, PR, merge, or VM-615-617 work.
- **Implemented result:** the third primary control is **Understand Vox Mana** and focuses the existing
  product map; the hero and reassurance are concise; the document and visual order are I -> II -> III;
  Strategium/Apocrypha appear as an unnumbered parallel pair and in the compact final continuation row.
- **Rendered result:** current 1440 x 1000 and 390 x 844 witnesses preserve the Maze visual system while
  showing the accepted hierarchy, natural anchor landing, subordinate specialist treatment, mobile
  stacking, and no horizontal overflow.

## Sixth Owner Finding Remediation - 2026-08-31 - Approved in Substance / Superseded Candidate

- **Finding:** the fifth candidate still behaves like repeated site navigation: three equal route cards,
  a linked table-of-contents map, and a generic continuation cluster. It names destinations without
  teaching what each product does or showing a truthful example of what a player receives.
- **Bounded authority change:** for `/guide/` presentation only, the Owner explicitly supersedes the
  approximate three-equal-primary-choice treatment. The accepted VM-613 architecture, four Home paths,
  four-route Guide V1 namespace, specialist ownership, and protected semantics remain controlling.
- **Smallest complete correction:** use a concise hero followed by alternating Archscry, Maze, and
  Strategium teaching sections; one truthful static specimen per surface; a non-link relationship flow;
  one compact Apocrypha source continuation; and one principal body CTA per named product.
- **Truth sources:** the Archscry specimen uses current public result/dossier labels without identity,
  score, or saved-player data; the Maze specimen uses the current Plain Reading compiler's exact output
  for `Red vampires that sacrifice creatures.`; the Strategium specimen uses the current lifecycle and
  Console labels. All specimens are labeled examples and contain no fabricated live result.
- **Protected behavior:** no specialist HTML/CSS/JS, parser, Placement, dossier production, persistence,
  telemetry, atmosphere, shared navigation/Home treatment, or later Guide route may change.
- **Finding-to-invariant rule:** focused static and rendered checks must prove the generic Continue
  cluster and equal router cards are absent; four principal product CTAs are unique; the exact Maze
  translation is visible; the relationship diagram is non-clickable; the specimens are explanatory;
  and mobile, keyboard, reduced-motion, zoom, route, and Home contracts remain sound.
- **Stop condition:** return at **RobQA READY - Owner Review required** without commit, push, PR, merge,
  or VM-615-617 work.
- **Implemented result:** the Guide now uses a concise hero, three alternating explanation/specimen
  chapters, a non-link relationship flow, one compact Apocrypha continuation, and exactly one principal
  body CTA per major surface. The old equal router cards and generic Continue cluster are absent.
- **Rendered result:** the 1440 x 1000 and 390 x 844 witnesses show a restrained editorial rhythm,
  truthful labeled specimens, natural mobile stacking, and no horizontal overflow.

## Seventh Owner Finding Remediation - 2026-08-31 - Current Candidate

- **Finding:** the teaching model is approved in substance, but the hero incorrectly promotes the tagline
  to H1, the product names are too quiet, Sections I/III need stronger reading comfort, and the Maze
  specimen names three modes while demonstrating only Plain Reading.
- **Locked structure:** preserve hero -> Archscry -> Maze -> Strategium -> relationship -> Apocrypha ->
  footer. Do not redesign or add sections, body navigation, or product CTAs.
- **Smallest complete correction:** restore **A Planeswalker's Guide to Vox Mana** as H1; keep **Find your
  place. Shape your play.** important but subordinate; strengthen Guide-only type/spacing/contrast; name
  Archscry, The Implicit Maze, and Strategium in the section kickers; and reuse the existing Maze specimen
  area as a three-state native-button inspector.
- **Verified Maze truth:** Plain Reading keeps the exact approved input/output. Operator's Hand reuses the
  current public direct-syntax example `c:r kw:haste mv<=3 f:modern`. The Loom example is verified against
  the current runtime: Red + Creature + Haste + Commander produces
  `id<=r t:creature f:commander kw:haste`.
- **Interaction boundary:** only the Guide-local Maze specimen changes state. Native buttons expose
  `aria-pressed` and `aria-controls`; information does not depend on hover or animation. Section IV stays
  non-interactive and non-clickable.
- **Deferred candidate for VM-617:** during final onboarding integration/polish, reassess whether Section
  IV would materially benefit from restrained hover/focus/expand behavior. Any future enhancement must
  improve comprehension, work by keyboard/touch, survive reduced motion, and avoid becoming navigation.
  This is not committed VM-617 scope and no new card is created now.
- **Protected behavior:** no Archscry, Placement, dossier, Maze parser/modes/results/Reading Finds,
  persistence, Strategium, Apocrypha, telemetry, accounts, `/library/`, shared typography, atmosphere, or
  later Guide route changes.
- **Stop condition:** after focused QA and Owner Review evidence, stop without commit, push, PR, merge, or
  VM-615-617 work.
- **Implemented result:** the hero now presents the codex flavor line, exact Guide H1, subordinate tagline,
  and one orientation sentence in that order. Sections I-III foreground Archscry, The Implicit Maze, and
  Strategium while retaining their benefit-led headings. Guide-local body copy, question labels, specimen
  labels, CTA spacing, Strategium lane grouping, and contrast have been strengthened without changing the
  shared font system.
- **Maze specimen result:** one compact native-button inspector now exposes Plain Reading, Operator's Hand,
  and Loom in the existing specimen area. Pointer/touch-equivalent activation and Left/Right/Home/End
  keyboard controls toggle `aria-pressed` and one visible panel; reduced motion removes the mode transition.
  The three examples exactly match the verified current behaviors recorded above.
- **Rendered result:** current 1440 x 1000 and 390 x 844 witnesses preserve the locked seven-part structure,
  show the exact semantic hierarchy and prominent product names, keep the relationship map non-interactive,
  stack the mode inspector naturally on mobile, and have no horizontal overflow.

## Implementation Result

- Created `/guide/` with the accepted functional/flavor hierarchy and revised it into a teaching front
  door: Archscry, Maze, and Strategium explanations, truthful static examples, a relationship flow, and
  a bounded Apocrypha source continuation.
- Added the accepted literal Guide navigation entry and order to all 14 canonical public shells; the
  existing mobile clone and active-state behavior remain authoritative.
- Added one separate Home Guide discovery treatment while preserving exactly four functional cards.
- Added Guide metadata/architecture ownership and focused static plus real-browser regression coverage.
- Created no later Guide route and changed no specialist product semantics, state, persistence, or telemetry.

## Eighth Owner Finding Remediation - 2026-08-31 - Current Candidate

- **Finding:** the hero panel is full-width, but the H1 and orientation copy remain artificially capped at
  `23ch` and `62ch`, leaving a large unused right side and making the hero taller than necessary.
- **Smallest complete correction:** remove only those desktop text-width caps, let the short hero copy use
  the available section width, and slightly reduce Guide-local hero type/padding so the panel becomes
  slimmer while retaining the exact approved hierarchy and natural mobile wrapping.
- **Finding-to-invariant rule:** at the desktop review width the rendered H1 must fit on one line, the
  orientation sentence must not wrap from a Guide-authored measure cap, and the hero must remain full-width
  without horizontal overflow at desktop or mobile.
- **Protected behavior:** every word, semantic level, section below the hero, Guide interaction, shared
  shell/atmosphere, specialist route/runtime, and later-route boundary remains unchanged.
- **Stop condition:** focused source/rendered verification and Owner Review evidence only; no commit, push,
  PR, merge, or VM-615-617 work.
- **Implemented result:** Guide-only hero padding now tops out at `2rem`; the H1 and orientation no longer
  carry authored width caps; and the desktop H1 scale is slightly reduced while the existing mobile rule
  continues to own narrow wrapping. No hero copy or markup hierarchy changed.
- **Rendered result:** at 1440 x 1000 the H1 and orientation each occupy one line and the hero is visibly
  shallower; at 390 x 844 the exact hierarchy wraps naturally with no page-level overflow. The following
  Archscry section moves upward but is otherwise unchanged.

## RobQA Result

- Classification: QA-3 shared navigation/routing plus visible product UI.
- The current static invariants reject the superseded equal router and generic Continue structures,
  require three labeled product specimens, pin all three current Maze examples and their Guide-only mode
  runtime, require four unique principal product CTAs, and keep the relationship flow non-clickable.
- Focused HTML, JS, frontend-smoke, metadata, copy-boundary, rendered browser, keyboard,
  reduced-motion, responsive overflow, 200% zoom-equivalent, and diff checks pass.
- Current 1440 x 1000 and 390 x 844 final-presentation witnesses plus separate Operator's Hand and Loom
  state witnesses pass rendered self-QA.
- Home remains exactly four functional product paths with one separate Guide discovery treatment.
- Existing atmosphere on Home, Archscry, Maze, Strategium, Apocrypha, and legal routes is explicitly
  protected and unchanged by this finding remediation.
- Broad fresh-session Archscry browser smoke remains intentionally skipped as the accepted VM-615 gap.
- Disposition: **RobQA PASS - Owner Accepted**.

## Owner-Accepted Closeout - 2026-08-31

- **Owner decision:** VM-614 is Owner Accepted with no remaining product, visual, copy, interaction, or
  polish change authorized during closeout.
- **Exact accepted candidate:** `06196825df786f7ae10509596169fe6e3b841417` on
  `codex/vm-614-field-guide-foundation`.
- **Accepted result:** the full-width Guide hero; Archscry, Maze, and Strategium teaching sections and
  specimens; the accessible three-mode Maze inspector and exact examples; the non-clickable relationship
  model; the compact Apocrypha endcap; Guide navigation; and the separate non-pillar Home discovery link.
- **Deferred note preserved:** Section IV interaction remains only a possible VM-617 polish question, not
  a requirement, current authorization, or reason to create another card.
- **Lifecycle result:** card moved from In Progress to Done; QA disposition advanced from READY to PASS;
  accepted production files remain frozen at the exact candidate commit; closeout changes are metadata only.
- **Later work:** VM-615, VM-616, and VM-617 were not started.
