import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { therapyApproaches } from '@/lib/content/approaches'
import type { Locale } from '@/i18n/routing'

export function Approaches({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Pill tone="outline">{locale === 'tr' ? 'Yaklaşım' : 'Approach'}</Pill>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              {t('approachesTitle')}
            </h2>
            <p className="mt-2 max-w-xl text-base text-ink/70">{t('approachesIntro')}</p>
          </div>
          <Link
            href={`/${locale}/terapi-yaklasimlari`}
            className="text-sm font-semibold text-sea hover:text-ink"
          >
            {t('approachesAll')} →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {therapyApproaches.map((a) => (
            <Card
              key={a.slug}
              href={`/${locale}/terapi-yaklasimlari/${a.slug}`}
              className="p-6"
            >
              <h3 className="text-lg font-semibold text-ink">
                {a.title[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {a.ozet[locale]}
              </p>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-sea">
                {a.sure[locale]}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
