import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createDictionaryFromSeed, getScryfallDictionaryVocabulary } from "./scryfall-dictionary.js";
import { parseScryfallNaturalLanguage, setScryfallDictionary } from "./scryfall-parser.js";
import { setPlainReadingSemanticRegistry, setScryfallGrounding } from "./scryfall-grounded-compiler.js";

const seed = JSON.parse(await readFile(new URL("./scryfall-parser-seed-2026.json", import.meta.url), "utf8"));
const grounding = JSON.parse(await readFile(new URL("../data/scryfall/grounding/scryfall-grounding.json", import.meta.url), "utf8"));
const semanticRegistry = JSON.parse(await readFile(new URL("../data/scryfall/grounding/plain-reading-semantics.json", import.meta.url), "utf8"));
const testDictionary = createDictionaryFromSeed(seed);
setScryfallDictionary(testDictionary);
setScryfallGrounding(grounding);
setPlainReadingSemanticRegistry(semanticRegistry);
const hasGroundedSquire = Boolean(grounding.aliases?.squire?.some((candidate) => candidate.kind === "typeLine"));
const keywordCatalogSmokeTerms = [
  { keyword: "Mobilize", input: "cards with mobilize", expected: "kw:mobilize" },
  { keyword: "Exhaust", input: "cards with exhaust", expected: "kw:exhaust" },
  { keyword: "Harmonize", input: "cards with harmonize", expected: "kw:harmonize" },
  { keyword: "Ravenous", input: "cards with ravenous", expected: "kw:ravenous" },
  { keyword: "Job select", input: "cards with job select", expected: "kw:\"job select\"" },
  { keyword: "Web-slinging", input: "creatures with web-slinging", expected: "type:creature kw:web-slinging" },
  { keyword: "For Mirrodin!", input: "cards with for mirrodin", expected: "kw:\"for mirrodin!\"" }
];

for (const { keyword } of keywordCatalogSmokeTerms) {
  assert.ok(
    grounding.catalogs.keywordAbilities.includes(keyword),
    `keyword catalog smoke term missing from grounding: ${keyword}`
  );
}

const keywordAbilityCases = [
  {
    // VM-475: evergreen keyword ability from the grounded catalog
    name: "keyword blue flying",
    input: "blue creatures with flying",
    expected: "type:creature c:u kw:flying",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: combat keyword ability from the grounded catalog
    name: "keyword green trample",
    input: "green creatures with trample",
    expected: "type:creature c:g kw:trample",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: combat keyword ability from the grounded catalog
    name: "keyword black deathtouch",
    input: "black creatures with deathtouch",
    expected: "type:creature c:b kw:deathtouch",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: newer evergreen protection-style keyword ability
    name: "keyword white ward",
    input: "white creatures with ward",
    expected: "type:creature c:w kw:ward",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: evasion keyword ability from the grounded catalog
    name: "keyword red menace",
    input: "red creatures with menace",
    expected: "type:creature c:r kw:menace",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: multi-word keyword ability must serialize quoted
    name: "keyword double strike",
    input: "creatures with double strike",
    expected: "type:creature kw:\"double strike\"",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: newer/current catalog keyword
    name: "keyword backup",
    input: "creatures with backup",
    expected: "type:creature kw:backup",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: newer/current catalog keyword
    name: "keyword disguise",
    input: "creatures with disguise",
    expected: "type:creature kw:disguise",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: newer/current catalog keyword without an explicit type subject
    name: "keyword toxic",
    input: "cards with toxic",
    expected: "kw:toxic",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: Commander deck product keyword
    name: "keyword squad",
    input: "creatures with squad",
    expected: "type:creature kw:squad",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: newer/current catalog keyword
    name: "keyword offspring",
    input: "creatures with offspring",
    expected: "type:creature kw:offspring",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: plural Commander subject with keyword means commander candidates
    name: "keyword commander partner",
    input: "commanders with partner",
    expected: "is:commander legal:commander kw:partner",
    expectedUnresolvedExact: []
  },
  {
    // VM-490: generic card wording asks for Oracle text and treats all colors as unconstrained.
    name: "vm490 generic partner cards in all colors",
    input: "cards with partner in all colors",
    expected: "o:partner",
    expectedNotIncludes: ["kw:partner", "game:paper", "set:all", "prefer:best"],
    expectedRecognized: ["all colors -> no color constraint"],
    expectedUnresolvedExact: []
  },
  {
    // VM-490: all-colors wording must not become the Alliances set for unrelated keywords either.
    name: "vm490 all colors is not a set",
    input: "creatures with flying in all colors",
    expectedIncludes: ["type:creature", "kw:flying"],
    expectedNotIncludes: ["game:paper", "set:all", "prefer:best"],
    expectedRecognized: ["all colors -> no color constraint"],
    expectedUnresolvedExact: []
  },
  {
    // VM-475: multi-word Commander keyword remains one keyword span
    name: "keyword commander friends forever",
    input: "commanders with friends forever",
    expected: "is:commander legal:commander kw:\"friends forever\"",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: punctuation-bearing multi-word keyword wins over Doctor type + Companion keyword
    name: "keyword commander doctors companion apostrophe",
    input: "commanders with doctor's companion",
    expected: "is:commander legal:commander kw:\"doctor's companion\"",
    expectedUnresolvedExact: [],
    expectedNotIncludes: ["type:doctor", "kw:companion"]
  },
  {
    // VM-475: overlapping multi-word keyword must not collapse to Partner
    name: "keyword commander partner with",
    input: "commanders with partner with",
    expected: "is:commander legal:commander kw:\"partner with\"",
    expectedUnresolvedExact: [],
    expectedNotIncludes: ["kw:partner"]
  },
  {
    // VM-475: keyword action currently follows compiler policy and serializes as kw
    name: "keyword action surveil",
    input: "surveil cards",
    expected: "kw:surveil",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: keyword action currently follows compiler policy and serializes as kw
    name: "keyword action proliferate",
    input: "cards that proliferate",
    expected: "kw:proliferate",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: keyword action currently follows compiler policy and serializes as kw
    name: "keyword action connive",
    input: "creatures that connive",
    expected: "type:creature kw:connive",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: action-like wording with a creature object stays Oracle text by current policy
    name: "keyword action manifest creature object",
    input: "cards that manifest creatures",
    expected: "type:creature o:manifest",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: action-like wording with a creature object stays Oracle text by current policy
    name: "keyword action suspect creature object",
    input: "cards that suspect a creature",
    expected: "type:creature o:suspect",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: negated keyword ability serializes with -kw
    name: "keyword negative flying",
    input: "creatures without flying",
    expected: "type:creature -kw:flying",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: negated keyword ability composes with colors
    name: "keyword negative menace",
    input: "red creatures without menace",
    expected: "type:creature c:r -kw:menace",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: Commander candidate phrasing and negated keyword compose
    name: "keyword negative commander partner",
    input: "commanders without partner",
    expected: "is:commander legal:commander -kw:partner",
    expectedUnresolvedExact: []
  },
  {
    // VM-490: negative Partner wording remains keyword negation while all colors stays unconstrained.
    name: "vm490 negative partner all colors control",
    input: "cards without partner in all colors",
    expected: "-kw:partner",
    expectedNotIncludes: ["o:partner", "set:all", "game:paper", "prefer:best"],
    expectedUnresolvedExact: []
  },
  {
    // VM-475: protection from red must not be misread as color negation
    name: "keyword protection target color",
    input: "creatures with protection from red",
    expected: "type:creature o:\"protection from red\"",
    expectedNotIncludes: ["-c:r", "kw:protection"],
    expectedUnresolvedExact: []
  },
  {
    // VM-475: hyphenated input normalizes to the official multi-word keyword
    name: "keyword first strike hyphen",
    input: "creatures with first-strike",
    expected: "type:creature kw:\"first strike\"",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: hyphenated input normalizes to the official multi-word keyword
    name: "keyword double strike hyphen",
    input: "creatures with double-strike",
    expected: "type:creature kw:\"double strike\"",
    expectedUnresolvedExact: []
  },
  {
    // VM-475: no-apostrophe user input still resolves to the punctuation-bearing catalog keyword
    name: "keyword doctors companion no apostrophe",
    input: "creatures with doctors companion",
    expected: "type:creature kw:\"doctor's companion\"",
    expectedUnresolvedExact: [],
    expectedNotIncludes: ["type:doctor", "kw:companion"]
  },
  {
    // VM-475: hyphenated input normalizes to the official multi-word keyword
    name: "keyword partner with hyphen",
    input: "creatures with partner-with",
    expected: "type:creature kw:\"partner with\"",
    expectedUnresolvedExact: [],
    expectedNotIncludes: ["kw:partner"]
  },
  ...keywordCatalogSmokeTerms.map(({ keyword, input, expected }) => ({
    // VM-475: fixed catalog-smoke list proves current/newer Scryfall keyword abilities stay visible to the compiler
    name: `keyword catalog smoke ${keyword.toLowerCase()}`,
    input,
    expected,
    expectedUnresolvedExact: []
  }))
];

const legacyKeywordSuggestions = [
  "cascade", "convoke", "cycling", "deathtouch", "defender", "double strike",
  "equip", "escape", "explore", "first strike", "flash", "flying", "haste",
  "hexproof", "indestructible", "investigate", "kicker", "landfall", "lifelink",
  "menace", "morph", "proliferate", "protection", "prowess", "reach", "scry",
  "shroud", "surveil", "trample", "vigilance", "ward"
].sort();
const vocabulary = getScryfallDictionaryVocabulary(testDictionary);
assert.deepEqual(
  legacyKeywordSuggestions.filter((keyword) => !vocabulary.keywords.includes(keyword)),
  [],
  "derivedKeywords missing legacy autocomplete entries"
);
for (const expected of ["prowess", "first strike", "wizard", "soldier", "vehicle", "creature", "commander"]) {
  assert.ok(
    [...vocabulary.keywords, ...vocabulary.subtypes, ...vocabulary.cardTypes, ...vocabulary.formats].includes(expected),
    `dictionary vocabulary missing ${expected}`
  );
}

const cases = [
  ...keywordAbilityCases,
  {
    // VM-471: resolves grounded subtype and Spider-Man set family instead of raw prose
    name: "grounded spider-man villains",
    input: "all villains from the spiderman set",
    expectedIncludes: ["type:villain", "set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm", "game:paper", "prefer:best"],
    expectedDoesNotMatch: ["\\ball\\b", "\\bvillains\\b", "\\bspiderman\\b", "\\bfrom\\b", "\\bthe\\b"],
    expectedUnresolvedExact: [],
    expectedIgnored: ["all", "from", "the", "set"],
    expectedAppliedDefaults: ["game:paper", "prefer:best"],
    minConfidence: 0.8
  },
  {
    // VM-483: the proven manual phrase "marvel set" resolves to a scoped umbrella across current Marvel families.
    name: "grounded marvel umbrella",
    input: "all heroes in the marvel set",
    expectedIncludes: ["type:hero", "game:paper", "prefer:best", "set:msh", "set:amsh", "set:msc", "set:tmsh", "set:spm", "set:spe", "set:aspm", "set:pspm", "set:tspm", "set:fmsc", "set:tmsc", "set:mar", "set:lmar", "set:omb"],
    expectedDoesNotMatch: ["\\bmarvel\\b"],
    expectedUnresolvedExact: [],
    expectedWarningAbsent: ["could not choose one set family"],
    minConfidence: 0.8
  },
  {
    // VM-471: typo resolves to Bloomburrow; Squire is asserted only if Scryfall catalogs contain it
    name: "grounded bloomburrow typo",
    input: "all squires in the bloomburough set",
    expectedIncludes: hasGroundedSquire ? ["type:squire", "s:blb"] : ["s:blb"],
    expectedUnresolvedExact: hasGroundedSquire ? [] : ["squires"],
    expectedWarnings: hasGroundedSquire ? [] : ["Unresolved terms: squires"],
    minConfidence: hasGroundedSquire ? 0.75 : 0.6
  },
  {
    // VM-471: all sets means no set clause
    name: "grounded insects all sets",
    input: "all insects in all sets",
    expected: "type:insect",
    expectedUnresolvedExact: [],
    expectedIgnored: ["all", "sets"],
    minConfidence: 0.8
  },
  {
    // VM-471: Commander candidate intent is distinct from generic Commander legality
    name: "grounded dragon commander color text",
    input: "all dragons with counters that are red blue or black or all 3 and have haste and can be a commander",
    expectedIncludes: ["type:dragon", "id<=ubr", "o:counter", "kw:haste", "is:commander", "legal:commander"],
    expectedUnresolvedExact: [],
    expectedAlternativeIncludes: ["+1/+1 counter", "counter target"],
    minConfidence: 0.85
  },
  {
    // VM-477: bare commander candidates keep Commander eligibility plus semantic text.
    name: "vm477 bare commanders draw",
    input: "commanders that draw cards",
    expectedIncludes: ["is:commander", "legal:commander", "otag:draw"],
    expectedUnresolvedExact: [],
    expectedAllAlternativesInclude: ["is:commander", "legal:commander"]
  },
  {
    // VM-477: bare commander candidates work with lifegain phrasing.
    name: "vm477 bare commanders lifegain",
    input: "commanders with lifegain",
    expectedIncludes: ["is:commander", "legal:commander", "o:\"gain life\""],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: eligibility does not erase the specific legendary creature request.
    name: "vm477 legendary creatures can be commanders",
    input: "legendary creatures that can be commanders",
    expectedIncludes: ["type:legendary", "type:creature", "is:commander", "legal:commander"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: singular commander-card wording is still candidate intent.
    name: "vm477 commander cards make tokens",
    input: "commander cards that make tokens",
    expectedIncludes: ["is:commander", "legal:commander", "o:token"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: named identity commander searches are exact candidate identities.
    name: "vm477 rakdos commanders exact",
    input: "Rakdos commanders that make treasure",
    expectedIncludes: ["id=br", "is:commander", "legal:commander", "o:treasure"],
    expectedNotIncludes: ["id<=br", "id=wbr", "id=wubrg", "-c:c"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: named shard identity does not leak to WUBRG or partial pairs.
    name: "vm477 bant commanders exact no leak",
    input: "Bant commanders",
    expectedIncludes: ["id=wug", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id=wg", "id=ug", "id<=wug"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: named wedge identity is exact for commander candidates.
    name: "vm477 mardu commanders exact",
    input: "Mardu commanders",
    expectedIncludes: ["id=wbr", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id<=wbr"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: public Glint four-color nickname resolves to its intended exact identity only.
    name: "vm477 glint commanders exact",
    input: "Glint commanders",
    expectedIncludes: ["id=ubrg", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id<=ubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: explicit mono Commander candidate wording is exact identity.
    name: "vm477 mono blue commanders exact",
    input: "mono blue commanders",
    expectedIncludes: ["id=u", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id<=u", "c:u"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: explicit five-color Commander candidate wording is exact identity.
    name: "vm477 five color commanders exact",
    input: "five color commanders that draw cards",
    expectedIncludes: ["id=wubrg", "is:commander", "legal:commander", "otag:draw"],
    expectedNotIncludes: ["id<=wubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: includes-color Commander wording must not become mono-blue exact identity.
    name: "vm477 commanders with blue includes identity",
    input: "commanders with blue",
    expectedIncludes: ["id>=u", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=u", "id<=u", "c:u"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: alternate includes-color wording uses identity inclusion.
    name: "vm477 commanders include blue identity",
    input: "commanders that include blue",
    expectedIncludes: ["id>=u", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=u", "id<=u"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: explicit color-identity wording uses includes identity.
    name: "vm477 blue in color identity",
    input: "commanders with blue in the color identity",
    expectedIncludes: ["id>=u", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=u", "id<=u", "s:ced"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: deck-support intent without colors does not invent identity.
    name: "vm477 commander deck no identity",
    input: "cards for my commander deck that draw cards",
    expectedIncludes: ["legal:commander", "otag:draw"],
    expectedDoesNotMatch: ["\\bid[<>=:]"],
    expectedUnresolvedExact: [],
    expectedAllAlternativesInclude: ["legal:commander"]
  },
  {
    // VM-477: legal-in-Commander is format legality, not deck identity.
    name: "vm477 blue wizards legal commander actual color",
    input: "blue wizards legal in commander",
    expectedIncludes: ["type:wizard", "c=u", "legal:commander"],
    expectedNotIncludes: ["id<=u", "id=u", "id>=u", "-c:c"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: semantic negation covers mill before dictionary Oracle fallback can add a positive clause.
    name: "vm487 without mill negates semantic",
    input: "cards for my mono blue commander deck in all sets that are not black and without mill",
    expectedIncludes: ["id=u", "-c:b", "-o:mill", "legal:commander"],
    expectedDoesNotMatch: ["(^|\\s)o:mill"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: positive mill wording keeps the same broad Oracle search.
    name: "vm487 positive mill semantic",
    input: "blue cards that mill cards",
    expectedIncludes: ["c:u", "o:mill"],
    expectedNotIncludes: ["-o:mill"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: counterspell wording is distinct from generic counters.
    name: "vm477 counter spells means counterspells",
    input: "blue cards that counter spells",
    expectedIncludes: ["c:u", "otag:counterspell"],
    expectedNotIncludes: ["o:counter"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: counters remain counter-object text, not counterspell intent.
    name: "vm477 counters not counterspells",
    input: "blue cards with counters",
    expectedIncludes: ["c:u", "o:counter"],
    expectedNotIncludes: ["otag:counterspell"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: semantic negation targets the resolved lifegain group.
    name: "vm477 without lifegain negates semantic",
    input: "white creatures without lifegain",
    expectedIncludes: ["type:creature", "c:w", "-o:/gain(s)?( [^\\n.]*)? life/", "-kw:lifelink"],
    expectedDoesNotMatch: ["(^|\\s)o:\"gain life\""],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: semantic negation targets ramp, not the raw word.
    name: "vm477 without ramp negates semantic",
    input: "green cards without ramp",
    expectedIncludes: ["c:g", "-otag:ramp"],
    expectedDoesNotMatch: ["(^|\\s)otag:ramp"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: semantic negation targets counterspell intent.
    name: "vm477 without counterspells negates semantic",
    input: "blue cards without counterspells",
    expectedIncludes: ["c:u", "-otag:counterspell"],
    expectedDoesNotMatch: ["(^|\\s)otag:counterspell"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: keyword negation remains keyword-specific.
    name: "vm477 without devoid negates keyword",
    input: "cards without devoid",
    expectedIncludes: ["-kw:devoid"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: checklist semantic phrases resolve without raw leftovers.
    name: "vm477 five color commanders draw and fix",
    input: "five color WUBRG commanders that draw cards and fix mana",
    expectedIncludes: ["id=wubrg", "is:commander", "legal:commander", "otag:draw", "produces:any"],
    expectedNotIncludes: ["id<=wubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: support fit, colorless mana production, color negation, and keyword negation compose.
    name: "vm477 five color deck colorless mana without devoid",
    input: "cards for my five color commander deck that make colorless mana not colorless without devoid",
    expectedIncludes: ["id<=wubrg", "legal:commander", "produces:c", "-c:c", "-kw:devoid"],
    expectedDoesNotMatch: ["(^|\\s)id:c", "(^|\\s)c:c"],
    expectedUnresolvedExact: []
  },
  {
    // VM-477: late alternatives preserve full Commander/color/semantic context.
    name: "vm477 alternatives preserve commander context",
    input: "Rakdos commanders that draw cards",
    expectedIncludes: ["id=br", "is:commander", "legal:commander", "otag:draw"],
    expectedAlternativeIncludes: ["o:draw"],
    expectedAllAlternativesInclude: ["id=br", "is:commander", "legal:commander"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: token objects refine the resolved playable parent set to its token child.
    name: "vm487 token child set preserves context",
    input: "Silverquill inkling tokens from the strixhaven set legal in commander",
    expectedIncludes: ["type:inkling", "type:token", "c<=wb", "s:tstx"],
    expectedNotIncludes: ["o:token", "legal:commander", "s:stx", "set:sstx"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedAlternatives: 0,
    expectedUnresolvedExact: []
  },
  {
    // VM-477: repair relaxations are generated from the full query model.
    name: "vm477 validation relaxations preserve context",
    input: "Rakdos commanders from the strixhaven set that draw cards",
    expectedIncludes: ["id=br", "is:commander", "legal:commander", "otag:draw", "s:stx"],
    expectedRelaxationIncludes: [
      { category: "set", includes: ["id=br", "is:commander", "legal:commander", "otag:draw"] },
      { category: "functional", includes: ["id=br", "is:commander", "legal:commander", "s:stx"] }
    ],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 1, single-color actual card adjective is exact card color.
    name: "vm481 blue wizards final fantasy exact actual color",
    input: "blue wizards from the final fantasy set legal in commander",
    expectedIncludes: ["type:wizard", "c=u", "legal:commander", "s:fin"],
    expectedNotIncludes: ["c:u", "id<=u", "id=u"],
    expectedSomeAlternativeIncludes: [["type:wizard", "c=u", "legal:commander", "set:fin"]],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 2, explicit mono deck-support is exact mono identity and robustly excludes lifegain.
    name: "vm481 mono black deck without lifegain exact",
    input: "cards for my mono black commander deck in all sets that are not red and without lifegain",
    expectedIncludes: ["id=b", "-c:r", "-o:/gain(s)?( [^\\n.]*)? life/", "-kw:lifelink", "legal:commander"],
    expectedNotIncludes: ["id<=b", "o:\"gain life\""],
    expectedUnresolvedExact: []
  },
  {
    // VM-483: Marvel umbrella set no longer blocks for the proven manual row.
    name: "vm483 black heroes marvel umbrella",
    input: "black heroes from the marvel set legal in commander",
    expectedIncludes: ["type:hero", "c=b", "legal:commander", "game:paper", "prefer:best", "set:msh", "set:amsh", "set:msc", "set:tmsh", "set:spm", "set:spe", "set:aspm", "set:pspm", "set:tspm", "set:fmsc", "set:tmsc", "set:mar", "set:lmar", "set:omb"],
    expectedDoesNotMatch: ["could not choose one set family"],
    expectedWarningAbsent: ["could not choose one set family"],
    expectedUnresolvedExact: []
  },
  {
    // VM-483: Tarkir umbrella set no longer blocks for the proven manual row.
    name: "vm483 red dragons tarkir umbrella",
    input: "red dragons from the tarkir set legal in commander",
    expectedIncludes: ["type:dragon", "c=r", "legal:commander", "game:paper", "prefer:best", "set:dtk", "set:pdtk", "set:ptkdf", "set:tdtk", "set:ttdc", "set:tdm", "set:atdm", "set:ptdm", "set:tdc", "set:ttdm", "set:ytdm"],
    expectedDoesNotMatch: ["could not choose one set family"],
    expectedWarningAbsent: ["could not choose one set family"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 5, non-mono deck-support stays fit-based while lifegain negation broadens.
    name: "vm481 rakdos deck without lifegain fit",
    input: "cards for my Rakdos commander deck in all sets that are not white and without lifegain",
    expectedIncludes: ["id<=br", "-c:w", "-o:/gain(s)?( [^\\n.]*)? life/", "-kw:lifelink", "legal:commander"],
    expectedNotIncludes: ["id=br", "o:\"gain life\""],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: named multicolor actual-card types use a non-colorless within-identity pool.
    name: "vm487 rakdos villains actual-card color pool",
    input: "Rakdos villains from the spiderman set legal in commander",
    expectedIncludes: ["type:villain", "c<=br", "-c:c", "legal:commander", "game:paper", "set:spm", "set:spe", "set:aspm", "set:pspm", "set:tspm", "prefer:best"],
    expectedNotIncludes: ["c=br", "c:br", "id<=br", "id=br"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: the actual-card pool rule is general to named multicolor type/subtype searches.
    name: "vm487 orzhov knights actual-card color pool",
    input: "Orzhov knights",
    expectedIncludes: ["type:knight", "c<=wb", "-c:c"],
    expectedNotIncludes: ["c=wb", "id<=wb", "id=wb"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: explicit exact-color phrasing continues to override color-pool behavior.
    name: "vm487 exact rakdos actual-card color",
    input: "exactly Rakdos villains legal in commander",
    expectedIncludes: ["type:villain", "c=br", "legal:commander"],
    expectedNotIncludes: ["c<=br", "-c:c", "id=br"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 7, recur-creatures is recursion semantics, not an unresolved word.
    name: "vm481 orzhov commanders recur creatures",
    input: "Orzhov commanders in all sets that drain life and recur creatures",
    expectedIncludes: ["id=wb", "o:/lose[s]? life/", "o:return", "o:graveyard", "is:commander", "legal:commander"],
    expectedNotIncludes: ["type:creature"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 8, Orzhov card-type adjective uses actual colors with no outside colors.
    name: "vm481 orzhov clerics innistrad no outside color",
    input: "Orzhov clerics from the innistrad set legal in commander",
    expectedIncludes: ["type:cleric", "c<=wb", "-c:c", "legal:commander", "s:isd"],
    expectedNotIncludes: ["c:wb", "c=wb", "id<=wb"],
    expectedSomeAlternativeIncludes: [["type:cleric", "c<=wb", "-c:c", "legal:commander", "set:isd"]],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 9, counter-object wording must not become counterspells.
    name: "vm481 silverquill counters not counterspells",
    input: "Silverquill commanders in all sets that put counters on creatures and drain opponents",
    expectedIncludes: ["id=wb", "o:\"put a +1/+1 counter\"", "o:\"each opponent\"", "o:\"lose life\"", "is:commander", "legal:commander"],
    expectedNotIncludes: ["o:counter", "otag:counterspell", "o:\"counter target\""],
    expectedAlternatives: 0,
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 10, subtype tokens are token objects, not cards that make tokens.
    name: "vm481 silverquill inkling token objects",
    input: "Silverquill inkling tokens from the strixhaven set legal in commander",
    expectedIncludes: ["type:inkling", "type:token", "c<=wb", "s:tstx"],
    expectedNotIncludes: ["o:token", "legal:commander", "-c:c", "s:stx"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-484: subtype token phrases remain token-object searches and suppress Commander legality.
    name: "vm484 pest token objects",
    input: "pest tokens from the strixhaven set legal in commander",
    expectedIncludes: ["type:pest", "type:token", "s:tstx"],
    expectedNotIncludes: ["o:token", "legal:commander", "f:commander", "s:stx"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: an explicit token/substitute set is not rewritten to a sibling token set.
    name: "vm487 explicit token set stays exact",
    input: "pest tokens from the sstx set legal in commander",
    expectedIncludes: ["type:pest", "type:token", "s:sstx"],
    expectedNotIncludes: ["s:tstx", "legal:commander", "f:commander"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: playable parents with multiple true token children become a token-only set group.
    name: "vm487 multiple token child sets",
    input: "treasure tokens from the final fantasy set legal in commander",
    expectedIncludes: ["type:treasure", "type:token", "game:paper", "set:tfin", "set:wfin", "prefer:best"],
    expectedNotIncludes: ["s:fin", "set:fin", "legal:commander", "f:commander"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: parents without a grounded token child preserve their original set clause.
    name: "vm487 token object set without child stays parent",
    input: "pest tokens from the limited edition alpha set legal in commander",
    expectedIncludes: ["type:pest", "type:token", "s:lea"],
    expectedNotIncludes: ["legal:commander", "f:commander"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: set refinement remains gated to token objects, not token-maker card searches.
    name: "vm487 token maker keeps playable set",
    input: "cards that create tokens from the strixhaven set legal in commander",
    expectedIncludes: ["o:token", "legal:commander", "s:stx"],
    expectedNotIncludes: ["type:token", "s:tstx", "f:commander"],
    expectedWarningAbsent: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-484: object-style treasure tokens are token prints, not Commander-legal cards.
    name: "vm484 treasure token objects",
    input: "treasure tokens legal in commander",
    expectedIncludes: ["type:treasure", "type:token"],
    expectedNotIncludes: ["o:treasure", "o:token", "legal:commander", "f:commander"],
    expectedWarnings: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-484: token-maker card wording must not be consumed by token-object detection.
    name: "vm484 create tokens card intent",
    input: "cards that create tokens legal in commander",
    expectedIncludes: ["o:token", "legal:commander"],
    expectedNotIncludes: ["type:token", "f:commander"],
    expectedWarningAbsent: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-484: create creature tokens is still card text intent, with creature as the card target.
    name: "vm484 create creature tokens card intent",
    input: "cards that create creature tokens legal in commander",
    expectedIncludes: ["type:creature", "o:token", "legal:commander"],
    expectedNotIncludes: ["type:token", "f:commander"],
    expectedWarningAbsent: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-484: make tokens uses token-maker semantics, not token-object semantics.
    name: "vm484 make tokens card intent",
    input: "cards that make tokens legal in commander",
    expectedIncludes: ["o:token", "legal:commander"],
    expectedNotIncludes: ["type:token", "f:commander"],
    expectedWarningAbsent: ["Token objects are not Commander deck-legal cards"],
    expectedUnresolvedExact: []
  },
  {
    // VM-483: attack-with-tokens must stay semantically bound, not loose o:token + o:attack fragments.
    name: "vm483 mardu token attack bound sacrifice",
    input: "Mardu commanders in all sets that attack with tokens and sacrifice creatures",
    expectedIncludes: ["id=wbr", "o:/attack(s|ing)?[^.\\n]*token|token[^.\\n]*attack(s|ing)?/", "o:sacrifice", "is:commander", "legal:commander"],
    expectedNotIncludes: ["o:token", "o:attack"],
    expectedUnresolvedExact: []
  },
  {
    // VM-483: Mardu warriors keep within-Mardu color grammar while Tarkir umbrella no longer blocks.
    name: "vm483 mardu warriors tarkir umbrella",
    input: "Mardu warriors from the tarkir set legal in commander",
    expectedIncludes: ["type:warrior", "c<=wbr", "-c:c", "legal:commander", "game:paper", "prefer:best", "set:dtk", "set:pdtk", "set:ptkdf", "set:tdtk", "set:ttdc", "set:tdm", "set:atdm", "set:ptdm", "set:tdc", "set:ttdm", "set:ytdm"],
    expectedNotIncludes: ["c=wbr", "c:wbr", "id<=wbr"],
    expectedDoesNotMatch: ["could not choose one set family"],
    expectedWarningAbsent: ["could not choose one set family"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 13, Glint/Chaos full four-color wording resolves once without Dimir leakage.
    name: "vm481 glint chaos no duplicate identity",
    input: "Glint chaos blue black red green commanders in all sets that make treasure and draw cards",
    expectedIncludes: ["id=ubrg", "o:treasure", "otag:draw", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id=4"],
    expectedDoesNotMatch: ["\\bid=ub\\b"],
    expectedRelaxationIncludes: [
      {
        category: "abilities",
        label: "Use any matching commander",
        includes: ["id=ubrg", "is:commander", "legal:commander"],
        notIncludes: ["o:treasure", "otag:draw", "partner"]
      }
    ],
    expectedUnresolvedExact: []
  },
  {
    // VM-487: redundant candidate legality wording is consumed after candidate detection.
    name: "vm487 commander candidate legality has no unresolved terms",
    input: "Glint chaos commanders from the commander 2016 set legal in commander",
    expectedIncludes: ["id=ubrg", "is:commander", "legal:commander", "s:c16"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 14, colorless commander identity and colorless mana production remain separate.
    name: "vm481 colorless commanders colorless mana separate",
    input: "colorless commanders in all sets that make colorless mana and are artifacts",
    expectedIncludes: ["id:c", "produces:c", "type:artifact", "is:commander", "legal:commander"],
    expectedNotIncludes: ["c:c"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: retest row 15, valid expected-zero/caveat query remains intact.
    name: "vm481 five color fix mana draw caveat",
    input: "five color WUBRG commanders in all sets that fix mana and draw cards",
    expectedIncludes: ["id=wubrg", "otag:draw", "produces:any", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id<=wubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-481: hidden Glint negative regression from the retest notes.
    name: "vm481 hidden glint deck without lifegain",
    input: "cards for my Glint commander deck in all sets that are not white and without lifegain",
    expectedIncludes: ["id<=ubrg", "-c:w", "-o:/gain(s)?( [^\\n.]*)? life/", "-kw:lifelink", "legal:commander"],
    expectedNotIncludes: ["o:\"gain life\"", "id=ubrg", "id=ub"],
    expectedUnresolvedExact: []
  },
  {
    // VM-482: generic four-color commander candidates use Scryfall identity-count syntax.
    name: "vm482 four color commanders generic",
    input: "four color commanders",
    expectedIncludes: ["id=4", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id=ubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-482: numeric four-color wording is equivalent to the word form.
    name: "vm482 numeric four color commanders generic",
    input: "4 color commanders",
    expectedIncludes: ["id=4", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id=ubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-482: generic four-color identity preserves resolved semantic filters.
    name: "vm482 four color commanders draw",
    input: "four-color commanders that draw cards",
    expectedIncludes: ["id=4", "otag:draw", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=wubrg", "id=ubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-482: named four-color identity wins over generic count wording.
    name: "vm482 glint four color commanders named wins",
    input: "Glint four color commanders",
    expectedIncludes: ["id=ubrg", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=4", "id=wubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-482: named four-color identity still wins when the generic phrase comes first.
    name: "vm482 four color glint commanders named wins",
    input: "four color Glint commanders",
    expectedIncludes: ["id=ubrg", "is:commander", "legal:commander"],
    expectedNotIncludes: ["id=4", "id=wubrg"],
    expectedUnresolvedExact: []
  },
  {
    // VM-471: explicit Scryfall syntax in Plain Reading is preserved
    name: "grounded explicit scryfall syntax",
    input: "type:villain set:spm",
    expected: "type:villain set:spm",
    expectedUnresolvedExact: [],
    expectedRecognized: ["explicit Scryfall syntax"],
    minConfidence: 0.9
  },
  {
    // VM-472: bounded boolean OR over same-field type entities
    name: "grounded boolean dragons or angels",
    input: "dragons or angels",
    expected: "(type:dragon OR type:angel)",
    expectedUnresolvedExact: [],
    minConfidence: 0.75
  },
  {
    // VM-472: color words feed color grammar before boolean OR
    name: "grounded color pool red or blue creatures",
    input: "red or blue creatures",
    expectedIncludes: ["c<=ur", "type:creature"],
    expectedUnresolvedExact: [],
    minConfidence: 0.75
  },
  {
    // VM-472: negation is a modifier on the following color span
    name: "grounded color pool with exclusion",
    input: "red or blue but not black creatures",
    expectedIncludes: ["c<=ur", "-c:b", "type:creature"],
    expectedUnresolvedExact: [],
    minConfidence: 0.75
  },
  {
    // VM-472: negation does not invert adjacent positive type spans
    name: "grounded legendary vampires not red",
    input: "legendary vampires not red",
    expectedIncludes: ["type:legendary", "type:vampire", "-c:r"],
    expectedUnresolvedExact: [],
    minConfidence: 0.75
  },
  {
    // Tests basic multi-color and type mapping
    name: "red and black orcs",
    input: "red and black orcs",
    expected: "c:br t:orc"
  },
  {
    // Tests exact color intent with symbolic Oracle text
    name: "only izzet plus one counters",
    input: "only red and blue with +1/+1 counters",
    expected: "c=ur o:/\\+1\\/\\+1 counter/",
    expectedAssumptions: ["exact card colors"],
    expectedUnresolvedExact: []
  },
  {
    // Tests exact color intent without a guild alias
    name: "exactly blue red creatures",
    input: "exactly blue red creatures",
    expected: "c=ur t:creature",
    expectedAssumptions: ["exact card colors"]
  },
  {
    // Tests keyword mapping (kw:) for basic abilities
    name: "green haste",
    input: "green haste",
    expected: "c:g kw:haste"
  },
  {
    // Tests multi-color searches provide alternate color-pool interpretations
    name: "red green deathtouch ambiguity",
    input: "red and green with deathtouch",
    expected: "c:rg kw:deathtouch",
    expectedAlternatives: 3,
    expectedAlternativeIncludes: [
      "c<=rg kw:deathtouch",
      "id<=rg kw:deathtouch",
      "c=rg kw:deathtouch"
    ],
    expectedAssumptions: ["multiple color words"],
    minConfidence: 0.55
  },
  {
    // Tests mapping generic concepts (removal) to specific Oracle text strings
    name: "blue removal",
    input: "blue removal",
    expectedIncludes: ["c:u", "otag:removal"],
    expectedAlternativeIncludes: ["destroy target", "exile target"]
  },
  {
    // Tests mapping slang (ETB) to official game terms (enters)
    name: "red blue elemental ETB",
    input: "any red and blue elemental with an ETB",
    expected: "c:ur t:elemental o:enters"
  },
  {
    // Tests crew as Oracle text intent, not an unresolved word
    name: "red vehicles with crew",
    input: "red vehicles with crew",
    expected: "c:r t:vehicle o:crew",
    expectedUnresolvedExact: []
  },
  {
    // Tests sacrifice as Oracle text intent paired with token text
    name: "blood token sacrifice",
    input: "blood token sacrifice",
    expectedIncludes: ["o:blood", "o:sacrifice"],
    expectedRecognized: ["blood token -> o:blood", "sacrifice -> o:sacrifice"],
    expectedUnresolvedExact: []
  },
  {
    // Tests subtype and keyword vocabulary from the local dictionary
    name: "blue wizard prowess",
    input: "blue wizards with prowess",
    expected: "c:u t:wizard kw:prowess",
    expectedUnresolvedExact: []
  },
  {
    // Tests Commander format plus subtype and multi-word keyword vocabulary
    name: "commander soldier first strike",
    input: "white soldiers with first strike in commander",
    expectedIncludes: ["c:w", "legal:commander", "t:soldier", "kw:\"first strike\""],
    expectedNotIncludes: ["id<=w"],
    expectedUnresolvedExact: []
  },
  {
    // Tests handling of logical OR within Oracle text queries
    name: "black -1/-1 or protection from red",
    input: "Black cards that give me -1/-1 but aso any protection from red",
    expectedIncludes: ["c:b", "o:\"-1/-1\"", "o:\"protection from red\""]
  },
  {
    // Tests color identity (id) and format filters for specific archetypes
    name: "rakdos commander treasure",
    input: "cards for my rakdos commander deck that make treasure",
    expectedIncludes: ["id<=br", "legal:commander", "o:treasure"]
  },
  {
    // Tests mana value (mv) comparison operators
    name: "modern blue creatures cost 2 or less",
    input: "modern legal blue creatures that cost 2 or less",
    expected: "f:modern c:u t:creature mv<=2"
  },
  {
    // Tests the negation operator (-) for colors
    name: "not blue creatures with flying",
    input: "not blue creatures with flying",
    expected: "-c:u t:creature kw:flying"
  },
  {
    // Tests finding multiple alternative query structures for a single intent
    name: "counter cards in black",
    input: "counter cards in black",
    expectedIncludes: ["c:b", "o:counter"],
    expectedAlternatives: 2
  },
  {
    // VM-490: unresolved two-word input falls back to an executable Scryfall name search.
    name: "vm490 bare Captain America card name",
    input: "captain america",
    expectedMode: "search",
    expected: "name:\"captain america\"",
    expectedApi: { endpoint: "/cards/search" },
    expectedUnresolvedExact: []
  },
  {
    // VM-490: punctuation-bearing names are not reduced to an incidental printed card type.
    name: "vm490 bare A-Alrund card name",
    input: "A-Alrund, God of the Cosmos",
    expectedMode: "search",
    expected: "name:\"A-Alrund, God of the Cosmos\"",
    expectedApi: { endpoint: "/cards/search" },
    expectedNotIncludes: ["type:god"],
    expectedUnresolvedExact: []
  },
  {
    // Tests specific logic for exact card name resolution
    name: "exact named card lookup",
    input: "card named Lightning Bolt",
    expectedMode: "exact_name",
    expected: "Lightning Bolt",
    expectedApi: { endpoint: "/cards/named" },
    expectedApiAbsent: ["unique", "order", "dir"]
  },
  {
    // Tests format legality and rarity constraints common in Pauper
    name: "pauper legal red burn",
    input: "pauper legal red burn spells",
    expectedIncludes: ["f:pauper", "c:r", "o:damage"]
  },
  {
    // Tests currency mapping and budget constraint logic
    name: "budget commander staples",
    input: "commander staples under 150 dollars",
    expected: "legal:commander usd<=150"
  },
  {
    // Tests keyword mapping within specific format constraints
    name: "pioneer white creatures with ward",
    input: "white creatures in pioneer with ward",
    expected: "f:pioneer c:w t:creature kw:ward"
  },
  {
    // Tests multiple negations and type conjunctions
    name: "legendary creatures not green or white",
    input: "legendary creatures that are not green or white",
    expected: "t:legendary t:creature -c:g -c:w"
  },
  {
    // Tests artist (a:) and rarity (r:) field mapping
    name: "specific artist and rarity",
    input: "mythic rares illustrated by Magali Villeneuve",
    expected: "r:mythic a:\"Magali Villeneuve\""
  },
  {
    // Tests complex numeric comparison for Power (pow) and Toughness (tou)
    name: "power and toughness range",
    input: "creatures with power 4 or more and toughness 2 or less",
    expected: "t:creature pow>=4 tou<=2"
  },
  {
    // Tests specific set codes (s:) and card frame attributes
    name: "cards with specific set and frame",
    input: "full art cards from Strixhaven",
    expected: "s:stx is:fullart"
  },
  {
    // Tests inclusion of one term while strictly negating another
    name: "complex oracle text negation",
    input: "blue cards that draw cards but don't discard",
    expectedIncludes: ["c:u", "otag:draw", "-o:discard"]
  },
  {
    // Tests identification of double-faced card (dfc) attributes
    name: "transformed or double-faced",
    input: "double faced black cards",
    expected: "is:dfc c:b"
  },
  {
    // Tests handling of logical groups across different card types
    name: "artifact or enchantment removal in green",
    input: "green cards that destroy artifacts or enchantments",
    expected: "c:g (o:\"destroy target artifact\" OR o:\"destroy target enchantment\")"
  },
  {
    // Tests handling of strict budget constraints
    name: "commander budget cap",
    input: "commander staples under 150 dollars",
    expected: "legal:commander usd<=150"
  },
  {
    // Tests format-specific rarity constraints common in Pauper
    name: "pauper legal red burn",
    input: "pauper legal red burn spells",
    expectedIncludes: ["f:pauper", "c:r", "o:damage"]
  },
  {
    // Tests handling of multi-word quoted strings and artist searches
    name: "specific artist and rarity",
    input: "mythic rares by Magali Villeneuve",
    expected: "r:mythic a:\"Magali Villeneuve\""
  },
  {
    // Tests complex numeric ranges for Power and Toughness
    name: "power and toughness range",
    input: "creatures with power 4 or more and toughness 2 or less",
    expected: "t:creature pow>=4 tou<=2"
  },
  {
    // Tests "implicit" terms that map to complex Oracle text (e.g., 'Blink' or 'Flicker')
    name: "implicit blink effect",
    input: "white blink spells",
    expectedIncludes: ["c:w", "o:exile", "o:return", "o:battlefield"]
  },
  {
    // Tests negation of multiple color identities
    name: "non-green non-white legendary",
    input: "legendary creatures that are not green or white",
    expected: "t:legendary t:creature -c:g -c:w"
  },
  {
    // Tests handling of mana value (CMC) ranges
    name: "mana value range",
    input: "cards with cmc between 3 and 5",
    expected: "mv>=3 mv<=5"
  },
  {
    // Tests specific card attributes like "Full Art" or "Extended Art"
    name: "full art strixhaven cards",
    input: "full art cards from Strixhaven",
    expected: "s:stx is:fullart"
  },
  {
    // Tests handling of hybrid mana symbols or gold cards
    name: "rakdos gold cards",
    input: "rakdos gold cards",
    expected: "c:br is:gold"
  },
  {
    // Tests price filtering using MTGO "Tix" instead of USD
    name: "mtgo budget",
    input: "modern cards under 5 tix",
    expected: "f:modern tix<=5"
  },
  {
    // Tests "Aristocrats" theme: maps a community archetype to mechanical triggers (sac + drain)
    name: "aristocrats synergy",
    input: "black and white cards that trigger when a creature dies",
    expectedIncludes: ["c:wb", "o:whenever", "o:creature dies"]
  },
  {
    // Tests "Infinite Combo" enablers: specifically looking for pieces like Rooftop Storm
    name: "zombie combo enabler",
    input: "blue cards that make zombies cost 0",
    expected: "c:u o:\"zombie spells you cast cost {0}\""
  },
  {
    // Tests "Vehicle" archetype: specific support for Shorikai or Pilot strategies
    name: "vehicle support",
    input: "white or blue cards that can crew vehicles",
    expectedIncludes: ["c<=wu", "o:crew"]
  },
  {
    // Tests "Knight Tribal": specifically for Eminence or discard/recursion synergies
    name: "knight recursion",
    input: "knights that return from the graveyard",
    expectedIncludes: ["t:knight", "o:return", "o:graveyard"]
  },
  {
    // Tests "Graveyard Hate": mapping a strategy to multiple mechanical keywords
    name: "graveyard hate",
    input: "non-black cards that exile graveyards",
    expectedIncludes: ["-c:b", "o:/exile.*graveyard/"]
  },
  {
    // Tests "Protection": finding specific defensive keywords for high-value targets
    name: "commander protection",
    input: "equipment that gives hexproof or shroud",
    expected: "t:equipment (kw:hexproof OR kw:shroud)"
  },
  {
    // Tests "Final Fantasy" flavor: mapping "Final Fantasy" to the specific set code
    name: "final fantasy set search",
    input: "legendary creatures from the Final Fantasy set",
    expected: "t:legendary t:creature s:fin" 
  },
  {
    // Tests "Phyrexian" flavor: specific keyword 'Toxic' or 'Poison'
    name: "phyrexian toxic",
    input: "white creatures with toxic",
    expected: "c:w t:creature kw:toxic"
  },
  {
    // Tests "Ramp": mapping utility to specific land-to-battlefield mechanics
    name: "green ramp",
    input: "green cards that put lands onto the battlefield",
    expectedIncludes: ["c:g", "o:put", "o:land", "o:battlefield"]
  },
  {
    // Tests "Strixhaven School" logic: mapping a school name to its color pair
    name: "strixhaven lorehold",
    input: "Lorehold cards that cost 3",
    expected: "c:wr mv:3"
  },
  {
    // Tests "Mana Dorks": mapping community slang to specific mechanical utility
    name: "mana dorks",
    input: "green creatures that tap for mana",
    expectedIncludes: ["c:g", "t:creature", "o:\"{T}: add\""]
  },
  {
    // Tests "Utility Lands": filtering by non-mana production utility
    name: "utility lands",
    input: "lands that don't tap for mana but have abilities",
    expectedIncludes: ["t:land", "-o:\"{T}: add\""]
  },
  {
    // Tests "Print History": finding original printings versus reprints
    name: "original printings",
    input: "first printing of cards illustrated by RK Post",
    expected: "a:\"RK Post\" is:firstprinting"
  },
  {
    // Tests "Restricted Logic": finding cards that are legal in one format but banned in another
    name: "format crossover",
    input: "cards legal in legacy but banned in modern",
    expected: "f:legacy banned:modern"
  },
  {
    // Tests "Complex Cost Symbols": identifying specific mana requirements like Phyrexian or Hybrid
    name: "phyrexian mana search",
    input: "cards with phyrexian mana in their cost",
    expected: "is:phyrexian"
  },
  {
    // Tests "Border/Frame variation": for collectors looking for specific aesthetics
    name: "retro frame artifacts",
    input: "artifacts with the retro frame",
    expected: "t:artifact frame:retro"
  },
  {
    // Tests "Token Producers": mapping specific token types to oracle text
    name: "treasure and clue producers",
    input: "cards that make treasures and clues",
    expectedIncludes: ["o:treasure", "o:clue"]
  },
  {
    // Tests "Colorless identity": distinguishing between colorless cards and colorless identity
    name: "true colorless identity",
    input: "colorless cards for a colorless commander",
    expected: "id:c legal:commander"
  },
  {
    // Tests "Language/Region": finding specific localized versions
    name: "japanese alt art",
    input: "japanese language cards with alternate art",
    // Scryfall resolves is:alternate narrowly for Japanese alternate-art printings; is:alt-art remains broader.
    expected: "lang:ja is:alternate"
  },
  {
    // Tests "Nested Logic": complex parenthetical grouping for specific triggers
    name: "draw or discard triggers",
    input: "blue cards that trigger when I draw or discard",
    expected: "c:u (o:\"whenever you draw\" OR o:\"whenever you discard\")"
  },
  {
    // Tests typo tolerance for common color/type/keyword misspellings
    name: "typo haste",
    input: "gren creaturs with hast",
    expected: "c:g t:creature kw:haste"
  },
  {
    // Tests typo tolerance around Commander intent
    name: "misspelled commander",
    input: "rakdos comandr cards that make treasure",
    expectedIncludes: ["legal:commander", "is:commander", "id=br", "o:treasure"],
    expectedNotIncludes: ["id<=br"]
  },
  {
    // Tests shorthand color pair parsing
    name: "common MTG shorthand",
    input: "br orcs with menace",
    expected: "c:br t:orc kw:menace"
  },
  {
    // Tests ambiguity diagnostics for counter/counters meaning
    name: "blue counter ambiguity",
    input: "blue counter cards",
    expectedIncludes: ["c:u", "o:counter"],
    expectedAlternatives: 2,
    expectedWarnings: ["Ambiguous parse"]
  },
  {
    // Tests unresolved diagnostics for vague support language
    name: "token support ambiguity",
    input: "white soldier support",
    expectedIncludes: ["c:w", "t:soldier", "o:support"],
    expectedUnresolvedExact: [],
    minConfidence: 0.45
  },
  {
    // Tests fuzzy budget shorthand without a precise dollar amount
    name: "cheap commander removal",
    input: "cheap commander removal",
    expectedIncludes: ["legal:commander", "usd<=1", "otag:removal"],
    expectedAlternativeIncludes: ["destroy target"],
    expectedRecognized: ["price: cheap"]
  },
  {
    // Tests player slang around Selesnya token strategies
    name: "go wide tokens",
    input: "selesnya go wide token cards",
    expectedIncludes: ["c:wg", "o:token"]
  },
  {
    // Tests player slang around Izzet instant/sorcery payoffs
    name: "spellslinger payoff",
    input: "izzet spellslinger payoffs",
    expectedIncludes: ["c:ur", "o:whenever", "o:cast", "(o:instant OR o:sorcery)"]
  },
  {
    // Tests Commander-first cEDH shorthand with sort metadata
    name: "cedh commander deck",
    input: "cedh commander deck",
    expectedIncludes: ["legal:commander"],
    expectedApi: { order: "edhrec" },
    expectedRecognized: ["filter: cEDH"]
  },
  {
    // Tests Pauper Commander shorthand from the corpus
    name: "pauper commander deck",
    input: "pauper commander deck",
    expectedIncludes: ["f:paupercommander"],
    expectedRecognized: ["filter: Pauper Commander"],
    minConfidence: 0.4
  },
  {
    // Tests Historic Brawl vs Standard Brawl separation
    name: "historic brawl deck",
    input: "historic brawl deck",
    expectedIncludes: ["f:brawl", "-f:standard"],
    minConfidence: 0.4
  },
  {
    // Tests Standard Brawl phrasing
    name: "standard brawl deck",
    input: "standard brawl deck",
    expectedIncludes: ["f:standard", "f:brawl"],
    minConfidence: 0.4
  },
  {
    // Tests four-color nickname support
    name: "chaos commander deck",
    input: "chaos commander deck",
    expectedIncludes: ["id<=ubrg", "legal:commander"],
    minConfidence: 0.44
  },
  {
    // Tests common commander alias support
    name: "white blue commander deck",
    input: "white blue commander deck",
    expectedIncludes: ["id<=wu", "legal:commander"],
    minConfidence: 0.44
  },
  {
    // Tests color-pie break coverage from the corpus
    name: "green counterspells",
    input: "green counterspells",
    expectedIncludes: ["c:g", "o:/counter.*spell/", "otag:counterspell"],
    minConfidence: 0.5
  },
  {
    // Tests color-pie break coverage from the corpus
    name: "red lifegain",
    input: "red lifegain",
    expected: "c:r o:\"gain life\"",
    minConfidence: 0.5
  },
  {
    // Tests white removal corpus coverage
    name: "white creature removal",
    input: "white creature removal",
    expected: "c:w (o:/destroy.*creature/ OR o:/exile.*creature/)",
    minConfidence: 0.5
  },
  {
    // Tests graveyard hate phrasing from the corpus
    name: "graveyard hate",
    input: "graveyard hate",
    expected: "o:/exile.*graveyard/"
  },
  {
    // Tests ETB creature phrasing from the corpus
    name: "enters the battlefield creatures",
    input: "enters the battlefield creatures",
    expected: "is:etb t:creature"
  },
  {
    // Tests spellslinger payoff phrasing from the corpus
    name: "instant and sorcery payoffs",
    input: "instant and sorcery payoffs",
    expected: "o:whenever o:cast (o:instant OR o:sorcery)"
  },
  {
    // Tests the common counterspell role search
    name: "counterspells",
    input: "counterspells",
    expected: "otag:counterspell",
    minConfidence: 0.5
  },
  {
    // Tests common tutor phrasing from the corpus
    name: "search your library tutor",
    input: "search your library for a land",
    expected: "otag:tutor t:land"
  },
  {
    // Tests common card-draw shorthand from the corpus
    name: "one mana cantrips",
    input: "one mana cantrips",
    expected: "mv=1 o:draw",
    minConfidence: 0.35
  },
  {
    // Tests common mana dork shorthand from the corpus
    name: "mana dorks shorthand",
    input: "mana dorks",
    expected: "t:creature o:\"{T}: add\""
  },
  {
    name: "banned in modern",
    input: "banned in modern",
    expected: "banned:modern"
  },
  {
    name: "restricted in vintage",
    input: "restricted in vintage",
    expected: "restricted:vintage"
  },
  {
    name: "board wipe functional tag",
    input: "board wipes",
    expected: "otag:board-wipe",
    expectedAlternativeIncludes: ["destroy all creatures"]
  },
  {
    name: "mana rock functional tag",
    input: "mana rocks",
    expected: "otag:mana-rock",
    expectedAlternativeIncludes: ["t:artifact", "produces:any"]
  },
  {
    name: "free sacrifice outlet functional tag",
    input: "free sacrifice outlet",
    expected: "otag:free-sacrifice-outlet",
    expectedAlternativeIncludes: ["otag:sacrifice-outlet"]
  },
  {
    name: "exclude digital",
    input: "exclude digital cards",
    expected: "not:digital"
  },
  {
    name: "paper cards",
    input: "paper cards",
    expected: "game:paper"
  },
  {
    name: "art search",
    input: "art: goblin warrior",
    expected: "art:\"goblin warrior\"",
    minConfidence: 0.4
  },
  {
    name: "flavor text search",
    input: "flavor text to be",
    expected: "ft:\"to be\"",
    minConfidence: 0.4
  },
  {
    name: "artist search",
    input: "artist Magali Villeneuve",
    expected: "a:\"Magali Villeneuve\"",
    minConfidence: 0.4
  },
  {
    name: "a search",
    input: "a: Magali Villeneuve",
    expected: "a:\"Magali Villeneuve\"",
    minConfidence: 0.4
  },
  {
    name: "set search",
    input: "set stx",
    expected: "s:stx",
    minConfidence: 0.4
  },
  {
    name: "s search",
    input: "s:fin",
    expected: "s:fin",
    minConfidence: 0.4
  },
  {
    name: "produces mana",
    input: "produces mana",
    expected: "produces:any"
  },
  {
    name: "produces red green mana",
    input: "produces red and green mana",
    expected: "produces:rg"
  },
  {
    name: "unique cards metadata",
    input: "unique cards",
    expected: "*",
    expectedApi: { unique: "cards" },
    minConfidence: 0.4
  },
  {
    name: "include extras",
    input: "include extras",
    expected: "include:extras"
  },
  {
    name: "prefer newest",
    input: "prefer newest",
    expected: "prefer:newest",
    expectedApi: { order: "name" }
  },
  {
    name: "prefer old",
    input: "prefer old",
    expected: "prefer:oldest"
  },
  {
    name: "newest cards sorting metadata",
    input: "newest cards",
    expected: "*",
    expectedApi: { order: "released", dir: "desc" },
    minConfidence: 0.4
  },
  {
    name: "is commander",
    input: "is commander",
    expected: "is:commander legal:commander"
  },
  {
    name: "commander legal",
    input: "commander legal",
    expected: "legal:commander",
    minConfidence: 0.45
  },
  {
    name: "power 2 or less",
    input: "power 2 or less",
    expected: "pow<=2"
  },
  {
    name: "toughness 3 or less",
    input: "toughness 3 or less",
    expected: "tou<=3"
  },
  {
    name: "power less than strict",
    input: "power < 3",
    expected: "pow<3"
  },
  {
    name: "power greater than strict",
    input: "power > 4",
    expected: "pow>4"
  },
  {
    name: "toughness explicit less or equal",
    input: "toughness <= 3",
    expected: "tou<=3"
  },
  {
    name: "toughness explicit greater or equal",
    input: "toughness >= 5",
    expected: "tou>=5"
  },
  {
    name: "no duplicate oracle or terms",
    input: "draw or draw cards",
    expected: "otag:draw",
    expectedNotIncludes: ["(otag:draw)"],
    minConfidence: 0.4
  },
  {
    // Tests lifegain payoff phrasing
    name: "lifegain payoff",
    input: "white black cards whenever I gain life",
    expected: "c:wb o:\"gain life\"",
    minConfidence: 0.4
  },
  {
    // Tests total nonsense should not pretend to be a confident query
    name: "garbage input",
    input: "banana chair lightning friendship",
    maxConfidence: 0.45,
    expectedUnresolved: ["banana", "chair", "lightning", "friendship"],
    expectedWarnings: ["Low-confidence deterministic parse"]
  },
  {
    // Tests empty input as a graceful low-confidence no-op
    name: "empty input",
    input: "",
    expected: "",
    maxConfidence: 0.2
  },
  {
    // Tests punctuation-only input as graceful low confidence
    name: "punctuation only",
    input: "??? !!!",
    maxConfidence: 0.3,
    expectedWarnings: ["Low-confidence deterministic parse"]
  },
  {
    // Tests one valid token mixed with nonsense should remain cautious
    name: "nonsense with one valid term",
    input: "blue spaghetti volcano",
    expectedIncludes: ["c:u"],
    expectedUnresolved: ["spaghetti", "volcano"],
    expectedWarnings: ["Unresolved terms: spaghetti, volcano"],
    maxConfidence: 0.6
  }
];

let failures = 0;

for (const testCase of cases) {
  const result = parseScryfallNaturalLanguage(testCase.input);
  try {
    if (testCase.expectedMode) assert.equal(result.mode, testCase.expectedMode);
    if (testCase.expected) assertQueryEquivalent(result.query, testCase.expected, testCase.name);
    if (testCase.expectedIncludes) {
      for (const expected of testCase.expectedIncludes) {
        assert.ok(queryIncludes(result.query, expected), `${testCase.name}: missing ${expected} in ${result.query}`);
      }
    }
    if (testCase.expectedNotIncludes) {
      for (const expected of testCase.expectedNotIncludes) {
        assert.ok(!queryIncludes(result.query, expected), `${testCase.name}: unexpected ${expected} in ${result.query}`);
      }
    }
    if (testCase.expectedDoesNotMatch) {
      for (const expected of testCase.expectedDoesNotMatch) {
        assert.doesNotMatch(result.query, new RegExp(expected), `${testCase.name}: unexpected pattern ${expected} in ${result.query}`);
      }
    }
    if (testCase.expectedApi) {
      for (const [key, expected] of Object.entries(testCase.expectedApi)) {
        assert.equal(result.api?.[key], expected, `${testCase.name}: expected api.${key} ${expected}, got ${result.api?.[key]}`);
      }
    }
    if (testCase.expectedApiAbsent) {
      for (const key of testCase.expectedApiAbsent) {
        assert.ok(!Object.prototype.hasOwnProperty.call(result.api || {}, key), `${testCase.name}: unexpected api.${key} ${result.api?.[key]}`);
      }
    }
    if (testCase.expectedAlternatives) assert.equal(result.alternatives.length, testCase.expectedAlternatives);
    if (testCase.expectedAlternativeIncludes) {
      const queries = result.alternatives.map((alternative) => alternative.query).join(" | ");
      for (const expected of testCase.expectedAlternativeIncludes) {
        assert.ok(queries.includes(expected), `${testCase.name}: missing alternative ${expected} in ${queries}`);
      }
    }
    if (testCase.expectedAllAlternativesInclude) {
      assert.ok(result.alternatives.length > 0, `${testCase.name}: expected at least one alternative`);
      for (const alternative of result.alternatives) {
        for (const expected of testCase.expectedAllAlternativesInclude) {
          assert.ok(queryIncludes(alternative.query, expected), `${testCase.name}: alternative missing ${expected} in ${alternative.query}`);
        }
      }
    }
    if (testCase.expectedSomeAlternativeIncludes) {
      assert.ok(result.alternatives.length > 0, `${testCase.name}: expected at least one alternative`);
      for (const expectedGroup of testCase.expectedSomeAlternativeIncludes) {
        assert.ok(
          result.alternatives.some((alternative) => expectedGroup.every((expected) => queryIncludes(alternative.query, expected))),
          `${testCase.name}: no alternative included ${expectedGroup.join(", ")} in ${result.alternatives.map((alternative) => alternative.query).join(" | ")}`
        );
      }
    }
    if (testCase.expectedRelaxationIncludes) {
      const relaxations = result.validationPlan?.relaxations || [];
      for (const expectation of testCase.expectedRelaxationIncludes) {
        const relaxation = relaxations.find((item) => item.category === expectation.category);
        assert.ok(relaxation, `${testCase.name}: missing ${expectation.category} relaxation in ${JSON.stringify(relaxations)}`);
        if (expectation.label) assert.equal(relaxation.label, expectation.label, `${testCase.name}: unexpected ${expectation.category} relaxation label`);
        for (const expected of expectation.includes || []) {
          assert.ok(queryIncludes(relaxation.query, expected), `${testCase.name}: ${expectation.category} relaxation missing ${expected} in ${relaxation.query}`);
        }
        for (const expected of expectation.notIncludes || []) {
          assert.ok(!queryIncludes(relaxation.query, expected), `${testCase.name}: ${expectation.category} relaxation unexpectedly included ${expected} in ${relaxation.query}`);
        }
      }
    }
    if (Object.prototype.hasOwnProperty.call(testCase, "expectedUnresolvedExact")) {
      assert.deepEqual(result.unresolved, testCase.expectedUnresolvedExact);
    }
    if (testCase.expectedUnresolved) {
      for (const expected of testCase.expectedUnresolved) {
        assert.ok(result.unresolved.includes(expected), `${testCase.name}: missing unresolved ${expected} in ${result.unresolved.join(", ")}`);
      }
    }
    if (testCase.expectedAssumptions) {
      for (const expected of testCase.expectedAssumptions) {
        assert.ok(result.assumptions.some((item) => item.includes(expected)), `${testCase.name}: missing assumption ${expected} in ${result.assumptions.join(", ")}`);
      }
    }
    if (testCase.expectedWarnings) {
      for (const expected of testCase.expectedWarnings) {
        assert.ok(result.warnings.some((item) => item.includes(expected)), `${testCase.name}: missing warning ${expected} in ${result.warnings.join(", ")}`);
      }
    }
    if (testCase.expectedWarningAbsent) {
      for (const expected of testCase.expectedWarningAbsent) {
        assert.ok(!result.warnings.some((item) => item.includes(expected)), `${testCase.name}: unexpected warning ${expected} in ${result.warnings.join(", ")}`);
      }
    }
    if (testCase.expectedIgnored) {
      for (const expected of testCase.expectedIgnored) {
        assert.ok(result.ignored?.includes(expected), `${testCase.name}: missing ignored ${expected} in ${(result.ignored || []).join(", ")}`);
      }
    }
    if (testCase.expectedAppliedDefaults) {
      for (const expected of testCase.expectedAppliedDefaults) {
        assert.ok(result.appliedDefaults?.includes(expected), `${testCase.name}: missing applied default ${expected} in ${(result.appliedDefaults || []).join(", ")}`);
      }
    }
    if (testCase.expectedRecognized) {
      for (const expected of testCase.expectedRecognized) {
        assert.ok(result.recognized.some((item) => item.includes(expected)), `${testCase.name}: missing recognized ${expected} in ${result.recognized.join(", ")}`);
      }
    }
    if (Number.isFinite(testCase.maxConfidence)) {
      assert.ok(result.confidence <= testCase.maxConfidence, `${testCase.name}: confidence too high (${result.confidence})`);
    } else {
      const minimum = Number.isFinite(testCase.minConfidence) ? testCase.minConfidence : 0.5;
      assert.ok(result.confidence >= minimum, `${testCase.name}: confidence too low (${result.confidence})`);
    }
    if (result.mode === "search") {
      assertBalancedQuery(result.query, testCase.name);
      assertNoDuplicateClauses(result.query, testCase.name);
      assertNoContradictoryClauses(result.query, testCase.name);
    }
    console.log(`PASS ${testCase.name}: ${result.query}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(`  input: ${testCase.input}`);
    console.error(`  query: ${result.query}`);
    console.error(`  confidence: ${result.confidence}`);
    console.error(`  error: ${error.message}`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`\n${cases.length} parser cases passed.`);
}

function assertQueryEquivalent(actual, expected, name) {
  if (actual === expected) return;
  assert.equal(canonicalQuery(actual), canonicalQuery(expected), `${name}: query mismatch`);
}

function queryIncludes(query, expected) {
  if (query.includes(expected)) return true;
  return canonicalQuery(query).includes(canonicalFragment(expected));
}

function canonicalQuery(query) {
  return splitQueryFragments(String(query || ""))
    .map(canonicalFragment)
    .sort((left, right) => left.localeCompare(right))
    .join(" ")
    .trim();
}

function canonicalFragment(fragment) {
  return String(fragment || "")
    .trim()
    .replace(/\bt:/gi, "type:")
    .replace(/\bc([:=])([wubrg]{2,5})\b/gi, (_, op, colors) => `c${op}${sortColorLetters(colors)}`)
    .replace(/\bc<=([wubrg]{2,5})\b/gi, (_, colors) => `c<=${sortColorLetters(colors)}`)
    .replace(/\bid<=([wubrg]{2,5})\b/gi, (_, colors) => `id<=${sortColorLetters(colors)}`)
    .replace(/\bid>=([wubrg]{1,5})\b/gi, (_, colors) => `id>=${sortColorLetters(colors)}`)
    .replace(/\bid=([wubrg]{2,5})\b/gi, (_, colors) => `id=${sortColorLetters(colors)}`)
    .replace(/\s+/g, " ");
}

function splitQueryFragments(query) {
  const fragments = [];
  let current = "";
  let depth = 0;
  let inQuote = false;
  let inRegex = false;
  for (let index = 0; index < query.length; index += 1) {
    const char = query[index];
    const prev = query[index - 1];
    if (char === "\"" && !inRegex && prev !== "\\") inQuote = !inQuote;
    if (char === "/" && !inQuote && prev !== "\\" && /[:(]\s*$/.test(query.slice(0, index))) inRegex = !inRegex;
    if (!inQuote && !inRegex && char === "(") depth += 1;
    if (!inQuote && !inRegex && char === ")") depth = Math.max(0, depth - 1);
    if (!inQuote && !inRegex && depth === 0 && /\s/.test(char)) {
      if (current.trim()) fragments.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) fragments.push(current.trim());
  return fragments;
}

function sortColorLetters(colors) {
  const order = ["w", "u", "b", "r", "g"];
  const set = new Set(String(colors || "").toLowerCase().split(""));
  return order.filter((color) => set.has(color)).join("");
}

function assertBalancedQuery(query, name) {
  let depth = 0;
  let inQuote = false;
  let inRegex = false;
  const value = String(query || "");
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const prev = value[index - 1];
    if (char === "\"" && !inRegex && prev !== "\\") inQuote = !inQuote;
    if (char === "/" && !inQuote && prev !== "\\" && /[:(]\s*$/.test(value.slice(0, index))) inRegex = !inRegex;
    if (inQuote || inRegex) continue;
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    assert.ok(depth >= 0, `${name}: query has closing paren before opening paren: ${query}`);
  }
  assert.equal(depth, 0, `${name}: query has unbalanced parentheses: ${query}`);
  assert.equal(inQuote, false, `${name}: query has unclosed quote: ${query}`);
}

function assertNoDuplicateClauses(query, name) {
  const fragments = splitQueryFragments(String(query || ""))
    .map(canonicalFragment)
    .filter((fragment) => fragment && fragment !== "*");
  assert.deepEqual(
    fragments.filter((fragment, index) => fragments.indexOf(fragment) !== index),
    [],
    `${name}: query has duplicate clauses: ${query}`
  );
}

function assertNoContradictoryClauses(query, name) {
  const fragments = splitQueryFragments(String(query || "")).map(canonicalFragment);
  const includes = new Set(fragments.filter((fragment) => !fragment.startsWith("-")));
  const excludes = fragments.filter((fragment) => fragment.startsWith("-")).map((fragment) => fragment.slice(1));
  const contradictions = excludes.filter((fragment) => includes.has(fragment));
  assert.deepEqual(contradictions, [], `${name}: query includes and excludes the same clause: ${query}`);
}
