# VM-613 - Establish the Vox Mana Field Guide and Onboarding Contract

ID: VM-613
Title: Establish the Vox Mana Field Guide and Onboarding Contract
Status: done - Owner Accepted
Type: Architecture / Product Contract / Runtime Recon
Area: Global navigation, Home, Archscry, dossiers, The Implicit Maze, Strategium, Apocrypha
Priority: high
Created: 2026-08-30

## Summary

Establish the durable product contract for a concise, optional Vox Mana Field Guide and the contextual
onboarding system around it. Document current first-user journeys, route onboarding responsibilities,
material friction, existing-work reconciliation, and a bounded VM-614 through VM-617 sequence without
implementing `/guide/` or changing any production runtime.

Governing principle:

> A player should never need to understand Vox Mana's architecture before Vox Mana can help them.

Secondary principle:

> Tell the player just enough to make their next good decision.

## Source

- Owner start prompt for VM-613, supplied 2026-08-30.
- Current public routes and their route/shared owners.
- Current architecture, product, QA, backlog, runtime, and handoff evidence cited by the VM-613 package.
- Comparative inspiration at `https://playirl.gg/resources`, used only for bounded organizational
  principles and not copied as taxonomy, layout, naming, copy, or visual design.

## Locked Decisions

- Canonical namespace: `/guide/`.
- Top-level navigation label: **Guide**.
- Accepted navigation order: Home, Guide, Archscry, The Implicit Maze, Strategium, Apocrypha.
- Public flavor hierarchy: **CODEX VOCIFERA // VOL. XXXII** -> **A Planeswalker's Guide to Vox Mana** ->
  **Find your place. Shape your play.** -> functional identity **Vox Mana Field Guide**.
- The Guide is an onboarding/product-literacy layer, not a fifth functional pillar.
- Preserve Home's four focused paths.
- `/library/` remains the Apocrypha compatibility/history route; do not use **The Library** for Guide.
- Initial IA to validate: `/guide/`, `/guide/reading/`, `/guide/maze/`, `/guide/reference/`.
- Onboarding is optional and contextual: no mandatory tutorial, slideshow, wizard, modal, or coach-mark
  chain; essential meaning cannot depend on hover, animation, or prior tutorial completion.
- The eight `/guide/` intents are coverage requirements, not eight equal first-level choices; VM-614
  groups them into a small primary decision set with secondary/contextual routes.
- **If unsure, start with Archscry** remains optional, low-emphasis advice.
- Result = expectation; dossier directory = canonical **How to read your dossier** instruction.
- Direct Maze visits retain dossier context by default with explicit, understandable, reversible state.
- `/guide/reference/` has at most six distinct-value recipes; six is a maximum, not a quota.
- VM-613 is Owner Accepted and Done; do not begin VM-614 in this closeout.

## RobDev Pre-Edit Contract

- **Product outcome:** the repository has one implementation-ready authority for Guide ownership,
  contextual onboarding placement, first-value journeys, backlog reconciliation, and follow-up sequence.
- **Current behavior:** each public surface explains parts of itself, but there is no literal Guide route
  or shared onboarding authority; visitors must infer how the four Home paths, dossier, three Maze modes,
  Strategium, Apocrypha, and next actions fit together.
- **Owning layer:** VM-613 product-contract and recon artifacts under `docs/`; file-based Kanban owns task
  lifecycle. Production route owners remain unchanged.
- **Authoritative producer:** authored Markdown only; there is no generated artifact or runtime producer.
- **Existing machinery:** route ownership/atlas/data-flow docs, current route markup and scripts, existing
  browser/dev-review fixtures, RobDev/RobQA, Kanban, handoffs, and current product contracts.
- **Changed behavior:** repository documentation, task state, and review evidence only.
- **Protected behavior:** Placement/scoring/evidence/ranking/qualification/stopping, dossier semantic truth,
  SIRF, all Maze parsing/query/result/persistence behavior, saved readings, telemetry, navigation/runtime,
  Strategium content authority, Apocrypha source authority, and `/library/` compatibility.
- **Consumers/blast radius:** future VM-614 through VM-617 planning, global navigation design, Home and all
  functional-route onboarding decisions; no current runtime consumer.
- **Relevant states:** first visit, guest/saved reading, result/dossier, standalone/contextual Maze,
  Plain/Operator/Loom, success/no-result, Reading Finds empty/non-empty, desktop/mobile, keyboard, and
  reduced-motion evidence.
- **Smallest complete implementation:** one compact contract package, one reproducible runtime-recon
  witness set, explicit backlog reconciliation, four bounded follow-up outlines, and Owner Review handoff.
- **Non-goals:** no `/guide/` files, runtime UI/CSS/JS/navigation changes, semantic/data changes, telemetry,
  new fixtures/frameworks, encyclopedia, copied Strategium/Apocrypha content, video, VM-614 execution,
  commit, or push.
- **Stop conditions:** source/runtime contradiction requiring a new product decision; inability to witness a
  state safely; any proposed change to a protected authority; or completed RobQA package ready for owner
  judgment.

## Acceptance Criteria

### AC1 - Current-state evidence

A reproducible repository/runtime recon documents the primary first-user journeys across Home,
Archscry, dossier, Maze, Strategium, and Apocrypha, including mobile/global navigation and important
connected states.

### AC2 - Governing onboarding contract

A durable contract defines Guide ownership, the four-path relationship, `/guide/` namespace, top-level
navigation role, flavor hierarchy, concise V1 IA, contextual-help principles, and protected boundaries.

### AC3 - Friction and placement map

A concrete friction inventory and contextual-help matrix distinguish Guide landing, visible interface
copy, empty/recovery states, descriptive deep links, deeper Guide content, and no-change decisions.

### AC4 - Existing-work reconciliation

Related backlog/product work is mapped to the new onboarding architecture without silently rewriting
unrelated cards or creating competing ownership.

### AC5 - Implementation-ready decomposition

A bounded VM-614 through VM-617 sequence defines responsibilities, dependencies, non-goals, and Owner
Review gates while VM-613 leaves production runtime unchanged.

## Files Likely Impacted

- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/reports/2026-08-30-vm613-current-state-recon.md`
- `docs/design/2026-08-30-vm613-onboarding-maps.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- `artifacts/vm613-field-guide-onboarding/`
- this card, `docs/kanban/board.md`, and required handoff/index files

## Risks

- Current browser/dev-review harnesses have known Archscry startup and historical path limitations.
- Documentation can accidentally prescribe semantic or source behavior owned elsewhere.
- The Guide can become a fifth pillar, an encyclopedia, or a front-loaded tutorial if content ownership
  and contextual placement are not explicit.
- Related backlog cards overlap in journey outcomes but remain independently governed until the owner
  accepts reconciliation.

## Validation / RobQA

- QA tier: QA-0 documentation, planning, and non-runtime evidence artifacts.
- Validate exact current-state claims against source and runtime witnesses.
- Run targeted link/path/content checks, `git diff --check`, and confirm no production runtime file changed.
- Do not run CPU-heavy placement, all-identity, journey, synthetic, mutation, or recovery suites.
- Stop at **RobQA READY / Owner Review**; do not self-accept.

## Implementation Prompt

Execute the owner-supplied VM-613 prompt exactly. Produce the smallest durable onboarding contract and
runtime-recon package, reconcile related work, define VM-614 through VM-617, and stop at Owner Review
without product runtime changes.

## Notes

The card is architecture, product-contract, and runtime-recon work only. Runtime gaps are findings for
later cards, not authorization to repair the product in VM-613.

## Implementation Result

- Created the governing Field Guide/onboarding contract with the locked namespace, navigation role,
  naming hierarchy, four-route IA, contextual-help rules, accessibility contract, ownership boundaries,
  protected behavior, and first-value model.
- Created a current-state repository/runtime recon with 13 compact witnesses, durable dossier evidence
  locators, explicit safe-reproduction gaps, and a classified browser-smoke harness failure.
- Created the five-visitor journey map, material-friction inventory, contextual onboarding matrix, and
  existing-work reconciliation.
- Defined bounded VM-614 through VM-617 follow-up outlines without registering or executing them.
- Left production runtime unchanged and stopped at Owner Review.

## RobQA Result

- Classification: QA-0 documentation / non-runtime metadata.
- Disposition: **RobQA PASS — Owner Accepted** on 2026-08-31.
- Factual claims were checked against current route/runtime evidence, architecture/contracts, current
  all-37 dossier artifacts, and the existing backlog.
- Required contract/witness/backlog/sequence coverage and referenced paths passed targeted checks.
- `git diff --check` passed; changed paths are documentation/metadata only; no `/guide/` runtime exists.
- `npm.cmd run test:browser-smoke` failed in its known fresh Archscry initialization seam after Home;
  the gap is explicit and is not disguised as a product or VM-613 correctness failure.
- CPU-heavy validation: `NOT REQUIRED`; no product/Placement/query/state behavior changed.
- The owner accepted all five decisions and the bounded landing-intent hierarchy clarification.
- VM-615 may not claim complete fresh-user onboarding validation until the existing fresh-session
  Archscry path is repaired or an equivalent deterministic runtime witness proves the journey.

## Owner Acceptance

The owner accepted VM-613 with one bounded clarification on 2026-08-31. The accepted contract keeps all
eight landing intents as coverage while requiring a small primary decision set, fixes the dossier
directory as the canonical help-link placement, retains explicit/reversible Maze context, and treats six
reference recipes as a maximum rather than a quota. The fresh-session Archscry timeout remains a
non-blocking harness/evidence gap and is excluded from VM-614.
