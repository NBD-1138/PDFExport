param(
  [string]$Repository = "NBD-1138/PDFExport"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceManifestPath = Join-Path $root "module.json"
$sourceManifest = Get-Content -Raw $sourceManifestPath | ConvertFrom-Json

$version = $sourceManifest.version
$packageId = $sourceManifest.id
$releaseBaseUrl = "https://github.com/$Repository/releases"
$releaseManifestUrl = "$releaseBaseUrl/latest/download/module.json"
$releaseDownloadUrl = "$releaseBaseUrl/download/$version/module.zip"

$distPath = Join-Path $root "dist"
$stageRootPath = Join-Path $distPath "_stage"
$stagePackagePath = Join-Path $stageRootPath $packageId

if (Test-Path $distPath) {
  Remove-Item $distPath -Recurse -Force
}

New-Item -ItemType Directory -Path $distPath | Out-Null
New-Item -ItemType Directory -Path $stagePackagePath -Force | Out-Null

$packageEntries = @(
  "module.json",
  "manifest.json",
  "README.md",
  "scripts",
  "styles",
  "DnD_5E_CharacterSheet - Form Fillable.pdf"
)

foreach ($entry in $packageEntries) {
  $sourcePath = Join-Path $root $entry
  if (Test-Path $sourcePath) {
    Copy-Item -LiteralPath $sourcePath -Destination $stagePackagePath -Recurse -Force
  }
}

$releaseManifest = Get-Content -Raw $sourceManifestPath | ConvertFrom-Json
$releaseManifest.manifest = $releaseManifestUrl
$releaseManifest.download = $releaseDownloadUrl

$releaseManifestJson = $releaseManifest | ConvertTo-Json -Depth 10
$releaseManifestPath = Join-Path $distPath "module.json"
$releaseMirrorPath = Join-Path $distPath "manifest.json"

[System.IO.File]::WriteAllText($releaseManifestPath, "$releaseManifestJson`n")
[System.IO.File]::WriteAllText($releaseMirrorPath, "$releaseManifestJson`n")
[System.IO.File]::WriteAllText((Join-Path $stagePackagePath "module.json"), "$releaseManifestJson`n")
[System.IO.File]::WriteAllText((Join-Path $stagePackagePath "manifest.json"), "$releaseManifestJson`n")

$zipPath = Join-Path $distPath "module.zip"
Compress-Archive -Path $stagePackagePath -DestinationPath $zipPath -CompressionLevel Optimal
Remove-Item $stageRootPath -Recurse -Force

Write-Host "Built release assets:"
Write-Host "  $releaseManifestPath"
Write-Host "  $releaseMirrorPath"
Write-Host "  $zipPath"
