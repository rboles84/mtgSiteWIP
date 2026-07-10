# Accessibility Evidence Pass

Date: 2026-07-03
Related card: VM-464
Status: No P0/P1 accessibility blocker found

## Validation

- `npm.cmd run lint:html` passed.
- Browser probes used Microsoft Edge against a local static server.

## Evidence

| Area | Evidence | Result |
|---|---|---:|
| Keyboard/focus | Home at `390px` produced 12 unique visible focus targets in the first 12 Tab presses: brand link, Feedback, menu, hero signal, hold signal, route cards, back-to-top, and footer links. | Pass |
| Reduced motion | Home with `prefers-reduced-motion: reduce` matched the media query and rendered static signal text containing `Still`. | Pass |
| Strategium tabs | Six `.vm-tab[data-topic]` tabs exist and clicking through them leaves exactly one tab with `aria-selected="true"`. | Pass |
| Apocrypha source shelves | Nine `details` shelves were present and the first shelf toggled open/closed. | Pass |
| Maze modal/dialog | `#modal-wrap` has `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, `tabindex="-1"`, and the close button has `aria-label="Close card details"`. | Pass |
| Chart fallback | Blocking `assets/js/graph.js` on Home revealed the fallback text: `Identity signal radar unavailable right now. The compact signal caption remains available.` | Pass |
| Dossier radar fallback | Source scan confirms `assets/js/dossier-radar.js` exposes `data-dossier-radar-fallback` with text fallback `Radar preview unavailable right now. The identity reading remains available.` | Pass |
| Modal inert/Escape support | Source scan confirms `research/research-init.js` sets/removes `inert` around modal background targets and handles `Escape` close behavior. | Pass |

## Follow-Up Cards

None opened. No small P0/P1 accessibility fix was discovered.

## Limits

This was a targeted release-evidence pass, not a full screen-reader audit. NVDA/VoiceOver, Safari/iOS, Android TalkBack, and axe automation remain future hardening options.
