# VM-551 Remediation Audit-Input Authority

Verification date: 2026-08-01
Verification result: PASS

## CECOS governing authority

- Repository: `C:\dev\Commander_Questions_Corpus`
- Candidate commit: `947bf45bf6a191839b5fb4fa6c65980ed9d5737e`
- Required source path: `docs/standards/cecos/CECOS-v1.0.0-draft.4.md`
- Git blob: `59e8000e940dc137e15437252e5a28d7164d5046`
- Git object size: `394769` bytes
- Required SHA-256: `dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3`
- Observed SHA-256: `dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3`

The candidate was proven to be a commit, and the file was proven to be a blob reachable at the exact candidate. The checksum was computed over the exact bytes emitted by `git show`, without using a working-tree copy or text-mode pipeline.

## Exact verification commands

```powershell
git -C C:\dev\Commander_Questions_Corpus -c safe.directory=C:/dev/Commander_Questions_Corpus rev-parse 947bf45bf6a191839b5fb4fa6c65980ed9d5737e^{commit}
git -C C:\dev\Commander_Questions_Corpus -c safe.directory=C:/dev/Commander_Questions_Corpus cat-file -t 947bf45bf6a191839b5fb4fa6c65980ed9d5737e
git -C C:\dev\Commander_Questions_Corpus -c safe.directory=C:/dev/Commander_Questions_Corpus rev-parse 947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md
git -C C:\dev\Commander_Questions_Corpus -c safe.directory=C:/dev/Commander_Questions_Corpus cat-file -t 947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md
git -C C:\dev\Commander_Questions_Corpus -c safe.directory=C:/dev/Commander_Questions_Corpus cat-file -s 947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md
git -C C:\dev\Commander_Questions_Corpus -c safe.directory=C:/dev/Commander_Questions_Corpus show 947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md
```

Exact-byte checksum operation:

```text
spawn git show 947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md with binary stdout; compute SHA-256 over that stdout buffer
```

## Authority boundary

Only this exact Git object governs the CECOS-dependent VM-551 remediation. No branch, repository working tree, older draft, newer draft, label, or repository default is substituted. CECOS governs evidence handling and downstream derivation boundaries; it does not itself define the Archscry model, identity semantics, scoring formula, questionnaire, or recommendations.

## Rejected authority

The rejected audit cited CECOS draft.2 from an external repository state. That authority is withdrawn for VM-551. Implementation-derived counts and runtime observations are not invalidated merely because their earlier methodological framing named the wrong CECOS draft; each major conclusion is reclassified separately in the remediation record.
