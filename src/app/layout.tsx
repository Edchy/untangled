import type { Metadata } from "next";
import { Crimson_Pro, Fira_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const crimsonProBody = Crimson_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const crimsonProDisplay = Crimson_Pro({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const firaSans = Fira_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Untangled",
  description:
    "AI is reshaping the world faster than most people can follow. Untangled takes the knot apart, one careful chapter at a time. Free, illustrated, no technical background needed.",
  metadataBase: new URL("https://untangled.se"),
  openGraph: {
    title: "Untangled",
    description:
      "AI is reshaping the world faster than most people can follow. Untangled takes the knot apart, one careful chapter at a time. Free, illustrated, no technical background needed.",
    url: "https://untangled.se",
    siteName: "Untangled",
    images: [{ url: "/un.png", width: 356, height: 388, alt: "Untangled" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Untangled",
    description:
      "AI is reshaping the world faster than most people can follow. Untangled takes the knot apart, one careful chapter at a time. Free, illustrated, no technical background needed.",
    images: ["/un.png"],
  },
  icons: {
    icon: [{ url: "/un-favicon.svg", type: "image/svg+xml", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonProBody.variable} ${crimsonProDisplay.variable} ${firaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </body>
    </html>
  );
}
