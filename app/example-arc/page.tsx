import dynamic from "next/dynamic";

const RouletteArcText = dynamic(() => import("@/components/RouletteArcText"), { ssr: false });

const players = [
  { id: "1", name: "Alice", stake: 40, color: "#60a5fa" },
  { id: "2", name: "Bob", stake: 30, color: "#34d399" },
  { id: "3", name: "Charlie", stake: 20, color: "#f472b6" },
  { id: "4", name: "Degen", stake: 10, color: "#f59e0b" }
];

export default function Page() {
  return (
    <main className="min-h-screen p-8 grid place-items-center bg-black text-white">
      <RouletteArcText players={players} />
    </main>
  );
}