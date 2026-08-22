# VM-583 - Maze Mobile Search Control Gap

ID: VM-583
Title: Maze Mobile Search Control Gap
Status: Backlog
Type: Responsive layout repair
Area: Maze search controls
Priority: Medium
Created: 2026-08-22

## Source

Owner observation during VM-579 acceptance.

## Finding

On mobile Maze, a large unexplained vertical gap appears after `textarea#search-input` and before the Search controls.

## Required outcome

- Reproduce and measure the textarea, wrapper, row, and Search-control geometry at representative narrow widths.
- Correct the responsible grid/flex/min-height/gap rule rather than applying arbitrary negative spacing.
- Preserve textarea resizing, search actions, keyboard/focus behavior, Reading Finds, and desktop layout.

## Causality and ownership

The responsible surface is existing `assets/css/maze.css`/Maze route markup. Neither Maze CSS nor Maze runtime was changed by VM-579. This is a separate Maze responsive-layout follow-up.

## Not authorized by this intake

No implementation, search behavior change, parser/query change, broad Maze layout redesign, or VM-579 scope expansion.
