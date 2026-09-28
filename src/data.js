// Everything the receipt prints. Edit copy here; layout lives in App.jsx.

export const EMAIL = "paulajiparayil123@gmail.com";

export const links = {
    github: "https://github.com/paulaji",
    linkedin: "https://linkedin.com/in/paulaji/",
};

export const projects = [
    {
        id: "merchant-payments",
        status: "PROCESSING",
        title: "Merchant Payments Platform",
        company: "Infinite Payment Technology",
        role: "Full Stack Developer · Settle Team",
        description: "Settle core team on a merchant onboarding and payments platform: money movement, reconciliation, merchant billing and retries, integrating with acquirers like Worldline, ACI and Banking Circle.",
        highlights: [
            "Built S3-triggered Lambda pipelines that parse merchant CSV/XML files, reconcile them against the merchant DB and email reports of unmatched records",
            "Collapsed three settlement reports onto one shared query, CSV and orchestration layer",
            "Built the VAT summary on merchant billing statements with BigNumber arithmetic and per-country VAT rates",
            "Wrote Gherkin integration tests against Dockerised databases and moved AWS mocking from LocalStack to Flocci",
        ],
        tech: ["TypeScript", "NestJS", "PostgreSQL", "Prisma", "AWS Lambda", "S3", "SQS", "Nx", "Vitest", "Jest", "Cucumber", "Docker"],
        images: [],
    },
    {
        id: "customer-billing",
        title: "Customer Billing Engine",
        company: "Infinite Payment Technology",
        role: "Full Stack Developer · Settle Team",
        description: "Monthly customer billing, end to end: the data model, a config-driven fee engine, and the scheduled Lambda that runs it.",
        highlights: [
            "Idempotent by design: one unique key per customer, fee and month makes every re-run safe, and rates are stored beside amounts so each bill stays explainable",
            "Config-driven fee engine: the second fee type shipped as a single config entry, no new code",
            "Money-safe BigNumber maths with per-customer and per-fee failure isolation, so one bad record never stops a run",
            "Scheduled via EventBridge through the existing Lambda, with a replay date and a kill switch so it could ship dark",
        ],
        tech: ["TypeScript", "Prisma", "PostgreSQL", "AWS Lambda", "EventBridge", "SSM", "BigNumber.js", "Nx"],
        images: [],
    },
    {
        id: "findaside",
        title: "FindASide",
        company: "Pixel Forge Design Limited",
        role: "Backend Engineer",
        description: "Sports facility booking marketplace with real-time payments.",
        highlights: [
            "Built the payments marketplace on Stripe Connect: payment intents, payouts, refunds and recurring charges",
            "Node.js backend on Firestore with Firebase Auth and REST APIs for bookings and payments",
            "GitHub Actions CI/CD with automated tests and zero-downtime deploys",
        ],
        tech: ["Node.js", "Firestore", "Stripe Connect", "Firebase", "GitHub Actions"],
        images: ['./projectsnippets/FindASide.png', './projectsnippets/FindASideLogin.png', './projectsnippets/FindASidePayment.png'],
    },
    {
        id: "mahameru",
        title: "MahaMeru Innovations",
        company: "Ineffable Design Solutions",
        role: "Lead Full Stack Engineer",
        description: "Multilingual, server-rendered site with rich animation and its own CMS.",
        highlights: [
            "Led the team building a multilingual Next.js app on MySQL with custom APIs",
            "Built a CMS dashboard that runs all site content and images",
            "Lottie and scroll animations up front; Cloudflare CDN with edge caching behind",
        ],
        tech: ["Next.js", "React", "MySQL", "TailwindCSS", "Cloudflare", "Lottie"],
        images: ['./projectsnippets/MahaMeru.png', './projectsnippets/MahaMeruAnimation.png', './projectsnippets/MahaMeruLogo.png'],
    },
    {
        id: "trustpms",
        title: "TrustPMS",
        company: "Trusttech Solutions LLP",
        role: "Fullstack Python Developer",
        description: "Internal system running payroll, attendance and bug tracking for 50+ employees.",
        highlights: [
            "React and Redux front end on a Django REST back end with MSSQL",
            "Real-time notifications and sync across teams with Socket.io",
            "Containerised on AWS ECS with auto-scaling and health checks",
        ],
        tech: ["React", "Redux", "Django", "DRF", "MSSQL", "Docker", "AWS ECS", "Socket.io"],
        images: ['./projectsnippets/TrustPMS.png'],
    },
    {
        id: "trust-capital",
        title: "Trust Capital CRM",
        company: "Trusttech Solutions LLP",
        role: "Fullstack Python Developer",
        description: "CRM for a trading platform serving 4,000+ active traders.",
        highlights: [
            "Extended the Django REST APIs, including trade execution",
            "Integrated the MetaTrader 5 DLL for live account data",
            "WebSocket alerts to concurrent traders, plus tuned MSSQL queries for high-frequency data",
        ],
        tech: ["Django", "DRF", "WebSockets", "MetaTrader 5", "MSSQL"],
        images: ['./projectsnippets/TrustCapitalCRM.png'],
    },
    {
        id: "learning-to-program",
        title: "Learning to Program",
        company: "University of Limerick",
        role: "MEng Thesis · Graded A1",
        description: "An AI tutor that teaches Python with LLM-generated questions, feedback and tips.",
        highlights: [
            "React front end and Flask back end calling Llama 3.3 70B through the Groq API",
            "Prompt-engineered questions, feedback and tips across six topics",
            "Runs student code in the browser with Pyodide for instant feedback",
        ],
        tech: ["React", "Flask", "Groq API", "Llama 3.3", "Pyodide", "Prompt Engineering"],
        images: ['./projectsnippets/FinalProject.jpeg'],
    },
    {
        id: "carvetpro",
        title: "Carvetpro",
        company: "Ineffable Design Solutions",
        role: "Development Coordinator",
        description: "Full-stack platform on AWS that generates PDFs and delivers them over WhatsApp.",
        highlights: [
            "Coordinated a three-person team with agile rituals and code reviews",
            "Set up CloudFront over an S3 origin with CloudWatch monitoring",
            "React and Node.js with Google OAuth; PDFs sent through Twilio's WhatsApp API",
        ],
        tech: ["React", "Node.js", "AWS", "CloudFront", "Google OAuth", "Twilio"],
        images: ['./projectsnippets/CarvetPro.png'],
    },
    {
        id: "discord-bots",
        title: "Discord Bots",
        company: "Wrecked Tech Private Limited",
        role: "Solutions Developer",
        description: "A set of bots that kept a community busy.",
        highlights: [
            "OpenAI-powered community chatbot",
            "Image generator on the cr(AI)yon API",
            "A poll bot, and a feedback bot that routes to admin channels",
        ],
        tech: ["Discord.js", "Discord.py", "OpenAI API"],
        images: ['./projectsnippets/gator1.png', './projectsnippets/gator2.png', './projectsnippets/gator3.png', './projectsnippets/gptbot1.png', './projectsnippets/gptbot2.png', './projectsnippets/nortpoll1.png', './projectsnippets/nortpoll2.png'],
    },
    {
        id: "biowel",
        title: "Biowel Website",
        company: "Biowel Industries",
        role: "Web Developer",
        description: "Designed, built, hosted and maintained the company website.",
        highlights: [
            "Designed in Figma, built with React and Node.js",
            "Hosted and maintained on AWS and a VPS",
        ],
        tech: ["Figma", "React", "Node.js", "AWS", "VPS"],
        images: ['./projectsnippets/biowelweb1.png', './projectsnippets/biowelweb2.png', './projectsnippets/biowelweb3.png'],
    },
];

export const skills = [
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

export const education = [
    { degree: "MEng, Computer Vision & AI", school: "University of Limerick", when: "2024 – 2025", grade: "QCA 3.37", stamp: "First Class" },
    { degree: "B.Tech, Computer Science", school: "Adi Shankara Institute of Engineering & Technology", when: "2018 – 2023", grade: "GPA 2.76" },
];

export const extras = [
    { title: "AI & Agentic Systems Consultant", note: "Mentoring a medical company on agentic AI for sales" },
    { title: "AI & Prompt Engineering Educator", note: "Classes of 30–50 at Sevana Electricals & Biowel" },
    { title: "Frontend Developer", note: "Edith, an EdTech startup" },
    { title: "Java Teaching Assistant", note: "University of Limerick" },
    { title: "Lead Vocalist", note: "College band, ASIET" },
    { title: "Event Organiser", note: "Industrial visits and cultural fests, ASIET" },
    { title: "Proficiency Award & Student of the Year", note: "School" },
    { title: "Community Mentor", note: "Teaching friends and peers to code" },
    { title: "Sports & Cultural Activities", note: "Multi-sport, ASIET" },
];
