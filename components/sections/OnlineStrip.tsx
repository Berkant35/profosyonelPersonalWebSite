import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { homeContent } from '@/lib/content/home'
import type { Locale } from '@/i18n/routing'

export function OnlineStrip({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  const { onlineStrip } = homeContent
  return (
    <section className="bg-ink py-16 text-cream lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Pill tone="inkOnDark">{locale === 'tr' ? 'Online' : 'Online'}</Pill>
          <h2 className="mt-4 text-3xl font-semibold text-cream sm:text-4xl">
            {t('onlineStripTitle')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/80">
            {t('onlineStripText')}
          </p>
          <blockquote className="mt-6 border-l-2 border-cream/30 pl-4 text-base italic text-cream/85">
            “{onlineStrip.quote[locale]}”
          </blockquote>
          <div className="mt-8">
            <Button
              href={`/${locale}/online-terapi`}
              variant="secondary"
              size="md"
            >
              {t('onlineStripCta')} →
            </Button>
          </div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {onlineStrip.steps.map((s, i) => (
            <li
              key={s.title[locale]}
              className="rounded-card border border-cream/15 bg-ink-soft/40 p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/60">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-2 text-base font-semibold text-cream">
                {s.title[locale]}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-cream/75">
                {s.desc[locale]}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
