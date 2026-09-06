# Vox Mana Asset Manifest

Source mockups: `C:\dev\projectFiles\mtgSite\UI Files\redesign Images\site pages`

The mockups are reference art only. Do not load them directly in production pages. Real UI must be rebuilt in HTML, CSS, SVG, or canvas.

## Current public background policy (VM-635)

Public routes use a black base with existing procedural stars, glows, textures, and overlays. Images in `assets/img/backgrounds/` and the existing top-level `vox-mana-hero-*` / `blind-eternities-hero-*` JPG, WEBP, and AVIF families are dormant rollback assets; their page, responsive, CSS, preload, and social references are retired. This selection is not recursive. The entire `identity-hero/` folder, official artwork, Scryfall/card rendering, mappings, credits, and fallbacks remain unchanged.

Social previews use `/assets/img/social/vox-mana-share-v1.png` (1200x630), rendered from the neighboring authored SVG using committed fonts and the existing vector sigil, without image generation. Rebuild with `node scripts/build/build-social-preview.mjs` and `@napi-rs/canvas` available (or set `VM_CANVAS_MODULE` to its installed module directory). No runtime dependency is added.

For rollback, restore only the background sources, background CSS values, and share metadata from the VM-635 admission baseline recorded on its card; advance cache keys. Do not restore whole route files over later changes. VM-634's philosophy strip must remain hidden.

The following inventory and background generation queue are historical design records, not instructions to reactivate or generate backgrounds.

## Preserved Workspace Assets

| Asset | Status | Notes |
|---|---|---|
| `/assets/img/backgrounds/background-vox-gateway-clean-01.webp` | Seeded | Copied from existing clean `vox-mana-hero-2560w.webp`. Good first-pass home/global background. |
| `/assets/img/backgrounds/background-archscry-chamber-clean-01.webp` | Seeded | Copied from existing clean `blind-eternities-hero-1672w.webp`. Needs final Archscry-specific image pass. |
| `/assets/img/backgrounds/background-maze-chamber-clean-01.webp` | Seeded | Copied from existing clean `blind-eternities-hero-1672w.webp`. Needs final Maze-specific image pass. |
| `/assets/img/backgrounds/background-apocrypha-library-clean-01.webp` | Seeded | Copied from existing clean `blind-eternities-hero-1672w.webp`. Needs final Apocrypha library image pass. |
| `/assets/img/backgrounds/background-loom-thread-chamber-clean-01.webp` | Seeded | Copied from existing clean `blind-eternities-hero-1672w.webp`. Needs final Loom-specific image pass. |
| Token-referenced overlay SVGs | Ready | Transparent CSS overlay sources used by the shared atmosphere layer. Export to PNG only if a renderer or CDN pipeline requires raster. |
| Token-referenced texture SVGs | Ready | Tileable SVG texture sources used by shared panels and regions. Export to WEBP after art direction is locked if desired. |

## Archived Preview Assets

VM-144 moved obsolete preview-era CSS/JS out of active `assets/` paths and into `docs/research/archive/vm144-stale-preview-assets/`.

| Former active asset | Current status | Notes |
|---|---|---|
| `/assets/css/archscry-atlas.css` | Archived | Proven obsolete after `/archscry/index2.html` was removed. |
| `/assets/js/archscry-index2.js` | Archived | Proven obsolete after `/archscry/index2.html` was removed and removed from the JS lint target list. |
| `/assets/css/home-preview.css` | Archived | Proven obsolete after `newIndex.html` was removed. |
| `/assets/js/home-preview.js` | Archived | Proven obsolete after `newIndex.html` was removed. |

The canonical Home route is `index.html`. Its route-local assets are `/assets/css/home.css` and `/assets/js/home.js`. Any remaining legacy preview-era names belong to historical records only.

## Background Generation Queue

Use the global negative prompt for every background:

```text
UI, UX, HUD, interface, icons, buttons, text, letters, numbers, watermark, logo, menu, navigation, search bar, input field, card, panel, border, frame, glowing dots, particles, floating artifacts, digital dust, bokeh, lens flare, wireframe, abstract geometry, random lines, fake symbols, clutter, busy patterns, messy geometry, over-complication, cartoon, plastic, low resolution, blurry inpainting, smudges, ghost artifacts, duplicated architecture, impossible stairs, nonsensical windows, unreadable shapes
```

| Target file | Prompt |
|---|---|
| `background-vox-gateway-clean-01.webp` | Faithful scrubbed version of the three-door gateway mockup; preserve central citadel, left/right destination architecture, teal sky, warm gold lighting, wet stone floor; remove all UI, text, cards, frames, dots, icons, and HUD ornaments; rebuild with natural architecture and calm overlay zones. |
| `background-vox-gateway-clean-02.webp` | Cleaner architecture version; simplify side walls into readable gothic/library structures, keep the central portal and city silhouette, reduce tiny light speckles and abstract lines. |
| `background-vox-gateway-clean-03.webp` | Open center-space version; preserve horizon and central threshold but leave a darker calm midground for HTML cards and hero copy. |
| `background-vox-gateway-clean-04.webp` | Stronger left/right destination zones; left reads as library/archway, right reads as vault/maze doorway, both environmental rather than UI cards. |
| `background-vox-gateway-clean-05.webp` | Darker cinematic version; deeper vignette, stronger candlelight reflections, restrained teal sky, no artificial star clutter. |
| `background-apocrypha-library-clean-01.webp` | Empty archive/library view with towering shelves, warm candlelight, teal night sky glimpsed through upper arches, central calm reading space, no UI or text. |
| `background-apocrypha-library-clean-02.webp` | Archive with clean central research table area, shelves on both sides, bronze and obsidian materials, removed panels naturally rebuilt as bookshelves and stone. |
| `background-apocrypha-library-clean-03.webp` | Right-side library doorway/vault focus, purple undertone kept subtle, doorway and stacks isolated enough for CSS content on left. |
| `background-apocrypha-library-clean-04.webp` | Source wall / research shelf background, believable shelves and drawers, no fake cards, no labels, no badges, moderate detail density. |
| `background-apocrypha-library-clean-05.webp` | Dark scholarly background with high shelves, candles, vellum/stone surfaces, broad quiet center for search/results UI. |
| `background-maze-chamber-clean-01.webp` | Empty question chamber based on Maze search mockups, symmetrical columns, central glowing doorway, polished black floor, no search bar or filters. |
| `background-maze-chamber-clean-02.webp` | Maze-like arcane hall with architectural labyrinth floor patterns, all lines carved into stone rather than HUD graphics. |
| `background-maze-chamber-clean-03.webp` | Calm central form placement area, side columns present, center slightly darker and less detailed for real search UI. |
| `background-maze-chamber-clean-04.webp` | Symbolic but non-UI architecture: bronze inlaid arches, central portal, purposeful maze masonry, no floating nodes or fake graph lines. |
| `background-maze-chamber-clean-05.webp` | Result-state background with more depth, darker upper band for filters, lower hall suitable behind card grids. |
| `background-archscry-chamber-clean-01.webp` | Self-discovery chamber with side pillars and distant citadel, preserving Archscry teal/gold lighting, no question cards or progress UI. |
| `background-archscry-chamber-clean-02.webp` | Portal/scrying pool area with circular floor inlay and central threshold, calm central panel zone, no console or input box. |
| `background-archscry-chamber-clean-03.webp` | No-search/no-answer state background, open ceremonial hall, large quiet left text zone and right panel zone. |
| `background-archscry-chamber-clean-04.webp` | Search/results state background with side arches, darker middle, clear floor reflections, no bars or text. |
| `background-archscry-chamber-clean-05.webp` | Mystical identity analysis background, elegant throne/threshold silhouette, blue-white accent glow, no mana bars or labels. |
| `background-loom-thread-chamber-clean-01.webp` | Conceptual thread chamber with architectural radial floor and distant arches, no graph UI, no nodes, no labels. |
| `background-loom-thread-chamber-clean-02.webp` | Web of connections represented as carved pathways, bridges, and illuminated corridors, not floating lines. |
| `background-loom-thread-chamber-clean-03.webp` | Clean center area for Loom results, side alcoves for panels, restrained teal/bronze lighting. |
| `background-loom-thread-chamber-clean-04.webp` | Selected concept focus area with central raised dais, surrounding architectural branches, no fake icons. |
| `background-loom-thread-chamber-clean-05.webp` | Related-thread visual theme: archive hall with branching doorways and shelves, subdued enough for real SVG/canvas graph overlay. |

## Texture Source Queue

The repo currently keeps only the texture sources referenced by runtime tokens. If image-generated raster textures are desired, generate WEBP versions using these same names with `.webp`.

| Target file | Prompt |
|---|---|
| `texture-stone-citadel-seamless-01.webp` | Seamless orthographic dark citadel stone, carved but subtle, no symbols, uniform lighting. |
| `texture-parchment-dark-seamless-01.webp` | Seamless dark magical parchment, charcoal brown fibers, faint age variation, no writing. |
| `texture-obsidian-polished-seamless-01.webp` | Seamless polished obsidian with soft blue-black reflections, flat view, not glossy plastic. |
| `texture-misty-sky-seamless-01.webp` | Seamless misty teal night-sky cloud texture, soft and low contrast, no stars or particles. |
| `texture-library-wall-seamless-01.webp` | Seamless weathered library wall: dark wood, shelf shadow, stone seams, no books with readable spines. |
| `texture-coastal-cliff-stone-seamless-01.webp` | Seamless coastal cliff stone, cold slate, damp mineral texture, no perspective. |
| `texture-arcane-metal-trim-seamless-01.webp` | Seamless aged bronze/blackened-gold trim material, subtle scratches, no glyphs. |
| `texture-vellum-soft-seamless-01.webp` | Seamless soft vellum paper, warm ivory, light fiber grain, no stains shaped like text. |
| `texture-aged-bronze-seamless-01.webp` | Seamless aged bronze patina, dark gold with oxidation, uniform lighting. |
| `texture-cracked-marble-seamless-01.webp` | Seamless cracked black marble with faint gold veining, restrained, tileable. |

## Overlay Source Queue

The repo currently keeps only the overlay sources referenced by runtime tokens. Export to PNG only if the runtime or image pipeline requires raster alpha.

| Target file | Prompt |
|---|---|
| `overlay-fog-soft-01.png` | Transparent PNG soft fog layer, edge-to-edge, no particles, no bright dots, no hard shapes. |
| `overlay-low-mist-01.png` | Transparent low floor mist for bottom third of viewport, subtle grey-blue alpha only. |
| `overlay-arcane-glow-teal-01.png` | Transparent broad teal glow bloom for upper center sky/portal areas, no lens flare. |
| `overlay-vignette-shadow-01.png` | Transparent dark vignette with soft corners and topbar legibility shadow. |
| `overlay-atmospheric-haze-clean-01.png` | Transparent atmospheric haze, dust-free, smooth depth wash. |
| `overlay-nebula-sky-glow-01.png` | Transparent faint blue nebula wash, broad cloudy gradients, no stars. |
| `overlay-coastal-blue-haze-01.png` | Transparent cool blue haze for watery/cliff variants, soft and reusable. |
| `overlay-library-warm-light-01.png` | Transparent warm candle/library light spill from side edges, no visible flame shapes. |

## Architecture Fragment Queue

Architecture fragments are reference candidates, not active runtime assets. Use image generation only when a painterly transparent PNG is needed.

| Target file | Prompt |
|---|---|
| `architecture-arch-left-01.png` | Isolated left gothic archway, black stone and bronze inlay, transparent background, readable silhouette. |
| `architecture-doorway-library-right-01.png` | Right-side library doorway with shelves and warm light, transparent background, no text. |
| `architecture-citadel-edge-01.png` | Vertical citadel wall edge with spires, transparent background, usable as side framing. |
| `architecture-column-ancient-01.png` | Ancient dark stone column with subtle gold wear, isolated, no symbols. |
| `architecture-divider-carved-01.png` | Horizontal carved divider bar, bronze/obsidian, no text, minimal ornament. |
| `architecture-portal-frame-01.png` | Circular portal frame as physical metal/stone object, transparent background, no HUD rings. |
| `architecture-balcony-silhouette-01.png` | Dark balcony silhouette with small warm lamps, transparent background. |
| `architecture-cliff-edge-01.png` | Jagged cliff edge silhouette, teal rim light, transparent background. |
| `architecture-staircase-edge-01.png` | Stone staircase edge/riser fragment, wet reflective black stone, transparent background. |
| `architecture-doorway-mystical-01.png` | Central mystical doorway with warm interior light, clean silhouette, no fake glyph UI. |

## Icon Set

These icon concepts are reference candidates. Commit an icon pack only after the runtime actually loads it.

| File | Concept |
|---|---|
| `icon-archscry-symbol.svg` | Eye/threshold/scrying aperture, simple concentric geometry. |
| `icon-apocrypha-symbol.svg` | Hidden vault keyhole or sealed archive mark, purple-capable accent. |
| `icon-maze-symbol.svg` | Circular maze/compass hybrid, readable at 16px. |
| `icon-loom-symbol.svg` | Loom shuttle or connected arc nodes, simple enough for graph controls. |
| `icon-scrying-search.svg` | Magnifier plus small star aperture, no text. |
| `icon-placement-guild.svg` | Shield/rosette mark for guild placement. |
| `icon-related-threads.svg` | Three connected dots or braided thread path, non-HUD. |
| `icon-sources.svg` | Book/page stack, simple outline. |
| `icon-lore-archive.svg` | Archive box or shelf mark. |
| `icon-query-interpretation.svg` | Small syntax bracket/compass mark, avoid letters. |

## Quality Gate

An asset can be marked production-ready only when:

- No fake UI, text, buttons, labels, frames, search bars, cards, HUD marks, random glowing dots, card grids, or graph lines remain.
- Removed areas are rebuilt as believable sky, shelves, stone, doorway, fog, floor, or masonry.
- Perspective, horizon, lighting direction, and major silhouettes still match the mockup direction.
- There is enough calm space for real HTML/CSS overlays.
- It works at desktop size and crops safely on mobile.
- The file name describes one clear purpose.
