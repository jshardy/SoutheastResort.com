Get-ChildItem -Recurse -Include *.jpg,*.jpeg,*.png | ForEach-Object {
    magick $_.FullName -quality 80 ("webp\" + $_.BaseName + ".webp")

}
