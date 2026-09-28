import React, { useId, useMemo } from 'react';

import engraved from '../assets/engraved.png';

const W = 940;
const H = 440;

// Epitrochoid rosettes and wave bands: the fine-line security printing.
function useGuilloche() {
    return useMemo(() => {
        const paths = [];
        const rosette = (cx, cy, R, r, d, n, op) => {
            for (let j = 0; j < n; j++) {
                const dd = d * (1 - j * 0.07);
                let p = '';
                for (let t = 0; t <= Math.PI * 2 * r + 0.01; t += 0.02) {
                    const x = cx + (R + r) * Math.cos(t) - dd * Math.cos(((R + r) / r) * t);
                    const y = cy + (R + r) * Math.sin(t) - dd * Math.sin(((R + r) / r) * t);
                    p += (p ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
                }
                paths.push({ d: p, w: 0.45, op });
            }
        };
        rosette(560, 95, 44, 4, 28, 4, 0.45);
        rosette(175, 220, 118, 9, 40, 3, 0.22);
        for (let b = 0; b < 26; b++) {
            let p = '';
            for (let x = 0; x <= W; x += 6) {
                const y = H - 70 + b * 2.2 + Math.sin(x / 38 + b * 0.35) * 12 + Math.sin(x / 11) * 1.5;
                p += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
            }
            paths.push({ d: p, w: 0.4, op: 0.33 });
        }
        for (let b = 0; b < 16; b++) {
            let p = '';
            for (let x = 300; x <= W; x += 6) {
                const y = 22 + b * 2 + Math.cos(x / 30 + b * 0.5) * 7;
                p += (x === 300 ? 'M' : 'L') + x + ' ' + y.toFixed(1);
            }
            paths.push({ d: p, w: 0.35, op: 0.28 });
        }
        return paths;
    }, []);
}

const MICRO_TOP = 'CLOSE ENOUGH IS NOT A FEATURE IN PAYMENTS · '.repeat(8);
const MICRO_BOTTOM = 'ROUND THE NET FIRST · THEN THE VAT · THEN THE GROSS · '.repeat(7);

export default function Banknote({ className = '', ink = '#1F4A42', paper = '#EFE9D8', denom = '3', unit = 'YEARS', plus = true, face = true }) {
    const id = useId().replace(/:/g, '');
    const guilloche = useGuilloche();

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className={`banknote ${className}`} role="img" aria-label={`Banknote: ${denom}${plus ? '+' : ''} ${unit.toLowerCase()}, legal tender for one conversation with Paul Aji`}>
            <defs>
                <clipPath id={`oval-${id}`}><ellipse cx="175" cy="220" rx="112" ry="142" /></clipPath>
                <linearGradient id={`holo-${id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#d5f4ff" /><stop offset=".25" stopColor="#f6cbff" /><stop offset=".5" stopColor="#fff4bf" />
                    <stop offset=".75" stopColor="#c5ffe0" /><stop offset="1" stopColor="#cbd4ff" />
                </linearGradient>
            </defs>

            <rect width={W} height={H} rx="8" fill={paper} />
            <g fill="none" stroke={ink}>
                {guilloche.map((p, i) => <path key={i} d={p.d} strokeWidth={p.w} opacity={p.op} />)}
            </g>
            <rect x="14" y="14" width={W - 28} height={H - 28} rx="3" fill="none" stroke={ink} strokeWidth="1.5" />
            <rect x="19" y="19" width={W - 38} height={H - 38} rx="2" fill="none" stroke={ink} strokeWidth=".5" />

            <text x="26" y="30" fontSize="4.4" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing=".35" fill={ink} opacity=".8" textLength={W - 52} lengthAdjust="spacingAndGlyphs">{MICRO_TOP}</text>
            <text x="26" y={H - 24} fontSize="4.4" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing=".35" fill={ink} opacity=".8" textLength={W - 52} lengthAdjust="spacingAndGlyphs">{MICRO_BOTTOM}</text>

            {face && (
                <g>
                    <ellipse cx="175" cy="220" rx="120" ry="150" fill="none" stroke={ink} strokeWidth="1.5" />
                    <ellipse cx="175" cy="220" rx="126" ry="156" fill="none" stroke={ink} strokeWidth=".5" />
                    <g clipPath={`url(#oval-${id})`}>
                        <image href={engraved} x="55" y="70" width="240" height="300" preserveAspectRatio="xMidYMid slice" />
                    </g>
                </g>
            )}

            <text x="320" y="130" fontFamily="'Space Mono', monospace" fontSize="15" letterSpacing="1.8" fill="#A5312A">PA 0003 2026</text>

            <text x={W - 56} y="160" textAnchor="end" fontFamily="'Bodoni Moda', serif" fontSize="120" fill={ink}>
                {denom}{plus && <tspan fontSize="52" dy="-58">+</tspan>}
            </text>
            <text x={W - 58} y="192" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11" letterSpacing="5.5" fill={ink}>{unit}</text>

            <g fill={ink} textAnchor="middle">
                <text x="615" y="258" fontFamily="'Bodoni Moda', serif" fontStyle="italic" fontSize="22">Legal tender for one (1) conversation</text>
                <text x="615" y="287" fontFamily="'Bodoni Moda', serif" fontStyle="italic" fontSize="22">with the bearer of this note</text>
                <text x="615" y="312" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9" letterSpacing="2.9">THE SETTLEMENT GAME · BANK OF DUBLIN</text>
            </g>

            <g fill={ink} textAnchor="middle">
                <text x="465" y="370" fontFamily="'Bodoni Moda', serif" fontStyle="italic" fontSize="30" transform="rotate(-4 465 370)">Paul Aji</text>
                <line x1="350" x2="580" y1="382" y2="382" stroke={ink} strokeWidth="1" />
                <text x="465" y="397" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="2.4">CHIEF SETTLEMENT OFFICER</text>
            </g>

            <g transform="translate(640 322)">
                <clipPath id={`holoclip-${id}`}><rect width="70" height="86" rx="6" /></clipPath>
                <rect width="70" height="86" rx="6" fill={`url(#holo-${id})`} stroke="#fff" strokeOpacity=".8" />
                <image href={engraved} x="-4" y="4" width="78" height="97" clipPath={`url(#holoclip-${id})`} opacity=".45" />
            </g>
            <text x={W - 60} y={H - 50} textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="15" letterSpacing="1.8" fill="#A5312A">PA 0003 2026</text>
        </svg>
    );
}
