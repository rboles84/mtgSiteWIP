# Dune Source Ledger

Status: VM-252 approved source ledger
Evidence rule: Use repo-local canon/reference material only according to its explicit source role

## Source Rows

| ID | Source | Tier | Role | Use |
| --- | --- | --- | --- | --- |
| `DUNE-SRC-001` | `docs/research/canon/canon-inventory-four-color-reference-audit.md` | Tier 1A repo-truth audit | Claim-bearing evidence | VM-252 framing for the reserved Dune/BRGW lane, missing-Blue boundary, Dune-Brood anchor, Saskia support anchor, and four-color lane context |
| `DUNE-SRC-002` | `docs/research/canon/misc/Magic Four-Color Identity Dossier.md` | Tier 2 repo synthesis/reference | Support-only reference unless a future card resolves a claim back to approved source rows | Missing-color analysis, anchor-card recap, Saskia support language, and overclaim warnings |
| `DUNE-SRC-003` | `docs/research/canon/misc/commander_deck_list.txt` | Tier 2 local product support | Support-only reference | Confirms `Open Hostility`, `Saskia the Unyielding`, `WBRG`, and `Commander 2016` as a local Commander support row |
| `DUNE-CMD-001` | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl:52` | Tier 2P product support | Support-only reference | Exact `Open Hostility` Commander texture row for `Saskia the Unyielding`, partner commanders, and decklist-adjacent support |
| `DUNE-SRC-004` | `data/precons/vox-mana-precons.source.json` | Tier 2 local product support | Support-only reference | Repo-local `Open Hostility` source data for commander list, colors, theme, and support texture |
| `DUNE-SRC-005` | `data/precons/vox-mana-precon-catalog.json` | Tier 2 generated product support | Support-only reference | Repo-local normalized `Open Hostility` support data for cross-checking the source row |
| `DUNE-SCOPE-001` | `docs/kanban/done/VM-252-dune-source-packet-and-evidence-ledger.md` | Scope-bound | Claim-bearing evidence | VM-252 source-only scope and non-goals |

## Source Role Summary

| Role | Sources | Notes |
| --- | --- | --- |
| Claim-bearing evidence | `DUNE-SRC-001`, `DUNE-SCOPE-001` | Use for VM-252 source-packet claims and boundaries. |
| Support-only reference | `DUNE-SRC-002`, `DUNE-SRC-003`, `DUNE-CMD-001`, `DUNE-SRC-004`, `DUNE-SRC-005` | Use only to support language already bounded by claim-bearing rows. |
| Shaping-only source | None approved in VM-252 | Future cards may add shaping-only material, but VM-252 does not approve any standalone shaping source. |
| Vox Mana synthesis | None approved in VM-252 as standalone authority | Future synthesis must remain traceable to approved Dune evidence rows. |
| Manual-fill gap | `dune-manual-fill.md` | Use when a claim would otherwise require direct official source capture or stronger repo-local grounding. |
| Discovery-only input | `docs/research/dune/dune-brood-research-packet.html` | Classification, unsupported-claim inventory, and source-lead discovery only. |

## Unmanaged Discovery Input

This file remains preserved in place as a discovery input only. It is not an approved source authority and must not receive `DUNE-SRC-###` or `DUNE-EVID-###` IDs as a draft file.

| File | Status | Use Allowed | SHA-256 |
| --- | --- | --- | --- |
| `docs/research/dune/dune-brood-research-packet.html` | Unmanaged presentation/export draft with polished claims and outbound-source leads | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `0B6608291A864EC0A2DCEC8B82BB13FCF4B3863D0716847312DC6C985E36B8F7` |

## Future Source Needs

| Need | Reason | Suggested Owner |
| --- | --- | --- |
| Direct local official capture for Dune-Brood Nephilim | Later raw claims should verify exact card facts from stronger sources than support recaps or discovery drafts. | VM-253 or VM-255 |
| Direct local official capture for Saskia / Commander 2016 `Aggression` product context | Later docs and raw claims need stronger grounding than support rows alone. | VM-253 or VM-255 |
| Rosewater `Aggression` commentary capture | The discovery draft references it indirectly, but VM-252 does not have a clean local official capture. | VM-253 |
| Partner/decklist support validation for Tana/Tymna, Ravos, and other `Open Hostility` commanders | Current grounding is support-only and must not become identity proof without stronger sourcing. | VM-254 or VM-255 |
| Same-color and near-match separators | Jund, Naya, Mardu, Abzan, Glint, and generic go-wide/combat shells can blur into Dune. | VM-254 |
| Unsupported-claim audit follow-through for the existing HTML draft | Later cards need a concrete checklist for what cannot move downstream without new evidence. | VM-253 through VM-255 |
