# Golgari Animation Spec

**Identity:** Golgari Swarm  
**Core motion thesis:** decay is not stillness; it is slow, layered, useful motion.  
**Vox Mana read:** nothing is wasted; endings become inventory.

This spec is meant to match a Golgari placement/dossier experience without turning the page into generic “green slime” or “zombie horror.” Golgari motion should feel fungal, subterranean, recursive, patient, and inevitable.

---

## 1. Motion Principles

| Principle | Meaning | UI Translation |
|---|---|---|
| Accretion | Value builds in layers | Panels bloom by stacking subtle shadows, rings, spores, and root lines |
| Composting | Old state becomes fuel | Exiting elements collapse downward and seed the next element |
| Swarm Emergence | Many small bodies become one pressure | Micro-particles gather into borders, badges, and CTA highlights |
| Root Memory | The ground remembers previous choices | Breadcrumbs and return links pulse from below instead of flashing |
| Attrition | Pressure is persistent, not explosive | Long easing curves, low amplitude, no hard snap unless removal/action state |

---

## 2. Palette Tokens

```css
:root {
  --vm-golgari-soil: #14110d;
  --vm-golgari-black-rot: #090b08;
  --vm-golgari-moss: #4e6b37;
  --vm-golgari-spore: #9fb46b;
  --vm-golgari-fungal-gold: #b89f5d;
  --vm-golgari-bone: #d8d1b0;
  --vm-golgari-bruise: #3b2d46;
  --vm-golgari-sap: #6e7f2c;

  --vm-golgari-glow-soft: rgba(159, 180, 107, 0.22);
  --vm-golgari-glow-hard: rgba(184, 159, 93, 0.32);
  --vm-golgari-shadow-root: rgba(3, 5, 3, 0.72);
}
```

### Color Usage

- **Soil / Black Rot:** page background, card troughs, modal wells.
- **Moss / Sap:** active state, selected placement, progress path.
- **Spore / Fungal Gold:** callouts, badges, edge glows, canonical card anchors.
- **Bone:** text on dark surfaces.
- **Bruise:** danger/history/old-death accent; use sparingly.

---

## 3. Timing Tokens

```css
:root {
  --vm-golgari-time-spore: 420ms;
  --vm-golgari-time-root: 720ms;
  --vm-golgari-time-compost: 960ms;
  --vm-golgari-time-undergrowth: 1400ms;

  --vm-golgari-ease-root: cubic-bezier(0.19, 1, 0.22, 1);
  --vm-golgari-ease-decay: cubic-bezier(0.45, 0.05, 0.25, 1);
  --vm-golgari-ease-swarm: cubic-bezier(0.16, 0.84, 0.44, 1);
}
```

---

## 4. Keyframes

```css
@keyframes vm-golgari-spore-drift {
  0% {
    opacity: 0;
    transform: translate3d(0, 8px, 0) scale(0.96);
    filter: blur(1px);
  }
  35% {
    opacity: 0.42;
  }
  100% {
    opacity: 0.12;
    transform: translate3d(-6px, -18px, 0) scale(1.04);
    filter: blur(0.4px);
  }
}

@keyframes vm-golgari-root-pulse {
  0%, 100% {
    box-shadow:
      inset 0 0 0 1px rgba(159, 180, 107, 0.16),
      0 14px 40px rgba(0, 0, 0, 0.42);
  }
  50% {
    box-shadow:
      inset 0 0 0 1px rgba(184, 159, 93, 0.32),
      0 18px 48px rgba(8, 12, 6, 0.72);
  }
}

@keyframes vm-golgari-compost-bloom {
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
    clip-path: inset(12% 0 0 0 round 18px);
  }
  60% {
    opacity: 1;
    transform: translateY(-1px) scale(1.002);
    clip-path: inset(0 0 0 0 round 18px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    clip-path: inset(0 0 0 0 round 18px);
  }
}

@keyframes vm-golgari-understory-reveal {
  0% {
    opacity: 0;
    background-position: 50% 120%;
  }
  100% {
    opacity: 1;
    background-position: 50% 50%;
  }
}

@keyframes vm-golgari-swarm-gather {
  0% {
    opacity: 0;
    transform: scale(0.92);
    letter-spacing: 0.04em;
  }
  55% {
    opacity: 1;
    transform: scale(1.015);
  }
  100% {
    transform: scale(1);
    letter-spacing: 0.01em;
  }
}
```

---

## 5. Component Behavior

### Placement Result Card

**Entrance:** `compost-bloom`  
**Idle:** very slow `root-pulse` only on the selected placement card  
**Hover:** edge spores brighten, border thickens by 1px, no jumpy lift  
**Click:** content compresses downward by 2px, then blooms the next panel upward

```css
.vm-card--golgari {
  background:
    radial-gradient(circle at 18% 8%, rgba(159, 180, 107, 0.16), transparent 30%),
    radial-gradient(circle at 86% 92%, rgba(59, 45, 70, 0.24), transparent 36%),
    linear-gradient(145deg, var(--vm-golgari-soil), var(--vm-golgari-black-rot));
  color: var(--vm-golgari-bone);
  border: 1px solid rgba(159, 180, 107, 0.18);
  box-shadow: 0 18px 48px var(--vm-golgari-shadow-root);
  animation: vm-golgari-compost-bloom var(--vm-golgari-time-root) var(--vm-golgari-ease-root) both;
}

.vm-card--golgari.is-primary {
  animation:
    vm-golgari-compost-bloom var(--vm-golgari-time-root) var(--vm-golgari-ease-root) both,
    vm-golgari-root-pulse 6.8s ease-in-out infinite;
}
```

### Info Panels

Panels should feel like roots unfolding, not cards flipping.

- Panel title rises first.
- Divider grows left-to-right like a root filament.
- Body content fades in by paragraph.
- Canonical cards appear as “spore chips” that gather into rows.

### Maze / Commander Links

Use Golgari CTAs for:
- “Search graveyard engines”
- “Search sacrifice-recursion lines”
- “Search +1/+1 counter inheritance”
- “Search undergrowth-style payoffs”
- “Return to my Golgari dossier”

CTA hover should not glow neon. It should look like fungal light under bark.

### Loading / Thinking State

Use `spore-drift` particles and a dim root pulse around the active query container.

Suggested copy:

> Digging through the undergrowth...

---

## 6. State Map

| State | Animation | Copy Tone |
|---|---|---|
| Unread placement | dormant soil, low opacity moss edge | “A buried signal is waiting.” |
| Active placement | root pulse, spore glints | “The swarm has found your pattern.” |
| Adjacent fit | dim moss ring, no pulse | “Nearby growth, not the core root.” |
| Outbound Maze link | fungal gold edge | “Follow this trail into the Maze.” |
| Return flow | root line draws backward | “Return to the undercity record.” |
| Error/no result | bruised violet fade, no shake | “This path has no living root yet.” |

---

## 7. Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .vm-card--golgari,
  .vm-card--golgari.is-primary,
  .vm-golgari-spore,
  .vm-golgari-panel {
    animation: none !important;
    transition-duration: 1ms !important;
  }
}
```

Avoid:
- fast particle storms
- horror flicker
- pulsing that reads like an alert
- saturated slime green
- skull overload

---

## 8. Implementation Hooks

Suggested class naming:

```txt
vm-theme--golgari
vm-card--golgari
vm-panel--golgari
vm-link--golgari-maze
vm-token--graveyard
vm-token--recursion
vm-token--swarm
vm-token--rot-growth
```

Suggested data attributes:

```html
<section data-vm-identity="golgari" data-vm-motion="compost-bloom">
  ...
</section>
```

---

## 9. Visual Guardrails

Golgari should feel:

- subterranean, not merely dark
- alive, not clean
- patient, not slow because boring
- practical, not spooky for its own sake
- cyclical, not fatalistic
- powerful because it wastes nothing

The page should communicate: **death is not the ending; it is the resource layer.**
