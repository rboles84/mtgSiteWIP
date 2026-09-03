# VM-617 Reference and Final Onboarding Red-Team — Handoff

- **Agent:** Codex
- **Task requested:** Execute VM-617 discovery/red-team only; reconcile the original reference/cross-link plan against accepted VM-614–621, prepare an implementation-ready Owner decision packet, then stop.
- **Related card:** VM-617
- **Branch / baseline:** `codex/vm-617-discovery` from accepted `main` / `origin/main` `5b1b7b3bf629cecb412b1a272df72ac9f632d489`.
- **Gates:** repo-local `robdev` / `robqa`, frozen `docs/dev/RobDevPass.md` / `docs/qa/RobQAPass.md`.

## Files reviewed

Required skills/gates, handoff index and latest VM-614–621 handoffs, board, accepted Field Guide contract, VM-613 sequence, VM-614–621 cards, VM-006 and adjacent backlog cards, route-ownership matrix, current Home/Guide/Archscry/Maze/Strategium/Apocrypha/Library owners, Beacon/guided-reading reports and contracts, focused browser harnesses, and current official Scryfall outbound reference placement.

## Files changed

- `docs/kanban/in-progress/VM-617-reference-cross-links-final-onboarding-validation.md`
- `docs/reports/2026-09-02-vm617-reference-final-onboarding-redteam.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What changed and why

Registered VM-617 as In Progress — Discovery and produced the requested Owner packet. The red team recommends deferring—not building or superseding—`/guide/reference/`, proposes zero new cross-links and zero recipes, classifies the historical fresh-session Archscry timeout as harness/product boundary unproven, and routes any follow-up to VM-006. This records the current evidence without altering accepted product behavior.

## Decisions made

- `/guide/reference/`: **defer**; retain the accepted reserved route.
- Cross-links: **no change**; current next-decision paths are sufficient.
- Scryfall: local reference content is not justified; existing visible query/Scryfall handoff and the official syntax link retain authority.
- Fresh session: do not claim pass; do not repair or weaken the test; a separate VM-006 diagnostic is the only recommended follow-up if prioritized.
- Program: stop dedicated Field Guide/onboarding expansion after Owner disposition unless separately authorized evidence opens a product-specific card.

## RobDev compact packet

- **Changed behavior:** documentation/card/board/handoff state only.
- **Protected behavior:** every runtime route, navigation, Beacon, guided-reading, Driver, Maze query/parser, Placement/dossier semantics, persistence, telemetry, Strategium, Apocrypha, Library alias, tests, and existing review outputs.
- **Existing machinery reused:** accepted contracts, reports, route owners, focused browser/static harnesses, and original VM-617 authority as input.
- **Consumers inspected:** Home, all three Guide routes, Archscry/dossier, Maze modes/recovery, Strategium, Apocrypha, Library compatibility, shared topbar/Beacon/guided-reading owners.
- **Non-goals / stop:** no production implementation, no new route/link, no harness repair, no acceptance or merge; stop at Owner review.

## Risks / uncertainties

The fresh Archscry path remains unproven after reset-storage browser smoke timeout. The direct official Scryfall syntax page was access-restricted during browser research, so discovery preserves the existing official outgoing link and does not reproduce syntax locally. The in-app browser showed a persisted current dossier; it was not treated as proof of a genuinely fresh session.

## Tests run

- PASS: `npm run test:vm619-guided-reading`
- PASS: `npm run test:vm620-guide-beacon`
- PASS: `npm run test:vm621-guided-reading`
- PASS: `npm run test:reading-guide`
- PASS: `npm run test:maze-onboarding`
- PASS: `npm run test:vm621-guided-reading-browser`
- PASS: `npm run test:vm619-guided-reading-browser`
- PASS: VM-616 rendered browser contract, with witnesses outside the repository.
- KNOWN LIMITATION reproduced: `npm run test:browser-smoke` times out after storage reset at first-answer/progress.
- PASS: QA-0 final documentation review confirms the required decision matrix, cross-link inventory, journey matrix, fresh-session disposition, backlog reconciliation, five acceptance criteria, and `git diff --check`.

## Not touched

All runtime and test files; `/guide/reference/`; routes; cross-links; any existing output directory; production data; source/generated artifacts; telemetry; persistence; branch history; commits; remotes; Owner acceptance.

## Follow-up recommendations

Owner decides the five bounded questions in the report. If reference is desired, authorize a new evidence-backed card with a single demonstrated retrieval problem. If fresh-session certainty is needed, authorize VM-006-only reproduction/classification before a repair. Otherwise archive/close this discovery after Owner disposition and stop the onboarding program.

## Next suggested agent

Owner review.
