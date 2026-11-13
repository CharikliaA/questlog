import type { StaticRouterProps } from "react-router";
import type { GameStatus } from "../types/game";

type StatusFilterProps = {
  value: GameStatus;
  onChange: (value: GameStatus) => void;
  disabled?: boolean;
};

export default function StatusSelect({
  value,
  onChange,
  disabled = false,
}: StaticRouterProps) {
  return (
    <label>
      Status
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as GameStatus)}
        disabled={disabled}
      >
        <option value="want">Want to play</option>
        <option value="playing">Playing</option>
        <option value="completed">Completed</option>
        <option value="Dropped">Dropped</option>
      </select>
    </label>
  );
}
