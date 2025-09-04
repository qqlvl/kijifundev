"use client";

import React from "react";

const items = [
  { id: 1, label: "Alice won 120 with SOL", icon: "💎" },
  { id: 2, label: "Bob joined with USDC 35", icon: "🪙" },
  { id: 3, label: "Charlie pulled JACKPOT", icon: "🎉" },
  { id: 4, label: "Degen lost 10 BONK", icon: "🐶" },
];

export default function LiveFeed() {
  return (
    <div className="w-full bg-white/5 rounded-2xl p-3 md:p-4">
      <div className="font-semibold mb-3">Live feed</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.id} className="bg-white/5 rounded-xl p-3 text-sm flex items-center gap-2 hover:bg-white/10 transition">
            <span className="text-lg">{it.icon}</span>
            <span className="truncate">{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}