import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const guidePath = path.join(root, 'docs', 'reference', '37-identity-player-relationship-guide.md');
const outputPath = path.join(root, 'docs', 'audits', 'vm554-37-identity-guide-source-hardening', 'claim-matrix.tsv');

const identities = [
  ['WU', 'Azorius Senate', 'azorius'],
  ['UB', 'House Dimir', 'dimir'],
  ['BR', 'Cult of Rakdos', 'rakdos'],
  ['RG', 'Gruul Clans', 'gruul'],
  ['WG', 'Selesnya Conclave', 'selesnya'],
  ['WB', 'Orzhov Syndicate', 'orzhov'],
  ['UR', 'Izzet League', 'izzet'],
  ['BG', 'Golgari Swarm', 'golgari'],
  ['UG', 'Simic Combine', 'simic'],
  ['WR', 'Boros Legion', 'boros'],
  ['LOREHOLD', 'Lorehold College', 'lorehold'],
  ['PRISMARI', 'Prismari College', 'prismari'],
  ['WITHERBLOOM', 'Witherbloom College', 'witherbloom'],
  ['QUANDRIX', 'Quandrix College', 'quandrix'],
  ['SILVERQUILL', 'Silverquill College', 'silverquill'],
  ['W', 'White', 'white'],
  ['U', 'Blue', 'blue'],
  ['B', 'Black', 'black'],
  ['R', 'Red', 'red'],
  ['G', 'Green', 'green'],
  ['BANT', 'Bant', 'bant'],
  ['ESPER', 'Esper', 'esper'],
  ['GRIXIS', 'Grixis', 'grixis'],
  ['JUND', 'Jund', 'jund'],
  ['NAYA', 'Naya', 'naya'],
  ['ABZAN', 'Abzan Houses', 'abzan'],
  ['TEMUR', 'Temur Frontier', 'temur'],
  ['SULTAI', 'Sultai Brood', 'sultai'],
  ['MARDU', 'Mardu Horde', 'mardu'],
  ['JESKAI', 'Jeskai Way', 'jeskai'],
  ['YORE', 'Yore / Artifice', 'yore'],
  ['GLINT', 'Glint / Chaos', 'glint'],
  ['DUNE', 'Dune / Aggression', 'dune'],
  ['INK', 'Ink / Altruism', 'ink'],
  ['WITCH', 'Witch / Growth', 'witch'],
  ['COLORLESS', 'Colorless', 'colorless'],
  ['WUBRG', 'Five-Color / WUBRG', null],
];

const statementOrder = ['CENTER', 'RESONATES', 'CONNECTS', 'PUSHES_BACK', 'REJECTS'];
const guide = fs.readFileSync(guidePath, 'utf8');
const entryPattern = /^(\d+)\. \*\*(.+?)\*\*\s*\n([\s\S]*?)(?=^\d+\. \*\*|^### |^## |(?![\s\S]))/gm;
const entries = [];
for (const match of guide.matchAll(entryPattern)) {
  const bullets = {};
  for (const bullet of match[3].matchAll(/^\s+- \*\*(Resonates|Connects|Pushes back|Rejects):\*\* (.+)$/gm)) {
    const type = bullet[1] === 'Pushes back' ? 'PUSHES_BACK' : bullet[1].toUpperCase();
    bullets[type] = bullet[2].trim();
  }
  entries.push({ number: Number(match[1]), center: match[2].trim(), bullets });
}

if (entries.length !== 37) {
  throw new Error(`Expected 37 guide entries, found ${entries.length}`);
}

function locators(key, slug, type) {
  const factionBase = `data/factions.json#/factions/${key}`;
  const docBase = slug ? `docs/architecture/colors/${slug}` : null;
  const rawBase = `data/raw-factions/${key.toLowerCase()}`;
  if (type === 'CENTER') {
    return [
      `${factionBase}/philosophy`,
      docBase ? `${docBase}/identity.md#identity-overview-or-core-drive` : `${rawBase}/${key.toLowerCase()}.profile.json`,
      docBase ? `${docBase}/metaphysics.md#metaphysical-thesis` : `${rawBase}/${key.toLowerCase()}.placement.json`,
    ].join('; ');
  }
  if (type === 'RESONATES') {
    return [
      `${factionBase}/affinity/drawn_to`,
      docBase ? `${docBase}/identity.md#operator-translation-signals` : `${rawBase}/${key.toLowerCase()}.profile.json`,
    ].join('; ');
  }
  if (type === 'CONNECTS') {
    if (key === 'COLORLESS') {
      return `${docBase}/identity.md#false-positive-risks`;
    }
    return [
      `${factionBase}/affinity/not_to_be_confused_with`,
      `${factionBase}/raw_enrichment/views_on_other_factions`,
      docBase ? `${docBase}/identity.md#false-positive-risks-and-neighbor-boundaries` : `${rawBase}/${key.toLowerCase()}.profile.json`,
    ].join('; ');
  }
  if (type === 'PUSHES_BACK') {
    return [
      `${factionBase}/affinity/repelled_by`,
      `${factionBase}/core_tension`,
      docBase ? `${docBase}/identity.md#inhibitors-or-false-positive-risks` : `${rawBase}/${key.toLowerCase()}.placement.json`,
    ].join('; ');
  }
  return [
    `${factionBase}/affinity/not_to_be_confused_with`,
    docBase ? `${docBase}/identity.md#false-positive-risks` : `${rawBase}/${key.toLowerCase()}.placement.json`,
  ].join('; ');
}

function officialIds(number) {
  if (number <= 10) return 'OFF-COLOR-INDEX; OFF-CITY-HIGHLIGHTS';
  if (number <= 15) return 'OFF-STRIXHAVEN-DISTINCTION; OFF-STRIXHAVEN-GUIDE';
  if (number <= 20) return 'OFF-PIE-FIGHTS; OFF-ALLIED-COLORS';
  if (number <= 30) return 'OFF-COLOR-INDEX; OFF-THREE-COLOR';
  if (number <= 35) return 'OFF-CMD2016-FOUR-COLOR';
  if (number === 36) return 'OFF-COLORLESS';
  return 'NONE-WUBRG-PHILOSOPHY-NOT-OFFICIALLY-ESTABLISHED';
}

function adjudicate(number, type) {
  if (type !== 'CONNECTS') {
    return {
      classification: 'UPSTREAM-DIRECT',
      rationale: `The guide ${type.toLowerCase()} statement is a bounded paraphrase of the controlling Vox Mana philosophy, affinity, tension, or false-positive fields. Official review found no direct contradiction; project-synthesis caveats in upstream remain controlling.`,
      disposition: 'PRESERVE',
    };
  }
  if (number <= 20) {
    return {
      classification: 'SUPPORTED-SYNTHESIS',
      rationale: 'The relationship combines explicit upstream comparison boundaries with official mono/two-color relationship material. It is a conservative comparison, not canon diplomacy or proof that a color pair has only one expression.',
      disposition: 'PRESERVE_WITH_SYNTHESIS_LABEL',
    };
  }
  if (number <= 30) {
    return {
      classification: 'REMEDIATE-GUIDE',
      rationale: 'The upstream records use guilds as neighbor/separator comparisons. The guide verbs "joins" or "combines" can imply that Ravnica guild identities are constituent parts of an Alara shard or Tarkir clan. Upstream semantics remain sound; reword as bounded shared texture.',
      disposition: 'REWORD_GUIDE_CONNECTS_ONLY',
    };
  }
  if (number <= 35) {
    return {
      classification: 'SUPPORTED-SYNTHESIS',
      rationale: 'The comparison conservatively converts explicit upstream near-match boundaries into relationship language and is consistent with the official Commander 2016 four-color faction frame. Nearness remains shaping guidance, not identity proof.',
      disposition: 'PRESERVE_WITH_SYNTHESIS_LABEL',
    };
  }
  if (number === 36) {
    return {
      classification: 'PROJECT-SYNTHESIS',
      rationale: 'The Yore-machinery and Blue-detachment resemblance is not an explicit controlling positive neighbor assertion and is not official colorless philosophy. The caveat that Colorless inherits neither philosophy keeps it useful as a project-only comparison.',
      disposition: 'PRESERVE_WITH_EXPLICIT_PROJECT_LABEL',
    };
  }
  return {
    classification: 'REMEDIATE-GUIDE',
    rationale: '"Every preceding identity" overstates Five-Color scope. Upstream says guild/college overlap does not itself establish WUBRG and supports integration of five color priorities, not automatic containment of all 36 setting identities.',
    disposition: 'NARROW_TO_FIVE_COLOR_PHILOSOPHIES',
  };
}

function sanitize(value) {
  return String(value).replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const rows = [];
for (let index = 0; index < identities.length; index += 1) {
  const [key, name, slug] = identities[index];
  const entry = entries[index];
  if (entry.number !== index + 1) throw new Error(`Entry sequence mismatch at ${index + 1}`);
  const claims = {
    CENTER: entry.center,
    RESONATES: entry.bullets.RESONATES,
    CONNECTS: entry.bullets.CONNECTS,
    PUSHES_BACK: entry.bullets.PUSHES_BACK,
    REJECTS: entry.bullets.REJECTS,
  };
  for (let claimIndex = 0; claimIndex < statementOrder.length; claimIndex += 1) {
    const type = statementOrder[claimIndex];
    if (!claims[type]) throw new Error(`Missing ${type} for ${name}`);
    const decision = adjudicate(entry.number, type);
    rows.push({
      claim_id: `VM554-${String(entry.number).padStart(2, '0')}-${String(claimIndex + 1).padStart(2, '0')}`,
      identity_number: entry.number,
      identity_key: key,
      identity_name: name,
      statement_type: type,
      classification: decision.classification,
      claim_text: claims[type],
      controlling_locators: locators(key, slug, type),
      official_support_ids: officialIds(entry.number),
      rationale: decision.rationale,
      disposition: decision.disposition,
    });
  }
}

if (rows.length !== 185) throw new Error(`Expected 185 rows, found ${rows.length}`);

const headers = Object.keys(rows[0]);
const body = [
  headers.join('\t'),
  ...rows.map((row) => headers.map((header) => sanitize(row[header])).join('\t')),
].join('\n');
fs.writeFileSync(outputPath, `${body}\n`, 'utf8');

const counts = {};
for (const row of rows) counts[row.classification] = (counts[row.classification] || 0) + 1;
console.log(JSON.stringify({ rows: rows.length, counts, outputPath }, null, 2));
