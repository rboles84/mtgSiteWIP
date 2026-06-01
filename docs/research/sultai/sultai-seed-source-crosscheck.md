# Sultai Seed Source Crosscheck

Status: VM-209 seed crosscheck. Sultai remains docs-only, non-live, and review-gated.

## Path Guards

| Path | VM-209 Result | Meaning |
|---|---|---|
| `docs/research/sultai brood/` | Exists | Unmanaged seed source. Read-only for VM-209. |
| `docs/research/sultai/` | Created | Approved normalized VM-209 research packet root. |
| `docs/architecture/colors/sultai/` | Not created | VM-210 scope, not VM-209. |
| `data/raw-factions/sultai/` | Not created | VM-212 scope, not VM-209. |

## Copy Record

| Original Path | Copied Path | Source SHA-256 | Copy SHA-256 | Result |
|---|---|---|---|---|
| `docs/research/sultai brood/sultai-brood-deep-research-report.md` | `docs/research/sultai/source-material/sultai-brood-deep-research-report.md` | `686FF85652C192B073C513284017ADA4F20F5036EA7E20AF793B3FB6483A78AB` | `686FF85652C192B073C513284017ADA4F20F5036EA7E20AF793B3FB6483A78AB` | Byte-identical. |
| `docs/research/sultai brood/sultai-brood-lore-source-packet.md` | `docs/research/sultai/source-material/sultai-brood-lore-source-packet.md` | `B3DA5A11D40E27CF647C4F2550983264A30E52E8D55EE550811AC925242728AB` | `B3DA5A11D40E27CF647C4F2550983264A30E52E8D55EE550811AC925242728AB` | Byte-identical. |

## Discovery-Only Decision

The copied seed files are useful as a claim queue, but they are not approved evidence. VM-209 did not promote a seed-only claim into `sultai-evidence-ledger.md`.

All promoted claims in this packet cite local approved sources from:

- The MaRo Sultai three-color article.
- Local Tarkir source-material captures.
- The canon inventory for source selection only.
- Commander JSONL rows as support-only.

## Future Use

Future cards may inspect the copied seed files for candidate topics. They must still bind any claim to `SULTAI-EVID-###`, `SULTAI-CMD-###`, `SULTAI-MF-###`, or explicitly labeled Vox Mana synthesis.
