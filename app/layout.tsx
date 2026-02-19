import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://zawyehtet-portfolio.vercel.app";

export const metadata: Metadata = {
  // ── Core ──
  title: {
    default: "Zaw Ye Htet (Simon) | Full-Stack Software Engineer",
    template: "%s | Zaw Ye Htet",
  },
  description:
    "Zaw Ye Htet (zawyehtet) — Full-Stack Software Engineer based in Bangkok, Thailand. Specializing in React, Next.js, Node.js, TypeScript, Supabase, and scalable SaaS architecture. Worked at FRONTIIR (Myanmar Net).",
  keywords: [
    "zawyehtet",
    "Zaw Ye Htet",
    "zaw ye htet portfolio",
    "zawyehtet developer",
    "zawyehtet software engineer",
    "zaw ye htet simon",
    "Full-Stack Developer",
    "Full-Stack Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Supabase",
    "FRONTIIR",
    "Myanmar Net",
    "Bangkok developer",
    "Thailand developer",
    "SaaS developer",
    "web developer portfolio",
  ],
  authors: [{ name: "Zaw Ye Htet", url: SITE_URL }],
  creator: "Zaw Ye Htet",
  publisher: "Zaw Ye Htet",

  // ── Canonical & Alternates ──
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, Discord, etc.) ──
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Zaw Ye Htet — Portfolio",
    title: "Zaw Ye Htet (Simon) | Full-Stack Software Engineer",
    description:
      "Zaw Ye Htet (zawyehtet) — Full-Stack Software Engineer specializing in React, Next.js, Node.js, and scalable SaaS architecture. Based in Bangkok, Thailand.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zaw Ye Htet — Full-Stack Software Engineer Portfolio",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    title: "Zaw Ye Htet (Simon) | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in React, Next.js, Node.js, and scalable SaaS architecture. Open to opportunities.",
    images: ["/og-image.png"],
    creator: "@zawyehtet",
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification (add your real IDs when you register) ──
  verification: {
    google: "Zt7PAgXrtIAcen0OkMAq83E9jOGpxcsTnIPFuxwGp7U",
    // yandex: "YOUR_YANDEX_ID",
    // bing: "YOUR_BING_WEBMASTER_ID",
  },

  // ── Other ──
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zaw Ye Htet",
              alternateName: ["zawyehtet", "Simon", "Zaw Ye Htet Simon"],
              url: SITE_URL,
              image: `${SITE_URL}/og-image.png`,
              jobTitle: "Full-Stack Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "FRONTIIR (Myanmar Net)",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangkok",
                addressCountry: "TH",
              },
              email: "zawyehtet1004@gmail.com",
              sameAs: [
                "https://github.com/Zaw-Ye-Htet12",
                "https://www.linkedin.com/in/zawyehtet/",
                SITE_URL,
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Supabase",
                "PostgreSQL",
                "Tailwind CSS",
                "Framer Motion",
                "NestJS",
                "ExpressJS",
                "MySQL",
                "Docker",
                "AWS",
                "Full-Stack Development",
                "Frontend Development",
                "Backend Development",
                "SaaS Architecture",
              ],
              description:
                "Full-Stack Software Engineer specializing in React, Next.js, Node.js, and scalable SaaS architecture.",
            }),
          }}
        />
        {/* ── Website Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Zaw Ye Htet Portfolio",
              alternateName: "zawyehtet",
              url: SITE_URL,
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased font-sans bg-black text-white selection:bg-white selection:text-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
