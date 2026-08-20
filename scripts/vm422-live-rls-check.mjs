import { readFile } from "node:fs/promises";

const REQUIRED_ENV = [
  "VM422_OWNER_EMAIL",
  "VM422_OWNER_PASSWORD",
  "VM422_OTHER_EMAIL",
  "VM422_OTHER_PASSWORD",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function env(name) {
  return String(process.env[name] || "").trim();
}

async function readSharedSupabaseConfig() {
  const source = await readFile(new URL("../assets/js/shared/shared.js", import.meta.url), "utf8");
  return {
    url: source.match(/supabaseUrl:\s*"([^"]+)"/)?.[1] || "",
    anonKey: source.match(/supabaseKey:\s*"([^"]+)"/)?.[1] || "",
  };
}

function usage(missing) {
  console.error("VM-422 live RLS check requires existing test users and service-role setup access.");
  console.error(`Missing: ${missing.join(", ")}`);
  console.error("");
  console.error("Required environment:");
  console.error("  VM422_OWNER_EMAIL");
  console.error("  VM422_OWNER_PASSWORD");
  console.error("  VM422_OTHER_EMAIL");
  console.error("  VM422_OTHER_PASSWORD");
  console.error("  SUPABASE_SERVICE_ROLE_KEY");
  console.error("");
  console.error("Optional overrides:");
  console.error("  SUPABASE_URL");
  console.error("  SUPABASE_ANON_KEY");
}

function assertCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function printPass(message) {
  console.log(`PASS ${message}`);
}

function printFail(message) {
  console.error(`FAIL ${message}`);
}

function encodeQueryValue(value) {
  return encodeURIComponent(String(value));
}

function inFilter(ids) {
  return `in.(${ids.map((id) => String(id)).join(",")})`;
}

async function parseResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (_) {
    return text;
  }
}

function errorMessage(data, fallback) {
  if (data && typeof data === "object") {
    return data.message || data.error_description || data.error || fallback;
  }
  return typeof data === "string" && data ? data : fallback;
}

async function request({
  baseUrl,
  anonKey,
  method = "GET",
  path,
  token = "",
  apiKey = anonKey,
  body,
  headers = {},
  expected = [200],
}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${token || apiKey}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await parseResponse(response);
  if (!expected.includes(response.status)) {
    throw new Error(`${method} ${path} returned ${response.status}: ${errorMessage(data, response.statusText)}`);
  }
  return { status: response.status, data };
}

async function requestExpectingFailure(options, expectedMessagePattern) {
  const response = await fetch(`${options.baseUrl}${options.path}`, {
    method: options.method || "GET",
    headers: {
      apikey: options.apiKey || options.anonKey,
      Authorization: `Bearer ${options.token || options.apiKey || options.anonKey}`,
      ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const data = await parseResponse(response);
  if (response.status >= 200 && response.status < 300) {
    const emptyArray = Array.isArray(data) && data.length === 0;
    if (!emptyArray) {
      throw new Error(`${options.method || "GET"} ${options.path} unexpectedly succeeded.`);
    }
    return { status: response.status, data };
  }
  const message = errorMessage(data, response.statusText);
  if (expectedMessagePattern && !expectedMessagePattern.test(message)) {
    throw new Error(`Expected failure matching ${expectedMessagePattern}, got: ${message}`);
  }
  return { status: response.status, data };
}

async function signIn({ baseUrl, anonKey, email, password }) {
  const { data } = await request({
    baseUrl,
    anonKey,
    method: "POST",
    path: "/auth/v1/token?grant_type=password",
    body: { email, password },
  });
  assertCondition(data?.access_token, `Could not sign in ${email}.`);
  assertCondition(data?.user?.id, `Signed-in user id missing for ${email}.`);
  return {
    token: data.access_token,
    userId: data.user.id,
  };
}

async function insertDeckLink({ baseUrl, anonKey, token, uniqueSuffix, visibility = "private" }) {
  const deckUrl = `https://moxfield.com/decks/vm422-live-${uniqueSuffix}`;
  const { data } = await request({
    baseUrl,
    anonKey,
    method: "POST",
    path: "/rest/v1/user_deck_links?select=id,deck_url,provider,deck_title,commander_name,user_note,placement_key,placement_name,color_identity_key,visibility,upvote_count",
    token,
    headers: { Prefer: "return=representation" },
    body: {
      deck_url: deckUrl,
      deck_title: `VM-422 Live ${uniqueSuffix}`,
      commander_name: "Test Commander",
      user_note: "VM-422 live RLS verification row.",
      placement_key: "SULTAI",
      placement_name: "Sultai",
      color_identity_key: "BGU",
      visibility,
    },
    expected: [200, 201],
  });
  const row = Array.isArray(data) ? data[0] : data;
  assertCondition(row?.id, "Inserted deck link did not return an id.");
  return row;
}

async function patchDeckLink({ baseUrl, anonKey, token, apiKey = anonKey, deckLinkId, body, expected = [200] }) {
  const { data } = await request({
    baseUrl,
    anonKey,
    apiKey,
    token,
    method: "PATCH",
    path: `/rest/v1/user_deck_links?id=eq.${encodeQueryValue(deckLinkId)}&select=id,visibility,deck_title,approved_at,rejected_at`,
    headers: { Prefer: "return=representation" },
    body,
    expected,
  });
  return Array.isArray(data) ? data[0] : data;
}

async function selectUserDeckLinks({ baseUrl, anonKey, token, deckLinkId }) {
  const { data } = await request({
    baseUrl,
    anonKey,
    token,
    path: `/rest/v1/user_deck_links?id=eq.${encodeQueryValue(deckLinkId)}&select=id,visibility,deck_title`,
  });
  return data || [];
}

async function listMyDeckLinks({ baseUrl, anonKey, token }) {
  const { data } = await request({
    baseUrl,
    anonKey,
    token,
    method: "POST",
    path: "/rest/v1/rpc/vm422_list_my_deck_links",
    body: {},
  });
  return data || [];
}

async function selectPublicLedger({ baseUrl, anonKey, deckLinkId, token = "" }) {
  const { data } = await request({
    baseUrl,
    anonKey,
    token,
    path: `/rest/v1/community_deck_ledger_public?deck_link_id=eq.${encodeQueryValue(deckLinkId)}&select=deck_link_id,provider,deck_url,deck_title,commander_name,user_display_name,placement_key,placement_name,color_identity_key,user_note,public_at,upvote_count`,
  });
  return data || [];
}

async function cleanup({ baseUrl, anonKey, serviceKey, deckLinkIds }) {
  const ids = [...new Set(deckLinkIds.filter(Boolean))];
  if (!ids.length) return;
  const filter = inFilter(ids);

  await request({
    baseUrl,
    anonKey,
    apiKey: serviceKey,
    token: serviceKey,
    method: "DELETE",
    path: `/rest/v1/community_deck_votes?deck_link_id=${filter}`,
    expected: [200, 204],
  });
  await request({
    baseUrl,
    anonKey,
    apiKey: serviceKey,
    token: serviceKey,
    method: "DELETE",
    path: `/rest/v1/user_deck_links?id=${filter}`,
    expected: [200, 204],
  });
}

async function main() {
  const config = await readSharedSupabaseConfig();
  const baseUrl = env("SUPABASE_URL") || config.url;
  const anonKey = env("SUPABASE_ANON_KEY") || config.anonKey;
  const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
  const missing = REQUIRED_ENV.filter((name) => !env(name));

  if (!baseUrl || !anonKey) {
    missing.push(baseUrl ? "SUPABASE_ANON_KEY" : "SUPABASE_URL");
  }

  if (missing.length) {
    usage([...new Set(missing)]);
    process.exitCode = 2;
    return;
  }

  const deckLinkIds = [];
  try {
    await request({
      baseUrl,
      anonKey,
      path: "/rest/v1/community_deck_ledger_public?select=deck_link_id&limit=1",
    });
    printPass("anonymous can query dormant sanitized public ledger view");

    const owner = await signIn({
      baseUrl,
      anonKey,
      email: env("VM422_OWNER_EMAIL"),
      password: env("VM422_OWNER_PASSWORD"),
    });
    const other = await signIn({
      baseUrl,
      anonKey,
      email: env("VM422_OTHER_EMAIL"),
      password: env("VM422_OTHER_PASSWORD"),
    });
    assertCondition(owner.userId !== other.userId, "Owner and non-owner credentials resolved to the same user.");
    printPass("owner and non-owner test sessions signed in");

    const suffix = `${Date.now()}`;
    const privateRow = await insertDeckLink({
      baseUrl,
      anonKey,
      token: owner.token,
      uniqueSuffix: `${suffix}-private`,
    });
    deckLinkIds.push(privateRow.id);
    assertCondition(privateRow.provider === "moxfield", "Provider normalization did not resolve moxfield.");
    assertCondition(privateRow.visibility === "private", "Owner private insert did not stay private.");
    printPass("owner can insert a private deck link with normalized provider");

    const ownerRows = await selectUserDeckLinks({ baseUrl, anonKey, token: owner.token, deckLinkId: privateRow.id });
    assertCondition(ownerRows.length === 1, "Owner could not read their private deck link.");
    printPass("owner can read own private deck link");

    const anonRows = await selectUserDeckLinks({ baseUrl, anonKey, token: "", deckLinkId: privateRow.id });
    assertCondition(anonRows.length === 0, "Anonymous client could read a private deck link.");
    printPass("anonymous cannot read a private deck link");

    const ownerAccountRows = await listMyDeckLinks({ baseUrl, anonKey, token: owner.token });
    assertCondition(
      ownerAccountRows.some((row) => row.id === privateRow.id),
      "Owner account RPC did not include the owner's private deck link."
    );
    printPass("owner account RPC includes own saved deck link");

    const otherRows = await selectUserDeckLinks({ baseUrl, anonKey, token: other.token, deckLinkId: privateRow.id });
    assertCondition(otherRows.length === 0, "Non-owner could read another user's private deck link.");
    printPass("non-owner cannot read another user's private deck link");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "POST",
      path: "/rest/v1/user_deck_links?select=id,visibility",
      token: owner.token,
      headers: { Prefer: "return=representation" },
      body: {
        deck_url: `https://moxfield.com/decks/vm422-live-${suffix}-public-blocked`,
        placement_key: "SULTAI",
        visibility: "public",
      },
    }, /private-only|policy|violates/i);
    printPass("browser user cannot directly insert a public deck link");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "POST",
      path: "/rest/v1/user_deck_links?select=id,visibility",
      token: owner.token,
      headers: { Prefer: "return=representation" },
      body: {
        deck_url: `https://moxfield.com/decks/vm422-live-${suffix}-submitted-blocked`,
        placement_key: "SULTAI",
        visibility: "submitted",
      },
    }, /private-only|policy|violates/i);
    printPass("browser user cannot directly insert a submitted deck link");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "PATCH",
      path: `/rest/v1/user_deck_links?id=eq.${encodeQueryValue(privateRow.id)}&select=id,visibility`,
      token: owner.token,
      headers: { Prefer: "return=representation" },
      body: { visibility: "submitted" },
    }, /private|policy|violates/i);
    printPass("browser user cannot submit a saved deck link in v1");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "PATCH",
      path: `/rest/v1/user_deck_links?id=eq.${encodeQueryValue(privateRow.id)}&select=id,visibility`,
      token: owner.token,
      headers: { Prefer: "return=representation" },
      body: { visibility: "public" },
    }, /private|policy|violates/i);
    printPass("browser user cannot publish a saved deck link in v1");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "POST",
      path: "/rest/v1/community_deck_votes?select=deck_link_id,vote_type",
      token: other.token,
      headers: { Prefer: "return=representation" },
      body: { deck_link_id: privateRow.id },
    }, /public|policy|violates/i);
    printPass("votes are blocked on private deck links");

    const privatePublicRows = await selectPublicLedger({ baseUrl, anonKey, deckLinkId: privateRow.id });
    assertCondition(privatePublicRows.length === 0, "Private row appeared in dormant public ledger view.");
    printPass("private rows do not appear in dormant public ledger view");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "POST",
      path: "/rest/v1/user_deck_links?select=id,visibility",
      token: owner.token,
      headers: { Prefer: "return=representation" },
      body: {
        deck_url: privateRow.deck_url,
        deck_title: `VM-422 Live Duplicate ${suffix}`,
        placement_key: "SULTAI",
        placement_name: "Sultai",
        color_identity_key: "BGU",
        visibility: "private",
      },
    }, /duplicate|unique|violates/i);
    printPass("duplicate active private saves are blocked for owner/url/placement");

    const archivedRow = await patchDeckLink({
      baseUrl,
      anonKey,
      token: owner.token,
      deckLinkId: privateRow.id,
      body: { visibility: "archived" },
    });
    assertCondition(archivedRow.visibility === "archived", "Owner removal did not archive the deck link.");
    printPass("owner can remove own saved deck link by archiving it");

    const archivedOwnerAccountRows = await listMyDeckLinks({ baseUrl, anonKey, token: owner.token });
    assertCondition(
      !archivedOwnerAccountRows.some((row) => row.id === privateRow.id),
      "Owner account RPC included an archived deck link."
    );
    printPass("archived deck links are hidden from owner account RPC");

    const archivedPublicRows = await selectPublicLedger({ baseUrl, anonKey, deckLinkId: privateRow.id });
    assertCondition(archivedPublicRows.length === 0, "Archived row appeared in dormant public ledger view.");
    printPass("archived rows do not appear in dormant public ledger view");

    await requestExpectingFailure({
      baseUrl,
      anonKey,
      method: "PATCH",
      path: `/rest/v1/user_deck_links?id=eq.${encodeQueryValue(privateRow.id)}&select=id,visibility`,
      token: other.token,
      headers: { Prefer: "return=representation" },
      body: { user_note: "non-owner edit attempt" },
    });
    printPass("non-owner cannot edit another user's deck link");

    console.log("VM-422 private deck-link live RLS verification passed.");
  } catch (error) {
    printFail(error.message || String(error));
    process.exitCode = 1;
  } finally {
    try {
      await cleanup({ baseUrl, anonKey, serviceKey, deckLinkIds });
      if (deckLinkIds.length) {
        console.log("Cleaned up VM-422 live verification rows.");
      }
    } catch (cleanupError) {
      printFail(`Cleanup failed: ${cleanupError.message || cleanupError}`);
      process.exitCode = 1;
    }
  }
}

await main();
