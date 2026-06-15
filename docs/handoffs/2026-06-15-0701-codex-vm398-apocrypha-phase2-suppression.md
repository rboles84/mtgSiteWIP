# 2026-06-15 07:01 - Codex - VM-398 Apocrypha Phase 2 UI Suppression

## Agent Name

Codex

## Task Requested

Remove public Phase 2 / Research Vault affordances from `/apocrypha/`, preserve the future Research Vault idea as backlog and handoff context, keep VM-397 Source Compass behavior intact, refresh the Apocrypha visual baseline only after scoped diff review, and avoid staging or committing.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0208-codex-vm397-apocrypha-source-compass.md`
- `docs/handoffs/2026-06-14-2255-codex-vm396-apocrypha-reference-shelves.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`
- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `docs/reference/manual-test-cases.md`
- `scripts/visual-regression-apocrypha.mjs`

## Files Changed

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-398-apocrypha-research-vault-backlog-preservation.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0701-codex-vm398-apocrypha-phase2-suppression.md`
- Ignored local visual baseline artifacts under `artifacts/visual-regression/apocrypha/baseline/`

## What Changed

- Removed the public page-rail `Phase 2` target and the `#dossiers` Research Vault section from `apocrypha/index.html`.
- Removed the Quick Guide `Phase 2 Research Vault` card and the `Phase 2 preview` chip from the Not Published panel.
- Reworded the hero support line to focus on live public URLs and plain-language source context.
- Preserved the Not Published panel, publication-boundary copy, Source Compass rail, five library group details panels, and all 49 public source links.
- Removed orphaned `.apoc-vault-*` route CSS after the DOM was removed.
- Created VM-398 as a backlog-only preservation card with the seven future concepts: Lore Bundles, Faction Files, Source Captures, Prompt Artifacts, Reference Maps, Generated Summaries, and Validated Research Notes.
- Updated manual QA docs to assert that public Apocrypha no longer exposes Phase 2 / Research Vault affordances.

## Why It Changed

The public Apocrypha route should stay focused on visible public references and source-use framing. The future Research Vault idea remains useful, but exposing it as public Phase 2 UI made the page promise later internal-working-material publication before the information architecture and source-governance rules were approved.

## Decisions Made

- Confirmed VM-398 was unused before creating the backlog card.
- Kept VM-398 in `backlog/`; this task is complete, but the future Research Vault work remains open.
- Did not move or reopen VM-397 because it is already closed; Source Compass behavior and JS were preserved.
- Removed the `#dossiers` public target outright instead of hiding an empty section in the DOM.
- Refreshed the Apocrypha visual baseline only after reviewing generated diffs and current screenshots as scoped to the intentional UI removal and page-height/content shifts.

## Risks / Uncertainties

- The visual baseline refresh updated all Apocrypha baseline captures, although the intended product change was limited to Apocrypha public UI suppression.
- The route no longer has a `#dossiers` anchor. This is intentional because the preview-only public target was removed.
- The broader worktree remains dirty from prior release-train work; this task did not clean, revert, stage, or commit unrelated files.

## Tests Run

- `git status --short --branch` - reviewed dirty tree and preserved unrelated work.
- VM-398 collision scan with `rg` over repo docs/runtime surfaces - PASS, no existing VM-398 references.
- Public runtime static scan over `apocrypha/index.html`, `assets/css/apocrypha.css`, and `assets/js/apocrypha.js` for `Phase 2`, `Research Vault`, `#dossiers`, `data-rail-link="dossiers"`, and `apoc-vault` - PASS, no matches.
- Route-shape assertion - PASS: `phase2Runtime=false`, `sourceTomes=5`, `libraryGroups=5`, `publicLinks=49`, `notice=true`, `notPublished=true`.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `git diff --check` - PASS, with existing LF/CRLF warnings only.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `npm.cmd run test:visual:apocrypha` before baseline refresh - expected FAIL: `hero-desktop: 1881`, `hero-mobile: 1591`, `references-desktop: 57238`, reviewed as scoped to intentional UI removal and page-height/content shifts.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` after baseline refresh - PASS with `hero-desktop: 0`, `hero-mobile: 0`, `references-desktop: 0`.
- Manual-style artifact review - PASS: page rail no longer shows Phase 2, Quick Guide no longer shows the Research Vault card, Not Published still renders, Source Compass remains visible, and the visual harness reported no horizontal overflow.

## Not Touched

- `assets/js/apocrypha.js`
- Placement logic
- Generated placement data
- Raw faction packets
- Commander facts
- Source claim ledgers
- Route aliases, including `/library/`
- Non-Apocrypha pages
- Source Compass group/tome behavior
- Public source link text, hrefs, order, or count
- Docs, backlog, handoffs, or historical cards that intentionally preserve Research Vault terms outside public runtime files
- Git staging, commits, pushes, tags, merges, or main promotion

## Follow-Up Recommendations

- When VM-398 is intentionally planned, define source-governance and publication rules before any internal working material becomes public.
- If a future Research Vault route is approved, treat it as a separate IA/design/source-review task rather than restoring the removed preview cards directly.

## Next Suggested Agent

Planning Architect or Documentation Steward when VM-398 is ready to be scoped.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-398-apocrypha-research-vault-backlog-preservation.md`
- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `docs/handoffs/2026-06-15-0208-codex-vm397-apocrypha-source-compass.md`
- `docs/reference/manual-test-cases.md`
