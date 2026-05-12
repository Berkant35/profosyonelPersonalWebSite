import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inkOnDark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:opacity-50'

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-cream shadow-card hover:shadow-hover hover:bg-ink-soft',
  secondary:
    'bg-cream text-ink shadow-card hover:shadow-hover hover:bg-cream-soft',
  ghost:
    'border border-ink/15 text-ink hover:bg-ink/5',
  inkOnDark:
    'border border-cream/30 text-cream hover:bg-cream/10',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type LinkProps = CommonProps & {
  href: string
  external?: boolean
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

export function Button(props: LinkProps | ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(base, sizes[size], variants[variant], className)

  if ('href' in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonProps
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
