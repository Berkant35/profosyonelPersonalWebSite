import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { ContactForm } from '@/components/forms/ContactForm'
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
  return {
    title: locale === 'tr' ? 'İletişim — Klinik Psikolog Gamze Sevin' : 'Contact — Clinical Psychologist Gamze Sevin',
    description:
      locale === 'tr'
        ? 'WhatsApp, e-posta veya iletişim formundan ulaşın. İzmir merkezli ofis ve online seanslar.'
        : 'Reach out via WhatsApp, email or the contact form. İzmir-based office and online sessions.',
    alternates: { canonical: `/${locale}/iletisim` },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  return (
    <>
      <PageHeader title={t('title')} intro={t('intro')} />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Card className="p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-ink">
                {t('channelsTitle')}
              </h2>
              <ul className="mt-5 space-y-4 text-sm text-ink/85">
                <li>
                  <a
                    href={siteSettings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 p-1.5">
                      <img
                        src="/logos/whatsapp.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-full w-full"
                      />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-ink/60">
                        WhatsApp
                      </span>
                      <span className="block text-base font-semibold text-ink group-hover:text-sea">
                        {siteSettings.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EA4335]/15 p-1.5">
                      <img
                        src="/logos/gmail.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-full w-full"
                      />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-ink/60">
                        {locale === 'tr' ? 'E-posta' : 'Email'}
                      </span>
                      <span className="block text-base font-semibold text-ink group-hover:text-sea">
                        {siteSettings.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={siteSettings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a66c2]/15 p-1.5">
                      <img
                        src="/logos/linkedin.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-full w-full"
                      />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-ink/60">
                        LinkedIn
                      </span>
                      <span className="block text-base font-semibold text-ink group-hover:text-sea">
                        linkedin.com/in/gamze-sevin
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </Card>

            <Card className="p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-ink">{t('officeTitle')}</h2>
              <p className="mt-3 text-sm text-ink/85">{siteSettings.city}, Türkiye</p>
              <p className="mt-2 text-sm text-ink/70">{t('officeNote')}</p>

              <h3 className="mt-6 text-sm font-semibold text-ink">{t('hoursTitle')}</h3>
              <ul className="mt-2 space-y-1 text-sm text-ink/85">
                <li>{t('hoursWeekdays')}</li>
                <li>{t('hoursWeekend')}</li>
              </ul>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-lg font-semibold text-ink">{t('formTitle')}</h2>
            <p className="mt-2 text-sm text-ink/70">
              {locale === 'tr'
                ? 'Form gönderimi şu anda yapı aşamasında; mesajınız e-posta ile iletilemiyor olabilir. Hızlı yanıt için WhatsApp\'ı tercih edin.'
                : 'Form delivery is being set up; messages may not yet be relayed by email. For the fastest reply, please use WhatsApp.'}
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
