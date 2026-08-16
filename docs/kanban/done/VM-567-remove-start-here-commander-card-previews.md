# VM-567 - Remove Start Here Commander Card Previews

ID: VM-567

Status: Done - local candidate ready for owner review

Type: Production UI defect / presentation-placement correction

Area: Archscry dossier, Start Here

Priority: High

Created: 2026-08-16

## Summary

Remove only the shared Commander card-preview block rendered inside Start Here across all 37 identities. Preserve Start Here guidance, underlying commander recommendation authority, media architecture, and every other dossier surface.

## Preflight Summary

- Recent related work: VM-239 established Commander Browsing Starts as the external discovery owner while retaining Start Here previews; VM-551 hardened the optional preview presentation; VM-559 governed their media resolution. VM-559 and VM-563 are closed and production-verified.
- Current risks: the dossier renderer is shared across 37 identities; tests currently encode the rejected preview behavior; the primary worktree contains unrelated uncommitted VM-564 work and must not be used for final candidate evidence.
- Existing decisions: Start Here guidance remains; Commander Browsing Starts, precons, recommendation authority, and all other dossier surfaces remain unchanged; VM-559 media architecture and historical counts are out of scope.
- Recently changed files relevant to this defect: `assets/js/index.js`, dossier regressions, browser replay/smoke harnesses, and manual QA documentation were the prior preview owners.
- Do not touch: placement/scoring/qualification/routing/result states, recommendation data, exact card records, Scryfall projections/indexes, loaders/hydration/fallbacks, precons, Matrix, Sound/Play, Card Signals, Mana Notes, or VM-564/VM-565 work.

## RobDevPass Implementation Packet

- Owning authority: the shared Start Here renderer in `assets/js/index.js` owns whether the preview block appears.
- Changed behavior: Start Here renders zero MTG card previews for every named identity.
- Protected behavior: Start Here copy and layout; all underlying commander recommendations; every non-Start-Here dossier surface; all placement and media architecture contracts.
- Consumers: all 37 Archscry dossier results, focused and View All layouts, desktop and mobile presentation.
- Realistic risks: accidentally removing guidance, changing another card surface, leaving tests that still require previews, or contaminating the candidate with active VM-564/VM-565 work.
- Smallest complete implementation: remove the single shared preview interpolation, update the directly affected regressions/manual check, and add an all-37 rendered invariant.
- Non-goals: no data cleanup, media reconciliation, resolver/index changes, loader refactor, CSS cleanup, recommendation rewrite, deployment, or VM-559 reopening.
- Stop conditions: any required change to media producers/indexes, recommendation catalogs, card records, unrelated renderer behavior, or active VM-564/VM-565 work.

## RobQAPass Classification

- Tier: QA-1 presentation.
- Changed behavior: absence of card-bearing descendants inside Start Here.
- Protected contracts: guidance text, discovery/precon/card surfaces, placement behavior, and media infrastructure.
- Validation: focused source regressions, all-37 rendered assertion, White desktop/mobile review, lint, and diff review only. Heavy placement/journey/mutation/recovery suites are not justified.
- Candidate evidence must be rerun from the isolated VM-567 worktree based on `c190be7c7eb49ff55313213dfc2c0b696289537b`; combined dirty-worktree runs are preliminary only.

## Acceptance Criteria

- All 37 Start Here sections contain zero card tiles, images, card-detail triggers, and preview media slots.
- White does not render Giada, Font of Hope; Adeline, Resplendent Cathar; or Balan, Wandering Knight inside Start Here.
- Start Here heading, introduction, Commander plan, guidance notes, glossary behavior, and surrounding layout remain unchanged.
- Commander Browsing Starts, precons, Matrix, Sound/Play, Card Signals, Mana Notes and tiers remain unchanged.
- Commander recommendation sources and VM-559 media artifacts remain unchanged.
- A clean VM-567 candidate commit is created locally; no push, merge, or deployment occurs.

## Related Work

- `docs/handoffs/2026-08-02-2334-codex-vm551-gate-a-owner-spotcheck-presentation.md`
- `docs/handoffs/2026-05-31-2203-codex-vm239-jeskai-dossier-deck-start-dedup-qa-closeout.md`
- `docs/kanban/done/VM-559-archscry-authored-card-media-resolution.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

## Implementation Result

- Removed exactly one shared `${commanderPreviewHtml}` interpolation from the Start Here panel in `assets/js/index.js`.
- Left preview construction, CSS, loaders, hydration, fallbacks, media projection, resolver inventory, recommendation data, and every other dossier surface unchanged.
- Replaced rejected Start Here preview-presence checks with scoped zero-tile, zero-image, zero-detail-trigger, and zero-media-slot assertions.
- Added the invariant to the existing 37-identity rendered replay and retained the focused White name exclusions.

## Validation Result

- Isolated base: `c190be7c7eb49ff55313213dfc2c0b696289537b` on dedicated branch `codex/vm-567-start-here-preview`.
- All-37 desktop replay: PASS, 37 identities / 36 named dossiers plus the unchanged bounded Yore result / zero failures. Every replay row contains zero Start Here card-bearing descendants; all named dossiers retain the Commander-plan guidance.
- White focused desktop and mobile replay: PASS; Start Here excludes Giada, Adeline, and Balan while Giada remains available on an authorized separate rationale surface.
- JS lint, HTML lint, syntax checks, 37-faction/37-golden-path checks, scoped Start Here source invariant, protected-source diff, and `git diff --check`: PASS.
- VM-559 projection verification: PASS at its unchanged current inventory of 1,178 occurrences, 572 unique resolver keys, and 37 identities. These counts are observations, not VM-567 acceptance criteria.
- `research/archscry-dossier-followup-tests.js` remains blocked before the VM-567 assertions by the pre-existing HEAD expectation `Why These Cards Echo This Reading` at line 234.
- `scripts/vm551-gate-a-owner-qa-tests.mjs` remains blocked before the VM-567 assertions by the pre-existing HEAD expectation `loadCachedScryfallNamedCard(card.name)` at line 186.

## Stop Point

Commit one isolated VM-567 candidate and stop for owner review. Do not push, merge, deploy, reopen VM-559, or alter active VM-564/VM-565 work.
