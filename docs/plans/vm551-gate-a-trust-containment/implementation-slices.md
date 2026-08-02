# Gate A Implementation Slices

These are ordered design slices for a later authorized implementation. They are not implementation tasks and create no authorization.

## Slice 1 — Terminology and public confidence containment

Entry: OD-01, OD-08, OD-13, OD-15 approved.
Likely files: `archscry/index.html`, `assets/js/index.js`, `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`, `assets/css/archscry.css`.
Change: name the model honestly; replace percent/meter/bands with bounded state-card shell; add prohibited public-term checks. Keep all numeric internals.
Exit: no public Bayesian/probability/confidence/accuracy/strength output; numeric/field snapshots unchanged.
Stop: any need to change ranking, stopping, Matrix data, or result schema destructively.

## Slice 2 — Additive result-state normalization

Entry: OD-02, OD-05, OD-06, OD-11, OD-12 approved.
Likely files: `assets/js/shared.js`, `assets/js/archscry-presentation.js`; state tests in existing suites.
Change: preserve/derive additive states; exact tie, invalid, incomplete, and unknown handling; remove fabricated missing legacy confidence; preserve supplied values and shapes.
Exit: nine states normalize deterministically; unsupported auto-inference remains disabled; cache/profile/OAuth shape tests green.
Stop: any migration, min-hit/guardrail, dependency, or question-provenance requirement.

## Slice 3 — Placement reveal rendering

Entry: state resolver approved and tested.
Likely files: `assets/js/index.js`, `assets/js/archscry-presentation.js`, `assets/css/archscry.css`; possibly static landing copy.
Change: state-aware quick/terminal reveal; bounded heading, evidence summary, limitation, safe next action.
Exit: primary/tie/close/unknown/invalid/incomplete surfaces render and keyboard/mobile behavior passes.
Stop: reveal needs to alter result primary, scores, or adaptive flow.

## Slice 4 — Dossier and close-alternative language

Entry: OD-03, OD-04, OD-14, OD-16, OD-17 approved.
Likely files: `assets/js/index.js`, `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`, `assets/css/archscry.css`.
Change: bounded copy at the existing terminal decree reveal, answer-grounded Shape/Why/Signals, optional rank-two Close alternative, rank-three suppression, recommendation/table qualification, original-result return. Do not add a dossier decree surface.
Exit: no false adjacency or strength bands across DOM/text/export; examples pass; original result remains intact.
Stop: request for true semantic adjacency or recommendation redesign.

## Slice 5 — Saved and legacy compatibility

Entry: Slice 2/4 fields and copy stable.
Likely files: `assets/js/shared.js`, `assets/js/index.js`; existing persistence tests.
Change: state/limitations survive session, profile, OAuth pending save, saved/current/legacy restore; legacy missing confidence is unknown; supplied number retained internally.
Exit: all round-trips and direct refresh preserve field shapes/data; no fabricated public fallback.
Stop: SQL/schema migration or historical rewrite required.

## Slice 6 — Matrix and downstream regression

Entry: result and persistence behavior stable.
Likely production change: none in Matrix/Maze/deck-link implementations; test updates only unless a public note needs placement.
Change: prove authored Matrix and placement-derived `mana_scores` unchanged; validate dossier, recommendations, deck links, eligible alternative, Maze handoff, and return.
Exit: 37-row consumer coverage and regression matrix blocking rows pass.
Stop: any numeric Matrix, `mana_scores`, URL, cache, or downstream contract drift.

## Slice 7 — Owner visual QA

Entry: automated blocking checks green; no accepted baseline modified.
Surfaces: landing, question/progress, reveal, all state shells, primary/close/legacy dossier, authored Matrix, alternative return, Maze return at desktop/mobile and keyboard.
Change: no scope expansion; only owner-approved containment defects may return to the relevant slice.
Exit: owner accepts copy hierarchy, limitations, responsive behavior, and Matrix distinction.
Stop: visual request becomes redesign, recommendation overhaul, or unrelated route work.

## Excluded from the first implementation pass

- question or answer rewrite;
- score/suppression/lateral-inhibition change;
- Gate/Hall/Crucible or stopping change;
- minimum-hit/false-positive guardrail enforcement;
- calibration or Bayesian conversion;
- stable answer IDs/provenance/dependency model;
- canonical identity or all-37 dossier rewrite;
- semantic adjacency/rank-three exploration;
- recommendation data/redesign;
- Matrix/mana-score changes;
- schema migration, unrelated route, deployment, or certification work.
