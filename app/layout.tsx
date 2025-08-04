import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "React Native SVG to SVG Converter",
  description: "Convert React Native SVG components to standard SVG format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <Script
          src="https://analytics.ricardopbarbosa.com/nao-bloqueies-por-favor"
          data-website-id="cc11fc0e-8bd4-4396-9ed5-ed92072821cd"
          defer
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
