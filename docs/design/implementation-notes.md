# Asset Implementation Notes

## Paths

Use existing project conventions:

```text
/assets/img/backgrounds
/assets/img/textures
/assets/img/overlays
```

The CSS variables live in `/assets/css/tokens.css`:

```css
--asset-bg-home
--asset-bg-archscry
--asset-bg-maze
--asset-bg-apocrypha
--asset-bg-loom
--asset-overlay-fog
--asset-overlay-vignette
--asset-texture-panel
```

## Layering

The existing `.vm-bg` layer now supports transparent overlay assets through `::before` and `::after`. Page-specific UI should stay above this layer with normal DOM content and z-index from the token scale.

For new pages or refactors, the simplest pattern is:

```html
<main class="vm-page-shell" style="--vm-page-bg: var(--asset-bg-apocrypha)">
  <div class="vm-page-content">
    ...
  </div>
</main>
```

## Component Mapping

| Mockup element | Production treatment |
|---|---|
| Top navigation | Existing `vm-topbar` HTML/CSS |
| Search bars | `.vm-search` with real `input` and `button` |
| Mode tabs | `.vm-tabs` / `.vm-tab` |
| Cards and panels | `.vm-panel`, `.vm-result-card`, `.vm-source-card` |
| Filter rail | `.vm-side-rail` |
| Pills and tags | `.vm-chip` |
| Progress/mana bars | `.vm-progress` with inner `.vm-progress__bar` |
| Loom graph | SVG or canvas inside `.vm-loom-graph` |
| Icons | Inline SVG or a future committed icon pack after it is wired into runtime |
| Atmosphere | `/assets/img/overlays/overlay-*.svg` through CSS |
| Textures | `/assets/img/textures/texture-*.svg` as low-contrast CSS backgrounds |

## Raster Generation

The seeded background files are useful placeholders, but only `background-vox-gateway-clean-01.webp` is close to final direction. The page-specific backgrounds should be regenerated from the prompts in `/docs/design/asset-manifest.md`, reviewed against the quality gate, then saved over their target filenames or as `-02`, `-03`, etc.

Do not generate UI screenshots as assets. Generate only environments, materials, atmosphere, and isolated decorative architecture.

## Maintenance

Run this from `C:\dev\projectFiles\voxmana-tools` to regenerate deterministic SVG source assets:

```bash
npm run assets:generate:sources
```

This command recreates local-only icon, overlay, texture, and architecture source candidates. Commit only the assets that are wired into runtime. It does not create painterly WEBP backgrounds.
