# Agent Handoff

- Agent name: Codex
- Task requested: Implement VM-251 Glint controlled runtime promotion so exactly one live key, `GLINT`, becomes active through the existing identity registry and generated surfaces while preserving metadata-only `UBRG`, keeping raw Glint JSON byte-stable, and adding no new route or Home preview surface.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-0718-codex-vm250-glint-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-251-glint-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-245-yore-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-250-glint-review-gate.md`
- `docs/architecture/route-ownership-matrix.md`
- `data/identity-layers.json`
- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.claims.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/identity-layers.js`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/done/VM-251-glint-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1240-codex-vm251-glint-controlled-runtime-promotion.md`

## What Changed

- Added a live `GLINT` expression to `data/identity-layers.json` with `kind: "four_color"`, `colors: ["U","B","R","G"]`, technical aggregate `core_color: "UBRG"`, `aliases: ["GLINT"]`, `placement_eligible: true`, `preview_eligible: false`, and `suppress_directory_links: true`.
- Extended the Yore-style builder surface in `research/build-faction-artifacts.mjs` so `glint -> GLINT` generates a live faction, placement model entry, lateral inhibition map, placement copy override, four gate answers, and two Glint-specific hall questions.
- Added Glint flavor-preference seeding in `research/build-archscry-flavor-snippets.mjs`.
- Added live Commander/dossier guidance for `GLINT` in `assets/js/commander-dossier.js`.
- Added live presentation copy for `GLINT` in `assets/js/archscry-presentation.js`.
- Expanded focused runtime/test coverage in `assets/js/quick-reading-tests.js` and `research/archscry-dossier-followup-tests.js` for:
  - live `GLINT` expression presence
  - `UBRG` permutation suppression
  - no directory links for Glint
  - no Home preview entry for Glint
  - no hero-image rollout for Glint
  - generated faction / placement / flavor / guild-recruiter presence
- Regenerated approved outputs only through:
  - `npm.cmd run build:factions`
  - `node research\build-archscry-flavor-snippets.mjs`

## Why It Changed

- VM-250 approved Glint for controlled promotion planning only.
- VM-251 needed to mirror the Yore promotion pattern while preserving Glint’s stricter route, preview, and metadata boundaries.
- The runtime needed one live key for the new four-color lane without promoting `UBRG`, `Chaos`, or any permutation as public identity names.

## Decisions Made

- Promoted exactly one live key: `GLINT`.
- Kept `UBRG` as technical aggregate metadata only.
- Kept `Chaos` out of aliases and out of live/public key exposure.
- Added no `/glint/`, `/ubrg/`, or permutation route surfaces.
- Kept `GLINT` outside Home preview and outside the current dossier hero-image rollout.
- Suppressed Commander directory links for `GLINT` to avoid inventing EDHREC or MTGDecks color-code slugs.
- Left all raw Glint packet files unchanged and hash-stable.
- Accepted no schema broadening; `data/placement-model.schema.json` ended with no content diff.

## Risks / Uncertainties

- This is the first live UBRG aggregate, so future QA should watch for any downstream assumptions that all live identities have public route aliases or hero-image coverage.
- The Glint flavor snippet set is valid and source-grounded, but it did not surface `Yidris`; future flavor tuning may still want a more obviously Glint-facing curated pair if stronger source-grounded cards are preferred.
- The worktree was already dirty with unrelated runtime, docs, and asset changes; this pass preserved them but did not normalize them.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check research\build-archscry-flavor-snippets.mjs`
- `node --check assets\js\identity-layers.js`
- `node --check assets\js\index.js`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Focused SHA-256, count-delta, forbidden-route, preview, hero-rollout, raw-stability, and schema-diff checks

## Not Touched

- `data/raw-factions/glint/**`
- `docs/research/glint/**`
- `docs/architecture/colors/glint/**`
- `data/placement-model.schema.json` content
- Home preview membership
- public `/glint/`, `/ubrg/`, or permutation routes
- non-Glint four-color lane implementation surfaces beyond shared Yore-precedent code paths

## Follow-Up Recommendations

- Run manual Archscry UI QA for live `GLINT` dossier presentation, starting-lane copy, and deck-search links to confirm the directory-link suppression reads well in-browser.
- If future copy review wants a more distinctive Glint flavor packet, do it as a bounded follow-up rather than widening VM-251.
- Keep any future Glint route work on its own card; VM-251 intentionally left route surfaces unchanged.

## Next Suggested Agent

- Test Strategist or Documentation Steward for post-promotion manual QA and any follow-up live-copy polish if needed.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-251-glint-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-250-glint-review-gate.md`
- `docs/handoffs/2026-06-03-0718-codex-vm250-glint-review-gate.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/architecture/route-ownership-matrix.md`
