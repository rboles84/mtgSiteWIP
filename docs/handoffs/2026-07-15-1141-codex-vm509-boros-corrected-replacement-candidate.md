# 2026-07-15 11:41 Codex VM-509 Boros Corrected Replacement Candidate

## Agent name
Codex

## Task requested
Create a corrected VM-509 Boros replacement recovery candidate after independent review requested changes, then record the exact corrected candidate SHA without certification or independent review.

## Files reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- Boros canonical raw packet, generated WR consumers, semantic provenance, fixtures, CRIT-001 ledgers

## Files changed
Candidate commit `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436` contains Boros review corrections, regenerated artifacts/provenance, and workflow records. This workflow-record commit updates only VM-509 card/report/ledger/board/handoff/index records with the exact corrected replacement candidate SHA.

## What changed
- Corrected replacement candidate parent: `4d351747f0634663ea8f796099057e431af8a65b`.
- Corrected replacement candidate SHA: `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436`.
- Superseded rejected candidate: `c2f5d064460a007f0dca6be95b7beabb4ca85026`.
- Superseded rejected workflow record: `d7f2523d53cfbc6420e75c83b9ab03192158a1a1`.
- Earlier failed candidate/workflow remain superseded: `abff94b91e94b99a6b2a77b71806a9d005ecec76`, `25420bad09715645ba4af37f07cac097b3e7966d`.
- Generated WR key figures no longer use discovery records as source-backed faction proof.
- Tajic is not emitted as authoritative generated Boros key-figure proof.
- Claim 026 Gatecrash locator is corrected.

## Why it changed
Independent review requested changes because generated Boros key-figure chains still presented discovery records as source-backed proof and claim 026 had a mismatched locator label.

## Decisions made
- Do not certify Boros.
- Do not start independent review.
- Do not start another identity.
- Do not change builder code; the cause was WR/Boros stale display-source preservation, not builder behavior.

## Risks / uncertainties
Independent Gate 5 review is still required before any Boros certification action.

## Tests run
- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WR`
- `npm.cmd run validate:source-generated -- --targets=WR`
- `node research/validate-semantic-readiness.mjs --fixtures`
- `node research/audit-semantic-readiness.mjs --targets=WR`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `node research/semantic-candidate-scope-tests.js`
- formal staged-tree candidate-scope guard: passed for WR
- `git diff --check`

## Not touched
- Non-Boros raw packets
- Contract v1.1, schemas, validators, builder scripts, Hall, Crucible, scoring behavior, inhibition behavior, confidence behavior, scheduling, tie ordering, and global recruiter behavior
- Main worktree `C:\dev\mtgSiteWIP`

## Follow-up recommendations
Send corrected replacement candidate `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436` to independent Gate 5 review. Do not certify unless that exact SHA is approved.

## Next suggested agent
Independent Gate 5 reviewer.

## Related Kanban card, docs, or plans
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
