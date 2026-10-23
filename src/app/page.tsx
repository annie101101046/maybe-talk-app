import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { formatUsd, planPurchaseHref, PRICING, type Bilingual } from "@/lib/pricing";

function bilingual(text: Bilingual) {
  return `${text.zh} | ${text.en}`;
}

/* ─────────────────────────────────────────
   Inline SVG: Geometric Blob Pregnant Woman
   (Headspace / Buck design style)
   ───────────────────────────────────────── */
function HeroIllustration() {
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
          <text x="38" y="14" textAnchor="middle" fill="#1E2A5E" fontSize="9" fontWeight="700" fontFamily="sans-serif">40 週</text>
          <text x="38" y="26" textAnchor="middle" fill="#1E2A5E" fontSize="8" fontWeight="600" fontFamily="sans-serif">Journey</text>
        </g>

        {/* ── Floating chat bubble ── */}
        <g transform="translate(68, 200)">
          <rect width="72" height="34" rx="17" fill="#5BBFB5" />
          <path d="M20 34 L28 44 L36 34" fill="#5BBFB5" />
          <text x="36" y="13" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">妳還好嗎</text>
          <text x="36" y="25" textAnchor="middle" fill="white" fontSize="8" fontWeight="500" fontFamily="sans-serif">How r u?</text>
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
  subtitle,
  description,
  delay,
}: {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
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
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}
        >
          {subtitle}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#5A6480" }}>
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
}: {
  period: string;
  weeks: string;
  theme: string;
  color: string;
  textColor?: string;
  delay?: number;
  items: string[];
}) {
  return (
    <FadeIn delay={delay} className="rounded-3xl overflow-hidden card-hover">
      <div
        className="p-8 h-full"
        style={{ backgroundColor: color }}
      >
        <div className="mb-6">
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
  tagline,
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
  tagline?: Bilingual;
  price: string;
  compareAt?: string;
  compareAtNote?: string;
  priceNote?: string;
  features: Bilingual[];
  ctaLabel: string;
  ctaHref: string;
  delay?: number;
}) {
  return (
    <FadeIn
      delay={delay}
      className="relative rounded-3xl p-8 flex flex-col gap-6 card-hover h-full bg-white"
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
        {tagline && (
          <p className="text-xs mt-1" style={{ color: "#8A93B2" }}>
            {tagline.zh} / {tagline.en}
          </p>
        )}
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
          <li key={feature.en} className="flex items-start gap-3 text-sm" style={{ color: "#3A4165" }}>
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
            <span>
              {feature.zh}
              <span className="block text-xs mt-0.5" style={{ color: "#8A93B2" }}>
                {feature.en}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {ctaHref.startsWith("mailto:") || ctaHref.startsWith("http") ? (
        <a
          href={ctaHref}
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
  title: string;
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
export default function LandingPage() {
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
                <p className="section-label mb-4">40 週旅程 | 40-Week Journey</p>
              </FadeIn>

              <FadeIn delay={100}>
                <h1
                  className="display-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4"
                  style={{ fontFamily: "var(--font-noto), sans-serif" }}
                >
                  陪妳走完
                  <br />
                  <span style={{ color: "var(--coral)" }}>這四十週</span>
                </h1>
              </FadeIn>

              <FadeIn delay={150}>
                <p
                  className="text-lg lg:text-xl font-semibold mb-2"
                  style={{ color: "var(--teal)", fontFamily: "var(--font-quicksand), sans-serif" }}
                >
                  Maybe She&apos;d Like to Talk
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
                  className="text-base lg:text-lg leading-relaxed mb-2 font-medium"
                  style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
                >
                  每週一則情緒引導，加上冥想與呼吸練習。一份完整的孕期方案，即將開放。
                </p>
                <p
                  className="text-sm lg:text-base leading-relaxed mb-8"
                  style={{ color: "#6B7599" }}
                >
                  A weekly emotional guide and meditation practice for expecting mothers —
                  one complete package, coming soon.
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:hello@maybeshedliketotalk.org" className="btn-primary text-base">
                    來信取得早鳥資格
                    <svg className="ml-2" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href="#journey" className="btn-secondary text-base">
                    了解這四十週
                  </a>
                </div>
              </FadeIn>

              {/* Social proof */}
              <FadeIn delay={450}>
                <div className="flex items-center gap-4 mt-10">
                  <div className="flex -space-x-2">
                    {["#F28B6E", "#5BBFB5", "#FFB627", "#F28BAE"].map((c, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: c }}
                      >
                        {["媽", "咪", "孕", "寶"][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: "#8A93B2" }}>
                    <span className="font-bold" style={{ color: "var(--navy)" }}>200+</span>
                    {" "}位媽咪已加入旅程
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Illustration column */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="float-anim w-full max-w-[420px]">
                <HeroIllustration />
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
              label="關於我們 | About Us"
              title="妳不需要一個人走"
              subtitle="孕期是一段美麗卻複雜的旅程。我們相信每位媽咪都值得被溫柔地陪伴，在每一個當下感受到支持與理解。"
              center
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="💌"
              title="每週情緒引導"
              subtitle="Weekly Emotional Guide"
              description="每一週一則為這個孕期寫的心靈功課。從身體的變化、說不出口的焦慮，到慢慢長出來的期待，都有一個可以安放的地方。"
              delay={100}
            />
            <FeatureCard
              icon="🧘"
              title="40 週完整旅程"
              subtitle="One Complete Package"
              description="從第 1 週到第 40 週，三個孕期收在同一份方案裡。一次走完，不必一週一週另外找。"
              delay={200}
            />
            <FeatureCard
              icon="🌙"
              title="呼吸・冥想・好眠"
              subtitle="Meditation Practices"
              description="精心設計的引導冥想、孕期呼吸練習與好眠儀式，讓妳在身體變化最劇烈的時候，仍能找回內心的平靜與安定。"
              delay={300}
            />
          </div>

          {/* Stats bar */}
          <FadeIn delay={400} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "40", unit: "週", label: "完整情緒旅程" },
              { num: "3", unit: "期", label: "三種孕期節奏" },
              { num: "每週", unit: "", label: "一則心靈引導" },
              { num: "∞", unit: "", label: "冥想練習隨時聽" },
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
              label="40 週旅程 | 40-Week Journey"
              title="每一個孕期階段，都有妳需要的陪伴"
              subtitle="三個孕期，三種節奏，三種陪伴的方式。無論妳現在在哪個週數，都有適合妳的功課在等著妳。"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <TrimesterCard
              period="第一孕期"
              weeks="1–12 週 | First Trimester"
              theme="接納與安定"
              color="#FFF0F3"
              delay={100}
              items={[
                "認識身體的驚人變化",
                "孕吐期情緒穩定練習",
                "焦慮與不確定感的引導",
                "與寶寶的第一次連結冥想",
                "建立安定的日常儀式",
              ]}
            />
            <TrimesterCard
              period="第二孕期"
              weeks="13–27 週 | Second Trimester"
              theme="連結與探索"
              color="#E8F8F7"
              delay={200}
              items={[
                "感受第一次胎動的儀式",
                "伴侶溝通與關係陪伴",
                "身體形象與自我接納",
                "工作與孕期的平衡探索",
                "深化與寶寶的情感連結",
              ]}
            />
            <TrimesterCard
              period="第三孕期"
              weeks="28–40 週 | Third Trimester"
              theme="準備與期待"
              color="#FFF5DC"
              delay={300}
              items={[
                "生產恐懼的溫柔鬆綁",
                "孕期好眠呼吸練習",
                "母親角色的心理準備",
                "寫給寶寶的第一封信",
                "迎接分娩的正念陪伴",
              ]}
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
                Timeline
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-noto), sans-serif" }}
              >
                從懷孕第一天，到寶寶出生的那一刻
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
                  <span>第 1 週</span>
                  <span>第 13 週</span>
                  <span>第 27 週</span>
                  <span>第 40 週</span>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-6">
                妳的旅程是獨一無二的。我們的 40 週 Inner Engineering 計劃，
                為妳在每個關鍵時刻提供最需要的心靈功課與陪伴。
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
              label="方案 | Pricing"
              title="為這四十週，選一份陪伴"
              subtitle={
                <>
                  每週情緒引導與冥想練習。{PRICING.freeWeeksNote.zh}。{PRICING.currencyNote.zh}，來信即可預購。
                  <span className="block mt-1 text-sm">
                    A weekly emotional guide and meditation practice. {PRICING.freeWeeksNote.en}. {PRICING.currencyNote.en} — email us to pre-order.
                  </span>
                </>
              }
              center
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {PRICING.plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                highlighted={plan.highlighted}
                badge={plan.badge ? bilingual(plan.badge) : undefined}
                title={plan.title.zh}
                subtitle={plan.title.en}
                tagline={plan.subtitle}
                price={formatUsd(plan.priceUsd)}
                compareAt={plan.compareAtUsd ? formatUsd(plan.compareAtUsd) : undefined}
                compareAtNote={plan.compareAtNote ? bilingual(plan.compareAtNote) : undefined}
                priceNote={plan.priceNote ? bilingual(plan.priceNote) : undefined}
                features={plan.features}
                ctaLabel={`${PRICING.cta.zh} | ${PRICING.cta.en}`}
                ctaHref={planPurchaseHref(plan)}
                delay={(index + 1) * 100}
              />
            ))}
          </div>

          <FadeIn delay={350} className="text-center mt-10">
            <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>
              {PRICING.currencyNote.zh} / {PRICING.currencyNote.en}
            </p>
            <p className="text-sm mt-1" style={{ color: "#5A6480" }}>
              {PRICING.freeWeeksNote.zh} / {PRICING.freeWeeksNote.en}
            </p>
            <p className="text-sm mt-3" style={{ color: "#8A93B2" }}>
              預購請來信
              <a href={`mailto:${PRICING.email}`} className="font-semibold ml-1" style={{ color: "var(--coral)" }}>
                {PRICING.email}
              </a>
              <br />
              Email us to pre-order.
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
                label="早鳥資格 | Early Access"
                title="這份旅程，即將一次完整開放"
                subtitle="從家裡的沙發、臥室、甚至半夜醒著的那一刻，都可以打開這一週的引導。妳不需要準備什麼——帶著妳自己就夠了。"
              />
              <FadeIn delay={200} className="mt-8">
                <ul className="space-y-4">
                  {[
                    { icon: "💌", text: "每週一則情緒引導，跟著孕期的節奏走" },
                    { icon: "🌙", text: "冥想、呼吸與好眠練習，想聽的時候就回來" },
                    { icon: "🌸", text: "三個孕期的心靈功課，收在同一份方案裡" },
                    { icon: "✦", text: "一份完整方案，即將開放" },
                  ].map(({ icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                      <span className="text-sm leading-relaxed" style={{ color: "#5A6480" }}>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={300} className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="mailto:hello@maybeshedliketotalk.org" className="btn-primary text-base">
                  來信取得早鳥資格
                </a>
                <Link href="/auth/login" className="btn-secondary text-base">
                  已有帳號？登入
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
                      40 週完整方案
                    </p>
                    <p className="text-sm" style={{ color: "#8A93B2" }}>
                      每週情緒引導 · 冥想練習 · 即將開放
                    </p>
                  </div>
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--coral)" }}
                >
                  旅程裡有什麼
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    { weeks: "第 1–12 週", theme: "接納與安定" },
                    { weeks: "第 13–27 週", theme: "連結與探索" },
                    { weeks: "第 28–40 週", theme: "準備與期待" },
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
                  寫信給我們，開放時第一時間告訴妳
                </p>

                <a
                  href="mailto:hello@maybeshedliketotalk.org"
                  className="btn-primary w-full text-center block text-sm"
                >
                  來信取得早鳥資格
                </a>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIAL STRIP
          ════════════════════════════════════════ */}
      <section
        className="py-16 overflow-hidden"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--coral)" }}
            >
              媽咪們說 | What They Say
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-noto), sans-serif" }}
            >
              被陪伴的這四十週，真的很不一樣
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "每週的情緒引導像有人輕輕陪著我。孕吐那段最難的時候，終於知道怎麼安放自己的心情。",
                name: "小涵",
                week: "孕 12 週",
                color: "var(--coral)",
                delay: 100,
              },
              {
                quote: "40 週旅程裡的冥想練習變成我每天睡前必聽。有了這個陪伴，整個孕期都安心很多。",
                name: "Mei",
                week: "孕 36 週",
                color: "var(--teal)",
                delay: 200,
              },
              {
                quote: "第三孕期的呼吸練習讓我在睡不著的夜裡找到一個安定的節奏。這四十週，我沒有覺得自己在硬撐。",
                name: "Amanda",
                week: "孕 34 週",
                color: "var(--yellow)",
                delay: 300,
              },
            ].map(({ quote, name, week, color, delay }) => (
              <FadeIn
                key={name}
                delay={delay}
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.06)" } as React.CSSProperties}
              >
                <div
                  className="w-8 h-1 rounded-full mb-4"
                  style={{ background: color }}
                />
                <p className="text-sm text-white/80 leading-relaxed mb-6 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: color }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{name}</p>
                    <p className="text-xs text-white/50">{week}</p>
                  </div>
                </div>
              </FadeIn>
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
              開始妳的旅程
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-noto), sans-serif" }}
            >
              也許，現在就是
              <br />
              開始這四十週的時候
            </h2>
            <p className="text-white/80 text-base mb-8 leading-relaxed">
              一份完整方案即將開放。寫信給我們，取得早鳥資格。
              <br />
              <span className="font-semibold">One journey. Coming soon.</span>
            </p>
            <a
              href="mailto:hello@maybeshedliketotalk.org"
              className="inline-flex items-center gap-2 bg-white font-bold py-4 px-8 rounded-full text-base transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              style={{ color: "var(--coral)", fontFamily: "var(--font-quicksand), sans-serif" }}
            >
              來信取得早鳥資格
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
                也許妳想找人聊一聊
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                Maybe She&apos;d Like to Talk
                <br />
                40 週孕期心靈旅程
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                導覽
              </p>
              <ul className="space-y-2">
                {[
                  { label: "關於我們", href: "#about" },
                  { label: "40 週旅程", href: "#journey" },
                  { label: "完整方案", href: "#pricing" },
                  { label: "早鳥資格", href: "#early-access" },
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
                聯絡
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
                    href="mailto:hello@maybeshedliketotalk.org"
                    className="text-sm font-bold text-white py-2.5 px-5 rounded-full border-2 border-white/30 hover:border-white transition-colors"
                  >
                    取得早鳥資格 →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs text-white/60">
              聯絡我們 Contact:{" "}
              <a
                href="mailto:hello@maybeshedliketotalk.org"
                className="font-semibold text-white/80 hover:text-white transition-colors"
              >
                hello@maybeshedliketotalk.org
              </a>
            </p>
            <p className="text-xs text-white/30">
              © 2024 也許妳想找人聊一聊 · Maybe She&apos;d Like to Talk. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                隱私政策
              </a>
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                服務條款
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
