"use client";

import React, { useState } from "react";

export default function BetPanel({ onSpin }: { onSpin: () => void }) {
  const [token, setToken] = useState("SOL");
  const [amount, setAmount] = useState("10");

  return (
    <div className="w-full bg-white/5 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm text-white/70 w-16">Token</label>
        <select
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
        >
          <option>SOL</option>
          <option>USDC</option>
          <option>BONK</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-white/70 w-16">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-28 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
        />
      </div>
      <div className="md:ml-auto">
        <button onClick={onSpin} className="px-4 py-2 rounded-xl bg-accent text-black font-semibold hover:brightness-110">
          Place bet & Spin
        </button>
      </div>
    </div>
  );
}