# Vox Mana Self-Hosted Fonts

The live typography stack is:

- Display: Fraunces
- Body: Spectral, with Source Serif 4 as fallback
- Labels: IBM Plex Mono

## Spectral

Spectral WOFF2 files were sourced from the Google Fonts CSS endpoint for:

`https://fonts.googleapis.com/css?family=Spectral:400,600,400italic&display=swap`

The downloaded subsets are Latin and Latin Extended for normal 400, normal 600, and italic
400. Spectral is distributed under the SIL Open Font License 1.1 in the Google Fonts
repository.

Metric overrides are not copied from Source Serif 4. If future layout QA shows Spectral
needs overrides, compute Spectral-specific values and verify CLS/browser rendering before
shipping them.
