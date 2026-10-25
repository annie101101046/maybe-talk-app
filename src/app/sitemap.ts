import type { MetadataRoute } from "next"
import { APP_ORIGIN } from "@/lib/seo"

/** Indexable routes that exist only on this app. The homepage is a copy of the main site, so it stays out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-25")
  return [
    {
      url: `${APP_ORIGIN}/auth/login`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${APP_ORIGIN}/auth/signup`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
