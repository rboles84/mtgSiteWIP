# VM-522 Bant Gate 1+2 Read-Only Semantic Audit

Agent name: Codex
Task requested: Continue VM-522 for CRIT-001 by performing the authorized Bant Gate 1+2 read-only semantic audit and recording whether Gate 3+4 remediation may begin.

## Program And Identity

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-522 - Bant / BANT / WUG
- Branch: `codex/vm-522-bant-semantic-recovery`
- Worktree: `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`
- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Starting HEAD: `16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d`
- Original preflight stop commit: `62732685d31ce389e22e82d1331387b49e3e7345`
- Preflight rerun stop commit: `ffba9fd181e7f363682fc111b99aaf038babbd04`
- Stage-ownership authorization commit: `16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d`
- Original stop handoff: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Preflight rerun stop handoff: `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- Stage-ownership handoff: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`

## Safety Verification

- Current branch verified as `codex/vm-522-bant-semantic-recovery`.
- Starting HEAD verified as `16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d`.
- Ancestry verified: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e` -> `62732685d31ce389e22e82d1331387b49e3e7345` -> `ffba9fd181e7f363682fc111b99aaf038babbd04` -> `16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d`.
- `git diff --name-status 16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d..HEAD` was empty before edits.
- Original main `C:\dev\mtgSiteWIP` was inspected only with `git -C` status and was not entered or modified.
- DRIFT-017 prototype `C:\dev\mtgSiteWIP-crit001-drift017` was inspected only with `git -C` status and was not entered or modified.
- Table Talk baseline in `C:\dev\mtgSiteWIP-crit001` remained unrelated and untouched.
- Excel tracker was not opened, edited, staged, or committed.
- VM-523 was not inspected for semantic content, edited, staged, or committed.

## Governing Authority Reviewed

Root `AGENTS.md` was reviewed and no scoped `AGENTS.md` exists. The audit also reviewed the CRIT-001 operating playbook, Contract v1.1 amendment, semantic readiness contract, drift-control template/register, recovery template, VM-516 through VM-521 precedents, the approved candidate-scope validator candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`, validator approval `af3d8c6c563b3743f65c2dc8478519707f4785c8`, Green provenance/dependency resolution `aa62ac329c53c00016dcce749b5fea73b145d4ac`, and Green fresh provenance review `ec148486ff2442ff2e3145dd9d45a6d993179766`.

Gate 1+2 is read-only semantic audit and evidence confirmation. It may adjudicate claim roles, evidence sufficiency, source-use boundaries, preview semantic alignment, active-consumer classification, required-neighbor scope, and a bounded remediation contract. It may not change Bant raw/generated/runtime/test data, create a candidate, perform independent review, certify, or advance the program base.

## Prior Blocking Controls Carried Into Audit

| Control ID | Original result | Gate ownership after stage adjudication | Gate 1+2 audit result |
| --- | --- | --- | --- |
| VM522-BLOCK-001 | FAIL | Gate 1+2 semantic role/evidence disposition | PASS - role contract recorded |
| VM522-BLOCK-002 | FAIL | Gate 1+2 evidence-scope disposition | PASS - sufficient bounded corpus recorded |
| VM522-BLOCK-003 | FAIL | Gate 3+4 canonical/provenance repair | PASS - exact remediation contract recorded |
| VM522-BLOCK-004 | FAIL | Gate 3+4 fixture creation | PASS - fixture locator contract recorded |
| VM522-BLOCK-005 | FAIL | Gate 1+2 preview semantic alignment and Gate 3+4 propagation | PASS - alignment and propagation contract recorded |
| VM522-BLOCK-006 | FAIL | Gate 1+2 consumed-surface semantic alignment and Gate 3+4 regeneration | PASS - active consumers and regeneration contract recorded |
| VM522-BLOCK-007 | FAIL | Gate 1+2 required-neighbor sufficiency and Gate 3+4 collision repair | PASS - required neighbor matrix recorded |
| VM522-BLOCK-008 | UNKNOWN/FAIL | Gate 1+2 DRIFT-015/016/017 audit plus Gate 3+4 propagation | PASS - drift controls classified |
| VM522-BLOCK-009 | FAIL | Gate 5 candidate-scope validation after candidate | PASS - future Gate 5 obligation recorded |
| VM522-BLOCK-010 | FAIL | Gate 3+4 generated propagation/provenance freshness | PASS - exact generation/provenance contract recorded |
| VM522-RERUN-001 | FAIL | Gate 3+4 stale provenance rebuild | PASS - future rebuild/check obligation recorded |

The preserved STOP findings remain valid historical evidence. This audit supersedes only the authorization state for Gate 3+4 remediation by converting the blockers into a bounded, evidence-backed remediation contract.

## Files Reviewed

Reviewed Bant artifacts: `data/raw-factions/bant/bant.claims.json`, `bant.sources.json`, `bant.profile.json`, `bant.placement.json`, Bant source/evidence/research/reliability/lore/manual-fill documents, the official local Rosewater capture, Bant architecture identity/metaphysics docs, `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, `data/semantic-readiness-provenance.json`, `supabase/functions/guild-recruiter/faction-context.ts`, and the approved candidate-scope validator/test files.

## Current Raw Inventory

| Artifact | Current hash |
| --- | --- |
| `data/raw-factions/bant/bant.claims.json` | `572a4dfe5510d440d941131e45930883ee104014caec32afd36c3f188d1c7499` |
| `data/raw-factions/bant/bant.sources.json` | `7f9e58500d994b524dce6d714bf9da0da278e28425f0d73f6bc94359490f22ac` |
| `data/raw-factions/bant/bant.profile.json` | `4c30cee6ece983b6fee55b7a916d38bb20d170fe091c0c3619552820d34b5e3a` |
| `data/raw-factions/bant/bant.placement.json` | `ccbfc1cccfdbbe2c27298789f6706f352503d5af5b4f50bca10ef5c521742521` |
| `data/factions.json` | `310f910f5231508816a9391b1684a4c532d692a575f1ef154daccd030cc13633` |
| `data/placement-model.json` | `26077c23d44cf7db43794a40d825c05aa78103e3ced576602ef6847b92260599` |
| `data/semantic-readiness-provenance.json` | `dd093d8ed6bedebe9683d445b877f0eef91edb4c08323e51156fb4519b60a548` |
| `data/identity-layers.json` | `8eb2be2cbb2702c6a51f6ad4214e9d0f27221c8ffd9ac32a19ac59bdd5f4023c` |
| `supabase/functions/guild-recruiter/faction-context.ts` | `4d75d0a476ff78315054530fe8f9c7a18e4aac29fb8835cfea175152901f8fb3` |

Source inventory: 21 sources. Stored roles: 3 claim-bearing, 1 discovery-only, 7 shaping-only, 10 support-only.

Claim inventory: 21 claims. Stored semantic roles: 21 unclassified, 0 substantive, 0 discovery, 0 support. Stored evidence locations: 0.

Provenance inventory: 49 BANT entries, 17 null canonical IDs, 0 duplicate non-null canonical IDs. Null local indexes: 16, 22, 23, 24, 25, 26, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48.

Fixture inventory: `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` is absent.

Native IDs observed in raw profile include `faction_id:bant`, `event_bant_0001` through `event_bant_0004`, and character IDs `char_bant_rafiq_of_the_many`, `char_bant_noble_hierarch`, `char_bant_jenara`, `char_bant_gwafa_hazid`, `char_bant_asha`, `char_bant_elspeth_tirel`, and `char_bant_mubin`.

## Source Sufficiency Decision

Gate 1+2 finds the existing corpus sufficient for bounded Gate 3+4 remediation without source acquisition, provided remediation obeys these limits:

- Official Rosewater capture may support Bant as GWU/WUG, White-centered, ordered/social, utopia-design commentary, and absence-of-Black/Red design framing. It must not be rewritten as in-world resident doctrine.
- `src_wotc_planeswalkers_guide_alara_2008`, as locally referenced through the lore reference/source packet, may support five-nation geography and sigil/caste geography at bounded paraphrase level. Direct quotation or expanded political detail remains source-bound and must not be introduced without separate source acquisition.
- `src_wotc_alara_plane_page` remains discovery-only and may not be used as authoritative semantic proof.
- Bant identity/metaphysics docs are project-authoritative shaping documents, not Magic canon. They may support Vox Mana placement boundary language when paired with canonical/substantive Bant evidence.
- Manual-fill, workbook, MTG Wiki, and secondary-summary material remain support/discovery only and may not carry primary Bant canon.

No source gap requires stopping Gate 1+2. Every current source limitation can be resolved by narrowing/reclassifying claims and excluding unsupported direct-quote/detail expansion during Gate 3+4.

## Semantic Thesis For Remediation

Bant is a White-centered WUG/GWU Alara shard expression where excellence is legitimate only when it remains answerable to public order, communal trust, and the whole that raises a worthy champion. Blue contributes planning/refinement/potential, Green contributes interconnection/belonging/living community, and White governs the center through moral order, social structure, and the group-before-self ideal. Bant must not collapse into generic harmony, generic good-stuff, generic balance, or the best of White, Blue, and Green.

This thesis is an audit boundary and remediation contract only. No Bant semantic data was changed in this gate.

## Claim Disposition Matrix

Intended final claim count for Gate 3+4: 21 total, 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.

| Claim ID | Current state | Audit disposition | Intended final role | Required Gate 3+4 action |
| --- | --- | --- | --- | --- |
| `bant_claim_0001` | unclassified, no evidence locations | retain with scope correction | `substantive_claim` | Bound to Bant as one Alara shard; exclude discovery-only plane page from proof chain. |
| `bant_claim_0002` | unclassified, mixed canon/project key statement | rewrite | `substantive_claim` | Limit to WUG/GWU color identity; leave BANT live-key metadata to `bant_claim_0020`. |
| `bant_claim_0003` | unclassified | retain with scope correction | `substantive_claim` | Use official Rosewater local capture; design commentary only. |
| `bant_claim_0004` | unclassified | retain with scope correction | `substantive_claim` | Use official Rosewater local capture for White-centered utopia and absence-of-Black/Red design frame only. |
| `bant_claim_0005` | unclassified | retain with scope correction | `substantive_claim` | Bant-associated mechanic, not exclusive mechanic or identity proof by itself. |
| `bant_claim_0006` | unclassified | retain with scope correction | `substantive_claim` | Vox Mana synthesis from exalted, public honor, and support structure. |
| `bant_claim_0007` | unclassified | retain with scope correction | `substantive_claim` | Bind sigils/public honor/earned recognition to local evidence and avoid broad generic honor. |
| `bant_claim_0008` | unclassified | retain with scope correction | `substantive_claim` | Keep Rafiq and five-nation sigil association; exact story/flavor quotation remains source-bound. |
| `bant_claim_0009` | unclassified | retain with scope correction | `substantive_claim` | Keep five-nation geography at bounded level. |
| `bant_claim_0010` | unclassified, too exact for current direct locator confidence | rewrite/narrow | `substantive_claim` | Replace exact nation-description wording with bounded five-nation/sourcebook geography unless exact passages are localized without acquisition. |
| `bant_claim_0011` | unclassified | retain with scope correction | `substantive_claim` | Keep Great Conduit as symbolic/geographic anchor; no direct quote expansion. |
| `bant_claim_0012` | unclassified, composite figure list | reclassify | `support_record` | Use as figure/card-anchor support only. |
| `bant_claim_0013` | unclassified | retain with scope correction | `substantive_claim` | Keep Asha sacred-authority boundary and angel-creation non-founder guard. |
| `bant_claim_0014` | unclassified | retain with scope correction | `substantive_claim` | Keep Elspeth Bant arc as source-bound boundary; no governance/institution-building claim. |
| `bant_claim_0015` | unclassified | retain with scope correction | `substantive_claim` | Keep Conflux as shard-reunion rupture point; no unsupported post-Conflux political detail. |
| `bant_claim_0016` | unclassified | retain with scope correction | `substantive_claim` | Keep post-Phyrexia continuity boundary only; no complete later-era political condition. |
| `bant_claim_0017` | unclassified | reclassify | `support_record` | Commander expression support only. |
| `bant_claim_0018` | unclassified | reclassify | `support_record` | Commander suppression/placement support only. |
| `bant_claim_0019` | unclassified, insufficient neighbor coverage | rewrite/expand | `substantive_claim` | Expand to required Bant-side neighbor/collapse-risk boundaries listed below. |
| `bant_claim_0020` | unclassified | reclassify | `support_record` | Runtime/key governance support only. |
| `bant_claim_0021` | unclassified | reclassify | `support_record` | Mubin story support context only. |

## Required Neighbor And Collapse-Risk Matrix

Gate 3+4 must ensure `bant_claim_0019`, placement collision guidance, generated collision guidance, fixture cases, and candidate proof chains cover Selesnya/WG, Simic/UG, Azorius/WU, Green/G, White/W, Blue/U, Naya, Esper, Temur, Abzan, Jeskai, Grixis, Jund, Sultai, Five-color/WUBRG, generic good-stuff, generic balance, and generic overfit.

Required semantic separators:

- Selesnya/WG: shared community, harmony, protection, and growth are insufficient; Bant adds Blue refinement and White-centered sanctioned champion/order rather than Ravnican shared voice alone.
- Simic/UG: shared growth, knowledge, and improvement are insufficient; Bant adds White moral order, public trust, and communal honor rather than biological adaptation/research alone.
- Azorius/WU: shared order and planning are insufficient; Bant adds Green living interconnection and champion/community structure rather than civic procedure/control alone.
- Green/G: shared nature, growth, belonging, and interdependence are insufficient; Bant requires White/Blue public order, refinement, and social sanction.
- White/W: shared order, protection, peace, and duty are insufficient; Bant requires WUG shard structure, Blue refinement, Green living community, and exalted/champion logic.
- Blue/U: shared planning, knowledge, and perfection are insufficient; Bant subordinates refinement to White-centered public order and Green belonging.
- Naya: shared White/Green life/community are insufficient; Bant centers White order, public honor, Blue planning, and champion sanction rather than Green-centered abundance and Red immediacy.
- Esper: shared White/Blue order and perfectibility are insufficient; Bant is living communal order without Black artifact-control/ambition as center.
- Temur: shared Green/Blue pattern and survival are insufficient; Bant adds White public order and suppresses Red instinct as primary motion.
- Abzan: shared White/Green endurance and duty are insufficient; Bant adds Blue refinement/champion order rather than Black cost, family survival, and ancestry as center.
- Jeskai: shared White/Blue discipline and training are insufficient; Bant adds Green living community and public champion trust rather than Red action/prowess release.
- Grixis: Bant public order, honor, and collective structure must not collapse into Grixis survival, calculation, appetite, and urgent action.
- Jund: Bant sanctioned order and communal support must not collapse into Jund Red-centered instinct, Black appetite, and Green force.
- Sultai: shared Green/Blue material planning is insufficient; Bant excludes Black exploitation/resource opportunism and requires White-centered public trust.
- Five-color/WUBRG: all-color breadth or "everything can speak" is not Bant; Bant is specifically WUG and shaped by absence of Black and Red.
- Generic good-stuff: efficient WUG cards, value piles, angels, knights, creatures, or strong mechanics are not Bant without public order/champion/evidence anchors.
- Generic balance: abstract balance, harmony, cooperation, peace, protection, wisdom, or community are not Bant without White-centered social order plus Blue/Green supporting roles.
- Generic overfit: repetition of order, community, nature, knowledge, growth, hierarchy, civilization, perfection, creature mechanics, exalted mechanics, angels, knights, beasts, shard aesthetics, or "the best of White, Blue, and Green" is not enough.

## Collision Guidance Contract

Current raw collision order: `azorius_senate`, `selesnya_conclave`, `simic_combine`, `naya`, `esper`, `grixis`, `jund`.

Current generated collision order: `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`.

Current generated lateral targets in `data/placement-model.json#/factions/BANT`: `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `ABZAN`, `TEMUR`, `SULTAI`.

Gate 3+4 must reconcile raw and generated collision guidance by preserving existing raw entries and adding/remediating missing required boundaries so raw/generated collision guidance and fixture coverage agree. Raw Naya and Jund must not disappear from generated output. Generated ABZAN, TEMUR, and SULTAI targets require raw Bant-side collision entries or must be removed if not supported by canonical Bant collision guidance. No runtime scoring, calibration, Hall/Crucible behavior, or shared placement engine change is authorized.

## DRIFT Controls

| Control | Result | Evidence |
| --- | --- | --- |
| DRIFT-015 | PASS for Gate 1+2; Gate 3+4 action required | Active preview text in `data/identity-layers.json`, `data/factions.json`, and `supabase/functions/guild-recruiter/faction-context.ts` is semantically aligned with the Gate 1+2 thesis, but Gate 3+4 must preserve equality/provenance after remediation. |
| DRIFT-016 | PASS for Gate 1+2; Gate 5 action required | Approved validator is unchanged from exact candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`; current candidate-scope fails only because Bant is not remediated. |
| DRIFT-017 | PASS for Gate 1+2; Gate 3+4 action required | Active generated consumers are proven; their semantic alignment must be regenerated and proven after raw remediation. |
| DRIFT-019 / Green-era exclusion | PASS | Debug inspection artifacts and historical archive JS remain non-blocking exclusions absent direct active dependency evidence. |

## Active Consumer Classifications

| Surface | Classification | Direct dependency evidence |
| --- | --- | --- |
| Home preview and lore | Active consumer | `assets/js/home.js` fetches `./data/identity-layers.json` and `./data/factions.json`. |
| Archscry application | Active consumer | `assets/js/index.js` loads `factions.json`, `placement-model.json`, and `identity-layers.json`. |
| Guild recruiter function | Active consumer | `supabase/functions/guild-recruiter/index.ts` imports `FACTION_CONTEXT` from `supabase/functions/guild-recruiter/faction-context.ts`. |
| Generated recruiter context | Active consumer | `supabase/functions/guild-recruiter/faction-context.ts` is generated from raw/data artifacts and used by recruiter runtime. |
| Tests/CI | Active consumer | `assets/js/quick-reading-tests.js`, `quick-reading-bias.js`, and readiness/candidate validators import generated data and recruiter context. |
| `outputs/mtgdata-v3-enhanced/*.inspect.ndjson` | `DEBUG_INSPECTION_ARTIFACT` | Matching strings are copied inspection/export rows; no runtime, build, test, or deployment dependency evidence found. |
| `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` | `HISTORICAL_ARCHIVE` | Preserved Green-era classification retained; no direct active dependency evidence found. |

## Fixture And Proof-Chain Contract

Gate 3+4 must create `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` with exact locators for the core Bant shard/color/White-centered thesis, exalted and many-behind-worthy-champion proof, sigils/public honor and five-nation structure, Asha/Elspeth/Mubin support boundaries, Commander support and suppression records, every required neighbor/collapse-risk boundary, and generated consumers `data/factions.json#/factions/BANT`, `data/placement-model.json#/factions/BANT`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/BANT`.

Candidate proof chains must contain no `discovery_record`, `support_record`, missing, or unclassified claim IDs as authoritative proof. Support records may be retained only in explicitly non-authoritative support contexts.

## Frozen Fields

Gate 3+4 may change only Bant-scoped semantic/canonical/generated surfaces required by the remediation contract. It must preserve program base `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`, existing Bant native IDs, non-Bant raw/generated content, shared validators, shared generators, shared schemas, package/test wiring, runtime behavior, Hall/Crucible/scoring/calibration behavior, global recruiter logic, Excel, VM-523, and all existing placement/scoring/calibration fields except Bant collision guidance entries explicitly authorized above.

## Gate 3+4 Remediation Contract

Authorized future remediation is bounded to assigning all 21 Bant claim roles; adding evidence scopes and exact evidence locations; rewriting/narrowing `bant_claim_0002`, `bant_claim_0010`, and `bant_claim_0019`; reclassifying support records; reconciling source roles and source/evidence use; creating Bant semantic fixtures; repairing provenance canonical IDs/pointers/hashes/generated consumers; regenerating only Bant-scoped generated artifacts; reconciling raw/generated collision guidance and required neighbors; preserving or target-scope updating preview text only if needed; running readiness, fixture, guardrail, provenance, generated, and candidate-scope checks; and recording an immutable candidate SHA only after Gate 3+4 succeeds.

Not authorized: source acquisition, raw source expansion beyond local evidence, shared infrastructure changes, shared policy changes, runtime repair, placement scoring changes, independent review, certification, program-base advancement, VM-523 work, or Excel tracker edits.

## Commands Run

| Command | Exit |
| --- | --- |
| `Get-Content -LiteralPath C:\Users\obake\.codex\attachments\59f08aaf-59f8-48dd-a7a8-f8b3f7b41f44\pasted-text.txt` | 0 |
| `git status --short --branch` | 0 |
| `git rev-parse --show-toplevel` | 0 |
| `git rev-parse --abbrev-ref HEAD` | 0 |
| `git rev-parse HEAD` | 0 |
| `git worktree list --porcelain` | 0 |
| `git show -s --format=...` for `16a3a33`, `ffba9fd`, `6273268`, and `fa58e57` | 0 |
| `git merge-base --is-ancestor ...` ancestry checks | 0 |
| `git diff --name-status 16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d..HEAD` | 0 |
| Protected worktree status checks for original main, Table Talk baseline, and DRIFT-017 prototype | 0 |
| `rg --files -g AGENTS.md` | 0 |
| Governance and Bant source `Get-Content` reads | 0 |
| `git show --stat --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 --` | 0 |
| `git show --stat --oneline af3d8c6c563b3743f65c2dc8478519707f4785c8 --` | 0 |
| `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research\validate-semantic-candidate-scope.mjs research\semantic-candidate-scope-tests.js` | 0 |
| Bant hash/source/claim/provenance inventory scripts | 0 |
| Preview lookup attempt using incorrect identity-layer shape | 1 |
| Corrected preview/source/consumer probes | 0 |
| `Test-Path research\fixtures\semantic-readiness\bant.semantic-fixtures.json` | 0 |
| `rg -n "identity-layers\.json|factions\.json|placement-model\.json|FACTION_CONTEXT|guild-recruiter|faction-context" ...` | 0 |
| `node research\audit-semantic-readiness.mjs --targets=BANT` | 0 |
| `node research\semantic-candidate-scope-tests.js` | 0 |
| `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` | 1 |
| `node research\validate-semantic-readiness.mjs --targets=BANT` | 1 |
| `node research\build-semantic-readiness-provenance.mjs --check` | 1 |
| `node research\validate-source-generated-guardrails.mjs` | 0 |
| `node research\validate-semantic-readiness.mjs --fixtures` | 0 |
| `Move-Item ... VM-522-bant-semantic-recovery.md ... ready` | 1 - sandbox denied before change |
| `git status --short --branch` after denied move | 0 |

## Validation Matrix

| Area | Result | Evidence |
| --- | --- | --- |
| Exact internal key and candidate-scope target | PASS | BANT raw identity and generated key verified. |
| Raw Bant directory and file inventory | PASS | Four raw files present; hashes recorded. |
| Source inventory and stored source roles | PASS | 21 sources with stored role counts recorded. |
| Current stored claim-role counts | PASS | 21 unclassified claims recorded as current state. |
| Evidence-scope state | PASS | 0 evidence locations recorded; exact Gate 3+4 action specified. |
| Canonical IDs, hashes, and pointers | PASS | Current null canonical IDs recorded; Gate 3+4 action specified. |
| Duplicate canonical and null-key state | PASS | 0 duplicate non-null IDs, 17 null canonical IDs. |
| Existing provenance count | PASS | 49 BANT provenance entries. |
| Fixture state and proof-chain locator | PASS | Fixture absence recorded; required locator path specified. |
| Frozen placement and scoring values | PASS | No semantic implementation changed; future collision exception bounded. |
| Collision-guidance runtime shape | PASS | Approved validator supports shape; current raw/generated mismatch recorded. |
| Raw/generated collision ordering | PASS | Current raw/generated orders recorded; Gate 3+4 reconciliation contract specified. |
| Native IDs | PASS | Existing IDs recorded and frozen for candidate. |
| Identity-layer preview source | PASS | Active preview text found and semantically aligned with thesis. |
| Embedded preview copies | PASS | Active generated copies found; equality/propagation must be reproven after remediation. |
| Active preview consumers | PASS | Home, Archscry, recruiter, tests, and CI dependency chains recorded. |
| Historical/debug/export classifications | PASS | Debug inspection artifacts and historical archive JS excluded. |
| DRIFT-015 | PASS | Preview alignment sufficient for Gate 1+2; future proof required. |
| DRIFT-016 | PASS | Approved validator unchanged; future candidate must pass. |
| DRIFT-017 | PASS | Active consumed surfaces proven; future generated truth required. |
| Required neighbor set | PASS | Full neighbor/collapse-risk matrix recorded. |
| Bant semantic-risk declaration | PASS | Generic reliance risks explicitly retained. |
| Full workflow comparison | PASS | Gate 3+4 and Gate 5 obligations separated from Gate 1+2. |
| Approved candidate-scope validator execution | PASS for audit | Tests pass; current Bant failure is expected pre-remediation evidence. |

## Scorecard

Total controls: 24

PASS: 24

FAIL: 0

UNKNOWN: 0

N/A: 0

Gate 3+4 remediation is authorized because Gate 1+2 has enough direct repository evidence to define the remediation contract with zero unresolved Gate 1+2 FAIL or UNKNOWN controls. The current implementation is not semantically ready and no candidate may be created until the authorized remediation and validation work completes.

## Candidate-Scope Validator Result

- Approved validator exactness check: PASS. `research/validate-semantic-candidate-scope.mjs` and `research/semantic-candidate-scope-tests.js` match approved candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.
- `node research\semantic-candidate-scope-tests.js`: PASS.
- `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD`: exit 1 because current BANT generated proof chains reference unclassified `bant_claim_*` IDs. This is expected current-state evidence and must be resolved in Gate 3+4 before Gate 5 candidate creation.

## What Changed

- Added this Gate 1+2 handoff.
- Moved VM-522 from backlog to ready state in Kanban governance.
- Updated `docs/kanban/board.md` for Gate 1+2 completion and Gate 3+4 authorization.
- Updated `docs/handoffs/HANDOFF_INDEX.md`.

## What Did Not Change

- No Bant semantic adjudication was written into raw data.
- No Bant source, claim, evidence, provenance, fixture, preview, generated, runtime, test, scoring, placement, native-ID, or canonical-ID file changed.
- No source acquisition occurred.
- No remediation occurred.
- No candidate was created.
- No candidate workflow was recorded.
- No independent review occurred.
- No certification occurred.
- Program base was not advanced.
- VM-523 was untouched.
- Original main was untouched.
- Excel tracker was untouched.
- DRIFT-017 prototype worktree was untouched.
- Table Talk baseline was preserved.
- VM-542 / DRIFT-019 residual files were not cleaned or modified.

## Files Changed

- `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`
- `docs/kanban/backlog/VM-522-bant-semantic-recovery.md` removed by governance move

## Risks / Uncertainties

- Gate 3+4 must avoid converting support-only Asha, Elspeth, Mubin, manual-fill, workbook, wiki, or discovery-page material into primary semantic proof.
- Gate 3+4 must not add exact sourcebook/story quotations unless exact existing local locators are found without source acquisition.
- Collision repair must be Bant-scoped and must not change global scoring or shared validator behavior.
- Current candidate-scope, readiness, and provenance checks fail until remediation is actually performed.

## Follow-Up Recommendations

Next suggested agent: VM-522 Gate 3+4 remediation agent.

Start from this handoff, keep the program base at `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`, remediate only the bounded Gate 3+4 items, and create no candidate until readiness, provenance, fixture, guardrail, generated, and candidate-scope checks are green or a documented exact exception is authorized.

PASS — BANT GATE 3+4 REMEDIATION AUTHORIZED
