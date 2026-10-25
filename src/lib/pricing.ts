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
    zh: "用信用卡或 PayPal，在 Gumroad 付款。每週的內容放在旅程裡。",
    en: "Pay by card or PayPal on Gumroad. Each week's content is in the journey.",
  } satisfies Bilingual,
  plans: [
    {
      id: "single-trimester",
      title: { zh: "單一孕期", en: "Single Trimester" },
      subtitle: {
        zh: "適合孕期中途才加入。選一段週數，跟著那一段走。",
        en: "For joining mid-pregnancy. Pick one set of weeks and follow that stretch.",
      },
      priceUsd: 15,
      features: [
        {
          zh: "自選第 1–12、13–27 或 28–40 週",
          en: "Choose weeks 1–12, 13–27, or 28–40",
        },
        {
          zh: "該段的每週情緒陪伴",
          en: "Weekly emotional guide for those weeks",
        },
        {
          zh: "該段的引導呼吸，和可以照著唸的冥想文字",
          en: "Guided breathing and read-aloud meditation text for those weeks",
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
        zh: "全部 40 週的情緒陪伴，加上引導呼吸，和可以照著唸的冥想文字。",
        en: "All 40 weeks of emotional guidance, plus guided breathing and read-aloud meditation text.",
      },
      priceUsd: 29,
      compareAtUsd: 39,
      priceNote: { zh: "早鳥價", en: "Early bird" },
      highlighted: true,
      badge: { zh: "最受歡迎", en: "Most popular" },
      features: [
        {
          zh: "全部 40 週的情緒陪伴",
          en: "All 40 weeks of emotional guidance",
        },
        {
          zh: "引導呼吸，和可以照著唸的冥想文字",
          en: "Guided breathing and read-aloud meditation text",
        },
        {
          zh: "每週釋出",
          en: "Released weekly",
        },
        {
          zh: "一次買斷，永久使用",
          en: "One-time purchase, lifetime access",
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
        zh: "全孕期通行證，再加一份數位禮卡。送給伴侶、家人或朋友。",
        en: "The Full Pregnancy Pass, plus a digital gift card. For a partner, family, or friend.",
      },
      priceUsd: 45,
      features: [
        {
          zh: "含完整的全孕期通行證",
          en: "Includes the Full Pregnancy Pass",
        },
        {
          zh: "加一份數位禮卡，可以轉贈",
          en: "Plus a digital gift card to pass on",
        },
        {
          zh: "送給伴侶、家人或朋友",
          en: "For a partner, family, or friend",
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

/** Mailto pre-order, unless the plan already has a checkout URL. */
export function planPurchaseHref(plan: PricingPlan): string {
  if (plan.checkoutUrl) return plan.checkoutUrl
  return `mailto:${PRICING.email}?subject=${encodeURIComponent(plan.subject)}`
}
