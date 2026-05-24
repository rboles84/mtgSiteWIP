# Agent Handoff

## Agent name

Codex

## Task requested

Implement VM-118 to repair the Archscry adjacent-fit Identity Matrix so adjacent dossier views resolve their radar profile from the active viewed faction instead of staying on the original primary placement.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0126-codex-vm021b-adjacent-fit-click-repair-return-path.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/done/VM-078-archscry-dossier-identity-matrix-radar.md`
- `docs/reference/manual-test-cases.md`
- `assets/js/dossier-radar.js`
- `research/archscry-adjacent-navigation-tests.js`
- `package.json`
- `scripts/frontend-smoke.mjs`

## Files changed

- `assets/js/dossier-radar.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1744-codex-vm118-archscry-adjacent-identity-matrix-sync-repair.md`

## What changed

- Added active-faction-first resolver helpers in `assets/js/dossier-radar.js` so dossier radar profiles now prefer `faction.key` and `faction.name` before falling back to `result.faction`.
- Applied the same precedence to fallback profile metadata, so unknown or future adjacent expressions inherit the viewed dossier identity instead of the original primary result.
- Extended `research/archscry-adjacent-navigation-tests.js` with direct assertions covering:
  - primary mono profile resolution
  - adjacent Rakdos profile resolution from a Red primary result
  - placement-only restore behavior
  - fallback-adjacent metadata preservation
- Tightened the returning-user manual QA checklist so adjacent-fit testing explicitly verifies the `Mana Alignment Matrix` content switches to the adjacent faction and then returns to primary correctly.
- Created, promoted, and completed Kanban card `VM-118`, then recorded this handoff in the index.

## Why it changed

The adjacent dossier view was rerendering the surrounding Archscry content correctly, but the `Mana Alignment Matrix` resolver still preferred `placement_result.faction`. That kept the primary Red profile active when the user switched into an adjacent view like Rakdos. The fix stays in the presenter layer and leaves placement logic untouched.

## Decisions made

- Kept the runtime fix scoped to `assets/js/dossier-radar.js`; `assets/js/index.js` behavior was left unchanged.
- Added the regression to the existing Archscry adjacent-navigation harness instead of creating a separate standalone dossier-radar suite.
- Treated this as a presenter-state defect rather than a placement/scoring defect.
- Avoided touching unrelated VM-116 / VM-117 HTML, CSS, package, and validator changes already present in the dirty worktree.

## Risks / uncertainties

- In-session verification reached syntax checks, the repo test suite, frontend smoke, and a direct Node REPL runtime probe, but not a full browser click path on a live Red -> Rakdos reading.
- The repo still contains unrelated local modifications and untracked files from other workstreams; this pass intentionally left them alone.

## Tests run

- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/index.js`
- `node --check research/archscry-adjacent-navigation-tests.js`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- Direct Node REPL probe against `getDossierRadarProfile()` confirming:
  - primary `R` resolves to `R`
  - adjacent `BR` resolves to `BR` / `Rakdos`
  - fallback adjacent `XBR` resolves to `XBR` / `Cult of Rakdos`

## Not touched

- `assets/js/index.js`
- Adaptive placement/scoring files
- `data/factions.json`
- `data/placement-model.json`
- Identity-layer JSON/data
- The unrelated VM-116 / VM-117 HTML, CSS, package, and validator changes already in the worktree

## Follow-up recommendations

- Run a browser-backed Archscry click-through with a real mono-Red result that exposes Rakdos as an adjacent fit, then repeat once on a restored saved result.
- If more dossier view-state bugs appear, consider a small dedicated regression file for `assets/js/dossier-radar.js` so the presenter module has first-class behavior coverage.

## Next suggested agent

Frontend QA agent

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/handoffs/2026-05-17-0126-codex-vm021b-adjacent-fit-click-repair-return-path.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/reference/manual-test-cases.md`
