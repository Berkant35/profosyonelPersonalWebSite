import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/sections/PageHeader'
import { Container } from '@/components/ui/Container'
import { legalContent } from '@/lib/content/legal'
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
    title: locale === 'tr' ? 'KVKK Aydınlatma Metni' : 'KVKK Disclosure',
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}/kvkk` },
  }
}

export default async function KvkkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('legal')

  return (
    <>
      <PageHeader title={t('kvkkTitle')} />
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <p className="rounded-2xl bg-warning/10 px-4 py-3 text-sm text-warning">
            {t('draftNote')}
          </p>
          <article className="mt-8 space-y-5 text-base leading-relaxed text-ink/85">
            {legalContent.kvkk[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </Container>
      </section>
    </>
  )
}
