import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FAQ } from '@/components/sections/FAQ'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { onlineContent } from '@/lib/content/online'
import { faqItems } from '@/lib/content/faq'
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
    title: isTr ? 'Online Terapi — Türkçe ve İngilizce' : 'Online Therapy — Turkish & English',
    description: isTr
      ? 'Türkiye\'nin her yerinden ve yurt dışından güvenli görüntülü psikoterapi seansları.'
      : 'Secure video psychotherapy from anywhere in Turkey and abroad.',
    alternates: { canonical: `/${locale}/online-terapi` },
  }
}

export default async function OnlinePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('online')

  // Use 5 FAQ items focused on online sessions and general flow
  const relevantFaqIds = ['online-etkinlik', 'seans-suresi', 'ilk-seans', 'gizlilik', 'odevler']
  const relevantFaqs = relevantFaqIds
    .map((id) => faqItems.find((f) => f.id === id))
    .filter(Boolean) as typeof faqItems

  return (
    <>
      <PageHeader
        eyebrow={locale === 'tr' ? 'Online' : 'Online'}
        title={t('title')}
        intro={onlineContent.intro[locale][0]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <h2 className="text-2xl font-semibold text-ink">{t('introTitle')}</h2>
            {onlineContent.intro[locale].map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-card bg-cream p-6">
              <h3 className="text-base font-semibold text-ink">
                {t('securityTitle')}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-ink/85">
                {onlineContent.security[locale].map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <Container>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            {t('stepsTitle')}
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {onlineContent.steps.map((s, i) => (
              <li
                key={s.title[locale]}
                className="rounded-card bg-white p-6 shadow-card"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-sea">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-3 text-base font-semibold text-ink">
                  {s.title[locale]}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {s.desc[locale]}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={siteSettings.whatsappUrl} external size="lg">
              WhatsApp
            </Button>
            <Button href={`/${locale}/iletisim`} variant="ghost" size="lg">
              {t('ctaTitle')}
            </Button>
          </div>
        </Container>
      </section>

      <FAQ items={relevantFaqs} locale={locale} title={t('faqTitle')} bg="white" />
      <ContactCTA locale={locale} />
    </>
  )
}
