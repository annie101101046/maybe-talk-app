import type { Metadata } from "next"
import type { Locale } from "@/lib/locale"

/** Marketing site this app duplicates. Homepage canonical points here. */
export const MAIN_SITE_URL = "https://www.maybeshedliketotalk.org/"

/** This app. Unique routes (login, signup) canonicalize to themselves. */
export const APP_ORIGIN = "https://maybe-talk-app.vercel.app"

const OG_IMAGE = "https://www.maybeshedliketotalk.org/og-image.png"

export function appUrl(path: string) {
  return `${APP_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageMetadata(options: {
  locale: Locale
  title: string
  description: string
  canonical: string
  languages?: Record<string, string>
  index?: boolean
}): Metadata {
  const { locale, title, description, canonical, languages, index = true } = options
  const imageAlt = locale === "zh" ? "也許妳想找人聊一聊" : "Maybe She'd Like to Talk"
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      locale: locale === "zh" ? "zh_TW" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_TW"],
      siteName: imageAlt,
      images: [{ url: OG_IMAGE, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}
