# VM-511 - Golgari Semantic Recovery

## Identity and Contract

- Identity key: `BG`
- Identity name: Golgari Swarm / Golgari
- Raw packet directory: `data/raw-factions/golgari_swarm/`
- Cohort: guild
- Contract version: CRIT-001 Contract v1.1
- Program base / VM-510 certification base: `5c221f342ae4f95920ece35261dd7f34afeaa667`
- Active branch: `codex/vm-511-golgari-semantic-recovery`
- Starting SHA: `5c221f342ae4f95920ece35261dd7f34afeaa667`
- Operating playbook: `docs/incidents/CRIT-001-operating-playbook.md` v2

## Gate 0 - Campaign Operating Check

- Active worktree confirmed: `C:\dev\mtgSiteWIP-crit001`
- Active branch confirmed: `codex/vm-511-golgari-semantic-recovery`
- Current HEAD at audit start: `5c221f342ae4f95920ece35261dd7f34afeaa667`
- Corrected original-main safety rule applied: `C:\dev\mtgSiteWIP` retained only the known unrelated dirty docs/workflow baseline and had no unexpected raw/generated/data changes.
- Scope: Gate 1+2 read-only audit and bounded evidence confirmation only.
- Not touched: Golgari raw packet, generated artifacts, semantic fixtures, builders, validators, schemas, contract, runtime, Hall, Crucible, scoring, inhibition, confidence, calibration, scheduling, tie ordering, and global recruiter behavior.

## Gate 1 - Audit

### Executive summary

Golgari is not certifiable as-is. The packet is structurally present and has three claim-bearing official source records, one support-only mechanics record, and ten discovery-only story-corpus records, but every claim lacks `semantic_role` and bounded `evidence_locations`. Authoritative profile, placement, generated key-figure, and provenance chains currently rely on unclassified or discovery-only records. `collision_guidance` is empty and BG semantic fixtures are missing.

Primary disposition: **Claim-extraction pass required.**

Gate 2 conclusion: existing listed/local evidence is sufficient to authorize a bounded Gate 3 remediation. Gate 3 must localize exact evidence against existing official/listed sources and the local official black-green philosophy file if added. Stop if official overview/mechanics/prerelease locators cannot be bounded, if story-only figures are retained as proof without source-read evidence, or if required-neighbor distinctions cannot be supported from local evidence.

### Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-0817-codex-vm510-rakdos-certification.md`
- `docs/handoffs/2026-07-15-2358-codex-vm510-rakdos-review-fix.md`
- `docs/handoffs/2026-07-15-2252-codex-vm510-rakdos-gate3-gate4.md`
- `docs/handoffs/2026-07-15-1656-codex-vm510-rakdos-gate1-gate2.md`
- `docs/handoffs/2026-07-15-1556-codex-vm540-operating-playbook-gate-zero.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/research/canon/ten-guild-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/guilds/golgari/README.md`
- `docs/research/canon/guilds/golgari/SOURCES.md`
- `data/raw-factions/golgari_swarm/golgari_swarm.claims.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.sources.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.profile.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.changelog.json`
- `data/factions.json` BG generated consumer
- `data/placement-model.json` BG generated consumer
- `supabase/functions/guild-recruiter/faction-context.ts` BG generated consumer
- `data/semantic-readiness-provenance.json` BG provenance entries

### Structural facts

| Item | Result |
|---|---:|
| Claim records | 17 |
| Sources | 14 |
| Claim-bearing sources | 3 |
| Support-only sources | 1 |
| Discovery-only sources | 10 |
| Claims with `semantic_role` | 0 |
| Claims with bounded `evidence_locations` | 0 |
| Raw discriminator questions | 3 |
| Collision guidance rows | 0 |
| BG provenance entries inspected | 40 |
| BG provenance entries with null `canonical_id` | 31 |
| BG provenance entries with null `canonical_content_hash` | 0 |
| Semantic fixtures | Missing |

### Claim-role audit

Current Contract v1.1 role status: no claims have certifying `semantic_role` values.

| Claim | Current type | Proposed role | Gate 3 action |
|---|---|---|---|
| `golgari_swarm_claim_001` | identity | `substantive_claim` | Localize against official Golgari overview and prerelease primer; narrow if needed. |
| `golgari_swarm_claim_002` | role | `substantive_claim` | Localize against official Golgari overview. |
| `golgari_swarm_claim_003` | role | `substantive_claim` | Localize against official Golgari overview. |
| `golgari_swarm_claim_004` | history | `substantive_claim` | Localize Svogthir/founder claim against official overview; usable for retained native ID if bounded. |
| `golgari_swarm_claim_005` | leadership | `substantive_claim` | Localize Vraska/Jarad leadership only if official overview supports it; otherwise retain native IDs as discovery metadata only. |
| `golgari_swarm_claim_006` | mechanics | `substantive_claim` | Localize undergrowth against official Guilds of Ravnica mechanics article. |
| `golgari_swarm_claim_007` | placement | `substantive_claim` or bounded project-synthesis claim | Narrow/rewrite as project synthesis from localized identity/mechanics claims plus optional MaRo black-green philosophy source. |
| `golgari_swarm_claim_0008` through `golgari_swarm_claim_0017` | story_corpus_evidence | `discovery_record` | Keep discovery-only unless source-read and split into substantive evidence. |

| Role | Count | Audit confidence | Notes |
|---|---:|---|---|
| `substantive_claim` | 7 proposed | Medium | Claims 001-007 are plausible but need semantic roles and bounded locators. |
| `discovery_record` | 10 proposed | High | Claims 0008-0017 explicitly record search/corpus relevance, not read proof. |
| `support_record` | 0 proposed | High | The support-only source has no current dedicated claim. |
| `unclassified` | 0 proposed after remediation | Medium | Current unclassified count is 7; Gate 3 should eliminate it. |

### Discovery-record audit

Discovery records are currently used as semantic proof in authoritative chains and generated consumers. This is a blocker.

| File | Pointer / area | Discovery records used | Problem | Severity |
|---|---|---|---|---|
| `golgari_swarm.profile.json` | `/core_identity` | 0008-0015 | Core identity cites discovery records rather than substantive claims. | BLOCKER |
| `golgari_swarm.profile.json` | `/site_surface` | 0008-0011 | Public tagline proof chain is discovery-backed. | BLOCKER |
| `golgari_swarm.profile.json` | `/structure` | 0008-0011 | Structure cites discovery records despite plausible official overview support. | BLOCKER |
| `golgari_swarm.profile.json` | `/great_tension` | 0008-0012 | Internal tension proof is discovery-backed. | BLOCKER |
| `golgari_swarm.profile.json` | `/key_figures/1` | 0008-0017 plus unclassified 005 | Vraska is generated as source-backed with discovery-story rows. | BLOCKER |
| `golgari_swarm.profile.json` | `/key_figures/2` | 0008-0009 | Izoni is discovery-only as currently cited. | BLOCKER |
| `golgari_swarm.profile.json` | `/key_figures/3` | 0009/0011/0013 plus unclassified 005 | Jarad is mixed discovery/unclassified as currently cited. | BLOCKER |
| `golgari_swarm.profile.json` | `/mechanics` | 0008-0011 | Undergrowth chain cites discovery records rather than mechanics claim 006. | BLOCKER |
| `golgari_swarm.placement.json` | `/placement_summary` and placement axes/core values | 0008-0015 | Placement relies on corpus-search terms rather than substantive semantic evidence. | BLOCKER |
| `data/factions.json` | `/factions/BG/raw_enrichment/key_figures` | 0008-0017 | Generated key figures present discovery rows as source-backed evidence. | BLOCKER |

Discovery records may remain only in explicit non-authoritative discovery metadata after Gate 3.

### Support-record audit

- `src_wotc_dragons_maze_mechanics_2013` is `support-only` and should remain auxiliary unless a later Gate 3 source-localization pass establishes a substantive, bounded mechanic claim.
- Commander Compass material exists in the raw profile and generated faction output, but it is recommendation/product/card support. It must not be used as identity proof unless rebound to source-backed substantive claims.
- Local Golgari bundle files are implementation/synthesis guides and anti-drift references. They do not become raw/profile/placement proof unless Gate 3 adds or promotes exact source records with bounded evidence locations.
- The local official MaRo black-green philosophy article is available as a potential added source for color-pair philosophy and Selesnya/BG boundaries, but it explicitly says it is about the color-pie intersection and not Golgari-specific lore. Use only with that boundary.

### Profile entailment audit

| Section | Status | Notes |
|---|---|---|
| Profile overview | FAIL | Uses claims 001-007, but those claims lack semantic roles and locators. |
| Core identity | FAIL | Cites discovery claims 0008-0015. |
| Philosophy | UNRESOLVED | Plausible, but must be rebound to official/local source evidence or narrowed. |
| Internal tension | FAIL | Uses discovery claims; succession/overthrow/reanimation language requires bounded support or narrowing. |
| Guild/institutional role | FAIL | Structure cites discovery records despite plausible official overview source. |
| Key figures | FAIL | Svogthir may be supportable by claim 004; Vraska/Jarad may be supportable only if official overview supports them; Izoni is discovery-only as currently cited. |
| Mechanics/play pattern | FAIL | Undergrowth likely supportable by claim 006, but current mechanics chain cites discovery records. |
| Mature expression | UNRESOLVED | Current packet does not have a clear mature-expression section under Contract v1.1. |
| Unhealthy expression | UNRESOLVED | Current packet needs bounded unhealthy-expression proof and anti-overfit language. |
| Failure/pressure behavior | UNRESOLVED | Needs claim extraction; current public phrases risk generic death/rot/graveyard overfit. |
| Placement-facing summary | FAIL | Discovery-backed and missing substantive proof chain. |

### Placement entailment audit

| Section | Status | Notes |
|---|---|---|
| Ideal/good-fit indicators | FAIL | Cite unclassified claims 001-003; no semantic roles/locators. |
| Poor-fit indicators | FAIL | Cite unclassified claims 001-003; no negative/exclusion evidence mapping. |
| Discriminator questions | FAIL | Useful questions exist, especially `golgari_q3`, but evidence mappings point to unclassified claims. |
| Recruiter match guidance | FAIL | No `semantic_guidance_evidence` / evidence mappings for guidance strings. |
| Recruiter mismatch guidance | FAIL | No evidence mappings. |
| Uncertainty guidance | FAIL | No evidence mappings. |
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
| Preferred method | UNRESOLVED | Reclamation, graveyard resources, undergrowth, and undercity survival are plausible but not localized. |
| Mature expression | FAIL | Missing explicit supported section. |
| Unhealthy expression | FAIL | Missing explicit supported section; generic rot/death/zombie/cycle overfit must be bounded. |
| Failure/pressure behavior | FAIL | Missing supported chain. |
| Positive inclusion evidence | FAIL | Claims 001-007 not certifying yet. |
| Negative exclusion evidence | FAIL | Collision guidance is empty. |
| Ambiguous/uncertainty evidence | FAIL | Questions exist but lack mapped substantive support. |
| Required-neighbor boundaries | FAIL | No bounded collision guidance. |
| Source-to-runtime traceability | FAIL | Discovery records and null canonical IDs appear in generated/runtime chains. |

### Required-neighbor audit

Bounded required-neighbor set proposed for Gate 3:

`GENERIC_BG_OVERFIT`, `B`, `G`, `WITHERBLOOM`, `WG`, `WB`, `RG`, `BR`, `UB`, `SIMIC_COMBINE`, `ABZAN`, `JUND`, `SULTAI`.

This set is bounded by same-color overfit, existing BG lateral/collision references, certified/current neighbor guidance, and observed ambiguity around decay, graveyard value, nature, survival, sacrifice, rot, undercity/civic ecology, life/death exchange, appetite, and black-green genericity. Non-blocking possible follow-ups: `ORZHOV` and `SELESNYA` source-localization if Gate 3 needs separate canonical target IDs beyond `WB` and `WG`.

### Generated propagation audit

| Consumer | Result |
|---|---|
| `data/factions.json#/factions/BG` | FAIL: generated key figures include discovery-only claims as source-backed evidence; public copy contains high-heat phrases requiring support or narrowing. |
| `data/placement-model.json#/factions/BG` | FAIL: collision guidance is empty; placement chains preserve discovery/unclassified support. |
| `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/BG` | FAIL: recruiter guidance lacks authoritative evidence mappings; generated copy preserves current overbroad phrases. |
| `data/semantic-readiness-provenance.json` | FAIL: 31 BG entries have null canonical IDs; content hashes are non-null. |
| Semantic fixtures | FAIL: BG fixtures are missing. |

### Target-specific stale public-copy phrase risks

Gate 1+2 stale phrase scan terms for Golgari / BG:

`Nothing is wasted`, `Everything feeds something else`, `Death feeds life`, `The Swarm grows`, `death`, `decay`, `rot`, `graveyard`, `zombie`, `undercity`, `survival`, `reclamation`, `cycle`, `recursion`, `dredge`, `sacrifice`, `poison`, `infection`, `plague`, `growth`, `food`, `hunger`, `inevitability`, `body`, `mortality`.

Observed target-specific risks:

- `data/factions.json#/factions/BG/tagline`: `Nothing is wasted. Everything feeds something else.` requires source-backed support or narrowing.
- Generated and placement copy repeatedly uses `death`, `decay`, `rot`, `graveyard`, `survival`, `cycle`, `reclamation`, and `undercity`; these are not globally banned, but each retained public/authoritative statement must be source-supported and bounded away from generic black-green graveyard value.
- Commander Compass `allowed_phrases` includes `Death feeds life`, `The Swarm grows`, and `Nothing is wasted`; treat as support/recommendation texture only or narrow.
- Current Commander recommendations include non-Ravnica gameplay fits such as `The Gitrog Monster` and `Meren of Clan Nel Toth`; keep them auxiliary and do not use them as Golgari Swarm proof.

### Findings by severity

#### BLOCKER

1. All 17 Golgari claims lack certifying `semantic_role`.
2. All 17 Golgari claims lack bounded `evidence_locations`.
3. Authoritative profile and placement chains have no substantive claims under Contract v1.1.
4. Discovery-only story-corpus records are used as authoritative semantic proof.
5. Generated BG key-figure chains present discovery records as source-backed faction evidence.
6. BG generated provenance includes 31 null canonical IDs.
7. `collision_guidance` is empty.
8. Required-neighbor boundaries are missing.
9. Recruiter guidance lacks evidence mappings.
10. BG semantic fixtures are missing.

#### HIGH

1. Current key figures beyond source-localized rows risk being retained as authoritative proof from discovery-only story rows.
2. Current public/generated copy risks overbroad death/rot/graveyard/zombie/cycle framing without bounded source support.
3. Current placement axis and moral/psychological profile rely on corpus-search terms rather than substantive semantic evidence.
4. Commander/card/product material risks being treated as identity proof if not isolated.

#### MEDIUM

1. Existing official/listed sources likely support a bounded minimal recovery, but exact locators need to be added.
2. The local MaRo black-green philosophy file is useful for evidence planning and may be an official local source candidate if Gate 3 needs black-green philosophy support beyond the current official guild overview/mechanics rows.
3. Vraska/Jarad/Izoni/story-specific claims may require story or card source localization if retained; not required for minimal certification if omitted from authoritative proof chains.

#### LOW

1. The packet has useful VM-344 question work (`golgari_q3`) that should be preserved after evidence remapping.
2. Content hashes are non-null in current BG provenance, so the provenance issue is canonical-ID/sourceability rather than missing hashes.

### Maturity / packet test

Choice: **Structurally valid but needs targeted semantic remediation.**

Rationale: Golgari is not a zero-evidence thin packet. It has official guide/mechanics/prerelease source rows and existing placement questions. However, it fails Contract v1.1 because the canonical proof model is immature: no semantic roles, no bounded locators, discovery records in authoritative chains, missing collision guidance, missing fixtures, generated key-figure contamination, and provenance null-ID defects.

## Gate 2 - Evidence Confirmation

### Evidence sufficiency decision

No broad online source discovery is required before Gate 3. Gate 3 should first localize evidence against existing listed/local sources:

- `src_wotc_flavorful_guide_guilds_ravnica_2018`
- `src_wotc_guilds_ravnica_mechanics_2018`
- `src_wotc_guilds_ravnica_prerelease_primer_2018`
- `src_wotc_dragons_maze_mechanics_2013` only as support unless promoted by bounded source review
- local official MaRo black-green philosophy file as a potential added source only if Gate 3 needs color-pair philosophy or Selesnya/BG boundary support beyond the current official guild overview/mechanics rows

Stop for source-localization approval if exact bounded locators for the official overview/mechanics/prerelease sources are unavailable locally, or if retaining high-heat phrases such as `Nothing is wasted`, `Everything feeds something else`, generic `death`, `rot`, `decay`, `zombie`, `infection`, `plague`, or unsupported graveyard/cycle language requires evidence not already listed/local.

### Claim-extraction / splitting plan

Minimal proposed Gate 3 claim areas:

| Purpose | Existing source to read first | Supports | Required? |
|---|---|---|---|
| Golgari core identity as BG Ravnica guild/institution | Official Guilds of Ravnica flavorful guide and prerelease primer | Core identity, profile overview, generated summary | Yes |
| Undercity/social role, waste/food/city-cycle function | Official flavorful guide | Structure, public copy, institutional role | Yes if retained |
| Founder/leader/key figure retention | Official flavorful guide | Svogthir and possibly Vraska/Jarad native ID retention | Yes if retained as authoritative |
| Undergrowth mechanic and graveyard-creature count | Official mechanics article | Mechanics, placement, fixture | Yes |
| Motivation / preferred method: reclaiming discarded material, graveyard as resource, death-to-life cycle, undercity survival | Claims 001/002/006 plus possible local MaRo source | Placement summary, recruiter guidance | Yes |
| Mature expression | Claims 001/002/006/007 after narrowing | Match guidance and inclusion fixture | Yes |
| Unhealthy expression | Official/local sources; avoid generic unsupported death cult/zombie horde | Mismatch guidance, pressure fixture | Yes |
| Failure/pressure behavior | Official/local sources; possibly MaRo if added | Pressure fixture, uncertainty guidance | Yes |
| Required-neighbor boundaries | Official/local sources plus existing certified neighbor records | Collision guidance and exclusion fixtures | Yes |

### Source sufficiency verdict

**Sufficient for bounded Gate 3 remediation.**

The local repo contains enough listed/local evidence to attempt a minimal recovery without online intake. The Gate 3 remediation must remain bounded to listed/local sources and stop if any retained claim, native ID, public phrase, generated proof chain, or required-neighbor distinction cannot be localized.

## Stop / proceed decision

Proceed to Gate 3 canonical remediation under the current VM-511 Goal authorization. Gate 3 should start from existing listed/local sources and stop if bounded official locators cannot be established or if high-heat public copy is retained without exact source support.

Do not proceed to independent review, certification, or another identity from this Gate 1+2 deliverable.

## Validation

Commands run:

- `git status --short` - clean at preflight and after read-only validation before documentation edits.
- `node research/audit-semantic-readiness.mjs --targets=BG` - passed structurally; reported 17 claims, role counts `0 substantive / 10 discovery / 0 support / 7 unclassified`, 3 claim-bearing sources, 1 support-only source, 10 discovery-only sources, low-volume/discovery-heavy/no-substantive-role risk.
- `node research/validate-semantic-readiness.mjs --targets=BG` - failed as expected for Gate 1 blockers: missing semantic roles, missing recruiter evidence mappings, authoritative references without substantive claims, and missing BG fixtures.
- JSON parse and raw/generated inspection for Golgari raw files, BG generated consumers, and BG provenance entries - passed for parse/inspection; found generated key-figure discovery contamination, 31 null canonical IDs, 0 null content hashes, and missing BG fixtures.

`git diff --check` is run after documentation updates.

## Final Gate 1+2 status

- Gate 1 audit: complete.
- Gate 2 bounded evidence confirmation: complete.
- Primary disposition: **Claim-extraction pass required.**
- Gate 3 required: yes, canonical remediation authorized by current VM-511 Goal if local source localization succeeds.
- Broad online source discovery required before Gate 3: no.
- Bounded source localization required in Gate 3: yes.
- Golgari raw/generated files changed: no.
- No candidate commit created.
- No certification created.
- No other identity started.
