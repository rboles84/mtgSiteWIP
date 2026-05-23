# Handoff - VM-100 Privacy / Terms Archive Document Refresh

Agent name: Codex

Task requested: Refresh `privacy/index.html` and `terms/index.html` into stronger archive-document pages while preserving the shared Vox Mana shell, legal meaning, relative route compatibility, and the current branch's unrelated WIP.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `assets/css/tokens.css`
- `privacy/index.html`
- `terms/index.html`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`

## Files changed

- `docs/kanban/in-progress/VM-100-privacy-terms-archive-document-refresh.md`
- `docs/kanban/board.md`
- `privacy/index.html`
- `terms/index.html`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-0751-codex-vm100-privacy-terms-archive-document-refresh.md`

## What changed

- Added a new in-progress Kanban card for VM-100 and linked it from the board.
- Rebuilt both legal pages from the old narrow `.page` document treatment into a matching archive-document layout with:
  - a hero block,
  - metadata pills,
  - a summary side card,
  - wider readable section cards,
  - stronger spacing and line-height,
  - preserved glossary spans where useful.
- Restored both page backgrounds to `../assets/img/backgrounds/background-apocrypha-library-clean-01.webp` in the existing `vm-bg` shell.
- Kept the shared topbar markup, shared CSS imports, shared JS imports, route destinations, and `body` data attributes intact.
- Reorganized the Privacy page into the requested section order, including the added `At a Glance` section and explicit `Sharing and No Sale` section label while preserving the original policy meaning.
- Reorganized the Terms page into the requested section order, splitting guest-use, sign-in, and saved-results material into clearer sections without expanding the legal terms.

## Why it changed

- The previous legal pages were visually much narrower and harder to scan than the newer Vox Mana route shells.
- VM-100 aligns these policy pages with the current archive/document direction while keeping the legal content conservative and recognizable.
- The new structure makes both pages easier to read on large screens and easier to follow on mobile without changing the route shell or adding dependencies.

## Decisions made

- Used only the approved page-local legal layout class names inside the refreshed content area.
- Preserved the topbar and background shell markup instead of trying to modernize route wrappers.
- Restored the archive-library background image even though the local branch had drifted to the gateway background family.
- Kept the pages visually consistent siblings, but left their copy document-specific.
- Did not attempt a localhost or alternate-browser workaround after the Browser skill blocked direct `file://` navigation for these pages.

## Risks / uncertainties

- Browser verification against the local `file://` pages could not be completed in the in-app Browser flow because the Browser Use URL policy blocked navigation to those local file URLs.
- Because the Browser policy explicitly rejected that navigation, no alternate browser-control workaround was attempted.
- `terms/index.html` had to be rewritten as a full file after a patch mismatch in the old content block; shell text was preserved to match the current route state, but that file still carries the branch's existing mojibake-style punctuation in the title/topbar strings.
- The worktree already contained unrelated modified files and untracked VM-099 docs; those were intentionally left alone.

## Tests run

- Static verification:
  - `rg -n 'class="page"|background-apocrypha-library-clean-01|legal-page|summary-card|vm-gloss|reduce-motion.js|vm-topbar.js' privacy/index.html terms/index.html`
  - confirmed required shared CSS and JS imports remain
  - confirmed both files use the apocrypha-library background path
  - confirmed glossary spans remain present
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- privacy/index.html terms/index.html`
  - reported existing LF/CRLF normalization warnings only
- `npm.cmd test`
  - passed
- Browser verification attempt:
  - loaded the bundled Browser skill
  - initialized the in-app browser runtime
  - attempted to navigate to `file:///C:/dev/mtgSiteWIP/privacy/index.html` and `file:///C:/dev/mtgSiteWIP/terms/index.html`
  - blocked by Browser Use URL policy before page QA could continue

## Not touched

- `apocrypha/index.html`
- `archscry/index.html`
- `basics/index.html`
- `newIndex2.html`
- shared CSS assets
- shared JS assets
- route contracts
- Supabase functions
- unrelated research/docs drift already present in the branch

## Follow-up recommendations

- If browser-backed QA is still required before commit, run the same checks against a permitted served preview URL rather than the blocked `file://` targets.
- If the legal pages are approved visually, consider a later cleanup pass that normalizes the mojibake punctuation already present in route-shell strings across these legacy static files.
- When VM-100 is complete, move the new Kanban card from `in-progress` to `done` with its completion notes and tests.

## Next suggested agent

- Frontend QA once a browser-servable preview route is available, or Documentation Steward for final Kanban state cleanup after acceptance.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-100-privacy-terms-archive-document-refresh.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`
