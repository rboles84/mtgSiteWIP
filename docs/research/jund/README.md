# Jund Research Package

**Faction:** Jund
**Faction Type:** Shard
**Plane / Setting:** Alara
**Color Direction:** Black / Red / Green (BRG)
**Color Center:** Red
**Last Updated:** 2026-05-30
**Kanban Card:** VM-176
**Status:** Source packet only; not live; no architecture or raw-faction packet created.

---

## Approved Packet Files

| File | Purpose |
|---|---|
| [README.md](README.md) | Packet index, source standard, and non-live boundary |
| [jund-source-ledger.md](jund-source-ledger.md) | Reviewed sources, source IDs, tiers, and source-use limits |
| [jund-evidence-ledger.md](jund-evidence-ledger.md) | Stable `JUND-EVID-###` evidence rows for downstream citation |
| [jund-reliability-audit.md](jund-reliability-audit.md) | Seed-file defects, downgrade decisions, and anti-bleed checks |
| [jund-manual-fill.md](jund-manual-fill.md) | Thin or uncaptured lore that must not be promoted yet |
| [jund-research-dossier.md](jund-research-dossier.md) | Conservative VM-176 dossier for Jund identity and support-only context |
| [jund-lore-source-packet.md](jund-lore-source-packet.md) | Clean source packet summary for future Jund architecture work |

---

## Source Standard

VM-176 keeps Jund documentation-only and evidence-first.

- **Tier 1 Jund-specific official:** `Jund_Following Your Heart` is the root source for Jund identity, color direction, Red center, ally roles, and design-level White/Blue absence.
- **Tier 1A repo audit:** `docs/analysis/canon-inventory-three-color-reference-audit.md` is the normalized audit reference. The user-provided `docs/research/canon/canon-inventory-three-color-reference-audit.md` is acknowledged as a source-location input, but this packet cites the normalized `docs/analysis` copy for current repo truth.
- **Tier 2 support:** Alara protocol/codex material, local Scryfall card data, and exact BRG Commander rows can support discovery, card/operator language, and future manual-fill leads only.
- **Tier 2 color philosophy:** official Red, Black, Green, Rakdos, Golgari, Gruul, allied, and enemy color articles may support color-philosophy or pair-overlap rows only. They do not independently prove Jund setting, creature, place, or story claims.
- **Tier 3 seed/reference:** unmanaged seed files and generated HTML are reference-only. Generated HTML may be used only to understand existing packet shape, headings, and formatting precedent.

Every major downstream claim must cite a `JUND-EVID-###` row, be marked `Support-only`, be labeled `Vox Mana synthesis`, or remain `Manual fill required`.

---

## Unmanaged Seed Material Ruling

The prior Jund files were moved under [source-material](source-material/) and are classified as seed/reference material only.

| File | Status | Use Allowed |
|---|---|---|
| `source-material/jund-lore-source-packet.unmanaged-vm161-seed.md` | Unmanaged seed packet with stale VM-161 labels and over-promoted claims | Discovery, defect audit, and comparison only |
| `source-material/Jund_ Deep Lore and Gameplay Analysis.seed.md` | Unmanaged generated or draft dossier | Discovery and caution list only |
| `source-material/jund_research_report.generated-seed.html` | Generated HTML artifact | Structure-only; never canon evidence |

Seed-file claims are not promoted unless independently supported by approved sources in [jund-evidence-ledger.md](jund-evidence-ledger.md).

---

## Promotion Boundary

VM-176 does not create `docs/architecture/colors/jund/`, `data/raw-factions/jund/`, raw JSON, builders, generated artifacts, schemas, runtime code, Maze files, route CSS/JS, Home preview changes, Supabase logic, generated data snapshots, placement fixtures, route maps, browser bundles, or test fixture rewrites.

Jund remains non-live. Future phases must pass review gates before architecture authoring, raw-faction authoring, or controlled runtime promotion.
