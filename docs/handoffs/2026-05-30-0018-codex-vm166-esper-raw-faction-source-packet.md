# 2026-05-30 00:18 - Codex - VM-166 Esper Raw-Faction Source Packet

## Agent Name

Codex

## Task Requested

Implement VM-166 by creating Esper's authored-but-not-live raw-faction source packet under `data/raw-factions/esper/`, using Bant's five-file packet family as structure while preserving Esper's non-live, review-gated status.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2124-codex-vm163-esper-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-29-2318-codex-vm163a-vm164-esper-packet-repair-base-docs.md`
- `docs/handoffs/2026-05-29-2349-codex-vm165-esper-docs-parity-fill.md`
- `docs/handoffs/2026-05-29-1249-codex-vm159-bant-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-29-1720-codex-vm159a-bant-raw-packet-reconciliation.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-165-esper-docs-parity-fill.md`
- `docs/research/esper/esper-source-ledger.md`
- `docs/research/esper/esper-evidence-ledger.md`
- `docs/research/esper/esper-research-dossier.md`
- `docs/research/esper/esper-manual-fill.md`
- `docs/research/esper/esper-reliability-audit.md`
- `docs/research/esper/esper-lore-source-packet.md`
- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.changelog.json`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.claims.json`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-166-esper-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

Pre-existing dirty/untracked files were present at pre-flight, including VM-163A/VM-164/VM-165 Esper docs and handoffs plus unrelated shard research folders. They were left intact.

## What Changed

- Added the five-file Esper raw packet as reviewable source JSON only.
- Added 13 source records, including VM-163 packet files, the local official Esper Rosewater capture, VM-165 architecture docs as interpretation support, cross-color dynamics support, and the WUB Commander JSONL support source.
- Added 9 raw claims, each grounded in VM-163 promoted rows `ESPER-001` through `ESPER-009`.
- Added a conservative profile with fixed metadata: `faction_id: "esper"`, `faction_name: "Esper"`, `faction_type: "shard"`, `plane_or_setting: "Alara"`, White/Blue/Black identity, `WUB` metadata only, and not-live/not-placement-eligible status.
- Added a review-gated placement planning packet with `placement_axes: []` and no numeric placement positions.
- Added a changelog documenting VM-166 as source-only, review-gated, and not a promotion card.
- Created and closed the VM-166 Kanban card.

## Why It Changed

VM-165 completed Esper's evidence-bound architecture docs. VM-166 needed the next airlock step: a raw packet that can be reviewed later without becoming live data or being consumed by generation/runtime code.

## Decisions Made

- Kept direct raw claims limited to `ESPER-001` through `ESPER-009`.
- Used VM-165 architecture language only to shape profile/placement prose, not as a replacement for VM-163 evidence rows.
- Kept `ESP-SRC-006` / `ESPER-013` / `ESPER-014` / `ESPER-015` only in Commander/operator support fields.
- Left `placement_axes` empty to avoid accidental interpretation as calibrated placement data.
- Avoided implicit scoring/ranking prose in `esper.profile.json`.
- Did not add `esper: "ESPER"` to `RAW_TO_KEY`.
- Did not add `ESPER` as a live expression key, placement key, registry key, generated key, alias, or fixture key.
- Kept `WUB` as metadata only.

## Risks / Uncertainties

- Esper still has thin promoted lore evidence beyond identity and design-philosophy claims.
- Geography, society, figures, metallurgy/material lore, chronology, and card-text-derived claims remain manual-fill/deferred topics.
- WUB Commander rows are useful for operator language only and need a later review before any runtime use.
- Placement collision guidance is prose-only and review-gated; VM-167 would need separate owner authorization and calibration checks.
- `git diff --name-only` still reports the pre-existing tracked `docs/research/esper/esper-lore-source-packet.md` change from earlier work.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` at start and during closeout.
- JSON parse and packet consistency validation across all five Esper JSON files.
- Evidence-tier validation: raw claims cite only `ESPER-001` through `ESPER-009`; support rows do not appear in `esper.claims.json`.
- Placement/profile guard validation: `placement_axes` is empty, no `faction_position`, and no implicit scoring/ranking phrases in `esper.profile.json`.
- Manual-fill term scan across `data/raw-factions/esper/`.
- `verified|confirmed|absolute` scan across `data/raw-factions/esper/`.
- Live-readiness term scan across `data/raw-factions/esper/`.
- Promotion guard scans for `RAW_TO_KEY`, `ESPER`, `WUB`, and `esper` in builder/runtime/generated-adjacent paths.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- research/build-faction-artifacts.mjs`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- data assets supabase research/build-faction-artifacts.mjs maze docs/architecture/colors/esper`
- `rg -n "[^\\x00-\\x7F]" data/raw-factions/esper docs/kanban/done/VM-166-esper-raw-faction-source-packet.md docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

### Final `git diff --name-only`

Tracked diff output:

```text
docs/handoffs/HANDOFF_INDEX.md
docs/kanban/board.md
docs/research/esper/esper-lore-source-packet.md
```

Intentional new VM-166 paths from `git status --short`:

```text
?? data/raw-factions/esper/
?? docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md
?? docs/kanban/done/VM-166-esper-raw-faction-source-packet.md
```

`docs/research/esper/esper-lore-source-packet.md` was already dirty at VM-166 pre-flight and was not edited in this pass.

### JSON Parse / Claim / Source Validation Summary

```json
{
  "parsed": 5,
  "source_count": 13,
  "claim_count": 9,
  "profile_claim_refs": 58,
  "placement_claim_refs": 39,
  "placement_axes_count": 0,
  "errors": []
}
```

### Placement / Profile Guard Summary

```text
placement_axes: []
No faction_position fields.
No implicit scoring/ranking phrases in esper.profile.json.
No placement_eligible: true.
No live_pilot.
No runtime-ready wording.
No support evidence rows in esper.claims.json.
Manual-fill terms appear only in manual-review, deferred, limitation, or review-gated language.
```

## Not Touched

- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- `research/build-faction-artifacts.mjs`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Home preview files
- Maze files
- route CSS/JS
- generated artifacts
- schemas
- Supabase code

No `npm run build:factions` was run. No `npm test` was run because runtime/generated code did not change.

## Follow-Up Recommendations

- Review the five Esper raw JSON files before any promotion work.
- Keep VM-166A reserved for citation/source reconciliation if review finds drift.
- Do not open VM-167 until the project owner explicitly authorizes controlled runtime promotion.
- If VM-167 opens, first verify that `ESPER` becomes the live key and `WUB` remains metadata only.

## Next Suggested Agent

Documentation Steward for VM-166 review notes, then JSON Cartographer only if a VM-166A reconciliation is needed. VM-167 requires explicit owner authorization.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-166-esper-raw-faction-source-packet.md`
- `docs/research/esper/esper-evidence-ledger.md`
- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- `docs/handoffs/2026-05-29-2124-codex-vm163-esper-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-29-2318-codex-vm163a-vm164-esper-packet-repair-base-docs.md`
- `docs/handoffs/2026-05-29-2349-codex-vm165-esper-docs-parity-fill.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
