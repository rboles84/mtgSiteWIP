# Colorless Source-Readiness Matrix

Created: 2026-06-12
Related cards: VM-349, VM-354, VM-359, VM-372

## Purpose

This matrix records Colorless readiness as controlled-placeable data, not public expansion authorization. It exists to keep Colorless useful for placement while preventing unapproved route, Home preview, alias, directory, Commander, deck-link, or broad recommendation surfaces from appearing before a separate promotion gate passes.

## Guardrails

- VM-349/VM-354/VM-359 used local sources only. VM-372 adds current-source lookup only for the exact Colorless support rows and official Eldrazi Unbound decklist context.
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
| Colorless Commander Compass, deck links, research links, and broad recommendations | `split-after-VM-372` | VM-372 support-only gate for narrow fields; separate approval required for broad recommendations | VM-372 allows only support-only `commander_compass`, one `Eldrazi Unbound (Precon)` deck row, and source-context `research_links`. Broad recommendations remain blocked. |
| Colorless route, Home preview, alias, public directory link, and broad public discovery surfaces | `blocked-noncanonical` | Separate public-surface promotion gate required | Must remain absent. Any new exposure is a blocking validation failure. |
| Generated display, generated placement output, dossier output, runtime copy, and snippets | `blocked-noncanonical` | Symptoms only | May be inspected for leaks, but cannot prove or repair readiness. |

## UX Impact Notes

## VM-372 Narrow Allowance

VM-372 approves only these generated/public data fields for Colorless support context:

- `commander_compass.native_fit_commanders` rows for `Zhulodok, Void Gorger` and `Omarthis, Ghostfire Initiate`
- One `deck_links` row named `Eldrazi Unbound (Precon)`, with EDHREC and MTGDecks suppressed
- `research_links` that point to official, local, or exact source-verification references

Still blocked: Home preview, public route, aliases beyond `COLORLESS`, lowercase `colorless`, lowercase `c`, directory links, hero asset changes, schema/API expansion, public raw enrichment, broad staple lists, broad deck advice, EDHREC browse links, MTGDecks browse links, legality claims, popularity claims, metagame claims, price claims, and recommendation-quality claims.

`commander_legal: null` is deliberate in VM-372. The support rows do not introduce legality assertions.

- Placement should feel controlled and legible because Colorless has direct placement support.
- Edge cases against adjacent identities remain less refined because Crucibles are review candidates, not implemented pairs.
- Dossier richness intentionally remains sparse until a separate source/readiness gate approves public enrichment.
- The user experience should prefer a bounded, honest Colorless result over a rich but unsupported public dossier.

## No-Public-Expansion Checks

After any Colorless-related change, verify that no new route, Home preview entry, alias, public directory link, broad Commander/deck recommendation, or other public expansion surface was introduced.
