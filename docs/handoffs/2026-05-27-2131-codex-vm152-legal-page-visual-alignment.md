# 2026-05-27 21:31 - Codex - VM-152 Legal Page Visual Alignment

## Agent name

Codex

## Task requested

Respond to post-VM-145 visual QA feedback that Privacy and Terms did not match the current Home, Archscry, Maze, Apocrypha, or Strategium look and feel.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Relevant route/style handoffs, especially VM-100, VM-129B, VM-134, VM-142, VM-143, and VM-145
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-152-legal-page-visual-alignment.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `privacy/index.html`
- `terms/index.html`
- `assets/css/legal.css`
- Current public route shells and styles for Home, Archscry, Maze, Apocrypha, and Strategium

## Files changed

- `assets/css/legal.css`
- `privacy/index.html`
- `terms/index.html`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-152-legal-page-visual-alignment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2131-codex-vm152-legal-page-visual-alignment.md`

Generated but ignored QA artifacts:

- `artifacts/vm152-legal-alignment/privacy-desktop.png`
- `artifacts/vm152-legal-alignment/privacy-mobile.png`
- `artifacts/vm152-legal-alignment/terms-desktop.png`
- `artifacts/vm152-legal-alignment/terms-mobile.png`

## What changed

- Created VM-152 from the human QA feedback and moved it through the Kanban board.
- Swapped Privacy and Terms from the old Apocrypha library background to the current gateway background family.
- Changed both legal pages from `data-bg="heavy"` to `data-bg="medium"` to match the newer shared atmosphere balance.
- Reworked `assets/css/legal.css` from the old heavy archive-document surface into the current blue-black/gold public-route glass language.
- Updated legal-page eyebrow labels from `Archive Record` language to `Vox Mana` route labels.
- Preserved `../assets/css/legal.css` as the final stylesheet on both legal pages.
- Updated route ownership docs to record the legal gateway shell and the VM-152 visual alignment decision.

## Why it changed

VM-145 intentionally preserved the existing legal-page visual treatment while extracting CSS. Human QA correctly identified that the preserved look no longer matched the current route family, so VM-152 brought Privacy and Terms into alignment without reopening legal copy, navigation, scripts, or shared CSS architecture.

## Decisions made

- Kept legal pages as static policy documents, not marketing pages.
- Used the gateway background asset and medium shared atmosphere density already present in the current public-route family.
- Kept all legal-page presentation changes in `assets/css/legal.css` instead of moving selectors into shared CSS.
- Updated only the legal route label chrome; no policy language or glossary wording was changed.
- Preserved concurrent VM-022 work already present in the worktree and board.

## Risks / uncertainties

- Legal copy remains sensitive and should continue to be human-reviewed before any content edits.
- The legal pages now intentionally share the public-route visual family; future cleanup should avoid drifting them back toward the older archive-document treatment.
- The in-app Browser plugin still could not initialize in this Windows sandbox, so responsive visual QA used the repo's local Puppeteer stack instead.

## Tests run

- `npm.cmd run lint:html` - passed
- `npm.cmd run test:frontend-smoke` - passed
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed
- Headless browser responsive QA at desktop `1365x1000` and mobile `390x900` for both Privacy and Terms - passed:
  - confirmed `../assets/css/legal.css` loads last
  - confirmed inline `<style>` count is zero
  - confirmed topbar, footer links, glossary spans, gateway background image, and atmosphere canvas are present
  - confirmed desktop summary card remains sticky in the side column
  - confirmed mobile layout collapses into one readable column
  - confirmed route-family glass highlights and updated legal route labels are rendered

## Not touched

- Legal copy and service disclosure wording
- Glossary text
- Shared topbar/component CSS
- Script tags and script order
- Navigation route targets
- Generated data, Supabase behavior, Maze behavior, Archscry placement behavior, Apocrypha behavior, Strategium behavior, and unrelated VM-022 work

## Follow-up recommendations

- Keep future legal-page styling in `assets/css/legal.css` unless a separate shared-shell refactor is explicitly scoped.
- If legal pages need more visual QA, compare against the current Home/Archscry/Maze/Apocrypha/Strategium family rather than VM-100's archive-document baseline.
- Let VM-146 handle CDN/font dependency review separately.

## Next suggested agent

No specialist follow-up needed unless a human wants a stricter visual-regression harness for the legal pages.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-152-legal-page-visual-alignment.md`
- `docs/kanban/done/VM-145-legal-page-css-extraction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/handoffs/2026-05-27-2118-codex-vm145-legal-page-css-extraction.md`
- `docs/handoffs/2026-05-22-0751-codex-vm100-privacy-terms-archive-document-refresh.md`
