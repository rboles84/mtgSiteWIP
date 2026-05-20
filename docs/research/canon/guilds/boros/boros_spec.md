# Boros Sigil Animation Spec

**Elements (IDs)**
- `core` — white central circle
- `ring1`, `ring2` — concentric rings
- `spoke1..spoke4` — four red radiating spokes
- `shieldOverlay` — shield overlay for hardiness flash
- `emberGlow` — ember particle for trail

**Timing**
- **Pulse duration:** 220ms (CSS var `--pulse-duration`)
- **Trail decay:** 600ms (CSS var `--trail-decay`)
- **Battalion glow:** 180–700ms window (intense glow)
- **Hardiness flash:** 600ms fade (keyframe `hardiness-fade`)

**Easing**
- Use `cubic-bezier(.4,0,.2,1)` for pulse transitions.

**API (JS)**
- `pulseSpoke(index)` — single spoke pulse; index 0..3
- `triggerBattalion()` — full-burst glow across spokes + ember trail
- `setHardiness(durationMs)` — show shield overlay and fade
- `extraCombatPulse()` — double pulse for extra combat visual

**Usage examples**
- On attack: `Sigil.pulseSpoke(attackerIndex)`
- When Battalion threshold reached: `Sigil.triggerBattalion()`
- When indestructible flag applied: `Sigil.setHardiness(800)`
- For extra combat: `Sigil.extraCombatPulse()`

**Integration**
- Embed SVG inline in HTML to allow `document.getElementById` access.
- Include `animation.css` in page head and `animation.js` after the SVG.
- Use CSS variables to tune intensity and durations per theme.
