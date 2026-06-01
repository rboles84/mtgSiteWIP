# Abzan Seed Source Crosscheck

Status: VM-200 post-restore audit. Abzan remains non-live.

## Scope

This audit compares the restored source drop at `docs/research/abzan houses/` with the VM-200 packet under `docs/research/abzan/`.

The restored files are line-equivalent to the VM-200 `source-material/` copies. File hashes differ because the VM-201 restore changed line-ending bytes, but line-by-line comparison found no content differences.

| Restored File | VM-200 Copy | Result |
|---|---|---|
| `docs/research/abzan houses/Abzan Houses_ Deep Research Report.md` | `docs/research/abzan/source-material/Abzan Houses_ Deep Research Report.md` | Line-equivalent; hash differs by line endings. |
| `docs/research/abzan houses/abzan-houses-lore-source-packet.md` | `docs/research/abzan/source-material/abzan-houses-lore-source-packet.md` | Line-equivalent; hash differs by line endings. |
| `docs/research/abzan houses/abzan_houses_research_report.html` | `docs/research/abzan/source-material/abzan_houses_research_report.html` | Line-equivalent; hash differs by line endings. |

## Source Crosscheck

VM-200 promoted only local, inspected sources that either identify themselves as Wizards/Magic official captures or were already classified by a prior repo audit/source ledger.

| Seed Source Claim | VM-200 Treatment | Reason |
|---|---|---|
| `Planeswalker's Guide to Tarkir: Dragonstorm, Part 1` | Promoted as ABZAN-SRC-007. | Local verified capture exists. |
| `Planeswalker's Guide to Tarkir: Dragonstorm, Part 2` | Promoted as ABZAN-SRC-008 for geography/border support. | Local verified capture exists. |
| `Planeswalker's Guide to Khans of Tarkir, Part 1` | Promoted as ABZAN-SRC-002. | Local verified capture exists. |
| `Planeswalker's Guide to Fate Reforged` | Promoted as ABZAN-SRC-003. | Local verified capture exists. |
| `Planeswalker's Guide to Dragons of Tarkir, Parts 1 & 2` | Promoted as ABZAN-SRC-004 and ABZAN-SRC-005 for transition/contrast. | Local verified captures exist. |
| `Khanfall` | Promoted as ABZAN-SRC-006. | Local verified capture exists. |
| Mark Rosewater, `We Will Survive` | Promoted as ABZAN-SRC-001. | Local file identifies Making Magic / Mark Rosewater; prior audit classifies it as primary identity source. |
| `The Legends of Tarkir: Dragonstorm` | Not promoted. | The seed cites the URL, but no local captured file was found in VM-200 audit. Use `Manual fill required` until captured locally and inspected. |
| `Khans of Tarkir Design Handoff, Part 1` | Not promoted. | The seed cites the URL, but no local captured file was found in VM-200 audit. |
| `The Kin Tree`, `The Bare Bones`, `The Story of Tarkir Block`, and other story links in the generated seed report | Not promoted. | Mentioned in seed source tables, but not present as inspected local source rows in VM-200. |
| Gatherer / Scryfall card pages | Not promoted as lore evidence. | Exact card data needs a separate local card validation pass. |
| MTG Wiki / Fandom / MTGLore.com | Not promoted. | Secondary discovery only unless rebound to local official captures. |
| EDHREC / Reddit / Tolarian / player-community material | Not promoted. | Player perception only; no Tarkir lore weight. |
| `Tarkir Clan Lore Dossier Protocol.md` | Support-only as ABZAN-SRC-013. | Local protocol/dossier support, not official proof. |
| `vox_mana_second_commander_recommendations_enhanced.jsonl` | Support-only as ABZAN-SRC-011. | Exact WBG Commander/operator language only. |

## Lore Claim Crosscheck

VM-200 correctly promoted these seed-aligned claims because they were independently supported by local official captures:

- WBG / White-centered Abzan identity, endurance, survival, defense-first play, and late-game growth.
- Khans-era family, duty, trust, kin trees, ancestor spirits, social categories, krumar, Abzan roles, Anafenza, Arashin, Mer-Ek Fortress, and related locations.
- Fate Reforged Daghatar, dragon-scale armor, krumar, family bonds, and dragon-war pressure.
- Dragons-era Khanfall, Dromoka replacement rule, ancestor-magic prohibition, hidden kin trees, and Anafenza's execution for kin-tree worship.
- `Khanfall` story context around Daghatar's abdication to Dromoka, Reyhan's holdout leadership, and the khans' fall.
- Dragonstorm-era Council of Houses, Felothar as selected khan, five major houses, perennation, Kin-Tree bonding/severance, house rituals, Yathan, daily life, trade, agriculture, arts, magic, dragonstorm defense, and modern Abzan locations.

VM-200 correctly withheld these seed claims as manual-fill or support-only:

- `The Legends of Tarkir: Dragonstorm` profile details for Felothar, Anafenza, Hamza, and Betor.
- Claims that Felothar is a trans woman, was a Dromoka warrior, discovered a Kin-Tree after a collapse, or led specific underground rebellion operations.
- Stormnexus Ritual details, Narset scroll details, Crucible of the Spirit Dragon sequence, Ugin's return, Bolas consequences, wild dragon details, and Betor-specific metaphysics.
- Hamza biography, Loxodon krumar status, and post-rebellion species integration.
- Exact card facts, Outlast/Bolster/card-text claims, Siege Rhino constructed history, and community meme history.
- EDHREC/Commander archetype culture beyond the six support-only WBG rows.

## Result

No VM-200 evidence rows need correction. The source packet is conservative relative to the restored seed folder: it promotes only local official captures already present in the repo and leaves the seed folder's uncaptured official links, secondary sources, card data, and community interpretation in `Manual fill required` or `Support-only` territory.
