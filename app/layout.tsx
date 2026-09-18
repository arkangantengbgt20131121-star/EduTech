import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { EduTechProvider, ToastHost } from "@/lib/store";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "EduTech — Learn. Create. Build the Future.",
  description:
    "Interactive lessons in robotics, coding, design, math, science and more. Earn XP, build projects and join weekly challenges.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <EduTechProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastHost />
          </EduTechProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
