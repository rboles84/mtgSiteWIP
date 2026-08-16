# VM-563 Archscry Sound/Play Final Remediation Handoff

## Agent name

Codex

## Task requested

Freeze VM-562, apply the accepted evidence-bounded writing method to the complete Archscry Cards That Sound Like This / Cards That Play Like This corpus, resolve the five evidence exceptions, validate all 37 identities, create final owner-review artifacts, and commit a clean local candidate without pushing, merging, deploying, or accepting it.

## Files reviewed

- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- VM-560 through VM-562 cards, handoffs, source router, identity packets, 119-row ledger, suppression appendix, summary, and finalized calibration
- Underlying evidence routes identified by VM-561 for the five exception rows
- Authoritative Sound/Play relationship sources, generated catalogs, exact-printing records, rendering code, and existing replay/authority tests

## Files changed

- Authoritative Sound/Play sources and their generated catalogs/audit projections
- Shared source-to-catalog generators and focused Sound/Play authority/render regressions
- `assets/js/index.js` only for the directly observed Ulalek colorless-hybrid mana-glyph rendering defect in its Play card-detail modal
- VM-563 manifest, corpus-QA, summary, source-intake, exactly 37-sheet workbook, Kanban/board, and this handoff/index

No file under `docs/research/canon/` changed.

## What changed

- Promoted explicit relationship-owned modal text so historical generators can no longer recreate the shared Play composer.
- Resolved all 49 `REMEDIATION_LIKELY` rows and 38 real corpus-level style artifacts using the smallest-field rule.
- Changed 17 tile fields and 92 modal fields across the final corpus.
- Retained every card, relationship, exact printing, identity, slot, and order.
- Recorded all 119 final rows in a machine manifest and an exactly 37-sheet owner workbook.
- Extended mana-cost rendering to the existing Magic symbol classes for `{C/W}`, `{C/U}`, `{C/B}`, `{C/R}`, and `{C/G}` so Ulalek's modal does not expose brace notation.

## Why it changed

VM-561 proved that the defect was systemic: relationship semantics were mostly sound, but generated shared composers, redundant modals, generic card explanations, and five evidence-floor exceptions degraded the player-facing Sound/Play teaching surfaces. VM-563 repairs the authoritative producer and bounded copy fields without reopening placement, identity semantics, or unrelated dossier content.

## Decisions made

- VM-562 is frozen at `7f79efa3b7442a202db04e6b7013b701bffc4286` and its 14 calibrated rows were applied verbatim.
- Feather, Ruric Thar, and Glint/Atarka retain their cards under inspected official source support and are `SOURCE_INTAKE_RESOLVED`.
- Dune/Scour and Witch/Amphin retain their cards under narrower approved Vox Mana facets; no missing-color psychology was manufactured.
- No replacement was necessary. Remaining hard owner blockers and modal-content-model reviews are both zero.
- Residual repeated n-grams are documented as legitimate Magic rules/card vocabulary, not shared explanatory scaffolding.

## Risks / uncertainties

- Final player-visible taste remains an owner judgment; the candidate is not accepted or deployed.
- Scryfall image delivery remains VM-559's external-CDN limitation and was not semantically reopened.
- A local in-app-browser tab retained an earlier Mardu review state; the deterministic all-37 and family-representative replay suites are the authoritative rendered evidence for this candidate.

## Tests run

- `node scripts/vm563-sound-play-final-tests.mjs` — PASS; 0 exact duplicates, 0 near duplicates, 0 shared skeletons, 0 high tile/modal echoes, 0 method leaks.
- `npm.cmd run test:vm551-card-content-authority` — PASS; 52 rationale sources / 50 rendered, 73 voice sources / 73 rendered, 37/37 coverage, 0 unresolved.
- `npm.cmd run test:vm551-dossier-integrity` — PASS.
- `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --collect-failures` — PASS, 37/37.
- Focused mobile replay for `W`, `WU`, `LOREHOLD`, `MARDU`, `GLINT`, `WUBRG`, and `COLORLESS` — PASS, 7/7.
- `npm.cmd run test:vm559-first-hover` — PASS; eight fresh-state hover surfaces, keyboard, and touch.
- `npm.cmd run lint:js` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run test:copy-boundaries` — PASS.
- Workbook structural/render verification — PASS, exactly 37 sheets and no summary sheet.
- `git diff --check` — PASS.

## RobDevPass implementation packet

- Owning authority: relationship sources for player copy; VM-561 underlying evidence for identity altitude; committed Scryfall records for exact card facts.
- Changed behavior: Sound/Play tiles and modals plus the directly related colorless-hybrid glyph rendering case.
- Protected behavior: all unrelated Archscry sections, placement/scoring/qualification, routing, result states, card selection/printing/order, identity semantics, VM-559 media policy, and canon corpus.
- Consumers: production Sound/Play rendering, shared card detail, generated catalogs, final manifest/workbook, and owner review.
- Smallest complete fix: explicit source-owned copy, narrowly regenerated dependents, full resulting-corpus QA, and proportional rendered replay.
- Non-goals honored: no broader dossier rewrite, placement suite, relationship reranking, push, merge, deploy, or acceptance.

## RobQAPass readiness

- Tier: QA-1 content/data implementation with focused rendered-product coverage.
- Deterministic facts are machine-verified across all 37 identities; owner work is limited to visual/product judgment.
- Candidate gate: final owner rendered-product acceptance only.
- Suggested owner command: `npm.cmd run review:vm559 -- --identity=WUBRG --viewport=desktop`.

## Not touched

Start Here, Matrix, Card Signals, Mana Notes and its tiers, commander/precon recommendations, dossier layout, hover implementation, placement/scoring/qualification, routing, result states, certified identity semantics, `docs/research/canon/`, VM-559 acceptance/deployment state, and production hosting.

## Follow-up recommendations

Run the one deterministic WUBRG desktop review command and judge the Sound/Play wording, modal value, wrapping, and card-detail glyphs. If accepted, proceed through the existing VM-559 integration/deployment closeout; if a concrete defect is found, report that exact row and field.

## Next suggested agent

Owner rendered-product reviewer, then an integration/release agent only after explicit acceptance.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-563-archscry-sound-play-final-corpus-remediation.md`
- `docs/research/archscry-sound-play-audit/vm563-final-remediation-manifest.json`
- `docs/research/archscry-sound-play-audit/vm563-full-corpus-qa.json`
- `outputs/01a007e0-b631-7ca1-a18c-9f6e6ff6ff29/VM-563-Sound-Play-Final-Review.xlsx`
