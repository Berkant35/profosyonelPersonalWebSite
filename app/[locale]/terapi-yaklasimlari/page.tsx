import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { therapyApproaches } from '@/lib/content/approaches'
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
  const isTr = locale === 'tr'
  return {
    title: isTr ? 'Terapi Yaklaşımları — BDT, EMDR, SÇT' : 'Therapy Approaches — CBT, EMDR, PST',
    description: isTr
      ? 'Bilimsel kanıta dayalı üç ana terapi ekolü: Bilişsel Davranışçı Terapi, EMDR ve Sorun Çözme Terapisi.'
      : 'Three evidence-based therapy modalities: Cognitive Behavioral Therapy, EMDR and Problem-Solving Therapy.',
    alternates: { canonical: `/${locale}/terapi-yaklasimlari` },
  }
}

export default async function ApproachesIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('approaches')

  return (
    <>
      <PageHeader title={t('indexTitle')} intro={t('indexIntro')} />
      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {therapyApproaches.map((a) => (
            <Card
              key={a.slug}
              as="article"
              href={`/${locale}/terapi-yaklasimlari/${a.slug}`}
              className="flex h-full flex-col p-6"
            >
              <h2 className="text-xl font-semibold text-ink">{a.title[locale]}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                {a.ozet[locale]}
              </p>
              <dl className="mt-5 grid gap-2 text-xs text-ink/70">
                <div>
                  <dt className="font-semibold uppercase tracking-[0.08em] text-sea">
                    {t('duration')}
                  </dt>
                  <dd className="mt-1">{a.sure[locale]}</dd>
                </div>
              </dl>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sea">
                {locale === 'tr' ? 'Detay' : 'Details'} →
              </span>
            </Card>
          ))}
        </Container>
      </section>
    </>
  )
}
