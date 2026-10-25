'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF5F0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1E2A5E] leading-snug">
            也許妳想找人聊一聊
          </h1>
          <p className="text-sm text-[#1E2A5E]/60 mt-1 font-light tracking-wide">
            Maybe She&apos;d Like to Talk
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-[#F28BAE]/10 border border-[#F28BAE]/20 px-8 py-10">
          <h2 className="text-xl font-bold text-[#1E2A5E] mb-1">
            登入 <span className="text-[#1E2A5E]/40 font-normal text-base">| Sign In</span>
          </h2>
          <p className="text-sm text-[#1E2A5E]/50 mb-7">
            登入之後，就能回到妳的頁面。
            <br />
            <span className="text-xs">Log in, and you can get back to your page.</span>
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#1E2A5E]/15 bg-white hover:bg-[#FFF5F0] text-[#1E2A5E] font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <span className="w-5 h-5 border-2 border-[#1E2A5E]/20 border-t-[#1E2A5E] rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            使用 Google 登入 &nbsp;
            <span className="text-[#1E2A5E]/50 font-normal">| Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#1E2A5E]/10" />
            <span className="text-xs text-[#1E2A5E]/40 font-medium">
              或 | or
            </span>
            <div className="flex-1 h-px bg-[#1E2A5E]/10" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E2A5E] mb-1.5">
                電子郵件 <span className="text-[#1E2A5E]/40 font-normal">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1E2A5E]/15 bg-[#FFF5F0] text-[#1E2A5E] placeholder-[#1E2A5E]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#F28BAE]/50 focus:border-[#F28BAE] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E2A5E] mb-1.5">
                密碼 <span className="text-[#1E2A5E]/40 font-normal">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1E2A5E]/15 bg-[#FFF5F0] text-[#1E2A5E] placeholder-[#1E2A5E]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#F28BAE]/50 focus:border-[#F28BAE] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  登入中…
                </>
              ) : (
                '登入 | Sign In'
              )}
            </button>
          </form>

          {/* Link to Signup */}
          <p className="mt-6 text-center text-sm text-[#1E2A5E]/50">
            還沒有帳號？{' '}
            <Link
              href="/auth/signup"
              className="text-[#F28B6E] font-semibold hover:text-[#e07a5d] transition-colors"
            >
              立即註冊 | Sign Up
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-[#1E2A5E]/30 leading-relaxed">
          妳的資料我們會好好保護，不會拿去跟別人分享。
          <br />
          We look after your information, and we don&apos;t share it.
        </p>
      </div>
    </main>
  )
}
