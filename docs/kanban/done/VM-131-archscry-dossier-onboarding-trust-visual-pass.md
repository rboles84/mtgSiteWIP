# VM-131 - Archscry Dossier Onboarding Trust And Visual Clarity Pass

## Status

Complete

## Owner

Codex

## Requested

Refine the live Archscry dossier console so it reads more clearly for first-time placements, improves trust in explanation copy, and adds targeted visual clarity without changing placement logic, scoring, taxonomy sources, or route architecture.

## Scope

- Keep the live dossier console structure from VM-130.
- Improve the placement snapshot for new-player orientation.
- Remove redundant radar caption/pill chrome and improve radar spacing.
- Add a compact signal-strength visual inside `The Shape of the Reading`.
- Rework `Layered Identity` readability and mono-color messaging.
- Reframe `Purity` into a clearer newcomer-facing concept.
- Reuse a lightweight mono-color `newIndex2` `cag-node` visual in the `Expression` card.
- Merge `Table Identity` and `Lore To Mechanic` into a clearer gameplay-facing section.
- Tighten `Why This Fits You` and `Flavor Echoes` so they stay conservative and evidence-driven.
- Refresh visual and runtime coverage for the new wording and states.

## Constraints

- No placement/scoring/data-model changes.
- No taxonomy schema changes.
- No preview-route promotion.
- No second radar-adjacent chart.
- Preserve current URL/tab/segment behavior, card-art hooks, radar lifecycle, Maze handoff, and local-file boot behavior.

## Verification Plan

- `node --check assets/js/index.js`
- `node --check scripts/frontend-smoke.mjs`
- `node --check scripts/visual-regression-archscry.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Notes

Pre-flight continuity to preserve:

- VM-130 console structure and retained DOM approach.
- VM-118 active-faction radar behavior.
- VM-123 local-file-safe data loading.
- VM-127 Archscry visual harness and route-local CSS extraction.

## Completed

- Reduced the snapshot to four orientation cards and merged fit + identity context into one card.
- Replaced snapshot save-first language with a newcomer-facing `Read Why This Fits first` cue.
- Removed the lower radar caption/pill chrome and rebalanced radar card spacing.
- Added a compact signal-strength visual inside `The Shape of the Reading`.
- Reworked `Layered Identity` readability, mono-color fallback copy, and expression visuals.
- Reframed `Purity` into `Color Focus`.
- Merged `Table Identity` and `Lore To Mechanic` into a single `How This Plays` section.
- Tightened `Why This Fits You` tag selection to evidence, commander-path, archetype, and model-mechanics support.
- Renamed `Flavor Echoes` to `What This Looks Like In Cards` and hid weakly grounded card examples.
- Added follow-up runtime coverage and refreshed Archscry visual baselines.
