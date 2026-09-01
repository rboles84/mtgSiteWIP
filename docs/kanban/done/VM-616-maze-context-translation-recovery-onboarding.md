# VM-616 — Maze Context, Translation, and Recovery Onboarding

ID: VM-616
Status: Done — Owner Accepted
Type: Contextual onboarding / recovery presentation / Guide route
Area: The Implicit Maze, `/guide/maze/`
Priority: High
Created: 2026-09-01

## Summary

Help a player understand what the Maze did, know what is affecting the current search, and recover from
weak translation or a valid zero-result search without the product changing the query for them. VM-614
already introduces the three Maze modes; VM-616 adds small help at the point of friction and optional
multi-state depth at `/guide/maze/`.

## Source

- Owner VM-616 implementation brief dated 2026-09-01.
- Accepted VM-613 Field Guide/onboarding contract and implementation sequence.
- Owner-Accepted VM-614 Guide foundation, VM-615 reading/dossier onboarding, and VM-618 Guide utility
  navigation, integrated through current `main` at `196a196f67e760ee72cba4e25def02ed7d87342f`.
- Owner-Accepted VM-592 Commander-first Loom baseline.
- Current Maze source, runtime, deterministic tests, and rendered witnesses established during this card.

## Locked Decisions

- The working Maze answers the immediate question; `/guide/maze/` is optional depth and must not become
  another Plain Reading / Operator's Hand / Loom introduction.
- Reuse current Query Inspector diagnostics. Do not calculate confidence, reinterpret diagnostics, create
  a second interpretation layer, or change parser/query semantics.
- Weak translation and a valid executable query with zero results are distinct player-facing recovery
  states. Guidance may suggest one manual next action but must never alter a query silently.
- Retained reading/dossier context must state truthfully whether it changes the active query and be
  reversible only through a verified safe existing state seam.
- Owner clarification dated 2026-09-01 locks `independent=1` as temporary URL/history context only. It
  must not mutate the stored handoff, saved reading, existing Reading Finds or `readingId` metadata,
  active query, or persistence schema. Existing associated Finds remain unchanged; new independent Finds
  use the existing standalone-Maze association behavior and must be described before capture. A visible
  action must restore the retained reading context, and Back/Forward/refresh plus the exact existing/new
  Find association sequence require deterministic coverage. Stop if this needs a storage/schema redesign.
- **Fits Commander colors** remains inclusive Commander color identity (`id<=COLORS`); printed-color
  alternatives remain distinct and available.
- Add at most one canonical working-Maze invitation to `/guide/maze/` near translation/recovery.
- Current Weave, Operator's Hand, Reading Finds, result actions, and VM-615 dossier onboarding default to
  **NO CHANGE** unless runtime recon proves a specific first-value gap.
- VM-006 retains broader Archscry/Maze continuity and browser-verification ownership.

## Acceptance Criteria

### AC1 — Weak translation has one truthful next action

Plain Reading preserves current Query Inspector truth while weak/unresolved states provide one clear
recovery direction derived solely from existing diagnostics.

### AC2 — Parser misunderstanding and zero matches are visibly distinct

The UI distinguishes an incompletely understood request from a valid query that ran and matched no cards,
with player-controlled recovery guidance and no silent query alteration.

### AC3 — Context and Commander-color meaning are explicit

Retained dossier context is understandable and safely reversible where current state ownership permits,
and Loom visibly explains **Fits Commander colors** without changing color or query semantics.

### AC4 — `/guide/maze/` adds optional multi-state depth

The Guide page teaches how to read translation, context, recovery, and result states using truthful current
specimens while mode introductions, Current Weave, Reading Finds, and result behavior remain concise or
intentionally unchanged.

### AC5 — Focused rendered validation protects Maze truth

Desktop/mobile/keyboard/touch/200%-zoom/reduced-motion/deep-link behavior passes focused validation, and
parser/query/result/persistence/Placement/Guide/topbar semantics remain protected.

## RobDev Contract

- **Outcome:** after a search, a player can see what Maze understood, receive useful cards or understand
  why the attempt missed, and identify one sensible next action without surrendering query control.
- **Owning layers/producers:** current Maze presenters consume existing compiler diagnostics and result
  state; existing Maze handoff/context state owns retained association; current Loom presentation owns
  color-relation explanation; authored `/guide/maze/` HTML/CSS owns optional depth.
- **Existing machinery:** Query Inspector, current recovery/empty result presenters, existing alternatives,
  current dossier handoff and dismissal seams, VM-592 Loom controls, accepted Guide shell/topbar, focused
  Maze tests, and browser review tooling.
- **Changed behavior:** bounded presentation copy/state, a verified reversible context action only if the
  existing owner safely supports it, one nested Guide route, route metadata, and focused validation.
- **Protected behavior:** parser/compiler/calibration/registry/normalization, Operator and Loom generation,
  Commander color semantics, result fetch/dedupe, Reading Finds and saved-reading storage, Placement,
  dossier semantics, accounts, telemetry, Strategium, Apocrypha, `/guide/reading/`, and VM-006 ownership.
- **Smallest complete implementation:** one diagnostic-led weak recovery, one truthful valid-zero-result
  recovery distinction, one shared context disclosure with temporary independent/restore actions, one
  adjacent Commander-color explanation, one restrained Guide page, and focused evidence.
- **Non-goals/stop:** no query optimizer, synonym substitution, automatic broadening, parser or persistence
  redesign, three-mode tutorial, Guide landing rewrite, result/Finds redesign, `/guide/reference/`, VM-617,
  commit, push, merge, or self-acceptance. Stop if query outputs or protected persistence semantics change.

## RobQA Classification

- **Expected tier:** QA-3 for contextual state/deep-link behavior with QA-1 presentation and bounded QA-2
  interaction if a safe context-dismiss action is implemented.
- **Changed risks:** recovery-state truth, context disclosure/reversal, nested Guide navigation, color-help
  clarity, focus/live-region behavior, and responsive density.
- **CPU-heavy validation:** NOT REQUIRED unless recon reveals a protected behavior change; such a change is
  scope drift and stops implementation rather than authorizing broad suites.
- **Owner judgment:** weak recovery usefulness, zero-result distinction, context clarity/reversal,
  Commander-color wording, and whether `/guide/maze/` adds depth without repeating VM-614.

## Risks

- Existing diagnostics may not support causal claims beyond unresolved/warning state.
- A context dismiss action could accidentally clear query, reading, return, or Reading Finds state.
- Shared Maze presentation changes can crowd the mobile search path or duplicate existing inspector copy.
- A static Guide specimen can drift from runtime if exact current outputs are not pinned by focused tests.
- Route or shared Guide edits can regress VM-614/615/618 navigation and active-state behavior.

## Implementation Prompt

Execute the Owner-supplied VM-616 brief. Recon the real Maze and deterministic runtime first, classify each
significant surface as NO CHANGE, VISIBLE CONTEXT, RECOVERY STATE, GUIDE DEPTH, or SCOPE DRIFT, then build
only the smallest truthful presentation slice and stop uncommitted at rendered Owner Review readiness.

## Notes

- Preserve the existing untracked `outputs/owner-review/` artifacts without adding, deleting, or modifying
  them. New VM-616 rendered witnesses must use a separate repository-policy-compliant location only when
  focused QA begins.
- VM-006 remains backlog and independently owns broader continuity/runtime verification.
- VM-617 remains unstarted.

## Implementation Result — 2026-09-01

- Added one shared Maze context strip for standalone, reading-available, dossier-thread, and temporary
  independent states; the retained reading is never described as an active query filter.
- Added URL/history-only `independent=1` plus an explicit **Restore reading context** action. The active
  query is retained, the stored handoff and Reading Finds remain unchanged, and new independent Finds use
  the existing standalone row shape with no `readingId` association.
- Added diagnostic-led weak-translation recovery and a separate valid-zero result state without changing
  compiler, query, result-fetch, or automatic-broadening behavior.
- Added visible **Fits Commander colors** explanation while retaining `id<=COLORS` and every printed-color
  alternative unchanged.
- Added the restrained `/guide/maze/` route, route ownership/metadata wiring, and focused static/rendered
  regression coverage.
- VM-592 mode cards, Operator behavior, Current Weave, result actions, Reading Finds drawer/schema,
  Placement, dossier semantics, VM-006, VM-617, accounts, and telemetry remain unchanged.

## Validation Result — 2026-09-01

- RobQA disposition: **PASS — Owner Review Ready**, not Owner Accepted.
- Focused HTML/JS/copy/route/Guide/Maze/static/browser checks pass, including desktop/mobile,
  deep-link, reduced-motion, 200%-zoom-equivalent, Back/Forward/refresh, and the exact contextual Find →
  independent Find → restore → dossier reflection sequence.
- Strong output remains `type:vampire type:creature c:r o:sacrifice`; weak output remains
  `c:b legal:commander` with confidence `0.63` and unresolved `lotus`, `mana`, `value`; Commander WU
  remains `id<=wu f:commander` and printed exact remains `c=wu f:commander`.
- The broad `node tests/maze/maze-search-tests.js` retains the documented inherited stale Operator
  assertion (`c:r` actual versus `c:r f:commander` expected). VM-616 does not change or weaken that
  protected runtime/test mismatch; the updated focused VM-592 path passes.
- Evidence: `docs/qa/2026-09-01-vm616-maze-context-recovery-owner-review.md` and the separate
  `outputs/vm616-owner-review/` witness directory. Existing untracked `outputs/owner-review/` files remain
  untouched and unstaged.

## Owner Review Copy Correction — 2026-09-01

- Replaced only the Section IV Reading Finds sentence in `/guide/maze/` with the Owner-approved wording:
  `Reading Finds keeps useful cards together locally. Finds saved with reading context can stay attached to
  that reading; independent Finds remain standalone. It is not a deckbuilder.`
- Added focused static and rendered-copy guards, reran only the warranted HTML/copy/onboarding/browser
  checks, inspected the regenerated desktop/mobile Guide witnesses, and confirmed no protected runtime file
  changed during this correction.
- Status remains **Owner Review Ready**, not Owner Accepted. No commit, push, merge, or VM-617 work began.

## Owner Review Guide Entry UX Correction — 2026-09-01

- Keep the existing single Query Inspector invitation, but route it to `/guide/maze/` at the normal page
  entry rather than `#recovery`; retain all internal Guide anchors for direct/reference use.
- Present that invitation as a compact, truthful **Field Guide** beacon with a finite one-time arrival
  treatment, strong hover/focus hierarchy, and a static reduced-motion treatment.
- Do not add or duplicate Guide links, promise an automated walkthrough, install Driver.js, or alter any
  accepted query, recovery, context, Find, result, Loom, color, Guide-content, or adjacent-route behavior.
- Documented the reusable opt-in guided-reading concept separately as backlog-only VM-619. VM-619 is not
  implemented or authorized by this card; VM-617 remains unstarted.

### Implementation and validation result

- The one canonical action now targets `/guide/maze/` and renders as a compact **Field Guide** beacon with
  truthful `Read how to understand this search →` wording.
- The initial finite arrival halo was later superseded by the Owner Review Beacon Signal Correction below;
  hierarchy, hover/focus, desktop/mobile layout, top entry, Back, and overflow remain accepted.
- All focused VM-616 static/browser checks remain green, including the accepted query, diagnostic, context,
  Reading Finds association, dossier reflection, and history invariants.
- Status returns to **Owner Review Ready**, not Owner Accepted. No commit, push, merge, Driver.js, tour
  implementation, or VM-617 work occurred.

## Owner Review Beacon Signal Correction — 2026-09-01

- Preserve the accepted Maze-only beacon, wording, size, and `/guide/maze/` top-entry behavior.
- Replace the too-subtle 900 ms arrival with approximately three restrained halo/ring beats across 4–5
  seconds, then settle permanently for the current Maze page visit.
- The signal may occur only on the first meaningful beacon presentation per page visit. Searches,
  refinements, diagnostic rerenders, and weak/zero transitions must not replay it.
- Pointer hover and keyboard focus must stop the automatic sequence and show a steady illuminated state;
  leaving interaction must not restart the sequence.
- Use only a module/DOM page-session seam. No localStorage, sessionStorage, account state, analytics,
  persistent onboarding state, tour, Driver.js, Home/Archscry propagation, VM-619, or VM-617 work.
- Registered the broader visual-language concept separately as backlog-only VM-620. VM-619 remains the
  distinct future opt-in guided-reading concept; neither card is implemented by VM-616.

### Implementation and validation result

- The accepted beacon now emits three perimeter/ring beats at `6%`, `37%`, and `68%` across one finite
  4.8-second sequence. Its text and primary background do not blink, flash, or animate.
- A module variable consumes the signal on the first meaningful beacon presentation for the Maze page visit.
  Presenter/search rerenders cannot replay it; a reload/new visit may signal again.
- Pointer entry, keyboard focus, and natural animation completion remove `is-signaling`. Hover/focus holds a
  steady illuminated ring and rune; leaving interaction does not restart the sequence.
- OS and Vox Mana reduced-motion states render the stronger static beacon without the signal.
- Focused static/browser checks, desktop/mobile witness inspection, canonical Guide navigation/Back, and all
  accepted VM-616 query/context/Find/history invariants pass.
- Status returns to **Owner Review Ready**, not Owner Accepted. Home, Archscry, VM-619, VM-620, VM-617,
  persistence, dependencies, commit, push, and merge remain untouched.

## Owner Acceptance and Candidate Binding — 2026-09-01

- Owner Accepted the reviewed VM-616 result exactly as presented at immutable candidate
  `73118b65f13157366b631afd70ac2d68e6d2b68d`.
- Acceptance includes weak-translation and valid-zero recovery; all four context states; temporary
  URL/history-only `independent=1`; unchanged reading-associated Finds and standalone independent Finds;
  Commander-color explanation; `/guide/maze/`; corrected Reading Finds copy; and the sole canonical Guide
  Beacon with its finite 4.8-second, three-beat, same-visit non-replaying signal, interaction suppression,
  and reduced-motion behavior.
- The inherited broad Maze assertion remains explicitly unchanged: runtime correctly produces `c:r` while
  the stale broad expectation remains `c:r f:commander`. The focused VM-592 path passes.
- VM-619 and VM-620 remain backlog-only, with VM-619 intended before VM-620. VM-617 was not started.
- The accepted product and validation candidate is frozen at the exact SHA above. Lifecycle closeout makes
  no product, copy, interaction, animation, query, context, persistence, Guide, layout, or test change.
- PR and merge remain pending separate Owner authorization.
