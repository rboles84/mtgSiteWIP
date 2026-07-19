# VM-522 Bant Preflight Stop-Line Resolution Rerun

Agent name: Codex
Task requested: Resolve eligible VM-522 Bant preflight stop-line blockers through read-only inspection, dependency tracing, authority reconciliation, evidence collection, and governance-only documentation, then rerun the complete Bant pre-identity drift preflight.

## Program And Identity

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-522 - Bant / WUG
- Branch: `codex/vm-522-bant-semantic-recovery`
- Worktree: `C:/dev/mtgSiteWIP-crit001-green-provenance-rereview`
- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Original stop commit: `62732685d31ce389e22e82d1331387b49e3e7345`
- Original stop handoff: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Original stop decision: `STOP - BANT GATE 1+2 NOT AUTHORIZED`
- Rerun decision: `STOP - BANT GATE 1+2 NOT AUTHORIZED`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-522-bant-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-516-simic-drift-preflight.md`
- `docs/incidents/recoveries/VM-517-white-drift-preflight-rerun.md`
- `docs/incidents/recoveries/VM-518-blue-drift-preflight.md`
- `docs/incidents/recoveries/VM-519-black-drift-preflight.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/recoveries/VM-521-green-drift-preflight.md`
- `docs/incidents/recoveries/VM-521-green-provenance-rereview.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `data/identity-layers.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `supabase/functions/guild-recruiter/index.ts`
- `assets/js/home.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/quick-reading-bias.js`
- `index.html`
- `archscry/index.html`
- `.github/workflows/validation.yml`
- `.github/workflows/browser-smoke.yml`
- `package.json`

## Files Changed

- `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/blocked/VM-522-bant-semantic-recovery.md`
- `docs/kanban/board.md`

No Bant raw, generated, fixture, provenance, preview, runtime, shared-validator, test, placement, scoring, source, claim, evidence, canonical-ID, or candidate workflow file was changed.

## Original Stop Commit Verification

- Current worktree path at start: `C:/dev/mtgSiteWIP-crit001-green-provenance-rereview`
- Current branch at start: `codex/vm-522-bant-semantic-recovery`
- Current HEAD at start: `62732685d31ce389e22e82d1331387b49e3e7345`
- Stop commit parent: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Exact program base commit subject: `VM-521 certify Green semantic readiness`
- Parent proof: `git merge-base --is-ancestor fa58e572b6303ba98b7e3015bcfa20e6d251ee6e 62732685d31ce389e22e82d1331387b49e3e7345` returned true.
- Stop commit file list:
  - `A docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
  - `M docs/handoffs/HANDOFF_INDEX.md`
  - `D docs/kanban/backlog/VM-522-bant-semantic-recovery.md`
  - `A docs/kanban/blocked/VM-522-bant-semantic-recovery.md`
  - `M docs/kanban/board.md`
- The stop commit contains only VM-522 governance files.
- `git diff --stat 62732685d31ce389e22e82d1331387b49e3e7345..HEAD` returned no changes at start.

## Original Blocking-Control List

1. Stored claim roles: all 21 Bant claims had null or missing stored semantic role fields.
2. Evidence scopes: Bant claims had no claim evidence locations and no evidence scopes.
3. Null canonical IDs: 17 BANT provenance entries had null canonical IDs.
4. Missing fixture: `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` did not exist.
5. Approved validator/candidate-scope proof-chain contamination: generated/provenance/key-figure/placement/recruiter chains referenced unclassified `bant_claim_*` records.
6. Raw/generated collision ordering mismatch: raw order and generated order were not equal; raw Naya/Jund were absent from generated collisions and generated lateral targets added ABZAN/TEMUR/SULTAI.
7. Required-neighbor coverage gaps: required neighbor set coverage remained unresolved for mono W/U/G, Jeskai, WUBRG, generic good-stuff, generic balance, generic overfit, Abzan, Temur, and related collapse-risk controls.
8. DRIFT-015 preview semantic alignment: preview ownership/equality was known, but semantic alignment could not be proven under null roles and incomplete proof chains.
9. DRIFT-016 structural-shape compatibility: raw array shape was accepted and WUG was rejected, but exact candidate-scope validation still failed for BANT.
10. DRIFT-017 active consumed-surface alignment: active provenance/generated consumers were known, but consumed-surface semantic alignment was not proven.

## Stop-Line Resolution Matrix

| Control ID | Control area | Original result | Exact original finding | Evidence originally missing or conflicting | Governing authority | Artifact or path involved | Resolution class | Permitted action | Evidence inspected now | New result | Remaining blocker | Required owner or campaign | Rerun eligibility |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VM522-BLOCK-001 | Stored claim roles | FAIL | 21 stored null claim roles | Stored role disposition absent | Contract v1.1, drift template | `data/raw-factions/bant/bant.claims.json` | Class C - Bant Implementation or Semantic Change Required | None in this prompt | `audit-semantic-readiness` and direct JSON inventory both report 21 unclassified/null claims | FAIL | Claim-role assignment requires Bant semantic recovery | VM-522 Gate 1+2 read-only audit may bound roles only after authorization; role writes require later remediation authorization | Not eligible for PASS |
| VM522-BLOCK-002 | Evidence scopes | FAIL | No claim evidence locations/evidence scopes | Evidence scope records absent | Contract v1.1, semantic readiness contract | `data/raw-factions/bant/bant.claims.json` | Class C - Bant Implementation or Semantic Change Required | None in this prompt | Direct inventory found evidenceLocations 0 and evidenceScope 0 | FAIL | Evidence-scope repair requires Bant evidence work | VM-522 remediation campaign after Gate 1+2 authorization | Not eligible for PASS |
| VM522-BLOCK-003 | Canonical IDs and provenance | FAIL | 17 null BANT provenance canonical IDs | Canonical provenance identifiers absent | Contract v1.1, drift template | `data/semantic-readiness-provenance.json` | Class C - Bant Implementation or Semantic Change Required | None in this prompt | Direct provenance inventory found nullCanonicalIndexes 70, 76-80, and 92-102 | FAIL | Canonical/provenance repair forbidden here | VM-522 provenance remediation after authorization | Not eligible for PASS |
| VM522-BLOCK-004 | Fixture state | FAIL | Bant semantic fixture missing | Fixture and proof-chain locators absent | Contract v1.1, Gate 1+2 controls | `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` | Class C - Bant Implementation or Semantic Change Required | None in this prompt | Direct file inventory found fixture exists false; fixture glob found no Bant fixture | FAIL | Fixture creation/repair forbidden here | VM-522 remediation after Gate 1+2 | Not eligible for PASS |
| VM522-BLOCK-005 | Candidate-scope validation | FAIL | Approved validator exits 1 from unclassified `bant_claim_*` proof chains | Clean exact-scope proof chains absent | Contract v1.1, approved validator candidate `aa1f5cd...`, approval `af3d8c6...` | `research/validate-semantic-candidate-scope.mjs` and Bant generated consumers | Class C - Bant Implementation or Semantic Change Required | Existing validator may be run read-only | Validator unchanged since approved SHA; validator tests pass; `--identity=bant --base=fa58e572... --target=HEAD` exits 1 | FAIL | Underlying claim roles/proof chains remain contaminated | VM-522 semantic recovery; no shared validator change indicated | Not eligible for PASS |
| VM522-BLOCK-006 | Collision guidance | FAIL | Raw order/targets and generated order/targets differ | Raw/generated reconciliation absent | Contract v1.1, DRIFT-016 | `data/raw-factions/bant/bant.placement.json`, `data/placement-model.json` | Class C - Bant Implementation or Semantic Change Required | None in this prompt | Inventory confirmed raw Azorius/Selesnya/Simic/Naya/Esper/Grixis/Jund order; generated WU/WG/UG/ESPER/GRIXIS plus lateral ABZAN/TEMUR/SULTAI | FAIL | Collision guidance reconciliation forbidden here | VM-522 remediation or later generation campaign | Not eligible for PASS |
| VM522-BLOCK-007 | Required neighbors and collapse risk | FAIL | Required neighbor coverage unresolved/absent for required mono, shard, five-color, and generic risks | Complete required-neighbor proof absent | Drift template, user-specified rerun coverage | Bant raw/generated collision/provenance/fixtures | Class C - Bant Implementation or Semantic Change Required | Read inventory only | Inventory confirms explicit raw/generated coverage for Azorius/WU, Selesnya/WG, Simic/UG, Naya, Esper, Grixis, Jund and lateral ABZAN/TEMUR/SULTAI, but not the full required set | FAIL | Missing/generic neighbor coverage requires semantic boundary work and fixtures | VM-522 Gate 1+2 may audit later; remediation must be separate | Not eligible for PASS |
| VM522-BLOCK-008 | DRIFT-015 preview alignment | UNKNOWN/FAIL | Preview ownership/equality known, semantic alignment not proven | Active dependency and semantic proof confidence incomplete | DRIFT-015, drift template | `data/identity-layers.json`, `data/factions.json`, `assets/js/home.js`, `assets/js/index.js` | Class C - Bant Implementation or Semantic Change Required | Dependency tracing and governance explanation only | Source/embedded preview hashes match and active consumers are directly proven, but semantic alignment remains unproven because roles/evidence/fixtures fail | UNKNOWN/FAIL | Preview semantic alignment cannot be approved without Bant semantic proof | VM-522 semantic recovery after authorization | Not eligible for PASS |
| VM522-BLOCK-009 | DRIFT-016 structural-shape compatibility | FAIL | Array shape accepted and WUG rejected, but BANT candidate-scope failed | Exact no-change candidate-scope success absent | DRIFT-016, approved validator | Bant raw placement, validator | Class C - Bant Implementation or Semantic Change Required | Read-only validator execution | BANT shape does not crash; `--identity=WUG` exits unknown identity as expected; BANT exact-scope validation still exits 1 | FAIL | Candidate-scope failure persists | VM-522 semantic recovery; no shared infrastructure owner required now | Not eligible for PASS |
| VM522-BLOCK-010 | DRIFT-017 active consumed-surface alignment | UNKNOWN/FAIL | Active provenance/generated truth could not be approved | Direct active dependencies and semantic alignment proof incomplete | DRIFT-017, drift template | Runtime, generated, recruiter, tests, workflows | Class C - Bant Implementation or Semantic Change Required | Dependency tracing and governance explanation only | Direct consumer chains are now proven for Home, Archscry, recruiter, placement tests, and CI; semantic alignment remains unproven because proof chains fail | UNKNOWN/FAIL | Consumed-surface semantic alignment still requires Bant semantic/proof-chain repair | VM-522 semantic recovery after authorization | Not eligible for PASS |
| VM522-RERUN-001 | Generated provenance freshness | New rerun blocker | Not separately recorded in original stop matrix | Generated provenance check status not captured | Contract v1.1, provenance controls | `data/semantic-readiness-provenance.json` | Class C - Bant Implementation or Semantic Change Required | Existing read-only check only | `node research/build-semantic-readiness-provenance.mjs --check` exits 1: provenance is stale | FAIL | Provenance regeneration/repair is forbidden by this prompt | VM-522 remediation after Gate 1+2, or separate provenance campaign if governance later requires | Not eligible for PASS |

## Disposition Counts

- Class A - Read-Only Evidence Gap: 0 full original blocking controls retired.
- Class B - Governance Clarification Gap: 0 full original blocking controls retired.
- Class C - Bant Implementation or Semantic Change Required: 10 original blocking controls plus 1 new rerun blocker.
- Class D - Shared Infrastructure or Program-Governance Change Required: 0. The approved validator is operating as designed.
- Class E - Invalid or Superseded Original Finding: 0 original blocking controls. The prior DRIFT-019 debug/archive exclusions remain valid but were not original blockers.

Eligible read-only sub-findings resolved during this rerun:

- Active runtime/build/test consumer dependency chains were proven directly.
- Historical/debug/inspection/archive exclusions were rechecked and retained.
- Preview source/embedded equality and ownership were reverified.
- WUG was confirmed to be an invalid candidate-scope target while BANT is the valid internal key.

No original blocking control was fully resolved to PASS.

## Evidence Collected

### Identity, Inventory, And Frozen Fields

- Internal key: `BANT`
- Raw ID: `bant`
- WUG candidate-scope target: invalid; validator reports `Error: Unknown identity WUG`.
- Raw files and hashes:
  - `bant.claims.json`: sha256 `572a4dfe5510d440d941131e45930883ee104014caec32afd36c3f188d1c7499`
  - `bant.sources.json`: sha256 `7f9e58500d994b524dce6d714bf9da0da278e28425f0d73f6bc94359490f22ac`
  - `bant.profile.json`: sha256 `4c30cee6ece983b6fee55b7a916d38bb20d170fe091c0c3619552820d34b5e3a`
  - `bant.placement.json`: sha256 `ccbfc1cccfdbbe2c27298789f6706f352503d5af5b4f50bca10ef5c521742521`
  - `bant.changelog.json`: sha256 `0e5f1c061c55237e61e20b7948229f8609d54debb1a30613fb06522968039e38`
- Generated/support hashes:
  - `data/factions.json`: sha256 `310f910f5231508816a9391b1684a4c532d692a575f1ef154daccd030cc13633`
  - `data/placement-model.json`: sha256 `26077c23d44cf7db43794a40d825c05aa78103e3ced576602ef6847b92260599`
  - `data/semantic-readiness-provenance.json`: sha256 `dd093d8ed6bedebe9683d445b877f0eef91edb4c08323e51156fb4519b60a548`
  - `data/identity-layers.json`: sha256 `8eb2be2cbb2702c6a51f6ad4214e9d0f27221c8ffd9ac32a19ac59bdd5f4023c`
  - `supabase/functions/guild-recruiter/faction-context.ts`: sha256 `4d75d0a476ff78315054530fe8f9c7a18e4aac29fb8835cfea175152901f8fb3`
- Claim count: 21.
- Stored claim role counts: 21 unclassified/null.
- Source count: 21.
- Stored source role counts: 3 claim-bearing, 1 discovery-only, 7 shaping-only, 10 support-only.
- Evidence locations: 0.
- Evidence scopes: 0.
- Provenance count: 49.
- Null provenance canonical IDs: 17.
- Duplicate provenance canonical IDs: none detected.
- Frozen colors: W, U, G.
- Frozen placement axes captured:
  - `axis_communal_order_vs_private_excellence`: 82, confidence Medium
  - `axis_champion_focus_vs_go_wide_belonging`: 78, confidence Medium
  - `axis_refined_order_vs_instinctive_growth`: 74, confidence Medium
  - `axis_protection_vs_prison`: 70, confidence Medium
  - `axis_living_community_vs_artificial_perfection`: 76, confidence Medium
- Native ID count: 75.

### Active Consumer Direct Dependency Evidence

- Home route:
  - `index.html` includes `./assets/js/home.js`.
  - `assets/js/home.js` defines `heroManaPreviewUrl = "./data/identity-layers.json"` and fetches it.
  - `assets/js/home.js` defines `heroManaLoreUrl = "./data/factions.json"` and fetches it.
- Archscry route:
  - `archscry/index.html` includes module `../assets/js/index.js`.
  - `assets/js/index.js` fetches `factions.json`, `placement-model.json`, and `identity-layers.json`.
- Recruiter:
  - `supabase/functions/guild-recruiter/index.ts` imports `FACTION_CONTEXT` from `./faction-context.ts`.
  - The function indexes `FACTION_CONTEXT[result.faction]` and serializes `FACTION_CONTEXT` into the prompt context.
- Tests and CI:
  - `package.json` defines `test:placement`, `test:semantic-readiness`, and source/generated validation scripts.
  - `.github/workflows/validation.yml` runs validation and placement tests.
  - `assets/js/quick-reading-tests.js` reads `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.

Direct dependency classification resolved for active consumers, but alignment approval still fails because the consumed Bant truth depends on unclassified claim proof chains, missing evidence scopes, missing fixture, and null provenance IDs.

### Historical, Debug, Inspection, Export, And Archive Exclusions

The Green-era classifications remain retained because no direct active runtime, build, test, or deployment dependency evidence was found.

- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`: `DEBUG_INSPECTION_ARTIFACT`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`: `DEBUG_INSPECTION_ARTIFACT`
- `assets/js/newindex-color-matrix.js`: `HISTORICAL_ARCHIVE`
- `assets/js/color-matrix-radar.js`: `HISTORICAL_ARCHIVE`

Read-only scan result: `rg -n "newindex-color-matrix|color-matrix-radar|inspect\.ndjson" --glob "*.html" --glob "*.js" --glob "*.mjs" --glob "*.json" --glob "*.yml" --glob "*.yaml" --glob "!docs/**" --glob "!outputs/**" --glob "!.git/**"` found only a self-reference inside `assets/js/color-matrix-radar.js` and no active inclusion/import/build/test/workflow consumer.

## Full Rerun Validation Matrix

| ID | Control | Result | Evidence |
| --- | --- | --- | --- |
| RERUN-001 | Correct branch and starting HEAD | PASS | Branch `codex/vm-522-bant-semantic-recovery`, HEAD `62732685d31ce389e22e82d1331387b49e3e7345` |
| RERUN-002 | Program base ancestry | PASS | Stop commit parent is exact base `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e` |
| RERUN-003 | Stop commit governance-only | PASS | Stop commit file list contains only VM-522 governance docs/card/board/index |
| RERUN-004 | Worktree clean before edits | PASS | Start status clean on VM-522 worktree |
| RERUN-005 | Original main untouched | PASS | Original-main status inspected read-only and not modified |
| RERUN-006 | DRIFT-017 prototype untouched | PASS | Prototype worktree status inspected from outside only and not modified |
| RERUN-007 | Table Talk baseline preserved | PASS | Known baseline remains in separate worktree and was not staged or edited |
| RERUN-008 | Approved validator unchanged | PASS | Diff from approved candidate for validator/test files is empty |
| RERUN-009 | Valid candidate-scope target | PASS | `BANT` is the valid key; `WUG` is rejected as unknown |
| RERUN-010 | Raw Bant file inventory | PASS | Five raw Bant files present with hashes captured |
| RERUN-011 | Source inventory and stored roles | PASS | 21 sources; stored source role counts captured |
| RERUN-012 | Stored claim roles complete | FAIL | 21 claims remain unclassified/null |
| RERUN-013 | Evidence scopes complete | FAIL | 0 evidence locations and 0 evidence scopes |
| RERUN-014 | Source reference integrity | PASS | Audit reports no missing references |
| RERUN-015 | Canonical IDs and pointers | FAIL | 17 null provenance canonical IDs |
| RERUN-016 | Existing generated-consumer locators | PASS | Factions, placement, and recruiter generated consumer locators captured |
| RERUN-017 | Generated provenance freshness | FAIL | `build-semantic-readiness-provenance --check` exits stale |
| RERUN-018 | Fixture state and proof-chain locator | FAIL | Bant fixture file is missing |
| RERUN-019 | Approved candidate-scope validation | FAIL | Validator exits 1 for BANT due unclassified proof chains |
| RERUN-020 | Frozen fields captured | PASS | Colors, placement axes, values, confidence, calibration terms, and quality captured |
| RERUN-021 | Native IDs inventoried | PASS | Native ID count 75 |
| RERUN-022 | Raw collision guidance shape | PASS | Bant raw collision guidance is array-shaped and readable |
| RERUN-023 | Raw/generated collision ordering and targets | FAIL | Raw and generated collision/lateral target sets differ |
| RERUN-024 | Required neighbor coverage | FAIL | Full required set is not proven in current raw/generated/fixture state |
| RERUN-025 | Semantic-risk declaration retained | PASS | Required future-risk list recorded as inventory and authorization control only |
| RERUN-026 | Preview source/embedded equality | PASS | Source and embedded preview hashes match |
| RERUN-027 | Preview semantic alignment | UNKNOWN | Alignment cannot be proven without roles/evidence/fixtures |
| RERUN-028 | Active consumer direct dependencies | PASS | Home, Archscry, recruiter, tests, and CI chains directly proven |
| RERUN-029 | DRIFT-015 | FAIL | Preview equality passes, semantic alignment remains unproven |
| RERUN-030 | DRIFT-016 | FAIL | Shape support passes, exact candidate-scope validation fails |
| RERUN-031 | DRIFT-017 | FAIL | Active dependency proof passes, consumed-surface semantic alignment remains unproven |
| RERUN-032 | DRIFT-019 historical/debug exclusions | PASS | Debug/inspection/archive classifications retained with no active dependency evidence |
| RERUN-033 | Historical copied text not promoted to active consumer | PASS | Matching strings alone were not used as dependency proof |
| RERUN-034 | Bant boundary semantic sufficiency | UNKNOWN | Semantic sufficiency is not adjudicated or provable in preflight |
| RERUN-035 | Gate 1+2 authorization | FAIL | Blocking FAIL and UNKNOWN controls remain |

Scorecard:

- Total: 35
- PASS: 21
- FAIL: 12
- UNKNOWN: 2
- N/A: 0

## Candidate-Scope Validator Result

- Approved validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
- Validator approval record: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
- Current validator state: unchanged from approved candidate for `research/validate-semantic-candidate-scope.mjs` and `research/semantic-candidate-scope-tests.js`.
- Unit validation: `node research/semantic-candidate-scope-tests.js` exited 0 with `Semantic candidate scope tests passed.`
- BANT exact no-change validation: `node research/validate-semantic-candidate-scope.mjs --identity=bant --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` exited 1 from unclassified Bant proof chains.
- WUG target check: `node research/validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` exited 1 with `Error: Unknown identity WUG`.

## DRIFT Results

- DRIFT-015 result: FAIL for authorization. Preview ownership/equality is proven, but semantic alignment remains UNKNOWN and cannot pass with null claim roles, missing evidence scopes, missing fixtures, and candidate-scope failure.
- DRIFT-016 result: FAIL. Bant raw collision shape is readable and WUG is rejected, but exact BANT candidate-scope validation still fails under the approved validator.
- DRIFT-017 result: FAIL. Active consumed surfaces are now directly proven, but consumed-surface semantic alignment cannot be approved while proof chains reference unclassified Bant claims and fixture/provenance blockers remain.
- DRIFT-019 result: PASS for exclusion. Debug inspection artifacts and historical archive JS remain non-active classifications.

## Required Neighbor And Semantic-Risk Declaration

The rerun retained the required inventory-only risk declaration and did not adjudicate Bant identity boundaries.

Required future checks remain at least:

- Selesnya / WG
- Simic / UG
- Azorius / WU
- Green / G
- White / W
- Blue / U
- Naya
- Esper
- Temur
- Abzan
- Jeskai
- Five-color / WUBRG
- Generic good-stuff
- Generic balance
- Generic overfit

Future tests must explicitly protect against generic reliance on: Order, Community, Nature, Knowledge, Growth, Harmony, Hierarchy, Civilization, Perfection, Protection, Wisdom, Peace, Cooperation, "the best of White, Blue, and Green", creature mechanics, exalted mechanics, Angels, Knights, Beasts, and shard aesthetics.

Current result: FAIL for authorization because the full required neighbor and collapse-risk set is not proven in current raw/generated/fixture state.

## Commands Run

- `git worktree list --porcelain` - exit 0
- `git status --short --branch` in VM-522 worktree - exit 0
- `git rev-parse --show-toplevel` - exit 0
- `git rev-parse --abbrev-ref HEAD` - exit 0
- `git rev-parse HEAD` - exit 0
- `git diff --stat 62732685d31ce389e22e82d1331387b49e3e7345..HEAD` - exit 0
- `git show --no-patch --format="%H%n%P%n%s%n%ci" 62732685d31ce389e22e82d1331387b49e3e7345` - exit 0
- `git show --no-patch --format="%H%n%P%n%s%n%ci" fa58e572b6303ba98b7e3015bcfa20e6d251ee6e` - exit 0
- `git merge-base --is-ancestor fa58e572b6303ba98b7e3015bcfa20e6d251ee6e 62732685d31ce389e22e82d1331387b49e3e7345` - exit 0
- `git diff-tree --no-commit-id --name-status -r 62732685d31ce389e22e82d1331387b49e3e7345` - exit 0
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short --branch` - exit 0
- `git -C C:\dev\mtgSiteWIP-crit001-drift017 status --short --branch` - exit 128, refused for dubious ownership
- `git -C C:\dev\mtgSiteWIP-crit001-drift017 -c safe.directory=C:/dev/mtgSiteWIP-crit001-drift017 status --short --branch` - exit 0
- `git -C C:\dev\mtgSiteWIP-crit001 status --short --branch` - exit 0
- `rg --files -g AGENTS.md` - exit 0
- `Get-Content` reads of stop handoff, blocked card, board, index, governing docs, validator files, and prior VM-516 through VM-521 records - exit 0
- `git show --stat --oneline aa62ac329c53c00016dcce749b5fea73b145d4ac` - exit 0
- `git show --stat --oneline ec148486ff2442ff2e3145dd9d45a6d993179766` - exit 0
- `git show --stat --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` - exit 0
- `git show --stat --oneline af3d8c6c563b3743f65c2dc8478519707f4785c8` - exit 0
- `rg -n "BANT|bant|WUG|identity-layers|factions.json|placement-model|FACTION_CONTEXT|semantic-readiness-provenance" data research assets supabase index.html archscry .github package.json` - exit 0
- `node research/audit-semantic-readiness.mjs --identity=bant` - exit 1, invalid option
- `node research/audit-semantic-readiness.mjs --targets=BANT` - exit 0
- `node research/semantic-candidate-scope-tests.js` - exit 0
- `node research/validate-semantic-readiness.mjs --fixtures` - exit 0
- `node research/build-semantic-readiness-provenance.mjs --check` - exit 1
- `node research/validate-source-generated-guardrails.mjs` - exit 0 with 2 JESKAI/MARDU warnings
- `node research/validate-semantic-candidate-scope.mjs --identity=bant --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` - exit 1
- `node research/validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` - exit 1
- `node research/validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` - exit 1
- `node` read-only inventory/hash/provenance/frozen-field script - exit 0
- `rg -n "newindex-color-matrix|color-matrix-radar|inspect\.ndjson" --glob "*.html" --glob "*.js" --glob "*.mjs" --glob "*.json" --glob "*.yml" --glob "*.yaml" --glob "!docs/**" --glob "!outputs/**" --glob "!.git/**"` - exit 0
- `rg -n "VM-523" docs/kanban docs/incidents docs/handoffs/HANDOFF_INDEX.md` - exit 0
- `Get-Date -Format yyyy-MM-dd-HHmm` - exit 0

## Proof Of Scope Preservation

- No Bant semantic adjudication occurred.
- No Bant semantic or implementation data changed.
- No source-role, claim-role, evidence-role, canonical-ID, provenance, fixture, raw data, generated data, placement, scoring, collision-guidance, native-ID, preview, embedded-preview, runtime, shared-validator, or test file changed.
- No Gate 1+2 audit occurred.
- No remediation occurred.
- No candidate was created.
- No independent review occurred.
- No certification occurred.
- Program base was not advanced.
- VM-523 was untouched except for read-only search of existing references.
- Original main `C:\dev\mtgSiteWIP` was inspected read-only and untouched.
- Excel tracker was untouched; no Excel connector, workbook, tracker file, or spreadsheet action was used.
- DRIFT-017 prototype worktree `C:\dev\mtgSiteWIP-crit001-drift017` was inspected from outside with `git -C` only and untouched.
- Table Talk baseline in `C:\dev\mtgSiteWIP-crit001` was preserved and not staged.
- VM-542 / DRIFT-019 residual files were not cleaned, modified, regenerated, promoted, or deleted.

## What Changed

Governance-only records were added/updated to preserve the original stop, record the rerun evidence, and keep VM-522 blocked with exact remaining blockers. The board and blocked card now distinguish direct dependency evidence that was resolved from unresolved semantic/provenance/fixture/collision blockers.

## Why It Changed

The user requested a full rerun after stop-line resolution. Read-only evidence resolved active consumer classification and retained historical/debug exclusions, but the complete preflight still has blocking FAIL/UNKNOWN controls. Governance needed to record the rerun without altering the original stop commit.

## Decisions Made

- Final decision remains STOP.
- The approved candidate-scope validator is used as-is; no shared infrastructure change is required or authorized.
- Active runtime/build/test consumers are directly proven, but that proof does not establish Bant semantic alignment.
- The stale provenance check is recorded as an additional rerun blocker because repairing generated provenance is outside this prompt.
- Historical/debug/inspection/archive files remain non-active classifications absent direct dependency evidence.

## Risks / Uncertainties

- Bant cannot pass preflight until claim roles, evidence scopes, fixture/proof-chain locators, provenance canonical IDs, candidate-scope validation, collision guidance, required-neighbor coverage, and consumed-surface semantic alignment are resolved under the proper recovery gates.
- `node research/build-semantic-readiness-provenance.mjs --check` reports stale provenance; this prompt did not authorize regeneration.
- Preview text equality is proven, but semantic alignment remains UNKNOWN.

## Tests Run

- `node research/audit-semantic-readiness.mjs --targets=BANT` - exit 0.
- `node research/semantic-candidate-scope-tests.js` - exit 0.
- `node research/validate-semantic-readiness.mjs --fixtures` - exit 0 for existing contract fixtures; Bant fixture remains missing.
- `node research/build-semantic-readiness-provenance.mjs --check` - exit 1, stale provenance.
- `node research/validate-source-generated-guardrails.mjs` - exit 0 with 2 warnings.
- `node research/validate-semantic-candidate-scope.mjs --identity=bant --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` - exit 1.
- `node research/validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` - exit 1.
- `node research/validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` - exit 1, unknown identity.

## Not Touched

- `C:\dev\mtgSiteWIP`
- `C:\dev\mtgSiteWIP-crit001-drift017`
- Excel tracker
- VM-523 files
- VM-542 / DRIFT-019 residual files
- Table Talk baseline files
- Bant raw/generated/provenance/fixture/preview/runtime/test/shared-validator files

## Follow-Up Recommendations

- Keep VM-522 blocked until a separate governance decision authorizes Gate 1+2 or a bounded campaign for the remaining Class C blockers.
- Gate 1+2, when authorized, should remain read-only and should produce a bounded role/evidence/provenance/fixture/collision/neighbor disposition before any remediation.
- Do not start VM-523 semantic work before Bant certification.

## Next Suggested Agent

Planning Architect or Kanban Steward for a separate governance unblock decision; VM-522 semantic recovery agent only after Gate 1+2 is authorized.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/blocked/VM-522-bant-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/reference/semantic-readiness-contract.md`

STOP — BANT GATE 1+2 NOT AUTHORIZED
