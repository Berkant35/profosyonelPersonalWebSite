import { cn } from '@/lib/cn'

export function Container({
  className,
  children,
  as: As = 'div',
}: {
  className?: string
  children: React.ReactNode
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'nav'
}) {
  return (
    <As
      className={cn(
        'mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8',
        className,
      )}
    >
      {children}
    </As>
  )
}
