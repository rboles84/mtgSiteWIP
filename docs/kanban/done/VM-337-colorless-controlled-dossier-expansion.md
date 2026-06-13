# VM-337 - Colorless Controlled Dossier Expansion

## Status
Done

## Summary
Expanded COLORLESS only inside existing controlled surfaces after VM-334 ratified it as a controlled placeable Layer 1 identity. This card improves dossier-facing copy, Commander constraint copy, mana-base caution copy, and existing Matrix Boundary copy without opening Home preview, public routes, directory aliases, broader URL expansion, or broad Commander/deck recommendations.

## Pre-Flight Findings
- VM-336 was done; no in-progress Kanban card blocked VM-337.
- VM-333 is resolved/superseded in the Sultai lane and was not reused or reopened for Colorless.
- VM-334 is the Colorless product decision authority: COLORLESS is controlled placeable, preview-ineligible, directory-link suppressed, and not approved for public route or alias expansion.
- Baseline dossier audit reported two Colorless `tableCautionText` failures.
- The worktree was broadly dirty; unrelated drift was preserved.
- `assets/img/identity-hero/colorless.webp` was dirty and user-approved visually; it was not edited, regenerated, replaced, or recropped.
- Files were not staged.

## Scope Completed
- Recorded VM-334 in Colorless research/source ledgers as lifecycle and product-governance authority only.
- Surgically revised stale Colorless raw text that directly said non-live, reference-only, or not placement eligible.
- Improved Colorless controlled dossier copy through source/registry-owned inputs and source-owned runtime copy paths.
- Added a controlled mana-base primer: Wastes and true `{C}` first; generic costs are not colorless mana; effects asking for a color do not make `{C}`; Reflecting Pool-style nuance stays rules-caution copy, not deck-buying advice.
- Repaired the Colorless `tableCautionText` audit failures by strengthening caution copy, not by weakening the audit.

## Out Of Scope Preserved
- Home preview.
- Public Colorless routes, public aliases, directory links, or broader URL expansion.
- Full Commander Compass.
- Broad card recommendations, exact deck-buying advice, prices, or metagame claims.
- `colorless.webp` edits.
- Hand-editing generated artifacts.
- Treating VM-334 as lore, rules, Commander, or card evidence.

## Acceptance Results
- VM-334 contract remains unchanged.
- Every new or revised Colorless claim/copy point traces to raw Colorless claims, approved ledgers, VM-334 lifecycle authority, or existing verified local rules/source material.
- Generated artifacts changed only through `npm.cmd run build:factions`.
- `data/factions.json` still omits `COLORLESS.commander_compass`.
- Maze behavior remains `id=c` / `id<=c`.
- `Ulalek` and `Eldrazi Incursion` do not become native Colorless support.
- `npm.cmd run dossier:audit` has no remaining Colorless `tableCautionText` failures.

## Raw Hash Deltas

| File | Before | After |
| --- | --- | --- |
| `data/raw-factions/colorless/colorless.changelog.json` | `0BDC01764FACAFDB18ACCBB930E1DD890AF6E6697505417CA1FCA63CDE5D6822` | `ACFAE23BB8114D8AE1C5EE774A145C4DB638B02FEEF2BC2296C008278CFB7954` |
| `data/raw-factions/colorless/colorless.claims.json` | `01D370E961B9672C157E1C7B35824FE090719A3CDF9764786EF316DE61D976AA` | `3048DBB2087DC58DDCF03BEF2898A2E8DAF564C2DCBAC82280886EB09B7FD159` |
| `data/raw-factions/colorless/colorless.placement.json` | `3E5D2D620ECD50DFCC6FE80BA7D87889675EC5EC11F96AFEC1F5E81F59C19E10` | `07158660A4158CF265A0A0BD0106925B3884854678A3BAA5F5A0070F029E9538` |
| `data/raw-factions/colorless/colorless.profile.json` | `6EC40CFD93DF3B863A3D0BE8FEEF8D1519CB4F257842D6240DB82C5B247225B3` | `974B40BF5EC1A7B9C7A98743F85EE0496A3F14B32E79322355347BBB6831A0E7` |
| `data/raw-factions/colorless/colorless.sources.json` | `817DFE00144DC9535D51DE927A1572CF8C386DFF84C01C1288B5E2BFADDC4995` | `08584D505CFBFE50A21C6A5BF6FD4CDD66E535430090F5D02272A2D99337ECA4` |

## Tests
- `npm.cmd run build:factions`
- Node count/contract probe for 36 identity expressions, 36 generated display entries, 36 placement entries, 36 flavor-snippet entries, 20 Home preview entries, COLORLESS contract, and WUBRG absence.
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` - passed with the known single model-owned inhibitor warning.
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `npm.cmd run dossier:audit` - passed with 0 failures and 110 warnings.
- `npm.cmd test`
- Browser spot-check via local headless Edge/Puppeteer fallback after the in-app browser runtime failed to connect: Colorless hero used `colorless.webp`, new caution/mana primer/Matrix Boundary copy rendered, and no horizontal overflow was detected.
