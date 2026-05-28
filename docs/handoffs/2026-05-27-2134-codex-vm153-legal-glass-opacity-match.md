# 2026-05-27 21:34 - Codex - VM-153 Legal Glass Opacity Match

## Agent name

Codex

## Task requested

Match the Privacy and Terms glass opacity to the VM-142 Maze/Strategium opacity decision the user called out: darker `0.72 / 0.56` primary glass for the hero, lighter `0.62 / 0.44` glass for secondary cards, and no major-panel blur.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2308-codex-vm142-maze-strategium-glass.md`
- `docs/handoffs/2026-05-27-2131-codex-vm152-legal-page-visual-alignment.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-142-maze-strategium-glass-unification.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `assets/css/maze.css`
- `assets/css/legal.css`

## Files changed

- `assets/css/legal.css`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-153-legal-glass-opacity-match.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2134-codex-vm153-legal-glass-opacity-match.md`

Generated but ignored QA artifacts:

- `artifacts/vm153-legal-opacity/privacy-desktop.png`
- `artifacts/vm153-legal-opacity/privacy-mobile.png`
- `artifacts/vm153-legal-opacity/terms-desktop.png`
- `artifacts/vm153-legal-opacity/terms-mobile.png`

## What changed

- Set `--legal-glass-strong` to `linear-gradient(180deg, rgba(12, 16, 25, 0.72), rgba(8, 11, 18, 0.56))`.
- Set `--legal-glass` to `linear-gradient(180deg, rgba(12, 16, 25, 0.62), rgba(8, 11, 18, 0.44))`.
- Applied the stronger gradient to `.legal-hero` only.
- Left `.summary-card` and `.legal-section` on the lighter gradient.
- Changed legal major panels from blurred glass to `backdrop-filter: none`, matching the VM-142 sharp-glass decision.
- Added manual QA coverage and route ownership notes for the opacity contract.
- Moved VM-153 through Kanban and recorded this handoff.

## Why it changed

VM-152 aligned Privacy and Terms to the current public route family, but its panel opacity still used a custom heavier legal stack. The user pointed to the VM-142 Maze opacity decision as the desired match, so this pass made the legal opacity contract explicit and verifiable.

## Decisions made

- Treated legal hero as the primary surface, matching the Maze command deck.
- Treated legal summary and section cards as secondary surfaces, matching Maze sidebar/results.
- Matched the VM-142 no-blur major-panel behavior instead of only copying alpha numbers.
- Kept all styling route-local inside `assets/css/legal.css`.
- Preserved concurrent VM-022 work already present in the worktree and board.

## Risks / uncertainties

- The legal cards are now intentionally more transparent, so future visual review should judge them against the VM-142 glass contract rather than the denser VM-152 first pass.
- Legal text remains sensitive and should continue to be human-reviewed before any content edits.
- The in-app Browser plugin still could not initialize in this Windows sandbox, so responsive visual QA used Puppeteer with local Edge.

## Tests run

- `npm.cmd run lint:html` - passed
- `npm.cmd run test:frontend-smoke` - passed
- Headless browser responsive QA at desktop `1365x1000` and mobile `390x900` for both Privacy and Terms - passed:
  - hero computed to `rgba(12, 16, 25, 0.72)` to `rgba(8, 11, 18, 0.56)`
  - summary and section cards computed to `rgba(12, 16, 25, 0.62)` to `rgba(8, 11, 18, 0.44)`
  - major legal panels computed to `backdrop-filter: none`
  - `../assets/css/legal.css` remained the final stylesheet
  - inline `<style>` count stayed zero
  - topbar and footer links remained present
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed after docs

## Not touched

- Legal copy and service disclosure wording
- Privacy and Terms HTML structure, route links, background asset, topbar, and script tags
- Maze, Strategium, Archscry, Apocrypha, Home, generated data, Supabase behavior, and unrelated VM-022 work

## Follow-up recommendations

- If legal card readability feels too airy in human review, tune only the secondary legal alpha and record the deviation from VM-142.
- Keep future legal glass changes in `assets/css/legal.css` unless a shared route-surface abstraction is explicitly scoped.

## Next suggested agent

Visual QA reviewer if the legal opacity needs another taste pass; otherwise no specialist follow-up needed.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-153-legal-glass-opacity-match.md`
- `docs/kanban/done/VM-152-legal-page-visual-alignment.md`
- `docs/kanban/done/VM-142-maze-strategium-glass-unification.md`
- `docs/handoffs/2026-05-26-2308-codex-vm142-maze-strategium-glass.md`
- `docs/handoffs/2026-05-27-2131-codex-vm152-legal-page-visual-alignment.md`
