# VM-613 Journey, Friction, and Contextual Onboarding Maps

Status: Owner accepted

Governing contract: `docs/contracts/field-guide-onboarding-contract.md`

## Severity and intervention vocabulary

Onboarding severity is not defect severity:

- **High:** likely to prevent or materially misroute first value.
- **Medium:** likely to slow understanding or cause an avoidable wrong path.
- **Low:** polish or optional depth after the main path remains understandable.

Allowed intervention classes:

- Guide landing;
- contextual visible copy;
- empty state;
- recovery state;
- descriptive deep link;
- deeper Guide content;
- no change.

Tooltip-only is not an intervention class because essential information cannot depend on it.

## Current-state journey map

| Visitor | Arrival | Action | First meaningful value | Next useful action | Current gap |
| --- | --- | --- | --- | --- | --- |
| Identity seeking | Home or Archscry | choose Archscry and complete a reading | supported identity direction appears with enough explanation to trust the next step | open/read the dossier; compare a supported direction; follow a commander or Maze lane | no persistent cross-product explanation of Reading -> Placement -> Dossier |
| Card search | Home or direct Maze | choose Plain Reading, Operator's Hand, or Loom and search | visible translation/query produces useful cards | inspect, refine, set aside, or open in Scryfall | mode choice and recovery depth compete with a dense console |
| Existing reading | stored Archscry result or shared return | resume dossier and choose a relevant panel/path | one direction becomes actionable | commander browsing, Maze thread, Reading Finds return, retake/compare | section density; “where should I start?” remains implicit |
| Commander learning | Home or Guide | choose Strategium moment/Console | player reaches material matching the current table question | complete the Strategium action and apply one change | visitor may not know Strategium is the table-literacy authority |
| Evidence seeking | Home, Guide, or source question | choose Apocrypha shelf/trust note | player sees the correct authority/boundary for the question | open the source or follow the trust explanation | “where do source questions belong?” is not globally explained |

## Desired onboarding journey map

| Visitor | Orientation | Act | Tiny explanation/feedback | Value shown | Next action |
| --- | --- | --- | --- | --- | --- |
| Identity seeking | Home or Guide says Archscry fits this goal | start reading immediately | result sets dossier expectations; dossier directory offers **How to read your dossier** | current direction and why it fit | named dossier lane, Maze, commander browsing, compare/retake |
| Card search | Guide/Maze mode chooser uses the player's language | search in matching mode | visible translation or Current Weave explains the produced query | cards and result count | inspect, refine, set aside, Scryfall |
| Existing reading | Guide/Archscry identifies the dossier as the interpretation layer | open the needed panel | section intro names the decision it supports | practical direction | specific continuation, not generic “Explore” |
| Commander learning | Guide names Strategium and relevant moment | enter Strategium directly | Strategium owns further teaching | table-reading action | next game/change |
| Evidence seeking | Guide names Apocrypha and shelf/trust note | enter relevant source area | Apocrypha owns authority/freshness detail | appropriate source boundary | open source or return |

## Onboarding friction inventory

| Surface | Current behavior | Newcomer question | Severity | Intervention class | Owner |
| --- | --- | --- | --- | --- | --- |
| Global navigation | five functional routes; no Guide | “Where is help / where do I start?” | High | Guide landing | shared topbar / VM-614 |
| Home | four good paths, but connections are implicit | “Which one should I choose if I am unsure?” | Medium | descriptive deep link | Home + Guide / VM-614 |
| Home | identity signal appears before the four paths | “Do I need to understand this chart before I can use Vox Mana?” | Low | contextual visible copy or no change after owner review | Home / VM-614 judgment |
| Archscry landing | describes reading/result/dossier well | “What does Placement mean?” | Medium | descriptive deep link + deeper Guide content | Archscry + `/guide/reading/` / VM-615 |
| Quick Reading start | current isolated fresh-state harness cannot reach readiness | “Can I start without an account?” | High evidence gap, not proven product defect | no runtime change in VM-613; repair harness separately | Archscry test owner / separate follow-up |
| Result/Placement | best fit and alternatives depend on result state | “Is this permanent, exact, or the only identity I can explore?” | High | contextual visible copy | Archscry result presenter / VM-615 |
| Result -> dossier | full value is below/behind dossier transition | “What will the dossier give me?” | Medium | concise contextual expectation copy | Archscry result / VM-615 |
| Dossier directory | many strong sections compete for first attention | “Which section should I read first?” | High | descriptive deep link + contextual visible copy | dossier presenter / VM-615 |
| Start Here | already provides a commander plan and self-check | “What should I do with this?” | Low | no change; link only if evidence shows need | dossier presenter |
| Commander Browsing Starts | multiple external services/lanes | “Are these Vox Mana rankings or places to browse?” | Medium | contextual visible copy | dossier presenter; VM-547 remains independent |
| What to Look For | identity-specific direction is useful | “How do I use these ideas when browsing?” | Low | no change or named Maze continuation | dossier presenter |
| Maze handoff | strong context/return copy | “Will I lose my reading?” | Low | no change; optional `/guide/maze/` deep link | dossier + Maze |
| Maze mode cards | functional descriptions exist | “Which mode matches what I know?” | Medium | deeper Guide content + descriptive deep link | Maze + `/guide/maze/` / VM-616 |
| Plain Reading translation | You wrote / Maze translated is visible | “What did Maze understand or ignore?” | Medium | contextual visible copy | Maze / VM-616 |
| Weak Plain Reading | confidence/warnings/unresolved terms appear | “What should I change first?” | High | recovery state | Maze / VM-616; parser semantics protected |
| Plain zero result | copy advises loosening/removing/changing AND to OR | “Which part of my search is most restrictive?” | Medium | recovery state + deeper Guide content | Maze / VM-616 |
| Operator's Hand | exact syntax mode is explicit | “Where do I learn more Scryfall syntax?” | Low | descriptive deep link to compact Guide and authoritative Scryfall reference | Maze / VM-616/617 |
| Loom colors | relation/printed-color choices are visible but nuanced | “Do these colors mean exact, within, or printed?” | High | contextual visible copy + deeper Guide content | Maze / VM-616 |
| Loom dossier context | context may be available but not applied | “Is my reading changing this search?” | High | contextual visible copy | Maze / VM-616 |
| Current Weave | empty state names available choices | “What have I selected?” | Low | no change | Maze |
| Reading Finds empty | purpose, buckets, and actions are visible | “Why is this empty and what do I do?” | Low | no change | Maze |
| Direct `/maze/` after dossier | prior context remains by default | “Am I searching independently or from my reading?” | Medium | explicit available/applied/independent state plus reversible dismiss/standalone treatment | Maze / VM-006 + VM-616 |
| Results | cards, count, sort, details, Set aside, Open in Scryfall are available | “What should I do with a useful result?” | Medium | contextual visible copy | Maze / VM-616 |
| Strategium | hub explains moments and Console | “Is this where I learn Commander?” | Low | Guide landing + descriptive deep link | Guide; Strategium unchanged |
| Apocrypha | Quick Guide and source boundaries are strong | “Where did this claim come from?” | Low | Guide landing + descriptive deep link | Guide; Apocrypha unchanged |
| `/library/` | legacy redirect to Apocrypha | “Is Library the Guide?” | High if naming collides | no change; enforce reserved name | shared route contract |
| Mobile topbar | route hints and Reduce motion in menu | “Can I find Guide on mobile?” | High for implementation | Guide landing/nav | shared topbar / VM-614 |
| Reduced motion | state is persistent and visible in menu | “Does help still make sense without motion?” | Medium | no-motion content contract | all Guide cards |

## Contextual onboarding matrix

| Surface | User question | Minimum visible explanation | Deeper destination | CTA/action | Must not do |
| --- | --- | --- | --- | --- | --- |
| Home | What is Vox Mana? | identity/taste compass; not a deckbuilder | `/guide/` | **Open the Guide** or **Where should I begin?** | add a fifth functional-path card |
| Archscry landing | What will I get? | short reading -> result -> dossier; account optional | `/guide/reading/` | **How an Archscry reading works** | expose scoring/evidence internals |
| Placement result | What does this result mean? | current answers support this direction; the dossier explains why it fit and practical exploration directions | dossier via existing product CTA | **Open the dossier** | add the canonical dossier-help link here; imply permanence, diagnosis, or unsupported certainty |
| Dossier directory | Where do I begin? | one sentence naming the first recommended section and why | `/guide/reading/#dossier` | **How to read your dossier** | restate identity-specific content |
| Commander Browsing Starts | Are these rankings? | external browsing starting points, not canonical rankings | relevant Guide reading section | **Browse [service] for [specific lane]** | claim popularity is fit/truth |
| Maze mode selector | Which mode should I use? | one-line intent under each mode | `/guide/maze/#choose-a-mode` | **Which Maze mode should I use?** | hide mode choice behind brand-only labels |
| Plain Reading | What did Maze understand? | You wrote / Maze translated / ignored or unresolved terms | `/guide/maze/#translation` | **How Maze translates a search** | alter parser output in presentation |
| Plain weak/no result | How do I recover? | name the likely constraint/unresolved term and one correction | `/guide/maze/#recover` | **Try a broader search** or a specific edit | generic “Try again”; silently broaden query |
| Operator's Hand | Where is syntax help? | exact syntax goes directly through normalized contract | `/guide/reference/#scryfall` + official reference | **Open Scryfall syntax reference** | recreate full Scryfall docs |
| Loom colors | What does this relation mean? | ordinary-language exact/within/printed distinction adjacent to control | `/guide/maze/#colors` | **How Commander colors work here** | rely on tooltip or glyph alone |
| Loom context | Is dossier context applied? | explicit available/applied/not-applied/independent state | `/guide/maze/#reading-context` | dismiss or search independently; **Apply context** only if existing semantics authorize it | imply hidden filtering or silently clear retained context |
| Current Weave | What is selected? | visible summary and next choice | `/guide/maze/#loom` only if needed | **Search** / **View results** | duplicate the whole form |
| Reading Finds empty | What goes here? | cards set aside from this reading; next action | `/guide/maze/#reading-finds` | **Search the Maze** | imply deckbuilding/account sync |
| Results | What next? | inspect, refine, set aside, or open externally | `/guide/maze/#results` | specific action labels | generic “Continue” |
| Strategium bridge | Where do Commander/table questions go? | Strategium owns table literacy | Strategium route/moment | **Visit Strategium** / named moment | duplicate Strategium lessons |
| Apocrypha bridge | Where do sources/evidence questions go? | Apocrypha shows public sources and limits | relevant shelf/trust note | **See the sources in Apocrypha** | duplicate source shelves/counts |

## Existing-work reconciliation

No existing card is edited or deleted by VM-613.

| Work | Disposition under the Field Guide contract | Reason |
| --- | --- | --- |
| VM-006 Archscry/Maze verification and repeat-visit polish | remains independent; Guide governs explanatory placement, while VM-006 retains continuity/lazy-loading/browser verification | runtime continuity is not Guide content; direct Maze context persistence should be reviewed there and in VM-616 |
| VM-007 dossier quality/link follow-up | remains independent; Field Guide may govern newcomer wording location but not semantic/content audit work | dossier truth and link quality have their own authority |
| VM-406 Archscry Placement -> Strategium bridge concepts | partially governed by this contract after acceptance; likely reconciled into VM-615/617, but not silently superseded | contract now answers ownership/boundary; exact anchors/return behavior remain implementation work |
| VM-547 post-reading Commander shortlist bridge | remains independent and is constrained by `/guide/reading/` | it adds product value/authority, not merely onboarding; Guide may route to it once built |
| VM-548 Commander seed discovery mode | independent/deferred | new discovery mode, outside V1 Guide and current four functional paths |
| VM-424 Home first-visit positioning | completed baseline to preserve | already establishes four paths and product boundary |
| VM-426 Reading Finds/dossier reflection | completed baseline to explain, not duplicate | Guide may teach its role; storage/reflection remain Maze/dossier owned |
| VM-449 Maze return-loop copy | completed baseline to preserve | already provides route-local continuity copy |
| VM-550/VM-552 Strategium work | completed specialist authority | Guide routes to it; no content move |
| VM-591 Maze semantic-state contract | protected dormant authority | Guide does not activate or reinterpret it |
| VM-592 Loom v0 | completed baseline to explain | VM-616 teaches current accepted controls/meaning only |
| Apocrypha VM-396/545 and related release work | completed specialist authority | Guide routes source questions; no source duplication |
| VM-099 “Field Guide” wording history | no product namespace authority | historical use does not override the locked `/guide/` contract |

Owner disposition after accepting VM-613:

- keep VM-006, VM-007, VM-547, and VM-548 independent;
- mark VM-406 as governed/partly superseded only when VM-615/617 cards are actually registered;
- do not close any backlog card merely because this contract mentions its outcome.

## Accepted owner decisions

1. Global order is **Home · Guide · Archscry · The Implicit Maze · Strategium · Apocrypha**.
2. **If unsure, start with Archscry** is optional, low-emphasis advice only.
3. The result sets expectations; the dossier directory owns **How to read your dossier** instruction.
4. Direct Maze visits retain dossier context by default, with explicit available/applied/independent
   state and a reversible dismiss/standalone treatment owned by VM-616 with VM-006 continuity preserved.
5. `/guide/reference/` has at most six distinct-teaching-value recipes; the cap is not a quota.

The eight landing-page intents remain coverage requirements. VM-614 must group them into a small
primary decision set—approximately **Find my Commander direction**, **Find cards**, and **Understand Vox
Mana**—with existing-reading, Strategium, Apocrypha, exact-Scryfall, and visual-building paths routed as
secondary/contextual continuations. This constrains information hierarchy, not final copy or layout.
