# 2026-07-15 08:26 Codex VM-509 Boros Replacement Candidate

## Agent name
Codex

## Task requested
Create a clean VM-509 Boros replacement recovery candidate after infrastructure unblock, then record the exact replacement candidate SHA without certification or independent review.

## Files reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/handoffs/2026-07-15-0807-codex-vm509-lateral-inhibition-unblock.md`
- Boros canonical raw packet, generated WR consumers, semantic provenance, fixtures, VM-509 report, CRIT-001 ledgers

## Files changed
Candidate commit `c2f5d064460a007f0dca6be95b7beabb4ca85026` contains Boros canonical remediation, generated artifacts/provenance, Boros fixtures, and Gate 1-Gate 4 workflow records. This workflow-record commit updates only VM-509 card/report/ledger/board/handoff/index records with the exact replacement candidate SHA.

## What changed
- Replacement candidate parent: `4d351747f0634663ea8f796099057e431af8a65b`.
- Replacement candidate SHA: `c2f5d064460a007f0dca6be95b7beabb4ca85026`.
- Superseded failed candidate: `abff94b91e94b99a6b2a77b71806a9d005ecec76`.
- Superseded failed workflow record: `25420bad09715645ba4af37f07cac097b3e7966d`.
- Generated WR lateral targets remain parent-stable: `WU`, `LOREHOLD`, `WG`, `MARDU`.
- Generated WR collision guidance preserves all 8 required neighbors.
- Frozen scoring-hint findings and missing retained-native-ID findings are resolved.

## Why it changed
The previous candidate failed formal candidate-scope guard. The replacement preserves valid Gate 3/Gate 4 Boros recovery work while removing real candidate-scope failures.

## Decisions made
- Do not certify Boros.
- Do not start independent review.
- Do not start another identity.
- Keep `axis_boros_righteous_zeal` and `char_tajic` as retained native-ID metadata only.

## Risks / uncertainties
Independent Gate 5 review is still required before any Boros certification action.

## Tests run
- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WR`
- `npm.cmd run validate:source-generated -- --targets=WR`
- `node research/validate-semantic-readiness.mjs --fixtures`
- `node research/audit-semantic-readiness.mjs --targets=WR`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- formal staged-tree candidate-scope guard: passed for WR
- `git diff --check`

## Not touched
- Non-Boros raw packets
- Contract v1.1, shared schema, validators, builder scripts after infrastructure unblock, Hall, Crucible, scoring behavior, inhibition behavior, confidence behavior, scheduling, tie ordering, and global recruiter behavior
- Main worktree `C:\dev\mtgSiteWIP`

## Follow-up recommendations
Send replacement candidate `c2f5d064460a007f0dca6be95b7beabb4ca85026` to independent Gate 5 review. Do not certify unless that exact SHA is approved.

## Next suggested agent
Independent Gate 5 reviewer.

## Related Kanban card, docs, or plans
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
