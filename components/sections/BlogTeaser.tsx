import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { blogPosts } from '@/lib/content/blog'
import type { Locale } from '@/i18n/routing'

export function BlogTeaser({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  const posts = blogPosts.slice(0, 3)
  if (posts.length === 0) return null
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Pill tone="outline">{t('blogTitle')}</Pill>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              {t('blogTitle')}
            </h2>
            <p className="mt-2 max-w-xl text-base text-ink/70">{t('blogIntro')}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-semibold text-sea hover:text-ink"
          >
            {t('blogAll')} →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Card
              key={p.slug}
              href={`/${locale}/blog/${p.slug}`}
              as="article"
              className="p-6"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-sea">
                {p.category[locale]} •{' '}
                {new Date(p.publishedAt).toLocaleDateString(
                  locale === 'tr' ? 'tr-TR' : 'en-US',
                  { year: 'numeric', month: 'long' },
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {p.title[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {p.excerpt[locale]}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
