# VM-598 Lorehold Semantic Integrity Repair

## Agent name

Codex

## Task requested

Implement the owner-approved Lorehold Phase 2 semantic repair, run the focused RobQA loop, and stop at Owner Review without committing or pushing.

## Files reviewed

- `AGENTS.md`, repo-local RobDev/RobQA skills and governing passes
- Phase 1 audit approval and frozen decisions
- Lorehold raw profile/claims, dossier source/catalog, precon source/catalog, current presenter/foundation, builders, tests, prior VM-506 handoffs, VM-595, and VM-597 repair evidence
- Official Wizards Lorehold, Commander 2021, and Secrets of Strixhaven decklist pages

## Files changed

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/dossier/foundation.js`
- `data/dossier/identity-dossier-content.source.json`
- `data/dossier/identity-dossier-content.catalog.json`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
- `scripts/build/build-identity-dossier-content-catalog.mjs`
- `tests/archscry/lorehold-semantic-repair-tests.js`
- this card, handoff, and handoff index

## What changed

- Added a Lorehold semantic model that records the four approved Commander lanes, the `historic` terminology guard, product/commander-scoped mechanics, and `history fighting back` as Vox Mana play translation.
- Replaced generic Spirit Tribal / Boros Artifacts / Historic-Sagas dossier taxonomy with Spirit Witnesses / Graveyard-Leaves, Relic Reconstruction, and History & Spells, all tied to authored raw/precon sources.
- Repaired shared Lorehold composition so artifacts, Spirits, graveyards, spells, and combat remain commander-specific rather than a universal package.
- Rebound Lorehold Spirit and Lorehold Legacies to official Wizards decklists; retained Quintorius, History Chaser and Osgir, the Reconstructor as their respective face commanders.
- Regenerated the dossier and precon catalogs through their owning builders and added focused coverage for source altitude, terminology, and Native > Exact > Stretch ordering.

## Why it changed

The approved audit found accurate certified lore undercut by generated-source provenance, `historic` terminology drift, and generic Commander taxonomy. The smallest correction was to change the authored dossier/precon inputs and their Lorehold-specific composition, not placement, generated files by hand, or other identity models.

## Decisions made

- `history fighting back` remains player-facing table language but is marked only as `vox_mana_play_translation` in the source model.
- Artifact reconstruction is tied to Osgir/Lorehold Legacies; cards-leaving-graveyards and Spirits are tied to Quintorius/Lorehold Spirit; spells/combat stay commander-led.
- The VM-595 rescan is recorded as blocked by its intentional dirty-owner-path protection, not treated as an excuse to alter its baseline.

## RobDev compact packet

- Owning authority/producer: approved owner decision; raw Lorehold claims for identity; dossier/precon source for public and product truth; existing catalog builders for generated outputs; current Lorehold presentation/foundation for player composition.
- Changed behavior: the five dossier sections receive bounded Lorehold language and Native precon evidence; rendered precon grouping continues to use the existing shared Native/Exact/Stretch recommender.
- Protected behavior: certified Lorehold claims, placement/scoring, aliases/routing, all non-Lorehold identity semantics, runtime grouping algorithm, persistence, telemetry, VM-595, and existing WUBRG/Temur work.
- Non-goals: no CRIT-001 recertification, semantic-model reopening, new lore claims, taxonomy framework, runtime redesign, branch/worktree, commit, or push.

## RobQA readiness

- Tier: QA-1/QA-2 visible semantic composition and generated data.
- Passed: dossier catalog build/check; precon build; Lorehold focused semantic test; shared precon rationale test; Lorehold source/generated guardrail validation (one pre-existing model-owned inhibitor warning); desktop/mobile engine-only LOREHOLD replay; syntax checks; `git diff --check`.
- Rendered full-browser replay: blocked by two concurrent-suite defects outside this card’s source/presentation scope: desktop rationale copy leaves its previously opened preview visible, and mobile expects VM-565 `glossary_artifacts` even though the current renderer emits none. Neither is repaired here.
- VM-595 rescan: blocked intentionally because the working tree contains dossier-owner changes; its frozen current-equivalence proof rejects all owner-path drift. A fresh rescan needs reconciled baseline authority.
- CPU-heavy suites intentionally skipped: no placement/scoring/routing or broad engine behavior changed.

## Risks / uncertainties

The actual owner-facing rendered review remains required because full-browser replay is blocked by shared concurrent work. The owner should review Lorehold’s Start Here, Test the Fit, How This Plays, Precon Starting Points, and What to Look For; confirm the two Native products lead, `historic` is absent as ordinary-history copy, and the page keeps its distinct “history fighting back” voice.

## Not touched

Raw Lorehold claim statements, placement model/scoring, identity aliases/routing, generated faction artifacts, SIRF framework changes, VM-595 analyzer/baseline, non-Lorehold sources, commits, and remote state.

## Follow-up recommendations

Run the owner review from the normal Archscry Lorehold dossier. After the concurrent renderer/glossary changes are reconciled, rerun the full LOREHOLD desktop/mobile replay and the VM-595 rescan, then handle any narrow owner finding without reopening the frozen semantic decision block.

## Next suggested agent

Owner reviewer, then a narrow remediation agent only if the rendered review identifies a Lorehold-specific defect.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-598-lorehold-semantic-integrity-repair.md`
- owner-approved Lorehold Phase 2 decision block
- `docs/kanban/done/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/in-progress/VM-595-placement-language-trust-audit.md`
