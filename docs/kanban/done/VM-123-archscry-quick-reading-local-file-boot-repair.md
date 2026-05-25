# VM-123 - Archscry Quick Reading Local-File Boot Repair

ID: VM-123
Title: Archscry Quick Reading Local-File Boot Repair
Status: done
Type: Frontend / Runtime Compatibility
Area: Archscry, Local File Boot
Priority: high
Created: 2026-05-24

## Summary

Repair the Archscry quick-reading boot path so direct local-file use resolves its placement JSON from the module location instead of failing on root-relative `/data/...` URLs.

## Scope

- Replace Archscry root-relative data fetches in `assets/js/index.js` with module-resolved URLs derived from `import.meta.url`.
- Keep the quick-reading logic, placement model, dossier rendering, and existing error copy unchanged outside the data URL resolution path.
- Add a frontend smoke guard that fails if root-relative `/data/...` fetches are reintroduced into the live Archscry runtime.
- Update manual QA and architecture docs to reflect the file-safe boot path.

## Non-Goals

- Do not modify `assets/js/adaptive-placement.js` or any canonical JSON under `data/`.
- Do not reopen adjacent-fit presenter logic, Maze runtime behavior, or shared auth/session flows.
- Do not redesign Archscry UI or alter VM-113 local route targets.

## Source

- `docs/handoffs/2026-05-24-1430-codex-vm113-topbar-sigil-local-route-archscry-quick-flow-repair.md`
- `docs/handoffs/2026-05-24-1744-codex-vm118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/reference/manual-test-cases.md`
- User-reported `file://` Archscry quick-reading boot regression on `archscry/index.html`

## Acceptance Criteria

- Direct local-file Archscry boot no longer depends on root-relative `/data/...` fetches.
- Clicking `Start the Quick Reading` still opens Gate 1 on the hosted/local-server path.
- Frontend smoke fails if `assets/js/index.js` reintroduces root-relative `/data/...` references.
- QA docs explicitly call out the no-error and Gate 1 expectations for the Archscry local-file path.

## Outcome

- Added a single data URL resolver in `assets/js/index.js` and switched required plus optional Archscry JSON loads to module-resolved URLs rooted from `import.meta.url`.
- Preserved the existing initialization error copy and quick-reading runtime flow while making the data path file-safe and subpath-safe.
- Extended `scripts/frontend-smoke.mjs` with a guard against root-relative `/data/...` references in the live Archscry runtime.
- Tightened the local-file QA checklist and updated the architecture note so the documented boot path now matches the repaired behavior.

## Verification

- `node --check assets/js/index.js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Headless localhost smoke confirming `Start the Quick Reading` still opens Gate 1 on `/archscry/index.html`
- Headless local-file smoke with `--allow-file-access-from-files` confirming:
  - `archscry/index.html` no longer falls into `Placement data missing.`
  - `Start the Quick Reading` opens Gate 1
