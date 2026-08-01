# VM-551 Owner-Rejection Remediation Validation Record

Validation date: 2026-08-01
Scope: documentation/audit artifacts only
Original base: `2b4058ff4c769f03d52070204b3ce973e51decbd`
Rejected audit: `c62c7e1b43421359488537457804698a77656952`

## Authority and artifact validation

| Check | Result |
|---|---|
| CECOS candidate SHA | PASS — `947bf45bf6a191839b5fb4fa6c65980ed9d5737e` |
| CECOS exact-object SHA-256 | PASS — `dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3` |
| Existing six machine artifacts | PASS — generator rerun preserved all six SHA-256 hashes byte-for-byte |
| New remediation machine artifacts | PASS — 16 CSV/JSON artifacts reproduced byte-for-byte on immediate rerun |
| Questions covered | PASS — 113 unique question IDs |
| Answers covered | PASS — 356 unique audit answer IDs |
| Allowed question dispositions | PASS — all 113 reconcile to the allowed vocabulary |
| Allowed answer dispositions | PASS — all 356 reconcile to the allowed vocabulary |
| Identities covered | PASS — 37 unique identities |
| Profile scenarios | PASS — 37 unique expected identities |
| Adversarial scenarios | PASS — nine unique scenarios |
| Terminal paths | PASS — 26,891 reproduced |
| Exact top ties | PASS — 333 reproduced |
| Critical/High defect evidence | PASS — every row has reproduction, machine evidence, impact, rationale, requirement, and validation |
| Gate A/B1 traceability | PASS — 11 authoritative requirements have finding, evidence, risk, requirement, validation, and gate |
| Production/test paths changed | PASS — zero; all remediation changes are under `docs/` |
| Control worktree | PASS — clean during validator run |
| Branch/upstream | PASS — `codex/vm551-placement-system-audit`, no upstream, no local remote-tracking branch |

Validator command:

```powershell
node docs\audits\vm551-placement-system\validate-placement-system-remediation.mjs
```

## Existing repository tests

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
- `npm.cmd run test:browser-smoke` — desktop/mobile Home, Archscry, Maze, Reading Finds, and return-to-dossier handoff.
- `git diff --check` — pass; line-ending notices only.

Known baseline failures preserved, not fixed:

- `npm.cmd run test:semantic-readiness` — contract, candidate-scope, and fixture validation pass; committed `semantic-readiness-provenance.json` is stale.
- `npm.cmd test` — earlier placement/Gate/parser/builder/semantic/Maze/mode/precon suites pass, then `data/scryfall/raw/oracle-cards.json` is absent.

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
