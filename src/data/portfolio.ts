/**
 * Single source of truth for portfolio content.
 * Editing copy, projects, or experience should only require changes here.
 */

export const profile = {
  name: 'Sandeep Behera',
  initials: 'SB',
  role: 'Backend Developer',
  tagline: 'Backend & Full-Stack Developer — Java Spring Boot, MERN & Cloud Systems',
  summary:
    'Building high-throughput APIs, distributed backends, and cloud-native applications.',
  quote: 'I don’t just build APIs — I build systems that think, scale, and deliver.',
  email: 'beherasandeepkumar21@gmail.com',
  phone: '+91 93373 33525',
  phoneHref: 'tel:+919337333525',
  resume: '/SANDEEP_AUG_BBSR_update.pdf',
  portrait: '/portrait/Screenshot%202025-10-08%20122351.png',
  socials: {
    github: 'https://github.com/sandeepbehera21',
    linkedin: 'https://www.linkedin.com/in/sandeep2333',
    instagram: 'https://www.instagram.com/sandeepb_21/',
    x: 'https://x.com/Sandeepkumar99B',
  },
}

export const about = [
  'Final-year CS undergrad at Centurion University specializing in Java Spring Boot, MERN stack, and cloud-native backend systems. I focus on clean API contracts, optimized schemas, and stateless security.',
]

/**
 * Small fact cells for the About bento. Kept separate from the paragraphs above.
 */
export const aboutFacts = {
  education: {
    label: 'Education',
    value: 'B.Tech, Computer Science',
    org: 'Centurion University',
    detail: '4th year',
  },
  currently: {
    label: 'Programme',
    value: 'Java Full-Stack Developer',
    org: 'Infosys Springboard',
    detail: 'Aug – Oct 2026',
  },
  focus: ['Java', 'Spring Boot', 'MERN', 'REST APIs', 'Google Cloud'],
  location: 'Bhubaneswar, India',
  locationNote: 'Remote & On-Site Ready',
}

export type SkillCategory = {
  title: string
  subtitle?: string
  badge?: string
  size: 'hero' | 'wide' | 'std'
  items: { name: string; icon: string }[]
}

/** `icon` maps to a key in components/SkillIcon.tsx */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Backend',
    subtitle: 'Microservices & REST APIs',
    badge: 'Core',
    size: 'std',
    items: [
      { name: 'Java', icon: 'java' },
      { name: 'Spring Boot 3', icon: 'spring' },
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  {
    title: 'Database & Caching',
    subtitle: 'SQL, NoSQL & in-memory stores',
    badge: 'Data',
    size: 'std',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Flyway', icon: 'api' },
    ],
  },
  {
    title: 'Security & Auth',
    subtitle: 'Stateless tokens & RBAC',
    badge: 'Auth',
    size: 'std',
    items: [
      { name: 'Spring Security', icon: 'shield' },
      { name: 'Stateless JWT', icon: 'jwt' },
      { name: 'OAuth2 SSO', icon: 'shield' },
      { name: 'RBAC Access', icon: 'shield' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    subtitle: 'Containers & cloud ops',
    badge: 'Cloud',
    size: 'std',
    items: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Google Cloud', icon: 'gcloud' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Git & GitHub', icon: 'git' },
    ],
  },
  {
    title: 'Frontend & PWA',
    subtitle: 'Modern React & offline PWAs',
    badge: 'Web',
    size: 'std',
    items: [
      { name: 'React 18', icon: 'react' },
      { name: 'PWA Offline', icon: 'web' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'HTML5 / CSS3', icon: 'web' },
    ],
  },
  {
    title: 'AI & Developer Tools',
    subtitle: 'Edge AI, WebRTC & API testing',
    badge: 'AI',
    size: 'std',
    items: [
      { name: 'Gemini AI', icon: 'ai' },
      { name: 'ONNX / WASM', icon: 'ai' },
      { name: 'Postman', icon: 'postman' },
      { name: 'WebRTC', icon: 'web' },
    ],
  },
]

export const heroStats = [
  { value: '40%', label: 'Faster API responses' },
  { value: '3', label: 'Shipped projects' },
  { value: '3', label: 'Internships & programmes' },
]

export type Project = {
  name: string
  tagline: string
  desc: string
  problem: string
  approach: string[]
  impact: string[]
  metrics?: { value: string; label: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  icon: 'leaf' | 'brain' | 'cube' | 'cart' | 'book' | 'chat'
}

export const projects: Project[] = [
  {
    name: 'Carbon Tracker Full-Stack PWA',
    tagline: 'Real-time carbon accounting & ESG analytics platform',
    desc: 'Automated carbon tracking, time-series ESG analytics, and Gemini AI sustainability insights.',
    problem:
      'Teams and individuals lack a unified tool to track daily CO2e across transport, energy, and diet without manual spreadsheets.',
    approach: [
      'Spring Boot 3 rule engine with MySQL & Flyway across 24+ IPCC/EPA emission factors.',
      'Redis-cached JPQL aggregations (<100ms) with JWT, Google OAuth2 & 3-tier RBAC.',
      'Installable React 18 PWA with Recharts analytics, Gemini AI insights & 70+ languages.',
    ],
    impact: [
      'Real-time kg CO2e tracking with gamified streaks, badges, and peer leaderboards.',
      'Automated multi-tenant CSR / ESG reporting with zero manual spreadsheet rollups.',
    ],
    stack: ['Spring Boot 3', 'Java 17', 'React 18 PWA', 'MySQL', 'Redis', 'JWT + OAuth2', 'Gemini AI'],
    links: [
      {
        label: 'GitHub Code',
        href: 'https://github.com/sandeepbehera21/Web-Based-Sustainability-Analytics-and-Carbon-Emission-Monitoring-Platform',
      },
    ],
    icon: 'leaf',
  },
  {
    name: 'MindEase — Mental Health Platform',
    tagline: 'Privacy-first telehealth with on-device emotion AI',
    desc: 'HIPAA-conscious mental health portal with edge emotion AI, encrypted notes, and WebRTC video.',
    problem:
      'Cloud video processing raises privacy and latency risks in telehealth, while patient self-care tools stay siloed from clinicians.',
    approach: [
      'On-device ONNX / WASM facial emotion pipeline — webcam frames never leave the browser.',
      'AES-256-GCM encrypted clinical notes with RSA-2048 signed session PDFs.',
      'FastAPI WebSocket AI companion ("Rahat") paired with Agora WebRTC video calls.',
    ],
    impact: [
      '100% client-side video privacy with zero external video streaming overhead.',
      'Sub-50ms 60 FPS local inference backed by an immutable clinician consent log.',
    ],
    stack: ['FastAPI', 'React.js', 'Python', 'ONNX / WASM', 'WebRTC', 'AES-256', 'Docker'],
    links: [
      {
        label: 'GitHub Code',
        href: 'https://github.com/sandeepbehera21/AI_for_social_impact',
      },
      {
        label: 'Live Link',
        href: 'https://mindease-ai-sd.vercel.app/',
      },
    ],
    icon: 'brain',
  },
  {
    name: 'Craft Connect MERN',
    tagline: 'AI storytelling on a cloud-native artisan marketplace',
    desc: 'Cloud-native marketplace connecting traditional artisans with global buyers using Gemini AI storytelling.',
    problem:
      'Local artisans have authentic craft stories but lack copywriting tools and digital reach beyond local markets.',
    approach: [
      'Gemini AI generates rich product stories from brief artisan prompts.',
      'Stateless Node.js & Express APIs deployed on Google Cloud App Engine.',
      'Social-sharing hooks turn every product listing into a shareable storefront.',
    ],
    impact: [
      'Eliminates the copywriting barrier for non-technical artisans.',
      'Live, autoscaled production deployment on Google Cloud.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Google Cloud', 'Gemini API', 'React.js'],
    links: [
      { label: 'GitHub Code', href: 'https://github.com/sandeepbehera21/CraftConnect' },
      { label: 'Live Link', href: 'https://craftconnect-hackathon-2025.uc.r.appspot.com/' },
    ],
    icon: 'cube',
  },
]

export type Experience = {
  title: string
  company: string
  period: string
  location: string
  description: string[]
  tech: string[]
  wins?: string[]
  certificate?: string
  status?: string
}

export const experiences: Experience[] = [
  {
    title: 'Java Full-Stack Developer Intern',
    company: 'Infosys Springboard',
    period: 'Aug 2026 – Oct 2026',
    location: 'Remote',
    description: [
      'Architected a full-stack Carbon Emission Monitoring platform with Spring Boot 3 & React 18 PWA.',
      'Built Spring Security 6 auth with stateless JWT, Google OAuth2 SSO, and 3-tier RBAC.',
      'Designed normalized MySQL schemas with Flyway and a 24-factor IPCC/EPA calculation engine.',
    ],
    tech: ['Spring Boot 3', 'Java 17', 'React.js', 'MySQL', 'Redis', 'JWT', 'OAuth2'],
    wins: [
      'Selected as official batch highlight and merged into the Infosys Springboard repo.',
      'Sub-100ms dashboard loads via JPQL query tuning and Redis caching.',
    ],
    certificate: 'https://springboard.infosys.com',
    status: 'Completed',
  },
  {
    title: 'Web Developer Intern',
    company: 'INFOTACT Solutions',
    period: 'Apr 2025 – Jun 2025',
    location: 'Remote',
    description: [
      'Built full-stack MERN applications with RESTful APIs and JWT authentication.',
      'Integrated React frontends with Node.js, Express, and MongoDB backend services.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    wins: [
      '40% faster API response times through MongoDB query indexing.',
      'Added structured production logging and real-time metrics.',
    ],
    certificate: '/sandeep-infotact.pdf',
    status: 'Completed',
  },
  {
    title: 'AI & Cloud Programme',
    company: 'Edunet Foundation',
    period: 'Sep 2025 – Oct 2025',
    location: 'Remote',
    description: [
      'Built and deployed end-to-end AI & cloud web apps under the AICTE collaboration.',
      'Designed scalable NoSQL schemas for e-commerce workflows.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    wins: [
      'Certified by AICTE & Edunet Foundation (ID: STU66a54e98943d61722109592).',
    ],
    certificate: '/AICTE B4 PD Completion-908.pdf',
    status: 'Completed',
  },
]

export const systemDesign = [
  {
    title: 'For MERN',
    body: 'End-to-end web apps with React, Node.js, Express, and MongoDB — using REST APIs, JWT auth, and Redis caching.',
  },
  {
    title: 'For Java',
    body: 'Enterprise backends with layered architecture (Controller → Service → Repository), JWT security, and tuned SQL.',
  },
]
