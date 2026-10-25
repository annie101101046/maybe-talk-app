import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { buildContentSecurityPolicy, createNonce } from '@/lib/content-security-policy'
import { LOCALE_COOKIE, LOCALE_MAX_AGE, parseLocale } from '@/lib/locale'
import { applySecurityHeaders } from '@/lib/security-headers'

/**
 * Routes that require an authenticated user.
 */
const PROTECTED_ROUTES = ['/dashboard']

/**
 * Routes that require admin privileges (matched by ADMIN_EMAIL env var).
 */
const ADMIN_ROUTES = ['/admin']

function contentSecurityPolicy(request: NextRequest) {
  const host = request.nextUrl.hostname
  const isLocal = host === 'localhost' || host === '127.0.0.1'
  const nonce = createNonce()
  const csp = buildContentSecurityPolicy({
    nonce,
    allowEval: process.env.NODE_ENV === 'development',
    upgradeInsecureRequests: !isLocal,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  })
  return { csp, nonce }
}

function nextWithSecurity(request: NextRequest, csp: string, nonce: string) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Content-Security-Policy', csp)
  requestHeaders.set('x-nonce', nonce)
  const cookie = request.cookies
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ')
  if (cookie) requestHeaders.set('cookie', cookie)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  applySecurityHeaders(response.headers, csp)
  return response
}

function rememberLocale(response: NextResponse, lang: 'zh' | 'en' | null) {
  if (!lang) return response
  response.cookies.set(LOCALE_COOKIE, lang, {
    path: '/',
    maxAge: LOCALE_MAX_AGE,
    sameSite: 'lax',
  })
  return response
}

export async function middleware(request: NextRequest) {
  const lang = parseLocale(request.nextUrl.searchParams.get('lang'))
  if (lang) request.cookies.set(LOCALE_COOKIE, lang)

  const { csp, nonce } = contentSecurityPolicy(request)
  let supabaseResponse = nextWithSecurity(request, csp, nonce)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = nextWithSecurity(request, csp, nonce)
          rememberLocale(supabaseResponse, lang)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do not run any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // --- Admin route protection ---
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  if (isAdminRoute) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return rememberLocale(secureRedirect(redirectUrl, csp), lang)
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (!adminEmail || user.email !== adminEmail) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      return rememberLocale(secureRedirect(redirectUrl, csp), lang)
    }

    return rememberLocale(supabaseResponse, lang)
  }

  // --- Protected route protection ---
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return rememberLocale(secureRedirect(redirectUrl, csp), lang)
  }

  return rememberLocale(supabaseResponse, lang)
}

function secureRedirect(url: URL, csp: string) {
  const response = NextResponse.redirect(url)
  applySecurityHeaders(response.headers, csp)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any file extension (e.g., .png, .svg, .jpg)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
