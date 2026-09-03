# Codex Handoff - VM-622 Owner-First Visual Verification Governance

Date: 2026-09-02 18:34 MDT

## Agent name

Codex

## Task requested

Codify a durable RobQA policy for machine-verifiable QA, minimal rendered sanity checks, Owner visual/experiential judgment, user-visible automation-failure escalation, and token/compute proportionality. Do not modify Vox Mana production behavior.

## Files reviewed

- AGENTS.md; the only repository AGENTS.md/agents.md instruction surface found.
- .agents/skills/robdev/SKILL.md, .agents/skills/robdev/robdev.md, .agents/skills/robqa/SKILL.md, and .agents/skills/robqa/robqa.md.
- docs/dev/RobDevPass.md and docs/qa/RobQAPass.md.
- docs/reference/token-reasoning-cost-control.md, docs/reference/workflow.md, docs/qa/visual-baseline-waivers.md, relevant owner-review packets, and browser/visual policy search results.
- docs/handoffs/HANDOFF_INDEX.md and recent VM-617, VM-620/621, VM-585, VM-584, and token-governance handoffs.
- docs/kanban/board.md, VM-541, VM-585, VM-556, VM-557, and VM-584 cards.

## Files changed

- AGENTS.md
- .agents/skills/robdev/robdev.md
- .agents/skills/robqa/robqa.md
- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/kanban/in-progress/VM-622-owner-first-visual-verification-governance.md
- docs/kanban/board.md
- docs/handoffs/HANDOFF_INDEX.md
- This handoff

## What changed

- Added the canonical Owner-First Visual Verification Policy to RobQAPass.
- Added the default: one representative desktop render; optional mobile only for direct responsive risk; page/main-content/no-obvious-overflow/no-major-component catastrophic checks; then Owner Review.
- Defined the machine-verifiable automation boundary and the separate Owner visual/experiential boundary.
- Added two pre-render questions, expected-value cost control, bounded broader-render exceptions, a compact Owner-check template, specialized-manual-accessibility restraint, and three concrete examples.
- Added the product-versus-harness decision tree. Owner manual PASS may prove Product: Owner Manual PASS while an automated check remains FAIL / known harness debt.
- Added compact pointers from the root AGENTS.md, RobQA usage guide, and RobDev handoff guidance without duplicating the canonical rule.
- Created VM-622 as In Progress because governance-document acceptance remains an Owner disposition.

## Why it changed

Existing RobQA already required risk-proportional tests and short Owner review, but its broad rendered-first/self-QA wording could be read as requiring extended agent visual analysis. The new policy reconciles that wording while preserving objective rendered, interaction-fidelity, accessibility, and card-specific protected checks.

## Decisions made

- Canonical authority: docs/qa/RobQAPass.md, under Owner-First Visual Verification Policy.
- Root AGENTS.md is the sole repository AGENTS.md/agents.md entrypoint; skill guides are additional operative discovery surfaces.
- RobDev identifies machine-versus-Owner acceptance boundaries and hands them to RobQA; it does not co-own visual-QA policy.
- VM-585 remains controlling when live geometry, timing, pointer travel, or focus modality is itself objective correctness.
- Historical card/packet requirements were left intact as records of their scoped acceptance criteria; no standing current authority was found that mandates six screenshots or exhaustive rendered QA for every UI change.
- VM-541's general token policy remains active and subordinate to task-specific governance; this RobQA policy supplies the QA-specific application.

## RobDevPass compact implementation packet

- Outcome: future agents can discover and follow one durable Owner-first visual-verification rule.
- Current and changed behavior: QA governance documentation and invocation pointers only; no product behavior changed.
- Protected behavior: production routes, JavaScript/CSS, product tests, data/generated artifacts, accessibility automation, VM-585 interaction fidelity, active cards, historical evidence, and untracked Owner-review outputs.
- Authority and producer: Owner instruction; authored Markdown in RobQAPass and its thin instruction surfaces.
- Reused machinery: existing RobQA/RobDev gates, AGENTS.md, Kanban, and handoff system.
- Consumers: future Codex/agent planning, validation, handoff, and Owner-review work.
- Risks: a policy could weaken objective automation, duplicate authority, conflict with rendered guidance, or silently self-accept governance.
- Smallest complete implementation: one canonical section, short pointers, a card, board row, and handoff.
- Non-goals: production, product tests, data, dependencies, new test tooling, historical-card rewrites, branch/merge work, or governance self-acceptance.
- Stop condition: Owner accepts, modifies, or rejects the policy.

## RobQAPass readiness

- Tier: QA-0.
- Changed behavior: durable QA-governance wording and discoverability.
- Protected contracts: canonical RobQA ownership, relative links, objective accessibility/UI automation, VM-585 fidelity, no production change, and no competing long policy copies.
- Selected validation: scoped diff review; required-policy content search; Markdown relative-link target validation; repository instruction-surface inventory; conflicting-standing-policy search; patch-marker check; forbidden-production-path check; git diff --check.
- Result: PASS, apart from normal Git LF-to-CRLF notices and pre-existing untracked Owner-review output directories.
- Intentionally skipped: browser, screenshots, product, engine, journey, synthetic, mutation, recovery, and broad rendered suites. They cannot validate a Markdown-only QA-0 change.
- CPU-heavy validation: NOT REQUIRED.
- Rendered evidence: not applicable; no product surface changed.
- Owner finding/invariant: none; this is an Owner-authored governance request, not a product defect remediation.
- Remaining Owner judgment: accept, modify, or reject the durable policy wording and the exact default boundary.
- Owner review: read docs/qa/RobQAPass.md's Owner-First Visual Verification Policy and confirm its default boundary, manual-failure gate, and classification wording.

## Not touched

Home, Guide, Archscry, Maze, application JavaScript/CSS, product tests, data, generated artifacts, packages, deployment, branches/remotes, VM-595/598, accepted VM-617/620/621 work, and all existing outputs/ Owner-review directories.

## Follow-up recommendations

Keep VM-622 In Progress until the Owner disposition is recorded. If accepted, update only the card status/acceptance checkbox, board location, handoff index, and an owner-acceptance addendum; do not reopen the policy or run product QA without a new finding.

## Next suggested agent

Product Owner for policy disposition; then a documentation steward for lifecycle closeout if accepted.

## Related Kanban card, docs, or plans

- docs/kanban/in-progress/VM-622-owner-first-visual-verification-governance.md
- docs/qa/RobQAPass.md
- docs/dev/RobDevPass.md
- AGENTS.md
- docs/reference/token-reasoning-cost-control.md
- docs/kanban/done/VM-585-vm580-interaction-fidelity-governance.md
