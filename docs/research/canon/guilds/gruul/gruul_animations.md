SVG + CSS snippets for the Gruul sigil (Totemic Spiral + Shockwave Pulse)
Usage: paste the SVG into your HTML and include the CSS in a <style> block or external stylesheet. The SVG uses CSS animation names below.

svg
<!-- Gruul sigil SVG -->
<svg id="gruul-sigil" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="ember-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="ember-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff8a4b"/>
      <stop offset="60%" stop-color="#ff5a2a"/>
      <stop offset="100%" stop-color="#c1442e"/>
    </radialGradient>
  </defs>

  <!-- central ember -->
  <circle id="gruul-ember" cx="100" cy="100" r="18" fill="url(#ember-grad)" filter="url(#ember-glow)"/>

  <!-- spiral tusk curves (three paths for layered motion) -->
  <g id="gruul-spiral" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
    <path id="tusk-left" d="M60,120 C70,80 90,60 120,60" stroke="#3f7f3a"/>
    <path id="tusk-right" d="M140,120 C130,80 110,60 80,60" stroke="#c1442e"/>
    <path id="tusk-inner" d="M80,140 C100,110 120,110 140,140" stroke="#8b2f1f" stroke-width="4"/>
  </g>

  <!-- shockwave ring -->
  <circle id="gruul-shock" cx="100" cy="100" r="18" fill="none" stroke="#ff8a4b" stroke-width="3" opacity="0"/>

</svg>
css
/* Gruul sigil CSS animations */
#gruul-ember {
  transform-origin: 100px 100px;
  animation: ember-breathe 3s ease-in-out infinite;
}

@keyframes ember-breathe {
  0% { transform: scale(0.92); opacity: 0.85; filter: blur(2px); }
  50% { transform: scale(1.08); opacity: 1; filter: blur(4px); }
  100% { transform: scale(0.92); opacity: 0.85; filter: blur(2px); }
}

/* subtle jitter on tusks to imply feral motion */
#tusk-left, #tusk-right, #tusk-inner {
  transform-origin: 100px 100px;
  animation: tusk-jitter 1.6s ease-in-out infinite;
}

@keyframes tusk-jitter {
  0% { transform: translate(0,0) rotate(0deg); }
  25% { transform: translate(-1px,1px) rotate(-1deg); }
  50% { transform: translate(0,0) rotate(0deg); }
  75% { transform: translate(1px,-1px) rotate(1deg); }
  100% { transform: translate(0,0) rotate(0deg); }
}

/* shockwave: used on Bloodrush event */
@keyframes shockwave {
  0% { transform: scale(0.9); opacity: 0.8; stroke-width: 3; }
  60% { transform: scale(1.8); opacity: 0.35; stroke-width: 6; }
  100% { transform: scale(2.4); opacity: 0; stroke-width: 8; }
}

/* helper classes to trigger events */
.gruul-bloodrush .#gruul-shock,
.gruul-bloodrush #gruul-shock {
  animation: shockwave 0.25s ease-out forwards;
  opacity: 1;
}

/* fight impact: quick tusk collision */
@keyframes fight-impact {
  0% { transform: translateX(0) rotate(0deg); }
  40% { transform: translateX(8px) rotate(6deg); }
  60% { transform: translateX(-8px) rotate(-6deg); }
  100% { transform: translateX(0) rotate(0deg); }
}

.gruul-fight #tusk-left { animation: fight-impact 0.18s ease-in-out; }
.gruul-fight #tusk-right { animation: fight-impact 0.18s ease-in-out reverse; }

/* frenzy: thicker strokes and faster ember */
.gruul-frenzy #gruul-spiral path { stroke-width: 8; }
.gruul-frenzy #gruul-ember { animation-duration: 1s; filter: blur(6px); }
How to trigger animations in JS (example)

javascript
// add class to svg container to trigger Bloodrush
const svg = document.getElementById('gruul-sigil');
function triggerBloodrush() {
  svg.classList.add('gruul-bloodrush');
  setTimeout(() => svg.classList.remove('gruul-bloodrush'), 400);
}
function triggerFight() {
  svg.classList.add('gruul-fight');
  setTimeout(() => svg.classList.remove('gruul-fight'), 220);
}
function triggerFrenzy() {
  svg.classList.add('gruul-frenzy');
  // leave frenzy until explicitly removed
}
function stopFrenzy() {
  svg.classList.remove('gruul-frenzy');
}
Pseudocode unit tests for Bloodrush, Fight, and Momentum interactions
Test framework assumptions: assert(condition, message), schedule(ticks, fn) advances simulated ticks, endOfTurn() triggers end‑of‑turn cleanup. Use these tests to validate core primitives.

pseudo
// Mock helpers
function makeNode(id, controller, power, toughness):
  return Node{id:id, controller:controller, power:power, toughness:toughness, tags:Set(), counters:Map()}

function assertEqual(a,b,msg):
  if a != b: throw Error("ASSERT FAIL: " + msg + " (got " + a + " expected " + b + ")")

// Test 1: Bloodrush applies temporary buff and is removed at end of turn
test_Bloodrush_temporary_buff():
  attacker = makeNode("A1","P1",3,3)
  // apply bloodrush +4/+0
  Bloodrush(attacker, 4, 0)
  // immediate effect
  assertEqual(attacker.power, 7, "Bloodrush should add buff immediately")
  assert attacker.tags.contains("BLOODRUSHED"), "Attacker should have BLOODRUSHED tag"
  // simulate end of turn cleanup
  endOfTurn()
  // after cleanup, buff removed and stats recomputed
  assertEqual(attacker.power, 3, "Bloodrush buff should be removed at end of turn")
  assert not attacker.tags.contains("BLOODRUSHED"), "BLOODRUSHED tag should be cleared"

// Test 2: Fight resolves mutual damage and triggers deaths
test_Fight_mutual_damage_and_death():
  a = makeNode("A", "P1", 4, 2) // 4/2
  b = makeNode("B", "P2", 2, 4) // 2/4
  Fight(a, b)
  // after fight: a.toughness reduced by b.power (4 - 2 = 2), b.toughness reduced by a.power (4 - 4 = 0)
  assertEqual(a.toughness, -? /* depends on damage model */, "A's toughness after fight")
  // canonical model: subtract power from toughness
  // recompute deaths: any node with toughness <= 0 is destroyed
  if a.toughness <= 0: assert nodeDestroyed(a)
  if b.toughness <= 0: assert nodeDestroyed(b)
  // concrete expected: a.toughness = 2 - 2 = 0 -> destroyed; b.toughness = 4 - 4 = 0 -> destroyed
  assert nodeDestroyed(a), "A should be destroyed after mutual lethal damage"
  assert nodeDestroyed(b), "B should be destroyed after mutual lethal damage"

// Test 3: Momentum accumulates on repeated attacks and increases power
test_Momentum_accumulation_and_effect():
  c = makeNode("C", "P1", 2, 2)
  // initial momentum 0
  assertEqual(c.counters.get("MOMENTUM",0), 0, "Initial momentum zero")
  // simulate three successful attacks that grant +1 momentum each
  Momentum(c, 1)
  Momentum(c, 1)
  Momentum(c, 1)
  assertEqual(c.counters["MOMENTUM"], 3, "Momentum should be 3 after three gains")
  // design: each momentum adds +1 power
  assertEqual(c.power, 5, "Power should reflect base 2 + 3 momentum = 5")
  // simulate end of turn: momentum persists or decays per design; test both behaviors
  // if momentum persists:
  assertEqual(c.counters["MOMENTUM"], 3, "Momentum persists across turns by default")
  // if momentum is ephemeral, simulate decay:
  // scheduleDecay(c) ; endOfTurn(); assertEqual(c.counters.get('MOMENTUM',0), 0, "Momentum decayed at EOT")

// Test 4: Combined interaction — Bloodrush on a node with Momentum, then Fight
test_Combined_Bloodrush_Momentum_Fight():
  attacker = makeNode("Atk","P1",3,3)
  defender = makeNode("Def","P2",4,4)
  // attacker has 2 momentum
  Momentum(attacker, 2) // attacker.power becomes 5
  assertEqual(attacker.power, 5, "Attacker power after momentum")
  // apply bloodrush +3/+0 to attacker
  Bloodrush(attacker, 3, 0) // attacker.power becomes 8 temporarily
  assertEqual(attacker.power, 8, "Attacker power after bloodrush + momentum")
  // resolve fight between attacker and defender
  Fight(attacker, defender)
  // expected damage: defender.toughness reduced by 8; defender destroyed
  assert nodeDestroyed(defender), "Defender should be destroyed by combined power"
  // attacker takes defender.power damage (4) to toughness: attacker.toughness = 3 - 4 = -1 -> destroyed unless regeneration
  if attacker.toughness <= 0:
    assert nodeDestroyed(attacker), "Attacker should be destroyed by trade unless other effects intervene"
  // after end of turn, bloodrush removed; if attacker survived, recompute power back to base+momentum (5)
  endOfTurn()
  if not nodeDestroyed(attacker):
    assertEqual(attacker.power, 5, "Attacker power should revert to base+momentum after bloodrush expires")
Notes on tests

Adjust the expected numeric outcomes to match your engine's damage model (e.g., whether damage reduces toughness permanently or is tracked as damage until end of turn).

nodeDestroyed(node) should check whether the engine removed the node from battlefield and triggered death events.

Include additional tests for edge cases: Bloodrush on non‑attacking node (should be invalid), Momentum stacking with temporary buffs, interactions with regeneration or damage prevention.