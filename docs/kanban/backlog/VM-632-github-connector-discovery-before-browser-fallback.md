# VM-632 — GitHub Connector Discovery Before Browser Fallback

ID: VM-632
Title: GitHub Connector Discovery Before Browser Fallback
Status: Backlog
Type: Development governance / execution tooling
Area: GitHub delivery and agent tool discovery
Priority: High
Created: 2026-09-05

## Summary

Make GitHub-capable work discover and use the authenticated GitHub connector before falling back to browser authentication when `gh` is unavailable.

## Source

During the Owner-authorized VM-631 integration, Git push succeeded through Git Credential Manager but `gh` was absent. The agent opened a logged-out browser and requested manual authentication before discovering that the session already exposed an authenticated GitHub connector with repository administration access and pull-request create/status/merge operations.

## Acceptance Criteria

- [ ] GitHub delivery guidance requires agents to search the available and deferred tool inventory for an authenticated GitHub connector before using browser authentication.
- [ ] PR creation, status/check inspection, and merge prefer the authenticated connector when it supports the required operation.
- [ ] Existing Git/GCM-backed GitHub API access is retained as the next fallback when connector support is unavailable or insufficient.
- [ ] Browser authentication is requested only after connector and existing non-browser integration paths are genuinely unavailable.
- [ ] The workflow does not expose credential values, install `gh`, modify authentication configuration, or log the user out.
- [ ] A lightweight deterministic check or equivalent enforceable instruction covers the connector-before-browser ordering.

## Scope Boundary

This is a bounded agent-workflow and tool-discovery correction. It does not change product code, GitHub repository permissions, credentials, installed software, plugin architecture, or VM-631's accepted reporting contract.

## Notes

The VM-631 integration completed through the authenticated connector. This card preserves only the prospective execution-path correction.
