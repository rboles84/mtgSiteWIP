# VM-523 Esper Independent Exact-SHA Review

Agent name: Codex independent reviewer
Task requested: Perform a fresh independent CRIT-001 Contract v1.1 exact-SHA review of Esper candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80`, record the decision, and update only governance state.

## Program And Object Separation

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Ticket: VM-523.
- Identity: Esper / WUB.
- Internal key: ESPER.
- Program base: `a7ea41cbf57cc87f1948fdd254f0295816c5919d`.
- Exact candidate reviewed: `6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- Candidate workflow-record commit: `841154f80a786ae41fa59c5835ec9370e40cb05e`.
- Review branch: `codex/vm-523-esper-independent-review`.
- Review worktree: `C:\dev\mtgSiteWIP-crit001-vm523-independent-review`.
- Review starting HEAD: `841154f80a786ae41fa59c5835ec9370e40cb05e`.
- Certification: not authorized and not performed.
- Program base advancement: not authorized and not performed.

## Independence Statement

This review ran in the dedicated independent review worktree and branch created from the exact workflow-record commit. Gate 1+2, Gate 3+4, Gate 5 qualification, automated validation, and candidate workflow summaries were treated as claims requiring independent verification. No candidate repair, replacement candidate, source addition, evidence edit, provenance regeneration in repository write mode, fixture edit, collision edit, preview edit, generated output edit, recruiter edit, runtime edit, test edit, validator edit, generator edit, schema edit, package edit, CI edit, certification, VM-524 work, Excel update, original-main edit, candidate-worktree edit, VM-522 edit, DRIFT-017 edit, VM-542/DRIFT-019 cleanup, historical/debug/archive edit, or Table Talk edit occurred.

## Governing Authority Reviewed

- Root `AGENTS.md`; no scoped `AGENTS.md` was present.
- `docs/handoffs/HANDOFF_INDEX.md`.
- `docs/kanban/board.md`.
- `docs/kanban/ready/VM-523-esper-semantic-recovery.md`.
- `docs/incidents/CRIT-001-operating-playbook.md`.
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`.
- `docs/reference/semantic-readiness-contract.md`.
- `docs/incidents/CRIT-001-drift-control-template.md`.
- `docs/incidents/CRIT-001-drift-register.md`.
- Candidate-scope validator and tests.
- VM-523 preflight, Gate 1+2, Gate 3+4, and candidate workflow handoffs.
- VM-522 original rejection, replacement approval, and certification precedents.
- Esper raw source packet, generated surfaces, provenance, fixture, preview, recruiter context, and active-consumer references.

## Setup And Ancestry

Phase 0 setup preflight passed. No pre-existing `codex/vm-523-esper-independent-review` branch, remote branch, or review worktree existed before creation. No prior independent review, approval, rejection, or certification for `6467f70fa4de13173172e20277e0fd56ebaf0b80` existed. Required objects exist: base `a7ea41c...`, candidate `6467f70...`, and workflow `841154f...`.

Ancestry verified:

- `a7ea41cbf57cc87f1948fdd254f0295816c5919d` is an ancestor of `6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- `6467f70fa4de13173172e20277e0fd56ebaf0b80` is an ancestor of `841154f80a786ae41fa59c5835ec9370e40cb05e`.
- Review-record commit is to descend directly from `841154f80a786ae41fa59c5835ec9370e40cb05e`.

Protected worktree status:

- Candidate campaign `C:\dev\mtgSiteWIP-crit001-vm523-esper`: clean and untouched.
- VM-522 independent review worktrees: clean and untouched.
- Long-running CRIT worktree retained Table Talk baseline and was untouched.
- Original main retained unrelated existing docs dirt and was untouched.
- DRIFT-017 prototype retained its existing modified validator files and was untouched.

## Candidate Diff

Candidate range:

`a7ea41cbf57cc87f1948fdd254f0295816c5919d..6467f70fa4de13173172e20277e0fd56ebaf0b80`

Commit list:

- `bbf0993` VM-523: record Esper pre-identity drift preflight.
- `eaa8ffa` VM-523: record Esper Gate 1+2 semantic audit.
- `0365560` VM-523: remediate Esper semantic readiness.
- `6467f70` VM-523: keep Esper support records out of proof chains.

Changed files and classifications:

- `data/raw-factions/esper/esper.claims.json` - approved Esper semantic source/input.
- `data/raw-factions/esper/esper.profile.json` - approved Esper semantic source/input.
- `data/raw-factions/esper/esper.placement.json` - approved Esper semantic source/input and collision input.
- `research/fixtures/semantic-readiness/esper.semantic-fixtures.json` - approved Esper fixture.
- `data/factions.json` - approved Esper generated output and embedded preview consumer.
- `data/placement-model.json` - approved Esper generated output and collision surface.
- `data/semantic-readiness-provenance.json` - approved Esper provenance output.
- `supabase/functions/guild-recruiter/faction-context.ts` - approved generated recruiter consumer.
- `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md` - governance in candidate ancestry.
- `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md` - governance in candidate ancestry.
- `docs/handoffs/HANDOFF_INDEX.md` - governance in candidate ancestry.
- `docs/kanban/backlog/VM-523-esper-semantic-recovery.md` deleted by move - governance in candidate ancestry.
- `docs/kanban/in-progress/VM-523-esper-semantic-recovery.md` added by move - governance in candidate ancestry.
- `docs/kanban/board.md` - governance in candidate ancestry.

Diff statistics: 14 files changed, 2644 insertions, 168 deletions.

Unexpected paths: none. Shared-infrastructure contamination: none. Historical/debug/archive contamination: none. Package/CI/schema/validator/generator/test contamination: none. Non-Esper semantic candidate-diff result: PASS; record-level comparison found only ESPER changed in generated faction and placement records, and only ESPER provenance deltas.

## Candidate And Workflow Separation

Post-candidate range:

`6467f70fa4de13173172e20277e0fd56ebaf0b80..841154f80a786ae41fa59c5835ec9370e40cb05e`

Changed files:

- `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`
- `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-523-esper-semantic-recovery.md` deleted by move
- `docs/kanban/ready/VM-523-esper-semantic-recovery.md` added by move

Candidate-scope diff from candidate to workflow across `data`, `research`, `supabase`, `assets`, `scripts`, `package.json`, `package-lock.json`, `.github`, and `outputs`: empty. The workflow record is governance-only and was not treated as approval or as the semantic candidate.

## Source Authority Review

Stored source records: 13. Role counts: 2 claim-bearing, 6 shaping-only, 5 support-only. All repository locator paths exist in the exact candidate tree.

Load-bearing claim-bearing sources:

- `src_vm_esper_evidence_ledger_20260529` - tracked local evidence ledger; used by all nine claims.
- `src_wotc_rosewater_esper_striving_for_perfection` - tracked official Wizards design article capture; used by the seven substantive claims.

Secondary/supporting source use:

- `src_vm_canon_inventory_three_color_audit_20260528` appears on `esper_claim_0002` only for bounded source/classification metadata and on support records.
- `src_alara_shards_lore_dossier_protocol_rtf` appears on `esper_claim_0007` only for bounded shard-frame context and on support records.

No source is missing, untracked, silently substituted, or over-promoted as the sole authority for a substantive identity conclusion.

## Claim Review

Claim counts: 9 total; 7 `substantive_claim`; 2 `support_record`; 0 `discovery_record`; 0 unclassified.

Substantive claims:

- `esper_claim_0001`: PASS. Narrow identity fact that Esper is the white-blue-black shard in the official Esper design article; locators resolve and scope is `identity_fact`.
- `esper_claim_0002`: PASS. WUB color direction and Blue center/design lens; `WUB` remains metadata only and evidence scope is `identity_metadata`.
- `esper_claim_0003`: PASS. Blue-centered potential, knowledge, planning, change, and applied information; supported by ledger and official article sections.
- `esper_claim_0004`: PASS. Official design commentary frames Esper as Blue proof-of-concept for order/perfection; scope is explicitly design commentary only.
- `esper_claim_0005`: PASS. White ally contribution of social improvement, long-term planning, technology serving people, and strategy; no unsupported law/class/institution expansion.
- `esper_claim_0006`: PASS. Black ally contribution of control, information value, focus, vision, and ethical risk; no unsupported figure/ruler/chronology expansion.
- `esper_claim_0007`: PASS. Missing Red and Green enemy-color pressures; Rosewater source carries the substantive boundary, with Alara RTF only supporting shard-frame context.

Support records:

- `esper_claim_0008`: PASS as support. Source/provenance classification only; not identity proof.
- `esper_claim_0009`: PASS as support. Alara shard setting context only; not authority for other shard meanings or Esper thesis.

Unsupported claims: none. Overbroad claims: none. Material UNKNOWN claims: none.

## Support Proof-Chain Isolation

Support-record IDs `esper_claim_0008` and `esper_claim_0009` are absent from generated authoritative proof chains, Esper provenance evidence-claim arrays, and Esper fixtures. They remain available only for bounded source classification and setting-context support. Support authoritative-chain result: PASS.

## Independent Esper Model

Independently derived thesis: Esper is Blue-centered WUB perfectibility through designed control. It treats potential as something knowledge can make changeable, White makes improvement coordinated and socially ordered, and Black makes information focused enough to control outcomes.

Operational definition: choose Esper when a user wants to understand a system, plan deliberate improvement, coordinate the change, and apply information as controlled implementation. Do not choose Esper from color identity, generic control, artifact aesthetics, or Alara labels alone.

White contribution: ordered improvement, coordination, long-term planning, strategy, and technology serving people. Blue contribution: the center/design lens of potential, knowledge, planning, change, and applied information. Black contribution: control, information value, focus, vision, instrumental pressure, and ethical risk.

Three-color necessity: PASS. Without White, Esper collapses toward Dimir secrecy/control; without Blue, it loses the perfectibility thesis; without Black, it collapses toward Azorius procedure or Bant ordered aspiration.

Failure modes: over-control; treating unoptimized life as error; generic technocracy; generic transhumanism; generic WUB good-stuff; artifacts, filigree, aetherium, or perfection aesthetics substituting for evidence.

Falsification tests: prefer Azorius for lawful procedure without Black-supported control; Dimir for hidden leverage without White ordered improvement; Orzhov for obligation/debt without Blue perfectibility; Bant for living communal order; Grixis for volatile survival leverage; WUBRG for full-spectrum coalition; reject artifact-only, mechanics-only, aesthetics-only, or best-of-WUB prompts.

## Generic, Mechanical, And Aesthetic Review

Generic-language result: PASS. The candidate uses order, knowledge, ambition, perfection, hierarchy, efficiency, systems, control, progress, civilization, optimization, WUB, technocracy, and transhumanism only inside evidence-bound positive or explicit negative guardrails.

Mechanical/aesthetic result: PASS. Artifacts, aetherium, filigree, sphinxes, vedalken, Alara, control mechanics, combo mechanics, and artifact mechanics are not used as the identity thesis. Fixture and placement guardrails reject artifacts-only, aesthetics-only, generic technocracy, and generic transhumanism.

## Required-Neighbor Review

All required boundaries are falsifiable and supported by claims, collision guidance, and fixture exclusions.

- Azorius / WU: PASS. Esper is WU order pulled into Black-supported control and Blue-centered perfectibility, not civic procedure alone.
- Dimir / UB: PASS. Esper adds White ordered improvement to information control, not hidden leverage alone.
- Orzhov / WB: PASS. Esper adds Blue planning and perfectibility to WB structure, not obligation/debt alone.
- White / W: PASS. White is an ally contribution; Esper requires Blue center and Black focus.
- Blue / U: PASS. Blue is the center, but Esper also requires White coordination and Black implementation pressure.
- Black / B: PASS. Black control is bounded by Blue improvement and White structure.
- Bant / WUG: PASS. Esper replaces Green living acceptance with Black-supported control and instrumental information.
- Grixis / UBR: PASS. Esper shares UB control but rejects Red urgency through White ordered improvement.
- Abzan / WBG: PASS. Esper redesigns systems through knowledge rather than preserving endurance through ancestry/family.
- Jeskai / WUR: PASS. Esper makes design control primary rather than discipline for action/accountability.
- Mardu / WBR: PASS. Esper plans before action rather than speed and war-code openings.
- Sultai / UBG: PASS. Esper uses White coordinated improvement rather than Green-Black resource conversion.
- Naya / WRG: PASS. Esper contrasts designed control with natural awe, growth, and Red-Green immediacy.
- Temur / URG: PASS. Esper plans alteration through information rather than instinctive force and embodied knowledge.
- Jund / BRG: PASS. Esper keeps Black tied to Blue planning and White coordination rather than appetite/survival/natural force.
- Five-color / WUBRG: PASS. Esper is exact WUB thesis, not full-spectrum synthesis or good-stuff coalition.
- Generic good-stuff/control/balance/optimization/WUB/technocracy/transhumanism: PASS. Explicit fixture and placement guardrails require the WUB design-control engine.

## Evidence, Canonical IDs, And Provenance

- Evidence locations: 21 total.
- Substantive evidence locations: 16.
- Missing evidence artifacts or unresolved locators: 0.
- Missing substantive evidence scopes: 0.
- Unsupported or overbroad substantive claims: 0.
- Claim IDs: unique.
- Esper provenance entries: 56.
- Null canonical IDs: 0.
- Null canonical content hashes: 0.
- Unresolved canonical files/pointers: 0.
- Duplicate canonical/null keys: 0.
- Support-record authoritative-chain contamination: 0.
- Provenance freshness and determinism: PASS at committed Git-blob level; generator output exactly equals committed LF blob, and normalized Windows worktree content matches.

## Fixture Review

Fixture path: `research/fixtures/semantic-readiness/esper.semantic-fixtures.json`.

Fixture cases: 23.

Fixture type counts:

- `core_inclusion`: 1.
- `mature_or_pressure_behavior`: 1.
- `nearest_collision_ambiguity`: 1.
- `required_neighbor_exclusion`: 18.
- `provenance`: 2.

Structure result: PASS. Identity key, roles, evidence claim IDs, evidence source IDs, runtime assertions, preview/collision/candidate-scope assertions, and provenance cases are present.

Quality result: PASS. Cases are not tautological, name-only, color-label-only, mechanics-only, or disconnected from evidence. They include positive Esper inclusion, over-control pressure, nearest ambiguity, all required neighbor/generic exclusions, preview assertions, collision/native-ID assertions, and provenance expectations. Support records do not appear in fixture evidence references.

## Collision And Frozen-Field Review

Generated collision order:

`WU`, `UB`, `WB`, `BANT`, `GRIXIS`, `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`, `NAYA`, `TEMUR`, `JUND`, `W`, `U`, `B`, `WUBRG`.

Lateral targets: `WU`, `UB`, `WB`, `BANT`, `GRIXIS`.

Native IDs: PASS. Raw/profile native ID remains `esper`; discriminator IDs remain `esper_discriminator_0001`, `esper_discriminator_0002`, `esper_discriminator_0003`.

Frozen-field result: PASS. Required positive terms, minimum hits, broad match penalty, confidence/calibration shape, lateral targets, native IDs, and non-semantic runtime fields remain within the Gate 1+2 contract. No Hall, Crucible, scoring, scheduling, package, schema, validator, generator, runtime, or CI drift occurred.

## Preview And Active Consumers

Preview owner: `data/identity-layers.json#/expressions/ESPER/preview_text`.

Embedded preview: `data/factions.json#/identity_layers/expressions/ESPER/preview_text`.

Preview text: `Esper treats potential as a design problem. Blue seeks perfectibility through knowledge and applied information, White gives the project ordered improvement, and Black turns information into focused control.`

Preview result: PASS; source and embedded preview are equal and semantically aligned.

Active consumed-surface result:

- Home: PASS; active Home code reads `data/identity-layers.json` and `data/factions.json`.
- Archscry: PASS; active Archscry code reads generated faction, placement, and identity-layer data.
- Recruiter: PASS; `supabase/functions/guild-recruiter/index.ts` imports `FACTION_CONTEXT`, and Esper generated context is aligned.
- Tests and CI consumers: PASS; semantic readiness, candidate-scope, placement, recruiter isolation, and source/generated guardrail commands exercise the active surfaces.
- Historical/debug/archive exclusions: PASS; established debug NDJSON and historical JS exclusions were retained and untouched.

DRIFT-015: PASS. DRIFT-016: PASS. DRIFT-017: PASS.

## Validation Commands

- `git status --short --branch` in review worktree: exit 0, clean before governance edits.
- `node research\validate-semantic-candidate-scope.mjs --identity=ESPER --base=a7ea41cbf57cc87f1948fdd254f0295816c5919d --target=6467f70fa4de13173172e20277e0fd56ebaf0b80`: exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=WUB --base=a7ea41cbf57cc87f1948fdd254f0295816c5919d --target=6467f70fa4de13173172e20277e0fd56ebaf0b80`: exit 1 as expected, `Unknown identity WUB`.
- `node research\semantic-candidate-scope-tests.js`: exit 0.
- `node research\audit-semantic-readiness.mjs --targets=ESPER`: exit 0; 9 claims, 7 substantive, 2 support, 13 sources, 47 reference sites, no missing references, no role-invalid support links.
- `node research\validate-semantic-readiness.mjs --targets=ESPER`: exit 0.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=ESPER`: exit 0.
- `node research\build-semantic-readiness-provenance.mjs --check`: exit 1 in Windows checkout due CRLF-sensitive exact compare only.
- Normalized/blob provenance determinism script: exit 0; 1920 entries, generator output equals committed Git blob exactly, normalized worktree equals rendered output, worktree has CRLF, blob has LF.
- `npm.cmd run test:semantic-readiness`: exit 1 only at the same CRLF-sensitive provenance exact compare after semantic contract tests, candidate-scope tests, and fixture validation passed.
- `npm.cmd run test:parser`: exit 0; 226 parser cases passed.
- `npm.cmd run test:placement`: exit 0; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: exit 0.
- `node research\validate-source-generated-guardrails.mjs --targets=ESPER`: exit 0 with one non-blocking model-owned inhibitor warning.
- Evidence-locator, evidence-scope, canonical-ID, provenance pointer, fixture-quality, collision, preview equality, active-consumer, frozen-field, and non-Esper record-level scripts: exit 0 / PASS.

## Exact Candidate Export

- Export path: `C:\Users\obake\.codex\visualizations\2026\07\20\019f8007-b187-7610-b572-effbe389229d\vm523-review-exact-6467f70-20260720191355`.
- Export source: `git archive` from exact object `6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- Dependency source: `node_modules` junction to `C:\dev\mtgSiteWIP\node_modules`.
- Scryfall corpus source: hardlink to `C:\dev\mtgSiteWIP\data\scryfall\raw\oracle-cards.json`.
- Additional inputs: none.
- `npm.cmd test` in exact export: exit 0.
- Repository review worktree after export/test: candidate files unchanged.

## Review Matrix

Totals:

- Total controls: 42.
- PASS: 42.
- FAIL: 0.
- UNKNOWN: 0.
- N/A: 0.

Severity totals:

- CRITICAL: 0.
- MAJOR: 0.
- MINOR: 0.
- INFORMATIONAL: 2.

Control results:

- Exact candidate/base/workflow objects verified: PASS.
- Review branch/worktree isolation verified: PASS.
- Candidate/workflow separation verified: PASS.
- Complete candidate diff inspected and all paths classified: PASS.
- Shared infrastructure contamination absent: PASS.
- Historical/debug/archive contamination absent: PASS.
- Non-Esper semantic drift absent: PASS.
- Source authority and artifact tracking: PASS.
- Seven substantive claims supported: PASS.
- Two support records correctly scoped: PASS.
- Discovery/support isolation: PASS.
- Evidence locators/scopes: PASS.
- Canonical IDs/hashes/pointers: PASS.
- Provenance ownership/freshness/determinism: PASS.
- Fixture structure and quality: PASS.
- Esper semantic model coherence: PASS.
- Three-color necessity: PASS.
- Required-neighbor boundaries: PASS.
- Generic-language safeguards: PASS.
- Mechanical/aesthetic safeguards: PASS.
- Collision structure/order/lateral targets: PASS.
- Preview parity and semantic alignment: PASS.
- Active consumed surfaces: PASS.
- DRIFT-015: PASS.
- DRIFT-016: PASS.
- DRIFT-017: PASS.
- Frozen fields/native IDs: PASS.
- Exact candidate-scope command: PASS.
- Invalid `WUB` guard: PASS.
- Readiness validators and target fixture validation: PASS.
- Parser, placement, recruiter isolation, source/generated guardrail: PASS.
- Exact-candidate export full test: PASS.
- Protected worktrees, Excel, VM-524, Table Talk preserved: PASS.

Informational observations:

- Windows review checkout expands `data/semantic-readiness-provenance.json` to CRLF while the committed Git blob and generator output are LF-exact. `build-semantic-readiness-provenance.mjs --check` and `npm.cmd run test:semantic-readiness` fail only on this exact text comparison in the review worktree; normalized content and committed blob pass determinism.
- Source/generated guardrails report one non-blocking ESPER model-owned inhibitor warning; manual review found the raw placement and fixture guardrails independently cover the risk.

Approval-blocking findings: none.

## Governance State

VM-523 Kanban state before: Ready - Candidate Awaiting Independent Exact-SHA Review.

VM-523 Kanban state after: Ready - Independent Exact-SHA Review Approved; certification-only window required next.

Files changed by this review:

- `docs/handoffs/2026-07-20-1914-codex-vm523-esper-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-523-esper-semantic-recovery.md`

What changed: recorded independent exact-SHA approval for candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80` and updated VM-523 governance to await certification-only work.

What did not change: no candidate file, semantic remediation, source, claim, evidence, provenance, fixture, collision, preview, generated output, recruiter context, runtime, test, validator, generator, schema, package, CI, replacement candidate, certification, semantically-ready transition, certified-count increment, Wave 4 count change, program-base advancement, VM-524 work, Excel update, original-main edit, candidate-worktree edit, VM-522 edit, DRIFT-017 edit, VM-542/DRIFT-019 cleanup, historical/debug/archive edit, or Table Talk edit occurred.

## Next Suggested Agent

Certification-only agent for VM-523 Esper, restricted to certifying exact approved candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80` if the user authorizes a separate certification window.

## Related Records

- Kanban card: `docs/kanban/ready/VM-523-esper-semantic-recovery.md`.
- Candidate workflow: `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`.
- Gate 3+4 handoff: `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`.
- Gate 1+2 handoff: `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`.
- Drift preflight: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`.

APPROVE EXACT SHA 6467f70fa4de13173172e20277e0fd56ebaf0b80
