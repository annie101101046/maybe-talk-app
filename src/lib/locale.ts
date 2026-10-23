export type Locale = "zh" | "en"

export const LOCALE_COOKIE = "locale"
export const LOCALE_STORAGE_KEY = "locale"
export const LOCALE_MAX_AGE = 60 * 60 * 24 * 365

export function parseLocale(value: string | null | undefined): Locale | null {
  if (value === "zh" || value === "en") return value
  return null
}

/** First language tag only. `zh`, `zh-TW`, `zh-Hant` → Chinese. Anything else → English. */
export function localeFromLanguageTag(tag: string | null | undefined): Locale {
  if (!tag) return "en"
  const primary = tag.trim().split(";")[0]?.trim().replace(/_/g, "-") ?? ""
  return primary.toLowerCase().startsWith("zh") ? "zh" : "en"
}

/** First entry of an Accept-Language header, not the highest q value later in the list. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return "en"
  const first = header.split(",")[0] ?? ""
  return localeFromLanguageTag(first)
}

export function pick(locale: Locale, zh: string, en: string): string
export function pick(locale: Locale, text: { zh: string; en: string }): string
export function pick(
  locale: Locale,
  zhOrText: string | { zh: string; en: string },
  en?: string,
): string {
  if (typeof zhOrText === "string") return locale === "zh" ? zhOrText : (en ?? zhOrText)
  return locale === "zh" ? zhOrText.zh : zhOrText.en
}

export function htmlLang(locale: Locale): "zh-TW" | "en" {
  return locale === "zh" ? "zh-TW" : "en"
}

export function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_MAX_AGE}; SameSite=Lax`
}

export function readLocaleCookie(): Locale | null {
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
  return parseLocale(match?.[1] ? decodeURIComponent(match[1]) : null)
}
