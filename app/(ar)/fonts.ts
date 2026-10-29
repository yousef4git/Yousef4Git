import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Noto_Naskh_Arabic } from "next/font/google";

// The Arabic faces: a Naskh for display, in the role Cormorant plays in
// English, and a Plex sans for body text. Both carry Latin glyphs for the
// credential names and tool names that stay in English. Mono stays Latin.
export const display = Noto_Naskh_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-face",
});
export const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-face",
});
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono-face",
});
