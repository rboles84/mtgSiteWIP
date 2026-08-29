# Loom Identity Lens v0 research package

Status: **Owner Accepted — closed research**. This is a research package, not an implementation or a new canonical faction authority.

## Question

Can the same Commander-legal color-pair pool produce useful, honest differences for a player who explicitly chooses one of five guild/college expressions? The first-class pairs are W/R Boros/Lorehold, U/R Izzet/Prismari, B/G Golgari/Witherbloom, U/G Simic/Quandrix, and W/B Orzhov/Silverquill.

The answer from this package is **GO WITH CONDITIONS**: yes, as a small, bounded relevance-preserving reorder with grounded reasons. It is not a faction search, a legality filter, or a claim that every card has one true identity.

## Package map

- [Internal authority map](internal-authority-map.md), [ecosystem evidence map](ecosystem-evidence-map.md), [pair contracts](pair-contracts.md), and [signal matrix](identity-signal-matrix.json) — normalized internal evidence for all ten identities.
- [Evidence contract](recommendation-evidence-contract.md) — finding, boundaries, ownership, red-team, and one next story.
- [Source ledger](source-ledger.md) — internal evidence plus preserved pre-correction external provenance.
- [Five-pair proving corpus](five-pair-proving-corpus.json) — accepted 120-card, 60-assertion corpus across all five pairs; [proving set](proving-set.json) remains the preserved W/R seed.

## Fixed snapshot and provenance

- Scryfall Oracle bulk: `27bf3214-1271-490b-bdfe-c0be6c23d02e`; updated `2026-08-20T21:01:56.219Z`, downloaded `2026-08-21T02:48:16.052Z`; 38,626 Oracle cards.
- Query witnesses observed from `assets/js/maze/research-builder.js`: W/R `id<=wr f:commander`, U/R `id<=ur f:commander`, B/G `id<=bg f:commander`, U/G `id<=ug f:commander`, W/B `id<=wb f:commander`.
- Faction inputs inspected: Boros raw packet (36 claims, 17 sources) and Lorehold raw packet (97 claims, 20 sources). Both explicitly restrict Commander Compass to auxiliary product guidance. Boros generated artifacts are marked stale until its Gate 4; neither generated output nor a Commander list is used as canonical proof.
- Protected unrelated material: `docs/research/maze-player-language/corpus/vm578.zip` was not read, altered, staged, moved, or included.
- No post-correction external research was performed; the nine earlier pages are retained only as provenance.

## Evidence vocabulary

`canonical` means official setting/worldbuilding; `design` means official design intent; `card fact` means exact Scryfall Oracle evidence; `behavioral` means player-population evidence (not used to establish faction truth); `inference` means a documented product interpretation. No category may silently substitute for another.
