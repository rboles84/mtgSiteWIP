# VM-418 - Repo Scan, Cleanup, And Main Promotion

ID: VM-418
Title: Repo Scan, Cleanup, And Main Promotion
Status: done
Type: Release Hygiene / Publish Wrapper
Area: Git, Kanban, Handoffs, Validation
Priority: high
Created: 2026-06-24
Completed: 2026-06-24
Owner: Codex
Related: VM-413, VM-414, VM-415, VM-416

## Summary

Classified and published the accumulated VM-413 through VM-416 work on `codex/vm407-radar-v2`, then prepared the branch for fast-forward promotion to `origin/main` without force-push.

## Scope

Included:

- VM-413 typography/font assets, route changes, docs, and generated audit outputs from validation.
- VM-414 Apocrypha visual-alignment files and docs.
- VM-415 cross-route readability, nav/readability docs, and documented visual drift.
- VM-416 Strategium content pass, source audit, manual QA docs, and documented visual drift.
- VM-418 publish-wrapper card, handoff, board entry, and handoff index entry.

Excluded:

- `.codex/prompts/new 46.txt`
- `.codex/prompts/new 49.txt`

## Validation Summary

Passed:

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:placement`
- `npm.cmd run test:parser`
- `npm.cmd run validate:source-generated`
- `npm.cmd run dossier:audit`
- `npm.cmd run test:visual:archscry`
- `git diff --check`

Accepted documented waivers:

- `npm.cmd run test:lighthouse:home` remained in the existing VM-392/VM-413 waiver class: Performance 88, Accessibility 96.
- `npm.cmd run test:visual:home` failed as documented stale-baseline drift.
- `npm.cmd run test:visual:apocrypha` failed as documented stale-baseline drift.
- `npm.cmd run test:visual:strategium` matched the VM-416 stale-baseline counts exactly.

## Acceptance Notes

- VM-418 was unused before creation.
- `origin/main` was still contained in `HEAD` before promotion readiness.
- `origin/codex/vm407-radar-v2` was confirmed as an ancestor of `HEAD` before branch-push readiness.
- `docs/design/strategium-archetype-source-audit.md` was source-checked against EDHREC themes, Draftsim EDH archetypes, MTG Wiki deck archetype category pages, and the official Wizards Commander Brackets page.
- Generated Lighthouse trailing whitespace was cleaned after Lighthouse rewrote the report.
- No force-push, local `main` checkout, reset, delete, or rewrite was performed.

## Follow-Up

- Visual baselines for Home, Apocrypha, and Strategium remain intentionally stale and should only be refreshed under a dedicated visual-baseline card.
- Home Lighthouse Performance 88 / Accessibility 96 remains covered by the existing waiver class unless the owner decides to prioritize the remaining score gap.
