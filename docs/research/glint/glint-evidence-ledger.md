# Glint Evidence Ledger

Status: VM-276 source-enriched evidence ledger
Evidence rule: claim-bearing rows still govern raw claims; VM-276 adds support-only card-data validation without widening raw-claim authority

## Evidence Rows

| ID | Claim | Evidence | Classification | Boundary |
| --- | --- | --- | --- | --- |
| `GLINT-EVID-001` | VM-246 is source-packet-only work; it authorizes no identity docs, raw packets, review gate, runtime promotion, generated artifacts, Home preview changes, route keys, aliases, or Yore/Dune/Ink/Witch files. | `GLINT-SCOPE-001`; VM-246 roadmap scope | Claim-bearing evidence and scope-bound | Stop before VM-247 or later work |
| `GLINT-EVID-002` | `GLINT` is the reserved public research key for the UBRG four-color lane; `UBRG` and its permutations remain metadata/query-only. | `GLINT-SRC-001`; `GLINT-SCOPE-001` | Claim-bearing evidence and scope-bound | Do not add any public alias, route key, dossier key, or expression key |
| `GLINT-EVID-010` | Four-color combinations should not be described as having settled universal official MTG names; `GLINT` is Vox Mana's Nephilim-derived public expression/research label for UBRG/non-White, while `Chaos` is the Commander 2016 mechanical/theme alias for the same color quadruple. | `GLINT-SRC-001`; `GLINT-SRC-002` | Naming guardrail with support | Do not write that Glint or Chaos is the official, exclusive, or universally accepted MTG name for UBRG |
| `GLINT-EVID-003` | Four-color identities are framed by the one color they exclude, and Glint/UBRG is framed by the exclusion of White. | `GLINT-SRC-001`; `GLINT-SRC-002` | Claim-bearing evidence with support | Missing-color framing is safe; detailed psychology remains synthesis unless further sourced |
| `GLINT-EVID-004` | Glint-Eye Nephilim is the Nephilim/card anchor for Glint, but Nephilim should remain historical/card anchors rather than Vox Mana factions or institutions. | `GLINT-SRC-001`; `GLINT-SRC-002`; `GLINT-SRC-005` | Claim-bearing evidence with support | Do not treat Glint-Eye as proof of a social order, doctrine, or civilization |
| `GLINT-EVID-005` | The Yidris / `Entropic Uprising` support row may be used for Commander texture around cascade, volatility, and four-color-without-White playstyle language. | `GLINT-SRC-001`; `GLINT-SRC-004`; `GLINT-CMD-001` | Support-only reference | Not lore proof, not legality proof, not raw-claim authorization, and not runtime authorization |
| `GLINT-EVID-006` | The current safe Glint/Chaos frame may discuss rejection of White-style order, communal obligation, and imposed structure, but detailed metaphysical or psychological claims must remain support-bound or explicitly labeled Vox Mana synthesis. | `GLINT-SRC-001`; `GLINT-SRC-002`; `GLINT-SRC-003` | Claim-bearing evidence with synthesis boundary | Do not present synthesis as direct canon |
| `GLINT-EVID-007` | `Magic Four-Color Identity Dossier.md` and `cross-color-dynamics.md` may guide phrasing, contrast planning, and future authoring, but they do not by themselves authorize raw claims unless a future card resolves those claims back to approved source rows. | `GLINT-SRC-002`; `GLINT-SRC-003` | Source-role boundary | Prevent source laundering from synthesis docs into evidence authority |
| `GLINT-EVID-008` | The three existing Glint draft files are preserved discovery inputs only and may be referenced only for classification or inventory unless a future card independently re-sources a specific claim into an approved packet row. | `GLINT-SCOPE-001` | Scope-bound packet rule | Do not assign `GLINT-SRC-###` or `GLINT-EVID-###` IDs directly to unmanaged draft files |
| `GLINT-EVID-009` | Future Vox Mana synthesis may use appetite, entropy, cascade, maelstrom, or unbound-storm language only when traceable to source-bound or support-bound Glint rows and clearly labeled synthesis. | `GLINT-EVID-003`; `GLINT-EVID-004`; `GLINT-EVID-005`; `GLINT-EVID-006` | Vox Mana synthesis | Do not present product copy seed language as direct MTG canon |
| `GLINT-EVID-011` | Local card-data validation confirms `Glint-Eye Nephilim` as a UBRG `Creature — Nephilim`, 2/2, with a combat-damage card-draw trigger, a discard-for-+1/+1 activated ability, and the flavor text "When it awoke, it shook the plane with the thunder of its craving." | `GLINT-SRC-006` | Support-only card-data validation | Exact local card facts only; not raw-claim authority, not faction proof, and not institutional proof |
| `GLINT-EVID-012` | Local card-data validation confirms `Yidris, Maelstrom Wielder` as a UBRG `Legendary Creature — Ogre Wizard`, 5/4, with trample and a combat-damage trigger that grants cascade to spells cast from hand that turn. | `GLINT-SRC-006` | Support-only card-data validation | Exact local card facts only; does not turn Yidris into Glint lore proof, official naming proof, or raw-claim authority |

## Manual Fill Flags

| ID | Topic | Reason | Required Action |
| --- | --- | --- | --- |
| `GLINT-MF-001` | Direct Glint-Eye card facts | Exact local card-data validation now exists via `GLINT-EVID-011`, but the source remains support-only rather than raw-claim authority. | Use `GLINT-EVID-011` for bounded profile/docs copy; capture stronger direct official proof only if a later card wants claim-bearing promotion or quote-heavy public copy |
| `GLINT-MF-002` | Yidris product and lore context | Exact local Yidris card-data validation and the `Entropic Uprising` product row are now locally grounded, but lore/article grounding remains support-only. | Keep Yidris support-only unless a later card captures stronger direct official product or lore sources |
| `GLINT-MF-003` | Commander 2016 non-White `Chaos` theme articles | The repo currently references the relevant articles indirectly rather than as clean local official captures. | Capture or verify before polished public docs rely on them |
| `GLINT-MF-004` | Four-color naming authority | VM-246 records the naming guardrail but does not create a full naming dossier. | Capture direct naming/context sources before VM-247 uses the distinction in polished public docs |
| `GLINT-MF-005` | Missing-White philosophy detail | Official four-color framing supports the non-White floor, but long-form worldview and psychology remain synthesis-heavy. | Keep detailed psychology bounded unless stronger official framework language is captured |
| `GLINT-MF-006` | Adjacent identity separators | VM-248 adds architecture separator guidance, but raw/source-level separator authority is still shaping-only. | Keep separator language descriptive unless later evidence promotion adds stronger direct support |
| `GLINT-MF-007` | Commander legality and recommendation certainty | Card-data and Commander support rows do not yet establish exact recommendation or Commander-directory certainty. | Verify exact Commander link/legality or leave recommendation language support-only in later runtime cards |

## Guardrails

- Do not cite unmanaged draft files as canon.
- Do not cite presentation/export HTML as canon.
- Do not make `GLINT` live in VM-246.
- Do not create `docs/architecture/colors/glint/`.
- Do not create `data/raw-factions/glint/`.
- Do not edit runtime or generated files.
- Do not modify Home preview membership.
- Do not promote `UBRG` or any permutation into a public key.
- Do not present `Glint` or `Chaos` as the official, exclusive, or universally accepted MTG name for UBRG.
