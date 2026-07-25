# VM-538 WUBRG Independent Exact-SHA Review

Agent name: Codex

Task requested: Perform an independent review-only pass for VM-538 WUBRG exact semantic candidate using the existing review worktree.

Ticket: VM-538

Identity: WUBRG / Five-Color / Five-Color / WUBRG

Exact program base SHA: 7f615d4fe5a19cf8f9d2a58a8026f837378c06b2

Gate 1+2 governance SHA: a5e678bea5d92a2addc184e3564d37b7e098140d

Final candidate SHA reviewed: c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b

Candidate-workflow SHA: 54a9f54e13d425e96a5f7a56e40c5b6719438208

Review branch: codex/vm-538-wubrg-independent-review

Review worktree: C:\dev\mtgSiteWIP-crit001-vm538-wubrg-independent-review

Files reviewed: `AGENTS.md`; user-supplied VM-538 review prompt; `docs/handoffs/HANDOFF_INDEX.md`; `docs/handoffs/2026-07-24-2224-codex-vm538-wubrg-gate1-gate2.md`; `docs/handoffs/2026-07-24-2245-codex-vm538-wubrg-candidate-workflow.md`; prior VM-537 Colorless independent review; `docs/kanban/board.md`; `docs/kanban/in-progress/VM-538-wubrg-semantic-recovery.md`; `docs/incidents/CRIT-001-drift-control-template.md`; `docs/incidents/CRIT-001-operating-playbook.md`; `docs/reference/semantic-readiness-contract.md`; `docs/incidents/CRIT-001-identity-recovery-ledger.json`; `docs/incidents/recoveries/VM-538-wubrg-semantic-recovery.md`; the exact WUBRG candidate diff; WUBRG raw claims, sources, profile, placement, changelog, generated faction data, generated placement model, semantic provenance, semantic fixtures, identity-layer registry, source/generated guardrails, faction-context isolation controls, and validation tooling.

Files changed: this review handoff and `docs/handoffs/HANDOFF_INDEX.md` only.

## Pre-Flight Summary

Recent related work: VM-537 Colorless is certified at program base `7f615d4fe5a19cf8f9d2a58a8026f837378c06b2`, leaving WUBRG as the only uncertified identity. VM-538 Gate 1+2 recorded a read-only WUBRG baseline with 8 unclassified claims, 19 sources with missing `WUBRG-LOCAL-002`, 13 provenance rows, 3 null canonical IDs, no fixtures, missing guidance mappings, and three foreign Colorless collision claims. VM-538 candidate workflow then recorded exact candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b` and workflow commit `54a9f54e13d425e96a5f7a56e40c5b6719438208`.

Current known risks: endpoint overfit around generic five-color Commander, goodstuff, access-only, fixing-only, superiority, universal-superset, completion/final-form, official-faction, support-only evidence, five-color Eldrazi/Colorless conflation, public-route expansion, and alias expansion. Windows validation can create CRLF/stat-only byproducts and the ignored Scryfall corpus hardlink.

Relevant decisions already made: canonical code remains `WUBRG`; public label remains `Five-Color`; accepted aliases remain exactly `WUBRG` and `Five-Color`; lowercase/unhyphenated/compact/color-order forms are not public aliases; Home preview remains enabled at order 36; directory links and public-route expansion remain suppressed; `data/identity-layers.json` owns the WUBRG preview expression and must not be edited in this review.

Files recently changed by related work: the final candidate changes exactly nine WUBRG semantic files. The candidate-workflow commit changes governance, ledger, Kanban, recovery, index, and handoff files only.

What should not be touched: no implementation, semantic remediation, certification, program-base advancement, Excel/external tracker update, GitHub remote authority, branch/worktree creation, package or lockfile edit, runtime/recruiter/validator/test/schema edit, public route expansion, or unrelated identity work.

## Parent and Ancestry Proofs

- Control-repository `codex/crit001-program-base` = `7f615d4fe5a19cf8f9d2a58a8026f837378c06b2`.
- Review worktree starting `HEAD` = `54a9f54e13d425e96a5f7a56e40c5b6719438208`.
- `54a9f54e13d425e96a5f7a56e40c5b6719438208^` = `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`.
- `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b^` = `a5e678bea5d92a2addc184e3564d37b7e098140d`.
- `a5e678bea5d92a2addc184e3564d37b7e098140d^` = `7f615d4fe5a19cf8f9d2a58a8026f837378c06b2`.
- Exact post-base sequence is Gate 1+2 governance, final semantic candidate, then candidate-workflow governance. No certification commit exists.

## Candidate File List

- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/wubrg/wubrg.changelog.json`
- `data/raw-factions/wubrg/wubrg.claims.json`
- `data/raw-factions/wubrg/wubrg.placement.json`
- `data/raw-factions/wubrg/wubrg.profile.json`
- `data/raw-factions/wubrg/wubrg.sources.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/wubrg.semantic-fixtures.json`

Candidate isolation: PASS. The Gate 1+2-to-candidate diff is exactly the required nine-file WUBRG semantic scope. `wubrg.sources.json` is authorized because Gate 1+2 proved `WUBRG-LOCAL-002` was referenced by the existing WUBRG packet but absent from the source registry.

Program-base-to-candidate impact: PASS. The total impact from program base to final candidate is the same nine semantic files plus prior Gate 1+2 governance, ledger, Kanban, and handoff records.

Candidate/workflow separation: PASS. Candidate-workflow commit `54a9f54e13d425e96a5f7a56e40c5b6719438208` changes governance, ledger, Kanban, recovery, index, and handoff files only. No semantic, generated, fixture, provenance, recruiter, runtime, package, validator, schema, or test file changed after final candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`. No remediation occurred after the candidate, and no certification occurred.

## Semantic and Boundary Review

Semantic readiness: PASS. The exact final candidate has 8 substantive claims, 20 sources, 21 WUBRG provenance rows, zero null canonical IDs, zero missing hashes, 41 semantic fixtures, and 8 mapped guidance strings. The before/after state matches the requested target: before candidate, 8 unclassified claims, 19 sources with one missing record, 13 provenance rows, 3 null canonical IDs, no fixtures, 0 of 8 guidance mappings, and three foreign Colorless collision claims; after candidate, 8 substantive claims, 20 complete sources, 21 provenance rows, zero null canonical IDs, zero missing hashes, 41 fixtures, 8 of 8 guidance mappings, and WUBRG-owned collision proof.

Source authority and `WUBRG-LOCAL-002`: PASS. `WUBRG-LOCAL-002` exists in `wubrg.sources.json` with source role `shaping-only / discovery-only`, no claim-bearing evidence rows, and discovery rows only. No substantive claim `source_ids` or `evidence_locations` use `WUBRG-LOCAL-002`. The row is required to make the packet source registry complete while preserving non-authoritative treatment.

Claim and provenance chains: PASS. All 8 claims are `substantive_claim`; semantic readiness and fixtures pass; the WUBRG provenance slice has 21 entries, zero null canonical IDs, zero missing hashes, and no Colorless claim references.

Identity, aliases, and color order: PASS. Accepted aliases remain exactly `["WUBRG", "Five-Color"]`. Lowercase `wubrg`, lowercase `five-color`, `Five Color`, and `FiveColor` are rejected public aliases. All 119 noncanonical WUBRG color-order permutations are absent from accepted aliases and fail closed. Exact colors and secondary colors remain `["W", "U", "B", "R", "G"]`; `core_color` and display code remain `WUBRG`.

Endpoint, neighbor, and generic-five-color exclusions: PASS. The fixture set has 41 fixtures, including all 37 required exclusion boundaries: COLORLESS; W, U, B, R, G; YORE, GLINT, DUNE, INK, WITCH; BANT, ESPER, GRIXIS, JUND, NAYA, ABZAN, TEMUR, SULTAI, MARDU, JESKAI; generic five-color Commander, generic goodstuff, all-colors access-only, mana-fixing-only, high-complexity default, endpoint completion, superiority, universal superset, official faction, five-color Eldrazi-as-Colorless proof, Commander support-only, lowercase WUBRG alias, lowercase Five-Color alias, unhyphenated Five Color alias, compact FiveColor alias, and color-order permutation alias.

Collision proof: PASS. The sole canonical inhibiting `COLORLESS/WUBRG` collision uses only WUBRG-owned claims `wubrg_claim_0002`, `wubrg_claim_0007`, and `wubrg_claim_0004`. The WUBRG provenance slice contains zero `colorless_claim_*` references. The candidate removes the earlier three foreign Colorless claim references without changing the canonical pair key or inhibition status.

Preview and public-route invariants: PASS. `data/identity-layers.json` is untouched from Gate 1+2 to candidate. Its WUBRG expression equals the embedded `data/factions.json` expression. Home preview remains order 36. Directory links remain suppressed and no public-route expansion occurred.

Frozen placement controls: PASS. The generated WUBRG placement retains 21 lateral targets: W, U, B, R, G, COLORLESS, YORE, GLINT, DUNE, INK, WITCH, BANT, ESPER, GRIXIS, JUND, NAYA, ABZAN, TEMUR, SULTAI, MARDU, and JESKAI. It retains 5 discriminator questions, 3 collision entries, minimum hits `2`, and broad penalty `0.16`. No scoring, calibration, runtime, Hall, Crucible, scheduling, schema, validator, or package changes appear in the candidate.

## Drift Scorecard for Independent Review

- Correct branch and program base: PASS.
- One identity active: PASS.
- Source hierarchy explicit: PASS.
- Generic endpoint/five-color overfit checked: PASS.
- Required neighbors checked: PASS.
- Claim roles complete: PASS.
- Evidence scopes complete: PASS.
- Discovery/support isolated: PASS.
- Canonical IDs/hashes valid: PASS.
- Exact fixture/provenance parity: PASS.
- Frozen confidence/calibration intact: PASS.
- Native IDs intact: PASS.
- Lateral/collision targets intact: PASS.
- Public/recruiter copy aligned: PASS.
- No unrelated identity drift: PASS.
- Deterministic generation: PASS; canonical builder completed and left no semantic content diff, only Windows line-ending/stat byproducts.
- Candidate scope passes exact SHA: PASS.
- Superseded candidates recorded: N/A; no superseded VM-538 candidate exists.
- Review uses exact candidate SHA: PASS.
- Certification uses exact approved SHA: N/A; no certification performed.
- Governance-only workflow/review/certification commits: PASS for workflow and review; certification N/A.
- Dirty-worktree baseline excluded: PASS; generated/stat byproducts and ignored dependencies/corpus remain unstaged.
- External tracker matches repository: N/A; Excel/external tracker was not updated by Codex.

## Validation Commands and Results

- `npm.cmd ci`: PASS; 217 locked packages installed.
- `node research\validate-semantic-readiness.mjs --target=WUBRG`: PASS.
- `node research\validate-semantic-readiness.mjs --target=WUBRG --fixtures`: PASS.
- Initial `node research\build-semantic-readiness-provenance.mjs --check`: expected Windows byte-strict stale result; reran generator.
- `npm.cmd run build:semantic-provenance`: PASS; wrote 2079 entries.
- Rerun `node research\build-semantic-readiness-provenance.mjs --check`: PASS; verified 2079 entries.
- `npm.cmd run audit:semantic-readiness -- --targets=WUBRG`: PASS; 8 substantive claims, 20 sources, 21 reference sites, and no missing references.
- `npm.cmd run validate:source-generated -- --target=WUBRG`: PASS with zero warnings.
- `npm.cmd run test:faction-context-isolation -- --identity=WUBRG`: PASS.
- `npm.cmd run test:parser`: PASS; 226 parser cases.
- `npm.cmd run test:placement`: PASS; 37 factions and 37 golden paths.
- `node research\semantic-candidate-scope-tests.js`: PASS.
- `node research\validate-semantic-candidate-scope.mjs --identity=WUBRG --base=a5e678bea5d92a2addc184e3564d37b7e098140d --target=c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`: PASS.
- `npm.cmd run test:semantic-readiness`: PASS; contract tests, candidate-scope tests, fixtures, and 2079-entry provenance check passed.
- `npm.cmd run build:factions`: PASS; built 37 faction placement records and regenerated generated artifacts.
- First `npm.cmd test`: reached expected missing ignored Scryfall corpus at `data/scryfall/raw/oracle-cards.json`.
- Added ignored local hardlink `data/scryfall/raw/oracle-cards.json` from `C:\dev\mtgSiteWIP\data\scryfall\raw\oracle-cards.json`.
- Rerun `npm.cmd test`: PASS; placement, live gate bias, parser, builder, semantic readiness, Maze contracts, syntax/mode, precon, dossier follow-up, and presentation snapshot tests passed.
- Direct probes for accepted aliases, rejected label forms, all 119 noncanonical color-order permutations, `WUBRG-LOCAL-002`, WUBRG provenance isolation, Colorless/WUBRG collision ownership, fixture count, preview equality, directory suppression, color representation, lateral targets, min-hits, and broad penalty: PASS.

## Decision

Approval rationale: The exact candidate is isolated to the nine authorized WUBRG semantic files, repairs all Contract v1.1 claim-role, evidence-scope, canonical-ID, source-registry, provenance, fixture, guidance, and collision-proof blockers, keeps discovery/support material out of substantive proof chains, preserves endpoint alias and public-route fail-closed behavior, preserves the enabled Home preview at order 36, covers the required neighbor/generic/endpoint/alias/permutation exclusions, and passes exact candidate-scope, semantic readiness, source/generated, faction-context, parser, placement, deterministic-generation, direct-probe, and full-suite validation.

No remediation performed: confirmed.

No certification performed: confirmed.

Program base unchanged: `7f615d4fe5a19cf8f9d2a58a8026f837378c06b2`.

WUBRG remains the final uncertified identity: confirmed; ledger and board show 36 of 37 certified, with WUBRG awaiting independent review before certification.

Excel not updated by Codex: confirmed.

Unstaged byproducts:

- Generated/stat/line-ending validation touches left unstaged: `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `data/semantic-readiness-provenance.json`, `supabase/functions/guild-recruiter/faction-context.ts`, `docs/audits/gate-compression/live-gate-bias.json`, and `docs/audits/gate-compression/live-gate-bias.md`.
- Ignored local-only `node_modules/`.
- Ignored local-only hardlink `data/scryfall/raw/oracle-cards.json`.

Warnings:

- Git cannot read `C:\Users\obake\.config\git\ignore` because of permission denial.
- The initial byte-strict provenance check reported stale before regeneration; after `npm.cmd run build:semantic-provenance`, strict verification passed with 2079 entries.
- Windows line-ending warnings appeared for generated JSON and recruiter-context files; these byproducts are not staged.

Not touched: No implementation edit, semantic remediation, replacement candidate, certification, semantically-ready transition, certified-count change, program-base advancement, Excel update, GitHub remote authority, branch/worktree creation, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, force operation, package/lockfile edit, validator/test/schema edit, recruiter source edit, runtime edit, public-route expansion, or unrelated identity work occurred.

Follow-up recommendations: A separate certification-only window may certify exact candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b` only after accepting this governance-only review commit. Certification must remain governance-only and must not advance from the workflow SHA.

Next suggested agent: Certification-only agent for VM-538 WUBRG.

Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-538-wubrg-semantic-recovery.md`; `docs/incidents/CRIT-001-drift-control-template.md`; `docs/handoffs/2026-07-24-2224-codex-vm538-wubrg-gate1-gate2.md`; `docs/handoffs/2026-07-24-2245-codex-vm538-wubrg-candidate-workflow.md`; `docs/incidents/recoveries/VM-538-wubrg-semantic-recovery.md`.

APPROVE EXACT SHA c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b
