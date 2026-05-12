# Gamze Sevin — Psikolog Web Sitesi & CMS

**Tarih:** 2026-05-12
**Kapsam:** Klinik Psikolog Gamze Sevin için modern, SEO uyumlu, çift dilli (TR/EN), Sanity CMS destekli web sitesi.
**Durum:** Tasarım onaylandı, implementation planı bekleniyor.

---

## 1. Bağlam

Mevcut site (`https://dodgerblue-mule-384706.hostingersite.com/`) tema-temelli, demo içerikleri (placeholder telefon, lorem ipsum blog, diş hekimliği hizmet listesi) hâlâ canlıda. Site sadece anasayfa + hakkımda + iletişim sayfalarından oluşuyor, fiziksel adres/harita/iletişim formu yok.

Hedef: tamamen yeniden yapılmış, içerik yönetimi Sanity üzerinden Gamze Hanım'ın kendi başına yönetebileceği, yerel SEO odaklı (İzmir psikolog) bir site.

**Mevcut içerik kaynakları:**
- `site_icerikleri.md` — anasayfa, hakkımda, iletişim metinleri (TR)
- `erturkyilmaz_sss.md` — SSS referansı (Gamze için adapte edilecek)
- `raw/` — eski sitenin scraped HTML/TXT versiyonları (yedek)
- `assets/foto2-*.webp` — Gamze portresi

---

## 2. Teknoloji Stack

| Katman | Seçim | Gerekçe |
|---|---|---|
| Framework | Next.js 15 (App Router, RSC, ISR) | SEO, performans, ekosistem |
| Dil | TypeScript | Tip güvenliği |
| Stil | Tailwind CSS | Hızlı, design token uyumlu |
| CMS | Sanity v3 (Studio embed `/studio`) | Gamze Hanım için görsel admin |
| i18n | next-intl (`/tr`, `/en`) | App Router uyumlu |
| Form/e-posta | Resend | Modern, ucuz, deliverability iyi |
| Captcha | hCaptcha (free tier) | KVKK uyumlu |
| Rate limit | Upstash Redis | Edge uyumlu, free tier |
| Analytics | Google Analytics 4 + Consent Mode v2 | Ücretsiz, sahibi tanıdık |
| Cookie banner | vanilla-cookieconsent (custom stil) | KVKK uyumlu, açık kaynak |
| Animasyon | framer-motion (sınırlı) | Sade fade-up, hover |
| Deploy | Vercel | Next.js native, SSL otomatik |
| Domain | TBD (Gamze hanım belirleyecek) | Şimdilik *.vercel.app |

**Repo yapısı (monorepo, tek deploy):**

```
gamze_web_site/
├── apps/web/                    # Next.js
│   ├── app/
│   │   ├── [locale]/            # tr | en
│   │   │   ├── page.tsx
│   │   │   ├── hakkimda/
│   │   │   ├── terapi-yaklasimlari/[slug]/
│   │   │   ├── calisma-alanlari/[slug]/
│   │   │   ├── online-terapi/
│   │   │   ├── blog/[slug]/
│   │   │   ├── iletisim/
│   │   │   ├── cerez-politikasi/
│   │   │   ├── kvkk-aydinlatma-metni/
│   │   │   └── gizlilik-politikasi/
│   │   ├── studio/[[...index]]/
│   │   ├── api/contact/route.ts
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/{ui,layout,content,sections,forms}/
│   ├── lib/sanity/{client,queries,image}.ts
│   └── messages/{tr,en}.json
├── sanity/schemas/
├── scripts/seed-content.ts
├── docs/superpowers/specs/
└── .env.example
```

---

## 3. Sayfalar & URL Yapısı

| # | Sayfa | URL (TR/EN) | Özet |
|---|---|---|---|
| 1 | Anasayfa | `/tr` • `/en` | 9 bölüm — bkz. §6 |
| 2 | Hakkımda | `/tr/hakkimda` • `/en/about` | Tanıtım, deneyim, yaklaşım, eğitim, yayınlar, sertifikalar |
| 3 | Terapi Yaklaşımları (liste) | `/tr/terapi-yaklasimlari` | 3 yaklaşım kartı |
| 3a | Detay | `/.../bdt`, `/.../emdr`, `/.../sorun-cozme-terapisi` | Yöntem + "Kimlere uygundur?" + süre + kaynaklar |
| 4 | Çalışma Alanları (liste) | `/tr/calisma-alanlari` | 17 alan kategorize grid |
| 4a | Detay | `/.../depresyon`, `/.../okb`, `/.../tssb`, …  | Sorun + belirtiler + önerilen yaklaşım + CTA |
| 5 | Online Terapi | `/tr/online-terapi` • `/en/online-therapy` | Süreç (4 adım), güvenlik, randevu, FAQ |
| 6 | Blog | `/tr/blog`, `/tr/blog/[slug]` | Liste + detay + kategori filtre |
| 7 | İletişim | `/tr/iletisim` • `/en/contact` | Form + WhatsApp + e-posta + harita + sosyal medya |
| 8 | Yasal | `/cerez-politikasi`, `/kvkk-aydinlatma-metni`, `/gizlilik-politikasi` | siteSettings altında PortableText |
| - | Sistem | `/studio`, `/api/contact`, `/404`, `/500` | İç route'lar |

**Ortak elementler:**
- **Header (sticky):** Logo + 6 menü + dil değiştirici + "Randevu Al" CTA
- **Footer:** Mini hakkımda, hızlı linkler, iletişim, sosyal medya, copyright, KVKK + Çerez Politikası
- **Sticky WhatsApp FAB:** Sağ alt, her sayfada, mobilde de
- **404 + 500:** Palette uyumlu, "Anasayfaya dön" CTA

---

## 4. Sanity İçerik Modeli (11 schema)

**Singleton (tek doküman):**
- `siteSettings` — logo, telefon, e-posta, WhatsApp, sosyal medya, çalışma saatleri, ofis adresi (geo: lat/lng), GA4 ID, KVKK aydınlatma metni, çerez/gizlilik politikası metinleri
- `homePage` — hero başlık/altyazı, kısa hakkımda metni, CTA metni
- `aboutPage` — tanıtım, klinik deneyim[], yaklaşım, yayınlar[] (DOI), sertifikalar[]
- `onlineTherapyPage` — süreç 4 adımı[], güvenlik metni, FAQ ref'leri
- `contactPage` — intro metni, KVKK aydınlatma metni

**Çoklu (CRUD):**
- `therapyApproach` — title, slug, ozet, icerik (PortableText), kimlereUygun, sure, kaynaklar[]
- `conditionArea` — title, slug, kategori (ruhsal|diger), ozet, belirtiler[], icerik, onerilenYaklasim → therapyApproach ref
- `blogPost` — title, slug, kategoriler[], yazar, kapakResmi, ozet, icerik, seoMeta, yayinTarihi, ilgiliPostlar[]
- `blogCategory` — title, slug, renk
- `faqItem` — soru, cevap, kategori (genel|online|sure|gizlilik), siralama, anasayfadaGoster (boolean)
- `testimonial` — *opsiyonel, Gamze Hanım onay verirse anonim geri bildirimler*

**Alan tipleri:**
- `localeString` / `localeText` / `localePortableText` — TR + EN paralel alanlar
- `seoMeta` (object) — title, description, ogImage, noIndex
- `portableText` — h2/h3, link, alıntı, görsel, kaynak referansı
- `image` (hotspot + alt zorunlu)

**Studio özelleştirmeleri:**
- Singleton'lar `structure` API ile sabitlenir
- Slug TR title'dan otomatik (manuel düzenlenebilir)
- Her dokümanda preview pane (sitede gör)
- Roller: `editor` (Gamze) + `developer` (Berkant)

---

## 5. Tasarım Sistemi

### Palet (Tailwind tokens)

```js
ink:    { DEFAULT: '#213448', soft: '#2c4361' }
sea:    { DEFAULT: '#547792', soft: '#6e8ca4' }
cream:  { DEFAULT: '#F3E3D0', soft: '#faf1e3' }
sand:   { DEFAULT: '#D2C4B4', soft: '#dccfbf' }
white:  '#FFFFFF'
border: 'rgba(33,52,72,0.08)'
success:'#3F7D58', warning:'#C97B3B', error:'#A6453A'
```

### Tipografi (Montserrat — `next/font/google`, `latin-ext` subset)

| Sınıf | Boyut/Kilo | Kullanım |
|---|---|---|
| display | 56/64 • 700 | Hero (mobil 36) |
| h1 | 40/48 • 700 | Sayfa başlığı |
| h2 | 30/40 • 600 | Bölüm başlığı |
| h3 | 22/30 • 600 | Kart başlığı |
| body | 16/26 • 400 | Paragraf |
| body-sm | 14/22 • 400 | Meta, footer |
| label | 12/16 • 600 • uppercase • 0.08em | Pill, etiket |

### Spacing / Layout
- Tailwind default scale (4px base)
- Max content `max-w-6xl` (1152px), uzun metin `max-w-prose`
- Section padding: mobile `py-16`, desktop `py-24`
- Grid gap standart `gap-6`

### Radius
- `rounded-card` 16px, `rounded-hero` 24px, `rounded-pill` 9999px, `rounded-input` 12px
- Sert köşe yok

### Shadow
- `shadow-card` `0 4px 24px -8px rgba(33,52,72,0.10)`
- `shadow-hover` `0 8px 32px -8px rgba(33,52,72,0.18)`

### Component Library (`apps/web/components/`)

```
ui/        Button, Card, Pill, Accordion, Input, Textarea, Checkbox, Section, Container
layout/    Header, Footer, LocaleSwitcher, WhatsAppFab, CookieBanner
content/   PortableText, SeoHead, JsonLd
sections/  Hero, QuickLinks, AboutTeaser, Approaches, Conditions, OnlineStrip, BlogTeaser, FAQ, ContactCTA
forms/     ContactForm (react-hook-form + zod)
```

### Accessibility
- WCAG AA — palet kontrastları geçiyor (#213448 üzerine #F3E3D0 ≈ 12:1)
- Sanity'de `alt` zorunlu
- Klavye nav, focus ring (`ring-2 ring-sea`)
- Radix UI (accordion, dialog) — ARIA built-in

### Animasyon
- Scroll ile fade-up (framer-motion)
- Hover yumuşak (scale 1.02, 200ms)
- Sayfa geçişi default

---

## 6. Anasayfa Layout (Yön A — Klasik portre + yan içerik)

Yukarıdan aşağı 9 bölüm:

1. **Header** (sticky, beyaz, alt border)
2. **Hero** — krem `#F3E3D0` zemin. Sol: Gamze portresi rounded 16px. Sağ: "KLİNİK PSİKOLOG" pill, "Bilime dayalı, destekleyici terapi" başlık, Boğaziçi & Koç altyazı, [WhatsApp Randevu] + [Hakkımda] CTA'lar.
3. **3 Hızlı Link Kartı** (beyaz) — Terapi Yaklaşımları / Çalışma Alanları / Online Terapi
4. **Hakkımda Kısa** (sand `#D2C4B4`) — 2-3 cümle özet + 4 rozet (Boğaziçi, Koç, EABCT, EMDR Avrupa) + Devamı linki
5. **Terapi Yaklaşımları** (beyaz) — 3 kart (BDT, EMDR, SÇT) → detay link
6. **Çalışma Alanları** (cream `#F3E3D0`) — 2 sütun (Ruhsal Bozukluklar | Diğer Sorunlar) + "Tüm alanları gör" linki
7. **Online Terapi Şeridi** (ink `#213448`, krem metin) — alıntı + 4 adım iconlu + detay link
8. **Blog Teaser** (beyaz) — Son 3 yazı kart grid + "Tüm yazılar" linki
9. **SSS Accordion** (sand `#D2C4B4`) — 8 soru (`anasayfadaGoster=true`), FAQPage JSON-LD
10. **İletişim CTA** (ink hero) — "İlk adımı atmaya hazırsanız buradayım." + [WhatsApp] + [Form]
11. **Footer** (ink) — mini bio, hızlı linkler, iletişim, sosyal, copyright, KVKK + Çerez linkleri
12. **Sticky WhatsApp FAB** sağ altta

**Mobil:** Hero tek kolon (portre üstte), hızlı linkler alt alta, SSS tap, FAB 56px.

---

## 7. SEO & Yerel Optimizasyon (İzmir psikolog)

### Meta & Yapısal Veri
- `<title>` ve `<meta description>` her sayfada Sanity `seoMeta`'dan
- Anahtar kelime örnekleri:
  - Anasayfa: *"İzmir Klinik Psikolog | Gamze Sevin — BDT, EMDR, Online Terapi"*
  - Çalışma alanı: *"İzmir Depresyon Tedavisi | Klinik Psikolog Gamze Sevin"*
  - Yaklaşım: *"EMDR Terapisi Nedir? — İzmir/Online | Gamze Sevin"*
- JSON-LD:
  - `MedicalBusiness` (anasayfa) — ad, adres, telefon, geo (lat/lng), openingHours
  - `Person` (hakkımda) — alumniOf, knowsAbout, award
  - `FAQPage` (anasayfa SSS) — rich result
  - `BlogPosting` (blog detay)
  - `BreadcrumbList` (iç sayfalar)

### Teknik SEO
- `sitemap.xml` — `app/sitemap.ts` Sanity'den dinamik, TR + EN alternateRefs
- `robots.txt` — `app/robots.ts`; `/studio`, `/api` blocked
- `hreflang` — next-intl otomatik
- Open Graph + Twitter Cards her sayfa
- Performans:
  - RSC + ISR (revalidate 60s) — Sanity değişikliği 1 dk'da canlıda
  - `next/image` WebP/AVIF, lazy
  - Lighthouse hedef: Performance ≥ 90, SEO 100, A11y ≥ 95

### Yerel SEO (off-site, Gamze hanımın aksiyonu)
- Google Business Profile başvurusu (site link, ofis fotoğrafı, yorumlar)

---

## 8. Güvenlik

### SSL & Headers
- HTTPS — Vercel + Let's Encrypt otomatik
- `middleware.ts` veya `next.config.js`:
  - `Content-Security-Policy` allowlist: Sanity CDN, Google Fonts, GA4, WhatsApp, Maps
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` — camera/mic/geo `()` kapalı

### Form Güvenliği (`/api/contact`)
- Zod validation (server + client)
- Honeypot alanı (`bot-field` hidden input)
- hCaptcha doğrulama (server tarafta secret ile)
- Rate limit: Upstash Redis 5 istek/dakika/IP (`@upstash/ratelimit`)
- KVKK onay checkbox zorunlu
- Submit → Resend `from: noreply@<domain>`, `to: klinikpsk.gamzesevin@gmail.com`, `reply-to: <kullanıcı>`

### Sanity Studio
- Sadece yetkili e-postalar (Gamze + Berkant) — Sanity ACL
- Google SSO önerilen
- API tokens read-only public, write sadece seed scriptinde (env'de)

### Secrets (Vercel env vars)
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`
- `RESEND_API_KEY`
- `HCAPTCHA_SECRET`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_SITE_URL`
- `.env.example` repo'da, gerçek `.env.local` git'e dâhil değil

---

## 9. Analytics & Cookie Consent (KVKK)

- **GA4** + Consent Mode v2 default: `analytics_storage: 'denied'`
- **Cookie banner** (vanilla-cookieconsent, palet uyumlu stil):
  - 3 kategori: Zorunlu (her zaman), Analitik (GA4), Pazarlama (yok)
  - "Kabul Et" / "Reddet" / "Tercihleri Yönet" — Reddet eşit görünür (KVKK)
  - Onay verilince `gtag('consent', 'update', {analytics_storage: 'granted'})`
  - Tercih `localStorage`, 6 ay TTL
- Yasal sayfalar (CMS'den editlenebilir):
  - `/cerez-politikasi`, `/kvkk-aydinlatma-metni`, `/gizlilik-politikasi`
  - Footer'da link
- **Not:** Yasal metinler launch öncesi avukat onayından geçmeli (Gamze hanım sorumluluğunda).

---

## 10. İçerik Migrasyonu (`scripts/seed-content.ts`)

`site_icerikleri.md` parse edilir, Sanity'ye yazılır. EN içerikler placeholder `[EN translation pending]`. Çalışma alanları taslak içerikle `noIndex: true` başlar (Google'a zayıf sayfa gönderilmesin).

| Adım | Doküman | Kaynak |
|---|---|---|
| 1 | siteSettings | telefon, e-posta, WhatsApp, LinkedIn site_icerikleri.md'den; adres + GA4 placeholder |
| 2 | homePage | site_icerikleri.md anasayfa hero bölümü |
| 3 | 3 × therapyApproach | BDT, EMDR, SÇT — tam metin + GPT taslak "Kimlere uygundur?" (draft) |
| 4 | 17 × conditionArea | Ruhsal (9) + Diğer (8); özet + belirtiler taslak; `noIndex: true` |
| 5 | aboutPage | tanıtım, deneyim, yaklaşım, 3 yayın, 8 sertifika |
| 6 | onlineTherapyPage | süreç 4 adım, güvenlik, randevu (taslak) |
| 7 | 8 × faqItem | erturkyilmaz_sss.md'den Gamze için adapte (`anasayfadaGoster: true`) |
| 8 | contactPage | intro + KVKK aydınlatma (taslak) |
| 9 | 1 × blogPost | Açılış yazısı placeholder |
| 10 | Asset | `assets/foto2-*.webp` → Sanity asset, homePage hero'ya bağlanır |

---

## 11. Implementation Roadmap (8 faz, ~8 iş günü)

```
Faz 1 — Bootstrap (1-2 gün)
  □ Next.js 15 + Tailwind + next-intl + TypeScript init
  □ Sanity project + Studio embed (/studio)
  □ design tokens (Tailwind config)
  □ Header, Footer, RootLayout iskeleti
  □ WhatsAppFab sticky

Faz 2 — Sanity content modeli (1 gün)
  □ 11 schema (singleton + multi)
  □ Studio structure özelleştirme
  □ Roller + ACL

Faz 3 — İçerik seed scripti (0.5 gün)
  □ scripts/seed-content.ts (markdown parser)
  □ Çalıştır, Sanity'de doğrula

Faz 4 — Anasayfa (1.5 gün)
  □ 9 section component
  □ GROQ query (tek seferde anasayfa)
  □ JSON-LD FAQPage + MedicalBusiness

Faz 5 — İç sayfalar (2 gün)
  □ Hakkımda
  □ Terapi Yaklaşımları liste + 3 detay
  □ Çalışma Alanları liste + 17 dinamik detay
  □ Online Terapi
  □ Blog liste + detay + kategori
  □ İletişim (form + map + KVKK)

Faz 6 — Form, e-posta, güvenlik (0.5 gün)
  □ /api/contact (zod + Resend + hCaptcha + Upstash)
  □ Honeypot, KVKK checkbox
  □ Security headers (CSP, HSTS, ...)
  □ Cookie banner + GA4 Consent Mode

Faz 7 — i18n EN (0.5 gün)
  □ /en route, messages/en.json
  □ Sanity localeString aktifleştirme
  □ hreflang + alternateRefs sitemap

Faz 8 — Polish + launch (0.5 gün)
  □ sitemap.ts, robots.ts
  □ Lighthouse audit, görsel optimize
  □ 404/500 sayfası
  □ Vercel production deploy + domain
  □ Google Search Console + GA4 doğrulama
```

---

## 12. Kapsam Dışı (Post-Launch)

- Google Business Profile başvurusu (Gamze hanım)
- Yasal metin avukat onayı (KVKK aydınlatma, gizlilik, çerez politikası)
- Blog yazılarının yazımı (Gamze hanım, content takvimi)
- Google Ads kampanya kurulumu (opsiyonel)
- E-posta abonelik / newsletter (henüz scope dışı)
- Online ödeme entegrasyonu (henüz scope dışı)
- Testimonial sistemi (etik onay sonrası)

---

## 13. Açık Sorular / Sonra Karar Verilecek

- **Domain:** Gamze hanım hangi domaini alacak? (Öneri: `gamzesevin.com` veya `klinikpsikologgamzesevin.com`)
- **Ofis adresi:** İzmir'de tam adres — harita ve schema.org için gerekli. Launch öncesi netleşmeli.
- **GA4 Property ID:** Gamze hanımın Google hesabından oluşturulup verilecek.
- **Resend domain doğrulama:** Domain alındıktan sonra SPF/DKIM/DMARC kayıtları.
- **Google Business Profile:** Site yayına girdikten sonra başvuru.
- **Şema Terapi:** Master prompt'ta geçmişti ama Gamze'nin sertifikası yok — site'te BDT/EMDR/SÇT olarak kalıyor. Yeni eğitim alırsa CMS'den eklenebilir.
- **Sosyal medya:** LinkedIn var. Instagram açılacak mı? (Footer'da link için.)

---

**Onaylayan:** Berkant (kullanıcı), 2026-05-12
**Sonraki adım:** `superpowers:writing-plans` skill ile implementation plan'ı üretmek.
