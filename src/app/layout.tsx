import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Risqi Achmad Fahreal - Software Engineer",
    template: "%s | Risqi Achmad Fahreal",
  },
  description:
    "Front-end developer & Computer Science student at Brawijaya University. Specializing in React, Next.js, and modern web technologies. Based in Malang, Indonesia.",
  keywords: [
    "Risqi Achmad Fahreal",
    "Farel",
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
  ],
  authors: [{ name: "Risqi Achmad Fahreal", url: "https://github.com/Xfhreall" }],
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
    title: "Risqi Achmad Fahreal - Software Engineer",
    description:
      "Front-end developer & Computer Science student at Brawijaya University. Specializing in React, Next.js, and modern web technologies.",
    siteName: "Risqi Achmad Fahreal Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Risqi Achmad Fahreal - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risqi Achmad Fahreal - Software Engineer",
    description:
      "Front-end developer & Computer Science student at Brawijaya University. Specializing in React, Next.js, and modern web technologies.",
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
        className={`${sora.className} antialiased pb-8 md:pb-0`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
