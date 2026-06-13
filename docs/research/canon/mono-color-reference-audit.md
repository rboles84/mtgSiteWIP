# Mono-Color Reference Audit

Date: 2026-06-10

This audit scans `docs/research` for canonical mono-color (single-color) identity material and flags exact references to the five mono-color targets. It is the companion to the existing `canon-inventory-three-color-reference-audit.md`, `canon-inventory-four-color-reference-audit.md`, and `five-color-reference-audit.md`.

Flagged targets:

- Colors: `White` ({W}), `Blue` ({U}), `Black` ({B}), `Red` ({R}), `Green` ({G})
- Framework terms: `color pie`, `color wheel`, `ends through means`, allied / enemy pairings, mono-color

The five mono-colors are the **atoms** of the entire identity system: every guild, shard, wedge, four-color, and five-color identity in the other audits is a synthesis of these. This report therefore doubles as the philosophical baseline the multicolor audits build on.

This report is stored at the root of `docs/research/canon`; the canon source subtrees were read-only inputs and were not modified.

---

## Pre-flight context

- Each color is defined by an "ends **through** means" paradigm formalized by Mark Rosewater — a thesis about how the universe *should* work, plus the means it will use to get there.
- The colors sit on a wheel. Each color has **two allies** (adjacent) and **two enemies** (across). Allied tension is cooperative friction; enemy tension is fundamental disagreement. This wheel is the substrate for all the guild and Strixhaven pairings.
- Color identity is enforced through **mechanical signatures** — what each color *can* and *cannot* do. The weaknesses are as defining as the strengths (Rosewater: the color pie matters because it *creates restrictions, defines flavor, creates balance, and adds personality* — see `Why_Color_Pie_Matters_Design_Philosophy.md`).
- Mono-color is not "less than" multicolor. It is the **purest** expression of a single philosophy, undiluted by compromise. Old Phyrexia under Yawgmoth (mono-Black) is the canonical example of a single color taken to its absolute logical extreme.
- The five Phyrexian Praetors (Elesh Norn/W, Jin-Gitaxias/U, Sheoldred/B, Urabrask/R, Vorinclex/G) are each a mono-color virtue *twisted into tyranny* — a useful shadow-reading of each color's failure mode.

---

## Reference inventory

The richest mono-color sources in `docs/research`, by cluster:

### Primary — Mark Rosewater official (`canon/mark_rosewater_official_misc/`)

| File | Relevance |
|---|---|
| `White_Philosophy_Drive_to_Work_Podcast_Transcript.md` | **Primary.** Canonical mono-White philosophy. |
| `Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md` | **Primary.** Canonical mono-Blue philosophy. |
| `Black_Philosophy_Drive_to_Work_Podcast_Transcript.md` | **Primary.** Canonical mono-Black philosophy. |
| `Red_Philosophy_Drive_to_Work_Podcast_Transcript.md` | **Primary.** Canonical mono-Red philosophy. |
| `Green_Philosophy_Drive_to_Work_Podcast_Transcript.md` | **Primary.** Canonical mono-Green philosophy. |
| `Why_Color_Pie_Matters_Design_Philosophy.md` | Why the five-color framework exists (restrictions, flavor, balance, personality). |
| `Allied_Color_Pairings_Explained.md` / `IM_Conversations_with_Colors_Allied_Week.md` | Allied-pair relationships per color. |
| `Enemy_Color_Conflicts_Explained.md` / `Enemy_Color_Philosophy_Conflicts.md` | Enemy-pair conflicts per color. |
| `Colors_Answer_Questions_Mailbag_2018.md` / `..._2019.md` | Q&A clarifications on each color's boundaries. |
| `Flavor_vs_Function_in_Magic_Design.md` | How flavor dictates each color's mechanics. |

### Supporting — color-pie analysis (`canon/misc/`, `colorless/source-material/`)

| File | Relevance |
|---|---|
| `canon/misc/Deep_Dive_MTG_Color_Pie_Research.md` | Deep-dive per-color analysis. |
| `canon/misc/mechanical-color-pie-2017.md` | Mechanical (not just flavor) color-pie reference. |
| `canon/misc/colorMTG.txt` | Comprehensive Rules 105.x; per-color philosophy summaries. |
| `canon/misc/vox_mana_color_bible_placement_engine_spec.md` | Vox Mana's own per-color placement model. |
| `canon/misc/vox_mana_comprehensive_analysis.md` | Cross-color synthesis. |
| `canon/misc/Archscry Architecture_ Mono Color Integration.rtf` | **Vox Mana product spec** for integrating mono-color into Archscry. |
| `colorless/source-material/06_Color_Pie_Framework_and_Philosophy.md` | Framework + philosophy reference. |
| `colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md` | Ally/enemy dynamics. |
| `wubrg/The Metaphysics of WUBRG, Guilds, and Colleges ...md` | Consolidated mono → guild → college synthesis (also the primary guild/Strixhaven source). |

**Finding:** mono-color is the **best-sourced** identity tier in the repo — five dedicated MaRo philosophy transcripts plus the full allied/enemy article set, corroborated by multiple internal color-pie analyses. No manual-fill gaps at the mono tier.

---

## The Five Mono-Colors (5)

### {W} White — Peace through Order

**Thesis:** Suffering can be eradicated if individuals subordinate themselves to a just structure. White believes in community, morality, law, and the greater good — the group over the self.

**Mechanical identity:** Board wipes, mass removal of attackers, exile of nonland permanents, lifegain, protection, taxes and rules-setting enchantments, and uniform armies of small tokens. White's signature weakness is raw card advantage and reach.

**Allies:** Blue (order through knowledge), Green (order through nature). **Enemies:** Black (selflessness vs. selfishness), Red (structure vs. freedom).

**Shadow / failure mode:** Authoritarianism. Order calcified into oppression — Elesh Norn's Machine Orthodoxy, where individuality itself becomes a sin to be flayed away.

**Symbol:** The sun, the shield wall, the uniform rank — peace enforced from above.

---

### {U} Blue — Perfection through Knowledge

**Thesis:** The mind is a blank slate that can be perfected through study, patience, and information. Blue believes in deliberation over impulse and that any problem yields to enough knowledge.

**Mechanical identity:** Counterspells, card draw, bounce, tempo manipulation, scry/filter, theft, and artifact synergy. Blue can answer any *spell* but historically cannot destroy permanents — its defining weakness.

**Allies:** White (knowledge serving order), Black (knowledge serving power). **Enemies:** Red (head vs. heart), Green (nurture vs. nature).

**Shadow / failure mode:** Paralysis and control without limit — Jin-Gitaxias's Progress Engine, knowledge stripped of ethics into endless industrial vivisection.

**Symbol:** The eye, the open book, the still water — the patient observer who acts only when certain.

---

### {B} Black — Power through Opportunity

**Thesis:** The world is an amoral, social-Darwinist competition; power is the only true security and the individual's free will is paramount. Black pays any cost and recognizes no limit it did not choose.

**Mechanical identity:** Sacrifice, death and reanimation, hand disruption (discard), unconditional tutors, life-for-resource conversion, and drain. Black can do almost anything — for a price — but struggles with enchantments and artifacts.

**Allies:** Blue (power through knowledge), Red (power through passion). **Enemies:** White (self vs. group), Green (ambition vs. natural acceptance).

**Shadow / failure mode:** Self-consuming ruthlessness — Sheoldred's Seven Steel Thanes, opportunity magnified into absolute domination where the weak exist only to be harvested. Old Phyrexia/Yawgmoth is mono-Black at its terminal extreme.

**Symbol:** The skull, the ledger of debts, the rising corpse — ambition that accepts no boundary.

---

### {R} Red — Freedom through Action

**Thesis:** Emotion and impulse are the truest guides; structures and long-term plans are cages. Red acts now, feels fully, and values authenticity and freedom above safety.

**Mechanical identity:** Direct damage (burn), haste, aggression, impulsive/temporary card advantage, rituals and Treasure acceleration, and chaos effects. Red has explosive early power but no sustained late-game card advantage — its defining weakness.

**Allies:** Black (freedom through power), Green (freedom through instinct). **Enemies:** White (freedom vs. order), Blue (heart vs. head).

**Shadow / failure mode:** Self-destruction and burnout — or, inverted, Urabrask's Quiet Furnace: passion walled off into isolationist industry.

**Symbol:** The flame, the lightning bolt, the open road — the heart that refuses to be governed.

---

### {G} Green — Growth through Acceptance

**Thesis:** The natural order is wise; the world is an interconnected living web that should be accepted and grown within rather than overwritten. Green trusts instinct, destiny, and biological interdependence.

**Mechanical identity:** Mana acceleration (ramp), the largest creature bodies, fight effects, +1/+1 counters, and destruction of the "unnatural" (artifacts and enchantments). Green has overwhelming physical scale but lacks evasion, removal flexibility, and card selection.

**Allies:** Red (instinct and freedom), White (natural order). **Enemies:** Blue (nature vs. nurture), Black (acceptance vs. ambition).

**Shadow / failure mode:** Stagnation, or apex-predation — Vorinclex's Vicious Swarm, the natural order stripped of balance into pure survival-of-the-fittest.

**Symbol:** The tree, the beast, the unbroken forest — strength that grows rather than builds.

---

## Quick reference table

| Color | Code | Ends through Means | Allies | Enemies | Mechanical signature | Shadow (Praetor) |
|---|---|---|---|---|---|---|
| White | {W} | Peace through order | Blue, Green | Black, Red | Wraths, tokens, lifegain, taxes, exile | Authoritarian fascism (Elesh Norn) |
| Blue | {U} | Perfection through knowledge | White, Black | Red, Green | Counters, draw, bounce, tempo | Soulless vivisection (Jin-Gitaxias) |
| Black | {B} | Power through opportunity | Blue, Red | White, Green | Sacrifice, reanimation, discard, drain | Absolute domination (Sheoldred) |
| Red | {R} | Freedom through action | Black, Green | White, Blue | Burn, haste, rituals, impulse, chaos | Isolationist industry (Urabrask) |
| Green | {G} | Growth through acceptance | Red, White | Blue, Black | Ramp, big creatures, fight, counters | Apex predation (Vorinclex) |

### Allied vs. enemy pairs (bridge to the guild & Strixhaven audits)

| Allied pairs (Ravnica guilds) | Enemy pairs (Ravnica guilds = Strixhaven colleges) |
|---|---|
| WU Azorius · UB Dimir · BR Rakdos · RG Gruul · GW Selesnya | WB Orzhov/Silverquill · UR Izzet/Prismari · BG Golgari/Witherbloom · RW Boros/Lorehold · GU Simic/Quandrix |

---

## Notes and boundaries

- **Mono-color is canon-dense, not interpretive.** Each "ends through means" line is a Rosewater formalization, not a synthesis. Treat these as confirmed.
- **The wheel is the key.** Every higher audit (guild, shard, wedge, 4C, 5C) is a *combination* of these five atoms; the allied/enemy structure here is what makes those combinations cooperative or dialectical.
- **Praetor shadow-readings are a lens, not a definition.** A mono-White identity is not Elesh Norn; the Praetor names the *failure mode* of the virtue, useful for placement-page "shadow expression" copy.
- **Vox Mana application.** `Archscry Architecture_ Mono Color Integration.rtf` and `vox_mana_color_bible_placement_engine_spec.md` are the product-side specs for how these five baselines feed the placement engine — start there for implementation rather than re-deriving philosophy.
