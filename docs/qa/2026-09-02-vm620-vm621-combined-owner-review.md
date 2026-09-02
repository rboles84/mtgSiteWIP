# VM-620 + VM-621 — Final Combined Owner Review

Status: RobQA READY / Owner Review; neither card Owner Accepted. No commit, push or merge.
Branch: `codex/vm-620-shared-guide-beacon`; one worktree, `C:/dev/voxmana.io`.
HEAD, local main and origin/main: `9c572edb0232161c860ea199a508a73f99a5d6fd`.
Candidate: current uncommitted combined worktree, NOT that baseline SHA alone.
Authority: latest Owner brief; separate VM-620/621 cards; repo-local RobDev/RobQA skills and frozen gates.

## Owner evidence and accessibility disposition

- Owner manually tested both new guided flows mechanically and visually: PASS.
- Owner manually verified the Home guided flow after the final surgical copy correction: PASS.
  Path: Home Field Guide Beacon → Home guided reading → Step 1 → Step 4 → Done → normal static Field Guide.
  Exact approved text appeared, Done returned correctly, and no additional Owner-visible defect was found.
- Automated/browser accessibility contracts: PASS.
- Automated accessibility contracts and Owner keyboard/visual interaction testing passed.
- Real screen-reader validation: NOT PERFORMED / optional future accessibility audit.
  Explicit Owner decision: NOT a blocker for this VM-620/621 Owner Review. Do not install NVDA as a review
  prerequisite. No screen-reader PASS, NVDA version, Owner browser version or VoiceOver coverage is claimed.
- Prior required/pending NVDA draft language is superseded. Historical VM-619 acceptance is not rewritten.

## Separate product ownership

VM-620 owns the shared visual Beacon family, semantic eligibility and finite attention behavior, not Driver.
VM-621 owns Home/dossier route configurations and contextual guided URLs, not a new walkthrough engine.
VM-619 remains the accepted Maze reference and unchanged shared lifecycle producer.

| Eligible surface | Variant / logical ID | Explicit destination | Hierarchy |
| --- | --- | --- | --- |
| Home: FIELD GUIDE / New to Vox Mana? / Start with the Guide | Entry / `home-guide-entry` | `/guide/?guided=vox-mana-intro` | Separate optional help above the four product cards |
| Dossier: FIELD GUIDE / How to read your dossier | Compact / `dossier-reading-help` | `/guide/reading/?guided=dossier-reading` | Secondary to the four practical decisions |
| Maze: FIELD GUIDE / Walk me through this search | Maze / `maze-search-help` | `/guide/maze/?guided=maze-search` | Query Inspector translation/recovery remains primary |

Excluded: desktop Guide utility, generated mobile Guide navigation, internal Guide links, footer links,
ordinary references and unrelated `/guide/` anchors. Eligibility is explicit markup, never URL-path styling.

Shared anatomy: rune/mark, FIELD GUIDE eyebrow, contextual action, bounded surface, restrained gold boundary/
glow, clear steady hover/focus. Entry, compact and Maze variants preserve route-specific density.
Signal: three perimeter/halo beats over 4.8 seconds, once when at least 55% meaningfully visible per logical
Beacon per page visit. In-memory IDs prevent scroll/rerender replay; reload/new visit may signal again.
Hover/focus settles it; OS and Vox reduced motion retain static discoverability. No text blink, whole-surface
flash, continuous animation, persisted seen state or attention-driven navigation.

Home retains Archscry, The Implicit Maze, Strategium and Apocrypha as four functional paths, not five.
Dossier retains Understand the result, Choose a first deck direction, Compare Commander starting points and
Keep exploring with cards as its four primary decisions; Field Guide help is not choice #5.

## Guided orientation contracts

Home `/guide/?guided=vox-mana-intro`, exactly four steps:

1. **Find your Commander direction** — Archscry uses your answers about Commander table moments to surface a supported direction you can inspect in a dossier.
2. **Find cards** — The Implicit Maze turns plain language, Scryfall syntax, or visual choices into a searchable path.
3. **Learn the table** — Strategium helps you read Commander moments, set expectations, and choose a clearer next step.
4. **See how Vox Mana fits together** — See how readings, dossiers, and card discovery connect, with Strategium and Apocrypha supporting table learning and source checking.

Dossier `/guide/reading/?guided=dossier-reading`, exactly four steps:

1. Understand what the result means.
2. Choose where to start.
3. Read the dossier by question.
4. Choose one next step.

Dossier sequence remains meaning → orientation → structure → action. No score, confidence, threshold,
model-internal or hidden-evidence disclosure. Popovers orient; highlighted static Guide content teaches.
No dossier-copy or static relationship-map change. Done returns to normal `/guide/` or `/guide/reading/`.
Direct `/guide/`, `/guide/reading/` and `/guide/maze/` are static: no automatic tour or Driver asset loading.
Explicit valid guided intent launches orientation; malformed/missing-target/asset failures return safely to
the static Guide. No new localStorage, sessionStorage, cookies, account state, completion tracking or telemetry.

## Final regression — 2026-09-02

QA-3 navigation/state transitions plus QA-2 shared component/accessibility; final Home copy is QA-1.
All commands below ran against the final combined production files; no product code changed during this pass.

| Check (`npm.cmd run …`) | Result | Protected risk |
| --- | --- | --- |
| `lint:html` | PASS | Public structure, script ownership and semantics |
| `lint:js` | PASS | 36 affected front-end JS files |
| `test:copy-boundaries` | PASS | 30 live-copy files |
| `test:route-metadata` | PASS | 13 public route heads |
| `test:frontend-smoke` | PASS | Shared route/navigation contracts |
| `test:reading-guide` / `test:reading-guide-browser` | PASS / PASS | VM-615 result/dossier orientation, static Reading Guide and certified bounded witnesses |
| `test:maze-onboarding` / `test:maze-onboarding-browser` | PASS / PASS | VM-616 context/recovery, Finds isolation, history and Guide |
| `test:vm619-guided-reading` / `test:vm619-guided-reading-browser` | PASS / PASS | Accepted Maze lifecycle, four steps and exact vendor hashes |
| `test:vm620-guide-beacon` / `test:vm620-guide-beacon-browser` | PASS / PASS | Exactly three owners, anatomy, visibility, finite/once-only signal, rerender, hover/focus, motion and fallback |
| `test:vm621-guided-reading` / `test:vm621-guided-reading-browser` | PASS / PASS | Both real Beacon launch paths, four-step configs, exact Home copy and lifecycle compatibility |
| `test:guide-browser` | PASS | Teaching hierarchy, specimen controls, static navigation, mobile/reflow/motion |
| `test:topbar-browser` | PASS | Normal desktop/mobile Guide utility, focus and responsive navigation |
| `git diff --check` | PASS | Patch whitespace |

Current browser accessibility coverage passes: forward focus; Tab/Shift+Tab; Enter/Space; Escape;
Previous/Next/Done/Close; underlying actionable suppression and exact tabindex restoration; cleanup and
meaningful focus restoration; OS/Vox reduced motion (including startup/live changes); 390×844 mobile;
720×500 200%-equivalent reflow; Back mid-tour and Done/Back; refresh/replay; missing targets and blocked Driver.
History PASS refers to those executed cases, not an invented exhaustive history certification.
The previously blocked strengthened VM-621 rerun now passed. No browser-launch limitation remains open.
VM-619 test reports no tour third-party requests; existing Maze-shell Supabase loading remains pre-existing
and unrelated, not new Beacon/tour persistence or telemetry.

CPU-heavy validation: NOT REQUIRED. SKIP Placement all-identity/SIRF/parser calibration/mutation,
exhaustive semantic/journey/synthetic suites and account/live-service suites: their producers did not change.
Real screen-reader testing: NOT PERFORMED, optional future audit; not reported as an automated PASS.

## Rendered evidence and integrity

Reinspected six fresh VM-620 witnesses in `outputs/vm620-vm621-final-review-20260902/vm620/`:
`{home,dossier,maze}-guide-beacon-desktop-1440x1000.png` and corresponding `*-mobile-390x844.png`.
Desktop confirms four Home product cards, secondary compact dossier help and intact Maze Inspector hierarchy.
Mobile confirms contained/wrapping Beacons; Home image samples its existing scroll-reveal timing, not a new
pillar. Real browser checks and Owner review supply interaction evidence beyond screenshots.
Home Steps 1/4 were also read in-app at 1440×1000 and 390×844 after the exact copy change: readable, contained
popovers and controls, 370px mobile popover with 10px margins. Both full flows were clicked in prior in-app
self-QA; current browser tests and Owner verification confirm the same unchanged production state.

Shared helper, Maze config, `guide/maze/index.html`, vendor directory, dependency lock and data are unchanged
against HEAD. Guide HTML diffs only add target IDs, programmatic heading focus and route adapters; shared
walkthrough CSS adds two quiet H1 focus selectors without changing Maze rules.
Driver.js 1.8.0 SHA-256 remains:

- JS: `C6ADE0B831C6C043DAF480861208CD2FA45EA4AAC581CC8BB8E234281C011DDF`
- CSS: `D095D440021FCF133AD46D37F18A2745FB76440F14F5208D17E203C039F765C9`

Existing `outputs/owner-review/`, `outputs/vm616-owner-review/`, `outputs/vm619-owner-review/` and VM-620's
six prior witnesses remain untracked and unchanged. Fresh VM-615/616/topbar witnesses are isolated beneath
the new combined output directory. No existing evidence was deleted or overwritten.

## Files by authority and candidate-binding recommendation

| Owner | Production | Test / documentation ownership |
| --- | --- | --- |
| VM-620 | `assets/css/guide-beacon.css`, `assets/js/shared/guide-beacon.js`; Beacon markup/assets in Home/Archscry/Maze; removal of old local Beacon styles/JS; associated route cache keys | VM-620 static/browser; VM-616/619/topbar compatibility/witness changes; inventory, card, original visual QA/handoff |
| VM-621 | `assets/js/guide/intro-walkthrough.js`, `reading-walkthrough.js`; Home/dossier guided hrefs; `guide/index.html`, `guide/reading/index.html` target/focus/adapter changes; two H1 selectors in walkthrough CSS | VM-621 static/browser; VM-615 destination checks; VM-620 destination compatibility; card/preflight/QA/copy handoffs |
| Shared integration | Home `index.html` and dossier-view contain distinct visual (VM-620) and href (VM-621) hunks | `package.json`, HTML/JS validators, frontend smoke, board/index and this combined packet |

This pass changes no production code. Only harness change: VM-620 browser accepts the same optional
`VM_OWNER_REVIEW_OUTPUT` override as existing compatibility scripts; its default and assertions stay intact.

Recommendation, NOT performed: after explicit Owner authorization, bind two scope-owned commits on this
same branch (VM-620 visual first, VM-621 configuration/URL second), splitting shared files by owned hunks.
Reference both commit SHAs and the final combined tip in both cards and review evidence. Review/accept the
combined tip; do not integrate the intermediate visual-only state. If a shared hunk cannot be separated
honestly, document it in the final integration commit rather than claiming independent acceptance.
Repository workflow does not require a pre-review commit here. No staging, commit, push, PR or merge was done.

## Explicit final answers

1. All three contextual Beacons share one recognizable language? **Yes.**
2. Every one actively orients the player when clicked? **Yes**, explicit matching guided URL, with safe static fallback on failure.
3. Ordinary Guide navigation accidentally launches orientation? **No.**
4. Home still four functional product pillars rather than five? **Yes.**
5. Dossier help secondary to its four practical decisions? **Yes.**
6. Maze VM-619 behavior unchanged? **Yes**, static/browser regression passed.
7. All three direct Guide routes remain static? **Yes.**
8. Home/dossier each four-or-fewer concise steps? **Yes**, exactly four each.
9. Popovers orient rather than duplicate the documents? **Yes**; short route-owned prompts over static teaching content.
10. One shared Driver lifecycle implementation? **Yes**, accepted helper reused unchanged.
11. Driver vendor files unchanged? **Yes**, exact hashes and clean vendor diff.
12. Signal finite and once-visible? **Yes**, three beats/4.8s/one logical ID per visit.
13. Rerender or scroll replays it? **No.**
14. Hover/focus settles it? **Yes.**
15. Reduced motion retains discoverability? **Yes**, static anatomy/focus retained.
16. Added persistence, telemetry or completion tracking? **No.**
17. VM-621 expanded into VM-620 or VM-617 ownership? **No.**
18. VM-620 took ownership of guided behavior? **No.**
19. Real screen-reader coverage truthfully not performed? **Yes**, optional future audit, nonblocking.
20. Signal means clicking actually helps orient the player? **Yes**, the tested three-Beacon flow fulfills that promise.

## Owner judgment — only these five questions

1. Do Home, dossier and Maze now feel like one coherent Field Guide help system?
2. Does each Beacon preserve the primary hierarchy of its page?
3. Do Home and dossier walkthroughs provide useful orientation without repeating the Guide?
4. Does the finite magical signal make help discoverable without becoming irritating?
5. Is the combined VM-620 + VM-621 experience ready to become the accepted contextual Field Guide pattern?

Stop at Owner Review. No self-acceptance, merge, VM-617 work or guided expansion to any other route.
