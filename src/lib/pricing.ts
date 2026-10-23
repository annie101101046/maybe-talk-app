/**
 * Journey pricing. Buy buttons use `checkoutUrl` (Gumroad).
 * Leave `checkoutUrl` null only if a plan should fall back to a mailto.
 */

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
  checkoutNote: {
    zh: "信用卡或 PayPal 都可以，在 Gumroad 結帳。內容每週寄到信箱。",
    en: "Pay by card or PayPal on Gumroad. Content is emailed weekly.",
  } satisfies Bilingual,
  plans: [
    {
      id: "single-trimester",
      title: { zh: "單一孕期", en: "Single Trimester" },
      subtitle: { zh: "孕到一半再加入也行", en: "Join mid-pregnancy" },
      priceUsd: 15,
      priceNote: { zh: "挑一個孕期", en: "Choose one trimester" },
      features: [
        {
          zh: "第 1–12、13–27、28–40 週，挑一個",
          en: "Weeks 1–12, 13–27, or 28–40 — choose one",
        },
        {
          zh: "給孕期走到一半才開始的人",
          en: "For people joining mid-pregnancy",
        },
        {
          zh: "這個孕期的情緒引導、呼吸跟冥想音檔",
          en: "Emotional guide plus breathing and meditation audio for that trimester",
        },
      ],
      cta: { zh: "立即購買", en: "Buy now" },
      subject: "Pre-order: Single Trimester US$15 / 預購：單一孕期 US$15",
      checkoutUrl: "https://kincode.gumroad.com/l/single-trimester",
    },
    {
      id: "full-pass",
      title: { zh: "全孕期通行證", en: "Full Pregnancy Pass" },
      subtitle: { zh: "四十週一次走完", en: "All 40 weeks" },
      priceUsd: 29,
      compareAtUsd: 39,
      compareAtNote: { zh: "原價", en: "Regular" },
      priceNote: { zh: "早鳥價", en: "Early bird" },
      highlighted: true,
      badge: { zh: "最受歡迎", en: "Most Popular" },
      features: [
        {
          zh: "四十週的情緒引導",
          en: "All 40 weeks of the emotional guide",
        },
        {
          zh: "呼吸跟冥想音檔",
          en: "Breathing and meditation audio",
        },
        {
          zh: "每週更新",
          en: "Released weekly",
        },
        {
          zh: "買了可以一直用",
          en: "Lifetime access",
        },
      ],
      cta: { zh: "立即購買", en: "Buy now" },
      subject: "Pre-order: Full Pregnancy Pass US$29 / 預購：全孕期通行證 US$29",
      checkoutUrl: "https://kincode.gumroad.com/l/full-pregnancy-pass",
    },
    {
      id: "gift-edition",
      title: { zh: "送禮版", en: "Gift Edition" },
      subtitle: { zh: "把這份旅程送出去", en: "Give the journey" },
      priceUsd: 45,
      priceNote: { zh: "含全孕期通行證", en: "Includes the Full Pass" },
      features: [
        {
          zh: "包含全孕期通行證",
          en: "Includes the Full Pregnancy Pass",
        },
        {
          zh: "再加一張電子心意卡",
          en: "Plus a digital gift card",
        },
        {
          zh: "送給伴侶、家人或朋友",
          en: "For a partner, family, or friends",
        },
      ],
      cta: { zh: "送給她", en: "Send as a gift" },
      subject: "Pre-order: Gift Edition US$45 / 預購：送禮版 US$45",
      checkoutUrl: "https://kincode.gumroad.com/l/gift-edition",
    },
  ] satisfies PricingPlan[],
}

export function formatUsd(amount: number) {
  return `US$${amount}`
}

/** Mailto pre-order, unless the plan already has a checkout URL. */
export function planPurchaseHref(plan: PricingPlan): string {
  if (plan.checkoutUrl) return plan.checkoutUrl
  return `mailto:${PRICING.email}?subject=${encodeURIComponent(plan.subject)}`
}
