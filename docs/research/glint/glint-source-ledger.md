# Glint Source Ledger

Status: VM-276 source-first reconciliation ledger
Evidence rule: Use repo-local canon/reference material only according to its explicit source role

## Source Rows

| ID | Source | Tier | Role | Use |
| --- | --- | --- | --- | --- |
| `GLINT-SRC-001` | `docs/research/canon/canon-inventory-four-color-reference-audit.md` | Tier 1A repo-truth audit | Claim-bearing evidence | VM-246 framing for the reserved Glint/UBRG lane, missing-White boundary, Glint-Eye anchor, Yidris support anchor, and four-color lane context |
| `GLINT-SRC-002` | `docs/research/canon/misc/Magic Four-Color Identity Dossier.md` | Tier 2 repo synthesis/reference | Support-only reference unless a future card resolves a claim back to approved source rows | Missing-color analysis, anchor-card recap, Yidris/Glint-Eye support language, and overclaim warnings |
| `GLINT-SRC-003` | `docs/architecture/system/cross-color-dynamics.md` | Tier 2 Vox Mana system architecture | Vox Mana synthesis | Existing repo phrasing for `UBRG (Non-White): Chaos`; useful for wording and comparator planning, not standalone evidence |
| `GLINT-SRC-004` | `docs/research/canon/misc/commander_deck_list.txt` | Tier 2 local product support | Support-only reference | Confirms `Entropic Uprising`, `Yidris, Maelstrom Wielder`, `UBRG`, and `Commander 2016` as a local Commander support row |
| `GLINT-SRC-005` | `docs/research/canon/misc/comprehensive-mtg-lore-history-updated.md` | Tier 2 local support recap | Support-only reference | Brief local recap of the Glint-Eye flavor anchor and `Chaos - Glint - Glint-Eye Nephilim` mapping |
| `GLINT-SRC-006` | `data/scryfall/raw/oracle-cards.json` | Tier 2 local card data | Support-only reference | Exact local card-data validation for `Glint-Eye Nephilim` and `Yidris, Maelstrom Wielder`; use for bounded card facts, oracle text, type lines, color identity, and flavor-text support only |
| `GLINT-CMD-001` | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl:51` | Tier 2P product support | Support-only reference | Exact `Entropic Uprising` Commander texture row for `Yidris, Maelstrom Wielder` |
| `GLINT-SCOPE-001` | `docs/kanban/done/VM-246-glint-source-packet-and-evidence-ledger.md` | Scope-bound | Claim-bearing evidence | VM-246 source-only scope and non-goals |

## Source Role Summary

| Role | Sources | Notes |
| --- | --- | --- |
| Claim-bearing evidence | `GLINT-SRC-001`, `GLINT-SCOPE-001` | Use for VM-246 source-packet claims and boundaries. |
| Support-only reference | `GLINT-SRC-002`, `GLINT-SRC-004`, `GLINT-SRC-005`, `GLINT-SRC-006`, `GLINT-CMD-001` | Use only to support language already bounded by claim-bearing rows. |
| Vox Mana synthesis | `GLINT-SRC-003` | Useful for existing repo phrasing and future copy structure, not claim authority. |
| Manual-fill gap | `glint-manual-fill.md` | Use when a claim would otherwise require direct official source capture or stronger repo-local grounding. |

## Unmanaged Discovery Inputs

These files remain preserved in place as discovery inputs only. They are not approved source authorities and must not receive `GLINT-SRC-###` or `GLINT-EVID-###` IDs as draft files.

| File | Status | Use Allowed | SHA-256 |
| --- | --- | --- | --- |
| `docs/research/glint/UBRG Identity Research Packet.md` | Unmanaged markdown draft with outbound citations and broad synthesis | Classification, topic discovery, source-lead discovery, and caution list only | `4A31B990128E33D5F13E21BA3C20533F5B06CC97282B212660B10C65208AA718` |
| `docs/research/glint/glint-eye-research-packet.html` | Unmanaged presentation/export draft | Classification, structure, and topic discovery only | `3A540D8FA633959771EA0C8D1E43DF3D1194F42A1C7191BFA01E4DC1AC9F4995` |
| `docs/research/glint/the_dynamics_of_entropy.html` | Unmanaged presentation/export draft | Classification, structure, and topic discovery only | `233E17CD62A2F8FB0BFA9D769E28B14087C3FD8F7839B6F2299C302CF93285BD` |

## Future Source Needs

| Need | Reason | Suggested Owner |
| --- | --- | --- |
| Local official capture for `Howdy Partner`, `Designing Commander 2016 Edition`, and `It's Time to Talk Commander (2016 Edition)!` | The repo still references these articles indirectly, but VM-276 does not have them as clean local official captures under canon. | A future Documentation Steward or JSON Cartographer pass |
| Stronger direct official capture for Glint-Eye Nephilim and Yidris, Maelstrom Wielder | VM-276 adds exact local card-data validation through `GLINT-SRC-006`, but later claim-bearing promotion or quote-heavy public copy would still benefit from stronger direct official capture. | A future JSON Cartographer or Documentation Steward pass |
| Four-color naming authority context | Future public docs should cite direct naming/context sources before making polished naming claims. | VM-247 |
| Same-color and near-match separators | VM-248 supplies shaping-only separator guidance, but raw/source-level separator authority is still thin. | A future JSON Cartographer pass |
| Commander legality and recommendation grounding | The current JSONL row is support-only and should not authorize runtime or recommendation certainty. | VM-249 or VM-251 only if needed |
