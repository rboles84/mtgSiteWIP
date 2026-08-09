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
| Dossier | Production `assets/js/index.js` result/dossier functions, panel definitions, current faction/model/discovery data, and dossier controls | Boot-stripped in-memory adapter; save/account actions disabled | Low; production questionnaire and persistence boot are not initialized |
| Matrix | Production renderer, initializer, radar scripts, data, and CSS | Inserted into the preview reading panel | Low |
| Maze | Production dossier Maze link records and production Maze route | Local relative-path translation; no persisted handoff context | Medium |
| Commander direction | Production dossier renderer and faction Commander guidance | None | Low |
| Commander/card/precon | Production Commander recommendations, starter-card records, precon builder/catalog/taxonomy, and section contracts | Account persistence and Scryfall card-art fetch/cache decoration disabled | Low; avoids preview storage writes while preserving section reachability |
| Responsive rules | Production Archscry breakpoints and dossier behavior | Narrow rules for reviewer toolbar and compact adapter grids | Low–medium |

## Known preview-only truths

- The eight free-answer branches are composite authored demonstrations. Their candidate context is reviewer-only and has no scoring effect.
- The nine focused review cases reuse approved authored walkthroughs.
- Every result remains `CONTENT_READY`; observability and mapping status stay reviewer metadata. Player copy states only the limitation that matters.
- Production dossier functions are loaded through a preview-only source adapter that cuts the boot/session-controller boundary before module evaluation. The live questionnaire, routing, stopping, session restore, persistence, and saved-result behavior are not initialized.

## Authored route truth procedure

The nine review cases exposed by this preview are the regression scope. For every case, `docs/prototypes/vm551-gate-b1-owner-experience/prototype-data.json` `walkthrough.steps` and stable answer IDs are the sole authority for expected question order and authored selections. `branching-map.json` may expose a case but may not define or override its route semantics.

Enable Reviewer Information and choose a review case. Every question marks the expected option as **Authored review selection** and shows its stable answer ID. Select that option to execute the exact authored path. The final reviewer panel must either state that every expected question/answer pair matched or list the exact question, expected answer, and actual answer that differed.

Changing one marked answer is the negative control: the route must report false, show the exact mismatch, suppress route-supported prose, and retain the case's existing Gate A/result state.

## Owner disposition

**APPROVE WITH NAMED EXPERIENCE REMEDIATION.** The questionnaire and branching architecture remain approved; the preview must complete the named result/dossier experience repair before another owner visual review. This decision does not authorize the real placement engine or outside-player work.

## Named experience remediation

- Use the full question-panel width: three balanced desktop columns for three answers, a full-width third card at intermediate widths, 2×2 for four answers, and a normal mobile collapse.
- Make **Continue into the Hall** and **Open my reading** explicit, user-paced actions.
- Show stage-local progress while keeping the overall expectation at 6–8 moments.
- Present the board-wipe explanation once.
- Derive the B1 summary from the answers actually selected; authored route prose may appear only when every expected selection matches.
- Render the current production Dossier Directory and all identity-available production sections below the B1 summary. Do not copy or independently redefine dossier sections, and do not boot the live questionnaire/session/persistence controller.
- Preserve the production bounded shell for mixed, contradictory, and insufficient states.
- Use the production endcap without adding a second oversized result restart block.
- Resolve reviewer branch metadata from all four Gate answers on authored and free journeys.

## Exact adaptive acceptance paths

- Run A: **Set the pace → A board people can see → A way to rebuild → A little every turn**. Q5 must be C09 Repeatability and reviewer branch `visible-recovery-growth`.
- Run B: **Set the pace → A board people can see → Less exposed in the first place → One turn that changes the game**. Q5 must be C07 Pressure and reviewer branch `visible-burst-pressure`.

## Storage and dossier parity acceptance

Before every automated preview case, seed sentinel values into `vm_last_result` and `vm_profile`, record every existing `localStorage` key/value, exercise the requested surface, and prove every pre-existing value is byte-identical afterward. Any future preview payload must use a preview-only namespace and be consumed and deleted; the current bridge uses no storage payload.

Compare one named preview dossier against production at the tab, panel, ARIA, and section reachability contract. Every production section available for that identity must remain reachable. Intentional section omissions: none. Account-saving actions and Scryfall card-art fetch/cache decoration are disabled in the internal preview to prevent persistence; their parent production sections remain present.

## Final owner disposition — authored review-route truthfulness

**OWNER PASS.** The authored review-route truthfulness remediation at `5336a5f3573331cef2904f58691a39539340b390` is accepted. No additional manual retest is required for this remediation.

### Owner acceptance evidence

- **Yore authored route: PASS.** The exact authored selections matched; `Selections match authored route: true`; all 7/7 expected question/answer pairs matched; no divergence warning appeared; and the intentional **Not enough evidence to distinguish** result remained unchanged.
- **WUBRG authored route: PASS.** The exact authored selections matched; `Selections match authored route: true`; all 8/8 expected question/answer pairs matched; no divergence warning appeared; and the intentional **Mixed reading** result remained unchanged.
- **One-answer divergence behavior: PASS.** A deliberate valid deviation produced a route mismatch and divergence warning, suppressed route-supported claims, and left the underlying authored Gate A/result state unchanged. Automated regression coverage confirms exact question, expected-answer, and actual-answer mismatch diagnostics. No conflicting owner evidence exists against that validation.
- **Player/free-mode reviewer-data isolation: PASS.** With Reviewer Information disabled, authored-selection cues, stable answer IDs, route-match metadata, and mismatch diagnostics are absent. Reviewer-only evidence remains isolated.
- **Internal preview toolbar visibility: expected.** The toolbar is internal preview chrome, not a defect, and no UI change is requested.

### Authority and scope preserved

- `docs/prototypes/vm551-gate-b1-owner-experience/prototype-data.json` `walkthrough.steps` and stable answer IDs remain the sole authored-route authority.
- Prior manual Yore and WUBRG recipes were not authoritative and are not alternate route definitions.
- The matcher was not the original semantic defect. The corrected defect was reviewer-guidance and authority drift combined with incomplete regression coverage.
- Runtime reviewer cues derive from committed route authority. All nine exposed review cases have positive exact-route and one-answer-negative regression coverage.
- The accepted preview lineage is `21ef260b400aca581d1a8f8535baa6d83e0719ff` (initial production-fidelity preview), `bd5cc61a415703e690ce58577e6760972fabb048` (production-fidelity experience remediation), and `5336a5f3573331cef2904f58691a39539340b390` (authored route truthfulness remediation).
- This acceptance does not validate identity mappings, scoring, routing, stopping, or the real placement engine. `MAPPING_HYPOTHESIS` remains appropriate.
- No player-validation work is authorized or implied.

The separately recorded preview follow-ups remain outside this acceptance: blank or placeholder card-signal and Mana Notes presentation, inert preview Maze links, a clipped Commander-lane tooltip, and the insufficient-result continue/revise product question. They are not truthfulness-closeout blockers and are not authorized for repair here.
