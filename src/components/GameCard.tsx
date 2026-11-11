import { Link } from "react-router";
import type { Game } from "../types/game";

type GameCardProps = {
    game: Game;
};

export default function GameCard({ game }: GameCardProps) {
    return (
        <li>
            <Link to={`/games/${game.id}`}>
            {game.coverUrl && <img src={game.coverUrl} alt="" width={80} />}
            <span>{game.title}</span>
            </Link>
            <span> - {game.platform}</span>
        </li>
    )
}