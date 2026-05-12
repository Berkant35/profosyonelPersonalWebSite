'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { routing, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

const SLUG_MAP: Record<Locale, Record<string, string>> = {
  tr: {
    hakkimda: 'hakkimda',
    'terapi-yaklasimlari': 'terapi-yaklasimlari',
    'calisma-alanlari': 'calisma-alanlari',
    'online-terapi': 'online-terapi',
    blog: 'blog',
    iletisim: 'iletisim',
    kvkk: 'kvkk',
    'cerez-politikasi': 'cerez-politikasi',
    'gizlilik-politikasi': 'gizlilik-politikasi',
  },
  en: {
    hakkimda: 'about',
    'terapi-yaklasimlari': 'therapy-approaches',
    'calisma-alanlari': 'areas-of-practice',
    'online-terapi': 'online-therapy',
    blog: 'blog',
    iletisim: 'contact',
    kvkk: 'kvkk',
    'cerez-politikasi': 'cookie-policy',
    'gizlilik-politikasi': 'privacy-policy',
  },
}

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() ?? `/${currentLocale}`

  return (
    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em]">
      {routing.locales.map((loc, i) => {
        const isActive = loc === currentLocale
        const otherPath = pathname.replace(`/${currentLocale}`, `/${loc}`)
        return (
          <span key={loc} className="flex items-center gap-1">
            {i > 0 && <span className="text-ink/30">/</span>}
            <Link
              href={otherPath}
              className={cn(
                'rounded-full px-2 py-1 transition',
                isActive ? 'text-ink' : 'text-ink/50 hover:text-ink',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {loc.toUpperCase()}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
