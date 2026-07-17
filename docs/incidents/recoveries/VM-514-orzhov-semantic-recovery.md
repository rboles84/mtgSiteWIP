# VM-514 - Orzhov Semantic Recovery

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: Orzhov / WB
Contract: CRIT-001 Contract v1.1
Operating playbook: CRIT-001 Operating Playbook v2
Program base: `0a7f52d2469ad4c050570f3b2bbe32dc0d4fea14`

## Gate 1+2 Audit - 2026-07-17

Gate 1+2 was a read-only audit and evidence-confirmation pass. No Orzhov raw packet, generated consumer, provenance, fixture, recruiter, runtime, schema, builder, validator, scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, global recruiter, VM-515, original main worktree, or Excel tracker file was changed.

### Preflight

- Worktree: `C:\dev\mtgSiteWIP-crit001`
- Branch: `codex/vm-514-orzhov-semantic-recovery`
- Starting HEAD: `0a7f52d2469ad4c050570f3b2bbe32dc0d4fea14`
- Program base verification: current HEAD equals and contains the Dimir certification/program base.
- Active worktree baseline: allowed Table Talk side-scan changes only: modified `docs/handoffs/HANDOFF_INDEX.md` plus untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md` and `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`.
- Original main allowance: `C:\dev\mtgSiteWIP` retained known docs/workflow dirtiness only; no raw/generated/data/runtime changes were observed or touched.

### Sources Inspected

- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.sources.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.claims.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.profile.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.placement.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`

Approved claim-bearing Orzhov source rows are the official Ravnica Allegiance guild guide and official Ravnica Allegiance mechanics article. The Dragon's Maze mechanics article remains support-only. Ten MTG-Stories archive rows remain discovery-only search/corpus rows.

### Structural Findings

- Initial claim count: 17.
- Semantic roles: 0 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, 7 `unclassified`.
- Source rows: 13 total; 2 claim-bearing, 1 support-only, 10 discovery-only.
- No claims currently have Contract v1.1 `semantic_role`.
- No substantive claims currently have bounded `evidence_locations` or `evidence_scope`.
- Raw JSON parse checks passed for Orzhov claims, sources, profile, placement, and changelog.

### Proof-Chain Findings

- Authoritative profile, public surface, structure, great-tension, mechanics, key-figure, placement-summary, placement-axis, behavioral-signal, core-value, and inhibitor chains currently rely on discovery or unclassified records.
- Current discovery-only story-corpus records are used as if they prove authoritative profile and placement fields. They must be demoted or isolated as metadata/history unless future source intake promotes them.
- Commander Compass recommendation support uses discovery claim IDs in `supporting_claim_ids` and `source_basis.existing_repo_claim_ids`; this must be clarified so discovery rows cannot be read as source-backed faction proof.
- Generated WB provenance has 43 entries, 31 null canonical IDs, 0 null canonical content hashes, 0 duplicate canonical entries, and 27 discovery-backed chains.
- WB semantic fixtures are missing; exact fixture/provenance parity cannot pass until Gate 3+4 creates fixtures from generated truth.

### Public And Recruiter Findings

Generated public and recruiter surfaces currently overextend Orzhov into high-heat or mechanic-first wording. Target-specific stale-risk phrases include: `generic WB`, `white-black control`, `midrange`, `attrition`, `taxes`, `stax`, `removal`, `lifegain`, `life-drain`, `aristocrats`, `sacrifice`, `death triggers`, `extort`, `church`, `religion`, `clergy`, `cathedral`, `cult`, `faith`, `mafia`, `cartel`, `banker`, `corporation`, `merchant`, `greed`, `wealth`, `corruption`, `authoritarian`, `debt`, `obligation`, `contracts`, `exploitation`, `extortion`, `spirits`, `ghosts`, `afterlife`, `death is not an escape`, `evil church`, `undead banker`, `community`, `order`, `secrecy`, `information control`, `rhetoric`, and `social influence`.

These terms are not globally banned. Gate 3+4 may retain them only when source-supported, bounded, and not promoted from discovery/support records or generic Commander mechanics.

### Frozen Field Baseline

Gate 3+4 must preserve:

- `placement_summary.calibrated_primary_read`: `Requires debt, obligation, contract, prestige, hierarchy, legacy, or guilt-as-currency.`
- `placement_summary.calibrated_false_positive_guardrail`: `Do not award for generic institutions unless the answer frames them as leverage, obligation, or repayment.`
- `calibration_tuning.required_positive_evidence_terms`: `debt`, `obligation`, `contract`, `prestige`, `tithe`, `leverage`, `legacy`, `hierarchy`, `payment`, `guilt`
- `calibration_tuning.required_positive_min_hits`: `2`
- `calibration_tuning.broad_match_penalty`: `0.1`
- `calibration_tuning.strengthen_when_user_centers`: `debt as real`, `obligation ledger`, `prestige as power`, `institutional leverage`
- `calibration_tuning.suppress_when_user_centers`: `impartial law`, `invisible secrecy`, `public rhetoric`, `selfless belonging`, `free charity`
- Generated lateral targets at Gate 1+2: `WU`, `UB`, `SILVERQUILL`, `ESPER`, `ABZAN`, `MARDU`

### Required Neighbor Set

Gate 3+4 must build bounded collision guidance for:

`GENERIC_WB_OVERFIT`, `W`, `B`, `WU`, `WR`, `BR`, `BG`, `UB`, `WG`, `SILVERQUILL`, `ESPER`, `ABZAN`, `MARDU`

Additional neighbors may be added only if a local evidence chain requires them. Removal from this set requires explicit documentation.

### Neighbor Discrimination Baseline

- Orzhov must be source-bounded to the Ravnican WB guild whose official guide links religion, deals/business, hierarchy/cartels, debt, crime, and the Obzedat/Kaya/Teysa leadership transition.
- It is not generic WB control, removal, lifegain, aristocrats, taxes, attrition, or extort mechanics.
- It is not mono-white order, community, faith, law, or hierarchy without Orzhov's transactional/institutional debt frame.
- It is not mono-black ambition, wealth, exploitation, death, or power without Orzhov's white-black institutional legitimacy and obligation frame.
- It is not Azorius law/procedure/bureaucratic fairness.
- It is not Boros duty, justice, speed, or force.
- It is not Rakdos spectacle, violence, indulgence, or criminal theater.
- It is not Golgari undercity ecology, decay, survival, or death-cycle reclamation.
- It is not Dimir secrecy, information control, invisibility, or covert leverage.
- It is not Selesnya faith/community/harmony/collective belonging.
- It is not Silverquill rhetoric, reputation, status performance, or social influence through words.
- It is not Esper hierarchy/control as a broader WUB artifact/perfection identity.
- It is not Abzan family endurance, ancestry, or clan obligation.
- It is not Mardu conquest, martial hierarchy, or raid loyalty.

### Remediation Decision

Disposition: `claim_extraction_pass_required`.

Remediation is authorized under CRIT-001 Contract v1.1 using existing listed/local Orzhov sources. Gate 3+4 must stop if exact locators cannot support retained wording, if discovery/support contamination cannot be removed without builder/schema changes, if frozen placement/confidence/calibration fields drift, if required provenance IDs/hashes remain null, or if candidate-scope validation fails for non-display-source reasons.

### Gate 1+2 Validation

- `git status --short --branch`: correct branch and allowed Table Talk baseline only.
- Raw Orzhov JSON parse checks: passed.
- `node research/audit-semantic-readiness.mjs --targets=WB`: completed; reported 17 claims, 0 substantive, 10 discovery, 0 support, 7 unclassified, 43 reference sites, and expected invalid proof-chain risk.
- `node research/validate-semantic-readiness.mjs --targets=WB`: failed as expected for missing semantic roles, missing recruiter evidence mappings, invalid authoritative proof chains, and missing fixtures.
- Custom read-only chain/provenance scan: found no current duplicate claim IDs in audited Orzhov raw chains; found missing WB fixtures, 31 null WB canonical IDs, and 27 generated discovery-backed provenance chains.

### Gate 3+4 Preservation Rules

- Do not use discovery-only story rows as proof for identity, placement, public copy, recruiter guidance, generated key figures, or provenance chains.
- Retain native/history IDs only as explicit metadata/history when required.
- Do not add online source intake unless a blocker is reported and separately approved.
- Do not change Contract v1.1, schemas, builders, validators, Hall, Crucible, scoring, confidence behavior, calibration, scheduling, tie-order, or global recruiter behavior.
- Preserve the active Table Talk baseline and exclude it from every VM-514 commit.
