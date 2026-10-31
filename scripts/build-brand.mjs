// Derives every brand asset from the signature logo in brand/yos-logo-source.png
// (gold script on black, 1024x1024). Run with: node scripts/build-brand.mjs
//
// Produces:
//   public/media/yos-signature.png   transparent cutout, used on both social cards
//   public/media/yos-signature-ui.png the same with a slightly heavier stroke,
//                                    for the nav and footer where it renders
//                                    about 44px wide (components/Mark.tsx)
//   app/icon.png, app/favicon.ico    night tile with a gold hairline, like the
//                                    previous mark's tile
//   app/apple-icon.png               night square, iOS rounds it itself
//   public/og-ar.png                 the Arabic social card with the signature
//                                    composited into its empty half; the text
//                                    half comes from brand/og-ar-text.png, the
//                                    card as it was rendered with Arabic fonts
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "brand/yos-logo-source.png";
const GOLD = { r: 0xf0, g: 0xb0, b: 0x43 }; // the logo's own amber, measured
const NIGHT = { r: 0x10, g: 0x0e, b: 0x0b };
const HAIRLINE = "rgba(201,169,110,0.45)";

// 1. Cut the signature out of its black ground. The file has no alpha, so the
//    strongest channel becomes coverage and every covered pixel takes the flat
//    gold; antialiased edges come out right because they were gold blended
//    with black in the first place.
async function cutout() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  const FLOOR = 14, PEAK = 238;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let i = 0, p = 0; i < width * height; i++, p += channels) {
    const m = Math.max(data[p], data[p + 1], data[p + 2]);
    const a = Math.max(0, Math.min(255, Math.round(((m - FLOOR) / (PEAK - FLOOR)) * 255)));
    out[i * 4] = GOLD.r; out[i * 4 + 1] = GOLD.g; out[i * 4 + 2] = GOLD.b; out[i * 4 + 3] = a;
    if (a > 8) {
      const x = i % width, y = (i / width) | 0;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  const pad = 12;
  const left = Math.max(0, minX - pad), top = Math.max(0, minY - pad);
  const w = Math.min(width, maxX + pad + 1) - left, h = Math.min(height, maxY + pad + 1) - top;
  const png = await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: w, height: h })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile("public/media/yos-signature.png", png);
  return { png, w, h };
}

// The signature's stroke is about 8 source pixels. Below roughly two rendered
// pixels it fades to nothing, so for small tiles the coverage is dilated at
// source resolution (the mark stamped around a ring of offsets) until the
// stroke holds that width after the downscale.
const SMALL_STROKE = 2.1;
async function bolden(sig, sigW, target = sigW < 20 ? 1.5 : SMALL_STROKE) {
  // 16px keeps a little shape with a lighter target.
  const d = Math.round(((target * sig.w) / sigW - 8) / 2);
  if (d < 1) return sig.png;
  const { w, h } = sig;
  const stamps = [[0, 0]];
  for (const r of [d, d / 2]) {
    for (let k = 0; k < 16; k++) {
      const t = (k / 16) * Math.PI * 2;
      stamps.push([Math.round(r * Math.cos(t)), Math.round(r * Math.sin(t))]);
    }
  }
  return sharp({ create: { width: w + 2 * d, height: h + 2 * d, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(stamps.map(([dx, dy]) => ({ input: sig.png, left: d + dx, top: d + dy })))
    .png()
    .toBuffer()
    .then((b) => sharp(b).extract({ left: d, top: d, width: w, height: h }).png().toBuffer());
}

// A square tile with the signature centred at `fill` of the tile's width.
async function tile(size, sig, { fill, radius, hairline, out }) {
  const sigW = Math.round(size * fill);
  const sigH = Math.round((sigW * sig.h) / sig.w);
  let mark = await sharp(await bolden(sig, sigW)).resize(sigW, sigH, { kernel: "lanczos3" }).png().toBuffer();
  if (size < 64) {
    // Downscaling averages the stroke with its transparent surround, which
    // dims the gold; push the coverage back up so the tile reads bright.
    const alpha = await sharp(mark).ensureAlpha().extractChannel(3).linear(2.2, 0).raw().toBuffer();
    mark = await sharp({ create: { width: sigW, height: sigH, channels: 3, background: GOLD } })
      .joinChannel(alpha, { raw: { width: sigW, height: sigH, channels: 1 } })
      .png()
      .toBuffer();
  }
  const stroke = hairline ? Math.max(1, Math.round(size / 48)) : 0;
  const inset = stroke / 2;
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect x="${inset}" y="${inset}" width="${size - stroke}" height="${size - stroke}" rx="${radius}"
        fill="rgb(${NIGHT.r},${NIGHT.g},${NIGHT.b})"${hairline ? ` stroke="${HAIRLINE}" stroke-width="${stroke}"` : ""}/>
    </svg>`
  );
  const png = await sharp(bg)
    .composite([{ input: mark, left: Math.round((size - sigW) / 2), top: Math.round((size - sigH) / 2) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  if (out) await writeFile(out, png);
  return png;
}

// ICO container holding PNG-encoded images, which every current browser reads.
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = header.length + dir.length;
  pngs.forEach(({ size, png }, i) => {
    const e = i * 16;
    dir[e] = size >= 256 ? 0 : size; dir[e + 1] = size >= 256 ? 0 : size;
    dir[e + 2] = 0; dir[e + 3] = 0;
    dir.writeUInt16LE(1, e + 4); dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(png.length, e + 8); dir.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.png)]);
}

async function main() {
  const sig = await cutout();
  console.log(`signature ${sig.w}x${sig.h}`);
  await writeFile("public/media/yos-signature-ui.png", await bolden(sig, 44, 1.5));

  // Browser icons. The tile radius scales like the old 64-unit icon's rx=15.
  const icon = (size) => tile(size, sig, { fill: 0.86, radius: size * (15 / 64), hairline: true });
  await writeFile("app/icon.png", await icon(256));
  await writeFile("app/favicon.ico", ico(await Promise.all([16, 32, 48].map(async (s) => ({ size: s, png: await icon(s) })))));

  // iOS home screen: square, no border, the system applies the mask.
  await tile(180, sig, { fill: 0.8, radius: 0, hairline: false, out: "app/apple-icon.png" });

  // Arabic social card: the rendered text half keeps its layout; the
  // signature takes the empty left half, centred on the text block.
  const sigW = 400, sigH = Math.round((sigW * sig.h) / sig.w);
  const mark = await sharp(sig.png).resize(sigW, sigH).png().toBuffer();
  await sharp("brand/og-ar-text.png")
    .composite([{ input: mark, left: 112, top: Math.round(312 - sigH / 2) }])
    .png({ compressionLevel: 9 })
    .toFile("public/og-ar.png");
  console.log("done");
}

main().catch((e) => { console.error(e); process.exit(1); });
