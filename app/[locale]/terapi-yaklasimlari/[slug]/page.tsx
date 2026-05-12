import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { therapyApproaches, approachBySlug } from '@/lib/content/approaches'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    therapyApproaches.map((a) => ({ locale, slug: a.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const a = approachBySlug(slug)
  if (!a) return {}
  return {
    title: `${a.title[locale as Locale]} — ${locale === 'tr' ? 'Klinik Psikolog' : 'Clinical Psychologist'} Gamze Sevin`,
    description: a.ozet[locale as Locale],
    alternates: {
      canonical: `/${locale}/terapi-yaklasimlari/${slug}`,
    },
  }
}

export default async function ApproachDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const tNav = await getTranslations('nav')

  const a = approachBySlug(slug)
  if (!a) notFound()

  return (
    <>
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <Link
            href={`/${locale}/terapi-yaklasimlari`}
            className="text-sm font-semibold text-sea hover:text-ink"
          >
            ← {locale === 'tr' ? 'Tüm yaklaşımlar' : 'All approaches'}
          </Link>
          <Pill className="mt-6" tone="outline">
            {locale === 'tr' ? 'Yaklaşım' : 'Approach'}
          </Pill>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold text-ink sm:text-5xl">
            {a.title[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 lg:text-lg">
            {a.ozet[locale]}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {a.body[locale].map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
            {a.kaynaklar && (
              <div className="mt-8 rounded-2xl bg-cream-soft p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-sea">
                  {t('sources')}
                </div>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  {a.kaynaklar[locale].map((k) => (
                    <li key={k}>• {k}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-card bg-cream p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-sea">
                {t('duration')}
              </div>
              <div className="mt-2 text-base font-semibold text-ink">
                {a.sure[locale]}
              </div>
            </div>
            <div className="rounded-card bg-sand p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                {t('suitableFor')}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {a.kimlereUygun[locale].map((k) => (
                  <li key={k}>• {k}</li>
                ))}
              </ul>
            </div>
            <Button href={`/${locale}/iletisim`} size="lg" className="w-full justify-center">
              {tNav('appointment')}
            </Button>
          </aside>
        </Container>
      </section>
    </>
  )
}
