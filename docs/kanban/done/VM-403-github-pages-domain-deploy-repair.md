# VM-403 - GitHub Pages Domain Deploy Repair

ID: VM-403
Title: GitHub Pages Domain Deploy Repair
Status: done
Type: Deployment / Release Triage
Area: GitHub Pages, Custom Domain, Main Publish
Priority: critical
Created: 2026-06-15

## Summary

Fix the GitHub Pages deployment failure by disabling Jekyll for the static Vox Mana site while preserving the VM-402 release content and the existing custom-domain `CNAME`.

## Pre-Flight Notes

- Recent related work: VM-402 promoted `feature/ui-refactor-exploration` to `origin/main` after VM-400 release-train publish and VM-401 stale-branch cleanup.
- Current known risks: accepted VM-390 Home visual drift, VM-391 Archscry/Strategium visual drift, VM-392 Home Lighthouse Performance waiver, and recurring local Git warning for inaccessible `C:\Users\obake/.config/git/ignore`.
- Relevant decisions already made: do not touch local `main`, tags, raw/source lore, Commander facts, visual baselines, Maze behavior, public routes/aliases, or generated data except through build scripts.
- Files recently changed: VM-400 runtime/docs/test release train, VM-401 branch cleanup docs, VM-402 promotion docs/report and generated validation outputs.
- What should not be touched: local `main`, unrelated archives, source lore/data, schema/API, route aliases, baseline assets, and internal Markdown syntax.

## Scope

- Inspected publish-root files required by GitHub Pages from `main` `/ (root)`.
- Confirmed `CNAME` and custom-domain DNS state.
- Confirmed local and remote branch refs after VM-402.
- Inspected public GitHub deployment records and user-provided build-log details.
- Added a root `.nojekyll` file so GitHub Pages serves the repository as static files instead of running Jekyll over internal docs.

## Out Of Scope

- Redesigns, visual baseline refreshes, lore/data edits, raw faction/source edits, generated data rebuilds, Markdown syntax fixes, unrelated route changes, or local `main` rewrites.

## Acceptance Criteria

- [x] `.nojekyll` exists at repo root.
- [x] `CNAME` still exists at repo root and still contains `voxmana.io`.
- [x] No Markdown syntax edits are made just to satisfy Jekyll.
- [x] Remote `origin/main` state is verified before the repair commit.
- [x] The root cause is documented.
- [x] Handoff is created and indexed.

## Findings

- `origin/main`, `origin/feature/ui-refactor-exploration`, and local `HEAD` all matched `0373d9c3b394fbcc3c99d446061d5ae9b9299ce0` after fetch.
- Before repair, the publish root contained `index.html` and `CNAME`; `CNAME` contained `voxmana.io`; `.nojekyll` was absent.
- Public raw `main` content showed the new Home build (`Your colors have a shape`, `Vox Mana is a living index`), so GitHub had the correct files.
- `voxmana.io` DNS resolves to the four GitHub Pages apex A records, and `www.voxmana.io` CNAMEs to `rboles84.github.io`.
- User-provided build-log details showed GitHub Pages running Jekyll with no config, then failing on internal Markdown that was never intended for Pages rendering: YAML parsing in `docs/reference/commander-faction-guidance.md` and Liquid `Unknown tag 'id'` in `docs/research/canon/misc/MTG Platform Architecture Blueprint.md`.
- Public deployment records still showed the latest GitHub Pages deployment at old commit `efb44c4c2c78091c9c48f46fd9add7e4b9c0190e` from 2026-05-20, with no deployment for `0373d9c`.

## Root Cause

GitHub Pages was trying to process the whole repository with Jekyll. Because the repository contains internal Markdown docs and research notes with YAML/Liquid text that are not Pages content, the Jekyll build failed before publishing. The missing root `.nojekyll` file allowed Pages to choose the wrong build path.

## Repair

Add an empty root `.nojekyll` file and preserve the existing root `CNAME` file containing `voxmana.io`. Push the same commit to `origin/feature/ui-refactor-exploration` and `origin/main` so the golden branch and Pages source remain aligned.

Post-push deployment verification is reported in the final Codex response without a second documentation commit, to avoid creating another Pages trigger loop.

## Validation Results

- `git fetch origin` - passed.
- `git rev-parse HEAD origin/feature/ui-refactor-exploration origin/main` - all matched `0373d9c3b394fbcc3c99d446061d5ae9b9299ce0`.
- `git diff --name-status origin/main..HEAD` - no differences before VM-403 documentation edits.
- `git show origin/main:CNAME` - `voxmana.io`.
- `Test-Path .nojekyll` before repair - `False`.
- Root `.nojekyll` creation - empty file, length `0`.
- `Get-Item .nojekyll,CNAME` - `.nojekyll` length `0`; `CNAME` length `10`.
- `git diff --cached --name-status` - staged only `.nojekyll` and VM-403 coordination docs.
- `git diff --cached --check` - passed with the recurring inaccessible global git ignore warning only.
- `npm.cmd run lint:html` - passed.
- Public raw `main` `index.html` fetch - showed the new Home build.
- Public repository API - `has_pages: true`, default branch `main`, pushed at `2026-06-15T19:48:12Z`.
- Public deployments API - latest `github-pages` deployment was still May 20 at `efb44c4c2c78091c9c48f46fd9add7e4b9c0190e`.
- DNS check - `voxmana.io` resolved to GitHub Pages apex A records; `www.voxmana.io` CNAMEd to `rboles84.github.io`.
