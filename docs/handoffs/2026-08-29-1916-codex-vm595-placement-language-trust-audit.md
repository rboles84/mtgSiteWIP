# VM-595 Placement Language Trust Audit Handoff

## Agent Name

Codex

## Task Requested

Create VM-595 and complete a deterministic all-37 audit of the actual production-composed Placement/dossier language for repetition, generic/template voice, synthetic cadence, semantic redundancy, source ownership, truth/voice separation, smallest systemic remediation, and a bounded Owner Review queue. Do not remediate production prose or Placement semantics.

## Repository State

- Branch: `main`
- Parent / current HEAD: `fbea856b2a480d722db58401598c9d8a9b704baf`
- Local/remote relationship: `main == origin/main`, divergence `0/0`
- Registered worktrees: one
- Commit/push state: uncommitted, unpushed Owner Review candidate; no commit, push, merge, or closeout performed
- Protected VM-578 state: `docs/research/maze-player-language/corpus/vm578.zip` remains the only unrelated untracked path and is unstaged, unread, unmodified, unmoved, and untouched

## Files Reviewed

- Owner-supplied VM-595 request
- `AGENTS.md`; repo-local RobDev and RobQA skills/guides; frozen `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`, token/reasoning control, data contracts, source/generated guardrails, route ownership, and data flow
- `docs/handoffs/HANDOFF_INDEX.md`, current board, VM-579/586/593/594 cards, and recent VM-579/586/594 handoffs
- VM-579 dossier review runtime/composer paths and tests
- VM-586 complete 37-record browser-rendered dossier corpus, README, manifest, and collection tooling
- current identity registry, faction artifact, dossier public-copy source/catalog, precon/source projection roles, and composer/shared-copy owners

## Files Changed

- `package.json`
- `scripts/audit/placement-language-trust-audit.mjs`
- `docs/research/placement-language-trust-audit.json`
- `docs/research/placement-language-trust-audit.md`
- `docs/kanban/in-progress/VM-595-placement-language-trust-audit.md`
- `docs/kanban/board.md`
- this handoff
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Confirmed VM-595 was unused, created the In Progress card, and registered it on the board.
- Added one deterministic research analyzer that reuses VM-586's VM-579 browser-rendered corpus, proves dossier-owner equivalence from its exact baseline to current `fbea856…`, and fails on current owner-path drift.
- Analyzed all 37 identities across six rendered section boundaries, producing 1,399 prose units, 1,806 sentences, and 26,831 words.
- Recorded 66 exact cross-identity duplicate groups / 819 occurrences, 18 substitution-normalized groups, 57 repeated openings, 308 repeated five-word groups, 1,412 non-exact pairwise similarity signals, and 14 within-dossier cross-section candidates.
- Classified seven material defect families with truth, language, scope, earliest owner, source path/field, systemic status, and likely remediation layer.
- Produced a 10-dossier/section Owner Review queue, strong positive controls, launch assessment, one mixed remediation shape, and exactly one proposed next story with four acceptance criteria.

## Why It Changed

The current copy contains observable all-population cadence and exact boilerplate plus a bounded set of cross-section and grammar defects that weaken trust. The audit freezes the current problem and ownership before any remediation changes the population.

## Decisions Made

- Disposition: **OWNER REVIEW READY — STOP BEFORE REMEDIATION**.
- Launch assessment: launch-critical language remediation; not a Placement correctness blocker and not acceptable as-is against the explicit launch-quality requirement.
- Root-cause shape: mixed. Three material families originate in authored dossier source, two in composer templates, one in multiple good fragments badly composed, and one in shared UI copy.
- VM-586 evidence is current-equivalent because no dossier owner/input changed between exact VM-586 baseline `db9a16a…` and `fbea856…`; the current VM-579 test separately re-composes all 37. A second browser harness and ceremonial screenshot regeneration were intentionally avoided.
- No AI detector was used. Similarity counts are candidate signals, not automatic defect labels.
- No unsupported or over-strengthened claim was proven; that is not a new semantic certification.
- Recommended correction is mixed field-role consolidation, not an all-37 bespoke rewrite.

## RobDev Compact Transfer

- Product outcome: complete 37/37 language-trust evidence, ownership trace, bounded owner judgment, and smallest remediation design.
- Current behavior: every dossier combines approved identity copy with substantial shared instructions and overlapping section roles.
- Owning authority/producer: active VM-595 card; `data/identity-layers.json` for population; VM-579/production composer for rendered truth; `data/dossier/identity-dossier-content.source.json` for approved public copy; existing generated catalogs/producers; composer/shared-copy modules for presentation.
- Changed behavior: research tooling, evidence, report, and governance only.
- Protected behavior: runtime/UI/CSS, identity meaning, dossier prose, generated catalogs, card/precon facts, Placement mappings/scoring/ranking/qualification/stopping, persistence, telemetry, VM-593/594, and VM-578.
- Existing machinery reused: VM-579 Dossier Review, VM-586 rendered corpus/collection precedent, current identity registry, production composer ownership, repository audit convention.
- Consumers: Owner Review and the one future separately authorized remediation story.
- Smallest complete implementation: one analyzer, one JSON evidence artifact, one report/queue, card/board, and handoff/index.
- Non-goals/stop: no prose repair, composer change, generated hand edit, Placement change, new UI/harness, Phase 3 reopening, commit/push/merge, or next-story implementation.

## Risks / Uncertainties

- Exact shared sentences include useful structural instructions; 819 occurrences are not an 819-defect count.
- Pairwise lexical similarity inflates one template family into many pairs; the report uses family-level editorial findings instead.
- Semantic redundancy remains contextual; the Owner queue asks for judgment only where information-role choices matter.
- A later runtime/content change invalidates the current-equivalence proof and requires fresh rendered collection before remediation review.

## RobQA / Tests Run

### Change classification

- QA tier: QA-0 research/tooling plus task-mandated VM-579 scaffold validation.
- Changed behavior: deterministic audit generation/check and research/governance artifacts only.
- Protected behavior intentionally untouched: all product/runtime/data/Placement/dossier behavior and protected VM-593/594/578 surfaces.

### Tests selected

- `node --check scripts/audit/placement-language-trust-audit.mjs` — PASS; analyzer syntax.
- `npm.cmd run audit:placement-language-trust -- --check` — PASS; deterministic current-equivalence and 37/37 evidence check.
- `npm.cmd run test:dev-review` — PASS; current all-37 composer, gating, taxonomy, context, isolation, and real-engine seams remain green.
- Evidence-reference validator — PASS; current identities, seven material findings, and every source-ownership path resolve.
- Protected-path diff — PASS; no `assets`, `data`, `archscry`, runtime, VM-593, or VM-594 diff.
- `git diff --check` — PASS with line-ending warnings only.

### Tests intentionally skipped

- Exhaustive Placement, journey, synthetic, mutation, recovery, and broad browser suites — not required because no product runtime, UI, scoring, mapping, qualification, result meaning, or dossier composition changed; the current VM-579 focused baseline protects the named scaffold.
- New screenshots — not required because accepted VM-586 screenshots/rendered records are current-equivalent and screenshots are not the primary language evidence.

### CPU-heavy validation

- `NOT REQUIRED`.

### Self-QA evidence

- Deterministic surface: all 37 direct Dossier Review records with `start`, `why`, `commander-deck-starts`, `starter-cards`, `mana-base`, and `maze-discovery` boundaries.
- Editorial pass: White, Boros, Lorehold, Orzhov, Silverquill, Temur, Yore, Ink, Dune, WUBRG, Rakdos, and Prismari were read across the relevant rendered sections; quantitative candidates were reconciled against actual prose and source owners.
- Positive controls: Rakdos, Orzhov, Lorehold, Prismari, and White hero/identity passages.

### Remaining Owner judgment

Only the 10 named dossier/section cases in `docs/research/placement-language-trust-audit.md`, through `/archscry/?vm-dev-review=1` → Dossier Review.

## Not Touched

No production prose, `assets/`, `data/`, generated catalog, Placement source/model/mapping/question, scoring/ranking/qualification/stopping, UI/CSS, VM-579 scaffold, persistence, telemetry, VM-593, VM-594, Phase 3, or VM-578 change.

## Follow-Up Recommendations

Complete the bounded 10-case Owner Review. If accepted, create only the proposed Placement Language Field-Role Consolidation story; do not begin it from this handoff without separate authorization.

## Next Suggested Agent

Owner Review facilitator, then a separately authorized RobDev implementation agent for the single accepted remediation story.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-595-placement-language-trust-audit.md`
- `docs/research/placement-language-trust-audit.md`
- `docs/research/placement-language-trust-audit.json`
- `docs/kanban/done/VM-579-archscry-dev-review-placement-validation.md`
- `docs/kanban/done/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/kanban/done/VM-594-archscry-phase-3-experienced-player-routing-proof.md`

