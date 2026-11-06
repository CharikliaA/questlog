export type GameStatus = "want" | "playing" | "completed" | "dropped";

export type Game = {
  id: string;
  title: string;
  platform: string;
  status: GameStatus;
  rating: number | null;
  coverUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
