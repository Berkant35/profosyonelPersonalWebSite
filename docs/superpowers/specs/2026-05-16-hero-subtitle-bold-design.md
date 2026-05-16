# Hero Subtitle — Bold Render Tasarımı

**Tarih:** 2026-05-16
**İlgili ClickUp task:** #86exmczcc — "Home Page - Açıklama"
**Kapsam:** Anasayfa hero bölümünün alt başlık (subtitle) metninde belirli anahtar ifadeleri bold göstermek.

> **Revision (2026-05-17):** Initial implementation used the short subtitle text. Revised to use the full two-paragraph description from the ClickUp task, with paragraph-aware rendering and an EN translation that preserves the same bold emphases.

## Amaç

ClickUp task'ında Gamze Sevin'in talebi: "Açıklamadaki metini bold yapılan kelimeler de dikkate alarak" yeni metinle değiştirmek. İnceleme sonucu:

- Yeni metin (TR ve EN) zaten `lib/content/home.ts:14-15` içindeki `hero.subtitle` alanında doğru şekilde mevcut.
- Eksik olan tek şey: eski açıklamada bold gösterilen anahtar ifadelerin yeni metinde de bold render edilmesi.

Bu spec yalnızca **bold styling** kapsamını ele alır; metin içerikleri değişmez.

## Hangi ifadeler bold olacak

**TR:**
- `Boğaziçi Üniversitesi Psikoloji`
- `Koç Üniversitesi Klinik Psikoloji`
- `Bilişsel Davranışçı Terapi, Sorun Çözme Terapisi`
- `EMDR`
- `yetişkinlere, çiftlere ve ergenlere`

**EN:**
- `Boğaziçi University Psychology`
- `Koç University Clinical Psychology MA`
- `Cognitive Behavioural Therapy, Problem-Solving Therapy`
- `EMDR`
- `adults, couples and adolescents`

## Mimari

Proje, içerik (data) ile sunum (component) arasında zaten net bir ayrım kullanıyor: `lib/content/*` tipli içerik verir, `components/sections/*` render eder. Bu ayrımı koruyacak şekilde subtitle'ı düz `string` yerine **parça dizisi** olarak modelleyeceğiz.

### 1. Tip katmanı — `lib/content/types.ts`

İki tip eklenir:

```ts
export type RichTextPart = { text: string; bold?: boolean }
export type LocaleRichTextParagraphs = Record<Locale, RichTextPart[][]>
```

`HomeContent.hero.subtitle` tipi `LocaleRichTextParagraphs` olur — her locale için paragraf listesi, her paragraf da `RichTextPart` listesi. Bu, tek düzey `RichTextPart[]` yerine iki boyutlu (paragraflar × parçalar) bir modeldir.

### 2. İçerik katmanı — `lib/content/home.ts`

`hero.subtitle.tr` ve `hero.subtitle.en` her biri iki elemanlı `RichTextPart[][]` haline gelir. TR P1: Boğaziçi ve Koç Üniversitesi eğitimini anlatan cümle. TR P2: BDT/Sorun Çözme/EMDR ve hedef kitle. EN P1 ve EN P2 aynı yapının İngilizce çevirisidir. Bold ifadeler `{ text: '…', bold: true }`, düz metin `{ text: '…' }` olarak parçalanır.

### 3. Sunum katmanı — `components/sections/Hero.tsx`

Subtitle artık tek `<p>` yerine `<div className="mt-5 max-w-xl space-y-3 text-base leading-relaxed text-ink/80 lg:text-lg">` wrapper içinde iki `<p>` olarak render edilir. Dış döngü paragrafları, iç döngü her paragrafın parçalarını gezilir:

- `part.bold === true` → `<strong className="font-semibold text-ink">{part.text}</strong>`
- aksi halde → `<span>{part.text}</span>`

`space-y-3` iki paragraf arasında görsel boşluk sağlar. Diğer Hero stilleri değişmez.

## Etki alanı

- **Değişen dosyalar:** `lib/content/types.ts`, `lib/content/home.ts`, `components/sections/Hero.tsx`
- **Etkilenen kullanım:** Sadece anasayfa Hero bileşeni. `hero.subtitle` alanı başka bir component'te kullanılmıyor (grep ile doğrulandı).
- **Dokunulmayanlar:** `messages/tr.json` ve `messages/en.json` içindeki `heroSubtitle` anahtarları hiçbir yerde kullanılmıyor (ölü kod); bu spec kapsamında değiştirilmez. Ayrıca `site_icerikleri.md` ve `raw/*` dosyaları kaynak/referans arşividir, canlı siteye yansımaz.

## Erişilebilirlik & SEO

- `<strong>` semantic vurgu için doğru elementtir (sadece görsel vurgu için `<b>` değil).
- Metin içeriği değişmediği için mevcut SEO metadata (`generateMetadata` içindeki description) ve yapılandırılmış veri (`businessJsonLd`) etkilenmez.

## Test planı

1. **Tip kontrolü:** `npx tsc --noEmit` — yeni `LocaleRichText` tipinin tüketici tarafında (Hero.tsx) doğru kullanıldığını doğrular.
2. **Build:** `npm run build` — Next.js static build başarıyla geçer.
3. **Görsel doğrulama (dev server):** `npm run dev` → `http://localhost:3000/tr` ve `/en` adreslerinde hero subtitle altındaki bold ifadelerin doğru şekilde vurgulandığını gözle teyit.
4. **Karakter farkı kontrolü:** Bold parçaları birleştirildiğinde TR ve EN metinleri mevcut (commit'teki) string'lerle birebir aynı olmalıdır.

## YAGNI sınırları (bu spec'in DIŞINDA bırakılanlar)

- Markdown veya HTML parser eklenmiyor.
- Diğer içerik alanlarının (`approach`, `aboutTeaser.body` vs.) rich-text'e dönüştürülmesi.
- `messages/*.json` ölü `heroSubtitle` anahtarlarının silinmesi (ayrı cleanup işi).
- Bold weight veya rengin proje genelinde tema değişkeni olarak çıkarılması.
