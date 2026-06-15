# 2026-06-14 17:24 - Codex - VM-391 Archscry Strategium Visual Waiver

## Agent Name

Codex

## Task Requested

Implement VM-391: resolve or formally waive Archscry and Strategium visual failures for v1 release readiness after VM-390, without touching unrelated runtime, generated data, public routes, visual baselines, staging, commits, pushes, or tags.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/handoffs/2026-06-14-0009-codex-vm385-archscry-dossier-ux-repair.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-06-12-2347-codex-vm365-full-test-html-report.md`
- `docs/kanban/board.md`
- `scripts/visual-regression-archscry.mjs`
- `scripts/visual-regression-strategium.mjs`
- `artifacts/visual-regression/archscry/current/console-current.json`
- `artifacts/visual-regression/strategium/current/console-current.json`
- Representative current/diff visual artifacts for Archscry and Strategium

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1724-codex-vm391-archscry-strategium-visual-waiver.md`

## What Changed

- Created and closed VM-391 as a formal visual waiver card.
- Ran current Archscry and Strategium visual comparisons.
- Inspected current/diff visual artifacts, harness console contracts, git diff scope, and browser overflow/readiness probes.
- Documented exact failing capture mismatch counts and classification in the VM-391 card.
- Added the VM-391 handoff/index entry.

## Why It Changed

The v1 release checklist allowed Archscry and Strategium visual failures to be either resolved or formally waived. Current evidence showed no Archscry/Strategium dirty runtime changes, no harness console/page errors, no horizontal overflow on checked routes, stable Archscry landing captures, and coherent current screenshots. The remaining failures are stale visual baselines from prior UX/layout drift, not a newly discovered runtime defect suitable for VM-391 hotfixing.

## Decisions Made

- Classified Archscry visual failures as intentional/stale dossier baseline drift after VM-385-era dossier UX changes.
- Classified Strategium visual failures as stale baseline drift: current route screenshots are coherent and readable, with no console/page errors or measured horizontal overflow.
- Did not refresh Archscry or Strategium visual baselines.
- Did not patch Archscry or Strategium runtime code.
- Treated VM-391 as satisfying the release checklist by formal waiver, while leaving visual baseline refresh/update as a future explicit decision if desired.

## Risks / Uncertainties

- `npm.cmd run test:visual:archscry` still exits nonzero against current baselines.
- `npm.cmd run test:visual:strategium` still exits nonzero against current baselines.
- Future automated full sweeps will remain red unless they either honor the VM-391 waiver or refresh baselines under a reviewed baseline-update card.
- Home visual baseline drift, Lighthouse Home performance, final dirty-tree release hygiene, and main promotion remain separate follow-ups.

## Tests Run

- `npm.cmd run test:visual:archscry` - FAIL, formally waived:
  - Landing captures: `0` mismatches.
  - Dossier captures: `42081` through `211320` mismatches, all documented in the VM-391 card.
- `npm.cmd run test:visual:strategium` - FAIL, formally waived:
  - `landing-desktop`: `174876`
  - `landing-mobile`: `66215`
  - `console-pod-readiness`: `185089`
  - `library-search`: `153206`
- Browser route/overflow probe - PASS:
  - Archscry dossier at `375` and `1440` had no document/body horizontal overflow and rendered the Simic dossier plus radar canvas.
  - Strategium at `375`, `1280`, and `1440` had no document/body horizontal overflow and rendered the hero plus 10 checklist buttons.
- Harness console-current inspection - PASS: Archscry and Strategium current visual captures recorded no console/page errors.

## Not Touched

- `assets/css/archscry.css`
- `assets/js/index.js`
- `assets/css/strategium.css`
- `strategium/index.html`
- Visual baselines
- Home, Maze, Apocrypha, placement, generated data, public routes/aliases, schema/API, source lore, Commander facts, research prototypes, staging, commits, pushes, or tags

## Follow-Up Recommendations

- VM-392: rerun, fix, or formally waive Lighthouse Home Performance `86/90`.
- VM-393: final release hygiene should record that Archscry/Strategium visual tests are intentionally waived by VM-391 unless baselines are explicitly refreshed later.
- If the team wants automated visual tests green before main promotion, create a dedicated reviewed baseline-refresh card and include Archscry, Strategium, and Home together.

## Next Suggested Agent

Performance/Release Manager for VM-392 Lighthouse, then final release hygiene for VM-393.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`
- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/handoffs/2026-06-14-0009-codex-vm385-archscry-dossier-ux-repair.md`
