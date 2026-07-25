import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const registryPath = path.resolve("data/apocrypha-source-registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const allowedSourceTypes = new Set([
  "official-design",
  "official-lore",
  "official-rules",
  "official-card-record",
  "official-archive",
  "supplemental-reference",
]);

const allowedGroups = new Set([
  "design",
  "lore",
  "rules-card-records",
  "official-archives",
  "supplemental",
]);

const allowedStatuses = new Set([
  "current-official",
  "dated-official",
  "historical-official",
  "official-archive",
  "supplemental",
  "moved",
  "unavailable",
  "replaced",
  "not-checked",
]);

const officialGroups = new Set([
  "design",
  "lore",
  "rules-card-records",
  "official-archives",
]);

const approvedOfficialDomains = [
  "magic.wizards.com",
  "gatherer.wizards.com",
  "media.wizards.com",
  "wizards.com",
];

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

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const errors = [];
const ids = new Set();
const canonicalUrls = new Set();

function fail(source, message) {
  const prefix = source?.id ? source.id : "<registry>";
  errors.push(`${prefix}: ${message}`);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
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

function usedForText(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.join(" ").trim();
  return "";
}

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

    if (!source.id) {
      fail(source, "missing id");
    } else if (ids.has(source.id)) {
      fail(source, "duplicate id");
    } else {
      ids.add(source.id);
    }

    if (!source.title) fail(source, "missing title");
    if (!source.url) fail(source, "missing url");
    if (!source.canonicalUrl) fail(source, "missing canonicalUrl");
    if (!source.sourceType) fail(source, "missing sourceType");
    if (source.sourceType && !allowedSourceTypes.has(source.sourceType)) {
      fail(source, `unknown sourceType "${source.sourceType}"`);
    }
    if (!source.group) fail(source, "missing group");
    if (source.group && !allowedGroups.has(source.group)) {
      fail(source, `unknown group "${source.group}"`);
    }
    if (!source.status) fail(source, "missing status");
    if (source.status && !allowedStatuses.has(source.status)) {
      fail(source, `unknown status "${source.status}"`);
    }

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

    const hostname = canonicalUrl?.hostname.toLowerCase() ?? url?.hostname.toLowerCase() ?? "";
    if (source.official === true && !hostMatches(hostname, approvedOfficialDomains)) {
      fail(source, `official source uses non-approved domain "${hostname}"`);
    }
    if (officialGroups.has(source.group) && source.official === false) {
      fail(source, "official group contains official:false source");
    }
    if (source.group === "supplemental" && source.official === true) {
      fail(source, "supplemental group contains official:true source");
    }
    if (source.sourceType === "supplemental-reference" && source.group !== "supplemental") {
      fail(source, "supplemental source is inside an official group");
    }

    if (hostMatches(hostname, socialDomains)) {
      fail(source, `social media URL is not allowed: ${hostname}`);
    }
    if (hostMatches(hostname, ["reddit.com"]) && (source.group !== "supplemental" || source.sourceType !== "supplemental-reference")) {
      fail(source, "Reddit URL outside supplemental record");
    }
    if (hostMatches(hostname, ["youtube.com", "youtu.be"]) && (source.group !== "supplemental" || source.sourceType !== "supplemental-reference")) {
      fail(source, "YouTube URL outside supplemental record");
    }

    const usedFor = usedForText(source.usedFor);
    if (!usedFor) {
      fail(source, "missing usedFor");
    } else if (vagueUsedForValues.has(usedFor.toLowerCase())) {
      fail(source, `vague usedFor value "${usedFor}"`);
    }

    if (source.linkStatus !== "not-checked" && !source.lastVerified) {
      fail(source, "missing lastVerified unless linkStatus is not-checked");
    }
    if (source.publishedDate !== null && source.publishedDate !== undefined && !datePattern.test(source.publishedDate)) {
      fail(source, `invalid publishedDate format "${source.publishedDate}"`);
    }
    if (source.lastVerified !== null && source.lastVerified !== undefined && !datePattern.test(source.lastVerified)) {
      fail(source, `invalid lastVerified format "${source.lastVerified}"`);
    }
    if (source.status === "current-official" && source.linkStatus !== "ok" && source.linkStatus !== "redirected") {
      fail(source, "current-official source is unverified");
    }
  }
}

const sources = Array.isArray(registry.sources) ? registry.sources : [];
const officialCount = sources.filter((source) => source.official === true).length;
const supplementalCount = sources.filter((source) => source.sourceType === "supplemental-reference").length;
const notCheckedCount = sources.filter((source) => source.linkStatus === "not-checked").length;
const moveRemoveCount = sources.filter((source) => source.auditDisposition === "move" || source.auditDisposition === "remove").length;

if (errors.length > 0) {
  console.error(`Apocrypha source registry validation FAILED: ${errors.length} issue(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Apocrypha source registry validation PASS: ${sources.length} records, ${officialCount} official, ${supplementalCount} supplemental, ${notCheckedCount} not checked, ${moveRemoveCount} move/remove candidates.`
);
