# VM-385 Archscry Dossier UX Repair Handoff

## Agent Name

Codex

## Task Requested

Repair confirmed Archscry dossier UX issues: keep Identity Matrix card voices and lower grounded card examples distinct, remove duplicate adjacent-view return controls, align How This Plays label/row spacing, and add Black/card-visibility regressions without overbuilding the likely cache-related blank-card symptom.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-2212-codex-vm384-gate-live-promotion.md`
- `docs/handoffs/2026-06-13-1653-codex-vm377-mono-gold-execution.md`
- `docs/handoffs/2026-06-13-1346-codex-wubrg-commander-flavor-echo-image-repair.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `research/presentation-snapshot-cases.json`
- `research/presentation-snapshot-runner.mjs`

## Files Changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/kanban/done/VM-385-archscry-dossier-ux-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-0009-codex-vm385-archscry-dossier-ux-repair.md`

## What Changed

- Added normalized card-name exclusion so `What This Looks Like In Cards` does not repeat names already shown in the Identity Matrix `Cards That Sound Like This` panel.
- Required the lower card-example section to disappear entirely when fewer than two grounded distinct examples remain.
- Kept the Identity Matrix card-voice surface structurally unchanged and continued feeding it the authored flavor snippets.
- Removed duplicate adjacent-view Back to Primary controls from utility actions and the Adjacent Fits panel.
- Forced adjacent-view navigation and primary-return navigation onto the Placement panel so the single Back to Primary Reading control is visible.
- Added a How This Plays spacing selector for matching label-to-row rhythm.
- Added focused regressions for Black commander preview rows, starter references, mana-base rows, preview fallback markup, card-example dedupe, lower-section suppression, adjacent return count, and spacing selector presence.

## Why It Changed

The scan surfaced duplicated card-example surfaces, duplicate adjacent return controls, unbalanced How This Plays spacing, and Black/card tile blankness concerns. The implementation keeps the useful surfaces, makes their roles distinct, and adds regression checks around the Black surfaces without changing source data or inventing renderer behavior for a symptom that did not reproduce during QA.

## Decisions Made

- Comparison for cross-section card exclusion is by normalized card-name string, not faction, tag, source bucket, object identity, or display HTML.
- Non-Colorless dossiers with Identity Matrix card voices skip curated snippets for the lower card-example surface, so the lower surface must add distinct grounded examples from loaded indexes.
- Colorless remains allowed to use curated main card examples because its matrix companion is a boundary explanation rather than card voices.
- The lower card-example wrapper is hidden when distinct grounded examples are below two.
- The single adjacent return control lives in the Placement panel, and adjacent navigation now lands there so it is visible.
- Blank Black card symptoms remain regression-only; no broad renderer hardening was added because local QA showed image URLs/fallback content present.

## Risks / Uncertainties

- The worktree was already broadly dirty before VM-385, including Gate/runtime/test/data/docs changes from VM-382 through VM-384. Those changes were preserved and not reverted.
- `assets/js/index.js` contains pre-existing Gate compression edits in the same file, so reviewers should isolate VM-385 hunks by the card-example, adjacent-return, and spacing-test changes.
- The browser QA used a temporary local Python static server and restored/clicked a Black quick-reading path from committed fixture logic; the server was stopped afterward.
- Browser spacing measurement showed equal label-to-row gaps for both How This Plays blocks, but this is still a focused sanity check rather than full visual regression imagery.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/dossier-radar.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/archscry-adjacent-navigation-tests.js`
- `npm.cmd run dossier:audit`
  - Audited 37 primary Commander dossiers and 76 adjacent dossiers.
  - Pass: 0; warnings: 113; failures: 0.
- `npm.cmd test`
  - Passed adaptive placement, live Gate bias, parser/builder/mode/Maze/precon, Archscry dossier follow-up, and presentation snapshot tests.

## Manual QA

- Served the site locally at `http://127.0.0.1:4173/` with a temporary hidden Python static server; stopped PID `26092` after QA.
- Opened `/archscry/`, clicked through the live mono-Black golden path:
  - The claim no one can make for me
  - A silent axis
  - The cold pattern
  - Preserve what must not break
  - Pay the cost
  - Reclaim it as leverage
- Confirmed the Black primary dossier rendered:
  - Start Here commander previews: `K'rrik, Son of Yawgmoth`, `Ayara, First of Locthwain`, `Chainer, Dementia Master`
  - Starter Card References were populated across creatures, instants/sorceries, and enchantments/artifacts
  - Mana Base Starting Map showed populated nonbasic rows
  - Identity Matrix names and lower card examples were distinct
  - Commander preview tiles had image URLs and fallback content
- Opened adjacent Orzhov fit and confirmed it landed on Placement with exactly one visible `Back to Primary Reading` control.
- Clicked Back to Primary Reading and confirmed it returned to Black with no return control on the primary view.
- Measured How This Plays label-to-row gaps for `At the table` and `In play`; both measured `5.59px` in the checked desktop/mobile viewports.

## Not Touched

- Raw lore facts or Commander facts.
- Generated faction/placement files.
- Scryfall bulk data.
- Placement scoring.
- Home route, Maze route, hero assets, or mono source packets.
- VM-382 through VM-384 Gate compression files and docs, except where existing dirty-tree files were read or where full tests regenerated existing audit outputs.

## Follow-Up Recommendations

- If Black blank card tiles reappear in a fresh browser after hard refresh, capture the DOM and network state before adding renderer hardening.
- Consider a future visual regression that directly screenshots the `How This Plays` panel if spacing complaints recur.
- Review the broad dirty tree separately before publishing, because VM-385 intentionally preserved unrelated Gate/runtime changes.

## Next Suggested Agent

Kanban Steward or release-review Codex pass to publish the combined dirty tree once the owner confirms VM-382 through VM-385 are ready together.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-385-archscry-dossier-ux-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Related prior handoffs: VM-132, VM-135, VM-161/162, VM-376, VM-377, VM-384
