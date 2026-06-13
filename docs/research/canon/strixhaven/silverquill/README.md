# Silverquill Vox Mana Bundle

Generated: 2026-05-18

This bundle provides a repo-friendly Silverquill data/model layer matching the prior Rakdos, Golgari, Gruul, and Quandrix artifact pattern.

## Files

- `silverquill-structural-matrix.csv` — 56 card anchors in spreadsheet-friendly form.
- `silverquill-structural-matrix.json` — same matrix with schema metadata.
- `silverquill-animation-spec.md` — human-readable motion/visual design spec.
- `silverquill-animation-spec.json` — machine-readable animation tokens and component states.
- `silverquill-translation-layer.js` — reusable primitive adapters for `Detain()`, `Override()`, `ConstraintField()`, and `AccretionEngine()`.
- `silverquill-narrative-taxonomy.md` — human-readable narrative taxonomy.
- `silverquill-narrative-taxonomy.json` — machine-readable taxonomy.
- `SOURCES.md` — grounding notes and search patterns.
- `manifest.json` — bundle metadata.

## Core Axiom

> Words are weapons, shields, contracts, applause, and verdicts; the winning line changes status in public.

## Matrix Tiers

- `current-school-core`
- `current-commander-core`
- `current-mechanic-core`
- `current-creature-anchor`
- `current-support-anchor`
- `college-core`
- `college-support`
- `college-land-anchor`
- `lesson-core`
- `lesson-support`
- `commander-core`
- `character-support`

## Implementation Notes

Silverquill should not be flattened into generic Orzhov.

Preserve these distinctions:

- rhetoric, speech, writing, and calligraphy as core identity
- status/counters as social visibility
- Inklings as materialized words/shadows
- political combat and table persuasion
- protection and humiliation as two sides of Silverquill pedagogy
- removal and modal spells as verdict language

Good UI verbs:

- name
- silence
- flatter
- expose
- redirect
- mark
- sign
- judge
- protect
- humiliate
- command

Avoid:

- generic tax/prison language without rhetoric
- generic aristocrats without Inkling/status payoff
- Azorius legalism
- Rakdos chaos-performance
- flat black-white monochrome styling
