# VM-126 - Strategium Archetype Signal Intent-Friendly Copy Pass

Status: done
Type: Frontend / UX Copy
Area: Strategium Route
Priority: medium

## Summary

Refresh the `Archetype Signal` library framing so it reads like a helpful Commander coach instead of a taxonomy panel.

The change stays scoped to user-facing copy and visible labels in `strategium/index.html`. It does not change search behavior, filter wiring, route-local data shape, or any shared runtime.

## Implementation Notes

- Rename the library heading and intro to focus on helping users name what their deck is doing.
- Add one concrete example line that teaches the intended starting move without turning the section into a tutorial block.
- Rename the search label, placeholder, filter group labels, and visible scope chip text to friendlier language.
- Keep internal scope/filter values unchanged while updating summaries, empty-state hints, and family badges to `Common` / `Specialist`.

## Tests

- `npm.cmd run lint:html`
- Browser smoke for `/strategium/` archetype search/filter behavior after the copy pass

