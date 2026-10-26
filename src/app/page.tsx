import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FAQ, formatUsd, FREE_TRIAL_CTA, planPurchaseHref, PRICING } from "@/lib/pricing";
import { pick, type Locale } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import { MAIN_SITE_URL, pageMetadata } from "@/lib/seo";

/* ─────────────────────────────────────────
   Inline SVG: Geometric Blob Pregnant Woman
   (Headspace / Buck design style)
   ───────────────────────────────────────── */
function HeroIllustration({ locale }: { locale: Locale }) {
  const label =
    locale === "zh"
      ? "一位懷孕的人安靜地坐著，旁邊寫著 40 週"
      : "A pregnant person sitting quietly, with a note that says 40 weeks";
  return (
    <div className="relative flex items-center justify-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto select-none">
      {/* Background decorative blobs */}
      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label={label}
      >
        <title>{label}</title>
        {/* Outermost soft blob background */}
        <ellipse cx="240" cy="255" rx="210" ry="200" fill="#FFE8DF" opacity="0.6" />

        {/* Large coral blob (body/background shape) */}
        <path
          d="M240 60 C320 55, 390 110, 395 195 C400 280, 355 360, 270 390 C185 420, 100 380, 80 295 C60 210, 95 115, 165 80 C190 69, 210 61, 240 60Z"
          fill="#F28B6E"
          opacity="0.18"
          className="pulse-soft"
        />

        {/* Medium teal decorative blob — top right */}
        <circle cx="375" cy="105" r="55" fill="#5BBFB5" opacity="0.25" />
        <circle cx="390" cy="90" r="32" fill="#5BBFB5" opacity="0.35" />

        {/* Yellow accent dot cluster — bottom left */}
        <circle cx="90" cy="340" r="30" fill="#FFB627" opacity="0.3" />
        <circle cx="68" cy="320" r="16" fill="#FFB627" opacity="0.4" />

        {/* Pink accent — top left */}
        <circle cx="95" cy="130" r="24" fill="#F28BAE" opacity="0.4" />
        <circle cx="78" cy="150" r="14" fill="#F28BAE" opacity="0.3" />

        {/* ── Seated Meditating Pregnant Woman ── */}

        {/* Meditation cushion / ground */}
        <ellipse cx="240" cy="390" rx="105" ry="20" fill="#1E2A5E" opacity="0.12" />
        <ellipse cx="240" cy="382" rx="95" ry="16" fill="#F28BAE" opacity="0.55" />

        {/* Crossed legs — left leg */}
        <path
          d="M175 340 C160 355, 148 368, 152 378 C158 388, 195 385, 230 382"
          stroke="#1E2A5E"
          strokeWidth="0"
          fill="none"
        />
        <ellipse cx="178" cy="360" rx="42" ry="20" fill="#1E2A5E" opacity="0.85" transform="rotate(-15 178 360)" />

        {/* Crossed legs — right leg */}
        <ellipse cx="300" cy="360" rx="42" ry="20" fill="#1E2A5E" opacity="0.85" transform="rotate(15 300 360)" />

        {/* Feet tips */}
        <ellipse cx="152" cy="370" rx="16" ry="10" fill="#F28B6E" transform="rotate(-10 152 370)" />
        <ellipse cx="326" cy="368" rx="16" ry="10" fill="#F28B6E" transform="rotate(10 326 368)" />

        {/* Body / torso — navy rounded rectangle */}
        <rect x="196" y="248" width="88" height="100" rx="44" ry="44" fill="#1E2A5E" />

        {/* Pregnant belly — prominent coral circle in front */}
        <circle cx="240" cy="305" r="54" fill="#F28B6E" />
        {/* Belly highlight */}
        <circle cx="225" cy="290" r="18" fill="#FFB627" opacity="0.25" />
        {/* Tiny heart on belly */}
        <path
          d="M240 312 C240 312, 230 302, 225 298 C220 294, 215 296, 215 302 C215 308, 220 313, 230 320 C240 327, 250 320, 255 313 C260 306, 260 294, 255 298 C250 302, 240 312, 240 312Z"
          fill="#fff"
          opacity="0.7"
        />

        {/* Neck */}
        <rect x="227" y="234" width="26" height="26" rx="13" fill="#F28B6E" />

        {/* Head — large rounded circle */}
        <circle cx="240" cy="215" r="42" fill="#F28B6E" />
        {/* Head shadow / hair implied by navy arc */}
        <path
          d="M200 205 C200 175, 215 168, 240 168 C265 168, 280 178, 280 205"
          fill="#1E2A5E"
        />
        {/* Hair bun */}
        <circle cx="240" cy="170" r="18" fill="#1E2A5E" />
        <circle cx="240" cy="163" r="10" fill="#1E2A5E" />

        {/* Eyes — closed / serene */}
        <path d="M224 212 Q228 208 232 212" stroke="#1E2A5E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M248 212 Q252 208 256 212" stroke="#1E2A5E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Soft smile */}
        <path d="M232 222 Q240 228 248 222" stroke="#1E2A5E" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Left arm resting on knee */}
        <path
          d="M198 280 C185 300, 175 320, 168 338"
          stroke="#1E2A5E"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left hand (mudra) */}
        <circle cx="165" cy="343" r="11" fill="#F28B6E" />

        {/* Right arm resting on knee */}
        <path
          d="M282 280 C295 300, 305 320, 312 338"
          stroke="#1E2A5E"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right hand (mudra) */}
        <circle cx="315" cy="343" r="11" fill="#F28B6E" />

        {/* ── Floating mindfulness elements ── */}

        {/* Breathing arc — left */}
        <path
          d="M130 220 Q115 205 120 185 Q125 165 145 160"
          stroke="#5BBFB5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
          strokeDasharray="6 4"
        />

        {/* Breathing arc — right */}
        <path
          d="M350 220 Q365 205 360 185 Q355 165 335 160"
          stroke="#5BBFB5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
          strokeDasharray="6 4"
        />

        {/* Stars / sparkles */}
        <g opacity="0.8">
          {/* Sparkle 1 */}
          <line x1="355" y1="200" x2="355" y2="188" stroke="#FFB627" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="349" y1="194" x2="361" y2="194" stroke="#FFB627" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sparkle 2 */}
          <line x1="115" y1="270" x2="115" y2="260" stroke="#F28BAE" strokeWidth="2" strokeLinecap="round" />
          <line x1="110" y1="265" x2="120" y2="265" stroke="#F28BAE" strokeWidth="2" strokeLinecap="round" />
          {/* Sparkle 3 */}
          <line x1="390" y1="310" x2="390" y2="302" stroke="#5BBFB5" strokeWidth="2" strokeLinecap="round" />
          <line x1="386" y1="306" x2="394" y2="306" stroke="#5BBFB5" strokeWidth="2" strokeLinecap="round" />
          {/* Small dots */}
          <circle cx="100" cy="200" r="5" fill="#FFB627" opacity="0.6" />
          <circle cx="380" cy="250" r="4" fill="#F28BAE" opacity="0.6" />
          <circle cx="340" cy="130" r="6" fill="#5BBFB5" opacity="0.5" />
          <circle cx="148" cy="300" r="4" fill="#FFB627" opacity="0.5" />
        </g>

        {/* ── Floating week badge ── */}
        <g transform="translate(330, 150)">
          <rect width="76" height="36" rx="18" fill="#FFB627" />
          <text x="38" y="22" textAnchor="middle" fill="#1E2A5E" fontSize="11" fontWeight="700" fontFamily="sans-serif">
            {locale === "zh" ? "40 週" : "40 wks"}
          </text>
        </g>

        {/* ── Floating chat bubble ── */}
        <g transform="translate(68, 200)">
          <rect width="72" height="34" rx="17" fill="#5BBFB5" />
          <path d="M20 34 L28 44 L36 34" fill="#5BBFB5" />
          <text x="36" y="21" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            {locale === "zh" ? "妳還好嗎" : "You okay?"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   Feature Card
   ───────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn
      delay={delay}
      className="bg-white rounded-3xl p-8 shadow-sm card-hover flex flex-col gap-4"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
        style={{ background: "var(--cream)" }}
      >
        {icon}
      </div>
      <div>
        <h3
          className="text-xl font-bold leading-tight mb-1"
          style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed mt-3" style={{ color: "#5A6480" }}>
          {description}
        </p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────
   Trimester Card
   ───────────────────────────────────────── */
function TrimesterCard({
  period,
  weeks,
  theme,
  color,
  textColor,
  delay,
  items,
  preview,
}: {
  period: string;
  weeks: string;
  theme: string;
  color: string;
  textColor?: string;
  delay?: number;
  items: string[];
  preview?: string;
}) {
  return (
    <FadeIn delay={delay} className="rounded-3xl overflow-hidden card-hover">
      <div
        className="p-8 h-full"
        style={{ backgroundColor: color }}
      >
        <div className="mb-6">
          {preview && (
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}
            >
              {preview}
            </p>
          )}
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: textColor ?? "rgba(30,42,94,0.75)", fontFamily: "var(--font-quicksand), sans-serif" }}
          >
            {weeks}
          </span>
          <h3
            className="text-2xl font-bold mt-1 mb-1"
            style={{ color: textColor ?? "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
          >
            {period}
          </h3>
          <p
            className="text-base leading-relaxed mt-3"
            style={{ color: textColor ?? "var(--navy)", fontFamily: "var(--font-noto), sans-serif", fontWeight: 400 }}
          >
            {theme}
          </p>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: textColor ?? "var(--navy)", opacity: 0.8 }}
            >
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────
   Pricing Card
   ───────────────────────────────────────── */
function PricingCard({
  highlighted,
  badge,
  title,
  subtitle,
  price,
  compareAt,
  compareAtNote,
  priceNote,
  features,
  ctaLabel,
  ctaHref,
  delay,
}: {
  highlighted?: boolean;
  badge?: string;
  title: string;
  subtitle: string;
  price: string;
  compareAt?: string;
  compareAtNote?: string;
  priceNote?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  delay?: number;
}) {
  return (
    <FadeIn
      delay={delay}
      className={`relative rounded-3xl p-8 flex flex-col gap-6 card-hover h-full bg-white ${
        highlighted ? "mt-8 lg:mt-0" : ""
      }`}
      style={
        {
          boxShadow: highlighted
            ? "0 0 0 3px var(--coral), var(--shadow-card)"
            : "var(--shadow-soft)",
        } as React.CSSProperties
      }
    >
      {badge && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-md"
          style={{ background: "var(--coral)" }}
        >
          {badge}
        </div>
      )}

      <div>
        <h3
          className="text-xl font-bold"
          style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif", fontWeight: 600 }}
        >
          {subtitle}
        </p>
      </div>

      <div>
        <div className="flex items-end gap-3 flex-wrap">
          <span
            className="text-5xl font-black leading-none"
            style={{ color: highlighted ? "var(--coral)" : "var(--navy)", fontFamily: "var(--font-quicksand), sans-serif" }}
          >
            {price}
          </span>
          {compareAt && (
            <span className="mb-1 text-left">
              {compareAtNote && (
                <span className="block text-[11px] leading-none mb-1" style={{ color: "#8A93B2" }}>
                  {compareAtNote}
                </span>
              )}
              <span
                className="text-lg line-through"
                style={{ color: "#8A93B2", fontFamily: "var(--font-quicksand), sans-serif" }}
              >
                {compareAt}
              </span>
            </span>
          )}
        </div>
        {priceNote && (
          <p className="text-sm mt-2" style={{ color: "#8A93B2" }}>
            {priceNote}
          </p>
        )}
      </div>

      <ul className="space-y-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: "#3A4165" }}>
            <svg
              className="flex-shrink-0 mt-0.5"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <circle cx="9" cy="9" r="9" fill={highlighted ? "var(--coral)" : "var(--teal)"} opacity="0.15" />
              <path
                d="M5.5 9l2.5 2.5 4.5-4.5"
                stroke={highlighted ? "var(--coral)" : "var(--teal)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {ctaHref.startsWith("mailto:") || ctaHref.startsWith("http") ? (
        <a
          href={ctaHref}
          {...(ctaHref.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex items-center self-start min-h-11 text-sm font-semibold underline underline-offset-4"
          style={{ color: "var(--coral)" }}
        >
          {ctaLabel}
        </a>
      ) : (
        <Link
          href={ctaHref}
          className="inline-flex items-center self-start min-h-11 text-sm font-semibold underline underline-offset-4"
          style={{ color: "var(--coral)" }}
        >
          {ctaLabel}
        </Link>
      )}
    </FadeIn>
  );
}

/* ─────────────────────────────────────────
   Section Header
   ───────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  subtitle,
  center,
  labelColor,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  /** Override the coral kicker when it would fail contrast on a light field. */
  labelColor?: string;
}) {
  return (
    <FadeIn className={center ? "text-center" : ""}>
      <p className="section-label mb-3" style={labelColor ? { color: labelColor } : undefined}>{label}</p>
      <h2
        className="display-heading text-3xl md:text-4xl lg:text-5xl mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: "#5A6480", ...(center ? { margin: "0 auto" } : {}) }}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

/* ─────────────────────────────────────────
   Page
   ───────────────────────────────────────── */
function FreeWeeksLink({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <a
      href={PRICING.freeWeeksUrl}
      className="underline underline-offset-2"
      style={{ color: color ?? "var(--coral)" }}
    >
      {children}
    </a>
  );
}

function MembersLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={PRICING.membersUrl}
      className="underline underline-offset-2"
      style={{ color: "var(--coral)" }}
    >
      {children}
    </a>
  );
}

function TextWithEmail({ text }: { text: string }) {
  const email = PRICING.email;
  const at = text.indexOf(email);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <a
        href={`mailto:${email}`}
        className="underline underline-offset-2 break-all"
        style={{ color: "var(--coral)" }}
      >
        {email}
      </a>
      {text.slice(at + email.length)}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const zh = locale === "zh";
  return pageMetadata({
    locale,
    title: zh
      ? "孕期 40 週陪伴｜也許妳想找人聊一聊"
      : "40 weeks of pregnancy support | Maybe She'd Like to Talk",
    description: zh
      ? "懷孕的時候，是不是也想有人陪著妳？我們按週數陪妳走完這 40 週，三個階段都會照顧到妳的身體和心情。前 4 週可以先免費看。"
      : "When you're pregnant, you may want someone beside you. We stay with you through these 40 weeks, and all three stages look after your body and how you feel. The first 4 weeks are free to read.",
    canonical: MAIN_SITE_URL,
    languages: {
      "zh-Hant": MAIN_SITE_URL,
      en: MAIN_SITE_URL,
      "x-default": MAIN_SITE_URL,
    },
  });
}

function jsonLd(locale: Locale) {
  const zh = locale === "zh";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "也許妳想找人聊一聊",
        alternateName: "Maybe She'd Like to Talk",
        url: MAIN_SITE_URL,
        description: zh
          ? "一週一週陪妳走完這 40 週。"
          : "Someone with you, week by week, through 40 weeks of pregnancy.",
        inLanguage: ["zh-Hant", "en"],
      },
      {
        "@type": "Organization",
        name: "也許妳想找人聊一聊",
        url: MAIN_SITE_URL,
        email: PRICING.email,
      },
      {
        "@type": "OfferCatalog",
        name: zh ? "孕期方案" : "Pregnancy plans",
        url: MAIN_SITE_URL,
        itemListElement: PRICING.plans.map((plan) => ({
          "@type": "Offer",
          name: pick(locale, plan.title),
          description: pick(locale, plan.subtitle),
          price: plan.priceUsd,
          priceCurrency: "USD",
          url: MAIN_SITE_URL,
          availability: "https://schema.org/InStock",
        })),
      },
      {
        "@type": "FAQPage",
        url: MAIN_SITE_URL,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: pick(locale, item.q),
          acceptedAnswer: {
            "@type": "Answer",
            text: pick(locale, item.a),
          },
        })),
      },
    ],
  };
}

export default async function LandingPage() {
  const locale = await getLocale();
  const t = (zh: string, en: string) => pick(locale, zh, en);
  const freeWeeks = pick(locale, PRICING.freeWeeksNote);
  const freeTrial = pick(locale, FREE_TRIAL_CTA);
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
      />

      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <section
        id="hero"
        className="gradient-hero relative section-padding min-h-[calc(100vh-5rem)] flex items-center"
      >
        {/* Decorative background circles */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -translate-y-1/4 translate-x-1/4 pointer-events-none"
          style={{ background: "var(--coral)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 translate-y-1/4 -translate-x-1/4 pointer-events-none"
          style={{ background: "var(--teal)" }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text column */}
            <div className="order-2 lg:order-1">
              <FadeIn>
                <p className="section-label mb-4">{t("懷孕週數", "Pregnancy week by week")}</p>
              </FadeIn>

              <FadeIn delay={100}>
                <h1
                  className="display-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4"
                  style={{ fontFamily: "var(--font-noto), sans-serif" }}
                >
                  {t("孕期 40 週，", "40 weeks of pregnancy,")}
                  <br />
                  <span style={{ color: "var(--coral)" }}>{t("有人陪著妳", "with someone beside you")}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={150}>
                <p
                  className="text-lg lg:text-xl font-semibold mb-2"
                  style={{ color: "var(--teal)", fontFamily: "var(--font-quicksand), sans-serif" }}
                >
                  {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <div
                  className="w-16 h-1 rounded-full mb-6"
                  style={{ background: "var(--coral)" }}
                />
              </FadeIn>

              <FadeIn delay={250}>
                <p
                  className="text-base lg:text-lg leading-relaxed mb-8 font-medium"
                  style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
                >
                  {locale === "zh" ? (
                    <>
                      懷孕時，是不是也想有人系統性地陪著妳、照顧妳？這 40 週，我們從身體、心靈到新生兒照顧，一週一週陪妳。妳並不孤單。
                      <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                      ，可以先慢慢看。第 5 週起如果想繼續，加入之後就能在
                      <MembersLink>會員頁</MembersLink>
                      打開。
                    </>
                  ) : (
                    <>
                      When you&apos;re pregnant, you may want someone to stay with you and look after you. Over these 40 weeks we look after your body, your feelings, and getting ready for the baby, one week at a time. You&apos;re not alone.{" "}
                      <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>, so you can start gently. From week 5, once you join, the{" "}
                      <MembersLink>Members page</MembersLink> opens.
                    </>
                  )}
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={PRICING.freeWeeksUrl} className="btn-primary text-base min-h-11">
                    {freeTrial}
                    <svg className="ml-2" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Illustration column */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="float-anim w-full max-w-[420px]">
                <HeroIllustration locale={locale} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT SECTION
          ════════════════════════════════════════ */}
      <section
        id="about"
        className="section-padding"
        style={{ backgroundColor: "var(--pink-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionHeader
              label={t("關於我們", "About")}
              title={t("孕期陪伴", "Pregnancy support")}
              subtitle={t(
                "懷孕這段路很長。我們按週數陪著妳，一週一頁。",
                "Pregnancy is a long road. We stay with you, one week and one page at a time.",
              )}
              center
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="💌"
              title={t("每週一頁", "One page a week")}
              description={
                locale === "zh" ? (
                  <>
                    妳買了哪幾週，<MembersLink>會員頁</MembersLink>就開哪幾週，一週一頁。那一頁裡有身體、心情，也有準備寶寶的事。
                  </>
                ) : (
                  <>
                    The <MembersLink>Members page</MembersLink> opens the weeks you bought, one page a week. That page is about your body, your mood, and getting ready for the baby.
                  </>
                )
              }
              delay={100}
            />
            <FeatureCard
              icon="🧘"
              title={t("孕期心情", "A note for your mood")}
              description={t(
                "每一週可以記一則心情，寫給自己就好。",
                "Each week you can write one note, just for yourself.",
              )}
              delay={200}
            />
            <FeatureCard
              icon="🌙"
              title={t("陪妳聊聊", "Chats with us")}
              description={t(
                "單一孕期是 1 次陪妳聊聊。全孕期通行證和送禮版是 3 次陪妳聊聊，另外還附一份可以列印的 PDF。",
                "A single trimester includes one chat with us. The Full Pass and the Gift Edition include three chats with us, and a PDF you can print.",
              )}
              delay={300}
            />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          JOURNEY SECTION
          ════════════════════════════════════════ */}
      <section id="journey" className="section-padding" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeader
              label={t("懷孕週數", "Pregnancy week by week")}
              title={t("孕期三階段", "Three trimesters")}
              subtitle={t(
                "三個階段是第 1 到 12 週、第 13 到 27 週，還有第 28 到 40 週。每一段都可以單獨買。",
                "The three stages are weeks 1–12, 13–27, and 28–40. You can buy any one of them on its own.",
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <TrimesterCard
              period={t("第一階段", "First trimester")}
              weeks={t("第 1–12 週", "Weeks 1–12")}
              theme={t(
                "第一次產檢之前，心裡常常忐忑不安。別擔心，我們陪著妳，讓妳慢慢安心。",
                "Before the first prenatal visit, it's natural to feel uneasy. Don't worry. We're with you, so you can settle in.",
              )}
              color="#FFF0F3"
              delay={100}
              items={[
                t("前 4 週可以先免費看。", "The first 4 weeks are free to read."),
                t("若只想走第 1 到 12 週，這一段也可以單獨買。", "If you only want weeks 1–12, you can buy just this part."),
              ]}
            />
            <TrimesterCard
              period={t("第二階段", "Second trimester")}
              weeks={t("第 13–27 週", "Weeks 13–27")}
              theme={t(
                "這段時間身體比較有感覺，日子也比較辛苦。放鬆心情，我們還是陪著妳。",
                "Your body starts to feel the pregnancy, and the days take more out of you. Ease your mind. We're still with you.",
              )}
              color="#E8F8F7"
              delay={200}
              items={[
                t("第 13 到 27 週可以單獨買，不一定要一次走完全程。", "You can buy weeks 13–27 on their own. You don't have to take the whole pregnancy at once."),
              ]}
            />
            <TrimesterCard
              period={t("第三階段", "Third trimester")}
              weeks={t("第 28–40 週", "Weeks 28–40")}
              theme={t(
                "快要見到寶寶了，心裡是期待，也請記得休息。辛苦了。",
                "You're close to meeting the baby. There's hope in that, so please rest. You've worked hard.",
              )}
              color="#FFF5DC"
              delay={300}
              items={[
                t("這一段會陪妳走到第 40 週。", "This part stays with you through week 40."),
                t("如果只要最後這段，也可以單獨買。", "If you only want this last stretch, you can buy it on its own."),
              ]}
            />
          </div>

          <FadeIn delay={400}>
            <div
              id="timeline"
              className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{ background: "#FFD6E0" }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/3 translate-x-1/4"
                style={{ background: "#fff", opacity: 0.35 }}
                aria-hidden="true"
              />
              <p
                className="relative text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--navy)" }}
              >
                {t("時間軸", "Timeline")}
              </p>
              <h3
                className="relative text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
              >
                {t("從懷孕的第一天，一直陪到寶寶出生", "From the first day of pregnancy until the baby is born")}
              </h3>
              <div className="relative">
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(30,42,94,0.08)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg, var(--coral) 0%, var(--yellow) 50%, var(--teal) 100%)",
                    }}
                  />
                </div>
                <div
                  className="flex justify-between mt-3 text-xs font-semibold"
                  style={{ color: "var(--navy)" }}
                >
                  <span>{t("第 1 週", "Week 1")}</span>
                  <span>{t("第 13 週", "Week 13")}</span>
                  <span>{t("第 27 週", "Week 27")}</span>
                  <span>{t("第 40 週", "Week 40")}</span>
                </div>
              </div>
              <p className="relative text-sm mt-6 leading-relaxed" style={{ color: "var(--navy)" }}>
                {locale === "zh" ? (
                  <>
                    <FreeWeeksLink color="var(--navy)">{freeWeeks}</FreeWeeksLink>
                    。從第 5 週到第 40 週，就是需要付費的部分。
                  </>
                ) : (
                  <>
                    <FreeWeeksLink color="var(--navy)">{freeWeeks}</FreeWeeksLink>. From week 5 through week 40, those weeks are paid.
                  </>
                )}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRICING SECTION
          ════════════════════════════════════════ */}
      <section
        id="pricing"
        className="section-padding scroll-mt-24"
        style={{ backgroundColor: "var(--pink-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionHeader
              label={t("方案", "Pricing")}
              title={t("三種方式，選一種就好", "Three ways to join. Pick the one that fits.")}
              subtitle={pick(locale, PRICING.currencyNote)}
              center
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-8 items-stretch pt-6">
            {PRICING.plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                highlighted={plan.highlighted}
                badge={plan.badge ? pick(locale, plan.badge) : undefined}
                title={pick(locale, plan.title)}
                subtitle={pick(locale, plan.subtitle)}
                price={formatUsd(plan.priceUsd)}
                compareAt={plan.compareAtUsd ? formatUsd(plan.compareAtUsd) : undefined}
                compareAtNote={plan.compareAtNote ? pick(locale, plan.compareAtNote) : undefined}
                priceNote={plan.priceNote ? pick(locale, plan.priceNote) : undefined}
                features={plan.features.map((feature) => pick(locale, feature))}
                ctaLabel={pick(locale, plan.cta)}
                ctaHref={planPurchaseHref(plan)}
                delay={(index + 1) * 100}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ
          ════════════════════════════════════════ */}
      <section id="faq" className="section-padding scroll-mt-24" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionHeader
              label={t("常見問題", "Questions")}
              title={t("大家常常先問這兩件事", "Two things people often ask first")}
              center
            />
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <article key={item.q.en} className="bg-white rounded-3xl p-6 sm:p-8 text-left">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
                >
                  {pick(locale, item.q)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6480" }}>
                  <TextWithEmail text={pick(locale, item.a)} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA BANNER
          ════════════════════════════════════════ */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--coral) 0%, var(--pink) 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-4">
              {t("如果妳也想有人陪著", "If you want someone with you")}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight"
              style={{ fontFamily: "var(--font-noto), sans-serif" }}
            >
              {t("第 5 週之後，我們還是陪著妳。", "After week 5, we're still with you.")}
            </h2>
            <a
              href={PRICING.freeWeeksUrl}
              className="inline-flex items-center justify-center gap-2 min-h-11 bg-white font-bold py-4 px-8 rounded-full text-base transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}
            >
              {freeTrial}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <footer className="py-8 md:py-12" style={{ backgroundColor: "var(--navy)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-10 text-left">
            <div className="min-w-0">
              <p
                className="text-lg font-bold mb-2"
                style={{ color: "var(--coral)", fontFamily: "var(--font-noto), sans-serif" }}
              >
                {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {t("一週一週陪著妳，走到第 40 週。", "Week by week, with you, through week 40.")}
              </p>
            </div>

            <nav aria-label={t("頁尾導覽", "Footer")}>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
                {t("導覽", "Explore")}
              </p>
              <ul className="flex flex-col">
                {[
                  { label: t("關於孕期陪伴", "About this pregnancy support"), href: "#about" },
                  { label: t("孕期三階段", "Three trimesters"), href: "#journey" },
                  { label: t("方案與價格", "Plans and prices"), href: "#pricing" },
                  { label: t("常見問題", "Common questions"), href: "#faq" },
                  { label: t("到會員頁看每一週", "Read each week on the Members page"), href: PRICING.membersUrl },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center min-h-11 text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
                {t("聯絡", "Contact")}
              </p>
              <a
                href={`mailto:${PRICING.email}`}
                className="flex items-center min-h-11 max-w-full break-all text-sm text-white/80 hover:text-white transition-colors"
              >
                {PRICING.email}
              </a>
              <a
                href={PRICING.freeWeeksUrl}
                className="inline-flex items-center justify-center min-h-11 mt-2 px-5 rounded-full border-2 border-white/40 text-sm font-bold text-white hover:border-white transition-colors"
              >
                {freeTrial}
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-4 flex flex-col items-start gap-1 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-white/50 min-h-11 flex items-center">
              © 2026 {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
            </p>
            <div className="flex flex-col items-stretch sm:flex-row sm:items-center">
              <a href="#" className="flex items-center min-h-11 pr-4 text-xs text-white/60 hover:text-white transition-colors">
                {t("隱私政策", "Privacy")}
              </a>
              <a href="#" className="flex items-center min-h-11 text-xs text-white/60 hover:text-white transition-colors">
                {t("服務條款", "Terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
