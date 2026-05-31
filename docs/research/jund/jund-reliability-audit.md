# Jund Reliability Audit

**Faction:** Jund
**Plane:** Alara
**Date:** 2026-05-30
**Kanban Card:** VM-176

This audit records the reliability decisions behind the VM-176 Jund packet. It is meant to prevent seed material, generated HTML, broad color philosophy, or Commander/operator rows from becoming circular proof.

---

## Seed-File Defects

| Defect | Affected Material | VM-176 Handling |
|---|---|---|
| Stale VM-161 labels | `source-material/jund-lore-source-packet.unmanaged-vm161-seed.md` self-identifies as VM-161 material, but VM-161 is already a mana-base card. | Classified as seed/reference only. New packet uses VM-176. |
| Mojibake and capture defects | Seed packet and local source captures contain broken characters or encoding artifacts in places. | Do not copy defective text as clean evidence. Track source meaning conservatively. |
| External/community citation risk | Seed files refer to outside or community-style sources and uncaptured official leads. | Treat as discovery leads only until approved local source captures exist. |
| "absence of White and Green" typo | Seed packet contains the known typo where Jund's missing colors should not be stated as White and Green. | Recorded as defect. Approved packet uses White and Blue absence only at the BRG design level. |
| Over-promoted story claims | Seed files elevate geography, figures, devour ecology, Modern Jund culture, and generated dossier claims beyond current approved evidence. | Demoted to support-only or `Manual fill required` unless independently supported by approved source rows. |
| Generated HTML circularity | `source-material/jund_research_report.generated-seed.html` can look polished enough to imply authority. | Structure-only. It must not be used as canon evidence for Jund claims. |

---

## Source-Use Controls

- Tier 1 Jund-specific lore starts with `Jund_Following Your Heart`.
- Official Red/Black/Green, Rakdos/Golgari/Gruul, allied, and enemy color articles may support color philosophy and pair-overlap rows only.
- Those color articles do not independently prove Jund setting, creature, place, or story claims.
- Alara protocol/codex material is support-only until a claim is independently tied to an approved local official capture.
- Local Scryfall is card-data support only.
- Commander/operator rows are product support only.
- Generated HTML is structure-only.

---

## Commander Extraction Reliability

Commander/operator extraction must match exact color identity text or exact normalized color set equivalent to `Black; Red; Green`.

Forbidden extraction logic:

- Substring search for `BRG`.
- Regex partials that match larger color sets.
- "Contains Black, Red, and Green" logic that can include `UBRG` or `WUBRG`.
- Inclusion of two-color BR, RG, or BG rows.

Approved VM-176 support rows are exactly:

- Blight Curse
- World Shaper
- Graveyard Overdrive
- Nature's Vengeance
- Power Hungry
- Riveteers Rampage

These rows are not Jund canon evidence.

---

## Downgraded Claims

| Claim Type | Previous Seed Risk | VM-176 Classification |
|---|---|---|
| Jund geography and named locations | Seed material may imply full confidence. | `Manual fill required` |
| Named figure biography | Seed material may overstate Kresh, Meren, Rakka Mar, Karrthus, Sarkhan Vol, or other story roles. | `Manual fill required` unless separately card-data-only |
| Devour as total identity | Seed material may make mechanic equals metaphysics claims. | Support-only for specific card data; broader identity is `Manual fill required` |
| Modern Jund midrange | Seed material may treat player-culture shorthand as identity proof. | Boundary/manual-fill only |
| Riveteers and other BRG groups | Same-color direction may invite leakage. | Comparator/product support only |
| Broad color philosophy | Mono and two-color articles may be overused as Jund worldbuilding. | Color-philosophy support only |

---

## Anti-Bleed Checklist

Before any future Jund architecture or raw-faction phase, confirm:

- Jund is not Naya's communal/behemoth ecology.
- Jund is not Grixis's death, necromancy, vis, or survival-through-exploitation identity.
- Jund is not Gruul's civilization-rejection axis.
- Jund is not Rakdos's performance/cruelty axis.
- Jund is not Golgari's lifecycle/rot axis.
- Jund is not Witherbloom life-drain or pest ecology.
- Jund is not Riveteers labor/family identity.
- Jund is not generic Modern Jund midrange.

---

## No-Touch Confirmation

VM-176 is documentation-only. It must not change:

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- generated artifacts
- schemas
- Maze files
- route CSS/JS
- runtime code
- Home preview behavior
- generated data snapshots
- placement fixtures
- route maps
- browser bundles
- test fixture rewrites
