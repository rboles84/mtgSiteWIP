# Gate A Implementation Status And Compatibility Record

Status: final two-blocker owner correction complete locally; candidate pending owner review.

Final owner spot-check follow-up: the optional commander-preview grid no longer exposes a redundant `Commander starting points` label or an empty decorated block. The block begins hidden, becomes visible only when card validation marks at least one commander preview as verified, and is removed when none resolve. In tied snapshots, the co-leader Mana Font span is scoped to `width: max-content`, left alignment, and a `0.12rem` gap; symbol generation, order, size, glow, and accessible labeling are unchanged.

The owner protected candidate `6fa0d0c2a2441de114d86b9fd9daf29dd211eaa4` except for mobile dossier-tab activation after scrolling/dragging and the card-preview boundary/caption; the co-leader pip gap was accepted as bounded local polish. This final correction delays pointer capture until an actual mouse drag, clears synthetic-click suppression with that pointer sequence, and leaves ordinary tab clicks to the single delegated action. It also limits previews to the image or immediate image link, removes the visible caption, and closes the overlay on image leave, scroll, or panel change. Scoring, questions, identity semantics, result states, recommendation data, Matrix values/resolvers, schemas, serialized result fields, cache contracts, precon routing, deck links, and Maze behavior remain unchanged.

## Additive public-state fields

Normalization preserves the complete placement result and additively carries:

- `result_state`;
- `public_confidence_state`;
- `alternative_state`;
- `confidence_display_mode`;
- `model_kind`;
- `legacy_result`;
- `limitations`;
- `compatibility_version`.

Missing fields normalize safely. Existing serialized names and shapes remain available. Numeric `confidence`, `confidence_gap`, match scores/shares, ranking data, trails, versions, `decree`, `color_weights`, and `mana_scores` are not deleted, renamed, zeroed, or used as public correctness claims. Missing legacy confidence becomes `null`; a supplied historical value remains stored internally and hidden publicly.

## Implemented public state layer

The presentation layer supports `primary`, `tied`, `close`, `mixed`, `contradictory`, `insufficient`, `unknown`, `invalid`, and `incomplete`.

- `mixed`, `contradictory`, and `insufficient` are rendered only when explicitly supplied; Gate A does not infer them from suppression, weak score, or minimum-hit proxies.
- `tied` requires exact raw top-two score equality and preserves the stored primary.
- `close` requires known top two, direct positive rank-two evidence, a completed Crucible stage, and final `confidence_gap` at or below the existing authored `crucible_probability_gap`. It changes presentation only.
- Rank three is never public. Noneligible rank two is omitted.
- Invalid, incomplete, and explicit insufficient results do not open an identity dossier or create identity recommendations.
- Legacy results receive the approved persistent limitation notice and optional retake path.

## Changed production responsibilities

| Path | Gate A change |
|---|---|
| `archscry/index.html` | Replaces public nearby/adjacency promise with answer-signal/current-fit language. |
| `assets/css/archscry.css` | Adds bounded state, limitation, shell, and responsive presentation styles. |
| `assets/js/shared.js` | Preserves additive fields, stops fabricating missing confidence, and keeps full legacy/persistence shapes. |
| `assets/js/archscry-presentation.js` | Adds the pure public-state and close-eligibility layer plus bounded explanation copy. |
| `assets/js/index.js` | Renders state-aware reveal/dossier shells, hides public numeric confidence and rank three, and guards alternative navigation. |
| `assets/js/dossier-radar.js` | Uses accessible Mana Font identity symbols and image-capable card-voice markup; Matrix data, axes, values, and chart datasets remain unchanged. |
| `assets/js/scryfall-card-cache.js` | Provides local-first, reload-persistent, bounded named-card metadata caching with success/negative TTLs and temporary 429 backoff; it does not alter card selection or recommendation data. |
| `assets/js/commander-dossier.js` | Grounds signal explanations in selected answers and limits public alternatives without changing datasets. |
| `assets/js/vm-radar.js` | Changes only the Matrix explanatory note; numeric resolver behavior is unchanged. |

## Protected implementation proof

No change is expected or present in:

- `assets/js/adaptive-placement.js`, including scores, softmax, inhibition, branching, stopping, ranking, `buildManaScores()`, and result serialization;
- `data/placement-model.json`, question/model records, or canonical/generated identity data;
- `data/identity-layers.json:expressions.*.preview_scores`;
- the `assets/js/vm-radar.js` profile/component resolver and every authored Matrix value; `dossier-radar.js` changes presentation markup only;
- `assets/js/graph.js`;
- recommendation datasets or selection rules;
- deck-link logic;
- Maze implementation;
- schemas, migrations, routes, placement-result/session/profile/OAuth storage contracts, or serialized placement shapes. The only cache change is the separate named-card metadata cache used to avoid repeated Scryfall requests after reload.

The authored Matrix remains the authored identity shape across Order, Knowledge, Ambition, Freedom, and Growth. Placement-derived `buildManaScores()` / `placementResult.mana_scores` remains a separate unchanged path. Neither is confidence.

## Validation status

The 48 design regression rows are reconciled in `docs/qa/2026-08-01-vm551-gate-a-owner-qa.md`. Placement, bias, compression, parser, source/generated, JS/HTML lint, copy, frontend, route, deck-link, Maze, focused navigation, and focused desktop/mobile browser checks pass. The broad runner reaches the known absent ignored Scryfall raw fixture after its applicable Gate A checks pass. The full browser suite retains its known environment-sensitive Home canvas limitation; the focused Archscry/Maze journey passes.

The final focused browser check covers desktop, narrow desktop, 390px, and 320px. It proves the original `.guild-banner` remains first in tied mode, comparison/return restores the original reading, every mobile tab reveals only its corresponding panel through a single history update, View All still reveals every panel, and the first intentional click after pointer dragging, wheel scrolling, or chevron scrolling works while keyboard selection remains functional. Desktop checks prove that hovering the card name or flavor copy does not open the image overlay, hovering the image does, the overlay has no caption node, and scroll or panel change closes it. Matrix rhythm, Scryfall destinations/cache behavior, Maze handoff/return, overflow, and console checks remain green.

No visual baseline was created or accepted. One owner visual review of the exact final commit remains the only next gate.
