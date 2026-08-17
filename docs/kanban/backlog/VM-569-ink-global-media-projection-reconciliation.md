# VM-569 - Ink Global Media Projection Reconciliation

ID: VM-569

Status: Backlog

Type: Maintenance / generated projection reconciliation

Area: Archscry authored-card media projection

Priority: Normal

Created: 2026-08-16

## Objective

Reconcile the accepted VM-565 Ink Sound inventory with the older VM-559 global media
projection without changing the accepted Ink card semantics, placement, or frozen
historical evidence silently.

## Current Evidence

- Accepted Ink Sound is `Crystal, Inhuman Princess` plus `Group Project`.
- `Kynaios and Tiro of Meletis` remains Play-only.
- Required CI and the dedicated exact card-voice printing source resolve the accepted
  Ink runtime locally and in production.
- Optional `test:vm559-media-projection` compares that accepted inventory against an
  older global projection: Group Project would replace Danitha, Command Tower's
  occurrence count would fall, and Crystal is absent from the frozen raw Oracle
  snapshot.
- VM-568 deliberately preserved the VM-559 producer and frozen raw snapshot and did
  not hide this mismatch inside the approved release.

## Required Pre-flight

- Apply `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`.
- Re-read VM-559, VM-563, VM-565, and VM-568 handoffs and exact accepted SHAs.
- Identify the owning source and producer before touching generated projection data.
- Distinguish a current projection rebuild from any historical/frozen snapshot update.

## Acceptance Criteria

- The accepted Ink Sound/Play relationship remains exact.
- The global projection and its verifier agree with current authoritative sources.
- Frozen historical evidence is preserved or versioned explicitly, never overwritten
  without source-authority approval.
- No placement, identity meaning, Commander recommendation semantics, or unrelated
  card/media rows change.
- Source/generated guardrails and focused Ink runtime/media checks pass.

## Non-goals

- Reconsidering the owner-accepted Crystal / Group Project decision.
- Rewriting the VM-559 media architecture during routine reconciliation.
- Folding historical source-string assertion modernization into this card.

## Stop Condition

Stop and return to the owner if reconciliation requires replacing frozen VM-559 raw
evidence, changing accepted Ink semantics, or broadening into unrelated projection
architecture.
