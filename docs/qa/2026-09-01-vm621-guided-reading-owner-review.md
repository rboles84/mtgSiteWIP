# VM-621 Guided-Reading Expansion — Owner Review

Status: Owner Review Ready — combined final judgment pending; not Owner Accepted.
Branch: `codex/vm-620-shared-guide-beacon` (combined uncommitted VM-620/621 work).
Base / unchanged main: `9c572edb0232161c860ea199a508a73f99a5d6fd`.
Gates: repo-local `robdev` / `robqa`, frozen `docs/dev/RobDevPass.md` / `docs/qa/RobQAPass.md`.

## Current disposition — 2026-09-02

Owner manually verified the final Home Beacon → Step 1 → Step 4 → Done → static Guide correction: PASS.
Automated accessibility contracts and Owner keyboard/visual interaction testing passed.
Real screen-reader validation: NOT PERFORMED. Per explicit Owner policy, it is optional future accessibility
audit coverage, NOT a VM-620/621 review blocker. No NVDA/browser version, VoiceOver coverage or screen-reader
PASS is claimed. The prior required/pending NVDA disposition is superseded.
The final combined regression, including the strengthened VM-621 and accepted VM-619 browser suites, now
passes. See [combined packet](2026-09-02-vm620-vm621-combined-owner-review.md) for current evidence and the
five remaining Owner judgments. Neither card is self-accepted, committed or merged.

## Owner copy correction — 2026-09-02

Owner approved Home/dossier mechanics and visuals and requested only two Home description replacements.
Applied the exact Step 1 "Archscry uses your answers..." and Step 4 "See how readings, dossiers, and card
discovery connect..." sentences. This follow-up is QA-1; the original lifecycle evidence remains below.

- PASS: static contract RED on old Step 1, then GREEN with both exact strings, no "guesses", preserved
  headings and four steps. Pre/post Home config comparison equals only the two approved replacements.
- PASS: `test:vm621-guided-reading`, `lint:html`, `test:copy-boundaries`, and `git diff --check`.
- PASS: Home Steps 1/4 rendered at `http://127.0.0.1:8765/guide/?guided=vox-mana-intro`, desktop 1440×1000
  and mobile 390×844. Exact text wraps legibly; titles, descriptions and controls fit within popovers and
  viewport. Mobile popovers are 370px wide with 10px side margins. Temporary viewport override was reset.
- PASS: pre/post SHA-256 equality for dossier/Maze configs, shared helper, both Guide HTML pages, Home HTML,
  dossier view, walkthrough/Beacon CSS, Beacon JS and both Driver.js 1.8.0 assets. Steps 2/3, interaction
  code, relationship-map content, URLs and VM-620 treatment are unchanged by this follow-up.
- Browser suite: NOT REQUIRED for this patch; it does not pin these descriptions. Historical launch
  limitations and unexecuted strengthened assertions below are not relabeled as passes.
- Real screen-reader validation: NOT PERFORMED; optional future audit, not a review blocker under the
  Owner's current policy. Browser AX is not spoken-output testing. No Owner Acceptance claimed.
- No commit, push, merge, VM-617 work, or change to protected Owner Review output directories.
- Owner follow-up: "ill test dont worry about nvda on this". Remaining testing is Owner-handled; stop agent
  validation here. This records the handoff, not an NVDA PASS or final acceptance.

## Classification and boundaries (original implementation)

- QA-3 navigation/state transition plus QA-2 focus/accessibility lifecycle.
- Changed: Home and dossier contextual Beacons launch four short route-specific guided steps, then return to
  their ordinary static Guides. Both reuse the accepted VM-619 helper and locally pinned Driver 1.8.0.
- Protected: VM-620 signaling, Guide semantic content, Placement/dossier meaning, Maze config/semantics,
  direct static routes, vendor bytes/license/hashes, navigation, storage, telemetry, account state, and VM-617.
- No automatic tour, progress, completion state, persistence, second engine, or dependency was added.

## Deterministic evidence

| Check | Result | Reason / scope |
| --- | --- | --- |
| `test:vm621-guided-reading` | PASS | Exact destinations, four targets, focus landmarks, local assets, static-route boundary |
| Initial `test:vm621-guided-reading-browser` | PASS on current runtime | Both routes independently; real Home/certified Jund dossier Beacon clicks; named dialog and Next focus; Space/Enter, Previous/Next/Done, Tab, Close/Escape; inert links; URL/DOM cleanup; heading restoration; Done-to-top; refresh; invalid ID; missing target; blocked Driver; 390px containment; 720×500 200%-equivalent reflow; OS motion and live Vox motion cleanup; Back and Done/Back |
| `lint:html`, `lint:js` | PASS, final source | HTML semantics and 36 runtime JS files |
| `test:copy-boundaries`, `test:route-metadata`, `test:frontend-smoke` | PASS | Protected copy, public heads, Guide/navigation contracts |
| `test:reading-guide` | PASS | Existing dossier/Reading Guide content and decisions |
| `test:vm619-guided-reading` | PASS | Accepted lifecycle and exact vendor hashes |
| `test:vm620-guide-beacon` | PASS | Three owners, finite signal, no navigation propagation |
| `git diff --check` | PASS | Patch whitespace |

After the initial browser PASS, **test-only** assertions were added for Shift+Tab, exact tabindex restoration,
Home's interactive Maze specimen, and Vox motion at startup. At that stage runtime code was unchanged. The
strengthened rerun and a VM-619 browser rerun exited during Chromium launch, before test pages opened; an
approved outside-sandbox retry had the same result. Those historical attempts did not run the assertions.
The 2026-09-02 combined pass now successfully executes the strengthened suite; the launch limitation no longer
blocks review. The old failed `--review` run produced no VM-621 PNG witnesses. Prior VM-620 screenshots do
not prove the new interactions.

## Rendered self-QA and Owner takeover

- In-app desktop at approximately 1265×712: read/clicked both four-step flows, inspected popover copy/layout,
  confirmed Next/Done rather than X focus, and quiet Done-to-H1/static-URL cleanup.
- Automated responsive checks passed at 390×844 and 720×500. Owner mechanical/visual testing now passed.
- Real screen-reader validation was not performed; it is optional future audit coverage, not required for
  this Owner Review. RobQA READY is supported by the final combined evidence; final acceptance remains open.

## Owner finding converted to an invariant

Shared visual recognition promised orientation, but Home only opened documentation and dossier dropped at
Section III. Each eligible contextual Beacon must now reach its exact short guided configuration, or fail
safely to its matching static Guide. The static test was RED against the old Home destination, then GREEN;
the browser test asserts actual source links and active first steps.

## Short Owner review

Use a refreshed local build of this branch, not deployed main.

1. Home: click **New to Vox Mana? Start with the Guide**. Expect Archscry → Maze → Strategium → relationships;
   Done returns to static `/guide/`.
2. Existing dossier: click **How to read your dossier**. Expect result meaning → where to start → anatomy →
   next step. It must start at result meaning, not Section III. Done returns to static `/guide/reading/`.
3. Judge usefulness, brevity and consistency with Maze at desktop/mobile, 200% reflow and reduced motion.
   Next/Done should have clear focus; completion should not draw a large gold frame.
4. Optional future audit only: test spoken dialog/step context and restored static content with a real screen
   reader. Not performed and not a blocker; do not substitute automation or invent version/coverage metadata.

Replay URLs: `/guide/?guided=vox-mana-intro` and `/guide/reading/?guided=dossier-reading`.

## Skips and sequencing

- CPU-heavy validation: NOT REQUIRED. Placement/SIRF/parser calibration and exhaustive semantic/journey/
  synthetic/mutation suites were skipped because their producers did not change.
- Legacy browser reruns now pass in the combined 2026-09-02 regression; prior failed attempts remain history.
- Keep the one existing branch with separate VM-620 visual and VM-621 interaction ownership. Do not ship an
  inconsistent intermediate state. Integrate only after both cards are accepted and publication is authorized.
- No commit, push, PR, merge, VM-617 work, or writes to the three protected Owner Review directories occurred.
