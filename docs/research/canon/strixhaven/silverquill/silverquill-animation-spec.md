# Silverquill Animation Spec

**Identity:** Silverquill College
**Schema:** `vox-mana-animation-spec-v1`
**Core axiom:** Words are weapons, shields, contracts, applause, and verdicts; the winning line changes status in public.
**Motion thesis:** A phrase becomes ink, ink becomes status, and status redirects the table.
**Motion model:** `whisper -> stroke -> spotlight -> verdict -> inkling release`

---

## 1. Visual Language

Silverquill should not look like generic Orzhov taxes, generic gothic church UI, or simple black-white contrast.

It should feel like:

- a debate stage where every panel has an audience
- ink strokes that become wings, shields, signatures, and verdict lines
- status marks applied through counters, titles, vows, and public attention
- sharp black-white contrast softened by parchment, silver, plum, and spotlight gold
- rhetoric that can protect, humiliate, command, flatter, or redirect combat

The look should be stylish, competitive, and articulate — not merely sinister.

---

## 2. Palette

| Token | Value | Use |
|---|---:|---|
| `void_ink` | `#070607` | background |
| `stage_black` | `#111015` | background |
| `parchment_white` | `#f2e9d8` | highlight / state |
| `silver_edge` | `#d7d9e2` | highlight / state |
| `ink_shadow` | `#241327` | background |
| `plum_black` | `#3b173f` | background |
| `spotlight_gold` | `#d8b35f` | highlight / state |
| `rose_stage` | `#6e2347` | background |
| `inkling_violet` | `#8f5cff` | background |
| `verdict_white` | `#fff7e8` | highlight / state |
| `blood_ink` | `#7b1e2d` | background |

---

## 3. Keyframes

| Keyframe | Purpose |
|---|---|
| `vm-silverquill-ink-stroke` | Draws calligraphic strokes behind headers and identity sigils. |
| `vm-silverquill-spotlight-snap` | Snaps the active placement card into a stage-lit focus state. |
| `vm-silverquill-verdict-drop` | Drops a thin vertical verdict line before a modal decision or recommendation. |
| `vm-silverquill-status-mark` | Applies a small silver/gold mark to counter, rank, or mentor signals. |
| `vm-silverquill-inkling-release` | Releases subtle wing/ink particles from token or death-conversion panels. |
| `vm-silverquill-rhetoric-ripple` | Moves a social-pressure ripple from the active choice into adjacent recommendations. |
| `vm-silverquill-signature-flourish` | Finishes CTA lines with a fast handwritten flourish. |

---

## 4. Component States

### Placement Card

- **Entrance:** `vm-silverquill-ink-stroke`, then `vm-silverquill-spotlight-snap`
- **Idle:** low-opacity ink shimmer at the card edge
- **Hover:** silver edge brightens; one calligraphic stroke curls behind the title
- **Active:** spotlight glow plus a status mark on the primary identity chip

### Rhetoric Panel

Use a four-beat reveal:

1. Claim appears.
2. Counterclaim slides in.
3. Verdict line drops.
4. Recommendation signs with a flourish.

This should feel like the UI is staging the user’s placement argument, not dumping lore.

### Inkling Token Card

- **Entrance:** `vm-silverquill-inkling-release`
- **Hover:** wing-shaped ink trace expands outward
- **Selected:** token count chip receives a silver status mark

### Maze Link

Show query terms as rhetoric tags:

- `rhetoric`
- `inkling`
- `counter`
- `drain`
- `politics`
- `aura`
- `goad`
- `verdict`

Avoid showing raw operators unless the user opens an advanced view.

---

## 5. Reduced Motion

When `prefers-reduced-motion` is active:

- disable inkling particles
- replace spotlight snap with an opacity fade
- stop looping rhetoric ripple
- preserve static status marks and calligraphic dividers

---

## 6. Anti-Drift Rules

Do not let Silverquill drift into:

- generic Orzhov taxes only
- generic aristocrats only
- gothic church / vampire aesthetic only
- Azorius law UI
- Rakdos performance chaos
- flat black-and-white checkerboard styling

Silverquill is rhetoric under pressure: public, stylish, competitive, and socially sharp.
