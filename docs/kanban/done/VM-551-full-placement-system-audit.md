# VM-551 - Full Placement-System Audit

Status: Owner-Rejected; Bounded Documentation Remediation In Review

Type: Audit / Requirements Definition

Area: Archscry / Placement / Evidence / Data / Rendering

Priority: P0 Trust Readiness

Created: 2026-08-01

## Summary

Conduct a comprehensive, documentation-only audit of the complete Vox Mana placement system from questionnaire answers through signal mapping, scoring, identity selection, confidence, primary and adjacent results, copy, recommendations, data generation, persistence, routes, and rendering. Diagnose and specify repairs without changing production behavior.

## Source

Owner request: `VM-551 Full Placement-System Audit`, 2026-08-01.

Control base: `2b4058ff4c769f03d52070204b3ce973e51decbd`.

Audit branch: `codex/vm551-placement-system-audit`.

Audit worktree: `C:\dev\voxmana.io-vm551-placement-system-audit`.

## Method And Controls

- Apply CECOS observation-before-interpretation, evidence traceability, ambiguity/unknown, confidence, deterministic review, defect, and public-claim boundaries.
- Apply the CRIT-001 drift-control baseline where the audit evaluates recovered identity semantics, frozen calibration, or source/generated agreement.
- Preserve exact source/generated distinctions and the certified 37-identity record.
- Separate observed repository evidence from interpretation and proposed requirements.
- Keep severity separate from implementation effort.
- Keep the repair design MVP-first.

## Acceptance Criteria

- Repository authority and dedicated-worktree controls are recorded and remain valid.
- The real end-to-end placement architecture is mapped with exact files, functions, schemas, routes, generated artifacts, and source-of-truth boundaries.
- Every placement question and answer is traced to actual signals and identity effects in both readable and machine-reviewable form.
- All 37 identities have reachability, opportunity, confidence, primary, adjacent, copy, recommendation, evidence, and risk records.
- The actual scoring model is reconstructed and evaluated for Bayesian validity, priors, likelihoods, normalization, penalties, pruning, stopping, ties, confidence, correlated evidence, and instability.
- Primary and adjacent placement rules are evaluated against explicit decision tables and edge cases.
- All placement copy is compared systematically; material public claims are entered into a claim-evidence register.
- Commander and exploration recommendations are separated by legality, behavior, strategy, popularity, and editorial role.
- Data, generation, validation, persistence, analytics, route, template, and rendering paths are audited.
- Representative runtime routes and all generated identity surfaces are inspected where practical across required viewport and accessibility states.
- Defects are categorized as logic, knowledge/evidence, copy generation, data/pipeline, template/rendering, or UI/presentation and assigned Critical/High/Medium/Low severity.
- CECOS-informed evidence, signal, scoring, confidence, selection, copy, recommendation, rendering, validation, review, and certification contracts are specified without implementation.
- Requirements trace to evidence and are grouped into Gate A trust blockers, Gate B MVP correctness, Gate C interpretation quality, and Gate D hardening.
- Reproducibility checks reconcile every question, answer, identity, rendered surface, defect reference, and requirement trace.
- Documentation-only logical commits and a dated handoff exist; no production implementation changed.

## Required Artifacts

- Placement system architecture map.
- Question-to-signal matrix plus machine-reviewable CSV.
- 37-identity reachability and opportunity matrix.
- Placement decision table.
- Classification tree.
- State-transition matrix.
- All-identity copy comparison corpus.
- Claim-evidence register.
- Defect register.
- Requirements specification and CECOS repair architecture.
- Validation record and final handoff.

## Files Likely Impacted

- `docs/audits/`
- `docs/analysis/`
- `docs/architecture/`
- `docs/qa/`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-551-full-placement-system-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-01-*-codex-vm551-placement-system-audit.md`
- Documentation-only audit data or analysis utilities under an existing non-production documentation/test-support location if required for reproducibility.

## Risks

- Architectural prose may describe intended Bayesian behavior that differs from runtime code.
- Generated data may conceal source-authority or build reproducibility gaps.
- Certified semantic readiness does not itself establish fair reachability, calibrated probabilities, or trustworthy recommendation behavior.
- Correlated questions, unequal opportunity counts, penalties, pruning, and early stopping may create hidden bias.
- Result copy may combine identity evidence, Commander heuristics, lore, table perception, and recommendation language without explicit claim contracts.
- Use only the exact CECOS draft.4 Git object at commit `947bf45bf6a191839b5fb4fa6c65980ed9d5737e` and required checksum; draft.2 is rejected authority.

## Stop Conditions

- Any authority or cleanliness mismatch.
- Any CRIT-001 drift-control `FAIL` or `UNKNOWN` that makes the inspected semantic baseline indeterminate.
- Any need to alter production code, runtime data, identity semantics, generated outputs, routes, deployment, or certification state.
- Any request to push, merge, deploy, certify, or begin VM-551 repairs before owner acceptance.

## Implementation Prompt

Audit and define requirements only. Do not implement repairs, change production behavior, modify certified semantics, regenerate production artifacts, push, merge, deploy, certify, or create implementation tasks before owner acceptance and explicit MVP-boundary approval.

## Notes

- Explicit staging only. Never use `git add .` or `git add -A`.
- The next gate after audit completion is owner review of findings and repair requirements.

## Rejected Audit And Remediation

- Original documentation-only audit at `c62c7e1b43421359488537457804698a77656952` was owner-rejected for wrong CECOS authority and missing deliverables.
- Bounded remediation preserves byte-reproduced implementation evidence, corrects the positive-evidence counter, re-adjudicates under exact draft.4, and adds all required question, identity, scenario, sensitivity, dependency, voice, defect, requirement, and MVP-boundary artifacts.
- The card remains in owner review; it is not accepted, implementation-ready, integrated, or certified.
- No production behavior, production data, recovered identity semantics, route, deployment, certification, push, merge, or VM-551 implementation changed.

## Final Owner-Review Reconciliation

- `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv` govern Gate A/B1/B2; narrative summaries must agree with them.
- Corrected authority remains zero genuinely negative-only winners; 2,901 primary terminal paths are separately below generated minimum-hit metadata under the documented strong-authored-hit proxy; runtime does not enforce that metadata and false-positive guardrails remain non-executable.
- All 37 profile probes are `GOLDEN-PATH-DERIVED`, score `EXACT-PRIMARY`, and remain `INCOMPLETE` because they lack an independently selected neighboring or mixed/uncertain challenge.
- The nine adversarial dispositions reconcile to 5 literal non-representations, 2 partial/conflated cases, and 2 unsupported-inference cases.
- Gate A is immediate output trust containment only. Question/scoring refit, executable minimum/guardrail contracts, stable provenance, and dependency handling begin in Gate B1; broader schemas/manifests/dead-control cleanup remain Gate B2.
- `owner-review-evidence-manifest.md` and `owner-review-critical-extract.md` are the bounded owner-review package. No production implementation is authorized.

Next gate: owner review and explicit acceptance of the audit, defect categories, and MVP repair boundary before implementation planning.
