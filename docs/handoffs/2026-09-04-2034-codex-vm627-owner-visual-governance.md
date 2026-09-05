# VM-627 Owner-Visual Governance Repair Handoff

- Agent: Codex
- Task requested: Make OWNER-VISUAL MODE the default Vox Mana QA boundary without weakening objective engineering verification or repairing browser harnesses.
- Related work: [VM-627](../kanban/in-progress/VM-627-owner-visual-governance-repair.md), [workflow](../reference/workflow.md), [RobDevPass](../dev/RobDevPass.md), [RobQAPass](../qa/RobQAPass.md)

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md` and `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `.codex/prompts/plan.md` and `.codex/prompts/test.md`
- `docs/reference/workflow.md`
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`
- `package.json` and `scripts/vm616-maze-context-recovery-browser.mjs` only to confirm the named harness surfaces still exist

## Files Changed

- `docs/qa/RobQAPass.md`
- `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/robqa.md`
- `.agents/skills/robdev/robdev.md`
- `.codex/prompts/test.md`
- `.codex/prompts/plan.md`
- `docs/reference/workflow.md`
- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-627-owner-visual-governance-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed And Why

`RobQAPass.md` now owns one default OWNER-VISUAL MODE definition. It assigns subjective visual judgment to
the Owner, objective correctness to Codex, makes browser use changed-risk-driven, makes screenshot and
visual-regression work opt-in, and stops unrelated or ambiguous harness investigation after one reasonable
causal check. Downstream governance now points to that rule instead of requiring a rendered witness for
every visible change.

This removes the prior conflict where active RobQA, prompts, and workflow language could turn visible UI or
CSS work into mandatory browser walkthroughs, screenshots, viewport passes, or repeated harness diagnosis.

## RobDev Packet

- Intended outcome: durable test-selection behavior, not a browser ban.
- Owning authority and producer: `docs/qa/RobQAPass.md`; RobDev, RobQA usage guidance, prompts, workflow, and `AGENTS.md` consume it.
- Changed behavior: responsibility boundary, verification hierarchy, browser justification, and failure stop rule.
- Protected behavior: meaningful static, unit, schema, data, contract, integration, DOM, interaction, state, routing, keyboard, focus, accessibility, and risk-justified browser checks.
- Consumers/blast radius: repository agents and the standard Owner Review lifecycle; no runtime consumer changed.
- Smallest complete implementation: one canonical policy plus concise active references.
- Non-goals: production UI, test scripts, VM-616, historical cards/handoffs, harness architecture, or broad RobQA redesign.
- Stop condition: active governance is consistent and QA-0 document checks pass.

## Decisions Made

- OWNER-VISUAL MODE is the normal default and only a current Owner request or current stricter protected changed-risk requirement broadens it.
- A browser is expected only when objective behavior cannot be protected reliably and more cheaply below it.
- Historical test language and harness existence do not create execution obligations.
- Known or suspected unrelated harness debt does not block Owner Review when directly relevant checks are green.

## Harness Disposition

- `test:browser-smoke` still exists and is not a general-purpose required gate.
- `test:maze-onboarding-browser` still points to the VM-616 script, which contains screenshots, multiple animation-sensitive waits, and desktop/mobile witnesses. It is not a general-purpose required gate.
- No harness was executed or repaired. If splitting or hardening is worthwhile, use a dedicated follow-up card.

## Risks / Uncertainties

- The policy cannot prevent an explicitly broader current Owner request or a stricter protected workflow from requiring browser evidence; it requires the changed-risk justification to be stated.
- Existing historical records retain their original test claims as history and were intentionally not rewritten.

## Tests Run

- Targeted contextual contradiction searches over the active governance surfaces: PASS after residual pointer/render language was narrowed.
- Markdown relative-link target check across the changed governance documents and card: PASS.
- `git diff --check`: PASS.
- Browser, screenshot, visual, runtime, and historical regression suites: intentionally not run; QA-0 governance change only.

## RobQA Readiness

- QA tier: QA-0.
- Changed behavior: active governance selects the lowest reliable objective layer and defers subjective visuals to the Owner.
- Protected contracts: objective correctness checks and focused browser evidence when materially necessary.
- CPU-heavy status: prohibited for this task and not run.
- Objective evidence: targeted policy assertions, contradiction scan, link validation, scoped diff review, and whitespace check.
- Browser justification: none; no runtime behavior changed.
- Remaining Owner judgment: approve the responsibility boundary and wording.
- Status: READY for Owner review; exact-candidate QA-0 verification is recorded after the material commit.

## Not Touched

- Production UI, CSS, JavaScript, application data, browser/test harness code, VM-616 behavior, old cards, and historical handoffs.

## Follow-Up Recommendations

- Optional separate card: split objective VM-616 interaction assertions from screenshot/animation witnesses and harden fresh-session browser smoke. Do not fold that work into unrelated implementation.

## Next Suggested Agent

- Owner: review the canonical section and concise downstream references. No specialist implementation agent is needed unless the policy wording is rejected.
