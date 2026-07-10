# VM-450 - Visual Baseline Acceptance And Waiver Cleanup

Status: done - compare-only waiver ledger created, no baseline refresh

## Summary

Review Home, Archscry, Strategium, and Apocrypha visual comparisons after the VM-440 through VM-449 readiness work. Classify each route as green, formally waived, or unresolved. Do not refresh visual baselines unless the owner explicitly accepts the current visuals.

## Why It Matters

Known stale visual diffs reduce the value of the visual regression suite. The project can tolerate documented waivers for a public static beta, but it should not carry unclassified visual failures into a release-readiness story.

## Scope

- Run compare-only visual commands:
  - `npm.cmd run test:visual:home`
  - `npm.cmd run test:visual:archscry`
  - `npm.cmd run test:visual:strategium`
  - `npm.cmd run test:visual:apocrypha`
- Review current mismatch counts and visual artifact locations.
- Document route-level classification and whether each failure is already explained by prior work.
- Preserve existing visual baselines.

## Out Of Scope

- No `test:visual:*:baseline` commands.
- No runtime UI fixes unless a tiny, blocking defect is proven by the compare artifacts.
- No placement, source, generated-data, Maze parser, Supabase, Lighthouse, or copy-boundary changes.
- No git staging, commit, push, tag, or branch promotion.

## Relevant Prior Evidence

- VM-391 formally waived Archscry and Strategium visual failures without refreshing baselines.
- VM-414 refreshed Apocrypha baseline after accepted alignment, then VM-415 made Apocrypha readability/background changes without refreshing.
- VM-416 left Strategium compare failures after content updates without refreshing.
- VM-424 left expected Home visual drift after first-visit positioning without refreshing.
- VM-427 reran all route compares and classified stale visual diffs after VM-422 through VM-426.
- VM-448 and VM-449 added browser smoke/copy changes but did not refresh route visual baselines.

## Acceptance Criteria

- [x] Current compare-only result is recorded for Home, Archscry, Strategium, and Apocrypha.
- [x] Each route is classified as green, formal waiver carried forward, or unresolved.
- [x] If unresolved, the next owner/action is explicit.
- [x] No visual baselines are refreshed without explicit owner acceptance.
- [x] Handoff and board are updated.

## Validation

- `npm.cmd run test:visual:home` - expected fail: mobile `250878`, tablet `373020`, desktop `210924` over `300` budget.
- `npm.cmd run test:visual:archscry` - expected fail, owner-review waiver needed: landing-mobile `49853`, landing-desktop `98344`, dossier captures `480` through `13606` over `400` budget.
- `npm.cmd run test:visual:strategium` - expected fail: landing-desktop `7786`, landing-mobile `2811`, console-pod-readiness `151432`, library-search `41432` over `400` budget.
- `npm.cmd run test:visual:apocrypha` - expected fail: hero-desktop `16797`, hero-mobile `1267`, references-desktop `202461` over `400` budget.
- `git diff --check -- docs\qa\visual-baseline-waivers.md docs\qa\vox-mana-test-plan.md docs\kanban\board.md docs\kanban\in-progress\VM-450-visual-baseline-acceptance-waiver-cleanup.md` - passed with line-ending warnings only before card closeout.

## Risk If Skipped

Future visual regressions remain harder to distinguish from already-known stale baseline drift, weakening release-readiness and portfolio/demo confidence.
