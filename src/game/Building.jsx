import React from 'react';

const PALETTES = {
    house: { roofF: '#FFE14A', roofB: '#F2B705', wallL: '#19D3FF', wallR: '#0B8FB8', gable: '#086C8C', door: '#0B0B10', edge: '#0B0B10' },
    hotel: { roofF: '#FFE14A', roofB: '#F2B705', wallL: '#FF2E88', wallR: '#C0165E', gable: '#8E0E45', door: '#0B0B10', edge: '#0B0B10' },
    sealed: { roofF: '#3A3550', roofB: '#2C2840', wallL: '#26223A', wallR: '#1C1930', gable: '#141226', door: '#0B0B10', edge: '#9E97B8' },
};

// An isometric brass house (or oxblood hotel): two walls, a gable and a pitched roof.
export default function Building({ kind = 'house', scale = 1.5, sealed = false }) {
    const hotel = kind === 'hotel';
    const c = PALETTES[sealed ? 'sealed' : kind];
    const W = hotel ? 2.3 : 1, D = 1, H = hotel ? 1.05 : 0.8, R = hotel ? 0.5 : 0.55, s = 15;
    const cos = Math.cos(Math.PI / 6), sin = 0.5;
    const P = (x, y, z) => [(x - y) * cos * s, (x + y) * sin * s - z * s];
    const pts = (...a) => a.map((q) => P(...q).map((n) => n.toFixed(2)).join(',')).join(' ');
    const Face = ({ fill, at }) => <polygon points={pts(...at)} fill={fill} stroke={c.edge} strokeOpacity=".9" strokeWidth="1.1" strokeLinejoin="round" />;

    const all = [[0, 0, 0], [W, 0, 0], [0, D, 0], [W, D, 0], [0, 0, H], [W, 0, H], [0, D, H], [W, D, H], [0, D / 2, H + R], [W, D / 2, H + R]].map((q) => P(...q));
    const xs = all.map((q) => q[0]), ys = all.map((q) => q[1]);
    const minX = Math.min(...xs) - 2, minY = Math.min(...ys) - 2;
    const w = Math.max(...xs) - minX + 2, h = Math.max(...ys) - minY + 2;
    const doorX = W / 2, dw = 0.22, dh = 0.42;

    return (
        <svg width={Math.round(w * scale)} height={Math.round(h * scale)} viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`} aria-hidden="true">
            <Face fill={c.wallR} at={[[W, 0, 0], [W, D, 0], [W, D, H], [W, 0, H]]} />
            <Face fill={c.gable} at={[[W, 0, H], [W, D, H], [W, D / 2, H + R]]} />
            <Face fill={c.wallL} at={[[0, D, 0], [W, D, 0], [W, D, H], [0, D, H]]} />
            <Face fill={c.door} at={[[doorX - dw / 2, D, 0], [doorX + dw / 2, D, 0], [doorX + dw / 2, D, dh], [doorX - dw / 2, D, dh]]} />
            {hotel && [0.3, 0.75, 1.55, 2.0].map((x) => (
                <Face key={x} fill="rgb(255 235 200 / .55)" at={[[x - 0.09, D, 0.55], [x + 0.09, D, 0.55], [x + 0.09, D, 0.78], [x - 0.09, D, 0.78]]} />
            ))}
            <Face fill={c.roofB} at={[[0, 0, H], [W, 0, H], [W, D / 2, H + R], [0, D / 2, H + R]]} />
            <Face fill={c.roofF} at={[[0, D / 2, H + R], [W, D / 2, H + R], [W, D, H], [0, D, H]]} />
        </svg>
    );
}
