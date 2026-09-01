# VM-614 Field Guide Owner Review Evidence

Date: 2026-08-31

Disposition: **RobQA PASS - Owner Accepted**

QA classification: QA-3 shared navigation/routing plus visible product UI

## Acceptance binding

- Owner accepted VM-614 on 2026-08-31 with no further product changes authorized during closeout.
- Exact Owner-Accepted candidate: `06196825df786f7ae10509596169fe6e3b841417`.
- The successful deterministic and rendered evidence below applies to that exact commit.
- Closeout updates only lifecycle documentation; production files and protected product semantics remain
  identical to the accepted candidate.
- No owner judgment remains for VM-614.

## Owner finding disposition

The teaching-page structure approved in substance is preserved. This final presentation candidate uses:

1. a concise hero;
2. an Archscry explanation and labeled reading-to-dossier specimen;
3. a Maze explanation and one labeled, accessible three-mode specimen;
4. a Strategium explanation and labeled two-lane learning specimen;
5. a non-clickable product relationship flow;
6. a compact Apocrypha source continuation; and
7. the existing footer.

The hero now exposes the exact semantic hierarchy **Codex flavor -> A Planeswalker's Guide to Vox Mana
H1 -> subordinate tagline -> orientation sentence** across the full Guide content region. Sections I-III
foreground the product names beside their functional roles while retaining the approved benefit headings.
No section was added, removed, or reordered.

The final surgical hero correction removes the Guide-authored `23ch` H1 and `62ch` orientation caps,
slightly reduces only the Guide hero scale/padding, and advances the Guide stylesheet cache key. At the
desktop review width the exact H1 and orientation each occupy one line across the panel; mobile retains
the approved stacked hierarchy.

## Changed behavior

- Guide-local teaching copy has a stronger body size, line height, contrast, paragraph measure, and vertical
  rhythm; question callouts, specimen labels, CTA separation, Strategium lane grouping, and chips are more
  legible. Shared typography roles and all non-Guide routes are unchanged.
- The existing Maze specimen area now switches among three native-button states with `aria-pressed`,
  `aria-controls`, visible focus, pointer/touch activation, and Left/Right/Home/End keyboard navigation.
- Guide exposes exactly one principal body CTA each for Archscry, Maze, Strategium, and Apocrypha.
- The product relationship flow is explanatory and contains no links.
- Mobile stacks editorial copy, specimens, relationship nodes, and source continuation naturally.
- Hero geometry alone now uses the available desktop width and is vertically slimmer; hero wording,
  semantics, background, and every following section remain unchanged.

## Specimen truth and data safety

| Specimen | Current source used | Safety disposition |
| --- | --- | --- |
| Archscry | Current public `Reading complete`, supported-direction, `Placement dossier`, and dossier-directory labels from `archscry/index.html` and `assets/js/archscry/runtime/` | Generic process example only; no identity, score, answer, account, or saved-reading data |
| Maze - Plain Reading | Current Plain Reading compiler and public Plain Reading interface | HTML/CSS specimen: input `Red vampires that sacrifice creatures.` -> exact output `type:vampire type:creature c:r o:sacrifice`; no parser or semantic change |
| Maze - Operator's Hand | Current public Operator's Hand direct-query behavior and its existing public example | HTML/CSS specimen: exact query `c:r kw:haste mv<=3 f:modern`; explicitly presented as direct Scryfall syntax, not semantic interpretation; no product change |
| Maze - Loom | Current accepted Loom controls, exercised directly with Red + Creature + Haste + Commander | HTML/CSS specimen: current concepts Commander Colors, Card Type, Ability, Format, Current Weave; exact resulting query `id<=r t:creature f:commander kw:haste`; no Loom or query change |
| Strategium | Current public lifecycle and Commander Console labels from `strategium/index.html` and `strategium/console/index.html` | Static product-language example only; no player/pod claim or state |

No screenshot asset or fabricated live result is embedded in the Guide. Every product specimen is visibly
labeled **Example**. The interactive specimen is a Guide-only illustration; it does not import or alter
Maze query, results, state, persistence, or Reading Finds code.

## Protected contracts

- Archscry, dossier, Placement, Maze, Strategium, and Apocrypha runtime HTML/CSS/JS remain unchanged by
  this correction.
- Maze parsing, query semantics, dossier handoff, Reading Finds, persistence, and telemetry remain
  unchanged.
- Shared navigation, Home's separate Guide discovery treatment, and exactly four Home functional path
  cards remain unchanged.
- Existing atmosphere on all routes remains unchanged.
- `/guide/reading/`, `/guide/maze/`, and `/guide/reference/` remain absent.

## Deterministic validation

| Check | Result | Notes |
| --- | --- | --- |
| `npm.cmd run lint:html` | PASS | Exact H1/tagline, locked section order, prominent product labels, three Maze controls/panels and exact examples, Guide runtime, non-link relationship, route boundaries |
| `npm.cmd run lint:js` | PASS | 31 frontend JavaScript files |
| `npm.cmd run test:frontend-smoke` | PASS | Guide hierarchy, all three exact Maze examples, accessible state runtime, Home four-path contract, public route smoke |
| `npm.cmd run test:route-metadata` | PASS | 11 public route heads |
| `npm.cmd run test:copy-boundaries` | PASS | 30 live-copy files |
| `npm.cmd run test:guide-browser` | PASS | No H1/orientation width caps, >=90% H1 width, one-line desktop H1/orientation, hero height under 360px, mobile overflow, plus the existing hierarchy/Maze/keyboard/reduced-motion/zoom contracts |
| `git diff --check` | PASS | No whitespace errors; existing Windows LF/CRLF notices only |

Unrelated CPU-heavy Placement, semantic, all-identity, mutation, recovery, and journey suites: **SKIP -
not justified by this presentation-only change**.

The known fresh-session Archscry browser-smoke gap remains **SKIP - out of VM-614 scope**.

## Rendered review

- Desktop, 1440 x 1000: PASS
  - `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-hero-r8-desktop.png`
- Mobile, 390 x 844: PASS
  - `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-hero-r8-mobile.png`
- Maze Plain Reading state: PASS
  - `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-maze-plain.png`
- Maze Operator's Hand state: PASS
  - `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-maze-operator.png`
- Maze Loom state: PASS
  - `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-maze-loom.png`
- Keyboard: PASS - skip link, CTAs, Maze controls, arrow switching, visible focus, and panel state pass in DOM/product order.
- Touch equivalent: PASS - native-button activation switches the mobile specimen and hides the prior panel.
- Reduced motion: PASS - Guide CTA and Maze-mode transition/animation durations collapse under the media preference.
- 200% zoom equivalent: PASS - 720px CSS viewport has no horizontal overflow.
- Mobile overflow: PASS - 390px viewport reports `scrollWidth === clientWidth === 390`.

## Owner judgment requested

## Explicit RobQA criteria

1. PASS - H1 is exactly **A Planeswalker's Guide to Vox Mana**.
2. PASS - **Find your place. Shape your play.** is visually subordinate.
3. PASS - hero panel/copy uses the available Guide width; desktop H1 and short orientation are each one
   line in a panel under 360px high, while mobile wraps naturally without overflow.
4. PASS - Archscry, The Implicit Maze, and Strategium names are prominent.
5. PASS - Sections I and III pass the Guide-local body size/line-height/contrast and rendered review.
6. PASS - the single compact Maze specimen shows all three modes.
7. PASS - Plain Reading uses the exact current translation.
8. PASS - Operator's Hand is truthfully presented as direct syntax entry.
9. PASS - Loom uses current visible-builder concepts and an exact runtime-verified weave.
10. PASS - mouse, keyboard, and touch-equivalent activation work without hover; reduced motion is safe.
11. PASS - modes share one visual area instead of extending the page with three specimens.
12. PASS - the relationship map remains explanatory, non-clickable, and unchanged in structure.
13. PASS - Apocrypha remains a compact endcap with one CTA.
14. PASS - protected runtime behavior remains unchanged.
15. PASS - `/guide/reading/`, `/guide/maze/`, and `/guide/reference/` remain absent.

The bounded Section IV interaction idea is recorded only as a possible VM-617 polish question. No map
interaction was added, no VM-617 scope was committed, and no new card was created.

## Owner judgment requested

Please judge only:

1. hero identity and width;
2. text readability;
3. usefulness of all three Maze visual modes;
4. Strategium readability; and
5. overall page restraint.
