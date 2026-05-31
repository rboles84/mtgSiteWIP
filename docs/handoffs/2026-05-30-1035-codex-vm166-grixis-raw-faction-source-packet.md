# VM-166 Grixis Raw-Faction Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement VM-166 by creating Grixis's authored-but-not-live raw-faction source packet under `data/raw-factions/grixis/`, using VM-164 and VM-165 as inputs while avoiding runtime, generated, placement, schema, route, Home, Maze, Supabase, and test changes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
- `docs/handoffs/2026-05-30-0932-codex-vm165-grixis-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-29-1249-codex-vm159-bant-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-165-grixis-identity-metaphysics.md`
- `docs/research/grixis/grixis-source-ledger.md`
- `docs/research/grixis/grixis-evidence-ledger.md`
- `docs/research/grixis/grixis-reliability-audit.md`
- `docs/research/grixis/grixis-manual-fill.md`
- `docs/research/grixis/grixis-research-dossier.md`
- `docs/research/grixis/grixis-lore-source-packet.md`
- `docs/architecture/colors/grixis/identity.md`
- `docs/architecture/colors/grixis/metaphysics.md`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.claims.json`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.changelog.json`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `data/raw-factions/grixis/grixis.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Grixis raw-faction JSON files in the same authored source-packet family as Bant and Esper.
- Created exactly 8 Grixis raw claims with raw IDs `grixis_claim_0001` through `grixis_claim_0008`.
- Bound those claims only to VM-164 evidence rows `GRIXIS-001` through `GRIXIS-008`.
- Preserved VM-164 row IDs as evidence references, not raw claim IDs.
- Added Grixis source metadata that distinguishes VM-164 packet files, official/design sources, and VM-165 architecture docs.
- Added profile and placement prose using VM-165 only as profile/placement shaping input, not claim evidence.
- Kept placement status non-live with `placement_axes: []` and no generated/live eligibility fields.
- Created and completed the VM-166 Kanban card, then updated the board and handoff index.

## Why It Changed

VM-166 is the review airlock between Grixis architecture docs and any future raw/runtime promotion. The new packet gives VM-167 a structured source JSON input without making `GRIXIS` live, adding `grixis` to `RAW_TO_KEY`, or changing generated placement behavior.

## Decisions Made

- Used `grixis_claim_0001`-style raw claim IDs to match Bant/Esper packet shape.
- Used `GRIXIS-001` through `GRIXIS-008` only as VM-164 evidence row references.
- Kept support/review/manual-fill/comparator material out of raw claims.
- Included VM-165 architecture docs as source entries only for profile and placement wording support.
- Left `UBR` as color identity metadata only.
- Left `GRIXIS` as authored expression/source-packet language only, not a live placement key.
- Did not create placement axes, faction coordinates, or app-ready language.

## Risks / Uncertainties

- The repository was already dirty before VM-166, including runtime/data/generated-adjacent files such as `data/factions.json`, `data/placement-model.json`, `assets/js/quick-reading-tests.js`, `research/build-faction-artifacts.mjs`, and Supabase context. These were not touched for VM-166, but global `git diff --name-only` still reports them.
- Current Esper raw files have been through later promotion/reconciliation work. VM-166 Grixis followed the original authored-but-not-live Esper/Bant packet pattern, not Esper's current live status.
- Future VM-167 must re-check source IDs and non-live status before deciding whether to proceed.

## Tests Run

- `Get-ChildItem data\raw-factions\grixis -File | Select-Object Name,Length`
- Node JSON validation for all five Grixis raw JSON files, source ID resolution, exact 8 claim count, raw claim ID shape, VM-164 row scope, profile/placement claim subset, `placement_axes: []`, and blocked live-readiness fields/language.
- `rg` scan for blocked live placement language: `placement_eligible: true`, `live_pilot`, `faction_position`, runtime-ready, scoring, routing, recommendation, and rendering terms.
- `rg` scan confirming `grixis.claims.json` does not reference VM-164 rows outside `GRIXIS-001` through `GRIXIS-008` and does not include support/review/manual-fill/comparator terms as raw-claim content.
- `rg` scan confirming VM-165 architecture source IDs do not appear in `grixis.claims.json`.
- `git diff -- research/build-faction-artifacts.mjs | rg -n "grixis|GRIXIS"`; no Grixis/RAW_TO_KEY diff found, with existing line-ending warning.
- `rg -n "[^[:ascii:]]" data/raw-factions/grixis docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `rg -n "[ \t]+$" data/raw-factions/grixis docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `git diff --check -- docs/kanban/board.md docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md data/raw-factions/grixis`; passed with existing Windows LF-to-CRLF warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- `git diff --name-only`; confirmed global unrelated dirty files remain present from earlier work.

Skipped:

- `npm test`, because VM-166 did not touch runtime or generated contracts.
- `npm run build:factions`, because Grixis remains non-live and not wired into generation.

## Not Touched

- `docs/research/grixis/`
- `docs/architecture/colors/grixis/identity.md`
- `docs/architecture/colors/grixis/metaphysics.md`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/generated/`
- Supabase files
- Home files
- Maze files
- route CSS/JS
- runtime JS
- tests

## Follow-Up Recommendations

- VM-167 should review the raw packet before any further data work.
- Do not promote `GRIXIS`, add `grixis` to `RAW_TO_KEY`, run generation, or create placement axes until a human review gate approves the VM-166 packet.
- If later Grixis work needs unearth, vis, geography, figures, Commander/operator, or Maestros language, keep those in support/manual-fill/comparator lanes unless VM-164 or a later approved source packet upgrades the evidence.

## Next Suggested Agent

JSON Cartographer for VM-167 review-gated raw JSON validation, if the next slice is approved. Otherwise Documentation Steward for packet review notes.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
- `docs/handoffs/2026-05-30-0932-codex-vm165-grixis-identity-metaphysics.md`
- `docs/research/grixis/grixis-evidence-ledger.md`
- `docs/architecture/colors/grixis/identity.md`
- `docs/architecture/colors/grixis/metaphysics.md`
