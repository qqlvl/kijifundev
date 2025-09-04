"use client";

import Roulette from "@/components/Roulette";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import LiveFeed from "@/components/LiveFeed";
import BetPanel from "@/components/BetPanel";
import GlowCard from "@/components/GlowCard";
import GlowButton from "@/components/GlowButton";
import { useState } from "react";

const initial = [
  { id: "1", name: "Alice", stake: 40, color: "#36F2B3" },
  { id: "2", name: "Bob", stake: 30, color: "#FF3B3B" },
  { id: "3", name: "Charlie", stake: 20, color: "#7dd3fc" },
  { id: "4", name: "Degen", stake: 10, color: "#c084fc" }
];

export default function Home() {
  const [players, setPlayers] = useState(initial);

  return (
    <main className="min-h-screen p-4 md:p-6 flex flex-col gap-4
      bg-[radial-gradient(60%_80%_at_50%_-10%,#15171c,transparent)]">
      {/* Top grid: Sidebar | Main | Chat */}
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr_20rem] gap-4">
        <Sidebar />

        <section className="flex flex-col gap-4">
          <GlowCard className="">
            <div className="p-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Kiji.fun <span className="text-accent">Play</span>
                </h1>
                <div className="text-white/60 text-sm">Fair PvP Roulette • Solana • VRF • Jupiter verified tokens</div>
              </div>
              <GlowButton onClick={() => alert('Coming soon ✨')}>Connect</GlowButton>
            </div>
          </GlowCard>

          {/* Roulette with glow frame */}
          <GlowCard className="">
            <div className="p-4 flex items-center justify-center">
              <Roulette players={players} />
            </div>
          </GlowCard>

          <GlowCard halo="mono">
            <div className="p-4">
              <BetPanel onSpin={() => {
                // demo: randomize weights to see proportions update
                setPlayers(prev => prev.map(p => ({...p, stake: Math.max(5, Math.round(Math.random()*60)) })));
              }} />
            </div>
          </GlowCard>
        </section>

        <Chat />
      </div>

      <GlowCard halo="mono">
        <div className="p-4">
          <LiveFeed />
        </div>
      </GlowCard>
    </main>
  );
}