import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Yousef Alshuwayi · AI Systems Engineer at noon";

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
        <div style={{ fontSize: 34, marginTop: 20, letterSpacing: 4 }}>AI SYSTEMS ENGINEER AT NOON</div>
        <div style={{ fontSize: 24, marginTop: 28, color: "#A39B8B" }}>
          I build production AI systems and web products · yousefalshuwayi.online
        </div>
      </div>
    ),
    size
  );
}
