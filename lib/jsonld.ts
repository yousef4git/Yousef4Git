import { siteContent } from "@/content/site";

// The Person record is the same on both pages: the formal title, the
// employer and the credentials are facts, not copy, so they do not change
// with the language. The Arabic name rides along as an alternate.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yousef Alshuwayi",
  alternateName: "يوسف الشويعي",
  jobTitle: "AI Systems Engineer",
  worksFor: { "@type": "Organization", name: "Noon Academy", url: "https://www.noon.edu.sa/en/" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Imam Muhammad ibn Saud Islamic University" },
  url: siteContent.url,
  email: "mailto:yousefalshuwayi@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
  sameAs: ["https://linkedin.com/in/yousefalshuwayi", "https://github.com/Yousef4Git"],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Certified Data Management Professional (CDMP) - Associate", credentialCategory: "certification" },
    { "@type": "EducationalOccupationalCredential", name: "Agentic AI Bootcamp, SDA Academy", credentialCategory: "certificate" },
    { "@type": "EducationalOccupationalCredential", name: "AWS Certified AI Business Strategist (Early Adopter), Amazon Web Services Training and Certification", credentialCategory: "certification" },
  ],
};
