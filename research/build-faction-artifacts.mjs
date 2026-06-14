import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const modulePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(modulePath);
const repoRoot = path.resolve(__dirname, "..");
const rawRoot = path.join(repoRoot, "data", "raw-factions");
const displayPath = path.join(repoRoot, "data", "factions.json");
const identityLayersPath = path.join(repoRoot, "data", "identity-layers.json");
const placementModelPath = path.join(repoRoot, "data", "placement-model.json");
const placementSchemaPath = path.join(repoRoot, "data", "placement-model.schema.json");
const factionContextPath = path.join(repoRoot, "supabase", "functions", "guild-recruiter", "faction-context.ts");

const MODEL_VERSION = "vox-mana-adaptive-placement-v1";
const RESULT_VERSION = "2026-05-10";

const RAW_TO_KEY = {
  white: "W",
  blue: "U",
  black: "B",
  red: "R",
  green: "G",
  azorius_senate: "WU",
  bant: "BANT",
  boros_legion: "WR",
  cult_of_rakdos: "BR",
  esper: "ESPER",
  grixis: "GRIXIS",
  jund: "JUND",
  naya: "NAYA",
  abzan: "ABZAN",
  temur: "TEMUR",
  sultai: "SULTAI",
  mardu: "MARDU",
  jeskai: "JESKAI",
  yore: "YORE",
  glint: "GLINT",
  dune: "DUNE",
  ink: "INK",
  witch: "WITCH",
  colorless: "COLORLESS",
  wubrg: "WUBRG",
  golgari_swarm: "BG",
  gruul_clans: "RG",
  house_dimir: "UB",
  izzet_league: "UR",
  lorehold: "LOREHOLD",
  orzhov_syndicate: "WB",
  prismari: "PRISMARI",
  quandrix: "QUANDRIX",
  selesnya_conclave: "WG",
  silverquill: "SILVERQUILL",
  simic_combine: "UG",
  witherbloom: "WITHERBLOOM",
};

const KEY_TO_RAW = Object.fromEntries(Object.entries(RAW_TO_KEY).map(([raw, key]) => [key, raw]));

const RAW_PROFILE_ENRICHMENT_KEYS = new Set([
  "YORE",
  "GLINT",
  "DUNE",
  "INK",
  "WITCH",
  "LOREHOLD",
  "BANT",
  "ESPER",
  "GRIXIS",
  "JUND",
  "NAYA",
  "ABZAN",
  "TEMUR",
  "SULTAI",
  "MARDU",
  "JESKAI",
  "PRISMARI",
  "QUANDRIX",
  "SILVERQUILL",
  "WITHERBLOOM",
  "WUBRG",
]);

const SUPPRESS_UNBACKED_PUBLIC_RICHNESS_KEYS = new Set([]);

const SUPPRESS_UNBACKED_FLAVOR_ANCHOR_KEYS = new Set([
  "YORE",
  "GLINT",
  "DUNE",
  "INK",
  "WITCH",
]);

const BIOLOGICAL_PRIORS = {
  W: {
    archetype: "The Shelter Architect",
    primary_foundation: "Care",
    secondary_foundation: "Authority",
    risk_signal: "low risk",
    inhibitor_trigger:
      "Treats every shared rule as illegitimate, even when the alternative leaves the vulnerable exposed.",
  },
  U: {
    archetype: "The Possibility Architect",
    primary_foundation: "Fairness",
    secondary_foundation: "Authority",
    risk_signal: "low-medium risk",
    inhibitor_trigger:
      "Treats knowledge, planning, or education as sterile delay when careful understanding would prevent avoidable harm.",
  },
  B: {
    archetype: "The Self-Sovereign Operator",
    primary_foundation: "Liberty",
    secondary_foundation: "Authority",
    risk_signal: "high agency risk",
    inhibitor_trigger:
      "Outsources survival to systems or promises that may not protect them when the cost arrives.",
  },
  R: {
    archetype: "The Ignition Heart",
    primary_foundation: "Liberty",
    secondary_foundation: "Care",
    risk_signal: "volatile immediacy risk",
    inhibitor_trigger:
      "Waits for permission, perfect certainty, or social approval until the honest moment goes cold.",
  },
  G: {
    archetype: "The Rooted Becoming",
    primary_foundation: "Sanctity",
    secondary_foundation: "Loyalty",
    risk_signal: "stagnation risk",
    inhibitor_trigger:
      "Rejects natural limits, inherited strengths, or patient growth unless life can be redesigned into a preferred shape.",
  },
  WU: {
    archetype: "The Institutional Stabilizer",
    primary_foundation: "Authority",
    secondary_foundation: "Fairness",
    risk_signal: "low-risk",
    inhibitor_trigger:
      "Open contempt for rules, process, and institutional legitimacy; treats order as oppression by default.",
  },
  WR: {
    archetype: "The Protective Intervener",
    primary_foundation: "Care",
    secondary_foundation: "Fairness",
    risk_signal: "moderate-high risk",
    inhibitor_trigger:
      "Moral passivity in the face of harm; prefers neutrality, delay, or self-protection when someone needs defending.",
  },
  UB: {
    archetype: "The Hidden Information Operator",
    primary_foundation: "Liberty",
    secondary_foundation: "Authority",
    risk_signal: "calculated risk",
    inhibitor_trigger:
      "Compulsive transparency; believes all information should be shared openly regardless of risk, timing, or leverage.",
  },
  BG: {
    archetype: "The Resilient Reclaimer",
    primary_foundation: "Sanctity",
    secondary_foundation: "Fairness",
    risk_signal: "low-medium risk",
    inhibitor_trigger:
      "Disgust toward decay, death, dirt, failure, or the marginalized; needs life to look clean, respectable, and untouched.",
  },
  RG: {
    archetype: "The Primal Liberator",
    primary_foundation: "Liberty",
    secondary_foundation: "Sanctity",
    risk_signal: "high risk",
    inhibitor_trigger:
      "Comfort with bureaucratic domestication; prefers permission, compliance, and institutional safety over wild autonomy.",
  },
  UR: {
    archetype: "The Experimental Spark",
    primary_foundation: "Liberty",
    secondary_foundation: "Fairness",
    risk_signal: "moderate-high risk",
    inhibitor_trigger:
      "Risk-averse proceduralism; refuses experiments unless outcomes are already predictable and approved.",
  },
  WB: {
    archetype: "The Obligation Architect",
    primary_foundation: "Authority",
    secondary_foundation: "Sanctity",
    risk_signal: "low-medium risk",
    inhibitor_trigger:
      "Reflexive debt-forgiveness and anti-hierarchy; rejects obligation, inheritance, contracts, and accumulated power as inherently illegitimate.",
  },
  BR: {
    archetype: "The Transgressive Performer",
    primary_foundation: "Liberty",
    secondary_foundation: "Sanctity",
    risk_signal: "very high risk",
    inhibitor_trigger:
      "Need for respectability, emotional safety, and polite restraint above authenticity, intensity, or release.",
  },
  WG: {
    archetype: "The Communal Harmonizer",
    primary_foundation: "Loyalty",
    secondary_foundation: "Care",
    risk_signal: "low risk",
    inhibitor_trigger:
      "Absolute individual sovereignty; refuses any group bond that asks the self to yield, soften, or merge.",
  },
  UG: {
    archetype: "The Adaptive Biodesigner",
    primary_foundation: "Care",
    secondary_foundation: "Liberty",
    risk_signal: "moderate risk",
    inhibitor_trigger:
      "Bodily or natural-form absolutism; believes living systems must remain untouched even when adaptation would prevent collapse.",
  },
  BANT: {
    archetype: "The Communal Champion",
    primary_foundation: "Loyalty",
    secondary_foundation: "Authority",
    risk_signal: "low-medium honor-order risk",
    inhibitor_trigger:
      "Treats excellence as private self-authorization, raw instinct, or abstract optimization rather than accountable power carried for a living community.",
  },
  ESPER: {
    archetype: "The Perfecting Systems Architect",
    primary_foundation: "Authority",
    secondary_foundation: "Fairness",
    risk_signal: "medium-high perfection-control risk",
    inhibitor_trigger:
      "Rejects planning, optimization, and controlled improvement as dehumanizing by default, even when deliberate redesign would prevent avoidable harm.",
  },
  GRIXIS: {
    archetype: "The Survival Strategist",
    primary_foundation: "Liberty",
    secondary_foundation: "Authority",
    risk_signal: "high survival-agency risk",
    inhibitor_trigger:
      "Outsources survival to systems, permission, or shared order when immediate calculated self-advocacy is required.",
  },
  JUND: {
    archetype: "The Instinctive Survivor",
    primary_foundation: "Liberty",
    secondary_foundation: "Sanctity",
    risk_signal: "high instinct-appetite risk",
    inhibitor_trigger:
      "Waits for permission, abstract approval, or sterile control when survival asks for honest instinct and consequence-bearing action.",
  },
  NAYA: {
    archetype: "The Living World Guardian",
    primary_foundation: "Sanctity",
    secondary_foundation: "Loyalty",
    risk_signal: "medium abundance-instinct risk",
    inhibitor_trigger:
      "Mistakes control, extraction, or isolated scale for belonging when the living whole asks for protective instinct and care.",
  },
  ABZAN: {
    archetype: "The Ancestral Endurer",
    primary_foundation: "Loyalty",
    secondary_foundation: "Authority",
    risk_signal: "medium ancestral-duty risk",
    inhibitor_trigger:
      "Turns family continuity into exclusion, rigidity, political burden, or duty that outlives consent.",
  },
  TEMUR: {
    archetype: "The Elemental Survivor",
    primary_foundation: "Sanctity",
    secondary_foundation: "Liberty",
    risk_signal: "medium instinct-attunement risk",
    inhibitor_trigger:
      "Treats survival as suspicion, isolation, or raw force when the terrain, memory, and living signal ask to be heard first.",
  },
  SULTAI: {
    archetype: "The Ruthless Resource Converter",
    primary_foundation: "Liberty",
    secondary_foundation: "Authority",
    risk_signal: "high resource-conversion risk",
    inhibitor_trigger:
      "Refuses to use available bodies, secrets, costs, or openings when survival asks for calculated conversion before the advantage is wasted.",
  },
  MARDU: {
    archetype: "The Oathbound Raider",
    primary_foundation: "Liberty",
    secondary_foundation: "Authority",
    risk_signal: "high martial-commitment risk",
    inhibitor_trigger:
      "Waits for permission, comfort, or perfect safety when the honest opening asks for decisive action under a code.",
  },
  JESKAI: {
    archetype: "The Disciplined Cunning Adept",
    primary_foundation: "Fairness",
    secondary_foundation: "Authority",
    risk_signal: "medium disciplined-action risk",
    inhibitor_trigger:
      "Mistakes practice, restraint, or study for the whole answer when trained insight is asking to move.",
  },
  YORE: {
    archetype: "The Engineered Agency Architect",
    primary_foundation: "Authority",
    secondary_foundation: "Liberty",
    risk_signal: "high over-optimization risk",
    inhibitor_trigger:
      "Treats natural closure, organic belonging, or patient growth as final when agency is asking for a constructed answer.",
  },
  GLINT: {
    archetype: "The Storm-Fed Opportunist",
    primary_foundation: "Liberty",
    secondary_foundation: "Sanctity",
    risk_signal: "high predation-volatility risk",
    inhibitor_trigger:
      "Treats civic restraint, imposed order, or stabilizing duty as the only trustworthy answer when appetite, adaptation, and living force are asking to move first.",
  },
  DUNE: {
    archetype: "The Common-Front Linebreaker",
    primary_foundation: "Loyalty",
    secondary_foundation: "Liberty",
    risk_signal: "high force-forward risk",
    inhibitor_trigger:
      "Mistakes detached contemplation, delay, or perfect modeling for the only adult answer when the line needs bodies, cost, ignition, and persistence moving together now.",
  },
  INK: {
    archetype: "The Commons Keeper",
    primary_foundation: "Care",
    secondary_foundation: "Fairness",
    risk_signal: "high self-erasure risk",
    inhibitor_trigger:
      "Treats private need, guarded consent, or personal limits as selfish by default when the gift needs protection in order to keep moving.",
  },
  WITCH: {
    archetype: "The Patient Cultivation Schemer",
    primary_foundation: "Authority",
    secondary_foundation: "Care",
    risk_signal: "high sterile-control risk",
    inhibitor_trigger:
      "Treats speed, impulse, spectacle, or emotional release as the center when patient cultivation is asking for protected, calculated growth.",
  },
  COLORLESS: {
    archetype: "The Outside-System Architect",
    primary_foundation: "Precision",
    secondary_foundation: "Constraint",
    risk_signal: "high conflation risk",
    inhibitor_trigger:
      "Collapses generic mana, colorless mana, artifacts, Eldrazi, Wastes, Devoid, five-color Eldrazi, or Phyrexia into one undifferentiated Colorless identity.",
  },
  WUBRG: {
    archetype: "The Full-Spectrum Integrator",
    primary_foundation: "Integration",
    secondary_foundation: "Plurality",
    risk_signal: "high dilution risk",
    inhibitor_trigger:
      "Expands until every answer is included, even when the plan no longer has a center.",
  },
  SILVERQUILL: {
    archetype: "The Rhetorical Status Shaper",
    primary_foundation: "Authority",
    secondary_foundation: "Fairness",
    risk_signal: "medium risk",
    inhibitor_trigger:
      "Language pacifism; refuses to use words as force, influence, correction, praise, pressure, or social power.",
  },
  PRISMARI: {
    archetype: "The Elemental Expressionist",
    primary_foundation: "Liberty",
    secondary_foundation: "Sanctity",
    risk_signal: "high creative risk",
    inhibitor_trigger:
      "Emotional sterility; values correct technique, safety, or utility while dismissing felt expression as unnecessary noise.",
  },
  WITHERBLOOM: {
    archetype: "The Vitality Ecologist",
    primary_foundation: "Sanctity",
    secondary_foundation: "Care",
    risk_signal: "medium risk",
    inhibitor_trigger:
      "Sterile separation of life and death; cannot tolerate bodily mess, decay, blood, sacrifice, or morally ambiguous healing.",
  },
  LOREHOLD: {
    archetype: "The Historical Field Investigator",
    primary_foundation: "Authority",
    secondary_foundation: "Loyalty",
    risk_signal: "moderate risk",
    inhibitor_trigger:
      "Presentism; dismisses old evidence, elders, artifacts, and tradition as irrelevant dead weight.",
  },
  QUANDRIX: {
    archetype: "The Pattern Theorist",
    primary_foundation: "Fairness",
    secondary_foundation: "Sanctity",
    risk_signal: "medium risk",
    inhibitor_trigger:
      "Anti-abstraction; rejects numbers, models, logic, and theory as disconnected from real life.",
  },
};

const KNOWN_LATERAL_INHIBITION = {
  W: ["WU", "WB", "WG", "WR"],
  U: ["WU", "UB", "UR", "UG"],
  B: ["UB", "BR", "BG", "WB"],
  R: ["WR", "UR", "BR", "RG"],
  G: ["WG", "UG", "BG", "RG"],
  WU: ["WG", "WR", "WB", "SILVERQUILL", "ESPER"],
  WG: ["WU", "WR", "WITHERBLOOM", "ABZAN"],
  WR: ["WU", "LOREHOLD", "WG", "MARDU"],
  WB: ["WU", "UB", "SILVERQUILL", "ESPER", "ABZAN", "MARDU"],
  UB: ["WB", "UG", "ESPER", "GRIXIS", "SULTAI"],
  UR: ["PRISMARI", "QUANDRIX", "UG", "GRIXIS", "TEMUR"],
  PRISMARI: ["UR", "BR", "SILVERQUILL"],
  UG: ["QUANDRIX", "UR", "WITHERBLOOM", "TEMUR", "SULTAI"],
  BANT: ["WU", "WG", "UG", "ESPER", "GRIXIS", "ABZAN", "TEMUR", "SULTAI"],
  ESPER: ["WU", "UB", "WB", "BANT", "GRIXIS"],
  GRIXIS: ["BANT", "BR", "ESPER", "UB", "UR", "JUND", "TEMUR", "SULTAI"],
  JUND: ["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM", "ABZAN", "TEMUR", "SULTAI", "MARDU"],
  NAYA: ["WG", "RG", "WR", "BANT", "JUND", "ABZAN", "TEMUR", "MARDU"],
  ABZAN: ["WB", "WG", "BG", "BANT", "NAYA", "JUND", "WITHERBLOOM", "TEMUR", "SULTAI", "MARDU"],
  TEMUR: ["RG", "UG", "UR", "NAYA", "BANT", "GRIXIS", "JUND", "ABZAN", "SULTAI", "MARDU"],
  SULTAI: ["UB", "BG", "UG", "GRIXIS", "JUND", "BANT", "ABZAN", "TEMUR", "WITHERBLOOM", "MARDU"],
  MARDU: ["WR", "WB", "BR", "NAYA", "JUND", "ABZAN", "TEMUR", "SULTAI"],
  JESKAI: ["WU", "UR", "WR", "BANT", "ESPER", "GRIXIS", "NAYA", "TEMUR", "MARDU", "SULTAI"],
  YORE: ["WU", "UB", "BR", "UR", "WB", "WR", "ESPER", "GRIXIS", "JESKAI", "MARDU", "SULTAI"],
  GLINT: ["UB", "UR", "UG", "BR", "BG", "RG", "GRIXIS", "JUND", "TEMUR", "SULTAI"],
  DUNE: ["BR", "BG", "WB", "RG", "WR", "WG", "JUND", "NAYA", "ABZAN", "MARDU", "GLINT"],
  INK: ["WU", "UR", "UG", "WG", "WR", "RG", "BANT", "JESKAI", "NAYA", "TEMUR", "GLINT", "DUNE"],
  WITCH: ["WU", "UB", "BG", "WG", "UG", "WB", "BANT", "ESPER", "SULTAI", "ABZAN", "YORE", "GLINT", "DUNE", "INK"],
  COLORLESS: ["W", "U", "B", "R", "G", "YORE", "ESPER", "WITCH"],
  WUBRG: ["W", "U", "B", "R", "G", "COLORLESS", "YORE", "GLINT", "DUNE", "INK", "WITCH", "BANT", "ESPER", "GRIXIS", "JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI"],
  QUANDRIX: ["UG", "UR", "LOREHOLD"],
  BG: ["WITHERBLOOM", "WG", "WB", "JUND", "ABZAN", "SULTAI"],
  WITHERBLOOM: ["BG", "UG", "WG", "JUND", "ABZAN", "SULTAI"],
  BR: ["RG", "PRISMARI", "WR", "GRIXIS", "JUND", "MARDU"],
  RG: ["BR", "WG", "WITHERBLOOM", "JUND", "TEMUR"],
  LOREHOLD: ["WR", "WU", "QUANDRIX"],
  SILVERQUILL: ["WB", "WU", "PRISMARI", "UB"],
};

const LIVE_PLACEMENT_COPY_OVERRIDES = {
  YORE: {
    goodFitIndicators: [
      "engineered agency against natural limits",
      "artifice and technology as identity frame",
      "resource conversion as constructed continuity",
      "four-color without Green frame explicitly preserved",
    ],
    poorFitIndicators: [
      "artifact preference without the four-color without Green worldview",
      "recursion preference without engineered agency",
      "artifact civilization without White structure, Blue optimization, Black refusal, and Red heat",
      "natural lifecycle or organic belonging as the center of the answer",
      "single-commander artifact identity treated as the whole frame",
      "same-color goodstuff without Yore's missing-Green refusal",
      "adjacent Yore phrases treated as a four-color faction",
    ],
    chatbotGuidance: {
      use_when: [
        "A user centers four-color without Green, engineered agency, artifice, civilization, technology, progress, or refusal of natural surrender.",
        "A user frames artifacts, recursion, sacrifice, or value engines as constructed agency rather than generic power.",
        "A user distinguishes Yore from Esper, Grixis, Jeskai, Mardu, Sultai, and artifact-only shells.",
      ],
      avoid_when: [
        "The user only mentions artifacts, recursion, sacrifice, or optimization without a missing-Green worldview.",
        "The user treats a single commander, support product, or name-adjacent phrase as enough to define Yore.",
        "The user centers natural lifecycle, organic belonging, or Green-rooted continuity.",
      ],
      claim_boundaries: [
        "Use Commander examples as table texture, not identity sources.",
        "Keep the four-letter color code as technical routing data only.",
        "Do not turn Yore into a Wizards-published faction or universal color-name claim.",
      ],
    },
  },
  GLINT: {
    goodFitIndicators: [
      "adaptive appetite under pressure",
      "living force without White-style civic restraint",
      "volatility and improvisation as identity frame",
      "explicit UBRG/non-White boundary preserved",
    ],
    poorFitIndicators: [
      "generic UBRG goodstuff",
      "generic chaos",
      "generic cascade",
      "generic high-variance decks",
      "Yidris-only identity",
      "Grixis cruelty without Green living force",
      "Jund predation without Blue adaptive intelligence",
      "Temur experimentation without Black appetite",
      "Sultai exploitation without Red ignition",
      "Omnath or non-Black four-color value shells",
      "Glint-Eye or Nephilim language treated as institutional proof",
    ],
    chatbotGuidance: {
      use_when: [
        "A user centers adaptive appetite, volatility, living force, or missing-White pressure rather than civic restraint.",
        "A user needs Blue intelligence, Black appetite, Red ignition, and Green living force together.",
        "A user distinguishes Glint from Grixis, Jund, Temur, Sultai, Omnath/non-Black four-color value, and generic chaos or cascade.",
      ],
      avoid_when: [
        "The user only mentions generic chaos, cascade, high-variance play, or Yidris without the full non-White frame.",
        "The user treats Glint-Eye, Nephilim, or Yidris as institutional proof.",
        "The user centers White-style order, fairness, duty, or stability.",
      ],
      claim_boundaries: [
        "Use Commander examples as table texture, not identity sources.",
        "Keep the four-letter color code as technical routing data only.",
        "Do not turn Glint or Chaos into a Wizards-published faction or universal color-name claim.",
      ],
    },
  },
  DUNE: {
    goodFitIndicators: [
      "organized territorial force",
      "cost-bearing solidarity under pressure",
      "immediate strike pressure",
      "survival-minded multiplication",
      "explicit BRGW/non-Blue boundary preserved",
    ],
    poorFitIndicators: [
      "generic BRGW goodstuff",
      "generic go-wide shells",
      "generic tokens",
      "generic combat pressure",
      "Saskia-only identity",
      "Jund predation without White line",
      "Naya abundance without Black conquest pressure",
      "Mardu raid-speed without Green survival-minded multiplication",
      "Abzan endurance without Red ignition",
      "Glint volatility or appetite with Blue present",
      "Dune-Brood or Nephilim language treated as institutional proof",
    ],
    chatbotGuidance: {
      use_when: [
        "A user centers organized territorial pressure, cost-bearing solidarity, immediate strike pressure, or survival-minded multiplication without Blue-style distance.",
        "A user needs White line, Black cost, Red ignition, and Green persistence all at once.",
        "A user distinguishes Dune from Jund, Naya, Mardu, Abzan, Glint, Saskia-only shells, and generic BRGW combat piles.",
      ],
      avoid_when: [
        "The user only mentions generic combat, tokens, or go-wide pressure without the missing-Blue worldview.",
        "The user treats Saskia, Open Hostility, Dune-Brood, or color identity alone as enough to define Dune.",
        "The user centers detached contemplation, Blue adaptation, or stable distance as the thing that should lead the answer.",
      ],
      claim_boundaries: [
        "Use Commander examples as table texture, not identity sources.",
        "Keep the four-letter color code as technical routing data only.",
        "Do not turn Dune or Aggression into a Wizards-published faction or universal color-name claim.",
      ],
    },
  },
  INK: {
    goodFitIndicators: [
      "protected public abundance",
      "open knowledge joined to community benefit",
      "shared resources guarded from capture",
      "explicit non-Black public-commons boundary preserved",
    ],
    poorFitIndicators: [
      "generic same-color goodstuff",
      "generic group-hug shells",
      "generic public archive imagery",
      "generic shared resources without the missing-Black worldview",
      "Kynaios-only identity",
      "Ink-Treader-only identity",
      "Bant order and learning without Red immediacy",
      "Jeskai discipline and expression without Green reciprocity",
      "Naya embodied community without Blue open knowledge",
      "Temur vitality and study without White civic promise",
      "Dune force or Glint volatility treated as Ink proof",
      "Altruism or same-color code treated as public naming authority",
    ],
    chatbotGuidance: {
      use_when: [
        "A user centers protected generosity, public abundance, open knowledge, or shared resources guarded from capture under a missing-Black frame.",
        "A user needs Red care, Green reciprocity, White civic promise, and Blue open knowledge together.",
        "A user distinguishes Ink from Bant, Jeskai, Naya, Temur, Dune, Glint, Kynaios-only shells, Ink-Treader-only anchors, and generic group-hug.",
      ],
      avoid_when: [
        "The user only mentions shared resources, group-hug, public archives, Kynaios, Ink-Treader, or same-color grouping without the full non-Black protected-commons worldview.",
        "The user treats Altruism, Kynaios, Stalwart Unity, Ink-Treader, or same-color identity as naming authority.",
        "The user centers private advantage, hoarding, or personal sovereignty as the thing that should lead the answer.",
      ],
      claim_boundaries: [
        "Use Commander examples as table texture, not identity sources.",
        "Keep the four-letter color code as technical routing data only.",
        "Do not turn Ink or Altruism into a Wizards-published faction or universal color-name claim.",
      ],
    },
  },
  WITCH: {
    goodFitIndicators: [
      "patient cultivation protected by structure",
      "calculated growth without Red-style impulse",
      "knowledge optimized into long-horizon advantage",
      "ambition disciplined into planned inevitability",
      "explicit four-color without Red boundary preserved",
    ],
    poorFitIndicators: [
      "generic same-color goodstuff",
      "generic counters or proliferate shells",
      "generic Atraxa-only shells",
      "infect-only identity",
      "superfriends-only identity",
      "Phyrexia-only identity",
      "Witch-Maw-only identity",
      "Growth-only naming",
      "Bant order and growth without Black ambition",
      "Esper structure and control without Green cultivation",
      "Sultai growth and ambition without White structure",
      "Abzan endurance and family structure without Blue calculation",
      "Yore, Glint, Dune, or Ink three-color-overlap readings treated as Witch proof",
    ],
    chatbotGuidance: {
      use_when: [
        "A user centers patient cultivation, protected growth, calculated expansion, or slow inevitability under a missing-Red frame.",
        "A user needs Green cultivation, White structure, Blue calculation, and Black ambition together.",
        "A user distinguishes Witch from Bant, Esper, Sultai, Abzan, Yore, Glint, Dune, Ink, generic Atraxa goodstuff, generic counters, proliferate, infect, superfriends, and Phyrexia-only readings.",
      ],
      avoid_when: [
        "The user only mentions counters, proliferate, Atraxa, infect, superfriends, or same-color grouping without the full non-Red protected-cultivation worldview.",
        "The user treats Growth, Atraxa, Breed Lethality, Witch-Maw, or same-color identity as naming authority.",
        "The user centers impulse, spectacle, haste, emotional release, or living in the moment as the thing that should lead the answer.",
      ],
      claim_boundaries: [
        "Use Commander examples as table texture, not identity sources.",
        "Keep the four-letter color code as technical routing data only.",
        "Do not turn Witch or Growth into a Wizards-published faction or universal color-name claim.",
      ],
    },
  },
  COLORLESS: {
    goodFitIndicators: [
      "explicit outside-WUBRG framing without sixth-color language",
      "explicit generic mana versus colorless mana distinction",
      "branch-separated artifacts, Eldrazi, Wastes, Devoid, and Ugin/Karn texture",
      "Commander examples kept support-only",
      "five-color and Phyrexia kept as comparator or separator context rather than proof",
      "positive attraction to a chosen outside-WUBRG restriction",
      "clear branch preference among artifact machinery, Eldrazi spectacle, Wastes austerity, clean mana, or resource-denial pressure",
      "strict Colorless Commander constraints understood as part of the appeal rather than a deckbuilding accident",
    ],
    poorFitIndicators: [
      "generic same-color or generic mana goodstuff",
      "artifact-only identity",
      "Eldrazi-only identity",
      "Wastes-only identity",
      "Devoid-only identity",
      "Ugin-only or Karn-only lore claims without direct evidence",
      "five-color Eldrazi framing",
      "Phyrexia-only framing",
      "Commander product proof or legality claims beyond current support-only rows",
      "positive sixth-color framing",
      "public route or Home preview readiness language",
      "Devoid as strict Commander legality proof",
      "five-color Eldrazi as strict Colorless identity",
      "named-card legality or exact Oracle claims without verification",
      "current price or metagame advice from raw intake material",
    ],
    chatbotGuidance: {
      use_when: [
        "Use Colorless as inviting when the user is drawn to the restriction itself, artifact machinery, Eldrazi spectacle, Wastes austerity, clean mana, or resource-denial pressure with boundaries intact.",
        "Use strict Commander and Devoid/five-color Eldrazi distinctions as false-positive checks.",
      ],
      avoid_when: [
        "The answer says colorless because the deck has many generic mana costs rather than actual {C} requirements or Colorless identity.",
        "The answer names artifacts but ignores colored artifacts, artifact civilizations, and the artifact/Colorless distinction.",
        "The answer names Eldrazi but turns five-color Eldrazi support or Eldrazi Incursion into Colorless proof.",
        "The answer treats outside the color wheel as above the color wheel.",
      ],
      claim_boundaries: [
        "Use VM-308 evidence rows as authority.",
        "Treat VM-309/VM-310 docs as shaping context only.",
        "Support-only Commander rows cannot authorize raw claims or broad Commander viability.",
        "Generated artifacts are not source truth.",
      ],
    },
  },
};

const QUESTION_BANK = {
  gate: [
    {
      id: "gate_pressure_trust",
      stage: "gate",
      eyebrow: "Gate I",
      prompt: "When pressure rises, what do you trust first?",
      answers: [
        {
          title: "A process that binds everyone",
          copy: "Clear rules, shared limits, and a path that does not depend on anyone's mood.",
          signal: "procedure as protection",
          likelihoods: { W: 0.75, WU: 0.9, BANT: 0.85, ABZAN: 0.6, WB: 0.6, WG: 0.55 },
          suppresses: { BR: 0.45, RG: 0.35 },
        },
        {
          title: "Immediate protection",
          copy: "If someone is in danger, the right first move is to step between them and harm.",
          signal: "protective intervention",
          likelihoods: { W: 0.85, WR: 0.9, LOREHOLD: 0.55, NAYA: 0.55, WG: 0.5 },
          suppresses: { WU: 0.35, UB: 0.25 },
        },
        {
          title: "Information advantage",
          copy: "Read the room, hold your position, and act when the hidden structure is visible.",
          signal: "hidden information",
          likelihoods: { U: 0.95, UB: 0.9, B: 0.75, ESPER: 0.75, GRIXIS: 0.65, WB: 0.65, QUANDRIX: 0.35 },
          suppresses: { WR: 0.3, BR: 0.25 },
        },
        {
          title: "A bold release of force",
          copy: "Break the paralysis with motion, spectacle, or a move nobody can ignore.",
          signal: "high-intensity action",
          likelihoods: { BR: 0.85, RG: 0.8, PRISMARI: 0.75, JUND: 0.7, WR: 0.55 },
          suppresses: { WU: 0.4, WG: 0.25 },
        },
        {
          title: "A living system response",
          copy: "Look for what is growing, decaying, adapting, or asking to be tended.",
          signal: "living systems",
          likelihoods: { NAYA: 0.85, WITHERBLOOM: 0.85, UG: 0.8, BG: 0.75, WG: 0.6 },
          suppresses: { UB: 0.25, BR: 0.25 },
        },
        {
          title: "The first honest motion",
          copy: "Move before the feeling gets trapped under permission, fear, or overthinking.",
          signal: "immediate ignition",
          likelihoods: { R: 0.95, GRIXIS: 0.85, JUND: 0.7, NAYA: 0.55, WR: 0.55, UR: 0.5, BR: 0.45, RG: 0.45 },
          suppresses: { WU: 0.35, U: 0.25 },
        },
        {
          title: "The older living pattern",
          copy: "Root, observe, and let the answer follow the life already carrying the strain.",
          signal: "natural order under strain",
          likelihoods: { G: 0.95, NAYA: 0.85, ABZAN: 0.6, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.25 },
        },
        {
          title: "The house that remembers",
          copy: "Trust begins with the family, the names already carried, and the next generation that must survive the choice.",
          signal: "remembered family duty",
          likelihoods: { ABZAN: 0.95, WB: 0.35, WG: 0.35, BG: 0.35 },
          suppresses: { JUND: 0.35, NAYA: 0.3, BANT: 0.25 },
        },
        {
          title: "The wild signal",
          copy: "Trust begins with the land, the body, and the old warning that arrives before language.",
          signal: "attuned survival signal",
          likelihoods: { TEMUR: 0.95, G: 0.55, UG: 0.45, RG: 0.45 },
          suppresses: { JUND: 0.35, NAYA: 0.25, GRIXIS: 0.25, ABZAN: 0.25 },
        },
        {
          title: "The unclaimed advantage",
          copy: "Trust begins with the resource nobody else is willing to see: the body, secret, cost, or opening that can become power.",
          signal: "ruthless resource conversion",
          likelihoods: { SULTAI: 0.95, B: 0.55, UB: 0.45, BG: 0.45 },
          suppresses: { ABZAN: 0.3, TEMUR: 0.25, NAYA: 0.25 },
        },
        {
          title: "The charge before the gap closes",
          copy: "Trust begins with the formation that can move before fear, delay, or comfort breaks the opening.",
          signal: "coordinated action before hesitation",
          likelihoods: { MARDU: 0.95, R: 0.55, WR: 0.45, BR: 0.45 },
          suppresses: { ABZAN: 0.3, TEMUR: 0.25, SULTAI: 0.25 },
        },
        {
          title: "The trained line",
          copy: "Trust begins with practiced perception: know the angle, steady the body, then move when insight is ready.",
          signal: "disciplined insight into action",
          likelihoods: { JESKAI: 0.95, U: 0.55, UR: 0.45, WU: 0.4, WR: 0.35 },
          suppresses: { MARDU: 0.3, TEMUR: 0.25, SULTAI: 0.25 },
        },
        {
          title: "The engineered answer",
          copy: "Trust begins with the machine you can build: structure, knowledge, cost, and heat refusing to let the limit stay final.",
          signal: "engineered agency against natural surrender",
          likelihoods: { YORE: 0.95, WU: 0.4, UB: 0.4, UR: 0.4, WB: 0.35, BR: 0.35, ESPER: 0.3, GRIXIS: 0.3, JESKAI: 0.25 },
          suppresses: { G: 0.45, NAYA: 0.35, TEMUR: 0.3, SULTAI: 0.25 },
        },
        {
          title: "The living surge",
          copy: "Trust begins with the current that can learn, feed, and move before civic order turns the opening inert.",
          signal: "adaptive appetite under pressure",
          likelihoods: { GLINT: 0.95, UG: 0.45, BR: 0.45, UR: 0.4, BG: 0.4, RG: 0.4, GRIXIS: 0.35, JUND: 0.35, TEMUR: 0.35, SULTAI: 0.35 },
          suppresses: { W: 0.45, WU: 0.4, WG: 0.35, WR: 0.3, BANT: 0.25, ABZAN: 0.25 },
        },
        {
          title: "The line already moving",
          copy: "Trust begins with the front that can claim ground now: White line, Black cost, Red ignition, and Green persistence moving before distance can cool the field.",
          signal: "organized territorial force before detached contemplation",
          likelihoods: { DUNE: 0.95, BR: 0.45, RG: 0.45, WG: 0.4, WB: 0.4, WR: 0.35, BG: 0.35, NAYA: 0.35, MARDU: 0.35, ABZAN: 0.3, JUND: 0.3 },
          suppresses: { U: 0.45, WU: 0.35, UG: 0.3, GLINT: 0.25 },
        },
        {
          title: "The guarded commons",
          copy: "Trust begins with the gift that can keep moving because the commons is protected from capture.",
          signal: "protected public abundance under missing Black",
          likelihoods: { INK: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, UR: 0.35, WR: 0.35, RG: 0.35, BANT: 0.3, NAYA: 0.3 },
          suppresses: { B: 0.45, UB: 0.35, BR: 0.3, BG: 0.3, GLINT: 0.25, DUNE: 0.25 },
        },
        {
          title: "The cultivated future",
          copy: "Trust begins with the garden that can be protected, measured, and grown until impulse no longer gets to interrupt the plan.",
          signal: "patient cultivation under missing Red",
          likelihoods: { WITCH: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, WB: 0.4, UB: 0.35, BG: 0.35, BANT: 0.3, ESPER: 0.3, SULTAI: 0.3, ABZAN: 0.3 },
          suppresses: { R: 0.5, BR: 0.35, RG: 0.35, UR: 0.3, WR: 0.3, GLINT: 0.25, DUNE: 0.25, INK: 0.2 },
        },
        {
          title: "The whole spectrum",
          copy: "Trust begins with giving every color a real job, then asking whether the coalition still has a center.",
          signal: "all five colors with accountable roles",
          likelihoods: { WUBRG: 0.95 },
          suppresses: { COLORLESS: 0.55, YORE: 0.3, GLINT: 0.3, DUNE: 0.3, INK: 0.3, WITCH: 0.3 },
        },
        {
          title: "The outside constraint",
          copy: "Trust begins with the rule that the color wheel is not the grammar of the answer.",
          signal: "outside-WUBRG restriction",
          likelihoods: { COLORLESS: 0.95 },
          suppresses: { W: 0.35, U: 0.35, B: 0.35, R: 0.35, G: 0.35, YORE: 0.25, ESPER: 0.25, WITCH: 0.25 },
        },
      ],
    },
    {
      id: "gate_power_shape",
      stage: "gate",
      eyebrow: "Gate II",
      prompt: "Which kind of power feels least dishonest to you?",
      answers: [
        {
          title: "Power that is accountable",
          copy: "Authority should be legible, answerable, and bound by a standard beyond itself.",
          signal: "accountable authority",
          likelihoods: { W: 0.9, BANT: 0.9, WU: 0.8, WR: 0.7, SILVERQUILL: 0.55, NAYA: 0.45 },
          suppresses: { UB: 0.3, BR: 0.25 },
        },
        {
          title: "Power that is earned and owed",
          copy: "Influence is a ledger: debts, duties, inheritance, and the price of keeping promises.",
          signal: "obligation ledger",
          likelihoods: { WB: 0.9, ABZAN: 0.65, SILVERQUILL: 0.6, WU: 0.45 },
          suppresses: { WG: 0.35, RG: 0.3 },
        },
        {
          title: "Power that stays unseen",
          copy: "The cleanest leverage is the kind people do not know you have.",
          signal: "invisible leverage",
          likelihoods: { UB: 0.9, B: 0.75, GRIXIS: 0.65, WB: 0.6 },
          suppresses: { SILVERQUILL: 0.35, WR: 0.35 },
        },
        {
          title: "Power that transforms",
          copy: "The best strength changes the organism, the system, or the self into a better fit.",
          signal: "adaptive transformation",
          likelihoods: { UG: 0.85, WITHERBLOOM: 0.65, ESPER: 0.65, QUANDRIX: 0.6, U: 0.55, UR: 0.5 },
          suppresses: { WU: 0.25 },
        },
        {
          title: "Power that is expressed",
          copy: "Presence, style, and emotional force can tell the truth faster than an argument.",
          signal: "expressive force",
          likelihoods: { PRISMARI: 0.9, BR: 0.75, SILVERQUILL: 0.7, UR: 0.55 },
          suppresses: { WU: 0.35, QUANDRIX: 0.25 },
        },
        {
          title: "Power that ignites action",
          copy: "The cleanest power is the spark that gets the honest thing moving now.",
          signal: "freedom through motion",
          likelihoods: { R: 0.95, GRIXIS: 0.85, JUND: 0.7, NAYA: 0.55, WR: 0.5, UR: 0.45, BR: 0.45, RG: 0.45 },
          suppresses: { WU: 0.3, B: 0.2 },
        },
        {
          title: "Power that grows from roots",
          copy: "Strength is cleanest when it rises from land, creatures, time, and the shape life already holds.",
          signal: "rooted growth",
          likelihoods: { G: 0.95, NAYA: 0.85, ABZAN: 0.6, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.25 },
        },
        {
          title: "Power that carries the house",
          copy: "Power is cleanest when it preserves family continuity, ancestor duty, and the living house beyond this one crisis.",
          signal: "house-preserving obligation",
          likelihoods: { ABZAN: 0.95, WB: 0.5, BG: 0.4 },
          suppresses: { JUND: 0.35, WITHERBLOOM: 0.25 },
        },
        {
          title: "Power that listens first",
          copy: "Strength is cleanest when it hears terrain, memory, and instinct before becoming force.",
          signal: "listening before strength",
          likelihoods: { TEMUR: 0.95, G: 0.55, UG: 0.45, UR: 0.4 },
          suppresses: { JUND: 0.35, GRIXIS: 0.25, NAYA: 0.25 },
        },
        {
          title: "Power that converts the cost",
          copy: "Power is honest when every body, secret, and opportunity can be turned into leverage before it is wasted.",
          signal: "opportunity converted into leverage",
          likelihoods: { SULTAI: 0.95, UB: 0.5, BG: 0.45, B: 0.4 },
          suppresses: { ABZAN: 0.3, BANT: 0.25, NAYA: 0.25 },
        },
        {
          title: "Power that commits the charge",
          copy: "Power is honest when speed, oath, and ruthless opportunity move together before the moment is gone.",
          signal: "martial commitment through action",
          likelihoods: { MARDU: 0.95, R: 0.55, WR: 0.45, BR: 0.45 },
          suppresses: { ABZAN: 0.3, TEMUR: 0.25, SULTAI: 0.25 },
        },
        {
          title: "Power that practices first",
          copy: "Power is honest when knowledge, training, courage, and restraint make the action precise enough to matter.",
          signal: "cunning disciplined into motion",
          likelihoods: { JESKAI: 0.95, U: 0.55, UR: 0.45, WU: 0.4, WR: 0.35 },
          suppresses: { MARDU: 0.3, SULTAI: 0.25, TEMUR: 0.25 },
        },
        {
          title: "Power that rebuilds the limit",
          copy: "Power is honest when a body, rule, memory, or machine can be rebuilt into agency instead of accepted as final.",
          signal: "constructed intervention over natural finality",
          likelihoods: { YORE: 0.95, WU: 0.45, UB: 0.45, BR: 0.4, UR: 0.4, WB: 0.35, ESPER: 0.35, GRIXIS: 0.3 },
          suppresses: { G: 0.45, NAYA: 0.35, TEMUR: 0.35, SULTAI: 0.2 },
        },
        {
          title: "Power that stays alive",
          copy: "The cleanest power learns in motion, feeds under pressure, and grows without asking order to bless it first.",
          signal: "living force without civic restraint",
          likelihoods: { GLINT: 0.95, UG: 0.45, BR: 0.45, BG: 0.4, UR: 0.4, RG: 0.4, GRIXIS: 0.35, JUND: 0.35, TEMUR: 0.35, SULTAI: 0.35 },
          suppresses: { W: 0.45, WU: 0.4, WG: 0.35, WR: 0.3, BANT: 0.25, ABZAN: 0.25 },
        },
        {
          title: "Power that holds the field",
          copy: "The cleanest power keeps the line intact: solidarity, cost, ignition, and growth pushing together before analysis turns presence into hesitation.",
          signal: "force-backed solidarity under pressure",
          likelihoods: { DUNE: 0.95, BR: 0.45, RG: 0.45, WG: 0.4, WB: 0.4, WR: 0.35, BG: 0.35, NAYA: 0.35, MARDU: 0.35, ABZAN: 0.3, JUND: 0.3 },
          suppresses: { U: 0.45, WU: 0.35, UG: 0.3, GLINT: 0.25 },
        },
        {
          title: "Power that keeps the gift moving",
          copy: "Power is honest when it opens knowledge, protects reciprocity, and keeps abundance circulating without becoming private leverage.",
          signal: "guarded generosity as public power",
          likelihoods: { INK: 0.95, WU: 0.45, WG: 0.45, UG: 0.4, UR: 0.35, WR: 0.35, RG: 0.35, BANT: 0.3, JESKAI: 0.25, NAYA: 0.25 },
          suppresses: { B: 0.45, UB: 0.35, BR: 0.3, BG: 0.3, GLINT: 0.25, DUNE: 0.25 },
        },
        {
          title: "Power that compounds",
          copy: "Power is honest when small, protected investments are cultivated until every counter, card, and resource becomes part of the same inevitable plan.",
          signal: "protected accumulation into inevitability",
          likelihoods: { WITCH: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, WB: 0.4, UB: 0.35, BG: 0.35, BANT: 0.3, ESPER: 0.3, SULTAI: 0.3, ABZAN: 0.3 },
          suppresses: { R: 0.5, BR: 0.35, RG: 0.35, UR: 0.3, WR: 0.3, GLINT: 0.25, DUNE: 0.25, INK: 0.2 },
        },
        {
          title: "Power that integrates the whole palette",
          copy: "Power is honest when breadth becomes coordination: each color contributes without pretending the pile has no tradeoffs.",
          signal: "full-spectrum power with tradeoffs",
          likelihoods: { WUBRG: 0.95 },
          suppresses: { COLORLESS: 0.55, YORE: 0.3, GLINT: 0.3, DUNE: 0.3, INK: 0.3, WITCH: 0.3 },
        },
        {
          title: "Power that stays uncolored",
          copy: "Power is honest when the absence itself is the discipline: not five colors, not a sixth color, and not a shortcut for generic costs.",
          signal: "non-color precision",
          likelihoods: { COLORLESS: 0.95 },
          suppresses: { W: 0.35, U: 0.35, B: 0.35, R: 0.35, G: 0.35, YORE: 0.25, ESPER: 0.25, WITCH: 0.25 },
        },
      ],
    },
    {
      id: "gate_attention_pattern",
      stage: "gate",
      eyebrow: "Gate III",
      prompt: "Where does your attention go first in a complicated situation?",
      answers: [
        {
          title: "The precedent",
          copy: "What happened before, what was promised, and what the record proves.",
          signal: "historical evidence",
          likelihoods: { W: 0.75, LOREHOLD: 0.9, BANT: 0.75, ABZAN: 0.65, WU: 0.65, WB: 0.55 },
          suppresses: { BR: 0.25, RG: 0.25 },
        },
        {
          title: "The pattern",
          copy: "The hidden equation, repeatable structure, or edge case everyone else missed.",
          signal: "abstract pattern",
          likelihoods: { QUANDRIX: 0.9, UR: 0.65, UG: 0.55, ESPER: 0.5, UB: 0.45 },
          suppresses: { BR: 0.25, WR: 0.2 },
        },
        {
          title: "The leverage",
          copy: "What can still be converted, what price is worth paying, and who controls the next move.",
          signal: "personal leverage",
          likelihoods: { GRIXIS: 0.85, B: 0.85, ESPER: 0.65, UB: 0.55, WB: 0.5 },
          suppresses: { W: 0.25, WG: 0.25 },
        },
        {
          title: "The body of the system",
          copy: "What is alive, vulnerable, mutating, sick, hungry, or becoming something else.",
          signal: "biological reality",
          likelihoods: { UG: 0.85, WITHERBLOOM: 0.8, BG: 0.65, ABZAN: 0.55, NAYA: 0.55 },
          suppresses: { WU: 0.25, SILVERQUILL: 0.2 },
        },
        {
          title: "The wound",
          copy: "What was taken, who was harmed, and what polite language is trying to cover.",
          signal: "specific grievance",
          likelihoods: { RG: 0.9, JUND: 0.65, WR: 0.65, BG: 0.55, NAYA: 0.45 },
          suppresses: { WU: 0.35, WB: 0.2 },
        },
        {
          title: "The room itself",
          copy: "Who has the floor, who is performing, and whose words are moving people.",
          signal: "social performance",
          likelihoods: { SILVERQUILL: 0.85, PRISMARI: 0.7, BR: 0.55 },
          suppresses: { UG: 0.25, QUANDRIX: 0.25 },
        },
        {
          title: "The next impulse",
          copy: "What wants to happen before analysis, respectability, or habit talks it down.",
          signal: "honest impulse",
          likelihoods: { R: 0.95, JUND: 0.65, WR: 0.45, UR: 0.45, BR: 0.4, RG: 0.4 },
          suppresses: { WU: 0.3, U: 0.25 },
        },
        {
          title: "The natural role",
          copy: "What is trying to grow, what pace it needs, and where it belongs in the living order.",
          signal: "natural role",
          likelihoods: { G: 0.95, NAYA: 0.85, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.2 },
        },
        {
          title: "The family line",
          copy: "What matters first is how the choice affects the house, the ancestors behind it, and the descendants ahead.",
          signal: "lineage across time",
          likelihoods: { ABZAN: 0.95, WB: 0.45, BG: 0.4 },
          suppresses: { JUND: 0.35, NAYA: 0.25 },
        },
        {
          title: "The terrain signal",
          copy: "Attention goes to weather, stone, tracks, silence, and the living warning under the noise.",
          signal: "terrain and elemental signal",
          likelihoods: { TEMUR: 0.95, UG: 0.5, RG: 0.45, UR: 0.4 },
          suppresses: { ABZAN: 0.3, NAYA: 0.25, GRIXIS: 0.25 },
        },
        {
          title: "The usable resource",
          copy: "Attention goes to what can be claimed, repurposed, stolen, buried, raised, or turned before anyone else recognizes the opening.",
          signal: "usable resource before public meaning",
          likelihoods: { SULTAI: 0.95, UB: 0.5, BG: 0.45, UG: 0.35 },
          suppresses: { ABZAN: 0.3, TEMUR: 0.25, NAYA: 0.25 },
        },
        {
          title: "The opening",
          copy: "Attention goes to the gap that speed, formation, and ruthless commitment can take before it closes.",
          signal: "opening claimed through martial speed",
          likelihoods: { MARDU: 0.95, R: 0.55, WR: 0.45, BR: 0.45 },
          suppresses: { ABZAN: 0.3, TEMUR: 0.25, SULTAI: 0.25 },
        },
        {
          title: "The practiced angle",
          copy: "Attention goes to the line where study, timing, breath, and compassion can become the cleanest action.",
          signal: "trained perception before precise action",
          likelihoods: { JESKAI: 0.95, U: 0.55, WU: 0.45, UR: 0.4, WR: 0.35 },
          suppresses: { MARDU: 0.3, SULTAI: 0.25, GRIXIS: 0.25 },
        },
        {
          title: "The system that can be rebuilt",
          copy: "Attention goes to the engine under the surface: what can be redesigned, reclaimed, mechanized, or made to choose again.",
          signal: "system rebuilt through artifice",
          likelihoods: { YORE: 0.95, UB: 0.45, UR: 0.45, WU: 0.4, WB: 0.35, BR: 0.35, ESPER: 0.3, GRIXIS: 0.3 },
          suppresses: { G: 0.45, NAYA: 0.35, TEMUR: 0.3, SULTAI: 0.25 },
        },
        {
          title: "The live opening",
          copy: "Attention goes to the storm current: what can learn, exploit, mutate, and ignite before the moment gets domesticated.",
          signal: "living leverage under volatility",
          likelihoods: { GLINT: 0.95, UG: 0.45, UB: 0.4, BR: 0.4, UR: 0.4, BG: 0.4, RG: 0.35, GRIXIS: 0.35, JUND: 0.35, TEMUR: 0.35, SULTAI: 0.35 },
          suppresses: { W: 0.45, WU: 0.35, WG: 0.35, WR: 0.3, BANT: 0.25, ABZAN: 0.25 },
        },
        {
          title: "The ground the line can take",
          copy: "Attention goes to bodies, costs, pressure lines, and the patch of field that becomes yours if the common front moves before distance intervenes.",
          signal: "territorial opening through organized force",
          likelihoods: { DUNE: 0.95, BR: 0.45, RG: 0.45, WG: 0.4, WB: 0.4, WR: 0.35, BG: 0.35, NAYA: 0.35, MARDU: 0.35, ABZAN: 0.3, JUND: 0.3 },
          suppresses: { U: 0.45, WU: 0.35, UG: 0.3, GLINT: 0.25 },
        },
        {
          title: "The shared resource",
          copy: "Attention goes to the archive, meal, map, promise, or care that should circulate without being captured by one private hand.",
          signal: "open knowledge and shared care guarded from capture",
          likelihoods: { INK: 0.95, WU: 0.45, WG: 0.45, UG: 0.4, UR: 0.35, WR: 0.35, RG: 0.35, BANT: 0.3, TEMUR: 0.25, NAYA: 0.25 },
          suppresses: { B: 0.45, UB: 0.35, BR: 0.3, BG: 0.3, GLINT: 0.25, DUNE: 0.25 },
        },
        {
          title: "The long plan",
          copy: "Attention goes to the root, trellis, ledger, and experiment: what can be tended now so the future becomes too established to uproot.",
          signal: "long-horizon cultivation and calculation",
          likelihoods: { WITCH: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, WB: 0.4, UB: 0.35, BG: 0.35, BANT: 0.3, ESPER: 0.3, SULTAI: 0.3, ABZAN: 0.3 },
          suppresses: { R: 0.5, BR: 0.35, RG: 0.35, UR: 0.3, WR: 0.3, GLINT: 0.25, DUNE: 0.25, INK: 0.2 },
        },
        {
          title: "The full map",
          copy: "Attention goes to which color is missing from the plan, which one is over-speaking, and how the whole palette stays legible.",
          signal: "five-color map discipline",
          likelihoods: { WUBRG: 0.95 },
          suppresses: { COLORLESS: 0.55, YORE: 0.3, GLINT: 0.3, DUNE: 0.3, INK: 0.3, WITCH: 0.3 },
        },
        {
          title: "The branch boundary",
          copy: "Attention goes to whether the pull is machine, void, Wastes, Eldrazi scale, or clean mana without letting one branch explain all of Colorless.",
          signal: "Colorless branch discipline",
          likelihoods: { COLORLESS: 0.95 },
          suppresses: { W: 0.35, U: 0.35, B: 0.35, R: 0.35, G: 0.35, YORE: 0.25, ESPER: 0.25, WITCH: 0.25 },
        },
      ],
    },
    {
      id: "gate_belonging_cost",
      stage: "gate",
      eyebrow: "Gate IV",
      prompt: "What would make a faction worth joining even when it asks something of you?",
      answers: [
        {
          title: "Belonging to something larger",
          copy: "A shared self, shared care, and the relief of not carrying the whole world alone.",
          signal: "communal belonging",
          likelihoods: { WG: 0.9, BANT: 0.85, NAYA: 0.85, ABZAN: 0.55, WITHERBLOOM: 0.55, WR: 0.45 },
          suppresses: { GRIXIS: 0.65, UB: 0.35, BR: 0.25 },
        },
        {
          title: "A chance to build and test",
          copy: "A lab, a workshop, or a problem strange enough to justify the risk.",
          signal: "experimental construction",
          likelihoods: { UR: 0.9, UG: 0.65, U: 0.55, QUANDRIX: 0.55, ESPER: 0.5, PRISMARI: 0.45 },
          suppresses: { WU: 0.25, WG: 0.25 },
        },
        {
          title: "A stage big enough for the truth",
          copy: "An institution that lets intensity, beauty, critique, or discomfort actually land.",
          signal: "truth through expression",
          likelihoods: { PRISMARI: 0.85, BR: 0.75, SILVERQUILL: 0.65 },
          suppresses: { GRIXIS: 0.85, WU: 0.3, WG: 0.2 },
        },
        {
          title: "A durable legacy",
          copy: "Something that outlasts mood: law, lineage, contracts, record, or remembered duty.",
          signal: "durable legacy",
          likelihoods: { W: 0.85, WB: 0.85, ABZAN: 0.65, LOREHOLD: 0.75, ESPER: 0.65, WU: 0.6 },
          suppresses: { BR: 0.25, RG: 0.25 },
        },
        {
          title: "A place that uses what others discard",
          copy: "Waste, failure, rot, grief, and leftovers become the start of the next structure.",
          signal: "reclamation",
          likelihoods: { BG: 0.9, GRIXIS: 0.85, B: 0.75, WITHERBLOOM: 0.7, JUND: 0.65, RG: 0.45 },
          suppresses: { WU: 0.25, PRISMARI: 0.2 },
        },
        {
          title: "A chance to live the spark",
          copy: "A place where the feeling can become action before the moment goes cold.",
          signal: "present-tense freedom",
          likelihoods: { R: 0.95, JUND: 0.65, NAYA: 0.45, WR: 0.4, UR: 0.4, BR: 0.4, RG: 0.4 },
          suppresses: { WU: 0.25, WB: 0.2 },
        },
        {
          title: "A place to grow as you are",
          copy: "A living order where roots deepen, instincts return, and patient strength unfolds.",
          signal: "rooted belonging",
          likelihoods: { G: 0.95, NAYA: 0.85, WG: 0.55, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.2 },
        },
        {
          title: "A house that outlasts me",
          copy: "The cost is bearable when it helps the house endure beyond one life and keeps memory useful for the living.",
          signal: "house continuity beyond the self",
          likelihoods: { ABZAN: 0.95, WB: 0.55, WG: 0.45, BG: 0.4 },
          suppresses: { GRIXIS: 0.45, JUND: 0.35, NAYA: 0.25 },
        },
        {
          title: "A clan that hears the wild",
          copy: "The cost is bearable when survival belongs to terrain, kin, instinct, and the signal that keeps the next step alive.",
          signal: "clan survival through attunement",
          likelihoods: { TEMUR: 0.95, G: 0.55, RG: 0.45, UG: 0.45 },
          suppresses: { JUND: 0.35, ABZAN: 0.3, GRIXIS: 0.25 },
        },
        {
          title: "An advantage no one else claims",
          copy: "The cost is bearable when it turns waste, death, secrecy, or risk into the power to keep choosing.",
          signal: "cost converted into agency",
          likelihoods: { SULTAI: 0.95, B: 0.55, BG: 0.45, UB: 0.45 },
          suppresses: { ABZAN: 0.3, TEMUR: 0.25, BANT: 0.25 },
        },
        {
          title: "A name worth charging under",
          copy: "The cost is bearable when the charge has a name, a code, and companions moving fast enough to keep it true.",
          signal: "war-name belonging through commitment",
          likelihoods: { MARDU: 0.95, WR: 0.5, WB: 0.45, R: 0.45 },
          suppresses: { JUND: 0.3, ABZAN: 0.25, SULTAI: 0.25 },
        },
        {
          title: "A school that makes motion wise",
          copy: "The cost is bearable when discipline turns insight into action that can protect the form it serves.",
          signal: "monastery practice as shared action",
          likelihoods: { JESKAI: 0.95, U: 0.55, WU: 0.45, UR: 0.4, WR: 0.35 },
          suppresses: { MARDU: 0.3, SULTAI: 0.25, TEMUR: 0.25 },
        },
        {
          title: "A workshop against surrender",
          copy: "The cost is bearable when the workbench, archive, contract, and forge keep agency alive where nature would have closed the case.",
          signal: "workshop archive forge against surrender",
          likelihoods: { YORE: 0.95, WU: 0.4, UB: 0.4, UR: 0.4, WB: 0.35, BR: 0.35, MARDU: 0.25, JESKAI: 0.25 },
          suppresses: { G: 0.45, NAYA: 0.35, TEMUR: 0.35, SULTAI: 0.2 },
        },
        {
          title: "A storm worth riding",
          copy: "The cost is bearable when the surge keeps appetite, adaptation, ignition, and living force in the same current without civic restraint freezing it still.",
          signal: "non-white four-color surge",
          likelihoods: { GLINT: 0.95, UG: 0.45, BR: 0.45, UR: 0.4, BG: 0.4, RG: 0.4, GRIXIS: 0.35, JUND: 0.35, TEMUR: 0.35, SULTAI: 0.35 },
          suppresses: { W: 0.45, WU: 0.4, WG: 0.35, WR: 0.3, BANT: 0.25, ABZAN: 0.25 },
        },
        {
          title: "A common front worth paying for",
          copy: "The cost is bearable when line, conquest, ignition, and persistence keep the formation moving together before contemplation turns the opening cold.",
          signal: "common front under cost-bearing pressure",
          likelihoods: { DUNE: 0.95, BR: 0.45, RG: 0.45, WG: 0.4, WB: 0.4, WR: 0.35, BG: 0.35, NAYA: 0.35, MARDU: 0.35, ABZAN: 0.3, JUND: 0.3 },
          suppresses: { U: 0.45, WU: 0.35, UG: 0.3, GLINT: 0.25 },
        },
        {
          title: "A commons worth guarding",
          copy: "The cost is bearable when shared knowledge, care, and abundance stay open because someone protects them from capture.",
          signal: "belonging through protected public abundance",
          likelihoods: { INK: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, UR: 0.35, WR: 0.35, RG: 0.35, BANT: 0.3, NAYA: 0.3 },
          suppresses: { B: 0.45, UB: 0.35, BR: 0.3, BG: 0.3, GLINT: 0.25, DUNE: 0.25 },
        },
        {
          title: "A garden worth binding",
          copy: "The cost is bearable when structure, study, and ambition keep the garden alive long enough for patient growth to become inevitable.",
          signal: "protected garden as long-horizon belonging",
          likelihoods: { WITCH: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, WB: 0.4, UB: 0.35, BG: 0.35, BANT: 0.3, ESPER: 0.3, SULTAI: 0.3, ABZAN: 0.3 },
          suppresses: { R: 0.5, BR: 0.35, RG: 0.35, UR: 0.3, WR: 0.3, GLINT: 0.25, DUNE: 0.25, INK: 0.2 },
        },
        {
          title: "A coalition worth coordinating",
          copy: "The cost is bearable when every color remains present, useful, and answerable to the whole plan.",
          signal: "full-color coalition with shared discipline",
          likelihoods: { WUBRG: 0.95 },
          suppresses: { COLORLESS: 0.55, YORE: 0.3, GLINT: 0.3, DUNE: 0.3, INK: 0.3, WITCH: 0.3 },
        },
        {
          title: "A restriction worth choosing",
          copy: "The cost is bearable when being outside WUBRG is the appeal, not a consolation prize or a catch-all for artifacts.",
          signal: "chosen non-color restriction",
          likelihoods: { COLORLESS: 0.95 },
          suppresses: { W: 0.35, U: 0.35, B: 0.35, R: 0.35, G: 0.35, YORE: 0.25, ESPER: 0.25, WITCH: 0.25 },
        },
      ],
    },
  ],
  hall: [
    {
      id: "hall_W_shelter",
      stage: "hall",
      faction: "W",
      eyebrow: "Hall - White",
      prompt: "A frightened group needs protection before trust has time to grow. What response feels most dependable?",
      answers: [
        {
          title: "Build the shelter",
          copy: "Set the standard, make the boundary clear, and give people something reliable to stand inside.",
          signal: "shelter through structure",
          likelihoods: { W: 0.95, WG: 0.65, WU: 0.6, WR: 0.55 },
          suppresses: { UB: 0.35, BR: 0.35 }
        },
        {
          title: "Write the procedure",
          copy: "Protection lasts when the process is explicit enough to survive mood.",
          signal: "procedure first",
          likelihoods: { WU: 0.85 },
          suppresses: { W: 0.35 }
        },
        {
          title: "Intervene immediately",
          copy: "The first duty is to put yourself between the danger and the vulnerable person.",
          signal: "urgent guardianship",
          likelihoods: { WR: 0.85 },
          suppresses: { W: 0.25 }
        },
        {
          title: "Restore belonging",
          copy: "People trust protection more when they feel held by the whole group.",
          signal: "belonging as shelter",
          likelihoods: { WG: 0.8 },
          suppresses: { W: 0.25 }
        }
      ]
    },
    {
      id: "hall_W_duty",
      stage: "hall",
      faction: "W",
      eyebrow: "Hall - White",
      prompt: "A structure is imperfect, but it still keeps more people safe than improvisation. What matters most?",
      answers: [
        {
          title: "Strengthen what protects",
          copy: "If the shelter holds, improve it and keep faith with the people relying on it.",
          signal: "duty to maintain shelter",
          likelihoods: { W: 0.95, WU: 0.65, WG: 0.6, WR: 0.55 },
          suppresses: { BR: 0.35, RG: 0.35 }
        },
        {
          title: "Refine the procedure",
          copy: "The system matters most when its rules are precise enough to remain fair under pressure.",
          signal: "airtight procedure",
          likelihoods: { WU: 0.85 },
          suppresses: { W: 0.3 }
        },
        {
          title: "Choose the urgent case",
          copy: "A structure that hesitates in the face of harm must be overruled by action.",
          signal: "case-first intervention",
          likelihoods: { WR: 0.85 },
          suppresses: { W: 0.25 }
        },
        {
          title: "Heal the bond",
          copy: "Protection is real when people want to carry it together, not just receive it.",
          signal: "shared care",
          likelihoods: { WG: 0.8 },
          suppresses: { W: 0.25 }
        }
      ]
    },
    {
      id: "hall_B_cost",
      stage: "hall",
      faction: "B",
      eyebrow: "Hall - Black",
      prompt: "A choice will cost life, comfort, or loyalty, but it keeps your fate from belonging to someone else. What makes the exchange honest?",
      answers: [
        {
          title: "Pay the cost",
          copy: "If the price buys agency, the cost is part of the plan rather than a warning to stop.",
          signal: "power at a cost",
          likelihoods: { B: 0.95, UB: 0.6, BR: 0.55, WB: 0.55 },
          suppresses: { U: 0.35, W: 0.35, WG: 0.35 }
        },
        {
          title: "Hide the leverage",
          copy: "Control is safest when no one knows which resource you are holding.",
          signal: "secret leverage",
          likelihoods: { UB: 0.85 },
          suppresses: { B: 0.3 }
        },
        {
          title: "Make it a debt",
          copy: "A cost matters most when it becomes an obligation someone must answer.",
          signal: "binding debt",
          likelihoods: { WB: 0.85 },
          suppresses: { B: 0.25 }
        },
        {
          title: "Spend the restraint",
          copy: "The release itself is the point; the price proves the appetite is real.",
          signal: "unrestrained appetite",
          likelihoods: { BR: 0.85 },
          suppresses: { B: 0.25 }
        }
      ]
    },
    {
      id: "hall_B_graveyard",
      stage: "hall",
      faction: "B",
      eyebrow: "Hall - Black",
      prompt: "Something useful has died, failed, or been spent. What should happen to it now?",
      answers: [
        {
          title: "Reclaim it as leverage",
          copy: "The graveyard is not a memorial. It is a resource line waiting to be used.",
          signal: "graveyard as resource",
          likelihoods: { B: 0.95, BG: 0.65, UB: 0.55, WB: 0.5 },
          suppresses: { U: 0.35, W: 0.35, WG: 0.3 }
        },
        {
          title: "Feed the cycle",
          copy: "Decay matters because it makes the next life possible.",
          signal: "cycle of decay",
          likelihoods: { BG: 0.85, WITHERBLOOM: 0.75 },
          suppresses: { B: 0.3 }
        },
        {
          title: "Protect the record",
          copy: "What is gone should become duty, precedent, or warning.",
          signal: "memorial duty",
          likelihoods: { W: 0.65, LOREHOLD: 0.6 },
          suppresses: { B: 0.25 }
        },
        {
          title: "Turn it into pressure",
          copy: "The loss should make everyone else feel what the exchange is worth.",
          signal: "public pressure",
          likelihoods: { BR: 0.75, SILVERQUILL: 0.65 },
          suppresses: { B: 0.25 }
        }
      ]
    },
    {
      id: "hall_U_understanding",
      stage: "hall",
      faction: "U",
      eyebrow: "Hall - Blue",
      prompt: "The room wants action before the variables are clear. What response feels most responsible?",
      answers: [
        {
          title: "Map the variables",
          copy: "Preserve options, gather the missing information, and move once the structure can be understood.",
          signal: "act after understanding",
          likelihoods: { U: 0.95, WU: 0.6, UB: 0.55, UR: 0.5 },
          suppresses: { B: 0.65, WB: 0.65, BR: 0.35, RG: 0.35 }
        },
        {
          title: "Codify the process",
          copy: "The answer should become a rule everyone can trust.",
          signal: "formal procedure",
          likelihoods: { WU: 0.85 },
          suppresses: { U: 0.25 }
        },
        {
          title: "Keep the secret",
          copy: "The safest move is to know more than the table knows you know.",
          signal: "hidden leverage",
          likelihoods: { UB: 0.85 },
          suppresses: { U: 0.25 }
        },
        {
          title: "Run the experiment",
          copy: "Build the test and let the result teach you in motion.",
          signal: "volatile experiment",
          likelihoods: { UR: 0.85 },
          suppresses: { U: 0.25 }
        }
      ]
    },
    {
      id: "hall_U_possibility",
      stage: "hall",
      faction: "U",
      eyebrow: "Hall - Blue",
      prompt: "A person or system seems limited by its current shape. What makes progress trustworthy?",
      answers: [
        {
          title: "Improve the model",
          copy: "Education, tools, and repeatable practice can turn a current limit into a solvable problem.",
          signal: "optimization through knowledge",
          likelihoods: { U: 0.95, UG: 0.6, UR: 0.55, WU: 0.5 },
          suppresses: { B: 0.65, WB: 0.65, RG: 0.3, BR: 0.25 }
        },
        {
          title: "Adapt the organism",
          copy: "The living form should change so it can survive what comes next.",
          signal: "biological adaptation",
          likelihoods: { UG: 0.85 },
          suppresses: { U: 0.25 }
        },
        {
          title: "Accelerate the prototype",
          copy: "The breakthrough arrives when the experiment is pushed hard enough to reveal itself.",
          signal: "rapid experimentation",
          likelihoods: { UR: 0.85 },
          suppresses: { U: 0.25 }
        },
        {
          title: "Secure the leverage",
          copy: "Improvement matters most when the knowledge becomes power no one can take.",
          signal: "knowledge as leverage",
          likelihoods: { UB: 0.8 },
          suppresses: { U: 0.25 }
        }
      ]
    },
    {
      id: "hall_R_ignition",
      stage: "hall",
      faction: "R",
      eyebrow: "Hall - Red",
      prompt: "A feeling arrives before anyone has given permission. What makes the next move honest?",
      answers: [
        {
          title: "Move with the spark",
          copy: "The feeling is already information. Act while it is alive enough to matter.",
          signal: "emotion into action",
          likelihoods: { R: 0.95, WR: 0.55, UR: 0.5, BR: 0.45, RG: 0.45 },
          suppresses: { WU: 0.45, U: 0.35, WB: 0.25 }
        },
        {
          title: "Protect someone now",
          copy: "The urgency matters because a vulnerable person needs an intervening body.",
          signal: "urgent protection",
          likelihoods: { WR: 0.85 },
          suppresses: { R: 0.25 }
        },
        {
          title: "Make it a test",
          copy: "Build the experiment and let the result teach you what the spark means.",
          signal: "experimental technique",
          likelihoods: { UR: 0.85 },
          suppresses: { R: 0.25 }
        },
        {
          title: "Break restraint publicly",
          copy: "The rupture matters because the room has to feel what restraint was hiding.",
          signal: "transgressive release",
          likelihoods: { BR: 0.85 },
          suppresses: { R: 0.3 }
        },
        {
          title: "Trust the wild body",
          copy: "The answer is in instinct, muscle, and the old belonging underneath the cage.",
          signal: "primal instinct",
          likelihoods: { RG: 0.85 },
          suppresses: { R: 0.3 }
        }
      ]
    },
    {
      id: "hall_R_freedom",
      stage: "hall",
      faction: "R",
      eyebrow: "Hall - Red",
      prompt: "The door is closing and the safe plan will arrive too late. What kind of action keeps the moment alive?",
      answers: [
        {
          title: "Take the direct line",
          copy: "Choose the motion that frees breath now, even if it only opens a temporary window.",
          signal: "direct action",
          likelihoods: { R: 0.95, WR: 0.55, UR: 0.45, BR: 0.45, RG: 0.45 },
          suppresses: { WU: 0.45, U: 0.35, WB: 0.25 }
        },
        {
          title: "Charge for the vulnerable",
          copy: "The line matters because it gets between harm and the person in front of you.",
          signal: "protective charge",
          likelihoods: { WR: 0.85 },
          suppresses: { R: 0.25 }
        },
        {
          title: "Prototype the way out",
          copy: "A risky build can reveal the door no one could map in advance.",
          signal: "rapid prototype",
          likelihoods: { UR: 0.85 },
          suppresses: { R: 0.25 }
        },
        {
          title: "Make pain visible",
          copy: "The point is to make the hidden wound impossible for the room to ignore.",
          signal: "pain as spectacle",
          likelihoods: { BR: 0.85 },
          suppresses: { R: 0.35 }
        },
        {
          title: "Return to the pack",
          copy: "Freedom starts by refusing the cage and trusting the living force that was already yours.",
          signal: "wild belonging",
          likelihoods: { RG: 0.85 },
          suppresses: { R: 0.35 }
        }
      ]
    },
    {
      id: "hall_G_growth",
      stage: "hall",
      faction: "G",
      eyebrow: "Hall - Green",
      prompt: "A living thing is strained before its roots are deep. What care feels honest?",
      answers: [
        {
          title: "Let the roots deepen",
          copy: "Give it time, land, and trust so it can become what it already is.",
          signal: "organic growth",
          likelihoods: { G: 0.95, WG: 0.55, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.35, WU: 0.25 }
        },
        {
          title: "Gather the circle",
          copy: "The answer starts when people choose to carry care together.",
          signal: "communal care",
          likelihoods: { WG: 0.85 },
          suppresses: { G: 0.25 }
        },
        {
          title: "Alter the form",
          copy: "Change the living body so it can survive the future.",
          signal: "engineered adaptation",
          likelihoods: { UG: 0.85 },
          suppresses: { G: 0.3 }
        },
        {
          title: "Use what fell away",
          copy: "The discarded material can still become survival.",
          signal: "reclamation economy",
          likelihoods: { BG: 0.85, WITHERBLOOM: 0.65 },
          suppresses: { G: 0.3 }
        },
        {
          title: "Break the fence",
          copy: "The old body knows what constraint tried to cage.",
          signal: "wild force",
          likelihoods: { RG: 0.85 },
          suppresses: { G: 0.3 }
        }
      ]
    },
    {
      id: "hall_G_natural_order",
      stage: "hall",
      faction: "G",
      eyebrow: "Hall - Green",
      prompt: "The world is slow to answer, but the old pattern still seems alive. What do you follow?",
      answers: [
        {
          title: "Trust the natural pace",
          copy: "Follow instinct, land, and season until the living shape becomes visible.",
          signal: "natural patience",
          likelihoods: { G: 0.95, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.35, WU: 0.25 }
        },
        {
          title: "Improve the organism",
          copy: "A body that cannot meet the future should be deliberately adapted.",
          signal: "purposeful adaptation",
          likelihoods: { UG: 0.85 },
          suppresses: { G: 0.3 }
        },
        {
          title: "Move as a community",
          copy: "The bond matters most when everyone chooses to belong together.",
          signal: "shared community",
          likelihoods: { WG: 0.85 },
          suppresses: { G: 0.25 }
        },
        {
          title: "Reclaim the remains",
          copy: "What collapsed should feed the next survival engine.",
          signal: "decay reclamation",
          likelihoods: { BG: 0.85, WITHERBLOOM: 0.65 },
          suppresses: { G: 0.3 }
        },
        {
          title: "Refuse the cage",
          copy: "Instinct becomes true when it will not be domesticated.",
          signal: "wild refusal",
          likelihoods: { RG: 0.85 },
          suppresses: { G: 0.3 }
        }
      ]
    },
    {
      id: "hall_WU_process",
      stage: "hall",
      faction: "WU",
      eyebrow: "Hall - Azorius",
      prompt: "A community wants one outcome, but the written process points somewhere colder. What decides your first move?",
      answers: [
        {
          title: "Follow the process",
          copy: "Impartial rules protect everyone, especially when emotions are loud.",
          signal: "fairness through process",
          likelihoods: { WU: 0.95 },
          suppresses: { WG: 0.65, WR: 0.65, WB: 0.45 },
        },
        {
          title: "Repair belonging first",
          copy: "A rule without trust will not hold the community together.",
          signal: "belonging over procedure",
          likelihoods: { WG: 0.9 },
          suppresses: { WU: 0.75 },
        },
        {
          title: "Protect the vulnerable now",
          copy: "A process that arrives too late is not protection.",
          signal: "immediate rescue",
          likelihoods: { WR: 0.9 },
          suppresses: { WU: 0.65 },
        },
        {
          title: "Use the rule as leverage",
          copy: "The process matters because it creates obligations that can be collected.",
          signal: "contractual leverage",
          likelihoods: { WB: 0.85 },
          suppresses: { WU: 0.55 },
        },
      ],
    },
    {
      id: "hall_UB_information",
      stage: "hall",
      faction: "UB",
      eyebrow: "Hall - Dimir",
      prompt: "A dangerous truth reaches you before anyone else. What is the most ethical use of it?",
      answers: [
        {
          title: "Hold it until timing matters",
          copy: "Information loses power when it is revealed before it can protect the outcome.",
          signal: "strategic secrecy",
          likelihoods: { UB: 0.95 },
          suppresses: { SILVERQUILL: 0.45, WR: 0.35 },
        },
        {
          title: "Turn it into obligation",
          copy: "The truth creates a debt, and the debt creates durable leverage.",
          signal: "visible obligation",
          likelihoods: { WB: 0.9 },
          suppresses: { UB: 0.55 },
        },
        {
          title: "Make the pattern legible",
          copy: "The truth matters most when it becomes a proof others can test.",
          signal: "public proof",
          likelihoods: { QUANDRIX: 0.8, WU: 0.55 },
          suppresses: { UB: 0.45 },
        },
        {
          title: "Say it so the room changes",
          copy: "A hidden truth is wasted if no one feels its force.",
          signal: "rhetorical reveal",
          likelihoods: { SILVERQUILL: 0.85 },
          suppresses: { UB: 0.55 },
        },
      ],
    },
    {
      id: "hall_BR_intensity",
      stage: "hall",
      faction: "BR",
      eyebrow: "Hall - Rakdos",
      prompt: "A group has become numb and respectable while something true is rotting underneath. How do you wake them up?",
      answers: [
        {
          title: "Make the discomfort impossible to ignore",
          copy: "Shock can be honest when politeness is the lie.",
          signal: "transgressive performance",
          likelihoods: { BR: 0.95 },
          suppresses: { WU: 0.65, WG: 0.45 },
        },
        {
          title: "Break the cage itself",
          copy: "The problem is not numbness; it is domestication.",
          signal: "wild liberation",
          likelihoods: { RG: 0.9 },
          suppresses: { BR: 0.35 },
        },
        {
          title: "Craft a beautiful rupture",
          copy: "The form matters. The release should be art, not just damage.",
          signal: "crafted spectacle",
          likelihoods: { PRISMARI: 0.9 },
          suppresses: { BR: 0.35 },
        },
        {
          title: "Name the wrong and move",
          copy: "Do not perform around harm. Stop it.",
          signal: "righteous action",
          likelihoods: { WR: 0.85 },
          suppresses: { BR: 0.45 },
        },
      ],
    },
    {
      id: "hall_RG_wild",
      stage: "hall",
      faction: "RG",
      eyebrow: "Hall - Gruul",
      prompt: "A system has taken something essential and called the loss progress. What response feels honest?",
      answers: [
        {
          title: "Stop asking permission",
          copy: "What was taken will not be returned by the people who paved it over.",
          signal: "undomesticated grievance",
          likelihoods: { RG: 0.95 },
          suppresses: { WU: 0.75, WG: 0.35 },
        },
        {
          title: "Turn the wound into theater",
          copy: "Make the comfortable audience feel what they were ignoring.",
          signal: "performative transgression",
          likelihoods: { BR: 0.85 },
          suppresses: { RG: 0.35 },
        },
        {
          title: "Rebuild trust around what remains",
          copy: "The answer is a community strong enough to keep people from being erased.",
          signal: "communal repair",
          likelihoods: { WG: 0.8 },
          suppresses: { RG: 0.45 },
        },
        {
          title: "Study the damaged ecosystem",
          copy: "The wound is real, but understanding the cycle is the first act of care.",
          signal: "ecological study",
          likelihoods: { WITHERBLOOM: 0.8, BG: 0.65 },
          suppresses: { RG: 0.35 },
        },
      ],
    },
    {
      id: "hall_WG_belonging",
      stage: "hall",
      faction: "WG",
      eyebrow: "Hall - Selesnya",
      prompt: "Someone feels isolated and brittle. What kind of help matters most?",
      answers: [
        {
          title: "Belonging that softens the self",
          copy: "Healing starts when the person no longer has to be a sealed-off island.",
          signal: "shared self",
          likelihoods: { WG: 0.95 },
          suppresses: { WU: 0.55, UB: 0.65 },
        },
        {
          title: "Clear duties and limits",
          copy: "Safety comes from knowing what everyone is bound to do.",
          signal: "enforceable structure",
          likelihoods: { WU: 0.85 },
          suppresses: { WG: 0.45 },
        },
        {
          title: "Hands-on life care",
          copy: "Tend the messy living needs first; meaning follows.",
          signal: "vital care",
          likelihoods: { WITHERBLOOM: 0.75, UG: 0.6 },
          suppresses: { WG: 0.25 },
        },
        {
          title: "A voice that changes them",
          copy: "The right words can give someone a new image of themselves.",
          signal: "transformative speech",
          likelihoods: { SILVERQUILL: 0.75 },
          suppresses: { WG: 0.35 },
        },
      ],
    },
    {
      id: "hall_WB_obligation",
      stage: "hall",
      faction: "WB",
      eyebrow: "Hall - Orzhov",
      prompt: "Someone caused harm and now owes something serious. What makes repayment real?",
      answers: [
        {
          title: "A debt that outlasts apology",
          copy: "Obligation is not a feeling. It is a structure with consequences.",
          signal: "debt as relationship",
          likelihoods: { WB: 0.95 },
          suppresses: { WG: 0.7, UB: 0.35 },
        },
        {
          title: "A fair process",
          copy: "Restitution has to be impartial or it becomes private power.",
          signal: "fairness through process",
          likelihoods: { WU: 0.85 },
          suppresses: { WB: 0.35 },
        },
        {
          title: "Hidden leverage",
          copy: "The useful debt is the one they do not know you can call in yet.",
          signal: "secret leverage",
          likelihoods: { UB: 0.85 },
          suppresses: { WB: 0.35 },
        },
        {
          title: "Publicly chosen words",
          copy: "The repair must be spoken well enough to reshape reputation.",
          signal: "rhetorical status",
          likelihoods: { SILVERQUILL: 0.85 },
          suppresses: { WB: 0.25 },
        },
      ],
    },
    {
      id: "hall_UR_experiment",
      stage: "hall",
      faction: "UR",
      eyebrow: "Hall - Izzet",
      prompt: "A risky idea could improve everything, but it may fail loudly. What keeps you interested?",
      answers: [
        {
          title: "The mechanism",
          copy: "Even failure teaches something if the experiment was interesting.",
          signal: "mechanistic experiment",
          likelihoods: { UR: 0.95 },
          suppresses: { WU: 0.55, PRISMARI: 0.25 },
        },
        {
          title: "The expression",
          copy: "It matters because it will make people feel what the idea means.",
          signal: "elemental expression",
          likelihoods: { PRISMARI: 0.9 },
          suppresses: { UR: 0.4 },
        },
        {
          title: "The proof",
          copy: "A beautiful idea still needs a pattern that can hold.",
          signal: "formal pattern",
          likelihoods: { QUANDRIX: 0.85 },
          suppresses: { UR: 0.3 },
        },
        {
          title: "The adaptation",
          copy: "The question is whether the system becomes more resilient afterward.",
          signal: "biological adaptation",
          likelihoods: { UG: 0.8 },
          suppresses: { UR: 0.3 },
        },
      ],
    },
    {
      id: "hall_BG_reclamation",
      stage: "hall",
      faction: "BG",
      eyebrow: "Hall - Golgari",
      prompt: "A system collapses and leaves failure, waste, grief, and useful remains. What should happen next?",
      answers: [
        {
          title: "Build from the rot",
          copy: "Nothing discarded stops being part of the city. Reclaim it.",
          signal: "survival through reclamation",
          likelihoods: { BG: 0.95 },
          suppresses: { WU: 0.45, PRISMARI: 0.25 },
        },
        {
          title: "Study the life-death exchange",
          copy: "The collapse reveals how vitality actually moves.",
          signal: "essence ecology",
          likelihoods: { WITHERBLOOM: 0.9 },
          suppresses: { BG: 0.35 },
        },
        {
          title: "Gather the abandoned",
          copy: "The people left behind need belonging before strategy.",
          signal: "communal shelter",
          likelihoods: { WG: 0.75 },
          suppresses: { BG: 0.25 },
        },
        {
          title: "Make the debt visible",
          copy: "Someone profited from the collapse. The ledger should remember.",
          signal: "owed restitution",
          likelihoods: { WB: 0.75 },
          suppresses: { BG: 0.25 },
        },
      ],
    },
    {
      id: "hall_UG_adaptation",
      stage: "hall",
      faction: "UG",
      eyebrow: "Hall - Simic",
      prompt: "A living system is not ready for the future. What response feels most natural?",
      answers: [
        {
          title: "Adapt the organism",
          copy: "If survival requires change, the form should change.",
          signal: "purposeful biological adaptation",
          likelihoods: { UG: 0.95 },
          suppresses: { QUANDRIX: 0.45, WU: 0.25 },
        },
        {
          title: "Find the equation",
          copy: "The living system is an expression of a deeper pattern.",
          signal: "mathematical structure",
          likelihoods: { QUANDRIX: 0.9 },
          suppresses: { UG: 0.45 },
        },
        {
          title: "Study the essence cycle",
          copy: "Life and death are not opposites. The exchange itself matters.",
          signal: "life-death ecology",
          likelihoods: { WITHERBLOOM: 0.85 },
          suppresses: { UG: 0.25 },
        },
        {
          title: "Prototype wildly",
          copy: "Try the strange idea and see what the system teaches back.",
          signal: "chaotic experiment",
          likelihoods: { UR: 0.8 },
          suppresses: { UG: 0.25 },
        },
      ],
    },
    {
      id: "hall_BANT_champion",
      stage: "hall",
      faction: "BANT",
      eyebrow: "Hall - Bant",
      prompt: "The group can only back one line of action. What makes that champion worthy of the whole community's support?",
      answers: [
        {
          title: "Public trust and support",
          copy: "The champion is worthy when their excellence stays visible, accountable, and carried by the community behind them.",
          signal: "supported champion",
          likelihoods: { BANT: 0.95 },
          suppresses: { WU: 0.75, WG: 0.65, UG: 0.65 },
        },
        {
          title: "The fairest procedure",
          copy: "The right line is the one the process can defend impartially.",
          signal: "procedure over champion",
          likelihoods: { WU: 0.85 },
          suppresses: { BANT: 0.65 },
        },
        {
          title: "Everyone moving together",
          copy: "The worth comes from the whole group choosing the same care at the same time.",
          signal: "broad communal belonging",
          likelihoods: { WG: 0.85 },
          suppresses: { BANT: 0.55 },
        },
        {
          title: "The best-adapted form",
          copy: "The worthy line is the one that changes the organism enough to survive.",
          signal: "adaptation over honor",
          likelihoods: { UG: 0.85 },
          suppresses: { BANT: 0.55 },
        },
      ],
    },
    {
      id: "hall_BANT_living_order",
      stage: "hall",
      faction: "BANT",
      eyebrow: "Hall - Bant",
      prompt: "Order can protect, refine, or smother a living community. What makes it honorable?",
      answers: [
        {
          title: "Duty held by living community",
          copy: "Order is honorable when it protects the living body of the group and keeps power answerable to shared duty.",
          signal: "living order",
          likelihoods: { BANT: 0.95 },
          suppresses: { WU: 0.7, WG: 0.55, UG: 0.6 },
        },
        {
          title: "Procedure that cannot bend",
          copy: "Order is honorable because the rule stays stable even when the room wants an exception.",
          signal: "airtight procedure",
          likelihoods: { WU: 0.85 },
          suppresses: { BANT: 0.6 },
        },
        {
          title: "Belonging before rank",
          copy: "Order matters when it dissolves isolation and lets the circle care as one.",
          signal: "belonging before rank",
          likelihoods: { WG: 0.85 },
          suppresses: { BANT: 0.55 },
        },
        {
          title: "Adaptation before duty",
          copy: "Order is only useful if the living system can keep changing toward what comes next.",
          signal: "adaptive life",
          likelihoods: { UG: 0.85 },
          suppresses: { BANT: 0.55 },
        },
      ],
    },
    {
      id: "hall_ESPER_perfectibility",
      stage: "hall",
      faction: "ESPER",
      eyebrow: "Hall - Esper",
      prompt: "A flawed system can be improved, but only if the change is exact. What makes improvement trustworthy?",
      answers: [
        {
          title: "Understand, then refine",
          copy: "Study the system, identify the disorder, and improve it through deliberate knowledge rather than impulse.",
          signal: "perfectibility through applied knowledge",
          likelihoods: { ESPER: 0.95, U: 0.55, WU: 0.55 },
          suppresses: { RG: 0.45, WG: 0.3, BANT: 0.3 },
        },
        {
          title: "Follow the procedure",
          copy: "Improvement is trustworthy when the process stays impartial and public.",
          signal: "procedure over perfectibility",
          likelihoods: { WU: 0.85 },
          suppresses: { ESPER: 0.45 },
        },
        {
          title: "Keep the leverage hidden",
          copy: "Improvement is safest when no one sees the information advantage until it matters.",
          signal: "hidden leverage over design",
          likelihoods: { UB: 0.85 },
          suppresses: { ESPER: 0.35 },
        },
        {
          title: "Protect the living whole",
          copy: "Improvement is trustworthy when it preserves the community that has to live inside it.",
          signal: "living order over exact design",
          likelihoods: { BANT: 0.85, WG: 0.55 },
          suppresses: { ESPER: 0.45 },
        },
      ],
    },
    {
      id: "hall_ESPER_designed_control",
      stage: "hall",
      faction: "ESPER",
      eyebrow: "Hall - Esper",
      prompt: "A plan is nearly perfect, but one part keeps resisting optimization. What should happen next?",
      answers: [
        {
          title: "Make every piece serve the design",
          copy: "Keep refining until the whole system obeys the shape knowledge has revealed.",
          signal: "designed control",
          likelihoods: { ESPER: 0.95, WB: 0.55, UB: 0.55, WU: 0.55 },
          suppresses: { BANT: 0.45, RG: 0.45, G: 0.35 },
        },
        {
          title: "Preserve the obligation",
          copy: "The resistant part matters because it owes or is owed something the structure must honor.",
          signal: "obligation over optimization",
          likelihoods: { WB: 0.85 },
          suppresses: { ESPER: 0.35 },
        },
        {
          title: "Control the unseen variable",
          copy: "Keep the decisive factor hidden until the table can no longer answer it.",
          signal: "hidden variable control",
          likelihoods: { UB: 0.85 },
          suppresses: { ESPER: 0.35 },
        },
        {
          title: "Keep the community whole",
          copy: "A design that breaks the living order is not worth completing.",
          signal: "community over optimization",
          likelihoods: { BANT: 0.85, WG: 0.55 },
          suppresses: { ESPER: 0.5 },
        },
      ],
    },
    {
      id: "hall_GRIXIS_survival_opening",
      stage: "hall",
      faction: "GRIXIS",
      eyebrow: "Hall - Grixis",
      prompt: "A hostile situation leaves one narrow opening. What makes the next move true?",
      answers: [
        {
          title: "Find the weakness and take it",
          copy: "Study the break in the situation, claim the opening, and survive before it closes.",
          signal: "calculated survival opening",
          likelihoods: { GRIXIS: 0.95, B: 0.55, UB: 0.55, BR: 0.5 },
          suppresses: { BANT: 0.55, ESPER: 0.45, WU: 0.4, WG: 0.35 },
        },
        {
          title: "Make the process legitimate",
          copy: "The move is true when the room can audit it and the rule can survive pressure.",
          signal: "legitimacy over survival",
          likelihoods: { WU: 0.85 },
          suppresses: { GRIXIS: 0.45 },
        },
        {
          title: "Release the appetite",
          copy: "The opening matters because pressure wants an honest, unrestrained answer.",
          signal: "appetite over calculation",
          likelihoods: { BR: 0.85 },
          suppresses: { GRIXIS: 0.35 },
        },
        {
          title: "Preserve the whole",
          copy: "The opening is only worth taking if it keeps the community intact.",
          signal: "community over survival leverage",
          likelihoods: { BANT: 0.85, WG: 0.55 },
          suppresses: { GRIXIS: 0.5 },
        },
      ],
    },
    {
      id: "hall_GRIXIS_volatile_calculation",
      stage: "hall",
      faction: "GRIXIS",
      eyebrow: "Hall - Grixis",
      prompt: "The information is incomplete, the pressure is rising, and delay has a cost. What wins your trust?",
      answers: [
        {
          title: "Calculation aimed at survival",
          copy: "Know enough to name the weakness, then act before the table gets another chance to close ranks.",
          signal: "volatile calculation",
          likelihoods: { GRIXIS: 0.95, UB: 0.55, UR: 0.55, BR: 0.55 },
          suppresses: { ESPER: 0.55, BANT: 0.45, WU: 0.35, WG: 0.35 },
        },
        {
          title: "Refine until exact",
          copy: "Pressure is not permission to move before the design is trustworthy.",
          signal: "exact control over volatility",
          likelihoods: { ESPER: 0.85, WU: 0.55 },
          suppresses: { GRIXIS: 0.45 },
        },
        {
          title: "Experiment in the open",
          copy: "The best answer is to try the strange idea and learn from the spark.",
          signal: "experiment over survival leverage",
          likelihoods: { UR: 0.85, PRISMARI: 0.55 },
          suppresses: { GRIXIS: 0.35 },
        },
        {
          title: "Stand with the circle",
          copy: "The safest move is the one the group can carry together.",
          signal: "shared order over self-advocacy",
          likelihoods: { BANT: 0.85, WG: 0.55 },
          suppresses: { GRIXIS: 0.5 },
        },
      ],
    },
    {
      id: "hall_JUND_instinct_pressure",
      stage: "hall",
      faction: "JUND",
      eyebrow: "Hall - Jund",
      prompt: "Pressure strips away the polite answer. What makes the next move true?",
      answers: [
        {
          title: "Trust the gut and move",
          copy: "The body knows enough. Act from the honest feeling and carry the consequence.",
          signal: "instinct under pressure",
          likelihoods: { JUND: 0.95, R: 0.55, RG: 0.55, BR: 0.5 },
          suppresses: { WU: 0.45, WG: 0.35 },
        },
        {
          title: "Make the process legitimate",
          copy: "The move is true when a shared rule can defend it after the pressure passes.",
          signal: "legitimacy over instinct",
          likelihoods: { WU: 0.85 },
          suppresses: { JUND: 0.45 },
        },
        {
          title: "Preserve the living whole",
          copy: "The next move should protect belonging before it indulges appetite.",
          signal: "belonging over appetite",
          likelihoods: { WG: 0.85 },
          suppresses: { JUND: 0.35 },
        },
        {
          title: "Calculate the opening",
          copy: "Move only after the weakness, cost, and leverage are named.",
          signal: "calculation over gut truth",
          likelihoods: { GRIXIS: 0.85, UB: 0.45 },
          suppresses: { JUND: 0.4 },
        },
      ],
    },
    {
      id: "hall_JUND_appetite_consequence",
      stage: "hall",
      faction: "JUND",
      eyebrow: "Hall - Jund",
      prompt: "A hunger rises with real cost attached. What makes it worth following?",
      answers: [
        {
          title: "Feed it and own the cost",
          copy: "Wanting is not a crime. The honest path is to act, pay, and become what survives.",
          signal: "appetite with consequence",
          likelihoods: { JUND: 0.95, BR: 0.55, BG: 0.55, RG: 0.55 },
          suppresses: { WU: 0.35, WG: 0.35 },
        },
        {
          title: "Bind it to duty",
          copy: "A hunger is trustworthy only when it serves a larger obligation.",
          signal: "duty over appetite",
          likelihoods: { WB: 0.85 },
          suppresses: { JUND: 0.45 },
        },
        {
          title: "Let it become spectacle",
          copy: "The point is not survival but the release: visible, dangerous, and impossible to ignore.",
          signal: "performance over survival appetite",
          likelihoods: { BR: 0.85 },
          suppresses: { JUND: 0.35 },
        },
        {
          title: "Compost it into renewal",
          copy: "Hunger is safest when it returns loss to the cycle and feeds what comes next.",
          signal: "cycle over appetite",
          likelihoods: { BG: 0.85, WITHERBLOOM: 0.55 },
          suppresses: { JUND: 0.4 },
        },
      ],
    },
    {
      id: "hall_NAYA_living_whole",
      stage: "hall",
      faction: "NAYA",
      eyebrow: "Hall - Naya",
      prompt: "A living world pulls through care, instinct, and scale. What makes the next move trustworthy?",
      answers: [
        {
          title: "Protect the living whole",
          copy: "Move with the bond that lets life keep growing, not with control or appetite alone.",
          signal: "belonging through protective abundance",
          likelihoods: { NAYA: 0.95, RG: 0.5, WR: 0.45 },
          suppresses: { JUND: 0.4, GRIXIS: 0.35, BANT: 0.3 },
        },
        {
          title: "Stand with the circle",
          copy: "The move is trustworthy when the community can carry it together.",
          signal: "shared community over living-world instinct",
          likelihoods: { WG: 0.85, BANT: 0.45 },
          suppresses: { NAYA: 0.35 },
        },
        {
          title: "Feed the hunger",
          copy: "The honest answer is the appetite that survives the cost.",
          signal: "appetite over belonging",
          likelihoods: { JUND: 0.85, BR: 0.45 },
          suppresses: { NAYA: 0.4 },
        },
        {
          title: "Find the weakness",
          copy: "Trust the opening that gives you leverage before the world can close around you.",
          signal: "calculation over belonging",
          likelihoods: { GRIXIS: 0.85, UB: 0.45 },
          suppresses: { NAYA: 0.4 },
        },
      ],
    },
    {
      id: "hall_NAYA_abundance_instinct",
      stage: "hall",
      faction: "NAYA",
      eyebrow: "Hall - Naya",
      prompt: "Scale is rising fast. When does abundance become wisdom instead of just size?",
      answers: [
        {
          title: "When growth belongs",
          copy: "The right scale deepens life, bond, and protection of the whole.",
          signal: "abundance held by belonging",
          likelihoods: { NAYA: 0.95, RG: 0.55, WR: 0.45 },
          suppresses: { JUND: 0.35, GRIXIS: 0.35 },
        },
        {
          title: "When hunger wins",
          copy: "Scale matters when it can take what it needs and keep moving.",
          signal: "appetite over abundance",
          likelihoods: { JUND: 0.85, BG: 0.45, RG: 0.45 },
          suppresses: { NAYA: 0.4 },
        },
        {
          title: "When order approves",
          copy: "Growth is wise when the whole hierarchy can sanction it.",
          signal: "sanctioned order over abundance",
          likelihoods: { BANT: 0.85, WU: 0.45 },
          suppresses: { NAYA: 0.35 },
        },
        {
          title: "When the circle shares it",
          copy: "Abundance is wise when the whole community can receive and return it.",
          signal: "shared community over living-world scale",
          likelihoods: { WG: 0.85, BANT: 0.35 },
          suppresses: { NAYA: 0.35 },
        },
      ],
    },
    {
      id: "hall_ABZAN_family_endurance",
      stage: "hall",
      faction: "ABZAN",
      eyebrow: "Hall - Abzan",
      prompt: "The house can survive, but only if the next move carries family duty forward. What makes endurance trustworthy?",
      answers: [
        {
          title: "Keep the house alive",
          copy: "Survival matters when it protects family continuity and gives the next generation something rooted to inherit.",
          signal: "family endurance through house continuity",
          likelihoods: { ABZAN: 0.95, WB: 0.55, WG: 0.45 },
          suppresses: { JUND: 0.35, NAYA: 0.3, BANT: 0.25 },
        },
        {
          title: "Let growth outrun the old duty",
          copy: "The future is wiser when life can grow beyond inherited obligations.",
          signal: "growth over inherited duty",
          likelihoods: { NAYA: 0.8, WG: 0.5 },
          suppresses: { ABZAN: 0.35 },
        },
        {
          title: "Feed what survives the cost",
          copy: "Endurance belongs to whatever can pay, adapt, and keep pressure moving.",
          signal: "survival pressure over house continuity",
          likelihoods: { JUND: 0.8, BG: 0.45 },
          suppresses: { ABZAN: 0.4 },
        },
        {
          title: "Make the rule publicly worthy",
          copy: "Continuity needs standards the whole order can recognize and approve.",
          signal: "public legitimacy over family continuity",
          likelihoods: { BANT: 0.8, WU: 0.45 },
          suppresses: { ABZAN: 0.3 },
        },
      ],
    },
    {
      id: "hall_ABZAN_ancestor_perennation",
      stage: "hall",
      faction: "ABZAN",
      eyebrow: "Hall - Abzan",
      prompt: "Ancestors, roots, and the dead are present in the decision. How should memory guide the living?",
      answers: [
        {
          title: "Let memory become stewardship",
          copy: "The dead are not weight alone; they are obligation, warning, and rooted guidance for the house that remains.",
          signal: "ancestor duty through perennation",
          likelihoods: { ABZAN: 0.95, BG: 0.5, WB: 0.45 },
          suppresses: { GRIXIS: 0.35, NAYA: 0.25 },
        },
        {
          title: "Compost loss into renewal",
          copy: "Death feeds what comes next, even when no family oath can contain the cycle.",
          signal: "life-death cycle over house memory",
          likelihoods: { WITHERBLOOM: 0.85, BG: 0.55 },
          suppresses: { ABZAN: 0.35 },
        },
        {
          title: "Protect only the living moment",
          copy: "The living world needs care now, not an inherited debt that keeps speaking over it.",
          signal: "living care over ancestor obligation",
          likelihoods: { NAYA: 0.75, WG: 0.5 },
          suppresses: { ABZAN: 0.35 },
        },
        {
          title: "Break from inherited debt",
          copy: "If a duty cannot be chosen, surviving it may require cutting the obligation loose.",
          signal: "freedom from inherited duty",
          likelihoods: { JUND: 0.75, BR: 0.4 },
          suppresses: { ABZAN: 0.45 },
        },
      ],
    },
    {
      id: "hall_TEMUR_survival_attunement",
      stage: "hall",
      faction: "TEMUR",
      eyebrow: "Hall - Temur",
      prompt: "The terrain is harsh, the signal is thin, and action has a cost. What makes the next move trustworthy?",
      answers: [
        {
          title: "Listen, then move",
          copy: "Survival starts by hearing the land, the body, and the old memory before strength becomes motion.",
          signal: "attuned instinct before force",
          likelihoods: { TEMUR: 0.95, G: 0.55, UG: 0.5, RG: 0.45 },
          suppresses: { JUND: 0.35, NAYA: 0.3, GRIXIS: 0.3, ABZAN: 0.25 },
        },
        {
          title: "Feed the pressure",
          copy: "The honest answer is the hunger that can survive the cost.",
          signal: "appetite over listening",
          likelihoods: { JUND: 0.8, RG: 0.45, BR: 0.4 },
          suppresses: { TEMUR: 0.35 },
        },
        {
          title: "Refine the pattern",
          copy: "The move is safe when observation becomes a cleaner system.",
          signal: "optimization over wild signal",
          likelihoods: { UG: 0.8, QUANDRIX: 0.45 },
          suppresses: { TEMUR: 0.3 },
        },
        {
          title: "Guard the living whole",
          copy: "The right move protects belonging before it tests strength.",
          signal: "communal care over harsh-terrain instinct",
          likelihoods: { NAYA: 0.75, BANT: 0.45, WG: 0.4 },
          suppresses: { TEMUR: 0.35 },
        },
      ],
    },
    {
      id: "hall_TEMUR_elemental_memory",
      stage: "hall",
      faction: "TEMUR",
      eyebrow: "Hall - Temur",
      prompt: "An old signal moves through stone, ice, storm, and ancestor memory. How should it guide the living?",
      answers: [
        {
          title: "Follow the living memory",
          copy: "The signal is not a chain. It is the world remembering enough to help survival choose its next shape.",
          signal: "elemental memory as survival guidance",
          likelihoods: { TEMUR: 0.95, UG: 0.5, RG: 0.4 },
          suppresses: { ABZAN: 0.35, NAYA: 0.25, GRIXIS: 0.25 },
        },
        {
          title: "Keep the house alive",
          copy: "Memory should carry obligation forward through family and the next generation.",
          signal: "ancestor duty over wild memory",
          likelihoods: { ABZAN: 0.8, WB: 0.4, WG: 0.35 },
          suppresses: { TEMUR: 0.35 },
        },
        {
          title: "Turn it into leverage",
          copy: "A signal matters when it reveals the opening before anyone else sees it.",
          signal: "leverage over elemental listening",
          likelihoods: { GRIXIS: 0.75, UR: 0.4 },
          suppresses: { TEMUR: 0.35 },
        },
        {
          title: "Let growth belong",
          copy: "Memory is wisest when it protects the larger living whole.",
          signal: "abundance over harsh-terrain memory",
          likelihoods: { NAYA: 0.75, WG: 0.45 },
          suppresses: { TEMUR: 0.3 },
        },
      ],
    },
    {
      id: "hall_SULTAI_resource_conversion",
      stage: "hall",
      faction: "SULTAI",
      eyebrow: "Hall - Sultai",
      prompt: "A resource is ugly, hidden, or costly, but it could become power. What makes using it trustworthy?",
      answers: [
        {
          title: "Use what others waste",
          copy: "The resource is trustworthy when it converts death, secrecy, cost, or opportunity into power before anyone else can claim it.",
          signal: "ruthless resource conversion",
          likelihoods: { SULTAI: 0.95, B: 0.55, BG: 0.5, UB: 0.45 },
          suppresses: { ABZAN: 0.35, TEMUR: 0.3, NAYA: 0.25 },
        },
        {
          title: "Make it protect the house",
          copy: "A cost is trustworthy when family continuity and remembered duty can answer for it.",
          signal: "house duty over resource conversion",
          likelihoods: { ABZAN: 0.8, WB: 0.45, WG: 0.35 },
          suppresses: { SULTAI: 0.35 },
        },
        {
          title: "Wait for the living signal",
          copy: "Power should not outrun the terrain, body, and memory that make survival wise.",
          signal: "attunement over ruthless conversion",
          likelihoods: { TEMUR: 0.8, G: 0.45, UG: 0.4 },
          suppresses: { SULTAI: 0.3 },
        },
        {
          title: "Turn risk into performance",
          copy: "The best use of danger is the bold move that changes the room before restraint can kill it.",
          signal: "spectacle over hidden conversion",
          likelihoods: { GRIXIS: 0.75, BR: 0.45, UR: 0.4 },
          suppresses: { SULTAI: 0.3 },
        },
      ],
    },
    {
      id: "hall_SULTAI_dead_usefulness",
      stage: "hall",
      faction: "SULTAI",
      eyebrow: "Hall - Sultai",
      prompt: "The dead, the discarded, or the secret cost can still guide the living. What should happen next?",
      answers: [
        {
          title: "Make the dead useful",
          copy: "The dead are not only memory. They are material, warning, labor, and leverage when ambition can make them serve the living choice.",
          signal: "death converted into power",
          likelihoods: { SULTAI: 0.95, BG: 0.55, UB: 0.45 },
          suppresses: { ABZAN: 0.35, TEMUR: 0.25, NAYA: 0.25 },
        },
        {
          title: "Let memory become stewardship",
          copy: "The dead guide best as obligation and continuity for the house that remains.",
          signal: "ancestor duty over necromantic utility",
          likelihoods: { ABZAN: 0.85, WB: 0.45, BG: 0.4 },
          suppresses: { SULTAI: 0.35 },
        },
        {
          title: "Compost loss into renewal",
          copy: "Death feeds life most cleanly when it stays part of a shared cycle rather than a tool of domination.",
          signal: "vitality ecology over ruthless utility",
          likelihoods: { WITHERBLOOM: 0.85, BG: 0.55 },
          suppresses: { SULTAI: 0.35 },
        },
        {
          title: "Hear the old signal",
          copy: "Memory should keep survival listening before it becomes a thing to spend.",
          signal: "elemental memory over utility",
          likelihoods: { TEMUR: 0.75, UG: 0.4 },
          suppresses: { SULTAI: 0.3 },
        },
      ],
    },
    {
      id: "hall_MARDU_total_commitment",
      stage: "hall",
      faction: "MARDU",
      eyebrow: "Hall - Mardu",
      prompt: "The opening is here, but hesitation will break the charge. What makes action trustworthy?",
      answers: [
        {
          title: "Take the opening now",
          copy: "Action is trustworthy when speed, formation, and commitment strike before the moment loses its name.",
          signal: "Red-centered speed through coordinated attack",
          likelihoods: { MARDU: 0.95, R: 0.55, WR: 0.5, BR: 0.45 },
          suppresses: { ABZAN: 0.35, TEMUR: 0.3, SULTAI: 0.25 },
        },
        {
          title: "Keep the house alive",
          copy: "The right move is the one that lets family duty and continuity survive the pressure.",
          signal: "house endurance over raid momentum",
          likelihoods: { ABZAN: 0.8, WB: 0.45, WG: 0.35 },
          suppresses: { MARDU: 0.35 },
        },
        {
          title: "Listen for the living signal",
          copy: "Survival should wait until terrain, memory, and instinct agree on the next strike.",
          signal: "attunement over immediate charge",
          likelihoods: { TEMUR: 0.8, RG: 0.45, UG: 0.35 },
          suppresses: { MARDU: 0.3 },
        },
        {
          title: "Convert the hidden cost",
          copy: "An opening matters most when it can become leverage before anyone else sees its value.",
          signal: "resource conversion over open assault",
          likelihoods: { SULTAI: 0.75, UB: 0.4, BG: 0.35 },
          suppresses: { MARDU: 0.3 },
        },
      ],
    },
    {
      id: "hall_MARDU_war_name_oath",
      stage: "hall",
      faction: "MARDU",
      eyebrow: "Hall - Mardu",
      prompt: "A charge can win the moment, but only a name and code can carry it forward. What keeps speed from becoming noise?",
      answers: [
        {
          title: "Keep the war name",
          copy: "Speed needs oath, formation, and a name strong enough to make every rider answer for the charge.",
          signal: "war-name oath and martial structure",
          likelihoods: { MARDU: 0.95, WR: 0.55, WB: 0.45 },
          suppresses: { JUND: 0.35, NAYA: 0.25, SULTAI: 0.25 },
        },
        {
          title: "Feed what survives",
          copy: "The honest rule is appetite: what can survive the cost earns the next move.",
          signal: "appetite over oath-bound formation",
          likelihoods: { JUND: 0.8, BR: 0.5, RG: 0.4 },
          suppresses: { MARDU: 0.35 },
        },
        {
          title: "Guard the living whole",
          copy: "The next move should protect belonging and abundance before it becomes conquest.",
          signal: "living-world care over martial raid",
          likelihoods: { NAYA: 0.75, WG: 0.45, WR: 0.35 },
          suppresses: { MARDU: 0.3 },
        },
        {
          title: "Use what others waste",
          copy: "Power belongs to the cost, secret, or body that can be converted before the room understands it.",
          signal: "ruthless conversion over visible war code",
          likelihoods: { SULTAI: 0.75, B: 0.45, BG: 0.4 },
          suppresses: { MARDU: 0.3 },
        },
      ],
    },
    {
      id: "hall_JESKAI_disciplined_cunning",
      stage: "hall",
      faction: "JESKAI",
      eyebrow: "Hall - Jeskai",
      prompt: "Insight arrives before the field is ready for it. What makes the next action trustworthy?",
      answers: [
        {
          title: "Train until insight can move",
          copy: "Action is trustworthy when knowledge, breath, and practice have made the line precise enough to take.",
          signal: "Blue-centered cunning through disciplined action",
          likelihoods: { JESKAI: 0.95, U: 0.55, UR: 0.45, WU: 0.4 },
          suppresses: { MARDU: 0.35, SULTAI: 0.3, TEMUR: 0.25 },
        },
        {
          title: "Take the opening now",
          copy: "The moment is honest because speed and commitment can claim it before it disappears.",
          signal: "immediate charge over trained timing",
          likelihoods: { MARDU: 0.8, R: 0.45, WR: 0.4 },
          suppresses: { JESKAI: 0.35 },
        },
        {
          title: "Convert the hidden leverage",
          copy: "Insight matters most when it reveals a resource nobody else knows how to use.",
          signal: "resource conversion over open discipline",
          likelihoods: { SULTAI: 0.75, UB: 0.4 },
          suppresses: { JESKAI: 0.3 },
        },
        {
          title: "Wait for the living signal",
          copy: "The right action should answer terrain, instinct, and survival before technique leads.",
          signal: "attunement over practiced form",
          likelihoods: { TEMUR: 0.75, UG: 0.4 },
          suppresses: { JESKAI: 0.3 },
        },
      ],
    },
    {
      id: "hall_JESKAI_way_form",
      stage: "hall",
      faction: "JESKAI",
      eyebrow: "Hall - Jeskai",
      prompt: "A discipline can sharpen action or become empty restraint. What keeps the Way alive?",
      answers: [
        {
          title: "Let form serve the moving insight",
          copy: "The Way stays alive when structure, courage, and compassion give trained perception a body in the world.",
          signal: "shared restraint giving insight form",
          likelihoods: { JESKAI: 0.95, WU: 0.5, WR: 0.45, U: 0.4 },
          suppresses: { MARDU: 0.3, SULTAI: 0.25, GRIXIS: 0.25 },
        },
        {
          title: "Keep the charge named",
          copy: "Form matters because the oath lets speed and companions keep the action accountable.",
          signal: "war-name oath over monastery form",
          likelihoods: { MARDU: 0.75, WR: 0.45 },
          suppresses: { JESKAI: 0.3 },
        },
        {
          title: "Make the pattern public",
          copy: "Discipline matters when it becomes a process others can trust and repeat.",
          signal: "procedure over martial insight",
          likelihoods: { WU: 0.8, BANT: 0.45 },
          suppresses: { JESKAI: 0.25 },
        },
        {
          title: "Let the wild choose the strike",
          copy: "The move stays alive when instinct and terrain keep technique from becoming a cage.",
          signal: "survival attunement over refined Way",
          likelihoods: { TEMUR: 0.75, RG: 0.4, UG: 0.35 },
          suppresses: { JESKAI: 0.3 },
        },
      ],
    },
    {
      id: "hall_YORE_engineered_agency",
      stage: "hall",
      faction: "YORE",
      eyebrow: "Hall - Yore",
      prompt: "A limit looks natural, final, or inherited. What makes pushing past it trustworthy?",
      answers: [
        {
          title: "Build the agency machine",
          copy: "The answer is trustworthy when structure, knowledge, cost, and heat become a designed way to keep choice alive.",
          signal: "engineered agency against finality",
          likelihoods: { YORE: 0.95, WU: 0.45, UB: 0.45, UR: 0.45, WB: 0.4, BR: 0.4 },
          suppresses: { G: 0.45, NAYA: 0.35, TEMUR: 0.35, SULTAI: 0.25 },
        },
        {
          title: "Perfect the artifact",
          copy: "The artifact matters because it makes a cleaner, more controlled future.",
          signal: "artifact perfection without Red heat",
          likelihoods: { ESPER: 0.85, WU: 0.45, UB: 0.45, WB: 0.4 },
          suppresses: { YORE: 0.35 },
        },
        {
          title: "Use the hidden cost",
          copy: "The limit matters because it can become leverage before anyone else names it.",
          signal: "resource conversion without civic artifice",
          likelihoods: { SULTAI: 0.75, GRIXIS: 0.6, UB: 0.45, B: 0.4 },
          suppresses: { YORE: 0.3 },
        },
        {
          title: "Listen for the living answer",
          copy: "The limit may be a signal from life, terrain, body, or belonging rather than a problem to mechanize.",
          signal: "natural signal over constructed agency",
          likelihoods: { TEMUR: 0.75, NAYA: 0.65, G: 0.6 },
          suppresses: { YORE: 0.45 },
        },
      ],
    },
    {
      id: "hall_YORE_artifice_boundary",
      stage: "hall",
      faction: "YORE",
      eyebrow: "Hall - Yore",
      prompt: "The answer involves artifacts, recursion, or optimization. What keeps it from being generic machinery?",
      answers: [
        {
          title: "The machine refuses surrender",
          copy: "Artifacts and recursion matter because they turn natural closure into constructed continuity and agency.",
          signal: "artifice as refusal of natural surrender",
          likelihoods: { YORE: 0.95, UR: 0.45, UB: 0.45, WB: 0.4, BR: 0.4 },
          suppresses: { ESPER: 0.25, GRIXIS: 0.25, JESKAI: 0.25, MARDU: 0.25, SULTAI: 0.25 },
        },
        {
          title: "The deck just likes artifacts",
          copy: "The pull is the card type or engine efficiency, not the missing-Green worldview.",
          signal: "generic artifact preference",
          likelihoods: { ESPER: 0.65, UR: 0.45 },
          suppresses: { YORE: 0.45 },
        },
        {
          title: "The graveyard is the center",
          copy: "The pull is reuse, death value, or recursion before artifice and constructed agency enter the frame.",
          signal: "generic recursion preference",
          likelihoods: { SULTAI: 0.75, GRIXIS: 0.55, BG: 0.4, UB: 0.4 },
          suppresses: { YORE: 0.35 },
        },
        {
          title: "The charge needs a name",
          copy: "The pull is speed, oath, and a coordinated opening more than a rebuilt system.",
          signal: "martial opening over artifice",
          likelihoods: { MARDU: 0.75, WR: 0.45, BR: 0.4 },
          suppresses: { YORE: 0.3 },
        },
      ],
    },
    {
      id: "hall_GLINT_living_force",
      stage: "hall",
      faction: "GLINT",
      eyebrow: "Hall - Glint",
      prompt: "The table is unstable and the opening is real. What keeps the surge from collapsing into generic chaos?",
      answers: [
        {
          title: "Keep the living pressure learning",
          copy: "The surge matters because appetite, adaptation, force, and volatility stay tied to a living answer rather than random variance.",
          signal: "living force under pressure rather than generic chaos",
          likelihoods: { GLINT: 0.95, UG: 0.45, UR: 0.4, BR: 0.4, BG: 0.4, RG: 0.35 },
          suppresses: { PRISMARI: 0.35, TEMUR: 0.3, GRIXIS: 0.25 },
        },
        {
          title: "Let variance tell the story",
          copy: "The appeal is the spectacle itself: swingy turns, stack chaos, and the feeling that anything might happen.",
          signal: "variance without the non-White frame",
          likelihoods: { UR: 0.75, PRISMARI: 0.7, JESKAI: 0.35 },
          suppresses: { GLINT: 0.45 },
        },
        {
          title: "Feed the strongest instinct",
          copy: "The opening matters because hunger should take what it can before anyone else does.",
          signal: "appetite without adaptive intelligence",
          likelihoods: { JUND: 0.75, BR: 0.45, SULTAI: 0.4, BG: 0.35 },
          suppresses: { GLINT: 0.35 },
        },
        {
          title: "Hear the storm before acting",
          copy: "The opening matters because terrain, weather, and elemental signal should guide force before appetite enters the frame.",
          signal: "attunement without Black appetite",
          likelihoods: { TEMUR: 0.75, UG: 0.4, RG: 0.4 },
          suppresses: { GLINT: 0.3 },
        },
      ],
    },
    {
      id: "hall_GLINT_missing_white",
      stage: "hall",
      faction: "GLINT",
      eyebrow: "Hall - Glint",
      prompt: "A powerful engine keeps learning and feeding. What proves it is Glint rather than a nearby shell?",
      answers: [
        {
          title: "It refuses civic restraint",
          copy: "The engine matters because White-style order, duty, and stability are not allowed to tell appetite and living force what they may become.",
          signal: "missing white as active boundary",
          likelihoods: { GLINT: 0.95, BR: 0.45, UG: 0.45, BG: 0.4, UR: 0.4 },
          suppresses: { BANT: 0.35, ABZAN: 0.35, WU: 0.35, WG: 0.35, WR: 0.25 },
        },
        {
          title: "It is cruel and clever",
          copy: "The engine matters because hidden leverage, pressure, and survival advantage stay ahead of everyone else.",
          signal: "grixis pressure without Green life",
          likelihoods: { GRIXIS: 0.8, UB: 0.45, UR: 0.4, BR: 0.4 },
          suppresses: { GLINT: 0.35 },
        },
        {
          title: "It is hungry and feral",
          copy: "The engine matters because instinct and appetite deserve the kill before reflective adaptation slows them down.",
          signal: "jund appetite without Blue intelligence",
          likelihoods: { JUND: 0.8, BR: 0.45, BG: 0.4, RG: 0.4 },
          suppresses: { GLINT: 0.35 },
        },
        {
          title: "It is adaptive and wild",
          copy: "The engine matters because experimentation, instinct, and elemental force stay alive without needing Black predation.",
          signal: "temur experimentation without Black appetite",
          likelihoods: { TEMUR: 0.8, UG: 0.45, UR: 0.4, RG: 0.4 },
          suppresses: { GLINT: 0.35 },
        },
      ],
    },
    {
      id: "hall_DUNE_territorial_force",
      stage: "hall",
      faction: "DUNE",
      eyebrow: "Hall - Dune",
      prompt: "The line could stop to study, negotiate, or wait. What makes moving first feel trustworthy?",
      answers: [
        {
          title: "Claim the ground now",
          copy: "Motion is trustworthy when White line, Black cost, Red ignition, and Green persistence all press the same field before distance can cool it.",
          signal: "organized territorial pressure before detached contemplation",
          likelihoods: { DUNE: 0.95, BR: 0.45, RG: 0.45, WG: 0.4, WB: 0.4, WR: 0.35 },
          suppresses: { GLINT: 0.35, JUND: 0.3, NAYA: 0.3, MARDU: 0.25, ABZAN: 0.25 },
        },
        {
          title: "Take what instinct wants",
          copy: "Motion is trustworthy because appetite and survival should strike before anyone civilizes the opening.",
          signal: "jund instinct over common-front line",
          likelihoods: { JUND: 0.8, BR: 0.45, RG: 0.4, BG: 0.4 },
          suppresses: { DUNE: 0.35 },
        },
        {
          title: "Protect the living whole",
          copy: "Motion is trustworthy when the charge serves abundance, belonging, and the life that must stay sheltered.",
          signal: "naya belonging over black conquest pressure",
          likelihoods: { NAYA: 0.8, WG: 0.45, RG: 0.4, WR: 0.4 },
          suppresses: { DUNE: 0.35 },
        },
        {
          title: "Let the opening learn while it moves",
          copy: "Motion is trustworthy when appetite adapts in real time and volatility keeps the field alive.",
          signal: "glint adaptation with blue present",
          likelihoods: { GLINT: 0.8, UG: 0.45, UR: 0.4, BG: 0.4 },
          suppresses: { DUNE: 0.35 },
        },
      ],
    },
    {
      id: "hall_DUNE_missing_blue",
      stage: "hall",
      faction: "DUNE",
      eyebrow: "Hall - Dune",
      prompt: "A force can be coordinated, hungry, alive, and immediate. What proves it is Dune rather than a nearby shell?",
      answers: [
        {
          title: "It refuses detached contemplation",
          copy: "The force matters because the line claims ground before Blue-style distance, modeling, or cool delay can take command.",
          signal: "missing blue as territorial-pressure boundary",
          likelihoods: { DUNE: 0.95, BR: 0.45, RG: 0.45, WG: 0.4, WB: 0.4, WR: 0.35 },
          suppresses: { GLINT: 0.35, ABZAN: 0.3, MARDU: 0.3, JUND: 0.25, NAYA: 0.25 },
        },
        {
          title: "It is the charge with a name",
          copy: "The force matters because speed, oath, and ruthless commitment move first under a war-coded opening.",
          signal: "mardu speed without green multiplication",
          likelihoods: { MARDU: 0.8, WR: 0.45, BR: 0.4, WB: 0.35 },
          suppresses: { DUNE: 0.35 },
        },
        {
          title: "It is the house that endures",
          copy: "The force matters because lineage, endurance, and survival keep pressure answerable to the living house.",
          signal: "abzan endurance without red ignition",
          likelihoods: { ABZAN: 0.8, WB: 0.45, WG: 0.4, BG: 0.4 },
          suppresses: { DUNE: 0.35 },
        },
        {
          title: "It is the current that adapts",
          copy: "The force matters because learning, appetite, volatility, and living growth keep mutating before order can pin them down.",
          signal: "glint volatility with blue present",
          likelihoods: { GLINT: 0.8, UG: 0.45, UR: 0.4, BG: 0.4 },
          suppresses: { DUNE: 0.35 },
        },
      ],
    },
    {
      id: "hall_INK_protected_abundance",
      stage: "hall",
      faction: "INK",
      eyebrow: "Hall - Ink",
      prompt: "A gift, archive, or shared resource could help everyone, but it could also be captured. What makes sharing trustworthy?",
      answers: [
        {
          title: "Guard the commons",
          copy: "Sharing is trustworthy when generosity has a public boundary that keeps knowledge, care, and resources from becoming private leverage.",
          signal: "protected public abundance",
          likelihoods: { INK: 0.95, WU: 0.45, WG: 0.45, UG: 0.4, UR: 0.35, WR: 0.35, RG: 0.35, BANT: 0.25, NAYA: 0.25 },
          suppresses: { B: 0.45, UB: 0.35, BR: 0.3, BG: 0.3, GLINT: 0.25, DUNE: 0.25 },
        },
        {
          title: "Let appetite take the opening",
          copy: "The shared thing is only useful if the hungriest force can convert it before the table slows it down.",
          signal: "appetite over protected reciprocity",
          likelihoods: { GLINT: 0.75, JUND: 0.55, BR: 0.4, BG: 0.35 },
          suppresses: { INK: 0.35 },
        },
        {
          title: "Hold the line by force",
          copy: "The resource stays honest when pressure, cost, and bodies keep the field claimed before distance can bargain it away.",
          signal: "force-backed line over open commons",
          likelihoods: { DUNE: 0.75, WR: 0.4, RG: 0.4, WB: 0.35 },
          suppresses: { INK: 0.35 },
        },
        {
          title: "Make the process public",
          copy: "Trust comes from transparent procedure, shared records, and rules that everyone can audit.",
          signal: "procedure-first public process",
          likelihoods: { WU: 0.75, BANT: 0.45, W: 0.35, U: 0.35 },
          suppresses: { INK: 0.2 },
        },
      ],
    },
    {
      id: "hall_INK_missing_black",
      stage: "hall",
      faction: "INK",
      eyebrow: "Hall - Ink",
      prompt: "The table wants abundance, knowledge, and care to circulate. What proves the center is Ink rather than generic group-hug?",
      answers: [
        {
          title: "It resists private capture",
          copy: "The center is Ink when shared resources remain open because Black-style private hoarding is not allowed to define the gift.",
          signal: "missing Black as anti-hoarding boundary",
          likelihoods: { INK: 0.95, WU: 0.45, WG: 0.45, UG: 0.4, RG: 0.35, UR: 0.35, WR: 0.35 },
          suppresses: { B: 0.45, UB: 0.35, BR: 0.3, BG: 0.3 },
        },
        {
          title: "Everyone just gets more",
          copy: "The table mainly wants more cards, mana, and favors without asking what keeps those gifts from being captured.",
          signal: "generic group-hug abundance",
          likelihoods: { WG: 0.55, BANT: 0.4, NAYA: 0.35 },
          suppresses: { INK: 0.35 },
        },
        {
          title: "The archive is the whole point",
          copy: "The answer centers knowledge itself, treating the record as the identity rather than one protected public good among several.",
          signal: "public archive shortcut",
          likelihoods: { U: 0.55, WU: 0.45, BANT: 0.35 },
          suppresses: { INK: 0.25 },
        },
        {
          title: "One card carries it",
          copy: "A single card or commander is being asked to carry the whole identity instead of serving as bounded Commander texture.",
          signal: "single-anchor shortcut",
          likelihoods: { WG: 0.4, UR: 0.35 },
          suppresses: { INK: 0.45 },
        },
      ],
    },
    {
      id: "hall_WITCH_patient_cultivation",
      stage: "hall",
      faction: "WITCH",
      eyebrow: "Hall - Witch",
      prompt: "A small investment could become inevitable if it survives long enough. What makes that patience trustworthy?",
      answers: [
        {
          title: "Let the roots keep the ledger",
          copy: "Patience is trustworthy when growth, structure, calculation, and ambition all protect the same future before impulse can scatter it.",
          signal: "patient cultivation protected by structure",
          likelihoods: { WITCH: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, WB: 0.4, UB: 0.35, BG: 0.35 },
          suppresses: { R: 0.45, BR: 0.35, RG: 0.35, UR: 0.3, GLINT: 0.3, DUNE: 0.25, INK: 0.2 },
        },
        {
          title: "Perfect the public order",
          copy: "The patient thing matters because law, process, and improvement can keep the group legible.",
          signal: "bant order without Black ambition",
          likelihoods: { BANT: 0.8, WU: 0.45, WG: 0.4 },
          suppresses: { WITCH: 0.35 },
        },
        {
          title: "Turn the hidden resource",
          copy: "The patient thing matters because every secret, grave, and opportunity can become leverage.",
          signal: "sultai leverage without White structure",
          likelihoods: { SULTAI: 0.8, UB: 0.45, BG: 0.4 },
          suppresses: { WITCH: 0.35 },
        },
        {
          title: "Make the commons flourish",
          copy: "The patient thing matters because shared abundance should keep circulating rather than becoming one private plan.",
          signal: "ink commons over private inevitability",
          likelihoods: { INK: 0.75, WU: 0.4, WG: 0.4, UG: 0.35 },
          suppresses: { WITCH: 0.3 },
        },
      ],
    },
    {
      id: "hall_WITCH_missing_red",
      stage: "hall",
      faction: "WITCH",
      eyebrow: "Hall - Witch",
      prompt: "The plan is alive, protected, and ambitious. What proves it is Witch rather than a nearby shell or a Red-touched surge?",
      answers: [
        {
          title: "Keep the spark out of command",
          copy: "The center is Witch when impulse, spectacle, haste, and emotional release are excluded so cultivation can remain protected and calculated.",
          signal: "missing Red as active cultivation boundary",
          likelihoods: { WITCH: 0.95, WG: 0.45, WU: 0.45, UG: 0.4, WB: 0.4, UB: 0.35, BG: 0.35 },
          suppresses: { R: 0.5, BR: 0.4, RG: 0.4, UR: 0.35, WR: 0.35, GLINT: 0.35, DUNE: 0.3 },
        },
        {
          title: "Let the surge keep learning",
          copy: "The plan matters because appetite, volatility, and living force should adapt in motion.",
          signal: "glint surge with Red present",
          likelihoods: { GLINT: 0.8, UR: 0.45, BR: 0.4, RG: 0.35 },
          suppresses: { WITCH: 0.35 },
        },
        {
          title: "Take the field before delay",
          copy: "The plan matters because bodies, cost, ignition, and pressure must claim ground now.",
          signal: "dune pressure with Red present",
          likelihoods: { DUNE: 0.8, BR: 0.45, RG: 0.4, WR: 0.35 },
          suppresses: { WITCH: 0.35 },
        },
        {
          title: "Count only the counters",
          copy: "The appeal is mainly proliferate, counters, or one famous commander rather than the full missing-Red worldview.",
          signal: "generic counters shortcut",
          likelihoods: { UG: 0.55, BANT: 0.35, SULTAI: 0.35 },
          suppresses: { WITCH: 0.45 },
        },
      ],
    },
    {
      id: "hall_WR_protection",
      stage: "hall",
      faction: "WR",
      eyebrow: "Hall - Boros",
      prompt: "The rules are too slow to prevent clear harm. What does virtue require?",
      answers: [
        {
          title: "Move now",
          copy: "Justice that arrives after the harm is complete is not enough.",
          signal: "protective action",
          likelihoods: { WR: 0.95 },
          suppresses: { WU: 0.75, LOREHOLD: 0.25 },
        },
        {
          title: "Preserve legitimacy",
          copy: "If the method breaks the standard, the victory may poison the next case.",
          signal: "procedural restraint",
          likelihoods: { WU: 0.9 },
          suppresses: { WR: 0.6 },
        },
        {
          title: "Check the past first",
          copy: "Someone has faced this before. The warning may already exist.",
          signal: "historical warning",
          likelihoods: { LOREHOLD: 0.85 },
          suppresses: { WR: 0.35 },
        },
        {
          title: "Heal the group bond",
          copy: "The community needs to want protection together, not just receive it.",
          signal: "collective harmony",
          likelihoods: { WG: 0.75 },
          suppresses: { WR: 0.3 },
        },
      ],
    },
    {
      id: "hall_LOREHOLD_history",
      stage: "hall",
      faction: "LOREHOLD",
      eyebrow: "Hall - Lorehold",
      prompt: "A crisis demands action, but the past may contain a warning. What comes first?",
      answers: [
        {
          title: "Interrogate the past",
          copy: "The ruin, record, ancestor, or artifact may know what haste will miss.",
          signal: "historical field evidence",
          likelihoods: { LOREHOLD: 0.95 },
          suppresses: { WR: 0.55, UR: 0.25 },
        },
        {
          title: "Protect the present",
          copy: "History matters, but the person in danger is here now.",
          signal: "present-tense justice",
          likelihoods: { WR: 0.9 },
          suppresses: { LOREHOLD: 0.45 },
        },
        {
          title: "Codify the lesson",
          copy: "The past matters because it should become better procedure.",
          signal: "precedent into law",
          likelihoods: { WU: 0.8 },
          suppresses: { LOREHOLD: 0.25 },
        },
        {
          title: "Model the pattern",
          copy: "The past is data. The deeper truth is the structure beneath it.",
          signal: "historical pattern",
          likelihoods: { QUANDRIX: 0.75 },
          suppresses: { LOREHOLD: 0.25 },
        },
      ],
    },
    {
      id: "hall_PRISMARI_expression",
      stage: "hall",
      faction: "PRISMARI",
      eyebrow: "Hall - Prismari",
      prompt: "A work can be technically correct or emotionally unforgettable. What matters more?",
      answers: [
        {
          title: "The unforgettable expression",
          copy: "Technique serves the feeling. The spell has to land in the body.",
          signal: "elemental artistry",
          likelihoods: { PRISMARI: 0.95 },
          suppresses: { UR: 0.45, QUANDRIX: 0.45 },
        },
        {
          title: "The mechanism underneath",
          copy: "If you cannot explain how it works, you have not mastered it.",
          signal: "mechanistic curiosity",
          likelihoods: { UR: 0.9 },
          suppresses: { PRISMARI: 0.4 },
        },
        {
          title: "The transgression",
          copy: "Make them uncomfortable enough to stop pretending.",
          signal: "dangerous spectacle",
          likelihoods: { BR: 0.85 },
          suppresses: { PRISMARI: 0.3 },
        },
        {
          title: "The precise phrase",
          copy: "The strongest performance may be one sentence said exactly right.",
          signal: "verbal precision",
          likelihoods: { SILVERQUILL: 0.85 },
          suppresses: { PRISMARI: 0.3 },
        },
      ],
    },
    {
      id: "hall_QUANDRIX_pattern",
      stage: "hall",
      faction: "QUANDRIX",
      eyebrow: "Hall - Quandrix",
      prompt: "Reality feels chaotic. What guide do you trust most?",
      answers: [
        {
          title: "The underlying pattern",
          copy: "The exception, proof, and model are where the real structure appears.",
          signal: "mathematical abstraction",
          likelihoods: { QUANDRIX: 0.95 },
          suppresses: { BR: 0.35, PRISMARI: 0.3 },
        },
        {
          title: "The adapting body",
          copy: "A pattern matters when it helps life become more fit for the world.",
          signal: "adaptive biology",
          likelihoods: { UG: 0.9 },
          suppresses: { QUANDRIX: 0.4 },
        },
        {
          title: "The test bench",
          copy: "Build the device, run the experiment, and let the weird result speak.",
          signal: "experimental proof",
          likelihoods: { UR: 0.8 },
          suppresses: { QUANDRIX: 0.25 },
        },
        {
          title: "The record",
          copy: "Patterns matter, but history has already run experiments at scale.",
          signal: "historical evidence",
          likelihoods: { LOREHOLD: 0.75 },
          suppresses: { QUANDRIX: 0.25 },
        },
      ],
    },
    {
      id: "hall_SILVERQUILL_words",
      stage: "hall",
      faction: "SILVERQUILL",
      eyebrow: "Hall - Silverquill",
      prompt: "A room is moving in the wrong direction. How do you redirect it?",
      answers: [
        {
          title: "Say the line that changes the room",
          copy: "Words are force. Precision, praise, pressure, and image all matter.",
          signal: "rhetorical force",
          likelihoods: { SILVERQUILL: 0.95 },
          suppresses: { UB: 0.45, WU: 0.35 },
        },
        {
          title: "Make the contract visible",
          copy: "Speech matters when it binds obligation to consequence.",
          signal: "contractual speech",
          likelihoods: { WB: 0.85 },
          suppresses: { SILVERQUILL: 0.25 },
        },
        {
          title: "Codify the standard",
          copy: "The room changes when everyone knows the rule that applies.",
          signal: "formal ruling",
          likelihoods: { WU: 0.8 },
          suppresses: { SILVERQUILL: 0.3 },
        },
        {
          title: "Make the feeling visible",
          copy: "Language is too small; the expression needs scale.",
          signal: "elemental expression",
          likelihoods: { PRISMARI: 0.8 },
          suppresses: { SILVERQUILL: 0.25 },
        },
      ],
    },
    {
      id: "hall_WITHERBLOOM_essence",
      stage: "hall",
      faction: "WITHERBLOOM",
      eyebrow: "Hall - Witherbloom",
      prompt: "A cure requires something messy, costly, or morally uncomfortable. What guides you?",
      answers: [
        {
          title: "The life-death exchange",
          copy: "Vitality is not clean. Healing may require proximity to decay.",
          signal: "messy vitality ecology",
          likelihoods: { WITHERBLOOM: 0.95 },
          suppresses: { WU: 0.45, WG: 0.3 },
        },
        {
          title: "The reclaimed remains",
          copy: "Use what the system threw away and make survival from it.",
          signal: "rot reclamation",
          likelihoods: { BG: 0.9 },
          suppresses: { WITHERBLOOM: 0.3 },
        },
        {
          title: "The improved organism",
          copy: "If the body can be adapted away from fragility, adapt it.",
          signal: "biodesign improvement",
          likelihoods: { UG: 0.8 },
          suppresses: { WITHERBLOOM: 0.25 },
        },
        {
          title: "The nurturing whole",
          copy: "Healing should restore belonging, not just biological function.",
          signal: "communal nurture",
          likelihoods: { WG: 0.75 },
          suppresses: { WITHERBLOOM: 0.25 },
        },
      ],
    },
    {
      id: "hall_COLORLESS_outside_wubrg",
      stage: "hall",
      faction: "COLORLESS",
      eyebrow: "Hall - Colorless",
      prompt: "When the color wheel stops being the right language, what makes the restriction feel worth choosing?",
      answers: [
        {
          title: "Stay outside the wheel",
          copy: "The absence is the discipline: exact mana, exact boundaries, and no need to translate the experience into WUBRG.",
          signal: "outside-WUBRG precision",
          likelihoods: { COLORLESS: 0.95 },
          suppresses: { WUBRG: 0.45, W: 0.35, U: 0.35, B: 0.35, R: 0.35, G: 0.35, YORE: 0.25, ESPER: 0.25, WITCH: 0.25 }
        },
        {
          title: "Build the artifact engine",
          copy: "The machine matters most when its parts assemble into repeatable function, even if the deck still wants colored purposes.",
          signal: "artifact engine without strict Colorless boundary",
          likelihoods: { YORE: 0.65, ESPER: 0.55 },
          suppresses: { COLORLESS: 0.45 }
        },
        {
          title: "Use every color",
          copy: "The pull is fullness: every tool, every color, and a deck that answers limitation by expanding the palette.",
          signal: "five-color fullness",
          likelihoods: { WUBRG: 0.95, W: 0.18, U: 0.18, B: 0.18, R: 0.18, G: 0.18 },
          suppresses: { COLORLESS: 0.65 }
        }
      ]
    },
    {
      id: "hall_COLORLESS_branch_boundary",
      stage: "hall",
      faction: "COLORLESS",
      eyebrow: "Hall - Colorless",
      prompt: "Which branch keeps its shape when Colorless is not allowed to collapse into a catch-all?",
      answers: [
        {
          title: "Chosen restriction",
          copy: "The appeal is the clean line: colorless mana, generic costs, artifacts, Eldrazi, Wastes, and Devoid stay related but separate.",
          signal: "strict branch separation",
          likelihoods: { COLORLESS: 0.95 },
          suppresses: { WUBRG: 0.45, W: 0.3, U: 0.3, B: 0.3, R: 0.3, G: 0.3, YORE: 0.25, ESPER: 0.25, WITCH: 0.25 }
        },
        {
          title: "Only artifacts",
          copy: "The attraction is machine function first, with colorlessness as a useful texture rather than the identity boundary.",
          signal: "artifact-only false positive",
          likelihoods: { YORE: 0.65, ESPER: 0.55 },
          suppresses: { COLORLESS: 0.5 }
        },
        {
          title: "Five-color Eldrazi",
          copy: "The Eldrazi mood is real, but the deck still wants all five colors rather than strict outside-WUBRG discipline.",
          signal: "five-color Eldrazi false positive",
          likelihoods: { WUBRG: 0.8, W: 0.15, U: 0.15, B: 0.15, R: 0.15, G: 0.15 },
          suppresses: { COLORLESS: 0.7 }
        },
        {
          title: "Phyrexian aesthetics",
          copy: "The metallic, body-horror, oil-stained read belongs to a different distinction track unless evidence says otherwise.",
          signal: "Phyrexia distinction gap",
          likelihoods: { WITCH: 0.55, ESPER: 0.45 },
          suppresses: { COLORLESS: 0.55 }
        }
      ]
    },
    {
      id: "hall_WUBRG_full_spectrum",
      stage: "hall",
      faction: "WUBRG",
      eyebrow: "Hall - Five-Color",
      prompt: "When every color is available, what keeps the plan from becoming everything at once?",
      answers: [
        {
          title: "Every color has a job",
          copy: "White sets the structure, Blue clarifies the pattern, Black protects agency, Red moves, and Green keeps the whole thing alive.",
          signal: "all five colors present with roles",
          likelihoods: { WUBRG: 0.95 },
          suppresses: { COLORLESS: 0.55, YORE: 0.3, GLINT: 0.3, DUNE: 0.3, INK: 0.3, WITCH: 0.3 }
        },
        {
          title: "The strongest pile wins",
          copy: "The point is access to the best cards, with identity and tradeoffs treated as secondary.",
          signal: "generic goodstuff false positive",
          likelihoods: { B: 0.2, U: 0.2 },
          suppresses: { WUBRG: 0.65 }
        },
        {
          title: "Stay outside the wheel",
          copy: "The appeal is still the absence of color, not the chance to include every color.",
          signal: "outside-WUBRG restriction over fullness",
          likelihoods: { COLORLESS: 0.9 },
          suppresses: { WUBRG: 0.7 }
        }
      ]
    },
  ],
  crucible: [
    {
      id: "crucible_COLORLESS_WUBRG",
      stage: "crucible",
      pair: ["COLORLESS", "WUBRG"],
      eyebrow: "Crucible - Outside Color or All Five",
      prompt: "When the color wheel is in view, is the answer strongest because it steps outside color, or because every color has a negotiated role?",
      answers: [
        { title: "Step outside color", copy: "The chosen restriction is the point: absence, exact colorless boundaries, and no need to translate the experience into WUBRG.", signal: "chosen outside-WUBRG restriction", likelihoods: { COLORLESS: 0.95 }, suppresses: { WUBRG: 0.9 } },
        { title: "Bring all five in", copy: "Every color belongs at the table, with each role negotiated instead of collapsed into generic access.", signal: "all five colors present and negotiated", likelihoods: { WUBRG: 0.95 }, suppresses: { COLORLESS: 0.9 } }
      ],
    },
    {
      id: "crucible_W_WU",
      stage: "crucible",
      pair: ["W", "WU"],
      eyebrow: "Crucible - Shelter or Procedure",
      prompt: "Does dependable protection begin with a shelter people can trust, or a process nobody can bend?",
      answers: [
        { title: "Shelter first", copy: "The structure matters because it keeps people safe.", signal: "shelter before procedure", likelihoods: { W: 0.95 }, suppresses: { WU: 0.95 } },
        { title: "Process first", copy: "Protection lasts when the rule survives every exception.", signal: "procedure before shelter", likelihoods: { WU: 0.95 }, suppresses: { W: 0.95 } }
      ]
    },
    {
      id: "crucible_W_WR",
      stage: "crucible",
      pair: ["W", "WR"],
      eyebrow: "Crucible - Structure or Intervention",
      prompt: "When people are unsafe, is the first duty to build the standard or step in right now?",
      answers: [
        { title: "Build the standard", copy: "Protection has to become reliable, not only brave.", signal: "reliable protection", likelihoods: { W: 0.95 }, suppresses: { WR: 0.95 } },
        { title: "Step in right now", copy: "Protection that waits for structure can arrive too late.", signal: "immediate duty", likelihoods: { WR: 0.95 }, suppresses: { W: 0.95 } }
      ]
    },
    {
      id: "crucible_W_WG",
      stage: "crucible",
      pair: ["W", "WG"],
      eyebrow: "Crucible - Standard or Belonging",
      prompt: "Does safety begin with shared standards, or with a community that already knows how to hold each other?",
      answers: [
        { title: "Shared standards", copy: "The structure protects even before trust matures.", signal: "standards before belonging", likelihoods: { W: 0.95 }, suppresses: { WG: 0.95 } },
        { title: "Shared belonging", copy: "People protect what they already feel part of together.", signal: "belonging before standards", likelihoods: { WG: 0.95 }, suppresses: { W: 0.95 } }
      ]
    },
    {
      id: "crucible_U_WU",
      stage: "crucible",
      pair: ["U", "WU"],
      eyebrow: "Crucible - Model or Procedure",
      prompt: "Does trust begin with understanding the system, or with a rule no one can bend?",
      answers: [
        { title: "Understand the system", copy: "The rule matters after the model is clear.", signal: "model before procedure", likelihoods: { U: 0.95 }, suppresses: { WU: 0.95 } },
        { title: "Bind the rule", copy: "Understanding matters when it becomes fair process.", signal: "procedure before model", likelihoods: { WU: 0.95 }, suppresses: { U: 0.95 } }
      ]
    },
    {
      id: "crucible_U_UB",
      stage: "crucible",
      pair: ["U", "UB"],
      eyebrow: "Crucible - Understanding or Secret",
      prompt: "Does information matter because it improves the future, or because no one knows you have it?",
      answers: [
        { title: "Improve the future", copy: "Knowledge expands what can be done next.", signal: "knowledge as possibility", likelihoods: { U: 0.95 }, suppresses: { UB: 0.95 } },
        { title: "Keep it unseen", copy: "Information is strongest when it becomes hidden leverage.", signal: "knowledge as secrecy", likelihoods: { UB: 0.95 }, suppresses: { U: 0.95 } }
      ]
    },
    {
      id: "crucible_U_UR",
      stage: "crucible",
      pair: ["U", "UR"],
      eyebrow: "Crucible - Prediction or Spark",
      prompt: "When the idea is promising but unstable, do you wait for the model or fire the prototype?",
      answers: [
        { title: "Wait for the model", copy: "A better prediction prevents a wasted breakthrough.", signal: "predictive patience", likelihoods: { U: 0.95 }, suppresses: { UR: 0.95 } },
        { title: "Fire the prototype", copy: "The experiment has to move before the answer appears.", signal: "experimental spark", likelihoods: { UR: 0.95 }, suppresses: { U: 0.95 } }
      ]
    },
    {
      id: "crucible_U_UG",
      stage: "crucible",
      pair: ["U", "UG"],
      eyebrow: "Crucible - Possibility or Adaptation",
      prompt: "Should the next change refine the model, or alter the living thing that must survive?",
      answers: [
        { title: "Refine the model", copy: "Improve the tool, plan, and knowledge before changing the body.", signal: "engineered possibility", likelihoods: { U: 0.95 }, suppresses: { UG: 0.95 } },
        { title: "Alter the organism", copy: "The living form must adapt to meet the future.", signal: "living adaptation", likelihoods: { UG: 0.95 }, suppresses: { U: 0.95 } }
      ]
    },
    {
      id: "crucible_B_UB",
      stage: "crucible",
      pair: ["B", "UB"],
      eyebrow: "Crucible - Cost or Secret",
      prompt: "When power is available, do you pay the cost directly or wait until hidden information makes the move safer?",
      answers: [
        { title: "Pay directly", copy: "Agency is worth the price when the price keeps your fate yours.", signal: "direct cost", likelihoods: { B: 0.95 }, suppresses: { UB: 0.95 } },
        { title: "Wait in secret", copy: "Leverage is strongest when no one sees the hand move.", signal: "hidden timing", likelihoods: { UB: 0.95 }, suppresses: { B: 0.95 } }
      ]
    },
    {
      id: "crucible_B_BR",
      stage: "crucible",
      pair: ["B", "BR"],
      eyebrow: "Crucible - Control or Release",
      prompt: "Is the cost worth paying because it keeps control, or because it finally releases restraint?",
      answers: [
        { title: "Keep control", copy: "The sacrifice matters because it secures agency.", signal: "controlled cost", likelihoods: { B: 0.95 }, suppresses: { BR: 0.95 } },
        { title: "Release restraint", copy: "The rupture matters because the pressure has to become real.", signal: "unrestrained release", likelihoods: { BR: 0.95 }, suppresses: { B: 0.95 } }
      ]
    },
    {
      id: "crucible_B_BG",
      stage: "crucible",
      pair: ["B", "BG"],
      eyebrow: "Crucible - Asset or Cycle",
      prompt: "Does the graveyard matter because it belongs to your plan, or because decay feeds the next life?",
      answers: [
        { title: "It belongs to the plan", copy: "Death is another resource to convert.", signal: "graveyard leverage", likelihoods: { B: 0.95 }, suppresses: { BG: 0.95 } },
        { title: "It feeds the cycle", copy: "Death matters because survival keeps returning through decay.", signal: "predatory cycle", likelihoods: { BG: 0.95 }, suppresses: { B: 0.95 } }
      ]
    },
    {
      id: "crucible_B_WB",
      stage: "crucible",
      pair: ["B", "WB"],
      eyebrow: "Crucible - Sovereignty or Debt",
      prompt: "Would you rather own the leverage privately, or bind it into an obligation no one can escape?",
      answers: [
        { title: "Own the leverage", copy: "Power protects best when it answers to the self.", signal: "private sovereignty", likelihoods: { B: 0.95 }, suppresses: { WB: 0.95 } },
        { title: "Bind the obligation", copy: "Power lasts when the debt becomes public and enforceable.", signal: "binding obligation", likelihoods: { WB: 0.95 }, suppresses: { B: 0.95 } }
      ]
    },
    {
      id: "crucible_R_WR",
      stage: "crucible",
      pair: ["R", "WR"],
      eyebrow: "Crucible - Spark or Shield",
      prompt: "Is the urgent action about freeing the honest impulse, or protecting someone from the next blow?",
      answers: [
        { title: "Free the impulse", copy: "The action matters because the feeling is true now.", signal: "honest spark", likelihoods: { R: 0.95 }, suppresses: { WR: 0.95 } },
        { title: "Protect the person", copy: "The action matters because harm is already moving toward someone.", signal: "protective intervention", likelihoods: { WR: 0.95 }, suppresses: { R: 0.95 } }
      ]
    },
    {
      id: "crucible_R_UR",
      stage: "crucible",
      pair: ["R", "UR"],
      eyebrow: "Crucible - Impulse or Prototype",
      prompt: "When the spark arrives, do you trust the feeling now or build the test that teaches what it can become?",
      answers: [
        { title: "Trust the feeling now", copy: "The first motion is the truth you can act on.", signal: "present impulse", likelihoods: { R: 0.95 }, suppresses: { UR: 0.95 } },
        { title: "Build the test", copy: "The spark becomes useful when the experiment reveals its shape.", signal: "crafted experiment", likelihoods: { UR: 0.95 }, suppresses: { R: 0.95 } }
      ]
    },
    {
      id: "crucible_R_BR",
      stage: "crucible",
      pair: ["R", "BR"],
      eyebrow: "Crucible - Freedom or Transgression",
      prompt: "Does release matter because it lets you breathe, or because breaking restraint must unsettle the room?",
      answers: [
        { title: "Let me breathe", copy: "Freedom is the point; the action does not need pain to prove it.", signal: "freedom without cruelty", likelihoods: { R: 0.95 }, suppresses: { BR: 0.95 } },
        { title: "Unsettle the room", copy: "The rupture matters when appetite, taboo, or pain becomes impossible to ignore.", signal: "transgressive spectacle", likelihoods: { BR: 0.95 }, suppresses: { R: 0.95 } }
      ]
    },
    {
      id: "crucible_R_RG",
      stage: "crucible",
      pair: ["R", "RG"],
      eyebrow: "Crucible - Feeling or Wild",
      prompt: "Is the impulse true because you feel it now, or because the wild body already knows the path?",
      answers: [
        { title: "Because I feel it now", copy: "The present feeling is enough to move.", signal: "emotion as truth", likelihoods: { R: 0.95 }, suppresses: { RG: 0.95 } },
        { title: "Because the wild knows", copy: "Instinct, force, and primal belonging know before permission arrives.", signal: "wild instinct", likelihoods: { RG: 0.95 }, suppresses: { R: 0.95 } }
      ]
    },
    {
      id: "crucible_G_WG",
      stage: "crucible",
      pair: ["G", "WG"],
      eyebrow: "Crucible - Natural Place or Community",
      prompt: "Does belonging begin with accepting natural place, or with a community choosing to hold together?",
      answers: [
        { title: "Natural place", copy: "The living thing belongs by becoming what it already is.", signal: "natural belonging", likelihoods: { G: 0.95 }, suppresses: { WG: 0.95 } },
        { title: "Shared community", copy: "Belonging becomes real when the group chooses care together.", signal: "communal belonging", likelihoods: { WG: 0.95 }, suppresses: { G: 0.95 } }
      ]
    },
    {
      id: "crucible_G_UG",
      stage: "crucible",
      pair: ["G", "UG"],
      eyebrow: "Crucible - Unfolding or Adaptation",
      prompt: "Should growth unfold from inherent nature, or should the living form be deliberately adapted?",
      answers: [
        { title: "Let it unfold", copy: "The seed already knows its shape; give it roots and time.", signal: "inherent growth", likelihoods: { G: 0.95 }, suppresses: { UG: 0.95 } },
        { title: "Adapt the organism", copy: "Survival may require changing the living form.", signal: "living adaptation", likelihoods: { UG: 0.95 }, suppresses: { G: 0.95 } }
      ]
    },
    {
      id: "crucible_G_BG",
      stage: "crucible",
      pair: ["G", "BG"],
      eyebrow: "Crucible - Living Season or Reclamation",
      prompt: "Does the cycle matter because life grows in season, or because the discarded can be reclaimed?",
      answers: [
        { title: "Trust the living season", copy: "Flourishing returns through roots, pace, and natural renewal.", signal: "life cycle without extraction", likelihoods: { G: 0.95 }, suppresses: { BG: 0.95 } },
        { title: "Reclaim the remains", copy: "Survival starts with what collapse left behind.", signal: "reclamation first", likelihoods: { BG: 0.95 }, suppresses: { G: 0.95 } }
      ]
    },
    {
      id: "crucible_G_RG",
      stage: "crucible",
      pair: ["G", "RG"],
      eyebrow: "Crucible - Root or Wild Refusal",
      prompt: "Does instinct ask for patient flourishing, or for wild refusal against the cage?",
      answers: [
        { title: "Root and grow", copy: "Instinct is old enough to wait, deepen, and become strong.", signal: "patient instinct", likelihoods: { G: 0.95 }, suppresses: { RG: 0.95 } },
        { title: "Break the cage", copy: "The wild body knows constraint must be thrown off.", signal: "wild force", likelihoods: { RG: 0.95 }, suppresses: { G: 0.95 } }
      ]
    },
    {
      id: "crucible_WU_WG",
      stage: "crucible",
      pair: ["WU", "WG"],
      eyebrow: "Crucible - Law or Belonging",
      prompt: "Does peace come first from a fair system everyone follows, or from a shared identity people willingly join?",
      answers: [
        { title: "Fair system", copy: "Peace needs enforceable process.", signal: "law before belonging", likelihoods: { WU: 0.95 }, suppresses: { WG: 0.95 } },
        { title: "Shared identity", copy: "Peace needs belonging before compliance.", signal: "belonging before law", likelihoods: { WG: 0.95 }, suppresses: { WU: 0.95 } },
      ],
    },
    {
      id: "crucible_WU_WR",
      stage: "crucible",
      pair: ["WU", "WR"],
      eyebrow: "Crucible - Process or Intervention",
      prompt: "When process is too slow to prevent harm, is acting outside it a failure or a duty?",
      answers: [
        { title: "A dangerous failure", copy: "Exceptions become precedents.", signal: "anti-exception process", likelihoods: { WU: 0.95 }, suppresses: { WR: 0.95 } },
        { title: "A moral duty", copy: "Protection cannot wait for paperwork.", signal: "urgent protection", likelihoods: { WR: 0.95 }, suppresses: { WU: 0.95 } },
      ],
    },
    {
      id: "crucible_WU_WB",
      stage: "crucible",
      pair: ["WU", "WB"],
      eyebrow: "Crucible - Law or Leverage",
      prompt: "Is a contract sacred because it is fair, or because it creates power that can be collected?",
      answers: [
        { title: "Because it is fair", copy: "The rule should bind everyone impartially.", signal: "impartial law", likelihoods: { WU: 0.95 }, suppresses: { WB: 0.95 } },
        { title: "Because it creates power", copy: "The obligation is the relationship.", signal: "collectible obligation", likelihoods: { WB: 0.95 }, suppresses: { WU: 0.95 } },
      ],
    },
    {
      id: "crucible_UB_WB",
      stage: "crucible",
      pair: ["UB", "WB"],
      eyebrow: "Crucible - Secret or Ledger",
      prompt: "Would you rather hold hidden information no one knows you have, or visible obligation no one can escape?",
      answers: [
        { title: "Hidden information", copy: "Unseen leverage is safest.", signal: "secret power", likelihoods: { UB: 0.95 }, suppresses: { WB: 0.95 } },
        { title: "Visible obligation", copy: "A public debt can shape generations.", signal: "ledger power", likelihoods: { WB: 0.95 }, suppresses: { UB: 0.95 } },
      ],
    },
    {
      id: "crucible_UR_PRISMARI",
      stage: "crucible",
      pair: ["UR", "PRISMARI"],
      eyebrow: "Crucible - Mechanism or Expression",
      prompt: "Does the lightning matter because you can explain how it works, or because it makes everyone feel the storm?",
      answers: [
        { title: "How it works", copy: "The mechanism is the marvel.", signal: "mechanism first", likelihoods: { UR: 0.95 }, suppresses: { PRISMARI: 0.95 } },
        { title: "How it lands", copy: "The experience is the proof.", signal: "expression first", likelihoods: { PRISMARI: 0.95 }, suppresses: { UR: 0.95 } },
      ],
    },
    {
      id: "crucible_UG_QUANDRIX",
      stage: "crucible",
      pair: ["UG", "QUANDRIX"],
      eyebrow: "Crucible - Biology or Pattern",
      prompt: "Do you trust adaptation in the living body, or the abstract pattern beneath the body?",
      answers: [
        { title: "Living adaptation", copy: "Change the organism to meet the world.", signal: "biology first", likelihoods: { UG: 0.95 }, suppresses: { QUANDRIX: 0.95 } },
        { title: "Abstract pattern", copy: "Understand the equation and reality follows.", signal: "pattern first", likelihoods: { QUANDRIX: 0.95 }, suppresses: { UG: 0.95 } },
      ],
    },
    {
      id: "crucible_BG_WITHERBLOOM",
      stage: "crucible",
      pair: ["BG", "WITHERBLOOM"],
      eyebrow: "Crucible - Reclaimer or Ecologist",
      prompt: "Does decay matter most because it lets the discarded survive, or because it reveals how vitality works?",
      answers: [
        { title: "Survival from discard", copy: "The rot feeds the undercity.", signal: "reclamation first", likelihoods: { BG: 0.95 }, suppresses: { WITHERBLOOM: 0.95 } },
        { title: "Vitality exchange", copy: "The bog is a living laboratory.", signal: "essence first", likelihoods: { WITHERBLOOM: 0.95 }, suppresses: { BG: 0.95 } },
      ],
    },
    {
      id: "crucible_WR_LOREHOLD",
      stage: "crucible",
      pair: ["WR", "LOREHOLD"],
      eyebrow: "Crucible - Present or Past",
      prompt: "Do you charge to protect the present, or dig up the past before repeating its mistake?",
      answers: [
        { title: "Protect the present", copy: "The person in front of you needs action.", signal: "present protection", likelihoods: { WR: 0.95 }, suppresses: { LOREHOLD: 0.95 } },
        { title: "Ask the past", copy: "The warning may already be buried.", signal: "past evidence", likelihoods: { LOREHOLD: 0.95 }, suppresses: { WR: 0.95 } },
      ],
    },
    {
      id: "crucible_WB_SILVERQUILL",
      stage: "crucible",
      pair: ["WB", "SILVERQUILL"],
      eyebrow: "Crucible - Ledger or Voice",
      prompt: "Does social power become real through binding obligation, or through words sharp enough to change perception?",
      answers: [
        { title: "Binding obligation", copy: "The relationship is the debt.", signal: "ledger speech", likelihoods: { WB: 0.95 }, suppresses: { SILVERQUILL: 0.95 } },
        { title: "Sharp words", copy: "Perception is the battlefield.", signal: "rhetorical power", likelihoods: { SILVERQUILL: 0.95 }, suppresses: { WB: 0.95 } },
      ],
    },
    {
      id: "crucible_PRISMARI_QUANDRIX",
      stage: "crucible",
      pair: ["PRISMARI", "QUANDRIX"],
      eyebrow: "Crucible - Expression or Proof",
      prompt: "When a pattern is correct but lifeless, do you prove it more carefully or make it land as an experience?",
      answers: [
        { title: "Make it land", copy: "The proof matters when it becomes an unforgettable experience.", signal: "expression as proof", likelihoods: { PRISMARI: 0.95 }, suppresses: { QUANDRIX: 0.75 } },
        { title: "Prove the model", copy: "The experience matters after the pattern is understood.", signal: "model as proof", likelihoods: { QUANDRIX: 0.95 }, suppresses: { PRISMARI: 0.75 } },
      ],
    },
    {
      id: "crucible_PRISMARI_SILVERQUILL",
      stage: "crucible",
      pair: ["PRISMARI", "SILVERQUILL"],
      eyebrow: "Crucible - Performance or Rhetoric",
      prompt: "When language can move a room, should it become a precise argument, a public performance, or an elemental spectacle?",
      answers: [
        { title: "Elemental performance", copy: "Move the room through art, scale, emotion, and spectacle.", signal: "expressive performance", likelihoods: { PRISMARI: 0.95 }, suppresses: { SILVERQUILL: 0.75 } },
        { title: "Precise argument", copy: "Move the room through words sharp enough to change perception.", signal: "rhetorical influence", likelihoods: { SILVERQUILL: 0.95 }, suppresses: { PRISMARI: 0.75 } },
      ],
    },
    {
      id: "crucible_LOREHOLD_QUANDRIX",
      stage: "crucible",
      pair: ["LOREHOLD", "QUANDRIX"],
      eyebrow: "Crucible - Record or Model",
      prompt: "When a mystery has both an elegant theory and an old artifact record, which one leads your next move?",
      answers: [
        { title: "The artifact record", copy: "Follow the relic, the ruin, and the primary-source trace.", signal: "material history", likelihoods: { LOREHOLD: 0.95 }, suppresses: { QUANDRIX: 0.75 } },
        { title: "The elegant model", copy: "Follow the hidden pattern until the whole system explains itself.", signal: "abstract proof", likelihoods: { QUANDRIX: 0.95 }, suppresses: { LOREHOLD: 0.75 } },
      ],
    },
    {
      id: "crucible_QUANDRIX_WITHERBLOOM",
      stage: "crucible",
      pair: ["QUANDRIX", "WITHERBLOOM"],
      eyebrow: "Crucible - Equation or Essence",
      prompt: "A living system behaves strangely. Do you trust the equation beneath it or the messy exchange of life and death?",
      answers: [
        { title: "The equation", copy: "The living system is clearest when its hidden pattern is proven.", signal: "abstract pattern", likelihoods: { QUANDRIX: 0.95 }, suppresses: { WITHERBLOOM: 0.75 } },
        { title: "The exchange", copy: "The living system is clearest through bodies, remedies, poisons, and cost.", signal: "embodied essence", likelihoods: { WITHERBLOOM: 0.95 }, suppresses: { QUANDRIX: 0.75 } },
      ],
    },
    {
      id: "crucible_BR_RG",
      stage: "crucible",
      pair: ["BR", "RG"],
      eyebrow: "Crucible - Theater or Wild",
      prompt: "Is the honest rupture a performance that exposes the lie, or a refusal to be domesticated at all?",
      answers: [
        { title: "Expose through performance", copy: "Make the lie watch itself burn.", signal: "transgressive theater", likelihoods: { BR: 0.95 }, suppresses: { RG: 0.95 } },
        { title: "Refuse domestication", copy: "No stage, no permission, no cage.", signal: "wild refusal", likelihoods: { RG: 0.95 }, suppresses: { BR: 0.95 } },
      ],
    },
    {
      id: "crucible_BANT_ESPER",
      stage: "crucible",
      pair: ["BANT", "ESPER"],
      eyebrow: "Crucible - Living Order or Designed Perfection",
      prompt: "Should order protect a living community, or perfect a designed system?",
      answers: [
        { title: "Protect the living community", copy: "The ideal matters because the people and the champion remain answerable to each other.", signal: "living communal order", likelihoods: { BANT: 0.95 }, suppresses: { ESPER: 0.85 } },
        { title: "Perfect the designed system", copy: "The ideal matters because knowledge, structure, and control can optimize the whole.", signal: "designed perfectibility", likelihoods: { ESPER: 0.95 }, suppresses: { BANT: 0.85 } },
      ],
    },
    {
      id: "crucible_ESPER_GRIXIS",
      stage: "crucible",
      pair: ["ESPER", "GRIXIS"],
      eyebrow: "Crucible - Optimization or Leverage",
      prompt: "Does information matter most because it perfects the system, or because it reveals the weakness that lets you survive?",
      answers: [
        { title: "Perfect the system", copy: "Information becomes design, improvement, and focused control.", signal: "information as optimization", likelihoods: { ESPER: 0.95 }, suppresses: { GRIXIS: 0.85 } },
        { title: "Find the weakness", copy: "Information becomes survival leverage before the opening vanishes.", signal: "information as survival leverage", likelihoods: { GRIXIS: 0.95 }, suppresses: { ESPER: 0.85 } },
      ],
    },
    {
      id: "crucible_GRIXIS_JUND",
      stage: "crucible",
      pair: ["GRIXIS", "JUND"],
      eyebrow: "Crucible - Calculated Survival or Gut Instinct",
      prompt: "When pressure rises, do you calculate the survival leverage or follow the gut that refuses restraint?",
      answers: [
        { title: "Calculate the leverage", copy: "Survival comes from weakness analysis, information, and urgent agency.", signal: "calculated survival", likelihoods: { GRIXIS: 0.95 }, suppresses: { JUND: 0.85 } },
        { title: "Follow the gut", copy: "The honest motion comes from instinct, appetite, and the consequence of being unrestrained.", signal: "gut-instinct appetite", likelihoods: { JUND: 0.95 }, suppresses: { GRIXIS: 0.85 } },
      ],
    },
    {
      id: "crucible_JUND_NAYA",
      stage: "crucible",
      pair: ["JUND", "NAYA"],
      eyebrow: "Crucible - Appetite or Abundance",
      prompt: "Is instinct true because appetite and consequence are real, or because the living whole already knows how to grow?",
      answers: [
        { title: "Appetite and consequence", copy: "The world answers to instinct, personal need, and survival pressure.", signal: "instinct as appetite", likelihoods: { JUND: 0.95 }, suppresses: { NAYA: 0.85 } },
        { title: "The living whole", copy: "Instinct belongs to growth, care, ecosystem, and creature bond.", signal: "instinct as living abundance", likelihoods: { NAYA: 0.95 }, suppresses: { JUND: 0.85 } },
      ],
    },
    {
      id: "crucible_NAYA_BANT",
      stage: "crucible",
      pair: ["NAYA", "BANT"],
      eyebrow: "Crucible - Living Whole or Honored Champion",
      prompt: "Should the group follow the larger living world, or support one honorable line of action?",
      answers: [
        { title: "Follow the living world", copy: "Life, growth, role, place, instinct, and care lead the answer.", signal: "living-world abundance", likelihoods: { NAYA: 0.95 }, suppresses: { BANT: 0.85 } },
        { title: "Support the worthy line", copy: "Public honor, refinement, and communal backing make the action legitimate.", signal: "supported champion", likelihoods: { BANT: 0.95 }, suppresses: { NAYA: 0.85 } },
      ],
    },
    {
      id: "crucible_ABZAN_MARDU",
      stage: "crucible",
      pair: ["ABZAN", "MARDU"],
      eyebrow: "Crucible - Endure or Charge",
      prompt: "When the house is under pressure, do you outlast for the generations, or charge before the opening closes?",
      answers: [
        { title: "Outlast for the generations", copy: "Family, ancestors, defense, and patience keep the house alive.", signal: "family endurance", likelihoods: { ABZAN: 0.95 }, suppresses: { MARDU: 0.85 } },
        { title: "Charge before it closes", copy: "Speed, code, formation, and total commitment take the field now.", signal: "war-bound speed", likelihoods: { MARDU: 0.95 }, suppresses: { ABZAN: 0.85 } },
      ],
    },
    {
      id: "crucible_ABZAN_SULTAI",
      stage: "crucible",
      pair: ["ABZAN", "SULTAI"],
      eyebrow: "Crucible - Ancestor or Resource",
      prompt: "Do the dead bind you to preserve the house, or become material that can be converted into power?",
      answers: [
        { title: "Preserve the house", copy: "Ancestors, Kin-Trees, perennation, and duty keep continuity alive.", signal: "ancestor continuity", likelihoods: { ABZAN: 0.95 }, suppresses: { SULTAI: 0.85 } },
        { title: "Convert the material", copy: "The dead, secrets, costs, and openings can all become advantage.", signal: "ruthless conversion", likelihoods: { SULTAI: 0.95 }, suppresses: { ABZAN: 0.85 } },
      ],
    },
    {
      id: "crucible_TEMUR_SULTAI",
      stage: "crucible",
      pair: ["TEMUR", "SULTAI"],
      eyebrow: "Crucible - Listen or Convert",
      prompt: "Does survival begin by listening to the wild signal, or by converting every available resource?",
      answers: [
        { title: "Listen to the wild", copy: "Land, body, ancestors, weather, and elemental memory tell you how to survive.", signal: "attuned survival", likelihoods: { TEMUR: 0.95 }, suppresses: { SULTAI: 0.85 } },
        { title: "Convert the resource", copy: "Bodies, secrets, costs, and opportunities become tools for advantage.", signal: "calculated conversion", likelihoods: { SULTAI: 0.95 }, suppresses: { TEMUR: 0.85 } },
      ],
    },
    {
      id: "crucible_TEMUR_MARDU",
      stage: "crucible",
      pair: ["TEMUR", "MARDU"],
      eyebrow: "Crucible - Wild Signal or War Signal",
      prompt: "Do you wait for the wild signal, or move in formation before hesitation breaks the opening?",
      answers: [
        { title: "Wait for the wild signal", copy: "Instinct and mental fortitude come from listening before motion.", signal: "survival by listening", likelihoods: { TEMUR: 0.95 }, suppresses: { MARDU: 0.85 } },
        { title: "Move in formation", copy: "The opening is real only if the charge reaches it in time.", signal: "coordinated immediate action", likelihoods: { MARDU: 0.95 }, suppresses: { TEMUR: 0.85 } },
      ],
    },
    {
      id: "crucible_JESKAI_MARDU",
      stage: "crucible",
      pair: ["JESKAI", "MARDU"],
      eyebrow: "Crucible - Trained Line or War Charge",
      prompt: "Should the action wait for trained insight, or take the opening before thought slows the field?",
      answers: [
        { title: "Wait for trained insight", copy: "Discipline, knowledge, and practice release action with precision.", signal: "disciplined action", likelihoods: { JESKAI: 0.95 }, suppresses: { MARDU: 0.85 } },
        { title: "Take the opening", copy: "Speed, code, and total commitment matter because delay loses the fight.", signal: "immediate commitment", likelihoods: { MARDU: 0.95 }, suppresses: { JESKAI: 0.85 } },
      ],
    },
    {
      id: "crucible_JESKAI_SULTAI",
      stage: "crucible",
      pair: ["JESKAI", "SULTAI"],
      eyebrow: "Crucible - Discipline or Secret",
      prompt: "Does insight become trained action, or private advantage converted from secrets and costs?",
      answers: [
        { title: "Trained action", copy: "Knowledge becomes discipline, timing, protection, and precise motion.", signal: "insight through discipline", likelihoods: { JESKAI: 0.95 }, suppresses: { SULTAI: 0.85 } },
        { title: "Private advantage", copy: "Secrets, costs, and the dead become usable material.", signal: "insight as conversion", likelihoods: { SULTAI: 0.95 }, suppresses: { JESKAI: 0.85 } },
      ],
    },
    {
      id: "crucible_JESKAI_TEMUR",
      stage: "crucible",
      pair: ["JESKAI", "TEMUR"],
      eyebrow: "Crucible - Monastery or Wild",
      prompt: "Is the truth found through disciplined practice, or through listening to land, body, and old memory?",
      answers: [
        { title: "Disciplined practice", copy: "The Way trains perception until action can be precise.", signal: "monastic training", likelihoods: { JESKAI: 0.95 }, suppresses: { TEMUR: 0.85 } },
        { title: "Land, body, and memory", copy: "The living wild teaches survival before formal practice does.", signal: "wild attunement", likelihoods: { TEMUR: 0.95 }, suppresses: { JESKAI: 0.85 } },
      ],
    },
    {
      id: "crucible_YORE_GLINT",
      stage: "crucible",
      pair: ["YORE", "GLINT"],
      eyebrow: "Crucible - Constructed Agency or Living Volatility",
      prompt: "Should the answer outbuild natural limits, or move through appetite, adaptation, and volatility without imposed order?",
      answers: [
        { title: "Outbuild the limit", copy: "Civilization, technology, artifice, and progress refuse natural closure.", signal: "constructed agency", likelihoods: { YORE: 0.95 }, suppresses: { GLINT: 0.85 } },
        { title: "Follow the volatility", copy: "Appetite, adaptation, force, and living motion refuse civic restraint.", signal: "living volatility", likelihoods: { GLINT: 0.95 }, suppresses: { YORE: 0.85 } },
      ],
    },
    {
      id: "crucible_GLINT_DUNE",
      stage: "crucible",
      pair: ["GLINT", "DUNE"],
      eyebrow: "Crucible - Volatility or Force",
      prompt: "Does the answer become through living volatility, or take ground through immediate organized force?",
      answers: [
        { title: "Become through volatility", copy: "Appetite, adaptation, and living force keep changing shape.", signal: "adaptive volatility", likelihoods: { GLINT: 0.95 }, suppresses: { DUNE: 0.85 } },
        { title: "Take ground now", copy: "Direct action, physical momentum, and territorial pressure move before delay can answer.", signal: "territorial force", likelihoods: { DUNE: 0.95 }, suppresses: { GLINT: 0.85 } },
      ],
    },
    {
      id: "crucible_DUNE_INK",
      stage: "crucible",
      pair: ["DUNE", "INK"],
      eyebrow: "Crucible - Territorial Force or Guarded Commons",
      prompt: "Is the answer trying to take and hold ground, or protect a shared good from private capture?",
      answers: [
        { title: "Take and hold ground", copy: "Urgency becomes direct action, organized force, and territorial pressure.", signal: "organized force", likelihoods: { DUNE: 0.95 }, suppresses: { INK: 0.85 } },
        { title: "Protect the commons", copy: "Shared prosperity, protected generosity, and open knowledge stay available.", signal: "guarded commons", likelihoods: { INK: 0.95 }, suppresses: { DUNE: 0.85 } },
      ],
    },
    {
      id: "crucible_INK_WITCH",
      stage: "crucible",
      pair: ["INK", "WITCH"],
      eyebrow: "Crucible - Shared Good or Patient Accumulation",
      prompt: "Should the answer keep the commons open, or cultivate a protected position until it becomes inevitable?",
      answers: [
        { title: "Keep it open", copy: "Community benefit, protected generosity, and open knowledge resist private hoarding.", signal: "protected commons", likelihoods: { INK: 0.95 }, suppresses: { WITCH: 0.85 } },
        { title: "Make it inevitable", copy: "Patience, calculation, ambition, and cultivated growth reach critical mass.", signal: "patient accumulation", likelihoods: { WITCH: 0.95 }, suppresses: { INK: 0.85 } },
      ],
    },
    {
      id: "crucible_WITCH_YORE",
      stage: "crucible",
      pair: ["WITCH", "YORE"],
      eyebrow: "Crucible - Cultivated Inevitability or Engineered Intervention",
      prompt: "Does the answer grow a protected position into inevitability, or engineer a way past natural limits?",
      answers: [
        { title: "Grow the inevitability", copy: "Patient cultivation, calculation, and long-horizon accumulation cross a quiet threshold.", signal: "cultivated inevitability", likelihoods: { WITCH: 0.95 }, suppresses: { YORE: 0.85 } },
        { title: "Engineer the answer", copy: "Civilization, technology, artifice, and progress intervene against organic limits.", signal: "engineered intervention", likelihoods: { YORE: 0.95 }, suppresses: { WITCH: 0.85 } },
      ],
    },
  ],
};

const PLACEMENT_SCHEMA = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  title: "Vox Mana Adaptive Placement Model",
  type: "object",
  required: ["_meta", "scoring_rules", "stages", "factions", "question_bank"],
  properties: {
    _meta: {
      type: "object",
      required: ["model_version", "result_version", "faction_count"],
    },
    scoring_rules: { type: "object" },
    stages: { type: "object" },
    factions: {
      type: "object",
      minProperties: 1,
      additionalProperties: {
        type: "object",
        required: [
          "key",
          "raw_id",
          "name",
          "institution_type",
          "world",
          "colors",
          "biological_expression",
          "layered_identity",
          "placement_axes",
          "good_fit_indicators",
          "poor_fit_indicators",
          "discriminator_questions",
          "lateral_inhibition_targets",
        ],
      },
    },
    question_bank: {
      type: "object",
      required: ["gate", "hall", "crucible"],
    },
  },
};

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function normalizeColor(color) {
  const map = {
    white: "W",
    blue: "U",
    black: "B",
    red: "R",
    green: "G",
    W: "W",
    U: "U",
    B: "B",
    R: "R",
    G: "G",
  };
  return map[color] || color;
}

function indicatorText(item) {
  if (typeof item === "string") {
    return item;
  }
  return item?.indicator || item?.statement || item?.summary || "";
}

function normalizeIndicatorList(list = []) {
  return list.map(indicatorText).filter(Boolean);
}

function normalizeTarget(rawTarget) {
  if (!rawTarget) {
    return null;
  }
  if (["W", "U", "B", "R", "G"].includes(String(rawTarget).toUpperCase())) {
    return String(rawTarget).toUpperCase();
  }
  if (RAW_TO_KEY[rawTarget]) {
    return RAW_TO_KEY[rawTarget];
  }
  if (KEY_TO_RAW[rawTarget]) {
    return rawTarget;
  }
  const lowered = String(rawTarget).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return RAW_TO_KEY[lowered] || null;
}

function normalizeQuestion(rawQuestion, fallbackFactionKey, index) {
  const prompt = rawQuestion.prompt || rawQuestion.question || "";
  const collisionTargets = [
    ...(rawQuestion.collision_targets || []),
    ...(rawQuestion.related_factions_to_compare || []),
  ]
    .map(normalizeTarget)
    .filter(Boolean);

  return {
    id: rawQuestion.question_id || rawQuestion.id || `${fallbackFactionKey}_question_${index + 1}`,
    prompt,
    purpose: rawQuestion.purpose || rawQuestion.notes || "",
    supports: rawQuestion.answer_pattern_that_supports_this_faction || rawQuestion[`${fallbackFactionKey}_signal`] || "",
    weakens: rawQuestion.answer_pattern_that_weakens_this_faction || rawQuestion.suppresses_this_faction_if || "",
    collision_targets: collisionTargets,
    evidence_claim_ids: rawQuestion.claim_ids || rawQuestion.evidence_claim_ids || [],
    confidence: rawQuestion.confidence || "Medium",
    ...(rawQuestion.lateral_inhibition === false ? { lateral_inhibition: false } : {}),
  };
}

function collisionGuidanceList(placement = {}) {
  const guidance = placement.collision_guidance;
  if (Array.isArray(guidance)) {
    return guidance;
  }
  if (guidance && typeof guidance === "object" && Array.isArray(guidance.pairs)) {
    return guidance.pairs.map((entry) => ({
      ...(guidance.review_triggers ? { review_triggers: cloneJson(guidance.review_triggers) } : {}),
      ...(guidance.rule ? { rule: guidance.rule } : {}),
      ...entry,
    }));
  }
  return [];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function activeExpressionEntries(identityLayers = {}) {
  return Object.entries(identityLayers.expressions || {}).filter(([, entry]) => entry?.active !== false);
}

function monoExpressionEntries(identityLayers = {}) {
  return activeExpressionEntries(identityLayers)
    .filter(([, entry]) => String(entry?.kind || "").toLowerCase() === "color");
}

function expressionMetaFor(identityLayers = {}, key) {
  return identityLayers.expressions?.[key] || null;
}

function colorLayerFor(identityLayers = {}, code) {
  return identityLayers.colors?.[normalizeColor(code)] || null;
}

function hasAggregateCoreColor(coreColor) {
  return !["W", "U", "B", "R", "G"].includes(normalizeColor(coreColor));
}

function buildLayeredIdentity({ key, name, expressionMeta }) {
  const colors = (expressionMeta?.colors || []).map(normalizeColor).filter(Boolean);
  const secondaryColors = (expressionMeta?.secondary_colors || []).map(normalizeColor).filter(Boolean);
  const coreColor = normalizeColor(expressionMeta?.core_color || colors[0] || "");
  const purity = colors.length === 1 ? 1 : null;
  return {
    core_color: coreColor,
    secondary_colors: secondaryColors,
    secondary_color: hasAggregateCoreColor(coreColor) ? null : secondaryColors[0] || null,
    expression_key: key,
    expression_name: expressionMeta?.name || name,
    expression_kind: expressionMeta?.kind || "expression",
    purity,
    routing: expressionMeta?.routing || {},
  };
}

function buildMonoExpressionInput(key, expressionMeta, identityLayers) {
  const display = structuredClone(expressionMeta?.display || {});
  const placement = structuredClone(expressionMeta?.placement || {});
  const profile = {
    faction_name: display.name || expressionMeta?.name || key,
    faction_type: display.institution_type || expressionMeta?.kind || "color",
    plane_or_setting: display.world || expressionMeta?.world || "The Color Pie",
    color_identity: (expressionMeta?.colors || []).map(normalizeColor),
    profile: {
      overview: display.lore_summary || display.philosophy || "",
      philosophy: display.philosophy || "",
      core_tension: display.core_tension || "",
      mechanics_and_play_pattern: colorLayerFor(identityLayers, expressionMeta?.core_color)?.mechanics?.join(", ") || "",
    },
    core_identity: {
      summary: display.lore_summary || display.philosophy || "",
      philosophy: display.philosophy || "",
      central_tension: display.core_tension || "",
    },
    site_surface: {
      tagline: display.tagline || "",
    },
    profile_version: identityLayers?._meta?.version || "",
  };

  return {
    display,
    placement: {
      color_identity: profile.color_identity,
      good_fit_indicators: placement.good_fit_indicators || [],
      poor_fit_indicators: placement.poor_fit_indicators || [],
      discriminator_questions: placement.discriminator_questions || [],
      collision_guidance: placement.collision_guidance || [],
      chatbot_guidance: placement.chatbot_guidance || {},
      calibration_tuning: placement.placement_axes || {},
      inhibitor_traits: placement.inhibitor_traps || [],
    },
    profile,
  };
}

const COMMANDER_COMPASS_CANDIDATE_CATEGORIES = [
  "native_fit_commanders",
  "weird_stretch_commanders",
  "budget_friendly_commanders",
  "advanced_complexity_commanders",
  "iconic_lore_forward_commanders",
];

const COMMANDER_COMPASS_CANDIDATE_FIELDS = [
  "exact_card_name",
  "display_name",
  "scryfall_uri",
  "edhrec_uri",
  "color_identity",
  "commander_legal",
  "recommendation_type",
  "archetype_tags",
  "why_this_fits",
  "skip_if",
  "gameplay_summary",
  "faction_identity_terms",
  "source_basis",
  "confidence",
  "caution_notes",
  "type_line",
];

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function stripUnbackedPublicRichness(display, key) {
  const stripped = cloneJson(display || {});
  if (!SUPPRESS_UNBACKED_PUBLIC_RICHNESS_KEYS.has(key)) {
    return stripped;
  }

  delete stripped.raw_enrichment;
  delete stripped.commander_compass;
  delete stripped.deck_links;
  delete stripped.research_links;
  return stripped;
}

function pickFields(source, fields) {
  const result = {};
  fields.forEach((field) => {
    if (Object.hasOwn(source || {}, field)) {
      result[field] = cloneJson(source[field]);
    }
  });
  return result;
}

function sanitizeRawProfileEnrichment(enrichment, key) {
  const sanitized = cloneJson(enrichment || {});
  if (SUPPRESS_UNBACKED_FLAVOR_ANCHOR_KEYS.has(key)) {
    delete sanitized.canonical_flavor_text;
  }

  if (key === "BANT" && sanitized.search_and_filter_metadata) {
    const metadata = cloneJson(sanitized.search_and_filter_metadata);
    if (typeof metadata.live_identity_note === "string") {
      metadata.live_identity_note = metadata.live_identity_note.replace(/\bWUG\b/g, "Bant color-direction metadata");
    }
    sanitized.search_and_filter_metadata = metadata;
  }

  return sanitized;
}

function buildRawProfileEnrichment(profile, key = "") {
  if (!profile || typeof profile !== "object") {
    return null;
  }

  const enrichment = pickFields(profile, [
    "historical_timeline",
    "key_figures",
    "canonical_flavor_text",
    "views_on_other_factions",
    "search_and_filter_metadata",
  ]);
  if (profile.data_quality?.raw_enrichment) {
    enrichment.data_quality = cloneJson(profile.data_quality.raw_enrichment);
  }

  return Object.keys(enrichment).length ? sanitizeRawProfileEnrichment(enrichment, key) : null;
}

function sanitizeCommanderCompassCandidate(candidate) {
  return pickFields(candidate, COMMANDER_COMPASS_CANDIDATE_FIELDS);
}

function sanitizeCommanderCompassLinkTargets(linkTargets, key) {
  const sanitized = cloneJson(linkTargets || {
    edhrec_commander_index: "",
    mtgdecks_color_identity: "",
    scryfall_commander_search: "",
    archidekt_color_search: "",
  });
  if (key === "BANT") {
    if (typeof sanitized.scryfall_commander_search === "string") {
      sanitized.scryfall_commander_search = sanitized.scryfall_commander_search.replace(/id%3Dwug/gi, "id%3Dgwu");
    }
    if (typeof sanitized.archidekt_color_search === "string") {
      sanitized.archidekt_color_search = sanitized.archidekt_color_search.replace(/colors=WUG/g, "colors=GWU");
    }
  }
  return sanitized;
}

function sanitizeCommanderCompass(compass, key = "") {
  if (!compass || typeof compass !== "object") {
    return null;
  }

  const sanitized = {
    schema_version: compass.schema_version || "",
    source_research_file: compass.source_research_file || "",
    last_reviewed: compass.last_reviewed || "",
    review_status: compass.review_status || "",
    recommendation_philosophy: compass.recommendation_philosophy || "",
    identity_basis: cloneJson(compass.identity_basis || {
      owned_themes: [],
      allowed_phrases: [],
      avoid_or_contrast_phrases: [],
      adjacent_overlap_notes: [],
      supporting_claim_ids: [],
      supporting_source_ids: [],
    }),
  };

  COMMANDER_COMPASS_CANDIDATE_CATEGORIES.forEach((category) => {
    sanitized[category] = Array.isArray(compass[category])
      ? compass[category].map(sanitizeCommanderCompassCandidate)
      : [];
  });

  sanitized.not_recommended_or_deprioritized = Array.isArray(compass.not_recommended_or_deprioritized)
    ? cloneJson(compass.not_recommended_or_deprioritized)
    : [];
  sanitized.archetype_lanes = Array.isArray(compass.archetype_lanes)
    ? cloneJson(compass.archetype_lanes)
    : [];
  sanitized.link_targets = sanitizeCommanderCompassLinkTargets(compass.link_targets, key);
  sanitized.merge_notes = cloneJson(compass.merge_notes || {});

  return sanitized;
}

function commanderCompassHasCuratedData(compass) {
  if (!compass || typeof compass !== "object") {
    return false;
  }

  return Boolean(
    compass.recommendation_philosophy ||
      (Array.isArray(compass.native_fit_commanders) && compass.native_fit_commanders.length) ||
      (Array.isArray(compass.weird_stretch_commanders) && compass.weird_stretch_commanders.length) ||
      (Array.isArray(compass.budget_friendly_commanders) && compass.budget_friendly_commanders.length) ||
      (Array.isArray(compass.advanced_complexity_commanders) && compass.advanced_complexity_commanders.length) ||
      (Array.isArray(compass.iconic_lore_forward_commanders) && compass.iconic_lore_forward_commanders.length) ||
      (Array.isArray(compass.archetype_lanes) && compass.archetype_lanes.length)
  );
}

function attachCommanderCompass(displayData, rawRecords) {
  Object.entries(rawRecords).forEach(([rawId, raw]) => {
    const key = RAW_TO_KEY[rawId];
    const displayFaction = displayData.factions?.[key];
    if (!key || !displayFaction) {
      return;
    }
    if (SUPPRESS_UNBACKED_PUBLIC_RICHNESS_KEYS.has(key)) {
      delete displayFaction.commander_compass;
      return;
    }

    const commanderCompass = sanitizeCommanderCompass(raw.profile?.commander_compass, key);
    if (commanderCompassHasCuratedData(commanderCompass)) {
      displayFaction.commander_compass = commanderCompass;
    } else if (key === "NAYA" && displayFaction.commander_compass) {
      displayFaction.commander_compass = cloneJson(displayFaction.commander_compass);
    } else {
      delete displayFaction.commander_compass;
    }
  });
}

function buildFactionRecord({ key, rawId, placement, profile, display, expressionMeta = null }) {
  const knownTargets = new Set(KNOWN_LATERAL_INHIBITION[key] || []);
  const normalizedCollisionGuidance = collisionGuidanceList(placement)
    .map((entry) => ({
      entry,
      target: normalizeTarget(entry.against),
    }))
    .filter(({ entry, target }) => {
      if (!target) return false;
      const isDormantDraft = String(entry.collision_id || "").endsWith("_draft") && !knownTargets.has(target);
      return !isDormantDraft;
    });
  const calibration = placement.calibration_tuning || {};
  const rawQuestions = placement.discriminator_questions || [];
  const liveCopyOverride = LIVE_PLACEMENT_COPY_OVERRIDES[key] || {};
  const collisionTargets = [
    ...(KNOWN_LATERAL_INHIBITION[key] || []),
    ...normalizedCollisionGuidance
      .filter(({ entry }) => entry.lateral_inhibition !== false)
      .map(({ target }) => target),
    ...rawQuestions
      .filter((question) => question.lateral_inhibition !== false)
      .flatMap((question) => question.collision_targets || [])
      .map(normalizeTarget),
  ];
  const goodFit = normalizeIndicatorList(
    liveCopyOverride.goodFitIndicators || placement.good_fit_indicators || placement.ideal_fit_indicators || []
  );
  const poorFit = normalizeIndicatorList(liveCopyOverride.poorFitIndicators || placement.poor_fit_indicators || []);
  const layeredIdentity = buildLayeredIdentity({
    key,
    name: display?.name || placement.faction_name || profile.faction_name,
    expressionMeta,
  });
  const factionColors = unique(
    (expressionMeta?.colors || display?.colors || placement.color_identity || profile.color_identity || [])
      .map(normalizeColor)
      .filter(Boolean)
  );

  return {
    key,
    raw_id: rawId,
    name: display?.name || expressionMeta?.name || placement.faction_name || profile.faction_name,
    institution_type:
      display?.institution_type ||
      expressionMeta?.kind ||
      profile.faction_type?.toLowerCase() ||
      "guild",
    world: display?.world || expressionMeta?.world || profile.plane_or_setting || "Ravnica",
    colors: factionColors,
    identity: {
      summary: liveCopyOverride.goodFitIndicators
        ? display?.lore_summary || profile.core_identity?.summary || profile.profile?.overview || ""
        : profile.core_identity?.summary || profile.profile?.overview || display?.lore_summary || "",
      philosophy: liveCopyOverride.goodFitIndicators
        ? display?.philosophy || profile.core_identity?.philosophy || profile.profile?.philosophy || ""
        : profile.core_identity?.philosophy || profile.profile?.philosophy || display?.philosophy || "",
      central_tension:
        liveCopyOverride.goodFitIndicators
          ? display?.core_tension || profile.core_identity?.central_tension || profile.profile?.core_tension || ""
          : profile.core_identity?.central_tension ||
            profile.profile?.core_tension ||
            display?.core_tension ||
            "",
      display_tagline: liveCopyOverride.goodFitIndicators ? display?.tagline || profile.site_surface?.tagline || "" : profile.site_surface?.tagline || display?.tagline || "",
      mechanics: profile.mechanics?.summary || profile.profile?.mechanics_and_play_pattern || "",
    },
    layered_identity: layeredIdentity,
    biological_expression: BIOLOGICAL_PRIORS[key],
    placement_axes: {
      required_positive_evidence_terms: calibration.required_positive_evidence_terms || [],
      required_positive_min_hits: calibration.required_positive_min_hits || 2,
      strengthens_when_user_centers: calibration.strengthen_when_user_centers || [],
      suppress_when_user_centers: calibration.suppress_when_user_centers || [],
      false_positive_guardrail:
        calibration.false_positive_guardrail || placement.chatbot_guidance?.calibration_note || "",
      broad_match_penalty: calibration.broad_match_penalty ?? 0.12,
    },
    good_fit_indicators: goodFit,
    poor_fit_indicators: poorFit,
    inhibitor_traps: unique([
      BIOLOGICAL_PRIORS[key]?.inhibitor_trigger,
      ...(liveCopyOverride.chatbotGuidance?.avoid_when || placement.chatbot_guidance?.how_to_recognize_mismatch || []),
      ...poorFit,
    ]),
    discriminator_questions: rawQuestions.map((question, index) =>
      normalizeQuestion(question, key, index)
    ),
    lateral_inhibition_targets: unique(collisionTargets).filter((target) => target !== key),
    collision_guidance: normalizedCollisionGuidance.map(({ entry, target }) => ({
      ...cloneJson(entry),
      collision_id: entry.collision_id || "",
      against: target,
      separator: entry.separator || "",
      ask: entry.ask || "",
    })),
    chatbot_guidance: liveCopyOverride.chatbotGuidance || placement.chatbot_guidance || {},
    canon_guardrails: {
      never_claim_as_canon: placement.chatbot_guidance?.never_claim_as_canon || [
        "Psychological placement categories are Vox Mana interpretation, not official Wizards canon.",
        "Do not state that a user's personality is objectively determined by a faction.",
      ],
    },
    source_metadata: {
      profile_version: profile.profile_version || profile.schema_version || "",
      placement_model_version: placement.placement_model_version || "",
      source_review_date: profile.source_review_date || profile.last_updated || "",
      claim_count: profile.profile?.claim_ids?.length || 0,
    },
  };
}

async function loadRawFaction(rawId) {
  const basePath = path.join(rawRoot, rawId, rawId);
  return {
    placement: await readJson(`${basePath}.placement.json`),
    profile: await readJson(`${basePath}.profile.json`),
  };
}

function buildPlacementModel(displayData, rawRecords, identityLayers) {
  const factions = {};
  for (const rawId of Object.keys(RAW_TO_KEY)) {
    const key = RAW_TO_KEY[rawId];
    const raw = rawRecords[rawId];
    const expressionMeta = expressionMetaFor(identityLayers, key);
    factions[key] = buildFactionRecord({
      key,
      rawId,
      placement: raw.placement,
      profile: raw.profile,
      display: displayData.factions[key] || structuredClone(expressionMeta?.display || {}),
      expressionMeta,
    });
  }

  monoExpressionEntries(identityLayers).forEach(([key, expressionMeta]) => {
    if (factions[key]) {
      return;
    }
    const monoInput = buildMonoExpressionInput(key, expressionMeta, identityLayers);
    factions[key] = buildFactionRecord({
      key,
      rawId: key,
      placement: monoInput.placement,
      profile: monoInput.profile,
      display: monoInput.display,
      expressionMeta,
    });
  });

  return {
    _meta: {
      model_version: MODEL_VERSION,
      result_version: RESULT_VERSION,
      source: "data/raw-factions plus data/factions.json display surface",
      framing: "Biological expression placement model; Vox Mana interpretive taxonomy, not official canon.",
      faction_count: Object.keys(factions).length,
      identity_layer_version: identityLayers?._meta?.version || "",
      active_expression_keys: Object.keys(factions),
    },
    scoring_rules: {
      prior: "equal",
      prior_log_probability: Math.log(1 / Object.keys(factions).length),
      likelihood_to_delta: {
        "0.95": 1.45,
        "0.90": 1.2,
        "0.85": 1.0,
        "0.75": 0.75,
        "0.65": 0.55,
        "0.60": 0.4,
        "0.55": 0.28,
        "0.50": 0.12,
        "0.45": 0,
        "0.35": -0.45,
        "0.30": -0.55,
        "0.25": -0.7,
        "0.20": -0.9,
        "0.10": -1.5,
        "0.03": -3.5,
      },
      suppression_multiplier: 1,
      prune_delta: -3.5,
      lateral_inhibition_delta: -0.95,
      same_color_pair_inhibition_delta: -0.65,
      broad_match_penalty: -0.12,
      crucible_probability_gap: 0.12,
      decisive_probability_gap: 0.24,
    },
    stages: {
      gate: { min_questions: 4, max_questions: 4, purpose: "Build broad priors." },
      hall: { min_questions: 2, max_questions: 3, purpose: "Ask adaptive evidence questions." },
      crucible: { min_questions: 0, max_questions: 1, purpose: "Resolve close lookalike candidates." },
      max_total_questions: 8,
    },
    factions,
    question_bank: QUESTION_BANK,
  };
}

export function buildFactionContext(model, displayData) {
  const context = {};
  for (const [key, faction] of Object.entries(model.factions)) {
    const display = displayData.factions[key] || {};
    context[key] = {
      name: faction.name,
      institution_type: faction.institution_type,
      world: faction.world,
      colors: faction.colors,
      layered_identity: faction.layered_identity,
      tagline: display.tagline || faction.identity.display_tagline,
      philosophy: display.philosophy || faction.identity.philosophy,
      core_tension: display.core_tension || faction.identity.central_tension,
      affinity: display.affinity || {},
      decree_voice: display.decree_voice || {},
      biological_expression: faction.biological_expression,
      placement_axes: faction.placement_axes,
      good_fit_indicators: faction.good_fit_indicators,
      poor_fit_indicators: faction.poor_fit_indicators,
      inhibitor_traps: faction.inhibitor_traps,
      lateral_inhibition_targets: faction.lateral_inhibition_targets,
      discriminator_questions: faction.discriminator_questions.slice(0, 5),
      chatbot_guidance: faction.chatbot_guidance,
      canon_guardrails: faction.canon_guardrails,
    };
  }
  return context;
}

export function parseBuildFactionArtifactsArgs(argv = []) {
  const options = {
    contextTargets: null,
  };

  for (const arg of argv) {
    if (arg.startsWith("--context-targets=")) {
      const value = arg.slice("--context-targets=".length);
      options.contextTargets = normalizeContextTargets(value);
      continue;
    }
    throw new Error(`Unknown build-faction-artifacts argument: ${arg}`);
  }

  return options;
}

export function normalizeContextTargets(value) {
  const rawTargets = Array.isArray(value) ? value : String(value || "").split(",");
  const targets = [];
  const seen = new Set();
  for (const rawTarget of rawTargets) {
    const target = String(rawTarget || "").trim().toUpperCase();
    if (!target || seen.has(target)) {
      continue;
    }
    targets.push(target);
    seen.add(target);
  }
  if (!targets.length) {
    throw new Error("--context-targets requires at least one faction key");
  }
  return targets;
}

function assertPlainObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object`);
  }
}

function findJsonValueEnd(source, valueStart, label) {
  const opening = source[valueStart];
  const matching = {
    "{": "}",
    "[": "]",
  };
  if (!matching[opening]) {
    throw new Error(`${label} must start with a JSON object or array`);
  }

  const stack = [opening];
  let inString = false;
  let escaping = false;

  for (let index = valueStart + 1; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escaping) {
        escaping = false;
      } else if (char === "\\") {
        escaping = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (matching[char]) {
      stack.push(char);
      continue;
    }

    const expectedClosing = matching[stack[stack.length - 1]];
    if (char === expectedClosing) {
      stack.pop();
      if (!stack.length) {
        return index + 1;
      }
      continue;
    }

    if (char === "}" || char === "]") {
      throw new Error(`${label} has mismatched JSON brackets`);
    }
  }

  throw new Error(`${label} JSON value is incomplete`);
}

function parseExportedJsonConst(source, exportName) {
  const marker = `export const ${exportName} = `;
  const markerStart = source.indexOf(marker);
  if (markerStart === -1) {
    throw new Error(`Missing ${exportName} export`);
  }
  let valueStart = markerStart + marker.length;
  while (/\s/.test(source[valueStart] || "")) {
    valueStart += 1;
  }

  const valueEnd = findJsonValueEnd(source, valueStart, exportName);
  const trailer = source.slice(valueEnd);
  if (!/^\s+as const;/.test(trailer)) {
    throw new Error(`${exportName} export must end with "as const;"`);
  }

  try {
    return JSON.parse(source.slice(valueStart, valueEnd));
  } catch (error) {
    throw new Error(`Could not parse ${exportName}: ${error.message}`);
  }
}

export function parseFactionContextModule(source) {
  const factionContext = parseExportedJsonConst(source, "FACTION_CONTEXT");
  const placementModelMeta = parseExportedJsonConst(source, "PLACEMENT_MODEL_META");
  assertPlainObject(factionContext, "FACTION_CONTEXT");
  assertPlainObject(placementModelMeta, "PLACEMENT_MODEL_META");
  return {
    factionContext,
    placementModelMeta,
  };
}

export function renderFactionContextModule({ factionContext, placementModelMeta }) {
  assertPlainObject(factionContext, "FACTION_CONTEXT");
  assertPlainObject(placementModelMeta, "PLACEMENT_MODEL_META");
  return `/**\n * Generated by tools/build-faction-artifacts.mjs.\n * Keep lore and placement updates in data/raw-factions and data/factions.json.\n */\nexport const FACTION_CONTEXT = ${JSON.stringify(factionContext, null, 2)} as const;\n\nexport const PLACEMENT_MODEL_META = ${JSON.stringify(placementModelMeta, null, 2)} as const;\n`;
}

export function assertOnlyContextTargetsChanged(beforeContext, afterContext, targets) {
  assertPlainObject(beforeContext, "before FACTION_CONTEXT");
  assertPlainObject(afterContext, "after FACTION_CONTEXT");
  const targetSet = new Set(normalizeContextTargets(targets));
  const beforeKeys = Object.keys(beforeContext);
  const afterKeys = Object.keys(afterContext);

  if (JSON.stringify(beforeKeys) !== JSON.stringify(afterKeys)) {
    throw new Error("Targeted context merge changed FACTION_CONTEXT key order or key set");
  }

  for (const key of beforeKeys) {
    if (targetSet.has(key)) {
      continue;
    }
    if (JSON.stringify(beforeContext[key]) !== JSON.stringify(afterContext[key])) {
      throw new Error(`Targeted context merge would change non-target FACTION_CONTEXT entry ${key}`);
    }
  }
}

export function mergeFactionContextEntries({ existingContext, freshContext, targets }) {
  assertPlainObject(existingContext, "existing FACTION_CONTEXT");
  assertPlainObject(freshContext, "fresh FACTION_CONTEXT");
  const normalizedTargets = normalizeContextTargets(targets);

  for (const target of normalizedTargets) {
    if (!Object.prototype.hasOwnProperty.call(existingContext, target)) {
      throw new Error(`Target ${target} is missing from existing FACTION_CONTEXT`);
    }
    if (!Object.prototype.hasOwnProperty.call(freshContext, target)) {
      throw new Error(`Target ${target} is missing from fresh FACTION_CONTEXT`);
    }
  }

  const targetSet = new Set(normalizedTargets);
  const merged = {};
  for (const [key, value] of Object.entries(existingContext)) {
    merged[key] = targetSet.has(key) ? freshContext[key] : value;
  }
  assertOnlyContextTargetsChanged(existingContext, merged, normalizedTargets);
  return merged;
}

async function main() {
  const options = parseBuildFactionArtifactsArgs(process.argv.slice(2));
  const rawDirs = (await readdir(rawRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const missing = Object.keys(RAW_TO_KEY).filter((rawId) => !rawDirs.includes(rawId));
  if (missing.length) {
    throw new Error(`Missing raw faction folders: ${missing.join(", ")}`);
  }

  const displayData = await readJson(displayPath);
  const identityLayers = await readJson(identityLayersPath);
  displayData._meta = {
    ...(displayData._meta || {}),
    placement_model_version: MODEL_VERSION,
    raw_source: "data/raw-factions",
    identity_layer_version: identityLayers?._meta?.version || "",
  };

  const rawRecords = {};
  for (const rawId of Object.keys(RAW_TO_KEY)) {
    rawRecords[rawId] = await loadRawFaction(rawId);
  }

  const model = buildPlacementModel(displayData, rawRecords, identityLayers);

  displayData.identity_layers = {
    version: identityLayers?._meta?.version || "",
    colors: identityLayers.colors || {},
    expressions: Object.fromEntries(
      Object.entries(identityLayers.expressions || {}).filter(([key]) =>
        Object.prototype.hasOwnProperty.call(model.factions, key)
      )
    ),
  };

  Object.entries(model.factions).forEach(([key, faction]) => {
    const expressionMeta = expressionMetaFor(identityLayers, key);
    const expressionDisplay = stripUnbackedPublicRichness(structuredClone(expressionMeta?.display || {}), key);
    const existingDisplay = stripUnbackedPublicRichness(displayData.factions[key] || {}, key);
    const rawManaged = Object.values(RAW_TO_KEY).includes(key);
    const rawProfileEnrichment = RAW_PROFILE_ENRICHMENT_KEYS.has(key)
      ? buildRawProfileEnrichment(rawRecords[KEY_TO_RAW[key]]?.profile, key)
      : null;
    const suppressUnbackedPublicRichness = SUPPRESS_UNBACKED_PUBLIC_RICHNESS_KEYS.has(key);
    const rawProfileDeckLinks = rawManaged && !suppressUnbackedPublicRichness && Array.isArray(rawRecords[KEY_TO_RAW[key]]?.profile?.deck_links)
      ? cloneJson(rawRecords[KEY_TO_RAW[key]].profile.deck_links)
      : null;
    const rawProfileResearchLinks = rawManaged && !suppressUnbackedPublicRichness && rawRecords[KEY_TO_RAW[key]]?.profile?.research_links
      ? cloneJson(rawRecords[KEY_TO_RAW[key]].profile.research_links)
      : {};
    const expressionEdhrecSlug = suppressUnbackedPublicRichness
      ? null
      : expressionMeta?.routing?.edhrec_slug;
    const displayCommanderCompass = key === "NAYA"
      ? expressionDisplay.commander_compass
      : (commanderCompassHasCuratedData(existingDisplay.commander_compass)
          ? existingDisplay.commander_compass
          : expressionDisplay.commander_compass);
    const colorlessDisplayOverrides = key === "COLORLESS"
      ? {
          lore_summary: expressionDisplay.lore_summary || existingDisplay.lore_summary,
          affinity: expressionDisplay.affinity || existingDisplay.affinity,
          archetypes: expressionDisplay.archetypes || existingDisplay.archetypes,
        }
      : {};
    const displayBase = ["NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI"].includes(key)
      ? {
          ...existingDisplay,
          ...expressionDisplay,
          staples: expressionDisplay.staples || existingDisplay.staples,
          land_base: expressionDisplay.land_base || existingDisplay.land_base,
          commander_compass: displayCommanderCompass,
        }
      : {
          ...expressionDisplay,
          ...existingDisplay,
          ...colorlessDisplayOverrides,
          staples: existingDisplay.staples || expressionDisplay.staples,
          land_base: ["COLORLESS", "WUBRG"].includes(key)
            ? expressionDisplay.land_base || existingDisplay.land_base
            : existingDisplay.land_base || expressionDisplay.land_base,
          commander_compass: rawManaged ? undefined : displayCommanderCompass,
        };
    displayData.factions[key] = {
      ...displayBase,
      key,
      name: displayBase.name || faction.name,
      institution_type: displayBase.institution_type || faction.institution_type,
      world: displayBase.world || faction.world,
      colors: displayBase.colors || faction.colors,
      research_links: {
        ...(displayBase.research_links || {}),
        ...rawProfileResearchLinks,
        ...(expressionEdhrecSlug ? { edhrec_slug: expressionEdhrecSlug } : {}),
      },
      ...(rawProfileDeckLinks ? { deck_links: rawProfileDeckLinks } : {}),
      ...(rawProfileEnrichment ? { raw_enrichment: rawProfileEnrichment } : {}),
      identity: faction.layered_identity,
      identity_blend: expressionMeta?.identity_blend || "",
    };
  });
  attachCommanderCompass(displayData, rawRecords);
  displayData._meta.factions = Object.keys(model.factions).length;
  const factionContext = buildFactionContext(model, displayData);

  if (options.contextTargets) {
    const existingContextModule = parseFactionContextModule(await readFile(factionContextPath, "utf8"));
    const mergedContext = mergeFactionContextEntries({
      existingContext: existingContextModule.factionContext,
      freshContext: factionContext,
      targets: options.contextTargets,
    });
    const ts = renderFactionContextModule({
      factionContext: mergedContext,
      placementModelMeta: existingContextModule.placementModelMeta,
    });
    await writeFile(factionContextPath, ts);

    console.log(`Built ${Object.keys(model.factions).length} faction placement records.`);
    console.log(`Merged targeted Supabase context entries: ${options.contextTargets.join(", ")}`);
    console.log(`Wrote ${path.relative(repoRoot, factionContextPath)}`);
    return;
  }

  await writeJson(displayPath, displayData);
  await writeJson(placementModelPath, model);
  await writeJson(placementSchemaPath, PLACEMENT_SCHEMA);

  const ts = renderFactionContextModule({
    factionContext,
    placementModelMeta: model._meta,
  });
  await writeFile(factionContextPath, ts);

  console.log(`Built ${Object.keys(model.factions).length} faction placement records.`);
  console.log(`Wrote ${path.relative(repoRoot, placementModelPath)}`);
  console.log(`Wrote ${path.relative(repoRoot, placementSchemaPath)}`);
  console.log(`Wrote ${path.relative(repoRoot, factionContextPath)}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
