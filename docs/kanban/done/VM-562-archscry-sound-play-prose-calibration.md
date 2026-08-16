# VM-562 - Archscry Sound/Play Prose Calibration

ID: VM-562

Status: Complete

Current gate: Frozen at checkpoint `7f79efa3b7442a202db04e6b7013b701bffc4286`; the owner authorized VM-563 to apply the accepted method.

Type: Documentation / source-grounded copy calibration

Area: Archscry Cards That Sound Like This / Cards That Play Like This

Priority: High

Created: 2026-08-16

## Product Outcome

Establish a safe, evidence-bounded writing method on a seven-identity corpus sample before any owner-authorized remediation of the 49 VM-561 `REMEDIATION_LIKELY` rows at scale.

## RobDevPass Contract

- Current behavior: VM-561 freezes 37 identity packets and 119 rendered rows at checkpoint `0d073cd1a5917afecbcb722d57a117f87799ade6`, including exact defect and authority classifications. Production Sound/Play copy remains unchanged.
- Owning authority: VM-561 selects eligible rows and evidence altitude; opened underlying sources own identity claims; committed Scryfall records own exact card/printing facts. The calibration is review material only.
- Changed behavior: research visibility only—one proposal artifact, deterministic calibration QA, Kanban, and handoff records.
- Protected behavior: active Sound/Play text, approved relationships, exact printings, runtime/catalog/generated product data, placement/scoring/qualification, certified identity semantics, the existing VM-559 workbook, VM-559 release state, and `docs/research/canon/`.
- Consumers: owner review of writing method and a later separately authorized remediation phase.
- Smallest complete implementation: exactly seven family-stratified identities; smallest-field proposals only for their eligible `REMEDIATION_LIKELY` rows; explicit evidence/test records; corpus anti-template analysis; no promotion path.
- Non-goals: no production edit, relationship/card/printing change, source intake, semantic repair, all-49 rollout, runtime regeneration, placement work, push, merge, or deployment.
- Stop conditions: any proposed field would strengthen the relationship, outrun VM-561 authority, require a blocked row, or force filler where no additive modal is defensible. Use `MODAL_CONTENT_MODEL_REVIEW` instead of inventing copy.

## Required Calibration Classes

Exactly one identity from each:

1. Mono color.
2. Ravnica guild.
3. Strixhaven college.
4. Three-color shard or Tarkir clan.
5. Four-color Vox Mana identity.
6. WUBRG.
7. Colorless.

Selection is controlled by the complete VM-561 ledger, not the order of prior manual discovery.

## Selected Calibration Corpus

| Required class | Identity | VM-561 eligible rows | Selection reason |
| --- | --- | ---: | --- |
| Mono color | Black (`B`) | 2 | Tests a redundant Sound bridge and a generic Play modal against a strong mono-color evidence floor without privileging White from the earlier manual review. |
| Ravnica guild | Simic Combine (`UG`) | 2 | Combines Sound echo with the corpus's explicit `PLAY_SECTION_TILE_DOES_NOT_EXPLAIN_CARD_PLAY` finding and preserves the Simic-versus-Quandrix boundary. |
| Strixhaven college | Lorehold College (`LOREHOLD`) | 3 | The only college sample with eligible Sound and Play rows spanning modal redundancy, local template reuse, and unsupported evaluative language; selection is defect-led, not encounter-led. |
| Three-color identity | Sultai Brood (`SULTAI`) | 1 | Carries the explicit player-facing research/process-language leak while retaining a strong identity-specific three-color route. |
| Four-color Vox Mana identity | Ink / Altruism (`INK`) | 3 | Provides three unblocked rows at the required Vox Mana synthesis altitude and tests restraint around open knowledge, protected generosity, and the missing-color boundary. |
| WUBRG | Five-Color / WUBRG (`WUBRG`) | 1 | Required stress test for keeping several traditions present without inventing one universal five-color ideology. |
| Colorless | Colorless (`COLORLESS`) | 2 | Required stress test for keeping the Eldrazi and counter-engine examples branch-local rather than defining all of Colorless. |

Total eligible calibration population: 14 `REMEDIATION_LIKELY` rows. Every other row for these identities remains frozen.

## Proposal Contract

- Only `REMEDIATION_LIKELY` rows may receive replacement text.
- `NO_CHANGE_INDICATED` rows stay unchanged.
- Source/authority/insufficiency/conflict rows receive no replacement prose.
- Repair only the failed field; preserve correct neighboring text.
- Every sentence stays inside `ROUTING_AUTHORITY` → `UNDERLYING_EVIDENCE` → `AUDIT_INFERENCE` without counting derivative copies as independent corroboration.
- Sound modals add identity-specific understanding beyond the exact quotation.
- Play tiles explain actual card behavior; Play modals deepen the player action/choice/sequence and its bounded identity meaning.
- The shared `At the table, [Card] carries...` composer is forbidden, as is replacing it with another universal scaffold.
- If no honest additive modal exists, record `MODAL_CONTENT_MODEL_REVIEW` and propose no modal.
- Nothing may become `APPROVED_PUBLIC` in VM-562.

## RobQAPass Classification

QA-0 documentation/content proposal validation. Required checks: exact seven-family stratification, VM-561 row/disposition/current-text parity, evidence ID resolution, blocked-row exclusion, smallest-field preservation, card-fact accuracy, authority altitude, bridge/echo/deletion/swap/neighbor/overclaim/human-language records, corpus-level duplicate and template analysis, and protected-path immutability. Runtime and placement suites are not justified.

## Branch / Worktree

Continue the existing single worktree on `codex/vm559-archscry-media-reliability` from VM-561 checkpoint `0d073cd1a5917afecbcb722d57a117f87799ade6`. No additional branch or worktree is authorized.

## Stop

Stop for owner review after the calibration artifact, QA evidence, and handoff. Do not apply or scale the proposals.

## Calibration Result

- VM-561 base checkpoint: `0d073cd1a5917afecbcb722d57a117f87799ade6`.
- Selected corpus: Black, Simic Combine, Lorehold College, Sultai Brood, Ink / Altruism, Five-Color / WUBRG, and Colorless.
- Eligible rows inspected: 14/14 across the selected identities.
- Proposed changes: 3 tile fields and 14 modal fields.
- Deliberately unchanged eligible fields: 11.
- `MODAL_CONTENT_MODEL_REVIEW`: 0.
- Resulting-row anti-template QA: all 28 hypothetical player-facing fields across the 14 selected rows; zero exact duplicates, near duplicates, repeated openings/endings, repeated grammatical-skeleton proxies, high tile/modal echoes, shared-composer occurrences, internal research/evidence leaks, or card-specificity concerns.
- Two reviewed legitimate 4-grams remain: `an instant or sorcery` across two mechanically different Lorehold cards, and `three other graveyard cards` across Kotis's tile/modal because the modal's choice depends on that exact additional cost. No repeated 5-gram remains.
- Proposal artifact: `docs/research/archscry-sound-play-audit/prose-calibration.md`.
- Recommendation: `READY_FOR_OWNER_CALIBRATION_ACCEPTANCE`.
- Status: final calibration acceptance gate complete and stopped for owner review; no proposal has been applied or promoted.

## Tests

- `node scripts/vm562-sound-play-prose-calibration.mjs --write` — PASS, deterministic artifact generation plus eligibility, authority-route, field-preservation, resulting-pair corpus, terminology-leak, and protected-path validation.
- `node scripts/vm562-sound-play-prose-calibration.mjs` — PASS in check mode with the same 7/14/3/14/11/0 result, all 28 resulting fields inspected, and no stale generated artifact.
- Protected-path audit — PASS: only VM-562 card/board, proposal source/artifact, QA script, and handoff/index paths are allowed after the VM-561 checkpoint.
