# Temur Reliability Audit

Status: VM-203 source reliability audit. Temur remains non-live and review-gated.

## Reliability Classes

| Class | Files | VM-203 Treatment |
|---|---|---|
| Claim-bearing official captures | TEMUR-SRC-001 through TEMUR-SRC-008 | May support evidence rows when the claim is timeline-scoped and source-bound. |
| Repo source-selection audits | TEMUR-SRC-009 and TEMUR-SRC-010 | May support why a source is in the packet. They do not prove lore claims by themselves. |
| Commander/operator data | TEMUR-SRC-011 and TEMUR-CMD-001 through TEMUR-CMD-007 | Support-only for search, player-facing operator language, and play-pattern vocabulary. |
| Restored seed artifacts | TEMUR-SRC-012 through TEMUR-SRC-014 | Discovery-only. They are preserved and useful for claim queues, but every claim needs independent promotion. |

## Timeline Guardrails

| Boundary | Rule |
|---|---|
| Khans-era Temur Frontier | Use TEMUR-SRC-002 for Surrak-era culture, frozen ancestors, whispering, family groups, Qal Sisma, and Khans-era locations. |
| Fate Reforged era | Use TEMUR-SRC-003 and TEMUR-SRC-004 for ancient/Yasova bridge context. Keep Yasova's full story arc in manual fill unless directly captured. |
| Dragons-era Atarka Clan | Use TEMUR-SRC-005 and TEMUR-SRC-006 as transition and contrast. Atarka Clan is not the same as Temur Frontier. |
| Modern Dragonstorm Temur | Use TEMUR-SRC-008 for the reformed clan, Endless Song, modern leadership, dragonstorm practices, and modern locations. Do not backfill these into Khans-era Temur without a row. |

## Anti-Bleed Rules

- `GUR`, `URG`, or `RUG` is a color identity signal, not Temur Frontier lore.
- Atarka-era survival under a dragonlord is contrast evidence, not proof of original Temur culture.
- Modern Dragonstorm governance, settlements, dragon bonds, and Endless Song details must be timeline-labeled.
- Commander goodstuff, ramp, cascade, spell copying, energy, artifact tokens, and X-spells are operator signals only.
- Seed report claims, generated HTML tables, and packet-shaped seed summaries cannot cite themselves.
- Exact card text, mechanic reminder text, legality, and card prevalence require a later card-data pass.

## Source-Drop Hygiene Result

VM-203 corrected the unmanaged typo path from `docs/research/temur fontier/` to `docs/research/temur frontier/`. The corrected path remains unmanaged restored source material. The approved source packet lives at `docs/research/temur/`, and the seed copies in `source-material/` are byte-identical to the corrected source-drop originals.
