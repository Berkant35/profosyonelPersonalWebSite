import type { ConditionArea } from './types'

export const conditionAreas: ConditionArea[] = [
  // Ruhsal bozukluklar
  {
    slug: 'depresyon',
    category: 'ruhsal',
    title: { tr: 'Depresyon ve Depresif Bozukluklar', en: 'Depression and Depressive Disorders' },
    ozet: {
      tr: 'Sürekli üzüntü, ilgi kaybı ve enerji düşüklüğüyle giden, günlük işlevselliği bozan ruhsal bozukluk.',
      en: 'A mood disorder marked by persistent sadness, loss of interest and low energy that disrupts daily functioning.',
    },
    belirtiler: {
      tr: [
        'İki haftadan uzun süren çökkün ruh hali',
        'Eskiden zevk alınan etkinliklerden uzaklaşma',
        'Uyku ve iştah değişiklikleri',
        'Değersizlik ve umutsuzluk düşünceleri',
        'Konsantrasyon güçlüğü ve yorgunluk',
      ],
      en: [
        'Persistent low mood lasting more than two weeks',
        'Loss of interest in previously enjoyable activities',
        'Changes in sleep and appetite',
        'Feelings of worthlessness and hopelessness',
        'Difficulty concentrating and fatigue',
      ],
    },
    body: {
      tr: [
        'Depresyon, dünya genelinde en yaygın ruhsal bozukluklardan biridir ve etkili biçimde tedavi edilebilir.',
        'Terapi sürecinde işlevsiz düşünce kalıpları, davranışsal kaçınma ve duygu düzenleme güçlükleri ele alınır; günlük yaşamda anlamlı aktivasyon planlanır.',
      ],
      en: [
        'Depression is one of the most common mental health conditions worldwide and is highly treatable.',
        'Therapy addresses dysfunctional thinking patterns, behavioural avoidance, and emotion regulation, while building meaningful activation into daily life.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'yaygin-anksiyete',
    category: 'ruhsal',
    title: { tr: 'Yaygın Anksiyete Bozukluğu', en: 'Generalised Anxiety Disorder' },
    ozet: {
      tr: 'Günlük yaşamın birçok alanına yayılan, kontrol edilmesi güç sürekli kaygı.',
      en: 'Excessive, hard-to-control worry that spreads across many areas of daily life.',
    },
    belirtiler: {
      tr: [
        'Sürekli endişe ve "kötü bir şey olacak" hissi',
        'Kas gerginliği ve uyku güçlükleri',
        'Konsantrasyon kaybı',
        'Yorgunluk ve sinirlilik',
      ],
      en: [
        'Persistent worry and a sense of impending bad outcomes',
        'Muscle tension and sleep difficulties',
        'Reduced concentration',
        'Fatigue and irritability',
      ],
    },
    body: {
      tr: [
        'Yaygın anksiyete bozukluğunda kaygı belirli bir konuya değil, hayatın pek çok alanına yönelir.',
        'Terapide endişe döngüsü, belirsizliğe tahammülsüzlük ve aşırı kontrol ihtiyacı üzerine çalışılır; gevşeme ve maruz bırakma yöntemleri kullanılır.',
      ],
      en: [
        'In GAD, worry is diffuse rather than tied to a single topic and spans multiple areas of life.',
        'Therapy targets the worry cycle, intolerance of uncertainty and the need for control, using relaxation and graded exposure techniques.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'sosyal-anksiyete',
    category: 'ruhsal',
    title: { tr: 'Sosyal Anksiyete Bozukluğu (Sosyal Fobi)', en: 'Social Anxiety Disorder' },
    ozet: {
      tr: 'Sosyal ortamlarda değerlendirilmeye karşı yoğun korku ve kaçınma.',
      en: 'Marked fear of being judged in social settings, leading to avoidance.',
    },
    belirtiler: {
      tr: [
        'Topluluk önünde konuşma veya tanışma korkusu',
        'Yüz kızarması, terleme, titreme',
        'Sosyal ortamlardan kaçınma',
        'Kendini sürekli izleme/değerlendirme',
      ],
      en: [
        'Fear of speaking in public or meeting new people',
        'Blushing, sweating, trembling',
        'Avoidance of social settings',
        'Constant self-monitoring and evaluation',
      ],
    },
    body: {
      tr: [
        'Sosyal anksiyete bozukluğu utangaçlıktan çok daha yoğundur ve günlük işlevselliği belirgin biçimde sınırlandırır.',
        'Terapide olumsuz öz-değerlendirmeler, güvenlik davranışları ve sosyal kaçınmalar ele alınır; aşamalı maruz bırakma uygulanır.',
      ],
      en: [
        'Social anxiety disorder goes well beyond shyness and noticeably limits daily functioning.',
        'Therapy addresses negative self-evaluations, safety behaviours and social avoidance through gradual exposure work.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'panik-bozukluk',
    category: 'ruhsal',
    title: { tr: 'Panik Bozukluk, Panik Atak ve Agorafobi', en: 'Panic Disorder and Agoraphobia' },
    ozet: {
      tr: 'Beklenmedik panik atakları ve atak yaşamaktan duyulan korkuyla şekillenen kısır döngü.',
      en: 'Unexpected panic attacks and the cycle of fear of having further attacks.',
    },
    belirtiler: {
      tr: [
        'Çarpıntı, nefes darlığı, baş dönmesi',
        'Kontrolünü kaybetme veya ölme korkusu',
        '"Atak gelecek" beklentisi',
        'Belli yer veya durumlardan kaçınma',
      ],
      en: [
        'Palpitations, shortness of breath, dizziness',
        'Fear of losing control or dying',
        'Anticipatory anxiety about future attacks',
        'Avoidance of specific places or situations',
      ],
    },
    body: {
      tr: [
        'Panik bozukluk, beden duyumlarının yanlış yorumlanması ve kaçınma davranışlarıyla beslenir.',
        'Terapide nefes kontrolü, kognitif yeniden yapılandırma ve interoceptive (bedensel) maruz bırakma uygulanır.',
      ],
      en: [
        'Panic disorder is maintained by catastrophic misinterpretation of bodily sensations and by avoidance.',
        'Therapy uses breathing regulation, cognitive restructuring and interoceptive exposure to break the cycle.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'okb',
    category: 'ruhsal',
    title: { tr: 'Obsesif Kompulsif Bozukluk (OKB)', en: 'Obsessive-Compulsive Disorder (OCD)' },
    ozet: {
      tr: 'Tekrarlayan, istem dışı düşünceler (obsesyonlar) ve onları yatıştırmaya yönelik davranışlar (kompulsiyonlar).',
      en: 'Recurrent, intrusive thoughts (obsessions) and the behaviours used to neutralise them (compulsions).',
    },
    belirtiler: {
      tr: [
        'Bulaş, zarar verme, simetri gibi obsesyonlar',
        'Yıkama, kontrol etme, sayma davranışları',
        'Davranışı yapmama durumunda yoğun kaygı',
        'Günde saatler süren ritüel zaman kaybı',
      ],
      en: [
        'Obsessions around contamination, harm, symmetry, etc.',
        'Washing, checking, counting compulsions',
        'Intense anxiety if rituals are not performed',
        'Hours per day lost to rituals',
      ],
    },
    body: {
      tr: [
        'OKB için altın standart tedavi maruz bırakma ve tepki önleme (ERP) içeren BDT\'dir.',
        'Süreçte obsesyonlara karşı yeni bir tutum geliştirilir; kompulsiyon zinciri kademeli olarak kırılır.',
      ],
      en: [
        'The gold-standard treatment for OCD is CBT with Exposure and Response Prevention (ERP).',
        'Therapy helps build a new stance toward obsessions and gradually breaks the compulsion chain.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'tssb',
    category: 'ruhsal',
    title: { tr: 'Travma Sonrası Stres Bozukluğu (TSSB)', en: 'Post-Traumatic Stress Disorder (PTSD)' },
    ozet: {
      tr: 'Bir travma sonrası gelişen, yeniden yaşantılama, kaçınma ve aşırı uyarılmayla giden tablo.',
      en: 'A condition following trauma, marked by re-experiencing, avoidance and hyper-arousal.',
    },
    belirtiler: {
      tr: [
        'Geri dönüşler (flashback) ve kabuslar',
        'Olayı hatırlatan uyaranlardan kaçınma',
        'Diken üstünde olma, kolay irkilme',
        'Olumsuz duygu ve düşüncelerde artış',
      ],
      en: [
        'Flashbacks and nightmares',
        'Avoidance of trauma reminders',
        'Hyper-vigilance and exaggerated startle',
        'Increase in negative cognitions and mood',
      ],
    },
    body: {
      tr: [
        'TSSB tedavisinde EMDR ve travma odaklı BDT en güçlü kanıt düzeyine sahip yaklaşımlardır.',
        'Süreç güvenli bir terapötik ilişki içinde, kademeli olarak ilerler.',
      ],
      en: [
        'EMDR and trauma-focused CBT are the best-evidenced approaches for PTSD.',
        'Work proceeds gradually within a safe therapeutic relationship.',
      ],
    },
    onerilenYaklasim: 'emdr',
  },
  {
    slug: 'ozgul-fobiler',
    category: 'ruhsal',
    title: { tr: 'Özgül Fobiler', en: 'Specific Phobias' },
    ozet: {
      tr: 'Belirli nesne, durum veya canlılara karşı yoğun ve mantıksız korku.',
      en: 'Intense and disproportionate fear of specific objects, situations or animals.',
    },
    belirtiler: {
      tr: [
        'Korkulan uyaranla karşılaşınca panik tepkisi',
        'Aşırı kaçınma davranışı',
        'Kaçınmanın günlük yaşamı sınırlaması',
      ],
      en: [
        'Panic-level reactions when facing the feared stimulus',
        'Marked avoidance behaviour',
        'Avoidance restricts daily life',
      ],
    },
    body: {
      tr: [
        'Özgül fobiler için en etkili yöntem aşamalı maruz bırakmadır.',
        'Süreç çoğunlukla kısadır ve seans sayısı sınırlıdır.',
      ],
      en: [
        'Graded exposure is the most effective approach for specific phobias.',
        'Treatment is usually brief and time-limited.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'saglik-kaygisi',
    category: 'ruhsal',
    title: { tr: 'Sağlık Kaygısı', en: 'Health Anxiety' },
    ozet: {
      tr: 'Hastalık kapma ya da ciddi bir hastalığa sahip olma konusunda sürekli endişe.',
      en: 'Persistent worry about having or developing a serious illness.',
    },
    belirtiler: {
      tr: [
        'Beden duyumlarını sürekli izleme',
        'Tekrar tekrar doktor başvuruları veya tam tersi kaçınma',
        'İnternette belirti araştırma',
      ],
      en: [
        'Constant monitoring of bodily sensations',
        'Repeated doctor visits or, conversely, avoidance of care',
        'Excessive online symptom searches',
      ],
    },
    body: {
      tr: [
        'Sağlık kaygısı, bedensel uyaranların felaketleştirilmesi ve güvence arama davranışlarıyla beslenir.',
        'Terapide bu döngü kırılır ve gerçekçi sağlık davranışları geliştirilir.',
      ],
      en: [
        'Health anxiety is maintained by catastrophic interpretation of bodily cues and reassurance-seeking.',
        'Therapy interrupts this cycle and builds realistic, sustainable health behaviours.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'performans-kaygisi',
    category: 'ruhsal',
    title: { tr: 'Performans Kaygısı', en: 'Performance Anxiety' },
    ozet: {
      tr: 'Sunum, sınav, sahne veya iş ortamında değerlendirilmeye karşı yoğun kaygı.',
      en: 'Marked anxiety around being evaluated in presentations, exams, on stage or at work.',
    },
    belirtiler: {
      tr: [
        'Bedensel belirtiler (titreme, terleme, ses titremesi)',
        'Yoğun olumsuz öz-değerlendirme',
        'Performansı sürekli ileriye erteleme',
      ],
      en: [
        'Physical symptoms (trembling, sweating, voice quaver)',
        'Intense negative self-evaluation',
        'Repeatedly postponing the performance',
      ],
    },
    body: {
      tr: [
        'Performans kaygısında BDT ve gerektiğinde EMDR ile geçmiş olumsuz performans deneyimleri ele alınır.',
        'Süreçte zihinsel hazırlık, davranışsal denemeler ve nefes kontrolü çalışılır.',
      ],
      en: [
        'CBT — and EMDR where appropriate — addresses prior negative performance experiences.',
        'Treatment also builds mental preparation, behavioural rehearsal and breathing regulation.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  // Diğer sorunlar
  {
    slug: 'iliski-problemleri',
    category: 'diger',
    title: { tr: 'İlişki Problemleri', en: 'Relationship Problems' },
    ozet: {
      tr: 'Romantik, ailevi veya arkadaşlık ilişkilerinde tekrarlayan çatışma ve uzaklaşma örüntüleri.',
      en: 'Recurring patterns of conflict and distance in romantic, family or peer relationships.',
    },
    belirtiler: {
      tr: [
        'Sürekli tekrar eden tartışmalar',
        'Yakınlık kuramama veya tam tersi yapışıklık',
        'Güven sorunları',
        'Ayrılık sonrası uyum güçlüğü',
      ],
      en: [
        'Recurrent arguments on the same themes',
        'Difficulty with closeness — or, conversely, enmeshment',
        'Trust issues',
        'Difficulty adjusting after a breakup',
      ],
    },
    body: {
      tr: [
        'İlişki problemleri bireysel veya çift olarak çalışılabilir.',
        'Süreçte iletişim, sınır, çatışma yönetimi ve duygu düzenleme becerileri ele alınır.',
      ],
      en: [
        'Relationship difficulties can be addressed in individual or couple work.',
        'Sessions build communication, boundaries, conflict resolution and emotion regulation.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'iletisim-sorunlari',
    category: 'diger',
    title: { tr: 'İletişim Sorunları', en: 'Communication Problems' },
    ozet: {
      tr: 'Duygu ve ihtiyaçları sağlıklı biçimde ifade etmekte yaşanan güçlükler.',
      en: 'Difficulties expressing emotions and needs in healthy ways.',
    },
    belirtiler: {
      tr: ['"Yanlış anlaşılıyorum" duygusu', 'Çatışmadan kaçınma veya tam tersi öfkeli iletişim', 'Pasif/agresif örüntüler'],
      en: ['Feeling "misunderstood"', 'Avoidance of conflict — or angry communication', 'Passive/aggressive patterns'],
    },
    body: {
      tr: [
        'İletişim sorunlarında atılganlık (assertiveness), aktif dinleme ve duyguları sözel ifade becerisi çalışılır.',
        'Süreç çoğunlukla sorun çözme terapisi ve BDT tekniklerini birleştirir.',
      ],
      en: [
        'Treatment builds assertiveness, active listening and verbalisation of emotions.',
        'Work typically combines problem-solving therapy with CBT skills.',
      ],
    },
    onerilenYaklasim: 'sorun-cozme-terapisi',
  },
  {
    slug: 'davranissal-sorunlar',
    category: 'diger',
    title: { tr: 'Davranışsal Sorunlar', en: 'Behavioural Problems' },
    ozet: {
      tr: 'İşlevselliği bozan veya çevreyle çatışmaya yol açan tekrarlayan davranış kalıpları.',
      en: 'Repetitive behavioural patterns that impair functioning or generate conflict.',
    },
    belirtiler: {
      tr: ['Erteleme', 'Aşırı internet/oyun kullanımı', 'Sağlıksız beslenme/uyku alışkanlıkları'],
      en: ['Procrastination', 'Excessive internet/gaming use', 'Unhealthy eating or sleep habits'],
    },
    body: {
      tr: [
        'Davranışsal sorunlarda işlev analizi yapılır; tetikleyiciler, davranışlar ve sonuçlar haritalanır.',
        'Davranışsal denemelerle yeni alışkanlıklar kademeli olarak kurulur.',
      ],
      en: [
        'Treatment starts with a functional analysis of triggers, behaviours and consequences.',
        'New habits are built gradually through behavioural experiments.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'sorun-cozme-becerileri',
    category: 'diger',
    title: { tr: 'Yetersiz Sorun Çözme Becerileri', en: 'Limited Problem-Solving Skills' },
    ozet: {
      tr: 'Karar verme ve zorluklarla baş etme süreçlerinde tıkanıklık.',
      en: 'Getting stuck in decision-making and coping with difficulties.',
    },
    belirtiler: {
      tr: ['Sürekli erteleme', 'Aşırı düşünme (rumination)', 'Belirsizliğe tahammülsüzlük'],
      en: ['Persistent procrastination', 'Rumination and over-thinking', 'Intolerance of uncertainty'],
    },
    body: {
      tr: [
        'Sorun Çözme Terapisi (SÇT) tam bu alana yönelik geliştirilmiştir.',
        'Süreçte yapılandırılmış 5 adımlı bir model adım adım çalışılır.',
      ],
      en: [
        'Problem-Solving Therapy (PST) was developed for exactly this area.',
        'Treatment walks through a structured five-step model.',
      ],
    },
    onerilenYaklasim: 'sorun-cozme-terapisi',
  },
  {
    slug: 'degersizlik-yetersizlik',
    category: 'diger',
    title: { tr: 'Değersizlik / Yetersizlik Hisleri', en: 'Feelings of Worthlessness / Inadequacy' },
    ozet: {
      tr: 'Kendine yönelik olumsuz inançlar ve kalıcı yetersizlik hissi.',
      en: 'Persistent negative beliefs about the self and a lingering sense of inadequacy.',
    },
    belirtiler: {
      tr: ['Aşırı öz-eleştiri', 'Başarıyı içselleştirememe', 'Onay arama davranışı'],
      en: ['Excessive self-criticism', 'Inability to internalise success', 'Constant approval-seeking'],
    },
    body: {
      tr: [
        'Bu alanda erken dönem yaşantılar ve şema-düzeyi inançlar üzerinde çalışılır.',
        'BDT teknikleri ile öz-değer ve gerçekçi öz-değerlendirme kademeli olarak yeniden inşa edilir.',
      ],
      en: [
        'Therapy explores early experiences and schema-level beliefs.',
        'CBT techniques gradually rebuild self-worth and realistic self-evaluation.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'ofke-sorunlari',
    category: 'diger',
    title: { tr: 'Öfke Sorunları', en: 'Anger Problems' },
    ozet: {
      tr: 'Kontrolü zor öfke patlamaları ve sonrasında yaşanan pişmanlık.',
      en: 'Hard-to-control anger outbursts and subsequent regret.',
    },
    belirtiler: {
      tr: ['Hızlı tetiklenme', 'Bedensel gerilim', 'İlişkilerde kopukluklar', 'Kontrolünü kaybetme korkusu'],
      en: ['Quick triggering', 'Physical tension', 'Disconnections in relationships', 'Fear of losing control'],
    },
    body: {
      tr: [
        'Öfke yönetiminde tetikleyiciler, otomatik düşünceler ve bedensel belirtiler eş zamanlı çalışılır.',
        'Maruz bırakma, durulma ve atılgan iletişim teknikleri kullanılır.',
      ],
      en: [
        'Anger management addresses triggers, automatic thoughts and physiological cues together.',
        'Treatment combines exposure, calming techniques and assertive communication training.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'is-yasami-sorunlari',
    category: 'diger',
    title: { tr: 'İş Yaşamına İlişkin Sorunlar', en: 'Work-Related Problems' },
    ozet: {
      tr: 'Tükenmişlik, kariyer geçişleri, iş yerinde çatışma ve sınır sorunları.',
      en: 'Burnout, career transitions, workplace conflict and boundary issues.',
    },
    belirtiler: {
      tr: ['İşten soğuma ve tükenmişlik', 'Kariyer kararsızlığı', 'Yöneticiyle/ekiple çatışma'],
      en: ['Disengagement and burnout', 'Career indecision', 'Conflicts with manager or team'],
    },
    body: {
      tr: [
        'İş kaynaklı sorunlarda sorun çözme becerileri, sınır koyma ve duygu düzenleme çalışılır.',
        'Gerekirse kariyer geçişine yönelik yapılandırılmış bir karar süreci yürütülür.',
      ],
      en: [
        'Therapy builds problem-solving skills, boundary-setting and emotion regulation.',
        'Where relevant, a structured decision process is used for career transitions.',
      ],
    },
    onerilenYaklasim: 'sorun-cozme-terapisi',
  },
  {
    slug: 'sinav-kaygisi',
    category: 'diger',
    title: { tr: 'Sınav Kaygısı', en: 'Exam Anxiety' },
    ozet: {
      tr: 'Sınav öncesi ve sırasında performansı düşüren yoğun kaygı.',
      en: 'High anxiety before and during exams that lowers performance.',
    },
    belirtiler: {
      tr: ['Sınav öncesi uykusuzluk', 'Çalışırken odaklanamama', 'Sınav anında zihinsel boşalma'],
      en: ['Sleep difficulties before exams', 'Difficulty focusing while studying', 'Mental blanking during the exam'],
    },
    body: {
      tr: [
        'BDT temelli çalışmada hem çalışma alışkanlıkları hem sınav anına özgü kaygı yönetilir.',
        'Gevşeme ve maruz bırakma teknikleri uygulanır.',
      ],
      en: [
        'CBT addresses both study habits and exam-specific anxiety.',
        'Relaxation and exposure techniques are central to the work.',
      ],
    },
    onerilenYaklasim: 'bdt',
  },
  {
    slug: 'kayip-ve-yas',
    category: 'diger',
    title: { tr: 'Kayıp ve Yas', en: 'Loss and Grief' },
    ozet: {
      tr: 'Sevilen birinin kaybı veya büyük yaşam kayıpları sonrası süregelen yas süreci.',
      en: 'Ongoing grieving after the loss of a loved one or a major life loss.',
    },
    belirtiler: {
      tr: ['Yoğun özlem ve hüzün', 'Suçluluk ve "yapmalıydım" düşünceleri', 'Günlük işlevsellikte düşüş'],
      en: ['Intense longing and sadness', 'Guilt and "I should have…" thoughts', 'Decline in daily functioning'],
    },
    body: {
      tr: [
        'Yas süreci kişiye özgüdür; takvimlere sığmaz.',
        'Terapide kayıpla ilişkili düşünce, duygu ve davranışlar yargısız bir alanda ele alınır; gerektiğinde EMDR\'den yararlanılır.',
      ],
      en: [
        'Grief is unique to each person and does not fit a fixed timeline.',
        'Therapy provides a non-judgemental space for the thoughts, feelings and behaviours connected to the loss, drawing on EMDR when appropriate.',
      ],
    },
    onerilenYaklasim: 'emdr',
  },
]

export const conditionBySlug = (slug: string) =>
  conditionAreas.find((c) => c.slug === slug)

export const conditionsByCategory = (cat: 'ruhsal' | 'diger') =>
  conditionAreas.filter((c) => c.category === cat)
