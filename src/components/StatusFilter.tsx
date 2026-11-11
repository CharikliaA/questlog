import type { Filter } from "../types/game";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "want", label: "Want to play" },
  { value: "playing", label: "Playing" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
];

type StatusFilterProps = {
  value: Filter;
  onChange: (value: Filter) => void;
};

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          disabled={value === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
