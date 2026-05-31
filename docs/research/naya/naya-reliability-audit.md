# Naya Reliability Audit

Status: VM-181 reliability audit. Naya remains non-live.

## Audit Result

The pre-VM-181 Naya folder contained unmanaged seed material only. The seed files are preserved under `source-material/` and are no longer root packet authority.

## High-Risk Findings

1. `source-material/naya-lore-source-packet.unmanaged-vm161-seed.md` uses packet-shaped language and stale VM-161/canonical labels. VM-181 rejects those labels as evidence.
2. `source-material/naya_deep-research-report.generated-seed.md` contains citation-token and encoding drift. It is discovery material only.
3. The seed packet attempts to classify sources as absolute authority before VM-181 could inspect each claim. Those classifications are downgraded unless a VM-181 row promotes them.
4. Seed wording around Progenitus, Cylian/Nacatl politics, Mayael, Jazal, Gahiji, Conflux outcomes, and detailed social structure is too strong for the inspected official Naya design floor.
5. Commander/operator rows are useful for query and play-pattern phrasing, but several rows require later card/color validation before any raw JSON use.
6. Jund has current source-packet/docs work in the repo, but it is not proof that Naya is live, completed, or runtime-ready.

## No Source Laundering Rule

Existing Naya seed files may not cite themselves, VM-161 labels, prior generated text, copied packet wording, dossier paragraphs, or architecture prose as evidence. Every claim must resolve to an approved source row, a support-only row, a Vox Mana synthesis label, or `Manual fill required`.

Architecture docs and dossiers cannot become circular evidence for raw claims. Future raw-faction work must trace raw claims back to VM-181 evidence/source rows, not to packet prose.

## Encoding And Copy Hygiene

Approved VM-181 files should have no mojibake, replacement characters, smart-quote drift from copied seed text, or unintended non-ASCII. The quarantined seed files may retain original defects for audit visibility.

## Overclaim Warnings

- Do not infer detailed social structure, religion, named-location politics, or creature-culture hierarchy from general Naya themes.
- Do not turn "lush jungle," "big creatures," "tokens," or "RGW Commander" into Naya canon.
- Do not treat Cabaretti, Selesnya-with-red, Gruul-with-white, Bant-with-red, or Jund-style consumption as Naya equivalents.
- Do not treat Gahiji as Nayan or Alara-native without direct evidence.
- Do not promote Progenitus theology, Coil worship, or worldsoul language without direct evidence.

## Review Gate

VM-181 is complete only when the approved source packet exists, seed files are quarantined, claims are bound or marked manual fill, and no architecture/raw/runtime files are created.
