import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { setPlainReadingSemanticRegistry, setScryfallGrounding } from "../../assets/js/maze/scryfall-grounded-compiler.js";
import {
  MAZE_DOSSIER_PATH_TYPES,
  MAZE_QUERY_MODES,
  MAZE_QUERY_ORIGINS,
  applyMazeFormatToQuery,
  buildMazePathEntries,
  classifyMazeRawInput,
  normalizeMazeQueryApiMetadata,
  normalizeMazeSourceContext,
  prepareRawSyntaxQuery,
  resolveMazeQueryRequest,
  shouldApplyFormatDefault
} from "../../assets/js/maze/maze-query-core.js";

const grounding = JSON.parse(await readFile(new URL("../../data/scryfall/grounding/scryfall-grounding.json", import.meta.url), "utf8"));
const semanticRegistry = JSON.parse(await readFile(new URL("../../data/scryfall/grounding/plain-reading-semantics.json", import.meta.url), "utf8"));
setScryfallGrounding(grounding);
setPlainReadingSemanticRegistry(semanticRegistry);

assert.deepEqual(MAZE_QUERY_MODES, ["ai", "raw", "builder"]);
assert.ok(!MAZE_QUERY_MODES.includes("path"));
assert.deepEqual(MAZE_QUERY_ORIGINS, ["maze", "archscry", "path", "placement", "dossier"]);
assert.deepEqual(MAZE_DOSSIER_PATH_TYPES, [
  "commanders-that-fit",
  "support-cards",
  "flavor-echoes",
  "weird-stretch-commanders"
]);

const plain = resolveMazeQueryRequest({
  mode: "ai",
  input: "red vehicles with crew",
  options: { format: "commander", order: "released", unique: "art", dir: "desc" }
});
assert.equal(plain.mode, "ai");
assert.equal(plain.parserMode, "plain_reading");
assert.equal(plain.query, "type:vehicle c:r o:crew");
assert.equal(plain.plainReadingQuery, "red vehicles with crew");
assert.deepEqual(plain.api, {
  endpoint: "/cards/search",
  unique: "cards",
  order: "name",
  dir: "desc"
});
assert.equal(Object.hasOwn(plain, "adapterDiagnostics"), false);
assert.ok(plain.diagnostics.some((diagnostic) => diagnostic.code === "parser_confidence"));
assert.ok(plain.diagnostics.some((diagnostic) => diagnostic.code === "parser_recognized"));
assert.ok(!plain.query.includes("f:commander"));
assert.ok(plain.diagnostics.some((diagnostic) => diagnostic.code === "parser_validation_plan"));

const groundedPlain = resolveMazeQueryRequest({
  mode: "ai",
  input: "all villains from the spiderman set",
  options: { format: "commander", order: "name", unique: "cards" }
});
assert.equal(
  groundedPlain.query,
  "type:villain (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best"
);
assert.ok(!groundedPlain.query.includes("f:commander"));
assert.ok(groundedPlain.diagnostics.some((diagnostic) => diagnostic.code === "parser_ignored"));
assert.ok(groundedPlain.diagnostics.some((diagnostic) => diagnostic.code === "parser_applied_default"));
assert.ok(!groundedPlain.diagnostics.some((diagnostic) => diagnostic.code === "parser_unresolved_term"));

const exact = resolveMazeQueryRequest({
  mode: "ai",
  input: "! Lightning Bolt"
});
assert.equal(exact.mode, "ai");
assert.equal(exact.parserMode, "exact_name");
assert.equal(exact.query, "Lightning Bolt");
assert.equal(exact.api.endpoint, "/cards/named");
assert.equal(exact.plainReadingQuery, "! Lightning Bolt");

const raw = resolveMazeQueryRequest({
  mode: "raw",
  input: "c:r AND t:creature",
  options: { format: "commander" }
});
assert.equal(raw.mode, "raw");
assert.equal(raw.parserMode, "raw");
assert.equal(raw.query, "c:r t:creature f:commander");
assert.equal(raw.normalized, true);
assert.equal(Object.hasOwn(raw, "adapterDiagnostics"), false);
assert.ok(raw.diagnostics.some((diagnostic) => diagnostic.code === "raw_recognized"));
assert.ok(raw.diagnostics.some((diagnostic) => diagnostic.code === "raw_assumption"));
assert.ok(raw.diagnostics.some((diagnostic) => diagnostic.code === "raw_alternative"));
assert.equal(classifyMazeRawInput("ci<=br t:creature o:sacrifice f:commander").detectedMode, "raw");

const vm482RawTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "type:inkling type:token c<=wb s:stx",
  options: { format: "commander" }
});
assert.equal(vm482RawTokenObject.query, "type:inkling type:token c<=wb s:stx");
assert.equal(vm482RawTokenObject.normalized, false);

const vm482GroupedTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "type:inkling (type:token) c<=wb s:stx",
  options: { format: "commander" }
});
assert.equal(vm482GroupedTokenObject.query, "type:inkling (type:token) c<=wb s:stx");

const vm482ShortTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "t:token c<=wb s:stx",
  options: { format: "commander" }
});
assert.equal(vm482ShortTokenObject.query, "t:token c<=wb s:stx");

const vm484GroupedShortTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "type:treasure (t:token) s:stx",
  options: { format: "commander" }
});
assert.equal(vm484GroupedShortTokenObject.query, "type:treasure (t:token) s:stx");

const vm484DoubleGroupedTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "((type:token)) c<=wb",
  options: { format: "commander" }
});
assert.equal(vm484DoubleGroupedTokenObject.query, "((type:token)) c<=wb");

const vm482ExplicitTokenObjectFormat = resolveMazeQueryRequest({
  mode: "raw",
  input: "type:token f:commander",
  options: { format: "commander" }
});
assert.equal(vm482ExplicitTokenObjectFormat.query, "type:token f:commander");

const vm483ExplicitTokenObjectLegality = resolveMazeQueryRequest({
  mode: "raw",
  input: "type:token legal:commander",
  options: { format: "commander" }
});
assert.equal(vm483ExplicitTokenObjectLegality.query, "type:token legal:commander");

const vm482NegatedTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "-type:token c:r t:creature",
  options: { format: "commander" }
});
assert.equal(vm482NegatedTokenObject.query, "-type:token c:r t:creature f:commander");

const vm484NegatedShortTokenObject = resolveMazeQueryRequest({
  mode: "raw",
  input: "-t:token c:r t:creature",
  options: { format: "commander" }
});
assert.equal(vm484NegatedShortTokenObject.query, "-t:token c:r t:creature f:commander");

const vm482OracleToken = resolveMazeQueryRequest({
  mode: "raw",
  input: "o:token c:g",
  options: { format: "commander" }
});
assert.equal(vm482OracleToken.query, "o:token c:g f:commander");

const vm484OracleAliasToken = resolveMazeQueryRequest({
  mode: "raw",
  input: "oracle:token c:g",
  options: { format: "commander" }
});
assert.equal(vm484OracleAliasToken.query, "oracle:token c:g f:commander");

const vm482QuotedOracleToken = resolveMazeQueryRequest({
  mode: "raw",
  input: "o:\"create a token\" c:g",
  options: { format: "commander" }
});
assert.equal(vm482QuotedOracleToken.query, "o:\"create a token\" c:g f:commander");

const vm482StToken = resolveMazeQueryRequest({
  mode: "raw",
  input: "st:token c:w",
  options: { format: "commander" }
});
assert.equal(vm482StToken.query, "st:token c:w f:commander");

const vm484QuotedNonObjectToken = resolveMazeQueryRequest({
  mode: "raw",
  input: "name:\"Token Collector\" c:w",
  options: { format: "commander" }
});
assert.equal(vm484QuotedNonObjectToken.query, "name:\"Token Collector\" c:w f:commander");

const vm484PlainTokenMakerCards = resolveMazeQueryRequest({
  mode: "ai",
  input: "cards that create tokens legal in commander",
  options: { format: "commander" }
});
assert.equal(vm484PlainTokenMakerCards.query, "o:token legal:commander");

const vm484PlainTokenMakerCreatures = resolveMazeQueryRequest({
  mode: "ai",
  input: "cards that create creature tokens legal in commander",
  options: { format: "commander" }
});
assert.equal(vm484PlainTokenMakerCreatures.query, "type:creature o:token legal:commander");

const quotedRaw = resolveMazeQueryRequest({
  mode: "raw",
  input: 'o:"all heroes" f:commander',
  options: { format: "commander" }
});
assert.equal(quotedRaw.parserMode, "raw");
assert.equal(quotedRaw.detectedMode, "raw");
assert.equal(quotedRaw.query, 'o:"all heroes" f:commander');

const quotedRawDraw = resolveMazeQueryRequest({
  mode: "raw",
  input: 'o:"draw a card" f:commander',
  options: { format: "commander" }
});
assert.equal(quotedRawDraw.parserMode, "raw");
assert.equal(quotedRawDraw.query, 'o:"draw a card" f:commander');

const groupedQuotedRaw = resolveMazeQueryRequest({
  mode: "raw",
  input: '(o:"draw a card" OR t:hero) f:commander',
  options: { format: "commander" }
});
assert.equal(groupedQuotedRaw.parserMode, "raw");
assert.equal(groupedQuotedRaw.query, '(o:"draw a card" OR t:hero) f:commander');

["Lightning Bolt", "lightning bolt", "Sol Ring", "Cyclonic Rift"].forEach((name) => {
  const nameLike = resolveMazeQueryRequest({ mode: "raw", input: name });
  assert.equal(nameLike.parserMode, "exact_name", `expected ${name} to route name-like`);
  assert.equal(nameLike.detectedMode, "exact_name");
  assert.equal(nameLike.query, name);
  assert.equal(nameLike.api.endpoint, "/cards/named");
  assert.ok(nameLike.diagnostics.some((diagnostic) => diagnostic.code === "raw_name_like"));
});

const mixedMarvel = resolveMazeQueryRequest({
  mode: "raw",
  input: "all heroes in the marvel set f:commander",
  options: { format: "commander" }
});
assert.equal(mixedMarvel.parserMode, "plain_reading");
assert.equal(mixedMarvel.detectedMode, "plain_reading");
assert.ok(mixedMarvel.query.includes("f:commander"));
assert.ok(mixedMarvel.query.includes("type:hero"));
assert.ok(mixedMarvel.query.includes("set:msh"));
assert.ok(mixedMarvel.query.includes("set:omb"));
assert.equal(mixedMarvel.executionBlocked, false);
assert.doesNotMatch(mixedMarvel.query, /\b(?:all|heroes|marvel|set)\b(?!:)/i);
assert.ok(!mixedMarvel.queryModel.ambiguous.some((ambiguity) => ambiguity.blocking));
assert.ok(mixedMarvel.diagnostics.some((diagnostic) => diagnostic.code === "raw_mixed_plain_reading"));
assert.ok(!mixedMarvel.diagnostics.some((diagnostic) => diagnostic.code === "parser_blocking_ambiguity"));

const mixedPlain = resolveMazeQueryRequest({
  mode: "raw",
  input: "red vampires that sacrifice creatures"
});
assert.equal(mixedPlain.parserMode, "plain_reading");
assert.equal(mixedPlain.detectedMode, "plain_reading");
assert.match(mixedPlain.query, /type:vampire/);
assert.match(mixedPlain.query, /c:r/);
assert.match(mixedPlain.query, /o:sacrifice/);

const vm477ActualColorCommanderLegal = resolveMazeQueryRequest({
  mode: "ai",
  input: "blue wizards legal in commander",
  options: { format: "commander" }
});
assert.equal(vm477ActualColorCommanderLegal.parserMode, "plain_reading");
assert.equal(vm477ActualColorCommanderLegal.query, "type:wizard c=u legal:commander");
assert.ok(!vm477ActualColorCommanderLegal.query.includes("id<=u"));

const vm481TokenObjectCommanderLegal = resolveMazeQueryRequest({
  mode: "ai",
  input: "Silverquill inkling tokens from the strixhaven set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm481TokenObjectCommanderLegal.parserMode, "plain_reading");
assert.equal(vm481TokenObjectCommanderLegal.query, "type:inkling type:token c<=wb s:tstx");
assert.ok(!vm481TokenObjectCommanderLegal.query.includes("legal:commander"));
assert.ok(!vm481TokenObjectCommanderLegal.query.includes("o:token"));
assert.ok(!vm481TokenObjectCommanderLegal.query.includes("-c:c"));
assert.ok(vm481TokenObjectCommanderLegal.diagnostics.some((diagnostic) => /Token objects are not Commander deck-legal cards/.test(diagnostic.message || "")));

const vm483MarvelUmbrella = resolveMazeQueryRequest({
  mode: "ai",
  input: "black heroes from the marvel set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm483MarvelUmbrella.executionBlocked, false);
["type:hero", "c=b", "legal:commander", "game:paper", "prefer:best", "set:msh", "set:amsh", "set:msc", "set:tmsh", "set:spm", "set:spe", "set:aspm", "set:pspm", "set:tspm", "set:fmsc", "set:tmsc", "set:mar", "set:lmar", "set:omb"].forEach((fragment) => {
  assert.ok(vm483MarvelUmbrella.query.includes(fragment), `Marvel umbrella missing ${fragment}: ${vm483MarvelUmbrella.query}`);
});
assert.ok(!vm483MarvelUmbrella.diagnostics.some((diagnostic) => /could not choose one set family/i.test(diagnostic.message || "")));

const vm483TarkirUmbrella = resolveMazeQueryRequest({
  mode: "ai",
  input: "red dragons from the tarkir set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm483TarkirUmbrella.executionBlocked, false);
["type:dragon", "c=r", "legal:commander", "game:paper", "prefer:best", "set:dtk", "set:pdtk", "set:ptkdf", "set:tdtk", "set:ttdc", "set:tdm", "set:atdm", "set:ptdm", "set:tdc", "set:ttdm", "set:ytdm"].forEach((fragment) => {
  assert.ok(vm483TarkirUmbrella.query.includes(fragment), `Tarkir umbrella missing ${fragment}: ${vm483TarkirUmbrella.query}`);
});
assert.ok(!vm483TarkirUmbrella.diagnostics.some((diagnostic) => /Maze needs one choice|could not choose one set family/i.test(diagnostic.message || "")));

const vm487RakdosVillains = resolveMazeQueryRequest({
  mode: "ai",
  input: "Rakdos villains from the spiderman set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm487RakdosVillains.query, "type:villain c<=br -c:c legal:commander (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best");
assert.ok(!vm487RakdosVillains.query.includes("c=br"));
assert.ok(!vm487RakdosVillains.query.includes("c:br"));
assert.ok(!vm487RakdosVillains.query.includes("id<=br"));

const vm483MarduAttackTokens = resolveMazeQueryRequest({
  mode: "ai",
  input: "Mardu commanders in all sets that attack with tokens and sacrifice creatures",
  options: { format: "commander" }
});
assert.ok(vm483MarduAttackTokens.query.includes("id=wbr"));
assert.ok(vm483MarduAttackTokens.query.includes("o:/attack(s|ing)?[^.\\n]*token|token[^.\\n]*attack(s|ing)?/"));
assert.ok(vm483MarduAttackTokens.query.includes("o:sacrifice"));
assert.ok(vm483MarduAttackTokens.query.includes("is:commander"));
assert.ok(vm483MarduAttackTokens.query.includes("legal:commander"));
assert.ok(!vm483MarduAttackTokens.query.includes("o:token o:attack"));

const vm483MarduWarriorsTarkir = resolveMazeQueryRequest({
  mode: "ai",
  input: "Mardu warriors from the tarkir set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm483MarduWarriorsTarkir.executionBlocked, false);
assert.ok(vm483MarduWarriorsTarkir.query.includes("type:warrior"));
assert.ok(vm483MarduWarriorsTarkir.query.includes("c<=wbr"));
assert.ok(vm483MarduWarriorsTarkir.query.includes("-c:c"));
assert.ok(vm483MarduWarriorsTarkir.query.includes("legal:commander"));
assert.ok(vm483MarduWarriorsTarkir.query.includes("set:dtk"));
assert.ok(vm483MarduWarriorsTarkir.query.includes("set:ytdm"));
assert.ok(!vm483MarduWarriorsTarkir.query.includes("c=wbr"));

const vm483GlintChaos = resolveMazeQueryRequest({
  mode: "ai",
  input: "Glint chaos blue black red green commanders in all sets that make treasure and draw cards",
  options: { format: "commander" }
});
assert.ok(vm483GlintChaos.query.includes("id=ubrg"));
assert.ok(vm483GlintChaos.query.includes("o:treasure"));
assert.ok(vm483GlintChaos.query.includes("otag:draw"));
assert.ok(vm483GlintChaos.query.includes("is:commander"));
assert.ok(vm483GlintChaos.query.includes("legal:commander"));
assert.doesNotMatch(vm483GlintChaos.query, /\bid=ub\b/);
assert.ok(!vm483GlintChaos.query.includes("id=4"));
assert.ok(!vm483GlintChaos.diagnostics.some((diagnostic) => /unresolved glint|unresolved chaos/i.test(diagnostic.message || "")));
const vm487GlintValidationPlan = vm483GlintChaos.diagnostics.find((diagnostic) => diagnostic.code === "parser_validation_plan");
const vm487GlintAbilityRelaxation = vm487GlintValidationPlan?.details?.relaxations?.find((relaxation) => relaxation.category === "abilities");
assert.equal(vm487GlintAbilityRelaxation?.label, "Use any matching commander");
assert.equal(vm487GlintAbilityRelaxation?.query, "id=ubrg is:commander legal:commander");
assert.doesNotMatch(vm487GlintAbilityRelaxation?.query || "", /partner/i);

const vm487WithoutMill = resolveMazeQueryRequest({
  mode: "ai",
  input: "cards for my mono blue commander deck in all sets that are not black and without mill",
  options: { format: "commander" }
});
assert.equal(vm487WithoutMill.query, "id=u -c:b -o:mill legal:commander");
assert.doesNotMatch(vm487WithoutMill.query, /(^|\s)o:mill/);

const vm487TokenMakerSetControl = resolveMazeQueryRequest({
  mode: "ai",
  input: "cards that create tokens from the strixhaven set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm487TokenMakerSetControl.query, "o:token legal:commander s:stx");
assert.ok(!vm487TokenMakerSetControl.query.includes("type:token"));
assert.ok(!vm487TokenMakerSetControl.query.includes("s:tstx"));

const vm487RedundantCommanderLegality = resolveMazeQueryRequest({
  mode: "ai",
  input: "Glint chaos commanders from the commander 2016 set legal in commander",
  options: { format: "commander" }
});
assert.equal(vm487RedundantCommanderLegality.query, "id=ubrg is:commander legal:commander s:c16");
assert.ok(!vm487RedundantCommanderLegality.diagnostics.some((diagnostic) => diagnostic.code === "parser_unresolved_term"));

const vm490PartnerAllColors = resolveMazeQueryRequest({
  mode: "ai",
  input: "cards with partner in all colors",
  options: { format: "commander" }
});
assert.equal(vm490PartnerAllColors.query, "o:partner");
assert.ok(!vm490PartnerAllColors.query.includes("kw:partner"));
assert.ok(!vm490PartnerAllColors.query.includes("set:all"));
assert.ok(!vm490PartnerAllColors.query.includes("f:commander"));
assert.ok(!vm490PartnerAllColors.diagnostics.some((diagnostic) => /Alliances|set family/i.test(diagnostic.message || "")));

const vm490PartnerRaw = resolveMazeQueryRequest({
  mode: "raw",
  input: "o:partner",
  options: { format: "commander" }
});
assert.equal(vm490PartnerRaw.query, "o:partner");
assert.equal(vm490PartnerRaw.normalized, false);

const vm490CommanderPartnerControl = resolveMazeQueryRequest({
  mode: "ai",
  input: "commanders with partner",
  options: { format: "commander" }
});
assert.equal(vm490CommanderPartnerControl.query, "kw:partner is:commander legal:commander");

for (const [cardName, expectedQuery] of [
  ["captain america", "name:\"captain america\""],
  ["A-Alrund, God of the Cosmos", "name:\"A-Alrund, God of the Cosmos\""]
]) {
  const nameResult = resolveMazeQueryRequest({
    mode: "ai",
    input: cardName,
    options: { format: "commander" }
  });
  assert.equal(nameResult.parserMode, "plain_reading", `expected ${cardName} to use a Scryfall name search`);
  assert.equal(nameResult.query, expectedQuery);
  assert.equal(nameResult.api.endpoint, "/cards/search");
  assert.notEqual(nameResult.query, "*");
  assert.ok(!nameResult.diagnostics.some((diagnostic) => diagnostic.code === "parser_unresolved_term"));
}

const vm477ExactCommanderIdentity = resolveMazeQueryRequest({
  mode: "ai",
  input: "Rakdos commanders that make treasure"
});
assert.equal(vm477ExactCommanderIdentity.parserMode, "plain_reading");
assert.equal(vm477ExactCommanderIdentity.query, "id=br o:treasure is:commander legal:commander");
assert.ok(!vm477ExactCommanderIdentity.query.includes("id<=br"));
assert.ok(!vm477ExactCommanderIdentity.query.includes("-c:c"));

const singleTokenRaw = resolveMazeQueryRequest({
  mode: "raw",
  input: "vampires",
  options: { format: "" }
});
assert.equal(singleTokenRaw.parserMode, "raw");
assert.equal(singleTokenRaw.detectedMode, "raw");
assert.equal(singleTokenRaw.query, "vampires");

const builder = resolveMazeQueryRequest({
  mode: "builder",
  builderFilters: {
    colors: ["R", "G"],
    colorOp: "id",
    types: ["Creature"],
    format: "commander",
    keywords: ["haste"],
    cmcMin: "2",
    cmcMax: "5",
    rarities: ["r"]
  }
});
assert.equal(builder.mode, "builder");
assert.equal(builder.parserMode, "builder");
assert.equal(builder.query, "id<=rg t:creature f:commander r:r mv>=2 mv<=5 kw:haste");

const launchSource = normalizeMazeSourceContext({
  origin: "archscry",
  launchContext: {
    from: "archscry",
    urlQ: "ignored",
    operatorQuery: "id=bg is:commander",
    plainReadingQuery: "Witherbloom commander candidates",
    pathType: "commanders-that-fit",
    returnUrl: "../archscry/",
    readingId: "red-reading",
    fit: "WITHERBLOOM",
    factionName: "Witherbloom College"
  }
});
assert.deepEqual(launchSource, {
  origin: "archscry",
  readingId: "red-reading",
  fit: "WITHERBLOOM",
  pathType: "commanders-that-fit",
  returnUrl: "../archscry/",
  plainReadingQuery: "Witherbloom commander candidates",
  operatorQuery: "id=bg is:commander",
  factionName: "Witherbloom College",
  from: "archscry",
  urlQ: "ignored"
});

const paths = buildMazePathEntries({
  identity: "bg",
  factionName: "Witherbloom College",
  oracleTerms: ["sacrifice", "graveyard"],
  flavorTerms: ["death", "growth"]
});
assert.equal(paths.length, 4);
assert.deepEqual(paths.map((path) => path.pathType), MAZE_DOSSIER_PATH_TYPES);
assert.equal(paths[0].query, "id=bg is:commander f:commander");
assert.equal(paths[0].plainReadingQuery, "Witherbloom College Commander-legal commanders with exactly black-green identity");

const marduPaths = buildMazePathEntries({
  identity: "rwb",
  factionName: "Mardu Horde",
  oracleTerms: ["draw", "token"],
  flavorTerms: ["war names", "charge"]
});
assert.equal(marduPaths[0].query, "id=rwb is:commander f:commander");
assert.equal(marduPaths[0].plainReadingQuery, "Mardu Horde Commander-legal commanders with exactly red-white-black identity");
assert.equal(marduPaths[1].query, "id<=rwb f:commander -is:commander -t:land (o:draw OR o:token)");
assert.ok(marduPaths.every((path) => !/\bid(?:<)?=wbr\b/i.test(path.query)));

assert.deepEqual(normalizeMazeQueryApiMetadata({
  unique: "prints",
  order: "usd",
  dir: "desc",
  endpoint: "/cards/search"
}), {
  endpoint: "/cards/search",
  unique: "prints",
  order: "usd",
  dir: "desc"
});

assert.deepEqual(normalizeMazeQueryApiMetadata({ endpoint: "/cards/named", order: "usd" }), {
  endpoint: "/cards/named"
});

assert.deepEqual(applyMazeFormatToQuery("c:u f:modern", { format: "commander" }), {
  query: "c:u f:modern",
  changed: false,
  format: ""
});

assert.deepEqual(applyMazeFormatToQuery("c:r t:creature", { format: "commander", useFormatDefault: false }), {
  query: "c:r t:creature",
  changed: false,
  format: ""
});

assert.equal(shouldApplyFormatDefault("c:r t:creature", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("type:token", {}, "commander"), false);
assert.equal(shouldApplyFormatDefault("(type:token)", {}, "commander"), false);
assert.equal(shouldApplyFormatDefault("type:treasure (t:token)", {}, "commander"), false);
assert.equal(shouldApplyFormatDefault("type:token legal:commander", {}, "commander"), false);
assert.equal(shouldApplyFormatDefault("-t:token c:r t:creature", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("oracle:token c:g", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("o:\"create a token\" c:g", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("name:\"Token Collector\" c:w", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("type:creature", { tokenObjectIntent: true }, "commander"), false);
assert.equal(shouldApplyFormatDefault("o:partner", {}, "commander"), false);
assert.equal(shouldApplyFormatDefault("o:partner c:r", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("kw:partner", {}, "commander"), true);
assert.equal(shouldApplyFormatDefault("name:\"Captain America\"", {}, "commander"), false);
assert.equal(shouldApplyFormatDefault("is:universesbeyond name:\"Captain America\"", {}, "commander"), false);
assert.equal(applyMazeFormatToQuery("o:partner", { format: "commander" }).query, "o:partner");
assert.equal(applyMazeFormatToQuery("name:\"Captain America\"", { format: "commander" }).query, "name:\"Captain America\"");

assert.deepEqual(prepareRawSyntaxQuery("o:draw AND t:creature").query, "o:draw t:creature");

console.log("Maze query contract tests passed.");
