# VM-597 — Owner Review Revision

- Agent: Codex
- Task requested: Address the two Owner Review findings without reopening Temur research or semantic architecture.
- Related card: `docs/kanban/in-progress/VM-597-temur-semantic-repair.md`
- Status: Owner Review Ready; no commit or push.

## Finding and root cause

`Temur Roar` and `Eshki, Temur's Roar` were already in the canonical precon source/catalog, but the source record had `factionRefs: []`. The shared precon recommender correctly assigns Native Fit only to exact-color entries whose authored `factionRefs` includes the active identity. It therefore classified Temur Roar as `otherExact`, alongside same-color-only products.

## Exact fix

- Added `TEMUR` to the supported precon faction-reference contract in the source schema and existing precon builder.
- Changed Temur Roar's source page to the supplied official Wizards Tarkir: Dragonstorm Commander decklists page and set its authored relationship to `factionRefs: ["TEMUR"]`.
- Regenerated the precon catalog/schema through `scripts/build/build-precon-artifacts.mjs`.
- Added a regression invariant that Temur Roar/Eshki is Native Fit, leads the rendered preview, and cannot appear in Exact-color or Stretch groups.

## Player-facing copy revision

- Consolidated starter search tags to distinct Ramp, Spellslinger, and Dragons directions; the dossier maintains the more specific Large Creatures/Ferocious, Ramp/Big Mana, Spells/Copying, and Survival Through Attunement lanes.
- Reduced repeated audit phrasing in Test the Fit, How This Plays, the presentation layer, and the visible identity layer. Semantic metadata still records official design/lore, Commander-lane, optional-Vox-Mana, and Blue/whisperer boundaries.
- Preserved the generic-color-value boundary, lane-dependent table experience, Ferocious/Atarka distinction, and optional Survival Through Attunement lens.

## Native / Exact / Stretch behavior

- Native Fit: Temur Roar — Eshki, Temur's Roar, due to the explicit authored TEMUR relationship backed by the official Wizards product page.
- Exact-color: same-color precons without that relationship remain `otherExact`.
- Stretch: nearby four-color entries remain `stretch`; Temur Roar cannot enter this group.

## Files changed since the preceding Owner Review candidate

- `data/precons/vox-mana-precons.source.json`, its schema, the precon builder, and regenerated catalog/schema.
- Temur dossier source/catalog, identity layer, Commander foundation, and presentation copy.
- `tests/archscry/temur-semantic-repair-tests.js`, VM-597 card, handoff index, and this handoff.

## RobDev compact packet

- Authority/producer: authored precon source → precon builder → precon catalog → shared precon recommender → dossier renderer. The relationship defect was corrected at the source, never in the rendered list.
- Changed behavior: actual native Temur product ranks above shared-color-only products; player prose is concise.
- Protected behavior: exact/stretched classification, placement/scoring/routes, certified Temur semantics, and all provenance classifications.
- Non-goals: no new research, card hardcoding, placement work, or semantic architecture redesign.

## RobQA readiness

- QA tier: QA-2 shared recommender plus visible copy.
- Passed: `node tests/archscry/temur-semantic-repair-tests.js`; `npm run test:semantic-readiness`; `npm run build:precons -- --check`; `npm run build:identity-dossier-content -- --check`; syntax checks; `git diff --check`; desktop TEMUR/RG/UG/UR/SULTAI replays.
- Rendered evidence: local Archscry reloaded cleanly after regeneration; the deterministic TEMUR and four shared-neighbor rendering replays passed.
- Owner review: verify Temur Start Here and How This Plays read naturally, then confirm Precon Starting Points leads with Temur Roar / Eshki under Native Fit.

## Not touched

- Discovery-only Temur seed material, placement/scoring, aliases, routes, other identities' authored semantics, external publication, commits, and pushes.
