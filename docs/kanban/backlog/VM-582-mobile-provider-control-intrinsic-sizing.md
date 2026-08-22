# VM-582 - Mobile Provider Control Intrinsic Sizing

ID: VM-582
Title: Mobile Provider Control Intrinsic Sizing
Status: Backlog
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
