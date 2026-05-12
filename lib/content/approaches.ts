import type { TherapyApproach } from './types'

export const therapyApproaches: TherapyApproach[] = [
  {
    slug: 'bdt',
    title: {
      tr: 'Bilişsel Davranışçı Terapi (BDT)',
      en: 'Cognitive Behavioral Therapy (CBT)',
    },
    ozet: {
      tr: 'Düşünce, duygu ve davranışlar arasındaki ilişkileri hedef alan, bilimsel temelli kısa süreli psikoterapi.',
      en: 'A structured, evidence-based short-term therapy that targets the links between thoughts, emotions and behaviour.',
    },
    body: {
      tr: [
        'Bilişsel Davranışçı Terapi (BDT), kişilerin düşünce, duygu ve davranışları arasındaki ilişkileri hedef alarak psikolojik sorunlarda iyileşme sağlamayı amaçlayan bilimsel temelli bir psikoterapi yaklaşımıdır.',
        'BDT, akılcı ve gerçeğe uygun olmayan inançların, uyum bozucu davranış ve duyguların psikoloji biliminin ilkelerini kullanarak değiştirilmesini sağlar. Bu şekilde mevcut işlevsiz düşünce ve davranışlardan kaynaklanan psikolojik sıkıntının azaltılmasını, eşlik eden duyguların çözümlenmesini ve uyumsal düşünce ve davranışların geliştirilmesini hedefler.',
        'Seans yapısı, ev ödevleri ve davranışsal denemelerle değişimi seans aralarına da taşıyan, ölçüm odaklı bir terapi yaklaşımıdır.',
      ],
      en: [
        'Cognitive Behavioral Therapy (CBT) is an evidence-based psychotherapy approach that targets the relationships between thoughts, emotions and behaviour to support recovery from psychological difficulties.',
        'CBT uses psychological science to help change unrealistic beliefs and maladaptive behaviours and emotions. It aims to reduce distress caused by dysfunctional thought and behaviour patterns, resolve accompanying emotional states, and develop more adaptive responses.',
        'It is a structured, measurement-focused therapy that uses homework and behavioural experiments to extend change beyond the consulting room.',
      ],
    },
    kimlereUygun: {
      tr: [
        'Depresyon ve depresif bozukluklar',
        'Yaygın anksiyete, sosyal anksiyete, panik bozukluk',
        'Obsesif kompulsif bozukluk (OKB)',
        'Özgül fobiler, sağlık kaygısı',
        'İlişki ve iletişim sorunları',
      ],
      en: [
        'Depression and depressive disorders',
        'Generalised anxiety, social anxiety, panic disorder',
        'Obsessive-compulsive disorder (OCD)',
        'Specific phobias and health anxiety',
        'Relationship and communication problems',
      ],
    },
    sure: {
      tr: 'Ortalama 8–16 seans, haftada 1 görüşme',
      en: 'Typically 8–16 sessions, once a week',
    },
    kaynaklar: {
      tr: [
        'EABCT (European Association for Behavioural and Cognitive Therapies)',
        'NICE (UK) — depresyon, anksiyete bozuklukları rehberleri',
      ],
      en: [
        'EABCT (European Association for Behavioural and Cognitive Therapies)',
        'NICE (UK) — depression and anxiety disorder guidelines',
      ],
    },
  },
  {
    slug: 'sorun-cozme-terapisi',
    title: {
      tr: 'Sorun Çözme Terapisi (SÇT)',
      en: 'Problem-Solving Therapy (PST)',
    },
    ozet: {
      tr: 'Günlük yaşam güçlüklerine karşı işlevsel başa çıkma becerileri kazandıran, kısa süreli terapi.',
      en: 'A short-term therapy that teaches functional coping skills for everyday life challenges.',
    },
    body: {
      tr: [
        'Sorun Çözme Terapisi, bireylerin günlük yaşamda karşılaştıkları güçlükler veya problemli durumlarla başa çıkarken yaşadıkları zorlanmalardan kaynaklanan ruhsal sıkıntıları ele almak için kullanılan bir terapi yaklaşımıdır.',
        'Temel amacı, kişilere sorunlarla karşılaştıklarında nasıl bir tutum geliştireceklerini öğretmek ve problemleri çözmek için izleyebilecekleri yöntem ve stratejileri kazandırmaktır.',
        'Bu sayede SÇT, hem mevcut sorunların yol açtığı psikolojik sıkıntıların giderilmesine yardımcı olur hem de ileride oluşabilecek ruhsal problemlerin önlenmesini amaçlar.',
      ],
      en: [
        'Problem-Solving Therapy (PST) is used to address psychological distress that stems from the difficulties people face when coping with everyday or significant life problems.',
        'Its core aim is to teach individuals how to take a constructive stance toward problems, and to equip them with concrete strategies and steps they can follow to solve them.',
        'PST therefore both relieves the distress caused by current problems and helps prevent future mental health difficulties from taking hold.',
      ],
    },
    kimlereUygun: {
      tr: [
        'Karar verme güçlüğü ve sürekli erteleme',
        'Stres yönetimi sorunları',
        'İş yaşamına ilişkin sıkıntılar',
        'Yetersiz sorun çözme becerileri',
        'Geçiş dönemleri (taşınma, evlilik, iş değişimi)',
      ],
      en: [
        'Decision-making difficulties and chronic procrastination',
        'Stress-management challenges',
        'Work-related distress',
        'Limited problem-solving skills',
        'Life transitions (relocation, marriage, career change)',
      ],
    },
    sure: {
      tr: 'Ortalama 6–12 seans, haftada 1 görüşme',
      en: 'Typically 6–12 sessions, once a week',
    },
  },
  {
    slug: 'emdr',
    title: {
      tr: 'EMDR (Göz Hareketleriyle Duyarsızlaştırma ve Yeniden İşleme)',
      en: 'EMDR (Eye Movement Desensitization and Reprocessing)',
    },
    ozet: {
      tr: 'Travmatik ve olumsuz anıların işlenmesine dayanan, bilimsel temelli psikoterapi yöntemi.',
      en: 'An evidence-based psychotherapy method that helps process traumatic and adverse memories.',
    },
    body: {
      tr: [
        'EMDR, psikolojik travma ve diğer olumsuz yaşam deneyimlerinin psikolojik sonuçlarını tedavi etmekte kullanılan, travmatik ve olumsuz anıların işlenmesine dayanan bilimsel temelli bir psikoterapi yöntemidir.',
        'Kişiler, olumsuz ve travmatik anıları hatırlarken göz hareketleri veya çift yönlü uyarımlar eşliğinde bu anıları yeniden işler. Bu sayede psikolojik sıkıntıların temelini oluşturan geçmiş olayların yarattığı duygusal yükün azalmasını ve mevcut rahatsız edici durumların çözümlenmesini kolaylaştırır.',
        'Standartlaştırılmış 8 fazlı bir protokole sahiptir ve etkinliği uluslararası rehberler tarafından kabul görmüştür.',
      ],
      en: [
        'EMDR is an evidence-based psychotherapy used to treat the psychological consequences of trauma and other adverse life experiences, based on the reprocessing of distressing memories.',
        'While clients recall negative or traumatic events, eye movements or other bilateral stimulation are used to help the memory be re-processed. This reduces the emotional weight that past events carry into the present and supports relief from current distressing reactions.',
        'EMDR follows a standardised eight-phase protocol and its effectiveness is recognised by international clinical guidelines.',
      ],
    },
    kimlereUygun: {
      tr: [
        'Travma sonrası stres bozukluğu (TSSB)',
        'Tek olaylı veya kronik travma yaşantıları',
        'Kayıp ve yas',
        'Performans kaygısı',
        'Olumsuz yaşam olaylarının güncel etkileri',
      ],
      en: [
        'Post-traumatic stress disorder (PTSD)',
        'Single-event or chronic trauma experiences',
        'Grief and loss',
        'Performance anxiety',
        'Lingering impact of adverse life events',
      ],
    },
    sure: {
      tr: 'Vakaya göre 6–20+ seans, haftada 1 görüşme',
      en: 'Typically 6–20+ sessions depending on the case, once a week',
    },
    kaynaklar: {
      tr: [
        'WHO travma rehberi',
        'EMDR Europe Association',
        'NICE — TSSB rehberi',
      ],
      en: [
        'WHO trauma guidelines',
        'EMDR Europe Association',
        'NICE — PTSD guidelines',
      ],
    },
  },
]

export const approachBySlug = (slug: string) =>
  therapyApproaches.find((a) => a.slug === slug)
