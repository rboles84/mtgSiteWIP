# VM-270 - Jeskai Archscry Hero Background Image Trial

- Agent: Codex
- Task requested: Apply a Jeskai-only dossier hero background image treatment using `assets/img/identity-hero/jeskai.webp`, keep the change scoped to the Archscry hero card, and close the work out as `VM-270`.
- Related Kanban card: `VM-270`

## Pre-Flight Review

Files reviewed:
- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-31-2203-codex-vm239-jeskai-dossier-deck-start-dedup-qa-closeout.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\backlog\VM-240-yore-source-packet-and-evidence-ledger.md`
- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\assets\css\archscry.css`
- `C:\dev\mtgSiteWIP\research\archscry-dossier-followup-tests.js`

Recent related work:
- `VM-239` cleaned up the shared Jeskai dossier Start Here and revalidated Jeskai Maze query preservation after `VM-238`.
- The four-color reservation pass reserved `VM-240` through `VM-269`, so the Jeskai hero trial had to move to `VM-270`.

Current known risks:
- The dossier hero renderer and route-local Archscry CSS are shared surfaces, so the change needed to stay tightly Jeskai-scoped.
- The reserved four-color lane IDs could not be reused.
- Automated full-page Jeskai dossier restore under headless QA was unreliable, so visual verification needed a narrower but honest hero-specific harness.

Relevant decisions already made:
- `JESKAI` remains the only live Jeskai key.
- `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase forms, and `jeskai` remain metadata/query-only.
- No raw docs/data, generated faction banner sources, builder outputs, Supabase context, Maze logic, or non-Jeskai hero behavior should change in this card.

Files recently changed before closeout:
- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\assets\css\archscry.css`
- `C:\dev\mtgSiteWIP\research\archscry-dossier-followup-tests.js`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`

What should not be touched:
- Jeskai raw/research/architecture docs
- Generated faction data and banner sources
- Builder outputs
- Supabase context
- Maze logic
- Non-Jeskai heroes

## Files Changed

- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\assets\css\archscry.css`
- `C:\dev\mtgSiteWIP\research\archscry-dossier-followup-tests.js`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-270-jeskai-archscry-hero-background-image-trial.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-06-01-0836-codex-vm270-jeskai-hero-background-image-trial.md`

## What Changed

- Added a dedicated `heroBannerBackgroundForFaction(faction)` helper in `assets/js/index.js`.
- Routed the dossier hero background through that helper and added `data-faction-key="${faction.key}"` directly to the `.guild-banner` element.
- Applied the exact Jeskai-only gradient / image / gradient background stack with `/assets/img/identity-hero/jeskai.webp` as the image layer.
- Added a Jeskai-only `::before` suppression rule in `assets/css/archscry.css` so the shared hero overlay does not double-darken the new background.
- Extended the dossier follow-up regression to cover the faction hook, background helper, Jeskai layer ordering, image path, CSS override, and non-Jeskai fallback behavior.
- Created and closed `VM-270`, updated the Kanban board, and recorded this handoff.

## Why It Changed

The user wanted the Jeskai hero card on the Archscry dossier page to use a real dossier image treatment, not just the shared banner gradient. The implementation keeps the change surgically scoped to the Jeskai hero so the rest of the dossier system stays stable.

## Decisions Made

- Used `VM-270` instead of `VM-240` because `VM-240` through `VM-269` are already reserved for four-color onboarding lanes.
- Kept the runtime change local to the dossier render path instead of changing generated faction data or banner sources.
- Used the smallest scoped CSS suppression for the shared overlay:
  - `.guild-banner[data-faction-key="JESKAI"]::before { content: none; }`
- Preserved current non-Jeskai background fallback behavior by returning the existing banner value unchanged for every other faction.

## Risks / Uncertainties

- Automated headless restore into the full live Jeskai dossier continued to land on the Archscry shell instead of the dossier view even with seeded session state, so visual QA used a temporary local harness that rendered the live `.guild-banner` markup with current Archscry CSS and the exact Jeskai background stack.
- Desktop hero QA looked good. On narrow mobile widths, the long supplied body copy sits tightly against the available width; the new background treatment itself remained readable and did not introduce a new overlay artifact, but a future copy/layout polish card may still want to revisit hero copy density separately.

## Tests Run

- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- Headless Edge desktop screenshot of a temporary Jeskai hero harness using live Archscry CSS and the exact dossier hero markup
- Headless Edge narrow mobile screenshot of the same temporary Jeskai hero harness

## Visual QA Result

- Only the Jeskai hero treatment used the new image stack in the harness.
- The shared overlay was no longer double-darkening the Jeskai art.
- Desktop readability stayed strong.
- Narrow mobile widths remained readable but visually tight because of long supplied body copy; no new Jeskai-only layout rule was introduced in this card.

## Not Touched

- `C:\dev\mtgSiteWIP\data\factions.json`
- `C:\dev\mtgSiteWIP\data\identity-layers.json`
- `C:\dev\mtgSiteWIP\docs\research\`
- `C:\dev\mtgSiteWIP\docs\architecture\`
- `C:\dev\mtgSiteWIP\assets\js\archscry-presentation.js`
- `C:\dev\mtgSiteWIP\assets\js\commander-dossier.js`
- Maze logic, route keys, Supabase context, and generated outputs

## Follow-Up Recommendations

- Manually spot-check the live Jeskai dossier in a normal browser session if someone wants an end-to-end confirmation beyond the hero-specific harness.
- If the long Jeskai hero body copy feels too dense on narrow mobile widths, open a separate polish card rather than broadening `VM-270`.

## Next Suggested Agent

- Documentation Steward or Runtime QA follow-up, only if a later manual browser pass finds a separate mobile-copy polish need.
