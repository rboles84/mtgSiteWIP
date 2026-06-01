# Mardu Horde Research Packet

Status: VM-223 source packet. Mardu remains docs-only, non-live, and review-gated.

This folder is the normalized Mardu source-airlock for the Tarkir clan onboarding lane. It preserves the unmanaged seed material from `docs/research/mardu horde/` under `source-material/`, but the seed files are discovery-only. Every future Mardu claim must resolve to an evidence row, a support-only row, a `Manual fill required` row, or explicitly labeled Vox Mana synthesis.

## Packet Files

| File | Role |
|---|---|
| `mardu-source-ledger.md` | Source classification, approved uses, limits, and exact RWB/WBR Commander support extraction. |
| `mardu-evidence-ledger.md` | Claim-bearing rows, support-only rows, guardrails, Vox Mana synthesis boundary, and manual-fill IDs. |
| `mardu-reliability-audit.md` | Source reliability classes, timeline boundaries, and anti-bleed rules. |
| `mardu-manual-fill.md` | Open claims that need later official capture, card-data validation, or VM-224 authoring. |
| `mardu-seed-source-crosscheck.md` | Seed copy hashes, path guards, and discovery-only handling record. |
| `mardu-research-dossier.md` | Conservative evidence summary for later VM-224 use. |
| `mardu-lore-source-packet.md` | Quick source spine and binding rules for downstream cards. |
| `source-material/README.md` | Index of preserved seed copies. |

## Source-Material Boundary

The unmanaged source-drop folder remains `docs/research/mardu horde/`. VM-223 did not edit that folder. Its three files were copied into `docs/research/mardu/source-material/` with original filenames and matching SHA-256 hashes:

- `Mardu Horde Deep Research Report.md`
- `mardu-horde-lore-source-packet.md`
- `mardu_horde_tactical_archive.html`

Those copied files are not approved evidence. Do not cite them as proof. Use them only to discover candidate claims that must be independently rebound to approved local evidence or marked `Manual fill required`.

## Hard Stops

- Do not create or edit `docs/architecture/colors/mardu/**` in VM-223.
- Do not create or edit `data/raw-factions/mardu/**` in VM-223.
- Do not edit `docs/research/mardu horde/**`.
- Do not touch runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, or Jeskai files.
- Do not promote `MARDU`, `RWB`, `WBR`, or lowercase forms into public keys, aliases, routes, fixtures, Home preview entries, or generated expression keys.

## Next-Card Readiness

VM-224 may use this packet to author Mardu identity and metaphysics. VM-224 must keep final doctrine explicitly source-bound and should treat color philosophy as interpretation support, not Tarkir-specific lore proof.
