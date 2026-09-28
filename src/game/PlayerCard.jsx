import React, { useEffect, useRef, useState } from 'react';

import face from '../assets/face.png';
import { STATS, HONOURS } from './content';

// Remembers the last value so a rise can flash "+n" beside the number.
function useDelta(value) {
    const prev = useRef(value);
    const [delta, setDelta] = useState(null);
    useEffect(() => {
        const d = value - prev.current;
        prev.current = value;
        if (d !== 0) {
            setDelta({ d, id: Date.now() });
            const t = setTimeout(() => setDelta(null), 1600);
            return () => clearTimeout(t);
        }
    }, [value]);
    return delta;
}

function Stat({ label, value }) {
    const delta = useDelta(value);
    return (
        <div className="stat">
            <div className="stat-top">
                <span className="caps">{label}</span>
                <b>{value}{delta && <i key={delta.id} className={`rise ${delta.d < 0 ? 'down' : ''}`}>{delta.d > 0 ? '+' : '−'}{Math.abs(delta.d)}</i>}</b>
            </div>
            <div className="track"><div className="fill" style={{ width: `${value}%` }} /></div>
        </div>
    );
}

export default function PlayerCard({ profile, deeds, onOpenHonours }) {
    const overallDelta = useDelta(profile.overall);
    return (
        <section className="player" aria-label="Player card">
            <header className="player-head">
                <img src={face} alt="" className="player-face" />
                <div className="player-id">
                    <p className="caps">Player card · {deeds} / 22 deeds</p>
                    <p className="player-title">{profile.title}</p>
                </div>
                <div className="overall" aria-label={`Overall rating ${profile.overall}`}>
                    <b>{profile.overall}{overallDelta && <i key={overallDelta.id} className={`rise ${overallDelta.d < 0 ? 'down' : ''}`}>{overallDelta.d > 0 ? '+' : '−'}{Math.abs(overallDelta.d)}</i>}</b>
                    <span className="caps">Overall</span>
                </div>
            </header>
            <div className={`form-row f-${profile.formState.split(' ')[0].toLowerCase()}`}>
                <span className="caps">Form</span>
                <div className="form-track"><div className="form-fill" style={{ width: `${profile.form}%` }} /></div>
                <span className="form-state">{profile.formState}</span>
                <span className="mult">×{profile.mult.toFixed(2)}</span>
            </div>
            <div className="stats">
                {STATS.map((s) => <Stat key={s.key} label={s.label} value={profile.rating[s.key]} />)}
            </div>
            <button className="honours" onClick={onOpenHonours}>
                <span className="caps">Honours</span>
                <span className="medals">
                    {HONOURS.map((h) => {
                        const won = profile.honours.some((x) => x.name === h.name);
                        return <i key={h.name} className={won ? 'won' : ''} title={won ? h.name : 'Locked'} />;
                    })}
                </span>
                <span className="count">{profile.sets.length > 0 && <em>{profile.sets.length} set bonus · </em>}{profile.honours.length} / {HONOURS.length}</span>
            </button>
        </section>
    );
}
