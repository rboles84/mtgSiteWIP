# VM-612 Semantic Typography Upgrade - Owner Review Handoff

## Agent name

Codex

## Task requested

Implement the owner-specified Vox Mana typography system on a dedicated `font-upgrade` branch,
complete technical and rendered QA, leave localhost running, and stop uncommitted/unpushed for
owner review.

## Files reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`, relevant VM-413/414/415/592 handoffs, `docs/kanban/board.md`,
  VM-413 and related route/design documentation
- Active shared and route typography CSS/HTML/JS consumers, font inventory, validation and visual
  comparison scripts

## Files changed

- Fonts: `assets/fonts/README.md`, 12 new WOFF2 files, four OFL notices
- Shared CSS: `assets/css/fonts.css`, `tokens.css`, `topbar.css`, `components.css`
- Route CSS: `home.css`, `maze.css`, `archscry.css`, `apocrypha.css`, `strategium.css`, `legal.css`
- HTML: Home; Maze; Archscry; Apocrypha; Library; Privacy; Terms; Strategium hub, review, console,
  before-game, during-game, and find-a-table routes
- JS rendering strings: `assets/js/shared/vm-radar.js`, `assets/js/home/home.js`,
  `assets/js/archscry/dossier-radar.js`
- Validation/governance: `scripts/validate-frontend-html.mjs`, VM-612 card, board, this handoff/index

## What changed

- Active roles are Cormorant SC 700 brand, Almendra 400/700 expression/destination, Lora variable
  normal/italic 400-700 reading, Outfit variable 400-700 interface, and IBM Plex Mono technical.
- All new faces are self-hosted Latin/Latin-ext WOFF2 with `font-display: swap` and documented OFL
  provenance. No runtime Google Fonts/CDN dependency was introduced.
- Global unclassified h1-h4 fallback is Lora. Confirmed route identity/editorial headings use
  Almendra; navigation, controls, labels, metadata, functional headings, dialog UI, and ordinary
  card titles use Outfit; literal queries/type lines/machine data retain Plex Mono.
- The topbar splits Cormorant SC brand from Outfit navigation. All live changed CSS URLs are
  versioned to avoid stale active-token CSS after deployment.
- Home uses natural-case DOM lines `Find your place.` and `Shape your play.`, visual uppercase
  Almendra 700, one CSS diamond divider, and only one strong font preload (Almendra 700 Latin).
- Direct Fraunces strings in SVG/canvas/chart rendering were migrated. No live
  `font-variation-settings` remain.

## Why it changed

The prior Fraunces/Spectral/Plex contract collapsed brand, display, reading, and interface voices.
The new system makes each semantic job legible while preserving Vox Mana's existing mystical,
Commander-first visual identity and all application behavior.

## Decisions made

- Existing old font binaries and inactive old `@font-face` blocks are retained for rollback until
  owner acceptance; they are not active token consumers and did not request at runtime.
- Library remains the existing Apocrypha alias. Placement is an Archscry dossier surface, not a
  dedicated route, so no invented Placement URL was added.
- A real mobile overflow finding was fixed by narrowing the winning hero selector and reducing the
  responsive Almendra scale; reviewed 390 px line rects fit with zero overflow.
- Apocrypha BEM `__label` semantics were explicitly corrected to Outfit after computed-style QA.
- Visual baselines were not changed, and the candidate was not committed, pushed, or merged.

## RobDev compact packet

- Outcome: a self-hosted, semantic, five-role typography system on every live public consumer.
- Owner/producer: shared tokens/font declarations own the contract; route CSS owns known semantic
  exceptions; HTML owns hero copy/preloads; chart/canvas source owns direct rendering strings.
- Changed behavior: typography assets, family/weight/metrics, Home hero copy/divider/preload, and
  deployment cache keys only.
- Protected behavior: placement/scoring/data, Maze parsing/query, Loom, Archscry workflows,
  Strategium flows, routes/navigation structure, backgrounds, artwork, icons, and visual baselines.
- Risks: shared cascade, stale CSS, metric overflow, native controls, dynamic dialog content, glyph
  fallback. All were directly checked at representative live surfaces.
- Non-goals/not touched: data/generated sources, product logic, factual content, backgrounds,
  artwork, icons, analytics, routing architecture, old asset deletion, baseline regeneration.
- Stop condition reached: implementation and bounded QA complete; visual judgment belongs to owner.

## Risks / uncertainties

- The old-family `@font-face` declarations and binaries remain inactive rollback inventory. Remove
  them only after explicit owner acceptance and a separate cleanup authorization.
- Mixed Greek/rare-symbol corpus uses fallback outside the shipped Latin/Latin-ext family subsets;
  this is expected and preserves readable system fallback. MTG/Latin punctuation rendered cleanly.
- Browser smoke times out before Archscry workflow initialization in its isolated harness despite
  direct live dossier/modal success. The four visual scripts have pre-diff harness/infrastructure
  failures detailed below; neither result was silently treated as a pass.

## Tests run

- PASS: `npm.cmd run lint:html`
- PASS: `npm.cmd run lint:js`
- PASS: `npm.cmd run test:frontend-smoke`
- PASS: `npm.cmd run test:maze-results-layout`
- PASS: `npm.cmd run test:strategium-review` (success output buffered until bounded interrupt)
- PASS: direct localhost/browser QA at 1440x1000 and 390x844 for Home; desktop Maze, Archscry live
  Colorless dossier and Zhulodok card dialog, Apocrypha, Strategium; Privacy/Terms/Library computed
  checks; topbar at 1360/1180/1040/720/390; zero reviewed horizontal overflow
- PASS: 12/12 new WOFF2 URLs returned HTTP 200, MIME `font/woff2`, and expected byte sizes
- PASS: active token/computed families, font readiness, stylesheet origin, post-load Home hero rect
  stability, and Latin/Latin-ext plus technical-string fallback behavior
- PASS: `git diff --check` before closeout; final rerun required after this handoff
- FAIL (harness): `npm.cmd run test:browser-smoke` times out before Archscry initializes; no active
  dossier state or typography assertion is reached
- NOT EVALUATED (no baseline update): `test:visual:home` artifact `EPERM`;
  `test:visual:archscry` missing `scripts/data/factions.json`; Strategium/Apocrypha timeouts

## Not touched

Product logic, factual data, generated JSON, placement/scoring, Maze parser/query behavior,
Strategium/Archscry workflows, backgrounds, artwork, iconography, analytics, visual baselines,
`main`, `origin/main`, old font assets, git history, and remote state.

## Follow-up recommendations

1. Owner reviews Home desktop/mobile, shared topbar, Maze, Archscry dossier/dialog, Apocrypha, and
   Strategium at the provided localhost URL.
2. If accepted, separately authorize commit/push/merge and later old-font cleanup.
3. Repair visual-harness paths/permissions and the Archscry browser-smoke initialization contract
   independently; do not mix those infrastructure changes into this typography candidate.

## Next suggested agent

Owner visual reviewer; after acceptance, a bounded integration/cleanup agent.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-612-semantic-typography-system-upgrade.md`
- `docs/kanban/board.md`
- VM-413 typography architecture and VM-414/415/592 preservation decisions
- `.agents/skills/robdev/SKILL.md` / `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` / `docs/qa/RobQAPass.md`

## Branch / exact state

- Branch: `font-upgrade`
- Base, `main`, `origin/main`, and current uncommitted HEAD:
  `960c3a2db27f5b4dd4cbae6cc5b0889235f3750b`
- Local review: `python -m http.server 4174 --bind 127.0.0.1`
- Review URL: `http://127.0.0.1:4174/`
- Commit/push/merge: none
