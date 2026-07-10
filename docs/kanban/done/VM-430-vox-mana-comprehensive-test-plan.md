# VM-430 - Vox Mana Comprehensive QA Test Plan

Status: Done
Owner: Codex
Created: 2026-06-29
Completed: 2026-06-29
Related artifact: `docs/qa/vox-mana-test-plan.md`

## Task

Create a comprehensive, repo-grounded test plan for Vox Mana as a Commander identity and taste compass, covering release readiness, product quality goals, scope, strategy, user journeys, feature matrices, data integrity, route-specific plans, accessibility, responsive/cross-browser coverage, performance, security/privacy, content QA, visual QA, automation, smoke/regression checklists, scorecards, templates, top risks, recommended QA tickets, and final QA verdict.

## Scope

In scope:

- Review recent handoffs, board state, related cards, architecture/reference docs, current audits, route files, runtime data, scripts, selectors, storage keys, and known release gaps.
- Save the QA plan as a durable docs artifact under `docs/qa/`.
- Add Kanban and handoff traceability.
- Preserve existing VM-428 and VM-429 docs/audit artifacts and dirty working tree state.

Out of scope:

- Runtime application code changes.
- Generated JSON/data changes.
- MTG lore, card, commander, or precon fact edits.
- Supabase SQL/live state changes.
- Visual baseline refreshes.
- CI or automation implementation.

## Evidence Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-29-2332-codex-vm429-self-snapshot.md`
- `docs/handoffs/2026-06-29-1856-codex-vm428-deep-audit-report.md`
- Recent VM-422, VM-424, VM-426, VM-427, VM-428, and VM-429 handoffs/cards
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-006-archscry-maze-verification-repeat-visit-polish.md`
- `docs/kanban/backlog/VM-007-commander-dossier-quality-link-follow-up.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- Public route files and key JS/data files referenced by the QA plan

## Deliverable

Saved:

- `docs/qa/vox-mana-test-plan.md`

The artifact includes all requested sections:

1. Test Plan Summary
2. Product Quality Goals
3. Scope
4. Test Strategy
5. Critical User Journeys
6. Feature Test Matrix
7. Data Integrity Test Plan
8. Archscry-Specific Test Plan
9. Maze-Specific Test Plan
10. Strategium-Specific Test Plan
11. Apocrypha-Specific Test Plan
12. Accessibility Test Plan
13. Responsive And Cross-Browser Test Plan
14. Performance Test Plan
15. Security And Privacy Test Plan
16. Content QA Plan
17. Visual QA Plan
18. Automation Strategy
19. Smoke Test Checklist
20. Regression Test Checklist
21. Release Readiness Scorecard
22. Bug Report Template
23. Test Case Template
24. Top Risks
25. Recommended QA Tickets
26. Final QA Verdict

## Acceptance Criteria

- [x] Plan is grounded in actual repo files, scripts, data files, routes, selectors, storage keys, and handoff/card evidence.
- [x] Confirmed facts, assumptions, and unknowns are separated.
- [x] Out-of-scope and conditional-scope items are explicitly called out.
- [x] Existing scripts are distinguished from proposed automation.
- [x] Supabase/backend tests are conditional on repo/live evidence and credentials.
- [x] QA tickets are small, testable, and release-confidence focused.
- [x] Handoff and board trail are updated.

## Validation

Planned checks:

- Markdown structure review.
- `git diff --check` for changed QA/handoff/Kanban docs.
- Final git status review.

## Notes

This is a documentation and QA strategy artifact only. It intentionally does not implement the proposed scripts, Playwright specs, CI workflow, visual baseline refresh, or live Supabase proof.
