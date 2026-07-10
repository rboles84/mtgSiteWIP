# Vox Mana Self-Snapshot

Generated: 2026-06-30 21:44 America/Denver workspace time
Agent: Codex
Related card: VM-459
Scope: Evidence-first product, technical, source, UX, narrative, readiness, audience, and strategy snapshot refresh after VM-439 through VM-458.

## Evidence Boundary

This snapshot uses repository evidence only: route HTML/CSS/JS, data files, source packets, architecture docs, QA docs, strategy docs, handoffs, Kanban cards, validation notes, and the existing VM-429 self-snapshot. It does not assume market traction, user research, live deployment status, live Supabase security, MTG correctness, or monetization readiness where the repo does not prove those things.

Evidence-backed observations are labeled as evidence. Reasonable inference is labeled as inference. Weak, stale, contradictory, missing, or deferred evidence is called out directly.

## Pre-Flight Summary

### Recent Related Work

Evidence:

- VM-429 created the 2026-06-29 self-snapshot and identified identity-count drift, copy boundary drift, missing profile SQL traceability, absent CI, stale visual baselines, and live RLS gaps.
- VM-439 audited product voice, MTG/Commander wording, deckbuilder drift, stale legal/AI copy, and anti-slop risks.
- VM-440 through VM-443 repaired high-risk visible copy and added `scripts/check-copy-boundaries.mjs` plus `npm.cmd run test:copy-boundaries`.
- VM-444 reconciled active architecture/reference docs to the current 37 live placement identities and 37 Home Identity Signal preview identities.
- VM-445 restored `docs/supabase-profile-update.sql` as checked-in profile schema/RLS source evidence.
- VM-446 attempted live VM-422 private deck-link RLS proof and honestly blocked on missing live owner/non-owner/service-role credentials.
- VM-447 added `.github/workflows/validation.yml` for no-secret deterministic CI checks.
- VM-448 added `scripts/browser-smoke.mjs`, a deterministic local browser journey through Home, Archscry, Maze, Reading Finds, and return-to-dossier.
- VM-449 tightened Maze and return-loop copy away from deckbuilder/recommendation drift.
- VM-450 created `docs/qa/visual-baseline-waivers.md` with current visual mismatch counts and route-level waiver status.
- VM-451 added route metadata, canonical URLs, Open Graph/Twitter tags, and `npm.cmd run test:route-metadata`.
- VM-452 created `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`.
- VM-453 created a collaboration self-snapshot trail without persisting the private-facing snapshot itself.
- VM-454 reconciled the shifted VM-448/VM-449 numbering against the VM-429 Section 14 placeholder list.
- VM-455 completed a remaining readiness residual sweep, including stale Home identity-scope copy.
- VM-456 tightened player-facing language while preserving accurate Magic and Commander vocabulary.
- VM-457 created `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`.
- VM-458 deferred VM-422 and VM-446 to backlog, hid the active Archscry deck-saving surface, and preserved deck-link artifacts for possible later revival.

### Current Known Risks

Evidence:

- Visual compare scripts still fail for Home, Archscry, Strategium, and Apocrypha. VM-450 records this as documented waiver state, not green visual proof.
- Live Supabase account/profile/deck-link behavior is not production-proven. VM-445 restored SQL source traceability; VM-446 did not pass live verification.
- VM-422 and VM-446 are backlog/deferred after VM-458. They are not current public demo blockers, but they remain required before any account-backed deck saving ships.
- Browser smoke is Chromium/Edge-based and mocked for Scryfall/Supabase. It does not replace Safari, Firefox, iOS, Android, live Scryfall, live Supabase, or manual accessibility review.
- `dossier:audit` still reports 0 failures with 113 existing warnings per VM-456.
- Deeper data-fed copy may still carry source-era phrasing. VM-456 intentionally avoided generated/source-derived JSON.
- Monetization, repeated use, public community, and audience demand remain unproven.

### Relevant Decisions Already Made

Evidence:

- Vox Mana is a Commander identity and taste compass, not a deckbuilder, legality checker, EDHREC clone, recommendation engine, account deck platform, official rules source, or generic MTG wiki.
- Current best strategic lane is readiness hardening plus portfolio / QA-product proof-of-work.
- Best near-term user experiment is Commander onboarding and taste-direction support.
- Deck saving remains wanted later but is deferred. No greyed or visible account deck-saving surface should appear now.
- Current live placement set is 37 identities without a live domain selector.
- Generated runtime files are not source authority. Raw/source packets, hand-authored registries, and explicitly promoted research/source docs remain the evidence hierarchy.
- The Loom is currently synthesis for owner review, not implementation approval.

### Files Recently Changed Or Dirty

Evidence from `git status --short --branch` and handoffs:

- Runtime/copy surfaces: `index.html`, `archscry/index.html`, `maze/index.html`, `apocrypha/index.html`, `privacy/index.html`, `terms/index.html`, `assets/js/index.js`, `assets/js/shared.js`, `assets/js/commander-dossier.js`, `assets/js/archscry-presentation.js`, `assets/js/strategium.js`, `research/research-init.js`.
- Validation and CI: `.github/workflows/validation.yml`, `scripts/browser-smoke.mjs`, `scripts/check-copy-boundaries.mjs`, `scripts/check-route-metadata.mjs`, `package.json`.
- Docs and traceability: `docs/audits/`, `docs/qa/`, `docs/strategy/`, `docs/handoffs/`, `docs/kanban/`, `docs/reference/`, `docs/architecture/`, `docs/supabase-profile-update.sql`.

### What Should Not Be Touched By This Snapshot

Do not touch runtime behavior, generated JSON/data, raw MTG source packets, source claims, Supabase live state, credentials, visual baselines, deployment, git staging/commit/push, or external vault files as part of this report.

## Delta From VM-429

The 2026-06-29 VM-429 snapshot is still the structural predecessor for this report, but several of its risks are now resolved or reframed.

Resolved or materially improved:

- Identity-count contradiction in active docs: improved by VM-444. Current active docs now name 37 live placement identities and 37 Home preview identities.
- Stale visible copy and legal-scope language: substantially improved by VM-440 through VM-443, VM-455, and VM-456.
- CI absence: improved by VM-447. CI exists, though GitHub-hosted execution is not proven from this workspace.
- Browser journey coverage: improved by VM-448. The core Home/Archscry/Maze/Reading Finds loop has local deterministic browser smoke.
- Route metadata/social preview gap: improved by VM-451.
- Public demo packaging: improved by VM-452.
- Profile SQL source traceability: improved by VM-445.
- VM-448/VM-449 numbering ambiguity: clarified by VM-454.
- Deck-saving release ambiguity: reframed by VM-458. Deck saving is backlog/deferred, not active demo scope.

Still open:

- Visual baselines are documented but not green.
- Live Supabase RLS is not proven.
- Cross-browser/mobile/manual accessibility evidence remains incomplete.
- Deeper data-fed identity copy still needs source-authority mapping before broad edits.
- Monetization and repeated-use value are not proven.

## 1. Project Identity

### What Vox Mana Currently Is

Evidence: `index.html` says Vox Mana is "a Commander identity and taste compass" and that it helps users understand colors, placement, play patterns, and what to look for when exploring commanders or decks elsewhere. The same first viewport says "Not a deckbuilder."

Evidence: `docs/architecture/project-atlas.md` maps the live public surfaces as Home, Archscry, Maze, Strategium, Apocrypha, Library alias, Privacy, and Terms. The active runtime is a mostly static vanilla HTML/CSS/JS site with route-local modules and shared systems.

Evidence: `docs/reference/data-contracts.md`, `docs/architecture/core-logic-and-algorithms.md`, and `docs/architecture/placement-domains.md` now identify the current live placement set as 37 identities: mono colors, Ravnica guilds, Strixhaven colleges, Alara shards, Tarkir wedges, five four-color identities, controlled Colorless, and controlled WUBRG.

Evidence: `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md` names the strongest current use as a scoped static demo and portfolio / QA-product proof-of-work, with Commander onboarding as the nearest user-facing experiment.

Inference: Vox Mana solves a "before the decklist" problem. It helps a Commander player name taste, table instinct, color identity, and browsing direction before they go to Scryfall, EDHREC, Archidekt, Moxfield, MTGDecks, articles, or a deckbuilder.

### Who It Appears To Be For

Evidence-backed likely users:

- Commander players who want language for their play identity and table role.
- New or returning Commander players who need orientation before entering deckbuilder complexity.
- Deck browsers who want better questions before comparing commanders or lists elsewhere.
- Product/engineering/QA reviewers evaluating product strategy, source governance, frontend craft, and AI-assisted delivery discipline.

Inference:

- Vox Mana is less useful for a user who already wants a finished 100-card list.
- Vox Mana is more useful for a user deciding what kind of Commander experience they want and why.

### What The Product Is Explicitly Not

Evidence:

- Home says "Not a deckbuilder."
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md` says Vox Mana is not a deckbuilder, legality checker, EDHREC clone, generic MTG wiki, recommendation engine, account-based deck platform, or rules authority.
- `docs/reference/data-contracts.md` says deck-link scope does not store decklists, card JSON, scraped content, Commander legality results, or hosted deck data.
- VM-458 moved deck saving out of active scope and removed the visible Archscry deck-saving surface.

Vox Mana is explicitly not:

- A deckbuilder.
- A legality checker.
- A price or availability authority.
- A popularity-stat recommender.
- An EDHREC clone.
- A generic Magic wiki.
- A hosted deck-storage platform.
- A public community deck ledger.
- An official Magic lore, rules, or canon source.
- A personality diagnosis engine.

### Does The Repo Clearly Communicate That Boundary?

Evidence-backed answer: Much better than VM-429, but not perfect.

Strong evidence:

- Home first viewport is clear.
- Route metadata now reinforces identity/dossier/search/source framing without anti-fit phrases.
- Copy-boundary checks block stale guild/college, old 10+5 scope, AI overclaims, deck-start framing, "best counterspells", time-sensitive Game Changers wording, and internal QA phrases in scoped live-copy files.
- Maze now uses "Visual query", "Shape", "Reading Finds", and "Return to Dossier with Finds" language rather than deck tray/builder language.
- Dossier labels now include "Commander Browsing Starts", "Card Signals", and "Mana Notes."

Weakness:

- Internal ids and historical tests still contain names such as `commander-deck-starts`, `starter-cards`, and `mana-base`; these are compatibility names, but they can confuse future agents.
- Deeper generated/source data was not broadly rewritten by VM-456.
- Account/profile traces remain in code and docs while deck saving is deferred, so release messaging must stay precise.

### Does The Current Implementation Match The Stated Identity?

Mostly yes.

Evidence-backed match:

- Archscry produces an identity/placement reading and dossier.
- Maze supports search and local Reading Finds, then reflects matching finds back into Archscry without scoring, ranking, legality validation, account sync, or decklist building.
- Strategium teaches Commander table literacy.
- Apocrypha exposes source posture and provenance.
- Data contracts preserve raw/source/generated boundaries.
- CI and browser smoke now protect core deterministic and browser-level behavior.

Mismatch or risk:

- Visual polish is not green against baselines.
- Live account/profile/deck-link behavior is not proven.
- Dossier warning debt remains.
- The Loom vision is powerful but not yet implementation-scoped.

### Positioning Statement

Vox Mana is a source-governed Commander identity compass: it turns a short reading into a color and placement dossier, helps a player understand table instincts and nearby fits, and points them toward search, learning, and source context without pretending to build, host, rank, legalize, optimize, or validate decks.

## 2. Product Philosophy

### Source-First Research

Pattern: Claims should flow from reviewed source packets, approved research, source ledgers, and hand-authored contracts before becoming runtime truth.

Evidence:

- `docs/reference/source-generated-guardrails.md` says generated/runtime surfaces are comparison targets, not canonical evidence.
- `docs/reference/data-contracts.md` names `data/raw-factions/**`, `data/identity-layers.json`, precon source JSON, source ledgers, and generated outputs with different authority levels.
- Apocrypha is positioned as "Where Vox Mana shows its work."
- VM-445 restored profile SQL source traceability rather than making unsupported live claims.

Consistency: Strong in docs and workflow. Medium in UI because confidence and source limits are not always adjacent to every claim.

Breakdown:

- Data-fed copy still needs a source-authority mapping pass before broad cleanup.
- Scryfall-derived indexes depend on committed derived data and external freshness assumptions.
- Live Supabase proof is explicitly missing.

### Identity And Taste Interpretation

Pattern: Vox Mana interprets answers into placement, color identity, adjacent fits, play patterns, and browsing questions.

Evidence:

- `assets/js/adaptive-placement.js` owns adaptive scoring, question selection, evidence trails, and placement results.
- `docs/architecture/core-logic-and-algorithms.md` documents Gate, Hall, Crucible, lateral inhibition, pruning, softmax, evidence trail, and result construction.
- `docs/reference/data-contracts.md` says placement is interpretive taxonomy, not official canon or objective personality diagnosis.

Consistency: Strong in Archscry, Home, and data contracts.

Breakdown:

- "Placement" remains a project-native term that may need a clearer first-use definition for new visitors.
- Dossier density can make the central result harder to parse without guidance.

### Commander Education

Pattern: Vox Mana teaches table behavior and Commander literacy rather than only color labels.

Evidence:

- Strategium is a Commander learning console.
- `assets/js/strategium.js` contains route-local Commander content around pod readiness, threat reading, heat management, archetypes, politics, stax, and beyond-WUBRG concepts.
- VM-456 intentionally preserved accurate Magic/Commander terms rather than flattening them into generic language.

Consistency: Strong in Strategium and increasingly present in Archscry and Maze.

Breakdown:

- Strategium may still be dense for true beginners.
- The bridge from a specific Archscry result to the right Strategium concepts is not yet first-class.

### QA-Style Governance

Pattern: Product work moves through VM cards, handoffs, validation, docs, and explicit stop conditions.

Evidence:

- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` track work.
- VM-447 added CI for deterministic no-secret checks.
- VM-448 added browser smoke.
- VM-450 documented visual failures with exact mismatch counts.
- VM-458 moved active account scope to backlog rather than letting an unproven surface linger.

Consistency: Strong. The process is now one of the project's most differentiated assets.

Breakdown:

- The working tree is very dirty with a large batch of unstaged docs/runtime changes.
- GitHub-hosted CI execution is not proven until pushed.
- Visual and live-backend proof remain outside the green path.

### Local-First And Progressive Enhancement

Pattern: Keep the core useful without accounts and preserve state locally where appropriate.

Evidence:

- Static route architecture supports GitHub Pages.
- Maze Reading Finds uses `vm_maze_reading_finds_v1` local storage with conservative migration from older keys.
- Reduced motion state is local.
- Browser smoke mocks external services for deterministic local runs.

Consistency: Strong for Home, Archscry, Maze, Strategium, and Apocrypha.

Breakdown:

- Supabase profile/account traces remain present and need precise scope boundaries.
- Local storage and browser cache behavior need broader manual QA beyond Chromium/Edge smoke.

### Human Approval And Stop Conditions

Pattern: The repo records what is not proven and defers instead of overstating readiness.

Evidence:

- VM-450 says visual baselines are not approved for refresh.
- VM-446 says live RLS proof is blocked.
- VM-458 says deck saving is deferred and hidden.
- VM-452 says monetization/accounts/community are deferred behind evidence gates.

Consistency: Strong in handoffs and strategy docs.

Breakdown:

- Historical docs still contain older decisions, though VM-444 improved active-doc authority.

### Dossier-Style Explanation

Pattern: The product packages identity as a readable field guide rather than raw score output.

Evidence:

- Archscry route, `assets/js/index.js`, and `assets/js/commander-dossier.js` render structured dossier sections.
- Dossier labels have been renamed toward support and browsing context.
- VM-456 tightened language around actual player actions.

Consistency: Strong.

Breakdown:

- Dossier audit warnings remain.
- Dense copy and many panels can overwhelm without a clear "read this first" path.

### Avoidance Of Overclaiming

Pattern: Vox Mana says interpretive, not official; support, not prescription.

Evidence:

- Data contracts reject official-canon and personality-diagnosis framing.
- Copy-boundary tests block high-risk visible phrases.
- VM-452 and VM-458 explicitly defer accounts, community, monetization, and deck saving claims.

Consistency: Much stronger than VM-429.

Breakdown:

- Deeper generated/source copy may still need review before every identity surface is publish-perfect.
- Any time-sensitive Commander policy wording needs source/date governance.

## 3. Active Product Themes

| Theme | Current State | Evidence | Product Value | Risk | Next Useful Decision |
|---|---|---|---|---|---|
| Commander identity compass | Active and central | Home copy, Archscry, adaptive placement, VM-452 | Gives the site a clear before-deckbuilding job | Users may still expect decklists if downstream support copy drifts | Keep every route aligned to "identity first, decklists elsewhere" |
| 37-identity placement model | Active and documented | VM-444, `data-contracts.md`, `placement-domains.md`, `test:placement` evidence | Broad Commander color coverage | Historical docs still exist and can mislead if read out of context | Add lightweight "current authority" references where older docs are preserved |
| Archscry dossier | Flagship route | `archscry/index.html`, `assets/js/index.js`, `commander-dossier.js` | Converts reading into shareable interpretation | Dense, warning debt, possible internal-id confusion | Dossier warning triage and first-result clarity pass |
| Maze and Reading Finds | Active support loop | VM-426, VM-448, VM-449, `research/research-init.js` | Lets users explore cards through the reading lens | Cold-entry Maze may still look like generic search | Test whether users understand the support-loop job |
| Strategium | Strong education route | VM-416, Strategium files | Teaches table literacy and Commander context | Dense for beginners | Add result-to-lesson bridge from Archscry |
| Apocrypha | Public source library | Apocrypha route, source docs | Trust and provenance asset | Can feel like an archive dump if not tied to claims | Add claim-to-source examples |
| Home first-visit clarity | Stronger after VM-424/455 | `index.html`, VM-455 | Helps users classify product quickly | Needs live visual acceptance | Owner screenshot review and demo capture |
| Route metadata/share readiness | Newly improved | VM-451, `check-route-metadata.mjs` | Better external review and social sharing | Live crawler previews not checked | Run deployed social preview smoke after push |
| Browser/CI readiness | Newly improved | VM-447, VM-448 | Catches deterministic and core journey regressions | Browser smoke not in CI; CI not proven hosted | Decide whether to pilot browser smoke in CI |
| Visual readiness | Documented but not green | VM-450 waiver ledger | Prevents fake polish claims | Compare failures may hide future regressions | Owner accepts current visuals or requests repairs |
| Account/deck-saving lane | Deferred backlog | VM-458, VM-422, VM-446 | Future repeated-use feature | Privacy/RLS burden and unproven need | Do not revive without owner decision and live proof |
| Loom foundation | Review draft | VM-457 deep dive | Strong future bridge between concepts, queries, cards, and placement | Could become deckbuilder/search clone if rushed | Decide v0/v1 naming and seed concepts before code |

## 4. Technical Strengths And Patterns

### Static Route Architecture

Strength: The route map is understandable and GitHub Pages-friendly: root Home plus `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/`, `/library/`, `/privacy/`, and `/terms/`.

Why it matters: Static hosting lowers operational burden and keeps the core public demo independent of a backend.

Weakness: There is no bundler or central head/component system, so metadata/copy consistency requires scripts and disciplined edits.

Product risk: Repeated route-local patterns can drift unless validators keep expanding.

### Vanilla HTML/CSS/JS With Shared Systems

Strength: Shared tokens, fonts, layout, topbar, atmosphere, components, reduced motion, and route-local CSS/JS make the site understandable without framework lock-in.

Why it matters: A reviewer can inspect the product directly, and GitHub Pages deployment stays simple.

Weakness: Densest files such as `assets/js/index.js`, `assets/js/commander-dossier.js`, and `research/research-init.js` remain high-blast-radius surfaces.

Product risk: Small copy/behavior changes can affect many dossier or Maze states.

### Adaptive Placement Model

Strength: The placement engine is documented and test-backed. It uses hypothesis scoring, evidence trails, staged questions, lateral inhibition, pruning, and softmax ranking.

Why it matters: The core reading is not a vibe-only quiz; it has inspectable logic and validation.

Weakness: The 37-identity model is active without a live domain selector, so future domain work must be carefully designed.

Product risk: Adding domains or new identity families casually could break question routing, adjacent-fit behavior, and dossier language.

### Raw-Plus-Generated Data Model

Strength: The repo separates canonical source inputs, generated runtime artifacts, and comparison-only outputs.

Why it matters: This supports evidence-first claims and makes source drift auditable.

Weakness: The amount of source/generated/doc structure is large and hard to onboard into.

Product risk: Future agents may edit generated outputs directly unless they follow guardrails.

### Maze Query Contract

Strength: `docs/contracts/maze-query-contract.md` and `research/maze-query-core.js` make Maze search behavior more explicit. VM-448 proves a core browser return loop.

Why it matters: Maze can support Archscry without becoming a separate search product.

Weakness: The Loom naming and Visual Builder/Loom v0/v1 distinction is unresolved.

Product risk: Loom expansion could duplicate parser/search logic or drift toward deckbuilding.

### Local Storage Reliability

Strength: Reading Finds uses a current key, conservative migration, and local-first scope.

Why it matters: It gives users lightweight memory without account burden.

Weakness: Manual corrupt-storage, quota, and cross-browser tests remain incomplete.

Product risk: A local-first feature can feel unreliable if it fails silently on phones or privacy-restricted browsers.

### Deterministic Validation And CI

Strength: `package.json` now exposes lint, parser, placement, Maze, deck-link, copy-boundary, route metadata, frontend smoke, browser smoke, visual, and Lighthouse scripts. VM-447 adds a no-secret GitHub workflow.

Why it matters: QA is no longer purely manual.

Weakness: Visual and Lighthouse are intentionally outside the hard CI gate; browser smoke is not yet in CI; hosted Actions has not been observed from this workspace.

Product risk: Public release claims must distinguish local evidence from hosted CI evidence.

### Browser Smoke

Strength: `scripts/browser-smoke.mjs` exercises a realistic Home -> Archscry -> Maze -> Reading Finds -> return-to-dossier path at desktop and mobile viewports.

Why it matters: This is the core cross-route journey most likely to regress.

Weakness: It mocks Scryfall/Supabase and uses Chromium/Edge tooling only.

Product risk: Live API, Safari, Firefox, iOS, Android, and assistive-tech issues can still escape.

### Supabase And Future Backend Traces

Strength: Profile and deck-link SQL artifacts are checked in and security-reviewed at source level.

Why it matters: Optional account features have traceability if revived.

Weakness: Live RLS proof is missing. VM-458 hides the deck-link surface.

Product risk: Any public claim that account-backed saving is production-ready would be unsupported.

## 5. Data, Evidence, And Source-Of-Truth Model

### Source Of Truth

Evidence-backed source authority:

- `data/identity-layers.json`: canonical identity-layer registry and Home preview metadata.
- `data/raw-factions/**`: raw source/profile/placement/claims/changelog packets.
- `data/precons/vox-mana-precons.source.json`: hand-authored precon source catalog.
- `data/taxonomy/vox-mana-precon-themes.json`: hand-authored precon theme taxonomy.
- `docs/reference/source-generated-guardrails.md`: source/generated work rules.
- `docs/reference/data-contracts.md`: runtime and storage contracts.
- `docs/supabase-profile-update.sql` and `docs/supabase-vm422-deck-links.sql`: checked-in SQL/RLS artifacts, not live proof.

Generated/runtime outputs:

- `data/factions.json`
- `data/placement-model.json`
- `data/precons/vox-mana-precon-catalog.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Scryfall derived indexes under `data/scryfall/indexes/`

Docs that should not be treated as current runtime truth:

- Historical cards, old handoffs, preserved decision gates, older identity-count plans, and external vault notes unless a current card revalidates them.
- `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md` now carries a VM-444 supersession note.

### Layer Boundaries

Evidence: Layer 1 registry/runtime membership is clearer after VM-444. Layer 2 research/source docs remain useful but do not automatically authorize runtime claims.

Risk: The repo has many historical notes. A reader who ignores supersession notes can still misread old counts or old scope.

### Source Confidence Table

| Area | Source Files | Confidence | Reason | Risk |
|---|---|---:|---|---|
| Current identity count | `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `docs/reference/data-contracts.md`, VM-444 | High | Active docs and validation now align to 37 | Historical docs can still confuse |
| Adaptive placement contract | `assets/js/adaptive-placement.js`, `docs/architecture/core-logic-and-algorithms.md`, `data/placement-model.json`, `test:placement` | High | Logic and tests are explicit | Future domain work could break assumptions |
| Home identity preview | `data/identity-layers.json`, `assets/js/home.js`, VM-389/VM-444 | High | Preview registry is canonical | Visual baseline not accepted |
| Archscry dossier rendering | `assets/js/index.js`, `assets/js/commander-dossier.js`, `data/factions.json` | Medium-High | Functional and tested, with audit warnings | Dossier warning debt and dense copy |
| Maze Reading Finds | `research/research-init.js`, `research/maze-scratchpad-store.js`, VM-426/448/449 | High for local behavior | Tests and browser smoke cover core loop | Cross-browser/storage edge cases remain |
| Route metadata | route heads, `scripts/check-route-metadata.mjs`, VM-451 | High locally | Validator passes in handoff trail | Live crawler previews not checked |
| Copy boundary | `scripts/check-copy-boundaries.mjs`, VM-440 through VM-456 | Medium-High | Scoped live files are guarded | Generated/source data not broadly covered |
| Precon support | source and generated precon files | Medium | Source/generated lane exists | Recommendation drift if copy overclaims |
| Scryfall search | parser seed, Maze parser/search files, Scryfall API | Medium | Deterministic parser exists | Live external data/freshness not guaranteed |
| Apocrypha sources | `apocrypha/index.html`, source/reference docs | Medium-High | Provenance posture is clear | Link freshness and claim mapping need ongoing checks |
| Profile storage RLS | `docs/supabase-profile-update.sql`, `assets/js/shared.js`, VM-445 | Medium | Source artifact restored | Live Supabase application unproven |
| Deck-link account storage | `docs/supabase-vm422-deck-links.sql`, deck-link tests, VM-422/446/458 | Low for release, Medium for design | Local/source artifacts exist; surface deferred | Live RLS proof missing; product need unproven |
| Visual readiness | VM-450 waiver ledger, visual artifacts | Low for polish, Medium for known-state | Exact failures are documented | No route is visually green |
| Monetization/audience | VM-452 strategy doc, repo evidence | Low | No user or payment evidence | Feature expansion could chase unsupported business claims |

### UI Claims Versus Evidence

Current UI claims are more conservative than VM-429. Home, metadata, Maze, and dossier labels now better match evidence. The main places where the UI may still imply more certainty than evidence supports are:

- Dossier support material if users interpret browsing starts/card signals as recommendations.
- Account/profile language if any future surface implies live privacy proof.
- Visual polish if screenshots are used before owner acceptance.
- Loom language if Visual Builder is presented as the full graph-aware Loom before owner decision.

## 6. UX And Product Clarity Review

### First-Time Visitor Read

Evidence: Home now says what Vox Mana is and what it is not. It has route cards and a clear first action toward Archscry.

Assessment: Stronger than VM-429. A first-time visitor can plausibly understand "identity compass before deckbuilding."

Remaining issue: The route ecosystem is rich enough that the next best action after reading completion can still feel dense.

### Home

Evidence: `index.html` includes "Vox Mana is a Commander identity and taste compass" and "Not a deckbuilder."

Strength: The first viewport is now the clearest positioning surface.

Risk: Home visual compare remains failed/waived. Public screenshots should wait for owner review or be labeled with waiver context.

### Archscry

Evidence: `archscry/index.html` metadata and landing now use Commander identity reading language. Dossier labels have been repaired.

Strength: It is the flagship surface and now better aligned with product boundaries.

Risks:

- Dossier depth can overwhelm.
- Internal panel ids still use historical deck-start names for compatibility.
- Dossier audit warnings remain.

Next action: Add a result-first clarity review that asks whether a user knows what to read, what to do next, and what not to assume.

### Maze

Evidence: VM-449 changed visible copy to "Visual query", "Shape", "Set constraints", "Reading Finds", and "Return to Dossier with Finds."

Strength: Maze now reads more like reading-support search and less like a deck tray.

Risks:

- Cold-entry users may still see it as "Scryfall with styling."
- The Loom label is meaningful internally but unresolved as product architecture.

Next action: Run a cold-entry test and a post-Archscry entry test separately.

### Strategium

Evidence: Strategium teaches Commander table behavior and uses accurate Commander terms. VM-456 tightened vague "leverage" phrasing.

Strength: Strong field-guide surface for Commander literacy.

Risks:

- Dense concepts can overwhelm new players.
- Direct routing from a user's Archscry identity into Strategium lessons is not yet implemented.

Next action: Add a "from this reading, read these Strategium concepts first" bridge later, after source/copy review.

### Apocrypha

Evidence: Apocrypha frames itself as "Where Vox Mana shows its work." VM-440 through VM-443 cleaned generic "deep dive" and deck-start drift.

Strength: It differentiates Vox Mana from vibe-only identity tools.

Risks:

- It can still feel like an archive unless it maps sources to claims.
- External link freshness is not proved in current validation.

Next action: Add two claim-to-source walkthrough examples.

### Identity Consistency

Evidence: Active architecture/reference docs now align to 37 live identities. Colorless and WUBRG notes preserve boundaries.

Strength: Much stronger than VM-429.

Risk: Historical docs remain and can be misread without supersession notes.

Next action: Add a lightweight "current authority" index for identity count and runtime scope.

### Terms And Product Language

Evidence: VM-440 through VM-456 repaired stale AI/scope and player-language issues in scoped live surfaces. `test:copy-boundaries` now guards the class of drift.

Strength: Legal/product copy is no longer the major blocker it was in VM-429.

Risk: Pattern checks are not semantic review. Future generated-data surfacing can still expose risky language.

## 7. Narrative And Voice Snapshot

### Tone

Evidence: Current copy is a Commander-aware field guide with a mystical archive atmosphere. It speaks in terms of readings, dossiers, placement, color identity, table behavior, and source context.

Best tone: Practical first, mythic second. It names what a player can do before using metaphor.

Weak tone: When it becomes too ceremonial, too internal, or too deck-support-heavy.

### Metaphor System

Strong metaphors:

- Compass.
- Dossier.
- Maze.
- Apocrypha/source archive.
- Loom, if scoped as a concept/query reasoning layer.

Risky metaphors:

- Anything that hides the actual action.
- Anything that implies fate, diagnosis, official authority, or a "true self."
- Loom if it suggests automatic deck generation.

### Distinctive Voice To Preserve

- "Commander identity and taste compass."
- "Not a deckbuilder."
- "Where Vox Mana shows its work."
- Colorless and WUBRG boundary language.
- Reading Finds as a local, returnable support loop.
- Commander table literacy that uses real MTG terms without flattening them.

### Voice Risks

- Over-literary identity prose.
- Internal source/QA phrases leaking into player copy.
- Repetition in generated/presentation copy.
- "Best", "recommendation", "proof", or "current" claims without source/date support.
- Deckbuilder-like labels around commanders, cards, precons, mana, or external deck links.

### Vox Mana Voice Guide

| Use This | Avoid This | Rewrite Pattern |
|---|---|---|
| "Commander identity", "placement", "reading", "dossier", "play pattern", "browsing signal" | "true destiny", "best deck", "deck guidance", "proof", "AI-powered reading" | "This result points toward [behavior] when [table condition] matters." |
| Accurate MTG terms such as ramp, draw, interaction, recursion, pod, Rule 0 | Generic replacements that make Magic less accurate | "Keep the term, then explain the table action." |
| "Examples to inspect elsewhere", "browsing starts", "card signals", "mana notes" | "recommendations", "deck-start links", "staples", "land guidance" | "Use these to compare external examples, not as a finished list." |
| Plain recovery copy in empty/error states | Atmospheric empty states without instruction | "Try [specific input], remove [filter], or return to [route]." |
| Source-aware uncertainty | Unsupported authority | "The source trail supports X; Y remains unproved or deferred." |

## 8. Current Readiness Assessment

Scale: 1 = weak or unproved, 5 = strong and release-grade for the stated scope.

| Category | Score | Evidence | Why It Matters | Highest-Leverage Fix |
|---|---:|---|---|---|
| First-visit clarity | 4 | Home positioning and not-deckbuilder copy | Users must know the job before trusting the reading | Run external two-minute clarity test |
| Product boundary clarity | 4 | Copy repairs, metadata, case study, copy-boundary script | Prevents deckbuilder/recommender misclassification | Continue guarding generated/data-fed copy |
| Visual polish | 2 | VM-450 visual compares fail on all four routes | Screenshots and public polish claims need visual proof | Owner accepts visuals or requests repairs |
| Accessibility | 3 | Semantic/static checks exist; manual a11y not fully evidenced | Core flows must be usable beyond mouse/canvas | Add keyboard and axe/manual evidence pass |
| Mobile usability | 3 | Browser smoke includes mobile viewport; broader device QA deferred | Commander browsing often happens on phones | Run 320/375/390/412/768 cross-browser pass |
| Data integrity | 4 | 37-identity docs and placement tests align | Wrong identity data breaks the product | Add broader data integrity validator |
| Source traceability | 4 | Source/generated guardrails and Apocrypha are strong | Trust is a differentiator | Add claim-to-source examples and link checker |
| Identity consistency | 4 | VM-444 reconciliation and source matrices | Identities need to stay distinct | Dossier warning/content triage |
| Dossier usefulness | 4 | Dossier labels repaired; browser flow works | This is the product's main payoff | Result-first clarity and warning pass |
| Maze usefulness | 3 | Reading Finds and return loop work in browser smoke | Maze should support repeated exploration | Cold-entry and post-reading user test |
| Strategium usefulness | 4 | Strong table-literacy content | Converts identity into play literacy | Add Archscry-to-Strategium bridge |
| Apocrypha usefulness | 4 | Source-library framing is distinctive | Proves source posture | Add claim-to-source walkthroughs |
| Maintainability | 3 | Strong docs/scripts, but high-blast-radius JS and dirty tree | Future work must stay safe | Reduce route hotspots after readiness |
| Deployment readiness | 3 | GitHub Pages support, metadata, CI file | Public demo depends on deployed proof | Push/run CI and perform deployed smoke |
| Portfolio/demo readiness | 4 | VM-452 case study, metadata, QA trail | Strongest current external use | Capture accepted screenshots and reviewer test |
| Monetization readiness | 1 | No audience, retention, or payment evidence | Prevents premature business scope | Run free external/repeated-use experiments first |

## 9. Open Loops And Unfinished Work

| Group | What Is Unfinished | Evidence | Severity | Suggested Next Action | Fix / Defer / Kill |
|---|---|---|---|---|---|
| Product positioning | External reviewers have not tested the two-minute boundary | VM-452 proposes test | Medium | Run 5-reviewer test and record answers | Fix soon |
| UI/UX | Visual baselines fail and are not owner-accepted | VM-450 | High for polish | Owner visual QA and baseline decision | Fix before polish claim |
| UI/UX | Result/dossier density remains high | Dossier architecture and warning count | Medium | Dossier first-result clarity pass | Fix soon |
| Data/source integrity | Deeper data-fed copy still needs mapped authority | VM-456 follow-up | Medium | JSON Cartographer source-authority map | Fix soon |
| Identity coverage | Historical docs still preserve older counts | VM-444 notes | Low-Medium | Add current authority index or clearer supersession pointers | Defer lightly |
| Maze | Cold-entry Maze value is unproved | VM-449, VM-457 | Medium | Test cold entry vs Archscry-launched entry | Fix soon |
| Maze/Loom | Loom v0/v1 naming and first slice are undecided | VM-457 | Medium | Owner decision note and concept seed | Defer until review |
| Archscry | Internal compatibility ids still use deck-start names | `assets/js/index.js`, visual scripts | Low | Leave unless refactor card approves rename | Defer |
| Strategium | No personalized result bridge | Current route architecture | Medium | Design small Archscry-to-Strategium handoff | Defer until after core readiness |
| Apocrypha | Source library needs claim mapping | Current route/source model | Medium | Add two claim-to-source examples | Fix soon |
| Technical debt | Large route JS files remain high-risk | Route matrix | Medium | Route-by-route reduction cards after release hardening | Defer |
| Validation/testing | Browser smoke not in CI and not cross-browser | VM-448/447 | Medium | CI pilot or manual matrix first | Fix soon |
| Validation/testing | Accessibility evidence incomplete | QA plan | Medium-High | Keyboard/axe/manual a11y pass | Fix soon |
| Deployment | Hosted CI/deployed smoke/social preview not proven | VM-447/451 | Medium | Run after push/deploy | Fix at release |
| Accounts | Live RLS proof missing | VM-446/458 | High if revived | Keep hidden; revive VM-446 only with credentials | Defer |
| Monetization | No user, retention, or willingness-to-pay evidence | VM-452 | High for business claims | Run free audience experiment | Defer |
| Public community | Moderation/readiness absent | VM-422/458 | High | Do not build now | Kill for current phase |

## 10. Monetization And Audience Signals

Do not force monetization. Evidence currently supports usefulness and portfolio proof more strongly than paid product readiness.

| Audience | Fit Level | Why They Would Care | Why They Might Not | Proof Needed | First Offer Or Experiment |
|---|---|---|---|---|---|
| Commander players | Medium | Names taste, table role, adjacent fits, and browsing direction | Experienced players may want lists and stats immediately | Dossiers change what they browse next | Share sample dossiers and ask whether they affect commander browsing |
| New Commander players | Medium-High | Helps explain color identity and table behavior | Current vocabulary may still be dense | Can they finish a reading and choose a next step unaided? | Five-person Home -> Archscry -> Strategium onboarding test |
| Returning Magic players | Medium | Bridges Magic knowledge into Commander table norms | They may prefer mainstream guides | Strategium answers practical table questions | "Returning player" test path through Strategium |
| Deckbuilders wanting taste direction | Medium | Useful before EDHREC/Moxfield/Archidekt | May feel like friction without a list | Dossier changes search behavior | Before-you-browse checklist tied to one dossier |
| Content creators | Medium | Dossiers and identity categories can frame content | Need audience novelty and shareability | Creators find categories useful | Creator-facing sample dossier pack |
| LGS communities | Medium-Low | Rule 0/table fit/onboarding are real problems | Not optimized for groups or print | Helps pods discuss expectations | Printable table-fit card prototype |
| Patreon/supporters | Low | Source-backed dossiers could become recurring content | No audience or cadence proof | Signups or repeat readers | Free newsletter-style dossier series |
| Portfolio/recruiting | High | Shows product strategy, frontend, QA, source governance | Visual waiver or product ambiguity can undercut it | Reviewers explain product and proof points | Case study with accepted screenshots and validation summary |
| QA/product consulting | High | Audits, risk registers, handoffs, tests are portable | Magic-specific context may distract | Readers see transferable method | Article: one ticket from risk to tests to handoff |
| AI-assisted project case study | High | The operating system is a strong meta-asset | Too internal unless curated | Readers understand governance without repo spelunking | Public workflow narrative based on VM-439 through VM-458 |

## 11. Strategic Project Options

### Option 1: Polished Portfolio / QA-Product Case Study

Concept: Keep Vox Mana as a public proof of product strategy, source governance, frontend craft, QA, and AI-assisted workflow.

Why it fits: The repo has a stronger evidence trail than most personal static products.

Evidence: VM-429, VM-430, VM-439 through VM-458, VM-452 case study, CI/browser smoke/copy-boundary/metadata checks.

What to build: Accepted screenshots, concise case-study page/doc, validation summary, one before/after ticket narrative.

Main risk: If visuals or product clarity are weak, the process looks heavier than the product.

2-week test: Share with 5 product/engineering/QA reviewers.

Kill condition: Reviewers admire the process but cannot explain Vox Mana in two minutes.

### Option 2: Commander Onboarding Tool

Concept: Position Vox Mana as a first-session guide for new/returning Commander players.

Why it fits: Home, Archscry, Strategium, Maze, and Apocrypha already support orientation.

Evidence: Identity compass framing, Strategium table literacy, copy repairs preserving MTG terms.

What to build: Guided path, glossary, first-reading next actions, result-to-Strategium bridge.

Main risk: Current language may remain too dense.

2-week test: Five novice/returning users complete a reading and choose a next action.

Kill condition: Most users ask for a decklist before understanding the compass.

### Option 3: Deck-Discovery Companion

Concept: Be the tool users use before external deck browsing.

Why it fits: Dossiers and Maze support browsing direction.

Evidence: Home "before you build or browse", Maze Reading Finds, external browsing starts/card signals.

What to build: Better external search packets, browsing checklist, shareable dossier links.

Main risk: It can collapse into recommender/deckbuilder territory.

2-week test: Track whether dossiers change external browsing choices.

Kill condition: Users only value it if Vox Mana generates full decklists.

### Option 4: Source-Backed Commander Field Guide

Concept: Use Strategium and Apocrypha as a source-backed educational publication engine.

Why it fits: Source posture and Commander table literacy are already strong.

Evidence: Apocrypha, Strategium, source guardrails, voice guide.

What to build: One article/deep guide template with source blocks and identity examples.

Main risk: It becomes a generic MTG wiki or lore archive.

2-week test: Publish one source-backed identity article for feedback.

Kill condition: Readers cannot distinguish it from existing Magic guides.

### Option 5: Loom Concept/Search Reasoning Layer

Concept: Build The Loom as a visual/textual reasoning bridge from concepts to Scryfall queries, real cards, strategy threads, and placement context.

Why it fits: VM-457 identifies a coherent foundation-to-generation model.

Evidence: Maze query contract, parser seed, tag taxonomy, Strategium archetypes, Commander Compass, Reading Finds.

What to build: Owner decision note, 8-12 concept registry, query adapter spike.

Main risk: It becomes a second parser, deckbuilder, or decorative graph.

2-week test: Concept click -> query preview -> existing Maze search for 8 concepts.

Kill condition: Users treat it as deck generation or ignore the reasoning panels.

### Option 6: Lightweight Accounts Later

Concept: Reintroduce saved readings or private deck links only after repeated-use value is proven.

Why it fits: Supabase traces and SQL artifacts exist.

Evidence: VM-422, VM-445, VM-446, VM-458.

What to build: Live RLS proof, account UX review, export/delete controls, privacy copy.

Main risk: Privacy burden before user need.

2-week test: First prove repeated use without accounts, then revive VM-446 with credentials.

Kill condition: Users do not return or save anything after first reading.

### Option 7: Creator Or Community Layer Later

Concept: Curated creator/community examples after moderation and source standards exist.

Why it fits: Dossiers are shareable and Commander communities care about table fit.

Evidence: Deferred VM-422 public ledger concept.

What to build: Manual curated page, moderation policy, reporting, source standards.

Main risk: Moderation cost and trust risk are high.

2-week test: Manual curated examples with no user posting.

Kill condition: Manual curation is not valuable enough to justify public community complexity.

### Option 8: Personal Research Archive Only

Concept: Keep Vox Mana as a private/local design archive and source lab.

Why it fits: The internal docs and vault memory are rich.

Evidence: Extensive Kanban/handoff/source systems.

What to build: Nothing public beyond current static demo.

Main risk: The strongest public proof-of-work remains hidden.

2-week test: Compare public case study effort against private-only value.

Kill condition: The owner wants external validation or portfolio leverage.

## 12. Anti-Fit Directions

- Full deckbuilder too early: It would force legality, imports, deck analytics, pricing, save/export, and maintenance obligations that Vox Mana has not proven.
- Legality checker: It is high-stakes and temporally unstable; the repo does not prove that authority.
- EDHREC clone: Vox Mana has no popularity-stat evidence advantage.
- Generic MTG wiki: It would dilute the identity compass and create endless source maintenance.
- Runtime AI lore/card invention: It would violate source-first trust.
- Accounts before repeated use: Accounts add privacy, RLS, support, and trust burdens before the user need is proven.
- Community features before moderation: Public submissions/votes require moderation, abuse handling, and safety policy.
- Monetization before audience evidence: It would create false pressure to expand too early.
- Too many visual effects before clarity: Atmosphere cannot compensate for unclear UX or performance risk.
- Treating Maze as the product: Maze is strongest as a support loop; as a main search product it competes with Scryfall.
- Treating The Loom as a deck generator: The Loom should explain concepts and queries, not build decks.
- Editing generated data as source: This undermines the repo's central evidence model.

## 13. Comparison Hooks

Use these questions to compare Vox Mana against other tools, collaborators, or strategic options:

- Can a first-time visitor explain Vox Mana in two minutes?
- Can they also explain what Vox Mana is explicitly not?
- Does it explain player taste better than existing deck sites?
- Does it help someone choose a direction before browsing decks?
- Does the dossier feel worth saving or sharing?
- Does Maze create repeated use or just novelty?
- Does Reading Finds feel connected to the reading?
- Does Strategium help a player make better table decisions?
- Does Apocrypha make the product more trustworthy or only more complex?
- Is the source model clearer than a generic MTG helper's trust model?
- Does the product avoid official Magic authority claims?
- Does it prove product thinking without a walkthrough?
- Does the repo prove QA and AI-assisted delivery skill?
- Would a Commander player use this before EDHREC?
- Would a new player use this without feeling talked down to?
- Would a reviewer accept the visual waivers as honest governance or see them as unfinished polish?
- Does The Loom clarify search reasoning or turn into a deckbuilder-adjacent graph?
- Does the next feature reduce ambiguity or add a new proof burden?

## 14. Recommended Next 10 Tickets

These are proposed next tickets after VM-459. They should be created only when the owner chooses that work. Keep them small and shippable.

### VM-460 - Owner Visual Acceptance And Baseline Decision

Why it matters: Visual readiness is now documented but not accepted.

Scope: Owner reviews current/diff PNGs for Home, Archscry, Strategium, and Apocrypha; decide accept/refresh or repair.

Files likely touched: `docs/qa/visual-baseline-waivers.md`, visual baseline artifacts only if accepted, Kanban/handoff docs.

Acceptance criteria: Each route has accepted baseline refresh, repair request, or explicit continued waiver.

Validation: `npm.cmd run test:visual:home`, `npm.cmd run test:visual:archscry`, `npm.cmd run test:visual:strategium`, `npm.cmd run test:visual:apocrypha`.

Risk if skipped: Visual tests remain too noisy for release confidence.

### VM-461 - Public Demo Screenshot And Case-Study Package

Why it matters: VM-452 is a strong brief but not a finished external package.

Scope: Capture accepted screenshots and package the demo path, caveats, and proof points for reviewers.

Files likely touched: `docs/strategy/`, maybe `docs/audits/` or a public docs page.

Acceptance criteria: A reviewer can understand product, boundary, proof points, and caveats in under five minutes.

Validation: Manual owner/reviewer read-through.

Risk if skipped: The strongest proof-of-work remains buried.

### VM-462 - Mobile And Cross-Browser Readiness Pass

Why it matters: Browser smoke is not the same as device/browser QA.

Scope: Run Home, Archscry, Maze, Strategium, Apocrypha, Privacy, and Terms at 320/375/390/412/768 widths across available browsers.

Files likely touched: `docs/qa/release-scorecards/` or new QA notes; bug cards if needed.

Acceptance criteria: P0 journeys pass or blocking bugs are filed.

Validation: Manual screenshots/notes; optional browser smoke expansion.

Risk if skipped: Mobile/Safari/Firefox blockers can ship.

### VM-463 - Accessibility Evidence Pass

Why it matters: Core flows involve modals, tabs, charts, and dynamic answer controls.

Scope: Keyboard, focus, reduced-motion, dialog, tab, source shelf, and chart fallback review.

Files likely touched: `docs/qa/`, possible small HTML/JS/CSS fixes if scoped.

Acceptance criteria: No P0/P1 keyboard or screen-reader blockers; P2/P3 tracked.

Validation: Manual keyboard pass, axe/Lighthouse if available, `npm.cmd run lint:html`.

Risk if skipped: The product may exclude keyboard or assistive-tech users.

### VM-464 - Dossier Warning Triage And Snapshot Review

Why it matters: `dossier:audit` still reports 113 warnings.

Scope: Classify warnings into real defects, acceptable warnings, and source-intake needs.

Files likely touched: `docs/qa/`, dossier audit docs, maybe source-intake cards.

Acceptance criteria: Warning categories are documented and top P1/P2 issues have cards.

Validation: `npm.cmd run dossier:audit`.

Risk if skipped: Dossier quality debt stays vague.

### VM-465 - Data-Fed Identity Copy Source-Authority Map

Why it matters: VM-456 avoided broad generated/source JSON edits for good reason.

Scope: Map which data-fed copy fields are source-backed, generated, display-only, or unsafe to edit directly.

Files likely touched: `docs/reference/data-contracts.md`, `docs/reference/source-generated-guardrails.md`, new audit doc.

Acceptance criteria: Future copy repair knows which source file owns each class of text.

Validation: Static field inventory and source/generated validator run.

Risk if skipped: Future agents may patch generated text or leave repeated copy forever.

### VM-466 - Loom V0/V1 Naming And Concept Seed Decision

Why it matters: VM-457 found a real idea but not an implementation decision.

Scope: Owner answers Loom review questions, selects first mode, and approves 8-12 seed concepts.

Files likely touched: `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, new decision note, Kanban/handoff docs.

Acceptance criteria: Clear go/no-go for Loom naming and first implementation slice.

Validation: No runtime validation; docs review only.

Risk if skipped: Loom work may begin with ambiguous scope and drift into deckbuilding.

### VM-467 - Browser Smoke CI Pilot

Why it matters: Browser smoke is valuable but not yet proven in GitHub Actions.

Scope: Decide whether to add `npm run test:browser-smoke` to CI or run it as manual/on-demand workflow first.

Files likely touched: `.github/workflows/validation.yml`, docs/QA notes.

Acceptance criteria: Hosted run is observed green or documented as too unstable for hard gate.

Validation: GitHub Actions run after push.

Risk if skipped: Core browser journey can regress outside local checks.

### VM-468 - Deployed Static Smoke And Social Preview Check

Why it matters: Local metadata and static smoke do not prove deployed custom-domain behavior.

Scope: After deployment, check `https://voxmana.io/` routes, canonical URLs, metadata previews, asset loading, and `/library/` alias.

Files likely touched: `docs/qa/`, maybe metadata/copy fixes.

Acceptance criteria: Deployed public routes load without critical console/network errors and previews are acceptable.

Validation: Manual deployed smoke; `npm.cmd run test:route-metadata` locally.

Risk if skipped: Public demo could fail only after sharing.

### VM-469 - External Reviewer Two-Week Test

Why it matters: Portfolio/demo readiness depends on outside comprehension.

Scope: Run the VM-452 five-question reviewer test with at least five reviewers.

Files likely touched: `docs/strategy/`, `docs/qa/`, new findings doc.

Acceptance criteria: At least four of five explain product boundary and one proof point beyond visuals.

Validation: Recorded reviewer answers and decision summary.

Risk if skipped: The project may feel internally coherent but externally unclear.

### VM-470 - Account Scope Freeze And Reactivation Checklist

Why it matters: Deck saving is deferred but artifacts remain in repo.

Scope: Create a compact current-scope note that says account-backed deck saving is hidden, VM-422/VM-446 are backlog, and reactivation requires owner approval plus live RLS proof.

Files likely touched: `docs/reference/data-contracts.md`, `docs/strategy/`, maybe VM-422/VM-446 cards.

Acceptance criteria: Future agents cannot accidentally treat deck saving as active release scope.

Validation: `rg` scan for visible deck-saving surface language plus `npm.cmd run test:copy-boundaries`.

Risk if skipped: Account scope can quietly creep back into public claims.

## 15. Executive Summary

Best current use: Vox Mana is best used as a source-governed Commander identity and taste compass, and as a portfolio / QA-product proof-of-work for product strategy, frontend implementation, source governance, and AI-assisted delivery discipline.

Most fragile: Visual readiness, live Supabase proof, and deep dossier/data-fed copy quality. These are documented honestly but not fully closed.

Most differentiated: The combination of interpretive placement, readable dossiers, Apocrypha source posture, Maze Reading Finds, Strategium table literacy, and the VM handoff/Kanban operating system.

Probably overbuilt: The internal governance and future account/deck-link/Loom possibilities are richer than the current external proof of repeated user need.

Cut or defer: Account-backed deck saving, public community ledger, monetization, creator/community features, full deck discovery, and any custom card generation outside a clearly labeled design lab.

Most important fix: Owner visual acceptance plus mobile/accessibility/manual demo evidence, followed by dossier warning triage.

Ready to show publicly: Conditionally yes as a scoped static demo or portfolio case study with clear caveats. Not as a polished production product.

Ready to monetize: No. There is no audience, retention, willingness-to-pay, or repeated-use evidence.

Best current use: Scoped public static demo and product/QA case study.

Most important fix: Resolve visual acceptance and manual release evidence before stronger public claims.

Most differentiated asset: Source-governed Commander identity dossiers backed by explicit QA and handoff discipline.

Biggest risk: Overclaiming polish, account safety, or deckbuilding value before the evidence supports it.

Recommended next phase: Readiness proof and external comprehension testing, not feature expansion.

Guiding sentence: Make Vox Mana unmistakably useful as a source-governed Commander taste compass before adding anything that looks like a deckbuilder, account platform, community layer, or authority engine.
