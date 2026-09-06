import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SHARE_IMAGE = "https://voxmana.io/assets/img/social/vox-mana-share-v1.png";

const ROUTES = [
  {
    file: "index.html",
    title: "Vox Mana - Commander Identity Compass",
    canonical: "https://voxmana.io/",
  },
  {
    file: "guide/index.html",
    title: "Vox Mana - Field Guide",
    canonical: "https://voxmana.io/guide/",
  },
  {
    file: "guide/reading/index.html",
    title: "Vox Mana - How to Read Your Dossier",
    canonical: "https://voxmana.io/guide/reading/",
  },
  {
    file: "guide/maze/index.html",
    title: "Vox Mana - Read and Recover a Maze Search",
    canonical: "https://voxmana.io/guide/maze/",
  },
  {
    file: "archscry/index.html",
    title: "Vox Mana - Commander Identity Reading",
    canonical: "https://voxmana.io/archscry/",
  },
  {
    file: "maze/index.html",
    title: "Vox Mana - The Implicit Maze",
    canonical: "https://voxmana.io/maze/",
  },
  {
    file: "strategium/index.html",
    title: "Vox Mana - Strategium",
    canonical: "https://voxmana.io/strategium/",
  },
  {
    file: "strategium/console/index.html",
    title: "Vox Mana - Strategium Console",
    canonical: "https://voxmana.io/strategium/console/",
  },
  {
    file: "strategium/review/index.html",
    title: "Help Me Understand - Strategium",
    canonical: "https://voxmana.io/strategium/review/",
  },
  {
    file: "strategium/find-a-table/index.html",
    title: "Finding a Table - Strategium",
    canonical: "https://voxmana.io/strategium/find-a-table/",
  },
  {
    file: "strategium/before-game/index.html",
    title: "Before the Game - Strategium",
    canonical: "https://voxmana.io/strategium/before-game/",
  },
  {
    file: "strategium/during-game/index.html",
    title: "During the Game - Strategium",
    canonical: "https://voxmana.io/strategium/during-game/",
  },
  {
    file: "apocrypha/index.html",
    title: "Vox Mana - The Apocrypha",
    canonical: "https://voxmana.io/apocrypha/",
  },
  {
    file: "library/index.html",
    title: "Vox Mana - Library Route Alias",
    canonical: "https://voxmana.io/apocrypha/",
    noindex: true,
  },
  {
    file: "privacy/index.html",
    title: "Vox Mana - Privacy Policy",
    canonical: "https://voxmana.io/privacy/",
  },
  {
    file: "terms/index.html",
    title: "Vox Mana - Terms of Service",
    canonical: "https://voxmana.io/terms/",
  },
];

const BLOCKED_METADATA_PATTERNS = [
  /\bdeckbuilder\b/i,
  /\brecommendation engine\b/i,
  /\blegality checker\b/i,
  /\bEDHREC clone\b/i,
  /\bofficial authority\b/i,
  /\bbest commander\b/i,
  /\bbest deck\b/i,
];

const failures = [];

function readRoute(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function getHead(source) {
  const match = source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match?.[1] ?? "";
}

function getTitle(head) {
  return head.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
}

function getMetaContent(head, attrName, attrValue) {
  const tags = [...head.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const tag = tags.find(candidate => {
    const attrPattern = new RegExp(`\\b${attrName}\\s*=\\s*["']${attrValue}["']`, "i");
    return attrPattern.test(candidate);
  });
  return tag?.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1]?.trim() ?? "";
}

function getCanonical(head) {
  const tag = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map(match => match[0])
    .find(candidate => /\brel\s*=\s*["']canonical["']/i.test(candidate));
  return tag?.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1]?.trim() ?? "";
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function expectNonEmpty(value, message) {
  expect(Boolean(value && value.trim()), message);
}

for (const route of ROUTES) {
  const source = readRoute(route.file);
  const head = getHead(source);
  const title = getTitle(head);
  const description = getMetaContent(head, "name", "description");
  const canonical = getCanonical(head);
  const ogSiteName = getMetaContent(head, "property", "og:site_name");
  const ogType = getMetaContent(head, "property", "og:type");
  const ogTitle = getMetaContent(head, "property", "og:title");
  const ogDescription = getMetaContent(head, "property", "og:description");
  const ogUrl = getMetaContent(head, "property", "og:url");
  const ogImage = getMetaContent(head, "property", "og:image");
  const ogImageAlt = getMetaContent(head, "property", "og:image:alt");
  const twitterCard = getMetaContent(head, "name", "twitter:card");
  const twitterTitle = getMetaContent(head, "name", "twitter:title");
  const twitterDescription = getMetaContent(head, "name", "twitter:description");
  const twitterImage = getMetaContent(head, "name", "twitter:image");
  const metadataText = [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImageAlt,
    twitterTitle,
    twitterDescription,
  ].join(" ");

  expect(title === route.title, `${route.file} title should be "${route.title}"`);
  expectNonEmpty(description, `${route.file} should have a meta description`);
  expect(description.length <= 180, `${route.file} meta description should stay concise`);
  expect(canonical === route.canonical, `${route.file} canonical should be ${route.canonical}`);
  expect(ogSiteName === "Vox Mana", `${route.file} should set og:site_name`);
  expect(ogType === "website", `${route.file} should set og:type website`);
  expect(ogTitle, `${route.file} should set og:title`);
  expectNonEmpty(ogDescription, `${route.file} should set og:description`);
  expect(ogUrl === route.canonical, `${route.file} og:url should match canonical`);
  expect(ogImage === SHARE_IMAGE, `${route.file} og:image should use the shared preview image`);
  expectNonEmpty(ogImageAlt, `${route.file} should set og:image:alt`);
  expect(twitterCard === "summary_large_image", `${route.file} should set twitter:card`);
  expectNonEmpty(twitterTitle, `${route.file} should set twitter:title`);
  expectNonEmpty(twitterDescription, `${route.file} should set twitter:description`);
  expect(twitterImage === SHARE_IMAGE, `${route.file} twitter:image should use the shared preview image`);

  if (route.noindex) {
    expect(
      getMetaContent(head, "name", "robots").toLowerCase() === "noindex",
      `${route.file} should remain noindex`
    );
  }

  for (const pattern of BLOCKED_METADATA_PATTERNS) {
    expect(!pattern.test(metadataText), `${route.file} metadata should avoid anti-fit phrase ${pattern}`);
  }
}

if (failures.length) {
  console.error("Route metadata check failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Route metadata check passed for ${ROUTES.length} public route heads.`);
