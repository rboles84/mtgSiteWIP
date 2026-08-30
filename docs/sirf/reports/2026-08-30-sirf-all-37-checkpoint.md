# SIRF v0.2 — All-37 Periodic Checkpoint

Date: 2026-08-30

Kanban: VM-603

Status: **PASS — GUILD WAVE COMPLETE**

Checkpoint baseline: `dc680a0de967ff041a4f0f5861544abc75fb71ec`

Branch: `main`

## Outcome

The post-guild SIRF checkpoint passes. All 37 identities were rendered through the governed Owner-facing Dossier Review path at desktop and 375px mobile widths; all five scoped sections were present; desktop/mobile taxonomies and precon-group counts reconciled; all 16 promoted semantic contracts and the WUBRG, Temur, and Lorehold golden controls passed; the fresh VM-595 producer/check passed; and no accepted-contract or candidate-caused semantic regression was found.

The earlier Leonardo / Turtle Power! provider mismatch is not remaining baseline debt. The Owner correction is at the proper authored source, the normal precon builder reproduces it without a catalog diff, the provider fixture now reproduces the face commander, and the actual WUBRG dossier renders `Turtle Power!` with `Main commander: Leonardo, the Balance`.

## Scope and collection

- Identities: 37/37.
- Rendered views: 74/74 (37 desktop plus 37 mobile).
- Scoped sections: Start Here; Test the Fit; How This Plays; Precon Starting Points; What to Look For.
- Desktop viewport: 1280×720; all captured widths were 1265px or less.
- Mobile viewport: 375×812; all captured widths were 360px or less.
- Engine reconciliation: 36 `PASS_MATCH`, one intentional bounded `NO_RESULT` for Yore, zero mismatches, zero engine errors.
- Current-state dossier collection: 37/37 dossiers and 37/37 governed screenshots.
- Telemetry: mock mode; zero emitted telemetry events.
- Detailed evidence: `docs/audits/sirf-all-37-checkpoint-2026-08-30/` and `docs/sirf/checkpoints/2026-08-30-all-37-rendered-checkpoint.json`.

The generic current-state manifest retains VM-586-specific workbook/red-team finalization fields as pending. Those fields are not VM-603 gates; VM-603 owns the complete browser collection, rendered checkpoint record, accepted-contract validation, and VM-595 regeneration/check.

## Owner-supplied Turtle Power! correction

### Ownership and authority

- Exact changed authored file: `data/precons/vox-mana-precons.source.json`.
- Classification: **Owner-supplied correction at the proper authored/provider source**.
- Git attribution: Owner-authored commit `5c38f4d9a2d74e240d736af82c26dfd08b5b08d8` changed the Turtle Power! row from `Heroes in a Half Shell` as `mainCommander` to `Leonardo, the Balance`, retained `Heroes in a Half Shell` in `secondaryCommanders`, and replaced the community source with the official Wizards decklist.
- Official authority: `https://magic.wizards.com/en/news/announcements/teenage-mutant-ninja-turtles-commander-decklist` identifies Turtle Power! and explicitly names Leonardo, the Balance as the face commander; Heroes in a Half Shell is one of the other featured partner commanders.

### Producer-path proof

| Gate | Result | Evidence |
|---|---|---|
| Authored source | PASS | Product `Turtle Power!`; `mainCommander` is `Leonardo, the Balance`; `secondaryCommanders` contains only `Heroes in a Half Shell`. |
| Precon builder | PASS | `npm run build:precons` built 155 records; generated precon catalog remained diff-clean. |
| Generated catalog | PASS | The Turtle Power! catalog row preserves Leonardo as main and Heroes as alternate. |
| Provider fixture | PASS | Governed live producer verified 155/155 exact destinations; generated diff is only removal of the Heroes main-commander provider row and addition of the Leonardo row. |
| Freshness | PASS | Provider `--check`, precon artifact tests, source/generated checks, and global dossier integrity pass. |
| Rendered WUBRG card | PASS | Actual Dossier Review card reads `Turtle Power!` and `Main commander: Leonardo, the Balance`; its validated Browse builds action is present. |
| WUBRG golden | PASS | `tests/archscry/wubrg-semantic-repair-tests.js`. |
| Manual generated edit | ABSENT | Source was preserved; both generated files were reproduced through existing builders. |

The authored source correction was already part of the accepted baseline, so it is not reintroduced as a new source diff. The current checkpoint candidate includes the normally regenerated provider fixture because its ownership and one-for-one scope are exact.

## Findings and repair cycle

One repair cycle was sufficient.

| Severity | Count | Finding | Root cause | Resolution |
|---|---:|---|---|---|
| P0 | 0 | — | — | — |
| P1 | 0 | — | — | — |
| P2 | 1 | Provider fixture still keyed Turtle Power! to Heroes after the Owner corrected the authored source. | Generated provider fixture freshness. | Reran the governed live provider producer; exact diff swaps Heroes for Leonardo and passes 155/155. |
| P3 | 2 | Global dossier integrity retained one pre-VM-596 WUBRG lore-role literal and one pre-modularization glossary allocation regex. | Deterministic harness drift hidden behind the earlier provider assertion. | Updated only the stale expected literals to the accepted current contract; the full suite passes. |

No new SIRF defect class appeared. No Placement, scoring, routing, telemetry, persistence, raw semantic authority, accepted taxonomy, recommendation relationship, or player-facing dossier copy was changed by VM-603.

## Accepted contract and golden-control results

- Promoted contracts validated: 16/16.
- Exact rendered taxonomy rule: `accepted Start Here set = accepted What to Look For set = actual rendered checkpoint set` for every promoted contract.
- Required contract items: present.
- Unapproved/legacy items: absent under the existing batch gates.
- Precon contract: Native counts equal the accepted contract; required Exact-color products remain available; Stretch remains present where allowed.
- Golden controls: WUBRG PASS; Temur PASS; Lorehold PASS.
- Diversity controls: White PASS; Rakdos PASS; Esper PASS.
- Remaining mono-colors: Blue PASS; Black PASS; Red PASS; Green PASS.
- Guild controls: all ten Ravnica guilds PASS.

Contract paths:

- `docs/sirf/contracts/white.json`
- `docs/sirf/contracts/blue.json`
- `docs/sirf/contracts/black.json`
- `docs/sirf/contracts/red.json`
- `docs/sirf/contracts/green.json`
- `docs/sirf/contracts/azorius.json`
- `docs/sirf/contracts/boros.json`
- `docs/sirf/contracts/rakdos.json`
- `docs/sirf/contracts/dimir.json`
- `docs/sirf/contracts/gruul.json`
- `docs/sirf/contracts/orzhov.json`
- `docs/sirf/contracts/selesnya.json`
- `docs/sirf/contracts/izzet.json`
- `docs/sirf/contracts/golgari.json`
- `docs/sirf/contracts/simic.json`
- `docs/sirf/contracts/esper.json`

Per-identity guild taxonomies, Native/Exact/Stretch relationships, and section-role matrices remain recorded in:

- `docs/sirf/reports/2026-08-30-sirf-guild-batch-03.md`
- `docs/sirf/reports/2026-08-30-sirf-guild-batch-04.md`

## Checkpoint section-role matrix

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a practical first build/search lane. | These are the identity's curated Commander-facing entry directions. | Select which lane to explore first. | PASS — exact taxonomy is shared with What to Look For, but this section owns selection and action. |
| Test the Fit | Test positive and boundary conditions. | This reading fits only when its defining method and limits are present. | Confirm or reject the identity before building. | PASS — it does not teach the mechanics inventory or product catalog. |
| How This Plays | Explain table behavior and pressure. | The identity changes sequencing, role, emotional pressure, lore expression, and table experience in these bounded ways. | Anticipate how the deck will feel and behave. | PASS — no accepted identity repeats Start Here as a mechanics inventory. |
| Precon Starting Points | Compare concrete products by governed relationship. | Native, Exact-color, and Stretch products are different relationship classes with recorded plans. | Decide which ready-made deck is worth investigating. | PASS — product facts and relationship ordering add a distinct purchase/build decision. |
| What to Look For | Recognize the selected taxonomy in cards and decks. | These source-grounded signs reveal the same accepted lanes during evaluation. | Evaluate whether a card/deck actually expresses the chosen lane. | PASS — same semantic set as Start Here, different recognition purpose; batch similarity gates remain below threshold. |

## Fresh VM-595 delta

| Metric | Official baseline | Current checkpoint | Delta |
|---|---:|---:|---:|
| Prose units | 1,392 | 1,376 | -16 |
| Sentences | 1,694 | 1,653 | -41 |
| Words | 26,997 | 26,644 | -353 |
| Exact cross-identity duplicate groups | 56 | 57 | +1 |
| Exact duplicate occurrences | 750 | 724 | -26 |
| Substitution-normalized groups | 17 | 17 | 0 |
| Within-dossier candidates | 13 | 11 | -2 |

Additional current metrics: 38 repeated-opening groups, 275 repeated five-gram groups, and 632 cross-identity near-similarity pairs.

The net `+1` exact group is classified, not treated as a regression: three newly exposed groups are duplicated catalog product-plan facts (large instants/sorceries, X-cost ramp, and artifact cost reduction), while two generic fallback-explanation groups disappeared. Duplicate occurrences fell by 26, the 35-identity `choose only the lanes...` family fell to 19, and no new within-dossier candidate appeared. White and Esper candidates were removed. The remaining 11 candidates are Yore, Lorehold, Mardu, Dune, Temur, Bant, Glint, Grixis, Ink, Silverquill, and Colorless; all predate this checkpoint and remain queued for their owning waves or accepted golden review.

The seven existing VM-595 material findings remain classified under authored source, composer/template, multiple-fragment composition, and shared UI copy owners. VM-603 introduced no new truth blocker and did not mechanically optimize shared utility copy.

## Remaining queue

Exactly 18 identities remain in exception automation:

- Colleges: Prismari, Quandrix, Silverquill, Witherbloom.
- Shards/wedges: Bant, Grixis, Jund, Naya, Abzan, Jeskai, Mardu, Sultai.
- Four-color: Dune, Glint, Ink, Witch, Yore.
- Endpoint: Colorless.

Recommended next wave: the four remaining Strixhaven colleges, with Lorehold retained as the golden college control.

## RobQA readiness

- Risk: moderate evidence/governance checkpoint; narrow runtime-adjacent generated fixture and test-maintenance changes.
- Changed behavior: Leonardo now has the validated provider destination implied by the already accepted source/catalog/rendered face commander; checkpoint tooling can collect a caller-selected baseline/output slug; VM-595 points to the fresh checkpoint corpus.
- Protected contracts: all 37 identity semantics, accepted SIRF contracts, WUBRG/Temur/Lorehold goldens, Placement/scoring/routing, telemetry, persistence, and unrelated work.
- Deterministic validation: complete and passing as listed below.
- Rendered self-QA: complete at desktop and 375px mobile; WUBRG Turtle Power! card rechecked after provider regeneration.
- Residual risk: environment-dependent optional media delivery is recorded only as non-blocking notes; no product truth depends on it.
- Owner review needed: none under the exception-based SIRF policy; the Owner-supplied correction is preserved and proven.

## Tests run

- `npm run build:precons`
- `node scripts/build-vm551-commander-provider-validation.mjs --live`
- `node scripts/build-vm551-commander-provider-validation.mjs --check`
- `node tests/precons/precon-artifact-tests.js`
- `npm run test:vm551-dossier-integrity`
- `npm run test:sirf-all-37-checkpoint`
- `node tests/archscry/sirf-diversity-batch-01-tests.js`
- `node tests/archscry/sirf-mono-batch-02-tests.js`
- `node tests/archscry/sirf-guild-batch-03-tests.js`
- `node tests/archscry/sirf-guild-batch-04-tests.js`
- `node tests/archscry/temur-semantic-repair-tests.js`
- `node tests/archscry/lorehold-semantic-repair-tests.js`
- `node tests/archscry/wubrg-semantic-repair-tests.js`
- `npm run audit:placement-language-trust`
- `node scripts/audit/placement-language-trust-audit.mjs --check`
- Actual Dossier Review: all 37 at 1280×720 and 375×812; focused WUBRG Turtle Power! card after provider regeneration.

Optional broad-suite disclosure: `npm test` passed placement, telemetry, parser, builder, semantic-readiness, Maze-query, Loom, syntax, and mode suites before stopping at the existing Maze DOM metadata expectation in `tests/maze/maze-search-tests.js:726` (`c:r` actual versus `c:r f:commander` expected). VM-603 changes neither that test nor the Maze runtime it exercises, and the run produced no tracked diff. This unrelated current-main failure is not a checkpoint gate and is not included in the candidate.

## Exact candidate manifest

- `data/placement/commander-provider-validation.json`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/README.md`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/manifest.json`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/dossier/dossier-review-current-state.json`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/dossier/dossier-review-exceptions.md`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/dossier/dossier-review-summary.csv`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/engine/engine-validation-current-state.json`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/engine/engine-validation-exceptions.md`
- `docs/audits/sirf-all-37-checkpoint-2026-08-30/engine/engine-validation-summary.csv`
- `docs/handoffs/2026-08-30-1509-codex-vm603-sirf-all-37-checkpoint.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-603-sirf-all-37-periodic-checkpoint.md`
- `docs/research/placement-language-trust-audit.json`
- `docs/sirf/SIRF-v0.2-atlas-wide-deployment-plan.md`
- `docs/sirf/checkpoints/2026-08-30-all-37-rendered-checkpoint.json`
- `docs/sirf/reports/2026-08-30-sirf-all-37-checkpoint.md`
- `docs/sirf/rollout-tracker.md`
- `package.json`
- `scripts/audit/archscry-current-state.mjs`
- `scripts/audit/placement-language-trust-audit.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `tests/archscry/sirf-all-37-checkpoint-tests.js`

Explicitly excluded and preserved:

- `docs/incidents/recoveries/VM-596-wubrg-semantic-repair-control.md`
- `docs/research/maze-player-language/corpus/`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/`
- `outputs/vm603-sirf-checkpoint/` (ignored large evidence/workbook root; hashes are recorded in the tracked manifest)

## Publication

Commit SHA and push/divergence are filled by the final publication handoff and returned to the Owner after the exact candidate is committed and pushed normally.
