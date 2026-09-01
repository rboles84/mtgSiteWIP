# VM-616 Maze Context, Translation, and Recovery — Owner Review Evidence

Date: 2026-09-01
Branch: `codex/vm-616-maze-context-recovery`
Disposition: **RobQA PASS — Owner Review Ready**
Owner acceptance: **PENDING**

## RobQA classification

- QA-3 for contextual URL/history state, retained-handoff behavior, Reading Finds association, and deep links.
- QA-2 for independent/restore actions, Back/Forward/refresh, and result recovery interactions.
- QA-1 for authored copy, Commander-color explanation, route metadata, and static Guide specimens.
- Parser/compiler/calibration, query output, Scryfall fetch semantics, result actions, Reading Finds
  schema/drawer, saved readings, Placement, dossier semantics, accounts, and telemetry remain protected.

## Product outcome beyond VM-614

VM-614 introduces the three Maze modes and routes a new player into the product. VM-616 now helps a
player who is already searching read the exact translation, understand whether a retained reading is
affecting the search, distinguish misunderstanding from a valid zero result, and make one reversible
recovery choice. `/guide/maze/` adds optional multi-state depth without repeating the mode introduction.

## Intentionally unchanged Maze surfaces

- The Plain Reading compiler, confidence, diagnostics, normalization, and query results.
- Operator's Hand exact-input behavior and compact Query Inspector treatment.
- The Loom controls, Current Weave, search execution, and all color operators.
- Result card actions, modal, sort/pagination, Scryfall links, and fetch/cache/dedupe.
- Reading Finds draft, drawer, schema, migration, export, quantity, and dossier reflection rules.
- Archscry Placement/dossier semantics, VM-006 continuity ownership, and VM-617 scope.

## Weak translation witness

- Input: `Black Lotus with mana value 99 in Commander`
- Executable query: `c:b legal:commander`
- Confidence: `0.63`
- Recognized: `black`, `Commander legal`
- Ignored: `with`, `in`
- Unresolved: `lotus`, `mana`, `value`
- New recovery: `Maze could not map part of this request.` followed by
  `Rephrase or remove one unresolved term, then search again.`
- One canonical optional beacon: `Field Guide` / `Read how to understand this search →` to `/guide/maze/`.
- The executable query and all diagnostics are unchanged from the current compiler fixture.

## Valid zero-result witness

- Exact Operator query: `f:commander mv=99`
- Proof: live Scryfall execution on 2026-09-01 returned HTTP `404`, object `error`, code `not_found`, and no
  matching cards. The rendered deterministic browser replay uses that same response class.
- Visible result: `The query ran, but no cards matched.` followed by
  `No cards matched this exact combination. Broaden or remove one constraint, then search again.`
- The search field and empty-result query both retain exactly `f:commander mv=99`; no constraint is
  removed, reordered, substituted, or silently broadened.

## Supported context states

| State | Player-facing truth | Action |
| --- | --- | --- |
| Standalone search | `No reading is changing this query.` | None. |
| Reading available | The return path and new Reading Finds association remain, but the reading does not change this query. | `Search independently`. |
| Dossier thread | The query came from the dossier; no extra reading filters are added. | `Search independently`. |
| Searching independently | The retained reading is not in use; new Finds will not attach to it; the reading and existing Finds remain unchanged. | `Restore reading context`. |

`independent=1` changes only temporary URL/history context. It removes active reading parameters from the
independent URL while preserving exact `q`; it does not delete, overwrite, or mutate the stored handoff,
saved reading, existing Finds, existing `readingId`, persistence schema, or Reading Finds drawer. Back,
Forward, refresh, and the explicit restore action deterministically replay the state.

The exact association sequence passes: a contextual `vm616-reading` Find remains byte/semantically
unchanged; a new independent Find is written through the existing standalone Maze behavior without a
`readingId`; restoring the retained reading leaves the original reflected in the dossier and excludes the
independent Find.

## Commander color meaning

Visible adjacent copy says: `Fits Commander colors includes cards whose color identity stays within the
selected colors; a card does not need every selected color.` The existing WU output remains
`id<=wu f:commander`; printed exact remains separately available as `c=wu f:commander`. No color/query
semantics changed.

## `/guide/maze/`

- Hero: `Read the search. Change one thing.`
- I: exact strong and weak translation specimens.
- II: all four context states and the Commander-color eligibility explanation.
- III: translation trouble versus valid-zero recovery using `f:commander mv=99`.
- IV: concise result actions—inspect, refine, set aside, or open in Scryfall—with one CTA back to Maze.
- The page contains no new mode tutorial, parser internals, recipe catalog, persistence explanation,
  invented query output, or second product map.

## Focused validation

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint:html` | PASS | Route semantics, assets, landmarks, navigation, and Maze contracts. |
| `npm.cmd run lint:js` | PASS | 31 frontend files. |
| `npm.cmd run test:route-metadata` | PASS | 13 public route heads including `/guide/maze/`. |
| `npm.cmd run test:frontend-smoke` | PASS | Guide/Maze route links and VM-617 `/guide/reference/` absence. |
| `npm.cmd run test:copy-boundaries` | PASS | 30 live-copy files. |
| `node tests/maze/maze-query-contract-tests.js` | PASS | Query contract unchanged. |
| `node tests/maze/research-builder-tests.js` | PASS | 11 cases; WU remains `id<=wu f:commander`, printed exact `c=wu f:commander`. |
| `node tests/maze/research-mode-tests.js` | PASS | 14 mode and 12 leakage cases. |
| `node tests/maze/maze-results-layout-tests.js` | PASS | Existing result layout and hover contracts. |
| `node tests/maze/maze-scratchpad-store-tests.js` | PASS | Existing Reading Finds schema/association/filtering behavior. |
| `node tests/maze/maze-search-tests.js --vm592-focused` | PASS | Updated shared-context assertion; Loom query outputs unchanged. |
| `npm.cmd run test:maze-onboarding` | PASS | Pinned translation, context, color, Guide, and route contracts. |
| `npm.cmd run test:maze-onboarding-browser` | PASS | Weak/zero rendering, exact Find sequence, history, desktop/mobile/deep-link/reduced-motion/zoom. |
| `npm.cmd run test:guide-browser` | PASS | Guide hierarchy, navigation, touch-equivalent, keyboard, reduced motion, responsive and zoom contracts. |
| In-app contextual journey | PASS | Dossier → independent → Back → Forward → refresh → restore → Back/Forward. |
| `git diff --check` | PASS | No whitespace errors. |
| `node tests/maze/maze-search-tests.js` | INHERITED BASELINE FAIL | Protected current Operator output is `c:r`; stale line 726 expects `c:r f:commander`, as documented by VM-579/583/592/603. No VM-616 file owns or weakens that mismatch. |

CPU-heavy Placement, SIRF, all-37, synthetic, mutation, recovery, account, and live-service suites were
skipped because VM-616 changes no corresponding protected behavior.

## Rendered witnesses

- `outputs/vm616-owner-review/maze-weak-translation-desktop-1440x1000.png`
- `outputs/vm616-owner-review/maze-guide-beacon-desktop-1440x1000.png`
- `outputs/vm616-owner-review/maze-guide-beacon-mobile-390x844.png`
- `outputs/vm616-owner-review/maze-independent-desktop-1440x1000.png`
- `outputs/vm616-owner-review/guide-maze-desktop-1440x1000.png`
- `outputs/vm616-owner-review/guide-maze-mobile-390x844.png`

The separate pre-existing `outputs/owner-review/vm615-reading-dossier/` artifacts were not modified,
deleted, or staged.

## Owner decisions

Judge only:

1. Whether the weak-translation recovery is useful and truthful.
2. Whether the valid-zero state is clearly distinct from parser misunderstanding.
3. Whether retained dossier context and its independent/restore reversal are clear.
4. Whether the **Fits Commander colors** explanation is understandable without changing semantics.
5. Whether `/guide/maze/` adds depth without repeating VM-614.

## Owner Review Surgical Copy Correction — 2026-09-01

- **Scope:** one authored sentence in `/guide/maze/` Section IV; no runtime or product-behavior change.
- **Corrected copy:** `Reading Finds keeps useful cards together locally. Finds saved with reading context
  can stay attached to that reading; independent Finds remain standalone. It is not a deckbuilder.`
- **Focused checks:** PASS — `npm.cmd run lint:html`, `npm.cmd run test:copy-boundaries`,
  `npm.cmd run test:maze-onboarding`, `npm.cmd run test:maze-onboarding-browser`, and `git diff --check`.
- **Rendered sanity:** PASS — regenerated and inspected the desktop and mobile `/guide/maze/` witnesses;
  the longer sentence wraps cleanly without overflow or structural change.
- **Protected behavior:** unchanged — the browser regression repeated the exact associated Find → independent
  Find → restore → dossier reflection sequence, including Back/Forward/refresh and association isolation.
- **Disposition:** **RobQA PASS — Owner Review Ready**. Owner acceptance remains pending.

## Owner Review Guide Entry UX Correction — 2026-09-01

- **Changed behavior:** the sole working-Maze Guide action now targets `/guide/maze/` without a fragment and
  uses a compact, truthful Field Guide beacon instead of a bare diagnostic-adjacent text link.
- **Preserved behavior:** internal `#recovery` direct links remain valid; Guide structure/content, diagnostics,
  query output, recovery, context, Find associations, Reading Finds, Loom/color semantics, results, and
  VM-614/615/618 behavior are unchanged.
- **Navigation proof:** PASS — activating the canonical beacon opens the Guide hero at `scrollY <= 1` with an
  empty hash; Back returns to `/maze/`.
- **Attention/focus proof:** PASS — the final signal uses three restrained perimeter beats across one finite
  4.8-second iteration; keyboard focus exposes the existing two-pixel gold outline plus steady beacon hierarchy.
- **Reduced-motion proof:** PASS — `prefers-reduced-motion: reduce` produces zero beacon animations while
  retaining the static eyebrow, rune, label, and boundary.
- **Responsive proof:** PASS — desktop and 390 px mobile witnesses were inspected; no horizontal overflow.
- **Focused checks:** PASS — HTML validation, JS lint, copy boundaries, VM-616 static onboarding, VM-616
  browser onboarding, and `git diff --check`.
- **Dependency/scope proof:** no third-party library, Driver.js, modal, tooltip, tour, duplicate entry,
  persistence, or Guide-content change. VM-619 records the separate opt-in guided-reading concept only.
- **Owner judgment remaining:** beacon discoverability, truthfulness, and visual restraint.
- **Disposition:** **RobQA PASS — Owner Review Ready**. Owner acceptance remains pending.

## Owner Review Beacon Signal Correction — 2026-09-01

- **Changed behavior:** the accepted Maze beacon signals on only its first meaningful presentation per page
  visit with three slow ring/halo beats at `6%`, `37%`, and `68%` of a 4.8-second finite sequence.
- **Stable content proof:** PASS — the sole animation exposes only pseudo-ring `opacity` and `transform`;
  beacon text and primary background/color are not animated or flashed.
- **Per-visit proof:** PASS — a module variable is consumed before rendering the first signal. A direct
  presenter rerender after hover suppression and another after natural completion both produce zero signal
  animations; reload starts one fresh sequence as allowed.
- **Interaction proof:** PASS — pointer entry and focus entry remove `is-signaling` immediately. Hover/focus
  retain a steady ring/rune illumination, keyboard focus outline, and no automatic pulse underneath.
- **Completion proof:** PASS — after 5 seconds, the class is removed and no signal animation remains running.
  The sequence has one finite iteration and no infinite/continuous animation.
- **Reduced-motion proof:** PASS — both `prefers-reduced-motion: reduce` and the Vox Mana
  `data-reduce-motion="true"` state suppress the class/animation while preserving the visible beacon.
- **Responsive/navigation proof:** PASS — dedicated desktop and 390 px mobile witnesses are clean with no
  horizontal overflow; `/guide/maze/` top entry and predictable Back to `/maze/` remain exact.
- **Protected invariants:** PASS — weak/zero recovery, exact query/confidence, independent/restore history,
  Reading Finds association/isolation, dossier reflection, Loom/color semantics, and Guide content unchanged.
- **Scope proof:** no localStorage, sessionStorage, account state, analytics, dependency, Driver.js, guided
  reading, Home, or Archscry change. VM-620 is backlog-only shared visual-language work; VM-619 remains the
  separate opt-in guided-reading concept.
- **Focused checks:** PASS — HTML validation, JS lint, copy boundaries, VM-616 static onboarding, VM-616
  browser onboarding, rendered witness inspection, and `git diff --check`.
- **Owner judgment remaining:** whether three slow beats are perceptible yet restrained in normal use.
- **Disposition:** **RobQA PASS — Owner Review Ready**. Owner acceptance remains pending.
