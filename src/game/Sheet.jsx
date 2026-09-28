import React, { useEffect, useRef } from 'react';

import Banknote from './Banknote';
import Building from './Building';
import { SQUARES, SETS, EMAIL, LINKS, priceOf, labelOf, fmt } from './content';

const RENT = ['Rent', 'With 1 house', 'With 2 houses', 'With 3 houses', 'With 4 houses', 'With hotel'];

function DeedSheet({ i, preview, owned, money, onResolve }) {
    const s = SQUARES[i];
    const cost = priceOf(s);
    const color = s.t === 'prop' ? SETS[s.set].color : '#16140F';
    const kicker = s.t === 'prop' ? SETS[s.set].name : s.t === 'rail' ? 'Payment rail' : 'Utility · After hours';
    const canBuy = !owned && money >= cost;
    const offset = s.t === 'prop' && s.rows.length < 6 ? 1 : 0;

    return (
        <div className="sheet">
            <div className="deed" style={{ '--c': color }}>
                <div className="fr">
                    <div className="hd"><p className="caps">{s.t === 'prop' ? 'Title deed' : s.t === 'rail' ? 'Payment rail' : 'Utility'}</p><h3>{labelOf(s)}</h3></div>
                    {s.t === 'prop' ? (
                        <>
                            <p className="lead">{s.who.split(' · ')[0]}</p>
                            {s.rows.slice(0, 6).map((r, k) => <div className="r" key={r}><span>{RENT[Math.min(k + offset, 5)]}</span><span>{r}</span></div>)}
                        </>
                    ) : <p className="lead lead-long">{s.desc}</p>}
                    <div className="ft"><b>{fmt(cost)}</b>Square {i} · {kicker}</div>
                </div>
                {owned && <div className="seal"><span>Yours</span></div>}
            </div>
            <div className="side">
                <p className="caps gold-text">Square {i} · {kicker}</p>
                <h2>{labelOf(s)}</h2>
                {s.who && <p className="who">{s.who}</p>}
                <p className="desc">{s.desc}</p>
                {s.tech?.length > 0 && (
                    <>
                        <p className="caps houses-label">Houses built on this square</p>
                        <div className="houses">
                            {s.tech.map((t, k) => (
                                <div className={`h ${k === 0 ? 'hotel' : ''}`} key={t}><Building kind={k === 0 ? 'hotel' : 'house'} /><span>{t}</span></div>
                            ))}
                        </div>
                    </>
                )}
                <div className="acts">
                    {!preview && !owned && (
                        <button className="btn-gold btn-solid" disabled={!canBuy} onClick={() => onResolve('buy')} data-primary>
                            {canBuy ? `Buy for ${fmt(cost)}` : 'Insufficient funds'}
                        </button>
                    )}
                    <button className="btn-gold" onClick={() => onResolve('pass')} data-primary={preview || owned || !canBuy ? true : undefined}>
                        {preview || owned ? 'Back to the board' : 'Pass'}
                    </button>
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

function Settled({ title, line, turns, money, onResolve }) {
    return (
        <div className="sheet solo big-end">
            <Banknote className="prize-note" />
            <p className="caps gold-text">{title} · {turns} turns</p>
            <h2><em>Settled.</em></h2>
            <p className="body">{line}, and you finished with {fmt(money)}.<br />The real prize is a conversation with the person who built all of it.</p>
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

// Modal host: focuses the primary action, Escape dismisses where that is safe.
export default function Sheet({ spec, onResolve }) {
    const ref = useRef(null);
    const dismissable = spec.kind === 'deed' || spec.kind === 'info';

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
    else body = <Message {...spec} onResolve={onResolve} />;

    return (
        <div className="veil" role="dialog" aria-modal="true" ref={ref} onClick={(e) => { if (e.target === e.currentTarget && dismissable) onResolve('pass'); }}>
            {body}
        </div>
    );
}
