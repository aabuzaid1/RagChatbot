import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "صندوق مصعب خورما | المساعد الذكي",
  description:
    "مساعد ذكي لمعلومات منحة صندوق مصعب خورما - برنامج تنظيم وبناء قيادة الشباب - مؤسسة رواد التنمية",
  keywords: ["رواد التنمية", "صندوق مصعب خورما", "منحة", "تعليم", "شباب", "الأردن"],
  authors: [{ name: "Ruwwad Development" }],
};

export const viewport: Viewport = {
  themeColor: "#00AEEF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
