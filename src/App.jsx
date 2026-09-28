import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

const channels = [
    { href: "mailto:paulajiparayil123@gmail.com", label: "Email", value: "paulajiparayil123@gmail.com" },
    { href: "https://linkedin.com/in/paulaji/", label: "LinkedIn", value: "in/paulaji" },
    { href: "https://github.com/paulaji", label: "GitHub", value: "github.com/paulaji" },
];

const fileNo = (i) => `FILE ${String(i + 1).padStart(3, '0')}`;

function SectionHeading({ number, title, note, id }) {
    return (
        <div id={id} className="scroll-mt-20 mb-14 sm:mb-20">
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-[var(--red)]">
                <span>{number}</span>
                <span className="h-px w-16 bg-[var(--red)]" />
                <span className="text-[var(--dim)]">{note}</span>
            </div>
            <h2 className="mt-5 font-display text-5xl sm:text-7xl uppercase tracking-[0.04em] text-[var(--bone)] leading-none">{title}</h2>
        </div>
    );
}

function useDublinTime() {
    const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Dublin', hour: '2-digit', minute: '2-digit' }).format(new Date());
    const [time, setTime] = useState(fmt);
    useEffect(() => {
        const t = setInterval(() => setTime(fmt()), 15000);
        return () => clearInterval(t);
    }, []);
    return time;
}

export default function Portfolio() {
    const [activeProject, setActiveProject] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [hovered, setHovered] = useState(null);
    const dublinTime = useDublinTime();

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
    const projectIdx = project ? projects.indexOf(project) : -1;
    const preview = hovered === null ? null : projects.find((p) => p.id === hovered);

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
        <div className="noir min-h-screen bg-[var(--ink)] text-[var(--ash)] antialiased selection:bg-[var(--red)] selection:text-black">
            <style>{`
        :root {
          --ink: #060606;
          --coal: #0E0D0D;
          --red: #D0161F;
          --blood: #6E0A0E;
          --bone: #E8E2DA;
          --ash: #A39E98;
          --dim: #5E5955;
          --line: rgb(232 226 218 / 0.09);
        }
        html { scroll-behavior: smooth; }
        body { background: var(--ink); }
        * { font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif; }
        .font-display { font-family: 'Big Shoulders Display', 'Oswald', Impact, sans-serif; font-weight: 800; }
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* film grain */
        .noir::before {
          content: ''; position: fixed; inset: -50%; z-index: 60; pointer-events: none; opacity: .09;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: grain 1s steps(6) infinite;
        }
        @keyframes grain {
          0%,100% { transform: translate(0,0); } 20% { transform: translate(-3%,2%); } 40% { transform: translate(2%,-3%); }
          60% { transform: translate(-2%,-1%); } 80% { transform: translate(3%,3%); }
        }

        /* rain */
        .rain { position: absolute; inset: 0; pointer-events: none; opacity: .13;
          background-image: repeating-linear-gradient(104deg, transparent 0 22px, rgb(232 226 218 / .55) 22px 23px, transparent 23px 61px);
          background-size: 100% 180px; animation: rain .45s linear infinite;
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 85%); mask-image: linear-gradient(to bottom, black, transparent 85%);
        }
        @keyframes rain { from { background-position: 0 0; } to { background-position: -40px 180px; } }

        /* the red wash */
        .wash { background:
            radial-gradient(ellipse 60% 70% at 78% 40%, rgb(208 22 31 / .28), transparent 70%),
            radial-gradient(ellipse 90% 60% at 50% 120%, rgb(110 10 14 / .5), transparent 70%); }
        .vignette { box-shadow: inset 0 0 200px 60px #000; }

        .title-glow { text-shadow: 0 0 28px rgb(208 22 31 / .55), 0 0 2px rgb(208 22 31 / .9); animation: flicker 5s infinite; }
        @keyframes flicker { 0%,93%,96%,100% { opacity: 1; } 94% { opacity: .55; } 95% { opacity: .9; } 97% { opacity: .7; } }

        .duotone { position: relative; overflow: hidden; background: var(--blood); }
        .duotone img { filter: grayscale(1) contrast(1.35) brightness(.85); mix-blend-mode: multiply; }
        .duotone::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, #000 0%, transparent 55%); pointer-events: none; }

        .case-row:hover .case-title { color: var(--red); }
        .case-row:hover .case-arrow { transform: translate(4px,-4px); color: var(--red); }

        @media (prefers-reduced-motion: reduce) {
          .noir::before, .rain, .title-glow { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

            {/* Navigation */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--ink)]/80 backdrop-blur-md border-b border-[var(--line)]">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 h-14 flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase">
                    <a href="#" className="text-[var(--bone)]">P<span className="text-[var(--red)]">/</span>A</a>
                    <div className="flex items-center gap-5 sm:gap-10">
                        <a href="#work" className="text-[var(--ash)] hover:text-[var(--red)] transition">Files</a>
                        <a href="#arsenal" className="text-[var(--ash)] hover:text-[var(--red)] transition">Arsenal</a>
                        <a href="#record" className="hidden sm:inline text-[var(--ash)] hover:text-[var(--red)] transition">Record</a>
                        <a href="#contact" className="text-[var(--bone)] border-b border-[var(--red)] pb-0.5 hover:text-[var(--red)] transition">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative min-h-[100svh] flex flex-col overflow-hidden wash vignette">
                <div className="rain" />

                <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-5 sm:px-10 pt-28 sm:pt-32 pb-10 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-end">
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--dim)]">
                            Dublin <span className="text-[var(--red)]">·</span> {dublinTime} <span className="text-[var(--red)]">·</span> 53.35°N 6.26°W
                        </p>

                        <h1 className="mt-8 font-display uppercase text-[var(--red)] title-glow leading-[0.82] tracking-[0.06em] text-[22vw] sm:text-[9rem] lg:text-[11rem]">
                            Paul<br />Aji
                        </h1>

                        <p className="mt-10 font-display uppercase text-2xl sm:text-3xl tracking-[0.12em] text-[var(--bone)]">
                            Full-stack engineer.
                        </p>
                        <p className="mt-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--ash)]">
                            Payments <span className="text-[var(--red)]">/</span> Settlement <span className="text-[var(--red)]">/</span> Cloud
                        </p>
                    </div>

                    <div className="relative hidden lg:block justify-self-end">
                        <div className="duotone w-80 h-[26rem]">
                            <img src="./otherimages/profilephoto.jpg" alt="Paul Aji" className="w-full h-full object-cover" />
                        </div>
                        <p className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dim)]">Subject — P. Aji</p>
                    </div>
                </div>

                <div className="relative z-10 border-t border-[var(--line)]">
                    <div className="max-w-7xl mx-auto px-5 sm:px-10 py-8 grid md:grid-cols-[1fr_auto] gap-8 items-end">
                        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--ash)]">
                            3+ years shipping production systems in Python and TypeScript. Now on the Settle team at <span className="text-[var(--bone)]">Infinite Payment Technology</span>, making sure money moves, reconciles and bills correctly, because &lsquo;close enough&rsquo; isn&rsquo;t a feature in payments. MEng, Computer Vision &amp; AI, <span className="text-[var(--bone)]">First Class Honours</span>.
                        </p>
                        <a href="#work" className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-[var(--bone)] hover:text-[var(--red)] transition">
                            Open the files
                            <span className="block h-px w-12 bg-[var(--red)] group-hover:w-20 transition-all" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Case files */}
            <section className="relative py-24 sm:py-36 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading id="work" number="01" note={`${projects.length} ON RECORD`} title="Case Files" />

                    <div className="xl:grid xl:grid-cols-[1fr_22rem] xl:gap-12">
                        <ol className="border-t border-[var(--line)]">
                            {projects.map((p, i) => (
                                <li key={p.id}>
                                    <button
                                        onClick={() => openProject(p.id)}
                                        onMouseEnter={() => setHovered(p.id)}
                                        onMouseLeave={() => setHovered(null)}
                                        className="case-row w-full text-left grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 sm:gap-x-10 py-7 sm:py-9 border-b border-[var(--line)] hover:bg-[var(--blood)]/15 transition-colors px-1"
                                    >
                                        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[var(--dim)]">{fileNo(i)}</span>
                                        <span className="min-w-0">
                                            <span className="case-title block font-display uppercase text-3xl sm:text-5xl tracking-[0.03em] text-[var(--bone)] leading-[0.95] transition-colors">{p.title}</span>
                                            <span className="mt-3 block font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[var(--dim)]">{p.company} — {p.role}</span>
                                        </span>
                                        <span className="flex items-center gap-3 sm:gap-5">
                                            <span className={`hidden sm:inline font-mono text-[10px] tracking-[0.3em] ${i === 0 ? 'text-[var(--red)]' : 'text-[var(--dim)]'}`}>
                                                {i === 0 ? '● ACTIVE' : 'CLOSED'}
                                            </span>
                                            <ArrowUpRight className="case-arrow w-5 h-5 text-[var(--dim)] transition" />
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ol>

                        {/* hover evidence photo */}
                        <aside className="hidden xl:block" aria-hidden="true">
                            <div className="sticky top-32 transition-opacity duration-300" style={{ opacity: preview && preview.images.length ? 1 : 0 }}>
                                {preview && preview.images.length > 0 && (
                                    <>
                                        <div className="duotone aspect-[4/5] border border-[var(--red)]/40">
                                            <img src={preview.images[0]} alt="" className="w-full h-full object-cover object-top" />
                                        </div>
                                        <p className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dim)]">Exhibit A — {preview.title}</p>
                                    </>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Arsenal */}
            <section className="relative py-24 sm:py-36 px-5 sm:px-10 bg-[var(--coal)] border-y border-[var(--line)]">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading id="arsenal" number="02" note="TOOLS OF THE TRADE" title="Arsenal" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
                        {skills.map((category, i) => (
                            <div key={category.label}>
                                <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--red)]">{String(i + 1).padStart(2, '0')}</p>
                                <h3 className="mt-2 pb-3 mb-4 font-display uppercase text-xl tracking-[0.08em] text-[var(--bone)] border-b border-[var(--line)]">{category.label}</h3>
                                <ul className="space-y-1.5">
                                    {category.items.map((item) => (
                                        <li key={item} className="text-sm text-[var(--ash)]">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <TechBanner />
                </div>
            </section>

            {/* Record */}
            <section className="relative py-24 sm:py-36 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading id="record" number="03" note="BACKGROUND CHECK" title="The Record" />

                    <div className="grid md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] mb-24">
                        <div className="bg-[var(--ink)] p-8 sm:p-10">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--red)]">SEP 2024 — SEP 2025</p>
                            <h3 className="mt-4 font-display uppercase text-3xl tracking-[0.03em] text-[var(--bone)] leading-none">MEng, Computer Vision &amp; AI</h3>
                            <p className="mt-3 text-sm text-[var(--ash)]">University of Limerick</p>
                            <p className="mt-6 font-mono text-xs tracking-[0.2em] uppercase text-[var(--bone)]">First Class Honours <span className="text-[var(--red)]">/</span> QCA 3.37</p>
                        </div>
                        <div className="bg-[var(--ink)] p-8 sm:p-10">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--dim)]">2018 — FEB 2023</p>
                            <h3 className="mt-4 font-display uppercase text-3xl tracking-[0.03em] text-[var(--bone)] leading-none">B.Tech, Computer Science</h3>
                            <p className="mt-3 text-sm text-[var(--ash)]">Adi Shankara Institute of Engineering and Technology</p>
                            <p className="mt-6 font-mono text-xs tracking-[0.2em] uppercase text-[var(--ash)]">GPA 2.76</p>
                        </div>
                    </div>

                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--dim)] mb-6">Known activity</p>
                    <ul className="border-t border-[var(--line)]">
                        {achievements.map((a, i) => (
                            <li key={a.title} className="grid md:grid-cols-[4rem_1fr_1.2fr] gap-x-8 gap-y-1 py-5 border-b border-[var(--line)]">
                                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--red)] pt-1">{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <p className="text-[var(--bone)] font-medium">{a.title}</p>
                                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--dim)] mt-1">{a.subtitle}</p>
                                </div>
                                <p className="text-sm text-[var(--ash)] leading-relaxed">{a.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="relative overflow-hidden py-28 sm:py-40 px-5 sm:px-10 border-t border-[var(--line)] wash vignette">
                <div className="rain" />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--red)]">04 — Contact</p>
                    <h2 className="mt-6 font-display uppercase text-[var(--bone)] leading-[0.85] tracking-[0.04em] text-6xl sm:text-8xl lg:text-[9rem]">
                        When you<br />need <span className="text-[var(--red)] title-glow">me</span>.
                    </h2>
                    <p className="mt-8 max-w-md text-[var(--ash)]">Open to new roles and collaborations in payments, backend and cloud.</p>

                    <div className="mt-16 border-t border-[var(--line)]">
                        {channels.map((c) => (
                            <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                className="case-row group grid grid-cols-[5rem_1fr_auto] sm:grid-cols-[8rem_1fr_auto] items-baseline gap-4 py-6 border-b border-[var(--line)]">
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dim)]">{c.label}</span>
                                <span className="case-title font-display uppercase text-xl sm:text-4xl tracking-[0.03em] text-[var(--bone)] transition-colors break-all">{c.value}</span>
                                <ArrowUpRight className="case-arrow w-5 h-5 text-[var(--dim)] transition" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-5 sm:px-10 py-8 border-t border-[var(--line)]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--dim)]">
                    <p>&copy; {new Date().getFullYear()} Paul Aji</p>
                    <p>Dublin <span className="text-[var(--red)]">/</span> after dark</p>
                </div>
            </footer>

            {/* Dossier */}
            {project && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-stretch sm:items-center justify-center sm:p-8" onClick={closeProject}>
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        className="relative w-full max-w-4xl max-h-[100svh] sm:max-h-[92vh] overflow-y-auto scrollbar-hide bg-[var(--coal)] border-t-2 border-[var(--red)] sm:border sm:border-t-2 sm:border-x-[var(--line)] sm:border-b-[var(--line)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-10 h-14 bg-[var(--coal)]/95 backdrop-blur border-b border-[var(--line)] font-mono text-[10px] tracking-[0.3em] uppercase">
                            <span className="text-[var(--dim)]">{fileNo(projectIdx)} <span className="text-[var(--red)]">//</span> {projectIdx === 0 ? 'Active' : 'Closed'}</span>
                            <button onClick={closeProject} aria-label="Close" className="flex items-center gap-2 text-[var(--ash)] hover:text-[var(--red)] transition">
                                Close <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="px-6 sm:px-10 pt-10">
                            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[var(--dim)]">{project.company} — {project.role}</p>
                            <h3 className="mt-4 font-display uppercase text-5xl sm:text-7xl tracking-[0.03em] text-[var(--bone)] leading-[0.9]">{project.title}</h3>
                            <p className="mt-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--red)]">{project.subtitle}</p>
                        </div>

                        {project.images.length > 0 && (
                            <div className="mt-10 mx-6 sm:mx-10 relative bg-black border border-[var(--line)]">
                                <img src={project.images[imageIndex]} alt={`${project.title} evidence ${imageIndex + 1}`} className="w-full max-h-[55vh] object-contain" />
                                <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 font-mono text-[9px] tracking-[0.3em] text-[var(--ash)]">
                                    EXHIBIT {String.fromCharCode(65 + imageIndex)}
                                </div>
                                {project.images.length > 1 && (
                                    <div className="absolute bottom-0 inset-x-0 flex items-center justify-between p-3 bg-gradient-to-t from-black/90 to-transparent">
                                        <button aria-label="Previous image" disabled={imageIndex === 0} onClick={() => setImageIndex(imageIndex - 1)}
                                            className="w-9 h-9 flex items-center justify-center border border-[var(--line)] bg-black/70 text-[var(--bone)] hover:border-[var(--red)] hover:text-[var(--red)] disabled:opacity-20 transition">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--ash)]">{imageIndex + 1} / {project.images.length}</span>
                                        <button aria-label="Next image" disabled={imageIndex === project.images.length - 1} onClick={() => setImageIndex(imageIndex + 1)}
                                            className="w-9 h-9 flex items-center justify-center border border-[var(--line)] bg-black/70 text-[var(--bone)] hover:border-[var(--red)] hover:text-[var(--red)] disabled:opacity-20 transition">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="px-6 sm:px-10 py-10 grid md:grid-cols-[1fr_14rem] gap-10">
                            <div>
                                <p className="text-base leading-relaxed text-[var(--bone)]">{project.description}</p>
                                <p className="mt-10 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dim)]">Findings</p>
                                <ol className="space-y-4">
                                    {project.highlights.map((h, i) => (
                                        <li key={i} className="grid grid-cols-[2rem_1fr] text-sm leading-relaxed text-[var(--ash)]">
                                            <span className="font-mono text-[10px] text-[var(--red)] pt-1">{String(i + 1).padStart(2, '0')}</span>
                                            {h}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div>
                                <p className="mb-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dim)]">Tools used</p>
                                <ul className="space-y-2 border-l border-[var(--red)] pl-4">
                                    {project.tech.map((t) => (
                                        <li key={t} className="font-mono text-xs text-[var(--ash)]">{t}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
