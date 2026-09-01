# Codex Handoff - VM-614 Surgical Hero Width Correction

- **Agent name:** Codex
- **Task requested:** Make the existing Guide hero copy use the whole section width and slim only that panel.
- **Related work:** VM-614 Field Guide foundation and global discoverability
- **Disposition:** RobQA READY - Owner Review required

## Files Reviewed

- Repo-local RobDev/RobQA skills, usage guides, and frozen gates
- Browser skill and the actual rendered Guide hero
- Current VM-614 card, board, QA evidence, handoff index, and final-presentation handoff
- `guide/index.html`, Guide CSS, Maze shell CSS, and focused Guide browser regression
- Current branch, worktree, dirty state, and the owner-provided screenshot

## Files Changed by This Correction

- `assets/css/guide.css`
- `guide/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Removed the Guide-authored `23ch` H1 and `62ch` orientation width caps.
- Let the H1/content box use the full hero width and slightly reduced only the Guide hero font scale,
  margins, and padding.
- Advanced the Guide CSS cache key from `vm614r7` to `vm614r8`.
- Added a rendered regression requiring no authored caps, a >=90% H1 width, one-line desktop title and
  orientation, a desktop hero under 360px, and preserved mobile overflow behavior.

## Why It Changed

The panel itself was full-width, but the two text caps forced an unnecessary H1/orientation wrap, left a
large empty right side, and made the hero much taller than its content required.

## RobDev Compact Packet

- **Outcome:** the exact approved hero hierarchy uses the full desktop section width in a slimmer panel.
- **Owner/producer:** explicit owner finding; `assets/css/guide.css` owns this Guide-local geometry.
- **Existing machinery reused:** current full-width Maze command deck, Guide hero selectors, and mobile H1 rule.
- **Changed behavior:** hero width utilization and vertical density only.
- **Protected behavior:** copy, semantic levels, mobile hierarchy, every following section, atmosphere,
  shared shell, Guide interaction, specialist routes/runtime, and later-route boundaries.
- **Consumers:** Guide desktop/mobile rendering and focused browser regression only.
- **Risks:** desktop line wrapping, over-shrinking, mobile hierarchy inversion, cache staleness, and overflow.
- **Smallest complete implementation:** four Guide-local CSS value changes, cache-key advance, one focused
  rendered invariant, and review records.
- **Non-goals:** no markup/content redesign, section change, interaction change, or specialist modification.
- **Stop condition:** return uncommitted to Owner Review; no integration or VM-615-617 work.

## Tests Run

- `npm.cmd run lint:html` - PASS
- `npm.cmd run lint:js` - PASS, 31 files
- `npm.cmd run test:guide-browser` - PASS
- `git diff --check` - PASS, existing line-ending warnings only
- Unrelated CPU-heavy product/semantic suites - SKIP, not justified by QA-1 Guide-local geometry

## RobQA Readiness

- **QA tier:** QA-1 presentation/styling for this correction; the larger VM-614 candidate retains its QA-3 record.
- **Desktop 1440 x 1000:** PASS; H1/orientation each use one line, full available measure, hero is visibly slimmer.
- **Mobile 390 x 844:** PASS; exact hierarchy wraps naturally and page width remains contained.
- **200% zoom equivalent:** PASS through the existing focused Guide browser gate.
- **Manual finding converted to invariant:** desktop H1/orientation must not be narrowed by Guide-authored
  max-width caps and the resulting hero cannot regress to the rejected tall composition.
- **Remaining owner judgment:** whether this full-width/slimmer hero is the desired optical balance.

## Visual Witnesses

- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-hero-r8-desktop.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-hero-r8-mobile.png`

## Risks / Uncertainties

- Owner acceptance is still required.
- The complete VM-614 candidate remains uncommitted in the continuing worktree.

## Not Touched

- Hero HTML copy/order and every section below it
- Guide Maze specimen behavior
- Shared or specialist CSS/JS, atmosphere, product semantics, state, persistence, or telemetry
- Commit, push, PR, merge, VM-615, VM-616, or VM-617

## Follow-up Recommendations

- Owner judges the hero only at `http://127.0.0.1:4176/guide/`.
- If accepted, close/integrate VM-614 only in a separately authorized run.

## Next Suggested Agent

Owner reviewer.

## Related Kanban, Docs, and Plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/2026-08-31-2156-codex-vm614-final-presentation-owner-review.md`
