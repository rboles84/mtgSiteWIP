# Mardu Seed Source Crosscheck

Status: VM-223 source-drop audit. Mardu remains non-live.

## Scope

VM-223 copied the three Mardu seed artifacts into the approved source packet without editing their contents. The unmanaged seed folder remains intact.

## Required Path Guards

| Guard | Expected | Observed |
|---|---:|---:|
| Before packet creation: `Test-Path docs\research\mardu` | False | False |
| After packet creation: `Test-Path docs\research\mardu` | True | True |
| After packet creation: `Test-Path docs\research\mardu\source-material` | True | True |
| Scope guard: `Test-Path docs\architecture\colors\mardu` | False | False |
| Scope guard: `Test-Path data\raw-factions\mardu` | False | False |

## Copied Seed Artifacts

VM-223 copied, not moved, these files from the source-drop path into `docs/research/mardu/source-material/`. The copied hashes match the source-drop originals.

| Source Drop Path | Approved Packet Copy | SHA-256 | Result |
|---|---|---|---|
| `docs/research/mardu horde/Mardu Horde Deep Research Report.md` | `docs/research/mardu/source-material/Mardu Horde Deep Research Report.md` | `4BA3F88DD9F325BA3BCA410867C44EEAF6DFC3AA445E3774903CFD92F05FB2BD` | Byte-identical copy. |
| `docs/research/mardu horde/mardu-horde-lore-source-packet.md` | `docs/research/mardu/source-material/mardu-horde-lore-source-packet.md` | `5918CDA91867C1458604FFC0D2EB16530C1EE55DB3D93022440F3D7AE9CF191B` | Byte-identical copy. |
| `docs/research/mardu horde/mardu_horde_tactical_archive.html` | `docs/research/mardu/source-material/mardu_horde_tactical_archive.html` | `CA77AAC4078ECE69C0DF7FCD92C661DB26377419B3BAC9E8546F38ADDF41D2E5` | Byte-identical copy. |

## Source Crosscheck

VM-223 promoted only local, inspected sources that either identify themselves as Wizards/Magic official captures or were already classified by a prior repo audit/source ledger.

| Seed Source Claim | VM-223 Treatment | Reason |
|---|---|---|
| Mark Rosewater, `Finishing First` | Promoted as MARDU-SRC-001. | Local file identifies Making Magic / Mark Rosewater; prior audit classifies it as a primary identity source. |
| `Planeswalker's Guide to Khans of Tarkir, Part 2` | Promoted as MARDU-SRC-002. | Local verified capture exists and contains the Khans-era Mardu section. |
| `Planeswalker's Guide to Fate Reforged` | Promoted as MARDU-SRC-003. | Local verified capture exists and contains Fate Reforged Mardu/Alesha/Kolaghan context. |
| `The Truth of Names` | Promoted as MARDU-SRC-004 for Alesha and war-name story support. | Local official story capture exists. |
| `Khanfall` | Promoted as MARDU-SRC-005 for Alesha summit context. | Local official story capture exists. |
| `Planeswalker's Guide to Dragons of Tarkir, Part 2` | Promoted as MARDU-SRC-006 for Kolaghan clan contrast. | Local verified capture exists and contains the Kolaghan section. |
| `Planeswalker's Guide to Tarkir: Dragonstorm, Part 2` | Promoted as MARDU-SRC-007. | Local verified capture exists and contains modern Mardu material. |
| Scryfall / Gatherer / exact card mechanics | Not promoted. | VM-223 did not inspect exact local card or rules records. |
| EDHREC / Reddit / community Commander material | Not promoted as lore evidence. | Player perception only; Commander JSONL is support-only. |
| The three seed artifacts | Preserved as MARDU-SRC-014 through MARDU-SRC-016. | Discovery-only; claims must be independently rebound. |

## Result

No seed artifact was edited during VM-223. The unmanaged source-drop path and the approved copied packet paths are recorded above. The approved Mardu packet is conservative relative to the seed folder: it promotes only local official captures already present in the repo and leaves seed-only mechanics, card facts, community interpretation, and uncaptured story details in `Manual fill required` or `support-only` territory.
