# PDF Export for Foundry VTT

This module adds an Export PDF button to character sheets. Clicking it opens a printable view of the current sheet so you can save it as a PDF from the browser print dialog.

## Installation

### Local install
1. Copy this folder into your Foundry VTT `Data/modules/` directory.
2. Restart Foundry VTT.
3. Enable the module from the Configure Settings > Manage Modules screen.

### GitHub manifest install
Use this manifest URL when installing from GitHub:
`https://raw.githubusercontent.com/NBD-1138/PDFExport/main/module.json`

## Usage

Open any character sheet and click Export PDF in the sheet header.

## Notes

- The export uses the browser print workflow, so the final file will be created from the browser's Save as PDF option.
- The export is designed for a quick, dependency-free workflow.
