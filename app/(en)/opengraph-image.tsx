import { ImageResponse } from "next/og";
import { siteContent } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteContent.meta.og.alt;

// The English social card. Its Arabic twin is public/og-ar.png, a static
// render with the Arabic fonts (see lib/metadata.ts).
export default function OgImage() {
  const { og } = siteContent.meta;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#161311",
          color: "#EFE9DE",
        }}
      >
        <div style={{ width: 120, height: 4, background: "#C9A96E", marginBottom: 40 }} />
        <div style={{ fontSize: 76, fontWeight: 600, color: "#C9A96E" }}>{siteContent.name}</div>
        {/* Same hierarchy as the hero: the broad scope, then what the work
            is, then where to find it. The employer is a fact on the page,
            not the headline of the card. */}
        <div style={{ fontSize: 34, marginTop: 20, letterSpacing: 4 }}>{og.line2}</div>
        <div style={{ fontSize: 30, marginTop: 14, color: "#A39B8B" }}>{og.line3}</div>
        <div style={{ fontSize: 24, marginTop: 28, color: "#A39B8B" }}>{og.line4}</div>
      </div>
    ),
    size
  );
}
