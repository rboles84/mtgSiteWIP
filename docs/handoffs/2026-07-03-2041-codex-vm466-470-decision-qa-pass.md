# Codex Handoff - VM-466 Through VM-470 Decision And QA Pass

## Agent Name

Codex

## Task Requested

Use AGENTS.md and run preflight first, then implement VM-466 through VM-470:

- VM-466 Loom V0/V1 Naming And Concept Seed Decision.
- VM-467 Browser Smoke CI Pilot.
- VM-468 Deployed Static Smoke And Social Preview Check.
- VM-469 External Reviewer Two-Week Test.
- VM-470 Account Scope Freeze And Reactivation Checklist.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-2058-codex-vm457-loom-foundation-deep-dive.md`
- `docs/handoffs/2026-06-30-2131-codex-vm458-deck-saving-deferral.md`
- `docs/handoffs/2026-07-03-0951-codex-vm461-465-readiness-pass.md`
- `docs/handoffs/2026-06-30-1421-codex-vm447-minimal-ci.md`
- `docs/handoffs/2026-06-30-1429-codex-vm448-browser-smoke.md`
- `docs/handoffs/2026-06-30-1455-codex-vm451-route-metadata.md`
- `docs/handoffs/2026-06-30-1501-codex-vm452-public-demo-case-study.md`
- `docs/kanban/done/VM-457-loom-foundation-deep-dive.md`
- `docs/kanban/done/VM-461-account-scope-freeze-reactivation-checklist.md`
- `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/data-contracts.md`
- `.github/workflows/validation.yml`
- `package.json`

## Files Changed

- `.github/workflows/browser-smoke.yml`
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- `docs/qa/2026-07-03-browser-smoke-ci-pilot.md`
- `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md`
- `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/reference/data-contracts.md`
- `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/kanban/done/VM-466-loom-v0-v1-naming-and-concept-seed-decision.md`
- `docs/kanban/done/VM-467-browser-smoke-ci-pilot.md`
- `docs/kanban/done/VM-468-deployed-static-smoke-and-social-preview-check.md`
- `docs/kanban/blocked/VM-469-external-reviewer-two-week-test.md`
- `docs/kanban/done/VM-470-account-scope-freeze-and-reactivation-checklist.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-03-2041-codex-vm466-470-decision-qa-pass.md`

Status-move cleanup:

- Removed temporary `docs/kanban/in-progress/VM-466-loom-v0-v1-naming-and-concept-seed-decision.md`.
- Removed temporary `docs/kanban/in-progress/VM-467-browser-smoke-ci-pilot.md`.
- Removed temporary `docs/kanban/in-progress/VM-468-deployed-static-smoke-and-social-preview-check.md`.
- Removed temporary `docs/kanban/in-progress/VM-469-external-reviewer-two-week-test.md`.
- Removed temporary `docs/kanban/in-progress/VM-470-account-scope-freeze-and-reactivation-checklist.md`.

## What Changed

- Created the VM-466 Loom naming/seed decision note.
- Approved Loom v0/v1 naming, Explorer Mode as first slice, and a 10-concept seed.
- Added a manual `Vox Mana Browser Smoke Pilot` GitHub Actions workflow.
- Documented that browser smoke should not be a push/PR hard gate until a hosted manual run is observed green.
- Ran deployed browser checks against `https://voxmana.io/` public routes and documented route-load pass plus social metadata hold.
- Created a VM-469 reviewer protocol/log but left VM-469 blocked because five outside reviewer responses are required.
- Reaffirmed the account-backed deck-saving freeze in the strategy note, data contract, VM-422, and VM-446.
- Updated the board and handoff index.

## Why It Changed

VM-466 through VM-470 were readiness/decision follow-ups after VM-457 through VM-465. They convert Loom review questions into a scoped implementation seed, keep browser smoke from becoming a brittle hard gate before hosted proof, verify the deployed custom-domain state, set up external reviewer evidence collection, and prevent dormant account deck-saving artifacts from drifting back into active public claims.

## Decisions Made

- Keep `The Loom` label and define current Visual Builder as Loom v0.
- Treat Loom v1 as concept/thread/query Explorer Mode first, not a graph-only implementation.
- Approve 10 seed concepts: Flying, Card Draw, Token Generation, Removal, Tempo, Recursion, Control, Storm / Spells Matter, Sacrifice, Aristocrats.
- Choose manual/on-demand browser-smoke CI first.
- Treat deployed route loading as pass but deployed social preview metadata as no-go until redeploy.
- Keep VM-469 blocked until actual external reviewer answers exist.
- Reaffirm VM-422/VM-446 backlog status and hidden account-backed deck-saving scope.

## Risks / Uncertainties

- GitHub-hosted browser smoke has not been observed green because no push/dispatch happened in this task.
- The deployed `voxmana.io` site appears stale versus local VM-451 metadata; public sharing previews should wait for redeploy and recheck.
- VM-469 still needs five real outside reviewers.
- Visual baselines remain waived from prior work.
- Live Supabase account/deck-link RLS remains unproven and out of active release scope.
- The worktree was already dirty with many unrelated runtime/docs files before this task; they were preserved.

## Tests Run

- Deployed browser smoke of `https://voxmana.io/`, `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/`, `/library/`, `/privacy/`, and `/terms/` - routes loaded; no browser console errors observed; social/canonical metadata stale on deployed HTML.
- `npm.cmd run test:route-metadata` - passed for 8 local public route heads.
- `npm.cmd run test:copy-boundaries` - passed.
- Visible account deck-saving surface `rg` scan - only deferred/negative docs, dormant contract language, and ordinary outbound deck-resource references found.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `npm.cmd run lint:js` - passed.
- `git diff --check -- ...` - passed with line-ending warnings only.

## Not Touched

- Runtime app behavior.
- Generated JSON/data.
- Raw MTG lore/source packets.
- Visual baselines.
- Supabase live state, credentials, SQL execution, or RLS policies.
- Dormant deck-link UI/service code.
- Git staging, commit, push, branch, tag, or deployment.

## Follow-Up Recommendations

- After pushing/deploying, dispatch `Vox Mana Browser Smoke Pilot` and record the hosted run URL/status before making browser smoke a hard gate.
- Redeploy current route metadata, then rerun the VM-468 deployed metadata/social preview check.
- Owner should run VM-469 with five external reviewers and record answers in `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`.
- Create a narrow implementation card for Loom v1 Explorer Mode concept registry plus query adapter.
- Keep VM-422/VM-446 in backlog until account-backed deck saving is explicitly reactivated and live RLS proof passes.

## Next Suggested Agent

Release steward for push/deploy/Actions observation, then owner/product reviewer for VM-469 external responses or a Loom implementation planner for the Explorer Mode registry spike.

## Related Kanban Card, Docs, Or Plans

- VM-466
- VM-467
- VM-468
- VM-469
- VM-470
- VM-457
- VM-448
- VM-451
- VM-452
- VM-461
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/qa/2026-07-03-browser-smoke-ci-pilot.md`
- `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md`
- `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`
- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
