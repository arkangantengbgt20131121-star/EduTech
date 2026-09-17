import type { Metadata, Viewport } from "next";

// Self-hosted variable fonts: no network request at build time and instant
// first paint for students on slow connections.
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "EduTech — Learn. Create. Build the Future.",
    template: "%s · EduTech",
  },
  description:
    "EduTech is an interactive learning platform for students aged 10–18: robotics with Micro:bit, Python and web coding, design with Figma, plus science, maths, history and languages.",
  keywords: [
    "EduTech",
    "learn coding for kids",
    "Micro:bit simulator",
    "Python for students",
    "Figma lessons",
    "interactive learning platform",
  ],
  authors: [{ name: "EduTech" }],
  openGraph: {
    title: "EduTech — Learn. Create. Build the Future.",
    description:
      "Interactive lessons, a real coding playground and a Micro:bit simulator. Built for students who want to make things.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
