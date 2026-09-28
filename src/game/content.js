// Everything on the board. Edit copy here; layout and rules live elsewhere.

export const EMAIL = 'paulajiparayil123@gmail.com';
export const LINKS = {
    linkedin: 'https://linkedin.com/in/paulaji/',
    github: 'https://github.com/paulaji',
};

export const START_MONEY = 1500;
export const GO_BONUS = 300;
export const WIN_DEEDS = 7;
export const RAIL_PRICE = 200;
export const UTIL_PRICE = 150;
export const INCIDENT_FEE = 50;

export const SETS = {
    walnut: { name: 'Walnut · The Academy', color: 'var(--walnut)' },
    steel: { name: 'Steel · Foundations', color: 'var(--steel)' },
    rose: { name: 'Rose · Infrastructure', color: 'var(--rose)' },
    amber: { name: 'Amber · Quality & Integration', color: 'var(--amber)' },
    oxblood: { name: 'Oxblood · Early Builds', color: 'var(--oxblood)' },
    ochre: { name: 'Ochre · Creative & AI', color: 'var(--ochre)' },
    forest: { name: 'Forest · Trusttech & Pixel Forge', color: 'var(--forest)' },
    navy: { name: 'Navy · Infinite Payment Technology', color: 'var(--navy)' },
};

const prop = (n, set, price, o) => ({ t: 'prop', n, set, price, ...o });
const skill = (n, set, price, items) =>
    prop(n, set, price, { skill: true, who: 'Skill set', desc: `${items.length} tools in daily use.`, rows: items, tech: [] });

// Forty squares, clockwise from GO (bottom-right corner).
export const SQUARES = [
    { t: 'go', big: 'GO', small: `Collect €${GO_BONUS} · 3+ yrs` },
    prop('B.Tech Computer Science', 'walnut', 60, {
        who: 'Adi Shankara Institute of Engineering & Technology · 2018–2023',
        desc: 'Where it started: computer science fundamentals, a college band, and organising every fest going.',
        rows: ['GPA 2.76', 'Lead vocalist, college band', 'Event organiser & coordinator'], tech: [],
    }),
    { t: 'treasury' },
    prop('MEng CV & AI', 'walnut', 60, {
        who: 'University of Limerick · 2024–2025',
        desc: 'MEng in Computer Vision and Artificial Intelligence, First Class Honours. Thesis: an AI tutor that teaches Python.',
        rows: ['First Class Honours', 'QCA 3.37', 'Thesis graded A1', 'Java teaching assistant'], tech: [],
    }),
    { t: 'tax', n: 'Technical Debt', amt: 200, ic: '−', msg: 'The shortcut from last sprint came due.' },
    { t: 'rail', n: 'Card Rail', ic: '◆', desc: "Card schemes route an authorisation from the merchant's acquirer to the cardholder's issuer in milliseconds, then clear and settle the money later. Most of Paul's day lives downstream of this." },
    skill('Languages', 'steel', 100, ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL']),
    { t: 'wildcard' },
    skill('Frontend', 'steel', 100, ['React', 'Next.js', 'Redux', 'TailwindCSS', 'Material-UI']),
    skill('Backend', 'steel', 120, ['NestJS', 'Django', 'DRF', 'Flask', 'FastAPI', 'Node.js', 'Express']),
    { t: 'jail', big: 'Incident', small: 'Just visiting' },
    skill('Cloud', 'rose', 140, ['AWS', 'GCP', 'Lambda', 'RDS', 'S3', 'Firebase']),
    { t: 'util', n: 'The Court', ic: '◎', desc: 'Badminton first, then whatever else is on. Off court, Paul watches esports.' },
    skill('Databases', 'rose', 140, ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Firestore', 'Prisma']),
    skill('DevOps', 'rose', 160, ['Docker', 'Nx', 'CI/CD', 'GitHub Actions', 'SonarQube', 'Trivy']),
    { t: 'rail', n: 'SEPA Rail', ic: '◆', desc: 'SEPA moves euro bank transfers between 36 European countries on shared rules, including SEPA Instant for payments that land in seconds.' },
    skill('Testing', 'amber', 180, ['Jest', 'Vitest', 'Pytest', 'Cucumber/Gherkin', 'LocalStack', 'TDD']),
    { t: 'treasury' },
    skill('APIs & Events', 'amber', 180, ['REST', 'OpenAPI', 'WebSockets', 'Socket.IO', 'Event-driven']),
    skill('Integrations', 'amber', 200, ['Stripe Connect', 'Twilio', 'OAuth 2.0', 'JWT', 'MetaTrader 5']),
    { t: 'parking', big: 'Coffee', small: 'Free parking · say hi' },
    prop('Discord Bots', 'oxblood', 220, {
        who: 'Wrecked Tech · Solutions Developer',
        desc: 'A set of bots that kept a community busy.',
        rows: ['OpenAI-powered community chatbot', 'Image generator on the cr(AI)yon API', 'Poll bot and an admin feedback bot'],
        tech: ['Discord.js', 'Discord.py'],
    }),
    { t: 'wildcard' },
    prop('Biowel Website', 'oxblood', 220, {
        who: 'Biowel Industries · Web Developer',
        desc: 'Designed, built, hosted and maintained the company website.',
        rows: ['Designed in Figma', 'Built with React and Node.js', 'Hosted on AWS and a VPS'],
        tech: ['React', 'Node.js', 'AWS'],
    }),
    prop('Carvetpro', 'oxblood', 240, {
        who: 'Ineffable Design Solutions · Development Coordinator',
        desc: 'Full-stack platform on AWS that generates PDFs and delivers them over WhatsApp.',
        rows: ['Coordinated a three-person team', 'CloudFront over S3 with CloudWatch', 'PDFs sent via Twilio WhatsApp'],
        tech: ['React', 'Node.js', 'CloudFront', 'Twilio'],
    }),
    { t: 'rail', n: 'SWIFT Rail', ic: '◆', desc: 'SWIFT is the messaging network banks use to instruct cross-border payments. The money moves through correspondent accounts; SWIFT carries the instructions.' },
    prop('Learning to Program', 'ochre', 260, {
        who: 'University of Limerick · MEng Thesis · A1',
        desc: 'An AI tutor that teaches Python with LLM-generated questions, feedback and tips.',
        rows: ['React + Flask, Llama 3.3 70B via Groq', 'Questions and feedback across six topics', 'Runs code in the browser with Pyodide'],
        tech: ['React', 'Flask', 'Groq', 'Pyodide'],
    }),
    prop('MahaMeru', 'ochre', 260, {
        who: 'Ineffable Design Solutions · Lead Full Stack Engineer',
        desc: 'Multilingual, server-rendered site with rich animation and its own CMS.',
        rows: ['Led the Next.js + MySQL build', 'Custom CMS for all content', 'Lottie animation, Cloudflare edge caching'],
        tech: ['Next.js', 'MySQL', 'Tailwind', 'Cloudflare'],
    }),
    { t: 'util', n: 'Sound System', ic: '♪', desc: 'House, R&B, techno and rap. Music is the constant behind most of the work on this board.' },
    skill('AI-Assisted', 'ochre', 280, ['Claude Code CLI', 'GitHub Copilot', 'LLMs', 'Prompt Engineering']),
    { t: 'gotojail', big: 'Go to', small: 'Incident' },
    prop('TrustPMS', 'forest', 300, {
        who: 'Trusttech Solutions · Fullstack Python Developer',
        desc: 'Internal system running payroll, attendance and bug tracking for 50+ employees.',
        rows: ['React/Redux on Django REST + MSSQL', 'Real-time sync with Socket.io', 'Auto-scaling on AWS ECS'],
        tech: ['React', 'Django', 'MSSQL', 'AWS ECS'],
    }),
    prop('Trust Capital CRM', 'forest', 300, {
        who: 'Trusttech Solutions · Fullstack Python Developer',
        desc: 'CRM for a trading platform serving 4,000+ active traders.',
        rows: ['Extended Django REST APIs incl. trade execution', 'MetaTrader 5 DLL for live account data', 'WebSocket alerts, tuned MSSQL queries'],
        tech: ['Django', 'WebSockets', 'MT5', 'MSSQL'],
    }),
    { t: 'treasury' },
    prop('FindASide', 'forest', 320, {
        who: 'Pixel Forge Design · Backend Engineer',
        desc: 'Sports facility booking marketplace with real-time payments.',
        rows: ['Stripe Connect: intents, payouts, refunds', 'Node.js on Firestore with Firebase Auth', 'GitHub Actions CI/CD, zero-downtime deploys'],
        tech: ['Node.js', 'Firestore', 'Stripe Connect', 'Firebase'],
    }),
    { t: 'rail', n: 'Faster Payments', ic: '◆', desc: "The UK's real-time bank transfer scheme: payments settle between banks in seconds, around the clock." },
    { t: 'wildcard' },
    prop('Customer Billing Engine', 'navy', 350, {
        who: 'Infinite Payment Technology · Settle Team',
        desc: 'Monthly customer billing, end to end: the data model, a config-driven fee engine and the scheduled Lambda that runs it.',
        rows: ['Idempotent by design: safe re-runs', 'New fee types ship as config, not code', 'BigNumber maths, per-fee failure isolation', 'EventBridge schedule, replay date, kill switch'],
        tech: ['TypeScript', 'Prisma', 'PostgreSQL', 'Lambda', 'EventBridge'],
    }),
    { t: 'tax', n: 'Scope Creep', amt: 100, ic: '−', msg: '“Can it also do one more thing?”' },
    prop('Merchant Payments Platform', 'navy', 400, {
        who: 'Infinite Payment Technology · Full Stack Developer · Settle Team',
        desc: 'Settle core team on a merchant onboarding and payments platform: money movement, reconciliation, merchant billing and retries, integrating with acquirers like Worldline, ACI and Banking Circle.',
        rows: ['S3-triggered reconciliation pipelines', 'Three settlement reports, one shared layer', 'VAT summary in BigNumber, per country', 'Gherkin tests on Dockerised databases', 'The Customer Billing Engine'],
        tech: ['TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Lambda', 'SQS', 'Nx'],
    }),
];

export const WILDCARDS = [
    { t: 'AI & Agentic Systems Consultant', d: 'Mentoring a medical company on agentic AI for sales. Collect consulting fee.', amt: 150 },
    { t: 'Prompt Engineering Educator', d: 'Taught classes of 30–50 at Sevana Electricals and Biowel. Collect speaker fees.', amt: 50 },
    { t: 'Lead Vocalist', d: 'College band, ASIET. Advance to Sound System.', to: 28 },
    { t: 'Student of the Year', d: 'Proficiency award and Student of the Year. Collect scholarship.', amt: 100 },
    { t: 'Java Teaching Assistant', d: 'University of Limerick. Collect TA stipend.', amt: 20 },
    { t: 'Frontend Developer at Edith', d: 'Shipped features for an EdTech startup. Advance to GO.', to: 0 },
    { t: 'Malayalam movie night', d: 'Something good just dropped. Advance to Coffee and bring snacks.', to: 20 },
];

export const TREASURY = [
    { t: 'Bank error in your favour', d: 'Exactly €0.005, rounded half-up. Collect €0.01. (That is how Paul rounds.)', amt: 0.01 },
    { t: 'Idempotency pays', d: 'A billing run failed halfway. Re-run it for free: nothing double-charges. Collect €100.', amt: 100 },
    { t: 'LocalStack → Flocci', d: 'Swapped the AWS mocking layer for an open-source one. Collect savings.', amt: 40 },
    { t: 'First-of-month fee bug', d: 'Diagnosed a recurring first-of-month fee bug. Pay for the hotfix.', amt: -50 },
    { t: 'Coffee chat', d: 'Advance to Coffee. Someone wants to talk about payments.', to: 20 },
    { t: 'Audit-log redaction', d: 'Caught tokens and salts leaking into audit logs. Collect a security bounty.', amt: 75 },
    { t: 'Home-cooked, not takeaway', d: 'Paul cooks. Collect what the takeaway would have cost.', amt: 30 },
    { t: 'Esports final tonight', d: 'Second screen on. Advance to The Court.', to: 12 },
];

export const POSTMORTEMS = [
    'A retry storm hit the settlement queue. Postmortem: add backoff and jitter.',
    'Fixed monthly charges hit the wrong pricing table. Postmortem: cover every charge type.',
    'A transitive dependency broke CI. Postmortem: pin, then upgrade on purpose.',
];

export const SUMMARY = {
    lead: 'is a full-stack engineer in Dublin who builds the parts of payments where the money has to add up: settlement, reconciliation and billing, on the Settle team at Infinite Payment Technology. MEng in Computer Vision & AI, First Class Honours.',
    facts: [['Experience', '3+ yrs'], ['Projects', '10'], ['Based', 'Dublin']],
};

/* helpers */
export const isCorner = (s) => ['go', 'jail', 'parking', 'gotojail'].includes(s.t);
export const priceOf = (s) => (s.t === 'prop' ? s.price : s.t === 'rail' ? RAIL_PRICE : s.t === 'util' ? UTIL_PRICE : null);
export const labelOf = (s) => s.n || { treasury: 'Treasury', wildcard: 'Wildcard' }[s.t] || s.big;
export const fmt = (n) => '€' + (Math.round(n * 100) / 100).toLocaleString('en-IE', { minimumFractionDigits: n % 1 ? 2 : 0 });

/* ---------------- stats: what each unlocked deed builds ---------------- */

export const STATS = [
    { key: 'money', label: 'Money Moved', title: 'The Settler' },
    { key: 'reliability', label: 'Reliability', title: 'The Auditor' },
    { key: 'scale', label: 'Scale', title: 'The Architect' },
    { key: 'craft', label: 'Craft', title: 'The Artisan' },
    { key: 'lead', label: 'Leadership', title: 'The Captain' },
    { key: 'curiosity', label: 'Curiosity', title: 'The Scholar' },
];

const STAT_TABLE = {
    'B.Tech Computer Science': { curiosity: 8, lead: 6 },
    'MEng CV & AI': { curiosity: 18, craft: 4 },
    'Card Rail': { money: 6 },
    'Languages': { craft: 8, curiosity: 4 },
    'Frontend': { craft: 12 },
    'Backend': { reliability: 6, scale: 6 },
    'Cloud': { scale: 12 },
    'The Court': { lead: 4 },
    'Databases': { reliability: 6, scale: 6 },
    'DevOps': { reliability: 10, scale: 4 },
    'SEPA Rail': { money: 6 },
    'Testing': { reliability: 14 },
    'APIs & Events': { scale: 6, reliability: 4 },
    'Integrations': { money: 8, craft: 2 },
    'Discord Bots': { curiosity: 6, craft: 4 },
    'Biowel Website': { craft: 8 },
    'Carvetpro': { lead: 12, scale: 4 },
    'SWIFT Rail': { money: 6 },
    'Learning to Program': { curiosity: 14, craft: 6 },
    'MahaMeru': { lead: 14, craft: 8 },
    'Sound System': { craft: 4 },
    'AI-Assisted': { curiosity: 8 },
    'TrustPMS': { scale: 6, craft: 6 },
    'Trust Capital CRM': { money: 10, scale: 10 },
    'FindASide': { money: 16, reliability: 6 },
    'Faster Payments': { money: 6 },
    'Customer Billing Engine': { money: 20, reliability: 14 },
    'Merchant Payments Platform': { money: 24, reliability: 12, scale: 8 },
};
SQUARES.forEach((s) => { if (STAT_TABLE[s.n]) s.st = STAT_TABLE[s.n]; });

const STAT_MAX = Object.fromEntries(STATS.map(({ key }) => [key, SQUARES.reduce((sum, s) => sum + (s.st?.[key] || 0), 0)]));
const indexOf = (name) => SQUARES.findIndex((s) => s.n === name);

export const HONOURS = [
    { name: 'Settlement Specialist', note: 'Both navy deeds', need: ['Customer Billing Engine', 'Merchant Payments Platform'] },
    { name: 'Full Stack', note: 'Frontend, Backend and Databases', need: ['Frontend', 'Backend', 'Databases'] },
    { name: 'Ships Safely', note: 'Testing and DevOps', need: ['Testing', 'DevOps'] },
    { name: 'Rail Baron', note: 'All four payment rails', need: ['Card Rail', 'SEPA Rail', 'SWIFT Rail', 'Faster Payments'] },
    { name: 'The Academy', note: 'Both degrees', need: ['B.Tech Computer Science', 'MEng CV & AI'] },
    { name: 'Off the Clock', note: 'The Court and Sound System', need: ['The Court', 'Sound System'] },
].map((h) => ({ ...h, idx: h.need.map(indexOf) }));

// A 0-99 rating per stat, an overall rating, a title and the honours held.
export function profileOf(owned) {
    const raw = Object.fromEntries(STATS.map(({ key }) => [key, 0]));
    owned.forEach((i) => Object.entries(SQUARES[i].st || {}).forEach(([k, v]) => { raw[k] += v; }));
    const rating = Object.fromEntries(STATS.map(({ key }) => [key, Math.round((99 * raw[key]) / STAT_MAX[key])]));
    const values = Object.values(rating);
    const overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const top = STATS.reduce((best, s) => (rating[s.key] > rating[best.key] ? s : best), STATS[0]);
    const title = rating[top.key] > 0 ? top.title : 'The Rookie';
    const honours = HONOURS.filter((h) => h.idx.every((i) => owned.has(i)));
    return { rating, overall, title, honours };
}

// What unlocking square i adds, as ratings points.
export const gainsOf = (i) => STATS.filter(({ key }) => SQUARES[i].st?.[key])
    .map(({ key, label }) => ({ key, label, pts: Math.max(1, Math.round((99 * SQUARES[i].st[key]) / STAT_MAX[key])) }));

// Landing on a deed you already hold pays a dividend; double for a full colour set.
export function dividendOf(i, owned) {
    const s = SQUARES[i];
    const base = Math.max(10, Math.round((priceOf(s) * 0.15) / 5) * 5);
    const fullSet = s.t === 'prop' && SQUARES.every((x, j) => x.t !== 'prop' || x.set !== s.set || owned.has(j));
    return { amount: fullSet ? base * 2 : base, doubled: fullSet };
}
