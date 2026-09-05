# VM-628 — Archscry Portable Reading Recovery

ID: VM-628
Title: Archscry Portable Reading Recovery
Status: Backlog
Type: Product enhancement / recovery
Area: Archscry completed-reading portability
Priority: Medium
Created: 2026-09-05

## Summary

Preserve the deferred VM-016 idea as a bounded portable recovery experience: a player can use a personal QR-based recovery path to reopen a completed Archscry reading on another device. VM-016's shipped same-browser/device local return remains the baseline.

## Source

- Owner decision: VM-016 **CLOSE + NEW FOLLOW-UP**.
- Predecessor: [VM-016 — Archscry Local Reading Return](../done/VM-016-archscry-profile-return-qr.md).

## Scope

- Personal QR-based recovery for one completed Archscry reading.
- Cross-device portability/recovery of that completed reading.
- Safe invalid, missing, expired, or unavailable recovery behavior.
- Privacy and bearer-link risk assessment appropriate to the selected bounded design.
- Preserve the shipped VM-016 local-device return experience as the default baseline.

This card intentionally does not choose encoded client data, opaque server storage, revocation, expiry, or another technical architecture before implementation grounding and Owner review.

## Explicitly Out Of Scope

- User accounts, Google login, or generalized cloud profiles.
- Social identity, sharing networks, or public profile galleries.
- Large authentication architecture.
- Broad Maze profile resurrection or unrelated persistence redesign.
- Changes to Placement, result meaning, semantic profiles, evidence, or dossier composition.

## Acceptance Criteria

- [ ] One bounded recovery contract defines what reading state is portable and what remains device-local.
- [ ] A personal QR path can recover the intended completed reading on another device without exposing credentials or unnecessary personal data.
- [ ] Invalid, missing, expired, or unavailable recovery data fails safely and offers a truthful path back to a new reading.
- [ ] The shipped VM-016 same-device restore, retake preservation, explicit forget behavior, and Maze handoff remain intact.
- [ ] The selected design documents privacy, bearer-link, revocation/expiry, and storage tradeoffs without expanding into account architecture.

## Files Likely Impacted

- Archscry recovery/persistence owners identified during implementation grounding.
- Focused recovery contract and tests.
- Privacy/terms documentation only if the selected data flow requires it.
- Required Kanban and handoff records.

## Risks

- A portable QR may behave like a bearer credential even without accounts.
- Encoding too much state can expose data or create stale/unmigratable links.
- Backend storage can accidentally expand into a generalized profile or authentication system.
- A new recovery path could regress VM-016's simple local baseline.

## Implementation Prompt

Apply RobDev to the existing VM-016 storage and dossier-return owners, choose the smallest privacy-conscious portability contract, and implement only personal QR/cross-device recovery for a completed reading. Preserve local return as the baseline and stop before accounts, broad cloud profiles, social identity, generalized authentication, Maze profile restoration, persistence redesign, or semantic/Placement change.

## Notes

Backlog only. No QR or portability implementation is authorized by creation of this card.
