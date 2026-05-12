'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import type { FAQItem } from '@/lib/content/types'
import type { Locale } from '@/i18n/routing'

export function FAQ({
  items,
  locale,
  bg = 'sand',
  title,
}: {
  items: FAQItem[]
  locale: Locale
  bg?: 'sand' | 'white' | 'cream'
  title: string
}) {
  if (items.length === 0) return null
  const bgClass = { sand: 'bg-sand', white: 'bg-white', cream: 'bg-cream' }[bg]
  return (
    <section className={`${bgClass} py-16 lg:py-24`}>
      <Container>
        <div className="max-w-2xl">
          <Pill tone="outline">{locale === 'tr' ? 'SSS' : 'FAQ'}</Pill>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h2>
        </div>
        <Accordion.Root
          type="single"
          collapsible
          className="mx-auto mt-10 max-w-3xl space-y-3"
        >
          {items.map((it) => (
            <Accordion.Item
              key={it.id}
              value={it.id}
              className="overflow-hidden rounded-card bg-white shadow-card"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span className="text-base font-semibold text-ink sm:text-lg">
                    {it.question[locale]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-lg text-ink transition group-data-[state=open]:rotate-45"
                  >
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className="overflow-hidden data-[state=open]:animate-[radix-slide-down_180ms_ease] data-[state=closed]:animate-[radix-slide-up_140ms_ease]"
              >
                <div className="space-y-3 px-5 pb-6 text-sm leading-relaxed text-ink/80 sm:text-base">
                  {it.answer[locale].map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  )
}
