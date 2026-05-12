import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/content/JsonLd'
import { blogPosts, blogPostBySlug } from '@/lib/content/blog'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((p) => ({ locale, slug: p.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const p = blogPostBySlug(slug)
  if (!p) return {}
  return {
    title: p.title[locale as Locale],
    description: p.excerpt[locale as Locale],
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: p.title[locale as Locale],
      description: p.excerpt[locale as Locale],
      publishedTime: p.publishedAt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('common')

  const p = blogPostBySlug(slug)
  if (!p) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title[locale],
    description: p.excerpt[locale],
    datePublished: p.publishedAt,
    author: { '@type': 'Person', name: p.author },
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article className="bg-white">
        <section className="bg-cream py-16 lg:py-20">
          <Container>
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-semibold text-sea hover:text-ink"
            >
              ← {locale === 'tr' ? 'Tüm yazılar' : 'All posts'}
            </Link>
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-sea">
              {p.category[locale]} •{' '}
              {new Date(p.publishedAt).toLocaleDateString(
                locale === 'tr' ? 'tr-TR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </div>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold text-ink sm:text-5xl">
              {p.title[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 lg:text-lg">
              {p.excerpt[locale]}
            </p>
          </Container>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-ink/85 lg:text-lg">
              {p.body[locale].map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-3xl text-sm text-ink/60">
              — {p.author}
            </p>
          </Container>
        </section>
      </article>
    </>
  )
}
