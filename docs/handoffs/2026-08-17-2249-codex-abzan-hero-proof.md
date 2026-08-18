# 2026-08-17 22:49 — Codex — Abzan Hero Official-Art Proof

## Agent name

Codex

## Task requested

Implement a tightly scoped Abzan-only official-art hero proof: approved Abzan official card art through the existing Vox Mana hero overlay/component and existing Abzan dossier content, then provide a deterministic local review method. Do not commit, merge, push, deploy, or touch the other 36 identities.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-01-0836-codex-vm270-jeskai-hero-background-image-trial.md`
- `docs/kanban/done/VM-373-wubrg-identity-hero-background-hookup.md`
- `docs/architecture/route-ownership-matrix.md`
- `package.json`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`
- `C:\WIP\VoxManaHeroArt\approved\abzan_tdc-1-betor-ancestor-s-voice.jpg`
- `C:\WIP\VoxManaHeroArt\approved\abzan_tdc-1-betor-ancestor-s-voice.png`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/abzan-official-art-hero-proof.md`
- `assets/img/identity-hero/official/abzan-betor-ancestor-s-voice.jpg`
- `docs/handoffs/2026-08-17-2249-codex-abzan-hero-proof.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added a new rollback-safe Abzan official-art asset at `assets/img/identity-hero/official/abzan-betor-ancestor-s-voice.jpg`.
- Preserved the existing Abzan rollback asset at `assets/img/identity-hero/abzan.webp` unchanged.
- Added an Abzan-only hero artwork override in `assets/js/index.js` that points only `ABZAN` to the new official proof asset, with focal position `50% 42%` and a minimal attribution string.
- Preserved the existing shared hero presentation model: overlay gradient, image layer, fallback identity banner layer, `cover`, and `no-repeat`.
- Added scoped Abzan-only credit styling for `.guild-art-credit` inside the Archscry hero.
- Updated focused dossier follow-up test expectations to protect the Abzan proof path while asserting non-Abzan identities keep the established local `.webp` mapping.
- Added a non-numbered Kanban card for the proof without inventing a VM issue number.

## Why it changed

The owner supplied manually curated approved Abzan files and asked for a one-identity visual proof before expanding the official-art rollout to the remaining identities. The implementation uses the existing Archscry hero machinery and adds only the narrow Abzan override needed to prove the workflow.

## Decisions made

- Selected `C:\WIP\VoxManaHeroArt\approved\abzan_tdc-1-betor-ancestor-s-voice.jpg` for production import even though the PNG has larger dimensions/filesize, because visual inspection showed the PNG is the full card frame while the JPG is the actual artwork crop suitable for a hero background. No art was generated, edited, cropped, or substituted.
- Kept `heroBannerImageSlugForFaction()` returning `abzan` for `ABZAN` so the old rollback asset path remains naturally addressable.
- Added the smallest proof mechanism: `heroBannerArtworkForFaction()` returns an Abzan-only override and otherwise preserves the existing `/assets/img/identity-hero/{slug}.webp` behavior.
- Used the real artist metadata visible in the approved card/source data: `Art: Lius Lasahido - Betor, Ancestor's Voice`.
- Used `50% 42%` as the initial authored focal position for Abzan to bias the art crop upward while retaining readable center text.

## RobDevPass compact implementation packet

- Changed behavior: only Abzan's Archscry identity hero background image, authored focal position, and minimal hero credit.
- Owning authority / producer: `assets/js/index.js` owns hero mapping/background generation; `assets/css/archscry.css` owns the scoped credit presentation; `data/factions.json` remains the dossier content authority and was not edited.
- Existing machinery reused: the established `.guild-banner` rendering path, `IDENTITY_HERO_OVERLAY`, `data-hero-background="identity-image"`, and background shorthand are preserved.
- Protected behavior: other 36 identity hero paths, scoring, routing, questionnaire flow, placement model, dossier copy, layout, typography, shared gradients, Matrix/Maze surfaces, and generated/source data.
- Consumers inspected: Archscry result render, VM-551 local witness restoration route, focused dossier test helper, static asset serving.
- Smallest complete implementation: one new asset, one Abzan-only data override/helper, one conditional attribution node, one scoped Abzan CSS rule, focused test expectation update, local review instructions.
- Non-goals: no 37-identity official-art rollout, no redesign, no generated data edits, no production deploy, no commit.

## Risks / uncertainties

- Final focal position remains owner-judgment: `50% 42%` is a sensible starting point, not a final art-direction approval.
- The existing `research/archscry-dossier-followup-tests.js` currently stops on an unrelated pre-existing approved-rationale assertion before reaching hero assertions.
- The VM-551 browser replay helper could not run because `node_modules` is absent and `chrome-launcher` is unavailable locally.
- In-app Browser automation could not safely seed session state: direct `sessionStorage` evaluation failed in the current restored session, and `javascript:` URL seeding was blocked by Browser policy. Manual DevTools seeding is provided for owner review.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Abzan official hero proof and all mapped non-Abzan identities — PASS
- `git diff --check` — PASS, with existing CRLF whitespace warnings only
- `Invoke-WebRequest http://127.0.0.1:4173/assets/img/identity-hero/official/abzan-betor-ancestor-s-voice.jpg` — PASS, HTTP 200
- `node research\archscry-dossier-followup-tests.js` — FAIL before hero assertions on unrelated existing assertion: `expected the approved card-rationale surface`
- `node scripts\vm551-all-37-live-ui-replay.mjs --identity=ABZAN --viewport=desktop` — BLOCKED by missing local dependency `chrome-launcher`

## Not touched

- Other 36 identity hero assets and mappings
- `assets/img/identity-hero/abzan.webp`
- `data/factions.json`
- Scoring, routing, questionnaire, placement, generated JSON, dossier copy, typography, shared layout, and deployment configuration

## Follow-up recommendations

- Owner should review Abzan locally and tune only the second background layer focal coordinates in DevTools before approving or requesting a tiny focal adjustment.
- If the proof is accepted, create a separately governed rollout plan for the remaining 36 identities rather than extending this proof in-place.
- If automated visual replay is required before approval, install/restore project dependencies in a governed dependency step and rerun the existing VM-551 harness.

## Next suggested agent

Owner visual QA for Abzan only.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/abzan-official-art-hero-proof.md`
- `docs/kanban/board.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/done/VM-373-wubrg-identity-hero-background-hookup.md`
