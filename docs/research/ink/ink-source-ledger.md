# Ink Source Ledger

Status: VM-258 approved source ledger
Evidence rule: Use repo-local canon/reference material only according to its explicit source role

## Source Rows

| ID | Source | Tier | Role | Use |
| --- | --- | --- | --- | --- |
| `INK-SRC-001` | `docs/research/canon/canon-inventory-four-color-reference-audit.md` | Tier 1A repo-truth audit | Claim-bearing evidence | VM-258 framing for the reserved Ink/RGWU lane, missing-Black boundary, Ink-Treader anchor, Kynaios support anchor, and four-color lane context |
| `INK-SRC-002` | `docs/research/canon/misc/Magic Four-Color Identity Dossier.md` | Tier 2 repo synthesis/reference | Support-only reference unless a future card resolves a claim back to approved source rows | Missing-color analysis, anchor-card recap, Kynaios support language, and overclaim warnings |
| `INK-SRC-003` | `docs/research/canon/misc/commander_deck_list.txt` | Tier 2 local product support | Support-only reference | Confirms `Stalwart Unity`, `Kynaios and Tiro of Meletis`, `WURG`, and `Commander 2016` as a local Commander support row |
| `INK-CMD-001` | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` record matching `deckName = "Stalwart Unity"` and `mainCommander = "Kynaios and Tiro of Meletis"` | Tier 2P product support | Support-only reference | Exact `Stalwart Unity` Commander texture row for Kynaios and Tiro, group-hug framing, and shared-resource support language |
| `INK-SRC-004` | `data/precons/vox-mana-precons.source.json` | Tier 2 local product support | Support-only reference | Repo-local `Stalwart Unity` source data for commander list, colors, theme, and support texture |
| `INK-SRC-005` | `data/precons/vox-mana-precon-catalog.json` | Tier 2 generated product support | Support-only reference | Repo-local normalized `Stalwart Unity` support data for cross-checking the source row |
| `INK-SCOPE-001` | `docs/kanban/done/VM-258-ink-source-packet-and-evidence-ledger.md` | Scope-bound | Claim-bearing evidence | VM-258 source-only scope and non-goals |

## Source Role Summary

| Role | Sources | Notes |
| --- | --- | --- |
| Claim-bearing evidence | `INK-SRC-001`, `INK-SCOPE-001` | Use for VM-258 source-packet claims and boundaries. |
| Support-only reference | `INK-SRC-002`, `INK-SRC-003`, `INK-CMD-001`, `INK-SRC-004`, `INK-SRC-005` | Use only to support language already bounded by claim-bearing rows. |
| Shaping-only source | None approved in VM-258 | Future cards may add shaping-only material, but VM-258 does not approve any standalone shaping source. |
| Vox Mana synthesis | None approved in VM-258 as standalone authority | Future synthesis must remain traceable to approved Ink evidence rows. |
| Manual-fill gap | `ink-manual-fill.md` | Use when a claim would otherwise require direct official source capture or stronger repo-local grounding. |
| Discovery-only input | `docs/research/ink/ink-deep-research-report.md`, `docs/research/ink/ink-treader-research-packet.html`, `docs/research/ink/ink_altruism_rgwu_research_report.md` | Classification, unsupported-claim inventory, and source-lead discovery only. |

## Unmanaged Discovery Inputs

These files remain preserved in place as discovery inputs only. They are not approved source authority and must not receive `INK-SRC-###` or `INK-EVID-###` IDs as draft files.

| File | Status | Use Allowed | SHA-256 |
| --- | --- | --- | --- |
| `docs/research/ink/ink-deep-research-report.md` | Unmanaged external-citation research draft with polished claims | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `7260F51FD5094E8D438F826C13A5CBCAB2A26694C2DD906625B1A27A40B45DDF` |
| `docs/research/ink/ink-treader-research-packet.html` | Unmanaged presentation/export draft with polished claims and strategy framing | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `FEBE6FFD81E7187F940BB9299419D48139D4C2B95A2B020E46421BF6F83B9253` |
| `docs/research/ink/ink_altruism_rgwu_research_report.md` | Unmanaged longform research/report draft with rankings, lore framing, and external citations | Classification, structure, unsupported-claim inventory, and source-lead discovery only | `C6DF6D837DF95C7831F74ECCA5D78A42AB8ABA90C6B951F36F050A3CFBF02C51` |

## Future Source Needs

| Need | Reason | Suggested Owner |
| --- | --- | --- |
| Direct local official capture for Ink-Treader Nephilim | Later raw claims should verify exact card facts from stronger sources than support recaps or discovery drafts. | VM-259 or VM-261 |
| Direct local official capture for Kynaios and Tiro / Commander 2016 `Altruism` product context | Later docs and raw claims need stronger grounding than support rows alone. | VM-259 or VM-261 |
| Four-color naming authority and color-order reconciliation | VM-258 records the Ink/Altruism naming guardrail, but does not build a full naming dossier for `RGWU` versus support-source `WURG`. | VM-259 |
| Additional RGWU commander/product support beyond Kynaios and Tiro | The preserved drafts discuss Omnath, Aragorn, The Fourteenth Doctor, and Commander metagame patterns beyond the approved floor. | VM-259 or later source-capture card |
| Same-color and near-match separators | Bant, Jeskai, Naya, Temur, Dune, Witch, and generic group-hug shells can blur into Ink. | VM-260 |
| Unsupported-claim audit follow-through for the existing Ink drafts | Later cards need a concrete checklist for what cannot move downstream without new evidence. | VM-259 through VM-261 |
