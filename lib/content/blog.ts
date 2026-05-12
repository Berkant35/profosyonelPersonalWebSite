import type { BlogPost } from './types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'terapiye-baslarken-ne-beklemeli',
    title: {
      tr: 'Terapiye Başlarken Ne Beklemeli?',
      en: 'What to Expect When Starting Therapy',
    },
    excerpt: {
      tr: 'İlk seans, ilk birkaç hafta ve uzun vadeli süreç — terapi yolculuğunda gerçekçi bir harita.',
      en: 'A grounded map for the first session, the first weeks, and the longer arc of therapy.',
    },
    body: {
      tr: [
        'Terapiye başlamak çoğu kişi için yeni bir alana adım atmak anlamına gelir. Ne soracağınızı, ne hissedeceğinizi ya da sonunda ne değişeceğini önceden bilmeden başlamak doğal bir tedirginlik yaratır.',
        'İlk seans (değerlendirme seansı) yargılayıcı değildir; daha çok birlikte bir harita çıkarma seansıdır. Yaşadıklarınızı, nasıl etkilendiğinizi ve sürecin sonunda nereye varmak istediğinizi konuşuruz.',
        'İlk birkaç haftada genellikle iki şey paralel ilerler: bir yandan sorunu birlikte daha iyi anlamaya çalışırız, diğer yandan günlük hayatta deneyebileceğiniz küçük adımlar belirleriz. Bu adımlar terapinin seanslar arasında da çalışmasını sağlar.',
        'Uzun vadede ise hedef sadece "kötü hissetmeyi" durdurmak değildir; aynı zamanda bir daha benzer zorluklarla karşılaştığınızda kullanabileceğiniz işlevsel becerileri kalıcı hale getirmektir.',
      ],
      en: [
        'Starting therapy can feel like stepping into unfamiliar territory. It\'s natural to feel uncertain about what to ask, what to feel, or what will be different at the end.',
        'The first session is an assessment session — not a test. It\'s a chance to map things out together: what\'s happening, how it\'s affecting you, and where you\'d like to be by the end.',
        'In the first few weeks, two things usually run in parallel: building a clearer understanding of the issue, and identifying small steps you can try between sessions. Those steps are how therapy keeps working between meetings.',
        'Over the longer term, the goal isn\'t only to stop feeling bad. It\'s also to internalise the functional skills that will help you handle similar challenges if they come up again later.',
      ],
    },
    category: { tr: 'Süreç', en: 'Process' },
    categorySlug: 'surec',
    publishedAt: '2026-05-01',
    author: 'Gamze Sevin',
  },
]

export const blogPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug)

export const blogCategories = [
  { slug: 'all', title: { tr: 'Tümü', en: 'All' } },
  { slug: 'surec', title: { tr: 'Süreç', en: 'Process' } },
  { slug: 'yontemler', title: { tr: 'Yöntemler', en: 'Methods' } },
  { slug: 'gunluk-hayat', title: { tr: 'Günlük Hayat', en: 'Everyday Life' } },
]
