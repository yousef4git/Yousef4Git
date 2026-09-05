import { ImageResponse } from "next/og";
import { siteContent } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Yousef Alshuwayi · AI Systems Engineer · Forward Deployed";

export default function OgImage() {
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
        <div style={{ fontSize: 76, fontWeight: 600, color: "#C9A96E" }}>Yousef Alshuwayi</div>
        {/* Same split as the hero: the title is what noon gave, the second
            line is how the work gets done. Never merged into one claim. */}
        <div style={{ fontSize: 34, marginTop: 20, letterSpacing: 4 }}>AI SYSTEMS ENGINEER AT NOON</div>
        <div style={{ fontSize: 34, marginTop: 10, letterSpacing: 4, color: "#A39B8B" }}>
          I WORK FORWARD DEPLOYED
        </div>
        <div style={{ fontSize: 24, marginTop: 28, color: "#A39B8B" }}>
          {`Embed · scope · ship · hand over · ${siteContent.host}`}
        </div>
      </div>
    ),
    size
  );
}
