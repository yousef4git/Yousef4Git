#!/usr/bin/env bash
# Regenerates web-ready derivatives in public/media/ from Certificates/ sources.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="Certificates"
OUT="public/media"
mkdir -p "$OUT" public/cv

# Hero video: native portrait 1080x1920 H.264 CRF 21 (~3MB, spec budget <=3-4MB).
# The 720p CRF 26 cut looked blurry stretched across desktop. Source is silent.
ffmpeg -y -i "$SRC/Apple Academy/me presinting.mov" \
  -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -an \
  -movflags +faststart "$OUT/apple-presenting.mp4"
# Phones get a 720p cut (about 650KB) through a <source media> on the hero video.
ffmpeg -y -i "$SRC/Apple Academy/me presinting.mov" \
  -vf "scale=720:-2" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -an \
  -movflags +faststart "$OUT/apple-presenting-720.mp4"
# Poster: 720-wide from the video; keep it under ~80KB, it is the LCP image.
ffmpeg -y -i "$OUT/apple-presenting.mp4" -ss 00:00:01 -frames:v 1 \
  -vf "scale=720:-2" -q:v 5 -huffman optimal "$OUT/apple-presenting-poster.jpg"

# Stage photos: max 1600px on the long side.
sips -Z 1600 "$SRC/SDA Agentic AI Bootcamp/me presinging.jpeg" \
  --out "$OUT/photo-sda-presenting.jpg" >/dev/null
# The Shaguf source is a composite: two photos on a gray matte. Crop bands
# (pixel coords measured from the 900x1600 composite) instead of shipping it.
ffmpeg -y -i "$SRC/Shaguf/honoring me and me talking as the speaker on a shaguf event as the best instructor.jpeg" \
  -vf "crop=892:490:4:304" -q:v 3 "$OUT/photo-teaching-stage.jpg"
ffmpeg -y -i "$SRC/Shaguf/honoring me and me talking as the speaker on a shaguf event as the best instructor.jpeg" \
  -vf "crop=892:477:4:820" -q:v 3 "$OUT/photo-teaching-audience.jpg"

# Certificate PDFs -> PNG (first page, 200dpi). pdftoppm appends -1 to the prefix.
render() { pdftoppm -png -r 200 -f 1 -l 1 "$1" "$OUT/tmp" && mv "$OUT"/tmp*.png "$2"; }
render "$SRC/SDA Agentic AI Bootcamp/SDA Agentic AI Bootcamp Certificate.pdf" "$OUT/cert-sda.png"
# Apple: the scan carries a national ID number on both the English and the
# Arabic line, so the two boxes are painted out before the crop and the JPG.
render "$SRC/Apple Academy/APPLE DEVOLOPER ACADEMY.pdf"                        "$OUT/cert-apple-raw.png"
ffmpeg -y -i "$OUT/cert-apple-raw.png" \
  -vf "drawbox=x=280:y=835:w=500:h=65:color=white@1:t=fill,drawbox=x=1670:y=835:w=480:h=70:color=white@1:t=fill,crop=2339:1560:0:50,scale=1600:-2" \
  -q:v 3 "$OUT/cert-apple.jpg" && rm "$OUT/cert-apple-raw.png"
render "$SRC/KAUST/KAUST.pdf"                                                 "$OUT/cert-kaust.png"
render "$SRC/KAUST/Coursera 1.pdf"                                            "$OUT/cert-coursera-1.png"
render "$SRC/KAUST/Coursera 2.pdf"                                            "$OUT/cert-coursera-2.png"
render "$SRC/SDAIA /شهادة اجتياز_1772585415820.pdf"                            "$OUT/cert-sdaia.png"

# Badges and logo used as-is.
cp "$SRC/CDMP /CDMP badge.png"                              "$OUT/cert-cdmp-badge.png"
cp "$SRC/mckinsey/mckinsey-org-forward-program badge.png"   "$OUT/cert-mckinsey-badge.png"
cp "$SRC/noon-logo.png"                                     "$OUT/noon-logo.png"

# The served CV is public/cv/Yousef-Alshuwayi-AI-Engineer.pdf, a copy of the
# generator's output: run `node cv/build.mjs --role=ai_engineer` and copy
# cv/output/Yousef-Alshuwayi-AI-Engineer.pdf there after every content change.
# The Noon chapter images are copied as supplied into public/media/noon/ (the
# training photo resized to 2000px wide, the AI Week artwork to 1200px wide).

ls -lh "$OUT" public/cv
