'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { FREE_TRIAL_CTA, PRICING } from '@/lib/pricing'
import { useLocale } from '@/components/LocaleProvider'
import { pick } from '@/lib/locale'

interface Profile {
  id: string
  full_name: string | null
  created_at: string
}


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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2A5E]">
          {t('嗨，', 'Hi,')} {firstName} 👋
        </h2>
        <p className="text-[#1E2A5E]/50 text-sm mt-1">
          {locale === 'zh' ? (
            <>
              第 1 到 4 週可以先看。第 5 週之後，請到
              <a href={PRICING.membersUrl} className="underline underline-offset-2 text-[#F28B6E]">
                會員頁
              </a>
              輸入授權碼。
            </>
          ) : (
            <>
              Weeks 1–4 are there to read. From week 5, please enter your license key on the{' '}
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
          <p className="text-sm text-[#1E2A5E] leading-relaxed">
            {t('妳買的那些週，都在會員頁，一週一頁。', 'The weeks you bought are on the Members page, one page each week.')}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-sm text-[#1E2A5E] leading-relaxed">
            {t('每一週可以記一則心情，寫給自己就好。', 'Each week you can write one note, just for yourself.')}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5 p-5">
          <p className="text-sm text-[#1E2A5E] leading-relaxed">
            {t('整個孕期有 3 次陪妳聊聊。', 'Through the pregnancy there are three chats with us.')}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#F28BAE]/30 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#1E2A5E]">
            {t('如果還想繼續走下去', "If you'd like to keep going")}
          </h3>
          <p className="text-sm text-[#1E2A5E]/60 mt-1 leading-relaxed">
            {locale === 'zh' ? (
              <>
                <a href={PRICING.freeWeeksUrl} className="underline underline-offset-2 text-[#F28B6E]">
                  {PRICING.freeWeeksNote.zh}
                </a>
                。第 5 週起才需要付費。{PRICING.currencyNote.zh}{PRICING.notMedicalAdvice.zh}
              </>
            ) : (
              <>
                <a href={PRICING.freeWeeksUrl} className="underline underline-offset-2 text-[#F28B6E]">
                  {PRICING.freeWeeksNote.en}
                </a>
                . You pay from week 5. {PRICING.currencyNote.en} {PRICING.notMedicalAdvice.en}
              </>
            )}
          </p>
        </div>
        <a
          href={PRICING.freeWeeksUrl}
          className="inline-flex items-center justify-center min-h-11 gap-2 px-6 py-3 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200 whitespace-nowrap shadow-sm"
        >
          {pick(locale, FREE_TRIAL_CTA)}
        </a>
      </div>

      <p className="text-sm text-[#1E2A5E]/70 leading-relaxed">
        {t(
          '每一週會先寫身體，再寫心情，最後是怎麼準備寶寶。另外還有一份可以列印的 PDF。',
          'Each week starts with your body, then your mood, then getting ready for the baby. There is also a PDF you can print.',
        )}
      </p>
    </div>
  )
}
