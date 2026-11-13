import { useEffect, useState } from "react";
import type { Game, Filter } from "../types/game";
import { BASE_URL } from "../api";
import GameCard from "../components/GameCard";
import StatusFilter from "../components/StatusFilter";

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
          throw new Error(`Could not load games (error ${response.status})`);
        }

        const data: Game[] = await response.json();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [status]);

  return (
    <>
      <h1>All games</h1>

      <StatusFilter value={status} onChange={setStatus} />

      {loading && <p>Loading games...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && games.length === 0 && <p>No games here yet.</p>}

      {!loading && !error && (
        <ul className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </>
  );
}
