// Central profile data. Edit this file to update your portfolio content.
// Only keep what you want publicly visible.

const profile = {
  name: "Shivam Roy",
  role: "Full Stack Developer",
  avatar: "/profile.png",
  tagline: "Crack the Code",
  resume: "/resume.pdf", // Place your PDF inside frontend/public as resume.pdf
  contact: {
    email: "shivamraj620133@gmail.com",
    phone: "+91 7294160061",
    location: "Nashik Maharashtra, India"
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/shivamroy/",
    twitter: "https://x.com/shivamroy620",
    github: "https://github.com/RoyDev72",
    leetcode: "https://leetcode.com/u/RoyDev72/"
  },
  about: [
    "Hi, I’m Shivam Roy, a Computer Science undergrad and an aspiring Software Engineer. I enjoy working across the stack, from designing smooth user experiences on the frontend to building scalable systems on the backend.",
    "My journey in tech has led me to explore Full Stack Development and DevOps, where I focus on creating applications that are not only functional but also efficient and reliable. I love experimenting with new tools, improving workflows, and finding smarter ways to solve problems.",
    "When I’m not coding, you’ll probably find me exploring open-source projects, learning new technologies, or brainstorming ideas that bring real-world impact through tech."
  ],
  services: [
    { key: "frontend", title: "Frontend Development", description: "High-quality frontend development of sites." },
    { key: "backend", title: "Backend Development", description: "Backend server development of website." },
    { key: "devops", title: "DevOps", description: "CI/CD & infrastructure automation." },
    { key: "dsa", title: "Data Structures & Algorithms", description: "Designing algorithmic patterns, complexity analysis and daily problem-solving." }
  ],
  education: [
    { institution: "Sandip University Nashik", program: "Bachelor of Technology", period: "2022 – 2026" }
  ],
  skills: {
    Languages: ["Java", "TypeScript", "JavaScript", "Python"],
    Frontend: ["React", "HTML5", "CSS3", "Bootstrap", "TailwindCSS", "WordPress", "Shopify"],
    Backend: ["Node.js", "Express", "Django", "Spring Boot"],
    Database: ["MySQL", "NoSQL", "MongoDB", "PostgreSQL"],
    DevOps: ["AWS", "Docker", "Linux", "Terraform", "Kubernetes", "Git", "GitHub", "Postman"]
  },
  // Projects moved to src/data/projects.js
};

export default profile;
