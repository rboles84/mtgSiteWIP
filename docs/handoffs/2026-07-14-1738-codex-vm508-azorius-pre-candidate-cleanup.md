# VM-508 Azorius Pre-Candidate Scope Cleanup Handoff

Agent name: Codex

Task requested: Complete bounded VM-508 Azorius pre-candidate scope cleanup only, resolving the two candidate-scope blockers without candidate creation, independent review, certification, or another identity start.

Files reviewed:

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-14-1317-codex-vm508-azorius-gate3-remediation.md`
- `docs/handoffs/2026-07-14-1616-codex-vm508-azorius-gate4-validation.md`
- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-readiness-lib.mjs`
- Azorius raw profile and placement files

Files changed:

- `data/raw-factions/azorius_senate/azorius_senate.profile.json`
- `data/raw-factions/azorius_senate/azorius_senate.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-14-1738-codex-vm508-azorius-pre-candidate-cleanup.md`

What changed:

- Removed the added `confidence: Medium` field from `q_azorius_senate_9001`.
- Restored `character_id:char_lavinia` as `data_quality.corpus_upgrade.retained_native_ids` discovery metadata rather than as an authoritative `key_figures` entry.
- Rebuilt generated artifacts and semantic-readiness provenance after the canonical cleanup.
- Updated VM-508 report/card/handoff records for cleanup completion.

Why it changed:

- Gate 5 pre-commit verification found a forbidden confidence-field delta and missing parent native ID before any candidate commit existed.
- Directly restoring Lavinia under the parent `key_figures/3` location failed semantic readiness because `key_figures` is an authoritative reference site and the Lavinia record has discovery-only evidence.

Decisions made:

- Kept Lavinia non-authoritative until a separately authorized story/source localization pass can support a substantive Lavinia claim.
- Preserved the Gate 3 remediation intent by not converting discovery records into semantic proof.
- Treated the remaining `data/factions.json` and `data/identity-layers.json` findings as the documented WU/Azorius display-source exception.
- Did not create a candidate commit.

Risks / uncertainties:

- The exact parent `key_figures/3` location was not restored because doing so violates semantic-readiness validation.
- A future deeper Lavinia story-source localization pass could promote Lavinia back into authoritative key figures, but that is outside this cleanup.

Tests run:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WU`
- `npm.cmd run validate:source-generated -- --targets=WU`
- `node research/validate-semantic-readiness.mjs --fixtures`
- `node research/audit-semantic-readiness.mjs --targets=WU`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- Candidate-scope dry-run
- `git diff --check`

Not touched:

- No candidate commit.
- No workflow-record commit.
- No certification commit.
- No independent review.
- No non-Azorius raw packet.
- No Contract v1.1, schema, validator, builder, Hall, Crucible, scoring, inhibition, confidence behavior, scheduling, tie-ordering, or global recruiter behavior.
- Original main worktree at `C:\dev\mtgSiteWIP`, except read-only status checks.
- Prismari, Lorehold, Quandrix, Silverquill, Witherbloom, and Izzet certification state.

Follow-up recommendations:

- Proceed to Gate 5 candidate creation only when explicitly authorized.
- At Gate 5, create the immutable candidate commit first, then record that exact candidate SHA in a separate workflow-record commit.

Next suggested agent: VM-508 Gate 5 candidate creation agent after authorization.

Related Kanban card, docs, or plans:

- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- CRIT-001 Contract v1.1
