/**
 * Production Supabase project. Also included when NEXT_PUBLIC_SUPABASE_URL
 * points somewhere else, so a local placeholder does not drop the real host.
 */
export const SUPABASE_ORIGIN = "https://bwyhjpthwgmuuobxinbl.supabase.co"

const GUMROAD = ["https://gumroad.com", "https://*.gumroad.com"]

export function createNonce() {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function supabaseConnectSources(extraOrigin?: string | null) {
  const httpsOrigins = new Set<string>([SUPABASE_ORIGIN])
  if (extraOrigin) {
    try {
      const url = new URL(extraOrigin)
      if (url.protocol === "https:") httpsOrigins.add(url.origin)
    } catch {
      // Ignore a malformed env value. The production origin stays allowed.
    }
  }
  const sources = [...httpsOrigins]
  for (const origin of httpsOrigins) {
    sources.push(origin.replace(/^https:/, "wss:"))
  }
  return sources
}

export function buildContentSecurityPolicy(options: {
  nonce: string
  /** React Refresh in `next dev` needs eval. Production does not. */
  allowEval?: boolean
  /** Local http cannot follow upgrade-insecure-requests. */
  upgradeInsecureRequests?: boolean
  supabaseUrl?: string | null
}) {
  const supabase = supabaseConnectSources(options.supabaseUrl)
  const scriptSrc = [
    "'self'",
    `'nonce-${options.nonce}'`,
    ...GUMROAD,
    ...(options.allowEval ? ["'unsafe-eval'"] : []),
  ]
  // 'unsafe-inline' is only on styles. React style attributes and Next font
  // tags need it. A nonce in style-src would make browsers ignore unsafe-inline.
  const styleSrc = ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", ...GUMROAD]
  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    `style-src ${styleSrc.join(" ")}`,
    `img-src 'self' blob: data: ${supabase.filter((source) => source.startsWith("https:")).join(" ")} ${GUMROAD.join(" ")}`,
    `font-src 'self' data: https://fonts.gstatic.com ${GUMROAD.join(" ")}`,
    `connect-src 'self' ${supabase.join(" ")} ${GUMROAD.join(" ")}`,
    `frame-src ${GUMROAD.join(" ")}`,
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    `form-action 'self' ${supabase.filter((source) => source.startsWith("https:")).join(" ")}`,
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    ...(options.upgradeInsecureRequests ? ["upgrade-insecure-requests"] : []),
  ]
  return directives.join("; ")
}
