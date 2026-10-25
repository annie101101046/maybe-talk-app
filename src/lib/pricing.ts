/**
 * Journey pricing.
 *
 * All three checkout links live in `GUMROAD_CHECKOUT_URLS`.
 * Swap that block together when the Gumroad account changes.
 * Leave a plan's `checkoutUrl` null only if it should fall back to mailto.
 */

/** The only checkout URLs in the app. Change these three together. */
export const GUMROAD_CHECKOUT_URLS = {
  singleTrimester: "https://chitchat61.gumroad.com/l/single-trimester",
  fullPregnancyPass: "https://chitchat61.gumroad.com/l/full-pregnancy-pass",
  giftEdition: "https://chitchat61.gumroad.com/l/gift-edition",
} as const

export type Bilingual = {
  zh: string
  en: string
}

export type PricingPlan = {
  id: string
  title: Bilingual
  subtitle: Bilingual
  /** Amount charged now, in US dollars. */
  priceUsd: number
  /** Struck-through regular price, when the plan is on early bird. */
  compareAtUsd?: number
  compareAtNote?: Bilingual
  priceNote?: Bilingual
  highlighted?: boolean
  badge?: Bilingual
  features: Bilingual[]
  cta: Bilingual
  /** Mailto subject, used only when `checkoutUrl` is null. */
  subject: string
  /** Gumroad (or later, another checkout) URL. Null falls back to mailto. */
  checkoutUrl: string | null
}

export const PRICING = {
  email: "hello@maybeshedliketotalk.org",
  currencyNote: { zh: "價格以美金計", en: "Prices in USD" } satisfies Bilingual,
  freeWeeksNote: { zh: "第 1–4 週免費", en: "Weeks 1–4 are free" } satisfies Bilingual,
  /** Live free weeks on the static site. Same-tab link from every free-weeks mention. */
  freeWeeksUrl: "https://www.maybeshedliketotalk.org/free",
  checkoutNote: {
    zh: "用信用卡或 PayPal，在 Gumroad 付款。買完就能下載 PDF。",
    en: "Pay by card or PayPal on Gumroad. The PDF downloads right after you pay.",
  } satisfies Bilingual,
  notMedicalAdvice: {
    zh: "這不是醫療建議，也不能取代產檢。身體的事問醫師或助產師。",
    en: "Not medical advice, and not a substitute for prenatal care. For your body, ask a doctor or midwife.",
  } satisfies Bilingual,
  plans: [
    {
      id: "single-trimester",
      title: { zh: "單一孕期", en: "Single Trimester" },
      subtitle: {
        zh: "三份 PDF 選一份。孕到一半再買也行。",
        en: "Choose one of three PDFs. Fine if you join mid-pregnancy.",
      },
      priceUsd: 15,
      features: [
        {
          zh: "三份 PDF 選一份：第 1–12、13–27 或 28–40 週",
          en: "Choose one PDF: weeks 1–12, 13–27, or 28–40",
        },
        {
          zh: "中文和英文寫在同一份",
          en: "Chinese and English in the same PDF",
        },
        {
          zh: "買完立刻下載",
          en: "Instant download",
        },
      ],
      cta: { zh: "現在加入", en: "Join now" },
      subject: "Single Trimester US$15 / 單一孕期 US$15",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.singleTrimester,
    },
    {
      id: "full-pass",
      title: { zh: "全孕期通行證", en: "Full Pregnancy Pass" },
      subtitle: {
        zh: "40 週全在一份 PDF，大約 270 頁。中文和英文寫在一起。",
        en: "All 40 weeks in one PDF, about 270 pages. Chinese and English together.",
      },
      priceUsd: 29,
      compareAtUsd: 39,
      priceNote: { zh: "早鳥價", en: "Early bird" },
      highlighted: true,
      badge: { zh: "最受歡迎", en: "Most popular" },
      features: [
        {
          zh: "40 週全在一份 PDF，大約 270 頁",
          en: "All 40 weeks in one PDF, about 270 pages",
        },
        {
          zh: "中文和英文寫在同一份",
          en: "Chinese and English in the same PDF",
        },
        {
          zh: "一次買完",
          en: "One-time purchase",
        },
        {
          zh: "買完立刻下載",
          en: "Instant download",
        },
      ],
      cta: { zh: "現在加入", en: "Join now" },
      subject: "Full Pregnancy Pass US$29 / 全孕期通行證 US$29",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.fullPregnancyPass,
    },
    {
      id: "gift-edition",
      title: { zh: "送禮版", en: "Gift Edition" },
      subtitle: {
        zh: "全孕期通行證的 PDF，再加一份可列印的心意卡。送給伴侶、家人或朋友。",
        en: "The Full Pregnancy Pass PDF, plus a printable gift card. For a partner, family, or a friend.",
      },
      priceUsd: 45,
      features: [
        {
          zh: "含全孕期通行證那份 PDF",
          en: "Includes the Full Pregnancy Pass PDF",
        },
        {
          zh: "再加一份可列印的心意卡 PDF",
          en: "Plus a printable gift card PDF",
        },
        {
          zh: "買完立刻下載",
          en: "Instant download",
        },
      ],
      cta: { zh: "送給她", en: "Send as a gift" },
      subject: "Gift Edition US$45 / 送禮版 US$45",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.giftEdition,
    },
  ] as PricingPlan[],
}

export function formatUsd(amount: number) {
  return `US$${amount}`
}

/** Mailto fallback, unless the plan already has a checkout URL. */
export function planPurchaseHref(plan: PricingPlan): string {
  if (plan.checkoutUrl) return plan.checkoutUrl
  return `mailto:${PRICING.email}?subject=${encodeURIComponent(plan.subject)}`
}
