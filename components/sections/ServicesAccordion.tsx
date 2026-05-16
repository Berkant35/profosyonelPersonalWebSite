'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Container } from '@/components/ui/Container'
import type { Locale } from '@/i18n/routing'

const SERVICES = [
  {
    id: 'bireysel-yetiskin',
    title: { tr: 'Bireysel / Yetişkin Terapisi', en: 'Individual / Adult Therapy' },
    desc: {
      tr: 'Yetişkinlere yönelik bireysel psikoterapi sürecinde duygusal güçlükler, ilişkisel zorluklar ve kişisel hedefler üzerine birlikte çalışıyoruz.',
      en: 'In individual psychotherapy for adults, we work together on emotional difficulties, relational challenges and personal goals.',
    },
  },
  {
    id: 'cift',
    title: { tr: 'Çift Terapisi', en: 'Couples Therapy' },
    desc: {
      tr: 'Çiftlerin iletişim, çatışma ve yakınlık alanlarındaki güçlükleri yapıcı bir çerçevede ele alıyoruz.',
      en: 'We address communication, conflict and intimacy difficulties between partners within a constructive framework.',
    },
  },
  {
    id: 'ergen',
    title: { tr: 'Ergen Terapisi', en: 'Adolescent Therapy' },
    desc: {
      tr: 'Ergenlerin yaşa özgü duygusal, sosyal ve akademik zorluklarına yönelik destekleyici bir terapi süreci sunuyorum.',
      en: 'A supportive therapy process tailored to adolescents’ age-specific emotional, social and academic difficulties.',
    },
  },
  {
    id: 'online',
    title: { tr: 'Online Terapi', en: 'Online Therapy' },
    desc: {
      tr: 'Türkiye’nin her yerinden ve yurt dışından, Türkçe ve İngilizce sürdürülen güvenli görüntülü seanslar.',
      en: 'Secure video sessions from anywhere in Turkey and abroad, available in Turkish and English.',
    },
  },
] as const

export function ServicesAccordion({ locale }: { locale: Locale }) {
  return (
    <section className="bg-cream pb-10 lg:pb-14">
      <Container>
        <Accordion.Root type="multiple" className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Accordion.Item
              key={s.id}
              value={s.id}
              className="overflow-hidden rounded-2xl border border-ink/15 bg-white"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-ink transition hover:bg-cream-soft data-[state=open]:bg-cream-soft">
                  <span>{s.title[locale]}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 text-ink/60 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-4 pb-4 pt-1 text-sm leading-relaxed text-ink/70">
                  {s.desc[locale]}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  )
}
