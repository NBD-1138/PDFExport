# PDF Export for Foundry VTT

This module adds an Export PDF button to character sheets. Clicking it fills the included 5e character sheet PDF template with actor data and downloads the finished PDF.

## Installation

### Local install
1. Copy this folder into your Foundry VTT `Data/modules/` directory.
2. Restart Foundry VTT.
3. Enable the module from the Configure Settings > Manage Modules screen.

### GitHub manifest install
For published releases, use this manifest URL:

`https://github.com/NBD-1138/PDFExport/releases/latest/download/module.json`

For direct development installs from the repo, use this raw manifest URL:
`https://raw.githubusercontent.com/NBD-1138/PDFExport/refs/heads/main/module.json`

Do not use the GitHub web page URL or any URL containing `/blob/` in the manifest field. Those URLs return HTML, not JSON.

Foundry reads `module.json` for installs and update checks. Keep `manifest.json` only as a mirror if you want it for your own workflow.

## Usage

Open any character sheet and click Export PDF in the sheet header. The module will fill the included 5e character sheet PDF template and download it.

## Notes

- The export fills the bundled form-fillable sheet client-side in the browser.
- The export is designed for a quick, dependency-free workflow.
- Update notices only appear when the remote `manifest` URL serves a higher `version` than the installed copy. Changing local files alone will not create an available update.
- GitHub's `archive/refs/heads/main.zip` source archive is not the same thing as a packaged module release.
