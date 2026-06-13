# VM-337 Colorless Controlled Dossier Expansion Handoff

## Agent Name
Codex

## Task Requested
Implement VM-337 as a controlled Colorless dossier expansion after VM-334, preserving the existing product contract: COLORLESS remains controlled placeable, Home-preview ineligible, public-route suppressed, public-alias suppressed, directory-link suppressed, and outside broad Commander/deck recommendation behavior.

## Files Reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-11-0729-codex-vm336-sultai-source-copy-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-334-colorless-product-decision-gate.md`
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `data/raw-factions/colorless/*.json`
- `docs/research/colorless/colorless-source-ledger.md`
- `docs/research/colorless/colorless-evidence-ledger.md`
- `docs/research/colorless/colorless-manual-fill.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `assets/js/quick-reading-tests.js`

## Files Changed
- `docs/kanban/board.md`
- `docs/kanban/done/VM-337-colorless-controlled-dossier-expansion.md`
- `docs/handoffs/2026-06-11-0811-codex-vm337-colorless-controlled-dossier-expansion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/research/colorless/colorless-source-ledger.md`
- `docs/research/colorless/colorless-evidence-ledger.md`
- `docs/research/colorless/colorless-manual-fill.md`
- `data/raw-factions/colorless/colorless.sources.json`
- `data/raw-factions/colorless/colorless.claims.json`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.placement.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `research/archscry-dossier-followup-tests.js`
- Builder-regenerated output: `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `supabase/functions/guild-recruiter/faction-context.ts`
- Test artifact updated by audit: `artifacts/dossier-snapshots/dossier-audit-report.md`

## What Changed
- Added VM-334 to the Colorless source/evidence ledgers as lifecycle and product-governance authority only.
- Replaced current stale raw Colorless lifecycle text that described COLORLESS as non-live, reference-only, or not placement eligible.
- Kept lore/rules/Commander/card claims attached to existing Colorless evidence rows and manual-fill limits.
- Updated Colorless registry display copy with controlled placeable/not-sixth-color framing and a mana-source false-positive boundary.
- Added a narrow Colorless builder propagation override so registry-owned `lore_summary`, `affinity`, and `archetypes` win over stale generated display fields for COLORLESS only.
- Updated source-owned runtime copy:
  - Colorless table-caution copy now includes practical action cues and source-backed separators.
  - Mana-base basics copy now explains Wastes/true `{C}`, generic-vs-colorless, color-asking effects, and Reflecting Pool-style caution.
  - Existing Colorless Matrix Boundary copy now includes generic costs and five-color Eldrazi separators.
- Regenerated generated artifacts through `npm.cmd run build:factions`.
- Added focused regression assertions for the VM-337 copy and boundaries.
- Moved VM-337 to Done in Kanban.

## Why It Changed
VM-334 ratified COLORLESS as controlled placeable, but raw and generated surfaces still carried older pre-promotion phrasing and the dossier audit had two Colorless `tableCautionText` failures. VM-337 makes the controlled dossier UX richer without expanding public discoverability or recommendation authority.

## Decisions Made
- VM-334 is cited only as lifecycle/product-governance authority, not MTG lore, rules, Commander, card, legality, or deck evidence.
- Reflecting Pool-style nuance belongs in the visible mana-base basics primer because the Colorless utility tier may not render for every generated land-base shape.
- The builder override is COLORLESS-only and limited to registry-owned display fields needed for visible dossier copy propagation.
- The in-app browser runtime failed to connect, so visual QA used a local static server plus headless Microsoft Edge/Puppeteer instead.

## Risks / Uncertainties
- The worktree was already broadly dirty, including generated files, assets, docs, and untracked Colorless folders. VM-337 preserved unrelated drift and did not stage files.
- `assets/img/identity-hero/colorless.webp` remains dirty from prior work but was not touched.
- Source-generated validation still reports the accepted model-owned Colorless inhibitor warning.
- `npm.cmd run dossier:audit` now has zero failures but still reports 110 warnings.
- Browser QA was headless fallback QA, not the in-app browser surface, because the in-app browser runtime failed before opening a tab.

## Tests Run
- `npm.cmd run build:factions`
- Node count/contract probe: 36 identity expressions, 36 generated display entries, 36 placement entries, 36 flavor-snippet entries, 20 Home preview entries, COLORLESS contract, and WUBRG absence all passed.
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` - passed with the known single model-owned inhibitor warning.
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `npm.cmd run dossier:audit` - passed with 0 failures and 110 warnings.
- `npm.cmd test`
- Local headless Edge/Puppeteer browser spot-check - passed: Colorless hero used `assets/img/identity-hero/colorless.webp`, caution copy rendered, mana primer rendered, Matrix Boundary rendered, no Commander Compass appeared, and no horizontal overflow was detected.

## Raw Hashes

| File | Before | After |
| --- | --- | --- |
| `data/raw-factions/colorless/colorless.changelog.json` | `0BDC01764FACAFDB18ACCBB930E1DD890AF6E6697505417CA1FCA63CDE5D6822` | `ACFAE23BB8114D8AE1C5EE774A145C4DB638B02FEEF2BC2296C008278CFB7954` |
| `data/raw-factions/colorless/colorless.claims.json` | `01D370E961B9672C157E1C7B35824FE090719A3CDF9764786EF316DE61D976AA` | `3048DBB2087DC58DDCF03BEF2898A2E8DAF564C2DCBAC82280886EB09B7FD159` |
| `data/raw-factions/colorless/colorless.placement.json` | `3E5D2D620ECD50DFCC6FE80BA7D87889675EC5EC11F96AFEC1F5E81F59C19E10` | `07158660A4158CF265A0A0BD0106925B3884854678A3BAA5F5A0070F029E9538` |
| `data/raw-factions/colorless/colorless.profile.json` | `6EC40CFD93DF3B863A3D0BE8FEEF8D1519CB4F257842D6240DB82C5B247225B3` | `974B40BF5EC1A7B9C7A98743F85EE0496A3F14B32E79322355347BBB6831A0E7` |
| `data/raw-factions/colorless/colorless.sources.json` | `817DFE00144DC9535D51DE927A1572CF8C386DFF84C01C1288B5E2BFADDC4995` | `08584D505CFBFE50A21C6A5BF6FD4CDD66E535430090F5D02272A2D99337ECA4` |

## Not Touched
- No files staged.
- `assets/img/identity-hero/colorless.webp` was not edited, regenerated, replaced, or recropped.
- No Home preview approval.
- No public Colorless route, public alias, directory link, or broader URL expansion.
- No Colorless Commander Compass.
- No broad deck recommendations, deck-buying advice, prices, or metagame claims.
- No Ulalek or Eldrazi Incursion native Colorless support.
- No generated artifact hand edits.
- No unrelated dirty worktree cleanup or reverts.

## Follow-Up Recommendations
- Keep future Colorless expansion behind source intake and separate approval, especially for exact card legality, Oracle text, Commander legality, deck advice, prices, and metagame claims.
- A future manual browser pass in the in-app browser would be useful if the browser runtime becomes available again.
- If Colorless ever gets Home preview, public routes, public aliases, broader URL expansion, or Commander Compass, create a separate card with explicit VM-334 supersession/extension gates.

## Next Suggested Agent
Test Strategist or Documentation Steward, only if the next card broadens public Colorless behavior or reconciles remaining dossier-audit warnings.

## Related Kanban Card / Docs / Plans
- `docs/kanban/done/VM-337-colorless-controlled-dossier-expansion.md`
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `docs/kanban/done/VM-334-colorless-product-decision-gate.md`
- `docs/handoffs/2026-06-11-0729-codex-vm336-sultai-source-copy-repair.md`
