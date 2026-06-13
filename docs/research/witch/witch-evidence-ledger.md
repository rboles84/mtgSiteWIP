# Witch Evidence Ledger

Status: VM-264 approved evidence ledger
Evidence rule: VM-264 evidence authorizes source-packet work only

## Evidence Rows

| ID | Claim | Evidence | Classification | Boundary |
| --- | --- | --- | --- | --- |
| `WITCH-EVID-001` | VM-264 is source-packet-only work; it authorizes no identity docs, raw packets, review gate, runtime promotion, generated artifacts, Home preview changes, route keys, aliases, or Yore/Glint/Dune/Ink files. | `WITCH-SCOPE-001`; VM-264 roadmap scope | Claim-bearing evidence and scope-bound | Stop before VM-265 or later work |
| `WITCH-EVID-002` | `WITCH` is the reserved public research key for the `GWUB` four-color lane; `GWUB` is the canonical metadata/query code; `WUBG` may appear only when quoting Commander 2016 support-source order; and all same-color permutations remain metadata/query-only. | `WITCH-SRC-001`; `WITCH-SRC-002`; `WITCH-SCOPE-001` | Claim-bearing evidence and scope-bound | Do not add any public alias, route key, dossier key, expression key, preview key, or runtime key |
| `WITCH-EVID-010` | Four-color combinations should not be described as having settled universal official MTG names; `WITCH` is Vox Mana's public expression/research label for `GWUB` / non-Red, while `Growth` is the Commander 2016 support/display alias for the same color quadruple. | `WITCH-SRC-001`; `WITCH-SRC-002`; `WITCH-SRC-003` | Naming guardrail with claim-bearing and support context | Do not write that Witch or Growth is the official, exclusive, or universally accepted MTG name for `GWUB` |
| `WITCH-EVID-003` | Four-color identities are framed by the one color they exclude, and Witch / `GWUB` is framed by the exclusion of Red. | `WITCH-SRC-001`; `WITCH-SRC-002` | Claim-bearing evidence | Missing-color framing is safe; detailed psychology remains synthesis unless further sourced |
| `WITCH-EVID-004` | Witch-Maw Nephilim is the Nephilim/card anchor for Witch, but Nephilim should remain historical/card anchors rather than Vox Mana factions, institutions, doctrines, or civilizations. | `WITCH-SRC-001`; `WITCH-SRC-002` | Claim-bearing evidence | Do not treat Witch-Maw as proof of a social order, institution, or official Witch faction |
| `WITCH-EVID-005` | Atraxa, Praetors' Voice and `Breed Lethality` may be used for Commander texture around proliferate, counters, scaling growth, and patient board expansion. | `WITCH-SRC-001`; `WITCH-SRC-002`; `WITCH-SRC-003`; `WITCH-CMD-001`; `WITCH-SRC-004`; `WITCH-SRC-005` | Claim-bearing evidence with support | Not naming authority, not raw-claim authorization by itself, and not runtime authorization |
| `WITCH-EVID-006` | Commander decklist, JSONL, and precon support texture may support proliferate, counters, and Commander product framing only. | `WITCH-SRC-003`; `WITCH-CMD-001`; `WITCH-SRC-004`; `WITCH-SRC-005` | Support-only reference | Do not promote decklist or precon texture into faction proof, metaphysical proof, or canon authority |
| `WITCH-EVID-007` | The current safe Witch / Growth frame may discuss patient development, calculated expansion, systematic accumulation, proliferate/counter scaling, and the non-Red rejection of impulse, but detailed metaphysical, comparative, or format claims must remain evidence-bound, support-bound, synthesis-labeled, or manual-fill only. | `WITCH-SRC-001`; `WITCH-SRC-002` | Claim-bearing evidence with synthesis boundary | Do not present rankings, meta claims, or Commander culture claims as direct canon |
| `WITCH-EVID-008` | The three existing Witch drafts are preserved as discovery inputs only and may be referenced only for classification, inventory, and unsupported-claim audit unless a future card independently re-sources a specific claim into an approved packet row. | `WITCH-SCOPE-001` | Scope-bound packet rule | Do not assign `WITCH-SRC-###` or `WITCH-EVID-###` IDs directly to the discovery drafts |
| `WITCH-EVID-009` | Future Vox Mana synthesis may use patient gardens, calculated experiments, ritual cultivation, cold accumulation, or inevitable-growth language only when traceable to source-bound or support-bound Witch rows and clearly labeled synthesis. | `WITCH-EVID-003`; `WITCH-EVID-004`; `WITCH-EVID-005`; `WITCH-EVID-006`; `WITCH-EVID-007` | Vox Mana synthesis | Do not present discovery-draft language as direct MTG canon |
| `WITCH-EVID-011` | `docs/research/canon/misc/MTG_Lore_Research_Enhanced_Final.md` may inform future source capture and cross-plane lore texture, but it is not claim-bearing Witch authority in VM-264. | `WITCH-SRC-006`; `WITCH-SCOPE-001` | Shaping-only boundary | Do not cite the broad lore compendium as standalone proof for Witch claims in this packet |

## Manual Fill Flags

| ID | Topic | Reason | Required Action |
| --- | --- | --- | --- |
| `WITCH-MF-001` | Direct local official Witch-Maw card facts | VM-264 relies on the repo-local audit and dossier floor rather than a separate direct official local capture. | Verify before raw packet authoring if later cards need tighter card-proof language |
| `WITCH-MF-002` | Direct local official Atraxa / `Breed Lethality` / Commander 2016 product grounding | Current grounding is still support-heavy for product context, commander framing, and theme labeling. | Add stronger local official/product capture or keep support-only |
| `WITCH-MF-003` | Commander 2016 `Growth` commentary and naming context | VM-264 preserves Growth as support/display alias but does not build a full naming-authority dossier. | Capture or verify before public docs treat the theme label as stronger than support |
| `WITCH-MF-004` | Atraxa creation specifics, including Urabrask refusal framing | The discovery drafts treat this as settled lore explanation, but VM-264 does not independently source it into the approved packet. | Re-source or keep out of downstream evidence |
| `WITCH-MF-005` | Atraxa, Grand Unifier and later `GWUB` examples | The preserved drafts discuss them heavily, but VM-264 does not promote them into approved packet authority. | Re-source before later cards use them as more than discovery leads |
| `WITCH-MF-006` | EDHREC counts, rankings, popularity totals, and quadrant-dominance claims | The preserved drafts include live-stat style claims that are not captured in repo-truth evidence. | Re-source or remove before later cards use them |
| `WITCH-MF-007` | Power-level, format-best, or "most powerful commander" claims | The preserved drafts contain evaluative gameplay claims beyond the approved source floor. | Re-source or keep out |
| `WITCH-MF-008` | House-rule Commander legality or deck-count claims for Witch-Maw Nephilim | The preserved drafts rely on community-practice and live-stat claims not approved in VM-264. | Re-source or keep out |
| `WITCH-MF-009` | Tymna/Thrasios and cEDH optimization claims | The preserved drafts discuss partner shells, combo lines, and metagame standing beyond the approved floor. | Re-source or keep out |
| `WITCH-MF-010` | Phyrexia-only or dominant-ideology framing for Witch | The preserved drafts strongly collapse Witch into New Phyrexia and Atraxa's plane context. | Keep bounded support-only or add stronger separating evidence |
| `WITCH-MF-011` | Symbolic readings of Witch as ritual cultivation, alchemy, or controlled evolution | The name/mechanic resonance is plausible, but much of the polished language remains interpretive. | Keep synthesis-labeled or add stronger supporting capture |
| `WITCH-MF-012` | Same-color and near-match distinction notes | Bant, Esper, Sultai, Abzan, Ink, and generic proliferate/counters shells can blur into Witch. | Add separator guidance in VM-265 and VM-266 |
| `WITCH-MF-013` | Unsupported polished claims from the three unmanaged Witch drafts | The drafts contain comparative, evaluative, commander-diversity, lore-collapse, and strategy-heavy prose beyond the approved floor. | Audit claim-by-claim before later cards reuse any of it |

## Guardrails

- Do not cite the discovery drafts as canon.
- Do not cite presentation/export HTML as canon.
- Do not make `WITCH` live in VM-264.
- Do not create `docs/architecture/colors/witch/`.
- Do not create `data/raw-factions/witch/`.
- Do not edit runtime or generated files.
- Do not modify Home preview membership.
- Do not promote `GWUB`, `WUBG`, or any permutation into a public key.
- Do not present `Witch` or `Growth` as the official, exclusive, or universally accepted MTG name for `GWUB`.
- Do not collapse the entire Witch lane into Atraxa, New Phyrexia, or commander-popularity statistics.
