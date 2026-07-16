# VM-510 — Rakdos Semantic Recovery

## Identity and Contract

- Identity key: `BR`
- Identity name: Cult of Rakdos / Rakdos
- Raw packet directory: `data/raw-factions/cult_of_rakdos/`
- Cohort: guild
- Contract version: CRIT-001 Contract v1.1
- Program base / VM-540 accepted base: `797bf23750886d43802700ddbfb974f3ce666f5e`
- Active branch: `codex/vm-510-rakdos-semantic-recovery`
- Starting SHA: `797bf23750886d43802700ddbfb974f3ce666f5e`
- Operating playbook: `docs/incidents/CRIT-001-operating-playbook.md` v2

## Gate 0 — Campaign Operating Check

- Active worktree confirmed: `C:\dev\mtgSiteWIP-crit001`
- Active branch confirmed: `codex/vm-510-rakdos-semantic-recovery`
- Current HEAD at audit start: `797bf23750886d43802700ddbfb974f3ce666f5e`
- Original main worktree checked read-only: `C:\dev\mtgSiteWIP` retained its pre-existing docs/workflow dirty baseline and had no net `data/factions.json` diff.
- Scope: Gate 1+2 read-only audit and bounded evidence confirmation only.
- Not touched: Rakdos raw packet, generated artifacts, semantic fixtures, builders, validators, schemas, contract, runtime, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie ordering, and global recruiter behavior.

## Gate 1 — Audit

### Executive summary

Rakdos is not certifiable as-is. The packet is structurally present and has two claim-bearing official source records plus one support-only mechanics record and ten discovery-only story-corpus records, but every claim lacks `semantic_role` and bounded `evidence_locations`. Authoritative profile, placement, key-figure, generated, and provenance chains currently rely on unclassified or discovery-only records. `collision_guidance` is empty and BR semantic fixtures are missing.

Primary disposition: **Claim-extraction pass required.**

Gate 2 conclusion: evidence sufficiency is plausible from existing listed/local sources for a bounded Gate 3 remediation, but Gate 3 must first localize evidence against existing official/local sources and stop if the official overview/mechanics sections or any retained high-heat wording cannot be bounded.

### Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-15-1556-codex-vm540-operating-playbook-gate-zero.md`
- `docs/handoffs/2026-07-15-1203-codex-vm509-boros-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/canon/ten-guild-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_two_color/rakdos_Hedonism With Attitude _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/guilds/rakdos/README.md`
- `docs/research/canon/guilds/rakdos/rakdos-narrative-taxonomy.md`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.claims.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.sources.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.changelog.json`
- `data/factions.json` BR generated consumer
- `data/placement-model.json` BR generated consumer
- `supabase/functions/guild-recruiter/faction-context.ts` BR generated consumer
- `data/semantic-readiness-provenance.json` BR provenance entries

### Structural facts

| Item | Result |
|---|---:|
| Claim records | 16 |
| Sources | 13 |
| Claim-bearing sources | 2 |
| Support-only sources | 1 |
| Discovery-only sources | 10 |
| Claims with `semantic_role` | 0 |
| Claims with bounded `evidence_locations` | 0 |
| Raw discriminator questions | 3 |
| Collision guidance rows | 0 |
| BR provenance entries inspected | 41 |
| BR provenance entries with null `canonical_id` | 31 |
| BR provenance entries with null `canonical_content_hash` | 0 |
| BR provenance chains using discovery claims | 26 |
| Semantic fixtures | Missing |

### Claim-role audit

Current Contract v1.1 role status: no claims have certifying `semantic_role` values.

| Claim | Current type | Proposed role | Gate 3 action |
|---|---|---|---|
| `cult_of_rakdos_claim_001` | identity | `substantive_claim` | Localize against official Rakdos overview; narrow if needed. |
| `cult_of_rakdos_claim_002` | role | `substantive_claim` | Localize against official Rakdos overview. |
| `cult_of_rakdos_claim_003` | organization | `substantive_claim` | Localize against official Rakdos overview; preserve Rings/troupe claim only if bounded. |
| `cult_of_rakdos_claim_004` | leadership | `substantive_claim` | Localize against official Rakdos overview; usable for Rakdos key figure. |
| `cult_of_rakdos_claim_005` | mechanics | `substantive_claim` | Localize against official Ravnica Allegiance mechanics/Spectacle section. |
| `cult_of_rakdos_claim_006` | placement | `substantive_claim` or bounded project-synthesis claim | Narrow/rewrite as project synthesis from localized 001/002/005; not official psychographic canon. |
| `cult_of_rakdos_claim_0007` through `cult_of_rakdos_claim_0016` | story_corpus_evidence | `discovery_record` | Keep discovery-only unless source-read and split into substantive evidence. |

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| `substantive_claim` | 6 proposed | Medium | Claims 001-006 are plausible but need semantic roles and bounded locators. |
| `discovery_record` | 10 proposed | High | Claims 0007-0016 explicitly record search/corpus relevance, not read proof. |
| `support_record` | 0 proposed | High | The support-only source has no current dedicated claim. |
| `unclassified` | 0 proposed after remediation | Medium | Current unclassified count is 6; Gate 3 should eliminate it. |

### Discovery-record audit

Discovery records are currently used as semantic proof in authoritative chains and generated consumers. This is a blocker.

| File | Pointer / area | Discovery records used | Problem | Severity |
|---|---|---|---|---|
| `cult_of_rakdos.profile.json` | `/core_identity` | 0007-0014 | Core identity cites discovery records rather than substantive claims. | BLOCKER |
| `cult_of_rakdos.profile.json` | `/site_surface` | 0007-0010 | Public tagline proof chain is discovery-backed. | BLOCKER |
| `cult_of_rakdos.profile.json` | `/key_figures/1` | 0007 | Rakdos the Defiler presented as source-backed despite discovery-only support. | BLOCKER |
| `cult_of_rakdos.profile.json` | `/key_figures/2` | 0007, 0012 | Exava presented as source-backed despite discovery-only support. | BLOCKER |
| `cult_of_rakdos.profile.json` | `/key_figures/3` | 0008, 0010, 0013, 0016 | Judith presented as source-backed despite discovery-only support. | BLOCKER |
| `cult_of_rakdos.placement.json` | `/placement_summary` | 0007-0014 | Summary mixes discovery records with unclassified claims. | BLOCKER |
| `cult_of_rakdos.placement.json` | `/core_values/*` | 0007-0009 | Core values are corpus-search terms, not substantive semantic proof. | BLOCKER |
| `data/factions.json` | `/factions/BR/raw_enrichment/key_figures` | 0007-0016 | Generated key figures present discovery records as source-backed evidence. | BLOCKER |
| `data/semantic-readiness-provenance.json` | BR chains | 26 discovery-backed chains | Generated provenance uses discovery records in semantic chains. | BLOCKER |

Discovery records may remain only in explicit non-authoritative discovery metadata after Gate 3.

### Support-record audit

- `src_wotc_dragons_maze_mechanics_2013` is `support-only` and should remain auxiliary unless a later Gate 3 source-localization pass establishes a substantive, bounded mechanic claim.
- Commander Compass material exists in the raw profile and generated faction output, but it is recommendation/product/card support. It must not be used as identity proof unless rebound to source-backed substantive claims.
- Local Rakdos architecture/taxonomy docs are discovery/evidence-planning guides only. `docs/reference/ravnica-guild-source-readiness-matrix.md` explicitly says architecture/metaphysics docs do not become evidence for raw/profile/placement fields without later promoted source or evidence-ledger rows.

### Profile entailment audit

| Section | Status | Notes |
|---|---|---|
| Profile overview | FAIL | Uses claims 001-006, but those claims lack semantic roles and locators. |
| Core identity | FAIL | Cites discovery claims 0007-0014. |
| Philosophy | UNRESOLVED | Plausible, but must be rebound to official/local source evidence or narrowed. |
| Internal tension | FAIL | Uses discovery claims; also risks overbroad violence/hedonism/anti-authoritarian framing without bounded proof. |
| Guild/institutional role | FAIL | Structure cites discovery records despite a plausible official overview source. |
| Key figures | FAIL | Rakdos may be supportable via claim 004; Rakdos the Defiler, Exava, and Judith are discovery-only as currently cited. |
| Mechanics/play pattern | FAIL | Spectacle is likely supportable by claim 005, but current mechanics chain cites discovery records. |
| Mature expression | UNRESOLVED | Current packet does not have a clear mature-expression section under Contract v1.1. |
| Unhealthy expression | UNRESOLVED | Current packet has dangerous-cult language but not a bounded Contract v1.1 unhealthy-expression proof chain. |
| Failure/pressure behavior | UNRESOLVED | Needs claim extraction; current public phrases risk generic chaos/cruelty overfit. |
| Placement-facing summary | FAIL | Discovery-backed and missing substantive proof chain. |

### Placement entailment audit

| Section | Status | Notes |
|---|---|---|
| Ideal/good-fit indicators | FAIL | Cite unclassified claims 001-003; no semantic roles/locators. |
| Poor-fit indicators | FAIL | Cite unclassified claims 001-003; no negative/exclusion evidence mapping. |
| Discriminator questions | FAIL | Useful questions exist, especially `rakdos_q3`, but evidence mappings point to unclassified claims. |
| Recruiter match guidance | FAIL | No `semantic_guidance_evidence` / evidence mappings for guidance strings. |
| Recruiter mismatch guidance | FAIL | No evidence mappings. |
| Uncertainty guidance | FAIL | No evidence mappings; only two uncertainty prompts. |
| Placement summary | FAIL | Discovery-backed and mixed with unclassified evidence. |
| Placement axes | FAIL | Axis proof is discovery-backed; frozen-field care required in Gate 3. |
| Collision guidance | FAIL | Empty. |
| Lateral inhibition | PASS WITH NON-BLOCKING LIMITATION | Existing generated targets are present, but Gate 3 must not change inhibition behavior without authorization. |

### Required Contract v1.1 dimensions

| Dimension | Status | Notes |
|---|---|---|
| Core identity | FAIL | No substantive claim roles; discovery-backed core identity chain. |
| Internal tension | FAIL | Needs bounded support and anti-overfit narrowing. |
| Motivation | UNRESOLVED | Existing phrasing needs source-backed extraction. |
| Preferred method | UNRESOLVED | Performance/spectacle/transgression likely supportable, but not yet localized. |
| Mature expression | FAIL | Missing explicit supported section. |
| Unhealthy expression | FAIL | Missing explicit supported section; current dangerous-cult language needs bounds. |
| Failure/pressure behavior | FAIL | Missing supported chain. |
| Positive inclusion evidence | FAIL | Claims 001-006 not certifying yet. |
| Negative exclusion evidence | FAIL | Collision guidance is empty. |
| Ambiguous/uncertainty evidence | FAIL | Questions exist but lack mapped substantive support. |
| Required-neighbor boundaries | FAIL | No bounded collision guidance. |
| Source-to-runtime traceability | FAIL | Discovery records and null canonical IDs appear in generated provenance. |

### Required-neighbor audit

Bounded required-neighbor set proposed for Gate 3:

`GENERIC_BR_OVERFIT`, `B`, `R`, `WR`, `RG`, `BG`, `WB`, `UR`, `PRISMARI`, `GRIXIS`, `JUND`, `MARDU`.

This set is bounded by same-color overfit, existing BR lateral/collision references, certified/current neighbor guidance, and the observed ambiguity around spectacle, chaos, sacrifice, pain, aggression, performance, and black-red genericity. Non-blocking possible follow-ups: `SILVERQUILL` for performance/status rhetoric and `DIMIR` for secrecy vs public spectacle if later evidence shows direct ambiguity.

### Generated propagation audit

| Consumer | Result |
|---|---|
| `data/factions.json#/factions/BR` | FAIL: generated key figures include discovery-only claims as source-backed evidence; public copy contains high-heat phrases requiring support or narrowing. |
| `data/placement-model.json#/factions/BR` | FAIL: collision guidance is empty; placement chains preserve discovery/unclassified support. |
| `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/BR` | FAIL: recruiter guidance lacks authoritative evidence mappings; generated copy preserves current overbroad phrases. |
| `data/semantic-readiness-provenance.json` | FAIL: 31 BR entries have null canonical IDs; 26 chains use discovery claims; content hashes are non-null. |
| Semantic fixtures | FAIL: BR fixtures are missing. |

### Target-specific stale public-copy phrase risks

Gate 1+2 stale phrase scan terms for Rakdos / BR:

`Pain is entertainment`, `Death is the final punchline`, `burning the stage down`, `generic evil`, `random chaos`, `gore`, `horror`, `mayhem`, `chaos`, `cruelty`, `hedonism`, `pain`, `death`, `slaughter`, `reckless`, `depravity`, `sadistic`, `lawless`, `rule-breaking`.

Observed target-specific risks:

- `data/factions.json#/factions/BR/tagline`: `Pain is entertainment. Death is the final punchline.` requires source-backed support or narrowing.
- Commander Compass `allowed_phrases` includes `burning the stage down`; treat as support/recommendation texture only or narrow.
- Generated and placement copy repeatedly use `chaos`, `cruelty`, `death`, `pain`, `slaughter`, `reckless`, and `hedonism`; these are not globally banned, but each retained authoritative/public statement must be source-supported and bounded away from generic evil/violence.
- `generic evil` appears as a guardrail in generated context; acceptable only as a negative guardrail, not positive identity proof.

### Findings by severity

#### BLOCKER

1. All 16 Rakdos claims lack certifying `semantic_role`.
2. All 16 Rakdos claims lack bounded `evidence_locations`.
3. Authoritative profile and placement chains have no substantive claims under Contract v1.1.
4. Discovery-only story-corpus records are used as authoritative semantic proof.
5. Generated BR key-figure chains present discovery records as source-backed faction evidence.
6. BR generated provenance includes discovery-backed semantic chains and 31 null canonical IDs.
7. `collision_guidance` is empty.
8. Required-neighbor boundaries are missing.
9. Recruiter guidance lacks evidence mappings.
10. BR semantic fixtures are missing.

#### HIGH

1. Current key figures beyond Rakdos (`Rakdos the Defiler`, `Exava`, `Judith`) are discovery-only and should be removed from authoritative key figures unless source-read and rebound to substantive claims.
2. Current public/generated copy risks overbroad generic evil/chaos/cruelty/death/pain framing without bounded source support.
3. Current placement axis and moral/psychological profile rely on corpus-search terms rather than substantive semantic evidence.
4. Commander/card/product material risks being treated as identity proof if not isolated.

#### MEDIUM

1. Existing official/local sources likely support a bounded minimal recovery, but exact locators need to be added.
2. The local MaRo Rakdos two-color philosophy file is useful for evidence planning and may be an official local source candidate if Gate 3 adds it explicitly; it is not currently in the Rakdos source ledger.
3. Unleash/Rix Maadi/Judith/Exava claims may require story or card source localization if retained; not required for minimal certification if omitted from authoritative proof chains.

#### LOW

1. The packet has useful VM-344 question work (`rakdos_q3`) that should be preserved after evidence remapping.
2. Content hashes are non-null in current BR provenance, so the null-provenance issue is canonical-ID/sourceability rather than missing hashes.

#### NON-BLOCKING OBSERVATION

- Local Rakdos architecture/taxonomy files are rich discovery guides and anti-drift references, but they are not raw/profile/placement proof under the current source-authority record.

### Maturity / packet test

Choice: **Structurally valid but needs targeted semantic remediation.**

Rationale: Rakdos is not a zero-evidence thin packet. It has official overview/mechanics source rows and existing placement questions. However, it fails Contract v1.1 because the canonical proof model is immature: no semantic roles, no bounded locators, discovery records in authoritative chains, missing collision guidance, missing fixtures, and generated proof-chain contamination.

## Gate 2 — Evidence Confirmation

### Evidence sufficiency decision

No broad online source discovery is required before Gate 3. Gate 3 should first localize evidence against existing listed/local sources:

- `src_wotc_flavorful_guide_ravnica_allegiance_2019`
- `src_wotc_ravnica_allegiance_mechanics_2018`
- `src_wotc_dragons_maze_mechanics_2013` only as support unless promoted by bounded source review
- local official MaRo two-color Rakdos philosophy file as a potential added source only if Gate 3 needs black-red philosophy support beyond the current official guild overview/mechanics rows

Stop for source-localization approval if exact bounded locators for the official overview/mechanics sources are unavailable locally, or if retaining high-heat phrases such as `Pain is entertainment`, `Death is the final punchline`, `burning the stage down`, generic `cruelty`, `slaughter`, or unsupported chaos/pain/death language requires evidence not already listed/local.

### Claim-extraction / splitting plan

Minimal proposed Gate 3 claim areas:

| Purpose | Existing source to read first | Supports | Required? |
|---|---|---|---|
| Rakdos core identity as BR Ravnica guild/institution | Official Ravnica Allegiance flavorful guide, Rakdos section | Core identity, profile overview, generated summary | Yes |
| Rakdos role as performers/entertainers/hosts with destructive or hedonistic performances | Official Ravnica Allegiance flavorful guide | Guild role, public copy, profile structure | Yes |
| Loose organization around Rings/troupes/clubs/festivals if bounded | Official Ravnica Allegiance flavorful guide | Structure/location/social role | Yes if retained |
| Rakdos as demon founder/namesake/patron | Official Ravnica Allegiance flavorful guide | Key figure `char_rakdos`; native ID retention | Yes |
| Spectacle mechanic and opponent-life-loss gate | Official Ravnica Allegiance mechanics article | Mechanics, placement, fixture | Yes |
| Motivation / preferred method: performance, transgression, sensation, danger, public consequence | Claims 001/002/005 plus possible local MaRo source | Placement summary, recruiter guidance | Yes |
| Mature expression | Claims 001/002/005/006 after narrowing | Match guidance and inclusion fixture | Yes |
| Unhealthy expression | Official/local sources; avoid generic unsupported evil | Mismatch guidance, pressure fixture | Yes |
| Failure/pressure behavior | Official/local sources; possibly MaRo if added | Pressure fixture, uncertainty guidance | Yes |
| Required-neighbor boundaries | Rakdos positive claims plus certified/current comparator packets | Collision guidance and exclusion fixtures | Yes |
| Key figures beyond Rakdos | Story/card sources only after source-read | Optional key figure expansion | Optional / defer unless evidence is localized |
| Unleash/Rix Maadi/Judith/Exava | Existing discovery rows point to leads; need source-read | Optional mechanics/figure/location proof | Optional / not required for minimal certification |

### Discovery-record replacement plan

- Replace profile `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, `/mechanics`, `/canonical_flavor_text/0`, and authoritative `/key_figures/*` references with substantive claims only.
- Keep claims 0007-0016 as discovery metadata unless Gate 3 source-reads and splits them.
- Remove `Rakdos the Defiler`, `Exava`, and `Judith` from authoritative key figures unless bounded substantive evidence exists. They may remain as retained native IDs or auxiliary discovery metadata if the schema supports it.
- Rebuild generated consumers only in Gate 4 after canonical proof chains are clean.

### Support-record isolation plan

- Keep `src_wotc_dragons_maze_mechanics_2013` support-only unless Gate 3 establishes a bounded substantive claim from it.
- Keep Commander Compass/card/product/deck recommendation material auxiliary; do not use it as identity proof.
- Mechanics may support identity only when an official source ties the mechanic to Rakdos identity. `Spectacle` is likely required; `Unleash` should not be retained as authoritative unless localized.

### Profile support plan

| Section | Gate 3 plan |
|---|---|
| Core identity | Rebind to localized substantive claims 001 and/or new split claims. |
| Philosophy | Preserve only if source-backed; otherwise narrow to official guide/mechanics language. |
| Internal tension | Rebuild from source-backed performance/transgression/cost evidence; avoid generic evil/violence. |
| Guild/institutional role | Rebind to official guide claims around entertainers/hosts/Rings/troupes if localized. |
| Key figures | Keep Rakdos if claim 004 is localized; remove or demote others unless source-backed. |
| Locations | Do not add Rix Maadi authoritative proof unless story/source localization supports it. |
| Mechanics/play pattern | Rebind Spectacle to claim 005 and localized mechanics locator. |
| Mature expression | Add bounded supported section. |
| Unhealthy expression | Add bounded supported section without overbroad stereotype. |
| Failure/pressure behavior | Add bounded supported section. |
| Placement-facing summary | Rebuild from substantive claims only. |

### Placement support plan

| Section | Gate 3 plan |
|---|---|
| Placement summary | Remove discovery claim IDs; use substantive claims and preserve calibrated fields where frozen. |
| Core values | Replace corpus-search terms with source-backed values or remove unsupported values. |
| Behavioral signals | Replace story-corpus search evidence with substantive supported signals. |
| Positive guidance | Add evidence mappings from substantive claims. |
| Negative guidance | Add exclusion evidence and avoid generic chaos/violence stereotypes. |
| Uncertainty guidance | Add evidence mappings and neighbor-aware questions. |
| Raw discriminator questions | Preserve useful question intent, especially `rakdos_q3`; remap to substantive claims. |
| Neighbor guidance | Add bounded required-neighbor evidence for the selected set. |
| Collision guidance | Add explicit rows without changing lateral-inhibition behavior unless separately authorized. |
| Recruiter-facing guidance | Add `semantic_guidance_evidence` for match/mismatch/uncertainty guidance. |

### Recruiter guidance evidence mapping plan

Gate 3 must map each current guidance item to substantive claims or narrow/remove it:

- Match: `uses performance to reveal truth` → source-backed performance/transgression claim.
- Match: `chooses intensity over polite safety` → source-backed intensity/spectacle claim; narrow if unsupported.
- Match: `finds hypocrisy more offensive than disruption` → support only if official/local source proves hypocrisy/truth pressure; otherwise narrow/remove.
- Mismatch: `needs stability and restraint above all` → negative evidence against Rakdos performance/transgression.
- Mismatch: `avoids attention and spectacle` → Spectacle/performance claims.
- Mismatch: `finds transgression meaningless rather than clarifying` → transgression/performance claim; narrow if “clarifying” is unsupported.
- Uncertainty questions: add evidence mappings and neighbor targets.

### Collision guidance and required-neighbor evidence plan

Gate 3 should add bounded collision guidance for:

`GENERIC_BR_OVERFIT`, `B`, `R`, `WR`, `RG`, `BG`, `WB`, `UR`, `PRISMARI`, `GRIXIS`, `JUND`, `MARDU`.

Each row must include positive Rakdos inclusion evidence, negative/exclusion evidence, ambiguity handling, claim/source support, question/guidance traceability, and no unauthorized lateral-inhibition behavior change.

### Generated/public copy risk plan

| Current phrase / risk | Current source field | Gate 3/4 action |
|---|---|---|
| `Pain is entertainment. Death is the final punchline.` | `data/factions.json` generated from raw display/profile fields | Source-support exactly or narrow/remove in canonical source before Gate 4. |
| `burning the stage down` | Commander Compass support copy | Keep auxiliary only or narrow; never identity proof. |
| Generic `chaos` | profile/placement/generated | Retain only where tied to Rakdos performance/transgression/spectacle, not generic chaos. |
| `cruelty`, `slaughter`, `death`, `pain` | profile/placement/generated/Commander | Require bounded support and avoid positive stereotype overfit. |
| `reckless` | generated/product support and neighbor copy | Use only if source-backed or as negative/adjacent guardrail. |
| `generic evil` | generated guardrail | Acceptable as negative guardrail, not positive proof. |

### Provenance repair plan

Gate 3 should make canonical statements sourceable; Gate 4 should regenerate provenance. Required outcomes:

- no discovery-only claims in authoritative BR generated provenance chains;
- no support-only or Commander/product/card records used as semantic proof;
- canonical IDs present for required BR provenance entries;
- canonical content hashes remain non-null;
- generated consumer coverage includes BR faction model, placement model, recruiter context, and provenance manifest;
- no unrelated identity provenance churn.

### Semantic fixture plan

Gate 4 should add BR fixtures only after Gate 3 canonical remediation:

- one core-inclusion fixture;
- one mature or pressure-behavior fixture;
- one generic-BR exclusion fixture;
- one exclusion fixture per retained required neighbor;
- one nearest-collision ambiguous fixture;
- one provenance fixture proving substantive-claim traceability.

## Exact Gate 3 remediation checklist

Required for certification:

1. Add certifying `semantic_role` to all 16 existing Rakdos claims.
2. Add bounded `evidence_locations` to all retained substantive claims.
3. Classify claims 001-006 as substantive only after bounded localization; narrow/split claim 006 as project synthesis if retained.
4. Classify claims 0007-0016 as discovery records unless source-read and split into new substantive claims.
5. Remove discovery-only records from authoritative profile, placement, key-figure, generated, and provenance proof chains.
6. Rebind core identity, philosophy, structure, great tension, mechanics, and placement-facing summary to substantive claims only.
7. Keep Rakdos as an authoritative key figure only if claim 004 is localized; remove/demote Rakdos the Defiler, Exava, and Judith unless source-backed.
8. Keep Commander/card/product/local architecture material auxiliary unless rebound to source-backed substantive claims.
9. Add evidence mappings for match, mismatch, and uncertainty recruiter guidance.
10. Add bounded required-neighbor/collision guidance for `GENERIC_BR_OVERFIT`, `B`, `R`, `WR`, `RG`, `BG`, `WB`, `UR`, `PRISMARI`, `GRIXIS`, `JUND`, and `MARDU`, with no unauthorized inhibition behavior change.
11. Preserve frozen confidence/scoring/calibration fields; do not change runtime scoring behavior.
12. Restore/retain any required native IDs as metadata only if the candidate-scope guard expects them.
13. Narrow or remove unsupported high-heat public copy: `Pain is entertainment`, `Death is the final punchline`, `burning the stage down`, generic evil/chaos/cruelty/death/pain/slaughter/reckless language.
14. Update Rakdos changelog/readiness evidence for Gate 3 only.
15. Stop before Gate 4 generation.

Optional / non-blocking:

- Promote Judith, Exava, Rakdos the Defiler, Rix Maadi, or Unleash only if bounded story/card/mechanics evidence is localized.
- Add Silverquill or Dimir boundary only if direct ambiguity appears during Gate 3.
- Improve local architecture/taxonomy docs later; do not use them as proof in CRIT-001.

Out of scope for CRIT-001 Gate 3:

- Runtime tuning, score calibration changes, Hall/Crucible edits, broad lore enrichment, online source discovery without approval, generated artifact rebuilds, candidate creation, certification.

## Stop / proceed decision

Proceed to Gate 3 only with explicit authorization for canonical remediation. Gate 3 should start from existing listed/local sources and stop if bounded official locators cannot be established or if high-heat public copy is retained without exact source support.

Do not proceed to Gate 4, Gate 5, independent review, certification, or another identity from this Gate 1+2 deliverable.

## Validation

Commands run:

- `git status --short --branch` — clean at preflight and after read-only validation before documentation edits.
- `node research/audit-semantic-readiness.mjs --targets=BR` — passed structurally; reported 16 claims, role counts `0 substantive / 10 discovery / 0 support / 6 unclassified`, 2 claim-bearing sources, 1 support-only source, 10 discovery-only sources, low-volume/discovery-heavy risk.
- `node research/validate-semantic-readiness.mjs --targets=BR` — failed as expected for Gate 1 blockers: missing semantic roles, missing recruiter evidence mappings, authoritative references without substantive claims, and missing BR fixtures.
- JSON parse check for `cult_of_rakdos.claims/sources/profile/placement/changelog.json` — passed.
- Generated/provenance inspection for BR — found generated key-figure discovery contamination, 31 null canonical IDs, 0 null content hashes, and 26 discovery-backed provenance chains.

`git diff --check` is run after documentation updates.

## Final Gate 1+2 status

- Gate 1 audit: complete.
- Gate 2 bounded evidence confirmation: complete.
- Primary disposition: **Claim-extraction pass required.**
- Gate 3 required: yes, canonical remediation only after explicit authorization.
- Broad online source discovery required before Gate 3: no.
- Bounded source localization required in Gate 3: yes.
- Rakdos raw/generated files changed: no.
- No candidate commit created.
- No certification created.
- No other identity started.

## Gate 3+4 Remediation and Validation

### Gate 3+4 preflight

- Worktree path confirmed before edits: `C:\dev\mtgSiteWIP-crit001`
- Branch confirmed before edits: `codex/vm-510-rakdos-semantic-recovery`
- Starting SHA for this Gate 3+4 task: `30bd86bec4134cbdd136fe0c73f052f92a00bd96`
- Worktree status before edits: clean
- Original main worktree `C:\dev\mtgSiteWIP` was checked read-only and not touched; its pre-existing dirty docs/workflow baseline remained outside this task.
- VM-510 Gate 1+2 report was present and committed at `30bd86bec4134cbdd136fe0c73f052f92a00bd96`.
- No online source intake was performed.

### Files changed

- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.claims.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/cult_of_rakdos.semantic-fixtures.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/board.md`

### Files intentionally not changed

- `docs/reference/semantic-readiness-contract.md`
- `data/raw-factions/semantic-readiness.schema.json`
- `research/build-faction-artifacts.mjs`
- `research/semantic-readiness-lib.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- Hall, Crucible, scoring, confidence, calibration, scheduling, tie-order, and global recruiter runtime files
- Other raw identity packets
- `C:\dev\mtgSiteWIP`

### Claim role assignment

| Claim | Gate 3 role | Evidence locator / use |
|---|---|---|
| `cult_of_rakdos_claim_001` | `substantive_claim` | Official source record: `A Flavorful Guide to the Guilds of Ravnica Allegiance - Rakdos reviewed source record`; direct support for black-red guild identity, performance, dangerous entertainment, provocation, and public transgression. |
| `cult_of_rakdos_claim_002` | `substantive_claim` | Same official guide record; direct support for entertainers/hosts and destructive or hedonistic performances. |
| `cult_of_rakdos_claim_003` | `substantive_claim` | Same official guide record; direct support for Rings and travelling theater-troupe organization. |
| `cult_of_rakdos_claim_004` | `substantive_claim` | Same official guide record; direct support for Rakdos as ancient demon, founder, namesake, and object of worship. |
| `cult_of_rakdos_claim_005` | `substantive_claim` | Official mechanics source record: `Ravnica Allegiance Mechanics - Spectacle / Rakdos reviewed source record`; direct support for spectacle as the Rakdos mechanic. |
| `cult_of_rakdos_claim_006` | `substantive_claim` | Official guide plus mechanics records; bounded project synthesis for placement signals requiring performance, spectacle, transgression, sensation, danger, audience, cost, or consequence rather than generic BR aggression. |
| `cult_of_rakdos_claim_0007` through `cult_of_rakdos_claim_0016` | `discovery_record` | Retained as discovery/search history only. Removed from authoritative proof chains and stored only as metadata/history under `retained_discovery_claim_ids`. |
| `cult_of_rakdos_claim_0017` | `substantive_claim` | Official guide plus mechanics records; bounded synthesis for motivation/preferred method as public release through performance, appetite, provocation, sensation, and visible cost. |
| `cult_of_rakdos_claim_0018` | `substantive_claim` | Official guide plus mechanics records; bounded synthesis for mature expression as performance/spectacle/transgression with appetite, cost, or social pressure visible. |
| `cult_of_rakdos_claim_0019` | `substantive_claim` | Official guide plus mechanics records; bounded synthesis for unhealthy expression when performance/audience/cost frame disappears. |
| `cult_of_rakdos_claim_0020` | `substantive_claim` | Official guide plus mechanics records; bounded synthesis for pressure behavior and false-positive suppression. |
| `cult_of_rakdos_claim_0021` | `substantive_claim` | Official guide plus mechanics records; generic BR overfit boundary. |
| `cult_of_rakdos_claim_0022` | `substantive_claim` | Official guide plus mechanics records; B/private leverage boundary. |
| `cult_of_rakdos_claim_0023` | `substantive_claim` | Official guide plus mechanics records; R/direct impulse boundary. |
| `cult_of_rakdos_claim_0024` | `substantive_claim` | Official guide plus mechanics records; WR/Boros discipline and protection boundary. |
| `cult_of_rakdos_claim_0025` | `substantive_claim` | Official guide plus mechanics records; RG/Gruul dispossession and anti-civilization boundary. |
| `cult_of_rakdos_claim_0026` | `substantive_claim` | Official guide plus mechanics records; BG/Golgari survival, rot, and recursion boundary. |
| `cult_of_rakdos_claim_0027` | `substantive_claim` | Official guide plus mechanics records; WB/Orzhov obligation and debt boundary. |
| `cult_of_rakdos_claim_0028` | `substantive_claim` | Official guide plus mechanics records; UR/Izzet experiment and invention boundary. |
| `cult_of_rakdos_claim_0029` | `substantive_claim` | Official guide plus mechanics records; Prismari craft/expression boundary. |
| `cult_of_rakdos_claim_0030` | `substantive_claim` | Official guide plus mechanics records; Grixis survival leverage/control boundary. |
| `cult_of_rakdos_claim_0031` | `substantive_claim` | Official guide plus mechanics records; Jund predation/survival appetite boundary. |
| `cult_of_rakdos_claim_0032` | `substantive_claim` | Official guide plus mechanics records; Mardu martial oath/momentum boundary. |

Final claim counts: 32 total; 22 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, 0 `unclassified`.

### Authoritative chain cleanup

- Profile identity, site surface, structure, great tension, mechanics, and flavor anchor now cite only substantive claims.
- Discovery-only story-corpus claims are retained as `retained_discovery_claim_ids`, not `claim_ids`.
- Generated BR key figures now include only `Rakdos` with `cult_of_rakdos_claim_004` and `src_wotc_flavorful_guide_ravnica_allegiance_2019`.
- `Rakdos the Defiler`, `Exava`, and `Judith` native IDs are retained as discovery metadata only, not generated key figures or proof chains.
- Commander Compass remains auxiliary product guidance; its supporting claim/source basis was narrowed to substantive claims and official source IDs.

### Collision guidance

Required-neighbor set retained exactly:

`GENERIC_BR_OVERFIT`, `B`, `R`, `WR`, `RG`, `BG`, `WB`, `UR`, `PRISMARI`, `GRIXIS`, `JUND`, `MARDU`.

All 12 collision rows were added with `lateral_inhibition: false`. Generated BR `lateral_inhibition_targets` remained unchanged:

`RG`, `PRISMARI`, `WR`, `GRIXIS`, `JUND`, `MARDU`.

No required neighbor was removed. No Dimir boundary was added because Gate 3 evidence did not require expanding beyond the Gate 1+2 proposed set.

### Fixtures

Added `research/fixtures/semantic-readiness/cult_of_rakdos.semantic-fixtures.json` with:

- core inclusion fixture for source-bounded public spectacle;
- mature/pressure fixture for visible-cost behavior;
- required-neighbor exclusion fixtures for all 12 retained neighbors;
- nearest-collision ambiguity fixture for generic BR heat vs Rakdos performance;
- provenance fixture for `/placement_summary`.

### Stale phrase handling

- Removed/narrowed unsupported public copy: `Pain is entertainment`, `Death is the final punchline`, `burning the stage down`, generic random-disruption/chaos copy, generic pain-as-identity copy, and broad cruelty/hedonism framing.
- Retained `hedonistic` only inside `cult_of_rakdos_claim_002`, where it is bounded to the official role source record.
- Retained `generic evil`, `chaos`, and `rule-breaking` only as negative guardrails or frozen calibration language, not positive Rakdos proof.
- Retained `Mayhem Devil`, `Kroxa, Titan of Death's Hunger`, `Mogis, God of Slaughter`, and `deathtouch` as exact Magic card/keyword/product-support names, not semantic identity proof.
- Narrowed product-copy uses of `death` and `chaos` to `creatures dying` and `high-variance effects` where they were not exact names or frozen guardrails.

### Generated artifacts and provenance

- Standard generation command run: `npm.cmd run build:factions`
- Updated generated consumers: `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, `supabase/functions/guild-recruiter/faction-context.ts`
- BR provenance after regeneration: 75 entries, 0 null canonical IDs, 0 null content hashes, 0 discovery-backed chains.
- Generated collision guidance survived with targets normalized to `BR`, `B`, `R`, `WR`, `RG`, `BG`, `WB`, `UR`, `PRISMARI`, `GRIXIS`, `JUND`, `MARDU`.
- Generated lateral-inhibition targets did not drift.

### Validation results

- JSON parse checks for Rakdos raw files and BR fixture: passed.
- `npm.cmd run build:factions`: passed; rebuilt required generated artifacts.
- `node research/audit-semantic-readiness.mjs --targets=BR`: passed; reported 32 claims, role counts `22 substantive / 10 discovery / 0 support / 0 unclassified`, 13 sources, 67 reference sites, no invalid support links.
- `node research/validate-semantic-readiness.mjs --targets=BR`: passed.
- `node research/semantic-candidate-scope-tests.js`: passed.
- `npm.cmd run test:semantic-readiness`: passed; verified 1576 semantic provenance entries.
- `npm.cmd run test:placement`: passed; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: passed.
- Candidate-scope worktree dry-run using the candidate-scope guard exports: passed for `BR` against `30bd86bec4134cbdd136fe0c73f052f92a00bd96..worktree` without creating a commit.

- `git diff --check`: passed after final documentation updates.

### Gate 3+4 status

- Gate 3 canonical remediation: complete in worktree.
- Gate 4 generation and validation: complete in worktree.
- Gate 5 candidate commit: not created.
- Certification: not performed.
- Other identity started: no.
- Recommendation: proceed to Gate 5 candidate creation only after explicit authorization.

## Gate 5 Candidate Creation

### Gate 5 preflight

- Worktree path confirmed: `C:\dev\mtgSiteWIP-crit001`.
- Branch confirmed: `codex/vm-510-rakdos-semantic-recovery`.
- Starting SHA before Gate 3+4 worktree edits: `30bd86bec4134cbdd136fe0c73f052f92a00bd96`.
- Candidate creation started from dirty worktree containing only completed VM-510 Gate 3+4 semantic and governance changes.
- Original main worktree `C:\dev\mtgSiteWIP` was checked read-only and not touched; its pre-existing dirty docs/workflow baseline remained outside this task.

### Final pre-candidate validation

- JSON parse checks for Rakdos raw files and BR fixture: passed.
- `npm.cmd run build:factions`: passed.
- `node research/audit-semantic-readiness.mjs --targets=BR`: passed.
- `node research/validate-semantic-readiness.mjs --targets=BR`: passed.
- `node research/semantic-candidate-scope-tests.js`: passed.
- `npm.cmd run test:semantic-readiness`: passed.
- `npm.cmd run test:placement`: passed.
- `npm.cmd run test:faction-context-isolation`: passed.
- Candidate-scope worktree dry-run against `30bd86bec4134cbdd136fe0c73f052f92a00bd96..worktree`: passed.
- `git diff --check`: passed.

### Candidate commit

- Candidate commit created: `c96ceea602370fd146cdad5393d17e4cf68f8aa3`.
- Candidate commit message: `VM-510 remediate Rakdos semantic readiness candidate`.
- Candidate commit contains only Rakdos semantic remediation candidate files and required generated/fixture artifacts.
- No governance/report files are included in the candidate commit.
- No Contract v1.1, schema, builder, validator, runtime, scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, or global recruiter behavior files are included in the candidate commit.

### Workflow state

- Rakdos candidate created.
- Rakdos is awaiting independent review.
- Rakdos is not certified.
- Certification SHA: none yet.
- No next identity started.
- No certification occurred.
