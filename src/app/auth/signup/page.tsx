'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGoogleSignup = async () => {
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

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          due_date: dueDate || null,
        },
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#FFF5F0] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1E2A5E] leading-snug">
              也許妳想找人聊一聊
            </h1>
            <p className="text-sm text-[#1E2A5E]/60 mt-1 font-light tracking-wide">
              Maybe She&apos;d Like to Talk
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg shadow-[#F28BAE]/10 border border-[#F28BAE]/20 px-8 py-10 text-center">
            {/* Confirmation icon */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#F28BAE]/15 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#F28BAE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-[#1E2A5E] mb-2">
              請到信箱確認一下
            </h2>
            <p className="text-sm text-[#1E2A5E]/50 mb-1">
              Please check your email
            </p>
            <p className="text-sm text-[#1E2A5E]/60 mt-4 leading-relaxed">
              確認信已經寄到 <span className="font-semibold text-[#F28B6E]">{email}</span>。
              <br />
              點開信裡的連結，註冊就完成了。
            </p>
            <p className="text-xs text-[#1E2A5E]/40 mt-2">
              We sent a confirmation note to your email. Open the link, and your account is ready.
            </p>

            <Link
              href="/auth/login"
              className="mt-8 inline-block px-6 py-2.5 rounded-xl bg-[#F28B6E] hover:bg-[#e07a5d] text-white font-semibold text-sm transition-colors duration-200"
            >
              回到登入 | Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    )
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
            註冊 <span className="text-[#1E2A5E]/40 font-normal text-base">| Sign Up</span>
          </h2>
          <p className="text-sm text-[#1E2A5E]/50 mb-7">
            先留下妳的名字吧。第 1 到 4 週可以先看。
            <br />
            <span className="text-xs">Leave your name. Weeks 1–4 are there for you to read.</span>
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignup}
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
            使用 Google 註冊 &nbsp;
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

          {/* Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A5E] mb-1.5">
                姓名 <span className="text-[#1E2A5E]/40 font-normal">Full Name</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="妳的姓名"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1E2A5E]/15 bg-[#FFF5F0] text-[#1E2A5E] placeholder-[#1E2A5E]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#F28BAE]/50 focus:border-[#F28BAE] transition-colors"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A5E] mb-1.5">
                密碼 <span className="text-[#1E2A5E]/40 font-normal">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="至少 6 個字元 | Min. 6 characters"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1E2A5E]/15 bg-[#FFF5F0] text-[#1E2A5E] placeholder-[#1E2A5E]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#F28BAE]/50 focus:border-[#F28BAE] transition-colors"
              />
            </div>

            {/* Expected Due Date (optional) */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A5E] mb-1.5">
                預產期{' '}
                <span className="text-[#1E2A5E]/40 font-normal">Expected Due Date</span>
                <span className="ml-1 text-xs text-[#5BBFB5] font-normal">（選填 | Optional）</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
                  建立帳號中…
                </>
              ) : (
                '建立帳號 | Create Account'
              )}
            </button>
          </form>

          {/* Link to Login */}
          <p className="mt-6 text-center text-sm text-[#1E2A5E]/50">
            已有帳號？{' '}
            <Link
              href="/auth/login"
              className="text-[#F28B6E] font-semibold hover:text-[#e07a5d] transition-colors"
            >
              立即登入 | Sign In
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
