# 2026-05-29 17:57 - Codex - VM-160 Bant Controlled Placement Promotion

## Agent Name

Codex

## Task Requested

Promote Bant from an authored raw packet into the live Archscry placement expression key `BANT`, keep `WUG` as color-direction metadata only, move adaptive placement from 20 to 21 live expressions, preserve the Home preview carousel at 20 preview entries, avoid broad shard framework work, and complete the AGENTS workflow.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1922-codex-vm013-placement-domains-prerequisite.md`
- `docs/handoffs/2026-05-28-2346-codex-vm157-bant-identity-metaphysics-authoring.md`
- `docs/handoffs/2026-05-29-0738-codex-vm158-bant-docs-parity-fill-pass.md`
- `docs/handoffs/2026-05-29-1249-codex-vm159-bant-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-29-1720-codex-vm159a-bant-raw-packet-reconciliation.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-159-bant-raw-faction-source-packet.md`
- `docs/kanban/done/VM-159A-bant-raw-packet-reconciliation.md`
- `docs/architecture/placement-domains.md`
- `data/identity-layers.json`
- `data/raw-factions/bant/`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `assets/js/quick-reading-tests.js`
- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.profile.json`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/placement-domains.md`
- `docs/architecture/project-atlas.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-160-bant-controlled-placement-promotion.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `research/archscry-dossier-followup-tests.js`
- `research/build-faction-artifacts.mjs`
- `research/presentation-snapshot-tests.js`
- `supabase/functions/guild-recruiter/faction-context.ts`

## What Changed

- Promoted Bant raw status language from airlock/draft to live pilot while preserving source-bound lore limits.
- Added `BANT` to `data/identity-layers.json` as an active, placement-eligible, non-preview-eligible shard with Bant routing labels and no `WUG` alias.
- Added `bant: "BANT"` raw mapping, Bant biological priors, and `BANT: ["WU", "WG", "UG"]` lateral inhibition.
- Moved Commander Compass attachment after display records are created so new raw-mapped display records receive sanitized `commander_compass` data.
- Added targeted Bant question support after the no-question-change diagnostic failed, limited to existing Gate answers plus two Bant Hall questions.
- Rebuilt generated faction artifacts and Supabase context.
- Refreshed generated Archscry card-voice snippets for 21 live faction keys because the VM-135 dossier fixture requires snippets for every current faction.
- Expanded placement, dossier, and presentation snapshot tests for the 21-expression baseline and Bant-specific acceptance.
- Updated architecture and reference docs from a fixed 20-expression live placement model to the 20-expression baseline plus the Bant shard pilot.
- Closed the VM-160 Kanban card.

## Why It Changed

Bant was already authored and reconciled as a raw source packet in VM-159/VM-159A. VM-160 intentionally promotes only Bant as a controlled live shard pilot so Archscry can place users into `BANT` without introducing a broad three-color framework, route changes, Home carousel exposure, or a live domain selector.

## Decisions Made

- `BANT` is the only live expression key.
- `WUG` remains color-direction/color-family metadata only.
- Bant preview exposure remains disabled through `preview_eligible: false`.
- No live `domain` field was added, preserving VM-013.
- No Naya, Esper, Abzan, shard framework, route behavior, Maze controller, or Home UI work was added.
- Bant live collision targets are limited to active `WU`, `WG`, and `UG`.
- Question-bank work was deferred until the diagnostic proved Bant could not pass its golden path without targeted support.

## Risks / Uncertainties

- Bant now appears as a possible raw adjacent label in presentation snapshot boundary cases; `WUG` appears there only as debug color-family metadata.
- Bant Commander Compass content is generated project curation, not official lore or fully link-verified deck output.
- The shard pilot is intentionally narrow; broader shard/wedge placement still needs separate modeling if pursued.
- Historical handoff and Kanban files still mention the old 20-expression state as historical evidence and were not rewritten.

## Tests Run

- `npm.cmd run build:factions` - passed, built 21 faction placement records.
- `npm.cmd run test:placement` - passed, `21 factions, 21 golden paths`.
- `npm.cmd test` - passed.
- `node research/build-archscry-flavor-snippets.mjs` - passed, wrote snippets for 21 factions.
- `rg -n "not_promoted|draft_not_runtime_promoted|not-runtime-promoted|VM-159 does not make Bant placement-eligible|raw source packet only" data/raw-factions/bant data/factions.json data/placement-model.json supabase/functions/guild-recruiter/faction-context.ts -S` - no matches.
- `rg -n "\bWUG\b" data/factions.json data/placement-model.json supabase/functions/guild-recruiter/faction-context.ts data/identity-layers.json research/build-faction-artifacts.mjs assets/js/quick-reading-tests.js research/presentation-snapshot-tests.js docs/reference/manual-test-cases.md -S` - only explicit negative assertions and documented color-family metadata matches.

## Not Touched

- Route CSS/JS.
- Maze controller behavior.
- Home carousel/UI exposure.
- Supabase source or deployment configuration beyond generated faction context.
- Broad shard/wedge framework.
- Live domain selector or `domain` field.
- Historical handoff evidence for prior 20-expression milestones.

## Follow-Up Recommendations

- Create a later UI/content card if Bant should appear in Home preview surfaces.
- Create a separate shard/wedge modeling card before adding Naya, Esper, Abzan, or any broader three-color placement framework.
- Run a future Commander Compass link verification pass for Bant if its curation becomes user-facing beyond generated dossier support.

## Next Suggested Agent

Test Strategist for a future Bant browser walkthrough and Commander Compass link-verification pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-160-bant-controlled-placement-promotion.md`
- `docs/kanban/done/VM-159-bant-raw-faction-source-packet.md`
- `docs/kanban/done/VM-159A-bant-raw-packet-reconciliation.md`
- `docs/architecture/placement-domains.md`
- `docs/reference/data-contracts.md`
