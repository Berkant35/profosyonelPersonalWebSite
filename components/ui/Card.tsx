import Link from 'next/link'
import { cn } from '@/lib/cn'

type CardProps = {
  className?: string
  children: React.ReactNode
  href?: string
  as?: 'div' | 'article'
  interactive?: boolean
}

export function Card({
  className,
  children,
  href,
  as = 'div',
  interactive,
}: CardProps) {
  const classes = cn(
    'rounded-card bg-white shadow-card transition',
    (interactive || href) && 'hover:-translate-y-0.5 hover:shadow-hover',
    className,
  )
  if (href) {
    return (
      <Link href={href} className={cn('block', classes)}>
        {children}
      </Link>
    )
  }
  const As = as
  return <As className={classes}>{children}</As>
}
