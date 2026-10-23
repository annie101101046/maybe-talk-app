/**
 * Journey pricing. Buy buttons are mailto pre-orders until checkout exists.
 * Set a plan's `checkoutUrl` to send that button to a checkout page instead.
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
  /**
   * Mailto subject. Both languages, so a pre-order is recognizable in the inbox.
   * Example: "Pre-order: Full Pregnancy Pass US$29 / 預購：全孕期通行證 US$29"
   */
  subject: string
  /**
   * Checkout URL. Null keeps the buy button as a mailto to `PRICING.email`.
   * Swap in a path such as "/checkout?plan=full-pass" when payments return.
   */
  checkoutUrl: string | null
}

export const PRICING = {
  email: "hello@maybeshedliketotalk.org",
  currencyNote: { zh: "價格以美金計", en: "Prices in USD" } satisfies Bilingual,
  freeWeeksNote: { zh: "第 1–4 週免費", en: "Weeks 1–4 are free" } satisfies Bilingual,
  cta: { zh: "來信預購", en: "Pre-order" } satisfies Bilingual,
  plans: [
    {
      id: "single-trimester",
      title: { zh: "單一孕期", en: "Single Trimester" },
      subtitle: { zh: "孕期中途加入", en: "Join mid-pregnancy" },
      priceUsd: 15,
      priceNote: { zh: "任選一個孕期", en: "Choose one trimester" },
      features: [
        {
          zh: "第 1–12、13–27 或 28–40 週，任選其一",
          en: "Weeks 1–12, 13–27, or 28–40 — choose one",
        },
        {
          zh: "適合孕期中途才開始的人",
          en: "For people joining mid-pregnancy",
        },
        {
          zh: "該孕期的情緒引導，以及呼吸與冥想音頻",
          en: "Emotional guide plus breathing and meditation audio for that trimester",
        },
      ],
      subject: "Pre-order: Single Trimester US$15 / 預購：單一孕期 US$15",
      checkoutUrl: null,
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
          zh: "全部 40 週的情緒引導",
          en: "All 40 weeks of the emotional guide",
        },
        {
          zh: "呼吸與冥想音頻",
          en: "Breathing and meditation audio",
        },
        {
          zh: "每週釋出",
          en: "Released weekly",
        },
        {
          zh: "終身使用",
          en: "Lifetime access",
        },
      ],
      subject: "Pre-order: Full Pregnancy Pass US$29 / 預購：全孕期通行證 US$29",
      checkoutUrl: null,
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
          zh: "再加一張數位心意卡",
          en: "Plus a digital gift card",
        },
        {
          zh: "送給伴侶、家人或朋友",
          en: "For a partner, family, or friends",
        },
      ],
      subject: "Pre-order: Gift Edition US$45 / 預購：送禮版 US$45",
      checkoutUrl: null,
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
