# Text Input

Boros — exhaustive structural matrix, mechanics primitives, and implementation blueprint
Below is a single, self‑contained deliverable you can drop straight into your Architecture of Mana schema or Vox Mana translation layer. It includes: ontological axioms, a full matrix mapping (card → axes → visual token), precise mechanic primitives with pseudocode, archetype taxonomy, symbolic geometry & animation spec, and a compact implementation checklist. I cite the most relevant resources I checked at the end.

1. Ontology and axioms (compressed, canonical)
Axiom P (Protection) — Force is morally licensed when it preserves the innocent or order.

Axiom M (Momentum) — Action generates further action; kinetic energy compounds across time slices.

Axiom C (Collective Agency) — Group formation multiplies individual potency; thresholds matter.

Axiom R (Resilience) — Righteous systems are engineered to persist under attrition.

Use these as the top‑level constraints for any Boros mapping: every mechanic, visual, or narrative tag must reference at least one axiom.

2. Structural axes (matrix columns) and canonical values
Axis	Definition	Boros canonical value
Agency	Unit of moral action (individual ↔ collective)	Collective (hierarchical)
Ethic	Primary moral logic (preserve ↔ exploit)	Protective retribution
Energy	Kinetic profile (burst ↔ sustained)	Momentum / cascading
Form	Spatial/topological organization (loose ↔ regimented)	Regimented formation
Durability	Resistance to removal (fragile ↔ indestructible)	Redundant resilience
Propagation	How effects spread (local ↔ radial diffusion)	Field diffusion (radiant)


Use these columns in your CSV/JSON matrix. Each Boros card maps to a vector of these six values plus tags for mechanics and archetype.

3. Card → matrix mappings (representative canonical set)
Each entry: Card — mechanics — axis vector — narrative tag — visual token

Aurelia, the Warleader — extra combat, leadership aura — Agency:Collective; Energy:TemporalMultiplication; Durability:High; Propagation:Local — “action begets righteous action” — token: double‑pulse spear + halo.

Boros Charm — modal resilience (indestructible/boost/damage redirect) — Agency:Individual/Collective; Ethic:Protective; Durability:HardinessFlag — “virtue endures” — token: shield with emergency flare.

Sunhome Guildmage — token creation + team pump — Agency:Collective; Form:Regimented; Propagation:FieldGenerator — “structure breeds zeal” — token: stacked banners + ember.

Boros Reckoner — damage reflection/conditional scaling — Ethic:Judgment; Energy:CalibratedRage; Durability:Moderate — “anger with purpose” — token: calibrated scales + ember spark.

Firemane Avenger — combat‑triggered damage / vengeance — Energy:Burst; Ethic:Retribution; Propagation:Targeted — “retribution purifies” — token: burning gauntlet.

(Full CSV/JSON export available on request; this sample shows the mapping pattern.)

4. Mechanics primitives (formalized) — semantics + pseudocode
Treat each mechanic as a pure function that transforms node state. Use these building blocks in your translation layer.

Primitive: Battalion — Collective Threshold Node
Semantics: When count(allied_attackers) >= threshold apply buff to attacking allied nodes this turn.
Pseudocode

python
def Battalion(node, battlefield, threshold=3, buff):
    attackers = [n for n in battlefield.allied(node) if n.is_attacking]
    if len(attackers) >= threshold:
        for a in attackers:
            a.apply_temp_buff(buff)
Primitive: Mentor — Hierarchical Propagation Edge
Semantics: When a higher‑rank node deals combat damage, it grants +1/+1 (or similar) to a lower‑rank allied node.
Pseudocode

python
def Mentor(mentor_node, target_node, trigger='combat_damage', buff):
    if event == trigger and event.source == mentor_node:
        eligible = [n for n in battlefield.allied(mentor_node) if n.power < mentor_node.power]
        if target_node in eligible:
            target_node.gain_permanent(buff)
Primitive: Radiance — Field Diffusion Operator
Semantics: Apply effect to all allied nodes that match a type/class.
Pseudocode

python
def Radiance(source_node, filter_fn, effect):
    for n in battlefield.allied(source_node):
        if filter_fn(n):
            n.apply_effect(effect)
Primitive: ExtraCombat — Temporal Multiplication
Semantics: Insert an additional combat phase or duplicate attack resolution for a node or player.
Pseudocode

python
def ExtraCombat(player, times=1):
    for i in range(times):
        game.insert_combat_phase(player)
Primitive: HardinessFlag — Indestructible / Emergency Resilience
Semantics: Prevent destruction for a tick; optionally redirect damage.
Pseudocode

python
def HardinessFlag(node, duration=1, redirect_to=None):
    node.flags.add('indestructible', expires_in=duration)
    if redirect_to:
        node.on_damage = lambda dmg: redirect_to.receive_damage(dmg)
Use composition to model complex cards (e.g., Aurelia = ExtraCombat + Radiance(aura)).

5. Archetypes, roles, and behavioral scripts
Map these to UI personas, narrative microcopy, and procedural generation tags.

Paladin (Leader) — Axiom P + Axiom R — grants protective auras, high moral certainty. UI: white core, red rim; microcopy: “Protect and lead.”

Drill Sergeant (Mentor) — Axiom C — propagates small improvements; UI: stacked chevrons icon; microcopy: “Train the next.”

Vanguard (Shock) — Axiom M — sacrificial forward unit; triggers Battalion; microcopy: “Strike in formation.”

Reckoner (Judgment) — Axiom P + calibrated anger — conditional retaliation; microcopy: “Measured retribution.”

For flavor generation, pair archetype templates with axis vectors to produce short lines that echo canonical flavor without copying card text.

6. Symbolic geometry, sigil semantics, and animation spec
Geometry

Core: white circle (stability)

Vectors: four red radiating spokes (zeal) intersecting the core at a central node (command).

Rings: concentric rings denote hierarchy (inner = command, outer = rank‑and‑file).

Animation

Momentum pulse: each successful attack lights a spoke; when Battalion threshold reached, all spokes glow and a radial shockwave emits.

ExtraCombat visual: duplicate pulse with a trailing ember; second pulse is slightly offset and brighter.

Hardiness flag: shield overlay becomes opaque and emits a brief white flash on damage.

CSS/JS parameters (spec)

Pulse duration: 220ms

Glow intensity: base 0.4 → battalion 1.0 (linear ramp)

Trail decay: 600ms exponential fade

7. Narrative translation rules (flavor → metadata)
Single‑line flavor → map to Ethic + Archetype tags.

Combat‑trigger flavor → map to Energy:Momentum and Mechanic:ExtraCombat/Battalion.

Guild/Location flavor (Sunhome, etc.) → map to Form:Regimented and Propagation:FieldGenerator.

Example: flavor “Where the righteous gather, strength multiplies.” → Ethic:Protective; Form:Regimented; Mechanic:Battalion/Radiance.

8. Implementation checklist (practical)
Schema: create CSV/JSON with columns: card, mechanics[], agency, ethic, energy, form, durability, propagation, archetype, visual_token, narrative_tag.

Primitive library: implement Battalion(), Mentor(), Radiance(), ExtraCombat(), HardinessFlag() as engine functions.

Sigil assets: produce white core + red spokes SVG with animation hooks for pulse/glow.

Flavor generator: template engine that maps axis vectors → 1–2 line flavor.

Testing: simulate 1,000 combat ticks to validate momentum chains and resilience interactions.

Quick worked example (Aurelia pipeline)
Input: Aurelia card data (extra combat, leadership aura).

Translate: mechanics → [ExtraCombat(times=1), Radiance(filter=is_attacking, effect=+1/+0)].

Matrix entry: Agency=Collective; Energy=TemporalMultiplication; Form=Regimented; Durability=High.

Visual: double‑pulse spear token; animation: two sequential pulses with trailing ember.

Narrative: “Her strike calls the legion; the legion answers twice.” (generated from axis tags)

Sources I checked (for grounding and design signals)
Mechanical Color Pie 2017 — Mark Rosewater (Making Magic). Evidence used for color‑pie mechanical placement and canonical designer framing. .

Search results and contextual references for colorless / mechanical framing (Bing search snapshot). Used to confirm distinctions between mana types and how mechanical taxonomy is discussed in community resources. .

Draftsim article: Colorless Mana in MTG — used for clarifying mana‑type semantics and historical design notes that informed propagation vs. color identity distinctions. .