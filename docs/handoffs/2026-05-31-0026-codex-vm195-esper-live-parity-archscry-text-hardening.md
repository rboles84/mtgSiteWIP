# VM-195 Esper Live Parity And Archscry Text Hardening

## Agent

Codex

## Task Requested

Implement the Esper live parity and Archscry text hardening pass. The requested ID was VM-194, but VM-194 was already occupied by Bant in `docs/kanban/in-progress/`, so this work was executed as VM-195.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-194-bant-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0006-codex-vm193-grixis-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.claims.json`
- `data/raw-factions/esper/esper.changelog.json`
- `data/identity-layers.json`
- `data/factions.json`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

VM-195 touched or intentionally generated:

- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.changelog.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-195-esper-live-parity-archscry-text-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0026-codex-vm195-esper-live-parity-archscry-text-hardening.md`

The working tree had substantial pre-existing dirty and untracked shard work before VM-195 started. Those unrelated files were left untouched.

## What Changed

- Added an `ESPER` Commander guidance override with mature product copy for planning, perfectibility, information advantage, structured optimization, controlled change, and artifact-oriented value as gameplay texture.
- Added an `ESPER` Archscry presentation override so reveal/presentation copy no longer falls back to generic shard language.
- Added Esper exact-color precon fit summaries for the 10 local White/Blue/Black precon catalog rows.
- Filled Esper Commander Compass support metadata with locally resolving Commander candidates and link targets.
- Removed public-facing `WUB` display leakage from Esper display copy while preserving `WUB` in query/color-direction contexts.
- Rebuilt generated faction artifacts through `npm.cmd run build:factions`.
- Added regression coverage for Esper rendered dossier text, presentation text, Commander preview candidates, exact Commander query syntax, support query syntax, precon summaries, public color-code leakage, route-like `/esper/` leakage, and implementation-caveat language.

## Why It Changed

Esper was already live as `ESPER`, but its live Commander and Archscry surfaces still needed the mature shard hardening pattern used for Jund, Grixis, Bant, and Naya. This pass improves visible product copy without changing lore evidence, placement scoring, routes, Home preview, Maze behavior, schemas, or Supabase configuration.

## Decisions Made

- Used VM-195 because VM-194 was already taken by Bant.
- Kept `ESPER` as the only live Esper key.
- Kept `WUB` as internal query/color-direction language only.
- Used exact Commander query syntax `id=wub is:commander f:commander`.
- Used subset support query syntax `id<=wub`.
- Left `esper.claims.json` unchanged.
- Did not add named Esper lore, locations, metallurgy, chronology, exact card text, or mechanics-as-canon.

## Validation Blocks

Final tracked diff list includes pre-existing unrelated dirty files:

```text
assets/js/archscry-presentation.js
assets/js/commander-dossier.js
assets/js/index.js
assets/js/maze-handoff.js
assets/js/quick-reading-tests.js
data/archscry-flavor-snippets.json
data/factions.json
data/identity-layers.json
data/placement-model.json
data/raw-factions/bant/bant.changelog.json
data/raw-factions/bant/bant.profile.json
docs/handoffs/HANDOFF_INDEX.md
docs/kanban/board.md
docs/research/bant/bant-lore-source-packet.md
docs/research/esper/esper-lore-source-packet.md
research/archscry-adjacent-navigation-tests.js
research/archscry-dossier-followup-tests.js
research/build-archscry-flavor-snippets.mjs
research/build-faction-artifacts.mjs
research/maze-query-contract-tests.js
research/maze-search-tests.js
research/precon-artifact-tests.js
research/presentation-snapshot-cases.json
research/presentation-snapshot-tests.js
research/research-init.js
research/research-syntax-language-tests.js
research/research-syntax-language.js
supabase/functions/guild-recruiter/faction-context.ts
```

JSON and promotion guard summary:

```json
{
  "rawFiles": [
    "esper.changelog.json",
    "esper.claims.json",
    "esper.placement.json",
    "esper.profile.json",
    "esper.sources.json"
  ],
  "claimCount": 9,
  "actualClaims": 9,
  "missingClaimSources": [],
  "missingProfileRefs": [],
  "factionCount": 25,
  "modelCount": 25,
  "esperLive": true,
  "wubKeyPresent": false,
  "previewCount": 20,
  "esperPreviewEligible": false,
  "domainHits": false
}
```

Build and test summary:

```text
npm.cmd run build:factions
Built 25 faction placement records.

node research/archscry-dossier-followup-tests.js
PASS archscry dossier follow-up tests

node assets/js/quick-reading-tests.js
PASS adaptive placement tests: 25 factions, 25 golden paths

node research/presentation-snapshot-tests.js
PASS presentation snapshot tests: 16 fixed cases

npm.cmd run test:placement
PASS adaptive placement tests: 25 factions, 25 golden paths

npm.cmd test
PASS adaptive placement tests, parser, builder, Maze contract/search, syntax translation, mode, precon artifact, Archscry dossier follow-up, and presentation snapshot tests.

git -c safe.directory=C:/dev/mtgSiteWIP diff --check
PASS
```

WUB/query guard:

```text
No generated/runtime/fixture "WUB" key found.
Esper Commander exact query: id=wub is:commander f:commander.
Esper support/query texture: id<=wub.
Archidekt color query keeps colors=WUB as query syntax only.
No standalone /esper/ route was added.
```

## Risks / Uncertainties

- `data/factions.json` is both display input and generated merge output in `research/build-faction-artifacts.mjs`; this card edited Esper display text there because the build intentionally preserves existing display copy over `identity-layers` display for raw-managed factions.
- The repo remains heavily dirty with unrelated prior shard work. VM-195 did not normalize or revert those files.
- Rich Esper lore remains source-bound/deferred. A future evidence-promotion card is still required before detailed Esper figures, locations, metallurgy, or chronology become live product content.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run build:factions`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `node research/presentation-snapshot-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- PowerShell JSON/reference/promotion guard script
- `rg -n '"WUB"\s*:' data/factions.json data/placement-model.json data/identity-layers.json supabase/functions/guild-recruiter/faction-context.ts assets/js/quick-reading-tests.js research/build-faction-artifacts.mjs`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- data/raw-factions/esper/esper.claims.json`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not Touched

- `data/raw-factions/esper/esper.claims.json`
- Placement scoring logic
- Hall prompts
- Lateral inhibition
- Home preview behavior
- Maze behavior
- Route maps
- Schema/domain design
- Supabase deployment/config
- Esper architecture docs
- Esper research packet claims

## Follow-Up Recommendations

- If Esper should expose richer lore in product copy, create a separate evidence-promotion card before adding named figures, locations, metallurgy, or chronology.
- Consider a later cleanup card for the large accumulated dirty tree once the shard expansion series is ready to bundle.

## Next Suggested Agent

Documentation Steward for final shard-series diff review, or Test Strategist if the next step is a focused rendered UI QA pass.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-195-esper-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0006-codex-vm193-grixis-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-30-2358-codex-vm192-jund-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md`
