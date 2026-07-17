# VM-515 - Selesnya Semantic Recovery

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: Selesnya / WG
Contract: CRIT-001 Contract v1.1
Operating playbook: CRIT-001 Operating Playbook v2
Program base: `556affb937be0f459de8919061a069cc2f901693`

## Gate 1+2 Audit - 2026-07-17

Gate 1+2 was a read-only audit and evidence-confirmation pass. No Selesnya raw packet, generated consumer, provenance, fixture, recruiter, runtime, schema, builder, validator, scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, global recruiter, VM-516, original main worktree, or Excel tracker file was changed.

### Preflight

- Worktree: `C:\dev\mtgSiteWIP-crit001`
- Branch: `codex/vm-515-selesnya-semantic-recovery`
- Starting HEAD: `556affb937be0f459de8919061a069cc2f901693`
- Program base verification: current HEAD equals and contains the Orzhov certification/program base.
- Active worktree baseline: allowed Table Talk side-scan changes only: modified `docs/handoffs/HANDOFF_INDEX.md` plus untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md` and `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`.
- Original main allowance: `C:\dev\mtgSiteWIP` retained known docs/workflow dirtiness only; no raw/generated/data/runtime changes were observed or touched.

### Sources Inspected

- `data/raw-factions/selesnya_conclave/selesnya_conclave.sources.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.claims.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.placement.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`

Approved claim-bearing Selesnya source rows are the official Guilds of Ravnica guild guide, official Guilds of Ravnica mechanics article, and official Guilds of Ravnica prerelease primer. The Dragon's Maze mechanics article remains support-only. Ten MTG-Stories archive rows remain discovery-only search/corpus rows.

### Structural Findings

- Initial claim count: 17.
- Semantic roles: 0 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, 7 `unclassified`.
- Source rows: 14 total; 3 claim-bearing, 1 support-only, 10 discovery-only.
- No claims currently have Contract v1.1 `semantic_role`.
- No substantive claims currently have bounded `evidence_locations` or `evidence_scope`.
- Raw JSON parse checks passed for Selesnya claims, sources, profile, placement, and changelog.

The seven current non-discovery claims are plausible source-backed or source-derived claims about Selesnya identity, communal voice over the individual, non-pacifist military capacity, Mat'Selesnya, Trostani, Convoke, and interpretive placement signals. They require Gate 3 role assignment and exact bounded locators before they can certify any authoritative surface.

### Proof-Chain Findings

- Authoritative profile, public surface, structure, great-tension, mechanics, key-figure, placement-summary, placement-axis, behavioral-signal, core-value, and inhibitor chains currently rely on discovery or unclassified records.
- Current discovery-only story-corpus records are used as if they prove authoritative profile and placement fields. They must be demoted or isolated as metadata/history unless future source intake promotes them.
- Commander Compass recommendation support uses discovery claim IDs in `identity_basis.supporting_claim_ids` and `source_basis.existing_repo_claim_ids`; this must be clarified so discovery rows cannot be read as source-backed faction proof.
- Generated WG provenance has 42 entries, 31 null canonical IDs, 0 null canonical content hashes, 0 duplicate canonical entries, 25 discovery-backed chains, and 20 unclassified-backed chains.
- WG semantic fixtures are missing; exact fixture/provenance parity cannot pass until Gate 3+4 creates fixtures from generated truth.

### Public And Recruiter Findings

Generated public and recruiter surfaces currently overextend Selesnya into high-heat, generic, or mechanic-first wording. Target-specific stale-risk phrases include: `generic WG`, `generic GW`, `creatures`, `tokens`, `go-wide`, `counters`, `ramp`, `lifegain`, `board-development`, `convoke`, `populate`, `nature`, `growth`, `ecology`, `animals`, `plants`, `forests`, `natural order`, `community`, `cooperation`, `unity`, `harmony`, `belonging`, `peace`, `faith`, `strength in numbers`, `everyone works together`, `collectivism`, `erases individuality`, `no independent will`, `hive-mind`, `brainwashing`, `cult`, `commune`, `religious extremist`, `perfect harmony`, `Worldsoul`, `Mat'Selesnya`, `shared consciousness`, `pacifism`, `army`, `military`, `soldier`, `knight`, `defense`, `selfless nurturing spiritual community`, `Worldmind`, and `individual ego/source of suffering`.

These terms are not globally banned. Gate 3+4 may retain them only when source-supported, bounded, and not promoted from discovery/support records or generic Commander mechanics.

### Frozen Field Baseline

Gate 3+4 must preserve:

- `placement_summary.calibrated_primary_read`: `Requires belonging, harmony, consensus, nurturing community, or selfhood offered to the group.`
- `placement_summary.calibrated_false_positive_guardrail`: `Do not award for generic kindness or nature language without community/consensus/selflessness.`
- `calibration_tuning.required_positive_evidence_terms`: `belonging`, `harmony`, `community`, `consensus`, `peace`, `collective`, `nurture`, `group`, `selflessness`, `worldmind`
- `calibration_tuning.required_positive_min_hits`: `2`
- `calibration_tuning.broad_match_penalty`: `0.1`
- `calibration_tuning.strengthen_when_user_centers`: `belonging to something larger`, `group harmony`, `consensus`, `nurturing peace`
- `calibration_tuning.suppress_when_user_centers`: `law procedure`, `life death craft`, `private ambition`, `direct protection over harmony`, `debt obligation`
- Generated lateral targets at Gate 1+2: `WU`, `WR`, `WITHERBLOOM`, `ABZAN`

### Required Neighbor Set

Gate 3+4 must build bounded collision guidance for:

`GENERIC_WG_OVERFIT`, `W`, `G`, `WU`, `WR`, `BG`, `WB`, `UG`, `RG`, `WITHERBLOOM`, `QUANDRIX`, `BANT`, `NAYA`, `ABZAN`

Additional neighbors may be added only if a local evidence chain requires them. Removal from this set requires explicit documentation.

### Neighbor Discrimination Baseline

- Selesnya must be source-bounded to the Ravnican WG guild whose official sources connect white-green identity, collectivism, nature, unity/togetherness/preservation, communal voice over individual voice, Mat'Selesnya/Trostani leadership, non-pacifist defensive capacity, and Convoke.
- It is not generic WG creatures, tokens, ramp, counters, lifegain, or go-wide board development.
- It is not mono-white order, law, duty, faith, or community without the Selesnya communal/nature guild frame.
- It is not mono-green nature, growth, instinct, ecology, or preservation without Selesnya's communal voice and collective belonging frame.
- It is not Azorius law/procedure/bureaucratic fairness.
- It is not Boros duty, justice, discipline, or force.
- It is not Golgari survival, decay, undercity ecology, or death-cycle reclamation.
- It is not Orzhov obligation, debt, prestige, or transactional institution.
- It is not Simic inquiry, adaptation, improvement, or biological experimentation.
- It is not Gruul rage, anti-civilization, wild revolt, or destruction.
- It is not Witherbloom life/death craft, essence exchange, pests, or vitality costs.
- It is not Quandrix mathematical natural law or abstract pattern study.
- It is not Bant honor/order/community as a broader WUG shard.
- It is not Naya life-celebration, creature-scale awe, or feral communal vitality as a broader WRG shard.
- It is not Abzan family endurance, ancestry, or clan obligation.

### Remediation Decision

Disposition: `claim_extraction_pass_required`.

Remediation is authorized under CRIT-001 Contract v1.1 using existing listed/local Selesnya sources. Gate 3+4 must stop if exact locators cannot support retained wording, if discovery/support contamination cannot be removed without builder/schema changes, if frozen placement/confidence/calibration fields drift, if required provenance IDs/hashes remain null, or if candidate-scope validation fails for non-display-source reasons.

### Gate 1+2 Validation

- `git status --short --branch`: correct branch and allowed Table Talk baseline only.
- Raw Selesnya JSON parse checks: passed.
- `node research/audit-semantic-readiness.mjs --targets=WG`: completed; reported 17 claims, 0 substantive, 10 discovery, 0 support, 7 unclassified, 42 reference sites, and expected invalid proof-chain risk.
- `node research/validate-semantic-readiness.mjs --targets=WG`: failed as expected for missing semantic roles, missing recruiter evidence mappings, invalid authoritative proof chains, and missing fixtures.
- Custom read-only chain/provenance/frozen-field scan: found no current duplicate claim IDs in audited Selesnya raw chains; found missing WG fixtures, 31 null WG canonical IDs, 25 discovery-backed generated provenance chains, 20 unclassified-backed generated provenance chains, and the frozen calibration/lateral baseline listed above.

### Gate 3+4 Preservation Rules

- Do not use discovery-only story rows as proof for identity, placement, public copy, recruiter guidance, generated key figures, or provenance chains.
- Retain native/history IDs only as explicit metadata/history when required.
- Do not add online source intake unless a blocker is reported and separately approved.
- Do not change Contract v1.1, schemas, builders, validators, Hall, Crucible, scoring, confidence behavior, calibration, scheduling, tie-order, or global recruiter behavior.
- Preserve the active Table Talk baseline and exclude it from every VM-515 commit.
