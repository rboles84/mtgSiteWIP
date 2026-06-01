# Jeskai Reliability Audit

Status: VM-229 reliability audit

## Reliability Tiers

| Tier | Sources | Allowed Use | Not Allowed |
| --- | --- | --- | --- |
| Tier 1 official Tarkir/story | `JESKAI-SRC-002` through `JESKAI-SRC-006` | Claim-bearing Jeskai, Ojutai, Narset, Shu Yun, timeline, culture, stronghold, Way, and modern-clan evidence | Claims outside cited era or source scope |
| Tier 1 official color/design | `JESKAI-SRC-001`, `JESKAI-SRC-009` through `JESKAI-SRC-014` | Color identity, design intent, metaphysics support, mechanics vocabulary | Tarkir geography, story, or clan facts |
| Tier 1 repo-truth inventory | `JESKAI-SRC-007` | Source availability, audit boundaries, source-selection proof | Lore proof |
| Tier 2 repo support data | `JESKAI-SRC-008` and `JESKAI-CMD-001` through `JESKAI-CMD-011` | support-only Commander/operator/search vocabulary | Commander legality, canon lore, card text proof |
| Seed discovery material | `JESKAI-SRC-015` through `JESKAI-SRC-017` | discovery-only crosscheck and future manual-fill leads | Approved evidence unless separately audited |
| Vox Mana synthesis | Rows explicitly labeled `Vox Mana synthesis` | Product language derived from source-bound rows | Source quotations or standalone canon |

## Timeline Buckets

| Bucket | Sources | Reliable Claims | Risk |
| --- | --- | --- | --- |
| Khans-era Jeskai Way | `JESKAI-SRC-002` | Monasteries, strongholds, Ways, fires, Narset, elders, training, discipline, enlightenment, tradition, dragon-cunning reverence | Do not import Ojutai orthodoxy backward |
| Fate Reforged/past Jeskai | `JESKAI-SRC-003` | Shu Yun, anti-dragon defense, Ojutai as cunning ideal, past clan continuity | Do not treat as Dragons-era Ojutai |
| Khanfall transition | `JESKAI-SRC-004` | Shu Yun, Annals, Ugin choice, Ojutai killing Shu Yun, Jeskai erasure | Story-event scope only |
| Dragons-era Ojutai | `JESKAI-SRC-005` | Ojutai clan doctrine, Narset under Ojutai, forbidden past discovery | Boundary source, not direct Jeskai proof |
| Dragonstorm-era revived Jeskai | `JESKAI-SRC-006` | Modern Jeskai, Narset, Way practitioners, modern monasteries, Stormnexus, rejection of Ojutai doctrine | Modern clan is new/distinct unless source bridges it |

## Ojutai Bleed Controls

- Khans-era Jeskai claims must cite `JESKAI-SRC-002` or another source explicitly framed as pre-Dragonlord Jeskai.
- Fate Reforged material must stay in the pre-Dragonlord/alternate past bucket unless a source says otherwise.
- Dragons-era Ojutai material is boundary evidence by default.
- Modern Dragonstorm Jeskai material is usable for revived Jeskai only.
- Ojutai continuity, Narset/Shu Yun boundary, three Ways, six fires, and mechanics claims must be marked `Manual fill required` when the local evidence is thin or era-ambiguous.

## Support-Only Controls

Commander rows are support-only even when they use WUR/URW colors or Jeskai wording. They may support discovery, operator, and product vocabulary, but they cannot prove:

- Tarkir lore
- Jeskai clan history
- card legality
- exact decklists
- exact mechanics rules
- `JESKAI` runtime promotion

## Seed Controls

The seed files are copied into `source-material/` with SHA-256 equivalence and remain discovery-only:

- `Jeskai Way Deep Research Report.md`
- `jeskai-way-lore-source-packet.md`
- `jeskai_way_research_report.html`

Any seed claim must be crosschecked against `JESKAI-SRC-001` through `JESKAI-SRC-014` before it can move into `jeskai-evidence-ledger.md`.

## Current Reliability Decisions

- Blue-centered cunning is approved from `JESKAI-SRC-001`.
- Khans-era Jeskai culture is approved from `JESKAI-SRC-002`.
- Shu Yun/Ojutai transition evidence is approved from `JESKAI-SRC-003` and `JESKAI-SRC-004` with era boundaries.
- Dragons-era Ojutai is approved as boundary evidence, not as direct Jeskai proof.
- Dragonstorm-era Jeskai is approved only as modern revived Jeskai evidence.
- Sultai, Temur, and Mardu files were not used as evidence sources.
