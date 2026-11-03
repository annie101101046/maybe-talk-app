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
      zh: "可以的。妳可以只買一個階段，第 1 到 12 週、第 13 到 27 週，或第 28 到 40 週都可以。",
      en: "Yes. You can buy just one stage: weeks 1–12, weeks 13–27, or weeks 28–40.",
    },
  },
  {
    q: { zh: "要怎麼付款？", en: "How do I pay?" },
    a: {
      zh: "我們透過 Gumroad 收費。如有問題請聯繫我們：hello@maybeshedliketotalk.org",
      en: "We charge through Gumroad. If you have any questions, please contact us at hello@maybeshedliketotalk.org.",
    },
  },
]

export const PRICING = {
  email: "hello@maybeshedliketotalk.org",
  currencyNote: { zh: "以下價格都以美金計算。", en: "Prices below are in US dollars." } satisfies Bilingual,
  freeWeeksNote: { zh: "前 4 週免費", en: "The first 4 weeks are free" } satisfies Bilingual,
  /** Live free weeks on the static site. Same-tab link from every free-weeks mention. */
  freeWeeksUrl: "https://www.maybeshedliketotalk.org/free",
  /** Members area on the static site. License keys are entered there. */
  membersUrl: "https://www.maybeshedliketotalk.org/members",
  membersLinkLabel: { zh: "會員頁", en: "Members page" } satisfies Bilingual,
  notMedicalAdvice: {
    zh: "這不是醫療建議，也不能取代產檢。身體上的事，請問醫師或助產師。",
    en: "This isn't medical advice, and it doesn't replace prenatal care. For anything about your body, ask a doctor or midwife.",
  } satisfies Bilingual,
  plans: [
    {
      id: "single-trimester",
      title: { zh: "單一孕期", en: "Single Trimester" },
      subtitle: {
        zh: "挑一段就好，可以是第 1 到 12 週、第 13 到 27 週，或第 28 到 40 週。",
        en: "Choose one part: weeks 1–12, weeks 13–27, or weeks 28–40.",
      },
      priceUsd: 25,
      features: [
        {
          zh: "這一階段的週頁，一週一頁。",
          en: "The weekly pages for this stage, one page a week.",
        },
      ],
      cta: PAY_ON_GUMROAD,
      subject: "Single Trimester US$25 / 單一孕期 US$25",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.singleTrimester,
    },
    {
      id: "full-pass",
      title: { zh: "全孕期通行證", en: "Full Pregnancy Pass" },
      subtitle: {
        zh: "從第 1 週陪妳走到第 40 週。",
        en: "We stay with you from week 1 through week 40.",
      },
      priceUsd: 49,
      compareAtUsd: 69,
      priceNote: { zh: "早鳥價", en: "Early bird" },
      highlighted: true,
      features: [
        {
          zh: "第 1 週到第 40 週的週頁，一週一頁。",
          en: "Weekly pages from week 1 through week 40, one page a week.",
        },
      ],
      cta: PAY_ON_GUMROAD,
      subject: "Full Pregnancy Pass US$49 / 全孕期通行證 US$49",
      checkoutUrl: GUMROAD_CHECKOUT_URLS.fullPregnancyPass,
    },
    {
      id: "gift-edition",
      title: { zh: "送禮版", en: "Gift Edition" },
      subtitle: {
        zh: "把全孕期通行證當成一份禮物。授權碼轉給她，再附上一張可以列印的心意卡。",
        en: "Give the Full Pass as a gift. Pass the license key on to her, with a card she can print.",
      },
      priceUsd: 49,
      compareAtUsd: 69,
      features: [
        {
          zh: "週頁和全孕期通行證一樣，再附一張可以列印的心意卡。",
          en: "The same weekly pages as the Full Pass, plus a card she can print.",
        },
      ],
      cta: PAY_ON_GUMROAD,
      subject: "Gift Edition US$49 / 送禮版 US$49",
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
