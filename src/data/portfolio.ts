/**
 * Single source of truth for portfolio content.
 * Editing copy, projects, or experience should only require changes here.
 */

export const profile = {
  name: 'Sandeep Behera',
  initials: 'SB',
  role: 'Backend Developer',
  tagline: 'Backend Developer | Java Spring Boot & MERN Stack | Building Scalable APIs & Secure Systems',
  summary:
    'Designing backend architectures that scale, perform, and stay reliable — from microservices to full-stack solutions.',
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
  'I’m a Backend Developer who loves turning ideas into scalable, production-ready systems using Java–Spring Boot and the MERN stack. Currently in my 4th year of B.Tech in Computer Science at Centurion University, Bhubaneswar, I enjoy designing robust APIs, optimized databases, and secure authentication flows that power real-world applications.',
  'From REST API design and microservices architecture to cloud deployment on Google Cloud, I’m driven by the challenge of building systems that are both technically strong and impactful in the real world.',
]

/**
 * Small fact cells for the About bento. Kept separate from the paragraphs above.
 * (Avoid the bare word "p-r-o-s-e" in comments here — Tailwind v4 scans source
 * files as plain text, so it would match the typography plugin and emit ~14kB.)
 */
export const aboutFacts = {
  education: {
    label: 'Education',
    value: 'B.Tech, Computer Science',
    org: 'Centurion University, Bhubaneswar',
    detail: '4th year',
  },
  currently: {
    label: 'Programme',
    value: 'Java Full-Stack Developer',
    org: 'Infosys Springboard',
    detail: 'Aug 2026 – Oct 2026',
  },
  focus: ['Java', 'Spring Boot', 'MERN', 'REST APIs', 'Google Cloud'],
  location: 'Bhubaneswar, India',
  locationNote: 'All internships to date were fully remote',
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
    subtitle: 'Scalable microservices & high-throughput APIs',
    badge: 'Core Focus',
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
    subtitle: 'ACID transactions, NoSQL & in-memory stores',
    badge: 'Data Layer',
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
    subtitle: 'Stateless auth, tokens & cryptographic RBAC',
    badge: 'Security',
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
    subtitle: 'Containerization, cloud infrastructure & CI/CD',
    badge: 'Cloud & Ops',
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
    subtitle: 'Responsive UI, offline Service Workers & PWAs',
    badge: 'Client Web',
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
    subtitle: 'On-device inference, WebRTC & API automation',
    badge: 'AI & Tooling',
    size: 'std',
    items: [
      { name: 'Gemini AI', icon: 'ai' },
      { name: 'ONNX / WASM', icon: 'ai' },
      { name: 'Postman', icon: 'postman' },
      { name: 'WebRTC', icon: 'web' },
    ],
  },
]

/**
 * Hero stat strip. Every figure here must be traceable to something else on
 * the page — the 40% comes from the INFOTACT internship wins below.
 */
export const heroStats = [
  { value: '40%', label: 'Faster API responses' },
  { value: '3', label: 'Shipped projects' },
  { value: '3', label: 'Internships & programmes' },
]

export type Project = {
  name: string
  tagline: string
  desc: string
  /** Case-study spine: what was broken → what I built → what changed. */
  problem: string
  approach: string[]
  impact: string[]
  /**
   * Optional highlighted number row. Add ONLY figures you can defend if a judge
   * asks how you measured them (latency, request volume, users, build time).
   * Deliberately empty — invented metrics are the fastest way to lose trust.
   */
  metrics?: { value: string; label: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  icon: 'leaf' | 'brain' | 'cube' | 'cart' | 'book' | 'chat'
}

export const projects: Project[] = [
  {
    name: 'Carbon Tracker Full-Stack PWA',
    tagline: 'Real-time carbon accounting and corporate ESG intelligence for individuals and teams',
    desc: 'Real-time carbon accounting and corporate ESG intelligence platform for individuals and enterprise teams, featuring automated emission calculation, time-series analytics, and Gemini AI reduction roadmaps.',
    problem:
      'Individuals and organizations have no unified way to quantify daily CO2e across commutes, energy, diet, and waste — leaving personal climate goals unmeasurable and corporate ESG reporting stuck in manual spreadsheets.',
    approach: [
      'Built a rule-based emission engine in Spring Boot 3 backed by MySQL & Flyway, applying configurable IPCC/EPA coefficients across 24+ activity types.',
      'Engineered JPQL time-series aggregations with fault-tolerant Redis caching (<100ms reads) and Spring Security 6 (JWT + Google OAuth2) across USER, ORG_ADMIN, and ADMIN roles.',
      'Shipped an installable React 18 PWA with hybrid Service Worker caching, Recharts analytics, Gemini AI reduction insights, and 70+ language support.',
    ],
    impact: [
      'Converts raw daily habits into real-time kg CO2e metrics, streaks, badges, and peer-benchmarked leaderboards instead of static estimates.',
      'Multi-tenant organization portal automates department-level footprint rollups and audit-ready CSR / ESG disclosures with zero manual spreadsheets.',
    ],
    stack: ['Spring Boot 3', 'Java 17', 'React 18 PWA', 'MySQL', 'Redis', 'JWT + OAuth2', 'Gemini AI', 'Recharts'],
    links: [
      {
        label: 'GitHub Code',
        href: 'https://github.com/sandeepbehera21/Web-Based-Sustainability-Analytics-and-Carbon-Emission-Monitoring-Platform',
      },
    ],
    icon: 'leaf',
  },
  {
    name: 'MindEase — Multimodal Mental Health Platform',
    tagline: 'HIPAA-conscious mental health portal with on-device emotion AI and secure telehealth',
    desc: 'HIPAA-conscious mental health platform featuring edge-first on-device facial emotion inference, encrypted clinical notes, real-time AI companion, and secure WebRTC video consultations.',
    problem:
      'Digital mental health portals struggle with patient trust and video privacy: sending raw webcam feeds to cloud servers raises compliance and latency concerns, while patient self-care tools (CBT, journals) remain disconnected from clinician telehealth workflows.',
    approach: [
      'Edge-First ONNX Pipeline: Quantized facial emotion recognition runs locally in multi-threaded WebAssembly / Web Workers — raw video frames never leave the patient’s device.',
      'Cryptographic Session Security: AES-256-GCM encrypted clinical notes and SHA-256 + RSA-2048 digital signatures for tamper-proof post-session medical PDFs.',
      'Real-Time Multimodal Services: FastAPI WebSocket chat companion ("Rahat") with automated distress gating, paired with Agora WebRTC dynamic-token video consultations.',
    ],
    impact: [
      '100% Client-Side Privacy: Zero video data transmitted to external servers, eliminating cloud bandwidth overhead and meeting zero-trust privacy standards.',
      'Sub-50ms Local Inference & Auditability: Real-time 60 FPS emotion inference with zero UI thread blocking, backed by an immutable consent audit log for every doctor query.',
    ],
    stack: ['FastAPI', 'React.js', 'Python', 'ONNX / WASM', 'WebRTC (Agora)', 'Firebase', 'AES-256', 'Docker'],
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
    tagline: 'AI storytelling on a cloud-native marketplace',
    desc: 'CraftConnect connects traditional artisans with global customers using AI-powered storytelling and cloud-native tools — AI Story Generator, Global Marketplace, Social Sharing.',
    problem:
      'Artisans have genuinely compelling stories but no way to write them at scale — and no reach past local buyers.',
    approach: [
      'Gemini API generates product narratives from a few artisan-supplied details',
      'Deployed on Google Cloud App Engine, so capacity follows traffic with no server management',
      'Social-sharing hooks turn every listing into its own distribution surface',
    ],
    impact: [
      'Story generation removes the copywriting barrier to listing a product',
      'Live and publicly reachable on Google Cloud, not a local-only demo',
      'Designed, built and shipped inside a hackathon window',
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
    period: 'August 2026 – October 2026',
    location: 'Remote',
    description: [
      'Architected a full-stack Sustainability & Carbon Emission Monitoring platform using Spring Boot 3 REST APIs and React 18 PWA',
      'Implemented Spring Security 6 authentication with stateless JWT, Google OAuth2 SSO, and 3-tier RBAC (USER, ORG_ADMIN, ADMIN)',
      'Modelled normalized MySQL schemas with Flyway migrations and built a rule-based emission calculation engine across 24+ IPCC/EPA activity types',
      'Integrated Recharts analytics dashboards, event-driven gamification badges, multi-tenant CSR/ESG reporting, and Gemini AI recommendations',
    ],
    tech: ['Spring Boot 3', 'Java 17', 'React.js', 'MySQL', 'Redis', 'JWT', 'OAuth2', 'Flyway'],
    wins: [
      'Project selected as the official batch highlight and merged into the main Infosys Springboard repository',
      'Achieved sub-100ms dashboard load times by optimizing JPQL aggregate queries with fault-tolerant Redis caching',
      'Delivered an installable mobile PWA with offline Service Worker resilience and 70+ language support',
    ],
    certificate: 'https://springboard.infosys.com',
    status: 'Completed',
  },
  {
    title: 'Web Developer Intern',
    company: 'INFOTACT Solutions',
    period: 'April 2025 – June 2025',
    location: 'Remote',
    description: [
      'Developed MERN websites',
      'Implemented JWT auth tokens',
      'Gained hands-on experience in React, Node.js, Express, and MongoDB while collaborating on real-world client projects.',
      'Partnered with frontend to integrate React apps with backend services',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'OAuth'],
    wins: [
      'Achieved 40% faster API responses by optimizing queries and indexing',
      'Production-grade logging and metrics for real-time performance monitoring and debugging',
    ],
    certificate: '/sandeep-infotact.pdf',
    status: 'Completed',
  },
  {
    title: 'AI & Cloud Programme',
    company: 'Edunet Foundation',
    period: 'September 2025 – October 2025',
    location: 'Remote',
    description: [
      'Delivered AI apps end-to-end with Cloud',
      'Designed database schemas for e-commerce flows',
      'Completed 4-week internship on Artificial Intelligence & Cloud Technology in collaboration with AICTE',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    wins: [
      'Certified by All India Council for Technical Education (AICTE) & Edunet Foundation (Student ID: STU66a54e98943d61722109592)',
    ],
    certificate: '/AICTE B4 PD Completion-908.pdf',
    status: 'Completed',
  },
]

export const systemDesign = [
  {
    title: 'For MERN',
    body: 'End-to-end web apps with React, Node.js, Express, and MongoDB — using REST APIs, JWT auth, and Redis caching for performance and stateless sessions.',
  },
  {
    title: 'For Java',
    body: 'Enterprise-grade backends with layered architecture (Controller → Service → Repository), secure JWT authentication, pagination, and database optimization.',
  },
]
