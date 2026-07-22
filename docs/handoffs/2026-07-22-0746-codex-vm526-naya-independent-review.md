# VM-526 Naya Independent Exact-SHA Review

## Agent Name

Codex

## Task Requested

Perform a fresh independent exact-SHA review of VM-526 Naya candidate `f3dda547eb91475cd3d00056463729d98a040e55` against program base `7964b93f531017e579f069e6941463f53eab4bd9`, record the decision governance, and do not remediate, replace, certify, start VM-527, update Excel, push, merge, or open a PR.

## Program

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-526 - Naya
- Canonical identity: `NAYA`
- Display/color order: `WRG`
- Invalid validator aliases verified: `WRG`, `RGW`, `GRW`
- Review worktree: `C:\dev\mtgSiteWIP-crit001-vm526-naya-independent-review`
- Review branch: `codex/vm-526-naya-semantic-recovery-independent-review`
- Starting HEAD: `cdcd1b408a64dacb63e75865c519ca317ce0e08a`
- Program base / VM-525 Jund certification: `7964b93f531017e579f069e6941463f53eab4bd9`
- Gate 1+2 governance parent: `813c42c63a56648029c7452d2619cdaf60432b5a`
- Gate 1+2 governance: `b03574cc853a4456eabbaeca113260e84f3bda2a`
- Superseded Naya candidate: `57ce7161c1ff8736a8b91a6564fa97129fe38383`
- Exact assigned Naya candidate reviewed: `f3dda547eb91475cd3d00056463729d98a040e55`
- Candidate workflow: `cdcd1b408a64dacb63e75865c519ca317ce0e08a`

## Independence Statement

This review used a dedicated branch and worktree created from the workflow commit, independently reconstructed the ancestry, independently inspected the exact base-to-candidate diff, reran committed validators and tests, tested the exact candidate tree in a fresh detached worktree, and did not treat Gate 1+2, the workflow commit, the branch, current HEAD, or the superseded candidate as approval authority.

## Setup Preflight

- Local branch collision for `codex/vm-526-naya-semantic-recovery-independent-review`: none found before creation.
- Remote branch collision: `git ls-remote --heads origin codex/vm-526-naya-semantic-recovery-independent-review` returned no branch.
- Worktree collision for `C:\dev\mtgSiteWIP-crit001-vm526-naya-independent-review`: none found before creation.
- Naya independent review / approval / rejection / certification: none found before this work.
- Later authorized Naya candidate superseding `f3dda547eb91475cd3d00056463729d98a040e55`: none found.
- Candidate and workflow objects: present.
- Workflow direct descent from assigned candidate: verified.
- Candidate worktree `C:\dev\mtgSiteWIP-crit001-vm526-naya` had modified marks for `data/placement-model.json`, `data/placement-model.schema.json`, `docs/audits/gate-compression/live-gate-bias.json`, `docs/audits/gate-compression/live-gate-bias.md`, and `supabase/functions/guild-recruiter/faction-context.ts`; `git diff` showed line-ending warnings only and no content diff.
- No uncommitted candidate-worktree content was required for review qualification or tests.
- Protected worktrees, original main, Table Talk baseline, DRIFT-017 prototype, historical/debug/archive exclusions, Excel, VM-527, push, PR, and merge were untouched.

## Governing Authority Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/kanban/done/DRIFT-020-jund-preview-candidate-scope.md`
- DRIFT-020 review and certification handoffs
- VM-522, VM-523, VM-524, and VM-525 review/certification precedents as needed
- `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- VM-526 card and board state
- Committed candidate-scope validator and semantic-readiness tests
- Naya raw claims, profile, placement, fixtures, generated data, provenance, source ledger, and canonical alias authority

## Complete Ancestry

Parent list:

- `813c42c63a56648029c7452d2619cdaf60432b5a` parent `7964b93f531017e579f069e6941463f53eab4bd9` - `VM-526: record Naya drift preflight`
- `b03574cc853a4456eabbaeca113260e84f3bda2a` parent `813c42c63a56648029c7452d2619cdaf60432b5a` - `VM-526: record Naya Gate 1+2 audit`
- `57ce7161c1ff8736a8b91a6564fa97129fe38383` parent `b03574cc853a4456eabbaeca113260e84f3bda2a` - `VM-526: create Naya semantic candidate`
- `f3dda547eb91475cd3d00056463729d98a040e55` parent `57ce7161c1ff8736a8b91a6564fa97129fe38383` - `VM-526: assign Naya guidance provenance owners`
- `cdcd1b408a64dacb63e75865c519ca317ce0e08a` parent `f3dda547eb91475cd3d00056463729d98a040e55` - `VM-526: record Naya semantic candidate workflow`

Base-to-candidate commit list:

- `813c42c63a56648029c7452d2619cdaf60432b5a`
- `b03574cc853a4456eabbaeca113260e84f3bda2a`
- `57ce7161c1ff8736a8b91a6564fa97129fe38383`
- `f3dda547eb91475cd3d00056463729d98a040e55`

Candidate-to-workflow commit list:

- `cdcd1b408a64dacb63e75865c519ca317ce0e08a`

Gate 1+2 governance is an ancestor of the assigned candidate. The superseded candidate is a direct ancestor, remains recorded and unapproved/uncertified, and was superseded because seven recruiter guidance provenance owners had null canonical IDs. The assigned candidate adds exact owner canonical IDs to `data/raw-factions/naya/naya.placement.json` and `data/semantic-readiness-provenance.json`, incorporating the valid semantic work while repairing the provenance-owner defect.

## Candidate Diff

Exact range reviewed: `7964b93f531017e579f069e6941463f53eab4bd9..f3dda547eb91475cd3d00056463729d98a040e55`.

Total actual diff: 11 files, 1485 insertions, 46 deletions.

Semantic candidate files reported by workflow: 6 files, 927 insertions, 39 deletions.

Per-file classification:

- `data/raw-factions/naya/naya.claims.json` - NAYA authoritative claims, 221 insertions / 11 deletions
- `data/raw-factions/naya/naya.profile.json` - NAYA authoritative profile, 15 insertions / 8 deletions
- `data/raw-factions/naya/naya.placement.json` - NAYA authoritative placement / recruiter guidance, 110 insertions / 2 deletions
- `research/fixtures/semantic-readiness/naya.semantic-fixtures.json` - NAYA fixture, 253 insertions / 0 deletions
- `data/factions.json` - NAYA generated consumer, 4 insertions / 2 deletions
- `data/semantic-readiness-provenance.json` - NAYA provenance, 324 insertions / 16 deletions
- `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md` - governance, 230 insertions / 0 deletions
- `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md` - governance, 313 insertions / 0 deletions
- `docs/handoffs/HANDOFF_INDEX.md` - governance, 2 insertions / 0 deletions
- `docs/kanban/board.md` - governance, 2 insertions / 2 deletions
- `docs/kanban/{backlog => in-progress}/VM-526-naya-semantic-recovery.md` status move from backlog to in-progress - governance, 11 insertions / 5 deletions

Unexpected unrelated paths: none. Cross-identity semantic paths: none. Candidate-scope infrastructure paths: none. Root metadata or preview paths: none. The committed validator explicitly allows `docs/` paths in identity-candidate ranges, so the governance-in-range paths are permitted by current authority and are separated by commit ancestry from semantic candidate data.

## Candidate and Workflow Separation

Exact workflow range reviewed: `f3dda547eb91475cd3d00056463729d98a040e55..cdcd1b408a64dacb63e75865c519ca317ce0e08a`.

Workflow diff is governance-only:

- `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/{in-progress => ready}/VM-526-naya-semantic-recovery.md` moved from in-progress to ready

No Naya authoritative source, generated data, fixture, provenance, validator, test, schema, package, lockfile, CI, parser, placement implementation, faction-context implementation, or runtime identity logic changed after the assigned candidate.

## Claim and Source Review

- Raw claims reviewed: 10
- Final substantive claims: 10
- Remaining discovery/support/unclassified claims: 0
- Sources: 16 total
- Claim-bearing sources: 3
- Shaping-only sources: 6
- Support-only sources: 7

All 10 claims are source-bounded, role-valid, and specific enough for Naya after review. `source_ids` match `evidence_locations[].source_id` for every claim. The claim-bearing sources are the Naya evidence ledger, the official Mark Rosewater Naya article capture, and the three-color canon inventory audit. Shaping-only and support-only sources are not promoted into substantive claim authority. The manual-fill evidence ledger rows explicitly defer geography, named figures, religion, power-5/big-matters, post-Conflux/Phyrexian, Commander products, and unsupported details.

Source-locator review passed. The official Naya article capture supports Naya as the red-green-white Alara shard, Green as center, life as part of a larger natural whole, White larger-picture duty/care, Red feral instinct/loyalty/bond, and Blue/Black absence boundaries. No claim overstates the source material.

## Semantic Boundary Review

Naya's positive discriminator is Green-centered living abundance, nature, growth, ecosystem belonging, White protective care, and Red instinct/bond. Generic big creatures, tokens, battlecruiser play, Commander support, or color-composition labels alone are not treated as Naya-specific evidence.

Boundary conclusions:

- Bant: pass; Naya does not collapse into public honor, hierarchy, or Blue refinement.
- Jund: pass; Naya does not inherit appetite, consumption, or self-interested survival as identity center.
- Gruul: pass; Naya's instinct remains tied to White care and Green belonging rather than anti-civilization pressure.
- Selesnya: pass; Naya avoids pure collective harmony by preserving Red instinct/bond.
- Boros: pass; Naya avoids coordinated order/action as its center.
- Other shards/clans and generic Commander: pass; fixture exclusions cover generic RGW, Bant, Jund, Selesnya, Gruul, Boros, Grixis, Esper, Abzan, and Temur.

No material neighbor collapse or generic-WRG overfit remains.

## Placement, Frozen Fields, and Preview

`data/raw-factions/naya/naya.placement.json` changes `last_updated`, adds `profile_id`, and adds seven `semantic_guidance_evidence` entries with non-null canonical owner IDs. It does not change placement weights, rankings, calibration, scoring, native IDs, lateral targets, golden paths, or existing collision guidance. Frozen-field impact: none.

`data/raw-factions/naya/naya.profile.json` updates `last_updated` and adds canonical IDs for site surface, core identity, structure, great tension, Jund relation, Bant relation, and data-quality sections.

Preview review passed. `data/identity-layers.json` is absent from the candidate diff, `expressions.NAYA.preview_text` is unchanged, no other identity preview changed, and no root identity-layer metadata changed.

## Fixture Review

`research/fixtures/semantic-readiness/naya.semantic-fixtures.json` is new and contains 13 fixtures: core inclusion, mature/pressure, nearest collision, nine required neighbor exclusions, and provenance. The fixture set tests discriminative Naya meaning rather than generic WRG behavior and does not embed stale superseded-candidate content.

Authoritative fixture validation: `node research\validate-semantic-readiness.mjs --fixtures --targets=NAYA` exited 0 in the review worktree and in the exact-candidate detached worktree.

## Generated and Provenance Review

`data/factions.json` changes only NAYA generated embedded relationship IDs for Jund/Bant. No other identity semantic value changed.

`data/semantic-readiness-provenance.json` contains 34 NAYA entries, 0 null `canonical_id` values, 0 missing required `canonical_content_hash` values, and valid generated consumer links. There is no stale superseded-candidate value in the reviewed candidate tree.

## Candidate-Scope Validation

Positive exact candidate command:

`node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=NAYA`

Result: exit 0, semantic candidate scope passed for `NAYA`.

Negative behavior:

- `--identity=WRG`: exit 1, unknown identity
- `--identity=RGW`: exit 1, unknown identity
- `--identity=GRW`: exit 1, unknown identity
- `--identity=NOT_A_REAL_IDENTITY`: exit 1, unknown identity
- Neighbor target `--identity=JUND`: exit 1, rejects Naya raw paths, Naya fixture, generated Naya data, and semantic provenance as out of scope for Jund
- `node research\semantic-candidate-scope-tests.js`: exit 0, covering cross-identity raw/generated changes, multiple preview changes, mixed allowed/disallowed changes, unauthorized additions, deletions, whole-object replacement, root metadata, formatting, key ordering, and structural bypass cases

## Regression Validation

Review worktree results:

- `git diff --check 7964b93f531017e579f069e6941463f53eab4bd9 f3dda547eb91475cd3d00056463729d98a040e55`: exit 0
- `node research\audit-semantic-readiness.mjs --targets=NAYA`: exit 0
- `node research\validate-semantic-readiness.mjs --targets=NAYA`: exit 0
- `node research\validate-semantic-readiness.mjs --fixtures --targets=NAYA`: exit 0
- `npm.cmd run test:placement`: exit 0
- `npm.cmd run test:parser`: exit 0
- `npm.cmd run test:faction-context-isolation`: exit 0
- `node research\validate-source-generated-guardrails.mjs --targets=NAYA`: exit 0 with inherited model-owned inhibitor warning
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=NAYA`: exit 0
- `node research\semantic-candidate-scope-tests.js`: exit 0
- `npm.cmd test`: exit 0
- `npm.cmd run test:semantic-readiness`: initially exited 1 at byte-strict provenance check in the review checkout due line endings; exact-tree normalized rerun passed with no substantive diff

Exact-candidate detached worktree:

- Path: `C:\Users\obake\AppData\Local\Temp\naya-review-f3dda-20260722074025`
- Creation method: `git worktree add --detach C:\Users\obake\AppData\Local\Temp\naya-review-f3dda-20260722074025 f3dda547eb91475cd3d00056463729d98a040e55`
- Exported SHA: `f3dda547eb91475cd3d00056463729d98a040e55`
- Dependency command: `npm.cmd ci`
- Lockfile: committed `package-lock.json` used; no package or lockfile changes committed
- Ignored Scryfall corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`
- Ignored hardlink target: `C:\Users\obake\AppData\Local\Temp\naya-review-f3dda-20260722074025\data\scryfall\raw\oracle-cards.json`
- Ignored input justification: parser/full tests require the local Scryfall corpus; it is ignored and was not staged or committed

Exact-tree results:

- `npm.cmd ci`: exit 0
- `npm.cmd test`: exit 0
- Exact candidate-scope validation for `NAYA`: exit 0
- `node research\validate-semantic-readiness.mjs --targets=NAYA`: exit 0
- `node research\validate-semantic-readiness.mjs --fixtures --targets=NAYA`: exit 0
- `node research\validate-source-generated-guardrails.mjs --targets=NAYA`: exit 0 with inherited warning
- `npm.cmd run test:faction-context-isolation`: exit 0
- `npm.cmd run test:semantic-readiness`: initial exit 1 at byte-strict provenance check; after `node research\build-semantic-readiness-provenance.mjs`, diff showed line-ending warnings only and rerun exited 0
- `npm.cmd run build:factions`: exit 0
- `node research\build-semantic-readiness-provenance.mjs --check`: exit 0 after generator normalization

Exact-tree final status after tests/build showed modified marks for generated and audit files, but `git diff`/stat/name-status showed line-ending warnings only and no content diff. No substantive tracked content was required for passing results.

## Inherited Warning Assessment

Warning text:

`inhibitor_traps[model_owned]: One inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text. {"model_owned_entry":"Mistakes control, extraction, or isolated scale for belonging when the living whole asks for protective instinct and care."}`

Exact Git evidence:

- At program base `7964b93f531017e579f069e6941463f53eab4bd9`, the string exists in `data/placement-model.json` and `supabase/functions/guild-recruiter/faction-context.ts`.
- At assigned candidate `f3dda547eb91475cd3d00056463729d98a040e55`, the same string exists at the same generated surfaces.
- The candidate does not change the affected generated inhibitor surface or Naya inhibitor source text.

Disposition: NAYA-owned, inherited, disclosed by `node research\validate-source-generated-guardrails.mjs --targets=NAYA`, non-blocking because the command exits 0, no readiness test is skipped, and the exact candidate's claims/fixtures/provenance remain valid.

## Line-Ending and Dirty-Worktree Assessment

Candidate-worktree dirty paths were `data/placement-model.json`, `data/placement-model.schema.json`, `docs/audits/gate-compression/live-gate-bias.json`, `docs/audits/gate-compression/live-gate-bias.md`, and `supabase/functions/guild-recruiter/faction-context.ts`. The review worktree after full tests showed only audit report modified marks. The exact detached worktree after generator/test execution showed generated/audit/runtime modified marks. In every inspected case, `git diff`, `git diff --stat`, and `git diff --name-status` produced only line-ending warnings and no content diff.

Conclusion: line-ending behavior is environmental and non-material. The reviewer reproduced required passes from committed objects only; no uncommitted candidate-worktree content, no DRIFT-017 code, and no ignored corpus file was committed.

## Security and Failure-Mode Review

Candidate-scope false-positive, alias expansion, cross-identity contamination, multiple-preview, mixed-change, added-field, deleted-object, whole-object, root-metadata, formatting, key-order, and structural-bypass risks are covered by the committed regression suite and passed. Unsupported-claim, incorrect-locator, evidence-classification, generic-WRG overfit, neighbor-collapse, generated/source divergence, provenance-owner, missing-ID, missing-hash, fixture drift, placement drift, parser regression, faction-context regression, line-ending, and exact-tree reproducibility risks were reviewed with no approval-blocking findings.

## Independent Review Matrix

| Control | Area | Requirement | Evidence | Result | Severity | Blocking | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IR-001 | Exact objects | Program base, candidate, workflow verified | Git object and parent checks | PASS | CRITICAL | No | Exact SHA separation preserved |
| IR-002 | Ancestry | Complete base-to-candidate and candidate-to-workflow chain reconstructed | Parent list and commit lists | PASS | CRITICAL | No | Superseded candidate preserved |
| IR-003 | Diff scope | Complete candidate diff reviewed | 11 actual paths, 6 semantic candidate paths | PASS | CRITICAL | No | Docs paths permitted by validator |
| IR-004 | Workflow separation | Post-candidate diff governance-only | `f3dda..cdcd` inspection | PASS | CRITICAL | No | No semantic post-candidate changes |
| IR-005 | Claims | All substantive Naya claims supported | 10 claim review | PASS | CRITICAL | No | 0 discovery/support/unclassified remaining |
| IR-006 | Sources | Source roles and locators correct | 16-source inventory | PASS | MAJOR | No | Shaping/support not promoted |
| IR-007 | Boundaries | Naya discriminative against neighbors/generic WRG | Fixture and source review | PASS | CRITICAL | No | No material collapse |
| IR-008 | Placement | Frozen fields preserved | Placement diff review | PASS | CRITICAL | No | Guidance evidence only |
| IR-009 | Preview | No preview/root metadata change | Candidate diff | PASS | MAJOR | No | `data/identity-layers.json` absent |
| IR-010 | Fixtures | Naya fixtures valid | Fixture validation exit 0 | PASS | MAJOR | No | 13 fixtures |
| IR-011 | Generated/provenance | Generated Naya data matches source and provenance complete | 34 entries, 0 null IDs, 0 missing hashes | PASS | CRITICAL | No | No other identity semantic value changed |
| IR-012 | Candidate scope | Exact NAYA range passes and aliases fail | Positive/negative commands | PASS | CRITICAL | No | WRG/RGW/GRW rejected |
| IR-013 | Synthetic regressions | Bypass and mixed-change probes fail correctly | `semantic-candidate-scope-tests.js` exit 0 | PASS | CRITICAL | No | Covers structural/format/key-order cases |
| IR-014 | Tests | Readiness, placement, parser, faction-context, full tests pass | Review and exact-tree commands | PASS | CRITICAL | No | Line-ending-only initial semantic suite caveat reconciled |
| IR-015 | Inherited warning | Warning independently proven non-blocking | Base/candidate grep and guardrail exit 0 | PASS | MINOR | No | Existing generated inhibitor warning |
| IR-016 | Reproducibility | Exact tree passes without uncommitted content | Detached worktree results | PASS | CRITICAL | No | Ignored Scryfall hardlink disclosed |
| IR-017 | Governance | No remediation/replacement/certification occurred | Status/diff inspection | PASS | CRITICAL | No | Review governance only |

Totals: PASS 17, FAIL 0, UNKNOWN 0, N/A 0.

Severity totals: CRITICAL 13, MAJOR 3, MINOR 1, INFORMATIONAL 0.

Approval-blocking findings: none.

## Files Reviewed

See sections above for governing documents, Git objects, Naya source/generated/fixture/provenance files, validator/test files, and review commands. The exact candidate tree and workflow tree were both inspected.

## Files Changed

- `docs/handoffs/2026-07-22-0746-codex-vm526-naya-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/ready/VM-526-naya-semantic-recovery.md`
- `docs/kanban/board.md`

## What Changed

Recorded the independent exact-SHA approval decision, updated the handoff index, and moved VM-526 governance state to independent review approved / certification-only next.

## Why It Changed

The assigned candidate passed independent exact-SHA review with zero approval-blocking failures or unknowns.

## Decisions Made

Approve only exact SHA `f3dda547eb91475cd3d00056463729d98a040e55` for VM-526 Naya. Do not certify Naya in this task.

## Risks / Uncertainties

The inherited NAYA inhibitor warning remains NAYA-owned but non-blocking under current guardrail behavior because the command exits 0, the string exists at the program base, and the candidate does not change that surface. Windows line-ending behavior can produce modified marks after generator/test runs; content diffs remained empty.

## Tests Run

See Regression Validation. Key results: candidate scope PASS for `NAYA`, alias/neighbor/unknown negative checks PASS, candidate-scope regression suite PASS, NAYA readiness and fixtures PASS, placement PASS, parser PASS, faction-context isolation PASS, source/generated guardrails PASS with inherited warning, exact-tree `npm.cmd test` PASS, exact-tree generator/provenance reconciliation PASS after line-ending-only normalization.

## Not Touched

No Naya remediation, source edit, generated edit, fixture edit, provenance edit, validator/test edit, package/lockfile edit, dependency artifact commit, ignored corpus commit, replacement candidate, certification, program-base advancement, VM-527 work, Excel edit, original-main edit, protected-worktree edit, DRIFT-017 use, historical/debug/archive edit, Table Talk edit, push, merge, or PR occurred.

## Follow-Up Recommendations

Proceed only to a separate certification-only task that verifies this exact approval line and certifies exact candidate `f3dda547eb91475cd3d00056463729d98a040e55` if campaign control authorizes it. Do not begin VM-527 until Naya certification is completed in a later authorized task.

## Next Suggested Agent

Certification-only agent for VM-526 Naya, after external campaign authorization.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/ready/VM-526-naya-semantic-recovery.md`
- `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`

APPROVE EXACT SHA f3dda547eb91475cd3d00056463729d98a040e55
