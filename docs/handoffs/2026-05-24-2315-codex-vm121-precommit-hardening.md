# Agent Handoff - VM-121 Pre-commit Hardening

- Agent name: Codex
- Task requested: Implement the VM-121 pre-commit hardening fixes so the extracted `newIndex2.html` branch is stable and mergeable before commit.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
- `docs/kanban/done/VM-121-phase-4-newindex2-extraction.md`
- `scripts/visual-regression-newindex2.mjs`
- `assets/js/newindex2.js`
- `scripts/validate-frontend-html.mjs`
- `assets/css/newindex2.css`

## Files changed

- `scripts/visual-regression-newindex2.mjs`
- `assets/js/newindex2.js`
- `scripts/validate-frontend-html.mjs`
- `assets/css/newindex2.css`
- `docs/kanban/done/VM-121-phase-4-newindex2-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2315-codex-vm121-precommit-hardening.md`

## What changed

- Added capture-only CSS in the visual-regression harness to hide `.vm-bg__stars`, `#vmHeroManaChart`, and `.vm-radar-glow`, and to disable transition and animation noise during screenshot capture.
- Added baseline artifact validation in compare mode so missing baseline PNGs or JSON now fail with a friendly instruction instead of raw `ENOENT`.
- Added a deterministic visual-regression identity hook and wired `newindex2.js` to honor `window.__vmVisualRegressionHeroIdentityId` when present.
- Guarded the `backTop` scroll listener against a missing `#backTop` element.
- Narrowed the secondary reveal observer to `.hero-card` only so `.reveal` elements are no longer observed twice.
- Replaced the validator’s regex-only inline-script rejection with executable-inline-script detection that allows non-executable inline script types such as `application/ld+json`.
- Dedented the appended `.cag-spiral*` rules and normalized the tail of `assets/css/newindex2.css`.

## Why it changed

- The visual harness needed a little more determinism before the branch could be committed with confidence.
- The page runtime had a small null-safety footgun around the back-to-top button.
- The validator was stricter than intended for future non-executable inline script types.
- The CSS tail cleanup removes avoidable extraction residue before the commit is cut.

## Decisions made

- Kept the existing `<= 300` pixel mismatch budget and the current canvas-masking comparison strategy.
- Fixed the hero identity deterministically with `boros` in the harness because it exercises the multicolor overlay/dataset-pill path.
- Treated the missing-baseline compare path as important enough to verify directly, not just by inspection.
- Left user-facing runtime behavior unchanged when the visual-regression hook is absent.

## Risks / uncertainties

- The harness remains opinionated toward static shell parity rather than raw canvas-image equality, so future reuse on other pages may need page-specific masking decisions.
- `.hero-card` is not present in the current `newIndex2.html` markup, so the narrowed legacy observer remains effectively dormant on this page.

## Tests run

- `npm.cmd run test:visual:newindex2:baseline`
- `npm.cmd run test:visual:newindex2`
- Negative-path visual compare with `artifacts/visual-regression/newindex2/baseline/mobile.png` temporarily hidden
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- `assets/css/home.css`
- `assets/js/home.js`
- `strategium/index.html`
- `assets/js/graph.js`
- Route copy, layout, and feature behavior outside the deterministic test hook path

## Follow-up recommendations

- When the branch is committed, fold this hardening pass into the same VM-121 commit series rather than creating a separate feature card.
- If the visual harness gets reused for other pages, extract the baseline-artifact validation and capture-style injection into shared helpers.
- Keep the `newIndex2_Old.html` retirement folded into the same VM-121 commit/merge-back closeout rather than spinning it into a separate cleanup card.

## Next suggested agent

- Codex or a release-focused agent to stage, commit, and merge VM-121 back into `feature/ui-refactor-exploration`.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-121-phase-4-newindex2-extraction.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
