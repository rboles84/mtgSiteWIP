# VM-570 - JavaScript Architecture Cleanup Pass 1

## Status

Done.

## Objective

Turn the organically grown JavaScript layout into a product-oriented structure while preserving Vox Mana behavior exactly.

## Scope

- Reconstruct and preserve the `research/` to Implicit Maze evolution from repository evidence.
- Move browser runtime code to product-owned `assets/js/` subdirectories.
- Move durable tests out of production browser asset and research folders.
- Move durable Node-side tooling out of misleading runtime/research locations where safe.
- Separate vendor browser code.
- Delete only the two previously certified historical archive files approved for this pass.
- Update current operational paths only.

## Non-Goals

- No runtime decomposition.
- No framework, bundler, TypeScript, or package-manager migration.
- No behavioral refactor, visual redesign, copy rewrite, data redesign, or feature addition.
- No broad historical documentation churn.
- No dead-tooling lifecycle untangling for VM-specific `.mjs` files that still retain references.

## Governance

Apply `docs/dev/RobDevPass.md` during implementation and `docs/qa/RobQAPass.md` during certification.

## Baseline

- Branch: `main`
- Baseline HEAD: `1539069`
- Pre-change targeted validation passed for HTML lint, JS lint, source/generated guard, parser, placement, Maze finds, deck links, copy boundaries, and frontend smoke.
- Pre-change full `npm test` fails at the known missing `xlsx` package import from `research/import-precon-mechanics-validation.mjs`; post-change certification must be no worse.

## Acceptance

- JavaScript ownership reflects home, Archscry, Implicit Maze, Apocrypha, Strategium, shared, vendor, tooling, and tests.
- Production Maze runtime is no longer rooted in `research/`.
- Non-executable Maze seed/data is Maze-owned outside `assets/js/maze/`.
- Current behavior and source/generated authority are unchanged.
- Owner manual QA can remain a small representative spot-check set.

## Closeout Notes

- Promoted Maze runtime from `research/` to `assets/js/maze/` and moved Maze seed data to `data/maze/`.
- Moved durable tests to `tests/`, durable tooling to `scripts/build/`, `scripts/validate/`, `scripts/audit/`, and shared libraries to `scripts/lib/`.
- Moved Chart.js to `assets/js/vendor/`.
- Preserved VM-specific producer/remediation scripts in `research/` for a later dead-tooling review where current references still exist.
- Deleted only the two previously certified historical archive browser files.
- Static integrity passed after relocation, including moved-test `new URL(..., import.meta.url)` resolution.
- Full `npm test` remains no worse than baseline: it stops at the established missing `xlsx` package import from `scripts/build/import-precon-mechanics-validation.mjs`.
- Rendered browser smoke remains environment-blocked by missing `chrome-launcher`; in-app browser localhost verification was also blocked by local connection refusal from the browser context. Deterministic frontend smoke passed.
- Owner acceptance reproduced an Archscry relocation defect: the moved runtime still used `../../data/`, causing `factions.json` to resolve under `/assets/data/`. Corrected the base to `../../../data/`, added a deterministic module-relative resolution check, and received owner confirmation that Archscry data loading works.
- The same review found a nested glossary term inheriting full-width field-label styling; scoped the selector to each row's first label span and added a smoke invariant. The owner confirmed the corrected inline term display, completing final UI acceptance.
