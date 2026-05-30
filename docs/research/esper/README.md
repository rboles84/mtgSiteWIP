# Esper Research Package

**Faction:** Esper
**Faction Type:** Shard
**Plane / Setting:** Alara
**Color Identity:** White / Blue / Black (WUB)
**Color Center:** Blue
**Last Updated:** 2026-05-29
**Kanban Card:** VM-163

---

## Approved Packet Files

| File | Purpose |
|---|---|
| [esper-research-dossier.md](esper-research-dossier.md) | Main conservative dossier for Esper identity, source boundaries, and support-only discovery |
| [esper-evidence-ledger.md](esper-evidence-ledger.md) | Claim-by-claim evidence mapping with source tier, confidence/status, and classification |
| [esper-source-ledger.md](esper-source-ledger.md) | Reviewed source list, source hierarchy, and rejected/unmanaged artifact register |
| [esper-reliability-audit.md](esper-reliability-audit.md) | Reliability notes, anti-hallucination checklist, and known risks |
| [esper-manual-fill.md](esper-manual-fill.md) | Claims that require official local captures or stronger evidence before promotion |
| [esper-lore-source-packet.md](esper-lore-source-packet.md) | Clean VM-163 source packet summary for downstream Esper architecture work |

---

## Source Standard

VM-163 uses a conservative source hierarchy:

- **Promoted:** Claims directly supported by the local official Rosewater Esper article, the VM-156 canon inventory, or direct repository inspection.
- **Support-only:** Claims supported by repo-local synthesis, RTF protocol material, broad Alara support, or internal Commander/operator research, but not yet by a local official Esper lore capture.
- **Vox Mana synthesis:** Internal product interpretation for placement, operators, Commander patterns, and expression boundaries. This is not MTG canon.
- **Manual fill required:** Claims that still depend on MTG Wiki, missing official captures, generated dossier prose, presentation HTML, or unsupported draft assertions.

Every retained major claim is represented in [esper-evidence-ledger.md](esper-evidence-ledger.md).

---

## Reviewed Local Sources

Primary identity evidence:

- `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`

Structure and discovery rails:

- `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`
- `docs/architecture/system/cross-color-dynamics.md`
- `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html`

Commander/operator support:

- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

Audited but non-authoritative target artifacts:

- `docs/research/esper/Esper Lore Dossier Generation.md`
- `docs/research/esper/esper_codex.html`
- `docs/research/esper/esper_lore_codex.html`

---

## Unmanaged Artifact Ruling

The following files remain in the folder but are not approved evidence:

| File | Status | Use Allowed |
|---|---|---|
| `Esper Lore Dossier Generation.md` | Generated-style scaffold with non-local citations and target paths that do not exist | Structure-only: headings, topic discovery, missing-topic discovery |
| `esper_codex.html` | Presentation artifact | Structure-only; not prose, canon, or evidence |
| `esper_lore_codex.html` | Presentation artifact | Structure-only; not prose, canon, or evidence |

The previous `esper-lore-source-packet.md` was treated as salvageable draft input and replaced with a VM-163 curated packet.

---

## Promotion Boundary

VM-163 does not make Esper live. It does not create architecture docs, raw-faction JSON, generated artifacts, schema changes, route changes, Maze changes, Home preview changes, or Supabase changes.

Downstream cards must not promote claims about Esper society, figures, geography, metallurgy, chronology, or faction politics unless those claims are supported by this packet or moved through [esper-manual-fill.md](esper-manual-fill.md).
