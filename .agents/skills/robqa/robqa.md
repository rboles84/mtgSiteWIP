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

Before a CPU-heavy or exhaustive suite, state:

- what changed that the suite protects;
- what defect it can catch that targeted checks cannot;
- whether untouched behavior already has a valid baseline;
- why the cost is proportionate.

If there is no concrete answer, do not run the suite. Scope drift returns to RobDev; it does not silently justify more testing.

## 4. Rendered Product First

For visible changes, open the real affected route or deterministic review case.

- follow the intended journey;
- read changed copy in rendered order;
- click the controls the user clicks;
- inspect the promised destination, active state, focus, and scroll;
- inspect relevant desktop and narrow widths;
- check repeat, close, return, Back/Forward, refresh, and recovery where applicable.

Source-only green checks do not pass a visible change.

## 5. Copy And Product Language

Check that content is clear, useful, natural, non-repetitive, honest about uncertainty, and free of internal audit or implementation language.

A heading, modal, detail view, result, or recovery action must add the value its label promises. Technical validity does not excuse confusing or mechanically generated presentation.

## 6. Visual Evidence

Separate:

- deterministic geometry and DOM evidence at pinned normal conditions;
- human optical judgment at normal viewing and useful magnification.

Inspect the actual owning element, parent, computed styles, focus, overflow, clipping, and pseudo-element styles where relevant. Geometry can pass while the visible result still looks wrong.

## 7. Interaction And State

For affected controls, verify real hit areas, pointer and keyboard behavior, one action per trigger, stale async protection, close/reopen, focus restoration, responsive containment, and state persistence.

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

- inspect the whole changed product surface;
- read the changed text top to bottom;
- click actual controls and edges;
- inspect desktop and relevant narrow states;
- test the changed transition and repeat use;
- confirm public claims match their data and logic;
- record concrete rendered evidence rather than only `PASS`.

## 12. Owner Review

Agents verify deterministic facts. The owner judges product feel, visual balance, natural wording, usefulness, intuitive flow, genuine ambiguity, and high-impact choices.

Provide the shortest deterministic cases that exercise the changed risk. Do not ask the owner to click around, review every identity, or re-prove machine-verifiable facts.

## 13. Handoff

Record:

- QA tier, changed behavior, and protected behavior;
- each selected test, reason, and result;
- expensive suites intentionally skipped and why;
- CPU-heavy status;
- rendered evidence when applicable;
- owner findings converted to invariants;
- remaining owner judgment;
- bounded owner commands, routes, states, and viewports;
- exact candidate SHA when repository governance requires it.

## 14. Completion

RobQA READY means the deterministic risk-proportional checks and required self-QA are complete with no known correctness blocker.

RobQA PASS requires the bounded owner review when one is required, no blocker or major defect, explicit disposition of remaining minor issues, and exact candidate/version/SHA binding where applicable.
