# VM-176 - Jund Source Packet Evidence Ledger

ID: VM-176
Title: Jund Source Packet Evidence Ledger
Status: done
Type: Documentation / Research
Area: Jund, Shard Research, Evidence Ledger
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Normalize the unmanaged Jund research folder into a gold-standard source packet and evidence ledger before any architecture, raw-faction, or runtime promotion work begins.

VM-174 and VM-175 were already taken in current repo truth, so the requested Jund source-packet slice was assigned to the next available card, VM-176.

## Scope

- Perform the AGENTS.md pre-flight review.
- Move existing unmanaged seed files under `docs/research/jund/source-material/`.
- Create only these approved packet files:
  - `docs/research/jund/README.md`
  - `docs/research/jund/jund-source-ledger.md`
  - `docs/research/jund/jund-evidence-ledger.md`
  - `docs/research/jund/jund-reliability-audit.md`
  - `docs/research/jund/jund-manual-fill.md`
  - `docs/research/jund/jund-research-dossier.md`
  - `docs/research/jund/jund-lore-source-packet.md`
- Assign stable `JUND-EVID-###` evidence row IDs.
- Classify seed files as seed/reference material only.
- Record seed defects, including stale VM-161 labels, mojibake risk, external/community citation risk, the "absence of White and Green" typo, generated HTML circularity, and over-promoted claims.
- Keep Jund non-live.

## Non-Goals

- Do not create Jund architecture docs.
- Do not create raw-faction JSON.
- Do not run builders or generated artifact updates.
- Do not change runtime, route, Maze, Home preview, schema, generated, fixture, browser bundle, or Supabase files.
- Do not start Jund identity/metaphysics, docs parity, raw-faction, or promotion work.

## Acceptance Criteria

- [x] All seven approved packet files exist under `docs/research/jund/`.
- [x] Seed files are no longer root peers of the approved packet.
- [x] Seed files are classified as seed/reference or structure-only material.
- [x] Major claims are evidence-bound, support-bound, labeled `Vox Mana synthesis`, or marked `Manual fill required`.
- [x] Stable `JUND-EVID-###` row IDs are present.
- [x] Commander/operator extraction uses exact normalized BRG rows only.
- [x] Generated HTML is structure-only and not canon evidence.
- [x] Jund is distinguished from Naya, Grixis, Gruul, Rakdos, Golgari, Witherbloom, Riveteers, and Modern Jund midrange.
- [x] `docs/architecture/colors/jund/` and `data/raw-factions/jund/` are not created.
- [x] No runtime, data, schema, generated, route, Maze, Supabase, fixture, Home preview, route map, browser bundle, or test fixture files were changed for VM-176.

## Closeout Notes

The unmanaged Jund seed artifacts were preserved under `docs/research/jund/source-material/` and demoted to seed/reference material. The approved VM-176 packet is source-bound and review-ready for a future identity/metaphysics phase.

## Acceptance Evidence

- Approved packet files exist.
- Root Jund folder contains only approved docs plus `source-material/`.
- Exact BRG Commander scan returned 6 rows.
- `JUND-EVID-###`, `Manual fill required`, `Vox Mana synthesis`, and source-tier markers are present.
- Generated HTML is classified as structure-only.
- `docs/architecture/colors/jund/` is absent.
- `data/raw-factions/jund/` is absent.
