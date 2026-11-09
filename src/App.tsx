import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import NewGamePage from "./pages/NewGamePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<GamesPage />} />
        <Route path="/games/new" element={<NewGamePage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
