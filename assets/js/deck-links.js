const DECK_LINK_PROVIDER_DEFINITIONS = [
  {
    key: "mtggoldfish",
    label: "MTGGoldfish",
    hosts: ["mtggoldfish.com", "www.mtggoldfish.com"],
  },
  {
    key: "archidekt",
    label: "Archidekt",
    hosts: ["archidekt.com", "www.archidekt.com"],
  },
  {
    key: "moxfield",
    label: "Moxfield",
    hosts: ["moxfield.com", "www.moxfield.com"],
  },
  {
    key: "edhrec",
    label: "EDHREC",
    hosts: ["edhrec.com", "www.edhrec.com"],
  },
  {
    key: "mtgdecks",
    label: "MTGDecks",
    hosts: ["mtgdecks.net", "www.mtgdecks.net"],
  },
  {
    key: "aetherhub",
    label: "Aetherhub",
    hosts: ["aetherhub.com", "www.aetherhub.com"],
  },
  {
    key: "tappedout",
    label: "TappedOut",
    hosts: ["tappedout.net", "www.tappedout.net"],
  },
];

const PROVIDER_BY_HOST = new Map();

for (const provider of DECK_LINK_PROVIDER_DEFINITIONS) {
  for (const host of provider.hosts) {
    PROVIDER_BY_HOST.set(host, provider);
  }
}

export const DECK_LINK_LIMITS = Object.freeze({
  url: 2048,
  deckTitle: 120,
  commanderName: 120,
  userNote: 500,
});

export const DECK_LINK_PROVIDERS = Object.freeze(
  DECK_LINK_PROVIDER_DEFINITIONS.map((provider) =>
    Object.freeze({
      key: provider.key,
      label: provider.label,
      hosts: Object.freeze([...provider.hosts]),
    })
  )
);

export const DECK_LINK_VISIBILITIES = Object.freeze([
  "private",
  "submitted",
  "public",
  "rejected",
  "archived",
]);

export const DECK_LINK_BROWSER_VISIBILITIES = Object.freeze([
  "private",
  "archived",
]);

export const DECK_LINK_PUBLIC_FIELDS = Object.freeze([
  "deck_url",
  "provider",
  "deck_title",
  "commander_name",
  "user_note",
  "placement_key",
  "placement_name",
  "color_identity_key",
]);

export const COMMUNITY_DECK_VOTE_TYPES = Object.freeze(["upvote"]);

function failure(code, message, field = "deck_url") {
  return { ok: false, code, field, message };
}

function trimOptionalText(value, limit, field) {
  if (value === null || value === undefined) {
    return { ok: true, value: null };
  }

  const text = String(value).trim();
  if (!text) {
    return { ok: true, value: null };
  }

  if (text.length > limit) {
    return failure(
      `${field}_too_long`,
      `${field} must be ${limit} characters or fewer.`,
      field
    );
  }

  return { ok: true, value: text };
}

function parseAllowedDeckUrl(rawUrl) {
  const input = String(rawUrl || "").trim();
  if (!input) {
    return failure("deck_url_required", "Deck URL is required.");
  }

  if (input.length > DECK_LINK_LIMITS.url) {
    return failure(
      "deck_url_too_long",
      `Deck URL must be ${DECK_LINK_LIMITS.url} characters or fewer.`
    );
  }

  let url;
  try {
    url = new URL(input);
  } catch (_) {
    return failure("deck_url_invalid", "Deck URL must be a valid URL.");
  }

  if (!["https:", "http:"].includes(url.protocol)) {
    return failure("deck_url_protocol", "Deck URL must use http or https.");
  }

  if (url.username || url.password) {
    return failure("deck_url_credentials", "Deck URL must not include credentials.");
  }

  const host = url.hostname.toLowerCase();
  const provider = PROVIDER_BY_HOST.get(host);
  if (!provider) {
    return failure(
      "deck_url_provider_not_allowed",
      "Deck URL host is not an allowed deck provider."
    );
  }

  url.protocol = "https:";
  url.hostname = host;

  const normalizedUrl = url.href;
  if (normalizedUrl.length > DECK_LINK_LIMITS.url) {
    return failure(
      "deck_url_too_long",
      `Normalized deck URL must be ${DECK_LINK_LIMITS.url} characters or fewer.`
    );
  }

  return {
    ok: true,
    url: normalizedUrl,
    hostname: host,
    provider: provider.key,
    providerLabel: provider.label,
  };
}

export function detectDeckLinkProvider(rawUrl) {
  const parsed = parseAllowedDeckUrl(rawUrl);
  if (!parsed.ok) {
    return null;
  }

  return {
    key: parsed.provider,
    label: parsed.providerLabel,
    hostname: parsed.hostname,
  };
}

export function normalizeDeckLinkUrl(rawUrl) {
  const parsed = parseAllowedDeckUrl(rawUrl);
  if (!parsed.ok) {
    return parsed;
  }

  return {
    ok: true,
    deck_url: parsed.url,
    provider: parsed.provider,
    providerLabel: parsed.providerLabel,
    hostname: parsed.hostname,
  };
}

export function normalizeDeckLinkVisibility(value, fallback = "private") {
  const normalized = String(value || "").trim().toLowerCase();
  return DECK_LINK_VISIBILITIES.includes(normalized) ? normalized : fallback;
}

export function validateDeckLinkInput(input = {}, options = {}) {
  const allowFutureVisibility = options.allowFutureVisibility === true;
  const errors = [];
  const urlResult = normalizeDeckLinkUrl(input.deck_url || input.deckUrl || "");

  if (!urlResult.ok) {
    errors.push(urlResult);
  }

  const deckTitle = trimOptionalText(
    input.deck_title || input.deckTitle,
    DECK_LINK_LIMITS.deckTitle,
    "deck_title"
  );
  const commanderName = trimOptionalText(
    input.commander_name || input.commanderName,
    DECK_LINK_LIMITS.commanderName,
    "commander_name"
  );
  const userNote = trimOptionalText(
    input.user_note || input.userNote,
    DECK_LINK_LIMITS.userNote,
    "user_note"
  );

  for (const fieldResult of [deckTitle, commanderName, userNote]) {
    if (!fieldResult.ok) {
      errors.push(fieldResult);
    }
  }

  const visibility = normalizeDeckLinkVisibility(input.visibility, "private");
  if (!allowFutureVisibility && !DECK_LINK_BROWSER_VISIBILITIES.includes(visibility)) {
    errors.push(
      failure(
        "visibility_private_only",
        "Deck-link saves are private-only in v1.",
        "visibility"
      )
    );
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      deck_url: urlResult.deck_url,
      provider: urlResult.provider,
      deck_title: deckTitle.value,
      commander_name: commanderName.value,
      user_note: userNote.value,
      placement_key: trimOptionalText(input.placement_key || input.placementKey, 80, "placement_key").value,
      placement_name: trimOptionalText(input.placement_name || input.placementName, 120, "placement_name").value,
      color_identity_key: trimOptionalText(input.color_identity_key || input.colorIdentityKey, 32, "color_identity_key").value,
      visibility,
    },
  };
}

function normalizeComparableValue(value) {
  return value === undefined ? null : value;
}

function changedPublicFields(currentLink = {}, patch = {}) {
  return DECK_LINK_PUBLIC_FIELDS.filter((field) => {
    if (!Object.hasOwn(patch, field)) {
      return false;
    }
    return normalizeComparableValue(patch[field]) !== normalizeComparableValue(currentLink[field]);
  });
}

export function resolveDeckLinkUpdatePolicy(currentLink = {}, patch = {}, options = {}) {
  const currentVisibility = normalizeDeckLinkVisibility(currentLink.visibility, "private");
  const changedFields = changedPublicFields(currentLink, patch);

  if (currentVisibility !== "public" || changedFields.length === 0) {
    return {
      allowed: true,
      moderationRequired: false,
      changedPublicFields: changedFields,
      patch: { ...patch },
    };
  }

  if (options.publicEditMode === "block") {
    return {
      allowed: false,
      reason: "public_fields_locked",
      moderationRequired: true,
      changedPublicFields: changedFields,
    };
  }

  return {
    allowed: true,
    moderationRequired: true,
    reason: "public_edit_returns_to_submitted",
    changedPublicFields: changedFields,
    patch: {
      ...patch,
      visibility: "submitted",
      submitted_at: options.now || new Date().toISOString(),
      approved_at: null,
      approved_by: null,
      rejected_at: null,
      moderation_note: null,
    },
  };
}

export function normalizeCommunityDeckVoteType(voteType = "upvote") {
  const normalized = String(voteType || "").trim().toLowerCase();
  return COMMUNITY_DECK_VOTE_TYPES.includes(normalized) ? normalized : null;
}

export function canVoteOnDeckLink(deckLink = {}, voterId = "") {
  if (!voterId) {
    return {
      allowed: false,
      reason: "authentication_required",
    };
  }

  if (normalizeDeckLinkVisibility(deckLink.visibility, "private") !== "public") {
    return {
      allowed: false,
      reason: "deck_link_not_public",
    };
  }

  return {
    allowed: true,
    reason: "ok",
  };
}

export function resolveCommunityDeckVoteToggle({
  deckLink = {},
  voterId = "",
  existingVote = null,
  voteType = "upvote",
} = {}) {
  const normalizedVoteType = normalizeCommunityDeckVoteType(voteType);
  if (!normalizedVoteType) {
    return {
      allowed: false,
      reason: "vote_type_not_allowed",
    };
  }

  const votePolicy = canVoteOnDeckLink(deckLink, voterId);
  if (!votePolicy.allowed) {
    return votePolicy;
  }

  if (existingVote?.vote_type === normalizedVoteType) {
    return {
      allowed: true,
      action: "remove",
      deck_link_id: deckLink.id,
      voter_id: voterId,
      vote_type: normalizedVoteType,
    };
  }

  return {
    allowed: true,
    action: "add",
    row: {
      deck_link_id: deckLink.id,
      voter_id: voterId,
      vote_type: normalizedVoteType,
    },
  };
}
