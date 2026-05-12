import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { siteSettings } from '@/lib/content/site'
import type { Locale } from '@/i18n/routing'

export function ContactCTA({ locale }: { locale: Locale }) {
  const t = useTranslations('home')
  return (
    <section className="bg-ink py-16 text-cream lg:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold text-cream sm:text-4xl">
          {t('ctaTitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream/80">{t('ctaSubtitle')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            href={siteSettings.whatsappUrl}
            external
            variant="secondary"
            size="lg"
          >
            WhatsApp
          </Button>
          <Button
            href={`/${locale}/iletisim`}
            variant="inkOnDark"
            size="lg"
          >
            {t('ctaForm')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
