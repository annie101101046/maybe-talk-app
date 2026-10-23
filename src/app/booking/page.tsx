'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

const CAL_LINK = 'mugo-28yktd/maybe-she-d-like-to-talk'

interface Profile {
  id: string
  full_name: string | null
  credits: number
  is_paid: boolean
  first_free_used: boolean
}

type AccessState =
  | 'loading'
  | 'unauthenticated'
  | 'free_allowed'   // free user, first_free_used = false
  | 'paid_allowed'   // paid user, credits > 0
  | 'no_access'      // free + first_free_used = true; or paid + credits = 0

export default function BookingPage() {
  const router = useRouter()
  const calContainerRef = useRef<HTMLDivElement>(null)
  const calScriptRef = useRef<HTMLScriptElement | null>(null)

  const [access, setAccess] = useState<AccessState>('loading')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bookingRecorded, setBookingRecorded] = useState(false)
  const [recordError, setRecordError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  /* ---------------------------------------------------------------- */
  /* 1. Auth + profile check                                           */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setAccess('unauthenticated')
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, full_name, credits, is_paid, first_free_used')
        .eq('id', user.id)
        .single()

      if (!profileData) {
        setAccess('unauthenticated')
        return
      }

      const p = profileData as Profile
      setProfile(p)

      if (!p.is_paid && !p.first_free_used) {
        setAccess('free_allowed')
      } else if (p.is_paid && p.credits > 0) {
        setAccess('paid_allowed')
      } else {
        setAccess('no_access')
      }
    }

    checkAccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------------------------------------------------------------- */
  /* 2. Load Cal.com embed once we know access is allowed             */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (access !== 'free_allowed' && access !== 'paid_allowed') return

    // Cal.com embed loader snippet (idempotent)
    const calLoader = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", { origin: "https://cal.com" });
      Cal("inline", {
        elementOrSelector: "#cal-booking",
        calLink: "${CAL_LINK}",
        config: { theme: "light" }
      });
    `

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = calLoader
    document.body.appendChild(script)
    calScriptRef.current = script

    return () => {
      // Remove the injected script on unmount (best-effort cleanup)
      try {
        document.body.removeChild(script)
      } catch {
        // already removed
      }
    }
  }, [access])

  /* ---------------------------------------------------------------- */
  /* 3. Listen for Cal.com booking confirmed postMessage              */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (access !== 'free_allowed' && access !== 'paid_allowed') return

    async function handleMessage(event: MessageEvent) {
      // Cal.com sends: { type: 'Cal:booking_confirmed', data: { ... } }
      if (
        !event.data ||
        typeof event.data !== 'object' ||
        event.data.type !== 'Cal:booking_confirmed'
      ) {
        return
      }

      const calBookingId =
        event.data?.data?.uid ?? event.data?.data?.id ?? null

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user || !profile) return

        const bookingType =
          access === 'free_allowed' ? 'free_intro' : 'paid_session'

        // Insert booking record
        const { error: insertError } = await supabase.from('bookings').insert({
          user_id: user.id,
          cal_booking_id: calBookingId ? String(calBookingId) : null,
          booking_type: bookingType,
          status: 'confirmed',
        })

        if (insertError) throw insertError

        // Decrement credits for paid sessions
        if (access === 'paid_allowed') {
          await supabase
            .from('profiles')
            .update({ credits: profile.credits - 1 })
            .eq('id', user.id)
        }

        // Mark first_free_used for free sessions
        if (access === 'free_allowed') {
          await supabase
            .from('profiles')
            .update({ first_free_used: true })
            .eq('id', user.id)
        }

        setBookingRecorded(true)
      } catch (err) {
        console.error('Failed to record booking:', err)
        setRecordError(
          err instanceof Error ? err.message : 'Failed to record booking.'
        )
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, profile])

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  if (access === 'loading') {
    return (
      <main className="min-h-screen bg-[#FFF5F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#F28BAE]/30 border-t-[#F28BAE] rounded-full animate-spin" />
          <p className="text-sm text-[#1E2A5E]/50">載入中…</p>
        </div>
      </main>
    )
  }

  if (access === 'unauthenticated') {
    router.push('/auth/login?redirectTo=/booking')
    return null
  }

  if (access === 'no_access') {
    const isPaid = profile?.is_paid ?? false
    return (
      <main className="min-h-screen bg-[#FFF5F0] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-xl font-bold text-[#1E2A5E]">也許妳想找人聊一聊</h1>
              <p className="text-xs text-[#1E2A5E]/40 font-light tracking-wide mt-0.5">
                Maybe She&apos;d Like to Talk
              </p>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[#F28BAE]/20 shadow-lg shadow-[#F28BAE]/10 p-8 text-center">
            <div className="text-5xl mb-4">{isPaid ? '🌙' : '🌸'}</div>
            <h2 className="text-xl font-bold text-[#1E2A5E] mb-2">
              {isPaid ? 'Credits 已用完' : '免費體驗已使用'}
            </h2>
            <p className="text-sm text-[#1E2A5E]/60 leading-relaxed">
              {isPaid
                ? '妳的 session credits 已全部使用完畢。'
                : '妳的免費體驗已完成。'}
              想繼續聊聊嗎？歡迎寫信到{' '}
              <a
                href="mailto:hello@maybeshedliketotalk.org"
                className="font-semibold text-[#F28B6E] hover:underline"
              >
                hello@maybeshedliketotalk.org
              </a>
              ，我們很期待收到妳的來信。
            </p>
            <p className="text-sm text-[#1E2A5E]/50 mt-2 mb-6 leading-relaxed">
              {isPaid
                ? 'You\'ve used all your session credits.'
                : 'Your free intro session has been used.'}{' '}
              Want to keep talking? Email us anytime — we&apos;d love to hear from you.
            </p>

            <a
              href="mailto:hello@maybeshedliketotalk.org"
              className="inline-block px-6 py-3 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors"
            >
              寫信給我們 | Email Us
            </a>

            <div className="mt-4">
              <Link
                href="/dashboard"
                className="text-sm text-[#1E2A5E]/40 hover:text-[#F28B6E] transition-colors"
              >
                ← 返回主頁
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  /* access === 'free_allowed' | 'paid_allowed' */
  return (
    <main className="min-h-screen bg-[#FFF5F0] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <h1 className="text-xl font-bold text-[#1E2A5E]">也許妳想找人聊一聊</h1>
            <p className="text-xs text-[#1E2A5E]/40 font-light tracking-wide mt-0.5">
              Maybe She&apos;d Like to Talk
            </p>
          </Link>
        </div>

        {/* Page heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1E2A5E] text-center">
            {access === 'free_allowed' ? '預約免費體驗' : '預約聊聊'}
          </h2>
          <p className="text-center text-sm text-[#1E2A5E]/50 mt-1">
            {access === 'free_allowed'
              ? 'Book your complimentary intro session below.'
              : `Book a session · ${profile?.credits ?? 0} credit${(profile?.credits ?? 0) !== 1 ? 's' : ''} remaining`}
          </p>
        </div>

        {/* Booking confirmed banner */}
        {bookingRecorded && (
          <div className="mb-6 flex items-start gap-3 bg-[#5BBFB5]/10 border border-[#5BBFB5]/30 rounded-2xl px-5 py-4">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-[#1E2A5E] text-sm">
                預約成功！Booking Confirmed!
              </p>
              <p className="text-xs text-[#1E2A5E]/50 mt-0.5">
                我們期待與妳聊聊。查看妳的電子郵件以獲取詳情。
                <br />
                We look forward to talking with you. Check your email for details.
              </p>
              <Link
                href="/dashboard"
                className="inline-block mt-2 text-xs text-[#F28B6E] font-semibold hover:underline"
              >
                返回主頁 →
              </Link>
            </div>
          </div>
        )}

        {recordError && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            預約已建立，但記錄失敗：{recordError}
            <br />
            <span className="text-xs">
              Booking was made but failed to record. Please contact us.
            </span>
          </div>
        )}

        {/* Info strip */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {(access === 'free_allowed'
            ? [
                { icon: '🎁', text: '免費體驗 · Free Session' },
                { icon: '⏱', text: '約 30 分鐘 · ~30 minutes' },
                { icon: '📹', text: '視訊通話 · Video Call' },
              ]
            : [
                { icon: '💬', text: '深度聊聊 · 1-on-1 Session' },
                { icon: '⏱', text: '約 60 分鐘 · ~60 minutes' },
                { icon: '📹', text: '視訊通話 · Video Call' },
              ]
          ).map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 bg-white border border-[#F28BAE]/20 rounded-full px-3 py-1.5 text-xs text-[#1E2A5E]/60 shadow-sm"
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Cal.com embed */}
        <div className="bg-white rounded-3xl border border-[#F28BAE]/20 shadow-lg shadow-[#F28BAE]/10 overflow-hidden">
          <div
            id="cal-booking"
            ref={calContainerRef}
            style={{ minHeight: '600px', width: '100%' }}
          />
        </div>

        <p className="text-center text-xs text-[#1E2A5E]/30 mt-6">
          由 Cal.com 提供預約服務 · Scheduling powered by Cal.com
        </p>

        <div className="text-center mt-4">
          <Link
            href="/dashboard"
            className="text-sm text-[#1E2A5E]/40 hover:text-[#F28B6E] transition-colors"
          >
            ← 返回主頁 · Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
