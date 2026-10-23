"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  htmlLang,
  LOCALE_STORAGE_KEY,
  parseLocale,
  readLocaleCookie,
  writeLocaleCookie,
  type Locale,
} from "@/lib/locale"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = htmlLang(locale)
  document.documentElement.dataset.locale = locale
}

export default function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const restored = useRef(false)

  useEffect(() => {
    setLocaleState(initialLocale)
    applyDocumentLocale(initialLocale)
  }, [initialLocale])

  useEffect(() => {
    if (restored.current) return
    restored.current = true
    const stored = parseLocale(localStorage.getItem(LOCALE_STORAGE_KEY))
    if (!stored) return
    if (readLocaleCookie() !== stored) writeLocaleCookie(stored)
    if (stored !== initialLocale) {
      setLocaleState(stored)
      applyDocumentLocale(stored)
      router.refresh()
    }
  }, [initialLocale, router])

  const setLocale = useCallback(
    (next: Locale) => {
      writeLocaleCookie(next)
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
      setLocaleState(next)
      applyDocumentLocale(next)
      router.refresh()
    },
    [router],
  )

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used within LocaleProvider")
  return value
}
