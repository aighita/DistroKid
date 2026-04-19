$ErrorActionPreference = 'Stop'

$fixturesProject = Join-Path $PSScriptRoot '..\DistroKid.Fixtures\DistroKid.Fixtures.csproj'

if (-not (Test-Path $fixturesProject)) {
    throw "Fixtures project not found at $fixturesProject"
}

Write-Host 'Applying fixtures...' -ForegroundColor Cyan
dotnet run --project $fixturesProject

if ($LASTEXITCODE -ne 0) {
    throw 'Fixtures execution failed.'
}

Write-Host 'Fixtures applied successfully.' -ForegroundColor Green