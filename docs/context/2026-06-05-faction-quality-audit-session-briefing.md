# Faction Data Quality Audit — New-Chat Context Briefing

**Date:** 2026-06-05
**Purpose:** Self-contained briefing for a new Claude chat window continuing faction data quality work. No other context is needed to resume.
**Working directory:** `C:\dev\mtgSiteWIP`

---

## 1. Session Summary (2026-06-05)

The 2026-06-05 session was a full faction data quality audit and remediation sprint. The following was accomplished:

- **Full 35-faction data quality audit** conducted — every faction in `data/placement-model.json` and `data/factions.json` was classified by tier (Tier 1/2/3 or broken).
- **WITCH brought to Tier 1 (VM-295)** — replaced 3 garbage auto-matched flavor snippets; rewrote lore_summary, affinity blocks, deck_links, raw_enrichment in `data/factions.json`; filled all empty placement_axes, discriminator_questions, and source_metadata in `data/placement-model.json`. Sources: WITCH-EVID-001–011 from VM-264 evidence ledger and witch-lore-source-packet.md Product Copy Seed.
- **JESKAI brought to Tier 1 (VM-294)** — Jeskai Way was Tier 3 (broken: empty drawn_to/repelled_by/interview_tells, no research/deck links, no raw_enrichment, generic lore_summary). Elevated to full Tier 1 gold standard using JESKAI-EVID-001–018 from VM-229 evidence ledger and Tarkir source material.
- **All kanban cards and handoffs created** — VM-295 and VM-294 cards created in `docs/kanban/done/`, board.md updated, HANDOFF_INDEX.md updated.
- **Canon research library read and loaded** — all on-disk research at `docs/research/` was available and used. No web searches were performed.

---

## 2. Faction Tier Status (current as of 2026-06-05 session end)

### Tier 1 — Complete (23 factions)

All fields present and gold-standard quality: lore_summary (faction-voice), drawn_to (5 specific items), repelled_by (3 identity markers), interview_tells (5 real user-signals), research_links.edhrec_slug, deck_links (3 entries), raw_enrichment (timeline, key_figures, canonical_flavor_text), identity.mechanics (prose), placement_axes (12 pos_terms, 5 strengthens, 5 suppress, guardrail), good_fit_indicators (3 user-signal bullets), poor_fit_indicators (2-3 targeted), inhibitor_traps (3 targeted), discriminator_questions (3 full questions), source_metadata (profile_version "2.0", claim_count 10+), flavor snippets (3 faction-specific, confirmed card text).

| Faction | Key | Notes |
|---|---|---|
| Azorius Senate | WU | Complete |
| Orzhov Syndicate | WB | Complete |
| Boros Legion | WR | **Gold standard reference** |
| Selesnya Conclave | WG | Complete |
| Dimir House | UB | Complete |
| Simic Combine | UG | Complete |
| Rakdos Cult | BR | Complete |
| Golgari Swarm | BG | Complete |
| Izzet League | UR | Borderline Tier 2 — mechanics field confirmed empty |
| Gruul Clans | RG | Borderline Tier 2 — mechanics field confirmed empty |
| Silverquill | WB (Strixhaven) | Complete |
| Quandrix | UG (Strixhaven) | Complete |
| Witherbloom | BG (Strixhaven) | Complete |
| Prismari | UR (Strixhaven) | Complete |
| Esper | WUB | Complete |
| Grixis | UBR | Complete |
| Jund | BRG | Complete |
| Naya | RGW | Complete |
| Jeskai Way | WUR | **Completed this session (VM-294)** |
| WITCH | GWUB | **Completed this session (VM-295)** |

Note: UR and RG are listed as Tier 1 above with a caveat — they are structurally complete except for the `identity.mechanics` field being empty. They are borderline Tier 1/2. The quick fix is to fill the mechanics prose field; all other data is gold-standard.

### Tier 2 — Partial

Structurally present and placeable but missing one or more gold-standard fields.

| Faction | Key | Missing / Deficient |
|---|---|---|
| Izzet League | UR | `identity.mechanics` field empty |
| Gruul Clans | RG | `identity.mechanics` field empty |
| Lorehold | WR (Strixhaven) | No raw_enrichment; conflicted signals (6 good_fit + 6 poor_fit vs gold standard 3/2) |
| Abzan Houses | WBG | No raw_enrichment; 0 deck_links |
| Sultai Brood | BGU | No raw_enrichment; 0 deck_links |
| Temur Frontier | RGU | No raw_enrichment; 0 deck_links |
| Bant | GWU | Only 1 deck_link (gold standard = 3) |

### Tier 3 — Broken

Structurally deficient in ways that impair live placement quality.

| Faction | Key | Deficiency |
|---|---|---|
| Mardu Horde | RWB | 14 pos_terms but 0 good_fit_indicators — structural contradiction; most broken active faction |
| Yore-Tiller | UBRW | Empty placement_axes; over-suppressed (11-12 poor_fit vs gold standard 2-3) |
| Dune-Brood | BRGW | Empty placement_axes; over-suppressed |
| Glint-Eye | RGWU | Empty placement_axes; over-suppressed |
| Ink-Treader | GWUB (4c) | Empty placement_axes; over-suppressed |

---

## 3. Priority Queue for Next Session

1. **Mardu (VM-296 candidate)** — Most broken active faction. Has 14 pos_terms but 0 good_fit_indicators, which is a structural contradiction that prevents reliable placement. Research is fully on disk (`docs/research/mardu/`). Canon sources available. Target: full Tier 1 authoring pass.

2. **Yore / Dune / Glint / Ink** — All four have empty `placement_axes` and are over-suppressed (11-12 poor_fit_indicators vs gold standard 2-3). Each has a full research packet on disk. Order: Yore first (most complete research packet), then Dune, Glint, Ink.

3. **UR + RG mechanics field** — Quick targeted fix. Only the `identity.mechanics` prose field is empty. Everything else is gold-standard. One field per faction; approximately 10 minutes each.

4. **Lorehold** — Conflicted signals (6 good_fit + 6 poor_fit). Needs rebalancing toward gold standard (3 good_fit, 2-3 poor_fit). Also missing raw_enrichment.

5. **Abzan / Sultai / Temur** — All are functionally placeable but missing raw_enrichment and deck_links. Lower priority because placement signals are intact.

6. **Temur wording residual** — The test suite has an assertion failure: `expected blue-red-green, actual green-blue-red` in `test:placement`. Leave this for the dedicated Temur authoring pass — do not fix in isolation.

7. **WITCH-MF-002 (Atraxa / Hardened Scales Scryfall verification)** — Snippets 2 and 3 in the WITCH flavor entry (Atraxa, Praetors' Voice C16 and Hardened Scales KTK) need Scryfall confirmation. Low effort; can be done at any time.

---

## 4. Research Library Available On Disk

All research is already on disk at `C:\dev\mtgSiteWIP\docs\research\`. No web searches are needed for any priority queue item above.

### Mardu

- `docs/research/mardu/mardu-research-dossier.md` — primary dossier
- `docs/research/mardu/mardu-evidence-ledger.md` — evidence claims
- `docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md` — MaRo's official Mardu article
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md` — Tarkir lore

### Four-Color Factions (Yore, Dune, Glint, Ink)

- Each has a full research packet at `docs/research/yore/`, `docs/research/dune/`, `docs/research/glint/`, `docs/research/ink/`
- Canon inventory: `docs/research/canon/canon-inventory-four-color-reference-audit.md`

### MaRo Wedge/Shard Sources

- All 10 wedge and shard articles: `docs/research/canon/mark_rosewater_official_three_color/`
- Allied color pairings: `docs/research/canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md`
- Enemy color conflicts: `docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md`

### Vox Mana Color Bible and Placement Spec

- `docs/research/canon/misc/vox_mana_color_bible_placement_engine_spec.md`

### Tarkir Lore

- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md`

---

## 5. Gold Standard Reference

**Boros Legion (WR)** is the declared gold standard. All data-quality authoring passes use it as the structural baseline.

| Field | Gold Standard Value |
|---|---|
| `source_metadata.profile_version` | "2.0" |
| `source_metadata.claim_count` | 12 |
| `raw_enrichment` | Full block: key_figures, historical_timeline, canonical_flavor_text |
| `placement_axes.required_positive_evidence_terms` | 10 terms |
| `placement_axes.strengthens_when_user_centers` | 4 scenarios |
| `placement_axes.suppress_when_user_centers` | 5 scenarios |
| `placement_axes.false_positive_guardrail` | Full prose guardrail |
| `good_fit_indicators` | 3 real user-signal bullets (not frame-descriptions) |
| `poor_fit_indicators` | 2-3 targeted entries |
| `inhibitor_traps` | 3 targeted entries |
| `discriminator_questions` | 3 questions, each with: purpose, supports, weakens, collision_targets, evidence_claim_ids |
| flavor snippets | 3 faction-specific; minimum 10 words; confirmed card text |
| `deck_links` | 3 entries with verified commander/deck |
| `research_links.edhrec_slug` | Populated |
| `lore_summary` | Faction-voice placement copy (not encyclopedic) |
| `drawn_to` | 5 identity-specific items |
| `repelled_by` | 3 genuine identity markers (not scope guardrails) |
| `interview_tells` | 5 real user-behavior signals |

---

## 6. Data File Locations and Schema

### `data/factions.json`

Primary faction display data. Structure for each faction:

```
factions.FACTION_KEY
  key, name, lore_summary, philosophy
  affinity:
    drawn_to: []
    repelled_by: []
    interview_tells: []
  decree_voice, archetypes, staples, land_base
  research_links: { edhrec_slug: "" }
  deck_links: []
  raw_enrichment: { key_figures: [], historical_timeline: [], canonical_flavor_text: [] }
  identity, identity_blend
```

**IMPORTANT:** `factions.json` has BOTH a `factions.FACTION` root entry AND an `identity_layers.FACTION` display block. Both must be updated together when doing an authoring pass.

### `data/placement-model.json`

Placement scoring data. Path: `pm.factions.FACTION_KEY`. Structure:

```
identity:
  summary, philosophy, mechanics
placement_axes:
  required_positive_evidence_terms: []
  strengthens_when_user_centers: []
  suppress_when_user_centers: []
  false_positive_guardrail: ""
good_fit_indicators: []
poor_fit_indicators: []
inhibitor_traps: []
discriminator_questions: []
source_metadata:
  profile_version: ""
  claim_count: 0
```

### `data/archscry-flavor-snippets.json`

Flavor snippets for Archscry display. Path: `s.snippets.FACTION_KEY`. Per entry:

```
faction_key, card_name, flavor_excerpt, scryfall_uri, source_index, source_type
```

Each faction should have 3 entries. Snippets must be faction-specific (not generic Magic cards that happen to auto-match on word overlap).

---

## 7. Workflow Rules (from AGENTS.md)

For any non-trivial work, follow this sequence:

1. **Pre-flight review** — read HANDOFF_INDEX.md, relevant recent handoffs, board.md, related kanban cards
2. **Planning** — summarize what is known, risks, decisions already made
3. **Kanban update** — create or update the card before implementation
4. **Implementation** — make the data changes
5. **Testing** — run JSON parse validation after every file change
6. **Documentation update** — update relevant docs if affected
7. **Handoff report** — create handoff file, update HANDOFF_INDEX.md

### Every significant data change requires:

- A kanban card in `docs/kanban/done/VM-###-short-name.md` (use next available ID — currently VM-296)
- An update to `docs/kanban/board.md` (insert above prior Done card)
- A handoff file at `docs/handoffs/YYYY-MM-DD-HHMM-agent-name-short-task.md`
- An update to `docs/handoffs/HANDOFF_INDEX.md` (insert as new top row, above VM-295)

### JSON validation after every file edit:

```bash
node -e "require('./data/factions.json'); console.log('OK')"
node -e "require('./data/placement-model.json'); console.log('OK')"
node -e "require('./data/archscry-flavor-snippets.json'); console.log('OK')"
```

### Hard rules (from AGENTS.md):

- Do not invent MTG lore, card facts, commander facts, or project decisions
- Prefer canonical source JSON over generated JSON
- Do not directly edit generated files when source files should be updated
- Keep changes scoped
- Do not delete docs permanently — archive instead

---

## 8. Known Residuals — Do Not Touch

These are open issues that should NOT be addressed in passing. Each has a dedicated future pass.

| Residual | Source | Action |
|---|---|---|
| Temur wording assertion (`expected blue-red-green, actual green-blue-red`) in `test:placement` | VM-269 | Leave for dedicated Temur authoring pass |
| `assets/img/identity-hero/witch.webp` — file exists but is unused in the hero system | VM-293 | Separate cosmetic pass |
| Raw faction JSON at `data/raw-factions/` | General | Do not edit directly |
| Generated output files | General | Rebuild from source; do not edit directly |
| Ojutai / Dragonstorm material | JESKAI-EVID-012 | Never collapse into Khans-era Jeskai |
| WITCH-MF-002 (Atraxa + Hardened Scales flavor text Scryfall verification) | VM-295 | Separate low-effort verification pass |

---

## 9. Kanban State at Session End

**Next available VM ID:** VM-296

**Board:** `docs/kanban/board.md`

Done section top (most recent):
1. VM-295 — Witch Placement Data Quality Authoring Pass
2. VM-294 — Jeskai Placement Data Quality Authoring Pass
3. VM-293 — Witch Identity-Hero Background Dossier Hookup

**Backlog (active):**
- VM-236 — Sultai Live Copy Polish And Identity Display Repair
- VM-154 — Home Hero Horizontal Overflow Containment
- VM-006 through VM-010, VM-025 — various product features

No cards are currently In Progress, Ready, or Blocked.
