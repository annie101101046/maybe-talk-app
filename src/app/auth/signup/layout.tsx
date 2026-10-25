import type { Metadata } from "next"
import { getLocale } from "@/lib/locale-server"
import { appUrl, pageMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const zh = locale === "zh"
  const canonical = appUrl("/auth/signup")
  return pageMetadata({
    locale,
    title: zh ? "註冊｜也許妳想找人聊一聊" : "Sign up | Maybe She'd Like to Talk",
    description: zh
      ? "先留下妳的名字吧。第 1 到 4 週可以先看。"
      : "Leave your name. Weeks 1–4 are there for you to read.",
    canonical,
    languages: {
      "zh-Hant": `${canonical}?lang=zh`,
      en: `${canonical}?lang=en`,
      "x-default": canonical,
    },
  })
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children
}
