# Gruul Sources and Integration Notes

## Primary grounding

- Wizards of the Coast — **Aaaargh!!!** by Mark Rosewater. Used for red-green philosophy: impulse, instinct, acting in the moment, and aversion to obstacles/restrictions.
- Wizards of the Coast — **Designing for Gruul** by Mark Rosewater. Used for Gruul design framing: attacking creatures, building forces, and aggression that becomes difficult to stop.
- Wizards of the Coast — **Gatecrash Mechanics**. Used for the Gatecrash guild-mechanic context around Gruul-era mechanics and set structure.
- Wizards of the Coast — **Ravnica Allegiance Mechanics**. Used for official riot rules and Gruul's speed/size choice framing.
- Scryfall exact-title links are included in every row of `gruul-structural-matrix.csv` and `gruul-structural-matrix.json`.

## Integration guardrails

Do not flatten Gruul into generic red-green stompy. The useful Vox Mana structure is:

```txt
impulse -> body -> terrain -> impact -> aftershock
```

## Drift checks

- If the copy sounds like performance or sadistic spectacle, it is drifting into Rakdos.
- If the copy sounds like rot, graveyards, or patient reclamation, it is drifting into Golgari.
- If the copy sounds like peaceful nature or moral community, it is drifting into Selesnya.
- If the copy sounds like engineered improvement, it is drifting into Simic.
- If the copy sounds like duty, formation, and justice, it is drifting into Boros.

## Suggested source-of-truth use

- Treat `gruul-structural-matrix.json` as the machine-readable seed.
- Treat `gruul-structural-matrix.csv` as the review/QA artifact.
- Treat animation JSON as token/spec metadata for UI implementation.
- Treat animation MD and taxonomy MD as human-readable design guidance.
- Treat `gruul-translation-layer.js` as an adapter prototype, not final framework code.
