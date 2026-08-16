import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const sourcePath = path.join(root, 'docs', 'research', 'archscry-sound-play-audit', 'prose-calibration.source.json');
const ledgerPath = path.join(root, 'docs', 'research', 'archscry-sound-play-audit', 'card-evidence-ledger.json');
const outputPath = path.join(root, 'docs', 'research', 'archscry-sound-play-audit', 'prose-calibration.md');
const write = process.argv.includes('--write');

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const ledgerById = new Map(ledger.rendered_rows.map((row) => [row.ledger_id, row]));
const failures = [];
const fail = (message) => failures.push(message);

const requiredTests = [
  'ACCURACY',
  'AUTHORITY',
  'BRIDGE',
  'ECHO',
  'DELETION',
  'SWAP',
  'MODAL_VALUE',
  'NEIGHBOR_ANTI_DRIFT',
  'OVERCLAIM',
  'HUMAN_LANGUAGE'
];

if (source.schema_version !== 'vm562-proposal-source-v1') fail('Unexpected source schema.');
if (source.vm561_checkpoint !== '0d073cd1a5917afecbcb722d57a117f87799ade6') fail('Unexpected VM-561 checkpoint.');

const familyClasses = source.selections.map((selection) => selection.identity_family);
const identityKeys = source.selections.map((selection) => selection.identity_key);
if (source.selections.length !== 7) fail(`Expected 7 selections, found ${source.selections.length}.`);
if (new Set(identityKeys).size !== 7) fail('Selected identity keys are not unique.');
if (new Set(familyClasses).size !== 7) fail('Selected family classes are not unique.');
for (const family of source.required_family_classes) {
  if (!familyClasses.includes(family)) fail(`Missing required family class: ${family}`);
}

const selectedKeySet = new Set(identityKeys);
const eligibleRows = ledger.rendered_rows.filter(
  (row) => selectedKeySet.has(row.identity_key) && row.findings.disposition === 'REMEDIATION_LIKELY'
);
const proposalIds = source.proposals.map((proposal) => proposal.ledger_id);
if (source.proposals.length !== 14) fail(`Expected 14 proposal rows, found ${source.proposals.length}.`);
if (new Set(proposalIds).size !== source.proposals.length) fail('Proposal ledger IDs are not unique.');
if (eligibleRows.length !== source.proposals.length) {
  fail(`Selected identities contain ${eligibleRows.length} eligible rows, but source contains ${source.proposals.length}.`);
}
for (const row of eligibleRows) {
  if (!proposalIds.includes(row.ledger_id)) fail(`Eligible row omitted: ${row.ledger_id}`);
}

const resultingRows = [];
const resultingFields = [];
for (const proposal of source.proposals) {
  const row = ledgerById.get(proposal.ledger_id);
  if (!row) {
    fail(`Unknown ledger ID: ${proposal.ledger_id}`);
    continue;
  }
  if (!selectedKeySet.has(row.identity_key)) fail(`Proposal row is outside the selected corpus: ${row.ledger_id}`);
  if (row.findings.disposition !== 'REMEDIATION_LIKELY') {
    fail(`Proposal row is not REMEDIATION_LIKELY: ${row.ledger_id} (${row.findings.disposition})`);
  }
  if (proposal.proposed_tile_text === null && proposal.proposed_modal_text === null) {
    fail(`Proposal changes no field: ${row.ledger_id}`);
  }
  if (proposal.proposed_tile_text === row.current_tile_text) fail(`Tile proposal equals current text: ${row.ledger_id}`);
  if (proposal.proposed_modal_text === row.current_modal_text) fail(`Modal proposal equals current text: ${row.ledger_id}`);
  for (const test of requiredTests) {
    if (!proposal.proposed_copy_tests_passed.includes(test)) fail(`${row.ledger_id} omits proposal test ${test}.`);
  }
  for (const text of [proposal.proposed_tile_text, proposal.proposed_modal_text].filter(Boolean)) {
    if (/APPROVED_PUBLIC/.test(text)) fail(`Proposal attempts approval promotion: ${row.ledger_id}.`);
  }
  const resultingTile = proposal.proposed_tile_text ?? row.current_tile_text;
  const resultingModal = proposal.proposed_modal_text ?? row.current_modal_text;
  const exactCardText = `${row.underlying_evidence.card_fact.oracle_text}\n${row.underlying_evidence.card_fact.flavor_text}`;
  resultingRows.push({ proposal, row, resultingTile, resultingModal, exactCardText });
  resultingFields.push(
    { fieldId: `${row.ledger_id}:tile`, field: 'tile', ledgerId: row.ledger_id, card: row.card_name, identity: row.identity_name, text: resultingTile, exactCardText },
    { fieldId: `${row.ledger_id}:modal`, field: 'modal', ledgerId: row.ledger_id, card: row.card_name, identity: row.identity_name, text: resultingModal, exactCardText }
  );
}

const trackedChangedPaths = execFileSync('git', ['diff', '--name-only', source.vm561_checkpoint], {
  cwd: root,
  encoding: 'utf8'
})
  .split(/\r?\n/)
  .map((value) => value.trim())
  .filter(Boolean)
  .map((value) => value.replaceAll('\\', '/'));
const untrackedChangedPaths = execFileSync('git', ['ls-files', '--others', '--exclude-standard'], {
  cwd: root,
  encoding: 'utf8'
})
  .split(/\r?\n/)
  .map((value) => value.trim())
  .filter(Boolean)
  .map((value) => value.replaceAll('\\', '/'));
const changedPaths = [...new Set([...trackedChangedPaths, ...untrackedChangedPaths])].sort();

const allowedExact = new Set([
  'docs/kanban/board.md',
  'docs/kanban/in-progress/VM-562-archscry-sound-play-prose-calibration.md',
  'docs/research/archscry-sound-play-audit/prose-calibration.source.json',
  'docs/research/archscry-sound-play-audit/prose-calibration.md',
  'scripts/vm562-sound-play-prose-calibration.mjs',
  'docs/handoffs/HANDOFF_INDEX.md'
]);
for (const changedPath of changedPaths) {
  const allowedHandoff = /^docs\/handoffs\/\d{4}-\d{2}-\d{2}-\d{4}-codex-vm562-[^/]+\.md$/.test(changedPath);
  if (!allowedExact.has(changedPath) && !allowedHandoff) fail(`Unexpected VM-562 path: ${changedPath}`);
  if (changedPath.startsWith('docs/research/canon/')) fail(`Canon corpus changed: ${changedPath}`);
}

const normalize = (text) => text
  .toLowerCase()
  .replace(/\{[^}]+\}/g, ' mana ')
  .replace(/[^a-z0-9']+/g, ' ')
  .trim()
  .split(/\s+/)
  .filter(Boolean);

const legacyPatterns = [
  { label: 'At the table', regex: /\bat the table\b/i },
  { label: 'carries that card action', regex: /\bcarries that card action\b/i },
  { label: 'in this reading', regex: /\bin this reading\b/i },
  { label: 'larger plan', regex: /\blarger plan\b/i },
  { label: 'The line presents', regex: /\bthe line presents\b/i },
  { label: 'makes [identity] concrete', regex: /\bmakes\b.{0,50}\bconcrete\b/i },
  { label: 'source notes', regex: /\bsource notes\b/i },
  { label: 'certified', regex: /\bcertified\b/i },
  { label: 'evidence', regex: /\bevidence\b/i },
  { label: 'claim', regex: /\bclaims?\b/i },
  { label: 'audit', regex: /\baudits?\b/i },
  { label: 'research', regex: /\bresearch\b/i },
  { label: 'validated', regex: /\bvalidated\b/i },
  { label: 'bounded', regex: /\bbounded\b/i },
  { label: 'evidence floor', regex: /\bevidence floor\b/i },
  { label: 'synthesis altitude', regex: /\bsynthesis altitude\b/i },
  { label: 'authority', regex: /\bauthority\b/i }
];
const playerFacingLeaks = [];
for (const field of resultingFields) {
  for (const pattern of legacyPatterns) {
    if (!pattern.regex.test(field.text)) continue;
    pattern.regex.lastIndex = 0;
    if (pattern.regex.test(field.exactCardText)) {
      pattern.regex.lastIndex = 0;
      continue;
    }
    pattern.regex.lastIndex = 0;
    playerFacingLeaks.push({ ...field, pattern: pattern.label });
    fail(`Player-facing resulting ${field.field} leaks '${pattern.label}': ${field.ledgerId}`);
  }
}

const sentenceList = resultingFields.flatMap((entry) =>
  entry.text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .map((sentence) => ({ ...entry, sentence, tokens: normalize(sentence) }))
);

const collectDuplicateGroups = (keyFn) => {
  const groups = new Map();
  for (const sentence of sentenceList) {
    const key = keyFn(sentence);
    if (!key) continue;
    const values = groups.get(key) ?? [];
    values.push(sentence);
    groups.set(key, values);
  }
  return [...groups.entries()].filter(([, values]) => new Set(values.map((value) => value.fieldId)).size > 1);
};

const exactDuplicates = collectDuplicateGroups((sentence) => sentence.tokens.join(' '));
const repeatedOpenings = collectDuplicateGroups((sentence) => sentence.tokens.slice(0, 4).join(' '));
const repeatedEndings = collectDuplicateGroups((sentence) => sentence.tokens.slice(-4).join(' '));

const ngramGroups = (size) => {
  const groups = new Map();
  for (const entry of resultingFields) {
    const tokens = normalize(entry.text);
    for (let index = 0; index <= tokens.length - size; index += 1) {
      const gram = tokens.slice(index, index + size).join(' ');
      const values = groups.get(gram) ?? [];
      values.push(entry);
      groups.set(gram, values);
    }
  }
  return [...groups.entries()].filter(([, values]) => new Set(values.map((value) => value.fieldId)).size > 1);
};

const tokenJaccard = (left, right) => {
  const a = new Set(normalize(left));
  const b = new Set(normalize(right));
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
};

const nearDuplicates = [];
for (let left = 0; left < resultingFields.length; left += 1) {
  for (let right = left + 1; right < resultingFields.length; right += 1) {
    const similarity = tokenJaccard(resultingFields[left].text, resultingFields[right].text);
    if (similarity >= 0.72) nearDuplicates.push({ left: resultingFields[left], right: resultingFields[right], similarity });
  }
}

const tileModalEchoes = resultingRows
  .map((result) => ({
    ledgerId: result.row.ledger_id,
    card: result.row.card_name,
    similarity: tokenJaccard(result.resultingTile, result.resultingModal)
  }))
  .filter((result) => result.similarity >= 0.55);

const functionWords = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'when', 'while', 'because', 'for', 'from', 'to', 'of',
  'in', 'on', 'at', 'with', 'without', 'into', 'through', 'before', 'after', 'is', 'are', 'was', 'were', 'be',
  'becomes', 'can', 'may', 'will', 'it', 'its', 'this', 'that', 'each', 'every', 'one', 'not', 'rather'
]);
const skeletonGroups = collectDuplicateGroups((sentence) => {
  if (sentence.tokens.length < 7) return '';
  return sentence.tokens.map((token) => functionWords.has(token) ? token : 'X').join(' ');
});

const rhetoricalCounts = {
  em_dash: resultingFields.filter((entry) => entry.text.includes('—')).length,
  semicolon: resultingFields.filter((entry) => entry.text.includes(';')).length,
  colon: resultingFields.filter((entry) => entry.text.includes(':')).length,
  not_but_or_instead: resultingFields.filter((entry) => /\bnot\b.{0,80}\b(but|instead)\b/i.test(entry.text)).length,
  rather_than: resultingFields.filter((entry) => /\brather than\b/i.test(entry.text)).length
};

const sharedComposerOccurrences = resultingFields.filter((entry) =>
  /At the table|carries that card action|in this reading|larger plan/i.test(entry.text)
);

const specificityStopWords = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'when', 'while', 'for', 'from', 'to', 'of', 'in', 'on',
  'at', 'with', 'without', 'into', 'through', 'is', 'are', 'was', 'were', 'be', 'it', 'its', 'this', 'that',
  'each', 'every', 'one', 'you', 'your', 'they', 'their', 'can', 'may', 'will', 'not'
]);
const cardSpecificityConcerns = resultingRows.filter((result) => {
  const cardTokens = new Set(normalize(`${result.row.card_name} ${result.exactCardText}`).filter((token) => !specificityStopWords.has(token)));
  const modalTokens = new Set(normalize(result.resultingModal).filter((token) => !specificityStopWords.has(token)));
  return [...modalTokens].filter((token) => cardTokens.has(token)).length < 2;
});

if (exactDuplicates.length) fail(`Resulting corpus contains ${exactDuplicates.length} exact duplicate sentence cluster(s).`);
if (nearDuplicates.length) fail(`Resulting corpus contains ${nearDuplicates.length} near-duplicate field pair(s).`);
if (tileModalEchoes.length) fail(`Resulting corpus contains ${tileModalEchoes.length} high-overlap tile/modal pair(s).`);
if (sharedComposerOccurrences.length) fail(`Resulting corpus contains ${sharedComposerOccurrences.length} shared-composer occurrence(s).`);
if (cardSpecificityConcerns.length) fail(`Resulting corpus contains ${cardSpecificityConcerns.length} card-specificity concern(s).`);

const changedTileCount = source.proposals.filter((proposal) => proposal.proposed_tile_text !== null).length;
const changedModalCount = source.proposals.filter((proposal) => proposal.proposed_modal_text !== null).length;
const unchangedFieldCount = source.proposals.length * 2 - changedTileCount - changedModalCount;
const contentModelReviewCount = source.proposals.filter((proposal) => proposal.modal_content_model_review).length;
if (resultingFields.length !== 28) fail(`Expected 28 resulting fields, found ${resultingFields.length}.`);
if (changedTileCount !== 3) fail(`Expected 3 final tile proposals, found ${changedTileCount}.`);
if (changedModalCount !== 14) fail(`Expected 14 final modal proposals, found ${changedModalCount}.`);
if (unchangedFieldCount !== 11) fail(`Expected 11 deliberately unchanged fields, found ${unchangedFieldCount}.`);
const krrikProposal = source.proposals.find((proposal) => proposal.ledger_id === 'PLAY-B-1-cardrel_auto_b_cbe3a4e7_5dbe_4f58_8ee6_a1762b65acfd');
const krrikLedgerRow = ledgerById.get('PLAY-B-1-cardrel_auto_b_cbe3a4e7_5dbe_4f58_8ee6_a1762b65acfd');
if (!krrikLedgerRow?.underlying_evidence.card_fact.oracle_text.includes('For each {B} in a cost')) {
  fail("K'rrik Oracle authority no longer contains the expected '{B} in a cost' behavior.");
}
if (!krrikProposal?.proposed_modal_text?.startsWith('Each {B} in a cost becomes a choice between mana and two life.')) {
  fail("K'rrik proposal no longer tracks the exact Oracle '{B} in a cost' scope.");
}

const mdEscape = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
const block = (value) => value === null ? '**UNCHANGED**' : `\n\n\`\`\`text\n${value}\n\`\`\``;
const listOrNone = (values, formatter = (value) => value) => values.length
  ? values.map((value) => `- ${formatter(value)}`).join('\n')
  : '- None.';
const groupText = (groups) => listOrNone(groups, ([key, values]) =>
  `\`${key}\` — ${[...new Set(values.map((value) => `${value.card} ${value.field ?? ''} (${value.ledgerId})`.trim()))].join('; ')}`
);

const output = [];
output.push('# VM-562 — Archscry Sound/Play Prose Calibration');
output.push('');
output.push('> Proposal-only owner-review artifact. Nothing here is `APPROVED_PUBLIC`, and no text in this file changes production.');
output.push('');
output.push(`VM-561 checkpoint: \`${source.vm561_checkpoint}\``);
output.push('');
output.push('## Calibration summary');
output.push('');
output.push(`- Selected identities: ${source.selections.length}.`);
output.push(`- Eligible remediation rows inspected: ${source.proposals.length}.`);
output.push(`- Tile changes proposed: ${changedTileCount}.`);
output.push(`- Modal changes proposed: ${changedModalCount}.`);
output.push(`- Eligible tile/modal fields deliberately unchanged: ${unchangedFieldCount}.`);
output.push(`- \`MODAL_CONTENT_MODEL_REVIEW\` findings: ${contentModelReviewCount}.`);
output.push('');
output.push('## Stratified selection');
output.push('');
output.push('| Family class | Identity | Why selected |');
output.push('| --- | --- | --- |');
for (const selection of source.selections) {
  output.push(`| ${mdEscape(selection.identity_family)} | ${mdEscape(selection.identity_display_name)} (\`${selection.identity_key}\`) | ${mdEscape(selection.reason)} |`);
}
output.push('');
output.push('## Proposal rows');

source.proposals.forEach((proposal, index) => {
  const row = ledgerById.get(proposal.ledger_id);
  const result = resultingRows.find((candidate) => candidate.row.ledger_id === row.ledger_id);
  const nonPassFindings = Object.entries(row.findings)
    .filter(([key, value]) => key !== 'disposition' && key !== 'notes' && !String(value).startsWith('PASS_') && !String(value).startsWith('NO_'))
    .map(([key, value]) => `${key}: ${value}`);
  output.push('');
  output.push(`### ${index + 1}. ${row.identity_name} — ${row.card_name} (${row.surface})`);
  output.push('');
  output.push(`- Identity key: \`${row.identity_key}\``);
  output.push(`- Identity family: \`${source.selections.find((selection) => selection.identity_key === row.identity_key).identity_family}\``);
  output.push(`- Ledger ID: \`${row.ledger_id}\``);
  output.push(`- VM-561 disposition: \`${row.findings.disposition}\``);
  output.push(`- VM-561 defect classifications: ${nonPassFindings.map((value) => `\`${value}\``).join('; ') || 'None.'}`);
  output.push(`- Exact printing/object ID: \`${row.exact_printing_id}\``);
  output.push(`- Oracle ID: \`${row.oracle_id}\``);
  output.push(`- Claim classification: \`${row.audit_inference.classification}\``);
  output.push(`- Relevant identity facet IDs: ${row.audit_inference.relevant_facet_ids.map((value) => `\`${value}\``).join(', ')}`);
  output.push('');
  output.push('#### Current and proposed fields');
  output.push('');
  output.push('Current tile text:');
  output.push(block(row.current_tile_text));
  output.push('');
  output.push('Proposed tile text:');
  output.push(block(proposal.proposed_tile_text));
  output.push('');
  output.push('Current modal text:');
  output.push(block(row.current_modal_text));
  output.push('');
  output.push('Proposed modal text:');
  output.push(block(proposal.proposed_modal_text));
  output.push('');
  output.push('Hypothetical resulting tile:');
  output.push(block(result.resultingTile));
  output.push('');
  output.push('Hypothetical resulting modal:');
  output.push(block(result.resultingModal));
  output.push('');
  output.push('#### Evidence contract');
  output.push('');
  output.push('Routing authority:');
  output.push('');
  output.push(`- Relationship ID: \`${row.relationship_id}\``);
  output.push(`- Raw claim IDs: ${row.routing_authority.raw_claim_ids.map((value) => `\`${value}\``).join(', ')}`);
  output.push(`- Source/evidence-ledger IDs: ${row.routing_authority.source_evidence_ledger_ids.map((value) => `\`${value}\``).join(', ')}`);
  output.push('');
  output.push('Underlying evidence:');
  output.push('');
  output.push(`- Card fact source: \`${row.underlying_evidence.card_fact.source}\``);
  output.push(`- Verified ${row.surface === 'SOUND' ? 'flavor text' : 'Oracle behavior'}: ${mdEscape(row.surface === 'SOUND' ? row.underlying_evidence.card_fact.flavor_text : row.underlying_evidence.card_fact.oracle_text)}`);
  for (const facet of row.underlying_evidence.identity) {
    output.push(`- ${facet.facet_id}: ${facet.claim_statement}`);
    for (const evidence of facet.underlying_evidence) {
      output.push(`  - \`${evidence.source_id}\` — \`${evidence.anchor || evidence.source_path_or_url}\` — ${evidence.establishes}`);
    }
  }
  output.push('');
  output.push(`Audit inference / proposed bridge: ${proposal.proposal_bridge}`);
  output.push('');
  output.push(`Reason for change: ${proposal.reason_for_change}`);
  output.push('');
  output.push(`Old-copy tests failed: ${proposal.old_copy_tests_failed.map((value) => `\`${value}\``).join(', ')}.`);
  output.push('');
  output.push(`Proposed-copy tests passed: ${proposal.proposed_copy_tests_passed.map((value) => `\`${value}\``).join(', ')}.`);
  output.push('');
  output.push(`Authority / limitation note: ${row.audit_inference.limitation}`);
  output.push('');
  output.push(`Modal content-model review: ${proposal.modal_content_model_review ? '`MODAL_CONTENT_MODEL_REVIEW`' : 'No.'}`);
  output.push('');
  output.push(`Owner decision: \`${proposal.owner_decision}\`.`);
});

output.push('');
output.push('## Resulting-row calibration QA');
output.push('');
output.push('The corpus below is the complete hypothetical result for all 14 selected `REMEDIATION_LIKELY` rows: proposed text where present, otherwise the frozen current field. It contains 28 player-facing fields.');
output.push('');
output.push(`- Exact duplicate resulting sentences: ${exactDuplicates.length}.`);
output.push(`- Near-duplicate resulting field pairs at Jaccard ≥ 0.72: ${nearDuplicates.length}.`);
output.push(`- Repeated normalized 4-grams across resulting fields: ${ngramGroups(4).length}.`);
output.push(`- Repeated normalized 5-grams across resulting fields: ${ngramGroups(5).length}.`);
output.push(`- Repeated four-token sentence openings across resulting fields: ${repeatedOpenings.length}.`);
output.push(`- Repeated four-token sentence endings across resulting fields: ${repeatedEndings.length}.`);
output.push(`- Repeated function-word grammatical-skeleton proxies across resulting fields: ${skeletonGroups.length}.`);
output.push(`- High-overlap tile/modal pairs at Jaccard ≥ 0.55: ${tileModalEchoes.length}.`);
output.push(`- Shared-composer occurrences in resulting player copy: ${sharedComposerOccurrences.length}.`);
output.push(`- Internal research/evidence terminology leaks in resulting player copy: ${playerFacingLeaks.length}.`);
output.push(`- Card-specificity concerns in resulting modals: ${cardSpecificityConcerns.length}.`);
output.push(`- Rhetorical-device counts: em dash ${rhetoricalCounts.em_dash}; semicolon ${rhetoricalCounts.semicolon}; colon ${rhetoricalCounts.colon}; not/but-or-instead ${rhetoricalCounts.not_but_or_instead}; rather-than ${rhetoricalCounts.rather_than}.`);
output.push('');
output.push('Repeated 4-gram clusters:');
output.push('');
output.push(groupText(ngramGroups(4)));
output.push('');
output.push('Repeated 5-gram clusters:');
output.push('');
output.push(groupText(ngramGroups(5)));
output.push('');
output.push('Repeated opening clusters:');
output.push('');
output.push(groupText(repeatedOpenings));
output.push('');
output.push('Repeated ending clusters:');
output.push('');
output.push(groupText(repeatedEndings));
output.push('');
output.push('Repeated grammatical-skeleton proxy clusters:');
output.push('');
output.push(groupText(skeletonGroups));
output.push('');
output.push('Tile/modal semantic-overlap concerns:');
output.push('');
output.push(listOrNone(tileModalEchoes, (value) => `${value.card} (${value.ledgerId}) — Jaccard ${value.similarity.toFixed(3)}`));
output.push('');
output.push('Player-facing legacy/research-language leaks:');
output.push('');
output.push(listOrNone(playerFacingLeaks, (value) => `${value.card} ${value.field} (${value.ledgerId}) — \`${value.pattern}\``));
output.push('');
output.push('Card-specificity concerns:');
output.push('');
output.push(listOrNone(cardSpecificityConcerns, (value) => `${value.row.card_name} (${value.row.ledger_id})`));
output.push('');
output.push('Manual corpus assessments:');
output.push('');
output.push(`- Repeated grammatical skeletons: ${source.manual_corpus_assessments.repeated_grammatical_skeletons}`);
output.push(`- Generic identity-name insertion: ${source.manual_corpus_assessments.generic_identity_name_insertion}`);
output.push(`- Cross-card swapability: ${source.manual_corpus_assessments.cross_card_swapability}`);
for (const assessment of source.manual_corpus_assessments.same_facet_clusters) output.push(`- Same-facet cluster: ${assessment}`);
output.push(`- N-gram cluster review: ${source.manual_corpus_assessments.ngram_cluster_review}`);
output.push(`- Rhetorical-device review: ${source.manual_corpus_assessments.rhetorical_device_review}`);
output.push(`- Resulting-pair composer review: ${source.manual_corpus_assessments.unchanged_shared_composer_note}`);
output.push('');
output.push('## Preservation result');
output.push('');
output.push('- Exactly seven identities and all seven required family classes are represented.');
output.push('- Every proposal maps to a VM-561 `REMEDIATION_LIKELY` row; every selected eligible row is represented.');
output.push('- No `NO_CHANGE_INDICATED`, source-blocked, Vox-authority-blocked, insufficient-evidence, or owner-conflict row receives replacement prose.');
output.push('- Current text, relationship IDs, raw claim IDs, source IDs, facet IDs, exact printing IDs, and Oracle IDs are read directly from the frozen VM-561 ledger.');
output.push('- Final content QA evaluates each complete hypothetical resulting tile/modal pair, including every deliberately unchanged field.');
output.push('- The diff allowlist excludes production copy, relationship sources, runtime, generated product data, placement/scoring/identity sources, the VM-559 workbook/state, and `docs/research/canon/`.');
output.push('- Proposals remain `PENDING_OWNER_REVIEW`; no promotion or production application is present.');

const generated = `${output.join('\n')}\n`;
if (write) {
  fs.writeFileSync(outputPath, generated, 'utf8');
} else if (!fs.existsSync(outputPath)) {
  fail('Generated calibration artifact is missing. Run with --write.');
} else if (fs.readFileSync(outputPath, 'utf8').replaceAll('\r\n', '\n') !== generated) {
  fail('Generated calibration artifact is stale. Run with --write.');
}

if (failures.length) {
  console.error('VM-562 calibration QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('VM-562 calibration QA passed.');
console.log(`Selections: ${source.selections.length}/7`);
console.log(`Eligible rows: ${source.proposals.length}/14`);
console.log(`Tile proposals: ${changedTileCount}`);
console.log(`Modal proposals: ${changedModalCount}`);
console.log(`Deliberately unchanged eligible fields: ${unchangedFieldCount}`);
console.log(`MODAL_CONTENT_MODEL_REVIEW: ${contentModelReviewCount}`);
console.log(`Resulting fields: ${resultingFields.length}/28`);
console.log(`Exact duplicate resulting sentences: ${exactDuplicates.length}`);
console.log(`Near-duplicate resulting fields: ${nearDuplicates.length}`);
console.log(`Repeated resulting 4-grams: ${ngramGroups(4).length}`);
console.log(`Repeated resulting 5-grams: ${ngramGroups(5).length}`);
console.log(`Repeated resulting openings: ${repeatedOpenings.length}`);
console.log(`Repeated resulting endings: ${repeatedEndings.length}`);
console.log(`Repeated resulting skeleton proxies: ${skeletonGroups.length}`);
console.log(`Tile/modal echo concerns: ${tileModalEchoes.length}`);
console.log(`Shared composer occurrences: ${sharedComposerOccurrences.length}`);
console.log(`Player-facing research/evidence leaks: ${playerFacingLeaks.length}`);
console.log(`Card-specificity concerns: ${cardSpecificityConcerns.length}`);
console.log(`Changed paths since VM-561: ${changedPaths.length}`);
