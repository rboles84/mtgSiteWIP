# VM-634 - Temporarily Hide the Homepage Color Philosophy Strip

ID: VM-634
Title: Temporarily Hide the Homepage Color Philosophy Strip
Status: Owner Review

## Delivery

Record version: 1
Branch: codex/vm-634-hide-home-color-axis
Admission baseline: 4e536641f8fddd26ceec520455474a0965460114
Candidate: b2a2441970470e20b42311cc58117c43566b582b
RobQA: PASS at b2a2441970470e20b42311cc58117c43566b582b; QA-1 SAME-AGENT DISTINCT PHASE, Codex; see Evidence.
Owner: PENDING at b2a2441970470e20b42311cc58117c43566b582b; visual spacing review at /.
Integration: PENDING; stop at Owner Review, without push or merge.
Dependencies: None.
Decisions: Owner approved temporary hiding with collapsed space and preservation of the implementation in the 2026-09-06 task.
Evidence: [Implementation and QA handoff](../../handoffs/2026-09-06-0818-codex-vm634-hide-home-color-axis.md).

## Implementation contract

Hide the Home color philosophy wrapper using the HTML hidden attribute and a scoped display:none rule. Preserve the SVG, accessibility attributes, animation definitions, and JavaScript; removing hidden restores the strip. Bump only Home's stylesheet cache key and its existing validator expectations.

The authored Home HTML and route CSS own this presentation. No generator or data change is needed. Protect the Identity Signal panel, hero copy, parent grid, navigation, cursor ambience, Guide Beacon, all routes and persistence, and semantic/placement authority. No feature flag framework, public toggle, automatic reactivation, or redesign.

## Acceptance and validation

- The complete strip and its labels are hidden from initial HTML for all users, including without JavaScript, with no reserved footprint or accessibility exposure.
- The SVG contents and existing CSS/JavaScript are preserved; no script or responsive rule re-enables the wrapper.
- Removing hidden restores the previous strip without rebuilding its artwork.
- Run focused source/diff preservation checks, npm.cmd run lint:html, and git diff --check.
- QA-1, same-agent distinct phase after the candidate commit under RobQA; CPU-heavy suites are not required. Owner judges hero spacing at /; no broad browser or screenshot work.

## Boundaries and stop conditions

Stop for unexpected shared behavior, data, authority, or unrelated dirty-work changes. Follow RobDev and RobQA frozen gates and the standard delivery lifecycle. Do not integrate until Owner ACCEPT of the exact QA-passed candidate.
