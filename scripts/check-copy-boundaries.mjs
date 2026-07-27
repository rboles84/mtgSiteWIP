import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const SCOPED_FILES = [
  "index.html",
  "archscry/index.html",
  "maze/index.html",
  "strategium/index.html",
  "strategium/console/index.html",
  "strategium/review/index.html",
  "apocrypha/index.html",
  "privacy/index.html",
  "terms/index.html",
  "assets/js/index.js",
  "assets/js/archscry-presentation.js",
  "assets/js/commander-dossier.js",
  "assets/js/adaptive-placement.js",
  "assets/js/strategium.js",
  "assets/js/strategium-review.js",
  "research/research-init.js",
  "research/maze-scratchpad-store.js",
];

const BLOCKED_PATTERNS = [
  {
    label: "guild or college",
    regex: /\bguild or college\b/i,
    suggestion: "Use Commander identity, placement reading, or identity dossier.",
  },
  {
    label: "old 10-guild/5-college scope",
    regex: /\b(10 Ravnica guilds|5 Strixhaven colleges)\b/i,
    suggestion: "Use stable app-scope language instead of a hardcoded old count.",
  },
  {
    label: "AI reading claim",
    regex: /\b(AI-powered readings|AI is used|AI-assisted interview processing)\b/i,
    suggestion: "Describe the curated placement model or optional interview processing without AI overclaiming.",
  },
  {
    label: "deck-start framing",
    regex: /\b(deck-start framing|deck-start links|Commander Deck-start Links)\b/i,
    suggestion: "Use Commander browsing context or external browsing links.",
  },
  {
    label: "deckbuilder-adjacent dossier label",
    regex: /\b(Commander Deck Starts|Decks Saved For This Reading|Starter Cards|Mana Base)\b/,
    suggestion: "Use Commander Browsing Starts, External Deck Links, Card Signals, or Mana Notes.",
  },
  {
    label: "starter card group aria/copy",
    regex: /\bStarter card groups\b/i,
    suggestion: "Use Card signal groups.",
  },
  {
    label: "mana base tier aria/copy",
    regex: /\bMana base tiers\b/i,
    suggestion: "Use Mana note tiers.",
  },
  {
    label: "Archscry deckbuilder promise",
    regex: /\b(staple cards|land guidance)\b/i,
    suggestion: "Use card examples, mana notes, or external browsing cues.",
  },
  {
    label: "ornamental Maze empty state",
    regex: /\bThe Archives await\b/i,
    suggestion: "Use an actionable empty state.",
  },
  {
    label: "generic deep-dive category",
    regex: /\bdeep dives\b/i,
    suggestion: "Use overviews, reviews, or source summaries.",
  },
  {
    label: "overclaiming quick search",
    regex: /\bBest counterspells\b/i,
    suggestion: "Use Counterspell examples.",
  },
  {
    label: "time-sensitive Commander policy claim",
    regex: /\b(current Game Changers|Game Changers)\b/i,
    suggestion: "Use high-impact cards, house-rule exceptions, or cards the pod wants named.",
  },
  {
    label: "internal QA phrase",
    regex: /\bfalse-positive boundaries\b/i,
    suggestion: "Describe where identities can look similar but play differently.",
  },
  {
    label: "internal language in player copy",
    regex: /\b(source-bound|sourced breadth|false positives?|false-positive|deck guidance)\b/i,
    suggestion: "Use player-facing source support, color breadth, similar-but-different, or Commander browsing language.",
  },
  {
    label: "internal source phrasing",
    regex: /\bsource-bound\b[^.\n]{0,80}\bidentity\b/i,
    suggestion: "Use identity supported by source notes.",
  },
  {
    label: "over-authoritative proof wording",
    regex: /\bCommander-facing proof\b/i,
    suggestion: "Use Commander examples that support the reading.",
  },
  {
    label: "repetitive adjacent-fit cadence",
    regex: /\bThe reading was not one-note\b/i,
    suggestion: "Use varied adjacent-signal language.",
  },
  {
    label: "vague leverage in player copy",
    regex: /\b(turn-cycle leverage|repeatedly leveraged|convert delayed leverage|turn obligation into leverage|makes language into leverage|turns attacks into leverage|turn pressure into leverage|create leverage|become leverage|gameplay leverage|urgent leverage|decay into leverage|bodies and leverage)\b/i,
    suggestion: "Name the table action: pressure, advantage, payoff, turn-cycle advantage, protected finish, or the winning opening.",
  },
];

function readLines(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  return fs.readFileSync(absolutePath, "utf8").split(/\r?\n/);
}

const findings = [];

for (const relativePath of SCOPED_FILES) {
  const lines = readLines(relativePath);
  lines.forEach((line, index) => {
    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.regex.test(line)) {
        findings.push({
          path: relativePath,
          line: index + 1,
          label: pattern.label,
          suggestion: pattern.suggestion,
          text: line.trim(),
        });
      }
    }
  });
}

if (findings.length) {
  console.error("Copy-boundary check failed:");
  findings.forEach((finding) => {
    console.error(
      `${finding.path}:${finding.line} [${finding.label}] ${finding.suggestion}\n  ${finding.text}`
    );
  });
  process.exit(1);
}

console.log(`Copy-boundary check passed across ${SCOPED_FILES.length} live-copy files.`);
