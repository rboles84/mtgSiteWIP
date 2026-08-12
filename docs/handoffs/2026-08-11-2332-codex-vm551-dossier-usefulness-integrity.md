# VM-551 Gate B1 Dossier Usefulness And Content Integrity Handoff

- **Agent:** Codex
- **Task requested:** Remediate the owner’s eleven live Archscry dossier findings on the single canonical VM-551 branch while establishing enforceable public content-integrity and provenance rules.
- **Related card:** `docs/kanban/done/VM-551-gate-b1-dossier-usefulness-content-integrity.md`
- **Starting authority:** branch `codex/vm551`, worktree `C:\dev\voxmana.io-vm551`, exact clean HEAD `5696da6f1f0b3dc04adfa82b209923f3d2f60e6e`.

## Files Reviewed

- Relevant VM-551 handoffs, Kanban records, product-fit plans, Gate A presentation authority, Gate B1 result/engine contracts, production dossier renderers, card cache/indexes, Commander Compass records, precon source/catalog data, and existing placement/presentation tests.
- Live provider behavior for the 155 unique precon commanders.

## Files Changed

- `assets/css/archscry.css`
- `assets/js/commander-dossier.js`
- `assets/js/dossier-radar.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `data/placement/commander-provider-validation.json`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `package.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-551-gate-b1-dossier-usefulness-content-integrity.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## Owner-Finding Disposition

1. **Identity Reading pips:** fixed through a centered, context-scoped flex contract; no faction margins.
2. **Summary tags:** fixed through a selector-specific inline-flex pill contract and centered row.
3. **Redundant card voices:** replaced with `Why These Cards Echo This Reading`; a card renders only when exact Commander Compass content has claim/source provenance and player-facing rationale. Reviewer/audit-style rationale is suppressed.
4. **Player-mode engine language:** consolidated into one `Why This Fit` surface using answer titles and approved bounded observations only. Stable/internal IDs remain internal.
5. **Start Here and tooltips:** label contrast/weight improved; glossary help now uses a body-level, focusable, clamped/flipping tooltip rather than a clipped pseudo-element.
6. **Layered Identity:** replaced by `Test the Fit`, composed only from approved self-check, core tension, and certified contrast copy; absent pieces are omitted.
7. **Three-item grid:** three balanced desktop columns, two plus centered/spanning third at intermediate width, one mobile column; no filler-count requirement.
8. **Duplicate signal surfaces:** removed from the live dossier; internal audit-text serialization remains internal and unchanged as an audit interface.
9. **Card detail:** shared cached-card dialog added for card images and precon commanders, with verified card data, optional approved rationale, Scryfall action, native focus containment, Escape handling, and focus restoration. No missing rationale is synthesized.
10. **Precons and deck discovery:** all 155 summaries are deterministic compositions of color identity and cataloged themes/mechanics with field-level provenance. Main commanders use the shared preview/dialog. Exact build links are centralized beside the precon; broader Commander Browsing Starts no longer fabricates or duplicates exact-commander routes.
11. **Commander lanes:** public `Commander Lanes` replaced by optional `What to Look For` items from approved Commander Compass archetype lanes with claim/source provenance; internal/reviewer wording is filtered and unsupported identities simply omit the section.

## Content Authority And Provenance

- Card rationale: exact card-name match to a Commander Compass recommendation, `why_this_fits`, `source_research_file`, and nonempty claim/source IDs. Publicly unsuitable reviewer prose is rejected rather than rewritten.
- Precon rationale: deterministic composition from `data/precons/vox-mana-precons.source.json` fields represented in the canonical precon catalog; color identity is stated as browsing context, never identity proof.
- `What to Look For`: exact approved Commander Compass `archetype_lanes` plus identity-basis claim/source IDs.
- Answer explanation: the Gate B1 evidence ledger’s approved `observation` / `bounded_observation`; no signal, mapping, dependency, or score prose.

## Provider Validation

- 155 unique precon commanders audited.
- EDHREC: 143 exact-commander destinations enabled after live HTTP 200 validation, including a verified `Captain N'ghathrod` slug override.
- 12 EDHREC destinations returning 404 are suppressed.
- Archidekt: suppressed because only 20 requests returned 200 before 135 rate-limited 429 responses prevented a complete matrix validation.
- MTGDecks: suppressed because the matrix returned 403 and therefore could not establish reliable actionable destinations.
- MTGGoldfish: suppressed because no stable exact-commander contract was established.

## Tests Run

- JS syntax for all changed modules: PASS.
- `npm run lint:js`: PASS.
- `npm run test:vm551-dossier-integrity`: PASS — 155 providers, 143 enabled / 12 suppressed, 155 precon rationales, 32 Commander-guidance items, 52 eligible clean card rationales, token/modal/tooltip/grid contracts.
- `npm run test:placement`: PASS — 37 factions / 37 golden paths.
- `npm run test:gate-b1-model`: PASS — 16 / 36 / 124 / 37 / 123.
- `npm run test:gate-b1-runtime`: PASS.
- `npm run test:gate-b1-questionnaire-presentation`: PASS.
- `npm run test:gate-b1-result-contract`: PASS — 5,000 valid journeys.
- `npm run test:source-generated`: PASS with the two pre-existing JESKAI/MARDU model-owned warnings.
- `npm run test:gate-b1-engine`: PASS — 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- `git diff --check`: PASS.
- `node research/archscry-dossier-followup-tests.js`: not runnable in this worktree because its optional raw Scryfall prerequisite `data/scryfall/raw/oracle-cards.json` is absent; no raw dataset was invented or added to bypass that prerequisite.
- Focused in-app desktop QA: centered pips and tag rows; three-column reasons; no public `SIG_`, `DG_`, `MAPPING_`, question/answer IDs, or methodology tokens; glossary tooltip inside viewport; cached hover preview; internal dialog; verified Scryfall action; precon commander interaction; Escape and focus restoration.
- Intermediate/mobile behavior: focused deterministic CSS contracts pass. A second live viewport session was not completed after the in-app browser entered a stale native-confirm state; the session was safely finalized instead of forcing browser state.

## Decisions Made

- Missing or audit-style card rationale is an omission, not a prose-generation opportunity.
- Card detail remains useful without a rationale by showing canonical card data and Scryfall; `Why it appears` is conditionally present only with approved rationale/provenance.
- The provider matrix is an allowlist. A guessed URL never becomes an actionable link.
- Existing rich dossier sections remain intact; this pass changes only their public usefulness and interaction contracts.

## Risks / Uncertainties

- Identities without clean card-level rationale or public Commander lanes intentionally show less content.
- Twelve precon commanders currently have no exact-build provider action; this is preferable to publishing a broken or guessed link.
- Owner should complete hands-on intermediate/mobile review, especially long tooltips and a tied/co-leader result, because the second live viewport browser session could not be completed in this agent pass. A final post-interaction console read was likewise not available after that session was finalized; automated JS/runtime suites are clean.

## Not Touched

- Constructs, questions, answers, IDs, historical/completion mappings, identity authority, scoring, ranking, routing, stopping, refinement, naming qualification, Yore, Gate A states, Matrix calculations, persistence, schemas, or generated placement model.
- No push, merge, deployment, migration, scoring, certification, recruitment, shadow test, or player validation.

## Follow-Up Recommendations

- Owner hands-on review on `codex/vm551` should cover a natural tied/co-leader reading, intermediate/mobile widths, one clean-rationale card section, one intentionally omitted card section, and a suppressed exact-provider row.
- Do not author missing card rationales or provider overrides without separate source review.

## Next Suggested Agent

- Owner review only. Do not begin another VM-551 implementation automatically.
