# SIRF Wedge Wave 07 — Completion Report

## Status

**ACCEPTED — EXCEPTION-BASED WAVE COMPLETE**

Abzan, Jeskai, Mardu, and Sultai converged in one repair cycle each. No P0–P3 finding remains open, authored-to-generated freshness is proven, every official Tarkir Native relationship reproduces normally, and every required target/control render passes.

## Totals

| Identity / scope | Cycles | P0 | P1 | P2 | P3 | Final disposition |
|---|---:|---:|---:|---:|---:|---|
| Abzan | 1 | 1 | 1 | 2 | 1 | PASS |
| Jeskai | 1 | 1 | 1 | 2 | 1 | PASS; warning exception recorded |
| Mardu | 1 | 1 | 1 | 3 | 1 | PASS; warning exception recorded |
| Sultai | 1 | 1 | 1 | 2 | 1 | PASS |
| **Wave** | **4 identity-cycles** | **4** | **4** | **9** | **4** | **all resolved** |

## Findings, owners, and repairs

| Scope | Finding | Severity | Root cause / owner | Repair | Protection |
|---|---|---:|---|---|---|
| All four — What to Look For | Twelve lanes cited generated `data/factions.json` | P0 | Authored dossier-source provenance | Rebound every lane to an existing certified raw claim with `certified_claim_translation` | Focused test resolves every locator and rejects generated evidence |
| All four — Precon Starting Points | Official Tarkir products lacked complete Native reproduction and featured-commander separation | P1 | Canonical precon provider records plus shared active-key allowlist/schema | Set official Wizards source, preserved face commander, added the official featured commander as alternate, added one explicit faction ref, extended the shared allowlist, rebuilt catalog/schema | Source/catalog equality, provider 155/155, actual Native card, and exact group order |
| All four — Start Here / What to Look For | Fallback or legacy lanes disagreed with the curated taxonomy | P2 | Identity guidance lacked curated directions | Installed exact ordered three-lane sets in `COMMANDER_FACTION_GUIDANCE` | Exact set/order equality rejects omissions and extras |
| All four — Start Here / How This Plays | Wedge Spellcraft repeated mechanics instead of owning construction choice | P2 | Identity guidance copy | Recast Spellcraft as a build-choice prompt; retained sequencing/table pressure in How This Plays | Role matrices and Jaccard gate |
| Mardu | Frozen VM-595 candidate crossed the `.38` detector threshold | P2 | Repeated charge/momentum claim across sections | Separated construction choice, semantic boundary, table behavior, product comparison, and recognition | `.6250 / 1` → `.2375 / 0` |
| All four — Test the Fit | Indirect negative-boundary grammar obscured false positives | P3 | Authored dossier copy | Recast each as a direct `X is not yet this identity; look for Y` boundary | Focused grammar checks |

## Identity-specific fixes and final taxonomies

| Identity | Accepted rendered set | Identity-specific boundary/result |
|---|---|---|
| Abzan | Family Endurance; Ancestor Obligation; Perennial Defense | Generic toughness, counters, recursion, or same-color value is excluded without White-led house continuity and responsibility across generations |
| Jeskai | Disciplined Tempo; Cunning In Motion; Monastery Practice | Prowess, spells, monks, control, and tempo alone are excluded without Blue-led training that turns insight into disciplined action |
| Mardu | Raid Momentum; War-Name Oath; Ruthless Opening | Aggro, Warriors, tokens, sacrifice, and pressure alone are excluded without Red-led commitment shaped by martial identity and coordinated timing |
| Sultai | Resource Conversion; Necromantic Utility; Calculated Ruthlessness | Graveyard, ramp, control, poison, and value alone are excluded without Black-led opportunism that plans how costs become leverage |

For every row, `accepted rendered set = actual Start Here set = actual What to Look For set`; required items are present, legacy/unapproved items are absent, and order passes.

## Shared fixes

- Reused the shared curated-directions path with four identity-owned `starterDirections` entries.
- Repaired twelve source locators and four scoped section compositions in the authored dossier source, then regenerated the catalog.
- Extended the canonical precon active-key allowlist and source/generated schemas once for all four wedges.
- Repaired the four authored Tarkir records at their provider owner, then rebuilt the generated catalog; no generated artifact was manually edited.
- Advanced only the existing Placement presentation invariants that pin the changed Start Here output; 37/37 Placement goldens remain unchanged.
- Did not add identity-specific renderer/filter workarounds, suppress warnings, or edit raw Placement.

## Mandatory Cross-Section Redundancy Gate

### Abzan

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a construction lane | Center family endurance, ancestor obligation, or perennial defense | Choose which continuity engine the deck protects | PASS — construction choice |
| Test the Fit | Establish fit, tension, and false-positive boundary | House continuity and responsibility distinguish Abzan from mechanics or colors alone | Decide whether the desired deck actually expresses Abzan | PASS — semantic boundary |
| How This Plays | Describe sequencing and opponent pressure | A protected engine turns each survived exchange into future value | Decide when to answer a patient board | PASS — table behavior |
| Precon Starting Points | Compare governed products | Abzan Armor is the official Native defender/toughness entry; other exact products offer different plans | Choose a product by verified plan and relationship | PASS — product facts |
| What to Look For | Recognize lane signals | Family, ancestor, and perennial-defense signals identify the chosen line | Recognize packages that carry the taxonomy | PASS — recognition task |

### Jeskai

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a construction lane | Center disciplined tempo, cunning in motion, or monastery practice | Choose which held resource turns preparation into action | PASS — construction choice |
| Test the Fit | Establish fit, tension, and false-positive boundary | Blue-led training and restraint distinguish Jeskai from generic spell or martial decks | Decide whether timing serves trained action rather than delay | PASS — semantic boundary |
| How This Plays | Describe sequencing and opponent pressure | The pilot tests timing, protects a stance, and commits precisely | Understand the uncertainty created by held resources | PASS — table behavior |
| Precon Starting Points | Compare governed products | Jeskai Striker is the official Native spell-sequencing entry; exact products span several plans | Select a product by verified commander and plan | PASS — product facts |
| What to Look For | Recognize lane signals | Tempo, cunning, and practice signals identify the three lanes | Recognize when table actions carry Jeskai training | PASS — recognition task |

### Mardu

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a construction lane | Center raid momentum, a war-name oath, or a ruthless opening | Choose what the deck spends to keep commitment moving | PASS — construction choice |
| Test the Fit | Establish fit, tension, and false-positive boundary | Martial identity, oath, and timing distinguish Mardu from generic aggression | Decide whether early pressure has a disciplined commitment | PASS — semantic boundary |
| How This Plays | Describe sequencing and opponent pressure | A named line commits early and spends resources only to preserve the raid | Understand when to answer before momentum closes the opening | PASS — table behavior |
| Precon Starting Points | Compare governed products | Mardu Surge is the official Native attacking-token/sacrifice entry; exact products offer distinct pressure plans | Select a product without inferring identity from color alone | PASS — product facts |
| What to Look For | Recognize lane signals | Raid, oath, and ruthless-opening signals identify the lanes | Recognize commitment rather than generic combat volume | PASS — recognition task |

### Sultai

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a construction lane | Center resource conversion, necromantic utility, or calculated ruthlessness | Choose what expendable material pays for advantage | PASS — construction choice |
| Test the Fit | Establish fit, tension, and false-positive boundary | Planned Black-led opportunism distinguishes Sultai from generic value | Decide whether each cost is being turned into leverage | PASS — semantic boundary |
| How This Plays | Describe sequencing and opponent pressure | Several expendable resources conceal which conversion matters | Understand which resource engine opponents must disrupt | PASS — table behavior |
| Precon Starting Points | Compare governed products | Sultai Arisen is the official Native graveyard entry; exact products offer other conversion plans | Select a product by verified facts | PASS — product facts |
| What to Look For | Recognize lane signals | Conversion, necromancy, and calculated ruthlessness identify the lanes | Recognize packages that turn costs into leverage | PASS — recognition task |

No pair of scoped sections communicates substantially the same claim for the same purpose.

## Precon relationship results

| Identity | Native — face / featured alternate | Exact-color | Stretch | Ordering / exclusivity |
|---|---|---|---|---|
| Abzan | Abzan Armor — Felothar the Steadfast / Betor, Ancestor's Voice | Enduring Enchantments; Food and Fellowship; Counterpunch; Symbiotic Swarm; Corrupting Influence | Open Hostility; Breed Lethality | Native → Exact → Stretch; PASS |
| Jeskai | Jeskai Striker — Shiko and Narset, Unified / Elsha, Threefold Master | Family Matters; Creative Energy; Science!; Mystic Intellect; Timeless Wisdom; Riders of Rohan; Divine Convocation; Counter Intelligence; Planeswalker Party; Political Puppets; Timey-Wimey | Stalwart Unity; Invent Superiority | Native → Exact → Stretch; PASS |
| Mardu | Mardu Surge — Zurgo Stormrender / Neriv, Crackling Vanguard | Most Wanted; Revival Trance; Hail, Caesar; Vampiric Bloodlust; Heavenly Inferno; Ruthless Regiment; Legends' Legacy | Open Hostility; Invent Superiority | Native → Exact → Stretch; PASS |
| Sultai | Sultai Arisen — Kotis, Sibsig Champion / Teval, the Balanced Scale | Devour for Power; Grand Larceny; Faceless Menace; Mutant Menace; Enhanced Evolution | Breed Lethality; Entropic Uprising | Native → Exact → Stretch; PASS |

All four authored and generated records use `https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists`. Every product occurs in one group; the actual Native card names only the face commander.

## Jeskai / Mardu guardrail-warning disposition

| Identity | Exact owner | Fresh semantic review | Affected SIRF surfaces | Disposition |
|---|---|---|---|---|
| Jeskai | `scripts/build/build-faction-artifacts.mjs#BIOLOGICAL_PRIORS.JESKAI` | “trained insight … move” remains consistent with `jeskai_claim_0002` and `jeskai_claim_0003` | none | `VALID_ARCHITECTURE_EXCEPTION_OUTSIDE_SCOPED_SURFACES`; warning retained, raw Placement unchanged |
| Mardu | `scripts/build/build-faction-artifacts.mjs#BIOLOGICAL_PRIORS.MARDU` | “decisive action under a code” remains consistent with `mardu_claim_0002`, `mardu_claim_0003`, and `mardu_claim_0007` | none | `VALID_ARCHITECTURE_EXCEPTION_OUTSIDE_SCOPED_SURFACES`; warning retained, raw Placement unchanged |

`validate-source-generated-guardrails.mjs` passes while emitting both warnings. The accepted contracts now make the owner, semantic basis, surface effect, reason, and protection explicit. They are not preserved merely because an earlier run accepted them.

## Scoped VM-595 delta

| Identity | Frozen before highest / candidates | After highest pair / score / candidates | Grammar/process hits |
|---|---:|---|---:|
| Abzan | `0 / 0` | Start Here ↔ How This Plays / `.2523 / 0` | 0 |
| Jeskai | `0 / 0` | Start Here ↔ What to Look For / `.2093 / 0` | 0 |
| Mardu | `.6250 / 1` | Start Here ↔ What to Look For / `.2375 / 0` | 0 |
| Sultai | `0 / 0` | How This Plays ↔ What to Look For / `.1569 / 0` | 0 |

## Accepted-control regression

- WUBRG: PASS at 1280×720 and 375×812; deliberate no-curated-taxonomy/fallback behavior, five sections, and Exact-only display preserved.
- Temur: PASS at both widths; exact four-lane set and Temur Roar Native → Exact → Stretch preserved.
- Lorehold: PASS at both widths; exact three-lane set and both Native products preserved.
- White, Rakdos, and Esper diversity controls: PASS at both widths; accepted taxonomies and relationship groups preserved.
- All twenty-four prior promoted contracts, four Wave 07 contracts, 37 Placement golden paths, 155/155 provider destinations, and Leonardo/Turtle Power! dossier integrity: PASS.

The prior VM-603 checkpoint fixture remains intentionally frozen at 16 contracts until the immediately following independent periodic all-37 recollection advances its evidence and contract count; it is not used as a Wave 07 freshness surrogate.

## RobQA validation

- QA tier: QA-1 rendered composition and authored provider data with elevated semantic/provenance risk; Placement behavior unchanged.
- PASS: Wave 07 focused suite, dossier builder/source validation, generated freshness, and source/generated guardrails with the two explicit warnings.
- PASS: 155/155 provider matrix and 37 identities / 147 Maze paths with zero hidden restrictions.
- PASS: Wave 06, Wave 05, Guild 04/03, Mono 02, Diversity 01, WUBRG, Temur, and Lorehold regressions.
- PASS: VM-551 dossier integrity, frontend JS/HTML lint, copy boundaries, Dossier Review gating, 37 Placement golden paths, and `git diff --check`.
- PASS: actual target/control Dossier Review at 1280×720 and 375×812; document/main widths are viewport-bounded and representative screenshots are visually clean.

## Semantic contract paths

- `docs/sirf/contracts/abzan.json`
- `docs/sirf/contracts/jeskai.json`
- `docs/sirf/contracts/mardu.json`
- `docs/sirf/contracts/sultai.json`

## Exact candidate manifest

1. `assets/js/archscry/dossier/foundation.js`
2. `data/dossier/identity-dossier-content.source.json`
3. `data/dossier/identity-dossier-content.catalog.json`
4. `data/precons/vox-mana-precons.source.json`
5. `data/precons/vox-mana-precons.source.schema.json`
6. `scripts/build/build-precon-artifacts.mjs`
7. `data/precons/vox-mana-precon-catalog.json`
8. `data/precons/vox-mana-precon-catalog.schema.json`
9. `tests/placement/quick-reading-tests.js`
10. `tests/archscry/sirf-wedge-wave-07-tests.js`
11. `docs/sirf/contracts/abzan.json`
12. `docs/sirf/contracts/jeskai.json`
13. `docs/sirf/contracts/mardu.json`
14. `docs/sirf/contracts/sultai.json`
15. `docs/sirf/runs/2026-08-30-sirf-wedge-wave-07.md`
16. `docs/sirf/reports/2026-08-30-sirf-wedge-wave-07.md`
17. `docs/sirf/rollout-tracker.md`
18. `docs/kanban/done/VM-606-sirf-wedge-wave-07.md`
19. `docs/kanban/board.md`
20. `docs/handoffs/2026-08-30-1636-codex-vm606-sirf-wedge-wave-07.md`
21. `docs/handoffs/HANDOFF_INDEX.md`

## Remaining queue

Six identities remain: Dune, Glint, Ink, Witch, Yore, and Colorless. The periodic all-37 checkpoint runs before Wave 08 and receives its own independent card/evidence commit if all checkpoint gates pass.
