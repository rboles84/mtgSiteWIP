# VM-559 Archscry Authored-Card Media Resolution Handoff

## Agent name

Codex

## Task requested

Implement VM-559 as the systemic Archscry authored-card media reliability repair after VM-558 owner acceptance/integration: deterministic governed projection, projection-only runtime resolution, isolated image delivery, lazy visible-surface hydration, identity-specific Card Signals headings, focused all-identity/mobile QA, documentation, and owner-review handoff.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md` and the VM-551/VM-558 handoffs
- `docs/kanban/board.md`, completed VM-558 card, and related VM-551 cards/audits
- `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, and `docs/reference/data-contracts.md`
- Archscry renderer, dossier producer, Scryfall cache/producer/inspector, and existing cache/UI replay tests
- Structured faction, Matrix, Sound, Play, precon, and Scryfall bulk/index inputs

## Files changed

- Runtime: `assets/css/archscry.css`, `assets/js/commander-dossier.js`, `assets/js/index.js`, `assets/js/scryfall-card-cache.js`
- Generated media: `data/scryfall/indexes/archscry-media-index.json`, `archscry-media-manifest.json`, `archscry-media-unresolved.json`, and `scryfall-index-manifest.json`
- Producer/validation: `scripts/archscry-media-projection-core.mjs`, `build-scryfall-indexes.mjs`, `inspect-scryfall-indexes.mjs`, `vm551-scryfall-cache-tests.mjs`, and three `vm559-*` test/replay scripts
- Workflow/docs: `package.json`, `docs/reference/data-contracts.md`, VM-559 card/board, this handoff, and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Derived one deterministic governed inventory from the same structured data/functions used by production rendering. Current truth is 1,178 occurrences / 572 unique keys / 37 identities: Matrix 111, Sound 73, Play 50, commander 101, Card Signals 283, Mana Notes 560.
- Extended the existing Scryfall generator with committed projection, manifest, unresolved report, exact selection baseline, stale/checksum validation, byte-stable `--check`, and owner-gated selection-drift reporting.
- Added canonical/printing/layout/face/candidate metadata and deterministic aliases needed by current authored names.
- Added `authored_projection` and `dynamic_fallback` policies with explicit `resolved`, `projection_missing`, `not_found`, `deferred`, and `transient_error` outcomes.
- Added paced/deduplicated/bounded dynamic fallback and stale-generation suppression; governed media never uses it.
- Changed governed dossier art to visible panel/active-tier hydration, successful revisit reuse, retryable transient delivery, and slot-local ordered candidate fallback.
- Changed Card Signals headings to normalized player-facing identity labels such as `Mardu Card Signals`, `Glint Card Signals`, `Lorehold Card Signals`, and `WUBRG Card Signals`.
- Preserved precon display labels while using their classified canonical card proxy for image/detail resolution.
- Preserved the existing production ownership of Sound/Play in `Why This Fits`; no runtime relocation or deletion was made. The headed review handoff now exits View All, focuses `Start Here`, and exposes the true panel boundary.
- Repaired the shared pointer-preview owner so the first qualifying movement can recover a missed initial pointerover, direct movement between neighboring cards updates the preview, and repeat movement over the same loading/resolved target does not create duplicate work.
- Generated the testing-only `VM-559-Sound-Play-37-Identity-Review.xlsx` workbook with exactly 37 identity sheets, 119 currently rendered Sound/Play rows, editable review fields, exact identifiers where available, and no summary sheet.

## Why it changed

The repository already contained art locators, but most historical Mana Notes and many Card Signals depended on live Scryfall name lookup. Rate limits, transient API failures, cache state, and fuzzy punctuation matching therefore appeared as widespread `Image unavailable` tiles. RobDevPass places the repair at the earliest authorized producer/resolver layer instead of individual Mardu/Glint content.

## RobDevPass implementation packet

- Product outcome: authored dossier cards no longer depend on runtime name lookup; headings use identity labels.
- Owning authority: dossier/faction sources own choice/tier/order; committed Scryfall bulk owns canonical facts; the projection owns no semantics.
- Changed behavior: projection/freshness, resolver policy/states, hydration, candidate delivery, headings.
- Protected behavior: placement, scoring, qualification, result states, identity meaning, Matrix association, selected cards, tiers/order, VM-558 Sound/Play, card-detail meaning.
- Consumers: renderer, shared card detail, cache, generator/inspector, replay, deployment validation.
- Smallest complete fix: one projection, one resolver, visible hydration, slot-local delivery, exact headings, deterministic validation.
- Non-goals: no content/ranking change, placement reopening, local bitmap archive, service worker, proxy, database, or parallel media subsystem.
- Stop conditions: selection/authority/image-hosting/Scryfall-policy changes or unexpected selection drift without owner authorization.

## Decisions made

- Historical 406 unique / 469 Mana Notes / 37 Sound figures remain evidence, not invariants; VM-558-integrated structured truth controls generation.
- Governed misses fail closed and never call the API. Only explicit dynamic consumers retain fallback.
- `cards.scryfall.io` remains permitted; CDN failure yields retryable media state, not missing card metadata.
- `--accept-selection-drift` requires owner-authorization evidence and is not an ordinary remediation path.
- RobQAPass is QA-5 for integration/deployment because the shared artifact and published exact SHA must be verified; implementation tests remain focused on changed risk.

## Risks / uncertainties

- Image binaries are not vendored; Scryfall image-CDN outages remain an explicit external limitation.
- Owner acceptance is not claimed. No merge/deployment/closeout is authorized yet.
- Yore's machine replay uses the existing presentation-only fixture because its certified natural witness remains intentionally bounded; production placement is unchanged.
- Production verification must rerun against the published exact SHA with cache bypass and API lookup blocked.
- White, Azorius, and Lorehold wording observations remain deferred owner evidence. This bounded pass did not authorize or perform Sound/Play prose remediation.

## Play inventory versus rendered review count

The VM-559 media inventory and the review workbook intentionally count different stages of the same pipeline:

- `Play: 50` is the governed authored-media occurrence count. `deriveArchscryAuthoredMediaInventory` inventories every record in `data/dossier/card-rationale-catalog.json` so every approved Play relationship remains covered by committed card metadata and image candidates even when presentation composition suppresses a duplicate tile.
- `Play: 46` is the rendered `Cards That Play Like This` count reproduced by the testing workbook. Production selects visible precon recommendations first, adds their main-commanders to `pageCardUsage`, and then excludes those same canonical card IDs from Play tiles. This is cross-surface presentation deduplication, not loss of relationship or media coverage.

Exactly four approved Play occurrences are suppressed because the same card is already the visible commander of a recommended precon:

| Identity | Approved Play occurrence | Governed Play source | Visible precon source | Rendered disposition |
| --- | --- | --- | --- | --- |
| Azorius (`WU`) | Isperia, Supreme Judge | `data/dossier/card-rationale-catalog.json#cardrel_wu_c46718dc` | `data/precons/vox-mana-precon-catalog.json#first-flight-isperia-supreme-judge` (`First Flight`) | Inventoried for Play media coverage; omitted from the dedicated Play grid after its canonical ID enters `pageCardUsage` through the visible precon. |
| Izzet (`UR`) | Mizzix of the Izmagnus | `data/dossier/card-rationale-catalog.json#cardrel_ur_f787c6cf` | `data/precons/vox-mana-precon-catalog.json#seize-control-mizzix-of-the-izmagnus` (`Seize Control`) | Inventoried for Play media coverage; omitted from the dedicated Play grid after its canonical ID enters `pageCardUsage` through the visible precon. |
| Lorehold (`LOREHOLD`) | Quintorius, History Chaser | `data/dossier/card-rationale-catalog.json#cardrel_lorehold_5c40a8d4` | `data/precons/vox-mana-precon-catalog.json#lorehold-spirit-quintorius-history-chaser` (`Lorehold Spirit`) | Inventoried for Play media coverage; omitted from the dedicated Play grid after its canonical ID enters `pageCardUsage` through the visible precon. |
| Colorless (`COLORLESS`) | Zhulodok, Void Gorger | `data/dossier/card-rationale-catalog.json#cardrel_auto_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333` | `data/precons/vox-mana-precon-catalog.json#eldrazi-unbound-zhulodok-void-gorger` (`Eldrazi Unbound`) | Inventoried for Play media coverage; omitted from the dedicated Play grid after its canonical ID enters `pageCardUsage` through the visible precon. |

Deterministic reconciliation: `50 approved Play occurrences - 4 visible-precon overlaps = 46 rendered Play rows`; `73 Sound + 46 Play = 119 workbook rows`. No runtime or workbook defect was found, so neither artifact was changed.

## Tests run

- Deterministic catalog/render diff — PASS; 50 approved Play records versus 46 rendered export rows produced exactly the four documented visible-precon overlaps and no other omission.
- Read-only workbook inspection with the bundled spreadsheet runtime — PASS; exactly 37 sheets, 73 Sound rows, 46 Play rows, and 119 total review rows. The workbook was not rewritten.
- `npm.cmd run test:vm559-media-projection` — PASS; zero unresolved, aliases/regressions/multiface, byte stability, drift stop/authorization guard.
- `npm.cmd run scryfall:index:check` twice — PASS; byte-identical committed artifacts.
- `npm.cmd run scryfall:inspect` — PASS; 572 unique / 1,178 occurrences.
- `npm.cmd run test:vm559-resolution` and `node scripts/vm551-scryfall-cache-tests.mjs` — PASS.
- `npm.cmd run test:vm559-ui` — PASS; 37 identities at 1440px, all panels/tiers, View All/revisit/modal, zero API/misses/unavailable/retryable/invalid images/overflow.
- `npm.cmd run test:vm559-mobile` — PASS; Mardu, Glint, Azorius at 390px.
- `npm.cmd run test:vm559-delivery-failure` — PASS; forced Swamp candidate exhaustion remained slot-local and retryable, retried exactly once on later activation, and did not become `not_found` or poison other slots.
- `npm.cmd run test:vm551-dossier-integrity`, `test:frontend-smoke`, `validate:source-generated`, `lint:js`, and `lint:html` — PASS; source-generated retained two existing model-owned warnings.
- `node --check` on changed modules — PASS.
- In-app rendered review — PASS for Mardu Card Signals and Mana Notes Basics including Swamp; no unavailable tile or layout defect.
- `npm.cmd run review:vm559 -- --identity=MARDU --viewport=desktop` — PASS with real CDN delivery and API lookup blocked; the headed browser remained open for judgment and exited cleanly on Enter.
- `npm.cmd run review:vm559 -- --identity=WU --viewport=desktop` — PASS after owner-QA remediation; all panels prechecked, API lookup blocked, the owner handoff opened focused Start Here with the true panel boundary, and the session exited cleanly on Enter.
- `npm.cmd run test:vm559-first-hover` — PASS across fresh, no-prior-click Azorius Card Signals creatures/spells/permanents and Mana Notes basics/premium/midrange/budget/utility; neighbor movement, leave cleanup, single-overlay behavior, keyboard focus, fine-hover gating, and touch modal behavior passed.
- All-37 desktop replay with rendered Sound/Play export — PASS twice; every identity proved `Start Here` owns zero Sound/Play blocks and `Why This Fits` owns both blocks.
- Workbook verification — PASS; exactly 37 sheets / 119 rows / no summary, no formula-error cells, and all 37 sheets rendered for visual inspection. Representative rendered values were cross-checked against the production dossier output.
- `npm.cmd run test:vm551-dossier-integrity`, `npm.cmd run test:frontend-smoke`, and `npm.cmd run lint:js` — PASS after the bounded owner-QA remediation.

## RobQAPass readiness

- Changed behavior and protected contracts are named above.
- Deterministic agent evidence covers producer/check mode, resolver states, all-37 desktop, focused mobile, failure isolation, request suppression, and rendered UI.
- Owner package: Mardu, Glint, and one ordinary identity; desktop/mobile; one tier switch; View All; one card detail; heading/readability/order judgment.
- Headed command: `npm.cmd run review:vm559 -- --identity=MARDU --viewport=desktop`; substitute `GLINT`/`WU` and `mobile`. API lookup stays blocked while the real image CDN remains permitted.
- Deployment gate: exact accepted SHA only, published-SHA verification, blocked API/permitted CDN, no closeout before production replay.

## Not touched

- Placement/scoring/question/evidence/qualification logic
- Identity authority, faction semantics, Matrix associations, card choices, tier membership, or ordering
- VM-551/VM-558 authored approval decisions
- Local image hosting, service worker, proxy, backend, database, or public route/storage APIs
- `main`, GitHub Pages, production deployment, or certification
- Sound/Play wording, approved relationships, exact-printing records, card selections, modal semantics, or dedicated-panel ownership

## Follow-up recommendations

1. Owner reviews the delivered 37-sheet Sound/Play workbook and the corrected focused-panel handoff.
2. Treat any prose/content findings as a later separately authorized remediation; do not fold them into this interaction/artifact pass.
3. If the VM-559 candidate is accepted, integrate the exact tested SHA, push, and wait for GitHub Pages.
4. Run the cache-bypassed production all-37 replay with API blocked and CDN allowed.
5. Record deployed SHA/evidence/CDN limitation, move VM-559 to done, and update card/handoff/index.

## Next suggested agent

Codex continuing the same VM-559 branch after owner acceptance; do not create another worktree or branch.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-559-archscry-authored-card-media-resolution.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/data-contracts.md`
- VM-558 completion handoff/card
