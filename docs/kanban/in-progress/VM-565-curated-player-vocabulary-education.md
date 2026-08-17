# VM-565 - Curated Player Vocabulary Education

ID: VM-565

Status: Owner Review

Type: Player education / glossary presentation

Area: Archscry dossier, all 37 identities

Priority: High

Created: 2026-08-16

## Summary

Use the completed VM-564 terminology audit to teach important Magic and Commander vocabulary once, in useful context, without turning dossier prose into blanket annotations.

## Intake

- Verdict: proceed.
- Smallest safe version: reconcile an all-37 candidate ledger, add only high-value missing concepts, correct the inadequate Mana rocks definition, and introduce targeted teaching only where a valuable term has no suitable existing eligible occurrence.
- Review level: QA-2 shared interactive presentation plus QA-1 factual copy.
- Stop condition: stop if the work requires placement/scoring changes, identity-meaning changes, broad dossier-copy rewrites, or global enablement of text-only surfaces.

## Preflight Summary

- Recent related work: VM-551 established the approved 42-record education catalog and accessible tooltip behavior; VM-564 audited its exact use across all 37 identities and is the current-state evidence baseline.
- Current risks: the fixed surface priority can select an incidental occurrence; several important terms exist only in text-only titles or mechanic lists; indiscriminate aliases could annotate ordinary prose; the shared worktree also contains separately scoped VM-567 Start Here work that must be preserved.
- Existing decisions: one decoration per canonical concept per dossier remains the default; existing approved definitions remain unchanged absent a concrete defect; identity-specific compound and editorial labels do not automatically become glossary terms.
- Recently changed relevant files: `assets/js/index.js`, `research/build-vm551-discovery-education-approval-packet.mjs`, the VM-551 education catalog artifacts, and the VM-564 audit artifacts.
- Do not touch: placement, scoring, qualification, Commander recommendation semantics, Sound/Play, card relationships, media resolution, identity meaning, broad dossier prose, or generated faction data.

## RobDevPass Implementation Packet

- Owning authorities: the VM-551 education producer owns glossary records; `assets/js/index.js` owns allocation and accessible rendering; the VM-565 candidate ledger owns the scoped accept/reject and target decisions.
- Changed behavior: selected important vocabulary is taught once at a deterministic meaningful occurrence; Mana rocks explains the game object rather than repeating Ramp.
- Protected behavior: one-decoration-per-concept, existing tooltip hover/focus/tap behavior, readable undecorated prose, all identity and placement semantics, and all non-education dossier behavior.
- Consumers: new and returning players reading any of the 37 Archscry dossiers; experienced players who should not see excessive annotation.
- Realistic risks: duplicate teaching, regex/alias false positives, title over-decoration, inaccessible targeted controls, stale generated authority, or scope leakage into placement/product data.
- Smallest complete implementation: add the reconciled canonical records and narrow aliases to the source producer, add exact per-identity target metadata for terms that otherwise have no educational occurrence, and validate all 37 rendered allocations.
- Non-goals: glossary completeness, defining every mechanic list item, defining Vox Mana flavor labels, rewriting identity prose, or changing any result/recommendation behavior.
- Stop conditions: any required broad renderer expansion, semantic rewrite, or protected placement/data change.

## RobQAPass Classification

- Tier: QA-2 because shared interactive tooltip allocation and keyboard/tap behavior change; factual definitions remain QA-1 copy within that change.
- Changed behavior: exact term/identity teaching allocation and a bounded set of new/fixed definitions.
- Protected contracts: zero duplicate canonical teaching per dossier, no blanket surface decoration, accessible tooltip interaction, exact text placement, and source/generated boundaries.
- Validation: deterministic all-37 candidate and rendered education audits; focused renderer regressions; desktop/mobile rendered review; hover, keyboard focus, tap, and Escape checks; lint; `git diff --check`; protected-path review. Heavy placement/journey/mutation suites are not justified.

## Acceptance Criteria

- A controlled candidate ledger covers all 37 identities and records accept/reject reasons before runtime implementation.
- Important unfamiliar terms are taught once in meaningful context; ordinary, editorial, literal compound, and already-explained expressions stay undecorated.
- Zero unresolved accepted education targets and zero duplicate canonical decorations per dossier unless explicitly justified.
- No full surface is newly hover-enabled; title or text-only teaching is exact-target only.
- All new/fixed definitions resolve on hover, keyboard focus, and tap.
- Owner report includes counts, meaningful per-identity results, rejected-reason summary, before/after comparison, and compact manual review list.
- Card stops at Owner Review until product judgment is accepted.

## Required Evidence

- `docs/audits/vm564-dossier-term-hover-audit/all-37-term-hover-report.md`
- `docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json`
- `docs/handoffs/2026-08-16-1554-codex-vm564-term-hover-audit.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

## Implementation Summary

- Reconciled 449 candidate expressions across all 37 identities before implementation.
- Accepted 42 education actions and deliberately rejected 148 independently reviewed candidates.
- Added 23 canonical definitions and 14 aliases through the existing VM-551 source/adjudication pipeline.
- Added 34 new exact teaching targets and seven better-location overrides; no text-only surface was enabled wholesale.
- Corrected Mana rocks to explain the artifact itself.
- Preserved one rendered decoration per canonical concept per dossier and left Hatebears, Parity, Pillowfort, and Stax dormant.

## QA Evidence

- Candidate ledger `--check`: PASS.
- Education audit `--check`: PASS — 37 identities, 202 allocations, zero unresolved targets, zero duplicates, zero blanket text-only allocations.
- VM-551 education packet tests: PASS — 69 total records, 65 glossary records, four microcopy records, zero exceptions.
- Full all-37 desktop replay: PASS — 37 identities, 36 named dossiers plus bounded Yore.
- Representative mobile replay: PASS — Red and Colorless.
- Glossary hover, keyboard focus, Escape dismissal, and tap-equivalent activation: PASS.
- Targeted Bant and White rendered review: PASS.
- Owner product judgment: PENDING; do not move this card to Done yet.

## Owner Review Remediation

### Bug 1 — Bant

- Replaced the underspecified Enchantress definition with the owner-required enchantment-focused strategy definition through the existing education source/adjudication/catalog pipeline.
- Preserved the canonical term, `community_archetype` class, aliases, and single Bant What to Look For item-3 teaching location.
- Focused desktop interaction plus deterministic source/generated and exact-target checks: PASS.

### Bug 2 — Boros

- Reproduced the three-column defect: each visible `View card details` control extended about 110 px beyond its Play-card boundary at 1440 × 1100.
- Limited the correction to three-item public card grids by replacing unbounded max-content sizing with fit-content constrained to the card width and normal wrapping.
- Added a rendered regression invariant requiring every Play control to be visible, contained, and at least 12 px above the card bottom.
- Boros desktop and mobile: PASS; cards, order, rationales, tags, Sound/Play meaning, and modal behavior remain unchanged.

### Bug 3 — Ink

- Rejected Command Tower and Danitha Capashen, Paragon from the Ink Sound pair.
- Selected Crystal, Inhuman Princess (`MSC` 80; RGWU) and Group Project (`SOS` 17; W) from direct printed flavor evidence.
- Preserved the owner CSVs verbatim under `docs/research/ink/owner-evidence/vm565/` with hashes and a controlled candidate ledger covering all ten RGWU candidates plus the strongest CSV alternatives.
- Source-first Ink relationship, printing, and runtime catalog projections: PASS; all non-Ink Sound records are byte-semantically unchanged.
- Ink desktop/mobile: PASS; both replacement detail controls resolve from local governed card facts with zero Scryfall API fallback, zero lands, two Sound slots, and Kynaios and Tiro remains unchanged and Play-only.

## Final Candidate Isolation

- Base SHA: `c190be7c7eb49ff55313213dfc2c0b696289537b`.
- Branch: `codex/vm-565-final-owner-review`.
- Worktree: `C:\dev\voxmana-vm565-final`.
- The accepted VM-564/VM-565 state and only these three remediations were reproduced in isolation; the dirty main worktree and accepted VM-567 worktree were not modified.
- Full isolated all-37 desktop replay: PASS — 37 identities, 36 named plus bounded Yore, zero failures.
- Final owner verification remains pending; keep this card in Owner Review.
