import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { FACTION_CONTEXT, PLACEMENT_MODEL_META } from "./faction-context.ts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface StarterProfile {
  format_interest?: string;
  budget_band?: string;
  experience_level?: string;
}

interface MatchResult {
  rank?: number;
  faction: string;
  faction_name?: string;
  institution_type?: string;
  world?: string;
  score?: number;
  confidence?: number;
  reason?: string;
}

interface DecisionResult {
  version?: string;
  model_version?: string;
  source_mode?: string;
  faction: string;
  faction_name?: string;
  institution_type?: string;
  world?: string;
  decree: string;
  confidence?: number;
  confidence_gap?: number;
  mana_scores?: Record<string, number>;
  top_matches?: MatchResult[];
  adjacent_matches?: MatchResult[];
  starter_profile?: StarterProfile;
  evidence_trail?: Record<string, unknown>[];
  stage_history?: Record<string, unknown>[];
}

interface RequestBody {
  message: string;
  history?: Message[];
  session_id?: string;
  starter_profile?: StarterProfile;
  current_result?: Partial<DecisionResult> | null;
}

interface TurnResponse {
  response: string;
  turn: number;
  decided: boolean;
  result: DecisionResult | null;
}

const RESULT_VERSION = "2026-05-10";
const MAX_TURNS = 5;
const MAX_HISTORY_ITEMS = 8;
const MAX_MESSAGE_LENGTH = 700;
const MAX_CALLS_PER_MINUTE = 7;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MODEL_NAME = Deno.env.get("ANTHROPIC_MODEL") || "claude-haiku-4-5-20251001";
const RATE_LIMIT_BUCKETS = new Map<string, number[]>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/**
 * Returns a normalized starter profile so every saved reading has the same practical fields.
 */
function normalizeStarterProfile(profile?: StarterProfile | null): StarterProfile {
  return {
    format_interest: profile?.format_interest || "commander",
    budget_band: profile?.budget_band || "mid",
    experience_level: profile?.experience_level || "returning",
  };
}

/**
 * Creates a stable throttle bucket key from the request headers and session id.
 */
function getThrottleKey(req: Request, sessionId?: string): string {
  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const edgeIp = req.headers.get("cf-connecting-ip") || forwardedFor.split(",")[0] || "";
  return sessionId || edgeIp.trim() || "anonymous";
}

/**
 * Enforces a simple in-memory throttle so the interview endpoint cannot be hammered during beta.
 */
function enforceRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = RATE_LIMIT_BUCKETS.get(key) || [];
  const recent = existing.filter((stamp) => now - stamp < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  RATE_LIMIT_BUCKETS.set(key, recent);
  return recent.length <= MAX_CALLS_PER_MINUTE;
}

/**
 * Sanitizes chat history before it is forwarded to Anthropic.
 */
function sanitizeHistory(history: unknown): Message[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => {
      const entry = item as Record<string, unknown>;
      return {
        role: entry.role === "assistant" ? "assistant" : "user",
        content: String(entry.content || "").slice(0, MAX_MESSAGE_LENGTH),
      };
    })
    .filter((item) => item.content.trim().length > 0);
}

/**
 * Clamps and normalizes mana values into the 1-10 band used by the frontend bars.
 */
function normalizeManaScores(scores: Record<string, number> | undefined): Record<string, number> {
  const normalized: Record<string, number> = { W: 1, U: 1, B: 1, R: 1, G: 1 };
  for (const color of ["W", "U", "B", "R", "G"]) {
    const raw = typeof scores?.[color] === "number" ? scores[color] : 1;
    normalized[color] = Math.max(1, Math.min(10, Math.round(raw)));
  }
  return normalized;
}

/**
 * Normalizes a ranked match entry so the frontend can switch between primary and adjacent views.
 */
function normalizeMatch(match: MatchResult, index: number): MatchResult {
  return {
    rank: match.rank || index + 1,
    faction: match.faction,
    faction_name: match.faction_name,
    institution_type: match.institution_type,
    world: match.world,
    score: typeof match.score === "number" ? match.score : typeof match.confidence === "number" ? match.confidence : 0,
    confidence:
      typeof match.confidence === "number"
        ? match.confidence
        : typeof match.score === "number"
        ? match.score
        : 0,
    reason: match.reason || "",
  };
}

/**
 * Builds a fully normalized decision payload from the model output.
 */
function normalizeDecisionResult(result: DecisionResult, starterProfile: StarterProfile): DecisionResult {
  const factionContext = FACTION_CONTEXT[result.faction as keyof typeof FACTION_CONTEXT];
  const rawTopMatches = Array.isArray(result.top_matches) ? result.top_matches.slice(0, 3) : [];

  if (!rawTopMatches.length) {
    rawTopMatches.push({
      faction: result.faction,
      faction_name: result.faction_name,
      institution_type: result.institution_type,
      world: result.world,
      confidence: result.confidence || 0.7,
      reason: "Primary fit returned by the Scrying Terminal.",
    });
  }

  const topMatches = rawTopMatches.map((match, index) => normalizeMatch(match, index));
  const adjacentMatches =
    Array.isArray(result.adjacent_matches) && result.adjacent_matches.length
      ? result.adjacent_matches.slice(0, 2).map((match, index) => normalizeMatch(match, index + 1))
      : topMatches.slice(1, 3);

  return {
    version: RESULT_VERSION,
    model_version: result.model_version || PLACEMENT_MODEL_META.model_version,
    source_mode: "interview",
    faction: result.faction,
    faction_name: result.faction_name || factionContext?.name || result.faction,
    institution_type: result.institution_type || factionContext?.institution_type || "guild",
    world: result.world || factionContext?.world || "Ravnica",
    decree: result.decree,
    confidence: Math.max(0.35, Math.min(0.98, Number(result.confidence || 0.72))),
    confidence_gap:
      typeof result.confidence_gap === "number"
        ? Math.max(0, Math.min(1, Number(result.confidence_gap)))
        : undefined,
    mana_scores: normalizeManaScores(result.mana_scores),
    top_matches: topMatches,
    adjacent_matches: adjacentMatches,
    starter_profile: normalizeStarterProfile(result.starter_profile || starterProfile),
    evidence_trail: Array.isArray(result.evidence_trail) ? result.evidence_trail.slice(0, 8) : [],
    stage_history: Array.isArray(result.stage_history) ? result.stage_history.slice(0, 8) : [],
  };
}

/**
 * Builds the Anthropic system prompt using only canonical lore already checked into the repo.
 */
function buildSystemPrompt(starterProfile: StarterProfile, currentResult?: Partial<DecisionResult> | null): string {
  const refinementBlock = currentResult?.faction
    ? `The user already has a saved reading for ${currentResult.faction_name || currentResult.faction}. You may confirm it or overturn it, but only if the interview evidence supports that move.`
    : "This is a fresh reading with no prior placement.";

  return `You are the Vox Mana Scrying Terminal recruiter.

You must use only the faction lore, biological-expression placement guidance, and voice guidance supplied below. Do not invent new institutions, new world lore, or new faction history.

Your job is to conduct a short, pointed interview that places the user into one of the canon Vox Mana factions using the Vox Mana adaptive placement model (${PLACEMENT_MODEL_META.model_version}).

Placement model:
- Treat each faction as a behavioral phenotype, not a color-pair vibe.
- Use Bayesian evidence: broad answers create weak priors; specific tells create strong likelihood shifts.
- Use negative evidence and inhibitor traps. Do not keep rewarding a faction after the user states a clear mismatch.
- Use lateral inhibition for lookalike factions. When evidence distinguishes one candidate, suppress its collision targets.
- Use discriminator questions when candidates are close, especially the supplied discriminator_questions and lateral_inhibition_targets.
- Placement psychology is Vox Mana interpretation, not official Wizards canon and not an objective personality diagnosis.

Interview rules:
1. Ask one question at a time.
2. Listen to the specific answer and follow that thread.
3. Stay in character: measured, curious, slightly arcane.
4. Do not mention faction names during the interview.
5. Decide by turn 3, 4, or 5.
6. Keep the interview mobile-friendly. Do not write long paragraphs when you are still asking questions.
7. Prefer a Gate -> Hall -> Crucible rhythm: broad prior, adaptive evidence, then a pairwise discriminator if the top candidates are close.

Practical context:
- Requested starter format: ${starterProfile.format_interest}
- Requested budget band: ${starterProfile.budget_band}
- Requested experience level: ${starterProfile.experience_level}
- ${refinementBlock}

When you decide, return a full placement object with:
- faction
- faction_name
- institution_type
- world
- decree
- confidence
- mana_scores using W, U, B, R, G with integer values from 1 to 10
- top_matches with exactly 3 ranked entries
- adjacent_matches with exactly 2 entries pulled from ranks 2 and 3
- starter_profile copied from the practical context above
- model_version copied from the placement model metadata
- evidence_trail with short plain-English evidence signals from this interview
- confidence_gap when you can estimate the gap between rank 1 and rank 2

Factions:
${JSON.stringify(FACTION_CONTEXT, null, 2)}

Output JSON only.

If you are still interviewing, return:
{
  "response": "single recruiter reply ending in one clear question",
  "turn": 1,
  "decided": false,
  "result": null
}

If you are deciding, return:
{
  "response": "one or two in-character closing sentences before the decree lands",
  "turn": 4,
  "decided": true,
  "result": {
    "faction": "WU",
    "model_version": "${PLACEMENT_MODEL_META.model_version}",
    "faction_name": "Azorius Senate",
    "institution_type": "guild",
    "world": "Ravnica",
    "decree": "three to five sentences referencing what the user actually said",
    "confidence": 0.78,
    "mana_scores": { "W": 8, "U": 10, "B": 2, "R": 1, "G": 3 },
    "top_matches": [
      { "rank": 1, "faction": "WU", "faction_name": "Azorius Senate", "institution_type": "guild", "world": "Ravnica", "confidence": 0.78, "reason": "..." },
      { "rank": 2, "faction": "SILVERQUILL", "faction_name": "Silverquill College", "institution_type": "college", "world": "Strixhaven", "confidence": 0.69, "reason": "..." },
      { "rank": 3, "faction": "UB", "faction_name": "House Dimir", "institution_type": "guild", "world": "Ravnica", "confidence": 0.64, "reason": "..." }
    ],
    "adjacent_matches": [
      { "rank": 2, "faction": "SILVERQUILL", "faction_name": "Silverquill College", "institution_type": "college", "world": "Strixhaven", "confidence": 0.69, "reason": "..." },
      { "rank": 3, "faction": "UB", "faction_name": "House Dimir", "institution_type": "guild", "world": "Ravnica", "confidence": 0.64, "reason": "..." }
    ],
    "starter_profile": {
      "format_interest": "${starterProfile.format_interest}",
      "budget_band": "${starterProfile.budget_band}",
      "experience_level": "${starterProfile.experience_level}"
    },
    "confidence_gap": 0.09,
    "evidence_trail": [
      { "stage": "gate", "signal": "procedure before action", "supports": ["WU"], "suppresses": ["WR", "WG"] },
      { "stage": "crucible", "signal": "law before belonging", "supports": ["WU"], "suppresses": ["WG"] }
    ],
    "stage_history": [
      { "stage": "gate", "signal": "procedure before action" },
      { "stage": "crucible", "signal": "law before belonging" }
    ]
  }
}`;
}

/**
 * Calls Anthropic and returns the parsed text body.
 */
async function callAnthropic(systemPrompt: string, messages: Message[]): Promise<string> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      max_tokens: 1200,
      temperature: 0.6,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Anthropic API error:", response.status, errorText);
    throw new Error(`AI service error (${response.status})`);
  }

  const json = await response.json();
  const text = json.content?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from AI service");
  }
  return text;
}

/**
 * Parses model output into the turn response shape expected by the frontend.
 */
function parseTurnResponse(rawContent: string): TurnResponse {
  const cleaned = rawContent
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(cleaned) as TurnResponse;
}

/**
 * Builds a safe in-character response when the model output cannot be used.
 */
function buildRecoveryResponse(turn: number): TurnResponse {
  return {
    response:
      "The glass catches more static than signal. Answer plainly, with one choice you would make at a table or in a hard moment: what do you protect, pursue, or risk when the pressure rises?",
    turn,
    decided: false,
    result: null,
  };
}

/**
 * Checks the minimum fields needed before a decision can be normalized.
 */
function hasUsableDecision(result: DecisionResult | null | undefined): result is DecisionResult {
  return Boolean(
    result &&
      typeof result.faction === "string" &&
      result.faction.trim() &&
      typeof result.decree === "string" &&
      result.decree.trim()
  );
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: RequestBody = await req.json();
    const message = String(body.message || "").trim();
    const history = sanitizeHistory(body.history);
    const starterProfile = normalizeStarterProfile(body.starter_profile || null);

    if (!message) {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ error: "message is too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const turnCount = Math.floor(history.length / 2) + 1;
    if (turnCount > MAX_TURNS) {
      return new Response(JSON.stringify({ error: "Maximum interview length reached" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const throttleKey = getThrottleKey(req, body.session_id);
    if (!enforceRateLimit(throttleKey)) {
      return new Response(JSON.stringify({ error: "Too many interview calls. Please wait a minute and try again." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = buildSystemPrompt(starterProfile, body.current_result || null);
    const messages: Message[] = [...history, { role: "user", content: message }];
    const rawContent = await callAnthropic(systemPrompt, messages);
    let parsed: TurnResponse;
    try {
      parsed = parseTurnResponse(rawContent);
    } catch (parseError) {
      console.error("Failed to parse guild-recruiter model JSON:", parseError, rawContent);
      parsed = buildRecoveryResponse(turnCount);
    }

    parsed.turn = turnCount;

    if (parsed.decided) {
      if (hasUsableDecision(parsed.result)) {
        try {
          parsed.result = normalizeDecisionResult(parsed.result, starterProfile);
        } catch (normalizeError) {
          console.error("Failed to normalize guild-recruiter decision:", normalizeError, parsed.result);
          parsed = buildRecoveryResponse(turnCount);
        }
      } else {
        console.error("Model returned unusable guild-recruiter decision:", parsed);
        parsed = buildRecoveryResponse(turnCount);
      }
    } else {
      parsed.response =
        typeof parsed.response === "string" && parsed.response.trim()
          ? parsed.response.trim().slice(0, 900)
          : buildRecoveryResponse(turnCount).response;
      parsed.decided = false;
      parsed.result = null;
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("guild-recruiter failure:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
