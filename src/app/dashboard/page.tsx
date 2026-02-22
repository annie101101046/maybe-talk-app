'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

interface Profile {
  id: string
  full_name: string | null
  credits: number
  is_paid: boolean
  first_free_used: boolean
  stripe_customer_id: string | null
  created_at: string
}

interface Booking {
  id: string
  booking_type: string
  status: string
  created_at: string
  cal_booking_id: string | null
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: 'bg-[#5BBFB5]/15 text-[#5BBFB5] border-[#5BBFB5]/30',
    pending: 'bg-[#FFB627]/15 text-[#FFB627] border-[#FFB627]/30',
    cancelled: 'bg-red-50 text-red-400 border-red-200',
    completed: 'bg-[#1E2A5E]/10 text-[#1E2A5E]/60 border-[#1E2A5E]/15',
  }
  const label: Record<string, string> = {
    confirmed: '已確認',
    pending: '待確認',
    cancelled: '已取消',
    completed: '已完成',
  }
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}
    >
      {label[status] ?? status}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login?redirectTo=/dashboard')
        return
      }

      // Try reading the profile injected by the server layout first
      const inlineScript = document.getElementById('__PROFILE_DATA__')
      if (inlineScript) {
        try {
          const parsed = JSON.parse(inlineScript.textContent ?? '{}')
          if (parsed.id) {
            setProfile(parsed as Profile)
          }
        } catch {
          // fallthrough to fetch
        }
      }

      // Always fetch fresh profile data from Supabase
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) setProfile(profileData as Profile)

      const { data: bookingData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (bookingData) setBookings(bookingData as Booking[])

      setLoading(false)
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#F28BAE]/30 border-t-[#F28BAE] rounded-full animate-spin" />
          <p className="text-sm text-[#1E2A5E]/50">載入中…</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const firstName = profile.full_name?.split(' ')[0] ?? '妳'
  const totalBookings = bookings.length

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2A5E]">
          嗨，{firstName} 👋
        </h2>
        <p className="text-[#1E2A5E]/50 text-sm mt-1">
          Hi {profile.full_name ?? ''}! Here&apos;s your overview.
        </p>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Credits card */}
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            剩餘點數 · Credits
          </p>
          <p
            className={`text-5xl font-extrabold leading-none ${profile.is_paid ? 'text-[#5BBFB5]' : 'text-[#F28B6E]'}`}
          >
            {profile.is_paid ? profile.credits : profile.first_free_used ? 0 : '✦'}
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">
            {profile.is_paid
              ? `${profile.credits} session${profile.credits !== 1 ? 's' : ''} available`
              : profile.first_free_used
              ? '免費體驗已使用'
              : '免費體驗可預約'}
          </p>
        </div>

        {/* Membership card */}
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            會員狀態 · Membership
          </p>
          {profile.is_paid ? (
            <>
              <p className="text-2xl font-extrabold text-[#F28BAE]">Premium</p>
              <p className="text-xs text-[#1E2A5E]/40 mt-2">孕期陪伴方案已啟用</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-extrabold text-[#1E2A5E]/40">Free</p>
              <p className="text-xs text-[#1E2A5E]/40 mt-2">免費體驗方案</p>
            </>
          )}
        </div>

        {/* Total sessions card */}
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            已預約次數 · Total Sessions
          </p>
          <p className="text-5xl font-extrabold text-[#FFB627] leading-none">
            {totalBookings}
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">
            {totalBookings === 0 ? '尚未預約' : `共 ${totalBookings} 次聊聊`}
          </p>
        </div>
      </div>

      {/* Action panel */}
      <div>
        {!profile.is_paid ? (
          /* --- Free user --- */
          !profile.first_free_used ? (
            /* Has not used free session */
            <div className="bg-white rounded-2xl border border-[#5BBFB5]/30 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1E2A5E]">
                  妳有一次免費體驗！
                </h3>
                <p className="text-sm text-[#1E2A5E]/50 mt-1">
                  You have a free intro session waiting. No commitment needed.
                </p>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5BBFB5] hover:bg-[#4aaea4] text-white font-semibold text-sm transition-colors duration-200 whitespace-nowrap shadow-sm"
              >
                預約免費體驗
                <span className="opacity-70 font-normal">| Book Now</span>
              </Link>
            </div>
          ) : (
            /* Free session already used — upsell */
            <div className="bg-white rounded-2xl border border-[#F28BAE]/30 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F28BAE]/15 text-[#F28BAE] text-xs font-semibold mb-3">
                    升級方案 | Upgrade
                  </span>
                  <h3 className="text-xl font-bold text-[#1E2A5E]">
                    孕期陪伴方案
                    <span className="ml-2 text-base font-normal text-[#1E2A5E]/50">
                      Pregnancy Support Package
                    </span>
                  </h3>
                  <p className="text-sm text-[#1E2A5E]/60 mt-2 leading-relaxed">
                    妳的免費體驗已完成。繼續陪伴妳的孕期旅程 ✦
                  </p>

                  <ul className="mt-4 space-y-2">
                    {[
                      { zh: '4 次深度聊聊 sessions', en: '4 one-on-one sessions' },
                      { zh: '無限制課程內容存取', en: 'Unlimited content access' },
                      { zh: '孕期 Bootcamp 參與資格', en: 'Bootcamp access' },
                      { zh: '支持社群加入', en: 'Community membership' },
                    ].map((item) => (
                      <li key={item.zh} className="flex items-start gap-2 text-sm">
                        <span className="text-[#5BBFB5] font-bold mt-0.5">✓</span>
                        <span className="text-[#1E2A5E]">
                          {item.zh}{' '}
                          <span className="text-[#1E2A5E]/40 text-xs">{item.en}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:w-56 flex flex-col items-center justify-center bg-[#FFF5F0] rounded-xl p-5 text-center gap-3">
                  <p className="text-3xl font-extrabold text-[#F28B6E]">$250</p>
                  <p className="text-xs text-[#1E2A5E]/50">USD · 一次性付款</p>
                  <Link
                    href="/checkout"
                    className="w-full py-2.5 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200 text-center block"
                  >
                    升級方案 | Upgrade
                  </Link>
                </div>
              </div>
            </div>
          )
        ) : (
          /* --- Paid user --- */
          profile.credits > 0 ? (
            <div className="bg-white rounded-2xl border border-[#5BBFB5]/30 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1E2A5E]">
                  妳還有 {profile.credits} 次 session
                </h3>
                <p className="text-sm text-[#1E2A5E]/50 mt-1">
                  You have {profile.credits} session{profile.credits !== 1 ? 's' : ''}{' '}
                  remaining. Ready to chat?
                </p>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200 whitespace-nowrap shadow-sm"
              >
                預約聊聊
                <span className="opacity-70 font-normal">| Book a Session</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#1E2A5E]/10 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#1E2A5E]">Credits 已用完</h3>
              <p className="text-sm text-[#1E2A5E]/50 mt-1">
                You&apos;ve used all your sessions. Reach out if you&apos;d like more.
              </p>
              <a
                href="mailto:hello@maybetalk.com"
                className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-[#F28BAE]/40 text-[#F28BAE] font-semibold text-sm hover:bg-[#F28BAE]/10 transition-colors"
              >
                聯絡我們 | Contact Us
              </a>
            </div>
          )
        )}
      </div>

      {/* Recent bookings */}
      <div>
        <h3 className="text-base font-bold text-[#1E2A5E] mb-4">
          最近預約紀錄{' '}
          <span className="text-[#1E2A5E]/40 font-normal text-sm">Recent Bookings</span>
        </h3>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F28BAE]/15 p-8 text-center">
            <p className="text-4xl mb-3">🌸</p>
            <p className="text-[#1E2A5E]/50 text-sm">
              尚無預約紀錄。
              <br />
              <span className="text-xs">No bookings yet — your journey starts here.</span>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm divide-y divide-[#F28BAE]/10 overflow-hidden">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-[#FFF5F0]/60 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-[#1E2A5E]">
                    {booking.booking_type === 'free_intro'
                      ? '免費體驗 · Free Intro'
                      : booking.booking_type === 'paid_session'
                      ? '深度聊聊 · Paid Session'
                      : booking.booking_type}
                  </p>
                  <p className="text-xs text-[#1E2A5E]/40 mt-0.5">
                    {formatDate(booking.created_at)}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
