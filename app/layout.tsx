import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DebugBar from "@/components/debug-bar";
import ApiDebug from "@/components/api-debug";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered E-commerce",
  description:
    "Shop with the power of AI recommendations and image classification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
        <DebugBar />
        <ApiDebug />
      </body>
    </html>
  );
}
