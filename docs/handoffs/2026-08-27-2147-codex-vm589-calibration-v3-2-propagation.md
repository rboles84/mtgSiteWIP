# VM-589 Calibration V3.2 Controlled Propagation Handoff

> Superseded for Owner Review by the bounded row-909 remediation in `2026-08-27-2211-codex-vm589-row909-remediation.md`. This file remains the historical first-candidate record.

## Agent name

Codex

## Task requested

Apply the frozen Implicit Maze Calibration V3.2 rules to the remaining eligible `Master_Lexicon` population, produce a separate candidate workbook plus complete human- and machine-readable diffs, validate it under RobQA, and stop for Owner Review without runtime propagation.

## Repository state

- Branch: `main`
- Baseline / current HEAD: `fb738da7affdfb1da1f56d05cea2fc55cb69db4b`
- Divergence from `origin/main` at pre-flight: 0 behind / 2 ahead.
- Candidate/change SHA: none; this owner-review package is uncommitted.
- Pre-existing untracked V3.2 authority, evidence, query-reference, and VM-578 corpus inputs were preserved.
- A separate historical archive tag, `archive/historical-vm578-player-language-corpus-0204cfa` at `0204cfa2c402f647dad68585bcd96b59dd4bcd42`, preserves the VM-578 object; it was not merged, rewritten, or used as a worktree target.

## Files reviewed

- `AGENTS.md`, `CLAUDE.md`
- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`, relevant VM-577 and VM-578 handoffs
- `docs/kanban/board.md`, relevant VM-577 and VM-578 cards
- all four V3.2 authority-package inputs and relevant evidence files
- all 34 workbook sheets, including full `Learned_Rules`, `Translation_Contract`, evidence, calibration, allowlist, and provenance surfaces
- `scripts/verify-maze-knowledge.py` and existing workbook-tooling conventions

## Files changed

- `scripts/propagate-maze-calibration-v3-2.mjs`
- `docs/research/maze-player-language/calibration/v3.2/propagation/Scryfall_Maze_Master_Propagation_Candidate_V3_2.xlsx`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.csv`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_QA.md`
- `docs/kanban/in-progress/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What changed

- Reconciled 1,138 unique Master Lexicon rows, three already explicitly governed rows, and 1,135 eligible rows. The expected 1,038 was low by 97 because the 100 VM-578 request fixtures are not one-to-one lexicon rows.
- Evaluated all 1,135 eligible rows under the frozen V3.2 authority order.
- Changed exactly 24 rows and left 1,111 eligible rows unchanged.
- Recorded seven status-rank promotions, one downgrade, eleven Multi-Lens conversions, and candidate totals of 667 Production-ready / 286 Review / 185 Semantic.
- Added only a candidate banner to README outside `Master_Lexicon`; all other supporting and historical sheets remain logically unchanged.
- Produced a 24-row CSV with every required old/new field, authority/evidence source, rule trace, status movement, and rationale.

## Why it changed

Historical rows still contained unsafe single-query interpretations for counter polysemy, wipes, mana production, recursion, token creation, Treasure, and composite archetypes. V3.2 supplies deterministic corrections or role-lane contracts for those cases. Rows without a material governed change were deliberately left alone.

## Decisions made

- The three V3.2-vs-source Master changes—Counterspell, Reanimator, and Group Slug—were treated as already governed and excluded from automatic reclassification.
- Later evidence closures control when older learned-rule language conflicts.
- `produces:` remains capability evidence and cannot establish self-production, duration, or repeatability.
- Board wipes use the EV-003 intersection core plus separately visible alternate/review lanes.
- Composite player concepts use small named roles rather than opaque OR queries.
- Subjective archetypes remain Semantic without an approved proxy.
- The existing non-allowlisted `otag:reanimate` reference is frozen prior V3.2 history; this pass introduced no non-allowlisted Tagger value.

## RobDev compact packet

- Owning authority: Calibration V3.2 workbook, Evidence Gate CLOSED V3.2, syntax/regex reference, validated Tagger allowlist, then query cookbook.
- Producer: `scripts/propagate-maze-calibration-v3-2.mjs`, reusing the bundled artifact-tool and existing repository verifier conventions.
- Changed behavior: candidate-only Master Lexicon classification/query contracts and review artifacts.
- Protected behavior: raw corpus, raw provenance sheet, V3.2 authority workbook, historical evidence, formulas, runtime code, Plain Reading, Operator Hand, Archscry, placement, telemetry, and generated product data.
- Consumers: owner review now; no production consumer is authorized.
- Smallest complete implementation: 24 exact row edits, README candidate label, complete diff, deterministic integrity checks, rendered workbook QA.
- Non-goals: runtime implementation, new research campaign, invented syntax/tags, authority promotion, merge, or Done status.
- Stop condition: reached Owner Review; no further propagation is authorized without owner acceptance.

## Risks / uncertainties

- Seven status-rank promotions and the Treasure downgrade require product judgment even though their provenance and mechanics are deterministic.
- `produces:` duration/repeatability remains a future targeted classifier problem.
- Broad relationship archetypes and subjective archetypes still need targeted calibration, not invented proxies.
- The frozen Reanimator fallback references `otag:reanimate`, which is absent from the current allowlist; it was preserved rather than silently rewriting history.

## Tests run

- Artifact-tool candidate generation, 34-sheet render, export, re-import, formula inventory, formula-error scan, row-identity checks, trace resolution, syntax scan, Tagger scan, exact-scope checks, provenance/history logical hashes: PASS (36 checks).
- Independent authority-to-candidate all-sheet comparison: PASS; zero formula-definition changes, six expected recalculated Dashboard values, exactly 24 declared Master source rows plus two README label cells, and zero unexpected non-formula differences.
- Existing `scripts/verify-maze-knowledge.py --stage workbook` against the candidate with temporary output: completed successfully.
- Visual review of 34 rendered sheets across three contact sheets: PASS.
- CSV parse: 24 rows, 24 unique source identities, zero missing traces, authorities, or reasons: PASS.
- `git diff --check`: PASS; only the repository's existing LF/CRLF warning was emitted.
- Heavy runtime/parser/placement/browser/journey/synthetic/mutation/recovery suites: not run; no protected runtime behavior changed.

## RobQA readiness

- Tier: QA-0 with protected workbook/data-authority checks.
- Changed behavior and protected contracts are named above.
- Deterministic checks are complete and reproducible; no runtime validation is warranted.
- Owner queue: inspect the 24-row diff, especially seven promotions, one downgrade, eleven Multi-Lens conversions, and future-calibration disclosures.
- Disposition: **READY FOR OWNER REVIEW — not PASS, not production authority**.

## Not touched

- `docs/research/maze-player-language/corpus/` contents
- `scryall_data_accumulation`
- the approved V3.2 authority workbook and evidence package
- historical owner/calibration/evidence sheets
- Plain Reading, Operator Hand, Archscry, production JavaScript, runtime data, placement, telemetry, or deployment surfaces
- unrelated VM-578/player-language work and branch history

## Follow-up recommendations

1. Owner reviews the candidate workbook, Markdown diff, CSV diff, and QA report.
2. Owner either accepts the candidate as the next authority or returns specific row findings; no production propagation occurs in this story.
3. If accepted, open a separate governed promotion/runtime story. Convert any real owner finding into the narrowest systemic regression invariant.

## Next suggested agent

Owner reviewer. If findings are returned, Codex/RobDev should remediate only the named rows and rerun the same deterministic producer and RobQA set.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_QA.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
