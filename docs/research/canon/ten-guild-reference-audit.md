# Ten-Guild (Ravnica) Reference Audit

Date: 2026-06-10

This audit scans `docs/research` for canonical material on the ten Ravnica guilds (the ten two-color pairs) and flags exact references to each. It is the companion to the mono-color, three-, four-, and five-color reference audits in this folder.

Flagged targets:

- Guilds: `Azorius`, `Dimir`, `Rakdos`, `Gruul`, `Selesnya` (allied pairs); `Orzhov`, `Izzet`, `Golgari`, `Boros`, `Simic` (enemy pairs)
- Framework terms: guild, two-color/dual-color, allied vs. enemy pair, guildmage, sigil, watermark

The ten guilds are the **complete set of two-color combinations** — 5 allied + 5 enemy. They are the most heavily built-out identity tier in the repo, each with a dedicated Vox Mana narrative taxonomy, structural matrix, translation layer, and animation spec.

This report is stored at the root of `docs/research/canon`; the canon source subtrees were read-only inputs and were not modified.

---

## Pre-flight context

- A Ravnican guild is framed as a **pragmatic, civic organization** that cooperates to build and run a metropolis (contrast: a Strixhaven college frames the same color pair as an academic *dialectic* — see `strixhaven-college-reference-audit.md`).
- Each guild = two mono-colors fused into an emergent third thing. Per the dedicated taxonomies, a guild is explicitly **"not merely [color]-[color] control/aggro"** — it is a specific synthesis (e.g., Azorius = "order as a civic machine," Golgari = "survival ecology," Dimir = "hidden information architecture").
- The ten guilds split by wheel position: **5 allied** (adjacent colors, cooperative friction) and **5 enemy** (opposed colors, productive tension). The 5 enemy guilds map one-to-one onto the 5 Strixhaven colleges.
- The Vox Mana taxonomies encode **anti-drift guardrails** — each guild explicitly distinguishes itself from its neighbors (Golgari's file alone names do-not-drift rules vs. Selesnya, Dimir, Orzhov, Simic, and Rakdos). This is a load-bearing feature of the placement system, not decoration.
- Canonical philosophy anchors come from Mark Rosewater's official two-color article series (`mark_rosewater_official_two_color/`), each guild titled with a one-line hook (Azorius "Slow and Steady," Rakdos "Hedonism With Attitude," etc.).

---

## Reference inventory

### Primary — Mark Rosewater official two-color articles (`canon/mark_rosewater_official_two_color/`)

All ten present and canonical:

| Guild | Article hook (filename) |
|---|---|
| Azorius | "Slow and Steady" |
| Boros | "Disorderly Conduct" |
| Dimir | "Pretty Sneaky Sis" |
| Golgari | "Life and Death" |
| Gruul | "Aaaargh!!!" |
| Izzet | "Creative Differences" |
| Orzhov | "Playing By Their Own Rules" |
| Rakdos | "Hedonism With Attitude" |
| Selesnya | "Group Think" |
| Simic | "Improving Upon Nature" |

### Primary — Vox Mana per-guild bundles (`canon/guilds/<guild>/`)

Each guild directory holds some combination of: narrative taxonomy, structural matrix (csv/json), translation-layer functions (js/json), animation spec, cards list, and a packaged `*_vox_mana_bundle.zip`. **Coverage is uneven** — flagged below:

| Guild | Pair | Align | Narrative taxonomy (.md) | Notes / gaps |
|---|---|---|---|---|
| Azorius | WU | Allied | ✅ `azorius_narrative_taxonomy.md` | Full set (matrix, translation, animation). |
| Dimir | UB | Allied | ✅ `dimir_narrative_taxonomy.md` | Full set. |
| Rakdos | BR | Allied | ✅ `rakdos-narrative-taxonomy.md` | Full set + manifest. |
| Gruul | RG | Allied | ✅ `gruul-narrative-taxonomy.md` | Full set + `gruul.md`. |
| Selesnya | GW | Allied | ❌ **Missing** | Only `narrative_taxonomy.json` + a **generic boilerplate** `translation_layer.txt` ("Author: Copilot," no Selesnya identity). **Real gap.** |
| Orzhov | WB | Enemy | ✅ `orzhov_narrative_taxonomy.md` | Full set. |
| Izzet | UR | Enemy | ❌ **Off-template** | `izzit_narrative_taxonomy.json` is an abstract "Izzit" narrative engine (roles like Foundation/Vacuum/Disruptor, card IDs "IZ-001") that **never encodes the blue-red guild identity**. Plus the `izzit` misspelling. **Real gap.** |
| Golgari | BG | Enemy | ✅ `golgari-narrative-taxonomy.md` | Full set + SOURCES.md. |
| Boros | RW | Enemy | ✅ Alt schema (`boros_research.md` + `boros_spec.md`) | **Complete, different format** — axiom/matrix/mechanic-primitive treatment, not a narrative taxonomy. Rich, not a gap. |
| Simic | GU | Enemy | ✅ `simic_narrative_taxonomy.md` | Full set + cards json. |

### Supporting

- `canon/guild_research/Ravnica Guild Dossier Protocol.rtf` — 6.6 MB capture (research protocol; too large to inline, holds raw guild source dumps).
- `wubrg/The Metaphysics of WUBRG, Guilds, and Colleges ...md` — consolidated synthesis with a per-guild Core Drive / Mechanical Translation / Key Signals table for all ten (also the primary Strixhaven source).
- `canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md`, `Enemy_Color_Conflicts_Explained.md` — the wheel relationships underlying allied vs. enemy guilds.

**Finding (revised after reading the dedicated files):** the guild tier is the repo's most developed — **eight of ten** guilds have full identity content (seven via `*_narrative_taxonomy.md`; **Boros** via a complete-but-different axiom/matrix/primitive treatment in `boros_research.md` + `boros_spec.md`). **Two are genuine gaps:**
- **Selesnya** has no identity document at all — only a structural json and a *generic boilerplate* `translation_layer.txt` (authored "by Copilot," all four classes are reusable scaffolding with no Selesnya-specific narrative).
- **Izzet's** `izzit_narrative_taxonomy.json` is **off-template**: an abstract narrative engine ("Izzit," roles Foundation/Vacuum/Disruptor/Apex, card IDs "IZ-001," tension "Constraint vs. Dissolution") that does not encode the actual blue-red spellslinger/epiphany identity, and carries the `izzit` misspelling throughout.

Both are worth a dedicated VM card. Boros is **not** a gap (my earlier note was wrong before reading the files) — but it is schema-inconsistent with the other nine, which is itself worth a normalization card if the placement engine expects a uniform taxonomy shape.

---

## The Ten Guilds (10)

### Allied pairs (5)

#### Azorius Senate — {W}{U} (allied)
- **Core drive:** Governed possibility — *"Nothing should move faster than the law can understand, classify, and permit."* (`azorius_narrative_taxonomy.md`)
- **Mechanical identity:** Control & Stax — detain, tap, bounce, counters, taxes, attack restrictions, alternate win by procedure.
- **Vox Mana axes:** Legislation, Enforcement, Adjudication, Bureaucracy, Surveillance, Precedent, Sky Authority, Civic Protection.
- **Shadow:** Rigidity, procedural cruelty, mistaking compliance for justice. **MaRo hook:** "Slow and Steady."

#### House Dimir — {U}{B} (allied)
- **Core drive:** *"Information is power only after it has been hidden, stolen, reshaped, and used before anyone knows who moved it."* (`dimir_narrative_taxonomy.md`)
- **Mechanical identity:** Mill, saboteur, theft, surveil, hand disruption, evasive agents, counterintelligence.
- **Vox Mana axes:** Secrecy, Surveillance, Infiltration, Memory Erasure, Identity Theft, Counterintelligence, Covert Accretion.
- **Shadow:** Paranoia, manipulation for its own sake, trust made impossible. **MaRo hook:** "Pretty Sneaky Sis."

#### Cult of Rakdos — {B}{R} (allied)
- **Core drive:** *"The cleanest truth arrives when restraint fails in public."* Performance under pressure — pain creates permission. (`rakdos-narrative-taxonomy.md`)
- **Mechanical identity:** Spectacle/damage gates, aggro-sacrifice, burn, unleash, discard, treasure-after-death, haste.
- **Vox Mana taxa:** Spectacle, Appetite, Unleash, Sacrifice, Discard, Punishment, Carnival, Demonic Patronage, Momentum, Resource Fire.
- **Shadow:** Generic "evil chaos" (the file explicitly guards against this). **MaRo hook:** "Hedonism With Attitude."

#### Gruul Clans — {R}{G} (allied)
- **Core drive:** Liberation through the destruction of artificial constraints — primal physical dominance over machine-like setups.
- **Mechanical identity:** Stompy / midrange aggro — haste, trample, "can't be countered," fast heavy bodies that bypass complex engines.
- **Shadow:** Mindless rage without purpose. **MaRo hook:** "Aaaargh!!!" (dedicated `gruul-narrative-taxonomy.md` present.)

#### Selesnya Conclave — {G}{W} (allied)
- **Core drive:** Harmonious unity through the erasure of the individual ego — the organic collective.
- **Mechanical identity:** Go-wide tokens & anthems — a dense, mutually-reinforcing board; lifegain stabilization; populate. (Effect vocabulary confirmed only indirectly, via the boilerplate translation layer: buff, lifelink, vigilance, trample, token, populate.)
- **Shadow:** Conformity; the collective swallowing the self. **MaRo hook:** "Group Think."
- **⚠️ Gap:** no narrative taxonomy exists — the only "Selesnya" file with prose is a generic Python `translation_layer.txt`. The core-drive and shadow lines above come from the consolidated doc + MaRo, not a dedicated Selesnya identity document.

### Enemy pairs (5) — these map onto the 5 Strixhaven colleges

#### Orzhov Syndicate — {W}{B} (enemy) ↔ Silverquill
- **Core drive:** Wealth and dominion through ritual hierarchy and transactional obligation — debt, contract, spiritual economy.
- **Mechanical identity:** Bleed & drain (Extort), graveyard recursion, exile-based removal, slow attrition.
- **Shadow:** Exploitation dressed as piety. **MaRo hook:** "Playing By Their Own Rules."

#### Izzet League — {U}{R} (enemy) ↔ Prismari
- **Core drive:** Epiphany through reckless, hyper-accelerated experimentation.
- **Mechanical identity:** Spellslinger & tempo — chaining cheap instants/sorceries, copying spells, explosive multi-spell turns.
- **Shadow:** Volatility without follow-through. **MaRo hook:** "Creative Differences."
- **⚠️ Gap:** the file named `izzit_narrative_taxonomy.json` does **not** describe the Izzet League — it is an abstract, color-agnostic narrative system ("Izzit," roles Foundation/Vacuum/Disruptor/.../Apex, domain mythologies, arc structures, card IDs "IZ-001"). It never references blue-red, spellcasting, or Niv-Mizzet. The identity above is sourced from the consolidated doc + MaRo, not this file. Also carries the `izzit` misspelling.

#### Golgari Swarm — {B}{G} (enemy) ↔ Witherbloom
- **Core drive:** *"Nothing is wasted; endings are inventory."* Survival ecology — decay as infrastructure. (`golgari-narrative-taxonomy.md`)
- **Mechanical identity:** Graveyard midrange — self-mill, dredge, recursion, sacrifice, +1/+1 counter inheritance, attrition removal.
- **Vox Mana roles:** Rot-Farmer, Grave-Keeper, Scar-Inheritor, Swarm-Mother, Undercity Regent, Patient Infection, Lich Accountant.
- **Shadow:** "Death cult / zombie horde" cliché (file guards against it). **MaRo hook:** "Life and Death."

#### Boros Legion — {R}{W} (enemy) ↔ Lorehold
- **Core drive:** Justice enforced through overwhelming tactical force. Per `boros_research.md`, four axioms: **Protection** ("force is morally licensed when it preserves the innocent or order"), **Momentum** ("action generates further action"), **Collective Agency** ("group formation multiplies individual potency"), **Resilience** ("righteous systems persist under attrition").
- **Mechanical identity:** Fast, linear aggro — coordinated multi-creature attacks and combat-phase triggers. Mechanic primitives: Battalion (collective threshold), Mentor (hierarchical propagation), Radiance (field diffusion), ExtraCombat (temporal multiplication), HardinessFlag (indestructible/redirect).
- **Vox Mana matrix axes:** Agency (collective/hierarchical), Ethic (protective retribution), Energy (momentum/cascading), Form (regimented), Durability (redundant resilience), Propagation (radiant). **Archetypes:** Paladin, Drill Sergeant, Vanguard, Reckoner.
- **Shadow:** Zealotry; force mistaken for righteousness. **MaRo hook:** "Disorderly Conduct."
- **Schema note:** Boros uses a research/spec + matrix format rather than the `*_narrative_taxonomy.md` shape of the other developed guilds — complete content, inconsistent container.

#### Simic Combine — {G}{U} (enemy) ↔ Quandrix
- **Core drive:** *"Life is not a fixed state... knowledge becomes ethical when it helps the organism adapt before collapse."* (`simic_narrative_taxonomy.md`)
- **Mechanical identity:** Ramp & +1/+1 counter engines — evolve, adapt, graft, hybrid Krasis bodies, mana/draw compounding.
- **Vox Mana taxa:** Biomancer, Krasis, Cytoplast Network, Evolve Ladder, Adapt Threshold, Zonot, Speaker, Growth Engine, Protective Membrane, Ethical Fault Line.
- **Shadow:** Improvement curdling into control without consent (the "Ethical Fault Line"). **MaRo hook:** "Improving Upon Nature."

---

## Quick reference table

| Guild | Code | Align | Core synthesis | Playstyle | MaRo hook | Strixhaven parallel |
|---|---|---|---|---|---|---|
| Azorius | WU | Allied | Order as a civic machine | Control & Stax | Slow and Steady | — |
| Dimir | UB | Allied | Hidden information architecture | Mill / saboteur / theft | Pretty Sneaky Sis | — |
| Rakdos | BR | Allied | Performance under pressure | Aggro-sacrifice & burn | Hedonism With Attitude | — |
| Gruul | RG | Allied | Liberation from constraint | Stompy / midrange aggro | Aaaargh!!! | — |
| Selesnya | GW | Allied | The organic collective | Go-wide tokens & anthems | Group Think | — |
| Orzhov | WB | Enemy | Transactional dominion | Bleed & drain (Extort) | Playing By Their Own Rules | Silverquill |
| Izzet | UR | Enemy | Reckless epiphany | Spellslinger & tempo | Creative Differences | Prismari |
| Golgari | BG | Enemy | Survival ecology | Graveyard midrange | Life and Death | Witherbloom |
| Boros | RW | Enemy | Tactical justice | Fast linear aggro | Disorderly Conduct | Lorehold |
| Simic | GU | Enemy | Adaptive optimization | Ramp & counter engines | Improving Upon Nature | Quandrix |

---

## Notes and boundaries

- **Guilds are syntheses, not sums.** Every dedicated taxonomy opens by rejecting the naive "just [color]-[color] goodstuff" read. Placement copy should lead with the synthesis (e.g., "civic machine," "survival ecology"), not the color pair.
- **Anti-drift is the system's spine.** The guardrails separating each guild from its neighbors are load-bearing. The enemy guilds especially must stay distinct from their Strixhaven twins (Golgari ≠ Witherbloom, Boros ≠ Lorehold, etc.) — see the Strixhaven audit.
- **Inventory gaps to flag (candidate VM cards), after reading every guild's dedicated files:**
  - **Selesnya — missing identity content.** Only a structural json and a generic boilerplate `translation_layer.txt`. Needs a real narrative taxonomy authored from scratch.
  - **Izzet — wrong content.** `izzit_narrative_taxonomy.json` is an abstract off-template system that never describes the blue-red guild; effectively Izzet has no usable taxonomy. Needs authoring + the `izzit→izzet` rename.
  - **Boros — schema normalization (lower priority).** Content is complete but lives in a research/spec+matrix format unlike the other nine; normalize if the engine expects uniform taxonomy shape.
  - The other seven guilds (Azorius, Dimir, Rakdos, Gruul, Golgari, Orzhov, Simic) are fully covered with consistent narrative taxonomies.
- **Canonical vs. synthesis.** MaRo article hooks and the color-pair philosophies are confirmed canon; the Vox Mana axes/roles/taxa are internal synthesis layers built on top — accurate to the product, but not WotC lore.
