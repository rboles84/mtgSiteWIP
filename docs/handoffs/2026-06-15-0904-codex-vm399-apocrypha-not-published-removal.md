# 2026-06-15 09:04 - Codex - VM-399 Apocrypha Not Published Section Removal

## Agent Name

Codex

## Task Requested

Remove the final `What Is Not Published` section from `/apocrypha/` because it reads like internal governance rather than reader value. Keep one calm source-boundary sentence inside `How These References Are Used`, preserve Source Compass, public links, `/library/` alias behavior, and VM-398 backlog preservation, then close VM-399 through the normal Kanban/handoff workflow.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0701-codex-vm398-apocrypha-phase2-suppression.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `docs/reference/manual-test-cases.md`
- `scripts/visual-regression-apocrypha.mjs`

## Files Changed

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-399-apocrypha-not-published-section-removal.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0904-codex-vm399-apocrypha-not-published-removal.md`
- Ignored local visual baseline artifacts under `artifacts/visual-regression/apocrypha/baseline/`

## What Changed

- Removed the page-rail `Not Published` link.
- Removed the full `#notice` section and redaction panel from `apocrypha/index.html`.
- Kept `How These References Are Used` and added the source-boundary sentence: `Working notes may inform drafts, but only reviewed public references are listed here as source support.`
- Replaced leftover public hero framing around hidden/private/internal machinery with source-first copy and a `Reviewed Support` chip.
- Removed orphaned `.apoc-redaction-*` CSS while preserving still-used grouped selectors and shared Apocrypha surface rules.
- Updated manual QA expectations so Apocrypha ends after `How These References Are Used` and the footer, with no Not Published rail item or private-system disclosure section.
- Closed VM-399 and moved its card to `docs/kanban/done/`.

## Why It Changed

The public Apocrypha page should be source-first. The removed section described internal boundaries in a way that made the reader think about hidden machinery instead of helping them use the reference library.

## Decisions Made

- Confirmed VM-399 was unused before creating the implementation card.
- Removed the `#notice` DOM entirely instead of hiding it, because there is no reader-facing content to preserve.
- Kept the Source Compass rail, five library groups, all public reference links, and `/library/` alias behavior intact.
- Tightened adjacent hero/method copy after visual review surfaced remaining hidden-machinery language outside the removed section.
- Refreshed the Apocrypha visual baseline only after reviewing diffs/current screenshots and confirming they were limited to intentional Apocrypha copy, rail, and section removal.

## Risks / Uncertainties

- The broader worktree remains dirty from prior work; this task did not clean, revert, stage, or commit unrelated files.
- The visual baseline refresh updated Apocrypha baseline captures. The reviewed diffs were scoped to this intentional page change.
- The route no longer has a `#notice` anchor; this is intentional.

## Tests Run

- `git status --short --branch` - reviewed dirty tree and preserved unrelated work.
- VM-399 collision scan with `rg` - PASS, no existing VM-399 references before card creation.
- Runtime static scan over `apocrypha/index.html`, `assets/css/apocrypha.css`, and `assets/js/apocrypha.js` for `#notice`, `data-rail-link="notice"`, `Not Published`, `What Is Not Published`, `Private Working Material`, `Scoring logic`, `Prompt internals`, `Hidden weights`, `Placement calculations`, `Unpublished working notes`, and `apoc-redaction` - PASS, no matches.
- Broader runtime copy scan for private/internal/prompt/scoring/unpublished language - PASS, only `aria-hidden` attributes remain.
- Route-shape assertion - PASS: `sourceTomes=5`, `libraryGroups=5`, `referenceLinks=49`, `method=true`, `railNotice=false`, `noticeSection=false`, `footerAfterMethod=true`, `libraryAlias=true`.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS, with existing LF/CRLF warnings only.
- `npm.cmd run test:visual:apocrypha` before baseline refresh - expected FAIL after intentional removal/copy shifts: `hero-desktop: 8824`, `hero-mobile: 17793`, `references-desktop: 3568`.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` after baseline refresh - PASS with `hero-desktop: 0`, `hero-mobile: 0`, `references-desktop: 0`.
- Manual-style screenshot/static QA - PASS: page rail no longer includes `Not Published`, Source Compass still shows five tomes, public reference groups remain visible, `/library/` still resolves to Apocrypha, and footer follows `How These References Are Used`.

## Not Touched

- `assets/js/apocrypha.js`
- Placement logic
- Generated placement data
- Raw faction packets
- Commander facts
- Source claim ledgers
- Route aliases, including `/library/`
- Non-Apocrypha pages
- VM-398 backlog content
- Source Compass group/tome behavior
- Public source link text, hrefs, order, or count
- Historical docs/cards that preserve older Apocrypha state
- Git staging, commits, pushes, tags, merges, or main promotion

## Follow-Up Recommendations

- Keep Apocrypha page copy focused on what readers can use: public references, grouping, and source support.
- If future public-source governance copy is needed, keep it short and place it near `How These References Are Used`, not as a standalone private-system disclosure panel.

## Next Suggested Agent

Documentation Steward for future Apocrypha copy governance, or Planning Architect if VM-398 is ready to be scoped.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-399-apocrypha-not-published-section-removal.md`
- `docs/kanban/backlog/VM-398-apocrypha-research-vault-backlog-preservation.md`
- `docs/handoffs/2026-06-15-0701-codex-vm398-apocrypha-phase2-suppression.md`
- `docs/reference/manual-test-cases.md`
