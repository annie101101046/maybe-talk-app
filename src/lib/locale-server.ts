import { cookies, headers } from "next/headers"
import { LOCALE_COOKIE, localeFromAcceptLanguage, parseLocale, type Locale } from "@/lib/locale"

/**
 * Manual choice (cookie) wins. Otherwise the first Accept-Language entry,
 * which browsers send from navigator.languages[0].
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const chosen = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value)
  if (chosen) return chosen
  return localeFromAcceptLanguage((await headers()).get("accept-language"))
}
