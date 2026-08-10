# VM-551 Gate B1 Qualified Alternatives Result Contract Repair Handoff

## Agent name

Codex

## Task requested

Repair the narrow calculated-result contract that allowed a Gate B1 close reading to render an undefined secondary identity and caused qualified Gate B1 observations to fall through the production explanation builder. Preserve the accepted runtime-repair candidate at `6e262923aebb401fc96711389673c4e1f9a5db2f`, validate large deterministic journey coverage, perform one minimal calculated-close smoke, and stop after one unpushed commit.

## Files reviewed

- `assets/js/gate-b1-placement-engine.js`
- `assets/js/archscry-presentation.js`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `data/gate-b1-placement-model.json`
- `data/factions.json`
- Gate A result-state and compatibility plans
- Gate B1 engine, instrument-completion, and runtime-repair handoffs
- Related Kanban and board records

## Files changed

- `assets/js/archscry-presentation.js`
- `scripts/vm551-gate-b1-qualified-alternatives-tests.mjs`
- `scripts/lint-frontend-js.mjs`
- `package.json`
- `docs/kanban/done/VM-551-gate-b1-qualified-alternatives-result-contract-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-10-0051-codex-vm551-gate-b1-qualified-alternatives-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added a canonical Gate B1 public-result normalizer at the existing Gate A presentation adapter boundary.
- Reconciled independently qualified Gate B1 identity records with complete production faction match objects without creating another alternative-data authority.
- Enforced public state/cardinality rules: zero alternatives for `primary`, exactly one qualified secondary for `close`, only valid co-leader data for `tied`, and at most two independently qualified directions for `mixed`.
- Downgraded orphan close states rather than naming an unqualified or absent runner-up.
- Added a presentation-only evidence adapter that derives existing renderer inputs from native Gate B1 positive/contradiction observations while leaving the engine ledger unchanged.
- Added focused fixtures and 5,000 deterministic valid-journey assertions for malformed-result prevention and evidence delivery.

## Why it changed

The raw engine could return `result_state: close` with only Selesnya in `top_matches` and empty `adjacent_matches` / `alternatives`. Gate A preserved that incompatible explicit state, while the heading interpolated the absent secondary name as `undefined`. Separately, Gate B1 alternatives used identity-qualified records while production expected full faction match objects, and the dossier explanation path understood legacy `deltas` rather than the native Gate B1 evidence ledger.

## Decisions made

- Engine qualification records remain the sole authority for whether an alternative may be named.
- The adapter resolves renderer-compatible match shape and cardinality; it does not score, promote, or fabricate candidates.
- Alternative rank alone is insufficient. Every displayed identity must be independently name-qualified, meaningfully supported, free of disqualifying contradiction, known to production faction data, and backed by direct positive adapted evidence.
- A tertiary result is exposed only in the `mixed` state; close and tied continue to suppress rank three under the Gate A contract.
- Existing authored question and answer copy supplies explanation titles/prompts; no new player-facing evidence prose was invented.

## Risks / uncertainties

- This repair validates object integrity and renderer compatibility, not real-player placement accuracy.
- The engine may legitimately normalize an internally requested close state to primary when no independently qualified secondary exists.
- Owner natural-reading review remains the next product-quality gate.

## Tests run

- `npm.cmd run test:gate-b1-result-contract` — PASS; fixed contract fixtures plus 5,000 deterministic valid journeys (`2450 primary`, `1827 insufficient`, `267 contradictory`, `352 mixed`, `78 close`, `26 tied`).
- `npm.cmd run test:placement` — PASS; 37 factions and 37 legacy golden paths.
- `npm.cmd run test:gate-b1-runtime` — PASS; completed model accepted, C01–C04 fixed, incomplete fixture rejected.
- `npm.cmd run test:gate-b1-model` — PASS; 16 constructs, 36 questions, 124 answers, 37 identities, 123 pairs, 76 directional uses.
- `npm.cmd run test:gate-b1-engine` — PASS; 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- `npm.cmd run test:source-generated` — PASS with the two established model-owned JESKAI/MARDU warnings.
- `npm.cmd run lint:js` — PASS for ten frontend files.
- Node syntax checks for changed JavaScript/MJS files — PASS.
- `git diff --check` — PASS.
- Local static-server calculated-close smoke at `http://127.0.0.1:4175/archscry/` — PASS; rendered `Close result: Jund, with Red also supported`, exactly one close alternative, direct answer-derived Red evidence, no `undefined`, no missing-evidence fallback, and no console errors.

## Not touched

- Scoring, mappings, ranking, routing, question selection, naming qualification, stopping, and refinement
- The 36 questions, 124 answers, stable IDs, and completed instrument semantics
- `assets/js/gate-b1-placement-engine.js`
- Generated model/data and machine-readable engine reports
- Identity definitions and certified authority
- Production dossier section definitions, Matrix, Maze, persistence, schemas, and visual design
- Push, merge, deployment, migration, scoring, certification, recruitment, shadow testing, and player validation

## Follow-up recommendations

Owner should resume natural calculated-reading testing from this repair candidate. Any placement-quality or copy finding should be authorized separately rather than folded into this contract repair.

## Next suggested agent

Owner natural-reading test; no further agent task is authorized by this handoff.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-551-gate-b1-qualified-alternatives-result-contract-repair.md`
- `docs/kanban/done/VM-551-gate-b1-runtime-integration-repair.md`
- `docs/handoffs/2026-08-09-2319-codex-vm551-gate-b1-runtime-integration-repair.md`
- Exact base: `6e262923aebb401fc96711389673c4e1f9a5db2f`
- Final repair commit: the commit containing this handoff; exact SHA returned to the owner.
