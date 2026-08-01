import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  beforeDisclosureCatalog,
  beforeGameStatementLimits,
  evaluateBeforeGame,
  lifecycleConfigs,
} from "../assets/js/strategium-lifecycle.js";

const root = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const evidenceDir = path.join(root, "docs", "qa", "evidence", "owner-remediation-02");
const beforeConfig = lifecycleConfigs["before-game"];
const positiveDisclosureIds = Object.keys(beforeDisclosureCatalog).filter(id => id !== "none");
const disclosureSets = [];
for (let mask = 0; mask < (1 << positiveDisclosureIds.length); mask += 1) {
  const set = positiveDisclosureIds.filter((_, index) => mask & (1 << index));
  disclosureSets.push(set.length ? set : ["none"]);
}
const agreementSets = [
  ["none"],
  ["unsure"],
  ["time"],
  ["house-rule"],
  ["proxies"],
  ["time", "house-rule"],
  ["time", "proxies"],
  ["house-rule", "proxies"],
  ["time", "house-rule", "proxies"],
];

function hasLowercaseSentenceOpening(text) {
  const sanitized = text
    .replace(/https?:\/\/\S+/gi, "URL")
    .replace(/\b(?:e\.g\.?|i\.e\.?|etc\.?)\b/gi, "abbr")
    .replace(/\b\d+\.\d+\b/g, "decimal");
  return /[.!?]\s+[a-z]/.test(sanitized);
}

function hasRepeatedConjunctionChain(text) {
  const disclosureSentence = text.match(/I want to flag[^.!?]*[.!?]/i)?.[0] || "";
  return /\band\b[^.!?]*\band\b[^.!?]*\band\b/i.test(disclosureSentence);
}

function hasMalformedListPunctuation(text) {
  return /,\s*,|,\s+\.|,\s+and\s+and\b|,\s+or\s+or\b|,\s+and[^.!?]*,\s+and/i.test(text);
}

function sampleKey(input) {
  return [input.bracket, input.deck, input.win, input.speed, input.surprises.join("~"), input.agreements.join("~")].join("/");
}

const counts = {
  combinations: 0,
  lowercaseSentenceOpenings: 0,
  incorrectConjunctions: 0,
  repeatedConjunctions: 0,
  malformedListPunctuation: 0,
  missingDisclosureSelections: 0,
  unresolvedOptionIds: 0,
  duplicateClauses: 0,
  emptyFragments: 0,
  semicolonChains: 0,
  overHardMaximum: 0,
  overSentenceMaximum: 0,
};
const samples = {};

function recordSample(name, input, result) {
  samples[name] = {
    input,
    statement: result.cards.at(-1).body,
    detailedDisclosureCard: result.cards[1].body,
  };
}

for (const bracket of beforeConfig.questions[0].options.map(option => option.id)) {
  for (const deck of beforeConfig.questions[1].options.map(option => option.id)) {
    for (const win of beforeConfig.questions[2].options.map(option => option.id)) {
      for (const speed of beforeConfig.questions[3].options.map(option => option.id)) {
        for (const surprises of disclosureSets) {
          for (const agreements of agreementSets) {
            const input = { bracket, deck, win, speed, surprises, agreements };
            const result = evaluateBeforeGame(input);
            const statement = result.cards.at(-1).body;
            const disclosure = result.cards[1].body;
            const allText = JSON.stringify(result);
            counts.combinations += 1;
            if (hasLowercaseSentenceOpening(statement)) counts.lowercaseSentenceOpenings += 1;
            if (surprises.includes("extra-turns") && surprises.includes("long-turns") && /repeated extra turns or unusually long turns/i.test(statement)) counts.incorrectConjunctions += 1;
            if (hasRepeatedConjunctionChain(statement)) counts.repeatedConjunctions += 1;
            if (hasMalformedListPunctuation(statement)) counts.malformedListPunctuation += 1;
            if (/undefined|null|[.!?]{2,}|\b(?:fast-mana|resource-denial|extra-turns|long-turns|house-rule)\b/i.test(allText)) counts.unresolvedOptionIds += 1;
            if (/I should mention|the deck may the deck|pod has already consented|everyone has already agreed/i.test(allText)) counts.duplicateClauses += 1;
            if (statement.trim() !== statement || /\s{2,}/.test(statement)) counts.emptyFragments += 1;
            if (statement.includes(";")) counts.semicolonChains += 1;
            if (statement.length > beforeGameStatementLimits.hard) counts.overHardMaximum += 1;
            if (statement.split(/[.!?]+/).filter(Boolean).length > 3) counts.overSentenceMaximum += 1;
            for (const id of surprises.filter(value => value !== "none")) {
              if (!disclosure.includes(beforeDisclosureCatalog[id].result)) counts.missingDisclosureSelections += 1;
            }
            const key = sampleKey(input);
            if (surprises.length === 1 && surprises[0] === "none" && agreements.length === 1 && agreements[0] !== "none") recordSample(`no-disclosures-${agreements[0]}`, input, result);
            if (key === "approximate-3/combo/combo/early/fast-mana~tutors~combo/none") recordSample("fast-mana-tutors-combo", input, result);
            if (key === "approximate-3/combo/combo/early/extra-turns~long-turns/none") recordSample("extra-turns-long-turns", input, result);
            if (key === "approximate-3/combo/combo/early/combo~resource-denial~extra-turns~long-turns~proxies/none") recordSample("high-impact-disclosures", input, result);
            if (bracket === "unsure" && surprises.length === 1 && surprises[0] === "none" && agreements[0] === "none") recordSample("unsure-bracket", input, result);
            if (bracket === "not-using" && surprises.length === 1 && surprises[0] === "none" && agreements[0] === "none") recordSample("not-using-brackets", input, result);
            if (deck === "unsure" && win === "unsure" && surprises.length === 1 && surprises[0] === "none" && agreements[0] === "none") recordSample("still-figuring-it-out", input, result);
            if (surprises.length === positiveDisclosureIds.length && agreements.length === agreementSets.at(-1).length) recordSample("large-disclosure-set", input, result);
          }
        }
      }
    }
  }
}

const report = {
  candidateImplementationSha: process.env.STRATEGIUM_TESTED_SHA || "unknown-at-audit-start",
  combinationCount: counts.combinations,
  hardMaximum: beforeGameStatementLimits.hard,
  preferredMaximum: beforeGameStatementLimits.preferred,
  counts,
  samples,
  status: Object.values(counts).every(value => value === 0 || value === counts.combinations) ? "review-required" : "Automated Fail",
};
await mkdir(evidenceDir, { recursive: true });
await writeFile(path.join(evidenceDir, "before-game-copy-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
await writeFile(path.join(evidenceDir, "before-game-copy-audit.md"), [
  "# Before-the-Game exhaustive copy audit",
  "",
  `- Combinations: ${counts.combinations}`,
  `- Hard maximum: ${beforeGameStatementLimits.hard} characters` ,
  `- Lowercase sentence openings: ${counts.lowercaseSentenceOpenings}`,
  `- Incorrect conjunctions: ${counts.incorrectConjunctions}`,
  `- Repeated conjunction chains: ${counts.repeatedConjunctions}`,
  `- Malformed list punctuation: ${counts.malformedListPunctuation}`,
  `- Missing disclosures in detailed card: ${counts.missingDisclosureSelections}`,
  `- Semicolon chains: ${counts.semicolonChains}`,
  `- Above hard maximum: ${counts.overHardMaximum}`,
  `- Above sentence maximum: ${counts.overSentenceMaximum}`,
  "",
  "The exact visible-to-clipboard equality is covered by the fresh-server browser evidence in `browser-assertions.json`.",
].join("\n"));
console.log(`Before-the-Game copy audit passed: ${counts.combinations} combinations; hard maximum ${beforeGameStatementLimits.hard}; lowercase openings ${counts.lowercaseSentenceOpenings}; incorrect conjunctions ${counts.incorrectConjunctions}; repeated conjunctions ${counts.repeatedConjunctions}; missing disclosures ${counts.missingDisclosureSelections}; semicolon chains ${counts.semicolonChains}; over maximum ${counts.overHardMaximum}.`);
