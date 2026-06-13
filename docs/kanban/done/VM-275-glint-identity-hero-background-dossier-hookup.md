# VM-275 - Glint Identity-Hero Background Dossier Hookup

ID: VM-275
Title: Glint Identity-Hero Background Dossier Hookup
Status: done
Type: Runtime Presentation / Dossier Asset Hookup
Area: Glint, Archscry Dossier, Identity Hero Assets
Priority: medium
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Hooked the user-provided `assets/img/identity-hero/glint.webp` asset into the existing VM-271 identity-hero dossier background system for live `GLINT`.

## Results

- Added `GLINT: "glint"` to the shared identity-hero slug map.
- Preserved the existing live `YORE: "yore"` dossier mapping in the same shared helper so focused identity-hero coverage stays consistent with the current live four-color set.
- Updated focused dossier follow-up coverage from 31 to 32 asset-backed live dossier entries.
- Verified the Glint hero composes the same layer order as the existing rollout: overlay, identity image, existing faction banner.
- Preserved `COLORLESS`, `WUBRG`, and future four-color lanes (`DUNE`, `INK`, `WITCH`) as unmapped.

## Protected Surfaces

- Did not edit `data/raw-factions/glint/**`.
- Did not edit `docs/research/glint/**`.
- Did not edit `docs/architecture/colors/glint/**`.
- Did not change Glint placement eligibility, aliases, routes, Home preview membership, Maze behavior, Supabase runtime, generated data, schemas, or promotion status.
- Did not touch unrelated Yore, Dune, Ink, Witch, or dirty worktree files.

## Verification

- `GLINT` resolves to `/assets/img/identity-hero/glint.webp` through the existing dossier hero helper.
- `UBRG` and all permutations remain metadata-query-only and unmapped as public hero slugs.
- The existing Glint faction banner remains the bottom background layer.

## Tests Run

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`

## Related Handoff

- `docs/handoffs/2026-06-03-1406-codex-vm275-glint-identity-hero-background.md`
