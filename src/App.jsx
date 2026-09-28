import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, ArrowRight, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

import TechBanner from './components/TechBanner';

const skills = [
    { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "SQL"] },
    { label: "Backend", items: ["NestJS", "Django", "DRF", "Flask", "FastAPI", "Node.js", "Express"] },
    { label: "Frontend", items: ["React", "Next.js", "Redux", "TailwindCSS", "Material-UI"] },
    { label: "Cloud", items: ["AWS", "GCP", "Lambda", "RDS", "S3", "Firebase"] },
    { label: "Databases", items: ["PostgreSQL", "MySQL", "MSSQL", "MongoDB", "Firestore", "Prisma"] },
    { label: "DevOps", items: ["Docker", "Nx", "CI/CD", "GitHub Actions", "SonarQube", "Trivy"] },
    { label: "Testing", items: ["Jest", "Vitest", "Pytest", "Cucumber/Gherkin", "LocalStack", "TDD"] },
    { label: "APIs & Events", items: ["REST", "OpenAPI", "WebSockets", "Socket.IO", "Event-driven"] },
    { label: "Integrations", items: ["Stripe Connect", "Twilio", "OAuth 2.0", "JWT", "MetaTrader 5"] },
    { label: "AI-Assisted", items: ["Claude Code CLI", "GitHub Copilot", "LLMs", "Prompt Engineering"] },
];

const links = [
    { href: "https://github.com/paulaji", label: "GitHub", icon: <Github className="w-4 h-4" /> },
    { href: "https://linkedin.com/in/paulaji/", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
];

function SectionHeading({ eyebrow, title, id }) {
    return (
        <div id={id} className="scroll-mt-24 mb-10 sm:mb-12">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-3">{eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{title}</h2>
        </div>
    );
}

export default function Portfolio() {
    const [activeProject, setActiveProject] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);

    const projects = [
        {
            id: 0,
            title: "Merchant Payments Platform",
            subtitle: "Settlement, Reconciliation & Billing",
            company: "Infinite Payment Technology",
            role: "Full Stack Developer · Settle Team",
            description: "Full stack developer on the Settle core team of a merchant onboarding and payments platform, building money movement, reconciliation, merchant billing/statements, and retry systems integrating with acquirers and processors (Worldline, ACI, Banking Circle, B4B).",
            highlights: [
                "Work in an Nx monorepo spanning multiple deployable modules: payment/settlement services run as AWS Lambda, other modules as standalone apps; Vitest and Jest across the codebase",
                "PostgreSQL via AWS RDS with Prisma ORM (Prisma Studio, DBeaver for inspection); config and secrets managed via AWS Parameter Store",
                "Built event-driven Lambda pipelines triggered by S3 uploads: parsing CSV/XML merchant files, matching records against a merchant DB, persisting unmatched records, and emailing unmatched-record reports as CSV",
                "Refactored three separate settlement report features (daily, daily rejected, incomplete) onto one shared query/CSV/orchestration layer, removing duplicated logic",
                "Built the VAT Summary of the merchant billing statement using safe decimal (BigNumber) arithmetic and country-based VAT rate lookups",
                "Fixed a product-pricing bug routing fixed monthly/annual charges to the wrong pricing table; added coverage across all charge-type paths with manual regression testing",
                "Migrated an overkill standalone LegitScript compliance Lambda into the shared NestJS gateway; diagnosed a recurring first-of-month fee bug and proposed a new handler design",
                "Advocated separating transaction-driven vs product-driven settle-calc (cron over transaction SQS) to fix reliability issues",
                "Integration tests in Gherkin/Cucumber (Jest, Vitest) run against Dockerized DBs; migrated AWS mocking from LocalStack to Flocci (open source)",
                "Structured JSON logging (CloudWatch) + PostHog error tracking; extended audit-log redaction to cover missed sensitive fields (tokens, salts); fixed GitHub Actions CI failures from transitive dependency issues",
                "Code goes through SonarQube static analysis, Trivy scans, and Copilot-assisted reviews; cross-team changes require code-captain sign-off. Day-to-day with Claude Code CLI, Copilot, JIRA/GitHub MCP; collaborate with design, BA, and devs",
            ],
            tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "AWS Lambda", "AWS RDS", "S3", "SQS", "Nx", "Vitest", "Jest", "Cucumber/Gherkin", "Docker", "CloudWatch", "GitHub Actions"],
            images: [],
        },
        {
            id: 1,
            title: "FindASide",
            subtitle: "Sports Facility Booking Marketplace",
            company: "Pixel Forge Design Limited",
            role: "Backend Engineer",
            description: "A sports facility booking and payment marketplace with real-time payment processing.",
            highlights: [
                "Architected scalable payment marketplace using Stripe Connect handling real-time payment intents, secure payouts, automated refunds, and recurring transactions",
                "Developed distributed Node.js backend with Firestore NoSQL database, optimized for performance and horizontal scalability",
                "Designed RESTful APIs for booking management and payment processing with Firebase Authentication",
                "Established CI/CD pipeline using GitHub Actions enabling automated testing and zero-downtime deployments",
                "Implemented comprehensive error handling, distributed logging, and real-time monitoring"
            ],
            tech: ["Node.js", "Firestore", "Stripe Connect", "Firebase", "GitHub Actions", "RESTful APIs"],
            images: ['./projectsnippets/FindASide.png', './projectsnippets/FindASideLogin.png', './projectsnippets/FindASidePayment.png'],
        },
        {
            id: 2,
            title: "MahaMeru Innovations",
            subtitle: "Full Stack Web Application",
            company: "Ineffable Design Solutions",
            role: "Lead Full Stack Engineer",
            description: "Dynamic, multilingual full-stack application with advanced animations and CDN optimization.",
            highlights: [
                "Led team to build dynamic, multilingual full-stack app using Next.js with server-side rendering",
                "Designed and implemented data structures, managed MySQL database, and developed custom APIs for production traffic",
                "Integrated TailwindCSS, GSAP-like animations and Lottie animations for interactive user experience",
                "Built custom CMS dashboard to manage all site content and images",
                "Architected network infrastructure using Cloudflare CDN with intelligent routing and edge caching"
            ],
            tech: ["Next.js", "React", "MySQL", "TailwindCSS", "Cloudflare CDN", "Lottie"],
            images: ['./projectsnippets/MahaMeru.png', './projectsnippets/MahaMeruAnimation.png', './projectsnippets/MahaMeruLogo.png'],
        },
        {
            id: 3,
            title: "TrustPMS",
            subtitle: "Internal Project Management System",
            company: "Trusttech Solutions LLP",
            role: "Fullstack Python Developer",
            description: "Enterprise project management system handling payroll, attendance, and bug tracking for 50+ employees.",
            highlights: [
                "Built TrustPMS handling payroll, attendance, and bug tracking for 50+ employees",
                "Implemented using React.js, Redux, Socket.io, Django/DRF, MSSQL, and Docker",
                "Container orchestration on AWS ECS for high availability, auto-scaling, and health checks",
                "Real-time notifications and data synchronization across distributed teams"
            ],
            tech: ["React.js", "Redux", "Django", "DRF", "MSSQL", "Docker", "AWS ECS", "Socket.io"],
            images: ['./projectsnippets/TrustPMS.png'],
        },
        {
            id: 4,
            title: "Trust Capital CRM",
            subtitle: "Cryptocurrency Trading Platform",
            company: "Trusttech Solutions LLP",
            role: "Fullstack Python Developer",
            description: "High-performance CRM serving 4000+ active traders with real-time market data and WebSocket notifications.",
            highlights: [
                "Maintained and extended cryptocurrency trading platform CRM built with Django and Django REST Framework",
                "Served 4000+ active traders with real-time market data integration",
                "Developed new APIs for trade execution and integrated MetaTrader 5 DLL for account data",
                "Implemented WebSocket-based notifications for instant alerts to concurrent traders",
                "Optimized MSSQL queries for high-frequency trading data retrieval"
            ],
            tech: ["Django", "Django REST Framework", "WebSockets", "MetaTrader 5", "MSSQL", "Real-time Systems"],
            images: ['./projectsnippets/TrustCapitalCRM.png'],
        },
        {
            id: 5,
            title: "Learning to Program",
            subtitle: "AI-Powered Educational Platform",
            company: "University of Limerick",
            role: "MEng Thesis Project",
            description: "AI-powered Python learning platform using LLMs to generate personalized feedback and programming questions.",
            highlights: [
                "Built full-stack web app to teach Python using React.js (frontend) and Flask (backend)",
                "Leveraged Groq API, Prompt Engineering, NLP techniques and Llama 3.3 70B AI model",
                "Generated programming questions, feedback, and tips across six topics",
                "Implemented Pyodide for in-browser Python code execution with real-time feedback",
                "Grade: A1 | Demonstrates expertise in GenAI and agentic AI workflows"
            ],
            tech: ["React.js", "Flask", "Groq API", "Llama 3.3", "Pyodide", "NLP", "Prompt Engineering"],
            images: ['./projectsnippets/FinalProject.jpeg'],
        },
        {
            id: 6,
            title: "Carvetpro",
            subtitle: "Full-Stack Platform",
            company: "Ineffable Design Solutions",
            role: "Development Coordinator",
            description: "Full-stack platform with advanced AWS network architecture and automated PDF generation.",
            highlights: [
                "Coordinated 3-person engineering team using agile methodologies and conducted code reviews",
                "Designed AWS network architecture with CloudFront CDN, S3 origin configuration, and CloudWatch monitoring",
                "Built React.js frontend and Node.js backend with Google OAuth authentication",
                "Automated PDF generation via Twilio WhatsApp integration"
            ],
            tech: ["React.js", "Node.js", "AWS", "CloudFront", "Google OAuth", "Twilio", "WhatsApp API"],
            images: ['./projectsnippets/CarvetPro.png'],
        },
        {
            id: 7,
            title: "Discord Bots",
            subtitle: "Community Engagement Tools",
            company: "Wrecked Tech Private Limited",
            role: "Solutions Developer",
            description: "Development of multiple Discord bots for user engagement.",
            highlights: [
                "OpenAI API powered community chatbot",
                "cr(AI)yon API powered image generator",
                "Poll bot",
                "Feedback bot - Routed to Admin channels",
            ],
            tech: ["Discord.js", "Discord.py"],
            images: ['./projectsnippets/gator1.png', './projectsnippets/gator2.png', './projectsnippets/gator3.png', './projectsnippets/gptbot1.png', './projectsnippets/gptbot2.png', './projectsnippets/nortpoll1.png', './projectsnippets/nortpoll2.png'],
        },
        {
            id: 8,
            title: "Biowel Website",
            subtitle: "Corporate Web Presence",
            company: "Biowel Industries",
            role: "Web Developer",
            description: "Design, Development, Hosting and Maintenance of the company website.",
            highlights: [
                "Company Website",
            ],
            tech: ["Figma", "Node.js", "React.js", "AWS", "VPS"],
            images: ['./projectsnippets/biowelweb1.png', './projectsnippets/biowelweb2.png', './projectsnippets/biowelweb3.png'],
        }
    ];

    const achievements = [
        {
            title: "AI & Agentic Systems Consultant",
            subtitle: "Medical Company Mentorship",
            description: "Consulting on building agentic AI systems to improve sales, sales insights, and business automation"
        },
        {
            title: "Frontend Developer",
            subtitle: "Edith - EdTech Startup",
            description: "Built user-facing features for an educational technology platform"
        },
        {
            title: "AI & Prompt Engineering Educator",
            subtitle: "Sevana Electricals & Biowel Inc",
            description: "Conducted multiple Prompt Engineering and AI classes for businesses (30-50 attendees each)"
        },
        {
            title: "Java Teaching Assistant",
            subtitle: "University of Limerick",
            description: "Mentored undergrad software engineering students for a brief time"
        },
        {
            title: "Lead Vocal Singer",
            subtitle: "College Band - ASIET",
            description: "Performed at college events and cultural activities"
        },
        {
            title: "Event Organizer & Coordinator",
            subtitle: "Adi Shankara Institute",
            description: "Organized and coordinated Industrial Visits, Cultural Fests (Christmas, Halloween), and college events"
        },
        {
            title: "Academic Awards",
            subtitle: "Proficiency Award & Student of the Year",
            description: "Recognized for academic excellence and leadership throughout schooling"
        },
        {
            title: "Community Mentor",
            subtitle: "Peer Programming Educator",
            description: "Helped friends and peers learn programming concepts and best practices"
        },
        {
            title: "Sports & Cultural Activities",
            subtitle: "Multi-Sport Participant",
            description: "Active participation in multiple sports and cultural events at ASIET"
        }
    ];

    const project = activeProject === null ? null : projects.find((p) => p.id === activeProject);
    const [featured, ...rest] = projects;

    const openProject = (id) => {
        setActiveProject(id);
        setImageIndex(0);
    };
    const closeProject = () => setActiveProject(null);

    useEffect(() => {
        if (!project) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setActiveProject(null);
            if (e.key === 'ArrowRight') setImageIndex((i) => Math.min(i + 1, project.images.length - 1));
            if (e.key === 'ArrowLeft') setImageIndex((i) => Math.max(i - 1, 0));
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [project]);

    return (
        <div className="min-h-screen bg-[var(--bg)] text-zinc-300 antialiased selection:bg-[var(--accent)] selection:text-black">
            <style>{`
        :root { --bg: #0B0B0D; --surface: #131316; --accent: #F2A65A; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); }
        * { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .card { background: var(--surface); border: 1px solid rgb(255 255 255 / 0.07); border-radius: 1rem; transition: border-color .2s, transform .2s, background .2s; }
        .card-hover:hover { border-color: rgb(242 166 90 / 0.45); transform: translateY(-2px); }
        .glow { background: radial-gradient(600px circle at 20% 0%, rgb(242 166 90 / 0.12), transparent 60%); }
      `}</style>

            {/* Navigation */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--bg)]/75 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <a href="#" className="text-white font-semibold tracking-tight">Paul Aji</a>
                    <div className="flex items-center gap-5 sm:gap-8 text-sm">
                        <a href="#work" className="text-zinc-400 hover:text-white transition">Work</a>
                        <a href="#skills" className="text-zinc-400 hover:text-white transition">Skills</a>
                        <a href="#contact" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-1.5 font-medium hover:bg-[var(--accent)] transition">
                            Contact
                        </a>
                        <a href="#contact" className="sm:hidden text-zinc-400 hover:text-white transition">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative glow pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-8">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            Available for work
                            <span className="text-zinc-600">·</span>
                            <MapPin className="w-3 h-3" /> Dublin, Ireland
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-semibold tracking-[-0.04em] text-white leading-[1.02]">
                            Paul Aji
                        </h1>
                        <p className="mt-4 text-xl sm:text-2xl text-zinc-400 tracking-tight">
                            Full-stack engineer building <span className="text-[var(--accent)]">payments</span> &amp; cloud systems.
                        </p>
                        <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
                            3+ years shipping production systems in Python and TypeScript. Currently on the Settle team at <span className="text-zinc-200">Infinite Payment Technology</span>, making sure money moves, reconciles and bills correctly, because &lsquo;close enough&rsquo; isn&rsquo;t a feature in payments. MEng in Computer Vision &amp; AI, <span className="text-zinc-200">First Class Honours</span>, University of Limerick.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-black px-5 py-2.5 text-sm font-medium hover:bg-white transition">
                                See my work <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="mailto:paulajiparayil123@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white hover:bg-white/5 transition">
                                <Mail className="w-4 h-4" /> Email me
                            </a>
                            {links.map(({ href, label, icon }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-zinc-300 hover:text-white hover:bg-white/5 transition">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <img
                            src="./otherimages/profilephoto.jpg"
                            alt="Paul Aji"
                            className="w-72 h-80 object-cover rounded-3xl border border-white/10 shadow-2xl shadow-black/50"
                        />
                    </div>
                </div>

                {/* Quick facts */}
                <div className="max-w-6xl mx-auto mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.07]">
                    {[
                        ["3+ yrs", "Production engineering"],
                        ["4,000+", "Traders served on CRM"],
                        ["First Class", "MEng, CV & AI"],
                        ["Payments", "Settlement · Billing · Recon"],
                    ].map(([value, label]) => (
                        <div key={label} className="bg-[var(--bg)] px-5 py-6">
                            <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{value}</p>
                            <p className="mt-1 text-xs sm:text-sm text-zinc-500">{label}</p>
                        </div>
                    ))}
                </div>
            </header>

            {/* Work */}
            <section className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading id="work" eyebrow="Selected work" title="Things I've built" />

                    {/* Featured / current */}
                    <button onClick={() => openProject(featured.id)} className="card card-hover w-full text-left p-6 sm:p-10 mb-5 group">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-medium px-3 py-1">Current role</span>
                            <span className="text-sm text-zinc-500">{featured.company} · {featured.role}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{featured.title}</h3>
                        <p className="mt-1 text-zinc-400">{featured.subtitle}</p>
                        <p className="mt-5 max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-400">{featured.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {featured.tech.slice(0, 8).map((t) => (
                                <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-300">{t}</span>
                            ))}
                            {featured.tech.length > 8 && <span className="px-1 py-1 text-xs text-zinc-500">+{featured.tech.length - 8} more</span>}
                        </div>
                        <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-white group-hover:text-[var(--accent)] transition">
                            Read the details <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                        </span>
                    </button>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        {rest.map((p) => (
                            <button key={p.id} onClick={() => openProject(p.id)} className="card card-hover text-left overflow-hidden flex flex-col group">
                                {p.images.length > 0 && (
                                    <div className="aspect-[16/9] overflow-hidden bg-black/40 border-b border-white/5">
                                        <img src={p.images[0]} alt={p.title} loading="lazy"
                                            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition duration-500" />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-xs text-zinc-500">{p.company}</p>
                                    <div className="mt-2 flex items-start justify-between gap-3">
                                        <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                                        <ArrowUpRight className="w-4 h-4 mt-1 flex-shrink-0 text-zinc-500 group-hover:text-[var(--accent)] transition" />
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 flex-1">{p.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {p.tech.slice(0, 4).map((t) => (
                                            <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading id="skills" eyebrow="Toolkit" title="What I work with" />
                    <TechBanner />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((category) => (
                            <div key={category.label} className="card p-5">
                                <h3 className="text-sm font-medium text-white mb-3">{category.label}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {category.items.map((item) => (
                                        <span key={item} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-400">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education + Beyond */}
            <section className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16">
                    <div>
                        <SectionHeading eyebrow="Education" title="Background" />
                        <div className="space-y-4">
                            <div className="card p-6">
                                <p className="text-xs text-zinc-500">Sep 2024 – Sep 2025</p>
                                <h3 className="mt-2 font-semibold text-white">MEng, Computer Vision &amp; Artificial Intelligence</h3>
                                <p className="mt-1 text-sm text-zinc-400">University of Limerick</p>
                                <p className="mt-4 inline-block rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-medium px-3 py-1">First Class Honours · QCA 3.37</p>
                            </div>
                            <div className="card p-6">
                                <p className="text-xs text-zinc-500">2018 – Feb 2023</p>
                                <h3 className="mt-2 font-semibold text-white">B.Tech, Computer Science</h3>
                                <p className="mt-1 text-sm text-zinc-400">Adi Shankara Institute of Engineering and Technology</p>
                                <p className="mt-4 text-xs text-zinc-500">GPA 2.76</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <SectionHeading eyebrow="Beyond the code" title="Leadership & more" />
                        <ul className="divide-y divide-white/5 border-y border-white/5">
                            {achievements.map((a) => (
                                <li key={a.title} className="py-4 grid sm:grid-cols-[1fr_1.2fr] gap-1 sm:gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-white">{a.title}</p>
                                        <p className="text-xs text-zinc-500 mt-0.5">{a.subtitle}</p>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{a.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-20 sm:py-28 px-5 sm:px-8 border-t border-white/5" id="contact">
                <div className="max-w-6xl mx-auto">
                    <div className="card glow p-8 sm:p-16 text-center">
                        <p className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--accent)]">Contact</p>
                        <h2 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-white">Let&rsquo;s build something.</h2>
                        <p className="mt-5 text-zinc-400 max-w-xl mx-auto">Open to new roles and collaborations, especially in payments, backend and cloud. My inbox is always open.</p>
                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            <a href="mailto:paulajiparayil123@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-black px-6 py-3 text-sm font-medium hover:bg-white transition">
                                <Mail className="w-4 h-4" /> paulajiparayil123@gmail.com
                            </a>
                            {links.map(({ href, label, icon }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white hover:bg-white/5 transition">
                                    {icon} {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-5 sm:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-2 text-xs text-zinc-600">
                    <p>&copy; {new Date().getFullYear()} Paul Aji</p>
                    <p>Built with React &amp; Tailwind · Dublin, Ireland</p>
                </div>
            </footer>

            {/* Project modal */}
            {project && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-black/80 backdrop-blur-sm" onClick={closeProject}>
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto scrollbar-hide bg-[var(--surface)] border border-white/10 rounded-t-2xl sm:rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 h-0 flex justify-end">
                            <button onClick={closeProject} aria-label="Close"
                                className="mt-3 mr-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-[var(--accent)] hover:text-black transition">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {project.images.length > 0 && (
                            <div className="relative bg-black">
                                <img src={project.images[imageIndex]} alt={`${project.title} ${imageIndex + 1}`} className="w-full max-h-[55vh] object-contain" />
                                {project.images.length > 1 && (
                                    <>
                                        <button aria-label="Previous image" disabled={imageIndex === 0} onClick={() => setImageIndex(imageIndex - 1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white disabled:opacity-0 hover:bg-black/80 transition">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button aria-label="Next image" disabled={imageIndex === project.images.length - 1} onClick={() => setImageIndex(imageIndex + 1)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white disabled:opacity-0 hover:bg-black/80 transition">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                                            {project.images.map((_, i) => (
                                                <button key={i} aria-label={`Image ${i + 1}`} onClick={() => setImageIndex(i)}
                                                    className={`h-1.5 rounded-full transition-all ${i === imageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`} />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="p-6 sm:p-10">
                            <p className="text-xs text-zinc-500">{project.company} · {project.role}</p>
                            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">{project.title}</h3>
                            <p className="mt-1 text-zinc-400">{project.subtitle}</p>
                            <p className="mt-6 text-sm sm:text-base leading-relaxed text-zinc-300">{project.description}</p>

                            <ul className="mt-8 space-y-3">
                                {project.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                                        {h}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-300">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
