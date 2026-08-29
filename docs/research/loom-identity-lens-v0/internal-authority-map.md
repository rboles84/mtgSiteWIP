# Internal authority map — Loom Identity Lens v0

Status: Owner Accepted; research-only and closed. This map records producer authority, not a new truth source.

| Need | Owning internal authority | Use | Boundary |
|---|---|---|---|
| Color-pair query truth | `assets/js/maze/research-builder.js` | Exact builder witness and candidate-universe invariant | Identity must not add a clause or alter membership. |
| Card facts | `data/scryfall/raw/oracle-cards.json`; `data/scryfall/raw/bulk-manifest.json` | Oracle ID, text, identity, Commander legality | Does not prove faction affinity. |
| Guild/college claims | `data/raw-factions/{boros_legion,lorehold,izzet_league,prismari,golgari_swarm,witherbloom,simic_combine,quandrix,orzhov_syndicate,silverquill}/` | Claim IDs, source locators, placement axes, false-positive guards | Raw packets govern their claims; no packet authorizes ranking. |
| Metaphysical framing | `docs/architecture/colors/*/{identity,metaphysics}.md` | Vox Mana internal explanatory framing | Explicitly project metaphysics, not MTG canon or card proof. |
| Placement cross-check | `data/placement-model.json`; raw `*.placement.json` | Consumer-facing discriminator and collision check | Generated/synthesized; never independent evidence. |
| Commander bridge | `docs/reference/commander-faction-guidance.md`; raw `commander_compass` | Interpretive deck/discovery wording | Auxiliary product guidance only; no canon or affinity proof. |
| Player language | `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md` | Reversible, plain-language UX vocabulary | No inference or identity hydration; protected corpus untouched. |
| Semantic ownership | `docs/contracts/maze-semantic-state-contract.md`; `data/maze/maze-semantic-state-v1.schema.json` | Separates explicit preference/context/lens/handoff/query truth | VM-591 is frozen and untouched. |

## Authority resolution

When a statement conflicts, use raw claim/source evidence for faction meaning, local Scryfall for card fact, and the builder for query truth. Treat identity/metaphysics, Placement, factions.json, and Commander guidance as downstream interpretation/cross-checks. `docs/audits/vm551-placement-system/identity-distinctiveness-analysis.md` is a controlling limitation: same-color boundaries are authored discriminators, not an empirical finding that players distinguish them.
