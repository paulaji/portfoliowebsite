import React, { useState, useEffect, useRef, useCallback } from 'react';

import TechBanner from './components/TechBanner';
import { EMAIL, links, projects, skills, education, extras } from './data';

const pad = (n, len = 2) => String(n).padStart(len, '0');

/* ------------------------------------------------------------------ */
/* Sound: a thermal-printer buzz and a register bell, via Web Audio.   */
/* ------------------------------------------------------------------ */

function makeAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();

    const buzz = (duration = 0.045, level = 0.07) => {
        const len = Math.floor(ctx.sampleRate * duration);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) {
            // chopped noise reads as a print head stepping
            d[i] = (Math.random() * 2 - 1) * (i % 90 < 55 ? 1 : 0.25) * (1 - i / len);
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2600;
        filter.Q.value = 0.9;
        const gain = ctx.createGain();
        gain.gain.value = level;
        src.connect(filter).connect(gain).connect(ctx.destination);
        src.start();
    };

    const bell = () => {
        const t = ctx.currentTime;
        [1568, 2093, 3136].forEach((f, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.09 / (i + 1), t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
            osc.connect(g).connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 1.5);
        });
    };

    const rip = () => buzz(0.32, 0.12);

    return { ctx, buzz, bell, rip };
}

/* ------------------------------------------------------------------ */
/* Receipt primitives. Anything with .ln is a printable line.         */
/* ------------------------------------------------------------------ */

function Line({ label, value, strong, className = '' }) {
    return (
        <div className={`ln flex items-baseline gap-2 ${strong ? 'font-medium text-[var(--ink)]' : ''} ${className}`}>
            <span className="min-w-0">{label}</span>
            <span className="leader" aria-hidden="true" />
            <span className="text-right shrink-0">{value}</span>
        </div>
    );
}

const Rule = ({ double }) => <div className={`ln ${double ? 'rule-double' : 'rule'}`} aria-hidden="true" />;

function Heading({ children, id }) {
    return (
        <h2 id={id} className="ln scroll-mt-8 text-center font-medium tracking-[0.25em] text-[var(--ink)] my-5">
            ** {children} **
        </h2>
    );
}

const Stamp = ({ children, className = '' }) => <span className={`stamp ${className}`}>{children}</span>;

// Decorative barcode derived from a string (not a scannable symbology).
function Barcode({ text }) {
    const bars = [];
    let x = 0;
    [...text].forEach((ch, i) => {
        const c = ch.charCodeAt(0);
        for (let b = 0; b < 3; b++) {
            const w = ((c >> b) & 3) + 1;
            if ((i + b) % 2 === 0) bars.push(<rect key={`${i}-${b}`} x={x} y="0" width={w} height="48" />);
            x += w + 1;
        }
    });
    return (
        <svg viewBox={`0 0 ${x} 48`} preserveAspectRatio="none" className="w-full h-12" fill="currentColor" aria-hidden="true">
            {bars}
        </svg>
    );
}

function useDublinClock() {
    const read = () => {
        const d = new Date();
        const tz = { timeZone: 'Europe/Dublin' };
        return {
            date: new Intl.DateTimeFormat('en-GB', { ...tz, day: '2-digit', month: '2-digit', year: 'numeric' }).format(d),
            time: new Intl.DateTimeFormat('en-GB', { ...tz, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d),
        };
    };
    const [now, setNow] = useState(read);
    useEffect(() => {
        const t = setInterval(() => setNow(read()), 1000);
        return () => clearInterval(t);
    }, []);
    return now;
}

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Coupon redeemed: one coffee chat')}`;

/* ------------------------------------------------------------------ */

export default function Portfolio() {
    const clock = useDublinClock();
    const [openItem, setOpenItem] = useState(null);
    const [lightbox, setLightbox] = useState(null);
    const [torn, setTorn] = useState(false);
    const [sound, setSound] = useState(false);
    const [linesPrinted, setLinesPrinted] = useState(0);
    const [animate] = useState(() => !prefersReducedMotion() && typeof IntersectionObserver !== 'undefined');

    const machineRef = useRef(null);
    const queue = useRef([]);
    const audio = useRef(null);
    const soundOn = useRef(false);

    const play = useCallback((what) => {
        if (soundOn.current && audio.current) audio.current[what]();
    }, []);

    const toggleSound = () => {
        const next = !sound;
        if (next && !audio.current) audio.current = makeAudio();
        if (audio.current?.ctx.state === 'suspended') audio.current.ctx.resume();
        soundOn.current = next;
        setSound(next);
        if (next) audio.current?.bell();
    };

    // Lines ink in as they feed out of the slot at the bottom of the screen.
    useEffect(() => {
        const all = document.querySelectorAll('.receipt .ln:not(.printed)');
        if (!animate) {
            all.forEach((el) => el.classList.add('printed'));
            setLinesPrinted((n) => n + all.length);
            return;
        }
        const slotInset = Math.max((machineRef.current?.offsetHeight ?? 90) - 16, 0);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    io.unobserve(e.target);
                    queue.current.push(e.target);
                }
            });
        }, { rootMargin: `0px 0px -${slotInset}px 0px` });
        all.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [openItem, animate]);

    // The print head: one line per tick, catching up quickly on fast scrolls.
    useEffect(() => {
        if (!animate) return;
        const t = setInterval(() => {
            const q = queue.current;
            if (!q.length) return;
            q.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
            const batch = q.splice(0, q.length > 10 ? Math.ceil(q.length / 3) : 1);
            batch.forEach((el) => el.classList.add('printed'));
            setLinesPrinted((n) => n + batch.length);
            play('buzz');
        }, 50);
        return () => clearInterval(t);
    }, [animate, play]);

    const toggleItem = (id) => {
        const opening = openItem !== id;
        setOpenItem(opening ? id : null);
        if (opening) play('bell');
    };

    const redeem = () => {
        if (torn) {
            window.location.href = MAILTO;
            return;
        }
        setTorn(true);
        play('rip');
        setTimeout(() => { window.location.href = MAILTO; }, 900);
    };

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

    const inProgress = projects.filter((p) => p.status === 'PROCESSING').length;

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
          background-image: radial-gradient(ellipse 70% 40% at 50% 100%, rgb(255 255 255 / .06), transparent 70%);
        }

        /* ---- paper ---- */
        .receipt {
          position: relative;
          background-color: var(--paper);
          background-image:
            linear-gradient(90deg, rgb(0 0 0 / .035), transparent 6%, transparent 94%, rgb(0 0 0 / .035)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          box-shadow: 0 0 60px -10px rgb(0 0 0 / .7), 0 2px 6px rgb(0 0 0 / .3);
        }
        /* torn top edge, from the last customer */
        .receipt::before {
          content: ''; position: absolute; left: 0; right: 0; top: -10px; height: 10px;
          background:
            linear-gradient(45deg, var(--paper) 50%, transparent 50%) 0 100% / 14px 10px repeat-x,
            linear-gradient(-45deg, var(--paper) 50%, transparent 50%) 0 100% / 14px 10px repeat-x;
        }

        .leader { flex: 1; min-width: 1.5rem; border-bottom: 2px dotted rgb(29 28 26 / .35); transform: translateY(-.3em); }
        .rule { border-top: 2px dashed rgb(29 28 26 / .45); margin: 1.25rem 0; }
        .rule-double { border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); height: 6px; margin: 1.25rem 0; }

        .thermal { filter: grayscale(1) contrast(1.5) brightness(1.08); mix-blend-mode: multiply; }
        .thermal-soft { filter: grayscale(1) contrast(1.2); mix-blend-mode: multiply; transition: filter .25s; }
        .thermal-soft:hover { filter: none; mix-blend-mode: normal; }

        .stamp {
          display: inline-block; color: var(--stamp); border: 2.5px solid currentColor; border-radius: 4px;
          padding: .15em .55em; font-weight: 500; letter-spacing: .15em; text-transform: uppercase;
          transform: rotate(-8deg); opacity: .85; mix-blend-mode: multiply;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -2.2 1.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ---- printing ---- */
        .animate .ln:not(.printed) { opacity: 0; }
        .animate .ln.printed { animation: ink .32s steps(4, end) both; }
        @keyframes ink {
          0%   { opacity: .15; filter: blur(.6px); transform: translateY(2px); }
          60%  { opacity: .7;  filter: blur(.2px); }
          100% { opacity: 1;   filter: none; transform: none; }
        }
        .blink { animation: blink 1.1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }

        .item-btn:hover .item-name, .item-btn:focus-visible .item-name { background: var(--ink); color: var(--paper); }
        .key { border: 2px solid var(--ink); color: var(--ink); transition: background .15s, color .15s; }
        .key:hover { background: var(--ink); color: var(--paper); }

        /* ---- coupon ---- */
        .tear { display: flex; align-items: center; gap: .6rem; color: var(--faded); font-size: 11px; letter-spacing: .3em; }
        .tear::before, .tear::after { content: ''; flex: 1; border-top: 2px dashed rgb(29 28 26 / .35); }
        .coupon { position: relative; transition: transform .9s cubic-bezier(.2,.8,.2,1), box-shadow .9s, margin .9s cubic-bezier(.2,.8,.2,1); background: var(--paper); }
        .coupon.torn {
          transform: translate(16px, 28px) rotate(-4deg);
          margin-bottom: 4.5rem;
          box-shadow: 0 24px 40px -12px rgb(0 0 0 / .55);
        }
        .coupon.torn::before {
          content: ''; position: absolute; left: 0; right: 0; top: -8px; height: 8px;
          background:
            linear-gradient(45deg, var(--paper) 50%, transparent 50%) 0 100% / 10px 8px repeat-x,
            linear-gradient(-45deg, var(--paper) 50%, transparent 50%) 0 100% / 10px 8px repeat-x;
        }

        /* ---- the machine ---- */
        .machine {
          background-color: #C8BDA5;
          background-image:
            radial-gradient(ellipse 18% 40% at 6% 90%, rgb(70 55 35 / .25), transparent 70%),
            radial-gradient(ellipse 12% 30% at 94% 25%, rgb(70 55 35 / .2), transparent 70%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .25 0 0 0 0 .2 0 0 0 0 .12 0 0 0 .22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),
            linear-gradient(#D6CCB5, #BDB199 70%, #A89C83);
          box-shadow: 0 -14px 30px -10px rgb(0 0 0 / .7), inset 0 2px 0 rgb(255 255 255 / .45), inset 0 -4px 0 rgb(0 0 0 / .2);
          border: 1px solid #8F846C; border-bottom: 0;
        }
        .slot { background: #0B0A0A; box-shadow: inset 0 3px 6px rgb(0 0 0 / .95), 0 1px 0 rgb(255 255 255 / .35); }
        .tearbar {
          height: 7px;
          background:
            linear-gradient(45deg, transparent 50%, #6E675C 50%) 0 0 / 8px 5px repeat-x,
            linear-gradient(-45deg, transparent 50%, #6E675C 50%) 0 0 / 8px 5px repeat-x;
        }
        .plate {
          background: linear-gradient(135deg, #D9B866, #A8812F 45%, #C9A24F 60%, #8A6823);
          box-shadow: inset 0 1px 0 rgb(255 240 200 / .6), inset 0 -1px 0 rgb(0 0 0 / .35), 0 1px 2px rgb(0 0 0 / .45);
          color: #3A2A0C; text-shadow: 0 1px 0 rgb(255 235 180 / .55);
          font-family: Georgia, 'Times New Roman', serif;
        }
        .screw { width: 7px; height: 7px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #EADBB0, #7A6230); box-shadow: 0 0 0 1px rgb(0 0 0 / .35); position: relative; flex-shrink: 0; }
        .screw::after { content: ''; position: absolute; left: 1px; right: 1px; top: 3px; height: 1px; background: rgb(40 28 8 / .8); transform: rotate(35deg); }
        .grille { background: repeating-linear-gradient(to bottom, #2C261C 0 3px, transparent 3px 7px); border-radius: 2px; opacity: .7; }
        .odo { background: #16130F; box-shadow: inset 0 2px 4px #000, 0 1px 0 rgb(255 255 255 / .4); }
        .odo span { background: linear-gradient(#2A241C, #0F0D0A 50%, #2A241C); color: #EFE4C8; }
        .lamp { background: radial-gradient(circle at 40% 35%, #FFE3A3, #F29A1F 45%, #8A4A0A); box-shadow: 0 0 8px 2px rgb(242 154 31 / .6); }
        .lamp.off { background: radial-gradient(circle at 40% 35%, #8C7B5E, #4A3E2C); box-shadow: none; }
        .keycap {
          background: linear-gradient(#3A3530, #26221E); color: #E9DFC7; border-radius: 4px;
          box-shadow: 0 3px 0 #12100E, 0 4px 6px rgb(0 0 0 / .4), inset 0 1px 0 rgb(255 255 255 / .12);
          transition: transform .08s, box-shadow .08s;
        }
        .keycap:hover { background: linear-gradient(#4A433C, #2E2924); }
        .keycap:active, .keycap[aria-pressed="true"] { transform: translateY(2px); box-shadow: 0 1px 0 #12100E, 0 1px 2px rgb(0 0 0 / .4), inset 0 1px 0 rgb(255 255 255 / .12); }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .blink { animation: none; }
          .coupon { transition: none; }
        }
        @media print {
          body, .counter { background: #fff !important; }
          .machine, .no-print { display: none !important; }
          .receipt { box-shadow: none; }
          .ln { opacity: 1 !important; animation: none !important; }
        }
      `}</style>

            <main className="relative px-4 pt-10 sm:pt-14">
                {/* Receipt */}
                <article className={`receipt ${animate ? 'animate' : ''} relative z-10 mx-auto max-w-[620px] px-5 sm:px-10 pt-10 pb-16 text-[13px] sm:text-sm leading-relaxed`}>

                    <header className="text-center">
                        <img src="./otherimages/profilephoto.jpg" alt="Paul Aji" className="ln thermal mx-auto w-20 h-20 object-cover rounded-full" />
                        <h1 className="ln dot mt-5 text-5xl sm:text-6xl leading-none text-[var(--ink)] tracking-wide">PAUL AJI</h1>
                        <p className="ln mt-3 font-medium tracking-[0.2em] text-[var(--ink)]">FULL STACK ENGINEER</p>
                        <p className="ln tracking-[0.15em]">PAYMENTS · SETTLEMENT · CLOUD</p>
                        <p className="ln mt-2 text-[var(--faded)]">DUBLIN, IRELAND</p>
                        <p className="ln">
                            <a href={`mailto:${EMAIL}`} className="text-[var(--faded)] underline decoration-dotted underline-offset-4 hover:text-[var(--ink)] break-all">{EMAIL}</a>
                        </p>
                    </header>

                    <Rule />

                    <div className="grid grid-cols-2 gap-x-4">
                        <p className="ln">DATE: {clock.date}</p>
                        <p className="ln text-right">TIME: {clock.time}</p>
                        <p className="ln">TERMINAL: 01</p>
                        <p className="ln text-right">CASHIER: PAUL</p>
                        <p className="ln">ORDER: #0003-YRS</p>
                        <p className="ln text-right">TXN: <span className="text-[var(--ink)] font-medium">APPROVED</span></p>
                    </div>

                    <Rule double />

                    <p className="ln text-center tracking-[0.3em] text-[var(--ink)] font-medium">*** CUSTOMER COPY ***</p>
                    <p className="ln mt-4">
                        NOTE: Full-stack engineer, 3+ years shipping production systems in Python and TypeScript. Currently on the Settle team at <b className="font-medium text-[var(--ink)]">Infinite Payment Technology</b>, making sure money moves, reconciles and bills correctly, because &lsquo;close enough&rsquo; isn&rsquo;t a feature in payments.
                    </p>

                    <Rule />

                    {/* Items */}
                    <Heading id="items">ITEMS PURCHASED</Heading>
                    <div className="ln flex justify-between text-[var(--faded)] text-xs tracking-[0.15em] mb-2">
                        <span>NO. ITEM</span>
                        <span>STATUS</span>
                    </div>

                    <ul>
                        {projects.map((p, i) => {
                            const open = openItem === p.id;
                            return (
                                <li key={p.id} className="py-2">
                                    <button onClick={() => toggleItem(p.id)} aria-expanded={open} className="item-btn w-full text-left">
                                        <Line
                                            label={<><span className="text-[var(--faded)]">{pad(i + 1)}&nbsp;&nbsp;</span><span className="item-name font-medium text-[var(--ink)] uppercase px-0.5 -mx-0.5 transition-colors">{p.title}</span></>}
                                            value={p.status === 'PROCESSING'
                                                ? <span className="font-medium text-[var(--stamp)]">PROCESSING<span className="blink">_</span></span>
                                                : <span className="text-[var(--ink)]">SHIPPED</span>}
                                        />
                                        <p className="ln pl-[2.6em] text-xs text-[var(--faded)]">
                                            {p.company} · {p.role} <span className="no-print text-[var(--ink-soft)]">[{open ? '-' : '+'}]</span>
                                        </p>
                                    </button>

                                    {open && (
                                        <div className="pl-[2.6em] mt-3 mb-3 space-y-3">
                                            <p className="ln text-[var(--ink)]">{p.description}</p>
                                            {p.images.length > 0 && (
                                                <div className="ln no-print">
                                                    <button onClick={() => setLightbox({ images: p.images, index: 0, title: p.title })}
                                                        className="block w-full aspect-[16/9] overflow-hidden border border-[var(--ink)]/25 bg-white" aria-label={`View ${p.title} screenshots`}>
                                                        <img src={p.images[0]} alt={`${p.title} screenshot`} loading="lazy" className="thermal-soft w-full h-full object-cover object-top" />
                                                    </button>
                                                    <p className="mt-1 text-[11px] text-[var(--faded)]">FIG. {pad(i + 1)} · {p.images.length > 1 ? `TAP FOR ${p.images.length} IMAGES` : 'TAP TO ENLARGE'}</p>
                                                </div>
                                            )}
                                            <ul className="space-y-1.5">
                                                {p.highlights.map((h) => (
                                                    <li key={h} className="ln grid grid-cols-[1.4em_1fr]"><span>+</span><span>{h}</span></li>
                                                ))}
                                            </ul>
                                            <p className="ln text-xs"><span className="text-[var(--faded)]">STACK:</span> {p.tech.join(' / ')}</p>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <Rule />
                    <Line label="SUBTOTAL" value={`${projects.length} ITEMS`} strong />
                    <Line label="IN PROGRESS" value={inProgress} />
                    <Line label="SHIPPED" value={projects.length - inProgress} />

                    <Rule />

                    {/* Skills */}
                    <Heading id="skills">ITEMISED SKILLS</Heading>
                    <div className="space-y-3">
                        {skills.map((c) => (
                            <div key={c.label}>
                                <Line label={<span className="font-medium text-[var(--ink)] uppercase">{c.label}</span>} value={`x${c.items.length}`} />
                                <p className="ln pl-4 text-xs text-[var(--faded)]">{c.items.join(', ')}</p>
                            </div>
                        ))}
                    </div>

                    <Rule />

                    <p className="ln text-center text-xs tracking-[0.3em] text-[var(--faded)] mb-4">WE ACCEPT</p>
                    <div className="ln text-[var(--ink)]">
                        <TechBanner />
                    </div>

                    <Rule />

                    {/* Education */}
                    <Heading>EDUCATION</Heading>
                    <div className="space-y-4">
                        {education.map((e) => (
                            <div key={e.degree} className="relative">
                                <Line label={<span className="font-medium text-[var(--ink)] uppercase">{e.degree}</span>} value={e.grade} />
                                <p className="ln text-xs text-[var(--faded)]">{e.school} · {e.when}</p>
                                {e.stamp && <Stamp className="absolute right-2 -bottom-5 text-[11px]">{e.stamp}</Stamp>}
                            </div>
                        ))}
                    </div>

                    <Rule />

                    {/* Extras */}
                    <Heading>COMPLIMENTARY EXTRAS</Heading>
                    <ul className="space-y-2">
                        {extras.map((x) => (
                            <li key={x.title}>
                                <Line label={<span className="text-[var(--ink)] uppercase">{x.title}</span>} value="FREE" />
                                <p className="ln text-xs text-[var(--faded)]">{x.note}</p>
                            </li>
                        ))}
                    </ul>

                    <Rule double />

                    {/* Totals */}
                    <div id="total" className="scroll-mt-8 space-y-1.5 text-[15px] sm:text-base">
                        <Line label="TOTAL" value="3+ YRS EXPERIENCE" strong className="text-lg sm:text-xl" />
                        <Line label="PAYMENT METHOD" value="FIRST CLASS HONOURS" />
                        <Line label="TAX (BUGS)" value="0.00" />
                        <Line label="CHANGE DUE" value="YOUR NEXT HIRE" strong />
                    </div>
                    <div className="ln text-center pt-6 pb-2">
                        <Stamp className="text-xl sm:text-2xl">Paid in full</Stamp>
                    </div>

                    <Rule double />

                    <footer className="text-center space-y-1">
                        <p className="ln font-medium text-[var(--ink)] tracking-[0.2em]">THANK YOU FOR SCROLLING</p>
                        <p className="ln">NO REFUNDS ON GOOD CODE</p>
                        <p className="ln text-[var(--faded)] text-xs">{pad(linesPrinted, 4)} LINES PRINTED FOR YOU</p>

                        <div className="no-print pt-8">
                            <p className="ln tear">✂ TEAR HERE</p>
                        </div>

                        {/* Coupon */}
                        <div className={`coupon ${torn ? 'torn' : ''} mt-4 text-left`}>
                            <div className="ln border-2 border-dashed border-[var(--ink)]/50 p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] tracking-[0.3em] text-[var(--faded)]">COUPON</p>
                                        <p className="dot mt-2 text-2xl sm:text-3xl leading-none text-[var(--ink)]">ONE (1) COFFEE CHAT</p>
                                        <p className="mt-2 text-xs">WITH PAUL AJI · NO EXPIRY · NOT TRANSFERABLE (IT IS, SHARE IT)</p>
                                    </div>
                                    {torn && <Stamp className="shrink-0 text-xs mt-1">Redeemed</Stamp>}
                                </div>
                                <div className="mt-5 text-[var(--ink)]">
                                    <Barcode text={EMAIL} />
                                    <p className="mt-1 text-center text-[10px] tracking-[0.35em] break-all">{EMAIL.toUpperCase()}</p>
                                </div>
                                <button onClick={redeem} className="no-print key mt-5 w-full py-2.5 text-xs font-medium tracking-[0.2em]">
                                    {torn ? '[ OPEN EMAIL AGAIN ]' : '[ ✂ TEAR & REDEEM ]'}
                                </button>
                            </div>
                        </div>

                        <div className="ln no-print mt-10 grid grid-cols-2 gap-2 text-xs font-medium tracking-[0.15em]">
                            <a href={links.github} target="_blank" rel="noopener noreferrer" className="key py-2.5">[ GITHUB ]</a>
                            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="key py-2.5">[ LINKEDIN ]</a>
                        </div>
                        <p className="ln pt-2">
                            <button onClick={() => window.print()} className="no-print text-xs text-[var(--faded)] hover:text-[var(--ink)] underline decoration-dotted underline-offset-4">
                                print a real copy
                            </button>
                        </p>
                        <p className="ln pt-4 text-[var(--faded)] text-[11px]">&copy; {new Date().getFullYear()} PAUL AJI · DUBLIN</p>
                    </footer>
                </article>

                {/* The machine. Paper feeds up out of its slot as you scroll. */}
                <div ref={machineRef} className="sticky bottom-0 z-30 -mx-4 px-2 sm:px-4 pointer-events-none">
                    <div className="machine pointer-events-auto relative mx-auto max-w-[700px] rounded-t-[22px] px-3 sm:px-6 pt-3 pb-3 sm:pb-4">
                        <div className="slot relative mx-auto max-w-[640px] h-3 rounded-sm">
                            <div className="tearbar absolute inset-x-0 -top-1" aria-hidden="true" />
                        </div>

                        <div className="mt-3 flex items-center gap-2 sm:gap-4">
                            <div className="plate shrink-0 flex items-center gap-1.5 rounded-sm px-1.5 sm:px-2 py-1.5">
                                <span className="screw" />
                                <div className="text-center leading-none">
                                    <p className="text-[12px] sm:text-[14px] font-bold tracking-[0.16em]">PA-3000</p>
                                    <p className="hidden sm:block mt-1 text-[7px] tracking-[0.25em] uppercase">Dublin · Est. 2022</p>
                                </div>
                                <span className="screw" />
                            </div>

                            <div className="odo shrink-0 flex items-center gap-[2px] rounded-sm p-[3px]" title="Lines printed" aria-label={`${linesPrinted} lines printed`}>
                                {pad(linesPrinted % 10000, 4).split('').map((d, i) => (
                                    <span key={i} className="w-3.5 sm:w-4 text-center text-[11px] sm:text-[12px] leading-5 font-medium rounded-[1px]">{d}</span>
                                ))}
                            </div>

                            <div className="grille hidden md:block flex-1 h-6" aria-hidden="true" />

                            <nav className="no-print ml-auto md:ml-0 flex items-center gap-1.5 sm:gap-2" aria-label="Sections">
                                {[['#items', 'Items'], ['#skills', 'Skills'], ['#total', 'Total']].map(([href, label]) => (
                                    <a key={href} href={href} className="keycap hidden sm:inline-block px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase">{label}</a>
                                ))}
                                <a href="#items" className="keycap sm:hidden px-2 py-1.5 text-[10px] font-medium tracking-[0.08em] uppercase">Items</a>
                                <button onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Turn printer sound off' : 'Turn printer sound on'}
                                    className="keycap flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.08em] sm:tracking-[0.12em] uppercase">
                                    <span className={`lamp ${sound ? '' : 'off'} h-2 w-2 rounded-full`} aria-hidden="true" />
                                    Sound
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </main>

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img src={lightbox.images[lightbox.index]} alt={`${lightbox.title} screenshot ${lightbox.index + 1}`} className="w-full max-h-[78vh] object-contain" />
                        <div className="mt-4 flex items-center justify-between text-xs tracking-[0.2em] text-[#C9C4BB]">
                            <button disabled={lightbox.index === 0} onClick={() => setLightbox({ ...lightbox, index: lightbox.index - 1 })} className="px-3 py-2 border border-current disabled:opacity-20 hover:bg-white hover:text-black transition">&lt; PREV</button>
                            <span className="text-center px-2">{lightbox.title.toUpperCase()} · {lightbox.index + 1}/{lightbox.images.length}</span>
                            <button disabled={lightbox.index === lightbox.images.length - 1} onClick={() => setLightbox({ ...lightbox, index: lightbox.index + 1 })} className="px-3 py-2 border border-current disabled:opacity-20 hover:bg-white hover:text-black transition">NEXT &gt;</button>
                        </div>
                        <button onClick={() => setLightbox(null)} className="absolute -top-2 right-0 -translate-y-full text-xs tracking-[0.2em] text-[#C9C4BB] hover:text-white">[ CLOSE X ]</button>
                    </div>
                </div>
            )}
        </div>
    );
}
