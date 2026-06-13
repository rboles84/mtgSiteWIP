# Quandrix Animation Spec

**Identity:** Quandrix College
**Schema:** `vox-mana-animation-spec-v1`
**Core axiom:** Reality is an equation that can be grown, copied, doubled, and proven by scale.
**Motion thesis:** A question becomes a variable, then the variable becomes visible proof.
**Motion model:** `question -> variable -> proof -> scale break -> materialized theorem`

---

## 1. Visual Language

Quandrix should not look like generic Simic biology, generic wizard school UI, or raw math homework.

It should feel like:

- a blackboard/grid that slowly resolves into usable structure
- water, glass, and chalk-light meeting living green growth
- geometry that becomes creature mass
- tokens and counters multiplying through visible recursive steps
- a question becoming a proof the user can click

The look should be elegant, curious, and strange — not sterile.

---

## 2. Palette

| Token | Value | Use |
|---|---:|---|
| `void_ink` | `#050b12` | page depth / background |
| `deep_pool` | `#0b2230` | panel base |
| `blackboard` | `#10231f` | theorem surfaces |
| `theorem_blue` | `#2f8fd6` | primary blue signal |
| `fractal_cyan` | `#67d8ff` | proof lines / hover glow |
| `growth_green` | `#55c96f` | counter/growth states |
| `leyline_green` | `#9be074` | land/ramp states |
| `chalk` | `#d9f6ef` | body text / labels |
| `golden_ratio` | `#d7c072` | rare emphasis / math highlight |

---

## 3. Keyframes

| Keyframe | Purpose |
|---|---|
| `vm-quandrix-grid-resolve` | Background grid resolves from scattered points. |
| `vm-quandrix-variable-assign` | Chips/answers snap into labeled variable slots. |
| `vm-quandrix-fractal-bloom` | Token/counter panels scale outward in recursive rings. |
| `vm-quandrix-proof-line` | Thin theorem line draws under headings and CTAs. |
| `vm-quandrix-double-pulse` | Doubling/copy state duplicates along an offset vector. |
| `vm-quandrix-scale-break` | Big-mana or eight-land thresholds expand the panel. |
| `vm-quandrix-chalk-drift` | Subtle chalk particles for inactive theorem notes. |

---

## 4. Component States

### Placement Card

- **Entrance:** `vm-quandrix-grid-resolve`, then `vm-quandrix-proof-line`
- **Idle:** low-opacity recursive grid shimmer
- **Hover:** variable chips offset by 2px, cyan edge, green underglow
- **Active:** double-pulse on the core identity sigil

### Proof Panel

Use a three-beat reveal:

1. Question appears.
2. Variables snap into labeled positions.
3. Conclusion line draws in.

This should feel like the UI is solving the user’s placement, not dumping lore.

### Fractal Token Card

- **Entrance:** `vm-quandrix-fractal-bloom`
- **Hover:** one recursive outline grows outward
- **Selected:** outer ring doubles and settles

### Maze Link

Show query terms as theorem tags:

- `solve`
- `scale`
- `double`
- `replicate`
- `materialize`

Avoid showing raw operators unless the user opens an advanced view.

---

## 5. Reduced Motion

When `prefers-reduced-motion` is active:

- disable recursive blooms
- disable grid shimmer
- disable chalk drift
- replace double-pulse with a static doubled outline
- keep proof-line separators and clear state changes

---

## 6. Drift Guardrails

Do not let Quandrix drift into:

- **Generic Simic:** no slime-only biology, no mutation soup without math/pattern language
- **Izzet:** no lightning-lab chaos as the primary visual
- **Azorius:** no law-grid severity or bureaucracy language
- **Silverquill:** no calligraphy-as-main motif
- **Boring math class:** avoid dense formulas as decorative noise

Quandrix should feel like wonder, recursion, scale, and proof.
