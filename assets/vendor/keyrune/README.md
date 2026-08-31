# Keyrune Runtime Assets

Vox Mana vendors the runtime subset of [andrewgioia/Keyrune](https://github.com/andrewgioia/Keyrune) from Keyrune `3.19.0`.

Included files:

- `css/keyrune.min.css`
- `fonts/keyrune.eot`
- `fonts/keyrune.svg`
- `fonts/keyrune.ttf`
- `fonts/keyrune.woff`
- `fonts/keyrune.woff2`
- `LICENSE.md`

The source SVG library, documentation site, LESS sources, source map, and build tooling are not included because Vox Mana only needs the compiled set-symbol stylesheet and the font files referenced by it.

The runtime files were extracted from the owner-supplied `keyrune-master.zip`. The source archive reported version `3.19.0` and SHA-256 `FCFCB2C1AAC11E2D521809B2613559C3753677EDB2863802D3D46319FFA70F5E`.

Licensing from the upstream package:

- Keyrune font files: SIL Open Font License 1.1.
- Keyrune icons and code: GPL 3.0.

Keep runtime files local. Do not replace this pin with a CDN or `latest` URL. When upgrading, replace the compiled CSS and every font file together, record the new version and source-archive checksum here, and verify all live `ss-*` classes before removing the previous pin.
