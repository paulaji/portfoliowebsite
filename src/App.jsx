import React, { useCallback, useEffect, useRef, useState } from 'react';

import './game/game.css';
import Board from './game/Board';
import Binder from './game/Binder';
import Banknote from './game/Banknote';
import Sheet from './game/Sheet';
import {
    SQUARES, SETS, WILDCARDS, TREASURY, POSTMORTEMS, EMAIL,
    START_MONEY, GO_BONUS, WIN_DEEDS, INCIDENT_FEE, priceOf, labelOf, fmt,
} from './game/content';

const PIPS = {
    1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [1, 3], [3, 1], [3, 3]],
    5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]], 6: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]],
};
const Die = ({ n, rolling }) => (
    <div className={`die ${rolling ? 'rolling' : ''}`} aria-hidden="true">
        {PIPS[n].map(([r, c]) => <i key={`${r}${c}`} style={{ gridArea: `${r}/${c}` }} />)}
    </div>
);

const d6 = () => 1 + Math.floor(Math.random() * 6);
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function ModeSwitch({ mode, setMode }) {
    return (
        <div className="mode" role="tablist" aria-label="How do you want to see this?">
            <button role="tab" aria-selected={mode === 'play'} className={mode === 'play' ? 'on' : ''} onClick={() => setMode('play')}>Play <small>2 min</small></button>
            <button role="tab" aria-selected={mode === 'browse'} className={mode === 'browse' ? 'on' : ''} onClick={() => setMode('browse')}>Browse <small>30 sec</small></button>
        </div>
    );
}

const CORNER_INFO = {
    go: { title: 'GO.', body: `Every lap is another year of shipping. Collect €${GO_BONUS} as you pass.` },
    jail: { title: 'Incident.', body: 'Just visiting. Every incident here ended in a postmortem.' },
    parking: { title: 'Coffee.', body: <>Free parking, and a free coffee. Say hi: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></> },
    gotojail: { title: 'Go to Incident.', body: 'Land here and it is straight to Incident.' },
    wildcard: { title: 'Wildcard.', body: 'Achievements. Land here to draw one.' },
    treasury: { title: 'Treasury.', body: 'Fun facts from the job. Land here to draw one.' },
};

export default function App() {
    const [mode, setModeState] = useState('play');
    const [at, setAt] = useState(0);
    const [money, setMoney] = useState(START_MONEY);
    const [owned, setOwned] = useState(() => new Set());
    const [dice, setDice] = useState([4, 3]);
    const [rolling, setRolling] = useState(false);
    const [busy, setBusy] = useState(false);
    const [log, setLog] = useState([{ text: `NEW GAME · BALANCE ${fmt(START_MONEY)}` }]);
    const [sheet, setSheet] = useState(null);
    const [pulse, setPulse] = useState({ i: -1, n: 0 });
    const [flash, setFlash] = useState('');

    // The game runs as an async script; this ref is its source of truth.
    const g = useRef({ at: 0, money: START_MONEY, owned: new Set(), turns: 0, over: false });
    const sheetRef = useRef(null);

    const setMode = (m) => { setModeState(m); window.scrollTo(0, 0); };

    const ask = (spec) => new Promise((resolve) => {
        sheetRef.current = { ...spec, resolve };
        setSheet(sheetRef.current);
    });
    const resolveSheet = useCallback((value) => {
        const s = sheetRef.current;
        sheetRef.current = null;
        setSheet(null);
        s?.resolve(value);
    }, []);

    const addLog = (entry) => setLog((l) => [...l.slice(-60), entry]);
    const pay = (amt, why) => {
        g.current.money = Math.round((g.current.money + amt) * 100) / 100;
        setMoney(g.current.money);
        setFlash(amt >= 0 ? 'up' : 'down');
        setTimeout(() => setFlash(''), 700);
        if (why) addLog({ text: why, amt });
    };

    const move = async (steps) => {
        const hop = reducedMotion() ? 30 : 170;
        for (let k = 0; k < steps; k++) {
            g.current.at = (g.current.at + 1) % 40;
            if (g.current.at === 0) pay(GO_BONUS, 'PASSED GO · 3+ YRS');
            setAt(g.current.at);
            await wait(hop);
        }
        setPulse((p) => ({ i: g.current.at, n: p.n + 1 }));
    };

    const land = async (i) => {
        const s = SQUARES[i];
        if (s.t === 'wildcard' || s.t === 'treasury') {
            const card = pick(s.t === 'wildcard' ? WILDCARDS : TREASURY);
            await ask({ kind: 'card', deck: s.t, card });
            if (card.to !== undefined) {
                addLog({ text: card.t.toUpperCase() });
                await move((card.to - g.current.at + 40) % 40);
                await land(g.current.at);
            } else pay(card.amt, card.t.toUpperCase());
            return;
        }
        if (s.t === 'tax') {
            await ask({ kind: 'message', kicker: 'Tax', title: `${s.n}.`, body: s.msg, action: `Pay ${fmt(s.amt)}` });
            pay(-s.amt, s.n.toUpperCase());
            return;
        }
        if (s.t === 'gotojail') {
            await ask({ kind: 'message', kicker: 'Square 30 · Production incident', title: 'Go to Incident.', body: <>{pick(POSTMORTEMS)}<br />Pay {fmt(INCIDENT_FEE)} for the postmortem and carry on.</>, action: 'Write the postmortem' });
            addLog({ text: 'SENT TO INCIDENT' });
            g.current.at = 10;
            setAt(10);
            pay(-INCIDENT_FEE, 'POSTMORTEM');
            return;
        }
        if (s.t === 'go') return;
        if (s.t === 'jail' || s.t === 'parking') {
            const info = CORNER_INFO[s.t];
            await ask({ kind: 'message', kicker: `Square ${i}`, title: info.title, body: info.body, action: 'Carry on' });
            return;
        }
        const wasOwned = g.current.owned.has(i);
        const choice = await ask({ kind: 'deed', i, preview: false, owned: wasOwned, money: g.current.money });
        if (wasOwned) return;
        if (choice === 'buy') {
            g.current.owned.add(i);
            setOwned(new Set(g.current.owned));
            pay(-priceOf(s), `BOUGHT ${labelOf(s).toUpperCase()}`);
        } else addLog({ text: `PASSED ON ${labelOf(s).toUpperCase()}` });
    };

    const reset = () => {
        g.current = { at: 0, money: START_MONEY, owned: new Set(), turns: 0, over: false };
        setAt(0); setMoney(START_MONEY); setOwned(new Set()); setPulse({ i: -1, n: 0 });
        setLog([{ text: `NEW GAME · BALANCE ${fmt(START_MONEY)}` }]);
    };

    const checkEnd = async () => {
        const st = g.current;
        const set = Object.keys(SETS).find((k) => SQUARES.every((s, i) => s.t !== 'prop' || s.set !== k || st.owned.has(i)));
        const deeds = [...st.owned].filter((i) => SQUARES[i].t === 'prop').length;
        let spec = null;
        if (set) spec = { kind: 'settled', title: SETS[set].name, line: 'You own the whole set' };
        else if (deeds >= WIN_DEEDS) spec = { kind: 'settled', title: `${WIN_DEEDS} deeds · Diversified portfolio`, line: `You hold ${WIN_DEEDS} deeds across the board` };
        else if (st.money < 0) spec = { kind: 'declined' };
        if (!spec) return;
        st.over = true;
        addLog({ text: spec.kind === 'settled' ? `SETTLED · ${spec.title.toUpperCase()}` : 'CARD DECLINED' });
        const choice = await ask({ ...spec, turns: st.turns, money: st.money });
        if (choice === 'again') reset();
    };

    const roll = async () => {
        if (busy || sheetRef.current || g.current.over) return;
        setBusy(true);
        setRolling(true);
        const frames = reducedMotion() ? 1 : 9;
        for (let k = 0; k < frames; k++) { setDice([d6(), d6()]); await wait(65); }
        const a = d6(), b = d6();
        setDice([a, b]);
        setRolling(false);
        g.current.turns++;
        addLog({ text: `ROLL ${a} + ${b} = ${a + b}${a === b ? ' · DOUBLES' : ''}` });
        await move(a + b);
        await land(g.current.at);
        await checkEnd();
        setBusy(false);
    };
    const rollRef = useRef(roll);
    rollRef.current = roll;

    const openSquare = async (i) => {
        if (busy || sheetRef.current) return;
        const s = SQUARES[i];
        if (s.t === 'prop' || s.t === 'rail' || s.t === 'util') {
            await ask({ kind: 'deed', i, preview: true, owned: g.current.owned.has(i), money: g.current.money });
            return;
        }
        const info = CORNER_INFO[s.t] || { title: `${s.n}.`, body: s.msg };
        await ask({ kind: 'info', kicker: `Square ${i}`, title: info.title, body: info.body, action: 'Back to the board' });
    };

    // Space to roll.
    useEffect(() => {
        const onKey = (e) => {
            if (e.code !== 'Space' || mode !== 'play' || sheetRef.current) return;
            if (e.target.closest?.('button, a, input, textarea')) return;
            e.preventDefault();
            rollRef.current();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mode]);

    // Call visitors back when they wander off to another tab.
    useEffect(() => {
        const home = document.title;
        const onVis = () => { document.title = document.hidden ? '🎲 Psst… it’s your turn' : home; };
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, []);

    const switcher = <ModeSwitch mode={mode} setMode={setMode} />;
    const hand = [...owned].sort((a, b) => a - b);
    const deedCount = hand.filter((i) => SQUARES[i].t === 'prop').length;

    return (
        <div className="felt">
            {mode === 'browse' ? (
                <Binder onOpen={(i) => ask({ kind: 'deed', i, preview: true, owned: owned.has(i), money })} onPlay={() => setMode('play')} modeSwitch={switcher} />
            ) : (
                <main className="app">
                    <section className="rail-top">
                        <p className="caps gold-text">Collector&rsquo;s edition · Paul Aji</p>
                        <h1 className="title">The <em>Settlement</em> Game</h1>
                        {switcher}

                        <div className="purse">
                            <div className="purse-note"><Banknote /></div>
                            <div className={`bal ${flash}`}><p className="caps">Balance</p><b aria-live="polite">{fmt(money)}</b></div>
                        </div>

                        <div className="turn">
                            <div className="dice"><Die n={dice[0]} rolling={rolling} /><Die n={dice[1]} rolling={rolling} /></div>
                            <button className="btn-gold btn-solid roll" onClick={roll} disabled={busy || g.current.over}>Roll the dice</button>
                        </div>
                        <p className="hint">Win with a full colour set or any {WIN_DEEDS} deeds. <span className="keys"><kbd>Space</kbd> to roll · </span>tap any square to read it.</p>
                    </section>

                    <section className="stage" aria-label="Game board">
                        <Board at={at} owned={owned} pulse={pulse} onSquare={openSquare} />
                    </section>

                    <section className="rail-bottom">
                        <div className="hand">
                            <p className="caps"><span>Your deeds</span><span>{deedCount} / 22</span></p>
                            <div className="cards">
                                {hand.length === 0 ? <p className="empty">Nothing owned yet.</p> : hand.map((i) => {
                                    const s = SQUARES[i];
                                    return (
                                        <button key={i} className="dc" style={{ '--c': s.t === 'prop' ? SETS[s.set].color : '#16140F' }} onClick={() => openSquare(i)}>
                                            {labelOf(s)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="log" aria-label="Transaction log">
                            <div className="paper">
                                {[...log].reverse().map((e, k) => (
                                    <p key={log.length - k} className={e.amt === undefined ? 'hd' : e.amt >= 0 ? 'pos' : 'neg'}>
                                        <span>{e.text}</span>
                                        {e.amt !== undefined && <><span className="dots" /><span>{e.amt >= 0 ? '+' : '−'}{fmt(Math.abs(e.amt))}</span></>}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            )}

            {sheet && <Sheet spec={sheet} onResolve={resolveSheet} />}
        </div>
    );
}
