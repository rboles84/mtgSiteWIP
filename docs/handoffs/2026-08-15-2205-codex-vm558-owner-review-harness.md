# VM-558 Deterministic Owner-Review Harness Repair

Agent: Codex

Task requested: Repair the targeted VM-558 owner-review harness so Dune, Witch, WUBRG, and Yore card-voice presentation review is deterministic and cannot be blocked by unrelated Mana Notes or ancillary card-art failures, while preserving production media behavior, Yore's bounded placement, and all 36 approved semantic decisions.

Related work: `VM-558`, `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, and `docs/handoffs/2026-08-15-2132-codex-vm558-owner-approved-promotion.md`.

## Files reviewed

- Current branch/worktree/HEAD and the complete dirty VM-558 initiative.
- `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, `docs/reference/token-reasoning-cost-control.md`, current Kanban/board, and recent VM-558/VM-551 handoffs.
- `scripts/vm551-all-37-live-ui-replay.mjs`, the live witness and visual-review artifacts, and `scripts/build-vm551-visual-review-manifest.mjs`.
- Archscry result restoration, dossier focus, card-art resolver, card-voice renderer, shared modal/cache, responsive CSS, exact-printing source, generated runtime catalog, committed Scryfall indexes, and raw card records.

## Files changed

- `scripts/vm551-all-37-live-ui-replay.mjs`
- `package.json`
- `docs/audits/vm558-card-voice-owner-review/art-fixtures/manifest.json`
- `docs/audits/vm558-card-voice-owner-review/art-fixtures/*.jpg` (16 exact review-only image variants)
- `docs/kanban/done/VM-558-complementary-card-voice-proposals.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff.

## What changed

- Added `--vm558-review` to the existing replay harness and exposed it as `npm run review:vm558`.
- The targeted mode preloads the certified current witness and sets the existing `__vmVisualRegressionDisableCardArt` hook before boot, so the unrelated precon, Card Signal, basics, premium, midrange, budget, utility, and other Mana Notes art loop is not a review prerequisite.
- It resolves card-detail JSON from the committed Scryfall bulk record for only the eight targeted cards and maps the exact public art URLs to checksum-verified local review fixtures. Production requests and URLs are not changed.
- It asserts two ordered approved Sound records; source/runtime printing-id parity; exact tile and modal art URLs; both modal explanations; Sound/Play isolation; focus restoration; active identity/focus; no horizontal overflow; and desktop two-column or mobile one-column geometry.
- Yore uses a harness-only result object derived from the certified bounded witness plus current Yore faction data. Its original `insufficient` result, `UB` direction, and `INTENTIONAL_BOUNDED_STATE` contract are retained as review metadata and disclosed in a visible notice.
- Added `--review-check` for non-interactive focused regression and `test:vm558-review-harness` for the two distinct defect classes.

## Why it changed

The general VM-551 owner-review path treated every dossier image as a readiness condition and correctly replayed Yore's bounded placement shell. Those are unsuitable prerequisites for a narrowly targeted VM-558 card-voice presentation review. The repair isolates only the review harness and keeps both production contracts intact.

## RobDevPass compact implementation packet

- Product outcome: four deterministic owner commands reach the approved card-voice surface without unrelated media blocking review.
- Owning authority: existing replay harness; card/printing facts remain owned by the approved card-voice catalog, exact-printing source, and committed Scryfall corpus.
- Producer/runtime chain reused: certified live witness -> session result restore -> Archscry dossier -> approved voice catalog/printing source -> shared modal.
- Changed behavior: VM-558-only review orchestration, local review resolution for the eight exact cards, and an explicit Yore presentation fixture.
- Protected behavior: production image/error behavior; Mana Notes, precon, Card Signal, and Scryfall records; all 36 semantics and slot-1 records; Colorless; placement, scoring, qualification, and Yore's bounded public semantics; general VM-551 review mode.
- Consumers/blast radius: one replay script, two package commands, 16 review-only image assets, and governance records. No production asset or data consumer changed.
- Failure/recovery: missing/checksum-drifted exact fixture, catalog/printing mismatch, wrong card count/order, bad modal, wrong focus, overflow, or changed Yore bounded witness fails closed before owner handoff.
- Smallest complete implementation: targeted mode in the existing harness, reuse of the existing art-disable hook, checksum-locked exact-card fixtures, and two systemic regressions.
- Non-goals/stop conditions: no product resolver relaxation, ancillary record repair, semantic/card change, placement work, broad fixture catalog, all-37 replay, or heavyweight suite. No scope drift occurred.

## Decisions made

- Other VM-551 review commands retain their all-art requirement; only `--vm558-review` has the bounded contract.
- The DOM retains the authoritative Scryfall URLs. Local fixture bytes are substituted only by request interception in targeted review mode.
- Yore's synthetic named shell is never written to source, production storage, or placement authority and is visibly labeled presentation-only.

## Risks / uncertainties

- The fixture inventory intentionally covers only these eight cards. If an approved printing URL changes, the checksum/source mismatch fails closed and requires an explicit fixture refresh.
- Owner commands launch a headed browser and wait for Enter in the invoking terminal, matching the established VM-551 review workflow.

## Tests run

- `node --check scripts/vm551-all-37-live-ui-replay.mjs` — PASS.
- `npm.cmd run test:vm558-review-harness` — PASS: Dune desktop and Yore mobile/390px.
- `npm.cmd run review:vm558 -- --review-check --identity=WITCH --viewport=desktop` — PASS.
- `npm.cmd run review:vm558 -- --review-check --identity=WUBRG --viewport=desktop` — PASS.
- `npm.cmd run test:vm551-visual-review` — PASS; the existing 37 identity / 48 total review manifest remains current.
- `git diff --check` — PASS.
- Fixture SHA-256 verification for all 16 files — PASS at harness startup.

RobQAPass classification: QA-2, medium risk limited to the targeted review harness. Deterministic assertions cover all facts in scope; rendered checks cover the two failure classes plus both other requested identities. Heavy placement, journey, synthetic, mutation, recovery, all-37 certification, and visual-baseline suites were not required or run.

Owner acceptance readiness: ready. Owner burden is exactly four headed commands; each stops on the already-approved pair with deterministic facts already asserted. No semantic judgment is reopened.

## Not touched

- Production runtime, CSS, image/error handling, Scryfall facts, Mana Notes/precon/Card Signal records, placement model/engine, identity authority, card selections, card-voice semantics, slot-1 records, Colorless, or generated card-voice data.

## Follow-up recommendations

- Run only the four owner commands supplied at handoff. Press Enter in each terminal after inspecting the surface.
- Refresh a fixture only if current exact-printing authority intentionally changes; do not expand this into a general offline dossier-art catalog.

## Next suggested agent

Owner presentation reviewer, then normal branch review/integration if accepted.
