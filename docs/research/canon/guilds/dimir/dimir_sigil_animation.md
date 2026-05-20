3) Sigil animation spec (matching Dimir)
Design intent: “you only see the sigil when it chooses to be seen” (Dimir insignia + secrecy motif). [scryfall.com], [mtg.fandom.com]
Visual language

palette

primary: #0B1020 (near-black blue)
secondary: #1B2A4A (ink blue)
accent: #7B3FF2 (violet “psychic”)
highlight: #BDE7FF (cold scanline)


geometry

base: circular seal with a fractured inner ring (implies broken memory loops)
core glyph: stylized “eye / keyhole” negative space
microtext ring: unreadable runes (never fully resolves; implies misinformation)


materials

matte ink + subtle specular edge, like wet lacquer revealed by angled light
“chromatic aberration” on accent edges (violet/blue split)



Motion / timing (2.6s loop, seamless)

t=0.00–0.35 “nonexistence”

glyph hidden; only faint noise in alpha (0–6%)


t=0.35–0.85 “emergence”

radial mask wipe reveals seal from 240°→360° (counterclockwise)
ease: cubic-bezier(0.2, 0.9, 0.2, 1.0)


t=0.85–1.40 “cipher lock”

3 concentric rings rotate at different speeds (±6° total)
short “glitch stutter” at t=1.10 (2 frames)


t=1.40–2.10 “surveil scan”

horizontal scanline passes top→bottom
particles: 12–18 “ink motes” drift outward, fade on lifetime (0.3–0.6s)


t=2.10–2.60 “redaction”

inverse mask collapses toward the keyhole center
leave behind 1-frame afterimage (ghost stamp), then zero



FX notes

noise: 8-bit dither in alpha channel only (keeps edges clean)
blur: use minimal gaussian blur (0.6–1.2px) on glow, not on glyph
accessibility

avoid high-frequency flashes; glitch is 2 frames max, single event per loop
provide “reduced motion” mode: freeze at “cipher lock” state with subtle breathing opacity (±3%)



Export targets

SVG + Lottie (primary)
MP4/WEBM loop (fallback)
single-frame PNG stamp (docs watermark)