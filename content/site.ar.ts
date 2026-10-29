// Arabic copy for youusef.com/ar. Every visible string is the Arabic the
// October 2026 editorial review approved (portfolio-copy-en-ar.json, private);
// ids, links, media files and sizes are copied from content/site.ts so the two
// objects share one shape. Official credential names, tool names and URLs stay
// in English on purpose. Maintained by hand from here on.
import type { SiteContent } from "./site";

export const siteContentAr: SiteContent = {
  name: "يوسف الشويعي",
  host: "youusef.com",
  url: "https://youusef.com",
  role: "مهندس أنظمة ذكاء اصطناعي · شارح",
  tagline: "أبني أنظمة ذكاء اصطناعي ومنتجات رقمية، من تحديد الاحتياج إلى الإطلاق والتسليم.",
  hero: {
    location: "الرياض، المملكة العربية السعودية",
    video: "/media/apple-presenting.mp4",
    videoSmall: "/media/apple-presenting-720.mp4",
    poster: "/media/apple-presenting-poster.jpg",
    videoAlt: "يوسف يقدم عرضًا في Apple Developer Academy",
    videoCaption: "Apple Developer Academy",
    credentials: [
      "aws",
      "cdmp"
    ],
    currentRole: "أعمل حاليًا مهندس أنظمة ذكاء اصطناعي في Noon Academy.",
    proof: [
      {
        text: "بنيت رسوخ، منصة دورات تعمل اليوم",
        href: "https://rusokh.com"
      },
      {
        text: "قدمت شرحًا لمواد الحاسب لأكثر من 2,000 طالب وطالبة",
        href: null
      },
      {
        text: "تقييم 4.9 من 5 من الطلاب",
        href: null
      }
    ],
    cta: {
      work: "#work",
      workLabel: "شاهد أعمالي",
      cv: "/cv/Yousef-Alshuwayi-AI-Engineer.pdf",
      cvLabel: "تحميل السيرة الذاتية",
      email: "yousefalshuwayi@gmail.com",
      emailLabel: "راسلني",
      linkedin: "https://linkedin.com/in/yousefalshuwayi",
      linkedinLabel: "لينكدإن"
    }
  },
  workSection: {
    title: "أعمال مختارة",
    lead: "منتجات وأنظمة بنيتها، مع توضيح دوري في كل منها.",
    noonCases: [
      "noon-training-development",
      "noon-mcit-genai"
    ],
    noonContext: "ضمن عملي في Noon Academy",
    details: {
      open: "عرض تفاصيل المشروع",
      close: "إخفاء تفاصيل المشروع"
    }
  },
  work: [
    {
      id: "rusokh",
      kicker: "مشروع نما حتى صار منصة متكاملة",
      meta: "تعمل على rusokh.com",
      title: "رسوخ",
      logo: "/media/rusokh-logo.png",
      logoAlt: "رسوخ",
      line: "واجهت العوائق نفسها في كل منصة دورات درّست عليها، فبنيت منصتي الخاصة. بدأت مشروعًا صغيرًا وظلّت تتحسن إصدارًا بعد إصدار حتى صارت منصة متكاملة تلبي الاحتياج: ثنائية اللغة (عربي/إنجليزي)، ومدفوعات، وبث فيديو، وهي تعمل وقيد الاستخدام اليوم.",
      preview: {
        src: "/media/rusokh-home.jpg",
        alt: "الصفحة الرئيسية لمنصة رسوخ بالعربية: عنوان شرح المقررات الجامعية بجانب بطاقة مقرر تصميم المنطق الرقمي.",
        caption: "rusokh.com، الصفحة الرئيسية بالعربية مع بطاقة مقرر.",
        width: 1440,
        height: 521
      },
      href: "https://rusokh.com",
      cta: "زيارة rusokh.com",
      action: null
    },
    {
      id: "consulting",
      kicker: "شريك مؤسس، استشارات الذكاء الاصطناعي والبرمجيات",
      meta: "من يناير 2025 إلى يوليو 2026",
      title: "GHRS Ventures",
      logo: "/media/ghrs-logo.png",
      logoAlt: "GHRS",
      line: "بنيت وأطلقت برمجيات لأعمال سعودية من خلال GHRS. وقدمت أيضًا نظامًا تعليميًا بالذكاء الاصطناعي يعتمد قرارات قائمة على قواعد ومراجعة بشرية، وقدمت استشارات لشركة شحن حول معمارية حلول الذكاء الاصطناعي لديها.",
      preview: null,
      href: "https://ghrs.sa",
      cta: "زيارة ghrs.sa",
      action: null
    },
    {
      id: "site",
      kicker: "موقع شخصي مدعوم بالذكاء الاصطناعي",
      meta: null,
      title: "هذا الموقع، بُني كمنتج",
      logo: null,
      logoAlt: null,
      line: "محادثة ذكاء اصطناعي بإجابات متدفقة، والتحقق من المدخلات، وحدود للاستخدام، وضوابط للتعليمات. مثال تفاعلي على الأنظمة التي أبنيها.",
      preview: null,
      href: null,
      cta: "اسأل عن أعمالي",
      action: "open-chat"
    }
  ],
  experience: {
    title: "الخبرة والتنفيذ",
    noonMore: {
      open: "مزيد من أعمالي في Noon Academy",
      close: "إخفاء الأعمال الإضافية",
      projects: [
        "noon-ops-hr-integration",
        "noon-ai-week"
      ]
    },
    ghrsHighlights: [
      "خفضت استدعاءات النموذج في أحد مسارات العمل من نحو 71 إلى نحو 5 باستخدام التخزين المؤقت.",
      "أبقيت احتساب مخاطر الطلاب قائمًا على قواعد، واستخدمت الذكاء الاصطناعي للنص العربي، مع اعتماد الرسائل بشريًا."
    ],
    toolkit: {
      label: "أدوات أستخدمها",
      items: "Python · TypeScript · React · Next.js · FastAPI · PostgreSQL · AWS"
    }
  },
  noon: {
    logo: "/media/noon-logo.png",
    logoAlt: "Noon Academy",
    url: "https://www.noon.edu.sa/en/",
    linkLabel: "موقع Noon Academy",
    title: "Noon Academy",
    meta: "مهندس أنظمة ذكاء اصطناعي، العمليات المركزية، منذ يوليو 2026",
    intro: "أبني في Noon Academy منصات تدريب وتجارب تعلم بالذكاء الاصطناعي وتكاملات تشغيلية، بالتعاون مع الفرق التي تستخدمها.",
    projects: [
      {
        id: "noon-training-development",
        title: "بوابة التدريب والتطوير",
        role: "بنيت المنصة وطورتها بالتعاون مع فريق التدريب.",
        status: "منشور",
        statusDetail: null,
        summary: "بنيت بوابة تدريب بالعربية تشمل مسارات المتدرب والمدرب والإدارة، ويستطيع الفريق تشغيل الدفعات المعتادة دون دعم هندسي روتيني.",
        description: "بنيت بوابة بالعربية تشمل رحلة المتدرب والعمل اليومي للمدربين وإدارة البرنامج. يستطيع المتدرب الاطلاع على جدوله، وحل التمارين، وتدوين تأملاته اليومية، ومتابعة تقدمه. ويستطيع المدرب إدارة الحضور وتشغيل الأنشطة وتسجيل التقييمات. كما يستطيع فريق التدريب إعداد الدفعات وتحديث المحتوى ومراجعة النتائج وتصدير التقارير، دون الرجوع إلى الهندسة لإجراء التغييرات المعتادة في البرنامج.",
        work: [
          "بنيت مسارات منفصلة للمتدربين والمدربين وإدارة البرنامج والاطلاع الرقابي دون تعديل.",
          "جمعت الجداول والحضور والتمارين والتأملات والتقييمات العملية في سجل تدريبي واحد.",
          "أضفت إعداد الدفعات وإدارة المحتوى وقرارات الإكمال والتحليلات والأرشفة والتصدير إلى Excel.",
          "راجعت ملاحظات فريق التدريب بعد الإطلاق، وتعاملت مع 26 نقطة خلال خمسة أيام."
        ],
        outcomes: [
          "يستطيع فريق التدريب والتطوير إطلاق الدفعات المعتادة وتشغيلها دون دعم هندسي روتيني."
        ],
        metrics: [],
        links: [
          {
            label: "زيارة trainingat.noon.edu.sa",
            href: "https://trainingat.noon.edu.sa/"
          }
        ],
        media: [
          {
            src: "/media/noon/training-trainee-day.jpg",
            alt: "متدرب يحمل هاتفًا يعرض الجدول اليومي والتقييم الذاتي بالعربية في بوابة التدريب لدى Noon Academy.",
            caption: "الجدول اليومي والتقييم الذاتي في بوابة التدريب لدى Noon Academy.",
            width: 2000,
            height: 843
          },
          {
            src: "/media/photo-portal-trainer.jpg",
            alt: "مدرب يسجل حضور دفعة تدريبية في بوابة التدريب والتطوير",
            caption: "مدرب يسجل الحضور",
            width: 1600,
            height: 1535
          },
          {
            src: "/media/photo-portal-trainee.jpg",
            alt: "متدرب يجيب عن سؤال موقفي لقياس الكفاءة عبر البوابة على هاتفه",
            caption: "متدرب يجيب عن سؤال لقياس الكفاءة",
            width: 1600,
            height: 1182
          },
          {
            src: "/media/photo-portal-hr.jpg",
            alt: "تقرير الغياب اليومي للبوابة يصل في إشعار على الهاتف",
            caption: "تقرير الغياب اليومي يصل عبر البريد الإلكتروني",
            width: 696,
            height: 700
          }
        ],
        treatment: "wide",
        flow: null
      },
      {
        id: "noon-ops-hr-integration",
        title: "تكامل بيانات التوزيع بين العمليات والموارد البشرية",
        role: "بنيت التكامل واختبرته وسلمته للفريق.",
        status: "يعمل وسُلّم للفريق",
        statusDetail: "تحديثات التوزيع اليومية تعمل، وقد سُلّم التكامل للفريق.",
        summary: "بنيت وسلمت تكاملًا يوميًا لبيانات التوزيع، يُبقي التحديثات التشغيلية متوافقة مع سجلات الموارد البشرية.",
        description: "بنيت تكاملًا يوميًا يُبقي مواقع عمل الموظفين وأقسامهم ومديريهم المباشرين في منصة الموارد البشرية متوافقة مع بيانات توزيعهم التشغيلي. نظفت البيانات المصدرية، وراجعت التعديلات المقترحة، وأجريت اختبارات تكامل لمدة ثلاثة أسابيع قبل التسليم. تبقى المسميات والقرارات الوظيفية من اختصاص الموارد البشرية، وتُحال السجلات غير المتطابقة للمراجعة.",
        work: [
          "ربطت بيانات التوزيع من نظام العمليات بواجهة API لمنصة الموارد البشرية.",
          "حددت مسؤولية كل نظام: يوفر نظام العمليات بيانات التوزيع والتبعية الإدارية، وتحتفظ منصة الموارد البشرية بالمسميات والسجلات الوظيفية.",
          "نظفت البيانات وراجعت التعديلات المقترحة وأضفت ضوابط لحالات عدم التطابق أو غياب معلومات المدير.",
          "أكملت ثلاثة أسابيع من اختبارات التكامل قبل التسليم."
        ],
        outcomes: [
          "عند بدء التشغيل، جرت مطابقة بضع مئات من السجلات دون أخطاء.",
          "تصل تغييرات التوزيع المعتادة إلى سجلات الموارد البشرية دون إعادة إدخال يدوي."
        ],
        metrics: [],
        links: [],
        media: [],
        treatment: "flow",
        flow: {
          from: {
            name: "نظام العمليات",
            items: [
              "مواقع العمل",
              "الأقسام",
              "المديرون المباشرون"
            ]
          },
          to: {
            name: "منصة الموارد البشرية",
            items: [
              "المسميات الوظيفية",
              "السجلات الوظيفية",
              "القرارات الوظيفية"
            ]
          }
        }
      },
      {
        id: "noon-mcit-genai",
        title: "MCIT × Noon: منصة لتعلم الذكاء الاصطناعي التوليدي",
        role: "بنيت المنصة كاملة وأعددت المحتوى التعليمي.",
        status: "منشور",
        statusDetail: "مسارات الطالب والمعلم والإدارة منشورة ومختبرة من البداية إلى النهاية.",
        summary: "بنيت منصة منشورة للطالب والمعلم والإدارة، وأعددت محتواها التعليمي بالعربية، لتجمع التدريب على التعليمات والتغذية الراجعة وبناء التطبيقات.",
        description: "بنيت منصة الطالب ولوحة المعلم وأدوات الإدارة، وأعددت المحتوى التعليمي بالعربية. يتعلم الطلاب كيفية عمل الذكاء الاصطناعي التوليدي، ويتدربون على كتابة تعليمات أفضل، ويبنون تطبيقًا صغيرًا يمكنهم اختباره وتطويره ومشاركته. وأعددت الأنشطة وأسئلة التحقق من المعرفة ومعايير تقييم التعليمات وإرشادات المعلم. تربط المنصة إجابات كل طالب بمحاولاته ونسخ تطبيقه، لتمكين البرنامج من متابعة عملية التعلم بدل الاكتفاء بجمع روابط المشاريع النهائية.",
        work: [
          "بنيت رحلة طالب من ثماني خطوات، تبدأ بالأسئلة الأولية وتشمل التدريب على التعليمات وبناء التطبيق وتنتهي بالتحقق من المعرفة.",
          "بنيت آلية تغذية راجعة على التعليمات مع إعادة المحاولة، وتوليد التطبيقات وطلب تحسينها وحفظ نسخها ومشاركة المشاريع.",
          "أعددت المنهج العربي والأنشطة داخل المنصة وأسئلة المعرفة وإرشادات المعلم.",
          "بنيت أدوات تحكم المعلم في الجلسة وتقارير التقدم وأدوات الإدارة وضوابط الإنفاق على الذكاء الاصطناعي.",
          "اختبرت الرحلة كاملة من البداية إلى النهاية."
        ],
        outcomes: [
          "منصة منشورة بمسارات للطلاب والمعلمين والإدارة.",
          "محتوى تعليمي ومواد صفية جاهزة للاستخدام.",
          "إجابات ومحاولات تعليمات ونسخ تطبيقات مرتبطة بكل طالب ومتاحة لتقارير البرنامج."
        ],
        metrics: [],
        links: [
          {
            label: "زيارة noonai.noon.edu.sa",
            href: "https://noonai.noon.edu.sa/"
          }
        ],
        media: [
          {
            src: "/media/noon/mcit-student-entry.jpg",
            alt: "شاشة دخول عربية لورشة الذكاء الاصطناعي لدى Noon Academy، بحقل فارغ لرمز الفصل ورسم لمعلم وطلاب.",
            caption: "شاشة دخول الطالب إلى منصة MCIT × Noon لتعلم الذكاء الاصطناعي.",
            width: 1053,
            height: 709
          },
          {
            src: "/media/noon/mcit-prompt-elements.jpg",
            alt: "نشاط عربي يقسم التعليمة إلى الهدف والسياق والقيود وصيغة المخرج.",
            caption: "نشاط يشرح الأجزاء الأربعة للتعليمة المفيدة.",
            width: 938,
            height: 708
          },
          {
            src: "/media/noon/mcit-prompt-feedback.jpg",
            alt: "شاشة تدريب على التعليمات بالعربية تعرض ملاحظات سند ومحاولتين محفوظتين.",
            caption: "التغذية الراجعة على التعليمات وسجل إعادة المحاولة.",
            width: 938,
            height: 708
          },
          {
            src: "/media/noon/mcit-project-prompt.jpg",
            alt: "نموذج عربي لفكرة المشروع يحول هدف الطالب وميزتين يطلبهما إلى تعليمة لبناء تطبيق.",
            caption: "تحويل فكرة المشروع إلى تعليمة لبناء تطبيق.",
            width: 938,
            height: 708
          },
          {
            src: "/media/noon/mcit-app-builder.jpg",
            alt: "واجهة عربية لبناء التطبيقات تعرض اختبارًا مولدًا عن الكواكب وأدوات لطلب التحسينات.",
            caption: "بناء تطبيق صغير واختباره وتطويره.",
            width: 1048,
            height: 708
          },
          {
            src: "/media/noon/mcit-version-history.jpg",
            alt: "سجل نسخ تطبيق الطالب مع أدوات لفتح النسخ المحفوظة أو استعادتها.",
            caption: "نسخ محفوظة للتطبيق مع أدوات الفتح والاستعادة.",
            width: 1048,
            height: 708
          },
          {
            src: "/media/noon/mcit-knowledge-check.jpg",
            alt: "سؤال معرفة بالعربية بعد النشاط مع تفسير الإجابة.",
            caption: "سؤال للتحقق من المعرفة مع تفسير الإجابة.",
            width: 938,
            height: 708
          },
          {
            src: "/media/noon/mcit-completion.jpg",
            alt: "شاشة إكمال بالعربية تتضمن الوصول إلى مشروع نموذجي وتنزيل الشهادات وخطوات التعلم المكتملة.",
            caption: "شاشة الإكمال مع الوصول إلى المشروع وتنزيل الشهادات.",
            width: 1484,
            height: 761
          },
          {
            src: "/media/noon/mcit-curriculum-prompt-parts.jpg",
            alt: "شريحة منهج بالعربية تشرح الهدف والسياق والقيود وصيغة المخرج.",
            caption: "من المنهج: الهدف والسياق والقيود وصيغة المخرج.",
            width: 1456,
            height: 819
          },
          {
            src: "/media/noon/mcit-curriculum-test-improve.jpg",
            alt: "شريحة منهج بالعربية تطلب اختبار الوظيفة الأساسية وتسجيل ملاحظة وشرح خطوات إعادة ظهور خطأ.",
            caption: "من المنهج: اختبار التطبيق ووصف ما يحتاج إلى إصلاح.",
            width: 1456,
            height: 819
          }
        ],
        treatment: "strip",
        flow: null
      },
      {
        id: "noon-ai-week",
        title: "أسبوع الذكاء الاصطناعي، جلسة البنين",
        role: "شاركت في إعداد الجلسة وتقديمها.",
        status: "قُدم",
        statusDetail: "قُدمت في 15 أكتوبر 2026.",
        summary: "شاركت في إعداد جلسة البنين خلال أسبوع الذكاء الاصطناعي وتقديمها؛ حضرها 525 طالبًا، وكانت 88% من إجابات استبيان نهاية الجلسة إيجابية.",
        description: "شاركت في إعداد جلسة البنين خلال أسبوع الذكاء الاصطناعي وتقديمها. استخدمنا تحديات قصيرة بالعربية حول فهم الصور وقراءة النبرة واختبار الشيفرة. جرّب الطلاب المهام بأنفسهم، وقارنوا إجاباتهم بإجابات Claude، وناقشوا أين أفادهم الذكاء الاصطناعي وأين أخطأ. كان الهدف واضحًا: استخدم الذكاء الاصطناعي، لكن تحقق من عمله واحتفظ بحكمك المستقل.",
        work: [
          "أعددت الجلسة والأنشطة التعليمية.",
          "شاركت في تقديم جلسة البنين عبر تحديات عملية ومشاركة مباشرة من الطلاب.",
          "استخدمت أمثلة تشجع الطلاب على اختبار مخرجات الذكاء الاصطناعي بدل قبولها دون تحقق."
        ],
        outcomes: [],
        metrics: [
          {
            value: "525",
            label: "طالبًا في جلسة البنين"
          },
          {
            value: "88%",
            label: "من إجابات استبيان نهاية الجلسة كانت إيجابية"
          }
        ],
        links: [],
        media: [
          {
            src: "/media/noon/ai-week-programme-artwork.png",
            alt: "ملصق عربي لبرنامج أسبوع الذكاء الاصطناعي برموز للتعلم والبرمجة والذكاء الاصطناعي الإبداعي.",
            caption: "الهوية البصرية لبرنامج أسبوع الذكاء الاصطناعي لدى Noon Academy.",
            width: 1200,
            height: 1800
          }
        ],
        treatment: "poster",
        flow: null
      }
    ],
    hackathon: {
      label: "مساهمات أخرى في Noon Academy",
      line: "شاركت في تحكيم هاكاثون صناعة الألعاب التعليمية، الذي أُقيم بالتعاون مع وزارة الاتصالات وتقنية المعلومات وبدعم من Replit.",
      photos: [
        {
          src: "/media/photo-hackathon-judging.jpg",
          alt: "يوسف يحكّم عروض المشاريع في هاكاثون صناعة الألعاب التعليمية",
          caption: "جلسات التقييم",
          width: 1600,
          height: 1066
        },
        {
          src: "/media/photo-hackathon-group.jpg",
          alt: "يوسف مع فريقي وزارة الاتصالات وتقنية المعلومات وNoon Academy في الحفل الختامي للهاكاثون",
          caption: "الحفل الختامي مع فريقي الوزارة وNoon Academy",
          width: 1600,
          height: 1066
        }
      ]
    }
  },
  yax: {
    logo: "/media/yax-logo.jpg",
    logoAlt: "YAX",
    org: "YAX, Your Amazing Xperience",
    title: "القيادة التشغيلية",
    lead: "مدير فريق في YAX لإطلاق مترو الرياض، من نوفمبر 2023 إلى مايو 2025.",
    lines: [
      "أدرت توزيع 1,500 موظف على 85 محطة لمترو الرياض خلال شهر واحد استعدادًا للإطلاق. وحصلت على ترقيتين خلال عام."
    ],
    figure: [
      {
        value: "1,500",
        label: "موظف ضمن خطة التوزيع"
      },
      {
        value: "85",
        label: "محطة"
      },
      {
        value: "1",
        unit: "شهر",
        label: "حتى الإطلاق"
      }
    ],
    bridge: "شكلت هذه التجربة طريقتي في البناء: مسؤوليات واضحة، وتنفيذ موثوق، وأنظمة تعمل تحت ضغط التشغيل الفعلي."
  },
  teaching: {
    title: "تقديم الشرح",
    lead: "شارح لمواد الحاسب منذ يناير 2022.",
    lines: [
      "قدمت شرحًا لمواد الحاسب لأكثر من 2,000 طالب وطالبة، بتقييم 4.9 من 5.",
      "شرح الأفكار المعقدة بوضوح جزء من طريقتي في البناء. يساعدني ذلك على توحيد فهم الفرق التقنية ودعم المستخدمين وجعل الأنظمة أسهل فهمًا."
    ],
    stats: [
      {
        value: "2,000",
        unit: "+",
        label: "طالب وطالبة"
      },
      {
        value: "4.9",
        unit: "/5",
        label: "تقييم الطلاب"
      },
      {
        value: "2022",
        label: "أقدم الشرح منذ"
      }
    ],
    gallery: [
      {
        src: "/media/photo-sda-presenting.jpg",
        alt: "يوسف يقدم عرضًا في معسكر SDA Agentic AI Bootcamp",
        caption: "تقديم عرض في معسكر SDA Agentic AI Bootcamp",
        width: 1600,
        height: 1200
      },
      {
        src: "/media/photo-teaching-stage.jpg",
        alt: "يوسف على المسرح أثناء تكريمه كأفضل شارح",
        caption: "تكريمي كأفضل شارح على المسرح",
        width: 892,
        height: 490
      },
      {
        src: "/media/photo-teaching-audience.jpg",
        alt: "الحضور في إحدى جلساتي",
        caption: "الحضور في إحدى جلساتي",
        width: 892,
        height: 477
      }
    ]
  },
  method: {
    title: "طريقتي في العمل",
    lead: "أعمل مباشرة مع مستخدمي النظام، ثم أبني الحل حول سير العمل الذي يحتاجون إليه.",
    steps: [
      {
        name: "أفهم السياق",
        line: "أفهم سير العمل مع الأشخاص المسؤولين عنه."
      },
      {
        name: "أحدد النطاق",
        line: "أحدد المنتج والقيود ومعايير النجاح."
      },
      {
        name: "أبني وأطلق",
        line: "أبني المنتج وأختبره وأطوره من خلال الاستخدام الفعلي."
      },
      {
        name: "أسلّم للفريق",
        line: "أزوّد الفريق بالأدوات والإرشادات اللازمة لتشغيله."
      }
    ],
    closer: "أعمل مباشرة مع الفريق داخل سياق المشكلة، من تحديد النطاق إلى التسليم؛ وهو أسلوب يُعرف بـ forward deployed."
  },
  credentials: {
    title: "المؤهلات",
    lead: "مؤهلات تدعم عملي في الذكاء الاصطناعي والبيانات وتطوير المنتجات.",
    primaryHeading: "الشهادات المهنية",
    programmesHeading: "برامج مختارة",
    educationHeading: "التعليم",
    education: "بكالوريوس علوم الحاسب، جامعة الإمام محمد بن سعود الإسلامية (IMSIU)",
    verifyLabel: "عرض الشهادة",
    list: [
      {
        id: "aws",
        category: "certification",
        img: "/media/cert-aws-ai-business-strategist.png",
        name: "AWS Certified AI Business Strategist",
        designation: "Early Adopter",
        issuer: "Amazon Web Services Training and Certification",
        year: null,
        href: "https://www.credly.com/badges/2d8a0251-c153-4109-9181-cce562481783",
        note: null,
        description: "شهادة تركز على الجانب التجاري، وتشمل قرارات الاستثمار في الذكاء الاصطناعي وبناء حالات الأعمال والحوكمة المسؤولة والانتقال من التجربة الأولية إلى التشغيل الفعلي."
      },
      {
        id: "cdmp",
        category: "certification",
        img: "/media/cert-cdmp-badge.png",
        name: "Certified Data Management Professional (CDMP)",
        designation: "Associate",
        issuer: "DAMA",
        year: "2026",
        href: "https://eu.credential.net/1c13a3e1-5f2d-4840-a944-afc2a1c5f720",
        note: null,
        description: null
      },
      {
        id: "apple",
        category: "programme",
        img: "/media/cert-apple.jpg",
        name: "Apple AI Program",
        designation: null,
        issuer: "Apple Developer Academy وTuwaiq",
        year: "2025",
        href: null,
        note: "اختير ضمن 66 مشاركًا",
        description: null
      },
      {
        id: "sda",
        category: "programme",
        img: "/media/cert-sda.png",
        name: "Agentic AI Bootcamp",
        designation: null,
        issuer: "SDA Academy",
        year: "2026",
        href: null,
        note: "قبول انتقائي",
        description: null
      },
      {
        id: "mckinsey",
        category: "programme",
        img: "/media/cert-mckinsey-badge.png",
        name: "McKinsey Forward",
        designation: null,
        issuer: "McKinsey & Company",
        year: "2026",
        href: "https://www.credly.com/badges/f8b63388-6689-450b-a8e3-a55681465472",
        note: null,
        description: null
      }
    ],
    alsoLead: "شهادات أخرى:",
    also: [
      "مقدمة في الذكاء الاصطناعي، KAUST Academy، 2026",
      "منحة علوم البيانات وتعلم الآلة، KAUST Academy، 2025",
      "دورات في البيانات، جامعة ميشيغان، 2025",
      "Vibe Coding، SDAIA، 2026"
    ]
  },
  footer: {
    title: "لنتحدث.",
    line: "للتواصل حول هندسة الذكاء الاصطناعي أو تطوير المنتجات أو مناقشة ما بنيته، راسلني مباشرة."
  },
  contact: {
    email: "yousefalshuwayi@gmail.com",
    linkedin: "https://linkedin.com/in/yousefalshuwayi",
    github: "https://github.com/Yousef4Git",
    cv: "/cv/Yousef-Alshuwayi-AI-Engineer.pdf"
  },
  chat: {
    openLabel: "اسأل مساعدي الذكي",
    closeLabel: "إغلاق المحادثة",
    panelLabel: "مساعد الموقع بالذكاء الاصطناعي",
    title: "اسأل عن أعمالي",
    subtitle: "إجابات مولدة بالذكاء الاصطناعي عن أعمالي.",
    closeButton: "إغلاق المحادثة",
    starters: [
      "ما الذي بنيته؟",
      "ما رسوخ؟",
      "كيف تنتقل بالمشروع من الفكرة إلى التسليم؟"
    ],
    you: "أنت",
    assistant: "المساعد الذكي",
    thinking: "جارٍ التفكير…",
    inputLabel: "اسأل عن أعمالي",
    placeholder: "اسأل عن أعمالي…",
    send: "إرسال",
    errorLine: "المساعد الذكي غير متاح الآن. يمكنك التواصل معي مباشرة:",
    errorLinks: {
      email: "البريد الإلكتروني",
      linkedin: "لينكدإن",
      github: "GitHub"
    }
  },
  chapters: [
    "hero",
    "work",
    "experience",
    "teaching",
    "method",
    "credentials"
  ],
  locale: "ar",
  dir: "rtl",
  meta: {
    title: "يوسف الشويعي · مهندس أنظمة ذكاء اصطناعي وشارح",
    description: "مهندس أنظمة ذكاء اصطناعي وشارح. تعرّف على منصاتي وأدواتي التشغيلية ومنصة رسوخ وخبرتي في تقديم الشرح وعملي في Noon Academy.",
    ogLocale: "ar_SA",
    og: {
      alt: "يوسف الشويعي · مهندس أنظمة ذكاء اصطناعي وشارح",
      line2: "مهندس أنظمة ذكاء اصطناعي · شارح",
      line3: "أنظمة ذكاء اصطناعي. منتجات رقمية. تنفيذ عملي.",
      line4: "youusef.com · الرياض، المملكة العربية السعودية"
    }
  },
  ui: {
    nav: {
      links: [
        {
          href: "#work",
          label: "الأعمال"
        },
        {
          href: "#experience",
          label: "الخبرة"
        },
        {
          href: "#teaching",
          label: "تقديم الشرح"
        },
        {
          href: "#credentials",
          label: "المؤهلات"
        },
        {
          href: "#contact",
          label: "التواصل"
        }
      ],
      skip: "انتقل إلى الأعمال المختارة",
      backToTop: "يوسف الشويعي، العودة إلى أعلى الصفحة",
      sections: "أقسام الموقع",
      switch: {
        label: "English",
        href: "/",
        lang: "en"
      }
    },
    caseLabels: {
      work: "ما نفذته",
      outcomes: "حالة العمل"
    },
    flow: {
      provides: "يوفر",
      keeps: "تحتفظ بـ",
      aria: "يوفر {from} بيانات التوزيع، وتحتفظ {to} بالسجلات الوظيفية"
    },
    strip: {
      label: "واجهات {title}",
      prev: "الواجهات السابقة",
      next: "الواجهات التالية",
      note: "{n} واجهات، من صفحة الدخول إلى مسودة المنهج."
    },
    footerLinks: {
      linkedin: "لينكدإن",
      github: "GitHub",
      cv: "تحميل السيرة الذاتية",
      signoff: "يوسف الشويعي، الرياض، المملكة العربية السعودية"
    },
    join: {
      comma: "، ",
      semicolon: "؛ "
    }
  }
};
