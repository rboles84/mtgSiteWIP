# VM-551 Gate B1 Instrument Completion Handoff

- Agent name: Codex
- Task requested: Complete the Gate B1 measurement instrument so all 36 behaviorally observable identities have legitimate responsible-primary paths, preserve Yore as bounded unless non-proxy evidence exists, and prove the result through exhaustive deterministic validation.
- Related card: `docs/kanban/done/VM-551-gate-b1-instrument-completion.md`

## Files reviewed

- VM-551 design, semantic adjudication, engine, routing-remediation, and generated-report records.
- VM-553 relationship guide and VM-554 source-hardening conclusions.
- VM-555 identity gap matrix, minimal expansion, Kanban card, and handoff.
- Current question/answer/construct/coverage TSVs, mapping source, generated model, engine, validator, legacy placement tests, board, and handoff index.

## Files changed

- `assets/js/gate-b1-placement-engine.js`
- `data/gate-b1-placement-model.json`
- `data/placement/gate-b1-mapping.source.json`
- `scripts/build-gate-b1-placement-model.mjs`
- `scripts/build-vm551-gate-b1-instrument-completion.mjs`
- `scripts/validate-gate-b1-placement-engine.mjs`
- Gate B1 construct/question/answer/adjudication/identity/pair TSVs.
- Gate B1 completion README and adjudication TSV.
- All deterministic Gate B1 engine reports.
- VM-551 Kanban card, board, this handoff, and handoff index.

## What changed

- Reconciled the 34/35 history: the 34-item owner-approved semantic bank became 35 when the approved C16 Hall question and four answers were added.
- Preserved all 35 starting IDs; materially refined five reusable Hall questions and added one targeted C03 question. Final bank: 16 constructs, 36 questions, 124 answers.
- Preserved the original 40 mappings as a baseline and added a separately adjudicated 36-mapping completion overlay.
- Separated identity-specific naming authorization from directional score support and qualification corroboration.
- Enforced two independent constructs/dependency groups for every public primary or alternative, with contradiction guards and no one-answer naming.
- Added qualification-aware deterministic routing, boundary-aware stopping, and optional post-reading refinement without increasing the eight-question main cap.
- Corrected public ordering so an unqualified internal score leader cannot displace the highest responsible qualified identity.
- Extended identity reachability validation through bounded optional refinement and a deterministic clean synthetic seed.

## Why it changed

VM-555 showed that the remaining failures were concentrated in reusable boundary observations, corroboration, and routing—not broad identity semantics. These changes implement the smallest evidence-supported measurement layer capable of closing those gaps without proxy questions, faction giveaways, weakened independence, or a fabricated Yore path.

## Decisions made

- Retain 16 constructs; no seventeenth construct is justified.
- Retain all 35 starting question IDs; no replacement is needed.
- Add only `b1.crucible.disruption-boundary.v1` as a net-new question.
- Treat naming authorization as permission, never score.
- Permit optional refinement to use any unused eligible Hall/targeted observation; keep the main journey at eight maximum.
- Keep Yore behaviorally unnameable and lens-bounded.
- Classify Ink as routing plus competition absorption; resolve it through bounded C14 corroboration and qualification-aware routing/refinement, not an Ink-flavored question.

## Risks / uncertainties

- All mapping and robustness results remain `MAPPING_HYPOTHESIS` / in-model evidence, not empirical player accuracy.
- Synthetic per-identity frequencies vary substantially and should guide owner natural-reading review, not be interpreted as accuracy percentages.
- The broad repository test suite retains an unrelated existing adjacent-navigation assertion about `resultStatusHtml`; no Gate B1 completion path touches that code.

## Tests run

- `npm.cmd run test:gate-b1-engine` — PASS: 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- `npm.cmd run test:gate-b1-model` — PASS.
- `npm.cmd run test:placement` — PASS: 37 factions, 37 golden paths.
- `npm.cmd run lint:js` — PASS.
- `npm.cmd run test:source-generated` — PASS with two pre-existing model-owned warnings.
- Node syntax checks for engine and three builders/validators — PASS.
- `git diff --check` and staged-path audits — PASS.
- `npm.cmd test` — partial PASS followed by the unrelated existing `archscry-adjacent-navigation-tests.js` `resultStatusHtml` assertion; its two refreshed unrelated audit reports were restored.

## Not touched

- Questionnaire presentation, CSS, prototype, dossier rendering, Matrix, Maze, persistence, schemas, certified identity records, Gate A public-state definitions, visual baselines, and unrelated research files.
- No browser/visual/Lighthouse/manual QA, player validation, recruitment, shadow testing, push, merge, deployment, migration, scoring calibration, or certification.

## Follow-up recommendations

The next manual task is owner natural-reading evaluation of the calculated primary, independently qualified alternatives, uncertainty, and refinement behavior. Treat any resulting changes as a separately authorized task.

## Next suggested agent

Owner review; no implementation agent should continue automatically.

## Commit lineage

- Starting SHA: `a0a517a1aa14c7025b3d7b8f242e55aef35b8670`
- Authority/reconciliation commit: `15d73b7`
- Instrument/engine/report commit: `f21531a`
