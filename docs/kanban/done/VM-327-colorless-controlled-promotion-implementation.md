# VM-327 - Colorless Controlled Promotion Implementation

Status: Done
Owner: Codex
Agent role: Runtime Architect / JSON Cartographer / Test Strategist
Completed: 2026-06-10

## Summary

VM-327 promotes `COLORLESS` as one controlled generated placement identity after VM-326 approval.

Promotion state now lives in `data/identity-layers.json`, builder support, and generated outputs. The five raw Colorless JSON files were not edited and still match the VM-326 hash baseline.

## Result

- Identity expressions: `35 -> 36`
- Generated factions: `35 -> 36`
- Placement factions: `35 -> 36`
- Flavor snippet keys: `35 -> 36`
- Generated Supabase recruiter context keys: `35 -> 36`
- Home preview entries: unchanged at `20`
- `COLORLESS` has generated placement and recruiter-context data.
- `COLORLESS` remains absent from Home preview and public route/hero/Maze rollout paths.
- `COLORLESS` does not expose generated Commander compass material or public mana-base deck advice in VM-327.

## Files Changed

Source and test surfaces:

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-cases.json`

Generated outputs:

- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Bookkeeping:

- `docs/kanban/done/VM-327-colorless-controlled-promotion-implementation.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-10-2249-codex-vm327-colorless-controlled-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Implementation Notes

- Added `COLORLESS` to `data/identity-layers.json` with:
  - `kind: "colorless"`
  - `colors: []`
  - `core_color: "C"`
  - `secondary_colors: []`
  - `display_code: "C"`
  - `display.institution_type: "colorless"`
  - `aliases: ["COLORLESS"]`
  - `placement_eligible: true`
  - `preview_eligible: false`
  - `routing.suppress_directory_links: true`
- Added `colorless: "COLORLESS"` to approved builder mappings.
- Added Colorless biological prior, lateral inhibition targets, source-backed live placement copy override, gate answers, and Hall questions.
- Added an explicit builder guard so `COLORLESS` does not inherit support-only raw Commander compass material into generated `data/factions.json`.
- Added Colorless flavor preferences for source-safe snippets and exclusions for joke/off-boundary/five-color or Phyrexia bleed.
- Extended source/generated validation so `COLORLESS` is a known target and raw chatbot calibration notes can back generated false-positive guardrails.
- Updated focused placement, dossier, and presentation tests for the 36th generated identity and Colorless public-surface boundaries.

## Raw Hash Baseline Preserved

| File | SHA-256 |
| --- | --- |
| `colorless.changelog.json` | `0BDC01764FACAFDB18ACCBB930E1DD890AF6E6697505417CA1FCA63CDE5D6822` |
| `colorless.claims.json` | `01D370E961B9672C157E1C7B35824FE090719A3CDF9764786EF316DE61D976AA` |
| `colorless.placement.json` | `3E5D2D620ECD50DFCC6FE80BA7D87889675EC5EC11F96AFEC1F5E81F59C19E10` |
| `colorless.profile.json` | `6EC40CFD93DF3B863A3D0BE8FEEF8D1519CB4F257842D6240DB82C5B247225B3` |
| `colorless.sources.json` | `817DFE00144DC9535D51DE927A1572CF8C386DFF84C01C1288B5E2BFADDC4995` |

## Public-Surface Classification

Approved `COLORLESS` generated hits:

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Allowed source/test hits:

- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

Public JS hits classified as preserved generic utility or existing prose:

- `assets/js/commander-dossier.js`: generic colorless-to-`C`, `C`-to-Colorless, and exact `COLORLESS` display-code normalization utility.
- `assets/js/index.js`: generic `C: "Colorless"` label and existing colorless utility-land helper copy.
- `assets/js/home.js`: generic `kind: "colorless"` label only; `COLORLESS.preview_eligible` remains false.
- `assets/js/identity-layers.js`: generic expression-kind label only.
- `assets/js/maze-handoff.js`: generic `c: "colorless"` mana-symbol label.
- `assets/js/strategium.js`: existing strategy prose and aliases mentioning colorless as deck texture.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check research\build-archscry-flavor-snippets.mjs`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\validate-source-generated-guardrails.mjs`
- `node --check research\archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run validate:source-generated -- --targets=COLORLESS`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:placement`
- `npm.cmd run test:parser`
- `npm.cmd run audit:factions`
- `node research\presentation-snapshot-tests.js`
- `npm.cmd test`
- Raw hash checks before edits, after each builder/generator step, and at closeout.
- Count/context check for 36 identity/generated/placement/flavor/context keys and 20 Home preview entries.
- Public-surface leakage scan over JS/HTML surfaces.

## Known Warning

`npm.cmd run validate:source-generated -- --targets=COLORLESS` passes with one warning:

- `inhibitor_traps[model_owned]`: one inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text.

This warning is expected under the validator's existing model-owned prior allowance and does not indicate generated/source contamination.

## Not Touched

- Five raw Colorless JSON files.
- Colorless research ledgers.
- `docs/research/canon/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- Home preview membership.
- Public route files.
- Maze routing behavior.
- Hero image maps or image rollout tests.
- Manual Supabase context authoring.

## Follow-Up

- Manual browser QA is still recommended for the Archscry result surface once the user is ready.
- A future card may decide whether Colorless should ever receive public route, Home preview, hero image, Maze routing, Commander compass, or mana-base deck advice. VM-327 intentionally does not approve those surfaces.
