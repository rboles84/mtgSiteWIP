# VM-622 - Owner-First Visual Verification Governance

ID: VM-622

Status: In Progress — Owner disposition required

Type: Documentation / QA governance

Area: RobQA, agent instructions, Owner review

Priority: High

Created: 2026-09-02

## Summary

Codify RobQA's durable Owner-First Visual Verification policy: agents automate cheap deterministic facts; the Product Owner judges visual, experiential, aesthetic, and immediately observable product quality. For a cheap, visible, ambiguous browser-automation failure, Owner manual verification classifies product defect versus harness debt before material diagnostics consume tokens, compute, or elapsed time.

## Scope

- Make docs/qa/RobQAPass.md the canonical policy authority.
- Add only compact pointers from the root agent entrypoint and RobDev/RobQA skill guidance.
- Reconcile broad rendered self-QA wording with one default lightweight rendered sanity boundary.
- Preserve objective UI and accessibility automation.
- Record an Owner-review-ready governance handoff without modifying production behavior.

## Protected behavior and non-goals

- No Home, Guide, Archscry, Maze, application JavaScript/CSS, product tests, data, generated artifacts, dependencies, or active product cards change.
- No existing accepted work, historical evidence, or the VM-585 human-interaction-fidelity rule is rewritten.
- A card with explicit objective rendered risk or a stricter protected workflow may require broader evidence.

## Acceptance criteria

- [x] RobQA distinguishes machine-verifiable checks from Owner visual/experiential judgment and makes token/compute proportionality a QA-quality requirement.
- [x] The default is one representative desktop render, optional mobile only for direct responsive risk, and catastrophic render/content/overflow/major-component checks.
- [x] A cheap visible ambiguous automation failure routes first to a bounded Owner manual check, with honest Product: Owner Manual PASS versus Automated test: FAIL / known harness debt disposition.
- [x] Objective accessibility and UI automation remain required where appropriate.
- [x] Relevant instruction surfaces point to the RobQA policy without duplicating it.
- [ ] Owner reviews and accepts, modifies, or rejects this governance policy; no self-acceptance is claimed.

## Authority and decisions

- Owner task instruction dated 2026-09-02 authorizes this governance-only change.
- docs/qa/RobQAPass.md owns the canonical policy. AGENTS.md and skill layers are discovery/invocation surfaces; RobDev only identifies the implementation-to-QA boundary.
- The policy supersedes only general rendered-QA wording that could imply extended agent visual analysis. It does not weaken card-specific objective criteria, accessibility contracts, or VM-585's human-fidelity rule.

## Validation plan

QA-0. Validate scoped Markdown links and anchors, required policy terms and pointers, lack of production file changes, git diff --check, and the fresh-agent discovery trace from AGENTS.md to RobQA.

## Owner review requested

Read the canonical policy's default rendered boundary and automation-failure gate. Confirm whether the machine-versus-Owner division, bounded Owner template, and explicit harness-debt disposition are the desired durable rule.
