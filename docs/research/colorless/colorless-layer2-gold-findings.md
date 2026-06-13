# Colorless Layer 2 Gold Findings

Status: VM-340 landed gold findings
Author: Codex
Date: 2026-06-11

## Purpose

VM-338 turned Colorless Layer 2 into a local authority map with 9 `external-required` rows, 4 `resolved-local` rows, 2 `deferred` rows, and 1 `blocked` relocation row. VM-339 and VM-340 complete the gold path:

- VM-339 captured compact official/current source notes under `docs/research/colorless/source-material/official/`.
- VM-339 promoted official-source claims through the source ledger, evidence ledger, manual-fill queue, and gap analysis.
- VM-340 resolved the relocation blocker with `docs/research/colorless/colorless-canon-relocation-map.md`.
- VM-340 certifies Colorless Layer 2 as gold for controlled source authority.

## Corrections To The Draft Findings

The earlier draft findings file is superseded by this one.

- The current Comprehensive Rules source is the TXT linked from the Wizards rules index at retrieval: `MagicCompRules 20260417.txt`, effective April 17, 2026.
- Scryfall is not used as primary source authority. Gatherer resolved for Wastes, Zhulodok, Omarthis, and Ulalek; Scryfall was used only as a cross-check while probing current card URLs.
- Ugin/Karn/Eldrazi lore is closed only at branch-anchor altitude.
- Artifact history is not broadly closed; only the artifact/color boundary is closed.
- Phyrexia is closed only as a negative discriminator through Phyrexian mana-symbol rules; positive Phyrexia lore remains deferred.

## Captured Source Registry

| ID | Role | Note |
| --- | --- | --- |
| `COLORLESS-OFF-001` | Current rules | `source-material/official/colorless-off-001-current-comprehensive-rules.md` |
| `COLORLESS-OFF-002` | Oath mechanics | `source-material/official/colorless-off-002-oath-gatewatch-mechanics.md` |
| `COLORLESS-OFF-003` | Commander format | `source-material/official/colorless-off-003-commander-format-rules.md` |
| `COLORLESS-OFF-004` | Gatherer card data | `source-material/official/colorless-off-004-gatherer-card-data.md` |
| `COLORLESS-OFF-005` | Eldrazi Unbound product proof | `source-material/official/colorless-off-005-commander-masters-eldrazi-unbound.md` |
| `COLORLESS-OFF-006` | Eldrazi Incursion comparator proof | `source-material/official/colorless-off-006-modern-horizons-3-eldrazi-incursion.md` |
| `COLORLESS-OFF-007` | Ugin/Karn/Eldrazi branch lore | `source-material/official/colorless-off-007-ugin-karn-eldrazi-lore.md` |

Each source note records retrieval date, URL, source role, claim mapping, and short excerpt cues only.

## Gold Scorecard

| Requirement | Result | Evidence |
| --- | --- | --- |
| Every former `external-required` row is closed by current source capture. | Met | `COLORLESS-MF-001`, `-002`, `-003`, `-004`, `-005`, `-006`, `-007`, `-013`, and `-014` are now `resolved-official`. |
| Every `resolved-official` row has source/evidence/manual-fill/gap-analysis linkage. | Met | `COLORLESS-OFF-001` through `COLORLESS-OFF-007`; `COLORLESS-EVID-027` through `COLORLESS-EVID-030`; manual-fill and gap-analysis tables. |
| Blocked rows are resolved. | Met | `COLORLESS-MF-009` is now `resolved-local` via `colorless-canon-relocation-map.md` and `COLORLESS-EVID-031`. |
| Deferred rows have explicit policy reason and future trigger. | Met | `COLORLESS-MF-010` and `COLORLESS-MF-015` remain deferred with policy/future-trigger text. |
| Support-only files do not independently authorize claims. | Met | Source ledger keeps JSONL, synthesis, and duplicate source files support-only; official rows carry gold claims. |
| Product boundary remains unchanged. | Met | `COLORLESS-EVID-032` and gap-analysis `Not Authorized` section preserve no Home/routes/aliases/Commander Compass/runtime/generated/image expansion. |

## Gold-Safe Claim Set

- Colorless is not a color and not a sixth color, while colorless is a type of mana.
- `{C}` is specifically colorless mana or a colorless-only cost; generic costs can be paid with any mana type.
- Wastes is the clean Colorless mana-base anchor, but no broader land-package advice is approved.
- Devoid makes objects colorless, but Commander color identity can still make a Devoid card non-strict-Colorless.
- Ulalek and Eldrazi Incursion are comparator/five-color Eldrazi material, not native strict-Colorless support.
- Eldrazi Unbound, Zhulodok, and Omarthis are official strict-Colorless support at the product/card-boundary level.
- Artifacts and Colorless are not equivalent.
- Phyrexia is a negative false-positive discriminator only.
- Ugin, Karn, and the Eldrazi titan prison story are branch anchors only.

## Still Not Authorized

- Home preview.
- Public Colorless routes, aliases, directory links, or URL expansion.
- Commander Compass.
- Broad Commander, deck, or land-package recommendations.
- Exact deck-buying advice.
- Prices or metagame claims.
- Positive Phyrexia lore.
- Broad artifact history.
- Treating generated files, runtime copy, recommendation JSONL, or `colorless.webp` as source evidence.

## Final Status

Colorless Layer 2 is gold for controlled source authority after VM-340. Future work can build from this source floor, but any public discoverability or recommendation expansion still needs a separate product card.
