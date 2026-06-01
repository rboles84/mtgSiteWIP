# Jeskai Evidence Ledger

Status: VM-229 approved evidence ledger
Evidence rule: Use local official/repo-truth captures only for claim-bearing rows

## Evidence Rows

| ID | Claim | Evidence | Classification | Boundary |
| --- | --- | --- | --- | --- |
| JESKAI-EVID-001 | Jeskai is the Blue-centered White/Blue/Red wedge; `JESKAI` is the VM-229 research key while `URW`, `WUR`, `RWU`, `UWR`, `RUW`, and `WRU` stay metadata/query-only. | `JESKAI-SRC-001:7-19`; VM-229 scope | Source-bound | Do not promote aliases to runtime keys in VM-229 |
| JESKAI-EVID-002 | Blue supplies the center through perfection, knowledge, tools, discipline, and self-improvement; Red contributes freedom/action; White contributes peace/structure. | `JESKAI-SRC-001:16-19`, `JESKAI-SRC-001:137-247`, `JESKAI-SRC-009`, `JESKAI-SRC-010`, `JESKAI-SRC-011` | Source-bound with color support | Color philosophy support is not standalone Tarkir lore |
| JESKAI-EVID-003 | Jeskai's wedge attribute is cunning, expressed through knowledge, preparation, proactive measures, tricks, spell interaction, tempo, protection, and prowess. | `JESKAI-SRC-001:21-70` | Source-bound | Mechanics remain design-language evidence unless tied to local cards later |
| JESKAI-EVID-004 | Khans-era Jeskai monks and sages live in lake-top monasteries, study mystical arts, and revere dragon cunning. | `JESKAI-SRC-002:223` | Source-bound | Khans-era frame |
| JESKAI-EVID-005 | Khans-era Jeskai are martial artists, mystics, and wandering warriors seeking discovery and enlightenment through training, tradition, honor, and respect. | `JESKAI-SRC-002:315-319` | Source-bound | Do not merge with Ojutai monastic doctrine |
| JESKAI-EVID-006 | Khans-era Jeskai values include discipline, enlightenment, industriousness, and traditionalism. | `JESKAI-SRC-002:325-365` | Source-bound | Values are Khans-era unless another source bridges them |
| JESKAI-EVID-007 | Khans-era Jeskai uses fire-language in magical practice, including bloodfire, and the source also records broader fires and ghostfire material. | `JESKAI-SRC-002:335-341`, `JESKAI-SRC-002:431-520` | Source-bound with caution | Exact full doctrine across all six fires is `Manual fill required` |
| JESKAI-EVID-008 | Khans-era Jeskai maintains strongholds, minor holds, elders, schools, Annals, Rules of Reeds, and three major Ways: artisan, mystic, and wandering warrior. | `JESKAI-SRC-002:343-430` | Source-bound | Detailed internal lineages remain `Manual fill required` |
| JESKAI-EVID-009 | Narset is a Khans-era Jeskai leader in the local Khans guide, but later Narset/Ojutai material belongs to later timeline buckets unless explicitly bridged. | `JESKAI-SRC-002:431-520`, `JESKAI-SRC-005:321-329`, `JESKAI-SRC-006:231-251` | Source-bound boundary | Do not flatten Narset across eras |
| JESKAI-EVID-010 | Fate Reforged-era Jeskai are still a clan of martial artists and mystics, with Shu Yun as leader and Ojutai presented as a dragon ideal of cunning. | `JESKAI-SRC-003:217-251`, `JESKAI-SRC-003:305-311` | Source-bound | Fate Reforged/past frame, not Dragons-era Ojutai proof |
| JESKAI-EVID-011 | Shu Yun gathers clans, invokes Jeskai memory and Annals, protects records, chooses not to help kill Ugin, and later faces Ojutai. | `JESKAI-SRC-004:215-253`, `JESKAI-SRC-004:317-399`, `JESKAI-SRC-004:463-525` | Source-bound story event | Story event evidence, not full biography |
| JESKAI-EVID-012 | Ojutai's rise marks a discontinuity: the story records Ojutai killing Shu Yun and ordering the end/erasure of Jeskai identity. | `JESKAI-SRC-004:489-557` | Source-bound boundary | Direct bridge from Jeskai to Ojutai must be source-proven |
| JESKAI-EVID-013 | Dragons-era Ojutai is a dragonlord clan centered on Ojutai's orthodoxy, sanctuaries, monastic order, and a different political/religious structure. | `JESKAI-SRC-005:223-319` | Source-bound boundary | Ojutai is not treated as a simple continuation of Khans-era Jeskai |
| JESKAI-EVID-014 | Dragons-era Narset becomes an Ojutai master and discovers forbidden material about the past, khans, and Ugin. | `JESKAI-SRC-005:321-329` | Source-bound boundary | Use for Narset timeline separation, not Khans-era claim promotion |
| JESKAI-EVID-015 | Dragonstorm-era Tarkir re-establishes clans in a new/distinct form after dragonlord oppression and the Stormnexus event. | `JESKAI-SRC-006:231-251` | Source-bound boundary | Modern Jeskai is not automatically identical to Khans-era Jeskai |
| JESKAI-EVID-016 | Modern revived Jeskai is led by Way practitioners and emphasizes disciplined thought, shared reality, precision, compassion, martial training, and eastern mountain monasteries. | `JESKAI-SRC-006:427-485` | Source-bound | Dragonstorm-era only |
| JESKAI-EVID-017 | Modern Jeskai's Way is connected to Shu Yun writings found in a hidden archive, with principles of cooperative action, undivided thought, and aligned heart. | `JESKAI-SRC-006:485-503` | Source-bound with explicit bridge | This is a rare explicit source bridge from Shu Yun writings to modern Jeskai |
| JESKAI-EVID-018 | Modern Jeskai rejects Ojutai reincarnation doctrine and keeps distinct magic/body/mind/dragonstorm practices. | `JESKAI-SRC-006:507-557` | Source-bound boundary | Supports anti-Ojutai-collapse guard |
| JESKAI-EVID-019 | Commander JSONL contains multiple WUR/URW rows that can support discovery/search language for Jeskai-like play patterns. | `JESKAI-CMD-001` through `JESKAI-CMD-011` | support-only | Not lore proof, not legality proof |
| JESKAI-EVID-020 | The seed files were copied with SHA-256 equivalence and remain preserved inputs. | `JESKAI-SRC-015`, `JESKAI-SRC-016`, `JESKAI-SRC-017`; `jeskai-seed-crosscheck.md` | discovery-only | Not approved evidence unless audited claim-by-claim |
| JESKAI-EVID-021 | Vox Mana synthesis may frame Jeskai as disciplined Blue-centered cunning coordinating Red action and White structure. | `JESKAI-EVID-001`, `JESKAI-EVID-002`, `JESKAI-EVID-003` | Vox Mana synthesis | Do not present as a direct source quotation |
| JESKAI-EVID-022 | VM-229 does not authorize public/live promotion, raw JSON, architecture, generated outputs, Maze, Home, Supabase, route, fixture, schema, or runtime edits. | VM-229 plan and card | Scope-bound | Enforced by leakage scan |

## Manual Fill Flags

| ID | Topic | Reason | Required Action |
| --- | --- | --- | --- |
| JESKAI-MF-001 | Complete six fires doctrine | Source proves named fire concepts, but a full system-level doctrine needs line-level expansion. | Manual fill required |
| JESKAI-MF-002 | Complete three Ways hierarchy | Source proves artisan, mystic, and wandering warrior Ways; full organization detail needs deeper audit. | Manual fill required |
| JESKAI-MF-003 | Narset across all timelines | Sources span Khans, Dragons, and Dragonstorm eras; a full biography needs a dedicated timeline pass. | Manual fill required |
| JESKAI-MF-004 | Shu Yun full biography | Khanfall and Fate Reforged prove major events, but a complete character dossier needs a separate story audit. | Manual fill required |
| JESKAI-MF-005 | Jeskai mechanics beyond MaRo wedge design | MaRo supports prowess and spell-interaction language; card-level mechanics need separate local card/source audit. | Manual fill required |
| JESKAI-MF-006 | Ojutai continuity and discontinuity map | Sources prove discontinuity and some later bridges; exact continuity claims require a dedicated boundary ledger. | Manual fill required |
| JESKAI-MF-007 | Commander deck/card legality | JSONL rows are support-only; legality needs canonical card/deck data. | Manual fill required |
| JESKAI-MF-008 | UR pair article gap | Local Azorius and Boros articles exist; a local official Izzet-style pair article was not found in VM-229 source inspection. | Manual fill required |

## Guardrails

- Do not cite seed files as canon.
- Do not cite generated HTML as canon.
- Do not collapse Jeskai Way into Ojutai.
- Do not use Sultai, Temur, or Mardu packet precedent as Jeskai evidence.
- Do not promote `JESKAI`, `URW`, `WUR`, `RWU`, `UWR`, `RUW`, or `WRU` outside VM-229 research and bookkeeping.
