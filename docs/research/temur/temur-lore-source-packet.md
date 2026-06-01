# Temur Lore Source Packet

Status: VM-203 source-airlock packet. Temur remains non-live and review-gated.

## VM-203 Binding Rule

Every future Temur claim must resolve to one of these outcomes:

- Evidence-bound to `TEMUR-EVID-###`.
- Support-bound to `TEMUR-CMD-###` or another support-only row.
- Labeled `Vox Mana synthesis` and tied to promoted evidence.
- Marked `Manual fill required` with a `TEMUR-MF-###` row.

## Seed Artifact Handling

VM-203 renamed the unmanaged restored source drop from `docs/research/temur fontier/` to `docs/research/temur frontier/`. The corrected path remains unmanaged restored material.

The three seed artifacts were copied into `docs/research/temur/source-material/` with original filenames and matching SHA-256 hashes. Their contents were not edited. Do not repair links, headings, claims, or source text inside those copies as part of VM-203.

## Approved Source Spine

| Row | Role |
|---|---|
| TEMUR-SRC-001 | Green-centered Temur color philosophy and design attribute. |
| TEMUR-SRC-002 | Khans-era Temur Frontier culture, roles, magic, and locations. |
| TEMUR-SRC-003 | Fate Reforged Temur/Yasova/Atarka pressure context. |
| TEMUR-SRC-004 | Yasova/Atarka survival-bargain story support. |
| TEMUR-SRC-005 | Khanfall and dragonlord timeline transition. |
| TEMUR-SRC-006 | Atarka Clan contrast and hidden-tradition bridge. |
| TEMUR-SRC-007 | Surrak story support. |
| TEMUR-SRC-008 | Modern Dragonstorm-era reformed Temur. |
| TEMUR-SRC-009 to TEMUR-SRC-010 | Source-selection audits only. |
| TEMUR-SRC-011 | Commander/operator support only. |
| TEMUR-SRC-012 to TEMUR-SRC-014 | Discovery-only seed copies. |

## Next-Card Readiness

VM-204 may use this packet to author Temur identity/metaphysics only if it stays inside `docs/research/temur/**` or whatever scope VM-204 explicitly allows. VM-203 does not authorize architecture folders, raw JSON, runtime keys, generated artifacts, routes, Maze behavior, Home previews, schemas, or Supabase changes.

## Authoring Guardrails

- Atarka Clan is not Temur Frontier.
- Modern Dragonstorm Temur is not Khans-era Temur unless timeline-labeled.
- Generic GUR Commander identity is not Tarkir lore.
- Commander goodstuff is support-only operator language.
- Seed artifacts are discovery-only.
- Mechanics and card text need later card-data validation.
- Exact story biographies beyond inspected guide/story captures remain manual-fill.
