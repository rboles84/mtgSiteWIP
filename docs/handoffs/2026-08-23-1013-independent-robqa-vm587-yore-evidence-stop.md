# Independent RobQA — VM-587 Yore Evidence Stop

- Agent name: Independent RobQA
- Task requested: Independently review exact candidate `bc12a20416ddefdb60b61d3e5c7c9a73e6e826b8`, challenge the legal exact-WUBR command-zone inventory and `NOT_SUPPORTED` decision, verify the placement stop boundary, and select the smallest proportionate validation set.
- Related work: VM-532, VM-551, VM-555, VM-586, VM-587.
- Branch: `codex/vm586-archscry-current-state-evidence`
- Exact candidate reviewed: `bc12a20416ddefdb60b61d3e5c7c9a73e6e826b8`

## Disposition

`PASS Owner Review Ready`

The exact candidate correctly replaces the obsolete Breya-only premise with 12 current legal exact-WUBR command zones, but it does not mistake legal color identity or available mechanics for behavioral identity evidence. Independent reproduction found one Breya single, seven generic Partner pairs, four Friends-forever pairs, zero named-Partner-with pairs, and zero Doctor/Doctor's-companion pairs. The evidence still does not provide two observations that jointly pass independence, behavioral observability, semantic necessity, and anti-proxy robustness, so `NOT_SUPPORTED` and the stop before placement implementation are justified.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and frozen `docs/qa/RobQAPass.md`
- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and frozen `docs/dev/RobDevPass.md`
- Owner-attached `pasted-text.txt`
- Exact commit and parent diff for `bc12a20416ddefdb60b61d3e5c7c9a73e6e826b8`
- All VM-587 evidence, generator, Kanban, and RobDev handoff files in the candidate
- `docs/architecture/colors/yore/identity.md` and `docs/architecture/colors/yore/metaphysics.md`
- `data/raw-factions/yore/yore.placement.json`
- `data/placement/gate-b1-mapping.source.json`
- VM-551 current witness, VM-555 Yore gap row, and relevant VM-551/555/586 handoffs
- `data/scryfall/raw/bulk-manifest.json` and `data/scryfall/raw/oracle-cards.json`
- Three direct-player extracts and the generic Commander negative control named in the source-role ledger
- Read-only artifact-tool inspection of `C:/Users/obake/Downloads/MTG_Partner_Commander_Database_Enriched_Four_Color_Frontier.xlsx`

## Files Changed

- `docs/handoffs/2026-08-23-1013-independent-robqa-vm587-yore-evidence-stop.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No candidate audit, generator, inventory, decision, Kanban card, placement source/model, witness, dossier source/output, runtime, UI, or owner corpus file was changed.

## Change Classification

- QA tier: `QA-0` audit, documentation, and non-runtime research tooling.
- Changed behavior: reviewers gain a deterministic current legal command-zone inventory and an evidence-bound Yore placement stop.
- Protected behavior intentionally untouched: all placement scoring, ranking, qualification, naming, routing, stopping, refinement, questionnaire, witnesses, identity semantics, dossier sources/generated outputs, runtime UI, telemetry, persistence, and other 36 identities.
- Realistic regressions tested: illegal cross-mechanism pairs, non-exact color identity, non-Commander singles, accidental Doctor overmatch, nondeterministic output, inventory/disposition drift, mechanic-to-identity conflation, unsupported naming authorization, and protected-path scope drift.

## Independent Findings

### Legal command-zone inventory

- Current committed Scryfall manifest: 38,626 Oracle records, updated 2026-08-20.
- Exact WUBR singles: Breya, Etherium Shaper only.
- Exact WUBR generic Partner pairs: seven.
- Exact WUBR Friends-forever pairs: four.
- Exact WUBR named Partner-with pairs: zero.
- Exact WUBR Doctor plus Doctor's-companion pairs: zero.
- Total: 12 legal exact-WUBR command zones, matching the generated JSON and 12-row TSV.
- A separate read-only workbook inspection reproduced its older 2026-07-13 baseline of 11 WUBR legal pairs. That workbook is correctly used only as corroboration, not current completeness or behavioral authority.

The generator distinguishes generic Partner, same-variant Partner, named Partner, and Doctor's companion; requires Commander legality and actual Commander eligibility; requires each component to remain within the target colors; and requires the combined identity to equal the target exactly. An independent implementation reproduced the same WUBR mechanism breakdown and found no omitted named or Doctor pair.

### Evidence and naming decision

- C06 replacement/conversion and C09 repeatability remain independent dependency groups, but independence alone is insufficient.
- Command-zone text directly exposes some conversion and recovery mechanics; it does not expose a stable player preference for preserving engineered function over components or for contesting inherited natural limits.
- The three direct-player records are sparse and mechanic-centered: reanimator, artifact/reanimation/toolbox preparation, and a known Breya combo with multiple wins. They do not establish two repeatable cross-player Yore observations.
- The generic Commander negative control explicitly makes functional equivalence, redundancy, recursion, modular utility, and commander-independent resilience ordinary singleton deckbuilding practices.
- Other four-color controls reproduce the proposed proxies: Akiri artifact-count text crosses WUBR/WBRG/WURG; Friends-forever Clue creation and Clue sacrifice conversion cross UBRG/WBRG/WURG/WUBR; Ravos recursion crosses WUBG/WUBR.
- The candidate therefore correctly rejects artifacts, sacrifice, recursion, redundancy, repeatability, optimization, and toolbox play—alone or in a convenient two-mechanic bundle—as responsible Yore naming authority.

The `NOT_SUPPORTED` disposition is stronger than `SUPPORTED_WITH_LIMITATIONS` for this record because no candidate construct passes all four required axes. The inventory broadens the legal example population but does not supply the missing behavioral relationship. Keeping Yore bounded is the required fail-closed result under the certified semantic authority and current naming contract.

### Stop and scope

- The exact commit contains only VM-587 audit, evidence, tracking, and handoff files.
- No diff exists under placement sources/models, Yore raw placement/dossier authority, current witnesses, runtime assets, or Archscry product files.
- No diff exists under Dune, Glint, Ink, or Witch raw identity sources.
- Placement qualification, naming rules, witness, dossier, generated model, runtime, and UI correctly remain unchanged.
- No Phase 2 lens/self-report behavior was implemented.
- The owner-provided untracked `docs/research/maze-player-language/corpus/` tree and repository `tmp/` remain outside the review changes.

## Tests Selected / Tests Run

| Test | Reason | Result |
| --- | --- | --- |
| Exact HEAD and commit scope inspection | Bind review to the requested candidate and detect product drift | PASS — exact candidate was HEAD at review start; nine candidate paths, all audit/tracking/handoff scope |
| `git diff --check <parent> <candidate>` | QA-0 whitespace integrity | PASS |
| Node syntax check | Validate the evidence generator | PASS |
| Two independent generator runs | Detect nondeterminism and stale committed output | PASS — both runs and the committed JSON have SHA-256 `DEE653D5240631EC06D2289A65C61D4920D1FFFE17147E568905FEB1178F4834` |
| Generated population assertions | Reproduce exact counts and composition | PASS — `UBRG/WBRG/WURG/WUBG/WUBR = 9/9/20/9/12`; WUBR is `1 + 11` |
| Independent raw-corpus WUBR enumeration | Challenge the candidate implementation rather than reuse its output | PASS — Breya + 7 generic + 4 Friends; named 0; Doctor 0 |
| JSON-to-TSV parity | Detect missing or extra behavioral dispositions | PASS — 12/12, no unmatched command zone |
| Read-only artifact-tool workbook inspection | Verify the corroborative older baseline and pairing-pool restrictions | PASS — 124 cards, 2,017 legal pairs, 43 four-color pairs, WUBR 11; distinct generic/named/Friends/Character/Survivors/Father-and-Son/Doctor pools |
| Source-role and direct-excerpt review | Test whether framework, card facts, player language, and semantic authority were conflated | PASS — roles remain bounded and quoted claims match the inspected excerpts |
| Four-axis evidence challenge | Test the naming decision under independence, observability, semantic necessity, and anti-proxy robustness | PASS — no two constructs satisfy all axes; stop is justified |
| Protected-path diff | Verify implementation stopped before product mutation | PASS — placement, dossier, witness, runtime, UI, and other four-color authorities unchanged |

## Tests Intentionally Skipped

- All-37 witness replay: no placement source, model, generated placement artifact, engine, questionnaire, mapping, qualification, naming, or witness changed. The owner's required all-37 replay applies only if the evidence gate authorizes placement remediation; it would not exercise a changed contract here.
- Yore perturbation and false-positive engine journeys: no Yore naming rule or witness was authorized, so there is no new QA-4 behavior to perturb. Evidence-level false-positive controls were reviewed instead.
- Rendered desktop/mobile dossier QA: no dossier source, generated dossier, presentation, interaction, runtime, or UI changed. Rendered review would only repeat the unchanged VM-586 baseline.
- Exhaustive synthetic, mutation, recovery, or journey suites: no protected decision logic changed, so CPU cost would be disproportionate.

## CPU-Heavy Validation

`NOT REQUIRED`

No QA-4 or visible product contract changed. Targeted legal enumeration, deterministic output comparison, source-role review, semantic falsification, and protected-path checks cover the actual risk.

## Self-QA Rendered Evidence

Not applicable. There is no visible product change and no changed dossier or interaction to render.

## Manual Findings Converted to Invariants

No new owner finding was supplied in this review. The controlling invariant remains: legal exact-WUBR mechanics may broaden the evidence population, but they cannot authorize Yore naming unless two independent behavioral observations also pass semantic-necessity and anti-proxy review.

## Remaining Owner Judgment

None for this stopped gate. The candidate makes no placement or dossier promise and therefore does not trigger the two-check product acceptance path reserved for a supported remediation.

## Owner Review Commands / Routes

None. Do not ask the owner to rerun the 12-zone inventory, all-37 witnesses, control groups, workbook, or unchanged rendered product.

## Risks / Uncertainties

- The Scryfall inventory is current to its committed 2026-08-20 snapshot; future releases can change legal counts without automatically changing the behavioral conclusion.
- Available direct-player evidence remains sparse and cannot support prevalence or accuracy claims.
- A future non-scoring Phase 2 self-report/lens may be appropriate for the missing explicit relationship to constructed agency, but this candidate correctly does not design or implement it.

## Not Touched

- No candidate file.
- No placement, model, witness, dossier, runtime, UI, telemetry, persistence, deployment, or other identity source.
- No owner-provided untracked corpus file and no repository `tmp/` content.

## Follow-Up Recommendations

1. Close VM-587 as an independently verified evidence stop bound to exact candidate `bc12a20416ddefdb60b61d3e5c7c9a73e6e826b8`.
2. Keep Yore behaviorally bounded until new direct-player evidence observes a stable relationship to constructed systems rather than only common mechanics.
3. If that evidence later appears, reopen through a new bounded evidence gate; do not infer naming permission from future command-zone count growth alone.

## Next Suggested Agent

Main/closeout agent for VM-587. No placement, dossier, or product implementation agent is authorized by this pass.

## Related Kanban, Docs, or Plans

- `docs/kanban/in-progress/VM-587-yore-behavioral-placement-remediation.md`
- `docs/audits/vm587-yore-behavioral-placement-remediation/behavioral-evidence-decision.md`
- `docs/handoffs/2026-08-23-1003-codex-vm587-yore-evidence-stop.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
