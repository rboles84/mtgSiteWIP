# VM-565 Curated Player Vocabulary Education Handoff

- Agent name: Codex
- Task requested: Use the completed VM-564 all-37 terminology audit to teach important MTG and Commander vocabulary once, in useful context, without blanket glossary decoration.
- Status: OWNER REVIEW. Automated and rendered self-QA pass; owner product judgment remains pending.
- Related Kanban card: `docs/kanban/in-progress/VM-565-curated-player-vocabulary-education.md`

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/audits/vm564-dossier-term-hover-audit/all-37-term-hover-report.md`
- `docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json`
- `docs/handoffs/2026-08-16-1554-codex-vm564-term-hover-audit.md`
- VM-551 discovery-education source, adjudication, runtime, test, and closeout artifacts
- Current Archscry dossier renderer, all-37 replay harness, identity data, and taxonomy authority
- Primary Wizards mechanics/rules articles linked from the VM-565 authority records

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/vm565-player-vocabulary-authority.mjs`
- `research/build-vm551-discovery-education-approval-packet.mjs`
- `research/apply-vm551-discovery-education-automatic-approval.mjs`
- `scripts/build-vm565-player-vocabulary-candidates.mjs`
- `scripts/build-vm565-education-audit.mjs`
- `scripts/build-vm565-owner-report.mjs`
- `scripts/vm551-discovery-education-packet-tests.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `scripts/vm559-authored-media-ui-replay.mjs`
- `research/apply-vm565-owner-review-remediation.mjs`
- `data/dossier/card-voice-relationships.source.json`
- `data/dossier/card-voice-printings.source.json`
- `data/dossier/card-voice-catalog.json`
- `docs/research/ink/owner-evidence/vm565/ink1.csv`
- `docs/research/ink/owner-evidence/vm565/ink2.csv`
- `docs/research/ink/owner-evidence/vm565/README.md`
- `docs/research/ink/owner-evidence/vm565/ink-sound-candidate-ledger.json`
- `data/dossier/discovery-education-authority.source.json`
- `data/dossier/discovery-education-automatic-adjudication.source.json`
- `data/dossier/discovery-education-catalog.json`
- VM-551 packet-3 generated TSV and owner-exception artifacts
- `docs/audits/vm565-player-vocabulary-education/candidate-ledger.json`
- `docs/audits/vm565-player-vocabulary-education/education-audit-ledger.json`
- `docs/audits/vm565-player-vocabulary-education/owner-report.md`
- `docs/audits/vm551-all-37-dossier-closeout/live-ui-witness-replay.json`
- `docs/plans/vm551-gate-b1-product-fit/approval-packet-3-discovery-education.md`
- VM-565 Kanban card, board entry, this handoff, and `HANDOFF_INDEX.md`

## What changed

- Reconciled 449 candidate expressions across all 37 identities before implementation: 259 VM-564 strategy-label occurrences and 190 independently discovered vocabulary decisions.
- Accepted 42 scoped education actions and deliberately rejected 148 candidates.
- Added 23 canonical glossary concepts: Afterlife, Artifacts, BGx Midrange, Burn, Dredge, Enchantments, Enchantress, Exalted, Go-wide, Group Hug, Haste, Heroic, Historic, Impulse draw, Land denial, Lifegain, Mill, Politics, Reanimator, Surveil, Theft, Treasure, and Typal.
- Added 14 narrow aliases and 34 exact new-term teaching targets.
- Selected seven better teaching locations for existing definitions: White Board wipe, Black Aristocrats, Azorius Prison Control, Selesnya Populate, Boros Voltron, Silverquill Goad, and Colorless colorless mana.
- Corrected Mana rocks from the generic Ramp copy to: “Artifacts that produce mana, helping a deck accelerate or fix its mana.”
- Added field-aware `EXPLICIT_TARGETS` and `LEGACY_WITH_OVERRIDES` allocation policy while retaining one rendered decoration per canonical concept.
- Selectively permitted exact-target education in What to Look For titles, How This Plays, and the Colorless mana primer; no surface was globally enabled.
- Preserved focused tooltip visibility during mobile scroll-to-focus, repairing the accessibility defect found during rendered QA.
- Owner remediation corrected Enchantress to identify the enchantment-focused strategy while retaining its one approved Bant teaching location.
- Owner remediation constrained three-column card-detail controls to their cards and added a rendered visibility/spacing invariant; Boros desktop and mobile pass with all three original Play cards unchanged.
- Owner remediation replaced Ink Sound with Crystal, Inhuman Princess and Group Project from direct printed flavor evidence. Both cards are nonlands, Kynaios and Tiro remains Play-only, and all Sound records outside Ink are unchanged.
- The owner CSVs are preserved verbatim as bounded discovery evidence with hashes, provenance, and an accept/reject candidate ledger; they are not runtime or identity authority.

## Why it changed

New and returning players needed help with established deckbuilding, archetype, mechanic, and table vocabulary at decision-relevant moments. The VM-564 substring audit proved the current state but intentionally did not decide which missing words deserved education or where one teaching moment should occur. VM-565 adds that judgment layer without turning the dossier into a mechanical annotation system.

## RobDevPass compact implementation packet

- Owning authority and producer: VM-551 education producer plus `research/vm565-player-vocabulary-authority.mjs`; runtime allocation remains in `assets/js/index.js`.
- Changed behavior: accepted terms resolve to one deterministic identity/surface/field target; focused help stays visible while the browser scrolls the focused target into view.
- Protected behavior: placement/scoring/result qualification, identity meaning, Commander recommendations, Sound/Play outside the two authorized Ink Sound slots, Play everywhere including Ink, media, generated faction data, ordinary prose, and one-decoration-per-concept.
- Consumers: all 37 Archscry dossiers and new/returning Commander players.
- Risks controlled: alias false positives, duplicate teaching, title over-decoration, inaccessible tooltips, stale generated catalogs, and source/generated drift.
- Smallest complete implementation: 23 concepts, 14 aliases, 41 exact target entries, one definition correction, and field-aware allocation metadata.
- Non-goals: glossary completion, every undefined strategy label, broad prose rewriting, or renderer-wide surface expansion.
- Stop condition respected: no placement, identity, recommendation, or unrelated dossier architecture change was required.

## Decisions made

- Compound labels are not definitions by default. Protective Tokens, Ramp and Big Mana, Haste Aggro, Equipment Voltron, and comparable phrases remain literal combinations when their useful components are already taught.
- Draw-Go Control and Prison Control retain their approved whole-phrase definitions because they are established archetype terms with distinct meaning.
- Vox Mana editorial labels remain prose.
- Hatebears, Parity, Pillowfort, and Stax remain dormant approved records; zero-use is not a reason to delete or force them.
- The current source/adjudication pipeline was extended rather than replaced, and generated faction data was not edited.

## Candidates intentionally rejected

- 47 Vox Mana editorial labels.
- 47 secondary list terms whose placement did not justify interruption.
- 21 expressions already clear from context.
- 13 established terms not important enough at the audited occurrence.
- 11 compounds of already taught concepts.
- Six ordinary-language expressions.
- Two terms too trivial to interrupt.
- One existing alias that did not create a separate learner need.

Exact decisions and reasons are preserved in `candidate-ledger.json`.

## Unchanged current glossary terms

All prior approved definitions remain unchanged except Mana rocks. Existing definitions are still allocated once per concept; seven only receive a better location override. Hatebears, Parity, Pillowfort, and Stax remain approved and dormant.

## Risks / uncertainties

- Owner judgment is still required on whether the 23 changed identities feel intentionally educational rather than over-annotated.
- `research/archscry-dossier-followup-tests.js` still fails its pre-existing unrelated “Why These Cards Echo This Reading” heading assertion; this task did not alter that surface.
- Final evidence was produced in the isolated `C:\dev\voxmana-vm565-final` worktree on branch `codex/vm-565-final-owner-review` from base `c190be7c7eb49ff55313213dfc2c0b696289537b`; the dirty main worktree and accepted VM-567 worktree were not modified.
- The all-37 replay evidence file is a shared generated closeout artifact and now reflects the current VM-565 replay run.

## Tests run

- `node scripts/build-vm565-player-vocabulary-candidates.mjs --check` — PASS.
- `node scripts/build-vm565-education-audit.mjs --check` — PASS.
- `node scripts/build-vm565-owner-report.mjs --check` — PASS.
- VM-551 education source and automatic-adjudication builders/checks — PASS.
- `node scripts/vm551-discovery-education-packet-tests.mjs` — PASS: 69 records, 65 glossary, four microcopy, zero exceptions.
- `node --check assets/js/index.js` and changed VM-565 scripts — PASS.
- Full `vm551-all-37-live-ui-replay.mjs --viewport=desktop --collect-failures` — PASS: 37/37, 36 named plus bounded Yore.
- Representative desktop replay — PASS: White and Bant.
- Representative mobile replay — PASS: Red and Colorless.
- Tooltip hover, keyboard focus, Escape dismissal, tap-equivalent toggle, `tabindex=0`, resolved definition, and `aria-describedby` checks — PASS.
- In-app browser desktop/mobile rendered inspection — PASS; responsive cards remain readable and the mobile tooltip stays within the viewport.
- `npm.cmd run lint:js` — PASS for 10 frontend files.
- `git diff --check` — PASS.
- Protected placement/model/faction/identity-dossier/card-rationale/precon diffs — empty in the isolated candidate.
- `node research/apply-vm565-owner-review-remediation.mjs --check` — PASS: Crystal plus Group Project, zero lands, Kynaios and Tiro protected in Play.
- Focused Boros authored-media replay — PASS at desktop 1440 × 1100 and mobile 390 × 900; three Play cards and three contained controls.
- Focused Ink authored-media replay — PASS at desktop and mobile; both replacement Sound controls open the correct local detail modal with zero Scryfall API fallback, and Kynaios remains unchanged in Play.
- Focused Bant all-37 replay — PASS; Enchantress remains one exact What to Look For target with hover/focus/Escape/tap-equivalent behavior covered.
- Final isolated all-37 desktop replay — PASS: 37 identities, 36 named plus bounded Yore, zero failures.
- Non-Ink card-voice source/printing/catalog semantic diff — empty; placement model, factions, identity dossier, card rationale, precon, and placement paths — empty.

## RobQAPass readiness

- QA tier: QA-2 shared interactive presentation with QA-1 factual copy.
- Changed behavior covered: exact one-per-concept target selection, new/aliased definitions, keyboard/hover/tap tooltip behavior, and mobile focus-scroll persistence.
- Protected contracts covered: zero duplicates, zero unresolved targets, no blanket text-only surface allocations, no placement/identity/data change, and source-generated parity.
- Deterministic evidence: candidate ledger, education audit ledger, generated owner report, packet tests, and all-37 replay.
- Owner review surface: the 23 identities and exact terms listed in `owner-report.md`.
- Automated readiness: PASS.
- Owner product judgment: PENDING.

## Not touched

- Placement scores, mappings, qualification, or result semantics.
- Identity meaning or authored dossier prose beyond education decoration.
- Commander recommendation semantics or card relationships.
- Sound/Play outside the two authorized Ink Sound replacements, all Play selections and rationales, media resolution, Maze behavior, or generated `data/factions.json`.
- The four dormant glossary concepts were neither deleted nor forced into copy.

## Follow-up recommendations

1. Review the compact exact-term list in `owner-report.md`, prioritizing White, Red, Black, Golgari, Boros, Bant, Ink, and Colorless.
2. Accept or revise only concrete teaching moments; do not reopen raw glossary-coverage goals.
3. Perform the final quick owner verification against the isolated candidate SHA reported in the completion response; after acceptance, move VM-565 to Done before integration.

## Owner Review Remediation

- New glossary concepts: unchanged from the accepted VM-565 set (23).
- New aliases: unchanged from the accepted VM-565 set (14).
- Teaching-location changes: none in remediation; Bant Enchantress stays at What to Look For item 3.
- Definition change: Enchantress only, using the exact owner-required sentence.
- Sound selection changes: Ink only — Crystal, Inhuman Princess and Group Project replace Command Tower and Danitha Capashen, Paragon.
- Candidates intentionally rejected: ten RGWU/CSV alternatives recorded in the bounded Ink ledger; broader cross-identity Sound research was not started.
- Unchanged current glossary terms: all other 64 records, including dormant Hatebears, Parity, Pillowfort, and Stax.
- Remaining owner judgment: final visual/product acceptance of the exact Bant tooltip, Boros three-card controls, and Ink two-card Sound pair.
- Isolation: final candidate evidence comes only from `C:\dev\voxmana-vm565-final`; candidate commit SHA is reported after commit creation because a commit cannot contain its own hash.

## Remaining owner judgment

Does each changed identity deliver the intended feeling — “I did not know what that meant, and Vox Mana explained it exactly when I needed it” — without adding visual or conceptual noise? No automated result substitutes for that product decision.

## Next suggested agent

Owner/product reviewer, followed by Codex for any exact accepted revisions and final closeout.
