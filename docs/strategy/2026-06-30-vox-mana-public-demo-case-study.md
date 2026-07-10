# Vox Mana Public Demo And Strategic Case Study

Date: 2026-06-30
Related card: VM-452
Status: external-review brief, not a monetization plan

## Five-Minute Read

Vox Mana is a Commander-first Magic: The Gathering identity and taste compass. It helps a player understand color identity, placement, play-pattern signals, nearby fits, and what to look for when browsing commanders or decklists elsewhere.

Vox Mana is not a deckbuilder, legality checker, EDHREC clone, generic MTG wiki, recommendation engine, account-based deck platform, or rules authority. Its strongest current use is a scoped public static demo and portfolio-grade proof of product strategy, frontend craft, source governance, QA process, and AI-assisted repo workflow.

Primary strategic lane: polished portfolio / QA-product consulting proof-of-work.
Secondary strategic lane: Commander onboarding and taste-direction support.
Deferred lanes: monetization, accounts, public community, creator publishing, full deck discovery, and deck storage.

## Strategic Options And Anti-Fit Decision Record

This decision record completes the Section 11 strategic-options review and the Section 12 anti-fit handling inside VM-452. No separate VM-453 decision-record card was created because VM-452 already packages the strategy gate and public case-study framing, and `VM-453` is now occupied by the later Collaboration Self-Snapshot card.

### Chosen Path

Chosen now: keep Vox Mana in readiness-hardening and portfolio / QA-product proof-of-work mode.

Why: the repo has strong evidence of product strategy, source governance, frontend implementation, validation, handoff discipline, and AI-assisted delivery, while market traction, monetization demand, live account privacy, and community readiness remain unproven.

### Secondary Product Experiment

Best near-term user experiment: Commander onboarding and taste-direction support.

Why: Home, Archscry, Strategium, Maze, and Apocrypha already support first-visit orientation, identity reading, table literacy, reading-support search, and source transparency.

### Deferred Strategic Options

Defer deck-discovery companion, content/blog engine, Patreon/supporter guides, account features, creator/community layer, and public deck platform work until the project has repeated-use evidence, audience signal, owner-approved visual baseline decisions, and live RLS proof where account data is involved.

### Active Anti-Fit Decisions

- Do not become a full deckbuilder before the identity compass is clearer and repeatedly useful.
- Do not become a legality checker or official rules/card authority.
- Do not become an EDHREC clone, popularity recommender, or "best commander" engine.
- Do not become a generic MTG wiki.
- Do not add accounts, public community, creator publishing, voting, or moderation claims until VM-422/VM-446 account proof and moderation readiness exist.
- Do not let Maze become the product; keep it as reading-support search and local Reading Finds.
- Do not use lore, card, precon, or rules claims without source confidence.
- Do not use mystical copy as a substitute for clear product boundaries.

### Kill Conditions

- Kill or defer monetization if reviewers cannot name a paid use case, repeated-use trigger, or audience segment with evidence.
- Kill or defer account/community expansion if live RLS proof, privacy language, moderation rules, and export/delete controls are not ready.
- Kill or defer deck-discovery expansion if users describe Vox Mana as a deckbuilder, recommender, legality checker, or EDHREC substitute.
- Revise the case-study positioning if reviewers admire the process but cannot explain what Vox Mana does in two minutes.

## Demo Path

Use this route order for an external reviewer:

1. Home: start at `https://voxmana.io/` and confirm the first viewport explains Commander identity, taste compass, and "not a deckbuilder" scope.
2. Archscry: open `https://voxmana.io/archscry/`, run the quick Commander identity reading, and read the resulting dossier for placement, trait, card-signal, and nearby-fit explanation.
3. Maze: use `https://voxmana.io/maze/` as reading-support search. Add a card to Reading Finds and return to the dossier to show the local support loop.
4. Strategium: use `https://voxmana.io/strategium/` to show Commander table literacy: archetypes, threat assessment, pod communication, readiness, and heat management.
5. Apocrypha: use `https://voxmana.io/apocrypha/` to show the public source library and provenance model behind the interpretation layer.

Do not demo account/private deck-link behavior as production-ready while VM-422/VM-446 are deferred in backlog; live private deck-link RLS proof has not passed.

## Case Study Thesis

Vox Mana is a useful case study because it shows how a narrow product boundary can survive a large AI-assisted codebase:

- Product boundary: identity compass and reading-support search, not deck construction.
- Source model: public source ledgers, Layer 1 runtime data, and generated artifacts are separated.
- QA model: local deterministic checks, browser smoke, copy-boundary checks, route metadata checks, and visual waiver ledger.
- Governance model: file-based Kanban, handoff index, scoped tickets, and explicit stop conditions.
- Narrative model: mystical Commander-facing voice constrained by source evidence and anti-overclaiming rules.

## Proof Points

| Proof Point | Evidence | What It Proves | What It Does Not Prove |
|---|---|---|---|
| Product identity and open loops | `docs/audits/2026-06-29-vox-mana-self-snapshot.md` | Repo-grounded identity, readiness scores, audiences, anti-fits, and next tickets exist. | Market traction or monetization readiness. |
| QA and release readiness plan | `docs/qa/vox-mana-test-plan.md` | The project has a structured route/data/a11y/security/performance/visual QA map. | All manual device/browser checks are complete. |
| Copy and boundary repair | VM-440 through VM-443, VM-449 | High-risk deckbuilder/recommendation/stale AI-language drift was actively reduced. | That every future copy path is impossible to misread. |
| 37-identity documentation reconciliation | VM-444 | Active docs now align to the 37 live placement identities and Home Identity Signal count. | Historical docs are fully rewritten. |
| Supabase source traceability | VM-445 | Profile SQL/RLS source artifact is back in repo for static review. | Live backend account privacy is proven. |
| Live private deck-link RLS proof | VM-446 | The live proof was attempted, blocked honestly on missing credentials, and later deferred to backlog with VM-422. | Production account confidence. |
| CI validation | VM-447 | No-secret deterministic validation now has a GitHub Actions workflow. | Live Supabase, visual, Lighthouse, or external data-refresh gates. |
| Browser journey smoke | VM-448 | Home, Archscry, Maze, Reading Finds, and return-to-dossier path are covered in local headless browser smoke. | Safari/iOS/Firefox/full accessibility matrix. |
| Visual waiver ledger | VM-450 | Visual failures are classified with counts and artifact roots instead of being hand-waved. | Green visual baselines or owner-accepted refreshed screenshots. |
| Route metadata | VM-451 | Public routes have descriptions, canonical URLs, Open Graph/Twitter tags, and deterministic metadata validation. | Live social crawler cache behavior. |

## Current Readiness

Static public demo: conditionally showable. Present it as a scoped public beta with visual/performance/account caveats.

Portfolio/recruiting proof: credible, as long as the case study keeps the product limits visible.

QA/product consulting proof: credible, because the audits, cards, handoffs, and validation scripts are portable beyond Magic.

Commander onboarding experiment: plausible next user-facing test, but not yet proven with users.

Monetization: not ready. There is no evidence of audience, retention, willingness to pay, or repeat-use cadence.

Account/community features: not ready. VM-422 and VM-446 are deferred backlog work; private deck-link behavior is not production-proven and must pass live owner/non-owner/service-role RLS proof before any account-backed deck saving ships.

Polished release claim: not ready. VM-450 documents visual waiver status; it does not make visual baselines green.

## What To Say

One sentence:

Vox Mana is a source-governed Commander identity compass that helps players understand their color placement and browsing direction before they build or compare decks elsewhere.

Thirty-second version:

Vox Mana turns Commander color identity into a readable dossier. A player takes a short Archscry reading, sees their placement and adjacent signals, uses Maze to search for supporting card texture, and can read Strategium and Apocrypha to understand table behavior and source context. The project is intentionally not a deckbuilder or recommendation engine; its current strength is a scoped static demo backed by an unusually explicit QA and governance trail.

What not to say:

- Do not say Vox Mana recommends the best commander.
- Do not say it checks legality or replaces card/rules databases.
- Do not say account privacy is production-proven until VM-446 passes live RLS proof.
- Do not say the visual baseline suite is green.
- Do not say it is ready to monetize.
- Do not present source interpretations as official MTG lore authority.

## Screenshots To Capture Later

Do not treat these as accepted VM-452 artifacts until owner visual QA resolves the VM-450 waiver ledger.

- Home first viewport: identity compass and not-a-deckbuilder copy.
- Archscry dossier: placement, trait/radar, and reading explanation.
- Maze return loop: Reading Finds reflected back into the dossier.
- Apocrypha source library: provenance and source grouping.

## Two-Week External Test

Audience: five reviewers across product, engineering, QA, or Commander familiarity.

Ask them to answer:

1. What is Vox Mana for?
2. What is it explicitly not trying to be?
3. Which part felt most trustworthy?
4. Which part felt most overbuilt or unclear?
5. Would this case study make you trust the builder's product/QA judgment?

Pass condition:

At least four of five reviewers can explain the product boundary in their own words after two minutes and can name one proof point beyond the visual design.

Kill or revise condition:

Reviewers admire the process but cannot explain the product, assume it is a deckbuilder/recommender, or treat the caveats as excuses rather than release governance.

## Next Decision

The next phase should stay in readiness hardening until the owner chooses one of two routes:

- Public static beta: accept current caveats, keep account/community language out of the pitch, and run manual mobile/cross-browser review.
- Portfolio case study: package this brief, selected screenshots, validation summary, and one before/after ticket narrative.

Do not add monetization, accounts, community publishing, or deckbuilder-like discovery as the next phase without new evidence.
