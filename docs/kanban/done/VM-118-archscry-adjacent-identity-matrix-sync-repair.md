# VM-118 - Archscry Adjacent Identity Matrix Sync Repair

ID: VM-118
Title: Archscry Adjacent Identity Matrix Sync Repair
Status: done
Type: Frontend / Reliability
Area: Archscry, Dossier
Priority: high
Created: 2026-05-24

## Summary

Repair the Archscry dossier Identity Matrix so adjacent-fit views resolve their radar profile from the actively viewed dossier faction instead of staying locked to the original primary placement.

## Scope

- Fix the dossier radar profile resolver in `assets/js/dossier-radar.js` so it prefers the active viewed dossier faction.
- Add regression coverage alongside the existing Archscry adjacent-navigation checks.
- Tighten the returning-user manual QA notes so adjacent-fit matrix switching is explicitly verified.

## Non-Goals

- Do not modify placement scoring, adaptive reading logic, or canonical faction/model JSON.
- Do not redesign the dossier layout or adjacent-fit navigation flow.
- Do not touch the unrelated VM-116 / VM-117 HTML, CSS, package, or validator work already present in the dirty worktree.

## Source

- `docs/handoffs/2026-05-17-0126-codex-vm021b-adjacent-fit-click-repair-return-path.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/reference/manual-test-cases.md`
- User-reported Red -> Cult of Rakdos adjacent-fit bug on `archscry/index.html`

## Acceptance Criteria

- Adjacent-fit dossier views resolve `Mana Alignment Matrix` content from the active dossier faction, not only from `placement_result.faction`.
- Primary dossier views still resolve the same radar profile as before.
- Fallback radar profiles for unknown or future expressions use the viewed dossier faction metadata when available.
- Automated regression coverage protects primary, adjacent, and fallback resolver behavior.
- Manual QA notes explicitly verify that adjacent-fit switching changes the Identity Matrix to the adjacent faction and returns to primary cleanly.

## Outcome

- Added active-faction-first helpers in `assets/js/dossier-radar.js` so direct and fallback dossier radar profiles resolve from the viewed adjacent faction before falling back to the original placement result.
- Preserved primary-result behavior and fallback-only restores while fixing adjacent pair views such as Red -> Rakdos.
- Extended `research/archscry-adjacent-navigation-tests.js` with direct profile assertions for primary, adjacent, placement-only, and fallback-adjacent cases.
- Updated `docs/reference/manual-test-cases.md` so returning-user QA now explicitly checks that the Identity Matrix changes to the adjacent faction and then returns to primary correctly.

## Verification

- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/index.js`
- `node --check research/archscry-adjacent-navigation-tests.js`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- Direct runtime probe via Node REPL confirming:
  - primary `R` resolves to `R`
  - adjacent `BR` resolves to `BR`
  - fallback adjacent `XBR` resolves to `XBR` with the adjacent label preserved
