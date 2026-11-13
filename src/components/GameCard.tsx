import { Link } from "react-router";
import type { Game } from "../types/game";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <li className="game-card">
      <Link to={`/games/${game.id}`}>
        {game.coverUrl ? (
          <img src={game.coverUrl} alt="" />
        ) : (
          <div className="cover-placeholder">🎮</div>
        )}
        <div className="game-card-info">
          <h2>{game.title}</h2>
          <p>{game.platform}</p>
        </div>
      </Link>
    </li>
  );
}