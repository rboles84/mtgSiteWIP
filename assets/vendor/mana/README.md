# Mana Font Runtime Assets

Vox Mana vendors the runtime subset of [andrewgioia/Mana](https://github.com/andrewgioia/Mana) from the npm package `mana-font@1.18.0`.

Included files:

- `css/mana.min.css`
- `fonts/mana.eot`
- `fonts/mana.svg`
- `fonts/mana.ttf`
- `fonts/mana.woff`

The package documentation, source SVG library, source maps, Sass/LESS files, unreferenced WOFF2 file, and MPlantin font are not included because Maze only needs the compiled Mana symbol stylesheet and the Mana font files referenced by it.

Licensing from the upstream package README:

- Mana font files: SIL Open Font License 1.1.
- Mana CSS, LESS, and Sass: MIT License.

Source package metadata identifies version `1.18.0` and repository `https://github.com/andrewgioia/mana.git`. Runtime files must remain local; do not replace this pin with a CDN or `latest` URL.
