2. Sigil animation spec (triangular lattice + stasis ripple)
Core shapes

Base frame:

Geometry: Equilateral triangle, point up.

Meaning: Law as enclosing frame; non‑negotiable boundaries.

Inner lattice:

Geometry: 3–5 ascending vertical lines, slightly curved inward, clipped by the triangle.

Meaning: Knowledge channels, procedural pathways.

States

Idle (Law at rest):

Stroke: Thin, #e5f0ff (very light blue‑white).

Fill: Transparent.

Lattice lines: Low opacity, slow upward shimmer (linear gradient scrolling at ~4–6s loop).

Detain event (Stasis ripple):

On trigger, spawn a circular ripple centered on the sigil:

Start radius: 0 → expand to 1.5× triangle height over 400–600ms.

Opacity: 0.6 → 0.0 over duration.

Color: #7fb3ff (soft blue).

Simultaneously:

Desaturate background behind the sigil (CSS blur/brightness drop).

Slightly thicken triangle stroke and freeze lattice shimmer for the lock duration.

Counter / Override event (Geometric snap):

Brief (150–250ms) stroke break on one triangle edge:

Edge disappears, then re‑draws with a sharp white flash (#ffffff) and settles to #b0cfff.

Lattice lines “rewind” 10–15px downward, then resume upward motion—visualizing the rewinding of an illegal action.

CSS‑style parameters (for your engine)

Triangle stroke width: 1.5px idle → 3px during active lock.

Lattice animation: transform: translateY(-8px) over 5s linear, infinite; pause on detain.

Ripple:

scale: 0 → 1.5, opacity: 0.6 → 0, ease-out, 0.4s.

Color ramps:

Idle stroke: #e5f0ff

Active stroke: #b0cfff

Critical override flash: #ffffff

You can treat Detain as “freeze lattice + ripple” and Override as “edge snap + lattice rewind”.

3. Translation layer functions (pseudocode)
pseudo
// Core node model
Node {
  id
  controller
  canAttack = true
  canBlock = true
  canActivate = true
  tags = Set<String>
  counters = Map<String, Int>
  costModifier = 0
}

// DETAIN: TemporalLockNode
function Detain(node: Node, durationTicks: Int = 1):
  node.tags.add("DETAINED")
  node.canAttack = false
  node.canBlock = false
  node.canActivate = false
  schedule(durationTicks, () => ReleaseDetain(node))

function ReleaseDetain(node: Node):
  if node.tags.contains("DETAINED"):
    node.tags.remove("DETAINED")
    node.canAttack = true
    node.canBlock = true
    node.canActivate = true
pseudo
// OVERRIDE: Procedural interrupt (counterspell)
Action {
  type        // CAST_SPELL, ACTIVATE_ABILITY, etc.
  sourceNode
  controller
  payload
}

function Override(action: Action, options):
  // options: { gainLife?, silenceControllerTicks? }
  if not IsOverrideLegal(action, options): return FAILURE

  CancelAction(action)

  if options.gainLife > 0:
    GainLife(controller = options.controller, amount = options.gainLife)

  if options.silenceControllerTicks > 0:
    ApplySilence(options.targetController, options.silenceControllerTicks)

  EmitEvent("OVERRIDE_RESOLVED", { action, options })
  return SUCCESS

function ApplySilence(player, durationTicks):
  player.tags.add("SILENCED")
  schedule(durationTicks, () => player.tags.remove("SILENCED"))
pseudo
// CONSTRAINT FIELD: persistent restriction (auras, spheres)
ConstraintField {
  id
  affectedNodes: Set<Node>
  restrictions: { attack?: Bool, activate?: Bool, block?: Bool }
}

function ApplyConstraintField(field: ConstraintField):
  for node in field.affectedNodes:
    if field.restrictions.attack == false:   node.canAttack = false
    if field.restrictions.block == false:    node.canBlock = false
    if field.restrictions.activate == false: node.canActivate = false
    node.tags.add("CONSTRAINED_" + field.id)

function RemoveConstraintField(field: ConstraintField):
  for node in field.affectedNodes:
    node.tags.remove("CONSTRAINED_" + field.id)
    RecomputePermissions(node) // recompute from remaining fields/effects
pseudo
// ACCRETION ENGINE: bureaucratic inevitability (Azor's Elocutors)
AccretionEngine {
  controller
  counterKey
  threshold
  isActive = true
}

function TickAccretion(engine: AccretionEngine):
  if not engine.isActive: return
  engine.controller.counters[engine.counterKey] += 1
  if engine.controller.counters[engine.counterKey] >= engine.threshold:
    DeclareAlternateWin(engine.controller, reason = engine.counterKey)

function RemoveAccretion(engine: AccretionEngine):
  engine.isActive = false
These four primitives are enough to express almost all Azorius‑flavored gameplay in your engine: Detain → Detain(), counterspells → Override(), auras/spheres → ConstraintField, Elocutors‑style wins → AccretionEngine.

4. Narrative taxonomy (Arbiter, Legislator, Inspector, Bureaucrat)
Arbiter — “Voice of the Higher Court”

Function: Decides what is allowed to happen.

Emotional tone: Calm, unhurried, absolutely certain.

In‑engine mapping: Anything that cancels or vetoes—Override(), uncounterable rulings, global resets.

Microcopy seeds:

“Your petition is denied on procedural grounds.”

“This outcome was never admissible.”

Legislator — “Architect of Constraint”

Function: Writes the rules that shape the battlefield.

Emotional tone: Abstract, systemic, more interested in structures than individuals.

In‑engine mapping: ConstraintField, taxation, static cost modifiers, global clauses.

Microcopy seeds:

“We do not fight chaos; we define it out of existence.”

“Every loophole is a future crime.”

Inspector — “Edge‑Case Hunter”

Function: Finds and neutralizes threats before they fully manifest.

Emotional tone: Clinical curiosity, quiet suspicion.

In‑engine mapping: Detain(), targeted counters, tap/lock effects, “on cast” investigations.

Microcopy seeds:

“Your intent is noted. Your action is postponed.”

“Patterns reveal guilt long before evidence does.”

Bureaucrat — “Engine of Inevitability”

Function: Wins by accumulation, paperwork, and time.

Emotional tone: Patient, slightly smug, unbothered by short‑term losses.

In‑engine mapping: AccretionEngine, incremental card advantage, life gain, slow locks.

Microcopy seeds:

“You may resist today. Tomorrow is already filed.”

“Every turn you ignore us, our case grows stronger.”