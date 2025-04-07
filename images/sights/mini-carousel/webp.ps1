Get-ChildItem -Recurse -Include *.jpg, *.jpeg, *.png | ForEach-Object {
    magick $_.FullName -resize 1980 -quality 80 ("webp\" + $_.BaseName + ".webp")


}
