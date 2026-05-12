import type { FAQItem } from './types'

export const faqItems: FAQItem[] = [
  {
    id: 'terapist-secimi',
    homepage: true,
    question: {
      tr: 'Terapist seçerken nelere dikkat etmeliyim?',
      en: 'What should I look for when choosing a therapist?',
    },
    answer: {
      tr: [
        'Yaşadığınız soruna hangi terapi ekolünün iyi geldiğine bakmaya özen göstermelisiniz. Bazı psikologlar birden fazla ekolün ilk modüllerini alıp o yaklaşımı yaptıklarını söyleyebilir; oysa birçok ekolün uzmanlık süreci 4–5 yıllık eğitim ve süpervizyon gerektirir.',
        'Sizin sorununuza iyi gelecek terapi ekolünde deneyimli, eğitimlerini hangi kurumlardan aldığı şeffaf olan bir psikoloğu tercih etmek yararlı olacaktır.',
      ],
      en: [
        'Look for whether the therapist is experienced in the approach that fits your concern. Some practitioners only complete the first modules of several approaches; in reality most evidence-based modalities require a 4–5 year specialisation with supervision.',
        'It is helpful to choose a therapist whose training (and the institutions it came from) is transparent and who is genuinely experienced in the relevant modality.',
      ],
    },
  },
  {
    id: 'ekol-secimi',
    homepage: true,
    question: {
      tr: 'Hangi terapi ekolünü seçmeliyim?',
      en: 'Which therapy modality should I choose?',
    },
    answer: {
      tr: [
        'Bu sorunun kısa bir yanıtı olmamakla birlikte, Amerika ve Avrupa sağlık kuruluşlarının belirli sorunlar için birinci sırada önerdiği ekoller vardır. Birçok kaygı ve depresif tabloda BDT ilk sırada yer alır; travmada ise EMDR ve travma odaklı BDT önerilir.',
        'Terapistiniz, sizin için daha uygun olabilecek bir başka ekol varsa bunu size iletmekle yükümlüdür.',
      ],
      en: [
        'There is no one-size-fits-all answer, but international health bodies recommend specific modalities as first-line for specific concerns. CBT is typically first-line for many anxiety and depressive presentations; EMDR and trauma-focused CBT are recommended for trauma.',
        'A responsible therapist should let you know if a different modality might suit you better.',
      ],
    },
  },
  {
    id: 'ilk-seans',
    homepage: true,
    question: {
      tr: 'İlk seansta beni neler bekliyor?',
      en: 'What happens in the first session?',
    },
    answer: {
      tr: [
        'İlk seans bir değerlendirme seansıdır ve sizi danışmanlık almaya getiren konuları anlamak içindir. Genelde soru–cevap şeklinde ilerler. Sorunun ortaya çıkmasında rol oynayabilecek çocukluk yaşantılarına dair sorular da gelebilir.',
      ],
      en: [
        'The first session is an assessment session designed to understand what brought you to therapy. It usually flows as a Q&A, and may include questions about childhood experiences that may be relevant to the presenting concern.',
      ],
    },
  },
  {
    id: 'ilk-seansa-hazirlik',
    homepage: true,
    question: {
      tr: 'İlk seansa nasıl hazırlanabilirim?',
      en: 'How can I prepare for the first session?',
    },
    answer: {
      tr: [
        'Sizi terapiye getiren sorunu, ne zamandır yaşadığınızı, hangi durumlarda ortaya çıktığını (kendiliğinden mi, bir olay sonrası mı), günlük hayatınızı nasıl etkilediğini (fiziksel ve psikolojik belirtiler) ve sürecin sonunda ulaşmak istediğiniz noktayı (amacınızı) düşünerek gelmek faydalı olacaktır.',
      ],
      en: [
        'It helps to come having thought about: the issue itself, how long you\'ve had it, in which situations it appears (spontaneously or after a specific event), how it affects your daily life (physical and psychological symptoms), and what you would like to gain by the end of the process.',
      ],
    },
  },
  {
    id: 'seans-suresi',
    homepage: true,
    question: {
      tr: 'Seanslar ne kadar sürüyor?',
      en: 'How long are sessions?',
    },
    answer: {
      tr: ['Bireysel danışmanlık 45–50 dakika, çift danışmanlığı 55 dakika sürmektedir.'],
      en: ['Individual sessions are 45–50 minutes; couple sessions are 55 minutes.'],
    },
  },
  {
    id: 'surec-suresi',
    homepage: true,
    question: {
      tr: 'Tüm süreç ne kadar sürüyor?',
      en: 'How long does the whole process take?',
    },
    answer: {
      tr: [
        'Bu soruya kesin bir yanıt vermek mümkün değildir. Bununla birlikte BDT ve Sorun Çözme Terapisi kısa süreli ekollerdir ve birçok sorun için ortalama 8–12 haftalık bir süreç yeterli olabilir.',
      ],
      en: [
        'There is no fixed answer. That said, CBT and Problem-Solving Therapy are short-term modalities, and many issues can be addressed within an average of 8–12 weeks.',
      ],
    },
  },
  {
    id: 'seans-sikligi',
    homepage: true,
    question: {
      tr: 'Ne sıklıkla seanslara girmeliyim?',
      en: 'How often should I attend sessions?',
    },
    answer: {
      tr: [
        'Birçok sorun için haftada bir görüşme yeterli olabilir; bazı durumlarda başlangıçta haftada iki görüşme gerekebilir. Araştırmalar kısa sürede daha sık seansın daha yararlı olduğunu göstermektedir. Süreç ilerledikçe seans aralıkları yavaş yavaş açılır ve kontrol seansları başlar.',
      ],
      en: [
        'For most concerns once-a-week is sufficient; some cases benefit from twice-weekly sessions early on. Research suggests denser frequency early in the work is more effective. Intervals widen gradually toward the end as follow-ups begin.',
      ],
    },
  },
  {
    id: 'online-etkinlik',
    homepage: true,
    question: {
      tr: 'Online seanslar yüz yüze kadar etkili midir?',
      en: 'Are online sessions as effective as in-person?',
    },
    answer: {
      tr: [
        'Araştırmalar, online seansların da yüz yüze seanslar kadar etkili olduğunu göstermektedir. Gerektiğinde ekran paylaşımıyla materyaller iletilebildiği için büyük bir kayıp yaşanmaz. Danışanın temel teknoloji rahatlığı süreçte önemlidir.',
      ],
      en: [
        'Research shows online sessions can be as effective as in-person work. Screen sharing covers most material-based needs. Basic comfort with the technology helps the process run smoothly.',
      ],
    },
  },
  {
    id: 'gizlilik',
    homepage: false,
    question: { tr: 'Görüşmeler gizli midir?', en: 'Are sessions confidential?' },
    answer: {
      tr: [
        'Bütün görüşmeler etik kurallar ve gizlilik ilkesi çerçevesinde gizli tutulur. Hiçbir bilgi, siz açıkça izin vermediğiniz sürece — en yakınlarınız da dahil — üçüncü kişilerle paylaşılmaz. Yasal istisnalar (kendine veya başkasına ciddi zarar verme riski gibi) etik kurallarda tanımlıdır ve süreç başlangıcında sizinle paylaşılır.',
      ],
      en: [
        'All sessions are confidential within the ethical framework of the profession. No information is shared with third parties — including those closest to you — unless you explicitly consent. Legal exceptions (such as serious risk of harm to self or others) are defined by professional ethics and shared with you at the start.',
      ],
    },
  },
  {
    id: 'odevler',
    homepage: false,
    question: {
      tr: 'Seanslarda verilen ödevler ne işe yarar?',
      en: 'What is the purpose of homework between sessions?',
    },
    answer: {
      tr: [
        'Seanslarda konuşulan konuların hayata geçirilmesi, ilerleme kaydedilmesi için önemlidir. Seanstan seansa gelip ödev yapmamak, bir dili öğrenirken ödev yapmamaya benzer. Bu ödevler genellikle seansta konuşulan konularla ilgili bazı davranışsal denemeler veya bilgi toplama üzerine olur ve terapiden daha hızlı fayda görmenizi sağlar.',
      ],
      en: [
        'Practising between sessions is what turns therapy into change. Skipping homework is like trying to learn a language without practising. Tasks are usually small behavioural experiments or information-gathering based on the session, and they speed up progress significantly.',
      ],
    },
  },
]

export const homepageFaqs = faqItems.filter((f) => f.homepage)
