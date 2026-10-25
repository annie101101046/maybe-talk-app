import type { Metadata } from "next"
import { getLocale } from "@/lib/locale-server"
import { appUrl, pageMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const zh = locale === "zh"
  const canonical = appUrl("/auth/login")
  return pageMetadata({
    locale,
    title: zh ? "登入｜也許妳想找人聊一聊" : "Log in | Maybe She'd Like to Talk",
    description: zh
      ? "登入，回到妳的頁面。"
      : "Log in to Maybe She'd Like to Talk and get back to your page.",
    canonical,
    languages: {
      "zh-Hant": `${canonical}?lang=zh`,
      en: `${canonical}?lang=en`,
      "x-default": canonical,
    },
  })
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
