# Archscry Phase 3 Experienced-Player Routing Proof Handoff

- Agent name: Codex
- Task requested: reconstruct current Archscry routing, measure accepted production witnesses, test C01–C04 and equal-opportunity safety, design a paired adversarial proof, create one research card, and stop without implementation.
- Related work: VM-579, VM-586, VM-587, VM-588, VM-593, VM-594.
- Disposition: `BLOCKED — NO SAFE ROUTING SEAM`
- Owner-review status: `OWNER ACCEPTED — 2026-08-29`; final lifecycle closeout is recorded in [the VM-594 closeout handoff](2026-08-29-1848-codex-vm594-owner-accepted-closeout.md).

## Plain-English Result

The shortcut could have value because the accepted witness median is eight questions. It is not safe to implement from the current engine. Equal question utility does not mean equivalent evidence: three of four exact tied opportunities permit different terminal public-result sets when forced first. C01–C04 leaves zero qualified identities and up to eight candidates, so a wrong prior could change which contradiction or boundary is observed before stopping.

Floor: `NO SAFE PRIOR-ASSISTED FLOOR FOUND`. Launch classification: `POST-LAUNCH ENHANCEMENT`, distinct from roadmap sequence.

## Files Reviewed

- `AGENTS.md`; RobDev/RobQA skills, guides, and frozen gates; handoff index and board.
- Phase 1 freeze; VM-586/587/588/593; Phase 2 contract/fixtures and Phase 3 handoff; behavioral-model roadmap.
- Gate B1 architecture/instrument/versioning, model/engine/runtime questionnaire, Gate A presenter, dossier reading owner, state/cache seams, question bank/mappings, accepted witnesses, VM-579 seams, focused result fixtures, and telemetry contract.
- Git history since Phase 2 and exact repo/worktree state.

## Files Changed

- `scripts/audit/archscry-phase-3-routing-analysis.mjs`
- `docs/research/archscry-phase-3-routing-baseline.json`
- `docs/research/archscry-phase-3-experienced-player-routing-proof.md`
- `docs/kanban/done/VM-594-archscry-phase-3-experienced-player-routing-proof.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-29-1741-codex-archscry-phase-3-routing-proof.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed / Why

Added a read-only analyzer/report so the owner need not replay readings; one compact analysis reconstructing routing, value, floor/equivalence safety, future proof, and blocker; and required card/handoff governance.

## RobDev Compact Packet

- Product outcome: current-truth Phase 3 decision without production behavior changes.
- Current behavior: fixed C01–C04, two/three adaptive Hall, optional one Crucible/lens, six-to-eight main questions, engine stopping, Gate A normalization.
- Locked decision: prior is context only and cannot influence placement truth.
- Authority/producer: Gate B1 engine/model for runtime truth; accepted witnesses for deterministic reachability; VM-588 for prior boundaries; authored research for this conclusion.
- Reused machinery: production exports/routing trace, accepted witnesses, Gate A presenter, existing fixtures.
- Changed behavior: research/audit output and repository decision only.
- Protected behavior: every runtime, placement, UI, state, persistence, telemetry, dossier, Yore, Loom, and Phase 4 contract.
- Consumers: owner review and any future separately authorized proof reopening.
- Smallest change: one analyzer/report, one analysis, one card, required handoff/index updates.
- Non-goals: assisted route/equivalence engine, prior capture/UI/storage, participant collection, analytics events, deployment.
- Stop reached: no branch-equivalence certificate; no implementation story created.

## Decisions / Risks

- `C01–C04 NOT VIABLE AS FLOOR CANDIDATE`.
- `NO SAFE PRIOR-ASSISTED FLOOR FOUND`.
- Equal scalar utility is not safe equivalence; no savings threshold is recommended yet.
- Deterministic witnesses are not real-player prevalence; branch signatures also cannot model human order effects.

## Tests Run

- `node scripts/audit/archscry-phase-3-routing-analysis.mjs` — generated 37-witness baseline.
- `node scripts/audit/archscry-phase-3-routing-analysis.mjs --check` — PASS; all 37 routes match current selection.
- Markdown relative-link check — PASS; all Phase 3 references resolve.
- Baseline-claim check — PASS; 37/37 current routes, 6/4/27 count distribution, zero C04 qualifications, and one of four equal-utility opportunities with equal public terminal sets.
- Changed/protected-path check — PASS; no runtime, data, test, VM-593, or VM-578 mutation.
- `node --check scripts/audit/archscry-phase-3-routing-analysis.mjs` — PASS.
- New authored-file trailing-whitespace check — PASS.
- `git diff --check` — PASS; only line-ending warnings on the two existing indexed Markdown files.

## RobQA Readiness

- QA tier: `QA-0` — docs/research plus non-runtime read-only tooling.
- Protected behavior intentionally untouched: runtime placement/UI/telemetry/persistence/dossiers/VM-593/VM-578.
- CPU-heavy validation: `NOT REQUIRED`; no placement code/model/question/mapping behavior changed.
- Browser QA: skipped; no rendered product changed.
- Remaining owner judgment: accept/modify/reject the blocker conclusion and post-launch priority. No manual replay is needed.

## Not Touched

No runtime product file, CSS/HTML, placement source/model/mapping/question/witness authority, dossier, persistence, telemetry, deployment, VM-593, VM-578, participant data, or Phase 4 work. Protected `docs/research/maze-player-language/corpus/vm578.zip` was not read, modified, staged, moved, or incorporated.

## Follow-Up / Next Agent

Stop at Owner Review. If future evidence authorizes branch equivalence, reopen proof design before any assisted implementation story. Next: Owner review; no implementation agent.

## Related

- [VM-594](../kanban/done/VM-594-archscry-phase-3-experienced-player-routing-proof.md)
- [Phase 3 analysis](../research/archscry-phase-3-experienced-player-routing-proof.md)
- [Phase 2 contract](../contracts/archscry-product-contract-v1.md)
- [Behavioral roadmap](../architecture/behavioral-model-integration-roadmap.md)
