# Prompt: Lore Source Packet — Full Research Sequence

Use this prompt verbatim to produce a lore source packet for any three-color MTG faction. Fill in the substitution variables at the top before running.

---

## Substitution Variables

```
FACTION_NAME:       e.g. Sultai Brood
FACTION_SLUG:       e.g. sultai brood          (matches docs/research/ directory name)
FACTION_KEY:        e.g. SULTAI                (used for evidence row IDs)
COLOR_1:            e.g. Black
COLOR_2:            e.g. Green
COLOR_3:            e.g. Blue
COLOR_CODE:         e.g. BGU
CENTER_COLOR:       e.g. Black
PLANE:              e.g. Tarkir
PAIR_1:             e.g. dimir                 (two-color pair filename prefix, lowercase)
PAIR_2:             e.g. golgari
PAIR_3:             e.g. simic
ADJACENT_1:         e.g. Temur                 (shares two colors with target faction)
ADJACENT_2:         e.g. Abzan
WORLD_PROTOCOL:     e.g. Tarkir Clan Lore Dossier Protocol.md   (or Alara Shards Lore Dossier Protocol.rtf for Alara shards)
ABSENT_COLOR_1:     e.g. White
ABSENT_COLOR_2:     e.g. Red
JSONL_COLOR_1:      e.g. Black                 (as it appears in the "colors" field of the JSONL)
JSONL_COLOR_2:      e.g. Green
JSONL_COLOR_3:      e.g. Blue
JSONL_ABSENT_1:     e.g. White
JSONL_ABSENT_2:     e.g. Red
```

---

## Task

Produce a `{FACTION_SLUG}-lore-source-packet.md` for **{FACTION_NAME}** by executing every step of the research sequence below in order. Do not write any section of the packet until all reads and greps are complete. The output must be grounded in what was actually found in the corpus — not in prior knowledge.

---

## Step 1 — Scan the research directory for the target faction

```
Glob: docs/research/{FACTION_SLUG}/**/*
```

Read every file found. These are the richest single-faction sources and must be read before anything else.

---

## Step 2 — Read the canon audit hit register

```
Read: docs/research/canon/canon-inventory-three-color-reference-audit.md
```

Offset to the section that lists files hitting `{FACTION_KEY}`. Extract:
- The confirmed file list
- Each file's hit classification (primary identity source / lore dossier / support reference / incidental mention)
- Any notes about source reliability or tier

Use this list to prioritize subsequent reads and skip non-hitting files.

---

## Step 3 — Read the primary MaRo article

```
Read: docs/research/canon/mark_rosewater_official_three_color/{FACTION_NAME prefix}_*.md
```

Full read. This is Tier 1 canon and the philosophical foundation for the entire packet. Extract:
- Each color's self-introduction and stated philosophy
- How each color defines ruthlessness / the faction attribute
- Mechanical tools each color contributes
- Inter-color tensions within the faction
- Each color's one-sentence pitch for playing the faction
- Explicit statements about what {ABSENT_COLOR_1} and {ABSENT_COLOR_2} would add (even if framed as criticism)

Actual file: `docs/research/canon/mark_rosewater_official_three_color/`
Available files in that directory:
- `Abzan_We Will Survive _ MAGIC_ THE GATHERING.md`
- `Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md`
- `Esper_Striving For Perfection _ Magic_ The Gathering.md`
- `Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md`
- `Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md`
- `Jund_Following Your Heart _ MAGIC_ THE GATHERING.md`
- `Mardu_Finishing First _ MAGIC_ THE GATHERING.md`
- `Naya_Searching Within _ MAGIC_ THE GATHERING.md`
- `Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md`
- `Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md`

---

## Step 4 — Read all three two-color pair articles

```
Read: docs/research/canon/mark_rosewater_official_two_color/{PAIR_1}_*.md
Read: docs/research/canon/mark_rosewater_official_two_color/{PAIR_2}_*.md
Read: docs/research/canon/mark_rosewater_official_two_color/{PAIR_3}_*.md
```

Full reads. Extract only the passages relevant to how {COLOR_1}, {COLOR_2}, and {COLOR_3} relate to each other and what each pair achieves together. Note any tensions or synergies that directly illuminate the faction's identity.

Available files in `docs/research/canon/mark_rosewater_official_two_color/`:
- `azorius_Slow and Steady _ MAGIC_ THE GATHERING.md`
- `boros_Disorderly Conduct _ MAGIC_ THE GATHERING.md`
- `dimir_Pretty Sneaky Sis _ MAGIC_ THE GATHERING.md`
- `golgari_Life and Death _ MAGIC_ THE GATHERING.md`
- `gruul_Aaaargh!!! _ MAGIC_ THE GATHERING.md`
- `izzit_Creative Differences _ MAGIC_ THE GATHERING.md`
- `orzhov_Playing By Their Own Rules _ MAGIC_ THE GATHERING.md`
- `rakdos_Hedonism With Attitude _ MAGIC_ THE GATHERING.md`
- `selesnya_Group Think _ MAGIC_ THE GATHERING.md`
- `simic_Improving Upon Nature _ MAGIC_ THE GATHERING.md`

---

## Step 5 — Read the three mono-color philosophy podcasts

Read only the three relevant to the faction's colors:

```
Read: docs/research/canon/mark_rosewater_official_misc/{COLOR_1}_Philosophy_Drive_to_Work_Podcast_Transcript.md
Read: docs/research/canon/mark_rosewater_official_misc/{COLOR_2}_Philosophy_Drive_to_Work_Podcast_Transcript.md
Read: docs/research/canon/mark_rosewater_official_misc/{COLOR_3}_Philosophy_Drive_to_Work_Podcast_Transcript.md
```

Available files:
- `Black_Philosophy_Drive_to_Work_Podcast_Transcript.md`
- `Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md`
- `Green_Philosophy_Drive_to_Work_Podcast_Transcript.md`
- `Red_Philosophy_Drive_to_Work_Podcast_Transcript.md`
- `White_Philosophy_Drive_to_Work_Podcast_Transcript.md`

Extract: each color's core wants, fears, methods, and worldview. Note any passages that specifically describe what that color does when allied with the other faction colors, and what it thinks of {ABSENT_COLOR_1} and {ABSENT_COLOR_2}.

---

## Step 6 — Read the Allied and Enemy color pairings articles

```
Read: docs/research/canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md
Read: docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md
Read: docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Philosophy_Conflicts.md
```

Full reads. Extract only the sections covering:
- The three pairs present in the faction ({PAIR_1}, {PAIR_2}, {PAIR_3})
- The enemy-color conflicts involving {ABSENT_COLOR_1} and {ABSENT_COLOR_2}

---

## Step 7 — Read the adjacent faction MaRo articles

Adjacent factions share exactly two colors with the target faction.

```
Read: docs/research/canon/mark_rosewater_official_three_color/{ADJACENT_1}_*.md
Read: docs/research/canon/mark_rosewater_official_three_color/{ADJACENT_2}_*.md
```

Extract: how the shared two colors behave differently in those factions vs. in {FACTION_NAME}. These contrasts sharpen the separator language in the packet.

---

## Step 8 — Extract Commander records from JSONL

Run the following to extract exact BGU records with all fields:

```python
import json

faction_colors = ["{JSONL_COLOR_1}", "{JSONL_COLOR_2}", "{JSONL_COLOR_3}"]
absent_colors  = ["{JSONL_ABSENT_1}", "{JSONL_ABSENT_2}"]

with open("docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl") as f:
    records = [json.loads(line) for line in f]

results = []
for r in records:
    colors = r.get("colors", "")
    if all(c in colors for c in faction_colors) and not any(a in colors for a in absent_colors):
        results.append(r)

print(f"Total records: {len(results)}\n")
fields = [
    "deckName", "mainCommander", "theme", "primaryTheme", "secondaryTheme",
    "mainStrategy", "playstyleTags", "colorPhilosophySummary",
    "voxManaPlacementFit", "whatThisDeckTeachesAboutItsColors",
    "beginnerLesson", "strategyLesson", "recommendedFor", "notRecommendedFor",
    "mechanics", "creatureTypeFocus",
    "beginnerFriendly", "complexity", "politicalSocialPlay", "combatFocus",
    "comboPotential", "graveyardFocus", "tokenFocus", "artifactFocus",
    "enchantmentFocus", "spellslingerFocus", "rampFocus", "controlFocus",
    "aggression", "valueEngine"
]
for r in results:
    for f in fields:
        if f in r:
            print(f"{f}: {r[f]}")
    print("---")
```

Summarize: total record count, range of themes present, recurring playstyle tags, average focus scores, and any records where `colorPhilosophySummary` or `whatThisDeckTeachesAboutItsColors` contains notable faction-relevant language.

---

## Step 9 — Grep broad support docs for faction-specific passages

Do not read these files in full. Grep only.

```
Grep: docs/research/canon/misc/comprehensive-mtg-lore-history-updated.md
      pattern: {FACTION_KEY}|{COLOR_CODE}|{key figure 1}|{key figure 2}|{key mechanic}
      output_mode: content, -C 2, head_limit: 80

Grep: docs/research/canon/misc/vox_mana_comprehensive_analysis.md
      pattern: {FACTION_KEY}|{COLOR_CODE}
      output_mode: content, -C 3, head_limit: 80
```

---

## Step 10 — World codex (setting-specific)

**For Tarkir factions** (Abzan, Sultai, Temur, Jeskai, Mardu):
```
Read: docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md
```
Extract only the {FACTION_NAME} section.

**For Alara shards** (Bant, Esper, Grixis, Jund, Naya):
```
Grep: docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html
      pattern: {FACTION_KEY}|{COLOR_CODE}|{KeyFigure}|{KeyTerm}
      output_mode: content, -C 2, head_limit: 120
```

**For Ravnica guilds**: substitute the appropriate guild protocol or lore codex.

---

## Step 11 — Grep remaining broad support (skip if no hits)

```
Grep: docs/research/canon/misc/MTG_Lore_Research_Enhanced_Final.md
Grep: docs/research/canon/misc/MTG_Lore_Confidence_Tagged.txt
Grep: docs/research/canon/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md
Grep: docs/research/canon/colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md
Grep: docs/research/canon/colorless/source-material/combined_colorless.md
```

Pattern for all: `{FACTION_KEY}|{COLOR_CODE}|{key mechanic or figure}`
`output_mode: content, -C 2, head_limit: 60`
Skip any file that returns no hits.

---

## Synthesis Order

Execute all 11 steps above before writing any section. Then synthesize in this order:

1. **Packet Status** — from Steps 2, 8
2. **Tier Source List** — from all steps; classify every source read as Tier 1 / 1A / 2 / 2P / 3
3. **Authoring Evidence Floor** — promoted claim rows from Steps 3–7; support-only from Steps 8–11; manual-fill gaps from Step 1 and any unresolved topics
4. **Source Use Rules** — Promoted / Support-only / Manual-fill breakdown
5. **Architecture Use** — Do/Do Not guardrails
6. **{FACTION_NAME}-specific structural sections** — e.g. Timeline Boundary Guard for Tarkir clans with multiple timeline states; Shard Ecology for Alara; etc.
7. **Commander Support section** — from Step 8
8. **Verified-Language Guard** — safe vs. unsafe phrasings
9. **Manual-Fill Gate** — full deferred topic queue from all steps
10. **Downstream Readiness** — what is needed before runtime promotion

---

## Output File

```
docs/research/{FACTION_SLUG}/{FACTION_SLUG}-lore-source-packet.md
```

The packet is a research aid, not architecture evidence and not runtime authorization. It must explicitly state this in Section 1.

---

## Reference: Esper and Sultai packets

Completed packets for comparison:
- `docs/research/esper/esper-lore-source-packet.md` (VM-163A, Alara shard model)
- `docs/research/sultai brood/sultai-brood-lore-source-packet.md` (Tarkir clan model — note: produced without full sequence, treat as structural template only)
