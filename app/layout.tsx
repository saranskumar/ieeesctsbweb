"use client";

import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./colors.css";
import "./globals.css";
import { useState } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <title>IEEE SB SCTCE</title>
        <meta name="description" content="IEEE Student Branch SCTCE Website" />
      </head>
      <body className={`${inter.variable} ${raleway.variable} ${poppins.variable} font-sans antialiased`}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
