import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { JsonLd } from '@/components/content/JsonLd'
import { aboutContent } from '@/lib/content/about'
import { siteSettings } from '@/lib/content/site'
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
    title: isTr ? 'Hakkımda — Klinik Psikolog Gamze Sevin' : 'About — Clinical Psychologist Gamze Sevin',
    description: isTr
      ? 'Klinik psikolog ve psikoterapist Gamze Sevin: Boğaziçi Üniversitesi Psikoloji, Koç Üniversitesi Klinik Psikoloji yüksek lisans. EABCT ve EMDR Avrupa akreditasyonları.'
      : 'Clinical psychologist Gamze Sevin: Boğaziçi University Psychology, Koç University Clinical Psychology MA. EABCT and EMDR Europe accreditations.',
    alternates: {
      canonical: `/${locale}/hakkimda`,
      languages: { tr: '/tr/hakkimda', en: '/en/hakkimda' },
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const tNav = await getTranslations('nav')

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gamze Sevin',
    jobTitle: locale === 'tr' ? 'Klinik Psikolog & Psikoterapist' : 'Clinical Psychologist & Psychotherapist',
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Koç Üniversitesi' },
      { '@type': 'CollegeOrUniversity', name: 'Boğaziçi Üniversitesi' },
    ],
    knowsAbout: [
      'Cognitive Behavioral Therapy',
      'EMDR',
      'Problem-Solving Therapy',
      'Trauma',
      'Anxiety',
      'Depression',
    ],
    sameAs: [siteSettings.linkedin],
    image: '/portrait.webp',
    email: `mailto:${siteSettings.email}`,
  }

  return (
    <>
      <JsonLd data={personJsonLd} />
      <PageHeader
        eyebrow={locale === 'tr' ? 'Klinik Psikolog' : 'Clinical Psychologist'}
        title={t('title')}
        intro={aboutContent.intro[locale][0]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-hero bg-sand shadow-card">
              <Image
                src="/portrait.webp"
                alt={aboutContent.portraitAlt[locale]}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-sea">
              {t('onlineLangs')}
            </p>
          </div>

          <div className="space-y-10 lg:col-span-7">
            <section>
              <h2 className="text-2xl font-semibold text-ink">{t('introTitle')}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/85">
                {aboutContent.intro[locale].map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">{t('approachTitle')}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/85">
                {aboutContent.approach[locale]}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">{t('experienceTitle')}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {aboutContent.experience[locale].map((e) => (
                  <li
                    key={e}
                    className="rounded-2xl bg-cream-soft px-4 py-3 text-sm text-ink"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">{t('educationTitle')}</h2>
              <ul className="mt-4 space-y-3">
                {aboutContent.education.map((e) => (
                  <li
                    key={e.school}
                    className="flex flex-col rounded-2xl bg-cream-soft px-4 py-3"
                  >
                    <span className="text-base font-semibold text-ink">{e.school}</span>
                    <span className="text-sm text-ink/70">{e.degree[locale]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">{t('publicationsTitle')}</h2>
              <ol className="mt-4 space-y-4">
                {aboutContent.publications.map((p) => (
                  <li
                    key={p.title[locale]}
                    className="rounded-2xl border border-ink/10 bg-white p-4"
                  >
                    <div className="text-base font-semibold text-ink">
                      {p.title[locale]}
                    </div>
                    <div className="mt-1 text-sm text-ink/70">
                      {p.venue[locale]}
                    </div>
                    {p.doi && (
                      <a
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs font-semibold text-sea hover:text-ink"
                      >
                        DOI: {p.doi}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">{t('certificatesTitle')}</h2>
              <ul className="mt-4 space-y-3">
                {aboutContent.certificates.map((c) => (
                  <li
                    key={c.name[locale]}
                    className="rounded-2xl bg-cream-soft p-4"
                  >
                    <div className="text-sm font-semibold text-ink">
                      {c.name[locale]}
                    </div>
                    <div className="mt-1 text-xs text-ink/70">{c.trainer[locale]}</div>
                    {c.accreditation[locale] !== '—' && (
                      <div className="mt-1 inline-block rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink">
                        {c.accreditation[locale]}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <div>
              <Button href={`/${locale}/iletisim`} size="lg">
                {tNav('appointment')}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
