# VM-523 Esper Gate 1+2 Read-Only Semantic Audit

Agent name: Codex
Task requested: Perform the complete VM-523 Esper Gate 1+2 read-only source, claim, evidence, boundary, preview, consumed-surface, and remediation-contract audit. Do not modify Esper semantic or implementation data.

## Program And Starting State

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Ticket: VM-523.
- Identity: Esper / WUB.
- Internal key: `ESPER`.
- Invalid validator alias: `WUB`.
- Worktree: `C:\dev\mtgSiteWIP-crit001-vm523-esper`.
- Branch: `codex/vm-523-esper-semantic-recovery`.
- Starting HEAD: `bbf09932043970cfc4be5d665b93cdfed233a5d6`.
- Starting HEAD subject: `VM-523: record Esper pre-identity drift preflight`.
- Starting HEAD parent / exact program base: `a7ea41cbf57cc87f1948fdd254f0295816c5919d`.
- Program base remains: `a7ea41cbf57cc87f1948fdd254f0295816c5919d`.
- Preflight handoff: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`.
- Certified count at start: 21 of 37.
- Wave 4 at start: 1 of 10 certified.
- Starting repository status: Esper worktree clean at the requested branch/HEAD. Original main contained unrelated docs dirt; long-running CRIT contained the known Table Talk baseline; VM-522 worktrees were clean; DRIFT-017 prototype was not entered or modified.
- `git worktree list --porcelain` confirmed the dedicated Esper worktree at `bbf0993...` and the Bant certification worktree at `a7ea41c...`.

## Governing Authority Reviewed

- `AGENTS.md`.
- `docs/handoffs/HANDOFF_INDEX.md`.
- Recent handoffs for VM-516 through VM-523, with emphasis on VM-520 required-neighbor precedent, VM-521 consumer classification, and VM-522 shard/provenance/fixture/exact-review precedent.
- `docs/kanban/board.md`.
- `docs/kanban/in-progress/VM-523-esper-semantic-recovery.md`.
- `docs/incidents/CRIT-001-operating-playbook.md`.
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`.
- `docs/reference/semantic-readiness-contract.md`.
- `docs/incidents/templates/identity-semantic-recovery-template.md`.
- `docs/incidents/CRIT-001-drift-control-template.md`.
- `docs/incidents/CRIT-001-drift-register.md`.
- `research/validate-semantic-candidate-scope.mjs`.
- `research/semantic-candidate-scope-tests.js`.
- VM-523 preflight handoff and card.
- Esper source packet: `docs/research/esper/*`, the local captured Rosewater Esper article, canon inventory audit, Esper architecture docs, cross-color dynamics, Commander JSONL support, and current raw/generated Esper data.

No material authority conflict remains. Contract v1.1 controls evidence scope, semantic roles, provenance, fixture chains, generated consumers, and candidate-scope isolation.

## Exact Esper Scope

| Area | Locator |
| --- | --- |
| Raw claims | `data/raw-factions/esper/esper.claims.json` |
| Raw sources | `data/raw-factions/esper/esper.sources.json` |
| Raw profile | `data/raw-factions/esper/esper.profile.json` |
| Raw placement/collision | `data/raw-factions/esper/esper.placement.json` |
| Raw changelog | `data/raw-factions/esper/esper.changelog.json` |
| Generated faction | `data/factions.json#/factions/ESPER` |
| Generated placement | `data/placement-model.json#/factions/ESPER` |
| Preview owner | `data/identity-layers.json#/expressions/ESPER/preview_text` |
| Embedded preview | `data/factions.json#/identity_layers/expressions/ESPER/preview_text` |
| Generated provenance | `data/semantic-readiness-provenance.json#/entries[identity_key=ESPER]` |
| Recruiter context | `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/ESPER` |
| Expected fixture | `research/fixtures/semantic-readiness/esper.semantic-fixtures.json` |
| Candidate-scope target | `ESPER` only; `WUB` is invalid and must stay invalid |

## Raw Packet Inventory

All five raw Esper files are tracked and readable. Preflight hashes remain the frozen baseline:

| Path | Git blob | SHA-256 | Role |
| --- | --- | --- | --- |
| `data/raw-factions/esper/esper.changelog.json` | `90490d5be4904b8ee464d1e3dbfc83c76c5d77af` | `9c53468a9bd6d9e001611773fffa826fa7e53596186bdc9ae736457f6c7dd9db` | raw changelog/history support |
| `data/raw-factions/esper/esper.claims.json` | `4eb816324c3a3cb932459d998443c5c9840224be` | `e1f08163aea14aea9e7430ff2bd4e5713ce1b69ec559d28528e9ecf198567593` | current claims |
| `data/raw-factions/esper/esper.placement.json` | `db2304f0085729eea7afebf0f019d7d92fe09f4a` | `9188d6ee0c45f4c39a20de8dbbcadb3c9f4c568e8ba45557011f79bc248f7c3e` | placement/collision/native IDs |
| `data/raw-factions/esper/esper.profile.json` | `8bc4a227b6f31b4dd0270f2eabbdc60e26c08fd8` | `7c348b6c49e6c66c16c0b00138affd19cda78cd0689d5593a171bf3552938a14` | profile/site/identity surface |
| `data/raw-factions/esper/esper.sources.json` | `194c5df2c7a7d46b07cf711600b3502ab9da5b6f` | `5b2d7c4adcfdd33ce71c78ac82ae26039b107120e43df6bd1586952f354bf62b` | stored source inventory |

## Source Authority Inventory And Adjudication

| Source ID | Stored role | Authority class | Artifact / locator | Final intended role | Finding |
| --- | --- | --- | --- | --- | --- |
| `src_vm_esper_source_ledger_20260529` | shaping-only | Primary local source hierarchy | `docs/research/esper/esper-source-ledger.md` | support / source governance | Retain as hierarchy and limitation authority; not a semantic proof source. |
| `src_vm_esper_evidence_ledger_20260529` | claim-bearing | Primary local evidence ledger | `docs/research/esper/esper-evidence-ledger.md#Part A` | claim-bearing support for all retained claims | Retain; every claim needs bounded row locators and evidence scope. |
| `src_vm_esper_research_dossier_20260529` | shaping-only | Strong local synthesis with explicit limits | `docs/research/esper/esper-research-dossier.md` | shaping/support | Retain for synthesis and manual-fill boundary; not standalone canon. |
| `src_vm_esper_reliability_audit_20260529` | shaping-only | Primary local reliability audit | `docs/research/esper/esper-reliability-audit.md` | support / limitation | Retain for exclusion and manual-fill rules. |
| `src_vm_esper_manual_fill_20260529` | support-only | Source-gap ledger | `docs/research/esper/esper-manual-fill.md` | discovery/support only | Retain as explicit source-gap register; cannot support substantive claims. |
| `src_wotc_rosewater_esper_striving_for_perfection` | claim-bearing | Primary official Wizards design article capture | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | primary substantive authority | Retain as the main identity/design-philosophy source. |
| `src_vm_canon_inventory_three_color_audit_20260528` | shaping-only | Repo audit / discovery authority | `docs/analysis/canon-inventory-three-color-reference-audit.md` | support / source classification | Retain for corpus truth and source classification, not identity meaning. |
| `src_vm_esper_identity_md_20260529` | shaping-only | Vox Mana architecture synthesis | `docs/architecture/colors/esper/identity.md` | support-only for project wording | Retain as project modeling; not canon authority. |
| `src_vm_esper_metaphysics_md_20260529` | shaping-only | Vox Mana metaphysics synthesis | `docs/architecture/colors/esper/metaphysics.md` | support-only for project wording | Retain as project modeling; not canon authority. |
| `src_vm_esper_lore_source_packet_20260529` | support-only | Research aid | `docs/research/esper/esper-lore-source-packet.md` | discovery/support only | Retain only as repaired packet/limitation support. |
| `src_alara_shards_lore_dossier_protocol_rtf` | support-only | Alara support packet | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | discovery/support only | Retain for Alara shard/support terms; do not promote detailed lore without new evidence. |
| `src_vm_cross_color_dynamics_20260529` | support-only | Vox Mana separator architecture | `docs/architecture/system/cross-color-dynamics.md` | support-only neighbor wording | Retain for operator/separator wording only. |
| `src_vm_wub_commander_jsonl_20260529` | support-only | Commander/operator support | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | auxiliary support only | Retain for Commander/search support; never canon proof. |

Source-role summary: current stored roles are structurally accurate enough for audit, but Gate 3+4 must encode role use explicitly at claim/evidence/provenance/fixture level. No source locator is missing. Source gaps remain for detailed society, etherium, figures, geography, chronology, colored-artifact mechanics as canon, and exact card text.

## Current And Intended Claim Counts

| State | Total | Substantive | Support | Discovery | Unclassified |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current | 9 | 0 | 0 | 0 | 9 |
| Intended after Gate 3+4 | 9 | 7 | 2 | 0 | 0 |

## Claim Disposition Contract

| Claim | Current function | Adjudication | Intended role | Required final text / scope |
| --- | --- | --- | --- | --- |
| `esper_claim_0001` | Base identity: Esper is WUB shard in local official article | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain narrow identity only. Evidence: ledger row `ESPER-001`; Rosewater article intro naming white-blue-black shard. |
| `esper_claim_0002` | WUB color direction, Blue center/design lens | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain with explicit `WUB` metadata-only and `ESPER` runtime-key boundary. Evidence: `ESPER-002`; Rosewater Blue-centered article frame; canon inventory classification. |
| `esper_claim_0003` | Blue-centered philosophy: potential, knowledge, planning, applied information | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain as core identity engine. Evidence: `ESPER-003`; article sections on potential, desire/drive/details/deployment, knowledge, change, science/technology. |
| `esper_claim_0004` | Esper as Blue proof-of-concept world for order/perfection | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain only as official design commentary, not in-world narration. Evidence: `ESPER-004`; article paragraph naming Esper as pinnacle/order/perfection/weather/politics/biology. |
| `esper_claim_0005` | White ally role: social improvement, planning, technology for people, strategy | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain as White contribution. Evidence: `ESPER-005`; article White ally section. Does not authorize law/class/institution claims. |
| `esper_claim_0006` | Black ally role: control, information value, focus, vision, ethical risk | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain as Black contribution and failure-risk support. Evidence: `ESPER-006`; article Black ally section. Does not authorize figures/rulers/chronology. |
| `esper_claim_0007` | Missing Red/Green enemy pressures | RETAIN_WITH_SCOPE_CORRECTION | `substantive_claim` | Retain at design-philosophy level: no impulse, no natural acceptance/anti-change. Evidence: `ESPER-007`; article Red/Green sections; Alara RTF only support. |
| `esper_claim_0008` | Local canon inventory classifies source hierarchy | RECLASSIFY | `support_record` | Keep as source/provenance support, not an identity thesis. Evidence: `ESPER-008`; canon inventory rows for Rosewater and Alara protocol. |
| `esper_claim_0009` | Five Alara shard context | RECLASSIFY | `support_record` | Keep as setting/context support only. Evidence: `ESPER-009`; canon inventory and Alara protocol. Does not define other shards. |

Retained exactly: 0. Scope-corrected: 7. Reclassified: 2. Rewritten: 0 required for the current statements, but Gate 3+4 must add semantic role fields and evidence-location entries. Split: 0. Merged: 0. Removed: 0. Source gaps: detailed Alara lore and mechanics only; no source gap blocks the narrow intended Esper packet.

## Evidence-Locator And Evidence-Scope Contract

Every intended substantive claim must receive `evidence_locations` with exact source IDs equal to declared source IDs, plus bounded locators:

| Claim | Required locators | Evidence scope |
| --- | --- | --- |
| `esper_claim_0001` | `esper-evidence-ledger.md#ESPER-001`; Rosewater article intro naming Esper Week / white-blue-black shard | `identity_fact` |
| `esper_claim_0002` | `esper-evidence-ledger.md#ESPER-002`; Rosewater article Blue interview frame; canon inventory Rosewater row | `identity_metadata` |
| `esper_claim_0003` | `esper-evidence-ledger.md#ESPER-003`; Rosewater article sections on potential, desire/drive/details/deployment, knowledge, change, science/technology | `core_identity_philosophy` |
| `esper_claim_0004` | `esper-evidence-ledger.md#ESPER-004`; Rosewater article paragraph describing Esper as pinnacle/order/perfection/mastered weather/politics/biology | `design_commentary_only` |
| `esper_claim_0005` | `esper-evidence-ledger.md#ESPER-005`; Rosewater White ally section on social improvement, technology serving people, long-term planning, strategy | `color_contribution_white` |
| `esper_claim_0006` | `esper-evidence-ledger.md#ESPER-006`; Rosewater Black ally section on control, information value, focus, vision, scruples/personal gain | `color_contribution_black_and_risk` |
| `esper_claim_0007` | `esper-evidence-ledger.md#ESPER-007`; Rosewater Red and Green enemy-color sections; Alara RTF support only for missing color frame | `enemy_pressure_boundary` |
| `esper_claim_0008` | `esper-evidence-ledger.md#ESPER-008`; canon inventory Rosewater/Alara source classification rows | `source_classification_support` |
| `esper_claim_0009` | `esper-evidence-ledger.md#ESPER-009`; canon inventory shard rows; Alara RTF support | `setting_context_support` |

No intended claim may cite a document-level path alone. Architecture docs, Commander rows, Alara RTF, and presentation/draft artifacts may not become proof for core Esper identity.

## Evidence-Backed Esper Semantic Packet

- Canonical thesis: Esper is Blue-centered WUB perfectibility through designed control: knowledge makes potential changeable, White makes improvement coordinated, and Black makes information focused enough to control outcomes.
- Operational definition: Esper treats the world or system as unfinished but improvable; it studies the system, plans the change, coordinates the structure, and applies information as control.
- Desired outcome: a perfected or more exact form of the system, not mere victory, lawfulness, secrecy, debt, or artifact value.
- Method of improvement: desire/drive/details/deployment; knowledge before action; planning; applied information; technology as a change tool; structure and control as implementation pressure.
- Relationship to natural limitation: natural limitation is not final; it is something to understand and change. Green-style acceptance of given form is a negative boundary.
- Relationship to hierarchy and authority: hierarchy may be a support texture only. Current stored evidence supports ordered improvement and control, not detailed Esper government, class, Ethersworn, or magocracy claims.
- Relationship to knowledge: knowledge is the primary tool and currency of change.
- Relationship to ambition: ambition is present through Black focus/vision/control, but must remain bound to Blue improvement and White structure.
- Relationship to control: control is applied information and implementation force, not secrecy alone or lawful procedure alone.
- Relationship to artifice: artifacts/filigree may illustrate designed form and Commander/operator texture; they cannot define Esper until manual-fill sources are promoted.
- White contribution: social improvement, coordination, long-term planning, strategy, and technology serving people.
- Blue contribution: center/design lens; potential, knowledge, change, planning, details, deployment, and perfectibility.
- Black contribution: control, information value, focus, vision, instrumental pressure, and ethical risk.
- Why all three are necessary: Blue supplies the thesis, White supplies public/coordinating structure, Black supplies focus/control. Without one, Esper collapses into a neighbor.
- Failure modes: over-control; treating unoptimized life as error; generic technocracy; generic WUB control; aesthetics/mechanics replacing meaning; unsupported lore expansion.
- Falsification tests: if the text is only law/procedure, prefer Azorius; only hidden leverage, prefer Dimir; only debt/obligation, prefer Orzhov; only living communal honor, prefer Bant; only survival leverage/volatility, prefer Grixis; only artifact mechanics, do not select Esper.
- Forbidden generic definitions: order, knowledge, ambition, perfection, hierarchy, efficiency, systems, control, progress, civilization, immortality, artifice, death, discipline, superiority, optimization, generic technocracy, generic transhumanism, "perfect order", "cold efficiency", "knowledge plus ambition", or "best of WUB" by themselves.

## Required Neighbor Matrix

| Neighbor | Collapse risk | Esper discriminator | Neighbor discriminator | Fixture/collision obligation |
| --- | --- | --- | --- | --- |
| Azorius / `WU` | WU order, procedure, planning | WU pulled into Black-supported control and Blue perfectibility | civic/legal procedure and public process | Retain raw/generated collision; add negative Azorius fixture. |
| Dimir / `UB` | information control | UB organized by White structure and designed improvement | hidden leverage, secrecy, manipulation | Retain raw/generated collision; add negative Dimir fixture. |
| Orzhov / `WB` | hierarchy/control | WB guided by Blue planning and optimization | obligation, debt, religious/business hierarchy | Retain raw/generated collision; add negative Orzhov fixture. |
| White / `W` | order/social improvement | White is only the coordinating ally, not the center | peace/order/community without Blue/Black | Add mono-color boundary fixture. |
| Blue / `U` | potential/knowledge | Blue alone lacks White structure and Black focused control | becoming/knowledge without WUB implementation | Add mono-color boundary fixture. |
| Black / `B` | ambition/control | Black is constrained by Blue improvement and White structure | agency/power/cost without public design | Add mono-color boundary fixture. |
| Bant / `BANT` | ordered shard aspiration | replaces Green living acceptance with Black control | living communal order, honor, champions | Retain collision; add exact post-Bant precedent fixture. |
| Grixis / `GRIXIS` | UB control plus shard relation | rejects Red impulse through White ordered improvement | survival leverage, volatility, self-advocacy | Add missing raw/generated collision entry; lateral target already present. |
| Abzan / `ABZAN` | WB structure/family endurance | Blue-centered redesign over ancestry/endurance | family continuity, ancestor obligation, defensive patience | Add boundary fixture and collision/exclusion if schema precedent requires. |
| Jeskai / `JESKAI` | Blue-centered discipline | controlled design, not training/action/restraint | disciplined cunning, Red action, White accountability | Add boundary fixture. |
| Mardu / `MARDU` | WBR formation/ambition | planning/design before action | Red speed under war code | Add boundary fixture. |
| Sultai / `SULTAI` | UB ambition/resource use | White coordinated improvement instead of Green resource conversion | ruthless opportunity, necromancy/resource conversion | Add boundary fixture. |
| Naya / `NAYA` | Alara shard comparator | designed control vs natural awe/growth | Red-Green immediacy and natural growth | Add boundary/exclusion fixture from Esper side. |
| Temur / `TEMUR` | Blue plus Red/Green | planned alteration against instinctive force | ferocity, instinct, embodied knowledge | Add boundary/exclusion fixture. |
| Jund / `JUND` | Black plus Red/Green | information-led control, not predatory force | appetite, survival, natural force | Add boundary/exclusion fixture. |
| Five-color / `WUBRG` | totality/good-stuff | exact WUB thesis, not full-spectrum coalition | complete color access/synthesis | Add five-color negative fixture. |
| Generic good-stuff/control/balance/optimization/WUB | keyword overlap | requires evidence-backed Blue/White/Black interaction | color pile, control shell, or aesthetic shorthand | Add generic-language safeguards. |
| Generic technocracy/transhumanism | artifice/perfection shorthand | evidence-backed WUB design philosophy only | outside-source genre concept | Add forbidden-definition safeguards. |

All required boundaries can be specified from stored Esper evidence plus completed-neighbor generated summaries. No unresolved neighbor UNKNOWN remains for Gate 1+2. Gate 3+4 must encode these boundaries in raw collision guidance where schema precedent requires, generated lateral/exclusion surfaces, and fixtures.

## Generic-Language And Mechanical/Aesthetic Findings

- Current claims use safe but generic terms: potential, knowledge, planning, order, perfection, control, information, improvement. They are acceptable only with bounded evidence and WUB contribution tests.
- Current preview and generated/recruiter surfaces are directionally aligned but still rely on unclassified claims and no evidence locations.
- "Artifacts", "artifact-oriented value", "filigree", and Commander patterns appear in generated/profile surfaces as support texture. They must remain auxiliary and must not become the thesis.
- Home/Archscry/Recruiter wording must avoid public `WUB` as runtime key, unsupported detailed lore, and artifact/mechanics-first definitions.

## Canonical-ID And Provenance Contract

Current state: 26 Esper provenance entries, 12 null canonical IDs, 0 null `canonical_content_hash` values.

| Row / pointer | Current canonical ID | Required owner pattern |
| --- | --- | --- |
| `/behavioral_signals/0` | `signal_esper_0001` | retain |
| `/behavioral_signals/1` | `signal_esper_0002` | retain |
| `/behavioral_signals/2` | `signal_esper_0003` | retain |
| `/collision_guidance/0` | `collision_esper_azorius_live` | retain or schema-consistent final collision ID |
| `/collision_guidance/1` | `collision_esper_dimir_live` | retain or schema-consistent final collision ID |
| `/collision_guidance/2` | `collision_esper_orzhov_live` | retain or schema-consistent final collision ID |
| `/collision_guidance/3` | `collision_esper_bant_live` | retain or schema-consistent final collision ID |
| `/core_values/0` | `value_esper_0001` | retain |
| `/core_values/1` | `value_esper_0002` | retain |
| `/core_values/2` | `value_esper_0003` | retain |
| `/discriminator_questions/0` | `esper_discriminator_0001` | retain |
| `/discriminator_questions/1` | `esper_discriminator_0002` | retain |
| `/discriminator_questions/2` | `esper_discriminator_0003` | retain |
| `/moral_and_psychological_profile` | null | `esper_moral_and_psychological_profile_gate3` |
| `/core_identity` | null | `esper_core_identity_gate3` |
| `/great_tension` | null | `esper_great_tension_gate3` |
| `/historical_timeline/0` | `event_esper_0001` | retain |
| `/site_surface` | null | `esper_site_surface_gate3` |
| `/structure` | null | `esper_structure_gate3` |
| `/views_on_other_factions/0` | null | `rel_esper_azorius_gate3` |
| `/views_on_other_factions/1` | null | `rel_esper_dimir_gate3` |
| `/views_on_other_factions/2` | null | `rel_esper_orzhov_gate3` |
| `/views_on_other_factions/3` | null | `rel_esper_bant_gate3` |
| `/views_on_other_factions/4` | null | `rel_esper_grixis_gate3` |
| `/views_on_other_factions/5` | null | `rel_esper_jund_gate3` |
| `/views_on_other_factions/6` | null | `rel_esper_naya_gate3` |

Gate 3+4 must rebuild provenance deterministically after raw remediation, assign every null owner with schema-precedent stable IDs, preserve non-null hashes, include every changed generated consumer, and prove exact generated/fixture chain equality.

## Fixture And Proof-Chain Contract

Create `research/fixtures/semantic-readiness/esper.semantic-fixtures.json` with:

- identity key `ESPER`.
- full claim chain for `esper_claim_0001` through `esper_claim_0009`.
- roles: 7 substantive, 2 support.
- canonical IDs and evidence locations for every retained object.
- positive cases for Blue-centered perfectibility, White ordered improvement, Black focused control, and all-three necessity.
- negative cases for Azorius, Dimir, Orzhov, White, Blue, Black, Bant, Grixis, Abzan, Jeskai, Mardu, Sultai, Naya, Temur, Jund, WUBRG, generic good-stuff, generic control, generic optimization, generic WUB, generic technocracy, generic transhumanism, artifacts-only, and aesthetics-only.
- preview, embedded preview, Home, Archscry, recruiter, collision, native-ID, frozen-field, and candidate-scope assertions.
- exact provenance fixture entries whose ordered claim/source chains match generated provenance.

## Collision-Guidance Contract

- Current raw shape: array.
- Current raw order: `azorius_senate`, `house_dimir`, `orzhov_syndicate`, `bant`.
- Current generated order: `WU`, `UB`, `WB`, `BANT`.
- Current generated lateral targets: `WU`, `UB`, `WB`, `BANT`, `GRIXIS`.
- Required final collision entry set: `WU`, `UB`, `WB`, `BANT`, `GRIXIS`, `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`, `NAYA`, `TEMUR`, `JUND`, `W`, `U`, `B`, `WUBRG`, plus generic control/good-stuff/optimization/WUB overfit safeguards where repository schema supports non-identity entries.
- Required final ordering: schema/precedent order, not personal preference. Pair collisions first, then true lateral shard/wedge collisions, then monocolors and five-color/generic exclusions if precedent matches Bant/Red.
- True lateral targets: at minimum `WU`, `UB`, `WB`, `BANT`, `GRIXIS`; additional shard/wedge targets only if generated schema precedent uses lateral inhibition rather than fixture-only exclusions.

## Preview And Active Consumers

- Current preview owner and embedded preview are equal: `Esper treats potential as a design problem. Blue seeks perfectibility through knowledge and applied information, White gives the project ordered improvement, and Black turns information into focused control.`
- Semantic finding: aligned with the narrow thesis but incomplete for proof-chain readiness because claims are unclassified and evidence locators are missing.
- Required future wording: may retain this sentence if evidence-backed; must add fixture assertions and regenerated embedded/recruiter parity after claim/evidence remediation.
- Home active dependency: `assets/js/home.js` consumes `data/identity-layers.json` and `data/factions.json`.
- Archscry active dependency: `assets/js/index.js`, `assets/js/commander-dossier.js`, `assets/js/archscry-presentation.js`, and related tests consume generated Esper data.
- Recruiter active dependency: `supabase/functions/guild-recruiter/index.ts` imports `FACTION_CONTEXT`; Esper context currently mirrors generated wording and must be regenerated, not hand-edited.
- Tests/CI consumers: `assets/js/quick-reading-tests.js`, semantic-readiness scripts, candidate-scope scripts, source-generated guardrails, placement tests, package scripts.
- Exclusions retained: `outputs/mtgdata-v3-enhanced/*.inspect.ndjson` as debug inspection artifacts; `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` as historical archive.

## DRIFT Controls

| Control | Gate 1+2 result | Required Gate 3+4 action |
| --- | --- | --- |
| DRIFT-015 | PASS. Preview owner and embedded preview are known and equal; semantic wording is directionally aligned but unproven. | Keep or revise source preview from evidence-backed claims, regenerate embedded copy, prove equality and no stale copy. |
| DRIFT-016 | PASS. Raw/generated collision shapes are readable arrays and candidate-scope target recognition works for `ESPER`; `WUB` is invalid. | Preserve shape/native IDs/frozen fields, expand collision coverage, run exact candidate-scope. |
| DRIFT-017 | PASS. Active consumers and exclusions are classified by dependency evidence. | Propagate only generated truth to Home, Archscry, recruiter, tests; keep historical/debug/archive exclusions untouched. |

## Frozen-Field Snapshot

Frozen unless a later prompt explicitly authorizes and justifies a schema-precedent exception:

- Identity key: `ESPER`.
- Raw ID/native ID: `esper`.
- Display name: `Esper`.
- Color identity: `["W","U","B"]`.
- Placement summary: `Esper is a live-pilot placement profile for the ESPER shard expression. Its strongest signals are Blue-centered perfectibility, knowledge, planning, applied information, White ordered improvement, and Black focused control.`
- Placement confidence: absent/null top-level; existing raw discriminator/collision confidence values `Medium`.
- Required positive terms: `Esper`, `Alara`, `WUB`, `Blue-centered perfectibility`, `perfectibility`, `knowledge`, `planning`, `applied information`, `ordered improvement`, `coordination`, `focused control`, `instrumental information`, `designed control`, `optimization`.
- Required positive min hits: `3`.
- Broad match penalty: `0.18`.
- Strengthen/suppress lists: frozen to current raw placement unless semantic remediation changes wording without changing calibration meaning.
- Native discriminator IDs: `esper_discriminator_0001`, `esper_discriminator_0002`, `esper_discriminator_0003`.
- Existing raw collision IDs and order are frozen until Gate 3+4 explicitly expands from this contract.
- No Hall, Crucible, global scoring, scheduling, package, shared validator, shared generator, schema, or CI change is authorized by this audit.

## Gate 3+4 Remediation Contract

| ID | Stage | Artifact | Current defect | Required final state | Validation |
| --- | --- | --- | --- | --- | --- |
| ESPER-G34-001 | Gate 3 | `esper.claims.json` | 9 claims unclassified | assign semantic roles: 7 substantive, 2 support | semantic readiness validator |
| ESPER-G34-002 | Gate 3 | `esper.claims.json` | no bounded evidence locations | add locators/scopes from this audit | evidence-locator checks |
| ESPER-G34-003 | Gate 3 | `esper.claims.json` | claim 8/9 could be misused as semantic proof | reclassify to support records | role-invalid support checks |
| ESPER-G34-004 | Gate 3 | source usage | architecture/Commander/support sources risk proof promotion | encode support-only/discovery-only use | proof-chain inspection |
| ESPER-G34-005 | Gate 3 | `esper.profile.json` | aggregate/null provenance owners | assign stable canonical IDs | provenance null-ID scan |
| ESPER-G34-006 | Gate 3 | `esper.profile.json` | neighbor views only cover seven entries and lack required matrix | expand or fixture-encode all required neighbors per schema precedent | neighbor fixture/collision tests |
| ESPER-G34-007 | Gate 3 | `esper.placement.json` | only WU/UB/WB/Bant raw collisions | add required Grixis and broader required-neighbor/exclusion guidance | collision inspection |
| ESPER-G34-008 | Gate 3 | `esper.placement.json` | generic/mechanics/aesthetic overfit only partly guarded | add forbidden-definition and artifact-only safeguards | fixture negative tests |
| ESPER-G34-009 | Gate 3 | preview source | equal but unproven text | retain or revise exact evidence-backed preview | DRIFT-015 equality |
| ESPER-G34-010 | Gate 4 | generated faction/placement/identity layers | generated proof chains point to unclassified claims | regenerate from remediated raw sources | candidate-scope validation |
| ESPER-G34-011 | Gate 4 | recruiter context | canonical recruiter guidance lacks evidence mapping | regenerate recruiter context and provenance | readiness validator |
| ESPER-G34-012 | Gate 4 | `semantic-readiness-provenance.json` | stale; 12 null IDs | rebuild deterministic provenance with 0 null IDs/hashes | `build-semantic-readiness-provenance.mjs --check` |
| ESPER-G34-013 | Gate 4 | fixture | missing | create complete Esper semantic fixture | `validate-semantic-readiness.mjs --fixtures --targets=ESPER` |
| ESPER-G34-014 | Gate 4 | active consumers | Home/Archscry/tests consume generated text | prove source-to-generated-to-consumer propagation; no hand edits to generated consumers outside generator contract | tests and diff review |
| ESPER-G34-015 | Gate 4 | frozen fields | possible candidate-scope drift | compare all frozen values to this audit | candidate-scope validator |
| ESPER-G34-016 | Gate 4 | DRIFT-017 | copied inactive strings risk over-review | retain historical/debug exclusions unless direct dependency changes | active-consumer scan |
| ESPER-G34-017 | Gate 4 | diagnostics | current failures expected | convert all failures to pass or exact documented candidate-scope exception | command suite |
| ESPER-G34-018 | Gate 4 | governance | no candidate yet | record remediation handoff only after implementation; no certification | git/governance review |

Gate 3+4 must not need to reinterpret this audit. If implementation finds a source gap beyond the manual-fill gaps listed here, it must stop rather than invent support.

## Gate 5 And Review Obligations

- Candidate creation may occur only after Gate 3+4 remediation and validation pass.
- Exact candidate SHA must be immutable and separately recorded.
- Run exact candidate-scope with `--identity=ESPER --base=a7ea41cbf57cc87f1948fdd254f0295816c5919d --target=<candidate-sha>`.
- `WUB` must remain invalid as an identity target.
- Independent review must rerun source authority, role counts, evidence locators/scopes, provenance/fixture equality, frozen fields, preview/consumer alignment, generic and required-neighbor boundaries, and candidate-scope validation.
- Certification must reference only an exact approved candidate SHA and must not advance program base until that separate certification window.

## Diagnostics

| Command | Exit | Finding | Classification |
| --- | ---: | --- | --- |
| `node research/audit-semantic-readiness.mjs --targets=ESPER` | 0 | 9 claims, all unclassified; 13 sources; 26 reference sites; low-volume/support-heavy pattern | PASS audit inventory |
| `node research/validate-semantic-readiness.mjs --targets=ESPER` | 1 | semantic roles missing; canonical recruiter guidance lacks evidence mapping; authoritative references have no substantive claim; fixture missing | expected pre-remediation; Gate 3+4 obligation |
| `node research/validate-semantic-readiness.mjs --fixtures --targets=ESPER` | 1 | same role/evidence/recruiter findings plus missing fixture | expected pre-remediation; Gate 3+4 obligation |
| `node research/semantic-candidate-scope-tests.js` | 0 | validator tests passed | PASS |
| `node research/validate-semantic-candidate-scope.mjs --identity=ESPER --base=a7ea41c... --target=bbf0993...` | 1 | generated/provenance proof-chain contamination from unclassified Esper claims | expected pre-remediation; Gate 5 obligation after remediation |
| `node research/validate-semantic-candidate-scope.mjs --identity=WUB --base=a7ea41c... --target=bbf0993...` | 1 | `Unknown identity WUB` | PASS invalid-alias guard |
| `node research/build-semantic-readiness-provenance.mjs --check` | 1 | stale provenance; requires rebuild | expected pre-remediation; Gate 3+4 obligation |
| `node research/validate-source-generated-guardrails.mjs --targets=ESPER` | 0 | PASS with one model-owned inhibitor warning | PASS / non-blocking |
| JSON parse of raw/generated/provenance files | 0 | parse PASS | PASS |
| protected worktree status checks | 0 | original-main dirt and Table Talk baseline preserved; VM-522 worktrees clean | PASS |

## Completion Matrix

| Control | Result | Evidence | Next stage |
| --- | --- | --- | --- |
| Correct branch/HEAD/base | PASS | worktree/status/log checks | none |
| One identity active | PASS | board and worktree list | none |
| Source hierarchy explicit | PASS | 13-source table | Gate 3+4 encode use |
| Claim dispositions complete | PASS | all 9 adjudicated | Gate 3 |
| Intended roles complete | PASS | 7 substantive, 2 support | Gate 3 |
| Evidence scopes complete | PASS | locator/scope table | Gate 3 |
| Source gaps explicit | PASS | manual-fill gaps listed | future source card, not Gate 3+4 blocker |
| Esper thesis falsifiable | PASS | semantic packet | Gate 3 fixtures |
| W/U/B contributions separated | PASS | contribution tests | Gate 3 fixtures |
| Required neighbors covered | PASS | matrix | Gate 3+4 fixtures/collisions |
| Generic/mechanical/aesthetic risks covered | PASS | forbidden definitions and safeguards | Gate 3+4 |
| Canonical-ID contract complete | PASS | 26-row provenance table | Gate 4 |
| Fixture contract complete | PASS | fixture requirements | Gate 4 |
| Preview/consumer contract complete | PASS | DRIFT-015/017 audit | Gate 4 |
| Collision contract complete | PASS | collision section | Gate 3+4 |
| Frozen fields recorded | PASS | frozen snapshot | Gate 5 compare |
| Diagnostics recorded | PASS | command table | Gate 3+4/Gate 5 |
| No semantic data changed | PASS | status/diff before commit | none |
| Shared infrastructure requirement hidden | PASS | no shared change required | none |
| Excel untouched | PASS | no Excel access | none |
| VM-524 untouched | PASS | no VM-524 work | none |
| Protected worktrees preserved | PASS | status checks/preflight baseline | none |
| Historical/debug exclusions retained | PASS | direct classification retained | none |
| Gate 3+4 authorization decision | PASS | every defect has exact owner | later separate window only |

Scorecard totals: Total 24; PASS 24; FAIL 0; UNKNOWN 0; N/A 0.

## Files Reviewed

Reviewed all files listed in governing authority plus the Esper raw packet, generated Esper surfaces, provenance rows, preview owner/embedded copy, recruiter context, active-consumer/test references, and protected worktree status.

## Files Changed

- Added `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`.
- Updated `docs/handoffs/HANDOFF_INDEX.md`.
- Updated `docs/kanban/board.md`.
- Updated `docs/kanban/in-progress/VM-523-esper-semantic-recovery.md`.

## Not Touched

No Esper raw source, claim, evidence, profile, placement, provenance, fixture, generated, preview, recruiter, runtime, test, validator, generator, schema, package, CI, scoring, collision, native-ID, Hall, Crucible, or candidate-scope implementation data changed. No Gate 3+4 remediation occurred. No Gate 5 candidate was created. No workflow record, independent review, certification, program-base advancement, VM-524 work, Excel tracker edit, original-main edit, VM-522 history edit, DRIFT-017 prototype edit, VM-542/DRIFT-019 residual edit, historical/debug/archive edit, or Table Talk edit occurred.

## Decision

Gate 1+2 is complete. Gate 3+4 remediation is authorized for a later separate window only. Candidate creation is not authorized.

PASS — ESPER GATE 3+4 REMEDIATION AUTHORIZED
