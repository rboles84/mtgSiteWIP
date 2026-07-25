# VM-536 Witch Independent Exact-SHA Review

Agent name: Codex

Task requested: Perform an independent review-only pass for VM-536 Witch exact semantic candidate using the existing review worktree.

Ticket: VM-536

Identity: WITCH / Witch / Growth

Exact program base SHA: fa88363b7a09ed326a0f15484388e7f2b8fce9ef

Gate 1+2 governance SHA: b16e8f60c73e868fee628f3510cdd1aa670cdfc0

Superseded candidate SHA: 96f8ee3259a5010e96ba92aea35ae271eb692ac8

Final candidate SHA reviewed: acaf51a4f7e11d73b59fcc61397dcab2cb39e490

Candidate-workflow SHA: f654abd2ad52ae41571e6b476bc26a87e90de514

Review branch: codex/vm-536-witch-independent-review

Review worktree: C:\dev\mtgSiteWIP-crit001-vm536-witch-independent-review

Files reviewed: `AGENTS.md`; `docs/handoffs/HANDOFF_INDEX.md`; `docs/handoffs/2026-07-24-1744-codex-vm536-witch-gate1-gate2.md`; `docs/handoffs/2026-07-24-1801-codex-vm536-witch-candidate-workflow.md`; `docs/handoffs/2026-07-24-1519-codex-vm535-ink-independent-review.md`; `docs/kanban/board.md`; `docs/kanban/in-progress/VM-536-witch-semantic-recovery.md`; `docs/incidents/CRIT-001-drift-control-template.md`; WITCH raw packet, generated data, semantic provenance, and semantic fixtures.

Files changed: this handoff and `docs/handoffs/HANDOFF_INDEX.md` only.

Parent and ancestry proofs:
- `codex/crit001-program-base` = `fa88363b7a09ed326a0f15484388e7f2b8fce9ef`.
- Review worktree starting `HEAD` = `f654abd2ad52ae41571e6b476bc26a87e90de514`.
- `merge-base --is-ancestor acaf51a4f7e11d73b59fcc61397dcab2cb39e490 f654abd2ad52ae41571e6b476bc26a87e90de514` exited 0.
- `b16e8f60c73e868fee628f3510cdd1aa670cdfc0^` = `fa88363b7a09ed326a0f15484388e7f2b8fce9ef`.
- `96f8ee3259a5010e96ba92aea35ae271eb692ac8^` = `b16e8f60c73e868fee628f3510cdd1aa670cdfc0`.
- `acaf51a4f7e11d73b59fcc61397dcab2cb39e490^` = `96f8ee3259a5010e96ba92aea35ae271eb692ac8`.
- `f654abd2ad52ae41571e6b476bc26a87e90de514^` = `acaf51a4f7e11d73b59fcc61397dcab2cb39e490`.

Candidate file list reviewed:
- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/witch/witch.changelog.json`
- `data/raw-factions/witch/witch.claims.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/witch.semantic-fixtures.json`

Candidate/workflow separation: PASS. The exact final candidate diff from Gate 1+2 changes only the eight expected WITCH semantic/generated/fixture/provenance files. The program-base-to-candidate diff includes earlier Gate 1+2 governance by ancestry. The candidate-workflow commit changes governance files only. No semantic files changed after `acaf51a4f7e11d73b59fcc61397dcab2cb39e490`, no remediation happened in this review window, and no certification happened.

Superseded candidate control: PASS. `96f8ee3259a5010e96ba92aea35ae271eb692ac8` is recorded as superseded and was not approved or rejected as the disposition target.

Semantic review: PASS. WITCH remains canonical with display name `Witch / Growth`, display color order `GWUB`, and accepted aliases exactly `["WITCH"]`. The final candidate records 5 substantive WITCH claims, bounded evidence locators, 13 sources in the audit surface, 37 semantic fixtures, 12 WITCH provenance rows, zero null canonical IDs, and zero null canonical hashes. WITCH-owned collision proof chains use only `witch_claim_0003` and `witch_claim_0005` for INK/YORE separators.

Alias, boundary, and preview review: PASS. `GWUB`, `WUBG`, and all 24 same-color permutations are metadata/query-only and non-canonical; the raw packet also lists lowercase metadata forms. Required rejection fixtures cover WU, UB, BG, WG, UG, WB, BANT, ESPER, SULTAI, ABZAN, YORE, GLINT, DUNE, INK, GENERIC_GWUB, GENERIC_FOUR_COLOR_COMMANDER, GENERIC_COUNTERS, GENERIC_PROLIFERATE, GENERIC_ATRAXA, INFECT_ONLY, SUPERFRIENDS_ONLY, PHYREXIA_ONLY, WITCH_MAW_ONLY, BREED_LETHALITY_ONLY, GROWTH_ONLY, COMMANDER_LEGALITY, OFFICIAL_NAME, and RED_PRESENT_COLLAPSE. Raw preview remains disabled through raw profile/search metadata and placement quality; `data/identity-layers.json` was not changed, and embedded generated preview text still matches the identity-layer preview.

Drift scorecard for independent review:
- Correct branch and program base: PASS.
- One identity active: PASS.
- Source hierarchy explicit: PASS.
- Generic color-pair overfit checked: PASS.
- Required neighbors checked: PASS.
- Claim roles complete: PASS.
- Evidence scopes complete: PASS.
- Discovery/support isolated: PASS.
- Canonical IDs/hashes valid: PASS.
- Exact fixture/provenance parity: PASS with CRLF-only byte warning; normalized parity passed with 2066 entries.
- Frozen confidence/calibration/native IDs/lateral and collision targets: PASS through exact candidate-scope validation.
- Public/recruiter copy aligned: PASS through source/generated and faction-context isolation checks.
- No unrelated identity drift: PASS.
- Deterministic generation: PASS normalized provenance parity; byte check warning is line-ending-only.
- Candidate scope passes exact SHA: PASS.
- Superseded candidates recorded: PASS.
- Review uses exact candidate SHA: PASS.
- Certification uses exact approved SHA: N/A; no certification performed.
- Governance-only workflow/review/certification commits: PASS for workflow and review; certification N/A.
- Dirty-worktree baseline excluded: PASS; audit byproducts, `node_modules/`, and ignored Scryfall hardlink left unstaged.
- External tracker matches repository: N/A; Excel/external tracker not updated by Codex.

Validation commands and results:
- `npm.cmd ci`: PASS.
- `npm.cmd test`: first run blocked by missing ignored Scryfall corpus; PASS after adding ignored hardlink `data/scryfall/raw/oracle-cards.json` from the control repository.
- `node research\validate-semantic-readiness.mjs --targets=WITCH --fixtures`: PASS.
- `npm.cmd run validate:source-generated -- --target=WITCH`: PASS, 0 warnings.
- `npm.cmd run build:semantic-provenance -- --check`: byte-strict FAIL because checked-in provenance is CRLF and builder renders LF.
- Normalized provenance parity probe: PASS, 2066 entries, normalized content equal.
- `npm.cmd run audit:semantic-readiness -- --targets=WITCH`: PASS; reports 5 substantive claims, 13 sources, 12 reference sites, INK/YORE neighbors, and no missing references.
- `npm.cmd run test:faction-context-isolation -- --identity=WITCH`: PASS.
- `npm.cmd run test:parser`: PASS, 226 parser cases.
- `npm.cmd run test:placement`: PASS, 37 factions / 37 golden paths.
- `node research\semantic-candidate-scope-tests.js`: PASS.
- `node research\validate-semantic-candidate-scope.mjs --identity=WITCH --base=b16e8f60c73e868fee628f3510cdd1aa670cdfc0 --target=acaf51a4f7e11d73b59fcc61397dcab2cb39e490`: PASS.
- Alias, neighbor, collision, and preview invariant probe: PASS.
- `npm.cmd run test:semantic-readiness`: contract, candidate-scope, and fixture portions PASS; final byte-strict provenance step fails with the same CRLF-only stale warning.

Approval rationale: The exact final candidate is WITCH-only, preserves candidate/workflow separation, repairs the superseded candidate's null native provenance IDs, keeps all aliases fail-closed except WITCH, keeps color-order permutations metadata-only, preserves preview-source boundaries, uses WITCH-owned collision evidence, and passes required semantic, scope, parser, placement, source/generated, and isolation validations. The only warning is a Windows line-ending byte mismatch in generated provenance; normalized generated truth matches repository content.

No remediation performed: confirmed.

No certification performed: confirmed.

Program base unchanged: `fa88363b7a09ed326a0f15484388e7f2b8fce9ef`.

VM-537 and VM-538 untouched: confirmed backlog/not started and excluded from candidate/review work.

Excel not updated by Codex: confirmed.

Unstaged byproducts:
- `docs/audits/gate-compression/live-gate-bias.md` and `.json`: modified by `npm.cmd test` with no content diff; left unstaged.
- Ignored `node_modules/`: created by `npm.cmd ci`; left unstaged.
- Ignored `data/scryfall/raw/oracle-cards.json`: local hardlink added for validation; left unstaged.

Warnings:
- Git repeatedly warned that `C:\Users\obake/.config/git/ignore` could not be accessed due permission denial.
- Provenance byte-strict checks report stale in this Windows review worktree; normalized parity passes.

Not touched: No semantic edits, replacement candidate, certification, program-base advancement, Excel update, VM-537 Colorless work, VM-538 WUBRG work, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

Follow-up recommendations: Proceed to a separate certification-only window for exact SHA `acaf51a4f7e11d73b59fcc61397dcab2cb39e490` if this review commit is accepted. Keep the superseded candidate recorded and unapproved.

Next suggested agent: Certification-only agent for VM-536 Witch.

Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-536-witch-semantic-recovery.md`; `docs/incidents/CRIT-001-drift-control-template.md`; `docs/handoffs/2026-07-24-1744-codex-vm536-witch-gate1-gate2.md`; `docs/handoffs/2026-07-24-1801-codex-vm536-witch-candidate-workflow.md`.

APPROVE EXACT SHA acaf51a4f7e11d73b59fcc61397dcab2cb39e490
