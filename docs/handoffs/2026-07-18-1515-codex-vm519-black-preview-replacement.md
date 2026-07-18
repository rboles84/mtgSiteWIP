# 2026-07-18 15:15 - Codex - VM-519 Black Preview Replacement

## Agent Name

Codex

## Task Requested

Remediate the single approval-blocking DRIFT-015 finding from the rejected VM-519 Black candidate `5bffc3465786c18950d32dcb6f056504b3b8e668`, create one implementation-only replacement candidate, then record a governance-only replacement workflow without performing independent review, approval, certification, semantically_ready transition, program-base advancement, VM-520 work, original-main modification, or Excel update.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-18-1306-codex-vm519-black-drift-preflight.md`
- `docs/handoffs/2026-07-18-1334-codex-vm519-black-gate1-gate2.md`
- `docs/handoffs/2026-07-18-1354-codex-vm519-black-candidate.md`
- `docs/handoffs/2026-07-18-1449-codex-vm519-black-independent-review.md`
- `docs/handoffs/2026-07-17-2036-codex-vm516-simic-preview-remediation.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-519-black-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-519-black-drift-preflight.md`
- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/incidents/recoveries/VM-519-black-independent-review.md`
- `docs/reference/semantic-readiness-contract.md`
- `data/raw-factions/black/black.claims.json`
- `data/raw-factions/black/black.profile.json`
- `data/raw-factions/black/black.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/black.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

Implementation candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`:

- `data/identity-layers.json`
- `data/factions.json`

Workflow/governance:

- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/kanban/backlog/VM-519-black-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-18-1515-codex-vm519-black-preview-replacement.md`
- `docs/handoffs/HANDOFF_INDEX.md` with only the VM-519 replacement row intended for staging

## What Changed

Replaced the stale Black preview:

`Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`

with:

`Black claims agency by turning costs, risks, and resources into leverage. Its power is deliberate, consequential, and not cruelty for its own sake.`

The source-owned preview in `data/identity-layers.json` was edited first. `npm.cmd run build:factions` propagated the embedded `data/factions.json` consumer. Governance now records replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8` as awaiting a fresh independent review.

## Why It Changed

Independent review `118facf42dd5b613d3aa946de6b3968b24e9455a` returned `REQUEST CHANGES` because rejected candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` retained generic ambition/self-definition/pragmatism/survival/claim-agency preview text after the accepted Black packet had narrowed around cost, risk, resource conversion, leverage, opportunity, consequence, and non-villain framing.

## Decisions Made

- Treated `data/identity-layers.json#/expressions/B/preview_text` as authoritative preview source.
- Treated `data/factions.json#/identity_layers/expressions/B/preview_text` as generator-owned embedded consumer.
- Did not hand-edit `data/factions.json`; it was regenerated.
- Preserved rejected candidate history and did not amend or squash it.
- Treated candidate-scope exit 1 as a documented DRIFT-015 target-scoped display-source exception limited to the two preview paths.
- Did not perform independent review, approval, certification, semantically_ready transition, program-base advancement, VM-520, original-main, or Excel work.

## Risks / Uncertainties

- The replacement candidate still requires a fresh independent review.
- Candidate-scope validation exits 1 because `data/identity-layers.json` and embedded `data/factions.json` are display-source/global paths outside the strict identity candidate allowlist. This is documented as the exact B display-source exception and remains subject to review.
- `npm.cmd run test:source-generated` retains known unrelated JESKAI/MARDU model-owned inhibitor warnings.

## Tests Run

- `npm.cmd run build:factions` - exit 0.
- `npm.cmd run build:factions` - exit 0, deterministic rerun.
- JSON parse for `data/identity-layers.json` and `data/factions.json` - exit 0.
- Source-to-embedded preview equality script - exit 0.
- Exact rejected-preview search in active `data`, `supabase`, and `research` surfaces - exit 1, no hits.
- Fragment stale searches - exit 0 only for unrelated Bant `Private self-definition`; no active Black stale preview.
- Manual role/provenance/fixture/frozen/preview regression script - exit 0.
- `node research/audit-semantic-readiness.mjs --targets=B` - exit 0.
- `node research/validate-semantic-readiness.mjs --targets=B` - exit 0.
- `node research/semantic-candidate-scope-tests.js` - exit 0.
- `npm.cmd run test:semantic-readiness` - exit 0.
- `npm.cmd run test:placement` - exit 0.
- `npm.cmd run test:faction-context-isolation` - exit 0.
- `npm.cmd run test:source-generated` - exit 0 with known unrelated JESKAI/MARDU warnings.
- `npm.cmd test` - exit 0.
- `git diff --check` - exit 0 with line-ending warnings only.
- `node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=0bfe8b3d46d163de6e20064f5de9717075ca02c8 --identity=B` - exit 1, documented B display-source exception only.

## Not Touched

- Black claims, profile, placement, provenance, fixtures, recruiter context, validators, schemas, tests, scoring, calibration, runtime logic, Hall, Crucible, scheduling, and tie-order behavior.
- Non-Black identities.
- Rejected candidate history.
- Certification records beyond not-certified/awaiting-review governance state.
- Program base.
- VM-520.
- Original main worktree contents.
- External Excel tracker.
- Allowed Table Talk baseline files and Table Talk index rows.

## Follow-Up Recommendations

Run a fresh independent review of exact replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`. The review should rerun DRIFT-015 preview ownership, source-to-embedded equality, stale-copy, semantic-equivalent preview, neighbor-pressure, generation determinism, accepted-state regression, and candidate-scope exception checks.

## Next Suggested Agent

Independent reviewer for VM-519 Black replacement candidate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-519-black-semantic-recovery.md`
- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/incidents/recoveries/VM-519-black-independent-review.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
