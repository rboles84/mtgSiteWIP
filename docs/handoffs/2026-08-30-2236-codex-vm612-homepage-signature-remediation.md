# VM-612 Home FDN Mythic Signature Owner-Review Handoff

## Agent name

Codex

## Task requested

Complete the bounded Home hero Owner Review remediation on `font-upgrade`: remove the terminal periods
from both slogan beats, substantially lengthen the existing divider, replace its diamond with a fixed
Magic: The Gathering Foundations mythic set symbol, and establish durable locally hosted Keyrune
infrastructure that Vox Mana can reuse alongside Mana Font. After the first render, enlarge the symbol
and divider sizing values by another 20%. Do not commit, push, merge, update visual baselines, redesign,
or change application behavior.

## Files reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md` and the three recent VM-612 handoffs
- `docs/kanban/board.md` and `docs/kanban/in-progress/VM-612-semantic-typography-system-upgrade.md`
- `index.html`, `assets/css/home.css`, `scripts/validate-frontend-html.mjs`, and `package.json`
- `assets/vendor/mana/README.md`, its CSS/font assets, and live Maze/Loom `ms-*` consumers
- Owner-supplied `C:\Users\obake\Downloads\keyrune-master.zip`
- Upstream `andrewgioia/Keyrune` repository, package metadata, compiled CSS, fonts, and license

## Files changed

- `index.html`
- `assets/css/home.css`
- `assets/vendor/keyrune/README.md`
- `assets/vendor/keyrune/LICENSE.md`
- `assets/vendor/keyrune/css/keyrune.min.css`
- `assets/vendor/keyrune/fonts/keyrune.eot`
- `assets/vendor/keyrune/fonts/keyrune.svg`
- `assets/vendor/keyrune/fonts/keyrune.ttf`
- `assets/vendor/keyrune/fonts/keyrune.woff`
- `assets/vendor/keyrune/fonts/keyrune.woff2`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-612-semantic-typography-system-upgrade.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What changed

- Vendored Keyrune `3.19.0` as a local runtime subset beside the existing Mana Font vendor directory.
- Recorded source version, archive SHA-256
  `FCFCB2C1AAC11E2D521809B2613559C3753677EDB2863802D3D46319FFA70F5E`, license, included files,
  exclusions, and an atomic future-upgrade procedure.
- Loaded `./assets/vendor/keyrune/css/keyrune.min.css?v=3.19.0` on Home only, before the route stylesheet.
- Removed the two hero terminal periods without changing wording, casing, DOM line structure, or font.
- Replaced the decorative diamond child with
  `<i class="ss ss-fdn ss-mythic" aria-hidden="true"></i>`.
- Kept the existing grid/pseudo-rule structure and 1px warm-gold rules. The final post-owner sizing is
  `40.8rem` desktop and `24rem` mobile with safe `100%`/`98.4%` caps, plus a `1.68rem` symbol.
- Advanced the Home CSS cache key to `vm612c` and updated the existing static guard for the pinned
  Keyrune dependency and exact stylesheet order.

## Why it changed

The owner wanted a cleaner, more monumental Home headline and an intentional fixed MTG-adjacent
signature. The repository's existing Mana Font supports mana, abilities, card types, watermarks, and
related `ms-*` glyphs but does not include expansion-set symbols. Keyrune owns the requested `ss-fdn`
set glyph and `ss-mythic` rarity color, so the smallest durable implementation is a pinned self-hosted
runtime subset that leaves Mana Font intact.

## Decisions made

- Keyrune complements Mana Font; it does not replace or modify it.
- Use owner-supplied Keyrune `3.19.0`, which already contains both `ss-fdn` and `ss-mythic`.
- Vendor only compiled runtime CSS, every font file referenced by that CSS, license, and provenance.
- Do not add npm, CDN, remote stylesheet, runtime JavaScript, randomization, animation, or `ss-grad`.
- Load Keyrune only on pages that consume it; the current consumer is Home.
- Apply symbol size through `.vm-hero-signature .ss`; do not change shared Keyrune rarity rules.

## RobDev compact packet

- Owning authority: the owner-supplied Home polish brief and VM-612 typography candidate.
- Producer: `index.html` owns hero semantics/dependency loading; `assets/css/home.css` owns signature
  layout; the pinned vendor directory owns the third-party symbol runtime.
- Changed behavior: Home punctuation and decorative divider presentation only.
- Protected behavior: application/routes, typography system, body/CTA copy, navigation, artwork,
  authentication, placement/scoring/dossiers, all runtime JS, Mana Font, and all other routes/icons.
- Consumers: Home hero only today; vendored Keyrune is reusable by explicit future page consumers.
- Risk: missing font formats/path drift, stale cache, symbol fallback, oversized narrow layout, or
  accidental global rarity styling. These are bounded by the full referenced runtime set, versioned
  stylesheet, scoped CSS, static guards, HTTP proof, and rendered geometry.
- Smallest complete implementation: local vendor pin plus one Home stylesheet link, one decorative
  markup replacement, and the existing divider CSS adjusted in place.
- Non-goals: no broad icon migration, Keyrune upgrade process implementation, shared icon utility,
  package dependency, typography reopening, other page changes, or visual baseline update.
- Stop condition: any missing `fdn`/mythic class, font load failure, clipping/overflow, rule asymmetry,
  behavior drift, or license/provenance uncertainty. None occurred.

## RobQA readiness packet

- Risk: QA-1 visible presentation with a bounded static third-party font asset.
- Owner finding/invariant: Home must always show two punctuation-free single-line slogan beats and one
  fixed centered Foundations mythic signature between restrained symmetrical rules.
- Deterministic checks: exact source/old punctuation absence, vendor class/file checks, HTML validator,
  frontend smoke, HTTP status/MIME, computed font/color/content, desktop/mobile geometry, console, and
  diff hygiene.
- Protected contracts: zero horizontal overflow; no headline wrapping; no runtime, route, typography,
  Mana Font, shared Keyrune, or other-page impact.
- Remaining owner judgment: final optical proportion of the 20%-enlarged divider and FDN ornament.

## Tests run

- PASS: `npm.cmd run lint:html`.
- PASS: `npm.cmd run test:frontend-smoke`.
- PASS: `git diff --check` (only existing line-ending notices).
- PASS: exact source check finds `Find your place`, `Shape your play`, and
  `ss ss-fdn ss-mythic`; old terminal-period phrases are absent from `index.html`.
- PASS: all five local Keyrune font files are non-empty; compiled CSS contains `ss-fdn` and
  `ss-mythic`; no remote runtime reference was introduced.
- PASS: localhost returned 200 for `keyrune.min.css` as `text/css` and `keyrune.woff2` as
  `font/woff2`.
- PASS: rendered `http://localhost:4174/index.html` at 1440x1000. Both headline spans have one client
  rect, Keyrune loads/computes, symbol is `26.88px` in standard mythic `rgb(191, 68, 39)`, rule grid
  columns are equal at `292.188px`, and horizontal overflow is zero.
- PASS: rendered at 390x844. Both headline spans have one client rect, the signature is contained at
  `337.5px`, rule grid columns are equal within subpixel rounding (`143.062px` / `143.078px`), the
  symbol remains `26.88px`, and horizontal overflow is zero.
- PASS: browser console contains no warnings or errors.
- No visual baseline was updated; CPU-heavy product/placement suites were not justified.

## Risks / uncertainties

- The source was an owner-supplied mutable `master.zip`; version and exact SHA-256 are recorded so this
  installed artifact remains reproducible even if upstream master changes.
- Legacy font formats are retained because the compiled stylesheet references them; current Chromium
  selects WOFF2. Future upgrades must replace CSS and fonts together.
- Final ornament scale remains an owner aesthetic decision, not agent acceptance.

## Not touched

- No runtime JavaScript or application/route/authentication behavior.
- No shared typography token, font family, font loading, or other route typography.
- No Mana Font CSS/assets/classes or Maze/Loom symbols.
- No shared Keyrune rule, rarity recolor, gradient, glow, animation, hover, tooltip, or randomization.
- No body copy, CTA, artwork, background, navigation, cards, Placement, scoring, dossier, telemetry,
  analytics, or generated data.
- No commit, push, merge, dependency installation, CDN, or visual baseline update.

## Follow-up recommendations

Owner reviews only the Home hero at desktop and near 390px for the final optical balance of the
enlarged rules and Foundations mythic ornament. Future set-symbol consumers should reuse the pinned
local stylesheet and documented `ss-*` classes rather than add another Keyrune copy.

## Next suggested agent

Owner review; no additional agent action unless the owner reports a bounded visual finding.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-612-semantic-typography-system-upgrade.md`
- `docs/handoffs/2026-08-30-2154-codex-vm612-typography-owner-review.md`
- `docs/handoffs/2026-08-30-2204-codex-vm612-archscry-intro-copy-revision.md`
- `docs/handoffs/2026-08-30-2212-codex-vm612-archscry-headline-measure-revision.md`
- `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` and `docs/qa/RobQAPass.md`
