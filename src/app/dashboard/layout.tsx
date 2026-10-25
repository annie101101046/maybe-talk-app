import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { pick } from '@/lib/locale'
import { getLocale } from '@/lib/locale-server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: locale === 'zh' ? '妳的頁面' : 'Your page',
    robots: { index: false, follow: false },
  }
}

export interface Profile {
  id: string
  full_name: string | null
  credits: number
  is_paid: boolean
  first_free_used: boolean
  created_at: string
}

export interface DashboardLayoutProps {
  children: React.ReactNode
  profile: Profile
}

async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !data) return null
  return data as Profile
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/dashboard')
  }

  const profile = await getProfile(user.id)

  if (!profile) {
    // Profile should be created on signup; if missing, redirect to complete setup
    redirect('/auth/login')
  }

  const locale = await getLocale()
  const t = (zh: string, en: string) => pick(locale, zh, en)

  return (
    <div className="min-h-screen bg-[#FFF5F0]">
      {/* Top nav bar */}
      <header className="bg-white border-b border-[#F28BAE]/20 shadow-sm shadow-[#F28BAE]/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#1E2A5E] leading-tight">
              {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-sm font-medium text-[#1E2A5E]/70 hover:text-[#1E2A5E] transition-colors"
            >
              {t("旅程", "Journey")}
            </a>

            {/* Profile chip */}
            <div className="flex items-center gap-2 bg-[#FFF5F0] border border-[#F28BAE]/20 rounded-full px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-[#F28BAE]/30 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#F28BAE]">
                  {(profile.full_name ?? user.email ?? '?').charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-medium text-[#1E2A5E] hidden sm:block max-w-[120px] truncate">
                {profile.full_name ?? user.email}
              </span>
            </div>

            {/* Sign out form */}
            <form action="/auth/logout" method="POST">
              <button
                type="submit"
                className="text-xs text-[#1E2A5E]/40 hover:text-[#F28B6E] transition-colors"
              >
                {t("登出", "Log out")}
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Page content — pass profile via a serialisable data attribute so client
          pages can read it; the dashboard page.tsx also fetches it independently
          for full type-safety. Here we inject it as a hidden JSON script tag so
          the client page can access it without an extra round-trip. */}
      <script
        id="__PROFILE_DATA__"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  )
}
