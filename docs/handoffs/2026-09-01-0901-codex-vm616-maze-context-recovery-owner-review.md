# VM-616 Maze Context, Translation, and Recovery — Owner Review Handoff

## Agent name

Codex

## Task requested

Create and execute VM-616 through bounded implementation, focused RobQA, rendered self-review, and an
Owner Review-ready handoff. Incorporate the Owner's pre-edit clarification that `independent=1` is
temporary contextual state only and must not redesign or mutate Reading Finds, saved readings, retained
handoff state, active query, `readingId`, or persistence schema. Do not self-accept, merge, or start VM-617.

## Pre-flight summary

- Current `main` and `origin/main` were both
  `196a196f67e760ee72cba4e25def02ed7d87342f`, with accepted VM-613, VM-614, VM-615, and VM-618 history
  present and their accepted candidates ancestral.
- Recent related work established the four-route Guide contract, the accepted Guide shell/mode
  introduction, post-reading dossier orientation, and Guide utility/topbar current state.
- VM-592 is the accepted Loom baseline. Its mode cards, query projection, Current Weave, and color
  semantics are protected; the broad Maze test's stale `c:r f:commander` assertion is documented inherited
  debt while focused VM-592 coverage is the applicable green contract.
- Known risks were diagnostic overclaiming, silent query alteration, context/persistence mutation,
  independent Find misassociation, mobile density, and static Guide drift.
- Files intentionally not touched included compiler/parser/semantic registries, Scryfall search/cache
  implementation, Reading Finds store/schema/drawer, Archscry Placement/dossier semantics, accounts,
  telemetry, Strategium, Apocrypha, VM-006, and VM-617.
- Existing untracked VM-615 files under `outputs/owner-review/` were preserved unchanged and unstaged.

## Files reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md` and recent VM-592/613/614/615/618 handoffs
- `docs/kanban/board.md` and related VM-592/613/614/615/618/006 cards
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- Current Maze HTML/CSS/runtime/query/diagnostic/Finds modules and focused tests
- Current Guide shell, route validators, route ownership matrix, and project atlas

## Files changed

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `assets/js/maze/research-ui.js`
- `guide/maze/index.html`
- `assets/css/guide-maze.css`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-search-tests.js`
- `package.json`
- `scripts/check-route-metadata.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/qa/2026-09-01-vm616-maze-context-recovery-owner-review.md`
- `docs/kanban/in-progress/VM-616-maze-context-translation-recovery-onboarding.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff file

## What changed

- Replaced the Loom-only context note with one compact context strip shared across all Maze modes.
- Added truthful standalone, reading-available, dossier-thread, and searching-independently states.
- Added URL/history-only `independent=1`, **Search independently**, and **Restore reading context** without a
  storage write or schema change. Entering the independent state retains exact `q` and temporarily removes
  active context parameters; the stored handoff remains the reversible source of truth.
- Independent Finds use the existing standalone `sourceContext` shape and omit `readingId`. The retained
  associated Find remains unchanged and remains the only one reflected by the dossier's existing filter.
- Added one diagnostic-led recovery statement for unresolved/warning translations and one canonical
  top-entry `/guide/maze/` invitation, presented as a compact **Field Guide** beacon.
- Distinguished a valid zero-result response with an exact, manual recovery direction and no automatic
  query edit.
- Added adjacent ordinary-language Commander color-identity explanation while preserving every existing
  color operator and query output.
- Added `/guide/maze/` with pinned strong/weak translations, context states, color meaning, weak-versus-zero
  recovery, concise result actions, and one return-to-Maze CTA.
- Added static and rendered browser regression coverage, route metadata/smoke wiring, route ownership docs,
  QA evidence, Kanban status, and rendered witnesses in a separate VM-616 output directory.

## Why it changed

VM-614 explains what the three Maze modes are, but a player already inside a search still needed help
understanding the translation, retained reading context, Commander color eligibility, and recovery after a
weak or zero result. VM-616 adds that point-of-friction help while keeping the player—not the product—in
control of query changes.

## Decisions made

- Reused existing compiler diagnostics; no new confidence, causal inference, or interpretation layer.
- Used `independent=1` as temporary navigation state because existing handoff storage already provides a
  reversible retained context and the existing standalone Find shape already supplies the correct
  unassociated behavior.
- Did not add an empty `readingId` field or a new independent Find type; omission is the current standalone
  schema behavior.
- Restoring after context parameters were removed produces the truthful `reading available` state. Browser
  Back can still return to the original `dossier thread` URL, and Forward/refresh reproduce each state.
- Preserved Operator's Hand exact input as the valid-zero proof; its search field and result panel both show
  `f:commander mv=99` exactly.
- Kept the Guide authored and optional; the working Maze owns immediate recovery.

## RobDev compact packet

- **Outcome:** players can read what Maze understood, know which reading context is active, recover from
  weak/zero results, and reverse independent search without losing reading or Find state.
- **Owning authority/producer:** Maze presenters consume existing compiler diagnostics, URL/history owns
  temporary independence, the existing handoff owns retained context, the existing scratchpad store owns
  Find persistence, and authored Guide HTML/CSS owns optional depth.
- **Changed behavior:** bounded copy/presentation, four context states, temporary independent/restore
  navigation, valid-zero recovery, color help, and one nested Guide route.
- **Protected behavior:** parser/compiler/calibration, query output, search/cache/dedupe, Reading Finds
  schema/drawer/migration, saved readings, Placement/dossier truth, accounts, telemetry, and adjacent routes.
- **Consumers:** Maze players, Archscry-return journeys, dossier Reading Finds reflection, Guide navigation,
  frontend validators, and focused test harnesses.
- **Risks:** overclaiming diagnostics, state or association mutation, nondeterministic history, mobile
  crowding, and specimen drift.
- **Smallest complete implementation:** one shared disclosure, one temporary history seam with restore, one
  weak and one valid-zero recovery treatment, one color sentence, one Guide page, and focused evidence.
- **Non-goals/stop:** no automatic broadening, parser/query/storage/schema/Finds redesign, mode tutorial,
  Guide landing rewrite, VM-617, commit, push, merge, or self-acceptance. No scope-drift stop was triggered.

## Risks / uncertainties

- The broad `node tests/maze/maze-search-tests.js` still stops at the inherited stale Operator assertion:
  protected current output is `c:r`, while line 726 expects `c:r f:commander`. This is documented by
  VM-579/583/592/603 and was not changed or weakened.
- The Guide's specimens are authored snapshots; the VM-616 static test pins them to the current compiler to
  catch future drift.
- Owner judgment remains required for whether the recovery copy and context sentence are sufficiently
  clear and whether the Guide adds enough depth without repeating VM-614.

## Tests run

- PASS — `npm.cmd run lint:html`
- PASS — `npm.cmd run lint:js`
- PASS — `npm.cmd run test:route-metadata`
- PASS — `npm.cmd run test:frontend-smoke`
- PASS — `npm.cmd run test:copy-boundaries`
- PASS — `node tests/maze/maze-query-contract-tests.js`
- PASS — `node tests/maze/research-builder-tests.js`
- PASS — `node tests/maze/research-mode-tests.js`
- PASS — `node tests/maze/maze-results-layout-tests.js`
- PASS — `node tests/maze/maze-scratchpad-store-tests.js`
- PASS — `node tests/maze/maze-search-tests.js --vm592-focused`
- PASS — `npm.cmd run test:maze-onboarding`
- PASS — `npm.cmd run test:maze-onboarding-browser`
- PASS — `npm.cmd run test:guide-browser`
- PASS — in-app browser dossier/independent/Back/Forward/refresh/restore journey
- PASS — `git diff --check`
- INHERITED BASELINE FAIL — broad `node tests/maze/maze-search-tests.js`, exact stale assertion above
- SKIP — CPU-heavy Placement/SIRF/all-37/synthetic/mutation/recovery/account/live-service suites; no owned
  behavior changed.

## RobQA readiness

- **Tier:** QA-3 contextual state/deep-link, QA-2 bounded interaction/history, QA-1 presentation/copy.
- **Changed behavior proved:** weak and zero recovery, all four context states, exact query retention,
  handoff/Find non-mutation, standalone independent association, restore/dossier filtering, Commander-color
  wording, Guide route, responsive layout, reduced motion, deep link, and zoom-equivalent reflow.
- **Protected contracts proved:** pinned strong/weak/compiler outputs, WU/printed-exact Loom outputs,
  scratchpad schema/filtering, VM-592 focused path, result layout, route/Guide/topbar semantics.
- **Rendered evidence:** four restrained witnesses under `outputs/vm616-owner-review/`; all inspected.
- **Disposition:** **RobQA PASS — Owner Review Ready**. This is not Owner Accepted.

## Not touched

- Parser/compiler/semantic grounding/calibration and canonical data
- Scryfall search/cache/dedupe and result action semantics
- Reading Finds store, schema, drawer, migration, export, or existing rows
- Saved reading or Archscry Placement/dossier semantics
- Accounts, Supabase schema, telemetry, Strategium, Apocrypha, `/guide/reading/`
- VM-006 and VM-617
- Existing `outputs/owner-review/vm615-reading-dossier/` artifacts
- Commit, push, PR, merge, release, or Owner acceptance state

## Follow-up recommendations

1. Owner reviews only the five product judgments listed in the QA evidence.
2. If accepted, bind acceptance to an exact candidate commit in a separate closeout/integration step.
3. Resolve the inherited raw-format assertion only in its own protected Operator contract task.
4. Do not start VM-617 until VM-616 receives an explicit Owner disposition.

## Next suggested agent

Owner reviewer, followed by a lifecycle/integration agent only after explicit acceptance.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-616-maze-context-translation-recovery-onboarding.md`
- `docs/qa/2026-09-01-vm616-maze-context-recovery-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- `docs/kanban/done/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
- `docs/kanban/done/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/done/VM-615-reading-dossier-onboarding.md`
- `docs/kanban/backlog/VM-006-final-ux-cleanup-and-full-browser-verification.md`

## Owner Review Copy Correction — 2026-09-01

- Applied the Owner's exact Section IV Reading Finds wording in `guide/maze/index.html` and made no other
  product-copy change.
- Added an exact positive/negative assertion to the VM-616 static onboarding test and an exact rendered-copy
  assertion to the VM-616 browser test.
- PASS — HTML validation, copy boundaries, static onboarding, rendered/browser onboarding, desktop/mobile
  Guide inspection, and `git diff --check`.
- The protected Maze runtime-file hashes remained unchanged across this correction. The rendered browser
  sequence also reconfirmed that associated and independent Finds keep their existing associations.
- Handoff disposition remains **Owner Review Ready**, not Owner Accepted. Nothing was committed, pushed,
  merged, or started for VM-617.

## Owner Review Guide Entry UX Correction — 2026-09-01

- Changed the existing sole Query Inspector Guide action from `../guide/maze/#recovery` to
  `../guide/maze/`; the Guide's internal `#recovery` anchor remains intact for direct/reference use.
- Replaced the bare-link presentation with one compact route-local beacon: `Field Guide` eyebrow, existing-
  compatible rune, truthful `Read how to understand this search →` action, subtle gold boundary, strong
  hover/focus treatment, and a finite three-beat 4.8-second arrival halo that settles permanently.
- OS-level and Vox Mana reduced-motion states remove the attention animation while preserving the static
  hierarchy. No modal, tooltip, duplicate Guide link, dependency, Driver.js, or tour behavior was added.
- The browser witness proves top-of-page entry with no fragment, predictable Back to `/maze/`, visible
  keyboard focus, one finite animation iteration, reduced-motion suppression, and no desktop/mobile
  horizontal overflow. It also reruns all accepted VM-616 query/context/Find/history checks unchanged.
- Added dedicated desktop/mobile Guide Beacon witnesses; regenerated and inspected the broader desktop Query
  Inspector witness.
- Documented the unimplemented opt-in guided-reading concept as separately governed backlog card VM-619.
  VM-617 remains unstarted.
- Disposition remains **RobQA PASS — Owner Review Ready**, not Owner Accepted. No commit, push, or merge.

## Owner Review Beacon Signal Correction — 2026-09-01

- Replaced only the accepted beacon's too-subtle 900 ms pseudo-ring arrival with three slow beats over one
  finite 4.8-second sequence. Beacon text, surface, wording, compact dimensions, and destination are unchanged.
- Added one Maze-module page-visit boolean. It is consumed on the first meaningful beacon presentation and is
  never stored; same-visit Query Inspector rerenders cannot replay the signal, while reload/new visit may.
- Natural completion, pointer entry, or focus entry removes `is-signaling`. Hover/focus uses a steady
  illuminated ring/rune and visible outline, with no underlying pulse or restart on leave.
- Both reduced-motion mechanisms suppress signal creation/animation while keeping the accepted static beacon.
- Browser evidence proves three keyframe peaks, finite duration/iteration, no text/background animation,
  hover/focus suppression, natural settlement, non-replay, fresh-visit replay, desktop/mobile containment,
  canonical Guide/Back behavior, and all accepted VM-616 state/Find invariants.
- Witnesses: `outputs/vm616-owner-review/maze-guide-beacon-desktop-1440x1000.png` and
  `outputs/vm616-owner-review/maze-guide-beacon-mobile-390x844.png`.
- Registered VM-620 as backlog-only shared Guide Beacon visual-language work after inventorying the current
  Home, Archscry dossier, and Maze invitations. VM-619 remains separate and neither is implemented.
- Handoff remains **Owner Review Ready**, not Owner Accepted. Home, Archscry, VM-617, dependencies,
  persistence, commit, push, and merge remain untouched.
