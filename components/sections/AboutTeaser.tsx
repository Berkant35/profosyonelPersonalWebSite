import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { homeContent } from '@/lib/content/home'
import type { Locale } from '@/i18n/routing'

export function AboutTeaser({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  const { aboutTeaser } = homeContent
  const labels = locale === 'tr'
    ? { bachelor: 'Lisans', master: 'Yüksek Lisans', bogazici: 'Boğaziçi Üniversitesi', koc: 'Koç Üniversitesi' }
    : { bachelor: 'Bachelor', master: 'Master', bogazici: 'Boğaziçi University', koc: 'Koç University' }
  return (
    <section className="bg-sand py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Pill tone="outline">{locale === 'tr' ? 'Hakkımda' : 'About'}</Pill>
          <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            {locale === 'tr'
              ? 'Bilimsel temelli ve destekleyici bir yaklaşımla, bireysel ihtiyaçlarınıza göre şekillenen psikolojik destek sağlıyorum.'
              : 'With an evidence-based and supportive approach, I provide psychological support tailored to your individual needs.'}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base leading-relaxed text-ink/85 lg:text-lg">
            {aboutTeaser.body[locale]}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-card">
              <img
                src="/logos/bogazici.svg"
                alt={labels.bogazici}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                  {labels.bachelor}
                </div>
                <div className="text-sm font-semibold text-ink">{labels.bogazici}</div>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-card">
              <img
                src="/logos/koc.svg"
                alt={labels.koc}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                  {labels.master}
                </div>
                <div className="text-sm font-semibold text-ink">{labels.koc}</div>
              </div>
            </li>
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
