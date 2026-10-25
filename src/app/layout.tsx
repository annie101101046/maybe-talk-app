import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import LocaleProvider from "@/components/LocaleProvider";
import SiteFooter from "@/components/SiteFooter";
import { htmlLang } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

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
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const zh = locale === "zh";
  const title = zh ? "也許妳想找人聊一聊" : "Maybe She'd Like to Talk";
  const description = zh
    ? "40 週孕期 PDF，中英對照。買完就能從 Gumroad 下載。第 1–4 週免費。"
    : "A 40-week pregnancy PDF, in Chinese and English. Download it from Gumroad right after you pay. Weeks 1–4 are free.";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
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
      locale: zh ? "zh_TW" : "en_US",
      alternateLocale: zh ? "en_US" : "zh_TW",
      title,
      description,
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFF5F0",
  width: "device-width",
  initialScale: 1,
};

/* ─────────────────────────────────────────
   Root Layout
   ───────────────────────────────────────── */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={htmlLang(locale)}
      data-locale={locale}
      className={`${notoSansTC.variable} ${quicksand.variable}`}
    >
      <body
        className="antialiased"
        style={{
          fontFamily:
            "var(--font-noto), var(--font-quicksand), 'Noto Sans TC', Quicksand, sans-serif",
        }}
      >
        <LocaleProvider initialLocale={locale}>
          <Header />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
