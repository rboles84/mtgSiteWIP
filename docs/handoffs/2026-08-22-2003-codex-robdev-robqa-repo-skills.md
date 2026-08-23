# Agent Handoff: Codex - RobDev And RobQA Repo Skills

Date: 2026-08-22 20:03 MDT

Related card: VM-584

Status: Complete; documentation-only QA-0 complete; durability closeout authorized

## Agent Name

Codex

## Task Requested

Extract the repository's RobDev and RobQA workflow portions as usable Markdown-backed skills under `.agents/skills`, add focused in-folder usage documentation, and update the living agent, preflight, learning, QA, workflow, and handoff surfaces without over-expanding the change.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `docs/handoffs/HANDOFF_INDEX.md` and relevant VM-556, VM-557, and current VM-580 handoffs
- `docs/kanban/board.md` and VM-556, VM-557, and VM-584 cards
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `.codex/prompts/preflight.md`, `.codex/prompts/plan.md`, and `.codex/prompts/test.md`
- `docs/reference/workflow.md`, `docs/qa/vox-mana-test-plan.md`, and `docs/reference/manual-test-cases.md`
- The local `skill-creator` and `openai-docs` skill instructions
- Official OpenAI skill documentation at `https://learn.chatgpt.com/docs/build-skills`

## Files Changed

- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/test.md`
- `docs/reference/workflow.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/manual-test-cases.md`
- `docs/strategy/2026-08-22-robdev-robqa-skill-extraction-learning.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-584-robdev-robqa-repo-skills.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Added two thin repo-local `SKILL.md` discovery entrypoints.
- Added one practical supporting guide inside each skill folder: `robdev.md` and `robqa.md`.
- Kept the full frozen gates in their existing master documents and made the skill layers route to them.
- Added concise skill invocations to living planning, implementation, testing, QA, manual-review, workflow, learning, and handoff instructions.
- Closed VM-584 on the file-based Kanban board.

## Why It Changed

The repository had strong frozen workflow authorities but no compact repository-local discovery and usage layer. These skills make the gates available where agents naturally discover and invoke them while avoiding a second copied authority.

## Decisions Made

- The source hierarchy is `SKILL.md` discovery, focused in-folder usage guide, then the complete frozen master gate.
- RobDev and RobQA remain separate skills because implementation grounding and risk-proportional QA are distinct responsibilities.
- Historical handoffs and completed work cards were not rewritten to advertise the new skills.
- No scripts, `agents/openai.yaml`, plugin packaging, or runtime machinery were added.

## Risks / Uncertainties

- The official quick validator could not start because its bundled Python environment lacks the `yaml` module. Equivalent manual frontmatter and content checks passed, and no dependency was installed.
- Durability closeout is authorized on the existing `codex/vm580-vm583-owner-qa-remediation` branch; final commit and push state must be reported after execution.
- Concurrent VM-580 handoff/index work and the unrelated untracked Maze language corpus were preserved.

## Tests Run

- Official `quick_validate.py` attempted for both skills: blocked before validation by `ModuleNotFoundError: No module named 'yaml'`.
- Manual frontmatter shape and placeholder checks: pass for both skills.
- Local Markdown-link verification across changed skill and workflow documents: 0 failures.
- Required RobDev and RobQA invocation-surface searches: pass.
- Frozen authority diff check for `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`: no changes.
- `git diff --check`: pass; only the existing PowerShell LF-to-CRLF warning was reported.
- Runtime or product test suites: not run; QA-0 documentation-only change.

## RobDevPass Implementation Packet

- Changed behavior: repo agents can discover and invoke RobDev and RobQA from `.agents/skills`, with practical usage guidance available inside each folder.
- Protected behavior: frozen gate text, runtime/product behavior, data and generated authorities, CRIT-001 controls, current VM-580 through VM-583 changes, and unrelated user work.
- Owning authority: repository skill discovery plus `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`.
- Producer: hand-authored Markdown in the repo's agent, prompt, reference, strategy, QA, Kanban, and handoff layers.
- Reused machinery: existing gate documents and existing workflow surfaces.
- Consumers: Codex and Claude agents operating in this repository.
- Realistic risks: malformed metadata, broken links, vague triggers, duplicated policy, or missing invocation surfaces.
- Smallest complete implementation: two entrypoints, two supporting guides, concise workflow wiring, learning note, card, and handoff.
- Non-goals: runtime, tests, data, plugin packaging, validator dependency installation, or frozen-gate rewrites.
- Stop conditions: any need to alter a frozen source gate, duplicate substantial policy, or touch unrelated active work.

## RobQAPass Readiness

- QA tier: QA-0.
- Changed behavior: skill discovery, guidance, and living workflow invocation.
- Protected contracts: source-authority separation, valid skill metadata, resolvable local links, scoped changes, and unchanged frozen gates.
- Selected validation: manual metadata/content checks, link verification, invocation searches, authority diff, status review, and whitespace validation.
- Selection reason: these checks deterministically cover a Markdown-only workflow change without spending runtime test cost.
- Intentionally skipped: parser, unit, integration, browser, visual, journey, synthetic, mutation, recovery, and exhaustive suites.
- CPU-heavy validation: `NOT REQUIRED`.
- Rendered evidence: not applicable; no visible product surface changed.
- Findings converted to invariants: none; no owner defect finding was supplied.
- Remaining owner judgment: optional wording review of the two focused usage guides.
- Owner review route: inspect the four files under `.agents/skills/robdev` and `.agents/skills/robqa`.

## Not Touched

- Runtime application code, product UI, data, generated files, telemetry, persistence, placement, CRIT-001 records, and frozen gate documents.
- VM-580 through VM-583 implementation files.
- The unrelated `docs/research/maze-player-language/corpus/` tree.

## Follow-Up Recommendations

- Use `robdev` for non-trivial implementation planning/execution and `robqa` for validation selection, findings, and owner-review preparation.
- If the validator environment later gains `PyYAML`, rerun the official quick validator as a convenience check; it is not a reason to install a new repo dependency for this change.

## Durability Closeout

- Owner authorized a dedicated VM-584 commit and push on the existing feature branch.
- Stage only the VM-584 allowlist and the VM-584 handoff-index row.
- Preserve the separate VM-580 handoff/index row, Archscry CSS edit, and VM-578 corpus outside the commit.

## Next Suggested Agent

The normal implementation owner using the repo-local RobDev and RobQA skills on the next scoped change.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-584-robdev-robqa-repo-skills.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/strategy/2026-08-22-robdev-robqa-skill-extraction-learning.md`
