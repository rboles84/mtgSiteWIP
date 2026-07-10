# VM-451 - Route Metadata And Social Preview Pass

Status: done

## Summary

Add accurate route descriptions, canonical URLs, Open Graph tags, and Twitter card tags to Vox Mana's public route heads. Keep the copy share-safe: identity compass, reading support, Commander education, source library, privacy/terms clarity. Do not imply deckbuilding, recommendation-engine, legality-checker, public deck platform, or official authority scope.

## Why It Matters

The VM-428/VM-429 audits found that most public route heads only had titles and favicon metadata. Weak previews make the project harder to understand when shared and leave external reviewers without the product-boundary context established on the Home page.

## Scope

- Add route-specific meta descriptions.
- Add canonical URLs for the custom domain.
- Add Open Graph and Twitter card tags.
- Keep `/library/` as a noindex compatibility alias with canonical target `/apocrypha/`.
- Add a deterministic metadata validation script if needed.
- Update QA/docs/handoff trail.

## Likely Files

- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`
- `package.json`
- `scripts/check-route-metadata.mjs`
- `docs/qa/vox-mana-test-plan.md`

## Acceptance Criteria

- [x] Every public route has one meaningful title and meta description.
- [x] Every public route has a canonical URL; `/library/` points to canonical `/apocrypha/`.
- [x] Every public route has Open Graph title, description, URL, type, and image metadata.
- [x] Every public route has Twitter card, title, description, and image metadata.
- [x] Preview copy is product-boundary safe and avoids deckbuilder/recommendation/official-authority claims.
- [x] Metadata validation, HTML lint, copy-boundary check, and frontend smoke pass.

## Validation

- `npm.cmd run test:route-metadata` - passed.
- `node --check scripts\check-route-metadata.mjs` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `Select-String -Path index.html,archscry\index.html,maze\index.html,strategium\index.html,apocrypha\index.html,library\index.html,privacy\index.html,terms\index.html -Pattern "<meta|og:|twitter:|canonical"` - confirmed route head metadata surface.

## Risk If Skipped

Vox Mana remains harder to share and review externally, and route previews can undersell or misframe the project boundaries.
