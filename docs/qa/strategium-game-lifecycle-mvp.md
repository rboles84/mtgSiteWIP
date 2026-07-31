# Strategium Game-Lifecycle Completion MVP QA

## Scope and review boundary

This QA record covers the three new shared lifecycle flows and their integration into `/strategium/`:

- `/strategium/find-a-table/` — a pre-table compatibility conversation.
- `/strategium/before-game/` — a short, natural pregame disclosure.
- `/strategium/during-game/` — a 30–60 second mid-game reset prompt.

The existing `/strategium/review/` After-the-Game flow and `/strategium/console/` Commander Console were regression-checked and were not redesigned. The hub keeps exactly two top-level choices: Help Me Understand and Commander Console. No Guided Moments surface was restored. VM-551, Archscry, Maze, and Apocrypha are outside this MVP.

This is implementation QA evidence, not owner acceptance or certification.

## Decision tables

### Finding a Table

| Stage | Player input | Meaningful combinations | Result category and output |
| --- | --- | --- | --- |
| Experience | Memorable, social, experimental, technical, or mixed | The player’s desired game texture can be compared with the table’s later description. | Contributes to a provisional compatibility read and the “why this read may apply” card. |
| Pace | Develop, pressure, interaction, or execution | Pace clarifies whether the table’s opening rhythm is likely to feel comfortable. | Contributes to the fit explanation and question to ask. |
| Uncertainty | Predictable, some swings, or high variance | Separates tolerance for surprise from a permanent player label. | Contributes to the mismatch-to-watch card. |
| Disruption | Light, comfortable, optimized, or ask first | Identifies whether interaction intensity needs a table conversation. | Contributes to the fit/mismatch language. |
| Table signal | Clear deck description, approximate level only, relaxed, unclear, or optimized | The table signal is deliberately low-confidence; no single phrase decides the read. | `reasonable-fit`, `one-more-answer`, or `different-game`; always five cards: provisional compatibility, why, one question, possible mismatch, and permission to choose another table. |

Excluded: matchmaking, rating, percentages, player archetype labels, bracket definitions, card lists, tactical advice, or a claim that the table is objectively compatible.

### Before the Game

| Stage | Player input | Meaningful combinations | Result category and output |
| --- | --- | --- | --- |
| Optional context | Player-supplied approximate 1–5, unsure, or not using brackets | Approximate context is combined with behavior-level deck language; unsure/not-using keeps the deck description primary. | Contributes to `clear-disclosure` or `ask-one-more`. No bracket rules are inferred. |
| Deck plan | Develop, pressure, value, combo/unusual line, interaction, or still figuring it out | Deck plan and finish are stated separately so a label cannot stand in for the deck story. | “What the table may expect” and the generated spoken statement. |
| Finish | Combat, value, combo, alternate/unusual, or unsure | A finish may be sudden, incremental, or not settled yet. | Disclosure card, one question to ask the pod, and mismatch card. |
| Timing | Early, middle, late, or variable | Timing is described as an expectation, not a promise. | Statement and expectation card. |
| Progressive disclosure | Any meaningful subset of fast mana, tutors, combo, resource denial, extra turns, long turns, chaos, or proxies; or none | Multi-select stays on the same stage until Continue. Meaningful surprises are surfaced without requiring an exhaustive deck audit. | `name-the-surprise` when selected surprises need naming; otherwise category remains `clear-disclosure` or `ask-one-more`. |
| Table agreements | Time, house-rule request, proxy comfort, none, or ask the pod | Agreements are separate from deck power and remain consent-oriented. | Final statement clause and “one question to ask the pod” card. |

Output is always five cards, including a short natural statement with Copy this sentence feedback. The statement is capped at two sentences and avoids duplicate punctuation. The bracket is only a player-supplied signal; this flow does not define brackets or prescribe counts, cards, or target power.

### During the Game

| Stage | Player input | Meaningful combinations | Result category and output |
| --- | --- | --- | --- |
| Notice the moment | Attention, player out of game, stalled game, mismatch, rules uncertainty, or fun mismatch | The observation is treated as a starting point, not a diagnosis. | Result category follows the selected moment and explains what may be happening. |
| Choose a reset | Continue, clarify, pause, accelerate ending, reset agreement, official-rule lookup, end, or new game | The smallest useful response is selected after the observation. | `attention`, `out`, `stalled`, `mismatch`, `rules`, or `fun`; four cards: what may be happening, what to clarify, neutral sentence, and available paths. |

The rules path routes the player to an official rules lookup, store/event judge, or mutually accepted knowledgeable resource and explicitly does not decide a ruling. The flow excludes board-state analysis, targets, tactical lines, scores, and player-intent claims.

## Classification trees

### Compatibility tree

```text
Desired game texture
└─ compare with pace, uncertainty, disruption, and table signal
   ├─ table signal is clear enough → reasonable-fit or one-more-answer
   ├─ one signal is missing or ambiguous → one-more-answer
   └─ table description conflicts with the requested game shape → different-game
      └─ in every branch: ask one question and preserve permission to choose another table
```

### Pregame disclosure tree

```text
Optional bracket context
├─ approximate / unsure / not using
└─ combine deck plan + finish + timing
   ├─ meaningful surprise selected → name-the-surprise
   ├─ unsure bracket or finish → ask-one-more
   └─ otherwise → clear-disclosure
      └─ append only the selected table-agreement clause
```

### Mid-game reset tree

```text
Notice the moment
├─ rules uncertainty → official rules lookup or judge/resource, then separate table agreement
├─ attention / out / stalled / mismatch / fun mismatch
└─ choose the smallest response
   ├─ continue or clarify
   ├─ pause, accelerate, or reset agreement
   └─ end or start a new game
      └─ every branch supplies a neutral sentence and leaves the decision with the table
```

## State transition matrix

| State or action | Expected URL/state | Expected focus/visibility |
| --- | --- | --- |
| Initial route load | No `path` query; first question rendered. | First question heading receives focus and is visible below the sticky top bar. |
| Single-choice selection | Canonical path gains one encoded segment; next question renders. | New question heading receives focus. |
| Multi-choice selection | Draft selection is held on the same path/stage; no premature navigation. | Selected options expose `aria-pressed=true`; Continue remains available. |
| Multi-choice Continue | Selected values are committed as one path segment; next question/result renders. | New question/result heading receives focus. |
| Back | Last committed segment is removed and the previous question returns. | Previous question heading receives focus. |
| Start over | `path` is removed and initial question returns. | Initial question heading receives focus. |
| Result | Complete canonical path remains reproducible; result cards render deterministically. | Result heading receives focus; result actions remain visible. |
| Return to Strategium | Child route returns to `/strategium/` without carrying lifecycle state. | Hub renders its two top-level choices and four lifecycle moment links. |
| Direct valid route | A complete or partial valid `?path=` reproduces the matching question/result. | Matching question/result heading is focused. |
| Refresh | Valid URL state survives refresh; no answer is invented. | Matching question/result remains visible and focused. |
| Invalid, partial, extra, or malformed state | Recovery normalizes to the nearest valid state and announces that no answer was added. | Recovery notice and returned heading are visible; no result is fabricated. |
| Native keyboard semantics | Options/actions are real buttons; route returns are real links; multi-select uses pressed state and Continue. | Focus rings remain available; automation verifies heading focus and DOM semantics. |

## Manual browser review

Review date: 2026-07-30. Surface: local static candidate worktree, in-app browser, representative desktop/mobile sizes. No visual baselines were refreshed or approved.

| Viewport | Review | Outcome |
| --- | --- | --- |
| 1440 × 900 | Hub, Finding a Table initial/result, Before the Game initial/result, During the Game initial/rules-safe result | Readable settled render; no horizontal overflow; result cards and action groups remain visible. |
| 390 × 844 | Hub and lifecycle route | Lifecycle links stack in the Help Me Understand card; no horizontal overflow; header and hero copy remain readable. |
| 320 × 568 | During the Game initial flow | No horizontal overflow. A focused heading initially sat beneath the sticky bar; the lifecycle focus target was corrected to use the existing 7rem scroll offset, then rechecked with the heading top at 112px versus a 78px header bottom. |

Observed interaction checks:

- Hub contains exactly two `.vm-card.vm-path-card` elements, exactly four lifecycle moment links, and no `Guided Moments` copy.
- Finding a Table reaches a five-card `reasonable-fit` result through a representative five-choice path and keeps the “choose another table” permission.
- Before the Game multi-select stays on its stage until Continue; the result contains five cards, the generated statement, and Copy this sentence feedback. Copy reports `Copied for the table.`
- During the Game exposes the thin two-step flow and the rules-safe result explicitly directs rules questions to an official lookup or judge/resource without deciding the ruling.
- After-the-Game and Commander Console still mount at their existing routes.
- Valid path URL state, back/reset behavior, focus, invalid recovery, all option branches, deterministic outputs, and mobile overflow are covered by `npm.cmd run test:strategium-lifecycle`.

## Combined human-QA workbook

The populated owner-execution workbook is `docs/qa/Strategium_Game_Lifecycle_Human_QA_Workbook.xlsx`.

- Exact remediated candidate SHA under test: `413bb16f27283e5d29c08607756d0647df2dd35f`.
- Sheets: README; Finding a Table; Before the Game; During the Game; State Transitions; Navigation and Regression; Human QA Log.
- Executable case counts: 14 Finding a Table, 29 Before the Game, 14 During the Game, 20 State Transitions, and 18 Navigation/Regression cases, plus 6 prior-evidence log rows.
- Coverage uses decision tables, classification trees, state transitions, equivalence partitions, applicable boundaries, pairwise reduction, and targeted generated-copy/multi-select risk cases. The README records why representative pairs and boundary cases replace low-value Cartesian repetition.
- Route cases begin as `Not Run`; the six prior-evidence rows preserve the candidate's already-recorded manual checks as `Pass` and are not a substitute for owner execution of the complete workbook.

## Automated checks

Passed on the candidate branch:

- `npm.cmd run test:strategium-lifecycle`
- `npm.cmd run test:strategium-review`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:copy-boundaries`
- `npm.cmd run test:route-metadata`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:parser`
- Full `npm.cmd test` passed after supplying a separate copied ignored Scryfall fixture; the candidate audit reports were restored byte-for-byte afterward.
- `npm.cmd run test:browser-smoke` passed for the existing Home, Archscry, Maze, Reading Finds, and dossier handoff surfaces.

The focused lifecycle suite covers all option branches for all three new routes, deterministic output checks, statement punctuation/length, rules safety, history/reset, preserved After-the-Game/Console mounts, and 1440/1024/768/390/320 overflow checks.

## Known limitations and exclusions

- This MVP uses authored decision rules, not live matchmaking, deck parsing, card lookup, bracket adjudication, or table telemetry.
- Bracket/level values remain generic player-supplied context. No official bracket definitions, counts, card lists, or power conclusions are presented.
- Finding a Table offers a provisional compatibility read, not a rating or recommendation of a player.
- During the Game intentionally does not analyze board state, targets, tactical lines, or rules outcomes.
- Copy fallback is best-effort browser behavior; the UI reports only local copy feedback and does not claim storage or transmission.
- Owner acceptance, independent review, integration, deployment, and certification remain future gates for the exact candidate SHA.

Related records: `docs/research/strategium-game-lifecycle-claim-evidence-register.md`, `docs/kanban/in-progress/VM-552-strategium-game-lifecycle-completion-mvp.md`, and `docs/handoffs/`.
