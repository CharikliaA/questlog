import { useEffect, useState } from "react";
import type { Game, GameStatus } from "../types/game";
import { BASE_URL } from "../api";
import GameCard from "../components/GameCard";

type Filter = GameStatus | "all";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "want", label: "Want to play" },
  { value: "playing", label: "Playing" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
];

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Filter>("all");

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      setError(null);

      try {
        const url =
          status === "all"
            ? `${BASE_URL}/games`
            : `${BASE_URL}/games?status=${status}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Could not load games (fel ${response.status})`);
        }

        const data: Game[] = await response.json();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Något gick fel");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [status]);

  return (
    <>
      <h1>Alla spel</h1>

      <div>
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatus(filter.value)}
            disabled={status === filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading && <p>Loading games...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && games.length === 0 && <p>No games here yet.</p>}

      {!loading && !error && (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <GameCard key={game.id} game={game} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
