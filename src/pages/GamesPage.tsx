import { useEffect, useState } from "react";
import type { Game } from "../types/game";
import { BASE_URL } from "../api";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`${BASE_URL}/games`);

        if (!response.ok) {
          throw new Error(`Kunde inte hämta spelen (fel ${response.status})`);
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
  }, []);

  if (loading) {
    return <p>Laddar spel...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Alla spel</h1>

      {games.length === 0 && <p>Du har inga spel än.</p>}

      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </>
  );
}
