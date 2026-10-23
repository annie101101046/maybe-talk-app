'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { PRICING } from '@/lib/pricing'

interface Profile {
  id: string
  full_name: string | null
  created_at: string
}

const TRIMESTERS = [
  {
    period: '第一孕期',
    weeks: '1–12 週',
    en: 'First Trimester',
    theme: '接納與安定',
    items: ['認識身體的變化', '焦慮時的情緒引導', '與寶寶的第一次連結冥想'],
  },
  {
    period: '第二孕期',
    weeks: '13–27 週',
    en: 'Second Trimester',
    theme: '連結與探索',
    items: ['感受胎動的儀式', '身體形象與自我接納', '深化與寶寶的情感連結'],
  },
  {
    period: '第三孕期',
    weeks: '28–40 週',
    en: 'Third Trimester',
    theme: '準備與期待',
    items: ['生產恐懼的溫柔鬆綁', '孕期好眠呼吸練習', '迎接分娩的正念陪伴'],
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
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

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, full_name, created_at')
        .eq('id', user.id)
        .single()

      if (profileData) setProfile(profileData as Profile)

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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2A5E]">
          嗨，{firstName} 👋
        </h2>
        <p className="text-[#1E2A5E]/50 text-sm mt-1">
          這四十週，我們一週一週陪著妳。
          <br />
          <span className="text-xs">
            Your 40-week journey — a weekly emotional guide and meditation practice.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            完整旅程 · Full Journey
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#F28B6E]">
            40
            <span className="text-lg ml-1">週</span>
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">從第 1 週到寶寶出生</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            情緒引導 · Weekly Guide
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#5BBFB5]">每週</p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">一週一則，寫給這個週數</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            冥想練習 · Meditation
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#FFB627]">∞</p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">呼吸、冥想與好眠，隨時可以回來</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#F28BAE]/30 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F28BAE]/15 text-[#F28BAE] text-xs font-semibold mb-3">
            現在可以買 | Available now
          </span>
          <h3 className="text-lg font-bold text-[#1E2A5E]">
            40 週旅程，三種方案
          </h3>
          <p className="text-sm text-[#1E2A5E]/60 mt-1 leading-relaxed">
            單一孕期、全孕期通行證、送禮版。{PRICING.freeWeeksNote.zh}，{PRICING.currencyNote.zh}。{PRICING.checkoutNote.zh}
          </p>
          <p className="text-sm text-[#1E2A5E]/50 mt-1">
            Single Trimester, Full Pregnancy Pass, and Gift Edition. {PRICING.freeWeeksNote.en}. {PRICING.currencyNote.en}. {PRICING.checkoutNote.en}
          </p>
        </div>
        <Link
          href="/#pricing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200 whitespace-nowrap shadow-sm"
        >
          查看方案
          <span className="opacity-70 font-normal">| See plans</span>
        </Link>
      </div>

      <div>
        <h3 className="text-base font-bold text-[#1E2A5E] mb-4">
          旅程預覽{' '}
          <span className="text-[#1E2A5E]/40 font-normal text-sm">Journey Preview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRIMESTERS.map((trimester) => (
            <div
              key={trimester.period}
              className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm p-5"
            >
              <p className="text-xs font-semibold text-[#F28B6E] tracking-wide">
                {trimester.weeks}
                <span className="text-[#1E2A5E]/30 font-normal ml-1.5">{trimester.en}</span>
              </p>
              <p className="text-base font-bold text-[#1E2A5E] mt-1">{trimester.period}</p>
              <p className="text-sm text-[#5BBFB5] font-semibold mb-3">{trimester.theme}</p>
              <ul className="space-y-1.5">
                {trimester.items.map((item) => (
                  <li key={item} className="text-sm text-[#1E2A5E]/70 flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F28BAE] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
