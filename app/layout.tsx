import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import MetaNav from "@/components/meta-nav";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import "./colors.css";
import "./globals.css";

import { Inter, Raleway, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: {
    default: "IEEE SCT Student Branch",
    template: "%s | IEEE SCT SB",
  },
  description: "Official website of IEEE Student Branch, SCT College of Engineering (SB Code: 32041). Fostering technical innovation and professional growth.",
  keywords: ["IEEE", "SCTCE", "Student Branch", "Engineering", "Technology", "Events", "Trivandrum", "Kerala"],
  authors: [{ name: "IEEE SCT SB Web Team" }],
  metadataBase: new URL("https://ieeesctsb.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieeesctsb.org",
    siteName: "IEEE SCT SB",
    title: "IEEE SCT Student Branch",
    description: "Official website of IEEE Student Branch, SCT College of Engineering.",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists or use a valid path
        width: 1200,
        height: 630,
        alt: "IEEE SCT SB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE SCT Student Branch",
    description: "Fostering technical innovation and professional growth at SCT College of Engineering.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${raleway.variable} ${poppins.variable} font-sans antialiased`}>
        <Providers>
          <MetaNav />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
