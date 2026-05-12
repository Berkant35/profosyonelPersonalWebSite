import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { therapyApproaches } from '@/lib/content/approaches'
import { conditionAreas } from '@/lib/content/conditions'
import { blogPosts } from '@/lib/content/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gamzesevin.com'

const STATIC_PATHS = [
  '',
  '/hakkimda',
  '/terapi-yaklasimlari',
  '/calisma-alanlari',
  '/online-terapi',
  '/blog',
  '/iletisim',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${SITE_URL}/tr${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: path === '' ? 1.0 : 0.7,
      alternates: {
        languages: {
          tr: `${SITE_URL}/tr${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    })
  }

  for (const locale of routing.locales) {
    for (const a of therapyApproaches) {
      entries.push({
        url: `${SITE_URL}/${locale}/terapi-yaklasimlari/${a.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
    for (const c of conditionAreas) {
      entries.push({
        url: `${SITE_URL}/${locale}/calisma-alanlari/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
    for (const p of blogPosts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  return entries
}
