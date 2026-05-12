import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import type { Locale } from '@/i18n/routing'

const items = (locale: Locale) => [
  {
    href: `/${locale}/terapi-yaklasimlari`,
    title: locale === 'tr' ? 'Terapi Yaklaşımları' : 'Therapy Approaches',
    desc:
      locale === 'tr'
        ? 'BDT, EMDR ve Sorun Çözme Terapisi — bilimsel kanıta dayalı yöntemler.'
        : 'CBT, EMDR and Problem-Solving Therapy — evidence-based methods.',
    iconPath:
      'M3 12l2-2 4 4 8-8 4 4M3 21h18',
  },
  {
    href: `/${locale}/calisma-alanlari`,
    title: locale === 'tr' ? 'Çalışma Alanları' : 'Areas of Practice',
    desc:
      locale === 'tr'
        ? 'Depresyon, anksiyete, OKB, TSSB, ilişki sorunları ve daha fazlası.'
        : 'Depression, anxiety, OCD, PTSD, relationship issues and more.',
    iconPath:
      'M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4',
  },
  {
    href: `/${locale}/online-terapi`,
    title: locale === 'tr' ? 'Online Terapi' : 'Online Therapy',
    desc:
      locale === 'tr'
        ? 'Türkçe ve İngilizce, güvenli görüntülü seanslar.'
        : 'Secure video sessions in Turkish and English.',
    iconPath:
      'M2 6h20v12H2zM2 18l5-4 4 3 5-5 6 6',
  },
]

export function QuickLinks({ locale }: { locale: Locale }) {
  const list = items(locale)
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="grid gap-5 md:grid-cols-3">
        {list.map((it) => (
          <Card key={it.href} href={it.href} className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-ink">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={it.iconPath} />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{it.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sea">
              {locale === 'tr' ? 'Detay' : 'Details'} →
            </span>
          </Card>
        ))}
      </Container>
    </section>
  )
}
