# VM-551 Gate B1 — Production-Fidelity Owner Review

## Decision boundary

Review whether the complete internal B1 experience feels polished, useful, Commander-native, and recognizably Archscry. The preview uses authored branching and authored results; it does not calculate placement or validate mappings.

Do not treat this review as authorization for scoring, production implementation, player validation, recruitment, shadow testing, migration, deployment, or certification.

## Launch

From the worktree root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/docs/prototypes/vm551-gate-b1-production-fidelity-preview/`.

## Review order

### A. First four questions

Start a free journey. Confirm the same four Gate situations appear every time, each feels useful, no option gives away an identity, and the set feels like a deliberate Commander baseline rather than filler.

### B. Adaptive Question 5

Run free mode twice. First choose a visible board, recovery, and steady progress. Then restart and choose active development, limited exposure, and a concentrated payoff. Confirm Question 5 changes from repeatability to pressure, the change follows unresolved behavior, and it does not feel like a hidden faction branch. Enable reviewer information to inspect the complete four-answer basis.

### C. Full normal route

Complete Simic/Quandrix. Judge question pacing, answer clarity, transition into **Building your reading**, Gate A state, hero, answer-derived observations, close alternative, limitation, dossier navigation, Matrix, Commander/card/precon starts, and Maze continuation.

### D. Esper

Open **Esper — C16**. Confirm information-to-plan is a natural adaptive Commander question and is interpreted only with separate structure and interaction observations. C16 alone must not appear to prove Esper.

### E. Colorless / WUBRG and mono / multicolor

Compare the two endpoint cases: imposed card-pool limitation versus a self-chosen boundary after broad access. Then inspect the White case and confirm C15 modifies color-count/deckbuilding constraint without choosing a mono color.

### F. Yore

Run Yore no-lens, lens skipped, lens answered, and contradiction. Confirm broad behavior does not trigger the lens; skip changes nothing; an answer appears separately under **What you said resonates**; and contradiction preserves both channels without a one-answer flip.

### G. Complete product

Ask:

- Would I be happy to send this Archscry experience to a Commander player once the real engine and mappings are separately ready?
- Does it feel immediately useful, low-friction, and satisfying while remaining more distinctly Vox Mana than EDHMatch through adaptive questioning, explicit uncertainty, richer identities, source-backed context, dossier depth, Matrix comparison, Maze discovery, and Commander directions?

## Fidelity audit

| Surface | Production source reused | Preview-only adaptation | Fidelity risk |
|---|---|---|---|
| Shell | `archscry/index.html` structure; shared topbar and atmosphere scripts | Internal badge and reviewer controls | Low; badge occupies hero-adjacent space only in the preview |
| Typography and atmosphere | Production tokens, fonts, background, components, and `archscry.css` | None beyond reviewer chrome | Low |
| Questionnaire | Production quick-shell, progress, question-card, answer-card, help, and buttons | Local state controller and selected/lens styling | Medium; live controller is intentionally excluded |
| Result summary | Production Gate A copy function, guild banner, snapshot and result-state classes, identity hero art/data | Authored result object and answer-observation summary | Medium; no placement engine produced the result |
| Identity hero | Production faction records, colors, mana symbols, art, philosophy, and banner grammar | Local hero-asset slug adapter | Low |
| Dossier | Production `buildCommanderDossier`, current faction/model data, dossier console/panel classes | Six-panel local controller instead of full live account/save controller | Medium |
| Matrix | Production renderer, initializer, radar scripts, data, and CSS | Inserted into the preview reading panel | Low |
| Maze | Production dossier Maze link records and production Maze route | Local relative-path translation; no persisted handoff context | Medium |
| Commander direction | Production dossier builder and faction Commander guidance | Compact panel rendering | Medium |
| Commander/card/precon | Production commander recommendations, starter-card records, precon builder/catalog/taxonomy | Compact cards; no Scryfall image fetch | Medium |
| Responsive rules | Production Archscry breakpoints and dossier behavior | Narrow rules for reviewer toolbar and compact adapter grids | Low–medium |

## Known preview-only truths

- The eight free-answer branches are composite authored demonstrations. Their candidate context is reviewer-only and has no scoring effect.
- The nine focused review cases reuse approved authored walkthroughs.
- Every result remains `CONTENT_READY`; observability and mapping status stay reviewer metadata. Player copy states only the limitation that matters.
- The live controller is not imported because it would cross into production placement, routing, stopping, persistence, and saved-result behavior.

## Owner disposition

Record one of: **approve production-fidelity direction**, **approve with named experience remediation**, or **return for architecture review**. This decision does not authorize the real placement engine or outside-player work.
