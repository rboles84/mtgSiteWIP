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
| Result-field consumer map | PASS — 35 rows; 24 `PRESERVE-UNCHANGED`, 6 `PRESERVE-INTERNAL-HIDE-PUBLICLY`, 2 `ADDITIVE-EXTENSION`, 3 `VERSIONED-MIGRATION-LATER`, 0 `UNRESOLVED-BLOCKER` |
| Matrix path separation | PASS — authored `preview_scores`/component averages are separate from placement-derived `mana_scores`/dossier `manaAlignment` |
| REQ-A-002 | PASS — public numeric confidence removal is bounded by internal/serialized compatibility, additive states, backward normalization, consumer review, and the expanded future validation matrix |
| Planning prerequisite | PASS — implementation planning is prohibited until independent map review; no destructive field removal/rename belongs in Gate A |
| Compatibility documentation validator | PASS — required contract phrases, 5 Gate A requirements, 35 map rows, required field families/consumers, both Matrix paths, and narrative agreement |
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
