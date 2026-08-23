# Repo Skill Extraction Lessons - VM-584

Date: 2026-08-22
Grounded in: VM-556, VM-557, VM-584

## Purpose

These lessons preserve how Vox Mana turns a large governing workflow into a usable repo-local skill without creating a second authority or leaving the skill disconnected from the repository's actual agent workflow.

## 1. Discovery, usage, and authority are different layers

A durable workflow skill has three distinct jobs:

- `SKILL.md` provides discovery, trigger boundaries, and routing;
- a focused supporting Markdown file explains how to use the workflow in this repository;
- the frozen governing document remains the final authority.

Do not make the entrypoint carry the entire workflow, and do not let the supporting guide become a competing framework.

## 2. Supporting docs should change decisions

The skill guide should preserve the practical decisions an agent needs while working: authority order, pre-flight, pre-edit contract, reuse, protected boundaries, stop conditions, handoff fields, and completion meaning.

It should not copy every example, historical explanation, or full policy section from the authority.

## 3. Repo-local skills must be invoked by living workflow surfaces

Placing files under `.agents/skills` makes them discoverable, but discovery alone does not integrate them.

The living agent instructions, preflight, planning, testing, workflow, QA catalogs, learning records, and handoff template should point to the repo-local skill and its usage guide while preserving the frozen authority link.

Historical cards and handoffs remain historical evidence and should not be rewritten merely to add a newer skill path.

## 4. Keep RobDev and RobQA separate

RobDev owns repository grounding, authority and producer routing, implementation boundaries, the smallest complete journey, and the implementation packet.

RobQA owns risk classification, validation selection, rendered self-QA, owner-finding interpretation, regression invariants, and bounded owner review.

Combining them would blur when implementation ends and validation selection begins.

## 5. Validate the invocation chain

A QA-0 skill integration should prove:

- both skill folders live under the intended repository `.agents/skills` path;
- each `SKILL.md` has valid metadata and links its supporting guide;
- each guide links the correct frozen authority;
- living workflow surfaces point to the repo-local skills;
- no runtime, product, source data, generated data, or frozen authority changed;
- the required Kanban and handoff records are current.

## Operational Rule

When extracting another large workflow:

> Keep the source authority singular, make the entrypoint cheap to discover, put practical use in one focused supporting document, and wire the skill into the workflow surfaces that actually govern agent behavior.
