import React, { useEffect, useRef, useState } from 'react';

import Banknote from './Banknote';
import Building from './Building';
import { SQUARES, SETS, EMAIL, LINKS, STATS, HONOURS, priceOf, labelOf, fmt, gainsOf, sellPriceOf } from './content';

const RENT = ['Rent', 'With 1 house', 'With 2 houses', 'With 3 houses', 'With 4 houses', 'With hotel'];

function DeedSheet({ i, mode, money, dividend, owned: ownedSet, canSell, onBuy, onResolve }) {
    const s = SQUARES[i];
    const cost = priceOf(s);
    const color = s.t === 'prop' ? SETS[s.set].color : '#16140F';
    const kicker = s.t === 'prop' ? SETS[s.set].name : s.t === 'rail' ? 'Off the clock' : 'Off the clock';
    const offset = s.t === 'prop' && s.rows.length < 6 ? 1 : 0;
    const others = new Set(ownedSet || []); others.delete(i);
    const gains = gainsOf(i, others);

    // glimpse: sealed preview · offer: sealed, can buy · owned: yours · full: browse view
    const [unlocked, setUnlocked] = useState(mode === 'owned' || mode === 'full');
    const [justBought, setJustBought] = useState(null);
    const canBuy = mode === 'offer' && money >= cost;

    const buy = () => {
        const result = onBuy();
        setJustBought(result);
        setUnlocked(true);
    };

    const rows = s.t === 'prop' ? s.rows.slice(0, 6) : [];
    const sealedNow = !unlocked;

    return (
        <div className={`sheet ${unlocked ? 'is-open' : 'is-sealed'} ${justBought ? 'just-unlocked' : ''}`}>
            <div className="deed" style={{ '--c': color }}>
                <div className="fr">
                    <div className="hd"><p className="caps">{s.t === 'prop' ? 'Title deed' : s.t === 'rail' ? 'Off the clock' : 'Off the clock'}</p><h3>{labelOf(s)}</h3></div>
                    {s.t === 'prop' ? (
                        <>
                            <p className="lead">{s.who.split(' · ')[0]}</p>
                            {rows.map((r, k) => (
                                <div className={`r ${sealedNow && k > 0 ? 'blurred' : ''}`} style={{ '--k': k }} key={r} aria-hidden={sealedNow && k > 0 ? true : undefined}>
                                    <span>{RENT[Math.min(k + offset, 5)]}</span><span>{r}</span>
                                </div>
                            ))}
                        </>
                    ) : <p className="lead lead-long">{s.desc}</p>}
                    <div className="ft"><b>{fmt(cost)}</b>Square {i} · {kicker}</div>
                </div>
                {sealedNow && <div className="wax"><span>Sealed</span></div>}
                {justBought && <div className="wax broken" aria-hidden="true"><span>Sealed</span></div>}
                {unlocked && mode !== 'full' && <div className="seal"><span>Yours</span></div>}
            </div>

            <div className="side">
                <p className="caps gold-text">Square {i} · {kicker}</p>
                <h2>{labelOf(s)}</h2>
                {s.who && <p className="who">{s.who}</p>}
                <p className="desc">{s.desc}</p>

                {gains.length > 0 && (
                    <div className="gains">
                        <p className="caps">{justBought ? 'Credited to your player card' : unlocked ? 'Worth to your player card' : 'Unlocking changes'}</p>
                        <div className="gain-row">
                            {gains.map((g, k) => (
                                <span className={`gain ${justBought ? 'credited' : ''} ${g.pts < 0 ? 'neg' : ''} ${g.key === 'form' ? 'form' : ''}`} style={{ '--k': k }} key={g.key}><b>{g.pts > 0 ? '+' : '−'}{Math.abs(g.pts)}</b>{g.label}</span>
                            ))}
                        </div>
                    </div>
                )}

                {s.tech?.length > 0 && (
                    <>
                        <p className="caps houses-label">{unlocked ? 'Houses built on this square' : `${s.tech.length} houses behind the seal`}</p>
                        <div className="houses">
                            {s.tech.map((t, k) => (
                                <div className={`h ${k === 0 ? 'hotel' : ''} ${unlocked ? 'lit' : 'dark'}`} style={{ '--k': k }} key={t}>
                                    <Building kind={k === 0 ? 'hotel' : 'house'} sealed={!unlocked} />
                                    <span>{unlocked ? t : '?'}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {justBought?.honours?.length > 0 && (
                    <div className="honour-won">
                        {justBought.honours.map((h) => <p key={h.name}><span className="caps">Honour earned</span><b>{h.name}</b><small>{h.note}</small></p>)}
                    </div>
                )}
                {mode === 'owned' && dividend && (
                    <p className="dividend"><span className="caps">Dividend paid</span><b>+{fmt(dividend.amount)}</b>{dividend.doubled && <small>Doubled: you hold the full set</small>}</p>
                )}
                {mode === 'glimpse' && <p className="note">Land here and pay up to break the seal. Or switch to Browse and read everything for free. We won't tell.</p>}

                <div className="acts">
                    {mode === 'offer' && !unlocked && (
                        <>
                            <button className="btn-gold btn-solid" disabled={!canBuy} onClick={buy} data-primary>
                                {canBuy ? `Buy & unlock · ${fmt(cost)}` : 'Insufficient funds'}
                            </button>
                            <button className="btn-gold" onClick={() => onResolve('pass')} data-primary={canBuy ? undefined : true}>Pass</button>
                        </>
                    )}
                    {mode === 'offer' && unlocked && <button className="btn-gold btn-solid" onClick={() => onResolve('bought')} data-primary autoFocus>Continue</button>}
                    {mode === 'owned' && canSell && <button className="btn-gold" onClick={() => onResolve('sell')}>Sell · +{fmt(sellPriceOf(i))}</button>}
                    {mode !== 'offer' && <button className="btn-gold" onClick={() => onResolve('pass')} data-primary>Back to the board</button>}
                </div>
            </div>
        </div>
    );
}

function CardSheet({ deck, card, onResolve }) {
    const act = card.to !== undefined ? `Advance to ${labelOf(SQUARES[card.to])}` : card.amt >= 0 ? `Collect ${fmt(card.amt)}` : `Pay ${fmt(-card.amt)}`;
    return (
        <div className="sheet solo">
            <div className={`deed card ${deck}`}>
                <div className="fr">
                    <div className="hd"><p className="caps">{deck === 'wildcard' ? 'Wildcard · Achievement' : 'Treasury · Fun fact'}</p><h3>{card.t}</h3></div>
                    <p className="lead lead-card">{card.d}</p>
                    <div className="ft"><b>{act}</b></div>
                </div>
            </div>
            <div className="acts center"><button className="btn-gold btn-solid" onClick={() => onResolve()} data-primary>{act}</button></div>
        </div>
    );
}

function Message({ kicker, title, body, action, onResolve, tone }) {
    return (
        <div className="sheet solo big-end">
            <p className="caps gold-text">{kicker}</p>
            <h2 className={tone}><em>{title}</em></h2>
            <p className="body">{body}</p>
            <div className="acts center"><button className="btn-gold btn-solid" onClick={() => onResolve()} data-primary>{action}</button></div>
        </div>
    );
}

function Settled({ title, line, turns, money, profile, onResolve }) {
    const best = [...STATS].sort((a, b) => profile.rating[b.key] - profile.rating[a.key]).slice(0, 3);
    return (
        <div className="sheet solo big-end">
            <Banknote className="prize-note" />
            <p className="caps gold-text">{title} · {turns} turns</p>
            <h2><em>Settled.</em></h2>
            <p className="body">{line}, and you finished with {fmt(money)}.<br />The real prize is a conversation with the person who built all of it.</p>
            <div className="final-card">
                <div><b>{profile.overall}</b><span className="caps">Overall</span></div>
                <div><b className="it">{profile.title}</b><span className="caps">Your title</span></div>
                {best.map((s) => <div key={s.key}><b>{profile.rating[s.key]}</b><span className="caps">{s.label}</span></div>)}
            </div>
            {profile.honours.length > 0 && <p className="final-honours">{profile.honours.map((h) => h.name).join(' · ')}</p>}
            <div className="acts center">
                <a className="btn-gold btn-solid" href={`mailto:${EMAIL}?subject=${encodeURIComponent('I won The Settlement Game')}`} data-primary>Claim your prize</a>
                <a className="btn-gold" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <button className="btn-gold" onClick={() => onResolve('again')}>Play again</button>
            </div>
        </div>
    );
}

function Declined({ turns, onResolve }) {
    return (
        <div className="sheet solo big-end">
            <p className="caps gold-text">Transaction {String(turns).padStart(4, '0')} · Response code 51</p>
            <h2 className="declined"><em>Declined.</em></h2>
            <p className="body">Insufficient funds. The bank is prepared to offer you a coffee chat instead.</p>
            <div className="acts center">
                <a className="btn-gold btn-solid" href={`mailto:${EMAIL}`} data-primary>Accept the coffee</a>
                <button className="btn-gold" onClick={() => onResolve('again')}>Play again</button>
            </div>
        </div>
    );
}

function Honours({ profile, onResolve }) {
    return (
        <div className="sheet solo big-end">
            <p className="caps gold-text">Player card · {profile.title}</p>
            <h2><em>Honours.</em></h2>
            <ul className="honour-list">
                {HONOURS.map((h) => {
                    const won = profile.honours.some((x) => x.name === h.name);
                    return (
                        <li key={h.name} className={won ? 'won' : ''}>
                            <i aria-hidden="true" />
                            <span><b>{h.name}</b><small>{won ? 'Earned' : 'Needs'} · {h.note}</small></span>
                        </li>
                    );
                })}
            </ul>
            <div className="acts center"><button className="btn-gold" onClick={() => onResolve()} data-primary>Back to the board</button></div>
        </div>
    );
}

// Modal host: focuses the primary action, Escape dismisses where that is safe.
export default function Sheet({ spec, onResolve }) {
    const ref = useRef(null);
    const dismissable = (spec.kind === 'deed' && spec.mode !== 'offer') || spec.kind === 'info' || spec.kind === 'honours';

    useEffect(() => {
        ref.current?.querySelector('[data-primary]:not([disabled])')?.focus();
        const onKey = (e) => { if (e.key === 'Escape' && dismissable) onResolve('pass'); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [spec, dismissable, onResolve]);

    let body;
    if (spec.kind === 'deed') body = <DeedSheet {...spec} onResolve={onResolve} />;
    else if (spec.kind === 'card') body = <CardSheet {...spec} onResolve={onResolve} />;
    else if (spec.kind === 'settled') body = <Settled {...spec} onResolve={onResolve} />;
    else if (spec.kind === 'declined') body = <Declined {...spec} onResolve={onResolve} />;
    else if (spec.kind === 'honours') body = <Honours {...spec} onResolve={onResolve} />;
    else body = <Message {...spec} onResolve={onResolve} />;

    return (
        <div className="veil" role="dialog" aria-modal="true" ref={ref} onClick={(e) => { if (e.target === e.currentTarget && dismissable) onResolve('pass'); }}>
            {body}
        </div>
    );
}
