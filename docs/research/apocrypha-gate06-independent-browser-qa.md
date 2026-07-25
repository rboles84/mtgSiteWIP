# Apocrypha Gate 6 Independent Browser QA

## Review Authority

| Field | Value |
| --- | --- |
| Exact reviewed SHA | `36e8cc614714de5af5b292b5070580ef83d9c75d` |
| Parent SHA | `26ea8f41579e513d6dd52e3c106649be60942d7d` |
| Review branch | `codex/apocrypha-gate6-independent-browser-qa` |
| Review worktree | `C:\dev\voxmana.io-apocrypha-gate6-review` |
| Review date | 2026-07-25 |
| Human-tested local URL | `http://127.0.0.1:8081/apocrypha/index.html` |
| Browser | Chromium-family desktop browser, exact name/version not recorded. |
| Operating system | Windows desktop environment; exact OS version not recorded in supplied browser evidence. |
| Disposition | `APPROVE EXACT SHA 36e8cc614714de5af5b292b5070580ef83d9c75d` |

This report completes the independent Gate 6 review of the exact Gate 5 Apocrypha registry-driven rendering candidate. The approval is for the candidate implementation only. It does not authorize push, merge, publication, or skipping later publish-readiness checks.

## Evidence Boundaries

- Codex performed repository isolation, candidate SHA proof, implementation-worktree cleanliness checks, candidate-file inspection, contract review, and automated validation.
- Codex's internal browser could not access local URLs during the first Gate 6 attempt because the in-app browser blocked `127.0.0.1`, `localhost`, and `file://` paths under browser URL policy.
- The user performed the required real-browser checks in their normal desktop browser against `http://127.0.0.1:8081/apocrypha/index.html`.
- This report combines Codex automated/static evidence with supplied human browser observations.
- This is not a screen-reader certification.
- Accessibility-tree inspection was not independently completed through Codex browser tooling and was not separately supplied as completed evidence.
- Browser-intercept simulations for malformed registries were not recorded as completed browser evidence.

## Automated Results

All commands were rerun in the clean review worktree at exact candidate SHA `36e8cc614714de5af5b292b5070580ef83d9c75d`.

| Command | Result |
| --- | --- |
| `node --check assets/js/apocrypha.js` | PASS |
| `node --check scripts/validate-apocrypha-rendering.mjs` | PASS |
| `node --check scripts/validate-apocrypha-sources.mjs` | PASS |
| `node scripts/validate-apocrypha-sources.mjs` | PASS: `Apocrypha source registry validation PASS: 60 records, 51 official, 9 supplemental, 20 not checked, 9 move/remove candidates.` |
| `node scripts/validate-apocrypha-rendering.mjs` | PASS: `Apocrypha rendering validation PASS: 59 authorized records, 45 design, 4 lore, 1 archive, 9 supplemental, 39 verified, 20 pending, 1 suppressed.` |
| `npm.cmd run test:route-metadata` | PASS: `Route metadata check passed for 8 public route heads.` |
| `git diff --check` | PASS |

Automated validation is necessary evidence for the registry/rendering contract, but it is not browser evidence.

## Browser Results

The following browser observations were supplied by the human reviewer.

| Area | Result |
| --- | --- |
| Desktop view | PASS |
| Tablet view | Functionally PASS; one minor visual composition issue recorded as `APOC-G6-001`. |
| Tablet viewport evidence | 768 x 1024, zoom 100%. |
| Mobile view | PASS; exact mobile dimensions were not preserved in supplied evidence. |
| JavaScript enabled | PASS |
| JavaScript disabled | PASS |
| Shelf checks | PASS |
| Keyboard navigation | PASS |
| External-link checks | PASS |
| Visual overflow review | PASS |
| Console | PASS |
| Rules & Card Records shelf | PASS: shelf did not appear. |
| Material source-library rendering defects | None identified. |

The Supplemental References source-compass item uses `href="#apoc-library-supplemental-references"` with `aria-controls="apoc-library-supplemental-references"`. The tested URL became `http://127.0.0.1:8081/apocrypha/index.html#apoc-library-supplemental-references` only when the source-compass navigation link was used. Further testing confirmed the browser scrolled to the requested shelf, and collapsing or expanding the shelf did not change the URL or move the page. This is expected in-page anchor navigation and is not a defect.

The user explicitly accepted the browser behavior and authorized proceeding to the next phase. The technical disposition remains tied to the exact candidate SHA and the evidence documented here.

## Population Reconciliation

The automated rendering validator is authoritative for exact population counts. The human browser review did not manually count every card.

| Metric | Count |
| --- | ---: |
| Registry records | 60 |
| Authorized rendered/fallback records | 59 |
| Official Design | 45 |
| Worldbuilding & Lore | 4 |
| Official Archives | 1 |
| Supplemental References | 9 |
| Rules records suppressed | 1 |
| Verified rendered | 39 |
| Pending verification rendered | 20 |
| Duplicate IDs or canonical URLs | 0 |
| Missing authorized records | 0 |

## Copy And Trust Results

Supplied browser evidence and candidate inspection support Gate 4 contract compliance for the approval decision:

- Page identity and introduction present Apocrypha as the source library behind Vox Mana rather than a complete bibliography.
- Trust explanation distinguishes source families, publisher authority, evidence role, and verification state.
- Official status is not presented as link-health verification.
- Pending-verification records use honest pending-link language.
- Supplemental sources are navigation-only and are not presented as official claim support.
- Community sources are retained without being demeaned.
- Official Archives is separated from current official guidance.
- No completeness claim is made.
- Rules & Card Records is not promised as a rendered shelf.
- No material raw-enum exposure was identified by the validators or supplied browser review.

## MTG Source Spot-Check Results

The supplied human evidence reports shelf checks and external-link checks passed, with no material source-library rendering defect identified. Exact per-record browser spot-check notes were not preserved. Static candidate inspection and the rendering validator cover representative source placement and population against the registry.

Representative source families confirmed by registry/rendering inspection include:

| Shelf | Representative records inspected statically |
| --- | --- |
| Official Design | Original mono-color, revisited mono-color, two-color, shard, wedge, Mechanical Color Pie 2021, and Let's Talk Color Pie records are present in the registry-driven fallback/runtime contract. |
| Worldbuilding & Lore | Both Ravnica flavor guides, Ravnica plane page, and Alara plane page are present under the lore shelf contract. |
| Official Archives | Magic Story archive is present under Official Archives. |
| Supplemental References | Community/reference, archive or preserved-material, Reddit, and video sources are present only under Supplemental References with navigation-only treatment. |

## Accessibility Results

| Area | Result |
| --- | --- |
| Keyboard review | PASS per supplied human browser evidence. |
| Visible focus | No supplied failure; keyboard navigation passed. |
| Accessibility-tree inspection | Not recorded as completed. |
| Screen-reader review | Not performed. |
| JavaScript-disabled fallback usability | PASS per supplied human browser evidence. |
| Authority and verification distinctions | Present in visible copy and validated source-card treatment; not certified through screen reader. |

The untested accessibility areas do not block this Gate 6 approval because core real-browser rendering, responsive behavior, JavaScript-disabled fallback, keyboard use, console behavior, shelf suppression, and structural validators passed with no blocker, major, or material moderate defect. They remain publish-readiness risk notes.

## Failure-State Results

| Condition | Result |
| --- | --- |
| Static validator coverage for unsupported schema | PASS via `scripts/validate-apocrypha-rendering.mjs`. |
| Static validator coverage for unknown enum/failure contracts | PASS via `scripts/validate-apocrypha-rendering.mjs`. |
| Browser registry fetch-failure simulation | Not recorded as completed. |
| Browser unsupported-schema simulation | Not recorded as completed. |
| Browser malformed/unknown-enum simulation | Not recorded as completed. |

The browser-intercept simulations remain useful before publication, but they do not block Gate 6 approval because static validators cover the registry failure and enum contracts, and core human browser review passed.

## Regression Results

The supplied browser evidence did not record a separate unrelated-route smoke matrix. Candidate inspection and Gate 5 scope show only Apocrypha route assets plus a focused rendering validator changed in the implementation commit. `npm.cmd run test:route-metadata` passed for eight public route heads. Broader visual regression remains deferred to publish-readiness review.

## Untested Or Limited Areas

- Exact browser name/version was not captured.
- Codex could not directly access the real browser due in-app browser URL policy.
- Accessibility-tree inspection was not recorded as completed.
- Screen-reader review was not performed.
- Browser-intercept simulations for malformed registries were not recorded.
- Exact mobile viewport dimensions were not preserved in supplied evidence.
- Broad visual-regression screenshot baselines were not approved.
- Per-record manual spot-check notes for every required sample were not preserved.

These do not block this Gate 6 approval because the validators passed, the source population reconciled exactly, the real browser review covered core rendering, responsive behavior, JavaScript-enabled behavior, JavaScript-disabled fallback, keyboard use, console behavior, shelf checks, external links, overflow, and Rules shelf suppression, and no blocker, major, or material moderate defect was found. They remain required risk inputs for a later publish-readiness gate.

## Findings

### APOC-G6-001 - Tablet Library Rail Composition

| Field | Value |
| --- | --- |
| Severity | Minor |
| Viewport | 768 x 1024 |
| Scope | Tablet-only Library Rail composition |
| Reproduction | Serve the exact candidate, open Apocrypha, set responsive viewport to 768 x 1024, and scroll to the Library Rail. |
| Expected behavior | Balanced, deliberate navigation composition. |
| Actual behavior | Rail remains functional and readable, but its tablet arrangement looks visually awkward compared with desktop and mobile. |
| Evidence | Supplied browser screenshot and reviewer observation. |
| Likely affected file | `assets/css/apocrypha.css` |
| Approval blocking | No |
| Recommendation | Consider a two-by-two or vertically stacked tablet layout in a later polish pass. |

No finding is recorded for the Supplemental References hash navigation. It is expected in-page anchor behavior.

## Finding Counts

| Severity | Count |
| --- | ---: |
| Blocker | 0 |
| Major | 0 |
| Moderate | 0 |
| Minor | 1 |

## Disposition

APPROVE EXACT SHA 36e8cc614714de5af5b292b5070580ef83d9c75d
