import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const registryPath = path.resolve("data/apocrypha-source-registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const socialDomains = [
  "twitter.com",
  "x.com",
  "facebook.com",
  "tumblr.com",
  "discord.com",
  "discord.gg",
  "instagram.com",
  "tiktok.com",
];

const trackingParameters = [
  "fbclid",
  "gclid",
  "igshid",
  "mc_cid",
  "mc_eid",
  "msclkid",
];

const vagueUsedForValues = new Set([
  "useful source",
  "good background",
  "general information",
  "supports interpretation",
  "research reference",
  "helpful context",
]);

const requiredVerificationKeys = [
  "status",
  "checkedAt",
  "method",
  "httpStatus",
  "finalUrl",
  "redirectChain",
];

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const errors = [];
const ids = new Set();
const semanticKeys = new Set();
const canonicalUrls = new Set();
const enumUsage = new Map();

function fail(source, message) {
  const prefix = source?.id ? source.id : "<registry>";
  errors.push(`${prefix}: ${message}`);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sorted(value) {
  return [...value].sort();
}

function hasCountKey(value, trail = []) {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => hasCountKey(item, [...trail, String(index)]));
  }
  if (!isObject(value)) return [];

  const hits = [];
  for (const [key, nested] of Object.entries(value)) {
    if (/^(sourceCount|recordCount|officialCount|supplementalCount|count)$/i.test(key)) {
      hits.push([...trail, key].join("."));
    }
    hits.push(...hasCountKey(nested, [...trail, key]));
  }
  return hits;
}

function parseUrl(source, field) {
  try {
    return new URL(source[field]);
  } catch {
    fail(source, `${field} is not a valid URL`);
    return null;
  }
}

function hostMatches(hostname, domains) {
  return domains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

function hasTrackingParameter(url) {
  for (const key of url.searchParams.keys()) {
    const lower = key.toLowerCase();
    if (lower.startsWith("utm_") || trackingParameters.includes(lower)) return true;
  }
  return false;
}

function textValue(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.join(" ").trim();
  return "";
}

function normalizeSemanticText(value) {
  return textValue(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function enumValues(name) {
  const values = registry.schema?.enums?.[name];
  if (!Array.isArray(values) || values.length === 0) {
    fail(null, `missing non-empty schema enum "${name}"`);
    return new Set();
  }
  const seen = new Set();
  for (const value of values) {
    if (typeof value !== "string" || value.trim() === "") {
      fail(null, `schema enum "${name}" contains a non-string or empty value`);
      continue;
    }
    if (value !== value.toLowerCase()) {
      fail(null, `schema enum "${name}" value "${value}" must be lowercase`);
    }
    if (seen.has(value)) {
      fail(null, `schema enum "${name}" duplicates "${value}"`);
    }
    seen.add(value);
  }
  enumUsage.set(name, new Set());
  return seen;
}

function checkEnum(source, enumName, value, allowed) {
  if (value === undefined || value === null || value === "") {
    fail(source, `missing ${enumName}`);
    return;
  }
  if (!allowed.has(value)) {
    fail(source, `unknown ${enumName} "${value}"`);
    return;
  }
  enumUsage.get(enumName)?.add(value);
}

function checkArray(source, field, { required = false } = {}) {
  if (!Array.isArray(source[field])) {
    fail(source, `${field} must be an array`);
    return;
  }
  if (required && source[field].length === 0) {
    fail(source, `${field} must not be empty`);
  }
  const seen = new Set();
  for (const item of source[field]) {
    if (typeof item !== "string" || item.trim() === "") {
      fail(source, `${field} contains a non-string or empty value`);
      continue;
    }
    if (item !== item.trim()) {
      fail(source, `${field} value "${item}" has surrounding whitespace`);
    }
    if (seen.has(item)) {
      fail(source, `${field} duplicates "${item}"`);
    }
    seen.add(item);
  }
}

function checkRedirectChain(source) {
  if (!Array.isArray(source.verification.redirectChain)) {
    fail(source, "verification.redirectChain must be an array");
    return;
  }
  for (const [index, hop] of source.verification.redirectChain.entries()) {
    if (!isObject(hop)) {
      fail(source, `verification.redirectChain[${index}] must be an object`);
      continue;
    }
    const keys = Object.keys(hop);
    for (const key of ["url", "status", "location"]) {
      if (!keys.includes(key)) fail(source, `verification.redirectChain[${index}] missing ${key}`);
    }
    for (const key of keys) {
      if (!["url", "status", "location"].includes(key)) {
        fail(source, `verification.redirectChain[${index}] has unexpected field ${key}`);
      }
    }
    if (typeof hop.url !== "string" || hop.url.trim() === "") {
      fail(source, `verification.redirectChain[${index}].url must be a non-empty string`);
    } else {
      try {
        new URL(hop.url);
      } catch {
        fail(source, `verification.redirectChain[${index}].url is not a valid URL`);
      }
    }
    if (!Number.isInteger(hop.status) || hop.status < 100 || hop.status > 599) {
      fail(source, `verification.redirectChain[${index}].status must be an HTTP status integer`);
    }
    if (hop.location !== null && (typeof hop.location !== "string" || hop.location.trim() === "")) {
      fail(source, `verification.redirectChain[${index}].location must be null or a non-empty string`);
    }
  }
}

function assertOfficialRecord(source, hostname) {
  if (source.official !== true) {
    fail(source, "official sourceType requires official:true");
  }
  if (source.group === "supplemental") {
    fail(source, "official source cannot use supplemental group");
  }
  if (source.status !== "active") {
    fail(source, "official source must use active status until superseded by a future schema update");
  }
  if (source.auditDisposition !== "keep") {
    fail(source, "official source must use auditDisposition keep");
  }
  if (source.verification?.status === "verified") {
    if (source.evidenceRole !== "official-support") {
      fail(source, "verified official source must use official-support evidenceRole");
    }
  } else if (source.evidenceRole !== "official-support-pending-verification") {
    fail(source, "unverified official source must use official-support-pending-verification evidenceRole");
  }
  if (!hostMatches(hostname, registry.schema.approvedOfficialDomains)) {
    fail(source, `official source uses non-approved domain "${hostname}"`);
  }
}

function assertSupplementalRecord(source) {
  if (source.official !== false) {
    fail(source, "supplemental source requires official:false");
  }
  if (source.sourceType !== "supplemental-reference") {
    fail(source, "supplemental group requires supplemental-reference sourceType");
  }
  if (source.group !== "supplemental") {
    fail(source, "supplemental source must use supplemental group");
  }
  if (source.status !== "candidate-move") {
    fail(source, "supplemental rendered source must be a candidate-move record in Gate 2A");
  }
  if (source.auditDisposition !== "move") {
    fail(source, "supplemental rendered source must use auditDisposition move");
  }
  if (source.evidenceRole !== "supplemental-navigation-only") {
    fail(source, "supplemental source must use supplemental-navigation-only evidenceRole");
  }
  if (!textValue(source.usedFor).includes("does not carry official claims")) {
    fail(source, "supplemental usedFor must state that it does not carry official claims");
  }
  if (!textValue(source.notFor).includes("Official claims")) {
    fail(source, "supplemental notFor must explicitly bar official claims");
  }
}

const schema = registry.schema;
if (registry.schemaVersion !== 2) fail(null, "schemaVersion must be 2");
if (!datePattern.test(registry.auditDate ?? "")) fail(null, "auditDate must use YYYY-MM-DD");
if (!isObject(schema)) fail(null, "missing schema object");
if (!isObject(schema?.fields)) fail(null, "missing schema.fields object");
if (!isObject(schema?.enums)) fail(null, "missing schema.enums object");
if (!Array.isArray(schema?.approvedOfficialDomains) || schema.approvedOfficialDomains.length === 0) {
  fail(null, "schema.approvedOfficialDomains must be a non-empty array");
}

const sourceTypes = enumValues("sourceType");
const groups = enumValues("group");
const statuses = enumValues("status");
const evidenceRoles = enumValues("evidenceRole");
const verificationStatuses = enumValues("verificationStatus");
const auditDispositions = enumValues("auditDisposition");
const documentedFields = new Set(Object.keys(schema?.fields ?? {}));

const countKeys = hasCountKey(registry);
if (countKeys.length > 0) {
  fail(null, `manual count fields are not allowed: ${countKeys.join(", ")}`);
}

if (!Array.isArray(registry.sources)) {
  fail(null, "sources must be an array");
} else {
  for (const source of registry.sources) {
    if (!isObject(source)) {
      fail(null, "source entries must be objects");
      continue;
    }

    const sourceFields = Object.keys(source);
    for (const field of documentedFields) {
      if (!sourceFields.includes(field)) {
        fail(source, `missing documented field "${field}"`);
      }
    }
    for (const field of sourceFields) {
      if (!documentedFields.has(field)) {
        fail(source, `undocumented field "${field}"`);
      }
    }

    if (!source.id) {
      fail(source, "missing id");
    } else if (ids.has(source.id)) {
      fail(source, "duplicate id");
    } else if (!/^apoc-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source.id)) {
      fail(source, "id must be lowercase kebab-case and start with apoc-");
    } else {
      ids.add(source.id);
    }

    if (!source.title) fail(source, "missing title");
    if (!source.url) fail(source, "missing url");
    if (!source.canonicalUrl) fail(source, "missing canonicalUrl");
    if (source.official !== true && source.official !== false) fail(source, "official must be boolean");

    checkEnum(source, "sourceType", source.sourceType, sourceTypes);
    checkEnum(source, "group", source.group, groups);
    checkEnum(source, "status", source.status, statuses);
    checkEnum(source, "evidenceRole", source.evidenceRole, evidenceRoles);
    checkEnum(source, "auditDisposition", source.auditDisposition, auditDispositions);

    const url = source.url ? parseUrl(source, "url") : null;
    const canonicalUrl = source.canonicalUrl ? parseUrl(source, "canonicalUrl") : null;

    for (const [field, parsed] of [["url", url], ["canonicalUrl", canonicalUrl]]) {
      if (parsed && hasTrackingParameter(parsed)) {
        fail(source, `${field} contains tracking parameters`);
      }
    }

    if (source.canonicalUrl) {
      if (canonicalUrls.has(source.canonicalUrl)) {
        fail(source, "duplicate canonicalUrl");
      } else {
        canonicalUrls.add(source.canonicalUrl);
      }
    }

    const semanticKey = `${source.sourceType}|${normalizeSemanticText(source.title)}`;
    if (semanticKeys.has(semanticKey)) {
      fail(source, "duplicate semantic source key");
    } else {
      semanticKeys.add(semanticKey);
    }

    const hostname = canonicalUrl?.hostname.toLowerCase() ?? url?.hostname.toLowerCase() ?? "";
    if (hostMatches(hostname, socialDomains)) {
      fail(source, `social media URL is not allowed: ${hostname}`);
    }
    if (hostMatches(hostname, ["reddit.com"]) && source.sourceType !== "supplemental-reference") {
      fail(source, "Reddit URL outside supplemental record");
    }
    if (hostMatches(hostname, ["youtube.com", "youtu.be"]) && source.sourceType !== "supplemental-reference") {
      fail(source, "YouTube URL outside supplemental record");
    }

    if (source.sourceType.startsWith("official-")) {
      assertOfficialRecord(source, hostname);
    }
    if (source.sourceType === "supplemental-reference" || source.group === "supplemental") {
      assertSupplementalRecord(source);
    }
    if (source.sourceType === "official-design" && source.group !== "design") {
      fail(source, "official-design must use design group");
    }
    if (source.sourceType === "official-lore" && source.group !== "lore") {
      fail(source, "official-lore must use lore group");
    }
    if (source.sourceType === "official-archive" && source.group !== "official-archives") {
      fail(source, "official-archive must use official-archives group");
    }
    if (source.sourceType === "official-rules" && source.group !== "rules-card-records") {
      fail(source, "official-rules must use rules-card-records group");
    }
    if (source.group === "official-archives" && source.sourceType !== "official-archive") {
      fail(source, "official-archives group requires official-archive sourceType");
    }
    if (source.group === "rules-card-records" && source.sourceType !== "official-rules") {
      fail(source, "rules-card-records group may only contain official-rules until card-record authority is approved");
    }

    const usedFor = textValue(source.usedFor);
    if (!usedFor) {
      fail(source, "missing usedFor");
    } else if (vagueUsedForValues.has(usedFor.toLowerCase())) {
      fail(source, `vague usedFor value "${usedFor}"`);
    }
    if (!textValue(source.notFor)) fail(source, "missing notFor");
    if (!textValue(source.subgroup)) fail(source, "missing subgroup");
    if (!textValue(source.notes)) fail(source, "missing notes");

    checkArray(source, "topics", { required: true });
    checkArray(source, "colors");
    checkArray(source, "identities");
    checkArray(source, "planes");
    checkArray(source, "linkedFrom", { required: true });
    for (const locator of source.linkedFrom ?? []) {
      if (!locator.startsWith("apocrypha/index.html#")) {
        fail(source, `linkedFrom locator must point at an Apocrypha anchor: ${locator}`);
      }
    }

    if (!isObject(source.verification)) {
      fail(source, "verification must be an object");
    } else {
      const keys = Object.keys(source.verification);
      for (const key of requiredVerificationKeys) {
        if (!keys.includes(key)) fail(source, `verification missing ${key}`);
      }
      for (const key of keys) {
        if (!requiredVerificationKeys.includes(key)) fail(source, `verification has unexpected field ${key}`);
      }
      checkEnum(source, "verificationStatus", source.verification.status, verificationStatuses);
      if (source.verification.status === "not-checked") {
        if (source.verification.checkedAt !== null) fail(source, "not-checked verification must have checkedAt:null");
        if (source.verification.method !== null) fail(source, "not-checked verification must have method:null");
        if (source.verification.httpStatus !== null) fail(source, "not-checked verification must have httpStatus:null");
        if (source.verification.finalUrl !== null) fail(source, "not-checked verification must have finalUrl:null");
        if (!Array.isArray(source.verification.redirectChain) || source.verification.redirectChain.length !== 0) {
          fail(source, "not-checked verification must have empty redirectChain");
        }
      } else if (source.verification.status === "verified") {
        if (!datePattern.test(source.verification.checkedAt ?? "")) {
          fail(source, "verified verification must have checkedAt YYYY-MM-DD");
        }
        if (source.verification.method !== "GET") {
          fail(source, "verified verification must use method GET");
        }
        if (!Number.isInteger(source.verification.httpStatus) || source.verification.httpStatus < 200 || source.verification.httpStatus > 399) {
          fail(source, "verified verification must have observed 2xx/3xx httpStatus");
        }
        if (!source.verification.finalUrl) {
          fail(source, "verified verification must have finalUrl");
        } else {
          try {
            new URL(source.verification.finalUrl);
          } catch {
            fail(source, "verified verification finalUrl is not a valid URL");
          }
        }
        checkRedirectChain(source);
        if (source.evidenceRole !== "official-support") {
          fail(source, "verified records must use official-support evidenceRole");
        }
      }
    }

    if (source.publishedDate !== null && source.publishedDate !== undefined && !datePattern.test(source.publishedDate)) {
      fail(source, `invalid publishedDate format "${source.publishedDate}"`);
    }
    if (source.replacementFor !== null && !Array.isArray(source.replacementFor)) {
      fail(source, "replacementFor must be null or an array of source IDs");
    }
    if (source.replacedBy !== null && !Array.isArray(source.replacedBy)) {
      fail(source, "replacedBy must be null or an array of source IDs");
    }
  }
}

for (const [enumName, used] of enumUsage) {
  const allowed = new Set(registry.schema?.enums?.[enumName] ?? []);
  const unused = sorted([...allowed].filter((value) => !used.has(value)));
  if (unused.length > 0) fail(null, `orphan enum value(s) in ${enumName}: ${unused.join(", ")}`);
}

const sources = Array.isArray(registry.sources) ? registry.sources : [];
const officialCount = sources.filter((source) => source.official === true).length;
const supplementalCount = sources.filter((source) => source.sourceType === "supplemental-reference").length;
const notCheckedCount = sources.filter((source) => source.verification?.status === "not-checked").length;
const moveRemoveCount = sources.filter((source) => source.auditDisposition === "move" || source.auditDisposition === "remove").length;

if (errors.length > 0) {
  console.error(`Apocrypha source registry validation FAILED: ${errors.length} issue(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Apocrypha source registry validation PASS: ${sources.length} records, ${officialCount} official, ${supplementalCount} supplemental, ${notCheckedCount} not checked, ${moveRemoveCount} move/remove candidates.`
);
