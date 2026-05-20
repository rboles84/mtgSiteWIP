# Gruul Animation Spec

**Identity:** Gruul Clans  
**Core motion thesis:** impulse becomes impact before the room can overthink it.  
**Vox Mana read:** the body knows before the law finishes speaking.

This spec is meant to match a Gruul placement/dossier experience without turning the page into generic fire, generic monsters, or “red-green = big dumb creatures.” Gruul motion should feel physical, seismic, predatory, outdoor, ungoverned, and immediate.

---

## 1. Motion Principles

| Principle | Meaning | UI Translation |
|---|---|---|
| Impact First | The first read should feel like a body hitting the ground | Result cards enter with a grounded stomp, not a float |
| Riot Choice | Gruul pressure chooses between speed and size | Interactions branch visually into **haste path** or **counter path** |
| Bloodrush Translation | A card can be a body or a burst of force | Hover states convert card chips into attack streaks |
| Terrain Muscle | Land is not scenery; it is leverage | Background plates, cracks, roots, and dust react to selection |
| Anti-Obstacle Force | Anything blocking motion becomes an object to break | Error/blocked states fracture rather than flash red |
| Pack Momentum | One body invites another | Chips and panels cascade as a stampede, not as a neat bureaucratic stack |

---

## 2. Palette Tokens

```css
:root {
  --vm-gruul-ash: #120d09;
  --vm-gruul-bark: #24160d;
  --vm-gruul-charcoal: #080604;
  --vm-gruul-blood: #8f2416;
  --vm-gruul-ember: #d96129;
  --vm-gruul-rage-gold: #e0a84b;
  --vm-gruul-moss: #566b2f;
  --vm-gruul-wild-green: #879d4b;
  --vm-gruul-bone: #ead8b8;
  --vm-gruul-dust: #b78b5a;

  --vm-gruul-glow-ember: rgba(217, 97, 41, 0.34);
  --vm-gruul-glow-moss: rgba(135, 157, 75, 0.24);
  --vm-gruul-shadow-stomp: rgba(4, 2, 1, 0.76);
}
```

### Color Usage

- **Ash / Charcoal:** page background, modal wells, deep shadow.
- **Bark:** card surfaces and panel bodies.
- **Blood / Ember:** active pressure, selected state, combat warnings, impact details.
- **Rage Gold:** canonical card anchors, callout edges, important CTAs.
- **Moss / Wild Green:** land, ramp, growth, creature-body signals.
- **Bone / Dust:** readable text and terrain particles.

Avoid neon red, Halloween orange, and “forest green serenity.” Gruul should feel like bark scraped open over coals.

---

## 3. Timing Tokens

```css
:root {
  --vm-gruul-time-spark: 180ms;
  --vm-gruul-time-lunge: 320ms;
  --vm-gruul-time-stomp: 520ms;
  --vm-gruul-time-aftershock: 900ms;
  --vm-gruul-time-stampede: 1200ms;

  --vm-gruul-ease-impact: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  --vm-gruul-ease-stomp: cubic-bezier(0.2, 0.82, 0.26, 1);
  --vm-gruul-ease-aftershock: cubic-bezier(0.16, 0.84, 0.44, 1);
}
```

Gruul timing should feel quicker than Golgari and heavier than Izzet. It is not jittery; it is decisive.

---

## 4. Keyframes

```css
@keyframes vm-gruul-stomp-in {
  0% {
    opacity: 0;
    transform: translate3d(0, -10px, 0) scale(1.025) rotate(-0.2deg);
    filter: blur(1px);
  }
  58% {
    opacity: 1;
    transform: translate3d(0, 3px, 0) scale(0.992) rotate(0.1deg);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }
}

@keyframes vm-gruul-ember-lunge {
  0% {
    opacity: 0;
    transform: translateX(-10px) scaleX(0.72);
  }
  45% {
    opacity: 0.85;
  }
  100% {
    opacity: 0.16;
    transform: translateX(18px) scaleX(1.08);
  }
}

@keyframes vm-gruul-riot-choice {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  45% {
    opacity: 1;
    transform: scale(1.025);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes vm-gruul-ground-crack {
  0% {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  30% {
    opacity: 0.72;
  }
  100% {
    clip-path: inset(0 0 0 0);
    opacity: 0.24;
  }
}

@keyframes vm-gruul-aftershock-pulse {
  0%, 100% {
    box-shadow:
      inset 0 0 0 1px rgba(217, 97, 41, 0.2),
      0 14px 36px rgba(0, 0, 0, 0.45);
  }
  50% {
    box-shadow:
      inset 0 0 0 1px rgba(224, 168, 75, 0.38),
      0 20px 48px rgba(4, 2, 1, 0.78);
  }
}

@keyframes vm-gruul-pack-surge {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  65% {
    opacity: 1;
    transform: translateY(-2px) scale(1.018);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
```

---

## 5. Component Behavior

### Placement Result Card

**Entrance:** `stomp-in`  
**Idle:** slow `aftershock-pulse` only for the selected placement  
**Hover:** ember edge brightens, moss underglow appears, card compresses down by 1px instead of floating up  
**Click:** a short impact compression followed by panel crack/reveal

```css
.vm-card--gruul {
  background:
    radial-gradient(circle at 18% 8%, rgba(217, 97, 41, 0.18), transparent 30%),
    radial-gradient(circle at 88% 86%, rgba(86, 107, 47, 0.20), transparent 34%),
    linear-gradient(145deg, var(--vm-gruul-bark), var(--vm-gruul-charcoal));
  color: var(--vm-gruul-bone);
  border: 1px solid rgba(217, 97, 41, 0.22);
  box-shadow: 0 18px 46px var(--vm-gruul-shadow-stomp);
  animation: vm-gruul-stomp-in var(--vm-gruul-time-stomp) var(--vm-gruul-ease-stomp) both;
}

.vm-card--gruul.is-primary {
  animation:
    vm-gruul-stomp-in var(--vm-gruul-time-stomp) var(--vm-gruul-ease-stomp) both,
    vm-gruul-aftershock-pulse 5.6s ease-in-out infinite;
}
```

### Riot Choice Control

For any UI that branches into **speed** or **size**, use a two-path control:

- **Haste path:** ember streak, short copy, immediate action CTA.
- **Counter path:** moss/gold weight, slightly larger chip, “build into impact” CTA.

Suggested labels:

```txt
Hit Now
Hit Harder
```

### Info Panels

Panels should feel like terrain splitting open, not like clean cards sliding into place.

- Title lands first.
- Divider cracks outward from the title.
- Body copy arrives in short, forceful blocks.
- Canonical card chips surge in rows, slightly staggered.

### Maze / Commander Links

Use Gruul CTAs for:

- “Search haste pressure”
- “Search trample finishers”
- “Search bloodrush-style combat tricks”
- “Search riot-style haste/counter choices”
- “Search land-to-impact commanders”
- “Return to my Gruul dossier”

CTA hover should feel like a footstep near coals: compression, ember edge, low aftershock.

### Loading / Thinking State

Use `ember-lunge` and a very low `ground-crack` reveal around the active query container.

Suggested copy:

> Kicking down the quiet parts...

---

## 6. State Map

| State | Animation | Copy Tone |
|---|---|---|
| Unread placement | dim bark, low ember seam | “The ground is holding pressure.” |
| Active placement | stomp-in plus aftershock | “The clan has found your impact line.” |
| Adjacent fit | moss/ember side stripe, no pulse | “Nearby pressure, not the core charge.” |
| Outbound Maze link | ember streak on hover | “Break into the Maze.” |
| Return flow | dust trail pulls backward | “Return to the clan mark.” |
| Error/no result | cracked surface, no alarm flash | “That path hit stone.” |

---

## 7. Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .vm-card--gruul,
  .vm-card--gruul.is-primary,
  .vm-gruul-particle,
  .vm-gruul-crack-line {
    animation: none !important;
    transition: none !important;
  }
}
```

Accessibility rules:

- Do not use screen shake longer than 120ms.
- Do not animate large parallax layers during reading.
- Do not use flashing embers.
- Keep contrast high on bark/charcoal surfaces.
- Preserve the same information in copy, not only in speed/size visuals.

---

## 8. Drift Guardrails

Do not make Gruul look like:

- **Rakdos:** theatrical flame, blood circus, sadistic spectacle.
- **Golgari:** rot, spores, burial, attrition compost.
- **Selesnya:** peaceful nature, harmony, community ritual.
- **Simic:** bioengineering, laboratory growth, careful adaptation.
- **Generic fantasy barbarian:** leather-and-axe cliché with no Magic mechanical grounding.

Gruul should feel like:

```txt
impulse -> body -> terrain -> impact -> aftershock
```
