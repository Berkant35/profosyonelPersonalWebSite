import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { conditionAreas, conditionBySlug } from '@/lib/content/conditions'
import { approachBySlug } from '@/lib/content/approaches'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    conditionAreas.map((c) => ({ locale, slug: c.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const c = conditionBySlug(slug)
  if (!c) return {}
  return {
    title: `${c.title[locale as Locale]} — ${locale === 'tr' ? 'İzmir Klinik Psikolog' : 'Clinical Psychologist'} Gamze Sevin`,
    description: c.ozet[locale as Locale],
    alternates: {
      canonical: `/${locale}/calisma-alanlari/${slug}`,
    },
  }
}

export default async function ConditionDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('conditions')
  const tNav = await getTranslations('nav')

  const c = conditionBySlug(slug)
  if (!c) notFound()

  const recommended = approachBySlug(c.onerilenYaklasim)

  return (
    <>
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <Link
            href={`/${locale}/calisma-alanlari`}
            className="text-sm font-semibold text-sea hover:text-ink"
          >
            ← {locale === 'tr' ? 'Tüm çalışma alanları' : 'All practice areas'}
          </Link>
          <Pill className="mt-6" tone="outline">
            {c.category === 'ruhsal' ? t('categoryRuhsal') : t('categoryDiger')}
          </Pill>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold text-ink sm:text-5xl">
            {c.title[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 lg:text-lg">
            {c.ozet[locale]}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <div>
              <h2 className="text-2xl font-semibold text-ink">{t('symptoms')}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {c.belirtiler[locale].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 rounded-2xl bg-cream-soft p-3 text-sm text-ink"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-ink/85">
              {c.body[locale].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-6 lg:col-span-4">
            {recommended && (
              <div className="rounded-card bg-sand p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                  {t('approach')}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {recommended.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-ink/80">
                  {recommended.ozet[locale]}
                </p>
                <Link
                  href={`/${locale}/terapi-yaklasimlari/${recommended.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-sea hover:text-ink"
                >
                  {locale === 'tr' ? 'Yaklaşım detayı' : 'Approach details'} →
                </Link>
              </div>
            )}
            <Button href={`/${locale}/iletisim`} size="lg" className="w-full justify-center">
              {tNav('appointment')}
            </Button>
          </aside>
        </Container>
      </section>
    </>
  )
}
