# VM-558 - Complementary Card-Voice Proposals

ID: VM-558

Status: Done

Current gate: Complete. The owner approved all 36 complementary slot-2 decisions and authorized their bounded promotion; Colorless remains the intentional one-voice exception.

Type: Curated semantic data / generated-data contract / bounded presentation readiness

Area: Archscry dossier, Cards That Sound Like This

Priority: High

Created: 2026-08-15

## Product Outcome

Give each normal identity two excellent, complementary `Cards That Sound Like This` voices that help a player understand what the identity sounds like in Magic. Preserve each accepted VM-551 first voice as slot 1, keep Colorless at one voice, and stop at an owner-readable semantic approval gate before any slot-2 proposal enters the public runtime.

## Owner-Locked Scope

- Use the accepted VM-551 first voice as slot 1 for all 37 identities.
- Seek at most one complementary slot-2 proposal for the 36 normal identities; quality outranks count.
- Keep Colorless at one voice.
- Preserve the Sound-versus-Play distinction. A Sound/Play duplicate is a strong collision.
- Detect and report overlap with Precon, Card Signal, and other card surfaces, but reject it only when it materially creates redundancy or misleading information value.
- Add slot metadata only to the active curated/printing/generator/runtime chain and to new VM-558 proposal records where required.
- Do not rewrite historical rejected or superseded adjudication records solely to backfill `slot: 1`.
- Modify the historical printing helper only if current multi-slot production actually depends on it.
- Do not touch placement.
- Stop at the semantic owner gate before promoting any new slot-2 record.

## RobDevPass Contract

- Product outcome: prepare a defensible, owner-readable set of complementary slot-2 semantic proposals without changing the public approved set.
- Current behavior: the generated runtime catalog contains one accepted exact-printing voice for each of 37 identities; the dossier and shared modal already render the surface.
- Owning layer: approved card-voice relationships and their exact-printing source are the public semantic/data authority; proposal-stage VM-558 records remain non-public until owner approval.
- Authoritative producer: the existing card-content approval producer builds the runtime catalog from the curated relationship and printing sources.
- Existing machinery: current approved/rejected proposal corpus, certified identity authority, accepted CECOS evidence in its allowed role, committed Scryfall records, card-voice source schemas, generator, catalog, runtime selector, shared card cache/modal, and VM-551 authority/integrity checks.
- Changed behavior in this owner-gate phase: multi-slot-safe metadata/contracts, bounded proposal records, deterministic proposal validation, and an owner-readable semantic matrix.
- Protected behavior: placement, scoring, qualification, identity semantics, current first voices, Colorless cardinality, Sound/Play isolation, exact-printing authority, modal behavior, and all unrelated card surfaces.
- Consumers/blast radius: relationship/printing source validators, catalog producer, runtime voice selector, card collision planner, dossier renderer, shared modal, source-generated validation, and VM-551 card-content/integrity checks.
- Failure/recovery states: unresolved proposal gaps remain explicit and non-public; missing or malformed public catalog data must not be silently mistaken for an identity with no voice.
- Smallest complete implementation: make the active chain slot-aware, curate only evidence-supported slot-2 proposals, prove proposal/public isolation, and present the semantic decisions for owner judgment.
- Non-goals: no broad rerank, no bulk Scryfall research, no first-slot replacement, no third voice, no Colorless second voice, no historical-adjudication rewrite, no redesign, and no new audit/research framework.
- Stop conditions: any need to change placement, scoring, qualification, identity semantics, CECOS authority, accepted slot 1, or another protected authority; any candidate that requires unsupported semantic invention; or any attempted runtime promotion before owner approval.

## Candidate Review Order

1. Define the distinct teaching facet already supplied by slot 1 and the complementary facet still needed.
2. Reuse reviewed/adjudicated card-voice candidate history.
3. Reuse committed local Scryfall/card records and existing approved evidence.
4. Use Packet/dossier authority; use Atlas/profile material only as non-overriding enrichment.
5. Perform new bounded research only for an exact unresolved slot after the current inventory proves it necessary.
6. Leave a gap rather than pad the surface.

## Preliminary RobQAPass Classification

- QA tier: QA-2 ceiling for multi-slot component/data behavior; QA-1 semantic core for proposal content.
- Machine validation: all approved/proposed identities, slots, exact printings, flavor, provenance, catalog/public isolation, Sound/Play collision reporting, other-surface overlap reporting, pair metadata, source/generated parity, and failure-state contracts.
- Rendered QA after approved promotion is explicitly out of this owner-gate phase. If proposal-stage UI or existing runtime behavior must change now, use representative desktop and 390px cases; reserve 320px for actual stress/edge cases.
- CPU-heavy validation: `NOT REQUIRED`; placement, 5,000 journeys, synthetic, mutation, recovery, and exhaustive historical replay are outside the changed risk.
- Remaining owner judgment: whether each proposed second voice is genuinely useful, identity-true, and distinct from slot 1.

## Acceptance Criteria For Semantic Owner Gate

- All 37 accepted first voices remain byte/field-equivalent apart from required active-chain slot metadata.
- Colorless remains one voice and has no slot-2 proposal.
- Every proposed slot 2 has an exact printing, flavor text, provenance/source relationship, a distinct teaching facet, pair metadata, and overlap findings.
- Historical rejected/superseded records are not rewritten merely for slot backfill.
- No proposal is public, runtime-approved, or rendered as slot 2.
- Unsupported identities are reported as gaps.
- The owner receives one bounded matrix containing only new VM-558 semantic decisions.
- Relevant deterministic checks pass; no placement or heavyweight certification suite runs.

## Branch

`codex/vm558-card-voice-pairs`

## 2026-08-15 Semantic-Gate Checkpoint

- Preserved all 37 accepted VM-551 records as approved slot-1 anchors.
- Added 36 structurally validated `REVIEW_REQUIRED` slot-2 proposals; Colorless has none.
- Kept approved printings and the runtime catalog at 37 slot-1 records. No proposal was promoted or rendered.
- Reused existing reviewed candidate history and committed card/evidence records; no broad external card research was required.
- Detected four proposals with non-blocking other-surface overlap: Judith and Ayara in Card Signal, Nekusar in Precon and Card Signal, and Atarka in Precon. Sound/Play collisions are zero.
- Made the active relationship, printing, producer, catalog, and runtime selection chain slot-aware. Historical rejected/superseded adjudications and the historical printing helper were not rewritten.
- Added a deterministic owner-review builder and the bounded matrix at `docs/reports/VM-558-card-voice-semantic-owner-review.md`.
- Added an intentional runtime unavailable state for missing/malformed public voice authority; this does not expose proposals or alter placement.

RobQAPass result: QA-2 for the narrow shared-surface and active-chain behavior, with QA-1 owner judgment for semantic proposals. Focused authority, dossier, source/generated, frontend lint/smoke, freshness, and diff checks pass. Rendered self-QA passed at desktop and 390px on the shared Esper surface and at 320px on the real missing-catalog edge state, with no overflow. Placement, 5,000-journey, synthetic, mutation, recovery, exhaustive all-identity replay, and visual-baseline suites were not run because their protected behavior did not change.

Stop line reached: owner must approve, revise, reject, or leave unresolved each proposed slot-2 semantic decision before a separate promotion pass may add approved printings or runtime records.

## 2026-08-15 Four-Row Revision Checkpoint

- Recorded `APPROVE` on the 32 unchanged proposal rows without changing `review_status`, `public_eligible`, approved printings, or runtime output.
- Replaced Quandrix's Augmenter Pugilist // Echoing Equation proposal with Golden Ratio, grounded in certified Quandrix pattern-in-nature authority and separated from Izzet invention and Simic experimentation.
- Replaced Dune's Ahn-Crop Crasher proposal with Dune-Brood Nephilim, using Dune's certified card anchor to complement Aurelia's front-line leadership with mass common-front multiplication rather than more generic momentum.
- Replaced Witch's Sapling of Colfenor proposal with Inexorable Tide, using the bounded Atraxa / proliferate support lane to expose controlled improvement becoming self-justifying expansion rather than another generic plan or growth metaphor.
- Retained Child of Alara for WUBRG and rewrote the lesson/modal around breadth without submission to one constituent worldview. The proposal-local owner row uses `WUBRG`; accepted slot-1 identity authority and runtime naming remain untouched.
- Preserved the prior four decisions in inline `owner_revision_history`; no historical rejected/superseded adjudication corpus was rewritten.
- Regenerated the owner artifact as a four-row revision packet only. The 32 approvals remain held so the owner can issue one complete promotion authorization.

RobQAPass result: QA-1 semantic-data revision within the existing QA-2-safe proposal chain. The four-row builder check, VM-551 card-content authority freshness check, dossier integrity check, and `git diff --check` pass. Approved printings and runtime remain 37 slot-1 records; runtime slot 2 remains zero; Sound/Play collisions remain zero. No rendered QA was repeated because no public/runtime UI behavior changed in this revision pass.

Stop line remains active: obtain owner decisions for exactly Quandrix, Dune, Witch, and WUBRG before any promotion pass.

## 2026-08-15 Two-Row Second-Revision Checkpoint

- Recorded `APPROVE` for Quandrix / Golden Ratio and WUBRG / Child of Alara. The prior 32 approvals remain held, yielding 34 approved semantic slot-2 decisions without changing proposal review status, public eligibility, approved printings, or runtime output.
- Rejected Dune-Brood Nephilim as too dependent on modal-supplied common-front meaning. Replaced it with Scour from Existence, whose exact line joins people, land, existential cost, and immediate common-front resistance without another generic aggression, momentum, swarm, or overwhelming-force image.
- Rejected Inexorable Tide because its exact line remains more naturally Phyrexian/Yore/Esper than Witch. Replaced it with Amphin Cutthroat, whose exact line itself supplies long concealment, organized society, deliberate building, patient expansion, and eventual ambition.
- Applied the hidden-identity and neighbor-confusion tests against Dune's Naya/Mardu/Abzan pressure neighbors and Witch's Yore/Esper/Simic/Blue boundaries. Both replacements remain bounded semantic echoes rather than identity or placement proof.
- Preserved the rejected proposals in each active proposal's `owner_revision_history`; no historical VM-551 adjudication record was rewritten.
- Regenerated the owner artifact as exactly two pending rows. All 34 approvals remain held for a single later promotion authorization.

RobQAPass result: QA-1 semantic-data revision within the existing proposal-only chain. Exact committed printing/flavor/image facts, claims, pair metadata, overlap state, proposal/runtime isolation, and generated owner-packet freshness are the bounded deterministic checks. Rendered QA remains unnecessary because approved printings, runtime data, and UI behavior did not change.

Stop line remains active: obtain owner decisions for exactly Dune and Witch. Do not promote any of the 34 approved rows until the owner gives one complete promotion authorization.

## 2026-08-15 Owner-Approved Promotion Completion

- Recorded final owner approval for Dune / Scour from Existence and Witch / Amphin Cutthroat, completing the semantic gate at 36/36 approved slot-2 decisions.
- Promoted exactly those 36 complements to `APPROVED_PUBLIC` with explicit `OWNER_SEMANTIC_APPROVAL` provenance, retained each proposal's structural validation and owner decision, and left all 37 accepted slot-1 semantic fields unchanged.
- Rebuilt the approved exact-printing source and generated runtime catalog to 73 records: two ordered voices for each of 36 normal identities and one voice for Colorless.
- Kept Sound/Play collisions at zero. Previously reported Precon/Card Signal overlaps remain non-blocking and do not suppress the approved voice; no placement, scoring, qualification, identity authority, or candidate research changed.
- Added deterministic local-image coverage for all 73 public voices, including face-level DFC image resolution for Yore's Ayara complement.
- Rendered QA found and fixed one promotion-specific defect: the more-specific two-card rule defeated the mobile one-column rule. The corrected 390px and 320px layouts have no card, section, or document horizontal overflow.

RobQAPass classification remained QA-2 for the shared data/component promotion with QA-1 owner semantics already completed. Focused authority, dossier, source/generated, schema/freshness, frontend lint/smoke, protected slot-1 parity, image-resolution, and rendered checks pass. Rendered coverage used a guild and four-color pair at desktop, five-color and college pairs plus Colorless at 390px, and Witch's longest pair/modal at 320px. Placement certification, 5,000 journeys, synthetic runs, mutation, recovery, exhaustive all-identity replay, and visual-baseline suites were not run because their protected behavior did not change.

Completion state: VM-558 is ready for normal branch review/integration. No semantic owner burden remains.

## 2026-08-15 Owner-Review Harness Follow-Up

- Classified the reported Dune, Witch, WUBRG, and Yore failures as review-harness defects, not product, card-authority, Mana Notes, or placement failures.
- Added a VM-558-only mode to the existing VM-551 replay harness. It preloads the certified identity witness, disables only the asynchronous ancillary dossier-art pass through the existing visual-regression hook, and asserts exactly the in-scope pair, printing provenance, art, modal context, focus, active identity, and responsive geometry.
- Added checksum-locked local fixtures for only the eight in-scope exact printings and their tile/modal image variants. The public image URLs remain in the DOM; the harness serves the bytes locally only under `--vm558-review`.
- Yore now opens a session-only presentation fixture derived from its certified bounded witness and current Yore faction record. The original `insufficient` / `UB` placement context remains explicit in fixture metadata and a visible review notice; production placement and result rendering are unchanged.
- Added the narrow two-class regression: Dune desktop proves ancillary-art isolation; Yore at 390px proves bounded-context preservation and the mobile DFC pair. Witch and WUBRG desktop commands pass the same full targeted assertions.

RobQAPass result: QA-2 for the review-harness control flow with QA-1 data assertions. The four focused rendered cases, fixture checksums, exact printing/card art, both modals, Sound/Play context, focus restoration, active identity, and responsive layout pass. No placement journeys, synthetic runs, mutation, recovery, all-37 certification, semantic review, or production behavior changes were performed.

## 2026-08-15 Shared Play-Modal Composition Follow-Up

- Repaired the shared `Cards That Play Like This` compositor so a generated modal transitions directly into additive card-specific identity context instead of repeating the complete visible tile rationale as its opening sentence.
- Applied the invariant to all 50 public Play records spanning all 37 identities. Existing authored additive explanations for Dina and Grand Arbiter remain authoritative and unchanged.
- Strengthened source, generated-catalog, dossier-integrity, and rendered-harness validation to reject any modal containing the complete normalized tile rationale as a sentence or prefix. A mutation fixture recreates the reported defect and fails closed.
- Rephrased only Ulalek's Play tile from `Five-Color access` to `access to all five colors`; no broader WUBRG, identity, placement, Sound, or card-selection authority changed.
- Kept the automatic approval producer deterministic by preventing an unrelated rejected voice-candidate caveat from being borrowed as Play-rationale neighbor analysis.

RobQAPass result: QA-2 for the shared compositor and runtime consumer, with full deterministic coverage of 50 records / 37 identities and representative rendered PASS cases for Dune, Witch, WUBRG, Yore/mobile, and Witherbloom/mobile. No placement, journey, synthetic, mutation-suite, recovery, or all-37 rendered certification was run.
