# VM-551 Independent Review — Gate A Compatibility Candidate

Review date: 2026-08-01

Reviewer: Codex

Exact candidate reviewed: **332c24097c8d3d9f3c87bee60527bdb73b795f1b**

Accompanying workflow-record HEAD: **dcb0cc88b392f7ec5f7ac71d66436dfdfe180fff**

Original production base: **2b4058ff4c769f03d52070204b3ce973e51decbd**

Prior rejected candidate: **bc2b5a764569ab79fae04b72695097cafc6bd4e8**

Prior independent-review evidence: **acbffd9a581d48c7e34ba5e84eaad169e2f44202**

## Exact disposition

**REJECT VM-551 AUDIT EXACT SHA 332c24097c8d3d9f3c87bee60527bdb73b795f1b**

The disposition applies only to the exact audit-content candidate. The accompanying workflow record, this independent-review branch, and this report are not the candidate.

The candidate resolves the prior public/internal confidence-compatibility blocker in substance. One material documentation blocker remains: result-field-consumer-map.csv, which is the hard prerequisite for Gate A implementation planning, is not yet materially complete and source-accurate for known local fields and the authored Matrix authority path.

## Authority and preflight

- Control root: C:/dev/voxmana.io.
- Audit root: C:/dev/voxmana.io-vm551-placement-system-audit.
- Independent review root: C:/dev/vm551-compat-review.
- Independent review branch: codex/vm551-placement-system-audit-compatibility-independent-review, created directly from the exact candidate.
- The exact candidate exists, descends from the original production base, and is the parent of the accompanying workflow-record HEAD.
- Local main and origin/main both remain at 2b4058ff4c769f03d52070204b3ce973e51decbd; ahead/behind is 0 0.
- Control, audit, and retained prior-review worktrees were clean at preflight.
- The audit branch has no upstream or remote-tracking ref.
- Candidate changes from the rejected predecessor are documentation/audit-only; no production, test, schema, runtime, route, cache, Matrix, or Maze implementation path changed.

The intended longer independent-review worktree path could not be created because Windows rejected two existing long asset paths. No worktree was registered and no content changed in that failed attempt. The temporary branch was safely deleted after proving it pointed at an ancestor of the audit workflow, and the shorter isolated worktree above was then created successfully.

## Governing CECOS authority

Independently verified from the exact Git object, not a working-tree copy:

- repository: C:\dev\Commander_Questions_Corpus;
- commit: 947bf45bf6a191839b5fb4fa6c65980ed9d5737e;
- path: docs/standards/cecos/CECOS-v1.0.0-draft.4.md;
- blob: 59e8000e940dc137e15437252e5a28d7164d5046;
- size: 394769 bytes;
- SHA-256 over exact binary blob bytes: dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3;
- result: PASS.

Draft.4 remains the only governing CECOS authority. No CECOS authority, quantitative conclusion, question/identity/scenario disposition, defect severity, or Gate B1/B2/C/D allocation changed in this review.

## Compatibility findings that pass

The prior independent-review blocker is resolved in substance:

- downstream-compatibility-contract.md limits Gate A to public interpretation and rendering.
- Internal accumulated scores, softmax shares, gaps, ranking inputs, stopping inputs, replay values, and existing serialized fields remain preserved.
- Public renderers must not present internal numbers as calibrated confidence, probability of correctness, identity accuracy, or scientific strength.
- Missing legacy confidence remains unknown and must not receive a fabricated numeric fallback.
- Public result states are additive; destructive field removal or rename is outside Gate A.
- REQ-A-002 traces the compatibility risk to field-shape, persistence, OAuth, dossier, recommendation, deck-link, adjacent-view, Matrix, Maze, return, and legacy validation.
- Gate A remains five requirements and does not absorb questionnaire refitting, scoring-authority reconstruction, stable-ID migration, general minimum-hit/guardrail enforcement, dependency modeling, or calibration.
- Implementation planning remains explicitly prohibited pending independent consumer-map review and owner authorization.

The two numeric Matrix paths are correctly distinguished in the controlling prose and implementation:

1. assets/js/dossier-radar.js:getDossierRadarProfile() delegates to assets/js/vm-radar.js:resolveRadarProfile(), which consumes hand-authored identity-layer preview_scores or authored component averages over Order, Knowledge, Ambition, Freedom, and Growth. This is an authored identity visualization, not confidence or a raw placement-score ledger.
2. assets/js/adaptive-placement.js:buildManaScores() derives normalized WUBRG placementResult.mana_scores; assets/js/shared.js normalizes, caches, and persists it; and assets/js/commander-dossier.js:buildManaAlignment() maps it to dossier manaAlignment used by dossier text, audit, and export consumers. This is placement-derived and separate from the authored Matrix.

The current 35 rows classify as:

- 24 PRESERVE-UNCHANGED;
- 6 PRESERVE-INTERNAL-HIDE-PUBLICLY;
- 2 ADDITIVE-EXTENSION;
- 3 VERSIONED-MIGRATION-LATER;
- 0 UNRESOLVED-BLOCKER.

Those individual dispositions are defensible for the rows that exist. Static local inspection also supports treating the recorded remote interview, deployed database, optional dataset, dynamic handoff, and indirect-consumer risks as nonblocking for this documentation gate so long as they remain explicit and the local map is complete.

## Material blocker — consumer map is incomplete and misstates one canonical writer

### Reproduction A: persisted and publicly rendered decree has no field row

Search the map for decree: no field_or_family row exists.

Local source inspection proves a material writer, normalizer, persistence, and consumer chain:

- assets/js/adaptive-placement.js:buildAdaptiveDecree() writes placementResult.decree in buildAdaptivePlacementResult().
- supabase/functions/guild-recruiter/index.ts independently accepts and returns a decree for the archived interview path.
- assets/js/shared.js:normalizePlacementResult() normalizes it; vm_savePlacementResult() writes it both to the legacy profile decree column and the full placement_result JSON.
- docs/supabase-profile-update.sql defines and constrains the persisted decree column.
- assets/js/index.js renders result.decree in the result reveal.
- assets/js/commander-dossier.js:buildCommanderDossier() copies it to primary dossier.decreeCopy.

The aggregate-object row does not provide an independently reviewable disposition for this known material public-claim field. Gate A specifically changes public interpretation and qualified claim output, so the map must show how the existing serialized and persisted decree remains compatible while renderers prefer additive bounded states or safe output.

### Reproduction B: known normalized color_weights field has no field row

Search the map for color_weights: no row exists.

assets/js/shared.js:normalizePlacementResult() explicitly preserves source.color_weights, and docs/reference/data-contracts.md documents the optional field and the rule against fabrication. It is a known local serialized-result field even though the adaptive quick path does not currently generate it. The map must classify its writer status, normalization, persistence and aggregate behavior, public treatment, migration rule, and unresolved external interview consumers rather than relying only on a catch-all aggregate row.

### Reproduction C: authored preview_scores canonical writer is incorrect

The authored_preview_scores row names “research/build-faction-artifacts.mjs to data/identity-layers.json” as the canonical writer.

Read-only source inspection shows the opposite direction:

- data/identity-layers.json is the hand-authored canonical identity-layer source containing expressions.*.preview_scores.
- research/build-faction-artifacts.mjs reads identity-layers.json; it does not write that file.
- The builder filters and propagates identity-layer expressions into generated faction, display, and placement artifacts.
- vm-radar.js and dossier-radar.js consume the authored identity-layer values at runtime.

This is not merely a naming preference. The map is the planning prerequisite for protecting the authored Matrix path, so it must identify the canonical source and downstream propagator accurately.

### Impact

Approving this map would satisfy the hard planning prerequisite while two known serialized or public fields lack field-level review and one of the two Matrix paths points to the wrong canonical writer. A later planner could miss the decree persistence and render chain, silently drop or reinterpret color_weights, or treat a downstream builder as the edit authority for authored Matrix values. The global preservation prose reduces immediate risk but does not make the required field-level writer/reader review complete.

## Bounded documentation-only remediation

No implementation or implementation planning is authorized. A replacement candidate should only:

1. Add a decree row covering both local writers, shared normalization, cache/profile/OAuth/saved/legacy/Maze propagation, profile-column and placement_result serialization, result reveal, dossier consumption, public treatment, preservation rule, tests, and unresolved remote or deployed consumers.
2. Add a color_weights row identifying the absence of an adaptive quick-path writer, the shared normalizer and data-contract authority, serialized/aggregate propagation, non-fabrication rule, appropriate compatibility disposition, and unresolved archived-interview or deployed consumers.
3. Correct authored_preview_scores so data/identity-layers.json is the canonical authored source and research/build-faction-artifacts.mjs is a downstream reader and propagator, with resolvable evidence locators.
4. Add decree and color_weights to the compatibility documentation validator’s required field families and add a source-direction assertion for the authored Matrix row.
5. Regenerate the owner package and reconcile manifest sizes and hashes, extract counts, validation record, artifact README, Kanban note, and handoff.
6. Preserve all quantitative artifacts, defect severities, and Gate scopes unless this narrow correction exposes a direct contradiction.

## Validation results

### PASS

- Exact candidate existence, ancestry, parent relationship, docs-only scope, cleanliness, main/origin parity, ahead/behind, worktrees, and upstream absence.
- Exact CECOS draft.4 binary-object checksum replay.
- Original audit generator: 37 identities, 113 questions, 356 answers, 26,891 terminal paths, and 333 exact ties.
- Remediation generator: zero negative-only winners, 2,901 below-minimum-proxy paths, 44,005 matched one-answer comparisons, 14,424 primary flips, 12,360 different-family flips, three dead questions, six dead answers, eleven repeated-construct groups, and 28 non-monotonic observations.
- Owner reconciliation validator and compatibility documentation validator.
- Remediation validator in the governed audit worktree.
- test:placement, test:gate-live-bias, test:gate-compression, test:bias:all, test:source-generated, test:parser, lint:js, lint:html, test:frontend-smoke, test:route-metadata, test:copy-boundaries, and test:deck-links.
- Direct Maze query, scratchpad, search, and adjacent-navigation tests.
- Existing generated Gate reports remained Git-equivalent after rerun.

### Known repository limitations — not candidate blockers

- test:semantic-readiness passes contract, candidate-scope, and fixture checks, then reports the pre-existing stale semantic-readiness-provenance.json.
- Aggregate npm test in the dependency-equipped governed audit worktree reaches the pre-existing absent ignored data/scryfall/raw/oracle-cards.json fixture.
- Reviewed visual baselines are absent, so no visual baseline was created, accepted, or regenerated.
- Empirical placement accuracy, calibration, player prevalence, comprehension, and statistical correlation remain unknown because no player-response corpus exists.

### Review-environment limitations — not candidate blockers

- The fresh isolated review worktree has no node_modules, so its aggregate test stops at missing xlsx; the same source and test blobs were exercised in the dependency-equipped governed audit worktree.
- The remediation validator intentionally asserts the original audit branch name. It fails only that assertion on the independent-review branch and passes in the governed audit worktree.
- The owner-package generator hashes working-tree bytes. A fresh CRLF checkout rewrites two manifest hash and size lines even though the exact candidate Git blobs and committed manifest hashes match. The generator reproduces without a Git diff in the established audit worktree. This line-ending portability weakness does not alter the blocker or audit conclusions.

## Readiness conclusion

The exact candidate is not ready for documentation certification or integration because the hard planning-prerequisite map is not yet complete and source-accurate. The public/internal compatibility contract, Matrix separation, strengthened REQ-A-002, five-requirement Gate A boundary, quantitative findings, and defect severities otherwise stand.

This rejection does not authorize Gate A implementation, implementation planning, task creation, integration, merge, push, deployment, certification, or production change.

**REJECT VM-551 AUDIT EXACT SHA 332c24097c8d3d9f3c87bee60527bdb73b795f1b**
