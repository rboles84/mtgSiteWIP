# VM-452 - Public Demo And Strategic Case Study

Status: done

## Summary

Package Vox Mana for external review as a concise public demo / portfolio case study after the readiness hardening work. The artifact should explain the product, boundaries, source model, QA discipline, known waivers, and chosen strategic lane in under five minutes.

Clarification added 2026-06-30: VM-452 also contains the strategic options and anti-fit decision record for the VM-429 Section 11/12 follow-up. A separate VM-453 decision-record card was not created because VM-452 already owns the strategy gate and public case-study framing, and `VM-453` is occupied by a later Collaboration Self-Snapshot card.

## Why It Matters

VM-429 identified portfolio, recruiting, QA/product consulting, and AI-assisted workflow audiences as the strongest current external fits. Without a concise case study, the most differentiated asset remains buried in handoffs, audits, source ledgers, and Kanban history.

## Scope

- Create a docs-first strategy/case-study artifact under `docs/strategy/`.
- Summarize the demo path across Home, Archscry, Maze, Strategium, and Apocrypha.
- State the product boundary clearly.
- Explain the proof-of-work: source governance, deterministic validation, browser smoke, metadata, CI, visual waiver ledger, and handoff workflow.
- Include explicit caveats for monetization, accounts/community, live RLS, visual baselines, and live social previews.
- Complete the strategic options and anti-fit decision record:
  - chosen path: readiness hardening plus portfolio / QA-product proof-of-work
  - secondary experiment: Commander onboarding and taste-direction support
  - deferred paths: deck-discovery, content/blog, Patreon, accounts, creator/community, public deck platform
  - anti-fit stops: deckbuilder, legality checker, EDHREC clone, generic MTG wiki, official authority, unsupported lore/rules/card claims
- Avoid adding a new public route, screenshots, runtime code, or visual baseline changes in this ticket.

## Likely Files

- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Acceptance Criteria

- [x] A reviewer can understand what Vox Mana is, what it is not, and how to try it in under five minutes.
- [x] The chosen strategic lane is explicit: portfolio / QA-product proof-of-work first, Commander onboarding second.
- [x] The strategic options and anti-fit decision record is explicitly completed inside VM-452.
- [x] VM-453 is not created for this decision record because the strategy gate is folded into VM-452 and VM-453 is occupied by the later Collaboration Self-Snapshot card.
- [x] The case study names concrete evidence from recent tickets and docs.
- [x] The case study includes "not ready to monetize/account/community" caveats unless proof changed.
- [x] The case study does not claim live RLS, green visual baselines, production account confidence, or market proof.
- [x] Docs/Kanban/handoff are updated.

## Validation

- Manual doc review - completed against VM-429/VM-430/VM-450/VM-451 evidence.
- `rg -n "not ready|blocked|visual|RLS|monetiz|community|account|source-governed|portfolio|QA|case study|scoped static demo" docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md` - passed with expected caveat/evidence hits.
- `git diff --check -- docs\strategy\2026-06-30-vox-mana-public-demo-case-study.md docs\kanban\board.md docs\kanban\in-progress\VM-452-public-demo-strategic-case-study.md` - passed with line-ending warnings only before card closeout.

## Risk If Skipped

The project may be technically and strategically interesting while still being difficult for external reviewers to understand quickly.
