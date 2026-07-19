# VM-521 Green Provenance Re-Review

Status: APPROVE EXACT SHA `45e323cde853ee5058b71c819f080ab4025597ce`

Re-review-record SHA: `ec148486ff2442ff2e3145dd9d45a6d993179766`

## Scope

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Identity: VM-521 - Green / G.
- Program base: `9f0a076a369cba23dc9bc19231b0efcddd21afe5`.
- Green drift preflight: `76fd0eb8bf702bf889857537c636b3404c4bdba4`.
- Gate 1+2 governance commit: `332ab81ffcfa461df1109e89709d47907e7c0032`.
- Superseded candidate: `83123037f619472a4d2834e124311df691281a53`.
- Exact re-reviewed candidate: `45e323cde853ee5058b71c819f080ab4025597ce`.
- Original rejection review: `2f776d8ac488a349db0975094b5948a9c3183674`.
- Failed historical repair attempt: `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`.
- Green stop-line record: `542015ab4dee8158002eb96dca65ef03fa81904d`.
- Provenance audit: `aa62ac329c53c00016dcce749b5fea73b145d4ac`.

This is a governance-only fresh independent re-review. It does not modify the candidate, create another candidate, certify Green, mark Green `semantically_ready`, advance the program base, resume validator prototype work, clean historical/debug artifacts, begin VM-522, or modify the external Excel tracker.

## Preflight and Isolation

| Control | Result | Evidence |
|---|---|---|
| Isolated worktree | PASS | `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`. |
| Isolated branch | PASS | `codex/vm-521-green-provenance-rereview`. |
| Starting HEAD | PASS | `2f776d8ac488a349db0975094b5948a9c3183674`. |
| Candidate ancestry | PASS | `45e323cde853ee5058b71c819f080ab4025597ce` is an ancestor of starting HEAD. |
| Provenance audit object | PASS | `aa62ac329c53c00016dcce749b5fea73b145d4ac` is readable by exact SHA. |
| Protected Green worktree | PASS | Required HEAD `542015ab4dee8158002eb96dca65ef03fa81904d`; existing Table Talk dirt preserved. |
| Validator prototype worktree | PASS | Required HEAD `4044d7e31a15acc630678967b6b6b2a5f8a29695`; expected uncommitted validator files preserved. |
| NDJSON audit worktree | PASS | Required HEAD `aa62ac329c53c00016dcce749b5fea73b145d4ac`; clean. |
| Original main | PASS | Inspected read-only; preexisting docs/workflow dirt only. |
| Program state | PASS | Green uncertified, certified count 19, Wave 3 remains 4 of 5, VM-522 not started. |

## Provenance-Audit Verification

The re-review independently read `aa62ac329c53c00016dcce749b5fea73b145d4ac:docs/incidents/CRIT-001-ndjson-provenance-audit.md` and reran key dependency checks.

Findings:

- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson` is `DEBUG_INSPECTION_ARTIFACT`.
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson` is `DEBUG_INSPECTION_ARTIFACT`.
- `assets/js/newindex-color-matrix.js` is `HISTORICAL_ARCHIVE`.
- `assets/js/color-matrix-radar.js` is `HISTORICAL_ARCHIVE`.
- Exact repository searches found no current HTML import, runtime bundle dependency, deployment requirement, package script, CI workflow, builder, validator, or test dependency that reads the two top-level NDJSON files as preview authority.
- Current live preview flow remains `data/identity-layers.json` to generated `data/factions.json` and the current home runtime fetch in `assets/js/home.js`.
- The two matrix JS files contain stale historical preview strings but no current live page imports them.

Architectural conclusion: NO - Excel inspection artifacts are not part of canonical or runtime data flow.

Revised active defect count for the four disputed files:

- Active runtime defects: 0.
- Active build-input defects: 0.
- Active test-fixture defects: 0.
- Residual debug NDJSON stale cells: 12.
- Residual historical JS stale cells: 12.

The residual copied strings are non-blocking repository-hygiene debt under VM-542 / DRIFT-019.

## Candidate Isolation

Gate 1+2 to candidate diff:

- `data/raw-factions/green/green.claims.json`
- `data/raw-factions/green/green.sources.json`
- `data/raw-factions/green/green.profile.json`
- `data/raw-factions/green/green.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/green.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

No governance files, Table Talk files, historical JS archive files, NDJSON debug artifacts, binary workbooks, unrelated identities, validator files, schemas, builders, global scoring, or global calibration files are included in the candidate.

Superseded-to-final diff:

- `data/raw-factions/green/green.placement.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

The final candidate restores the Gate 1+2 calibration note exactly:

`Green should rise only when nature, instinct, role, interdependence, or natural growth drive the answer.`

The superseded calibration wording does not remain active.

## Contract, Fixtures, and Frozen Controls

- Claims: 8 total, 6 substantive, 2 support, 0 discovery, 0 unclassified.
- Substantive IDs: `green_claim_0002`, `green_claim_0003`, `green_claim_0004`, `green_claim_0005`, `green_claim_0006`, `green_claim_0007`.
- Support IDs: `green_claim_0001`, `green_claim_0008`.
- Every substantive claim has bounded `evidence_locations` and `evidence_scope`.
- Required null canonical IDs: 0.
- Null hashes: 0.
- Unresolved pointers: 0.
- Duplicate canonical entries: 0.
- Duplicate null keys: 0.
- Non-substantive authoritative chains: 0. One support row remains only as `auxiliary_support`.
- Green provenance count: 25.
- Core identity provenance fixture: 5 generated IDs, 5 fixture IDs, exact ordered equality.
- Placement summary provenance fixture: 6 generated IDs, 6 fixture IDs, exact ordered equality.
- All 12 Gate 1+2 proof-chain locators use eligible substantive claims and have no duplicate, missing, or extra IDs.
- Placement-summary text is unchanged; remediation added structured ID/claim metadata around the same text.
- Top-level confidence remains absent.
- Required terms, minimum hits, broad penalty, strengthen/suppress lists, false-positive guardrail, calibration note, native IDs, lateral targets, collision targets/order, optional-field absences, and scoring/golden-path absence are preserved.

## Green Semantic and Neighbor Review

Required-neighbor fixture coverage exists for `GENERIC_G_OVERFIT`, `W`, `U`, `B`, `R`, `WG`, `BG`, `UG`, `RG`, `WITHERBLOOM`, `QUANDRIX`, `BANT`, `JUND`, `NAYA`, `TEMUR`, `SULTAI`, `ABZAN`, `WUBRG`, and `COLORLESS`.

For every required neighbor, the candidate records overlap risk, mono-Green discriminator language, false-positive risk, source support, public/recruiter treatment, fixture or validation coverage, and falsifiability through fixture exclusion or placement/recruiter boundary text. No generic nature/growth slogan, "nature knows best" collapse, fatalistic acceptance, mechanics-first Green, neighbor collapse, or unsupported universal claim remains as an approval finding.

## Preview and Active Consumers

Authoritative preview source:

`data/identity-layers.json#/expressions/G/preview_text`

Embedded generated preview:

`data/factions.json#/identity_layers/expressions/G/preview_text`

Both equal:

`Green accepts a role within the web of life and lets inherent nature unfold. Its growth is patient, purposeful, and wary of mistaking every change for wisdom.`

Semantic alignment: PASS. The preview is source-supported and bounded to role, web-of-life, inherent nature, patient growth, and change/wisdom guardrails.

Actual active consumers are aligned: canonical JSON source, embedded generated JSON, current home runtime source dependency, generated placement, recruiter, and currently active product surfaces.

The four previously disputed files are not active candidate consumers in this re-review. Active stale-consumer count: 0.

## Candidate-Scope Review

Exact command:

`node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=45e323cde853ee5058b71c819f080ab4025597ce --identity=G`

Exit code: 1.

Diagnostics:

- `identity candidate modified non-identity path data/identity-layers.json`
- `unrelated or global data/factions.json content changed`

Manual inspection confirms the diagnostics are limited to the documented Green display-source paths:

- `data/identity-layers.json#/expressions/G/preview_text`
- `data/factions.json#/identity_layers/expressions/G/preview_text`

No validator crash, calibration diagnostic, frozen-field diagnostic, target diagnostic, optional-field diagnostic, unrelated identity diagnostic, or unapproved validator-prototype authority was used.

## Validation

| Command | Exit | Result |
|---|---:|---|
| JSON parsing / Green control script | 0 | Claim counts, evidence scopes, source isolation, pointers, duplicates, provenance count, fixture equality, frozen checks, preview equality, and neighbor fixtures verified. |
| `npm.cmd run build:factions` | 0 | Built 37 faction placement records. |
| `npm.cmd run build:factions` second run plus hash check | 0 | Deterministic output verified for generated faction, placement, provenance, and recruiter context files. |
| `node research/audit-semantic-readiness.mjs --targets=G` | 0 | 8 claims; 6 substantive, 2 support, 0 unclassified; 20 reference sites; no missing references. |
| `node research/validate-semantic-readiness.mjs --targets=G` | 0 | Semantic readiness validation passed for G. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Semantic candidate scope tests passed. |
| `npm.cmd run test:semantic-readiness` | 0 | Contract tests, candidate-scope tests, fixtures, and provenance checks passed. |
| `npm.cmd run test:placement` | 0 | 37 factions and 37 golden paths passed. |
| `npm.cmd run test:faction-context-isolation` | 0 | Faction context isolation helper tests passed. |
| `npm.cmd run test:source-generated` | 0 | Passed with unchanged JESKAI and MARDU model-owned inhibitor warnings. |
| `npm.cmd test` | 0 | Full suite passed after adding ignored local dependency and Scryfall fixture links to the isolated worktree. |
| `git diff --check` | 0 | No whitespace errors. |
| Exact candidate-scope command | 1 | Accepted documented Green display-source exception only. |

Validation limitations:

- The fresh isolated worktree lacked `node_modules` and the local Scryfall raw fixture. The re-review used ignored local links to already-installed sibling resources. No tracked dependency, candidate, or runtime file was committed.
- `npm.cmd test` writes gate-bias audit outputs; those validation-produced tracked file changes were restored before governance editing.

## Drift Scorecard

All required controls are PASS. No `FAIL` or `UNKNOWN` controls remain.

## Findings

No blocker findings.

No high findings.

No medium findings.

No low findings.

Non-blocking observation: stale Green preview strings remain in the two historical JS files and two top-level workbook inspect NDJSON files, but VM-542 / DRIFT-019 classifies those files as historical/archive or debug-inspection debt, not active candidate consumers. No approval action is required.

## Decision

APPROVE EXACT SHA 45e323cde853ee5058b71c819f080ab4025597ce

## Final State

- Green candidate: approved by re-review and certified by later governance-only certification.
- Green status: `semantically_ready`.
- Program base: `PENDING_VM521_CERTIFICATION_COMMIT_SHA` inside governance; actual SHA reported externally after commit.
- Certified count: 20.
- Wave 3: 5 of 5 certified / complete.
- VM-522: not started.
- Original main: untouched.
- External Excel: untouched.
- Candidate files: unmodified.
- Historical/debug cleanup: not performed.
- Validator prototype: not changed.

## Certification Compatibility - 2026-07-19

The certification window reran the approved-candidate guards and found no new evidence invalidating this re-review. The provenance-audit classification remains compatible with certification: top-level inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT`, audited matrix JS files are `HISTORICAL_ARCHIVE`, active runtime/build/test defect count remains 0, and residual stale strings remain VM-542/DRIFT-019 repository-hygiene debt only. Green certification uses `PENDING_VM521_CERTIFICATION_COMMIT_SHA` internally and reports the actual certification SHA externally.
