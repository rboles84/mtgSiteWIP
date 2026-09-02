# VM-620 Shared Field Guide Beacon Inventory

**Date:** 2026-09-01
**Branch:** `codex/vm-620-shared-guide-beacon`
**Accepted baseline:** `9c572edb0232161c860ea199a508a73f99a5d6fd`

## Decision

Only a page-level invitation that means “Field Guide help is available for what you are doing right now” is eligible for the shared Beacon. Ordinary navigation, Guide-page continuation, and reference links retain their existing treatments. Repository search and rendered-product inspection found exactly three eligible contextual invitations.

## Eligible contextual invitations

| Source route | DOM owner | Visible copy | Destination | Appears when | Meaning | Local hierarchy | Beacon |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home `/` | `index.html` | `FIELD GUIDE` / `New to Vox Mana?` / `Start with the Guide →` | `/guide/?guided=vox-mana-intro` | Always, above the four product paths | Contextual orientation help | Secondary to the four functional product paths | Eligible: entry variant, `home-guide-entry` |
| Archscry `/archscry/` | `assets/js/archscry/runtime/dossier-view.js` | `FIELD GUIDE` / `How to read your dossier →` | `/guide/reading/?guided=dossier-reading` | A real dossier result renders its orientation region | Contextual help for reading the current dossier | Secondary to the orientation question and four practical decisions | Eligible: compact variant, `dossier-reading-help` |
| Maze `/maze/` | `assets/js/maze/research-ui.js` | `FIELD GUIDE` / `Walk me through this search →` | `/guide/maze/?guided=maze-search` | Query Inspector has a meaningful translated query | Contextual help for understanding the current search | Secondary to the translation/recovery content | Eligible: Maze variant, `maze-search-help` |

No fourth contextual invitation was found. `/guide/reference/` does not exist.

## Ordinary Guide navigation intentionally left normal

The desktop utility action is a stable navigation destination, not contextual help. Each remains `Guide`, normalized destination `/guide/`, tertiary to the current page task, and ineligible for Beacon treatment.

| Source route / owner | When visible | Classification |
| --- | --- | --- |
| `/` — `index.html` | Desktop utility bar | Navigation; ineligible |
| `/archscry/` — `archscry/index.html` | Desktop utility bar | Navigation; ineligible |
| `/maze/` — `maze/index.html` | Desktop utility bar | Navigation; ineligible |
| `/strategium/` — `strategium/index.html` | Desktop utility bar | Navigation; ineligible |
| `/strategium/before-game/` — `strategium/before-game/index.html` | Desktop utility bar | Navigation; ineligible |
| `/strategium/during-game/` — `strategium/during-game/index.html` | Desktop utility bar | Navigation; ineligible |
| `/strategium/find-a-table/` — `strategium/find-a-table/index.html` | Desktop utility bar | Navigation; ineligible |
| `/strategium/console/` — `strategium/console/index.html` | Desktop utility bar | Navigation; ineligible |
| `/strategium/review/` — `strategium/review/index.html` | Desktop utility bar | Navigation; ineligible |
| `/apocrypha/` — `apocrypha/index.html` | Desktop utility bar | Navigation; ineligible |
| `/library/` — `library/index.html` | Desktop utility bar | Navigation; ineligible |
| `/privacy/` — `privacy/index.html` | Desktop utility bar | Navigation; ineligible |
| `/terms/` — `terms/index.html` | Desktop utility bar | Navigation; ineligible |
| `/guide/` — `guide/index.html` | Desktop utility bar, current-page state | Navigation; ineligible |
| `/guide/reading/` — `guide/reading/index.html` | Desktop utility bar, current Guide section | Navigation; ineligible |
| `/guide/maze/` — `guide/maze/index.html` | Desktop utility bar, current Guide section | Navigation; ineligible |

`assets/js/shared/vm-topbar.js` clones each route's desktop utility Guide action into the mobile menu. Those generated `Guide` actions retain ordinary mobile navigation treatment on all 16 routes and are also ineligible.

## Guide-page links intentionally left normal

These links occur inside the Guide and already have clear navigation, continuation, skip, CTA, or footer jobs. None says contextual help is newly available, so none receives Beacon anatomy or animation.

| Guide route | Exact link set | Classification / hierarchy | Beacon |
| --- | --- | --- | --- |
| `/guide/` | Skip to Field Guide; brand Home; primary nav Home, Archscry, Maze, Strategium, Apocrypha; utility Guide; `Start an Archscry reading`; `Enter the Implicit Maze`; `Visit Strategium`; `Consult Apocrypha`; footer Back to top, Home, Privacy, Terms | Accessibility/navigation, primary product continuation, or tertiary footer/reference | Ineligible |
| `/guide/reading/` | Skip to dossier reading; brand Home; primary nav Home, Archscry, Maze, Strategium, Apocrypha; utility Guide; `Return to Archscry`; `Enter the Implicit Maze`; footer Back to top, Field Guide, Home, Privacy, Terms | Accessibility/navigation, product continuation, or tertiary footer/reference | Ineligible |
| `/guide/maze/` | Skip to Maze reading; brand Home; primary nav Home, Archscry, Maze, Strategium, Apocrypha; utility Guide; `Return to the Implicit Maze`; footer Back to top, Field Guide, Home, Privacy, Terms | Accessibility/navigation, product continuation, or tertiary footer/reference | Ineligible |

The two Apocrypha external source links whose article titles contain “Guide” lead to Wizards of the Coast source articles, not the Vox Mana Field Guide, and are ordinary references outside VM-620.

## Hierarchy problem solved

- **Home:** the former small inline discovery stripe was easy to miss. The entry variant makes optional orientation recognizable while remaining a narrow element above—not a fifth member of—the four product-card grid.
- **Archscry:** the dossier help link now belongs to the same visual family while remaining smaller than the orientation question and its four decision controls. It is not styled as a fifth decision tile.
- **Maze:** the accepted Query Inspector invitation remains the reference treatment, but its former route-local animation and styling now use the shared owner without changing its wording, placement, or guided destination.

## Shared architecture

- **Common anatomy:** rune mark, `FIELD GUIDE` eyebrow, route-specific context/action copy, bounded translucent surface, quiet state, finite perimeter signal, steady hover/focus state.
- **Variants:** `--entry` for Home, `--compact` for the dossier, and `--maze` for Query Inspector sizing/placement.
- **CSS owner:** `assets/css/guide-beacon.css`.
- **JS owner:** `assets/js/shared/guide-beacon.js`.
- **Trigger:** `IntersectionObserver` starts the sequence at 55% visibility; unsupported browsers receive the static link.
- **Visit state:** an in-memory `Set` keyed by the three stable logical IDs prevents rerender and scroll replay. It uses no persistence, account state, cookies, or telemetry.
- **Dynamic surfaces:** a small `MutationObserver` attaches the same behavior when Archscry or Maze creates a Beacon after load.
- **Interaction:** pointer entry, mouse entry/over, or keyboard focus settles the active sequence permanently for that page visit and retains steady visual hierarchy.
- **Motion:** one 4.8-second, three-beat sequence. Both OS reduced motion and Vox Mana `data-reduce-motion="true"` suppress it while retaining the static affordance.
- **Progressive enhancement:** destinations are ordinary anchors in route markup/template output. If JS fails, navigation and static recognition remain intact.
- **Route loading:** Home, Archscry, and Maze load the shared CSS/JS. Guide, Strategium, Apocrypha/Library, Privacy, Terms, and other routes do not.
- **Driver boundary after the Owner-authorized VM-621 resolution:** all three contextual Beacons use explicit opt-in guided URLs. Their product routes still load no Driver assets; each matching Guide route lazy-loads the same local Driver 1.8.0 lifecycle only when its exact `guided` value is present.
