# Calibration V3.2 Propagation QA

**RobQA disposition:** PASS — owner accepted exact workbook SHA-256 `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`; workbook authority promotion only.

## Owner Acceptance and Promotion

- Owner acceptance date: 2026-08-27.
- Current governed workbook authority: `docs/research/maze-player-language/calibration/v3.2/authority/Scryfall_Maze_Master_Calibration_V3_2_Propagation_Accepted.xlsx`.
- The authority workbook is byte-identical to the accepted propagation candidate.
- Runtime, Plain Reading, Operator Hand, Archscry ranking, generated product data, placement, and recommendation behavior remain out of scope.

## Classification

- QA tier: QA-0 with protected workbook/data-authority checks.
- Changed behavior: a copy-derived Master_Lexicon candidate and its review diffs; no runtime behavior changed.
- Protected behavior: raw corpus, raw provenance sheet, V3.2 authority workbook, historical evidence sheets, formulas, sheet structure, production JavaScript, Plain Reading, Operator Hand, Archscry, placement, and generated product data.
- CPU-heavy validation: NOT REQUIRED. No runtime, placement, ranking engine, migration, or deployment behavior changed.

## Owner Finding Remediation

- Finding: row 909 over-propagated EV-001's all-opponents/spare-my-board wording into the distinct “controlled by one player” source concept.
- Defect class: semantic scope conflation.
- Systemic invariant: target-one-opponent and all-opponents/spare-my-board meanings are separately named lanes; save-one and tribal survivor effects remain separate; an unvalidated major branch cannot be Production-ready.
- Remediation: row 909 now uses the target-one-opponent family as its primary lane, keeps the EV-001 family in a labeled alternate lane, and remains Review at 0.68 pending narrow targeted-branch validation.
- Relative-candidate proof: exactly one Master source row changed from the prior accepted 24-row candidate; the other 23 rows are identical. Four Dashboard formula values recalculated, with zero formula-definition changes and zero unexpected non-formula differences.

## Workbook and Integrity Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Candidate workbook re-import | PASS | 34 sheets opened successfully. |
| Sheet inventory preserved | PASS | Candidate sheet names and order match the 34-sheet authority workbook. |
| Master Lexicon population | PASS | 1138 rows; authority baseline 1,138. |
| Master Lexicon row identities | PASS | All Source Location values remain unique. |
| Raw source sheet logical equality | PASS | SHA-256 logical matrix bfb88c2e1a5479bea56333e96a9a7518f085db28eecb46237d47bba8c372406b. |
| Source workbook immutable | PASS | c4b45e146ad3d9022dd18edd6bc09c2509b4a13d2781945f43cda2e4af4bfaa8. |
| V3.2 authority workbook immutable | PASS | 8cf5c386815872caeab90919ee2464a4b987c2f5d8887f6b005fd54bc110f90e. |
| Raw corpus tree immutable | PASS | 1 file(s), manifest febfc752142a4085d85f3b9d7081d708fa5c1aa5df36bfd6a6b1a87805fe0431. |
| Formula inventory preserved | PASS | 89 formula cells; authority 89. |
| Formula error scan | PASS | No #REF!, #VALUE!, #DIV/0!, #NAME?, #N/A, #NUM!, or #NULL! values found. |
| Changed-row reconciliation | PASS | 24 changed + 1111 unchanged = 1135 eligible. |
| Changed rows have traces | PASS | Every changed row has authority/evidence and CAL/EV trace fields. |
| Rule-trace authority | PASS | Every CAL/EV identifier resolves in Learned_Rules or Evidence_Closure_V3_2. |
| Unsupported syntax scan | PASS | No legal:, is:etb, standalone colors:, \spp/\spt, or trailing regex flags in Master query/fallback fields. |
| Introduced Tagger values | PASS | Introduced values are allowlisted: board-wipe. |
| Historical sheet unchanged: Owner_Gold_100 | PASS | Logical values/formulas hash 8d2e3c215b71580d713db83cbe7c77555a7efd45b2442afb85f5ee4d7c07e124. |
| Historical sheet unchanged: Owner_Regression | PASS | Logical values/formulas hash 03ad64c84454d53f70353533204d1f1d96d25389aea23cc746be54146c2d4541. |
| Historical sheet unchanged: Owner_Recheck | PASS | Logical values/formulas hash db09d5d7cf15eaf72ae970a0fdeee20c18234aee3cb872463ec671d15780cbe9. |
| Historical sheet unchanged: Gold_35_Audit | PASS | Logical values/formulas hash cd183f2bf07d688b80217f4785cc944b546b039c37c86c7bff5d29a3e24f992c. |
| Historical sheet unchanged: Recipe_42_Deconstructed | PASS | Logical values/formulas hash 869a7b0fa2a345a5a305e13a790787c0180817b2c920e6a66923d7d9c7c1a3a3. |
| Historical sheet unchanged: Owner_Checklist_22 | PASS | Logical values/formulas hash bba12bab90b5839b1117f3036f55ed6b731ac22d2966fee60f12eb50040da757. |
| Historical sheet unchanged: New_Recheck_7 | PASS | Logical values/formulas hash 599240a28fe440891b72d9cfc37dbce179b1ef33f197879a3004261e75597a52. |
| Historical sheet unchanged: Calibration_V2 | PASS | Logical values/formulas hash 926887a36bd8b41518ed90abeef7e60e9a81129651ff91fd809da139e4c24217. |
| Historical sheet unchanged: Resolved_29_V3 | PASS | Logical values/formulas hash 11d7292f2a113cb3fee9cbb5a3ddd2b241e17a10ea4b75675cccc79f4e9e48b0. |
| Historical sheet unchanged: Evidence_Backlog_V3 | PASS | Logical values/formulas hash f2f0840528aa1f981d5e2a17ef36f9c46334bab3cd86c9afef3a6dfc54e589e0. |
| Historical sheet unchanged: Evidence_Corrections_V3 | PASS | Logical values/formulas hash 14e904d32a10b48bfc7fadb9432d3ef6fd11506a7814a5be49b921a5cff2baff. |
| Historical sheet unchanged: Evidence_Log_V3_1 | PASS | Logical values/formulas hash 3aee359c5cddd3f07343471ae68f7c4c339a012c7d20f17400ff5941cf6f2538. |
| Historical sheet unchanged: Evidence_Closure_V3_2 | PASS | Logical values/formulas hash 08e46b5dd84ca38ee4b03e7b97517f4be594643109fb0ce371109951d1f9cb74. |
| Representative row: ColorPie!A35:E35 Master Query Fragment | PASS | Expected otag:board-wipe (o:"destroy all creatures" or o:"exile all creatures" or o:"each creature gets -" or o:"damage to each creature" or o:"sacrifice all"); found otag:board-wipe (o:"destroy all creatures" or o:"exile all creatures" or o:"each creature gets -" or o:"damage to each creature" or o:"sacrifice all"). |
| Representative row: ColorPie!A36:E36 Master Query Fragment | PASS | Expected (o:"destroy all creatures target opponent controls" or o:"exile all creatures target opponent controls"); found (o:"destroy all creatures target opponent controls" or o:"exile all creatures target opponent controls"). |
| Representative row: ColorPie!A36:E36 Fallback / Alternate | PASS | Expected all-opponents / spare-my-board lane: (o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control") + save-one/chosen-survivor lane + tribal/chosen-type survivor lane; found all-opponents / spare-my-board lane: (o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control") + save-one/chosen-survivor lane + tribal/chosen-type survivor lane. |
| Representative row: ColorPie!A36:E36 Master Status | PASS | Expected Review; found Review. |
| Representative row: ColorPie!A129:E129 Master Query Fragment | PASS | Expected produces:[MANA]; found produces:[MANA]. |
| Representative row: ColorPie!A26:E26 Master Query Fragment | PASS | Expected t:instant o:/counter target.*spell/; found t:instant o:/counter target.*spell/. |
| Representative row: DeckArchetypes!B34 Preferred Strategy | PASS | Expected governed recipe + classifier; found governed recipe + classifier. |
| Representative row: DeckArchetypes!B55 Master Status | PASS | Expected Semantic; found Semantic. |
| Representative row: CreatureTypes!A1 Master Status | PASS | Expected Production-ready; found Production-ready. |
| Exact candidate scope | PASS | 24 planned Master rows and no others. |
| Candidate labeling | PASS | README prominently labels the workbook as a non-authority candidate. |

## Formula / Reference Checks

- Authority formula cells: 89. Candidate formula cells: 89.
- Artifact-tool formula-error inspect completed with no manual error-cell matches. Compact inspect output length: 60 characters.
- Candidate workbook was exported and re-imported successfully before reports were finalized.
- The existing `scripts/verify-maze-knowledge.py --stage workbook` verifier completed successfully against the regenerated candidate and wrote its inventory outside the repository.
- Rendered previews for all 34 sheets plus a focused `Master_Lexicon!A907:O910` row-909 crop were reviewed. Workbook structure and styling remain intact; the separated lanes, Review status, and 0.68 confidence are visible without clipping or overlap.

## Raw Corpus and Provenance Proof

- Raw corpus manifest before/after: febfc752142a4085d85f3b9d7081d708fa5c1aa5df36bfd6a6b1a87805fe0431 / febfc752142a4085d85f3b9d7081d708fa5c1aa5df36bfd6a6b1a87805fe0431; 1 file(s).
- VM-577 source workbook SHA-256 before/after: c4b45e146ad3d9022dd18edd6bc09c2509b4a13d2781945f43cda2e4af4bfaa8 / c4b45e146ad3d9022dd18edd6bc09c2509b4a13d2781945f43cda2e4af4bfaa8.
- V3.2 authority workbook SHA-256 before/after: 8cf5c386815872caeab90919ee2464a4b987c2f5d8887f6b005fd54bc110f90e / 8cf5c386815872caeab90919ee2464a4b987c2f5d8887f6b005fd54bc110f90e.
- Raw scryall_data_accumulation logical matrix hash: bfb88c2e1a5479bea56333e96a9a7518f085db28eecb46237d47bba8c372406b; unchanged from authority.

## Syntax and Tagger Checks

- No introduced legal:, is:etb, standalone colors:, undocumented regex helper, or trailing regex-flag syntax.
- Newly introduced otag values: board-wipe; all are present in Tagger_Allowlist.
- Preserved baseline non-allowlisted otag values still visible in Master_Lexicon: reanimate. These were not introduced by propagation and remain an explicit future-review class.
- All 24 changed rows resolve every CAL/EV trace against Learned_Rules or Evidence_Closure_V3_2.

## Representative Positive / Negative Spot Checks

- Positive: ColorPie!A35:E35 contains the EV-003 board-wipe intersection core and role-labeled alternate lanes.
- Positive: ColorPie!A36:E36 uses the target-one-opponent family as its primary lane, keeps EV-001's all-opponents/spare-my-board family in a separately labeled alternate lane, retains survivor lanes, and remains Review.
- Positive: ColorPie!A129:E129 uses produces:[MANA] with explicit self/alternate/untap/grantor classification.
- Positive: the already-governed Counterspell and Group Slug rows remain unchanged and retain their frozen primary lens/classifier contracts.
- Negative: DeckArchetypes!B55 Goodstuff remains Semantic; no subjective quality proxy was invented.
- Negative: CreatureTypes!A1 Advisor remains Production-ready native taxonomy; unrelated rows were not rewritten.
- Negative: Tokens no longer introduces the non-allowlisted token-generator Tagger shortcut.

## Count Reconciliation

- Baseline: 1,138 Master rows. Already governed: 3. Eligible: 1,135.
- Eligible outcome: 24 changed + 1111 unchanged = 1135.
- Candidate status totals: 666 Production-ready + 287 Review + 185 Semantic = 1,138.
- Candidate confidence distribution: 0.99:527, 0.3:179, 0.88:134, 0.95:105, 0.82:104, 0.68:49, 0.94:16, 0.96:9, 0.35:5, 0.92:4, 0.86:2, 0.9:2, 0.45:1, 0.97:1.

## Validation Commands

- Bundled artifact-tool producer: node scripts/propagate-maze-calibration-v3-2.mjs
- Existing repository verifier: bundled Python scripts/verify-maze-knowledge.py --stage workbook against the candidate, with output written to a temporary directory.
- Focused source/diff hygiene: git diff --check
- No npm runtime, parser, placement, browser, journey, synthetic, mutation, recovery, or deployment suite was run; those surfaces are protected and untouched.

## Owner Acceptance Boundary

Owner accepted the exact 24-row candidate, including the remediated row-909 Review contract. Deterministic population, formula, provenance, syntax, Tagger, trace, and unchanged-history facts remain machine-checked. This acceptance promotes workbook authority only.

Candidate workbook SHA-256: f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5.
