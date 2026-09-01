# VM-614 Field Guide Owner Review Handoff - REJECTED

Status: **Superseded by later owner findings.** This original candidate is preserved as history and its
screenshots/READY claim are not acceptance evidence.

## Agent name

Codex

## Task requested

Build the first `/guide/` surface, add Guide to canonical public navigation, add a bounded Home discovery
treatment, run focused deterministic and rendered RobQA, and stop at Owner Review without merging,
pushing, opening a PR, or beginning VM-615 through VM-617.

## Files reviewed

- repo-local RobDev and RobQA skills, usage guides, and frozen gates
- VM-613 accepted contract, maps, recon, sequence, card, and closeout handoff
- Home, every canonical public topbar instance, mobile cloning/active-state code, shared tokens/fonts/layout,
  route shells, footer/feedback/reduced-motion patterns, metadata validators, smoke tests, and architecture
- exact baseline, branches, worktrees, repository status, and accepted VM-613 ancestry

## Files changed

Production/UI:

- `guide/index.html`
- `assets/css/guide.css`
- `index.html`
- `assets/css/home.css`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`

Validation/metadata:

- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/check-route-metadata.mjs`
- `scripts/guide-browser-smoke.mjs`
- `package.json`

Documentation/workflow:

- `README.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- this handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added a concise Guide hero using the accepted naming hierarchy.
- Added three primary decisions for Commander direction, card finding, and in-page product orientation.
- Added the optional common flow Archscry -> Reading -> Dossier -> Maze, with Strategium and Apocrypha
  shown as separate parallel authorities and Guide as the surrounding compass.
- Added brief existing-reading, Strategium, and Apocrypha continuations plus low-emphasis Archscry advice.
- Inserted Guide in the exact canonical public navigation order; existing JS continues to clone the desktop
  links into the mobile menu and applies Guide active state.
- Added one Home text treatment outside the exact four-card functional grid.
- Added focused route, nav, metadata, later-route-absence, keyboard, responsive, and reduced-motion checks.
- Remediated the owner's visual finding by replacing the legacy gateway background and equal-card layout
  with a current codex atmosphere, rounded glass hero, asymmetric decision hierarchy, rounded actions,
  and a framed product map. Content and behavior remained unchanged.

## Why it changed

VM-613 established that visitors need an optional wayfinding front door without turning Guide into a
fifth product pillar or duplicating specialist instruction. VM-614 implements that smallest complete
foundation through current static-route and shared-shell machinery.

## Decisions made

- After two owner findings, the current candidate reuses the live Archscry/Maze gateway, route base,
  rich-atmosphere runtime, rounded glass, compact controls, and primary-surface rhythm; no new art, font,
  framework, or product state was introduced.
- Kept all three primary actions specific and immediately useful.
- Made the map copy explicitly non-mandatory and kept non-link Reading/Dossier nodes informational.
- Used a dedicated Guide browser smoke because the broad browser smoke has a known unrelated Archscry
  startup gap and the in-app browser's key-injection result alone was insufficient evidence.
- Used a 720px CSS viewport as the deterministic layout equivalent of 200% zoom on 1440px.
- Converted the corrected owner finding into a Guide-only invariant: the Archscry/Maze atmosphere contract,
  an integrated two-column desktop command deck near the topbar, and three compact contained decisions.

## Risks / uncertainties

- Final judgment on the remediated hero/flavor balance, asymmetric hierarchy, map density, and the Home
  link's prominence remains subjective.
- The map is intentionally a relationship aid, not a new state machine; later Guide cards must not infer
  state/deep links from it.
- Six-link desktop navigation was rendered at the required 1440px size and switches to the existing menu
  below the current breakpoint; intermediate future label growth remains a shared-shell risk.

## Tests run

- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `npm.cmd run test:route-metadata`
- PASS `npm.cmd run test:copy-boundaries`
- PASS `npm.cmd run test:guide-browser`
- PASS `git diff --check`
- PASS in-app rendered Guide/Home review at 1440 x 1000 and 390 x 844
- REJECTED the intermediate Apocrypha-derived Guide review; it used the wrong product authority
- PASS current Archscry/Maze-converged Guide review at desktop and 390 x 844; the primary action was also
  clicked through to Archscry in the in-app browser
- SKIP broad browser smoke because its accepted fresh-session Archscry gap is outside VM-614
- NOT REQUIRED Placement, dossier-generation, all-identity, mutation, calibration, and recovery suites

## Not touched

- Placement scoring/evidence/ranking/stopping and SIRF
- Archscry reading, save, resume, account, result, or dossier behavior/content
- Maze parsing, query, mode, result, context, Reading Finds, or persistence behavior
- telemetry
- Strategium lessons or Apocrypha sources
- `/library/` redirect behavior beyond the authorized nav insertion
- `/guide/reading/`, `/guide/maze/`, `/guide/reference/`, VM-615, VM-616, and VM-617

## Follow-up recommendations

- Owner reviews only the five requested product judgments and reports acceptance or bounded findings.
- Do not register or begin later Guide cards until VM-614 receives explicit owner disposition.

## Next suggested agent

Owner Review; return objective defects to Codex within VM-614 scope.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`

## RobDev / RobQA transfer

- Outcome: a functional but optional Guide front door and global discovery route.
- Owning authority/producer: VM-613 contract; authored static Guide/nav/Home files.
- Changed behavior: Guide route, nav discovery, bounded Home orientation, and focused tests.
- Protected behavior: every specialist semantic/state/runtime contract listed above.
- Relevant states: desktop/mobile, active nav, cloned mobile menu, keyboard, map anchor, reduced motion,
  390px, and 200% zoom-equivalent layout.
- Validation: QA-3 deterministic and rendered evidence in the QA record.
- Disposition: **RobQA READY - Owner Review required**.
