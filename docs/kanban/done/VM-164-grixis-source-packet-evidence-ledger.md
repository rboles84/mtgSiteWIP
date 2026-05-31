# VM-164 - Grixis Source Packet Evidence Ledger

ID: VM-164
Title: Grixis Source Packet Evidence Ledger
Status: done
Type: Documentation / Research
Area: Grixis, Shard Research, Evidence Ledger
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Normalize the unmanaged Grixis research folder into a gold-standard source packet and evidence ledger before any architecture, raw-faction, or runtime promotion work begins.

## Scope

- Audit existing files under `docs/research/grixis/`.
- Resolve stale VM-161 packet labeling; VM-161 is already a mana-base work item.
- Create or normalize only these approved packet files:
  - `docs/research/grixis/README.md`
  - `docs/research/grixis/grixis-source-ledger.md`
  - `docs/research/grixis/grixis-evidence-ledger.md`
  - `docs/research/grixis/grixis-reliability-audit.md`
  - `docs/research/grixis/grixis-manual-fill.md`
  - `docs/research/grixis/grixis-research-dossier.md`
  - `docs/research/grixis/grixis-lore-source-packet.md`
- Classify unmanaged drafts and leave them in place.
- Bind each major retained claim to source tier, status, confidence, or manual-fill disposition.

## Non-Goals

- Do not create Grixis architecture docs.
- Do not create raw-faction JSON.
- Do not run faction generation.
- Do not change runtime, route, Maze, Home, schema, generated, or Supabase files.
- Do not start VM-165, VM-166, VM-167, or VM-168.

## Acceptance Criteria

- [x] All seven approved packet files exist under `docs/research/grixis/`.
- [x] No stale VM-161 labeling remains in approved packet files.
- [x] Major claims are evidence-bound, support-bound, labeled `Vox Mana synthesis`, or marked `Manual fill required`.
- [x] Draft inputs are explicitly classified.
- [x] Maestros/New Capenna material is comparator/support only and not Grixis evidence.
- [x] Forbidden claim scans pass for the approved packet; forbidden phrases appear only as rejected/manual-fill boundary text.
- [x] `docs/architecture/colors/grixis/` and `data/raw-factions/grixis/` are not created.
- [x] No runtime, data, schema, generated, route, Maze, or Supabase files were changed for VM-164.

## Closeout Notes

Created the approved seven-file Grixis packet and left the three unmanaged draft artifacts in place as discovery/support-only material. The original unmanaged `grixis-lore-source-packet.md` was replaced with an evidence-bound VM-164 packet.

Grixis remains non-live. VM-165 is still gated on human review of this packet.

## Acceptance Evidence

- Seven approved packet files exist.
- Approved packet files have zero `VM-161` string hits.
- Approved packet files have no non-ASCII hits.
- UBR Commander JSONL scan returned exactly 8 rows.
- `docs/architecture/colors/grixis/` is absent.
- `data/raw-factions/grixis/` is absent.
- Source-tier, status, `Manual fill required`, `Vox Mana synthesis`, and Maestros comparator markers are present.
- Forbidden-claim scan found only explicit rejected/manual-fill boundary mentions.
