# Bulk Uploads Helper

Static website for generating the player upload CSV format.

## How to use

1. Upload this folder to a GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Set source to the branch/folder where `index.html` is located.
4. Open the GitHub Pages URL.

No build step is needed. The site is plain HTML/CSS/JavaScript.

## Output rules

- CSV columns:
  `playerId, brandId, playerAlias, inPlayBetDelay, disableCO, riskCategory, betFactor, playerNote, playerNotePriority, Resolved, disableBoost`
- More than 98 accounts creates a ZIP with multiple CSV files.
- Each CSV inside the ZIP has a maximum of 98 players.
- Category to `betFactor` mapping:
  - Core: `1.01`
  - Unclass: `1.00`
  - Review: `0.5`
  - Wise: `0.1`
  - Sharp: `0.01`
  - Latency: `0.01`
  - PVIP: `1.50`
