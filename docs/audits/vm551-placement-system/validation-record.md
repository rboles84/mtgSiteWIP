# VM-551 Owner-Rejection Remediation Validation Record

Validation date: 2026-08-01
Scope: documentation/audit artifacts only
Original base: `2b4058ff4c769f03d52070204b3ce973e51decbd`
Rejected audit: `c62c7e1b43421359488537457804698a77656952`

Boundary precedence: `bounded-mvp-repair-plan.md`, `requirements-traceability-matrix.csv`, and `downstream-compatibility-contract.md` jointly govern the repair boundary. Narrative summaries must agree with them.

## Authority and artifact validation

| Check | Result |
|---|---|
| CECOS candidate SHA | PASS — `947bf45bf6a191839b5fb4fa6c65980ed9d5737e` |
| CECOS exact-object SHA-256 | PASS — `dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3` |
| Existing six machine artifacts | PASS WITH ONE EXPLICIT CORRECTION — five remain byte-identical; `identity-reachability-opportunity-matrix.csv` changes only the stale bias-indicator label to a withdrawn-historical invalid-counter marker; both hashes are pinned and quantitative fields are unchanged |
| New remediation machine artifacts | PASS — 16 CSV/JSON artifacts reproduced byte-for-byte on immediate rerun |
| Questions covered | PASS — 113 unique question IDs |
| Answers covered | PASS — 356 unique audit answer IDs |
| Allowed question dispositions | PASS — all 113 reconcile to the allowed vocabulary |
| Allowed answer dispositions | PASS — all 356 reconcile to the allowed vocabulary |
| Identities covered | PASS — 37 unique identities |
| Profile scenarios | PASS — 37 unique expected identities; 37 `GOLDEN-PATH-DERIVED`, 37 `EXACT-PRIMARY` scoring outcomes, 37 `INCOMPLETE` review dispositions |
| Adversarial scenarios | PASS — nine unique scenarios; 5 literal non-representations, 2 partial/conflated, 2 unsupported-inference cases |
| Terminal paths | PASS — 26,891 reproduced |
| Exact top ties | PASS — 333 reproduced |
| Critical/High defect evidence | PASS — every row has reproduction, machine evidence, impact, rationale, requirement, and validation |
| Gate A/B1 traceability | PASS — 11 authoritative requirements have finding, evidence, risk, requirement, validation, and gate |
| Production/test paths changed | PASS — zero; all remediation changes are under `docs/` |
| Control worktree | PASS — clean during validator run |
| Branch/upstream | PASS — `codex/vm551-placement-system-audit`, no upstream, no local remote-tracking branch |

## Final owner-review reconciliation validation

| Check | Result |
|---|---|
| Original audit generator | PASS — 26,891 terminal paths and 333 exact ties reproduced; five artifacts remained byte-identical and one stale reachability-matrix label was intentionally corrected with old/new hashes pinned |
| Remediation generator reproducibility | PASS — all 16 generated CSV/JSON artifacts reproduced byte-for-byte |
| Owner-review package reproducibility | PASS — 18-artifact manifest and critical extract reproduced byte-for-byte after the compatibility additions |
| Reconciliation validator | PASS — 18 manifest artifacts; 28 question, 23 identity, 5 representative profile, 9 adversarial, 5 flip, 151 cross-family category, 11 repeated-construct, 28 non-monotonic, 9 defect, and 11 Gate A/B1 extract records reconciled |
| Stale evidence conclusion scan | PASS — zero unqualified stale statements; historical occurrences are explicitly marked withdrawn |
| Scenario origins | PASS — 37 `GOLDEN-PATH-DERIVED`; 0 independent; 0 assisted; 37 `EXACT-PRIMARY` scoring outcomes; 37 `INCOMPLETE` review dispositions |
| Adversarial dispositions | PASS — 5 literal non-representations, 2 partial/conflated, 2 unsupported-inference cases |
| Gate boundary | PASS — 5 Gate A containment requirements, 6 Gate B1 pilot requirements, 1 Gate B2 deferred requirement; D008 moved from Gate A to Gate B1 |
| Defect severity | UNCHANGED — 3 Critical, 26 High, 10 Medium, 1 Low |
| Documentation-only scope | PASS — all changed paths under `docs/`; no production/test/fixture/schema/canonical/runtime path changed |

## Final downstream-compatibility reconciliation

| Check | Result |
|---|---|
| Governing contract | PASS — Gate A is explicitly limited to public interpretation/rendering; internal scores, softmax/gaps, serialized fields, persistence, dossier, Matrix, recommendation, deck-link, adjacent-view, and Maze consumers are preserved |
| Result-field consumer map | PASS — 37 rows; 26 `PRESERVE-UNCHANGED`, 6 `PRESERVE-INTERNAL-HIDE-PUBLICLY`, 2 `ADDITIVE-EXTENSION`, 3 `VERSIONED-MIGRATION-LATER`, 0 `UNRESOLVED-BLOCKER`; field-level `decree` and optional `color_weights` chains are present |
| Matrix path separation | PASS — authored `preview_scores`/component averages are separate from placement-derived `mana_scores`/dossier `manaAlignment` |
| REQ-A-002 | PASS — public numeric confidence removal is bounded by internal/serialized compatibility, additive states, backward normalization, consumer review, and the expanded future validation matrix |
| Planning prerequisite | PASS — implementation planning is prohibited until independent map review; no destructive field removal/rename belongs in Gate A |
| Compatibility documentation validator | PASS — required contract phrases, 5 Gate A requirements, exactly 37 map rows, required field families/consumers, source-accurate decree chain, independently nonempty public/internal `color_weights` treatments and non-fabrication boundary, complete three-record critical extract, correct authored-`preview_scores` source direction, both Matrix paths, and narrative agreement |
| Quantitative artifacts | UNCHANGED — original and remediation generators reproduced 37 identities, 113 questions, 356 answers, 26,891 terminal paths, 333 ties, 44,005 matched comparisons, zero negative-only winners, and 2,901 below-minimum-proxy paths without modifying machine evidence |
| Defect severity | UNCHANGED — 3 Critical, 26 High, 10 Medium, 1 Low |

Validator command:

```powershell
node docs\audits\vm551-placement-system\validate-placement-system-remediation.mjs
node docs\audits\vm551-placement-system\build-owner-review-package.mjs
node docs\audits\vm551-placement-system\validate-owner-review-reconciliation.mjs
node docs\audits\vm551-placement-system\validate-downstream-compatibility-docs.mjs
```

## Existing repository tests

The final compatibility reconciliation reran every focused command below. Placement, Gate/bias, source/generated, parser, JavaScript/HTML lint, frontend smoke, route metadata, and copy-boundary checks passed without retained generated-report changes. The aggregate and semantic-readiness results reproduced only the known limitations listed below.

Passed:

- `npm.cmd run test:placement` — 37 factions / 37 golden paths.
- `npm.cmd run test:gate-live-bias` — 625 Gate paths / 29 rank-one winners; generated report remained unchanged in Git.
- `npm.cmd run test:gate-compression` — 37/37 reachable; generated reports remained unchanged in Git.
- `npm.cmd run test:bias:all` — 37/37 target golden-path winners; ignored test output only.
- `npm.cmd run test:source-generated` — pass with the two pre-existing model-owned inhibitor warnings for Jeskai and Mardu.
- `npm.cmd run test:parser` — 226 cases.
- `npm.cmd run lint:js` — eight frontend files.
- `npm.cmd run lint:html` — public HTML validation passed.
- `npm.cmd run test:frontend-smoke`.
- `npm.cmd run test:route-metadata` — ten public route heads.
- `npm.cmd run test:copy-boundaries` — seventeen live-copy files.
- `npm.cmd run test:browser-smoke` — current reconciliation rerun did not pass: first run passed desktop and failed mobile Home canvas visibility; the confirmation rerun failed desktop Home canvas visibility. No production file changed, so this environment-sensitive rendering failure is recorded and not repaired or treated as a new VM-551 audit conclusion.
- `git diff --check` — pass; line-ending notices only.

Known baseline failures preserved, not fixed:

- `npm.cmd run test:semantic-readiness` — contract, candidate-scope, and fixture validation pass; committed `semantic-readiness-provenance.json` is stale.
- `npm.cmd test` — earlier placement/Gate/parser/builder/semantic/Maze/mode/precon suites pass, then `data/scryfall/raw/oracle-cards.json` is absent.

Known limitations remain separate from the documentation candidate: stale semantic-readiness provenance; the absent ignored Scryfall raw fixture; absent visual baselines; and environment-sensitive canvas visibility recorded by the prior reconciliation. No baseline, dependency, fixture, or runtime repair was attempted.

Visual validation:

- Existing rejected-audit local browser observations are preserved.
- `test:visual:archscry` was not run because the 17 reviewed baselines are absent and the task prohibits regenerating or accepting visual baselines.

## Required scope confirmations

- No production JavaScript, HTML, CSS, route, runtime data, canonical identity record, production schema, generator, test, or fixture changed.
- No production output or visual baseline was regenerated or accepted.
- No unrelated failing baseline was fixed.
- No web browsing occurred during remediation.
- No merge, push, deployment, certification, integration, or VM-551 implementation occurred.

Final candidate/control SHA and cleanliness proof are recorded in the dated remediation handoff after the documentation candidate commit exists.

## Final consumer-map completion

Independent review of exact candidate `332c24097c8d3d9f3c87bee60527bdb73b795f1b` accepted the compatibility contract and Gate boundary but rejected the hard planning-prerequisite map as incomplete. This bounded documentation reconciliation adds the known `decree` and `color_weights` field records and corrects `authored_preview_scores` so `data/identity-layers.json` is the canonical authored source while `research/build-faction-artifacts.mjs` is a reader and propagator.

The 37-row map now classifies 26 `PRESERVE-UNCHANGED`, 6 `PRESERVE-INTERNAL-HIDE-PUBLICLY`, 2 `ADDITIVE-EXTENSION`, 3 `VERSIONED-MIGRATION-LATER`, and 0 `UNRESOLVED-BLOCKER`. The `color_weights` record explicitly states `NONE-IN-CURRENT-LOCAL-QUICK-PATH` and `EXTERNAL-OR-ARCHIVED-PRODUCER-UNRESOLVED`; supplied values remain optional and must not be fabricated. Quantitative findings, defect severity, five-requirement Gate A, REQ-A-002, and Gate B1/B2/C/D scope remain unchanged.

Final completion validation:

- PASS — original audit generator, remediation generator, and owner-package generator; 26 CSV/JSON/owner-package files reproduced byte-for-byte on an immediate second run.
- PASS — remediation validator, owner-review reconciliation validator, and strengthened downstream-compatibility documentation validator.
- PASS — placement, Gate live bias, Gate compression, all-identity bias, source/generated guardrails, parser (226 cases), JavaScript lint, HTML lint, frontend smoke, route metadata, copy boundaries, deck links, and four direct Maze/adjacent-navigation checks.
- KNOWN LIMITATION — semantic-readiness contract, candidate-scope, and fixture checks pass before stopping on the pre-existing stale provenance record.
- KNOWN LIMITATION — aggregate `npm test` passes its preceding placement, Gate, parser, builder, semantic contract, Maze, mode, search, and precon checks before stopping on the absent ignored `data/scryfall/raw/oracle-cards.json` fixture.
- NOT RUN — visual-baseline acceptance or regeneration; no baseline was created or accepted.
- PASS — changed paths remain under `docs/`; no production, test, fixture, schema, runtime, route, Matrix, Maze, persistence, or cache implementation changed.

## Final three-blocker documentation correction

Independent review evidence `bc28ca2260d3e2457a1f9572f885f6f7a92c2b03` rejected exact candidate `908007b971b6d714661cf7406597ce94c00f14a0` on three bounded documentation defects. This correction changes no quantitative finding, CECOS authority, Gate scope, question/identity/scenario conclusion, requirement count, or defect severity.

- The `decree` row now names the committed `assets/js/shared.js` functions `vm_saveWithGoogle()` and `vm_checkPendingSave()`. It records `dossier.decreeCopy` as constructed object carry-through and explicitly records that current dossier text export, dossier audit, and dossier presentation do not consume it. Initial result reveal and Maze decree consumption remain documented.
- The compatibility validator independently requires nonempty `color_weights.gate_a_public_treatment` and `color_weights.gate_a_internal_treatment`. Targeted mutation checks must fail when either cell is blank.
- PASS — `test-downstream-compatibility-docs-validator.mjs`: blank public treatment failed with exit 1; blank internal treatment failed independently with exit 1; authoritative input files were not modified.
- The owner critical extract now includes complete records for `decree`, `color_weights`, and `authored_preview_scores`; the preview record retains `data/identity-layers.json:expressions.*.preview_scores` as canonical and `research/build-faction-artifacts.mjs` as downstream reader/propagator.
- The owner manifest retains 18 artifacts and 37 consumer records; the corrected map is 37,761 bytes with SHA-256 `f078c942ee5fb1f7ad634bf5ed8b58086bd79683c0b9086b84b0890d69625a71`.
- Two immediate owner-package regenerations were byte-identical: manifest 6,702 bytes / SHA-256 `06a532688e9d3ae7a6e26361b1a6379e0710ac81a10a89678992aebf72cd008b`; critical extract 264,753 bytes / SHA-256 `8196445883018dcdb8c632e19e7ce3c8bb0ab37a48db1814f16eb399a7b3cc87`.

Next gate: final micro-review restricted to these three corrections. Implementation, implementation planning, push, merge, integration, deployment, and certification remain unauthorized.
