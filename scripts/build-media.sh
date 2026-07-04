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
# Poster: 720-wide from the video; keep it under ~80KB, it is the LCP image.
ffmpeg -y -i "$OUT/apple-presenting.mp4" -ss 00:00:01 -frames:v 1 \
  -vf "scale=720:-2" -q:v 5 -huffman optimal "$OUT/apple-presenting-poster.jpg"

# Stage photos: max 1600px on the long side.
sips -Z 1600 "$SRC/SDA Agentic AI Bootcamp/me presinging.jpeg" \
  --out "$OUT/photo-sda-presenting.jpg" >/dev/null
# The Shaguf source is a composite: two photos on a gray matte. Crop bands
# (pixel coords measured from the 900x1600 composite) instead of shipping it.
ffmpeg -y -i "$SRC/Shaguf/honoring me and me talking as the speaker on a shaguf event as the best instructor.jpeg" \
  -vf "crop=892:490:4:304" -q:v 3 "$OUT/photo-shaguf-stage.jpg"
ffmpeg -y -i "$SRC/Shaguf/honoring me and me talking as the speaker on a shaguf event as the best instructor.jpeg" \
  -vf "crop=892:477:4:820" -q:v 3 "$OUT/photo-shaguf-audience.jpg"

# Certificate PDFs -> PNG (first page, 200dpi). pdftoppm appends -1 to the prefix.
render() { pdftoppm -png -r 200 -f 1 -l 1 "$1" "$OUT/tmp" && mv "$OUT"/tmp*.png "$2"; }
render "$SRC/SDA Agentic AI Bootcamp/SDA Agentic AI Bootcamp Certificate.pdf" "$OUT/cert-sda.png"
render "$SRC/Apple Academy/APPLE DEVOLOPER ACADEMY.pdf"                        "$OUT/cert-apple.png"
render "$SRC/KAUST/KAUST.pdf"                                                 "$OUT/cert-kaust.png"
render "$SRC/KAUST/Coursera 1.pdf"                                            "$OUT/cert-coursera-1.png"
render "$SRC/KAUST/Coursera 2.pdf"                                            "$OUT/cert-coursera-2.png"
render "$SRC/SDAIA /شهادة اجتياز_1772585415820.pdf"                            "$OUT/cert-sdaia.png"

# Badges and logo used as-is.
cp "$SRC/CDMP /CDMP badge.png"                              "$OUT/cert-cdmp-badge.png"
cp "$SRC/mckinsey/mckinsey-org-forward-program badge.png"   "$OUT/cert-mckinsey-badge.png"
cp "$SRC/noon-logo.png"                                     "$OUT/noon-logo.png"

# Public CV download (the general AI Engineer CV from the cv suite).
cp "cv/output/Yousef-Alshuwayi-AI-Engineer.pdf" "public/cv/Yousef-Alshuwayi-AI-Engineer.pdf"

ls -lh "$OUT" public/cv
