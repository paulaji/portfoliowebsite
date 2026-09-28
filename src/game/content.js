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
    { t: 'tax', n: 'Technical Debt', amt: 200, ic: '−', msg: 'That shortcut from last sprint? It has sent an invoice.' },
    { t: 'rail', n: 'The Court', ic: '✕', desc: 'Badminton, mostly, plus whatever sport has a free slot. Line calls are disputed. Always.' },
    skill('Languages', 'steel', 100, ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL']),
    { t: 'wildcard' },
    skill('Frontend', 'steel', 100, ['React', 'Next.js', 'Redux', 'TailwindCSS', 'Material-UI']),
    skill('Backend', 'steel', 120, ['NestJS', 'Django', 'DRF', 'Flask', 'FastAPI', 'Node.js', 'Express']),
    { t: 'jail', big: 'Incident', small: 'Just visiting' },
    skill('Cloud', 'rose', 140, ['AWS', 'GCP', 'Lambda', 'RDS', 'S3', 'Firebase']),
    { t: 'util', n: 'Café Circuit', ic: '◒', desc: 'Rates cafés on flat whites and wifi. The laptop comes along just in case. It is never just in case.' },
    skill('Databases', 'rose', 140, ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Firestore', 'Prisma']),
    skill('DevOps', 'rose', 160, ['Docker', 'Nx', 'CI/CD', 'GitHub Actions', 'SonarQube', 'Trivy']),
    { t: 'rail', n: 'Esports Arena', ic: '▲', desc: 'Watches pros play at a level he will never reach, then critiques their drafts anyway.' },
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
    { t: 'rail', n: 'The Cinema', ic: '◐', desc: 'Malayalam films on release day, English ones too. Currently in a Guy Ritchie phase, so expect a heist plan for lunch.' },
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
    { t: 'util', n: 'After Dark', ic: '♪', desc: 'House, techno, R&B and rap. Pub crawls come with a route plan, because of course they do.' },
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
    { t: 'rail', n: 'The Kitchen', ic: '◆', desc: 'Cooks properly. Measures nothing. Somehow it works, much like early production code.' },
    { t: 'wildcard' },
    prop('Customer Billing Engine', 'navy', 350, {
        who: 'Infinite Payment Technology · Settle Team',
        desc: 'Monthly customer billing, end to end: the data model, a config-driven fee engine and the scheduled Lambda that runs it.',
        rows: ['Idempotent by design: safe re-runs', 'New fee types ship as config, not code', 'BigNumber maths, per-fee failure isolation', 'EventBridge schedule, replay date, kill switch'],
        tech: ['TypeScript', 'Prisma', 'PostgreSQL', 'Lambda', 'EventBridge'],
    }),
    { t: 'tax', n: 'Scope Creep', amt: 100, ic: '−', msg: '“Quick one: can it also do everything?”' },
    prop('Merchant Payments Platform', 'navy', 400, {
        who: 'Infinite Payment Technology · Full Stack Developer · Settle Team',
        desc: 'Settle core team on a merchant onboarding and payments platform: money movement, reconciliation, merchant billing and retries, integrating with acquirers like Worldline, ACI and Banking Circle.',
        rows: ['S3-triggered reconciliation pipelines', 'Three settlement reports, one shared layer', 'VAT summary in BigNumber, per country', 'Gherkin tests on Dockerised databases', 'The Customer Billing Engine'],
        tech: ['TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Lambda', 'SQS', 'Nx'],
    }),
];

export const WILDCARDS = [
    { t: 'AI & Agentic Systems Consultant', d: 'Teaching a medical company to let AI agents do the selling. The agents have not asked for commission yet. Collect €150.', amt: 150 },
    { t: 'Prompt Engineering Educator', d: 'Taught rooms of 30 to 50 people how to talk to computers politely. Collect speaker fees.', amt: 50 },
    { t: 'Lead Vocalist', d: 'Fronted the college band at ASIET. The crowd was mostly friends. Advance to After Dark.', to: 28 },
    { t: 'Student of the Year', d: 'Proficiency Award and Student of the Year. Peaked early, kept going anyway. Collect €100.', amt: 100 },
    { t: 'Java Teaching Assistant', d: 'University of Limerick. Explained NullPointerExceptions for a living. Collect €20.', amt: 20 },
    { t: 'Frontend Developer at Edith', d: 'Shipped features for an EdTech startup. Pixel pushing counts as cardio. Advance to GO.', to: 0 },
    { t: 'Movie night', d: 'Something new just dropped. Phone on silent, opinions on loud. Advance to The Cinema.', to: 25 },
];

export const TREASURY = [
    { t: 'Bank error in your favour', d: 'Exactly €0.005, rounded half up. Collect €0.01. Try not to spend it all at once.', amt: 0.01 },
    { t: 'Idempotency pays', d: 'A billing run died halfway. Re-ran it. Nobody got charged twice. Nobody even noticed. Collect €100.', amt: 100 },
    { t: 'LocalStack → Flocci', d: 'Swapped one AWS mock for another. Thrilling stuff. Collect €40.', amt: 40 },
    { t: 'First-of-month fee bug', d: 'A fee bug that only shows up on the 1st of the month. Of course it does. Pay €50 for the hotfix.', amt: -50 },
    { t: 'Coffee chat', d: 'Someone wants to talk about payments. Voluntarily. Advance to Coffee.', to: 20 },
    { t: 'Audit-log redaction', d: 'Found tokens and salts sitting in the audit logs. Seasoning belongs in The Kitchen. Collect €75.', amt: 75 },
    { t: 'Home-cooked', d: 'Cooked instead of ordering in. Smug, but correct. Collect €30.', amt: 30 },
    { t: 'Five-set badminton', d: 'Won the decider. Will mention it twice before lunch. Advance to The Court.', to: 5 },
    { t: 'Esports final tonight', d: 'Second screen on, first screen pretending to be work. Advance to Esports Arena.', to: 15 },
    { t: 'Touched grass', d: 'Went outdoors on purpose. No signal, no incidents, suspiciously calm. Collect €40.', amt: 40 },
    { t: 'Pub crawl', d: 'Planned with a route, a schedule and a fallback pub. Your round. Pay €40.', amt: -40 },
    { t: 'Café hopping', d: 'Three cafés, one afternoon, zero commits. Advance to Café Circuit.', to: 12 },
];

export const POSTMORTEMS = [
    'A retry storm hit the settlement queue. Turns out “try again” is not a strategy. Added backoff and jitter.',
    'Fixed monthly charges landed in the wrong pricing table. The tests now cover every charge type, out of spite.',
    'A transitive dependency broke CI. Nobody installed it, everybody inherited it. Pinned, then upgraded on purpose.',
];

export const SUMMARY = {
    lead: 'is a full-stack engineer in Dublin who works on the parts of payments where the maths actually has to add up: settlement, reconciliation and billing, on the Settle team at Infinite Payment Technology. MEng in Computer Vision & AI, First Class Honours, which mostly qualifies him to explain why the model is wrong.',
    facts: [['Experience', '3+ yrs'], ['Projects', '10'], ['Based', 'Dublin']],
};

/* helpers */
export const isCorner = (s) => ['go', 'jail', 'parking', 'gotojail'].includes(s.t);
export const priceOf = (s) => (s.t === 'prop' ? s.price : s.t === 'rail' ? RAIL_PRICE : s.t === 'util' ? UTIL_PRICE : null);
export const labelOf = (s) => s.n || { treasury: 'Treasury', wildcard: 'Wildcard' }[s.t] || s.big;
export const fmt = (n) => '€' + (Math.round(n * 100) / 100).toLocaleString('en-IE', { minimumFractionDigits: n % 1 ? 2 : 0 });

/* ---------------- stats ----------------
   Work deeds build the six stats but cost Form (the grind).
   Hobbies restore Form, and Form multiplies every stat (0.75x to 1.25x).
   A full colour set boosts that set's stats by 25%. Selling a deed takes it all back. */

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
    'Languages': { craft: 8, curiosity: 4 },
    'Frontend': { craft: 12 },
    'Backend': { reliability: 6, scale: 6 },
    'Cloud': { scale: 12 },
    'Databases': { reliability: 6, scale: 6 },
    'DevOps': { reliability: 10, scale: 4 },
    'Testing': { reliability: 14 },
    'APIs & Events': { scale: 6, reliability: 4 },
    'Integrations': { money: 8, craft: 2 },
    'Discord Bots': { curiosity: 6, craft: 4 },
    'Biowel Website': { craft: 8 },
    'Carvetpro': { lead: 12, scale: 4 },
    'Learning to Program': { curiosity: 14, craft: 6 },
    'MahaMeru': { lead: 14, craft: 8 },
    'AI-Assisted': { curiosity: 8 },
    'TrustPMS': { scale: 6, craft: 6 },
    'Trust Capital CRM': { money: 10, scale: 10 },
    'FindASide': { money: 16, reliability: 6 },
    'Customer Billing Engine': { money: 20, reliability: 14 },
    'Merchant Payments Platform': { money: 24, reliability: 12, scale: 8 },
    // hobbies: mostly Form, with a small perk each
    'The Court': { lead: 3 },
    'Esports Arena': { curiosity: 3 },
    'The Cinema': { craft: 2 },
    'The Kitchen': { craft: 3 },
    'Café Circuit': { curiosity: 2 },
    'After Dark': { lead: 2 },
};
const FORM_TABLE = {
    'The Court': 12, 'Esports Arena': 8, 'The Cinema': 10, 'The Kitchen': 10, 'Café Circuit': 8, 'After Dark': 8,
};
const FORM_START = 60;
const WORK_FORM_COST = 4;
SQUARES.forEach((s) => {
    if (STAT_TABLE[s.n]) s.st = STAT_TABLE[s.n];
    if (s.t === 'prop') s.form = -WORK_FORM_COST;
    if (FORM_TABLE[s.n]) s.form = FORM_TABLE[s.n];
});

const STAT_MAX = Object.fromEntries(STATS.map(({ key }) => [key, SQUARES.reduce((sum, s) => sum + (s.st?.[key] || 0), 0)]));
const indexOf = (name) => SQUARES.findIndex((s) => s.n === name);

export const HONOURS = [
    { name: 'Settlement Specialist', note: 'Both navy deeds', need: ['Customer Billing Engine', 'Merchant Payments Platform'] },
    { name: 'Full Stack', note: 'Frontend, Backend and Databases', need: ['Frontend', 'Backend', 'Databases'] },
    { name: 'Ships Safely', note: 'Testing and DevOps', need: ['Testing', 'DevOps'] },
    { name: 'Weekend Warrior', note: 'The Court, Esports Arena, The Cinema and The Kitchen', need: ['The Court', 'Esports Arena', 'The Cinema', 'The Kitchen'] },
    { name: 'The Academy', note: 'Both degrees', need: ['B.Tech Computer Science', 'MEng CV & AI'] },
    { name: 'Night Owl', note: 'Café Circuit and After Dark', need: ['Café Circuit', 'After Dark'] },
].map((h) => ({ ...h, idx: h.need.map(indexOf) }));

const FORM_STATES = [[35, 'Burnt out'], [55, 'Grinding'], [75, 'Balanced'], [101, 'In the zone']];
const fullSets = (owned) => new Set(Object.keys(SETS).filter((k) => SQUARES.every((s, i) => s.t !== 'prop' || s.set !== k || owned.has(i))));

export function formOf(owned) {
    let f = FORM_START;
    owned.forEach((i) => { f += SQUARES[i].form || 0; });
    return Math.max(5, Math.min(100, f));
}

// Ratings 0-99, overall, title, form and honours for a set of owned squares.
export function profileOf(owned) {
    const sets = fullSets(owned);
    const raw = Object.fromEntries(STATS.map(({ key }) => [key, 0]));
    owned.forEach((i) => {
        const s = SQUARES[i];
        const boost = s.t === 'prop' && sets.has(s.set) ? 1.25 : 1;
        Object.entries(s.st || {}).forEach(([k, v]) => { raw[k] += v * boost; });
    });
    const form = formOf(owned);
    const mult = 0.75 + (0.5 * form) / 100;
    const rating = Object.fromEntries(STATS.map(({ key }) => [key, Math.min(99, Math.round((99 * raw[key] * mult) / STAT_MAX[key]))]));
    const values = Object.values(rating);
    const overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const top = STATS.reduce((best, x) => (rating[x.key] > rating[best.key] ? x : best), STATS[0]);
    const title = rating[top.key] > 0 ? top.title : 'The Rookie';
    const formState = FORM_STATES.find(([lim]) => form < lim)[1];
    const honours = HONOURS.filter((h) => h.idx.every((i) => owned.has(i)));
    return { rating, overall, title, form, formState, mult, sets: [...sets], honours };
}

// What unlocking square i would change on the card right now.
export function gainsOf(i, owned = new Set()) {
    const before = profileOf(owned);
    const after = profileOf(new Set([...owned, i]));
    const out = STATS.map(({ key, label }) => ({ key, label, pts: after.rating[key] - before.rating[key] })).filter((g) => g.pts !== 0);
    const df = after.form - before.form;
    if (df) out.push({ key: 'form', label: 'Form', pts: df });
    return out;
}

export const sellPriceOf = (i) => Math.round(priceOf(SQUARES[i]) / 2);

// Landing on a deed you already hold pays a dividend; double for a full colour set.
export function dividendOf(i, owned) {
    const s = SQUARES[i];
    const base = Math.max(10, Math.round((priceOf(s) * 0.15) / 5) * 5);
    const fullSet = s.t === 'prop' && fullSets(owned).has(s.set);
    return { amount: fullSet ? base * 2 : base, doubled: fullSet };
}
