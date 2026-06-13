# Colorless Source-Readiness Matrix

Created: 2026-06-12
Related cards: VM-349, VM-354, VM-359

## Purpose

This matrix records Colorless readiness as controlled-placeable data, not public expansion authorization. It exists to keep Colorless useful for placement while preventing unapproved route, Home preview, alias, directory, Commander, deck-link, or broad recommendation surfaces from appearing before a separate promotion gate passes.

## Guardrails

- Local sources only; no web/source intake was performed.
- Five-color and `WUBRG` are out of scope until five-color exists in Vox Mana.
- Generated/runtime files, dossier output, snippets, current Archscry UI output, and existing display copy are symptoms only.
- Architecture docs are synthesis and cannot justify raw/profile/placement fields unless a later card promotes the relevant claim through a source/evidence ledger.
- Existing generated/runtime values may be preserved only if they trace back to official researched data.

## VM-349/VM-354 Reviewed Field Classifications

| Reviewed field or surface | Classification | Allowed source category | Result |
|---|---|---|---|
| Colorless raw packet presence | `source-normalization` | `data/raw-factions/colorless/colorless.*.json` | Raw packet exists and is the only canonical source surface for this matrix. No schema change. |
| Existing Colorless placement discriminators | `backed-repair` | Existing Colorless raw placement evidence | Preserved as controlled-placeable placement support. No new discriminator is required in VM-354. |
| Candidate `COLORLESS/YORE` Crucible | `source-intake-needed` | Future paired source review plus reproducible/source-backed close-call evidence | Candidate only; do not implement in VM-354. |
| Candidate `COLORLESS/ESPER` Crucible | `source-intake-needed` | Future paired source review plus reproducible/source-backed close-call evidence | Candidate only; do not implement in VM-354. |
| Candidate `COLORLESS/WITCH` Crucible | `source-intake-needed` | Future paired source review plus reproducible/source-backed close-call evidence | Candidate only; do not implement in VM-354. |
| Any Colorless Crucible outside `COLORLESS/YORE`, `COLORLESS/ESPER`, and `COLORLESS/WITCH` | `blocked-noncanonical` | None in this gate | Do not add another Colorless pair in VM-359. |
| Candidate `COLORLESS/WUBRG` Crucible | `blocked-noncanonical` | None until five-color exists | Do not add or test this pair in VM-354. |
| Public raw-enrichment surfacing for Colorless timeline, figures, and flavor | `blocked-noncanonical` | Separate UX-readiness and promotion approval required | Raw profile material may remain canonical source data, but it does not authorize public dossier enrichment in this pass. |
| Colorless Commander Compass, deck links, research links, and broad recommendations | `blocked-noncanonical` | Separate Commander/product support gate required | Keep suppressed from public generated/display surfaces. Support-only rows cannot authorize public recommendations. |
| Colorless route, Home preview, alias, public directory link, and broad public discovery surfaces | `blocked-noncanonical` | Separate public-surface promotion gate required | Must remain absent. Any new exposure is a blocking validation failure. |
| Generated display, generated placement output, dossier output, runtime copy, and snippets | `blocked-noncanonical` | Symptoms only | May be inspected for leaks, but cannot prove or repair readiness. |

## UX Impact Notes

- Placement should feel controlled and legible because Colorless has direct placement support.
- Edge cases against adjacent identities remain less refined because Crucibles are review candidates, not implemented pairs.
- Dossier richness intentionally remains sparse until a separate source/readiness gate approves public enrichment.
- The user experience should prefer a bounded, honest Colorless result over a rich but unsupported public dossier.

## No-Public-Expansion Checks

After any Colorless-related change, verify that no new route, Home preview entry, alias, public directory link, broad Commander/deck recommendation, or other public expansion surface was introduced.
