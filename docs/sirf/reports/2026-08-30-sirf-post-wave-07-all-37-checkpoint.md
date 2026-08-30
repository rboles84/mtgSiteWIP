# SIRF Post-Wave-07 All-37 Checkpoint Report

## Status

**PASS_PERIODIC_CHECKPOINT.** VM-607 converged in one Owner-authorized shared repair cycle. The accepted Jund regression is resolved without a Jund special case, contract weakening, source-product edit, renderer-only product exception, or stale generated artifact.

## Scope and totals

- Identities processed: all 37 active identities.
- Rendered views: 74/74 (37 desktop, 37 mobile).
- Promoted contracts: 28/28 PASS.
- Golden controls: WUBRG, Temur, and Lorehold PASS.
- Findings: P0 `0`, P1 `1`, P2 `0`, P3 `0`; open `0`.
- Repair cycles: 1 after the required Owner stop/authorization.
- Engine: 36 `PASS_MATCH`, Yore `NO_RESULT` as the accepted bounded witness, mismatch `0`, error `0`.

## Finding, owner, fix, and protection

| Scope | Finding | Severity | Root cause / owner | Fix | Protection |
|---|---|---:|---|---|---|
| Jund and shared composer | `Power Hungry` disappeared when Prossh was already used as an editorial card | P1 | `assets/js/archscry/runtime/dossier-view.js` composed two semantic object types into one card-identity exclusion set; `assets/js/archscry/runtime/content.js` then removed the product | Separate editorial-card identity from precon-product identity; de-duplicate products by catalog slug in Native → Exact → Stretch precedence | New 155-product/28-contract systemic suite plus fresh all-37 desktop/mobile evidence |

No identity semantics changed. The repair also restores seven other products that had been suppressed by the same shared rule: Esper's `Scions & Spellcraft`, the five exact four-color products, and WUBRG's `Eldrazi Incursion`.

## Shared composer contract

- Editorial cards: canonical card identity, scoped within editorial sections.
- Precon products: required stable generated `slug`, scoped within Precon Starting Points.
- Cross-role overlap: allowed because the blocks answer different player questions.
- Product duplicate precedence: Native first, then Exact, then Stretch.
- Same product in multiple groups: render once in the highest-precedence group.
- Main or alternate commander overlap with an editorial card: never removes the product.

## Section-role matrix

This matrix was applied to every one of the 37 rendered identities; the checkpoint fixture records identity coverage `37` and every view contains all five sections.

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Orient the player to distinct Commander starting lanes | These are the clearest deck-building directions for entering the identity | Choose a first lane to explore | PASS |
| Test the Fit | Provide positive and boundary self-checks | The identity fits these motivations and stops fitting at these boundaries | Decide whether the identity describes the desired experience | PASS |
| How This Plays | Translate identity into deck and table behavior | These mechanics, roles, pressures, and table experiences express the identity in play | Understand what piloting and facing it feels like | PASS |
| Precon Starting Points | Compare governed ready-made products by relationship lane | These Native, Exact, and Stretch products are concrete entry points, not identity proof | Choose which complete product merits inspection | PASS |
| What to Look For | Provide observable browsing signals | These named traits are the signals to seek in commanders, cards, and decklists | Recognize the identity while browsing | PASS |

The 28 promoted contracts retain their previously accepted identity-specific matrices and exact curated sets. No two scoped sections were newly collapsed by the repair; the fresh VM-595 within-dossier candidate count remains `8`.

## Taxonomy result

- Promoted SIRF contracts: `accepted rendered set = actual rendered set` for all 28.
- Required items present: PASS.
- Unapproved or legacy items absent: PASS.
- Start Here and What to Look For exact-set equality: 28/28 promoted contracts PASS.
- Wave 08's five four-color identities remain unpromoted and retain their queued pre-Wave-08 copy; VM-607 makes no semantic edits to them.
- WUBRG, Temur, and Lorehold retain their accepted golden behavior and focused tests.

## Precon relationship results

| Identity | Restored product | Relationship | Editorial overlap | Result |
|---|---|---|---|---|
| Esper | Scions & Spellcraft | Exact | Aminatou, Veil Piercer | PASS; Exact count 10 |
| Jund | Power Hungry | Exact | Prossh, Skyraider of Kher | PASS; six required Exact products |
| Dune | Open Hostility | Exact | Saskia the Unyielding | PASS; queued Wave 08 product now visible |
| Glint | Entropic Uprising | Exact | Yidris, Maelstrom Wielder | PASS; queued Wave 08 product now visible |
| Ink | Stalwart Unity | Exact | Kynaios and Tiro of Meletis | PASS; queued Wave 08 product now visible |
| Witch | Breed Lethality | Exact | Atraxa, Praetors' Voice | PASS; queued Wave 08 product now visible |
| Yore | Invent Superiority | Exact | Breya, Etherium Shaper | PASS; queued Wave 08 product now visible |
| WUBRG | Eldrazi Incursion | Exact | Ulalek, Fused Atrocity | PASS; Exact count 6 |

All 74 views have identical desktop/mobile product names and group membership. No product is duplicated. Synthetic regressions prove main-commander overlap, alternate-commander overlap (`Silverquill Influence` / Scriv), same-group duplicate collapse, and Native > Exact > Stretch precedence.

## VM-595 scoped delta

| Metric | VM-603 | Pre-repair VM-607 | Final VM-607 | Final delta from VM-603 |
|---|---:|---:|---:|---:|
| Prose units | 1,376 | 1,356 | 1,383 | +7 |
| Sentences | 1,653 | 1,615 | 1,642 | -11 |
| Words | 26,644 | 26,230 | 26,736 | +92 |
| Exact cross-identity groups | 57 | 53 | 53 | -4 |
| Exact duplicate occurrences | 724 | 693 | 702 | -22 |
| Substitution-normalized groups | 17 | 17 | 17 | 0 |
| Within-dossier candidates | 11 | 8 | 8 | -3 |

The increase from the pre-repair checkpoint is the expected consequence of restoring distinct product information and editorial card information to the same dossiers. It does not introduce a new within-dossier candidate or truth finding.

## Regression controls

- WUBRG: PASS; `Turtle Power!` renders Leonardo as main commander, Heroes remains alternate in source/catalog, `Eldrazi Incursion` coexists with editorial Ulalek, and all six Exact products render.
- Temur: PASS; Temur Roar remains Native and Eshki can coexist editorially.
- Lorehold: PASS; both Native products and accepted three-lane control remain.
- White, Rakdos, Esper: PASS; Esper advances from 9 to its contract-safe 10 Exact products by restoring `Scions & Spellcraft`.
- Waves 05–07, Guild batches 03–04, Mono batch 02, and Diversity batch 01: PASS.
- Provider and precon artifacts: 155/155 PASS.
- VM-551 dossier integrity and VM-574 card signals: PASS; 37 identities and 111/111/111 visible card-signal groups.

## Rendered evidence

- Tracked audit: `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/`.
- Checkpoint fixture: `docs/sirf/checkpoints/2026-08-30-post-wave-07-all-37-rendered-checkpoint.json`.
- Local large evidence: `outputs/vm607-sirf-checkpoint/` (186 untracked files, including 74 fresh full-page responsive screenshots; hashes for governed current-state artifacts are recorded in the tracked manifest).
- Actual route: `/archscry/?vm-dev-review=1&reviewIdentity=<key>&panel=start&layout=all`.
- Width result: zero horizontal overflow at both viewports.
- Section result: all five scoped sections present in all 74 views.

## RobQA validation

- QA tier: QA-2 shared visible composition.
- Changed behavior: products no longer disappear because a main or alternate commander appears in an editorial card block.
- Protected contracts: all identity semantics, product/source facts, Placement/scoring/routing/qualification, CRIT-001, telemetry, persistence, accepted contracts, and goldens.
- Rendered self-QA: complete for all 37 at desktop/mobile; Jund, WUBRG, and Dune representative full-page captures visually inspected.
- Owner review needed: none under the Owner's explicit authorization and exception-based completion policy.

## Tests run

- `npm run test:sirf-precon-composer`
- `npm run test:sirf-all-37-checkpoint`
- `node tests/archscry/sirf-diversity-batch-01-tests.js`
- `node tests/archscry/sirf-mono-batch-02-tests.js`
- `node tests/archscry/sirf-guild-batch-03-tests.js`
- `node tests/archscry/sirf-guild-batch-04-tests.js`
- `node tests/archscry/sirf-college-wave-05-tests.js`
- `node tests/archscry/sirf-shard-wave-06-tests.js`
- `node tests/archscry/sirf-wedge-wave-07-tests.js`
- `node tests/archscry/wubrg-semantic-repair-tests.js`
- `node tests/archscry/temur-semantic-repair-tests.js`
- `node tests/archscry/lorehold-semantic-repair-tests.js`
- `npm run build:precons -- --check`
- `npm run test:identity-dossier-content`
- `node tests/precons/precon-artifact-tests.js`
- `node scripts/build-vm551-commander-provider-validation.mjs --check`
- `npm run test:vm551-dossier-integrity`
- `node scripts/vm574-card-signals-validation.mjs`
- governed current-state producer with the exact two-path runtime declaration
- fresh VM-595 producer plus `--fresh-corpus --check` with the exact two-path dossier-owner declaration
- JS syntax checks and `git diff --check`

## Exact candidate manifest

1. `assets/js/archscry/runtime/content.js`
2. `assets/js/archscry/runtime/dossier-view.js`
3. `package.json`
4. `scripts/audit/archscry-current-state.mjs`
5. `scripts/audit/placement-language-trust-audit.mjs`
6. `scripts/vm551-dossier-content-integrity-tests.mjs`
7. `scripts/vm574-card-signals-validation.mjs`
8. `tests/archscry/sirf-precon-composer-tests.js`
9. `tests/archscry/sirf-all-37-checkpoint-tests.js`
10. `tests/archscry/temur-semantic-repair-tests.js`
11. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/README.md`
12. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/manifest.json`
13. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/dossier/dossier-review-current-state.json`
14. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/dossier/dossier-review-exceptions.md`
15. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/dossier/dossier-review-summary.csv`
16. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/engine/engine-validation-current-state.json`
17. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/engine/engine-validation-exceptions.md`
18. `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/engine/engine-validation-summary.csv`
19. `docs/research/placement-language-trust-audit.json`
20. `docs/sirf/checkpoints/2026-08-30-post-wave-07-all-37-rendered-checkpoint.json`
21. `docs/sirf/runs/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`
22. `docs/sirf/reports/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`
23. `docs/sirf/rollout-tracker.md`
24. `docs/sirf/SIRF-v0.2-atlas-wide-deployment-plan.md`
25. `docs/kanban/done/VM-607-sirf-post-wave-07-periodic-checkpoint.md`
26. `docs/kanban/board.md`
27. `docs/handoffs/2026-08-30-1702-codex-vm607-checkpoint-blocked.md`
28. `docs/handoffs/2026-08-30-1742-codex-vm607-checkpoint-complete.md`
29. `docs/handoffs/HANDOFF_INDEX.md`

`outputs/vm607-sirf-checkpoint/` is intentionally excluded from the Git candidate as untracked large evidence; the tracked audit manifest preserves governed hashes. Unrelated untracked paths are also excluded.

## Remaining queue

Exactly six identities remain unpromoted: Dune, Glint, Ink, Witch, Yore, and Colorless. Wave 08 begins automatically with the five four-color identities; Colorless remains queued afterward.
