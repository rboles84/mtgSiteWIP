# VM-181 - Naya Source Packet Evidence Ledger

ID: VM-181
Title: Naya Source Packet Evidence Ledger
Status: done
Type: Documentation / Research
Area: Naya, Alara Shards, Source Evidence
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Normalize the unmanaged Naya research folder into a gold-standard source packet and evidence ledger before any architecture, raw-faction, generated, runtime, Maze, route, Home preview, or Supabase work.

VM-176 and VM-177 are occupied by current Jund work, and the latest Jund handoff documents VM-178/VM-179 as its next review-gated sequence. This Naya source-packet pass is assigned to VM-181 to avoid card collision.

## Scope

- Perform the AGENTS.md pre-flight review.
- Treat existing Naya seed files as discovery/reference material only.
- Move unmanaged seed material under `docs/research/naya/source-material/`.
- Create the approved Naya packet files: `README.md`, `naya-source-ledger.md`, `naya-evidence-ledger.md`, `naya-reliability-audit.md`, `naya-manual-fill.md`, `naya-research-dossier.md`, and `naya-lore-source-packet.md`.
- Bind promoted claims to approved source/evidence rows.
- Extract exact RGW Commander/operator support rows without treating them as canon.

## Non-Goals

- Do not create `docs/architecture/colors/naya/`.
- Do not create `data/raw-factions/naya/`.
- Do not edit `RAW_TO_KEY`, identity layers, placement models, schemas, generated artifacts, route maps, runtime JS, Maze, Home preview, or Supabase.
- Do not promote seed-file wording, VM-161 labels, generated text, dossier paragraphs, or architecture prose as evidence.

## Acceptance Criteria

- Naya root research folder contains the approved packet files plus `source-material/`.
- Existing seed files are preserved under `source-material/` and clearly classified as discovery/reference only.
- Every major claim resolves to a VM-181 evidence/source row, support-only row, Vox Mana synthesis label, or `Manual fill required`.
- `RGW`, `GRW`, and `WRG` remain metadata/query terms only, never placement keys, aliases, routes, or generated labels.
- Jund is not described as completed/live/gold-standard; it is only a non-live source-packet sibling/comparator unless a future review changes that.

## Completion Notes

Completed VM-181 as a source-packet-only Naya normalization pass.

- Preserved unmanaged seed material under `docs/research/naya/source-material/`.
- Created the approved Naya root packet: README, source ledger, evidence ledger, reliability audit, manual-fill ledger, research dossier, and normalized lore source packet.
- Bound the safe Naya floor to approved source/evidence rows and marked Commander/operator rows support-only.
- Added hard source-laundering, RGW alias, Jund-precedent, and manual-fill guardrails.
- Confirmed Naya remains non-live: no architecture docs, raw-faction JSON, runtime keys, generated artifacts, schemas, Maze changes, route changes, Home preview changes, placement model changes, or Supabase changes.
