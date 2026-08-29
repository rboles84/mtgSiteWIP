# VM-593 — Loom Identity Lens v0 Research

ID: VM-593
Title: Loom Identity Lens v0 — Boros / Lorehold evidence and proof research
Status: Done — Owner Accepted
Type: Research / product-model decision
Area: Maze / Loom / recommendation boundary
Priority: High
Created: 2026-08-29

## Summary

Establish whether a future Loom identity expression can explain a different ordering over one fixed Commander-legal candidate universe without changing color eligibility or inventing affinity after retrieval. The owner accepted the final five-pair evidence package on 2026-08-29.

## Locked Boundaries

- Colors determine eligibility; named identities describe expression.
- Current W/R Commander truth is `id<=wr f:commander`, including eligible mono-white, mono-red, W/R, and colorless cards.
- `MazeQueryResult.query` remains the sole executable-query owner.
- VM-591 remains dormant and query-neutral; its `lenses` and `recommendation_handoff` are future representational seams only.
- Raw faction packets are evidence inputs, not a ranking model; generated faction artifacts are not edited.
- The unrelated `docs/research/maze-player-language/corpus/vm578.zip` archive is protected.

## Acceptance Criteria

1. A source-ledgered, evidence-classified five-pair package establishes which same-pool identity expressions may support bounded downstream ordering and which remain explanation-only, affiliation-only, narrow, or unresolved.
2. The package defines a bounded deterministic affinity/explanation contract, signal stability, overlap, anti-signals, and function-relevance protection without production wiring.
3. A reproducible 120-card Commander-legal proving corpus (24 cards per pair; 80 development / 40 holdout) and 60 pairwise assertions distinguish development from holdout evidence.
4. The package maps the proposal to VM-591 without changing the frozen contract and proposes only one small next implementation story.
5. Owner acceptance, lifecycle closeout, documentation validation, and handoff are complete; no adapter or production implementation is authorized.

## Files Likely Impacted

- `docs/research/loom-identity-lens-v0/`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- research and final-closeout handoffs under `docs/handoffs/`

## Explicit Exclusions

No Loom UI, production reranking, parser/query changes, placement changes, faction dossier changes, generated artifact rebuild, semantic-state schema change, data refresh, or implementation card creation. This closeout permits only the governed commit/push/integration of the accepted research and lifecycle records.

## Owner Acceptance And Final Disposition

Owner accepted the final evidence package on 2026-08-29 with disposition **GO WITH CONDITIONS**. Those conditions constrain only a future, separately authorized implementation; they are not unfinished VM-593 work.

- Five identity pairs, ten identities, and one 120-card fixed proving corpus are preserved.
- The corpus contains 24 cards per pair, an 80/40 development/holdout split, eight function families, nine colorless examples, and 60 structured pairwise assertions (12 per pair).
- The final dispositions are Boros, Lorehold, Golgari, and Simic `ranking_capable`; Orzhov `ranking_capable_narrow`; Izzet and Silverquill `explanation_only`; Prismari and Quandrix `native_affiliation_explanation_only`; and Witherbloom `unresolved`.
- Explicit selection belongs to `PREFERENCE(query_effect: ranking) + RECOMMENDATION_HANDOFF`. Ranking is downstream only: it adds no Scryfall clause or query variant and cannot change legality or candidate membership.
- None/guild/college membership is identical for each pair. Passive Placement/dossier identity remains unapplied context.
- All nine earlier Wizards pages remain pre-correction provenance history only; post-correction external escalations are zero. No holdout-driven rule changes occurred.

## Closeout

- [x] Owner acceptance recorded.
- [x] Final research consistency check completed.
- [x] VM-591 remains frozen and unchanged; no Loom, Maze, Placement, or recommendation runtime file changed.
- [x] Lifecycle records moved to Done.
- [x] Stop. Do not create an adapter card, branch, selector, ranking implementation, Off-Plane UX, or Archscry Phase 3 work in this card.
