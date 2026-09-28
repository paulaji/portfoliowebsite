import React from 'react';

import Banknote from './Banknote';
import { SQUARES, SETS, EMAIL, LINKS, SUMMARY } from './content';

const SECTIONS = [
    { id: 'now', title: 'Right now', note: 'Infinite Payment Technology', pick: (s) => s.set === 'navy', color: SETS.navy.color },
    { id: 'projects', title: 'Earlier projects', note: 'Before Infinite', pick: (s) => !s.skill && ['forest', 'ochre', 'oxblood'].includes(s.set) },
    { id: 'skills', title: 'Skills', note: 'Ten sets of tools', pick: (s) => s.skill },
    { id: 'education', title: 'Education', note: 'The Academy', pick: (s) => s.set === 'walnut', color: SETS.walnut.color },
];

function DeedCard({ s, i, onOpen }) {
    return (
        <button className="bd" style={{ '--c': SETS[s.set].color }} onClick={() => onOpen(i)}>
            <span className="fr">
                <span className="hd"><span className="caps">{s.skill ? 'Skill set' : 'Title deed'} · €{s.price}</span><span className="t">{s.n}</span></span>
                {!s.skill && <span className="who">{s.who}</span>}
                <span className="rows">{s.rows.map((r) => <span key={r} className="row">{r}</span>)}</span>
                {s.tech.length > 0 && <span className="stack">{s.tech.join(' · ')}</span>}
            </span>
        </button>
    );
}

export default function Binder({ onOpen, onPlay, modeSwitch }) {
    const props = SQUARES.map((s, i) => ({ s, i })).filter(({ s }) => s.t === 'prop');
    const rails = SQUARES.filter((s) => s.t === 'rail');
    const utils = SQUARES.filter((s) => s.t === 'util');

    return (
        <section className="binder" aria-label="Browse every deed">
            <header className="binder-top">
                <p className="brand">The <em>Settlement</em> Game</p>
                <nav className="jump" aria-label="Sections">
                    {SECTIONS.map((x) => <a key={x.id} href={`#${x.id}`}>{x.title === 'Right now' ? 'Now' : x.title}</a>)}
                    <a href="#contact">Contact</a>
                </nav>
                {modeSwitch}
            </header>

            <div className="binder-in">
                <div className="intro">
                    <div>
                        <h1>Every deed.<br /><em>No dice.</em></h1>
                        <p className="tldr"><b>Paul Aji</b> {SUMMARY.lead}</p>
                        <div className="facts">{SUMMARY.facts.map(([k, v]) => <p key={k}>{k}<b>{v}</b></p>)}</div>
                    </div>
                    <Banknote className="intro-note" />
                </div>

                {SECTIONS.map((sec) => {
                    const list = props.filter(({ s }) => sec.pick(s)).sort((a, b) => b.s.price - a.s.price);
                    return (
                        <section className="setblock" id={sec.id} key={sec.id}>
                            <div className="sethead"><i style={{ background: sec.color || 'var(--gold-2)' }} /><h2>{sec.title}</h2><span>{sec.note}</span></div>
                            <div className="deeds">{list.map(({ s, i }) => <DeedCard key={i} s={s} i={i} onOpen={onOpen} />)}</div>
                        </section>
                    );
                })}

                <section className="setblock">
                    <div className="sethead"><i className="hollow" /><h2>Off the clock</h2><span>Where Paul recharges</span></div>
                    <div className="minis">{[...rails, ...utils].map((r) => <div className="mini" key={r.n}><p className="caps">{r.t === 'util' ? 'Music' : 'Hobby'}</p><h3>{r.n}</h3><p>{r.desc}</p></div>)}</div>
                </section>
                <section className="closing" id="contact">
                    <p className="caps gold-text">Free parking</p>
                    <h2>Let&rsquo;s get a <em>coffee.</em></h2>
                    <p>{EMAIL}</p>
                    <div className="acts">
                        <a className="btn-gold btn-solid" href={`mailto:${EMAIL}`}>Email Paul</a>
                        <a className="btn-gold" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a className="btn-gold" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <button className="btn-gold" onClick={onPlay}>Or play the game</button>
                    </div>
                </section>
            </div>
        </section>
    );
}
