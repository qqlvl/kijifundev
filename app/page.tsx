import Roulette from "@/components/Roulette";

const players = [
  { id: "1", name: "Alice", stake: 40, color: "#36F2B3" },
  { id: "2", name: "Bob", stake: 30, color: "#FF3B3B" },
  { id: "3", name: "Charlie", stake: 20, color: "#FFD93D" },
  { id: "4", name: "Degen", stake: 10, color: "#8B5CF6" }
];

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 gap-6">
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-accent">Kiji.fun</h1>
        <Roulette players={players} />
      </div>

      <div className="w-full md:w-80 h-96 bg-white/5 rounded-xl p-3">
        <h2 className="font-semibold mb-2">Community Chat</h2>
        <div className="h-[85%] overflow-y-auto space-y-1 text-sm">
          <div><span className="text-accent">Alice:</span> gm kiji</div>
          <div><span className="text-soft">Bob:</span> spin wen??</div>
          <div><span className="text-yellow-400">Charlie:</span> EZ WIN</div>
        </div>
        <input
          type="text"
          placeholder="Type..."
          className="mt-2 w-full rounded-md bg-black/40 border border-white/10 px-2 py-1 text-sm"
        />
      </div>
    </main>
  );
}