import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteContent } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteContent.meta.og.alt;

// The English social card: the text on the left, the signature mark on the
// right. Its Arabic twin is public/og-ar.png, a static render with the Arabic
// fonts that scripts/build-brand.mjs composes the same way, mirrored.
export default async function OgImage() {
  const { og } = siteContent.meta;
  const signature = await readFile(join(process.cwd(), "public/media/yos-signature.png"));
  const src = `data:image/png;base64,${signature.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          background: "#161311",
          color: "#EFE9DE",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 620 }}>
          <div style={{ width: 120, height: 4, background: "#C9A96E", marginBottom: 40 }} />
          <div style={{ fontSize: 72, fontWeight: 600, color: "#C9A96E" }}>{siteContent.name}</div>
          {/* Same hierarchy as the hero: the broad scope, then what the work
              is, then where to find it. The employer is a fact on the page,
              not the headline of the card. */}
          <div style={{ fontSize: 28, marginTop: 20, letterSpacing: 3 }}>{og.line2}</div>
          <div style={{ fontSize: 27, marginTop: 14, color: "#A39B8B" }}>{og.line3}</div>
          <div style={{ fontSize: 24, marginTop: 28, color: "#A39B8B" }}>{og.line4}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={360} height={226} style={{ width: 360, height: 226 }} />
      </div>
    ),
    size
  );
}
