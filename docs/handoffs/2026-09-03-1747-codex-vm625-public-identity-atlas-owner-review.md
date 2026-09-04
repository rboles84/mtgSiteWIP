# VM-625 Public Identity Atlas - Owner Review Handoff

## Agent name

Codex

## Task requested

Reconcile the owner-supplied VM-625 product contract with current repository authority, inspect the external `color-wheel.html` and supplied `.idcard` example before creating UI, then implement and validate a public 37-destination Identity Atlas, non-personalized dossier browsing, and transient browsed-identity Maze handoff without changing saved readings or Placement.

## Files reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md` and relevant VM-016, VM-579, VM-615, VM-616, VM-624 handoffs
- `docs/kanban/board.md` and related cards VM-016, VM-579, VM-595, VM-615, VM-624
- `data/identity-layers.json` and accepted faction/dossier sources
- Current Archscry boot, saved-reading restoration, identity-only renderer, presentation, navigation, and Maze handoff/search ownership
- `C:/dev/color-wheel-interactive/vox-color/color-wheel.html` and the owner-supplied `.idcard` markup
- Registered worktrees and related local branches before branch creation and again before closeout

## Files changed

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/archscry/index.js`
- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/runtime/actions.js`
- `assets/js/archscry/runtime/boot.js`
- `assets/js/archscry/runtime/dev-review.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/identity-atlas.js` (new)
- `assets/js/archscry/runtime/identity-directory.js` (new)
- `assets/js/archscry/runtime/interview.js`
- `assets/js/archscry/runtime/navigation.js`
- `assets/js/archscry/runtime/questionnaire.js`
- `assets/js/maze/maze-handoff.js`
- `assets/js/maze/research-init.js`
- `maze/index.html`
- `package.json`
- `scripts/lint-frontend-js.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm615-reading-dossier-onboarding-tests.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/archscry/identity-atlas-tests.js` (new)
- `tests/maze/maze-search-tests.js`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-625-public-identity-atlas-explorer.md` (new)
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What changed

- Added the secondary **Explore the Identity Atlas** entry beside the still-primary reading CTA.
- Added `?explore=atlas`, `?explore=<slug>`, and invalid-slug recovery with explicit exploration precedence over passive saved-reading restoration.
- Added a registry-derived directory adapter and grouped native-link Atlas containing exactly 32 Commander color identities plus five separate Strixhaven expressions in VM-579's accepted order.
- Adapted the supplied `.idcard` visual anatomy into a reusable data-driven medallion/card renderer: five mana positions, active nodes/arcs, center sigil, name, color code, and pips. The current external HTML's glass tile, typography, hover/focus, and responsive vocabulary informed the final treatment.
- Reused the accepted dossier composer in `identity-explore` mode and suppressed Placement-only claims, controls, writes, alternatives, observations, personalized Reading Finds, and result persistence.
- Added transient `identity-explore` Maze context, explicit-URL precedence over stale saved handoffs, browsed-identity dossier paths in **From Your Dossier**, browse-specific return language, and no reading association for new Finds.
- Updated the browser-module cache chain so the public route cannot mix old and new explorer, presentation, or Maze-handoff modules.
- Added focused pure and rendered-browser coverage for all required VM-625 journeys and state boundaries.

## Why it changed

VM-625 must let any visitor read the accepted dossier for Jund, Boros, Lorehold, or any other supported destination without taking a quiz, while keeping exploration semantically and persistently separate from Placement.

## Decisions made

- Repository authority wins over the plan's illustrative ordering: VM-579's accepted order is mono, guild, college, shard, wedge, four-color, Colorless, WUBRG.
- The current external `color-wheel.html` has `tile(o)` and `.tile*` styling but no literal `.idcard` implementation. The owner's supplied `.idcard` snippet therefore controls anatomy; the current file controls corroborating visual behavior. Neither supplies identity data.
- Registry `routing.color_identity`/`display_code` controls display color order when its membership exactly matches registry colors, preserving accepted `R · W` for both Boros and Lorehold without collapsing their distinct keys or dossiers.
- Native anchors own navigation. No custom ARIA grid, dropdown, search, filters, or selection state were added.
- No Atlas telemetry was added; Placement telemetry was not reused and no new tracking framework was justified.
- Exploration context is URL/transient memory only. It is never serialized as a reading or normal persistent Maze handoff.

## RobDev compact transfer packet

- **Outcome:** fresh and saved visitors can browse all 37 destinations, open accepted dossiers, traverse Maze with the browsed identity, and return without changing Placement state.
- **Owners/producers:** `data/identity-layers.json` plus accepted factions produce directory identity data; Archscry boot owns exploration precedence; the existing dossier composer owns content; Archscry presentation and Maze handoff own the cross-route context.
- **Changed behavior:** public Archscry routing/UI, identity-only access, and transient Maze context/return language.
- **Protected behavior:** scoring, qualification, confidence, questions, CRIT-001 meanings, dossier prose, saved-reading schema/bytes, Placement telemetry, clean-route restoration, normal Maze/Reading Finds, VM-579 review mode, and VM-624 Loom.
- **Main risks controlled:** saved restore overriding explicit exploration, identity-only renderer leaking result state, stale Maze handoff winning, Guild/College collapse, copied registry data, cached mixed module versions, and responsive/focus failures.
- **Non-goals held:** no identity data/prose rewrite, self-placement, quiz changes, Atlas search/filter/compare, bespoke illustration set, persistent explore state, analytics expansion, or Maze redesign.
- **Stop conditions:** none encountered. VM-624 was integrated. A separate VM-626 worktree appeared late but was clean at collision check and did not overlap this candidate.

## RobQA readiness

- **Tier:** QA-3.
- **Review target:** uncommitted working tree on `codex/vm-625-public-identity-atlas`, based on current branch HEAD `2c8568c832d81f77f9d4202774757a4abccd3ddf`.
- **Objective result:** READY. Exact counts/order/slugs, native links, browse-language boundary, saved-reading byte preservation, URL/history behavior, invalid recovery, Maze context/queries/return, Guild/College distinction, keyboard focus, reduced motion, and desktop/mobile containment are covered.
- **Owner-only judgment:** CTA hierarchy, card polish/density, medallion readability, small-screen scanning, whether Jund clearly feels browsed rather than assigned, saved-reading distinction, and Maze copy naturalness.
- **Disposition:** Owner Review Ready; not Owner Accepted and not committed.

## Tests run

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

Known inherited discrepancy:

- `node tests/maze/maze-search-tests.js` reaches the unchanged raw-mode assertion expecting `c:r f:commander`; production intentionally leaves raw `c:r` unchanged. VM-616's accepted closeout already records this mismatch. VM-625's added launch-state checks execute before it, and the focused Atlas/Maze contracts pass. No raw-search product behavior was changed to satisfy stale broad-suite expectation.

## Owner review path

1. Open `/archscry/`. Confirm **Start the Reading** remains primary and **Explore the Identity Atlas** is secondary but discoverable.
2. Open the Atlas. Judge its hero wording, grouping, density, `.idcard`-derived medallions/pips, and desktop/mobile scanning.
3. Open Jund. Confirm it reads as a chosen dossier, never an assessed result; use **All identities** to open Boros and Lorehold separately.
4. With no saved reading, confirm **Take the reading** is available and exploration creates no saved result.
5. With a saved Azorius reading, browse Jund and use **Return to your saved reading**; confirm Azorius returns unchanged.
6. From browsed Jund, open Maze. Confirm Jund queries appear under **From Your Dossier**, the banner says Jund dossier rather than reading, and return goes to Jund. Repeat Boros/Lorehold if desired to judge same-color semantic distinction.

## Risks / uncertainties

- Owner visual judgment is pending under RobQA's owner-first policy; automated layout facts are not a substitute for taste.
- The inherited broad Maze raw-mode assertion remains stale and is not evidence of a VM-625 regression.
- No physical screen-reader pass was performed. Semantic links, accessible names, focus visibility, DOM order, and keyboard activation contracts are automated.

## Not touched

- Placement scoring, qualification, confidence, bias, questions, or CRIT-001 semantic authority
- Identity/faction/dossier source records or generated dossier prose
- Saved-reading schema, timestamps, placement history, or result authority
- Normal Reading Finds ownership and persistent reading association
- VM-624 Loom behavior
- Developer-only selector exposure
- Telemetry framework/provider/privacy behavior
- Atlas search, filters, comparison, or Guild/College explanatory overlays

## Follow-up recommendations

- Owner performs the six-step visual/product review above.
- Convert only concrete owner findings into the narrowest applicable regression invariant.
- After Owner acceptance, bind the exact candidate SHA, complete the normal card/index lifecycle update, commit, and publish/integrate only with explicit authorization.

## Next suggested agent

Owner for visual/product judgment, then Codex for bounded remediation or accepted-candidate closeout.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-625-public-identity-atlas-explorer.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- VM-579 accepted identity-only renderer/order and Maze-review precedent
- VM-016 saved-reading contract
- VM-615 result-language boundary
- VM-616 accepted Maze context behavior and inherited raw-mode test discrepancy
- VM-624 integrated Loom baseline
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
