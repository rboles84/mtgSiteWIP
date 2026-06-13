# 2026-06-04 23:54 - Codex - VM-269 Witch Controlled Runtime Promotion

## Agent name

Codex

## Task requested

Implement VM-269 only: promote exactly one live/generated Witch key, `WITCH`, after VM-268 approval; use live-with-Maze rollout mode; preserve raw hashes; keep `GWUB` technical metadata/query-only; avoid Home preview, route, hero, raw JSON, schema-contract, and unrelated changes.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent Witch and four-color handoffs in `docs/handoffs/`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-269-witch-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/kanban/done/VM-266-witch-docs-parity-fill.md`
- `docs/kanban/done/VM-267-witch-non-live-raw-packet.md`
- `docs/kanban/done/VM-268-witch-review-gate.md`
- `data/raw-factions/witch/*.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`

## Files changed

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-269-witch-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-2354-codex-vm269-witch-controlled-runtime-promotion.md`

## What changed

- Added `WITCH` as the only new live identity key with `Witch / Growth` catalog/display framing, runtime/Maze label `Witch`, `core_color: "GWUB"`, existing four-color color-member fields set to `["G", "W", "U", "B"]`, `placement_eligible: true`, and `preview_eligible: false`.
- Extended the approved raw-to-live builder path with `witch -> WITCH`, Witch-specific placement copy, lateral inhibition targets, Gate answers, and Hall questions.
- Added Witch Commander guidance and Archscry presentation copy centered on patient cultivation, calculated expansion, protected growth, missing-Red pressure, and explicit anti-generic-Atraxa/counters/proliferate boundaries.
- Extended live four-color Maze behavior for WITCH with label `Witch`, no-stretch handling, dossier hints, and exact Commander query `id=gwub is:commander f:commander`.
- Regenerated `data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`, and `supabase/functions/guild-recruiter/faction-context.ts` through approved scripts.
- Updated focused tests for WITCH live status, technical-only `GWUB`, public alias/route suppression, Home preview stability, Supabase context shape, and Maze handoff behavior.
- Moved VM-269 to Done and added this handoff/index entry.

## Why it changed

VM-268 approved the conservative Witch raw packet for future promotion planning with verdict `review-approved-for-future-promotion-planning`. VM-269 executed the optional live-with-Maze rollout selected by the plan while preserving the approved raw packet and keeping `GWUB`, `WUBG`, `Growth`, and permutations out of public keys, aliases, routes, and separate Supabase contexts.

## Decisions made

- `WITCH` is the only new public/live key.
- Catalog/display framing may say `Witch / Growth`; runtime, Maze, handoff, and public-facing labels use `Witch`.
- `GWUB` remains technical metadata/query identity and exact Commander query identity only.
- `WUBG` remains support-source order only and was not added as a key, alias, route, or context.
- Home preview membership stays unchanged at 20 expressions.
- The existing untracked `assets/img/identity-hero/witch.webp` remains unused and outside the rollout.
- Maze/handoff code was changed only by extending the existing four-color normalization pattern.

## Risks / uncertainties

- The worktree remains broadly dirty with substantial unrelated tracked and untracked changes predating this task.
- `npm.cmd run test:placement` and `npm.cmd test` still fail on an unrelated Temur wording assertion: expected `blue-red-green`, actual `green-blue-red`.
- The builder reported writing `data/placement-model.schema.json`, but scoped diff showed no net schema change.
- Witch support texture remains intentionally bounded; do not infer official MTG naming authority, Atraxa naming authority, Witch-Maw institution status, or Growth as a universal official name.

## Tests run

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check assets\js\commander-dossier.js`
- Pass: `node --check assets\js\archscry-presentation.js`
- Pass: `node --check assets\js\quick-reading-tests.js`
- Pass: `node --check research\archscry-dossier-followup-tests.js`
- Pass: `node --check research\maze-search-tests.js`
- Pass: `node --check research\research-init.js`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: `npm.cmd run build:factions`
- Pass: `node research\build-archscry-flavor-snippets.mjs`
- Pass: focused WITCH live-promotion validator
- Pass: raw Witch SHA-256 recheck
- Pass: route/hero leakage scan for `/witch/`, `/gwub/`, `/wubg/`, `/growth/`, and `assets/img/identity-hero/witch`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Pass: `npm.cmd run audit:factions`
- Pass: `npm.cmd run test:presentation-snapshots`
- Pass: `npm.cmd run test:parser`
- Pass: scoped `git diff --check`
- Fail, unrelated residual: `npm.cmd run test:placement`
- Fail, unrelated residual: `npm.cmd test`

## Raw hash proof

| File | SHA-256 |
|---|---|
| `witch.changelog.json` | `BC2B203865D7F56B1BE860C1EAEC212560DBA5B453AF6920CB7902E2E01D9D85` |
| `witch.claims.json` | `6A6E4AB280DB775862FF00E8E2F4C680F4EAF7E6329423CCB5A144F1E2214D2E` |
| `witch.placement.json` | `BFAD914A9A47B7B9C46A5E75E462D7D54B3D1A8B5D360B7AA76686021B6E5084` |
| `witch.profile.json` | `534719C82ABC79BD3A8B6788D31AE8F5A0174A5B96871C791D5CD9F073DAD1FA` |
| `witch.sources.json` | `C6BF2968B1B8F87C537326D1B9FD963B42596FC4E11D4A8FF741030E8DC22FC7` |

## Not touched

- `data/raw-factions/witch/*.json`
- `docs/research/witch/**`
- `docs/architecture/colors/witch/**`
- Home preview membership
- Public route files and route aliases
- Witch hero asset hookup
- Supabase logic design
- Schema contract design
- VM-270+ work
- Unrelated dirty files

## Follow-up recommendations

- Create a separate focused card for the unrelated Temur quick-reading wording residual if the team wants `npm test` green again.
- Keep `assets/img/identity-hero/witch.webp` ignored until a separate hero rollout card explicitly approves it.
- If Witch copy gets future polish, preserve the display/runtime label split: `Witch / Growth` for catalog framing, `Witch` for runtime/Maze/public labels.

## Next suggested agent

Test Strategist for the unrelated Temur placement wording residual, or Planning Architect for any future Witch hero/background rollout.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-269-witch-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-268-witch-review-gate.md`
- `docs/kanban/done/VM-267-witch-non-live-raw-packet.md`
- `docs/research/witch/`
- `docs/architecture/colors/witch/`
