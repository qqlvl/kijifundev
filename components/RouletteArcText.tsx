"use client";

import React, { useMemo, useState } from "react";

type Player = {
  id: string;
  name: string;
  stake: number;
  color?: string;
};

type Props = {
  players: Player[];
  size?: number;
  ringWidth?: number;
  onResult?: (winner: Player) => void;
  vrfRandom01?: number;
};

const TAU = Math.PI * 2;

function polar(cx: number, cy: number, r: number, a: number) {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const [sx, sy] = polar(cx, cy, r, start);
  const [ex, ey] = polar(cx, cy, r, end);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

function weightedPick<T extends { stake: number }>(arr: T[], rnd: number) {
  const total = arr.reduce((s, x) => s + x.stake, 0);
  let acc = 0;
  for (const x of arr) {
    acc += x.stake;
    if (rnd * total < acc) return x;
  }
  return arr[arr.length - 1];
}

export default function RouletteArcText({
  players,
  size = 520,
  ringWidth = 110,
  onResult,
  vrfRandom01,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = outerR - ringWidth;

  const total = Math.max(1, players.reduce((s, p) => s + p.stake, 0));
  const segments = useMemo(() => {
    let cursor = -Math.PI / 2;
    return players.map((p) => {
      const frac = p.stake / total;
      const angle = Math.max(0.001, frac * TAU);
      const start = cursor;
      const end = cursor + angle;
      const mid = (start + end) / 2;
      cursor = end;
      return { p, start, end, mid, frac };
    });
  }, [players, total]);

  const [spinDeg, setSpinDeg] = useState(0);
  const [spinning, setSpinning] = useState(false);

  function spin() {
    if (spinning || players.length === 0) return;
    const rnd = vrfRandom01 ?? Math.random();
    const winner = weightedPick(players, rnd);
    const seg = segments.find((s) => s.p.id === winner.id)!;
    const midDeg = (seg.mid * 180) / Math.PI;
    const target = 360 * 6 + (-90 - midDeg);
    setSpinning(true);
    requestAnimationFrame(() => {
      setSpinDeg((prev) => prev + target - (prev % 360));
    });
    setTimeout(() => {
      setSpinning(false);
      onResult?.(winner);
    }, 3600);
  }

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </div>

        <svg width={size} height={size}>
          <circle cx={cx} cy={cy} r={(outerR + innerR) / 2} fill="none" stroke="#0c0f14" strokeWidth={ringWidth} />
          <g
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: `rotate(${spinDeg}deg)`,
              transition: spinning ? "transform 3.6s cubic-bezier(.15,.8,.25,1)" : "none",
            }}
          >
            <defs>
              {segments.map((s, i) => (
                <path key={`path-${i}`} id={`arc-${i}`} d={arcPath(cx, cy, (outerR + innerR) / 2, s.start, s.end)} />
              ))}
            </defs>

            {segments.map((s, i) => {
              const label = `${s.p.name}${s.frac > 0 ? ` — ${(s.frac * 100).toFixed(1)}%` : ""}`;
              return (
                <g key={i}>
                  <path
                    d={arcPath(cx, cy, outerR, s.start, s.end)}
                    stroke={s.p.color ?? "rgba(255,255,255,0.08)"}
                    strokeWidth={4}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <text fill="white" fontSize={18} fontWeight={700} style={{ letterSpacing: "0.5px" }}>
                    <textPath href={`#arc-${i}`} startOffset="3%" method="align" spacing="auto">
                      {label.repeat(2)}
                    </textPath>
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <button
        className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}