4) Translation layer functions (Detain(), Override(), ConstraintField(), AccretionEngine())
These are presented as a “rules-as-operations” layer; you can wire them into your matrix as the functional verbs that match Dimir’s identity: constrain → overwrite → accumulate → vanish. (Dimir’s secrecy/manipulation identity is explicitly described in the House Dimir overview.) [mtg.fandom.com]
TypeScript reference implementation (pure functions + minimal state)
TypeScript// Core typesexport type EntityId = string;export type Tick = number;export interface WorldState {  tick: Tick;  tags: Record<EntityId, Set<string>>;  locks: Record<EntityId, { until: Tick; reason: string } | undefined>;  memory: Record<EntityId, Record<string, unknown>>; // "facts" about entities  constraints: Array<{    id: string;    scope: string;      // e.g., "zone:district-5" or "channel:archive"    predicate: (e: EntityId, w: WorldState) => boolean;    enforce: (e: EntityId, w: WorldState) => WorldState;    until?: Tick;  }>;  accretion: Record<string, { // per-engine buffers    samples: Array<{ tick: Tick; subject: EntityId; datum: unknown; weight: number }>;    policy: "decay" | "retain";    halfLife?: number; // for decay  }>;}// 1) Detain(): temporary lock / "cannot act" markerexport function Detain(w: WorldState, target: EntityId, duration: number, reason = "detained"): WorldState {  const until = w.tick + Math.max(0, duration);  return {    ...w,    locks: { ...w.locks, [target]: { until, reason } },    tags: { ...w.tags, [target]: new Set([...(w.tags[target] ?? []), "detained"]) }  };}// 2) Override(): authoritative rewrite with provenance trailexport function Override(  w: WorldState,  subject: EntityId,  patch: Record<string, unknown>,  provenance = "override"): WorldState {  const prior = w.memory[subject] ?? {};  const next = { ...prior, ...patch, _provenance: provenance, _tick: w.tick };  return { ...w, memory: { ...w.memory, [subject]: next } };}// 3) ConstraintField(): attach an enforcing constraint to a scopeexport function ConstraintField(  w: WorldState,  id: string,  scope: string,  predicate: (e: EntityId, w: WorldState) => boolean,  enforce: (e: EntityId, w: WorldState) => WorldState,  duration?: number): WorldState {  const until = duration == null ? undefined : (w.tick + Math.max(0, duration));  return {    ...w,    constraints: [...w.constraints, { id, scope, predicate, enforce, until }]  };}// Apply constraints at a tickexport function ApplyConstraints(w: WorldState, scope: string, entities: EntityId[]): WorldState {  let out = w;  for (const c of out.constraints) {    if (c.scope !== scope) continue;    if (c.until != null && out.tick > c.until) continue;    for (const e of entities) {      if (c.predicate(e, out)) out = c.enforce(e, out);    }  }  return out;}// 4) AccretionEngine(): collect weak signals into strong conclusionsexport function AccretionEngine_Sample(  w: WorldState,  engineId: string,  subject: EntityId,  datum: unknown,  weight = 1): WorldState {  const eng = w.accretion[engineId] ?? { samples: [], policy: "decay", halfLife: 12 };  const next = {    ...eng,    samples: [...eng.samples, { tick: w.tick, subject, datum, weight }]  };  return { ...w, accretion: { ...w.accretion, [engineId]: next } };}export function AccretionEngine_Resolve(  w: WorldState,  engineId: string,  reducer: (samples: Array<{ tick: Tick; subject: EntityId; datum: unknown; weight: number }>, w: WorldState) => unknown): { world: WorldState; result: unknown } {  const eng = w.accretion[engineId];  if (!eng) return { world: w, result: null };  const samples = eng.policy === "decay"    ? eng.samples.map(s => ({        ...s,        weight: s.weight * Math.pow(0.5, (w.tick - s.tick) / (eng.halfLife ?? 12))      }))    : eng.samples;  const result = reducer(samples, w);  return { world: w, result };}Show more lines
Suggested semantic mappings (Dimir-flavored)

Detain(): “soft removal” via paralysis, silence, lockout (cipher taplocks are a natural metaphor) [scryfall.com], [scryfall.com]
Override(): memory rewrite / identity theft (Lazav-style “become a copy” metaphor) [scryfall.com]
ConstraintField(): bureaucratic net + invisibility rules (“you can’t act unless…”) (Dimir as manipulation/underhanded constraint) [mtg.fandom.com]
AccretionEngine(): surveil loop → “collect signals” → “return to hand” recursion metaphor (Disinformation Campaign’s surveil trigger) [scryfall.com]

// Core types
export type EntityId = string;
export type Tick = number;

export interface WorldState {
  tick: Tick;
  tags: Record<EntityId, Set<string>>;
  locks: Record<EntityId, { until: Tick; reason: string } | undefined>;
  memory: Record<EntityId, Record<string, unknown>>; // "facts" about entities
  constraints: Array<{
    id: string;
    scope: string;      // e.g., "zone:district-5" or "channel:archive"
    predicate: (e: EntityId, w: WorldState) => boolean;
    enforce: (e: EntityId, w: WorldState) => WorldState;
    until?: Tick;
  }>;
  accretion: Record<string, { // per-engine buffers
    samples: Array<{ tick: Tick; subject: EntityId; datum: unknown; weight: number }>;
    policy: "decay" | "retain";
    halfLife?: number; // for decay
  }>;
}

// 1) Detain(): temporary lock / "cannot act" marker
export function Detain(w: WorldState, target: EntityId, duration: number, reason = "detained"): WorldState {
  const until = w.tick + Math.max(0, duration);
  return {
    ...w,
    locks: { ...w.locks, [target]: { until, reason } },
    tags: { ...w.tags, [target]: new Set([...(w.tags[target] ?? []), "detained"]) }
  };
}

// 2) Override(): authoritative rewrite with provenance trail
export function Override(
  w: WorldState,
  subject: EntityId,
  patch: Record<string, unknown>,
  provenance = "override"
): WorldState {
  const prior = w.memory[subject] ?? {};
  const next = { ...prior, ...patch, _provenance: provenance, _tick: w.tick };
  return { ...w, memory: { ...w.memory, [subject]: next } };
}

// 3) ConstraintField(): attach an enforcing constraint to a scope
export function ConstraintField(
  w: WorldState,
  id: string,
  scope: string,
  predicate: (e: EntityId, w: WorldState) => boolean,
  enforce: (e: EntityId, w: WorldState) => WorldState,
  duration?: number
): WorldState {
  const until = duration == null ? undefined : (w.tick + Math.max(0, duration));
  return {
    ...w,
    constraints: [...w.constraints, { id, scope, predicate, enforce, until }]
  };
}

// Apply constraints at a tick
export function ApplyConstraints(w: WorldState, scope: string, entities: EntityId[]): WorldState {
  let out = w;
  for (const c of out.constraints) {
    if (c.scope !== scope) continue;
    if (c.until != null && out.tick > c.until) continue;
    for (const e of entities) {
      if (c.predicate(e, out)) out = c.enforce(e, out);
    }
  }
  return out;
}

// 4) AccretionEngine(): collect weak signals into strong conclusions
export function AccretionEngine_Sample(
  w: WorldState,
  engineId: string,
  subject: EntityId,
  datum: unknown,
  weight = 1
): WorldState {
  const eng = w.accretion[engineId] ?? { samples: [], policy: "decay", halfLife: 12 };
  const next = {
    ...eng,
    samples: [...eng.samples, { tick: w.tick, subject, datum, weight }]
  };
  return { ...w, accretion: { ...w.accretion, [engineId]: next } };
}

export function AccretionEngine_Resolve(
  w: WorldState,
  engineId: string,
  reducer: (samples: Array<{ tick: Tick; subject: EntityId; datum: unknown; weight: number }>, w: WorldState) => unknown
): { world: WorldState; result: unknown } {
  const eng = w.accretion[engineId];
  if (!eng) return { world: w, result: null };

  const samples = eng.policy === "decay"
    ? eng.samples.map(s => ({
        ...s,
        weight: s.weight * Math.pow(0.5, (w.tick - s.tick) / (eng.halfLife ?? 12))
      }))
    : eng.samples;

  const result = reducer(samples, w);
  return { world: w, result };
}