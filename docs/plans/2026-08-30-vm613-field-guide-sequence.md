# VM-613 Field Guide Implementation Sequence

Status: Accepted sequence authority

Do not create or execute these cards from VM-613.

## Sequence

`VM-614 foundation -> VM-615 reading and VM-616 Maze -> VM-617 reference/cross-link/final validation`

VM-615 and VM-616 may proceed independently after VM-614 is owner accepted if their runtime files do
not overlap in the active worktree. Repository branch/worktree governance still controls execution.

## VM-614 — Guide foundation and global discoverability

### Outcome

Create `/guide/` as a concise intent router and add literal **Guide** to the shared desktop/mobile
navigation in the accepted order.

### Scope

- `/guide/` route shell using current tokens, typography, atmosphere, topbar, footer, feedback, and
  reduced-motion machinery;
- hero naming/flavor hierarchy from the contract;
- first-visit intent routing and concise whole-product map;
- three approximately weighted primary decisions—**Find my Commander direction**, **Find cards**, and
  **Understand Vox Mana**—with the remaining accepted intent coverage routed secondarily/contextually;
- optional, low-emphasis **If unsure, start with Archscry** guidance;
- global/mobile navigation update and active-state behavior;
- route metadata, local-file/deep-route compatibility, link/landmark/keyboard/responsive tests;
- a small Home discovery link only if it does not become a fifth functional card.

### Dependencies

- Owner acceptance of VM-613 contract and navigation order.
- Current VM-612 typography and shared topbar contracts.

### Non-goals

- `/guide/reading/`, `/guide/maze/`, `/guide/reference/` content;
- runtime changes to functional routes beyond shared Guide navigation/discovery;
- onboarding modal/tour, telemetry, new visual system, Home redesign.

### Owner Review gate

Desktop/mobile first-decision clarity, hierarchy/flavor balance, four-path preservation, navigation order,
and whether Guide feels optional rather than mandatory.

## VM-615 — Reading and dossier onboarding

### Outcome

Create `/guide/reading/` and place the minimum contextual explanations/deep links needed across
Archscry -> Placement -> Dossier -> next direction.

### Scope

- compact reading journey page;
- ordinary-language Placement and dossier definitions;
- concise result expectation copy and canonical **How to read your dossier** placement in the dossier
  directory only, unless later runtime evidence demonstrates a concrete need for duplication;
- section-level “where to begin” guidance without identity-specific duplication;
- specific links into commander browsing, Maze, Strategium, and retake/compare behavior where current
  contracts already support them;
- guest/saved distinctions and result-state coverage;
- normal, supported-alternative, and bounded/unusual deterministic review cases;
- reconcile VM-406 placement/Strategium bridge ownership without closing unrelated cards.

### Dependencies

- accepted VM-614 route shell/navigation;
- accepted current Archscry/dossier/Placement authorities and deterministic fixtures;
- accepted result-expectation/dossier-directory-instruction placement contract.

### Non-goals

- Placement/scoring/evidence/ranking/qualification changes;
- dossier semantic/content rewrite;
- new commander recommendation or shortlist logic (VM-547);
- account, save, or telemetry changes.

### Owner Review gate

Naturalness of Placement/dossier explanation, placement of the contextual link, alternative/bounded-state
honesty, and whether the next action is useful without front-loading methodology.

VM-615 must not claim complete fresh-user Archscry onboarding validation until the existing fresh-session
browser path is repaired or an equivalent deterministic runtime witness proves that journey. This is a
validation prerequisite, not authorization to create a new harness framework or fold repair into VM-614.

## VM-616 — Maze onboarding and recovery

### Outcome

Create `/guide/maze/` and strengthen contextual onboarding for mode choice, translation, color/context
meaning, results, Reading Finds, and weak/no-result recovery.

### Scope

- intent-first Plain Reading / Operator's Hand / Loom guide;
- contextual **Which Maze mode should I use?** deep link;
- visible explanation contracts for translation, Commander color relationship, printed colors, dossier
  context, Current Weave, results, Open in Scryfall, and Reading Finds;
- retain existing dossier context on direct `/maze/` visits while making available/applied/independent
  state explicit and providing the smallest reversible dismiss/standalone treatment consistent with
  existing Maze semantics;
- specific weak/no-result recovery that reflects existing diagnostics without silently altering queries;
- standalone, dossier-context, repeat-visit, success, weak/no-result, empty/non-empty Finds, Operator,
  Loom, return, mobile, keyboard, and reduced-motion cases;
- reconcile VM-006 continuity findings while preserving its independent runtime-verification scope.

### Dependencies

- accepted VM-614 route shell/navigation;
- current Maze query/result/Reading Finds contracts and VM-592 Loom baseline;
- accepted retained-context decision and VM-006 continuity ownership.

### Non-goals

- parser/translator, Operator, Loom query, color, result, storage, or handoff semantic changes;
- full Scryfall documentation;
- new search mode, recipe library, account/deckbuilder behavior;
- activation of the dormant VM-591 semantic-state contract.

### Owner Review gate

Mode-choice clarity, recovery usefulness, context honesty, color-language clarity, and assurance that the
Guide stays optional while the working interface remains self-explanatory.

## VM-617 — Reference, cross-links, and final onboarding validation

### Outcome

Create `/guide/reference/`, complete bounded cross-links, reconcile related backlog ownership, and
validate the end-to-end onboarding system without expanding it into an encyclopedia.

### Scope

- concise terminology and Maze quick reference;
- minimal Scryfall-for-humans explanation and at most six representative recipes, treating six as a
  maximum rather than a quota and requiring distinct teaching value from every included recipe;
- descriptive cross-links among Guide, Home, Archscry/dossier, Maze, Strategium, and Apocrypha;
- Strategium/Apocrypha continuation treatments that link rather than duplicate;
- metadata, links, active navigation, focus/scroll, Back/Forward/refresh/deep links;
- desktop/mobile/200% zoom/reduced-motion/keyboard validation;
- current browser-harness reconciliation or an explicitly separate harness-repair card;
- final first-value measurement recommendations, with no telemetry change;
- final owner review and backlog disposition proposal.

### Dependencies

- owner-accepted VM-614, VM-615, and VM-616 candidates;
- accepted reference content cap and recipe selection;
- current Apocrypha and Strategium route anchors.

### Non-goals

- encyclopedia, full Scryfall docs, copied source shelves/Commander lessons;
- video/YouTube onboarding;
- new telemetry schema/event implementation;
- unrelated backlog closure.

### Owner Review gate

Whole-system traversability, reference restraint, link specificity, visual/content coherence, and whether
the product teaches enough for the next decision without becoming documentation-first.

## Validation strategy for later cards

- VM-614: QA-3 because shared navigation/routing changes; focused all-route nav plus rendered desktop/mobile.
- VM-615: QA-1/QA-3 depending on deep-link/focus changes; targeted deterministic reading/dossier cases.
- VM-616: QA-1/QA-3 unless query/state semantics unexpectedly change; if they do, stop as scope drift.
- VM-617: QA-3 integration of accepted onboarding routes/cross-links; bounded cross-route review.

No later card should run all-identity placement, synthetic, mutation, recovery, or other CPU-heavy suites
unless its actual changed protected behavior provides a concrete RobQA justification.

## Program stop conditions

Stop and return to Owner Review if implementation would:

- create a fifth functional pillar or change Home's four paths;
- require lore knowledge to find Guide;
- reuse `/library/` or rename Apocrypha;
- duplicate Strategium or Apocrypha authority;
- expand V1 beyond the four accepted Guide routes;
- create mandatory onboarding;
- alter any protected Placement, dossier, Maze, persistence, telemetry, or source contract.
