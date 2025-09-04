"use client";

import Roulette from "@/components/Roulette";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import LiveFeed from "@/components/LiveFeed";
import BetPanel from "@/components/BetPanel";
import { useState } from "react";

const initial = [
  { id: "1", name: "Alice", stake: 40, color: "#36F2B3" },
  { id: "2", name: "Bob", stake: 30, color: "#FF3B3B" },
  { id: "3", name: "Charlie", stake: 20, color: "#FFD93D" },
  { id: "4", name: "Degen", stake: 10, color: "#8B5CF6" }
];

export default function Home() {
  const [players, setPlayers] = useState(initial);

  return (
    <main className="min-h-screen p-4 md:p-6 flex flex-col gap-4">
      {/* Top grid: Sidebar | Main | Chat */}
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr_20rem] gap-4">
        <Sidebar />

        <section className="flex flex-col gap-4">
          <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Kiji.fun <span className="text-accent">Play</span>
              </h1>
              <div className="text-white/60 text-sm">Fair PvP Roulette • Solana • VRF • Jupiter verified tokens</div>
            </div>
          </div>

          {/* Roulette block */}
          <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center">
            <Roulette players={players} />
          </div>

          {/* Bet panel */}
          <BetPanel onSpin={() => {
            // simple demo: randomize players stakes to see new proportions
            setPlayers(prev => prev.map(p => ({...p, stake: Math.max(5, Math.round(Math.random()*60)) })));
          }} />
        </section>

        <Chat />
      </div>

      {/* Bottom: Live feed */}
      <LiveFeed />
    </main>
  );
}