'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const PACKAGE = {
  nameZh: '孕期陪伴方案',
  nameEn: 'Pregnancy Support Package',
  price: 250,
  currency: 'USD',
  includes: [
    { zh: '4 次一對一深度聊聊', en: '4 private one-on-one sessions' },
    { zh: '無限制課程內容存取', en: 'Unlimited course & content access' },
    { zh: '孕期 Bootcamp 參與資格', en: 'Full bootcamp participation' },
    { zh: '支持社群加入', en: 'Access to support community' },
    { zh: '專屬學員資源庫', en: 'Exclusive member resource library' },
  ],
}

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: 'pregnancy_support' }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? `Request failed with status ${res.status}`)
      }

      const { url } = await res.json()

      if (!url) throw new Error('No checkout URL returned.')

      router.push(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF5F0] flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-xl font-bold text-[#1E2A5E]">也許妳想找人聊一聊</h1>
            <p className="text-xs text-[#1E2A5E]/40 font-light tracking-wide mt-0.5">
              Maybe She&apos;d Like to Talk
            </p>
          </Link>
        </div>

        {/* Main checkout card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-[#F28BAE]/10 border border-[#F28BAE]/20 overflow-hidden">
          {/* Coral banner */}
          <div className="bg-[#F28B6E] px-8 py-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-3">
              一次性付款 · One-time payment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {PACKAGE.nameZh}
            </h2>
            <p className="text-white/70 text-sm mt-1 font-light">{PACKAGE.nameEn}</p>
          </div>

          <div className="px-8 py-7">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-extrabold text-[#1E2A5E]">
                ${PACKAGE.price}
              </span>
              <span className="text-lg text-[#1E2A5E]/50 font-medium">
                {PACKAGE.currency}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#F28BAE]/15 mb-6" />

            {/* What's included */}
            <p className="text-xs font-semibold text-[#1E2A5E]/40 uppercase tracking-widest mb-4">
              方案包含 · What&apos;s Included
            </p>
            <ul className="space-y-3 mb-8">
              {PACKAGE.includes.map((item) => (
                <li key={item.zh} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#5BBFB5]/15 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-[#5BBFB5]"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1E2A5E]">{item.zh}</span>
                    <span className="ml-2 text-xs text-[#1E2A5E]/40">{item.en}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: '🔒', text: '安全付款 · Secure Payment' },
                { icon: '💳', text: 'Stripe 處理 · Powered by Stripe' },
                { icon: '🌸', text: '立即生效 · Instant Access' },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 bg-[#FFF5F0] border border-[#F28BAE]/20 rounded-full px-3 py-1.5 text-xs text-[#1E2A5E]/60"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* CTA button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-bold text-base transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md shadow-[#F28B6E]/30"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>處理中…</span>
                </>
              ) : (
                <>
                  前往付款
                  <span className="opacity-60 font-normal">| Proceed to Payment</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#1E2A5E]/30 mt-4 leading-relaxed">
              按下付款後，您將被導向 Stripe 安全付款頁面。
              <br />
              You&apos;ll be redirected to Stripe&apos;s secure checkout.
            </p>
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-sm text-[#1E2A5E]/40">
          <Link href="/dashboard" className="hover:text-[#F28B6E] transition-colors">
            ← 返回主頁 · Back to Dashboard
          </Link>
        </p>
      </div>
    </main>
  )
}
