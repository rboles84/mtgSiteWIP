# VM-580 Human Interaction Fidelity Learning

Date: 2026-08-22
Grounded in: VM-580, VM-585

## Purpose

Preserve the process lesson from the VM-580 hover-preview QA escape without turning its product repair
into a special-case rule. The canonical implementation and QA rules live in
[RobDevPass](../dev/RobDevPass.md) and [RobQAPass](../qa/RobQAPass.md); this learning records why those
rules changed.

## What escaped

VM-580 repeatedly passed automated and independent rendered QA while the owner still could not
physically move the pointer from the source card into the interactive preview.

The final reproduction showed that the preview moved ahead of each source pointer position. When the
pointer left the source, it crossed a real rendered gap; the delegated dismissal path saw neither
surface as active and removed the preview before it could receive pointer entry. Earlier tests jumped
from the source directly to the preview or Flip control, so they proved that the destination worked
after arrival without proving that a human could reach it.

After that repair, bounded rendered QA found a second modality defect: pointer-click focus on Flip could
keep the preview alive after pointer exit. Correctness required separating pointer-derived focus from
genuine keyboard or focus-visible ownership.

## Durable lesson

For geometry-, timing-, pointer-, hover-, drag-, scroll-, or focus-sensitive interaction defects, test
fidelity is defined by the user-observed path, not by whether a browser automation tool was involved.

A synthetic enter/leave event, handler call, direct DOM click, selector hover, target teleport, state
mutation, or screenshot can provide supporting evidence. None is sufficient by itself when the defect
depends on travel between rendered regions or on input modality.

The generic VM-580 invariant is:

> source -> rendered gap -> interactive preview -> control -> repeat as required -> leave both -> cleanup

The path must use live rendered geometry and intermediate coordinates when those coordinates determine
ownership. Direct source-to-control teleportation proves reachability of code, not reachability for a
person.

## Development consequence

Before editing an owner-observed interaction defect:

- reproduce the exact affected route, surface, input path, and failure;
- identify the live geometry, event order, timing, focus modality, and activation or dismissal owner;
- compare the lifecycle of a materially similar known-good same-repository interaction before
  inventing another contract;
- for an escaped owner rejection, make the focused regression fail against the rejected behavior for
  the owner's reason when practical;
- encode the defect class at the smallest systemic owner, not the fixture card, identity, or section;
- preserve keyboard, focus-visible, accessibility, and alternate-input behavior.

## QA consequence

Human interaction fidelity is now an explicit acceptance gate. For pointer transitions, QA must use live
source and destination rectangles, traverse intermediate coordinates and any actual gap or overlap at a
human-representative pace, exercise the destination, verify repeat use when required, and prove final
dismissal, focus, or cleanup.

Automated browser coverage remains valuable, but a geometry-, timing-, pointer-, or focus-sensitive
defect also requires a small rendered/manual pass on the exact owner path. The pass should stay bounded;
VM-580 did not justify a broad all-product journey suite.

When owner acceptance fails on behavior or risk that RobQA claimed to have verified, the result is a QA
escape. Capture the owner's reproduction as the next focused regression invariant, require red-before-green
evidence against the rejected behavior when practical, and update the relevant methodology or existing
evaluation surface so that specific evidence gap is less likely to recur.

## Future RobDev/RobQA evaluation scenario

No dedicated RobDev/RobQA agent-evaluation harness existed when VM-585 was authored, so this task does
not create one. Preserve this scenario for the first appropriate skill-evaluation surface:

- Given an interactive preview whose node and Flip control exist and whose direct DOM click succeeds,
  decide whether the candidate is ready.
- A failing evaluator accepts existence, direct click, or target teleportation as sufficient.
- A passing evaluator requires incremental pointer movement through live rendered source/destination
  geometry, destination interaction, repeat use when specified, and post-interaction dismissal/focus
  verification.
- The evaluator should also require the focused witness to be red against the rejected behavior when
  practical.

## Scope boundary

This learning changes project governance only. It does not reopen VM-580 runtime behavior, accepted
VM-581 through VM-583 work, Maze product behavior, placement, data, or generated artifacts.
