import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import IntroSplash, { introEnabled, introLogo, introScript } from "@/components/IntroSplash";
import { site } from "@/content/site";
import "./globals.css";
import "./intro.css";
import "./runway.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.siteUrl ?? "https://example.com"),
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: "/brand/emblem.png", apple: "/brand/emblem.png" },
};

/** Convert "#RRGGBB" to "r, g, b" for rgba() variants */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

const themeVars = {
  "--navy": site.theme.primary,
  "--navy-90": `rgba(${hexToRgb(site.theme.primary)}, 0.9)`,
  "--taupe": site.theme.secondary,
  "--taupe-overlay": `rgba(${hexToRgb(site.theme.secondary)}, 0.4)`,
  "--cream": site.theme.background,
  "--accent": site.theme.accent ?? site.theme.primary,
} as React.CSSProperties;

const intro = introEnabled(site);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={themeVars} suppressHydrationWarning>
      <head>
        {/* First-visit splash: decided before first paint (components/IntroSplash.tsx).
            It sets data-intro on <html>, hence suppressHydrationWarning above. */}
        {intro && <script dangerouslySetInnerHTML={{ __html: introScript(site) }} />}
        {intro && introLogo(site) && <link rel="preload" as="image" href={introLogo(site)} />}
        {/* Jost ≈ Futura, Montserrat ≈ Avenir LT Std (the original loads these same fallbacks) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css?family=Jost:300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Runway Real Estate type: Michroma (display, matches the wordmark), Montserrat (nav, eyebrows, data labels), Manrope (body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {intro && <IntroSplash content={site} />}
        <Analytics />
        {children}
      </body>
    </html>
  );
}
