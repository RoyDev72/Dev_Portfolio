// Central profile data. Edit this file to update your portfolio content.
// Only keep what you want publicly visible.

const profile = {
  name: "Shivam Roy",
  role: "Software Developer & Builder",
  avatar: "/profile.png",
  tagline: "Building digital products that solve real business problems.",
  resume: "/resume.pdf",
  contact: {
    email: "shivamraj620133@gmail.com",
    phone: "+91 7294160061",
    location: "Mumbai, Maharashtra, India"
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/shivamroy/",
    twitter: "https://x.com/shivamroy620",
    github: "https://github.com/RoyDev72",
    leetcode: "https://leetcode.com/u/RoyDev72/"
  },
  about: [
    "I'm Shivam Roy — a software developer who builds web applications, Shopify experiences, business tools, and automation systems for real clients and products.",
    "I started learning by building things. That habit never stopped. Over time I moved from personal experiments into production work: Shopify storefronts, multi-application client platforms, custom calculators, and AI-assisted workflows.",
    "I care about writing software that actually ships and actually works — software that a business can depend on, and that users find clear to use. The technical part matters, but so does understanding what problem is being solved."
  ],

  // What I Build — shown on the About/Home page
  services: [
    {
      key: "shopify",
      title: "Shopify & E-commerce",
      description: "Shopify theme development and customisation, storefront improvements, third-party integrations, and production e-commerce work."
    },
    {
      key: "webapps",
      title: "Web Applications",
      description: "Modern websites and web applications built around real business requirements, from public-facing sites to internal tools."
    },
    {
      key: "business",
      title: "Custom Business Software",
      description: "CRM systems, portals, calculators, dashboards, and workflow tools built to match how a specific business actually operates."
    },
    {
      key: "ai",
      title: "AI & Automation",
      description: "AI-assisted workflows, data enrichment, opportunity discovery, and automation systems that reduce repetitive manual work."
    }
  ],

  // Education — only verified data from existing profile
  education: [
    {
      institution: "Sandip University Nashik",
      program: "Bachelor of Technology",
      field: "Computer Science",
      period: "2022 – 2026"
    }
  ],

  // Experience — only what can be stated factually.
  // No employer names, job titles, dates, or responsibilities have been invented.
  // This section reflects that Shivam has worked on real client/freelance projects
  // during and after his degree. Update with verified employment details before publishing.
  experience: [
    {
      type: "client",
      title: "Freelance & Client Work",
      description: "Built and contributed to production projects for clients across e-commerce, healthcare, and business tooling — including Shopify storefronts, a multi-application therapy centre platform, a custom business calculator, and AI/automation systems.",
      note: "See the Selected Work section for specific verified projects."
    }
  ],

  skills: {
    Frontend: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "TailwindCSS"],
    Shopify: ["Shopify Themes", "Liquid", "Shopify APIs", "Storefront Customisation"],
    Backend: ["Node.js", "Express", "REST APIs", "Python"],
    Database: ["MongoDB", "MySQL", "PostgreSQL"],
    "AI & Automation": ["AI APIs", "Automation Workflows", "Data Processing"],
    "Cloud / DevOps": ["AWS", "Git", "GitHub", "Docker", "Linux", "Terraform"]
  }
};

export default profile;
