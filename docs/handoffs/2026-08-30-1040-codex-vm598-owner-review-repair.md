# VM-598 Owner Review — Final Lorehold Narrow Repair

## Agent name

Codex

## Task requested

Apply the owner-listed P1–P3 Lorehold corrections, run the focused RobQA validation, record pending SIRF deltas without changing the framework, and stop at Owner Review with no commit or push.

## Files reviewed

- `AGENTS.md`, repo-local RobDev/RobQA instructions, VM-598 card and prior handoff
- Lorehold raw profile, faction builder, generated faction surface, dossier source/catalog, precon source/catalog, foundation/presentation, shared precon rationale owner, and focused tests
- Current VM-595/596/597 dirty-worktree state and the live replay/audit scripts

## Files changed

- `data/raw-factions/lorehold/lorehold.profile.json`
- `scripts/build/build-faction-artifacts.mjs`
- `data/factions.json` (builder-produced Lorehold projection)
- `data/dossier/identity-dossier-content.source.json`
- `data/dossier/identity-dossier-content.catalog.json`
- `assets/js/archscry/dossier/foundation.js`
- `assets/js/archscry/archscry-presentation.js`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
- `data/precons/vox-mana-precon-catalog.schema.json`
- `tests/archscry/lorehold-semantic-repair-tests.js`
- VM-598 card and this handoff/index

## What changed and why

- P1: Replaced Lorehold Legacies/Osgir's evaluative strategy language with the verified sacrifice-and-reconstructed-token-copy behavior. The focused regression test rejects `milestone`, `praised`, and `power upgrade` anywhere in that official-source record.
- P2: Added a raw-profile `display_philosophy` and the narrow Lorehold builder override, then rebuilt the faction surface. The opening no longer promises prediction or universal physical recklessness.
- P2: Kept exactly three primary Start Here lanes: Spirit Witnesses / Graveyard-Leaves, Relic Reconstruction, and History & Spells. Combat History remains commander-supported in explanatory copy only.
- P2/P3: Reframed the Fit tension as preservation/discovery rather than a required fieldwork sequence; broadened the role to `History in action`; separated uncertainty/reuse/reconstruction pressure from the table-facing `History fights back` experience; removed `Opponents feel the deck`.
- P3: Replaced rendered `Boros` wording with `red-white` in Rebellion Rising and the two remaining Lorehold Exact-color output descriptions found by the focused scan. Native products remain first.
- Deferred shared stretch rationale process language: its owner is shared and concurrently modified; no Lorehold-specific workaround was added.

## RobDev compact packet

- Authority/producer: owner review prompt; Lorehold raw profile for displayed identity; dossier/precon authored sources for public/product copy; existing faction/dossier/precon builders for outputs.
- Changed behavior: the Lorehold opening, three-lane taxonomy, Fit/Play composition, and relevant Native/Exact rationale copy render with the approved semantic boundaries.
- Protected behavior: Native > Exact > Stretch algorithm, certified claims/placement/scoring/routing, SIRF framework, shared fallback renderer, all non-Lorehold content, and concurrent VM-595/596/597 changes.
- Non-goals: framework redesign, precon relationship model changes, global copy remediation, commits, pushes, or CRIT-001 work.

## RobQA readiness

- PASS: `npm.cmd run build:identity-dossier-content`; `npm.cmd run build:precons`; `npm.cmd run test:identity-dossier-content`; `node tests/archscry/lorehold-semantic-repair-tests.js`; `node tests/archscry/precon-rationale-presentation-tests.js`; `node scripts/validate/validate-source-generated-guardrails.mjs --targets=LOREHOLD` (one inherited model-owned inhibitor warning); desktop and mobile engine-only LOREHOLD replay; `git diff --check`.
- BLOCKED (shared baseline): full desktop replay fails at existing rationale-preview cleanup; full mobile replay fails its existing VM-565 `glossary_artifacts` expectation; VM-595 check refuses the dirty dossier-owner population. These were not altered.
- Faction build: wrote the Lorehold generated projection but ended on a concurrent `EPERM` lock at `data/placement-model.schema.json`; no generated-file hand edit or retry against that shared lock occurred.

## P0–P3 classification

- P0: none.
- P1: repaired — Osgir strategy and official-source evaluation language.
- P2: repaired — source-owned opening, three-lane taxonomy, no `/ Artifacts` label, Fit tension, and broad role.
- P3: repaired where Lorehold-owned — opponent/pressure/table distinction and Exact rendered color shorthand; deferred where shared — fallback process language in `precons.js`.

## Pending SIRF delta register

- A terminology collision: `historic` must remain a rules term, not ordinary history shorthand.
- B provenance rebinding: official URLs do not validate inherited prose.
- C relationship distinction: card affiliation is not precon inclusion.
- D display source gap: a raw-profile-owned public identity field was required.
- E concurrent baseline fallback: shared owner-path drift can leave global checks blocked despite focused proof.

## Risks / uncertainties

The owner must review the real Lorehold dossier because shared full-browser checks are blocked. The pre-existing model-owned inhibitor warning remains outside this semantic repair. Shared precon fallback process language remains intentionally deferred.

## Not touched

Raw Lorehold claims, placement model/scoring, aliases/routing, shared precon rationale owner, SIRF framework, VM-595 analyzer/baseline, non-Lorehold semantics, commits, and remote state.

## Follow-up recommendations

Owner review only: confirm the opening, Start Here, Test the Fit, How This Plays, What to Look For, and Native-first precons. After concurrent changes reconcile, rerun full desktop/mobile replay and VM-595 from a clean owner-path baseline.

## Next suggested agent

Owner reviewer.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-598-lorehold-semantic-integrity-repair.md`
- `docs/handoffs/2026-08-30-1002-codex-vm598-lorehold-semantic-integrity-repair.md`
- owner-review repair prompt
