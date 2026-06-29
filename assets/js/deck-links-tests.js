import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  canVoteOnDeckLink,
  detectDeckLinkProvider,
  normalizeCommunityDeckVoteType,
  normalizeDeckLinkUrl,
  normalizeDeckLinkVisibility,
  resolveCommunityDeckVoteToggle,
  resolveDeckLinkUpdatePolicy,
  validateDeckLinkInput,
} from "./deck-links.js";
import {
  archiveUserDeckLink,
  COMMUNITY_DECK_VOTE_COLUMNS,
  listOwnCommunityDeckVotes,
  listPublicCommunityDeckLinks,
  listUserDeckLinks,
  PUBLIC_DECK_LEDGER_COLUMNS,
  saveUserDeckLink,
  toggleCommunityDeckVote,
  updateUserDeckLink,
  USER_DECK_LINK_COLUMNS,
} from "./deck-link-service.js";

class MockQuery {
  constructor(client, table) {
    this.client = client;
    this.table = table;
    this.call = { table, filters: [] };
  }

  insert(payload) {
    this.call.operation = "insert";
    this.call.payload = payload;
    return this;
  }

  update(payload) {
    this.call.operation = "update";
    this.call.payload = payload;
    return this;
  }

  delete() {
    this.call.operation = "delete";
    return this;
  }

  select(columns) {
    this.call.columns = columns;
    return this;
  }

  eq(column, value) {
    this.call.filters.push({ column, value });
    return this;
  }

  in(column, values) {
    this.call.filters.push({ column, values, operator: "in" });
    return this;
  }

  order(column, options) {
    this.call.order = { column, options };
    return this;
  }

  single() {
    return this.resolve();
  }

  then(resolve, reject) {
    return this.resolve().then(resolve, reject);
  }

  resolve() {
    this.client.calls.push(this.call);
    const key = `${this.table}:${this.call.operation || "select"}`;
    const response = this.client.responses[key] || this.client.responses[this.table] || { data: null, error: null };
    return Promise.resolve(response);
  }
}

function createMockSupabase({ session = { user: { id: "user-1" } }, responses = {} } = {}) {
  return {
    responses,
    calls: [],
    auth: {
      async getSession() {
        return { data: { session } };
      },
    },
    from(table) {
      return new MockQuery(this, table);
    },
    rpc(name, args = {}) {
      const call = { rpc: name, args };
      this.calls.push(call);
      return Promise.resolve(this.responses[`rpc:${name}`] || { data: null, error: null });
    },
  };
}

const providerCases = [
  ["https://mtggoldfish.com/deck/123", "mtggoldfish"],
  ["https://www.archidekt.com/decks/123/example", "archidekt"],
  ["https://moxfield.com/decks/abc", "moxfield"],
  ["https://edhrec.com/commanders/muldrotha-the-gravetide", "edhrec"],
  ["https://mtgdecks.net/Commander/example", "mtgdecks"],
  ["https://aetherhub.com/Deck/example", "aetherhub"],
  ["https://tappedout.net/mtg-decks/example/", "tappedout"],
];

for (const [url, key] of providerCases) {
  assert.equal(detectDeckLinkProvider(url)?.key, key, `${url} should resolve ${key}`);
  assert.equal(normalizeDeckLinkUrl(url).provider, key);
}

const httpUrl = normalizeDeckLinkUrl("http://Moxfield.com/decks/abc");
assert.equal(httpUrl.ok, true);
assert.equal(httpUrl.deck_url, "https://moxfield.com/decks/abc");
assert.equal(httpUrl.provider, "moxfield");

for (const lookalike of [
  "https://moxfield.fake-site.com/decks/abc",
  "https://notmoxfield.com/decks/abc",
  "https://moxfield.com.fake-site.com/decks/abc",
  "https://evil.example/?next=https://moxfield.com/decks/abc",
  "javascript:alert(1)",
  "https://user:pass@moxfield.com/decks/abc",
]) {
  const result = normalizeDeckLinkUrl(lookalike);
  assert.equal(result.ok, false, `${lookalike} should be rejected`);
}

assert.equal(normalizeDeckLinkUrl(`https://moxfield.com/decks/${"a".repeat(2050)}`).ok, false);
assert.equal(validateDeckLinkInput({
  deck_url: "https://moxfield.com/decks/abc",
  deck_title: "a".repeat(121),
}).errors[0].code, "deck_title_too_long");
assert.equal(validateDeckLinkInput({
  deck_url: "https://moxfield.com/decks/abc",
  commander_name: "a".repeat(121),
}).errors[0].code, "commander_name_too_long");
assert.equal(validateDeckLinkInput({
  deck_url: "https://moxfield.com/decks/abc",
  user_note: "a".repeat(501),
}).errors[0].code, "user_note_too_long");

assert.equal(normalizeDeckLinkVisibility("submitted"), "submitted");
assert.equal(normalizeDeckLinkVisibility("PUBLIC"), "public");
assert.equal(normalizeDeckLinkVisibility("unknown"), "private");

const privateSave = validateDeckLinkInput({
  deckUrl: "https://archidekt.com/decks/123",
  deckTitle: "  Atraxa Reading  ",
  commanderName: "Atraxa, Praetors' Voice",
  userNote: "Fits the pressure pattern.",
  visibility: "private",
});
assert.equal(privateSave.ok, true);
assert.deepEqual(
  {
    deck_url: privateSave.value.deck_url,
    provider: privateSave.value.provider,
    deck_title: privateSave.value.deck_title,
    visibility: privateSave.value.visibility,
  },
  {
    deck_url: "https://archidekt.com/decks/123",
    provider: "archidekt",
    deck_title: "Atraxa Reading",
    visibility: "private",
  }
);

const submittedSave = validateDeckLinkInput({
  deck_url: "https://moxfield.com/decks/abc",
  visibility: "submitted",
});
assert.equal(submittedSave.ok, false);
assert.equal(submittedSave.errors[0].code, "visibility_private_only");

const publicSave = validateDeckLinkInput({
  deck_url: "https://moxfield.com/decks/abc",
  visibility: "public",
});
assert.equal(publicSave.ok, false);
assert.equal(publicSave.errors[0].code, "visibility_private_only");

const publicLink = {
  id: "deck-link-1",
  deck_url: "https://moxfield.com/decks/abc",
  provider: "moxfield",
  deck_title: "Original title",
  commander_name: "Commander",
  user_note: "Original note",
  placement_key: "SULTAI",
  placement_name: "Sultai",
  color_identity_key: "BGU",
  visibility: "public",
  approved_at: "2026-06-27T00:00:00.000Z",
  approved_by: "moderator",
};

const resubmittedUpdate = resolveDeckLinkUpdatePolicy(
  publicLink,
  { deck_title: "New title" },
  { now: "2026-06-27T18:42:00.000Z" }
);
assert.equal(resubmittedUpdate.allowed, true);
assert.equal(resubmittedUpdate.moderationRequired, true);
assert.equal(resubmittedUpdate.patch.visibility, "submitted");
assert.equal(resubmittedUpdate.patch.approved_at, null);
assert.deepEqual(resubmittedUpdate.changedPublicFields, ["deck_title"]);

const blockedUpdate = resolveDeckLinkUpdatePolicy(
  publicLink,
  { user_note: "Swapped after approval" },
  { publicEditMode: "block" }
);
assert.equal(blockedUpdate.allowed, false);
assert.equal(blockedUpdate.reason, "public_fields_locked");

const privateUpdate = resolveDeckLinkUpdatePolicy(
  { ...publicLink, visibility: "private" },
  { user_note: "Private note edit" }
);
assert.equal(privateUpdate.allowed, true);
assert.equal(privateUpdate.moderationRequired, false);

assert.equal(canVoteOnDeckLink(publicLink, "user-1").allowed, true);
assert.equal(canVoteOnDeckLink(publicLink, "").reason, "authentication_required");
assert.equal(canVoteOnDeckLink({ ...publicLink, visibility: "submitted" }, "user-1").reason, "deck_link_not_public");
assert.equal(normalizeCommunityDeckVoteType("upvote"), "upvote");
assert.equal(normalizeCommunityDeckVoteType("downvote"), null);

const addVote = resolveCommunityDeckVoteToggle({
  deckLink: publicLink,
  voterId: "user-1",
});
assert.equal(addVote.allowed, true);
assert.equal(addVote.action, "add");
assert.deepEqual(addVote.row, {
  deck_link_id: "deck-link-1",
  voter_id: "user-1",
  vote_type: "upvote",
});

const removeVote = resolveCommunityDeckVoteToggle({
  deckLink: publicLink,
  voterId: "user-1",
  existingVote: { vote_type: "upvote" },
});
assert.equal(removeVote.allowed, true);
assert.equal(removeVote.action, "remove");

const savedDeckResponse = {
  id: "deck-link-1",
  deck_url: "https://moxfield.com/decks/abc",
  provider: "moxfield",
  visibility: "private",
};
const saveClient = createMockSupabase({
  responses: {
    "user_deck_links:insert": { data: savedDeckResponse, error: null },
  },
});
const savedDeck = await saveUserDeckLink({
  client: saveClient,
  input: {
    deck_url: "https://moxfield.com/decks/abc",
    deck_title: "Sultai Fit",
    visibility: "private",
  },
  placementResult: {
    faction: "SULTAI",
    faction_name: "Sultai",
    color_identity: "BGU",
  },
});
assert.equal(savedDeck, savedDeckResponse);
assert.equal(saveClient.calls[0].table, "user_deck_links");
assert.equal(saveClient.calls[0].operation, "insert");
assert.equal(saveClient.calls[0].columns, USER_DECK_LINK_COLUMNS);
assert.deepEqual(saveClient.calls[0].payload, {
  deck_url: "https://moxfield.com/decks/abc",
  deck_title: "Sultai Fit",
  commander_name: null,
  user_note: null,
  placement_key: "SULTAI",
  placement_name: "Sultai",
  color_identity_key: "BGU",
  visibility: "private",
});
assert.equal(Object.hasOwn(saveClient.calls[0].payload, "owner_id"), false);
assert.equal(Object.hasOwn(saveClient.calls[0].payload, "provider"), false);
assert.equal(Object.hasOwn(saveClient.calls[0].payload, "public_display_name"), false);

await assert.rejects(
  () => saveUserDeckLink({
    client: createMockSupabase(),
    input: { deck_url: "https://moxfield.com/decks/abc", visibility: "public" },
    placementResult: {
      faction: "SULTAI",
      faction_name: "Sultai",
      color_identity: "BGU",
    },
  }),
  /private-only/
);
await assert.rejects(
  () => saveUserDeckLink({
    client: createMockSupabase(),
    input: { deck_url: "https://moxfield.com/decks/abc", visibility: "rejected" },
    placementResult: {
      faction: "SULTAI",
      faction_name: "Sultai",
      color_identity: "BGU",
    },
  }),
  /private-only/
);
await assert.rejects(
  () => saveUserDeckLink({
    client: createMockSupabase(),
    input: { deck_url: "https://moxfield.com/decks/abc" },
  }),
  /Complete or restore a reading first/
);

await assert.rejects(
  () => saveUserDeckLink({
    client: createMockSupabase({ session: null }),
    input: { deck_url: "https://moxfield.com/decks/abc" },
  }),
  /Authentication required/
);

const listClient = createMockSupabase({
  responses: {
    "rpc:vm422_list_my_deck_links": {
      data: [
        savedDeckResponse,
        { ...savedDeckResponse, id: "deck-link-archived", visibility: "archived" },
        { ...savedDeckResponse, id: "deck-link-submitted", visibility: "submitted" },
      ],
      error: null,
    },
  },
});
const ownLinks = await listUserDeckLinks({ client: listClient });
assert.equal(ownLinks.length, 1);
assert.equal(ownLinks[0].id, "deck-link-1");
assert.equal(listClient.calls[0].rpc, "vm422_list_my_deck_links");

const updateClient = createMockSupabase({
  responses: {
    "user_deck_links:update": {
      data: { ...publicLink, visibility: "private", deck_title: "New title" },
      error: null,
    },
  },
});
await updateUserDeckLink({
  client: updateClient,
  currentDeckLink: { ...publicLink, visibility: "private" },
  patch: { deck_title: "New title" },
});
assert.equal(updateClient.calls[0].operation, "update");
assert.equal(updateClient.calls[0].payload.deck_title, "New title");
assert.equal(Object.hasOwn(updateClient.calls[0].payload, "visibility"), false);
assert.equal(Object.hasOwn(updateClient.calls[0].payload, "approved_at"), false);
assert.deepEqual(updateClient.calls[0].filters, [{ column: "id", value: "deck-link-1" }]);

await assert.rejects(
  () => updateUserDeckLink({
    client: createMockSupabase(),
    currentDeckLink: publicLink,
    patch: { user_note: "unsafe swap" },
  }),
  /private-only/
);

await assert.rejects(
  () => updateUserDeckLink({
    client: createMockSupabase(),
    currentDeckLink: { ...publicLink, visibility: "private" },
    patch: { visibility: "public" },
  }),
  /private-only/
);
await assert.rejects(
  () => updateUserDeckLink({
    client: createMockSupabase(),
    currentDeckLink: { ...publicLink, visibility: "submitted" },
    patch: { visibility: "rejected" },
  }),
  /private-only/
);

await assert.rejects(
  () => updateUserDeckLink({
    client: createMockSupabase({
      responses: {
        "user_deck_links:update": {
          data: null,
          error: { message: "new row violates row-level security policy" },
        },
      },
    }),
    currentDeckLink: { ...publicLink, visibility: "private" },
    patch: { user_note: "non-owner blocked by RLS" },
  }),
  /row-level security/
);

const archiveClient = createMockSupabase({
  responses: {
    "user_deck_links:update": {
      data: { ...savedDeckResponse, visibility: "archived" },
      error: null,
    },
  },
});
await archiveUserDeckLink({ client: archiveClient, deckLinkId: "deck-link-1" });
assert.deepEqual(archiveClient.calls[0].payload, { visibility: "archived" });

const publicClient = createMockSupabase({
  session: null,
  responses: {
    "community_deck_ledger_public:select": {
      data: [{ deck_link_id: "deck-link-1", user_display_name: "Vox Mana player" }],
      error: null,
    },
  },
});
const publicRows = await listPublicCommunityDeckLinks({ client: publicClient });
assert.equal(publicRows.length, 1);
assert.equal(publicClient.calls[0].table, "community_deck_ledger_public");
assert.equal(publicClient.calls[0].columns, PUBLIC_DECK_LEDGER_COLUMNS);
assert.doesNotMatch(PUBLIC_DECK_LEDGER_COLUMNS, /owner_id|email|moderation_note|approved_by/);

const ownVotesClient = createMockSupabase({
  responses: {
    "community_deck_votes:select": {
      data: [{ deck_link_id: "deck-link-1", vote_type: "upvote" }],
      error: null,
    },
  },
});
const ownVotes = await listOwnCommunityDeckVotes({
  client: ownVotesClient,
  deckLinkIds: ["deck-link-1", "deck-link-1", "", null],
});
assert.equal(ownVotes.length, 1);
assert.equal(ownVotesClient.calls[0].table, "community_deck_votes");
assert.equal(ownVotesClient.calls[0].columns, COMMUNITY_DECK_VOTE_COLUMNS);
assert.deepEqual(ownVotesClient.calls[0].filters, [
  { column: "deck_link_id", values: ["deck-link-1"], operator: "in" },
]);

const emptyVotesClient = createMockSupabase();
const emptyVotes = await listOwnCommunityDeckVotes({ client: emptyVotesClient, deckLinkIds: [] });
assert.deepEqual(emptyVotes, []);
assert.equal(emptyVotesClient.calls.length, 0);

const voteClient = createMockSupabase({
  responses: {
    "community_deck_votes:insert": {
      data: { deck_link_id: "deck-link-1", vote_type: "upvote" },
      error: null,
    },
  },
});
const voteResult = await toggleCommunityDeckVote({ client: voteClient, deckLink: publicLink });
assert.equal(voteResult.action, "add");
assert.deepEqual(voteClient.calls[0].payload, { deck_link_id: "deck-link-1" });
assert.equal(Object.hasOwn(voteClient.calls[0].payload, "voter_id"), false);

const unvoteClient = createMockSupabase({
  responses: {
    "community_deck_votes:delete": { data: null, error: null },
  },
});
const unvoteResult = await toggleCommunityDeckVote({
  client: unvoteClient,
  deckLink: publicLink,
  existingVote: { vote_type: "upvote" },
});
assert.equal(unvoteResult.action, "remove");
assert.equal(unvoteClient.calls[0].operation, "delete");
assert.deepEqual(unvoteClient.calls[0].filters, [
  { column: "deck_link_id", value: "deck-link-1" },
  { column: "voter_id", value: "user-1" },
]);

await assert.rejects(
  () => toggleCommunityDeckVote({
    client: createMockSupabase(),
    deckLink: { ...publicLink, visibility: "submitted" },
  }),
  /deck_link_not_public/
);

const sql = await readFile(new URL("../../docs/supabase-vm422-deck-links.sql", import.meta.url), "utf8");
assert.match(sql, /alter table public\.user_deck_links enable row level security/i);
assert.match(sql, /alter table public\.community_deck_votes enable row level security/i);
assert.match(sql, /security_invoker\s*=\s*true/i);
assert.doesNotMatch(sql, /for all/i);
assert.match(sql, /unique\s*\(\s*deck_link_id\s*,\s*voter_id\s*\)/i);
assert.match(sql, /char_length\(deck_url\)\s*<=\s*2048/i);
assert.match(sql, /char_length\(deck_title\)\s*<=\s*120/i);
assert.match(sql, /char_length\(commander_name\)\s*<=\s*120/i);
assert.match(sql, /char_length\(user_note\)\s*<=\s*500/i);
assert.match(sql, /vm422_guard_deck_link_owner_update/i);
assert.match(sql, /vm422_guard_vote_public_link/i);
assert.match(sql, /vm422_list_my_deck_links/i);
assert.match(sql, /Browser deck-link saves are private-only in v1/i);
assert.match(sql, /Browser users can only keep private or remove saved deck links/i);
assert.match(sql, /visibility in \('private', 'archived'\)/i);
assert.match(sql, /visibility = 'private'/i);
assert.match(sql, /where deck_links\.owner_id = auth\.uid\(\)\s+and deck_links\.visibility = 'private'/i);
assert.match(sql, /user_deck_links_owner_url_placement_active_unique_idx/i);
assert.doesNotMatch(sql, /visibility in \('private', 'submitted', 'rejected', 'archived'\)/i);
assert.match(sql, /upvote_count/i);
assert.doesNotMatch(sql, /new\.upvote_count\s*:=\s*old\.upvote_count/i);
assert.match(sql, /public_display_name/i);
const deckLinkSelectGrant =
  sql.match(/grant select\s*\(([\s\S]*?)\)\s*on public\.user_deck_links to anon, authenticated;/i)?.[1] || "";
for (const privateColumn of [
  "owner_id",
  "created_at",
  "updated_at",
  "submitted_at",
  "rejected_at",
  "approved_by",
  "moderation_note",
]) {
  assert.doesNotMatch(deckLinkSelectGrant, new RegExp(`\\b${privateColumn}\\b`, "i"));
}
const deckLinkInsertGrant =
  sql.match(/grant insert\s*\(([\s\S]*?)\)\s*on public\.user_deck_links to authenticated;/i)?.[1] || "";
const deckLinkUpdateGrant =
  sql.match(/grant update\s*\(([\s\S]*?)\)\s*on public\.user_deck_links to authenticated;/i)?.[1] || "";
assert.doesNotMatch(deckLinkInsertGrant, /public_display_name/i);
assert.doesNotMatch(deckLinkUpdateGrant, /public_display_name/i);
for (const domain of [
  "mtggoldfish.com",
  "archidekt.com",
  "moxfield.com",
  "edhrec.com",
  "mtgdecks.net",
  "aetherhub.com",
  "tappedout.net",
]) {
  assert.match(sql, new RegExp(domain.replace(".", "\\."), "i"));
}

const archscrySource = await readFile(new URL("./index.js", import.meta.url), "utf8");
assert.match(archscrySource, /saveUserDeckLink/);
assert.match(archscrySource, /archiveUserDeckLink/);
assert.match(archscrySource, /buildAccountDeckLinkPanelHtml/);
assert.match(archscrySource, /Decks Saved For This Reading/);
assert.match(archscrySource, /\{ id: "decks-saved", label: "Decks Saved" \}/);
assert.match(archscrySource, /buildActionAttrs\("save-deck-link"\)/);
assert.doesNotMatch(archscrySource, /Community Deck Ledger/);
assert.doesNotMatch(archscrySource, /Submit for review/);
const accountRenderStart = archscrySource.indexOf("function renderAccountDeckLinks");
const accountRenderEnd = archscrySource.indexOf("async function refreshAccountDeckLinks");
assert.notEqual(accountRenderStart, -1);
assert.notEqual(accountRenderEnd, -1);
const accountRenderSource = archscrySource.slice(accountRenderStart, accountRenderEnd);
assert.match(accountRenderSource, /textContent\s*=\s*row\.user_note/);
assert.match(accountRenderSource, /textContent\s*=\s*row\.deck_title/);
assert.doesNotMatch(accountRenderSource, /innerHTML/);

const apocryphaHtml = await readFile(new URL("../../apocrypha/index.html", import.meta.url), "utf8");
assert.doesNotMatch(apocryphaHtml, /id="community-deck-ledger"/);
assert.doesNotMatch(apocryphaHtml, /Community Deck Ledger entries are player-submitted links to decks hosted elsewhere/);
assert.doesNotMatch(apocryphaHtml, /data-community-deck-ledger/);
assert.doesNotMatch(apocryphaHtml, /assets\/js\/community-deck-ledger\.js/);

const communityLedgerSource = await readFile(new URL("./community-deck-ledger.js", import.meta.url), "utf8");
assert.match(communityLedgerSource, /listPublicCommunityDeckLinks/);
assert.match(communityLedgerSource, /toggleCommunityDeckVote/);
assert.match(communityLedgerSource, /textContent\s*=\s*row\.user_note/);
assert.match(communityLedgerSource, /appendMeta\(meta, row\.user_display_name\)/);
assert.doesNotMatch(communityLedgerSource, /innerHTML/);

console.log("deck link contract tests passed");
