# VM-496 - Vox Mana Self-Snapshot 2026-07-10

## Status

Done

## Summary

Create a fresh, evidence-first self-snapshot of the current `main` branch after VM-495. Audit product identity, philosophy, active themes, technical architecture, source authority, UX, voice, readiness, open loops, audiences, strategic options, anti-fits, comparison hooks, and the next ten recommended tickets.

## Scope

- Complete the required handoff, Kanban, and architecture pre-flight.
- Use the VM-459 full snapshot and VM-474 delta only as historical baselines; verify current claims against `main`.
- Inspect public route copy and rendered desktop/mobile behavior for Home, Archscry, Maze, Strategium, and Apocrypha.
- Map canonical, curated, generated, historical, and live-unproven data sources.
- Run proportionate deterministic checks and distinguish fresh results from handoff-only evidence.
- Save the durable report under `docs/audits/`.
- Update the Kanban board, handoff index, and required handoff record.

## Acceptance Criteria

- [x] The report contains all 15 requested sections and the exact six-line executive-summary format.
- [x] Evidence-backed observations and reasonable inference are explicitly separated.
- [x] Concrete repo paths, VM IDs, UI copy, functions, data files, and test evidence support material claims.
- [x] Stale, contradictory, missing, weak, or live-unproven evidence is called out.
- [x] The source-confidence table and 16-category readiness scorecard are complete.
- [x] The ten recommended tickets are small, shippable, and remain recommendations rather than created cards.
- [x] Runtime behavior, generated data, MTG facts, Supabase state, visual baselines, and deployment are unchanged.
- [x] Validation and handoff traceability are complete.

## Validation

- `npm.cmd run test:copy-boundaries` - passed across 14 live-copy files.
- `npm.cmd run test:route-metadata` - passed for eight public route heads.
- `npm.cmd run dossier:audit` - completed for 37 primary and 76 adjacent dossiers; 113 warnings and zero failures remain explicit audit evidence.
- `npm.cmd run test:parser` - 226 cases passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run validate:source-generated` - passed for the default JESKAI/MARDU target set with two model-owned warnings.
- `npm.cmd test` - passed, including 37 placement golden paths, 625 gate-bias paths, Maze contracts, precon artifacts, dossier follow-ups, and presentation snapshots.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - desktop and mobile Home/Archscry/Maze/Reading Finds/return handoff passed.
- `npm.cmd run test:lighthouse:home` - Performance 91, Accessibility 100; the harness emitted a post-report Edge cleanup access-denied warning while retaining exit code 0.
- Structural report checks confirmed all 15 numbered sections and the exact six requested summary labels.
- `git diff --check` - passed at completion.

## Not In Scope

- Runtime HTML/CSS/JS fixes or redesign.
- Generated artifact edits or external Scryfall refreshes.
- New lore, card, commander, rules, or precon claims.
- Live Supabase tests or account/deck-link reactivation.
- Visual baseline refresh, deployment, commit, or push.

## Completion Notes

- Added `docs/audits/2026-07-10-vox-mana-self-snapshot.md` as the durable current snapshot.
- Verified the deployed primary routes and current GitHub validation/Pages state in the rendered browser.
- Identified the recommendation-boundary contradiction, unsupported precon comparative claims, stale Colorless lifecycle evidence, dossier warning/template debt, Maze nested-interaction issue, and weak repository entry point as current high-leverage gaps.
- Scored the current project as public beta/portfolio ready but not monetization ready.
- Kept the requested ten VM ticket IDs as placeholders; no speculative backlog cards were created.

## Related Work

- VM-459 - 2026-06-30 Vox Mana Self-Snapshot Refresh.
- VM-474 - Vox Mana Delta Reevaluation.
- VM-495 - Release Test Loose Ends.
- VM-469 - External Reviewer Two-Week Test.
- VM-422 / VM-446 - deferred account deck links and conditional live RLS proof.

