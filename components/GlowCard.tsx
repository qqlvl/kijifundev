// components/GlowCard.tsx
import React from "react";

export default function GlowCard({
  children,
  className = "",
  halo = "conic",
}: {
  children: React.ReactNode;
  className?: string;
  /** 'conic' | 'mono' */
  halo?: "conic" | "mono";
}) {
  const haloClass =
    halo === "conic"
      // мягкий радужный бордер
      ? "bg-[conic-gradient(at_50%_50%,#36F2B3,#6b8cff,#ff53d6,#ff4d4d,#ffca3a,#36F2B3)] opacity-35 blur-lg"
      // одноцветный
      : "bg-[radial-gradient(70%_120%_at_50%_-20%,rgba(54,242,179,0.55),transparent_60%)] blur-md opacity-70";

  return (
    <div className={`relative rounded-3xl p-[2px] overflow-hidden ${className}`}>
      {/* halo-слой: обрезан по контейнеру */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl ${haloClass} animate-kiji-halo
        [mask-image:radial-gradient(80%_120%_at_50%_50%,#000_30%,transparent_80%)]
        `}
        style={{ animationDuration: "20s" }} // спокойнее
      />
      <div className="relative rounded-3xl bg-white/5 backdrop-blur-md ring-1 ring-white/10">
        {children}
      </div>
    </div>
  );
}
