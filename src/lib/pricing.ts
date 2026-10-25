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
  /** Members area on the static site. License keys are entered there. */
  membersUrl: "https://www.maybeshedliketotalk.org/members",
  membersLinkLabel: { zh: "會員頁", en: "Members page" } satisfies Bilingual,
  includesNote: {
    zh: "都有會員頁、每週心情紀錄、三次一對一 Google Meet，另附可列印 PDF。",
    en: "Every plan includes the Members page, a weekly mood log, 3 one-on-one Google Meet chats, and a bonus printable PDF.",
  } satisfies Bilingual,
  checkoutNote: {
    zh: "Gumroad 付完，授權碼寄到信箱。到會員頁輸入。",
    en: "Pay on Gumroad. The license key comes by email. Enter it on the Members page.",
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
        zh: "三個孕期選一個。",
        en: "Pick one trimester.",
      },
      priceUsd: 15,
      features: [
        {
          zh: "第 1–12、13–27 或 28–40 週",
          en: "Weeks 1–12, 13–27, or 28–40",
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
        zh: "40 週都開通。",
        en: "All 40 weeks.",
      },
      priceUsd: 29,
      compareAtUsd: 39,
      priceNote: { zh: "早鳥價", en: "Early bird" },
      highlighted: true,
      badge: { zh: "最受歡迎", en: "Most popular" },
      features: [
        {
          zh: "第 1–40 週",
          en: "Weeks 1–40",
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
        zh: "全孕期通行證，當禮物送。",
        en: "The Full Pass, as a gift.",
      },
      priceUsd: 45,
      features: [
        {
          zh: "把授權碼轉給她",
          en: "Forward the license key",
        },
        {
          zh: "附可列印心意卡",
          en: "A printable gift card",
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
