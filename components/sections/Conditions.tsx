import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { conditionsByCategory } from '@/lib/content/conditions'
import type { Locale } from '@/i18n/routing'

export function Conditions({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  const ruhsal = conditionsByCategory('ruhsal')
  const diger = conditionsByCategory('diger')

  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Pill tone="outline">{locale === 'tr' ? 'Çalıştığım alanlar' : 'Practice areas'}</Pill>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              {t('conditionsTitle')}
            </h2>
            <p className="mt-2 max-w-xl text-base text-ink/70">{t('conditionsIntro')}</p>
          </div>
          <Link
            href={`/${locale}/calisma-alanlari`}
            className="text-sm font-semibold text-sea hover:text-ink"
          >
            {t('conditionsAll')} →
          </Link>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ConditionColumn
            title={t('conditionsRuhsal')}
            items={ruhsal}
            locale={locale}
          />
          <ConditionColumn
            title={t('conditionsDiger')}
            items={diger}
            locale={locale}
          />
        </div>
      </Container>
    </section>
  )
}

function ConditionColumn({
  title,
  items,
  locale,
}: {
  title: string
  items: ReturnType<typeof conditionsByCategory>
  locale: Locale
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locale}/calisma-alanlari/${c.slug}`}
              className="block rounded-2xl bg-white px-4 py-3 text-sm font-medium text-ink shadow-card transition hover:-translate-y-0.5 hover:shadow-hover"
            >
              {c.title[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
