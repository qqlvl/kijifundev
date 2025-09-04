"use client";
import React, { useMemo, useRef, useState } from "react";

type Player = {
  id: string;
  name: string;
  stake: number;
  color: string;
  avatarUrl?: string;
};

type Props = {
  players: Player[];
  size?: number;
  onResult?: (winner: Player) => void;
  vrfRandom01?: number;
};

const TAU = Math.PI * 2;

function polar(cx: number, cy: number, r: number, angle: number) {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  start: number,
  end: number
) {
  const [sx, sy] = polar(cx, cy, rOuter, start);
  const [ex, ey] = polar(cx, cy, rOuter, end);
  const [sx2, sy2] = polar(cx, cy, rInner, end);
  const [ex2, ey2] = polar(cx, cy, rInner, start);
  const large = end - start > Math.PI ? 1 : 0;

  return [
    `M ${sx} ${sy}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${ex} ${ey}`,
    `L ${sx2} ${sy2}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${ex2} ${ey2}`,
    "Z",
  ].join(" ");
}

function weightedPick(players: Player[], rnd01: number) {
  const total = players.reduce((s, p) => s + p.stake, 0);
  let acc = 0;
  for (const p of players) {
    acc += p.stake;
    if (rnd01 * total < acc) return p;
  }
  return players[players.length - 1];
}

export default function Roulette({
  players,
  size = 480,
  onResult,
  vrfRandom01,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.48;
  const rInner = size * 0.22;

  const total = Math.max(1, players.reduce((s, p) => s + p.stake, 0));
  const segments = useMemo(() => {
    let cursor = -Math.PI / 2;
    return players.map((p) => {
      const frac = p.stake / total;
      const angle = frac * TAU;
      const start = cursor;
      const end = cursor + angle;
      const mid = (start + end) / 2;
      cursor = end;
      return { p, start, end, mid, frac };
    });
  }, [players, total]);

  const [spinDeg, setSpinDeg] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const gRef = useRef<SVGGElement>(null);

  function spin() {
    if (spinning || players.length === 0) return;

    const rnd01 = vrfRandom01 ?? Math.random();
    const winner = weightedPick(players, rnd01);
    const seg = segments.find((s) => s.p.id === winner.id)!;

    const midDeg = (seg.mid * 180) / Math.PI;
    const targetDeg = 360 * 6 + (-90 - midDeg);

    setSpinning(true);
    requestAnimationFrame(() => {
      setSpinDeg((prev) => prev + targetDeg - (prev % 360));
    });

    setTimeout(() => {
      setSpinning(false);
      onResult?.(winner);
    }, 3600);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: 6 }}>
          <div
            className="w-0 h-0 border-l-6 border-r-6 border-b-10 border-transparent"
            style={{ borderBottomColor: "#36F2B3" }}
          />
        </div>

        <svg width={size} height={size}>
          <defs>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
            </filter>
          </defs>

          <g
            ref={gRef}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: `rotate(${spinDeg}deg)`,
              transition: spinning ? "transform 3.6s cubic-bezier(.15,.8,.25,1)" : "none",
              filter: "url(#softShadow)"
            }}
          >
            {segments.map(({ p, start, end }, i) => (
              <path
                key={p.id}
                d={arcPath(cx, cy, rOuter, rInner, start, end)}
                fill={p.color}
                stroke="#0E0F12"
                strokeWidth={2}
              />
            ))}

            <circle cx={cx} cy={cy} r={rInner * 0.72} fill="#0E0F12" />
            <text x={cx} y={cy + 4} textAnchor="middle" fontWeight={700} fill="#36F2B3">
              KIJI
            </text>
          </g>
        </svg>
      </div>

      <button
        className="px-5 py-2 rounded-xl bg-emerald-400/90 text-black font-semibold hover:bg-emerald-300 transition"
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}