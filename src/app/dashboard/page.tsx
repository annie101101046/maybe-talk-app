'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { PRICING } from '@/lib/pricing'
import { useLocale } from '@/components/LocaleProvider'
import { pick } from '@/lib/locale'

interface Profile {
  id: string
  full_name: string | null
  created_at: string
}

const TRIMESTERS = [
  {
    period: { zh: '第一孕期', en: 'First trimester' },
    weeks: { zh: '1–12 週', en: 'Weeks 1–12' },
    theme: { zh: '接納與安定', en: 'Acceptance and steadiness' },
    items: [
      { zh: '認識身體的變化', en: 'How your body is changing' },
      { zh: '焦慮時的情緒引導', en: 'A guide for when you feel anxious' },
      { zh: '與寶寶的第一次連結冥想', en: 'A first meditation with the baby' },
    ],
  },
  {
    period: { zh: '第二孕期', en: 'Second trimester' },
    weeks: { zh: '13–27 週', en: 'Weeks 13–27' },
    theme: { zh: '連結與探索', en: 'Connection' },
    items: [
      { zh: '感受胎動的儀式', en: 'A ritual for feeling kicks' },
      { zh: '身體形象與自我接納', en: 'Body image, and being okay with it' },
      { zh: '深化與寶寶的情感連結', en: 'Feeling closer to the baby' },
    ],
  },
  {
    period: { zh: '第三孕期', en: 'Third trimester' },
    weeks: { zh: '28–40 週', en: 'Weeks 28–40' },
    theme: { zh: '準備與期待', en: 'Getting ready' },
    items: [
      { zh: '生產恐懼的溫柔鬆綁', en: "When you're scared of giving birth" },
      { zh: '孕期好眠呼吸練習', en: 'Breathing practice for sleep' },
      { zh: '迎接分娩的正念陪伴', en: 'Company as labor gets closer' },
    ],
  },
]

export default function DashboardPage() {
  const { locale } = useLocale()
  const t = (zh: string, en: string) => pick(locale, zh, en)
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
          <p className="text-sm text-[#1E2A5E]/50">{t('載入中…', 'Loading…')}</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const firstName = profile.full_name?.split(' ')[0] ?? t('妳', 'there')
  const planNames = PRICING.plans.map((plan) => pick(locale, plan.title))
  const planList =
    locale === 'zh'
      ? planNames.join('、')
      : `${planNames.slice(0, -1).join(', ')}, and ${planNames[planNames.length - 1]}`

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2A5E]">
          {t('嗨，', 'Hi,')} {firstName} 👋
        </h2>
        <p className="text-[#1E2A5E]/50 text-sm mt-1">
          {t(
            '這四十週，我們一週一週陪著妳。',
            'These forty weeks, we stay with you one week at a time.',
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            {t('完整旅程', 'Full journey')}
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#F28B6E]">
            40
            <span className="text-lg ml-1">{t('週', 'wks')}</span>
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">{t('從第 1 週到寶寶出生', 'From week 1 until the baby arrives')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            {t('情緒引導', 'Weekly guide')}
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#5BBFB5]">{t('每週', 'Weekly')}</p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">{t('一週一頁，放進這個旅程', 'One page a week, added to this journey')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            {t('冥想練習', 'Meditation')}
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#FFB627]">{t('文字', 'Text')}</p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">{t('引導呼吸，和可以照著唸的冥想文字', 'Guided breathing and read-aloud meditation text')}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#F28BAE]/30 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F28BAE]/15 text-[#F28BAE] text-xs font-semibold mb-3">
            {t('現在預購', 'Pre-order')}
          </span>
          <h3 className="text-lg font-bold text-[#1E2A5E]">
            {t('40 週旅程，三種方案', '40-week journey, three plans')}
          </h3>
          <p className="text-sm text-[#1E2A5E]/60 mt-1 leading-relaxed">
            {locale === 'zh' ? (
              <>
                {planList}。
                <a href={PRICING.freeWeeksUrl} className="underline underline-offset-2 text-[#F28B6E]">
                  {PRICING.freeWeeksNote.zh}
                </a>
                ，{PRICING.currencyNote.zh}。{PRICING.checkoutNote.zh}
              </>
            ) : (
              <>
                {planList}.{' '}
                <a href={PRICING.freeWeeksUrl} className="underline underline-offset-2 text-[#F28B6E]">
                  {PRICING.freeWeeksNote.en}
                </a>
                . {PRICING.currencyNote.en}. {PRICING.checkoutNote.en}
              </>
            )}
          </p>
        </div>
        <Link
          href="/#pricing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200 whitespace-nowrap shadow-sm"
        >
          {t('查看方案', 'See plans')}
        </Link>
      </div>

      <div>
        <h3 className="text-base font-bold text-[#1E2A5E] mb-4">
          {t('旅程預覽', 'Journey preview')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRIMESTERS.map((trimester) => (
            <div
              key={trimester.period.en}
              className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm p-5"
            >
              <p className="text-xs font-semibold text-[#F28B6E] tracking-wide">
                {pick(locale, trimester.weeks)}
              </p>
              <p className="text-base font-bold text-[#1E2A5E] mt-1">{pick(locale, trimester.period)}</p>
              <p className="text-sm text-[#5BBFB5] font-semibold mb-3">{pick(locale, trimester.theme)}</p>
              <ul className="space-y-1.5">
                {trimester.items.map((item) => (
                  <li key={item.en} className="text-sm text-[#1E2A5E]/70 flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F28BAE] flex-shrink-0" />
                    {pick(locale, item)}
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
