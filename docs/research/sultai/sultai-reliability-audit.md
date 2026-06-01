# Sultai Reliability Audit

Status: VM-209 source reliability audit. Sultai remains docs-only, non-live, and review-gated.

## Reliability Classes

| Class | Files | VM-209 Treatment |
|---|---|---|
| Claim-bearing official captures | SULTAI-SRC-001 through SULTAI-SRC-006 | May support evidence rows when the claim is source-bound and timeline-scoped. |
| Repo source-selection audit | SULTAI-SRC-007 | May support why a source is in the packet. It does not prove lore claims by itself. |
| Commander/operator data | SULTAI-SRC-008 and SULTAI-CMD-001 through SULTAI-CMD-006 | support-only for search, player-facing operator language, and play-pattern vocabulary. |
| Protocol/color support references | SULTAI-SRC-009 through SULTAI-SRC-012 | support-only. Color philosophy supports interpretation only; protocol dossiers support claim discovery only. |
| Preserved seed artifacts | SULTAI-SRC-013 through SULTAI-SRC-014 | discovery-only. They are preserved and useful for claim queues, but every claim needs independent promotion. |

## Timeline Guardrails

| Boundary | Rule |
|---|---|
| Khans-era Sultai Brood | Use SULTAI-SRC-002 for Sidisi-era culture, necromancy, sibsig, rakshasa pacts, naga hierarchy, locations, and Sultai exploitation. |
| Fate Reforged Sultai | Use SULTAI-SRC-003 for Tasigur-era ancient context and anti-Silumgar pressure. Keep biographies narrow. |
| Khanfall story transition | Use SULTAI-SRC-004 only for the story beats it directly shows: Tasigur, truce breach, Silumgar, "no khan", and trophy status. |
| Dragons-era Silumgar clan | Use SULTAI-SRC-005 as contrast and timeline boundary. Silumgar clan is not Khans-era Sultai Brood. |
| Modern Dragonstorm Sultai | Use SULTAI-SRC-006 for the revived clan, agriculture, honored dead, Fangkeeper/Lasyd, Abiding Harvest, Rite of Renewal, dragons, dragonstorms, and modern locations. Do not backfill these into Khans-era Sultai. |

## Anti-Bleed Rules

- `BGU`, `BUG`, `UBG`, or `GUB` is a color identity signal, not Sultai Brood lore.
- Silumgar clan material is contrast and timeline evidence, not proof of original Sultai Brood culture.
- Modern Dragonstorm reforms, honored sibsig status, decentralized governance, Fangkeeper, Lasyd, Abiding Harvest, Rite of Renewal, and modern locations must be timeline-labeled.
- Commander graveyard value, theft, mill/rad counters, morph, Mimeoplasm-style construction, and mutate are operator signals only.
- Color-pair philosophy files may support VM-210 metaphysical interpretation but do not prove Tarkir-specific lore, events, figures, mechanics, chronology, or clan facts.
- Seed report claims and packet-shaped summaries cannot cite themselves.
- Exact card text, mechanic reminder text, commander legality, product decklist facts, and card prevalence require a later card-data pass.

## Source-Drop Hygiene Result

The unmanaged restored source drop remains `docs/research/sultai brood/`. VM-209 did not edit that folder.

The approved source packet lives at `docs/research/sultai/`, and the two seed copies in `source-material/` are byte-identical to the source-drop originals:

- `sultai-brood-deep-research-report.md`
- `sultai-brood-lore-source-packet.md`
