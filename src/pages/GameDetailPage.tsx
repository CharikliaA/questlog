import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Game } from "../types/game";
import { BASE_URL } from "../api";

export default function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/games/${id}`);

        if (response.status === 404) {
          throw new Error("Game not found");
        }

        if (!response.ok) {
          throw new Error(`Could not load the game (error ${response.status})`);
        }

        const data: Game = await response.json();
        setGame(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  if (loading) {
    return <p>Loading game...</p>;
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
        <Link to="/">Back to all games</Link>
      </>
    );
  }

  if (!game) {
    return null;
  }
  return (
    <article>
      <Link to="/">← Back to all games</Link>

      <h1>{game.title}</h1>
      {game.coverUrl && (
        <img src={game.coverUrl} alt={`Cover of ${game.title}`} width={300} />
      )}

      <p>Platform: {game.platform}</p>
      <p>Status: {game.status}</p>
      <p>Rating: {game.rating ?? "Not rated yet"}</p>
      {game.notes && <p>Notes: {game.notes}</p>}
    </article>
  );
}
