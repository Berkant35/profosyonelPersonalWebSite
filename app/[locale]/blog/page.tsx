import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { blogPosts } from '@/lib/content/blog'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'tr' ? 'Blog — Gamze Sevin' : 'Blog — Gamze Sevin',
    description:
      locale === 'tr'
        ? 'Terapi, ruh sağlığı ve günlük hayata dair yazılar.'
        : 'Notes on therapy, mental health and everyday life.',
    alternates: { canonical: `/${locale}/blog` },
  }
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('common')

  return (
    <>
      <PageHeader
        title={locale === 'tr' ? 'Blog' : 'Blog'}
        intro={
          locale === 'tr'
            ? 'Terapi, ruh sağlığı ve günlük hayata dair yazılar.'
            : 'Notes on therapy, mental health and everyday life.'
        }
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          {blogPosts.length === 0 ? (
            <p className="text-base text-ink/70">{t('noPosts')}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((p) => (
                <Card
                  key={p.slug}
                  as="article"
                  href={`/${locale}/blog/${p.slug}`}
                  className="flex h-full flex-col p-6"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-sea">
                    {p.category[locale]} •{' '}
                    {new Date(p.publishedAt).toLocaleDateString(
                      locale === 'tr' ? 'tr-TR' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' },
                    )}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-ink">
                    {p.title[locale]}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                    {p.excerpt[locale]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sea">
                    {t('readMore')} →
                  </span>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
