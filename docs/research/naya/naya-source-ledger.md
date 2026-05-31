# Naya Source Ledger

Status: VM-181 approved source ledger. Naya remains non-live.

## Source Classification

| Source ID | Tier | Source | Approved Use | Limits |
|---|---:|---|---|---|
| NAY-SRC-001 | 1 | `docs/research/canon/mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md` | Primary Naya design/color-philosophy source: red-green-white shard, Green center, White and Red support, Blue/Black opposition, nature/growth framing. | Design and color-philosophy evidence only. Not a full Alara geography, story, creature-culture, religion, or timeline source. |
| NAY-SRC-002 | 1A | `docs/research/canon/canon-inventory-three-color-reference-audit.md` and normalized repo reference `docs/analysis/canon-inventory-three-color-reference-audit.md` | Inventory proof that the Naya official article is the current primary Naya source path and that supporting canon paths require claim-by-claim handling. | Audit/index source only. It identifies source paths; it does not itself prove Naya lore claims. |
| NAY-SRC-003 | 2 | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Support source when future work validates direct Alara/Naya rows. | Support-only in VM-181. No geography, named-person, polity, or chronology claim is promoted from it in this pass. |
| NAY-SRC-004 | 2 | `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html` | Structural support for later review of Alara shard metaphysics. | Support-only. No claim may cite this as a sole basis without a later source audit. |
| NAY-SRC-005 | 2 | `data/scryfall/raw/oracle-cards.json` | Card facts, names, rules text, color identity, and mechanical tags when validated by exact lookup. | Card database support only. Does not prove setting-story relationships or Vox Mana identity claims. |
| NAY-SRC-006 | 2 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Operator and Commander-support language from exact RGW color rows. | Support-only. It does not prove MTG canon, commander legality beyond later validation, or Naya-world origin. |
| NAY-SRC-007 | 2 | Official mono-color and two-color philosophy captures identified by the canon inventory, especially Green, White, Red, Selesnya, Gruul, and Boros. | Color philosophy support for overlap and separators. | Support-only. Do not turn pair/mono articles into Naya story claims. |
| NAY-SRC-008 | 2 | Approved Bant, Esper, Grixis, and Jund packet/docs tracks. | Comparator and parity reference only. | Do not import doctrine. Jund is not live/gold-standard precedent for Naya runtime status. |
| NAY-SEED-001 | Seed | `source-material/naya-lore-source-packet.unmanaged-vm161-seed.md` | Discovery material and claim queue. | Not approved evidence. VM-161/canonical labels and copied packet wording are rejected as evidence. |
| NAY-SEED-002 | Seed | `source-material/naya_deep-research-report.generated-seed.md` | Discovery material and overclaim warning source. | Not approved evidence. Citation-token drift and encoding defects require independent source review. |

## Exact RGW Commander Support Extraction

The VM-181 extraction from `NAY-SRC-006` used exact normalized color identity `green|red|white`. It produced 10 support-only rows.

| Row ID | JSONL Line | Product | Face Commander | Support Themes | Recommended Second Commander | Status |
|---|---:|---|---|---|---|---|
| NAY-CMD-001 | 5 | Limit Break | Cloud, Ex-SOLDIER | Equipment; seven-plus power threshold rewards | Tifa, Lockhart of AVALANCHE | Support-only; validate card facts later. |
| NAY-CMD-002 | 28 | Desert Bloom | Yuma, Proud Protector | Lands in graveyard; Desert synergies; land sacrifice and recursion | Titania, Protector of Argoth | Support-only; not Naya canon. |
| NAY-CMD-003 | 31 | Scrappy Survivors | Dogmeat, Ever Loyal | Auras and Equipment; Junk token conversion | Tezzeret, Betrayer of Flesh | Support-only; potential color-identity/role mismatch requires later validation. |
| NAY-CMD-004 | 37 | Deadly Disguise | Kaust, Eyes of the Glade | Face-down creatures; Morph/Disguise synergies | Ixidor, Reality Sculptor | Support-only; potential color-identity/role mismatch requires later validation. |
| NAY-CMD-005 | 41 | Primal Genesis | Ghired, Conclave Exile | Populate; token copying; token aggression | Marisi, Breaker of the Coil | Support-only. |
| NAY-CMD-006 | 70 | Nature of the Beast | Marath, Will of the Wild | Beasts tribal; +1/+1 counter scaling; flexible mana sink | Gahiji, Honored One | Support-only; not proof that Gahiji is Nayan or Alara-native. |
| NAY-CMD-007 | 93 | Land's Wrath | Obuun, Mul Daya Ancestor | Landfall; land animation | Omnath, Locus of Rage | Support-only. |
| NAY-CMD-008 | 100 | Veloci-Ramp-Tor | Pantlaza, Sun-Favored | Dinosaur tribal; ramp | Gishath, Sun's Avatar | Support-only. |
| NAY-CMD-009 | 120 | Call for Backup | Bright-Palm, Soul Awakener | +1/+1 counters; Backup | Shalai and Hallar | Support-only; row status in source is Verified. |
| NAY-CMD-010 | 154 | Cabaretti Cacophony | Kitt Kanto, Mayhem Diva | Token go-wide; goad; Cats and Dogs | Phabine, Boss's Confidant | Support-only; Cabaretti is a distinct identity and cannot be folded into Naya. |

## Excluded Uses

- Do not use broad `RGW`, `GRW`, or `WRG` text hits as source evidence.
- Do not use WURG, WUBRG, two-color, or off-color Commander rows as Naya operator support.
- Do not treat Naya seed files, architecture docs, dossiers, or prior generated text as evidence.
- Do not treat Commander product rows as Alara story canon.
