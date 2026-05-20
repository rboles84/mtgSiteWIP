# Witherbloom Animation Spec

Generated: 2026-05-18

## Intent

Witherbloom animation should feel like **life and death exchanging mass inside a living bog**.

It is not generic green growth and it is not generic black necromancy. It is:
- swamp bioluminescence
- cauldron vapor
- Pest swarms
- herbs, tinctures, roots, rot, fungal bloom
- life-drain pulses
- bodies becoming resources
- growth that looks fertile, sticky, and slightly wrong

## Motion Thesis

> A Witherbloom screen should look like an ecosystem doing accounting.

Every movement should answer one of these questions:

1. What is being consumed?
2. What is being fed?
3. What grows because something else diminished?
4. What small body becomes useful by dying?
5. What does the bog remember?

## Palette Tokens

```css
:root {
  --witherbloom-black: #11100d;
  --witherbloom-bog: #1d2618;
  --witherbloom-moss: #506b34;
  --witherbloom-venom: #95b957;
  --witherbloom-pest-glow: #c8e06d;
  --witherbloom-bone: #d7ccb2;
  --witherbloom-bloodsap: #6b261f;
  --witherbloom-fog: rgba(210, 224, 174, 0.16);
  --witherbloom-shadow: rgba(4, 8, 4, 0.72);
}
```

## Animation Layers

| Layer | Purpose | Motion | Notes |
|---|---|---|---|
| Bog base | Living ground | Slow parallax drift, 80-120s loop | Should be barely visible |
| Root lattice | Structural identity | Thin root lines creep outward, then recede | Maps to life/death exchange |
| Pest motes | Mascot/familiar signal | Tiny clustered swarms, jitter + flock | Avoid looking like generic fireflies |
| Cauldron vapor | Witchcraft/brewing | Vertical curl, dissolve, re-form | Good for loading and transition states |
| Drain pulse | Mechanical identity | Radial pulse from user choice to result card | Use when life-gain/drain archetype appears |
| Spore bloom | Result reveal | Organic burst, then settle into moss pattern | Softer than explosive Prismari/Rakdos |
| Sacrifice flicker | Cost/payment | One mote extinguishes, three dim motes brighten | Avoid gore; represent exchange |
| Herbarium overlay | Scholarly Strixhaven feel | Faint specimen labels and leaf diagrams | Use sparingly in dossier mode |

## Interaction States

### Idle

- slow bog breathing
- faint pest motes near lower corners
- almost no camera movement
- low contrast

### Hover

- local moss glow under card/action
- root line connects hovered item to nearby metadata
- one or two motes drift toward the hovered element

### Select

- drain pulse moves from action to result
- selected item receives a small bioluminescent ring
- background roots briefly thicken

### Result Reveal

1. background darkens by 8-12%
2. cauldron vapor curls upward
3. spore bloom expands behind placement card
4. Pest motes orbit for 900ms
5. final state settles into faint root lattice

### Link Out / Maze Search

- use a small "specimen jar" transition
- selected placement/query compresses into a glowing seed or vial
- vial travels toward the outbound link target

## Component Patterns

### Placement Card

- Border: uneven root-thread border, not neon frame.
- Active signal: pulse in moss/venom, 1.8s loop.
- Deep-dive affordance: small cauldron bubble or pest mote.

### Info Panels

- Open: vertical unfurl, like a damp field note page.
- Close: fold downward into the bog.
- Error/empty: show a dim specimen tag, not a red alert.

### Matrix / Card Anchors

- Hovering a card anchor should create one of four glyph hints:
  - `life-gain`
  - `drain`
  - `pest`
  - `sacrifice`
- Avoid full-card flip animations unless showing card art.

## Timing

| Event | Duration | Easing |
|---|---:|---|
| Hover glow | 120-180ms | ease-out |
| Select drain pulse | 520-760ms | cubic-bezier(.2,.8,.2,1) |
| Spore bloom | 900-1200ms | ease-out then ease-in |
| Pest swarm drift | 6-14s | random/noise loop |
| Bog breathing | 12-18s | sinusoidal |
| Panel unfurl | 240-360ms | cubic-bezier(.16,1,.3,1) |

## Accessibility

- Provide `prefers-reduced-motion` handling.
- In reduced motion:
  - keep static moss/cauldron treatment
  - replace swarms with fixed faint dots
  - use opacity transitions only
- Avoid fast flicker, high-contrast strobe, or insect-like motion that overwhelms the page.

## Do

- Make Witherbloom feel tactile, damp, alive, academic, and a little gross.
- Use growth and decay as the same visual sentence.
- Let tiny bodies matter.
- Keep Strixhaven field-study notes visible enough to separate it from Golgari Swarm.

## Don't

- Do not make it pure graveyard horror.
- Do not use generic skull smoke as the primary motif.
- Do not make it clean forest magic.
- Do not turn every animation into bugs crawling everywhere.
- Do not visually collapse it into Golgari.
