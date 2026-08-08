# VM-551 Gate B1 Production-Fidelity Archscry Preview

## Purpose

This internal preview places the owner-approved Gate B1 instrument inside the current Archscry product grammar. It demonstrates the shared four-question Gate, deterministic preview-only adaptive Hall selection, bounded targeted questions, transition into a reading, and continuity through the production dossier, Matrix, Commander discovery, card/precon references, and Maze paths.

> Authored preview branching demonstrates the proposed adaptive experience. It is not the final placement algorithm and does not validate identity mappings.

The preview does not calculate placement. Free-answer branches and review-case results are authored experience demonstrations. No production URL imports this artifact.

## Launch

From the repository/worktree root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open:

`http://127.0.0.1:4173/docs/prototypes/vm551-gate-b1-production-fidelity-preview/`

Do not open `index.html` through `file://`; the preview loads approved JSON and production data over the local server.

## Owner review modes

- **Free answer journey** is the default. Every run begins with the same C01–C04 Gate questions. After Question 4, one of eight authored composite states chooses a Hall construct. Restart and change the Gate answers to see Question 5 change.
- **Reviewer information** reveals question, dependency, branch, candidate-set, three-axis, eligibility, and contradiction metadata. It also reveals the nine required authored review cases.
- **Normal player mode** hides IDs, constructs, signals, provenance, evidence status, mapping status, branch rationale, candidate sets, and the review-case selector.

The review cases cover Simic/Quandrix, Esper/C16, Colorless, WUBRG, mono/multicolor, Yore without a lens, Yore/Glint lens skipped, lens answered, and contradiction preserved.

## Production reuse

The preview directly loads the current production:

- shared tokens, fonts, layout, topbar, atmosphere, component, mana-symbol, and Archscry styles;
- Vox Mana topbar, reduce-motion, rich-atmosphere, Chart, and radar scripts;
- Archscry question-card, progress, answer-card, result-state, guild-banner, dossier-console, starter-card, adjacent-card, Commander, and Matrix class contracts;
- `buildCommanderDossier` and `buildPreconRecommendations` from `assets/js/commander-dossier.js`;
- `gateAStatePresentation` from `assets/js/archscry-presentation.js`;
- `renderDossierRadarSection` and `initDossierManaRadar` from `assets/js/dossier-radar.js`;
- current `data/factions.json`, `data/placement-model.json`, precon catalog, precon theme taxonomy, identity hero art, and Maze link data.

The preview adapter owns only journey state, authored branch selection, selected-answer observation display, review metadata, optional-lens presentation, simplified dossier panel switching, and local path translation. Production `assets/js/index.js` is intentionally not loaded because it owns the live questionnaire, scoring, persistence, routing, and stopping behavior.

## Approved instrument source

Question and answer copy is loaded without rewriting from:

`../vm551-gate-b1-owner-experience/prototype-data.json`

That derived artifact preserves source references to the approved construct map, question bank, answer contracts, jargon glossary, result-usefulness inventory, identity lens contract, walkthroughs, and Gate A state contract. The preview-specific [branching map](./reviewer-branching-map.md) is separate and explicitly non-scoring.

## Validation

Run:

```powershell
node docs/prototypes/vm551-gate-b1-production-fidelity-preview/validate-preview.mjs
node --check docs/prototypes/vm551-gate-b1-production-fidelity-preview/app.js
```

The validator checks the approved 16/35/110/37 baseline, 4/13/18 pool, all three result-governance axes, shared four-question Gate, eight authored free-answer branch states, nine owner-review journeys, 6–8 length, lens eligibility, skip, contradiction, and hard maximum eight.

## Fidelity risks

- The live Archscry controller is not reused because doing so would execute production placement, routing, persistence, and result behavior. The preview controller is therefore the main drift surface.
- Dossier content comes from the real builder, but the preview uses six simplified dossier panels rather than the production controller's full account/save/card-image state management.
- Commander, card, precon, and Maze content uses production records and builders, but the preview does not make Scryfall image requests or persist Maze handoff context.
- Results and Gate A states are authored demonstrations, not the output of a placement engine.

## Not authorized or implemented

No production questionnaire, scoring, adaptive algorithm, stopping rule, persistence, schema, saved reading, result contract, Gate A state, dossier behavior, Matrix calculation, Maze behavior, source identity record, route manifest, deployment configuration, analytics, player validation, recruitment, shadow test, migration, deployment, certification, push, or merge is changed by this preview.
