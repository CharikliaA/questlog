import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Game } from "../types/game";
import { BASE_URL } from "../api";
import StatusSelect from "../components/StatusSelect";

export default function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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

  async function updateGame(changes: Partial<Game>) {
    setSaving(true);
    setActionError(null);

    try {
      const response = await fetch(`${BASE_URL}/games/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });

      if (!response.ok) {
        throw new Error(`Could not update the game (error ${response.status})`);
      }

      const updatedGame: Game = await response.json();
      setGame(updatedGame);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteGame() {
    const confirmed = window.confirm(`Delete "${game?.title}"?`);
    if (!confirmed) {
      return;
    }
    setSaving(true);
    setActionError(null);

    try {
      const response = await fetch(`${BASE_URL}/games/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Could not delete the game (error ${response.status})`);
      }

      navigate("/");
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Something went wrong",
      );
      setSaving(false);
    }
  }

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
      <StatusSelect
        value={game.status}
        onChange={(newStatus) => updateGame({ status: NewStatus })}
        disabled={saving}
      />
      {actionError && <p>{actionError}</p>}
      <label>
        Rating
        <select
          value={game.rating ?? ""}
          onChange={(event) =>
            updateGame({
              rating:
                event.target.value === "" ? null : Number(event.target.value),
            })
          }
          disabled={saving}
        >
          <option value="">Not rated</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      {game.notes && <p>Notes: {game.notes}</p>}
      <button className="danger" onClick={deleteGame} disabled={saving}>
        Delete game
      </button>
    </article>
  );
}
