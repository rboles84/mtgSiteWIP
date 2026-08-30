# VM-596 WUBRG Finalization — Blocked Handoff

Agent name: Codex

Task requested: Complete the approved Five-Color semantic repair, correct the Turtle Power! face commander, reconcile Rainbow Payoffs, verify displayed WUBRG precons with official Wizards sources, perform final rendered QA, and stop at Owner Review without commit or push.

Related Kanban card: `docs/kanban/in-progress/VM-596-wubrg-semantic-repair.md`

## Files Reviewed

- VM-596 control record and prior handoff; current board and handoff index; RobDev/RobQA frozen gates.
- WUBRG raw profile, authored/generated dossier catalog, presentation/foundation composers, focused tests, source/generated precon catalog and producer.
- Official Wizards decklists for Painbow, Dance of the Elements, Sliver Swarm, Turtle Power!, and Draconic Domination.

## Files Changed

- Authored WUBRG: `data/raw-factions/wubrg/wubrg.profile.json`, `data/dossier/identity-dossier-content.source.json`, `assets/js/archscry/archscry-presentation.js`, and `assets/js/archscry/dossier/foundation.js`.
- Generated: `data/dossier/identity-dossier-content.catalog.json` and `data/precons/vox-mana-precon-catalog.json`.
- Precon authority: `data/precons/vox-mana-precons.source.json`.
- Guardrails: dossier producer, WUBRG focused test, and affected WUBRG precon expectation.
- Governance: VM-596 card, board, handoff index, and this handoff.

## What Changed

- Test the Fit now says all-five access must materially serve the commander, tribe, mechanic, theme, toolbox, or payoff; it no longer requires a literal all-five payoff.
- How This Plays now explains deck-specific integration, toolbox, typal, and rainbow modes while retaining the semantic boundary in metadata.
- Rainbow Payoffs is a raw-profile-backed fourth What to Look For item; Domain is not called inherently Rainbow/Five-Color.
- Turtle Power! now records Leonardo, the Balance as face/main commander and Heroes in a Half Shell as alternate. The five WUBRG displayed products point to official Wizards decklists and retain exact-color fit.

## Decisions Made

- Reused the accepted WUBRG profile/dossier/precon producer chain; no new WUBRG-only mechanism or upstream generated evidence was introduced.
- Did not hand-edit `data/factions.json` when the shared producer could not finish.

## Risks / Uncertainties

- `npm.cmd run build:factions` failed four times with `EPERM` opening `data/placement-model.schema.json`, which appears concurrently locked. This leaves the generated faction projection stale and rendered Turtle Power! still shows Heroes in a Half Shell.

## Tests Run

- PASS `npm.cmd run build:identity-dossier-content`
- PASS `npm.cmd run build:precons`
- PASS `npm.cmd run test:wubrg-semantic-repair`
- PASS `npm.cmd run test:identity-dossier-content`
- PASS `node tests/precons/precon-artifact-tests.js`
- PASS `npm.cmd run test:source-generated`
- PASS `npm.cmd run test:semantic-readiness`
- PASS `npm.cmd run lint:js`
- PASS `git diff --check`
- BLOCKED `npm.cmd run build:factions` — `EPERM` on concurrently locked `data/placement-model.schema.json`.

## Rendered QA

- PASS: direct WUBRG desktop source/catalog rendering at local Start Here and Identity & Play: hero, material-access Test the Fit, readable spellcraft, and Rainbow Payoffs are present with no console errors.
- BLOCKED: precon UI still reflects stale faction-projection data for Turtle Power!, so final WUBRG/mobile/neighbor regression cannot be certified.

## Not Touched

- Certified WUBRG claims, raw Placement, scoring, aliases, routes, preview contracts, any non-WUBRG authored semantics, concurrent VM-595/VM-597 work, commits, pushes, deployment, and lock-owning processes.

## Follow-up Recommendations

1. Once the file lock is released, run `npm.cmd run build:factions`.
2. Rerun the focused WUBRG/source/precon checks and rendered desktop/mobile WUBRG plus White, Azorius, Temur, and Lorehold regression.
3. Confirm Turtle Power! visibly renders Leonardo, the Balance, then restore VM-596 to Owner Review Ready. Do not commit or push unless separately authorized.

Next suggested agent: the current VM-596 owner/implementer after the shared file lock clears.

## Owner-Finding Follow-up

- The owner identified cross-section repetition after inspecting the rendered WUBRG dossier: Start Here, Test the Fit, and How This Plays repeated the same deck-specific-purpose and mechanic-taxonomy language; exact-color precons repeated one generic rationale.
- Updated Start Here to focus on mana construction and sequencing, How This Plays to focus on the way direct mechanics and access models feel in play, and exact WUBRG precons to show their recorded deck plan rather than repeat the shared-color sentence.
- Added a focused invariant for the WUBRG precon rationale. The dossier catalog rebuilt and focused/lint checks pass. The shared faction build remains blocked as recorded above.
