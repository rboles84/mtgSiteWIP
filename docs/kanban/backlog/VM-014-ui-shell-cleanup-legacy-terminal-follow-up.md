# VM-014 - UI Shell Cleanup and Legacy Terminal Follow-Up

ID: VM-014
Title: UI Shell Cleanup and Legacy Terminal Follow-Up
Status: backlog
Type: UX / Tech Debt
Area: UI, Workflow
Priority: low
Created: 2026-05-15

## Summary

Group the remaining presentation-shell follow-up in one place: page background and icon-pack cleanup, plus the archived terminal replacement trail that should stay visible without changing runtime behavior yet.

## Source

- `docs/design/implementation-notes.md` - says the seeded backgrounds are placeholders, the page-specific backgrounds should be regenerated, and icons are still a future committed icon pack.
- `docs/architecture/project-atlas.md` - says `supabase/functions/guild-recruiter/index.ts` is retained for the archived terminal path and future deterministic replacement work.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\08-technical-atlas\\visual-style-guide.md` - reinforces the current UI system for buttons, cards, and icon treatment.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - frames the product as a layered experience with future-facing surfaces that should stay honest about what is shipped today.

## Acceptance Criteria

- Background, icon, and shell cleanup items are tracked as a coherent follow-up rather than scattered reminders.
- The archived terminal replacement path remains intentionally archived until a deterministic replacement story is ready.
- Any shell-level cleanup is separated from runtime behavior changes.
- The card makes clear which pieces are presentation polish and which pieces are future workflow follow-up.

## Dependencies / Related Work

- Asset regeneration workflow and visual direction decisions
- Archived terminal strategy
- VM-005 and current UI shell behavior

## Files Likely Impacted

- `index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `assets/img/backgrounds/*.webp`
- `assets/img/overlays/*.svg`
- `docs/design/implementation-notes.md`
- `docs/architecture/project-atlas.md`
- `supabase/functions/guild-recruiter/index.ts`

## Risks / Uncertainties

- Visual cleanup can accidentally become a redesign if it is not kept bounded.
- The legacy terminal follow-up should not drift into an implementation change without explicit approval.
- Asset replacement work may need a separate art-review pass.

## Implementation Prompt

Keep the remaining shell cleanup and archived-terminal follow-up visible as one deliberate backlog story so presentation work stays honest and the terminal path stays intentionally archived.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The page shell cleanup items have a concrete visual decision and a verified asset path.
- The archived terminal strategy is either documented as complete or split into its own approved follow-up.

## Human Review

Yes - the card mixes visual cleanup with a future architecture path, so it needs review.

## Notes

This is the right place for the lingering presentation polish that should not be mistaken for shipped product behavior.

