# VM-617 — Reference Value, Cross-Link Restraint, and Final Onboarding Validation

**Status:** Done — Owner Accepted; no production implementation was required

**Baseline inspected:** `main` / `origin/main` `5b1b7b3bf629cecb412b1a272df72ac9f632d489` (accepted PR #20)

**Scope:** VM-617 discovery only. No production route, navigation, test expectation, or existing Owner Review output changed.

## Executive decision

**Defer `/guide/reference/`; do not supersede the accepted four-route V1 contract.**

The route remains a valid reserved information-architecture seam, but current evidence does not show a recurring player retrieval problem that the accepted Guide system and Scryfall authority fail to serve. Building it now would primarily restate `/guide/maze/`, the visible Maze controls, or Scryfall syntax rather than solve a demonstrated gap.

There are **no justified VM-617 cross-links**. Existing product actions, ordinary Guide navigation, the three contextual Beacons, static Guide exits, and the current official Scryfall link already answer the observed next-decision questions without turning the Guide into a sitemap.

The original discovery found the old fresh-session Archscry browser-smoke timeout but could not distinguish product from harness. Subsequent Owner manual verification resolved that uncertainty: product behavior passed in a private fresh browser, while the automated smoke remains a known harness/test failure. VM-006 stays independent and is not started by VM-617.

## Pre-flight and current-state recon

| Check | Result |
| --- | --- |
| Remote and baseline | `git fetch` completed; local `main` and `origin/main` both resolve to the supplied accepted SHA. |
| Worktrees and branches | One worktree only. No existing VM-617 branch/card/worktree. Discovery branch `codex/vm-617-discovery` was created from the accepted SHA. |
| Existing review outputs | `outputs/owner-review/`, `outputs/vm616-owner-review/`, `outputs/vm619-owner-review/`, `outputs/vm620-owner-review/`, and `outputs/vm620-vm621-final-review-20260902/` were already untracked and were not touched. |
| Accepted lineage | Board and cards record VM-614, 615, 616, 618, 619, 620 and 621 as Done — Owner Accepted. |
| Route state | `/guide/`, `/guide/reading/`, and `/guide/maze/` exist; `/guide/reference/` remains absent. |
| Governing authorities | Repo-local RobDev/RobQA skills and frozen `RobDevPass`/`RobQAPass`; Field Guide contract; VM-613 sequence; route-ownership matrix; relevant recent handoffs and cards were read. |

Recent accepted work made the old VM-617 plan materially smaller: VM-614 supplies product teaching, VM-615 supplies dossier meaning and direction, VM-616 supplies Maze translation/context/recovery, VM-618 supplies Guide utility navigation, VM-619 supplies the opt-in Maze guided reading, and VM-620/621 supply the exactly-three Beacon and contextual guided-reading contracts.

## Existing coverage and remaining retrieval questions

| Public concept | Current answer | Classification |
| --- | --- | --- |
| Guide, Reading, Placement, Dossier | `/guide/` and `/guide/reading/`; dossier orientation asks the player which decision they need. | Already clear in Guide/context. |
| Plain Reading, Operator's Hand, Loom | Maze mode cards state human language, exact Scryfall syntax, and visual query intent; `/guide/maze/` supplies depth. | Already clear contextually. |
| Current Weave, Reading Finds | Visible Loom summary and Maze drawer; `/guide/maze/` explains their bounded purpose. | Already clear in Guide/context. |
| Commander color identity vs printed color | Loom control and `/guide/maze/` distinguish eligibility from exact printed color. | Already clear in Guide/context. |
| Recognized, unresolved, warning; weak/zero recovery | Query Inspector and `/guide/maze/` distinguish a partial translation from an executed valid zero. | Already clear in Guide/context. |
| Scryfall query, format, type, keyword, Oracle text, mana value, exact name, AND/OR | Operator's Hand is explicitly for exact syntax; Maze presents the executable query and direct Scryfall handoff. | Expert / link to Scryfall. |
| Internal state, persistence, placement machinery, producer terminology | Not a player retrieval need. | Internal — do not expose. |

The only plausible reference audience is an already Scryfall-literate Operator's Hand player. That player can read the exact operator input, copy/open the generated query, and use the existing full-Scryfall-syntax link on the Maze empty state. There is no evidence in current UI, accepted research, or an observed failure that this player needs a competing local syntax sheet.

## Scryfall authority and recipe disposition

Maze already links to the official `https://scryfall.com/docs/syntax` reference and builds outbound `https://scryfall.com/search?q=…` links from visible executable queries. The direct official documentation request was access-restricted during discovery; that is a browsing limitation, not permission to copy an unverified local syntax reference. The existing outward link remains the authority boundary.

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Commander identity vs printed colors | Do not include locally now. | Existing Loom control and `/guide/maze/` already give the player-language distinction. |
| Type + keyword | Do not include locally now. | Operator's Hand plus the official syntax reference serve expert retrieval; no recurring-gap evidence. |
| Oracle text | Link to Scryfall if a future concrete need is shown. | Syntax/freshness maintenance belongs to Scryfall. |
| Mana value, exact name, simple OR grouping | Do not include locally now. | No observed need beyond a generic syntax cheat sheet. |
| Recipes | **0 proposed.** | The maximum of six is not a quota; no candidate clears duplication and maintenance burden. |

If a later Owner-approved reference card is justified, its maintenance owner should be the route owner with every syntax assertion checked against the live official Scryfall syntax page before release. Automated checks may pin local links and executable examples, but periodic human verification remains necessary. That ongoing cost is another reason to defer without demonstrated use.

## Required `/guide/reference/` decision matrix

| Dimension | Build minimal route | Defer route | Supersede route |
| --- | --- | --- | --- |
| Recurring player value | CONCERN — not demonstrated | GOOD — retain a future seam | CONCERN — no redundancy proof strong enough to remove accepted IA |
| Duplication risk | BLOCKER — repeats existing Guides/Maze | GOOD | ACCEPTABLE |
| Retrieval speed | ACCEPTABLE for a proven future expert need | GOOD — direct Scryfall handoff exists | CONCERN — removes reserved retrieval seam |
| Scryfall-authority overlap | CONCERN — high | GOOD — authority remains external | CONCERN — must alter accepted contract |
| Maintenance/freshness | CONCERN — syntax drifts | GOOD | GOOD |
| Discovery/navigation cost | CONCERN — needs another restrained entry | GOOD — no new findability surface | ACCEPTABLE |
| Mobile density | CONCERN — glossary/recipes crowd a compact sheet | GOOD | GOOD |
| Accessibility | ACCEPTABLE if a future static route is carefully built | GOOD | GOOD |
| Future content creep | BLOCKER — strong encyclopedia risk | GOOD — explicit evidence gate | GOOD |
| Implementation cost | CONCERN | GOOD | CONCERN — Owner-level contract change |
| Fit with current guided onboarding | CONCERN — reference is retrieval, not a walkthrough | GOOD | ACCEPTABLE |

## Cross-link inventory and decision

| Surface | Meaningful current exits | Disposition |
| --- | --- | --- |
| Home | Four product paths; optional Home Beacon to four-step Guide orientation; utility Guide. | Primary action/Beacon already exists. |
| `/guide/` | Archscry, Maze, Strategium, Apocrypha actions; global navigation. | Existing Guide continuation is sufficient. |
| Archscry result/dossier | Four question-led dossier actions; one optional dossier Beacon. | Contextual next decision already exists. |
| `/guide/reading/` | Return to Archscry and Maze; static/directed reading orientation. | Existing continuation sufficient. |
| Maze | Three mode choices, query-visible `Open in Scryfall`, exact-syntax link, recovery Beacon. | Contextual action/authority link already exists. |
| `/guide/maze/` | Return to Maze; static depth/recovery explanation. | Existing continuation sufficient. |
| Strategium | Product navigation and its own moments/Console. | Global navigation already solves discovery; no duplicate lesson. |
| Apocrypha | Product navigation, public source/trust sections, return controls. | Global navigation and route-local evidence access suffice. |
| `/library/` | Compatibility forwarding to Apocrypha. | Compatibility route only; no new onboarding link. |
| Footer/reference surfaces | Normal Home/Privacy/Terms and external authority links. | Normal navigation/reference behavior. |

### Required cross-link table

No new cross-links are proposed. Therefore there is no source/destination/wording/owner row to implement. Adding a named link from the Guide to Strategium or Apocrypha would duplicate a current product action; adding a reference link to a non-existent page would create a new route-discovery obligation without demonstrated value.

## Journey matrix

| Journey | Starting state / first useful action | Observed evidence | Friction / disposition |
| --- | --- | --- | --- |
| New unsure visitor | Home → optional Beacon → Guide → named product action | VM-621 browser: Home four-step guided orientation, static fallback, completion focus, no guided third-party requests. | PASS; Guide remains optional. |
| Fresh Archscry visitor | Cleared storage → Archscry → first answer/progress | `npm run test:browser-smoke` now reproduces the 10s timeout before first-answer/progress. | LIMITED — harness/product boundary unproven. |
| Returning reading | Stored/certified result → dossier → one of four choices → dossier Beacon | VM-615 static and VM-621 browser contracts pass; real rendered current dossier shows the four choices and optional Beacon. | PASS for deterministic stored/certified witness; not a fresh-session proof. |
| Direct Plain Reading success | Maze → plain-language query → visible translation/results | VM-616 focused static/browser contract passes. | PASS in deterministic browser witness. |
| Plain Reading weak translation | Plain Reading → diagnostic/recovery → optional Maze Beacon | VM-616 rendered browser contract passes with distinct weak state and exactly one contextual action. | PASS. |
| Valid zero | Operator/executable query `f:commander mv=99` → zero recovery | VM-616 browser contract confirms exact query, no invented unresolved state, and manual-constraint recovery. | PASS. |
| Operator's Hand | Direct Maze → exact syntax → results/Scryfall | Maze mode labels and official syntax link were inspected; executable query is visible and exportable. | PASS for current expert handoff; no local reference gap proven. |
| Loom | Direct Maze → Commander colors / type / ability / refinement → Current Weave | Live control copy plus accepted VM-616 contract explain inclusive identity vs printed-color alternatives. | PASS for contextual/visual explanation. |
| Strategium learner | Home/Guide → Strategium → moment or Console | Guide product action and global nav route directly to Strategium. | PASS; no contextual bridge need shown. |
| Apocrypha evidence seeker | Home/Guide → Apocrypha → source/trust area | Guide action/global nav and Apocrypha's source/trust sections exist. | PASS; no extra link proposed. |
| Home guided orientation | Beacon click → `/guide/?guided=vox-mana-intro` | VM-621 browser passes four steps, completion/focus, history, static fallback. | PASS. |
| Dossier guided orientation | Dossier Beacon → `/guide/reading/?guided=dossier-reading` | VM-621 browser passes four steps, completion/focus, history, static fallback. | PASS. |
| Maze guided orientation | Maze Beacon → `/guide/maze/?guided=maze-search` | VM-619 browser passes keyboard, Escape, Done, history, reduced motion, cleanup. | PASS. |
| Direct static Guide routes | Direct `/guide/`, `/guide/reading/`, `/guide/maze/` | VM-619/621 browser checks confirm direct guides stay static with no Driver assets. | PASS. |
| Representative mobile/reduced motion | 390px/zoom-equivalent/reduced motion | VM-616, 619 and 621 focused browser tests pass their route-specific reflow/motion contracts. | PASS. |

### Fresh-session Archscry disposition

### Original discovery evidence — preserved

**Original classification: HARNESS / PRODUCT BOUNDARY UNPROVEN.** `test:browser-smoke` cleared local/session storage, reached `/archscry/index.html`, then timed out after 10 seconds waiting at the first-answer/progress phase. The page reported complete document readiness and no visible error but did not yield a deterministic fresh interaction. This was an honest pre-Owner-evidence limitation, not a product failure claim.

### Subsequent Owner manual verification — accepted

**Current classification: PRODUCT MANUALLY VERIFIED — AUTOMATED HARNESS STILL FAILING.** The Owner personally exercised a private browser with fresh/empty local storage and observed: Archscry load, first question, accepted first answer, advancing progress, subsequent question progression, completed reading, and a real result/dossier. This resolves the product-side uncertainty.

The automated smoke remains a known failing assertion; do not weaken, delete, or mark it PASS. It is automation/harness debt unless contrary product evidence appears. VM-006 remains an independent backlog card, is not started here, and needs no immediate product-versus-harness diagnostic. A future Owner may separately prioritize reliable fresh-session automation maintenance.

## Backlog ownership reconciliation

| Card | Disposition | Evidence |
| --- | --- | --- |
| VM-006 — Archscry/Maze Verification and Repeat-Visit Polish | INDEPENDENT; relevant follow-up candidate | Explicitly owns real-browser repeat-visit/continuity work; current fresh-session limitation belongs here. |
| VM-007 — Commander Dossier Quality and Link Follow-Up | INDEPENDENT | Dossier editorial/link quality; not reference or cross-link work. |
| VM-010 — Loom Commander Finder Mode/Graph Query | INDEPENDENT | Future Loom architecture, not current visual-search onboarding. |
| VM-406 — Archscry Placement to Strategium Bridge | INDEPENDENT | A later product-specific bridge decision; no current continuation gap proves it. |
| VM-398 — Apocrypha Research Vault | INDEPENDENT | Future publication/IA, expressly not public onboarding. |
| VM-008/547/548 and commander-recommendation cards | INDEPENDENT | Product discovery/recommendation scope, not Field Guide cleanup. |
| Telemetry/measurement | NO CURRENT CARD REQUIRED | VM-617 recommends outcomes only; it does not authorize events/schema. |

No related card is closed, superseded, or altered by this discovery.

## Measurement recommendations — no telemetry implementation

- Identity seeker: useful result followed by a dossier or named direction.
- Existing reading: a named dossier action is used.
- Card seeker: useful Maze results followed by inspect/refine/Find/Scryfall.
- Commander learner: an appropriate Strategium moment/Console action.
- Evidence seeker: an appropriate Apocrypha source/trust area.

Guide completion, Beacon click, and guided-reading completion are not first value. Any event design needs its own scoped authority.

## Final program recommendation and Owner review

### Smallest next slice

**No VM-617 production slice.** Owner accepted retaining `/guide/reference/` as deferred V1 architecture, with no terminology, local Scryfall syntax, recipes, or cross-links. A future Owner may authorize a separate reference card only for an actual repeated retrieval need. The manually verified product journey means no immediate VM-006 diagnostic is required for the automated timeout.

### Stop condition

**Owner accepted:** the dedicated Field Guide/onboarding program is complete. The product has sufficient onboarding when every major surface names the next useful decision, contextual help is optional/discoverable, recovery states are understandable, and deeper material belongs to product-specific UX, reference maintenance, accessibility, analytics, or ordinary QA—not another general onboarding phase.

### Owner acceptance

The Owner accepted the deferred reference decision, zero cross-links/recipes, manual fresh-session product pass with retained automated harness debt, VM-006 independence, first-value recommendations without telemetry, and the dedicated onboarding-program stop condition. Discovery candidate: `154183b`.

## Evidence and QA record

- **RobDev:** documentation-only discovery; current route contracts and existing owners were inspected; no runtime owner was changed.
- **RobQA tier:** QA-0 for repository changes. Browser checks are evidence collection only.
- **Focused checks passed:** `test:vm619-guided-reading`, `test:vm620-guide-beacon`, `test:vm621-guided-reading`, `test:reading-guide`, `test:maze-onboarding`, `test:vm621-guided-reading-browser`, `test:vm619-guided-reading-browser`, and the VM-616 rendered browser contract with its temporary witness directory outside the repository.
- **Known result:** `test:browser-smoke` fails at the preserved fresh-session first-answer/progress timeout; the Owner's manual fresh/private-browser result establishes product pass, so the remaining failure is harness debt unless contrary evidence appears.
- **Skipped:** CPU-heavy Placement, SIRF, parser mutation, synthetic calibration, recovery enumeration, account, and live-service suites; none protect QA-0 documentation changes.
