# Temur Seed Source Crosscheck

Status: VM-203 post-rename source-drop audit. Temur remains non-live.

## Scope

VM-203 corrected the restored unmanaged Temur source-drop typo path and copied the three seed artifacts into the approved source packet without editing their contents.

## Path Correction

| Item | Path | VM-203 Result |
|---|---|---|
| Pre-VM-203 typo path | `docs/research/temur fontier/` | Existed before rename. |
| Corrected unmanaged source-drop path | `docs/research/temur frontier/` | Created by renaming the typo path. Remains unmanaged source drop. |
| Approved packet root | `docs/research/temur/` | Created by VM-203. |

## Required Path Guards

| Guard | Expected | Observed |
|---|---:|---:|
| Before rename: `Test-Path "docs\research\temur fontier"` | True | True |
| Before rename: `Test-Path "docs\research\temur frontier"` | False unless already corrected | False |
| After rename: `Test-Path "docs\research\temur fontier"` | False | False |
| After rename: `Test-Path "docs\research\temur frontier"` | True | True |
| After packet creation: `Test-Path docs\research\temur` | True | True |
| Scope guard: `Test-Path docs\architecture\colors\temur` | False | False |
| Scope guard: `Test-Path data\raw-factions\temur` | False | False |

## Copied Seed Artifacts

VM-203 copied, not moved, these files from the corrected source-drop path into `docs/research/temur/source-material/`. The copied hashes match the corrected source-drop originals.

| Corrected Source Drop Path | Approved Packet Copy | SHA-256 | Result |
|---|---|---|---|
| `docs/research/temur frontier/Temur Frontier Research Report.md` | `docs/research/temur/source-material/Temur Frontier Research Report.md` | `215CDA892F4D4AA4DB437B5972588A2444484B25B4F73EB3AD5F8B4492DCC879` | Byte-identical copy. |
| `docs/research/temur frontier/temur-frontier-lore-source-packet.md` | `docs/research/temur/source-material/temur-frontier-lore-source-packet.md` | `A412912DF55FFE20F3F74D26D84FC101E6FC02CEC11E7981264D5E5F0D9D1BA2` | Byte-identical copy. |
| `docs/research/temur frontier/temur_research_report.html` | `docs/research/temur/source-material/temur_research_report.html` | `7A0D0A91B6499654033193853034C6CC256562DDC210BDB5945B99E4A1FAC1E9` | Byte-identical copy. |

## Source Crosscheck

VM-203 promoted only local, inspected sources that either identify themselves as Wizards/Magic official captures or were already classified by a prior repo audit/source ledger.

| Seed Source Claim | VM-203 Treatment | Reason |
|---|---|---|
| Mark Rosewater, `What Doesn't Kill You Makes You Stronger` | Promoted as TEMUR-SRC-001. | Local file identifies Making Magic / Mark Rosewater; prior audit classifies it as a primary identity source. |
| `Planeswalker's Guide to Khans of Tarkir, Part 2` | Promoted as TEMUR-SRC-002. | Local verified capture exists and contains the Khans-era Temur section. |
| `Planeswalker's Guide to Fate Reforged` | Promoted as TEMUR-SRC-003. | Local verified capture exists and contains the Fate Reforged Temur/Yasova section. |
| `Khanfall` | Promoted as TEMUR-SRC-004 for Yasova/Atarka survival-bargain context. | Local official story capture exists. |
| `Planeswalker's Guide to Dragons of Tarkir, Part 1` | Promoted as TEMUR-SRC-005 for Khanfall/timeline transition. | Local verified capture exists. |
| `Planeswalker's Guide to Dragons of Tarkir, Part 2` | Promoted as TEMUR-SRC-006 for Atarka Clan contrast. | Local verified capture exists. |
| `Awakening the Bear` | Promoted as TEMUR-SRC-007 for Surrak story support. | Local official story capture exists. |
| `Planeswalker's Guide to Tarkir: Dragonstorm, Part 2` | Promoted as TEMUR-SRC-008. | Local verified capture exists and contains modern Temur material. |
| Scryfall / Gatherer / exact card mechanics | Not promoted. | VM-203 did not inspect exact local card or rules records. |
| EDHREC / Reddit / community Commander material | Not promoted as lore evidence. | Player perception only; Commander JSONL is support-only. |
| The three seed artifacts | Preserved as TEMUR-SRC-012 through TEMUR-SRC-014. | Discovery-only; claims must be independently rebound. |

## Result

No seed artifact was edited during VM-203. The corrected unmanaged source-drop path and the approved copied packet paths are recorded above. The approved Temur packet is conservative relative to the seed folder: it promotes only local official captures already present in the repo and leaves seed-only mechanics, card facts, community interpretation, and uncaptured story details in `Manual fill required` or `Support-only` territory.
