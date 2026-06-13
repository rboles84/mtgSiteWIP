# Ink Evidence Ledger

Status: VM-258 approved evidence ledger
Evidence rule: VM-258 evidence authorizes source-packet work only

## Evidence Rows

| ID | Claim | Evidence | Classification | Boundary |
| --- | --- | --- | --- | --- |
| `INK-EVID-001` | VM-258 is source-packet-only work; it authorizes no identity docs, raw packets, review gate, runtime promotion, generated artifacts, Home preview changes, route keys, aliases, or Yore/Glint/Dune/Witch files. | `INK-SCOPE-001`; VM-258 roadmap scope | Claim-bearing evidence and scope-bound | Stop before VM-259 or later work |
| `INK-EVID-002` | `INK` is the reserved public research key for the RGWU four-color lane; `RGWU`, `WURG`, and all same-color permutations remain metadata/query-only. | `INK-SRC-001`; `INK-SCOPE-001` | Claim-bearing evidence and scope-bound | Do not add any public alias, route key, dossier key, expression key, preview key, or runtime key |
| `INK-EVID-010` | Four-color combinations should not be described as having settled universal official MTG names; `INK` is Vox Mana's public expression/research label for RGWU/non-Black, while `Altruism` is the Commander 2016 theme alias for the same color quadruple. | `INK-SRC-001`; `INK-SRC-002` | Naming guardrail with support | Do not write that Ink or Altruism is the official, exclusive, or universally accepted MTG name for RGWU |
| `INK-EVID-003` | Four-color identities are framed by the one color they exclude, and Ink/RGWU is framed by the exclusion of Black. | `INK-SRC-001`; `INK-SRC-002` | Claim-bearing evidence with support | Missing-color framing is safe; detailed psychology remains synthesis unless further sourced |
| `INK-EVID-004` | Ink-Treader Nephilim is the Nephilim/card anchor for Ink, but Nephilim should remain historical/card anchors rather than Vox Mana factions, institutions, doctrines, or civilizations. | `INK-SRC-001`; `INK-SRC-002` | Claim-bearing evidence with support | Do not treat Ink-Treader as proof of a social order, institution, or official Ink faction |
| `INK-EVID-005` | Kynaios and Tiro and `Stalwart Unity` may be used for Commander texture around group benefit, shared resources, public prosperity, and political reciprocity. | `INK-SRC-001`; `INK-SRC-003`; `INK-CMD-001`; `INK-SRC-004`; `INK-SRC-005` | Support-only reference | Not lore proof, not naming authority, not raw-claim authorization, and not runtime authorization |
| `INK-EVID-006` | Commander decklist, JSONL, and precon support texture may support group-hug, shared-resource, and table-politics language only. | `INK-SRC-003`; `INK-CMD-001`; `INK-SRC-004`; `INK-SRC-005` | Support-only reference | Do not promote decklist or precon texture into identity proof, metaphysical proof, or canon authority |
| `INK-EVID-007` | The current safe Ink/Altruism frame may discuss shared prosperity, community benefit, protected generosity, and open knowledge, but detailed metaphysical, strategic, or comparative claims must remain support-bound, synthesis-labeled, or manual-fill only. | `INK-SRC-001`; `INK-SRC-002` | Claim-bearing evidence with synthesis boundary | Do not present synthesis or Commander-metagame evaluation as direct canon |
| `INK-EVID-008` | The three existing Ink drafts are preserved as discovery inputs only and may be referenced only for classification, inventory, and unsupported-claim audit unless a future card independently re-sources a specific claim into an approved packet row. | `INK-SCOPE-001` | Scope-bound packet rule | Do not assign `INK-SRC-###` or `INK-EVID-###` IDs directly to the discovery drafts |
| `INK-EVID-009` | Future Vox Mana synthesis may use open-archive, shared-abundance, public-memory, or protected-generosity language only when traceable to source-bound or support-bound Ink rows and clearly labeled synthesis. | `INK-EVID-003`; `INK-EVID-004`; `INK-EVID-005`; `INK-EVID-006`; `INK-EVID-007` | Vox Mana synthesis | Do not present discovery-draft language as direct MTG canon |

## Manual Fill Flags

| ID | Topic | Reason | Required Action |
| --- | --- | --- | --- |
| `INK-MF-001` | Direct official Ink-Treader card facts | VM-258 relies on repo-local audit and support docs only, not a clean direct official local capture. | Verify before raw packet authoring |
| `INK-MF-002` | Direct official Kynaios and Tiro / Commander 2016 product grounding | Current grounding is support-only through local support rows and repo-local precon data. | Add stronger local official/product capture or keep support-only |
| `INK-MF-003` | Commander 2016 `Altruism` commentary | The support floor points to the idea, but VM-258 does not include a clean local official article capture. | Capture or verify before public docs treat the theme label as stronger than support |
| `INK-MF-004` | Omnath, Aragorn, The Fourteenth Doctor, and other later RGWU examples | The discovery drafts discuss them heavily, but VM-258 does not promote them into approved packet authority. | Re-source before later cards use them as more than discovery leads |
| `INK-MF-005` | EDHREC counts, rankings, volume claims, and archetype totals | The discovery drafts include live-stat style claims that are not captured in repo-truth evidence. | Re-source or remove before later cards use them |
| `INK-MF-006` | Power-level, format-ban, or house-rule Commander claims | The discovery drafts reference competitive tiers, bans, and house-rule legality beyond the approved source floor. | Re-source or keep out of downstream evidence |
| `INK-MF-007` | Symbolic readings of `Ink` as public archive, shared memory, or civic script | The name/mechanic resonance is plausible but remains interpretive without direct official support. | Keep synthesis-labeled or add stronger supporting capture |
| `INK-MF-008` | Unsupported polished claims from the three unmanaged Ink drafts | The drafts contain comparative, evaluative, commander-diversity, and strategy-heavy prose beyond the approved floor. | Audit claim-by-claim before later cards reuse any of it |
| `INK-MF-009` | Four-color naming authority and color-order reconciliation | VM-258 records the Ink/Altruism naming guardrail but does not create a full naming dossier. | Capture direct naming/context sources before polished public docs rely on the distinction |
| `INK-MF-010` | Adjacent identity separators | Bant, Jeskai, Naya, Temur, Dune, Witch, and generic group-hug shells can blur into Ink. | Add separator guidance in VM-259 and VM-260 |

## Guardrails

- Do not cite the discovery drafts as canon.
- Do not cite presentation/export HTML as canon.
- Do not make `INK` live in VM-258.
- Do not create `docs/architecture/colors/ink/`.
- Do not create `data/raw-factions/ink/`.
- Do not edit runtime or generated files.
- Do not modify Home preview membership.
- Do not promote `RGWU`, `WURG`, or any permutation into a public key.
- Do not present `Ink` or `Altruism` as the official, exclusive, or universally accepted MTG name for RGWU.
