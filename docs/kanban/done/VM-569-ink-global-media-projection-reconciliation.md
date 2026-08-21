# VM-569 - Ink Global Media Projection Reconciliation

ID: VM-569

Status: Done

Type: Maintenance / generated projection reconciliation

Area: Archscry authored-card media projection

Priority: Normal

Created: 2026-08-16

Completed: 2026-08-20

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

## Closeout Evidence

- Refreshed governed Oracle corpus: 38,626 records, upstream snapshot
  `2026-08-20T21:01:56.219+00:00`.
- Deterministic reconciliation classified all 58 non-query drifts as
  `SAFE_PRINTING_REFRESH` and found 0 semantic selection changes.
- Existing VM-559 drift gate stayed unchanged; the existing explicit
  selection-drift acceptance mechanism was used once for the governed refresh.
- Current projection: 655 unique resolver keys across 1,230 authored occurrences,
  with 0 unresolved governed resolver keys.
- `Crystal, Inhuman Princess` resolves normally through the production projection.
- VM-574 media coverage is 278/278 unique resolver keys and 333/333 visible Card
  Signal slots, with 0 missing media and no VM-574 selection drift.
- VM-574 pre-VM-569 staged preservation digest
  `c1d93ac9aca75430550109c64141fa4071e7dd8c` was captured as historical
  evidence before committing shared governance/evidence paths; after that
  legitimate HEAD change, VM-574 preservation is proved semantically on the new
  base.
- Bounded Scryfall artifact hygiene found one current governed raw corpus and the
  expected current generated index/projection files; no temporary `.gz`, `.jsonl`,
  `.tmp`, `.bak`, `.old`, duplicate projection, or VM-569 debug debris required
  removal.

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
