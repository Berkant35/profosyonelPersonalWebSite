'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sea">500</p>
        <h1 className="mt-4 text-balance text-4xl font-bold text-ink sm:text-5xl">
          {t('errorTitle')}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-ink/75">
          {t('errorText')}
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-cream transition hover:bg-ink-soft"
          >
            {t('tryAgain')}
          </button>
        </div>
      </Container>
    </section>
  )
}
