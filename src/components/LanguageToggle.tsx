"use client"

import { useLocale } from "@/components/LocaleProvider"
import type { Locale } from "@/lib/locale"

const OPTIONS: { id: Locale; label: string }[] = [
  { id: "zh", label: "中文" },
  { id: "en", label: "EN" },
]

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      role="group"
      aria-label={locale === "zh" ? "語言" : "Language"}
      className={`inline-flex items-center rounded-full p-0.5 ${className}`}
      style={{ background: "rgba(242,139,110,0.12)" }}
    >
      {OPTIONS.map((option) => {
        const active = locale === option.id
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              if (!active) setLocale(option.id)
            }}
            className="inline-flex items-center justify-center min-h-11 min-w-11 px-3 rounded-full text-xs font-bold transition-colors"
            style={{
              background: active ? "var(--coral)" : "transparent",
              color: active ? "#fff" : "var(--navy)",
              fontFamily: "var(--font-quicksand), sans-serif",
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
