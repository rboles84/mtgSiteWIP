# VM-528 Temur Independent Exact-SHA Review

Agent name: Codex

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: VM-528 / Temur
Canonical identity: TEMUR
Display color order: GUR

Task requested: Perform a fresh independent exact-SHA review of candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`, using a dedicated review branch/worktree from the fully resolved workflow commit, without modifying candidate content, creating a replacement candidate, certifying Temur, starting VM-529, updating Excel, pushing, merging, or opening a PR.

## Exact Decision

APPROVE EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc

## Independence Statement

This review ran in a new review branch and worktree. It reviewed exact candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc` only. The workflow commit, drift-preflight commit, Gate 1+2 governance commit, branch head, and implementation summaries were not treated as approval authority. No remediation, replacement candidate, or certification occurred.

## Object Ledger

- Review worktree: `C:\dev\mtgSiteWIP-crit001-vm528-temur-independent-review`
- Review branch: `codex/vm-528-temur-semantic-recovery-independent-review`
- Resolved workflow prefix `3e05170`: `3e05170dde802a135182c80af641c72962ddcba8`
- Workflow prefix uniqueness: exactly one local/ref commit matched `3e05170` via `git rev-list --all`.
- Starting HEAD: `3e05170dde802a135182c80af641c72962ddcba8`
- Workflow subject: `VM-528: record Temur candidate workflow`
- Workflow parent list: `790fca923c504e32911e0be0eb44f7fdbcfb07dc`
- Program base / VM-527 Abzan certification: `a1632337ebc91950b37d835ac404fba414f770c7`
- VM-528 drift preflight: `20c9413f39273bf76a11c4fdddb2163dd61c8037`
- VM-528 Gate 1+2 governance: `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`
- Exact assigned candidate: `790fca923c504e32911e0be0eb44f7fdbcfb07dc`
- Independent-review commit: pending at handoff write time; this review commit must be governance-only and descend directly from `3e05170dde802a135182c80af641c72962ddcba8`.

## Setup And Protected Worktrees

- Branch collision: none for `codex/vm-528-temur-semantic-recovery-independent-review`.
- Worktree path collision: none for `C:\dev\mtgSiteWIP-crit001-vm528-temur-independent-review`.
- Candidate worktree `C:\dev\mtgSiteWIP-crit001-vm528-temur`: clean before and after review setup.
- Original main preserved with existing dirty files only.
- Long-running CRIT/Table Talk baseline preserved with existing handoff-index modification and two untracked Table Talk handoffs.
- DRIFT-017 preserved with existing prototype modifications to `research/semantic-candidate-scope-tests.js` and `research/validate-semantic-candidate-scope.mjs`; those uncommitted files were not read or used.
- VM-527 review worktree clean; VM-526 certification worktree clean in registered status.
- VM-529 remained backlog/not started.

## Governing Authority Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- VM-522 through VM-527 precedent handoff/index summaries
- VM-528 drift-preflight, Gate 1+2, and candidate-workflow handoffs
- Candidate-scope validator/tests, semantic-readiness validator/tests, source/generated guardrails, provenance builder, faction artifact builder, package/lockfile authority
- Temur raw claims, sources, profile, placement, fixtures, generated consumers, provenance, and identity-layer surfaces

## Complete Ancestry

Reconstructed with `git log --oneline --parents --ancestry-path a1632337ebc91950b37d835ac404fba414f770c7..3e05170dde802a135182c80af641c72962ddcba8`:

- `20c9413f39273bf76a11c4fdddb2163dd61c8037` parent `a1632337ebc91950b37d835ac404fba414f770c7` - VM-528 drift preflight governance.
- `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e` parent `20c9413f39273bf76a11c4fdddb2163dd61c8037` - Gate 1+2 governance.
- `790fca923c504e32911e0be0eb44f7fdbcfb07dc` parent `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e` - exact semantic candidate.
- `3e05170dde802a135182c80af641c72962ddcba8` parent `790fca923c504e32911e0be0eb44f7fdbcfb07dc` - candidate workflow governance.

No intervening commit, failed Temur candidate, superseded Temur candidate, alternate review, approval, or certification object was found.

## Candidate Diff And Path Classification

Base-to-candidate range: `a1632337ebc91950b37d835ac404fba414f770c7..790fca923c504e32911e0be0eb44f7fdbcfb07dc`.

Changed path list and classification:

- `data/factions.json` - TEMUR generated consumer.
- `data/raw-factions/temur/temur.claims.json` - TEMUR authoritative claims.
- `data/raw-factions/temur/temur.placement.json` - TEMUR placement and recruiter guidance evidence.
- `data/raw-factions/temur/temur.profile.json` - TEMUR profile and auxiliary Commander support isolation.
- `data/semantic-readiness-provenance.json` - TEMUR provenance.
- `research/fixtures/semantic-readiness/temur.semantic-fixtures.json` - TEMUR fixture.
- Drift/Gate 1+2 governance files in ancestry - permitted governance before candidate.

Candidate commit-only range `790fca923c504e32911e0be0eb44f7fdbcfb07dc^..790fca923c504e32911e0be0eb44f7fdbcfb07dc` changed exactly six candidate paths: the five TEMUR/generated/provenance files above plus the TEMUR fixture. No package, lockfile, CI, validator, parser, generator, schema behavior, identity-layer preview, runtime, other identity raw file, or VM-529 file changed.

Post-candidate range `790fca923c504e32911e0be0eb44f7fdbcfb07dc..3e05170dde802a135182c80af641c72962ddcba8` changed governance-only paths: workflow handoff, handoff index, board, VM-528 card, and CRIT ledger markdown/JSON. No semantic/generated/profile/placement/fixture/provenance/runtime/test path changed after the candidate.

Base-to-candidate stats: 14 files, 1654 insertions, 132 deletions including drift/Gate 1+2 governance ancestry. Candidate-only stats: 6 files, 1146 insertions, 65 deletions.

Unexpected path result: PASS. Governance-contamination result: PASS. Candidate/workflow separation: PASS.

## Temur Semantic Review

- Canonical key: TEMUR.
- Display color order: GUR metadata only.
- Runtime aliases: `[TEMUR]`; `GUR`, `URG`, and `RGU` fail closed.
- Raw claims: 11.
- Substantive claims: 10.
- Discovery claims: 0.
- Support records: 1.
- Unclassified claims: 0.
- Source inventory: 21 total; 9 claim-bearing, 8 shaping-only, 4 support-only.
- Evidence locators: every substantive claim has bounded `evidence_locations`; evidence-location source IDs exactly match claim `source_ids`.
- Support isolation: `temur_claim_0011` appears only in Commander-compass source-basis fields with `evidence_use: auxiliary_support`.
- Source-locator conclusion: PASS. Locators are bounded to evidence ledger rows or named official/local captures and do not overclaim exact card facts, Commander legality, broad metagame/popularity, or unsupported lore.
- Semantic-role conclusion: PASS. Claims 0001-0010 are substantive; claim 0011 is support-only product/navigation.
- Claim/source conclusion: PASS. Claim statements are bounded to Green-centered GUR Temur identity, Rosewater design commentary, Khans/Fate/Dragons/Khanfall/Dragonstorm source captures, and explicit false-positive guardrails.

## Boundary Review

Positive Temur discriminators: Green-centered GUR identity, savagery as inner strength, mental fortitude, instinct, Qal Sisma survival, shamanic listening, elemental memory, timeline-labeled Dragonstorm Temur, and Atarka/generic/product exclusions.

Boundary conclusions:

- Generic GUR: PASS; color composition alone is repeatedly rejected.
- Simic / UG: PASS; Blue-Green adaptation alone is not sufficient without Red action and Temur survival context.
- Izzet / UR: PASS; generic spell/copy behavior is rejected as insufficient.
- Gruul / RG: PASS; Red-Green ferocity/combat without Blue mental fortitude is rejected.
- Bant: PASS; public honor/order is not Temur survival instinct.
- Jund: PASS; appetite/dominance is separated from attuned survival.
- Naya: PASS; abundance/belonging is separated from Qal Sisma pressure and mental fortitude.
- Sultai: PASS; resource conversion/death/opportunity are separated from living-world attunement.
- Jeskai: PASS; trained monastery discipline is separated from land/body/ancestral listening.
- Commander/generic ramp/large creatures/combat/spells: PASS; fixtures and guidance reject them as sufficient proof.

## Profile, Placement, Preview, Fixtures, Generated, Provenance

- Profile conclusion: PASS; Temur-local owner IDs repaired and support-only Commander fields isolated.
- Placement conclusion: PASS; three discriminator questions and three collision guidance entries preserve Sultai/Mardu/Jeskai nearest boundaries.
- Recruiter conclusion: PASS; every chatbot guidance row has semantic guidance evidence.
- Frozen-field conclusion: PASS; identity key, GUR metadata, runtime status, placement eligibility/live pilot flags, calibration/scoring/confidence behavior, and identity-layer preview were not drifted.
- Preview result: PASS; `data/identity-layers.json#/expressions/TEMUR/preview_text` equals embedded `data/factions.json#/identity_layers/expressions/TEMUR/preview_text`; candidate did not modify `data/identity-layers.json`.
- Fixture result: PASS; 24 fixtures total: 1 core inclusion, 1 pressure, 1 nearest ambiguity, 20 required-neighbor exclusions, 1 provenance.
- Generated/source result: PASS; TEMUR exists in `data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts`; total identity counts remain 37.
- Provenance result: PASS; 44 TEMUR entries across profile and placement, zero null canonical IDs, zero missing hashes, zero missing generated consumers.

## Validation Record

Review worktree commands:

- `node research/validate-semantic-readiness.mjs --targets=TEMUR`: exit 0 PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=TEMUR`: exit 0 PASS.
- `node research/validate-source-generated-guardrails.mjs --targets=TEMUR`: exit 0 PASS with one known model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=a1632337ebc91950b37d835ac404fba414f770c7 --target=790fca923c504e32911e0be0eb44f7fdbcfb07dc --identity=TEMUR`: exit 0 PASS.
- `node research/semantic-candidate-scope-tests.js`: exit 0 PASS.
- Alias checks: `GUR`, `URG`, `RGU` each exit 1 with `Unknown identity ...`, expected PASS.
- Neighbor target `SULTAI`: exit 1 with non-identity Temur path and Sultai unclassified proof-chain errors, expected PASS.
- `npm.cmd run test:parser`: exit 0 PASS, 226 parser cases.

Exact detached worktree: `C:\dev\mtgSiteWIP-crit001-vm528-temur-exact-test`, created with `git worktree add --detach ... 790fca923c504e32911e0be0eb44f7fdbcfb07dc`.

Dependency/corpus setup:

- `xlsx` declaration: `devDependencies.xlsx = ^0.18.5`.
- Lockfile entry: `node_modules/xlsx` version `0.18.5`, dev true, registry tarball and integrity recorded.
- Program base and candidate both contain the same xlsx package/lock authority.
- Candidate changed no package, lockfile, npm config, test script, or `research/import-precon-mechanics-validation.mjs`.
- npm config: `omit` blank, `optional` null, `include` blank.
- Dependency command: `npm.cmd ci`, exit 0; no tracked dependency files changed.
- Scryfall corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`, 206425820 bytes.
- Corpus target: `C:\dev\mtgSiteWIP-crit001-vm528-temur-exact-test\data\scryfall\raw\oracle-cards.json`.
- Method: hardlink.
- Ignored-input justification: `.gitignore:36 data/scryfall/raw/*.json`; corpus and `node_modules/` remained ignored and unstaged.

Exact-tree commands:

- `npm.cmd ci`: exit 0, installed 217 packages; audit reports 19 inherited vulnerabilities, no candidate dependency change.
- `npm.cmd test`: exit 0 PASS.
- `npm.cmd run test:semantic-readiness`: initially tripped a no-content Windows line-ending/index stale provenance check; after regenerating in the disposable exact-test tree and refreshing no-diff index state, rerun exit 0 PASS with `Verified 2029 semantic provenance entries`. No raw/text diff was produced.
- `npm.cmd run test:placement`: exit 0 PASS.
- `npm.cmd run test:faction-context-isolation`: exit 0 PASS.
- `npm.cmd run test:source-generated`: exit 0 PASS for repository default targets JESKAI/MARDU with known model-owned warnings.
- Exact-tree `node research/validate-semantic-candidate-scope.mjs --base=a1632337ebc91950b37d835ac404fba414f770c7 --target=790fca923c504e32911e0be0eb44f7fdbcfb07dc --identity=TEMUR`: exit 0 PASS.
- Generator idempotence: `node research/build-faction-artifacts.mjs` and `node research/build-semantic-readiness-provenance.mjs` completed; raw/text diffs empty, only Windows line-ending warnings before no-diff index refresh.

## Candidate-Scope Negative Coverage

Committed regression suite covers synthetic probes for cross-identity changes, generated-data changes, cross-preview and multiple-preview changes, mixed allowed/disallowed changes, unauthorized field addition, object deletion, whole-object replacement, root metadata changes, formatting/key-order/structural mutation bypasses. Suite result: PASS.

## Security And Failure-Mode Review

- Candidate-scope false-positive / false-negative risk: PASS under committed regression suite and exact candidate scope.
- Alias expansion risk: PASS; GUR/URG/RGU rejected.
- Cross-identity contamination risk: PASS; no non-TEMUR semantic path in candidate commit.
- Whole-file/object/format/key-order/added/deleted/mixed-change bypass: PASS through regression suite.
- Unsupported-claim / incorrect-locator risk: PASS by manual claim/source review and validators.
- Generic-GUR and neighbor-collapse risk: PASS by placement guidance and fixtures.
- Generated/source/provenance drift risk: PASS; 44 TEMUR provenance entries, zero null IDs/hashes, generated consumers present.
- Dependency reproducibility risk: PASS after committed `npm.cmd ci`.
- Scryfall corpus integrity risk: PASS; authorized ignored corpus hardlinked.
- Line-ending normalization risk: INFORMATIONAL; no raw/text diff after generator/provenance refresh.

## Review Matrix Summary

- PASS: 47
- FAIL: 0
- UNKNOWN: 0
- N/A: 3
- Severity totals: CRITICAL 0, MAJOR 0, MINOR 0, INFORMATIONAL 3.
- Approval-blocking findings: 0.

Informational observations:

- Source/generated guardrail retains one known model-owned inhibitor warning for TEMUR.
- `npm.cmd ci` reports inherited audit vulnerabilities; candidate changed no dependency authority.
- Windows line-ending/index refresh can make provenance `--check` appear stale before no-content refresh in disposable exact-test tree.

## Governance Update

VM-528 state before review: candidate ready for independent review.
VM-528 state after review: independent exact-SHA review approved; certification-only next.
VM-529 state before/after: backlog, not started, untouched.
Program base before/after: `a1632337ebc91950b37d835ac404fba414f770c7`; unchanged.
Certified count before/after: 26 of 37; unchanged.
Wave 4 before/after: 6 of 10 certified, one Temur candidate approved awaiting certification.

## Files Changed By This Review Commit

Governance-only expected files:

- `docs/handoffs/2026-07-22-1911-codex-vm528-temur-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

No candidate source file, generated file, fixture, provenance, profile, placement, preview content, validator, test, package, lockfile, dependency artifact, ignored corpus, other identity, Excel, original-main file, protected worktree file, VM-529 file, DRIFT-017 file, historical/debug/archive file, push, merge, or PR was changed.

## Follow-Up Recommendations

Proceed only with a separate certification-only task that certifies exact approved candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`. Do not start VM-529 semantic work until VM-528 certification creates the new program base.

## Next Suggested Agent

VM-528 certification-only agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1758-codex-vm528-temur-candidate-workflow.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`

APPROVE EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc
