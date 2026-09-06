# Vox Mana - RobQAPass

This is the practical usage guide for the repo-local RobQA skill. The governing authority is [RobQAPass](../../../docs/qa/RobQAPass.md); when this guide and the authority differ, the authority wins.

## 1. Authority

Use the RobDev implementation packet, active card, changed behavior, protected contracts, current test machinery, and applicable specialist controls. RobQA selects validation scope and prepares owner acceptance; it does not replace implementation grounding or product-specific authority.

## 2. Pre-QA Classification

Classify before selecting tests:

- QA-0: documentation, comments, or non-runtime metadata;
- QA-1: copy, presentation, or styling;
- QA-2: component interaction;
- QA-3: navigation, routing, or state transition;
- QA-4: placement, scoring, ranking, qualification, or result meaning;
- QA-5: integration, deployment, migration, or production-critical change.

Name the exact changed behavior, protected behavior, realistic regressions, and any stricter controls.

## 3. Test-Cost Gate

Use the smallest deterministic validation set that protects the changed risk.

OWNER-VISUAL MODE is the Vox Mana default. The Owner owns subjective visual QA; Codex selects the lowest
reliable objective layer and uses browser automation only when the changed behavior materially requires it.
Screenshots, visual regression, animation-fidelity waits, and broad viewport passes are opt-in. Historical
test lists do not create a run obligation.

Before material rendered/browser work, ask:

1. Is this evidence objectively machine-verifiable, or am I spending compute approximating a Product Owner judgment?
2. If automation fails here, can the Owner answer the product question faster with a bounded manual check?

Apply the canonical [Owner-First Visual Verification Policy](../../../docs/qa/RobQAPass.md#owner-first-visual-verification-policy). It controls rendered-visual scope, Owner escalation, and the honest distinction between a Product: Owner Manual PASS and an Automated test: FAIL / known harness debt.

Before a CPU-heavy or exhaustive suite, state:

- what changed that the suite protects;
- what defect it can catch that targeted checks cannot;
- whether untouched behavior already has a valid baseline;
- why the cost is proportionate.

If there is no concrete answer, do not run the suite. Scope drift returns to RobDev; it does not silently justify more testing.

## 4. Objective Product Contract First

For visible changes, verify the real changed contract at the lowest reliable objective layer. Do not open a
browser merely because the product is visible. Use a focused browser case only when route, DOM state,
keyboard/focus, dialog, persistence, accessibility state, interaction, or required containment behavior
cannot reasonably be protected more cheaply below the browser layer.

- verify the intended state or journey contract;
- read changed authored or emitted copy in order;
- verify promised destination, active state, focus, and scroll when changed;
- inspect a relevant narrow width only when objective responsive behavior is directly in scope;
- check repeat, close, return, Back/Forward, refresh, and recovery only where applicable.

The selected layer must actually protect the objective changed contract. The Owner judges appearance,
hierarchy, feel, comfort, spacing, animation, and responsive visual quality.

## 5. Copy And Product Language

Check that content is clear, useful, natural, non-repetitive, honest about uncertainty, and free of internal audit or implementation language.

A heading, modal, detail view, result, or recovery action must add the value its label promises. Technical validity does not excuse confusing or mechanically generated presentation.

## 6. Visual Evidence

Separate:

- deterministic geometry and DOM evidence at pinned normal conditions;
- human optical judgment at normal viewing and useful magnification.

Inspect the actual owning element, parent, computed styles, focus, overflow, clipping, and pseudo-element
styles only when an objective acceptance criterion requires that evidence. Geometry can pass while the
visible result still looks wrong; that remaining optical judgment belongs to the Owner.

## 7. Interaction And State

For affected interaction contracts, verify relevant hit areas, pointer and keyboard behavior, one action per
trigger, stale async protection, close/reopen, focus restoration, responsive containment, and state
persistence. Use a real browser only when browser semantics or human-representative interaction are material
to the changed objective behavior.

For navigation, URL correctness is only one assertion. The promised content must be active, visible, focused, and scrolled into the intended state.

## 8. Truth And Failure Classification

Distinguish:

- product defect;
- test-harness defect;
- environment or network limitation;
- expected bounded behavior.

Do not rewrite product data or authority to compensate for an unproven harness, cache, network, or environment failure.

## 9. Owner Findings

Treat raw owner notes as product evidence. Reproduce the exact path, describe expected versus actual behavior, classify severity and defect class, and identify the smallest systemic correction.

Owner example wording expresses intent unless explicitly locked. Preference-only notes remain product choices rather than automatic defects.

## 10. Finding-To-Invariant Rule

Ask:

> What general test did the owner just perform that found this?

Convert a real finding into the narrowest useful systemic invariant. Do not patch only one string, identity, card, route, or viewport, and do not turn a contextual defect into a global ban.

## 11. Test It Like Rob

Before handoff:

- verify the changed contract at the lowest reliable objective layer;
- read the changed authored or emitted text top to bottom;
- use a focused browser interaction only when objective changed risk justifies it;
- inspect desktop or narrow state only when that state owns an objective changed risk;
- test the changed transition and repeat use;
- confirm public claims match their data and logic;
- record concrete objective evidence rather than only `PASS`.

## 12. Owner Review

Agents verify deterministic facts. The owner judges product feel, visual balance, natural wording, usefulness, intuitive flow, genuine ambiguity, and high-impact choices.

Provide the policy's compact Owner-check template when subjective judgment or an ambiguous user-visible automation failure remains. Do not ask the owner to click around, review every identity, or re-prove machine-verifiable facts.

## 13. Handoff

Record:

- QA tier, changed behavior, and protected behavior;
- each selected test, reason, and result;
- expensive suites intentionally skipped and why;
- CPU-heavy status;
- objective evidence and browser justification when applicable;
- owner findings converted to invariants;
- remaining owner judgment;
- bounded owner commands, routes, states, and viewports;
- exact candidate SHA when repository governance requires it.

## 14. Completion

Apply the governing [engineering exit criteria](../../../docs/qa/RobQAPass.md#24-robqapass-exit-criteria)
and [QA execution independence rule](../../../docs/qa/RobQAPass.md#qa-execution-independence). PASS binds
sufficient engineering evidence to the exact candidate with Owner Review still pending. Owner acceptance
and integration are separate [workflow states](../../../docs/reference/workflow.md#lifecycle-states-and-transitions).
Do not issue READY as a competing RobQA verdict or reinterpret historical review records.
