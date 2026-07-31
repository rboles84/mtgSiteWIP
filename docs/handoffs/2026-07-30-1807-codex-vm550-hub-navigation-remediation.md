# 2026-07-30 18:07 - Codex - VM-550 Strategium Hub Navigation Remediation

## Agent name

Codex

## Task requested

Implement one narrowly bounded owner-review remediation from exact SHA `43e0ed0cc0436dc9c0da38d4eff1e980e058b00f`: make every global Strategium desktop, cloned mobile, and intended footer link reach the canonical `/strategium/` hub without disturbing legitimate Console-local anchors or accepted VM-550 behavior.

## Authority and worktree proof

- Control repository: `C:\dev\voxmana.io`
- Approved worktree: `C:\dev\voxmana.io-strategium-after-game-mvp`
- Branch: `codex/vm550-strategium-after-game-mvp`
- Original VM-550 base: `ce406477a83be8529ed4a09602438168463d4b45`
- Required and proved starting HEAD: `43e0ed0cc0436dc9c0da38d4eff1e980e058b00f`
- Candidate status before editing: clean
- Git registration: exact approved worktree and branch
- Control-worktree tracked status before editing: clean
- Old temporary worktree: absent
- Implementation commit: `d037a4cdfea5355164c5dc18c2b746fb2a05a1ea`
- Final validation-and-handoff HEAD: this document's commit; use the exact full SHA reported by Git for owner review.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Latest relevant VM-550 handoffs
- `docs/kanban/board.md`
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- Repository preflight, testing, accessibility, manual-browser, and efficiency instructions
- `strategium/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `assets/js/vm-topbar.js`
- `assets/js/strategium.js`
- `scripts/strategium-review-tests.mjs`

## Files changed

Implementation and tests:

- `strategium/console/index.html`
- `scripts/strategium-review-tests.mjs`

Documentation:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-07-30-1149-codex-vm550-independent-review-remediation.md`
- `docs/handoffs/2026-07-30-1807-codex-vm550-hub-navigation-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

### Root cause

The Console header's global Strategium product-area link used `href="#strategium"`, which correctly identifies an internal Console section but is not the canonical product hub. The Console footer repeated the same destination. `assets/js/vm-topbar.js` clones every desktop `.vm-nav-link` into the mobile menu, so the incorrect desktop href automatically propagated to mobile.

### Desktop navigation

The Console desktop Strategium link now uses `href="../"`, matching the repository's static child-route convention and resolving to `/strategium/`. The Hub already used `./` and Review already used `../`; both were audited and left unchanged.

All three desktop links retain:

- `data-vm-nav="strategium"`
- `data-nav-hint="Commander table literacy"`
- `aria-current="page"` from the existing shared runtime
- existing focus, hover, active, and keyboard behavior

### Mobile navigation

The shared topbar runtime remains unchanged. It clones the corrected desktop link, including its canonical href, current state, hint, and semantics. Focused and manual checks activate the cloned link from both Review and Console and confirm the hub destination and Browser Back restoration.

### Footer and internal-anchor audit

- Review footer Strategium: already `../`; unchanged.
- Console footer Strategium: changed from `#strategium` to `../`.
- Hub footer: contains specific Review and Console links rather than a redundant Strategium self-link; unchanged.
- Review `Return to Strategium` action: already `../`; unchanged.
- Console `id="strategium"` and `#strategium` history compatibility: legitimate internal destination; unchanged.
- Console `#top`, lesson hashes/queries, readiness destination, and contextual `← Return to your game review`: unchanged.

## Why it changed

The product-area navigation label promises the parent Strategium experience, but the Console markup treated that global action as a local section jump. Correcting only the two misclassified links restores the hub contract without altering the Console's real internal anchor compatibility.

## Decisions made

- Use route-relative `../` from Console, consistent with Review and the static-site routing convention.
- Do not change `vm-topbar.js`; the clone behavior is correct once its source href is correct.
- Do not delete or rename the Console `strategium` section ID.
- Preserve active product-area styling even though activating the current item navigates to the parent hub.
- Expand the existing focused suite instead of introducing a separate test harness.

## Regression coverage

Focused tests now assert:

- Hub desktop Strategium target is `./`.
- Review and Console desktop targets are `../`.
- Desktop activation from Hub remains valid.
- Desktop activation from Review and Console reaches `/strategium/`.
- Browser Back restores the exact Review path or Console lesson query.
- Review and Console cloned mobile targets are `../`, retain `aria-current="page"`, and reach the hub.
- Browser Back from mobile restores the exact child state.
- Review and Console global footer links reach the hub and restore through Back.
- Console markup contains no global `href="#strategium"`.
- The legitimate Console `id="strategium"` remains.
- Footer Back to top and floating Top remain route-local.
- Historical `#strategium`, Console lessons, readiness, contextual return, 24 paths, 15 results, exact return allowlist, wrong-target, dialog, checklist, and unique top anchors remain covered.

## Tests run

- `node --check scripts/strategium-review-tests.mjs` - passed
- `npm.cmd run test:strategium-review` - passed, including canonical desktop/mobile/footer hub navigation and all prior VM-550 regressions
- `npm.cmd run lint:js` - passed
- `npm.cmd run lint:html` - passed
- `npm.cmd run test:copy-boundaries` - passed
- `npm.cmd run test:route-metadata` - passed
- `npm.cmd run test:frontend-smoke` - passed
- `npm.cmd run test:browser-smoke` - passed desktop and mobile on the third independent run; the first two attempts hit the existing unrelated desktop Home identity-canvas visibility flake
- Focused internal-link validation in `scripts/strategium-review-tests.mjs` - passed for all three Strategium routes
- `npm.cmd test` - passed using the authorized implementation-worktree method
- `git diff --check` - passed

Aggregate report hash proof:

- `docs/audits/gate-compression/live-gate-bias.json`
  - before and after: `054CE17043DFA6438F99778C429857B2BE240CE9C4AA693BC0EEFBCFB58CD118`
- `docs/audits/gate-compression/live-gate-bias.md`
  - before and after: `3B0368A5B358CD4C7D8BD5863885BAC3291BB86AD9DFED9826A5462ACEE1FED9`

Neither aggregate report changed or entered the candidate diff.

## Manual browser validation

In-app browser validation passed at:

- 1440 x 900
- 390 x 844
- 320 x 568

Verified:

- `strategium/index.html` → Open the Console → desktop Strategium → `/strategium/`.
- Hub → guided Review → desktop Strategium → `/strategium/`.
- Console mobile menu → Strategium → `/strategium/`.
- Review mobile menu → Strategium → `/strategium/`.
- Browser Back restores Console and Review child routes.
- Back restores `?lesson=heat-management` and its Heat Management content.
- Back restores `?path=after-game/won-unclear` and the exact `won-unclear` result.
- A valid contextual return still restores `after-game/lost/other-plan/wrong-piece` as `wrong-target`.
- Console footer Strategium reaches the hub and Back restores its lesson.
- Footer Back to top and floating Top stay in `/strategium/console/`; the route has one `#top`.
- No horizontal overflow at the tested sizes.

Browser console warnings/errors: none.

## Risks / uncertainties

- The first two whole-site browser-smoke attempts repeated the known unrelated Home canvas-render timing failure. The third independent run passed desktop and mobile; no unrelated source was changed.
- The global hub link and the legitimate Console section share the word Strategium. Regression checks therefore distinguish `data-vm-nav="strategium"` and footer links from `id="strategium"` and historical hash behavior.

## Not touched

- Control-worktree tracked files
- Hub or Review runtime markup beyond validation
- `assets/js/vm-topbar.js` or shared navigation architecture
- Diagnostic flow, 24 paths, 15 results, copy, path/result mappings, or lesson mappings
- Authored-path registry or exact-return validator
- Lesson dialog, feedback, recovery, readiness checklist, or Console lesson content
- Hub/checklist/dialog visual design or CSS
- Unfinished situation families
- Unrelated routes, research tooling, generated data, visual baselines, dependencies, frameworks, persistence, or analytics
- Push, merge, rebase, deployment, certification, integration, or production-readiness status

## Follow-up recommendations

Owner hand review of the new exact SHA. Then repeat the independent review gate against that exact SHA.

Do not certify or integrate until both steps approve the same exact SHA.

## Next suggested agent

Product owner performing the exact-SHA hand review, followed by a separate independent reviewer if the owner approves.

## Related Kanban card, docs, or plans

- VM-550
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-07-30-1149-codex-vm550-independent-review-remediation.md`
- `docs/handoffs/2026-07-29-2322-codex-vm550-final-visual-acceptance-refinement.md`
- `docs/handoffs/2026-07-29-2237-codex-vm550-final-owner-review-polish.md`

## Commit record

- Required starting candidate: `43e0ed0cc0436dc9c0da38d4eff1e980e058b00f`
- Hub-navigation implementation and focused tests: `d037a4cdfea5355164c5dc18c2b746fb2a05a1ea`
- Validation and handoff: this document's commit
