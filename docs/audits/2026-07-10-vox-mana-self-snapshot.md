# Vox Mana Self-Snapshot

**Audit date:** 2026-07-10  
**Audited state:** `main` at `307e794` after VM-495  
**Audit card:** VM-496  
**Historical baselines:** VM-459 (2026-06-30 full snapshot) and VM-474 (2026-07-04 delta reevaluation)

## How to read this snapshot

- **Evidence** means the claim is directly supported by current runtime copy, code, data, a current test result, a current rendered route, or a named project record.
- **Inference** means the repo supports the interpretation, but does not state or prove it directly.
- **Judgment** is the auditor's product or release-readiness assessment.

This distinction matters because Vox Mana's validation system is good at proving that authored rules execute consistently. It does not, by itself, prove that the identity taxonomy is psychologically valid, that the copy is useful to real players, or that people will return or pay.

## 1. Project Identity

### What Vox Mana currently is

**Evidence:** The current Home page says: “Vox Mana is a Commander identity and taste compass. It helps you understand your colors, placement, play patterns, and what to look for when exploring commanders or decks elsewhere.” The primary route cards then divide that promise into four jobs:

- Archscry: “Find your Commander color identity and placement.”
- Maze: “Search Magic cards in plain English.”
- Strategium: “Learn Commander concepts, archetypes, and table patterns.”
- Apocrypha: “Read the sources, lore, and design logic behind the model.”

The core problem appears to be **direction before construction**: a Commander player may know they want to play, but not yet know how their table preferences, color philosophy, pace, risk tolerance, and favored play patterns fit together. Archscry interprets those signals; the dossier gives them a human-readable result; Strategium teaches the vocabulary; Maze helps turn a reading into card exploration.

**Inference:** The strongest likely users are curious newer or returning Commander players and experienced players who enjoy reflecting on taste. The product assumes enough MTG interest to care about color identity, commanders, archetypes, and Scryfall, but it does not assume fluency in query syntax or a finished deck concept.

### What it explicitly is not

**Evidence:** Home says, “Not a deckbuilder: Vox Mana helps you choose a direction before you build or browse decklists somewhere else.” Project records including `docs/product/vox-mana-product-definition.md`, VM-458, VM-459, VM-474, and VM-495 repeatedly exclude a full deckbuilder, legality checker, general recommendation engine, account-based deck storage platform, rules authority, and generic MTG wiki. Account deck links are still suppressed by `ACCOUNT_DECK_LINKS_ENABLED = false` in `assets/js/index.js`; VM-422 and VM-446 preserve the live-RLS gate before any return.

### Is that boundary clear?

**Evidence:** It is clear on Home and in governance documents. It is less clear in the implementation vocabulary and output. `assets/js/commander-dossier.js` exports `buildPreconRecommendations()`. `assets/js/index.js` consumes `dossier.commanderRecommendations`, `landRecommendations`, and a ranked precon result, then displays “Good starting lane for.” The current precon source also contains comparative claims such as “the strongest C17 precon,” “the best Vampire commander ever printed,” and “one of the most popular and versatile commanders ever printed” in `data/precons/vox-mana-precons.source.json`; those values propagate into `data/precons/vox-mana-precon-catalog.json`.

**Judgment:** The repo communicates the intended boundary better than the runtime architecture obeys it. Vox Mana is not a general decklist recommender, but it does contain a curated recommendation subsystem. Calling the product “not a recommendation engine” without qualification overstates the separation. The project must either narrow the claim—“not a decklist or popularity recommendation engine”—or rename and constrain the ranking behavior into explicitly educational “browsing starts.”

### Does the implementation match the stated identity?

Mostly. Archscry, the placement model, dossier panels, Maze handoff, Strategium, and Apocrypha all support interpretation and exploration. The current Home route is unusually explicit about what to do. Maze compiles intent into Scryfall rather than pretending to own card truth. The main mismatches are recommendation-shaped precon/commander output, account/profile traces that exceed the local-first core, and some copy that presents interpretive synthesis with more confidence than its sources deserve.

### Blunt positioning statement

**Vox Mana is a source-conscious Commander taste assessment that turns a player's preferences into a color-identity reading, an explanatory dossier, and a set of educational browsing directions. It is strongest before deck construction starts. It is not yet validated as a player-fit model, and parts of its commander and precon support behave more like recommendations than its public boundary admits.**

## 2. Product Philosophy

| Pattern | What it is | Repo evidence | Consistency | Where it breaks or becomes unclear |
|---|---|---|---|---|
| Source-first research | Claims should originate in an attributable source or an approved authored ledger. | `docs/architecture/source-generated-guardrails.md`; per-identity files under `data/raw-factions/`; `docs/research/source-ledgers/`; Apocrypha copy “Where Vox Mana shows its work.” | Strong for core identity research and Scryfall semantics. | Precon prose relies heavily on a third-party source page and includes unsourced superlatives. Lore and commander support quality vary by identity. |
| Identity and taste interpretation | Colors are treated as patterns of preference and play, not a quiz result with objective authority. | Home “identity and taste compass”; `data/identity-layers.json`; adaptive placement functions in `assets/js/quick-reading.js`; dossier presentation in `assets/js/archscry-presentation.js`. | Strong in product definition and route design. | The UI rarely explains that “placement” is an authored interpretive match. A high-confidence score can look empirical even though no external validity study exists. |
| Commander education | Results should teach what the identity looks like at a table and what to notice next. | Strategium's “Learn the Commander table”; dossier panels “Start Here,” “Why This Fits,” “Commander Browsing Starts,” and “Card Signals”; 50 Strategium archetype entries. | Strong. | Some support copy slides from education into comparative recommendation. Beginner definitions are uneven for terms such as archetype, placement, expression, and thesis. |
| QA-style validation | Authored product rules should have deterministic checks, golden paths, audits, and release evidence. | `research/run-tests.js`; `assets/js/quick-reading-tests.js`; parser tests; browser smoke; route/copy validators; VM-495 release ledger. Fresh VM-496 runs passed 37 placement golden paths, 226 parser cases, desktop/mobile browser smoke, and Lighthouse 91/100. | Very strong mechanically. | `dossier:audit` exits successfully with 113 warnings and zero “passes,” so green does not mean clean. CI omits several locally run release checks. Visual baselines are ignored local artifacts, not hosted CI gates. |
| Layered governance | Product, source, generated data, runtime, tickets, and handoffs have distinct authority. | `docs/architecture/data-contracts.md`; `docs/architecture/source-generated-guardrails.md`; `docs/architecture/route-ownership-matrix.md`; Kanban folders; `HANDOFF_INDEX.md`. | Strong in intent and often in practice. | The docs corpus is large enough that historical plans can look current. Duplicate done-ticket IDs and stale references weaken the apparent precision of the operating system. |
| Local-first tools | Core value should work without an account and persist locally where appropriate. | Archscry says “No login wall up front”; Reading Finds uses `vm_maze_reading_finds_v1`; handoff key `vm_archscry_maze_handoff_v1`; reduced-motion preference is local. | Strong for the primary flow. | Archscry and Maze still load the Supabase UMD bundle; profile/session code remains in `assets/js/shared.js`. The product has not fully chosen between “optional cloud profile” and “strict local-first.” |
| Human approval | Generated or model-assisted material should not silently become canonical. | Source/generated guardrails; review statuses in raw faction files; source ledgers; required handoffs and Kanban acceptance criteria. | Strong as a documented norm. | The volume of generated presentation prose and historical artifacts makes manual review hard to verify. The repo proves a process exists more readily than it proves every line received meaningful human scrutiny. |
| Stop conditions | Work should stop at explicit boundaries rather than expand by momentum. | VM-458 defers deck saving; VM-446 blocks live deck-link enablement without credentials and RLS proof; VM-493 keeps Strategium expansion strategy-only; anti-drift copy checks. | Strong. | The repo itself is overgrown: 1,800+ docs files, hundreds of handoffs/cards, and long chronological research documents. Governance stops feature drift better than documentation accumulation. |
| Dossier-style explanation | A result should be readable as a narrative file, not only a score. | Archscry result structure and `assets/js/commander-dossier.js`; presentation snapshots; adjacent fits and “why this fits.” | Strong and differentiated. | Dossiers are long, repetitive, and dense on mobile. Generated phrases recur across identities, reducing the sense that each dossier is truly authored. |
| Avoidance of overclaiming | The UI should not pretend to be a rules authority or make unsupported claims. | Product boundary copy; Scryfall-forward Maze architecture; source confidence fields; manual-gap ledgers. | Mixed. | Precon popularity/strength superlatives, confidence percentages without external validation, and limited public claim-to-source linkage weaken this principle. |

## 3. Active Product Themes

| Theme | Current state | Evidence | Product value | Main risk | Next useful decision |
|---|---|---|---|---|---|
| Home first-visit clarity | Shipped and materially improved. | Current hero: “Your colors have a shape.” Plain-language product definition, explicit “Not a deckbuilder,” and four route cards. VM-495 visual baselines pass at mobile, tablet, and desktop. | Gives a visitor a reason to continue and sets the pre-build boundary. | Branded route names still require translation; the right-side identity visual reads as empty or extremely low-contrast in accepted captures. | Decide whether Archscry is the single primary first action and make the visual communicate an actual signal at a glance. |
| Commander identity compass | Core shipped experience. | Archscry quick reading, adaptive placement, 37 golden paths, result persistence, dossier handoff. | This is the clearest differentiated product job. | No user study shows that players recognize themselves in the result or change their exploration behavior. | Run VM-469 with new/returning Commander players before adding more result depth. |
| Placement model | Structurally mature, epistemically unvalidated. | `createInitialAdaptiveState()`, `selectNextAdaptiveQuestion()`, `applyAdaptiveAnswer()`, `rankAdaptiveFactions()`, `shouldFinishAdaptiveReading()`, and `buildAdaptivePlacementResult()`; 37/37 golden paths. | Makes the compass deterministic and auditable. | A deterministic authored taxonomy can still be wrong, confusing, or biased. “Confidence” can be mistaken for scientific certainty. | Define what a placement score means in user-facing and internal language, then test result agreement with humans. |
| Archscry dossier generation | Rich, functional, visually polished, warning-heavy. | 37 primary and 76 adjacent dossiers audited; panels cover placement, adjacent fits, commanders, cards, mana, and Maze. Current audit: 113 warnings, 0 failures. | Converts a quiz result into explanation and next actions. | Length, repeated templates, unsupported support claims, and small mobile copy reduce trust and completion. | Choose a “core dossier” above the fold and demote the rest to progressive disclosure. |
| Maze plain-language search | Functional and technically credible. | Live query “red vampires that sacrifice creatures” compiled to `type:vampire type:creature c:r o:sacrifice` at 96%; 12 live Scryfall results; 226 parser tests; browser smoke. | Turns a reading into practical exploration without building a deck database. | Search can become the product by gravity. Confidence labels may overstate semantics. No evidence yet that Reading Finds causes repeat use. | Keep Maze subordinate to the reading loop and test whether people return to saved finds within a week. |
| Maze Operator's Hand and Loom | Operator syntax is mature; Loom v0 is a visual query builder, not a graph explorer. | Mode and builder tests; VM-474; `docs/research/maze-plain-reading-deep-dive.md`. | Serves both novice and expert search behavior while preserving Scryfall compatibility. | The three-mode surface is powerful but cognitively heavy. A v1 visual explorer could drift into a second product. | Retain Loom v0 until users demonstrate a problem that only a visual relationship view solves. |
| Reading Finds | Local-first support loop is shipped. | `vm_maze_reading_finds_v1`, legacy migrations, Finds/Sparks/Anchors grouping, copy/clear controls, Archscry-Maze handoff. | Gives Maze a light memory without accounts or deck storage. | Cold-entry UI is prominent and may resemble a deck workspace; nested interactive semantics need repair. | Measure whether people understand “set aside” and distinguish it from a decklist. |
| Strategium education | Useful, coherent, and currently the clearest supporting route. | “Learn the Commander table”; 50 archetype entries (23 core, 27 advanced); Commander concept and table-pattern material; VM-416 and VM-493. | Helps users acquire the vocabulary needed to interpret a dossier and discuss a pod. | Content can become a generic Commander guide; bracket material can stale as official language changes. VM-493's precon-readiness concept is not live. | Decide whether Strategium teaches the dossier or tries to become a standalone reference library. Favor the former. |
| Apocrypha source library | Organized public source shelf, not an archive dump. | Nine disclosure shelves; 49 external links observed: 40 Wizards, three YouTube, two Reddit, and one each from Fandom, Draftsim, GitHub, and MTG Lore. | Makes the research posture visible and differentiates Vox Mana from opaque quizzes. | It does not map a user-visible dossier claim to its exact source/anchor. Only one observed official-lore link is thin relative to the repo's lore surface. | Add one end-to-end “how this claim was sourced” example before adding more links. |
| WUBRG, Colorless, four-color, and full identity coverage | Runtime structure covers all 37 registered identities. | `data/identity-layers.json`, `data/factions.json`, and placement tests all report 37; all raw-faction directories contain claims/profile/placement/changelog/sources. VM-389 promoted all previews. | Prevents the compass from collapsing into only the familiar ten guilds. | Research depth and terminology are uneven; four-color names are project synthesis; Colorless has a stale lifecycle claim; WUBRG remains special in research organization. | Define a coverage rubric that distinguishes “structurally present,” “source-complete,” and “publicly trustworthy.” |
| Radar and trait visualization | Technically present; visually ambiguous in accepted captures. | Chart canvas checks and VM-495 visual compares pass. Home and Archscry screenshots show the frames but little legible plotted signal. | Can communicate “shape” faster than prose and support the brand promise. | A barely perceptible chart looks broken and spends attention without conveying evidence. | Add a visual-legibility assertion and human check, not only a nontransparent-canvas assertion. |
| Commander/precon/archetype bridge content | Large and integrated. | 155 source and 155 generated precons; ranked precon builder; commander recommendations; Strategium archetypes; dossier “Good starting lane for.” | Gives the reading a practical bridge to external browsing. | It is the main boundary and source-confidence fault line. Comparative claims can create false authority. | Decide whether this is education, editorial curation, or recommendation, then align names, claims, and evidence. |
| Source governance and ledgers | Extensive and operational. | Raw faction bundles, source anchors, SHA-256 local captures, research ledgers, source/generated validation, Apocrypha. | Makes correction and audit possible. | The system's size can create a false impression that all evidence is equally current or equally strong. | Introduce a current-authority index and stale-claim checks rather than adding another layer of narrative docs. |
| VM ticket workflow and Codex operating system | Mature but overgrown. | 490 done-card files, 544 handoffs, board, handoff index, role rules, implementation packets. | Creates reproducible delivery evidence and supports portfolio/QA storytelling. | Duplicate VM IDs, stale handoffs, and a broken README link make navigation harder than the governance language suggests. | Consolidate the repo entry point and explicitly catalog duplicate/historical ticket IDs. |

## 4. Technical Strengths And Patterns

### Strengths

| Strength | Evidence | Why it matters |
|---|---|---|
| Static, low-infrastructure delivery | Route-level HTML, CSS, and JavaScript; `.nojekyll`; `CNAME`; no required bundler or server rendering. | GitHub Pages is an appropriate host. Core reading and education remain available without a proprietary backend. |
| Progressive enhancement | Route content exists in semantic HTML; charts and dynamic data enhance it; Home lazy-loads Chart.js; account services fail soft. | A network or script failure is less likely to erase the entire product explanation. |
| Deterministic placement | Adaptive placement functions have 37 golden paths and 625 live gate-bias paths. | Regression is observable. A change to the model can be reviewed as behavior, not vibes. |
| Grounded search compiler | Plain-language terms compile to inspectable Scryfall syntax; 226 parser cases and a semantic registry cover colors, identity, keywords, product families, negation, and commander intent. | Users can see what the system inferred, and Scryfall remains the card authority. |
| Local-first state boundaries | Reading Finds, Archscry-Maze handoff, last result, and reduced-motion state have explicit keys and migration paths. | The main experience does not need accounts, and saved exploration remains lightweight. |
| Source/generated separation | Raw faction files and precon source files feed generated runtime artifacts; guardrails discourage direct edits to derived JSON. | Corrections can be made at the right layer and rebuilt reproducibly. |
| Route metadata and semantic checks | `test:route-metadata`, `lint:html`, copy-boundary checks, frontend smoke, and browser smoke all pass. | Public routes have coherent titles, canonical metadata, landmarks, deferred scripts, and basic flow coverage. |
| Accessibility foundations | Semantic navigation, landmarks, labels, reduced-motion handling, intrinsic image sizing, keyboard-aware controls, and Home Lighthouse accessibility 100. | The implementation starts from accessible primitives rather than retrofitting a canvas-only experience. |
| Release evidence | VM-495 recorded green route visuals, browser tests, and Lighthouse; current GitHub validation and Pages deployment for `307e794` are successful. | The current `main` is showable without reconstructing a private build environment. |

### Weaknesses and product risks

| Weakness | Evidence | Product risk |
|---|---|---|
| Large route and domain monoliths | `assets/js/commander-dossier.js` and `assets/js/graph.js` are about 200 KB each; `assets/js/index.js` about 146 KB; `research/research-init.js` about 124 KB; `assets/css/archscry.css` about 88 KB. | A small product-copy or UI change can have a wide regression surface. Ownership and review become function-search exercises. |
| Recommendation semantics embedded in code | `buildPreconRecommendations()`, `commanderRecommendations`, `landRecommendations`, ranking, and “Good starting lane for.” | The architecture undermines the stated product boundary and makes future deckbuilder drift easier. |
| Accessibility test blind spot in Maze cards | `research/research-init.js` gives a result wrapper `role="button"` and places an actual “Set aside” button inside it. | Nested interactive behavior can confuse keyboard and screen-reader users even though static lint passes. |
| CI is narrower than the release ledger | `.github/workflows/validation.yml` runs HTML/JS lint, source guardrails, parser, placement, finds, deck-link, copy, and frontend smoke. It does not run full `npm test`, route metadata, browser smoke, Lighthouse, Scryfall grounding, or visual compares. The hosted Browser Smoke Pilot has zero runs. | A pull request can be green without exercising the exact flows and visual expectations used to claim public readiness. |
| Local-only visual authority | `docs/qa/visual-baseline-waivers.md` records green current compares, but the image artifacts are ignored and not CI-controlled. | Visual proof is difficult for another reviewer to reproduce or audit. Accidental baseline acceptance remains a process risk. |
| External runtime dependencies | Archscry/Maze load Supabase from jsDelivr; Maze depends on live Scryfall; optional profile flows depend on Supabase/Google. | Core static content is robust, but some useful flows can degrade because of CDN, API, or policy changes outside the repo. |
| Backend state is not release-proven | SQL and profile code exist; a browser-visible anon key is checked in, which is normal for Supabase, but live RLS is the real control. VM-446 lacks credentials and VM-422 is deferred. | Enabling account/deck-link UI without live policy proof could create privacy or data-isolation defects. |
| Documentation scale exceeds navigability | More than 1,800 files under `docs/`, roughly 130 MB; about 120 MB sits under research. `docs/research/maze-plain-reading-deep-dive.md` is a 900-line chronology whose early “confirmed bugs” are later fixed. | A contributor can mistake historical diagnosis for current state, duplicate work, or follow the wrong authority. |
| Weak repository entry point | `README.md` is 94 bytes, names the repo `mtgSiteWIP`, and links to nonexistent `docs/workflow.md` instead of `docs/reference/workflow.md`. | Public reviewers encounter a less coherent project than the product itself. This directly harms maintainability and portfolio credibility. |
| Ticket identity collisions | Done-card filenames duplicate VM-044, VM-049, VM-165–168, VM-197–201; the board documents only some collision history. | “VM-###” is not always a unique audit key. Handoff and ticket citations can be ambiguous. |
| Test harness noise | The fresh Lighthouse run saved a passing 91/100 report but ended with Edge `taskkill` “Access denied”; exit code remained zero. | The result is usable, but process-cleanup errors can hide resource leaks or make automation less trustworthy. |

### Build, deployment, and future-backend assessment

**Evidence:** The repo's natural deployment model is GitHub Pages: static routes, `.nojekyll`, custom domain `voxmana.io`, and successful current Pages deployment. There is no mandatory production build step beyond generating canonical artifacts when sources change. This is appropriate for the current product.

**Evidence:** Supabase traces are real, not hypothetical: profile/session helpers, optional Google sign-in copy, SQL, and deferred deck-link work exist. They do not currently define the core product. `ACCOUNT_DECK_LINKS_ENABLED = false` is the correct current release posture.

**Judgment:** Do not introduce a framework or database merely to modernize the stack. Modularize the largest JavaScript domains and tighten CI first. A backend becomes justified only when repeated use requires cross-device saved readings or explicitly external deck links and live RLS has been proven.

## 5. Data, Evidence, And Source-of-Truth Model

### Authority map

**Current source of truth:**

- `data/identity-layers.json` is the canonical runtime registry for the 37 active identities and current preview/placement eligibility.
- `data/raw-factions/<identity>/` is the source-authored identity bundle: claims, profile, placement, changelog, and sources.
- `data/precons/vox-mana-precons.source.json` is the authored precon source; `data/precons/vox-mana-precon-catalog.json` is generated.
- `data/scryfall/semantic-registry.json` and the grounding inputs/overrides under the Scryfall data paths define parser semantics; live Scryfall defines current card results.
- Runtime HTML/JS/CSS defines what users actually see and do.
- `docs/architecture/data-contracts.md`, `docs/architecture/source-generated-guardrails.md`, and `docs/architecture/route-ownership-matrix.md` define authority and ownership rules.

**Generated or derived:**

- `data/factions.json`, `data/placement-model.json`, generated precon catalogs, dossier snapshots, presentation snapshots, audit reports, and visual/Lighthouse artifacts.
- These are valid comparison and runtime artifacts, but should not be hand-edited when an upstream source exists.

**Not runtime truth:**

- Handoffs, Kanban cards, archived plans, audits, deep-dive chronologies, and implementation packets. They are evidence of decisions at a time.
- `docs/reference/commander-faction-guidance.md` is incomplete at 15 identities while runtime coverage is 37; it should not be treated as the current coverage roster.
- `docs/research/maze-plain-reading-deep-dive.md` includes old bugs and later repairs in one long file; its opening sections are not a current defect list.

### Layer 1 and Layer 2

**Evidence:** The conceptual boundary is documented clearly in `docs/architecture/placement-domains.md`, source/generated guardrails, and `docs/research/identity-layer1-coverage-and-wubrg-plan.md`: Layer 1 is product-facing placement/dossier truth; Layer 2 is research, sourcing, and deeper scaffolding. VM-444 added a useful supersession note to the WUBRG plan.

**Judgment:** The boundary is clear to someone who finds the correct architecture docs. It is not clear from the README or from every raw claim. Documentation discoverability, not absence of rules, is the problem.

### Traceability and auditability

**Evidence:** Core faction claims can be highly traceable. A raw bundle such as White links claim IDs to source IDs and anchors, stores official URLs, records confidence, and includes local PDF captures with hashes. The placement engine is mechanically auditable through explicit question/state/ranking functions and golden paths.

**Inference:** Identity placement is not empirically auditable in the scientific sense. The repo can show exactly why its authored model produced a result; it cannot yet show that the result accurately models a population of Commander players.

**Evidence:** Traceability quality varies. Four-color identity names and synthesis depend partly on internal ledgers and project-authored interpretation. Colorless has explicit manual gaps for Oracle, rules, legality, and lore. Commander support files include “No verified secondary commander found” states and synthesized reasons. The precon source uses third-party material and unsupported comparative language.

### Concrete contradictions and stale evidence

1. `data/raw-factions/colorless/colorless.claims.json` still states `preview_eligible: false` and says no Home preview is approved. `data/identity-layers.json` now has Colorless `preview_eligible: true` after VM-389. The registry is current runtime authority; the raw lifecycle claim is stale.
2. `docs/reference/commander-faction-guidance.md` covers 15 identities, not the 37 active identities, and lacks a clear current-status warning.
3. `data/precons/vox-mana-precons.source.json` contains time-sensitive and comparative claims without a proportionate source model. Those claims propagate to generated runtime data.
4. Done-ticket IDs are not uniformly unique. The operating system therefore has weaker referential integrity than its ticket syntax implies.
5. The default source/generated guardrail run validates JESKAI and MARDU, not all 37 identities, unless targets are explicitly supplied.

### Does the UI claim more certainty than the evidence supports?

Yes, in three places:

- Archscry confidence language can read as model certainty rather than authored score separation.
- Maze's percentage confidence describes parse recognition, but a first-time user can read it as confidence that the cards are strategically right.
- Precon and commander copy uses “best,” “strongest,” “most popular,” and recommendation-shaped ranking without current first-party or quantitative support.

### Source confidence table

| Area | Source files | Confidence | Reason | Risk |
|---|---|---:|---|---|
| Public product boundary | Home HTML/copy; product-definition docs; copy-boundary tests; VM-458/459/474/495 | High | Current copy is explicit and tested. | Implementation naming and ranked support contradict the absolute “not a recommendation engine” claim. |
| Active identity roster | `data/identity-layers.json`; `data/factions.json`; `data/placement-model.json`; placement tests | High | All current runtime artifacts and tests align at 37. | Older references and raw lifecycle claims can disagree. |
| Placement mechanics | `assets/js/quick-reading.js`; `assets/js/quick-reading-tests.js`; gate-bias reports | High | Deterministic functions, golden paths, and bias simulation are reproducible. | High mechanical confidence can be mistaken for validated player-fit confidence. |
| Placement validity as a taste model | Authored question/trait data; presentation outputs; no external study | Low | No repo evidence establishes construct validity, test-retest reliability, or user agreement. | False authority and overconfident score language. |
| Core color/guild/college identity claims | Per-identity raw claims, sources, anchors, approved profiles | Medium–High | Many bundles have official sources, local captures, claim IDs, and confidence fields. | Review depth varies; synthesis remains interpretive. |
| Four-color, WUBRG, and Colorless identity synthesis | Raw bundles; project ledgers; WUBRG/Colorless plans; registry | Medium | Structurally complete and explicitly governed, but more project-authored and unevenly sourced. | Users may mistake Vox Mana's taxonomy for canonical Magic nomenclature. |
| Dossier presentation | `assets/js/commander-dossier.js`; `assets/js/archscry-presentation.js`; dossier/presentation snapshots | Medium | Deterministic output and audit coverage exist. | 113 warnings, repeated templates, optional content gaps, and language bleed reduce trust. |
| Maze syntax and card retrieval | Semantic registry, compiler, parser tests, Scryfall API | High for compilation; Medium for usefulness | The compiled query is inspectable and heavily tested; Scryfall owns card truth. | Semantic intent can still be mistranslated; live API availability and data changes are external. |
| Commander browsing starts | Dossier data, enhanced commander-support JSONL, Scryfall art/results | Medium–Low | Some entries are verified; others are synthesized or explicitly missing secondary candidates. | Recommendation-shaped output may imply broader evaluation than the sources support. |
| Precon facts and fit claims | `vox-mana-precons.source.json`; generated catalog; build tests | Low–Medium | Catalog structure is deterministic, but prose depends heavily on third-party material and contains unsupported superlatives. | False popularity/strength authority, staleness, and boundary drift. |
| Strategium concepts | Strategium runtime data/copy; VM-416; official Commander sources | Medium–High | Core concepts and archetype structure are practical and reviewed. | Time-sensitive bracket terminology is not visibly date-stamped next to the content. |
| Lore | Raw source ledgers, official articles, community/archive links, Apocrypha | Medium–Low | Some identities have strong official anchors; coverage and public traceability are uneven. | Unsupported or synthesized lore can sound canonical because of the confident voice. |
| Apocrypha public source shelf | Apocrypha HTML/data and 49 observed outbound links | Medium–High | Organized, predominantly official, and visibly caveated by source type. | It proves a research posture more than it proves each runtime claim. |
| Local state | `assets/js/shared.js`; `research/research-init.js`; store tests; browser smoke | High | Keys, migrations, and core flows are explicit and tested. | Naming such as “Reading Finds” must continue to avoid deck-storage expectations. |
| Supabase profile/RLS state | client helpers, SQL, VM-422/446 | Low for live state | Code and policies exist, but credentials/live policy proof are absent in current evidence. | Any re-enabled account/deck-link UI could overstate privacy readiness. |
| Tickets, handoffs, and docs as decision history | board, cards, `HANDOFF_INDEX.md`, architecture docs | Medium | Extensive, dated, and usually linked. | Duplicate IDs, stale documents, and weak README routing undermine uniqueness/currentness. |

## 6. UX And Product Clarity Review

### First-time Home experience

**Evidence:** Home now answers the basic questions well. “Your colors have a shape” establishes the metaphor; the next sentence defines the product in plain language; “Not a deckbuilder” defines the boundary; route cards explain the four destinations. The live desktop and 375×812 checks showed no horizontal overflow, visible navigation, current metadata, and no console errors.

**Judgment:** A first-time visitor can understand what Vox Mana is and what to do. The remaining friction is priority: four equally branded destinations compete with what should probably be one primary action—take the Archscry reading.

### Archscry

**Evidence:** The route promise is clear: “Find the Commander identity that fits how you approach the table.” The result is useful in breadth: it explains the primary result, adjacent fits, play patterns, commanders, precons, cards, mana, and a Maze handoff. It does not put a login wall before the reading.

**Exact flow problem:** The first quick-reading prompt is “When the ground shifts, what do you trust first?” Options include “The claim no one can make for me,” “The threshold in the self,” “A braided witness,” “The common root,” and “The measure outside the map.” These are evocative but not reliable first-visit interaction copy. A user must interpret the author's metaphor before expressing a Commander preference.

**Judgment:** Archscry produces a potentially useful dossier, but asks an abstract question and then returns an oversized result. The core insight is buried among proof of comprehensiveness. “Placement” should be defined at first use as “the identity your answers matched most closely,” and the essential result should be readable in two minutes.

### Strategium

**Evidence:** “Color identity is only the beginning” and “how decks behave, pods communicate” are direct, useful framing. The route uses understandable cards and progressive disclosure. Current mobile/desktop captures are readable and visually coherent.

**Judgment:** Strategium educates without becoming an archive dump. It is the most conventional route, which is a strength. Its risk is expansion: 50 archetypes and future precon modules can turn it into a generic guide unless every article answers “what will help someone understand or act on a Vox Mana reading?”

### Maze

**Evidence:** The route explains its three modes: Plain Reading for human language, Operator's Hand for Scryfall syntax, and Loom for visual construction. A live plain-language query compiled transparently, returned results, and allowed a card to be set aside in Reading Finds. Browser smoke passes desktop and mobile.

**Judgment:** Maze feels connected when entered from a dossier or when Reading Finds preserves an exploration. It feels more bolted on when entered cold because it can operate as a broad MTG search client without any identity context. The UI should continue to show the current reading as the reason for a query, not merely as optional decoration.

### Apocrypha

**Evidence:** “Where Vox Mana shows its work” is excellent framing. Nine shelves, source-type groupings, and a predominance of Wizards links make it a usable library. Only one shelf is expanded by default, limiting overload.

**Judgment:** It feels like a curated source library, not an archive dump. Its weakness is distance from the claim: a visitor can see what Vox Mana read but cannot easily answer “which source supports the sentence in my Simic dossier?”

### Identity consistency

**Evidence:** Mono-color, guild, shard, wedge, college, four-color, WUBRG, and Colorless entries all exist in the 37-entry runtime registry and can be placed. Visual and content schemas are structurally shared.

**Judgment:** Structural consistency is stronger than semantic consistency. Familiar identities arrive with canonical names and richer shared cultural context. Four-color identities use Vox Mana-specific expression names; Colorless sits “outside the wheel”; colleges overlap guild color pairs but have separate philosophical expressions. These distinctions need an explicit taxonomy note in the UI. Without it, “identity,” “expression,” and “placement” can sound interchangeable.

### Terminology clarity

| Term | Current clarity | Recommended first-use definition |
|---|---|---|
| Compass | High | Keep; it signals direction rather than objective diagnosis. |
| Reading | High in context | “The result produced from your answers.” |
| Placement | Low–Medium | “The identity your answers matched most closely in Vox Mana's model.” |
| Dossier | Medium | Pair once with “your result guide.” |
| Identity | Medium–High | Distinguish Magic color identity from Vox Mana's taste expression. |
| Expression | Low | “A distinct way the same colors can behave or reason.” |
| Thesis | Low | Replace in UI with “core idea” unless the analytical tone is intentional. |
| Archetype | Medium for MTG players, Low for beginners | “A recurring deck plan, such as spellslinger, aristocrats, or go-wide tokens.” |
| Reading Finds | Medium–High | Keep, but add “cards set aside for later—not a decklist.” |

### Accessibility and mobile specifics

**Evidence:** No horizontal overflow was observed across the five primary routes at desktop or 375×812. Home Lighthouse scored 100 accessibility. Semantic navigation and reduced-motion handling are present. Archscry remains visually dense with small copy on mobile. Maze result cards contain a `role="button"` wrapper around a child button.

**Judgment:** The accessibility foundation is credible, but the score should not be generalized from Home to all interactive states. Maze needs semantic repair and a screen-reader/keyboard pass; Archscry needs cognitive and typographic accessibility work.

## 7. Narrative And Voice Snapshot

### Current voice

The voice is dark, ceremonial, reflective, and analytical. Its metaphor system uses scrying, maps, mazes, archives, placement, paths, motion, thresholds, and mana as shape. At its best, the voice makes a product assessment feel like a meaningful reading without claiming supernatural authority.

Distinctive copy worth preserving includes:

- “Vox Mana is a Commander identity and taste compass.”
- “Your colors have a shape.”
- “Not a deckbuilder.”
- “Where Vox Mana shows its work.”
- “Learn the Commander table.”
- “Reading Finds.”
- Colorless framing such as “Outside the wheel. Not above it,” when supported and clearly labeled as Vox Mana interpretation.

### Voice risks

**Too vague or mystical:** The first Archscry question and answer options require literary interpretation before product interaction. “A braided witness” and “The measure outside the map” do not tell a Commander player what table behavior they are choosing.

**Too AI-generated or templated:** `assets/js/archscry-presentation.js` and `assets/js/commander-dossier.js` repeat structures across snapshots: “The deciding difference was motion,” “Both paths recognized the same tension, but they solve it differently,” and “then tune the 99 so your best turns feel like your reading did.” Repetition is visible across all fixed presentation cases in `artifacts/presentation-snapshots/presentation-snapshots.md`.

**Too academic:** “Thesis,” “expression,” “placement domain,” “inhibitor traps,” and similar terms are valuable inside the product brain but not automatically clear in the UI.

**Too game-guide-like:** Precon superlatives, commander starts, mana tiers, and archetype inventories can sound like generic Commander advice. That voice competes with the more differentiated identity-reading voice.

**Too authoritative:** “Strongest,” “best,” and “most popular” are unsafe without dated, comparative evidence. A confidence score should state what was measured.

### Concise Vox Mana voice guide

| Use this | Avoid this | Example rewrite pattern |
|---|---|---|
| Plain action first, image second. | Metaphor as the only instruction. | “When the board changes suddenly, what do you protect first?” before any poetic elaboration. |
| “This reading suggests…” | “You are…” or categorical diagnosis. | “Your answers leaned toward patient information control” instead of “You are Dimir.” |
| Table behavior and recognizable choices. | Abstract nouns stacked together. | “Keep options open, trade resources, then choose the decisive turn” instead of “move inward into timing and leverage.” |
| Source-aware qualifiers. | Unsupported superlatives. | “A commonly discussed Vampire starting point in the current catalog” with a dated source, or omit the comparison. |
| One strong Vox Mana phrase per block. | Three mystical metaphors in one sentence. | Let “Your colors have a shape” carry the brand; make the next sentence operational. |
| Distinct identity-specific evidence. | Global templates with swapped nouns. | Cite the exact answer pattern and play tension that separated the top two placements. |
| Beginner translation beside specialist terms. | Assuming “placement,” “thesis,” or “archetype” is self-evident. | “Placement—your closest match in this model.” |

**Rewrite principle:** Start with the player's recognizable table decision, state the interpretation as a suggestion, then add one memorable metaphor. Never make the metaphor carry the evidence.

## 8. Current Readiness Assessment

Scores use this scale: **1 = not ready or not evidenced; 3 = functional with material gaps; 5 = proven, coherent, and release-ready for the stated scope.** Scores assess the current narrow product, not a hypothetical full MTG platform.

| Category | Score | Evidence | Why it matters | Highest-leverage fix |
|---|---:|---|---|---|
| First-visit clarity | 4/5 | Home defines the compass, says “Not a deckbuilder,” and explains all four routes. Live desktop/mobile checks were coherent. | A visitor must understand the job before the branded nouns have value. | Make Archscry the unmistakable primary first action and define “placement” on first use. |
| Product boundary clarity | 3/5 | Public copy is strong; VM-458/474/495 reinforce it. `buildPreconRecommendations()`, recommendation-shaped fields, and comparative precon copy contradict the absolute boundary. | Boundary drift is the fastest path to becoming an unfocused MTG utility. | Decide and document the allowed “browsing starts” contract, then rename/remove incompatible behavior and copy. |
| Visual polish | 4/5 | VM-495 current visual comparisons pass across Home, Archscry, Strategium, and Apocrypha; the product has a coherent dark-fantasy system. | Polish supports trust and portfolio value. | Make Home/Archscry radar signals visibly legible; reduce Archscry density rather than adding effects. |
| Accessibility | 3/5 | Semantic foundations, reduced motion, HTML lint, and Home Lighthouse 100. Maze has nested interactive semantics; no full screen-reader evidence exists. | The core flow is interactive, interpretive, and text-heavy; inaccessible controls invalidate the experience. | Repair Maze card semantics and run keyboard plus screen-reader checks on the full Archscry→Maze→return flow. |
| Mobile usability | 4/5 | Five primary routes fit 375×812 without horizontal overflow; mobile browser smoke passes. Archscry remains long and typographically dense. | Commander discovery often happens on phones while browsing or playing. | Establish a two-minute mobile dossier summary with expandable evidence. |
| Data integrity | 3/5 | 37 identity artifacts align; 155 precons build; deterministic tests pass. Colorless lifecycle evidence is stale and precon source prose contains weak claims. | Correct structure is not enough if current-state flags or factual claims disagree. | Reconcile lifecycle claims and add a validator for unsupported comparative language in canonical source data. |
| Source traceability | 3/5 | Strong per-identity claim/source/anchor bundles and public Apocrypha. Quality varies; public dossier claims do not link to exact anchors. | Source-first is a differentiator only when a reviewer can follow the chain. | Publish one claim→anchor→interpretation trace and use it as the minimum standard. |
| Identity consistency | 3/5 | All 37 identities are structurally present and testable. Terminology, research depth, historical docs, and special-identity handling remain uneven. | An identity compass loses trust if some results feel canonical and others feel improvised. | Publish a coverage/status rubric and repair the stale 15-identity guidance and Colorless lifecycle record. |
| Dossier usefulness | 3/5 | Broad, actionable panels and adjacent comparisons; 37 primary/76 adjacent outputs. Current audit has 113 warnings, repeated formulas, and optional content gaps. | The dossier is the payoff for the reading and the likely shareable artifact. | Cut a concise core result, disclose evidence/confidence, and move supporting material behind progressive disclosure. |
| Maze usefulness | 4/5 | Live parsing/results worked; 226 parser cases; transparent query inspector; Reading Finds and handoff pass browser smoke. | Maze converts reflection into action without becoming a deckbuilder. | Test repeat use and fix nested result-card interaction; do not expand Loom until evidence supports it. |
| Strategium usefulness | 4/5 | Clear educational framing, 50 archetypes, readable responsive cards, and scoped concept material. | It gives beginners the vocabulary required to use the rest of Vox Mana. | Tie each module to a dossier question or next action and date-stamp time-sensitive bracket guidance. |
| Apocrypha usefulness | 4/5 | Nine organized shelves and 49 observed links, mostly official Wizards sources. | Visible research discipline differentiates the project from opaque quizzes and generic AI copy. | Add dossier-level provenance examples and source dates/status, not merely more links. |
| Maintainability | 3/5 | Strong tests, contracts, tickets, and handoffs. Large JS monoliths, 1,800+ docs files, duplicate VM IDs, and broken README routing create drag. | Future changes will otherwise cost more review effort than their product value warrants. | Repair the repo entry point and split one high-change domain, starting with precon/dossier recommendation logic. |
| Deployment readiness | 4/5 | Current validation and Pages deployment for `307e794` are green; local browser smoke and Lighthouse pass; static hosting is appropriate. Hosted Browser Smoke Pilot has zero runs and visuals are local-only. | A public demo needs repeatable evidence, not only a developer-local success. | Dispatch and record the hosted browser workflow; document external-service degradation behavior. |
| Portfolio/demo readiness | 4/5 | Live product, coherent visual system, source governance, tests, and a public case-study strategy exist. No external reviewer result; README is poor; process bulk can obscure the story. | This is currently the most credible non-personal-project value path. | Build a five-minute guided demo and get three unaffiliated reviewers through it under VM-469. |
| Monetization readiness | 1/5 | No evidence of repeat users, audience acquisition, conversion, willingness to pay, or a uniquely paid problem. | Charging before proving repeated value would turn internal enthusiasm into a false market signal. | Run free onboarding and shareability experiments; do not add billing or account tiers. |

### Readiness conclusion

**Judgment:** Vox Mana is ready to show publicly as a clearly labeled beta/portfolio product. It is not ready to claim that its identity placements are validated, that its support content is uniformly sourced, or that it has a business. The technical release posture is ahead of the evidence for product-market value.

## 9. Open Loops And Unfinished Work

| Group | What is unfinished | Evidence | Severity | Suggested next action | Disposition |
|---|---|---|---:|---|---|
| Product positioning | “Not a recommendation engine” conflicts with ranked precon/commander support. | `buildPreconRecommendations()`, `commanderRecommendations`, “Good starting lane for,” source superlatives. | High | Write a one-page allowed/disallowed support contract and align UI/function names. | **Fix now** |
| Product positioning | The product has not decided whether optional profile sync is part of the promise. | “Save it with Google” copy, Supabase client, local-first core, deck links disabled. | Medium | Keep reading local-first; frame cloud profile as optional sync only after live policy proof. | **Defer** |
| UI/UX | Archscry's first question is too abstract for first-time visitors. | “When the ground shifts…” and metaphor-only options. | High | Rewrite around recognizable table decisions without changing scoring keys. | **Fix now** |
| UI/UX | Dossier hierarchy is too flat and long, especially on mobile. | Current rendered dossier, many panels, small copy, 113 warnings. | High | Define core summary versus supporting evidence; collapse secondary panels by default. | **Fix now** |
| UI/UX | Radar visuals are technically rendered but low-signal in accepted captures. | VM-495 Home/Archscry captures and current canvas checks. | Medium | Add contrast/content assertions and human baseline review criteria. | **Fix now** |
| Data/source integrity | Precon source includes unsupported strength/popularity superlatives. | Exact “strongest,” “best,” and “most popular” claims in source and generated catalog. | High | Quarantine, source/date, or remove comparative claims; validate future source data. | **Fix now** |
| Data/source integrity | Source-generated default coverage is only JESKAI and MARDU. | Fresh `validate:source-generated` output. | Medium | Add an explicit all-identity scheduled or release mode; keep focused PR mode if needed. | **Fix now** |
| Identity coverage | Colorless raw lifecycle claim contradicts current registry preview state. | `colorless.claims.json` false versus `identity-layers.json` true. | High | Add a superseding claim/changelog entry and stale-lifecycle check. | **Fix now** |
| Identity coverage | A 15-identity guidance document can be mistaken for current coverage. | `docs/reference/commander-faction-guidance.md`; runtime has 37. | Medium | Mark historical/incomplete or supersede with the registry-backed roster. | **Fix now** |
| Identity coverage | Four-color/WUBRG/Colorless source depth and canonical-status explanation are uneven. | Special-identity research plans and support-only limitations. | Medium | Add public taxonomy language: canonical color identity versus Vox Mana expression. | **Fix now** |
| Maze | Reading Finds has no evidence of repeat use. | Functional local store and browser smoke; no user study/analytics. | Medium | Test whether users return to or export finds within seven days. | **Defer expansion; test now** |
| Maze | Result-card wrapper and child action are nested interactive controls. | `research/research-init.js` around result wrapper role and “Set aside” button. | High | Make the title/image a link/button and keep Set Aside as a sibling action. | **Fix now** |
| Maze | Research chronology is stale at the top and hard to interpret. | 900-line `maze-plain-reading-deep-dive.md` contains early bugs later fixed by VM-472–490. | Low | Add a current-status preface and split/archive resolved phases. | **Defer** |
| Maze | Loom v1 has no demonstrated need. | VM-474 preserves v0 and a possible future explorer. | Medium | Do not build relationship visualization until user tests identify a concrete failure of current modes. | **Kill for now** |
| Archscry | Dossier audit warning volume is normalized rather than resolved. | 37 primary, 76 adjacent, 113 warnings, 0 failures, 0 passes. | High | Classify warnings into accepted, source gap, copy defect, and runtime blocker; establish a budget. | **Fix now** |
| Archscry | Presentation copy is formulaic. | Repeated “motion,” “same tension,” and “tune the 99” across fixed snapshots. | Medium | Add repetition/cadence assertions and rewrite the highest-frequency templates. | **Fix now** |
| Archscry | Confidence lacks a plain explanation. | Reading strength/confidence presentation versus authored ranking model. | Medium | Label confidence as score separation/answer consistency, not truth probability. | **Fix now** |
| Strategium | Nervous-precon onboarding strategy is not a live module. | VM-493 is strategy/documentation only. | Medium | Test one small “first precon conversation” module before building a curriculum. | **Defer pending user test** |
| Strategium | Official bracket/conversation material can stale. | VM-416 official source; current live route does not show adjacent source date. | Medium | Add source/date/status metadata and a scheduled review trigger. | **Fix now** |
| Apocrypha | Public source shelf is not claim-level provenance. | Route has 49 links but no direct dossier-claim trace. | Medium | Publish one worked provenance example and link it from a dossier evidence affordance. | **Fix now** |
| Technical debt | Large JS/CSS files concentrate risk. | 100–200 KB domain files and high-change dossier/search code. | Medium | Split by stable domain boundary, beginning with precon support or result-card rendering. | **Defer until after boundary decision** |
| Technical debt | README and current-authority navigation are broken/weak. | 94-byte README, generic repo name, nonexistent workflow link. | High for portfolio; Medium for runtime | Replace with a concise product/read/run/authority map. | **Fix now** |
| Technical debt | VM ID collisions are incompletely documented. | Duplicate done filenames for 044, 049, 165–168, 197–201. | Medium | Create a collision ledger and require uniqueness checks for new cards. | **Fix now** |
| Validation/testing | Hosted browser smoke has zero runs. | Current GitHub Actions view; manual workflow exists. | Medium | Dispatch on `main`, record result, and decide whether it becomes required or scheduled. | **Fix now** |
| Validation/testing | Visual checks are local and ignored. | VM-495 waiver ledger; non-CI baselines. | Medium | Store reviewable artifacts or produce CI summaries with controlled baselines. | **Defer until baseline policy is chosen** |
| Validation/testing | Lighthouse harness cleanup is noisy. | Fresh passing run ended with Edge `taskkill` access denied. | Low | Make process shutdown best-effort and report cleanup separately from audit status. | **Defer** |
| Deployment | Core is live, but external-service degradation is not prominently documented. | Scryfall, jsDelivr Supabase, and optional Google dependencies. | Medium | Document behavior and smoke the no-Supabase/no-Scryfall states. | **Fix before calling it production** |
| Monetization/audience | No external usefulness, repeat-use, or willingness-to-pay proof. | VM-469 blocked; no analytics/research evidence in repo. | Critical for business claims | Run small free tests; keep monetization out of product scope. | **Test now; defer monetization** |

## 10. Monetization And Audience Signals

The repo supports plausible audiences, not a proven market. “Fit” below means fit with the current product and evidence, not revenue potential.

| Audience | Fit | Why they would care | Why they might not | Proof needed | First offer or experiment |
|---|---:|---|---|---|---|
| Commander players | High | A reflective identity reading, adjacent fits, and browsing directions can make familiar colors feel newly legible. | Experienced players may see the taxonomy as decorative or prefer direct deck data. | Do results feel accurate, novel, and actionable to players with established decks? | Free reading plus a five-minute interview comparing the result with a favorite deck. |
| New Commander players | High | The compass and Strategium can reduce choice overload before they buy or build. | The first quiz is abstract and dossiers assume too much vocabulary. | Can a new player choose a precon/browsing direction with less anxiety after using it? | A guided “first Commander direction” session using Archscry + one Strategium module. |
| Returning Magic players | Medium–High | They know colors/cards but may not know modern Commander archetypes, precons, or social expectations. | Current bracket and product-family language can be time-sensitive or overwhelming. | Does Vox Mana shorten re-entry and improve a pod/precon decision? | A returning-player landing path with a before/after confidence question. |
| Deckbuilders who want taste direction | Medium | Dossiers and Maze can generate a search thesis before a decklist exists. | They may want stronger card synergies, legality, prices, and exports that Vox Mana intentionally avoids. | Do builders use the reading to form queries they would not have tried? | Share three dossier-derived Scryfall searches and observe whether one becomes a deck concept. |
| Content creators | Medium | Shareable identities, comparisons, and source-backed essays could produce discussion. | Current dossiers are long and not optimized as a social artifact; templated copy reduces uniqueness. | Do viewers share or debate a result for the right reasons? | Produce five concise result cards with a source/evidence link; measure shares and qualitative comments. |
| LGS communities | Medium | A noncompetitive conversation tool could help onboarding nights and precon selection. | Stores need fast facilitation, current product data, and no claims that create buyer regret. | Can staff use it in under ten minutes without explanation or liability-like recommendations? | One facilitated Commander night with printed/QR quick readings and staff feedback. |
| Patreon/supporter audience | Low–Medium | Deep dossiers, essays, source notes, and periodic identity content may appeal to a small niche. | There is no demonstrated publishing cadence or audience demand; charging for recommendations raises trust expectations. | Repeat readers, email/Discord demand, and willingness to support ongoing research. | A free monthly “identity field note”; invite voluntary support only after three consistent issues. |
| Portfolio/recruiting audience | High | The repo demonstrates product definition, narrative systems, front-end delivery, data governance, and release QA. | The README, docs volume, duplicate IDs, and lack of external outcome data can make it look process-heavy. | Can a reviewer understand the problem, decisions, and results in five minutes? | A curated case-study page and demo script, tested with hiring managers or senior peers. |
| QA/product consulting proof-of-work | High | Deterministic gates, source authority, release records, and explicit anti-drift decisions show real audit thinking. | A self-authored system can look self-referential without independent defect findings or outcomes. | External reviewer feedback and a concise before/after defect narrative. | Publish one case study: boundary risk found, evidence traced, fix specified, release verified. |
| AI-assisted project case study audience | High | Handoffs, tickets, source guards, human approval, and generated/artifact boundaries provide unusually rich process evidence. | The sheer artifact volume can look like AI process theater; repetitive generated copy is a visible counterexample. | Evidence that AI reduced cycle time without lowering source integrity or human judgment. | A transparent short report showing one successful workflow and one AI-generated failure caught by QA. |

### Monetization judgment

Do not force a paid product now. The credible immediate value is public proof-of-work and free Commander onboarding research. A supporter model could emerge around consistently useful, source-backed identity content, but accounts, billing, premium dossiers, and community features are premature until repeated voluntary use is observed.

## 11. Strategic Project Options

### Option 1 — Polish it as a product/QA portfolio flagship

- **Concept:** Treat Vox Mana as a public, narrow product plus an unusually transparent case study in product strategy, narrative systems, data governance, and release QA.
- **Why it fits:** This is the strongest evidence-backed value today.
- **Supporting evidence:** Live custom-domain product; current release checks; source ledgers; 490 done cards; 544 handoffs; `docs/portfolio/public-demo-case-study.md`.
- **Build required:** Repair README, create a five-minute demo, simplify the process story, add external reviewer quotes/results, and surface one evidence chain.
- **Main risk:** The process archive overwhelms the actual product and reads as self-generated bureaucracy.
- **Two-week test:** Give the demo and case study to five unaffiliated product/QA/engineering reviewers. Ask them to state the product problem, strongest decision, and demonstrated skill without coaching.
- **Kill condition:** Fewer than three can explain the product or identify credible professional signal after five minutes.

### Option 2 — Commander onboarding and precon-confidence tool

- **Concept:** Focus on new/returning players who need a direction and table vocabulary before choosing a precon or commander.
- **Why it fits:** Archscry, Strategium, and precon bridge content already form the journey.
- **Supporting evidence:** Home boundary; VM-493 nervous-precon strategy; 155 precons; Strategium's practical table education.
- **Build required:** Plain-language quiz rewrite, concise dossier, carefully sourced/de-superlativized precon browsing starts, and a “what to ask before buying” module.
- **Main risk:** It can become a buyer recommendation service without current prices, stock, legality, or rigorous comparative data.
- **Two-week test:** Facilitate ten new/returning players through a reading; measure pre/post confidence and whether they can name one suitable browsing direction and one table question.
- **Kill condition:** Most participants remain confused or choose based only on art/known characters, with no meaningful help from the reading.

### Option 3 — Before-you-browse Commander discovery companion

- **Concept:** Own the moment before EDHREC, Moxfield, Archidekt, or Scryfall: articulate taste, generate a search thesis, then send users outward.
- **Why it fits:** It respects the anti-deckbuilder boundary and makes Maze a support loop.
- **Supporting evidence:** Home “choose a direction before you build or browse”; dossier browsing starts; Archscry→Maze handoff; transparent compiled queries.
- **Build required:** Stronger outbound handoff language, concise query packs per dossier, source/confidence disclosure, and lightweight return-to-reading state.
- **Main risk:** External tools capture all repeat use; Vox Mana becomes a one-time quiz.
- **Two-week test:** Give 20 users a reading and three query starts; ask whether they find a commander/card direction faster than browsing cold and whether they return within seven days.
- **Kill condition:** No meaningful reduction in browsing uncertainty and negligible return behavior.

### Option 4 — Source-backed Commander identity field guide

- **Concept:** Make the dossiers and Apocrypha the product: a curated field guide to how color philosophies and expressions appear at Commander tables.
- **Why it fits:** Source governance and narrative interpretation are more differentiated than generic search.
- **Supporting evidence:** Per-identity raw bundles, Apocrypha, human-readable dossiers, special-identity research.
- **Build required:** Claim-level provenance, editorial review standards, clearer canonical-versus-Vox-Mana taxonomy, and a sustainable publishing cadence.
- **Main risk:** It drifts into a generic wiki or lore encyclopedia and inherits a large maintenance burden.
- **Two-week test:** Publish three tightly sourced identity essays with claim maps; measure completion, saves, and qualitative trust versus the quiz result alone.
- **Kill condition:** Readers do not value the sourcing/explanation or the work per article is unsustainable.

### Option 5 — Grounded Maze translator as a supporting utility

- **Concept:** Keep Plain Reading and Operator's Hand as a high-quality intent-to-Scryfall bridge, explicitly subordinate to identity exploration.
- **Why it fits:** The compiler and tests are technically mature.
- **Supporting evidence:** 226 parser cases, semantic grounding, transparent syntax, live successful search, Reading Finds.
- **Build required:** Accessibility repair, error/confidence semantics, tighter reading context, and a small set of dossier-derived query templates.
- **Main risk:** Search scope expands endlessly and competes with Scryfall rather than adding interpretation.
- **Two-week test:** Observe ten players translate five real discovery intents; compare successful query construction and time against Scryfall syntax help.
- **Kill condition:** Users prefer direct Scryfall or the compiler produces strategically misleading results often enough to erode trust.

### Option 6 — Shareable dossier without accounts

- **Concept:** Produce a concise, accessible result card or static export that explains the placement and links back to evidence, without cloud profiles.
- **Why it fits:** The dossier is the emotional payoff and social sharing could test organic value.
- **Supporting evidence:** Strong visual identity, deterministic result, current local-first flow, account deferral.
- **Build required:** A privacy-safe export/share format, concise result hierarchy, alt text, provenance summary, and no hidden user data.
- **Main risk:** It becomes personality-quiz novelty rather than a useful Commander direction.
- **Two-week test:** Hand-produce/export 20 result cards and measure whether recipients discuss the Commander implications, not only the label.
- **Kill condition:** Shares are low or conversations stop at “which color are you?” with no browsing/action value.

### Option 7 — Lightweight accounts later, only for cross-device continuity

- **Concept:** Add optional saved readings and external deck links after repeated use is proven; never store or edit decklists.
- **Why it fits:** Existing profile/Supabase traces and VM-422/446 provide a constrained path.
- **Supporting evidence:** Optional Google save copy, SQL/client code, explicit deck-link flag and RLS gate.
- **Build required:** Live RLS verification, privacy review, deletion/export controls, cross-device user demand, and a narrow data model.
- **Main risk:** Security/privacy work and account friction arrive before the core value is proven.
- **Two-week test:** Do not build accounts. Ask returning testers whether cross-device access is a top-three unmet need and offer a manual email/export substitute.
- **Kill condition:** Fewer than a meaningful minority return or request cross-device continuity.

### Recommended strategic choice

Choose **Option 1 as the near-term container**, test **Options 2 and 3 as the product hypothesis**, and keep **Option 5 as supporting infrastructure**. Options 4 and 6 are useful experiments. Option 7 remains gated. This sequence uses what is already differentiated while seeking evidence that Vox Mana helps actual Commander decisions.

## 12. Anti-Fit Directions

1. **Full deckbuilder:** Dangerous because it replaces the differentiated “direction before construction” job with commodity CRUD, legality, collection, price, import/export, and account complexity. It would also make the current data/source model insufficient overnight.
2. **Legality checker or rules authority:** Dangerous because Commander legality, Oracle text, bans, and rules change. Vox Mana already delegates card truth to Scryfall and lacks the operations model to make authoritative rulings.
3. **EDHREC clone or popularity recommender:** Dangerous because it requires broad, current usage data and ranking methodology. Current precon superlatives already show how quickly unsupported authority can enter the product.
4. **Generic MTG wiki:** Dangerous because Apocrypha's value is showing the evidence behind this model, not mirroring every piece of lore, product history, or rules text.
5. **AI-mysticism generator:** Dangerous because abstract quiz language and repeated presentation templates can make the result feel arbitrary. More generated prose would amplify the least trustworthy part of the experience.
6. **Accounts before repeat use:** Dangerous because identity, auth, privacy, deletion, RLS, and support burden would be added before users have shown they need continuity. VM-422/446 correctly resist this.
7. **Community features before moderation:** Dangerous because identity labels and Commander advice invite argument, harassment, spoilers, and unsupported claims. No moderation, trust, or community operations model exists.
8. **Lore expansion without confidence controls:** Dangerous because confident mystical prose can blur official canon, community interpretation, and Vox Mana synthesis. Public claim-level sourcing is not yet strong enough.
9. **Visual-effects escalation:** Dangerous because the site is already atmospheric. The current need is legible charts, hierarchy, and mobile reading—not more animation, texture, or canvas weight.
10. **Card search as the main product:** Dangerous because Scryfall is the authority and search breadth has no natural endpoint. Maze is valuable when it translates a reading into exploration; cold generic search is less differentiated.
11. **Premature Loom relationship explorer:** Dangerous because a graph-like card/deck system would introduce a new information architecture before Reading Finds has proven repeat use.
12. **Paid recommendations:** Dangerous because monetization would increase the implied authority of weak commander/precon comparisons. The evidence model is not ready for purchase-impact claims.

## 13. Comparison Hooks

Use these questions in competitor reviews, user tests, portfolio conversations, and collaborator evaluations:

1. Does this tool explain player taste better than existing deck and statistics sites?
2. Can a player name a more specific Commander direction after Vox Mana than before it?
3. Does Vox Mana help before EDHREC/Moxfield/Scryfall browsing, or merely delay that browsing?
4. Is “identity and taste compass” clearer and narrower than “MTG discovery tool”?
5. Does the dossier reveal why a result fits, or only decorate a score?
6. Do adjacent fits make the reading feel nuanced or indecisive?
7. Does a confidence label explain model separation, or imply objective truth?
8. Can a visitor distinguish canonical Magic color identity from a Vox Mana-authored expression?
9. Are Colorless, WUBRG, four-color identities, colleges, shards, wedges, guilds, and mono-colors equally understandable even when their source depth differs?
10. Does the source model make a claim more trustworthy than a generic personality quiz?
11. Can a user travel from one visible dossier sentence to the exact source and interpretation step behind it?
12. Are precon and commander “browsing starts” genuinely educational, or recommendations under a softer name?
13. Does Maze translate an intent more effectively than Scryfall's own syntax help?
14. Does showing the compiled query increase trust when the result is imperfect?
15. Does Reading Finds create repeat use or only one-session novelty?
16. Does Loom solve a real query-construction problem that Plain Reading and Operator's Hand do not?
17. Does Strategium teach exactly what is needed to understand a reading, or drift into generic Commander instruction?
18. Does Apocrypha feel like evidence, or like a large bibliography detached from product claims?
19. Is the dossier concise and distinctive enough to share?
20. Do users discuss table behavior after sharing, or only compare labels?
21. Can a first-time visitor complete the quick reading without translating mystical answer options?
22. Does the product remain useful when Supabase is unavailable and no user signs in?
23. Does the repo prove maintainable engineering, or does process volume obscure the design decisions?
24. Do tests prove user value, or only deterministic execution of authored rules?
25. Does the project demonstrate product thinking, QA thinking, narrative systems, and AI-assisted delivery without pretending those are market validation?
26. Is the audience narrow enough to reach: new/returning Commander players choosing a direction?
27. What existing behavior would users stop doing because Vox Mana is better?
28. What would make a user return one week later?
29. Which part would an LGS employee trust enough to use with a customer?
30. If the site disappeared, what uniquely useful capability would users miss?

## 14. Recommended Next 10 Tickets

These are recommendations only; no new cards were created as part of VM-496. IDs remain placeholders to avoid colliding with the current board.

### VM-XXX — Resolve the recommendation-boundary contract

- **Why it matters:** The most important product contradiction is in active code and data, not only wording.
- **Scope:** Define allowed educational browsing starts versus prohibited ranking/recommendation behavior. Audit `buildPreconRecommendations()`, `commanderRecommendations`, `landRecommendations`, labels, Home boundary copy, and product-definition docs. Make a narrow rename/copy/behavior patch after the decision.
- **Files likely touched:** `docs/product/vox-mana-product-definition.md`, `assets/js/commander-dossier.js`, `assets/js/index.js`, relevant tests and copy-boundary rules.
- **Acceptance criteria:** One explicit contract lists allowed/prohibited behaviors; public copy and internal names no longer contradict it; no deckbuilder, legality, or popularity promise is introduced.
- **Validation:** `npm.cmd run test:copy-boundaries`; `npm.cmd test`; manual Home→Archscry dossier review.
- **Risk if skipped:** Every new commander/precon feature will deepen an unresolved identity conflict.

### VM-XXX — Quarantine unsupported precon superlatives

- **Why it matters:** “Best,” “strongest,” and “most popular” create false authority and can affect purchase decisions.
- **Scope:** Inventory comparative/time-sensitive phrases in the canonical precon source; remove, qualify with dated evidence, or mark non-runtime. Add a deterministic validator that rejects unsupported comparative language in user-visible fields.
- **Files likely touched:** `data/precons/vox-mana-precons.source.json`, `research/build-precon-artifacts.mjs`, a new/extended validation script, generated catalog via the canonical build, precon tests.
- **Acceptance criteria:** Every comparative claim has a recorded source/date/method or is absent from runtime; source and generated counts remain 155; validator fails on a seeded unsupported example.
- **Validation:** `npm.cmd run build:precons`; precon artifact tests through `npm.cmd test`; targeted phrase scan; `git diff --check`.
- **Risk if skipped:** Source-first positioning is undermined by the content most likely to be interpreted as advice.

### VM-XXX — Reconcile Colorless lifecycle authority

- **Why it matters:** A raw claim says no Home preview while the canonical registry enables it.
- **Scope:** Add a superseding, sourced project-state claim/changelog entry for VM-389; preserve historical evidence; add a check that current lifecycle eligibility claims agree with `data/identity-layers.json`.
- **Files likely touched:** `data/raw-factions/colorless/colorless.claims.json`, `colorless.changelog.json`, identity lifecycle validation, relevant architecture/reference docs.
- **Acceptance criteria:** The old state remains historically legible but is explicitly superseded; current `placement_eligible` and `preview_eligible` values match the registry; no lore/rules facts are invented.
- **Validation:** `npm.cmd run validate:source-generated` with Colorless target; `npm.cmd run test:placement`; lifecycle check.
- **Risk if skipped:** Auditors cannot tell whether raw claims or runtime registry govern product state.

### VM-XXX — Rewrite the Archscry opening question in table language

- **Why it matters:** The first interaction currently tests comfort with metaphor as much as Commander preference.
- **Scope:** Rewrite the opening prompt and answer labels around recognizable decisions while preserving option IDs, trait effects, ordering, and placement logic. Add plain-language helper copy if needed.
- **Files likely touched:** quick-reading question data/source, Archscry copy snapshot tests, possibly `research.html` or related rendering data.
- **Acceptance criteria:** Five unaffiliated readers can paraphrase every option without product coaching; scoring output for all golden paths is unchanged; mystical tone remains secondary.
- **Validation:** `npm.cmd run test:placement`; presentation snapshots; manual 375 px review; VM-469 interview notes.
- **Risk if skipped:** First-time clarity fails at the exact moment the user commits to the core experience.

### VM-XXX — Reduce dossier template repetition

- **Why it matters:** Repeated “motion,” “same tension,” and “tune the 99” phrases make authored identities sound machine-filled.
- **Scope:** Count repeated sentence stems across all presentation snapshots; set a reasonable repetition budget; rewrite the highest-frequency generators using identity-specific evidence and shorter structures.
- **Files likely touched:** `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`, presentation snapshots/tests, dossier audit rules.
- **Acceptance criteria:** No global stem appears across most identities unless it is an intentional label; fixed cases remain deterministic; adjacent comparisons cite a real differentiating signal; tone remains recognizably Vox Mana.
- **Validation:** `npm.cmd run presentation:snapshots`; `npm.cmd run test:presentation-snapshots`; `npm.cmd run dossier:audit`; manual copy review across mono, guild, college, four-color, WUBRG, and Colorless cases.
- **Risk if skipped:** The most shareable artifact will continue to advertise its template more than its insight.

### VM-XXX — Make radar output visibly legible

- **Why it matters:** The brand promise is that colors have a shape, but accepted Home/Archscry captures show little readable signal.
- **Scope:** Establish minimum visible stroke/fill/label contrast, nonempty bounds, and screenshot criteria for Home and dossier charts. Fix styling/config only as needed; preserve reduced-motion behavior.
- **Files likely touched:** Home/Archscry chart configuration, relevant CSS, visual harness assertions, waiver ledger.
- **Acceptance criteria:** The plotted shape is immediately visible in desktop and 375 px captures; nontransparent-canvas and contrast/bounds assertions pass; no layout overflow; reduced-motion remains respected.
- **Validation:** visual compare/baseline process for Home and Archscry; `npm.cmd run test:lighthouse:home`; manual color/contrast review.
- **Risk if skipped:** A signature visual reads as broken and weakens trust despite technically passing tests.

### VM-XXX — Repair Maze result-card interaction semantics

- **Why it matters:** A `role="button"` result wrapper currently contains a real Set Aside button.
- **Scope:** Separate the open-details control from the Set Aside action using native interactive elements and a valid focus order. Preserve click, keyboard, card-detail, stash, and analytics-free behavior.
- **Files likely touched:** `research/research-init.js`, Maze CSS, frontend HTML/JS validators, browser smoke script.
- **Acceptance criteria:** No interactive element contains another interactive element; both actions have unique accessible names; Enter/Space behavior is predictable; mobile and desktop flows still pass.
- **Validation:** `npm.cmd run lint:html`; `npm.cmd run lint:js`; `npm.cmd run test:browser-smoke`; manual keyboard and screen-reader pass.
- **Risk if skipped:** Maze's core results remain confusing to assistive technology despite green static scores.

### VM-XXX — Publish one claim-to-source walkthrough

- **Why it matters:** Apocrypha proves that sources exist, but not how they constrain a visible dossier sentence.
- **Scope:** Select one well-sourced identity claim; expose the claim ID, official source, anchor/excerpt boundary, Vox Mana interpretation, confidence, and generated UI location. Link it from Apocrypha and the relevant dossier evidence affordance.
- **Files likely touched:** one raw faction bundle, Apocrypha route/data, dossier evidence UI, source-link tests/docs.
- **Acceptance criteria:** A public reviewer can move from a visible claim to its exact source and distinguish quotation, paraphrase, and Vox Mana synthesis; no new factual claim is introduced.
- **Validation:** source-link check; route metadata/copy checks; manual broken-link and accessibility review.
- **Risk if skipped:** “Where Vox Mana shows its work” remains a credible slogan but an incomplete proof.

### VM-XXX — Repair the repository entry point and authority map

- **Why it matters:** The live product is clearer than its public repository.
- **Scope:** Replace the 94-byte README with product boundary, live URL, local-run/test commands, current-authority links, generated-file warning, and contribution/audit path. Correct the workflow link. Add a documented ticket-ID collision ledger and a uniqueness check for new cards.
- **Files likely touched:** `README.md`, `docs/project-atlas.md`, `docs/kanban/board.md`, a small validation script, collision ledger/reference.
- **Acceptance criteria:** A new reviewer can find runtime entry points, source authority, current board, tests, and handoffs in under two minutes; all known duplicate IDs are documented; new collisions fail validation.
- **Validation:** link check; collision scan; `npm.cmd run lint:html` if public links change; manual cold-repo review.
- **Risk if skipped:** Portfolio and contributor impressions will continue to be worse than the product's actual maturity.

### VM-XXX — Execute the external reviewer readiness test

- **Why it matters:** The largest missing evidence is human usefulness, not another internal validator.
- **Scope:** Operationalize VM-469 with at least three unaffiliated reviewers spanning new/returning and experienced Commander users. Test Home comprehension, Archscry completion, dossier interpretation, Maze handoff, boundary understanding, and share intent. Record failures without coaching.
- **Files likely touched:** VM-469 card/plan, research script or interview guide, findings audit, follow-up tickets; runtime only if a separately approved fix is made.
- **Acceptance criteria:** Each reviewer can state what Vox Mana is and is not; task success and confusion points are recorded; no leading questions; findings distinguish severity and audience; a go/iterate/stop decision is made.
- **Validation:** Manual session evidence, anonymized notes, completion metrics, and a handoff. Also dispatch the existing hosted Browser Smoke Pilot once before sessions and record its result.
- **Risk if skipped:** The project will continue optimizing internal consistency without knowing whether the compass helps people.

## 15. Executive Summary

Vox Mana is best at turning a vague Commander preference into a coherent, source-conscious identity narrative and an inspectable path toward further exploration. The current Home page, deterministic placement flow, dossier architecture, grounded Maze compiler, Strategium, Apocrypha, and release checks form a real product rather than a mockup.

Its most fragile area is authority. The placement model is mechanically proven but not externally validated; dossier output has 113 warnings; precon content carries unsupported comparative language; and raw/current lifecycle evidence can disagree. The project knows it should not overclaim, but parts of the data and UI still do.

Its most differentiated asset is not card search. It is the combination of an identity/taste compass, human-readable dossier, adjacent-fit explanation, and visible source/governance model. Maze matters because it lets that interpretation become action.

The project is probably overbuilt in process volume, dossier breadth, historical documentation, and recommendation-shaped support material. It is underbuilt in external user evidence, concise result hierarchy, claim-level public traceability, and repo onboarding.

Cut or defer accounts, deck storage, community, Loom v1, broad lore expansion, and monetization. Fix the recommendation-boundary contradiction, unsupported precon claims, abstract opening question, Colorless lifecycle record, dossier repetition/hierarchy, Maze semantics, and README authority map.

It is ready to show publicly as a beta and as portfolio/QA proof-of-work. It is not ready to monetize, claim validated identity accuracy, or act as a purchase/recommendation authority.

**Best current use:** A public Commander identity/onboarding companion and a product/QA/narrative-systems portfolio case study.  
**Most important fix:** Align the “not a recommendation engine” boundary with the ranked precon/commander behavior and remove unsupported comparative claims.  
**Most differentiated asset:** The source-conscious placement-to-dossier-to-Maze journey, especially adjacent-fit explanation.  
**Biggest risk:** Mistaking deterministic internal validation and documentation volume for user validation and factual authority.  
**Recommended next phase:** Two weeks of boundary cleanup, concise dossier/quiz fixes, and unaffiliated user testing under VM-469—without new platform scope.  
**Guiding sentence:** Prove that Vox Mana helps a Commander player choose a clearer direction before adding anything that stores, ranks, builds, or socializes decks.
