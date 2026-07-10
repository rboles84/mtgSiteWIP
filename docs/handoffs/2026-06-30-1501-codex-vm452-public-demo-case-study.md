# Codex Handoff - VM-452 Public Demo And Strategic Case Study

## Agent Name

Codex

## Task Requested

Continue and complete the VM-429 Sections 11/12/14 readiness queue by packaging Vox Mana for external review as a concise public demo / portfolio / QA-product case study after the preceding readiness tickets.

## Files Reviewed

- `C:\Users\obake\.codex\attachments\8f9dd8ab-db18-4428-90e7-26d3911a5407\pasted-text-1.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-1455-codex-vm451-route-metadata.md`
- `docs/handoffs/2026-06-30-1444-codex-vm450-visual-waivers.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/qa/vox-mana-test-plan.md`
- Existing docs directory structure and strategy/case-study search results

## Files Changed

- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `docs/kanban/done/VM-452-public-demo-strategic-case-study.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-1501-codex-vm452-public-demo-case-study.md`

## What Changed

- Added a docs-first external review case study under `docs/strategy/`.
- Included a five-stop demo path for Home, Archscry, Maze, Strategium, and Apocrypha.
- Stated the product boundary, chosen strategic lane, deferred lanes, proof points, and readiness status.
- Completed the strategic options and anti-fit decision record inside VM-452: readiness hardening plus portfolio / QA-product proof-of-work now, Commander onboarding as the nearest product experiment, and monetization/accounts/community/deck-discovery paths deferred behind evidence gates.
- Translated recent VM tickets into a proof-point table covering audits, QA, copy repair, identity reconciliation, Supabase traceability, blocked live RLS proof, CI, browser smoke, visual waiver ledger, and route metadata.
- Added "what to say" / "what not to say" copy, screenshot capture guidance, and a two-week external reviewer test.

## Why It Changed

VM-429 identified portfolio/recruiting, QA/product consulting, and AI-assisted project case-study audiences as the strongest current external fits. VM-452 makes that strategy reviewable without adding runtime surface area or implying the product is ready for monetization, accounts, community, or polished release claims.

## Decisions Made

- Used `docs/strategy/` because no strategy folder existed and the original plan allowed a docs-first case study instead of a public route.
- Folded the strategic options and anti-fit decision record into VM-452 because VM-452 is the strategy gate and case-study package for the VM-429 Section 11/12 follow-up.
- Did not create a separate VM-453 decision-record card. `VM-453` is occupied by the later Collaboration Self-Snapshot card, and creating another VM-453 would introduce a duplicate ID.
- Did not add screenshots yet because VM-450 visual waiver status is unresolved.
- Framed the public static demo as conditionally showable, not polished-release proof.
- Kept monetization, account/community, creator publishing, and deckbuilder-like discovery deferred.
- Did not alter runtime code, route copy, metadata, data, Supabase, visual baselines, or deployment.

## Risks / Uncertainties

- The case study has not been reviewed by an outside reader.
- Live account/private deck-link behavior remains unproven because VM-446 is blocked on credentials.
- Visual baselines remain waived, not green.
- The public demo still needs manual mobile/cross-browser review before stronger public quality claims.

## Tests Run

- Manual doc review against VM-429, VM-430, VM-450, and VM-451 evidence.
- `rg -n "not ready|blocked|visual|RLS|monetiz|community|account|source-governed|portfolio|QA|case study|scoped static demo" docs\strategy\2026-06-30-vox-mana-public-demo-case-study.md` - passed with expected caveat/evidence hits.
- `Select-String -Path docs\strategy\2026-06-30-vox-mana-public-demo-case-study.md -Pattern "polished static demo|ready to monetize|production-ready until|visual baseline suite is green|Do not add monetization"` - passed; no overconfident "polished static demo" wording remains, and required caveats are present.
- `git diff --check -- docs\strategy\2026-06-30-vox-mana-public-demo-case-study.md docs\kanban\board.md docs\kanban\in-progress\VM-452-public-demo-strategic-case-study.md` - passed with line-ending warnings only before card closeout.

## Not Touched

- Runtime HTML/CSS/JS.
- Public route body copy and metadata.
- Placement/source/generated data.
- Maze search/Reading Finds behavior.
- Supabase/RLS/account behavior.
- Visual baselines.
- Lighthouse.
- Git staging, commit, push, tag, branch, or deployment.

## Follow-Up Recommendations

- Owner or an outside reviewer should read the case study and answer the five review questions in the two-week external test.
- Capture screenshots only after owner visual QA resolves or accepts the VM-450 waiver ledger.
- Keep the next phase in readiness hardening unless the owner explicitly chooses public static beta or portfolio case-study packaging.
- Do not move toward monetization, accounts, community publishing, or deckbuilder-like discovery without new evidence.

## Next Suggested Agent

Owner reviewer or release steward for completion audit and next-phase decision.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-452-public-demo-strategic-case-study.md`
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/qa/visual-baseline-waivers.md`
- `docs/handoffs/2026-06-30-1455-codex-vm451-route-metadata.md`
