import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronRight, ArrowUpRight } from 'lucide-react';

import TechBanner from './components/TechBanner';

export default function Portfolio() {
    const [expandedProject, setExpandedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="grain min-h-screen bg-[#E9E4DA] text-[#1C1B19] font-sans selection:bg-[#A8442A] selection:text-[#E9E4DA]">
            <style>{`
        * {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .font-display { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; letter-spacing: -0.03em; }
        .font-mono2 { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Off-White style caution stripes */
        .stripes {
          background-image: repeating-linear-gradient(-45deg, #1C1B19 0 10px, transparent 10px 20px);
        }
        .stripes-o {
          background-image: repeating-linear-gradient(-45deg, #A8442A 0 10px, transparent 10px 20px);
        }

        /* subtle paper grain */
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          mix-blend-mode: multiply;
          background-image: radial-gradient(#1C1B19 0.5px, transparent 0.5px);
          background-size: 4px 4px;
          z-index: 1;
        }

        /* equalizer — the quiet music nod */
        @keyframes eq { 0%,100% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } }
        .eq-bar { transform-origin: bottom; animation: eq 0.9s ease-in-out infinite; }

        .invert-hover { transition: background .25s, color .25s; }
        .invert-hover:hover { background: #1C1B19; color: #E9E4DA; }
      `}</style>

            {/* Minimal Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#E9E4DA]/85 backdrop-blur-xl border-b-2 border-[#1C1B19]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="font-mono2 text-sm font-bold tracking-wider">PAUL&nbsp;AJI<sup className="text-[#A8442A]">®</sup></a>
                    <div className="flex items-center gap-6 sm:gap-8 font-mono2 text-xs tracking-wider">
                        <a href="#work" className="text-[#1C1B19]/60 hover:text-[#A8442A] transition">&ldquo;WORK&rdquo;</a>
                        <a href="#about" className="text-[#1C1B19]/60 hover:text-[#A8442A] transition">&ldquo;ABOUT&rdquo;</a>
                        <a href="#contact" className="text-[#1C1B19]/60 hover:text-[#A8442A] transition">&ldquo;CONTACT&rdquo;</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
                {/* rotated edge meta */}
                <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-mono2 text-[10px] tracking-[0.3em] text-[#1C1B19]/50 whitespace-nowrap">
                    PORTFOLIO &nbsp;/&nbsp; EST. 2022 &nbsp;/&nbsp; DUBLIN, IE
                </div>
                {/* corner register marks */}
                <div className="absolute top-24 right-8 font-mono2 text-xs text-[#A8442A]">+</div>
                <div className="absolute bottom-8 left-8 font-mono2 text-xs text-[#A8442A]">+</div>

                <div className="max-w-5xl w-full relative z-10">
                    <div className="space-y-8">
                        {/* top meta line */}
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-mono2 text-[10px] sm:text-xs tracking-[0.2em] text-[#1C1B19]/50">[ DUBLIN,&nbsp;IE &nbsp;/&nbsp; 53.35&deg;N ]</span>
                            <span className="inline-flex items-center gap-2 border-2 border-[#1C1B19] px-3 py-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8442A] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A8442A]" />
                                </span>
                                <span className="font-mono2 text-[10px] tracking-[0.2em]">AVAILABLE&nbsp;FOR&nbsp;WORK</span>
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src="./otherimages/profilephoto.jpg"
                                        alt="Paul Aji"
                                        className="w-24 h-24 object-cover border-2 border-[#1C1B19] grayscale"
                                    />
                                    <span className="absolute -bottom-2 -right-2 bg-[#1C1B19] text-[#E9E4DA] font-mono2 text-[9px] px-1.5 py-0.5">FIG.01</span>
                                </div>
                                <div>
                                    <h1 className="font-display text-6xl sm:text-8xl uppercase leading-[0.9]">Paul&nbsp;Aji<span className="text-[#A8442A]">.</span></h1>
                                    <p className="font-mono2 text-[11px] sm:text-sm tracking-[0.15em] text-[#1C1B19]/55 mt-3 uppercase">Full&nbsp;Stack&nbsp;Engineer <span className="text-[#A8442A]">//</span> Payments&nbsp;&amp;&nbsp;Cloud</p>
                                </div>
                            </div>
                            <p className="text-base sm:text-lg text-[#1C1B19]/70 font-normal max-w-2xl leading-[1.7]">
                                Full-stack engineer, 3+ years shipping production systems in Python and JavaScript/TypeScript that real people somehow depend on. Currently on the Settle team at <span className="text-[#1C1B19] font-medium">Infinite Payment Technology</span>, making sure money actually moves, reconciles, and bills correctly, because &lsquo;close enough&rsquo; isn&rsquo;t a feature in payments. Also holding an MEng in Computer Vision &amp; AI (<span className="text-[#1C1B19] font-medium">First Class Honours</span>, University of Limerick), which mostly qualifies me to explain, with great confidence, exactly why the model is wrong.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 font-mono2 text-xs">
                            <a
                                href="https://github.com/paulaji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="invert-hover inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1C1B19] group"
                            >
                                <Github className="w-4 h-4" />
                                GITHUB
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/paulaji/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="invert-hover inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1C1B19]"
                            >
                                <Linkedin className="w-4 h-4" />
                                LINKEDIN
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="mailto:paulajiparayil123@gmail.com"
                                className="invert-hover inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1C1B19]"
                            >
                                <Mail className="w-4 h-4" />
                                EMAIL
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* bottom caution stripe */}
                <div className="absolute bottom-0 left-0 right-0 h-4 stripes opacity-80" />
            </section>


            {/* Tech Stack */}
            <section className="relative py-28 px-6 border-t-2 border-[#1C1B19]" id="about">
                <TechBanner />
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-baseline gap-4 mb-12">
                        <span className="font-mono2 text-xs text-[#A8442A]">01</span>
                        <h2 className="font-mono2 text-sm tracking-[0.2em]">&ldquo;TECHNICAL&nbsp;EXPERTISE&rdquo;</h2>
                        <div className="flex-1 h-px bg-[#1C1B19]/20" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
                        {[
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
                        ].map((category, i) => (
                            <div key={i} className="space-y-3 border-t border-[#1C1B19] pt-3">
                                <h3 className="font-mono2 text-[10px] font-bold text-[#A8442A] tracking-widest uppercase">{String(i + 1).padStart(2, '0')} / {category.label}</h3>
                                <div className="space-y-1.5">
                                    {category.items.map((item, j) => (
                                        <div key={j} className="text-sm text-[#1C1B19]/75">{item}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section className="py-28 px-6 border-t-2 border-[#1C1B19]" id="work">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono2 text-xs text-[#A8442A]">02</span>
                        <h2 className="font-mono2 text-sm tracking-[0.2em]">&ldquo;SELECTED&nbsp;WORK&rdquo;</h2>
                        <div className="flex-1 h-px bg-[#1C1B19]/20" />
                    </div>
                    <p className="font-mono2 text-[10px] tracking-[0.2em] text-[#1C1B19]/50 mb-10 pl-8">TRACKLIST &nbsp;/&nbsp; SIDE&nbsp;A: CURRENT &middot; SIDE&nbsp;B: BACK CATALOGUE &nbsp;▸ PLAY TO EXPAND</p>

                    <div className="space-y-0">
                        {projects.map((project, idx) => (
                            <div key={project.id} className="group">
                                <button
                                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                                    className="w-full py-5 sm:py-6 flex items-center justify-between border-t-2 border-[#1C1B19] hover:bg-[#1C1B19]/[0.03] transition text-left px-2"
                                >
                                    <span className="font-mono2 font-bold text-lg sm:text-xl text-[#A8442A] w-12 sm:w-14 flex-shrink-0">{(idx < 4 ? 'A' : 'B') + (idx < 4 ? idx + 1 : idx - 3)}</span>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                            <h3 className="text-lg sm:text-2xl font-medium">{project.title}</h3>
                                            <span className="font-mono2 text-xs text-[#1C1B19]/50">{project.subtitle}</span>
                                        </div>
                                        <p className="font-mono2 text-[11px] text-[#1C1B19]/50 mt-1 uppercase tracking-wider">{project.company} &middot; {project.role}</p>
                                    </div>
                                    <ChevronRight
                                        className={`w-5 h-5 text-[#1C1B19] transition-transform flex-shrink-0 ml-2 sm:ml-4 ${expandedProject === project.id ? 'rotate-90' : ''}`}
                                    />
                                </button>

                                {expandedProject === project.id && (
                                    <div className="py-6 sm:py-8 px-2 space-y-6 sm:space-y-8 bg-[#1C1B19]/[0.03]">
                                        {/* Images */}
                                        {project.images.length > 0 && (
                                        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4">
                                            {project.images.map((image, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => openModal(image)}
                                                    className="relative flex-shrink-0 w-64 sm:w-80 h-40 sm:h-52 bg-[#DED9CD] cursor-pointer overflow-hidden group/img"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${project.title} ${i + 1}`}
                                                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-300"
                                                    />
                                                    <div className="absolute inset-0 border-2 border-[#1C1B19] pointer-events-none" />
                                                    <span className="absolute top-2 left-2 bg-[#1C1B19] text-[#E9E4DA] font-mono2 text-[9px] px-1.5 py-0.5">{project.title.slice(0, 12).toUpperCase()} {String(i + 1).padStart(2, '0')}</span>
                                                </div>
                                            ))}
                                        </div>
                                        )}

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-[#1C1B19]/80 leading-relaxed max-w-3xl">{project.description}</p>

                                        {/* Highlights */}
                                        <div className="space-y-2.5">
                                            {project.highlights.map((highlight, i) => (
                                                <div key={i} className="flex gap-3 sm:gap-4">
                                                    <span className="font-mono2 text-[10px] text-[#A8442A] mt-1 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                                    <p className="text-sm text-[#1C1B19]/80 leading-relaxed max-w-3xl">{highlight}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 font-mono2 text-[10px] tracking-wider text-[#1C1B19] border border-[#1C1B19] uppercase"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-28 px-6 border-t-2 border-[#1C1B19]">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-baseline gap-4 mb-12">
                        <span className="font-mono2 text-xs text-[#A8442A]">03</span>
                        <h2 className="font-mono2 text-sm tracking-[0.2em]">&ldquo;ACHIEVEMENTS&nbsp;&amp;&nbsp;LEADERSHIP&rdquo;</h2>
                        <div className="flex-1 h-px bg-[#1C1B19]/20" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-px bg-[#1C1B19] border-2 border-[#1C1B19]">
                        {achievements.map((achievement, i) => (
                            <div key={i} className="invert-hover bg-[#E9E4DA] p-6 group">
                                <p className="font-mono2 text-[10px] text-[#A8442A] mb-2">{String(i + 1).padStart(2, '0')}</p>
                                <h3 className="font-medium mb-1">{achievement.title}</h3>
                                <p className="font-mono2 text-xs text-[#1C1B19]/60 group-hover:text-[#A8442A] mb-3 uppercase tracking-wider transition">{achievement.subtitle}</p>
                                <p className="text-sm text-[#1C1B19]/70 group-hover:text-[#E9E4DA]/70 leading-relaxed transition">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="py-28 px-6 border-t-2 border-[#1C1B19]">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-baseline gap-4 mb-12">
                        <span className="font-mono2 text-xs text-[#A8442A]">04</span>
                        <h2 className="font-mono2 text-sm tracking-[0.2em]">&ldquo;EDUCATION&rdquo;</h2>
                        <div className="flex-1 h-px bg-[#1C1B19]/20" />
                    </div>

                    <div className="space-y-8">
                        <div className="border-l-2 border-[#A8442A] pl-5">
                            <h3 className="text-xl font-medium mb-1">MEng, Computer Vision and Artificial Intelligence</h3>
                            <p className="font-mono2 text-xs text-[#1C1B19]/60 mb-2 uppercase tracking-wider">University of Limerick &middot; Sep 2024 &ndash; Sep 2025</p>
                            <p className="font-mono2 text-xs text-[#1C1B19]">First Class Honours &middot; QCA: 3.37</p>
                        </div>

                        <div className="border-l-2 border-[#1C1B19]/30 pl-5">
                            <h3 className="text-xl font-medium mb-1">B.Tech, Computer Science</h3>
                            <p className="font-mono2 text-xs text-[#1C1B19]/60 mb-2 uppercase tracking-wider">Adi Shankara Institute of Engineering and Technology &middot; 2018 &ndash; Feb 2023</p>
                            <p className="font-mono2 text-xs text-[#1C1B19]">GPA: 2.76</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="relative py-28 px-6 border-t-2 border-[#1C1B19] overflow-hidden" id="contact">
                <div className="h-4 stripes-o opacity-80 mb-16" />
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <p className="font-mono2 text-xs text-[#A8442A] tracking-[0.2em]">05 / &ldquo;CONTACT&rdquo;</p>
                    <h2 className="font-display text-6xl sm:text-8xl uppercase leading-[0.9]">Let&rsquo;s&nbsp;make<br />something<span className="text-[#A8442A]">.</span></h2>
                    <p className="font-mono2 text-xs text-[#1C1B19]/55 tracking-[0.15em] uppercase">Open to new opportunities &amp; collaborations</p>

                    <div className="flex flex-wrap justify-center gap-3 pt-4 font-mono2 text-xs">
                        <a
                            href="https://github.com/paulaji"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="invert-hover inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1C1B19]"
                        >
                            <Github className="w-4 h-4" />
                            GITHUB
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/paulaji/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="invert-hover inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1C1B19]"
                        >
                            <Linkedin className="w-4 h-4" />
                            LINKEDIN
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="mailto:paulajiparayil123@gmail.com"
                            className="invert-hover inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1C1B19]"
                        >
                            <Mail className="w-4 h-4" />
                            EMAIL
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-6 border-t-2 border-[#1C1B19] bg-[#1C1B19] text-[#E9E4DA]">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono2 text-[10px] tracking-wider uppercase">
                    <p>&copy; 2026 &nbsp;/&nbsp; Paul Aji<sup className="text-[#A8442A]">®</sup> &nbsp;/&nbsp; All Rights Reserved</p>
                    <p className="text-[#E9E4DA]/50">&ldquo;Built&nbsp;with&nbsp;React&nbsp;&amp;&nbsp;TailwindCSS&rdquo; c/o Dublin, IE</p>
                </div>
            </footer>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div className="relative max-w-7xl max-h-[90vh] overflow-auto border-2 border-[#E9E4DA]" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Expanded view"
                            className="w-full h-auto"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#A8442A] hover:bg-[#E9E4DA] hover:text-[#1C1B19] text-[#1C1B19] font-mono2 transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}