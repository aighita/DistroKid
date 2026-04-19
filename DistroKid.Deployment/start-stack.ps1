param(
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

$swaggerUrl = 'http://localhost:5000/swagger'

Push-Location $PSScriptRoot

try {
    Write-Host 'Starting Docker stack with rebuild...' -ForegroundColor Cyan
    docker compose up --build -d

    if ($LASTEXITCODE -ne 0) {
        throw 'docker compose up failed.'
    }

    Write-Host "Stack started. API and Swagger will be available at $swaggerUrl" -ForegroundColor Green

    if (-not $NoBrowser) {
        $ready = $false

        for ($attempt = 0; $attempt -lt 30; $attempt++) {
            try {
                Invoke-WebRequest -Uri $swaggerUrl -UseBasicParsing | Out-Null
                $ready = $true
                break
            }
            catch {
                Start-Sleep -Seconds 2
            }
        }

        if ($ready) {
            Start-Process $swaggerUrl
        }
        else {
            Write-Host 'Swagger did not respond yet. Open the URL manually after the container finishes starting.' -ForegroundColor Yellow
        }
    }
}
finally {
    Pop-Location
}