# Rakdos Animation Spec

Generated: 2026-05-18  
Faction: Rakdos Cult  
Purpose: motion/visual language for Rakdos placement cards, dossier panels, Maze links, deck-start cards, and transition states.

## Core Read

Rakdos motion should feel like a performance that becomes dangerous once the audience reacts.

Not generic chaos. Not random evil. Rakdos is **pressure, appetite, spectacle, risk, laughter, pain, and immediate consequence** staged in public.

## Motion Thesis

1. **Invitation** — a stage light, ember, or curtain movement pulls attention.
2. **Transgression** — the UI breaks symmetry or restraint.
3. **Impact** — a sharp pulse, cut, flame snap, or damage flash lands.
4. **Afterimage** — smoke, ash, echo, or blood-red glow remains briefly.
5. **Encore** — hover/selection can repeat, but never as a calm loop.

## CSS Design Tokens

```css
:root {
  --rakdos-black: #090506;
  --rakdos-ink: #15080b;
  --rakdos-blood: #8f101c;
  --rakdos-crimson: #c51f2f;
  --rakdos-ember: #ff4b26;
  --rakdos-gold-sick: #c08a2d;
  --rakdos-ash: #b9aaa3;
  --rakdos-smoke: rgba(18, 8, 10, 0.72);

  --rakdos-glow-soft: 0 0 18px rgba(197, 31, 47, 0.34);
  --rakdos-glow-hot: 0 0 28px rgba(255, 75, 38, 0.52);
  --rakdos-shadow-stage: 0 18px 48px rgba(0, 0, 0, 0.55);

  --rakdos-ease-cut: cubic-bezier(.2, .9, .1, 1);
  --rakdos-ease-lurch: cubic-bezier(.7, -.35, .2, 1.35);
  --rakdos-ease-smoke: cubic-bezier(.16, 1, .3, 1);
}
```

## Animation Hooks

| Hook | Use | Visual Behavior |
|---|---|---|
| `stage-collapse` | catastrophic sacrifice / Rakdos the Defiler | Panel drops 2–4px, red underglow flashes, ash rises |
| `bloodlight-gate` | life-loss gate / cost collapse | Border darkens, then opens with a red left-to-right pulse |
| `curtain-fire` | showstopper reveal | Curtain-like gradient parts; sparks cut across center |
| `solo-spotlight` | Judith / diva cards | A narrow red spotlight sweeps onto title and holds |
| `counter-spark` | unleash / counters | Small +1 sparks orbit once, then lock into corner badge |
| `hand-ash-fall` | discard / hellbent | Card text briefly desaturates; ash particles fall downward |
| `knife-cut` | removal | Diagonal slash mask reveals crimson edge for 120–180ms |
| `spark-chain` | sacrifice pings | Tiny ember travels from cost/source to payoff badge |
| `stage-lamp-pop` | impulse draw / spectacle | Top glow pops on, reveals secondary action link |
| `gate-glow` | mana base / breadcrumb | Slow gate outline pulse, low intensity only |

## Component States

### Placement Card

| State | Motion |
|---|---|
| `idle` | Very low ember breathing, 6–8s loop, opacity under 0.18 |
| `hover` | Spotlight edge enters from top-left, scale 1.01 max |
| `selected` | Two-beat pulse: crimson then ember; title gains hot underline |
| `expanded` | Curtain reveal downward; section content appears with staggered 40ms delay |
| `leaving` | Smoke wipe; remove glow first, then content |

### Dossier Panel

- Use slower motion than placement cards.
- Treat headings as stage placards.
- Use a brief red shimmer on active section, but keep body text steady.
- Never animate long reading text continuously.

### Maze / Search Link Cards

Rakdos outbound links should feel like **doors into dangerous rooms**.

- Hover: gate outline brightens.
- Focus: add visible high-contrast outline; do not rely on red alone.
- Click: single spark burst and quick compress/release.

## Timing

| Motion Type | Duration |
|---|---:|
| Micro hover | 120–180ms |
| Impact flash | 90–140ms |
| Curtain reveal | 260–420ms |
| Panel expand | 280–520ms |
| Background ember loop | 6000–8000ms |

## Reduced Motion Rules

For `prefers-reduced-motion: reduce`:
- Disable particles, shake, lurch, and loops.
- Replace movement with color/opacity changes.
- Keep focus indicators.
- Keep selection pulse to one opacity transition under 180ms.

```css
@media (prefers-reduced-motion: reduce) {
  [data-faction="rakdos"] * {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 120ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Anti-Drift Guardrails

Rakdos animation should not become:
- Halloween-only horror
- Random glitch chaos
- Generic demon metal
- Overly gory literal blood effects
- Constant screen shake
- Red/black without theater

Keep the feeling: **a public show where pain, attention, appetite, and consequence convert into momentum.**
