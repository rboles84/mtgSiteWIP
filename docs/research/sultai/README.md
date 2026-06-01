# Sultai Brood Research Packet

Status: VM-209 source packet. Sultai remains docs-only, non-live, and review-gated.

This folder is the normalized Sultai source-airlock for the Tarkir clan onboarding lane. It preserves the unmanaged seed material from `docs/research/sultai brood/` under `source-material/`, but the seed files are discovery-only. Every future Sultai claim must resolve to an evidence row, a support-only row, a `Manual fill required` row, or explicitly labeled Vox Mana synthesis.

## Packet Files

| File | Role |
|---|---|
| `sultai-source-ledger.md` | Source classification, approved uses, limits, and exact BGU Commander support extraction. |
| `sultai-evidence-ledger.md` | Claim-bearing rows, support-only rows, guardrails, Vox Mana synthesis boundary, and manual-fill IDs. |
| `sultai-reliability-audit.md` | Source reliability classes, timeline boundaries, and anti-bleed rules. |
| `sultai-manual-fill.md` | Open claims that need later official capture, card-data validation, or VM-210 authoring. |
| `sultai-seed-source-crosscheck.md` | Seed copy hashes, path guards, and discovery-only handling record. |
| `sultai-research-dossier.md` | Conservative evidence summary for later VM-210 use. |
| `sultai-lore-source-packet.md` | Quick source spine and binding rules for downstream cards. |
| `source-material/README.md` | Index of preserved seed copies. |

## Source-Material Boundary

The unmanaged source-drop folder remains `docs/research/sultai brood/`. VM-209 did not edit that folder. Its two files were copied into `docs/research/sultai/source-material/` with original filenames and matching SHA-256 hashes:

- `sultai-brood-deep-research-report.md`
- `sultai-brood-lore-source-packet.md`

Those copied files are not approved evidence. Do not cite them as proof. Use them only to discover candidate claims that must be independently rebound to approved local evidence or marked `Manual fill required`.

## Hard Stops

- Do not create or edit `docs/architecture/colors/sultai/**` in VM-209.
- Do not create or edit `data/raw-factions/sultai/**` in VM-209.
- Do not edit `docs/research/sultai brood/**`.
- Do not touch runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, or Temur files.
- Do not promote `SULTAI`, `BGU`, `BUG`, `UBG`, `GUB`, or lowercase forms into public keys, aliases, routes, fixtures, Home preview entries, or generated expression keys.

## Next-Card Readiness

VM-210 may use this packet to author Sultai identity and metaphysics. VM-210 must keep final doctrine explicitly source-bound and should treat color philosophy as interpretation support, not Tarkir-specific lore proof.
