# VM-580 Final Shared Transform-Media Independent RobQA

## Agent name

Independent RobQA subagent

## Task requested

Review exact VM-580 candidate d590970521d5880ec128f734b2491d2d80915c00 against parent 2b9741679ae29b692daf278895da41686eb24ef6. Treat RobDev claims as untrusted; verify the common Archscry preview owner, Maze-derived shared face interaction, repeated real-pointer transform behavior, initially uncached alternate-face delivery, ordinary-card exclusion, Card Details and focus/keyboard protection, and accepted VM-581/582/583 freeze. Do not implement, merge, push, close, or mark Done.

## Decision

PASS — Owner Review Ready

- Exact reviewed candidate: d590970521d5880ec128f734b2491d2d80915c00
- Exact parent: 2b9741679ae29b692daf278895da41686eb24ef6
- Branch: codex/vm580-vm583-owner-qa-remediation
- Remaining owner review: VM-580 repeated Nicol Bolas hover flipping only.

## Files reviewed

- AGENTS.md
- .agents/skills/robqa/SKILL.md
- docs/qa/RobQAPass.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- VM-580 through VM-583 cards
- VM-576, prior VM-580 rejection/remediation, and current RobDev handoffs
- Exact parent-to-candidate diff
- assets/js/shared/scryfall-transform-faces.js
- assets/js/archscry/runtime/card-media.js
- assets/js/archscry/runtime/actions.js
- assets/js/archscry/runtime/content.js
- assets/js/archscry/runtime/dossier-view.js
- assets/js/maze/research-init.js
- assets/css/archscry.css
- Candidate focused transform and browser regressions

## Preflight summary

- Recent work: VM-576 established the shared Scryfall face normalizer and transform UI. Earlier VM-580 candidates retained separate Archscry preview state/lifecycle compensation and passed automation but failed owner repeated-flip acceptance. This candidate replaces that rejected direction with closure-owned face interaction derived from the proven Maze pattern.
- Risks: boundary loss after face/media swap, stale image/copy/control state, uncached alternate image collapsing the hit area, ordinary cards receiving Flip, Card Details regression, fixture-specific production logic, or reopening accepted VM-581/582/583.
- Locked decisions: VM-581, VM-582, and VM-583 are owner accepted and frozen; VM-580 alone remains open; one common preview owner must cover every Archscry card-bearing preview consumer; no Maze component/layout copy, click-to-lock, product rewrite, special card/identity/section logic, merge, push, closure, or Done transition.
- Candidate files: shared Scryfall face utility, common Archscry preview runtime/CSS, focused regressions, VM-580 governance, accepted-card freeze records, and RobDev handoff/index.
- Do not touch: unrelated modified docs/kanban/board.md; untracked .agents/; VM-584 card; and docs/research/maze-player-language/corpus/, including VM-578.

## Architecture findings

- createScryfallTransformMediaBehavior lives in the existing shared Scryfall face module and delegates eligibility, normalization, selected face, next face, and repeated progression to the existing authoritative transform face-state functions. Selection stays ephemeral inside one closure and does not mutate Scryfall data.
- The helper extracts the proven Maze closure pattern: one local face state, persistent media/control nodes, atomic face updates, and repeated next-state replacement. It imports no Maze layout, Reading Finds, scratchpad, routing, or search-result behavior.
- The single Archscry showCardPreviewOverlay owner creates the behavior for every resolved named preview. Existing selector and delegated pointer/focus machinery continues to cover Card Signals, lands/Mana Notes, Card Voice, Card Rationale, and named commander preview consumers.
- The singleton preview overlay and nested transform media remain persistent. Existing image, face-copy, and transform button nodes update in place; neither overlay nor listener is recreated.
- Rejected preview globals and bespoke deferred boundary compensation are retired. Archscry keeps its source-plus-preview dismissal and positioning ownership.
- Production searches found no Nicol Bolas, Ravager, Arisen, Grixis, or Card Signals branch in the shared helper or common preview owner.
- Eligibility rejects ordinary and malformed records. A second transform witness, Delver of Secrets, uses the same helper.
- Exact diff contains no Maze product file, accepted VM-581/582 owner runtime, accepted VM-583 runtime/CSS, dossier presenter, provider route, placement, persistence, telemetry, or generated-data file. VM-581/582/583 card changes only record owner acceptance/freeze.

## Change classification

- QA tier: QA-2 component interaction.
- Changed behavior: common Archscry hover previews use closure-owned shared transform media with a persistent media/control boundary for indefinite face switching.
- Protected behavior: accepted VM-581 labels/routes, accepted VM-582 provider sizing, accepted VM-583 Maze layout, Card Details semantics, preview positioning/dismissal, ordinary previews, Scryfall authority, placement, persistence, telemetry, generated data, and Maze behavior.

## Tests selected and results

- npm run test:transform-faces - PASS. Proved eligibility, normalized face data, ephemeral closure state, six consecutive flips, ordinary exclusion, a second transform, and unchanged Maze result face contracts.
- npm run test:archscry-transform - PASS. Proved common-owner consumption, persistent structure/CSS, rejected state/lifecycle removal, preview consumer coverage, no fixture/identity/section branch, and independent Card Details state.
- npm run test:post-vm579-owner-qa - PASS. Fresh no-store real Edge used real pointer movement for source -> preview -> flip -> re-enter -> flip back -> re-enter -> flip -> re-enter -> flip back -> leave -> dismiss. It asserted the singleton overlay witness/geometry, delayed initially uncached alternate media, live selected face/image/name/type/Oracle/alt/control state, ordinary-card no-Flip, Card Details both directions, and frozen accepted behavior.
- Transient independent real-Edge keyboard/focus probe - PASS. Enter opened Nicol Bolas Card Details; Enter on focused Flip performed Ravager -> Arisen -> Ravager; Escape closed and restored focus to the invoking trigger. The probe was deleted after use.
- npm run test:dev-review - PASS.
- npm run lint:js - PASS for 31 frontend files.
- npm run lint:html - PASS.
- npm run test:frontend-smoke - PASS for Home, Maze, Archscry, Library alias, Privacy, and Terms.
- node --check on the shared utility, card-media runtime, and focused browser regression - PASS.
- Exact parent-to-candidate git diff --check - PASS.

## Tests intentionally skipped

- Placement journeys, synthetic, mutation, recovery, enumeration, and full-engine certification: not required because no placement/scoring/ranking/qualification/persistence/generated-identity behavior changed. QA-4 suites cannot add confidence to this QA-2 pointer risk.
- Broad all-37 rendered certification: not required because the common-owner structural proof and deterministic transform witnesses cover the changed class without dossier-composition changes.
- Re-review of accepted VM-581/582/583 judgment: prohibited by the owner freeze; exact diff found no accepted runtime/CSS owner change.

## CPU-heavy validation

NOT REQUIRED

## Rendered evidence

- Case: Grixis direct-review dossier, Card Signals, Nicol Bolas transform.
- Viewport: 1440x1000, scale 1, fresh no-store local origin, real headless Edge pointer input.
- Result: ordinary Sedris displayed no Flip. Source-to-preview crossing kept the singleton Nicol Bolas preview visible. The same overlay witness and card-ratio geometry survived delayed uncached back media. Four pointer-driven swaps progressed Ravager -> Arisen -> Ravager -> Arisen -> Ravager with preview re-entry, current face content/control state, and dismissal only after moving outside both boundaries.
- Keyboard: Card Details opened and flipped both ways with Enter; Escape dismissed and returned focus.
- Product console: zero relevant errors.
- Tooling note: in-app Browser could not initialize because the workspace sandbox helper was in a setup-refresh error. Independent rendered QA therefore used the repository real-Edge harness and a transient real-Edge keyboard probe. This is an environment limitation, not a product failure.

## Manual finding converted to invariant

- Finding: bespoke Archscry lifecycle patches passed automation but failed owner repeated flipping.
- Defect class: preview face/control ownership diverged from proven repeated-face interaction and could lose continuity after media delivery.
- Invariant: every resolved named card at the common Archscry preview owner uses one closure-owned authoritative transform behavior; the persistent source-plus-preview boundary survives at least four alternating real-pointer swaps, including initially uncached media, with atomic face/content/control parity and dismissal only after leaving both boundaries.

## Files changed

- docs/handoffs/2026-08-22-1909-vm580-final-shared-transform-independent-robqa.md
- docs/handoffs/HANDOFF_INDEX.md

## What changed

Recorded independent exact-SHA QA evidence only. No candidate implementation, test, card, board, package, data, or accepted runtime/CSS file changed.

## Why it changed

Repository governance requires a durable specialist handoff and index entry.

## Decisions made

- PASS — Owner Review Ready on exact candidate d590970521d5880ec128f734b2491d2d80915c00.
- No known blocker, major defect, architectural drift, fixture-specific production logic, or accepted-scope regression remains.
- Owner recheck is VM-580 repeated Nicol Bolas hover flipping only.

## Risks / uncertainties

- Final product feel under the owner's pointer habits remains owner judgment.
- In-app Browser tooling was unavailable, but independent real Edge executed the required pointer and keyboard paths.

## Tests run

See Tests selected and results above; every selected command and rendered probe passed.

## Not touched

- Candidate runtime, CSS, tests, package metadata, Maze product, accepted feature owners, placement, persistence, telemetry, generated/source data
- docs/kanban/board.md
- .agents/
- VM-584 card
- docs/research/maze-player-language/corpus/, including VM-578
- Merge, push, close, Done state, branch/worktree topology

## Follow-up recommendations

1. Main agent should stage/commit only this handoff, its index entry, and deliberate VM-580 RobQA governance.
2. Ask the owner to recheck only repeated Nicol Bolas hover flipping for as long as desired, then leave both source and preview to dismiss.
3. Do not merge, push, close, or mark Done before explicit VM-580 acceptance.

## Next suggested agent

Main Goal Mode agent for governance commit and the single bounded VM-580 owner-review handoff.

## Related Kanban card, docs, or plans

- docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md
- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/handoffs/2026-08-22-1857-codex-vm580-final-shared-transform-media-robdev.md
