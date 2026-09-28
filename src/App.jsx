import React, { useState, useEffect } from 'react';

import TechBanner from './components/TechBanner';

const EMAIL = "paulajiparayil123@gmail.com";

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

const pad = (n, len = 2) => String(n).padStart(len, '0');

// Two-column receipt line with a dotted leader between label and value.
function Line({ label, value, strong, className = '' }) {
    return (
        <div className={`flex items-baseline gap-2 ${strong ? 'font-medium text-[var(--ink)]' : ''} ${className}`}>
            <span className="min-w-0">{label}</span>
            <span className="leader" aria-hidden="true" />
            <span className="text-right shrink-0">{value}</span>
        </div>
    );
}

function Rule({ double }) {
    return <div className={double ? 'rule-double' : 'rule'} aria-hidden="true" />;
}

function Heading({ children, id }) {
    return (
        <h2 id={id} className="scroll-mt-6 text-center font-medium tracking-[0.25em] text-[var(--ink)] my-5">
            ** {children} **
        </h2>
    );
}

function Stamp({ children, className = '' }) {
    return <span className={`stamp ${className}`}>{children}</span>;
}

// Decorative barcode derived from a string (not a scannable symbology).
function Barcode({ text }) {
    const bars = [];
    let x = 0;
    [...text].forEach((ch, i) => {
        const c = ch.charCodeAt(0);
        for (let b = 0; b < 3; b++) {
            const w = ((c >> b) & 3) + 1;
            if ((i + b) % 2 === 0) bars.push(<rect key={`${i}-${b}`} x={x} y="0" width={w} height="56" />);
            x += w + 1;
        }
    });
    return (
        <svg viewBox={`0 0 ${x} 56`} preserveAspectRatio="none" className="w-full h-14" fill="currentColor" aria-hidden="true">
            {bars}
        </svg>
    );
}

function useDublinClock() {
    const read = () => {
        const d = new Date();
        const opts = { timeZone: 'Europe/Dublin' };
        return {
            date: new Intl.DateTimeFormat('en-GB', { ...opts, day: '2-digit', month: '2-digit', year: 'numeric' }).format(d),
            time: new Intl.DateTimeFormat('en-GB', { ...opts, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d),
        };
    };
    const [now, setNow] = useState(read);
    useEffect(() => {
        const t = setInterval(() => setNow(read()), 1000);
        return () => clearInterval(t);
    }, []);
    return now;
}

export default function Portfolio() {
    const [openItem, setOpenItem] = useState(null);
    const [lightbox, setLightbox] = useState(null); // { images, index }
    const clock = useDublinClock();

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

    const toggle = (id) => setOpenItem(openItem === id ? null : id);

    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowRight') setLightbox((l) => ({ ...l, index: Math.min(l.index + 1, l.images.length - 1) }));
            if (e.key === 'ArrowLeft') setLightbox((l) => ({ ...l, index: Math.max(l.index - 1, 0) }));
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [lightbox]);

    return (
        <div className="counter min-h-screen text-[var(--ink-soft)] antialiased">
            <style>{`
        :root {
          --counter: #1B1A19;
          --paper: #FAF8F3;
          --ink: #1D1C1A;
          --ink-soft: #3A3835;
          --faded: #8A857D;
          --stamp: #D2342A;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--counter); }
        * { font-family: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace; }
        .dot { font-family: 'Doto', 'IBM Plex Mono', monospace; font-weight: 900; }
        ::selection { background: var(--ink); color: var(--paper); }

        .counter {
          background-color: var(--counter);
          background-image: radial-gradient(ellipse 70% 50% at 50% 0%, rgb(255 255 255 / .06), transparent 70%);
        }

        /* printer */
        .printer { background: linear-gradient(#3B3936, #2A2826); box-shadow: 0 14px 30px -10px rgb(0 0 0 / .8), inset 0 1px 0 rgb(255 255 255 / .08); }
        .slot { background: #0B0A0A; box-shadow: inset 0 3px 6px rgb(0 0 0 / .9); }

        /* paper */
        .receipt {
          position: relative;
          background-color: var(--paper);
          background-image:
            linear-gradient(90deg, rgb(0 0 0 / .035), transparent 6%, transparent 94%, rgb(0 0 0 / .035)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          box-shadow: 0 30px 60px -20px rgb(0 0 0 / .7), 0 2px 6px rgb(0 0 0 / .3);
          animation: print 1.6s steps(16, end) both;
        }
        .receipt::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -10px; height: 10px;
          background:
            linear-gradient(135deg, var(--paper) 50%, transparent 50%) 0 0 / 14px 10px repeat-x,
            linear-gradient(225deg, var(--paper) 50%, transparent 50%) 0 0 / 14px 10px repeat-x;
        }
        @keyframes print { from { transform: translateY(-55vh); } to { transform: translateY(0); } }

        .leader { flex: 1; min-width: 1.5rem; border-bottom: 2px dotted rgb(29 28 26 / .35); transform: translateY(-.3em); }
        .rule { border-top: 2px dashed rgb(29 28 26 / .45); margin: 1.25rem 0; }
        .rule-double { border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); height: 6px; margin: 1.25rem 0; }

        .thermal { filter: grayscale(1) contrast(1.5) brightness(1.08); mix-blend-mode: multiply; }
        .thermal-soft { filter: grayscale(1) contrast(1.15); mix-blend-mode: multiply; transition: filter .25s; }
        .thermal-soft:hover { filter: none; }

        .stamp {
          display: inline-block; color: var(--stamp); border: 2.5px solid currentColor; border-radius: 4px;
          padding: .15em .55em; font-weight: 500; letter-spacing: .15em; text-transform: uppercase;
          transform: rotate(-8deg); opacity: .85; mix-blend-mode: multiply;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -2.2 1.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .blink { animation: blink 1.1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }

        .item-btn:hover .item-name, .item-btn:focus-visible .item-name { background: var(--ink); color: var(--paper); }
        .key { border: 2px solid var(--ink); color: var(--ink); transition: background .15s, color .15s; }
        .key:hover { background: var(--ink); color: var(--paper); }

        @media (prefers-reduced-motion: reduce) {
          .receipt, .blink { animation: none; }
          html { scroll-behavior: auto; }
        }
        @media print {
          body, .counter { background: #fff !important; }
          .printer, .no-print { display: none !important; }
          .receipt { box-shadow: none; animation: none; }
        }
      `}</style>

            <main className="relative px-4 pt-6 sm:pt-10 pb-24">
                {/* Printer */}
                <div className="printer relative z-20 mx-auto max-w-[680px] rounded-xl px-5 pt-4 pb-5">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-[#9C978F] uppercase">
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5BE07A] shadow-[0_0_6px_#5BE07A]" /> Online
                        </span>
                        <span>PA-3000 Thermal</span>
                        <nav className="no-print hidden sm:flex gap-4">
                            <a href="#items" className="hover:text-white transition">Items</a>
                            <a href="#skills" className="hover:text-white transition">Skills</a>
                            <a href="#total" className="hover:text-white transition">Total</a>
                        </nav>
                    </div>
                    <div className="slot mt-4 h-2.5 rounded-full" />
                </div>

                {/* Receipt */}
                <div className="relative z-10 -mt-3 mx-auto max-w-[620px] overflow-hidden pb-3">
                    <article className="receipt px-5 sm:px-10 pt-12 pb-12 text-[13px] sm:text-sm leading-relaxed">

                        {/* Header */}
                        <header className="text-center">
                            <img src="./otherimages/profilephoto.jpg" alt="Paul Aji" className="thermal mx-auto w-20 h-20 object-cover rounded-full" />
                            <h1 className="dot mt-5 text-5xl sm:text-6xl leading-none text-[var(--ink)] tracking-wide">PAUL AJI</h1>
                            <p className="mt-3 font-medium tracking-[0.2em] text-[var(--ink)]">FULL STACK ENGINEER</p>
                            <p className="tracking-[0.15em]">PAYMENTS · SETTLEMENT · CLOUD</p>
                            <p className="mt-2 text-[var(--faded)]">DUBLIN, IRELAND</p>
                            <a href={`mailto:${EMAIL}`} className="text-[var(--faded)] underline decoration-dotted underline-offset-4 hover:text-[var(--ink)] break-all">{EMAIL}</a>
                        </header>

                        <Rule />

                        <div className="grid grid-cols-2 gap-x-4">
                            <p>DATE: {clock.date}</p>
                            <p className="text-right">TIME: {clock.time}</p>
                            <p>TERMINAL: 01</p>
                            <p className="text-right">CASHIER: PAUL</p>
                            <p>ORDER: #0003-YRS</p>
                            <p className="text-right">
                                STATUS: <span className="text-[var(--ink)] font-medium">AVAILABLE</span>
                            </p>
                        </div>

                        <Rule double />

                        <p className="text-center tracking-[0.3em] text-[var(--ink)] font-medium">*** CUSTOMER COPY ***</p>
                        <p className="mt-4">
                            NOTE: Full-stack engineer, 3+ years shipping production systems in Python and TypeScript. Currently on the Settle team at <b className="font-medium text-[var(--ink)]">Infinite Payment Technology</b>, making sure money moves, reconciles and bills correctly, because &lsquo;close enough&rsquo; isn&rsquo;t a feature in payments. MEng in Computer Vision &amp; AI, First Class Honours, University of Limerick.
                        </p>

                        <Rule />

                        {/* Items */}
                        <Heading id="items">ITEMS PURCHASED</Heading>
                        <div className="flex justify-between text-[var(--faded)] text-xs tracking-[0.15em] mb-2">
                            <span>QTY&nbsp; ITEM</span>
                            <span>STATUS</span>
                        </div>

                        <ul>
                            {projects.map((p, i) => {
                                const open = openItem === p.id;
                                return (
                                    <li key={p.id} className="py-2">
                                        <button onClick={() => toggle(p.id)} aria-expanded={open} className="item-btn w-full text-left">
                                            <Line
                                                label={<><span className="text-[var(--faded)]">{pad(i + 1)}&nbsp;&nbsp;</span><span className="item-name font-medium text-[var(--ink)] uppercase px-0.5 -mx-0.5 transition-colors">{p.title}</span></>}
                                                value={i === 0
                                                    ? <span className="font-medium text-[var(--stamp)]">PROCESSING<span className="blink">_</span></span>
                                                    : <span className="text-[var(--ink)]">SETTLED</span>}
                                            />
                                            <p className="pl-[2.6em] text-xs text-[var(--faded)]">
                                                {p.company} · {p.role} <span className="no-print text-[var(--ink-soft)]">[{open ? '-' : '+'}]</span>
                                            </p>
                                        </button>

                                        {open && (
                                            <div className="pl-[2.6em] mt-3 mb-2 space-y-3">
                                                <p className="text-[var(--ink)]">{p.description}</p>
                                                <ul className="space-y-1.5">
                                                    {p.highlights.map((h, j) => (
                                                        <li key={j} className="grid grid-cols-[1.4em_1fr]"><span>+</span><span>{h}</span></li>
                                                    ))}
                                                </ul>
                                                <p className="text-xs"><span className="text-[var(--faded)]">STACK:</span> {p.tech.join(' / ')}</p>
                                                {p.images.length > 0 && (
                                                    <div className="no-print flex gap-2 overflow-x-auto pb-1">
                                                        {p.images.map((img, k) => (
                                                            <button key={img} onClick={() => setLightbox({ images: p.images, index: k, title: p.title })}
                                                                className="shrink-0 w-32 h-20 sm:w-40 sm:h-24 border border-[var(--ink)]/30 overflow-hidden bg-white" aria-label={`View ${p.title} screenshot ${k + 1}`}>
                                                                <img src={img} alt="" loading="lazy" className="thermal-soft w-full h-full object-cover object-top" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        <Rule />
                        <Line label="SUBTOTAL" value={`${projects.length} ITEMS`} strong />
                        <Line label="ITEMS IN PROGRESS" value="1" />
                        <Line label="ITEMS SETTLED" value={projects.length - 1} />

                        <Rule />

                        {/* Skills */}
                        <Heading id="skills">ITEMISED SKILLS</Heading>
                        <div className="space-y-3">
                            {skills.map((c) => (
                                <div key={c.label}>
                                    <Line label={<span className="font-medium text-[var(--ink)] uppercase">{c.label}</span>} value={`x${c.items.length}`} />
                                    <p className="pl-4 text-xs text-[var(--faded)]">{c.items.join(', ')}</p>
                                </div>
                            ))}
                        </div>

                        <Rule />

                        <p className="text-center text-xs tracking-[0.3em] text-[var(--faded)] mb-4">WE ACCEPT</p>
                        <div className="text-[var(--ink)]">
                            <TechBanner />
                        </div>

                        <Rule />

                        {/* Education */}
                        <Heading>EDUCATION</Heading>
                        <div className="space-y-4">
                            <div className="relative">
                                <Line label={<span className="font-medium text-[var(--ink)]">MENG, COMPUTER VISION &amp; AI</span>} value="QCA 3.37" />
                                <p className="text-xs text-[var(--faded)]">University of Limerick · Sep 2024 – Sep 2025</p>
                                <Stamp className="absolute right-2 -bottom-4 text-[11px]">First Class</Stamp>
                            </div>
                            <div className="pt-3">
                                <Line label={<span className="font-medium text-[var(--ink)]">B.TECH, COMPUTER SCIENCE</span>} value="GPA 2.76" />
                                <p className="text-xs text-[var(--faded)]">Adi Shankara Institute of Engineering and Technology · 2018 – Feb 2023</p>
                            </div>
                        </div>

                        <Rule />

                        {/* Achievements */}
                        <Heading>COMPLIMENTARY EXTRAS</Heading>
                        <ul className="space-y-3">
                            {achievements.map((a) => (
                                <li key={a.title}>
                                    <Line label={<span className="text-[var(--ink)]">{a.title.toUpperCase()}</span>} value="FREE" />
                                    <p className="text-xs text-[var(--faded)]">{a.subtitle} — {a.description}</p>
                                </li>
                            ))}
                        </ul>

                        <Rule double />

                        {/* Totals */}
                        <div id="total" className="scroll-mt-6 space-y-1.5 text-[15px] sm:text-base">
                            <Line label="TOTAL" value="3+ YRS EXPERIENCE" strong className="text-lg sm:text-xl" />
                            <Line label="PAYMENT METHOD" value="FIRST CLASS HONOURS" />
                            <Line label="TAX (BUGS)" value="0.00" />
                            <Line label="CHANGE DUE" value="YOUR NEXT HIRE" strong />
                        </div>
                        <div className="text-center pt-6 pb-2">
                            <Stamp className="text-xl sm:text-2xl">Open to work</Stamp>
                        </div>

                        <Rule double />

                        {/* Footer */}
                        <footer id="contact" className="text-center space-y-1">
                            <p className="font-medium text-[var(--ink)] tracking-[0.2em]">THANK YOU FOR SCROLLING</p>
                            <p>NO REFUNDS ON GOOD CODE</p>
                            <p className="text-[var(--faded)] text-xs">KEEP THIS RECEIPT FOR YOUR RECORDS</p>

                            <a href={`mailto:${EMAIL}`} className="block mt-6 text-[var(--ink)] hover:opacity-70 transition" aria-label={`Email ${EMAIL}`}>
                                <Barcode text={EMAIL} />
                                <p className="mt-1 text-xs tracking-[0.35em]">SCAN TO HIRE</p>
                            </a>

                            <div className="no-print mt-8 grid grid-cols-3 gap-2 text-xs font-medium tracking-[0.15em]">
                                <a href="https://github.com/paulaji" target="_blank" rel="noopener noreferrer" className="key py-2.5">[ GITHUB ]</a>
                                <a href="https://linkedin.com/in/paulaji/" target="_blank" rel="noopener noreferrer" className="key py-2.5">[ LINKEDIN ]</a>
                                <a href={`mailto:${EMAIL}`} className="key py-2.5">[ EMAIL ]</a>
                            </div>
                            <button onClick={() => window.print()} className="no-print mt-3 w-full text-xs text-[var(--faded)] hover:text-[var(--ink)] underline decoration-dotted underline-offset-4">
                                print a copy
                            </button>

                            <p className="pt-6 text-[var(--faded)] text-[11px]">&copy; {new Date().getFullYear()} PAUL AJI · DUBLIN</p>
                        </footer>
                    </article>
                </div>
            </main>

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img src={lightbox.images[lightbox.index]} alt={`${lightbox.title} screenshot ${lightbox.index + 1}`} className="w-full max-h-[80vh] object-contain" />
                        <div className="mt-4 flex items-center justify-between text-xs tracking-[0.2em] text-[#C9C4BB]">
                            <button disabled={lightbox.index === 0} onClick={() => setLightbox({ ...lightbox, index: lightbox.index - 1 })} className="px-3 py-2 border border-current disabled:opacity-20 hover:bg-white hover:text-black transition">&lt; PREV</button>
                            <span>{lightbox.title.toUpperCase()} · {lightbox.index + 1}/{lightbox.images.length}</span>
                            <button disabled={lightbox.index === lightbox.images.length - 1} onClick={() => setLightbox({ ...lightbox, index: lightbox.index + 1 })} className="px-3 py-2 border border-current disabled:opacity-20 hover:bg-white hover:text-black transition">NEXT &gt;</button>
                        </div>
                        <button onClick={() => setLightbox(null)} className="absolute -top-2 right-0 -translate-y-full text-xs tracking-[0.2em] text-[#C9C4BB] hover:text-white">[ CLOSE X ]</button>
                    </div>
                </div>
            )}
        </div>
    );
}
