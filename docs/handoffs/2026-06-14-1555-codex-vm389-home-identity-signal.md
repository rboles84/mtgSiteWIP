# 2026-06-14 15:55 - Codex - VM-389 Home Identity Signal Promotion

## Agent Name

Codex

## Task Requested

Implement VM-389: promote all 37 v1 live placement identities into the Home Identity Signal only, preserve public-surface boundaries, update tests/docs from 20 to 37, run verification, and record v1 release blockers without staging, committing, pushing, or tagging.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-06-14-0939-codex-vm386-publish-gate-dossier-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-367-wubrg-gold-layer1-layer2.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `data/identity-layers.json`
- `assets/js/home.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `scripts/frontend-smoke.mjs`
- The three commits behind `origin/main`: `2cae196`, `8bc931c`, and `efb44c4`

## Files Changed

- `data/identity-layers.json`
- `assets/js/home.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `scripts/frontend-smoke.mjs`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1555-codex-vm389-home-identity-signal.md`

## What Changed

- Promoted the 17 missing live identities into the Home preview registry: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`, `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`, `COLORLESS`, and `WUBRG`.
- Added `preview_order` values `20-36`, labels, titles, text, hex values, and deterministic preview scores for those identities.
- Updated Home preview metadata notes from the stale 20/34/false wording to the VM-389 37-identity policy.
- Hardened Home rendering so `COLORLESS` uses a neutral single Profile signal instead of an empty overlay and so 4/5-color glow stops spread across the signal.
- Added an aria label to the Home dataset pill container for profile and overlay states.
- Updated quick-reading, Archscry follow-up, and frontend-smoke tests to expect 37 Home preview identities.
- Updated reference docs/manual QA from 20 preview identities to 37.
- Created and closed the VM-389 Kanban card.

## Why It Changed

Archscry/placement had reached 37 live identities, but Home still showed only the historical 20-entry preview set. For v1, the main-page Identity Signal needed to represent every live placement identity without expanding public routes, aliases, Maze behavior, schema/API surfaces, directory links, generated outputs, or placement behavior.

## Decisions Made

- Current feature branch remains the intended release source of truth.
- The three old `origin/main` commits were inspected; no compatible old-main changes were preserved because the add/remove mock commits net out and the older app import is not a safe merge target for the current branch.
- `preview_scores` do not use placement result scores. They derive from existing mono-color Home preview scores by deterministic color-membership averaging, with `COLORLESS` using `[50,54,50,46,48]`.
- Long taglines for Abzan, Temur, Sultai, and Mardu were kept out of `preview_title` and placed at the start of `preview_text` to keep Home titles readable.
- The two untracked decomposition HTML files remain design-archive prototype candidates under `docs/research/`; VM-389 added no runtime imports, links, route exposure, release dependency, staging, or commit.
- Lighthouse was not rerun because the script rewrites tracked `docs/audits/lighthouse-home.html`; the prior VM-365 Performance `86` result remains the active release blocker.

## Risks / Uncertainties

- `npm.cmd run test:visual:home` still fails current budgets: mobile `59375`, tablet `101005`, desktop `132490` mismatched pixels against budget `300`.
- VM-387's known Archscry and Strategium visual failures remain unresolved and were not rerun in VM-389.
- VM-154 Home horizontal overflow remains unresolved; the VM-389 browser probe re-observed overflow with `scrollWidth: 903` and `clientWidth: 785`.
- The working tree still contains uncommitted VM-387/VM-388 changes plus the two untracked decomposition HTML files.
- Git continues to report line-ending warnings and cannot access the user-level Git ignore file in some status/check commands.

## Tests Run

- `node --check assets/js/home.js` - PASS.
- `node --check assets/js/quick-reading-tests.js` - PASS.
- `node --check research/archscry-dossier-followup-tests.js` - PASS.
- `node --check scripts/frontend-smoke.mjs` - PASS.
- Targeted VM-389 count/order probe - PASS, 37 preview identities and contiguous `0-36`.
- `node assets/js/quick-reading-tests.js` - PASS, 37 factions and 37 golden paths.
- `node research/archscry-dossier-followup-tests.js` - PASS.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd run test:parser` - PASS, 115 parser cases.
- `npm.cmd run test:placement` - PASS.
- `npm.cmd run dossier:audit` - PASS, 0 failures and 113 warnings.
- `npm.cmd run test:presentation-snapshots` - PASS, 16 fixed cases.
- `git diff --check` - PASS with line-ending warnings only.
- `npm.cmd run test:visual:home` - FAIL, existing Home visual baseline/overflow blocker remains.
- Puppeteer/Chrome Home runtime probe - PASS for 37 registry count, Colorless Profile rendering, and WUBRG overlay rendering; re-observed Home overflow.

## Not Touched

- Public routes, lowercase aliases, Maze behavior, directory links, schema/API surfaces, generated placement output, placement-model behavior, raw lore, Commander facts, claim/source ledgers, generated faction output, Supabase behavior, VM-387/VM-388 runtime CSS, staging, commits, pushes, or tags.

## Follow-Up Recommendations

- Resolve or explicitly waive VM-154 Home overflow before v1 production-ready/main promotion.
- Resolve or explicitly waive Home, Archscry, and Strategium visual failures.
- Resolve or explicitly waive Lighthouse Home Performance `86` vs required `90`.
- Classify/stage the two decomposition HTML prototypes only if final release cleanup decides they should become committed design-archive artifacts.

## Next Suggested Agent

Frontend Visual QA for VM-154/Home visual readiness, then Release Manager for final main promotion policy.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/done/VM-365-full-test-sweep-html-report.md`
- `docs/kanban/done/VM-387-apocrypha-visual-consistency-repair.md`
- `docs/kanban/done/VM-388-apocrypha-card-spacing-repair.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
