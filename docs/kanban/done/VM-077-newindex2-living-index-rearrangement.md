# VM-077 - newIndex2 Living Index Rearrangement

ID: VM-077
Title: newIndex2 Living Index Rearrangement
Status: done
Type: Frontend / HTML Structure
Area: Home Preview, UX
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Rearrange `newIndex2.html` into a stronger Living Index homepage using existing HTML pieces, existing classes, and existing JavaScript behavior.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0108-codex-vm075-newindex2-atmosphere-tuning-notes.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Problem

`newIndex2.html` had the right self-contained components and working interactions, but the page still read too much like a static poster and retained door/gateway framing in the primary homepage structure.

## Acceptance Criteria

- Runtime changes stay limited to HTML structure and minimal visible text updates in `newIndex2.html`.
- The page flow becomes Hero, Start Here, Main Areas, What is Vox Mana, Magic Basics / Color Matrix, How Vox Mana Connects, Library Preview.
- CSS and JavaScript logic remain untouched.
- `#paths` compatibility is preserved while adding a `#main-areas` anchor target.
- Top nav `What is this?` and `Magic Basics` jump to real page sections.
- Hero CTAs point to `/archscry/`, `/maze/`, and `/apocrypha/`.
- Main destination copy no longer frames the site as doors, gateways, vaults, or thresholds.
- Magic Basics, Color Matrix, radar, reveal, atmosphere, pointer glow, and back-to-top behavior remain functional.
- Link routes are checked against the local static server so visible navigation does not lead to dead pages or 404s.

## Dependencies / Related Work

- `VM-066 - newIndex2 Self-Contained Wiring`
- `VM-075 - newIndex2 Atmosphere Tuning Notes`
- `VM-076 - Cleanup And Push Preview / Archive Batch`

## Files Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1005-codex-vm077-newindex2-living-index-rearrangement.md`

## Testing Notes

- Static scan for no intentional `<style>` or inline `<script>` behavior changes.
- Static scan for preserved section IDs and interaction IDs.
- Static visible-copy scan for removed door/gateway/vault/threshold framing, ignoring asset filenames and JavaScript observer option names.
- Local HTTP status checks for `/newIndex2.html`, `/archscry/`, `/maze/`, `/apocrypha/`, `/privacy/`, and `/terms/`.
- Browser smoke check for anchor nav, Magic Basics, Color Matrix reveal, radar canvas readiness, and hero route clicks.
- `npm.cmd test`.

## Human Review

Yes - this is a homepage information architecture pass, and a final visual skim is still useful even though automated route and interaction checks passed.

## Notes

No CSS, JavaScript, shared assets, route internals, Color Matrix data, or Chart.js setup were changed.
