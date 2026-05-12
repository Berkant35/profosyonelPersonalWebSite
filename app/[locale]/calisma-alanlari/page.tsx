import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { conditionAreas, conditionsByCategory } from '@/lib/content/conditions'
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
    title: isTr ? 'Çalışma Alanları — Klinik Psikolog Gamze Sevin' : 'Areas of Practice — Clinical Psychologist Gamze Sevin',
    description: isTr
      ? 'Depresyon, anksiyete, OKB, TSSB, ilişki sorunları, kayıp ve yas dahil 17 çalışma alanı.'
      : 'Depression, anxiety, OCD, PTSD, relationship issues, grief and more — 17 practice areas.',
    alternates: { canonical: `/${locale}/calisma-alanlari` },
  }
}

export default async function ConditionsIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('conditions')

  return (
    <>
      <PageHeader title={t('indexTitle')} intro={t('indexIntro')} />
      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Group
            title={t('categoryRuhsal')}
            items={conditionsByCategory('ruhsal')}
            locale={locale}
          />
          <Group
            title={t('categoryDiger')}
            items={conditionsByCategory('diger')}
            locale={locale}
          />
        </Container>
      </section>
    </>
  )
}

function Group({
  title,
  items,
  locale,
}: {
  title: string
  items: typeof conditionAreas
  locale: Locale
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locale}/calisma-alanlari/${c.slug}`}
              className="flex flex-col gap-1 rounded-card bg-cream-soft p-5 transition hover:-translate-y-0.5 hover:bg-cream hover:shadow-card"
            >
              <span className="text-base font-semibold text-ink">
                {c.title[locale]}
              </span>
              <span className="text-sm text-ink/70">{c.ozet[locale]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
