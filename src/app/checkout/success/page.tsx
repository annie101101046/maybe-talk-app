'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Lightweight CSS-only confetti using keyframe animations injected   */
/*  via a <style> tag. No external deps required.                       */
/* ------------------------------------------------------------------ */

const CONFETTI_COLORS = [
  '#F28BAE', // pink
  '#F28B6E', // coral
  '#5BBFB5', // teal
  '#FFB627', // yellow
  '#1E2A5E', // navy
]

const PIECE_COUNT = 48

function ConfettiCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pieces: HTMLSpanElement[] = []

    for (let i = 0; i < PIECE_COUNT; i++) {
      const el = document.createElement('span')
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
      const size = Math.random() * 8 + 6 // 6–14 px
      const left = Math.random() * 100 // %
      const delay = Math.random() * 1.5 // s
      const duration = Math.random() * 2 + 2 // 2–4 s
      const rotate = Math.random() * 720 - 360

      el.style.cssText = `
        position: absolute;
        top: -20px;
        left: ${left}%;
        width: ${size}px;
        height: ${size * (Math.random() > 0.5 ? 0.4 : 1)}px;
        background-color: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        opacity: 0;
        animation: confetti-fall ${duration}s ${delay}s ease-in forwards;
        transform-origin: center;
        --rotate: ${rotate}deg;
      `
      container.appendChild(el)
      pieces.push(el)
    }

    return () => {
      pieces.forEach((p) => p.remove())
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh) rotate(var(--rotate, 360deg)); opacity: 0; }
        }
      `}</style>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-50"
      />
    </>
  )
}

/* ------------------------------------------------------------------ */

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <ConfettiCanvas />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-[#1E2A5E]">也許妳想找人聊一聊</h1>
          <p className="text-xs text-[#1E2A5E]/40 font-light tracking-wide mt-0.5">
            Maybe She&apos;d Like to Talk
          </p>
        </div>

        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[#F28BAE]/15 border border-[#F28BAE]/20 overflow-hidden text-center">
          {/* Pink top stripe with emoji */}
          <div className="bg-gradient-to-r from-[#F28BAE] to-[#F28B6E] px-8 py-8 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl">
              🌸
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              付款成功！
            </h2>
            <p className="text-white/80 text-base font-light">
              Welcome to the family!
            </p>
          </div>

          <div className="px-8 py-8 space-y-6">
            {/* Confirmation message */}
            <p className="text-[#1E2A5E]/70 text-sm leading-relaxed">
              妳的孕期陪伴方案已啟用。我們很榮幸能陪伴妳這段旅程。
              <br />
              <span className="text-xs text-[#1E2A5E]/40">
                Your Pregnancy Support Package is now active. We&apos;re honoured to walk
                this journey with you.
              </span>
            </p>

            {/* What's unlocked */}
            <div className="bg-[#FFF5F0] rounded-2xl p-5 text-left space-y-3">
              <p className="text-xs font-semibold text-[#1E2A5E]/40 uppercase tracking-widest mb-3">
                妳已解鎖 · You&apos;ve Unlocked
              </p>
              {[
                { icon: '💬', zh: '4 次深度聊聊', en: '4 one-on-one sessions added to your account' },
                { icon: '📚', zh: '所有課程內容', en: 'Full access to all course content' },
                { icon: '🏃‍♀️', zh: '孕期 Bootcamp', en: 'Bootcamp participation unlocked' },
                { icon: '👭', zh: '支持社群', en: 'Community membership activated' },
              ].map((item) => (
                <div key={item.zh} className="flex items-start gap-3">
                  <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#1E2A5E]">{item.zh}</p>
                    <p className="text-xs text-[#1E2A5E]/40">{item.en}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Credits highlight */}
            <div className="flex items-center justify-center gap-3 bg-[#5BBFB5]/10 rounded-xl py-4 border border-[#5BBFB5]/20">
              <span className="text-4xl font-extrabold text-[#5BBFB5]">4</span>
              <div className="text-left">
                <p className="text-sm font-bold text-[#1E2A5E]">Credits 已加入</p>
                <p className="text-xs text-[#1E2A5E]/40">Credits added to your account</p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/booking"
              className="block w-full py-4 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-bold text-base transition-colors duration-200 shadow-md shadow-[#F28B6E]/30 text-center"
            >
              前往預約第一次聊聊
              <br />
              <span className="text-sm font-normal opacity-70">Book Your First Session →</span>
            </Link>

            <Link
              href="/dashboard"
              className="block text-sm text-[#1E2A5E]/40 hover:text-[#F28B6E] transition-colors"
            >
              返回主頁 · Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#1E2A5E]/30 mt-8 leading-relaxed">
          如有任何問題，請聯絡我們 ·{' '}
          <a
            href="mailto:hello@maybetalk.com"
            className="underline underline-offset-2 hover:text-[#F28B6E] transition-colors"
          >
            hello@maybetalk.com
          </a>
        </p>
      </div>
    </main>
  )
}
