2. Gruul Sigil Animation Spec (Totemic Spiral + Shockwave Pulse)
Core geometry

Base shape:

Interlocking spiral + tusk‑curve motif (representing instinct + momentum).

Thick, uneven strokes — nothing symmetrical.

Inner motion:

Pulsing ember core (red) surrounded by vibrating green arcs (nature’s heartbeat).

States
Idle (Primal Rest)
Stroke: rough, textured, #c1442e (red‑ochre) + #3f7f3a (deep green).

Core ember: slow 3–4s breathing pulse (opacity 0.4 → 0.7).

Outer arcs: jitter‑motion (1–2px random oscillation).

Riot / Bloodrush Event
Trigger: any burst‑damage, haste, or buff effect.

Animation:

Ember core flares to #ff5a2a over 120ms.

Spiral expands outward 10–15% then snaps back.

Shockwave ring erupts: radius 0 → 2× sigil size, opacity 0.8 → 0.0.

Fight Event
Two tusk‑curves slam together:

Left arc lunges right by 6–8px.

Right arc lunges left by 6–8px.

Impact flash: #ffffff for 80ms.

Ember core flickers violently (random 0.2–0.8 opacity jitter).

Rage / Frenzy Event
Continuous 1s loop:

Spiral rotates 8–12° back and forth.

Ember core becomes unstable (noise‑based flicker).

Green arcs pulse outward like expanding muscle fibers.

CSS‑style parameters
Stroke width: 3px idle → 6px during frenzy.

Ember pulse: scale(0.9 → 1.1) over 3s, ease‑in‑out.

Shockwave: scale(0 → 2), opacity fade, 0.25s.

Jitter: transform: translate(random(-2,2), random(-2,2)) every 80ms.

3. Translation Layer Functions (Gruul Primitives)
These mirror the Azorius primitives but express feral, kinetic, and instinctive logic.

BLOODRUSH — Instant Kinetic Infusion
pseudo
function Bloodrush(attacker: Node, buffPower: Int, buffToughness: Int):
  attacker.power += buffPower
  attacker.toughness += buffToughness
  attacker.tags.add("BLOODRUSHED")
  schedule(endOfTurn, () => RemoveBloodrush(attacker))
FIGHT — Dominance Resolution
pseudo
function Fight(a: Node, b: Node):
  a.toughness -= b.power
  b.toughness -= a.power
  EmitEvent("FIGHT_IMPACT", {a, b})
  ResolveDeaths(a, b)
RAMPAGE / MOMENTUM — Scaling With Conflict
pseudo
function Momentum(node: Node, amount: Int):
  node.counters["MOMENTUM"] += amount
  node.power += amount
RITUAL FRENZY — Creature‑Count Mana Burst
pseudo
function RitualFrenzy(controller):
  let n = CountCreatures(controller)
  controller.manaPool.add({R: n, G: n})
  EmitEvent("RITUAL_FRENZY", {n})
FERAL OVERRIDE — Anti‑Control Clause
pseudo
function FeralOverride(node: Node):
  node.tags.add("CANNOT_BE_COUNTERED")
  schedule(endOfTurn, () => node.tags.remove("CANNOT_BE_COUNTERED"))
4. Narrative Taxonomy (Gruul Archetypes)
The Chieftain — “Voice of the Stampede”
Function: Leads by presence, not argument.

Tone: Loud, decisive, volcanic.

Mapping: Global buffs, haste, trample, momentum engines.

Microcopy:

“If you feel the earth shake, follow it.”

“Strength is the only law.”

The Ravager — “Apex of Violence”
Function: Breaks structures, smashes obstacles.

Tone: Brutal, unstoppable.

Mapping: Fight(), land destruction, massive ETB impacts.

Microcopy:

“Walls are just slow‑moving prey.”

“Everything yields.”

The Wildheart — “Instinct Given Form”
Function: Embodies primal emotion and natural force.

Tone: Passionate, feral, ecstatic.

Mapping: Bloodrush, frenzy, scaling power.

Microcopy:

“Your pulse is the only truth.”

“Let instinct speak.”

The Pack‑Caller — “Ritual of Many”
Function: Turns numbers into inevitability.

Tone: Rhythmic, ritualistic, communal.

Mapping: Token swarms, ritual mana, pack‑based buffs.

Microcopy:

“One roar becomes a hundred.”

“The clan is the storm.”