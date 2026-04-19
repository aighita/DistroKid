param(
    [string]$name,
    
    [switch]$update
)

# Colors for output
$successColor = 'Green'
$errorColor = 'Red'
$infoColor = 'Cyan'

if (-not $name -and -not $update) {
    Write-Host "Provide -name to create a migration or use -update to apply pending migrations." -ForegroundColor $errorColor
    exit 1
}

if ($name) {
    Write-Host "Creating migration: $name" -ForegroundColor $infoColor

    $migrationCmd = @(
        'dotnet', 'ef', 'migrations', 'add', $name,
        '--context', 'WebAppDatabaseContext',
        '--startup-project', '..\DistroKid.Api'
    )

    & $migrationCmd[0] $migrationCmd[1..($migrationCmd.Length-1)]

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Migration creation failed!" -ForegroundColor $errorColor
        exit 1
    }

    Write-Host "Migration created successfully!" -ForegroundColor $successColor
}

# Apply the migration if --update flag is provided
if ($update) {
    Write-Host "`nApplying migration to database..." -ForegroundColor $infoColor
    
    $updateCmd = @(
        'dotnet', 'ef', 'database', 'update',
        '--context', 'WebAppDatabaseContext',
        '--startup-project', '..\DistroKid.Api'
    )
    
    & $updateCmd[0] $updateCmd[1..($updateCmd.Length-1)]
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Migration update failed!" -ForegroundColor $errorColor
        exit 1
    }
    
    Write-Host "Migration applied successfully!" -ForegroundColor $successColor
}
else {
    Write-Host "`nTo apply this migration, run: .\migrate.ps1 -update" -ForegroundColor $infoColor
}
