# Yore Evidence Ledger

Status: VM-240 approved evidence ledger
Evidence rule: VM-240 evidence authorizes source packet work only

## Evidence Rows

| ID | Claim | Evidence | Classification | Boundary |
| --- | --- | --- | --- | --- |
| `YORE-EVID-001` | VM-240 is source-packet-only work; it authorizes no identity docs, raw packets, review gate, runtime promotion, generated artifacts, Home preview changes, route keys, aliases, or Glint/Dune/Ink/Witch files. | `YORE-SCOPE-001`; VM-240 roadmap scope | Scope-bound | Stop before VM-241 or later work |
| `YORE-EVID-002` | `YORE` is the reserved public research key for the WUBR four-color lane; `WUBR` and its permutations remain metadata/query-only. | `YORE-SRC-001`; `YORE-SCOPE-001` | Source-bound and scope-bound | Do not add any public alias, route key, dossier key, or expression key |
| `YORE-EVID-010` | Four-color combinations should not be described as having settled universal official MTG names; `YORE` is Vox Mana's Nephilim-derived public expression/research label for WUBR/non-Green, while `Artifice` is the Commander 2016 mechanical/theme alias for the same color quadruple. | `YORE-SRC-001`; `YORE-SRC-002`; `YORE-SRC-004` | Naming guardrail with discovery support | Do not write that Yore or Artifice is the official, exclusive, or universally accepted MTG name for WUBR |
| `YORE-EVID-003` | Four-color identities are framed by the one color they exclude, and Yore/WUBR is framed by the exclusion of Green. | `YORE-SRC-001`; `YORE-SRC-002` | Source-bound with support | Missing-color framing is philosophical synthesis, not a faction claim |
| `YORE-EVID-004` | The current Yore/Artifice frame centers civilization, technology, artifice, and progress over natural acceptance and organic limits. | `YORE-SRC-001`; `YORE-SRC-002` | Source-bound with support | Future copy must keep this as Vox Mana/source synthesis |
| `YORE-EVID-005` | Yore-Tiller Nephilim is the Nephilim/card anchor for Yore, but Nephilim should remain historical/card-identity anchors rather than Vox Mana factions or institutions. | `YORE-SRC-001`; `YORE-SRC-002`; `YORE-SRC-003` | Source-bound with guardrail | Do not treat Yore-Tiller as a civilization, doctrine, or placement institution |
| `YORE-EVID-006` | Yore's current mechanical support language may include artifact synergies, graveyard/reanimation texture, and control through artificial tools. | `YORE-SRC-001`; `YORE-SRC-002` | Support-bound | Mechanics are placement texture unless future raw claims audit card-level facts |
| `YORE-EVID-007` | The Breya/Invent Superiority Commander row supports artifact, sacrifice, combo, value, and four-color-without-Green Commander texture for Yore-like discovery language. | `YORE-CMD-001` | Commander support-only | Not lore proof, not legality proof, not runtime authorization |
| `YORE-EVID-008` | The WUBR local research and terminal files are preserved inputs for later Yore work, but they are discovery-only in VM-240. | `YORE-SRC-004`; `YORE-SRC-005`; `source-material/README.md`; `yore-seed-crosscheck.md` | Discovery-only | Audit claim-by-claim before using downstream |
| `YORE-EVID-009` | Future Vox Mana synthesis may frame Yore as active excavation of the past, systemic artifice, and refusal of natural limits, provided those phrases remain traceable to source-bound rows. | `YORE-EVID-003`; `YORE-EVID-004`; `YORE-EVID-005`; `YORE-EVID-006` | Vox Mana synthesis | Do not present synthesis as direct canon |

## Manual Fill Flags

| ID | Topic | Reason | Required Action |
| --- | --- | --- | --- |
| `YORE-MF-001` | Direct official Yore-Tiller card facts | VM-240 relies on local audit/dossier summaries, not a direct official card capture. | Verify in a future card before raw packet authoring |
| `YORE-MF-002` | Breya lore and Commander 2016 context | Commander JSONL is support-only; future docs need direct source grounding. | Add official/product source capture or mark support-only |
| `YORE-MF-003` | Cult of Yore and Nephilim narrative boundary | The relationship is easy to overstate and must not become faction proof. | Build a story-boundary ledger before architecture docs overuse it |
| `YORE-MF-004` | Exact color philosophy spine | Four-color has no dedicated article series like three-color factions. | Cross-check White/Blue/Black/Red/Green philosophy sources in VM-241 |
| `YORE-MF-005` | Commander legality and exact card data | JSONL/precon rows are support-only. | Use canonical card/deck data if future runtime copy requires exact facts |
| `YORE-MF-006` | Adjacent identity separators | Esper, Grixis, Jeskai, Mardu, Thran, Phyrexia, and generic artifact decks can blur into Yore. | Add separator guidance in VM-241/VM-242 |
| `YORE-MF-009` | Four-color naming authority | VM-240 clarifies naming policy but does not create a full external naming dossier. | Capture direct naming/context sources before VM-241 uses the distinction in polished public docs |

## Guardrails

- Do not cite seed files as canon.
- Do not cite generated or visual HTML as canon.
- Do not make `YORE` live in VM-240.
- Do not create `docs/architecture/colors/yore/`.
- Do not create `data/raw-factions/yore/`.
- Do not edit runtime or generated files.
- Do not modify Home preview membership.
- Do not promote `WUBR` or any permutation into a public key.
- Do not present `Yore` or `Artifice` as the official, exclusive, or universally accepted MTG name for WUBR.
