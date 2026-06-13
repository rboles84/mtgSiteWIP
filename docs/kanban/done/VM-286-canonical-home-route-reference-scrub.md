ID: VM-286
Title: Canonical Home Route Reference Scrub
Status: Done
Type: Documentation / Route Reference Audit
Area: Home, Docs, Validation
Priority: high

## Summary

Execute a focused canonical Home route reference scrub that fixes stale current-state wording around `newIndex2.html` while preserving the established historical `newindex2` asset, harness, script, report, and artifact naming that still supports `index.html`.

## Scope

- Audit repo-wide references to `newIndex2`, `newindex2`, `newIndex2.html`, and `newindex2.html`.
- Classify every hit into the VM-286 buckets before changing anything.
- Replace only stale live-route wording if found.
- Add short clarification text in current-state Home docs where `newindex2` naming could be misread as a live route.
- Update the Kanban board and handoff trail for the slice.

## Out Of Scope

- Renaming files, npm scripts, report paths, artifact directories, or code identifiers.
- Home visual cleanup.
- Lighthouse cleanup.
- Rewriting historical completed cards, handoffs, audit artifacts, or branch-snapshot research docs for cosmetic consistency.

## Classified Audit

Repo-wide `newIndex2` / `newindex2` scan before edits:

- Bucket 1: `0` hits across `0` files.
  No stale current-state live route/page references to `newIndex2.html` or `newindex2.html` were found outside preserved historical contexts.
- Bucket 2: `33` hits across `15` files.
  Intentional live asset, harness, script, report, or artifact naming to preserve.
- Bucket 3: `1080` hits across `150` files.
  Historical records, audit trail, completed cards, handoffs, and branch-snapshot research docs to preserve.
- Bucket 4: `13` hits across `4` current-state docs.
  Clarification-only wording targets:
  - `docs/design/asset-manifest.md`
  - `docs/architecture/route-ownership-matrix.md`
  - `docs/architecture/project-atlas.md`
  - `docs/reference/manual-test-cases.md`

Exact `newIndex2.html` / `newindex2.html` scan before edits:

- Bucket 1: `0`
- Bucket 2: `2`
- Bucket 3: `566`
- Bucket 4: `0`

Preserved bucket-2 live names include:

- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `test:visual:newindex2`
- `test:lighthouse:newindex2`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `docs/audits/lighthouse-newindex2.html`

## Acceptance Criteria

- Current-state docs consistently identify `index.html` as the canonical Home route.
- Historical `newindex2` asset and harness naming remains unchanged.
- Historical records remain historically accurate.
- Validation passes:
  - `npm.cmd run lint:html`
  - `npm.cmd run test:frontend-smoke`
- Post-change verification search confirms no stale `newIndex2.html` / `newindex2.html` references remain in live code or current-state docs outside preserved historical contexts.

## Implementation

- Confirmed the repo-wide audit had no bucket-1 stale current-state live route/page references to `newIndex2.html` or `newindex2.html`.
- Preserved the established bucket-2 live names unchanged:
  - `assets/css/newindex2.css`
  - `assets/js/newindex2.js`
  - `test:visual:newindex2`
  - `test:lighthouse:newindex2`
  - `scripts/visual-regression-newindex2.mjs`
  - `scripts/lighthouse-newindex2.mjs`
  - `docs/audits/lighthouse-newindex2.html`
- Added short clarification text to the four bucket-4 current-state docs so they clearly separate:
  - `index.html` as the canonical Home route
  - preserved `newindex2` asset and harness naming as historical continuity only
- Left historical bucket-3 records unchanged, including completed cards, handoffs, board done-link titles, archived docs, audit artifacts, and branch-snapshot research docs.
- Made no asset, script, harness, report-path, artifact-directory, or code-identifier renames.

## Validation

- Focused post-change verification search across live code and current-state docs returned only the two preserved report-path hits in `scripts/lighthouse-newindex2.mjs`; no stale live-route claims remained.
- `npm.cmd run lint:html` - passed
- `npm.cmd run test:frontend-smoke` - passed
