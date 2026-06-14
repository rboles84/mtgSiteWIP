# VM-366 - JS HTML CSS Test Inventory

ID: VM-366
Title: JS HTML CSS Test Inventory
Status: done
Type: Testing / Documentation
Area: Frontend Tests, Unit Coverage, QA
Priority: low
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Inventory the current JavaScript, HTML, and CSS-adjacent automated test surface and answer whether the repo has true unit tests or needs additional ones.

## Scope

- Review package scripts and discovered test-like JavaScript files.
- Distinguish formal unit tests from custom Node assertion harnesses, static validators, smoke tests, visual regression tests, audits, and Lighthouse checks.
- Run the core finite checks relevant to JS/HTML/frontend coverage.
- Preserve runtime code, data, generated artifacts, and active VM-365 scope.

## Findings

- The repo does not currently use a formal unit-test framework such as Jest, Vitest, or Mocha.
- The closest unit tests are custom Node scripts using `node:assert/strict`, imported by `research/run-tests.js`.
- JavaScript behavior has substantial unit-like and contract coverage for placement, parser, Maze query contracts, mode switching, builder query generation, request dedupe, precon artifacts, dossier follow-ups, and presentation snapshots.
- HTML is covered by static validation and route/semantic smoke checks, not DOM-unit tests.
- CSS is not directly unit-tested. CSS behavior is covered indirectly through visual regression scripts and some source contract assertions in the Archscry dossier follow-up tests.

## Validation

- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.

## Recommendation

Do not add broad CSS or HTML unit tests for their own sake. Add focused JS unit tests when pure logic changes, and prefer DOM/browser smoke, accessibility, and visual regression coverage for route behavior and layout.

Highest-value future additions:

- Focused unit tests around pure rendering/formatting helpers before changing dossier UI output.
- Browser interaction tests for Archscry panel switching, precon reveal, retake confirmation, and Maze handoff flows.
- A lightweight accessibility checker for the public routes if the project wants automated semantics beyond the current string-based HTML validator.

## Related

- `docs/handoffs/2026-06-12-2352-codex-js-html-css-test-inventory.md`
- `docs/kanban/in-progress/VM-365-full-test-sweep-html-report.md`
- `docs/kanban/done/VM-287-full-automated-test-sweep.md`
- `docs/kanban/done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md`
- `docs/kanban/done/VM-033-non-ui-presentation-snapshot-harness.md`
- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
