import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: '管理後台',
  robots: { index: false, follow: false },
}

const NAV_LINKS = [
  { href: '/admin', label: '總覽', labelEn: 'Overview', icon: '◈' },
  { href: '/admin/users', label: '用戶', labelEn: 'Users', icon: '◉' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/admin')
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || user.email !== adminEmail) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#FFF5F0] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#1E2A5E] text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F28BAE]/30 flex items-center justify-center">
            <span className="text-[#F28BAE] font-black text-sm">A</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-xs text-white/40 font-light">也許妳想找人聊一聊</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs text-white/40 truncate max-w-[200px]">
            {user.email}
          </span>
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            ← 回到網站
          </Link>
          <form action="/auth/logout" method="POST">
            <button
              type="submit"
              className="text-xs text-white/40 hover:text-[#F28BAE] transition-colors"
            >
              登出
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden sm:flex flex-col w-52 bg-white border-r border-[#F28BAE]/15 pt-6 pb-10 gap-1 shadow-sm">
          <p className="px-4 mb-2 text-[10px] font-semibold text-[#1E2A5E]/30 uppercase tracking-widest">
            管理選單
          </p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mx-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#1E2A5E]/70 hover:bg-[#FFF5F0] hover:text-[#1E2A5E] transition-colors group"
            >
              <span className="text-[#F28BAE] group-hover:text-[#F28B6E] transition-colors">
                {link.icon}
              </span>
              <span>
                {link.label}
                <span className="ml-1.5 text-xs text-[#1E2A5E]/30 font-normal">
                  {link.labelEn}
                </span>
              </span>
            </Link>
          ))}
        </aside>

        {/* Mobile nav strip */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F28BAE]/20 flex z-40 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-1 flex flex-col items-center justify-center min-h-11 py-2 gap-0.5 text-[#1E2A5E]/50 hover:text-[#F28B6E] transition-colors"
            >
              <span className="text-lg leading-none">{link.icon}</span>
              <span className="text-[9px] font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-8 py-8 pb-24 sm:pb-8 max-w-6xl w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
