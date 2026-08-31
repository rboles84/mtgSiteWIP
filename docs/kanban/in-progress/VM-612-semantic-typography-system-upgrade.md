# VM-612 - Semantic Typography System Upgrade

## ID

VM-612

## Title

Semantic Typography System Upgrade

## Status

Owner Review Ready - typography, Archscry revisions, and durable Home FDN mythic signature on `font-upgrade`

## Type

Design / Frontend (CSS, font assets, bounded HTML/JS typography strings)

## Area

Shared typography and all live public routes

## Priority

High - owner-approved brand/readability system migration

## Created

2026-08-30

## Summary

Replace the current Fraunces/Spectral presentation contract with a semantic four-voice system:
Cormorant SC for brand, Almendra for important ideas and route identity, Lora for reading, and
Outfit for interface. Retain IBM Plex Mono only for literal syntax, identifiers, machine/archive
representation, and fixed-width data where monospace conveys meaning.

The visual concept is **ancient knowledge presented through a modern instrument**. The work is a
typography migration, not a route, component, visual-theme, or behavior redesign.

## Source

- Owner prompt: `Vox Mana Typography System Upgrade - Implementation + Owner Review`
- Prior architecture: VM-413 Fraunces + Spectral Type System Unification
- Governing implementation gate: `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`
- Governing QA gate: `.agents/skills/robqa/SKILL.md` and `docs/qa/RobQAPass.md`
- Exact base: `960c3a2db27f5b4dd4cbae6cc5b0889235f3750b`
- Branch: `font-upgrade`

## Pre-Flight Contract

- Product outcome: each typographic voice has one understandable job across the public product,
  with the Home hero as the primary owner-review surface.
- Current behavior: Fraunces owns brand, navigation, headings, route titles, and direct SVG/canvas
  labels; Spectral owns prose; IBM Plex Mono owns both true syntax and many ordinary controls/labels.
- Locked decisions: Cormorant SC = brand; Almendra = expression/destination; Lora = reading;
  Outfit = interface; Plex Mono = technical utility only; Home slogan is the intentional two-beat
  uppercase `Find your place` / `Shape your play` presentation with a fixed Foundations mythic
  Keyrune signature between restrained rules.
- Owning layer: self-hosted faces in `assets/css/fonts.css`, semantic stacks in
  `assets/css/tokens.css`, shared role owners in `topbar.css` and `components.css`, and route-local
  CSS/HTML/JS only where the semantic role is known locally.
- Existing machinery: preserve the self-hosted WOFF2 pipeline, shared token layer, existing route
  styles, existing responsive breakpoints, current static guards, visual-regression scripts, and
  current local static-server/browser QA infrastructure.
- Changed behavior: font family/weight/style/tracking/line-height/size where metrics require it,
  Home slogan and signature divider, font preloads, direct rendering font strings, and
  typography-specific responsive/accessibility corrections.
- Protected behavior: placement, scoring, recommendation, identity/evidence truth, generated data,
  Scryfall behavior, Maze parsing/query generation, Loom, Strategium workflows, Archscry logic,
  telemetry, analytics, routes, navigation structure, modals except typography fit, cards, glass,
  backgrounds, artwork, and iconography.
- Material consumers: Home, shared topbar/components, Archscry, Maze and Loom, Strategium and
  subroutes, Apocrypha, Privacy, Terms, Library, and any current Placement surface.
- Relevant states: desktop through narrow mobile, existing topbar compression points, Home collapse,
  long queries/names/metadata, dynamic dossier/modal content, glyph coverage, font swap/load failure,
  reduced motion, focus, zoom, and no-font fallback.
- Smallest complete implementation: one shared token/asset contract plus bounded role corrections in
  the actual live consumers, rendered proof, and a short owner-review packet.
- Non-goals: no data/source/generated changes, no functional JS refactor, no new breakpoints without
  measured need, no visual baseline updates, no old-font deletion, no unrelated cleanup.
- Stop conditions: unexpected dirty/unrelated work, unsafe source/generated conflict, product-logic
  impact, font licensing/provenance uncertainty, or a required architecture change outside typography.

## Acceptance Criteria

- Canonical tokens expose `--font-brand`, `--font-display`, `--font-reading`, compatibility
  `--font-text`, `--font-ui`, and unchanged semantic `--font-mono` stacks.
- New production font requests are self-hosted WOFF2 only; no Google Fonts/CDN runtime request.
- Shipped faces are bounded to Cormorant SC 700, Almendra 400/700, Lora 400-700 normal/italic, and
  Outfit 400-700, with Latin and Latin Extended coverage and documented OFL provenance.
- Global headings fail safely to Lora; only confirmed editorial/destination headings use Almendra;
  functional headings and controls use Outfit.
- `.vm-brand-text` uses Cormorant SC and `.vm-nav-link` plus ordinary controls use Outfit.
- IBM Plex Mono remains only where syntax, literal identifiers, aligned data, or machine/archive
  presentation conveys meaning; important exceptions are documented.
- Home renders the approved accessible slogan without terminal periods in two intentional beats,
  Almendra 700, with one decorative `aria-hidden` rule/FDN mythic/rule signature divider.
- All live hard-coded Fraunces SVG/canvas/chart strings are semantically migrated.
- Fraunces-specific `font-variation-settings` are removed from new-family consumers; every remaining
  variation setting is inventoried and justified.
- Representative WOFF2 requests return 200 with no 404/CORS/MIME/console failure;
  `document.fonts.ready`, `document.fonts.check()`, and computed-family checks pass for brand, hero,
  prose, interface, and retained syntax.
- Home desktop/mobile, Maze, Archscry including modal/dynamic content, Apocrypha, Strategium, and
  mobile topbar receive rendered QA; actual Placement is included only if a dedicated route exists.
- Targeted HTML/static/syntax/frontend/accessibility/visual-compare checks and `git diff --check`
  are run. Expected typography screenshot mismatches are preserved as review evidence; baselines are
  not changed.
- Localhost remains available when possible and the candidate stops uncommitted/unpushed for Owner
  Review.

## Files Likely Impacted

- `assets/fonts/*` and `assets/fonts/README.md`
- `assets/css/fonts.css`, `tokens.css`, `topbar.css`, `components.css`, `home.css`, `archscry.css`,
  `maze.css`, `strategium.css`, `apocrypha.css`, and `legal.css`
- `index.html`, current route HTML only where font preload/semantic markup requires it
- `assets/js/shared/vm-radar.js`, `assets/js/archscry/dossier-radar.js`
- focused static/browser validation only if the existing guard cannot express the new contract
- Kanban and handoff records

## Risks

- Shared tokens can propagate accidental Almendra into dense application headings.
- New metrics can overflow the topbar, Home hero, native controls, long card names, modal content,
  charts, and dense result metadata.
- Incomplete subsets can silently fall back for curly punctuation, extended Latin, symbols, or MTG
  names.
- Font declarations can be correct while requests fail or computed fallback fonts render.
- Expected visual-regression diffs can hide unintended structural movement.
- Archscry and Apocrypha have the largest semantic classification surface because display/mono are
  currently used for many different roles.

## Implementation Prompt

Apply the owner-supplied typography implementation brief exactly within this card's boundaries.
Complete technical and rendered QA, start localhost from `font-upgrade`, and stop for Owner Review.
Do not commit, push, merge, update main, refresh visual baselines, delete old font assets, or
self-accept the visual result.

## Notes

- QA tier: QA-1 presentation/copy with high shared visual blast radius.
- CPU-heavy placement, synthetic, mutation, recovery, and all-identity semantic suites are not
  required because their protected behavior and code remain unchanged.
- Main and `origin/main` were clean and synchronized at the exact base before branch creation.

## Implementation Result

- Installed and documented self-hosted Latin/Latin-ext WOFF2 assets plus OFL notices for Cormorant
  SC 700, Almendra 400/700, Lora variable 400-700 normal/italic, and Outfit variable 400-700.
- Replaced the active shared token contract, retained `--font-text` as the Lora compatibility alias,
  and kept IBM Plex Mono for technical syntax/data surfaces.
- Migrated the shared topbar and live Home, Maze, Archscry, Apocrypha, Strategium/subroute,
  Privacy, Terms, and Library consumers; the Library remains an Apocrypha alias and no dedicated
  Placement route exists outside Archscry's dossier result.
- Replaced Home's hero with the approved two-beat natural-case DOM copy, Almendra 700 uppercase
  presentation, a fixed locally hosted Keyrune Foundations mythic signature, and a single Almendra
  700 preload.
- Removed all live direct Fraunces strings and Fraunces-specific variation settings. Old font files
  and inactive `@font-face` blocks remain only as owner-review rollback inventory.
- Added `?v=vm612` cache busting to all live changed typography stylesheet consumers after rendered
  QA proved a real stale-CSS risk. Home and Apocrypha route CSS use `vm612b` and `vm612a`
  respectively after their final responsive/semantic fixes.

## RobQA Result

- Risk: QA-1 with high shared visual blast radius; protected application/data behavior unchanged.
- Passed: HTML validation, JS lint, frontend smoke, focused Maze result/hover tests, Strategium
  remediation checks, 12/12 WOFF2 HTTP 200 + `font/woff2`, direct browser `document.fonts` and
  computed-family proof, desktop/mobile rendered review, required route/modal review, breakpoint
  geometry, post-load geometry stability, and zero horizontal overflow on reviewed surfaces.
- Browser smoke: reproducible timeout before Archscry workflow initialization; its captured state
  had no active panel or typography assertion. Direct Archscry dossier and card-dialog QA passed.
- Visual comparison scripts did not reach diff evaluation: Home artifact write `EPERM`, Archscry
  missing `scripts/data/factions.json`, Strategium and Apocrypha 30-second harness timeouts.
  No visual baseline was updated.
- CPU-heavy placement, synthetic, mutation, recovery, and all-identity suites were not required for
  this typography-only change.

## Owner Review Queue

Review Home desktop/mobile first, then the shared topbar, Maze, Archscry dossier plus card dialog,
Apocrypha, and Strategium at `http://127.0.0.1:4174/`. Judge only typography fit, hierarchy,
readability, clipping, and voice separation. Do not treat this card as visual acceptance.

## Owner Review Follow-Up - Archscry Intro Copy

- Scope: replace only the owner-specified Archscry landing headline, two introductory paragraphs, and
  primary CTA label.
- Protected behavior: preserve the eyebrow, markup, classes, IDs, typography, spacing, layout,
  responsive rules, accessibility semantics, navigation, authentication, placement, scoring, dossier,
  comparison, and all JavaScript behavior.
- QA tier: QA-1 copy-only; verify exact source text, absence of the replaced phrases on the live start
  surface, and rendered fit at desktop and narrow widths. Report any text-overflow defect before any
  presentation adjustment.
- Stop condition: leave the revised candidate uncommitted, unpushed, and unmerged for owner review.

### Follow-Up Result

- Replaced only the four requested live landing strings in `archscry/index.html`.
- Exact new-copy and old-phrase absence checks passed; HTML validation and diff hygiene passed.
- Rendered QA passed at 1440x1000 and 390x844 with Almendra loaded, no horizontal overflow or clipping,
  both paragraphs contained, and the CTA complete on one line.
- No CSS, markup structure, accessibility, responsive, or JavaScript change was required.
- Candidate remains uncommitted, unpushed, and unmerged for owner review.

## Owner Review Follow-Up - Archscry Headline Measure

- Owner finding: the desktop headline is constrained to the left while substantial usable card width
  remains empty to its right.
- Scope: let the landing headline use the available right-hand desktop space through the existing
  Archscry landing CSS owner.
- Protected behavior: preserve the exact approved copy, font family, weight, size treatment, paragraph
  measures, CTA, card geometry, navigation, responsive mobile treatment, accessibility, and all
  JavaScript behavior.
- QA tier: QA-1 presentation; compare rendered line geometry and containment at desktop, intermediate,
  and narrow widths. Do not add a new breakpoint unless current breakpoints cannot express the change.
- Stop condition: no horizontal overflow, edge crowding, clipping, or unintended paragraph/CTA change;
  leave the candidate uncommitted, unpushed, and unmerged for owner review.

### Headline Measure Follow-Up Result

- Increased only the route-local title cap from `14ch` to `21ch`; no new breakpoint was needed.
- Advanced only `archscry.css` to cache key `vm612a` and aligned its existing HTML validator contract.
- Desktop/intermediate/screenshot-sized review now renders a balanced three-line title using the
  available right-hand space with no overflow or clipping.
- The 390px title, paragraph, note, and CTA geometry is unchanged from the pre-edit baseline.
- HTML validation and diff hygiene pass; candidate remains uncommitted, unpushed, and unmerged.

## Owner Review Follow-Up - Home FDN Mythic Signature

- Owner finding: remove the two slogan periods, make the signature substantially longer, and replace
  the center diamond with a fixed Magic: The Gathering Foundations mythic set symbol.
- Existing infrastructure result: Vox Mana self-hosted Mana Font `1.18.0` for mana, card-type, ability,
  watermark, and related `ms-*` glyphs, but had no Keyrune CSS/font assets or `ss-*` classes.
- Approved dependency decision: vendor the owner-supplied Keyrune `3.19.0` runtime subset locally,
  preserve Mana Font unchanged, load Keyrune only where currently consumed, and document a pinned
  upgrade path rather than use a CDN, remote stylesheet, `latest`, or runtime package dependency.
- Protected behavior: application and route behavior, typography, body/CTA copy, artwork, navigation,
  responsive structure, accessibility meaning, Mana Font, and all symbols/rarity treatments elsewhere.
- QA tier: QA-1 visible presentation plus a bounded local font dependency; validate asset provenance,
  HTTP/font resolution, exact markup/copy, equal rule geometry, responsive containment, and console.

### Home Signature Follow-Up Result

- Added the compiled Keyrune `3.19.0` stylesheet, all five referenced font formats, upstream license,
  and version/source/checksum/upgrade documentation under `assets/vendor/keyrune/`.
- Loaded the pinned local stylesheet only on Home and used
  `<i class="ss ss-fdn ss-mythic" aria-hidden="true"></i>` inside the existing decorative signature.
- Removed only the terminal periods from `Find your place` and `Shape your play`.
- Replaced the diamond selector with a homepage-scoped Keyrune size rule; retained 1px warm-gold
  symmetrical rules. After owner review, enlarged the symbol and divider sizing values by 20% to
  `1.68rem`, `40.8rem`, and `24rem`, with safe desktop/mobile percentage caps.
- Updated the existing HTML validator to guard the pinned Keyrune link and stylesheet order; no
  runtime JavaScript, shared Keyrune rule, Mana rule, font token, or other route was changed.
- HTML validation, frontend smoke, diff hygiene, local asset HTTP checks, and rendered 1440x1000 plus
  390x844 QA pass. Both headline beats remain single-line, Keyrune computes/loads correctly with the
  standard mythic color, the two rule columns are equal, console is clean, and horizontal overflow is
  zero at both widths.
- Candidate remains uncommitted, unpushed, and unmerged for owner review.
