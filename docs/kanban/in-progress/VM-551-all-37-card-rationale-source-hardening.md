# VM-551 — All-37 Card-Rationale Source Hardening

Status: In progress

## Objective

Establish a source-first, provenance-complete card-to-identity relationship authority for all 37 Archscry identities, re-adjudicate every existing Commander Compass candidate, and make `Why These Cards Echo This Reading` consume only an approved generated catalog.

## Starting Authority

- Branch: `codex/vm551`
- Worktree: `C:\dev\voxmana.io-vm551`
- Exact starting HEAD: `253965d77339e9a34640fdd261259b45038ac4c6`
- No new branch or worktree is authorized.

## Required Deliverables

- Baseline and post-hardening inventories with exactly 37 identity rows.
- Per-card adjudication register including rejected and evidence-needed candidates.
- Canonical provenance-complete relationship source under `data/dossier/`.
- Deterministically generated runtime catalog containing only `APPROVED_PUBLIC` rows.
- Owner-review packet for every `REVIEW_REQUIRED` rationale.
- Gap report and automated provenance, negative-fixture, rendering, and modal guards.

## Hard Boundaries

- Mechanical eligibility is not semantic approval.
- New public prose remains `REVIEW_REQUIRED`; Codex may not self-promote it.
- Color, legality, generic mechanics, tags, product membership, popularity, or flavor similarity do not independently prove an identity relationship.
- Missing evidence remains explicit; no fallback or layout-driven filler is allowed.
- Constructs, questions, answers, mappings, scoring, ranking, routing, stopping, refinement, naming qualification, Yore observability, Gate A result states, Matrix calculations, persistence, and schemas are protected.
- No push, merge, deployment, migration, recruitment, shadow test, or player validation.

## Stop Condition

Stop after the all-37 evidence pass, approved-only catalog integration, tests, focused browser QA, scoped local commits, and owner handoff.
