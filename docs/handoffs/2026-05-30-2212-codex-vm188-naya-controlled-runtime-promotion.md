# Agent Handoff - VM-188 Naya Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement the Naya controlled runtime promotion from the VM-185-approved raw packet, promoting Naya only into the live Archscry expression key `NAYA` while preserving `RGW`, `GRW`, and `WRG` as metadata/query/validation terms only.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2042-codex-vm185-naya-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-1621-codex-vm168-grixis-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-185-naya-raw-packet-review-gate.md`
- `docs/kanban/done/VM-186-jund-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `data/raw-factions/naya/*.json`
- `data/raw-factions/jund/*.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`
- `research/presentation-snapshot-cases.json`

## Files Changed

- `research/build-faction-artifacts.mjs`
- `data/identity-layers.json`
- `data/raw-factions/naya/naya.profile.json`
- `data/raw-factions/naya/naya.placement.json`
- `data/raw-factions/naya/naya.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`
- `research/presentation-snapshot-cases.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-188-naya-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`

## What Changed

- Promoted Naya into the live generated set as expression key `NAYA`.
- Used VM-188 for Naya because the board already contained VM-187 for Jund live-pilot copy/dossier repair.
- Added `naya: "NAYA"` to `RAW_TO_KEY`.
- Added `NAYA` identity metadata with shard kind, Alara world, colors `["R","G","W"]`, Green core, `preview_eligible: false`, and aliases only `["NAYA","naya"]`.
- Added Naya-owned biological prior, lateral inhibition list, and two Naya Hall questions.
- Added routing/query metadata so Commander and Maze query construction use exact `id=rgw` and support `id<=rgw` without making `RGW` a key, alias, route, or public expression.
- Updated Naya raw profile, placement, and changelog status metadata for a controlled VM-188 live pilot while preserving raw claims and source/evidence bindings.
- Rebuilt generated faction, placement, snippet, schema, and Supabase context artifacts through approved scripts.
- Updated placement, dossier, and presentation regression tests to include Naya and preserve Home preview boundaries.

## Why It Changed

VM-185 approved the Naya raw packet for future promotion planning. Current pre-flight baseline had 24 factions, 24 identity expressions, 24 placement records, 24 generated snippet keys, and 20 Home preview entries, with Jund present and Naya absent. Promotion adds exactly one Naya live expression while keeping Jund as baseline and preserving Home preview membership.

## Decisions Made

- `VM-187` was not reused because it is already the Jund live-pilot copy/dossier repair card in current board truth.
- `NAYA` is the only new live expression key.
- `RGW`, `GRW`, and `WRG` remain metadata/query/validation terms only.
- `rgw` is allowed in Commander/Maze query construction, not as an alias, route, key, fixture key, or generated label.
- Naya raw claims remain the evidence floor and were not edited.
- Existing Jund runtime state was treated as baseline; Jund raw files were not changed.

## Risks / Uncertainties

- The worktree was already dirty with many tracked and untracked shard/runtime changes before this task. This task preserved that state and did not revert unrelated files.
- `data/placement-model.schema.json` was refreshed by the approved faction builder, matching VM-186 promotion precedent; no Naya-specific schema shape was introduced.
- `git diff --check` passed but continued to report existing LF-to-CRLF working-copy warnings.
- Some generated context includes `RGW` in Naya guardrail prose and query metadata; this is expected metadata, not an alias/key/route/public label.

## Tests Run

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/build-faction-artifacts.mjs`
- `node research/build-archscry-flavor-snippets.mjs`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/presentation-snapshot-tests.js`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not Touched

- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/jund/*.json`
- Jund docs, Jund cards, and Jund handoffs
- Home preview membership
- Static `/naya/` or `/rgw/` routes
- Maze route files or route CSS
- Supabase deployment/config/function source edits beyond approved generated context output
- New lore sources, raw claims, Commander facts, card facts, or evidence rows

## Follow-Up Recommendations

- Manually smoke an Archscry Naya result in browser to confirm the reveal, Start Here, Commander paths, and Maze handoff feel right in the live layout.
- If Naya needs authored presentation copy or starter UX beyond source-bound generated fallback, open a separate Naya post-promotion copy/dossier repair card.
- Keep future shard IDs checked against the board before assigning card numbers; VM-187 became occupied between planning and this implementation pass.

## Next Suggested Agent

Manual QA / Product Reviewer for live Naya promotion acceptance.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-188-naya-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-185-naya-raw-packet-review-gate.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `docs/handoffs/2026-05-30-2042-codex-vm185-naya-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`

