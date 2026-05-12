import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string
  title: string
  intro?: string
}) {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <Container>
        {eyebrow && <Pill tone="outline">{eyebrow}</Pill>}
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 lg:text-lg">
            {intro}
          </p>
        )}
      </Container>
    </section>
  )
}
