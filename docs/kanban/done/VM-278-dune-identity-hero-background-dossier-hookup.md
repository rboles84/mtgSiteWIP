# VM-278 - Dune Identity-Hero Background Dossier Hookup

ID: VM-278
Title: Dune Identity-Hero Background Dossier Hookup
Status: done
Type: Runtime Presentation / Dossier Asset Hookup
Area: Dune, Archscry Dossier, Identity Hero Assets
Priority: medium
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Hooked the user-provided `assets/img/identity-hero/dune.webp` asset into the existing VM-271 identity-hero dossier background system for live `DUNE`.

## Results

- Added `DUNE: "dune"` to the shared identity-hero slug map.
- Updated focused dossier follow-up coverage from 32 to 33 asset-backed live dossier entries.
- Verified the Dune hero composes the same layer order as the existing rollout: overlay, identity image, existing faction banner.
- Preserved `COLORLESS`, `WUBRG`, and future four-color lanes (`INK`, `WITCH`) as unmapped.

## Protected Surfaces

- Did not edit `data/raw-factions/dune/**`.
- Did not edit `docs/research/dune/**`.
- Did not edit `docs/architecture/colors/dune/**`.
- Did not change Dune placement eligibility, aliases, routes, Home preview membership, Maze behavior, Supabase runtime, generated data, schemas, or promotion status.
- Did not touch unrelated Yore, Glint, Ink, Witch, or dirty worktree files.

## Verification

- `DUNE` resolves to `/assets/img/identity-hero/dune.webp` through the existing dossier hero helper.
- `BRGW`, `WBRG`, and all same-color permutations remain metadata-query-only and unmapped as public hero slugs.
- The existing Dune faction banner remains the bottom background layer.

## Tests Run

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`

## Related Handoff

- `docs/handoffs/2026-06-03-2231-codex-vm278-dune-identity-hero-background.md`
