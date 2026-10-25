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

const PARTS = [
  {
    period: { zh: '身', en: 'Body' },
    weeks: { zh: '接著', en: 'Then' },
    theme: { zh: '身體這一段', en: 'The body part' },
    items: [] as { zh: string; en: string }[],
  },
  {
    period: { zh: '心', en: 'Mind' },
    weeks: { zh: '接著', en: 'Then' },
    theme: { zh: '心情這一段', en: 'The mind part' },
    items: [] as { zh: string; en: string }[],
  },
  {
    period: { zh: '新生兒', en: 'Newborn prep' },
    weeks: { zh: '接著', en: 'Then' },
    theme: { zh: '準備寶寶這一段', en: 'The newborn part' },
    items: [] as { zh: string; en: string }[],
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
          {locale === 'zh' ? (
            <>
              授權碼寄到信箱。到
              <a href={PRICING.membersUrl} className="underline underline-offset-2 text-[#F28B6E]">
                會員頁
              </a>
              輸入。
            </>
          ) : (
            <>
              The license key comes by email. Enter it on the{' '}
              <a href={PRICING.membersUrl} className="underline underline-offset-2 text-[#F28B6E]">
                Members page
              </a>
              .
            </>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            {t('整個孕期', 'Whole pregnancy')}
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#F28B6E]">
            40
            <span className="text-lg ml-1">{t('週', 'wks')}</span>
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">{t('在會員頁', 'On the Members page')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            {t('每週開頭', 'Opens each week')}
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#5BBFB5]">
            30
            <span className="text-lg ml-1">{t('秒', 'sec')}</span>
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">{t('再看身、心、新生兒', 'Then body, mind, newborn prep')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-xs font-medium text-[#1E2A5E]/50 uppercase tracking-widest mb-2">
            {t('一對一', 'One-on-one')}
          </p>
          <p className="text-5xl font-extrabold leading-none text-[#FFB627]">
            3
            <span className="text-lg ml-1">{t('次', '')}</span>
          </p>
          <p className="text-xs text-[#1E2A5E]/40 mt-2">Google Meet</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#F28BAE]/30 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F28BAE]/15 text-[#F28BAE] text-xs font-semibold mb-3">
            {t('會員頁', 'Members')}
          </span>
          <h3 className="text-lg font-bold text-[#1E2A5E]">
            {t('三種方案', 'Three plans')}
          </h3>
          <p className="text-sm text-[#1E2A5E]/60 mt-1 leading-relaxed">
            {locale === 'zh' ? (
              <>
                {planList}。
                <a href={PRICING.freeWeeksUrl} className="underline underline-offset-2 text-[#F28B6E]">
                  {PRICING.freeWeeksNote.zh}
                </a>
                。{PRICING.includesNote.zh}
                {PRICING.notMedicalAdvice.zh}
              </>
            ) : (
              <>
                {planList}.{' '}
                <a href={PRICING.freeWeeksUrl} className="underline underline-offset-2 text-[#F28B6E]">
                  {PRICING.freeWeeksNote.en}
                </a>
                . {PRICING.includesNote.en} {PRICING.notMedicalAdvice.en}
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
          {t('先 30 秒，再看這三段', '30 seconds, then these three parts')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PARTS.map((trimester) => (
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
