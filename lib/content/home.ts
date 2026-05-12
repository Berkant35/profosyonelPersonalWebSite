import type { HomeContent } from './types'

export const homeContent: HomeContent = {
  hero: {
    eyebrow: {
      tr: 'Klinik Psikolog & Psikoterapist',
      en: 'Clinical Psychologist & Psychotherapist',
    },
    title: {
      tr: 'Bilime dayalı, destekleyici psikoterapi',
      en: 'Evidence-based, supportive psychotherapy',
    },
    subtitle: {
      tr: 'Boğaziçi Üniversitesi Psikoloji yüksek onur derecesi ve Koç Üniversitesi Klinik Psikoloji yüksek lisans. Bilişsel Davranışçı Terapi, EMDR ve Sorun Çözme Terapisi ile yetişkin, çift, çocuk ve ergenlere destek.',
      en: 'Boğaziçi University Psychology (high honors) and Koç University Clinical Psychology (MA). Working with adults, couples, children and adolescents using CBT, EMDR and Problem-Solving Therapy.',
    },
    ctaPrimaryLabel: {
      tr: 'WhatsApp ile Randevu',
      en: 'WhatsApp Appointment',
    },
    ctaSecondaryLabel: {
      tr: 'Hakkımda',
      en: 'About Me',
    },
  },
  aboutTeaser: {
    body: {
      tr: 'Empatiyi bilimsel yaklaşımlarla bütünleştirerek danışanların duygusal güçlüklerle başa çıkmalarına, yaşam hedeflerine yönelmelerine ve psikolojik dayanıklılıklarını artırmalarına destek oluyorum.',
      en: 'I integrate empathy with evidence-based methods to help clients cope with emotional difficulties, move toward their life goals, and build psychological resilience.',
    },
    badges: {
      tr: ['Boğaziçi Üniversitesi', 'Koç Üniversitesi', 'EABCT Akredite', 'EMDR Avrupa Akredite'],
      en: ['Boğaziçi University', 'Koç University', 'EABCT Accredited', 'EMDR Europe Accredited'],
    },
  },
  onlineStrip: {
    quote: {
      tr: 'Araştırmalar, online seansların yüz yüze seanslar kadar etkili olduğunu göstermektedir.',
      en: 'Research shows that online sessions are as effective as in-person sessions.',
    },
    steps: [
      {
        title: { tr: 'İlk iletişim', en: 'First contact' },
        desc: {
          tr: 'WhatsApp veya e-posta ile ilk görüşmenizi planlıyoruz.',
          en: 'We schedule the first meeting via WhatsApp or email.',
        },
      },
      {
        title: { tr: 'Değerlendirme', en: 'Assessment' },
        desc: {
          tr: 'İlk seansta birlikte değerlendirme yapıyor, hedeflerinizi netleştiriyoruz.',
          en: 'In the first session we map out the issue together and clarify goals.',
        },
      },
      {
        title: { tr: 'Süreç', en: 'Process' },
        desc: {
          tr: 'Ortalama 45–50 dk seanslarla, haftalık ritimde çalışıyoruz.',
          en: '45–50 minute sessions, typically on a weekly cadence.',
        },
      },
      {
        title: { tr: 'Kapanış', en: 'Closure' },
        desc: {
          tr: 'Seans aralıkları kademeli açılır ve kontrol seansları başlar.',
          en: 'Session intervals gradually widen and follow-ups begin.',
        },
      },
    ],
  },
}
