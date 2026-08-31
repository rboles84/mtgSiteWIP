# VM-613 Current-State Repository and Runtime Recon

Status: Accepted VM-613 baseline

Date: 2026-08-30

Runtime base: local `main` at `9625273081951cf7a95e52b4c400b6a69cb0e5d9`

Review origin: `http://127.0.0.1:4174/`

Owner acceptance: 2026-08-31. The documented fresh-session Archscry browser-smoke timeout remains an
explicit harness/evidence gap; it did not block VM-613 acceptance and is not VM-614 scope.

## Scope and method

This is a read-only product/runtime recon. Production HTML, CSS, JavaScript, data, routes, storage
contracts, and telemetry were not edited.

Evidence used:

- current route/shared source and architecture maps;
- recent relevant handoffs and accepted cards;
- current local runtime in the Codex in-app browser at 1440x1000 and 390x844;
- the current VM-586/VM-595 all-37 dossier evidence package;
- one isolated `npm.cmd run test:browser-smoke` run to test a fresh-storage path;
- the public PlayIRL Resources page as bounded comparative inspiration.

In-app browser screenshots were inspected during recon but could not be written into the repository by
that browser sandbox. Durable existing dossier screenshots are available under the VM-586 output root
listed below. This report records the route/state/DOM observations needed to reproduce the remaining
witnesses without creating a second screenshot framework.

## Pre-flight findings

### Recent related work

- VM-612 replaced the active typography system and updated all public routes without changing product
  semantics.
- VM-586/VM-595 produced current all-37 rendered dossier evidence and separated dossier availability
  from placement reachability.
- VM-592 completed Loom v0 with Commander-first color relationships, Current Weave, visible live query,
  accessible controls, and preserved Plain/Operator semantics.
- VM-426 established Reading Finds, local-first persistence, dossier reflection, and return behavior.
- VM-550/VM-552 established Strategium as the Commander/table-literacy hub and lifecycle route family.
- Apocrypha's accepted source-library work established Quick Guide, Library Rail, source-type boundaries,
  freshness/link-check states, and `/library/` compatibility.

### Known risks

- `test:browser-smoke` currently resets storage and reaches Home, but times out on Archscry before the
  landing/result state becomes ready; it cannot currently prove a fresh guest Quick Reading journey.
- The in-app runtime had a signed-in/stored Colorless reading. Clearing it to simulate a guest would
  modify user-owned local/account state, so recon did not do so.
- A direct `/maze/` visit in the same browser retained the prior Colorless dossier context. This may be
  deliberate continuity, but it prevents that browser session from proving a no-context standalone state.
- Reading Finds was empty in the inspected reading. Adding a card would have changed the user's local
  state, so the non-empty drawer was not manufactured; existing `test:maze-finds` and VM-426 evidence own
  deterministic non-empty/migration behavior.
- No safe supported-alternative transition was present in the stored reading. Current contracts and
  landing copy support alternatives when qualified, but VM-613 does not fabricate an alternative fixture.
- Source/DOM truth can show hidden route states; only visible/runtime observations are treated as rendered
  witnesses.

### Decisions already made

- Home has four focused functional paths.
- Guide is a top-level onboarding layer, not a fifth path.
- `/guide/` and literal **Guide** are the canonical route/label.
- `/library/` belongs to Apocrypha compatibility.
- Maze's three public modes are Plain Reading, Operator's Hand, and Loom.
- Strategium and Apocrypha remain specialist authorities; Guide links instead of duplicating.

### Recently changed files relevant to recon

VM-612 recently changed shared/route typography CSS, public route HTML, topbar presentation, and small
Home/Archscry copy. Those accepted changes are current truth and must not be reopened by VM-613.

### Do not touch

Production route files; shared navigation; CSS/typography; Placement/dossier/identity data; Maze query
and Reading Finds owners; Strategium/Apocrypha runtime content; `/library/`; telemetry; current visual
baselines; unrelated in-progress cards.

## Current route and shell truth

| Area | Current observation | Onboarding implication |
| --- | --- | --- |
| Shared topbar | Desktop and mobile expose Home, Archscry, The Implicit Maze, Apocrypha, Strategium; mobile menu includes Reduce motion. | Guide needs one literal top-level entry. Accepted future order puts Strategium before Apocrypha. |
| Home | Hero explains “Commander identity and taste compass,” includes a clear not-a-deckbuilder boundary, and presents four focused path cards. | Preserve the pitch and four cards. Add only a small Guide discovery/continuation treatment if needed; no fifth card. |
| Footer/help | Public routes have Feedback and route footers; Home also has descriptive path links. | Reuse link/button language patterns; Guide is navigation, not a feedback replacement. |
| Typography/tokens | Current semantic font roles and shared tokens are accepted across routes. | VM-614 should reuse current route shell/tokens, not redesign them. |
| Responsive | Home at 390x844 had no horizontal overflow; mobile topbar exposes a menu with functional route hints. | Guide must preserve the same no-overflow and descriptive mobile-nav contract. |
| Reduced motion | Mobile menu pointer activation toggled `data-reduce-motion` and `aria-pressed`, then restored Off. Synthetic Enter through the browser helper did not toggle and is inconclusive, not classified as a product defect. | Guide meaning must survive stillness; future rendered QA should perform a real keyboard path. |

## Runtime witness set

| ID | Required journey/state | Witness and result | Durable evidence / gap |
| --- | --- | --- | --- |
| W01 | Home -> first decision | 1440x1000 Home showed the product boundary, identity preview, and four named path cards with specific CTAs. | Reproduce at `/`; runtime inspected in-session. |
| W02 | Home -> Archscry | The **Start with Archscry** card navigated to `/archscry/index.html`. | URL and navigation observed. Stored result then resumed. |
| W03 | Quick Reading start | Source contains visible guest copy and **Start the Reading**; the isolated smoke path timed out before landing readiness. Stored user state made reset unsafe. | Explicit gap. Repair the existing harness separately; do not invent a VM-613 fixture. |
| W04 | result -> dossier | Current browser resumed a Colorless dossier. Current audit separately proves 36 responsible named witnesses and one bounded Yore result. | `docs/audits/archscry-current-state-2026-08-30/manifest.json`; existing screenshots below. Transition itself not safely replayed. |
| W05 | dossier -> Maze | Colorless **Maze / Colorless identity** opened Plain Reading with visible original text, translated query, dossier paths, results, and **Return to dossier with finds**. | Full contextual runtime path observed. |
| W06 | standalone Maze | Direct `/maze/` showed the empty “Start with a search thread” result prompt but retained stored Colorless dossier context and return action. | Context-free state not isolated; continuity nuance recorded for VM-006/VM-616 judgment. |
| W07 | Plain Reading success | Dossier path populated `Colorless Commander-legal commanders...`, translated to `id=c is:commander f:commander`, and showed 58 results / first 24 cards. | Runtime inspected at contextual Maze URL. |
| W08 | Plain Reading no/weak result | “Black Lotus with mana value 99 in Commander” translated only to `c:b legal:commander`, showed 63% confidence and unresolved `lotus`, `mana`, `value`. | Valid weak-translation witness. It demonstrates need for specific recovery without changing parser semantics. |
| W09 | Operator's Hand | Mode activation changed helper text to exact syntax, placeholder to `c:r kw:haste mv<=3 f:modern`, and preserved the dossier query `id=c is:commander f:commander`. | Runtime inspected. |
| W10 | Loom | Mode activation showed explicit colors/card types/abilities/refinements, “Colorless dossier context available · not applied to filters,” Current Weave, live query, and result delivery. | Runtime inspected at 1440x1000. |
| W11 | Reading Finds empty | Drawer explained local purpose and showed Finds/Sparks/Anchors each at 0 with “No cards ... yet,” plus Copy/Return/Clear actions. | Runtime inspected without changing stored cards. |
| W12 | mobile navigation | At 390x844 Home had no horizontal overflow; menu exposed five route links with functional hints and Reduce motion. | Runtime screenshot inspected in-session; DOM state recorded. |
| W13 | reduced-motion/keyboard-sensitive surfaces | Pointer toggle changed root state and `aria-pressed` On, then restored Off; menu trigger retained focus/expanded state. Synthetic Enter result was inconclusive. | Future Guide implementation must include real keyboard and stillness QA. |

## Durable screenshots worth reviewing

Existing current rendered dossier screenshots (1440x1000, direct dossier review, not placement
reachability proof):

- normal representative: `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/evidence/dossier/screenshots/01-w.png`;
- bounded/unusual representative: `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/evidence/dossier/screenshots/35-yore.png`;
- endpoint/current-session comparison: `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/evidence/dossier/screenshots/36-colorless.png`;
- manifest/conditions: `docs/audits/archscry-current-state-2026-08-30/manifest.json`.

For VM-613 product judgment, the owner need not review all 37 images.

## Surface findings

### Home

Strengths:

- clear current product statement and not-a-deckbuilder boundary;
- four actionable paths with ordinary-language summaries;
- specific CTAs and consistent route hints.

Gap:

- no persistent, literal place to understand how the paths connect or which route fits an uncertain
  visitor. This is the Guide landing's job, not another Home feature card.

### Archscry and Placement

Strengths:

- landing source copy explains the short questionnaire, strongest fit, supported alternative, dossier,
  account-optional start, and save/retake options;
- Quick Reading is the public start path; the deeper Scrying Terminal remains an archived/flag-gated
  route owner and must not be taught as a normal V1 onboarding choice;
- guest copy promises no account required, while the inspected returning state offered **Sign Out** and
  **Begin Again** and the dossier offered **Save with Google**;
- current dossier clearly identifies the recorded best fit and labels the answer-derived reasons.

Gaps:

- the fresh guest/start transition lacks a currently working isolated runtime witness;
- “Placement,” “dossier,” and the relationship between best fit / supported alternative / next action
  remain concepts a first-time visitor may meet only after acting.

Contract response:

- retain concise visible landing/result explanations;
- put optional whole-journey depth in `/guide/reading/`;
- never expose internal scores or evidence mechanics.

### Dossier

Strengths:

- clear directory: Placement, Start Here, Why This Fits, Commander Browsing Starts, Card Signals, Mana
  Notes, Maze Discovery;
- Start Here, What to Look For, commander browsing, and Maze threads provide real next actions;
- Maze Discovery explains return continuity and has a meaningful empty Finds state.

Gaps:

- section density means a newcomer may not know which section to read first;
- existing continuation lanes are useful but collectively require product literacy.

Contract response:

- a small “How to read your dossier” deep link and section-aware copy belong near the result/directory;
- the Guide must not restate identity-specific dossier content.

### The Implicit Maze

Strengths:

- three modes are visibly separated with functional descriptions and examples;
- translation, dossier context, Current Weave, result count, Open in Scryfall, return behavior, and
  Reading Finds are visible;
- Reading Finds empty state names purpose and all three buckets.

Gaps:

- brand names still need one compact mode-choice explanation outside the dense console;
- weak Plain Reading translation identifies unresolved terms but does not provide a single specific
  next correction;
- direct `/maze/` may retain previous reading context, which can be useful continuity or confusing
  “standalone” behavior depending on owner intent;
- Commander color relationship, printed colors, and “context available but not applied” deserve deeper
  optional explanation.

Contract response:

- retain mode descriptions and visible translation in the interface;
- put mode comparison and concepts in `/guide/maze/`;
- use recovery copy for weak/no results; do not change parser/query semantics in onboarding work.

### Strategium

Current hub clearly offers two lanes: choose a game moment (Finding a Table, Before, During, After) or
open the Commander Console (readiness, archetypes, threat/pressure, color expectations). This is the
correct authority. Guide should link to the relevant lane and never reproduce Strategium lessons.

### Apocrypha

Current page already includes a Quick Guide, Library Rail, public source shelves, “Useful for / Not
for,” link-check status, authority boundaries, and known gaps. Guide should route evidence questions to
the matching Apocrypha area and never copy shelves, source counts, or trust logic.

### PlayIRL inspiration

The reviewed page separates quick sheets, governing references, practical tools, and sources with brief
“what this is for” language. The useful lesson is disciplined grouping and explicit depth/authority—not
its Resources name, taxonomy, card layout, or visual design.

## Existing test and source coverage

- `npm.cmd run lint:html` owns shared route/nav/landmark and Library alias guards.
- `npm.cmd run lint:js` owns main frontend source checks.
- `npm.cmd run test:frontend-smoke` owns static route contracts.
- `npm.cmd run test:browser-smoke` is intended to cover Home -> Archscry -> dossier -> Maze -> Reading
  Finds return, but the current isolated run failed before Archscry initialized.
- Maze-focused tests cover modes, parser/query contract, results layout, and Reading Finds persistence.
- Current all-37 audit/replay machinery owns deterministic dossier evidence; VM-613 does not rerun heavy
  all-identity suites.

## Recon conclusion

Current product truth supports the proposed four-route Guide IA. Most interaction-level teaching already
belongs in the product and should remain there. The missing layer is a compact, literal, retrievable map
that routes intent, explains cross-surface relationships, and deep-links into the moment where the player
can act.
