# 2026-07-30 11:49 - Codex - VM-550 Independent-Review Remediation

## Agent name

Codex

## Task requested

Implement the narrowly bounded remediation for the independent-review findings against owner-approved exact SHA `e53e8319ecc77bea12e1e33e30914cacc83c1531`: require exact authored-result Console returns, add complete positive and negative regressions, remove duplicate `id="top"` values from the three Strategium routes, and update the VM-550 validation record.

## Authority and worktree proof

- Control repository: `C:\dev\voxmana.io`
- Approved worktree: `C:\dev\voxmana.io-strategium-after-game-mvp`
- Branch: `codex/vm550-strategium-after-game-mvp`
- Original VM-550 base: `ce406477a83be8529ed4a09602438168463d4b45`
- Required and proved starting HEAD: `e53e8319ecc77bea12e1e33e30914cacc83c1531`
- Candidate status before editing: clean
- Git registration: exact approved worktree path and branch
- Control-worktree tracked status before editing: clean
- Old temporary path `C:\tmp\voxmana.io-strategium-after-game-mvp`: absent
- Implementation commit: `e494a114870740a517fafc246ec52df844634748`
- Final validation-and-handoff HEAD: this document's commit; use the exact full SHA reported by Git for owner review.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Original and every relevant VM-550 remediation/owner-review handoff
- `docs/kanban/board.md`
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- Repository workflow, preflight, test, accessibility, copy-boundary, and manual-browser instructions
- Complete VM-550 diff from original base through the starting candidate
- Strategium hub, review, Console, shared runtime, focused tests, and frontend validation scripts
- The unrelated aggregate-suite gate-bias writer only to identify and hash its two outputs; its implementation was not changed

## Files changed

Implementation and tests:

- `assets/js/strategium-review-paths.js`
- `assets/js/strategium-review.js`
- `assets/js/strategium.js`
- `scripts/lint-frontend-js.mjs`
- `scripts/strategium-review-tests.mjs`
- `strategium/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`

Documentation:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-07-29-2322-codex-vm550-final-visual-acceptance-refinement.md`
- `docs/handoffs/2026-07-30-1149-codex-vm550-independent-review-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

### Exact authored-result authority

`assets/js/strategium-review-paths.js` is one immutable registry with the accepted 24 exact leaf paths. Each frozen record carries its accepted result identifier and ordered lesson identifiers. The review runtime, Console return validator, and focused tests consume this same registry.

The diagnostic still owns question and result prose. It now verifies a result-bearing trail against the registry before rendering a result, obtains lesson IDs from the registry, and only emits a full-Console return parameter from a registered result path. No result copy, question copy, result identity, path mapping, or lesson order changed.

The Console return validator now requires:

- exactly one outer `return` value;
- no outer query key other than `lesson` and `return`, and no duplicate lesson value;
- same origin and exact `/strategium/review/` pathname;
- exactly one destination `path` query key and no destination hash;
- a decoded path that is an own key of the immutable authored-result registry.

Successful validation produces one canonical local result URL. Failure leaves the requested valid Console lesson rendered and exposes no return link.

### Positive return coverage

The focused browser suite derives its path cases from the runtime registry and tests all 24 exact authored results. For each case it confirms:

- the contextual return is visible;
- the `href` is the canonical exact result URL;
- the selected Console lesson renders;
- activating the link returns to the same exact path;
- the accepted result identifier renders;
- no recovery notice or earlier question-stage normalization occurs.

The 24 cases retain three one-lesson paths, twenty two-lesson paths, and one three-lesson path. Representative direct-after-Game, nested Detail, `wrong-target`, and readiness-checklist behavior remains covered.

### Negative return coverage

Twenty-seven categories fail closed:

- partial states: `after-game`, `after-game/lost`, and the three authored Detail-question prefixes;
- invented paths at top-level, Game, and Detail depth;
- a valid prefix with an extra segment;
- a valid nested result with an extra segment;
- two impossible combinations assembled from real segments;
- external HTTPS;
- protocol-relative;
- unrelated same-origin route;
- JavaScript scheme;
- empty return;
- missing return;
- malformed encoding;
- unsupported destination query key;
- traversal-like path;
- duplicate destination `path`;
- duplicate outer `return`;
- duplicate outer `lesson`;
- unsupported outer query key;
- destination hash;
- unsupported destination query combination.

Every rejection asserts that the contextual link stays hidden and has no `href`, the browser remains in `/strategium/console/`, Threat Reading still renders, no script marker executes, and the accumulated browser console remains clean.

### Unique top anchors

The duplicated `id="top"` was removed from each route's `<main>`, retaining the existing zero-height page-top anchor as the one authority. Focused static and browser checks assert exactly one `#top` on the hub, review, and Console.

The existing local anchor handler now temporarily disables the route's smooth-scroll CSS when moving to semantic page top, then restores the prior inline setting. Footer Back to top and the visible floating Top action reach scroll position zero and do not leave the current Strategium pathname. Console `#strategium` behavior is unchanged.

## Why it changed

The former regex accepted structurally plausible review paths that were not rendered results. That made the Console promise an exact return even when the diagnostic would normalize to a question or recovery state. The registry makes exact authored-result membership the validation boundary and prevents runtime/test drift.

Duplicate document IDs violate HTML and assistive-technology expectations. Retaining one explicit page-top anchor preserves the established anchor contract without changing landmarks or visual presentation.

## Decisions made

- Centralize only path/result/lesson identity; do not move or rewrite accepted question/result/lesson prose.
- Derive focused test cases from the same frozen registry used in production rather than maintaining a second 24-row test list.
- Fail closed on duplicate or unsupported Console query keys when a return context is requested.
- Keep the existing inline contextual return presentation and exact same-origin allowlist.
- Preserve the span page-top anchor and main landmarks; remove only the duplicated main IDs.
- Do not modify the unrelated gate-bias test or reports. Verify their pre/post hashes around the required aggregate run.

## Risks / uncertainties

- The registry is a classic script global to match the existing framework-free runtime. Both nested routes load it immediately before `strategium.js`; the focused static checks guard that script order.
- The first two independent whole-site browser-smoke attempts hit the existing Home identity-canvas visibility flake (desktop on the first run, mobile on the second). A third independent run passed both desktop and mobile. No Strategium or unrelated source was changed in response.
- No separate repository-wide internal-link script exists. The focused Strategium suite performs explicit file-target validation for all internal links on the three in-scope routes.

## Tests run

- `node --check assets/js/strategium-review-paths.js` - passed
- `node --check assets/js/strategium-review.js` - passed
- `node --check assets/js/strategium.js` - passed
- `node --check scripts/strategium-review-tests.mjs` - passed
- `npm.cmd run test:strategium-review` - passed; 24 exact result-return round trips, 27 rejection categories, 24 paths, 15 results, mappings, dialog, Console deep links, recovery, history, focus, and feedback
- `npm.cmd run lint:js` - passed for eight frontend files
- `npm.cmd run lint:html` - passed
- `npm.cmd run test:copy-boundaries` - passed
- `npm.cmd run test:route-metadata` - passed
- `npm.cmd run test:frontend-smoke` - passed
- `npm.cmd run test:browser-smoke` - third independent run passed desktop and mobile after the two unrelated Home-canvas flakes described above
- Focused internal-link validation in `scripts/strategium-review-tests.mjs` - passed for all three Strategium routes
- `npm.cmd test` - passed using the repository-authorized implementation-worktree method
- `git diff --check` - passed before implementation commit and after validation

Aggregate report hash proof:

- `docs/audits/gate-compression/live-gate-bias.json`
  - before: `054CE17043DFA6438F99778C429857B2BE240CE9C4AA693BC0EEFBCFB58CD118`
  - after: `054CE17043DFA6438F99778C429857B2BE240CE9C4AA693BC0EEFBCFB58CD118`
- `docs/audits/gate-compression/live-gate-bias.md`
  - before: `3B0368A5B358CD4C7D8BD5863885BAC3291BB86AD9DFED9826A5462ACEE1FED9`
  - after: `3B0368A5B358CD4C7D8BD5863885BAC3291BB86AD9DFED9826A5462ACEE1FED9`

The aggregate test completed. Neither report changed, and neither appears in the candidate diff.

## Manual browser validation

In-app browser validation passed at:

- 1440 x 900
- 1024 x 768
- 768 x 1024
- 390 x 844
- 320 x 568

Verified:

- one valid direct-after-Game return;
- one valid nested Detail return;
- the exact `wrong-target` return;
- partial `after-game/lost`;
- invented `after-game/not-real`;
- valid `after-game/won-unclear` plus an extra segment;
- external HTTPS and JavaScript-style values;
- requested valid lessons continue rendering for rejected returns;
- one `#top` on each route;
- Console footer Back to top and floating Top reach page top and stay within `/strategium/console/`;
- the hub retains two choices and no excessive footer gap;
- wrong-target retains two lessons and the accepted Result action set;
- contextual return is visible immediately with the selected lesson at every viewport;
- no horizontal overflow or clipped visible controls on any in-scope route.

Browser console warnings/errors: none.

## Not touched

- Control-worktree tracked files
- The 24 accepted diagnostic paths or 15 result patterns
- Question, result, lesson, feedback, or recovery copy
- Path-to-result or path-to-lesson mappings
- Lesson-dialog architecture, styling, or accessibility behavior
- Hub layout, Pod Readiness, or readiness-checklist presentation/behavior
- Before the Game, During the Game, or Finding a Table
- `assets/js/gate-compression-live-bias-tests.js`, gate-bias report architecture, or research tooling
- Unrelated routes, generated/source-governed data, visual baselines, dependencies, frameworks, persistence, or analytics
- Push, merge, rebase, deployment, certification, integration, or production-readiness status

## Follow-up recommendations

Owner hand review of the new exact SHA. Then repeat the independent review gate against that exact SHA.

Do not certify or integrate VM-550 unless both steps approve the same exact SHA.

## Next suggested agent

Product owner performing the exact-SHA hand review, followed by a separate independent reviewer if the owner approves.

## Related Kanban card, docs, or plans

- VM-550
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-07-29-2322-codex-vm550-final-visual-acceptance-refinement.md`
- `docs/handoffs/2026-07-29-2237-codex-vm550-final-owner-review-polish.md`
- `docs/handoffs/2026-07-28-0414-codex-vm550-second-owner-review-remediation.md`
- `docs/handoffs/2026-07-28-0147-codex-vm550-human-qa-remediation.md`

## Commit record

- Required starting candidate: `e53e8319ecc77bea12e1e33e30914cacc83c1531`
- Exact-result return remediation and focused tests: `e494a114870740a517fafc246ec52df844634748`
- Validation and handoff: this document's commit
