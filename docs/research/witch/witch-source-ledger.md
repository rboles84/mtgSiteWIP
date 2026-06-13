# Witch Source Ledger

Status: VM-264 approved source ledger
Evidence rule: Use repo-local canon/reference material only according to its explicit source role

## Source Rows

| ID | Source | Tier | Role | Use |
| --- | --- | --- | --- | --- |
| `WITCH-SRC-001` | `docs/research/canon/canon-inventory-four-color-reference-audit.md` | Tier 1A repo-truth audit | Claim-bearing evidence | VM-264 framing for the reserved Witch/GWUB lane, missing-Red boundary, Witch-Maw anchor, Atraxa support anchor, and four-color lane context |
| `WITCH-SRC-002` | Witch/Atraxa sections of `docs/research/canon/misc/Magic Four-Color Identity Dossier.md` | Tier 1B repo-local dossier floor | Claim-bearing evidence | Witch/Growth snapshot, Witch-Maw card recap, Atraxa proliferate/counter scaling recap, missing-Red worldview floor, and local overclaim warnings used in VM-264 |
| `WITCH-SRC-003` | `docs/research/canon/misc/commander_deck_list.txt` | Tier 2 local product support | Support-only reference | Confirms `Breed Lethality`, `Atraxa, Praetors' Voice`, `WUBG`, and `Commander 2016` as a local Commander support row |
| `WITCH-CMD-001` | Current `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` record matching `deckName = "Breed Lethality"` and `mainCommander = "Atraxa, Praetors' Voice"` | Tier 2P product support | Support-only reference | Exact local `Breed Lethality` Commander texture row for Atraxa, proliferate, counters, and scaling-growth support language |
| `WITCH-SRC-004` | `data/precons/vox-mana-precons.source.json` | Tier 2 local product support | Support-only reference | Repo-local `Breed Lethality` source data for commander list, colors, theme, and support texture |
| `WITCH-SRC-005` | `data/precons/vox-mana-precon-catalog.json` | Tier 2 generated product support | Support-only reference | Repo-local normalized `Breed Lethality` support data for cross-checking the source row |
| `WITCH-SRC-006` | `docs/research/canon/misc/MTG_Lore_Research_Enhanced_Final.md` | Tier 3 broad lore compendium | Shaping-only source | Future source-lead discovery and cross-plane Phyrexian texture only; not claim-bearing Witch authority in VM-264 |
| `WITCH-SCOPE-001` | `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md` | Scope-bound | Claim-bearing evidence | VM-264 source-only scope and non-goals |

## Source Role Summary

| Role | Sources | Notes |
| --- | --- | --- |
| Claim-bearing evidence | `WITCH-SRC-001`, `WITCH-SRC-002`, `WITCH-SCOPE-001` | Use for VM-264 source-packet claims and boundaries. |
| Support-only reference | `WITCH-SRC-003`, `WITCH-CMD-001`, `WITCH-SRC-004`, `WITCH-SRC-005` | Use only to support language already bounded by claim-bearing rows. |
| Shaping-only source | `WITCH-SRC-006` | Useful for future lore/source capture planning, but not approved as standalone claim authority in VM-264. |
| Vox Mana synthesis | None approved in VM-264 as standalone authority | Future synthesis must remain traceable to approved Witch evidence rows. |
| Manual-fill gap | `witch-manual-fill.md` | Use when a claim would otherwise require direct official source capture or stronger repo-local grounding. |
| Discovery-only input | `docs/research/witch/GWUB Four-Color Identity Research.md`, `docs/research/witch/the_systemic_altar.html`, `docs/research/witch/witch-maw-research-packet.html` | Classification, unsupported-claim inventory, and source-lead discovery only. |

## Unmanaged Discovery Inputs

These files remain preserved in place as discovery inputs only. They are not approved source authority and must not receive `WITCH-SRC-###` or `WITCH-EVID-###` IDs as draft files.

| File | Status | Use Allowed | SHA-256 |
| --- | --- | --- | --- |
| `docs/research/witch/GWUB Four-Color Identity Research.md` | Unmanaged longform research/report draft with external citations, commander ranking language, and cEDH claims | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `CD14712FD3AAAAD2BF72DF02EDB07E838B0DDA5719125B8615ACE0F6A1011993` |
| `docs/research/witch/the_systemic_altar.html` | Unmanaged presentation/export draft with polished lore framing and Commander/product texture | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `C44834D06790665AA35F142ABD601ED57E5CCE63A715246B71C632CF2C2D92D0` |
| `docs/research/witch/witch-maw-research-packet.html` | Unmanaged presentation/export draft with EDHREC-style counts, strategy ladders, and placement-heavy claims | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `931408844A89048E3ADA235D13C18FD65F383203088307516213813D220B2C30` |

## Future Source Needs

| Need | Reason | Suggested Owner |
| --- | --- | --- |
| Direct local official capture for Witch-Maw Nephilim | Later raw claims should verify exact card facts from stronger sources than the current dossier floor alone. | VM-265 or VM-267 |
| Direct local official capture for Atraxa / `Breed Lethality` / Commander 2016 `Growth` context | Later docs and raw claims need stronger grounding than support rows alone for product context and naming nuance. | VM-265 or VM-267 |
| Four-color naming authority and color-order reconciliation | VM-264 records the Witch/Growth naming guardrail, but does not build a full naming dossier for `GWUB` versus support-source `WUBG`. | VM-265 |
| Additional `GWUB` commander/product support beyond Atraxa | The preserved drafts discuss Atraxa, Grand Unifier, partner shells, and broader commander patterns beyond the approved floor. | VM-265 or later source-capture card |
| Same-color and near-match separators | Bant, Esper, Sultai, Abzan, Ink, and generic proliferate/counters shells can blur into Witch. | VM-265 or VM-266 |
| Unsupported-claim audit follow-through for the existing Witch drafts | Later cards need a concrete checklist for what cannot move downstream without new evidence. | VM-265 through VM-267 |
| Phyrexia texture boundary capture | The preserved drafts strongly associate Witch with New Phyrexia, but VM-264 does not authorize collapsing the whole lane into a single plane or faction. | VM-265 |
