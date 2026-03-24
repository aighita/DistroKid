# generate-api.ps1
# Regenerates the TypeScript fetch client from the live Swagger spec.
# Run this whenever the backend DTOs/endpoints change:
#   .\scripts\generate-api.ps1
#
# Prerequisites:
#   - .NET API running on http://localhost:5000
#   - Node.js / npx available

param(
    [string]$ApiUrl = "http://localhost:5000/swagger/v1/swagger.json",
    [string]$Output = "./src/infrastructure/apis/client"
)

$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

Write-Host "▶ Checking backend is reachable at $ApiUrl..." -ForegroundColor Cyan
try {
    $null = Invoke-WebRequest -Uri $ApiUrl -UseBasicParsing -TimeoutSec 5
    Write-Host "  ✓ Backend is up." -ForegroundColor Green
} catch {
    Write-Host "  ✗ Cannot reach $ApiUrl. Make sure the .NET API is running." -ForegroundColor Red
    exit 1
}

Write-Host "▶ Generating TypeScript client to $Output ..." -ForegroundColor Cyan
npx @openapitools/openapi-generator-cli generate `
    -i $ApiUrl `
    -g typescript-fetch `
    -o $Output `
    --additional-properties=supportsES6=true

if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Generation failed." -ForegroundColor Red
    exit 1
}

Write-Host "  ✓ Done. Client written to $Output" -ForegroundColor Green
