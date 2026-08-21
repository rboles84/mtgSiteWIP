# Boundary Control Lessons - VM-570 Through VM-574

Date: 2026-08-20
Grounded in: VM-570, VM-569, VM-574

## Purpose

These lessons preserve the delivery boundaries learned during the VM-570, VM-569, and VM-574 sequence so future agents do not turn narrow work into adjacent cleanup, weaken existing controls to make a task pass, or reopen accepted product work unnecessarily.

## 1. Scope lock means stop at the authorized layer

When a task authorizes architecture, data, content, presentation, QA, or governance work, remain inside that layer.

A newly discovered adjacent issue is not automatically part of the current task.

- Fix it only if it blocks the explicit acceptance criteria.
- Otherwise record it and leave it for separate work.
- Passing the requested scope is the stopping condition.

## 2. Generated projections are not authored truth

Generated artifacts, indexes, projections, manifests, and caches are derived products.

When they disagree with governed authored data:

- determine which source is authoritative;
- regenerate through the normal pipeline where possible;
- do not hand-edit generated output to manufacture agreement;
- do not allow the projection to redefine authored product intent.

VM-569 reinforced this distinction during the Scryfall/media reconciliation.

## 3. Drift gates should be reconciled, not weakened

A drift gate reporting change is evidence that must be classified.

Do not weaken, bypass, or redefine the gate merely because refreshed source data causes legitimate differences.

Instead:

1. Compare old and new state.
2. Classify the drift.
3. Distinguish semantic selection change from harmless source/printing refresh.
4. Explicitly accept legitimate drift through the existing governed mechanism.
5. Return the system to a zero-drift steady state.

## 4. Shared-path commits require semantic preservation

A staged-diff hash is useful as a temporary preservation guard, but it is relative to `HEAD`.

If another legitimate commit changes shared governance or evidence paths, an old staged digest may become impossible to preserve byte-for-byte.

In that situation:

- preserve the substantive candidate;
- prove selections, ordering, behavior, and owned product files are unchanged;
- record why the digest changed;
- establish a new digest against the new `HEAD`.

Do not distort commit boundaries merely to preserve an obsolete hash.

## 5. Owner UI findings become narrow invariants

Owner review findings should produce the smallest testable rule that prevents recurrence.

Examples from VM-574:

- rejected WUBRG cards caused exactly two bounded substitutions, not another 333-card curation pass;
- broken Oracle truncation became a word-boundary invariant;
- raw mana notation became a shared Card Details rendering invariant;
- the tap-symbol defect became the specific `{T} -> ms-tap` mapping.

Do not use a narrow owner finding as permission for broad redesign.

## 6. Acceptance freezes product work

Once the owner accepts the candidate:

- product/content/runtime changes stop;
- closeout becomes governance and integration work only;
- any new unrelated finding requires separate classification and authorization.

A closeout task must not silently become another remediation task.

## 7. Deployment and validation are separate signals

Report deployment and validation independently.

A successful production deployment does not make a separate validation failure disappear.

A validation failure also does not automatically invalidate an already accepted and successfully deployed VM.

Record both facts separately and classify the validation failure before deciding whether any product work must reopen.

## Operational Rule

When uncertain, ask:

> Is this action directly necessary to satisfy the explicit acceptance criteria of the current task?

If no, stop, record it if useful, and leave it outside the current scope.
