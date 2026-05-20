# **Architectural Teardown and Production Blueprint for an Advanced, Scalable Magic: The Gathering Platform**

## **Frontend Architecture, Real-Time Synchronization, and UI Performance**

To build an interface capable of scaling to the data-heavy demands of modern Magic: The Gathering (MTG) deck building, collection management, and draft simulations, the frontend architecture must resolve several core issues. Highly visual platforms like Archidekt rely heavily on complex card categorization, drag-and-drop mechanics, and custom visual stacks. In contrast, text-dense platforms like Moxfield focus on rapid, filter-driven list views and spreadsheet-style bulk inventory tracking. To construct a unified, high-performance web platform, the client-side system must balance both visual layouts and high-throughput data grid performance without degrading rendering speeds.1

### **State Synchronization via Optimistic JSON Patches**

High-fidelity deck builders require real-time client-side updates that remain perfectly synchronized with a remote transactional database.1 To achieve zero-latency interactions without risking out-of-order state drift, the proposed architecture combines a centralized client-side state manager (built with Zustand) and an RFC 6902-compliant JSON Patch synchronization loop.4

When a user mutates a deck—such as moving a card from the mainboard to the sideboard or updating a card quantity—the client immediately computes the state delta, generates a forward patch, and computes a matching inverse rollback patch.4 The application state is updated locally in a single frame, and the forward JSON Patch is dispatched over an idempotent HTTP PATCH channel 4:

TypeScript

// Example of optimistic state mutation and patch generation in Zustand  
import { create } from 'zustand';  
import { applyPatch, compare } from 'fast-json-patch';

interface DeckState {  
  deck: {  
    id: string;  
    cards: Record\<string, { id: string; quantity: number; zone: 'main' | 'side' }\>;  
  };  
  mutateDeck: (cardId: string, action: 'add' | 'remove' | 'move', zone?: 'main' | 'side') \=\> Promise\<void\>;  
}

export const useDeckStore \= create\<DeckState\>((set, get) \=\> ({  
  deck: { id: 'deck-123', cards: {} },  
  mutateDeck: async (cardId, action, zone \= 'main') \=\> {  
    const previousState \= JSON.parse(JSON.stringify(get().deck));  
      
    // Perform optimistic local mutation  
    const updatedCards \= {...get().deck.cards };  
    if (action \=== 'add') {  
      updatedCards\[cardId\] \= { id: cardId, quantity: (updatedCards\[cardId\]?.quantity || 0) \+ 1, zone };  
    } else if (action \=== 'remove') {  
      delete updatedCards\[cardId\];  
    } else if (action \=== 'move') {  
      if (updatedCards\[cardId\]) updatedCards\[cardId\].zone \= zone;  
    }

    const nextState \= {...get().deck, cards: updatedCards };  
    const forwardPatch \= compare(previousState, nextState);  
    const inversePatch \= compare(nextState, previousState);

    // Apply next state locally for immediate rendering  
    set({ deck: nextState });

    try {  
      const response \= await fetch(\`/api/decks/${get().deck.id}/patch\`, {  
        method: 'PATCH',  
        headers: { 'Content-Type': 'application/json-patch+json' },  
        body: JSON.stringify(forwardPatch),  
      });

      if (\!response.ok) {  
        throw new Error('Server transaction failed');  
      }  
    } catch (error) {  
      // Revert locally using the pre-computed inverse patch  
      const revertedState \= applyPatch(get().deck, inversePatch).newDocument;  
      set({ deck: revertedState });  
      // Trigger a non-blocking toast notification notifying the user of connection failure  
    }  
  }  
}));

By pairing Zustand with fast-json-patch, the interface runs smoothly even during high-frequency user actions, such as rapid collection sorting or mass-importing list configurations. If a server-side validation error or network failure occurs, the frontend uses the inverse patch to roll back to the exact pre-mutation state.4 This guarantees that the UI remains consistent without forcing a full-page reload or re-fetching the entire dataset from the database.4

### **High-Frequency Grid Virtualization and Asset Pipelines**

Rendering thousands of high-resolution card images in a single view degrades DOM performance, causes memory leaks, and triggers layout thrashing. To mitigate this, the platform uses an absolute-positioned virtual grid built on react-virtuoso and configured for dynamic, multi-column layouts.1

This grid maintains an overscan boundary of exactly two rows. Card elements leverage CSS properties like will-change: transform to promote card rendering directly to the GPU, preventing unnecessary CPU-bound repaints during scroll events.4

To optimize asset delivery, the system implements a modern, three-tier caching hierarchy and uses WebP or AVIF images to minimize download sizes:

| Cache Tier | Storage Layer | Target Assets | Eviction Policy | Optimization |
| :---- | :---- | :---- | :---- | :---- |
| **L1 (Memory)** | In-Memory JS Map Cache | Card art thumbnails and symbol vectors | Least Recently Used (LRU) capped at 250 items | Zero-latency retrieval during immediate viewport scrolling. |
| **L2 (Disk)** | Service Worker Cache Storage API | Set symbols, card fronts, and basic card layouts | Time-To-Live (TTL) of 7 days; automated background update checks | Background prefetching of new card sets based on user visual focus. |
| **L3 (Edge)** | Global CDN (AWS CloudFront backed by S3) | Full-resolution card scans and promo illustrations 1 | Immutable cache control with long-term expiration hashes | Edge-based WebP compression and dynamic on-the-fly resizing. |

The Service Worker intercepts card image requests and dynamically downscales resources based on the user's current connection status. When a user scrolls rapidly, the Service Worker bypasses full image loading and serves lightweight vector placeholders, reserving network bandwidth for active viewport cards.

### **Client-Side Document Processing**

Generating high-fidelity deck sheets or printable proxy sheets has traditionally required headless server-side browser execution (such as Puppeteer or Chromium instances). This approach introduces significant scaling overhead, increases server bills, and presents security risks.4

The platform resolves this by moving all document layout computation and rendering directly to the client browser using @react-pdf/renderer.4

By loading this PDF generator inside a dedicated Web Worker, the browser compiles complex card layouts into print-ready, vectorized, standard US Letter or A4 proxy sheets in the background.4 This client-side approach prevents blocking the main UI thread, eliminates backend Chromium dependencies, and secures the user's private deck designs within their local browser sandboxes.4

### **Frontend Feature Matrix Comparison**

To illustrate the architectural differences between existing platforms and the proposed blueprint, the following table compares key technical capabilities:

| Architectural Component | Moxfield | Archidekt | Proposed Blueprint |
| :---- | :---- | :---- | :---- |
| **State Synchronization** | Pull-based REST APIs with periodic validation checks | WebSocket connections paired with full-state payloads | Push-based RFC 6902 JSON Patches with local rollback 4 |
| **Rendering Strategy** | Traditional paginated lists and simple lazy loading | Visual drag-and-drop stacks with absolute placement | Absolute-positioned virtual grids with GPU layer promotion 4 |
| **Asset Pipeline** | Edge-cached static resources | Dynamic on-demand resizing | Service Worker asset interception and fallback placeholders |
| **Proxy PDF Generation** | Server-side rendering pipeline | Server-side print queue | Client-side Web Worker execution via @react-pdf/renderer 4 |
| **Offline Performance** | Read-only mode for active sessions | Limited offline access | Full IndexedDB database replication with offline editing |

## ---

**High-Performance Database Design and the Minimal Set of Multisets**

An MTG platform must support two distinct data access patterns: high-frequency transactional operations (such as deck mutations and collection updates) and highly complex, low-frequency read operations (such as searching card reference data).1

The system implements a hybrid data model: PostgreSQL handles core relational, transactional user data 2, while DynamoDB stores highly ephemeral, concurrent session states like live draft pools.1

                 \+-----------------------+  
                 |         users         |  
                 \+-----------------------+  
                 | id: UUID          (PK)|  
                 | username: VARCHAR     |  
                 \+-----------------------+  
                             |  
                             | 1  
                             |  
                             | 0..\*  
                 \+-----------------------+  
                 |         decks         |  
                 \+-----------------------+  
                 | id: UUID          (PK)|  
                 | user\_id: UUID     (FK)|  
                 | commander\_id: UUID    |  
                 | name: VARCHAR         |  
                 \+-----------------------+  
                             |  
                             | 1  
                             |  
                             | 0..\*  
                 \+-----------------------+  
                 |      deck\_cards       |  
                 \+-----------------------+  
                 | deck\_id: UUID     (FK)|  
                 | card\_id: UUID     (FK)|  
                 | quantity: INT         |  
                 | zone: VARCHAR         |  
                 \+-----------------------+  
                             |  
                             | 0..\*  
                             |  
                             | 1  
\+--------------------+   \+-----------------------+   \+-----------------------+  
|    collections     |   |         cards         |   |        prints         |  
\+--------------------+   \+-----------------------+   \+-----------------------+  
| user\_id: UUID  (FK)|   | id: UUID          (PK)|   | id: UUID          (PK)|  
| card\_id: UUID  (FK)|\<--| oracle\_id: UUID  (UNI)|\<--| card\_id: UUID     (FK)|  
| quantity: INT      |   | name: VARCHAR         |   | set\_code: VARCHAR     |  
| is\_foil: BOOLEAN   |   | colors: VARCHAR     |   | collector\_num: VARCHAR|  
\+--------------------+   | color\_identity: VAR |   | price\_usd: NUMERIC    |  
                         | type\_line: VARCHAR    |   | price\_foil: NUMERIC   |  
                         | oracle\_text: TEXT     |   \+-----------------------+  
                         \+-----------------------+

### **PostgreSQL Transactional Database Schema**

The core relational schema is designed for transactional consistency, rapid lookup speeds, and flexible query patterns:

SQL

\-- Core Card Definition Table (Stable Oracle Data)  
CREATE TABLE cards (  
    id UUID PRIMARY KEY,  
    oracle\_id UUID UNIQUE NOT NULL,  
    name VARCHAR(255) NOT NULL,  
    mana\_cost VARCHAR(100),  
    cmc NUMERIC(4, 1) NOT NULL,  
    type\_line VARCHAR(255) NOT NULL,  
    oracle\_text TEXT,  
    colors VARCHAR(10) NOT NULL,  
    color\_identity VARCHAR(10) NOT NULL,  
    power VARCHAR(10),  
    toughness VARCHAR(10),  
    created\_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT\_TIMESTAMP  
);

\-- Card Printings Table (Contains volatile marketplace pricing)  
CREATE TABLE prints (  
    id UUID PRIMARY KEY,  
    card\_id UUID REFERENCES cards(id) ON DELETE CASCADE,  
    set\_code VARCHAR(10) NOT NULL,  
    set\_name VARCHAR(255) NOT NULL,  
    collector\_number VARCHAR(20) NOT NULL,  
    rarity VARCHAR(20) NOT NULL,  
    image\_uri\_normal VARCHAR(512),  
    price\_usd NUMERIC(10, 2),  
    price\_foil NUMERIC(10, 2),  
    updated\_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT\_TIMESTAMP  
);

\-- Users Table  
CREATE TABLE users (  
    id UUID PRIMARY KEY,  
    username VARCHAR(100) UNIQUE NOT NULL,  
    email VARCHAR(255) UNIQUE NOT NULL,  
    created\_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT\_TIMESTAMP  
);

\-- Decks Table  
CREATE TABLE decks (  
    id UUID PRIMARY KEY,  
    user\_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,  
    commander\_id UUID REFERENCES cards(id),  
    name VARCHAR(255) NOT NULL,  
    created\_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT\_TIMESTAMP,  
    updated\_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT\_TIMESTAMP  
);

\-- Junction Table linking Decks and Cards with explicit zones (mainboard vs sideboard)  
CREATE TABLE deck\_cards (  
    deck\_id UUID REFERENCES decks(id) ON DELETE CASCADE,  
    card\_id UUID REFERENCES cards(id) ON DELETE RESTRICT,  
    quantity INTEGER NOT NULL CHECK (quantity \> 0),  
    zone VARCHAR(20) NOT NULL CHECK (zone IN ('main', 'side', 'commander')),  
    PRIMARY KEY (deck\_id, card\_id, zone)  
);

\-- User Card Inventory / Collection Table  
CREATE TABLE collections (  
    user\_id UUID REFERENCES users(id) ON DELETE CASCADE,  
    card\_id UUID REFERENCES cards(id) ON DELETE RESTRICT,  
    quantity INTEGER NOT NULL CHECK (quantity \>= 0),  
    is\_foil BOOLEAN DEFAULT FALSE,  
    PRIMARY KEY (user\_id, card\_id, is\_foil)  
);

\-- Custom color identity verification constraint  
CREATE OR REPLACE FUNCTION verify\_commander\_identity()  
RETURNS TRIGGER AS $$  
DECLARE  
    commander\_ci VARCHAR(10);  
    card\_ci VARCHAR(10);  
BEGIN  
    \-- Skip check if the deck does not specify a commander  
    SELECT color\_identity INTO commander\_ci FROM cards   
    WHERE id \= (SELECT commander\_id FROM decks WHERE id \= NEW.deck\_id);  
      
    IF commander\_ci IS NULL THEN  
        RETURN NEW;  
    END IF;

    SELECT color\_identity INTO card\_ci FROM cards WHERE id \= NEW.card\_id;

    \-- Ensure card color identity is a subset of the commander's color identity  
    IF NOT (card\_ci \<@ commander\_ci) THEN  
        RAISE EXCEPTION 'Card color identity % violates Commander identity %', card\_ci, commander\_ci;  
    END IF;

    RETURN NEW;  
END;  
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg\_verify\_commander\_identity  
BEFORE INSERT OR UPDATE ON deck\_cards  
FOR EACH ROW EXECUTE FUNCTION verify\_commander\_identity();

\-- Performance Index Tuning  
CREATE INDEX idx\_cards\_name\_trgm ON cards USING gin (name gin\_trgm\_ops);  
CREATE INDEX idx\_cards\_colors ON cards USING gin (colors);  
CREATE INDEX idx\_cards\_color\_identity ON cards USING gin (color\_identity);  
CREATE INDEX idx\_prints\_card\_id ON prints(card\_id);  
CREATE INDEX idx\_prints\_prices ON prints(price\_usd) WHERE price\_usd IS NOT NULL;

### **Ingestion Pipeline and Price Ingestion Sync Strategy**

Updating the database requires balancing two different rates of data decay: core gameplay text changes infrequently, while marketplace values fluctuate on a daily basis.5 The synchronization engine runs these update tasks at staggered intervals to prevent resource contention:

\+---------------------------------------------------------------------------------+  
|                         Scryfall Daily Bulk Stream                              |  
\+---------------------------------------------------------------------------------+  
                                         |  
                                         v  
                         \+---------------+---------------+  
                         |                               |  
                         v (Default Cards JSON File)     v (Daily Price Matrix)  
\+-------------------------------------------------+ \+-------------------------------+  
|         Weekly Ingest (Gameplay Core)           | |         Daily Ingest (Pricing)|  
|  \- Inserts/Updates Core Card Definitions        | |  \- Targets Volatile Prices    |  
|  \- Triggers Elasticsearch Re-index              | |  \- Direct PostgreSQL Bulk Copy|  
\+-------------------------------------------------+ \+-------------------------------+

* **Weekly Ingest (Gameplay Core)**: The pipeline downloads the Scryfall Default Cards bulk JSON dataset once per week.5 This job inserts new card entries and updates existing ones using a PostgreSQL bulk operation: INSERT INTO cards (...) ON CONFLICT (oracle\_id) DO UPDATE. This updates errata, type lines, and rules text without disrupting user collections or deck tables.5 This transaction also triggers an asynchronous re-indexing of Elasticsearch or pg\_trgm databases.  
* **Daily Ingest (Pricing)**: The pricing engine runs every 12 hours, downloading Scryfall's latest price matrix.5 It skips full card attributes and writes prices directly to the prints table using a high-speed PostgreSQL bulk copy operation. This update runs within a single transaction to maintain consistent read access for users during the sync window.

### **The Minimal Set of Multisets Abstract Data Type**

To support inventory matching—such as finding which commander decks a player can build using their existing card collection—the platform implements the *Minimal Set of Multisets* abstract data type.2

Let ![][image1] represent the universe of all unique Magic: The Gathering cards. A player's card collection, a target deck list, and a card combo can each be modeled as a multiset (or bag) where every card is mapped to its corresponding integer quantity.

A player's collection is defined as a multiset ![][image2]. A target deck list ![][image3] is also modeled as a multiset ![][image4]. A deck ![][image3] is buildable from the inventory ![][image5] if and only if:

![][image6]  
When evaluating multiple decks or card combos simultaneously, checking each option sequentially introduces significant computational overhead. To optimize this, the system represents collections and decks as sparse vector profiles. The system computes the *minimal missing set of cards* (![][image7]) required to build a deck or complete a combo ![][image8] via the multiset difference 2:

![][image9]  
![][image10]  
To achieve the execution speeds required for real-time portfolio analysis, this difference operation is compiled in Cython, which bypasses Python's Global Interpreter Lock (GIL) and runs at native C performance 2:

Python

\# cython: language\_level=3  
\# cython: boundscheck=False  
\# cython: wraparound=False

import numpy as np  
cimport numpy as cnp

def compute\_multiset\_difference(cnp.int32\_t\[:\] inventory\_vector,   
                                cnp.int32\_t\[:\] combo\_vector,   
                                cnp.int32\_t\[:\] output\_vector):  
    """  
    Computes the multiset difference between a combo requirement vector and a  
    user collection inventory vector using optimized contiguous C memory arrays.  
    """  
    cdef int i  
    cdef int size \= inventory\_vector.shape  
      
    for i in range(size):  
        if combo\_vector\[i\] \> inventory\_vector\[i\]:  
            output\_vector\[i\] \= combo\_vector\[i\] \- inventory\_vector\[i\]  
        else:  
            output\_vector\[i\] \= 0

By storing active user collections and target combo matrices in memory as aligned NumPy vectors, this compiled Cython function evaluates thousands of potential combos and deck matches in under a millisecond, bypassing CPU bottlenecks during bulk inventory analysis.2

## ---

**Syntax Query Parsing, Error Tolerance, and Combo State Machines**

Searching a card library as vast as MTG's requires a parser that can handle complex, logic-driven queries containing parenthetical groups, negation operators, and dynamic attribute filters.1

### **Nearley-Based Query Compilation**

To parse nested search queries (e.g., t:creature (c:red OR c:blue) cmc\>4 oracle:"draw card"), the system uses a compiler-compiler pipeline based on the Nearley framework.1 This pipeline uses a context-free grammar evaluated with the Earley parsing algorithm, which is highly suited for processing recursive structures, logical groupings, and parenthetical filters.1

Code snippet

\# Nearley Grammar Definition for Magic Query Syntax (MQS)  
@preprocessor typescript

main \-\> expression {% id %}

expression   
    \-\> expression \_ ("OR" | "or") \_ term {% (\[left, , , , right\]) \=\> ({ type: 'OR', left, right }) %}  
     | term {% id %}

term   
    \-\> term \_ ("AND" | "and") \_ factor {% (\[left, , , , right\]) \=\> ({ type: 'AND', left, right }) %}  
     | term \_ factor {% (\[left, , right\]) \=\> ({ type: 'AND', left, right }) %}  
     | factor {% id %}

factor   
    \-\> "(" \_ expression \_ ")" {% (\[, , expr, ,\]) \=\> expr %}  
     | filter {% id %}

filter   
    \-\> key\_operator\_value {% id %}  
     | string\_literal {% (\[val\]) \=\> ({ type: 'text', value: val }) %}

key\_operator\_value   
    \-\> key operator value {% (\[key, op, val\]) \=\> ({ type: 'filter', key, operator: op, value: val }) %}

key \-\> \[a-zA-Z\]:+ {% (d) \=\> d.join("") %}  
operator \-\> (\[=\] | \[\>\] | \[\<\] | \[\!\] | \[:\]\[=\]):+ {% (d) \=\> d.join("") %}  
value \-\> \[a-zA-Z0-9\_"\]:+ {% (d) \=\> d.join("") %}

\_ \-\> \[\\s\]:\* {% () \=\> null %}

The Abstract Syntax Tree (AST) generated by this parser is compiled directly into a PostgreSQL SQL query or an Elasticsearch JSON search query:

TypeScript

// Compiler translating AST nodes into secure PostgreSQL SQL clauses  
interface ASTNode {  
  type: 'OR' | 'AND' | 'filter' | 'text';  
  left?: ASTNode;  
  right?: ASTNode;  
  key?: string;  
  operator?: string;  
  value?: string;  
}

export function compileASTToSQL(node: ASTNode): { query: string; values: any } {  
  const values: any \=;  
    
  function traverse(currentNode: ASTNode): string {  
    if (currentNode.type \=== 'OR') {  
      return \`(${traverse(currentNode.left\!)} OR ${traverse(currentNode.right\!)})\`;  
    }  
    if (currentNode.type \=== 'AND') {  
      return \`(${traverse(currentNode.left\!)} AND ${traverse(currentNode.right\!)})\`;  
    }  
    if (currentNode.type \=== 'filter') {  
      const paramIndex \= values.push(currentNode.value\!.replace(/"/g, ''));  
      const dbKey \= mapFilterKey(currentNode.key\!);  
      const sqlOp \= mapOperator(currentNode.operator\!);  
        
      if (currentNode.key \=== 'c' || currentNode.key \=== 'colors') {  
        return \`color\_identity ${currentNode.operator \=== '\!'? 'NOT' : ''} && $${paramIndex}::varchar\`;  
      }  
      return \`${dbKey} ${sqlOp} $${paramIndex}\`;  
    }  
    const textParam \= values.push(\`%${currentNode.value\!.replace(/"/g, '')}%\`);  
    return \`(name ILIKE $${textParam} OR oracle\_text ILIKE $${textParam})\`;  
  }

  const query \= traverse(node);  
  return { query, values };  
}

function mapFilterKey(key: string): string {  
  const mapping: Record\<string, string\> \= { t: 'type\_line', type: 'type\_line', cmc: 'cmc', power: 'power' };  
  return mapping\[key\] || 'name';  
}

function mapOperator(op: string): string {  
  const mapping: Record\<string, string\> \= { '=': '=', ':': '=', '\>': '\>', '\<': '\<' };  
  return mapping\[op\] || '=';  
}

### **Error-Tolerant Parse Strategy**

In practice, users frequently introduce spelling errors, incomplete statements, or unsupported attribute filters when typing search queries.7 Rather than failing the entire request and returning an empty page or a generic error, the platform splits queries into valid and invalid sub-expressions.7

Raw Input: "t:creature (c:red OR c:blue) invalid:attribute"  
                                |  
                    
                                |  
               \+----------------+----------------+  
               |                                 |  
               v                                 v  
        Valid Tokens                      Invalid Tokens  
"t:creature (c:red OR c:blue)"         "invalid:attribute"  
               |                                 |  
       (Compiled to AST)                (Mapped to Ignored Array)  
               |                                 |  
               v                                 v  
    Matches Executed in DB            Returned in JSON Payload

If the primary syntax parser encounters an unrecognized key or syntax error, a token-isolation loop steps backward to the nearest valid expression boundary.7 The valid elements are compiled and executed, while the invalid portions are returned in the response payload's metadata 7:

JSON

{  
  "results": }  
  \],  
  "query\_ignored":  
}

This structural metadata is handled by the React view layer, which displays a warning notice near the search input to inform the user of spelling errors or syntax issues without interrupting their search workflow.7

### **Commander Spellbook Combo Resolution Engine**

Evaluating combos (such as those featured on Commander Spellbook) requires more than static string matching; the system must parse and validate complex state loops.8 The platform represents these combinations as state machines where transitions are governed by card triggers, costs, and effects.9

Consider the infinite-loop combo involving *Tezzeret the Seeker*, *Lithoform Engine*, and *Gilded Lotus*.9 The engine models this loop as a sequence of game-state transitions:

Let ![][image11] represent the game state vector:

![][image12]  
where ![][image13] is the number of loyalty counters on Tezzeret, ![][image14] represent the tapped states of Gilded Lotus and Lithoform Engine (where ![][image15] is tapped and ![][image16] is untapped), and ![][image17] is the player's available mana pool.

The loop sequence transitions through these discrete steps:

* **Initial State (![][image18])**:  
  ![][image19]  
* **Step 1: Activate Tezzeret's \+1 loyalty ability (![][image20])**.9 Target Gilded Lotus and Lithoform Engine:  
  ![][image21]  
* **Step 2: Tap Gilded Lotus in response (![][image22])**.9 Add three blue mana to the pool:  
  ![][image23]  
* **Step 3: Tap Lithoform Engine and pay two mana to copy Tezzeret's ability (![][image24])** 9:  
  ![][image25]  
* **Step 4: Resolve the copied ability (![][image26])**.9 Untap Gilded Lotus and Lithoform Engine:  
  ![][image27]

Because state ![][image26] matches the target configurations of the starting state ![][image18] (with Gilded Lotus and Lithoform Engine both untapped) while retaining a net profit of ![][image28] blue mana and keeping the original untap ability on the stack, the transition graph contains a loop that generates infinite mana and infinite untap iterations.9

To scale this validation engine across thousands of card interactions, the platform's *Variant Generation* component uses Cython to run state checks in parallel.2

This optimization allows the backend to dynamically find alternative cards for a combo (for example, identifying that any 3-mana artifact producing blue mana can substitute *Gilded Lotus*) by scanning card attributes instead of requiring manual database entries for every potential variation.2

## ---

**Data Pipeline Recommendations and Recommender Systems (EDHREC Model)**

To deliver card recommendations similar to EDHREC, the platform uses a recommendation pipeline that analyzes historical card synergy patterns across millions of user-submitted deck configurations.1

\+---------------------------------------------------------------------------------+  
|                       Kafka Ingestion Stream Pipeline                           |  
|  \- Gathers live deck creations and collection updates                           |  
\+---------------------------------------------------------------------------------+  
                                         |  
                                         v  
\+---------------------------------------------------------------------------------+  
|                        Parquet Target Data Storage (S3)                         |  
|  \- Compresses deck records into structured format partitions                    |  
\+---------------------------------------------------------------------------------+  
                                         |  
                                         v  
\+---------------------------------------------------------------------------------+  
|                         Nvidia RAPIDS cuDF GPU Training                         |  
|  \- Computes card co-occurrence matrices on GPU clusters                         |  
\+---------------------------------------------------------------------------------+  
                                         |  
                                         v  
\+---------------------------------------------------------------------------------+  
|                         Redis Enterprise Cache Layer                            |  
|  \- Caches computed deck vectors and similarity scores for instant lookup        |  
\+---------------------------------------------------------------------------------+

### **Algorithmic Recommendation Framework**

Card recommendation models fall into two main categories: content-based filtering (which recommends cards based on matching metadata, like colors or card types) and collaborative filtering (which recommends cards based on observed usage patterns across similar decks).13

By analyzing user deck lists directly, collaborative filtering can discover hidden mechanical synergies that manual metadata tagging often misses.12

The system builds a sparse binary interaction matrix ![][image3] from the active deck library, where columns represent unique cards and rows represent user decks.12 The cell values indicate presence (![][image15]) or absence (![][image16]) 12:

![][image29]  
The raw card-to-card co-occurrence matrix ![][image1] is computed via matrix multiplication 13:

![][image30]  
The entry ![][image31] represents the exact count of how many times card ![][image32] and card ![][image33] appear together in the same deck.13 To prevent self-recommendation, the diagonal of the co-occurrence matrix is zeroed out 13:

![][image34]  
Using raw co-occurrence counts directly biases recommendations toward generic, high-frequency format staples (such as *Sol Ring* or *Arcane Signet*) rather than cards that are actually synergistic with the deck's specific theme.12 To adjust for this popularity bias, the platform normalizes these co-occurrence weights using Jaccard and Cosine Similarity metrics.14

The Cosine Similarity matrix ![][image11] calculates the geometric similarity of card usage profiles across all decks 14:

![][image35]  
Alternatively, Jaccard Similarity measures the ratio of shared deck appearances to total deck appearances:

![][image36]  
For a user's active deck ![][image37] (represented as a sparse binary vector of size ![][image38]), the recommendation score vector ![][image39] is generated by multiplying the deck vector with the similarity matrix, then applying an element-wise mask to exclude cards already present in the deck 13:

![][image40]  
where ![][image41] denotes the element-wise Hadamard product and ![][image42] is a vector of ones. The cards with the highest score values in ![][image39] are returned as the top recommendations.

### **GPU-Accelerated cuDF Pipeline Execution**

Calculating similarity weights across millions of decks is computationally expensive, with a scaling complexity of ![][image43].17 Standard, CPU-bound Pandas pipelines struggle to scale under these workloads and quickly become processing bottlenecks.17

The platform resolves this by using an Nvidia RAPIDS cuDF pipeline.17 This data pipeline runs on GPU instances, utilizing CUDA-accelerated group-by operations and parallel matrix multiplications directly in GPU memory 17:

Python

import cudf  
import cupy as cp

def compute\_gpu\_jaccard\_similarity(parquet\_path: str):  
    """  
    Computes normalized Jaccard card similarity matrices using GPU-bound  
    parallel matrix operations to bypass CPU bottlenecks.  
    """  
    \# Load deck transaction rows into GPU memory  
    df \= cudf.read\_parquet(parquet\_path)  
      
    \# Generate user-card interaction counts  
    card\_counts \= df\['card\_id'\].value\_counts()  
      
    \# Self-merge data frame to compute co-occurrences  
    merged \= df.merge(df, on="deck\_id", suffixes=('\_i', '\_j'))  
    merged \= merged\[merged\['card\_id\_i'\]\!= merged\['card\_id\_j'\]\]  
      
    co\_occur \= merged.groupby(\['card\_id\_i', 'card\_id\_j'\]).size().reset\_index()  
    co\_occur.columns \= \['card\_i', 'card\_j', 'intersection'\]  
      
    \# Calculate Jaccard similarity  
    total\_i \= co\_occur\['card\_i'\].map(card\_counts)  
    total\_j \= co\_occur\['card\_j'\].map(card\_counts)  
    union\_val \= total\_i \+ total\_j \- co\_occur\['intersection'\]  
      
    co\_occur\['jaccard\_score'\] \= co\_occur\['intersection'\] / union\_val  
      
    return co\_occur

This GPU-accelerated pipeline processes millions of active deck vectors in seconds, updating card recommendations across the platform in real time.17

### **Distributed Pipeline Tasks**

To keep search and recommendation features responsive, the system divides data ingestion and training tasks across dedicated pipeline stages:

* **Ingestion (Kafka Streams)**: Real-time user updates—such as adding a card, saving a deck, or completing a transaction—are captured as event streams and sent to an Apache Kafka ingestion cluster.  
* **Storage (S3 Data Lake)**: Raw stream events are compressed into partitioned Apache Parquet files on AWS S3, creating a history of card interaction patterns.1  
* **Compute (Airflow \+ RAPIDS)**: An Apache Airflow DAG runs a training job every night. This process runs on GPU instances to re-calculate similarity matrices, keeping recommendations aligned with the latest deck trends.17  
* **Serving (Redis Vector Store)**: The computed similarity scores are cached in a Redis vector database, enabling the client API to fetch real-time card recommendations with sub-10ms response times.12

### **Data Pipeline Engine Performance**

The table below contrasts the performance metrics of traditional CPU-bound pipelines against the proposed GPU-accelerated blueprint:

| Performance Metric | Traditional CPU Pipeline (Pandas) | Proposed GPU Pipeline (RAPIDS cuDF) |
| :---- | :---- | :---- |
| **Ingestion Matrix Ingestion Capacity** | Up to 100,000 active deck profiles | Over 25,000,000 active deck profiles |
| **Co-occurrence Computation Speed** | \~4 hours on standard 32-core nodes | \<15 seconds on a single GPU cluster 17 |
| **Algorithmic Complexity Limit** | Restricted to basic, unnormalized co-occurrence | Scales to multi-layered Jaccard and Cosine calculations 14 |
| **API Lookup Query Latency** | \~250ms (requiring on-the-fly SQL evaluation) | \<8ms (using pre-computed Redis caches) 12 |
| **Scale Recovery Cost** | High CPU overhead with limited scaling potential | Highly scalable with predictable GPU execution costs |

## ---

**Systems Infrastructure and Global Deployment Architecture**

To support a global user base, the system runs on a highly available, multi-region cloud topology.

                               
                                         |  
                                         v  
                         \+-------------------------------+  
                         |      Cloudflare CDN Edge      |  
                         |  \- Layer 7 Web Application-FW |  
                         |  \- L1/L2 Static Image Caches  |  
                         \+-------------------------------+  
                                         |  
                                         v  
                         \+-------------------------------+  
                         |     AWS Route 53 Geo-DNS      |  
                         \+-------------------------------+  
                                         |  
                                         v  
                         \+-------------------------------+  
                         |   Application Load Balancer   |  
                         \+-------------------------------+  
                                         |  
                     \+-------------------+-------------------+  
                     |                                       |  
                     v                                       v  
      \+-----------------------------+         \+-----------------------------+  
      |    EKS Frontend Pods        |         |    EKS Backend Pods         |  
      |    \- React SSR Engine       |         |    \- Django Web APIs        |  
      |    \- Web Worker Handlers    |         |    \- Cython Parse Services  |  
      \+-----------------------------+         \+-----------------------------+  
                     |                                       |  
                     |                        \+--------------+--------------+  
                     |                        |                             |  
                     v                        v                             v  
      \+-----------------------------+  \+--------------+              \+--------------+  
      |    ElastiCache Redis        |  | RDS Postgres |              | AWS DynamoDB |  
      |    \- Client Sessions        |  | (Multi-AZ)   |              | \- Ephemeral  |  
      |    \- Similarity Vectors     |  | \- Core DB    |              |   Draft State|  
      \+-----------------------------+  \+--------------+              \+--------------+

* **DNS & Security (Cloudflare \+ Route 53\)**: User requests resolve through AWS Route 53 to the nearest low-latency deployment zone. Cloudflare manages edge caching, Web Application Firewall (WAF) filtering, and static image delivery, reducing traffic load on backend applications.1  
* **Container Orchestration (AWS EKS)**: The application tier is deployed in Kubernetes (EKS) clusters across multiple Availability Zones. Frontend React pods handle initial page rendering, while backend Django pods process search queries, run database transactions, and evaluate card state transitions.1  
* **Data Persistence (RDS \+ DynamoDB \+ Redis)**:  
  * **PostgreSQL RDS**: Runs in a Multi-AZ configuration to store core user profiles, deck structures, and inventory lists.2  
  * **AWS DynamoDB**: Handles highly concurrent, short-lived session states, such as active multiplayer drafts, using single-table design principles to scale write speeds.1  
  * **Redis Enterprise Cluster**: Caches frequently accessed database queries, manages active user sessions, and stores calculated similarity vectors to serve instant, in-app recommendations.12

This multi-tiered database setup prevents system bottlenecks by separation of concerns: heavy relational queries run on PostgreSQL, fast in-memory lookups are served by Redis, and highly concurrent draft interactions are isolated within DynamoDB.1 This design ensures the platform remains highly responsive even during peak traffic periods, such as set releases or major tournaments.

#### **Works cited**

1. dekkerglen/CubeCobra: An open source web application for building, managing, and playtesting Magic the Gathering cubes. \- GitHub, accessed May 17, 2026, [https://github.com/dekkerglen/CubeCobra](https://github.com/dekkerglen/CubeCobra)  
2. Commander Spellbook Backend \- GitHub Pages, accessed May 17, 2026, [https://spacecowmedia.github.io/commander-spellbook-backend/](https://spacecowmedia.github.io/commander-spellbook-backend/)  
3. SpaceCowMedia/commander-spellbook-backend \- GitHub, accessed May 17, 2026, [https://github.com/SpaceCowMedia/commander-spellbook-backend](https://github.com/SpaceCowMedia/commander-spellbook-backend)  
4. Changelog \- Reactive Resume, accessed May 17, 2026, [https://docs.rxresu.me/changelog](https://docs.rxresu.me/changelog)  
5. Bulk Data Files · API Documentation \- Scryfall, accessed May 17, 2026, [https://scryfall.com/docs/api/bulk-data](https://scryfall.com/docs/api/bulk-data)  
6. Building a MTG Card Recommender : r/MLQuestions \- Reddit, accessed May 17, 2026, [https://www.reddit.com/r/MLQuestions/comments/7a07c3/building\_a\_mtg\_card\_recommender/](https://www.reddit.com/r/MLQuestions/comments/7a07c3/building_a_mtg_card_recommender/)  
7. Ignore Unrecognized Query Parts (Scryfall-style) and Report What Was Ignored · Issue \#12 · jbylund/arcane\_tutor \- GitHub, accessed May 17, 2026, [https://github.com/jbylund/arcane\_tutor/issues/418/linked\_closing\_reference?reference\_location=REPO\_ISSUES\_INDEX](https://github.com/jbylund/arcane_tutor/issues/418/linked_closing_reference?reference_location=REPO_ISSUES_INDEX)  
8. Commander Spellbook \- Built with Django, accessed May 17, 2026, [https://builtwithdjango.com/projects/commander-spellbook](https://builtwithdjango.com/projects/commander-spellbook)  
9. Lithoform Engine | Tezzeret the Seeker | Gilded Lotus \- Commander Spellbook, accessed May 17, 2026, [https://commanderspellbook.com/combo/2495-3094-5116/](https://commanderspellbook.com/combo/2495-3094-5116/)  
10. Idris, Soul of the TARDIS | Lithoform Engine | Basalt Monolith (and two other cards), accessed May 17, 2026, [https://commanderspellbook.com/combo/437-486-509-3094-4131/](https://commanderspellbook.com/combo/437-486-509-3094-4131/)  
11. Kozilek, Butcher of Truth | Mind Over Matter | Lithoform Engine \- Commander Spellbook, accessed May 17, 2026, [https://commanderspellbook.com/combo/1209-3094-4067/](https://commanderspellbook.com/combo/1209-3094-4067/)  
12. Collaborative filtering: How to build a recommender system \- Redis, accessed May 17, 2026, [https://redis.io/blog/collaborative-filtering-how-to-build-a-recommender-system/](https://redis.io/blog/collaborative-filtering-how-to-build-a-recommender-system/)  
13. Collaborative Filtering Recommendation with Co-Occurrence Algorithm | by Xia Song, accessed May 17, 2026, [https://songxia-sophia.medium.com/collaborative-filtering-recommendation-with-co-occurrence-algorithm-dea583e12e2a](https://songxia-sophia.medium.com/collaborative-filtering-recommendation-with-co-occurrence-algorithm-dea583e12e2a)  
14. Build a Recommendation Engine With Collaborative Filtering \- Real Python, accessed May 17, 2026, [https://realpython.com/build-recommendation-engine-collaborative-filtering/](https://realpython.com/build-recommendation-engine-collaborative-filtering/)  
15. Recommender: An Analysis of Collaborative Filtering Techniques \- CS229: Machine Learning, accessed May 17, 2026, [https://cs229.stanford.edu/proj2014/Christopher%20Aberger,%20Recommender.pdf](https://cs229.stanford.edu/proj2014/Christopher%20Aberger,%20Recommender.pdf)  
16. How Does Collaborative Filtering Work in Recommender Systems? \- Turing, accessed May 17, 2026, [https://www.turing.com/kb/collaborative-filtering-in-recommender-system](https://www.turing.com/kb/collaborative-filtering-in-recommender-system)  
17. Build Efficient Recommender Systems with Co-Visitation Matrices and RAPIDS cuDF, accessed May 17, 2026, [https://developer.nvidia.com/blog/build-efficient-recommender-systems-with-co-visitation-matrices-and-rapids-cudf/](https://developer.nvidia.com/blog/build-efficient-recommender-systems-with-co-visitation-matrices-and-rapids-cudf/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAABEElEQVR4Xu3TvUoDQRSG4RMkEDEQQkAUIlliGvUOhIBICktBe9u0sdIgksbSwspGRO1yASKkCgpaeAdaBULsRSwUou9xZ9dxsu6WAfGDB4ZzdhjmZ0X+ZLJYwSYWMGHqUyia8UgWcYcXtLGNC3SwhCvUwq9N0tjDG3Yw+bMtVTyjL87KOvEY79iwG1YyuDR0HKaOD+wiZTecnKNpFyoY4BFzdiMiJ+LstyX+qgd28ZfkxN/iV/Q6uhhKxAkmZRY9PKHs9BITTFY6jose6rJdyONekicXcIppt3Eo/p7X3IaJXp2+ssj7L+EB15hxevrK9tGQmPv3cItXnGELR7jBqsRMDKIfeFg35uX7T/rPWPMJCSkp/c7RsHEAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAYCAYAAACY5PEcAAADZklEQVR4Xu2YW6gNURjHP6Eod3KJckhJlAch8nCSy4MoUpI84IE8ueTS4cWDEEooErmUF0SeKSdKShGJIoWkEF5QyOX/a806Z2ad2XvPnj3HqdP86teePWvae9a3vvXNWmNWUlJS0q3pLSfL5bJZ9onO95ATZM/oe7dkpfws/8b8KjfELyqQAfKo/Clb5R65Vz6Qi+R2ecRf3AUMkpflR3lOXpAXZd/YNU3yrPwuP8hd1p40mSG7+JE/cl7QViRzzXXmuhwTtA2Vd80N+rKg7X9DPNaYSwCOuZ9N0XGclqgtF4PlfflKjk42FQY3R3afMlda0lgvP8lJYUMXsNhcFs8wF2yCHgZ4h7nrcjFNfpNXZK+grQio3WT4bTkwaItDB+7I/mFDA9C3+eHJDHAv++UJOdbcfftjT0NBX2VuWm8JG6rQz7LVMbL6krnSFWZKCB2g3hfJFHnYOpaGWnAvBJUgE2yCHj+G3EH39fyXnBO0VWKifC+fWcfaHDJL/jBXvihj1WAQGcwiYeYSdDK+HnzQgZlywFyslsjd0XHuoPt6/lKOCNoqQaAJ+BM5PGgL4caYRUVncD2QoaflyLChCvGgx2t6/Dh30PPWc67Ncv15c0GnhBUB5YrkGFWnLEfvmVtBZSk18aAD/0u282Dl+KS8Gl3nYW+xVO6T6yy5zEyQp57Xgw96rYyYKreGJ1OYbW4FVK9n5Dv50LKVmjDowKzm+cRMZ/Y8t2S/uP+d5gZ1hTwYHSfIU8/rhY1PraBzH9TJPKuMLJCZbLjWWvadblrQgUwn4/lNSozvF2X6hrUPKLOLfcf46HsbjazPmeJsaGrRLH/L45Yy6hEz5SGrvH5vFGbzNqv8/2lUCjr4zRIPVR909hYvLBn0p5aSzHnruV+9vJXjgrYQAsn0/mIdd7sEYaG5bXa19XsjkBzM5np/n4FqCU9G+JnJKwIfdGL5JvoEgv461m6rzdU3pr2X3RfFPwvUtEfypmXrDA8U6hsZ3yo3mttisxEiAys+cAqAgd4cnqwC74aOmXuvggxYU/yCCPpN/zMHvavgRheYe7NIbcyyuWoU/qOz/mdIJJCIjy0ZdL5Pj76XdALMVpaQvoZT42/JYW1XlHQKzN5r5pa/PMdqvfYoKQhKGaWl6NcZJSUlJWn8Aw77oPkSVYPXAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAA+ElEQVR4Xu3SP0tCYRTH8SMUJCUugkFNDULgIpIuOgjO0bvo/ThKi1tDi2Dg0BD1GsJVRRAEdTJIKfs+99xreri3254/+MDl/u4fnvM8IvvEpYYx1ltmmPjXS3SQC174LXdYoWLun6ONOUqm20kKr3hDxnQuWfTQRdJ0m1xiigccmC5IS/QZ92xorkXXf2uLrbiPvOPKFkEaEj6PIMd4wgJF03k5wbNEz8PlDH3RXbzYrTR/mUcdX3jEkem8xC2lILq9TRyazkvc1p7iRXQeadNtkhf9i12K++ON6BzuJeIDVQzk55h/YoSh6HH/ED3qZST8d/b5X/kGTpo1fO7baeEAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAYCAYAAAAMAljuAAAD3ElEQVR4Xu2YWahNURjH/0LInHmImyRTIVOKB0IekFCEeFCUUqIo5AXFgzJGIiRTpmQeyolHDzcPUvJwSSnCC+qS4f/vO6u7zzpnD+fufe+V9q/+nd3+9j57rfWt9X3fWkBOTk5OTob0oGZTC6gaqlXgfq/i9X/LdOo99Segz9SH4vUP6hY1zL3QRGjQZ1AvYd8+SW2irlLnqDHUE2qEe6EF0ARR2wrUceoxNSv4AFlN1VK/Yc+NLbFWwQnqJzXVuz+QukF9oSZ5tqzoSJ2ivlLLqNalZqygflFPqc6erbnpTV2kBlNdqaPF6yAas/NI0Va9qM6+oHp6NtEHNnPvUR08W1rUqbuIdrjapLYd9A0tQCfYypAj2sKcoWv1w9GPOgN7tlEoDHyirlBtPJtDH9AzWYYMhan9sOW9xLMFUccK1ELvfhraU2tQ/aDpeY3FemoDrA9ql7sWqR0yH5Yv1vqGAPrAd2qib/BQR5M2ZBpVDxvsqHdku4zsJ8NuarxviME5ZADMCXKG/stdi9QOUSiolD8civGPqG+I7oCqoOew8DPOs/loJV6ATYTlns1HHe6O8tySFvVlH8KjQiWcQzToCt/KvaOK909TQ4u2RjvEhYOw/CE0G+pg1diQUlMJ+q8H1EdYI6Nw/5l1GKwGN7NXFq+TEHSICOYQdz28+EyjHJIkf8yExfnbsJAUhWaxkl0cmp1acc9gsz8LusEGqhoNglV4h6guiMd3iFAxshfWb4XhS7DVH3SIKq/t1E5qZOB+GXH5QzPnMMwhWSZV55AComeSvr8DFgqiUFjdBtsfVCtVj2qLBqsdoqnkEKHx2whr72ZYJeb6JWfchG1ytZKUD0MjSFz+UC5QTlDDk8z8pCj0KQQWEO0QOeIYsi+3HRNgA6RBS0KYQzQ2WiVaLdpG7EFDv5Qj9Y5jC6ygKCNu/9EXtjtWQg/W2VHouf6Ij8kKfddhzh7t2RzqpJJu2P4kLSpCzqJ8YxdFmEOE2yiqP7vQ4BBNet8hFVOEXtSA+EYNhI4J6mC70qTOcFVWPTXFs1VCA63va1AUcoIonmtVZhkmfdZRS/2bMSjfXUP4itKK1kRTTnIOkTN8hxQQiAxKPG/QcHalY4l31FvYWY0GVOdXkxE/04PoA3eoV0g+67SveQ377gFqFax8fIiY5JcSrdAjsGovKTq3qoXlU/3q3KoSi6j7qMIh/xqqzFTtLabmIVnIS4v+XyG7Kb6j/6wp/oqtKHeIDkyb4ts5CZgDK4NdWlBOCatqc5oB5WTlFDlhLmx1JM3LOU2EwpOKHh3fZ30ElJOTk9Nc/AWwYLrBwXylBgAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAdElEQVR4XmNgGHogEojfAfF/JPwFiDOQFcEAIxDPB+J/QOyCJocCBIH4NBA/AGJpVClUYAzEX4F4DRCzoMmhgGgGiNuK0CWQAcx9v4HYBk0OBcDcdxeIxdHkUMAAu+8BA6XhFwvEzxhQ4/cVECcjKxoFeAEAuV0fXI8doW8AAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAAEXElEQVR4Xu3dT6hUZRjH8UdUyExTDDNKRGljBi5EKzC5RkktFAkhoixQ0k0pgmb/kFwIFSHRokJKSWgRia3aRV1ULBDcuTFaFILQUjLEyHx+nPc0zzx3Zu4RZyYcvx948JznXPWcexf+eN73jGYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANzS7vK6IzeLXtcGaarX3NwsdG1KbgIAgNGjf/Q7mZ4bAzLmtcla9/FA69LQHfG6OzeLRV7HcnMIDng9m5uFwtqu8isAABhh07wezk33SW70kcLgO15vhN7jXpdsMIHte6+L4fwhr/NWhbDaR+G4GwWjvbk5CQXRn72eyxeSFV7fWfsUb5nX4nDeiX52P+UmAAAYPZosRQomChBNzbYq8HzhdciqiZmCYDf/er2Zm+7L3OiTa1ZNqqJxr3PhXGGpiTO50cVOry1eM/KFDvT91s9gdejdb1WobOIF675sCgAARsTbVgWtuo5ae9DQ1GfMa17oRT94PZGbXTzo9YvXwnzBfZ4bfaLA9mTqjXtdKMd6vrdal/6j/nprf27dY68lSIVXTQ835gs9KGwpCN4berrfX8N5TX+3/uwYqJd7rQznAABgBCmc1UtvOq6Dk5YuP7XW0qEmY9nTudGDNu6P28TwNEiaVOWlRrlsrWmZwk+cbsXnftfan1sB7r5wXtNSroLonflCA5qQ5e+tpo15z9wfXq9b9bNS2Lyn9PV9vdGlWgAAcAtSaJDHvD4ox9rs/k85lj3huKalPwWYXJ2o/5vXknxhgBQO83KoKCB9XI4V2OLEKj73I9b+3Aps3e5fQe+sVd+TG6Hl0L9TT4EtLhErlGkvnF6KUKjena51ekYAADBiFNIU1uKbkgpX2rDfyyu50UO99Ncp0B32mp+bfaDpWg5YG6yaVNVLmzmw9XrubhO2TEvEB63Z12ral6dpObBpgvZMOI+YsAEAcJtQSPvK2t8Y1dLot+H8eDiuKfTss+YfA6JlxhNeC8q5pkX6/XFf2FarJmC9XlxoSvvXajOtCpjvh55oaXF7OI/PrfuMz629bnl5dTLfeD2fm4WeW9O1uCQrup/4UoQC5dpyrN/zkrX2GWo5dpjLzAAA4H/0qrWHJAWBU1a9iKDQoo/D6GSH14/WPMic9vrL62WvkzbxhQVNsa5Ys+lUN5ut2vOl4Pd7qT9t4huxogBUL49KfG4Ft/jceRJ2M/Qyg+5J93jVWnvSRAFNe+JqukftW9PUTYH3tXBNYU979QAAAIZqsfVnwtaUAloTX+dGoUClAJb38tXVNMxGL9rkHwuiv1Nv6QIAAAyVPmz2w9wcMO1raxKOVuVmMcfrPWv/eJRYa1pf2pj2pj2Vm4lC3We5CQAAMKr05uWjuVms89qWm0Ow1Gt/bhazbDD/MwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYHiuA+HGjNP61YJKAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAYCAYAAACFms+HAAACyUlEQVR4Xu2WW6iMURTHl1DkfilEOikPKJekXMsDQlFSKI9yf0K5lRpJUSgePJAkyQNC7pckJMULpTxQHlxKSQkP5PL/zfr2+fb+ZgwPc86cOP/6NTN7rflmfWv/9/rGrF3t+r80WbwVPzOeiv5JRqqZ4rt5Lq83Rb8ko5W1R7wWr8SQQiyIAk+Kj+K06JSGW1/dxXGxX3wW49NwWR3EKrFF/BDr03BjNEwcFovMLTAvDZc1zrzwzeKbmJqGG6P55p2cIL5YZTe7ipIYLC6JF2JAnNAolcQMMUK8FzuTqNli8ziFv7Q25m8OJF2kmyfMPY2axCbzQim+nv7mN/qIjsWAeV1diouxgr9JIvl2Bu8plqKbPLX8vpa/2ZE74o35ddFoscTyRgRhv0Pm43RvIbZcnBEPrMaoDf5GXJxuBw/TYWyCuLG/8TffOWt5t1aLFXm4Wdz8BfNmzIrW2YHr5t9hEHSOYolK5j8WhL/x+XSx27wzCCsx4//k761WeUaqCbsdKC5KY8Rdq/0QLNuBB0rYVsQFmSwUyAgMquXvkeKo+XPgvpgjuont5jbsladab7FLPBOPxA7RM4stE1fEO3HE3GZVNUVcFD2iNWY4sxz7xL6ki9X8vdDcjzSB2HPzRiwQY80LmdSc7SL3slVeC2Gd3+7YNPHB8v8nX83vFvHUxGPhUOwTn7K8kHtV9M1yHorZWS67QqF0e7iYKG6Y+zYWtuPgxTuNwhlbWlivu7jJJ5b/tyn6u5RRFJ2+ZulOI27wlvmDsEVF4efMt55DzPYzpdaIoeKeedfXZvEgOnos+hzEDnBGBhUD9RYFM4vXmf+7PC8Oms9tbMSM5vBhzVhMk5WFNVQcpS0utpynHx7F30HM4PgzBQ0036X4wPJdbLLBqluroaJouknR7FJsHQbDY3FKjIrW24zmio3mXY+Ft7dZ5dj8N/QL8raDL20L9KEAAAAASUVORK5CYII=>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAABFklEQVR4Xu3TvUoDQRSG4RM0oKQQm1jYpIiCYGdrY0jhJUSMVxCwFbEJWNgLdvY2NoLeQ34KGyGVoI1FglpZhfy8h5lhZyfBSfr94GHZOcPumcOuSJZlc4QBJp4fnHl7roP6EwpePZV7jFENC2QHbdSxFtRS2UQXH9hOl6SCZ5SC9bnZwzdeJHnjCs5xg3W7Fs2pmLNf2Hs9/52YOeXcpkVyiyEOsYtXtLDhb4rFzecTDTyIeYgO/tjbF42bzwhXyKMm5qj60NVk6/9x87mUZB5b6OEX+3YtGv1+3Hz8NMW8QK/RuPm8i+nCj3aiHWlnYW0mB/jDo8zOQu91XbvSL3pu9Df4kvT/08eJrRfRCepvKNt6lixTa1A8Ip1plLwAAAAASUVORK5CYII=>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAACv0lEQVR4Xu3czatNURgH4KUoXyUfkZJiJmYyM0IhMzMpE8nMQEkxMZGBTHxOSJRSGFJKuqVElL9AIjEyQyEf623vzTrLOdctN3fjeerX2fvdt+7ZZ/T2rr1XSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDfmVYXAADol7k5S+oiAMDfZFPOs5ztVT0mU09zVlb1Ptia87WqXcg5VdU6Z+rCCHHPX1LzmwAA9Ma5nI05l4paTKWO5Lwran1yM+dNe7wu50ZxbZiddWGEtTnXc6bXFwAAptLlnGU5d4rarpz16ecpVl+8zhlLzUQspmdzBq7+bEXOrLo4RDR2++siAMBU65ZCX7afM1LTwC1Kg03cRMRkrjQ/jX7o/8U4eVz83TDRSEZjFcugp9Po/1E6XBeGeJQ87wYA9Ews/a1qj7vlz3g+LMTy4NH2uPS+/ZzXprMnNUuTC9vzxTkPc3Z//4vJMTM1Ddvt1EzOotGMz1+5mAa/7zDxG1gOBQB6JZY9O59yDuWsTs3E6koa/sLBg7rQupeaqVznfHE8zNJxMt6UKxrKspH8kEZ/p1Lc6/G6WIh7jt8AAKA3FuTcKs6fpx8TqGhuyuYl6ltSM32KZimapmjuSvU07n51PhliyXUsDTaS8dxZTNxiKfdXDtSFQvfCAQBAL8SyZTQ5kas5s1Pz5mWILS26a7HdR4hlzXhoP5Yjo1lbngabvZhO1W9i3q3Of1cssX5Mzfd6m5rn18LnorajrY2yJg1f8nyVftzzZC/hAgD8Ed2WHzFliy1ATuYcTE0DFGLiFUuZpbjeR3vrAgDAv2Bzzr6csznHck6kZpPa7u3MmMrF9K0Tx33dfDaerZvIFh8AAP+MWEK8Vpw/Sc3ebhPZamMqbMjZVhcBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABghG9OaV00Y4lp3QAAAABJRU5ErkJggg==>

[image10]: <data:image/png;base64,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>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABE0lEQVR4Xu3SIUtDYRTG8TNUcCgTFJsWsQxsCrJmEpNFwYFrC4LBNBFlVUQwyAzLaxaTXcSoyWARBAd+AcPi1P+zs+G9h9tMAx/4wTjnfe/Ozp3Z0GYSa1jHVL82g9nBgWTGUMcbDrCPJ1zgAcXfo55RNHGNiURd3/CIe/MJUimhjaXYICdoxKJyig/MxQY5xGYsKi184xgjobeI6VDrpWx+Sbq4QxWF5KEYbe7M/MLgsjxb9sipaDSt9hyf5hf3UifMD2nmXGyQDXzhKDYWcGX+nmKW0cFubGiVtxiPDVLBK+ZjQ+9HT1sNdY2sJWyFeu9vcYMaXvqfteZLvGPHMn5r3vyJila+gm3zf3jWuP/5U34AsNUreE1r6AoAAAAASUVORK5CYII=>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAAFLElEQVR4Xu3dWchuUxzH8b8MEZIhs4yRCIWSIS4oCokyHUXnmHJDLsxX5MKUKSFKkiEJF8aceA3lgoSUMlyQIS64QSHD+rb2stezzvO85znvs4+eer+f+vfutZ9hn73fi/fXf629T4QkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkaRnbvN2hubFhu0OSJM2nA1KdlmqDVHs3r81q01QPtDs1N3ZItVm7U5IkzY9TU31WjW9KdWg1HsL1qU5s9p2U6p/IAXFoB6Y6q9s+ONUrkQPJVqkej6Ufk+94KXLAwerIx8K5qT7vtof2bapvmn3bpnoy1TOpNmpeW4ob2h2SJGl+/Jnq9GpMWFtqoJmEwNZ6MdX37c4B0M27rxo/nOroalyf67q6KHLALQicxV6p7qjGQ+F7z4zRY+HSVNfE6LnN4rIYPTdJkjRHCAKvV+Ntqu0h0P0pXagaYW2h3TmAnVOd321vneq9VLv0L8f+1fa6IrDR2SrqELVvqjOq8VAIUYen+q3aR6ePcyL0lm7frLgu97Y7JUnSfGBq8sfI4YM6ZfTl/3y9SL2fap/+rSPo3IzDsTj2+rQi1uxMDYXO10K7cz14LHIo+zL6zufVqY5P9Xd500DObndIkqT5sirVJ5G7NkMad7MB05Z02Ag9RX2n4sbV9iweiTzlW2O93tvNvmKTmP7YdL5ursZ0Em+Lfsr1oOgDVrlDlu7fdzF63mvzUKotIodDfnKcPSKHtvbcpsW6Pq7Dls1+giHr/CRJ0hxpp8AIBCxiH2enRYo/9JOCzq3tjsidtTrs4P7uJ981y7Rl7ddY83wY03kb592Y7tglQLXBi/VkTMO27qm22/NeGzpp4HPHpbqlG3MTQntu0yL0jfssU9dDr1+UJEkzokNT/kCzLooF+pOC11LRsWnXWS1EH3Y4Lt29Mh13SfcTz3U/edwIzkt1YarDujH4LHdLtjgvzq9dlP9m5FDFeXJzAu97OvK/ow5W+6X6IdWe1b6C7lo71VqHoENSvdxtbxd9CGTd2TmRj0mHrPgo1e/VuDgq+i4YU9XXRv/7qs+N63td5GvNejc+c1XkriV3yPL685HXJ9J15HNchxrX5MFmnyRJmgN3pvog8h/3T2M0sAyp3H24feTpSMIO6+ZY/1bWzhGM2s7PF5GDTX335cpqGwQZ1nfVbkz1V/TfTTArU67lHAmIb3TbH6baLUbvIN01cpCq1/QdE/lY5Xt/6t4Hgln5viNSvdZtE45K6KJbRneO0FUHUx4V0q5H+znyMf7oxty9W254+KV6jRBGETrB8U5O9XE35tyOjf538GjkY7e/ax67Mu5uXkmStEww9TrNVCNh49XInTQCXOlC7Ri5I3ZlN+aZZ7Xbm/EkhKojI3fl6CZeELmzxt2dJVhx7IIAOa7DNk4JQZznO5FDG99HACUM8l0lVBGO6i4hCM2z4LoRBvnJdWI9HcGQ76XjV8IeaxQJllyHGmsNWVsoSZKWKbo7k+4WrfG/LSxE/5DdpyKHNp43RkesTEXWC+PpnJ1QjRfD5+i+EaYITEwXMkVIsOHYTDnWD/hle9o1XTwr7YnIwXJ15AcQ89m7Ij+UlmnJt7r3ch6Xd9vgJgAC5Cy+SnV35PV5u6d6oRvz76FYA3dF5PD7bOTrUPMOUUmSFBe3OzQYOnjcMLBUPJJl2mAqSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSfp//QuEWbvu2NPrAgAAAABJRU5ErkJggg==>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAYCAYAAABHqosDAAADBklEQVR4Xu2YS6hNURjHP3nk/c5brjIgkpARA6IoShgoSjFgooQIpTwGDBiQRyLXxCthwADFVcrAwMxMSVLI0IQ8/r++ve7Ze9n7nnPPPe5x2f/6tdfZa529z/qvb33728esVKlSpbpPi8Un8TPFV/FIjEqN60laLT6KNnFBPBHL0gOkLeKl+GE+bk6mN6WL5oOWxx09VGPEdTFFDBPnknZak8RVMSQ6364R4oV4IyZmu5qu4WJ8RP/MiHwNNo8UDOlrbgptTAriWlfMx+Zqhvgsbok+UV8z1EssMV+su+bb4ax5+K+z2haPyTLp7WKH+TXXpNqoqjEbzHPL3rijCWJ1D4ozYmjU1xkFYzARMzAFQ0IbVTXmlPgmFsYdTRA/GlMwqCsKxjD5AeY5dGZyvlVMS/oKjQn55bUYG/V1t8IEpsYddShtDErnmNCenozJNaZafuln2dWLPzdSTOK8mJy082Dxarl/bAxaII6bf3+RuCGuWYExIb/sjDvM9+RhMSv5jHFcaFX7iMaKSTw2T7YdUVhzpJRnDNpqPlfmtsf8yZVrDKFblF/Yh5fMQxyxWs/No+xPaLR5iOf+0E6qyBiihagheqhfjlnO/TqqX7gAq0NEIR6Vd8QHcVnMTs5z4wPinthklUch/VTPK0WLeYVdTXyXHx1XqfWoyBgUCj52wlHLMWae+GK/5xcuhilvLZsICUOeYEHzxVPzZMakjphHFTfaL9aLQ+KmZQurjsS17lvXo5JFv21e3eaJ3cBCn7aUMUvFe6u8G30X7xJoh/Pkk2AYRwwMNQDVJxNg0hhwUmy2SsQgzMCgkalztahFPDSvZyZY9pq1iIgL70EcifY8rRUPLCdiOiP2P4kqrCRR9cqKt8g4sdtqj5RYvc0XsNW8lCB6gTZPlEYIw1uSY90iOeMuCWujmCuemW/HoFBAEb6sNuHMBLclff+kmFib2GeVN3C2FUmMrXRCrBADzbcPq0piZ0vusi6uyt8u8kr8Zstn/rcJEydCQgHGcVDSLlWq1P+hX1wnh0ihkkW/AAAAAElFTkSuQmCC>

[image14]: <data:image/png;base64,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>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAVElEQVR4XmNgGJpAAYgj0AVhQBOIs4B4HxD/BeKFqNIIAFIYAMRWQPyEAY9CGJAE4ocMowpxAJjCpUDMiCYHBi4MkIAGxcp/KP4CxJeAWBdJ3QgDAI24GJNXncOFAAAAAElFTkSuQmCC>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAvElEQVR4Xt3RMQtBURjG8degKCWTmYFsSlaTlRQTvoeyynK/gLL5ECYDozJjt5hsLBb+p/Oe2+F0PwBP/brd5z73DveI/FayGGKJCNXPxzZ5bDBDDnWc0PdHJhMcUPC6Ec4ousI8NKOVKzRN3NF1RQ03CYcNPDD/LpKGcd/Byy80wTAokvoyrn6hccOpK8x/22GNjCtJG0+9xhnjgpLep8T+/L3Yw4iTxgJb9HR0FHtCQcxXKhigJfbl/8wb4ZAlMSoxI0oAAAAASUVORK5CYII=>

[image17]: <data:image/png;base64,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>

[image18]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABeklEQVR4Xu3UvytFcRjH8Uco8jM/kiIli7JRIskkCwOKYjMog1IkUgZJyqBLscpiYBIjNzYmg0Upyj9gMPrxfvp+z73nPm6dc2Y+9ap7vs/pOd/znG9X5D+hlGMAg6jya7WoD26Im2Ks4RnzmMM9dnCD9uyt0SnCAU5QFlrXnd0hLW7nsdODV3TYAllFyi5GZRNvaLIFsoQRuxiVI3xjBYWm1oYasxaZSXEN1SeuMIPK8E1Jol94S1yzoLF6kPxjiB19XT0e23gX13TW1wrQjw1xc827e22gM9KbbYbwhWV/rR/mUNzbdOMYpb6WSSv2xJ1Dm058YEpc/RTDvqZn8hJ9/joTfeo5SmyBTOMJzajDo+Q2TIt7WE70/Oku9BXC0THoBxnz143iDr5tGIwjs3iGRXFP1996VHbxggnJzjZWQx2o7kSjg+7CuLh/GjuCCtzK74ajwQ1Jozvdl+zMdKbXkvAfyKYFF+jFOhYk/3FLFB1NA6pt4Q/mB7JFPknsACPHAAAAAElFTkSuQmCC>

[image19]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAkCAYAAAA0AWYNAAAEo0lEQVR4Xu3cT+ilUxzH8e+EIv9TJrEwiJSdUjazsjALFkLCVkpKWRiFlaRkaswYSVMTG8JWic1dipWFlNUQyWKWFiyY8+ncM/d7P/M8z32uuedHeb/qNL9z7nfOfc7d3E/nec6NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU24t7c7SLirttuW/ven9jvvgf8ilpR3wwf+pp30ghscAAEAnCk4flPZeaYvSjq692s8zpT3og8VHpV3vg+aq0p4r7ZXSbrDXhqhe61P9XHeVtm/592WlPV7aG6Xdca5inOr1fqqfQ3Orfs7cvdeuuVWf59ZncXHqyynrAwCATj4s7e3UvylqgNsLL/pA8UhpP8Z0EFFw+HT5r7wWNSCNORm1vvk8puvl2tLeSf1vlmPyRGn702vucNT65vvYXJ/nVv2YnmvXnKrPc6u+UcDO7o1VoAUAAB39XtoPqT/2Zb5rutXo73WktHtic2C7L2rIaR6IGnTG/BXr9X/HdL2ciLqrJAqw76fX7o4aZsacifV6fcZj9Zpb9Y3mVv2YnmvX3KpvNLfqm9ejhrTsMesDAIAOvor6pfxL1LCwVzsmQ1/0z0d9/02BTUHCQ0vuO63PQ8tUvbwb9Rk20efigS33nQKXB7axeg9o3ne+Vu87X6v3Mw9o3ldYU2jL8ucEAAA6061IfTl/t+zruadXSzt4rmJ3tHOl3bTmktLeTP1NgU3BrldoEe383Zj6h2K7wKb55wY2zZ1D0abA1nPtmnsqsInfFr2/tJdsDAAA7JA/2K/nlRSWrijtk6hBSjsou6aQogfbGx08UFhoNgU2Dynedx5SvO/2l3Z56ntA877zgOb9zAOa952v1fvO1+r9zAOa90UBLVP4fsvGAADAjiiUfWFjX0f9MtfPNSyWY/rSbg/Eu4cnmkKZP6OWvewDiQe2a9Lfot2vY6mv620HJVTr9adjvf5MrNcPydenz+qzWN3607Neau21fcu/m0XU+ubPWNVfF+v1+v+LWJ9b9Y1fX8+1a+7Tqa+5Vd8ciHooITsV0wcqAADABbiltF+j7qKJfnfty9KujhraFstxBbap3a5/auyEocZ+jnpaVfQzF+pnqtGzd7pWXf/HsTrZ+FucX69bu6oX1etkrOo1t+oVRJwHkZ+i1um9NZ/eW+Hr2zj/Qfwno9ZLvlbV/xHD9e0a8rXu9drz2kRzq77RYQU/sDAVvAEAwAXSF7Vu+ymUKJTdnF57KNYD25Wrl3Zq6ODBkKd8IGrA1O1DNf+R37F67fyp3mk30OlW34nUV5i5PeozfS3kNs9aX1Sv9/NnALWDNlSvuVXvc4+tpefaVad6n1snXXPI1o7c1C4qAADoSGGl/f6Wbov1MveEYT6QsIl2j7atH9ph0/hxHxzhO2ZTXojt6rddy7b1Q2sfo7CZzQ3cAACgI+2++Y7PLs05YahQ0W7RzfFozK/X3Kofo/Vvmks7kNtot3rn+DfX7vywgRzxAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsHIWIAXVT6pMxoYAAAAASUVORK5CYII=>

[image20]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABRElEQVR4Xu3UPyhFYRjH8UcoIkR3Y5FFGRSSzSSThSJsBmUwkcgqlEEMJoPNYmKWjEwGJaUoZTYY/fn+eu/J8TjHObjj/dWn7nnet6f3vue516ycWOoxiCE0FmstKEQb8qYaq7jDPOZwiS2co/Nza3aqsIdD1MXqOtkFziycPHcG8IAuv0BWsOOLWVnDI1r9AlnEiC9m5QDvWEalW+tAs6tlZsJCQ3nFKWbQEN/0m+gNr1toFjWWK0u+htzR19V4bOLZQtPZ2HoF+izMaGLUQHekjT7DeMNS8XkSJ7iO1b6lHbsW5tCnBy+YcnW9wNSGGodj1PgFMo1btLn6jw01fzpFv6vrGvRCRl1dSW2on9IRFizciz5rVLZxj3FLvtvUhrUWTqJobHoxZuGfJukKoqQ2/GtK1rAb+3jCDTbQ9GVHOf/KB6dkOAKqzaIQAAAAAElFTkSuQmCC>

[image21]: <data:image/png;base64,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>

[image22]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABdklEQVR4Xu3UPSiFURzH8b9QRBRRykvJoijlLWUwSCwWisJkUAYTiawSGcSgZLHIIoPNoJtMTAaLUpTsBqOX769z7vU8p0f3XrNffeqel3s69//8n2v2n0jKMYAhVPq5atSkN+SaYqzhEQuYxy22cYXWn63ZU4R9nKAsMq+b3SBl7uY5pw/PaAsXyCp2w8lsWccL6sMFsoTRcDJbjvCFFRQGay2oCuayZtLcgfKBS8yiIropn+gJb5g7LH2w3FlyGXKOfq7aYxNv5g6di6yN4cDcg0q8vTapRgXhAhnGJ5b9WAf3m/uO+vXaXFvF0ow9c30YphPvmDLXgykc+jV97xUjfpyJ2uEcJeECmcYDGvy4HU3+s8qiAwf9OBP1n27RG8yrDHogqllSVIYLC94eDU6xiHv/Wa2ygydMWHJte3BsCb1Zau4mitqmC+Pm/mmSSqB0mGsvve86sDa+nF9Uvy00og4z6I7tyCO68ZnFm/63d/8/f8w3NVA8fMiz18cAAAAASUVORK5CYII=>

[image23]: <data:image/png;base64,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>

[image24]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABgklEQVR4Xu2UPShFYRjHH6GIkI+kSMmibEiyGCQLJYpiUAYymEhkFcoglMViYjHJKpl8TIpFKUoZZTD6+P2959x7vK7OvRn51a/ueZ73vPc5z3nOa/ZPhELswC4sDmJlWBEuSJdcXMBbnMJJvMBVPMGG5NJ4cnAL97AgEldl53hsrvK0acN7bPQTMI/rfjCORXzAaj8BM9jrB+PYwXecw2wvV4+lXiyWIXMbylc8wjEsii7KBL3hJXObhRvLS0vdhrTR42o8VvDZ3KbjkVyfuT+etR+q1yL1KMtPQDe+mbtZTJh7QVo7iqeWHPwEdbhhbg59mvAFh4NrDb16q8p68NHc/V/QOBxgnp+AEbzBGi+uCjfNfQjfCtH8qYpWL6426IX0e/F2PMNDrPRyn5/SPk7jdfBbo7KGdzhoqXsr1N8rrI0G881VIjQ2zThg7qTxW6CNtYnWiLC/4QRkTLm5p9gOrlvwCTsTKzJEFepIWzZ3kOyaO9b0ZL9Cfa/CEj/xB/kAnlo9XDsXy+gAAAAASUVORK5CYII=>

[image25]: <data:image/png;base64,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>

[image26]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABYElEQVR4Xu3UPyiFYRTH8SMUESIbJVnIRsnEJAspimKjFGUQiaySosRgtt3FZJUuIxaDRSlkM1FGf77HuW/3cXr1vv6M91efup3n7fS853neK1JIkEr0og/VuVod6qMH0qYUq7jBHGZwjk2cojX/aHJKsIcMKoK67uwMWbGdp0437tDuF8gKdnwxKWt4QINfIIsY9MWk7OMdyyh2ay2odbXEjIk1VK84xiSqwod+Ej3hdbFmUWN1KfFjSB19Xb0eG3gSazr95QnLEKZ8UaMNdEZFfoH04w1Lrt4kdld9/TPN2BW7hz4deMF4UNPRzONIvmmo1+EQZX6BTOAajUFtAD1ityK2od4/3UWXq+sY9ECGg5oezqzYeGIb6qd0gAVc5X7rVdnGLUYlP1sdib5qdOKxDcvFdqLR2XRiROyfxo+gTex7Vid4xr3YZ/nn6JtlJWaHv0kNtvCIC7ERFfJP+QAuezzrwfmrIwAAAABJRU5ErkJggg==>

[image27]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAkCAYAAAA0AWYNAAANyElEQVR4Xu2cC8ylxxjHH3dC3apEim61KLbu1bRFNlFSGtfVsIhr2iJFaIpF5XNpKmXdNtSl7kEIQSiCdI82oUEUUZWWWKJEpBGCoHGZ38777HnO873znnO+75zdb7v/XzLZd+adM+/MvO88859n5lszIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEOHh5bAn3zok3AE4tYUdOLNzGaptvV8KhJRw2eXsPR5Tw+Zy4RG5SwlEl3LeEG5Vw9OTtpXNyTthgvC4nHKTcpYRbpbQzU3x/wthiTB3obCrhySXczOp4vOnE3bWzlv55Qgk/LOFB+UYAu3HLEKfOszwHu0Od9jePK+GSEu6abwghxiBM3lrCtfnGDYBdJdw5pWGAf1XCS0r4QQmXWjV2fTzSqqjbF/yshE+U8MESdpbwrsnbSwXjfl6In2jViNN3zw7pLe5jtd7PzDcaXGA1fxYeLajfQ0P8tlZ/f25Im8aDc0ID2kL9aMss9Vtm2/vqQl+csDdHZbMtTlAMwVh4g9Ux1MexJfyvhFFKz7yohN8OBMrZn9DOb5TwrBJ+VMJrbTGiZtb+ySDYXp0TA7yPz5VwSEj7t9VnZW5dwitC/D+2WvA/39rveJm82STYhGhyB6ui5U4lPDDdO9A5xao3IsJE95uU9p4Uz1xVwpE5cYEw0X7G6kTssJpuichlsK2EZ4Q44pGJEw8lK/AhrrE6sQHf01nhXubuVvM7fHtD+R3q51xkk55PJtYh8XN8CY8v4e/5Rg/UL7aF+g2xzLYP1eWjtvrbZgGybJjE8TrFbxUxEfm4TRckvMPo0UVYxHJymcugNe4PL2F3SmNsuGBjXK5HvM3SP5lpgg3P1B9LuGdII/8fQtzB1m8JcfqBNId3yyI+cp3tG3skwSZEA9znTAissBgk6zFCGw0M0JU50aqxZHKIIuSO4boPJpdP5cQZiSvZFniOEBNxC/QB4XpfgBcnTsLRmzUN6h7zM0nEiSPC5BCFE++jb1KJILKpn/Nfm5y8eJ8ubFp4H0+D+sW2UL9WW2CZbR+qC5MnXtjI+bba8zYPt7dqBwiIQf5lS40FhafjcWXrCoFMeEcJz+nu+ffjgoQjFk+zfsHP76LnOws2PHD8jva/qvvXoW4Pt1pfjjX4c7FniEmE7stL2N6lcx9P7HO7OPB8nhnr7bjt2GpjL5NviwILGcZqFBaPslpP2pzLoz5vtPGiwvuHMmM/Q9zSjAwJtvtbtd2U+4iQvtvqN0GfeF3pU/LEd4IYc6gH79ehfpTPAiGWQXsdvJGL8sZJsAnR4CSrnpx/Wd2iOW7y9gENBh7DmmGljKFGpL7Q6tbaNDCUl+XEGUHsTQODd7nVerEtPY9YWhT5/No7rW4Ffc+mbyVm0ZLjESaVLFqmCSnOrmVvTBZsrcnMmVWwUZ8sklptgdzWHI/ktuZ4Jj87xhFRO8M9QKwxQa8VPHT05S9L+KrVMYJQxuPk3+aHrXqomVTPKeGbXcB+uNignnzPr7Qq5rg3jSzYgCMBjGHE6ZdtfDRhl9W6sQXIQuoxXfrVVoU7nsgzrP6W7T/EBmVQl6darSd15pmx3pGzrd4nIP5cUHGG7E9Wy/R2IcS+X8K9rI6ZC7t0eH0Jvy7hGKvPdGE1siru6NO/We1nnvET6x9vLcHGd/Du7pr7sQ9Z2PCuEL/0DaKKPqV/doR814frL5bwJqtb8fB+m3zHXsal3X3Asxe98+tBgk2IARAicXtpPbAFiTHLK8z9AYYLY9UCA/4XmzzjgbHgLF+GslqeEPc8DAWM2/38BwMwIZ1mtU5xi4L0fA5vkfDeMr4Cv1sJv7P2+SgmxCxScjzybZtPtED2UmaBluN9zCLYaAv1a4mkzDLbPktd8H7k85Xr3Ra92KrYQoSw1ezPi+W6YAPGRhZa1PPKEG+1MdIn2BBSeNGA51Guw3Wc2ON9ykEsAvWgTY6/H/LEsd8HY+CoEq6wmtdF28hW70Z4PH5npPF8H8tR0HKG9itWPYSRPm8ktAQbRyncM49Y9TyM15GN68UzX2P12Ms/bCyw2Gp3+48nEEFGmf5dYcsRxeSDF9u4DCe2cRqPzgkJCTYhBmAy5kDtomidC9nX9Ak2jGEUkwgVVqGA2x9vG6vkE/bmqFDWX1Oaw6pzWviz1cmvRd6SJa8bLeq7PcSXwctyQoDn0o+IgxZZpOR4JIuUHO+D82eRLNByvI9ZBBtkUZTjmdzWHI/ktuZ4Jj87xxFV9whx6BPf83CmVY/7ZqvfLv3KN0jc4XuYJthGIT7URqdPsDFet5bwC6uignIdruOYoC9G3TVeNB/DPBsPl49FvFGbbFiwIZaxAw4iBo+ae3lHtlqwIWh/bNUz6TaF+o1sdV7qjoeQfLP8QQ+0BBttiMHtL15Rv/bzjz6GsflHdtcsXHnnDuncd1pHSzwPZSPo+EamgYh0b2gLCTYhBkCI+B8bMKBwgbNVigEizmT5MaueFjixhA91cQYpE8QnrbrxGfy7unyUyeqRvyg7tUvDzY5Baw1ayqMstgqA35IfY4wBep7V8xgY5BuX8DWrWxTUJXuAOKfx+5T2RJvc/sBYXh3iQHu8rQ4rV1bEa4EtkSEw5nG7D9hecc6x2paWEWPFyjmhVjh+nLUJfZcPK7ONAu5h80mnz9PH5ONtoH8v7v5lws35eQfkd8hLACZGQmanTdZvt00uDK6z8YFo98hk+gQb9YvfA1C/vrYAbcn5F9X2eesCbBVHmGwvSmnzwreAhwXvD5M19gGbEGkJNheTixJsCJqzumv3oHl/cJ2F0MOs5ovpLH7iH2tglw6zScGWBTZxjgJEjrPx+bCR1Wf47xA8LpT9O8NmYJvwzPu3e4zVxZn3zxFW7U+sL56tPvGTBRvvKf8VOc/GK+vXXj/6EBEO1JM+9C1PxhHvmQUr0F98Zyzij7XaNl+sbuv+pY+9LrTT+wVvJEcp2Hrme2bLmrkEEYYNf5+NxzeLY75f7LmPXZBgE2IAVk/uzkZ0sVpi0Hy3S0cwYEBOtzqoGXQ7SniB1UO2DGwmdQY6g5eVMBMVYgjDtN3q4EZkcQ7lEKvlZ3gG5bG6ZTsDY+ar3JdaPW+22+phY0QcYoRnr9jqP0kHjEAWbOfZpIDhvAgreOezVv86MsNzfGKdl/fmhATGnNW7GzIM3bfGt/e0A8O7bCMWt7zwTnh9nl7CP8M9JrksjhGYK9310TbebuGd5fyH2qQgRQx6fr6rlfGtvXA/1o/v5/LumnoiMHgGkxDlufcg0ifYqB+/jVC/le6atlCeQ1ty/kW13euS869017kueDY+EOLA+COsF+rEWAHEDqIjEgUbkzXPpN7e79iQy7pryP3eB32FjYjEPy5hkYc98fZxnb2+2B5fqPj3y++ut7EIwn7Rr9Sb9Fhvx78VRAbwW745F1Y8h/53oYL9QVwDCx3aQr0pB+/6+d29j1i1jVHQnmbV7vEM6oVNcu9gJAs2xNMoxAFvq6fRJq/fVVafAYhvnoON9W137LdvgVJf+hhPJO1H0PENYI8v7PLQ79SF3/B7nz++ZFWQYs8oA7uJaGOxu8mqWKYc+IJVW8y8Ee23BJsQDRioWewgFvy8AoMyejy4xlBca3VyxHBh8DAMCL/vdNdwuFUxgvFEdLCt4QKsD55FecCA/Xl3Tfncw6B5Xa+xWqbXNU4OkRUbT4AYHyY92sBKfEuX7uDV4x5GOXsyMHh9RnQWYv/14ZMFRpDV5qbxrT2T5qiEn1o99Our4mVwgU22kfMs1CefkaJf8kQJGH/y87tIKz/eV/JndlotK8K7p34RhC3flnsRnNNt8q/cpsHzMjyf+vW1pZV/UW3P+Vt1QdxuTml8Ly5M1gNl0L9AG7InK4NXs+XZXC/x+Te3dvtYbOL9d/C+x0UWIiV7PKGv3ogO7BfP3mL1G/P+cCgrjm3q2BIa1Lnv2fOQBdsstL6/3OYYp50uwBzKie33d4K9cO8bfeSeRBYlCFjscvSMf7r7l2/abTk7MvF5EmxCJDAgiB0mjWz045ZKFHO483HfM5jwBCA03tbd40/kWcEx+Fg1AQMYbxqeA0QTg5jf8uyHdHkirPjcG3WSjUUYXj1WZQgztiWAlR5lspKnvEu69AwCLbevBStJjBt15jqC522a8FomGOtlGzGMr3sChuC9Ry/QNObN756AzKyC+e222mMyBPlnhXLnzT9P2yl71vx4SuKiAk5O8YMJ7EcUlnjr1nqMYSOyFsG2DFjks4BFdGGHfUcC7xmiGBDKLPS+3uVz8IqfYdWW+va3L/odCTYhEogcBFSftyCvJBmEPjFwzwclUA6rUYd8cRJxT50TDeq5KfjqOQqjuPLDxX4LGxsA8iKwqI9vR/RBG7fmxAaUF1fCPGOl+/dgIG47tnhSThgAwztP/niWpQ/fPmyB4c8ewSF8ATErtGXW/PO2fZ66+JnOyCkpfjCC2L+iCywcZ+3PA4GNItiwz2dbPeOX/0sk7Hu08XmRmxcYLI59R8aRYBPiAAdj5VurDsbgLSU8JaQJIYTY2HD8BGG2Ld8QQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCLI3/AymagLQlDdsnAAAAAElFTkSuQmCC>

[image28]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAXCAYAAAD+4+QTAAAAqUlEQVR4XmNgGAXDHRgCsRu6IDWAORCXAfFpIP4PxOWo0viBOBDPAmJudAk0ALLEF4i9gPgrA4mWSALxQiDmQZfAAYwZRi1hoKIlAgwQQ5GxPhCvBmIVLHLYLMZrCSj1VDNAUhIyXgrE94F4Pha5ZLBOVIDXElyA6sGFDQxqS6rQJfABYi3JAOJnDJAiBYbfAfFhIBZDUocVEGsJRQBkeCgQs6BLjIKhDwBefCwhOsXpIgAAAABJRU5ErkJggg==>

[image29]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAABACAYAAACnZCtBAAAFHUlEQVR4Xu3dvascVRgH4CMxoCSQQsHCgBsbESwEg/WCIloYhIQg2OwfYBEsItgkjUUCCQhWaYJFIP+AVYpoG6uA2liYIh+kSWeKgB/ndfaS2XPv7t6dObM32fs88MLOO7Mnk1P9OLP3TEoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz4NzZYP//Vk2AAD2ws2ywQxhFgDYUxFGylWkA7lOF70uLua6kuvl8kQHNe6nq5ifcdkEAFiX9upaBKtPUhPi/mr1u/ij9fmXXF+2jlcR9zNO/e+nrzLUAgCsxbwQ8nXqH5Da3/8h14PWcRd976cGj0YBgLUa5fq3bE4NEdhqjrdXYr5GZRMAYCgRPq6Wzam+ge1Q2szAFiuS81YlAQCqi8A2KZtTfQNb2MTAFgF33qokAEBVo7R4pahGYPu79fnHafXR934O5nqjbGavlY3UXBu1k0XzBgBQzc208w/o41Hm9dSsIkXdnz29kuO5zuY6letCmh+Alon7eZSe3s/l2dO7dibXk6J3NNftXEeKflx7ouhtiVW2neYOAKCqdT3W+yjXZ2XzOTdJNhoGANZgXYFtU5k/AGBwAkc/5g8AGJzA0Y/5AwAGNU4CR18xf6OyCQBQyyTZmqIvgQ0AGFRsSbHsrxwv5rqSmpfB93Eg1+my2VGtcWqIwDYpmwDA5vo5NZvMRgiIfcLi86+5TrYvqijC2qLAFv/uu7kO57pRnFvFp7nupf4b3sY436X+49QksAHAPvRNrg9bxy/k+j7XO61eLRHWrpbNqS/SbDC6lprg1lWNNyZsqTVODfFIOVYqAYB94vVcd3K9VPRjZSmCXG0RNuYFtvKdn3H8Xut4VZsc2ObNIQCwgWJl7Z+ymX2VmsBT26LVoZ+SwLYbi1YpAYANFC9Ff1D0Xs31W663i34N8fureYHNCtvuRGCLAgD2iTupCW1tH6dm1e3Fol/DosD2bdoe2OIF6V0JbADARohg1v6Dg4O5HuV6v9Vr+yDXqQW1zKJHoq/kutU6vtv63EUEtsdls6O+41xK2zcMfivXw1zHin5ce77otXkkCgD7SOxzFo9D35wex1+HxmpbbKsxlEWBLRzPdTY14e9CcW4V11MTkKLu57o8e3rXYpwIsH3HOZOabVPaYvXwdq4jRT+uPVH02mIOBTYAYDBWh/pbFnoBAHqJsBahje5itU9gAwAGI7D1F4FtUjYBAGqZpO0/vmc1MX/jsgkAUMskCWx9mT8AYHACRz/mDwAY3LLAcSDX6bLZQa1xYr+0K6nZBuVZsGz+AAB6mxc4IhDFS+fvpf5vFqg1zslcv+c6nOtG2r5n2l6YN38AANVE4BiVzZZar5SqMU58f+t9ptdS84L6vTROzT5sAACDisAxLpstNYJWqDFOO7DFu03jzRB76dy0AAAGNU6L33ZQI2iFvuPEY9AysPUZrwaPQwGAtYngMSmbU32D1pYa4zxLgS1W1gQ2AGBtInjMW2WrEbRCjXHKwHa3dW7d4lGywAYArM2i1aIIWo/LZgc1xrmV6/z0c4S1z5+eWsmltP3/G9uFPMx1rOjHteeLXojvj8omAMCQYsWo7VCu66kJJlH3Z0+vpBzn8uzpXTuemvs8letCroOzp3ftTK4nRe9orttp+1Yhce2Johdulg0AgHWIlTaWK8MtAMDaRBAR2hYzRwDAnholq0fLmB8A4JlgBWln5gUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo6D/IVhe8uYFMqQAAAABJRU5ErkJggg==>

[image30]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAACKklEQVR4Xu3cvY9MURgH4CMohMRnhCAUGqVIREEjalHolAoahZLgP1BQigSdQiMhlCvbUWtUiFCJRCFBfLxv7uzOvWd2MhOzyMw+T/JL5r5z9p0tT87HLQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA0S5EnkWeR+YjryJnOyMAAPhvjkRORlZF7vRq+XxocQQAAGVD5HTkQO95feu7v21raX5vc+RFr7Y3sm5xBADACnYl8q10J0efI+9az8vle+vz7sjDyOFW7UzpT9iWcrsM9vhUuj0AAGbK+cil0mxFtt2LXK5qk8qVuwd1MXxsfX5ZmknbMDm27pH/a7sHAMDM2B95H9lTf1GalawTdXFCeSbtXF0MXyI7I9cjPyJPIps6I/p+lcEeOWHLHgAAM2cu8rMujnA18nZInka29Id25Pm4uci2qr4r8qGqDZM9cgWu7vG6jN8DAGCqvCn/bqKT26G5bbmmqucq3uOqNszClmrdIyed4/YAAJgqebg/J221vLG5vS725CpXbl8ulfyb1f2hHTdL97JAOliaCwNrq/ow2eNoVcset8r4PQAApkq+NiNfTrujVbsWudh6Xi45MVu4LJCTq1OR+5GNiyNGyx4Lq2vtHgAAM21faQ7s343ciBwvgzdGJ3GsNKt4eVkgLxTkWbevkUdl/N9p98hXjfxJDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYQX4DelhQaP+nQQQAAAAASUVORK5CYII=>

[image31]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAB00lEQVR4Xu2WTStFQRjHH6EICSVCrpcNPoC8RbJgI4VSlCRvZUPJS5KNjVIsZCNvK5aSlCyEUL4BKyX2kgWF/7+Zw9xx3XNzZ2HhV7/uOTNz75xn5nnmXJF//gjJsA62wRIYq9uTYK6+dkopvIBPcAeOwi14CMvgAWz4HO2AeDgNX+AETAzulhr4CO/EYcScdAW+wlarzyMB7mt57YRB+A4nYYzVZ7IJp+zG31IM7+ENzLP6bFbF4f7Oiop2zmoPRaqobYkalswxfBOHkURCNryFD7DQ6vODkfeJf4aXw3a70ZuY8jocTMBK454Tcs/9vjcE++3GNHgl/hNnwDWYaXdEw4KoPW60OzQsL55eZn1Xw13YZLTZZMF5uCgqKb+RD6/hiajBJjy9ZuCIfNU3o+4S9SA8Ur0z3IRJOyZqFY/k56AkAM/hM9yA3XAJnsJ6CT5U0kU94DrsNNpNOCZHVB5cik/i8scDsEVbJKGjIQXwTH+GgyXKlwtXwAkDoiKugLWiSqtHVOmYjEtkB1PE9MJtUWc784BZz+rgWe7BF8kebDbanJAiwVvBe66EB/eYORJ2f13AZWf2sjz5x2EYLsM4c5BrGDkn5l5XiZq8Q9//HT4AV25DZ5wataUAAAAASUVORK5CYII=>

[image32]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAXCAYAAADHhFVIAAAAlUlEQVR4XmNgGHjADcSFQKyGLgECRUD8H4jT0SVAQASIHYCYFU0cN2AGYmMgtoGy4QBkxAQgrgXi00DciyzpCsQ1QMwHxAeAeCUDku5MINYHYksg/gbEETAJGAC58ioQTwFiRjQ5Bg8g/gXELkCsDsQNyJIzGCCOEWaABATIHXDgB8RPgHgDEBcwYDGaB4gF0AWHDgAAPfUSVNIdKk0AAAAASUVORK5CYII=>

[image33]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAYCAYAAAAoG9cuAAAAu0lEQVR4XmNgGDqAFYgTgdgaXQIZeALxfyCehC6BDLiB2BWI+dAliAbMQGwMxHYMEHdhAH4gXgbERUC8EYg3AzEnsgJGIG4BYlsoH+Tgh0AsCVcBBCJAXA3ELAwQR+8B4q1AzIGsCBkoAfFzIK5Cl0AGLkD8C0rjBK0MEJNAJmIFIDeA3EK5e0Bx9pcBi3tSgTiaARLaU4D4OhCLo6gAgq9AvB6InRggVgWjSkPAQiA+D8QbgFgLTW4gAAAYZhsV1ZIijQAAAABJRU5ErkJggg==>

[image34]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAAECklEQVR4Xu3cS6htcxwH8L9QnnkMLkLyyqNblJAi8igGDDAgypUuJQOlvEInZsIEJUkZyGNCKVHSjZKYMDGRQiIDlCKPwu/X2tv+7/9e+zjb2Wfv3b2fT327e//Wuufsx+B8W/+1VikAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADs4Y6KHNQOV9zekW2DfwEAFmZa+TiwHczJIZEXI89Ezmy2rbr9I9dFfo7s1WzbChdFri2j7+iY0SYAYE/yaJksH1lKrh88fi7yV7Vts16I7Gpmd0c+jtzTzBftrNK915eq2cGRi6vnKfe7spnNy76RByL3VrMLSlcSF1XYjot8GtkvckXknPHNAMCi3V66glZ7vEyWuGlOj7wTebZ0P+u08c0T+gpbyhK07ML2ROSOyN/V7Pzq8dBWFrb83fe1w9J9bovyXRn/Ln6pHgMAS3B86QpUFq5hLh9sy6M9Z5Tp5W1H5NV2+B9WubDla8vP45vIEYPZbaPN/9qqwnZS5PPIse2G0h3pXJQ8ylh/F3WBBQCWZFjQ2sc3RL6MrFWzoSxx57XDDfgw8lo7LKtR2IblLN/XW6U7Z63vyFaWurV2uEl5AcauyKXNfDMOj3y9Th4c7TomC5rCBgAr5rBB9ok8PZjl47yS89fSX8yyYJxaun3q5HlP05wc+az0L5uuQmHL15CyqP1euvf95GjzmB9Kt3w67ejjrPKz+ypyQruhsbNMnst2ySDzorABwIrKotaez5bFKktJnyxmR7fDDfgxclc7LMsvbPn76/L1UeSn0l8us6y+W7ojWPOShTkvvMji1nq+dLcTmVW+n7ZQ1zl0tOuYP4vCBgArKYtae8Xo25EDBvM+ef7arEt4653Ddn/1/JTI96VbfqzlBRFrzSz3zfPO2n2zaKz1zOqrQFMeUXu5mQ3PZevTdw5b32udVV6d+V7kyMHzfF0PldF3cmPklTJ+K5YdkQ9K93/n5ZHSLV2nPI+x/bwAgCXJk+xzCbCWR8Jej1zdzIfyCFP+MT+x3bCOvsL2bemKVCaPwOXRpFz2y1tLtMXozsg1zSz3zStV8x5vtT8iVzWz3yJfVM/zfnPD3/1GNc+S9FT1vNZX2Ppe6/+R5SuXoW+KvF/GbymSRS7PK6zlMnMW51zCnpf8HN8s3S098uheuwQLAOzm+grbNFlCNnvUqpU/77F2OKO+wrYVr7WVF0Vkqb4wcnPk3NIt2W6P3FrtBwCwKVnY8lytjcgrVusl2nnIsnZZO5zR2WWysG3Fa23dUrp7tOVSaX6G+VnmcvDDpbsABABgbvJ+Y5+U/osPVlkuAeftPvJcsmXLI231LVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADY/f0DGdWP8F+ZpyMAAAAASUVORK5CYII=>

[image35]: <data:image/png;base64,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>

[image36]: <data:image/png;base64,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>

[image37]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAYAAADUUxW8AAAA3ElEQVR4XmNgGNZAEoirgFgAXYIQYATiZiB+AsQyaHIEgTEQf4ViEJtowAnEi4H4ERD/BmIbVGn8IAiIu4G4Aoj/A7EvqjRuIAbEa4FYFojLGSCao1FU4AGlQBwDZYNsBGkGGUIQaDNA/MoD5cM0t8JV4ACsQDwFiG2RxEABBQqwhUhiGIAfiJcDsQqaOCiRPATiAwwI12CAIiBORxdkQGi+C8TiaHLgVARy2gUglkOTAwGQi44zQAwAGQQHIL+9Z4AECAg/B2ItJPk+IP6FJA9izwViNiQ1o2BwAwBqgCY8YTiPnwAAAABJRU5ErkJggg==>

[image38]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAYCAYAAABXysXfAAAB3ElEQVR4Xu2WvStGURzHv/ISmchLXspLFHldyaIsFhmVP0BJiqIsutlkQxlYDAYlJsViUQajxWRQUiYpi0F8v85zdO55PG/3Fob7qc/wnN/z3J7vPb/fuRdISEiISyud8hd/kRp6ST9SPtPe0DeA5VTN+kD7bLGbztIL+k73beEPmaAvMH82CJe+aKZXtMsvKMwkHYZJ+R/CBHQG5v/c0vpQFRigu7TEW/+mgd6jsDDVKTNRTBtpkV/IQiXdg7n72zC747f+NF301kJECdNJT2iLXyCldJUuobAw7TB3vZwO0Td6Riuc76zTEedzGlHCiEF6jnCgqEHEOMzvhAIoiAIpmKiih0hvvRBRwwg3UJwgIqBjzme1mFpNLafracZ3kGVeRJwwQoF0IqpFogax89LkrGkHdAjoMGhDHvMi4obRjmzSO5i+j4I7Ly4BzO7MIY95EXHCKMgGzI700FP8fCjkQs+XFX+RdNBH+gTTznq4ZiVqGDeIbS31dZRAAcLzYtF17TF9hBzzImyYA+Tf7wqibV9A+m8KDVQLc9f7/UIKe0zrYZoR3QkNl15l7PvOK72B886TgVE6j/QgFrXHGi3zCw519Brh960tmAeui47pY+QxLwkJCQkJ/4JPhvNehdWUIjQAAAAASUVORK5CYII=>

[image39]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAABiElEQVR4Xu2UzysFURTHv0JRJFGym1BSdsiGhWLpbSgLsREWNiIkGwv+ARsL/gDJn2Dxirz8AX5sLNgokhULEt/TmXndOTNvNG821PvUp+bdM/POvfece4EK/40R+ki/HZ/oB/2il3SCVgcfZOWQftIhZ0z+fAGacJ1WObGyaKRn9I62mVg7vS8RS00PfaEntMbEBug7vaKtJpaaHLQ2izZAtqGxVTNeFnuI1qeWzkFXuub/zkQDzUO77MJ/voGuYp+2BC8mIE3Sjei2h4irj3y4Ce22MX8sCXnnnDbbgEtQnxUz3kffoG2fRBM9hXamdGhJ4uojTEMnsGvGLbPQSV7TDhMrknR+ZAKSaMOMu3h0mfbTB+guxNJLXxE9P/J8jHCiLTpafEPrKEk86JbJiuyuYBi6p/Z+k3oFyP0mzSAJZ+gBrXfig/7YJJ2HTnjciadCtlM+lq5yk8izrLATupouWkD8gc/EFMLbGJzFpHqmwqNH0LtPurEOmmSHPtNbuoRfDm6Fv8MPoT9QvxTp1gcAAAAASUVORK5CYII=>

[image40]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAkCAYAAAA0AWYNAAAED0lEQVR4Xu3dS6h1YxgH8Fcoyp1cwoBMZIBQCCO5DJSQ3DJVkuQSA0ISA0oo18FnRJEYMCFtMWJCyUwhZcRAGSi392ntZb3n2Xuf27fXOc7u96unb69nr+/be69vcP4977vXKQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFg1R9Y6ODdHNNZrHVbrkNzcYfEeAIAV82mtv2r9U+vX6Z+P1zqiPWlE59Y6Pjcbl9b6Izc3KYLZw7XurvVlrWdqnTl97sP+pCU5pdZZuVldXOvk3FyiuD7Xpd576RgAWAFX13qyOf6h1sfN8Zjez41kUroQuR0v1Xpr+vjYWl+UYQJ1VfN4GZ5rHh9YuhB6Z+ne+zXNc8s2qfVg6r2YjgGAPS6W8D6odXrT+6zW383xWA6o9XxuNk4tXZj8PT+xST+VbvLVe6B5HN6pdVDqhXhfb5bh78ak7rbmeJ64htl5ZdzA1l+fN1L/6Fq3ph4AsIddXoZwFkHlnFrv1jrxvzPGE4Emap7ov1brpNJN/LYzDYuwFPVJmb/EG4HugtQ7odYrqde7Y1pZvMd5oWzMwNZen0mZvT4Rug9PPQBgj4rltAgVk1p/1vqmdMFtnjNyY+qYWj+uU48Mp64RQaad7LX2lW5/Wx/YYmq0VU+VYX/e12V2Qhb/bg5TN9W6uTlu99fFXrTXm+NehKdLcrOMG9j2leH6xP68fH3is8VzAMAK+L4M+9ViSjMp3ZQpi6DyW27upwgy80JFhKR+OtZX/2WBVrynZ3OzdHvIcriMKWLe6xWh5t7Ue6EMU79YLo3XPnt4ujzRPO4tmhRuFNhiOfPVBfV0c16Wr88vZfb6xP9V+74BgD0sgkz/hYOYdv1cZqc1IYLNt7k5FRO5CF6L6qjh1DUWBbaH0nHs0ZoXiGKZ89DcLN3niODVin1weV/XvAnbXaVbJu59VIbbgMQSY4SpbLuBbTviWufrE58tv74JGwCsiAg7EdD6ZclYDoyAEZO2i/qTqlumvUnTW4aYCrXhKMT06MbUe7RsLfREAG2/qBDTtuub4953ZXYyFeHs5dTr7SvdMmR2XJnd2xYh9crSXc/bS/ct1UVLzVsR+/Hy9ZkXCuNLELt9TzgAYCTxQ/7aMkxn7inDXqm3+5OWKL6puWz9cuj5tW4o84NLLHc+lpuN+Kwx2YvPHfdxi+nieoErbhnyf3FaWRu4AYAVF9OhXgSYZfsqN3ZIhLq8zy2L22bEEuhlZePfjvB5buyiuAXJRu8XAGDTIljMW64c27InezF9i/u8rTeF2wnx+vflJgDA/opvXi66vccY4vYc8ftLl+3+Whfm5g67oux+aAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBr/gUra5MHSZ/3jgAAAABJRU5ErkJggg==>

[image41]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAYAAADUUxW8AAABE0lEQVR4XmNgGAUDB5iBOAyILwDxIyi+C8QbgdgciBkRSlEBPxAvBOIyIOZEkxMG4slA3A7ErGhyYIFOIHZBl0ACIFtLoRjFBR5AXIIuiAWAXDQHiLVhAixA3A/ESjABKOAAYjEGSDggAz8gLoBxBIF4EhDzwqUh/j8ExP+BeDoDxAIY0ATiXhhHkgESUDxwaYgrnjNANO8BYm4kOZD6ZhgHJAEKSRG4NMTvSUC8G4itkcRBwBSIW5AFqhkggUYMwFCrwgBxOsiv+AAolBczoHoRDIKAeBEQC6FLQAEooPYBsQG6BAzYA/FJIK4BYh0GSOCYAfFMIN4PxApwlTgAKF6NgbgRiGcBcRYQqzEQTkAjAgAA/P0hZPgGIPcAAAAASUVORK5CYII=>

[image42]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAYCAYAAAAs7gcTAAAAY0lEQVR4XmNgGKFABIhtgZgFXQIEeIBYBog9gXgWEP8C4gNQcQxQDsR/gfg2ED8H4v8MeBQjg4UMo4oRgLqKWYFYHIglgXg1A0TxcSBWgYpxIJQyMBgD8VeoImzYF6F0FEAAAFnuJeKHz/2hAAAAAElFTkSuQmCC>

[image43]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAYCAYAAACV+oFbAAAEl0lEQVR4Xu2ZX6gVVRTGv8ggtYxKlLIeCkNEocKSyArLiHooJBLCQAQfSowe1IzqoRMhkQ9iFgkVRIVUFPSUggpKRUT1FInRHyQpJaOCqBejcv3umsXZe5+Zufd477Fb937wcWb2njsz+1t/91xpEpMYx7jEuNn4gvEm4xn59OnFOcazy8H/CRD6CeNU4xXGr4wrk/mzjOcl533hQuNtxnuM841n5tM9uMr4ikbxwHGOO42/Ga+szvHwfcbp1TlibzPeXZ0PC8KC8PjEuNt4X8U9xq+N13YvzYDV9xsXlBOGC4x7jf9U/Nt4a3ZFjlnGL9S9/gfjjdkVo8Ma4+/q3v955emAtXyZzMNn5aIukYsKthvfUx7JOOgu4+JkrBbc5BnjYfWKytyLxl+NVxdzvCgW7RTjJRCYeyN2k/W510bjt8Zjxsvz6TED6Q4HOmH83nhZPj2Ex4xPqz6iL5U7xF3lhOF2+b15Ri0Qc4fxFzVbhVTys3o9YaHcE/htwyPy0CMUOa4Dz37ceFB5iI41MOJLxi1yz30wnx7Cc8YbykF108UK1RdI0uhHxnvLicADco/jtwnnGz+VCzEzGUe4MpxKTJEbc5nxO+Or+fQQ8ISO/Jo/5IYZFO4wPix3EKL1Y+W1hrW+ZZydjAGExuNvqc4plKytBO/+jmrm5hqPGg+p9+YpQmzEuqgaQ2CE5gXaMMf4mjwffqB6r10l96T75d6GIINCR57WEOMNuaMR/gGiGOdIxcKL18kLJeufZ3y0Gi/Bu6MT683QkS9uOE8i9Mijqdj8cs4LtAERqQdhHIyG8QIYnAghP9LRDDJfY+SX5Q4AEBmxET3EpSlYXx0Hlhr/Ul44m5xskbwWZLWP0D2g4TsEwDzX4ZnnVmPc9EfV57YUCBlFkYXyImH1CE3OSU+nK19H2iN9kEZIJ1F3cIzh1tSGWieMQQofodMGWh2s2UnGEPtI9dsEvIWQjPsjPDk5/oaQW14dM9ZPvr5G3rk8VE60IPJ1CgpkrK0pX/eD0JUI6RlMU0MdaHXos39S3kuPROzI1xENeHjkZHrqjrq9a7/5mlDn+nfVXqBTdNQbxbR+RBt162b15ut+EbpmqSjCtk1sCgCFgEVtKOZGInbk6/T8T3nnQ/oI4/GcneovX0+Vb8JmlBMNIG2+rt7CxbOfkq/xM7nRR4PaNIL1KAwsvilH0fuSz9jUhAcGEIVOps0TSRtpOLHdpddmV7k2Gf838nWKaAPbtBgpGnVhR8hD6AJKMeknjxu3yr2oRAjU5Als1dm+plU5rP6+8t42PH6k+bpf4L2r5V/sOC4RjlfuI04FrJdaUlsHmfxG/k0EL4S7jZ/LBa97OcA4RqJ4puAbAWKmbdKbxmnyUKb9i+8d5E8Mml572Hh9NT8WIGWxNY/743V8OCtBG5i2gKcK9Dugli07PS6W4CsfueZiNYucgm0pRkr75omMiJBOMT4mwIs/VL4Dm8iYK+/b+R0I+Pr1turz+kQCmeBJ46bqeCDgxmwU4MAe8h8AdYgPUAP/BwqdDN+irysnJgjYvNFJDVzoSUxi/OAk5DTuFyLWAxEAAAAASUVORK5CYII=>