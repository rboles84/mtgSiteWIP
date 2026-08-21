# VM-574 - All-37 Card Signals + Mana Notes Remediation

ID: VM-574
Title: All-37 Card Signals + Mana Notes Remediation
Status: Done
Type: Archscry content/runtime QA
Area: Archscry Commander dossier
Priority: High
Created: 2026-08-20
Completed: 2026-08-20

## Objective

Bring Archscry Card Signals to exactly three visible Creatures, three visible
Instants/Sorceries, and three visible Enchantments/Artifacts across all 37
identities while preserving the existing collision/dedupe/rendering architecture.
Perform a bounded Mana Notes curation pass without redesigning tiers, schema,
layout, basics, APP_STATE, or selection engines.

## Scope Completed

- Authored final Card Signals for all 37 identities.
- Rebuilt faction/generated artifacts through the existing faction builder.
- Proved the faction builder is source-stable: the required second builder run
  produced zero changed hashes.
- Added a focused VM-574 validator and machine-readable all-37 ledger at
  `docs/audits/vm574-card-signals/final-ledger.json`.
- Added a production media comparison artifact at
  `docs/audits/vm574-card-signals/media-production-check.json`.
- Compared the final VM-574 Card Signal resolver keys against the committed
  VM-559 production media projection and stopped before modifying the generated
  index because the repo has no existing supported deterministic partial-merge
  producer.
- Fixed the single-category Card Signals presentation issue by suppressing the
  redundant selector when only one category is present.

## Acceptance Evidence

- VM-574 Card Signals: PASS, 37 identities, 111/111/111 visible.
- Final 333 Card Signal slots collapse to 278 unique resolver keys.
- Production VM-559 media projection: 144/278 final keys present, 134 missing.
- Scoped partial VM-574 media merge: not applied. The missing-key ledger is
  recorded in `docs/audits/vm574-card-signals/media-production-check.json`.
- Source/generated guardrail validation: PASS with the two inherited model-owned
  warnings for Jeskai and Mardu.
- Frontend JS lint: PASS.
- VM-559 isolated resolver tests: PASS.

## Out Of Scope / Not Changed

- No new Card Signals selector, collision engine, APP_STATE redesign, renderer
  redesign, or layout redesign.
- No replacement of passing selections after they satisfied type, legal color
  identity, non-mana-primary, teaching value, collision, and local media checks.
- No repair of VM-569's accepted Ink Sound / frozen raw snapshot mismatch.
- No investigation or repair of the unrelated VM-551 dossier-integrity
  source-string assertion.
- No hand edit or ad-hoc patch of generated VM-559 media projection artifacts.

## Known External Blockers

- VM-569 remains the owner for `Crystal, Inhuman Princess` being absent from the
  frozen 2026-05-14 raw Oracle snapshot used by the global VM-559 rebuild.
- The final VM-574 Card Signals include 134 resolver keys missing from the
  current committed production VM-559 media projection. Those records should be
  added only after a supported deterministic partial projection/merge producer is
  available, or after VM-569 unblocks the full projection rebuild.
- The stale VM-551 dossier-integrity source-string assertion remains unrelated
  to VM-574.

## Stop Condition

Stop before further content iteration, VM-569 reconciliation, VM-551 assertion
work, commit, push, or deployment. Candidate remains staged and uncommitted for
owner acceptance.
