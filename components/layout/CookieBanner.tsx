'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'

const STORAGE_KEY = 'gs.cookie-consent'

type Choice = 'all' | 'necessary' | null

function readChoice(): Choice {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'all' || raw === 'necessary') return raw
    return null
  } catch {
    return null
  }
}

function writeChoice(choice: 'all' | 'necessary') {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(
      new CustomEvent('cookie-consent', { detail: { choice } }),
    )
  }
}

export function CookieBanner() {
  const t = useTranslations('cookie')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = readChoice()
    if (!existing) setVisible(true)
  }, [])

  if (!visible) return null

  const handle = (choice: 'all' | 'necessary') => {
    writeChoice(choice)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('title')}
      className={cn(
        'fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-card bg-white shadow-hover ring-1 ring-ink/10',
        'sm:inset-x-auto sm:right-5 sm:bottom-24 sm:max-w-md',
      )}
    >
      <div className="p-5">
        <div className="text-base font-semibold text-ink">{t('title')}</div>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{t('body')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handle('all')}
            className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-ink-soft"
          >
            {t('accept')}
          </button>
          <button
            type="button"
            onClick={() => handle('necessary')}
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5"
          >
            {t('reject')}
          </button>
        </div>
      </div>
    </div>
  )
}
