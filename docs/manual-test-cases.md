# Manual Test Cases

## Setup

1. Deploy the updated static files.
2. Deploy the updated `guild-recruiter` edge function.
3. Run the SQL in `docs/supabase-profile-update.sql`.
4. Confirm `data/factions.json` is present at the site root under `/data/factions.json`.
5. Confirm `data/placement-model.json` is present at the site root under `/data/placement-model.json`.

## Happy path - quick reading

1. Open the site in a fresh browser session.
2. Confirm the landing page appears without any login prompt.
3. Change format, budget, and experience chips on the landing page.
4. Start the quick reading.
5. Complete the adaptive Gate -> Hall -> Crucible reading.
6. Confirm the result page renders:
   - primary guild or college
   - decree text
   - mana bars
   - archetypes
   - staple cards
   - land base
   - starter planning section
   - deck-start links
7. Confirm two adjacent fits are shown.
8. Confirm the result page includes an evidence trail when the adaptive quick path produced one.

## Adaptive placement sanity

1. Run `node assets/js/quick-reading-tests.js`.
2. Confirm all 15 golden paths pass.
3. Run `node assets/js/quick-reading-bias.js --all`.
4. Confirm no faction is listed under `Never selected`.
5. Run `node assets/js/quick-reading-bias.js --runs=100`.
6. Confirm no faction is listed under `Never selected` and no single faction dominates the report.

## Happy path - deep interview

1. Return to the landing page.
2. Start the Scrying Terminal path.
3. Confirm the terminal opens with the recruiter prompt.
4. Provide 3-5 answers.
5. Confirm the terminal reaches a decision.
6. Confirm `Open Full Dossier` shows the same style of result page used by the quick path.

## Save with Google

1. From a quick or interview result, click the save action.
2. If not already signed in, confirm Google OAuth begins.
3. Finish the Google login flow.
4. Confirm the site returns to the exact same saved result.
5. Confirm the topbar shows the signed-in name.
6. Confirm the result no longer asks you to recover a lost reading.

## Returning user

1. Close the browser tab after saving a result.
2. Reopen the site while still signed in.
3. Confirm the saved result appears first instead of the landing page.
4. Confirm the adjacent fits are still present.
5. Switch into each adjacent fit and confirm the dossier updates cleanly.

## Retake flow

1. While signed in with a saved result, click `Begin Again`.
2. Confirm the app returns to the landing page.
3. Confirm the old saved result is no longer shown automatically.
4. Run a new quick reading and save it.
5. Confirm the new result replaces the old one on the next visit.

## Sign-out flow

1. Sign out from the topbar while a saved result exists.
2. Confirm the site returns to the landing page.
3. Refresh the page.
4. Confirm no signed-in state remains visible.

## Legacy fallback

1. Use a profile row that has `guild` and `scores` but no `placement_result`.
2. Open the site while signed in as that user.
3. Confirm the site still renders a result page.
4. Confirm the result page clearly nudges the user to retake for the richer experience.

## Failure handling

### Missing faction data
1. Break or remove `data/factions.json`.
2. Open the site.
3. Confirm the page fails with a clear data-loading message.

### Missing placement model
1. Break or remove `data/placement-model.json`.
2. Open the site.
3. Confirm the page fails with a clear placement-data message.

### Failed save
1. Break the Supabase profile schema by omitting the new columns.
2. Attempt to save a result.
3. Confirm the user receives a clear message pointing to the schema update.

### Failed interview response
1. Break the edge function or Anthropic configuration.
2. Start the Scrying Terminal.
3. Confirm the terminal shows a graceful error and does not crash the page.

### Rate limiting
1. Rapidly submit interview requests until the limit is hit.
2. Confirm the endpoint returns a throttling message instead of continuing indefinitely.

## Mobile sanity pass

1. Open the site on a narrow viewport.
2. Complete the quick reading.
3. Confirm answer cards, result sections, and adjacent-fit cards remain readable.
4. Repeat the Google save flow.
5. Confirm the return-to-saved-result path still works on mobile.
