// Every word the site renders lives here. Facts about the Noon work come from
// the October 2026 handoff pack; the Rusokh, GHRS, Shaguf and YAX descriptions
// are the ones Yousef supplied and approved in the October 2026 copy review.
// Keep the voice plain: no em dashes, no comparisons with other people, one
// sentence per claim and no sentence whose only job is to qualify the one
// before it.

const CV = "/cv/Yousef-Alshuwayi-AI-Engineer.pdf";
const EMAIL = "yousefalshuwayi@gmail.com";
const LINKEDIN = "https://linkedin.com/in/yousefalshuwayi";

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
  // The one-paragraph version a visitor reads before opening the full case.
  summary: string;
  description: string;
  work: readonly string[];
  outcomes: readonly string[];
  metrics: readonly Metric[];
  media: readonly Media[];
  // Public sites, where one exists. Internal tools stay unlinked.
  links: readonly { label: string; href: string }[];
  // How the case lays its media out. "wide" runs the first image across the
  // row and any others in a grid below; "flow" draws a figure from `flow`;
  // "poster" sets the metrics beside one tall image; "none" renders text
  // only, never an empty frame.
  treatment: "wide" | "flow" | "strip" | "poster" | "none";
  flow: Flow | null;
};

export type CredentialId = "aws" | "cdmp" | "apple" | "sda" | "mckinsey";

export type Credential = {
  id: CredentialId;
  // A professional certification leads the hero and the Credentials chapter.
  // A programme or bootcamp is listed after them and never dressed as one.
  category: "certification" | "programme";
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
  // One real screen of the product, where there is one to show.
  preview: Media | null;
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
    statusDetail: null,
    summary:
      "Built an Arabic training portal covering trainee, trainer and administration workflows. The team can run standard cohorts without routine engineering support.",
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
    id: "noon-ops-hr-integration",
    title: "Ops-to-HR placement integration",
    role: "Built, tested and handed over the integration.",
    status: "Live and handed over",
    statusDetail: "Daily placement updates are live and the integration has been handed over.",
    summary:
      "Built and handed over a daily placement-data integration, keeping operational updates aligned with HR records.",
    description:
      "I built a daily integration that keeps employees' work locations, sections and direct managers in the HR platform aligned with their operational placements. I cleaned the source data, reviewed the proposed changes and ran three weeks of integration testing before handing it over. Job titles and employment decisions stay with HR; unmatched records are held for review.",
    work: [
      "Connected ops-system placement data to the HR platform's API.",
      "Set clear ownership: the ops system provides placement and reporting data; the HR platform retains job titles and employment records.",
      "Cleaned up data, reviewed proposed changes and added safeguards for missing matches and unavailable manager information.",
      "Completed three weeks of integration testing before handover.",
    ],
    outcomes: [
      "Go-live reconciled a few hundred records with zero errors.",
      "Routine placement changes reach HR records without manual re-entry.",
    ],
    metrics: [],
    links: [],
    media: [],
    treatment: "flow",
    flow: {
      from: { name: "Ops system", items: ["Work locations", "Sections", "Direct managers"] },
      to: { name: "HR platform", items: ["Job titles", "Employment records", "Employment decisions"] },
    },
  },
  {
    id: "noon-mcit-genai",
    title: "MCIT × Noon: generative AI learning platform",
    role: "Built the full platform and created the learning content.",
    status: "Live",
    statusDetail: "Student, teacher and admin flows are live and tested end to end.",
    summary:
      "Built the live student, teacher and admin platform and created its Arabic learning content, connecting prompt practice, feedback and app building.",
    description:
      "I built the student platform, teacher board and admin tools, and created the Arabic learning content. Students learn how generative AI works, practise writing better prompts, and build a small app they can test, improve and share. I also wrote the activities, knowledge checks, prompt-feedback rubric and teacher guidance. The platform links each student's answers, prompt attempts and app versions, so the programme can follow the learning process rather than collect final project links alone.",
    work: [
      "Built an eight-step student journey from initial questions through prompt practice, app creation and the final knowledge check.",
      "Built prompt feedback with retries, app generation, improvement requests, saved versions and project sharing.",
      "Created the Arabic curriculum, on-screen activities, knowledge questions and teacher guidance.",
      "Built teacher session controls, progress reporting, admin tools and AI-spending safeguards.",
      "Tested the full flow end to end.",
    ],
    outcomes: [
      "A live platform with student, teacher and admin workflows.",
      "Learning content and classroom materials ready for use.",
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
    role: "Co-created and delivered the session.",
    status: "Delivered",
    statusDetail: "Delivered on 15 October 2026.",
    summary:
      "Co-created and delivered the boys' AI Week session, with 525 attendees and 88% positive responses in the end-of-session survey.",
    description:
      "I co-created and delivered the boys' AI Week session. We used short Arabic challenges around image understanding, reading tone and testing code. Students tried the tasks themselves, compared their answers with Claude and discussed where AI helped or got things wrong. The aim was simple: use AI, but check its work and make your own judgement.",
    work: [
      "Prepared the session and learning activities.",
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
];

// Professional certifications first, in the order the hero shows them, then
// the programmes. Components pick credentials by id, never by position.
const credentials: readonly Credential[] = [
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
    description:
      "Business-focused certification covering AI investment decisions, business cases, responsible governance and adoption from pilot to production.",
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
    description: null,
  },
  {
    id: "apple",
    category: "programme",
    img: "/media/cert-apple.jpg",
    name: "Apple AI Program",
    designation: null,
    issuer: "Apple Developer Academy & Tuwaiq",
    year: "2025",
    href: null,
    note: "Selected 1 of 66",
    description: null,
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
    note: "Selective admission",
    description: null,
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
    description: null,
  },
];

export function credentialById(id: CredentialId): Credential {
  const c = credentials.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown credential: ${id}`);
  return c;
}

export function noonProjectById(id: string): NoonProject {
  const p = noonProjects.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown Noon project: ${id}`);
  return p;
}

// Rusokh leads Selected work, GHRS is an Experience row, and the site itself
// is the small demonstration beside the contact block.
const work: readonly WorkRow[] = [
  {
    id: "rusokh",
    kicker: "Founder and product builder",
    meta: "University learning platform · Live",
    title: "Rusokh",
    logo: "/media/rusokh-logo.png",
    logoAlt: "Rusokh",
    line: "Founded and built Rusokh, a university learning platform with Arabic and English interfaces, course publishing, payments and video delivery.",
    preview: {
      src: "/media/rusokh-home.jpg",
      alt: "The Rusokh homepage in Arabic: the course catalogue headline beside a Digital Logic Design course card.",
      caption: "rusokh.com, the Arabic homepage with a course card.",
      width: 1440,
      height: 521,
    },
    href: "https://rusokh.com",
    cta: "Visit rusokh.com",
    action: null,
  },
  {
    id: "consulting",
    kicker: "Co-Founder, AI & software consulting",
    meta: "Jan 2025 to Jul 2026",
    title: "GHRS Ventures",
    logo: "/media/ghrs-logo.png",
    logoAlt: "GHRS",
    line: "I built and launched software for Saudi businesses through GHRS. I also delivered an education AI system with rule-based decisions and human review, and advised a freight company on its AI architecture.",
    preview: null,
    href: "https://ghrs.sa",
    cta: "Visit ghrs.sa",
    action: null,
  },
  {
    id: "site",
    kicker: "AI-powered portfolio",
    meta: null,
    title: "This portfolio, built as a product",
    logo: null,
    logoAlt: null,
    line: "Streaming AI chat, input validation, rate limits and prompt guardrails. An interactive example of the systems I build.",
    preview: null,
    href: null,
    cta: "Ask about my work",
    action: "open-chat",
  },
];

export const siteContent = {
  name: "Yousef Alshuwayi",
  // The one place the domain lives. Metadata, sitemap, robots and the OG
  // card all read it from here, so a move only ever edits these two lines.
  host: "youusef.com",
  url: "https://youusef.com",
  // The broad professional scope. The formal job title stays in hero.currentRole,
  // the Experience row, the metadata and the structured data, as a fact.
  role: "AI Systems Engineer · Founder · Educator",
  tagline: "I build AI systems and digital products, from the first requirement to launch and handover.",
  hero: {
    location: "Riyadh, Saudi Arabia",
    video: "/media/apple-presenting.mp4",
    videoSmall: "/media/apple-presenting-720.mp4",
    poster: "/media/apple-presenting-poster.jpg",
    videoAlt: "Yousef presenting at the Apple Developer Academy",
    videoCaption: "Apple Developer Academy",
    // The two professional certifications, by id, in reading order. The
    // programmes are listed in the Credentials chapter only.
    credentials: ["aws", "cdmp"] as const,
    currentRole: "Currently AI Systems Engineer at Noon Academy.",
    // Three facts with their context attached: the product, then two Shaguf
    // teaching figures that must never read as product or employer numbers.
    proof: [
      { text: "Founder of Rusokh", href: "https://rusokh.com" },
      { text: "1,800+ computer science students taught at Shaguf", href: null },
      { text: "4.9/5 learner rating at Shaguf", href: null },
    ],
    cta: {
      work: "#work",
      workLabel: "View selected work",
      cv: CV,
      cvLabel: "Download CV",
      email: EMAIL,
      emailLabel: "Email me",
      linkedin: LINKEDIN,
      linkedinLabel: "LinkedIn",
    },
  },
  workSection: {
    title: "Selected work",
    lead: "Products I founded and systems I built, with a clear role in each.",
    // The two Noon cases that lead the chapter, by id. The other two live in
    // the Experience chapter behind the "More work at Noon Academy" fold.
    noonCases: ["noon-training-development", "noon-mcit-genai"] as const,
    noonContext: "Built at Noon Academy",
    details: { open: "View project details", close: "Hide project details" },
  },
  work,
  experience: {
    title: "Experience and delivery",
    noonMore: {
      open: "More work at Noon Academy",
      close: "Hide additional work",
      projects: ["noon-ops-hr-integration", "noon-ai-week"] as const,
    },
    // Two lines from the GHRS work, scoped exactly: one workflow, approximate
    // counts, no derived saving, no client named.
    ghrsHighlights: [
      "Reduced one workflow from about 71 model calls to about 5 through caching.",
      "Kept student-risk scoring rule based, with AI used for Arabic text and messages approved by a person.",
    ],
    toolkit: {
      label: "Core tools",
      items: "Python · TypeScript · React · Next.js · FastAPI · PostgreSQL · AWS",
    },
  },
  noon: {
    logo: "/media/noon-logo.png",
    logoAlt: "Noon Academy",
    url: "https://www.noon.edu.sa/en/",
    linkLabel: "Noon Academy website",
    title: "Noon Academy",
    meta: "AI Systems Engineer, Central Operations, since July 2026",
    intro:
      "At Noon Academy, I build training platforms, AI learning experiences and operational integrations, working with the teams that use them.",
    projects: noonProjects,
    hackathon: {
      label: "Also at Noon",
      line: "I judged the Educational Games Industry Hackathon, run with the Ministry of Communications and Information Technology and supported by Replit.",
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
  },
  yax: {
    logo: "/media/yax-logo.jpg",
    logoAlt: "YAX",
    org: "YAX, Your Amazing Xperience",
    title: "Operational leadership",
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
      "That experience shaped how I build: clear ownership, reliable execution and systems that work under real operational pressure.",
  },
  teaching: {
    title: "Teaching",
    lead: "Instructor at Shaguf Educational Platform since January 2022.",
    lines: [
      "Taught 1,800+ computer science students at Shaguf, with a 4.9/5 learner rating.",
      "Explaining complex ideas clearly is part of how I build. It helps me align technical teams, support users and make systems easier to understand.",
    ],
    stats: [
      { value: "1,800", unit: "+", label: "Students taught" },
      { value: "4.9", unit: "/5", label: "Learner rating" },
      // A start year, not a duration: it never goes stale and is never counted up.
      { value: "2022", label: "Teaching since" },
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
  method: {
    title: "How I work",
    // No subtitle here on purpose: the lead, the four steps and the closer.
    lead: "I work directly with the people using the system, then build around the workflow they need.",
    steps: [
      { name: "Embed", line: "Understand the workflow with the people responsible for it." },
      { name: "Scope", line: "Define the product, constraints and success criteria." },
      { name: "Ship", line: "Build, test and improve the product through real use." },
      { name: "Hand over", line: "Give the team the tools and guidance to operate it." },
    ],
    // The one place the phrase appears on the page: a way of working, never
    // a job title.
    closer: "I work forward deployed, staying close to the problem from scoping to handover.",
  },
  credentials: {
    title: "Credentials",
    lead: "Credentials supporting my work in AI, data and product delivery.",
    primaryHeading: "Professional certifications",
    programmesHeading: "Selected programmes",
    educationHeading: "Education",
    // The degree is a plain credential: no graduation date anywhere on the site.
    education: "BSc Computer Science, Imam Muhammad ibn Saud Islamic University (IMSIU)",
    verifyLabel: "View credential",
    list: credentials,
    alsoLead: "Additional learning:",
    also: [
      "Introduction to AI, KAUST Academy, 2026",
      "Data Science & ML scholarship, KAUST Academy, 2025",
      "Data courses, University of Michigan, 2025",
      "Vibe Coding, SDAIA, 2026",
    ],
  },
  footer: {
    title: "Let's talk.",
    line: "For AI engineering, product work or a conversation about what I've built, reach me directly.",
  },
  contact: {
    email: EMAIL,
    linkedin: LINKEDIN,
    github: "https://github.com/Yousef4Git",
    cv: CV,
  },
  // The chat is an AI assistant answering from Yousef's public facts. Every
  // label says so; none of them suggests he is typing.
  chat: {
    openLabel: "Ask my AI assistant",
    closeLabel: "Close the chat",
    panelLabel: "AI portfolio assistant",
    title: "Ask about my work",
    subtitle: "AI-generated answers about my work.",
    closeButton: "Close chat",
    starters: [
      "What have you built?",
      "What is Rusokh?",
      "How do you take a project from idea to handover?",
    ],
    you: "You",
    assistant: "AI assistant",
    thinking: "thinking…",
    inputLabel: "Ask about my work",
    placeholder: "Ask about my work…",
    send: "Send",
    errorLine: "The AI assistant is unavailable right now. You can reach me directly:",
    errorLinks: { email: "Email", linkedin: "LinkedIn", github: "GitHub" },
  },
  chapters: ["hero", "work", "experience", "teaching", "method", "credentials"] as const,
} as const;

export type SiteContent = typeof siteContent;
