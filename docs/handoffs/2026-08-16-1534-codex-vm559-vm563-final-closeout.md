# VM-559 / VM-563 Final Owner-Accepted Closeout

## Agent name

Codex

## Task requested

Integrate, push, deploy, production-verify, document, and safely close owner-accepted VM-559 / VM-563 exact corrective candidate `52fdd86155c8a47f5ac8650fe9d92a8f5010ca07`, while preserving the VM-560 through VM-563 evidence trail and the frozen historical VM-551 owner-review artifact.

## Files reviewed

- `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, and `docs/reference/token-reasoning-cost-control.md`
- VM-559 and VM-563 cards, implementation handoffs, board, and handoff index
- VM-560 source router, VM-561 identity packets/ledger/source reconciliation, VM-562 calibration, and VM-563 manifest/corpus QA/source intake/workbook
- Production relationship sources, Scryfall projection/manifest, runtime renderer, focused replay tests, GitHub workflows, and prior VM-558 integration closeout
- Frozen VM-551 Packet 1 owner-review snapshot

## Files changed

- Added `docs/research/archscry-sound-play-audit/INDEX.md`, `artifact-registry.json`, and `current-release.json`.
- Updated VM-559 / VM-563 cards, board, implementation handoffs, and handoff index for exact owner acceptance and closeout.
- Moved the VM-559 / VM-563 cards from `in-progress` to `done` after successful production verification.
- Added this closeout handoff.

No production relationship, card, printing, player-facing copy, runtime, generated product data, placement, scoring, routing, result-state, or canon research file changed after owner acceptance.

## What changed

- Cataloged the full VM-560 through VM-563 body of work by authority role without moving or reorganizing it.
- Added one stable current-release pointer to the accepted candidate, corpus counts, media counts, primary evidence/decision/review artifacts, and historical VM-551 boundary.
- Fast-forwarded `main` from `6a6b7893f1126421c3f56588b92f4419f45c6a76` through the accepted lineage and documentation catalog to product release commit `aec62fb54c59eed02842eebc8e34f89dddc80f5f`.
- Pushed `main`, verified GitHub validation and Pages success for that exact SHA, and completed focused live production verification.
- Closed VM-559 and VM-563 with no remaining owner blocker.

## Why it changed

The accepted product needed a truthful QA-5 release record and a durable way for future agents to distinguish active production authority, reusable evidence, decision history, derived QA, owner review, and frozen historical snapshots. The catalog preserves the considerable research investment without turning derived artifacts into semantic authority.

## Decisions made

- Production authority remains `data/dossier/card-voice-relationships.source.json` and `data/dossier/card-rationale-relationships.source.json`; committed Scryfall data owns exact card facts.
- VM-560 routes and VM-561 evidence are reusable evidence/navigation, not automatic claim proof.
- VM-562/VM-563 materials are accepted method/decision history, not production inputs.
- Workbooks, manifests, summaries, and corpus-QA files are review/traceability artifacts.
- The frozen VM-551 owner-review packet remains historical. Its Scour state is intentionally not regenerated to equal current Dune-Brood production authority.
- The existing historical VM-551 regeneration command was intentionally not used as a closeout gate because GitHub's current governed validation does not require it and its old snapshot contract would conflate historical review with current active source.
- The external image-CDN limitation remains accepted: metadata resolution is local/deterministic, while image binaries still come from `cards.scryfall.io`.

## Risks / uncertainties

- A Scryfall image-CDN outage can still produce retryable media placeholders; VM-559 does not provide local bitmap hosting.
- Live UI identity switching remains driven by an actual saved reading. Production interaction was exercised on the live Mardu reading; Dune, Glint, and Ulalek production bytes/card/CDN records were cache-bypass verified against the exact deployed SHA, with their full rendered behavior already accepted and locally replayed before integration.

## Tests run

- `node scripts/vm563-sound-play-final-tests.mjs` — PASS: 37/119/73/46/4, zero exact/near duplicates, zero shared skeletons, zero high echoes, and zero methodology leaks.
- `npm.cmd run scryfall:index:check` — PASS: byte-identical 1,178 occurrences / 572 resolver keys / 37 identities.
- `npm.cmd run test:vm559-media-projection` — PASS: 1,178 / 572 / 37 / zero unresolved.
- `npm.cmd run test:vm559-resolution` — PASS.
- `npm.cmd run test:vm559-first-hover` — PASS: eight fresh-state surfaces plus keyboard/touch.
- Artifact registry/current-release validation — PASS: 16 artifacts, all paths present, authority enums valid, IDs unique, accepted SHA/counts exact, and the historical VM-551 Git blob plus LF-normalized checksum exact across Windows checkout line endings.
- `git diff --check` — PASS before integration.
- GitHub `Vox Mana Validation` run `31973451226` — PASS at exact SHA `aec62fb54c59eed02842eebc8e34f89dddc80f5f`.
- GitHub Pages run `31973450385` — PASS at exact SHA `aec62fb54c59eed02842eebc8e34f89dddc80f5f`.
- Cache-bypassed live Mardu desktop — PASS: exact `Mardu Card Signals` heading; zero visible unavailable/invalid images; hidden segments unhydrated; first hover opened Alesha correctly with one overlay and no prior click; Premium hydration resolved all five cards; Sound/Play remained only in Why This Fits; card modal opened, wrapped, closed by Escape, and restored focus; no browser warnings/errors.
- Cache-bypassed live Mardu 390x844 — PASS: no horizontal overflow, no unavailable/invalid images, and card modal contained within the viewport.
- Cache-bypassed production data — PASS: Dune-Brood exact printing/quote/modal live; Scour absent from active Dune Sound; Glint retains Aberrant Return, Atarka, and Yidris; deployed JS is byte-equal to local accepted JS and includes the `{C/W}`-class-generating hybrid glyph renderer; live media manifest is 1,178/572/0 with zero drift.
- Live Scryfall CDN candidate checks — HTTP 200 for Dune-Brood, Aberrant Return, Atarka, Yidris, Ulalek, and Swamp.

## RobDevPass implementation packet

- Changed behavior: documentation discoverability, exact accepted-release pointer, Kanban lifecycle, integration/push/deployment state, and closeout evidence only.
- Owning layer: active relationship sources and Scryfall records remain unchanged; workflow/card/handoff files own closeout status; the new registry owns only artifact classification/discovery.
- Protected behavior: all player-facing copy, relationships, exact printings, runtime, media policy, placement/scoring/qualification, routing, result states, identity semantics, canon corpus, and historical audit bytes.
- Existing machinery: continued the single branch/worktree, used fast-forward integration, existing GitHub validation/Pages workflows, existing VM-559/VM-563 tests, and the established handoff/Kanban system.
- Smallest complete implementation: three catalog surfaces, exact acceptance/closeout metadata, proportional release QA, live verification, and safe branch cleanup.
- Non-goals honored: no semantic repair, content rewrite, source re-authoring, generated product change, placement test expansion, new branch/worktree, or historical snapshot rewrite.

## RobQAPass closeout

- QA tier: QA-5 integration/deployment.
- Changed behavior: release state and publication of the already owner-accepted candidate.
- Protected behavior intentionally untouched: all semantic/product contracts above.
- CPU-heavy validation: NOT REQUIRED. Placement journeys, 5,000 journeys, 6,660 synthetic runs, mutation suites, recovery suites, and unrelated all-37 browser recertification were intentionally skipped because placement/runtime semantics did not change during closeout.
- Manual finding converted to invariant: the VM-551/VM-563 mismatch is now explicitly classified as frozen historical snapshot versus current production authority, with the frozen artifact checksum preserved.
- Remaining owner judgment: none; owner acceptance preceded integration and production verification found no product defect.

## Not touched

- Player-facing Sound/Play prose, card selections, relationship IDs, exact printings, placement, scoring, qualification, routing, result states, identity definitions, unrelated Archscry sections, and `docs/research/canon/`.
- VM-560/VM-561/VM-562/VM-563 evidence and decision history was not deleted, collapsed, or reorganized.
- The frozen VM-551 owner-review artifact was not regenerated.
- No new worktree was created.

## Follow-up recommendations

- Future Sound/Play work should begin at `docs/research/archscry-sound-play-audit/INDEX.md` and use `artifact-registry.json` to select the correct authority layer.
- Update `current-release.json` only after a later candidate receives explicit acceptance; retain prior manifests and rejection history.
- If `cards.scryfall.io` availability becomes an unacceptable product dependency, treat local/redundant bitmap delivery as a separate architecture decision.

## Next suggested agent

Normal future product work from clean, synchronized `main`.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-559-archscry-authored-card-media-resolution.md`
- `docs/kanban/done/VM-563-archscry-sound-play-final-corpus-remediation.md`
- `docs/research/archscry-sound-play-audit/INDEX.md`
- `docs/research/archscry-sound-play-audit/artifact-registry.json`
- `docs/research/archscry-sound-play-audit/current-release.json`
