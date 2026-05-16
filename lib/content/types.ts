export type Locale = 'tr' | 'en'

export type LocaleString = Record<Locale, string>
export type LocaleStringArray = Record<Locale, string[]>

export type Paragraph = string

export type LocaleParagraphs = Record<Locale, Paragraph[]>

export type RichTextPart = { text: string; bold?: boolean }
export type LocaleRichText = Record<Locale, RichTextPart[]>

export type SiteSettings = {
  email: string
  phone: string
  phoneDisplay: string
  whatsappNumber: string
  whatsappUrl: string
  linkedin: string
  instagram?: string
  city: string
  workingHours: LocaleString
  copyrightName: string
}

export type HomeContent = {
  hero: {
    eyebrow: LocaleString
    title: LocaleString
    subtitle: LocaleRichText
    ctaPrimaryLabel: LocaleString
    ctaSecondaryLabel: LocaleString
  }
  aboutTeaser: {
    body: LocaleString
    badges: LocaleStringArray
  }
  onlineStrip: {
    quote: LocaleString
    steps: {
      title: LocaleString
      desc: LocaleString
    }[]
  }
}

export type TherapyApproach = {
  slug: string
  title: LocaleString
  ozet: LocaleString
  body: LocaleParagraphs
  kimlereUygun: LocaleStringArray
  sure: LocaleString
  kaynaklar?: LocaleStringArray
}

export type ConditionArea = {
  slug: string
  title: LocaleString
  category: 'ruhsal' | 'diger'
  ozet: LocaleString
  belirtiler: LocaleStringArray
  body: LocaleParagraphs
  onerilenYaklasim: string // slug of TherapyApproach
}

export type FAQItem = {
  id: string
  question: LocaleString
  answer: LocaleParagraphs
  homepage: boolean
}

export type BlogPost = {
  slug: string
  title: LocaleString
  excerpt: LocaleString
  body: LocaleParagraphs
  category: LocaleString
  categorySlug: string
  publishedAt: string // ISO date
  author: string
}

export type AboutContent = {
  intro: LocaleParagraphs
  approach: LocaleString
  experience: LocaleStringArray
  education: { school: string; degree: LocaleString }[]
  publications: {
    title: LocaleString
    venue: LocaleString
    doi?: string
  }[]
  certificates: {
    name: LocaleString
    trainer: LocaleString
    accreditation: LocaleString
  }[]
  portraitAlt: LocaleString
}

export type OnlinePage = {
  intro: LocaleParagraphs
  steps: {
    title: LocaleString
    desc: LocaleString
  }[]
  security: LocaleParagraphs
}
