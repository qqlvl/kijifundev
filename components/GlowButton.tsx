import React from "react";

export default function GlowButton({
  children,
  className = "",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-5 py-2 rounded-xl font-semibold text-black bg-accent transition hover:brightness-110 disabled:opacity-60 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute -inset-1 rounded-xl bg-[radial-gradient(60%_120%_at_50%_0%,rgba(54,242,179,0.45),transparent)] blur-md" />
    </button>
  );
}