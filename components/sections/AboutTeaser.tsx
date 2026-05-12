import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { homeContent } from '@/lib/content/home'
import type { Locale } from '@/i18n/routing'

export function AboutTeaser({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  const { aboutTeaser } = homeContent
  return (
    <section className="bg-sand py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Pill tone="outline">{locale === 'tr' ? 'Hakkımda' : 'About'}</Pill>
          <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            {locale === 'tr'
              ? 'Bilime dayalı, destekleyici bir çerçevede çalışıyorum.'
              : 'I work within an evidence-based, supportive framework.'}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base leading-relaxed text-ink/85 lg:text-lg">
            {aboutTeaser.body[locale]}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {aboutTeaser.badges[locale].map((b) => (
              <li key={b}>
                <Pill tone="cream">{b}</Pill>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={`/${locale}/hakkimda`} variant="primary" size="md">
              {t('aboutTeaserCta')} →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
