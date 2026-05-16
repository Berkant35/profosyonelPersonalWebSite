import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { ServicesAccordion } from '@/components/sections/ServicesAccordion'
import { QuickLinks } from '@/components/sections/QuickLinks'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { Approaches } from '@/components/sections/Approaches'
import { Conditions } from '@/components/sections/Conditions'
import { OnlineStrip } from '@/components/sections/OnlineStrip'
import { BlogTeaser } from '@/components/sections/BlogTeaser'
import { FAQ } from '@/components/sections/FAQ'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { JsonLd } from '@/components/content/JsonLd'
import { homepageFaqs } from '@/lib/content/faq'
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
    title: isTr
      ? 'Klinik Psikolog Gamze Sevin — BDT, EMDR, Online Terapi'
      : 'Clinical Psychologist Gamze Sevin — CBT, EMDR, Online Therapy',
    description: isTr
      ? 'İzmir ve online seanslarla bilime dayalı, destekleyici psikoterapi. Bilişsel Davranışçı Terapi, EMDR ve Sorun Çözme Terapisi.'
      : 'İzmir & online evidence-based supportive psychotherapy. Cognitive Behavioral Therapy, EMDR and Problem-Solving Therapy.',
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: '/tr', en: '/en' },
    },
    openGraph: {
      type: 'website',
      locale: isTr ? 'tr_TR' : 'en_US',
      title: isTr
        ? 'Klinik Psikolog Gamze Sevin'
        : 'Clinical Psychologist Gamze Sevin',
      description: isTr
        ? 'İzmir ve online seanslarla bilime dayalı psikoterapi.'
        : 'İzmir & online evidence-based psychotherapy.',
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('home')

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'ProfessionalService'],
    name: 'Klinik Psikolog Gamze Sevin',
    description:
      locale === 'tr'
        ? 'İzmir ve online seanslarla bilime dayalı psikoterapi.'
        : 'Evidence-based psychotherapy — İzmir and online.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gamzesevin.com',
    telephone: siteSettings.phone,
    email: siteSettings.email,
    image: '/portrait.webp',
    medicalSpecialty: 'Psychiatry',
    areaServed: { '@type': 'Country', name: 'TR' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'İzmir',
      addressCountry: 'TR',
    },
    sameAs: [siteSettings.linkedin].filter(Boolean),
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer[locale].join(' '),
      },
    })),
  }

  return (
    <>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero locale={locale} />
      <ServicesAccordion locale={locale} />
      <QuickLinks locale={locale} />
      <AboutTeaser locale={locale} />
      <Approaches locale={locale} />
      <Conditions locale={locale} />
      <OnlineStrip locale={locale} />
      <BlogTeaser locale={locale} />
      <FAQ items={homepageFaqs} locale={locale} title={t('faqTitle')} />
      <ContactCTA locale={locale} />
    </>
  )
}
