'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'

const schema = z.object({
  name: z.string().min(2, 'min').max(120),
  email: z.string().email('email'),
  phone: z.string().max(40).optional().or(z.literal('')),
  subject: z.string().min(2, 'min').max(160),
  message: z.string().min(10, 'min').max(4000),
  kvkk: z.literal(true, { error: 'required' }),
  honey: z.string().max(0).optional(), // honeypot
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '', kvkk: false as unknown as true, honey: '' },
  })

  const onSubmit = async (data: FormValues) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Bad response')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-card bg-cream-soft p-6 shadow-card lg:p-8"
      noValidate
    >
      {/* honeypot — keep hidden, real users won't fill */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register('honey')}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} error={errors.name?.message ? t('error') : undefined}>
          <input
            type="text"
            autoComplete="name"
            {...register('name')}
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label={t('email')} error={errors.email?.message ? t('error') : undefined}>
          <input
            type="email"
            autoComplete="email"
            {...register('email')}
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('phone')}>
          <input
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={inputCls(false)}
          />
        </Field>
        <Field label={t('subject')} error={errors.subject?.message ? t('error') : undefined}>
          <input
            type="text"
            {...register('subject')}
            className={inputCls(!!errors.subject)}
          />
        </Field>
      </div>

      <Field label={t('message')} error={errors.message?.message ? t('error') : undefined}>
        <textarea
          rows={6}
          {...register('message')}
          className={cn(inputCls(!!errors.message), 'resize-y')}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink/85">
        <input
          type="checkbox"
          {...register('kvkk')}
          className="mt-1 h-4 w-4 rounded border-ink/30 text-ink focus:ring-sea"
        />
        <span>{t('kvkk')}</span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-soft disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? t('submitting') : t('submit')}
      </button>

      {status === 'success' && (
        <p className="rounded-xl bg-success/10 px-4 py-3 text-sm text-success">
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
          {t('error')}
        </p>
      )}
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/70">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-error">{error}</span>}
    </label>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-input border bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition',
    'placeholder:text-ink/40',
    'focus:outline-none focus:ring-2 focus:ring-sea',
    hasError ? 'border-error/50' : 'border-ink/15',
  )
}
