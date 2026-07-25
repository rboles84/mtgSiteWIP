# Apocrypha Gate 5 Registry Rendering

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Starting committed SHA: `26ea8f41579e513d6dd52e3c106649be60942d7d`

Starting parent: `e2e905f662948571f238b16c9d8547f57992cb2b`

## Scope

Gate 5 implements the first registry-driven Apocrypha runtime. This recovery pass accepts the implementation as a statically validated candidate only. It is not visually approved, browser-certified, accessibility-certified, publish-ready, or ready for publication.

Browser validation was blocked because the available in-app browser rejected the local served URL under environment policy. Manual browser validation is deferred to the next independent QA gate.

## Starting State

| Check | Result |
|---|---|
| Worktree | `C:/dev/voxmana.io-apocrypha-gate01` |
| Branch | `codex/apocrypha-gate01-source-inventory` |
| HEAD | `26ea8f41579e513d6dd52e3c106649be60942d7d` |
| HEAD parent | `e2e905f662948571f238b16c9d8547f57992cb2b` |
| Expected unstaged files | `apocrypha/index.html`, `assets/css/apocrypha.css`, `assets/js/apocrypha.js`, `scripts/validate-apocrypha-rendering.mjs` |
| Staged files before recovery | None |
| Registry/source validator drift | None |
| Original main worktree | Present but not used as edit location; unrelated dirty files existed before this pass |

## Completed

- Runtime implementation loads `../data/apocrypha-source-registry.json` under served HTTP.
- Runtime supports only `schemaVersion: 2` and fails closed on unsupported schema or malformed records.
- Runtime renders only `design`, `lore`, `official-archives`, and `supplemental`.
- Runtime suppresses `rules-card-records`; the official Rules record remains in the registry but is not rendered.
- No-JavaScript fallback HTML contains all authorized source records in deterministic registry order.
- Counts are generated from registry records and statically validated against the fallback.
- Source cards render title, publisher, author/date when known, badge labels, evidence role, used-for/not-for text, topics, verification treatment, and safe external links.
- Supplemental records are separated from official shelves and marked navigation-only.
- The old blanket "Verified" presentation was removed; official authority and link verification are separate.
- Static validation checks registry population, fallback completeness, shelf suppression, copy-contract markers, runtime fail-closed hooks, safe links, raw enum exposure, duplicate rendering, and responsive-risk hazards.
- Command-line HTTP validation confirmed route, registry, JavaScript, and CSS assets return HTTP 200 from a local static server.

## Not Completed

These checks are mandatory inputs to the next independent QA gate:

- Real-browser rendering validation.
- Desktop visual review.
- Tablet visual review.
- 390-pixel mobile visual review.
- JavaScript-disabled browser review.
- Keyboard-navigation browser review.
- Screen-reader or accessibility-tree review.
- Browser fetch-failure simulation.
- Browser unsupported-schema simulation.
- Visual regression approval.

## Implementation Architecture

### Registry Loading

`assets/js/apocrypha.js` fetches `../data/apocrypha-source-registry.json` with `cache: "no-cache"` when the page is served over HTTP. Direct `file://` access leaves the committed fallback visible and reports that registry enhancement needs an HTTP-served page.

### Runtime Validation

The runtime validates registry shape, `schemaVersion: 2`, required source fields, approved group/subgroup/source-type/evidence-role/verification enums, supplemental no-claims rules, and official-shelf authority rules. Unknown values stop registry rendering and preserve the fallback.

Reader-facing failures use Gate 4 error copy. Developer-facing detail is logged to the console.

### Shelf Grouping

| Registry group | Rendered shelf |
|---|---|
| `design` | Official Design |
| `lore` | Worldbuilding & Lore |
| `official-archives` | Official Archives |
| `supplemental` | Supplemental References |
| `rules-card-records` | Suppressed |

No title-specific or URL-specific source classification is used.

### Ordering

Previously preserved records retain registry order. Gate 4.5 additions are ordered by publication date inside their subgroup, then title. Subgroups use the Gate 3 deterministic subgroup order.

### Fallback Strategy

`scripts/validate-apocrypha-rendering.mjs --write-fallback` produces the fallback source shelves in `apocrypha/index.html` from the registry and the same rendering contract constants. The validator proves every authorized record appears exactly once and the suppressed Rules record appears zero times.

### Error Handling

Runtime failure behavior preserves the static fallback and sets the approved status:

`Source registry unavailable. Apocrypha cannot show source cards safely right now. Static source shelves remain available below.`

Unsupported schema, unknown classification, missing fields, unknown verification state, supplemental conflicts, and official conflicts all fail closed before replacing fallback content.

## Rendered Population

| Measure | Count |
|---|---:|
| Total registry records | 60 |
| Authorized records | 59 |
| Fallback records | 59 |
| Runtime-rendered expected records | 59 |
| Official Design | 45 |
| Worldbuilding & Lore | 4 |
| Official Archives | 1 |
| Supplemental References | 9 |
| Rules & Card Records suppressed | 1 |
| Verified rendered records | 39 |
| Pending-verification rendered records | 20 |
| Duplicate rendered IDs | 0 |
| Duplicate rendered canonical URLs | 0 |
| Missing authorized records | 0 |

## Copy Implementation

Implemented from `docs/research/apocrypha-gate04-voice-copy-contract.md`:

- Page identity: `The Apocrypha`, `Source Library`, `Where Vox Mana shows its work.`
- Introduction, support explanation, trust explanation, and supplemental boundary.
- Shelf headings and descriptions for Official Design, Worldbuilding & Lore, Official Archives, and Supplemental References.
- Badge labels: Official, Supplemental, Design, Lore, Archive, Navigation Only, Pending Link Check, Checked Link.
- Evidence-role language: Official support, Official support/link pending, Navigation only.
- Verification language: `Checked {date}.` and `Pending link check.`
- Source-card labels: `Evidence role`, `Used for`, `Does not support`, `Open source`.
- No-JavaScript fallback and registry-error copy.

The browser `<title>` remains `Vox Mana - The Apocrypha` to preserve the existing route metadata convention and keep `test:route-metadata` green without editing metadata tooling outside Gate 5 scope. The approved page identity is present in the visible H1 and hero copy.

Removed or replaced current-copy blocks include the old broad websites/videos/archive intro, "public links first" framing, "reviewed support" framing, Official Wizards / Mark Rosewater shelf, Official Lore/Story Archives/Community/Video shelf labels, blanket "Verified Wizards links" claim, near-official framing, and old hardcoded source counts.

## Accessibility Structure

Static validation confirms heading hierarchy, grouped shelf semantics, list semantics for source cards, safe external source links, descriptive source-link `aria-label` values, a polite source status region, explicit image `alt` attributes, no required explanation in CSS pseudo-content, and visible source-link focus styling.

Browser keyboard, focus-order, screen-reader, and accessibility-tree checks remain deferred.

## Responsive-Risk Static Checks

The rendering validator checks that source-card grid minimum is `260px`, source cards use `overflow-wrap: anywhere`, source cards do not hide overflow, source cards do not use a fixed pixel width, source links retain `:focus-visible` styles, and badge distinctions include visible text.

These checks do not replace real browser responsive validation.

## Command-Line HTTP Validation

A temporary local Node static server was used for command-line fetch checks only:

- `/apocrypha/` returned HTTP 200.
- `/data/apocrypha-source-registry.json` returned HTTP 200 and parsed as JSON with `schemaVersion: 2` and 60 records.
- `/assets/js/apocrypha.js?v=20260725g5` returned HTTP 200.
- `/assets/css/apocrypha.css?v=20260725g5` returned HTTP 200.
- Expected HTML markers were present: `data-apoc-source-root`, `data-source-total="59"`, `Supplemental References`, and `Pending Link Check`.

This does not count as browser validation.

## Rules Shelf Suppression

The official Rules landing-page record remains in the registry. Gate 5 does not render Rules & Card Records because Gatherer or another approved official card-record source is still unresolved. No completeness claim is made.

## Validation Results

| Command | Result |
|---|---|
| `node --check assets/js/apocrypha.js` | PASS |
| `node --check scripts/validate-apocrypha-rendering.mjs` | PASS |
| `node --check scripts/validate-apocrypha-sources.mjs` | PASS |
| `node scripts/validate-apocrypha-sources.mjs` | PASS: 60 records, 51 official, 9 supplemental, 20 not checked, 9 move/remove candidates |
| `node scripts/validate-apocrypha-rendering.mjs` | PASS: 59 authorized records, 45 design, 4 lore, 1 archive, 9 supplemental, 39 verified, 20 pending, 1 suppressed |
| `npm.cmd run test:route-metadata` | PASS: 8 public route heads |
| `git diff --check` | PASS, with Git LF-to-CRLF working-copy warnings only |
| Command-line HTTP smoke | PASS |

## Deferred QA

- Real-browser visual and responsive validation.
- JavaScript-enabled registry render validation in a browser.
- JavaScript-disabled fallback validation in a browser.
- Browser-level registry fetch-failure simulation.
- Browser-level unsupported-schema simulation.
- Keyboard and focus-order review.
- Screen-reader or accessibility-tree review.
- Visual regression approval.
- Link QA and MTG source review.
- Publish-readiness review.
- Gatherer or approved card-record source intake.

## Confirmations

- `data/apocrypha-source-registry.json` was not changed.
- `scripts/validate-apocrypha-sources.mjs` was not changed.
- Gate 3, Gate 4, and Gate 4.5 research documents were not changed.
- Rules & Card Records was not rendered.
- No Strategium, Archscry, CRIT semantic, generated, package, Kanban, unrelated-route, unauthorized global, or original-main files changed.
