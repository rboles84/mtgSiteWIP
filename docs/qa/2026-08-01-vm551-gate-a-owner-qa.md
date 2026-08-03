# VM-551 Gate A Owner QA Record

Candidate status: owner-accepted behavior through `c065fb765cd71738099a3fb3fb933a15cc5c1d44`; final presentation-only candidate awaits owner visual acceptance before merge or push.

Authority: design `c6b1c9e6940b67201c8c2f999409a7103ba52b88`; decisions `OD-01` through `OD-18` accepted without deviation. Expected behavior is controlled by `docs/plans/vm551-gate-a-trust-containment/gate-a-regression-matrix.csv`.

## Final visual-polish spot checks

The exact final commit should receive only these visual checks:

1. Exact tie at desktop and 390px: the compact `Tied result` status precedes the normal `Original reading` hero; the concise `Other co-leader` card follows the original introduction; compare and `Back to original reading` retain the correct identity content.
2. Dossier Directory at 390px and 320px: swipe, trackpad/wheel, pointer drag, chevrons, and keyboard arrows can reach every fully labeled tab; the active tab is revealed and the first/last tabs are not clipped.
3. `How This Plays`: `At the table` and `In play` each form a compact heading/label/value stack.
4. `Layered Identity`: Belief-card mana symbols remain in normal flow roughly one text rhythm below the final paragraph for mono-, two-, three-, five-color, and Colorless identities.
5. Matrix identity summary: established Mana Font symbols appear in canonical W/U/B/R/G order with a complete accessible label and subtle color-matched glow; the chart itself is unchanged.
6. `Cards That Sound Like This`: each configured card shows readable card art or the deliberate unavailable state, its flavor text, and a visible Scryfall action. Reload a resolved card and confirm no repeated named-card request.

Automated coverage performs the same hierarchy, accessibility, cache, edge-indicator, comparison/return, and overflow assertions at desktop, 390px, and 320px. It does not replace the final owner visual judgment. No visual baseline was created or accepted.

## Owner-rejection remediation dispositions

These dispositions apply to every owner comment governing this pass. `FIXED` means source correction plus focused evidence; it does not substitute for the owner spot checks listed below.

| Owner comment | Disposition | Evidence |
|---|---|---|
| Explicit current `unknown` became legacy/current Azorius | FIXED | `isLegacyGateAResult()` separates origin from state; current `unknown` now renders the bounded shell without a named identity, dossier, Matrix, or recommendations. Focused current/legacy/valid-primary cases pass. |
| Incomplete Continue opened an empty Gate shell | FIXED | Continue exists only when `isResumableGateAQuestion()` validates a real model, adaptive state, prompt, and nonempty answers; otherwise only Restart appears. |
| Tie content leaked the stored primary into the other co-leader | FIXED | The shared tied-reading summary contains no identity plan. Original and other-co-leader content use separate identity-keyed containers; plan, play-pattern, and dossier surfaces are rebuilt for the active identity. Tied mode has no close/adjacent tab. Focused DOM assertions verify container, snapshot, and dossier identity keys. |
| Legacy dossier said “Current best fit” or described unavailable strength | FIXED | Legacy eyebrow/status use historical framing; stored numeric confidence remains internal and hidden. |
| Repeated current-result and sibling-card copy | FIXED | Dossier eyebrow is now a single context label; signal cards use one section limitation; lane bodies are category-specific; card examples have card-specific explanations. Normalized sibling-copy regressions pass. |
| Duplicate Gate 1 “Return to landing” | FIXED | One `#quick-back-btn` remains; its first-question label is set once by the renderer. |
| “The arbiter” / “At the table” overlap and cramped layouts | FIXED | Removed the negative-margin overlap hack; snapshots and card grids reflow with bounded minimums. Desktop and 390px inspection show zero sibling overlap and no document overflow. |
| Signal introduction did not use available width | FIXED | `.signals-intro` now uses the containing card width. |
| Guild Card Signal Reference, card, and land images were undersized | FIXED | Responsive grid minima and card widths increased; mobile uses deliberate one-column reflow and bounded card widths. |
| Raw/repeated placeholder labels were visible | FIXED | Empty accessible image slots precede loading; failures render one deliberate “Image unavailable” fallback and one intentional visible card/land name. |
| Plain White/Blue labels instead of established symbols | FIXED | The committed Mana Font asset is loaded and `ms-* ms-cost` symbols render with an accessible “{colors} mana identity” label. No new icon system was added. |
| Cards That Sound Like This lacked recognizable card images | FIXED | The Matrix card-voice surface now uses committed local card records first, the existing `vm_scryfall_named_cache_v2` second, and network lookup last. Each configured card shows readable art or an explicit fallback, flavor text, and a visible Scryfall action; double-faced local records use the front face by default. |
| Precon/product names were sent to Scryfall named-card lookup | FIXED | Art candidates are typed first. Every committed precon maps to its known main commander card or a deliberate product fallback; the full catalog and every faction `(Precon)` value are regression-tested. Request dedupe, 90 ms pacing, and non-OK/network fallback remain active. |
| Specialist terms lacked education | FIXED | Established keyboard-focusable `.vm-gloss` help covers Draw-Go Control, Prison Control, Midrange, Control, Tempo, Stax, Pillowfort, Hatebears, taxation, sweepers, detain, parity, and open mana with meaning, Commander behavior, reason, and boundary. |
| Start Here deck footing/spellcraft/caution was unclear | FIXED | Budget, experience, directions, and provenance are separate; Azorius tools are translated into table actions; caution names the pivotal interaction window. |
| Azorius/Commander claims were universal, exaggerated, or inaccurate | FIXED | Claims are bounded as possible expressions. Card facts trace to `data/scryfall/indexes/commander-index.json`; identity scope traces to `data/raw-factions/azorius_senate/azorius_senate.profile.json` and `data/placement-model.json`. Lore is not treated as deck or opponent proof. |
| Direct precon research action missing | FIXED | Seven locally supported display names use an explicit allowlist of validated EDHREC precon routes, including `https://edhrec.com/precon/first-flight`; no display-name slug generation occurs. |
| “Atlas is still opening” implied incomplete coverage | FIXED | Replaced with stable complete-atlas language that bounds the current reading’s evidence coverage. |
| Edge tracking prevention and browser lazy-image notices | ENVIRONMENT-ONLY | No candidate source defect was found for these browser messages. |
| Repeated Scryfall requests after reload caused 429/CORS fallback | FIXED | Named-card lookup now uses committed local records first, versioned `localStorage` second, and the network last. Success, negative, and 429 backoff records survive reloads; malformed records are not cached. |
| QA helper disappeared after reload | DOCUMENTED QA LIFECYCLE | The helper is intentionally local-only on `window`; reload clears it. The checked-in loader validates `vm_last_result`, preserves `vm_gate_a_qa_base`, rejects misspellings, and reports readable errors. Reinstall after each reload. This is not an Archscry state defect. |

### Azorius evidence and editorial boundaries

- `Isperia, Supreme Judge`: committed `oracle_excerpt` says a creature attacking the player or their planeswalker may cause a draw; the attacker need not have flying. The UI states this conditional effect and does not promise an attack.
- `Lavinia, Azorius Renegade`: committed excerpt supports the land-count restriction and no-mana counter. The UI calls it one proactive rule-setting example, not a universal Stax package.
- `Grand Arbiter Augustin IV`: committed excerpt supports White/Blue spell reduction and an extra generic cost for opponents. The UI calls it a taxation example, not a player diagnosis.
- Counterspells, sweepers, detain, taxes, Draw-Go, Prison, Control, Tempo, and Hatebears remain editorial Commander exploration vocabulary. They are possible legal/mechanical directions, not placement evidence unless a recorded answer supplied the corresponding authored signal.

Automated result legend: `PASS` means the listed contract is covered by the existing placement suite, the added Gate A state/compatibility assertions, a focused static check, or the focused Archscry browser journey. Manual result `OWNER` means the exact visual/state surface still requires owner review. Remote signed-in persistence remains unexecuted locally and is called out explicitly.

| Test ID | Route / state | Expected result | Automated result | Manual result | Owner decision | Notes |
|---|---|---|---|---|---|---|
| QF-001 | Quick / 7-question completion | Finalize once; numeric model behavior unchanged | PASS | Not needed | Accepted | Placement suite |
| QF-002 | Quick / 8-question completion | Finalize once at eighth answer | PASS | Not needed | Accepted | Placement suite |
| QF-003 | Quick / Back | Replay without stale later evidence | PASS | OWNER | Pending visual | Keyboard/focus hierarchy |
| QF-004 | Quick / changed prior answer | Only replayed selection affects result | PASS | Not needed | Accepted | Placement suite |
| QF-005 | Quick / incomplete | Continue only with a real resumable question; otherwise restart; no dossier or recommendations | PASS | OWNER | Pending visual | Both resumable and non-resumable contracts asserted; owner shell spot check remains |
| QF-006 | Result / invalid payload | Safe restart; no placement output | PASS | Not needed | Accepted | Pure resolver |
| QF-007 | Direct valid result | Restore original identity with bounded state | PASS | Not needed | Accepted | Focused browser journey |
| QF-008 | Result / refresh | Preserve result and public state | PASS | Not needed | Accepted | Cache/browser journey |
| RS-001 | Result / primary | Current best fit; no numeric confidence | PASS | PASS | Accepted | Desktop/mobile inspected |
| RS-002 | Result / exact tie | Two co-leaders; stored primary unchanged | PASS | OWNER | Pending visual | Pure state and field invariance pass |
| RS-003 | Result / close | One eligible rank-two alternative; rank three hidden | PASS | OWNER | Pending visual | Approved heuristic asserted |
| RS-004 | Result / mixed | Generic multi-path shell; no identity recommendation | PASS | OWNER | Pending visual | Explicit state only |
| RS-005 | Result / contradictory | Conflicting-signals shell; no inferred primary | PASS | OWNER | Pending visual | Explicit state only |
| RS-006 | Result / insufficient | No named identity, dossier, or recommendation | PASS | OWNER | Pending visual | Explicit state only |
| RS-007 | Current / unknown | Evidence unavailable; no identity, legacy framing, or fabricated certainty | PASS | OWNER | Pending visual | Current unknown, legacy, and valid primary with optional detail absent are distinct |
| RS-008 | Result / invalid | No dossier, Matrix, or recommendation | PASS | OWNER | Pending visual | Pure resolver |
| RS-009 | Result / incomplete | Continue/restart only | PASS | OWNER | Pending visual | Pure resolver |
| RS-010 | Saved / legacy | Persistent legacy notice; limited dossier | PASS | OWNER | Pending visual | Signed-out local normalization only |
| PR-001 | All Archscry result surfaces | No public numeric confidence | PASS | PASS | Accepted | Focused browser DOM check |
| PR-002 | All Archscry copy | No Bayesian language | PASS | PASS | Accepted | Static/copy checks |
| PR-003 | Result/dossier | No softmax-derived strength band | PASS | PASS | Accepted | Signal-strength card removed |
| PR-004 | Alternative surfaces | No numerical runner-up called adjacent | PASS | OWNER | Pending close visual | Rank-two guard and source checks |
| PR-005 | Shape / Why / Signals | Bounded answer-to-signal explanation | PASS | OWNER | Pending copy review | Representative primary inspected |
| PR-006 | Signals From Your Answers | Answer, observation, contribution, limitation | PASS | PASS | Accepted | Placement assertion plus browser inspection |
| PR-007 | Recommendations | Exploration framing, not placement proof | PASS | OWNER | Pending copy review | Dataset/selection unchanged |
| CP-001 | Session cache | Complete result and additive fields round-trip | PASS | Not needed | Accepted | Focused browser journey |
| CP-002 | Profile persistence | Existing field names/shapes preserved | PASS | Not run | No live account action | Static writer/normalizer proof; owner may spot-check signed in |
| CP-003 | Google OAuth return | Pending full result survives save/return | PASS | Not run | No OAuth action | Existing functions unchanged except additive normalization |
| CP-004 | Saved reading | Stored primary/numerics remain intact | PASS | OWNER | Pending signed-in spot check | No schema change |
| CP-005 | Legacy with confidence | Stored numeric retained internally, hidden publicly | PASS | OWNER | Pending legacy fixture visual | Supplied-value normalization checked |
| CP-006 | Legacy without confidence | `null`/unknown; no fallback number | PASS | OWNER | Pending legacy fixture visual | Browser normalization check |
| CP-007 | Primary dossier | Normal dossier, bounded state, Matrix present | PASS | PASS | Accepted | Desktop/mobile inspected |
| CP-008 | Close comparison | Original result retained while comparing | PASS | OWNER | Pending close visual | Navigation guard implemented |
| CP-009 | Return to original | Original primary and answers restored | PASS | OWNER | Pending close visual | Exact button copy implemented |
| CP-010 | Decree | Stored `decree` and `decreeCopy` preserved | PASS | Not needed | Accepted | Terminal reveal uses separate bounded copy |
| CP-011 | `color_weights` | Preserve when supplied; never fabricate meaning | PASS | Not needed | Accepted | Pure/browser normalization check |
| CP-012 | Authored Matrix | Authored axes/values/rendering unchanged | PASS | PASS | Accepted | Desktop/mobile rendered; note distinguishes confidence |
| CP-013 | Placement mana alignment | `buildManaScores()` and `mana_scores` path unchanged | PASS | Not needed | Accepted | Scoring file unchanged; placement suite |
| CP-014 | Deck links | Existing URL/context behavior unchanged | PASS | Not needed | Accepted | Deck-link suite |
| CP-015 | Recommendations | Existing candidates/selection remain usable | PASS | OWNER | Pending copy review | Focused browser journey |
| CP-016 | Maze handoff | Reading ID/context preserved | PASS | PASS | Accepted | Focused browser journey |
| CP-017 | Maze return | Return-to-dossier and finds state preserved | PASS | PASS | Accepted | Focused browser journey |
| CP-018 | Desktop layout | No overlap/overflow; primary actions visible | PASS | PASS | Accepted for primary | Rechecked after remediation; other state shells require owner review |
| CP-019 | Mobile layout | No horizontal overflow; cards reflow and actions stack | PASS | PASS | Accepted for primary | Rechecked at 390px with zero sibling-card overlaps; other shells require owner review |
| CP-020 | Keyboard | Dossier tabs operate by keyboard | PASS | PASS | Accepted | ArrowRight moved Placement to Start Here |
| CP-021 | Console | No candidate-caused console errors | PASS | PASS | Accepted | Focused desktop/mobile journey |
| CP-022 | Matrix distinction | Authored Matrix is not placement confidence | PASS | PASS | Accepted | Exact approved note rendered |
| CP-023 | Missing confidence | No public numeric fallback | PASS | PASS | Accepted | Missing legacy value normalized to `null` |

## Owner visual route

Serve the candidate root locally, then open `/archscry/index.html`.

Review at desktop and 390px mobile:

1. landing and one live question/progress view;
2. normal primary result and dossier;
3. exact tie and eligible close fixtures, including comparison and return;
4. explicit `mixed`, `contradictory`, and `insufficient` shells;
5. `unknown`, `invalid`, and `incomplete` shells;
6. legacy result with and without stored confidence;
7. authored Matrix note and placement-derived mana-alignment preservation;
8. recommendations, deck links, Maze handoff, and return-to-dossier.

Do not accept or regenerate visual baselines. Owner acceptance is visual/copy approval of this exact local candidate only.

## Remediation validation

- `node scripts/vm551-gate-a-owner-qa-tests.mjs`: PASS, including unknown/legacy/primary distinction, resumability, WU/ABZAN and explicit Izzet/Jeskai tie isolation, normalized copy uniqueness, full precon-catalog routing, educational terms, mana symbols, responsive rules, and bounded Azorius claims.
- `npm.cmd run test:placement`: PASS, 37 factions / 37 golden paths.
- `npm.cmd run test:bias`, `test:gate-compression`, `test:gate-live-bias`: PASS; no model edits were made.
- `npm.cmd run test:parser`: PASS, 226 cases.
- `npm.cmd run test:source-generated`: PASS with the two existing JESKAI/MARDU model-owned warnings.
- `npm.cmd run lint:js`, `lint:html`, `test:copy-boundaries`, `test:frontend-smoke`, `test:route-metadata`, `test:deck-links`, `test:maze-scratchpad`, `test:browser-smoke`: PASS.
- In-app desktop and 390px: mana symbols rendered; no document overflow; no visible sibling overlap in dossier snapshot, flavor, How This Plays, or starter grids. No visual baseline was created or accepted.
- `node scripts/vm551-scryfall-cache-tests.mjs`: PASS without live Scryfall. It covers local-first resolution, concurrent in-flight deduplication, same-page reuse, simulated-reload reuse for Exotic Orchard and Myriad Landscape, 404 negative caching, reload-persistent 429 backoff, expiration, corrupt storage, malformed payloads, bounded eviction, product-name rejection, preserved image URI, and preserved Scryfall URI.
- Final tied-result browser check: PASS through a real seven-answer terminal path. Desktop, narrow desktop, 390px, and 320px assertions verified that the original `.guild-banner` is the first result component; no tied-status element precedes it; the co-leader card is inside `.dossier-snapshot` after the original plan/play-pattern cards; peer comparison and return remain identity-isolated; no close/adjacent label appears; and no overflow or console error occurs.

Owner accepted and protected the result-state, tie hierarchy/comparison/return, Matrix/precon, card-link/cache, desktop, and general 390px behavior through candidate `6fa0d0c2a2441de114d86b9fd9daf29dd211eaa4`. The final two-blocker correction changes only mobile tab pointer arbitration, card-preview targeting/caption behavior, and the compact co-leader pip gap. Signed-in profile/OAuth persistence remains outside this correction; its contracts and field shapes were not changed.

## Exact local state-shell setup

1. Serve the implementation worktree root (for example, `python -m http.server 8765`) and open `http://127.0.0.1:8765/archscry/index.html`.
2. Complete one normal Quick Reading. Confirm the result exists with `sessionStorage.getItem("vm_last_result")`. On the result screen, open the browser console and paste this local-only loader:

```js
fetch("/docs/qa/vm551-gate-a-fixture-helper.js")
  .then((response) => {
    if (!response.ok) throw new Error(`QA helper load failed: ${response.status}`);
    return response.text();
  })
  .then((source) => (0, eval)(source))
  .catch((error) => console.error("[VM-551 QA]", error.message));
```

3. Run one of `vmGateAQa("tie")`, `vmGateAQa("close")`, `vmGateAQa("mixed")`, `vmGateAQa("contradictory")`, `vmGateAQa("insufficient")`, `vmGateAQa("unknown")`, `vmGateAQa("invalid")`, `vmGateAQa("incomplete")`, `vmGateAQa("legacy-with-confidence")`, or `vmGateAQa("legacy-without-confidence")`. Misspelled fixture names are rejected without changing storage or reloading.
4. A reload clears `window.vmGateAQa` and `window.vmGateARestore`. Paste the loader again after every reload, then use `vmGateARestore()` to restore the saved base. A `vmGateARestore is not defined` message means the local QA helper was not reinstalled; it is not an Archscry result-state defect. The helper reports a readable error when `vm_last_result` or `vm_gate_a_qa_base` is missing or malformed.
5. These fixtures alter only local `sessionStorage`; they do not save, migrate, or change production data.

## Named-card cache QA

Archscry stores successful named-card results for seven days, 404/not-a-card results for six hours, and a 429 backoff for fifteen minutes under versioned local-storage key `vm_scryfall_named_cache_v2`. The cache is bounded to 200 records and evicts the oldest/least-recently-used entries. Committed local card records are checked before this cache, and the network is last.

Development-only cache clear command:

```js
localStorage.removeItem("vm_scryfall_named_cache_v2");
```

## Final two-blocker validation

- `node scripts/vm551-gate-a-owner-qa-tests.mjs`: PASS; asserts delayed drag-only pointer capture, bounded synthetic-click suppression, single delegated panel activation, all-color symbol generation, scoped co-leader spacing, image-only preview targeting, caption removal, and preview close hooks.
- `node scripts/vm551-scryfall-cache-tests.mjs`: PASS; the accepted local-first persistent cache, TTLs, backoff, eviction, DFC handling, and reload reuse are unchanged.
- `node scripts/browser-smoke.mjs --archscry-only`: PASS at 1440px, 820px, 390px, and 320px. All seven tabs, View All, drag-then-click, wheel-then-click, chevron-then-click, keyboard selection, preview boundary/caption/close behavior, overflow, console, Matrix, card links, and Maze handoff/return pass.
- `npm.cmd run test:placement`, `test:bias`, and `test:gate-live-bias`: PASS; 37 golden paths and unchanged placement reports.
- JS/HTML lint, copy boundaries, frontend/route smoke, deck-link, Maze-store, and 226 parser checks: PASS.
- In-app 390px pointer check: PASS for all seven tabs and the first intentional tab click after a pointer drag.

## Final owner spot-check

1. At 390px and 320px, tap Placement, Start Here, Why It Fits, Commanders, Card Signals, Mana Notes, Maze, and View All. Every tab must reveal its named panel, and View All must reveal all panels.
2. Mouse-drag the tab row, then immediately click a tab; click a chevron, then a tab; and use Left/Right keys. Each intended selection must happen once and remain visible.
3. On desktop, hover a card name and its flavor copy: no preview should open. Hover only the card image or immediate image link: the established image preview should open without a caption. Moving off the image, scrolling, or changing dossier panels must close it. The source image alt text and link accessible name remain present.
4. In a tied result, confirm the co-leader name and mana identity share one compact row, with no added gap between the individual pips; their size, glow, order, and accessible identity label remain unchanged.

Owner spot-check follow-up: `Commander starting points` was a redundant label for the optional commander-card preview grid and could remain stranded when no candidate resolved. It is removed; the entire optional block stays hidden until a verified preview exists and disappears when none resolve. The co-leader name and mana identity now share one aligned header row, with zero gap between individual pips. Static owner-QA assertions and the full 1440/820/390/320 Archscry browser smoke pass.

Do not create or accept a visual baseline.
