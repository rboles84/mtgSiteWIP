# SIRF Diversity Batch 01 — Owner Review Report

## Disposition

**SIRF READY FOR EXCEPTION-BASED ATLAS AUTOMATION**

Owner accepted this disposition on 2026-08-30. The accepted candidate is authorized for governed closeout as a new commit after immutable baseline `5c38f4d9a2d74e240d736af82c26dfd08b5b08d8`; the baseline must not be amended.

## Findings and Root Causes

| Identity | P0 | P1 | P2 | P3 | Resolved root causes |
|---|---:|---:|---:|---:|---|
| W | 0 | 0 | 2 | 1 | malformed authored boundary; Start Here fallback taxonomy differed from the curated What to Look For set; Start Here repeated the How This Plays mechanics inventory |
| BR | 0 | 1 | 3 | 0 | unsupported `factionRefs` mislabeled generic black-red products as Native; malformed authored boundary; fallback Start Here taxonomy; generated/generic archetype copy instead of claim-backed Cult lanes |
| ESPER | 0 | 0 | 3 | 1 | malformed authored boundary; fallback Start Here taxonomy; internal source-process language in player copy; Start Here and How This Plays repeated the same broad mechanics inventory |

Shared P1: `loadOptionalJson` used default browser caching while core JSON used `cache: no-store`. After catalog regeneration, the Owner-facing path could retain stale precon relationship metadata. The loader now reuses `CORE_DATA_FETCH_OPTIONS`, and a fresh-origin browser replay proved the repaired catalog.

## Final Contracts

### White

- Start Here / What to Look For: `Protective Tokens` → `Taxes and Rules` → `Equipment and Guardians`.
- Precons: no claimed Native product; `Forged in Stone` renders Exact-color; nearby two-color products render Stretch.
- Information gain: PASS; Start Here now asks the player to choose a lane, while How This Plays retains the mechanics/table translation.
- Rendered contract: PASS; ordered taxonomy equality, boundary grammar, relationship labels, and no horizontal overflow verified.

### Rakdos

- Start Here / What to Look For: `Spectacle Pressure` → `Risk for Release` → `Sacrifice with Consequence`.
- Boundary retains act / audience / visible consequence and rejects generic aggression, sacrifice, cruelty, or chaos as sufficient.
- Precons: Native set is empty; Endless Punishment, Planar Portal, Chaos Incarnate, Merciless Rage, and other black-red products render Exact-color; four-color neighbors render Stretch.
- Information gain: PASS; the three lanes distinguish public pressure, risky release, and sacrifice whose cost advances the act.
- Rendered contract: PASS; ordered taxonomy equality, no false Native badges, and no horizontal overflow verified.

### Esper

- Start Here / What to Look For: `Perfectibility Control` → `Information Engines` → `Artifact-Oriented Value`.
- Precons: Native set is empty; WUB products render Exact-color and four-color neighbors render Stretch.
- Information gain: PASS; Start Here teaches deck construction, Test the Fit protects the applied-knowledge boundary, and How This Plays now explains table behavior without repeating the same inventory.
- Rendered contract: PASS; ordered taxonomy equality, protected planned-refinement/controlled-change wording, Exact/Stretch labels, and no horizontal overflow verified.

## Cross-Section Redundancy Gate Evidence

The diversity batch promoted this existing SIRF requirement into a mandatory rendered acceptance gate. White began with Start Here repeating the How This Plays mechanics inventory. Esper began with Start Here and How This Plays repeating the same broad inventory. Both finished with zero scoped VM-595 candidates, but the batch demonstrated that source correctness and exact-string/Jaccard checks alone do not prove whole-page coherence. Their final rendered sections passed section ownership, information gain, and the accepted contracts. This evidence makes the gate mandatory for future batches; it does not prove that every remaining identity is already clean.

### White section-role matrix

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a broad build lane | White can begin as Protective Tokens, Taxes and Rules, or Equipment and Guardians | Choose which protection structure to build first | PASS — no longer repeats the full play inventory |
| Test the Fit | Establish fit, tension, and false-positive boundary | Shared standards and communal safety fit; private exception or unconstrained impulse does not | Decide whether White's obligations match the desired experience | PASS — suitability judgment is distinct |
| How This Plays | Translate White into table behavior | The shelter-builder makes safety tangible through protection, structure, and disciplined pressure | Understand how opponents experience the deck and how it applies pressure | PASS — owns table translation |
| Precon Starting Points | Compare recorded products and actual game plans | Forged in Stone is Exact-color and teaches an Equipment/token combat plan; nearby products are Stretch | Choose a concrete product by strategy and relationship, not badge alone | PASS — adds product/strategy information |
| What to Look For | Define the curated lanes | Protective boards, rules/taxes, and equipped guardians are the recognizable lane signals | Recognize the chosen lane in cards and deck structure | PASS — taxonomy-aligned, not copied |

Inventory review: Start Here owns the three curated build lanes; Test the Fit owns standards/protection/tension/boundary themes; How This Plays owns removal/protection/board-presence/table-pressure translation; Precons own recorded product strategies and relationship groups; What to Look For owns the lane definitions.

### Rakdos section-role matrix

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a broad build lane | Rakdos can begin as Spectacle Pressure, Risk for Release, or Sacrifice with Consequence | Choose whether the deck's act centers public pressure, risky release, or consequential sacrifice | PASS — construction choice is distinct |
| Test the Fit | Establish fit, tension, and false-positive boundary | Performance, audience, intensity, and visible cost fit; generic aggression, sacrifice, cruelty, or chaos does not | Decide whether the deck expresses the Cult rather than merely sharing black-red mechanics | PASS — owns identity boundary |
| How This Plays | Translate Rakdos into table behavior | The spectacle engine makes damage, resources, and caution part of a volatile public dare | Understand the room-facing pressure and turn texture | PASS — owns table translation |
| Precon Starting Points | Compare recorded products and actual game plans | Native is empty; black-red products are Exact-color and differ through punishment, exile-cast, Madness, Vampire, or chaos plans | Choose a product for its real strategy without mistaking color match for Cult proof | PASS — strategy/product rationale is additive |
| What to Look For | Define the curated lanes | Public life pressure, costly release, and sacrifice that advances the act are the recognizing signals | Distinguish Cult-shaped patterns from generic black-red value | PASS — taxonomy-aligned, not copied |

Inventory review: Start Here owns the three curated build lanes; Test the Fit owns act/audience/consequence and false-positive exclusions; How This Plays owns spectacle, damage, sacrifice, impulse, menace, and table reaction as play texture; Precons own cataloged product plans and Exact/Stretch relationships; What to Look For owns the lane recognition rules.

### Esper section-role matrix

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a broad build lane | Esper can begin as Perfectibility Control, Information Engines, or Artifact-Oriented Value | Choose which refinement engine should organize construction | PASS — no longer repeats the full play inventory |
| Test the Fit | Establish fit, tension, and false-positive boundary | Applied knowledge and planned improvement fit; generic control, decorative artifacts, or power without an improvement project does not | Decide whether the desired deck expresses Esper rather than generic WUB value | PASS — owns suitability and boundary |
| How This Plays | Translate Esper into table behavior | The system refiner converts preparation into narrower opposing options, protected value, and a controlled finish | Understand the deck's setup, pressure, pivot, and opponent experience | PASS — owns table translation |
| Precon Starting Points | Compare recorded products and actual game plans | Native is empty; WUB products are Exact-color and differ through life/artifact value, Zombies, tokens, control/value, or Knights | Choose a recorded product by strategy without treating color or artifacts as identity proof | PASS — adds product/strategy information |
| What to Look For | Define the curated lanes | Perfectibility control, information engines, and artifact-supported value are the recognizing signals | Recognize whether a card or package serves the selected refinement lane | PASS — taxonomy-aligned, not copied |

Inventory review: Start Here owns the three curated build lanes; Test the Fit owns applied knowledge, improvement tension, and false-positive exclusions; How This Plays owns card selection, answers, protected engines, preparation, and finishing behavior; Precons own recorded WUB/four-color product plans and relationship groups; What to Look For owns the lane definitions and artifact-support boundary.

Required result: all three identities have distinct primary section responsibilities, no unresolved same-purpose semantic duplication, aligned-but-distinct Start Here and What to Look For taxonomies, strategy-bearing precon rationales, and How This Plays table translation rather than construction advice.

## Scoped VM-595 Delta

The selected five-surface scan uses the VM-595 cross-section Jaccard threshold `0.38` plus the known malformed-grammar and process-language patterns.

| Identity | Before highest / candidates | After highest / candidates | Grammar hits | Process leakage |
|---|---:|---:|---:|---:|
| W | `0.4211 / 1` | `0 / 0` | 0 | 0 |
| BR | `0 / 0` | `0 / 0` | 0 | 0 |
| ESPER | `0.4783 / 1` | `0 / 0` | 0 | 0 |

Final scoped unit/word counts are W `19/372`, BR `20/370`, and ESPER `20/445`. These are scoped five-surface measures and must not be substituted for the frozen all-37 corpus totals.

## Golden Controls and Validation

- WUBRG semantic repair test: PASS.
- Temur semantic repair test: PASS.
- Lorehold semantic repair test: PASS.
- 37-faction placement golden paths: PASS.
- Source/generated guardrails: PASS with the two accepted Jeskai/Mardu model-owned warnings.
- Dossier and precon generated freshness: PASS.
- Focused VM-599 source→catalog→composer assertions: PASS.
- Actual direct Dossier Review renders: PASS for W, BR, and ESPER; final visible taxonomies equal accepted sets and precon relationship badges match the contract.

No new SIRF defect class was found. The shared cache repair used an existing generated-freshness ownership rule and changed no accepted golden semantics.

## Framework Clarification and Automation

- Full governing rule: `docs/sirf/SIRF-v0.2-atlas-wide-deployment-plan.md`, Section 12.2.
- Concise operational summary: `docs/sirf/SIRF-README.md`.
- VM-595 remains the detector; the complete gate is VM-595 detection + section-role contract + rendered semantic comparison + information-gain review.
- Existing R10, R11, R15, and R19 carry the strengthened rule; no new scored dimension was added.
- Exception-based automation remains enabled. Routine, clearly owned P2/P3 redundancy is repaired autonomously; unresolved redundancy prohibits commit and push.
- Owner escalation remains limited to ambiguous section ownership, new semantic interpretation, conflicting official sources, accepted golden-semantic change, or three-cycle non-convergence, without weakening stricter SIRF stop conditions.
