# VM-016 - Archscry Profile Return QR

ID: VM-016
Title: Archscry Profile Return QR
Status: backlog
Type: Enhancement
Area: Archscry, Maze
Priority: medium
Created: 2026-05-15

## Summary

Add a profile-return loop for completed Archscry readings. The printed LGS QR stays a public, generic entry into Archscry, while a completed reading can later generate a personal return link or QR so the player can revisit their dossier, Maze handoff paths, saved commander ideas, and future profile refinements.

## Problem

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

## Acceptance Criteria

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

## Open Questions

- Should the MVP support only one saved profile or multiple saved readings?
- Should the return QR be printable as a Vox Mana profile card?
- Should the profile expire after a period of time?
- Should the user be able to name the profile locally without sending that name to a backend?
- Should the return QR use a compact encoded client-side snapshot or wait for backend profile storage?

## Human Review

Yes - this is a product-shaping backlog item and needs human confirmation before implementation starts.

## Notes

Keep the public LGS QR generic and the return QR personal. The return story should stay anonymous-first and separate from repeat-visit polish or Commander Compass fit-check work.
