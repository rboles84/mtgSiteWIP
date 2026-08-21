import {
  isResumableGateAQuestion,
} from "../archscry-presentation.js";

import {
  DEFAULT_STARTER_PROFILE,
  selectNextAdaptiveQuestion,
} from "../gate-b1-placement-engine.js";

export const SESSION = VM_SESSION;

export const APP_STATE = {
  factions: {},
  placementModel: null,
  quickIndex: 0,
  quickAnswers: [],
  quickSelections: [],
  adaptiveState: null,
  currentQuickQuestion: null,
  quickTransition: null,
  refinementMode: false,
  refinementOriginResult: null,
  activeResult: null,
  activeViewKey: null,
  resultSource: "quick",
  returnSection: null,
  interviewState: "idle",
  starterProfile: { ...DEFAULT_STARTER_PROFILE },
  deckTagCatalog: null,
  identityLayers: null,
  tagTaxonomy: null,
  tagTaxonomyByKey: new Map(),
  scryfallFlavorIndex: null,
  archscryFlavorSnippets: null,
  cardRationaleCatalog: null,
  cardVoiceCatalog: null,
  identityDossierCatalog: null,
  publicComparisonCatalog: null,
  discoveryEducationCatalog: null,
  preconCatalog: null,
  preconThemeTaxonomy: null,
  commanderProviderValidation: null,
  scryfallCommanderIndex: null,
  scryfallCommanderByName: new Map(),
  scryfallLocalCardByName: new Map(),
  scryfallColorThemeIndex: null,
  scryfallMechanicThemeIndex: null,
  archscryMediaIndex: null,
  archscryAuthoredCardByName: new Map(),
  resultCardArtContext: null,
  resultCardArtGeneration: 0,
  previousViewKey: null,
  mazeReturnUrl: "",
  mazeReturnAnchor: "",
  activeDossierPanel: "placement",
  dossierLayoutMode: "focus",
  forceDossierPanel: "",
  hiddenDossierPanelIds: new Set(),
  dossierSegments: {
    "starter-cards": "creatures",
    "mana-base": "basics",
  },
  dossierAvailableSegments: {},
  activeDossierRadarFaction: null,
};

export function getFaction(key) {
  const faction = APP_STATE.factions[key] || null;
  return String(faction?.key || key || "").toUpperCase() === "WUBRG"
    ? { ...faction, name: "WUBRG" }
    : faction;
}

/**
 * Returns the user-facing label for a faction's institution type.
 *
 * @param {object} faction Faction record.
 * @returns {string} "Guild", "College", or "Color".
 */

export function placementQuestionById(questionId) {
  if (!questionId || !APP_STATE.placementModel?.question_bank) return null;
  return Object.values(APP_STATE.placementModel.question_bank)
    .flatMap((questions) => Array.isArray(questions) ? questions : [])
    .find((question) => question.id === questionId) || null;
}

export function getStarterProfile() {
  return {
    format_interest: APP_STATE.starterProfile.format_interest,
    budget_band: APP_STATE.starterProfile.budget_band,
    experience_level: APP_STATE.starterProfile.experience_level,
  };
}

// Result finalization plus archived terminal flow.

/**
 * Finalizes the adaptive quick reading, stores the normalized result locally, and opens the dossier.
 */

export function getResumableQuickQuestion() {
  if (!APP_STATE.placementModel || !APP_STATE.adaptiveState) return null;
  const question = APP_STATE.currentQuickQuestion || selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  if (!isResumableGateAQuestion({
    placementModel: APP_STATE.placementModel,
    adaptiveState: APP_STATE.adaptiveState,
    question,
  })) return null;
  return question;
}
