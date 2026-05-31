# Naya Evidence Ledger

Status: VM-181 evidence ledger. Naya remains non-live and review-gated.

## Evidence Rows

| Evidence ID | Class | Claim Or Boundary | Source Basis | Use |
|---|---|---|---|---|
| NAYA-EVID-001 | Promoted | Naya is the red-green-white Alara shard in the approved Naya design source. | NAY-SRC-001 | Safe identity floor. |
| NAYA-EVID-002 | Promoted | The local Vox Mana color direction for Naya is `RGW` with Green as center. | NAY-SRC-001, NAY-SRC-002 | Metadata/query construction only; not a public key or alias. |
| NAYA-EVID-003 | Promoted | Green is the central color lens for Naya's design identity. | NAY-SRC-001 | Safe metaphysics floor for later review. |
| NAYA-EVID-004 | Promoted | Naya frames life as part of a larger natural whole: ecosystem, role, place, and belonging are safe design-level readings. | NAY-SRC-001 | Design-level only. Do not infer named social structures. |
| NAYA-EVID-005 | Promoted | Naya's official design frame puts nature and growth at center stage, with growth pushed to an extreme. | NAY-SRC-001 | Safe design-level identity. |
| NAYA-EVID-006 | Promoted | White supports Naya through larger-picture duty, life, creatures, and greater-good language. | NAY-SRC-001 | Support color frame; not proof of institutions or law. |
| NAYA-EVID-007 | Promoted | Red supports Naya through feral instinct, immediacy, loyalty, and bond language. | NAY-SRC-001 | Support color frame; not proof of named clans or hierarchy. |
| NAYA-EVID-008 | Promoted | Naya's internal balance is Green abundance moderated by enough Red to avoid over-order and enough White to avoid pure chaos. | NAY-SRC-001 | Safe high-level synthesis of the official design frame. |
| NAYA-EVID-009 | Promoted | Naya's absence of Blue and Black can be read as absence of controlling technology/intellectual mastery and self-interested ecological extraction. | NAY-SRC-001 | Absence-of-color boundary only. |
| NAYA-EVID-010 | Promoted | The canon/reference audit identifies the Naya Rosewater article as the current primary Naya reference and warns that source paths require claim-level handling. | NAY-SRC-002 | Source-selection proof, not lore proof. |
| NAYA-EVID-011 | Guardrail | Naya must not be flattened into generic big creatures, generic tokens, generic RGW, casual battlecruiser, Cabaretti, Selesnya-with-red, Gruul-with-white, Bant-with-red, or Jund-style consumption. | NAYA-EVID-001 through NAYA-EVID-009; NAY-SRC-008 | Distinction rule for later docs. |
| NAYA-EVID-012 | Guardrail | Existing seed files cannot be used as evidence for their own claims and cannot launder VM-161/canonical labels into approved status. | NAY-SEED-001, NAY-SEED-002 | Source hygiene rule. |
| NAYA-EVID-013 | Guardrail | `RGW`, `GRW`, and `WRG` may appear only as color-direction metadata, query construction values, or validation terms. They must not become expression keys, aliases, placement keys, public labels, route slugs, routes, or generated labels. | VM-181 plan, NAY-SRC-002 | Runtime and docs boundary. |
| NAYA-EVID-014 | Support-only | Alara protocol and metaphysical-codex files may help future review, but VM-181 does not promote detailed Naya geography, named locations, society, religion, or creature cultures from them. | NAY-SRC-003, NAY-SRC-004 | Manual fill unless later audited. |
| NAYA-EVID-015 | Support-only | Scryfall raw oracle data may validate exact card facts, mechanics, rules text, color identity, and names. | NAY-SRC-005 | Card facts only. |
| NAYA-EVID-016 | Support-only | The exact RGW Commander/operator extraction returns 10 rows across equipment, power, lands, Auras, face-down play, populate, counters, landfall, dinosaurs, Backup, goad, and tokens. | NAY-SRC-006, NAY-CMD-001 through NAY-CMD-010 | Operator language only. |
| NAYA-EVID-017 | Support-only | Commander rows can suggest search/operator phrasing for Naya-adjacent play patterns, but they do not prove Alara canon, Naya origin, or legality without later validation. | NAY-SRC-006 | Support-only. |
| NAYA-EVID-018 | Support-only | Official mono-color and two-color philosophy captures can support overlap/separator language for Green, White, Red, Selesnya, Gruul, and Boros. | NAY-SRC-007 | Color support only. |
| NAYA-EVID-019 | Support-only | Bant, Esper, Grixis, and Jund documents can be used as parity/comparator references. | NAY-SRC-008 | Comparator only; no doctrine import. |
| NAYA-EVID-020 | Support-only | The seed dossier and seed packet are useful as claim queues and reliability warnings, not as evidence. | NAY-SEED-001, NAY-SEED-002 | Discovery only. |
| NAYA-EVID-021 | Vox Mana synthesis | Vox Mana may later phrase Naya as Green-centered abundance where awe, scale, communal protection, and instinctive action are fused into a living-world identity. | NAYA-EVID-003 through NAYA-EVID-009 | Label as Vox Mana synthesis; not MTG canon. |
| NAYA-EVID-022 | Guardrail | VM-181 leaves Naya non-live: no architecture docs, raw-faction JSON, runtime keys, generated artifacts, schemas, Maze changes, route changes, Home preview changes, placement model changes, or Supabase changes. | VM-181 scope | Stop gate. |
| NAYA-EVID-023 | Guardrail | Jund is not a completed/live/gold-standard precedent for Naya runtime work. Current repo truth only supports using Jund as a source-packet/docs-track sibling and comparator. | Current handoff and board truth; NAY-SRC-008 | Prevents sequencing drift. |
| NAYA-EVID-024 | Manual fill required | Detailed social structure, religion, named-location politics, creature-culture hierarchy, Progenitus theology, Gahiji origin, Cylian/Nacatl polity claims, and post-Phyrexian Naya outcomes require direct official evidence before use. | NAY-SEED-001, NAY-SEED-002; missing approved direct rows | Do not promote in VM-181. |

## Manual-Fill Rows

| Manual ID | Topic | Why It Is Thin | Required Before Use |
|---|---|---|---|
| NAYA-MF-001 | Detailed Naya geography, named locations, settlements, and shard-era travel. | Not promoted from a direct official local row in VM-181. | Direct official source capture and evidence row. |
| NAYA-MF-002 | Mayael, Anima, Cylian elves, Nacatl, Jazal, Marisi, Progenitus, and Gahiji biography or authority claims. | Seed files contain claims that were not independently rebound in VM-181. | Card/source fact validation plus official story/source context. |
| NAYA-MF-003 | Progenitus theology, worldsoul language, Coil worship, or Naya religion. | The seed packet overstates these without an approved VM-181 direct row. | Official source rows and clear support/promotion split. |
| NAYA-MF-004 | Power 5, enormous creatures, and "big matters" as total Naya metaphysics. | Official design supports growth and nature, not every gameplay shorthand. | Card/mechanics evidence and architecture review. |
| NAYA-MF-005 | Conflux, post-Conflux, and post-Phyrexian Naya outcomes. | Not established by VM-181 approved source rows. | Direct chronology source audit. |
| NAYA-MF-006 | Modern Commander products as Naya-world canon. | JSONL is operator support only. | Separate canon/card validation if needed. |
