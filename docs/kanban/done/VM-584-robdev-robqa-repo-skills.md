# VM-584 - RobDev And RobQA Repo Skills

ID: VM-584

Status: Done

Type: Documentation / workflow tooling

Area: Repository agent skills

Priority: Normal

Created: 2026-08-22

## Summary

Expose the existing frozen RobDevPass and RobQAPass workflow authorities as two repo-local Codex skills with thin `SKILL.md` entrypoints, focused supporting usage documents, and concise invocation from the repository's living workflow surfaces.

## RobDevPass Contract

- Owning layer: repository skill discovery under `.agents/skills`.
- Authoritative producers: `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`; the skills are concise invocation surfaces only.
- Existing machinery reused: the compact-agent instructions already maintained by each authority.
- Changed behavior: agents can explicitly or implicitly invoke the implementation and QA gates as separate skills.
- Protected behavior: the frozen gate text, product/runtime behavior, source authority, test contracts, CRIT-001, active VM-580 through VM-583 work, and unrelated dirty files.
- Smallest complete implementation: one `SKILL.md` entrypoint and one focused usage document for each gate, plus concise references from the existing agent, prompt, workflow, learning, and handoff surfaces.
- Non-goals: no scripts, UI metadata, plugin packaging, runtime changes, gate rewrite, or duplication of either full frozen authority.
- Stop conditions: any need to edit a frozen authority, duplicate substantial policy, or touch unrelated active work.

## QA Classification

- QA tier: QA-0.
- Realistic risks: invalid skill metadata, broken authority links, ambiguous trigger descriptions, or policy duplication.
- Validation: skill quick validation, targeted path/content checks, changed-file scope, and `git diff --check`.
- CPU-heavy validation: `NOT REQUIRED`.

## Acceptance Criteria

- `.agents/skills/robdev/SKILL.md` invokes RobDevPass for implementation work.
- `.agents/skills/robdev/robdev.md` explains the practical Vox Mana RobDev workflow and boundaries.
- `.agents/skills/robqa/SKILL.md` invokes RobQAPass for QA selection and owner-review preparation.
- `.agents/skills/robqa/robqa.md` explains risk classification, validation selection, rendered QA, findings, and owner handoff.
- Both skills preserve the separation between implementation and QA ownership.
- Both skills point to the frozen repository authorities instead of copying the full gates.
- `AGENTS.md`, `CLAUDE.md`, preflight/planning/testing prompts, workflow guidance, learnings, and the handoff template invoke the repo-local skills concisely.
- No runtime, test, data, or existing active-work file is changed by VM-584.
- QA-0 checks pass and the required handoff is recorded.

## Completion

Completed: 2026-08-22

- Added thin repo-local entrypoints at `.agents/skills/robdev/SKILL.md` and `.agents/skills/robqa/SKILL.md`.
- Added focused in-folder usage guides at `.agents/skills/robdev/robdev.md` and `.agents/skills/robqa/robqa.md`.
- Wired the skills into `AGENTS.md`, `CLAUDE.md`, preflight, planning, testing, workflow, QA, manual-review, learning, and handoff surfaces.
- Preserved `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md` as the unchanged source authorities.
- Passed manual frontmatter, placeholder, local-link, invocation-coverage, changed-scope, and whitespace checks.
- The official skill quick validator was attempted but could not start because its bundled Python environment lacks `PyYAML`; no dependency was installed for this documentation-only change.
- Runtime, product, data, generated, CRIT-001, and active VM-580 through VM-583 files were not changed.
