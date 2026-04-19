$ErrorActionPreference = 'Stop'

$migrationScript = Join-Path $PSScriptRoot '..\DistroKid.Database\migrate.ps1'

if (-not (Test-Path $migrationScript)) {
    throw "Migration script not found at $migrationScript"
}

Write-Host 'Applying pending Entity Framework migrations...' -ForegroundColor Cyan
& $migrationScript -update

if ($LASTEXITCODE -ne 0) {
    throw 'Migration update failed.'
}

Write-Host 'Database migrations applied successfully.' -ForegroundColor Green