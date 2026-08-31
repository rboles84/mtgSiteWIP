# Vox Mana Self-Hosted Fonts

Vox Mana presents ancient knowledge through a modern instrument. Each active family has one
semantic role:

- Brand: Cormorant SC
- Expression and destination identity: Almendra
- Reading: Lora
- Interface: Outfit
- Technical utility: IBM Plex Mono

All production faces are local WOFF2 files loaded with `font-display: swap`. The live site does
not request Google Fonts, Adobe Fonts, or another font CDN at runtime. Google Fonts' official
repository and CSS service are used only as download and provenance sources.

The current subset strategy follows Google Fonts' Latin and Latin Extended divisions. Together
they cover Basic Latin, Latin Extended used by current content, standard punctuation, curly
quotes/apostrophes, dashes, ellipsis, arrows, and commonly used comparison characters. Mana and
other game iconography continue to use the repository's dedicated icon assets rather than text-font
substitution.

## Cormorant SC

- Vox Mana role: brand only
- Designer: Christian Thalmann / The Cormorant Project Authors
- Official source: <https://github.com/google/fonts/tree/main/ofl/cormorantsc>
- Download source: Google Fonts CSS2 WOFF2 response, family version `v19`
- License: SIL Open Font License 1.1; local notice in `cormorant-sc-OFL.txt`
- Retrieved: 2026-08-30
- Static faces shipped:
  - `cormorant-sc-700-latin.woff2` - 700 normal, Latin
  - `cormorant-sc-700-latin-ext.woff2` - 700 normal, Latin Extended

## Almendra

- Vox Mana role: expression and important destinations
- Designer: Ana Sanfelippo
- Official source: <https://github.com/google/fonts/tree/main/ofl/almendra>
- Download source: Google Fonts CSS2 WOFF2 response, family version `v28`
- License: SIL Open Font License 1.1; local notice in `almendra-OFL.txt`
- Retrieved: 2026-08-30
- Static faces shipped:
  - `almendra-400-latin.woff2` - 400 normal, Latin
  - `almendra-400-latin-ext.woff2` - 400 normal, Latin Extended
  - `almendra-700-latin.woff2` - 700 normal, Latin
  - `almendra-700-latin-ext.woff2` - 700 normal, Latin Extended
- Almendra Display and italic faces are intentionally not shipped.

## Lora

- Vox Mana role: long-form reading and safe fallback for unclassified headings
- Designers: Olga Karpushina and Alexei Vanyashin / The Lora Project Authors
- Official source: <https://github.com/google/fonts/tree/main/ofl/lora>
- Download source: Google Fonts CSS2 WOFF2 response, family version `v37`
- License: SIL Open Font License 1.1; local notice in `lora-OFL.txt`
- Retrieved: 2026-08-30
- Variable faces shipped, constrained in CSS to weights 400-700:
  - `lora-variable-latin.woff2` - normal, Latin
  - `lora-variable-latin-ext.woff2` - normal, Latin Extended
  - `lora-variable-italic-latin.woff2` - italic, Latin
  - `lora-variable-italic-latin-ext.woff2` - italic, Latin Extended

## Outfit

- Vox Mana role: navigation, controls, ordinary labels, metadata, and functional headings
- Designer/source: Rodrigo Fuenzalida / The Outfit Project Authors
- Official source: <https://github.com/google/fonts/tree/main/ofl/outfit>
- Download source: Google Fonts CSS2 WOFF2 response, family version `v15`
- License: SIL Open Font License 1.1; local notice in `outfit-OFL.txt`
- Retrieved: 2026-08-30
- Variable faces shipped, constrained in CSS to weights 400-700:
  - `outfit-variable-latin.woff2` - normal, Latin
  - `outfit-variable-latin-ext.woff2` - normal, Latin Extended

## IBM Plex Mono

- Vox Mana role: technical utility only (query syntax, operators, identifiers, diagnostics, and
  genuinely fixed-width data)
- Existing local static faces retained unchanged:
  - `plex-mono-400.woff2` - 400 normal
  - `plex-mono-500.woff2` - 500 normal
- IBM Plex Mono is not a fifth brand voice.

## Legacy rollback assets

Fraunces, Spectral, and Source Serif 4 files remain physically present for owner-review rollback.
They are not part of the active semantic tokens or Home preload path. Removal may be considered only
after owner acceptance and a repository-wide usage proof.

Vox Mana does not ship Beleren, MPlantin, Matrix, or unofficial Wizards-font recreations as brand or
content typography. The vendored Mana icon package remains a separate iconography dependency and is
not part of this typography system.
