import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yousef Alshuwayi · AI Systems Engineer",
  description: "AI Systems Engineer at noon. I build production AI systems and web products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
