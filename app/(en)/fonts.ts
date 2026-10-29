import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

// The English faces, bound to the theme's slots (app/globals.css).
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display-face",
});
export const body = Inter({ subsets: ["latin"], variable: "--font-body-face" });
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono-face",
});
