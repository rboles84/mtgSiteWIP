# Abzan Research Packet

**Faction:** Abzan Houses
**Faction Type:** Tarkir wedge
**Plane / Setting:** Tarkir
**Color Direction:** White / Black / Green (WBG)
**Color Center:** White
**Last Updated:** 2026-05-31
**Kanban Card:** VM-197 user-declared closeout; VM-200 historical source-packet provenance.
**Status:** Source-packet scope only. The packet itself creates no architecture, raw-faction, generated, runtime, route, Home, Maze, schema, Supabase, fixture, or builder changes.

VM-200 implements the requested VM-197 Abzan source-packet scope. The card was renumbered because VM-197, VM-198, and VM-199 are already assigned in current repo truth.

VM-197 closeout note, 2026-05-31: the user-declared Abzan VM-197 source-packet gate was re-verified against the live `docs/research/abzan houses/` seed folder after downstream Abzan work already existed in the dirty baseline. VM-197 preserves the existing source/evidence rows and records duplicate-ID handling without renaming the prior Alara VM-197 or the historical Abzan VM-200 packet record.

---

## Approved Packet Files

| File | Purpose |
|---|---|
| [README.md](README.md) | Packet index, source standard, and non-live boundary |
| [abzan-source-ledger.md](abzan-source-ledger.md) | Reviewed source rows, source tiers, seed handling, and Commander support rows |
| [abzan-evidence-ledger.md](abzan-evidence-ledger.md) | Stable `ABZAN-EVID-###` rows for downstream citation |
| [abzan-reliability-audit.md](abzan-reliability-audit.md) | Source-laundering, Dromoka, WBG, seed, and support-only risk audit |
| [abzan-manual-fill.md](abzan-manual-fill.md) | Thin or uncaptured claims that must stay out of downstream docs until sourced |
| [abzan-seed-source-crosscheck.md](abzan-seed-source-crosscheck.md) | Post-restore comparison between `abzan houses/` seed sources and the VM-200 evidence packet |
| [abzan-research-dossier.md](abzan-research-dossier.md) | Conservative source-bound dossier for future Abzan architecture work |
| [abzan-lore-source-packet.md](abzan-lore-source-packet.md) | Normalized lore source packet for later review-gated authoring |
| [source-material/](source-material/) | Quarantined copies of the three Abzan seed artifacts |

The seven approved root packet files are exactly `README.md`, `abzan-source-ledger.md`, `abzan-evidence-ledger.md`, `abzan-reliability-audit.md`, `abzan-manual-fill.md`, `abzan-research-dossier.md`, and `abzan-lore-source-packet.md`. `abzan-seed-source-crosscheck.md` and `source-material/README.md` are supplemental audit files retained from the earlier source-packet verification trail.

---

## Source Standard

VM-200 keeps Abzan documentation-only and evidence-first.

- **Tier 1 Abzan-specific official design:** Mark Rosewater's local Abzan article is the source floor for WBG, White center, endurance/survival, answer-first strategy, defense, growth, and color-role tension.
- **Tier 1 Abzan-specific official world guides:** Local Tarkir source-material captures are the source floor for Khans/Fate/Dragons/Dragonstorm Abzan lore, Dromoka contrast, Khanfall context, and modern Abzan Houses details.
- **Tier 1A repo audit:** The canon inventory and analysis audit establish source-path classification and prior official/source-role decisions. They are source-selection evidence, not direct lore evidence.
- **Tier 2 support:** Exact WBG Commander/operator rows may support play-pattern and search-language texture only.
- **Tier 3 seed/reference:** The three seed artifacts copied into `source-material/` are discovery/reference material only. They do not prove their own claims.

Every major downstream claim must cite an `ABZAN-EVID-###` row, be marked `Support-only`, be labeled `Vox Mana synthesis`, or remain `Manual fill required`.

---

## Quarantined Seed Material Ruling

The requested seed folder `docs/research/abzan houses/` was not present as a live worktree path during VM-200. VM-198 had already stashed unrelated future-wedge research. VM-200 copied only the three Abzan seed blobs from the VM-198 stash's untracked tree into `docs/research/abzan/source-material/` without applying the stash and without recreating or deleting the spaced folder.

| Copied File | Status | Use Allowed |
|---|---|---|
| `source-material/Abzan Houses_ Deep Research Report.md` | Stashed seed artifact | Discovery, defect audit, and comparison only |
| `source-material/abzan-houses-lore-source-packet.md` | Stashed packet-shaped seed artifact | Discovery and claim queue only |
| `source-material/abzan_houses_research_report.html` | Stashed generated HTML artifact | Structure-only; never canon evidence |

Seed-file claims are not promoted unless independently supported by [abzan-evidence-ledger.md](abzan-evidence-ledger.md).

---

## Promotion Boundary

VM-200 does not create `docs/architecture/colors/abzan/`, `data/raw-factions/abzan/`, raw JSON, builders, generated artifacts, schemas, runtime identity, routes, Maze files, Home preview changes, Supabase logic, placement fixtures, route maps, browser bundles, or test fixture rewrites.

Abzan remains non-live. Future phases must pass review gates before architecture authoring, raw-faction authoring, or controlled runtime promotion.
