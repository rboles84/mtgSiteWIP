# Vox Mana Field Guide and Onboarding Contract

Status: Accepted authority

Version: 1.0.0

Accepted: 2026-08-31

Authority: VM-614 and later Guide/onboarding work

## Governing principles

> A player should never need to understand Vox Mana's architecture before Vox Mana can help them.

> Tell the player just enough to make their next good decision.

The operating model is:

> Orient -> let the player act -> explain what becomes relevant -> show resulting value -> stay out of
> the way.

The Field Guide is a concise, optional, persistent product-literacy layer. The Guide is not a fifth
functional pillar. It is not a tutorial gate or documentation encyclopedia.

## Purpose and audience

The Guide helps a first-time or returning player answer two questions quickly:

1. Where should I begin?
2. How do the useful parts of Vox Mana connect?

It serves:

- a visitor who does not yet understand Vox Mana;
- a player seeking a Commander identity direction;
- a player returning with an existing reading;
- a card-search visitor with either plain-language or Scryfall experience;
- a player learning Commander/table behavior;
- a visitor checking sources, evidence, and interpretive support.

It does not assume knowledge of Vox Mana's internal architecture, branded terms, placement machinery,
data models, or repository process.

## Product architecture

| Surface | Canonical responsibility | First useful action |
| --- | --- | --- |
| Home | What is Vox Mana and what can I do here? | Choose one of the four focused paths. |
| Guide | Where should I begin and how does Vox Mana fit together? | Choose an intent and leave for the relevant product action. |
| Archscry | What Commander direction fits how I approach the table? | Start or resume a reading. |
| Dossier | What does my reading mean and what should I explore? | Read the relevant direction and follow a specific continuation. |
| The Implicit Maze | What cards fit the idea/direction I am exploring? | Use the mode that matches the player's search fluency. |
| Strategium | How does Commander/the table work? | Choose a game moment or open the Commander Console. |
| Apocrypha | Where did Vox Mana's sources/evidence/interpretive support come from? | Choose the source shelf or trust note matching the question. |

The functional product still has four Home paths: Archscry, The Implicit Maze, Strategium, and
Apocrypha. Guide sits above and between them as orientation and routing. Home must not gain a fifth
functional-path card merely because Guide becomes top-level navigation.

## Namespace, navigation, and public naming

Canonical namespace:

`/guide/`

Top-level navigation label:

**Guide**

Accepted top-level order:

**Home · Guide · Archscry · The Implicit Maze · Strategium · Apocrypha**

The current runtime orders Apocrypha before Strategium. VM-614 owns the deliberate, all-route update to
the accepted order; VM-613 does not change navigation.

Public flavor hierarchy:

- archival eyebrow: **CODEX VOCIFERA // VOL. XXXII**;
- primary page title: **A Planeswalker's Guide to Vox Mana**;
- brand line: **Find your place. Shape your play.**;
- functional identity: **Vox Mana Field Guide**.

Flavor never replaces the literal **Guide** label in navigation, page metadata, landmarks, or other
discovery-critical text. A player may enjoy “Codex Vocifera” after finding the help surface; they must
not decode it to find help.

Do not use **The Library** for Guide. `/library/` is the existing compatibility route to Apocrypha and
remains reserved by that contract.

## V1 information architecture

The four-route V1 IA is accepted by current-state recon and should remain bounded:

| Route | Owns | Required exit | Must not become |
| --- | --- | --- | --- |
| `/guide/` | first-visit orientation, ordinary-language product map, intent routing, “if unsure” starting direction | a real feature action or one deeper Guide page | a tutorial, product sitemap, or fifth Home pillar |
| `/guide/reading/` | Archscry -> Placement -> Dossier -> useful next direction | start/resume Archscry, read a dossier, use a named dossier continuation | placement methodology, score explanation, identity encyclopedia, or dossier rewrite |
| `/guide/maze/` | Plain Reading -> Operator's Hand -> Loom; translation, context, results, Reading Finds, recovery concepts | open the matching Maze mode or a specific contextual search | full Scryfall documentation, query engine specification, or recipe catalog |
| `/guide/reference/` | compact terminology, Maze quick reference, Scryfall-for-humans basics, at most six representative recipes in V1 | a named Guide page, Maze action, Strategium route, Apocrypha shelf, or official external reference | encyclopedia, exhaustive glossary, or copied source library |

Do not add one Guide page per feature in V1. A new route requires evidence that the existing four cannot
support a recurring player decision without becoming confusing or materially overlong.

## `/guide/` intent contract

The landing page should route these intents in ordinary player language:

- I am completely new to Vox Mana.
- I want to discover my Commander direction.
- I already have a reading and need to understand it.
- I want to find cards.
- I know Scryfall and want precise control.
- I would rather build a search visually.
- I want to understand Commander or table behavior.
- I want to inspect the sources behind Vox Mana.

These eight intents are coverage requirements, not a requirement to render eight equal first-level
choices. The Guide must group them into a small primary decision set with secondary contextual routes
so first-visit orientation remains concise. The approximate VM-614 hierarchy is:

- primary: **Find my Commander direction**, **Find cards**, and **Understand Vox Mana**;
- secondary/contextual: existing-reading dossier guidance, Strategium for learning Commander,
  Apocrypha for sources/evidence, and exact-Scryfall or visual-building paths routed through the Maze
  choice.

This hierarchy is an implementation constraint, not frozen final copy or layout.

### VM-614 Guide-only presentation clarification - 2026-08-31

The Owner has explicitly superseded the approximate three-equal-primary-choice rendering for the
`/guide/` landing page only. The same intent coverage must now be taught through concise explanatory
sections and truthful product specimens, with one principal continuation action per major surface,
rather than repeated router cards. This does not change the accepted product architecture, the four Home
functional paths, the four-route Guide V1 namespace, specialist content ownership, or any protected
runtime semantic. No later Guide route is authorized by this clarification.

The default for an unsure visitor is the concise, low-emphasis advice **If unsure, start with
Archscry**. It must not force navigation, auto-select a default, require Archscry as onboarding, or
visually subordinate Maze or another direct intent when the player already knows what they want. The
landing page must make it easy to leave for a useful action above the fold at normal desktop and mobile
sizes.

## `/guide/reading/` content contract

Teach only the compact journey:

**Archscry -> Placement -> Dossier -> next useful direction**

It may explain:

- Archscry maps questionnaire answers to a supported Commander identity direction;
- the player receives a best fit, any supported alternative, and a dossier;
- Placement is the current reading outcome, not a permanent identity label or universal truth;
- a dossier explains the direction, play pattern, why it fit, what to look for, and relevant browsing
  or Maze continuations;
- a player may compare a supported direction, begin again, browse commander lanes, or follow a Maze
  thread.

It must not expose internal scores, thresholds, qualification/stopping rules, hidden evidence,
provenance internals, confidence internals, model versions, workbooks, QA artifacts, or Kanban IDs.
It must not strengthen, simplify, or rewrite dossier semantic truth.

At the Placement/result stage, use only concise expectation-setting copy: the dossier explains why the
direction fit and provides practical exploration directions. The existing product CTA may open the
dossier. The dossier directory is the canonical contextual placement for **How to read your dossier**.
Do not duplicate that Guide link at result and directory unless later runtime evidence proves a concrete
need.

**Result = expectation. Dossier directory = instruction.**

## `/guide/maze/` content contract

Teach mode choice by intent before branded detail:

- “I can describe what I want” -> **The Plain Reading**.
- “I know the exact Scryfall query I want” -> **The Operator's Hand**.
- “I want to build the search visually” -> **The Loom**.

Explain, at the minimum useful depth:

- **You wrote** versus **Maze translated**;
- Commander color relationship versus exact printed-color choices;
- dossier context and whether it is available or applied;
- Current Weave as the Loom's visible summary;
- results, **Open in Scryfall**, and refinement;
- Reading Finds as local cards set aside for the reading, not a deckbuilder;
- return-to-reading behavior;
- zero-result and weak-translation recovery.

Detailed operator definitions and comprehensive Scryfall syntax stay with Scryfall. The Guide may link
to an official/current reference and teach only the subset needed to choose a mode and recover.

Direct `/maze/` visits retain existing dossier context by default. The interface must make retained
context explicit, understandable, non-secret, and reversible, distinguishing context available,
context applied where current semantics authorize it, and independent searching. Do not silently apply
hidden filtering or silently clear useful context. VM-616 owns the smallest clear dismiss/standalone
treatment consistent with existing Maze semantics and VM-006 continuity ownership. The current
**[identity] dossier context available · not applied to filters** wording is a useful precedent.

## `/guide/reference/` content contract

V1 may contain:

- a short Vox terminology list;
- a one-screen Maze mode/translation quick reference;
- minimal Scryfall concepts needed to read visible output;
- at most six representative recipes selected for distinct teaching value.

Six is a maximum, not a quota. Do not add recipes merely to reach the cap. Every recipe must teach
something distinct, name that lesson, and link to an executable Maze action where safe. Avoid small
color/archetype variations or dozens of examples that belong in product search history, Scryfall
documentation, or a future separately approved recipe library.

## Terminology in player language

| Term | Required ordinary-language meaning |
| --- | --- |
| Guide | Help choosing where to begin and how Vox Mana's parts connect. |
| Reading | The short Archscry questionnaire and its current result. |
| Placement | The identity direction supported by the player's recorded answers in this reading. |
| Dossier | The page that explains the reading and gives practical exploration directions. |
| Plain Reading | Maze mode for describing a wanted card in ordinary language. |
| Operator's Hand | Maze mode for writing exact Scryfall syntax. |
| Loom | Maze mode for building a search from visible choices. |
| Current Weave | The Loom's readable summary of current choices. |
| Reading Finds | Cards locally set aside from Maze for this reading, grouped as Finds, Sparks, or Anchors. |
| Strategium | Commander and table-literacy guidance. |
| Apocrypha | Vox Mana's public source and evidence area. |
| Codex Vocifera | Flavor designation for the Guide, never the discovery-critical label. |

Definitions must not imply that Placement is a scientific diagnosis, Reading Finds is a deck, or
Apocrypha is a complete/official Magic source library.

## Contextual-help placement rules

Use the smallest intervention that answers the player at the moment of need:

1. If the information is required before acting safely, keep a short visible explanation beside the
   action.
2. If the question is “Why is this empty?”, answer it in the empty state and name the next action.
3. If the question is “Why did this happen?” after a failed/weak attempt, answer it in the recovery
   state with a specific correction.
4. If the explanation spans multiple screens or is optional depth, use a descriptive deep link to the
   relevant Guide route/section.
5. If the material is expert reference, put it in `/guide/reference/` or the authoritative external
   source.
6. If the current interface already answers the question clearly, make no change.
7. Use a tooltip only for supplemental clarification; never put required meaning only in hover.

Every major empty/recovery state should answer, where relevant:

- What is this?
- Why is it empty or why did this happen?
- What is the most useful next action?

Do not introduce mandatory modal onboarding, coach-mark chains, product tours, completion tracking, or
a prerequisite Guide state.

## Product-writing contract

### Clear first

Navigation and action labels explain their function without lore knowledge.

### Concise second

Do not explain conventional controls, repeat text already visible nearby, or delay the product behind
background material.

### Character third

Magic flavor may enrich a clear function. It must not carry the function by itself.

### Name the destination

Prefer:

- **How to read your dossier**;
- **Which Maze mode should I use?**;
- **Try this search in the Maze**;
- **See the sources in Apocrypha**.

Avoid generic **Learn more**, **Explore**, **Discover**, or **Continue** when a destination/action can be
named. Generic copy is acceptable only when the immediate context makes the result unambiguous.

## Content-ownership boundaries

| Topic | Authority | Guide role |
| --- | --- | --- |
| Vox Mana's four-path value proposition | Home | Summarize and route; do not replace Home. |
| Reading/Placement behavior and result meaning | Archscry and accepted Placement/dossier contracts | Explain the public journey without exposing or changing internals. |
| Identity/dossier semantics | accepted dossier and identity authorities | Link and orient; never rewrite or generalize. |
| Maze parser/query/results/persistence | Maze contracts and runtime owners | Teach mode choice, visible state, and recovery; never specify new semantics. |
| Commander/table literacy | Strategium | Link with a short contextual continuation; do not duplicate lessons. |
| Sources/evidence/authority/freshness | Apocrypha | Link with a short contextual continuation; do not duplicate shelves or trust records. |
| Scryfall syntax/card facts | Scryfall and committed canonical sources | Teach a minimal human bridge and link to the authority. |

Suggested continuation patterns are functional, not frozen copy:

- “Want to understand Commander and the table? Visit Strategium.”
- “Want to see the sources behind Vox Mana? Consult Apocrypha.”

## Accessibility and interaction rules

- The Guide is optional and directly reachable from desktop and mobile top navigation.
- Every Guide page has a unique title, one clear `h1`, landmarks, and a skip target.
- Meaning and navigation survive 200% zoom, narrow widths, font wrapping, and reduced motion.
- No required explanation depends on animation, auto-rotation, color alone, a mana glyph without text,
  hover, or remembered content from another route.
- All links and controls expose clear accessible names; mode names include functional descriptions.
- Keyboard focus follows the promised destination for contextual deep links and is not hidden under the
  sticky topbar.
- Back, Forward, refresh, and direct deep links retain understandable context or recover visibly.
- Empty/recovery actions are keyboard reachable and do not trap focus.
- Tooltips, if any, are supplemental and must be pointer/keyboard dismissible under the shared contract.
- Do not force a modal, timed disclosure, or motion sequence before product use.

## First-value model

Guide completion is not a success measure. Candidate first-value events for a later analytics decision:

| Visitor | First-value event | Useful follow-through signal |
| --- | --- | --- |
| Identity seeking | a reading produces a useful result and the player reaches the dossier or a named next direction | dossier section used, supported direction compared, Maze or commander lane followed |
| Card discovery | a search returns useful results | card inspected, search refined, card set aside, or Scryfall opened |
| Existing reading | the player understands one dossier direction and follows it | named dossier panel used or contextual Maze path reached |
| Commander learning | the player reaches the appropriate Strategium moment/Console | relevant Strategium action begun |
| Evidence seeking | the player reaches the appropriate Apocrypha shelf/trust note | source card or authority explanation used |

Recommendations only:

- discuss measurement only after Guide interaction design is accepted;
- prefer reuse of existing safe route/funnel events where they already express the outcome;
- measure exits to real value, not page completion, scroll depth, or lore-eyebrow exposure;
- do not add telemetry in VM-613; any schema/event change requires its own governed implementation.

## Comparative inspiration boundary

The VM-613 review of `https://playirl.gg/resources` found a compact page that separates printable
reference sheets, rules/authority links, practical tools, and sources, while labeling what each resource
is for. Vox Mana may borrow only these principles: disciplined grouping, concise player language,
quick-reference thinking, and obvious exits to deeper authority.

Do not copy PlayIRL's **Resources** name, Reference sheets / Rules & references / Tools / Friends &
sources taxonomy, component layout, copy, or visual treatment. Vox Mana's IA comes from its own player
journeys and ownership boundaries.

## Protected boundaries

Guide/onboarding work must not change or reinterpret:

- Placement scoring, evidence, candidate ranking, qualification, stopping, or public result semantics;
- dossier semantic truth or SIRF outputs;
- Plain Reading parser/translator, Operator's Hand, Loom, shared semantic-state, or Scryfall query
  generation semantics;
- Reading Finds persistence or account/saved-reading behavior;
- telemetry schema;
- Strategium content authority;
- Apocrypha source authority;
- `/library/` compatibility behavior.

No Guide card may use presentation convenience as authority to cross these boundaries.

## Relationship to existing contracts

This contract governs onboarding ownership and placement of explanations. It defers to:

- `docs/architecture/route-ownership-matrix.md` for live route owners;
- `docs/architecture/project-atlas.md` and `docs/architecture/data-flow-map.md` for current journeys;
- `docs/contracts/maze-query-contract.md` and `docs/contracts/maze-semantic-state-contract.md` for Maze
  meaning and protected runtime boundaries;
- accepted Archscry/Placement/dossier authorities for result truth;
- Strategium and Apocrypha contracts/content for their specialist domains;
- `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md` for future implementation/validation gates.

When this contract conflicts with a specialist semantic, evidence, placement, accessibility, or source
authority, the specialist authority controls and the conflict returns to Owner Review.

## Acceptance and change control

This candidate becomes the VM-614+ authority only after explicit Owner acceptance. Changes that expand
the IA, create mandatory onboarding, change the four-path architecture, rename Guide, reuse `/library/`,
or move Strategium/Apocrypha content into Guide require a new owner-reviewed product decision.
