# VM-021C - Add In-Flight Request Dedupe for Scryfall Calls

ID: VM-021C
Title: Add In-Flight Request Dedupe for Scryfall Calls
Status: backlog
Type: UX / reliability
Area: Maze, Archscry
Priority: high
Created: 2026-05-16

## Summary

Add a small in-flight promise dedupe layer for Scryfall search, exact-card, and named-card art lookups so same-burst duplicate requests share one network call while preserving the VM-021B localStorage cache behavior.

## Source

- User request in the current thread
- `docs/handoffs/2026-05-16-1330-codex-vm021b-cache-scryfall-replies-and-parser-seed.md`

## Acceptance Criteria

- Same-burst Maze search requests share one fetch.
- Same-burst Scryfall exact-card requests share one fetch.
- Same-burst Archscry named-card art requests share one fetch.
- Successful responses still populate the existing localStorage caches.
- Failed requests clear their in-flight entries and can be retried.

## Notes

Keep this additive only. Do not alter Maze return flow, MTGDecks routing, parser seed path, or result layout.
