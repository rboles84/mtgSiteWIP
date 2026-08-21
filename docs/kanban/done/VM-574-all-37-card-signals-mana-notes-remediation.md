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
- Reconciled VM-574 against the VM-569 refreshed production media projection.
- Fixed the single-category Card Signals presentation issue by suppressing the
  redundant selector when only one category is present.
- Completed final owner WUBRG remediation: `Bring to Light` was replaced by
  `Last Stand`, `Leyline Binding` was replaced by `Chromanticore`, Oracle
  excerpts now truncate only at word boundaries, and inline Oracle mana notation
  renders with Mana Font, including `{T}` as `ms-tap`.

## Acceptance Evidence

- Owner acceptance: PASS on 2026-08-20.
- Implementation SHA: `68fc765df96d88ed638c04b39101b13a6035534a`.
- Final accepted pre-commit digest:
  `700544130747237f0fdc5f096529a32d3d7bc9e9`.
- VM-574 Card Signals: PASS, 37 identities, 111/111/111 visible.
- Final 333/333 visible Card Signal slots collapse to 278 unique resolver keys.
- Production media coverage: 278/278 unique resolver keys, 333/333 visible Card
  Signal slots, 0 missing.
- Source/generated guardrail validation: PASS with the two inherited model-owned
  warnings for Jeskai and Mardu.
- Frontend JS lint: PASS.
- VM-559 isolated resolver tests: PASS.

## Out Of Scope / Not Changed

- No new Card Signals selector, collision engine, APP_STATE redesign, renderer
  redesign, or layout redesign.
- No replacement of passing selections after they satisfied type, legal color
  identity, non-mana-primary, teaching value, collision, and local media checks.
- No further VM-569 work after the refreshed production projection was committed.
- No investigation or repair of the unrelated VM-551 dossier-integrity
  source-string assertion.
- No hand edit or ad-hoc patch of generated VM-559 media projection artifacts.
- The stale VM-551 dossier-integrity source-string assertion remains unrelated
  to VM-574.

## Stop Condition

VM-574 is complete after owner acceptance, implementation commit, governance
closeout, push, and deployment verification.
