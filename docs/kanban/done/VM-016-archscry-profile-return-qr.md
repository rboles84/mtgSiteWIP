# VM-016 - Archscry Local Reading Return

ID: VM-016
Title: Archscry Local Reading Return
Status: Done - Owner Accepted / shipped local-device slice
Type: Enhancement
Area: Archscry, Maze
Priority: medium
Created: 2026-05-15
Completed: 2026-09-05

## Summary

The accepted VM-016 slice gives a completed Archscry reading a durable same-browser/device return path. The normalized reading restores directly to its dossier, survives refresh and retake, preserves the Maze handoff, and can be explicitly forgotten. Portable QR and cross-device recovery were not required for this slice and now belong to [VM-628](../backlog/VM-628-archscry-portable-reading-recovery.md).

## Active Slice — 2026-09-02

Replace the active Google/Supabase profile-save journey with one local-first reading per browser/device. A completed reading is saved automatically, restores directly to its dossier after refresh or a later return on the same device, and can be explicitly forgotten. This slice removes Google save language and the Maze resume request; it does not create a QR, return URL, email sender, cross-device synchronization, anonymous account, or new placement semantics.

### Locked Decisions

- `localStorage` is the sole owner of the active saved-reading copy under a versioned key.
- The latest completed result replaces the prior device-local result only when the new reading completes.
- `Begin Again` leaves the saved copy intact until another reading completes; `Forget this reading` removes it immediately.
- Existing cached session results migrate once into the local key when present.
- The existing result normalization, direct dossier restoration, stable Maze handoff, Reading Finds association, and feature-flagged Terminal remain protected.

### Stop Conditions

- Stop before QR encoding, URL payloads, email/share transport, account migration, profile-schema deletion, or Supabase Terminal changes.
- Do not alter Placement scoring, result shape, evidence, dossier composition, or Maze query behavior.

### Validation And Owner Review

- Deterministic checks passed: JavaScript/HTML lint, frontend smoke, Maze Reading Finds store, 37-faction placement invariants, and the browser device-local return path at 1440px, 820px, 390px, and 320px.
- The device-local browser path proves complete reading, refresh-to-dossier, no Google-save copy, desktop retake preservation, and desktop forget/reset behavior.
- Owner completed the visible Archscry check and authorized this local-return slice for release on 2026-09-03. QR and cross-device recovery remain follow-up scope.

## Closeout

- Owner decision: **CLOSE + NEW FOLLOW-UP**.
- The accepted device-local persistence and profile-return behavior is complete and shipped on current `main`.
- QR and cross-device portability were explicitly deferred from the accepted VM-016 slice; they do not block completion.
- Portable recovery is preserved without an architecture decision in [VM-628 — Archscry Portable Reading Recovery](../backlog/VM-628-archscry-portable-reading-recovery.md).
- No QR, account, cloud-profile, authentication, semantic, Placement, or runtime work was performed during this lifecycle closeout.

## Historical Proposal Context

The sections below preserve VM-016's original broader proposal. They are historical design context, not unfinished VM-016 acceptance scope. Portable QR/cross-device work has moved to VM-628.

### Problem

The current LGS QR concept is strong as an acquisition tool, but it is mostly one-time use. A player can scan the card, take the reading, and leave without an easy way to return to their result. Vox Mana needs a lightweight persistence loop so players can come back to their Commander identity and continue exploring.

## User Story

As a Commander player who completed an Archscry reading, I want a simple way to return to my result later so I can keep exploring commanders, searches, and deck ideas without retaking the whole reading.

## Business Value

This turns the LGS handout from a one-time QR advertisement into the start of a recurring product loop.

Player scan becomes:

`LGS QR -> Archscry -> Profile/Dossier -> Maze -> Saved Paths -> Return Visit`

This supports:

- player retention
- repeat use
- better LGS pitch value
- future profile-based recommendations
- a stronger bridge between in-store discovery and at-home deck brewing

## Proposed UX

Public LGS QR:

- Printed on business cards and promo-card handouts.
- Example: `/archscry?src=lgs-card`
- Purpose: start the Archscry reading.

Return Profile QR:

- Generated after the player completes Archscry.
- Purpose: return to the player-saved reading, profile, or dossier.

Possible UI labels:

- Save Your Reading
- Return to My Profile
- Generate Return QR
- Copy Return Link
- Resume Your Commander Path

Returning user behavior:

- If a saved profile exists locally, Archscry landing should show:
  - Return to Dossier
  - Continue into Maze
  - Start a New Reading
  - Clear Saved Reading
- The return view should open the result dossier, not just the quiz landing page.

## MVP Scope

Phase 1: Static-friendly version

- Save completed Archscry result to `localStorage`.
- Add a return panel on Archscry landing when a saved result exists.
- Add `Copy Return Link` if a safe encoded snapshot approach exists.
- Add `Generate Return QR` for the saved result if QR generation is feasible client-side.
- Ensure the return view opens the result dossier, not just the quiz landing page.
- Add a clear/reset saved profile action.

Phase 2: Anonymous persistent profile

- Create anonymous profile records.
- Use non-sequential, high-entropy profile IDs.
- Do not encode PII in URLs or QR codes.
- Make profiles read-only by default unless the user has a private claim key.
- Allow users to regenerate or revoke return links.
- Track profile return events separately from first-time LGS scans.

## Security / Privacy Guardrails

- Do not store names, emails, or personal data in the profile QR.
- Do not use login session tokens in URLs.
- Do not use predictable IDs.
- Use HTTPS for any backend profile retrieval.
- Treat any return QR as a bearer-style access link unless proper auth exists.
- Keep the initial version anonymous and low-risk.
- Provide a `Clear Saved Reading` option.

## Analytics Events

- `lgs_qr_scan`
- `archscry_started`
- `archscry_completed`
- `profile_saved_local`
- `profile_return_link_copied`
- `profile_qr_generated`
- `profile_returned`
- `profile_cleared`
- `maze_opened_from_profile`

## Historical Acceptance Criteria (Superseded For VM-016 Closeout)

Public QR flow:

- Given a user scans the printed LGS QR, when they land on Vox Mana, then they are taken to the Archscry entry flow.
- Given a user has a saved local profile, when they visit Archscry, then they see an option to return to their last reading.
- Given a user scans the printed LGS QR, when the destination opens, then it remains a generic entry point and does not resolve to a personal profile.

Completed reading flow:

- Given a user completes Archscry, when the result dossier is displayed, then they see a `Save Your Reading` or `Return to My Profile` section.
- Given a user chooses to save their reading, when the save completes, then the result is available after page refresh.
- Given a saved reading exists, when the user clicks `Return to Dossier`, then the dossier loads with the original placement/result context.
- Given a saved reading exists, when the user opens Maze from the dossier, then the Maze handoff still receives the correct reading context.

QR generation flow:

- Given a user has a saved reading, when they choose `Generate Return QR`, then the site displays a scannable QR tied to the return path.
- Given the QR is scanned, when the return path opens, then the user is routed back to the saved profile or dossier view.
- Given no valid saved profile exists, when a return path is opened, then the site shows a safe fallback message and offers to start a new reading.

Privacy:

- The return QR must not expose names, emails, or sensitive personal data.
- The return path must not use a login session token.
- The user must have a way to clear or reset their saved reading.

## Out of Scope For MVP

- Full user accounts
- Email login
- Password-based profiles
- Social sharing
- Public profile galleries
- Paid LGS dashboards
- Store-specific profile ownership
- Long-term recommendation memory beyond the saved Archscry result

## Testing Notes

Test:

- first-time scan
- completed reading save
- browser refresh
- return to dossier
- return to Maze
- clear saved profile
- mobile scan behavior
- no saved profile fallback
- corrupted or invalid return link fallback
- private or incognito browser behavior
- multiple readings saved or replaced

## Historical Open Questions

- Should the MVP support only one saved profile or multiple saved readings?
- Should the return QR be printable as a Vox Mana profile card?
- Should the profile expire after a period of time?
- Should the user be able to name the profile locally without sending that name to a backend?
- Should the return QR use a compact encoded client-side snapshot or wait for backend profile storage?

## Human Review

Yes - this is a product-shaping backlog item and needs human confirmation before implementation starts.

## Notes

Keep the public LGS QR generic and the return QR personal. The return story should stay anonymous-first and separate from repeat-visit polish or Commander Compass fit-check work.
