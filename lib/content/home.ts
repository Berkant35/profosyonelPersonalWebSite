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
      tr: [
        [
          { text: 'Boğaziçi Üniversitesi Psikoloji', bold: true },
          { text: ' bölümünden yüksek onur derecesi ile mezun oldum. ' },
          { text: 'Koç Üniversitesi Klinik Psikoloji', bold: true },
          { text: ' yüksek lisans eğitimimi tamamlayarak duygusal ve davranışsal sorunların araştırılması, değerlendirilmesi, önlenmesi ve iyileştirilmesi konularında uzmanlaştım.' },
        ],
        [
          { text: 'Bilişsel Davranışçı Terapi, Sorun Çözme Terapisi', bold: true },
          { text: ' ve ' },
          { text: 'EMDR', bold: true },
          { text: ' ekollerinde uzmanlaşarak ' },
          { text: 'yetişkinlere, çiftlere ve ergenlere', bold: true },
          { text: ' psikolojik destek sağlıyorum.' },
        ],
      ],
      en: [
        [
          { text: 'I graduated from ' },
          { text: 'Boğaziçi University Psychology', bold: true },
          { text: ' with high honors. I completed my ' },
          { text: 'Koç University Clinical Psychology MA', bold: true },
          { text: ', specialising in the research, assessment, prevention and treatment of emotional and behavioural difficulties.' },
        ],
        [
          { text: 'Using ' },
          { text: 'Cognitive Behavioural Therapy, Problem-Solving Therapy', bold: true },
          { text: ' and ' },
          { text: 'EMDR', bold: true },
          { text: ', I provide psychological support to ' },
          { text: 'adults, couples and adolescents', bold: true },
          { text: '.' },
        ],
      ],
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
