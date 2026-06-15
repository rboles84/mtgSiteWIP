# VM-393 - Final Release Hygiene And Main Promotion Readiness

ID: VM-393
Title: Final Release Hygiene And Main Promotion Readiness
Status: done
Type: Release Hygiene / Readiness Review
Area: Repository, Kanban, Handoffs, Release Governance
Priority: high
Created: 2026-06-14

## Summary

Classify final v1.0 release hygiene after VM-389 through VM-392, including dirty-tree scope, visual and Lighthouse waivers, research prototype disposition, branch-divergence status, and promotion readiness. Do not stage, commit, push, tag, merge, refresh baselines, or promote main unless explicitly instructed.

## Pre-Flight Notes

- Recent related work: VM-389 promoted Home Identity Signal from 20 to 37 identities; VM-390 resolved Home horizontal overflow and classified Home visual drift; VM-391 formally waived Archscry/Strategium visual drift; VM-392 stabilized Lighthouse reporting and formally waived Home Performance `88/90`.
- Known risks: dirty tree contains VM-387/388/389/390/391/392 work plus two untracked `docs/research/vox-mana-decomposition-*.html` prototypes; visual baselines remain intentionally stale; Home Lighthouse remains below the historic `90` gate by waiver.
- Decisions already made: current feature branch is intended release source of truth; preserve unrelated dirty work; do not blindly merge old `origin/main`; do not stage/commit/push/tag/main-promote without explicit instruction.
- Do not touch: placement, Maze, public routes, aliases, schema/API, generated data, source lore, Commander facts, visual baselines, or runtime behavior unless a final hygiene check proves a release-blocking contradiction.

## Scope

- Verify no active Kanban cards remain except VM-393 while this card is active.
- Verify research prototypes are classified as design-archive candidates only, with no runtime imports, public route exposure, or release dependency.
- Record dirty-tree scope and release blocker/waiver status.
- Inspect branch/upstream divergence from local git metadata and, if possible, refreshed remote metadata.
- Produce final readiness verdict and next steps.

## Evidence Log

- Dirty tree remains intentionally uncommitted and contains VM-387 through VM-392 release-train work plus VM-393 documentation. No staging, commit, push, tag, merge, baseline refresh, or main promotion was performed.
- `git fetch origin` completed. Current branch `feature/ui-refactor-exploration` is even with `origin/feature/ui-refactor-exploration` at the committed baseline before the dirty VM-387 through VM-393 work.
- Against `origin/main`, the current branch is `70` commits ahead and `3` commits behind.
- The three `origin/main` commits inspected were:
  - `efb44c4 Remove proposed UI mock from main`
  - `8bc931c Add proposed modern homepage UI mock`
  - `2cae196 Add Scryfall discovery and Archscry dossier polish (#11)`
- Branch policy decision: do not merge or overwrite the current feature branch with `origin/main` during VM-393. Treat the current feature branch plus intentional dirty release-train work as the v1.0 release source of truth, with the three `origin/main` commits documented for explicit later decision.
- Prototype classification: `docs/research/vox-mana-decomposition-in-screen.html` and `docs/research/vox-mana-decomposition-insight.html` are standalone design-archive candidates only. They contain inline prototype CSS/JS and Google font links, but `rg` found no runtime imports, route exposure, public links, or release dependency. Default disposition: keep under `docs/research/` only if explicitly staged/committed as research archive; otherwise leave untracked.
- VM-390 release carry-forward: Home horizontal overflow is resolved, Home visual test remains failed and classified as Home baseline drift after VM-389/390 changes.
- VM-391 release carry-forward: Archscry and Strategium visual tests remain failed and are formally waived without baseline refresh.
- VM-392 release carry-forward: Home Lighthouse is stabilized and meaningful, but Performance remains `88/90` with Accessibility `96`; the Performance miss is formally waived.
- Final release verdict: v1.0 can be treated as release-ready only if the documented visual and Lighthouse waivers are accepted and the dirty release-train tree is intentionally staged/committed by explicit instruction. It is not a fully green, clean-tree release candidate.

## Test / Check Log

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `node assets/js/quick-reading-tests.js` - passed: 37 factions, 37 golden paths.
- `git diff --check` - initially found two trailing-space lines in the generated Lighthouse report; after trimming generated whitespace, passed with LF/CRLF warnings only.
- `npm.cmd run test:lighthouse:home` - carried from VM-392: failed with meaningful score Performance `88`, Accessibility `96`; formally waived.
- Visual tests - carried from VM-390/VM-391: Home, Archscry, and Strategium remain failed by documented waiver; Apocrypha was previously green.

## Acceptance Criteria

- [x] Dirty tree is classified without staging or committing.
- [x] The two decomposition prototypes are classified and checked for runtime linkage.
- [x] VM-390/391/392 waivers are carried into final release readiness.
- [x] Branch-divergence status is documented without merging or overwriting.
- [x] No new public routes, aliases, schema/API, generated data, placement, Maze, visual baseline, staging, commit, push, tag, or main-promotion changes are introduced.
- [x] Required handoff is created and `docs/handoffs/HANDOFF_INDEX.md` is updated.

## Main Promotion Gate

VM-393 does not promote main. The next action requires explicit instruction to stage/commit/push/tag or promote the current branch. Recommended promotion bundle should include VM-387 through VM-393 changes plus the two research prototypes only if the user explicitly accepts them as `docs/research/` archive artifacts.
