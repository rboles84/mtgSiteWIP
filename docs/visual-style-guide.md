# Vox Mana Visual Style Guide

## Direction

Vox Mana should feel like a dark arcane archive built inside impossible gothic architecture: black stone, bronze trim, teal-blue sky glow, warm candlelight, polished wet floors, shelves, portals, citadels, and threshold chambers.

The site should not feel like a sci-fi dashboard. Use physical architecture and material surfaces for visual identity. Use real HTML/CSS/SVG for all interface behavior.

## Color And Materials

- Base: `--bg`, `--bg-2`, `--bg-3`, `--graphite`
- Gold: `--gold`, `--gold-l`, `--gold-quiet`
- Cool accent: `--teal`, `--teal-l`, `--teal-bg`
- Text: `--text`, `--text-dim`, `--text-muted`
- Materials: dark citadel stone, polished obsidian, aged bronze, dark parchment, vellum, weathered library wall, cracked marble.

## Page Languages

- Home: three destinations, central threshold, left/right architectural zones, broad cinematic view.
- Archscry: self-discovery chamber, scrying aperture, side pillars, teal/gold ceremonial light.
- Maze: application workspace inside an arcane hall, strong search/filter affordances, background kept quieter.
- Apocrypha: library/archive, shelves, research walls, warm scholarly light, purple only as a restrained hidden-vault accent.
- Loom: related concepts represented by architecture, carved pathways, SVG/canvas graph overlays, not baked image nodes.

## Scrub Rules

Remove from generated backgrounds: nav bars, search inputs, panels, labels, text, card grids, progress bars, graph nodes, badges, fake frames, HUD lines, glowing dot fields, random geometry, and decorative interface chrome.

Keep in image assets: architecture, shelves, portals, doors, stone, fog, sky, candlelight, silhouettes, floor reflections, calm areas for real content.

## Component Treatment

Use the shared classes in `/assets/css/components.css` as the baseline. Buttons, panels, tabs, search fields, chips, progress tracks, result cards, source cards, and side rails are CSS components. Icons are SVG with `currentColor`.

Cards and panels should have dark translucent surfaces, 1px gold/teal borders, 4-8px radii at most, and restrained shadows. Avoid nested cards and avoid decorative screenshots of UI.
