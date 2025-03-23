import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import ApiDebug from "@/components/api-debug";
import ApiSchemaViewer from "@/components/api-schema-viewer";
import ApiStatus from "@/components/api-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Shop - E-commerce với trí tuệ nhân tạo",
  description:
    "Ứng dụng e-commerce tích hợp AI giúp bạn tìm kiếm và mua sắm sản phẩm một cách thông minh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">{children}</div>
            <div className="fixed bottom-4 left-4 z-50">
              <ApiStatus />
            </div>
            <Footer />
          </div>
          <ApiDebug />
          <ApiSchemaViewer />
        </ThemeProvider>
      </body>
    </html>
  );
}
