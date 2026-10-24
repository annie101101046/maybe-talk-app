import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { formatUsd, planPurchaseHref, PRICING } from "@/lib/pricing";
import { pick, type Locale } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

/* ─────────────────────────────────────────
   Inline SVG: Geometric Blob Pregnant Woman
   (Headspace / Buck design style)
   ───────────────────────────────────────── */
function HeroIllustration({ locale }: { locale: Locale }) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto select-none">
      {/* Background decorative blobs */}
      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
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
            style={{ color: textColor ?? "rgba(30,42,94,0.6)", fontFamily: "var(--font-quicksand), sans-serif" }}
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
            className="text-lg font-bold"
            style={{ color: textColor ?? "var(--navy)", opacity: 0.85, fontFamily: "var(--font-quicksand), sans-serif" }}
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
          className={highlighted ? "btn-primary text-center text-base" : "btn-secondary text-center text-base"}
        >
          {ctaLabel}
        </a>
      ) : (
        <Link
          href={ctaHref}
          className={highlighted ? "btn-primary text-center text-base" : "btn-secondary text-center text-base"}
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
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <FadeIn className={center ? "text-center" : ""}>
      <p className="section-label mb-3">{label}</p>
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
function FreeWeeksLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={PRICING.freeWeeksUrl}
      className="underline underline-offset-2"
      style={{ color: "var(--coral)" }}
    >
      {children}
    </a>
  );
}

export default async function LandingPage() {
  const locale = await getLocale();
  const t = (zh: string, en: string) => pick(locale, zh, en);
  const freeWeeks = pick(locale, PRICING.freeWeeksNote);

  return (
    <div className="overflow-x-hidden">

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
                <p className="section-label mb-4">{t("40 週旅程", "40-week journey")}</p>
              </FadeIn>

              <FadeIn delay={100}>
                <h1
                  className="display-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4"
                  style={{ fontFamily: "var(--font-noto), sans-serif" }}
                >
                  {t("陪妳走完", "We'll walk with you")}
                  <br />
                  <span style={{ color: "var(--coral)" }}>{t("這四十週", "these forty weeks")}</span>
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
                      每週一頁情緒陪伴，放在這趟旅程裡。
                      <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                      ，可以先看。其餘現在預購，後面的週會一週一週放進來。
                    </>
                  ) : (
                    <>
                      One page of company each week, in this journey.{" "}
                      <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> to read now. The rest is a pre-order, released week by week.
                    </>
                  )}
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#pricing" className="btn-primary text-base">
                    {t("現在預購", "Pre-order now")}
                    <svg className="ml-2" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href="#journey" className="btn-secondary text-base">
                    {t("了解這四十週", "See the forty weeks")}
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
              title={t("妳不需要一個人走", "You don't have to do this alone")}
              subtitle={t(
                "孕期是一段美麗卻複雜的旅程。我們相信每位媽咪都值得被溫柔地陪伴，在每一個當下感受到支持與理解。",
                "Pregnancy is beautiful, and it's a lot. Every mother deserves someone gentle beside her.",
              )}
              center
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="💌"
              title={t("每週情緒陪伴", "Weekly company")}
              description={
                locale === "zh" ? (
                  <>
                    每一週一頁，寫給那個週數，放在旅程裡。
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                    ，可以先看。後面的週會慢慢放上來。
                  </>
                ) : (
                  <>
                    One page each week, written for that week, in the journey.{" "}
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> to read now. Later weeks arrive over time.
                  </>
                )
              }
              delay={100}
            />
            <FeatureCard
              icon="🧘"
              title={t("40 週完整旅程", "The full 40 weeks")}
              description={
                locale === "zh" ? (
                  <>
                    三個孕期收在同一份預購裡。先從
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                    開始，不必一週一週另外找。
                  </>
                ) : (
                  <>
                    Three trimesters in one pre-order. Start here:{" "}
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>. You don&apos;t have to hunt week by week.
                  </>
                )
              }
              delay={200}
            />
            <FeatureCard
              icon="🌙"
              title={t("引導呼吸與冥想文字", "Guided breathing and meditation text")}
              description={
                locale === "zh" ? (
                  <>
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                    的那幾頁裡，有引導呼吸，和可以照著唸的冥想文字。
                  </>
                ) : (
                  <>
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> and include guided breathing and read-aloud meditation text.
                  </>
                )
              }
              delay={300}
            />
          </div>

          {/* Stats bar */}
          <FadeIn delay={400} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "40", unit: t("週", "wks"), label: t("完整情緒旅程", "Full emotional journey") },
              { num: "3", unit: t("期", ""), label: t("三種孕期節奏", "Trimester rhythms") },
              { num: t("每週", "Weekly"), unit: "", label: t("一則心靈引導", "One guide") },
              { num: t("文字", "Text"), unit: "", label: t("引導呼吸與朗讀冥想", "Guided breathing, read-aloud meditation") },
            ].map(({ num, unit, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-6 text-center shadow-sm"
              >
                <p
                  className="text-3xl font-black leading-none"
                  style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}
                >
                  {num}
                  <span className="text-lg ml-0.5">{unit}</span>
                </p>
                <p className="text-sm mt-2" style={{ color: "#8A93B2" }}>
                  {label}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          JOURNEY SECTION
          ════════════════════════════════════════ */}
      <section id="journey" className="section-padding" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeader
              label={t("40 週旅程", "40-week journey")}
              title={t("三個孕期，先看方向", "Three trimesters, a first look")}
              subtitle={
                locale === "zh" ? (
                  <>
                    下面的卡片是預覽。
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                    ，可以先看。其餘會一週一週放進旅程。
                  </>
                ) : (
                  <>
                    The cards below are a preview. <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> to read now. The rest goes into the journey week by week.
                  </>
                )
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <TrimesterCard
              preview={t("預覽", "Preview")}
              period={t("第一孕期", "First trimester")}
              weeks={t("1–12 週", "Weeks 1–12")}
              theme={t("接納與安定", "Acceptance and steadiness")}
              color="#FFF0F3"
              delay={100}
              items={
                locale === "zh"
                  ? [
                      "認識身體的驚人變化",
                      "孕吐期情緒穩定練習",
                      "焦慮與不確定感的引導",
                      "與寶寶的第一次連結冥想",
                      "建立安定的日常儀式",
                    ]
                  : [
                      "Getting to know how your body is changing",
                      "A steadier mood through the nausea",
                      "When you feel anxious or unsure",
                      "A first meditation with the baby",
                      "A small daily ritual",
                    ]
              }
            />
            <TrimesterCard
              preview={t("預覽", "Preview")}
              period={t("第二孕期", "Second trimester")}
              weeks={t("13–27 週", "Weeks 13–27")}
              theme={t("連結與探索", "Connection")}
              color="#E8F8F7"
              delay={200}
              items={
                locale === "zh"
                  ? [
                      "感受第一次胎動的儀式",
                      "伴侶溝通與關係陪伴",
                      "身體形象與自我接納",
                      "工作與孕期的平衡探索",
                      "深化與寶寶的情感連結",
                    ]
                  : [
                      "A ritual for the first kicks",
                      "Talking with your partner",
                      "Body image, and being okay with it",
                      "Work and pregnancy at the same time",
                      "Feeling closer to the baby",
                    ]
              }
            />
            <TrimesterCard
              preview={t("預覽", "Preview")}
              period={t("第三孕期", "Third trimester")}
              weeks={t("28–40 週", "Weeks 28–40")}
              theme={t("準備與期待", "Getting ready")}
              color="#FFF5DC"
              delay={300}
              items={
                locale === "zh"
                  ? [
                      "生產恐懼的溫柔鬆綁",
                      "孕期好眠呼吸練習",
                      "母親角色的心理準備",
                      "寫給寶寶的第一封信",
                      "迎接分娩的正念陪伴",
                    ]
                  : [
                      "When you're scared of giving birth",
                      "Breathing practice for sleep",
                      "Getting used to the idea of being a mother",
                      "A first letter to the baby",
                      "Company as labor gets closer",
                    ]
              }
            />
          </div>

          {/* Timeline visual */}
          <FadeIn delay={400}>
            <div
              className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{ background: "var(--navy)" }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/3 translate-x-1/4"
                style={{ background: "var(--coral)" }}
                aria-hidden="true"
              />
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--coral)" }}
              >
                {t("時間軸", "Timeline")}
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-noto), sans-serif" }}
              >
                {t("從懷孕第一天，到寶寶出生的那一刻", "From the first day of pregnancy to the moment the baby arrives")}
              </h3>
              {/* Progress bar */}
              <div className="relative">
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg, var(--coral) 0%, var(--yellow) 50%, var(--teal) 100%)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-xs text-white/60 font-semibold">
                  <span>{t("第 1 週", "Week 1")}</span>
                  <span>{t("第 13 週", "Week 13")}</span>
                  <span>{t("第 27 週", "Week 27")}</span>
                  <span>{t("第 40 週", "Week 40")}</span>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-6">
                {locale === "zh" ? (
                  <>
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                    ，可以先看。後面的週會一週一週放進這趟旅程。
                  </>
                ) : (
                  <>
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> to read now. Later weeks go into the journey one at a time.
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
              title={
                locale === "zh" ? (
                  <>
                    <FreeWeeksLink>前 4 週免費</FreeWeeksLink>
                    ，其餘現在預購
                  </>
                ) : (
                  <>
                    <FreeWeeksLink>The first 4 weeks are free</FreeWeeksLink>
                    . Pre-order the rest.
                  </>
                )
              }
              subtitle={
                locale === "zh" ? (
                  <>
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                    ，可以先看。內容每週放到旅程裡，完整內容會分批上線，所以現在是預購。{pick(locale, PRICING.currencyNote)}。
                  </>
                ) : (
                  <>
                    <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> to read now. Each week goes into the journey, and the full set rolls out in batches, so this is a pre-order. {pick(locale, PRICING.currencyNote)}.
                  </>
                )
              }
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

          <FadeIn delay={350} className="text-center mt-10">
            <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>
              {pick(locale, PRICING.currencyNote)}
            </p>
            <p className="text-sm mt-1" style={{ color: "#5A6480" }}>
              <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
            </p>
            <p className="text-sm mt-3" style={{ color: "#5A6480" }}>
              {pick(locale, PRICING.checkoutNote)}
            </p>
            <p className="text-sm mt-2" style={{ color: "#8A93B2" }}>
              {t("想問別的，寫到", "For anything else, email")}
              <a href={`mailto:${PRICING.email}`} className="font-semibold ml-1" style={{ color: "var(--coral)" }}>
                {PRICING.email}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EARLY ACCESS SECTION
          ════════════════════════════════════════ */}
      <section id="early-access" className="section-padding" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <SectionHeader
                label={t("怎麼拿到", "How you get it")}
                title={t("預購之後，每週放進旅程", "After you pre-order, each week goes into the journey")}
                subtitle={
                  locale === "zh" ? (
                    <>
                      <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                      ，可以先看。其餘用信用卡或 PayPal，在 Gumroad 預購。
                    </>
                  ) : (
                    <>
                      <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> to read now. Pre-order the rest by card or PayPal on Gumroad.
                    </>
                  )
                }
              />
              <FadeIn delay={200} className="mt-8">
                <ul className="space-y-4">
                  {[
                    { icon: "💌", text: t("每週一頁情緒陪伴，跟著週數，放在旅程裡", "One page of company each week, for that week, in the journey") },
                    {
                      icon: "🌙",
                      text: locale === "zh" ? (
                        <>
                          <FreeWeeksLink>{freeWeeks}</FreeWeeksLink>
                          的那幾頁裡，有引導呼吸，和可以照著唸的冥想文字。
                        </>
                      ) : (
                        <>
                          <FreeWeeksLink>{freeWeeks}</FreeWeeksLink> and include guided breathing and read-aloud meditation text.
                        </>
                      ),
                    },
                    { icon: "🌸", text: t("三個孕期都在同一份預購裡", "Three trimesters in the same pre-order") },
                    { icon: "✦", text: t("信用卡或 PayPal，在 Gumroad 付款", "Pay by card or PayPal on Gumroad") },
                  ].map(({ icon, text }) => (
                    <li key={icon} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                      <span className="text-sm leading-relaxed" style={{ color: "#5A6480" }}>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={300} className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#pricing" className="btn-primary text-base">
                  {t("現在預購", "Pre-order now")}
                </a>
                <Link href="/auth/login" className="btn-secondary text-base">
                  {t("已有帳號？登入", "Already have an account? Log in")}
                </Link>
              </FadeIn>
            </div>

            <FadeIn delay={200}>
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: "white", boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="h-2 rounded-full mb-8 -mx-8 -mt-8 px-8"
                  style={{
                    background: "linear-gradient(90deg, var(--coral), var(--pink), var(--teal))",
                    width: "calc(100% + 4rem)",
                  }}
                />

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: "var(--cream)" }}
                  >
                    🌙
                  </div>
                  <div>
                    <p
                      className="font-bold text-base"
                      style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
                    >
                      {t("40 週完整方案", "The full 40-week plan")}
                    </p>
                    <p className="text-sm" style={{ color: "#8A93B2" }}>
                      {t("每週情緒陪伴 · 引導呼吸與朗讀冥想 · 放在旅程裡", "Weekly company · guided breathing and read-aloud meditation · in the journey")}
                    </p>
                  </div>
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--coral)" }}
                >
                  {t("旅程裡有什麼", "What's in it")}
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    { weeks: t("第 1–12 週", "Weeks 1–12"), theme: t("接納與安定", "Acceptance and steadiness") },
                    { weeks: t("第 13–27 週", "Weeks 13–27"), theme: t("連結與探索", "Connection") },
                    { weeks: t("第 28–40 週", "Weeks 28–40"), theme: t("準備與期待", "Getting ready") },
                  ].map(({ weeks, theme }) => (
                    <div
                      key={weeks}
                      className="rounded-xl py-3 px-4 flex items-center justify-between border-2"
                      style={{
                        borderColor: "var(--coral)",
                        color: "var(--navy)",
                      }}
                    >
                      <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-noto), sans-serif" }}>
                        {weeks}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}>
                        {theme}
                      </span>
                    </div>
                  ))}
                </div>

                <p
                  className="text-xs text-center mb-4"
                  style={{ color: "#8A93B2" }}
                >
                  {pick(locale, PRICING.checkoutNote)}
                </p>

                <a
                  href={planPurchaseHref(PRICING.plans.find((plan) => plan.id === "full-pass")!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block text-sm"
                >
                  {pick(locale, PRICING.plans.find((plan) => plan.id === "full-pass")!.cta)}
                </a>
              </div>
            </FadeIn>

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
              {t("開始妳的旅程", "Start here")}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-noto), sans-serif" }}
            >
              {t("想走這四十週，", "If you want these forty weeks,")}
              <br />
              {t("現在可以預購", "you can pre-order")}
            </h2>
            <p className="text-white/80 text-base mb-8 leading-relaxed">
              {pick(locale, PRICING.checkoutNote)}
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-white font-bold py-4 px-8 rounded-full text-base transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}
            >
              {t("現在預購", "Pre-order now")}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <footer
        className="py-12"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            {/* Brand */}
            <div>
              <p
                className="text-lg font-bold mb-2"
                style={{ color: "var(--coral)", fontFamily: "var(--font-noto), sans-serif" }}
              >
                {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                {t("40 週孕期心靈旅程", "A 40-week pregnancy journey")}
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                {t("導覽", "Explore")}
              </p>
              <ul className="space-y-2">
                {[
                  { label: t("關於我們", "About"), href: "#about" },
                  { label: t("40 週旅程", "40-week journey"), href: "#journey" },
                  { label: t("完整方案", "Plans"), href: "#pricing" },
                  { label: t("怎麼拿到", "How you get it"), href: "#early-access" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                {t("聯絡", "Contact")}
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@maybeshedliketotalk.org"
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>✉</span>
                    hello@maybeshedliketotalk.org
                  </a>
                </li>
                <li className="pt-4">
                  <a
                    href="#pricing"
                    className="text-sm font-bold text-white py-2.5 px-5 rounded-full border-2 border-white/30 hover:border-white transition-colors"
                  >
                    {t("預購 →", "Pre-order →")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs text-white/60">
              {t("聯絡我們", "Contact")}:{" "}
              <a
                href="mailto:hello@maybeshedliketotalk.org"
                className="font-semibold text-white/80 hover:text-white transition-colors"
              >
                hello@maybeshedliketotalk.org
              </a>
            </p>
            <p className="text-xs text-white/30">
              © 2026 {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {t("隱私政策", "Privacy")}
              </a>
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {t("服務條款", "Terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
