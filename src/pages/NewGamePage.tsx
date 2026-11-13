import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import type { Game, GameStatus } from "../types/game";
import { BASE_URL } from "../api";
import StatusSelect from "../components/StatusSelect";

export default function NewGamePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState<GameStatus>("want");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, platform, status }),
      });

      if (!response.ok) {
        throw new Error(`Could not save the game (error ${response.status})`);
      }

      const newGame: Game = await response.json();
      navigate(`/games/${newGame.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h1>Add game</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={100}
          />
        </label>

        <label>
          Platform
          <input
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            required
            maxLength={40}
          />
        </label>

        <StatusSelect value={status} onChange={setStatus} />

        {error && <p>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add game"}
        </button>
      </form>
    </>
  );
}
