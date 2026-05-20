import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// Mirrors docs/reference/colorless-identity-metaphysics-markdown-schema.md.
// Keep required sections and optional H2 placement in sync with that document.
const SCHEMA = Object.freeze({
  identity: {
    fileName: "identity.md",
    relativePath: path.join("docs", "architecture", "colorless", "identity.md"),
    titlePattern: /^# Colorless - .+/,
    requiredH2: [
      "Identity Overview",
      "Core Drive",
      "Vox Mana Read (Core Axiom)",
      "Philosophical Foundations",
      "Mechanical Identity",
      "Gameplay Philosophy",
      "Philosophical Weaknesses",
      "Color Relationships",
      "System Mapping (Canonical)",
      "Operator Translation Signals (Maze / Scryfall)",
      "Summary",
    ],
    optionalBefore: {
      "System Mapping (Canonical)": ["Colorless-Specific Notes"],
      Summary: ["Source Notes"],
    },
    requiredOperatorGroups: [
      "Artifact / Function",
      "Eldrazi / Void",
      "Mana-Symbol / Land Usage",
    ],
  },
  metaphysics: {
    fileName: "metaphysics.md",
    relativePath: path.join("docs", "architecture", "colorless", "metaphysics.md"),
    titlePattern: /^# Colorless Metaphysics - .+/,
    requiredH2: [
      "Philosophical Foundations",
      "Vox Mana Read",
      "Structural & Mechanical Architecture",
      "Ludological Matrix Mapping",
    ],
    optionalBefore: {
      "Philosophical Foundations": ["Metaphysical Thesis"],
      "Ludological Matrix Mapping": ["Colorless-Specific Notes"],
    },
  },
});

function headingLevel(line) {
  const match = /^(#{1,6})\s+\S/.exec(line);
  return match ? match[1].length : 0;
}

function headingText(line) {
  return line.replace(/^#{1,6}\s+/, "").trim();
}

function previousNonBlankLine(lines, index) {
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    if (lines[cursor].trim()) return lines[cursor];
  }
  return "";
}

function nextNonBlankLine(lines, index) {
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    if (lines[cursor].trim()) return lines[cursor];
  }
  return "";
}

function validateH2Order({ relativePath, h2Headings, schema }) {
  const errors = [];
  let requiredIndex = 0;

  h2Headings.forEach((heading) => {
    const expected = schema.requiredH2[requiredIndex];
    if (heading.text === expected) {
      requiredIndex += 1;
      return;
    }

    const allowedOptional = schema.optionalBefore[expected] || [];
    if (allowedOptional.includes(heading.text)) {
      return;
    }

    if (schema.requiredH2.includes(heading.text)) {
      errors.push(
        `${relativePath}:${heading.line}: required section "${heading.text}" appears out of order; expected "${expected}".`
      );
      return;
    }

    const optionalNames = Object.values(schema.optionalBefore).flat();
    if (optionalNames.includes(heading.text)) {
      errors.push(
        `${relativePath}:${heading.line}: optional section "${heading.text}" appears in an undocumented location.`
      );
      return;
    }

    errors.push(
      `${relativePath}:${heading.line}: undocumented optional H2 "${heading.text}". Define it in the schema doc before validating it.`
    );
  });

  if (requiredIndex < schema.requiredH2.length) {
    errors.push(
      `${relativePath}: missing required H2 sections: ${schema.requiredH2.slice(requiredIndex).join(", ")}.`
    );
  }

  return errors;
}

function validateFraming({ relativePath, text }) {
  const errors = [];
  const normalized = text.replace(/\s+/g, " ");

  if (!/colorless is not (?:itself )?a color/i.test(normalized)) {
    errors.push(`${relativePath}: must state that colorless is not a color.`);
  }

  if (!/not (?:a|the) sixth (?:mono )?color/i.test(normalized)) {
    errors.push(`${relativePath}: must state that colorless is not a sixth color.`);
  }

  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    const mentionsSixthColor = /\bcolorless\b.*\b(?:is|as|becomes|acts as|functions as)\b.*\bsixth\b.*\bcolor\b/.test(lower);
    const isNegated = /\bnot\b.*\bsixth\b.*\bcolor\b/.test(lower);
    const isRejectedExperiment = /\b(?:pseudo-sixth|abandoned|scrapped|rejected)\b.*\bsixth\b.*\bcolor\b/.test(lower);
    if (mentionsSixthColor && !isNegated && !isRejectedExperiment) {
      errors.push(`${relativePath}:${index + 1}: positive sixth-color framing is not allowed.`);
    }
  });

  return errors;
}

function validateOperatorGroups({ relativePath, headings, schema }) {
  if (!schema.requiredOperatorGroups) return [];

  const errors = [];
  const operatorHeading = headings.find(
    (heading) => heading.level === 2 && heading.text === "Operator Translation Signals (Maze / Scryfall)"
  );
  if (!operatorHeading) return errors;

  const following = headings.filter((heading) => heading.line > operatorHeading.line);
  const nextH2 = following.find((heading) => heading.level === 2);
  const operatorSubheadings = following
    .filter((heading) => heading.level === 3 && (!nextH2 || heading.line < nextH2.line))
    .map((heading) => heading.text);

  const expected = schema.requiredOperatorGroups;
  if (operatorSubheadings.length < expected.length) {
    errors.push(`${relativePath}:${operatorHeading.line}: operator signals must include grouped H3 sections: ${expected.join(", ")}.`);
    return errors;
  }

  expected.forEach((group, index) => {
    if (operatorSubheadings[index] !== group) {
      errors.push(
        `${relativePath}:${operatorHeading.line}: operator signal group ${index + 1} must be "${group}", found "${operatorSubheadings[index] || "missing"}".`
      );
    }
  });

  return errors;
}

async function validateFile(schemaKey) {
  const schema = SCHEMA[schemaKey];
  const filePath = path.join(repoRoot, schema.relativePath);
  const text = await readFile(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  const errors = [];
  const headings = [];

  lines.forEach((line, index) => {
    const level = headingLevel(line);
    if (level) {
      headings.push({ level, text: headingText(line), line: index + 1 });
    }

    if (/^\s{0,3}---\s*$/.test(line)) {
      const next = nextNonBlankLine(lines, index);
      if (!/^#{1,6}\s+\S/.test(next)) {
        errors.push(`${schema.relativePath}:${index + 1}: horizontal rule must be followed by a heading.`);
      }
      const previous = previousNonBlankLine(lines, index);
      if (/^\s{0,3}---\s*$/.test(previous)) {
        errors.push(`${schema.relativePath}:${index + 1}: consecutive horizontal rules are not allowed.`);
      }
    }
  });

  const firstNonEmptyIndex = lines.findIndex((line) => line.trim());
  if (firstNonEmptyIndex === -1) {
    errors.push(`${schema.relativePath}: file is empty.`);
    return errors;
  }

  const firstLine = lines[firstNonEmptyIndex].trim();
  if (!schema.titlePattern.test(firstLine)) {
    errors.push(`${schema.relativePath}:${firstNonEmptyIndex + 1}: title must match the ${schema.fileName} canonical title format.`);
  }

  const h1Headings = headings.filter((heading) => heading.level === 1);
  if (h1Headings.length !== 1) {
    errors.push(`${schema.relativePath}: expected exactly one H1 title, found ${h1Headings.length}.`);
  }

  const firstH2 = headings.find((heading) => heading.level === 2);
  const firstH3 = headings.find((heading) => heading.level === 3);
  if (!firstH2) {
    errors.push(`${schema.relativePath}: missing first H2 section.`);
  }
  if (firstH3 && (!firstH2 || firstH3.line < firstH2.line)) {
    errors.push(`${schema.relativePath}:${firstH3.line}: level-three heading appears before the first level-two heading.`);
  }

  let previousLevel = 0;
  headings.forEach((heading) => {
    if (heading.level > previousLevel + 1 && previousLevel !== 0) {
      errors.push(`${schema.relativePath}:${heading.line}: heading level jumps from H${previousLevel} to H${heading.level}.`);
    }
    previousLevel = heading.level;
  });

  const h2Headings = headings
    .filter((heading) => heading.level === 2)
    .map((heading) => ({ text: heading.text, line: heading.line }));
  errors.push(...validateH2Order({ relativePath: schema.relativePath, h2Headings, schema }));
  errors.push(...validateFraming({ relativePath: schema.relativePath, text }));
  errors.push(...validateOperatorGroups({ relativePath: schema.relativePath, headings, schema }));

  return errors;
}

async function main() {
  const errors = [];
  for (const schemaKey of Object.keys(SCHEMA)) {
    errors.push(...await validateFile(schemaKey));
  }

  if (errors.length) {
    console.error(`Colorless markdown validation failed with ${errors.length} issue(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("PASS colorless markdown validation: 1 source set, 2 file(s).");
}

await main();
