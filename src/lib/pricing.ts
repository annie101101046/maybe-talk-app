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

/** The only primary button label on the site. It opens the free weeks. */
export const FREE_TRIAL_CTA = { zh: "免費體驗", en: "Try it free" } satisfies Bilingual

/** Quiet text link on a plan card. Not a second primary button. */
export const PAY_ON_GUMROAD = { zh: "在 Gumroad 付款", en: "Pay on Gumroad" } satisfies Bilingual

export const FAQ = [
  {
    q: { zh: "孕到一半才加入，可以嗎？", en: "Can I join midway through pregnancy?" },
    a: {
      zh: "可以。買一個階段就好：第 1–12 週、第 13–27 週，或第 28–40 週。",
      en: "Yes. Buy one trimester: weeks 1–12, 13–27, or 28–40.",
    },
  },
  {
    q: { zh: "要怎麼付款？", en: "How do I pay?" },
    a: {
      zh: "信用卡或 PayPal，在 Gumroad。想先問一句，寫到 hello@maybeshedliketotalk.org。",
      en: "Card or PayPal, on Gumroad. To ask something first, write to hello@maybeshedliketotalk.org.",
    },
  },
]

export const PRICING = {
  email: "hello@maybeshedliketotalk.org",
  currencyNote: { zh: "價格以美金計", en: "Prices in USD" } satisfies Bilingual,
  freeWeeksNote: { zh: "前 4 週免費", en: "The first 4 weeks are free" } satisfies Bilingual,
  /** Live free weeks on the static site. Same-tab link from every free-weeks mention. */
  freeWeeksUrl: "https://www.maybeshedliketotalk.org/free",
  /** Members area on the static site. License keys are entered there. */
  membersUrl: "https://www.maybeshedliketotalk.org/members",
  membersLinkLabel: { zh: "會員頁", en: "Members page" } satisfies Bilingual,
  notMedicalAdvice: {
    zh: "這不是醫療建議，也不能取代產檢。身體的事問醫師或助產師。",
    en: "Not medical advice, and not a substitute for prenatal care. For your body, ask a doctor or midwife.",
  } satisfies Bilingual,
  plans: [
    {
      id: "single-trimester",
      title: { zh: "單一孕期", en: "Single Trimester" },
      subtitle: {
        zh: "選一段就好：第 1–12 週、第 13–27 週，或第 28–40 週。",
        en: "Pick one stretch: weeks 1–12, 13–27, or 28–40.",
      },
      priceUsd: 15,
      features: [],
      cta: PAY_ON_GUMROAD,
      subject: "Single Trimester US$15 / 單一孕期 US$15",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.singleTrimester,
    },
    {
      id: "full-pass",
      title: { zh: "全孕期通行證", en: "Full Pregnancy Pass" },
      subtitle: {
        zh: "從第 1 週陪到第 40 週。",
        en: "From week 1 through week 40.",
      },
      priceUsd: 29,
      compareAtUsd: 39,
      priceNote: { zh: "早鳥價", en: "Early bird" },
      highlighted: true,
      features: [],
      cta: PAY_ON_GUMROAD,
      subject: "Full Pregnancy Pass US$29 / 全孕期通行證 US$29",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.fullPregnancyPass,
    },
    {
      id: "gift-edition",
      title: { zh: "送禮版", en: "Gift Edition" },
      subtitle: {
        zh: "把全孕期通行證當禮物。授權碼轉給她，再附一張可列印的心意卡。",
        en: "The Full Pass as a gift. Forward her the license key, and a printable gift card.",
      },
      priceUsd: 45,
      features: [],
      cta: PAY_ON_GUMROAD,
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
