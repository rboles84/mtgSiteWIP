# Vox Mana Data Contracts

## Faction data layers

Vox Mana now uses a raw-plus-generated data flow:

- `data/identity-layers.json` is the canonical identity-layer registry for mono colors, expression routing, shared color language, and the Home identity preview registry.
- `data/identity-layers.schema.json` describes the identity-layer and Home preview registry contract.
- `data/precons/vox-mana-precons.source.json` is the canonical precon source catalog for Archscry dossier recommendations.
- `data/precons/vox-mana-precons.source.schema.json` describes the hand-authored precon source contract.
- `data/taxonomy/vox-mana-precon-themes.json` is the hand-authored precon theme taxonomy used to normalize theme language.
- `data/taxonomy/vox-mana-precon-themes.schema.json` describes the hand-authored precon theme taxonomy shape.
- `data/precons/vox-mana-precon-catalog.json` is the generated runtime precon catalog used by dossier rendering.
- `data/precons/vox-mana-precon-catalog.schema.json` describes the generated precon catalog shape.
- `data/dossier/card-rationale-relationships.source.json` is the canonical reviewed card-to-identity relationship authority for Archscry card rationales. Records retain claim, source, card, limitation, review-state, and owner-approval provenance.
- `data/dossier/card-rationale-catalog.json` is the generated runtime catalog. It contains only source records explicitly marked `APPROVED_PUBLIC`; review-required, evidence-needed, rejected, and missing records never enter runtime.
- `data/raw-factions/` keeps the raw faction folders, claims, placement guidance, and source metadata for provenance.
- `data/factions.json` is the generated display surface used by dossier rendering.
- `data/dossier/identity-dossier-content.source.json` is the approved authored dossier-copy source. `data/dossier/identity-dossier-content.catalog.json` is its runtime projection and must be regenerated with `npm run build:identity-dossier-content`; `npm run test:identity-dossier-content` rejects stale output, copy-hash drift, failed approvals, or WUBRG provenance that points back to generated runtime data.
- `data/placement-model.json` is the generated adaptive placement model used by Archscry.
- `data/placement-model.schema.json` describes the generated placement model shape.
- `supabase/functions/guild-recruiter/faction-context.ts` is the generated server-side Scrying Terminal context.

After changing identity layers, raw faction data, or display data, run `npm run build:factions` from `C:\dev\mtgSiteWIP`.

After changing the precon source catalog or precon theme taxonomy, run `npm run build:precons` from `C:\dev\mtgSiteWIP`.

Source-first faction quality passes must also satisfy the source-bound gold standard and VM-300 source/generated guardrail contract in [Source / Generated Guardrails](source-generated-guardrails.md). Generated/runtime surfaces, including `data/factions.json`, generated placement JSON, generated identity layers, generated Supabase context, generated snippets/flavor output, hardcoded dossier copy, existing Archscry UI output, and existing display affinity copy are comparison targets only; they are not canonical source inputs for display parity, placement, calibration, discriminator, Commander support, or claim-backed profile fields.

VM-335 recorded mono colors as a transitional Layer 1 exception. VM-377 replaces that mono exception with raw-managed W/U/B/R/G source authority through `data/raw-factions/{white,blue,black,red,green}/` and `docs/research/mono_upgrade/`. Registry authorship in `data/identity-layers.json` is still not VM-325 claim evidence by itself.

## Identity preview registry

`data/identity-layers.json` owns the canonical Home preview metadata for the 37-expression v1 Home Identity Signal. `assets/js/home/home.js` fetches this registry, selects entries where `preview_eligible` is `true`, sorts by `preview_order`, and keeps `data/factions.json` as the lore-note source. VM-389 promotes the historical 20-expression preview baseline plus the live shard, wedge, four-color, `COLORLESS`, and `WUBRG` identities into Home preview visibility without adding public routes, lowercase aliases, Maze behavior, directory links, schema/API changes, generated-data hand edits, or placement-model behavior changes.

For mono colors, the same registry owns active membership, routing metadata, and display-generation inputs. Source-backed mono display, placement, Commander support, and discriminator fields must trace to the VM-377 raw packets and promoted mono source-intake bundle, not to generated/runtime output alone.

Every expression entry must include:

- `display_code`
- `aliases`
- `placement_eligible`
- `preview_eligible`

When `preview_eligible` is `true`, the entry must also include:

- `preview_order`
- `preview_label`
- `preview_title`
- `preview_text`
- `preview_hex`
- `preview_scores`

`preview_scores` uses the Home radar axis order:

- `order`
- `knowledge`
- `ambition`
- `freedom`
- `growth`

The identity-layer institution enum is `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, and `colorless`. It does not include `family`; a New Capenna or family-like grouping needs a separate runtime definition before schema inclusion.

Display codes may preserve user-facing color-pair order while canonical keys stay WUBRG-normalized. For example, Selesnya is keyed as `WG` with `display_code: "GW"`, Simic is keyed as `UG` with `display_code: "GU"`, and Boros is keyed as `WR` with `display_code: "RW"`.

Each faction entry contains:

- `key`
- `name`
- `institution_type`
- `world`
- `colors`
- `accent`
- `banner`
- `tagline`
- `philosophy`
- `lore_summary`
- `core_tension`
- `affinity`
- `decree_voice`
- `archetypes`
- `staples`
- `land_base`
- `deck_links`
- `research_links`
- `layered_identity`

The frontend dossier renders from this file.

The edge function imports `supabase/functions/guild-recruiter/faction-context.ts`, which is a condensed artifact generated from the same raw and display content.

## Precon recommendation artifacts

The Archscry precon layer uses its own raw-plus-generated lane:

- `data/precons/vox-mana-precons.source.json` keeps the checked-in authoring source for curated Commander precons.
- `data/taxonomy/vox-mana-precon-themes.json` keeps the normalized Commander theme language used for ranking and presentation.
- `scripts/build/build-precon-artifacts.mjs` validates both source files, normalizes color identity and theme metadata, and emits the runtime artifact.
- `scripts/build/import-precon-mechanics-validation.mjs` is a Node-only staging importer for the completed XLSX mechanics workbook. It updates canonical source JSON only, and the workbook is never browser/runtime input.
- `data/precons/vox-mana-precon-catalog.json` is the browser-loaded runtime surface for dossier precon cards.
- Precon source text is expected to stay UTF-8 clean. The builder now fails on `U+FFFD` replacement characters so corrupted commander names do not silently ship into rendered cards or outbound links.
- VM-139 imported the completed 155-row mechanics validation workbook. All 155 rows were marked safe for placement dossier use; the workbook provenance notes 130 rows where mechanics changed, while the importer reports actual changed/unchanged counts from normalized source comparison.
- Source and generated precon contracts now require `creatureTypeFocus` as `string | null`. Blank, `None`, `N/A`, non-tribal, role-agnostic, and other non-typal workbook values become `null`; runtime search/match terms omit `null` instead of stringifying it.
- The mechanics MVP rule is 3-6 source-supported gameplay tags per deck. `Typal synergy`, `unclear from source`, `none`, and `n/a` are not valid mechanic tags. Typal focus requires a real validated axis; generic `Typal synergy` is not allowed.
- VM-139 did not modify `secondaryCommanders` and did not implement the future `secondCommanderRecommendation` v3 schema.

Each generated precon entry contains:

- `slug`
- `sourceIndex`
- `sourcePage`
- `productSection`
- `deckName`
- `mainCommander`
- `secondaryCommanders`
- `factionRefs`
- `colors`
- `colorIdentityKey`
- `normalizedThemes`
- `scores`
- `recommendationProfile`
- `learningProfile`
- `mechanics`
- `creatureTypeFocus`
- `matchTerms`
- `matchWords`
- `searchTerms`

`factionRefs` uses current Vox Mana expression keys from the active placement atlas. It lets the dossier distinguish faction-native decks such as `SILVERQUILL`, `UG`, or `BANT` from generic same-color alternatives.

The dossier presenter layer decides `nativeExact`, `otherExact`, and `stretch` lanes at runtime from the active dossier view. That grouping result is not stored back into the generated catalog.

## Card-rationale artifacts

`scripts/build/build-card-rationale-artifacts.mjs` validates canonical relationship records against raw faction claim/source packets and the committed Scryfall Commander index, then emits the approved-only runtime catalog and all-37 audit artifacts. Generated faction records, flavor snippets, tag overlap, color identity, and UI selection order cannot create a card relationship.

Newly surfaced or newly written rationale remains `REVIEW_REQUIRED` until an explicit owner decision is recorded in the source record. Runtime ordering is deterministic and limited to three approved records per identity; zero is valid and causes the section to omit safely.

## Archscry governed card-media projection

VM-559 adds a generated projection for every card occurrence already authored into the production Archscry dossier. The projection is a resolver artifact, not card-selection authority:

- dossier/faction sources continue to own identity, surface, tier/segment, position, raw card name, and order;
- committed Scryfall Oracle bulk data owns canonical card facts and image locators;
- `scripts/archscry-media-projection-core.mjs` derives inventory from the same structured renderer inputs and resolves each normalized key to one Oracle identity and one exact bulk-selected printing;
- `scripts/build-scryfall-indexes.mjs` emits `archscry-media-index.json`, `archscry-media-manifest.json`, and the zero-record `archscry-media-unresolved.json` report;
- `scripts/inspect-scryfall-indexes.mjs` and `npm run test:vm559-media-projection` fail stale, malformed, incomplete, unresolved, or selection-drifted artifacts.

The authored inventory checksum contains identity, surface, segment/tier, position, explicit order, raw authored name, and normalized resolver key. It deliberately excludes Scryfall IDs so authored-content preservation and canonical-resolution correctness remain separate proofs. The manifest also pins the projection schema, Scryfall bulk identity and checksum, generated index checksum, occurrence/unique counts, and resolved/unresolved totals.

Ordinary regeneration must preserve each existing Oracle ID, exact Scryfall object, layout/face association, and ordered image candidates. `--accept-selection-drift` requires explicit owner-authorization evidence and is not an agent remediation path. Identical authored data, resolver rules, and Scryfall bulk input must produce byte-identical governed artifacts.

At runtime, governed authored slots use `authored_projection` resolution and may not call `api.scryfall.com`. Explicitly dynamic consumers may use `dynamic_fallback`, which remains paced, deduplicated, retry-bounded, and circuit-breaker protected. `cards.scryfall.io` remains the permitted external image-delivery dependency; VM-559 does not host bitmap copies or guarantee delivery during a Scryfall image-CDN outage.

## Adaptive placement model

`data/placement-model.json` contains:

- `scoring_rules` for equal priors, likelihood-to-log-delta mapping, pruning, softmax confidence, and lateral inhibition.
- `stages` for the Gate, Hall, and Crucible flow.
- `factions` with identity, biological-expression framing, placement axes, good/poor-fit indicators, inhibitor traps, discriminator questions, and lateral inhibition targets.
- `question_bank` with structured Gate, Hall, and Crucible answer cards.

The model treats faction placement as a Vox Mana interpretive taxonomy, not official Wizards canon and not an objective personality diagnosis.

## Placement result

All result-producing paths should converge on this shape:

```json
{
  "version": "2026-05-10",
  "model_version": "vox-mana-adaptive-placement-v1",
  "source_mode": "quick",
  "faction": "WU",
  "faction_name": "Azorius Senate",
  "institution_type": "guild",
  "world": "Ravnica",
  "identity": {
    "core_color": "W",
    "secondary_colors": [
      "U"
    ],
    "secondary_color": "U",
    "expression_key": "WU",
    "expression_name": "Azorius Senate",
    "expression_kind": "guild",
    "purity": null
  },
  "decree": "Personalized decree text.",
  "confidence": 0.78,
  "confidence_gap": 0.08,
  "mana_scores": {
    "W": 8,
    "U": 10,
    "B": 2,
    "R": 1,
    "G": 3
  },
  "top_matches": [
    {
      "rank": 1,
      "faction": "WU",
      "faction_name": "Azorius Senate",
      "institution_type": "guild",
      "world": "Ravnica",
      "identity": {
        "core_color": "W",
        "secondary_colors": [
          "U"
        ],
        "secondary_color": "U",
        "expression_key": "WU",
        "expression_name": "Azorius Senate",
        "expression_kind": "guild",
        "purity": null
      },
      "score": 18.4,
      "confidence": 0.78,
      "reason": "Short explanation."
    }
  ],
  "adjacent_matches": [
    {
      "rank": 2,
      "faction": "SILVERQUILL",
      "faction_name": "Silverquill College",
      "institution_type": "college",
      "world": "Strixhaven",
      "identity": {
        "core_color": "W",
        "secondary_colors": [
          "B"
        ],
        "secondary_color": "B",
        "expression_key": "SILVERQUILL",
        "expression_name": "Silverquill College",
        "expression_kind": "college",
        "purity": null
      },
      "score": 16.8,
      "confidence": 0.7,
      "reason": "Short explanation."
    }
  ],
  "starter_profile": {
    "format_interest": "commander",
    "budget_band": "mid",
    "experience_level": "returning"
  },
  "evidence_trail": [
    {
      "stage": "gate",
      "question_id": "gate_pressure_trust",
      "signal": "procedure as protection"
    }
  ],
  "stage_history": [
    {
      "stage": "gate",
      "question_id": "gate_pressure_trust",
      "answer_title": "A process that binds everyone"
    }
  ]
}
```

Notes:

- `institution_type` uses the identity-layer institution enum: `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, or `colorless`. Current placement outputs use the active 37-identity set: mono colors, guilds, colleges, shards, wedges, four-color identities, controlled placeable `COLORLESS`, and controlled `WUBRG`.
- `identity` is the layered identity block used by dossier rendering, routing, and compatibility recovery.
- `color_weights` is an optional field. Phase 0 does not fabricate or approximate it when the current scoring model cannot derive it accurately.
- `top_matches` and `adjacent_matches` should carry `identity` entries so the presenter layer does not need to infer mono or pair structure from display names alone.

## Commander dossier result summary strip

`assets/js/archscry/dossier/reading.js` builds the DOM-free `resultSummaryStrip` contract. The stable `commander-dossier.js` facade re-exports that contract, and `assets/js/archscry/runtime/dossier-view.js` renders the Archscry placement strip.

The renderer should consume the completed summary object only. It should not perform adjacent selection, signal-band parsing, copy cleanup, or fallback resolution inside the DOM layer.

`resultSummaryStrip` contains:

- `adjacentFit`
  - `label`
  - `heading`
  - `signalBand`
  - `signalLabel`
  - `relationshipCopy`
  - `targetKey`
  - `targetName`
- `whereThisLeads`
  - `label`
  - `heading`
  - `body`
  - `tags`
- `playPattern`
  - `label`
  - `heading`
  - `body`

Contract notes:

- `adjacentFit.targetKey` must never equal the current dossier faction key.
- `signalBand` uses `strong`, `moderate`, `emerging`, and `related`.
- Non-numeric, missing, `NaN`, `null`, `undefined`, or out-of-range adjacent scores are treated as no reliable score and resolve to `related`.
- `whereThisLeads.tags` may be empty; the renderer should hide the tag row instead of filling it with placeholder copy.
- Local summary-strip fallbacks are display-only and are not packet truth, canon, or source authority.

## Profile storage

`docs/supabase-profile-update.sql` is the checked-in Supabase schema/RLS artifact for optional signed-in profile storage.

The Supabase `profiles` row should keep compatibility fields plus the richer result payload:

- `guild`
- `scores`
- `taken_at`
- `display_name`
- `avatar_url`
- `placement_result`

`placement_result` is the source of truth for saved-return behavior. It would be the attachment context for private saved deck links if that deferred feature is reactivated later.

RLS boundary: authenticated users may select, insert/upsert, and update only their own row where `auth.uid() = id`. Anonymous users should not receive profile table grants. Repo presence of the SQL artifact is not live Supabase proof; live project verification is still required before treating saved profiles as production-ready.

## Account deck-link storage

VM-422 adds `docs/supabase-vm422-deck-links.sql` as the checked-in Supabase SQL/policy artifact for external deck-link references. As of VM-458, VM-461, and the VM-470 reaffirmation, this is a dormant/deferred artifact, not active public release scope.

The deck-link contract stores URLs and metadata only:

- `user_deck_links` stores external deck URL, normalized provider, optional title/commander/note, placement metadata, visibility/moderation state, a public-safe display-name snapshot, and an upvote count.
- `community_deck_votes` stores one signed-in-user `upvote` per public deck link.
- `community_deck_ledger_public` is the sanitized public view with `security_invoker = true`.
- `vm422_list_my_deck_links()` is the owner-scoped private account-list RPC. The deferred Archscry saved-link panel was designed to use it instead of selecting `user_deck_links` directly, so a signed-in user's private account list cannot absorb other users' approved public ledger rows or dormant moderation rows.

This contract does not store decklists, card JSON, scraped content, Commander legality results, or hosted deck data.

Display-name boundary: existing session/profile display logic can fall back to an email local part. VM-422 must not use that path for public ledger names. Browser insert/update grants do not include `public_display_name`; it remains the default `Vox Mana player` unless a trusted moderation/account process writes a sanitized public profile name.

Grant boundary: because the public ledger view is `security_invoker = true`, browser roles need narrow underlying `user_deck_links` SELECT grants for the columns used by that public view. Do not broaden those grants to `owner_id`, moderation fields, private timestamps, or other account-only columns; use owner-scoped RPCs for private account surfaces.

Visibility boundary if reactivated: VM-422 v1 remains private-only in product behavior and exposed browser writes. Browser users may create/update owner-owned `private` rows and move their own saved rows to the approved removal state, currently `archived`. Browser users must not directly create `submitted`, `public`, or `rejected` rows; those are future trusted moderation outcomes.

Reactivation boundary: account-backed deck-link saving must stay hidden until the owner explicitly approves reactivation and VM-446 live private deck-link RLS proof passes against the target Supabase project with owner, non-owner, and service-role evidence. Repo SQL, local tests, and dormant UI/service code are not live proof.

Frontend surfaces:

- VM-458 hides the Archscry `Account Deck Links` dossier panel, deck-link form, saved-link list, save button, and active action dispatch from the current public flow. Do not restore those surfaces without owner reactivation approval and VM-446 live RLS proof.
- Dormant VM-422 code in `assets/js/archscry/index.js` and related deck-link modules must continue to use DOM/text APIs if later revived.
- `assets/js/apocrypha/community-deck-ledger.js` is dormant future-ready code. It is not linked or loaded by Apocrypha v1.
- The public Apocrypha route must not expose Community Deck Ledger UI, voting controls, private saved links, or raw Supabase schema/policy/table errors to visitors.
- `npm run test:deck-links:live` runs the optional live Supabase RLS verifier once test-user credentials and a service-role key are available.
## Card-Voice Slot And Publication Contract

`data/dossier/card-voice-relationships.source.json` is the active curated relationship authority. It may contain both `APPROVED_PUBLIC` records and `REVIEW_REQUIRED` proposals. `slot` is identity-local presentation order: accepted VM-551 records remain slot `1` with `pair_role: "ANCHOR"`; a complementary record uses slot `2`, `pair_role: "COMPLEMENT"`, and names its slot-1 relationship through `complements_relationship_id`. Owner-approved slot-2 records use `approval_basis: "OWNER_SEMANTIC_APPROVAL"`, retain the explicit `owner_decision: "APPROVE"` and structural validation, and become public only through the producer.

`data/dossier/card-voice-printings.source.json` remains the exact-printing authority for public approved records. Proposal records carry their exact printing inline during owner review and do not enter this approved printing source until a separate promotion pass is authorized. Promotion is limited to structurally valid slot-2 records with an explicit owner `APPROVE`; unresolved review-required records remain non-public, and `data/dossier/card-voice-catalog.json` contains only `APPROVED_PUBLIC` relationships.

The runtime orders public voices by slot and fails visibly when the public catalog or an approved exact printing cannot resolve. Exact-printing records may provide a direct image or face-level images for a DFC. A missing proposal is not a runtime failure. Colorless intentionally remains a one-slot identity. `Cards That Sound Like This` and `Cards That Play Like This` retain distinct teaching roles; proposal validation rejects cross-surface duplication there. Precon, Card Signal, and other card reuse is detected and reported but is not an automatic semantic rejection.
