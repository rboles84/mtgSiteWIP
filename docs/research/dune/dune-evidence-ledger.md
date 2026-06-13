# Dune Evidence Ledger

Status: VM-252 approved evidence ledger
Evidence rule: VM-252 evidence authorizes source-packet work only

## Evidence Rows

| ID | Claim | Evidence | Classification | Boundary |
| --- | --- | --- | --- | --- |
| `DUNE-EVID-001` | VM-252 is source-packet-only work; it authorizes no identity docs, raw packets, review gate, runtime promotion, generated artifacts, Home preview changes, route keys, aliases, or Yore/Glint/Ink/Witch files. | `DUNE-SCOPE-001`; VM-252 roadmap scope | Claim-bearing evidence and scope-bound | Stop before VM-253 or later work |
| `DUNE-EVID-002` | `DUNE` is the reserved public research key for the BRGW four-color lane; `BRGW`, `WBRG`, and all same-color permutations remain metadata/query-only. | `DUNE-SRC-001`; `DUNE-SCOPE-001` | Claim-bearing evidence and scope-bound | Do not add any public alias, route key, dossier key, expression key, preview key, or runtime key |
| `DUNE-EVID-010` | Four-color combinations should not be described as having settled universal official MTG names; `DUNE` is Vox Mana's public expression/research label for BRGW/non-Blue, while `Aggression` is the Commander 2016 theme alias for the same color quadruple. | `DUNE-SRC-001`; `DUNE-SRC-002` | Naming guardrail with support | Do not write that Dune or Aggression is the official, exclusive, or universally accepted MTG name for BRGW |
| `DUNE-EVID-003` | Four-color identities are framed by the one color they exclude, and Dune/BRGW is framed by the exclusion of Blue. | `DUNE-SRC-001`; `DUNE-SRC-002` | Claim-bearing evidence with support | Missing-color framing is safe; detailed psychology remains synthesis unless further sourced |
| `DUNE-EVID-004` | Dune-Brood Nephilim is the Nephilim/card anchor for Dune, but Nephilim should remain historical/card anchors rather than Vox Mana factions, institutions, doctrines, or civilizations. | `DUNE-SRC-001`; `DUNE-SRC-002` | Claim-bearing evidence with support | Do not treat Dune-Brood as proof of a social order, institution, or official Dune faction |
| `DUNE-EVID-005` | Saskia and `Open Hostility` may be used for Commander texture around multi-target combat pressure, aggressive tempo, and four-color-without-Blue playstyle language. | `DUNE-SRC-001`; `DUNE-SRC-003`; `DUNE-CMD-001`; `DUNE-SRC-004`; `DUNE-SRC-005` | Support-only reference | Not lore proof, not legality proof, not raw-claim authorization, and not runtime authorization |
| `DUNE-EVID-006` | `Open Hostility` commanders, partner commanders, and decklist texture may support go-wide, token, combat-pressure, and deck-shape language only. | `DUNE-SRC-003`; `DUNE-CMD-001`; `DUNE-SRC-004`; `DUNE-SRC-005` | Support-only reference | Do not promote partner or decklist texture into identity proof, metaphysical proof, or canon authority |
| `DUNE-EVID-007` | The current safe Dune/Aggression frame may discuss direct action, physical momentum, territorial pressure, and rejection of detached contemplation, but detailed metaphysical, strategic, or competitive claims must remain support-bound, synthesis-labeled, or manual-fill only. | `DUNE-SRC-001`; `DUNE-SRC-002` | Claim-bearing evidence with synthesis boundary | Do not present synthesis or competitive evaluation as direct canon |
| `DUNE-EVID-008` | The existing Dune HTML draft is preserved as a discovery input only and may be referenced only for classification, inventory, and unsupported-claim audit unless a future card independently re-sources a specific claim into an approved packet row. | `DUNE-SCOPE-001` | Scope-bound packet rule | Do not assign `DUNE-SRC-###` or `DUNE-EVID-###` IDs directly to the discovery draft |
| `DUNE-EVID-009` | Future Vox Mana synthesis may use battlefield-momentum, territorial-swarm, or force-first language only when traceable to source-bound or support-bound Dune rows and clearly labeled synthesis. | `DUNE-EVID-003`; `DUNE-EVID-004`; `DUNE-EVID-005`; `DUNE-EVID-006`; `DUNE-EVID-007` | Vox Mana synthesis | Do not present product-copy seed language as direct MTG canon |

## Manual Fill Flags

| ID | Topic | Reason | Required Action |
| --- | --- | --- | --- |
| `DUNE-MF-001` | Direct official Dune-Brood card facts | VM-252 relies on repo-local audit and support docs only, not a clean direct official local capture. | Verify before raw packet authoring |
| `DUNE-MF-002` | Direct official Saskia / Commander 2016 product grounding | Current grounding is support-only through local support rows and the repo-local precon data. | Add stronger local official/product capture or keep support-only |
| `DUNE-MF-003` | Rosewater `Aggression` commentary | The discovery draft references it indirectly, but VM-252 does not include a clean local official capture. | Capture or verify before public docs treat the theme label as stronger than support |
| `DUNE-MF-004` | Tana/Tymna beyond support texture | Current grounding is support-only through decklist and JSONL support rows. | Add stronger sourcing before architecture or raw claims use them as more than support texture |
| `DUNE-MF-005` | Ravos or other `Open Hostility` commanders beyond support texture | Current grounding is support-only decklist texture. | Keep support-only unless a future card independently sources them |
| `DUNE-MF-006` | EDHREC counts, percentages, and tags | The discovery draft includes live-stat style claims that are not captured in repo-truth evidence. | Re-source or remove before later cards use them |
| `DUNE-MF-007` | Game Knights or house-rule Commander claims | The discovery draft references media and house-rule usage that VM-252 does not verify locally. | Re-source or keep out of downstream evidence |
| `DUNE-MF-008` | `Sole dedicated BRGW legend` or equivalent exclusivity claims | The discovery draft includes exclusivity language that VM-252 does not verify locally. | Re-source or keep out of downstream evidence |
| `DUNE-MF-009` | Unsupported polished claims from `dune-brood-research-packet.html` | The draft contains comparative, evaluative, and strategy-heavy prose beyond the approved floor. | Audit claim-by-claim before later cards reuse any of it |
| `DUNE-MF-010` | Four-color naming authority and color-order reconciliation | VM-252 records the Dune/Aggression naming guardrail but does not create a full naming dossier. | Capture direct naming/context sources before polished public docs rely on the distinction |
| `DUNE-MF-011` | Adjacent identity separators | Jund, Naya, Mardu, Abzan, Glint, and generic go-wide/combat shells can blur into Dune. | Add separator guidance in VM-253 and VM-254 |

## Guardrails

- Do not cite the discovery draft as canon.
- Do not cite presentation/export HTML as canon.
- Do not make `DUNE` live in VM-252.
- Do not create `docs/architecture/colors/dune/`.
- Do not create `data/raw-factions/dune/`.
- Do not edit runtime or generated files.
- Do not modify Home preview membership.
- Do not promote `BRGW`, `WBRG`, or any permutation into a public key.
- Do not present `Dune` or `Aggression` as the official, exclusive, or universally accepted MTG name for BRGW.
