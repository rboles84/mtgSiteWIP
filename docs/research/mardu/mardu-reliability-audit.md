# Mardu Reliability Audit

Status: VM-223 source reliability audit. Mardu remains docs-only, non-live, and review-gated.

## Reliability Classes

| Class | Files | VM-223 Treatment |
|---|---|---|
| Claim-bearing official captures | MARDU-SRC-001 through MARDU-SRC-007 | May support evidence rows when the claim is source-bound and timeline-scoped. |
| Repo source-selection audit | MARDU-SRC-008 | May support why a source is in the packet. It does not prove lore claims by itself. |
| Commander/operator data | MARDU-SRC-009 and MARDU-CMD-001 through MARDU-CMD-008 | support-only for search, player-facing operator language, and play-pattern vocabulary. |
| Protocol/color support references | MARDU-SRC-010 through MARDU-SRC-013 | support-only. Color philosophy supports interpretation only; protocol dossiers support claim discovery only. |
| Preserved seed artifacts | MARDU-SRC-014 through MARDU-SRC-016 | discovery-only. They are preserved and useful for claim queues, but every claim needs independent promotion. |

## Timeline Guardrails

| Boundary | Rule |
|---|---|
| Khans-era Mardu Horde | Use MARDU-SRC-002 for Zurgo-era culture, Edicts of Ilagra, war names, raiding, magic, roles, figures, and locations. |
| Fate Reforged Mardu | Use MARDU-SRC-003 and MARDU-SRC-004 for Alesha-era ancient context, dragon-hunting pressure, war-name support, and Kolaghan pressure. Keep biographies narrow. |
| Khanfall story transition | Use MARDU-SRC-005 only for the story beats it directly shows: Alesha at the khan summit, Mardu rank-and-file pressure, and inter-clan crisis. |
| Dragons-era Kolaghan clan | Use MARDU-SRC-006 as contrast and timeline boundary. Kolaghan clan is not Khans-era Mardu Horde. |
| Modern Dragonstorm Mardu | Use MARDU-SRC-007 for the restored clan, Dalkovan Assembly, mobile cities, Decree of Thunder, Lightning Proving, stormsingers, clan dragons, dragonstorms, and modern locations. Do not backfill these into Khans-era Mardu. |

## Anti-Bleed Rules

- `RWB` and `WBR` are color identity signals, not Mardu Horde lore.
- Kolaghan clan material is contrast and timeline evidence, not proof of original Mardu Horde culture.
- Modern Dragonstorm reforms, Dalkovan Assembly, Decree of Thunder, Lightning Proving, modern trade/diplomacy, clan dragons, and modern locations must be timeline-labeled.
- Commander attacking tokens, sacrifice, Outlaws/Treasure, aristocrats, Vampire tribal, reanimator, large-threat attack triggers, Human tribal, and legendary-permanent play are operator signals only.
- Color-pair philosophy files may support VM-224 metaphysical interpretation but do not prove Tarkir-specific lore, events, figures, mechanics, chronology, or clan facts.
- Seed report claims and packet-shaped summaries cannot cite themselves.
- Exact card text, mechanic reminder text, commander legality, product decklist facts, and card prevalence require a later card-data pass.

## Source-Drop Hygiene Result

The unmanaged restored source drop remains `docs/research/mardu horde/`. VM-223 did not edit that folder.

The approved source packet lives at `docs/research/mardu/`, and the three seed copies in `source-material/` are byte-identical to the source-drop originals:

- `Mardu Horde Deep Research Report.md`
- `mardu-horde-lore-source-packet.md`
- `mardu_horde_tactical_archive.html`
