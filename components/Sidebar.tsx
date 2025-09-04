"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white/5 rounded-2xl p-4 md:p-5 flex md:flex-col gap-3 md:gap-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-accent/20 grid place-items-center text-accent font-extrabold">
          K
        </div>
        <div className="font-bold">Kiji.fun</div>
      </div>

      <nav className="flex md:flex-col gap-2 text-sm">
        <Link href="#" className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15">Play</Link>
        <Link href="#" className="px-3 py-2 rounded-xl hover:bg-white/10">History</Link>
        <Link href="#" className="px-3 py-2 rounded-xl hover:bg-white/10">Community</Link>
        <Link href="#" className="px-3 py-2 rounded-xl hover:bg-white/10">Docs</Link>
      </nav>

      <div className="mt-auto hidden md:block">
        <div className="text-xs text-white/60">Status</div>
        <div className="mt-1 text-sm bg-white/5 rounded-xl p-3">
          <div className="flex items-center justify-between"><span>Players</span><b>124</b></div>
          <div className="flex items-center justify-between"><span>Bank (24h)</span><b>1.2k</b></div>
        </div>
      </div>
    </aside>
  );
}