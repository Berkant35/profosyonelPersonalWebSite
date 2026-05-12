# Gamze Sevin Psikolog Web Sitesi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Klinik Psikolog Gamze Sevin için Next.js 15 + Sanity CMS tabanlı, çift dilli (TR/EN), yerel SEO odaklı, içerik yönetilebilir bir web sitesi inşa et.

**Architecture:** Next.js 15 App Router monorepo (`apps/web/` + `sanity/` schemas). Sanity Studio `/studio` route'unda embed. ISR ile içerik 60s revalidate. next-intl ile `/tr` ve `/en` paralel routelar. Vercel deploy + Resend (form) + Upstash (rate limit) + GA4 (Consent Mode v2). 7 ana sayfa + 3 yasal + dinamik blog/yaklaşım/alan detayları.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Sanity v3, next-intl, Radix UI (accordion/dialog), framer-motion, react-hook-form + zod, Resend, hCaptcha, Upstash Redis, vanilla-cookieconsent, Google Analytics 4.

**Spec:** `docs/superpowers/specs/2026-05-12-psikolog-web-sitesi-design.md`

---

## Faz 1 — Bootstrap

### Task 1: Next.js 15 + TypeScript + Tailwind iskeletini kur

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Next.js init**

```bash
cd "/Users/berkantcalikusu/Desktop/gamze_web_site copy"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias --use-npm --no-eslint
```

Wizard sorularda: Turbopack? `No` (Sanity Studio uyumsuzluk riski). Mevcut dosyalar varsa overwrite onayla.

- [ ] **Step 2: Doğrulama**

```bash
npm run dev
```

Expected: `http://localhost:3000` Next.js default sayfası açılır.

- [ ] **Step 3: ESLint + Prettier ekle**

```bash
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

Create `.prettierrc.json`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Create `.eslintrc.json`:

```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 4: package.json scripts**

`package.json` `scripts` bölümünü güncelle:

```json
"scripts": {
  "dev": "next dev -p 3000",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit",
  "format": "prettier --write ."
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js 15 + TS + Tailwind"
```

---

### Task 2: Tailwind design tokens (palet, font, radius, shadow)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx` (Montserrat font)
- Modify: `app/globals.css`

- [ ] **Step 1: Tailwind config — palet, radius, shadow, font**

`tailwind.config.ts` içeriği:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#213448', soft: '#2c4361' },
        sea: { DEFAULT: '#547792', soft: '#6e8ca4' },
        cream: { DEFAULT: '#F3E3D0', soft: '#faf1e3' },
        sand: { DEFAULT: '#D2C4B4', soft: '#dccfbf' },
        success: '#3F7D58',
        warning: '#C97B3B',
        error: '#A6453A',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        hero: '24px',
        input: '12px',
      },
      boxShadow: {
        card: '0 4px 24px -8px rgba(33,52,72,0.10)',
        hover: '0 8px 32px -8px rgba(33,52,72,0.18)',
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '4rem', fontWeight: '700' }],
        'display-mobile': ['2.25rem', { lineHeight: '2.625rem', fontWeight: '700' }],
        h1: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        h2: ['1.875rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        h3: ['1.375rem', { lineHeight: '1.875rem', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.625rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.375rem' }],
        label: ['0.75rem', { lineHeight: '1rem', fontWeight: '600', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Montserrat font + RootLayout**

`app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Gamze Sevin — Klinik Psikolog',
  description: 'İzmir ve online seanslarla bilime dayalı psikolojik destek.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={montserrat.variable}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: globals.css temel reset + focus ring**

`app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { -webkit-font-smoothing: antialiased; }
  *:focus-visible { @apply outline-none ring-2 ring-sea ring-offset-2 ring-offset-white; }
}
```

- [ ] **Step 4: Doğrulama — örnek sayfa**

`app/page.tsx`:

```typescript
export default function Home() {
  return (
    <main className="min-h-screen bg-cream p-12">
      <h1 className="text-h1 text-ink">Token kontrol</h1>
      <p className="text-body text-sea">Montserrat + #213448 + #547792 görünüyor mu?</p>
      <button className="mt-6 rounded-full bg-ink px-6 py-3 text-label uppercase text-cream shadow-card hover:shadow-hover transition">Pill button</button>
    </main>
  )
}
```

Çalıştır:

```bash
npm run dev
```

Expected: Krem zemin, koyu mavi başlık, mavi-gri paragraf, koyu pill buton.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: tailwind design tokens (palette, montserrat, radius, shadow)"
```

---

### Task 3: next-intl kur ve `/tr` + `/en` route yapısını oluştur

**Files:**
- Create: `i18n.ts`, `middleware.ts`, `messages/tr.json`, `messages/en.json`
- Move: `app/page.tsx` → `app/[locale]/page.tsx`
- Move: `app/layout.tsx` → `app/[locale]/layout.tsx`
- Create: `app/layout.tsx` (root, minimal)

- [ ] **Step 1: Install**

```bash
npm install next-intl
```

- [ ] **Step 2: i18n config**

`i18n.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['tr', 'en'] as const
export const defaultLocale = 'tr'
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound()
  return { messages: (await import(`./messages/${locale}.json`)).default }
})
```

`messages/tr.json`:

```json
{
  "nav": {
    "home": "Anasayfa",
    "about": "Hakkımda",
    "approaches": "Terapi Yaklaşımları",
    "conditions": "Çalışma Alanları",
    "online": "Online Terapi",
    "blog": "Blog",
    "contact": "İletişim",
    "appointment": "Randevu Al"
  },
  "footer": {
    "rights": "Tüm hakları saklıdır.",
    "kvkk": "KVKK Aydınlatma Metni",
    "cookies": "Çerez Politikası",
    "privacy": "Gizlilik Politikası"
  }
}
```

`messages/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "approaches": "Therapy Approaches",
    "conditions": "Areas of Practice",
    "online": "Online Therapy",
    "blog": "Blog",
    "contact": "Contact",
    "appointment": "Book Appointment"
  },
  "footer": {
    "rights": "All rights reserved.",
    "kvkk": "KVKK Disclosure",
    "cookies": "Cookie Policy",
    "privacy": "Privacy Policy"
  }
}
```

- [ ] **Step 3: middleware ile locale routing**

`middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
}
```

- [ ] **Step 4: next.config.mjs**

`next.config.mjs`:

```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 5: Dosyaları `[locale]` altına taşı**

```bash
mkdir -p app/\[locale\]
git mv app/page.tsx "app/[locale]/page.tsx"
git mv app/layout.tsx "app/[locale]/layout.tsx"
```

`app/[locale]/layout.tsx` — `NextIntlClientProvider` ile sar:

```typescript
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '../../i18n'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Gamze Sevin — Klinik Psikolog',
  description: 'İzmir ve online seanslarla bilime dayalı psikolojik destek.',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) notFound()
  const messages = await getMessages()
  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="bg-white font-sans text-ink antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Test**

```bash
npm run dev
```

`http://localhost:3000/` → otomatik `/tr` yönlendirme; `/en` da çalışıyor.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add next-intl with /tr and /en routes"
```

---

### Task 4: Sanity v3 kur ve `/studio` route'una embed et

**Files:**
- Create: `sanity.config.ts`, `sanity.cli.ts`, `sanity/env.ts`, `sanity/schemas/index.ts`
- Create: `app/studio/[[...index]]/page.tsx`, `app/studio/[[...index]]/layout.tsx`

- [ ] **Step 1: Sanity init**

```bash
npm install sanity @sanity/vision next-sanity @sanity/image-url styled-components
```

Sanity projesini dashboard'da oluştur (sanity.io/manage → New Project → "Gamze Sevin"). `projectId` ve `dataset=production` kopyala.

`.env.local` (commit edilmez):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=<dashboard'dan oluştur — read-only>
```

`.env.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=
RESEND_API_KEY=
HCAPTCHA_SECRET=
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 2: Sanity env helper**

`sanity/env.ts`:

```typescript
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env: NEXT_PUBLIC_SANITY_DATASET',
)
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID',
)
export const readToken = process.env.SANITY_API_READ_TOKEN

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage)
  return v
}
```

- [ ] **Step 3: Boş schema placeholder**

`sanity/schemas/index.ts`:

```typescript
import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = []
```

- [ ] **Step 4: sanity.config.ts**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
})
```

`sanity.cli.ts`:

```typescript
import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity/env'

export default defineCliConfig({ api: { projectId, dataset } })
```

- [ ] **Step 5: Studio route**

`app/studio/[[...index]]/layout.tsx`:

```typescript
export const metadata = {
  title: 'Sanity Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

`app/studio/[[...index]]/page.tsx`:

```typescript
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 6: Test**

```bash
npm run dev
```

`http://localhost:3000/studio` → Sanity Studio yüklenir, login gerekir.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: embed Sanity Studio at /studio"
```

---

### Task 5: Layout iskelet — Header, Footer, WhatsAppFab, Container

**Files:**
- Create: `components/ui/Container.tsx`, `components/ui/Section.tsx`, `components/ui/Button.tsx`, `components/ui/Pill.tsx`
- Create: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/WhatsAppFab.tsx`, `components/layout/LocaleSwitcher.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Container + Section + Button + Pill**

`components/ui/Container.tsx`:

```typescript
import { cn } from '@/lib/cn'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
```

`components/ui/Section.tsx`:

```typescript
import { cn } from '@/lib/cn'

type BG = 'white' | 'cream' | 'sand' | 'ink'

export function Section({
  bg = 'white',
  className,
  children,
}: {
  bg?: BG
  className?: string
  children: React.ReactNode
}) {
  const bgClass = {
    white: 'bg-white text-ink',
    cream: 'bg-cream text-ink',
    sand: 'bg-sand text-ink',
    ink: 'bg-ink text-cream',
  }[bg]
  return <section className={cn('py-16 lg:py-24', bgClass, className)}>{children}</section>
}
```

`lib/cn.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install:

```bash
npm install clsx tailwind-merge
```

`components/ui/Button.tsx`:

```typescript
import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base = 'inline-flex items-center justify-center rounded-full font-semibold transition-shadow disabled:opacity-50'
const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-5 py-2.5 text-body',
  lg: 'px-7 py-3.5 text-body',
}
const variants: Record<Variant, string> = {
  primary: 'bg-ink text-cream shadow-card hover:shadow-hover',
  secondary: 'bg-cream text-ink shadow-card hover:shadow-hover',
  ghost: 'border border-ink/15 text-ink hover:bg-ink/5',
}

type Props = {
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', size = 'md', href, className, children, ...rest }: Props) {
  const cls = cn(base, sizes[size], variants[variant], className)
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} {...rest}>{children}</button>
}
```

`components/ui/Pill.tsx`:

```typescript
import { cn } from '@/lib/cn'

export function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-block rounded-full bg-ink/10 px-3 py-1 text-label uppercase text-ink', className)}>
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Header**

`components/layout/Header.tsx`:

```typescript
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const items = [
    { href: `/${locale}/hakkimda`, key: 'about' },
    { href: `/${locale}/terapi-yaklasimlari`, key: 'approaches' },
    { href: `/${locale}/calisma-alanlari`, key: 'conditions' },
    { href: `/${locale}/online-terapi`, key: 'online' },
    { href: `/${locale}/blog`, key: 'blog' },
    { href: `/${locale}/iletisim`, key: 'contact' },
  ] as const
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="text-h3 font-bold tracking-tight">
          Gamze Sevin
        </Link>
        <nav className="hidden gap-6 lg:flex">
          {items.map((i) => (
            <Link key={i.key} href={i.href} className="text-body-sm font-medium text-ink/80 hover:text-ink">
              {t(i.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <Button href={`/${locale}/iletisim`} size="sm">
            {t('appointment')}
          </Button>
        </div>
      </Container>
    </header>
  )
}
```

`components/layout/LocaleSwitcher.tsx`:

```typescript
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const other = currentLocale === 'tr' ? 'en' : 'tr'
  const newPath = pathname.replace(`/${currentLocale}`, `/${other}`)
  return (
    <Link href={newPath} className="text-label uppercase text-ink/70 hover:text-ink">
      {other}
    </Link>
  )
}
```

- [ ] **Step 3: Footer**

`components/layout/Footer.tsx`:

```typescript
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  return (
    <footer className="bg-ink py-12 text-cream">
      <Container className="grid gap-8 lg:grid-cols-4">
        <div>
          <div className="text-h3 font-bold">Gamze Sevin</div>
          <p className="mt-2 text-body-sm text-cream/70">
            Klinik Psikolog • İzmir ve online seanslar
          </p>
        </div>
        <div>
          <div className="text-label uppercase text-cream/60">Sayfalar</div>
          <ul className="mt-3 space-y-2 text-body-sm">
            <li><Link href={`/${locale}/hakkimda`} className="hover:text-white">Hakkımda</Link></li>
            <li><Link href={`/${locale}/terapi-yaklasimlari`} className="hover:text-white">Terapi Yaklaşımları</Link></li>
            <li><Link href={`/${locale}/calisma-alanlari`} className="hover:text-white">Çalışma Alanları</Link></li>
            <li><Link href={`/${locale}/online-terapi`} className="hover:text-white">Online Terapi</Link></li>
            <li><Link href={`/${locale}/blog`} className="hover:text-white">Blog</Link></li>
            <li><Link href={`/${locale}/iletisim`} className="hover:text-white">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-label uppercase text-cream/60">İletişim</div>
          <ul className="mt-3 space-y-2 text-body-sm">
            <li><a href="https://wa.me/905385184448" className="hover:text-white">WhatsApp: +90 538 518 44 48</a></li>
            <li><a href="mailto:klinikpsk.gamzesevin@gmail.com" className="hover:text-white">klinikpsk.gamzesevin@gmail.com</a></li>
            <li><a href="https://www.linkedin.com/in/gamze-sevin-aa1899242/" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <div className="text-label uppercase text-cream/60">Yasal</div>
          <ul className="mt-3 space-y-2 text-body-sm">
            <li><Link href={`/${locale}/kvkk-aydinlatma-metni`} className="hover:text-white">{t('kvkk')}</Link></li>
            <li><Link href={`/${locale}/cerez-politikasi`} className="hover:text-white">{t('cookies')}</Link></li>
            <li><Link href={`/${locale}/gizlilik-politikasi`} className="hover:text-white">{t('privacy')}</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-cream/10 pt-6 text-body-sm text-cream/60">
        © {new Date().getFullYear()} Gamze Sevin. {t('rights')}
      </Container>
    </footer>
  )
}
```

- [ ] **Step 4: WhatsAppFab (sticky)**

`components/layout/WhatsAppFab.tsx`:

```typescript
export function WhatsAppFab({ phone }: { phone: string }) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-hover transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    </a>
  )
}
```

- [ ] **Step 5: Layout'ta wire et**

`app/[locale]/layout.tsx` — `children` etrafına Header + Footer + Fab:

```typescript
// ... imports + montserrat aynı ...
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'

// ...
return (
  <html lang={locale} className={montserrat.variable}>
    <body className="bg-white font-sans text-ink antialiased">
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer locale={locale} />
        <WhatsAppFab phone="905385184448" />
      </NextIntlClientProvider>
    </body>
  </html>
)
```

- [ ] **Step 6: tsconfig path alias**

`tsconfig.json` `compilerOptions`:

```json
"baseUrl": ".",
"paths": { "@/*": ["./*"] }
```

- [ ] **Step 7: Test**

```bash
npm run dev
```

`/tr` → Header + ana içerik + Footer + WhatsApp FAB görünür. `/en` → İngilizce nav etiketleri. WhatsApp tıklanınca yeni sekmede `wa.me/905385184448` açar.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: Header, Footer, WhatsAppFab, UI primitives"
```

---

## Faz 2 — Sanity İçerik Modeli

### Task 6: Locale + SEO yardımcı schema'ları

**Files:**
- Create: `sanity/schemas/objects/localeString.ts`, `localeText.ts`, `localePortableText.ts`, `seoMeta.ts`

- [ ] **Step 1: localeString object**

`sanity/schemas/objects/localeString.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Locale String',
  type: 'object',
  fields: [
    defineField({ name: 'tr', title: 'Türkçe', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
})
```

- [ ] **Step 2: localeText**

`sanity/schemas/objects/localeText.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Locale Text',
  type: 'object',
  fields: [
    defineField({ name: 'tr', title: 'Türkçe', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
  ],
})
```

- [ ] **Step 3: localePortableText**

`sanity/schemas/objects/localePortableText.ts`:

```typescript
import { defineField, defineType } from 'sanity'

const blockConfig = {
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraf', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Alıntı', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Kalın', value: 'strong' },
          { title: 'İtalik', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'url', title: 'URL' }],
          },
        ],
      },
    },
    { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt' }] },
  ],
} as const

export const localePortableText = defineType({
  name: 'localePortableText',
  title: 'Locale Portable Text',
  type: 'object',
  fields: [
    defineField({ name: 'tr', title: 'Türkçe', ...blockConfig, validation: (r) => r.required() }),
    defineField({ name: 'en', title: 'English', ...blockConfig }),
  ],
})
```

- [ ] **Step 4: seoMeta object**

`sanity/schemas/objects/seoMeta.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const seoMeta = defineType({
  name: 'seoMeta',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (r) => r.custom((val: any) => {
        if (val?.tr && val.tr.length > 160) return 'TR description should be ≤160 chars'
        return true
      }),
    }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'noIndex', title: 'noindex (Google indekslemesin)', type: 'boolean', initialValue: false }),
  ],
})
```

- [ ] **Step 5: Index'e ekle**

`sanity/schemas/index.ts`:

```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { localeString } from './objects/localeString'
import { localeText } from './objects/localeText'
import { localePortableText } from './objects/localePortableText'
import { seoMeta } from './objects/seoMeta'

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localePortableText,
  seoMeta,
]
```

- [ ] **Step 6: Test — Studio yenile**

`npm run dev` → `/studio` aç. Yeni "Locale String" tipi şema seçicide görünür (henüz doküman yok).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(sanity): locale + seo helper schemas"
```

---

### Task 7: Singleton schemas — siteSettings, homePage, aboutPage, onlineTherapyPage, contactPage

**Files:**
- Create: `sanity/schemas/singletons/siteSettings.ts`, `homePage.ts`, `aboutPage.ts`, `onlineTherapyPage.ts`, `contactPage.ts`

- [ ] **Step 1: siteSettings**

`sanity/schemas/singletons/siteSettings.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp (E.164, +0 olmadan)', type: 'string', description: 'Örn: 905385184448' }),
    defineField({ name: 'email', title: 'E-posta', type: 'string', validation: (r) => r.email() }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'address', title: 'Ofis Adresi', type: 'localeText' }),
    defineField({
      name: 'geo',
      title: 'Konum (harita için)',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Lat' },
        { name: 'lng', type: 'number', title: 'Lng' },
      ],
    }),
    defineField({
      name: 'workingHours',
      title: 'Çalışma Saatleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'string', title: 'Gün' },
            { name: 'hours', type: 'string', title: 'Saatler' },
          ],
        },
      ],
    }),
    defineField({ name: 'ga4Id', title: 'GA4 Measurement ID', type: 'string', description: 'G-XXXXXXX' }),
    defineField({ name: 'cookiePolicyText', title: 'Çerez Politikası Metni', type: 'localePortableText' }),
    defineField({ name: 'kvkkText', title: 'KVKK Aydınlatma Metni', type: 'localePortableText' }),
    defineField({ name: 'privacyPolicyText', title: 'Gizlilik Politikası Metni', type: 'localePortableText' }),
  ],
  preview: { prepare: () => ({ title: 'Site Ayarları' }) },
})
```

- [ ] **Step 2: homePage**

`sanity/schemas/singletons/homePage.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Anasayfa',
  type: 'document',
  fields: [
    defineField({ name: 'heroPill', title: 'Hero Pill (Klinik Psikolog)', type: 'localeString' }),
    defineField({ name: 'heroTitle', title: 'Hero Başlık', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'heroSubtitle', title: 'Hero Altyazı', type: 'localeText' }),
    defineField({ name: 'heroPortrait', title: 'Hero Portre', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutTeaser', title: 'Hakkımda Özet (2-3 cümle)', type: 'localeText' }),
    defineField({ name: 'aboutBadges', title: 'Rozetler (Boğaziçi, Koç, EABCT, EMDR)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'onlineQuote', title: 'Online Terapi Alıntı', type: 'localeText' }),
    defineField({ name: 'ctaTitle', title: 'CTA Başlığı (Sayfa altı)', type: 'localeString' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: { prepare: () => ({ title: 'Anasayfa' }) },
})
```

- [ ] **Step 3: aboutPage**

`sanity/schemas/singletons/aboutPage.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Hakkımda',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Tanıtım (PortableText)', type: 'localePortableText' }),
    defineField({ name: 'photo', title: 'Fotoğraf', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'clinicalExperience',
      title: 'Klinik Deneyim',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'place', type: 'localeString', title: 'Kurum' }, { name: 'role', type: 'localeString', title: 'Rol' }] }],
    }),
    defineField({ name: 'approach', title: 'Mesleki Yaklaşım', type: 'localePortableText' }),
    defineField(
      {
        name: 'publications',
        title: 'Yayınlar',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', type: 'localeString', title: 'Başlık' },
              { name: 'venue', type: 'localeString', title: 'Yayın Yeri' },
              { name: 'doi', type: 'string', title: 'DOI veya URL' },
            ],
          },
        ],
      },
    ),
    defineField({
      name: 'education',
      title: 'Eğitim',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'school', type: 'string', title: 'Okul' }, { name: 'degree', type: 'localeString', title: 'Derece' }] }],
    }),
    defineField({
      name: 'certificates',
      title: 'Sertifikalar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'localeString', title: 'Sertifika' },
            { name: 'trainer', type: 'string', title: 'Eğitmen/Kurum' },
            { name: 'accreditation', type: 'string', title: 'Akreditasyon' },
          ],
        },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: { prepare: () => ({ title: 'Hakkımda' }) },
})
```

- [ ] **Step 4: onlineTherapyPage**

`sanity/schemas/singletons/onlineTherapyPage.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const onlineTherapyPage = defineType({
  name: 'onlineTherapyPage',
  title: 'Online Terapi',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Giriş', type: 'localePortableText' }),
    defineField({
      name: 'steps',
      title: 'Süreç Adımları (4 adım)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'localeString', title: 'Başlık' },
            { name: 'description', type: 'localeText', title: 'Açıklama' },
          ],
        },
      ],
      validation: (r) => r.length(4),
    }),
    defineField({ name: 'security', title: 'Güvenlik / Gizlilik', type: 'localePortableText' }),
    defineField({ name: 'requirements', title: 'Teknik Gereksinimler', type: 'localePortableText' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: { prepare: () => ({ title: 'Online Terapi' }) },
})
```

- [ ] **Step 5: contactPage**

`sanity/schemas/singletons/contactPage.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'İletişim',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Giriş Metni', type: 'localePortableText' }),
    defineField({ name: 'formDisclosure', title: 'Form KVKK Aydınlatma', type: 'localePortableText' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: { prepare: () => ({ title: 'İletişim' }) },
})
```

- [ ] **Step 6: index'e ekle**

`sanity/schemas/index.ts`:

```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { localeString } from './objects/localeString'
import { localeText } from './objects/localeText'
import { localePortableText } from './objects/localePortableText'
import { seoMeta } from './objects/seoMeta'
import { siteSettings } from './singletons/siteSettings'
import { homePage } from './singletons/homePage'
import { aboutPage } from './singletons/aboutPage'
import { onlineTherapyPage } from './singletons/onlineTherapyPage'
import { contactPage } from './singletons/contactPage'

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localePortableText,
  seoMeta,
  siteSettings,
  homePage,
  aboutPage,
  onlineTherapyPage,
  contactPage,
]
```

- [ ] **Step 7: Studio'da test**

`/studio` → her singleton'u manuel yarat (henüz structure sabitleme yok). Her birinin formu eksiksiz açılmalı.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(sanity): singleton schemas — siteSettings + 4 page singletons"
```

---

### Task 8: Çoklu doküman schemaları — therapyApproach, conditionArea, blogPost, blogCategory, faqItem

**Files:**
- Create: `sanity/schemas/documents/therapyApproach.ts`, `conditionArea.ts`, `blogPost.ts`, `blogCategory.ts`, `faqItem.ts`

- [ ] **Step 1: therapyApproach**

`sanity/schemas/documents/therapyApproach.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const therapyApproach = defineType({
  name: 'therapyApproach',
  title: 'Terapi Yaklaşımı',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'shortName', title: 'Kısa İsim (BDT, EMDR, SÇT)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.tr', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'Özet (1-2 cümle)', type: 'localeText' }),
    defineField({ name: 'content', title: 'İçerik (yöntem açıklaması)', type: 'localePortableText' }),
    defineField({ name: 'forWhom', title: 'Kimlere Uygundur?', type: 'localePortableText' }),
    defineField({ name: 'duration', title: 'Süre (ortalama)', type: 'localeString' }),
    defineField({
      name: 'sources',
      title: 'Kaynaklar',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'url' }] }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: {
    select: { title: 'title.tr', subtitle: 'shortName' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
})
```

- [ ] **Step 2: conditionArea**

`sanity/schemas/documents/conditionArea.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const conditionArea = defineType({
  name: 'conditionArea',
  title: 'Çalışma Alanı',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.tr', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Ruhsal Bozukluklar', value: 'mental' },
          { title: 'Diğer Sorunlar', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'summary', title: 'Özet (1 cümle)', type: 'localeText' }),
    defineField({
      name: 'symptoms',
      title: 'Belirtiler (liste)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({ name: 'content', title: 'Detaylı İçerik', type: 'localePortableText' }),
    defineField({
      name: 'recommendedApproach',
      title: 'Önerilen Yaklaşım',
      type: 'reference',
      to: [{ type: 'therapyApproach' }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: {
    select: { title: 'title.tr', category: 'category' },
    prepare: ({ title, category }) => ({ title, subtitle: category === 'mental' ? 'Ruhsal' : 'Diğer' }),
  },
})
```

- [ ] **Step 3: blogCategory**

`sanity/schemas/documents/blogCategory.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Kategorisi',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', title: 'Başlık', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.tr' }, validation: (r) => r.required() }),
    defineField({ name: 'color', type: 'string', title: 'Renk (hex)', description: 'Örn: #547792' }),
  ],
})
```

- [ ] **Step 4: blogPost**

`sanity/schemas/documents/blogPost.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', title: 'Başlık', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title.tr', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'cover', type: 'image', title: 'Kapak Görseli', options: { hotspot: true } }),
    defineField({ name: 'excerpt', type: 'localeText', title: 'Özet' }),
    defineField({ name: 'content', type: 'localePortableText', title: 'İçerik' }),
    defineField({ name: 'author', type: 'string', title: 'Yazar', initialValue: 'Gamze Sevin' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Yayın Tarihi', validation: (r) => r.required() }),
    defineField({
      name: 'categories',
      title: 'Kategoriler',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
    }),
    defineField({
      name: 'related',
      title: 'İlgili Yazılar',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoMeta' }),
  ],
  preview: {
    select: { title: 'title.tr', media: 'cover', publishedAt: 'publishedAt' },
    prepare: ({ title, media, publishedAt }) => ({
      title,
      subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('tr') : 'Taslak',
      media,
    }),
  },
})
```

- [ ] **Step 5: faqItem**

`sanity/schemas/documents/faqItem.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'SSS Sorusu',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'localeString', title: 'Soru', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'localePortableText', title: 'Cevap', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Genel', value: 'general' },
          { title: 'Online', value: 'online' },
          { title: 'Süre/Sıklık', value: 'duration' },
          { title: 'Gizlilik', value: 'privacy' },
        ],
      },
    }),
    defineField({ name: 'order', type: 'number', title: 'Sıralama', initialValue: 0 }),
    defineField({ name: 'showOnHome', type: 'boolean', title: 'Anasayfada göster', initialValue: true }),
  ],
  preview: {
    select: { title: 'question.tr', order: 'order' },
    prepare: ({ title, order }) => ({ title, subtitle: `#${order}` }),
  },
})
```

- [ ] **Step 6: Schemas index'e ekle**

`sanity/schemas/index.ts` — yeni 5 schema'yı `import` + dizi sonuna ekle:

```typescript
import { therapyApproach } from './documents/therapyApproach'
import { conditionArea } from './documents/conditionArea'
import { blogCategory } from './documents/blogCategory'
import { blogPost } from './documents/blogPost'
import { faqItem } from './documents/faqItem'

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString, localeText, localePortableText, seoMeta,
  siteSettings, homePage, aboutPage, onlineTherapyPage, contactPage,
  therapyApproach, conditionArea, blogCategory, blogPost, faqItem,
]
```

- [ ] **Step 7: Studio doğrulama**

`/studio` → "Therapy Approach" tipinden yeni döküman dene → tüm alanlar yüklenir, validation çalışır.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(sanity): document schemas — approach, condition, blog, faq"
```

---

### Task 9: Studio structure — singleton sabitleme + grup başlıkları

**Files:**
- Create: `sanity/structure.ts`
- Modify: `sanity.config.ts`

- [ ] **Step 1: structure tanımı**

`sanity/structure.ts`:

```typescript
import type { StructureBuilder } from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage', 'onlineTherapyPage', 'contactPage'] as const

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('İçerik')
    .items([
      S.listItem().title('Site Ayarları').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('Anasayfa').id('homePage').child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('Hakkımda').id('aboutPage').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem().title('Online Terapi').id('onlineTherapyPage').child(S.document().schemaType('onlineTherapyPage').documentId('onlineTherapyPage')),
      S.listItem().title('İletişim').id('contactPage').child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),
      S.documentTypeListItem('therapyApproach').title('Terapi Yaklaşımları'),
      S.documentTypeListItem('conditionArea').title('Çalışma Alanları'),
      S.divider(),
      S.documentTypeListItem('blogPost').title('Blog Yazıları'),
      S.documentTypeListItem('blogCategory').title('Blog Kategorileri'),
      S.divider(),
      S.documentTypeListItem('faqItem').title('SSS'),
    ])

export const isSingleton = (type: string) => (SINGLETONS as readonly string[]).includes(type)
```

- [ ] **Step 2: sanity.config.ts — structure + singleton'lar için "Create" gizle**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemas'
import { structure, isSingleton } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => !isSingleton(t.schemaType)),
  },
  document: {
    actions: (prev, ctx) =>
      isSingleton(ctx.schemaType) ? prev.filter(({ action }) => !['duplicate', 'delete'].includes(action || '')) : prev,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
```

- [ ] **Step 3: Studio'yu yenile**

`/studio` → sol menü Türkçe gruplarla görünür. "Site Ayarları" tıklanınca tek doküman açar (yeni yaratma butonu yok).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(sanity): structure with pinned singletons"
```

---

## Faz 3 — İçerik Migrasyonu (Seed)

### Task 10: Sanity client + write token

**Files:**
- Create: `lib/sanity/client.ts`, `lib/sanity/image.ts`

- [ ] **Step 1: Sanity dashboard'da write token oluştur**

sanity.io/manage → proje → API → Add token → `Editor` permissions → kopyala.

`.env.local` ekle:

```
SANITY_API_WRITE_TOKEN=skXXXXXX
```

- [ ] **Step 2: Read client**

`lib/sanity/client.ts`:

```typescript
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, readToken } from '@/sanity/env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'published',
})
```

`lib/sanity/image.ts`:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId } from '@/sanity/env'

const builder = imageUrlBuilder({ projectId, dataset })

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(sanity): client + image url builder"
```

---

### Task 11: site_icerikleri.md parser

**Files:**
- Create: `scripts/lib/parse-content.ts`, `scripts/lib/types.ts`
- Create: `tests/scripts/parse-content.test.ts`

- [ ] **Step 1: Install test runner**

```bash
npm install -D vitest @vitest/ui tsx
```

`vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, '.') },
  },
})
```

`package.json` scripts'e ekle:

```json
"test": "vitest run",
"test:watch": "vitest",
"seed": "tsx scripts/seed.ts"
```

- [ ] **Step 2: Types**

`scripts/lib/types.ts`:

```typescript
export type ParsedContent = {
  siteSettings: {
    email: string
    phone: string
    whatsapp: string
    linkedin: string
  }
  home: {
    welcomeMarkdown: string
    ctaText: string
    footerSlogan: string
  }
  about: {
    introMarkdown: string
    approachMarkdown: string
    clinicalExperience: string[]
    education: Array<{ school: string; degree: string }>
    publications: Array<{ title: string; venue: string; doi?: string }>
    certificates: Array<{ name: string; trainer: string; accreditation: string }>
  }
  approaches: Array<{ shortName: string; title: string; description: string }>
  conditions: {
    mental: string[]
    other: string[]
  }
}
```

- [ ] **Step 3: Failing test**

`tests/scripts/parse-content.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseSiteIcerikleri } from '@/scripts/lib/parse-content'

describe('parseSiteIcerikleri', () => {
  const md = readFileSync(resolve(__dirname, '../../site_icerikleri.md'), 'utf-8')
  const parsed = parseSiteIcerikleri(md)

  it('extracts contact info', () => {
    expect(parsed.siteSettings.email).toBe('klinikpsk.gamzesevin@gmail.com')
    expect(parsed.siteSettings.whatsapp).toBe('905385184448')
    expect(parsed.siteSettings.linkedin).toContain('linkedin.com/in/gamze-sevin')
  })

  it('extracts 3 therapy approaches', () => {
    expect(parsed.approaches).toHaveLength(3)
    const shortNames = parsed.approaches.map((a) => a.shortName)
    expect(shortNames).toContain('BDT')
    expect(shortNames).toContain('EMDR')
    expect(shortNames).toContain('SÇT')
  })

  it('extracts mental disorders (≥9 items)', () => {
    expect(parsed.conditions.mental.length).toBeGreaterThanOrEqual(9)
    expect(parsed.conditions.mental.some((c) => c.toLowerCase().includes('depresyon'))).toBe(true)
  })

  it('extracts education with Boğaziçi + Koç', () => {
    const schools = parsed.about.education.map((e) => e.school)
    expect(schools.some((s) => s.includes('Boğaziçi'))).toBe(true)
    expect(schools.some((s) => s.includes('Koç'))).toBe(true)
  })

  it('extracts certificates (≥8)', () => {
    expect(parsed.about.certificates.length).toBeGreaterThanOrEqual(8)
  })
})
```

- [ ] **Step 4: Run test (FAIL)**

```bash
npm test
```

Expected: `parseSiteIcerikleri is not a function`.

- [ ] **Step 5: Parser implementation**

`scripts/lib/parse-content.ts`:

```typescript
import type { ParsedContent } from './types'

export function parseSiteIcerikleri(md: string): ParsedContent {
  const lines = md.split('\n')
  const get = (re: RegExp, fallback = '') => md.match(re)?.[1]?.trim() ?? fallback

  // İletişim
  const email = get(/E-posta:\*\*\s*([^\s\n]+)/) || 'klinikpsk.gamzesevin@gmail.com'
  const phone = get(/Telefon:\*\*\s*\+?([\d\s]+)/).replace(/\s/g, '') || '905385184448'
  const whatsappUrl = get(/WhatsApp:\*\*\s*(https:\/\/wa\.me\/\d+)/) || 'https://wa.me/905385184448'
  const whatsapp = whatsappUrl.split('/').pop() || '905385184448'
  const linkedin = get(/LinkedIn:\*\*\s*(https:\/\/[^\s]+)/) || 'https://www.linkedin.com/in/gamze-sevin-aa1899242/'

  // Yaklaşımlar — başlık formatı: **Bilişsel Davranışçı Terapi (BDT)**
  const approachRe = /\*\*([^*]+?)\s*\(([^)]+)\)\*\*\n([^\n]+(?:\n(?!\*\*|###|##)[^\n]+)*)/g
  const approaches: ParsedContent['approaches'] = []
  let m: RegExpExecArray | null
  while ((m = approachRe.exec(md)) !== null) {
    const [, title, short, desc] = m
    if (['BDT', 'SÇT', 'EMDR', 'Göz Hareketleriyle Duyarsızlaştırma ve Yeniden İşleme'].includes(short.trim())) {
      approaches.push({
        title: title.trim(),
        shortName: short.includes('EMDR') ? 'EMDR' : short.trim(),
        description: desc.trim(),
      })
    }
  }

  // Çalışma alanları — section "**Ruhsal Bozukluklar**" sonrası bullet liste
  const mentalBlock = md.split('**Ruhsal Bozukluklar**')[1]?.split('**Diğer Sorunlar**')[0] ?? ''
  const otherBlock = md.split('**Diğer Sorunlar**')[1]?.split('## ')[0] ?? ''
  const bullets = (block: string) =>
    block
      .split('\n')
      .map((l) => l.replace(/^[-•]\s*/, '').trim())
      .filter((l) => l.length > 0 && !l.startsWith('**'))

  // Education
  const educationBlock = md.split('## Eğitim / Diplomalar')[1]?.split('## ')[0] ?? ''
  const education: ParsedContent['about']['education'] = []
  for (const line of educationBlock.split('\n')) {
    const em = line.match(/\*\*([^*]+)\*\*\s*—\s*(.+)/)
    if (em) education.push({ school: em[1].trim(), degree: em[2].trim() })
  }

  // Publications
  const pubBlock = md.split('## Araştırmalar / Yayınlar')[1]?.split('## ')[0] ?? ''
  const pubItems = pubBlock.split(/\n\d+\.\s+/).slice(1)
  const publications = pubItems.map((item) => {
    const [titleLine, ...rest] = item.split('\n').map((l) => l.trim()).filter(Boolean)
    const venue = rest.find((r) => r.startsWith('- ') && !r.includes('DOI'))?.replace(/^- /, '') ?? ''
    const doi = rest.find((r) => r.includes('DOI'))?.replace(/^- DOI:\s*/, '') ?? undefined
    return { title: titleLine.replace(/^\*\*|\*\*$/g, '').trim(), venue, doi }
  })

  // Certificates — markdown tablo
  const certBlock = md.split('## Sertifikalar / Eğitimler')[1]?.split('## ')[0] ?? ''
  const certs: ParsedContent['about']['certificates'] = []
  for (const line of certBlock.split('\n')) {
    if (line.startsWith('|') && !line.includes('---') && !line.includes('Sertifika')) {
      const cells = line.split('|').map((c) => c.trim()).filter(Boolean)
      if (cells.length >= 3) certs.push({ name: cells[0], trainer: cells[1], accreditation: cells[2] })
    }
  }

  return {
    siteSettings: { email, phone: `+${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10)}`, whatsapp, linkedin },
    home: {
      welcomeMarkdown: md.split('## Hoşgeldiniz Bölümü')[1]?.split('## ')[0]?.trim() ?? '',
      ctaText: md.split('## İletişim CTA')[1]?.split('## ')[0]?.replace(/^>\s*/gm, '').trim() ?? '',
      footerSlogan: md.split('## Footer Sloganı')[1]?.split('---')[0]?.replace(/^>\s*/gm, '').trim() ?? '',
    },
    about: {
      introMarkdown: md.split('## Tanıtım')[1]?.split('## ')[0]?.replace(/^>\s*/gm, '').trim() ?? '',
      approachMarkdown: md.split('## Mesleki Yaklaşım')[1]?.split('## ')[0]?.replace(/^>\s*/gm, '').trim() ?? '',
      clinicalExperience: bullets(md.split('## Klinik Deneyim')[1]?.split('## ')[0] ?? ''),
      education,
      publications,
      certificates: certs,
    },
    approaches,
    conditions: { mental: bullets(mentalBlock), other: bullets(otherBlock) },
  }
}
```

- [ ] **Step 6: Run test (PASS)**

```bash
npm test
```

Expected: tüm assertion'lar geçer.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(scripts): parse site_icerikleri.md with tests"
```

---

### Task 12: Seed scripti — singleton'lar + therapyApproach'lar

**Files:**
- Create: `scripts/seed.ts`, `scripts/lib/sanity-write.ts`

- [ ] **Step 1: Write client helper**

`scripts/lib/sanity-write.ts`:

```typescript
import { createClient } from '@sanity/client'

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

export function locale(tr: string, en?: string) {
  return { _type: 'localeString', tr, en: en ?? `[EN] ${tr}` }
}

export function localeText(tr: string, en?: string) {
  return { _type: 'localeText', tr, en: en ?? `[EN] ${tr}` }
}

export function localeBlock(tr: string, en?: string) {
  const toBlocks = (text: string) =>
    text
      .split(/\n\n+/)
      .filter(Boolean)
      .map((para, i) => ({
        _type: 'block',
        _key: `k${i}`,
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: `s${i}`, text: para.replace(/\n/g, ' '), marks: [] }],
      }))
  return { _type: 'localePortableText', tr: toBlocks(tr), en: en ? toBlocks(en) : toBlocks(`[EN] ${tr.slice(0, 60)}…`) }
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
```

- [ ] **Step 2: dotenv install**

```bash
npm install -D dotenv
```

- [ ] **Step 3: seed.ts — siteSettings + homePage**

`scripts/seed.ts`:

```typescript
import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { writeClient, locale, localeText, localeBlock, slugify } from './lib/sanity-write'
import { parseSiteIcerikleri } from './lib/parse-content'

const md = readFileSync(resolve(process.cwd(), 'site_icerikleri.md'), 'utf-8')
const data = parseSiteIcerikleri(md)

async function seedSiteSettings() {
  await writeClient.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    phone: data.siteSettings.phone,
    whatsapp: data.siteSettings.whatsapp,
    email: data.siteSettings.email,
    linkedin: data.siteSettings.linkedin,
    address: localeText('İzmir, Türkiye (tam adres ayrıca eklenecek)', 'İzmir, Türkiye (full address to be added)'),
    workingHours: [
      { _key: 'w1', day: 'Pazartesi-Cuma', hours: '10:00 - 19:00' },
      { _key: 'w2', day: 'Cumartesi', hours: '10:00 - 15:00' },
    ],
    cookiePolicyText: localeBlock('Çerez politikası metni burada yer alacak. Site analitik için Google Analytics 4 kullanır; onayınız alınmadan çerezler yüklenmez.'),
    kvkkText: localeBlock('KVKK aydınlatma metni burada yer alacak. Form aracılığıyla paylaştığınız ad, e-posta, telefon ve mesaj bilgileri sadece talebinizi yanıtlamak amacıyla işlenir.'),
    privacyPolicyText: localeBlock('Gizlilik politikası metni burada yer alacak.'),
  })
  console.log('✓ siteSettings')
}

async function seedHomePage() {
  await writeClient.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroPill: locale('Klinik Psikolog', 'Clinical Psychologist'),
    heroTitle: locale('Bilime dayalı, destekleyici terapi.', 'Science-based, supportive therapy.'),
    heroSubtitle: localeText(
      'Boğaziçi Üniversitesi Psikoloji yüksek onur derecesi ve Koç Üniversitesi Klinik Psikoloji yüksek lisansı. BDT, EMDR ve Sorun Çözme Terapisi yöntemleriyle yetişkin, çift, ergen ve çocuklara destek.',
      'Boğaziçi University Psychology (high honors) and Koç University Clinical Psychology MA. Support for adults, couples, adolescents and children through CBT, EMDR and Problem Solving Therapy.',
    ),
    aboutTeaser: localeText(
      'Empatiyi bilimsel yaklaşımla bütünleştiren bir klinik psikolog/psikoterapistim. Danışanlarımın duygusal güçlüklerle başa çıkmalarına, yaşam hedeflerine yönelmelerine destek oluyorum.',
    ),
    aboutBadges: ['Boğaziçi', 'Koç', 'EABCT Akredite', 'EMDR Avrupa Akredite'],
    onlineQuote: localeText('Araştırmalar online seansların yüz yüze seanslar kadar etkili olduğunu göstermektedir.'),
    ctaTitle: locale('İlk adımı atmaya hazırsanız buradayım.', "I'm here whenever you're ready to take the first step."),
    seo: {
      title: locale(
        'İzmir Klinik Psikolog | Gamze Sevin — BDT, EMDR, Online Terapi',
        'Clinical Psychologist Gamze Sevin | CBT, EMDR, Online Therapy',
      ),
      description: localeText(
        'İzmir ve online seanslarla BDT, EMDR ve Sorun Çözme Terapisi. Boğaziçi & Koç mezunu klinik psikolog Gamze Sevin.',
        'CBT, EMDR and Problem Solving Therapy — in İzmir and online. Clinical psychologist Gamze Sevin (Boğaziçi & Koç).',
      ),
    },
  })
  console.log('✓ homePage')
}

async function seedApproaches() {
  for (const a of data.approaches) {
    const id = `therapyApproach.${a.shortName.toLowerCase()}`
    await writeClient.createOrReplace({
      _id: id,
      _type: 'therapyApproach',
      title: locale(a.title),
      shortName: a.shortName,
      slug: { _type: 'slug', current: slugify(a.shortName === 'SÇT' ? 'sorun-cozme-terapisi' : a.shortName === 'BDT' ? 'bdt' : 'emdr') },
      summary: localeText(a.description.split('. ').slice(0, 1).join('. ') + '.'),
      content: localeBlock(a.description),
      forWhom: localeBlock(
        a.shortName === 'BDT'
          ? 'Depresyon, anksiyete bozuklukları, OKB, sosyal fobi, panik bozukluk, sağlık kaygısı ve performans kaygısı yaşayan kişilere uygundur. Düşünce-davranış kalıplarını değiştirmeye odaklanan yapılandırılmış bir yaklaşımdır.'
          : a.shortName === 'EMDR'
          ? 'Travma sonrası stres bozukluğu, travmatik anılar, fobi ve kayıp-yas yaşayan kişilere uygundur. Olumsuz anıların duygusal yükünü azaltmak için göz hareketleri/çift yönlü uyarımlar kullanılır.'
          : 'Günlük yaşam problemleri, karar zorlukları, stresli olaylarla başa çıkma güçlüğü yaşayan kişilere uygundur. Pratik problem çözme becerilerini öğretir.',
      ),
      duration: locale(
        a.shortName === 'BDT' ? '8-16 seans' : a.shortName === 'EMDR' ? '6-12 seans' : '6-10 seans',
        a.shortName === 'BDT' ? '8-16 sessions' : a.shortName === 'EMDR' ? '6-12 sessions' : '6-10 sessions',
      ),
      seo: {
        title: locale(`${a.title} — Gamze Sevin`),
        description: localeText(a.description.slice(0, 155) + '…'),
      },
    })
    console.log(`✓ approach: ${a.shortName}`)
  }
}

async function main() {
  await seedSiteSettings()
  await seedHomePage()
  await seedApproaches()
  console.log('\nFaz 3.A seed complete.')
}

main().catch((e) => { console.error(e); process.exit(1) })
```

- [ ] **Step 4: Run seed**

```bash
npm run seed
```

Expected çıktı: `✓ siteSettings`, `✓ homePage`, `✓ approach: BDT`, `✓ approach: EMDR`, `✓ approach: SÇT`.

- [ ] **Step 5: Studio doğrulama**

`/studio` → "Site Ayarları" doldurulu; "Anasayfa" hero metinleri TR + EN; "Terapi Yaklaşımları" 3 kayıt.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(seed): siteSettings + homePage + 3 therapy approaches"
```

---

### Task 13: Seed — conditionArea (17), aboutPage, onlineTherapyPage, contactPage, faqItem (8), 1 blogPost

**Files:**
- Modify: `scripts/seed.ts`
- Create: `scripts/lib/condition-content.ts`

- [ ] **Step 1: Condition templates**

`scripts/lib/condition-content.ts`:

```typescript
import { locale, localeText, localeBlock, slugify } from './sanity-write'

type Condition = { tr: string; en: string; category: 'mental' | 'other'; symptoms: string[]; approach: 'bdt' | 'emdr' | 'sct'; summary: string }

export const CONDITIONS: Condition[] = [
  { tr: 'Depresyon', en: 'Depression', category: 'mental', approach: 'bdt',
    summary: 'Uzun süreli mutsuzluk, ilgi kaybı ve enerjisizlik ile seyreden ruhsal bozukluk.',
    symptoms: ['Sürekli üzüntü hissi', 'İlgi/zevk kaybı', 'Uyku ve iştah değişiklikleri', 'Yorgunluk', 'Değersizlik hissi'],
  },
  { tr: 'Yaygın Anksiyete Bozukluğu', en: 'Generalized Anxiety Disorder', category: 'mental', approach: 'bdt',
    summary: 'Çeşitli konularda kontrol edilemeyen aşırı endişe ve gerginlik.',
    symptoms: ['Sürekli endişe', 'Kas gerginliği', 'Uyku güçlüğü', 'Konsantrasyon güçlüğü'],
  },
  { tr: 'Sosyal Anksiyete Bozukluğu', en: 'Social Anxiety Disorder', category: 'mental', approach: 'bdt',
    summary: 'Sosyal ortamlarda yargılanma korkusu ve kaçınma davranışları.',
    symptoms: ['Sosyal ortamlarda kaygı', 'Topluluk önünde konuşma korkusu', 'Kaçınma davranışları'],
  },
  { tr: 'Panik Bozukluk ve Agorafobi', en: 'Panic Disorder & Agoraphobia', category: 'mental', approach: 'bdt',
    summary: 'Beklenmedik panik atak nöbetleri ve dışarı çıkmaktan kaçınma.',
    symptoms: ['Çarpıntı', 'Nefes darlığı', 'Ölüm korkusu', 'Belirli ortamlardan kaçınma'],
  },
  { tr: 'Obsesif Kompulsif Bozukluk', en: 'Obsessive Compulsive Disorder', category: 'mental', approach: 'bdt',
    summary: 'Tekrarlayan obsesyonlar ve onları azaltmak için yapılan kompulsif davranışlar.',
    symptoms: ['Tekrarlayan zorlayıcı düşünceler', 'Tekrarlayan davranışlar (yıkama, kontrol)', 'Zaman kaybı'],
  },
  { tr: 'Travma Sonrası Stres Bozukluğu', en: 'PTSD', category: 'mental', approach: 'emdr',
    summary: 'Travmatik bir olayın ardından yaşanan tekrarlayan anılar, kaçınma ve uyarılma.',
    symptoms: ['Geri dönüşler (flashback)', 'Kabuslar', 'Uyarılma', 'Kaçınma'],
  },
  { tr: 'Özgül Fobiler', en: 'Specific Phobias', category: 'mental', approach: 'bdt',
    summary: 'Belirli bir nesne veya duruma karşı yoğun, mantıksız korku.',
    symptoms: ['Belirli durum/nesneye yoğun korku', 'Kaçınma', 'Fiziksel kaygı tepkileri'],
  },
  { tr: 'Sağlık Kaygısı', en: 'Health Anxiety', category: 'mental', approach: 'bdt',
    summary: 'Ciddi bir hastalığa yakalanma korkusunun yoğun ve sürekli olması.',
    symptoms: ['Sürekli sağlık kontrolü', 'Doktora aşırı başvuru veya kaçınma', 'Yorum yapma'],
  },
  { tr: 'Performans Kaygısı', en: 'Performance Anxiety', category: 'mental', approach: 'bdt',
    summary: 'Bir görev/sahnede başarısız olma korkusu ile gelen yoğun kaygı.',
    symptoms: ['Görev öncesi yoğun kaygı', 'Bedensel belirtiler', 'Kaçınma'],
  },
  { tr: 'İlişki Problemleri', en: 'Relationship Issues', category: 'other', approach: 'sct',
    summary: 'Çift ilişkilerinde iletişim, güven, çatışma çözme zorlukları.',
    symptoms: ['Sık çatışma', 'İletişim kopukluğu', 'Güven sorunları'],
  },
  { tr: 'İletişim Sorunları', en: 'Communication Issues', category: 'other', approach: 'sct',
    summary: 'Düşünce ve duyguların etkili biçimde aktarılamaması.',
    symptoms: ['Çatışma', 'Yanlış anlaşılma', 'İfade güçlüğü'],
  },
  { tr: 'Davranışsal Sorunlar', en: 'Behavioral Issues', category: 'other', approach: 'bdt',
    summary: 'Uyum bozucu, kişiye veya çevreye zarar verebilecek davranış kalıpları.',
    symptoms: ['İmpulsif davranış', 'Öfke patlamaları', 'Sosyal uyum güçlüğü'],
  },
  { tr: 'Yetersiz Sorun Çözme Becerileri', en: 'Problem Solving Difficulties', category: 'other', approach: 'sct',
    summary: 'Günlük güçlüklere yapısal çözüm üretememe.',
    symptoms: ['Kararsızlık', 'Çaresizlik hissi', 'Erteleme'],
  },
  { tr: 'Değersizlik ve Yetersizlik Hisleri', en: 'Feelings of Worthlessness', category: 'other', approach: 'bdt',
    summary: 'Düşük benlik değeri, kendini yetersiz hissetme.',
    symptoms: ['Olumsuz kendilik konuşması', 'Kıyaslama', 'Geri çekilme'],
  },
  { tr: 'Öfke Sorunları', en: 'Anger Issues', category: 'other', approach: 'bdt',
    summary: 'Öfkenin kontrol edilemez biçimde dışa vurulması veya bastırılması.',
    symptoms: ['Patlamalar', 'İlişki sorunları', 'Bedensel belirtiler'],
  },
  { tr: 'İş Yaşamına İlişkin Sorunlar', en: 'Work-Related Issues', category: 'other', approach: 'sct',
    summary: 'İş yerinde stres, tükenmişlik, kariyer kararsızlığı.',
    symptoms: ['Tükenmişlik', 'Konsantrasyon güçlüğü', 'Motivasyon kaybı'],
  },
  { tr: 'Sınav Kaygısı', en: 'Exam Anxiety', category: 'other', approach: 'bdt',
    summary: 'Sınav öncesi ve sırasında yoğun kaygı.',
    symptoms: ['Sınav öncesi uyku güçlüğü', 'Bedensel belirtiler', 'Donma'],
  },
  { tr: 'Kayıp ve Yas', en: 'Grief & Loss', category: 'other', approach: 'emdr',
    summary: 'Sevilen birinin kaybının ardından yaşanan yas süreci.',
    symptoms: ['Yoğun üzüntü', 'Uyku/iştah değişikliği', 'Anlam kaybı'],
  },
]

export function conditionDocs() {
  return CONDITIONS.map((c, i) => ({
    _id: `conditionArea.${slugify(c.tr)}`,
    _type: 'conditionArea',
    title: locale(c.tr, c.en),
    slug: { _type: 'slug', current: slugify(c.tr) },
    category: c.category,
    summary: localeText(c.summary),
    symptoms: c.symptoms.map((s, j) => ({ _type: 'localeString', _key: `sym${j}`, tr: s, en: `[EN] ${s}` })),
    content: localeBlock(`${c.summary} Bu sayfa Gamze Hanım tarafından detaylandırılacak — kapsamlı içerik eklenince yayına alınacak.`),
    recommendedApproach: { _type: 'reference', _ref: `therapyApproach.${c.approach}` },
    seo: {
      title: locale(`İzmir ${c.tr} Tedavisi | Klinik Psikolog Gamze Sevin`),
      description: localeText(`${c.tr}: ${c.summary}`),
      noIndex: true, // taslak hâlinde — Google'a sızmasın
    },
  }))
}
```

- [ ] **Step 2: seed.ts — conditionArea seed fonksiyonu**

`scripts/seed.ts` — `seedApproaches` altına ekle:

```typescript
import { conditionDocs } from './lib/condition-content'

async function seedConditions() {
  for (const doc of conditionDocs()) {
    await writeClient.createOrReplace(doc)
    console.log(`✓ condition: ${doc.title.tr}`)
  }
}
```

- [ ] **Step 3: aboutPage seed**

`seed.ts` ekle:

```typescript
async function seedAbout() {
  await writeClient.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    intro: localeBlock(data.about.introMarkdown),
    approach: localeBlock(data.about.approachMarkdown),
    clinicalExperience: data.about.clinicalExperience.map((e, i) => ({
      _type: 'object',
      _key: `ce${i}`,
      place: locale(e),
      role: locale(''),
    })),
    education: data.about.education.map((e, i) => ({ _type: 'object', _key: `ed${i}`, school: e.school, degree: locale(e.degree) })),
    publications: data.about.publications.map((p, i) => ({
      _type: 'object',
      _key: `pub${i}`,
      title: locale(p.title),
      venue: locale(p.venue),
      doi: p.doi ?? '',
    })),
    certificates: data.about.certificates.map((c, i) => ({
      _type: 'object',
      _key: `cert${i}`,
      name: locale(c.name),
      trainer: c.trainer,
      accreditation: c.accreditation,
    })),
    seo: {
      title: locale('Hakkımda — Klinik Psikolog Gamze Sevin'),
      description: localeText('Boğaziçi ve Koç mezunu klinik psikolog Gamze Sevin — eğitim, deneyim ve sertifikalar.'),
    },
  })
  console.log('✓ aboutPage')
}
```

- [ ] **Step 4: onlineTherapyPage + contactPage seed**

```typescript
async function seedOnlineTherapy() {
  await writeClient.createOrReplace({
    _id: 'onlineTherapyPage',
    _type: 'onlineTherapyPage',
    intro: localeBlock('Online seanslar yüz yüze görüşmelerle aynı bilimsel temeli ve etkinliği taşır. Pandemi sonrası araştırmalar, terapötik ittifak ve sonuç açısından iki formatın da denk olduğunu göstermektedir.'),
    steps: [
      { _key: 's1', title: locale('İletişim', 'Get in touch'), description: localeText('WhatsApp veya iletişim formu ile başvurun, kısa sürede dönüş yapıyorum.') },
      { _key: 's2', title: locale('Ön Görüşme', 'Initial assessment'), description: localeText('İhtiyacınızı anlamak için 15 dakikalık ücretsiz ön görüşme yapıyoruz.') },
      { _key: 's3', title: locale('Seanslar', 'Sessions'), description: localeText('Haftada 1 görüşme, 45-50 dakika. Çift terapisi 55 dakika.') },
      { _key: 's4', title: locale('Takip', 'Follow-up'), description: localeText('İlerleme sağlandıkça seans aralıkları açılır, kontrol seansları başlar.') },
    ],
    security: localeBlock('Tüm seanslar etik ilkeler ve gizlilik çerçevesinde yürütülür. Görüşmelerinizin içeriği siz açık onay vermediğiniz sürece hiçbir üçüncü kişi ile paylaşılmaz. Online seanslar uçtan uca şifreli platformlar üzerinden yapılır.'),
    requirements: localeBlock('Sessiz, mahremiyetinizin korunduğu bir oda; güvenilir internet bağlantısı (min. 5 Mbps); kamera ve mikrofon. Bilgisayar tercih edilir, telefon da kullanılabilir.'),
    seo: {
      title: locale('Online Terapi — Klinik Psikolog Gamze Sevin', 'Online Therapy — Clinical Psychologist Gamze Sevin'),
      description: localeText('Online psikolojik destek: süreç, güvenlik, randevu — Türkiye geneli ve İngilizce.'),
    },
  })
  console.log('✓ onlineTherapyPage')
}

async function seedContactPage() {
  await writeClient.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    intro: localeBlock('Soru ve randevu talepleriniz için aşağıdaki kanallardan ulaşabilirsiniz. WhatsApp en hızlı dönüş aldığım kanaldır.'),
    formDisclosure: localeBlock('Form aracılığıyla paylaştığınız ad, e-posta, telefon ve mesaj bilgileri 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında sadece talebinizi yanıtlamak amacıyla işlenir, üçüncü kişilerle paylaşılmaz ve makul süre içinde silinir.'),
    seo: {
      title: locale('İletişim — Klinik Psikolog Gamze Sevin'),
      description: localeText('İzmir ofis ve online randevu için WhatsApp, e-posta ve iletişim formu.'),
    },
  })
  console.log('✓ contactPage')
}
```

- [ ] **Step 5: SSS seed — 8 soru**

```typescript
async function seedFaqs() {
  const faqs = [
    { q: 'Terapist seçerken nelere dikkat etmeliyim?', a: 'Yaşadığınız soruna hangi terapi ekolünün iyi geldiğine bakın ve terapinizin aldığı eğitimleri sorgulayın. EABCT veya EMDR Avrupa gibi akredite eğitimler güçlü bir göstergedir.', cat: 'general' },
    { q: 'İlk seansta beni neler bekliyor?', a: 'İlk seans değerlendirme seansıdır; sizi danışmanlığa getiren sorunları anlamak için soru-cevap şeklinde ilerler. Süreçte sorunla bağlantılı çocukluk yaşantıları da konuşulabilir.', cat: 'general' },
    { q: 'Seanslar ne kadar sürüyor?', a: 'Bireysel seanslar 45-50 dakika, çift terapisi seansları 55 dakikadır.', cat: 'duration' },
    { q: 'Toplam süreç ne kadar?', a: 'BDT ve Sorun Çözme Terapisi kısa süreli yaklaşımlardır; pek çok sorun için 8-12 hafta yeterli olabilir. EMDR süresi travmanın özelliğine göre değişir.', cat: 'duration' },
    { q: 'Ne sıklıkla seans olmalıyım?', a: 'Çoğu sorun için haftada 1 seans yeterli olsa da bazı durumlarda başlangıçta haftada 2 seans tercih edilebilir. Süreç ilerledikçe aralıklar açılır.', cat: 'duration' },
    { q: 'Seanslarda verilen ödevler ne işe yarar?', a: 'Ödevler seansta konuşulanın hayata geçirilmesini sağlar. Düzenli yapılan ödevler terapinin etkisini hızlandırır.', cat: 'general' },
    { q: 'Online seanslar yüz yüze kadar etkili mi?', a: 'Araştırmalar online seansların yüz yüze seanslarla benzer etkinlikte olduğunu göstermektedir. Önemli olan sessiz/mahrem bir alan ve güvenilir internet bağlantısıdır.', cat: 'online' },
    { q: 'Görüşmeler gizli midir?', a: 'Tüm görüşmeler etik kurallar ve gizlilik ilkesi çerçevesinde tutulur. Sizin açık izniniz olmadan hiçbir bilgi üçüncü kişilerle paylaşılmaz.', cat: 'privacy' },
  ]
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    await writeClient.createOrReplace({
      _id: `faqItem.${i + 1}`,
      _type: 'faqItem',
      question: locale(f.q),
      answer: localeBlock(f.a),
      category: f.cat,
      order: i + 1,
      showOnHome: true,
    })
  }
  console.log(`✓ ${faqs.length} faqItems`)
}
```

- [ ] **Step 6: 1 blogPost seed**

```typescript
async function seedBlogPost() {
  await writeClient.createOrReplace({
    _id: 'blogPost.acilis',
    _type: 'blogPost',
    title: locale('Hoş geldiniz: Bu blogda neler bulacaksınız?', 'Welcome: What to expect from this blog'),
    slug: { _type: 'slug', current: 'hos-geldiniz' },
    excerpt: localeText('Bu blog psikolojik sağlığa dair bilime dayalı, sade ve uygulanabilir içerikler için bir alan.'),
    content: localeBlock(
      'Bu blogda bilişsel davranışçı terapi, EMDR ve günlük yaşamda kullanabileceğiniz psikolojik araçlara dair yazılar paylaşıyor olacağım. İlk yazılarda anksiyete, kaygıyla başa çıkma, ilişkilerde iletişim ve yas süreci gibi konuları ele alacağım.',
    ),
    author: 'Gamze Sevin',
    publishedAt: new Date().toISOString(),
    seo: {
      title: locale('Hoş geldiniz — Gamze Sevin Blog'),
      description: localeText('Psikolojik sağlığa dair bilime dayalı yazıların yer aldığı bu blogun açılış yazısı.'),
    },
  })
  console.log('✓ blogPost.acilis')
}
```

- [ ] **Step 7: main() güncelle**

```typescript
async function main() {
  await seedSiteSettings()
  await seedHomePage()
  await seedApproaches()
  await seedConditions()
  await seedAbout()
  await seedOnlineTherapy()
  await seedContactPage()
  await seedFaqs()
  await seedBlogPost()
  console.log('\n✓ Seed complete')
}
```

Çalıştır:

```bash
npm run seed
```

- [ ] **Step 8: Studio doğrulama**

`/studio` → 17 çalışma alanı, 8 SSS, hakkımda, online terapi, iletişim sayfaları dolu.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(seed): conditions (17), about, online-therapy, contact, faqs (8), blog (1)"
```

---

### Task 14: Portre asset upload

**Files:**
- Create: `scripts/upload-assets.ts`

- [ ] **Step 1: Upload script**

`scripts/upload-assets.ts`:

```typescript
import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { writeClient } from './lib/sanity-write'

async function main() {
  const portraitPath = resolve(process.cwd(), 'assets/foto2-reuh2cpuszmj61qpwsyie59gh7pt6b51chxduuokr8.webp')
  const buffer = readFileSync(portraitPath)
  const asset = await writeClient.assets.upload('image', buffer, { filename: 'gamze-portrait.webp' })
  console.log('✓ uploaded:', asset._id)

  await writeClient
    .patch('homePage')
    .set({ heroPortrait: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    .commit()
  console.log('✓ linked to homePage.heroPortrait')

  await writeClient
    .patch('aboutPage')
    .set({ photo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    .commit()
  console.log('✓ linked to aboutPage.photo')
}

main().catch((e) => { console.error(e); process.exit(1) })
```

`package.json` scripts:

```json
"upload-assets": "tsx scripts/upload-assets.ts"
```

- [ ] **Step 2: Run**

```bash
npm run upload-assets
```

- [ ] **Step 3: Studio doğrulama**

`/studio/homePage` → "Hero Portre" alanı dolu.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seed): upload Gamze portrait + link to home/about"
```

---

## Faz 4 — Anasayfa

### Task 15: GROQ queries — anasayfa için tüm içeriği tek seferde çek

**Files:**
- Create: `lib/sanity/queries.ts`, `lib/sanity/types.ts`, `lib/sanity/fetch.ts`

- [ ] **Step 1: Types**

`lib/sanity/types.ts`:

```typescript
export type LocaleString = { tr: string; en?: string }
export type LocaleText = { tr: string; en?: string }
export type PortableBlock = { _key: string; _type: 'block'; style?: string; children: { text: string; marks?: string[] }[]; markDefs?: any[] }
export type LocalePortable = { tr: PortableBlock[]; en?: PortableBlock[] }

export type SanityImage = { _type: 'image'; asset: { _ref: string } }

export type SeoMeta = {
  title?: LocaleString
  description?: LocaleText
  ogImage?: SanityImage
  noIndex?: boolean
}

export type HomePage = {
  heroPill?: LocaleString
  heroTitle: LocaleString
  heroSubtitle?: LocaleText
  heroPortrait?: SanityImage
  aboutTeaser?: LocaleText
  aboutBadges?: string[]
  onlineQuote?: LocaleText
  ctaTitle?: LocaleString
  seo?: SeoMeta
}

export type TherapyApproach = {
  _id: string
  title: LocaleString
  shortName: string
  slug: { current: string }
  summary?: LocaleText
}

export type ConditionArea = {
  _id: string
  title: LocaleString
  slug: { current: string }
  category: 'mental' | 'other'
  summary?: LocaleText
}

export type FaqItem = {
  _id: string
  question: LocaleString
  answer: LocalePortable
  order: number
}

export type BlogPostTeaser = {
  _id: string
  title: LocaleString
  slug: { current: string }
  excerpt?: LocaleText
  cover?: SanityImage
  publishedAt: string
}

export type SiteSettings = {
  phone?: string
  whatsapp?: string
  email?: string
  linkedin?: string
  instagram?: string
  address?: LocaleText
  geo?: { lat: number; lng: number }
  workingHours?: { _key: string; day: string; hours: string }[]
  ga4Id?: string
  cookiePolicyText?: LocalePortable
  kvkkText?: LocalePortable
  privacyPolicyText?: LocalePortable
}

export type HomePageData = {
  home: HomePage
  settings: SiteSettings
  approaches: TherapyApproach[]
  conditions: ConditionArea[]
  faqs: FaqItem[]
  blogTeasers: BlogPostTeaser[]
}
```

- [ ] **Step 2: GROQ queries**

`lib/sanity/queries.ts`:

```typescript
import { groq } from 'next-sanity'

export const homePageQuery = groq`{
  "home": *[_type == "homePage"][0]{
    heroPill, heroTitle, heroSubtitle, heroPortrait, aboutTeaser, aboutBadges, onlineQuote, ctaTitle, seo
  },
  "settings": *[_type == "siteSettings"][0]{
    phone, whatsapp, email, linkedin, instagram, address, geo, workingHours, ga4Id
  },
  "approaches": *[_type == "therapyApproach"] | order(shortName asc){
    _id, title, shortName, slug, summary
  },
  "conditions": *[_type == "conditionArea"] | order(category asc, title.tr asc){
    _id, title, slug, category, summary
  },
  "faqs": *[_type == "faqItem" && showOnHome == true] | order(order asc){
    _id, question, answer, order
  },
  "blogTeasers": *[_type == "blogPost"] | order(publishedAt desc)[0...3]{
    _id, title, slug, excerpt, cover, publishedAt
  }
}`
```

- [ ] **Step 3: Fetch helper (ISR)**

`lib/sanity/fetch.ts`:

```typescript
import { sanityClient } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: 60, tags },
  })
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(sanity): GROQ queries + fetch helper for home page"
```

---

### Task 16: Anasayfa Hero + QuickLinks bölümleri

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/QuickLinks.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Hero**

`components/sections/Hero.tsx`:

```typescript
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { urlForImage } from '@/lib/sanity/image'
import type { HomePage, SiteSettings } from '@/lib/sanity/types'

export function Hero({ home, settings, locale }: { home: HomePage; settings: SiteSettings; locale: 'tr' | 'en' }) {
  const title = home.heroTitle[locale] ?? home.heroTitle.tr
  const subtitle = home.heroSubtitle?.[locale] ?? home.heroSubtitle?.tr ?? ''
  const pill = home.heroPill?.[locale] ?? home.heroPill?.tr ?? 'Klinik Psikolog'
  const portrait = home.heroPortrait ? urlForImage(home.heroPortrait).width(900).url() : null

  return (
    <section className="bg-cream">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="order-2 lg:order-1">
          <Pill>{pill}</Pill>
          <h1 className="mt-4 text-display-mobile lg:text-display text-ink">{title}</h1>
          <p className="mt-5 max-w-prose text-body text-ink/75">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {settings.whatsapp && (
              <Button href={`https://wa.me/${settings.whatsapp}`} size="lg">
                {locale === 'tr' ? 'WhatsApp ile Randevu' : 'Book via WhatsApp'}
              </Button>
            )}
            <Button href={`/${locale}/hakkimda`} variant="secondary" size="lg">
              {locale === 'tr' ? 'Hakkımda' : 'About'}
            </Button>
          </div>
        </div>
        {portrait && (
          <div className="order-1 lg:order-2">
            <Image
              src={portrait}
              alt="Gamze Sevin — Klinik Psikolog"
              width={900}
              height={1100}
              priority
              className="rounded-hero shadow-card"
            />
          </div>
        )}
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: QuickLinks**

`components/sections/QuickLinks.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export function QuickLinks({ locale }: { locale: 'tr' | 'en' }) {
  const items = [
    {
      tr: { title: 'Terapi Yaklaşımları', subtitle: 'BDT, EMDR, Sorun Çözme' },
      en: { title: 'Therapy Approaches', subtitle: 'CBT, EMDR, Problem Solving' },
      href: `/${locale}/terapi-yaklasimlari`,
    },
    {
      tr: { title: 'Çalışma Alanları', subtitle: 'Depresyon, kaygı, ilişkiler ve daha fazlası' },
      en: { title: 'Areas of Practice', subtitle: 'Depression, anxiety, relationships and more' },
      href: `/${locale}/calisma-alanlari`,
    },
    {
      tr: { title: 'Online Terapi', subtitle: 'Türkiye geneli ve yurt dışı' },
      en: { title: 'Online Therapy', subtitle: 'Türkiye-wide and international' },
      href: `/${locale}/online-terapi`,
    },
  ]
  return (
    <section className="bg-white py-14">
      <Container className="grid gap-4 md:grid-cols-3">
        {items.map((it) => {
          const c = it[locale]
          return (
            <Link
              key={it.href}
              href={it.href}
              className="group rounded-card border border-ink/10 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-hover"
            >
              <div className="text-h3 text-ink">{c.title}</div>
              <p className="mt-2 text-body-sm text-ink/70">{c.subtitle}</p>
              <span className="mt-4 inline-block text-label uppercase text-sea group-hover:text-ink">
                {locale === 'tr' ? 'İncele →' : 'Explore →'}
              </span>
            </Link>
          )
        })}
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Anasayfa orchestrator**

`app/[locale]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/fetch'
import { homePageQuery } from '@/lib/sanity/queries'
import type { HomePageData } from '@/lib/sanity/types'
import { Hero } from '@/components/sections/Hero'
import { QuickLinks } from '@/components/sections/QuickLinks'
import { locales, type Locale } from '@/i18n'

export const revalidate = 60

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  if (!locales.includes(locale as Locale)) notFound()
  const data = await sanityFetch<HomePageData>({ query: homePageQuery, tags: ['home'] })
  if (!data.home) {
    return <main className="p-12 text-error">Anasayfa içeriği henüz Sanity'de hazır değil.</main>
  }
  return (
    <>
      <Hero home={data.home} settings={data.settings} locale={locale as 'tr' | 'en'} />
      <QuickLinks locale={locale as 'tr' | 'en'} />
    </>
  )
}
```

- [ ] **Step 4: Test**

```bash
npm run dev
```

`/tr` → Krem hero (portre + başlık + 2 CTA) + 3 hızlı link kartı görünür.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(home): Hero + QuickLinks sections"
```

---

### Task 17: AboutTeaser + Approaches + Conditions bölümleri

**Files:**
- Create: `components/sections/AboutTeaser.tsx`, `components/sections/Approaches.tsx`, `components/sections/Conditions.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: AboutTeaser**

`components/sections/AboutTeaser.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { HomePage } from '@/lib/sanity/types'

export function AboutTeaser({ home, locale }: { home: HomePage; locale: 'tr' | 'en' }) {
  const text = home.aboutTeaser?.[locale] ?? home.aboutTeaser?.tr
  return (
    <section className="bg-sand py-16 lg:py-24">
      <Container>
        <div className="text-label uppercase text-ink/60">{locale === 'tr' ? 'Hakkımda' : 'About'}</div>
        <p className="mt-3 max-w-3xl text-h2 text-ink">{text}</p>
        {home.aboutBadges && home.aboutBadges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {home.aboutBadges.map((b) => (
              <span key={b} className="rounded-full bg-white px-4 py-1.5 text-body-sm font-medium text-ink shadow-card">
                {b}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/${locale}/hakkimda`}
          className="mt-8 inline-block text-label uppercase text-ink underline-offset-4 hover:underline"
        >
          {locale === 'tr' ? 'Devamını Oku →' : 'Read More →'}
        </Link>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Approaches**

`components/sections/Approaches.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { TherapyApproach } from '@/lib/sanity/types'

export function Approaches({ approaches, locale }: { approaches: TherapyApproach[]; locale: 'tr' | 'en' }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{locale === 'tr' ? 'Terapi Yaklaşımları' : 'Therapy Approaches'}</h2>
        <p className="mt-2 max-w-2xl text-body text-ink/70">
          {locale === 'tr'
            ? 'Bilimsel temelli üç yaklaşımla çalışıyorum.'
            : 'I work with three evidence-based approaches.'}
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {approaches.map((a) => (
            <Link
              key={a._id}
              href={`/${locale}/terapi-yaklasimlari/${a.slug.current}`}
              className="group rounded-card border border-ink/10 bg-cream p-6 transition hover:-translate-y-0.5 hover:shadow-hover"
            >
              <div className="text-label uppercase text-sea">{a.shortName}</div>
              <div className="mt-2 text-h3 text-ink">{a.title[locale] ?? a.title.tr}</div>
              <p className="mt-3 text-body-sm text-ink/70 line-clamp-3">{a.summary?.[locale] ?? a.summary?.tr}</p>
              <span className="mt-4 inline-block text-label uppercase text-ink/60 group-hover:text-ink">
                {locale === 'tr' ? 'Detay →' : 'Learn more →'}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Conditions**

`components/sections/Conditions.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { ConditionArea } from '@/lib/sanity/types'

export function Conditions({ conditions, locale }: { conditions: ConditionArea[]; locale: 'tr' | 'en' }) {
  const mental = conditions.filter((c) => c.category === 'mental')
  const other = conditions.filter((c) => c.category === 'other')
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{locale === 'tr' ? 'Çalışma Alanları' : 'Areas of Practice'}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <ColList title={locale === 'tr' ? 'Ruhsal Bozukluklar' : 'Mental Health Conditions'} items={mental} locale={locale} />
          <ColList title={locale === 'tr' ? 'Diğer Sorunlar' : 'Other Concerns'} items={other} locale={locale} />
        </div>
        <Link
          href={`/${locale}/calisma-alanlari`}
          className="mt-8 inline-block text-label uppercase text-ink underline-offset-4 hover:underline"
        >
          {locale === 'tr' ? 'Tüm Alanlar →' : 'View All Areas →'}
        </Link>
      </Container>
    </section>
  )
}

function ColList({ title, items, locale }: { title: string; items: ConditionArea[]; locale: 'tr' | 'en' }) {
  return (
    <div>
      <div className="text-label uppercase text-ink/60">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((c) => (
          <li key={c._id}>
            <Link
              href={`/${locale}/calisma-alanlari/${c.slug.current}`}
              className="text-body text-ink hover:underline"
            >
              {c.title[locale] ?? c.title.tr}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: page.tsx'e ekle**

`app/[locale]/page.tsx`:

```typescript
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { Approaches } from '@/components/sections/Approaches'
import { Conditions } from '@/components/sections/Conditions'

// ... HomePage:
return (
  <>
    <Hero home={data.home} settings={data.settings} locale={locale as 'tr' | 'en'} />
    <QuickLinks locale={locale as 'tr' | 'en'} />
    <AboutTeaser home={data.home} locale={locale as 'tr' | 'en'} />
    <Approaches approaches={data.approaches} locale={locale as 'tr' | 'en'} />
    <Conditions conditions={data.conditions} locale={locale as 'tr' | 'en'} />
  </>
)
```

- [ ] **Step 5: Test + commit**

```bash
npm run dev
git add -A
git commit -m "feat(home): AboutTeaser + Approaches + Conditions"
```

---

### Task 18: OnlineStrip + BlogTeaser bölümleri

**Files:**
- Create: `components/sections/OnlineStrip.tsx`, `components/sections/BlogTeaser.tsx`

- [ ] **Step 1: OnlineStrip**

`components/sections/OnlineStrip.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { HomePage } from '@/lib/sanity/types'

export function OnlineStrip({ home, locale }: { home: HomePage; locale: 'tr' | 'en' }) {
  const quote = home.onlineQuote?.[locale] ?? home.onlineQuote?.tr
  const steps = [
    { tr: 'İletişim', en: 'Contact' },
    { tr: 'Ön Görüşme', en: 'Initial Assessment' },
    { tr: 'Seanslar', en: 'Sessions' },
    { tr: 'Takip', en: 'Follow-up' },
  ]
  return (
    <section className="bg-ink py-16 lg:py-24 text-cream">
      <Container>
        <p className="max-w-3xl text-h2 text-cream">{quote}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-card border border-cream/15 p-5">
              <div className="text-display-mobile font-bold text-sand">{i + 1}</div>
              <div className="mt-2 text-h3 text-cream">{s[locale]}</div>
            </div>
          ))}
        </div>
        <Link
          href={`/${locale}/online-terapi`}
          className="mt-8 inline-block text-label uppercase text-sand underline-offset-4 hover:underline"
        >
          {locale === 'tr' ? 'Online Terapi Detayları →' : 'Online Therapy Details →'}
        </Link>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: BlogTeaser**

`components/sections/BlogTeaser.tsx`:

```typescript
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import type { BlogPostTeaser } from '@/lib/sanity/types'

export function BlogTeaser({ posts, locale }: { posts: BlogPostTeaser[]; locale: 'tr' | 'en' }) {
  if (posts.length === 0) return null
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex items-end justify-between">
          <h2 className="text-h2 text-ink">{locale === 'tr' ? 'Blog' : 'Blog'}</h2>
          <Link href={`/${locale}/blog`} className="text-label uppercase text-ink/70 hover:text-ink">
            {locale === 'tr' ? 'Tüm Yazılar →' : 'All Posts →'}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p._id}
              href={`/${locale}/blog/${p.slug.current}`}
              className="group block overflow-hidden rounded-card border border-ink/10 bg-white shadow-card transition hover:shadow-hover"
            >
              {p.cover && (
                <Image
                  src={urlForImage(p.cover).width(600).height(400).fit('crop').url()}
                  alt={p.title[locale] ?? p.title.tr}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                />
              )}
              <div className="p-5">
                <div className="text-label uppercase text-sea">
                  {new Date(p.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}
                </div>
                <div className="mt-2 text-h3 text-ink group-hover:underline underline-offset-4">
                  {p.title[locale] ?? p.title.tr}
                </div>
                {p.excerpt && (
                  <p className="mt-2 text-body-sm text-ink/70 line-clamp-3">
                    {p.excerpt[locale] ?? p.excerpt.tr}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: page.tsx'e ekle**

```typescript
import { OnlineStrip } from '@/components/sections/OnlineStrip'
import { BlogTeaser } from '@/components/sections/BlogTeaser'

// page'e:
<OnlineStrip home={data.home} locale={locale as 'tr' | 'en'} />
<BlogTeaser posts={data.blogTeasers} locale={locale as 'tr' | 'en'} />
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): OnlineStrip + BlogTeaser"
```

---

### Task 19: SSS Accordion (Radix) + FAQPage JSON-LD

**Files:**
- Create: `components/sections/FAQ.tsx`, `components/content/PortableText.tsx`, `components/content/JsonLd.tsx`

- [ ] **Step 1: Radix install**

```bash
npm install @radix-ui/react-accordion @portabletext/react
```

- [ ] **Step 2: PortableText renderer**

`components/content/PortableText.tsx`:

```typescript
import { PortableText as PT, type PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 text-body text-ink/85 first:mt-0">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 text-h2 text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-h3 text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-sea/40 pl-4 italic text-ink/80">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} className="text-sea underline underline-offset-4 hover:text-ink" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export function PortableText({ blocks }: { blocks: any }) {
  if (!blocks) return null
  return <PT value={blocks} components={components} />
}
```

- [ ] **Step 3: JsonLd helper**

`components/content/JsonLd.tsx`:

```typescript
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 4: FAQ accordion**

`components/sections/FAQ.tsx`:

```typescript
'use client'
import * as Accordion from '@radix-ui/react-accordion'
import { Container } from '@/components/ui/Container'
import { PortableText } from '@/components/content/PortableText'
import { JsonLd } from '@/components/content/JsonLd'
import type { FaqItem, PortableBlock } from '@/lib/sanity/types'

function blocksToPlain(blocks: PortableBlock[] | undefined): string {
  if (!blocks) return ''
  return blocks
    .map((b) => b.children?.map((c) => c.text).join('') ?? '')
    .join(' ')
    .trim()
}

export function FAQ({ items, locale }: { items: FaqItem[]; locale: 'tr' | 'en' }) {
  if (items.length === 0) return null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question[locale] ?? it.question.tr,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blocksToPlain(it.answer[locale] ?? it.answer.tr),
      },
    })),
  }
  return (
    <section className="bg-sand py-16 lg:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}</h2>
        <Accordion.Root type="single" collapsible className="mt-8 space-y-3">
          {items.map((it) => (
            <Accordion.Item key={it._id} value={it._id} className="rounded-card bg-white shadow-card">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between p-5 text-left">
                  <span className="text-h3 text-ink">{it.question[locale] ?? it.question.tr}</span>
                  <span className="text-h3 text-sea transition group-data-[state=open]:rotate-45">+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-5 text-body text-ink/85 data-[state=closed]:hidden">
                <PortableText blocks={it.answer[locale] ?? it.answer.tr} />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
      <JsonLd data={jsonLd} />
    </section>
  )
}
```

- [ ] **Step 5: page.tsx'e ekle**

```typescript
import { FAQ } from '@/components/sections/FAQ'
// ...
<FAQ items={data.faqs} locale={locale as 'tr' | 'en'} />
```

- [ ] **Step 6: Test**

`npm run dev` → SSS sand zeminde, accordion açılır/kapanır. View Source → JSON-LD FAQPage çıktısı var.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(home): FAQ accordion + FAQPage JSON-LD + PortableText renderer"
```

---

### Task 20: ContactCTA + MedicalBusiness JSON-LD + metadata

**Files:**
- Create: `components/sections/ContactCTA.tsx`
- Modify: `app/[locale]/page.tsx` (metadata generator)

- [ ] **Step 1: ContactCTA**

`components/sections/ContactCTA.tsx`:

```typescript
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { HomePage, SiteSettings } from '@/lib/sanity/types'

export function ContactCTA({ home, settings, locale }: { home: HomePage; settings: SiteSettings; locale: 'tr' | 'en' }) {
  const title = home.ctaTitle?.[locale] ?? home.ctaTitle?.tr ?? 'İlk adımı atmaya hazırsanız buradayım.'
  return (
    <section className="bg-ink py-16 lg:py-24 text-cream">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-h1 text-cream">{title}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {settings.whatsapp && (
            <Button href={`https://wa.me/${settings.whatsapp}`} size="lg" variant="secondary">
              WhatsApp
            </Button>
          )}
          <Button href={`/${locale}/iletisim`} size="lg" variant="ghost" className="border-cream/30 text-cream hover:bg-cream/10">
            {locale === 'tr' ? 'İletişim Formu' : 'Contact Form'}
          </Button>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: page.tsx — metadata + JSON-LD + tam liste**

```typescript
import type { Metadata } from 'next'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { JsonLd } from '@/components/content/JsonLd'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const data = await sanityFetch<HomePageData>({ query: homePageQuery, tags: ['home'] })
  const title = data.home?.seo?.title?.[locale as 'tr' | 'en'] ?? data.home?.seo?.title?.tr ?? 'Gamze Sevin — Klinik Psikolog'
  const description = data.home?.seo?.description?.[locale as 'tr' | 'en'] ?? data.home?.seo?.description?.tr
  return {
    title,
    description,
    alternates: { canonical: `/${locale}`, languages: { tr: '/tr', en: '/en' } },
    openGraph: { title, description, type: 'website', locale: locale === 'tr' ? 'tr_TR' : 'en_US' },
  }
}

// HomePage component sonunda return içine ekle:
const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Klinik Psikolog Gamze Sevin',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  telephone: data.settings.phone,
  email: data.settings.email,
  address: data.settings.address
    ? {
        '@type': 'PostalAddress',
        streetAddress: (data.settings.address[locale as 'tr' | 'en'] ?? data.settings.address.tr)?.split('\n')[0],
        addressLocality: 'İzmir',
        addressCountry: 'TR',
      }
    : undefined,
  geo: data.settings.geo
    ? { '@type': 'GeoCoordinates', latitude: data.settings.geo.lat, longitude: data.settings.geo.lng }
    : undefined,
  sameAs: [data.settings.linkedin, data.settings.instagram].filter(Boolean),
  medicalSpecialty: 'Psychiatry',
}

return (
  <>
    <JsonLd data={businessJsonLd} />
    <Hero home={data.home} settings={data.settings} locale={locale as 'tr' | 'en'} />
    <QuickLinks locale={locale as 'tr' | 'en'} />
    <AboutTeaser home={data.home} locale={locale as 'tr' | 'en'} />
    <Approaches approaches={data.approaches} locale={locale as 'tr' | 'en'} />
    <Conditions conditions={data.conditions} locale={locale as 'tr' | 'en'} />
    <OnlineStrip home={data.home} locale={locale as 'tr' | 'en'} />
    <BlogTeaser posts={data.blogTeasers} locale={locale as 'tr' | 'en'} />
    <FAQ items={data.faqs} locale={locale as 'tr' | 'en'} />
    <ContactCTA home={data.home} settings={data.settings} locale={locale as 'tr' | 'en'} />
  </>
)
```

- [ ] **Step 3: Test — tam anasayfa**

`npm run dev` → `/tr` anasayfası tüm 9 bölümle render olur. View source → MedicalBusiness + FAQPage JSON-LD.

- [ ] **Step 4: Lighthouse pilot**

Chrome DevTools → Lighthouse → Performance + SEO sekmesi → Performance ≥ 80, SEO ≥ 95 olmalı.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(home): ContactCTA + MedicalBusiness JSON-LD + metadata"
```

---

## Faz 5 — İç Sayfalar

### Task 21: Hakkımda sayfası

**Files:**
- Create: `app/[locale]/hakkimda/page.tsx`, `lib/sanity/queries/about.ts`

- [ ] **Step 1: GROQ**

`lib/sanity/queries/about.ts`:

```typescript
import { groq } from 'next-sanity'
export const aboutQuery = groq`*[_type == "aboutPage"][0]{
  intro, photo, approach, clinicalExperience, publications, education, certificates, seo
}`
```

- [ ] **Step 2: Sayfa**

`app/[locale]/hakkimda/page.tsx`:

```typescript
import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/fetch'
import { aboutQuery } from '@/lib/sanity/queries/about'
import { urlForImage } from '@/lib/sanity/image'
import { PortableText } from '@/components/content/PortableText'
import { Container } from '@/components/ui/Container'

export const revalidate = 60

type AboutData = {
  intro?: { tr: any[]; en?: any[] }
  photo?: any
  approach?: { tr: any[]; en?: any[] }
  clinicalExperience?: { _key: string; place: { tr: string; en?: string } }[]
  publications?: { _key: string; title: { tr: string }; venue: { tr: string }; doi?: string }[]
  education?: { _key: string; school: string; degree: { tr: string } }[]
  certificates?: { _key: string; name: { tr: string }; trainer: string; accreditation: string }[]
  seo?: any
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = await sanityFetch<AboutData>({ query: aboutQuery, tags: ['about'] })
  const title = d.seo?.title?.[locale] ?? 'Hakkımda — Klinik Psikolog Gamze Sevin'
  const description = d.seo?.description?.[locale] ?? d.seo?.description?.tr
  return { title, description, alternates: { canonical: `/${locale}/hakkimda`, languages: { tr: '/tr/hakkimda', en: '/en/about' } } }
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const d = await sanityFetch<AboutData>({ query: aboutQuery, tags: ['about'] })
  const l = locale as 'tr' | 'en'

  return (
    <>
      <section className="bg-cream py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          {d.photo && (
            <Image
              src={urlForImage(d.photo).width(600).url()}
              alt="Gamze Sevin"
              width={600}
              height={750}
              className="rounded-hero shadow-card"
            />
          )}
          <div>
            <h1 className="text-h1 text-ink">{l === 'tr' ? 'Hakkımda' : 'About Me'}</h1>
            <div className="prose-content mt-4 max-w-prose">
              <PortableText blocks={d.intro?.[l] ?? d.intro?.tr} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-h2 text-ink">{l === 'tr' ? 'Mesleki Yaklaşım' : 'Professional Approach'}</h2>
            <div className="mt-4 max-w-prose"><PortableText blocks={d.approach?.[l] ?? d.approach?.tr} /></div>
          </div>
          <div>
            <h2 className="text-h2 text-ink">{l === 'tr' ? 'Klinik Deneyim' : 'Clinical Experience'}</h2>
            <ul className="mt-4 space-y-2 text-body text-ink/85">
              {d.clinicalExperience?.map((e) => (
                <li key={e._key}>{e.place[l] ?? e.place.tr}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-h2 text-ink">{l === 'tr' ? 'Eğitim' : 'Education'}</h2>
            <ul className="mt-4 space-y-3">
              {d.education?.map((e) => (
                <li key={e._key} className="text-body text-ink/85">
                  <strong>{e.school}</strong> — {e.degree[l] ?? e.degree.tr}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2 text-ink">{l === 'tr' ? 'Yayınlar' : 'Publications'}</h2>
            <ul className="mt-4 space-y-3">
              {d.publications?.map((p) => (
                <li key={p._key} className="text-body-sm text-ink/85">
                  <div>{p.title[l] ?? p.title.tr}</div>
                  <div className="text-ink/60">{p.venue[l] ?? p.venue.tr}</div>
                  {p.doi && (
                    <a className="text-sea underline" href={p.doi.startsWith('http') ? p.doi : `https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">
                      {p.doi}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="text-h2 text-ink">{l === 'tr' ? 'Sertifikalar' : 'Certifications'}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-ink/15 text-left">
                  <th className="py-3 pr-4">{l === 'tr' ? 'Sertifika' : 'Certificate'}</th>
                  <th className="py-3 pr-4">{l === 'tr' ? 'Eğitmen/Kurum' : 'Trainer/Institution'}</th>
                  <th className="py-3">{l === 'tr' ? 'Akreditasyon' : 'Accreditation'}</th>
                </tr>
              </thead>
              <tbody>
                {d.certificates?.map((c) => (
                  <tr key={c._key} className="border-b border-ink/10">
                    <td className="py-3 pr-4">{c.name[l] ?? c.name.tr}</td>
                    <td className="py-3 pr-4">{c.trainer}</td>
                    <td className="py-3">{c.accreditation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(about): Hakkımda sayfası"
```

---

### Task 22: Terapi Yaklaşımları — liste + dinamik detay

**Files:**
- Create: `app/[locale]/terapi-yaklasimlari/page.tsx`, `app/[locale]/terapi-yaklasimlari/[slug]/page.tsx`, `lib/sanity/queries/approach.ts`

- [ ] **Step 1: GROQ**

`lib/sanity/queries/approach.ts`:

```typescript
import { groq } from 'next-sanity'
export const approachListQuery = groq`*[_type == "therapyApproach"] | order(shortName asc){
  _id, title, shortName, slug, summary
}`
export const approachBySlugQuery = groq`*[_type == "therapyApproach" && slug.current == $slug][0]{
  title, shortName, content, forWhom, duration, sources, seo
}`
export const approachSlugsQuery = groq`*[_type == "therapyApproach" && defined(slug.current)][].slug.current`
```

- [ ] **Step 2: Liste sayfası**

`app/[locale]/terapi-yaklasimlari/page.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { sanityFetch } from '@/lib/sanity/fetch'
import { approachListQuery } from '@/lib/sanity/queries/approach'
import type { TherapyApproach } from '@/lib/sanity/types'

export const revalidate = 60

export default async function ApproachListPage({ params: { locale } }: { params: { locale: string } }) {
  const items = await sanityFetch<TherapyApproach[]>({ query: approachListQuery, tags: ['approach'] })
  const l = locale as 'tr' | 'en'
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <h1 className="text-h1 text-ink">{l === 'tr' ? 'Terapi Yaklaşımları' : 'Therapy Approaches'}</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((a) => (
            <Link key={a._id} href={`/${l}/terapi-yaklasimlari/${a.slug.current}`} className="rounded-card bg-white p-6 shadow-card hover:shadow-hover transition">
              <div className="text-label uppercase text-sea">{a.shortName}</div>
              <div className="mt-2 text-h3 text-ink">{a.title[l] ?? a.title.tr}</div>
              <p className="mt-3 text-body-sm text-ink/70">{a.summary?.[l] ?? a.summary?.tr}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Dinamik detay sayfası**

`app/[locale]/terapi-yaklasimlari/[slug]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { PortableText } from '@/components/content/PortableText'
import { JsonLd } from '@/components/content/JsonLd'
import { sanityFetch } from '@/lib/sanity/fetch'
import { approachBySlugQuery, approachSlugsQuery } from '@/lib/sanity/queries/approach'

export const revalidate = 60
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: approachSlugsQuery })
  return slugs.flatMap((slug) => [{ locale: 'tr', slug }, { locale: 'en', slug }])
}

type ApproachDetail = {
  title: { tr: string; en?: string }
  shortName: string
  content?: { tr: any[]; en?: any[] }
  forWhom?: { tr: any[]; en?: any[] }
  duration?: { tr: string; en?: string }
  sources?: { _key: string; label: string; url: string }[]
  seo?: any
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const d = await sanityFetch<ApproachDetail>({ query: approachBySlugQuery, params: { slug }, tags: ['approach'] })
  if (!d) return {}
  const l = locale as 'tr' | 'en'
  return {
    title: d.seo?.title?.[l] ?? d.title[l],
    description: d.seo?.description?.[l],
    alternates: { canonical: `/${locale}/terapi-yaklasimlari/${slug}` },
    robots: d.seo?.noIndex ? { index: false } : undefined,
  }
}

export default async function ApproachDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const d = await sanityFetch<ApproachDetail>({ query: approachBySlugQuery, params: { slug }, tags: ['approach'] })
  if (!d) notFound()
  const l = locale as 'tr' | 'en'
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: l === 'tr' ? 'Anasayfa' : 'Home', item: `/${l}` },
      { '@type': 'ListItem', position: 2, name: l === 'tr' ? 'Terapi Yaklaşımları' : 'Therapy Approaches', item: `/${l}/terapi-yaklasimlari` },
      { '@type': 'ListItem', position: 3, name: d.title[l] ?? d.title.tr },
    ],
  }
  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="bg-cream py-16 lg:py-24">
        <Container className="max-w-prose">
          <div className="text-label uppercase text-sea">{d.shortName}</div>
          <h1 className="mt-2 text-h1 text-ink">{d.title[l] ?? d.title.tr}</h1>
          <div className="prose-content mt-6"><PortableText blocks={d.content?.[l] ?? d.content?.tr} /></div>
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container className="max-w-prose">
          <h2 className="text-h2 text-ink">{l === 'tr' ? 'Kimlere uygundur?' : 'Who is it for?'}</h2>
          <div className="prose-content mt-4"><PortableText blocks={d.forWhom?.[l] ?? d.forWhom?.tr} /></div>
          {d.duration && (
            <div className="mt-8 rounded-card bg-cream p-5">
              <div className="text-label uppercase text-sea">{l === 'tr' ? 'Ortalama Süre' : 'Average Duration'}</div>
              <div className="mt-1 text-h3 text-ink">{d.duration[l] ?? d.duration.tr}</div>
            </div>
          )}
          {d.sources && d.sources.length > 0 && (
            <div className="mt-8">
              <h3 className="text-h3 text-ink">{l === 'tr' ? 'Kaynaklar' : 'Sources'}</h3>
              <ul className="mt-3 space-y-1 text-body-sm">
                {d.sources.map((s) => (
                  <li key={s._key}><a className="text-sea underline" href={s.url}>{s.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(approach): list + dynamic detail with breadcrumb JSON-LD"
```

---

### Task 23: Çalışma Alanları — liste + dinamik detay

**Files:**
- Create: `app/[locale]/calisma-alanlari/page.tsx`, `app/[locale]/calisma-alanlari/[slug]/page.tsx`, `lib/sanity/queries/condition.ts`

- [ ] **Step 1: GROQ**

`lib/sanity/queries/condition.ts`:

```typescript
import { groq } from 'next-sanity'
export const conditionListQuery = groq`*[_type == "conditionArea"] | order(category asc, title.tr asc){
  _id, title, slug, category, summary
}`
export const conditionBySlugQuery = groq`*[_type == "conditionArea" && slug.current == $slug][0]{
  title, category, summary, symptoms, content, seo,
  recommendedApproach->{ title, shortName, slug }
}`
export const conditionSlugsQuery = groq`*[_type == "conditionArea" && defined(slug.current)][].slug.current`
```

- [ ] **Step 2: Liste**

`app/[locale]/calisma-alanlari/page.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { sanityFetch } from '@/lib/sanity/fetch'
import { conditionListQuery } from '@/lib/sanity/queries/condition'
import type { ConditionArea } from '@/lib/sanity/types'

export const revalidate = 60

export default async function ConditionListPage({ params: { locale } }: { params: { locale: string } }) {
  const all = await sanityFetch<ConditionArea[]>({ query: conditionListQuery, tags: ['condition'] })
  const l = locale as 'tr' | 'en'
  const mental = all.filter((c) => c.category === 'mental')
  const other = all.filter((c) => c.category === 'other')

  const Section = ({ title, items }: { title: string; items: ConditionArea[] }) => (
    <div>
      <h2 className="text-h2 text-ink">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <Link
            key={c._id}
            href={`/${l}/calisma-alanlari/${c.slug.current}`}
            className="rounded-card bg-white p-4 shadow-card hover:shadow-hover transition"
          >
            <div className="text-h3 text-ink">{c.title[l] ?? c.title.tr}</div>
            <p className="mt-1 text-body-sm text-ink/70">{c.summary?.[l] ?? c.summary?.tr}</p>
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <Section title={l === 'tr' ? 'Ruhsal Bozukluklar' : 'Mental Health Conditions'} items={mental} />
        <Section title={l === 'tr' ? 'Diğer Sorunlar' : 'Other Concerns'} items={other} />
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Detay**

`app/[locale]/calisma-alanlari/[slug]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { PortableText } from '@/components/content/PortableText'
import { JsonLd } from '@/components/content/JsonLd'
import { sanityFetch } from '@/lib/sanity/fetch'
import { conditionBySlugQuery, conditionSlugsQuery } from '@/lib/sanity/queries/condition'

export const revalidate = 60
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: conditionSlugsQuery })
  return slugs.flatMap((slug) => [{ locale: 'tr', slug }, { locale: 'en', slug }])
}

type Cond = {
  title: { tr: string; en?: string }
  category: 'mental' | 'other'
  summary?: { tr: string; en?: string }
  symptoms?: { _key: string; tr: string; en?: string }[]
  content?: { tr: any[]; en?: any[] }
  seo?: any
  recommendedApproach?: { title: { tr: string; en?: string }; shortName: string; slug: { current: string } }
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const d = await sanityFetch<Cond>({ query: conditionBySlugQuery, params: { slug }, tags: ['condition'] })
  if (!d) return {}
  const l = locale as 'tr' | 'en'
  return {
    title: d.seo?.title?.[l] ?? `${d.title[l] ?? d.title.tr} — Gamze Sevin`,
    description: d.seo?.description?.[l],
    robots: d.seo?.noIndex ? { index: false, follow: true } : undefined,
  }
}

export default async function ConditionDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const d = await sanityFetch<Cond>({ query: conditionBySlugQuery, params: { slug }, tags: ['condition'] })
  if (!d) notFound()
  const l = locale as 'tr' | 'en'
  return (
    <>
      <section className="bg-cream py-16">
        <Container className="max-w-prose">
          <Link href={`/${l}/calisma-alanlari`} className="text-label uppercase text-sea hover:text-ink">
            ← {l === 'tr' ? 'Tüm alanlar' : 'All areas'}
          </Link>
          <h1 className="mt-3 text-h1 text-ink">{d.title[l] ?? d.title.tr}</h1>
          {d.summary && <p className="mt-3 text-body text-ink/75">{d.summary[l] ?? d.summary.tr}</p>}
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="prose-content max-w-prose">
            <PortableText blocks={d.content?.[l] ?? d.content?.tr} />
          </div>
          <aside className="space-y-6">
            {d.symptoms && d.symptoms.length > 0 && (
              <div className="rounded-card bg-cream p-5">
                <div className="text-label uppercase text-sea">{l === 'tr' ? 'Belirtiler' : 'Symptoms'}</div>
                <ul className="mt-2 space-y-1 text-body-sm text-ink/85">
                  {d.symptoms.map((s) => <li key={s._key}>• {s[l] ?? s.tr}</li>)}
                </ul>
              </div>
            )}
            {d.recommendedApproach && (
              <div className="rounded-card bg-sand p-5">
                <div className="text-label uppercase text-sea">{l === 'tr' ? 'Önerilen Yaklaşım' : 'Recommended Approach'}</div>
                <Link
                  href={`/${l}/terapi-yaklasimlari/${d.recommendedApproach.slug.current}`}
                  className="mt-1 block text-h3 text-ink hover:underline"
                >
                  {d.recommendedApproach.title[l] ?? d.recommendedApproach.title.tr} ({d.recommendedApproach.shortName})
                </Link>
              </div>
            )}
          </aside>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(condition): list + dynamic detail with approach reference"
```

---

### Task 24: Online Terapi sayfası

**Files:**
- Create: `app/[locale]/online-terapi/page.tsx`, `lib/sanity/queries/online.ts`

- [ ] **Step 1: GROQ**

`lib/sanity/queries/online.ts`:

```typescript
import { groq } from 'next-sanity'
export const onlineQuery = groq`*[_type == "onlineTherapyPage"][0]{
  intro, steps, security, requirements, seo
}`
```

- [ ] **Step 2: Sayfa**

`app/[locale]/online-terapi/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PortableText } from '@/components/content/PortableText'
import { sanityFetch } from '@/lib/sanity/fetch'
import { onlineQuery } from '@/lib/sanity/queries/online'

export const revalidate = 60

type OnlineData = {
  intro?: { tr: any[]; en?: any[] }
  steps?: { _key: string; title: { tr: string; en?: string }; description: { tr: string; en?: string } }[]
  security?: { tr: any[]; en?: any[] }
  requirements?: { tr: any[]; en?: any[] }
  seo?: any
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = await sanityFetch<OnlineData>({ query: onlineQuery, tags: ['online'] })
  const l = locale as 'tr' | 'en'
  return {
    title: d.seo?.title?.[l] ?? (l === 'tr' ? 'Online Terapi — Gamze Sevin' : 'Online Therapy — Gamze Sevin'),
    description: d.seo?.description?.[l],
    alternates: { languages: { tr: '/tr/online-terapi', en: '/en/online-terapi' } },
  }
}

export default async function OnlinePage({ params: { locale } }: { params: { locale: string } }) {
  const d = await sanityFetch<OnlineData>({ query: onlineQuery, tags: ['online'] })
  const l = locale as 'tr' | 'en'
  return (
    <>
      <section className="bg-cream py-16 lg:py-24">
        <Container className="max-w-prose">
          <h1 className="text-h1 text-ink">{l === 'tr' ? 'Online Terapi' : 'Online Therapy'}</h1>
          <div className="prose-content mt-4"><PortableText blocks={d.intro?.[l] ?? d.intro?.tr} /></div>
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-h2 text-ink">{l === 'tr' ? 'Süreç' : 'Process'}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {d.steps?.map((s, i) => (
              <div key={s._key} className="rounded-card border border-ink/10 p-5">
                <div className="text-display-mobile font-bold text-sea">{i + 1}</div>
                <div className="mt-2 text-h3 text-ink">{s.title[l] ?? s.title.tr}</div>
                <p className="mt-2 text-body-sm text-ink/70">{s.description[l] ?? s.description.tr}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-sand py-16">
        <Container className="grid gap-12 md:grid-cols-2 max-w-prose">
          <div>
            <h2 className="text-h2 text-ink">{l === 'tr' ? 'Güvenlik & Gizlilik' : 'Security & Privacy'}</h2>
            <div className="prose-content mt-4"><PortableText blocks={d.security?.[l] ?? d.security?.tr} /></div>
          </div>
          <div>
            <h2 className="text-h2 text-ink">{l === 'tr' ? 'Teknik Gereksinimler' : 'Technical Requirements'}</h2>
            <div className="prose-content mt-4"><PortableText blocks={d.requirements?.[l] ?? d.requirements?.tr} /></div>
          </div>
        </Container>
      </section>
      <section className="bg-ink py-16 text-cream">
        <Container className="text-center">
          <h2 className="text-h1 text-cream">{l === 'tr' ? 'Online Randevu Al' : 'Book Online'}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="https://wa.me/905385184448" size="lg" variant="secondary">WhatsApp</Button>
            <Button href={`/${l}/iletisim`} size="lg" variant="ghost" className="border-cream/30 text-cream">
              {l === 'tr' ? 'İletişim Formu' : 'Contact Form'}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(online): Online Terapi sayfası"
```

---

### Task 25: Blog — liste + detay + kategori filtre

**Files:**
- Create: `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`, `lib/sanity/queries/blog.ts`

- [ ] **Step 1: GROQ**

`lib/sanity/queries/blog.ts`:

```typescript
import { groq } from 'next-sanity'
export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  _id, title, slug, excerpt, cover, publishedAt,
  categories[]->{ _id, title, slug, color }
}`
export const blogCategoriesQuery = groq`*[_type == "blogCategory"]{ _id, title, slug, color }`
export const blogBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title, slug, excerpt, cover, publishedAt, content, author, seo,
  categories[]->{ _id, title, slug },
  related[]->{ _id, title, slug, cover, publishedAt }
}`
export const blogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)][].slug.current`
```

- [ ] **Step 2: Liste**

`app/[locale]/blog/page.tsx`:

```typescript
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { sanityFetch } from '@/lib/sanity/fetch'
import { blogListQuery } from '@/lib/sanity/queries/blog'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60

type Post = {
  _id: string
  title: { tr: string; en?: string }
  slug: { current: string }
  excerpt?: { tr: string; en?: string }
  cover?: any
  publishedAt: string
  categories?: { _id: string; title: { tr: string }; slug: { current: string }; color?: string }[]
}

export default async function BlogList({ params: { locale } }: { params: { locale: string } }) {
  const posts = await sanityFetch<Post[]>({ query: blogListQuery, tags: ['blog'] })
  const l = locale as 'tr' | 'en'
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <h1 className="text-h1 text-ink">Blog</h1>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p._id} href={`/${l}/blog/${p.slug.current}`} className="group block overflow-hidden rounded-card border border-ink/10 shadow-card hover:shadow-hover transition">
              {p.cover && (
                <Image src={urlForImage(p.cover).width(600).height(400).url()} alt={p.title[l] ?? p.title.tr} width={600} height={400} className="aspect-[3/2] w-full object-cover" />
              )}
              <div className="p-5">
                <div className="text-label uppercase text-sea">
                  {new Date(p.publishedAt).toLocaleDateString(l === 'tr' ? 'tr-TR' : 'en-US')}
                </div>
                <div className="mt-2 text-h3 text-ink group-hover:underline">{p.title[l] ?? p.title.tr}</div>
                {p.excerpt && <p className="mt-2 text-body-sm text-ink/70 line-clamp-3">{p.excerpt[l] ?? p.excerpt.tr}</p>}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Detay**

`app/[locale]/blog/[slug]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { PortableText } from '@/components/content/PortableText'
import { JsonLd } from '@/components/content/JsonLd'
import { sanityFetch } from '@/lib/sanity/fetch'
import { blogBySlugQuery, blogSlugsQuery } from '@/lib/sanity/queries/blog'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: blogSlugsQuery })
  return slugs.flatMap((slug) => [{ locale: 'tr', slug }, { locale: 'en', slug }])
}

type Post = {
  title: { tr: string; en?: string }
  slug: { current: string }
  excerpt?: { tr: string; en?: string }
  cover?: any
  publishedAt: string
  content?: { tr: any[]; en?: any[] }
  author: string
  seo?: any
  categories?: { _id: string; title: { tr: string }; slug: { current: string } }[]
  related?: { _id: string; title: { tr: string }; slug: { current: string }; cover?: any; publishedAt: string }[]
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const d = await sanityFetch<Post>({ query: blogBySlugQuery, params: { slug }, tags: ['blog'] })
  if (!d) return {}
  const l = locale as 'tr' | 'en'
  return {
    title: d.seo?.title?.[l] ?? d.title[l] ?? d.title.tr,
    description: d.seo?.description?.[l] ?? d.excerpt?.[l],
  }
}

export default async function BlogDetail({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const d = await sanityFetch<Post>({ query: blogBySlugQuery, params: { slug }, tags: ['blog'] })
  if (!d) notFound()
  const l = locale as 'tr' | 'en'
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: d.title[l] ?? d.title.tr,
    author: { '@type': 'Person', name: d.author },
    datePublished: d.publishedAt,
    image: d.cover ? urlForImage(d.cover).width(1200).url() : undefined,
  }
  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <section className="bg-cream py-16">
          <Container className="max-w-prose">
            <Link href={`/${l}/blog`} className="text-label uppercase text-sea hover:text-ink">← Blog</Link>
            <h1 className="mt-3 text-h1 text-ink">{d.title[l] ?? d.title.tr}</h1>
            <div className="mt-3 text-body-sm text-ink/60">
              {d.author} • {new Date(d.publishedAt).toLocaleDateString(l === 'tr' ? 'tr-TR' : 'en-US')}
            </div>
          </Container>
        </section>
        {d.cover && (
          <Container className="-mt-8">
            <Image src={urlForImage(d.cover).width(1600).url()} alt={d.title[l] ?? d.title.tr} width={1600} height={900} className="rounded-hero shadow-card" priority />
          </Container>
        )}
        <section className="bg-white py-16">
          <Container className="prose-content max-w-prose">
            <PortableText blocks={d.content?.[l] ?? d.content?.tr} />
          </Container>
        </section>
      </article>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(blog): list + detail + BlogPosting JSON-LD"
```

---

### Task 26: İletişim sayfası (form UI + harita + bilgiler)

**Files:**
- Create: `app/[locale]/iletisim/page.tsx`, `components/forms/ContactForm.tsx`, `lib/sanity/queries/contact.ts`

- [ ] **Step 1: react-hook-form + zod + hCaptcha install**

```bash
npm install react-hook-form zod @hookform/resolvers @hcaptcha/react-hcaptcha
```

- [ ] **Step 2: GROQ**

`lib/sanity/queries/contact.ts`:

```typescript
import { groq } from 'next-sanity'
export const contactQuery = groq`{
  "page": *[_type == "contactPage"][0]{ intro, formDisclosure, seo },
  "settings": *[_type == "siteSettings"][0]{ phone, whatsapp, email, linkedin, instagram, address, geo, workingHours }
}`
```

- [ ] **Step 3: ContactForm**

`components/forms/ContactForm.tsx`:

```typescript
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'En az 2 karakter'),
  email: z.string().email('Geçerli bir e-posta giriniz'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'En az 3 karakter'),
  message: z.string().min(10, 'En az 10 karakter'),
  consent: z.literal(true, { errorMap: () => ({ message: 'KVKK onayı zorunludur' }) }),
  // honeypot
  website: z.string().max(0, 'spam').optional().or(z.literal('')),
})
type FormData = z.infer<typeof schema>

export function ContactForm({ locale }: { locale: 'tr' | 'en' }) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    if (!captchaToken) {
      setErrorMessage(locale === 'tr' ? 'Lütfen captcha doğrulamasını tamamlayın' : 'Please complete the captcha')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captchaToken }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('success')
      reset()
      setCaptchaToken(null)
    } catch (e) {
      setStatus('error')
      setErrorMessage(locale === 'tr' ? 'Gönderilemedi, lütfen tekrar deneyin' : 'Failed to send, please try again')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-card border border-success/30 bg-success/10 p-5 text-success">
        {locale === 'tr' ? 'Mesajınız iletildi. Kısa sürede dönüş yapacağım.' : 'Your message has been sent. I will get back to you shortly.'}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Field label={locale === 'tr' ? 'Ad Soyad' : 'Name'} error={errors.name?.message}>
        <input {...register('name')} className="form-input" />
      </Field>
      <Field label={locale === 'tr' ? 'E-posta' : 'Email'} error={errors.email?.message}>
        <input type="email" {...register('email')} className="form-input" />
      </Field>
      <Field label={locale === 'tr' ? 'Telefon (opsiyonel)' : 'Phone (optional)'} error={errors.phone?.message}>
        <input {...register('phone')} className="form-input" />
      </Field>
      <Field label={locale === 'tr' ? 'Konu' : 'Subject'} error={errors.subject?.message}>
        <input {...register('subject')} className="form-input" />
      </Field>
      <Field label={locale === 'tr' ? 'Mesajınız' : 'Message'} error={errors.message?.message}>
        <textarea rows={6} {...register('message')} className="form-input" />
      </Field>

      <label className="flex items-start gap-2 text-body-sm text-ink/85">
        <input type="checkbox" {...register('consent')} className="mt-1" />
        <span>{locale === 'tr' ? 'KVKK aydınlatma metnini okudum ve onaylıyorum.' : 'I have read and accept the KVKK disclosure.'}</span>
      </label>
      {errors.consent && <p className="text-body-sm text-error">{errors.consent.message}</p>}

      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
        onVerify={(token) => setCaptchaToken(token)}
        languageOverride={locale}
      />

      {errorMessage && <p className="text-body-sm text-error">{errorMessage}</p>}

      <Button type="submit" disabled={status === 'loading'} size="lg">
        {status === 'loading' ? '…' : locale === 'tr' ? 'Gönder' : 'Send'}
      </Button>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-body-sm font-medium text-ink/80">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-body-sm text-error">{error}</p>}
    </div>
  )
}
```

`app/globals.css` ekle:

```css
@layer components {
  .form-input {
    @apply w-full rounded-input border border-ink/15 bg-white px-4 py-2.5 text-body text-ink shadow-sm transition focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/30;
  }
}
```

- [ ] **Step 4: İletişim sayfası**

`app/[locale]/iletisim/page.tsx`:

```typescript
import { Container } from '@/components/ui/Container'
import { PortableText } from '@/components/content/PortableText'
import { ContactForm } from '@/components/forms/ContactForm'
import { sanityFetch } from '@/lib/sanity/fetch'
import { contactQuery } from '@/lib/sanity/queries/contact'

export const revalidate = 60

type Data = {
  page: { intro?: any; formDisclosure?: any; seo?: any }
  settings: { phone?: string; whatsapp?: string; email?: string; linkedin?: string; instagram?: string; address?: any; geo?: { lat: number; lng: number }; workingHours?: { _key: string; day: string; hours: string }[] }
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const d = await sanityFetch<Data>({ query: contactQuery, tags: ['contact'] })
  const l = locale as 'tr' | 'en'
  const mapsSrc = d.settings.geo
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}&q=${d.settings.geo.lat},${d.settings.geo.lng}&zoom=15`
    : null
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-h1 text-ink">{l === 'tr' ? 'İletişim' : 'Contact'}</h1>
          <div className="prose-content mt-4 max-w-prose"><PortableText blocks={d.page.intro?.[l] ?? d.page.intro?.tr} /></div>
          <div className="mt-8 space-y-3 text-body text-ink/85">
            {d.settings.whatsapp && <div>WhatsApp: <a className="text-sea underline" href={`https://wa.me/${d.settings.whatsapp}`}>+{d.settings.whatsapp}</a></div>}
            {d.settings.email && <div>{l === 'tr' ? 'E-posta' : 'Email'}: <a className="text-sea underline" href={`mailto:${d.settings.email}`}>{d.settings.email}</a></div>}
            {d.settings.linkedin && <div>LinkedIn: <a className="text-sea underline" href={d.settings.linkedin}>{d.settings.linkedin}</a></div>}
          </div>
          {d.settings.workingHours && d.settings.workingHours.length > 0 && (
            <div className="mt-8 rounded-card bg-white p-5">
              <div className="text-label uppercase text-sea">{l === 'tr' ? 'Çalışma Saatleri' : 'Hours'}</div>
              <ul className="mt-2 space-y-1 text-body-sm text-ink/85">
                {d.settings.workingHours.map((w) => (
                  <li key={w._key}><strong>{w.day}</strong>: {w.hours}</li>
                ))}
              </ul>
            </div>
          )}
          {mapsSrc && (
            <iframe src={mapsSrc} className="mt-8 h-72 w-full rounded-hero" loading="lazy" aria-label="Map" />
          )}
        </div>
        <div className="rounded-hero bg-white p-6 shadow-card">
          <h2 className="text-h2 text-ink">{l === 'tr' ? 'İletişim Formu' : 'Contact Form'}</h2>
          <div className="prose-content mt-2 text-body-sm text-ink/70"><PortableText blocks={d.page.formDisclosure?.[l] ?? d.page.formDisclosure?.tr} /></div>
          <div className="mt-6"><ContactForm locale={l} /></div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(contact): page + form (client validation, hCaptcha, honeypot, KVKK)"
```

---

### Task 27: Yasal sayfalar (Çerez / KVKK / Gizlilik)

**Files:**
- Create: `app/[locale]/cerez-politikasi/page.tsx`, `app/[locale]/kvkk-aydinlatma-metni/page.tsx`, `app/[locale]/gizlilik-politikasi/page.tsx`

- [ ] **Step 1: Ortak helper**

`lib/sanity/queries/legal.ts`:

```typescript
import { groq } from 'next-sanity'
export const legalQuery = groq`*[_type == "siteSettings"][0]{ cookiePolicyText, kvkkText, privacyPolicyText }`
```

- [ ] **Step 2: Çerez sayfası**

`app/[locale]/cerez-politikasi/page.tsx`:

```typescript
import { Container } from '@/components/ui/Container'
import { PortableText } from '@/components/content/PortableText'
import { sanityFetch } from '@/lib/sanity/fetch'
import { legalQuery } from '@/lib/sanity/queries/legal'

export const revalidate = 60
export const metadata = { title: 'Çerez Politikası — Gamze Sevin', robots: { index: false } }

export default async function CookiePolicy({ params: { locale } }: { params: { locale: string } }) {
  const d = await sanityFetch<{ cookiePolicyText?: { tr: any[]; en?: any[] } }>({ query: legalQuery, tags: ['settings'] })
  const l = locale as 'tr' | 'en'
  return (
    <section className="bg-white py-16">
      <Container className="prose-content max-w-prose">
        <h1 className="text-h1 text-ink">Çerez Politikası</h1>
        <PortableText blocks={d.cookiePolicyText?.[l] ?? d.cookiePolicyText?.tr} />
      </Container>
    </section>
  )
}
```

KVKK ve Gizlilik sayfalarını aynı şablonla `kvkkText` / `privacyPolicyText` alanlarına bağlayarak yarat.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(legal): cookie + kvkk + privacy pages"
```

---

## Faz 6 — Form Backend, Güvenlik, Analytics

### Task 28: /api/contact endpoint (zod + Resend + hCaptcha + Upstash)

**Files:**
- Create: `app/api/contact/route.ts`, `lib/rate-limit.ts`
- Create: `tests/api/contact.test.ts`

- [ ] **Step 1: Install**

```bash
npm install resend @upstash/redis @upstash/ratelimit
```

- [ ] **Step 2: Rate limiter**

`lib/rate-limit.ts`:

```typescript
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const redis = Redis.fromEnv()

export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'rl:contact',
})
```

- [ ] **Step 3: Failing test (validation)**

`tests/api/contact.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/app/api/contact/schema'

describe('contactSchema', () => {
  const valid = { name: 'Test User', email: 'a@b.com', subject: 'Hello', message: 'This is a test message.', consent: true, captchaToken: 'tok' }

  it('accepts valid input', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects short name', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'A' }).success).toBe(false)
  })

  it('rejects bad email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'not-email' }).success).toBe(false)
  })

  it('rejects without consent', () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false)
  })

  it('rejects when honeypot filled', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'spam' }).success).toBe(false)
  })
})
```

- [ ] **Step 4: Schema**

`app/api/contact/schema.ts`:

```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  consent: z.literal(true),
  captchaToken: z.string().min(1),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
})

export type ContactPayload = z.infer<typeof contactSchema>
```

`npm test` → 5 test pass.

- [ ] **Step 5: Route**

`app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from './schema'
import { contactLimiter } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY!)

async function verifyHCaptcha(token: string): Promise<boolean> {
  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: process.env.HCAPTCHA_SECRET!, response: token }).toString(),
  })
  const data = (await res.json()) as { success: boolean }
  return data.success
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'

  const { success: rlOk } = await contactLimiter.limit(ip)
  if (!rlOk) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  const body = await req.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_input' }, { status: 400 })

  const data = parsed.data
  if (data.website) return NextResponse.json({ error: 'spam_detected' }, { status: 400 })

  const ok = await verifyHCaptcha(data.captchaToken)
  if (!ok) return NextResponse.json({ error: 'captcha_failed' }, { status: 400 })

  await resend.emails.send({
    from: `Gamze Sevin Site <noreply@${new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname}>`,
    to: 'klinikpsk.gamzesevin@gmail.com',
    replyTo: data.email,
    subject: `Yeni iletişim mesajı: ${data.subject}`,
    text: `Ad: ${data.name}\nE-posta: ${data.email}\nTelefon: ${data.phone ?? '-'}\nKonu: ${data.subject}\n\n${data.message}`,
  })

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 6: Manuel test**

Resend dashboard'da domain ekle (veya test için `onboarding@resend.dev` from kullan). Formu doldur → submit → e-postaya düşüyor mu?

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(api): /api/contact with zod + Resend + hCaptcha + Upstash rate limit"
```

---

### Task 29: Security headers (CSP, HSTS, X-Frame, vb.)

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Headers ekle**

`next.config.mjs`:

```javascript
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./i18n.ts')

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://hcaptcha.com https://*.hcaptcha.com https://www.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https://cdn.sanity.io https://*.google-analytics.com https://www.google.com https://maps.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.sanity.io https://*.google-analytics.com https://hcaptcha.com https://*.hcaptcha.com",
  "frame-src https://hcaptcha.com https://*.hcaptcha.com https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Content-Security-Policy', value: csp },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
  async headers() {
    return [
      { source: '/((?!studio).*)', headers: securityHeaders },
    ]
  },
}

export default withNextIntl(nextConfig)
```

Not: `/studio` route'unu CSP'den hariç tut — Sanity Studio kendi CSP'sini yönetiyor.

- [ ] **Step 2: Test**

`npm run build && npm start` → `curl -I http://localhost:3000/tr` → header'lar görünür.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(security): CSP + HSTS + X-Frame + Referrer-Policy + Permissions-Policy"
```

---

### Task 30: Cookie banner + GA4 Consent Mode

**Files:**
- Create: `components/layout/CookieBanner.tsx`, `components/layout/Analytics.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Install**

```bash
npm install vanilla-cookieconsent
```

- [ ] **Step 2: Analytics (GA4 + Consent Mode)**

`components/layout/Analytics.tsx`:

```typescript
'use client'
import Script from 'next/script'

export function Analytics({ ga4Id }: { ga4Id?: string }) {
  if (!ga4Id) return null
  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ga4Id}');
      `}</Script>
    </>
  )
}
```

- [ ] **Step 3: CookieBanner**

`components/layout/CookieBanner.tsx`:

```typescript
'use client'
import { useEffect } from 'react'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function CookieBanner({ locale }: { locale: 'tr' | 'en' }) {
  useEffect(() => {
    import('vanilla-cookieconsent').then((CC) => {
      CC.run({
        guiOptions: { consentModal: { layout: 'box', position: 'bottom right' } },
        onAccept: () => {
          if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'granted' })
        },
        onChange: ({ cookie }) => {
          const granted = cookie.categories.includes('analytics')
          if (window.gtag) window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })
        },
        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: {},
        },
        language: {
          default: locale,
          translations: {
            tr: {
              consentModal: {
                title: 'Çerezleri kabul ediyor musunuz?',
                description: 'Bu site, deneyiminizi iyileştirmek için zorunlu çerezler ve onayınız ile analitik çerezler kullanır.',
                acceptAllBtn: 'Hepsini Kabul Et',
                acceptNecessaryBtn: 'Sadece Zorunlu',
                showPreferencesBtn: 'Tercihleri Yönet',
              },
              preferencesModal: {
                title: 'Çerez Tercihleri',
                acceptAllBtn: 'Hepsini Kabul Et',
                acceptNecessaryBtn: 'Sadece Zorunlu',
                savePreferencesBtn: 'Tercihleri Kaydet',
                closeIconLabel: 'Kapat',
                sections: [
                  { title: 'Zorunlu Çerezler', description: 'Sitenin temel işlevleri için gereklidir.', linkedCategory: 'necessary' },
                  { title: 'Analitik Çerezler', description: 'Google Analytics 4 ile anonim kullanım istatistikleri toplanır.', linkedCategory: 'analytics' },
                ],
              },
            },
            en: {
              consentModal: {
                title: 'Do you accept cookies?',
                description: 'This site uses necessary cookies and, with your consent, analytics cookies to improve your experience.',
                acceptAllBtn: 'Accept All',
                acceptNecessaryBtn: 'Necessary Only',
                showPreferencesBtn: 'Manage Preferences',
              },
              preferencesModal: {
                title: 'Cookie Preferences',
                acceptAllBtn: 'Accept All',
                acceptNecessaryBtn: 'Necessary Only',
                savePreferencesBtn: 'Save Preferences',
                closeIconLabel: 'Close',
                sections: [
                  { title: 'Necessary Cookies', description: 'Required for site basic functionality.', linkedCategory: 'necessary' },
                  { title: 'Analytics Cookies', description: 'Anonymous usage statistics via Google Analytics 4.', linkedCategory: 'analytics' },
                ],
              },
            },
          },
        },
      })
    })
  }, [locale])

  return null
}
```

- [ ] **Step 4: Layout'ta wire et**

`app/[locale]/layout.tsx` — Sanity'den GA4 ID çek:

```typescript
import { Analytics } from '@/components/layout/Analytics'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { sanityFetch } from '@/lib/sanity/fetch'
import { groq } from 'next-sanity'

const ga4Query = groq`*[_type == "siteSettings"][0].ga4Id`

// layout component içinde:
const ga4Id = await sanityFetch<string | undefined>({ query: ga4Query, tags: ['settings'] })

return (
  <html lang={locale} className={montserrat.variable}>
    <body className="bg-white font-sans text-ink antialiased">
      <Analytics ga4Id={ga4Id} />
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer locale={locale} />
        <WhatsAppFab phone="905385184448" />
        <CookieBanner locale={locale as 'tr' | 'en'} />
      </NextIntlClientProvider>
    </body>
  </html>
)
```

- [ ] **Step 5: Test**

`npm run dev` → banner sağ altta görünür; "Hepsini Kabul Et" tıklandıktan sonra Network sekmesinde `collect?v=2&tid=G-XXX...` istekleri başlar; "Sadece Zorunlu"da başlamaz.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(analytics): GA4 Consent Mode v2 + KVKK uyumlu cookie banner"
```

---

## Faz 7 — i18n EN

### Task 31: EN dil aktif — locale switcher + Sanity EN içerikler

**Files:**
- Modify: `messages/en.json`, çeşitli sayfa metinleri

- [ ] **Step 1: Test — `/en` çalışıyor mu?**

`npm run dev` → `/en` route açılır, Header EN, Footer EN. Sayfa içerikleri TR'de kalmış olabilir (locale fallback).

- [ ] **Step 2: EN messages tamamla**

`messages/en.json` — eksik anahtarları doldur (form etiketleri, hata mesajları, vb.):

```json
{
  "nav": { /* zaten dolu */ },
  "footer": { /* zaten dolu */ },
  "common": {
    "readMore": "Read more",
    "viewAll": "View all",
    "explore": "Explore",
    "back": "Back",
    "send": "Send",
    "loading": "Loading"
  }
}
```

Aynı anahtarları `tr.json`'a da ekle.

- [ ] **Step 3: Sanity'de EN çevirileri**

`/studio` → her singleton (homePage, aboutPage, …) ve doküman tipinde EN sekmesini doldur. Önemli sayfaların minimum çevirisi:
- `homePage.heroTitle.en`, `heroSubtitle.en`, `seo.title.en`, `seo.description.en`
- `aboutPage.intro.en`
- 3 × `therapyApproach.title.en`, `summary.en`
- 17 × `conditionArea.title.en`

Görev kapsamında bu içerikler `[EN translation pending]` placeholder'larıyla başlar. Gerçek çeviri Gamze hanım tarafından yapılır.

- [ ] **Step 4: Locale switcher görünür mü test**

`/tr/hakkimda` → switcher'a tıkla → `/en/about`'a gider. URL slug mapping:
- `hakkimda` ↔ `about`
- `terapi-yaklasimlari` ↔ `therapy-approaches`
- `calisma-alanlari` ↔ `areas-of-practice`
- vb.

Eğer aynı slug'ları kullanırsak (`/en/hakkimda` çalışır) basit kalır. Master prompt'ta slug farkı zorunlu değil — TR slug'ları her iki locale'de kullan.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(i18n): complete EN messages + Sanity EN translations stub"
```

---

### Task 32: sitemap.xml + robots.txt + hreflang

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: sitemap**

`app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/fetch'
import { groq } from 'next-sanity'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamzesevin.com'

const slugsQuery = groq`{
  "approach": *[_type == "therapyApproach" && defined(slug.current)].slug.current,
  "condition": *[_type == "conditionArea" && defined(slug.current) && seo.noIndex != true].slug.current,
  "blog": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }
}`

type Slugs = { approach: string[]; condition: string[]; blog: { slug: string; updated: string }[] }

const STATIC_PAGES = ['', '/hakkimda', '/terapi-yaklasimlari', '/calisma-alanlari', '/online-terapi', '/blog', '/iletisim']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<Slugs>({ query: slugsQuery })
  const locales = ['tr', 'en'] as const

  const make = (path: string, updated?: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE}/tr${path}`,
    lastModified: updated ? new Date(updated) : new Date(),
    alternates: {
      languages: { tr: `${SITE}/tr${path}`, en: `${SITE}/en${path}` },
    },
  })

  const staticEntries = STATIC_PAGES.flatMap((p) => locales.map((l) => ({ url: `${SITE}/${l}${p}`, lastModified: new Date(), alternates: { languages: { tr: `${SITE}/tr${p}`, en: `${SITE}/en${p}` } } })))
  const approachEntries = slugs.approach.flatMap((s) => locales.map((l) => make(`/terapi-yaklasimlari/${s}`)))
  const conditionEntries = slugs.condition.flatMap((s) => locales.map((l) => make(`/calisma-alanlari/${s}`)))
  const blogEntries = slugs.blog.flatMap((b) => locales.map((l) => make(`/blog/${b.slug}`, b.updated)))

  return [...staticEntries, ...approachEntries, ...conditionEntries, ...blogEntries]
}
```

- [ ] **Step 2: robots**

`app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamzesevin.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api'] }],
    sitemap: `${SITE}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Test**

`npm run build && npm start` → `/sitemap.xml` ve `/robots.txt` doğru içerik.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seo): sitemap.xml (dynamic) + robots.txt with hreflang"
```

---

## Faz 8 — Polish + Launch

### Task 33: 404 + 500 sayfaları + meta defaults

**Files:**
- Create: `app/[locale]/not-found.tsx`, `app/global-error.tsx`

- [ ] **Step 1: not-found**

`app/[locale]/not-found.tsx`:

```typescript
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <section className="bg-cream py-24">
      <Container className="text-center">
        <div className="text-display text-ink/30">404</div>
        <h1 className="mt-4 text-h1 text-ink">Sayfa bulunamadı</h1>
        <p className="mt-3 text-body text-ink/70">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
        <Link href="/tr" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-label uppercase text-cream shadow-card hover:shadow-hover">
          Anasayfaya Dön
        </Link>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: global-error**

`app/global-error.tsx`:

```typescript
'use client'
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ fontFamily: 'system-ui', padding: 48, textAlign: 'center' }}>
        <h1>Bir hata oluştu</h1>
        <p>Üzgünüm, beklenmedik bir hata meydana geldi.</p>
        <button onClick={reset} style={{ marginTop: 16, padding: '8px 16px' }}>Tekrar dene</button>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: 404 + global-error pages"
```

---

### Task 34: Lighthouse audit + tipografi prose stilleri

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Prose stilleri (PortableText için)**

`app/globals.css` `@layer components`:

```css
.prose-content { @apply text-body leading-relaxed text-ink/85; }
.prose-content p { @apply mt-4 first:mt-0; }
.prose-content h2 { @apply mt-10 text-h2 text-ink; }
.prose-content h3 { @apply mt-6 text-h3 text-ink; }
.prose-content a { @apply text-sea underline underline-offset-4 hover:text-ink; }
.prose-content ul { @apply mt-4 list-disc space-y-2 pl-6; }
.prose-content blockquote { @apply mt-6 border-l-4 border-sea/40 pl-4 italic text-ink/80; }
```

- [ ] **Step 2: Lighthouse koş**

`npm run build && npm start` → Chrome incognito → DevTools → Lighthouse → Mobile + Desktop run.

Hedefler:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO 100

Yaygın sorunlar:
- LCP yüksekse: hero portrait `priority` doğru kullanılmış mı? `next/image` fill yerine width/height doğru
- CLS varsa: image'lerin width/height set olmuş mu?
- Color contrast hataları: palet açık tonların üzerinde body text rengi `ink/85` olmalı (60-70 değil)

Tüm sayfalarda audit'i koş.

- [ ] **Step 3: Görsel optimize — Sanity image presets**

`lib/sanity/image.ts` zaten `auto('format')` kullanıyor — Sanity AVIF/WebP otomatik. Hero için: `.width(900).quality(85)`; cover için: `.width(600).height(400).fit('crop')`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: prose styles + Lighthouse pass on all routes"
```

---

### Task 35: Vercel deploy

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: GitHub repo oluştur ve push**

```bash
gh repo create gamze-web --public --source=. --remote=origin --push
```

- [ ] **Step 2: Vercel projesi**

Vercel dashboard → Add New Project → GitHub `gamze-web` → Import → Framework: Next.js (auto-detect).

Build settings: default (no changes needed).

- [ ] **Step 3: Env vars**

Vercel → Settings → Environment Variables. `.env.example`'daki tüm anahtarları (production + preview):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` ✅
- `NEXT_PUBLIC_SANITY_DATASET=production` ✅
- `NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01` ✅
- `SANITY_API_READ_TOKEN` ✅
- `RESEND_API_KEY` ✅
- `HCAPTCHA_SECRET` ✅
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` ✅
- `UPSTASH_REDIS_REST_URL` ✅
- `UPSTASH_REDIS_REST_TOKEN` ✅
- `NEXT_PUBLIC_GA4_ID` (Sanity'den de okunabilir ama yedek)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SITE_URL=https://<vercel-domain>` (geçici, domain bağlanınca güncellenecek)

- [ ] **Step 4: vercel.json (Sanity Studio için region pin)**

`vercel.json`:

```json
{
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/studio/(.*)",
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    }
  ]
}
```

- [ ] **Step 5: Deploy + smoke test**

Vercel otomatik deploy. Bittiğinde URL aç:
- `/tr` — anasayfa görünür
- `/studio` — Sanity Studio login
- `/tr/iletisim` — form çalışır mı? Resend test e-postası gelir mi?
- Lighthouse production'da → ≥ 90/95/95/100

- [ ] **Step 6: Search Console**

google.com/search-console → Add Property → URL prefix → Vercel domain → Verify (HTML tag verification — `<meta name="google-site-verification">` `app/[locale]/layout.tsx` metadata'sına ekle):

```typescript
metadata.verification = { google: 'XXXXXXX' }
```

`/sitemap.xml` submit et.

- [ ] **Step 7: GA4 doğrulama**

GA4 Realtime → site açıkken kendi aktivitenin görünmesi (cookie kabul ettikten sonra).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: vercel.json + production deploy"
git push
```

---

### Task 36: Custom domain bağlama (domain alındıktan sonra)

**Files:**
- Modify: Vercel env var `NEXT_PUBLIC_SITE_URL`

- [ ] **Step 1: Vercel → Domains → Add → `gamzesevin.com`**

DNS sağlayıcısında A/CNAME kayıtları:

```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

- [ ] **Step 2: Resend domain doğrulama**

resend.com/domains → Add `gamzesevin.com` → DNS'e SPF, DKIM, DMARC kayıtları ekle → doğrula. Sonra `app/api/contact/route.ts`'te `from: noreply@gamzesevin.com` çalışacak.

- [ ] **Step 3: `NEXT_PUBLIC_SITE_URL=https://gamzesevin.com` güncelle ve redeploy**

- [ ] **Step 4: hostingersite.com'dan yönlendirme**

Mevcut Hostinger panelinde domain redirect → `gamzesevin.com`.

- [ ] **Step 5: Search Console'da yeni property ekle, sitemap submit et**

- [ ] **Step 6: Commit yok — bu task konfigürasyon değişiklikleri**

---

## Self-Review Notları

Bu plan §13 (Açık Sorular) ile sınırlanan kısımlar dışında spec'in tamamını kapsıyor:

- ✅ Faz 1: Next.js + Tailwind + next-intl + Sanity Studio embed
- ✅ Faz 2: 11 schema (locale + seo helpers + 5 singleton + 5 doc) + structure
- ✅ Faz 3: Markdown parser + seed (siteSettings, homePage, 3 approach, 17 condition, about, online, contact, 8 faq, 1 blog, portrait upload)
- ✅ Faz 4: Anasayfa 9 bölüm + FAQPage + MedicalBusiness JSON-LD + metadata
- ✅ Faz 5: 6 iç sayfa (hakkımda, yaklaşımlar liste+detay, alanlar liste+detay, online, blog liste+detay, iletişim) + 3 yasal
- ✅ Faz 6: /api/contact (zod + Resend + hCaptcha + Upstash) + security headers + cookie banner + GA4 Consent Mode
- ✅ Faz 7: EN messages + Sanity EN placeholders + sitemap/robots/hreflang
- ✅ Faz 8: 404/500 + Lighthouse + Vercel deploy + Search Console + domain

**Açık sorular plan dışında kalan, çalışma zamanı kararları:**
- Domain ismi (Gamze hanım) — Task 36 placeholder
- İzmir ofis adresi → Studio'dan girilecek
- GA4 Property ID → Studio'dan girilecek
- Google Business Profile başvurusu → post-launch
- Avukat onayı (KVKK metinleri) → post-launch

Plan testleri TDD yaklaşımı barındırır: parser unit testleri (Task 11), form schema testleri (Task 28). UI bileşenleri için Lighthouse audit (Task 34) production-grade kalite garantisi sağlar.

