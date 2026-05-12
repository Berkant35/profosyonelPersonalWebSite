import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { siteSettings } from '@/lib/content/site'
import type { Locale } from '@/i18n/routing'

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream">
      <Container className="grid gap-10 py-14 lg:grid-cols-4 lg:gap-12 lg:py-20">
        <div className="lg:col-span-1">
          <div className="text-lg font-bold">Gamze Sevin</div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-cream/70">
            {locale === 'tr' ? 'Klinik Psikolog' : 'Clinical Psychologist'}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            {t('tagline')}
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/60">
            {t('pages')}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`/${locale}/hakkimda`} className="hover:text-white">{tNav('about')}</Link></li>
            <li><Link href={`/${locale}/terapi-yaklasimlari`} className="hover:text-white">{tNav('approaches')}</Link></li>
            <li><Link href={`/${locale}/calisma-alanlari`} className="hover:text-white">{tNav('conditions')}</Link></li>
            <li><Link href={`/${locale}/online-terapi`} className="hover:text-white">{tNav('online')}</Link></li>
            <li><Link href={`/${locale}/blog`} className="hover:text-white">{tNav('blog')}</Link></li>
            <li><Link href={`/${locale}/iletisim`} className="hover:text-white">{tNav('contact')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/60">
            {t('contact')}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={siteSettings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp • {siteSettings.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteSettings.email}`}
                className="hover:text-white"
              >
                {siteSettings.email}
              </a>
            </li>
            <li>
              <a
                href={siteSettings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li className="text-cream/70">
              {siteSettings.workingHours[locale]}
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/60">
            {t('legal')}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`/${locale}/kvkk`} className="hover:text-white">{t('kvkk')}</Link></li>
            <li><Link href={`/${locale}/cerez-politikasi`} className="hover:text-white">{t('cookies')}</Link></li>
            <li><Link href={`/${locale}/gizlilik-politikasi`} className="hover:text-white">{t('privacy')}</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-start justify-between gap-2 py-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <span>
            © {year} {siteSettings.copyrightName}. {t('rights')}
          </span>
          <span>{locale === 'tr' ? 'Bilim odaklı psikoterapi' : 'Evidence-based psychotherapy'}</span>
        </Container>
      </div>
    </footer>
  )
}
