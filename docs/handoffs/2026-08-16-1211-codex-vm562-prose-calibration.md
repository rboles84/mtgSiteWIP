# VM-562 Sound/Play Prose Calibration Handoff

- Agent name: Codex
- Task requested: Freeze VM-561 as a durable evidence checkpoint, then create a proposal-only, corpus-representative Sound/Play writing calibration using exactly seven family-stratified identities without changing production prose or authority.
- Related card: VM-562
- Base checkpoint: VM-561 commit `0d073cd1a5917afecbcb722d57a117f87799ade6`
- Status: Revised calibration and final resulting-row acceptance gate complete. Recommendation: `READY_FOR_OWNER_CALIBRATION_ACCEPTANCE`. No proposal is approved or applied.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-16-1147-codex-vm561-sound-play-evidence-audit.md`
- `docs/handoffs/2026-08-16-1104-codex-vm560-sound-play-source-router.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-561-archscry-sound-play-evidence-audit.md`
- `docs/research/archscry-sound-play-audit/card-evidence-ledger.json`
- `docs/research/archscry-sound-play-audit/evidence-summary.md`
- The VM-561 embedded routing-authority, opened underlying-evidence paths/anchors, card facts, audit inferences, findings, and limitations for every selected row.
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

## Files changed

- `docs/kanban/in-progress/VM-562-archscry-sound-play-prose-calibration.md`
- `docs/kanban/board.md`
- `docs/research/archscry-sound-play-audit/prose-calibration.source.json`
- `docs/research/archscry-sound-play-audit/prose-calibration.md`
- `scripts/vm562-sound-play-prose-calibration.mjs`
- `docs/handoffs/2026-08-16-1211-codex-vm562-prose-calibration.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- First froze VM-561 as one intentional evidence/research commit at `0d073cd1a5917afecbcb722d57a117f87799ade6` and confirmed the worktree was clean before VM-562 began.
- Opened VM-562 as a bounded proposal-only Kanban task in the existing branch/worktree.
- Selected exactly seven identities from the full VM-561 ledger: Black, Simic Combine, Lorehold College, Sultai Brood, Ink / Altruism, Five-Color / WUBRG, and Colorless.
- Inspected all 14 `REMEDIATION_LIKELY` rows within that stratified sample.
- Proposed changes to 3 tile fields and all 14 modal fields, while deliberately leaving 11 eligible neighboring tile/modal fields unchanged.
- Preserved every `NO_CHANGE_INDICATED` and blocked row without proposal text.
- Generated a review artifact that carries current/proposed text, exact printing/object identity, routing IDs, underlying evidence paths/anchors and statements, facet IDs, bounded proposal bridge, reason, failed/passed tests, authority limitation, and pending owner decision for each row.
- Revised six owner-identified rows in place: Coiling Oracle, Prime Speaker Zegana, Velomachus Lorehold, Command Tower, Call the Spirit Dragons, and All Is Dust.
- Made two microscopic accepted-row corrections: K'rrik now tracks the exact Oracle phrase `each {B} in a cost`; Omarthis's otherwise accepted tile removes the internal word `bounded` exposed by the resulting-row terminology gate.
- Changed deterministic content QA to construct every hypothetical resulting pair first—proposed field when changed, frozen current field otherwise—then scan all 28 player-facing fields for duplication, normalized n-grams, openings/endings, grammatical skeletons, rhetorical devices, shared composers, internal methodology terms, tile/modal echo, card specificity, swapability, facet collapse, and overclaim.

## Why it changed

VM-561 established that the writing defects are corpus-wide and unevenly distributed. VM-562 therefore calibrates a writing method against representative authority and family conditions rather than privileging White, Azorius, or Lorehold because the owner encountered those identities first. The artifact is intentionally separate from production authority so the owner can judge the method before any all-49 remediation phase is authorized.

## Decisions made

- Black was selected over White to avoid manual-review-order bias while retaining mono Sound echo and Play modal reuse.
- Simic tests the only selected Play tile whose VM-561 finding explicitly says it does not explain card play, plus the Simic/generic-Blue-Green anti-drift boundary.
- Lorehold is included because its eligible rows span Sound redundancy, local template reuse, and unsupported evaluative language; that evidence breadth, not prior manual exposure, controls selection.
- Sultai carries the explicit internal source-note leak.
- Ink carries the required four-color `VOX_MANA_INTERPRETATION` stress test without deriving personality from the excluded color.
- WUBRG remains multiple traditions present together, never one official or superior universal philosophy.
- Colorless examples remain branch-local; Eldrazi, artifacts, Wastes, `{C}` mana, and counter engines are not collapsed.
- Prime Speaker Zegana's former shared-composer modal is now replaced because final calibration acceptance concerns the complete resulting row, not only newly changed strings.
- No row required `MODAL_CONTENT_MODEL_REVIEW`; all 14 proposed modal changes had an honest additive evidence-supported function.
- The final six owner-requested revisions remove anti-drift narration, deck-tech drift, evidence-annotation phrasing, universal-philosophy guardrail phrasing, and internal Colorless ontology from player copy while retaining those limitations in the evidence record.
- Ancient Craving, Campus Renovation, Lorehold the Historian, Kotis, Danitha, and Kynaios/Tiro remain exactly as proposed in the first calibration pass; no stylistic uniforming was applied.

## Risks / uncertainties

- All 17 proposed fields remain owner-review material. Their presence in the calibration does not authorize production promotion.
- Two normalized 4-grams remain: `an instant or sorcery` is exact Magic rules vocabulary shared by two mechanically different Lorehold cards; `three other graveyard cards` repeats Kotis's exact additional cost so the modal can explain the preserve-versus-exile choice built on it. Neither is a template, and no 5-gram repeats.
- The Ink proposals remain Vox Mana synthesis, not WotC canon.
- WUBRG and Colorless guardrails now sit beneath the player copy in the evidence record rather than being recited as taxonomy disclaimers.
- The later 49-row phase remains unauthorized. Source-intake and Vox-authority-blocked rows remain separate work.

## Tests run

- `node scripts/vm561-sound-play-evidence-audit-tests.mjs` — PASS before checkpoint commit: 37/37 packets, 119/119 rows, 4/4 suppression appendix, 76 local sources/ledgers, 28 Wizards URLs, 26 inspected, two unavailable, exact final dispositions/classifications, byte digest `1d426f7ff53c22392ecce27431e878ca72c1cccb9cf4f5f2ca43b4946ad9fcef`, zero protected-surface changes.
- `node scripts/vm562-sound-play-prose-calibration.mjs --write` — PASS: 7/7 selections, 14/14 eligible rows, 3 tile proposals, 14 modal proposals, 11 deliberately unchanged eligible fields, zero content-model-review findings, 28/28 resulting fields inspected.
- `node scripts/vm562-sound-play-prose-calibration.mjs` — PASS check mode: zero exact duplicates, near duplicates, repeated 5-grams, repeated openings/endings, repeated grammatical-skeleton proxies, high-overlap tile/modal pairs, shared-composer occurrences, internal research/evidence leaks, or card-specificity concerns. Two legitimate repeated 4-grams are documented.
- Repeated write/check generation — PASS with stable revised proposal-artifact SHA-256 `4f2992f27ee29a6fe82c6822ee5cb798540afca3fb65d491ce80d61e620c9cce`.
- Protected-path diff validation from VM-561 checkpoint — PASS: no production, relationship, runtime, generated product, placement/scoring/identity source, VM-559 workbook/state, or `docs/research/canon/` path changed.

## Not touched

- Production Sound tile text or modal text.
- Production Play tile text or modal text.
- Approved Sound/Play relationships, card selections, exact printings, or runtime catalogs.
- Runtime JavaScript, CSS, HTML, or generated product data.
- Placement, scoring, qualification, or certified identity semantics.
- Existing VM-559 37-sheet owner-review workbook or VM-559 release state.
- Any file under `docs/research/canon/`.
- The three `SOURCE_INTAKE_REQUIRED` or two `INSUFFICIENT_VOX_MANA_AUTHORITY` rows.
- Git push, merge, deployment, or application of proposal copy.

## RobDevPass compact implementation packet

### Changed behavior

- Research visibility only: a seven-identity proposal source, generated owner-review artifact, deterministic content QA, and task/handoff records.
- Authority owner: VM-561 disposition and evidence altitude govern eligibility; inspected underlying sources govern identity statements; committed Scryfall facts govern exact card/printing behavior. The proposal artifact owns no production semantics.
- Producer: `scripts/vm562-sound-play-prose-calibration.mjs` combines the proposal-only source with the frozen VM-561 ledger.
- Consumers: owner calibration review and, only after separate authorization, planning for the complete remediation population.

### Protected behavior

- All active copy, relationships, printings, runtime/product data, placement, certified semantics, canon corpus, existing workbook, and VM-559 release state remain unchanged.
- Non-goals maintained: no production remediation, source intake, semantic re-authoring, card swap, all-49 rollout, push, merge, or deployment.

### Realistic risks and implemented controls

- Risks: manual-review-order bias, authority elevation, derived-source laundering, whole-row rewriting, replacing one universal template with another, four-color/WUBRG/Colorless overreach, rules-text inaccuracy, and accidental production edits.
- Controls: programmatic family/disposition coverage, exact ledger parity, explicit routing/evidence/inference output, smallest-field null/unchanged semantics, required proposal tests, anti-template corpus analysis, and checkpoint-relative path allowlisting.

### Evidence and remaining judgment

- Deterministic evidence is the generated calibration artifact plus the QA output.
- Owner judgment remains whether the sample sounds natural, whether the smallest-change method is acceptable, and whether a later separately authorized all-49 pass should use it.

## RobQAPass readiness

### Change classification

- QA tier: QA-0 documentation/content proposal validation.
- Changed behavior: owner-review research artifacts only.
- Protected behavior: production and every semantic/runtime authority remain frozen.

### Tests selected

- Exact family/disposition/current-text/evidence-ID checks protect eligibility and authority.
- Proposal-field and required-test checks protect smallest-change semantics.
- Resulting-pair duplicate/ngram/opening/ending/skeleton/rhetorical-device/shared-composer/terminology/echo/specificity checks protect unchanged fields as well as replacements.
- Checkpoint-relative diff allowlisting protects production, runtime, canon, placement, workbook, and VM-559 state.

### Tests intentionally skipped

- Runtime browser, placement, all-37 UI replay, responsive interaction, network, and deployment suites.
- Reason: VM-562 changes no runtime, product data, styling, interaction, placement, or deployed behavior.

### CPU-heavy validation

- `NOT REQUIRED`

### Self-QA evidence

- Deterministic artifact: `docs/research/archscry-sound-play-audit/prose-calibration.md`.
- Review performed: every proposal read against current text, exact card facts, VM-561 facet/limitation, and the required accuracy/authority/bridge/echo/deletion/swap/modal-value/neighbor/overclaim/human-language tests.
- Corpus verdict: PASS across all 28 hypothetical resulting fields with two documented legitimate card-fact 4-grams and no unresolved template, terminology, echo, specificity, facet-collapse, or overclaim concern.

### Remaining owner judgment

- Approve, reject, or revise the seven-identity calibration method.
- Accept or reject the revised seven-identity calibration method as the basis for a later separately authorized full proposal pass.
- Authorize a later all-49 phase only if this method is accepted.

## Follow-up recommendations

1. Review the seven identities in `docs/research/archscry-sound-play-audit/prose-calibration.md`.
2. Record owner decisions in the proposal artifact/source only through a separately authorized follow-up; do not apply production copy during calibration review.
3. If the method is approved, plan the later complete remediation population while preserving all 65 `NO_CHANGE_INDICATED`, 3 source-intake-blocked, and 2 Vox-authority-blocked rows.

## Next suggested agent

Owner review first. A later content-remediation agent is appropriate only after explicit calibration approval.
