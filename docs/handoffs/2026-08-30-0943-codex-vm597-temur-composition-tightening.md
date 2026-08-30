# VM-597 — Temur Composition Tightening

- Agent: Codex
- Task requested: Tighten rendered Temur repetition using the strongest existing section-role model, without changing Temur's semantic model.
- Related card: `docs/kanban/in-progress/VM-597-temur-semantic-repair.md`
- Status: Owner Review Ready; no commit or push.

## Authority and scope

The owner’s rendered-copy feedback and the active VM-597 card authorize this presentation-only correction. The approved Temur dossier source owns Fit/Play/Look For copy; Temur presentation owns the primary hero translation; Temur Commander guidance owns Start Here. The shared precon recommender, data relationships, placement/scoring, aliases, routes, and semantic/provenance model were protected.

## Files reviewed

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/dossier/foundation.js`
- `assets/js/archscry/dossier/reading.js`
- `data/identity-layers.json`
- `data/dossier/identity-dossier-content.source.json` and generated catalog
- `tests/archscry/temur-semantic-repair-tests.js`

## Files changed

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/dossier/foundation.js`
- `assets/js/archscry/dossier/reading.js`
- `data/identity-layers.json`
- `data/factions.json` (regenerated display projection)
- `data/dossier/identity-dossier-content.source.json` and catalog
- `tests/archscry/temur-semantic-repair-tests.js`
- VM-597 card, handoff index, and this handoff

## What changed

- Opening now states the identity thesis only: Green acceptance, Blue knowledge, and Red action in tension.
- Start Here now gives one concise invitation, the four primary directions once, no generic `Why these appear` repetition, a mechanical boundary, and a brief caution.
- Test the Fit now covers positive fit, accepted tension, and generic-legality boundary without relisting lanes.
- How This Plays separates table feel, lore era, mechanical boundary, and the optional Vox Mana lens.
- What to Look For retains the four definitions; the lens is explicitly optional.

## RobDev compact packet

- Changed behavior: Temur’s rendered adjacent composition no longer repeats lane lists, Commander-plan framing, or optional-lens explanation without adding value.
- Protected behavior: all approved semantic claims and classifications; Native Temur Roar remains first; generic exact and Stretch classification remains data-driven.
- Reused machinery: existing Temur source/presentation/guidance composition plus the existing Start Here detail builder.
- Non-goals: no model, placement, recommendation, route, alias, neighboring identity, or shared precon-copy rewrite.

## RobQA readiness

- QA tier: QA-1 presentation/copy.
- Tests run: `node tests/archscry/temur-semantic-repair-tests.js`; `npm run build:identity-dossier-content -- --check`; changed-file `node --check`; `git diff --check`.
- Rendered evidence: fresh localhost TEMUR direct-review replay shows the thesis-only opening, no `WHY THESE APPEAR`, the four Start Here directions, qualified optional lens, and first precon `nativeExact` / Temur Roar.
- Manual finding converted to invariant: explicit Temur starter directions suppress the otherwise redundant generic explanation; the focused test asserts the remaining Start Here detail labels.
- CPU-heavy suites: NOT REQUIRED; no placement, ranking, or shared recommendation logic changed.

## Builder limitation

`npm run build:factions` wrote the necessary `data/factions.json` display projection, then stopped on the known concurrent lock for `data/placement-model.schema.json`. No protected placement file was hand-edited, and the lock does not block the rendered Temur presentation candidate.

## Not touched and next step

No commit, push, staging, semantic-model change, or unrelated worktree cleanup occurred. Owner Review should read the TEMUR dossier top-to-bottom once; deterministic classification remains verified.

## Follow-up: precon rationale repetition

The owner identified repeated exact-color boilerplate on every Temur precon card. The shared precon presenter now suppresses only the generic `This deck shares the reading's … color identity` rationale for Native Fit and Exact-color cards, whose badges already convey that relationship. Stretch cards retain their meaningful added-color explanation. The focused TEMUR test and fresh localhost DOM replay confirmed Temur Roar and every Exact card have no rationale paragraph, while Stalwart Unity and Entropic Uprising retain their White/Black Stretch explanation. This is a shared presentation correction only; source relationships, grouping, rank, and recommendation logic are unchanged.

## Follow-up: precon card balance

The owner then found the suppressed cards too sparse. The presenter now substitutes each Native/Exact card's existing cataloged `mainStrategy` for the redundant fit boilerplate. This gives every card a distinct, source-derived game-plan cue without authoring an invented Temur rationale. Fresh localhost replay confirmed game-plan copy for Temur Roar, Tyranid Swarm, Mirror Mastery, Arcane Maelstrom, Tinker Time, Living Energy, and Paradox Power; Stretch cards retain their concise nearby-color explanation.

## Shared default coverage

The owner approved this as the default for all identities. `tests/archscry/precon-rationale-presentation-tests.js` now verifies all 155 catalog records: every Native/Exact rendering replaces generic fit boilerplate with the record's non-empty `mainStrategy`, while Stretch preserves relationship context. This is QA-1 shared presentation coverage; no recommendation logic, catalog relationship, or placement behavior changed.
