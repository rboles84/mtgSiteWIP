# VM-617 — Reference, Cross-Links, and Final Onboarding Validation

ID: VM-617

Status: Done — Owner Accepted

Type: Red-team discovery / QA recon / product decision packet

Area: Field Guide, onboarding, route navigation, browser-harness ownership

Priority: Final Field Guide decision

Created: 2026-09-02

## Outcome

Reconcile the pre-VM-614 through VM-621 VM-617 authority with the accepted current onboarding system. Determine whether compact reference retrieval or any cross-link still earns production scope, validate the available end-to-end journeys honestly, and stop for Owner review.

## Source and accepted baseline

- Owner discovery brief dated 2026-09-02.
- Accepted `main` and `origin/main`: `5b1b7b3bf629cecb412b1a272df72ac9f632d489` (PR #20).
- Accepted Field Guide contract: `docs/contracts/field-guide-onboarding-contract.md`.
- VM-614, VM-615, VM-616, VM-618, VM-619, VM-620, and VM-621 are Done — Owner Accepted.
- The original VM-613 sequence remains input, not blind implementation authority.

## Discovery acceptance criteria

1. **AC1 — Reference route has an evidence-based disposition.** Current Guide/product coverage and player retrieval needs are audited, and `/guide/reference/` receives one explicit recommendation: build minimally, defer, or seek Owner supersession.
2. **AC2 — Reference content is bounded.** Any proposed terminology/Scryfall/recipe material is justified by recurring player need, avoids duplication, uses current authority, and treats six recipes as a maximum rather than a quota.
3. **AC3 — Cross-links are evidence-based.** Existing navigation, Beacons, guided reading and continuation actions are inventoried; only genuinely missing next-decision links are proposed.
4. **AC4 — End-to-end onboarding is actually validated.** Current first-time, returning, direct-Maze, Operator, Loom, Strategium, Apocrypha and guided/static journeys are exercised proportionately, including explicit disposition of the historical fresh-session Archscry gap.
5. **AC5 — Owner receives a bounded final-program recommendation.** The report defines the smallest implementation, any separate defect/harness cards, backlog ownership implications, measurement recommendations, and a clear stop condition for the Field Guide onboarding program.

## Locked discovery boundaries

- No `/guide/reference/`, production route, cross-link, Beacon, guided-reading, Driver.js, parser/query, Placement, persistence, telemetry, Strategium, or Apocrypha change.
- Do not weaken stale harness expectations or repair the historical fresh-session assertion here.
- Preserve all pre-existing untracked `outputs/*owner-review*` directories without staging, deleting, modifying, or cleaning them.
- Stop at Owner review; do not self-accept, commit, push, merge, or start another card.

## RobDev packet

- **Current behavior:** Three optional contextual Beacons launch bounded guided readings; the three static Guide routes remain direct/static; Maze already teaches/reveals its local concepts and links to official Scryfall syntax.
- **Owning authority:** the accepted Field Guide contract and current route owners. The report/card/board/handoff are authored documentation, not product authority changes.
- **Changed behavior:** only discovery state and documentation.
- **Protected behavior:** all runtime routes, onboarding interaction, navigation, query semantics, data, persistence, accessibility contracts, output witnesses, and accepted VM-614–621 candidates.
- **Smallest complete result:** an Owner decision packet with an explicit route disposition, cross-link inventory, journey evidence, fresh-session classification, backlog ownership, and program stop condition.
- **Stop condition:** Owner reviews the disposition; no implementation begins from this card.

## RobQA classification

QA-0 — discovery documentation and Kanban metadata only. Targeted content validation and `git diff --check` are required. Browser/harness checks are evidence collection, not a claim of production QA completion. CPU-heavy placement, SIRF, parser mutation, synthetic, recovery, account, and live-service suites are intentionally out of scope.

## Discovery result

See `docs/reports/2026-09-02-vm617-reference-final-onboarding-redteam.md`.

- Recommendation: **defer `/guide/reference/`**; preserve the accepted reserved route and seek no contract supersession.
- Reference content: no local terms, recipes, or copied syntax yet. The demonstrated retrieval bridge is existing Operator's Hand + visible query + `Open in Scryfall` + the existing official syntax link.
- Cross-links: no justified additions.
- Fresh Archscry browser smoke: the original discovery result was **HARNESS / PRODUCT BOUNDARY UNPROVEN**. Subsequent Owner manual verification resolves product behavior as **PRODUCT MANUALLY VERIFIED — AUTOMATED HARNESS STILL FAILING**; no VM-006 diagnostic is currently required.
- Backlog: VM-006 is independent and is the only relevant open card requiring follow-up consideration. VM-007, VM-010, VM-406, VM-398 and recommendation cards are independent, not VM-617 cleanup.
- Program disposition: Owner accepted the stop recommendation. The dedicated Field Guide/onboarding program is complete; future work requires a concrete product-specific problem.

## Owner acceptance and lifecycle closeout — 2026-09-02

- Owner Accepted the discovery/product decision at exact candidate `154183b`, with no VM-617 production implementation.
- `/guide/reference/` remains **DEFERRED**; its reservation remains in the accepted V1 contract and is not superseded. Terminology additions, local Scryfall syntax reference, recipes, and cross-links remain **0**.
- The Owner manually tested a private fresh Archscry browser with empty local storage: load, first question, first answer, progress, subsequent questions, completion, and real result/dossier all passed.
- The automated `test:browser-smoke` first-answer/progress timeout remains documented as an honest known failure. In light of the Owner's corresponding manual pass, it is **automated harness debt unless contrary product evidence appears**. Its assertion remains unmodified and is not claimed as passing.
- VM-006 remains an independent, unstarted backlog card. No immediate diagnostic is required to re-decide product versus harness behavior; future reliable fresh-session automation may be prioritized separately.
- First value remains useful product outcome, not Beacon click, Guide visit, or walkthrough completion. No telemetry changes are authorized.
- The dedicated Field Guide/onboarding program is complete. Major surfaces name the next useful decision, optional help is discoverable, recovery is understandable, and further work belongs to product-specific UX, reference maintenance, accessibility, analytics, or ordinary QA.
- Closeout is documentation/governance only. VM-614 through VM-621, Home's four paths, exactly three contextual Beacons, optional guided orientations, direct static Guides, Driver.js state, and the no-persistence/no-telemetry/no-completion-tracking boundaries remain unchanged.
