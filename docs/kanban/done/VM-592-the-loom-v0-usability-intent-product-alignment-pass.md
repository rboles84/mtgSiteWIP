# VM-592 — The Loom v0 Usability, Intent, and Product-Alignment Pass

ID: VM-592
Title: The Loom v0 Usability, Intent, and Product-Alignment Pass
Status: Done
Type: Product UX / accessibility / interaction
Area: Maze / The Loom v0
Priority: High
Created: 2026-08-28

## Foundation

VM-589, VM-590, and VM-591 are Done and owner accepted. VM-590 supplied the rendered, read-only Loom v0 investigation. VM-591 froze `MazeSemanticState v1` schema version `1.0.0`, including explicit color-domain, color-relation, provenance, and diagnostic concepts, but that contract remains dormant and is not wired into production runtime.

VM-592 is a bounded correction of the currently shipped Loom v0. It is not Loom v1, a general Maze redesign, or authorization for full semantic-state runtime migration.

## Owner-Frozen Product Decision

The Loom is Commander-first. When a user selects colors, the default player-facing rule is:

**Fits these Commander colors**

The semantic relation is `id<=COLORS`. Selecting W + U therefore defaults to `id<=wu`, which includes cards whose color identity fits within WU: mono-white, mono-blue, WU, and colorless identities. It does not mean exact printed WU colors.

Other explicitly selectable color relations may remain available, but each exposed relation must remain player-facing, understandable, and semantically distinct. The implementation must not infer the relation from selected pips alone or label a color-identity relation as printed color.

## Product Outcome

Make the shipped Loom v0 understandable, Commander-first, visually coherent with Vox Mana, accessible, causally ordered, truthful about its current capabilities, and effective at moving a player from filters to useful Maze results. It should read as a visual way to shape a Commander card search while seeing the real query being built, not as a generic advanced-search form with a Loom label.

## Must Fix

### 1. Explain what The Loom does

- Preserve the approved public name, **The Loom**.
- Give the active surface an action-oriented purpose and hierarchy so a player understands that the controls visually shape a Scryfall/Maze query without requiring syntax memorization.
- Do not introduce Loom v1 concepts, threads, graph nodes, recommendations, or deckbuilding.

### 2. Put construction before execution

At desktop and mobile widths, present the causal sequence as:

1. Loom purpose/mode;
2. relevant context status;
3. query-building controls;
4. live query reflection;
5. Search / Copy / Open;
6. Reading Finds / results flow.

At approximately `390 × 844`, Search/Copy/Open must not precede the controls that construct the query. Preserve the owner-accepted single-column mobile action treatment once the player reaches the actions.

### 3. Apply Commander-first color semantics

- Default to **Fits these Commander colors** using `id<=`.
- W + U must produce `id<=wu`.
- Make the consequence clear in displayed meaning, summary, and query.
- Keep exact printed colors and any other exposed relations semantically distinct.
- Do not infer the color relation from the selected pips alone.

### 4. Use canonical accessible Mana Font pips

Replace the current W/U/B/R/G/C letter-circle controls with the locally available Mana Font language already used by Vox Mana. Preserve canonical WUBRGC order and provide accessible names, `aria-pressed` or an equivalent selected state, a visible non-color selected indicator, approximately 44 × 44 minimum interactive targets, keyboard operation, and proper focus treatment. Reuse local assets; do not add an icon library.

### 5. Provide one live query reflection

Consolidate redundant generated-query displays into one authoritative visible live reflection while preserving the underlying Maze contracts. It must update when filters change. For a valid current query, Copy and Open in Scryfall must work before Search. Search execution is not required merely to acknowledge a valid query. `MazeQueryResult.query` remains the sole executable-query contract.

### 6. State dossier context truthfully

When Archscry/dossier context is available but has not been applied to Loom filters or the query, state that explicitly, for example: **Dossier context: Jund · not applied to filters**. Do not automatically select colors, apply placement weighting, personalize results, infer deck identity, or change query truth from dossier context.

### 7. Use semantic groups and player language

Communicate meaningful groups through native `fieldset`/`legend` or an accessible equivalent. Expected concepts include Commander colors, card shape/type, and search scope/details. Prefer player-facing language such as **Mana value**, not **CMC**, while keeping raw Scryfall syntax visible in the live query reflection.

### 8. Deliver successful search results

After Search succeeds, announce the result count/status appropriately and visibly deliver the player to the result state. Focus/scroll behavior must be deliberate and keyboard-safe, respect reduced-motion preference, and retain the query for refinement. Do not redesign result cards, Reading Finds, modal behavior, or ranking; this is result delivery, not result-system redesign.

### 9. Validate contradictory Loom state

When minimum mana value exceeds maximum mana value, detect the invalid range before execution, associate a specific message with the relevant controls, preserve entered values for correction, focus or otherwise expose the invalid control, and block invalid execution. VM-591 diagnostic concepts may be reused where useful, but this does not authorize full semantic-state runtime migration.

## Should Fix Only If Cohesive

- Concise feedback explaining mode continuity between Loom and Operator Hand.
- Removal of redundant internal “The Loom / Query loom” hierarchy.
- A restrained Loom sigil or visual motif using accepted product language and subject to rendered Owner Review.
- More specific empty-state or refinement guidance derived from obvious active filters.

These items must not delay, weaken, or broaden the nine Must Fix items.

## Reuse-First Ownership Direction

The implementation pre-flight must inspect and reuse the existing Maze route shell, Vox Mana typography/tokens, Maze glass/panel treatment, local Mana Font assets, existing buttons/chips/focus patterns, current results and Reading Finds, Archscry handoff, current Loom `builderFilters`, the Maze query contract, and VM-591 color-relation and diagnostic concepts. Do not introduce a Loom-specific UI framework or a second executable-query owner.

Likely implementation surfaces, subject to fresh ownership confirmation, are:

- `maze/index.html` for Loom structure and accessible grouping;
- `assets/css/maze.css` for composition, pips, focus, and responsive order;
- `assets/js/maze/research-init.js` for mode composition, actions, context truth, and result delivery;
- `assets/js/maze/research-builder.js` only where builder state, default relation, or validation requires it;
- `tests/maze/research-builder-tests.js`;
- `tests/maze/maze-search-tests.js`;
- `tests/maze/maze-results-layout-tests.js` only where necessary.

Nearby runtime owners are not authorized merely because they are nearby.

## Dependencies

- Owner-accepted VM-590 Loom v0 investigation and bounded repair direction.
- Owner-accepted VM-591 semantic-state contract/schema `1.0.0`, used as a representational constraint without runtime migration.
- Existing `MazeQueryResult.query` sole executable-query contract.
- Existing Maze shell, builder state, result flow, Reading Finds, modal, mode-continuity, Scryfall execution, and Archscry handoff contracts.
- Existing local Mana Font and Vox Mana interaction/focus patterns.
- VM-583 owner-accepted mobile single-column action treatment.

## Risks

- Scope creep into Loom v1, graph work, recommendation/deckbuilding behavior, or a general Maze redesign.
- Accidentally creating a second query owner or turning a focused validation change into full semantic-state runtime migration.
- Mismatch among the player-facing color label, semantic relation, summary, and generated query.
- Treating dossier context as applied truth or introducing placement/personalization implicitly.
- Regressing mobile action treatment, keyboard/focus behavior, reduced-motion behavior, result delivery, mode continuity, or protected result surfaces.
- Expanding into broad CSS cleanup or unrelated nearby runtime owners.

## Protected Behavior

- Plain Reading and Operator Hand behavior.
- Loom/Operator mode continuity except for the explicitly approved feedback/composition correction.
- `MazeQueryResult.query` as the sole executable-query contract.
- Existing result cards, Reading Finds, modal behavior, Scryfall execution, and Archscry handoff.
- Placement, recommendation/ranking, dossier truth, generated data, and unrelated semantic authorities.
- VM-591 contract/schema/fixtures/tests and its dormant-runtime boundary.
- VM-583 accepted mobile action treatment once the action region is reached.

## Backlog Containment / Explicitly Out of Scope

- Loom v1 concept registry, Related Threads, graph/canvas/nodes/edges, or dormant `.vm-loom-graph` activation.
- Commander Finder, recommendation ranking, “best card” behavior, deckbuilding, package mode, custom cards, or combo discovery.
- Placement weighting, automatic dossier application, saved searches, accounts, personalization, taste profiles, collection import, or returning-user commander fit.
- Broad Archscry/Strategium redesign; result-card, Reading Finds, or modal redesign.
- Generalized CSS refactor or unrelated legacy cleanup.
- Full Plain Reading or shared semantic-state runtime migration.

Existing backlog is context, not automatic scope.

## Acceptance Criteria

### AC1 — Correct Loom hierarchy

At desktop and approximately 390 × 844, Loom presents purpose/context/construction before execution actions, without horizontal overflow, and the interaction reads as a visual query composer rather than a conventional advanced-search form.

### AC2 — Commander color behavior and accessible pips

Color controls use canonical accessible Mana Font pips with appropriate target sizes and selected/focus states.

Default player-facing behavior is:

**Fits these Commander colors**

with W/U producing the semantic equivalent of:

`id<=wu`

Displayed meaning, summary, and generated query must agree.

### AC3 — Live query and validation

One live query reflection updates from current builder state.

For valid state:

- Copy/Open are available before Search.

For invalid state such as min MV > max MV:

- execution is blocked;
- local specific guidance is shown;
- entered controls remain available for correction.

### AC4 — Result delivery and context truthfulness

Search preserves the existing sole executable-query contract and visibly delivers status/results through appropriate announcement/focus/scroll behavior.

Dossier context clearly states whether it is applied.

No placement/recommendation behavior is introduced.

### AC5 — Protected Maze behavior remains intact

Plain Reading, Operator Hand, Loom mode continuity, result cards, Reading Finds, modal behavior, Scryfall execution, and Archscry handoff remain functionally intact except for explicitly approved VM-592 changes.

Focused deterministic tests and rendered desktop/mobile QA pass.

## Required Owner Review

Before closeout, provide exact local pages and steps and obtain rendered Owner Review for:

- desktop Loom;
- Loom at `390 × 844`;
- default W/U Commander-color query;
- alternate color-rule behavior;
- selected, unselected, and focused Mana pips;
- live query reflection;
- valid Copy/Open-before-Search;
- invalid mana-value range;
- dossier context present but not applied;
- successful result delivery;
- mode switching to and from Operator Hand.

## RobDev Pre-Implementation Contract

- Changed behavior: Loom v0 hierarchy, color-default communication, pip presentation/accessibility, live query presentation/actions, dossier-context disclosure, form grouping/language, result delivery, and contradictory-range handling.
- Owning authority: this owner-frozen story, constrained by VM-590 findings, VM-591 contract/schema `1.0.0`, current Maze query/result contracts, and existing runtime ownership.
- Smallest complete implementation: the nine Must Fix items on the existing Loom v0 surface using existing owners and assets.
- Non-goals: every item in the explicit out-of-scope section and any runtime migration beyond the narrow behavior needed for these acceptance criteria.
- Stop conditions: stop on authority conflict, need for an additional runtime owner, query-owner duplication, semantic migration pressure, or any required expansion beyond this card; return to owner before proceeding.

## RobQA Readiness Boundary

This registration is a QA-0 documentation/Kanban change. Eventual implementation is a visible, interaction-sensitive accessibility change and requires focused deterministic automation, rendered desktop/mobile self-QA, keyboard/focus and reduced-motion checks, and the bounded Owner Review above. Broad unrelated suites are not justified unless implementation changes a protected contract that requires them.

## Registration Outcome

- [x] Scope, nine Must Fix findings, five acceptance criteria, frozen color decision, dependencies, risks, protected behavior, and backlog containment recorded.
- [x] Story registered at Ready, the normal pre-implementation readiness boundary.
- [x] Implementation authorized on 2026-08-28; stop at Owner Review without commit, push, or Done transition.

Implementation is authorized. Stop at Owner Review; do not commit, push, or mark Done.

## First Implementation Pass — Owner Review Boundary

Completed locally on 2026-08-28 from baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- All nine Must Fix items are implemented through the existing Maze route, builder, query-action, handoff-disclosure, and result-delivery owners.
- The default W/U projection is `id<=wu f:commander`; exact printed colors remain separately exposed as `c=wu f:commander`.
- Colorless alone preserves accepted `id:c` behavior. Mixed `C` plus colored pips in the default Commander-fit relation fails closed with local guidance because no accepted mixed rule exists.
- Focused builder, mode, live-query/action, invalid-state, dossier, query-contract, DOM/layout, lint, and whitespace checks pass.
- Desktop and `390 × 844` rendered walkthroughs pass with one live query, 44 × 44 pips, construction-before-action order, no mobile horizontal overflow, and deliberate result focus/scroll.
- The broad `node tests/maze/maze-search-tests.js` command retains the accepted inherited `c:r` versus `c:r f:commander` Operator assertion failure already recorded under VM-579/VM-583. VM-592 does not alter that protected runtime expectation; its focused Loom path passes through `--vm592-focused`.
- Owner judgment remains limited to the rendered product feel, wording, visual balance, and the explicit mixed-colorless product decision.

See `docs/handoffs/2026-08-28-1821-codex-vm592-loom-v0-owner-review.md` for the RobDev/RobQA packet, exact test results, evidence, and review steps.

## Owner Review Disposition — Needs Revision

The owner accepted the overall direction and returned a bounded remediation list. The first-pass Owner Review handoff is retained as historical evidence but its readiness disposition is superseded.

## Bounded Owner Review Remediation — Owner Re-Review Boundary

Completed locally on 2026-08-28 from the same baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Simplified the active purpose hierarchy to **The Loom** → **Shape a Commander search** → “Choose what you want. The Loom builds the Scryfall query as you refine it.”
- Centered the Loom workspace at a route-local maximum width while leaving results unconstrained.
- Reorganized controls into **Commander colors**, **Card type**, and **Refine**; retained compact native Format and color-relation selects.
- Kept `#builder-summary` as a screen-reader-only seam and retained one visible live query labeled **Live Scryfall query**.
- Added an explicit keyword **Add** action while preserving Enter/comma commits and quoted multiword keywords.
- Replaced automatic result focus/scroll with a nearby visible count and explicit **View results** action; Search restores focus to its initiating button without scrolling.
- Removed the persistent Loom-reset toast and consolidated invalid mana-value guidance to one affected-group message.
- Moved truthful dossier disclosure beside the Loom purpose and made the label resilient to canonical dossier display names without changing query state.
- Hid duplicate sidebar color/format controls only in Loom and restored them in Plain Reading and Operator Hand.
- Added the Loom-specific first-load/reset empty state.
- Separated WUBRG from **Colorless only**, retained `C` alone as `id:c`, prevented all mixed C+WUBRG states, and added the live-verified **Exclude colorless cards** option for Commander-fit WUBRG selections.

Live Scryfall verification accepted `id<=br -id:c f:commander`: the search returned 9,992 cards, a colored Terminate control remained present, Sol Ring was present under `id<=br f:commander`, and exact Sol Ring returned zero cards after `-id:c`. The frozen builder seam is therefore `id<=COLORS -id:c` only when the player explicitly checks **Exclude colorless cards**.

Focused builder, VM-592 search, mode, query-contract, layout, JS lint, HTML validation, and whitespace checks pass. Desktop `1440 × 1000` and mobile `390 × 844` rendered QA pass with no mobile horizontal overflow, 44 × 44 WUBRG targets, causal DOM order, truthful dossier disclosure, explicit result delivery, colorless-only behavior, and verified WUBRG exclusion.

The broad `node tests/maze/maze-search-tests.js` command still stops only at the protected inherited `c:r` versus stale `c:r f:commander` Operator assertion. This remediation does not alter that protected contract or weaken its test.

See `docs/handoffs/2026-08-28-2313-codex-vm592-owner-review-remediation.md` for exact evidence and Owner Re-Review steps.

**Current disposition:** READY FOR BOUNDED OWNER RE-REVIEW WITH THE INHERITED OPERATOR BASELINE EXCEPTION DISCLOSED. VM-592 remains In Progress. Do not commit, push, mark Done, begin Loom v1, or wire VM-591 runtime state.

## Owner Re-Review Disposition — Needs Revision

The owner accepted the architecture, query behavior, color semantics, validation, dossier truthfulness, result delivery, mobile causal order, and protected runtime boundaries. The first bounded remediation handoff remains historical evidence, but its readiness disposition is superseded by a second bounded visual/interaction remediation.

Authorized corrections are limited to:

- replace the desktop two-column control grid with full-width **Colors**, **Card Type**, **Abilities**, and **Refine** sections while preserving the accepted mobile order;
- moderately widen only the Loom construction/query/action workspace, not the page shell or result surfaces;
- remove visible redundant `WUBRG`, `Colorless`, `Color relation`, and `Type` micro-labels while retaining accessible names;
- keep Colorless only visually and semantically separate from W/U/B/R/G, with existing query semantics unchanged;
- replace the visible native color-relation popup only through a safe reused native disclosure pattern, retaining a native fallback rather than creating an ad hoc inaccessible listbox;
- expose the existing eight top-level card-type chips directly without inventing a broader type taxonomy;
- promote governed `kw:` keyword abilities into a first-class **Abilities** section, preserving text Add/Enter/comma/multiword behavior and the existing catalog-backed suggestion seam;
- keep **Refine** limited to Format, Mana value, and Rarity.

Protected behavior from both accepted implementation passes remains frozen. No new query semantics, generalized mechanics picker, type/subtype inventory, Loom v1 behavior, shared semantic-state runtime, result redesign, Operator correction, commit, push, or Done transition is authorized.

**Current disposition:** SECOND BOUNDED OWNER RE-REVIEW REMEDIATION IN PROGRESS. Stop uncommitted at Owner Re-Review.

## Second Bounded Owner Re-Review Remediation — Owner Re-Review Boundary

Completed locally on 2026-08-28 from the same baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Replaced the desktop two-column form with full-width **Colors**, **Card Type**, **Abilities**, and **Refine** sections inside a moderately wider 1200px Loom-only workspace.
- Removed the visible WUBRG, Colorless, Color relation, and Type micro-labels while retaining accessible names.
- Kept Colorless only visually distinct and hid WUBRG-only relation/exclusion controls while it is active; accepted `id:c`, no-mixed, and explicit `-id:c` behavior remains unchanged.
- Reused the route's native disclosure pattern for the four color relations with pointer/touch, focus-visible, Escape, outside close, focus restoration, and selected state.
- Kept all eight top-level card types visible and deferred additional type taxonomy because no governed player-facing inventory currently distinguishes type/supertype/subtype/form safely.
- Added common governed keyword-ability controls plus More abilities using the checked-in `keywordAbilities` catalog; actions/mechanics are not offered or committed as abilities.
- Kept Refine limited to Format, Mana value, and Rarity.
- Preserved all previously accepted query, validation, dossier, result, sidebar, mode, mobile, and protected runtime behavior.

Focused builder, VM-592 search, mode, query-contract, layout, JS/HTML lint, syntax, and whitespace validation pass. Rendered QA passes at `1440 × 1000` and `390 × 844`, including real pointer/keyboard relation use, More abilities, 44px pips, no mobile overflow, causal action order, truthful dossier context, and explicit result delivery.

See `docs/handoffs/2026-08-28-2345-codex-vm592-second-owner-rereview-remediation.md` for exact implementation decisions, tests, measurements, protected contracts, deferrals, and the bounded owner walkthrough.

**Current disposition:** READY FOR BOUNDED OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, begin Loom v1, correct the inherited Operator assertion, or wire VM-591 runtime state.

## Final Owner Re-Review Disposition — Needs Revision

The owner accepted all underlying VM-592 behavior and returned one final bounded visual/accessibility polish pass. The second remediation handoff remains historical evidence, but its readiness disposition is superseded.

Authorized corrections are limited to:

- use the remaining desktop space for a passive, derived **Current Weave** reflection that cannot write builder state or query truth and may be omitted on mobile;
- complete the existing native color-relation disclosure's predictable arrow, Enter/Space, Escape, outside-close, selected-state, and focus behavior without changing relation semantics;
- reuse only verified local Mana v1.18.0 card-type, governed ability, and generic rarity glyphs alongside persistent text labels;
- complete the existing governed More Abilities suggestions as a keyboard-operable combobox/listbox using the same `bFilters.keywords` state as chips, Add, Enter, and comma;
- give the existing rarity controls restrained, non-color-only Common/Uncommon/Rare/Mythic material states without set symbols or Keyrune;
- retain exactly one visible **Reset Loom** action because the current generic Loom clear action is behaviorally identical;
- keep the previously accepted mobile composition, query/result contracts, and all protected Maze surfaces unchanged.

No new asset, query authority, semantic catalog, framework, mechanics/type picker, results surface, recommendation behavior, Loom v1 work, VM-591 runtime migration, Operator correction, commit, push, or Done transition is authorized.

**Current disposition:** FINAL BOUNDED VISUAL/ACCESSIBILITY REMEDIATION IN PROGRESS. Stop uncommitted at Owner Re-Review.

## Final Bounded Visual / Accessibility Remediation — Owner Re-Review Boundary

Completed locally on 2026-08-29 from the same baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Added a passive desktop **Current Weave** derived only from accepted builder projection, validation, and matched result metadata; it has no controls or query-write path and is omitted at mobile width.
- Reused verified local Mana v1.18.0 glyphs beside persistent text for all eight accepted top-level card types, the eight accepted common abilities, First strike suggestions, and all four rarities.
- Completed More Abilities as a keyboard-operable combobox/listbox while retaining the single `bFilters.keywords` state, Add, direct Enter, comma, multiword terms, pointer/touch, and duplicate prevention.
- Completed relation disclosure ArrowDown/ArrowUp/Home/End/Escape focus behavior without changing its four accepted semantic relations.
- Added restrained gunmetal, silver, gold, and copper/ember rarity materials with non-color check states and independent focus rings, using the generic Mana rarity glyph rather than set symbols.
- Retained exactly one visible **Reset Loom** because both existing Loom actions resolved to `resetBuilderFilters`; Plain/Operator Clear behavior is unchanged.
- Preserved all accepted Commander/colorless syntax, query execution ownership, result delivery, dossier truth, mode continuity, mobile causal order, and protected runtime surfaces.

Focused builder, VM-592 search, mode, query-contract, layout, JS/HTML lint, syntax, and whitespace checks pass. Rendered QA passes at `1440 × 1000` and `390 × 844`, including Current Weave empty/active/result/invalid states, icon/text scanning, premium rarity states, keyboard autocomplete, keyboard relation disclosure, long-query wrapping, real 704-card result delivery, colorless-only and exclude-colorless syntax, 44px mobile pips, no mobile overflow, and preserved action order. Browser diagnostics reported no runtime errors.

See `docs/handoffs/2026-08-29-0755-codex-vm592-final-visual-accessibility-remediation.md` for the exact implementation map, RobDev/RobQA packet, deterministic results, rendered evidence, protected contracts, deferrals, and bounded owner walkthrough.

**Current disposition:** READY FOR FINAL OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, begin Loom v1, correct the inherited Operator assertion, or wire VM-591 runtime state.

## Final Bounded Owner Polish Disposition — Needs Revision

The owner accepted the overall Loom implementation and returned one last bounded polish list. The preceding visual/accessibility handoff remains historical evidence, but its readiness disposition is superseded.

Authorized corrections are limited to:

- add a few pixels of breathing room between the existing Colors, Card Type, and Abilities groups;
- apply every exact locally verified Mana v1.18.0 ability glyph consistently across common controls, governed autocomplete options, and removable keyword chips without changing keyword authority;
- centralize presentation-only canonical identity names for all owner-listed one-, two-, three-, four-, five-color, and colorless states;
- replace formal “constraints woven” language with singular/plural player-facing “choice/choices woven” using the existing derived count;
- give Current Weave a final restrained arcane/cartographic finish while preserving its text hierarchy, identity accents, read-only behavior, and query-truth isolation;
- let normal long Loom queries wrap and grow without a nested vertical scrollbar or label overlap;
- define a width-only Current Weave policy: full large-desktop panel, compact full-width medium/tablet panel, and intentional phone omission;
- reuse the Maze's restrained lift/border/glow language on the existing clickable random no-result specimen without changing its semantics.

Plain Reading ↔ Operator translation quality and shared three-face query persistence / partial Loom hydration are recorded as future story candidates only. No cards are created and no runtime/parser/hydration work is authorized here.

All accepted Commander/colorless syntax, execution ownership, builder structure, autocomplete behavior, result delivery, dossier/sidebar behavior, Plain/Operator runtime, VM-591 dormancy, and Loom v1 boundaries remain frozen.

**Current disposition:** FINAL BOUNDED OWNER POLISH IN PROGRESS. Stop uncommitted at final Owner Re-Review.

## Final Bounded Owner Polish — Owner Re-Review Boundary

Completed locally on 2026-08-29 from baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Added a small, token-sized rhythm increment between the existing builder groups and slightly more internal group breathing room without changing their structure or mobile causal order.
- Audited all 220 governed keyword abilities against the checked-in Mana v1.18.0 CSS. All 87 exact local mappings now render consistently in common controls, More Abilities options, and removable selected chips; the other 133 remain text-only by design.
- Centralized all owner-listed mono-, two-, three-, four-, five-color, and colorless Current Weave identity names as presentation-only data. Selection order does not affect the name, and query state is unchanged.
- Replaced “constraints woven” with the existing derived `choice/choices woven` count and removed a misleading empty-quality line from identity-only states.
- Applied a restrained arcane/cartographic Current Weave treatment using only existing CSS vocabulary, identity accents, metallic linework, low-opacity circles, and static thread geometry.
- Removed the nested long-query scroll behavior. The single live reflection now wraps and grows; Copy and Open still receive the complete query.
- Defined a width-only responsive policy: full side panel above 1050px, compact full-width reflection from 641px through 1050px, and intentional omission at 640px and below.
- Reused the existing Maze card-like hover vocabulary for the already-clickable random specimen while preserving safe external-link semantics and reduced-motion behavior.

Focused builder, VM-592 search, mode/leakage, query-contract, layout, JS/HTML lint, syntax, and whitespace checks pass. Rendered QA passes at `1440 × 1000`, `1024 × 900`, `820 × 900`, `768 × 900`, and `390 × 844`, with no horizontal overflow, no accidental height breakpoint, no nested live-query scrollbar, and the accepted phone experience preserved.

Plain Reading / Operator translation and cross-face Loom hydration were not modified. Future work should separately investigate generated/regression coverage for Plain Reading ↔ semantic state ↔ Operator translation quality, and shared three-face query persistence where Loom hydrates only representable clauses while preserving and disclosing the complete query. No follow-up cards were created.

See `docs/handoffs/2026-08-29-0937-codex-vm592-final-owner-polish.md` for the exact implementation map, deterministic results, rendered evidence, RobDev/RobQA packet, protected boundaries, and bounded Owner Re-Review steps.

**Current disposition:** READY FOR FINAL OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, correct the inherited Operator assertion, begin Loom v1, or wire VM-591 runtime state.

## Final Owner Re-Review Semantic Correction — Needs Revision

The owner accepted the implementation and QA evidence except for one bounded semantic overclaim in Current Weave. Treating raw color combinations as named identities incorrectly implied that color eligibility alone selects a faction, institution, plane philosophy, or playstyle.

The controlling boundary is:

> **Colors determine eligibility. Named identities describe expression.**

VM-592 owns only the first part. Its centralized display mapping must use neutral color labels such as **Red–White**, **Blue–Red**, **Black–Green**, **Black–Red–Green**, and **White–Blue–Black–Red**. Named identities such as Boros, Lorehold, Izzet, Prismari, Golgari, Witherbloom, Jund, and the other certified identity lenses remain available for a separate future feature.

This correction is presentation-only. It must not add identity selection/ranking, alter selected colors, change `id<=` or alternate relation syntax, touch query ownership, or expand into the future identity-lens story.

**Current disposition:** FINAL BOUNDED SEMANTIC CORRECTION IN PROGRESS. Stop uncommitted at Owner Re-Review.

## Final Bounded Semantic Correction — Owner Re-Review Boundary

Completed locally on 2026-08-29 from baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Renamed the presentation owner from identity-name terminology to a neutral color-label seam.
- Replaced every faction/institution identity alias in that seam with the corresponding neutral mono-, two-, three-, four-, five-color, or Colorless label.
- Preserved selection-order independence, identity-responsive pips/accent, relation wording, choice count, dossier disclosure, and all Current Weave read-only/query-isolation guarantees.
- Preserved W/U as `id<=wu f:commander`, BRG as `id<=brg f:commander`, WUBR as `id<=wubr f:commander`, and every existing builder/execution contract.
- Added complete table-driven coverage for neutral labels and retained the existing query-neutral presenter assertions.

Focused builder, VM-592 search, mode/leakage, query-contract, layout, JS/HTML lint, syntax, and whitespace checks pass. Rendered QA passes at `1440 × 1000`, `1024 × 900`, `820 × 900`, `768 × 900`, and `390 × 844`: neutral labels fit the full and compact Current Weave, phone omission remains intentional, no horizontal overflow appears, 44px pips remain intact, and browser diagnostics report no warnings or errors.

The live BRG desktop route rendered **Black–Red–Green fit** beside `id<=brg f:commander`, while the truthful dossier disclosure continued to say `Jund dossier context available · not applied to filters`. This makes the boundary visible: dossier identity context exists, but raw Loom colors determine only eligibility.

No Boros, Lorehold, Izzet, Prismari, Golgari, Witherbloom, Jund, other identity-lens selection/ranking, query change, parser work, hydration, VM-591 runtime, or Loom v1 work was added.

**Current disposition:** READY FOR FINAL OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, create/start the future identity-lens story, correct the inherited Operator assertion, begin Loom v1, or wire VM-591 runtime state.

## Surgical Format Dropdown Alignment — Owner Correction

The owner accepted the preceding VM-592 behavior and requested one presentation-only correction: make the native `#bld-format` select visually match the existing **More abilities** summary control as closely as appropriate.

The existing `.more-abilities > summary` styling is the canonical visual reference. The correction may reuse its height, border, background, typography, padding, radius, hover, focus, and alignment rules. Format options, values, default Commander selection, query semantics, event handling, builder state, More Abilities behavior, responsive architecture, surrounding layout, and all other controls remain frozen.

**Current disposition:** SURGICAL FORMAT DROPDOWN ALIGNMENT IN PROGRESS. Stop uncommitted at Owner Re-Review.

## Surgical Format Dropdown Alignment — Owner Re-Review Boundary

Completed locally on 2026-08-29 from baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Added `.bld-select` to the existing `.more-abilities > summary` control surface, hover, and focus-visible selector groups.
- Removed only the later generic form-field rules that conflicted with that canonical surface; retained a narrow `max-width`, inherited-font, and outline-reset rule for the native select.
- Added `.bld-select` to the existing `max-width: 560px` full-width control group so Format and More Abilities remain aligned inside the accepted phone stack. No breakpoint or responsive architecture was added or changed.
- Preserved the native `<select>`, all eight options and values, default Commander selection, keyboard/pointer behavior, existing change handler, builder state, and query projection.

Computed desktop evidence shows both controls use the same 44px minimum height, 1px soft border, 14px radius, `rgba(8, 11, 18, 0.34)` surface, Spectral 18px typography, 8px × 12px padding, and pointer affordance. Their rendered heights are 46.8px and 47px. Hover uses the same teal-line/gold-wash response and keyboard focus uses the same 3px gold ring with 3px offset.

Commander remains selected on cold Loom with `f:commander`. Selecting Modern produces `f:modern`; selecting Commander again restores `f:commander`. At `390 × 844`, Format and More Abilities are both 291.8px × 44px, `scrollWidth === clientWidth === 375`, and no overflow appears. At `820 × 900`, the existing tablet composition remains intact with no overflow. Browser diagnostics report no warnings or errors.

Focused layout, VM-592 Loom search, builder, JS/HTML lint, and whitespace checks pass. No JavaScript, HTML, format option, behavior, query, state, event, More Abilities interaction, or unrelated control was changed by this correction.

**Current disposition:** READY FOR FINAL OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, broaden the story, or change accepted runtime behavior.

## Final Owner Acceptance And Closeout

Owner accepted VM-592 on 2026-08-29 after the final rendered Format-control and shared empty-state corrections. The complete bounded Loom v0 usability, intent, accessibility, query-truth, result-delivery, responsive, and visual-alignment implementation is accepted.

The closeout preserves the governing product boundary:

> **Colors determine eligibility. Named identities describe expression.**

The accepted story includes the neutral color-label correction, More Abilities-aligned Format control and picker, and final Plain Reading / Operator shared cold-state containment. It does not include identity-lens selection, Boros-versus-Lorehold interpretation or ranking, faction/playstyle ranking, cross-face or Placement-to-Loom hydration, three-face persistence, unsupported-clause disclosure, Plain Reading parser changes, Operator translation changes, the inherited protected Operator assertion, VM-591 runtime wiring, or Loom v1.

Final focused builder, VM-592 search, mode/leakage, query-contract, layout/hover, lint, HTML, syntax, whitespace, and staged-whitespace results are recorded in the VM-592 closeout handoff. No further product changes are authorized by this closeout.

**Final status:** OWNER ACCEPTED — DONE. Close, commit, and publish the accepted cumulative VM-592 state; do not reopen implementation during closeout.

## Shared Plain Reading / Operator Mobile Empty-State Finding — Owner Re-Review Boundary

Owner evidence showed the shared **Start with a search thread** cold state appearing clipped at the left and right edges on phone width in both Plain Reading and Operator's Hand.

Completed locally on 2026-08-29 from baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Added explicit zero-minimum/full-width containment at the existing shared `.state-panel` presentation owner.
- Increased phone inline breathing room slightly, set the body copy to a readable `38ch`, reduced mobile title tracking, made wrapping safe, and kept the inline `c:r kw:shroud` example unbroken at every width through the shared base selector.
- Preserved the existing copy, Plain Reading and Operator runtime/parser/query behavior, result behavior, Loom state, and mode switching.
- At `390 × 844`, both modes render the title about 41px from the viewport edges and body copy about 36px from the edges; `c:r kw:shroud` remains one line and `scrollWidth === clientWidth === 375`.

Focused layout and mode coverage pass; the rendered shared state passes in both Plain Reading and Operator's Hand. No JavaScript or HTML changed for this correction.

**Current disposition:** READY FOR FINAL OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, broaden the story, or change accepted runtime behavior.

## Open Format Menu Owner Finding — Needs Revision

Owner evidence showed that the first surgical pass aligned only the closed Format control. The expanded native Windows/Chromium option menu remained light, visually inconsistent with the dark More Abilities suggestions panel, and difficult to read. That prior visual-readiness claim is superseded.

This correction remains presentation-only. The native select, options, default Commander selection, keyboard/pointer behavior, existing event/state/query ownership, More Abilities behavior, surrounding layout, and responsive architecture remain frozen.

## Open Format Menu Correction — Owner Re-Review Boundary

Completed locally on 2026-08-29 from baseline `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b` and intentionally left uncommitted.

- Added `color-scheme: dark` to `.bld-select` so its browser-owned popup chrome and scrollbar request the dark scheme.
- Added an opaque `rgb(8, 11, 18)` option surface with the existing `var(--maze-text)` foreground, matching the dark/readable More Abilities visual language while preserving the native select.
- After Owner evidence exposed the remaining native white border and gray/white active row, added a supported-Chromium `appearance: base-select` enhancement that copies the actual More Abilities popup and option values: 180px scroll surface, line/radius/black wash/shadow, 44px rows, padding, muted text, and restrained gold hover/focus/selected state. The dark native fallback remains for unsupported browsers.
- Added a focused deterministic layout assertion for the native-popup color-scheme and option colors.
- Preserved all options/values, Commander default, selection behavior, keyboard access, query projection/execution, layout, and responsive rules.

Focused layout, VM-592 search, and 11-case builder suites pass; `git diff --check` passes. The current Chromium reports support for `appearance: base-select`, `::picker(select)`, and `::picker-icon`; computed picker evidence confirms the copied dark background and soft border. At `390 × 844`, the control remains 291.8px × 44px, the page remains overflow-free, Modern still projects `f:modern`, and Commander restores `f:commander`.

**Current disposition:** READY FOR FINAL OWNER RE-REVIEW. VM-592 remains In Progress. Do not commit, push, mark Done, broaden the story, or change accepted runtime behavior.
