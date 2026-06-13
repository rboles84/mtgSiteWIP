# VM-363 - Repo Cleanup And Verified Publish Bundle

## Status

Done

## Summary

Run a verified cleanup and publish bundle on `feature/ui-refactor-exploration`, then commit and push to `origin/feature/ui-refactor-exploration` without force-push.

## Safety Checks

- Re-read `AGENTS.md`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md` before edits.
- Run `git status --short --branch` before edits and confirm the branch is `feature/ui-refactor-exploration`.
- Confirm no existing VM-363 card, handoff, handoff-index entry, or repo reference already uses VM-363.
- Classify the dirty tree before staging anything.
- Stop instead of bundling any large unexplainable generated diff, unexpected public API/route/schema/product-surface change, or unexplained doc deletion.
- Do not move this card to Done until the bundle is pushed, the pushed branch is confirmed, and `git status --short --branch` is clean.

## Inclusion Rules

Allowed:

- Tracked modifications that belong to already documented accumulated work.
- Tracked deletions only after relocation, archive trail, or obsolete rationale is recorded.
- Untracked Kanban cards, handoffs, docs, data, assets, scripts, `CLAUDE.md`, and source-governance files explicitly listed in the VM-363 handoff.
- Ignored `docs/research/canon/**` source-governance files only via intentional `git add -f`, with every force-added path listed in the handoff.
- Generated faction artifacts only after `npm.cmd run build:factions`, and only as outputs of the current source-data build.

Excluded:

- `._relic_*.png`
- `._relic_check.mjs`
- Any untracked or ignored file not explicitly classified.
- Any generated file manually edited instead of rebuilt.
- Any doc deletion without verified relocation, archive trail, or documented obsolete rationale.

## Implementation Checklist

- [x] Re-read required preflight docs.
- [x] Confirm current branch is `feature/ui-refactor-exploration`.
- [x] Confirm VM-363 is unoccupied.
- [x] Create in-progress VM-363 card and handoff shell.
- [x] Build classification inventory for tracked edits, tracked deletions, untracked files, ignored canon files, generated outputs, and excluded/unresolved files.
- [x] Run `npm.cmd run build:factions` and inspect generated diffs.
- [x] Run required test gates.
- [x] Run `git fetch origin` after tests and before commit readiness.
- [x] Confirm local branch is not behind/diverged from `origin/feature/ui-refactor-exploration`.
- [x] Stage only classified allowed files, using `git add -f` only for listed ignored canon docs.
- [x] Confirm staged name-status, ignored canon handling, tracked canon docs, deletion dispositions, and no excluded scratch staged.
- [x] Commit the verified bundle.
- [x] Push to `origin/feature/ui-refactor-exploration`.
- [x] Confirm pushed branch and clean status.
- [x] Move VM-363 to Done only after push and clean status.

## Required Gates

- `npm.cmd run build:factions`
- `npm.cmd test`
- `npm.cmd run test:placement`
- `npm.cmd run test:parser`
- `npm.cmd run validate:source-generated`
- `npm.cmd run dossier:audit`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `git diff --cached --check`

## Acceptance Checks

- `git status --short --ignored docs/research/canon` confirms ignored canon files were intentionally handled.
- `git ls-files docs/research/canon` confirms force-added canon docs are tracked after staging.
- `git diff --cached --name-status` is summarized in the handoff before commit.
- Handoff includes intentional ignored-file inclusions, deletion disposition table, excluded/unresolved files, commit hash, pushed branch, tests, and final clean status.

## Notes

- Starting branch confirmed with `git status --short --branch`: `feature/ui-refactor-exploration...origin/feature/ui-refactor-exploration`.
- VM-363 occupancy check found no existing repo references before this card was created.
- Main bundle commit: `8cf770221e7fcf42423a9c6a39c120111c7406a9`.
- Pushed branch: `origin/feature/ui-refactor-exploration`.
- Final pre-closeout status after main push: clean, with `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` returning `0 0`.
