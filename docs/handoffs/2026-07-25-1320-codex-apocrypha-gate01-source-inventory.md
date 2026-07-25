# 2026-07-25 13:20 - Codex - Apocrypha Gate 0 And Gate 1 Source Inventory

## Agent Name

Codex

## Task Requested

Create a separate branch and worktree from clean main, then perform only Apocrypha Gate 0 baseline inspection and Gate 1 current-source inventory/reporting. Do not edit Apocrypha runtime files, build a registry, rewrite copy, alter sources, touch Strategium, touch Archscry placement logic, reopen CRIT-001, modify semantic data, modify generated files, push, or create a PR.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/reference/workflow.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `library/index.html`
- `scripts/visual-regression-apocrypha.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/done/VM-134-apocrypha-hero-unification-pass.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `docs/kanban/backlog/VM-398-apocrypha-research-vault-backlog-preservation.md`
- `docs/kanban/done/VM-399-apocrypha-not-published-section-removal.md`
- `docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-06-14-2213-codex-vm395-apocrypha-maro-source-links.md`
- `docs/handoffs/2026-06-15-0208-codex-vm397-apocrypha-source-compass.md`
- `docs/handoffs/2026-06-15-0904-codex-vm399-apocrypha-not-published-removal.md`
- `docs/handoffs/2026-06-20-2131-codex-vm414-apocrypha-visual-alignment.md`
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`

## Files Changed

- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created the requested separate worktree `C:\dev\voxmana.io-apocrypha-gate01` on branch `codex/apocrypha-gate01-source-inventory` from main commit `606ef686e2d18dd98c60407e15ba91ef3639e1a6`.
- Added a Gate 0/Gate 1 report documenting current Apocrypha implementation, anchors, accordion behavior, rail behavior, link behavior, desktop/mobile behavior, no-JS fallback, screenshot workflow, and every rendered source currently linked from Apocrypha.
- Updated the handoff index with this task record.

## Why It Changed

The first post-CRIT Apocrypha pass needed a source-integrity baseline before any registry build, source replacement, copy rewrite, or UI work. The report preserves every current rendered source in an audit trail so no source disappears without review.

## Decisions Made

- Treated the user kickoff prompt as the controlling plan because no full Apocrypha Repair Plan file was found in the repo.
- Did not create or move a Kanban card because the user commit scope allowed only the new report, required handoff, and required handoff index update.
- Recorded all network-dependent link checks as `not checked - network unavailable`.
- Recommended `data/apocrypha-source-registry.json` as the Gate 2 registry location, with `apocrypha/source-registry.json` as a route-owned alternative.
- Classified the 40 rendered `magic.wizards.com` links as official-looking and the 9 rendered GitHub/Reddit/MTGLore/Fandom/Draftsim/YouTube links as supplemental/non-official unless later evidence proves otherwise.

## Risks / Uncertainties

- Current page hardcodes source links, visible counts, labels, and use notes in HTML.
- Current source labels do not fully separate official design, official lore, rules, card-record, official archives, and supplemental references.
- Rules sources and card-record sources are absent from the rendered Apocrypha source shelf.
- The retained MaRo candidate file differs from the rendered shelf and needs reconciliation before registry build.
- Link health remains unknown because no network link check was performed.
- Git repeatedly warned that `C:\Users\obake/.config/git/ignore` was inaccessible.

## Tests Run

- `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io status --short --branch`
- `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io rev-parse main`
- `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io rev-parse origin/main`
- `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io worktree list --porcelain`
- `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io branch --list codex/apocrypha-gate01-source-inventory`
- `git -C C:\dev\voxmana.io-apocrypha-gate01 -c safe.directory=C:/dev/voxmana.io-apocrypha-gate01 rev-parse HEAD`
- Static extraction/count checks over `apocrypha/index.html`: 49 rendered external source links, 49 unique canonicalized source URLs, 49 links with `target="_blank"` and `rel="noopener"`.
- `rg`/`Get-Content` inspections listed in the report.

## Not Touched

- Original main worktree files
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `library/index.html`
- data files
- source registry files
- generated files
- Strategium files
- Archscry placement logic
- CRIT files
- semantic data
- package files
- test files
- UI/copy/source runtime behavior
- Git push or PR creation

## Follow-Up Recommendations

- Gate 2 should build a route-specific source registry from the 49 audited rendered source rows, preserving every current source record while separating official design, official lore, rules, card-record, official archives, and supplemental references.
- Gate 2 should mark supplemental/social/fan/wiki/archive/video sources as non-claim-bearing by default unless a later source-authority review explicitly upgrades a role.
- Gate 2 should reconcile `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` against the rendered shelf before using it as registry input.

## Next Suggested Agent

JSON Cartographer for Gate 2 source-registry schema and initial registry, followed by Documentation Steward or Frontend agent only after registry classification is approved.

## Related Kanban Card, Docs, Or Plans

- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `docs/kanban/backlog/VM-398-apocrypha-research-vault-backlog-preservation.md`
