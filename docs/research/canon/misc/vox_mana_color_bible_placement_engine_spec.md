# Vox Mana — Color Bible (Canonical)

## Core Model

Each color answers a different fundamental truth about life:

| Color | Core Truth |
|------|-----------|
| ⚪ White | People need protection |
| 🔵 Blue | People can improve |
| ⚫ Black | No one will save you |
| 🔴 Red | Life must be lived |
| 🟢 Green | You already belong |

---

## Core Drives (Non-Overlapping)

| Color | Drive |
|------|------|
| ⚪ White | Safety through structure |
| 🔵 Blue | Self-improvement through knowledge |
| ⚫ Black | Survival through agency |
| 🔴 Red | Fulfillment through action |
| 🟢 Green | Harmony through acceptance |

---

## Decision Lens

| Color | Primary Question |
|------|----------------|
| ⚪ White | Is this safe for everyone? |
| 🔵 Blue | Is this the best possible outcome? |
| ⚫ Black | Does this give me control? |
| 🔴 Red | Do I feel this is right? |
| 🟢 Green | Is this aligned with what I am? |

---

## Method vs Outcome

| Color | Method | Outcome |
|------|--------|--------|
| ⚪ White | Structure, law, enforcement | Safety → Peace |
| 🔵 Blue | Learning, analysis, iteration | Improvement → Control |
| ⚫ Black | Power, leverage, cost-payment | Control → Survival |
| 🔴 Red | Emotion, impulse, action | Experience → Fulfillment |
| 🟢 Green | Acceptance, growth, patience | Alignment → Harmony |

---

## Core Tensions

| Conflict | Meaning |
|---------|--------|
| ⚪ vs ⚫ | Group vs Self |
| 🔵 vs 🔴 | Thought vs Feeling |
| 🟢 vs 🔵 | Acceptance vs Change |
| ⚪ vs 🔴 | Structure vs Freedom |
| ⚫ vs 🟢 | Control vs Belonging |

---

## Misalignment Signals

| Color | When Distorted |
|------|--------------|
| ⚪ White | Over-control, suppression, rigidity |
| 🔵 Blue | Paralysis, detachment, over-optimization |
| ⚫ Black | Exploitation, isolation, obsession with control |
| 🔴 Red | Recklessness, instability, burnout |
| 🟢 Green | Stagnation, fatalism, anti-growth rigidity |

---

## User Interpretation Layer

| Color | What User Is Really Saying |
|------|--------------------------|
| ⚪ White | I want stability, safety, fairness |
| 🔵 Blue | I want to improve or understand |
| ⚫ Black | I want control or independence |
| 🔴 Red | I want to feel something or live fully |
| 🟢 Green | I want to feel grounded or like I belong |

---

## Growth Paths

| Color | Evolves Toward |
|------|---------------|
| ⚪ White → 🔵 Blue | Rules → Better systems |
| 🔵 Blue → ⚫ Black | Knowledge → Applied power |
| ⚫ Black → 🔴 Red | Control → Lived experience |
| 🔴 Red → 🟢 Green | Impulse → Grounded identity |
| 🟢 Green → ⚪ White | Belonging → Protecting others |

---

# Placement Engine Specification

## Core Concept

The placement engine translates user input into:

1. Intent
2. Decision patterns
3. Value signals
4. Color alignment

---

## Input Types

- Natural language queries
- Deck lists
- Scryfall queries
- Behavioral selections

---

## Processing Layers

### 1. Signal Extraction

Extract:
- Keywords
- Emotional tone
- Intent direction (build, control, explore, express, belong)

---

### 2. Pattern Mapping

Map signals to color traits:

| Signal Type | Example | Color |
|------------|--------|------|
| Protection | prevent, safe, stabilize | White |
| Optimization | best, efficient, improve | Blue |
| Control | dominate, win, power | Black |
| Expression | fun, fast, chaos | Red |
| Alignment | natural, growth, balance | Green |

---

### 3. Weighting System

Each detected signal contributes weight:

- Primary signals = +3
- Secondary signals = +2
- Weak signals = +1

Normalize across all colors.

---

### 4. Conflict Resolution

When multiple colors are present:

- Identify dominant axis (e.g., Blue vs Red)
- Evaluate consistency
- Detect hybrid identities (Izzet, Golgari, etc.)

---

### 5. Output

Return:

- Primary Color
- Secondary Influence(s)
- Confidence Score
- Explanation (human-readable)

---

## Example Output

```
Primary: Blue
Secondary: Black
Confidence: 82%

Reasoning:
- Strong optimization language
- Control-oriented goals
- Minimal emotional or expressive signals
```

---

## Advanced Features

### Evolution Tracking

Track changes over time:
- New inputs adjust weighting
- Detect shifts (e.g., Blue → Red exploration)

---

### Deck Translation Layer

Convert deck into philosophy:
- Card types → behavioral signals
- Mechanics → values
- Output = personality profile

---

### Guided Discovery Mode

Instead of outputting answers:
- Ask directional questions
- Narrow identity iteratively

---

## Final System Definition

Vox Mana is a system that:

- Interprets behavior as philosophy
- Maps philosophy to color identity
- Uses identity to guide discovery and growth

---

## One-Line Foundation

Vox Mana translates behavior into philosophy, and philosophy into self-understanding.

