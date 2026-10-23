import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

/* ─────────────────────────────────────────
   Font Loading
   ───────────────────────────────────────── */
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-noto",
  display: "swap",
  preload: false, // CJK font — skip preload to avoid large payload
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

/* ─────────────────────────────────────────
   Metadata
   ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "也許妳想找人聊一聊 | Maybe She'd Like to Talk",
    template: "%s | 也許妳想找人聊一聊",
  },
  description:
    "為孕期媽咪設計的 40 週旅程。每週一則情緒引導，加上冥想與呼吸練習。現在可以買，內容每週寄到信箱。A 40-week pregnancy journey for expecting mothers — a weekly emotional guide and meditation practices. Buy now. New content is emailed each week.",
  keywords: [
    "孕期",
    "孕婦",
    "心靈陪伴",
    "冥想",
    "呼吸練習",
    "pregnancy wellness",
    "prenatal",
    "mindfulness",
    "也許妳想找人聊一聊",
    "Maybe She'd Like to Talk",
  ],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: "en_US",
    title: "也許妳想找人聊一聊 | Maybe She'd Like to Talk",
    description:
      "40 週孕期旅程。每週情緒引導、冥想與呼吸練習。現在可以買，內容每週寄到信箱。",
    siteName: "也許妳想找人聊一聊",
  },
  twitter: {
    card: "summary_large_image",
    title: "也許妳想找人聊一聊 | Maybe She'd Like to Talk",
    description:
      "40 週孕期旅程。每週情緒引導、冥想與呼吸練習。現在可以買，內容每週寄到信箱。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF5F0",
  width: "device-width",
  initialScale: 1,
};

/* ─────────────────────────────────────────
   Root Layout
   ───────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSansTC.variable} ${quicksand.variable}`}
    >
      <body
        className="antialiased"
        style={{
          fontFamily:
            "var(--font-noto), var(--font-quicksand), 'Noto Sans TC', Quicksand, sans-serif",
        }}
      >
        <Header />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
