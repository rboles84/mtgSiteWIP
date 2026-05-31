# Grixis Research Package

**Faction:** Grixis
**Faction Type:** Shard
**Plane / Setting:** Alara
**Color Direction:** Blue / Black / Red (UBR)
**Color Center:** Black
**Last Updated:** 2026-05-30
**Kanban Card:** VM-164
**Status:** Source packet only; not live; no architecture or raw-faction packet created.

---

## Approved Packet Files

| File | Purpose |
|---|---|
| [README.md](README.md) | Packet index, reviewed source map, and non-live promotion boundary |
| [grixis-research-dossier.md](grixis-research-dossier.md) | Conservative VM-164 dossier for Grixis identity, evidence boundaries, and support-only discovery |
| [grixis-evidence-ledger.md](grixis-evidence-ledger.md) | Claim-by-claim evidence mapping with source tier, confidence/status, and classification |
| [grixis-source-ledger.md](grixis-source-ledger.md) | Reviewed source list, tier hierarchy, source IDs, and rejected/unmanaged artifact register |
| [grixis-reliability-audit.md](grixis-reliability-audit.md) | Reliability notes, anti-hallucination checklist, and claims downgraded from the drafts |
| [grixis-manual-fill.md](grixis-manual-fill.md) | Claims that require official local captures or stronger evidence before promotion |
| [grixis-lore-source-packet.md](grixis-lore-source-packet.md) | Clean VM-164 source packet summary for downstream Grixis architecture work |

---

## Source Standard

VM-164 uses the requested source hierarchy:

- **Tier 1 official:** Official Wizards / Mark Rosewater material captured locally, official card text when available locally, official product pages if locally captured, and locally captured primary canon excerpts.
- **Tier 2 local support:** Local canon audit/protocol docs, local Scryfall/card data, and approved Vox Mana architecture or product research patterns.
- **Tier 3 discovery:** Curated community or draft sources used only for discovery, missing-topic lists, and cautionary review.

Every retained major claim is represented in [grixis-evidence-ledger.md](grixis-evidence-ledger.md).

---

## Reviewed Local Sources

Primary design identity evidence:

- `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`

Local support and discovery rails:

- `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`
- `data/scryfall/raw/oracle-cards.json`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html`
- `docs/architecture/system/cross-color-dynamics.md`
- `docs/research/canon/guild_research/New Capenna Family Lore Dossier.rtf` (comparator/support only)

Audited but non-authoritative draft inputs:

- `docs/research/grixis/Grixis Research Report_ Lore and Mechanics.md`
- `docs/research/grixis/grixis-deep-research-report.md`
- `docs/research/grixis/grixis_research_report.html`
- `docs/research/grixis/grixis-lore-source-packet.md` before VM-164 cleanup

---

## Unmanaged Artifact Ruling

| File | Status | Use Allowed |
|---|---|---|
| `grixis-lore-source-packet.md` before VM-164 cleanup | Replaced with this VM-164 curated packet | Historical draft input only; stale non-Grixis work-item and canonical labels removed |
| `Grixis Research Report_ Lore and Mechanics.md` | Unmanaged draft report with external citations and over-promoted claims | Topic discovery and caution list only |
| `grixis-deep-research-report.md` | Unmanaged draft report with useful downgrading language but web citation placeholders | Topic discovery, source leads, and caution list only |
| `grixis_research_report.html` | Presentation/export artifact | Structure-only; not prose, canon, or evidence |

These draft files remain in place. VM-164 does not archive or delete them.

---

## Promotion Boundary

VM-164 does not make Grixis live. It does not create `docs/architecture/colors/grixis/`, `data/raw-factions/grixis/`, generated artifacts, schema changes, route changes, Maze changes, Home preview changes, or Supabase changes.

Downstream cards must not promote claims about Grixis geography, figures, vis physiology, Conflux chronology, or social hierarchy unless those claims are supported by this packet or moved through [grixis-manual-fill.md](grixis-manual-fill.md).
