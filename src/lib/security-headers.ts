/** Headers scored by securityheaders.com, plus COOP. CSP is added per request. */
export const SECURITY_HEADERS: { key: string; value: string }[] = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    // payment is left unset so a Gumroad checkout iframe is not denied it.
    value: [
      "accelerometer=()",
      "bluetooth=()",
      "camera=()",
      "display-capture=()",
      "geolocation=()",
      "gyroscope=()",
      "hid=()",
      "interest-cohort=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "serial=()",
      "usb=()",
    ].join(", "),
  },
]

export function applySecurityHeaders(headers: Headers, contentSecurityPolicy: string) {
  headers.set("Content-Security-Policy", contentSecurityPolicy)
  for (const header of SECURITY_HEADERS) {
    headers.set(header.key, header.value)
  }
}
