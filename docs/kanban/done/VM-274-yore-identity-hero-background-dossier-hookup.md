# VM-274 - Yore Identity-Hero Background Dossier Hookup

ID: VM-274
Title: Yore Identity-Hero Background Dossier Hookup
Status: done
Type: Runtime Presentation / Dossier Asset Hookup
Area: Yore, Archscry Dossier, Identity Hero Assets
Priority: medium
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Hooked the user-provided `assets/img/identity-hero/yore.webp` asset into the existing VM-271 identity-hero dossier background system for live `YORE`.

## Results

- Added `YORE: "yore"` to the shared identity-hero slug map.
- Updated focused dossier follow-up coverage from 30 to 31 asset-backed live dossier entries.
- Verified the Yore hero composes the same layer order as the existing rollout: overlay, identity image, existing faction banner.
- Preserved `COLORLESS`, `WUBRG`, and future four-color lanes (`GLINT`, `DUNE`, `INK`, `WITCH`) as unmapped.

## Protected Surfaces

- Did not edit `data/raw-factions/yore/**`.
- Did not edit `docs/research/yore/**`.
- Did not edit `docs/architecture/colors/yore/**`.
- Did not change Yore placement eligibility, aliases, routes, Home preview membership, Maze behavior, Supabase runtime, generated data, schemas, or promotion status.
- Did not touch unrelated Glint, Dune, Ink, Witch, or dirty worktree files.

## Verification

- `YORE` resolves to `/assets/img/identity-hero/yore.webp` through the existing dossier hero helper.
- `WUBR` and all permutations remain metadata-query-only and unmapped as public hero slugs.
- The existing Yore faction banner remains the bottom background layer.

## Tests Run

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`

## Related Handoff

- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`
