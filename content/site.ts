// Every word the site renders lives here. Facts about the Noon work come from
// the October 2026 handoff pack; the freelance, Shaguf and YAX descriptions are
// the ones Yousef supplied verbatim. Keep the voice plain: no em dashes, no
// comparisons with other people, one sentence per claim and no sentence whose
// only job is to qualify the one before it.

const CV = "/cv/Yousef-Alshuwayi-AI-Engineer.pdf";
const EMAIL = "yousefalshuwayi@gmail.com";

export type Media = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Metric = { value: string; label: string };

export type Flow = {
  from: { name: string; items: readonly string[] };
  to: { name: string; items: readonly string[] };
};

export type NoonProject = {
  id: string;
  title: string;
  role: string;
  status: string;
  statusDetail: string | null;
  summary: string;
  description: string;
  work: readonly string[];
  outcomes: readonly string[];
  metrics: readonly Metric[];
  media: readonly Media[];
  // Public sites, where one exists. Internal tools stay unlinked.
  links: readonly { label: string; href: string }[];
  // How the block lays its media out. "wide" runs the first image across the
  // row and any others in a grid below; "flow" draws a figure from `flow`;
  // "poster" sets the metrics beside one tall image; "none" renders text
  // only, never an empty frame.
  treatment: "wide" | "flow" | "strip" | "poster" | "none";
  flow: Flow | null;
};

export type Credential = {
  img: string;
  name: string;
  designation: string | null;
  issuer: string;
  year: string | null;
  href: string | null;
  note: string | null;
  description: string | null;
};

export type WorkRow = {
  id: string;
  kicker: string;
  meta: string | null;
  title: string | null;
  logo: string | null;
  logoAlt: string | null;
  line: string;
  href: string | null;
  cta: string;
  action: "open-chat" | null;
};

const noonProjects: readonly NoonProject[] = [
  {
    id: "noon-training-development",
    title: "Training & Development Portal",
    role: "Built the platform and improved it with the training team.",
    status: "Live",
    statusDetail: "Live since July 2026.",
    summary: "Built Noon's training portal so the team can run facilitator training from one place.",
    description:
      "I built a portal in Arabic covering the trainee journey, trainers' daily work and programme administration. Trainees can see their agenda, complete exercises, reflect on each day and follow their progress. Trainers can manage attendance, run activities and record assessments. The training team can set up cohorts, update content, review results and export reports without needing engineering for normal programme changes.",
    work: [
      "Built separate workflows for trainees, trainers, programme administrators and read-only oversight.",
      "Brought agendas, attendance, exercises, reflections and practical assessments into one training record.",
      "Added cohort setup, content management, completion decisions, analytics, archives and Excel exports.",
      "Worked through the training team's post-launch feedback and addressed 26 points in five days.",
    ],
    outcomes: [
      "The Training & Development team can launch and run standard cohorts without routine engineering support.",
    ],
    metrics: [],
    links: [{ label: "Visit trainingat.noon.edu.sa", href: "https://trainingat.noon.edu.sa/" }],
    media: [
      {
        src: "/media/noon/training-trainee-day.jpg",
        alt: "A trainee holds a phone showing the Arabic daily agenda and self-assessment in Noon's training portal.",
        caption: "Daily agenda and self-assessment in Noon's training portal.",
        width: 2000,
        height: 843,
      },
      {
        src: "/media/photo-portal-trainer.jpg",
        alt: "A trainer marking attendance for a workshop batch in the Training and Development Portal",
        caption: "A trainer taking attendance",
        width: 1600,
        height: 1535,
      },
      {
        src: "/media/photo-portal-trainee.jpg",
        alt: "A trainee answering a competency scenario question in the portal on a phone",
        caption: "A trainee answering a competency question",
        width: 1600,
        height: 1182,
      },
      {
        src: "/media/photo-portal-hr.jpg",
        alt: "The portal's daily absence report arriving as a phone notification",
        caption: "The daily absence report arriving by email",
        width: 696,
        height: 700,
      },
    ],
    treatment: "wide",
    flow: null,
  },
  {
    id: "noon-citadel-zenhr",
    title: "Citadel to ZenHR integration",
    role: "Built, tested and handed over the integration.",
    status: "Live and handed over",
    statusDetail: "Daily placement updates are live and the integration has been handed over.",
    summary:
      "Connected Noon's staffing system to ZenHR so school placements and reporting lines do not have to be entered twice.",
    description:
      "I built a daily integration that keeps employees' work locations, sections and direct managers aligned with their placements in Citadel. I also cleaned up employee data, checked the proposed changes and tested the connection before handing it over. Job titles and employment decisions stay with HR, and missing matches are held for review.",
    work: [
      "Connected Citadel placement data to the ZenHR API.",
      "Set clear ownership: Citadel provides placement and reporting data; ZenHR retains job titles and employment records.",
      "Cleaned up data, reviewed proposed changes and added safeguards for missing matches and unavailable manager information.",
      "Completed three weeks of integration testing before handover.",
    ],
    outcomes: [
      "The go-live run corrected 40 employee records out of 218 reviewed, with no errors.",
      "Routine placement changes flow into HR records without being entered again by hand.",
    ],
    metrics: [],
    links: [],
    media: [],
    treatment: "flow",
    flow: {
      from: { name: "Citadel", items: ["Work locations", "Sections", "Direct managers"] },
      to: { name: "ZenHR", items: ["Job titles", "Employment records", "Employment decisions"] },
    },
  },
  {
    id: "noon-mcit-genai",
    title: "MCIT × Noon: generative AI learning platform",
    role: "Built the full platform and created the learning content.",
    status: "Platform live, classroom pilot next",
    statusDetail: "Student, teacher and admin flows are live and tested end to end; the classroom pilot is next.",
    summary:
      "Built the MCIT × Noon student AI platform and its learning content, from the first activity to a working app.",
    description:
      "I built the student platform, teacher board and admin tools, and created the Arabic learning content. Students learn how generative AI works, practise writing better prompts, and build a small app they can test, improve and share. I also wrote the activities, knowledge checks, prompt-feedback rubric and teacher guidance. The platform links each student's answers, prompt attempts and app versions, so the programme can follow the learning process rather than collect final project links alone.",
    work: [
      "Built an eight-step student journey from initial questions through prompt practice, app creation and the final knowledge check.",
      "Built prompt feedback with retries, app generation, improvement requests, saved versions and project sharing.",
      "Created the Arabic curriculum, on-screen activities, knowledge questions and teacher guidance.",
      "Built teacher session controls, progress reporting, admin tools and AI-spending safeguards.",
      "Tested the full flow end to end and prepared it for the classroom pilot.",
    ],
    outcomes: [
      "A live platform with student, teacher and admin workflows.",
      "Learning content and classroom materials ready for the pilot.",
      "Student-linked answers, prompt attempts and app versions available for programme reporting.",
    ],
    metrics: [],
    links: [{ label: "Visit noonai.noon.edu.sa", href: "https://noonai.noon.edu.sa/" }],
    media: [
      {
        src: "/media/noon/mcit-student-entry.jpg",
        alt: "Arabic entry screen for Noon's student AI workshop, with a blank class-code field and a teacher-and-students illustration.",
        caption: "Student entry screen for the MCIT × Noon AI learning platform.",
        width: 1053,
        height: 709,
      },
      {
        src: "/media/noon/mcit-prompt-elements.jpg",
        alt: "Arabic learning activity breaking a prompt into goal, context, constraints and output format.",
        caption: "A learning activity explaining the four parts of a useful prompt.",
        width: 938,
        height: 708,
      },
      {
        src: "/media/noon/mcit-prompt-feedback.jpg",
        alt: "Arabic prompt-practice screen showing Sanad feedback and two saved attempts.",
        caption: "Prompt feedback and retry history.",
        width: 938,
        height: 708,
      },
      {
        src: "/media/noon/mcit-project-prompt.jpg",
        alt: "Arabic project-idea form that turns a student's goal and two requested features into an app-building prompt.",
        caption: "Turning a project idea into an app-building prompt.",
        width: 938,
        height: 708,
      },
      {
        src: "/media/noon/mcit-app-builder.jpg",
        alt: "Arabic student app builder with a generated planets quiz and controls for requesting improvements.",
        caption: "Building, testing and improving a small app.",
        width: 1048,
        height: 708,
      },
      {
        src: "/media/noon/mcit-version-history.jpg",
        alt: "Student app-version history with controls to open or restore saved versions.",
        caption: "Saved app versions with open and restore controls.",
        width: 1048,
        height: 708,
      },
      {
        src: "/media/noon/mcit-knowledge-check.jpg",
        alt: "Arabic post-activity knowledge question with an answer explanation.",
        caption: "A knowledge check with an answer explanation.",
        width: 938,
        height: 708,
      },
      {
        src: "/media/noon/mcit-completion.jpg",
        alt: "Arabic completion screen with access to a sample project, certificate downloads and the completed learning steps.",
        caption: "Completion screen with project access and certificate downloads.",
        width: 1484,
        height: 761,
      },
      {
        src: "/media/noon/mcit-curriculum-prompt-parts.jpg",
        alt: "Arabic curriculum slide explaining goal, context, constraints and output format.",
        caption: "Curriculum: goal, context, constraints and output format.",
        width: 1456,
        height: 819,
      },
      {
        src: "/media/noon/mcit-curriculum-test-improve.jpg",
        alt: "Arabic curriculum slide asking students to test the main function, record one observation and describe how to reproduce a bug.",
        caption: "Curriculum: test an app and describe what needs fixing.",
        width: 1456,
        height: 819,
      },
    ],
    treatment: "strip",
    flow: null,
  },
  {
    id: "noon-ai-week",
    title: "AI Week, the boys' session",
    role: "Co-created and delivered the session with Talah.",
    status: "Delivered",
    statusDetail: "Delivered with Talah on 15 October 2026.",
    summary:
      "Worked with Talah on a hands-on Arabic AI session for boys, focused on trying AI and questioning its answers.",
    description:
      "I co-created and delivered the boys' AI Week session with Talah. We used short Arabic challenges around image understanding, reading tone and testing code. Students tried the tasks themselves, compared their answers with Claude and discussed where AI helped or got things wrong. The aim was simple: use AI, but check its work and make your own judgement.",
    work: [
      "Prepared the session and learning activities with Talah.",
      "Co-delivered the boys' session using hands-on challenges and live student participation.",
      "Used examples that encouraged students to test AI outputs instead of accepting them at face value.",
    ],
    outcomes: [],
    metrics: [
      { value: "525", label: "boys attended the session" },
      { value: "88%", label: "positive responses in the end-of-session survey" },
    ],
    links: [],
    media: [
      {
        src: "/media/noon/ai-week-programme-artwork.png",
        alt: "Arabic AI Week programme banner with illustrated learning, coding and creative-AI symbols.",
        caption: "Noon AI Week programme artwork.",
        width: 1200,
        height: 1800,
      },
    ],
    treatment: "poster",
    flow: null,
  },
  {
    id: "noon-school-staff-placements",
    title: "School staff placements",
    role: "Built the initial internal tool and API connection.",
    status: "Initial internal build",
    statusDetail: null,
    summary: "Built an early school-staff placement tool and connected it to Noon Admin through an API.",
    description:
      "I built an early placement tool for the school-staffing team and connected it to Noon Admin through an API. I worked from the team's requirements around school needs, staff experience, performance, language and location.",
    work: [
      "Built the initial internal placement platform.",
      "Added an API connection from the placement tool to Noon Admin.",
      "Worked from the school team's placement requirements and improved the tool's workflow.",
    ],
    outcomes: [],
    metrics: [],
    links: [],
    media: [],
    treatment: "none",
    flow: null,
  },
];

const credentials: readonly Credential[] = [
  {
    img: "/media/cert-apple.jpg",
    name: "Apple AI Program",
    designation: null,
    issuer: "Apple Developer Academy & Tuwaiq",
    year: "2025",
    href: null,
    note: "Selected 1 of 66 from 400,000+ applicants",
    description: null,
  },
  {
    img: "/media/cert-sda.png",
    name: "Agentic AI Bootcamp",
    designation: null,
    issuer: "SDA Academy",
    year: "2026",
    href: null,
    note: "Selective admission",
    description: null,
  },
  {
    img: "/media/cert-cdmp-badge.png",
    name: "Certified Data Management Professional (CDMP)",
    designation: "Associate",
    issuer: "DAMA",
    year: "2026",
    href: "https://eu.credential.net/1c13a3e1-5f2d-4840-a944-afc2a1c5f720",
    note: null,
    description: null,
  },
  {
    img: "/media/cert-aws-ai-business-strategist.png",
    name: "AWS Certified AI Business Strategist",
    designation: "Early Adopter",
    issuer: "Amazon Web Services Training and Certification",
    year: null,
    href: "https://www.credly.com/badges/2d8a0251-c153-4109-9181-cce562481783",
    note: null,
    description:
      "Business-focused certification covering AI investment decisions, business cases, responsible governance and adoption from pilot to production.",
  },
  {
    img: "/media/cert-mckinsey-badge.png",
    name: "McKinsey Forward",
    designation: null,
    issuer: "McKinsey & Company",
    year: "2026",
    href: "https://www.credly.com/badges/f8b63388-6689-450b-a8e3-a55681465472",
    note: null,
    description: null,
  },
];

const work: readonly WorkRow[] = [
  {
    id: "rusokh",
    kicker: "Course platform, a personal product",
    meta: "Live at rusokh.com",
    title: "Rusokh",
    logo: "/media/rusokh-logo.png",
    logoAlt: "Rusokh",
    line: "I hit the same walls on every course platform I taught on, so I built my own. Bilingual (Arabic/English), payments, video delivery, live and in use today.",
    href: "https://rusokh.com",
    cta: "Visit rusokh.com",
    action: null,
  },
  {
    id: "consulting",
    kicker: "AI & Software Consultant, freelance",
    meta: "Jan 2025 to Jul 2026",
    title: "Consulting through GHRS",
    logo: "/media/ghrs-logo.png",
    logoAlt: "GHRS",
    line: "I built and launched software for Saudi businesses through GHRS. I also delivered an education AI system with rule-based decisions and human review, and advised logistics startup FREIGHTLX on its AI architecture.",
    href: "https://ghrs.sa",
    cta: "Visit ghrs.sa",
    action: null,
  },
  {
    id: "site",
    kicker: "This site",
    meta: null,
    title: "A portfolio that answers back",
    logo: null,
    logoAlt: null,
    line: "Built as a product: a streaming AI chat that answers as me, with rate limits, input validation, and prompt guardrails behind the API. Try it: ask it anything on this page.",
    href: null,
    cta: "Ask it something",
    action: "open-chat",
  },
];

export const siteContent = {
  name: "Yousef Alshuwayi",
  // The one place the domain lives. Metadata, sitemap, robots and the OG
  // card all read it from here, so a move only ever edits these two lines.
  host: "youusef.com",
  url: "https://youusef.com",
  role: "AI Systems Engineer at Noon Academy",
  // The title is the fact; the second clause is the way of working. They stay
  // separate so the site never reads as a claim to a job title Noon did not give.
  roleAside: "I work forward deployed",
  tagline:
    "I embed with the team that owns the problem, turn ambiguity into a product, ship it fast, and hand it over so it runs without me.",
  hero: {
    location: "Riyadh, Saudi Arabia",
    video: "/media/apple-presenting.mp4",
    videoSmall: "/media/apple-presenting-720.mp4",
    poster: "/media/apple-presenting-poster.jpg",
    videoAlt: "Yousef presenting at the Apple Developer Academy",
    videoCaption: "Apple Developer Academy",
    badges: [
      "Apple AI Program, 1 of 66",
      "SDA Agentic AI Bootcamp",
      "AWS Certified AI Business Strategist",
      "Certified Data Management Professional (CDMP)",
    ],
    cta: { cv: CV, cvLabel: "Download CV", email: EMAIL, emailLabel: "Email me" },
  },
  method: {
    title: "How I work",
    // No subtitle here on purpose. The addendum caps this section at the lead,
    // the four steps and the closer.
    lead: "I work closest to the problem: with the team that owns it, inside their day-to-day, until the solution is theirs.",
    // Verbatim from addendum v2. Every line stands on its own evidence, with
    // no comparison to how anyone else works.
    steps: [
      {
        name: "Embed",
        line: "I sit with the people who own the problem and learn how their day actually runs.",
      },
      {
        name: "Scope",
        line: "I turn what I heard into a product with clear success criteria we agree on.",
      },
      {
        name: "Ship",
        line: "I get it into production early, then shape it around real usage.",
      },
      {
        name: "Hand over",
        line: "I track adoption until the team runs it on their own, then I step back.",
      },
    ],
    closer: "This way of working has a name now: forward deployed engineering.",
  },
  noon: {
    logo: "/media/noon-logo.png",
    url: "https://www.noon.edu.sa/en/",
    title: "Noon Academy",
    meta: "AI Systems Engineer, Central Operations, since July 2026",
    framing:
      "This is what forward deployed looks like from the inside: I sit with the team that owns each problem, not apart from it.",
    intro:
      "I turn day-to-day operational problems into working tools. At Noon Academy, that includes a training portal the team can run themselves, an early school-staff placement tool, a daily HR data integration, and a student AI platform with its learning content.",
    projects: noonProjects,
    hackathon: {
      label: "Also at Noon",
      line: "I judged the Educational Games Industry Hackathon, run with the Ministry of Communications and Information Technology and supported by Replit. The AI-based solutions in those evaluation sessions proved again that young Saudi talent can ship educational products that compete.",
      photos: [
        {
          src: "/media/photo-hackathon-judging.jpg",
          alt: "Yousef judging project presentations at the Educational Games Industry Hackathon",
          caption: "Evaluation sessions",
          width: 1600,
          height: 1066,
        },
        {
          src: "/media/photo-hackathon-group.jpg",
          alt: "Yousef with the Ministry of Communications and Information Technology and Noon teams at the hackathon closing ceremony",
          caption: "Closing ceremony with the MCIT and Noon teams",
          width: 1600,
          height: 1066,
        },
      ] satisfies readonly Media[],
    },
    closer: "I work with the people using each system, then build, test, improve and hand it over.",
  },
  yax: {
    logo: "/media/yax-logo.jpg",
    title: "Before AI",
    lead: "Staff Manager at YAX for the Riyadh Metro launch, November 2023 to May 2025.",
    lines: [
      "I managed the deployment of 1,500 staff across 85 Riyadh Metro stations in one month for the launch. I was promoted twice within a year.",
    ],
    figure: [
      { value: "1,500", label: "staff deployed" },
      { value: "85", label: "stations" },
      { value: "1", unit: "month", label: "to the launch" },
    ],
    bridge:
      "That was my first forward deployment, before I knew the term existed. Systems have to survive contact with real people, real deadlines, and real chaos.",
  },
  work,
  workSection: {
    title: "Projects",
    lead: "Client and personal work, alongside the day job.",
  },
  teaching: {
    title: "Teaching",
    lead: "Instructor at Shaguf Educational Platform since January 2022.",
    lines: [
      "I've taught 1,800+ computer science students at Shaguf over four years, with a 4.9/5 learner rating.",
      "Teaching is where I learned the skill I use most as an engineer: taking something complicated and making it land, for a beginner, for an expert, or for a stakeholder who just needs to trust the system.",
    ],
    stats: [
      { value: "1,800", unit: "+", label: "Students taught" },
      { value: "4.9", unit: "/5", label: "Learner rating" },
      { value: "4", unit: "years", label: "And counting" },
    ],
    gallery: [
      {
        src: "/media/photo-sda-presenting.jpg",
        alt: "Yousef presenting at the SDA Agentic AI Bootcamp",
        caption: "Presenting at the SDA Agentic AI Bootcamp",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/photo-shaguf-stage.jpg",
        alt: "Yousef speaking on stage as the honored best instructor at a Shaguf event",
        caption: "Honored as best instructor at a Shaguf event",
        width: 892,
        height: 490,
      },
      {
        src: "/media/photo-shaguf-audience.jpg",
        alt: "The audience at the Shaguf session",
        caption: "The room at the Shaguf session",
        width: 892,
        height: 477,
      },
    ] satisfies readonly Media[],
  },
  credentials: {
    title: "Credentials",
    lead: "Programmes and certifications, with a verification link where one exists.",
    featured: credentials,
    alsoLead: "Also completed:",
    also: [
      "Introduction to AI, KAUST Academy, 2026",
      "Data Science & ML scholarship, KAUST Academy, 2025",
      "Data courses, University of Michigan, 2025",
      "Vibe Coding, SDAIA, 2026",
    ],
  },
  footer: {
    title: "Let's talk.",
    line: "Questions about the work? The chat in the corner answers from my CV, or reach me directly.",
  },
  contact: {
    email: EMAIL,
    linkedin: "https://linkedin.com/in/yousefalshuwayi",
    github: "https://github.com/Yousef4Git",
    cv: CV,
  },
  chapters: ["hero", "method", "noon", "teaching", "work", "yax", "credentials"] as const,
} as const;

export type SiteContent = typeof siteContent;
