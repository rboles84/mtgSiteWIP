# Codex Handoff - VM-430 Vox Mana Comprehensive QA Test Plan

## Agent Name

Codex

## Task Requested

Create a comprehensive, execution-ready QA test plan for Vox Mana as a Commander / Magic: The Gathering identity and taste compass, grounded in actual repo files, routes, scripts, data, selectors, behavior, known risks, and VM ticket workflow.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-29-2332-codex-vm429-self-snapshot.md`
- `docs/handoffs/2026-06-29-1856-codex-vm428-deep-audit-report.md`
- `docs/handoffs/2026-06-29-0143-codex-vm427-main-promotion-sweep.md`
- `docs/handoffs/2026-06-29-0013-codex-vm426-reading-finds.md`
- `docs/handoffs/2026-06-28-2040-codex-vm422-private-deck-links.md`
- `docs/handoffs/2026-06-27-1903-codex-vm424-homepage-positioning.md`
- `docs/handoffs/2026-06-23-2033-codex-vm416-strategium-content-pass.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-429-vox-mana-self-snapshot.md`
- `docs/kanban/done/VM-428-vox-mana-deep-audit-report.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-006-archscry-maze-verification-repeat-visit-polish.md`
- `docs/kanban/backlog/VM-007-commander-dossier-quality-link-follow-up.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/contracts/maze-query-contract.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `package.json`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`
- `assets/js/index.js`
- `assets/js/adaptive-placement.js`
- `assets/js/commander-dossier.js`
- `assets/js/vm-radar.js`
- `assets/js/graph.js`
- `assets/js/shared.js`
- `assets/js/site-flags.js`
- `assets/js/strategium.js`
- `assets/js/apocrypha.js`
- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `research/research-init.js`
- `research/research-search.js`
- `research/maze-query-core.js`
- `research/maze-scratchpad-store.js`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/precons/vox-mana-precon-catalog.json`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm422-live-rls-check.mjs`

## Files Changed

- `docs/qa/vox-mana-test-plan.md`
- `docs/kanban/done/VM-430-vox-mana-comprehensive-test-plan.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-29-2340-codex-vm430-qa-test-plan.md`

## What Changed

- Added a comprehensive QA test plan under `docs/qa/`.
- Added VM-430 as the completed Kanban card for the QA plan.
- Updated the Kanban board Done list with VM-430.
- Added this handoff file.
- Added VM-430 to the handoff index.

## Why It Changed

The user requested a practical, execution-ready Vox Mana QA test plan from a Senior QA Lead/SDET/release-readiness perspective. The plan needed to be grounded in actual repo evidence rather than a generic template, and the project workflow requires Kanban and handoff traceability for major documentation work.

## Decisions Made

- Treated the task as documentation and QA strategy work only.
- Used VM-430 because VM-429 already exists for the self-snapshot artifact.
- Preserved VM-428 and VM-429 dirty/untracked documentation artifacts.
- Did not touch runtime code, generated JSON/data, source packets, visual baselines, Supabase SQL/live state, or MTG factual content.
- Marked proposed automation as proposed instead of implying it already exists.
- Treated Supabase/private deck-link tests as conditional on live credentials/schema proof.
- Included current 37-identity runtime evidence while calling out older 30/36/37 documentation drift as a risk.

## Risks / Uncertainties

- The QA plan depends on repo evidence available at review time; live Supabase, deployed Pages behavior, Safari/iOS behavior, and external link freshness were not re-proved by this documentation task.
- VM-422 live RLS/account behavior remains pending credentials and schema verification.
- Visual baselines remain stale/waived until a separate acceptance/refresh ticket.
- Home Lighthouse performance remains below the current 90 threshold per VM-427 evidence.
- Terms/Privacy stale-copy risk is identified but not fixed here.
- The plan proposes scripts/specs/CI but does not implement them.

## Tests Run

- `git diff --check -- docs/qa/vox-mana-test-plan.md docs/kanban/done/VM-430-vox-mana-comprehensive-test-plan.md docs/kanban/board.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-29-2340-codex-vm430-qa-test-plan.md` - passed with only existing-style LF-to-CRLF normalization warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- `rg "^## ([0-9]+|0)\\." docs\\qa\\vox-mana-test-plan.md` - confirmed sections `0` through `26` are present.
- `git status --short` - reviewed final dirty state, including preserved existing VM-428 and VM-429 untracked documentation artifacts plus new VM-430 docs.

Runtime commands such as `npm.cmd test`, `npm.cmd run test:frontend-smoke`, and `npm.cmd run test:parser` were not run because this task only added QA/Kanban/handoff Markdown and did not change application code, scripts, data, or generated assets.

## Not Touched

- Runtime application code.
- Generated JSON/data.
- `data/raw-factions/` source packets.
- MTG lore, card, commander, precon, or rules facts.
- Supabase SQL and live Supabase state.
- Visual baselines.
- Existing VM-428 and VM-429 artifacts except adjacent board/index additions.

## Follow-Up Recommendations

1. Implement the proposed core Playwright route smoke and data-integrity validator first.
2. Run VM-422 live RLS proof before treating private deck links as production-ready.
3. Restore or replace the missing profile Supabase SQL traceability artifact.
4. Run mobile/cross-browser QA, especially Safari/iOS and Maze Reading Finds return loops.
5. Refresh or formally waive visual baselines.
6. Review Terms/Privacy and feature-flag copy against current product scope.
7. Add minimal CI for deterministic QA commands.

## Next Suggested Agent

Test Strategist / SDET to implement the first QA automation ticket, followed by Documentation Steward for Terms/Privacy and stale-count drift cleanup.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-430-vox-mana-comprehensive-test-plan.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/reference/data-contracts.md`
- `docs/reference/source-generated-guardrails.md`
