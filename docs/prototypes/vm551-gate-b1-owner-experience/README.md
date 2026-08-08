# VM-551 Gate B1 Owner Experience Prototype

## Purpose

This is a static, non-production owner-review artifact for the owner-approved Gate B1 semantic design. It demonstrates how the remediated Archscry question bank and uneven all-37 result packages may feel in use before any calculation, player validation, or implementation is authorized.

> **This prototype does not calculate placement. It demonstrates the approved question and result experience using authored review scenarios.**

It does not connect to the live questionnaire, production data, saved results, scoring, routing, stopping, persistence, accounts, analytics, recommendation services, or APIs. It does not claim placement accuracy, calibration, or player validation.

## Open locally

From this directory, start any simple static-file server already available on the machine. No package installation or build is needed. For example:

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`. Direct `file://` opening is not supported because the browser must read `prototype-data.json` as a separate derived artifact.

## Modes

### Guided walkthrough

Choose one of five explicitly authored owner-review scenarios:

1. Simic / Quandrix — same-color close state, 7 questions.
2. White — mono-color primary state, 8 questions.
3. Bant — three-color close state, 8 questions.
4. Colorless — endpoint insufficient state, 8 questions.
5. Five-Color / WUBRG — endpoint mixed state, 8 questions.

Every route contains exactly all 4 Gate questions, 2 or 3 Hall questions, 0 or 1 Crucible question, and 6–8 total questions. No optional Hall question shares the route’s Crucible dependency group. Selecting answers exercises the interface only. The result state is preauthored, while **What your answers showed** is derived from the answers actually selected. Any departure from the authored review path appears only in reviewer information; it is never presented as player result copy.

### Question explorer

Inspect all 34 questions: 4 Gate, 12 Hall, and 18 Crucible. Player-facing prompts, answer titles, explanations, and jargon help are visible by default. The reviewer toggle reveals the declared construct, dependency group, Commander situation, disposition, provisional non-scoring signals, evidence provenance, exclusions, and limitations. Identity support is not placed beside player answers.

### Result explorer

Inspect all 37 certified identity names and their product-usefulness packages. The final remediated distribution is 15 `CONTENT READY`, 20 `CONTENT PARTIAL`, and 2 `CONTENT GAP`. Ink and Jeskai moved from GAP to PARTIAL after certified-source reconciliation produced useful but still bounded explanations; Esper and Yore remain GAP because the approved constructs do not yet observe their distinctive identity boundaries. Colorless remains PARTIAL after the owner research supported a bounded imposed-boundary explanation. Exact evidence gaps remain available in reviewer information. Content readiness describes whether the result explanation package is usable; it does not establish placement accuracy or mapping truth.

### Compact result structure

The primary result is intentionally an opening into the existing Archscry experience rather than a miniature dossier. It shows:

- up to three grouped observations derived only from the selected answers;
- one separately sourced identity context;
- one nearby alternative and one observable distinction;
- one specific unresolved limitation;
- one Commander exploration direction; and
- inert dossier, Matrix, Maze, or Commander-direction continuations.

Exact answer IDs, provisional signals, authored-path mismatch, source paths, technical readiness rationale, and internal missing-value detail stay behind **Reviewer information**. Player Atlas enrichment remains behind **Deepen this reading**.

## Authored versus derived

- Question wording, answer copy and contracts, construct metadata, jargon, result packages, profile boundaries, and status values are derived from the committed TSV and Markdown sources listed in `prototype-data.json`.
- The five route compositions, selected review-answer IDs, state demonstrations, route-supported distinctions, and separately labeled identity context are explicitly authored review metadata based on `representative-result-walkthroughs.md`.
- No weights, scores, identity calculation, adaptive selection algorithm, randomization, or confidence value exists in the prototype.

## Source documents

- `docs/plans/vm551-gate-b1-placement-instrument/pilot-question-bank.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/answer-signal-contracts.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/construct-map.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/jargon-glossary.tsv`
- `docs/plans/vm551-gate-b1-product-fit/question-product-fit-review.tsv`
- `docs/plans/vm551-gate-b1-product-fit/result-usefulness-matrix.tsv`
- `docs/plans/vm551-gate-b1-product-fit/profile-enrichment-crosswalk.tsv`
- `docs/plans/vm551-gate-b1-product-fit/representative-result-walkthroughs.md`
- `docs/plans/vm551-gate-a-trust-containment/gate-a-result-state-contract.md`

Each derived question, answer, result, enrichment row, walkthrough, and Gate A state in `prototype-data.json` retains a source reference.

## Limitations

- The routes are demonstrations, not a route-selection design or adaptive algorithm.
- The 37 directional identity associations remain evidence-required and non-scoring.
- Result usefulness is intentionally uneven. Exact evidence gaps remain reviewer-visible and are translated into plain public limitations rather than exposed as raw requirements labels.
- Player Atlas material appears only behind **Deepen this reading** and remains conditional, reflective enrichment.
- Inert Vox Mana next-step language demonstrates information architecture only; it is not a production link or product integration.
- Browser review establishes that the static artifact renders and its controls work. It does not validate comprehension, retake stability, result recognition, recommendation relevance, or mapping accuracy with players.

## Files in this artifact

- `index.html` — semantic shell and mode controls.
- `styles.css` — isolated review styling; no production CSS or component reuse.
- `app.js` — local presentation behavior only.
- `prototype-data.json` — documentation-derived questions, answers, results, enrichment, and authored routes.
- `owner-review-notes.md` — exact hands-on review questions and decision record.
- `README.md` — scope, sources, use, boundaries, and review procedure.

## Owner review procedure

1. Complete the Simic / Quandrix route with reviewer information off, then reopen its last question with reviewer information on.
2. Complete White and compare its primary presentation with Bant's close presentation.
3. Complete Colorless and confirm the artifact refuses to name Colorless as a placement while still offering a useful browse direction.
4. Complete Five-Color / WUBRG and confirm the mixed result keeps breadth, theme, and behavior distinct.
5. Open **Deepen this reading** and confirm the optional lens is visibly conditional and never described as placement evidence.
6. Scan the Question explorer at desktop and narrow width, including all three owner-approved prompt tunes.
7. Scan the Result explorer in the order in `owner-review-notes.md`, especially Ink and Jeskai as PARTIAL and Esper and Yore as the two remaining CONTENT GAP entries. Confirm exact evidence gaps remain visible with reviewer information enabled.
8. Record decisions only in `owner-review-notes.md`. Do not infer authorization for player validation or implementation.

## Not implemented

No pilot, scoring, weights, route selection, stopping, result resolution, persistence, migration, saved-result reinterpretation, live question, production UI, dossier, Matrix, recommendation, card/precon, Maze, account, analytics, sharing, player recruitment, shadow test, deployment, or certification is implemented here.
