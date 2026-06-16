$files = @(
    "src/routes/contact.tsx",
    "src/routes/mobile-view/contact.tsx",
    "src/routes/visa.tsx",
    "src/routes/passport.tsx",
    "src/routes/countries.$code.tsx",
    "src/routes/index.tsx",
    "src/routes/about.tsx",
    "src/routes/services.tsx",
    "src/routes/mobile-view/about.tsx",
    "src/routes/mobile-view/services.tsx",
    "src/routes/mobile-view/visa.tsx",
    "src/routes/mobile-view/passport.tsx"
)

$baseDir = "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main"
$emDash = [char]0x2014
$ellipsis = [char]0x2026
$middleDot = [char]0x00B7
$rightArrow = [char]0x2192

foreach ($file in $files) {
    $filePath = Join-Path $baseDir $file
    if (Test-Path $filePath) {
        Write-Host "Processing $file..."
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Replace the garbled characters (these are UTF-8 bytes that got double-encoded)
        # The garbled sequence: â€" = bytes E2 80 93 in UTF-8 (which is — em-dash)
        $content = $content -replace "â€"â€"", $emDash
        $content = $content -replace "â€"â€"", $emDash
        $content = $content -replace "â€"", $emDash
        $content = $content -replace " â€" ", " $emDash "
        
        # Replace other garbled chars
        $content = $content -replace " â€¦", $ellipsis
        $content = $content -replace " Â· ", " $middleDot "
        $content = $content -replace " â†'", $rightArrow
        
        Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed $file"
    }
}

Write-Host "Done!"
