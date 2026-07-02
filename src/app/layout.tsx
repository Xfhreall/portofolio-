import type { Metadata } from "next";
import { Sora, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ViewportOverlay } from "@/components/viewport-overlay";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: {
    default: "Risqi Achmad Fahreal - Fullstack Developer",
    template: "%s | Risqi Achmad Fahreal",
  },
  description:
    "Fullstack developer specializing in frontend development & Computer Science student at Brawijaya University. Specializing in React, Next.js, and modern web technologies. Based in Malang, Indonesia.",
  keywords: [
    "Risqi Achmad Fahreal",
    "Farel",
    "Fullstack Developer",
    "Software Engineer",
    "Front-end Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Brawijaya University",
    "Malang",
    "Indonesia",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Porto",
    "Mobile developer",
    "Riski Ahmad Fahreal",
    "Riski Ahmad Fahrel",
    "Riski Ahmad Farel",
  ],
  authors: [
    { name: "Risqi Achmad Fahreal", url: "https://github.com/Xfhreall" },
  ],
  creator: "Risqi Achmad Fahreal",
  publisher: "Risqi Achmad Fahreal",
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
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    title: "Risqi Achmad Fahreal - Fullstack Developer",
    description:
      "Fullstack developer specializing in frontend development & Computer Science student at Brawijaya University. Specializing in React, Next.js, and modern web technologies.",
    siteName: "Risqi Achmad Fahreal Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Risqi Achmad Fahreal - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risqi Achmad Fahreal - Fullstack Developer",
    description:
      "Fullstack developer specializing in frontend development & Computer Science student at Brawijaya University. Specializing in React, Next.js, and modern web technologies.",
    images: ["/og-image.png"],
    creator: "@ursnctuary_",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.className} ${bricolage.variable} antialiased pb-8 md:pb-0`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
            <ViewportOverlay />
            {children}
          </SmoothScroll>
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
