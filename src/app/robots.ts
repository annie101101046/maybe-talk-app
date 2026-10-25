import type { MetadataRoute } from "next"
import { APP_ORIGIN } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/admin", "/auth/callback", "/auth/confirm"],
    },
    sitemap: `${APP_ORIGIN}/sitemap.xml`,
    host: APP_ORIGIN,
  }
}
