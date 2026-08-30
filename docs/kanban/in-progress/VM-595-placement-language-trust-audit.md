# VM-595 — Placement Language Trust Audit

ID: VM-595
Title: Placement Language Trust Audit
Status: In Progress
Type: Product language / trust / QA research
Area: Archscry Placement / rendered dossier language
Priority: Launch-critical quality
Created: 2026-08-29

## Summary

Audit the actual player-facing Placement/dossier prose across all 37 active identities for observable language defects that make Vox Mana feel repetitive, generic, templated, over-produced, synthetic, or untrustworthy. Freeze the current rendered problem, trace material findings to their earliest responsible owner, and design the smallest systemic remediation without changing production prose or Placement semantics.

## Source

- Owner request supplied 2026-08-29: `VM-595 — Placement Language Trust Audit`.
- Accepted synchronized production baseline: `fbea856b2a480d722db58401598c9d8a9b704baf`.
- Existing all-37 production-composer review seam: VM-579 Dossier Review at `/archscry/?vm-dev-review=1`.
- Existing deterministic current-state collection precedent: VM-586.
- Governing implementation and QA gates: `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`.

## RobDevPass Contract

- Product outcome: a reproducible 37/37 rendered-language corpus, evidence-backed defect analysis, source-ownership trace, bounded Owner Review queue, and one smallest-systemic-remediation recommendation.
- Current behavior: VM-579 exposes every active identity through the production dossier composer, and VM-586 proved deterministic all-37 rendered collection; no current artifact classifies language trust defects or traces their owning layer.
- Locked decisions: rendered production prose is the primary surface; no AI detector or authorship probability; no prose remediation; no Placement, identity, mapping, scoring, qualification, or factual-authority change; Owner performs judgment only on a machine-selected queue after 37/37 collection.
- Owning layers: `data/identity-layers.json` owns active identity membership; VM-579 and the production dossier composer/renderer own the audit surface; authored raw/source records, generated `data/factions.json`, dossier composer modules, Commander guidance, and shared UI copy retain distinct evidence roles.
- Changed behavior: research tooling and audit/governance artifacts only.
- Protected behavior: production runtime/UI/CSS, identity meaning, authored faction claims, generated projections, Placement mappings/scoring/ranking/qualification/stopping, dossier composition, Commander guidance, persistence, telemetry, VM-593/594, and VM-578.
- Existing machinery: reuse VM-579 Dossier Review, VM-586 browser collection patterns/evidence where current, the production dossier composer, current identity registry, and repository audit conventions.
- Consumers/blast radius: future language-remediation planning and bounded Owner Review; no runtime consumer changes.
- Smallest complete implementation: one deterministic audit entry point plus one compact report, one machine-readable 37-identity evidence file, the card, and required handoff/index/board records.
- Non-goals: no all-37 rewrite, no source or generated-data repair, no composer/template repair, no new dossier UI, no second review harness, no Phase 3 reopening, no semantic or placement change.
- Stop conditions: stop if collection requires modifying the VM-579 scaffold or product runtime; stop rather than infer unsupported truth or source ownership that cannot be traced; stop before implementing the recommended remediation.

## Acceptance Criteria

- [x] All 37 current dossiers are reviewed from the real production composer through the existing VM-579 Dev Review scaffold, with reproducible rendered-text evidence and no Owner collection work.
- [x] Observable defects are classified and measured, including within-dossier repetition, cross-identity templating/interchangeability, cadence, redundancy, generic abstraction, qualification density, and truth/voice separation.
- [x] Every material defect family is traced to its owning authored source, shared composer/template, generated projection, Commander guidance, shared UI, or explicitly unresolved layer.
- [x] A bounded remediation design and approximately 8–12-case Owner Review queue are delivered without changing production prose, Placement semantics, or the VM-579 scaffold.

## Files Likely Impacted

- `scripts/audit/placement-language-trust-audit.mjs`
- `docs/research/placement-language-trust-audit.md`
- `docs/research/placement-language-trust-audit.json`
- `docs/kanban/in-progress/VM-595-placement-language-trust-audit.md`
- `docs/kanban/board.md`
- `docs/handoffs/`

## Risks

- Quantitative similarity can mistake intentional structural consistency for prose defects.
- Rendered duplication can be attributed to the wrong layer if source, projection, and composer roles are collapsed.
- Semantic redundancy and interchangeability require editorial judgment after deterministic candidate generation.
- Reusing older VM-586 evidence without re-rendering the current baseline could conceal later product drift.
- Audit findings could tempt premature prose repair and mutate the population under study.

## Implementation Prompt

Reuse the current VM-579/VM-586 production-render path to collect and analyze the complete 37-identity rendered dossier population. Treat deterministic metrics as candidate signals, trace material findings to the earliest responsible owner, separate voice from truth, and stop at a compact remediation design plus bounded Owner Review queue.

## Notes

- VM-595 was confirmed unused by a repository-wide tracked-file search before creation.
- Baseline preflight: `main == origin/main == fbea856b2a480d722db58401598c9d8a9b704baf`, divergence `0/0`, one registered worktree, tracked worktree clean.
- Protected unrelated archive `docs/research/maze-player-language/corpus/vm578.zip` remains untracked, unstaged, unread, and untouched.
- VM-594 is closed. Do not reopen Phase 3.

## Audit Outcome

- 37/37 identities, 1,399 prose units, 1,806 sentences, and 26,831 words were analyzed.
- 66 exact cross-identity duplicate sentence groups contain 819 rendered occurrences; 18 additional substitution-normalized groups, 57 repeated five-word openings, and 14 within-dossier cross-section redundancy candidates were recorded.
- Seven material defect families were classified: three rooted in authored source, two in composer templates, one in section-role composition, and one in shared UI copy.
- No unsupported or over-strengthened Placement claim was proven. The result is launch-critical language remediation, not a Placement correctness blocker.
- Recommended remediation shape: mixed field-role consolidation, not an all-37 bespoke rewrite.
- Owner Review is bounded to 10 named dossiers/sections in `docs/research/placement-language-trust-audit.md`.

## RobQA Outcome

- QA tier: QA-0 research/tooling, plus the task-mandated current VM-579 all-37 scaffold check.
- `node --check scripts/audit/placement-language-trust-audit.mjs` — PASS.
- `npm.cmd run audit:placement-language-trust -- --check` — PASS; 37/37, 1,399 units, 1,806 sentences.
- `npm.cmd run test:dev-review` — PASS; gating, taxonomy order, transient Maze context, isolation, and real-engine validation remain green.
- Evidence-reference validation — PASS; all 37 identities valid, seven material findings present, all traced source paths resolve.
- Protected-path diff — PASS; no runtime, data, VM-593, or VM-594 change.
- `git diff --check` — PASS with line-ending warnings only.
- CPU-heavy Placement/browser certification: NOT REQUIRED; no runtime, UI, scoring, mapping, qualification, or dossier composition changed.
- Status: **OWNER REVIEW READY**; stop before remediation, commit, push, or closeout.
