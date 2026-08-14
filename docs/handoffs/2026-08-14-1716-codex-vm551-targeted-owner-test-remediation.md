# VM-551 Targeted Owner-Test Remediation Handoff

## Agent name

Codex

## Task requested

Implement the narrow owner-observed remediation on the existing `codex/vm551` branch and `C:\dev\voxmana.io-vm551` worktree: monotonic Green/Witherbloom-safe refinement, one-step return, the Witherbloom voice correction, narrow player-copy cleanup, deterministic regression, and four short owner-review cases. No new branch, worktree, placement redesign, push, merge, or deployment was authorized.

## Files reviewed

- The active VM-551 Kanban record, board, handoff index, and recent deterministic-recertification handoff.
- Gate B1 refinement selection, result rendering, evidence-ledger state, and bounded-recovery tests.
- Packet 1 exact-printing voice authority and generated Witherbloom card data.
- Packet 2 dossier authority, public composition sites, all-37 witnesses, 123 confusion pairs, live UI replay, visual-review manifest, and certification matrix.

## Files changed

- Gate B1 refinement engine and Archscry result/refinement controller.
- Witherbloom exact-printing voice authority, printing builder, and runtime card resolver.
- Narrow player-mode presentation/composition sites and focused copy-integrity assertions.
- Current-engine reachability, witness, pair, mutation, replay, manifest, and certification artifacts.
- Existing VM-551 Kanban, board, handoff, and handoff index records.

## What changed

- Refinement now derives its frontier only from identities displayed in the current result, simulates every answer of every eligible unused targeted question, and excludes any question capable of introducing a public identity, broadening the frontier, or worsening the result state.
- Refinement remains one question per action with immediate result re-evaluation. A single prior result/evidence snapshot supports `Return to previous reading`; returning restores the exact snapshot and consumes it, with no generalized history stack.
- The real owner Green/Witherbloom evidence ledger no longer receives `b1.crucible.mono-multi.v1`; no misleading refinement is shown when no safe discriminator remains. The frozen Jund mixed ledger obeys the same rule.
- `Death Begets Life` was removed from public Witherbloom output and preserved as rejected audit evidence. `Witherbloom Campus` now resolves through the exact Strixhaven: School of Mages collector 423 printing and exact flavor provenance.
- Actual audit/provenance commentary and the observed source-bound wording were removed from the affected player composition sites without globally banning ordinary uncertainty language or rewriting all dossiers.
- The deterministic review manifest now exposes `wubrg`, `green-witherbloom-tied`, `jund-mixed`, `witherbloom`, and an internal reversible-refinement regression. The Green/Witherbloom case is explicitly a preserved real owner-ledger render regression, not current-route reachability evidence.

## Why it changed

Owner testing found that an otherwise valid Green/Witherbloom result could be broadened by an unsafe refinement, that refinement could not be reversed one step, that a Witherbloom voice relationship admitted its own false-positive limitation, and that a small set of methodology phrases remained player-visible. The implementation converts each observed defect into a bounded class-level contract without changing placement meaning.

## Decisions made

- Safety is evaluated over every possible answer to a candidate refinement question, not merely the most favorable answer.
- Neutral or conditional answers may leave a result unchanged, but a refinement question must still differentiate the displayed frontier and cannot admit any broader/worse outcome.
- `b1.crucible.mono-multi.v1` remains part of the approved instrument and is excluded only where its simulated outcomes violate the active public frontier.
- Reversibility is exactly one step using existing result/evidence state, not a history or undo subsystem.
- Exact flavor evidence uses printing-level identity; Oracle identity alone is insufficient for printing-specific public voice.

## Risks / uncertainties

- No owner-only interpretation remains in this remediation.
- The Green/Witherbloom visual case uses the exact preserved owner evidence ledger because current safe routing does not recreate the historical unsafe path. It verifies rendering and the no-discriminator contract, not current route selection.
- The broad root `npm test` remains unable to run the optional dossier-followup fixture because the ignored bulk file `data/scryfall/raw/oracle-cards.json` is absent. Canonical Packet 1/runtime card authority tests pass without it.
- The broad legacy browser smoke still fails its unrelated Home-page canvas pixel assertion before reaching Archscry. The dedicated Gate B1 runtime, questionnaire, all-37 UI, responsive, card, glossary, refinement, and certification suites pass.
- The legacy Gate A owner-QA script retains an unrelated stale copy assertion (`Research this precon`). Gate A is protected and was not changed; real Archscry session-result restoration is covered by the targeted browser regression.

## Tests run

- Packet 1/2/3 authority builders and validators: PASS; 37/37 rationale, 37/37 exact voice, 37 identity dossiers, 126 comparisons, 42 glossary records, zero owner exceptions.
- Witherbloom voice integrity: PASS; `Death Begets Life` public absence plus rejected audit retention, exact Witherbloom Campus printing/flavor/media provenance, 37/37 voice coverage.
- Dossier integrity and targeted recovery: PASS; 2,000 deterministic recovery journeys, no unsafe Green/Witherbloom or Jund refinement, no repeat/no-op loop.
- Targeted browser cases: PASS for Green/Witherbloom, reversible refinement, Jund mixed, WUBRG, and Witherbloom.
- Current-engine live UI replay: PASS for all 37 identities at desktop, intermediate, and mobile widths.
- Certification: PASS; 621 `PASS`, eight justified `NOT_APPLICABLE`, zero `FAIL` across 629 cells.
- Gate B1 model/engine: PASS; 16 constructs, 36 questions, 124 answers, 37 identities, 123 pairs, 5,000 journeys, 6,660 synthetic runs, 881 mutations, 36 responsible primaries plus bounded Yore.
- Qualified-alternative result contract: PASS across 5,000 valid journeys.
- Runtime, questionnaire presentation, provider/Maze (155 providers, 147 paths, zero hidden restrictions), legacy 37 placement paths, source/generated guards, JS/HTML lint, frontend smoke, and copy-boundary tests: PASS.

## Not touched

- Gate A implementation or state contract.
- Placement constructs, question/answer wording, stable IDs, mappings, scoring, ranking, qualification, normal routing/stopping, six-to-eight-question journey, or Yore behavior.
- Certified identity truth, Matrix calculations, persistence/schema contracts, or Maze semantics.
- No new branch/worktree, push, merge, deployment, migration, empirical player validation, or unrelated research/copy program.

## Follow-up recommendations

Run the four shortest deterministic owner cases:

```powershell
npm.cmd run review:vm551 -- --case=wubrg
npm.cmd run review:vm551 -- --case=green-witherbloom-tied
npm.cmd run review:vm551 -- --case=jund-mixed
npm.cmd run review:vm551 -- --case=witherbloom
```

Close VM-551 only after that short visual/product acceptance pass.

## Next suggested agent

Owner visual/product review; Codex only for a narrowly reproduced finding or owner-acceptance closeout.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- `docs/audits/vm551-all-37-dossier-closeout/visual-review-manifest.json`
- `docs/audits/vm551-all-37-dossier-closeout/live-ui-witness-replay.json`
- `docs/audits/vm551-all-37-dossier-closeout/surface-completion-matrix.tsv`

## Scoped commits

- `f6f8c48` — monotonic and reversible result refinement.
- `48680b9` — false-positive Witherbloom voice replacement.
- `a0a0ef7` — narrow dossier methodology-copy removal.
- Final recertification commit recorded at task completion.
