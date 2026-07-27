# Vox Mana Architecture

The Architecture folder holds stable documents that describe how Vox Mana is designed at a system level.

Architecture documents should explain:

- system-level design;
- relationships between major subsystems;
- long-term product structure;
- governing concepts and ownership boundaries.

Use this folder when a document needs to remain useful across many implementation passes. Good architecture docs describe intent, constraints, and how pieces fit together.

Implementation details belong elsewhere:

- use `docs/reference/` for practical developer references, data contracts, and method-level guidance;
- use `docs/contracts/` for strict request, response, or route behavior contracts;
- use `docs/design/` for visual and UX implementation guidance;
- use `docs/research/` for source intake, exploratory material, and evidence packets;
- use `docs/qa/` and `docs/audits/` for validation evidence;
- use `docs/kanban/` and `docs/handoffs/` for work tracking and task history.

Architecture documents may reference implementation files, but they should not become implementation notes or temporary task reports.

## Current Anchors

- [Project Atlas](project-atlas.md) maps routes, runtime layers, entrypoints, generated artifacts, scripts, and constraints.
- [Route Ownership Matrix](route-ownership-matrix.md) records route responsibilities, dependencies, tests, risks, and do-not-touch boundaries.
- [Data Flow Map](data-flow-map.md) traces source content, generated artifacts, browser state, external services, and local tooling.
- [Core Logic And Algorithms](core-logic-and-algorithms.md) describes major behavioral logic at a durable system level.
- [Placement Domains](placement-domains.md) defines the long-term domain model while preserving the current no-domain runtime contract.
- [Behavioral Model Integration Roadmap](behavioral-model-integration-roadmap.md) explains how the identity corpus, question corpus, shared behavioral model, and future product surfaces fit together.
