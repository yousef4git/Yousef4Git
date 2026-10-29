import "../globals.css";
import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { buildMetadata } from "@/lib/metadata";
import { body, display, mono } from "./fonts";

export const metadata: Metadata = buildMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell locale="en" fontClass={`${display.variable} ${body.variable} ${mono.variable}`}>
      {children}
    </RootShell>
  );
}
