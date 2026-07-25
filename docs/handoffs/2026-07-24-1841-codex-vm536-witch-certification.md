# VM-536 Witch Certification

Agent name: Codex

Task requested: Certify VM-536 Witch semantic recovery from the existing certification worktree after exact independent approval.

Related Kanban card: VM-536 - Witch Semantic Recovery

Certification branch: codex/vm-536-witch-certification

Certification worktree: C:\dev\mtgSiteWIP-crit001-vm536-witch-certification

Starting HEAD: 5a5291f50fc90cfc3f3592e53cb7ae9907b57309

## Certification Decision

CERTIFIED EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490

## Authority Checked

- Program-base branch before certification: `fa88363b7a09ed326a0f15484388e7f2b8fce9ef`
- Required independent review commit: `5a5291f50fc90cfc3f3592e53cb7ae9907b57309`
- Review parent: `f654abd2ad52ae41571e6b476bc26a87e90de514`
- Candidate-workflow commit: `f654abd2ad52ae41571e6b476bc26a87e90de514`
- Candidate-workflow descends from final approved candidate: PASS
- Approved candidate descends from current program base: PASS
- Exact review approval line found: `APPROVE EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490`
- Superseded candidate `96f8ee3259a5010e96ba92aea35ae271eb692ac8` remains recorded and was not certified.
- Approved SHA exactly matched the final WITCH candidate SHA: PASS

## Object Chain

- Program base / VM-535 certification: `fa88363b7a09ed326a0f15484388e7f2b8fce9ef`
- VM-536 Gate 1+2 governance: `b16e8f60c73e868fee628f3510cdd1aa670cdfc0`
- Superseded WITCH candidate: `96f8ee3259a5010e96ba92aea35ae271eb692ac8`
- Exact WITCH semantic candidate: `acaf51a4f7e11d73b59fcc61397dcab2cb39e490`
- Candidate-workflow governance: `f654abd2ad52ae41571e6b476bc26a87e90de514`
- Independent-review governance: `5a5291f50fc90cfc3f3592e53cb7ae9907b57309`
- Certification governance: `PENDING_VM536_CERTIFICATION_COMMIT_SHA` in tracked files; actual SHA recorded in final task output
- New program base: intended to become the actual VM-536 certification commit by exact old-value `update-ref`

## Files Reviewed

- AGENTS.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/handoffs/2026-07-24-1744-codex-vm536-witch-gate1-gate2.md
- docs/handoffs/2026-07-24-1801-codex-vm536-witch-candidate-workflow.md
- docs/handoffs/2026-07-24-1820-codex-vm536-witch-independent-review.md
- docs/handoffs/2026-07-24-1724-codex-vm535-ink-certification.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-536-witch-semantic-recovery.md
- docs/incidents/CRIT-001-drift-control-template.md
- docs/incidents/CRIT-001-drift-register.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- data/factions.json
- data/placement-model.json
- data/raw-factions/witch/witch.claims.json
- data/raw-factions/witch/witch.profile.json
- data/raw-factions/witch/witch.placement.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/witch.semantic-fixtures.json

## Files Changed

- docs/handoffs/2026-07-24-1841-codex-vm536-witch-certification.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/incidents/CRIT-001-drift-register.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/incidents/recoveries/VM-536-witch-semantic-recovery.md
- docs/kanban/board.md
- docs/kanban/done/VM-536-witch-semantic-recovery.md
- docs/kanban/in-progress/VM-536-witch-semantic-recovery.md (moved to Done)

## What Changed

Recorded certification governance only. VM-536 moved from exact approved WITCH candidate to certified semantically ready. Certified count advances from 34 of 37 to 35 of 37, and Wave 5 advances from 4 of 5 to 5 of 5 complete. The certification commit is intended to become the new local `codex/crit001-program-base` after commit and exact old-value protected ref update.

## Why It Changed

The exact candidate `acaf51a4f7e11d73b59fcc61397dcab2cb39e490` received independent exact-SHA approval and passed certification validation. CRIT-001 requires a separate governance-only certification commit before the program base can advance.

## Validation Results

- `npm.cmd ci`: PASS, exit 0.
- `npm.cmd test`: initial run failed only because ignored `data/scryfall/raw/oracle-cards.json` was missing; PASS after adding the ignored hardlink to `C:\dev\mtgSiteWIP\data\scryfall\raw\oracle-cards.json`.
- `node research\validate-semantic-readiness.mjs --targets=WITCH --fixtures`: PASS, exit 0.
- `npm.cmd run validate:source-generated -- --target=WITCH`: PASS, exit 0, 0 warnings.
- `npm.cmd run test:faction-context-isolation -- --identity=WITCH`: PASS, exit 0.
- `npm.cmd run test:parser`: PASS, exit 0, 226 parser cases passed.
- `npm.cmd run test:placement`: PASS, exit 0, 37 factions and 37 golden paths passed.
- `node research\semantic-candidate-scope-tests.js`: PASS, exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=WITCH --base=b16e8f60c73e868fee628f3510cdd1aa670cdfc0 --target=acaf51a4f7e11d73b59fcc61397dcab2cb39e490`: PASS, exit 0.
- `npm.cmd run audit:semantic-readiness -- --targets=WITCH`: PASS, exit 0; reports 5 substantive claims, 13 sources, 12 reference sites, 12 WITCH provenance rows by generated truth, and no missing references.
- `npm.cmd run build:semantic-provenance -- --check`: byte-for-byte FAIL, exit 1, due CRLF normalization only.
- Normalized provenance parity check: PASS, 2066 entries.
- `npm.cmd run test:semantic-readiness`: readiness, candidate-scope, and fixture portions PASS; final byte-strict provenance step reports the same CRLF-only stale warning.
- Alias/permutation probes: PASS; WITCH remains the only accepted alias, while GWUB, WUBG, and all 24 same-color permutations remain metadata-only and non-canonical.
- Required neighbor rejection probes: PASS; 28 WITCH rejection fixtures present.
- Preview invariant: PASS; raw preview remains disabled and identity-layer/generated preview parity remains intact.

## Decisions Made

- Certified only exact candidate `acaf51a4f7e11d73b59fcc61397dcab2cb39e490`.
- Preserved superseded candidate `96f8ee3259a5010e96ba92aea35ae271eb692ac8` as unapproved and uncertified.
- Preserved candidate/workflow/review/certification/program-base object separation.
- Treated the CRLF-only provenance byte mismatch as non-blocking because LF-normalized builder output matched the committed manifest.
- Left validation byproducts unstaged because they showed no content diff beyond line-ending/stat noise.
- Left VM-537 Colorless and VM-538 WUBRG backlog/not started and untouched.
- Did not update Excel.

## Risks / Uncertainties

- Ignored local validation artifacts `node_modules/` and `data/scryfall/raw/oracle-cards.json` are present and must not be staged.
- Full test touched gate-bias audit files as CRLF/stat-only byproducts with no content diff.
- Git repeatedly warned that `C:\Users\obake/.config/git/ignore` could not be accessed due permission denial.

## Not Touched

No implementation remediation, independent review, replacement candidate, WITCH semantic candidate file edit, generated semantic data edit, fixture edit, provenance source edit, recruiter edit, identity-layer edit, preview-source edit, package/lockfile edit, VM-537 Colorless work, VM-538 WUBRG work, Excel update, GitHub remote authority, push, PR, merge, rebase, cherry-pick, reset, clean, stash, amend, or force operation occurred.

## Follow-Up Recommendations

After the exact old-value program-base update is complete, VM-537 Colorless remains backlog/not started and should receive a separate committed drift-preflight control record before any Gate 1+2 semantic work.

## Next Suggested Agent

VM-537 drift-preflight agent, only after explicit authorization.

CERTIFIED EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490
