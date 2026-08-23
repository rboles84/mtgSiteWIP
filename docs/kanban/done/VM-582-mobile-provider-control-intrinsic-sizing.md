# VM-582 - Mobile Provider Control Intrinsic Sizing

ID: VM-582
Title: Mobile Provider Control Intrinsic Sizing
Status: Done
Type: Responsive layout repair
Area: Archscry provider controls
Priority: Medium
Created: 2026-08-22

## Source

Owner observation during VM-579 acceptance.

## Finding

At narrow widths, EDHREC, Archidekt, MTGDecks, and equivalent provider chips/rows stretch across most of the container with unused space in Precon Starting Points and Commander Browsing Starts.

## Required outcome

- Shared provider controls size and align appropriately to their content on narrow screens.
- Precon and Commander Browsing surfaces remain readable, tappable, wrapped, and free of horizontal overflow.
- Desktop layout and provider destinations remain unchanged.

## Causality and ownership

The current narrow-width `.service-chip { width: 100%; ... }` behavior and related precon provider styles predate VM-579. VM-579 added only the separate development panel/direct-review CSS. This is a shared responsive-layout follow-up.

## Not authorized by this intake

No implementation, global chip redesign, provider-routing change, or VM-579 scope expansion. Inspect both named consumers and the shared selector before editing.

## Gate A Preflight — 2026-08-22

- Shared owner: `.service-chip` in `assets/css/archscry.css` styles provider controls emitted by `buildLinkButtons` for both Precon Starting Points and Commander Browsing Starts.
- Stretch cause: the `@media(max-width:700px)` rule explicitly applies `.service-chip { width:100%; justify-content:flex-start }`.
- Affected consumers: the same forced width produced a measured `1.0` chip/parent width ratio in both visible precon and Commander Browsing surfaces at 390x844.
- Smallest complete change: keep the shared mobile rule but use intrinsic/fit-content width with `max-width:100%` and the existing minimum height/padding, preserving wrapping, tap size, and desktop behavior.
- QA tier: QA-2 responsive presentation.
- Stop condition: stop if separate consumer-specific layout owners are required. Preflight proves one shared rule owns both defects.

## RobDev implementation and QA — 2026-08-22

- Kept the shared mobile `.service-chip` seam and replaced only its forced `width:100%` with `width:fit-content; max-width:100%`; provider markup, routes, desktop rules, and consumer-specific layouts are unchanged.
- Focused 390x844 browser automation and rendered QA covered both Precon Starting Points and Commander Browsing Starts for EDHREC, Archidekt, and MTGDecks.
- Visible controls measure 42.6px high, remain content-sized where content fits (approximately 35%–73% of their parent width), wrap safely, and produce zero horizontal overflow.
- `npm run test:post-vm579-owner-qa`, JS lint, HTML validation, and frontend smoke pass. Independent exact-SHA RobQA remains required before owner review.

## Acceptance Criteria

- [x] Visible EDHREC, Archidekt, and MTGDecks controls size to content up to the available width at 390x844.
- [x] Precon Starting Points and Commander Browsing Starts both use the shared correction.
- [x] Controls remain at least 42px high, readable, tappable, and free of clipping/collision.
- [x] No mobile horizontal overflow and no unintended desktop layout change.
- [x] Focused geometry automation, rendered RobDev QA, and independent exact-SHA RobQA pass.

## Independent exact-SHA RobQA — 2026-08-22

- **PASS — Owner Review Ready** on exact candidate `44547a8c967e56d67090b9b5bafb7bf4eb868e11` against parent `fa3eafefacf6c1518753bda6fd4261070e624aae`.
- Euclid independently verified both named mobile consumers at 390x844 (42.63px tap height, approximately 35.3%–73.5% parent width, zero overflow) and desktop protection with optical inspection and zero console errors.
- Awaiting only bounded owner acceptance; do not merge, push, close, or mark Done yet.

## Owner acceptance — 2026-08-22

- **PASS — OWNER ACCEPTED.** Freeze VM-582 implementation and responsive presentation during the remaining VM-580 remediation.
- Do not modify this work unless a direct VM-580 regression makes a correction unavoidable.

## Lifecycle closeout - 2026-08-22

- VM-582 was already owner accepted before final VM-580 remediation.
- No product implementation changed during this batch closeout.
- Lifecycle state: Done.
