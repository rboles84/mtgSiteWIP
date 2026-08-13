# VM-551 Card-Rationale Owner Approval Application Handoff

- **Agent:** Codex
- **Task requested:** Apply the owner's completed 26-row card-rationale decisions to canonical authority, rebuild approved runtime/catalog reports, validate Archscry, commit locally, and stop for owner UI review.
- **Starting SHA:** `1ebfe5cb7152bde848af52d61f07478b794837e5`
- **Completion commit:** The commit containing this handoff, with message `fix(vm551): apply owner-approved card rationales`.
- **Branch / worktree:** `codex/vm551` / `C:\dev\voxmana.io-vm551`

## Files Reviewed

- Canonical card-rationale source, schema, generated catalog, builder, focused authority/integrity tests, prior all-37 audit artifacts, current placement/runtime suites, recent VM-551 handoffs, Kanban board/card, and the live Archscry dossier/card interaction surfaces.

## Files Changed

- `data/dossier/card-rationale-relationships.source.json`
- `data/dossier/card-rationale-relationships.source.schema.json`
- `data/dossier/card-rationale-catalog.json`
- `research/build-card-rationale-artifacts.mjs`
- `scripts/vm551-card-rationale-authority-tests.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/README.md`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/gap-report.md`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/owner-review-packet.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/per-card-adjudication.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/post-hardening-inventory.tsv`
- `docs/plans/vm551-gate-b1-product-fit/card-rationale-owner-approval.md`
- `docs/kanban/done/VM-551-card-rationale-owner-approval-application.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Promoted all 26 reviewed relationships to `APPROVED_PUBLIC`: 25 `APPROVE`, one `APPROVE_AFTER_REVISION`, and zero blocked rows.
- Preserved every directly approved rationale byte-for-byte except the authorized Quintorius typo correction.
- Set Isperia's exact approved public text to: “Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers.”
- Recorded separate Isperia provenance roles for certified identity/lore authority and the canonical `oracle_excerpt` card-behavior field.
- Corrected Quintorius only from `Represent's` to `Represents`.
- Enforced deterministic maximum-three display selection. All 26 relationships remain approved authority; 24 enter the displayed runtime catalog because Orzhov and Izzet each have four approved relationships.
- Rebuilt owner packet, adjudication, post-inventory, gap report, and README.

## Evidence-Based Coverage Decision

The initial post-promotion implementation still defaulted approved identities to Full when no explicit defect flag existed. Owner review caught that count-based shortcut before finalization. It was removed.

Every approved identity now requires an explicit canonical coverage adjudication that:

- enumerates every approved relationship;
- records why the approved section is genuinely useful;
- records why remaining candidates do or do not constitute a meaningful unresolved defect;
- cites the owner-decision record;
- uses `Full` only with `meaningful_unresolved_defect: false`;
- uses `Partial` only with `meaningful_unresolved_defect: true`.

Missing adjudication fails validation. A dedicated fixture proves Partial remains reachable. The final distribution remains 12 Full / 0 Partial / 25 Gap because each of the 12 Full findings was adjudicated from the existing records, not from card count.

## Approved Relationships By Identity

| Identity | Approved authority | Displayed | Coverage |
|---|---:|---:|---|
| Azorius Senate | 2 | 2 | Full |
| House Dimir | 1 | 1 | Full |
| Cult of Rakdos | 2 | 2 | Full |
| Gruul Clans | 3 | 3 | Full |
| Selesnya Conclave | 1 | 1 | Full |
| Orzhov Syndicate | 4 | 3 | Full |
| Izzet League | 4 | 3 | Full |
| Golgari Swarm | 1 | 1 | Full |
| Simic Combine | 1 | 1 | Full |
| Boros Legion | 3 | 3 | Full |
| Lorehold College | 3 | 3 | Full |
| Bant | 1 | 1 | Full |

The exact per-identity usefulness and remaining-candidate findings are in `data/dossier/card-rationale-relationships.source.json#/coverage_adjudication` and the owner-decision comparison table.

## Remaining State

- 25 identities remain Gap.
- 96 candidate rows remain `EVIDENCE_NEEDED` and three generated-only Naya rows remain rejected in the historical candidate audit.
- No source intake, replacement-card search, new rationale drafting, Grixis/Hearthhull/Naya repair, or remaining-gap remediation occurred.

## Browser QA

- **Maximum approved count:** Orzhov calculated close result rendered 3 stable-priority cards from 4 approved relationships: Teysa Karlov; Teysa, Orzhov Scion; Karlov of the Ghost Council.
- **Exactly one approved card:** Simic calculated primary rendered exactly Prime Speaker Zegana with exact catalog rationale.
- **Gap:** existing Esper result rendered no card-rationale section and zero rationale cards.
- **Isperia:** calculated Azorius primary rendered the exact narrowed wording; hover preview appeared; internal modal showed the same exact wording and canonical card details; Escape closed it and restored focus to Isperia; external Scryfall action remained available.
- **Quintorius:** corrected catalog copy was validated automatically; Lorehold was not separately forced into a browser result.
- **Responsive:** 1280px and 900px rendered two balanced Azorius cards; 390px rendered one column; no horizontal overflow.
- **Console:** zero errors for Azorius, Simic, Orzhov, and Esper Gap cases.

## Tests Run

- `node --check` for the builder and two changed test files — PASS.
- `npm run test:card-rationales` — PASS: 37 identities, 125 candidates, 26 approved authority rows, 24 runtime rows, 14 negative fixtures, Partial reachable, rationale/modal parity.
- `npm run test:vm551-dossier-integrity` — PASS: 24 public rationales; token, modal, tooltip, and layout contracts pass.
- `npm run test:source-generated` — PASS with the two existing JESKAI/MARDU model-owned warnings.
- `npm run lint:js` — PASS.
- `npm run test:placement` — PASS: 37 golden paths.
- `npm run test:gate-b1-model` — PASS: 16 constructs, 36 questions, 124 answers, 37 identities, 123 pairs, 76 directional uses.
- `npm run test:gate-b1-runtime` — PASS.
- `npm run test:gate-b1-questionnaire-presentation` — PASS.
- `npm run test:gate-b1-result-contract` — PASS: 5,000 deterministic valid journeys.
- `npm run test:gate-b1-engine` — PASS: 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- `git diff --check` — PASS.

## Decisions Made

- Display count and coverage classification are independent: three is a maximum, not a Full threshold.
- Additional `EVIDENCE_NEEDED` candidates do not force Partial when the adjudication determines they are unnecessary, generic, non-native, or optional breadth.
- Approved count does not authorize Full; explicit usefulness/no-defect adjudication does.
- The runtime and modal consume one catalog rationale; no alternate paraphrase is generated.

## Risks / Uncertainties

- The 25 Gap identities remain intentionally absent; the dossier will omit the section for them.
- Orzhov and Izzet have one approved relationship each that is not displayed because of the maximum-three contract; both remain in canonical authority.
- This approval applies reviewed wording and does not establish empirical player accuracy or placement mapping validity.

## Not Touched

- Placement questions/answers/constructs/stable IDs; scoring, ranking, mappings, routing, stopping, refinement, naming qualification, Yore behavior, identity authority, Gate A states, Matrix, persistence/schema, Maze, precon semantics, or unrelated dossier content.
- No unofficial wiki source was introduced.
- No new public rationale was authored outside the exact approved Isperia narrowing; Quintorius was editorial-only.
- Nothing was pushed, merged, or deployed.

## Follow-Up Recommendation

Resume owner hands-on UI verification tonight. Do not begin remaining-gap source intake in this task.

## Next Suggested Agent

Owner UI review; no automatic next implementation task.

## Related Records

- `docs/kanban/done/VM-551-card-rationale-owner-approval-application.md`
- `docs/plans/vm551-gate-b1-product-fit/card-rationale-owner-approval.md`
- `docs/handoffs/2026-08-12-1138-codex-vm551-card-rationale-source-hardening.md`
