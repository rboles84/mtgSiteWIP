# Vox Mana Self-Snapshot

Generated: 2026-06-29 23:32 America/Denver workspace time
Agent: Codex
Related card: VM-429
Scope: Evidence-first product, technical, source, UX, narrative, readiness, audience, and strategy snapshot.

## Evidence Boundary

This snapshot uses repository evidence only: route HTML/CSS/JS, data files, source packets, architecture docs, handoffs, Kanban cards, validation notes, and existing audit artifacts. It does not assume market traction, user research, monetization readiness, MTG correctness, or live backend security where the repo does not prove it.

Evidence-backed observations are labeled as evidence. Reasonable inference is labeled as inference. Weak or stale evidence is called out directly.

## Pre-Flight Summary

Recent related work includes:

- VM-424: Home first-visit positioning clarified Vox Mana as a Commander identity and taste compass with explicit not-a-deckbuilder language.
- VM-426: Maze Reading Finds reframed local card capture away from deckbuilding and reflected finds back into Archscry dossiers.
- VM-422: Account deck links were scope-corrected to private saved links, with public ledger/community features deferred and live Supabase RLS still pending.
- VM-427: A release sweep validated placement and bias tests, recorded stale visual baselines, and noted the Home Lighthouse waiver state.
- VM-428: A deep audit documented AI-feel, build quality, security, QA, production-readiness, and monetization risk.

Known risks from the handoff trail:

- Supabase profile RLS cannot be fully audited because the canonical profile SQL artifact is missing.
- VM-422 live RLS proof is pending credentials and live schema execution.
- Visual baselines are stale across Home, Archscry, Strategium, and Apocrypha.
- Home Lighthouse remains under the preferred performance/accessibility gate in the latest sweep.
- `.github/workflows/` is empty, so local validation is not enforced by CI.
- Several docs still refer to 30 or 36 identities even though runtime JSON/tests show 37.
- Privacy/Terms still describe older 10-guild plus 5-college behavior.

Do not touch:

- Runtime code, generated data, visual baselines, Supabase SQL, MTG facts, lore claims, or existing VM-428 artifacts as part of this snapshot.

## 1. Project Identity

### What Vox Mana Currently Is

Evidence: `index.html` states that "Vox Mana is a Commander identity and taste compass" and that it helps users understand "colors, placement, play patterns, and what to look for when exploring commanders or decks elsewhere." The same Home first viewport says it is "Not a deckbuilder" and that it helps users choose a direction before building or browsing decklists somewhere else.

Evidence: Route ownership docs identify the live product surfaces as Home, Archscry, Maze, Apocrypha, Strategium, Library alias, Privacy, and Terms. Data and code show active placement, dossier generation, Scryfall-backed Maze search, Commander learning content, public reference ledgers, and local Reading Finds.

Evidence: `data/identity-layers.json`, `data/factions.json`, and `data/placement-model.json` currently align around 37 active placement identities: five mono-colors, ten guilds, five shards, five wedges, five four-color identities, five colleges, Colorless, and WUBRG.

Evidence: `docs/reference/data-contracts.md` and `docs/reference/source-generated-guardrails.md` make a strong distinction between source inputs, generated runtime surfaces, and comparison-only artifacts.

Inference: Vox Mana is trying to solve a "before the decklist" problem. It gives a player language for taste, pressure, risk appetite, table behavior, color philosophy, and search direction before that player goes to EDHREC, Moxfield, Archidekt, Scryfall, or a content guide.

### Apparent User

Evidence-backed likely users:

- Commander players who want to name their taste and table role.
- New or returning Commander players who need orientation without immediately entering deckbuilder complexity.
- Players who browse commanders or decklists elsewhere and need a filter for what to look for.
- A project reviewer who wants proof of product thinking, QA discipline, and AI-assisted delivery.

Reasonable inference:

- Vox Mana is less useful for a player who already knows a commander and wants a full 100-card list.
- Vox Mana is more useful for a player deciding what kind of Commander experience they want.

### What The Product Is Explicitly Not

Evidence:

- Home says it is not a deckbuilder.
- `docs/reference/data-contracts.md` says deck-link scope does not store decklists, card JSON, scraped deck content, legality results, hosted deck data, or normalized deck composition.
- VM-422 handoffs repeatedly defer public deck ledger, voting, moderation, and community functionality.
- Terms say readings/recommendations are exploration/planning aids, not guarantees of legality, performance, price, or availability.

Vox Mana is explicitly not:

- A deckbuilder.
- A legality checker.
- A price tracker.
- A card availability checker.
- An EDHREC clone.
- A generic Magic wiki.
- A hosted deck storage platform.
- A source of official Magic canon.
- A personality diagnosis engine.

### Does The Repo Communicate That Boundary?

Evidence-backed answer: Partly yes.

The Home page is clear. The data contracts are clear. VM-422 is clear. However, boundary language is uneven across older surfaces.

Weak or contradictory evidence:

- `privacy/index.html` and `terms/index.html` still describe the reading as "10 Ravnica guilds + 5 Strixhaven colleges" or equivalent older scope.
- `archscry/index.html` says Archscry produces "staple cards, land guidance, and Commander deck-start links," which can sound close to deckbuilding if not bounded carefully.
- `archscry/index.html` still says the reading "opens the guild or college that answers back," which is stale against 37 live identities.
- Terms still describe AI evaluating responses even though current quick reading evidence points to a deterministic adaptive model, with the old terminal hidden by `SCRYING_TERMINAL_ENABLED: false`.

### Does Implementation Match The Stated Identity?

Mostly, but not cleanly.

Evidence-backed match:

- Archscry produces identity/placement dossiers.
- Maze supports search and local Reading Finds rather than hosted deck storage.
- Strategium teaches Commander table behavior.
- Apocrypha exposes source posture.
- Data contracts and source guardrails prevent generated runtime data from becoming canonical truth.

Mismatch or drift risk:

- Deck-start links and precon/commander support material are useful but carry deckbuilder drift risk.
- Stale Terms/Privacy/architecture docs undermine the "evidence over vibes" claim.
- Maze can read as a standalone Scryfall helper unless the Archscry return loop is foregrounded.

### Positioning Statement

Vox Mana is a static, source-governed Commander identity compass: it turns a player's answers into an interpretive color and placement dossier, then points them toward search, table literacy, and source context without pretending to build, host, legalize, rank, or validate decks.

## 2. Product Philosophy

### Source-First Research

Pattern: Claims should flow from reviewed source packets, source ledgers, or source-backed research before appearing as runtime product truth.

Evidence:

- `docs/reference/source-generated-guardrails.md` defines source/generation boundaries and warns against treating generated outputs as evidence.
- `docs/reference/data-contracts.md` names raw faction files and approved research/source inputs as canonical.
- `data/raw-factions/**` packets contain claims, source IDs, confidence notes, support roles, and limitations.
- `apocrypha/index.html` frames Apocrypha as "Where Vox Mana shows its work."

Consistency: Strong in docs and data pipeline. Medium in user-facing UI because not every route surfaces claim confidence or recency.

Breakdown:

- Stale 30/36/37 identity documentation creates source-of-truth ambiguity.
- Some public copy makes broad interpretive statements without showing source confidence in the UI.
- Scryfall derived indexes are dated 2026-05-14/2026-05-15, so card search evidence has freshness risk.

### Identity And Taste Interpretation

Pattern: The product interprets player preferences into color identity, placement, pressure, risk appetite, and expression.

Evidence:

- Home names "identity and taste compass."
- `assets/js/adaptive-placement.js` includes adaptive state, answer application, faction ranking, next-question selection, finish logic, and result building.
- `docs/reference/data-contracts.md` states the placement model is interpretive taxonomy, not official canon or psychological diagnosis.
- Archscry dossier render code builds a structured result view from placement data.

Consistency: Strong in Archscry and Home. Medium elsewhere.

Breakdown:

- Terms/Privacy still describe older guild/college-only scope.
- The word "placement" is central but not always defined at first use for new visitors.

### Commander Education

Pattern: Vox Mana wants to teach Commander table behavior, not only color labels.

Evidence:

- Strategium H1: "Learn the Commander table."
- Strategium copy connects color identity to table behavior.
- `assets/js/strategium.js` includes archetype, threat-reading, heat-management, politics, stax, readiness, and persona content.

Consistency: Strong in Strategium. Good in Archscry dossier sections. Less present in Maze entry copy.

Breakdown:

- Strategium may be dense for a first-time Commander player.
- The bridge from an Archscry placement to the exact Strategium lesson path could be clearer.

### QA-Style Validation And Layered Governance

Pattern: The repo treats product work as gated by tickets, handoffs, tests, data contracts, and release notes.

Evidence:

- `docs/kanban/board.md` has active VM ticket workflow.
- `docs/handoffs/HANDOFF_INDEX.md` tracks major agent work.
- VM-427 ran placement, bias, gate compression, Lighthouse, visual, and security-related checks.
- `docs/reference/manual-test-cases.md` documents route and accessibility checks.

Consistency: Strong as a process. Stronger than most personal static sites.

Breakdown:

- `.github/workflows/` is empty, so governance is local and manual rather than enforced.
- Visual baselines are stale and intentionally not refreshed in several handoffs.
- Live RLS verification remains pending.

### Local-First And Progressive Enhancement

Pattern: Keep the site static, lightweight, and usable without accounts where possible.

Evidence:

- Static HTML/CSS/JS route structure.
- `.nojekyll` and `CNAME` indicate GitHub Pages suitability.
- Maze Reading Finds use local storage.
- Library route has redirect/fallback behavior.
- Reduced-motion preference persists locally.

Consistency: Strong for Home/Archscry/Maze/Strategium/Apocrypha.

Breakdown:

- Supabase account traces are present and useful but not fully production-proven.
- Browser caches and localStorage migrations add state complexity that needs more E2E coverage.

### Human Approval And Stop Conditions

Pattern: The repo often records what was not done and why.

Evidence:

- VM-422 stops before public community ledger scope.
- VM-427 carries forward visual/Lighthouse waivers rather than quietly refreshing baselines.
- VM-428 explicitly states missing proof areas.

Consistency: Strong in handoffs.

Breakdown:

- Some stale docs remain alongside newer decisions, making it harder to tell which decision supersedes which.

### Dossier-Style Explanation

Pattern: The product packages identity as a readable dossier rather than as a raw score or quiz result.

Evidence:

- Archscry route copy promises a polished dossier.
- `assets/js/commander-dossier.js` is a large route-support file.
- Identity raw packets include narrative, strengths, tensions, and support material.

Consistency: Strong in Archscry.

Breakdown:

- The dossier may risk sounding authoritative unless confidence/boundary language stays close to the output.
- The copy can become ornate enough that practical meaning has to be hunted.

### Avoidance Of Overclaiming

Pattern: The repo repeatedly says interpretive, not official; planning aid, not guarantee.

Evidence:

- Data contracts reject official-canon framing for placement.
- Terms disclaim legality, performance, and availability guarantees.
- Apocrypha distinguishes official sources, community/wiki sources, and video cross-check aids.

Consistency: Strong in docs, medium in UI.

Breakdown:

- The UI does not consistently display confidence and limitation language at the moment a user reads an identity claim.
- Older Terms AI wording overstates or misstates the current route behavior.

## 3. Active Product Themes

### Commander Identity Compass

Current state: Active and central.

Evidence: Home H1/support copy, Archscry reading flow, adaptive placement model, identity data.

Product value: Gives the site a clear "before deckbuilding" job.

Risk: If downstream pages emphasize deck-start output too much, the compass becomes a weak deckbuilder.

Next useful decision: Make "identity compass, not deckbuilder" a consistent route-level boundary, not only Home hero copy.

### Color Identity Placement Model

Current state: Runtime appears to support 37 identities.

Evidence: JSON counts show 37 active identity expressions, 37 preview-eligible records, 37 placement-model factions, and 37 generated faction records. VM-427 tests passed 37 golden paths.

Product value: Broad coverage beyond guilds makes the system feel complete for Commander color identity.

Risk: Architecture docs still state 30 or 36 in several places, which weakens auditability.

Next useful decision: Declare one canonical current identity count and update all living docs/copy.

### Archscry Dossier Generation

Current state: Core flagship surface.

Evidence: `archscry/index.html`, `assets/js/index.js`, `assets/js/adaptive-placement.js`, `assets/js/commander-dossier.js`, Maze handoff key, reading finds reflection.

Product value: Converts abstract identity into a shareable, human-readable result.

Risk: Dense output, stale guild/college copy, and deck-start language can blur product boundaries.

Next useful decision: Run a boundary and clarity pass on the first dossier result screen.

### Maze Card Exploration And Reading Finds

Current state: Active support loop tied to Scryfall and local Reading Finds.

Evidence: Maze modes include Plain Reading, Operator's Hand, and Loom. `research/maze-query-core.js` resolves query requests. `research/research-init.js` handles search, modals, Reading Finds, exports, and return to dossier.

Product value: Lets users explore cards through the lens of an identity reading without becoming a deckbuilder.

Risk: If entered cold, Maze can look like a generic Scryfall UI. Reading Finds repeated-use value is unproved.

Next useful decision: Validate whether users naturally understand "finds" as identity support, not deck construction.

### Strategium Educational Content

Current state: Strong Commander literacy surface.

Evidence: Strategium tabs cover Command Zone, Pod Readiness, Archetype Signal, Threat Reading, Heat Management, and Beyond WUBRG. Content includes politics and stax handling.

Product value: Turns identity into table behavior and helps new/returning players reason about games.

Risk: Density and terminology can overwhelm first-time users.

Next useful decision: Add a guided "from my Archscry result, what should I read first?" path.

### Apocrypha Source Library

Current state: Public reference route with grouped source types.

Evidence: Apocrypha copy says "Where Vox Mana shows its work." Source groups include official Wizards/MaRo, official lore, story archives, wiki/community, and video lore.

Product value: Differentiates Vox Mana from vibe-only identity tools by exposing provenance.

Risk: It may feel like an archive dump unless source groups map clearly to product claims.

Next useful decision: Add claim-to-source examples for one identity and one product surface.

### Home First-Visit Clarity

Current state: Recently improved.

Evidence: Home directly says what Vox Mana is, says not a deckbuilder, and provides route job cards.

Product value: Makes a first visitor less likely to misclassify the site.

Risk: Downstream route copy does not fully match the same crisp boundary.

Next useful decision: Propagate Home's plain-language framing to Archscry, Maze, Strategium, Apocrypha, Privacy, and Terms.

### WUBRG, Colorless, Four-Color, And Full-Spectrum Support

Current state: Runtime support appears active.

Evidence: `data/identity-layers.json`, raw faction folders, placement model, and generated faction counts include Colorless, WUBRG, and five four-color records.

Product value: Full coverage matters for Commander identity and avoids guild-only shallowness.

Risk: Stale docs still say Colorless preview is disabled or identity count is 30/36.

Next useful decision: Finish docs cleanup and add one validation note proving each special identity appears in Home, Archscry, and dossier outputs.

### Radar And Trait Visualization

Current state: Active, recently iterated through VM-407 to VM-412.

Evidence: Radar-related handoffs, `assets/js/graph.js`, shared radar docs, and Home/Archscry visual notes.

Product value: Makes identity legible at a glance.

Risk: Visual polish is tied to stale baselines and manual QA.

Next useful decision: Refresh or formally accept visual baselines after one cross-route visual review.

### Precon And Commander Bridge Material

Current state: Present as support material, not a full recommendation engine.

Evidence: `data/precons/vox-mana-precons.source.json` and generated catalog have 155 records. Dossier and deck-link copy refer to starter cards, land guidance, precons, or deck-start links.

Product value: Helps users leave the compass with practical next steps.

Risk: This is the easiest place for accidental deckbuilder/recommendation-engine drift.

Next useful decision: Define "support material" copy rules: examples and search directions are allowed; ranked deck prescriptions are not.

### Source Governance And Research Ledgers

Current state: Strong and central.

Evidence: source guardrails, data contracts, Apocrypha, raw packets, research ledgers, VM ticket handoffs.

Product value: Builds trust and supports future review.

Risk: Too many docs can create stale authority unless superseded docs are marked clearly.

Next useful decision: Add an "active vs historical docs" marker policy for architecture/source docs.

### VM Ticket Workflow And Codex Operating System

Current state: Mature and active.

Evidence: Kanban board, handoff index, done cards, implementation packets, audit docs.

Product value: The repo itself becomes a product/QA proof-of-work artifact.

Risk: Process overhead can exceed product clarity if visitors cannot tell what the site does.

Next useful decision: Keep VM workflow internal but extract a concise public case-study narrative.

## 4. Technical Strengths And Patterns

### Repo Structure

Strength: The route structure is understandable: root Home plus route folders for Archscry, Maze, Apocrypha, Strategium, Library, Privacy, and Terms.

Why it matters: A static route map fits GitHub Pages and lowers deployment complexity.

Weakness: Several architecture docs lag behind runtime state.

Product risk: A reviewer cannot tell which count or boundary is current without running validation.

### HTML/CSS/JS Architecture

Strength: The app is mostly static HTML/CSS/JS with shared CSS/JS and route-local code. This supports simple hosting and direct inspection.

Evidence: route HTML files, `assets/css/shared.css`, route CSS files, route JS files, and research scripts.

Weakness: Several files are very large: `assets/js/index.js`, `assets/js/commander-dossier.js`, `assets/js/graph.js`, `research/research-init.js`, and `research/build-faction-artifacts.mjs`.

Product risk: Large route files raise regression risk and make targeted review harder.

### Data Generation Model

Strength: The repo has an explicit source/generated separation.

Evidence: `docs/reference/source-generated-guardrails.md` says generated/runtime surfaces are comparison targets only, not canonical source inputs. `docs/reference/data-contracts.md` names canonical source layers.

Why it matters: This is the backbone of "evidence over vibes."

Weakness: Some stale docs still describe older generated-state counts.

Product risk: Source authority becomes harder to defend when docs disagree.

### Chart And Radar Implementation

Strength: Radar visuals appear to have a shared authority path and route-specific visual tuning.

Evidence: VM-407 through VM-412 handoffs, `assets/js/graph.js`, Home and Archscry integration.

Why it matters: Trait visualization can make identity more legible than prose alone.

Weakness: Visual baseline drift remains unresolved.

Product risk: A visually central feature may regress without the repo catching it automatically.

### Search And Maze Behavior

Strength: Maze separates intent parsing, visual query building, Scryfall syntax, search execution, modal viewing, and local Reading Finds.

Evidence: `research/maze-query-core.js`, `research/scryfall-parser.js`, `research/research-builder.js`, `research/research-init.js`, `research/maze-scratchpad-store.js`.

Why it matters: Maze can support exploration without owning deckbuilding.

Weakness: Scryfall derived indexes are dated mid-May 2026 and may be stale against current card data.

Product risk: Search support can make out-of-date card or tag behavior visible.

### Accessibility Patterns

Strength: The repo uses semantic regions, labelled navigation, tablists, progress bars, aria-live regions, dialogs, reduced-motion controls, and manual accessibility checklists.

Evidence: route markup, shared topbar, `docs/reference/manual-test-cases.md`.

Why it matters: Accessibility is part of the stated lightweight, semantic implementation value.

Weakness: Current proof is mostly local/manual; no active CI accessibility gate was found.

Product risk: Accessibility regressions can pass unnoticed.

### Progressive Enhancement

Strength: The product works as a static site and keeps several features local-first.

Evidence: localStorage keys for motion preference, Maze handoff, Reading Finds, legacy migrations, Scryfall caches; no-JS/fallback patterns on route redirects.

Why it matters: The project can deliver value before login, backend, or account features.

Weakness: LocalStorage migrations and cross-route handoff state need browser E2E verification.

Product risk: A broken handoff loop would make Archscry/Maze feel disconnected.

### Validation Scripts

Strength: The repo has focused tests for placement, bias, gate compression, route smoke, deck links, parser behavior, and visual checks.

Evidence: VM-427 handoff; `npm run test:placement`, `npm run test:bias:all`, `npm run test:gate-compression`, `npm run test:parser`, visual scripts.

Why it matters: Deterministic validation supports product trust.

Weakness: GitHub Actions workflows are absent.

Product risk: Validation depends on local discipline.

### Build And Deploy Assumptions

Strength: GitHub Pages deployment is plausible and intentionally supported.

Evidence: `.nojekyll`, `CNAME`, static route structure, no bundler requirement.

Weakness: Route metadata is thin. Search found route titles but not consistent meta descriptions, canonical links, or social metadata.

Product risk: Public sharing and portfolio review will undersell the project.

### Data And Source Separation

Strength: Strongly documented and repeatedly enforced.

Weakness: Historical docs and generated docs sit near current docs.

Product risk: A future agent can accidentally use stale docs as runtime truth.

### Supabase And Future Backend Traces

Strength: Backend scope appears deliberately narrow: profiles, account auth, private deck links, and a hidden archived terminal.

Evidence: `assets/js/shared.js`, `assets/js/deck-link-service.js`, `docs/supabase-vm422-deck-links.sql`, `assets/js/site-flags.js`, archived `supabase/functions/guild-recruiter/index.ts`.

Weakness: Live RLS proof and profile SQL source are incomplete.

Product risk: Account-facing features cannot be called production-ready yet.

## 5. Data, Evidence, And Source-Of-Truth Model

### Apparent Sources Of Truth

- `data/raw-factions/**`: canonical faction-level claims, sources, profile, and placement support.
- `data/identity-layers.json`: current identity registry, route eligibility, and Home/preview participation.
- `data/precons/vox-mana-precons.source.json`: canonical precon source input.
- `data/taxonomy/vox-mana-tags.json`: taxonomy/tag source layer for search/index behavior.
- `docs/reference/data-contracts.md`: active data contract, though with one stale 36-count section.
- `docs/reference/source-generated-guardrails.md`: active source/generated governance.
- `docs/supabase-vm422-deck-links.sql`: canonical local artifact for VM-422 deck-link SQL/RLS.
- Route HTML and JS: runtime truth for visible product behavior.

### Apparent Generated Files

- `data/factions.json`.
- `data/placement-model.json`.
- `data/placement-model.schema.json`.
- `data/precons/vox-mana-precon-catalog.json`.
- Scryfall derived indexes under `data/scryfall/indexes/`.
- `supabase/functions/guild-recruiter/faction-context.ts`.

### Docs That Should Not Be Treated As Runtime Truth

- Historical handoffs and done cards unless they explicitly describe current state.
- Older architecture snapshots with 30-expression counts.
- The older Colorless gate doc sections that say Colorless preview is disabled.
- Any doc that has not been reconciled after VM-389 and the 37-identity runtime state.

### Layer 1 And Layer 2 Boundaries

Evidence: Source guardrails and data contracts make source/generated boundaries clear in principle. Raw packets and generated runtime files are separated.

Weakness: The phrase "Layer 1" and "Layer 2" is less clear to a new reviewer than the underlying source/generated rules. Several older docs mention old layer counts.

Verdict: Clear for maintainers who read the guardrails. Not clear enough for a cold reviewer.

### Traceability And Auditability

Source claims are generally traceable in raw faction packets and Apocrypha. Identity placements are auditable through placement JSON, raw packets, and deterministic tests. Card and search behavior is partly backed by Scryfall-derived data, but freshness is a known risk. Commander/precon claims are partially backed by source rows, but any language that sounds ranked, definitive, or current needs stronger proof.

### Source Confidence Table

| Area | Source files | Confidence | Reason | Risk |
|---|---|---:|---|---|
| Home product boundary | `index.html`, VM-424 handoff | High | Home directly states compass and not-deckbuilder boundary. | Boundary is less consistent downstream. |
| Active identity count | `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, VM-427 tests | High runtime, Medium docs | Runtime/tests show 37 identities. | Architecture docs still say 30 or 36. |
| Faction claims | `data/raw-factions/**` | Medium-High | Packets include sources, claims, confidence, and limitations. | UI may not expose confidence at claim moment. |
| Placement model | `data/placement-model.json`, `assets/js/adaptive-placement.js`, data contracts | High for mechanics, Medium for interpretation | Deterministic engine and tests exist; model is interpretive by design. | Users may read placement as diagnostic truth. |
| Colorless support | `data/raw-factions/colorless/**`, identity JSON | Medium | Runtime support appears active. | Older docs say preview disabled or 36-count scope. |
| WUBRG support | `data/raw-factions/wubrg/**`, identity JSON | Medium-High | Source packet includes official-source support and limitations. | Support-only commander guidance can overclaim if phrased as recommendation. |
| Precon support | `data/precons/vox-mana-precons.source.json`, generated catalog | Medium | 155 source rows and generated parity exist. | External currentness and recommendation quality are not fully proved. |
| Scryfall search/indexes | `data/scryfall/indexes/**`, Maze parser/core | Medium | Derived indexes and query code exist. | Bulk/index data is dated 2026-05-14/15 and can go stale. |
| Maze Reading Finds | `research/research-init.js`, `research/maze-scratchpad-store.js`, VM-426 | Medium-High | Local capture and return loop exist. | Repeated-use value and browser return-loop QA remain under-proved. |
| Strategium content | `strategium/index.html`, `assets/js/strategium.js`, VM-416 | Medium-High | Specific Commander education modules exist. | Density and source mapping vary by topic. |
| Apocrypha source library | `apocrypha/index.html`, source ledgers | Medium | Public source groups and role labels exist. | Can feel like an archive if not tied to claims. |
| Private deck links | `assets/js/deck-links.js`, `assets/js/deck-link-service.js`, `docs/supabase-vm422-deck-links.sql` | Medium | Local tests and SQL artifact are strong. | Live Supabase RLS proof is pending. |
| Profiles/account support | `assets/js/shared.js`, Supabase docs | Low-Medium | Client traces exist. | Missing canonical profile SQL/RLS proof. |
| Monetization/audience | Handoffs, current product surfaces | Low | Repo shows product potential but no user/payment evidence. | Monetization claims would be speculative. |

## 6. UX And Product Clarity Review

### Home

Evidence-backed assessment: Home currently explains what Vox Mana is and what to do first.

Strong copy:

- "Vox Mana is a Commander identity and taste compass."
- "Not a deckbuilder: Vox Mana helps you choose a direction before you build or browse decklists somewhere else."
- "What can you do here?"
- Route CTAs: Start with Archscry, Search the Maze, Learn Commander, Open Apocrypha.

Issue: Home is clearer than the rest of the product. That is good for first visit, but it also exposes stale downstream copy.

### Archscry

Evidence-backed assessment: Archscry appears useful and central.

Strength: It promises a reading, placement, and dossier rather than a generic quiz.

Issues:

- "opens the guild or college that answers back" is stale against 37 identities.
- "staple cards, land guidance, and Commander deck-start links" is useful, but it sounds deckbuilder-adjacent. It needs a nearby boundary sentence.
- Terms/Privacy describe old 10+5 scope, which can make Archscry feel less trustworthy.

### Strategium

Evidence-backed assessment: Strategium educates without becoming generic rules content.

Strength: "Learn the Commander table" is clear and differentiated. Tabs are about table behavior, threat reading, archetype signal, and heat management.

Issue: It may be too dense for first-time visitors unless routed from an Archscry result or a novice entry path.

### Maze

Evidence-backed assessment: Maze is connected to the core product through Reading Finds and the dossier return path.

Strength: "Search Magic by instinct, syntax, or shape" is distinctive, and mode names communicate multiple search styles.

Issues:

- Cold entry can read as a Scryfall wrapper.
- "Plain Reading," "Operator's Hand," and "Loom" have flavor, but users may need one plain phrase near each mode.
- The value is strongest when entered from Archscry; that relationship should be more visible.

### Apocrypha

Evidence-backed assessment: Apocrypha is useful as a public source library, but it risks archive-dump feeling.

Strength: "Where Vox Mana shows its work" is excellent product copy because it is mystical enough for the brand and plain enough for trust.

Issues:

- Source groups are visible, but claim-to-source mapping is not always obvious.
- Video and wiki/community groups are correctly caveated, but their small counts may make the shelf feel uneven.

### Identity Coverage Consistency

Evidence-backed assessment: Runtime identity coverage appears consistent at 37. Copy and docs are not consistent.

Problem examples:

- Privacy/Terms still say 10 guilds plus 5 colleges.
- Some architecture docs say 30 expressions.
- One data contract section says 36.
- Colorless decision docs say preview disabled, while runtime data says preview eligible.

### Terminology

Terms that are useful but need clearer first-use support:

- placement
- dossier
- compass
- thesis
- expression
- archetype
- reading
- source support

Recommended direction: On each route, pair the branded term with one plain job sentence. Example: "Placement is Vox Mana's map of how your answers express color identity at the Commander table."

## 7. Narrative And Voice Snapshot

### Tone

Evidence-backed voice: mystical, serious, Commander-literate, source-conscious, and dossier-like. The best copy uses a ritual or archive metaphor, then immediately grounds it in a practical Commander task.

### Metaphor System

Recurring metaphors:

- Compass.
- Maze.
- Archive / Apocrypha.
- Dossier.
- Reading.
- Signal.
- Table pressure.
- Identity expression.

### Strengths

Distinctive copy worth preserving:

- "Commander identity and taste compass."
- "Not a deckbuilder."
- "Learn the Commander table."
- "Where Vox Mana shows its work."
- "Search Magic by instinct, syntax, or shape."

These lines are good because they connect voice to function.

### Risks

The copy gets weaker when it becomes:

- Too mystical: implying the product reveals hidden truth rather than offers interpretation.
- Too academic: using "placement," "expression," "thesis," and "archetype" before grounding them.
- Too AI-generated: fluent but unspecific language about identity, resonance, or signals.
- Too game-guide-like: drifting into generic Commander advice without the identity compass.
- Too authoritative: sounding like official Magic canon or definitive deck recommendation.

### Places To Fix

- "opens the guild or college that answers back" should be replaced because it is stale and overly mystical.
- "symbolic search" is weaker than "guided card search" or "identity-shaped card search."
- "staple cards, land guidance, and Commander deck-start links" should be bounded as examples and search supports, not deck prescriptions.

### Vox Mana Voice Guide

Use this:

- Plain Commander job first, restrained mythic term second.
- "This suggests," "this points toward," "use this when," and "look for."
- Concrete table behavior: pressure, tempo, threat, politics, risk, rebuild, removal, mana, commander choice.
- Source-aware language: source support, confidence, limitation, public reference.

Avoid this:

- "The system knows who you are."
- "This is your true identity."
- Official-canon phrasing for Vox Mana interpretations.
- Ranked deck claims without evidence.
- Mystical copy with no practical verb.
- Generic MTG helper copy.

Example rewrite pattern:

- Weak: "Archscry listens for the colors that answer back."
- Better: "Answer a short Commander reading. Archscry maps your colors, pressure, and risk appetite into a dossier you can use before browsing decks elsewhere."

## 8. Current Readiness Assessment

| Category | Score | Evidence | Why It Matters | Highest-Leverage Fix |
|---|---:|---|---|---|
| First-visit clarity | 4/5 | Home states compass, not-deckbuilder boundary, and route jobs. | Users must understand the job before the theme. | Propagate Home framing to route headers. |
| Product boundary clarity | 3/5 | Home/data contracts clear; Archscry/Terms/Privacy have deckbuilder or stale scope drift. | Boundary prevents false expectations. | Boundary copy pass across Archscry, Terms, Privacy. |
| Visual polish | 3/5 | Strong route design work, but visual baselines are stale. | Public demo depends on visual trust. | One accepted cross-route visual refresh. |
| Accessibility | 4/5 | Semantic landmarks, ARIA, reduced motion, manual test docs. | Accessibility supports lightweight credibility. | Add automated route smoke/a11y CI or browser pass. |
| Mobile usability | 3/5 | Mobile checks exist; visual diffs stale. | Commander users will likely browse on phones. | Mobile E2E pass for Home, Archscry, Maze. |
| Data integrity | 4/5 | 37 runtime identities and deterministic tests. | Identity product fails if counts drift. | Reconcile stale 30/36 docs. |
| Source traceability | 4/5 | Raw packets, Apocrypha, guardrails. | Trust differentiates Vox Mana. | Add claim-to-source examples in UI/docs. |
| Identity consistency | 3/5 | Runtime 37; docs/copy contradict. | Users and agents need one model. | Canonical identity-count cleanup. |
| Dossier usefulness | 4/5 | Archscry dossier, commander/precon support, Maze reflection. | The dossier is the flagship output. | Tighten first result clarity and boundaries. |
| Maze usefulness | 3/5 | Query modes and Reading Finds exist. | Maze should support repeat use, not novelty only. | Validate Archscry -> Maze -> Archscry loop. |
| Strategium usefulness | 4/5 | Concrete Commander table literacy modules. | Education gives identity practical value. | Add placement-based entry recommendations. |
| Apocrypha usefulness | 3/5 | Public reference library and source roles. | Source trust needs to be legible. | Map sample claims to exact sources. |
| Maintainability | 3/5 | Strong docs/tests; large route files. | Large files slow safe changes. | Split only where risk is highest after readiness work. |
| Deployment readiness | 3/5 | Static/GitHub Pages-ready; CI empty; Lighthouse/visual waivers. | Public release should be repeatable. | Minimal CI plus accepted waiver register. |
| Portfolio/demo readiness | 4/5 | Strong product/process evidence. | The repo can demonstrate product and QA thinking. | Build a concise public case-study narrative. |
| Monetization readiness | 2/5 | No user, retention, payment, or account-trust proof. | Monetization before proof distorts scope. | Run audience experiments before paid features. |

## 9. Open Loops And Unfinished Work

| Group | What Is Unfinished | Evidence | Severity | Suggested Next Action | Fix / Defer / Kill |
|---|---|---|---:|---|---|
| Product positioning | Boundary not consistently repeated beyond Home. | Home clear; Archscry deck-start copy and Terms stale. | High | Route-level boundary copy pass. | Fix now |
| UI/UX | Visual baselines stale. | VM-427 visual failures across Home/Archscry/Strategium/Apocrypha. | High | Owner visual acceptance then refresh/waiver. | Fix now |
| Data/source integrity | 30/36/37 identity contradictions. | Architecture docs, data contracts, Colorless docs conflict with runtime. | High | Canonical identity count reconciliation. | Fix now |
| Identity coverage | Colorless/WUBRG/four-color runtime support outpaces docs. | Identity JSON vs stale Colorless gate docs. | High | Update active docs, mark old docs historical. | Fix now |
| Maze | Reading Finds return-loop needs browser QA and user clarity. | VM-426 recommends manual browser return-loop QA. | Medium | Test Home/Archscry/Maze handoff path. | Fix now |
| Archscry | Stale "guild or college" and deck-start boundary wording. | `archscry/index.html`. | High | Copy repair and acceptance check. | Fix now |
| Strategium | Dense educational surface lacks obvious personalized entry path. | Tabs/modules are rich but not clearly tied to result. | Medium | Add "from your placement" bridge. | Defer |
| Apocrypha | Source library is useful but can read as a shelf rather than proof. | Source groups visible, claim mapping weak. | Medium | Add claim-to-source examples. | Defer soon |
| Technical debt | Large JS/CSS files. | File-size scan. | Medium | Do not refactor before readiness gates; split when touching risky areas. | Defer |
| Validation/testing | CI absent; live RLS pending; visual baselines stale. | Empty workflows; VM-422/VM-427 handoffs. | High | Minimal CI and live RLS proof. | Fix now |
| Deployment | Metadata/SEO/social proof thin. | Route title scan; meta descriptions inconsistent. | Medium | Add route metadata and share previews. | Fix soon |
| Monetization/audience | No retention, audience, or willingness-to-pay evidence. | Repo docs show product ambition, not market proof. | Medium | Run small public demo/audience tests. | Defer |

## 10. Monetization And Audience Signals

### Commander Players

Fit: Medium.

Why they would care: It gives language for taste, color identity, and table role before browsing commanders.

Why they might not: Experienced players may want decklists, meta stats, or legality tools immediately.

Proof needed: Do players share or revisit dossiers after the first reading?

First experiment: Publish three sample dossiers and ask Commander players whether they would use them before browsing decklists.

### New Commander Players

Fit: Medium-High.

Why they would care: Strategium and Archscry explain how a deck can feel and behave.

Why they might not: Current vocabulary may be too dense.

Proof needed: Can a new player complete a reading and choose a next learning path without help?

First experiment: Run a five-person onboarding test with Home -> Archscry -> Strategium.

### Returning Magic Players

Fit: Medium.

Why they would care: They may know Magic but not current Commander table norms.

Why they might not: They may prefer mainstream deck resources.

Proof needed: Does Strategium answer practical table questions better than generic guides?

First experiment: Create a "returning player" path through Strategium.

### Deckbuilders Who Want Taste Direction

Fit: Medium.

Why they would care: They may use Vox Mana before EDHREC/Moxfield/Archidekt to decide what to look for.

Why they might not: They may see anything short of a list as extra friction.

Proof needed: Does a dossier change what commanders/decks they browse?

First experiment: "Before you browse decklists" guide with one measurable CTA.

### Content Creators

Fit: Medium.

Why they would care: Shareable identity language and source-backed dossiers could become episode or article prompts.

Why they might not: They need novelty and audience resonance, not just tooling.

Proof needed: Do creators find the identity categories useful for content framing?

First experiment: Offer a creator-facing sample dossier package.

### LGS Communities

Fit: Medium-Low.

Why they would care: Rule 0, table fit, and onboarding are real LGS problems.

Why they might not: The product is not yet optimized for group facilitation, print, or event use.

Proof needed: Does it help pods discuss expectations?

First experiment: One printable table-fit card linked from Strategium.

### Patreon Or Supporter Audience

Fit: Low-Medium.

Why they would care: Source-bound identity guides could become recurring content.

Why they might not: No evidence of audience, cadence, or willingness to pay.

Proof needed: Subscriber interest in monthly dossiers/guides.

First experiment: Free newsletter-style dossier series before paid tier.

### Portfolio / Recruiting Audience

Fit: High.

Why they would care: The repo shows product strategy, frontend craft, data governance, QA, and AI-assisted workflow.

Why they might not: If the public surface has stale copy or visual drift, the process can look heavier than the product result.

Proof needed: A clean demo path and concise case study.

First experiment: Publish a one-page case study with three screenshots and validation summary.

### QA / Product Consulting Proof-Of-Work Audience

Fit: High.

Why they would care: The project demonstrates disciplined scope control, evidence-first audits, source modeling, and release gating.

Why they might not: It is Magic-specific unless translated into general product lessons.

Proof needed: Clear before/after examples and risk register.

First experiment: Turn VM-428 and VM-429 into a public "how I audit AI-assisted product systems" case study.

### AI-Assisted Project Case Study Audience

Fit: High.

Why they would care: The handoff/Kanban/source guardrail system is the most portable meta-asset.

Why they might not: The repo may feel too internal unless curated.

Proof needed: A readable workflow narrative and artifacts.

First experiment: Create a short article showing one ticket from intent to tests to handoff.

## 11. Strategic Project Options

### Option 1: Polished Portfolio Project

Concept: Keep Vox Mana primarily as a public product/engineering/QA showcase.

Why it fits: The repo has unusually strong process evidence and a distinctive product surface.

Evidence: VM workflow, handoffs, audits, source guardrails, static app routes.

What to build: Case study page, screenshots, clean demo script, metadata, CI badge or validation summary.

Main risk: The public app must be polished enough that the process does not look like compensation for product ambiguity.

2-week test: Share the demo and case study with 5 product/engineering reviewers.

Kill condition: Reviewers cannot explain what Vox Mana does after 2 minutes.

### Option 2: Commander Onboarding Tool

Concept: Position Vox Mana for new/returning Commander players.

Why it fits: Home, Archscry, and Strategium already support orientation.

Evidence: "Learn the Commander table," not-deckbuilder boundary, placement/dossier model.

What to build: Novice path, glossary, fewer first-screen terms, first-deck browsing guide.

Main risk: Current language may be too dense and brand-heavy for beginners.

2-week test: Five novice users complete a reading and choose a next action.

Kill condition: Most users ask for a decklist before understanding the compass.

### Option 3: Deck-Discovery Companion

Concept: Be the tool users use before EDHREC/Moxfield/Archidekt.

Why it fits: Vox Mana already points users toward what to look for elsewhere.

Evidence: Home boundary, Maze search, Reading Finds, deck-start links.

What to build: Better outbound search packets, commander/decklist browsing checklist, shareable dossier.

Main risk: It can easily become a recommendation engine or deckbuilder.

2-week test: Track whether users use the dossier to browse external deck resources.

Kill condition: Users only value it if it creates full lists.

### Option 4: Content / Blog / Source Library Engine

Concept: Use Apocrypha and Strategium as a source-backed Commander education publication.

Why it fits: The source model and voice are already content-ready.

Evidence: Apocrypha source library, Strategium modules, research ledgers.

What to build: Article template, source citation blocks, one identity deep dive.

Main risk: It becomes a generic MTG wiki or lore blog.

2-week test: Publish one source-backed identity article and measure qualitative response.

Kill condition: Readers cannot distinguish it from existing Magic guides.

### Option 5: Patreon-Supported Identity Guide

Concept: Offer recurring identity dossiers, Commander table guides, and source-backed essays.

Why it fits: Dossiers and source work are the most monetizable content shapes.

Evidence: Archscry dossier system, raw source packets, Strategium education.

What to build: Free sample issue, archive, cadence, subscriber promise.

Main risk: No evidence of audience or willingness to pay.

2-week test: Free waitlist or "support future guides" CTA.

Kill condition: No meaningful signups after targeted sharing.

### Option 6: QA/Product Consulting Case Study

Concept: Use Vox Mana as proof that the creator can audit and ship AI-assisted product systems responsibly.

Why it fits: The repo is rich in governance, handoffs, validations, audits, and source boundaries.

Evidence: VM-427, VM-428, VM-429, data contracts, guardrails, Kanban trail.

What to build: Public audit narrative, risk matrix, before/after tickets, limited demo.

Main risk: Needs translation from Magic-specific details to general product value.

2-week test: Send case study to product/QA peers for clarity feedback.

Kill condition: Readers admire process but cannot name the service offering.

### Option 7: Lightweight Account Features Later

Concept: Add saved readings or private deck links only after repeated-use value is proven.

Why it fits: Supabase traces and VM-422 already exist.

Evidence: Supabase client, private deck-link service, SQL artifact.

What to build: Live RLS proof, profile SQL restoration, account UX, export/delete controls.

Main risk: Privacy/security burden before user need.

2-week test: Complete live RLS proof and test with a tiny cohort.

Kill condition: Users do not return or save anything after first reading.

### Option 8: Creator Or Community Layer Later

Concept: Let creators or communities publish/share identity guides after moderation readiness.

Why it fits: Dossiers are shareable and Commander communities care about table fit.

Evidence: Deferred VM-422 public ledger/community scope.

What to build: Moderation model, reporting, source standards, public profiles, community guidelines.

Main risk: Moderation and trust costs are high.

2-week test: Manual curated creator page, no user-generated posting.

Kill condition: Manual curation is not valuable enough to justify community complexity.

## 12. Anti-Fit Directions

### Full Deckbuilder Too Early

Danger: It would collapse the clear "before deckbuilding" identity and force legality, pricing, card database, import/export, and deck analytics responsibilities.

### Legality Checker

Danger: Legality is high-stakes, changes over time, and requires current rules/card data. The repo does not prove that level of authority.

### EDHREC Clone

Danger: Vox Mana has no evidence advantage in popularity stats or metagame aggregation. Its advantage is interpretation and source posture.

### Generic MTG Wiki

Danger: A wiki direction would dilute the Commander identity compass and create a huge source-maintenance burden.

### Overusing AI-Generated Mystical Copy

Danger: The brand can become vague, inflated, or falsely authoritative. The best copy is mystical only after it is practical.

### Accounts Before Repeated Use

Danger: Accounts add privacy, RLS, support, and trust obligations before there is proof that users need persistence.

### Community Features Before Moderation

Danger: Public deck links, voting, comments, or submissions require moderation, abuse handling, and clear safety policy.

### Unsupported Lore, Rules, Or Card Claims

Danger: One unsupported claim can damage the project's core source-first promise.

### Too Many Visual Effects

Danger: Atmosphere can hide clarity, hurt performance, and make the site feel less trustworthy.

### Treating Card Search As The Product

Danger: Maze is strongest as a support loop. As the main product, it competes with Scryfall on Scryfall's home ground.

## 13. Comparison Hooks

Use these questions when comparing Vox Mana to other tools, collaborators, or strategic options:

- Does this tool explain player taste better than existing deck sites?
- Does it help someone choose a direction before browsing decks?
- Can a first-time visitor state what Vox Mana is not?
- Does the dossier feel worth saving or sharing?
- Does Maze create repeated use or just novelty?
- Does Strategium help a player make better table decisions?
- Does Apocrypha make the product more trustworthy or only more complex?
- Is the source model clearer than a generic MTG helper's trust model?
- Does the product avoid claiming official Magic authority?
- Does it have a narrow enough audience to grow?
- Does the current UX prove product thinking without requiring a walkthrough?
- Does the repo prove QA, release-readiness, and AI-assisted delivery skill?
- Would a Commander player use this before EDHREC?
- Would a new player use this without feeling talked down to?
- Would a reviewer trust the project after seeing stale docs?

## 14. Recommended Next 10 Tickets

### VM-XXX - Reconcile Identity Count And Colorless/WUBRG Documentation

Why it matters: The runtime appears to support 37 identities, but docs still say 30 or 36.

Scope: Update active architecture, data-contract, Colorless/WUBRG, Privacy, and Terms copy. Mark preserved historical docs as historical where appropriate.

Files likely touched: `docs/architecture/project-atlas.md`, `docs/architecture/core-logic-and-algorithms.md`, `docs/architecture/placement-domains.md`, `docs/reference/data-contracts.md`, `docs/architecture/colors/colorless/product-decision-gate.md`, `privacy/index.html`, `terms/index.html`.

Acceptance criteria: One canonical current identity count is visible; old 10+5, 30, and 36 references are removed or marked historical.

Validation: `rg "10 Ravnica|5 Strixhaven|30-expression|36-expression|preview_eligible: false" docs privacy terms`; `npm run test:placement`.

Risk if skipped: Trust and source-of-truth credibility remain weakened.

### VM-XXX - Restore Profile Supabase RLS Source Artifact

Why it matters: The security review cannot fully audit profiles without the SQL source.

Scope: Add or restore canonical profile SQL/RLS artifact and update the security review.

Files likely touched: `docs/supabase-profile-update.sql`, `docs/architecture/supabase-frontend-security-review.md`, related handoff/card.

Acceptance criteria: Profile table grants, RLS policies, and update paths are reviewable from repo source.

Validation: SQL static review plus any available Supabase local/live verification.

Risk if skipped: Account features remain unfit for production trust.

### VM-XXX - Run VM-422 Live Private Deck-Link RLS Proof

Why it matters: Local SQL and tests are not enough for live account security claims.

Scope: Execute the VM-422 live harness with credentials, record results, and update card/handoff.

Files likely touched: VM-422 card/handoff docs, live proof notes.

Acceptance criteria: Owner-only list/archive behavior is proved live; public/rejected/moderation states remain inaccessible as designed.

Validation: `npm run test:deck-links:live` with required env vars.

Risk if skipped: Private deck-link feature remains pre-production.

### VM-XXX - Add Minimal CI Validation Gate

Why it matters: The repo relies on local discipline for validation.

Scope: Add GitHub Actions for parser, placement, bias/gate compression, and targeted smoke tests.

Files likely touched: `.github/workflows/validation.yml`, package scripts if needed.

Acceptance criteria: PRs/run dispatch execute the minimal validation set without requiring secrets.

Validation: GitHub Actions pass; local `npm test` or selected scripts pass.

Risk if skipped: Future changes can bypass deterministic checks.

### VM-XXX - Visual Baseline Acceptance And Waiver Cleanup

Why it matters: Visual readiness cannot stay in permanent stale-baseline state.

Scope: Review current visual diffs, accept/refresh intended baselines, document remaining waivers.

Files likely touched: visual baseline artifacts, `docs/reference/manual-test-cases.md`, release notes/handoff.

Acceptance criteria: Current baseline status is either green or intentionally waived with owner-approved scope.

Validation: Visual test command used by the repo; manual screenshot inspection.

Risk if skipped: Visual polish claims remain unproved.

### VM-XXX - Archscry Boundary Copy Pass

Why it matters: Archscry is the flagship route and currently contains stale/deckbuilder-adjacent copy.

Scope: Replace guild/college-only language, bound deck-start/staple/land support, and clarify dossier purpose.

Files likely touched: `archscry/index.html`, possibly `assets/js/commander-dossier.js` or dossier copy modules.

Acceptance criteria: Archscry states current identity scope and not-deckbuilder boundary without weakening usefulness.

Validation: Manual copy review; `rg "guild or college|staple cards|deck-start" archscry assets`.

Risk if skipped: Users misread the flagship as an incomplete quiz or lightweight deckbuilder.

### VM-XXX - Critical Browser E2E Smoke For Home/Archscry/Maze

Why it matters: The key product loop crosses routes and localStorage.

Scope: Add or run browser checks for Home entry, Archscry reading, Maze handoff, Reading Finds, and return to dossier.

Files likely touched: test scripts, manual QA docs.

Acceptance criteria: The complete loop works on desktop and mobile viewport sizes.

Validation: Playwright/manual browser run; localStorage migration sanity check.

Risk if skipped: The flagship loop can break while unit tests pass.

### VM-XXX - Route Metadata And Social Preview Pass

Why it matters: Public and portfolio sharing need clear previews.

Scope: Add consistent descriptions, canonical URLs, Open Graph/Twitter tags, and route-specific share copy.

Files likely touched: route `index.html` files, shared head snippets if any.

Acceptance criteria: Every public route has accurate metadata and does not overclaim.

Validation: `rg "<meta|og:|twitter:|canonical" *.html */index.html`; manual preview check.

Risk if skipped: Public sharing undersells the project and creates inconsistent first impressions.

### VM-XXX - Maze Return Loop QA And Microcopy Tightening

Why it matters: Maze must feel like identity exploration support, not generic search.

Scope: Test and tighten mode copy, Reading Finds labels, export text, and return-to-dossier flow.

Files likely touched: `maze/index.html`, `research/research-init.js`, `research/maze-scratchpad-store.js`, manual QA docs.

Acceptance criteria: A first-time user can explain why Maze exists after entering from Archscry.

Validation: Browser smoke plus one manual cold-entry review.

Risk if skipped: Maze remains useful but strategically ambiguous.

### VM-XXX - Public Demo / Portfolio Case Study

Why it matters: Vox Mana has strong product/process evidence that is not yet packaged for an outside reviewer.

Scope: Create a concise case-study doc or route covering problem, constraints, source model, validation, screenshots, and current limitations.

Files likely touched: `docs/`, possibly a public route if desired.

Acceptance criteria: A reviewer can understand the project, its boundaries, and its proof points in under five minutes.

Validation: Manual review by at least one outside reader or owner proxy.

Risk if skipped: The strongest differentiated asset remains buried in repo process.

## 15. Executive Summary

Best current use: Vox Mana is best used as a source-governed Commander identity and taste compass, and as a portfolio-grade proof of product strategy, frontend craft, QA process, and AI-assisted repo governance.

Most important fix: Reconcile the stale identity-count and boundary docs/copy, then prove live Supabase RLS for any account-facing feature.

Most differentiated asset: The combination of interpretive placement/dossiers, source packets, Apocrypha provenance, and a rigorous VM handoff/Kanban workflow.

Biggest risk: Credibility loss from stale docs, overclaiming, or unproved backend privacy. The product's trust model is its advantage; if that slips, the brand loses its strongest reason to exist.

Recommended next phase: Readiness hardening, not feature expansion. Fix source/count contradictions, boundary copy, visual baselines, CI, and live RLS proof before adding more product surface.

Guiding sentence: Make Vox Mana the clearest source-governed Commander taste compass before adding anything that looks like a deckbuilder, community platform, or authority engine.
