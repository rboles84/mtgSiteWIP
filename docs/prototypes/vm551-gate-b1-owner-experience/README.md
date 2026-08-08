# VM-551 Gate B1 Owner Experience Prototype

## Purpose

This is a static, non-production owner-review artifact for the final Gate B1 instrument architecture. It demonstrates the 16-construct behavioral pool, three-axis result inventory, and guarded secondary lens channel before any calculation, player validation, or implementation is authorized.

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

Choose one of ten explicitly authored owner-review scenarios:

1. Simic / Quandrix — same-color close state, 7 questions.
2. White — mono-color primary state, 8 questions.
3. Bant — three-color close state, 8 questions.
4. Colorless — endpoint insufficient state, 8 questions.
5. Five-Color / WUBRG — endpoint mixed state, 8 questions.
6. Esper — C16 information-to-plan route, 7 questions.
7. Yore unresolved — no lens eligible, 7 questions.
8. Yore unresolved — eligible lens skipped, 7 questions.
9. Yore unresolved — eligible lens answered, 7 questions.
10. Yore unresolved — contradictory lens, 7 questions.

Every route contains exactly all 4 Gate questions, 2 or 3 Hall questions, 0 or 1 targeted unresolved-evidence question, and 6–8 total questions. The targeted slot may contain a competitor boundary or the single eligible lens example. No optional behavioral question repeats a dependency. Selecting answers exercises the interface only. The result state is preauthored, while **What your Commander answers showed** is derived from behavioral answers actually selected. Lens self-report, when present, appears separately under **What you said resonates**. Any departure from the authored review path appears only in reviewer information.

### Question explorer

Inspect all 35 behavioral questions: 4 Gate, 13 Hall, and 18 Crucible, plus the separately labeled prototype-only lens item. Player-facing prompts, answer titles, explanations, and jargon help are visible by default. The reviewer toggle reveals the declared construct or evidence class, dependency group, Commander situation, disposition, provisional non-scoring signals, evidence provenance, eligibility, candidate set, exclusions, and limitations. Identity support is not placed beside behavioral answers.

### Result explorer

Inspect all 37 certified identity names across three independent axes. Content readiness is 37 `CONTENT_READY`. Instrument observability is 22 `OBSERVABLE`, 14 `PARTIALLY_OBSERVABLE`, and 1 `NOT_CLEANLY_OBSERVABLE` (Yore). Mapping validation is 37 `MAPPING_HYPOTHESIS`; none is validated. Exact observability and validation needs remain available in reviewer information.

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
- The ten route compositions, selected review-answer IDs, state demonstrations, route-supported distinctions, lens eligibility states, and separately labeled identity context are explicitly authored review metadata.
- No weights, scores, identity calculation, adaptive selection algorithm, randomization, or confidence value exists in the prototype.

## Source documents

- `docs/plans/vm551-gate-b1-placement-instrument/pilot-question-bank.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/answer-signal-contracts.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/construct-map.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/jargon-glossary.tsv`
- `docs/plans/vm551-gate-b1-placement-instrument/identity-lens-self-report-contract.md`
- `docs/plans/vm551-gate-b1-product-fit/question-product-fit-review.tsv`
- `docs/plans/vm551-gate-b1-product-fit/result-usefulness-matrix.tsv`
- `docs/plans/vm551-gate-b1-product-fit/profile-enrichment-crosswalk.tsv`
- `docs/plans/vm551-gate-b1-product-fit/representative-result-walkthroughs.md`
- `docs/plans/vm551-gate-a-trust-containment/gate-a-result-state-contract.md`

Each derived question, answer, result, enrichment row, walkthrough, and Gate A state in `prototype-data.json` retains a source reference.

## Limitations

- The routes are demonstrations, not a route-selection design or adaptive algorithm.
- All identity mappings remain hypotheses and non-scoring; the three C16 directional mappings are also evidence-required.
- Content readiness does not imply observability or validation. Exact observability and validation needs remain reviewer-visible and are translated into plain public limitations rather than exposed as raw requirements labels.
- The lens question is an authored evidence-class demonstration, not a production question or behavioral mapping.
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

1. Complete Simic / Quandrix as the behavior-only baseline.
2. Complete Esper and confirm C16 appears adaptively while its mapping remains provisional.
3. Compare Yore no-lens, lens-skipped, lens-answered, and contradictory-lens routes.
4. Confirm skip leaves the behavioral reading unchanged and contradiction prevents override.
5. Open **Deepen this reading** and confirm Player Atlas enrichment remains conditional and separate from placement evidence.
6. Scan Question Explorer at desktop and narrow width, including C16 and the separate lens section.
7. Scan Result Explorer with reviewer information enabled and confirm all three status axes appear independently.
8. Record decisions only in `owner-review-notes.md`. Do not infer authorization for player validation or implementation.

## Not implemented

No pilot, scoring, weights, route selection, stopping, result resolution, persistence, migration, saved-result reinterpretation, live question, production UI, dossier, Matrix, recommendation, card/precon, Maze, account, analytics, sharing, player recruitment, shadow test, deployment, or certification is implemented here.
