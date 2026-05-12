import { cn } from '@/lib/cn'

type Tone = 'default' | 'cream' | 'inkOnDark' | 'outline'

const tones: Record<Tone, string> = {
  default: 'bg-ink/10 text-ink',
  cream: 'bg-cream text-ink',
  inkOnDark: 'bg-cream/15 text-cream',
  outline: 'border border-ink/20 text-ink',
}

export function Pill({
  className,
  children,
  tone = 'default',
}: {
  className?: string
  children: React.ReactNode
  tone?: Tone
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
