'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { LocaleSwitcher } from './LocaleSwitcher'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

type NavItem = { key: 'about' | 'approaches' | 'conditions' | 'online' | 'blog' | 'contact'; href: string }

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  const items: NavItem[] = [
    { href: `/${locale}/hakkimda`, key: 'about' },
    { href: `/${locale}/terapi-yaklasimlari`, key: 'approaches' },
    { href: `/${locale}/calisma-alanlari`, key: 'conditions' },
    { href: `/${locale}/online-terapi`, key: 'online' },
    { href: `/${locale}/blog`, key: 'blog' },
    { href: `/${locale}/iletisim`, key: 'contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href={`/${locale}`}
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-lg font-bold tracking-tight text-ink lg:text-xl">
            Gamze Sevin
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sea">
            {locale === 'tr' ? 'Klinik Psikolog' : 'Clinical Psychologist'}
          </span>
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition hover:text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <Button href={`/${locale}/iletisim`} size="sm" className="hidden sm:inline-flex">
            {t('appointment')}
          </Button>
          <button
            type="button"
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          'lg:hidden',
          open ? 'border-t border-ink/10 bg-white' : 'hidden',
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-ink/5"
            >
              {t(item.key)}
            </Link>
          ))}
          <Button
            href={`/${locale}/iletisim`}
            className="mt-2"
            size="md"
          >
            {t('appointment')}
          </Button>
        </Container>
      </div>
    </header>
  )
}
