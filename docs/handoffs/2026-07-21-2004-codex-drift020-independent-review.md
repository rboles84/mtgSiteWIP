# DRIFT-020 Independent Exact-SHA Review

Agent name: Codex

Task requested: Perform a fresh independent exact-SHA review of DRIFT-020 infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` against Jund feasibility-stop base `460dd7186dc76658797beac74a4330cc699a52d6`, record one exact decision, and update only review-governance state.

## Program And Objects

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Control: DRIFT-020 - identity-local authoritative-preview candidate scope.
- Review worktree: `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope-review`.
- Review branch: `codex/drift-020-jund-preview-candidate-scope-independent-review`.
- Starting HEAD: `e13ce35349931edfc8dd7a02fc1a5c384b3d6013`.
- Program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`.
- Jund stop base: `460dd7186dc76658797beac74a4330cc699a52d6`.
- Exact candidate reviewed: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Qualification governance: `8ded0f4ed463e9a82564859d32051ec02dc97754`.
- Candidate workflow: `e13ce35349931edfc8dd7a02fc1a5c384b3d6013`.
- Review commit: pending until this handoff is committed.
- Certification commit: not authorized and not created.

Independence statement: this review was performed in a new dedicated branch/worktree from the workflow SHA, inspected the exact candidate diff independently, reran authority/design/behavior/compatibility/exact-tree checks, did not rely on the qualification PASS as approval, and did not modify candidate implementation, tests, identity semantic data, Jund data, generated data, schemas, generators, package scripts, CI, Excel, VM-526, or protected worktrees.

## Setup Preflight

- No local or remote collision found for `codex/drift-020-jund-preview-candidate-scope-independent-review`.
- No worktree collision found for `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope-review`.
- Candidate, qualification, workflow, program-base, and stop-base objects all exist as commits.
- Exact ancestry passed: `460dd7186dc76658797beac74a4330cc699a52d6` -> `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` -> `8ded0f4ed463e9a82564859d32051ec02dc97754` -> `e13ce35349931edfc8dd7a02fc1a5c384b3d6013`.
- No prior `APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, rejection, independent review, or certification record existed before this review.
- Candidate worktree and Jund worktree were clean. DRIFT-017 retained its known uncommitted prototype files and was not read as evidence or modified. Original main and long-running CRIT retained unrelated dirty baselines and were not modified. No VM-526/Naya branch or worktree was found.

## Governing Authority Reviewed

Reviewed completely or in targeted full-file form as applicable: `AGENTS.md`; `docs/handoffs/HANDOFF_INDEX.md`; `docs/kanban/board.md`; `docs/kanban/ready/DRIFT-020-jund-preview-candidate-scope.md`; `docs/kanban/blocked/VM-525-jund-semantic-recovery.md`; `docs/incidents/CRIT-001-operating-playbook.md`; `docs/incidents/CRIT-001-contract-v1.1-amendment.md`; `docs/reference/semantic-readiness-contract.md`; `docs/incidents/CRIT-001-drift-control-template.md`; `docs/incidents/CRIT-001-drift-register.md`; DRIFT-015, DRIFT-016, DRIFT-017, DRIFT-019, and DRIFT-020 records; VM-525 drift preflight, Gate 1+2, and Gate 3+4 STOP handoffs; approved validator infrastructure candidate and review; VM-522, VM-523, and VM-524 workflow/review precedents; and historical UG/B/G/R preview plus Esper/Grixis candidate records.

Authority conclusion: authoritative identity preview text is semantic source/display data when changed. DRIFT-015 requires preview owner, source-to-embedded equality, semantic alignment, and active-consumer review. Excluding the authoritative source preview from the exact candidate would make candidate review incomplete. The candidate's rule reflects governing authority because it is target identity-local, object-level, and narrower than whole-file allowance. It is generic across identities and not Jund-specific. No new cross-identity authority is introduced.

## Candidate Diff

Candidate commit list:

- `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` - `DRIFT-020: authorize identity-local preview candidate scope`

Candidate file list and classification:

- `research/validate-semantic-candidate-scope.mjs` - candidate-scope validator implementation.
- `research/semantic-candidate-scope-tests.js` - candidate-scope regression tests.

Diff statistics: 2 files changed, 224 insertions, 1 deletion. Per-file: `research/semantic-candidate-scope-tests.js` 164 insertions; `research/validate-semantic-candidate-scope.mjs` 60 insertions and 1 deletion. No docs, semantic data, generated data, identity-layer text, recruiter, schema, generator, package, CI, runtime, or unrelated path appears in the candidate.

Changed rules and functions:

- `isAllowedIdentityCandidatePath` conditionally recognizes `data/identity-layers.json` for later object-level validation.
- `validateUnrelatedGeneratedIsolation` compares `data/factions.json` with the target generated faction and target embedded preview removed, preserving unrelated/global protection.
- New `hasOwn`, `withoutIdentityLayerPreview`, `withoutGeneratedIdentity`, and `validateIdentityLayerPreviewChange` enforce exact target preview-only source scope.
- `main` calls `validateIdentityLayerPreviewChange` when `data/identity-layers.json` changes.
- Tests add positive target-preview and formatting-neutral cases plus cross-identity, multiple-preview, target non-preview, added-field, deletion, replacement, root-metadata, structural, and generated embedded-preview isolation cases.

Candidate/workflow separation: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa..e13ce35349931edfc8dd7a02fc1a5c384b3d6013` changed only governance files: two handoffs, handoff index, drift register, board, and the DRIFT-020 ready card. Validator implementation, tests, authority implementation, semantic identity content, identity-layer text, generated content, package, CI, and runtime files are unchanged after the candidate. The workflow commit is not the candidate.

## Validator Design Review

- Entry point: `main()` in `research/validate-semantic-candidate-scope.mjs`.
- Identity normalization: `parseArgs` uppercases `--identity`; `RAW_TO_KEY` lookup maps known raw IDs and exact keys only; invalid aliases such as `BRG` remain unknown.
- Target selection: `rawId` is derived only from exact `RAW_TO_KEY` entries matching `options.identity`.
- Changed-file method: Git `diff --name-only`.
- JSON comparison: `stableStringify` after removing only permitted target identity material.
- Allowed path computation: broad path allowance is still filtered by object-level validators and generated-isolation checks.
- Object-level restriction: `validateIdentityLayerPreviewChange` removes only `expressions.<IDENTITY>.preview_text` before comparing the rest of `data/identity-layers.json`.
- Cross-identity, multiple-preview, mixed-change, non-preview, added-field, deletion, whole-expression/object replacement, root-metadata, key-order, formatting, and structural bypass attempts are rejected or neutral as expected.
- Error clarity: disallowed identity-layer source changes report `identity-layer candidate changed outside data/identity-layers.json#/expressions/<IDENTITY>/preview_text`; deletion and non-string preview have specific messages.
- Exit behavior: errors print as bullet lines and exit 1; pass prints the semantic candidate-scope success line when the CLI reaches success.

## Behavior Tests

Positive results:

- Target preview-only object probe: accepted.
- Formatting/key-order neutral object probe: accepted.
- Historical UG preview candidate `06f140a1e78a24d6c549943d6beb471f4e714302..bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`: exit 0.
- Historical B preview candidate `604a19696d3dfb0d43d6b96676c0c6605628eb33..0bfe8b3d46d163de6e20064f5de9717075ca02c8`: exit 0.
- Historical G preview candidate `332ab81ffcfa461df1109e89709d47907e7c0032..45e323cde853ee5058b71c819f080ab4025597ce`: exit 0.
- Historical R preview candidate `6c2b6dfc3e9e838f9e75801517a81258b675923d..6aefb2090ff20a361f7f3cd80515445036323158`: exit 0.
- Esper no-preview candidate `a7ea41cbf57cc87f1948fdd254f0295816c5919d..6467f70fa4de13173172e20277e0fd56ebaf0b80`: exit 0.
- Grixis no-preview candidate `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a..64a5bfffd646b292c7481f91c9ccb6def42fb552`: exit 0.
- Existing non-preview candidates remain unaffected through the Esper/Grixis and package regression runs.

Negative and bypass results:

- JUND candidate changes NAYA preview: rejected with `identity-layer candidate changed outside data/identity-layers.json#/expressions/JUND/preview_text`.
- JUND candidate changes any other identity preview: same cross-identity rejection.
- JUND candidate changes two previews: same mixed preview rejection.
- JUND non-preview field: rejected outside exact preview pointer.
- JUND added field: rejected outside exact preview pointer.
- Deleted JUND expression: rejected with retained target expression requirement.
- Replaced JUND expression: rejected outside exact preview pointer.
- Replaced `expressions` object: rejected outside exact preview pointer.
- Root metadata change: rejected outside exact preview pointer.
- Allowed preview plus disallowed generated edit: rejected with `unrelated or global data/factions.json content changed`.
- Cross-identity generated preview/raw-style generated change: rejected with `unrelated or global data/factions.json content changed`.
- Key reordering and formatting-neutral serialization: accepted only when semantically neutral; they do not hide disallowed changes because comparison uses stable stringification.
- Structural mutation: rejected outside exact preview pointer.
- Invalid alias `BRG`: exit 1, `Unknown identity BRG`.
- Unknown identity `NOTREAL`: exit 1, `Unknown identity NOTREAL`.
- Existing Jund STOP governance range `16528f3a24a7f3d7f4475bdde56fbfee09becd98..460dd7186dc76658797beac74a4330cc699a52d6`: exit 1 for unclassified Jund proof-chain contamination, so no Jund semantic candidate is accidentally admitted.

## Validation Results

- `node research\semantic-candidate-scope-tests.js`: exit 0.
- `npm.cmd run test:parser`: exit 0, 226 parser cases.
- `npm.cmd run test:placement`: exit 0, 37 factions / 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: exit 0.
- `npm.cmd run test:source-generated`: exit 0 with known JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd run test:semantic-readiness`: exit 1 after semantic readiness contract, candidate-scope, and fixture validation subtests pass; final provenance check reports inherited stale `semantic-readiness-provenance.json`.
- `npm.cmd test` in review worktree: exit 0 after supplying ignored local `node_modules` and `data/scryfall/raw/oracle-cards.json` inputs.
- Exact-tree export path: `C:\Users\obake\.codex\visualizations\2026\07\22\019f8786-caef-7712-a50d-c87753b496c0\drift020-exact-tree-399ba342-v2`.
- Exact-tree object: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Exact-tree dependency method: `git archive --format=tar --output=<tar> 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, then `tar -xf`.
- Dependency source: ignored `node_modules` junction from `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope\node_modules`; ignored Scryfall corpus hardlink from `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope\data\scryfall\raw\oracle-cards.json`.
- Ignored inputs supplied: `node_modules` and `data/scryfall/raw/oracle-cards.json`.
- Exact-tree `node research\semantic-candidate-scope-tests.js`: exit 0.
- Exact-tree `npm.cmd test`: exit 0.

Inherited stale-provenance assessment: the stale `semantic-readiness-provenance.json` condition predates DRIFT-020, is outside the candidate delta, is not caused by the preview-scope validator change, was not repaired or hidden, and does not compromise the candidate-scope validator's correctness. It does not block this infrastructure approval because exact-tree `npm.cmd test` passes under the legitimate ignored-input conditions and the failing semantic-readiness subcommand fails only at the known provenance freshness check after relevant subtests pass.

## Security And Failure-Mode Review

- False-positive risk: low; formatting-neutral and target preview-only cases pass.
- False-negative risk: low; object-level deletion of only the exact target preview before comparison rejects sibling, root, structural, other-identity, and mixed changes.
- Whole-file bypass risk: rejected by stable full-document comparison after exact preview removal.
- Formatting/key-order bypass risk: neutral formatting is accepted; hidden semantic deltas are still compared through stable stringification.
- Object deletion/additional-field risk: rejected.
- Cross-identity risk: rejected in source `identity-layers` and generated `factions` isolation.
- Alias risk: `BRG` and `NOTREAL` rejected.
- Mixed-change risk: rejected.
- Future-identity behavior: generic exact-key rule over `RAW_TO_KEY`; no Jund-specific special case.
- Backward compatibility: UG/B/G/R preview candidates and Esper/Grixis no-preview candidates pass.
- Maintenance risk: acceptable; the rule is localized and tested.

## Review Matrix

| Control ID | Area | Requirement | Evidence | Candidate result | Result | Severity | Blocking | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DRIFT020-IR-001 | Exact object | Review exact candidate only | Git ancestry and diff | Exact candidate reviewed | PASS | CRITICAL | No | No other SHA approved |
| DRIFT020-IR-002 | Diff scope | No unknown/unrelated paths | 2 research files only | Narrow validator/test delta | PASS | CRITICAL | No | No semantic data |
| DRIFT020-IR-003 | Separation | Post-candidate governance only | `399ba34..e13ce35` diff | No implementation drift | PASS | CRITICAL | No | Workflow not candidate |
| DRIFT020-IR-004 | Authority | Preview source belongs in candidate when changed | DRIFT-015 and Gate 1+2/STOP | Supported | PASS | MAJOR | No | Exact source review stays complete |
| DRIFT020-IR-005 | Object boundary | Only target preview source allowed | Function and probes | Enforced | PASS | CRITICAL | No | Not whole file/expression |
| DRIFT020-IR-006 | Cross identity | Other identities rejected | Object and generated probes | Rejected | PASS | CRITICAL | No | Includes NAYA |
| DRIFT020-IR-007 | Mixed changes | Allowed plus disallowed rejected | Probes | Rejected | PASS | CRITICAL | No | No smuggling |
| DRIFT020-IR-008 | Structural bypass | Deletion/replacement/root/structural rejected | Probes | Rejected | PASS | CRITICAL | No | Fail closed |
| DRIFT020-IR-009 | Aliases | BRG and unknown invalid | CLI exits 1 | Rejected | PASS | MAJOR | No | No alias expansion |
| DRIFT020-IR-010 | Historical compatibility | UG/B/G/R, Esper, Grixis | CLI reruns | Passed | PASS | MAJOR | No | Existing behavior preserved |
| DRIFT020-IR-011 | Jund stop | STOP range remains rejected | CLI exit 1 | Rejected | PASS | MAJOR | No | VM-525 remains blocked |
| DRIFT020-IR-012 | Exact tree | Candidate archive full test | Exact-tree npm test | Passed | PASS | CRITICAL | No | Ignored deps/corpus disclosed |
| DRIFT020-IR-013 | Stale provenance | Known inherited condition | `test:semantic-readiness` | Non-blocking | PASS | MAJOR | No | Outside candidate delta |
| DRIFT020-IR-014 | Protected scope | No remediation/certification | status and diff | Preserved | PASS | CRITICAL | No | VM-526 untouched |
| DRIFT020-IR-015 | Governance | Record review and exact decision | This handoff | Complete | PASS | MAJOR | No | Certification-only next |

Totals: PASS 15, FAIL 0, UNKNOWN 0, N/A 0. Severity totals: CRITICAL 8, MAJOR 7, MINOR 0, INFORMATIONAL 0. Approval-blocking findings: 0.

## Decision And State

Decision: APPROVE EXACT SHA `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.

DRIFT-020 before review: Ready - candidate workflow recorded; awaiting independent exact-SHA review. DRIFT-020 after review: independent exact-SHA review approved; exact candidate fixed; certification-only next; certification not performed; program base unchanged.

VM-525 before review: blocked at Gate 3+4 STOP. VM-525 after review: still blocked until DRIFT-020 certification creates a new program base. VM-526 before/after: untouched/backlog/not started.

Files changed by this review: this handoff, `docs/handoffs/HANDOFF_INDEX.md`, `docs/incidents/CRIT-001-drift-register.md`, `docs/kanban/board.md`, and `docs/kanban/ready/DRIFT-020-jund-preview-candidate-scope.md`.

Not touched: no candidate implementation, candidate tests, authority implementation, identity-layer semantic text, Jund remediation, Jund candidate, replacement DRIFT-020 candidate, certification, program-base advancement, Excel update, VM-522/VM-523/VM-524 history, VM-526 work, original main, DRIFT-017 prototype, VM-542/DRIFT-019 residuals, historical/debug/archive exclusions, or Table Talk baseline.

Next suggested agent: DRIFT-020 certification agent.

APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa
