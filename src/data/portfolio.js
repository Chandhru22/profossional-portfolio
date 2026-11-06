// ============================================================
// EDITABLE PORTFOLIO CONTENT
// Every piece of text, link and project shown on the site lives here.
// Values marked "PLACEHOLDER" must be replaced with your real details.
// ============================================================

export const profile = {
  name: 'BalaChandhru. P',
  shortName: 'BalaChandhru',
  headline: "Hi, I'm",
  roles: ['Python Full Stack Developer'],
  pitch:
    "I'm a passionate Python Full Stack Developer who loves building modern web applications, developing powerful backend systems, and creating seamless user experiences. I enjoy turning real-world ideas into functional digital solutions using modern technologies.",
  photo: '/profile.jpg', // PLACEHOLDER: put your photo at public/profile.jpg
  resume: '/resume.pdf', // PLACEHOLDER: put your resume at public/resume.pdf
  email: 'chandhruc425@gmail.com', // PLACEHOLDER
  github: 'https://github.com/Chandhru22/chandhru-portfolio', // PLACEHOLDER
  linkedin: 'https://www.linkedin.com/in/bala-chandhru-4a11b7376/', // PLACEHOLDER
  githubDisplay: 'github.com/balachandhru',
  linkedinDisplay: 'linkedin.com/in/balachandhru',
  statusText: 'System Status: 100% Operational',
  availability:
    'Open for full-time Python Full Stack opportunities, software engineering roles, and high-impact distributed web contracts.',
  footerNote: 'Built with React, Vite, Tailwind CSS and Framer Motion.',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const heroBadges = [
  { label: 'Python 3.12', position: 'top-left' },
  { label: 'Django & DRF', position: 'top-right' },
  { label: 'React.js', position: 'bottom-right' },
  { label: 'MySQL / SQL', position: 'bottom-left' },
];

export const aboutStory = {
  eyebrow: 'Engineering Journey',
  intro:
    "I'm BalaChandhru. P, a Python Full Stack Developer with an Electronics and Communication Engineering background and a strong passion for software development.",
  body:
    'My core expertise is Python backend development using Django and Django REST Framework. I also work with frontend technologies to build complete and responsive web applications. I enjoy developing real-world projects, solving technical challenges, designing REST APIs, and continuously improving my development skills.',
  meta: [
    { label: 'Core Philosophy', value: 'Clean APIs • Zero Fluff' },
    { label: 'Background', value: 'ECE • Hardware Logic' },
  ],
};

export const focusCards = [
  {
    number: '01',
    title: ['Backend', 'Engineering'],
    body: 'Robust Django and DRF micro-architecture, clean API design patterns, JWT-based security protocols, and high-performance ORM querying.',
    tags: 'Python • Django • DRF',
    icon: 'Server',
  },
  {
    number: '02',
    title: ['Frontend', 'Development'],
    body: 'Interactive React interfaces, reactive state flows, responsive grid frameworks with Tailwind, and refined developer-grade user experiences.',
    tags: 'React • JS • Tailwind',
    icon: 'Monitor',
    accent: 'cyan',
  },
  {
    number: '03',
    title: ['Database', 'Management'],
    body: 'Relational modeling in MySQL & PostgreSQL, rigorous ACID transactions, indexed query patterns, and normalized schema design.',
    tags: 'MySQL • Postgres • SQLite',
    icon: 'Database',
    accent: 'periwinkle',
  },
];

// Skill categories. `highlight: true` marks the emphasised pills from the design.
export const skillCategories = [
  {
    id: 'python',
    category: 'Category 01',
    tag: 'CPython 3.x',
    title: 'Python Programming',
    description: 'High-level algorithms, advanced design patterns, and asynchronous computing primitives.',
    icon: 'Terminal',
    accent: 'lilac',
    items: [
      'Python Fundamentals',
      'OOP (Object-Oriented)',
      'Data Structures & Algorithms',
      'Exception Handling',
      'File Handling',
      'Modules & Packages',
      'Lambda Functions',
      'List Comprehensions',
      'Decorators',
      'Generators',
    ],
  },
  {
    id: 'backend',
    category: 'Category 02',
    tag: 'Microservices',
    title: 'Backend Development',
    description: 'Server architectures, REST endpoint schemas, token-based authentication, and ORM pipelines.',
    icon: 'Server',
    accent: 'cyan',
    items: [
      { name: 'Django', highlight: true },
      { name: 'Django REST Framework', highlight: true },
      'Flask',
      'REST API Development',
      'CRUD Operations',
      'Django ORM',
      'Model Relationships',
      'JWT Authentication',
      'Auth & Permissions',
      'API Integration',
    ],
  },
  {
    id: 'frontend',
    category: 'Category 03',
    tag: 'Modern UI/UX',
    title: 'Frontend Development',
    description: 'Semantic page structures, responsive fluid styling, dynamic single-page applications.',
    icon: 'Monitor',
    accent: 'periwinkle',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', { name: 'React.js', highlight: true }, 'Responsive Web Design', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    id: 'database',
    category: 'Category 04',
    tag: 'RDBMS',
    title: 'Database Management',
    description: 'Relational schema normalizations, joins, complex subqueries, and data integrity constraints.',
    icon: 'Database',
    accent: 'cyan',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL Queries', 'Joins & Aggregations', 'Subqueries', 'Database Relationships', 'Database Design'],
  },
  {
    id: 'tools',
    category: 'Category 05',
    tag: 'CI/CD & Workflows',
    title: 'Tools & Infrastructure',
    description: 'Version control, API validation harnesses, isolated development sandboxes, and modern deployment toolchains.',
    icon: 'Wrench',
    accent: 'lilac',
    wide: true,
    items: ['Git & GitHub', 'VS Code', 'Postman', 'REST API Testing', 'Virtual Environments', 'Deployment Basics', 'Environment Config', 'Agile Architecture'],
  },
];

// PLACEHOLDER: replace liveUrl and repoUrl with real links. Keep "#" until then.
// PLACEHOLDER: add your mockup at public/projects/<image>. The card falls back to a gradient if it is missing.
export const projects = [
  {
    title: 'LinkedIn Growth Website',
    label: 'Client Project',
    description:
      'Designed and developed a professional website for a client focused on LinkedIn growth and digital presence. Features seamless lead-capture flows and automated REST hooks.',
    tech: ['Python', 'Django', 'Tailwind CSS', 'REST API'],
    image: '/projects/linkedin-growth.png',
    liveUrl: 'https://linkdin-grow-bringing.vercel.app/',
    repoUrl: '#',
    accent: 'cyan',
  },
  {
    title: 'E-Commerce Platform',
    label: 'Full Stack Development',
    description:
      'Developed an e-commerce web application featuring product listings, shopping functionality, cart persistency, and a user-friendly interface powered by Django REST Framework.',
    tech: ['Python', 'Django DRF', 'React.js', 'MySQL'],
    image: '/projects/ecommerce.png',
    liveUrl: '#',
    repoUrl: '#',
    accent: 'lilac',
  },
  {
    title: 'Food Ordering App',
    label: 'Web Application',
    description:
      'Built a food application that allows users to explore food items and interact with an online ordering platform. Streamlined with reactive React components and SQLite database backstop.',
    tech: ['React.js', 'Django', 'SQLite', 'REST API'],
    image: '/projects/food-app.png',
    liveUrl: '#',
    repoUrl: '#',
    accent: 'periwinkle',
  },
];

// PLACEHOLDER: confirm the company name and dates before publishing.
export const experience = [
  {
    type: 'Internship',
    title: 'Python Full Stack Developer Intern',
    organization: 'Besant Technologies', // PLACEHOLDER: confirm
    period: '[Add dates]', // PLACEHOLDER
    summary:
      'Spearheaded full stack features by building robust RESTful endpoints with Django REST Framework, integrating database schemas in MySQL, and connecting asynchronous data to reactive frontend interfaces.',
    highlights: [
      'Engineered modular REST APIs adhering to strict serialization, validation, and JWT authentication guidelines.',
      'Optimized relational queries with Django ORM to eliminate N+1 latency bottlenecks across product collections.',
      'Collaborated with cross-functional developers using Git version control and participated in sprint reviews.',
    ],
    tags: ['Django', 'DRF', 'Python', 'React.js', 'MySQL', 'Postman'],
    current: true,
  },
  {
    type: 'Freelance / Contract',
    title: 'Independent Full Stack Engineer',
    organization: 'Bespoke Client Deliveries',
    period: 'Project-Based / Ongoing',
    summary:
      'Consulted and developed custom digital presence web apps including client personal growth platforms, implementing clean user interface layouts, secure email gateways, and hosting setup.',
    highlights: [],
    tags: [],
    current: false,
  },
];

// PLACEHOLDER: set your graduation year. Use the status that matches your situation.
export const education = {
  degree: 'Bachelor of Engineering (B.E.)',
  field: 'Electronics and Communication Engineering',
  institution: 'Jayaraj Annapackiam CSI College of Engineering',
  description:
    'Solidified strong foundations in digital electronics, microprocessors, algorithmic logic, computer networks, and object-oriented systems.',
  graduationYear: '[Graduation Year]', // PLACEHOLDER
  status: 'Degree Conferred', // PLACEHOLDER: change to "Pursuing" if still studying
};

export const contactChannels = [
  { label: 'Direct Email', value: profile.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`, icon: 'Mail' },
  { label: 'Professional Network', value: profile.linkedinDisplay, href: profile.linkedin, icon: 'Share2' },
  { label: 'Code Repositories', value: profile.githubDisplay, href: profile.github, icon: 'Code2' },
];

export const contactForm = {
  heading: "Have an Idea? Let's Build It Together.",
  eyebrow: 'Get in Touch',
  description:
    "I'm always open to connecting with developers, recruiters, and people who are passionate about technology and innovation.",
  subjectPlaceholder: 'Python Full Stack Opportunity / Project Collaboration',
  messagePlaceholder: 'Tell me about your application requirements, timeline, or engineering role...',
};
