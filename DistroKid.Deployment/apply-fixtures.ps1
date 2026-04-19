$ErrorActionPreference = 'Stop'

$fixturesProject = Join-Path $PSScriptRoot '..\DistroKid.Fixtures\DistroKid.Fixtures.csproj'
$fixturesDirectory = Split-Path $fixturesProject -Parent

if (-not (Test-Path $fixturesProject)) {
    throw "Fixtures project not found at $fixturesProject"
}

Write-Host 'Applying fixtures...' -ForegroundColor Cyan

Push-Location $fixturesDirectory

try {
    dotnet run --project $fixturesProject
}
finally {
    Pop-Location
}

if ($LASTEXITCODE -ne 0) {
    throw 'Fixtures execution failed.'
}

Write-Host 'Fixtures applied successfully.' -ForegroundColor Green