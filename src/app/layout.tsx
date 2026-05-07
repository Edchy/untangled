import type { Metadata } from "next";
import { Cormorant_Garamond, Fira_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
    icon: [{ url: "/un.svg", type: "image/svg+xml", sizes: "any" }],
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
      className={`${firaSans.variable} ${cormorant.variable} h-full antialiased`}
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
