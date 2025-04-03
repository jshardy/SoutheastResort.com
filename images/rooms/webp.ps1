# Output folder
$webpDir = "webp"
if (!(Test-Path $webpDir)) {
    New-Item -ItemType Directory -Path $webpDir | Out-Null
}

# Process images
$files = Get-ChildItem -File -Include *.jpg, *.jpeg, *.png -Path . -Recurse

if ($files.Count -eq 0) {
    Write-Host "No images found in the current directory."
}
else {
    foreach ($file in $files) {
        $inputPath = $file.FullName
        $outputPath = Join-Path $webpDir ($file.BaseName + ".webp")

        Write-Host "Converting $($file.Name)..."
        magick "$inputPath" -resize 1920x -quality 80 "$outputPath"
    }

    Write-Host "`n✅ Conversion complete. Files saved in /webp."
}