# VM-519 Black Replacement Independent Review

Status: APPROVE EXACT SHA 0bfe8b3d46d163de6e20064f5de9717075ca02c8

Review-record SHA: `PENDING_VM519_BLACK_REPLACEMENT_REVIEW_RECORD_SHA`

## Scope

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Identity: VM-519 - Black / B.
- Worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-519-black-semantic-recovery`.
- Starting HEAD: `02974fec8242544ceb47e0d8c6b0f776593d9e03`.
- Program base: `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`.
- Black drift preflight: `741ed6a81edb567d51a2699cbe7d0ec70e9b5e61`.
- Gate 1+2 governance commit: `604a19696d3dfb0d43d6b96676c0c6605628eb33`.
- Rejected candidate: `5bffc3465786c18950d32dcb6f056504b3b8e668`.
- Rejection review: `118facf42dd5b613d3aa946de6b3968b24e9455a`.
- Replacement candidate reviewed: `0bfe8b3d46d163de6e20064f5de9717075ca02c8`.
- Replacement workflow record: `02974fec8242544ceb47e0d8c6b0f776593d9e03`.

## Preflight

Preflight passed:

- Branch and HEAD matched the prompt.
- All required Git objects existed.
- Required ancestry passed through program base, drift preflight, Gate 1+2, rejected candidate, rejection workflow, rejection review, replacement candidate, and replacement workflow.
- Replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8` is the only candidate eligible for approval.
- Rejected candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` remains preserved and unapproved.
- Active worktree contained only the allowed Table Talk baseline.
- Original main `C:\dev\mtgSiteWIP` was inspected read-only; only the known docs/workflow dirty baseline was present.

## Candidate Isolation

Replacement implementation diff:

`118facf42dd5b613d3aa946de6b3968b24e9455a..0bfe8b3d46d163de6e20064f5de9717075ca02c8`

Changed files:

- `data/identity-layers.json`
- `data/factions.json`

The exact changed paths were:

- `data/identity-layers.json#/expressions/B/preview_text`
- `data/factions.json#/identity_layers/expressions/B/preview_text`

No Black claim, source, profile, placement, provenance, fixture, recruiter, validation, scoring, calibration, schema, builder, validator, runtime, Hall, Crucible, scheduling, or tie-order file changed. No non-Black raw packet changed. The later replacement workflow diff was governance-only.

## Replacement Preview Review

Rejected preview:

`Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`

Replacement preview:

`Black claims agency by turning costs, risks, and resources into leverage. Its power is deliberate, consequential, and not cruelty for its own sake.`

The replacement is source-supported by accepted substantive claims `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, and `black_claim_0006`:

- `black_claim_0002` supports agency through power and opportunity in a harsh world.
- `black_claim_0003` supports opportunity-seizing, accepted costs, self-interest, and calculated rather than reckless ruthlessness.
- `black_claim_0004` supports the high-risk thematic boundary and prevents cruelty words from acting as sufficient proof.
- `black_claim_0006` supports consequence and backfire pressure from risk-taking and taboo-breaking.

The clause `not cruelty for its own sake` is reviewed as a bounded discriminator, not a universal claim that Black never uses cruelty. It aligns with the accepted guardrail that cruelty alone is not sufficient Black identity proof and with the source-backed calculated-ruthlessness-versus-recklessness distinction.

Neighbor pressure passed. The preview does not collapse into Orzhov transaction/debt, Dimir information leverage, Rakdos appetite/spectacle, Golgari death-cycle reuse, Silverquill social status, Witherbloom harvesting, or broader Esper/Grixis/Jund/Mardu/Sultai/Abzan structures. It remains mono-Black by centering agency through cost, risk, resource conversion, leverage, consequence, and power.

## DRIFT-015 And Stale Copy

- Authoritative preview source: `data/identity-layers.json#/expressions/B/preview_text`.
- Embedded generated consumer: `data/factions.json#/identity_layers/expressions/B/preview_text`.
- Source-to-embedded equality: PASS.
- Propagation: `npm.cmd run build:factions` leaves the embedded value deterministic.
- Exact rejected-preview search in active `data`, `supabase`, and `research` surfaces: no hits.
- Fragment and semantic-equivalent search: no active Black stale preview; one unrelated Bant `Private self-definition` label remains unrelated.
- Historical governance occurrences of the rejected preview remain as audit history.

## Accepted-State Regression

- Claim roles: 8 total; 6 substantive, 0 discovery, 2 support, 0 unclassified.
- Substantive IDs: `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006`, `black_claim_0007`.
- Support IDs: `black_claim_0001`, `black_claim_0008`.
- Evidence scopes: complete for every substantive evidence location.
- Support isolation: PASS; support records remain auxiliary and do not enter authoritative proof.
- B provenance: 25 entries; 0 required null canonical IDs; 0 null hashes; 0 unresolved pointers; 0 duplicate canonical entries; 0 duplicate null canonical-entry keys.
- Fixture/provenance parity: `/core_identity` is 5/5 exact and `/placement_summary` is 6/6 exact, with no duplicates, missing IDs, or extra IDs.
- Frozen fields: placement summary text, absent top-level confidence, required terms, minimum hits 2, broad penalty 0.13, strengthen/suppress lists, false-positive guardrail, lateral targets `UB`, `BR`, `BG`, `WB`, W/G collision pair order, absent generic collision target, absent Black-local scoring, absent golden paths, native IDs, and calibration remained unchanged.
- Public, placement, and recruiter surfaces remain consistent with the accepted Black packet.

## Candidate-Scope Exception

Command:

`node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=0bfe8b3d46d163de6e20064f5de9717075ca02c8 --identity=B`

Result: exit 1, accepted as a documented DRIFT-015 display-source exception.

Output:

- `identity candidate modified non-identity path data/identity-layers.json`
- `unrelated or global data/factions.json content changed`

Manual diff review confirmed no third path and no third JSON pointer. The exception is acceptable because both changed files contain only the Black preview source and generated embedded consumer required to resolve the prior review blocker.

## Validation

- `git status --short --branch` - PASS; only the allowed Table Talk baseline was dirty.
- JSON parse checks for changed and Black semantic JSON - PASS.
- Read-only Node regression script for preview equality, claim roles, evidence scopes, provenance, fixture chains, frozen fields, and rejected-to-replacement file scope - PASS.
- `rg` exact rejected-preview search in active `data`, `supabase`, and `research` surfaces - exit 1, no hits.
- `rg` fragment and semantic-equivalent stale searches - PASS; no active Black stale preview.
- `npm.cmd run build:factions` - PASS.
- `npm.cmd run build:factions` second run - PASS; no generated content diff.
- `node research/audit-semantic-readiness.mjs --targets=B` - PASS; 8 claims, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=B` - PASS.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `npm.cmd run test:semantic-readiness` - PASS; 1826 semantic provenance entries verified.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `npm.cmd run test:source-generated` - PASS with unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS with line-ending warnings only.
- Exact candidate-scope command - exit 1; documented two-file DRIFT-015 display-source exception only.

## Drift Scorecard

| Control | Result |
|---|---|
| Correct branch and HEAD | PASS |
| Correct program base | PASS |
| Exact replacement candidate isolated | PASS |
| Rejected candidate preserved and unapproved | PASS |
| Rejection review preserved | PASS |
| Replacement implementation limited to two preview paths | PASS |
| Replacement workflow separated | PASS |
| Full accepted Black semantic state preserved | PASS |
| Replacement preview source-supported | PASS |
| Cost/risk/resource/leverage/consequence framing supported | PASS |
| No generic Black overfit | PASS |
| No villain coding | PASS |
| No unsupported sanitization | PASS |
| Neighbor pressure test passed | PASS |
| DRIFT-015 ownership respected | PASS |
| Source and embedded preview exactly equal | PASS |
| No stale active preview copy remains | PASS |
| Generation deterministic | PASS |
| Claim roles unchanged | PASS |
| Provenance remains 25 and clean | PASS |
| Fixture chains remain exact | PASS |
| Frozen fields unchanged | PASS |
| Optional-field absences unchanged | PASS |
| Raw and generated collision controls unchanged | PASS |
| Candidate-scope findings limited to exact documented exception | PASS |
| Candidate-scope exception documented and justified | PASS |
| No unrelated identity changes | PASS |
| Known unrelated warnings independently classified | PASS |
| Table Talk excluded | PASS |
| Black remains uncertified | PASS |
| VM-520 untouched | PASS |

No scorecard control is FAIL or UNKNOWN.

## Findings

No blocker, high, medium, or low findings were identified.

Non-blocking observation: exact candidate-scope validation exits 1 because the replacement necessarily changes global display-source files. Manual review confirms this is limited to the two documented DRIFT-015 Black preview paths and does not block approval.

## Decision

APPROVE EXACT SHA 0bfe8b3d46d163de6e20064f5de9717075ca02c8

Black is approved for certification review, but this review did not certify Black, mark Black `semantically_ready`, advance the program base, modify Excel, or start VM-520.
