# VM-558 Shared Play-Modal Composition Repair

Agent: Codex

Task requested: Fix the shared `Cards That Play Like This` modal defect so the complete normalized tile rationale cannot survive as a modal sentence or prefix, apply the repair systemically to all 37 identities, naturalize Ulalek's `Five-Color access` phrase, preserve Dina's accepted behavior, and return the rendered modal text for Saskia, Atraxa, Ulalek, Breya, and Dina.

Related work: `VM-558`, `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, `docs/handoffs/2026-08-14-2317-codex-vm551-identity-card-modal-value.md`, and `docs/handoffs/2026-08-15-2205-codex-vm558-owner-review-harness.md`.

## Files reviewed

- Current branch/worktree/HEAD and the complete dirty VM-558 initiative.
- Governing RobDevPass, RobQAPass, token-control, Kanban, handoff, and VM-551 modal-composition records.
- The owner-provided rendered-text examples.
- Card-rationale relationship authority, proposal authority, runtime catalog, producer/compositor, dossier consumer, shared modal, live replay harness, and focused deterministic tests.

## Files changed

- `research/build-card-rationale-artifacts.mjs`
- `research/build-vm551-card-content-approval-packet.mjs`
- `research/apply-vm551-card-content-automatic-approval.mjs`
- `data/dossier/card-content-review-proposals.source.json`
- `data/dossier/card-rationale-relationships.source.json`
- `data/dossier/card-rationale-catalog.json`
- Generated Packet 1 and card-rationale audit artifacts affected by the Ulalek wording/runtime rebuild
- `scripts/vm551-card-rationale-authority-tests.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `docs/kanban/done/VM-558-complementary-card-voice-proposals.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What changed

- Generated Play modals without an explicit authored deepening now begin with `At the table, [card] carries that card action into this reading's larger plan:` and continue with the existing approved identity table takeaway.
- The compositor and source validator normalize copy and fail if the complete tile rationale appears anywhere in the modal explanation.
- Dina and Grand Arbiter retain their explicit authored modal deepenings and existing table-context composition.
- Ulalek's Play tile now says `access to all five colors` while preserving the same exact card facts and bounded WUBRG relationship.
- The approval producer now uses rationale-specific bounded neighbor analysis rather than importing a selected voice candidate's caveat. This keeps historical rejected voice language from invalidating otherwise unchanged Play relationships during deterministic regeneration.
- The focused replay harness now checks the stronger invariant on every normal replay and opens the approved Play witness during VM-558 targeted review.

## Why it changed

The tile already owns the concise `Why it fits in play` statement. Repeating that statement at the start of the modal made the modal appear longer without adding explanatory value. The shared producer was the owning cause for 48 of 50 records, so the complete fix belongs in composition and validation rather than 48 manual copy edits.

## RobDevPass compact implementation packet

- Product outcome: every Play modal deepens the visible tile relationship instead of repeating it.
- Owning authority and producer: approved card-rationale relationship source plus identity dossier table experience, composed by `build-card-rationale-artifacts.mjs` into `card-rationale-catalog.json` and consumed by the shared dossier modal.
- Existing machinery reused: explicit authored modal override, certified claim provenance, deterministic catalog builder, runtime selector, dossier integrity checks, and live replay harness.
- Changed behavior: default Play-modal composition, normalized duplication invariant, one bounded Ulalek tile phrase, and producer-safe rationale neighbor validation.
- Protected behavior: all 36 VM-558 Sound choices, all slot-1 authority, Sound modal copy, Dina and Grand Arbiter authored deepenings, card facts, placement, scoring, qualification, identity authority, and other card surfaces.
- Consumers/blast radius: all 50 public Play records across all 37 identities; one shared generated catalog and modal consumer.
- Failure/recovery: a source or generated modal that contains its full normalized tile rationale now fails closed; explicit authored deepenings remain available for cards needing more tailored copy.
- Smallest complete implementation: one shared compositor repair, one normalization guard at source/runtime boundaries, the Ulalek source phrase, and focused rendered witnesses.
- Non-goals/stop conditions: no manual 50-row rewrite, semantic reopening, placement work, Sound change, broad WUBRG rewrite, or heavyweight certification. No scope drift occurred.

## Decisions made

- The all-37 guarantee is deterministic rather than inferred from five screenshots: both machine suites iterate all 50 runtime records spanning exactly 37 identities.
- Five rendered cases are representative consumer witnesses, not the scope boundary.
- Dina remains unchanged because its explicit explanation already provides card-specific additive value without reproducing the complete tile rationale.

## Risks / uncertainties

- The default generated lead is deliberately consistent across the catalog. Cards needing a more bespoke deepening can use the existing explicit `modal_explanation` authority, subject to the same non-duplication invariant.
- No unresolved product or test failure remains.

## Tests run

- `node research/apply-vm551-card-content-automatic-approval.mjs --check` — PASS; 37 rationale coverage, 73 voice records, zero review-required records.
- `npm.cmd run test:card-rationales` — PASS; 50 runtime records across 37 identities, 14 negative fixtures including the complete-prefix mutation.
- `npm.cmd run test:vm551-dossier-integrity` — PASS; 50 public rationales and modal contract.
- Dune desktop targeted replay — PASS; Saskia modal.
- Witch desktop targeted replay — PASS; Atraxa modal.
- WUBRG desktop targeted replay — PASS; Ulalek modal and natural tile wording.
- Yore 390px/mobile targeted replay — PASS; Breya modal with bounded placement preserved.
- Witherbloom 390px/mobile replay — PASS; Dina modal unchanged.
- `git diff --check` — PASS.

RobQAPass classification: QA-2, medium shared-content risk. Deterministic coverage proves the invariant over the complete 50-record / 37-identity runtime set; rendered QA proves the shared consumer on the four reported failures plus the accepted Dina control. Placement journeys, synthetic runs, mutation suites, recovery, and all-37 rendered certification were not required or run.

Owner acceptance readiness: ready. The requested five rendered texts are captured in the passing harness output; no further owner semantic review is required.

## Not touched

- VM-558 Sound selections or modal copy, slot-1 authority, exact Scryfall facts, placement/scoring/qualification, identity authority, Mana Notes, precon/Card Signal content, or broader WUBRG copy.

## Follow-up recommendations

- Review and integrate the continuing VM-558 branch as one initiative. No additional modal-by-modal owner pass is necessary for this invariant.

## Next suggested agent

Normal branch reviewer/integrator.
