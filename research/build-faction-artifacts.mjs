import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
  azorius_senate: "WU",
  bant: "BANT",
  boros_legion: "WR",
  cult_of_rakdos: "BR",
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
  W: ["WB"],
  U: ["WU", "UB", "UR", "UG"],
  B: ["UB", "BR", "BG", "WB"],
  R: ["WR", "UR", "BR", "RG"],
  G: ["WG", "UG", "BG", "RG"],
  WU: ["WG", "WR", "WB", "SILVERQUILL"],
  WG: ["WU", "WR", "WITHERBLOOM"],
  WR: ["WU", "LOREHOLD", "WG"],
  WB: ["WU", "UB", "SILVERQUILL"],
  UB: ["WB", "UG"],
  UR: ["PRISMARI", "QUANDRIX", "UG"],
  PRISMARI: ["UR", "BR", "SILVERQUILL"],
  UG: ["QUANDRIX", "UR", "WITHERBLOOM"],
  BANT: ["WU", "WG", "UG"],
  QUANDRIX: ["UG", "UR", "LOREHOLD"],
  BG: ["WITHERBLOOM", "WG", "WB"],
  WITHERBLOOM: ["BG", "UG", "WG"],
  BR: ["RG", "PRISMARI", "WR"],
  RG: ["BR", "WG", "WITHERBLOOM"],
  LOREHOLD: ["WR", "WU", "QUANDRIX"],
  SILVERQUILL: ["WB", "WU", "PRISMARI", "UB"],
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
          likelihoods: { W: 0.75, WU: 0.9, BANT: 0.85, WB: 0.6, WG: 0.55 },
          suppresses: { BR: 0.45, RG: 0.35 },
        },
        {
          title: "Immediate protection",
          copy: "If someone is in danger, the right first move is to step between them and harm.",
          signal: "protective intervention",
          likelihoods: { W: 0.85, WR: 0.9, LOREHOLD: 0.55, WG: 0.5 },
          suppresses: { WU: 0.35, UB: 0.25 },
        },
        {
          title: "Information advantage",
          copy: "Read the room, hold your position, and act when the hidden structure is visible.",
          signal: "hidden information",
          likelihoods: { U: 0.95, UB: 0.9, B: 0.75, WB: 0.65, QUANDRIX: 0.25 },
          suppresses: { WR: 0.3, BR: 0.25 },
        },
        {
          title: "A bold release of force",
          copy: "Break the paralysis with motion, spectacle, or a move nobody can ignore.",
          signal: "high-intensity action",
          likelihoods: { BR: 0.85, RG: 0.8, PRISMARI: 0.75, WR: 0.55 },
          suppresses: { WU: 0.4, WG: 0.25 },
        },
        {
          title: "A living system response",
          copy: "Look for what is growing, decaying, adapting, or asking to be tended.",
          signal: "living systems",
          likelihoods: { WITHERBLOOM: 0.85, UG: 0.8, BG: 0.75, WG: 0.6 },
          suppresses: { UB: 0.25, BR: 0.25 },
        },
        {
          title: "The first honest motion",
          copy: "Move before the feeling gets trapped under permission, fear, or overthinking.",
          signal: "immediate ignition",
          likelihoods: { R: 0.95, WR: 0.55, UR: 0.5, BR: 0.45, RG: 0.45 },
          suppresses: { WU: 0.35, U: 0.25 },
        },
        {
          title: "The older living pattern",
          copy: "Root, observe, and let the answer follow the life already carrying the strain.",
          signal: "natural order under strain",
          likelihoods: { G: 0.95, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.25 },
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
          likelihoods: { W: 0.9, BANT: 0.9, WU: 0.8, WR: 0.7, SILVERQUILL: 0.55 },
          suppresses: { UB: 0.3, BR: 0.25 },
        },
        {
          title: "Power that is earned and owed",
          copy: "Influence is a ledger: debts, duties, inheritance, and the price of keeping promises.",
          signal: "obligation ledger",
          likelihoods: { WB: 0.9, SILVERQUILL: 0.6, WU: 0.45 },
          suppresses: { WG: 0.35, RG: 0.3 },
        },
        {
          title: "Power that stays unseen",
          copy: "The cleanest leverage is the kind people do not know you have.",
          signal: "invisible leverage",
          likelihoods: { UB: 0.9, B: 0.75, WB: 0.6 },
          suppresses: { SILVERQUILL: 0.35, WR: 0.35 },
        },
        {
          title: "Power that transforms",
          copy: "The best strength changes the organism, the system, or the self into a better fit.",
          signal: "adaptive transformation",
          likelihoods: { UG: 0.85, U: 0.55, WITHERBLOOM: 0.65, QUANDRIX: 0.6, UR: 0.5 },
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
          likelihoods: { R: 0.95, WR: 0.5, UR: 0.45, BR: 0.45, RG: 0.45 },
          suppresses: { WU: 0.3, B: 0.2 },
        },
        {
          title: "Power that grows from roots",
          copy: "Strength is cleanest when it rises from land, creatures, time, and the shape life already holds.",
          signal: "rooted growth",
          likelihoods: { G: 0.95, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.25 },
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
          likelihoods: { W: 0.75, LOREHOLD: 0.9, BANT: 0.75, WU: 0.65, WB: 0.55 },
          suppresses: { BR: 0.25, RG: 0.25 },
        },
        {
          title: "The pattern",
          copy: "The hidden equation, repeatable structure, or edge case everyone else missed.",
          signal: "abstract pattern",
          likelihoods: { QUANDRIX: 0.9, UR: 0.65, UG: 0.55, UB: 0.45 },
          suppresses: { BR: 0.25, WR: 0.2 },
        },
        {
          title: "The leverage",
          copy: "What can still be converted, what price is worth paying, and who controls the next move.",
          signal: "personal leverage",
          likelihoods: { B: 0.85, UB: 0.55, WB: 0.5 },
          suppresses: { W: 0.25, WG: 0.25 },
        },
        {
          title: "The body of the system",
          copy: "What is alive, vulnerable, mutating, sick, hungry, or becoming something else.",
          signal: "biological reality",
          likelihoods: { UG: 0.85, WITHERBLOOM: 0.8, BG: 0.65 },
          suppresses: { WU: 0.25, SILVERQUILL: 0.2 },
        },
        {
          title: "The wound",
          copy: "What was taken, who was harmed, and what polite language is trying to cover.",
          signal: "specific grievance",
          likelihoods: { RG: 0.9, WR: 0.65, BG: 0.55 },
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
          likelihoods: { R: 0.95, WR: 0.45, UR: 0.45, BR: 0.4, RG: 0.4 },
          suppresses: { WU: 0.3, U: 0.25 },
        },
        {
          title: "The natural role",
          copy: "What is trying to grow, what pace it needs, and where it belongs in the living order.",
          signal: "natural role",
          likelihoods: { G: 0.95, WG: 0.5, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.2 },
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
          likelihoods: { WG: 0.9, BANT: 0.85, WITHERBLOOM: 0.55, WR: 0.45 },
          suppresses: { UB: 0.35, BR: 0.25 },
        },
        {
          title: "A chance to build and test",
          copy: "A lab, a workshop, or a problem strange enough to justify the risk.",
          signal: "experimental construction",
          likelihoods: { UR: 0.9, U: 0.55, UG: 0.65, QUANDRIX: 0.55, PRISMARI: 0.45 },
          suppresses: { WU: 0.25, WG: 0.25 },
        },
        {
          title: "A stage big enough for the truth",
          copy: "An institution that lets intensity, beauty, critique, or discomfort actually land.",
          signal: "truth through expression",
          likelihoods: { PRISMARI: 0.85, BR: 0.75, SILVERQUILL: 0.65 },
          suppresses: { WU: 0.3, WG: 0.2 },
        },
        {
          title: "A durable legacy",
          copy: "Something that outlasts mood: law, lineage, contracts, record, or remembered duty.",
          signal: "durable legacy",
          likelihoods: { W: 0.85, WB: 0.85, LOREHOLD: 0.75, WU: 0.6 },
          suppresses: { BR: 0.25, RG: 0.25 },
        },
        {
          title: "A place that uses what others discard",
          copy: "Waste, failure, rot, grief, and leftovers become the start of the next structure.",
          signal: "reclamation",
          likelihoods: { BG: 0.9, B: 0.75, WITHERBLOOM: 0.7, RG: 0.45 },
          suppresses: { WU: 0.25, PRISMARI: 0.2 },
        },
        {
          title: "A chance to live the spark",
          copy: "A place where the feeling can become action before the moment goes cold.",
          signal: "present-tense freedom",
          likelihoods: { R: 0.95, WR: 0.4, UR: 0.4, BR: 0.4, RG: 0.4 },
          suppresses: { WU: 0.25, WB: 0.2 },
        },
        {
          title: "A place to grow as you are",
          copy: "A living order where roots deepen, instincts return, and patient strength unfolds.",
          signal: "rooted belonging",
          likelihoods: { G: 0.95, WG: 0.55, UG: 0.5, BG: 0.5, RG: 0.5 },
          suppresses: { U: 0.25, WU: 0.2 },
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
  ],
  crucible: [
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
  };
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

function buildLayeredIdentity({ key, name, expressionMeta }) {
  const colors = (expressionMeta?.colors || []).map(normalizeColor).filter(Boolean);
  const secondaryColors = (expressionMeta?.secondary_colors || []).map(normalizeColor).filter(Boolean);
  const purity = colors.length === 1 ? 1 : null;
  return {
    core_color: normalizeColor(expressionMeta?.core_color || colors[0] || ""),
    secondary_colors: secondaryColors,
    secondary_color: secondaryColors[0] || null,
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

function pickFields(source, fields) {
  const result = {};
  fields.forEach((field) => {
    if (Object.hasOwn(source || {}, field)) {
      result[field] = cloneJson(source[field]);
    }
  });
  return result;
}

function sanitizeCommanderCompassCandidate(candidate) {
  return pickFields(candidate, COMMANDER_COMPASS_CANDIDATE_FIELDS);
}

function sanitizeCommanderCompass(compass) {
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
  sanitized.link_targets = cloneJson(compass.link_targets || {
    edhrec_commander_index: "",
    mtgdecks_color_identity: "",
    scryfall_commander_search: "",
    archidekt_color_search: "",
  });
  sanitized.merge_notes = cloneJson(compass.merge_notes || {});

  return sanitized;
}

function attachCommanderCompass(displayData, rawRecords) {
  Object.entries(rawRecords).forEach(([rawId, raw]) => {
    const key = RAW_TO_KEY[rawId];
    const displayFaction = displayData.factions?.[key];
    if (!key || !displayFaction) {
      return;
    }

    const commanderCompass = sanitizeCommanderCompass(raw.profile?.commander_compass);
    if (commanderCompass) {
      displayFaction.commander_compass = commanderCompass;
    } else {
      delete displayFaction.commander_compass;
    }
  });
}

function buildFactionRecord({ key, rawId, placement, profile, display, expressionMeta = null }) {
  const calibration = placement.calibration_tuning || {};
  const rawQuestions = placement.discriminator_questions || [];
  const collisionTargets = [
    ...(KNOWN_LATERAL_INHIBITION[key] || []),
    ...(placement.collision_guidance || []).map((entry) => normalizeTarget(entry.against)),
    ...rawQuestions.flatMap((question) => question.collision_targets || []).map(normalizeTarget),
  ];
  const goodFit = normalizeIndicatorList(
    placement.good_fit_indicators || placement.ideal_fit_indicators || []
  );
  const poorFit = normalizeIndicatorList(placement.poor_fit_indicators || []);
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
      summary: profile.core_identity?.summary || profile.profile?.overview || display?.lore_summary || "",
      philosophy: profile.core_identity?.philosophy || profile.profile?.philosophy || display?.philosophy || "",
      central_tension:
        profile.core_identity?.central_tension ||
        profile.profile?.core_tension ||
        display?.core_tension ||
        "",
      display_tagline: profile.site_surface?.tagline || display?.tagline || "",
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
      ...(placement.chatbot_guidance?.how_to_recognize_mismatch || []),
      ...poorFit,
    ]),
    discriminator_questions: rawQuestions.map((question, index) =>
      normalizeQuestion(question, key, index)
    ),
    lateral_inhibition_targets: unique(collisionTargets).filter((target) => target !== key),
    collision_guidance: (placement.collision_guidance || []).map((entry) => ({
      collision_id: entry.collision_id || "",
      against: normalizeTarget(entry.against),
      separator: entry.separator || "",
      ask: entry.ask || "",
    })),
    chatbot_guidance: placement.chatbot_guidance || {},
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
    factions[key] = buildFactionRecord({
      key,
      rawId,
      placement: raw.placement,
      profile: raw.profile,
      display: displayData.factions[key],
      expressionMeta: expressionMetaFor(identityLayers, key),
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

function buildFactionContext(model, displayData) {
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

async function main() {
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
    const displayBase = displayData.factions[key] || structuredClone(expressionMeta?.display || {});
    displayData.factions[key] = {
      ...displayBase,
      key,
      name: displayBase.name || faction.name,
      institution_type: displayBase.institution_type || faction.institution_type,
      world: displayBase.world || faction.world,
      colors: displayBase.colors || faction.colors,
      research_links: {
        ...(displayBase.research_links || {}),
        ...(expressionMeta?.routing?.edhrec_slug ? { edhrec_slug: expressionMeta.routing.edhrec_slug } : {}),
      },
      identity: faction.layered_identity,
      identity_blend: expressionMeta?.identity_blend || "",
    };
  });
  attachCommanderCompass(displayData, rawRecords);
  displayData._meta.factions = Object.keys(model.factions).length;
  const factionContext = buildFactionContext(model, displayData);

  await writeJson(displayPath, displayData);
  await writeJson(placementModelPath, model);
  await writeJson(placementSchemaPath, PLACEMENT_SCHEMA);

  const ts = `/**\n * Generated by tools/build-faction-artifacts.mjs.\n * Keep lore and placement updates in data/raw-factions and data/factions.json.\n */\nexport const FACTION_CONTEXT = ${JSON.stringify(factionContext, null, 2)} as const;\n\nexport const PLACEMENT_MODEL_META = ${JSON.stringify(model._meta, null, 2)} as const;\n`;
  await writeFile(factionContextPath, ts);

  console.log(`Built ${Object.keys(model.factions).length} faction placement records.`);
  console.log(`Wrote ${path.relative(repoRoot, placementModelPath)}`);
  console.log(`Wrote ${path.relative(repoRoot, placementSchemaPath)}`);
  console.log(`Wrote ${path.relative(repoRoot, factionContextPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
