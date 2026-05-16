import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { homeContent } from '@/lib/content/home'
import { siteSettings } from '@/lib/content/site'
import type { Locale } from '@/i18n/routing'

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = homeContent
  return (
    <section className="bg-cream">
      <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="order-2 lg:order-1 lg:col-span-7 lg:pr-8">
          <Pill className="bg-ink/10 text-ink">{hero.eyebrow[locale]}</Pill>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            {hero.title[locale]}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80 lg:text-lg">
            {hero.subtitle[locale].map((part, i) =>
              part.bold ? (
                <strong key={i} className="font-semibold text-ink">
                  {part.text}
                </strong>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteSettings.whatsappUrl} external size="lg">
              {hero.ctaPrimaryLabel[locale]}
            </Button>
            <Button href={`/${locale}/hakkimda`} variant="ghost" size="lg">
              {hero.ctaSecondaryLabel[locale]}
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-hero bg-sand shadow-card">
            <Image
              src="/portrait.webp"
              alt={locale === 'tr' ? 'Klinik Psikolog Gamze Sevin portresi' : 'Portrait of Clinical Psychologist Gamze Sevin'}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
