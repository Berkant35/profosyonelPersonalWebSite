import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default async function NotFound() {
  const t = await getTranslations('common')

  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sea">404</p>
        <h1 className="mt-4 text-balance text-4xl font-bold text-ink sm:text-5xl">
          {t('notFoundTitle')}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-ink/75">
          {t('notFoundText')}
        </p>
        <div className="mt-8">
          <Button href="/" size="lg">
            {t('backHome')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
