# VM-525 Jund Pre-Identity Drift Preflight

Agent name: Codex
Task requested: Perform the mandatory VM-525 Jund pre-identity drift preflight only, create the dedicated exact-base Jund worktree if setup was safe, inventory current Jund state read-only, and decide whether a later separate Gate 1+2 read-only semantic audit may begin.

## Program And Setup

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Ticket: VM-525.
- Identity: Jund / BRG.
- Exact internal key: `JUND`.
- Candidate-scope target: `JUND`.
- Invalid alias checked: `BRG` exits 1 as `Unknown identity BRG`.
- Current certified count: 23 of 37.
- Wave 4 status: 3 of 10 certified.
- Exact program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`.
- Program-base subject: `VM-524: certify Grixis semantic recovery`.
- Prior certified identity: VM-524 Grixis / UBR.
- Exact approved Grixis semantic candidate: `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Grixis candidate workflow: `d72c1cac9b94e4e4a2c6dbeb7137b1dcc8d6595d`.
- Grixis independent approval review: `2029610126f6742241db96ff148eaf1e67ee1dc2`.
- Jund branch created: `codex/vm-525-jund-semantic-recovery`.
- Jund worktree created: `C:\dev\mtgSiteWIP-crit001-vm525-jund`.
- Jund worktree HEAD after creation: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`.
- Jund worktree status after creation: clean before governance edits.
- Excel tracker `CRIT-001_37-Identity_Semantic_Recovery_Tracker_after_Grixis_Certification_Wave4_3of10.xlsx` was not opened or modified.

## Setup Inspection

- `git worktree list --porcelain` before setup showed no existing VM-525/Jund worktree and no branch checked out for VM-525.
- Local branch `codex/vm-525-jund-semantic-recovery`: absent before creation.
- Remote branch `origin/codex/vm-525-jund-semantic-recovery`: absent by read-only `git ls-remote --heads origin codex/vm-525-jund-semantic-recovery`.
- Preferred path `C:\dev\mtgSiteWIP-crit001-vm525-jund`: absent before creation.
- Existing VM-525 repository state: backlog card and ledger setup-only entry; no preflight, Gate 1+2, remediation, candidate, workflow, review, or certification record.
- Branch/worktree creation command: `git worktree add -b codex/vm-525-jund-semantic-recovery C:\dev\mtgSiteWIP-crit001-vm525-jund 16528f3a24a7f3d7f4475bdde56fbfee09becd98`.
- Original main `C:\dev\mtgSiteWIP`: inspected read-only; unrelated docs/kanban/audit/strategy dirt remains and was not touched.
- Long-running CRIT worktree `C:\dev\mtgSiteWIP-crit001`: known Table Talk baseline present and preserved: modified `docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs.
- VM-521/Bant campaign worktree `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`: clean and untouched.
- VM-522 original-review worktree `C:\dev\mtgSiteWIP-crit001-vm522-independent-review`: clean and untouched.
- VM-522 replacement-review/certification worktree `C:\dev\mtgSiteWIP-crit001-vm522-replacement-review`: clean and untouched.
- VM-523 campaign worktree `C:\dev\mtgSiteWIP-crit001-vm523-esper`: clean and untouched.
- VM-523 independent-review/certification worktree `C:\dev\mtgSiteWIP-crit001-vm523-independent-review`: clean and untouched.
- VM-524 campaign worktree `C:\dev\mtgSiteWIP-crit001-vm524-grixis`: clean and untouched.
- VM-524 independent-review/certification worktree `C:\dev\mtgSiteWIP-crit001-vm524-independent-review`: clean at the expected certified HEAD and untouched.
- DRIFT-017 prototype worktree `C:\dev\mtgSiteWIP-crit001-drift017`: preserved modified prototype files remained untouched.
- DRIFT-017 certified-audit worktree `C:\dev\mtgSiteWIP-crit001-drift017-certified-audit`: clean and untouched.
- No setup hard stop was found. The playbook's older long-running-worktree wording is reconciled by the current identity-specific prompt and VM-523/VM-524 dedicated-worktree precedents.

## Governing Authority Reviewed

Reviewed root `AGENTS.md`; no scoped `AGENTS.md` exists; `docs/kanban/board.md`; `docs/kanban/backlog/VM-525-jund-semantic-recovery.md`; `docs/handoffs/HANDOFF_INDEX.md`; CRIT-001 operating playbook; Contract v1.1 amendment; semantic-readiness contract; identity-recovery template; pre-identity drift-control template and drift register; DRIFT-015, DRIFT-016, DRIFT-017, DRIFT-018, and DRIFT-019 records; approved candidate-scope validator and tests; VM-516 through VM-524 drift, Gate, candidate, review, certification, and stage-ownership precedents; and Jund historical records VM-176 through VM-192 plus related Alara/shard source records found by repository search.

No unresolved material governance conflict blocks Gate 1+2. The governing non-circular rule is that preflight proves safe inspectability and inventory scope; Gate 1+2 later adjudicates semantics and remediation boundaries.

## Pre-Flight Summary

Recent related work: Grixis / UBR was certified at exact program base `16528f3a24a7f3d7f4475bdde56fbfee09becd98`. VM-524 established the nearest Black/Red-adjacent shard PASS preflight precedent. VM-523 established the closest shard setup model. VM-522 established non-circular stage ownership after preserved STOP records. VM-521/VM-542/DRIFT-019 established that copied strings alone do not prove active consumers.

Current known risks: Jund has 10 unclassified claims, zero claim-level Contract v1.1 evidence locations/scopes, 22 provenance entries with 8 null canonical IDs, no semantic fixture, stale provenance check output, candidate-scope proof-chain contamination from unclassified claims, raw/generated collision differences, generated omission of the raw Naya draft separator, and one missing support-only local Scryfall artifact path. These are inventoried and stage-owned; they were not remediated.

Relevant decisions already made: `JUND` is the live expression key. `BRG` is color-direction metadata only and not a generated key, route key, runtime alias, fixture key, lookup key, or validator alias. VM-176 through VM-192 constrain Jund to a source-bounded Red-centered shard model with Black appetite and Green instinct while rejecting generic BRG, generic anger, generic savage nature, devour alone, Modern Jund midrange, comparator factions, and manual-fill lore as proof.

Files recently changed by prior Jund work but not touched here: raw Jund packet files, `data/identity-layers.json`, generated factions/placement/recruiter surfaces, presentation/Commander dossier tests, and `data/factions.json#/factions/JUND/raw_enrichment` from VM-186 through VM-192.

## Exact Jund Target

- Human name: Jund.
- Color identity: Black, Red, Green.
- Color code: BRG.
- Internal key: `JUND`.
- Raw ID: `jund`.
- Display/search key present in `data/identity-layers.json`: `JUND`.
- Invalid live/candidate-scope alias: `BRG`; current validator rejects it as unknown.
- Ledger entry before this record: `state: not_started_after_grixis_certification`, `drift_preflight_started: false`, `drift_preflight_completed: false`.
- Candidate-scope target isolation: PASS. `JUND` reaches deliberate unremediated proof-chain diagnostics; `BRG` fails as an invalid identity rather than aliasing into the target.
- Key locations: `data/raw-factions/jund/`, `data/factions.json#/factions/JUND`, `data/placement-model.json#/factions/JUND`, `data/identity-layers.json#/expressions/JUND`, `data/factions.json#/identity_layers/expressions/JUND`, `data/semantic-readiness-provenance.json` entries with `identity_key: JUND`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/JUND`.

## Raw Inventory

All Jund raw files are tracked and readable:

| Path | Git blob | SHA-256 | Classification |
| --- | --- | --- | --- |
| `data/raw-factions/jund/jund.changelog.json` | `84082d41b4fa3f6ecea417f2467dc0d1a9d3eb81` | `c90d07c8e5e6aa88b695c67e8af854d28dfd75932b6a6caccfcdb5b5fbda5a6f` | raw changelog / authoritative history support |
| `data/raw-factions/jund/jund.claims.json` | `15d71570252f04d4f6a7e235a4216a1c5f0cb2d2` | `cc8ea67397c10aa5c2e3c76be3bca6845abef5ca6c1ebde6408c924708830d6d` | raw claims |
| `data/raw-factions/jund/jund.placement.json` | `229e814a0b0f92692d652d6e5fc46d77f3984671` | `f1dfeecb9e5f1bb02ab2b672d14e1ca95799ac8894e6a0623558cfd9f851bf53` | raw placement/collision/scoring |
| `data/raw-factions/jund/jund.profile.json` | `1f8aec40710df6c7210af89110cbbb0fb588eab3` | `236e59786417204e0b71e0a3cc1c1332c6a11b8f5a03a9c36fa41d88bab5f070` | raw profile |
| `data/raw-factions/jund/jund.sources.json` | `16bcd75a51e7a796f047492d611cd0cb4fd4bffe` | `271aed049694167a0720967d5f1a17a27c5a9e0d7494243c82e8c4b879ae6732` | stored source inventory |

Generated/read-only consumers located: `data/factions.json#/factions/JUND`, `data/placement-model.json#/factions/JUND`, `data/identity-layers.json#/expressions/JUND`, `data/factions.json#/identity_layers/expressions/JUND`, `data/semantic-readiness-provenance.json#/entries[identity_key=JUND]`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/JUND`.

## Source Inventory

Total stored sources: 15. Role counts: `claim-bearing` 3, `shaping-only` 6, `support-only` 6.

Claim-bearing sources:

- `src_vm_jund_evidence_ledger_20260530` -> `docs/research/jund/jund-evidence-ledger.md`, tracked and present.
- `src_wotc_rosewater_jund_following_your_heart` -> `docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md`, tracked and present.
- `src_vm_canon_inventory_three_color_audit_20260528` -> `docs/analysis/canon-inventory-three-color-reference-audit.md`, tracked and present.

Support/shaping locators exist for Jund source ledger, research dossier, reliability audit, manual fill, lore source packet, Jund architecture identity/metaphysics, Alara protocol RTF, Commander recommendation JSONL, color philosophy support directories, and Naya/Grixis comparator captures. `src_scryfall_oracle_cards_local` points to missing `data/scryfall/raw/oracle-cards.json`; it is support-only and not a preflight blocker because the source corpus is identifiable and current raw claims do not depend on it as claim-bearing authority.

No duplicate source IDs or null source IDs were found. Stored source records do not include stable content hashes; source-hash and evidence-chain completeness remain later obligations.

## Claim And Evidence Inventory

Total current claims: 10. Stored role counts: 0 substantive, 0 support, 0 discovery, 10 unclassified/null. Claim IDs are `jund_claim_0001` through `jund_claim_0010`; no duplicates, null IDs, or claims without sources were found. Claim-level `evidence_locations`: 0. Claim-level `evidence_scope`: 0. Claim-level canonical IDs are null/absent on all 10. Current claim types include `identity`, `identity_metadata`, `design_identity`, `design_synthesis`, and `design_boundary`.

Gate 1+2 must inventory and adjudicate final roles/evidence scope later. This preflight did not decide final roles, rewrite text, or change evidence.

## Provenance And Proof Chains

Existing Jund provenance entries: 22. Null canonical IDs: 8, including current provenance owners for profile-level fields and other canonical pointers without native IDs. Null canonical content hashes: 0. Duplicate canonical IDs: 0. Generated consumers include `data/factions.json#/factions/JUND`, `data/placement-model.json#/factions/JUND`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/JUND`.

Current proof chains are readable but not candidate-ready: candidate-scope output reports generated/provenance proof-chain contamination because generated semantic consumers reference unclassified Jund claims. This is an expected unremediated Gate 1+2/Gate 3+4/Gate 5 obligation, not a preflight blocker.

## Fixture State

- Existing fixture: absent.
- Expected path: `research/fixtures/semantic-readiness/jund.semantic-fixtures.json`.
- Expected schema precedent: current certified identity fixture family under `research/fixtures/semantic-readiness/*.semantic-fixtures.json`, especially Bant, Esper, and Grixis shard fixtures.
- Current fixture validation for Jund exits 1 with semantic-role/evidence/recruiter/fixture findings.

Missing fixture is a Gate 3+4 obligation after Gate 1+2 defines the remediation contract.

## Frozen Placement And Scoring State

Frozen/current values identified:

- Color identity: raw colors `B`, `R`, `G`; `BRG` is metadata-only and not a generated key, route key, runtime alias, fixture key, or lookup key.
- Placement summary: `Jund is a VM-186 live-pilot placement packet for the JUND shard expression. Its strongest source-bound signals are Red-centered self-truth, gut instinct, emotion as guide, Black appetite, Green unrestrained instinct, freedom with consequences, and anti-flattening boundaries.`
- Placement eligibility: `placement_eligible: true`, `live_pilot: true`, `manual_review_recommended: true`, `review_gated: false`.
- Placement quality: Medium source-authored confidence for narrow identity/design evidence; low for detailed lore until future evidence work.
- Calibration tuning status: `vm186_live_pilot`; last placement-ready pass `VM-186`.
- Required positive terms include Jund, Alara, BRG, Red-centered, self-truth, gut instinct, emotion as guide, freedom with consequences, Black appetite, and Green instinct.
- Required positive min hits: null. Broad match penalty: null.
- Suppress list includes generic BRG, generic anger, generic savage nature, devour alone, Modern Jund midrange, Naya behemoth community, Grixis death necromancy, Gruul civilization rejection, Rakdos spectacle, Golgari rot, Witherbloom life-drain, Riveteers BRG, and manual-fill lore as proof.
- Strengthen list includes Red-centered self-truth, gut instinct, emotion as guide, appetite as self-advocacy, unrestrained instinct, freedom with consequence, White and Blue absence at design scope, and anti-flattening boundary.
- Generated lateral targets: `BR`, `BG`, `RG`, `GRIXIS`, `WITHERBLOOM`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`.
- Native IDs inventoried: `value_jund_0001` through `value_jund_0003`, `signal_jund_0001` through `signal_jund_0003`, `q_jund_0001` through `q_jund_0003`, `collision_jund_gruul`, `collision_jund_grixis`, `collision_jund_witherbloom`, `collision_jund_naya_note_draft`, and `event_jund_0001`.
- No Hall, Crucible, global scoring, scheduling, calibration, package, validator, generator, schema, or runtime behavior change is authorized.

## Collision Guidance And Native IDs

- Raw collision shape: array.
- Raw collision order: `gruul_clans`, `grixis`, `witherbloom`, `naya`.
- Raw collision IDs: `collision_jund_gruul`, `collision_jund_grixis`, `collision_jund_witherbloom`, `collision_jund_naya_note_draft`.
- Generated collision shape: array.
- Generated collision order: `RG`, `GRIXIS`, `WITHERBLOOM`.
- Generated lateral inhibition targets: `BR`, `BG`, `RG`, `GRIXIS`, `WITHERBLOOM`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`.
- No unsupported structural shape was found; approved candidate-scope tooling parses the target.

Readable raw/generated mismatch, generated omission of the raw Naya draft separator, and incomplete required-neighbor coverage are later obligations, not preflight blockers.

## Preview Ownership And Consumers

- Authoritative preview source: `data/identity-layers.json#/expressions/JUND/preview_text`.
- Embedded preview: `data/factions.json#/identity_layers/expressions/JUND/preview_text`.
- Source/embedded equality: true.
- Preview SHA-256: `62bf73d5d7733faa12f13cf6401af7f2d9fd081b4ff2bcb41e33568dc6268562`.
- Current preview text: `Jund treats feeling as a compass. Red supplies self-truth and action, Black honors appetite and self-interest, and Green strips away overthinking until instinct can move.`
- Active Home dependency: `index.html` includes `./assets/js/home.js`; `assets/js/home.js` fetches `./data/identity-layers.json` and `./data/factions.json`.
- Active Archscry dependency: `assets/js/index.js` loads `factions.json`, `placement-model.json`, and `identity-layers.json`.
- Active recruiter dependency: `supabase/functions/guild-recruiter/index.ts` imports `FACTION_CONTEXT`.
- Active tests/CI dependencies: `assets/js/quick-reading-tests.js`, `assets/js/quick-reading-bias.js`, semantic-readiness scripts, candidate-scope scripts, source-generated guardrails, placement tests, package scripts, and `.github/workflows/validation.yml`.
- Established exclusions retained: `outputs/mtgdata-v3-enhanced/*.inspect.ndjson` as `DEBUG_INSPECTION_ARTIFACT`; `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` as `HISTORICAL_ARCHIVE`. The dependency scan found only the previously known self/reference history, not active inclusion/import/build/test/workflow evidence.

Preview semantic quality remains a Gate 1+2 subject; equality alone is not semantic alignment.

## DRIFT Controls

| Control | Result | Evidence | Later obligation |
| --- | --- | --- | --- |
| DRIFT-015 | PASS for preflight | Preview owner and embedded copy identified; equality true. | Gate 1+2 must review semantic alignment; Gate 3+4 may repair only if authorized. |
| DRIFT-016 | PASS for preflight | Approved validator unchanged; Jund raw/generated collision shapes readable arrays; `JUND` target recognized; `BRG` rejected. | Gate 5 candidate-scope must pass or document an approved exact exception after remediation. |
| DRIFT-017 | PASS for preflight | Active consumers and historical/debug exclusions classified with direct dependency evidence. | Gate 1+2 must determine semantic alignment scope; Gate 3+4 must propagate generated truth if remediation is authorized. |
| DRIFT-019 | PASS for exclusion | Debug/inspection/archive classifications retained; copied text alone not promoted to active consumer. | Continue dependency-proof standard. |

## Required Neighbor Set

Gate 1+2 must test at least:

- Pair identities: Golgari / BG, Gruul / RG, Rakdos / BR.
- Monocolors: Black / B, Red / R, Green / G.
- Three-color identities sharing two colors: Grixis / UBR, Sultai / UBG, Mardu / WBR, Temur / URG, Naya / WRG, Abzan / WBG.
- Additional repository-supported comparisons: Esper / WUB, Bant / WUG, Jeskai / WUR, Witherbloom, and Riveteers BRG metadata/false-positive risk.
- Broader collapse risks: Five-color / WUBRG, generic good-stuff, generic survival, generic predation, generic violence, generic nature, generic ambition, generic appetite, generic savagery, generic strength, generic "might makes right", generic anger, generic sacrifice value, devour alone, Modern Jund midrange, and generic BRG overfit.

Current raw collision coverage directly includes Gruul, Grixis, Witherbloom, and Naya draft guidance. Generated collision coverage includes `RG`, `GRIXIS`, and `WITHERBLOOM`; generated lateral targets include `BR`, `BG`, `RG`, `GRIXIS`, `WITHERBLOOM`, `ABZAN`, `TEMUR`, `SULTAI`, and `MARDU`. Missing or generic boundaries are Gate 1+2 audit subjects and Gate 3+4 fixture/collision obligations if remediation is later authorized.

## Semantic-Risk Declaration

Gate 1+2 must test whether Jund collapses into Golgari, Gruul, Rakdos, Black, Red, Green, Grixis, Sultai, Mardu, Temur, Naya, Abzan, five-color good-stuff, generic survival, generic predation, generic violence, generic savagery, generic appetite, generic strength, generic ambition, generic nature, generic "might makes right", or generic BRG overfit.

It must inspect generic reliance on survival, strength, predation, nature, instinct, appetite, hunger, violence, savagery, dominance, competition, adaptation, ruthlessness, growth, destruction, freedom, impulse, ambition, self-interest, resilience, brutality, power, and "the strong survive."

Jund must not later be accepted merely as survival of the fittest, might makes right, predators, dragons, beasts, devour, sacrifice, graveyard value, aristocrats, stompy, aggro, monsters, violence, savagery, hunger, nature red in tooth and claw, generic Black-Red-Green good-stuff, Jund aesthetics, Alara aesthetics, or Modern Jund midrange. No final Jund thesis was adjudicated in this preflight.

## Workflow Comparison

- VM-516 Simic: DRIFT-015/017 preview ownership and active consumer checks carried forward.
- VM-517 White: DRIFT-016 structural-shape lesson applied; Jund uses readable array collision guidance.
- VM-520 Red: stricter required-neighbor prompt reconciliation retained; Jund must cover prompt-required pair, mono, shard/wedge, and generic-collapse neighbors before any later approval.
- VM-521 Green: active-consumer classification requires dependency proof; copied strings alone are insufficient.
- VM-522 Bant: three-color target isolation, non-circular stage ownership, missing-evidence/provenance review, replacement-candidate preservation, and exact-tree testing are retained as later-stage precedents.
- VM-523 Esper: shard PASS precedent retained; Jund resembles Esper's low-volume support-heavy start but has 10 unclassified claims, 15 sources, 22 provenance entries, no fixture, and limited raw/generated collision coverage.
- VM-524 Grixis: Black/Red-adjacent shard precedent retained; Jund must avoid generic survival/violence and isolate shared Grixis/Rakdos/Golgari/Gruul pressure without borrowing completed-identity conclusions.
- Historical Jund VM-176 through VM-192: `JUND` was promoted as the live key; `BRG` remained metadata/query syntax only; runtime/product text was hardened without expanding raw evidence.

## Commands Run

| Command | Exit | Classification |
| --- | ---: | --- |
| `git worktree list --porcelain` | 0 | Setup inspection. |
| `git status --short --branch` in protected worktrees | 0 | Protected baseline inspection. |
| `git cat-file -t 16528f3a24a7f3d7f4475bdde56fbfee09becd98` | 0 | Program-base object exists. |
| `git show -s --format=%H%n%P%n%ci%n%s 16528f3a24a7f3d7f4475bdde56fbfee09becd98` | 0 | Program-base verification; Grixis certification. |
| `git branch --list codex/vm-525-jund-semantic-recovery` | 0, empty | Local branch absent before creation. |
| `git branch -r --list origin/codex/vm-525-jund-semantic-recovery` | 0, empty | Cached remote branch absent. |
| `git ls-remote --heads origin codex/vm-525-jund-semantic-recovery` | 0, empty | Remote branch absent. |
| `Test-Path C:\dev\mtgSiteWIP-crit001-vm525-jund` | 0, false | Preferred path absent before creation. |
| `git worktree add -b codex/vm-525-jund-semantic-recovery C:\dev\mtgSiteWIP-crit001-vm525-jund 16528f3a24a7f3d7f4475bdde56fbfee09becd98` | 0 | Branch/worktree creation. |
| `git rev-parse HEAD` in Jund worktree | 0 | Exact `16528f3a24a7f3d7f4475bdde56fbfee09becd98`. |
| `git branch --show-current` in Jund worktree | 0 | `codex/vm-525-jund-semantic-recovery`. |
| `rg --files -g AGENTS.md` | 0 | No scoped AGENTS. |
| Governance and precedent `Get-Content` reads | 0 | Authority reviewed. |
| JSON inventory scripts | 0 | Raw/source/claim/provenance/collision/preview/frozen-field inventory. |
| `node research/audit-semantic-readiness.mjs --targets=JUND` | 0 | Readable target inventory; 10 claims, all unclassified. |
| `node research/validate-semantic-readiness.mjs --targets=JUND` | 1 | Expected unremediated role/evidence findings. |
| `node research/validate-semantic-readiness.mjs --fixtures --targets=JUND` | 1 | Expected unremediated fixture/role/evidence findings. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Approved validator tests pass. |
| `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` | 0 | Approved validator integrity. |
| `node research/validate-semantic-candidate-scope.mjs --identity=JUND --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=16528f3a24a7f3d7f4475bdde56fbfee09becd98` | 1 | Expected unremediated proof-chain diagnostics; target recognized. |
| `node research/validate-semantic-candidate-scope.mjs --identity=BRG --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=16528f3a24a7f3d7f4475bdde56fbfee09becd98` | 1 | Expected invalid alias result: unknown identity. |
| `node research/build-semantic-readiness-provenance.mjs --check` | 1 | Stale provenance baseline; later Gate 3+4 obligation. |
| `node research/validate-source-generated-guardrails.mjs --targets=JUND` | 0 | PASS with one non-blocking model-owned inhibitor warning. |
| Active-consumer dependency searches | 0/1 | Home, Archscry, recruiter, tests, package scripts, and CI classified; missing `tests` directory produced a non-material path-search warning. |

## Stage-Ownership Matrix

| Control ID | Area | Requirement | Evidence | Current finding | Result | True owning stage | Preflight blocking | Required future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VM525-PF-001 | Setup | Exact base exists and is Grixis certification | `git show 16528f3...` | Verified | PASS | PREFLIGHT | No | None |
| VM525-PF-002 | Setup | Jund branch/path absent before creation | branch/path/remote checks | No collision | PASS | PREFLIGHT | No | None |
| VM525-PF-003 | Setup | Dedicated worktree clean at exact base | status/HEAD checks | Clean at `16528f3...` | PASS | PREFLIGHT | No | None |
| VM525-PF-004 | Protected worktrees | Preserve unrelated work | status checks | Original-main dirt, Table Talk, DRIFT-017 prototype preserved | PASS | PREFLIGHT | No | Continue explicit staging only |
| VM525-PF-005 | Governance | No unresolved authority conflict | authority review | Dedicated-worktree prompt reconciles playbook wording | PASS | PROGRAM_GOVERNANCE | No | None |
| VM525-PF-006 | Target | Exact internal key proven | raw/generated/ledger/validator | `JUND`; `BRG` invalid | PASS | PREFLIGHT | No | Use `JUND` only |
| VM525-PF-007 | Raw corpus | Raw files located/readable | raw inventory | 5 tracked files | PASS | PREFLIGHT | No | Gate 1+2 audit |
| VM525-PF-008 | Sources | Stored sources located/readable | 15 source records | Corpus identifiable; support-only Scryfall file missing | PASS | GATE_1_2 | No | Later source disposition and hash/evidence-chain review |
| VM525-PF-009 | Claims | Current claims inventoried | 10 claims | All unclassified, no evidence locations | PASS | GATE_1_2 | No | Role/evidence adjudication |
| VM525-PF-010 | Provenance | Current provenance inventoried | 22 rows | 8 null canonical IDs | PASS | GATE_3_4 | No | Repair if authorized |
| VM525-PF-011 | Fixture | Fixture state identified | path check | Missing fixture | PASS | GATE_3_4 | No | Create after remediation authorization |
| VM525-PF-012 | Frozen fields | Frozen fields identifiable | placement/frozen inventory | Values recorded | PASS | PREFLIGHT | No | Preserve during later gates |
| VM525-PF-013 | Structure | Collision shape readable | raw/generated arrays | Supported; raw/generated set differs | PASS | PREFLIGHT | No | Later coverage reconciliation |
| VM525-PF-014 | Preview | Ownership and embedded copy known | source/embedded equality | Equal | PASS | GATE_1_2 | No | Semantic alignment audit |
| VM525-PF-015 | Consumers | Active consumers classified | direct dependency search | Home, Archscry, recruiter, tests active; historical/debug exclusions retained | PASS | PREFLIGHT | No | Later propagation proof |
| VM525-PF-016 | DRIFT-015 | Preview owner/equality | source/embedded paths | Known/equal | PASS | GATE_1_2 | No | Semantic review later |
| VM525-PF-017 | DRIFT-016 | Validator/shape compatibility | tests and target run | Compatible | PASS | PREFLIGHT | No | Final candidate validation later |
| VM525-PF-018 | DRIFT-017 | Consumer boundary | dependency evidence | Sufficiently classified | PASS | PREFLIGHT | No | Semantic alignment later |
| VM525-PF-019 | Neighbors | Required set established | topology and repo precedents | Set declared | PASS | GATE_1_2 | No | Test boundaries later |
| VM525-PF-020 | Semantic risk | Risk declaration complete | prompt plus repo evidence | Risks declared | PASS | GATE_1_2 | No | Adjudicate later |
| VM525-PF-021 | Diagnostics | Approved tools run read-only | commands above | Expected unremediated failures only | PASS | PREFLIGHT | No | Rerun in later gates |
| VM525-PF-022 | Scope | No semantic data changed | status/diff | Governance-only pending | PASS | PREFLIGHT | No | Verify before commit |
| VM525-PF-023 | Excel | Tracker untouched | no Excel access | Untouched | PASS | PROGRAM_GOVERNANCE | No | ChatGPT updates externally if needed |
| VM525-PF-024 | VM-526 | Next identity untouched | search/status | No VM-526 work | PASS | PROGRAM_GOVERNANCE | No | Keep untouched |

Scorecard:

- Total controls: 24.
- PASS: 24.
- FAIL: 0.
- UNKNOWN: 0.
- N/A: 0.
- Genuine preflight blockers: 0.
- Gate 1+2 obligations: source/claim/evidence role adjudication, support-only Scryfall source disposition, preview semantic alignment, required-neighbor testing, semantic-risk adjudication, active-consumer semantic alignment.
- Gate 3+4 obligations: semantic role/evidence-scope repair if authorized, canonical-ID/provenance repair, fixture creation, raw/generated collision and generated propagation repair if authorized, provenance freshness regeneration if authorized.
- Gate 5 obligations: exact candidate-scope validation, exact-chain validation, immutable candidate creation only after remediation and validation.
- Shared-infrastructure findings: none. Approved validator is sufficient.
- Program-governance conflicts: none unresolved.

## What Changed

- Added this VM-525 preflight handoff.
- Updated the VM-525 Kanban card to Active/preflight-complete/Gate 1+2-authorized state.
- Updated `docs/kanban/board.md` for VM-525 active preflight completion.
- Updated `docs/handoffs/HANDOFF_INDEX.md`.

## Why It Changed

CRIT-001 drift-control rules require a separate committed pre-identity drift-preflight control record before any new identity receives Gate 1+2 semantic work. Jund passed the preflight because the exact target, raw/source/claim/provenance/fixture state, frozen fields, collision shape, preview owner, consumer scope, and required future audit scope are all identifiable without semantic edits, unapproved tooling, shared infrastructure changes, or tracker edits.

## Decisions Made

- Decision: `PASS - JUND GATE 1+2 AUTHORIZED`.
- Authorization scope: a later separate Gate 1+2 read-only semantic audit only.
- Remediation, source acquisition, generation, fixture creation, candidate creation, workflow recording, independent review, certification, program-base advancement, VM-526 work, original-main edits, Excel edits, and shared-infrastructure changes remain unauthorized/not started.
- Treat `BRG` as invalid candidate-scope alias and metadata/query syntax only.
- Treat all current semantic/candidate-readiness defects as unresolved later-stage obligations, not remediated state.

## Risks / Uncertainties

- Jund may still fail Gate 1+2 or later remediation if evidence is insufficient, source locators cannot support claims, preview language is semantically misaligned, required-neighbor boundaries cannot be made source-bound, or support/mechanics/product material contaminates proof chains.
- Current candidate-scope failure is expected for the unremediated packet but must not be accepted for a future candidate.
- `data/scryfall/raw/oracle-cards.json` is missing for a support-only source entry and must be dispositioned later if support surfaces depend on it.
- The generated omission of the raw Naya draft separator and incomplete required-neighbor coverage must be adjudicated later; this preflight did not repair it.

## Tests Run

- `node research/audit-semantic-readiness.mjs --targets=JUND` - exit 0.
- `node research/validate-semantic-readiness.mjs --targets=JUND` - exit 1, expected unremediated role/evidence findings.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=JUND` - exit 1, expected unremediated fixture/role/evidence findings.
- `node research/semantic-candidate-scope-tests.js` - exit 0.
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` - exit 0.
- `node research/validate-semantic-candidate-scope.mjs --identity=JUND --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=16528f3a24a7f3d7f4475bdde56fbfee09becd98` - exit 1, expected unclassified proof-chain diagnostics.
- `node research/validate-semantic-candidate-scope.mjs --identity=BRG --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=16528f3a24a7f3d7f4475bdde56fbfee09becd98` - exit 1, unknown identity.
- `node research/build-semantic-readiness-provenance.mjs --check` - exit 1, stale provenance.
- `node research/validate-source-generated-guardrails.mjs --targets=JUND` - exit 0 with one model-owned warning.
- JSON/read-only inventory scripts and dependency searches - exit 0 except the non-material missing `tests` path search warning.

## Not Touched

No Gate 1+2 semantic audit occurred. No Jund semantic adjudication occurred. No Jund semantic or implementation data changed. No source, claim, evidence, provenance, fixture, generated, collision, placement, scoring, preview, recruiter, runtime, test, validator, generator, schema, package, CI, shared infrastructure, candidate workflow, independent review, certification, Excel tracker, VM-526, VM-522 history, VM-523 history, VM-524 history, original main, DRIFT-017 prototype, VM-542 / DRIFT-019 residual, historical/debug/archive exclusion, or Table Talk file was modified.

## Follow-Up Recommendations

Next suggested agent: VM-525 Gate 1+2 read-only semantic audit agent.

The next prompt may begin Gate 1+2 read-only audit only. Remediation, candidate creation, independent review, certification, source acquisition, and program-base advancement remain unauthorized.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-525-jund-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

PASS — JUND GATE 1+2 AUTHORIZED
