import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { siteSettings } from '@/lib/content/site'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gamze Sevin — Klinik Psikolog',
    template: '%s — Gamze Sevin',
  },
  description:
    'İzmir ve online seanslarla bilimsel kanıta dayalı, destekleyici psikoterapi. BDT, EMDR ve Sorun Çözme Terapisi.',
  authors: [{ name: 'Gamze Sevin' }],
  openGraph: {
    type: 'website',
    siteName: 'Gamze Sevin — Klinik Psikolog',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
          <WhatsAppFab phone={siteSettings.whatsappNumber} />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
