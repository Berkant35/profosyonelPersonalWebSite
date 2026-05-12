import type { OnlinePage } from './types'

export const onlineContent: OnlinePage = {
  intro: {
    tr: [
      'Online terapi, Türkiye\'nin her yerinden ve yurt dışından danışanlarla görüntülü güvenli seanslar yapabilmenizi sağlar.',
      'Araştırmalar, online seansların yüz yüze seanslar kadar etkili olduğunu göstermektedir. Ekran paylaşımı ile materyaller paylaşılabildiğinden, yüz yüze seansa kıyasla anlamlı bir kayıp yaşanmaz.',
      'Online seanslar Türkçe ve İngilizce sürdürülebilir.',
    ],
    en: [
      'Online therapy makes secure video sessions possible from anywhere in Turkey and abroad.',
      'Research shows that online sessions can be as effective as in-person sessions. With screen sharing for materials, there is no meaningful loss compared to working in the room.',
      'Online sessions are available in Turkish and English.',
    ],
  },
  steps: [
    {
      title: { tr: 'İlk iletişim', en: 'First contact' },
      desc: {
        tr: 'WhatsApp veya e-posta ile iletişime geçiyoruz, kısaca durumu konuşuyor ve ilk seans için uygun bir zaman planlıyoruz.',
        en: 'We get in touch via WhatsApp or email, briefly discuss your situation, and schedule a suitable time for the first session.',
      },
    },
    {
      title: { tr: 'Değerlendirme seansı', en: 'Assessment session' },
      desc: {
        tr: 'İlk seansta birlikte değerlendirme yapıyoruz, hedeflerinizi netleştiriyor ve nasıl çalışacağımızı planlıyoruz.',
        en: 'In the first session we assess together, clarify your goals, and plan how we will work.',
      },
    },
    {
      title: { tr: 'Süreç', en: 'Process' },
      desc: {
        tr: '45–50 dakikalık seanslarla genelde haftada bir görüşüyoruz. Gerekirse seans aralıkları sık tutulur.',
        en: '45–50 minute sessions, usually weekly. We may meet more often early on if needed.',
      },
    },
    {
      title: { tr: 'Kontrol ve kapanış', en: 'Follow-up & closure' },
      desc: {
        tr: 'Hedeflere yaklaştıkça seans aralıkları kademeli olarak açılır, kontrol seansları başlar.',
        en: 'As you reach your goals, session intervals widen and follow-up sessions begin.',
      },
    },
  ],
  security: {
    tr: [
      'Online seanslar uçtan uca güvenli görüntülü görüşme platformlarında yapılır.',
      'Görüşmeler kayıt altına alınmaz. Etik gizlilik ilkesi yüz yüze seanslarla birebir aynı şekilde geçerlidir.',
      'Seans öncesi sessiz, yalnız olabileceğiniz ve kesintisiz bir alan hazırlamanız önerilir.',
    ],
    en: [
      'Online sessions are held on end-to-end secure video platforms.',
      'Sessions are not recorded. Professional confidentiality applies in exactly the same way as in-person work.',
      'Before the session, it helps to set up a quiet, private and uninterrupted space.',
    ],
  },
}
