# VM-551 Gate B1 Evidence and Routing Remediation Handoff

- **Agent:** Codex
- **Task requested:** Remove targeted leader-confirmation bias, adjudicate the 15 zero-naming identities / 9 naming-route stalls / 73 no-direct confusion pairs, apply only existing-authority fixes, enforce responsible public naming, validate exhaustively, and stop for owner decisions.
- **Branch:** `codex/vm551-gate-b1-evidence-routing-remediation`
- **Worktree:** `C:\dev\voxmana.io-vm551-gate-b1-evidence-remediation`
- **Base:** `214a085739ba73a1146d5e09c3882114f7304d9f`
- **Scoped commits:** `48c0f01` (unbiased baseline), `bfda063` (eligibility and responsible naming), plus this documentation/handoff commit.

## Files reviewed

- Recent VM-551 handoffs and `docs/handoffs/HANDOFF_INDEX.md`.
- `docs/kanban/board.md` and the Gate B1 engine card.
- Gate B1 construct, question, answer, identity-coverage, confusion-pair, semantic-adjudication, Esper/Yore, and final-architecture records.
- `data/placement/gate-b1-mapping.source.json` and generated engine model.
- Certified placement/profile records for the 24 identities in the 15/9 inventory and current competitor records.
- Accepted CECOS draft.4 exact object `947bf45bf6a191839b5fb4fa6c65980ed9d5737e` and committed refined Commander-language evidence.
- All engine reachability, pair, robustness, mutation, stopping, and recovery reports.

## Files changed

- Engine routing/naming logic: `assets/js/gate-b1-placement-engine.js`.
- Mapping authority and generated model: `data/placement/gate-b1-mapping.source.json`, `data/gate-b1-placement-model.json`.
- Model/report builders and validator: `scripts/build-gate-b1-placement-model.mjs`, `scripts/validate-gate-b1-placement-engine.mjs`, `scripts/build-vm551-evidence-routing-remediation-report.mjs`.
- Machine reports under `docs/reports/vm551-gate-b1-placement-engine/`.
- Evidence packet under `docs/plans/vm551-gate-b1-evidence-routing-remediation/`.
- This handoff, handoff index, completed Kanban card, and board.

## What changed and why

`positiveTestBonus` and metadata-only utility were removed so targeted selection depends only on symmetric answer-effect differences. A generic eligibility defect was fixed: a one-sided bounded target can now be eligible when its real answer effects distinguish the frontier. Pair metadata still cannot add utility.

Every public identity now independently requires an approved naming trigger, two positive dependency groups, two positive constructs, behavioral observability, and no disqualifying contradiction. Qualification adds no score and alternatives do not need primary lead separation. The engine records satisfied naming-rule IDs and qualification internally.

The original 40 rules remain a named baseline layer. The separately versioned remediation overlay is empty because adjudication supported zero new promotions. Broad structural similarity was not converted into identity evidence.

## Decisions and findings

- 15 zero-naming identities: 14 require instrument/evidence change; Yore remains not cleanly observable.
- 9 route stalls: Grixis and Jeskai gain responsible paths; Bant reaches its target but lacks independent corroboration; Silverquill, Sultai, Temur, UG, WB, and Witch remain Question 8/frontier stalls.
- 73 no-direct pairs remain individually bounded and clustered; no metadata-only discriminator was accepted.
- The uniform naming contract exposed 12 formerly close-named identities with only one independent positive dependency: BG, Colorless, Dune, Glint, Ink, Lorehold, Prismari, Quandrix, UR, Witherbloom, WR, WUBRG.
- Final internal frontier reachability is 36/37. Responsible public candidate, primary, top-two, and top-three reachability are all 3/37: Esper, Grixis, Jeskai.
- Insufficient recovery totals: 3,282 targeted-question cases, 321 answer-revisit cases, 329 no-approved-discriminator cases.

## Risks and uncertainties

- INK cannot enter the strongest unbiased internal frontier under the current 40-rule model.
- The Yore/Glint lens is eligibility-guarded but unreachable under production routing.
- Thirty-four identities remain blocked from responsible public naming. This is an authority/instrument gap, not a tuning target.
- Six direct discriminators remain unreachable in strongest search: B/Sultai, Glint/Temur, Ink/Witch, Quandrix/UG, Silverquill/WB, Witch/Yore.
- Synthetic frequencies are **IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY**.

## Tests run

- Full Gate B1 validation after the unbiased baseline and after coherent remediation: 5,000 generated journeys, deterministic replay, 37 identity searches, 123 pairs, 6,660 synthetic runs, 769 mutations, stopping, recovery, lens guards, neutral/conditional/contradiction/dependency checks.
- `node scripts/build-gate-b1-placement-model.mjs --check` — pass.
- Node syntax checks for engine/model/report builders and validator — pass.
- `npm.cmd run lint:js` — pass, 8 files.
- `npm.cmd run test:placement` — pass, legacy 37/37 golden paths retained as compatibility evidence only.
- `npm.cmd run validate:source-generated` — pass with two pre-existing model-owned warning notes.
- `git diff --check` and staged-path audits — pass.

## Not touched

No approved question, answer, construct, wording, stable ID, certified identity record, Gate A presentation, questionnaire UI, dossier definition, persistence, schema, Matrix, Maze, production route, or public percentage-confidence behavior changed. No browser/visual/Lighthouse QA, player validation, recruitment, shadow testing, migration, deployment, merge, push, or certification occurred.

## Follow-up recommendations

1. Owner decides whether to authorize targeted evidence recovery for the 14 broad-only identities and 12 single-dependency named identities.
2. Keep Yore bounded unless new authority supports a genuinely observable behavioral dimension.
3. Evaluate the existing optional refinement contract before changing the one-targeted-question/eight-question architecture for the six remaining route stalls.
4. Do not restore former result counts by weakening qualification or counting one answer twice.

- **Next suggested agent:** Planning Architect, only after an owner chooses a specific evidence/instrument follow-up.
- **Related records:** `docs/plans/vm551-gate-b1-evidence-routing-remediation/evidence-adjudication.md`; `docs/kanban/done/VM-551-gate-b1-evidence-routing-remediation.md`; `docs/reports/vm551-gate-b1-placement-engine/owner-summary.md`.
