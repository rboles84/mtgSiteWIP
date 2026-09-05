import {
  canVoteOnDeckLink,
  DECK_LINK_BROWSER_VISIBILITIES,
  resolveCommunityDeckVoteToggle,
  normalizeDeckLinkVisibility,
  validateDeckLinkInput,
} from "./deck-links.js?v=vm547r5";

export const USER_DECK_LINK_COLUMNS = [
  "id",
  "deck_url",
  "provider",
  "deck_title",
  "commander_name",
  "user_note",
  "placement_key",
  "placement_name",
  "color_identity_key",
  "visibility",
  "upvote_count",
].join(", ");

export const PUBLIC_DECK_LEDGER_COLUMNS = [
  "deck_link_id",
  "provider",
  "deck_url",
  "deck_title",
  "commander_name",
  "user_display_name",
  "placement_key",
  "placement_name",
  "color_identity_key",
  "user_note",
  "public_at",
  "upvote_count",
].join(", ");

export const COMMUNITY_DECK_VOTE_COLUMNS = [
  "deck_link_id",
  "vote_type",
  "created_at",
].join(", ");

function resolveSupabaseClient(client) {
  if (client) {
    return client;
  }

  const factory = globalThis.getSupabase;
  return typeof factory === "function" ? factory() : null;
}

async function requireAuthenticatedSession(client) {
  const {
    data: { session },
  } = await client.auth.getSession();

  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  return session;
}

function throwSupabaseError(error, fallbackMessage) {
  if (error) {
    throw new Error(error.message || fallbackMessage);
  }
}

function assertBrowserVisibility(visibility) {
  const normalized = normalizeDeckLinkVisibility(visibility, "");
  if (!DECK_LINK_BROWSER_VISIBILITIES.includes(normalized)) {
    throw new Error("Browser deck-link writes are private-only in v1.");
  }
}

export function placementMetadataFromResult(result = {}) {
  const identity = result.identity || {};
  const colors = identity.colors || identity.color_identity || result.color_identity || null;
  const colorIdentityKey = Array.isArray(colors) ? colors.join("") : colors;

  return {
    placement_key: result.faction || identity.expression_key || null,
    placement_name: result.faction_name || identity.expression_name || null,
    color_identity_key: colorIdentityKey || null,
  };
}

function buildDeckLinkPayload(input = {}, placementResult = null) {
  const placementMetadata = placementMetadataFromResult(placementResult || input.placementResult || {});
  if (!placementMetadata.placement_key) {
    throw new Error("Complete or restore a reading first.");
  }
  const requestedVisibility = normalizeDeckLinkVisibility(input.visibility, "private");
  if (requestedVisibility !== "private") {
    throw new Error("Deck-link saves are private-only in v1.");
  }

  const validation = validateDeckLinkInput({
    ...input,
    ...placementMetadata,
    visibility: "private",
  });

  if (!validation.ok) {
    const [firstError] = validation.errors;
    throw new Error(firstError?.message || "Deck link is not valid.");
  }

  const value = validation.value;
  assertBrowserVisibility(value.visibility);
  return {
    deck_url: value.deck_url,
    deck_title: value.deck_title,
    commander_name: value.commander_name,
    user_note: value.user_note,
    placement_key: value.placement_key,
    placement_name: value.placement_name,
    color_identity_key: value.color_identity_key,
    visibility: value.visibility,
  };
}

export async function saveUserDeckLink({
  client = null,
  input = {},
  placementResult = null,
} = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  await requireAuthenticatedSession(sb);
  const payload = buildDeckLinkPayload(input, placementResult);

  const { data, error } = await sb
    .from("user_deck_links")
    .insert(payload)
    .select(USER_DECK_LINK_COLUMNS)
    .single();

  throwSupabaseError(error, "Could not save deck link.");
  return data;
}

export async function listUserDeckLinks({ client = null } = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  await requireAuthenticatedSession(sb);

  const { data, error } = await sb.rpc("vm422_list_my_deck_links");

  throwSupabaseError(error, "Could not load deck links.");
  return (data || []).filter((row) => normalizeDeckLinkVisibility(row?.visibility, "private") === "private");
}

export async function updateUserDeckLink({
  client = null,
  currentDeckLink = {},
  patch = {},
} = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  await requireAuthenticatedSession(sb);

  if (Object.hasOwn(patch, "visibility")) {
    const requestedVisibility = normalizeDeckLinkVisibility(patch.visibility, "");
    assertBrowserVisibility(requestedVisibility);
  }

  const mergedInput = {
    ...currentDeckLink,
    ...patch,
  };
  const validation = validateDeckLinkInput(
    {
      ...mergedInput,
      placement_key: mergedInput.placement_key,
      placement_name: mergedInput.placement_name,
      color_identity_key: mergedInput.color_identity_key,
    },
  );

  if (!validation.ok) {
    const [firstError] = validation.errors;
    throw new Error(firstError?.message || "Deck link is not valid.");
  }

  const nextPayload = {
    deck_url: validation.value.deck_url,
    deck_title: validation.value.deck_title,
    commander_name: validation.value.commander_name,
    user_note: validation.value.user_note,
    placement_key: validation.value.placement_key,
    placement_name: validation.value.placement_name,
    color_identity_key: validation.value.color_identity_key,
    visibility: validation.value.visibility,
  };

  const requestedPatch = {};
  for (const [field, value] of Object.entries(nextPayload)) {
    if (Object.hasOwn(patch, field)) {
      requestedPatch[field] = value;
    }
  }

  const nextVisibility = normalizeDeckLinkVisibility(validation.value.visibility, "");
  assertBrowserVisibility(nextVisibility);

  if (nextVisibility === "archived") {
    requestedPatch.visibility = "archived";
  } else if (nextVisibility !== "private") {
    throw new Error("Browser deck-link writes are private-only in v1.");
  }

  const { data, error } = await sb
    .from("user_deck_links")
    .update(requestedPatch)
    .eq("id", currentDeckLink.id)
    .select(USER_DECK_LINK_COLUMNS)
    .single();

  throwSupabaseError(error, "Could not update deck link.");
  return data;
}

export async function archiveUserDeckLink({
  client = null,
  deckLinkId = "",
} = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  await requireAuthenticatedSession(sb);

  const { data, error } = await sb
    .from("user_deck_links")
    .update({ visibility: "archived" })
    .eq("id", deckLinkId)
    .select(USER_DECK_LINK_COLUMNS)
    .single();

  throwSupabaseError(error, "Could not remove deck link.");
  return data;
}

export async function listPublicCommunityDeckLinks({ client = null } = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  const { data, error } = await sb
    .from("community_deck_ledger_public")
    .select(PUBLIC_DECK_LEDGER_COLUMNS)
    .order("public_at", { ascending: false });

  throwSupabaseError(error, "Could not load Community Deck Ledger.");
  return data || [];
}

export async function listOwnCommunityDeckVotes({
  client = null,
  deckLinkIds = [],
} = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  await requireAuthenticatedSession(sb);

  const ids = [...new Set((deckLinkIds || []).map((id) => String(id || "").trim()).filter(Boolean))];
  if (!ids.length) {
    return [];
  }

  const { data, error } = await sb
    .from("community_deck_votes")
    .select(COMMUNITY_DECK_VOTE_COLUMNS)
    .in("deck_link_id", ids);

  throwSupabaseError(error, "Could not load deck-link votes.");
  return data || [];
}

export async function toggleCommunityDeckVote({
  client = null,
  deckLink = {},
  existingVote = null,
  voteType = "upvote",
} = {}) {
  const sb = resolveSupabaseClient(client);
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  const session = await requireAuthenticatedSession(sb);
  const votePolicy = canVoteOnDeckLink(deckLink, session.user.id);
  if (!votePolicy.allowed) {
    throw new Error(votePolicy.reason || "Cannot vote on this deck link.");
  }

  const voteToggle = resolveCommunityDeckVoteToggle({
    deckLink,
    voterId: session.user.id,
    existingVote,
    voteType,
  });

  if (!voteToggle.allowed) {
    throw new Error(voteToggle.reason || "Cannot vote on this deck link.");
  }

  if (voteToggle.action === "remove") {
    const { error } = await sb
      .from("community_deck_votes")
      .delete()
      .eq("deck_link_id", voteToggle.deck_link_id)
      .eq("voter_id", voteToggle.voter_id);

    throwSupabaseError(error, "Could not remove vote.");
    return { action: "remove" };
  }

  const { data, error } = await sb
    .from("community_deck_votes")
    .insert({ deck_link_id: voteToggle.row.deck_link_id })
    .select("deck_link_id, vote_type, created_at")
    .single();

  throwSupabaseError(error, "Could not save vote.");
  return { action: "add", vote: data };
}
