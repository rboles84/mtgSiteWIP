# VM-551 Gate A Owner QA Record

Candidate status: bounded implementation complete; owner visual acceptance is required before merge or push.

Authority: design `c6b1c9e6940b67201c8c2f999409a7103ba52b88`; decisions `OD-01` through `OD-18` accepted without deviation. Expected behavior is controlled by `docs/plans/vm551-gate-a-trust-containment/gate-a-regression-matrix.csv`.

Automated result legend: `PASS` means the listed contract is covered by the existing placement suite, the added Gate A state/compatibility assertions, a focused static check, or the focused Archscry browser journey. Manual result `OWNER` means the exact visual/state surface still requires owner review. Remote signed-in persistence remains unexecuted locally and is called out explicitly.

| Test ID | Route / state | Expected result | Automated result | Manual result | Owner decision | Notes |
|---|---|---|---|---|---|---|
| QF-001 | Quick / 7-question completion | Finalize once; numeric model behavior unchanged | PASS | Not needed | Accepted | Placement suite |
| QF-002 | Quick / 8-question completion | Finalize once at eighth answer | PASS | Not needed | Accepted | Placement suite |
| QF-003 | Quick / Back | Replay without stale later evidence | PASS | OWNER | Pending visual | Keyboard/focus hierarchy |
| QF-004 | Quick / changed prior answer | Only replayed selection affects result | PASS | Not needed | Accepted | Placement suite |
| QF-005 | Quick / incomplete | Continue/restart; no dossier or recommendations | PASS | OWNER | Pending visual | Explicit shell supported; no score inference |
| QF-006 | Result / invalid payload | Safe restart; no placement output | PASS | Not needed | Accepted | Pure resolver |
| QF-007 | Direct valid result | Restore original identity with bounded state | PASS | Not needed | Accepted | Focused browser journey |
| QF-008 | Result / refresh | Preserve result and public state | PASS | Not needed | Accepted | Cache/browser journey |
| RS-001 | Result / primary | Current best fit; no numeric confidence | PASS | PASS | Accepted | Desktop/mobile inspected |
| RS-002 | Result / exact tie | Two co-leaders; stored primary unchanged | PASS | OWNER | Pending visual | Pure state and field invariance pass |
| RS-003 | Result / close | One eligible rank-two alternative; rank three hidden | PASS | OWNER | Pending visual | Approved heuristic asserted |
| RS-004 | Result / mixed | Generic multi-path shell; no identity recommendation | PASS | OWNER | Pending visual | Explicit state only |
| RS-005 | Result / contradictory | Conflicting-signals shell; no inferred primary | PASS | OWNER | Pending visual | Explicit state only |
| RS-006 | Result / insufficient | No named identity, dossier, or recommendation | PASS | OWNER | Pending visual | Explicit state only |
| RS-007 | Saved / unknown | Evidence unavailable; no fabricated certainty | PASS | OWNER | Pending visual | Legacy normalizer checked |
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
| CP-018 | Desktop layout | No overflow; primary actions visible | PASS | PASS | Accepted for primary | Other state shells require owner review |
| CP-019 | Mobile layout | No horizontal overflow; actions stack | PASS | PASS | Accepted for primary | 390px in-app check; other shells require owner review |
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

## Exact local state-shell setup

1. Serve the implementation worktree root (for example, `python -m http.server 8765`) and open `http://127.0.0.1:8765/archscry/index.html`.
2. Complete one normal Quick Reading. On the result screen, open the browser console and install this local-only helper:

```js
const vmGateABase = JSON.parse(sessionStorage.getItem("vm_gate_a_qa_base") || sessionStorage.getItem("vm_last_result"));
if (!sessionStorage.getItem("vm_gate_a_qa_base")) {
  sessionStorage.setItem("vm_gate_a_qa_base", JSON.stringify(vmGateABase));
}
window.vmGateAQa = (kind) => {
  const result = JSON.parse(sessionStorage.getItem("vm_gate_a_qa_base"));
  result.legacy_result = false;
  result.source_mode = "quick";
  result.result_state = ["mixed", "contradictory", "insufficient", "unknown", "invalid", "incomplete"].includes(kind) ? kind : null;
  if (kind === "tie") {
    result.top_matches[1].score = result.top_matches[0].score;
  }
  if (kind === "close") {
    result.confidence_gap = 0.01;
    result.stage_history = [...(result.stage_history || []), { stage: "crucible", qa_fixture: true }];
    result.evidence_trail = [...(result.evidence_trail || []), {
      answer_title: "Owner QA close-alternative probe",
      signal: "a direct authored comparison signal",
      deltas: [{ faction: result.top_matches[1].faction, delta: 1 }]
    }];
  }
  if (kind === "legacy-with-confidence" || kind === "legacy-without-confidence") {
    result.result_state = "unknown";
    result.legacy_result = true;
    result.source_mode = "legacy";
    result.evidence_trail = [];
    result.stage_history = [];
    if (kind === "legacy-with-confidence") result.confidence = 0.82;
    else delete result.confidence;
  }
  sessionStorage.setItem("vm_last_result", JSON.stringify(result));
  location.reload();
};
window.vmGateARestore = () => {
  sessionStorage.setItem("vm_last_result", sessionStorage.getItem("vm_gate_a_qa_base"));
  location.reload();
};
```

3. Run one of `vmGateAQa("tie")`, `vmGateAQa("close")`, `vmGateAQa("mixed")`, `vmGateAQa("contradictory")`, `vmGateAQa("insufficient")`, `vmGateAQa("unknown")`, `vmGateAQa("invalid")`, `vmGateAQa("incomplete")`, `vmGateAQa("legacy-with-confidence")`, or `vmGateAQa("legacy-without-confidence")`.
4. Use `vmGateARestore()` after reinstalling the helper on any reloaded page, or retake the reading, to restore a normal result. These fixtures alter only local `sessionStorage`; they do not save, migrate, or change production data.
