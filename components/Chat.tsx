"use client";

import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { user: "Alice", text: "gm kiji" },
    { user: "Bob", text: "wen spin?" },
    { user: "Charlie", text: "EZ LFG" },
  ]);
  const [text, setText] = useState("");

  return (
    <aside className="w-full md:w-80 bg-white/5 rounded-2xl p-3 md:p-4 flex flex-col">
      <div className="font-semibold mb-2">Community Chat</div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-accent font-medium">{m.user}:</span>{" "}{m.text}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type..."
          className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
        />
        <button
          onClick={() => { if(text.trim()) { setMessages([...messages, {user:"You", text:text.trim()}]); setText(""); } }}
          className="px-3 py-2 rounded-lg bg-accent text-black font-semibold hover:brightness-110"
        >
          Send
        </button>
      </div>
    </aside>
  );
}