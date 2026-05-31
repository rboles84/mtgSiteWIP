# VM-191 Jund Archscry Placement Surface Completeness Handoff

Agent name: Codex

Task requested: Scan Jund across faction, lore, JSON, generated, and component support surfaces, then fill missing Archscry placement-page data in lore-accurate Vox Mana voice without changing raw Jund claims.

Related Kanban card: `VM-191 - Jund Archscry Placement Surface Completeness`

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `docs/handoffs/2026-05-30-2237-codex-vm189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/handoffs/2026-05-30-2303-codex-vm190-jund-starter-cards-mana-base-coverage.md`
- `data/identity-layers.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `data/identity-layers.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/done/VM-191-jund-archscry-placement-surface-completeness.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2347-codex-vm191-jund-archscry-placement-surface-completeness.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added Jund deck-link metadata so generated Archscry faction output carries a Jund-specific Commander starting-points surface.
- Filled Jund Commander Compass support data with support-only native fit commanders, archetype lanes, link targets, and operator-facing guidance.
- Filled Jund placement discriminator questions, uncertain-fit questions, and collision guidance.
- Rebuilt generated faction, placement, and Supabase context artifacts through `npm.cmd run build:factions`; schema output was checked by the builder with no direct schema diff in this scoped pass.
- Added regression coverage for Jund deck links, Commander Compass completeness, Commander preview candidate resolution, support-only boundaries, placement questions, and collision/lateral-inhibition boundaries.

## Why It Changed

Jund had been promoted and had starter cards and mana-base support, but the generated faction and placement surfaces still had gaps: missing `deck_links`, mostly empty Commander Compass fields, and empty placement question/collision support. Those gaps made Archscry placement pages lean on runtime fallback behavior instead of a complete Vox Mana source surface.

## Decisions Made

- Keep `JUND` as the live identity and keep `brg` as internal query/color metadata only.
- Treat Commander, Scryfall, deck, mechanics, and archetype material as support-only operator guidance, not canon evidence or raw claims.
- Use Vox Mana Jund language centered on instinct, appetite, self-truth, pressure, survival, consequence, and overconsumption as shadow.
- Keep Naya out of Jund generated inhibition. A Naya comparison note was left as draft collision guidance so the builder does not convert it into a live inhibition target.

## Risks / Uncertainties

- Jund Commander Compass data is intentionally support-only. Future cards can deepen it with more local catalog validation, but it should not be treated as Jund lore evidence.
- Generated artifacts changed as a result of the approved builder. Any unrelated generated churn should be reviewed before commit because the worktree already contains many pre-existing dirty files.

## Tests Run

- JSON parse checks for Jund edited raw/profile/placement/changelog files
- `node --check research/build-faction-artifacts.mjs`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `npm.cmd run build:factions`
- Generated Jund sanity check for deck links, Commander Compass fields, placement questions, collisions, and lateral inhibition
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`

## Guard Checks

- `data/raw-factions/jund/jund.claims.json` hash stayed unchanged.
- Jund raw source-role boundaries stayed intact.
- Jund public/generated copy does not use `Exact BRG`, `BRG match`, or `Jund lore proof`.
- Jund generated collision output includes Gruul, Grixis, and Witherbloom guidance without adding Naya as a Jund inhibition target.

## Not Touched

- `data/raw-factions/jund/jund.claims.json`
- `docs/research/jund/`
- `docs/architecture/colors/jund/`
- Naya research, architecture, and raw-faction paths
- Home preview entries
- Route maps or static route pages
- Maze route keys
- Jund source/evidence ledgers

## Follow-Up Recommendations

- Do a browser pass on the live Jund result page to verify the final visual layout once the user wants UI-level QA.
- Consider a later shard-wide audit that compares Bant, Esper, Grixis, Jund, and Naya Commander Compass field completeness now that the shard family is live.

## Next Suggested Agent

Test Strategist or Documentation Steward for a shard-wide Archscry placement parity audit if additional polish is desired.
