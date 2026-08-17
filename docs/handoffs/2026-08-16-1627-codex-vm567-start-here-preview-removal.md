# VM-567 Start Here Commander Preview Removal Handoff

## Agent

Codex

## Task Requested

Remove only the shared Commander card-preview block from Start Here across all 37 identities, preserve Start Here guidance and all underlying recommendation/media authority, isolate the candidate from active VM-564/VM-565 work, commit locally, and stop for owner review.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent VM-239, VM-551, VM-559, and VM-563 handoffs and cards
- `docs/kanban/board.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- Direct dossier source, replay, smoke, and manual QA owners

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `scripts/vm551-gate-a-owner-qa-tests.mjs`
- `scripts/browser-smoke.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/done/VM-567-remove-start-here-commander-card-previews.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-16-1627-codex-vm567-start-here-preview-removal.md`

## What Changed

- Removed the single `${commanderPreviewHtml}` insertion from the shared Start Here renderer.
- Preserved the Start Here heading, introduction, Commander plan, guidance details, glossary behavior, and surrounding layout.
- Updated only assertions/manual QA that encoded the rejected preview placement.
- Added rendered checks for zero Start Here card tiles, images, detail triggers, and media slots across the existing 37-identity replay, including explicit White exclusions for Giada, Adeline, and Balan.

## Why It Changed

The Commander preview cards belonged to no longer-accepted presentation inside Start Here. Commander recommendation authority and the other card/discovery surfaces remain valid and intentionally unchanged.

## Isolation And Candidate Base

- Exact base SHA: `c190be7c7eb49ff55313213dfc2c0b696289537b`.
- Final QA and commit were performed in dedicated worktree `C:\dev\voxmana-vm567` on branch `codex/vm-567-start-here-preview`.
- The primary `main` worktree contained active uncommitted VM-564 work. No VM-565 files had materialized in its status, branches, Kanban records, or handoffs at isolation time.
- VM-564 overlapped VM-567 only in the shared `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` working files. The isolated files were rebuilt from the clean base with VM-567 entries only.
- No stash, reset, discard, rewrite, staging, or commit operation was performed in the primary worktree. VM-564/VM-565 work remained untouched.

## Preliminary Combined-Worktree Evidence

These runs occurred before the final governance correction and are not candidate evidence:

- 37-identity desktop replay: PASS.
- White desktop and mobile replay: PASS.
- In-app rendered inspection of an existing Esper result at desktop/mobile: guidance remained, zero Start Here previews, no empty gap, no overflow.
- JS/HTML lint, syntax, golden paths, scoped source invariant, protected diff, and VM-559 projection: PASS.
- Two broad historical source suites stopped on pre-existing assertions before reaching VM-567 assertions.
- Browser smoke timed out before producing a reading/result and did not exercise the changed renderer.

## Isolated Candidate Evidence

- `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --collect-failures`: PASS; 37 identities, 36 named dossiers plus unchanged bounded Yore, zero failures, and zero Start Here card-bearing descendants across every replay row. All named dossiers retain `Start With This Commander Plan`.
- `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=W --collect-failures`: PASS.
- `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=mobile --identity=W --collect-failures`: PASS at 390px.
- White Start Here excludes `Giada, Font of Hope`, `Adeline, Resplendent Cathar`, and `Balan, Wandering Knight`; the focused replay still finds Giada on a separate authorized rationale surface.
- `npm.cmd run lint:js`: PASS.
- `npm.cmd run lint:html`: PASS.
- `node assets/js/quick-reading-tests.js`: PASS, 37 factions / 37 golden paths.
- `npm.cmd run test:vm559-media-projection`: PASS, unchanged 1,178 occurrences / 572 unique resolver keys / 37 identities.
- `node --check` for every changed JS/MJS file: PASS.
- Scoped Start Here source assertion: PASS.
- Protected-source diff over `data`, `assets/js/commander-dossier.js`, `scripts/archscry-media-projection-core.mjs`, and `data/scryfall/indexes`: PASS with no diff.
- `git diff --check`: PASS.
- `node research/archscry-dossier-followup-tests.js`: BLOCKED before the VM-567 assertions by pre-existing HEAD assertion at line 234 requiring obsolete copy `Why These Cards Echo This Reading`.
- `node scripts/vm551-gate-a-owner-qa-tests.mjs`: BLOCKED before the VM-567 assertions by pre-existing HEAD assertion at line 186 requiring `loadCachedScryfallNamedCard(card.name)`.

The all-37 replay's generated historical report was restored to the base version and is not part of VM-567 because it also carries unrelated historical replay state.

## Decisions Made

- Use only the shared renderer insertion point; do not patch White or any identity record.
- Keep the dormant Commander preview construction, CSS, hydration, fallbacks, and shared art infrastructure unchanged because VM-567 is not an architecture cleanup.
- Treat the VM-559 1,178/572 inventory as an unchanged observation from the normal verifier, not as a VM-567 acceptance invariant.
- Do not widen VM-567 to repair historical source-test expectations or browser-smoke result setup.
- Keep the isolated VM-567 branch durable after commit for owner review; do not advance `main`.

## Risks / Uncertainties

- The two broad historical source harnesses require separate maintenance before they can run through their later VM-567 assertions.
- Yore retains its protected bounded result state and therefore does not render a named Start Here section; its replay row nevertheless contains zero Start Here card descendants. Changing that result state is outside scope.

## RobDevPass Implementation Packet

- Owner: shared Start Here renderer in `assets/js/index.js`.
- Changed behavior: Start Here no longer inserts the Commander preview block.
- Protected behavior: all guidance, recommendation authority, non-Start-Here surfaces, placement, and media contracts.
- Consumers: 37 replay identities, focused/View All dossier rendering, desktop/mobile.
- Smallest complete change: one interpolation removal plus directly scoped regressions/manual QA.
- Non-goals and stop conditions were honored; no data, media, CSS, recommendation, routing, placement, or identity changes occurred.

## RobQAPass Readiness

- QA tier: QA-1 presentation.
- Owner-review readiness: ready at the isolated candidate SHA recorded after commit.
- Deterministic review: inspect Start Here in White at desktop/mobile and confirm guidance remains with no card block; optionally confirm the same cards still exist on authorized surfaces/source data.
- Heavy placement/journey/mutation/recovery suites were not run because this one-interpolation presentation correction does not justify them.

## Not Touched

- Commander recommendations, candidates/selections, rationales, exact cards/printings, audits/exports, routing/search links, precons, and Commander Browsing Starts
- Matrix, Card Signals, Sound/Play, Mana Notes, Basics/Premium/Midrange/Budget/Utility
- Placement, scoring, qualification, routing, result states, identity definitions
- VM-559 media producers, projections, indexes, resolver inventories, loaders, hydration branches, fallbacks, historical records, and CSS
- Active VM-564/VM-565 work

## Follow-Up Recommendations

- Owner reviews the isolated exact candidate SHA only.
- If accepted, integrate that exact candidate after coordinating with active VM-564/VM-565 work; do not merge from this pass.
- Track the two historical source-harness expectations separately if their owners want those broad suites restored.

## Next Suggested Agent

Owner reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-567-remove-start-here-commander-card-previews.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- VM-559 accepted media architecture and closeout records
