# VM-597 — Final Rendered Temur Closeout

- Agent: Codex
- Task requested: Resolve the remaining rendered Native Fit regression, align Temur exploration taxonomy, perform focused rendered QA, and stop at Owner Review.
- Related Kanban card: `docs/kanban/in-progress/VM-597-temur-semantic-repair.md`
- Status: Ready for Owner Review; no commit or push.

## Files reviewed

- `data/precons/vox-mana-precons.source.json` and generated precon catalog/schema.
- `assets/js/archscry/dossier/precons.js`, `assets/js/archscry/runtime/dossier-view.js`, `assets/js/archscry/runtime/content.js`, `assets/js/archscry/dossier/reading.js`, and `assets/js/archscry/dossier/foundation.js`.
- Temur dossier/profile/catalog and the preceding VM-597 handoff/card.

## Files changed in this final pass

- `assets/js/archscry/runtime/content.js`
- `assets/js/archscry/dossier/reading.js`
- `assets/js/archscry/dossier/foundation.js` (TEMUR-only guidance block)
- `tests/archscry/temur-semantic-repair-tests.js`
- This handoff, `docs/handoffs/HANDOFF_INDEX.md`, and the VM-597 card.

## Root cause and change

The authored source, schema, precon builder, generated catalog, active `TEMUR` key, and shared recommender were all correct: Temur Roar reached `nativeExact` first. Immediately before `buildPreconSectionHtml`, however, `filterPreconRecommendationsForEditorialCards` removed every precon whose main commander also appeared in the editorial-card set. Eshki appears there, so the filter removed Temur Roar; Mirror Mastery then became the first visible exact-color item.

The filter now preserves `nativeExact` entries. The existing later page-level card-usage de-duplication still removes the duplicate editorial card, so the precon remains visible exactly once without hardcoding Temur Roar or changing classification/ranking rules.

Start Here now consumes the TEMUR guidance's primary directions and uses concise shared-purpose copy. Dragons remain a lower-level Commander/search package rather than a fourth primary identity lane.

## Decisions and protected behavior

- Native relationship remains stronger than same-color coincidence.
- Temur Roar is Native Fit; Mirror Mastery and other unauthored G/U/R products remain Exact-color; Stalwart Unity and Entropic Uprising remain Stretch.
- Ferocious remains Khans-era Temur; Formidable remains Atarka; Survival Through Attunement remains visibly a Vox Mana lens and optional interpretation.
- Placement/scoring, aliases, routes, neighboring authored identities, and provenance/canon distinctions were not changed.

## RobDev compact packet

- Authority and producer: authored precon source → schema → builder → generated catalog → runtime loader → shared recommender → shared editorial filter → renderer.
- Changed behavior: Native Fit is no longer removed when its commander is also an editorial-card record; Temur primary direction labels align across Start Here and What to Look For.
- Protected contracts: data-driven shared recommendation grouping/ranking, later editorial de-duplication, Exact/Stretch boundaries, and certified Temur semantic boundaries.
- Risks/uncertainties: the prior `:4173` review tab was browser-cached. Fresh `:4180` localhost serving was used for this candidate's render evidence.
- Non-goals and stop condition: no research reopening, semantic redesign, hardcoded product, placement work, commit, or push; stop at Owner Review.

## RobQA readiness

- Risk tier: QA-2 (shared recommender filter plus visible dossier copy).
- Focused test exercises source/catalog classification, the real shared editorial filter, `buildPreconSectionHtml`, native-first order, exact/stretch exclusion, and taxonomy/copy invariants.
- Passed commands:
  - `node tests/archscry/temur-semantic-repair-tests.js`
  - `npm run test:semantic-readiness`
  - `npm run build:precons -- --check`
  - `npm run build:identity-dossier-content -- --check`
  - `node --check assets/js/archscry/runtime/content.js`
  - `node --check assets/js/archscry/dossier/reading.js`
  - `node --check assets/js/archscry/dossier/foundation.js`
  - `git diff --check`

## Rendered evidence

Fresh localhost `http://127.0.0.1:4180/archscry/index.html?vm-dev-review=1&reviewIdentity=TEMUR`, View All:

1. `Native fit` — `Temur Roar` — `Main commander: Eshki, Temur's Roar`
2. `Exact-color fit` — `Mirror Mastery` (followed by other generic G/U/R products)
3. `Stretch fit` — `Stalwart Unity`, then `Entropic Uprising`

Temur Roar appeared once, only in Native Fit. Start Here showed the four primary labels: Large Creatures / Ferocious; Ramp / Big Mana; Spells / Copying; Survival Through Attunement — Vox Mana lens.

Neighbor rendered replays: RG, UG, and UR retained Native/Exact/Stretch partitions; SULTAI retained Exact plus Stretch behavior; Prismari retained its Native entries, Exact entries, and Stretch entries.

## Broad-suite disposition

Previously reported broad failures were not rerun because they exercise concurrent work outside VM-597:

- `tests/archscry/archscry-dossier-followup-tests.js`: all-atlas directory-copy expectation at line 279 expects `The complete ${activeExpressionCount}-identity atlas is available for exploration`; current concurrent runtime copy is `Explore the complete ...`. No final-pass VM-597 file contributes; owned by concurrent dossier/runtime presentation work; does not block Temur closeout.
- `scripts/vm551-dossier-content-integrity-tests.mjs`: glossary allocation expectation differs from concurrent `runtime/data.js` educational-term allocation behavior. No final-pass VM-597 file contributes; owned by concurrent VM-565/runtime data work; does not block Temur closeout.

## Not touched

No commit, push, generated-artifact hand edit, placement/scoring, route, alias, or unrelated identity change was made in this pass. Existing unrelated dirty worktree changes remain preserved.

## Follow-up recommendation

Owner should review the fresh TEMUR dossier's Native Fit order and concise Start Here copy only. Do not begin another card until that review is complete.

## Next suggested agent

Owner Review.
