import React, { useLayoutEffect, useRef, useState } from 'react';

import { SQUARES, SETS, isCorner, priceOf, labelOf } from './content';
import face from '../assets/face.png';

// Grid cell and side for square i: GO at bottom-right, then clockwise.
function place(i) {
    if (i <= 10) return { r: 11, c: 11 - i, side: 'b' };
    if (i <= 20) return { r: 11 - (i - 10), c: 1, side: 'l' };
    if (i <= 30) return { r: 1, c: 1 + (i - 20), side: 't' };
    return { r: 1 + (i - 30), c: 11, side: 'r' };
}

function SquareFace({ s }) {
    if (isCorner(s)) {
        return <><p className="big">{s.big}</p><p className="small">{s.small}</p></>;
    }
    if (s.t === 'prop') {
        return <><div className="band" style={{ background: SETS[s.set].color }} /><p className="nm">{s.n}</p><p className="pr">€{s.price}</p></>;
    }
    const ic = s.ic || (s.t === 'treasury' ? 'T' : '?');
    const price = s.t === 'tax' ? `Pay ${s.amt}` : priceOf(s) ? `€${priceOf(s)}` : '';
    return <><p className="nm nm-top">{labelOf(s)}</p><p className="ic">{ic}</p><p className="pr">{price}</p></>;
}

export default function Board({ at, owned, pulse, onSquare }) {
    const boardRef = useRef(null);
    const squareRefs = useRef([]);
    const [token, setToken] = useState(null);
    const [cell, setCell] = useState({ w: 60, h: 93 });

    useLayoutEffect(() => {
        const board = boardRef.current;
        const measure = () => {
            const w = board.clientWidth / 12.1;
            setCell({ w, h: w * 1.55 });
            const sq = squareRefs.current[at];
            if (!sq) return;
            const b = board.getBoundingClientRect(), r = sq.getBoundingClientRect();
            setToken({ x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(board);
        return () => ro.disconnect();
    }, [at]);

    return (
        <div className="board" ref={boardRef}>
            {SQUARES.map((s, i) => {
                const { r, c, side } = place(i);
                const corner = isCorner(s);
                return (
                    <button
                        key={i}
                        ref={(el) => { squareRefs.current[i] = el; }}
                        className={`sq ${corner ? 'b corner' : side} ${owned.has(i) ? 'owned' : ''} ${pulse.i === i ? 'land' : ''}`}
                        data-pulse={pulse.i === i ? pulse.n : undefined}
                        style={{ gridRow: r, gridColumn: c, '--w': `${cell.w}px`, '--h': `${cell.h}px` }}
                        onClick={() => onSquare(i)}
                        aria-label={`Square ${i}: ${labelOf(s)}${owned.has(i) ? ', owned' : ''}`}
                    >
                        <span className="in"><SquareFace s={s} /></span>
                    </button>
                );
            })}

            <div className="board-center" aria-hidden="true">
                <div className="deck d1"><span>Wildcard</span><small>Achievements</small></div>
                <div className="crest">
                    <p className="top">Est. 2022 · Dublin</p>
                    <h2>The<br /><em>Settlement</em><br />Game</h2>
                    <div className="gold-line" />
                    <p className="top">Paul Aji Edition</p>
                </div>
                <div className="deck d2"><span>Treasury</span><small>Fun facts</small></div>
            </div>

            {token && (
                <div key={at} className="token hop" style={{ left: token.x, top: token.y }} aria-hidden="true"><img src={face} alt="" /></div>
            )}
        </div>
    );
}
