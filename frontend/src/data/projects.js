// Centralized projects data.
// Each project includes an `ownership` field to clarify my actual contribution:
//   "built"       — I designed and built this from scratch
//   "worked-on"   — I contributed to a project that existed or was in progress
//   "r-and-d"     — Personal R&D or in-development work
// Do not change ownership without verification.

const projects = [
  // ─── SELECTED WORK ─────────────────────────────────────────────────────────

  {
    id: "myra",
    featured: true,
    number: "01",
    title: "Myra Gems",
    subtitle: "Shopify E-commerce Development",
    ownership: "worked-on",
    category: "Shopify · E-commerce · Client Work · Production",
    status: "Production · Live",
    description:
      "Production Shopify storefront work for Myra Gems (myragems.com) — focusing on theme customisation, custom Liquid sections, fast checkout experience, and production e-commerce stability.",
    tags: ["Shopify", "Liquid", "E-commerce", "Theme Customisation", "Storefront"],
    image: null,
    live: "https://myragems.com",
    repo: null,
    caseStudy: {
      problem:
        "The brand required a custom Shopify storefront that delivered a refined customer shopping experience — including custom liquid sections, streamlined product showcases, and fast checkout integration beyond basic off-the-shelf theme constraints.",
      approach:
        "Worked within the Shopify Liquid ecosystem to implement custom theme sections, optimise storefront interactions, and integrate checkout enhancements while maintaining production stability.",
      role:
        "Shopify development work — building and customising Liquid templates, storefront sections, and implementing business-specific e-commerce features.",
      built: [
        "Custom Liquid templates and theme sections",
        "Storefront customisation tailored to brand requirements",
        "Product catalog and collection showcase improvements",
        "Mobile-first responsive layout and interaction refinement",
        "Checkout integration support and theme script optimisations"
      ],
      tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      challenges:
        "Working within Shopify's theme architecture and third-party scripts to implement custom requirements without degrading performance or store stability.",
      outcome:
        "A live, high-converting production Shopify storefront operating at myragems.com."
    }
  },

  {
    id: "tarama-jeans",
    featured: true,
    number: "02",
    title: "TARAMA JEANS",
    subtitle: "Shopify Storefront Work",
    ownership: "worked-on",
    category: "Shopify · E-commerce · Client Work · Production",
    status: "Production · Live",
    description:
      "Shopify storefront work for a women's denim brand — focused on theme customisation, third-party integrations, and production e-commerce implementation.",
    tags: ["Shopify", "Liquid", "E-commerce", "Motion Theme", "Integrations"],
    image: null,
    live: "https://www.taramajeans.com/",
    repo: null,
    caseStudy: {
      problem:
        "TARAMA JEANS required a production Shopify storefront — a premium women's denim brand targeting the Indian market — with a customised shopping experience and specific third-party tools integrated.",
      approach:
        "Worked within the live Shopify environment, customising the Motion theme and integrating required third-party services. The store was in active production throughout.",
      role:
        "Contributed to Shopify theme customisation and integration work on a production store. The full store architecture, theme selection, and brand strategy were established by the client — my contribution was implementation and customisation work within that context.",
      built: [
        "Shopify theme customisation within the Motion theme (v11.1.0)",
        "GoKwik checkout integration implementation",
        "Storefront configuration and section adjustments",
        "Mobile responsiveness and layout refinements",
        "Third-party script integration (GA4, Shiprocket tracking)"
      ],
      tech: ["Shopify", "Liquid", "Motion Theme", "GoKwik", "Google Analytics (GA4)", "Shiprocket"],
      challenges:
        "Working on a live production store with active customers — requiring careful implementation to avoid disrupting the shopping experience. GoKwik checkout required specific integration patterns within the Shopify theme.",
      outcome:
        "Production Shopify storefront live at taramajeans.com with third-party integrations operational. The store sells premium women's denim across India."
    }
  },

  {
    id: "bst",
    featured: true,
    number: "03",
    title: "Belief Shaping Therapies",
    subtitle: "Connected Digital Platform",
    ownership: "built",
    category: "Web Application · CRM · Portal · Client Work · Production",
    status: "Production · Live",
    description:
      "A connected digital platform for a multi-disciplinary therapy centre — consisting of a public-facing website, an internal CRM, and a dedicated portal.",
    tags: ["Next.js", "React", "CRM", "Web App", "Full-Stack", "Netlify"],
    image: null,
    live: "https://bst00.netlify.app/",
    liveCrm: "https://bst-crm.netlify.app/",
    livePortal: "https://bst-portal.netlify.app/",
    repo: null,
    caseStudy: {
      problem:
        "Belief Shaping Therapies — a DHA-certified multi-disciplinary therapy centre in Bur Dubai, UAE — needed a digital presence that served three distinct audiences: prospective clients, internal clinical/admin staff, and families. A single website was insufficient to meet all three needs.",
      approach:
        "Designed and built three connected applications serving different roles in the business: a public website for discovery and enquiry, a CRM for internal operations, and a portal for families. Each application was built and deployed independently but designed as a coherent platform.",
      role:
        "Full application development across all three systems — architecture, frontend, backend integration, deployment on Netlify.",
      built: [
        "Public website (bst00.netlify.app): service pages (Occupational Therapy, Speech & Language Therapy, ABA Therapy, Technology interventions), discovery call flow, Google Maps integration, WhatsApp contact, blog section, DHA certification display, multi-section responsive layout",
        "Internal CRM (bst-crm.netlify.app): lead management, parent and child records, appointment scheduling, clinical report workflows, billing, analytics — described in the CRM meta as 'multi-center therapy management CRM'",
        "Family/Therapist Portal (bst-portal.netlify.app): authentication-protected portal for families and therapists"
      ],
      tech: ["Next.js", "React", "Netlify", "JavaScript", "Tailwind CSS"],
      challenges:
        "Building three distinct applications that shared business context without tight coupling — each needed to serve its audience independently while remaining coherent as a platform. The CRM had to manage complex relational data (children, parents, therapists, appointments) in a straightforward interface.",
      outcome:
        "Three live, deployed applications serving the therapy centre. The public site represents the business online; the CRM supports internal operations; the portal serves families. All deployed on Netlify."
    }
  },

  {
    id: "inavit",
    featured: true,
    number: "04",
    title: "Inavit Modutech",
    subtitle: "Interior Cost Calculator",
    ownership: "built",
    category: "Business Tool · Calculator · Client Work · Production",
    status: "Production · Live",
    description:
      "A custom interactive interior cost calculator built for an interior design company — turning a domain-specific estimation workflow into a digital, user-facing tool.",
    tags: ["React", "JavaScript", "Business Tool", "Calculator", "Web App"],
    image: null,
    live: "https://inavitmodutech.com/calculator/interior-calculator",
    repo: null,
    caseStudy: {
      problem:
        "Inavit Modutech — an interior design and modular solutions company in Kandivali, Mumbai — needed a way for prospective clients to estimate interior project costs interactively, rather than going through a manual consultation just to understand approximate pricing.",
      approach:
        "Built a purpose-specific calculator embedded directly within the existing Inavit Modutech business website. The calculator handles user inputs, applies the business's estimation logic, and presents a cost estimate — without requiring manual intervention from the team.",
      role:
        "Designed and built the calculator tool end-to-end — from understanding the estimation requirements to delivering the embedded interactive implementation.",
      built: [
        "Multi-step interactive cost calculator with room-type and scope inputs",
        "Business-specific estimation logic based on client requirements",
        "Input validation and edge-case handling",
        "Responsive UI that integrates visually with the existing site",
        "Deployment within the inavitmodutech.com website"
      ],
      tech: ["React", "JavaScript", "HTML", "CSS"],
      challenges:
        "Translating the business's interior estimation process — which involves multiple room types, materials, and scope decisions — into a digital flow that's understandable to a non-technical client without oversimplifying the logic.",
      outcome:
        "A live, working calculator at inavitmodutech.com/calculator/interior-calculator — reducing the time between client enquiry and cost estimation for the business."
    }
  },

  {
    id: "ai-opportunity-agent",
    featured: true,
    number: "05",
    title: "AI Opportunity Agent",
    subtitle: "AI-Assisted Opportunity Discovery",
    ownership: "r-and-d",
    category: "AI · Automation · R&D · In Development",
    status: "In Development",
    description:
      "A personal R&D project focused on using AI to identify, filter, and organise relevant freelance and software development opportunities — reducing manual research time.",
    tags: ["AI", "Automation", "Python", "APIs", "R&D"],
    image: null,
    live: null,
    repo: null,
    caseStudy: {
      problem:
        "Finding relevant freelance opportunities and leads requires repetitive manual searching across multiple platforms — a process that's time-consuming and inconsistent.",
      approach:
        "Building an AI-assisted system that automates the discovery and initial qualification of opportunities, surfacing the most relevant ones for review rather than requiring manual trawling.",
      role: "Personal R&D project — designing and building the system independently.",
      built: [
        "Opportunity discovery and aggregation workflow",
        "AI-assisted relevance filtering and initial qualification",
        "Structured data output for organised review",
        "Outreach preparation workflow (in progress)"
      ],
      tech: ["Python", "AI APIs", "Automation"],
      challenges:
        "Defining qualification criteria that reduce noise without missing genuinely relevant opportunities. Building reliable automation on top of platforms that are not designed for programmatic access.",
      outcome:
        "Project is actively in development. Core discovery and filtering is functional. WhatsApp notifications and full outreach automation are planned but not yet implemented."
    }
  },

  {
    id: "shopify-otp-login",
    featured: true,
    number: "06",
    title: "Shopify OTP & Social Login",
    subtitle: "Shopify Authentication Engineering",
    ownership: "r-and-d",
    category: "Shopify · App Development · R&D · In Development",
    status: "In Development",
    description:
      "R&D project exploring modern authentication flows for Shopify — specifically phone-based OTP login and social login as alternatives to traditional password authentication.",
    tags: ["Shopify", "OAuth", "OTP", "Authentication", "App Dev", "R&D"],
    image: null,
    live: null,
    repo: null,
    caseStudy: {
      problem:
        "Many Shopify stores rely on standard email/password login which creates friction at checkout — particularly on mobile. Merchants increasingly want OTP-based or social login options for a smoother customer experience.",
      approach:
        "Investigating and prototyping custom Shopify authentication flows using Shopify's customer APIs, OAuth integrations, and OTP delivery — exploring what's achievable within Shopify's architecture.",
      role: "Personal R&D — independently researching and prototyping the implementation.",
      built: [
        "OTP authentication flow prototype (phone number → OTP → customer session)",
        "Shopify customer API integration",
        "OAuth flow investigation for social login",
        "Storefront integration approach for custom login UI"
      ],
      tech: ["Shopify APIs", "Node.js", "OAuth", "Shopify Storefront API"],
      challenges:
        "Shopify's customer authentication model has specific constraints — working within those while delivering a smooth OTP experience requires careful handling of session management and Shopify's account flows.",
      outcome:
        "R&D project — not publicly launched or available on the Shopify marketplace. Core OTP flow has been prototyped. No production merchants or paying customers."
    }
  },

  {
    id: "insurance-lead-intel",
    featured: true,
    number: "07",
    title: "Corporate Insurance Lead Intelligence",
    subtitle: "Business Data Enrichment & Lead System",
    ownership: "r-and-d",
    category: "Data · Automation · Business Systems · In Development",
    status: "In Development",
    description:
      "A data automation project focused on enriching company records with contact and decision-maker information — turning raw business data into structured, actionable lead intelligence.",
    tags: ["Data", "Automation", "Python", "Lead Intelligence", "Business Systems"],
    image: null,
    live: null,
    repo: null,
    caseStudy: {
      problem:
        "Raw company data (names, sectors, registration details) requires significant manual research to identify relevant contacts, decision-makers, and contact information — making lead preparation slow and inconsistent.",
      approach:
        "Building an automated enrichment system that takes company records as input and outputs structured lead data with identified contacts — reducing the manual research burden on sales or outreach teams.",
      role: "Personal R&D — designing and building the enrichment system independently.",
      built: [
        "Company data ingestion and normalisation",
        "Contact and decision-maker discovery workflow",
        "Data enrichment pipeline",
        "Structured output for sales/outreach use"
      ],
      tech: ["Python", "Data APIs", "Automation"],
      challenges:
        "Data quality varies significantly across company records. Building reliable enrichment requires handling incomplete or inconsistent source data without propagating errors downstream.",
      outcome:
        "Project is in active development. Core enrichment pipeline is functional. No specific company counts, contact numbers, or conversion metrics — those would require production deployment."
    }
  },

  // ─── EARLIER PROJECTS & EXPERIMENTS ────────────────────────────────────────

  {
    id: "todo-app",
    featured: false,
    number: null,
    title: "To-Do App",
    subtitle: "React Web App",
    ownership: "built",
    category: "Personal Project · Learning",
    status: "Live",
    description: "A task management web application built with React.",
    tags: ["React", "JavaScript"],
    image: "/todoapp.png",
    live: "https://to-do-hl3je3rfc-shivam-roys-projects.vercel.app",
    repo: "https://github.com/RoyDev72/To-Do-App-",
    caseStudy: null
  },

  {
    id: "url-shortener",
    featured: false,
    number: null,
    title: "URL Shortener",
    subtitle: "React + Supabase",
    ownership: "built",
    category: "Personal Project · Learning",
    status: "Live",
    description: "A URL shortening service with custom short links, built with React and Supabase as the backend.",
    tags: ["React", "JavaScript", "Supabase"],
    image: "/urlimage.png",
    live: "https://frontend-smoky-six-48.vercel.app/",
    repo: "https://github.com/RoyDev72/URL_Shortener",
    caseStudy: null
  }
];

export default projects;
