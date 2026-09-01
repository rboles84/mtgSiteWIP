# VM-615 — Turn an Archscry Result Into an Understandable Next Decision

ID: VM-615
Status: In Progress — Owner Review required
Type: Contextual onboarding / Guide route / dossier presentation
Area: Archscry result, dossier directory, `/guide/reading/`
Priority: High
Created: 2026-08-31

## Summary

Help a player understand the result they just received and make one useful decision from the dossier
without requiring them to study Vox Mana. VM-614 already teaches what Archscry is; VM-615 teaches how to
use the result and dossier through compact contextual guidance plus optional depth at `/guide/reading/`.

## Source

- Owner VM-615 implementation brief dated 2026-08-31.
- Accepted VM-613 Field Guide/onboarding contract and sequence.
- Owner-Accepted VM-614 Guide product result.
- Owner-Accepted VM-618 shared-topbar hierarchy integrated at merge
  `2585a2d1dc80a501fd614ca40cf450fd48540827`.

## Locked Decisions

- Product question: **I finished Archscry. What does this result mean and what should I do with the dossier?**
- Result remains outcome-first and receives only concise dossier expectation-setting where current runtime
  demonstrates a gap.
- Dossier directory is the canonical contextual location for **How to read your dossier →**.
- `/guide/reading/` is optional depth titled around reading an Archscry dossier, not another Archscry
  introduction or Placement-methodology article.
- Placement is explained as the direction supported by this reading, never a permanent identity label,
  personality diagnosis, color rule, score, confidence, ranking, or hidden-method claim.
- Dossier orientation maps ordinary player goals to truthful current section labels; it is not an equal-card
  feature inventory.
- At least one neutral HTML/CSS teaching specimen shows dossier anatomy without fabricated identity output.
- VM-618 primary-nav/Guide utility behavior remains unchanged, including nested Guide current state.
- The fresh-session Archscry evidence gap must be inspected and reported honestly; this card does not
  automatically own a harness repair.

## Acceptance Criteria

### AC1 — Result remains outcome-first

The Archscry result gives only concise dossier expectation-setting and does not force Guide content,
duplicate the canonical dossier help link, or expose protected Placement internals.

### AC2 — Dossier gives immediate orientation

The dossier directory helps a player answer **Where should I start?** by mapping common goals to the
relevant current dossier sections and provides one canonical **How to read your dossier** Guide link.

### AC3 — `/guide/reading/` adds genuinely new value

The new Guide page teaches how to interpret Placement and use dossier sections through concise copy and a
truthful visual anatomy, without re-explaining Archscry or duplicating identity-specific dossier content.

### AC4 — Useful next decisions remain optional and truthful

Normal, supported-alternative where available, Maze-handoff, and bounded/unusual states remain honest; no
path is presented as mandatory and no unsupported result state is fabricated.

### AC5 — Accessibility, validation, and protected behavior

Desktop/mobile/keyboard/200%-zoom/reduced-motion/deep-link behavior passes focused validation; protected
Archscry, Placement, dossier, Maze, persistence, account, telemetry, Strategium, and Apocrypha semantics
remain unchanged.

## RobDev Contract

- **Outcome:** after receiving a reading, a player understands what Placement represents, knows where to
  begin in the dossier, and can follow one useful current direction without opening Guide first.
- **Owning layers/producers:** current Archscry result presenter for expectation copy; current dossier
  directory presenter for contextual orientation; authored `/guide/reading/` HTML/CSS for optional depth.
- **Existing machinery:** accepted Guide shell/design, shared topbar/feedback/reduced-motion behavior,
  current dossier section IDs/navigation, current result/dossier transition, and existing test fixtures.
- **Changed behavior:** presentation copy, contextual routing, one nested Guide route, route metadata, and
  focused validation only.
- **Protected behavior:** questionnaire, Placement/scoring/evidence/ranking/qualification/stopping,
  alternatives, identity/dossier truth, recommendation logic, Maze/query/Reading Finds/persistence,
  accounts/saved readings, telemetry, Strategium, Apocrypha, `/library/`, and VM-616/617.
- **Smallest complete implementation:** one result expectation sentence if needed, one compact dossier
  orientation with one canonical help link, one concise reading Guide with one static teaching specimen,
  and focused deterministic/browser evidence.
- **Non-goals/stop:** no semantic/data/generator change, modal/tutorial/wizard, dossier rewrite, fake result,
  new recommendation, Guide landing expansion, `/guide/maze/`, `/guide/reference/`, commit, push, PR, merge,
  VM-616, VM-617, or self-acceptance.

## RobQA Classification

- **Expected tier:** QA-3 contextual/deep-link navigation with QA-1 presentation; escalate only if recon
  proves a changed protected interaction, otherwise stop on scope drift.
- **Changed risks:** result hierarchy, dossier directory density, exact section targeting, nested Guide
  current state, deep-link focus/scroll, responsive containment, and copy truth.
- **CPU-heavy validation:** NOT REQUIRED unless protected decision behavior unexpectedly changes.
- **Owner judgment:** Placement wording, dossier orientation usefulness, teaching value of the anatomy
  specimen, page restraint, and whether VM-615 adds post-reading value rather than repeating VM-614.

## Risks

- Current dossier labels and anchors are rendered/composed; guidance must be sourced from actual runtime,
  not the old contract outline.
- A directory treatment can crowd the dossier or become a second navigation system.
- Alternative and bounded outcomes can be misstated if visual completeness is prioritized over witnessed
  truth.
- The known fresh-session browser gap may limit full first-user journey claims without blocking safe
  contextual dossier work.
- Shared topbar or Guide styling changes could regress VM-618 if not kept route-local.

## Implementation Prompt

Execute the Owner-supplied VM-615 brief. Recon the real result and dossier surfaces first, record explicit
no-change decisions, implement only the minimum contextual result/directory guidance and optional
`/guide/reading/` depth, validate truthful normal/alternative/bounded evidence and accessibility, and stop
uncommitted at Owner Review.

## Notes

- VM-006, VM-007, VM-547, and VM-548 remain independent.
- VM-406 is governed only to the extent VM-615 clarifies onboarding placement; it is not silently closed.
- VM-616 and VM-617 remain unstarted.

## Owner Review Candidate — 2026-08-31

- Implemented one compact goal-to-section treatment at the live dossier directory and one canonical
  **How to read your dossier →** link to `/guide/reading/#dossier-map`.
- Preserved the existing outcome-first result copy; no Placement expectation copy was added because the
  current result banner already states the bounded result honestly.
- Added the optional `/guide/reading/` route with the four bounded teaching sections and a neutral
  HTML/CSS dossier anatomy specimen.
- Added one short Commander Browsing Starts clarification: these are browsing starts, not a definitive
  ranking. Start Here, Why This Fits, Card Signals, Mana Notes, and Maze Discovery content remain
  unchanged.
- Focused static and rendered VM-615 checks pass at desktop/mobile, keyboard, reduced motion, deep link,
  Back/Forward/refresh, and 200%-zoom-equivalent layout.
- Actual state witnesses cover the current primary Gruul result, certified Jund close result with Gruul
  supported alternative, and direct bounded Yore dossier shape.
- The known fresh-session `test:browser-smoke` gap reproduces: after storage reset the desktop Archscry
  journey times out during the first-answer/progress transition. No harness/runtime repair was attempted,
  so complete fresh-user onboarding validation is not claimed.
- RobQA evidence: `docs/qa/2026-08-31-vm615-reading-dossier-owner-review.md`.
- Status remains **In Progress — Owner Review required**. No commit, push, PR, merge, VM-616, or VM-617.

## Owner Review correction — 2026-09-01

- Applied the two bounded semantic corrections requested by the Owner: hero `Your result…` and specimen
  `The direction those answers support`.
- Verified the skip link is normally hidden, visible on keyboard focus, functional, and not obscured by the
  sticky topbar at its destination. The product CSS required no change.
- Focused HTML/copy/static/browser checks and desktop/mobile render sanity pass; no protected runtime
  behavior changed.
- Status remains **In Progress — Owner Review required**. No commit, push, PR, merge, VM-616, or VM-617.
