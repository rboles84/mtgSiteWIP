# Naya Research Packet

Status: VM-181 source packet and evidence ledger. Naya remains non-live, non-runtime, and review-gated.

This folder is the approved Naya research entry point after the VM-181 source-packet pass. It replaces two unmanaged root seed files with source-bound documentation and preserves those seed files under `source-material/` for audit only.

VM-176 and VM-177 were already assigned to Jund in current repo truth, and the latest Jund handoff documents VM-178 and VM-179 as the next Jund sequence. Naya source normalization therefore uses VM-181 to avoid card collision.

## Approved Files

- `naya-source-ledger.md`: approved, support-only, comparator, and quarantined seed source rows.
- `naya-evidence-ledger.md`: claim-level evidence rows and manual-fill boundaries.
- `naya-reliability-audit.md`: source-laundering risks, encoding drift, overclaim warnings, and review gates.
- `naya-manual-fill.md`: claims that require future official evidence before use.
- `naya-research-dossier.md`: concise source-bound dossier for later architecture work.
- `naya-lore-source-packet.md`: normalized lore packet for review.
- `source-material/`: unmanaged seed files preserved for discovery only.

## Hard Boundaries

- Existing seed files cannot cite themselves, VM-161 labels, prior generated text, copied packet wording, dossier paragraphs, or architecture prose as evidence.
- Every major claim must resolve to a VM-181 source row, evidence row, support-only row, Vox Mana synthesis label, or `Manual fill required`.
- `RGW`, `GRW`, and `WRG` are color-direction/query metadata only. They must not become expression keys, aliases, placement keys, public labels, route slugs, routes, or generated labels.
- Jund is not precedent for Naya runtime status. It is only a source-packet and docs-track sibling unless a later pre-flight proves otherwise.
- No `docs/architecture/colors/naya/`, `data/raw-factions/naya/`, generated artifacts, schemas, Maze files, route CSS/JS, Home preview, Supabase, placement model, or runtime code is part of VM-181.

## Review Gate

Human review is required before any identity/metaphysics authoring. Later docs must describe Naya as authored and review-gated until a separate promotion card explicitly changes runtime status.
