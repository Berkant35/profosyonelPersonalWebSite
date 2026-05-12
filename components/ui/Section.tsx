import { cn } from '@/lib/cn'

type BG = 'white' | 'cream' | 'sand' | 'ink' | 'cream-soft'

const bgMap: Record<BG, string> = {
  white: 'bg-white text-ink',
  cream: 'bg-cream text-ink',
  'cream-soft': 'bg-cream-soft text-ink',
  sand: 'bg-sand text-ink',
  ink: 'bg-ink text-cream',
}

export function Section({
  bg = 'white',
  className,
  children,
  id,
}: {
  bg?: BG
  className?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className={cn('py-16 lg:py-24', bgMap[bg], className)}>
      {children}
    </section>
  )
}
