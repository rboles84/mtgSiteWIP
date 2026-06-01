# Codex Handoff - VM-214 Sultai Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Promote the VM-213-approved Sultai Brood packet to exactly one live Archscry placement expression key, `SULTAI`, while preserving `BGU` and color-order permutations as metadata/query-only and leaving Home preview membership unchanged.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1832-codex-vm213-sultai-raw-packet-review-gate.md`
- Sultai VM-209 through VM-213 handoffs
- Abzan/Temur controlled promotion handoffs and implementation precedent
- `docs/kanban/board.md`
- `docs/kanban/done/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/kanban/in-progress/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `data/raw-factions/sultai/*.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`

## Files Changed

- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/raw-factions/sultai/sultai.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`

## What Changed

- Verified VM-213 approval in both the VM-213 card and handoff before editing.
- Promoted exactly one live expression key: `SULTAI`.
- Added `sultai: "SULTAI"` to the raw-to-live mapping.
- Added the `SULTAI` identity-layer expression with colors `["B", "G", "U"]`, kind `wedge`, core color `B`, placement eligible true, and preview eligible false.
- Updated Sultai raw metadata to live-pilot / placement-eligible status while keeping `sultai.claims.json` and `sultai.sources.json` unchanged.
- Added Sultai biological prior, lateral-inhibition relationships, gate/Hall answers, Commander dossier guidance, presentation copy, Maze handoff support, and regression tests following the Abzan/Temur promotion pattern.
- Rebuilt generated faction, placement, flavor-snippet, and Supabase context artifacts through approved commands. The placement schema builder ran as part of `build:factions`, but no schema diff remained.
- Moved VM-214 to Done and recorded closeout evidence on the card.

## Why It Changed

VM-213 approved the Sultai raw packet for future promotion planning. VM-214 was the controlled promotion gate that makes `SULTAI` live while preserving color-code and route boundaries.

## Decisions Made

- `SULTAI` is the only public/live expression key added.
- `BGU`, `BUG`, `UBG`, `GUB`, `GBU`, `UGB`, lowercase `sultai`, and lowercase color-code forms remain metadata/query-only, not expression keys, aliases, routes, fixture keys, Home preview keys, or raw-to-live targets.
- Home preview membership stays at 20 entries.
- Sultai public Commander/presentation copy avoids internal review language such as support-only/canon-proof while preserving the underlying source-bound guardrails through tests and raw guidance.
- Sultai Maze support uses query metadata only; no route, static page, route map entry, Maze route key, or Home card was added.

## Risks / Uncertainties

- The worktree was already broadly dirty from Abzan, Temur, Sultai, Mardu, and Jeskai lane work. Verification used scoped diffs, status comparison, hashes, and generated-count checks rather than cleanup.
- VM-227 and VM-232 appeared as completed Kanban work during the broader dirty baseline; this pass did not intentionally move Mardu or Jeskai cards.
- Generated placement/context guidance still contains `BGU` as metadata/query and guardrail language, which is expected. Scans verified it is not a key, alias, Home preview entry, or raw-to-live target.

## Tests Run

- `Get-FileHash -Algorithm SHA256 data/raw-factions/sultai/sultai.claims.json,data/raw-factions/sultai/sultai.sources.json`
- Count check: identity/faction/placement/flavor records moved from 27 to 28; Home preview stayed 20.
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/build-faction-artifacts.mjs`
- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- PowerShell key/alias/Home preview/RAW_TO_KEY boundary scan
- `rg` scans for route/Home/Maze/raw-to-live leakage
- `git diff --check` on touched source, data, Kanban, and handoff files

## Not Touched

- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.sources.json`
- Sultai research packet files
- Sultai architecture docs
- Route/static page files
- Home preview membership
- Public color-code aliases
- Abzan, Temur, Mardu, or Jeskai source packets
- Parser behavior

## Follow-Up Recommendations

- Next Sultai work should be post-promotion QA only if manual review finds visible copy issues.
- Mardu VM-228 should remain blocked until VM-227's repair-needed result is handled.
- Jeskai VM-233 is the next Jeskai review gate before any Jeskai promotion planning.

## Next Suggested Agent

Kanban Steward or JSON Cartographer for whichever lane the user chooses next: Mardu repair planning, Jeskai VM-233 review gate, or Sultai post-promotion QA.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1832-codex-vm213-sultai-raw-packet-review-gate.md`
