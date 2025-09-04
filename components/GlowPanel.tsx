"use client";
import React from "react";

export default function GlowPanel({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[28px] p-[2px] ${className}`}>
      <div className="absolute inset-0 rounded-[28px] bg-[conic-gradient(at_50%_50%,#36F2B3,#6b8cff,#ff53d6,#ff4d4d,#ffca3a,#36F2B3)] opacity-50 blur-2xl animate-[spin-halo_20s_linear_infinite]" />
      <div className="relative rounded-[28px] bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-6">
        {children}
      </div>
    </div>
  );
}