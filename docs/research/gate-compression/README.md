# Gate Compression Research And Live Source

VM-384 promotes the compressed WUBRG-first Gate to the default Archscry quick-reading Gate.

Editable live source of truth:

- `data/placement/gate-compression.source.json`

Generated output only:

- `data/placement-model.json`

The source owns Gate question text, answer text, `color_loadings`, neutral answers, special-channel markers, and Gate metadata. It must not contain generated `likelihoods`, generated `suppresses`, generated score evidence, preview-transform fields, or runtime override fields. The builder is the only layer that converts source fields into generated placement scoring fields.

## Reports

- Live bias report: `docs/audits/gate-compression/live-gate-bias.md`
- Live bias JSON: `docs/audits/gate-compression/live-gate-bias.json`
- Simulator comparison: `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
- Simulator comparison JSON: `docs/audits/gate-compression/wubrg-first-gate-comparison.json`

## Commands

- `npm.cmd run build:factions`
- `npm.cmd run test:gate-live-bias`
- `npm.cmd run test:gate-compression`
- `npm.cmd run test:placement`

## Archive

The VM-382 research-only source fixture is archived at:

- `docs/research/gate-compression/archive/wubrg-first-gate.vm382-research-source.json`

The VM-383 preview flag and runtime transformer were retired by VM-384. The default `archscry/` route now reads the generated placement model directly.
